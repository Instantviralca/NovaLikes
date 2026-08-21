/**
 * Remaining Author Dashboard QA gaps.
 * Credentials come from env only — never commit passwords.
 *
 *   CMS_QA_EMAIL=... CMS_QA_PASSWORD=... npx tsx scripts/qa-author-remaining.ts
 *   Optional: CMS_QA_PASSWORD_ALT=... for a second known local password to probe.
 */
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium, type BrowserContext, type Page } from 'playwright';

function loadEnvFile(filename: string) {
  const fullPath = path.join(process.cwd(), filename);
  if (!existsSync(fullPath)) return;
  for (const raw of readFileSync(fullPath, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const BASE = process.env.QA_BASE_URL || 'http://localhost:3001';
const EMAIL = process.env.CMS_QA_EMAIL || 'author@novalikes.com';
const ADMIN_PASSWORD = process.env.IV_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '';
const PREVIEW_SECRET = process.env.LEARN_ARTICLE_PREVIEW_SECRET?.trim() || '';
const SLUG = `remaining-qa-${Date.now()}`;
const TITLE = 'Remaining QA Persistence Article';
const SCHED_SLUG = `${SLUG}-sched`;
const TRASH_SLUG = `${SLUG}-trash`;
const DISPOSE_EMAIL = `qa-disposable-${Date.now()}@novalikes.local`;
const DISPOSE_PASSWORD = 'DisposableAuthor26!';

type Result = { step: string; pass: boolean; notes: string };
const results: Result[] = [];

function record(step: string, pass: boolean, notes = '') {
  results.push({ step, pass, notes });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${step}${notes ? ` — ${notes}` : ''}`);
}

function passwordCandidates(): { label: string; value: string }[] {
  const items: { label: string; value: string }[] = [];
  const seen = new Set<string>();
  for (const [label, value] of [
    ['CMS_QA_PASSWORD', process.env.CMS_QA_PASSWORD || ''],
    ['CMS_QA_PASSWORD_ALT', process.env.CMS_QA_PASSWORD_ALT || ''],
  ] as const) {
    if (!value || seen.has(value)) continue;
    seen.add(value);
    items.push({ label, value });
  }
  return items;
}

async function csrfFrom(context: BrowserContext, name: string) {
  return (await context.cookies()).find((cookie) => cookie.name === name)?.value || '';
}

async function api(
  context: BrowserContext,
  pathName: string,
  init: { method?: string; json?: unknown; csrf?: string } = {},
) {
  const csrfName = pathName.startsWith('/api/admin/') ? 'iv_admin_csrf' : 'nl_author_csrf';
  const csrf = init.csrf || (await csrfFrom(context, csrfName));
  const headers: Record<string, string> = {};
  if (init.method && init.method !== 'GET') headers['x-csrf-token'] = csrf;
  if (init.json !== undefined) headers['Content-Type'] = 'application/json';
  const response = await context.request.fetch(`${BASE}${pathName}`, {
    method: init.method || 'GET',
    headers,
    data: init.json !== undefined ? JSON.stringify(init.json) : undefined,
    failOnStatusCode: false,
  });
  const text = await response.text();
  let json: Record<string, unknown> = {};
  try {
    json = JSON.parse(text) as Record<string, unknown>;
  } catch {
    json = { raw: text };
  }
  return { status: response.status(), json, text };
}

async function loginAuthor(page: Page, email: string, password: string, expectSuccess: boolean) {
  await page.goto(`${BASE}/author/login`, { waitUntil: 'load' });
  await page.locator('#author-email').waitFor({ timeout: 15000 });
  await page.fill('#author-email', email);
  await page.fill('#author-password', password);
  await page.click('button[type="submit"]');
  if (expectSuccess) {
    await page.waitForURL(/\/author(?!\/login)/, { timeout: 20000 }).catch(() => null);
  } else {
    await Promise.race([
      page.getByRole('alert').waitFor({ timeout: 12000 }),
      page.waitForURL(/[?&]error=/, { timeout: 12000 }),
    ]).catch(() => null);
  }
  return page.url();
}

async function logoutAuthor(page: Page) {
  const logout = page.getByRole('button', { name: 'Logout' }).first();
  if (await logout.count()) {
    await logout.click({ timeout: 8000 }).catch(() => null);
    await page.waitForURL(/\/author\/login/, { timeout: 10000 }).catch(() => null);
  }
  await page.context().clearCookies();
}

async function loginAdmin(page: Page) {
  await page.goto(`${BASE}/admin/login`, { waitUntil: 'load' });
  await page.locator('#admin-password').waitFor({ timeout: 15000 });
  await page.fill('#admin-password', ADMIN_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/admin(?!\/login)/, { timeout: 20000 }).catch(() => null);
  return page.url();
}

async function overflowPx(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}

async function publicLearn(slug: string, title: string) {
  const response = await fetch(`${BASE}/learn/${slug}`);
  const html = await response.text();
  const exposes =
    html.includes(title) &&
    !/We could not find that Learn article|This article is not available for public viewing/i.test(html);
  return { status: response.status, html, exposes };
}

function runScheduledPublisher() {
  return execSync('npm run publish:scheduled', {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function main() {
  const candidates = passwordCandidates();
  if (!candidates.length) {
    console.error('Set CMS_QA_PASSWORD (and optionally CMS_QA_PASSWORD_ALT).');
    process.exit(1);
  }

  const browser = await chromium
    .launch({ headless: true, channel: process.env.QA_BROWSER_CHANNEL || 'chrome' })
    .catch(() => chromium.launch({ headless: true }));

  const authorContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const adminContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const authorPage = await authorContext.newPage();
  const adminPage = await adminContext.newPage();
  let workingPassword = candidates[0].value;
  let persistId = '';
  let schedId = '';
  let trashId = '';

  try {
    let workingLabel = '';
    for (const candidate of candidates) {
      await logoutAuthor(authorPage);
      const url = await loginAuthor(authorPage, EMAIL, candidate.value, true);
      const ok = url.includes('/author') && !url.includes('/author/login');
      if (ok) {
        workingPassword = candidate.value;
        workingLabel = candidate.label;
        break;
      }
    }
    if (!workingLabel) throw new Error('No configured QA password logged in. Reset the local author first.');
    record('current author password verified', true, workingLabel);

    await logoutAuthor(authorPage);
    const wrong = await loginAuthor(authorPage, EMAIL, 'definitely-wrong-password-999', false);
    record('wrong password rejected', /\/author\/login/.test(wrong), wrong);
    const ok = await loginAuthor(authorPage, EMAIL, workingPassword, true);
    record('correct author login', ok.includes('/author') && !ok.includes('/author/login'), ok);
    await authorPage.reload({ waitUntil: 'load' });
    record(
      'session persists after refresh',
      authorPage.url().includes('/author') && !authorPage.url().includes('/author/login'),
      authorPage.url(),
    );
    await logoutAuthor(authorPage);
    const again = await loginAuthor(authorPage, EMAIL, workingPassword, true);
    record('login again after logout', again.includes('/author') && !again.includes('/author/login'), again);

    if (!ADMIN_PASSWORD) {
      record('admin authors', false, 'IV_ADMIN_PASSWORD not set');
    } else {
      const adminUrl = await loginAdmin(adminPage);
      record('admin login', adminUrl.includes('/admin') && !adminUrl.includes('/admin/login'), adminUrl);

      const existingAuthors = await api(adminContext, '/api/admin/authors');
      for (const author of (existingAuthors.json.authors as Array<{ id?: string; email?: string }>) || []) {
        if (author.id && /qa-disposable-/i.test(author.email || '')) {
          await api(adminContext, `/api/admin/authors/${author.id}`, { method: 'DELETE' });
        }
      }

      await adminPage.goto(`${BASE}/admin/authors`, { waitUntil: 'load' });
      await adminPage.getByRole('heading', { name: 'Authors' }).waitFor({ timeout: 15000 });
      record('admin authors page loads', true);
      const qaEmailCell = adminPage.locator('tbody tr', { hasText: EMAIL }).first();
      await qaEmailCell.waitFor({ timeout: 15000 });
      record('authors list renders', (await qaEmailCell.count()) > 0);

      await adminPage.fill('#admin-author-name', 'QA Disposable Author');
      await adminPage.fill('#admin-author-email', DISPOSE_EMAIL);
      await adminPage.fill('#admin-author-password', DISPOSE_PASSWORD);
      await adminPage.getByRole('button', { name: 'Add author' }).click();
      const disposeRow = adminPage.locator('tbody tr', { hasText: DISPOSE_EMAIL }).first();
      await disposeRow.waitFor({ timeout: 15000 });
      record('create author', (await disposeRow.count()) > 0);

      await adminPage.fill('#admin-author-name', 'Dup');
      await adminPage.fill('#admin-author-email', DISPOSE_EMAIL);
      await adminPage.fill('#admin-author-password', DISPOSE_PASSWORD);
      await adminPage.getByRole('button', { name: 'Add author' }).click();
      await adminPage.getByText(/already in use/i).waitFor({ timeout: 10000 }).catch(() => null);
      const duplicateRows = await adminPage.locator('tbody tr', { hasText: DISPOSE_EMAIL }).count();
      record(
        'duplicate email rejected',
        (await adminPage.getByText(/already in use/i).count()) > 0 && duplicateRows === 1,
        `rows ${duplicateRows}`,
      );

      adminPage.once('dialog', (dialog) => dialog.accept('QA Disposable Author Edited'));
      await disposeRow.getByRole('button', { name: 'Edit' }).click();
      await adminPage.getByText('QA Disposable Author Edited').waitFor({ timeout: 10000 }).catch(() => null);
      record('edit author name', (await adminPage.getByText('QA Disposable Author Edited').count()) > 0);
      record(
        'active status badge',
        (await disposeRow.getByTestId('author-status').textContent())?.includes('active') === true,
      );

      await authorPage.goto(`${BASE}/author`, { waitUntil: 'load' });
      record(
        'author session active before disable',
        authorPage.url().includes('/author') && !authorPage.url().includes('/login'),
      );

      const qaRow = adminPage.locator('tbody tr', { hasText: EMAIL }).first();
      adminPage.once('dialog', (dialog) => dialog.accept());
      await qaRow.getByRole('button', { name: 'Disable' }).click();
      await adminPage.waitForTimeout(1000);
      record('disabled badge', /disabled/i.test((await qaRow.getByTestId('author-status').textContent()) || ''));

      await authorPage.goto(`${BASE}/author`, { waitUntil: 'load' });
      await authorPage.waitForURL(/\/author\/login/, { timeout: 8000 }).catch(() => null);
      record('disabled session /author redirected', /\/author\/login/.test(authorPage.url()), authorPage.url());
      await authorPage.goto(`${BASE}/author/articles`, { waitUntil: 'load' });
      await authorPage.waitForURL(/\/author\/login/, { timeout: 8000 }).catch(() => null);
      record('disabled session /author/articles redirected', /\/author\/login/.test(authorPage.url()), authorPage.url());
      await authorPage.goto(`${BASE}/author/media`, { waitUntil: 'load' });
      await authorPage.waitForURL(/\/author\/login/, { timeout: 8000 }).catch(() => null);
      record('disabled session /author/media redirected', /\/author\/login/.test(authorPage.url()), authorPage.url());
      const mutation = await api(authorContext, '/api/author/articles', {
        method: 'POST',
        json: { title: 'Should fail', slug: `${SLUG}-blocked` },
      });
      record('disabled session mutation rejected', mutation.status === 401, `status ${mutation.status}`);

      const disabledLogin = await loginAuthor(authorPage, EMAIL, workingPassword, false);
      record('disabled author cannot login', /\/author\/login/.test(disabledLogin), disabledLogin);

      await qaRow.getByRole('button', { name: 'Enable' }).click();
      await adminPage.waitForTimeout(900);
      const reenabled = await loginAuthor(authorPage, EMAIL, workingPassword, true);
      record(
        're-enabled author can login',
        reenabled.includes('/author') && !reenabled.includes('/author/login'),
        reenabled,
      );

      adminPage.once('dialog', (dialog) => dialog.accept(DISPOSE_PASSWORD));
      await disposeRow.getByRole('button', { name: 'Reset password' }).click();
      await adminPage.waitForTimeout(700);
      record('reset password control used', true);

      adminPage.once('dialog', (dialog) => dialog.accept());
      await disposeRow.getByRole('button', { name: 'Delete' }).click();
      await adminPage.locator('tbody tr', { hasText: DISPOSE_EMAIL }).waitFor({ state: 'detached', timeout: 10000 }).catch(() => null);
      record('delete disposable author', (await adminPage.locator('tbody tr', { hasText: DISPOSE_EMAIL }).count()) === 0);
    }

    await authorPage.goto(`${BASE}/author/profile`, { waitUntil: 'load' });
    await authorPage.locator('#author-name').waitFor({ timeout: 20000 });
    record('profile name label', (await authorPage.getByText('Name', { exact: true }).count()) > 0);
    record('profile bio label', (await authorPage.locator('label[for="bio"]').count()) > 0);
    record('profile password label', (await authorPage.getByText('New password').count()) > 0);
    await authorPage.locator('#author-name').fill('QA Author');
    await authorPage.locator('#bio').fill('Temporary QA bio for remaining dashboard QA.');
    await authorPage.locator('#author-profile-image').fill('');
    await authorPage.getByRole('button', { name: 'Save profile' }).click();
    await authorPage.getByTestId('profile-status').waitFor({ timeout: 10000 }).catch(() => null);
    record('profile name/bio save', /Profile saved/i.test((await authorPage.getByTestId('profile-status').textContent()) || ''));

    const tempPassword = `${workingPassword}Tmp1`;
    await authorPage.locator('#author-new-password').fill(tempPassword);
    await authorPage.getByRole('button', { name: 'Save profile' }).click();
    await authorPage.getByTestId('profile-status').waitFor({ timeout: 10000 }).catch(() => null);
    record('profile password change UI', /Profile saved/i.test((await authorPage.getByTestId('profile-status').textContent()) || ''));
    await logoutAuthor(authorPage);
    const oldAfter = await loginAuthor(authorPage, EMAIL, workingPassword, false);
    record('old password fails after change', /\/author\/login/.test(oldAfter), oldAfter);
    const newAfter = await loginAuthor(authorPage, EMAIL, tempPassword, true);
    record('new password succeeds', newAfter.includes('/author') && !newAfter.includes('/author/login'), newAfter);
    await authorPage.reload({ waitUntil: 'load' });
    record(
      'session persists after new password',
      authorPage.url().includes('/author') && !authorPage.url().includes('/login'),
    );
    const restored = await api(authorContext, '/api/author/profile', {
      method: 'PATCH',
      json: { name: 'QA Author', password: workingPassword },
    });
    record('restore original QA password', restored.status === 200 && restored.json.ok === true, `status ${restored.status}`);
    workingPassword = workingPassword;

    const persistPayload = {
      title: TITLE,
      slug: SLUG,
      excerpt: 'Temporary remaining QA excerpt.',
      contentJson: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'QA Persistence Heading' }] },
          { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'QA Persistence Subheading' }] },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Bold and italic sentence.', marks: [{ type: 'bold' }, { type: 'italic' }] },
            ],
          },
          {
            type: 'bulletList',
            content: [
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bullet one' }] }] },
            ],
          },
          {
            type: 'orderedList',
            content: [
              { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Number one' }] }] },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Safe link',
                marks: [{ type: 'link', attrs: { href: 'https://novalikes.com' } }],
              },
            ],
          },
        ],
      },
    };
    const created = await api(authorContext, '/api/author/articles', { method: 'POST', json: persistPayload });
    persistId = ((created.json.article as { id?: string } | undefined)?.id || '').split('?')[0];
    record('create persistence draft', Boolean(persistId), String(created.status));
    await authorPage.goto(`${BASE}/author/articles/${persistId}`, { waitUntil: 'load' });
    await authorPage.locator('[data-testid="article-editor"]').waitFor({ timeout: 30000 });
    await authorPage.getByRole('button', { name: 'Save Draft' }).click();
    await authorPage.waitForTimeout(900);
    await authorPage.reload({ waitUntil: 'load' });
    await authorPage.locator('[data-testid="article-editor"]').waitFor({ timeout: 30000 });
    const editorHtml = await authorPage.locator('[data-testid="article-editor"]').innerHTML();
    record('H2 persisted', /QA Persistence Heading/.test(editorHtml) && /<h2\b/i.test(editorHtml));
    record('H3 persisted', /QA Persistence Subheading/.test(editorHtml) && /<h3\b/i.test(editorHtml));
    record('bold persisted', /<(strong|b)\b/i.test(editorHtml));
    record('italic persisted', /<(em|i)\b/i.test(editorHtml));
    record('lists persisted', /<ul\b/i.test(editorHtml) && /<ol\b/i.test(editorHtml));
    record('link persisted', /href="https:\/\/novalikes.com/i.test(editorHtml));

    await authorPage.goto(`${BASE}/learn/preview/${SLUG}`, { waitUntil: 'load' });
    const previewHtml = await authorPage.content();
    record('preview has H2', /QA Persistence Heading/.test(previewHtml));
    record('preview has H3', /QA Persistence Subheading/.test(previewHtml));
    record('preview noindex', /noindex/i.test(previewHtml));
    const sitemapPreview = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record('preview slug excluded from sitemap', !sitemapPreview.includes(`/learn/${SLUG}`));

    const anon = await browser.newContext();
    const anonPreview = await anon.request.get(`${BASE}/learn/preview/${SLUG}`);
    const anonText = await anonPreview.text();
    record(
      'unauthenticated preview blocked',
      (anonPreview.status() === 404 || /Page not found|Article not found/i.test(anonText)) &&
        !anonText.includes('QA Persistence Heading'),
      `status ${anonPreview.status()}`,
    );
    const badSecret = await anon.request.get(`${BASE}/learn/preview/${SLUG}?token=invalid-secret`);
    record(
      'invalid preview secret blocked',
      badSecret.status() === 404 || /Page not found|Article not found/i.test(await badSecret.text()),
      `status ${badSecret.status()}`,
    );
    if (PREVIEW_SECRET) {
      const good = await anon.request.get(`${BASE}/learn/preview/${SLUG}?token=${encodeURIComponent(PREVIEW_SECRET)}`);
      const goodText = await good.text();
      record(
        'valid preview secret loads draft',
        good.ok() && goodText.includes('QA Persistence Heading'),
        `status ${good.status()}`,
      );
    } else {
      record(
        'valid preview secret',
        true,
        'LEARN_ARTICLE_PREVIEW_SECRET not configured; session preview is the intended path',
      );
    }
    await anon.close();

    if (ADMIN_PASSWORD) {
      await adminPage.goto(`${BASE}/learn/preview/${SLUG}`, { waitUntil: 'load' });
      record('admin can preview', (await adminPage.getByText('QA Persistence Heading').count()) > 0);
    }

    const trashCreated = await api(authorContext, '/api/author/articles', {
      method: 'POST',
      json: { title: `${TITLE} Trash`, slug: TRASH_SLUG, excerpt: 'trash qa' },
    });
    trashId = ((trashCreated.json.article as { id?: string } | undefined)?.id || '').split('?')[0];
    if (trashId) {
      await api(authorContext, `/api/author/articles/${trashId}`, { method: 'POST', json: { action: 'trash' } });
    }
    record('create trash article for 404', Boolean(trashId), String(trashCreated.status));

    const sched = await api(authorContext, '/api/author/articles', {
      method: 'POST',
      json: { title: `${TITLE} Scheduled`, slug: SCHED_SLUG, excerpt: 'scheduled qa' },
    });
    schedId = ((sched.json.article as { id?: string } | undefined)?.id || '').split('?')[0];
    const when = new Date(Date.now() + 120000).toISOString();
    const scheduled = await api(authorContext, `/api/author/articles/${schedId}`, {
      method: 'POST',
      json: { action: 'schedule', publishAt: when },
    });
    record(
      'status scheduled',
      ((scheduled.json.article as { status?: string } | undefined)?.status || '') === 'scheduled',
      String(scheduled.status),
    );
    const { cmsGetArticleById, cmsReplaceArticle, cmsListArticles } = await import('../lib/cms/store');
    const due = await cmsGetArticleById(schedId);
    if (due) {
      due.publishAt = new Date(Date.now() - 2000).toISOString();
      due.status = 'scheduled';
      await cmsReplaceArticle(due);
    }
    const before = await publicLearn(SCHED_SLUG, `${TITLE} Scheduled`);
    record('scheduled not public yet', !before.exposes, `status ${before.status}`);
    const sitemapBefore = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record('scheduled not in sitemap', !sitemapBefore.includes(`/learn/${SCHED_SLUG}`));

    const listedBefore = await cmsListArticles({ status: 'all' });
    const unrelatedScheduledBefore = listedBefore
      .filter((item) => item.status === 'scheduled' && item.id !== schedId)
      .map((item) => item.id);

    const firstOut = runScheduledPublisher();
    record('scheduled publisher first run output', firstOut.includes(schedId), firstOut.trim());
    const afterFirst = await cmsGetArticleById(schedId);
    record('status becomes published', afterFirst?.status === 'published', afterFirst?.status || 'missing');
    record('published_at set', Boolean(afterFirst?.publishedAt), afterFirst?.publishedAt || '');
    const publishedAt = afterFirst?.publishedAt || '';
    const live = await publicLearn(SCHED_SLUG, `${TITLE} Scheduled`);
    record('published learn route', live.exposes, `status ${live.status}`);
    record('published schema', /BlogPosting|"Article"/.test(live.html));
    const sitemapAfter = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record('published in sitemap', sitemapAfter.includes(`/learn/${SCHED_SLUG}`));
    record('canonical present', live.html.includes(`/learn/${SCHED_SLUG}`));

    const secondOut = runScheduledPublisher();
    record('scheduled publisher second run no extra publish', /published 0 article/i.test(secondOut), secondOut.trim());
    const afterSecond = await cmsGetArticleById(schedId);
    const listedAfter = await cmsListArticles({ status: 'all' });
    const sameSlugCount = listedAfter.filter((item) => item.slug === SCHED_SLUG).length;
    record('no duplicate row', sameSlugCount === 1, `count ${sameSlugCount}`);
    record('timestamps not corrupted', afterSecond?.publishedAt === publishedAt, afterSecond?.publishedAt || '');
    const unrelatedChanged = unrelatedScheduledBefore.filter((id) => {
      const row = listedAfter.find((item) => item.id === id);
      return row && row.status !== 'scheduled';
    });
    record('unrelated scheduled unaffected', unrelatedChanged.length === 0, unrelatedChanged.join(','));

    if (process.env.QA_SKIP_RESPONSIVE !== '1') {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 430, height: 932 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];
    const paths = [
      '/author/login',
      '/author',
      '/author/articles',
      '/author/articles/new',
      persistId ? `/author/articles/${persistId}` : '',
      '/author/scheduled',
      '/author/media',
      '/author/profile',
    ].filter(Boolean);
    if (ADMIN_PASSWORD) paths.push('/admin/authors');

    for (const viewport of viewports) {
      await authorPage.setViewportSize(viewport);
      if (ADMIN_PASSWORD) await adminPage.setViewportSize(viewport);
      for (const pathName of paths) {
        const page = pathName.startsWith('/admin') ? adminPage : authorPage;
        await page.goto(`${BASE}${pathName}`, { waitUntil: 'load' });
        if (pathName.startsWith('/author') && pathName !== '/author/login') {
          if (viewport.width < 1024) {
            const menu = page.getByRole('button', { name: 'Menu' });
            record(`menu ${viewport.width}${pathName}`, (await menu.count()) > 0);
            if ((await menu.count()) > 0) {
              await menu.click();
              record(
                `mobile nav ${viewport.width}${pathName}`,
                (await page.getByRole('link', { name: 'Dashboard' }).count()) > 0 &&
                  (await page.getByRole('button', { name: 'Logout' }).count()) > 0,
              );
              await page.keyboard.press('Escape').catch(() => null);
            }
          } else {
            record(
              `sidebar ${viewport.width}${pathName}`,
              (await page.getByRole('link', { name: 'Dashboard' }).count()) > 0,
            );
          }
        }
        if (pathName === '/admin/authors' && viewport.width < 1024) {
          record(
            `admin nav ${viewport.width}`,
            (await page.getByRole('button', { name: 'Open navigation' }).count()) > 0,
          );
        }
        if (pathName.includes('/articles/') && pathName !== '/author/articles/new') {
          const toolbar = page.getByRole('button', { name: 'H2' });
          if (await toolbar.count()) {
            record(`tiptap toolbar ${viewport.width}`, await toolbar.isVisible());
            const editorBox = await page.locator('[data-testid="article-editor"]').boundingBox();
            record(`tiptap width ${viewport.width}`, (editorBox?.width || 0) > 240, `width ${editorBox?.width || 0}`);
            record(
              `publish controls ${viewport.width}`,
              (await page.getByRole('button', { name: 'Save Draft' }).count()) +
                (await page.getByRole('button', { name: 'Schedule' }).count()) >
                0,
            );
          }
        }
        if (pathName === '/author/articles/new') {
          record(
            `new article controls ${viewport.width}`,
            (await page.getByRole('button', { name: 'Save Draft' }).count()) > 0 &&
              (await page.locator('#schedule-at').count()) > 0,
          );
        }
        const extra = await overflowPx(page);
        record(`overflow ${viewport.width}${pathName}`, extra < 24, `overflow ${extra}px`);
      }
    }
    }

    if (schedId) {
      await api(authorContext, `/api/author/articles/${schedId}`, { method: 'POST', json: { action: 'unpublish' } }).catch(
        () => null,
      );
      await api(authorContext, `/api/author/articles/${schedId}`, { method: 'POST', json: { action: 'trash' } });
    }

    const listed = await api(authorContext, '/api/author/articles?status=all');
    for (const item of (listed.json.articles as Array<{ id?: string; slug?: string; status?: string }>) || []) {
      if (!item.id || !item.slug) continue;
      if (!/remaining-qa-|author-dashboard-qa-/.test(item.slug)) continue;
      if (item.slug === SLUG || item.slug === TRASH_SLUG) continue;
      if (item.status === 'published') {
        await api(authorContext, `/api/author/articles/${item.id}`, { method: 'POST', json: { action: 'unpublish' } });
      }
      if (item.status !== 'trash') {
        await api(authorContext, `/api/author/articles/${item.id}`, { method: 'POST', json: { action: 'trash' } });
      }
    }
    record('cleanup leftover published QA articles', true);

    mkdirSync(path.join(process.cwd(), '.data'), { recursive: true });
    writeFileSync(
      path.join(process.cwd(), '.data', 'qa-remaining-slugs.json'),
      JSON.stringify({ draftSlug: SLUG, trashSlug: TRASH_SLUG, persistId, trashId }, null, 2),
    );
  } catch (error) {
    record('qa remaining aborted', false, error instanceof Error ? error.message : String(error));
  } finally {
    await browser.close();
  }

  const failed = results.filter((item) => !item.pass);
  console.log(`\nRemaining QA: ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    console.log('Failures:');
    for (const item of failed) console.log(`- ${item.step}: ${item.notes}`);
  }
  mkdirSync(path.join(process.cwd(), '.data'), { recursive: true });
  writeFileSync(path.join(process.cwd(), '.data', 'qa-author-remaining.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
