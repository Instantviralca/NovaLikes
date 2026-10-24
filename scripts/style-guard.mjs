/**
 * Style-guard: capture / diff text+meta+links+images for sitewide restyle.
 *
 * Usage:
 *   node scripts/style-guard.mjs capture --out=reports/sitewide-style/s0/snapshots
 *   node scripts/style-guard.mjs check  --baseline=reports/sitewide-style/s0/snapshots
 *
 * Env:
 *   STYLE_GUARD_BASE=http://127.0.0.1:3026
 */
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
if (!playwrightPath) {
  console.error('playwright not found — set PLAYWRIGHT_PACKAGE or install in TEMP/nl-pw');
  process.exit(1);
}
const { chromium } = require(playwrightPath);

export const STYLE_GUARD_URLS = [
  '/',
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
  '/learn',
  '/learn/tiktok',
  '/learn/tiktok-shadowban',
  '/learn/how-instagram-algorithm-works',
  '/tools',
  '/tools/tiktok-video-downloader',
  '/about',
  '/contact',
  '/reviews',
  '/faq',
  '/services',
  '/terms-and-conditions',
  '/refund-policy',
  '/privacy-policy',
  '/track-order',
  '/cart',
  '/checkout',
  '/order-success',
  '/login',
  '/dashboard',
  '/de/',
  '/de/allgemeine-geschaeftsbedingungen',
  '/ar/',
  '/uk/',
  '/uk/buy-instagram-followers',
];

export function slugFor(urlPath) {
  if (urlPath === '/') return 'root';
  return urlPath
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/\//g, '__')
    .replace(/[^a-zA-Z0-9._-]+/g, '_');
}

function normalizeText(s) {
  return String(s || '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

async function ensureCartItem(page) {
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
  });
  await page.goto(`${BASE}/buy-tiktok-followers`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(500);
  const add = page.getByRole('button', { name: /add to cart/i }).first();
  if (await add.count()) {
    await add.click().catch(() => {});
    const dialog = page.getByRole('dialog');
    if (await dialog.isVisible().catch(() => false)) {
      const input = dialog.locator('input').first();
      if (await input.count()) {
        await input.fill('style_guard_user');
      }
      await dialog.getByRole('button', { name: /add to cart/i }).click().catch(() => {});
      await page.waitForTimeout(500);
    }
  }
}

async function capturePage(page, urlPath) {
  const needsCart = urlPath === '/cart' || urlPath === '/checkout';
  if (needsCart) {
    await ensureCartItem(page);
  }

  const target = `${BASE}${urlPath}`;
  const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(500);

  const payload = await page.evaluate(() => {
    const abs = (href) => {
      try {
        return new URL(href, location.href).pathname + new URL(href, location.href).search + new URL(href, location.href).hash;
      } catch {
        return href;
      }
    };

    const headings = [...document.querySelectorAll('h1,h2,h3')].map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || '').trim(),
    }));

    const title = document.title || '';
    const metaDescription =
      document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const canonical =
      document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

    const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => {
        try {
          return JSON.stringify(JSON.parse(s.textContent || 'null'));
        } catch {
          return (s.textContent || '').trim();
        }
      })
      .sort();

    const hrefs = [...document.querySelectorAll('a[href]')]
      .map((a) => abs(a.getAttribute('href') || ''))
      .filter(Boolean)
      .sort();

    const images = [...document.querySelectorAll('img')]
      .map((img) => ({
        src: abs(img.getAttribute('src') || ''),
        alt: img.getAttribute('alt') ?? '',
        width: img.getAttribute('width') || '',
        height: img.getAttribute('height') || '',
      }))
      .sort((a, b) => (a.src + a.alt).localeCompare(b.src + b.alt));

    const body = document.body?.innerText || '';

    return {
      status: 0,
      finalPath: location.pathname + location.search,
      title,
      metaDescription,
      canonical,
      headings,
      jsonLd,
      hrefs,
      images,
      body,
    };
  });

  payload.status = response?.status() ?? 0;
  payload.url = urlPath;
  payload.body = normalizeText(payload.body);
  payload.title = normalizeText(payload.title);
  payload.metaDescription = normalizeText(payload.metaDescription);
  payload.headings = payload.headings.map((h) => ({
    tag: h.tag,
    text: normalizeText(h.text),
  }));

  // Stable stringify without volatile bits (timestamps in body are rare; keep body as-is)
  return payload;
}

