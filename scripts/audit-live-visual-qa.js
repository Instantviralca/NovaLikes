/**
 * Live visual QA audit for 40 market service pages (AUDIT ONLY).
 * Outputs reports/four-market-live-visual-qa.json
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const BASE = process.env.QA_BASE || 'http://localhost:3000';
const registry = require('../data/market-unique-service-images.json');
const EXCL = new Set(['likes-vs-views', 'real-experience', 'profile-experience', 'page-trust']);

const MARKETS = ['ca', 'au', 'us', 'uk'];
const SLUGS = [
  'buy-instagram-followers',
  'buy-instagram-likes',
  'buy-instagram-views',
  'buy-instagram-comments',
  'buy-tiktok-followers',
  'buy-tiktok-likes',
  'buy-tiktok-views',
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
];

const MARKET_FOLDER = { ca: 'ca', au: 'au', us: 'us', uk: 'uk' };
const SERVICE_FOLDER = {
  'buy-instagram-followers': 'instagram-followers',
  'buy-instagram-likes': 'instagram-likes',
  'buy-instagram-views': 'instagram-views',
  'buy-instagram-comments': 'instagram-comments',
  'buy-tiktok-followers': 'tiktok-followers',
  'buy-tiktok-likes': 'tiktok-likes',
  'buy-tiktok-views': 'tiktok-views',
  'buy-facebook-followers': 'facebook-followers',
  'buy-facebook-page-likes': 'facebook-page-likes',
  'buy-facebook-post-likes': 'facebook-post-likes',
};

function platformOf(slug) {
  if (slug.includes('instagram')) return 'instagram';
  if (slug.includes('tiktok')) return 'tiktok';
  if (slug.includes('facebook')) return 'facebook';
  return 'unknown';
}

function metricOf(slug) {
  if (slug.includes('comments')) return 'comments';
  if (slug.includes('followers')) return 'followers';
  if (slug.includes('page-likes')) return 'page-likes';
  if (slug.includes('post-likes')) return 'post-likes';
  if (slug.includes('likes')) return 'likes';
  if (slug.includes('views')) return 'views';
  return 'unknown';
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 120000 }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout ' + url));
    });
  });
}

function headOrGet(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 30000 }, (res) => {
      res.resume();
      resolve({ status: res.statusCode, type: res.headers['content-type'] || '' });
    });
    req.on('error', (e) => resolve({ status: 0, error: String(e.message) }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'timeout' });
    });
  });
}

function extractAssetPaths(html) {
  const set = new Set();
  const re = /\/assets\/images\/illustrations\/markets\/[a-z]+\/[a-z0-9\-]+\/[a-z0-9\-_.]+\.webp/gi;
  let m;
  while ((m = re.exec(html))) set.add(m[0].split('?')[0]);
  // also from encoded next/image
  const re2 = /url=%2Fassets%2Fimages%2Fillustrations%2Fmarkets%2F([a-z]+)%2F([a-z0-9\-]+)%2F([a-z0-9\-_.]+\.webp)/gi;
  while ((m = re2.exec(html))) {
    set.add(`/assets/images/illustrations/markets/${m[1]}/${m[2]}/${m[3]}`);
  }
  return [...set];
}

async function main() {
  const issues = [];
  const pageResults = [];
  const visiblePlacements = registry.placements.filter((p) => !EXCL.has(p.sectionId));

  // --- Registry integrity ---
  const srcCounts = new Map();
  for (const p of visiblePlacements) {
    srcCounts.set(p.src, (srcCounts.get(p.src) || 0) + 1);
    const abs = path.join(ROOT, 'public', p.src.replace(/^\//, ''));
    if (!fs.existsSync(abs)) {
      issues.push({
        severity: 'P0',
        type: 'broken_missing_file',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: 'File missing on disk',
      });
      continue;
    }
    const st = fs.statSync(abs);
    if (st.size < 5000) {
      issues.push({
        severity: 'P0',
        type: 'broken_tiny_file',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: `File only ${st.size} bytes`,
      });
    }

    // Filename / path match
    const expectedFolder = SERVICE_FOLDER[p.slug];
    const parts = p.src.split('/');
    const marketPart = parts[5];
    const folderPart = parts[6];
    const file = parts[7] || '';
    if (marketPart !== p.market) {
      issues.push({
        severity: 'P0',
        type: 'filename_market_mismatch',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: `Path market ${marketPart} != ${p.market}`,
      });
    }
    if (folderPart !== expectedFolder) {
      issues.push({
        severity: 'P0',
        type: 'wrong_platform_or_service_folder',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: `Folder ${folderPart} != ${expectedFolder}`,
      });
    }
    const plat = platformOf(p.slug);
    const metric = metricOf(p.slug);
    if (!file.includes(plat.replace('instagram', 'instagram')) && !folderPart.includes(plat)) {
      // folder check is enough
    }
    if (!folderPart.includes(plat)) {
      issues.push({
        severity: 'P0',
        type: 'wrong_platform',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: `Expected platform ${plat} in folder`,
      });
    }
    // metric in folder
    const metricOk =
      (metric === 'page-likes' && folderPart.includes('page-likes')) ||
      (metric === 'post-likes' && folderPart.includes('post-likes')) ||
      (metric === 'followers' && folderPart.includes('followers')) ||
      (metric === 'likes' && folderPart.includes('likes') && !folderPart.includes('page') && !folderPart.includes('post')) ||
      (metric === 'views' && folderPart.includes('views')) ||
      (metric === 'comments' && folderPart.includes('comments'));
    if (!metricOk) {
      issues.push({
        severity: 'P1',
        type: 'wrong_metric_folder',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: `Metric ${metric} vs folder ${folderPart}`,
      });
    }
    // section purpose in filename
    const sectionToken = p.sectionId.replace(/_/g, '-');
    const fileNorm = file.replace(/_/g, '-');
    // does-help maps to does-buying-help in filenames often
    const sectionAliases = {
      'does-help': ['does-help', 'does-buying-help'],
    };
    const aliases = sectionAliases[p.sectionId] || [sectionToken, p.sectionId];
    const hasSection = aliases.some((a) => fileNorm.includes(a) || file.includes(p.sectionId));
    if (!hasSection) {
      issues.push({
        severity: 'P2',
        type: 'filename_section_weak',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: `Filename may not include section ${p.sectionId}`,
      });
    }

    // Alt text basic
    if (!p.alt || p.alt.length < 20) {
      issues.push({
        severity: 'P2',
        type: 'alt_too_short',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: p.alt || '(empty)',
      });
    } else {
      const altL = p.alt.toLowerCase();
      if (plat === 'instagram' && !altL.includes('instagram')) {
        issues.push({
          severity: 'P2',
          type: 'alt_platform_mismatch',
          page: `${p.market}/${p.slug}`,
          section: p.sectionId,
          src: p.src,
          detail: 'Alt missing Instagram',
        });
      }
      if (plat === 'tiktok' && !altL.includes('tiktok')) {
        issues.push({
          severity: 'P2',
          type: 'alt_platform_mismatch',
          page: `${p.market}/${p.slug}`,
          section: p.sectionId,
          src: p.src,
          detail: 'Alt missing TikTok',
        });
      }
      if (plat === 'facebook' && !altL.includes('facebook')) {
        issues.push({
          severity: 'P2',
          type: 'alt_platform_mismatch',
          page: `${p.market}/${p.slug}`,
          section: p.sectionId,
          src: p.src,
          detail: 'Alt missing Facebook',
        });
      }
    }

    // Dimensions / aspect via sharp
    try {
      const meta = await sharp(abs).metadata();
      if (meta.width && meta.height) {
        const ratio = meta.width / meta.height;
        if (ratio < 1.1 || ratio > 1.8) {
          issues.push({
            severity: 'P2',
            type: 'unusual_aspect',
            page: `${p.market}/${p.slug}`,
            section: p.sectionId,
            src: p.src,
            detail: `${meta.width}x${meta.height} ratio=${ratio.toFixed(2)}`,
          });
        }
        if (meta.width < 800) {
          issues.push({
            severity: 'P1',
            type: 'low_resolution',
            page: `${p.market}/${p.slug}`,
            section: p.sectionId,
            src: p.src,
            detail: `${meta.width}x${meta.height}`,
          });
        }
      }
    } catch (e) {
      issues.push({
        severity: 'P1',
        type: 'image_decode_error',
        page: `${p.market}/${p.slug}`,
        section: p.sectionId,
        src: p.src,
        detail: String(e.message || e),
      });
    }
  }

  for (const [src, count] of srcCounts) {
    if (count > 1) {
      issues.push({
        severity: 'P0',
        type: 'duplicate_path',
        src,
        detail: `Used ${count} times in visible placements`,
      });
    }
  }

  // --- Live page checks ---
  let pagesOk = 0;
  let placementsSeenLive = 0;
  for (const market of MARKETS) {
    for (const slug of SLUGS) {
      const route = `/${market}/${slug}`;
      const url = `${BASE}${route}`;
      let status = 0;
      let body = '';
      try {
        const res = await fetchText(url);
        status = res.status;
        body = res.body || '';
      } catch (e) {
        issues.push({
          severity: 'P0',
          type: 'page_fetch_failed',
          page: `${market}/${slug}`,
          detail: String(e.message || e),
        });
        pageResults.push({ route, status: 0, images: 0, ok: false });
        continue;
      }
      if (status !== 200) {
        issues.push({
          severity: 'P0',
          type: 'page_non_200',
          page: `${market}/${slug}`,
          detail: `HTTP ${status}`,
        });
        pageResults.push({ route, status, images: 0, ok: false });
        continue;
      }
      pagesOk++;

      const assets = extractAssetPaths(body);
      placementsSeenLive += assets.length;

      // Expected registry srcs for this page (visible)
      const expected = visiblePlacements.filter((p) => p.market === market && p.slug === slug);
      const expectedSrcs = new Set(expected.map((p) => p.src));

      // Wrong platform asset on page
      const plat = platformOf(slug);
      for (const a of assets) {
        if (!a.includes(`/markets/${market}/`)) {
          issues.push({
            severity: 'P0',
            type: 'wrong_market_asset_on_page',
            page: `${market}/${slug}`,
            src: a,
            detail: 'Asset market folder mismatch',
          });
        }
        if (!a.includes(`/${SERVICE_FOLDER[slug]}/`)) {
          // might be shared decorative — only flag if markets/ unique path
          if (a.includes('/illustrations/markets/')) {
            issues.push({
              severity: 'P0',
              type: 'wrong_service_folder_on_page',
              page: `${market}/${slug}`,
              src: a,
              detail: `Expected ${SERVICE_FOLDER[slug]}`,
            });
          }
        }
        if (a.includes('/illustrations/markets/') && !a.includes(plat)) {
          issues.push({
            severity: 'P0',
            type: 'wrong_platform_on_page',
            page: `${market}/${slug}`,
            src: a,
            detail: `Asset path missing ${plat}`,
          });
        }
      }

      // Missing expected images in HTML (hero at least)
      const hero = expected.find((p) => p.sectionId === 'hero');
      if (hero && !body.includes(path.basename(hero.src))) {
        issues.push({
          severity: 'P0',
          type: 'hero_not_in_html',
          page: `${market}/${slug}`,
          src: hero.src,
          detail: 'Hero filename not found in SSR HTML',
        });
      }

      // HTTP check unique assets on page (limit)
      for (const a of assets.slice(0, 20)) {
        const live = await headOrGet(`${BASE}${a}`);
        if (live.status !== 200) {
          issues.push({
            severity: 'P0',
            type: 'broken_live_asset',
            page: `${market}/${slug}`,
            src: a,
            detail: `HTTP ${live.status} ${live.error || ''}`,
          });
        } else if (live.type && !live.type.includes('image') && !live.type.includes('webp')) {
          issues.push({
            severity: 'P1',
            type: 'wrong_content_type',
            page: `${market}/${slug}`,
            src: a,
            detail: live.type,
          });
        }
      }

      // Overflow / layout heuristics from HTML classes (limited)
      const hasOverflowHiddenAbuse = false;

      pageResults.push({
        route,
        status,
        images: assets.length,
        expectedVisible: expected.length,
        ok: true,
        assetsSample: assets.slice(0, 5),
      });
    }
  }

  // Size similarity heuristic for "repetitive" — compare file sizes within a page (weak)
  // Better: hash perceptual? Skip for now; sample later.

  // Aggregate
  const bySev = { P0: [], P1: [], P2: [] };
  for (const i of issues) bySev[i.severity]?.push(i);

  const report = {
    auditedAt: new Date().toISOString(),
    base: BASE,
    pagesChecked: pagesOk,
    pagesExpected: 40,
    visibleRegistryPlacements: visiblePlacements.length,
    liveImageMentionsApprox: placementsSeenLive,
    p0: bySev.P0.length,
    p1: bySev.P1.length,
    p2: bySev.P2.length,
    issues,
    pageResults,
    exclusions: [...EXCL],
  };

  const out = path.join(ROOT, 'reports', 'four-market-live-visual-qa.json');
  fs.writeFileSync(out, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({
    pagesChecked: pagesOk,
    placements: visiblePlacements.length,
    p0: bySev.P0.length,
    p1: bySev.P1.length,
    p2: bySev.P2.length,
    out,
  }, null, 2));
  if (bySev.P0.length) {
    console.log('P0 samples:');
    bySev.P0.slice(0, 15).forEach((i) => console.log('-', i.type, i.page || '', i.src || '', i.detail || ''));
  }
  if (bySev.P1.length) {
    console.log('P1 samples:');
    bySev.P1.slice(0, 15).forEach((i) => console.log('-', i.type, i.page || '', i.src || '', i.detail || ''));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
