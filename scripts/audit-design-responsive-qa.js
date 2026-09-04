/**
 * Structural design/responsive QA for 40 market service pages (SSR HTML).
 * Complements CSS fixes — flags missing sections, broken images, overflow risks.
 */
const fs = require('fs');
const path = require('path');

const MARKETS = ['ca', 'au', 'us', 'uk'];
const SERVICES = [
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

const BASE = process.env.QA_BASE || 'http://localhost:3000';
const OUT = path.join('reports', 'four-market-design-responsive-qa.json');

async function fetchPage(url) {
  const res = await fetch(url, { redirect: 'follow' });
  const html = await res.text();
  return { status: res.status, html, url };
}

function analyze(html, url) {
  const issues = [];
  if (!html.includes('<h1')) issues.push({ severity: 'P0', id: 'missing-h1' });
  if (!/footer|site-footer|Footer/i.test(html)) issues.push({ severity: 'P1', id: 'missing-footer-signal' });

  const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  const brokenSrc = imgs.filter((s) => !s || s === '#' || s.includes('undefined'));
  if (brokenSrc.length) issues.push({ severity: 'P0', id: 'broken-img-src', count: brokenSrc.length });

  // Horizontal overflow risk signals in markup
  if (/w-\[1(2|4|5|6)0vw\]|min-w-\[\d{4,}px\]|translate-x-\[-?\d{3,}/.test(html)) {
    issues.push({ severity: 'P1', id: 'extreme-width-utility' });
  }

  const hasPackages = /id="packages"|id="pricing"|data-packages|package/i.test(html);
  const hasFaq = /faq|Frequently/i.test(html);
  const hasHow = /how-to-buy|how-it-works|How to buy|How it works/i.test(html);

  return {
    url,
    ok: issues.every((i) => i.severity !== 'P0'),
    imgCount: imgs.length,
    hasPackages,
    hasFaq,
    hasHow,
    issues,
  };
}

async function main() {
  const results = [];
  let failures = 0;

  for (const market of MARKETS) {
    for (const service of SERVICES) {
      const url = `${BASE}/${market}/${service}`;
      try {
        const { status, html } = await fetchPage(url);
        if (status >= 400) {
          results.push({ url, ok: false, status, issues: [{ severity: 'P0', id: 'http-error', status }] });
          failures++;
          continue;
        }
        const row = analyze(html, url);
        row.status = status;
        results.push(row);
        if (!row.ok) failures++;
        process.stdout.write('.');
      } catch (err) {
        results.push({
          url,
          ok: false,
          issues: [{ severity: 'P0', id: 'fetch-error', message: String(err.message || err) }],
        });
        failures++;
        process.stdout.write('x');
      }
    }
  }

  const summary = {
    checked: results.length,
    failures,
    p0: results.flatMap((r) => r.issues || []).filter((i) => i.severity === 'P0').length,
    p1: results.flatMap((r) => r.issues || []).filter((i) => i.severity === 'P1').length,
    pagesMissingPackages: results.filter((r) => r.hasPackages === false).map((r) => r.url),
    pagesMissingFaq: results.filter((r) => r.hasFaq === false).map((r) => r.url),
    generatedAt: new Date().toISOString(),
  };

  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ summary, results }, null, 2));
  console.log('\n' + JSON.stringify(summary, null, 2));
  console.log('Wrote', OUT);
  process.exit(failures ? 1 : 0);
}

main();
