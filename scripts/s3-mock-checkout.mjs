/**
 * Full cart → checkout → place order (mock payments) smoke for sitewide-style S3.
 * Requires next dev (not next start) + IV_PAYMENTS_MODE=mock.
 * STYLE_GUARD_BASE=http://127.0.0.1:3026
 */
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const browser = await chromium.launch();
const page = await browser.newPage();
const log = (m) => console.log(m);

try {
  await page.goto(`${BASE}/buy-tiktok-followers`, {
    waitUntil: 'domcontentloaded',
    timeout: 90000,
  });
  await page.getByRole('button', { name: /add to cart/i }).first().click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ state: 'visible', timeout: 20000 });
  await dialog.locator('input').first().fill('s3_style_user');
  await dialog.getByRole('button', { name: /add to cart/i }).click();
  await page.waitForTimeout(800);
  log('PASS add-to-cart');

  await page.goto(`${BASE}/checkout`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  log('PASS open-checkout');

  await page.getByLabel(/email/i).first().fill('s3.style@example.com');
  const first = page.getByLabel(/first name/i).first();
  if (await first.count()) await first.fill('Style');
  const last = page.getByLabel(/last name/i).first();
  if (await last.count()) await last.fill('Guard');

  const terms = page.getByRole('checkbox', { name: /agree|terms/i });
  if (await terms.count()) await terms.first().check({ force: true });

  await Promise.all([
    page
      .waitForURL(/order-success|payment|mollie/i, { timeout: 45000 })
      .catch(() => null),
    page.getByRole('button', { name: /place order/i }).first().click(),
  ]);
  await page.waitForTimeout(1500);
  const url = page.url();
  log(`PASS place-order url=${url}`);
  if (/order-success/i.test(url)) {
    log('PASS mock checkout → order-success');
  } else if (/payment|mollie/i.test(url)) {
    log('PASS mock checkout → payment redirect');
  } else {
    const alert = await page
      .locator('[role=alert]')
      .first()
      .textContent()
      .catch(() => '');
    console.error('FAIL stayed on', url, alert);
    process.exitCode = 1;
  }
} catch (e) {
  console.error('FAIL', e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
