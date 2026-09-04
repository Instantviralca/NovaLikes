/**
 * QA: CA-4 Canada TikTok Followers storySections + benefits differentiation
 * Run: npx tsx scripts/verify-ca-tt-followers-story-batch-ca4.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const EXPECTED_IDS = [
  'built-for-canada',
  'clear-niche',
  'ca-campaign-moments',
  'videos-worth-watching',
  'better-profile',
  'brand-partnerships',
  'local-businesses',
  'business-proof',
  'business-results',
  'growth-framework',
] as const;

const EXCLUDED_IDS = ['fyp-reach', 'monetisation', 'organic-growth', 'platform-rules'] as const;

const NEW_BENEFITS_DESC =
  'Choose TikTok Followers when the visible audience size of a specific public profile is the metric you want to strengthen. The service increases the follower count displayed on that profile, while genuine video performance, FYP distribution, Likes, Views, customer activity and monetization eligibility remain separate outcomes.';

const WHYBUY_DESC =
  'A follower package can strengthen the visible audience size of a TikTok profile, but the profile should explain itself as soon as someone lands on it. Canadian creators, ecommerce brands, local businesses and professional services may use TikTok for very different reasons, so the account needs a clear identity behind the number. Keep the bio specific, use a recognizable profile image, pin videos that introduce the account well and make recent posts consistent with the audience you want to attract. If a campaign sends more people to your profile, they should be able to tell what you publish and why they should keep watching. Use follower growth to support an account that is already being built with a clear content direction rather than treating the follower count as the entire strategy.';

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
    readFileSync(path.join(ROOT, `content/markets/${market}/services/buy-tiktok-followers.json`), 'utf8'),
  ) as {
    content?: { benefits?: { description?: string }; howItWorks?: { steps?: unknown[]; description?: string } };
    dummy?: Record<string, unknown> & {
      storySections?: StorySection[];
      config?: { worldwide?: unknown; doesBuyingHelp?: unknown };
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

const ca = load('ca');
const dummy = ca.dummy ?? {};
const sections = dummy.storySections ?? [];
const config = (dummy.config ?? {}) as { worldwide?: unknown; doesBuyingHelp?: unknown };
const worldwideHash = hash(config.worldwide);
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
check('clear-niche: 5 items + footer', byId['clear-niche']?.items?.length === 5 && !!byId['clear-niche']?.footer);
check('ca-campaign-moments: 7 items + footer', byId['ca-campaign-moments']?.items?.length === 7 && !!byId['ca-campaign-moments']?.footer);
check('videos-worth-watching: 6 items + footer', byId['videos-worth-watching']?.items?.length === 6 && !!byId['videos-worth-watching']?.footer);
check('better-profile: 5 items + footer', byId['better-profile']?.items?.length === 5 && !!byId['better-profile']?.footer);
check('brand-partnerships: 3 paragraphs + footer', byId['brand-partnerships']?.paragraphs?.length === 3 && !!byId['brand-partnerships']?.footer);
check('local-businesses: 3 paragraphs + footer', byId['local-businesses']?.paragraphs?.length === 3 && !!byId['local-businesses']?.footer);
check('business-proof: 3 paragraphs + footer', byId['business-proof']?.paragraphs?.length === 3 && !!byId['business-proof']?.footer);
check('business-results: 5 items + footer', byId['business-results']?.items?.length === 5 && !!byId['business-results']?.footer);
check('growth-framework: 8 items + footer', byId['growth-framework']?.items?.length === 8 && !!byId['growth-framework']?.footer);

check('benefits.description exact', ca.content?.benefits?.description === NEW_BENEFITS_DESC);
check('whyBuy.description unchanged', (dummy.whyBuy as { description?: string })?.description === WHYBUY_DESC);
check('benefits !== whyBuy', ca.content?.benefits?.description !== (dummy.whyBuy as { description?: string })?.description);
check('dummy.config.worldwide unchanged', hash(config.worldwide) === worldwideHash);
check('dummy.config.doesBuyingHelp unchanged', hash(config.doesBuyingHelp) === doesBuyingHelpHash);

for (const k of PRESERVE_DUMMY_KEYS) check(`preserved dummy.${k}`, hash(dummy[k]) === preservedHashes[k]);

const caStoryText = sections.map(storyText).join('\n');
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
    console.log(`  ${caSec.id}: closest ${m.toUpperCase()} ${cmp.id} = ${secSim.toFixed(1)}%`);
  }

  const p8 = sharedPhrases(caStoryText, otherText, 8).filter(
    (p) =>
      !/^(tiktok|followers|likes|views|profile|content|business|customer|creator|video|organic|genuine|visible|engagement|account|novalikes|reach|fyp)\b/.test(
        p,
      ),
  );
  const p20 = sharedPhrases(caStoryText, otherText, 20);
  console.log(`  Meaningful 8+ word overlaps: ${p8.length}`);
  p8.slice(0, 5).forEach((p) => console.log(`    "${p}"`));
  console.log(`  Exact 20+ word overlaps: ${p20.length}`);
  p20.forEach((p) => console.log(`    "${p}"`));
}

check('qualitative: Boxing Day present', caStoryText.includes('Boxing Day and Holiday Campaigns'));
check('qualitative: Canadian local business verification', caStoryText.includes('People Can Verify'));

const whyBuyText = JSON.stringify(dummy.whyBuy);
const whyBuySim = jaccard(tokenSet(caStoryText), tokenSet(whyBuyText)) * 100;
console.log(`\nSame-page story vs whyBuy similarity: ${whyBuySim.toFixed(1)}%`);

const worldwideText = JSON.stringify(config.worldwide);
const wwSim = jaccard(tokenSet(caStoryText), tokenSet(worldwideText)) * 100;
console.log(`Same-page story vs worldwide similarity: ${wwSim.toFixed(1)}%`);

const doesBuyingHelpText = JSON.stringify(config.doesBuyingHelp);
const dbhSim = jaccard(tokenSet(caStoryText), tokenSet(doesBuyingHelpText)) * 100;
console.log(`Same-page story vs doesBuyingHelp similarity: ${dbhSim.toFixed(1)}%`);

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll CA-4 TikTok Followers QA checks passed.');
