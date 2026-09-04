/**
 * Read-only US vs UK content differentiation audit.
 * Does NOT modify any production content files.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

type Json = Record<string, unknown>;

const PAGE_PAIRS: { label: string; us: string; uk: string }[] = [
  { label: 'Homepage', us: 'content/markets/us/homepage.json', uk: 'content/markets/uk/homepage.json' },
  {
    label: 'Instagram Followers',
    us: 'content/markets/us/services/buy-instagram-followers.json',
    uk: 'content/markets/uk/services/buy-instagram-followers.json',
  },
  {
    label: 'Instagram Likes',
    us: 'content/markets/us/services/buy-instagram-likes.json',
    uk: 'content/markets/uk/services/buy-instagram-likes.json',
  },
  {
    label: 'Instagram Views',
    us: 'content/markets/us/services/buy-instagram-views.json',
    uk: 'content/markets/uk/services/buy-instagram-views.json',
  },
  {
    label: 'Instagram Comments',
    us: 'content/markets/us/services/buy-instagram-comments.json',
    uk: 'content/markets/uk/services/buy-instagram-comments.json',
  },
  {
    label: 'TikTok Followers',
    us: 'content/markets/us/services/buy-tiktok-followers.json',
    uk: 'content/markets/uk/services/buy-tiktok-followers.json',
  },
  {
    label: 'TikTok Likes',
    us: 'content/markets/us/services/buy-tiktok-likes.json',
    uk: 'content/markets/uk/services/buy-tiktok-likes.json',
  },
  {
    label: 'TikTok Views',
    us: 'content/markets/us/services/buy-tiktok-views.json',
    uk: 'content/markets/uk/services/buy-tiktok-views.json',
  },
  {
    label: 'Facebook Followers',
    us: 'content/markets/us/services/buy-facebook-followers.json',
    uk: 'content/markets/uk/services/buy-facebook-followers.json',
  },
  {
    label: 'Facebook Page Likes',
    us: 'content/markets/us/services/buy-facebook-page-likes.json',
    uk: 'content/markets/uk/services/buy-facebook-page-likes.json',
  },
  {
    label: 'Facebook Post Likes',
    us: 'content/markets/us/services/buy-facebook-post-likes.json',
    uk: 'content/markets/uk/services/buy-facebook-post-likes.json',
  },
];

const BATCH2_BENEFITS: Record<string, { us: string; uk: string }> = {
  'Instagram Comments': {
    us: 'Build Visible Discussion Around Instagram Content Worth Talking About',
    uk: 'Build Visible Discussion Around Instagram Content Worth Talking About',
  },
  'TikTok Followers': {
    us: 'Build a TikTok Profile That Makes Sense Beyond the Follower Number',
    uk: 'Support a TikTok Profile With a Clear Identity Behind It',
  },
  'Facebook Followers': {
    us: 'Use Facebook Followers to Support an Active US Business Page',
    uk: 'Build Follower Count Around a Facebook Page That Looks Current',
  },
  'Facebook Page Likes': {
    us: 'Use Facebook Page Likes to Support an Active US Business Page',
    uk: 'Give Your Facebook Page Like Count a Stronger Foundation',
  },
  'Facebook Post Likes': {
    us: 'Use Facebook Post Likes to Support Active US Page Content',
    uk: 'Support Facebook Posts That Have Lasting Value for Your Page',
  },
};

const DIFFERENTIATION_MARKERS: Record<string, string[]> = {
  Homepage: ['Different UK Accounts Need Different Instagram Priorities', 'Plan Instagram Around Important UK Campaign Moments'],
  'Instagram Followers': ['Build Instagram Followers Around the UK Profile You Actually Have'],
  'Instagram Likes': ['Build Instagram Likes Around the UK Content You Actually Want to Support'],
  'Instagram Views': ['Build Instagram Views Around the UK Content You Actually Want to Support'],
  'Instagram Comments': ['Choose Instagram Comments Around the UK Content You Actually Want to Support'],
  'TikTok Followers': ['Build TikTok Followers Around the UK Account You Actually Have'],
  'TikTok Likes': ['Build TikTok Likes Around the UK Content You Actually Want to Support'],
  'TikTok Views': ['Build TikTok Views Around the UK Content You Actually Want to Support'],
  'Facebook Followers': ['Build Facebook Followers Around the UK Page You Actually Have'],
  'Facebook Page Likes': ['Build Facebook Page Likes Around the UK Page You Actually Manage'],
  'Facebook Post Likes': ['Build Facebook Post Likes Around the UK Content You Actually Want to Support'],
};

// Factual sections — high similarity acceptable
const FACTUAL_SECTION_PATTERNS = [
  /organic.?reach/i,
  /fyp|for you page|explore/i,
  /monetis/i,
  /platform.?rules/i,
  /followers.*likes.*views|likes.*views.*comments|page likes.*post likes|followers.*page likes/i,
  /reach.*not.*same|don't automatically mean/i,
  /metric/i,
  /organic.?growth/i,
  /instagram.?insights/i,
  /unique.?viewers/i,
  /watch.?behaviour|video.?performance/i,
  /likes.?vs.?views|views.?not.?likes|comments.?vs/i,
  /hq.?premium|delivery/i,
];

function loadJson(rel: string): Json {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf8')) as Json;
}

function collectStrings(value: unknown, skipKeys = new Set(['href', 'src', 'slug', 'platformId', 'icon', 'tone', 'width', 'height', 'order', 'category', 'id'])): string[] {
  const out: string[] = [];
  if (typeof value === 'string') {
    const t = value.trim();
    if (t.length > 0 && !t.startsWith('/') && !t.startsWith('http') && !t.includes('.webp')) out.push(t);
    return out;
  }
  if (Array.isArray(value)) {
    for (const v of value) out.push(...collectStrings(v, skipKeys));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Json)) {
      if (skipKeys.has(k)) continue;
      out.push(...collectStrings(v, skipKeys));
    }
  }
  return out;
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function sharedPhrases(usText: string, ukText: string, minLen: number, maxPhrases = 10): string[] {
  const usWords = words(usText.slice(0, 12000));
  const ukWords = words(ukText.slice(0, 12000));
  const shared: string[] = [];
  const maxLen = Math.min(16, usWords.length, ukWords.length);
  for (let len = minLen; len <= maxLen; len++) {
    const usPhrases = new Map<string, number>();
    for (let i = 0; i <= usWords.length - len; i++) {
      usPhrases.set(usWords.slice(i, i + len).join(' '), i);
    }
    for (let i = 0; i <= ukWords.length - len && shared.length < maxPhrases; i++) {
      const phrase = ukWords.slice(i, i + len).join(' ');
      if (usPhrases.has(phrase)) shared.push(phrase);
    }
  }
  return [...new Set(shared)].slice(0, maxPhrases);
}

type StorySection = {
  id: string;
  title?: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: { title: string; body: string }[];
};

function storyText(s: StorySection): string {
  const parts: string[] = [];
  if (s.title) parts.push(s.title);
  if (s.lead) parts.push(s.lead);
  if (s.footer) parts.push(s.footer);
  if (s.bullets) parts.push(...s.bullets);
  if (s.paragraphs) parts.push(...s.paragraphs);
  if (s.items) parts.push(...s.items.flatMap((i) => [i.title, i.body]));
  return parts.join('\n');
}

function getStorySections(data: Json): StorySection[] {
  const dummy = data.dummy as Json | undefined;
  if (dummy?.storySections && Array.isArray(dummy.storySections)) {
    return dummy.storySections as StorySection[];
  }
  if (data.storySections && Array.isArray(data.storySections)) {
    return data.storySections as StorySection[];
  }
  const fa = data.followersAuthority as Json | undefined;
  if (fa?.storySections && Array.isArray(fa.storySections)) {
    return fa.storySections as StorySection[];
  }
  return [];
}

function extractLongForm(data: Json): string {
  const parts: string[] = [];
  const story = getStorySections(data);
  parts.push(...story.map(storyText));

  const content = (data.content ?? data) as Json;
  for (const key of ['benefits', 'whyNovaLikes', 'whyBuy', 'whyChoose', 'canYouBuy', 'doesBuyingHelp', 'whatHappens', 'beforeBuying', 'serviceCompare', 'quickAnswer']) {
    if (content[key]) parts.push(collectStrings(content[key]).join('\n'));
  }
  const dummy = data.dummy as Json | undefined;
  if (dummy) {
    for (const key of ['whyBuy', 'quickAnswer', 'whyChoose', 'canYouBuy', 'doesBuyingHelp', 'whatHappens', 'beforeBuying', 'serviceCompare']) {
      if (dummy[key]) parts.push(collectStrings(dummy[key]).join('\n'));
    }
  }
  return parts.join('\n');
}

function extractTransactional(data: Json): string {
  const content = (data.content ?? data) as Json;
  const parts: string[] = [];
  for (const key of ['hero', 'features', 'howItWorks', 'deliveryAndSafety', 'pricing', 'faq', 'finalCta', 'relatedServices', 'relatedIntro', 'packageSizes', 'worldwide']) {
    if (content[key]) parts.push(collectStrings(content[key]).join('\n'));
  }
  const dummy = data.dummy as Json | undefined;
  if (dummy) {
    for (const key of ['howToBuy', 'relatedIntro', 'quickAnswer']) {
      if (dummy[key]) parts.push(collectStrings(dummy[key]).join('\n'));
    }
  }
  if (data.howItWorks) parts.push(collectStrings(data.howItWorks).join('\n'));
  if (data.faq) parts.push(collectStrings(data.faq).join('\n'));
  return parts.join('\n');
}

function isFactualSection(id: string, title: string): boolean {
  const hay = `${id} ${title}`;
  return FACTUAL_SECTION_PATTERNS.some((p) => p.test(hay));
}

function matchStoryId(usId: string, ukId: string): boolean {
  if (usId === ukId) return true;
  if (usId === 'built-for-us' && ukId === 'built-for-uk') return true;
  if (usId === 'video-performance' && ukId === 'watch-behaviour') return true;
  return false;
}

function findUsCounterpart(ukId: string, usIds: string[]): string | null {
  if (usIds.includes(ukId)) return ukId;
  if (ukId === 'built-for-uk' && usIds.includes('built-for-us')) return 'built-for-us';
  if (ukId === 'watch-behaviour' && usIds.includes('video-performance')) return 'video-performance';
  return null;
}

function getBenefitsTitle(data: Json): string | null {
  const content = data.content as Json | undefined;
  const benefits = content?.benefits as Json | undefined;
  return (benefits?.title as string) ?? null;
}

function containsMarkers(data: Json, markers: string[]): boolean {
  const all = collectStrings(data).join('\n');
  return markers.every((m) => all.includes(m));
}

function identicalParagraphs(usText: string, ukText: string): string[] {
  const split = (t: string) =>
    t
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 40);
  const usPs = new Set(split(usText));
  return split(ukText).filter((p) => usPs.has(p));
}

function verdictFromMetrics(overall: number, story: number, concerning: number, factualHigh: number): string {
  if (concerning === 0 && story < 55) return 'STOP — sufficiently differentiated';
  if (concerning === 0 && story < 65) return 'MINOR — acceptable shared factual/transactional copy only';
  if (concerning <= 2 && story < 70) return 'REVIEW — one or two substantive blocks still worth considering';
  if (concerning >= 3 || story >= 70) return 'REWRITE NEEDED — meaningful long-form regional duplication remains';
  return 'REVIEW — one or two substantive blocks still worth considering';
}

console.log('=== US vs UK Content Differentiation Audit ===\n');

const tableRows: string[] = [];
const concerningRows: { route: string; section: string; sim: number; why: string; action: string }[] = [];

for (const pair of PAGE_PAIRS) {
  const usData = loadJson(pair.us);
  const ukData = loadJson(pair.uk);

  const usAll = collectStrings(usData).join('\n');
  const ukAll = collectStrings(ukData).join('\n');
  const overall = jaccard(tokenSet(usAll), tokenSet(ukAll));

  const usLong = extractLongForm(usData);
  const ukLong = extractLongForm(ukData);
  const storySim = jaccard(tokenSet(usLong), tokenSet(ukLong));

  const usStory = getStorySections(usData);
  const ukStory = getStorySections(ukData);
  const usIds = usStory.map((s) => s.id);
  const ukIds = ukStory.map((s) => s.id);

  const matchingPairs: { usId: string; ukId: string; sim: number; factual: boolean }[] = [];
  for (const uk of ukStory) {
    const usId = findUsCounterpart(uk.id, usIds);
    if (!usId) continue;
    const us = usStory.find((s) => s.id === usId)!;
    const sim = jaccard(tokenSet(storyText(us)), tokenSet(storyText(uk)));
    matchingPairs.push({
      usId,
      ukId: uk.id,
      sim,
      factual: isFactualSection(uk.id, uk.title ?? ''),
    });
  }

  const highNonFactual = matchingPairs.filter((p) => p.sim >= 0.55 && !p.factual);
  const phrases20 = sharedPhrases(usLong, ukLong, 20);
  const phrases8 = sharedPhrases(usLong, ukLong, 8);
  const identicalPs = identicalParagraphs(usLong, ukLong);

  for (const p of matchingPairs) {
    if (p.sim >= 0.55 && !p.factual) {
      const phrases = sharedPhrases(
        storyText(usStory.find((s) => s.id === p.usId)!),
        storyText(ukStory.find((s) => s.id === p.ukId)!),
        12,
        3,
      );
      concerningRows.push({
        route: pair.label,
        section: `${p.ukId} (vs ${p.usId})`,
        sim: p.sim,
        why: phrases.length
          ? `Substantive overlap; shared phrase example: "${phrases[0]?.slice(0, 80)}..."`
          : 'High token similarity in explanatory story section',
        action: p.sim >= 0.65 ? 'Consider targeted rewrite if market positioning still reads inherited' : 'Monitor; may be acceptable if examples/structure differ on read',
      });
    }
  }

  // Dedupe concerning by filtering low-sim after manual thresholds
  const mainOverlap =
    highNonFactual.length > 0
      ? `${highNonFactual.length} story pair(s) >55% (${highNonFactual.map((p) => `${p.ukId} ${(p.sim * 100).toFixed(0)}%`).join(', ')})`
      : phrases20.length > 0
        ? `Shared 20+ word phrases (${phrases20.length}); mostly factual/transactional`
        : phrases8.length > 0
          ? `Minor shared terminology (${phrases8.length} x 8+ word phrases)`
          : 'Low substantive overlap';

  const verdict = verdictFromMetrics(overall, storySim, highNonFactual.filter((p) => p.sim >= 0.6).length, matchingPairs.filter((p) => p.factual && p.sim >= 0.5).length);

  tableRows.push(
    `| ${pair.label} | ${(overall * 100).toFixed(1)}% | ${(storySim * 100).toFixed(1)}% | ${mainOverlap} | ${verdict} |`,
  );

  console.log(`--- ${pair.label} ---`);
  console.log(`Overall similarity: ${(overall * 100).toFixed(1)}%`);
  console.log(`Story/long-form similarity: ${(storySim * 100).toFixed(1)}%`);
  console.log(`US storySections: ${usStory.length}, UK storySections: ${ukStory.length}`);
  console.log(`Matching section pairs: ${matchingPairs.length}`);
  console.log(
    `Matching similarities: ${matchingPairs.map((p) => `${p.ukId}=${(p.sim * 100).toFixed(1)}%${p.factual ? '(factual)' : ''}`).join(', ')}`,
  );
  if (phrases20.length) console.log(`Shared 20+ word phrases (sample): ${phrases20.slice(0, 3).join(' | ')}`);
  if (identicalPs.length) console.log(`Identical paragraphs: ${identicalPs.length}`);
  const markers = DIFFERENTIATION_MARKERS[pair.label];
  if (markers) console.log(`Batch markers present: ${containsMarkers(ukData, markers) ? 'YES' : 'NO'}`);
  console.log(`Verdict: ${verdict}\n`);
}

console.log('\n=== TABLE 1 ===');
console.log('| Page Pair | Overall Current Similarity | Story/Long-form Similarity | Main Remaining Overlap | Verdict |');
console.log('| --------- | -------------------------: | -------------------------: | ---------------------- | ------- |');
for (const row of tableRows) console.log(row);

console.log('\n=== BATCH 2 BENEFITS CHECK ===');
for (const [label, expected] of Object.entries(BATCH2_BENEFITS)) {
  const pair = PAGE_PAIRS.find((p) => p.label === label)!;
  const usTitle = getBenefitsTitle(loadJson(pair.us));
  const ukTitle = getBenefitsTitle(loadJson(pair.uk));
  const diff = usTitle !== ukTitle;
  console.log(`${label}: US="${usTitle}" | UK="${ukTitle}" | differentiated=${diff ? 'YES' : 'NO'}`);
}

console.log('\n=== DIFFERENTIATION WORK PRESENCE ===');
for (const [label, markers] of Object.entries(DIFFERENTIATION_MARKERS)) {
  const pair = PAGE_PAIRS.find((p) => p.label === label)!;
  const present = containsMarkers(loadJson(pair.uk), markers);
  console.log(`${label}: ${present ? 'PRESENT' : 'MISSING/UNCLEAR'}`);
}

// Filter concerning rows - remove duplicates and low priority
const filtered = concerningRows.filter((r) => r.sim >= 0.58);
console.log('\n=== TABLE 2 (concerning sections, sim >= 58%) ===');
if (filtered.length === 0) {
  console.log('No further substantive US/UK content differentiation is recommended.');
} else {
  console.log('| Route Pair | Section ID / Field | Similarity | Why It Is Still a Problem | Recommended Action |');
  console.log('| ---------- | ------------------ | ---------: | ------------------------- | ------------------ |');
  for (const r of filtered.sort((a, b) => b.sim - a.sim)) {
    console.log(`| ${r.route} | ${r.section} | ${(r.sim * 100).toFixed(1)}% | ${r.why} | ${r.action} |`);
  }
}
