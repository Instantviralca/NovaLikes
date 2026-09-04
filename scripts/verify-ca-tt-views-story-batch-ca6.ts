/**
 * QA: CA-6 Canada TikTok Views storySections + benefits differentiation
 * Run: npx tsx scripts/verify-ca-tt-views-story-batch-ca6.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const EXPECTED_IDS = [
  'built-for-canada',
  'ca-campaign-moments',
  'visible-momentum',
  'build-videos',
  'profile-experience',
  'local-businesses',
  'real-experience',
  'customer-proof',
  'brand-partnerships',
  'business-results',
  'video-growth-framework',
] as const;

const EXCLUDED_IDS = [
  'fyp-reach',
  'hq-premium',
  'views-vs-followers',
  'views-vs-likes',
  'watch-performance',
  'monetisation',
  'platform-rules',
] as const;

const NEW_BENEFITS_DESC =
  'Choose TikTok Views when a specific public video is the content you want to support with a stronger visible View count. The service increases the displayed Views on that eligible video, while genuine watch behaviour, organic distribution, Likes, Followers, Comments, customer activity and monetization outcomes remain separate.';

const WHYBUY_DESC =
  'A Views package is most useful when you already know which TikTok deserves the attention. For a Canadian business, that could be a clear service demonstration, a new-location announcement, a seasonal promotion or a video showing the product in use. For a creator, it may be a collaboration, a strong educational clip or a post that introduces the direction of the account. Increasing the visible view count can support that specific video, but it does not replace watch quality, profile visits, comments, shares or follows. Keep the selected TikTok public, make sure the caption and video communicate the same idea, and give interested viewers an easy path to understand the rest of the profile. Concentrating views around stronger content is more purposeful than treating every upload the same.';

const PRESERVE_DUMMY_KEYS = ['config', 'whyBuy', 'howToBuy', 'relatedHeading', 'relatedIntro', 'quickAnswer'] as const;

type StorySection = {
  id: string;
  title?: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: { title: string; body: string }[];
};

function load(market: string) {
  return JSON.parse(
    readFileSync(path.join(ROOT, `content/markets/${market}/services/buy-tiktok-views.json`), 'utf8'),
  ) as {
    content?: { benefits?: { description?: string }; howItWorks?: { steps?: unknown[]; description?: string } };
    dummy?: Record<string, unknown> & {
      storySections?: StorySection[];
      config?: {
        worldwide?: unknown;
        serviceCompare?: unknown;
        doesBuyingHelp?: unknown;
        beforeBuying?: unknown;
        bestPractices?: unknown;
      };
    };
  };
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

function tokenSet(text: string): Set<string> {
  return new Set(
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size && !b.size) return 0;
  const inter = [...a].filter((x) => b.has(x)).length;
  return inter / new Set([...a, ...b]).size;
}

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);
}

function sharedPhrases(a: string, b: string, minLen: number): string[] {
  const aw = words(a);
  const bw = words(b);
  const out: string[] = [];
  for (let len = minLen; len <= Math.min(14, aw.length, bw.length); len++) {
    const set = new Set<string>();
    for (let i = 0; i <= aw.length - len; i++) set.add(aw.slice(i, i + len).join(' '));
    for (let i = 0; i <= bw.length - len; i++) {
      const p = bw.slice(i, i + len).join(' ');
      if (set.has(p) && !out.includes(p)) out.push(p);
    }
  }
  return out;
}

function hash(v: unknown): string {
  return createHash('sha256').update(JSON.stringify(v)).digest('hex');
}

function matchSection(caId: string, otherSecs: StorySection[]): StorySection | undefined {
  if (caId === 'built-for-canada') {
    return otherSecs.find((s) => ['built-for-us', 'built-for-australia', 'built-for-uk'].includes(s.id));
  }
  if (caId === 'ca-campaign-moments') {
    return otherSecs.find((s) =>
      ['us-campaign-moments', 'campaign-moments', 'uk-campaign-moments'].includes(s.id),
    );
  }
  return otherSecs.find((s) => s.id === caId);
}

function closestMarketForSection(caSec: StorySection, markets: readonly ('us' | 'au' | 'uk')[]): string {
  let best = { market: 'none', sim: 0, id: '' };
  for (const m of markets) {
    const otherSecs = load(m).dummy?.storySections ?? [];
    const cmp = matchSection(caSec.id, otherSecs);
    if (!cmp) continue;
    const sim = jaccard(tokenSet(storyText(caSec)), tokenSet(storyText(cmp))) * 100;
    if (sim > best.sim) best = { market: m.toUpperCase(), sim, id: cmp.id };
  }
  return best.market === 'none' ? 'none' : `${best.market} (${best.id}, ${best.sim.toFixed(1)}%)`;
}

const ca = load('ca');
const dummy = ca.dummy ?? {};
const sections = dummy.storySections ?? [];
const config = (dummy.config ?? {}) as {
  worldwide?: unknown;
  serviceCompare?: unknown;
  doesBuyingHelp?: unknown;
  beforeBuying?: unknown;
  bestPractices?: unknown;
};
const worldwideHash = hash(config.worldwide);
const serviceCompareHash = hash(config.serviceCompare);
const doesBuyingHelpHash = hash(config.doesBuyingHelp);
const beforeBuyingHash = hash(config.beforeBuying);
const bestPracticesHash = hash(config.bestPractices);

const preservedHashes: Record<string, string> = {};
for (const k of PRESERVE_DUMMY_KEYS) preservedHashes[k] = hash(dummy[k]);

let failed = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed += 1;
};

check('exactly 11 storySections', sections.length === 11);
check('IDs in order', JSON.stringify(sections.map((s) => s.id)) === JSON.stringify(EXPECTED_IDS));
for (const id of EXCLUDED_IDS) check(`no ${id} section`, !sections.some((s) => s.id === id));

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
check(
  'built-for-canada: 2 paragraphs + 5 items + footer',
  byId['built-for-canada']?.paragraphs?.length === 2 &&
    byId['built-for-canada']?.items?.length === 5 &&
    !!byId['built-for-canada']?.footer,
);
check('ca-campaign-moments: 6 items + footer', byId['ca-campaign-moments']?.items?.length === 6 && !!byId['ca-campaign-moments']?.footer);
check(
  'visible-momentum: 7 bullets + 2 paragraphs + footer',
  byId['visible-momentum']?.bullets?.length === 7 &&
    byId['visible-momentum']?.paragraphs?.length === 2 &&
    !!byId['visible-momentum']?.footer,
);
check('build-videos: 7 items + footer', byId['build-videos']?.items?.length === 7 && !!byId['build-videos']?.footer);
check('profile-experience: 5 items + footer', byId['profile-experience']?.items?.length === 5 && !!byId['profile-experience']?.footer);
check('local-businesses: 3 paragraphs + footer', byId['local-businesses']?.paragraphs?.length === 3 && !!byId['local-businesses']?.footer);
check('real-experience: 6 items + footer', byId['real-experience']?.items?.length === 6 && !!byId['real-experience']?.footer);
check('customer-proof: 3 paragraphs + footer', byId['customer-proof']?.paragraphs?.length === 3 && !!byId['customer-proof']?.footer);
check('brand-partnerships: 3 paragraphs + footer', byId['brand-partnerships']?.paragraphs?.length === 3 && !!byId['brand-partnerships']?.footer);
check('business-results: 5 items + footer', byId['business-results']?.items?.length === 5 && !!byId['business-results']?.footer);
check('video-growth-framework: 9 items + footer', byId['video-growth-framework']?.items?.length === 9 && !!byId['video-growth-framework']?.footer);

check('benefits.description exact', ca.content?.benefits?.description === NEW_BENEFITS_DESC);
check('whyBuy.description unchanged', (dummy.whyBuy as { description?: string })?.description === WHYBUY_DESC);
check('benefits !== whyBuy', ca.content?.benefits?.description !== (dummy.whyBuy as { description?: string })?.description);
check('dummy.config.worldwide unchanged', hash(config.worldwide) === worldwideHash);
check('dummy.config.serviceCompare unchanged', hash(config.serviceCompare) === serviceCompareHash);
check('dummy.config.doesBuyingHelp unchanged', hash(config.doesBuyingHelp) === doesBuyingHelpHash);
check('dummy.config.beforeBuying unchanged', hash(config.beforeBuying) === beforeBuyingHash);
check('dummy.config.bestPractices unchanged', hash(config.bestPractices) === bestPracticesHash);

for (const k of PRESERVE_DUMMY_KEYS) check(`preserved dummy.${k}`, hash(dummy[k]) === preservedHashes[k]);

const caStoryText = sections.map(storyText).join('\n');
console.log('\nPer-section closest market:');
for (const caSec of sections) {
  console.log(`  ${caSec.id}: ${closestMarketForSection(caSec, ['us', 'au', 'uk'])}`);
}

for (const m of ['us', 'au', 'uk'] as const) {
  const otherSecs = load(m).dummy?.storySections ?? [];
  const otherText = otherSecs.map(storyText).join('\n');
  const sim = jaccard(tokenSet(caStoryText), tokenSet(otherText)) * 100;
  console.log(`\nCA vs ${m.toUpperCase()} combined story similarity: ${sim.toFixed(1)}%`);

  for (const caSec of sections) {
    const cmp = matchSection(caSec.id, otherSecs);
    if (!cmp) {
      console.log(`  ${caSec.id}: no match in ${m.toUpperCase()}`);
      continue;
    }
    const secSim = jaccard(tokenSet(storyText(caSec)), tokenSet(storyText(cmp))) * 100;
    console.log(`  ${caSec.id}: ${m.toUpperCase()} ${cmp.id} = ${secSim.toFixed(1)}%`);
  }

  const p8 = sharedPhrases(caStoryText, otherText, 8).filter(
    (p) =>
      !/^(tiktok|likes|views|followers|profile|content|business|customer|creator|video|organic|genuine|visible|engagement|account|novalikes|reach|fyp|comments|watch)\b/.test(
        p,
      ),
  );
  const p20 = sharedPhrases(caStoryText, otherText, 20);
  console.log(`  Meaningful 8+ word overlaps: ${p8.length}`);
  p8.slice(0, 5).forEach((p) => console.log(`    "${p}"`));
  console.log(`  Exact 20+ word overlaps: ${p20.length}`);
  p20.forEach((p) => console.log(`    "${p}"`));
}

check('qualitative: Boxing Day present', caStoryText.includes('Boxing Day Campaigns'));
check('qualitative: Canadian local business verification', caStoryText.includes('Customers Can Check for Themselves'));

const whyBuyText = JSON.stringify(dummy.whyBuy);
console.log(`\nSame-page story vs whyBuy similarity: ${(jaccard(tokenSet(caStoryText), tokenSet(whyBuyText)) * 100).toFixed(1)}%`);
console.log(
  `Same-page story vs worldwide similarity: ${(jaccard(tokenSet(caStoryText), tokenSet(JSON.stringify(config.worldwide))) * 100).toFixed(1)}%`,
);
console.log(
  `Same-page story vs doesBuyingHelp similarity: ${(jaccard(tokenSet(caStoryText), tokenSet(JSON.stringify(config.doesBuyingHelp))) * 100).toFixed(1)}%`,
);

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll CA-6 TikTok Views QA checks passed.');
