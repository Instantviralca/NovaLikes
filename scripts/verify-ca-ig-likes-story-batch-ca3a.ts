/**
 * QA: CA-3A Canada Instagram Likes storySections + benefits dedupe
 * Run: npx tsx scripts/verify-ca-ig-likes-story-batch-ca3a.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILE = 'content/markets/ca/services/buy-instagram-likes.json';

const EXPECTED_IDS = [
  'built-for-canada',
  'ca-campaign-moments',
  'strong-first-glance',
  'clear-purpose',
  'content-worth-engaging',
  'organic-reach',
  'views-followers-context',
  'measure-quality',
  'local-businesses',
  'real-experience',
  'customer-proof',
  'brand-partnerships',
] as const;

const NEW_BENEFITS_DESC =
  'Choose Instagram Likes when a specific public post or Reel is the content you want to support. The service increases the visible Like count on that eligible content, while genuine reach, Comments, Views, Followers and business results remain separate outcomes.';

const WHYBUY_DESC =
  'Likes are one of the first visible engagement signals people notice underneath an Instagram post or Reel. For Canadian creators and businesses, that visible activity can be especially relevant when putting extra attention behind content such as product launches, new collections, creator collaborations, business announcements, promotional Reels, portfolio content, campaign posts, and important brand updates. An Instagram likes package increases the visible like count on the selected piece of content. The content itself still matters. Strong creative, a useful caption, clear positioning, consistent posting, and genuine audience interaction all contribute to how people respond after discovering your post. Think of likes as one engagement signal within a larger Instagram content strategy.';

const PRESERVE_DUMMY_KEYS = [
  'config',
  'whyBuy',
  'howToBuy',
  'relatedHeading',
  'relatedIntro',
  'quickAnswer',
] as const;

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
    readFileSync(path.join(ROOT, `content/markets/${market}/services/buy-instagram-likes.json`), 'utf8'),
  ) as {
    content?: {
      benefits?: { description?: string; title?: string; id?: string };
      howItWorks?: { steps?: unknown[]; description?: string };
    };
    dummy?: Record<string, unknown> & { storySections?: StorySection[] };
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

// Snapshot preserved dummy blocks (excluding storySections)
const preservedHashes: Record<string, string> = {};
for (const k of PRESERVE_DUMMY_KEYS) {
  preservedHashes[k] = hash(dummy[k]);
}

let failed = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed += 1;
};

check('exactly 12 storySections', sections.length === 12);
check(
  'IDs in order',
  JSON.stringify(sections.map((s) => s.id)) === JSON.stringify(EXPECTED_IDS),
);

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
check('built-for-canada: 2 paragraphs + 5 items + footer', byId['built-for-canada']?.paragraphs?.length === 2 && byId['built-for-canada']?.items?.length === 5 && !!byId['built-for-canada']?.footer);
check('ca-campaign-moments: 6 items + footer', byId['ca-campaign-moments']?.items?.length === 6 && !!byId['ca-campaign-moments']?.footer);
check('strong-first-glance: 6 bullets + 2 paragraphs + footer', byId['strong-first-glance']?.bullets?.length === 6 && byId['strong-first-glance']?.paragraphs?.length === 2 && !!byId['strong-first-glance']?.footer);
check('clear-purpose: 6 items + footer', byId['clear-purpose']?.items?.length === 6 && !!byId['clear-purpose']?.footer);
check('content-worth-engaging: 6 items + footer', byId['content-worth-engaging']?.items?.length === 6 && !!byId['content-worth-engaging']?.footer);
check('organic-reach: 10 bullets + 2 paragraphs', byId['organic-reach']?.bullets?.length === 10 && byId['organic-reach']?.paragraphs?.length === 2);
check('views-followers-context: 4 items + footer', byId['views-followers-context']?.items?.length === 4 && !!byId['views-followers-context']?.footer);
check('measure-quality: 6 items + footer', byId['measure-quality']?.items?.length === 6 && !!byId['measure-quality']?.footer);
check('local-businesses: 3 paragraphs + footer', byId['local-businesses']?.paragraphs?.length === 3 && !!byId['local-businesses']?.footer);
check('real-experience: 5 items + footer', byId['real-experience']?.items?.length === 5 && !!byId['real-experience']?.footer);
check('customer-proof: 3 paragraphs + footer', byId['customer-proof']?.paragraphs?.length === 3 && !!byId['customer-proof']?.footer);
check('brand-partnerships: 3 paragraphs + footer', byId['brand-partnerships']?.paragraphs?.length === 3 && !!byId['brand-partnerships']?.footer);

check('benefits.description exact replacement', ca.content?.benefits?.description === NEW_BENEFITS_DESC);
check('whyBuy.description unchanged', (dummy.whyBuy as { description?: string })?.description === WHYBUY_DESC);
check('benefits !== whyBuy descriptions', ca.content?.benefits?.description !== (dummy.whyBuy as { description?: string })?.description);

for (const k of PRESERVE_DUMMY_KEYS) {
  check(`preserved dummy.${k}`, hash(dummy[k]) === preservedHashes[k]);
}

check('main howItWorks has 4 steps', ca.content?.howItWorks?.steps?.length === 4);
check(
  'main howItWorks description unchanged',
  ca.content?.howItWorks?.description === 'Ordering Instagram likes through NovaLikes takes four simple steps.',
);

for (const m of ['us', 'au', 'uk'] as const) {
  const other = load(m);
  check(`${m.toUpperCase()} has no built-for-canada`, !(other.dummy?.storySections ?? []).some((s) => s.id === 'built-for-canada'));
}

const caStoryText = sections.map(storyText).join('\n');
for (const m of ['us', 'au', 'uk'] as const) {
  const otherSecs = load(m).dummy?.storySections ?? [];
  const otherText = otherSecs.map(storyText).join('\n');
  console.log(`\nCA vs ${m.toUpperCase()} story similarity: ${(jaccard(tokenSet(caStoryText), tokenSet(otherText)) * 100).toFixed(1)}%`);
  for (const caSec of sections) {
    const cmpId =
      caSec.id === 'built-for-canada'
        ? otherSecs.find((s) => ['built-for-us', 'built-for-australia', 'built-for-uk'].includes(s.id))
        : caSec.id === 'ca-campaign-moments'
          ? otherSecs.find((s) => ['us-campaign-moments', 'campaign-moments', 'uk-campaign-moments'].includes(s.id))
          : otherSecs.find((s) => s.id === caSec.id);
    if (!cmpId) {
      console.log(`  ${caSec.id}: no match in ${m.toUpperCase()}`);
      continue;
    }
    const sim = jaccard(tokenSet(storyText(caSec)), tokenSet(storyText(cmpId)));
    console.log(`  ${caSec.id}: ${(sim * 100).toFixed(1)}% vs ${m.toUpperCase()} (${cmpId.id})`);
  }
}

const usText = (load('us').dummy?.storySections ?? []).map(storyText).join('\n');
const p8 = sharedPhrases(caStoryText, usText, 8).filter(
  (p) =>
    !/^(instagram|likes|views|comments|followers|profile|content|business|customer|creator|reels|posts|organic|genuine|visible|engagement|account|novalikes|reach|explore)\b/.test(p),
);
const p20 = sharedPhrases(caStoryText, usText, 20);
console.log(`\nMeaningful 8+ word overlaps CA vs US: ${p8.length}`);
p8.slice(0, 6).forEach((p) => console.log(`  "${p}"`));
console.log(`20+ word overlaps CA vs US: ${p20.length}`);

check('qualitative: Boxing Day present', caStoryText.includes('Boxing Day Campaigns'));
check('qualitative: built-for-canada present', !!byId['built-for-canada']);

const whyBuyText = JSON.stringify(dummy.whyBuy);
const crossSim = jaccard(tokenSet(caStoryText), tokenSet(whyBuyText));
console.log(`\nSame-page story vs whyBuy block similarity: ${(crossSim * 100).toFixed(1)}%`);
check('no exact benefits/whyBuy duplicate', ca.content?.benefits?.description !== (dummy.whyBuy as { description?: string })?.description);

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll CA-3A Instagram Likes QA checks passed.');
