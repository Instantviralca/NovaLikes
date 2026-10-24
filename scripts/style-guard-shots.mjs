/**
 * Screenshots for sitewide-style stages.
 * Usage:
 *   node scripts/style-guard-shots.mjs --out=reports/sitewide-style/s0/before --urls=all
 *   node scripts/style-guard-shots.mjs --out=reports/sitewide-style/s1/after --urls=s1
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STYLE_GUARD_URLS, slugFor } from './style-guard.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASE = process.env.STYLE_GUARD_BASE || 'http://127.0.0.1:3026';
const require = createRequire(import.meta.url);
const playwrightPath = [
  process.env.PLAYWRIGHT_PACKAGE,
  path.join(process.env.TEMP || '', 'nl-pw', 'node_modules', 'playwright'),
  path.join(ROOT, 'node_modules', 'playwright'),
].find((p) => p && existsSync(p));
const { chromium } = require(playwrightPath);

const S1_URLS = [
  '/', // header/footer context
  '/buy-tiktok-followers',
  '/learn/tiktok-shadowban',
  '/checkout',
];

const S3_TOOLS_COMPANY = [
  '/tools',
  '/tools/tiktok-video-downloader',
  '/about',
  '/contact',
  '/reviews',
  '/faq',
  '/services',
];

const S3_LEGAL_COMMERCE = [
  '/terms-and-conditions',
  '/refund-policy',
  '/privacy-policy',
  '/track-order',
  '/cart',
  '/checkout',
  '/order-success',
];

const S3_ACCOUNT = ['/login', '/dashboard'];

const S4_HEROES = [
  '/buy-tiktok-followers',
  '/buy-tiktok-likes',
  '/buy-tiktok-views',
  '/buy-instagram-followers',
  '/buy-instagram-likes',
  '/buy-instagram-views',
  '/buy-instagram-comments',
  '/buy-facebook-followers',
  '/buy-facebook-page-likes',
  '/buy-facebook-post-likes',
  '/learn/tiktok-shadowban',
  '/learn',
  '/about',
  '/faq',
  '/terms-and-conditions',
  '/cart',
  '/dashboard',
  '/de/',
  '/uk/buy-instagram-followers',
];

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const outDir = path.resolve(ROOT, getArg('out', 'reports/sitewide-style/s0/before'));
const which = getArg('urls', 'all');
const urls =
  which === 's1'
    ? S1_URLS
    : which === 's3-tools-company'
      ? S3_TOOLS_COMPANY
      : which === 's3-legal-commerce'
        ? S3_LEGAL_COMMERCE
        : which === 's3-account'
          ? S3_ACCOUNT
          : which === 's4'
            ? S4_HEROES
            : STYLE_GUARD_URLS;

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

async function ensureCart(page) {
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
  });
  await page.goto(`${BASE}/buy-tiktok-followers`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const add = page.getByRole('button', { name: /add to cart/i }).first();
  if (await add.count()) {
    await add.click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    if (await dialog.isVisible().catch(() => false)) {
      await dialog.locator('input').first().fill('style_guard_user');
      await dialog.getByRole('button', { name: /add to cart/i }).click();
      await page.waitForTimeout(400);
    }
  }
}

for (const urlPath of urls) {
  const slug = slugFor(urlPath);
  if (urlPath === '/cart' || urlPath === '/checkout') {
    await ensureCart(page);
  }
  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: width === 1280 ? 900 : 812 });
    await page.goto(`${BASE}${urlPath}`, { waitUntil: 'networkidle', timeout: 90000 }).catch(async () => {
      await page.goto(`${BASE}${urlPath}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    });
    await page.waitForTimeout(350);
    const file = path.join(outDir, `${width}-${slug}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log('shot', width, slug);
  }
}

// Extra crops for S1 report: header / footer on homepage
if (which === 's1' || which === 'all') {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const header = page.locator('header').first();
  if (await header.count()) {
    await header.screenshot({ path: path.join(outDir, '1280-header.png') });
  }
  const footer = page.locator('footer').first();
  if (await footer.count()) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await footer.screenshot({ path: path.join(outDir, '1280-footer.png') });
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  if (await page.locator('header').count()) {
    await page.locator('header').first().screenshot({ path: path.join(outDir, '375-header.png') });
  }
  if (await page.locator('footer').count()) {
    await page.locator('footer').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.locator('footer').first().screenshot({ path: path.join(outDir, '375-footer.png') });
  }
}

await browser.close();
console.log('SHOTS_DONE', outDir);
