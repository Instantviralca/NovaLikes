/**
 * Run Lighthouse mobile N times and print median score / TBT / LCP.
 * Usage:
 *   node scripts/lh-median.mjs --url=/buy-tiktok-followers --runs=5 --out=reports/sitewide-style/s2/lh-median/buy.json
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASE = process.env.STYLE_GUARD_BASE || 'http://127.0.0.1:3026';

const args = process.argv.slice(2);
const get = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const urlPath = get('url', '/buy-tiktok-followers');
const runs = Math.max(1, Number(get('runs', '5')) || 5);
const outRel = get('out', '');
const fullUrl = `${BASE}${urlPath}`;

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

const results = [];
for (let i = 1; i <= runs; i++) {
  const tmp = path.join(ROOT, 'reports', 'sitewide-style', '_lh_tmp', `run-${Date.now()}-${i}.json`);
  mkdirSync(path.dirname(tmp), { recursive: true });
  const r = spawnSync(
    'npx',
    [
      'lighthouse',
      fullUrl,
      '--only-categories=performance',
      '--form-factor=mobile',
      '--screenEmulation.mobile',
      '--output=json',
      `--output-path=${tmp}`,
      '--chrome-flags=--headless --no-sandbox',
      '--quiet',
    ],
    { cwd: ROOT, shell: true, encoding: 'utf8' },
  );
  if (r.status !== 0) {
    console.error(`run ${i} failed`, r.stderr?.slice(-400));
    process.exit(1);
  }
  const j = JSON.parse(readFileSync(tmp, 'utf8'));
  const score = j.categories.performance.score;
  const tbt = j.audits['total-blocking-time'].numericValue;
  const lcp = j.audits['largest-contentful-paint'].numericValue;
  const cls = j.audits['cumulative-layout-shift'].numericValue;
  results.push({ score, tbt, lcp, cls });
  console.log(`run ${i}/${runs}`, { score, tbt: Math.round(tbt), lcp: Math.round(lcp), cls });
}

const summary = {
  url: urlPath,
  base: BASE,
  runs: results,
  median: {
    score: median(results.map((r) => r.score)),
    tbt: median(results.map((r) => r.tbt)),
    lcp: median(results.map((r) => r.lcp)),
    cls: median(results.map((r) => r.cls)),
  },
};
console.log('MEDIAN', summary.median);
if (outRel) {
  const out = path.resolve(ROOT, outRel);
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(summary, null, 2));
  console.log('wrote', out);
}
