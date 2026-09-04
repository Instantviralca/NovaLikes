/**
 * Read-only final AU differentiation rescan (post AU-1..AU-10).
 * Compares storySections only for long-form; full page for overall.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { CORE_SERVICE_SLUGS } from '../lib/i18n/config';

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

const PAIRS: Record<string, Record<string, string>> = {
  'buy-instagram-views': {
    'built-for-australia': 'built-for-us',
    'campaign-moments': 'us-campaign-moments',
    'better-profile-experience': 'profile-experience',
    'build-reels-deserve': 'reels-worth-watching',
    'organic-reach': 'organic-reach',
    'video-performance': 'video-performance',
    'real-business-content': 'real-experience',
    'local-businesses': 'local-businesses',
    'customer-proof': 'brand-partnerships',
  },
  'buy-instagram-likes': {
    'built-for-australia': 'built-for-us',
    'better-content-experience': 'strong-first-glance',
    'support-content': 'content-worth-engaging',
    'brand-partnerships': 'brand-partnerships',
    'local-businesses': 'local-businesses',
    'real-experience': 'real-experience',
  },
  'buy-instagram-followers': {
    'built-for-australia': 'built-for-us',
    'first-impression': 'first-impression',
    'better-profile': 'better-profile',
    'content-worth-following': 'content-worth-following',
    'reach-context': 'reach-context',
    'brand-partnerships': 'brand-partnerships',
    'local-businesses': 'local-businesses',
    'customer-proof': 'customer-proof',
    'measure-growth': 'measure-growth',
    'growth-framework': 'growth-framework',
  },
  'buy-facebook-post-likes': {
    'built-for-australia': 'built-for-us',
    'strong-content': 'strong-content',
    'real-activity': 'real-activity',
    'local-businesses': 'local-businesses',
    'customer-proof': 'customer-proof',
    'clear-goal': 'useful-next-step',
    'campaign-presentation': 'brand-campaigns',
    'facebook-insights': 'facebook-insights',
    'content-framework': 'content-framework',
  },
  'buy-tiktok-followers': {
    'built-for-australia': 'built-for-us',
    'clear-niche': 'clear-niche',
    'stronger-presence': 'better-profile',
    'videos-worth-watching': 'videos-worth-watching',
    'brand-partnerships': 'brand-partnerships',
    'local-businesses': 'local-businesses',
    'business-results': 'business-results',
    'growth-framework': 'growth-framework',
  },
};

function ukPair(usId: string): string {
  if (usId === 'built-for-us') return 'built-for-uk';
  if (usId === 'us-campaign-moments') return 'uk-campaign-moments';
  return usId;
}

function loadJson(p: string): unknown {
  return JSON.parse(readFileSync(path.join(ROOT, p), 'utf8'));
}

function getStorySectionsFromFile(market: 'au' | 'us' | 'uk', slug?: string): StorySection[] {
  const file =
    slug === undefined
      ? `content/markets/${market}/homepage.json`
      : `content/markets/${market}/services/${slug}.json`;
  const raw = loadJson(file) as {
    storySections?: StorySection[];
    dummy?: { storySections?: StorySection[] };
    followersAuthority?: { storySections?: StorySection[] };
  };
  if (file.includes('homepage')) return raw.storySections ?? [];
  return raw.followersAuthority?.storySections ?? raw.dummy?.storySections ?? [];
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

function allStoryText(sections: StorySection[]): string {
  return sections.map(storyText).join('\n');
}

function collectPageText(market: 'au' | 'us' | 'uk', slug?: string): string {
  const file =
    slug === undefined
      ? `content/markets/${market}/homepage.json`
      : `content/markets/${market}/services/${slug}.json`;
  const raw = loadJson(file);
  const skip = new Set(['href', 'src', 'slug', 'platformId', 'icon', 'tone', 'width', 'height', 'order', 'category', 'id', 'packageIds']);
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === 'string') {
      const t = v.trim();
      if (t && !t.startsWith('/') && !t.startsWith('http') && !/\.webp$/i.test(t)) out.push(t);
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (skip.has(k)) continue;
        walk(val);
      }
    }
  };
  walk(raw);
  return out.join('\n');
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

function sharedPhrases(a: string, b: string, minLen: number): string[] {
  const aw = words(a.slice(0, 20000));
  const bw = words(b.slice(0, 20000));
  const out: string[] = [];
  const maxLen = Math.min(14, aw.length, bw.length);
  for (let len = minLen; len <= maxLen; len++) {
    const set = new Set<string>();
    for (let i = 0; i <= aw.length - len; i++) set.add(aw.slice(i, i + len).join(' '));
    for (let i = 0; i <= bw.length - len; i++) {
      const p = bw.slice(i, i + len).join(' ');
      if (set.has(p) && !out.includes(p)) out.push(p);
    }
  }
  return out;
}

const FACTUAL_IDS =
  /organic-reach|fyp-reach|reach-not-same|reach-context|followers-vs|page-likes-vs|likes-reach|likes-views|video-performance|watch-behaviour|content-performance|measure-quality|views-followers|monetisation|platform-rules|metric-meanings|hq-premium|likes-vs-views/i;

function classifySection(id: string, title = '', sim: number): 'factual' | 'substantive' | 'minor' {
  if (FACTUAL_IDS.test(id) || /organic reach|not the same thing|metric/i.test(title)) return 'factual';
  if (sim >= 0.58) return 'substantive';
  if (sim >= 0.48) return 'minor';
  return 'minor';
}

function sectionVerdict(kind: 'factual' | 'substantive' | 'minor', sim: number): 'STOP' | 'MINOR' | 'REWRITE NEEDED' {
  if (kind === 'factual') return 'STOP';
  if (kind === 'substantive' && sim >= 0.62) return 'REWRITE NEEDED';
  if (sim >= 0.52) return 'MINOR';
  return 'STOP';
}

function pageVerdict(
  auUsStory: number,
  auUkStory: number,
  substantiveSections: number,
  igViewsOnly = false,
): 'STOP' | 'MINOR' | 'REWRITE NEEDED' {
  if (igViewsOnly && substantiveSections >= 2) return 'REWRITE NEEDED';
  if (substantiveSections >= 3) return 'REWRITE NEEDED';
  if (substantiveSections >= 1) return 'MINOR';
  if (auUsStory >= 0.55 && auUkStory >= 0.55) return 'MINOR';
  return 'STOP';
}

type PageRow = {
  route: string;
  auUsOverall: number;
  auUkOverall: number;
  auUsStory: number;
  auUkStory: number;
  verdict: string;
};

const pages: { route: string; slug?: string; label: string }[] = [
  { route: '/au/', label: 'Homepage' },
  ...CORE_SERVICE_SLUGS.map((slug) => ({
    route: `/au/${slug}`,
    slug,
    label: slug.replace('buy-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  })),
];

const rows: PageRow[] = [];
const topOverlaps: {
  route: string;
  section: string;
  market: string;
  sim: number;
  why: string;
  rec: string;
}[] = [];

let total8 = 0;
let total20 = 0;
const phrases20All: { route: string; phrase: string }[] = [];
const phrases8Sample: { route: string; phrase: string }[] = [];

const igViewsSections: {
  id: string;
  auUs: number;
  auUk: number;
  kind: string;
  verdict: string;
  p8: string[];
  p20: string[];
}[] = [];

for (const page of pages) {
  const auStory = getStorySectionsFromFile('au', page.slug);
  const usStory = getStorySectionsFromFile('us', page.slug);
  const ukStory = getStorySectionsFromFile('uk', page.slug);

  const auAll = collectPageText('au', page.slug);
  const usAll = collectPageText('us', page.slug);
  const ukAll = collectPageText('uk', page.slug);

  const auStoryText = allStoryText(auStory);
  const usStoryText = allStoryText(usStory);
  const ukStoryText = allStoryText(ukStory);

  const auUsOverall = jaccard(tokenSet(auAll), tokenSet(usAll));
  const auUkOverall = jaccard(tokenSet(auAll), tokenSet(ukAll));
  const auUsStory = jaccard(tokenSet(auStoryText), tokenSet(usStoryText));
  const auUkStory = jaccard(tokenSet(auStoryText), tokenSet(ukStoryText));

  const pairMap = page.slug ? PAIRS[page.slug] : undefined;
  let substantiveCount = 0;

  const igViewsById = new Map<
    string,
    { auUs: number; auUk: number; kind: string; verdictUs: string; p8: string[]; p20: string[] }
  >();

  for (const au of auStory) {
    let usId = pairMap?.[au.id] ?? au.id;
    let ukId = ukPair(usId);
    const usSec = usStory.find((s) => s.id === usId);
    const ukSec = ukStory.find((s) => s.id === ukId);

    const simUs = usSec ? jaccard(tokenSet(storyText(au)), tokenSet(storyText(usSec))) : 0;
    const simUk = ukSec ? jaccard(tokenSet(storyText(au)), tokenSet(storyText(ukSec))) : 0;
    const kind = classifySection(au.id, au.title ?? '', Math.max(simUs, simUk));
    const secVerdictUs = usSec ? sectionVerdict(classifySection(au.id, au.title ?? '', simUs), simUs) : 'STOP';
    const p8 = usSec
      ? sharedPhrases(storyText(au), storyText(usSec), 8).filter(
          (p) =>
            !/^(instagram|likes|views|comments|followers|profile|content|business|customer|engagement|analytics|reels|post|video|account|genuine|visible|organic|facebook|tiktok|page|creator|brand)\b/.test(
              p,
            ),
        )
      : [];
    const p20 = usSec ? sharedPhrases(storyText(au), storyText(usSec), 20) : [];

    if (page.slug === 'buy-instagram-views') {
      igViewsById.set(au.id, {
        auUs: simUs,
        auUk: simUk,
        kind,
        verdictUs: secVerdictUs,
        p8: p8.slice(0, 3),
        p20: p20,
      });
    }

    for (const [market, other, sim] of [
      ['US', usSec, simUs],
      ['UK', ukSec, simUk],
    ] as const) {
      if (!other) continue;
      const kindM = classifySection(au.id, au.title ?? '', sim);
      const secVerdict = sectionVerdict(kindM, sim);

      if (kindM === 'substantive' && sim >= 0.55) {
        substantiveCount++;
        if (sim >= 0.58) {
          topOverlaps.push({
            route: page.route,
            section: `${au.id}↔${market === 'US' ? usId : ukId}`,
            market,
            sim,
            why: 'Same argument structure / strategic guidance overlap (not metric boilerplate)',
            rec:
              secVerdict === 'REWRITE NEEDED'
                ? 'Consider targeted rewrite'
                : 'Monitor; likely acceptable after batch work',
          });
        }
      }
    }
  }

  if (page.slug === 'buy-instagram-views') {
    for (const [id, s] of igViewsById) {
      igViewsSections.push({ id, ...s, verdict: s.verdictUs });
    }
  }

  // phrase scan page-level story
  const p8us = sharedPhrases(auStoryText, usStoryText, 8);
  const p20us = sharedPhrases(auStoryText, usStoryText, 20);
  total8 += p8us.length;
  total20 += p20us.length;
  for (const p of p20us) phrases20All.push({ route: page.route, phrase: p });
  for (const p of p8us.filter((x) => x.split(' ').length >= 10).slice(0, 3)) {
    phrases8Sample.push({ route: page.route, phrase: p });
  }

  const isIgViews = page.slug === 'buy-instagram-views';
  const verdict = pageVerdict(auUsStory, auUkStory, substantiveCount, isIgViews);

  rows.push({
    route: page.route,
    auUsOverall,
    auUkOverall,
    auUsStory,
    auUkStory,
    verdict,
  });
}

console.log('=== FINAL TABLE (storySections = long-form) ===');
console.log('| AU Page | AU vs US Overall | AU vs UK Overall | AU vs US Long-form | AU vs UK Long-form | Verdict |');
for (const r of rows) {
  const label = r.route;
  console.log(
    `| ${label} | ${(r.auUsOverall * 100).toFixed(1)}% | ${(r.auUkOverall * 100).toFixed(1)}% | ${(r.auUsStory * 100).toFixed(1)}% | ${(r.auUkStory * 100).toFixed(1)}% | ${r.verdict} |`,
  );
}

console.log('\n=== INSTAGRAM VIEWS SECTION REVIEW ===');
for (const s of igViewsSections) {
  console.log(JSON.stringify({ id: s.id, auUs: +(s.auUs * 100).toFixed(1), auUk: +(s.auUk * 100).toFixed(1), kind: s.kind, verdict: s.verdict, p20: s.p20 }));
}

console.log('\n=== TOP SUBSTANTIVE OVERLAPS ===');
for (const o of topOverlaps.sort((a, b) => b.sim - a.sim).slice(0, 15)) {
  console.log(JSON.stringify(o));
}

console.log('\n=== PHRASE COUNTS (AU story vs US story, all pages) ===');
console.log(`8+ word phrases total: ${total8}`);
console.log(`20+ word phrases total: ${total20}`);
console.log('\n20+ word substantive matches:');
for (const p of phrases20All.slice(0, 30)) console.log(`${p.route}: "${p.phrase}"`);
if (!phrases20All.length) console.log('None across story sections');

console.log('\n=== IG VIEWS DECISION INPUT ===');
const igRewrite = igViewsSections.filter((s) => s.verdict === 'REWRITE NEEDED' && s.kind === 'substantive');
console.log(`Substantive REWRITE NEEDED sections: ${igRewrite.map((s) => s.id).join(', ') || 'none'}`);
