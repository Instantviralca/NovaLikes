/**
 * QA: CA-3C Canada Instagram Comments storySections + benefits differentiation
 * Run: npx tsx scripts/verify-ca-ig-comments-story-batch-ca3c.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILE = 'content/markets/ca/services/buy-instagram-comments.json';

const EXPECTED_IDS = [
  'built-for-canada',
  'build-conversation',
  'ca-campaign-moments',
  'make-comments-fit',
  'reply-genuine',
  'trust-management',
  'real-experience',
  'social-proof',
  'organic-reach',
  'local-businesses',
  'comment-strategy',
] as const;

const NEW_BENEFITS_DESC =
  'Choose Instagram Comments when a specific public post or Reel needs more visible conversation. The service adds Comments to that eligible content, while genuine community response, organic reach, Likes, Views, Followers and business results remain separate outcomes.';

const WHYBUY_DESC =
  'For Canadian creators and businesses, the most useful place to add visible comments is content that already gives people something specific to react to. That might be a product release, a before-and-after project, a new menu item, a local event, a creator collaboration, a seasonal promotion or a Reel that asks a clear question. A stronger comment count can make the discussion area look more active, but the topic still needs to make sense when someone reads the caption and opens the profile. Keep claims accurate, answer genuine questions, remove obvious spam when appropriate and make sure the post points visitors toward the right next step. Use a comments package to support a post with a clear purpose, then let your real publishing and community management build the longer-term conversation around it.';

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
    readFileSync(path.join(ROOT, `content/markets/${market}/services/buy-instagram-comments.json`), 'utf8'),
  ) as {
    content?: { benefits?: { description?: string }; howItWorks?: { steps?: unknown[]; description?: string } };
    dummy?: Record<string, unknown> & { storySections?: StorySection[]; config?: { worldwide?: unknown } };
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
const worldwideHash = hash((dummy.config as { worldwide?: unknown })?.worldwide);

const preservedHashes: Record<string, string> = {};
for (const k of PRESERVE_DUMMY_KEYS) preservedHashes[k] = hash(dummy[k]);

let failed = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed += 1;
};

check('exactly 11 storySections', sections.length === 11);
check('IDs in order', JSON.stringify(sections.map((s) => s.id)) === JSON.stringify(EXPECTED_IDS));
check('no measure-performance section', !sections.some((s) => s.id === 'measure-performance'));

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
check(
  'built-for-canada: 2 paragraphs + 5 items + footer',
  byId['built-for-canada']?.paragraphs?.length === 2 &&
    byId['built-for-canada']?.items?.length === 5 &&
    !!byId['built-for-canada']?.footer,
);
check('build-conversation: 5 items + footer', byId['build-conversation']?.items?.length === 5 && !!byId['build-conversation']?.footer);
check('ca-campaign-moments: 6 items + footer', byId['ca-campaign-moments']?.items?.length === 6 && !!byId['ca-campaign-moments']?.footer);
check('make-comments-fit: 1 paragraph + footer', byId['make-comments-fit']?.paragraphs?.length === 1 && !!byId['make-comments-fit']?.footer);
check('reply-genuine: 1 paragraph + footer', byId['reply-genuine']?.paragraphs?.length === 1 && !!byId['reply-genuine']?.footer);
check('trust-management: 5 items + footer', byId['trust-management']?.items?.length === 5 && !!byId['trust-management']?.footer);
check('real-experience: 5 items + footer', byId['real-experience']?.items?.length === 5 && !!byId['real-experience']?.footer);
check('social-proof: 3 paragraphs + footer', byId['social-proof']?.paragraphs?.length === 3 && !!byId['social-proof']?.footer);
check('organic-reach: 10 bullets + 2 paragraphs', byId['organic-reach']?.bullets?.length === 10 && byId['organic-reach']?.paragraphs?.length === 2);
check('local-businesses: 3 paragraphs + footer', byId['local-businesses']?.paragraphs?.length === 3 && !!byId['local-businesses']?.footer);
check('comment-strategy: 8 items + footer', byId['comment-strategy']?.items?.length === 8 && !!byId['comment-strategy']?.footer);

check('benefits.description exact', ca.content?.benefits?.description === NEW_BENEFITS_DESC);
check('whyBuy.description unchanged', (dummy.whyBuy as { description?: string })?.description === WHYBUY_DESC);
check('benefits !== whyBuy', ca.content?.benefits?.description !== (dummy.whyBuy as { description?: string })?.description);
check('dummy.worldwide unchanged', hash((dummy.config as { worldwide?: unknown })?.worldwide) === worldwideHash);

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
      !/^(instagram|views|likes|comments|followers|profile|content|business|customer|creator|reels|video|organic|genuine|visible|engagement|account|novalikes|reach|explore)\b/.test(
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
const whyBuySim = jaccard(tokenSet(caStoryText), tokenSet(whyBuyText)) * 100;
console.log(`\nSame-page story vs whyBuy similarity: ${whyBuySim.toFixed(1)}%`);

const worldwideText = JSON.stringify((dummy.config as { worldwide?: unknown })?.worldwide);
const wwSim = jaccard(tokenSet(caStoryText), tokenSet(worldwideText)) * 100;
console.log(`Same-page story vs worldwide similarity: ${wwSim.toFixed(1)}%`);

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll CA-3C Instagram Comments QA checks passed.');
