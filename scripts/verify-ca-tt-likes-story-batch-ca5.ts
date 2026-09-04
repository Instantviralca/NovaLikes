/**
 * QA: CA-5 Canada TikTok Likes storySections + benefits differentiation
 * Run: npx tsx scripts/verify-ca-tt-likes-story-batch-ca5.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const EXPECTED_IDS = [
  'built-for-canada',
  'ca-campaign-moments',
  'strong-content',
  'content-engagement',
  'local-businesses',
  'real-experience',
  'customer-proof',
  'brand-partnerships',
  'business-results',
  'engagement-framework',
] as const;

const EXCLUDED_IDS = [
  'likes-reach',
  'likes-views-context',
  'organic-engagement',
  'platform-rules',
  'measure-quality',
] as const;

const NEW_BENEFITS_DESC =
  'Choose TikTok Likes when a specific public video is the content you want to support with more visible engagement. The service increases the Like count displayed on that eligible video, while genuine Views, Comments, Followers, FYP distribution, customer activity and business results remain separate outcomes.';

const WHYBUY_DESC =
  'Not every TikTok on an account needs the same level of support. Canadian creators and businesses may have a few videos that carry more weight, such as a product demonstration, campaign launch, client result, event announcement, seasonal offer or creator collaboration. A Likes package can increase the visible like count on the selected public video, which can strengthen one engagement signal when people encounter it. The video still needs a strong opening, a clear message and a profile that supports what the content promises. Choose the TikTok that best represents the campaign instead of spreading likes across unrelated posts. This keeps the order tied to a specific content goal and makes the visible engagement feel more connected to the rest of the account.';

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
    readFileSync(path.join(ROOT, `content/markets/${market}/services/buy-tiktok-likes.json`), 'utf8'),
  ) as {
    content?: { benefits?: { description?: string }; howItWorks?: { steps?: unknown[]; description?: string } };
    dummy?: Record<string, unknown> & {
      storySections?: StorySection[];
      config?: { worldwide?: unknown; serviceCompare?: unknown; doesBuyingHelp?: unknown };
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
};
const worldwideHash = hash(config.worldwide);
const serviceCompareHash = hash(config.serviceCompare);
const doesBuyingHelpHash = hash(config.doesBuyingHelp);

const preservedHashes: Record<string, string> = {};
for (const k of PRESERVE_DUMMY_KEYS) preservedHashes[k] = hash(dummy[k]);

let failed = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed += 1;
};

check('exactly 10 storySections', sections.length === 10);
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
  'strong-content: 7 bullets + 2 paragraphs + footer',
  byId['strong-content']?.bullets?.length === 7 &&
    byId['strong-content']?.paragraphs?.length === 2 &&
    !!byId['strong-content']?.footer,
);
check('content-engagement: 6 items + footer', byId['content-engagement']?.items?.length === 6 && !!byId['content-engagement']?.footer);
check('local-businesses: 3 paragraphs + footer', byId['local-businesses']?.paragraphs?.length === 3 && !!byId['local-businesses']?.footer);
check('real-experience: 6 items + footer', byId['real-experience']?.items?.length === 6 && !!byId['real-experience']?.footer);
check('customer-proof: 3 paragraphs + footer', byId['customer-proof']?.paragraphs?.length === 3 && !!byId['customer-proof']?.footer);
check('brand-partnerships: 3 paragraphs + footer', byId['brand-partnerships']?.paragraphs?.length === 3 && !!byId['brand-partnerships']?.footer);
check('business-results: 5 items + footer', byId['business-results']?.items?.length === 5 && !!byId['business-results']?.footer);
check('engagement-framework: 8 items + footer', byId['engagement-framework']?.items?.length === 8 && !!byId['engagement-framework']?.footer);

check('benefits.description exact', ca.content?.benefits?.description === NEW_BENEFITS_DESC);
check('whyBuy.description unchanged', (dummy.whyBuy as { description?: string })?.description === WHYBUY_DESC);
check('benefits !== whyBuy', ca.content?.benefits?.description !== (dummy.whyBuy as { description?: string })?.description);
check('dummy.config.worldwide unchanged', hash(config.worldwide) === worldwideHash);
check('dummy.config.serviceCompare unchanged', hash(config.serviceCompare) === serviceCompareHash);
check('dummy.config.doesBuyingHelp unchanged', hash(config.doesBuyingHelp) === doesBuyingHelpHash);

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
      !/^(tiktok|likes|views|followers|profile|content|business|customer|creator|video|organic|genuine|visible|engagement|account|novalikes|reach|fyp|comments|shares)\b/.test(
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
check('qualitative: Canadian local business verification', caStoryText.includes('Customers Can Verify'));

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
console.log('\nAll CA-5 TikTok Likes QA checks passed.');
