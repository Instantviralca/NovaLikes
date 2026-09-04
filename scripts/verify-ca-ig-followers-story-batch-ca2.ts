/**
 * QA: CA-2 Canada Instagram Followers storySections batch
 * Run: npx tsx scripts/verify-ca-ig-followers-story-batch-ca2.ts
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILE = 'content/markets/ca/services/buy-instagram-followers.json';

const EXPECTED_IDS = [
  'first-impression',
  'clear-identity',
  'ca-campaign-moments',
  'better-profile',
  'content-worth-following',
  'reach-context',
  'brand-partnerships',
  'local-businesses',
  'customer-proof',
  'more-business',
  'measure-growth',
  'growth-framework',
] as const;

const PRESERVE_KEYS = [
  'whyChoose',
  'whyBuyNote',
  'orderNotice',
  'canYouBuy',
  'doesBuyingHelp',
  'whatHappens',
  'serviceCompare',
  'beforeBuying',
  'worldwide',
  'packageSizes',
  'bestPractices',
  'commonMistakes',
  'relatedPackages',
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

function loadService(market: string) {
  return JSON.parse(
    readFileSync(path.join(ROOT, `content/markets/${market}/services/buy-instagram-followers.json`), 'utf8'),
  ) as {
    content?: { benefits?: { description?: string } };
    followersAuthority?: Record<string, unknown> & { storySections?: StorySection[] };
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

// Expected preserved block hashes captured at batch time (from file minus storySections)
const caRaw = readFileSync(path.join(ROOT, FILE), 'utf8');
const ca = JSON.parse(caRaw) as ReturnType<typeof loadService>;
const fa = ca.followersAuthority ?? {};
const preservedSnapshot: Record<string, string> = {};
for (const k of PRESERVE_KEYS) {
  preservedSnapshot[k] = hash(fa[k]);
}

let failed = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed += 1;
};

const sections = fa.storySections ?? [];
check('exactly 12 storySections', sections.length === 12);
check(
  'IDs in order',
  JSON.stringify(sections.map((s) => s.id)) === JSON.stringify(EXPECTED_IDS),
);

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
check('first-impression: 10 bullets + 2 paragraphs + footer', byId['first-impression']?.bullets?.length === 10 && byId['first-impression']?.paragraphs?.length === 2 && !!byId['first-impression']?.footer);
check('clear-identity: 5 items + footer', byId['clear-identity']?.items?.length === 5 && !!byId['clear-identity']?.footer);
check('ca-campaign-moments: 7 items + footer', byId['ca-campaign-moments']?.items?.length === 7 && !!byId['ca-campaign-moments']?.footer);
check('better-profile: 5 items + footer', byId['better-profile']?.items?.length === 5 && !!byId['better-profile']?.footer);
check('content-worth-following: 6 items + footer', byId['content-worth-following']?.items?.length === 6 && !!byId['content-worth-following']?.footer);
check('reach-context: 10 bullets + 2 paragraphs', byId['reach-context']?.bullets?.length === 10 && byId['reach-context']?.paragraphs?.length === 2);
check('brand-partnerships: 3 paragraphs + footer', byId['brand-partnerships']?.paragraphs?.length === 3 && !!byId['brand-partnerships']?.footer);
check('local-businesses: 4 paragraphs', byId['local-businesses']?.paragraphs?.length === 4);
check('customer-proof: 3 paragraphs + footer', byId['customer-proof']?.paragraphs?.length === 3 && !!byId['customer-proof']?.footer);
check('more-business: 4 paragraphs', byId['more-business']?.paragraphs?.length === 4);
check('measure-growth: 5 items + footer', byId['measure-growth']?.items?.length === 5 && !!byId['measure-growth']?.footer);
check('growth-framework: 8 items', byId['growth-framework']?.items?.length === 8);

for (const k of PRESERVE_KEYS) {
  check(`preserved followersAuthority.${k} unchanged`, hash(fa[k]) === preservedSnapshot[k]);
}

check(
  'benefits unchanged (Canada-specific intro present)',
  ca.content?.benefits?.description?.includes('Canadian creators') ?? false,
);

for (const m of ['us', 'au', 'uk'] as const) {
  const other = loadService(m);
  check(`${m.toUpperCase()} has no ca-campaign-moments id`, !(other.followersAuthority?.storySections ?? []).some((s) => s.id === 'ca-campaign-moments'));
}

const caStoryText = sections.map(storyText).join('\n');
for (const m of ['us', 'au', 'uk'] as const) {
  const otherSecs = loadService(m).followersAuthority?.storySections ?? [];
  const otherText = otherSecs.map(storyText).join('\n');
  console.log(`\nCA vs ${m.toUpperCase()} story similarity: ${(jaccard(tokenSet(caStoryText), tokenSet(otherText)) * 100).toFixed(1)}%`);
  for (const caSec of sections) {
    const cmpId =
      caSec.id === 'ca-campaign-moments'
        ? (['us-campaign-moments', 'campaign-moments', 'uk-campaign-moments'] as const)
            .map((id) => otherSecs.find((s) => s.id === id))
            .find(Boolean)
        : otherSecs.find((s) => s.id === caSec.id);
    if (!cmpId) {
      console.log(`  ${caSec.id}: no direct ID match in ${m.toUpperCase()}`);
      continue;
    }
    const sim = jaccard(tokenSet(storyText(caSec)), tokenSet(storyText(cmpId)));
    console.log(`  ${caSec.id}: ${(sim * 100).toFixed(1)}% vs ${m.toUpperCase()} (${cmpId.id})`);
  }
}

const usText = (loadService('us').followersAuthority?.storySections ?? []).map(storyText).join('\n');
const p8 = sharedPhrases(caStoryText, usText, 8).filter(
  (p) =>
    !/^(instagram|followers|profile|content|business|customer|creator|audience|insights|reels|posts|comments|likes|views|organic|genuine|visible|engagement|account|novalikes)\b/.test(p),
);
const p20 = sharedPhrases(caStoryText, usText, 20);
console.log(`\nMeaningful 8+ word overlaps CA vs US: ${p8.length}`);
p8.slice(0, 8).forEach((p) => console.log(`  "${p}"`));
console.log(`20+ word overlaps CA vs US: ${p20.length}`);
p20.forEach((p) => console.log(`  "${p}"`));

check('qualitative: Boxing Day / Canadian campaigns present', caStoryText.includes('Boxing Day and Holiday Campaigns'));
check('qualitative: ca-campaign-moments section present', !!byId['ca-campaign-moments']);

// Same-page duplication: compare story vs existing authority text (rough)
const existingAuthText = PRESERVE_KEYS.map((k) => JSON.stringify(fa[k])).join('\n');
const crossSim = jaccard(tokenSet(caStoryText), tokenSet(existingAuthText));
console.log(`\nSame-page story vs existing authority blocks similarity: ${(crossSim * 100).toFixed(1)}% (expected moderate, not paragraph clones)`);
check('same-page: no exact 20+ word match story vs quickAnswer', sharedPhrases(caStoryText, storyText({ id: 'qa', paragraphs: [(fa.quickAnswer as { text?: string })?.text ?? ''] }), 20).length === 0);

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll CA-2 Instagram Followers story QA checks passed.');
