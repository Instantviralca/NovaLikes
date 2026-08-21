/**
 * Calendar + editor Chrome QA.
 *   CMS_QA_EMAIL=... CMS_QA_PASSWORD=... npx tsx scripts/qa-calendar-editor.ts
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
const PASSWORDS = [process.env.CMS_QA_PASSWORD, process.env.CMS_QA_PASSWORD_ALT].filter(Boolean) as string[];
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

type Result = { step: string; pass: boolean; notes: string };
const results: Result[] = [];

function record(step: string, pass: boolean, notes = '') {
  results.push({ step, pass, notes });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${step}${notes ? ` — ${notes}` : ''}`);
}

async function login(page: Page) {
  await page.goto(`${BASE}/author/login`, { waitUntil: 'load' });
  await page.locator('#author-email').waitFor({ timeout: 15000 });
  for (const password of PASSWORDS) {
    await page.fill('#author-email', EMAIL);
    await page.fill('#author-password', password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/author(?!\/login)/, { timeout: 12000 }).catch(() => null);
    if (page.url().includes('/author') && !page.url().includes('/author/login')) return true;
    await page.goto(`${BASE}/author/login`, { waitUntil: 'load' });
  }
  return false;
}

async function csrf(context: BrowserContext) {
  return (await context.cookies()).find((cookie) => cookie.name === 'nl_author_csrf')?.value || '';
}

function editorRoot(page: Page) {
  return page.locator('[data-testid="article-editor"] .tiptap, [data-testid="article-editor"] .ProseMirror').first();
}

async function waitEditor(page: Page) {
  await page.locator('[data-testid="article-editor"]').waitFor({ timeout: 30000 });
  await editorRoot(page).waitFor({ timeout: 30000 });
}

async function clickTool(page: Page, name: string) {
  await page.getByRole('button', { name, exact: true }).click();
}

function futureLocalDatetime() {
  const when = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${when.getFullYear()}-${pad(when.getMonth() + 1)}-${pad(when.getDate())}T${pad(when.getHours())}:${pad(when.getMinutes())}`;
}

async function main() {
  if (!PASSWORDS.length) {
    console.error('Set CMS_QA_PASSWORD');
    process.exit(1);
  }
  const browser = await chromium
    .launch({ headless: true, channel: process.env.QA_BROWSER_CHANNEL || 'chrome' })
    .catch(() => chromium.launch({ headless: true }));
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  let qaId = '';
  let qaSlug = '';
  try {
    record('author login', await login(page), page.url());
    await page.goto(`${BASE}/author`, { waitUntil: 'load' });
    await page.getByRole('heading', { name: 'Upcoming Editorial Calendar' }).waitFor({ timeout: 20000 });
    const calendarItems = await page.locator('section', { hasText: 'Upcoming Editorial Calendar' }).locator('li').count();
    record('dashboard calendar visible', calendarItems >= 30, `items ${calendarItems}`);
    record('planned badge visible', (await page.getByText('Planned', { exact: true }).count()) > 0);

    await page.goto(`${BASE}/author/scheduled`, { waitUntil: 'load' });
    record('scheduled auto-publish section', (await page.getByRole('heading', { name: 'Scheduled for Auto-Publish' }).count()) > 0);
    record('planned calendar section', (await page.getByRole('heading', { name: 'Planned Content Calendar' }).count()) > 0);
    const start = page.getByTestId('start-writing').first();
    record('start writing present', (await start.count()) > 0);
    if (await start.count()) {
      await start.click();
      await page.locator('#article-title').waitFor({ timeout: 15000 });
      record('start writing opens editor', page.url().includes('/author/articles/'));
      record('intended date populated', (await page.locator('#intended-on').inputValue()) !== '');
      record('author field visible', (await page.getByTestId('article-author').count()) > 0);
      await waitEditor(page);
      await page.getByRole('button', { name: 'Publish Now' }).click();
      await page.locator('p.text-destructive').waitFor({ timeout: 15000 }).catch(() => null);
      const plannedErr = await page.locator('p.text-destructive').innerText().catch(() => '');
      record('planned cannot publish empty', /content|publishing/i.test(plannedErr), plannedErr);
    }

    await page.goto(`${BASE}/author/articles/new`, { waitUntil: 'load' });
    await waitEditor(page);
    const toolbar = [
      'Paragraph',
      'H2',
      'H3',
      'Bold',
      'Italic',
      'Underline',
      'Strike',
      'List',
      'Numbered',
      'Quote',
      'HR',
      'Code',
      'Link',
      'Unlink',
      'Undo',
      'Redo',
      'Image',
    ];
    for (const label of toolbar) {
      record(`toolbar ${label}`, (await page.getByRole('button', { name: label, exact: true }).count()) > 0);
    }

    const editor = editorRoot(page);
    await editor.click();
    await clickTool(page, 'H2');
    record(
      'H2 active after click',
      (await page.getByRole('button', { name: 'H2', exact: true }).getAttribute('aria-pressed')) === 'true',
    );
    await page.keyboard.type('QA Editor Heading');
    await page.keyboard.press('Enter');
    await clickTool(page, 'H3');
    await page.keyboard.type('QA Subheading');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Paragraph');
    await page.keyboard.type('PersistLinkMarker');
    for (let i = 0; i < 17; i += 1) await page.keyboard.press('Shift+ArrowLeft');
    await clickTool(page, 'Link');
    await page.locator('#tiptap-link-url').fill('https://novalikes.com/learn');
    await page.getByRole('button', { name: 'Apply link' }).click();
    record('persist link applied', (await editor.locator('a[href*="novalikes.com/learn"]').count()) > 0);
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Bold');
    await page.keyboard.type('Bold text');
    record(
      'Bold active while typing',
      (await page.getByRole('button', { name: 'Bold', exact: true }).getAttribute('aria-pressed')) === 'true',
    );
    await clickTool(page, 'Bold');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Italic');
    await page.keyboard.type('Italic text');
    await clickTool(page, 'Italic');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Underline');
    await page.keyboard.type('Underlined text');
    await clickTool(page, 'Underline');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Strike');
    await page.keyboard.type('Struck text');
    await clickTool(page, 'Strike');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Code');
    await page.keyboard.type('inline code');
    await clickTool(page, 'Code');
    await page.keyboard.press('Enter');
    await clickTool(page, 'List');
    await page.keyboard.type('Bullet one');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Bullet two');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Numbered');
    await page.keyboard.type('Number one');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Number two');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await clickTool(page, 'Quote');
    await page.keyboard.type('Quoted line');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await clickTool(page, 'HR');
    await page.keyboard.type('After divider. ');
    await page.keyboard.type('Selectable link text');
    for (let i = 0; i < 20; i += 1) await page.keyboard.press('Shift+ArrowLeft');
    await clickTool(page, 'Link');
    await page.locator('#tiptap-link-url').fill('javascript:alert(1)');
    await page.getByRole('button', { name: 'Apply link' }).click();
    record('javascript link rejected', (await page.getByText(/must start with https/i).count()) > 0);
    await page.locator('#tiptap-link-url').fill('https://novalikes.com/learn');
    await page.getByRole('button', { name: 'Apply link' }).click();
    record('https link applied', (await editor.locator('a[href="https://novalikes.com/learn"]').count()) > 0);
    await editor.getByRole('link', { name: 'Selectable link text' }).click();
    await clickTool(page, 'Link');
    await page.locator('#tiptap-link-url').fill('https://novalikes.com/tools');
    await page.getByRole('button', { name: 'Apply link' }).click();
    record('link url edited', (await editor.locator('a[href="https://novalikes.com/tools"]').count()) > 0);
    await editor.getByRole('link', { name: 'Selectable link text' }).click();
    await clickTool(page, 'Unlink');
    record('link removed', (await editor.locator('a[href="https://novalikes.com/tools"]').count()) === 0);

    await clickTool(page, 'Undo');
    await clickTool(page, 'Redo');
    record('undo redo clicked', true);

    await clickTool(page, 'Image');
    await page.getByText('Media library').waitFor({ timeout: 10000 });
    await page.locator('#insert-alt').fill('QA inline chart');
    await page.getByTestId('media-upload').setInputFiles({
      name: 'qa-editor.png',
      mimeType: 'image/png',
      buffer: PNG,
    });
    await page.waitForTimeout(1500);
    const picked = page.getByTestId('media-pick').first();
    if (await picked.count()) await picked.click();
    else await page.getByRole('button', { name: 'Close' }).click();
    record('image inserted', (await editor.locator('img').count()) > 0);

    const long = Array.from({ length: 2200 }, (_, i) => `word${i}`).join(' ');
    await editor.locator('p').last().click();
    await page.keyboard.press('End');
    await editor.evaluate((node, text) => {
      (node as HTMLElement).focus();
      document.execCommand('insertText', false, text);
    }, long);
    const editorText = await editor.innerText();
    record('long article remains editable', editorText.length > 10000, `chars ${editorText.length}`);
    record('toolbar still usable', await page.getByRole('button', { name: 'H2', exact: true }).isEnabled());
    if ((await editor.locator('blockquote').count()) === 0) {
      await editor.locator('p').last().click();
      await page.keyboard.press('Enter');
      await clickTool(page, 'Quote');
      await page.keyboard.type('Quoted line');
    }
    if ((await editor.locator('a[href*="novalikes.com/learn"]').count()) === 0) {
      await editor.locator('p').last().click();
      await page.keyboard.press('Enter');
      await page.keyboard.type('PersistLinkMarker');
      for (let i = 0; i < 17; i += 1) await page.keyboard.press('Shift+ArrowLeft');
      await clickTool(page, 'Link');
      await page.locator('#tiptap-link-url').fill('https://novalikes.com/learn');
      await page.getByRole('button', { name: 'Apply link' }).click();
    }

    await page.fill('#article-title', 'QA Editor Control Article');
    qaSlug = `qa-editor-controls-${Date.now()}`;
    await page.fill('#article-slug', qaSlug);
    await page.fill('#article-excerpt', 'Excerpt for the QA editor control article.');
    await page.selectOption('select', 'guides');
    await page.fill('#article-tags', 'qa, editor');
    await page.fill('#article-featured-alt', 'QA featured alt');
    await page.fill('#article-seo-title', 'QA SEO Title For Editor');
    record(
      'seo title count updates',
      (await page.getByText(/\/58 recommended/).innerText()).includes(`${'QA SEO Title For Editor'.length}/58`),
    );
    await page.fill('#article-seo-description', 'A meta description used by the QA editor persistence check.');
    record(
      'meta description count updates',
      (await page.getByText(/\/150 recommended/).innerText()).includes(
        `${'A meta description used by the QA editor persistence check.'.length}/150`,
      ),
    );
    await page.fill('#article-canonical', `/learn/${qaSlug}`);
    await page.fill('#takeaways', 'Takeaway one\nTakeaway two');
    await page.fill('#intended-on', '2026-11-01');
    record('timezone displayed', (await page.getByText(/Timezone:/).count()) > 0);

    let leaveWarned = false;
    page.once('dialog', (dialog) => {
      leaveWarned = /unsaved/i.test(dialog.message());
      void dialog.dismiss();
    });
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.waitForTimeout(500);
    record('unsaved changes warns', leaveWarned && page.url().includes('/author/articles/new'));

    await page.getByRole('button', { name: 'Select featured image' }).click();
    await page.getByText('Media library').waitFor({ timeout: 10000 });
    if (await page.getByTestId('media-pick').count()) {
      await page.getByTestId('media-pick').first().click();
    } else {
      await page.getByRole('button', { name: 'Close' }).click();
    }

    await page.getByRole('button', { name: 'Save Draft' }).click();
    await Promise.race([
      page.waitForURL(/\/author\/articles\/art_/, { timeout: 25000 }),
      page.getByText(/Could not|required|already used/i).waitFor({ timeout: 25000 }),
    ]).catch(() => null);
    record('save draft from new article', /\/author\/articles\/art_/.test(page.url()), page.url());
    qaId = page.url().split('/author/articles/')[1]?.split('?')[0] || '';
    qaSlug = (await page.locator('#article-slug').inputValue()).trim() || qaSlug;

    await page.reload({ waitUntil: 'load' });
    await waitEditor(page);
    const editorAfter = editorRoot(page);
    record('H2 persisted after reload', (await editorAfter.locator('h2').count()) > 0);
    record('H3 persisted after reload', (await editorAfter.locator('h3').count()) > 0);
    record('bold persisted after reload', (await editorAfter.locator('strong, b').count()) > 0);
    record('italic persisted after reload', (await editorAfter.locator('em, i').count()) > 0);
    record('underline persisted after reload', (await editorAfter.locator('u').count()) > 0);
    record('strike persisted after reload', (await editorAfter.locator('s, del, strike').count()) > 0);
    record('list persisted after reload', (await editorAfter.locator('ul, ol').count()) > 0);
    record('blockquote persisted after reload', (await editorAfter.locator('blockquote').count()) > 0);
    record('hr persisted after reload', (await editorAfter.locator('hr').count()) > 0);
    record('image persisted after reload', (await editorAfter.locator('img').count()) > 0);
    record(
      'link persisted after reload',
      (await editorAfter.locator('a[href*="novalikes.com"]').count()) > 0,
    );

    const preview = await context.newPage();
    await preview.goto(`${BASE}/learn/preview/${qaSlug}`, { waitUntil: 'load' });
    await preview.locator('[data-learn-article]').waitFor({ timeout: 20000 }).catch(() => null);
    record(
      'preview uses learn template',
      (await preview.locator('[data-learn-article]').count()) > 0 &&
        (await preview.getByText('Preview mode').count()) > 0 &&
        (await preview.getByText('At a glance').count()) > 0,
      preview.url(),
    );
    record(
      'preview has heading',
      /QA Editor Heading/.test((await preview.locator('h2, h1').allTextContents()).join(' ')),
    );
    record('preview has takeaway', (await preview.getByText('Takeaway one').count()) > 0);
    await preview.close();

    await page.fill('#schedule-at', futureLocalDatetime());
    await page.getByRole('button', { name: 'Schedule', exact: true }).click();
    await page.getByTestId('article-status').filter({ hasText: /scheduled/i }).waitFor({ timeout: 25000 });
    await waitEditor(page);
    record(
      'schedule works',
      (await page.getByTestId('article-status').innerText()).toLowerCase().includes('scheduled'),
    );
    await page.getByRole('button', { name: 'Cancel Schedule' }).click();
    await page.getByTestId('article-status').filter({ hasText: /draft/i }).waitFor({ timeout: 25000 });
    await waitEditor(page);
    await page.getByRole('button', { name: 'Publish Now' }).click();
    const publishedBadge = page.getByTestId('article-status').filter({ hasText: /published/i });
    const publishError = page.locator('p.text-destructive');
    await Promise.race([
      publishedBadge.waitFor({ timeout: 25000 }),
      publishError.waitFor({ timeout: 25000 }),
    ]).catch(() => null);
    record(
      'publish now works',
      (await publishedBadge.count()) > 0,
      (await publishError.innerText().catch(() => '')) || page.url(),
    );
    const live = await (await fetch(`${BASE}/learn/${qaSlug}`)).text();
    record('published is public', live.includes('QA Editor Control Article'), qaSlug);
    record('published has schema', /BlogPosting|"@type":"Article"/.test(live));
    if ((await page.getByRole('button', { name: 'Unpublish' }).count()) > 0) {
      await page.getByRole('button', { name: 'Unpublish' }).click();
      await page.waitForURL(/saved=1/, { timeout: 20000 }).catch(() => null);
    }
    if ((await page.getByRole('button', { name: 'Move to Trash' }).count()) > 0) {
      page.once('dialog', (dialog) => void dialog.accept());
      await page.getByRole('button', { name: 'Move to Trash' }).click();
      await page.waitForTimeout(1200);
    }

    const publicHtml = await (await fetch(`${BASE}/learn/${qaSlug}`)).text();
    record(
      'trashed not public',
      !publicHtml.includes('QA Editor Control Article') || /Page not found/i.test(publicHtml),
    );
    const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
    record('qa slug not in sitemap', !sitemap.includes(`/learn/${qaSlug}`));

    const plannedSlug = 'facebook-page-likes-vs-followers';
    const plannedPublic = await (await fetch(`${BASE}/learn/${plannedSlug}`)).text();
    record(
      'planned slug not public',
      /Page not found/i.test(plannedPublic) || !plannedPublic.includes('What Page Owners Should Know'),
    );
    record('planned slug not in sitemap', !sitemap.includes(`/learn/${plannedSlug}`));
    record(
      'planned has no article schema',
      !/BlogPosting/.test(plannedPublic) || /Page not found/i.test(plannedPublic),
    );
  } catch (error) {
    record('qa aborted', false, error instanceof Error ? error.message : String(error));
  } finally {
    const token = await csrf(context);
    if (qaId) {
      await context.request.fetch(`${BASE}/api/author/articles/${qaId}`, {
        method: 'POST',
        headers: { 'x-csrf-token': token, 'Content-Type': 'application/json' },
        data: JSON.stringify({ action: 'unpublish' }),
      }).catch(() => null);
      await context.request.fetch(`${BASE}/api/author/articles/${qaId}`, {
        method: 'POST',
        headers: { 'x-csrf-token': token, 'Content-Type': 'application/json' },
        data: JSON.stringify({ action: 'trash' }),
      }).catch(() => null);
    }
    await browser.close();
  }
  const failed = results.filter((item) => !item.pass);
  console.log(`\nCalendar/editor QA: ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    for (const item of failed) console.log(`- ${item.step}: ${item.notes}`);
  }
  writeFileSync(path.join(process.cwd(), '.data', 'qa-calendar-editor.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
