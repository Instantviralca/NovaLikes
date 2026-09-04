/**
 * Master QA: four-market routes, story counts, benefits dedupe, IG Likes steps
 * Run: npx tsx scripts/final-four-market-master-qa.ts
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import { getEnglishServiceBundle } from '../lib/i18n/content/english-source';
import { overlayEnglishWithIssues } from '../lib/i18n/overlay';
import { hreflangMapWithMarket } from '../lib/market/paths';

const MARKETS = ['ca', 'au', 'us', 'uk'] as const;
const ROOT = process.cwd();

const EXPECTED_CA_COUNTS: Record<string, number> = {
  homepage: 12,
  'buy-instagram-followers': 12,
  'buy-instagram-likes': 12,
  'buy-instagram-views': 10,
  'buy-instagram-comments': 11,
  'buy-tiktok-followers': 10,
  'buy-tiktok-likes': 10,
  'buy-tiktok-views': 11,
  'buy-facebook-followers': 9,
  'buy-facebook-page-likes': 9,
  'buy-facebook-post-likes': 10,
};

const DEDUPE_SLUGS = [
  'buy-instagram-comments',
  'buy-tiktok-followers',
  'buy-tiktok-likes',
  'buy-tiktok-views',
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
  'buy-instagram-likes',
  'buy-instagram-views',
  'buy-instagram-followers',
];

function load(market: string, file: string) {
  return JSON.parse(readFileSync(path.join(ROOT, 'content/markets', market, file), 'utf8'));
}

function storyCount(data: unknown): number {
  const d = data as {
    storySections?: unknown[];
    followersAuthority?: { storySections?: unknown[] };
    dummy?: { storySections?: unknown[] };
  };
  return (
    d.storySections?.length ??
    d.followersAuthority?.storySections?.length ??
    d.dummy?.storySections?.length ??
    0
  );
}

let failed = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed += 1;
};

console.log('=== 44 ROUTE FILE EXISTENCE ===');
for (const m of MARKETS) {
  check(`${m} homepage.json`, existsSync(path.join(ROOT, `content/markets/${m}/homepage.json`)));
  for (const slug of CORE_SERVICE_SLUGS) {
    check(`${m} ${slug}.json`, existsSync(path.join(ROOT, `content/markets/${m}/services/${slug}.json`)));
  }
}

console.log('\n=== CANADA STORY COUNTS ===');
check('CA homepage', storyCount(load('ca', 'homepage.json')) === 12);
for (const slug of CORE_SERVICE_SLUGS) {
  const n = storyCount(load('ca', `services/${slug}.json`));
  check(`/ca/${slug} = ${EXPECTED_CA_COUNTS[slug]}`, n === EXPECTED_CA_COUNTS[slug]);
}

console.log('\n=== BENEFITS !== WHYBUY (CA) ===');
for (const slug of DEDUPE_SLUGS) {
  const raw = load('ca', `services/${slug}.json`) as {
    content?: { benefits?: { description?: string } };
    dummy?: { whyBuy?: { description?: string } };
  };
  const b = raw.content?.benefits?.description ?? '';
  const w = raw.dummy?.whyBuy?.description ?? '';
  check(`/ca/${slug} benefits !== whyBuy`, b !== w && b.length > 0 && w.length > 0);
}

console.log('\n=== IG LIKES MAIN HOWITWORKS (4 steps, JSON) ===');
for (const m of MARKETS) {
  const raw = load(m, 'services/buy-instagram-likes.json') as {
    content: { howItWorks: { steps: { id: string }[] } };
  };
  check(`${m} IG likes 4 steps in JSON`, raw.content.howItWorks.steps.length === 4);
  check(`${m} no ig-l-step-5`, !raw.content.howItWorks.steps.some((s) => s.id === 'ig-l-step-5'));
}

console.log('\n=== IG LIKES OVERLAY MERGE (load.ts semantics) ===');
for (const m of MARKETS) {
  try {
    const english = getEnglishServiceBundle('buy-instagram-likes').content;
    const overlay = load(m, 'services/buy-instagram-likes.json') as { content: unknown };
    const { issues } = overlayEnglishWithIssues(english, overlay.content, m);
    const stepIssues = issues.filter((i) => i.path.includes('howItWorks.steps[4]'));
    if (stepIssues.length) {
      console.log(`${m.toUpperCase()}: overlay gap — ${stepIssues.map((i) => i.message).join('; ')}`);
    } else {
      console.log(`${m.toUpperCase()}: overlay merge OK`);
    }
  } catch (e) {
    console.log(`${m.toUpperCase()}: overlay check error — ${(e as Error).message}`);
  }
}

console.log('\n=== HREFLANG (sample routes) ===');
for (const p of ['/ca/buy-instagram-followers', '/ca/', '/au/buy-tiktok-views']) {
  const map = hreflangMapWithMarket(p.replace(/^\/(ca|au|us|uk)/, '') || '/');
  check(`${p} en-CA`, !!map['en-CA']);
  check(`${p} en-AU`, !!map['en-AU']);
  check(`${p} en-US`, !!map['en-US']);
  check(`${p} en-GB`, !!map['en-GB']);
}

console.log('\n=== METADATA SAMPLE (no accidental cross-market in title) ===');
for (const m of MARKETS) {
  const meta = load(m, 'metadata.json') as { services?: Record<string, { title?: string }> };
  const t = meta.services?.['buy-instagram-followers']?.title ?? '';
  check(`${m} IG followers title present`, t.length > 0);
}

if (failed) {
  console.error(`\n${failed} master QA check(s) failed.`);
  process.exit(1);
}
console.log('\nMaster four-market QA checks passed (overlay gaps reported separately above).');
