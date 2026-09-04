/**
 * Structural QA for four market homepages (SSR HTML).
 */
const fs = require('fs');
const path = require('path');

const MARKETS = ['ca', 'au', 'us', 'uk'];
const BASE = process.env.QA_BASE || 'http://localhost:3001';
const OUT = path.join('reports', 'four-market-homepage-design-responsive-qa.json');

const REQUIRED_IDS = [
  'homepage-hero',
  'platform-selector',
  'services-overview',
  'why-novalikes',
  'how-it-works',
  'guarantees',
  'before-you-buy',
  'homepage-faq',
  'home-final-cta',
];

async function fetchPage(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, html: await res.text(), finalUrl: res.url };
}

function analyze(html, market, expectedStories) {
  const issues = [];
  if (!html.includes('id="homepage-hero-heading"') && !html.includes('homepage-hero-heading')) {
    issues.push({ severity: 'P0', id: 'missing-h1' });
  }
  for (const id of REQUIRED_IDS) {
    if (!html.includes(`id="${id}"`)) {
      issues.push({ severity: 'P0', id: `missing-section:${id}` });
    }
  }
  const storyHits = (expectedStories || []).filter((id) => html.includes(`id="${id}"`));
  const missingStories = (expectedStories || []).filter((id) => !html.includes(`id="${id}"`));
  if (missingStories.length) {
    issues.push({ severity: 'P0', id: 'missing-story-sections', missing: missingStories });
  }

  const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  const broken = imgs.filter((s) => !s || s.includes('undefined'));
  if (broken.length) issues.push({ severity: 'P0', id: 'broken-img', count: broken.length });

  if (/w-\[1(2|4|5|6)0vw\]|min-w-\[\d{4,}px\]/.test(html)) {
    issues.push({ severity: 'P1', id: 'extreme-width-utility' });
  }

  return {
    market,
    ok: issues.every((i) => i.severity !== 'P0'),
    imgCount: imgs.length,
    storyPresent: storyHits.length,
    storyExpected: (expectedStories || []).length,
    missingStories,
    issues,
  };
}

async function main() {
  const results = [];
  for (const market of MARKETS) {
    const hub = JSON.parse(
      fs.readFileSync(path.join('content', 'markets', market, 'homepage.json'), 'utf8'),
    );
    const storyIds = (hub.storySections || []).map((s) => s.id);
    const url = `${BASE}/${market}`;
    try {
      const { status, html, finalUrl } = await fetchPage(url);
      if (status >= 400) {
        results.push({
          market,
          url,
          finalUrl,
          ok: false,
          status,
          issues: [{ severity: 'P0', id: 'http-error', status }],
        });
        process.stdout.write('x');
        continue;
      }
      const row = analyze(html, market, storyIds);
      row.status = status;
      row.url = url;
      row.finalUrl = finalUrl;
      results.push(row);
      process.stdout.write(row.ok ? '.' : '!');
    } catch (err) {
      results.push({
        market,
        url,
        ok: false,
        issues: [{ severity: 'P0', id: 'fetch-error', message: String(err.message || err) }],
      });
      process.stdout.write('x');
    }
  }

  const summary = {
    checked: results.length,
    failures: results.filter((r) => !r.ok).length,
    p0: results.flatMap((r) => r.issues || []).filter((i) => i.severity === 'P0').length,
    p1: results.flatMap((r) => r.issues || []).filter((i) => i.severity === 'P1').length,
    storyCounts: Object.fromEntries(results.map((r) => [r.market, `${r.storyPresent}/${r.storyExpected}`])),
    generatedAt: new Date().toISOString(),
  };

  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ summary, results }, null, 2));
  console.log('\n' + JSON.stringify(summary, null, 2));
  console.log('Wrote', OUT);
  process.exit(summary.failures ? 1 : 0);
}

main();
