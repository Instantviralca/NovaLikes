/**
 * Read-only Australia market differentiation audit (AU vs US, AU vs UK).
 * Uses effective merged content via lib/market/content/load.ts.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';
import {
  loadMarketHomepageHub,
  loadMarketServiceBundle,
  readMarketOverlay,
} from '../lib/market/content/load';
import type { Market } from '../lib/market/config';

const MARKETS: Market[] = ['au', 'us', 'uk'];

const SERVICES = CORE_SERVICE_SLUGS.map((slug) => ({
  label: slug.replace('buy-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  slug,
  route: (m: Market) => `/${m}/${slug.replace('buy-', 'buy-')}`,
}));

type StorySection = {
  id: string;
  title?: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: { title: string; body: string }[];
};

function collectStrings(value: unknown, skip = new Set(['href', 'src', 'slug', 'platformId', 'icon', 'tone', 'width', 'height', 'order', 'category', 'id', 'faqIds', 'purpose', 'suggestedWordCount', 'primaryKeyword', 'supportingKeywords'])): string[] {
  const out: string[] = [];
  if (typeof value === 'string') {
    const t = value.trim();
    if (t && !t.startsWith('/') && !t.startsWith('http') && !/\.webp$/i.test(t)) out.push(t);
    return out;
  }
  if (Array.isArray(value)) {
    for (const v of value) out.push(...collectStrings(v, skip));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (skip.has(k)) continue;
      out.push(...collectStrings(v, skip));
    }
  }
  return out;
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size && !b.size) return 0;
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union ? inter / union : 0;
}

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);
}

function sharedPhrases(a: string, b: string, minLen: number, max = 8): string[] {
  const aw = words(a.slice(0, 15000));
  const bw = words(b.slice(0, 15000));
  const out: string[] = [];
  const maxLen = Math.min(14, aw.length, bw.length);
  for (let len = minLen; len <= maxLen && out.length < max; len++) {
    const set = new Set<string>();
    for (let i = 0; i <= aw.length - len; i++) set.add(aw.slice(i, i + len).join(' '));
    for (let i = 0; i <= bw.length - len; i++) {
      const p = bw.slice(i, i + len).join(' ');
      if (set.has(p)) out.push(p);
    }
  }
  return [...new Set(out)];
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

const FACTUAL = /organic.?reach|fyp|for you|monetis|platform.?rules|followers.*likes|page.?likes.*post|reach.?not|metric|hq.?premium|unique.?viewers|watch.?behaviour|video.?performance|likes.?vs|views.?not|comments.?and|delivery|order.?track|password|checkout|refund|explore/i;

function isFactual(id: string, title = ''): boolean {
  return FACTUAL.test(`${id} ${title}`);
}

function findUsPair(ukOrUsId: string, otherIds: string[]): string | null {
  if (otherIds.includes(ukOrUsId)) return ukOrUsId;
  if (ukOrUsId === 'built-for-uk' && otherIds.includes('built-for-us')) return 'built-for-us';
  if (ukOrUsId === 'built-for-us' && otherIds.includes('built-for-uk')) return 'built-for-uk';
  if (ukOrUsId === 'watch-behaviour' && otherIds.includes('video-performance')) return 'video-performance';
  if (ukOrUsId === 'video-performance' && otherIds.includes('watch-behaviour')) return 'watch-behaviour';
  return null;
}

function getStorySectionsFromHomepage(hub: ReturnType<typeof loadMarketHomepageHub>): StorySection[] {
  return (hub.storySections ?? []) as StorySection[];
}

function getStorySectionsFromService(bundle: ReturnType<typeof loadMarketServiceBundle>): StorySection[] {
  const b = bundle as {
    dummy?: { storySections?: StorySection[] };
    followersAuthority?: { storySections?: StorySection[] };
  };
  if (b.followersAuthority?.storySections) return b.followersAuthority.storySections;
  if (b.dummy?.storySections) return b.dummy.storySections;
  return [];
}

function extractLongForm(data: unknown, story: StorySection[]): string {
  const parts = [...story.map(storyText)];
  parts.push(collectStrings(data).join('\n'));
  return parts.join('\n');
}

function extractTransactional(data: unknown): string {
  return collectStrings(data).join('\n');
}

function loadServiceFaqText(market: Market): string {
  try {
    const items = readMarketOverlay(market, 'service-faqs.json') as { question: string; answer: string }[];
    return items.map((i) => `${i.question}\n${i.answer}`).join('\n');
  } catch {
    return '';
  }
}

function getEffectiveServiceBundle(market: Market, slug: (typeof CORE_SERVICE_SLUGS)[number]) {
  const bundle = loadMarketServiceBundle(market, slug);
  const faqText = loadServiceFaqText(market);
  return { bundle, faqText };
}

function getEffectiveHomepage(market: Market) {
  return loadMarketHomepageHub(market);
}

function hasAuMarkers(text: string): { au: boolean; weak: boolean } {
  const auTerms = /\b(australia|australian|sydney|melbourne|brisbane|perth|adelaide|eofy|australian summer)\b/i.test(text);
  const usTerms = /\b(united states|\bUSA\b|thanksgiving|back-to-school|cyber monday only us pattern)\b/i.test(text);
  const ukTerms = /\b(united kingdom|\bUK\b|boxing day|january sales|estate agent)\b/i.test(text);
  const weak = auTerms && !usTerms && !ukTerms && (
    (text.match(/\b(Sydney|Melbourne|Brisbane|Perth|Adelaide)\b/gi)?.length ?? 0) >= 2 &&
    text.length < 500
  );
  return { au: auTerms, weak: !!weak };
}

function verdict(auUsLong: number, auUkLong: number, substantiveCount: number): string {
  if (substantiveCount >= 3) return 'REWRITE NEEDED';
  if (substantiveCount >= 1) return 'REVIEW';
  if (auUsLong >= 70 || auUkLong >= 70) return 'REVIEW';
  if (auUsLong >= 58 || auUkLong >= 58) return 'MINOR';
  return 'STOP';
}

type Row = {
  label: string;
  auUsOverall: number;
  auUkOverall: number;
  auUsLong: number;
  auUkLong: number;
  concern: string;
  verdict: string;
  auDiff: 'YES' | 'PARTIAL' | 'NO';
};

type RewriteRow = {
  priority: number;
  route: string;
  closest: string;
  section: string;
  sim: number;
  why: string;
};

type AcceptRow = {
  route: string;
  market: string;
  section: string;
  sim: number;
  why: string;
};

const rows: Row[] = [];
const rewrites: RewriteRow[] = [];
const acceptable: AcceptRow[] = [];
let rewritePriority = 1;

function compareStorySections(
  label: string,
  route: string,
  auStory: StorySection[],
  otherStory: StorySection[],
  otherMarket: 'us' | 'uk',
) {
  const otherIds = otherStory.map((s) => s.id);
  for (const au of auStory) {
    const pairId = findUsPair(au.id, otherIds);
    if (!pairId) continue;
    const other = otherStory.find((s) => s.id === pairId)!;
    const sim = jaccard(tokenSet(storyText(au)), tokenSet(storyText(other)));
    const factual = isFactual(au.id, au.title ?? '');
    if (sim >= 0.5) {
      if (factual) {
        acceptable.push({
          route,
          market: otherMarket.toUpperCase(),
          section: au.id,
          sim,
          why: 'Factual metric/expectation-setting or service-definition content',
        });
      } else if (sim >= 0.62) {
        const phrases = sharedPhrases(storyText(au), storyText(other), 10, 2);
        rewrites.push({
          priority: rewritePriority++,
          route,
          closest: otherMarket.toUpperCase(),
          section: au.id,
          sim,
          why: phrases[0]
            ? `Substantive structural overlap; e.g. "${phrases[0].slice(0, 70)}..."`
            : 'High substantive token overlap in explanatory section',
        });
      } else if (sim >= 0.55) {
        acceptable.push({
          route,
          market: otherMarket.toUpperCase(),
          section: au.id,
          sim,
          why: 'Moderate overlap but market-specific examples/campaign framing present',
        });
      }
    }
  }
}

// Homepage
{
  const au = getEffectiveHomepage('au');
  const us = getEffectiveHomepage('us');
  const uk = getEffectiveHomepage('uk');
  const auStory = getStorySectionsFromHomepage(au);
  const usStory = getStorySectionsFromHomepage(us);
  const ukStory = getStorySectionsFromHomepage(uk);
  const auAll = collectStrings(au).join('\n');
  const usAll = collectStrings(us).join('\n');
  const ukAll = collectStrings(uk).join('\n');
  const auLong = extractLongForm(au, auStory);
  const auUsLong = jaccard(tokenSet(auLong), tokenSet(extractLongForm(us, usStory)));
  const auUkLong = jaccard(tokenSet(auLong), tokenSet(extractLongForm(uk, ukStory)));
  const markers = hasAuMarkers(auAll);
  const tiktokCard = auAll.includes('Strengthen the Audience Number Around Your TikTok Profile');
  const fbCard = auAll.includes('Grow the Visible Audience Around Your Facebook Page');
  compareStorySections('Homepage', '/au/', auStory, usStory, 'us');
  compareStorySections('Homepage', '/au/', auStory, ukStory, 'uk');
  const substantive = rewrites.filter((r) => r.route === '/au/').length;
  rows.push({
    label: 'Homepage',
    auUsOverall: jaccard(tokenSet(auAll), tokenSet(usAll)),
    auUkOverall: jaccard(tokenSet(auAll), tokenSet(ukAll)),
    auUsLong,
    auUkLong,
    concern: substantive
      ? 'Some story sections still structurally close to US/UK'
      : `AU campaign moments (EOFY/summer); TikTok/FB cards differentiated=${tiktokCard && fbCard}`,
    verdict: verdict(jaccard(tokenSet(auAll), tokenSet(usAll)), auUkLong, substantive),
    auDiff: markers.au && !markers.weak ? 'YES' : markers.au ? 'PARTIAL' : 'NO',
  });
}

// Services
const slugLabels: Record<string, string> = {
  'buy-instagram-followers': 'Instagram Followers',
  'buy-instagram-likes': 'Instagram Likes',
  'buy-instagram-views': 'Instagram Views',
  'buy-instagram-comments': 'Instagram Comments',
  'buy-tiktok-followers': 'TikTok Followers',
  'buy-tiktok-likes': 'TikTok Likes',
  'buy-tiktok-views': 'TikTok Views',
  'buy-facebook-followers': 'Facebook Followers',
  'buy-facebook-page-likes': 'Facebook Page Likes',
  'buy-facebook-post-likes': 'Facebook Post Likes',
};

for (const slug of CORE_SERVICE_SLUGS) {
  const label = slugLabels[slug] ?? slug;
  const route = `/au/${slug}`;
  const beforeRewrites = rewrites.length;

  const auB = getEffectiveServiceBundle('au', slug);
  const usB = getEffectiveServiceBundle('us', slug);
  const ukB = getEffectiveServiceBundle('uk', slug);

  const auStory = getStorySectionsFromService(auB.bundle);
  const usStory = getStorySectionsFromService(usB.bundle);
  const ukStory = getStorySectionsFromService(ukB.bundle);

  const auPayload = { ...auB.bundle, faqOverlay: auB.faqText };
  const usPayload = { ...usB.bundle, faqOverlay: usB.faqText };
  const ukPayload = { ...ukB.bundle, faqOverlay: ukB.faqText };

  const auAll = collectStrings(auPayload).join('\n');
  const usAll = collectStrings(usPayload).join('\n');
  const ukAll = collectStrings(ukPayload).join('\n');

  const auLong = extractLongForm(auPayload, auStory);
  const auUsLong = jaccard(tokenSet(auLong), tokenSet(extractLongForm(usPayload, usStory)));
  const auUkLong = jaccard(tokenSet(auLong), tokenSet(extractLongForm(ukPayload, ukStory)));

  compareStorySections(label, route, auStory, usStory, 'us');
  compareStorySections(label, route, auStory, ukStory, 'uk');

  const newRewrites = rewrites.slice(beforeRewrites);
  const substantive = newRewrites.filter((r) => r.sim >= 0.62).length;
  const highUs = newRewrites.filter((r) => r.closest === 'US' && r.sim >= 0.62);
  const highUk = newRewrites.filter((r) => r.closest === 'UK' && r.sim >= 0.62);

  const markers = hasAuMarkers(auAll);
  let auDiff: 'YES' | 'PARTIAL' | 'NO' = 'NO';
  if (markers.au) {
    auDiff = substantive >= 2 || auUsLong >= 0.65 ? 'PARTIAL' : 'YES';
  } else if (auUsLong < 0.55 && auUkLong < 0.55) {
    auDiff = 'PARTIAL';
  }

  let concern = '';
  if (highUs.length) concern += `AU≈US: ${highUs.map((r) => r.section).join(', ')}. `;
  if (highUk.length) concern += `AU≈UK: ${highUk.map((r) => r.section).join(', ')}. `;
  if (!concern) {
    const p20us = sharedPhrases(auLong, extractLongForm(usPayload, usStory), 20, 2);
    concern = p20us.length ? `Shared long phrases (likely transactional/factual)` : 'Low substantive story overlap';
  }

  rows.push({
    label,
    auUsOverall: jaccard(tokenSet(auAll), tokenSet(usAll)),
    auUkOverall: jaccard(tokenSet(auAll), tokenSet(ukAll)),
    auUsLong,
    auUkLong,
    concern: concern.trim(),
    verdict: verdict(jaccard(tokenSet(auAll), tokenSet(usAll)), auUkLong, substantive),
    auDiff,
  });

  console.log(`--- ${label} ---`);
  console.log(`AU/US overall ${(jaccard(tokenSet(auAll), tokenSet(usAll)) * 100).toFixed(1)}% long ${(auUsLong * 100).toFixed(1)}%`);
  console.log(`AU/UK overall ${(jaccard(tokenSet(auAll), tokenSet(ukAll)) * 100).toFixed(1)}% long ${(auUkLong * 100).toFixed(1)}%`);
  console.log(`Story counts AU=${auStory.length} US=${usStory.length} UK=${ukStory.length}`);
  for (const au of auStory) {
    for (const [m, other] of [['US', usStory], ['UK', ukStory]] as const) {
      const pid = findUsPair(au.id, other.map((s) => s.id));
      if (!pid) continue;
      const o = other.find((s) => s.id === pid)!;
      const sim = jaccard(tokenSet(storyText(au)), tokenSet(storyText(o)));
      console.log(`  ${au.id} vs ${m} ${pid}: ${(sim * 100).toFixed(1)}%${isFactual(au.id, au.title) ? ' (factual)' : ''}`);
    }
  }
  console.log(`AU diff: ${auDiff}\n`);
}

// Output tables
console.log('\n=== MAIN TABLE ===');
console.log('| Australian Page | AU vs US Overall | AU vs UK Overall | AU vs US Long-form | AU vs UK Long-form | Main Concern | Verdict |');
console.log('| --- | ---: | ---: | ---: | ---: | --- | --- |');
for (const r of rows) {
  console.log(
    `| ${r.label} | ${(r.auUsOverall * 100).toFixed(1)}% | ${(r.auUkOverall * 100).toFixed(1)}% | ${(r.auUsLong * 100).toFixed(1)}% | ${(r.auUkLong * 100).toFixed(1)}% | ${r.concern.slice(0, 80)} | ${r.verdict} |`,
  );
}

console.log('\n=== AU DIFFERENTIATION STATUS ===');
for (const r of rows) {
  console.log(`${r.label}: ${r.auDiff}`);
}

const realRewrites = rewrites.filter((r) => r.sim >= 0.62).sort((a, b) => b.sim - a.sim);
console.log('\n=== REWRITE PRIORITIES (sim>=62%) ===');
if (!realRewrites.length) console.log('None — no substantive rewrite-worthy sections at threshold.');
else for (const r of realRewrites) console.log(JSON.stringify(r));

console.log('\n=== ACCEPTABLE HIGH SIM (sample) ===');
for (const a of acceptable.sort((x, y) => y.sim - x.sim).slice(0, 25)) {
  console.log(`${a.route} vs ${a.market} ${a.section} ${(a.sim * 100).toFixed(1)}% — ${a.why}`);
}

const rewritePages = [...new Set(realRewrites.map((r) => r.route))];
console.log('\n=== FINAL ===');
console.log(`Pages needing work: ${rewritePages.length}`);
console.log(rewritePages.join(', ') || 'None');
