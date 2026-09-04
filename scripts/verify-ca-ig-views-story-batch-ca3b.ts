/**
 * QA: CA-3B Canada Instagram Views storySections + benefits differentiation
 * Run: npx tsx scripts/verify-ca-ig-views-story-batch-ca3b.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILE = 'content/markets/ca/services/buy-instagram-views.json';

const EXPECTED_IDS = [
  'built-for-canada',
  'ca-campaign-moments',
  'visible-momentum',
  'reels-worth-watching',
  'organic-reach',
  'profile-experience',
  'local-businesses',
  'real-experience',
  'customer-proof',
  'brand-partnerships',
] as const;

const NEW_BENEFITS_DESC =
  'Choose Instagram Views when a specific Reel or eligible video is the content you want to support. The service increases the visible View count on that submitted content, while genuine watch behaviour, organic reach, Likes, Followers, Comments and business results remain separate outcomes.';

const WHYBUY_DESC =
  "View count is one of the most obvious numbers attached to Instagram video content. When someone lands on a Reel, they may also notice the account behind it, the quality of the video, caption, likes, comments and other visible activity. An Instagram Views package lets you work specifically on the displayed view count of the video you choose. That can make it useful when you're preparing a new product Reel, service demonstration, event announcement, creator collaboration, portfolio video, promotional campaign, brand introduction or educational Reel. Views are one part of the presentation. The content still needs to give genuine viewers a reason to keep watching, visit your profile or interact. A larger number beside a Reel cannot fix a video that gives people nothing useful to watch. Make the opening easy to understand, show something worth staying for, use captions to add context, keep your profile connected to the video, and continue publishing. Purchased views change the visible view count. Your real content strategy still depends on what you create and how people genuinely respond to it.";

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
    readFileSync(path.join(ROOT, `content/markets/${market}/services/buy-instagram-views.json`), 'utf8'),
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

check('exactly 10 storySections', sections.length === 10);
check('IDs in order', JSON.stringify(sections.map((s) => s.id)) === JSON.stringify(EXPECTED_IDS));
check('no video-performance section', !sections.some((s) => s.id === 'video-performance'));

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
check('built-for-canada: 2 paragraphs + 5 items + footer', byId['built-for-canada']?.paragraphs?.length === 2 && byId['built-for-canada']?.items?.length === 5 && !!byId['built-for-canada']?.footer);
check('ca-campaign-moments: 6 items + footer', byId['ca-campaign-moments']?.items?.length === 6 && !!byId['ca-campaign-moments']?.footer);
check('visible-momentum: 7 bullets + 2 paragraphs + footer', byId['visible-momentum']?.bullets?.length === 7 && byId['visible-momentum']?.paragraphs?.length === 2 && !!byId['visible-momentum']?.footer);
check('reels-worth-watching: 6 items + footer', byId['reels-worth-watching']?.items?.length === 6 && !!byId['reels-worth-watching']?.footer);
check('organic-reach: 10 bullets + 2 paragraphs', byId['organic-reach']?.bullets?.length === 10 && byId['organic-reach']?.paragraphs?.length === 2);
check('profile-experience: 5 items + footer', byId['profile-experience']?.items?.length === 5 && !!byId['profile-experience']?.footer);
check('local-businesses: 3 paragraphs + footer', byId['local-businesses']?.paragraphs?.length === 3 && !!byId['local-businesses']?.footer);
check('real-experience: 6 items + footer', byId['real-experience']?.items?.length === 6 && !!byId['real-experience']?.footer);
check('customer-proof: 3 paragraphs + footer', byId['customer-proof']?.paragraphs?.length === 3 && !!byId['customer-proof']?.footer);
check('brand-partnerships: 3 paragraphs + footer', byId['brand-partnerships']?.paragraphs?.length === 3 && !!byId['brand-partnerships']?.footer);

check('benefits.description exact', ca.content?.benefits?.description === NEW_BENEFITS_DESC);
check('whyBuy.description unchanged', (dummy.whyBuy as { description?: string })?.description === WHYBUY_DESC);
check('benefits !== whyBuy', ca.content?.benefits?.description !== (dummy.whyBuy as { description?: string })?.description);
check('dummy.worldwide unchanged', hash((dummy.config as { worldwide?: unknown })?.worldwide) === worldwideHash);

for (const k of PRESERVE_DUMMY_KEYS) check(`preserved dummy.${k}`, hash(dummy[k]) === preservedHashes[k]);

for (const m of ['us', 'au', 'uk'] as const) {
  check(`${m.toUpperCase()} has no built-for-canada`, !(load(m).dummy?.storySections ?? []).some((s) => s.id === 'built-for-canada'));
}

const caStoryText = sections.map(storyText).join('\n');
for (const m of ['us', 'au', 'uk'] as const) {
  const otherSecs = load(m).dummy?.storySections ?? [];
  const otherText = otherSecs.map(storyText).join('\n');
  console.log(`\nCA vs ${m.toUpperCase()} story similarity: ${(jaccard(tokenSet(caStoryText), tokenSet(otherText)) * 100).toFixed(1)}%`);
  for (const caSec of sections) {
    const cmp =
      caSec.id === 'built-for-canada'
        ? otherSecs.find((s) => ['built-for-us', 'built-for-australia', 'built-for-uk'].includes(s.id))
        : caSec.id === 'ca-campaign-moments'
          ? otherSecs.find((s) => ['us-campaign-moments', 'campaign-moments', 'uk-campaign-moments'].includes(s.id))
          : otherSecs.find((s) => s.id === caSec.id);
    if (!cmp) {
      console.log(`  ${caSec.id}: no match in ${m.toUpperCase()}`);
      continue;
    }
    console.log(`  ${caSec.id}: ${(jaccard(tokenSet(storyText(caSec)), tokenSet(storyText(cmp))) * 100).toFixed(1)}% vs ${m.toUpperCase()} (${cmp.id})`);
  }
}

const usText = (load('us').dummy?.storySections ?? []).map(storyText).join('\n');
const p8 = sharedPhrases(caStoryText, usText, 8).filter(
  (p) => !/^(instagram|views|likes|comments|followers|profile|content|business|customer|creator|reels|video|organic|genuine|visible|engagement|account|novalikes|reach|explore)\b/.test(p),
);
const p20 = sharedPhrases(caStoryText, usText, 20);
console.log(`\nMeaningful 8+ word overlaps CA vs US: ${p8.length}`);
p8.slice(0, 6).forEach((p) => console.log(`  "${p}"`));
console.log(`20+ word overlaps CA vs US: ${p20.length}`);

check('qualitative: Boxing Day present', caStoryText.includes('Boxing Day Campaigns'));
const worldwideText = JSON.stringify((dummy.config as { worldwide?: unknown })?.worldwide);
const wwSim = jaccard(tokenSet(caStoryText), tokenSet(worldwideText));
console.log(`\nSame-page story vs worldwide similarity: ${(wwSim * 100).toFixed(1)}%`);
const whyBuySim = jaccard(tokenSet(caStoryText), tokenSet(JSON.stringify(dummy.whyBuy)));
console.log(`Same-page story vs whyBuy similarity: ${(whyBuySim * 100).toFixed(1)}%`);

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll CA-3B Instagram Views QA checks passed.');
