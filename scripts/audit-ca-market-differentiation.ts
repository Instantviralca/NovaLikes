/**
 * Read-only Canada market differentiation audit (CA vs US, AU, UK).
 * Reads current market JSON directly (avoids load.ts overlay assert on IG Likes steps).
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import type { Market } from '../lib/market/config';

const MARKETS: Market[] = ['ca', 'us', 'au', 'uk'];
const COMPARE: Market[] = ['us', 'au', 'uk'];

type StorySection = {
  id: string;
  title?: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: { title: string; body: string }[];
};

const ROOT = process.cwd();

function loadJson(market: Market, file: string): unknown {
  return JSON.parse(readFileSync(path.join(ROOT, 'content/markets', market, file), 'utf8'));
}

function loadService(market: Market, slug: string): unknown {
  return loadJson(market, `services/${slug}.json`);
}

function loadHomepage(market: Market): unknown {
  return loadJson(market, 'homepage.json');
}

const SKIP = new Set([
  'href', 'src', 'slug', 'platformId', 'icon', 'tone', 'width', 'height', 'order',
  'category', 'faqIds', 'purpose', 'suggestedWordCount', 'primaryKeyword',
  'supportingKeywords', 'packageIds', 'testimonialIds', 'serviceSlugs',
]);

function collectStrings(value: unknown, skip = SKIP): string[] {
  const out: string[] = [];
  if (typeof value === 'string') {
    const t = value.trim();
    if (t && !t.startsWith('/') && !t.startsWith('http') && !/\.webp$/i.test(t)) out.push(t);
    return out;
  }
  if (Array.isArray(value)) for (const v of value) out.push(...collectStrings(v, skip));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (skip.has(k)) continue;
      out.push(...collectStrings(v, skip));
    }
  }
  return out;
}

function tokenSet(text: string): Set<string> {
  return new Set(text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size && !b.size) return 0;
  const inter = [...a].filter((x) => b.has(x)).length;
  return inter / new Set([...a, ...b]).size;
}

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);
}

function sharedPhrases(a: string, b: string, minLen: number, maxOut = 100): string[] {
  const aw = words(a.slice(0, 25000));
  const bw = words(b.slice(0, 25000));
  const out: string[] = [];
  for (let len = minLen; len <= Math.min(14, aw.length, bw.length) && out.length < maxOut; len++) {
    const set = new Set<string>();
    for (let i = 0; i <= aw.length - len; i++) set.add(aw.slice(i, i + len).join(' '));
    for (let i = 0; i <= bw.length - len; i++) {
      const p = bw.slice(i, i + len).join(' ');
      if (set.has(p) && !out.includes(p)) out.push(p);
    }
  }
  return out;
}

function storyText(s: StorySection): string {
  const p: string[] = [];
  if (s.title) p.push(s.title);
  if (s.lead) p.push(s.lead);
  if (s.footer) p.push(s.footer);
  if (s.bullets) p.push(...s.bullets);
  if (s.paragraphs) p.push(...s.paragraphs);
  if (s.items) p.push(...s.items.flatMap((i) => [i.title, i.body]));
  return p.join('\n');
}

function getStorySections(data: unknown): StorySection[] {
  const d = data as {
    storySections?: StorySection[];
    dummy?: { storySections?: StorySection[] };
    followersAuthority?: { storySections?: StorySection[] };
  };
  return d.storySections ?? d.followersAuthority?.storySections ?? d.dummy?.storySections ?? [];
}

function getLongFormParts(data: unknown): string[] {
  const d = data as {
    content?: { benefits?: { description?: string; title?: string } };
    dummy?: {
      whyBuy?: { title?: string; description?: string; bottomNote?: string; items?: unknown[] };
      storySections?: StorySection[];
      config?: unknown;
    };
    followersAuthority?: Record<string, unknown> & { storySections?: StorySection[] };
    storySections?: StorySection[];
    services?: unknown[];
    crossPlatform?: { title?: string; description?: string };
    platformSelector?: { title?: string; description?: string };
  };
  const parts: string[] = [];
  for (const s of getStorySections(data)) parts.push(storyText(s));
  if (d.content?.benefits) {
    parts.push(d.content.benefits.title ?? '', d.content.benefits.description ?? '');
  }
  if (d.dummy?.whyBuy) {
    const w = d.dummy.whyBuy;
    parts.push(w.title ?? '', w.description ?? '', w.bottomNote ?? '');
  }
  if (d.followersAuthority) {
    // explanatory blocks, skip purely transactional keys
    const skip = new Set(['howToBuy', 'relatedPackages']);
    for (const [k, v] of Object.entries(d.followersAuthority)) {
      if (skip.has(k) || k === 'storySections') continue;
      parts.push(collectStrings(v).join('\n'));
    }
  }
  if (d.services) parts.push(collectStrings(d.services).join('\n'));
  if (d.crossPlatform) parts.push(d.crossPlatform.title ?? '', d.crossPlatform.description ?? '');
  if (d.platformSelector) parts.push(d.platformSelector.title ?? '', d.platformSelector.description ?? '');
  return parts.filter(Boolean);
}

const FACTUAL =
  /organic.?reach|fyp|monetis|platform.?rules|reach.?not|metric|watch.?behaviour|video.?performance|password|checkout|order.?track|can.?you.?buy|before.?you.?buy|common.?mistakes|buying.?points|does.?buying|what.?real|worldwide|service.?compare/i;

function isFactual(id: string, title = ''): boolean {
  return FACTUAL.test(`${id} ${title}`);
}

function findPairId(id: string, otherIds: string[]): string | null {
  if (otherIds.includes(id)) return id;
  const map: Record<string, string> = {
    'built-for-canada': 'built-for-us',
    'built-for-australia': 'built-for-australia',
    'built-for-us': 'built-for-us',
    'built-for-uk': 'built-for-uk',
    'ca-campaign-moments': 'us-campaign-moments',
    'campaign-moments': 'us-campaign-moments',
    'us-campaign-moments': 'us-campaign-moments',
    'uk-campaign-moments': 'uk-campaign-moments',
    'watch-behaviour': 'video-performance',
    'stronger-presence': 'better-profile',
    'clear-goal': 'useful-next-step',
    'campaign-presentation': 'brand-campaigns',
    'better-content-experience': 'strong-first-glance',
    'support-content': 'content-worth-engaging',
    'real-business-content': 'real-experience',
    'build-reels-deserve': 'reels-worth-watching',
    'better-profile-experience': 'profile-experience',
  };
  if (map[id] && otherIds.includes(map[id])) return map[id];
  const base = id.replace(/-(canada|us|uk|australia)$/i, '');
  return otherIds.find((o) => o.replace(/-(canada|us|uk|australia)$/i, '') === base) ?? null;
}

function isCountrySwap(textA: string, textB: string): boolean {
  const normalize = (t: string) =>
    t
      .replace(/\bcanadian\b/gi, 'MARKET')
      .replace(/\bcanada\b/gi, 'MARKET')
      .replace(/\bamerican\b/gi, 'MARKET')
      .replace(/\bunited states\b/gi, 'MARKET')
      .replace(/\baustralian\b/gi, 'MARKET')
      .replace(/\baustralia\b/gi, 'MARKET')
      .replace(/\bunited kingdom\b/gi, 'MARKET')
      .replace(/\buk\b/gi, 'MARKET');
  return jaccard(tokenSet(normalize(textA)), tokenSet(normalize(textB))) >= 0.88;
}

type Overlap = {
  route: string;
  section: string;
  market: string;
  sim: number;
  why: string;
  verdict: string;
};

type PageRow = {
  route: string;
  closest: string;
  caUsOverall: number;
  caAuOverall: number;
  caUkOverall: number;
  caUsLong: number;
  caAuLong: number;
  caUkLong: number;
  caStories: number;
  verdict: string;
};

const rows: PageRow[] = [];
const overlaps: Overlap[] = [];
const phrase8 = { us: 0, au: 0, uk: 0 };
const phrase20Substantive: { route: string; market: string; phrase: string }[] = [];
const phrase20Factual: { route: string; market: string; phrase: string }[] = [];
const phrase8Samples: { route: string; market: string; phrase: string }[] = [];

function pageVerdict(
  longSims: Record<string, number>,
  substantiveHigh: number,
  caStories: number,
  usStories: number,
  countrySwapHeavy: boolean,
): 'STOP' | 'MINOR' | 'REVIEW' | 'REWRITE NEEDED' {
  const maxLong = Math.max(...Object.values(longSims));
  if (caStories === 0 && usStories >= 4) return 'REWRITE NEEDED';
  if (countrySwapHeavy && maxLong >= 0.55) return 'REVIEW';
  if (substantiveHigh >= 3) return 'REWRITE NEEDED';
  if (substantiveHigh >= 2 || maxLong >= 0.65) return 'REVIEW';
  if (substantiveHigh >= 1 || maxLong >= 0.58) return 'MINOR';
  return 'STOP';
}

function analyze(route: string, caData: unknown, others: Record<Market, unknown>) {
  const caAll = collectStrings(caData).join('\n');
  const caLong = getLongFormParts(caData).join('\n');
  const caStory = getStorySections(caData);

  const overall: Record<string, number> = {};
  const longForm: Record<string, number> = {};
  let substantiveHigh = 0;
  let countrySwapHeavy = false;

  for (const m of COMPARE) {
    const od = others[m];
    const oAll = collectStrings(od).join('\n');
    const oLong = getLongFormParts(od).join('\n');
    const oStory = getStorySections(od);
    overall[m] = jaccard(tokenSet(caAll), tokenSet(oAll));
    longForm[m] = jaccard(tokenSet(caLong), tokenSet(oLong));

    if (isCountrySwap(caLong, oLong)) countrySwapHeavy = true;

    const p8 = sharedPhrases(caLong, oLong, 8);
    const p20 = sharedPhrases(caLong, oLong, 20);
    phrase8[m as 'us' | 'au' | 'uk'] += p8.length;
    for (const p of p20) {
      const factual = /password|checkout|order track|public url|package|pricing|organic reach|for you page|metric|no password required|order tracking|secure checkout/i.test(p);
      (factual ? phrase20Factual : phrase20Substantive).push({ route, market: m.toUpperCase(), phrase: p });
    }
    for (const p of p8.filter((x) => x.split(' ').length >= 10).slice(0, 3)) {
      if (!/^(instagram|likes|views|comments|followers|profile|content|business|customer|password|checkout|order|package|pricing|public|url|reels|post|video|account|facebook|tiktok|page|creator|brand|engagement|analytics|novalikes|choose|select|track|complete|review|paste|compare|available|quantities)\b/.test(p)) {
        phrase8Samples.push({ route, market: m.toUpperCase(), phrase: p });
      }
    }

    const otherIds = oStory.map((s) => s.id);
    for (const ca of caStory) {
      const pid = findPairId(ca.id, otherIds);
      if (!pid) continue;
      const other = oStory.find((s) => s.id === pid)!;
      const sim = jaccard(tokenSet(storyText(ca)), tokenSet(storyText(other)));
      const factual = isFactual(ca.id, ca.title ?? '');
      const substantive = !factual && sim >= 0.52;
      const verdict = factual ? 'STOP' : sim >= 0.62 ? 'REWRITE' : sim >= 0.55 ? 'REVIEW' : 'STOP';
      if (substantive) {
        if (sim >= 0.58) substantiveHigh++;
        overlaps.push({
          route,
          section: `${ca.id}↔${pid}`,
          market: m.toUpperCase(),
          sim,
          why: factual ? 'Factual overlap' : isCountrySwap(storyText(ca), storyText(other)) ? 'Near-identical with country-name substitution' : 'Shared strategic framework / guidance structure',
          verdict,
        });
      }
    }

    // Missing storySections gap
    if (caStory.length === 0 && oStory.length >= 3) {
      overlaps.push({
        route,
        section: '(missing CA storySections)',
        market: m.toUpperCase(),
        sim: longForm[m],
        why: `CA has 0 storySections; ${m.toUpperCase()} has ${oStory.length}. Long-form relies on whyBuy/benefits/config blocks only.`,
        verdict: 'REWRITE',
      });
      if (longForm[m] >= 0.5) substantiveHigh++;
    }

    // whyBuy / benefits country-swap check
    const caD = caData as { content?: { benefits?: { description?: string } }; dummy?: { whyBuy?: { description?: string } } };
    const oD = od as { content?: { benefits?: { description?: string } }; dummy?: { whyBuy?: { description?: string } } };
    for (const [label, caT, oT] of [
      ['benefits', caD.content?.benefits?.description ?? '', oD.content?.benefits?.description ?? ''],
      ['whyBuy', caD.dummy?.whyBuy?.description ?? '', oD.dummy?.whyBuy?.description ?? ''],
    ] as const) {
      if (caT && oT && isCountrySwap(caT, oT)) {
        overlaps.push({
          route,
          section: label,
          market: m.toUpperCase(),
          sim: jaccard(tokenSet(caT), tokenSet(oT)),
          why: 'Country-name substitution inside otherwise near-identical paragraph',
          verdict: 'REVIEW',
        });
        substantiveHigh++;
      }
    }
  }

  const closest = (Object.entries(longForm).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'us').toUpperCase();
  const usStories = getStorySections(others.us).length;

  rows.push({
    route,
    closest,
    caUsOverall: overall.us ?? 0,
    caAuOverall: overall.au ?? 0,
    caUkOverall: overall.uk ?? 0,
    caUsLong: longForm.us ?? 0,
    caAuLong: longForm.au ?? 0,
    caUkLong: longForm.uk ?? 0,
    caStories: caStory.length,
    verdict: pageVerdict(longForm, substantiveHigh, caStory.length, usStories, countrySwapHeavy),
  });
}

// Homepage
analyze('/ca/', loadHomepage('ca'), {
  us: loadHomepage('us'),
  au: loadHomepage('au'),
  uk: loadHomepage('uk'),
});

for (const slug of CORE_SERVICE_SLUGS) {
  analyze(`/ca/${slug}`, loadService('ca', slug), {
    us: loadService('us', slug),
    au: loadService('au', slug),
    uk: loadService('uk', slug),
  });
}

// Same-page duplication
console.log('=== SAME-PAGE DUPLICATION ===');
const whyBuyFixed = [
  'buy-instagram-comments', 'buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views',
  'buy-facebook-followers', 'buy-facebook-page-likes', 'buy-facebook-post-likes',
];
let dupOk = true;
for (const slug of whyBuyFixed) {
  const raw = loadService('ca', slug) as {
    content?: { benefits?: { description?: string } };
    dummy?: { whyBuy?: { description?: string } };
  };
  const b = raw.content?.benefits?.description?.trim() ?? '';
  const w = raw.dummy?.whyBuy?.description?.trim() ?? '';
  if (b && w && b === w) {
    dupOk = false;
    console.log(`FAIL /ca/${slug}: benefits === whyBuy description`);
  }
}
// IG likes note
{
  const raw = loadService('ca', 'buy-instagram-likes') as {
    content?: { benefits?: { description?: string } };
    dummy?: { whyBuy?: { description?: string } };
  };
  const b = raw.content?.benefits?.description?.trim() ?? '';
  const w = raw.dummy?.whyBuy?.description?.trim() ?? '';
  if (b && w && b === w) console.log('NOTE /ca/buy-instagram-likes: benefits === whyBuy (same-page duplicate, separate from whyBuy batch fix list)');
}
console.log(dupOk ? 'PASS' : 'FAIL');

console.log('\n=== FINAL PAGE TABLE ===');
console.log('| Canada Page | Closest | CA/US Long | CA/AU Long | CA/UK Long | CA story§ | Verdict |');
for (const r of rows) {
  console.log(`| ${r.route} | ${r.closest} | ${(r.caUsLong * 100).toFixed(1)}% | ${(r.caAuLong * 100).toFixed(1)}% | ${(r.caUkLong * 100).toFixed(1)}% | ${r.caStories} | ${r.verdict} |`);
}

console.log('\n=== OVERALL SIMILARITY ===');
console.log('| Canada Page | CA/US | CA/AU | CA/UK |');
for (const r of rows) {
  console.log(`| ${r.route} | ${(r.caUsOverall * 100).toFixed(1)}% | ${(r.caAuOverall * 100).toFixed(1)}% | ${(r.caUkOverall * 100).toFixed(1)}% |`);
}

console.log('\n=== TOP 20 SUBSTANTIVE OVERLAPS ===');
const top20 = overlaps
  .filter((o) => o.verdict === 'REWRITE' || o.verdict === 'REVIEW')
  .sort((a, b) => b.sim - a.sim)
  .slice(0, 20);
for (const o of top20) console.log(JSON.stringify({ ...o, simPct: +(o.sim * 100).toFixed(1) }));

console.log('\n=== BY PAGE (REVIEW+) ===');
for (const r of rows.filter((x) => x.verdict !== 'STOP' && x.verdict !== 'MINOR')) {
  console.log(`\n${r.route} (${r.verdict}):`);
  for (const o of overlaps.filter((x) => x.route === r.route && x.verdict !== 'STOP').sort((a, b) => b.sim - a.sim).slice(0, 8)) {
    console.log(`  ${o.section} vs ${o.market} ${(o.sim * 100).toFixed(1)}% — ${o.why}`);
  }
}

console.log('\n=== PHRASE ANALYSIS ===');
console.log(`8+ word totals: US=${phrase8.us} AU=${phrase8.au} UK=${phrase8.uk}`);
console.log(`20+ substantive: ${phrase20Substantive.length}; factual: ${phrase20Factual.length}`);
console.log('\n20+ SUBSTANTIVE:');
for (const p of phrase20Substantive.slice(0, 25)) console.log(`${p.route} vs ${p.market}: "${p.phrase}"`);
if (!phrase20Substantive.length) console.log('None');
console.log('\n8+ MEANINGFUL SAMPLES:');
for (const p of phrase8Samples.slice(0, 12)) console.log(`${p.route} vs ${p.market}: "${p.phrase}"`);

console.log('\n=== PRIORITY ORDER ===');
const work = rows.filter((r) => r.verdict === 'REWRITE NEEDED' || r.verdict === 'REVIEW')
  .sort((a, b) => Math.max(b.caUsLong, b.caAuLong, b.caUkLong) - Math.max(a.caUsLong, a.caAuLong, a.caUkLong));
let n = 1;
for (const r of work) {
  const secs = overlaps.filter((o) => o.route === r.route && (o.verdict === 'REWRITE' || o.verdict === 'REVIEW'))
    .sort((a, b) => b.sim - a.sim).slice(0, 10).map((o) => o.section);
  console.log(`CA-${n} — ${r.route}`);
  console.log(`  Sections: ${[...new Set(secs)].join('; ') || 'TBD'}`);
  n++;
}

console.log('\n=== HOMEPAGE ===');
const caHp = loadHomepage('ca') as { storySections?: unknown[]; instagramOnly?: boolean; services?: unknown[]; crossPlatform?: { title?: string } };
console.log(`storySections in CA JSON: ${caHp.storySections?.length ?? 0}`);
console.log(`instagramOnly: ${caHp.instagramOnly}`);
console.log(`service cards: ${caHp.services?.length ?? 0}`);
console.log(`crossPlatform: ${caHp.crossPlatform?.title ?? 'n/a'}`);

console.log('\n=== DECISION ===');
console.log(`REWRITE NEEDED: ${rows.filter((r) => r.verdict === 'REWRITE NEEDED').length}`);
console.log(`REVIEW: ${rows.filter((r) => r.verdict === 'REVIEW').length}`);
console.log(`STOP/MINOR: ${rows.filter((r) => r.verdict === 'STOP' || r.verdict === 'MINOR').length}`);
console.log(`CA pages missing storySections (0 count): ${rows.filter((r) => r.caStories === 0).map((r) => r.route).join(', ')}`);