function fingerprint(snapshot) {
  const clone = { ...snapshot };
  // finalPath may redirect (login → login?next=) — keep it in snapshot for visibility
  // but hash excludes nothing essential; status codes should be stable
  return createHash('sha256').update(JSON.stringify(clone)).digest('hex').slice(0, 16);
}

async function withBrowser(fn) {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      locale: 'en-US',
    });
    const page = await context.newPage();
    return await fn(page, context);
  } finally {
    await browser.close();
  }
}

async function captureAll(outDir) {
  mkdirSync(outDir, { recursive: true });
  const index = [];
  await withBrowser(async (page) => {
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.evaluate(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {}
    });
    for (const urlPath of STYLE_GUARD_URLS) {
      const slug = slugFor(urlPath);
      process.stdout.write(`capture ${urlPath} ... `);
      try {
        const snap = await capturePage(page, urlPath);
        const file = path.join(outDir, `${slug}.json`);
        writeFileSync(file, JSON.stringify(snap, null, 2) + '\n', 'utf8');
        index.push({ url: urlPath, slug, fp: fingerprint(snap), status: snap.status, finalPath: snap.finalPath });
        console.log(`ok status=${snap.status} fp=${fingerprint(snap)}`);
      } catch (err) {
        console.log('FAIL');
        console.error(err);
        index.push({ url: urlPath, slug, error: String(err) });
      }
    }
  });
  writeFileSync(path.join(outDir, '_index.json'), JSON.stringify(index, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${index.length} snapshots → ${outDir}`);
}

function deepDiff(a, b, prefix = '') {
  const diffs = [];
  if (typeof a !== typeof b) {
    diffs.push(`${prefix}: type ${typeof a} → ${typeof b}`);
    return diffs;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) diffs.push(`${prefix}: length ${a.length} → ${b.length}`);
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) {
      diffs.push(...deepDiff(a[i], b[i], `${prefix}[${i}]`));
    }
    return diffs;
  }
  if (a && b && typeof a === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      diffs.push(...deepDiff(a[k], b[k], prefix ? `${prefix}.${k}` : k));
    }
    return diffs;
  }
  if (a !== b) {
    const av = JSON.stringify(a);
    const bv = JSON.stringify(b);
    diffs.push(`${prefix}: ${String(av).slice(0, 160)} → ${String(bv).slice(0, 160)}`);
  }
  return diffs;
}

async function check(baselineDir) {
  if (!existsSync(baselineDir)) {
    console.error(`Missing baseline: ${baselineDir}`);
    process.exit(1);
  }
  let failed = 0;
  await withBrowser(async (page) => {
    for (const urlPath of STYLE_GUARD_URLS) {
      const slug = slugFor(urlPath);
      const baseFile = path.join(baselineDir, `${slug}.json`);
      if (!existsSync(baseFile)) {
        console.log(`MISSING_BASELINE ${urlPath}`);
        failed += 1;
        continue;
      }
      const before = JSON.parse(readFileSync(baseFile, 'utf8'));
      process.stdout.write(`check ${urlPath} ... `);
      try {
        const after = await capturePage(page, urlPath);
        const diffs = deepDiff(before, after);
        if (diffs.length === 0) {
          console.log('EMPTY');
        } else {
          failed += 1;
          console.log(`DIFF (${diffs.length})`);
          for (const d of diffs.slice(0, 12)) console.log('  ', d);
          if (diffs.length > 12) console.log(`  … +${diffs.length - 12} more`);
        }
      } catch (err) {
        failed += 1;
        console.log('FAIL');
        console.error(err);
      }
    }
  });
  if (failed === 0) {
    console.log('STYLE_GUARD_OK empty diff');
    process.exit(0);
  }
  console.log(`STYLE_GUARD_FAIL count=${failed}`);
  process.exit(1);
}

const isMain =
  process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'check';
  const getArg = (name, fallback) => {
    const hit = args.find((a) => a.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : fallback;
  };

  if (cmd === 'capture') {
    const out = path.resolve(ROOT, getArg('out', 'reports/sitewide-style/s0/snapshots'));
    await captureAll(out);
  } else if (cmd === 'check') {
    const baseline = path.resolve(ROOT, getArg('baseline', 'reports/sitewide-style/s0/snapshots'));
    await check(baseline);
  } else if (cmd === 'list') {
    console.log(STYLE_GUARD_URLS.join('\n'));
  } else {
    console.error('Usage: node scripts/style-guard.mjs capture|check|list');
    process.exit(1);
  }
}
