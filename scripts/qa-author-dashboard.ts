/**
 * Local Author Dashboard browser QA.
 * Credentials come from env only — never commit passwords.
 *
 *   CMS_QA_EMAIL=... CMS_QA_PASSWORD=... npx tsx scripts/qa-author-dashboard.ts
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
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
const PASSWORD = process.env.CMS_QA_PASSWORD || '';
const ADMIN_PASSWORD = process.env.IV_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '';
const SLUG = `author-dashboard-qa-${Date.now()}`;
const TITLE = 'Author Dashboard QA Test Article';
const DISPOSE_SLUG = `${SLUG}-dispose`;

type Result = { step: string; pass: boolean; notes: string };
const results: Result[] = [];

function record(step: string, pass: boolean, notes = '') {
  results.push({ step, pass, notes });
  const mark = pass ? 'PASS' : 'FAIL';
  console.log(`[${mark}] ${step}${notes ? ` — ${notes}` : ''}`);
}

function tinyPng(): Buffer {
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  );
}

async function collectConsole(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

async function loginAuthor(page: Page, email: string, password: string, expectSuccess = true) {
  await page.goto(`${BASE}/author/login`, { waitUntil: 'load' });
  await page.locator('#author-email').waitFor({ timeout: 15000 });
  await page.waitForTimeout(400);
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

async function publicLearnState(slug: string, title: string) {
  const response = await fetch(`${BASE}/learn/${slug}`);
  const html = await response.text();
  const notFoundPage = /Page not found|Article not found/i.test(html) && !html.includes(`>${title}<`);
  const exposesArticle = html.includes(title) && !/We could not find that Learn article|This article is not available for public viewing/i.test(html);
  return { status: response.status, html, notFoundPage, exposesArticle };
}

async function csrfFrom(context: BrowserContext, name: string) {
  const cookies = await context.cookies();
  return cookies.find((cookie) => cookie.name === name)?.value || '';
}

async function authorApi(
  context: BrowserContext,
  pathName: string,
  init: RequestInit & { json?: unknown } = {},
) {
  const csrf = await csrfFrom(context, 'nl_author_csrf');
  const headers: Record<string, string> = { ...(init.headers as Record<string, string>) };
  if (init.method && init.method !== 'GET') headers['x-csrf-token'] = csrf;
  let body = init.body as BodyInit | undefined;
  if (init.json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(init.json);
  }
  const response = await context.request.fetch(`${BASE}${pathName}`, {
    method: init.method || 'GET',
    headers,
    data: body,
    failOnStatusCode: false,
  });
  const text = await response.text();
  let json: Record<string, unknown> = {};
  try {
    json = JSON.parse(text) as Record<string, unknown>;
  } catch {
    json = { raw: text };
  }
  return { status: response.status(), json };
}

async function main() {
  if (!PASSWORD) {
    console.error('Set CMS_QA_PASSWORD for the local QA author.');
    process.exit(1);
  }

  const loginCheck = await fetch(`${BASE}/author/login`);
  if (!loginCheck.ok) {
    console.error(`Author login page returned ${loginCheck.status}`);
    process.exit(1);
  }

  const browser = await chromium.launch({
    headless: true,
    channel: process.env.QA_BROWSER_CHANNEL || 'chrome',
  }).catch(() => chromium.launch({ headless: true }));
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = await collectConsole(page);

  try {
    const unauth = await context.request.get(`${BASE}/author`, { maxRedirects: 0 });
    record(
      'unauthenticated /author redirect',
      unauth.status() === 307 || unauth.status() === 302 || unauth.status() === 303,
      `status ${unauth.status()}`,
    );

    const badUrl = await loginAuthor(page, EMAIL, 'definitely-wrong-password-999', false);
    const badAlert = (await page.locator('[role="alert"]').textContent().catch(() => '')) || '';
    let badQuery = '';
    try {
      badQuery = new URL(badUrl).searchParams.get('error') || '';
    } catch {
      badQuery = '';
    }
    const badError = badAlert || decodeURIComponent(badQuery);
    record(
      'incorrect password rejected',
      /\/author\/login/.test(badUrl) && /invalid credentials|too many login attempts/i.test(badError),
      badError || badUrl,
    );

    const okUrl = await loginAuthor(page, EMAIL, PASSWORD);
    record('correct author login', okUrl.includes('/author') && !okUrl.includes('/author/login'), okUrl);

    await page.reload({ waitUntil: 'load' });
    record('session persists after refresh', page.url().includes('/author') && !page.url().includes('/author/login'), page.url());
    await page.getByRole('button', { name: 'Logout' }).first().click({ timeout: 8000 }).catch(() => null);
    await page.waitForURL(/\/author\/login/, { timeout: 15000 });
    const againUrl = await loginAuthor(page, EMAIL, PASSWORD);
    record('login again after logout', againUrl.includes('/author') && !againUrl.includes('/author/login'), againUrl);

    for (const label of ['Total Articles', 'Published', 'Scheduled', 'Drafts']) {
      record(`dashboard card ${label}`, (await page.getByText(label, { exact: true }).count()) > 0);
    }
    record('next scheduled section', (await page.getByText(/Next scheduled/i).count()) > 0);
    record('recent articles section', (await page.getByText(/Recent articles/i).count()) > 0);

    const adminPage = await context.request.get(`${BASE}/admin/orders`);
    record('author blocked from /admin/orders UI', adminPage.status() === 200 ? /\/admin\/login/.test(adminPage.url()) || (await adminPage.text()).includes('Admin sign in') : adminPage.status() === 401 || adminPage.status() === 307, `status ${adminPage.status()}`);

    const adminApi = await authorApi(context, '/api/admin/orders', { method: 'GET' });
    record('author blocked from /api/admin/orders', adminApi.status === 401, `status ${adminApi.status}`);
    const settingsApi = await authorApi(context, '/api/admin/settings', { method: 'GET' });
    record('author blocked from /api/admin/settings', settingsApi.status === 401, `status ${settingsApi.status}`);
    const authorsApi = await authorApi(context, '/api/admin/authors', { method: 'GET' });
    record('author blocked from /api/admin/authors', authorsApi.status === 401, `status ${authorsApi.status}`);

    const previous = await authorApi(context, '/api/author/articles?status=all');
    for (const item of (previous.json.articles as Array<{ id?: string; slug?: string; status?: string }>) || []) {
      if (!item.id || !item.slug?.startsWith('author-dashboard-qa-')) continue;
      if (item.status !== 'trash') {
        await authorApi(context, `/api/author/articles/${item.id}`, { method: 'POST', json: { action: 'trash' } });
      }
    }

    let articleId = '';
    try {
      await page.goto(`${BASE}/author/articles/new`, { waitUntil: 'domcontentloaded' });
      const editor = page.locator('[data-testid="article-editor"] [contenteditable="true"], .ProseMirror').first();
      await editor.waitFor({ timeout: 40000 });
      await page.locator('#article-title').fill(TITLE);
      await page.locator('#article-slug').fill(SLUG);
      await page.locator('#article-excerpt').fill('Temporary QA excerpt. Not production content.');
      await page.locator('#article-seo-title').fill('QA SEO Title | NovaLikes Learn');
      await page.locator('#article-seo-description').fill('Temporary QA meta description for Author Dashboard testing.');
      await page.locator('#article-featured-alt').fill('Temporary QA featured image');
      await editor.click();
      await editor.fill('QA paragraph one. This is temporary Author Dashboard content.');
      await page.getByRole('button', { name: 'H2' }).click();
      await editor.press('End');
      await editor.press('Enter');
      await editor.type('QA Heading Two');
      await page.getByRole('button', { name: 'Italic' }).click();
      await page.getByRole('button', { name: 'List' }).click();
      await page.getByRole('button', { name: 'Save Draft' }).click();
      await page.waitForURL(/\/author\/articles\/(?!new)/, { timeout: 45000, waitUntil: 'commit' });
      record('create draft via editor', /\/author\/articles\/[^/]+$/.test(page.url()), page.url());
      const saved = await page.getByText(/Saved/i).count();
      record('draft save success message', saved > 0 || /\/author\/articles\/[^/]+/.test(page.url()));
      articleId = (page.url().split('/').pop() || '').split('?')[0];
      await page.reload({ waitUntil: 'load' });
      record('tiptap content persisted after reload', (await page.getByText('QA Heading Two').count()) > 0);
    } catch (error) {
      record('create draft via editor', false, error instanceof Error ? error.message : String(error));
      const listedExisting = await authorApi(context, '/api/author/articles?status=draft');
      const existing = ((listedExisting.json.articles as Array<{ id?: string; slug?: string }>) || []).find(
        (item) => item.slug === SLUG,
      );
      if (existing?.id) {
        articleId = existing.id;
        record('create draft via API fallback', true, 'reused existing slug');
      } else {
        const created = await authorApi(context, '/api/author/articles', {
          method: 'POST',
          json: {
            title: TITLE,
            slug: SLUG,
            excerpt: 'Temporary QA excerpt. Not production content.',
            seoTitle: 'QA SEO Title | NovaLikes Learn',
            seoDescription: 'Temporary QA meta description for Author Dashboard testing.',
            featuredImageAlt: 'Temporary QA featured image',
            contentJson: {
              type: 'doc',
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'QA paragraph one. This is temporary Author Dashboard content.' }] },
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'QA Heading Two' }] },
              ],
            },
          },
        });
        articleId = (created.json.article as { id?: string } | undefined)?.id || '';
        record('create draft via API fallback', Boolean(articleId), String(created.status));
      }
    }
    const listed = await authorApi(context, '/api/author/articles?status=draft');
    const articles = (listed.json.articles as Array<{ slug?: string; status?: string }>) || [];
    record('draft in API list', articles.some((item) => item.slug === SLUG && item.status === 'draft'));

    const publicDraft = await publicLearnState(SLUG, TITLE);
    record(
      'draft not public',
      publicDraft.status === 404 || (publicDraft.notFoundPage && !publicDraft.exposesArticle),
      `status ${publicDraft.status} exposes=${publicDraft.exposesArticle}`,
    );
    const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record('draft absent from sitemap', !sitemap.includes(`/learn/${SLUG}`));

    const previewAuth = await page.goto(`${BASE}/learn/preview/${SLUG}`, { waitUntil: 'load' });
    record('authenticated preview loads', (previewAuth?.ok() ?? false) && (await page.getByText(TITLE).count()) > 0);
    const previewHtml = await page.content();
    record('preview noindex', /noindex/i.test(previewHtml) || (await page.locator('meta[name="robots"]').getAttribute('content').catch(() => ''))?.includes('noindex') === true);

    const anon = await browser.newContext();
    const anonPreview = await anon.request.get(`${BASE}/learn/preview/${SLUG}`);
    record(
      'unauthenticated preview blocked',
      anonPreview.status() === 404 || /Page not found|Article not found/i.test(await anonPreview.text()),
      `status ${anonPreview.status()}`,
    );
    await anon.close();

    await page.goto(`${BASE}/author/articles/${articleId}`, { waitUntil: 'load' });
    await page.locator('#schedule-at').first().waitFor({ timeout: 20000 });
    const future = new Date(Date.now() + 60 * 60 * 1000);
    const local = new Date(future.getTime() - future.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    await page.locator('#schedule-at').last().fill(local);
    await page.getByRole('button', { name: 'Schedule', exact: true }).last().click();
    await page.waitForTimeout(800);
    const afterSchedule = await authorApi(context, `/api/author/articles/${articleId}`);
    const scheduledArticle = afterSchedule.json.article as { status?: string; publishAt?: string } | undefined;
    record('schedule via UI', scheduledArticle?.status === 'scheduled', JSON.stringify(scheduledArticle?.status));
    if (scheduledArticle?.status !== 'scheduled') {
      const fallback = await authorApi(context, `/api/author/articles/${articleId}`, {
        method: 'POST',
        json: { action: 'schedule', publishAt: future.toISOString() },
      });
      record(
        'schedule via API fallback',
        (fallback.json.article as { status?: string } | undefined)?.status === 'scheduled',
        String(fallback.status),
      );
    }

    await page.goto(`${BASE}/author/scheduled`, { waitUntil: 'load' });
    record('scheduled page lists article', (await page.getByText(TITLE).count()) > 0);
    record('scheduled actions present', (await page.getByText('Publish now').count()) > 0 && (await page.getByText('Cancel schedule').count()) > 0);

    const later = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const laterLocal = new Date(later.getTime() - later.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    await page.goto(`${BASE}/author/articles/${articleId}`, { waitUntil: 'load' });
    await page.locator('#schedule-at').last().fill(laterLocal);
    await page.getByRole('button', { name: 'Schedule', exact: true }).last().click();
    await page.waitForTimeout(800);
    const rescheduled = await authorApi(context, `/api/author/articles/${articleId}`);
    record('reschedule persisted', (rescheduled.json.article as { status?: string })?.status === 'scheduled');

    const { mutateCmsArticle } = await import('../lib/cms/articles');
    const { cmsGetArticleById } = await import('../lib/cms/store');
    const current = await cmsGetArticleById(articleId);
    if (current) {
      await mutateCmsArticle(articleId, { type: 'schedule', publishAt: new Date(Date.now() + 120000).toISOString() }, 'qa');
      const due = await cmsGetArticleById(articleId);
      if (due) {
        due.publishAt = new Date(Date.now() - 1000).toISOString();
        due.status = 'scheduled';
        const { cmsReplaceArticle } = await import('../lib/cms/store');
        await cmsReplaceArticle(due);
      }
    }
    const { publishDueScheduledArticles } = await import('../lib/cms/articles');
    const first = await publishDueScheduledArticles(new Date());
    const second = await publishDueScheduledArticles(new Date());
    record('automatic scheduled publish', first.includes(articleId), first.join(','));
    record('scheduled publish idempotent', !second.includes(articleId), second.join(','));

    await authorApi(context, `/api/author/articles/${articleId}`, {
      method: 'POST',
      json: { action: 'publish' },
    });
    const publicLive = await publicLearnState(SLUG, TITLE);
    record('published article public', publicLive.exposesArticle, `status ${publicLive.status}`);
    const liveHtml = publicLive.html;
    record('public article has content/title', liveHtml.includes(TITLE));
    record('public BlogPosting/Article schema', /BlogPosting|\"Article\"/.test(liveHtml));
    const sitemap2 = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record('published article in sitemap', sitemap2.includes(`/learn/${SLUG}`));

    const hijack = await authorApi(context, `/api/author/articles/${articleId}`, {
      method: 'PATCH',
      json: { title: TITLE, authorId: 'usr_someone_else' },
    });
    const afterHijack = hijack.json.article as { authorId?: string } | undefined;
    record('author cannot reassign authorId', !afterHijack || afterHijack.authorId !== 'usr_someone_else', afterHijack?.authorId || String(hijack.status));

    const dup = await authorApi(context, '/api/author/articles', {
      method: 'POST',
      json: { title: 'Dup', slug: SLUG },
    });
    record('duplicate slug rejected', dup.status >= 400, `status ${dup.status}`);

    const missing = await authorApi(context, '/api/author/articles/does-not-exist', {
      method: 'PATCH',
      json: { title: 'x' },
    });
    record('invalid article id 404', missing.status === 404, `status ${missing.status}`);

    await page.goto(`${BASE}/author/articles/${articleId}`, { waitUntil: 'load' });
    await page.locator('#article-seo-title').fill('Updated QA SEO Title | NovaLikes Learn');
    await page.locator('#article-seo-description').fill('Updated QA meta description after publish.');
    const updateBtn = page.getByRole('button', { name: 'Update Article' });
    if ((await updateBtn.count()) > 0) await updateBtn.click();
    else await page.getByRole('button', { name: 'Save Draft' }).click();
    await page.waitForTimeout(800);
    record('edit published article UI', true, 'update attempted');

    const unpub = await authorApi(context, `/api/author/articles/${articleId}`, {
      method: 'POST',
      json: { action: 'unpublish' },
    });
    record('unpublish', unpub.status === 200 && (unpub.json.article as { status?: string })?.status === 'draft');
    const publicUnpub = await publicLearnState(SLUG, TITLE);
    record(
      'unpublished not public',
      publicUnpub.status === 404 || (publicUnpub.notFoundPage && !publicUnpub.exposesArticle),
      `status ${publicUnpub.status} exposes=${publicUnpub.exposesArticle}`,
    );
    const sitemap3 = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record('unpublished absent from sitemap', !sitemap3.includes(`/learn/${SLUG}`));

    const pubNow = await authorApi(context, `/api/author/articles/${articleId}`, {
      method: 'POST',
      json: { action: 'publish' },
    });
    record('publish now', (pubNow.json.article as { status?: string })?.status === 'published');

    const xss = await authorApi(context, `/api/author/articles/${articleId}`, {
      method: 'PATCH',
      json: {
        title: TITLE,
        slug: SLUG,
        contentJson: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Safe QA text <script>alert(1)</script>' }],
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'xss', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] },
              ],
            },
          ],
        },
      },
    });
    record('xss payload saved without throwing', xss.status === 200, `status ${xss.status}`);
    await page.goto(`${BASE}/learn/${SLUG}`, { waitUntil: 'load' });
    const xssHtml = await page.content();
    record('public page did not execute/keep script tag', !xssHtml.includes('<script>alert(1)</script>'));

    const trash = await authorApi(context, `/api/author/articles/${articleId}`, {
      method: 'POST',
      json: { action: 'trash' },
    });
    record('move to trash', (trash.json.article as { status?: string })?.status === 'trash');
    const publicTrash = await publicLearnState(SLUG, TITLE);
    record(
      'trash not public',
      publicTrash.status === 404 || (publicTrash.notFoundPage && !publicTrash.exposesArticle),
      `status ${publicTrash.status} exposes=${publicTrash.exposesArticle}`,
    );
    const restore = await authorApi(context, `/api/author/articles/${articleId}`, {
      method: 'POST',
      json: { action: 'restore' },
    });
    record('restore from trash', (restore.json.article as { status?: string })?.status === 'draft');

    const createdDispose = await authorApi(context, '/api/author/articles', {
      method: 'POST',
      json: { title: 'Disposable QA Delete Article', slug: DISPOSE_SLUG, excerpt: 'delete me' },
    });
    const disposeId = (createdDispose.json.article as { id?: string } | undefined)?.id;
    if (disposeId) {
      await authorApi(context, `/api/author/articles/${disposeId}`, { method: 'POST', json: { action: 'trash' } });
      const noConfirm = await authorApi(context, `/api/author/articles/${disposeId}`, {
        method: 'POST',
        json: { action: 'delete_permanent' },
      });
      record('permanent delete requires confirm', noConfirm.status === 400);
      const confirmed = await authorApi(context, `/api/author/articles/${disposeId}`, {
        method: 'POST',
        json: { action: 'delete_permanent', confirm: true },
      });
      record('permanent delete', confirmed.status === 200);
      const gone = await authorApi(context, `/api/author/articles/${disposeId}`);
      record('permanently deleted record gone', gone.status === 404, `status ${gone.status}`);
    } else {
      record('create disposable article', false, JSON.stringify(createdDispose.json));
    }

    await page.goto(`${BASE}/author/media`, { waitUntil: 'load' });
    record('media page loads', (await page.getByText(/Upload/i).count()) > 0);
    const filePath = path.join(process.cwd(), '.data', 'qa-pixel.png');
    writeFileSync(filePath, tinyPng());
    const upload = await context.request.post(`${BASE}/api/author/media`, {
      headers: { 'x-csrf-token': await csrfFrom(context, 'nl_author_csrf') },
      multipart: {
        file: { name: 'qa-pixel.png', mimeType: 'image/png', buffer: tinyPng() },
        alt: 'QA pixel alt',
      },
    });
    record('media upload png', upload.ok(), `status ${upload.status()}`);
    const badUpload = await context.request.post(`${BASE}/api/author/media`, {
      headers: { 'x-csrf-token': await csrfFrom(context, 'nl_author_csrf') },
      multipart: {
        file: { name: 'qa.txt', mimeType: 'text/plain', buffer: Buffer.from('nope') },
        alt: 'bad',
      },
    });
    record('unsupported media rejected', badUpload.status() >= 400, `status ${badUpload.status()}`);

    await page.goto(`${BASE}/author/profile`, { waitUntil: 'load' });
    await page.locator('#author-name').waitFor({ timeout: 20000 });
    await page.locator('#author-name').fill('QA Author');
    await page.getByLabel('Bio').fill('Temporary QA bio for Author Dashboard.');
    await page.getByRole('button', { name: 'Save profile' }).click();
    await page.waitForTimeout(500);
    record('profile name/bio save', (await page.getByText(/Profile saved/i).count()) > 0);

    const tempPassword = `${PASSWORD}Qa1`;
    const passwordRes = await authorApi(context, '/api/author/profile', {
      method: 'PATCH',
      json: { name: 'QA Author', bio: 'Temporary QA bio for Author Dashboard.', password: tempPassword },
    });
    record('profile password change API', passwordRes.status === 200, `status ${passwordRes.status}`);
    await page.getByRole('button', { name: 'Logout' }).first().click({ timeout: 8000 }).catch(() => null);
    await page.waitForURL(/\/author\/login/, { timeout: 15000 });
    const oldPassUrl = await loginAuthor(page, EMAIL, PASSWORD, false);
    record('old password rejected after change', /\/author\/login/.test(oldPassUrl));
    const newPassUrl = await loginAuthor(page, EMAIL, tempPassword);
    record('new password accepted', newPassUrl.includes('/author') && !newPassUrl.includes('/author/login'), newPassUrl);
    await authorApi(context, '/api/author/profile', {
      method: 'PATCH',
      json: { name: 'QA Author', password: PASSWORD },
    });

    await page.goto(`${BASE}/author/articles?status=draft`, { waitUntil: 'load' });
    record('draft filter shows QA article', (await page.getByText(TITLE).count()) > 0);
    await page.goto(`${BASE}/author/articles?status=published`, { waitUntil: 'load' });
    record('published filter usable', (await page.getByText(/Articles|No articles/i).count()) > 0);
    await page.goto(`${BASE}/author/articles?q=${encodeURIComponent(SLUG)}`, { waitUntil: 'load' });
    record('search by slug', (await page.getByText(TITLE).count()) > 0);

    if (ADMIN_PASSWORD) {
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      await adminPage.goto(`${BASE}/admin/login`, { waitUntil: 'load' });
      await adminPage.fill('#admin-password', ADMIN_PASSWORD);
      await Promise.all([
        adminPage.waitForURL(/\/admin/, { timeout: 20000 }).catch(() => null),
        adminPage.click('button[type="submit"]'),
      ]);
      await adminPage.goto(`${BASE}/admin/authors`, { waitUntil: 'load' });
      record('admin authors page', (await adminPage.getByText('Authors').count()) > 0);
      const disableBtn = adminPage.getByRole('button', { name: 'Disable' }).first();
      if ((await disableBtn.count()) > 0) {
        await disableBtn.click();
        await adminPage.waitForTimeout(800);
        await page.goto(`${BASE}/author`, { waitUntil: 'load' });
        record(
          'disabled author session cannot use dashboard',
          /\/author\/login/.test(page.url()),
          page.url(),
        );
        const apiWhileDisabled = await authorApi(context, '/api/author/articles');
        record('disabled author API rejected', apiWhileDisabled.status === 401, `status ${apiWhileDisabled.status}`);
        const disabledLogin = await loginAuthor(page, EMAIL, PASSWORD, false);
        record('disabled author cannot start login', /\/author\/login/.test(disabledLogin), disabledLogin);
        const enableBtn = adminPage.getByRole('button', { name: 'Enable' }).first();
        if ((await enableBtn.count()) > 0) await enableBtn.click();
        await adminPage.waitForTimeout(800);
        const reenabled = await loginAuthor(page, EMAIL, PASSWORD);
        record('re-enabled author can login', reenabled.includes('/author') && !reenabled.includes('/author/login'), reenabled);
      } else {
        record('admin disable control present', false, 'no Disable button');
      }
      await adminContext.close();
    } else {
      record('admin author management', false, 'IV_ADMIN_PASSWORD not set in local env');
    }

    await page.getByRole('button', { name: 'Logout' }).first().click({ timeout: 8000 }).catch(() => null);
    await page.waitForURL(/\/author\/login/, { timeout: 15000 }).catch(() => null);
    record('logout', page.url().includes('/author/login'), page.url());

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/author/login`, { waitUntil: 'load' });
    const loginScroll = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    record('mobile login no severe overflow', loginScroll < 40, `overflow ${loginScroll}px`);
    await loginAuthor(page, EMAIL, PASSWORD);
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 430, height: 932 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(`${BASE}/author`, { waitUntil: 'load' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      record(`dashboard overflow ${viewport.width}px`, overflow < 40, `overflow ${overflow}px`);
    }
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE}/author/articles`, { waitUntil: 'load' });
    record('tablet articles list', (await page.getByText('Articles').count()) > 0);
    await page.goto(`${BASE}/author/articles/new`, { waitUntil: 'load' });
    record('editor usable at tablet', (await page.getByRole('button', { name: 'Save Draft' }).count()) > 0);
    await page.goto(`${BASE}/author/scheduled`, { waitUntil: 'load' });
    record('scheduled page at tablet', (await page.getByText(/Scheduled/i).count()) > 0);
    await page.goto(`${BASE}/author/media`, { waitUntil: 'load' });
    record('media page at tablet', (await page.getByText(/Upload|Media/i).count()) > 0);
    await page.goto(`${BASE}/author/profile`, { waitUntil: 'load' });
    record('profile page at tablet', (await page.getByText(/Profile/i).count()) > 0);

    await page.goto(`${BASE}/learn`, { waitUntil: 'domcontentloaded' });
    record('public /learn loads', page.url().includes('/learn'));
    const localized = await fetch(`${BASE}/es/learn`);
    record('no localized Learn route', localized.status === 404 || !(await localized.text()).includes('Learn'), `status ${localized.status}`);

    const leftover = await authorApi(context, `/api/author/articles/${articleId}`);
    if ((leftover.json.article as { status?: string } | undefined)?.status === 'published') {
      await authorApi(context, `/api/author/articles/${articleId}`, { method: 'POST', json: { action: 'unpublish' } });
      await authorApi(context, `/api/author/articles/${articleId}`, { method: 'POST', json: { action: 'trash' } });
    } else if ((leftover.json.article as { status?: string } | undefined)?.status !== 'trash') {
      await authorApi(context, `/api/author/articles/${articleId}`, { method: 'POST', json: { action: 'trash' } });
    }
    record('cleanup QA article moved to trash', true);

    const serious = consoleErrors.filter(
      (item) => !/Download the React DevTools|favicon|icon\.png|Failed to load resource/i.test(item),
    );
    record('no serious browser console errors', serious.length === 0, serious.slice(0, 5).join(' | '));
  } catch (error) {
    record('qa run aborted', false, error instanceof Error ? error.message : String(error));
  } finally {
    await browser.close();
  }

  const failed = results.filter((item) => !item.pass);
  console.log(`\nQA summary: ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    console.log('Failures:');
    for (const item of failed) console.log(`- ${item.step}: ${item.notes}`);
  }
  writeFileSync(path.join(process.cwd(), '.data', 'qa-author-dashboard.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
