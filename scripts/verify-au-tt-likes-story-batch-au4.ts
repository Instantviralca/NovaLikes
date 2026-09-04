import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU4_IDS = [
  'built-for-australia',
  'strong-content',
  'content-engagement',
  'local-businesses',
  'real-experience',
  'brand-partnerships',
  'engagement-framework',
] as const;

const US_PAIR: Record<(typeof BATCH_AU4_IDS)[number], string | null> = {
  'built-for-australia': 'built-for-us',
  'strong-content': 'strong-content',
  'content-engagement': 'content-engagement',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
  'brand-partnerships': 'brand-partnerships',
  'engagement-framework': null,
};

const UK_PAIR: Record<(typeof BATCH_AU4_IDS)[number], string> = {
  'built-for-australia': 'built-for-uk',
  'strong-content': 'strong-content',
  'content-engagement': 'content-engagement',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
  'brand-partnerships': 'brand-partnerships',
  'engagement-framework': 'engagement-framework',
};

const UNTOUCHED_IDS = [
  'campaign-moments',
  'likes-reach',
  'likes-views-context',
  'platform-rules',
] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-moments': 'Use TikTok Likes Around Important Australian Campaign Moments',
  'likes-reach': 'Likes and TikTok Reach Are Different Signals',
  'likes-views-context': 'Put Likes in Context With Views',
  'platform-rules': "Understand TikTok's Rules Around Artificial Engagement",
};

const STRONG_CONTENT_BULLETS = [
  'Views',
  'Comments',
  'Shares',
  'creator profile',
  'caption',
  'content quality',
  'overall account activity',
];

type StoryItem = { title: string; body: string };
type StorySection = {
  id: string;
  title: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: StoryItem[];
};

const EXPECTED: Record<(typeof BATCH_AU4_IDS)[number], Partial<StorySection>> = {
  'built-for-australia': {
    title: 'Choose TikTok Likes Around the Australian Videos You Actually Want to Support',
    lead: 'TikTok Likes apply to individual videos, so the right quantity depends on the content, the account behind it and why that particular video matters.',
    paragraphs: [
      'An Australian creator may have a tutorial, opinion, collaboration or series episode that represents the account particularly well. An ecommerce business may want more visible engagement around a product demonstration or launch. A local company may publish work, services or an experience that potential customers can actually inspect. Agencies may manage several client accounts where each video has a different campaign role.',
      'Start with the video rather than choosing Likes in isolation. Look at the subject, existing Views, account context and purpose of the post before deciding which content deserves more visible engagement.',
    ],
    footer:
      'Likes can support how active a TikTok appears. The video itself still needs to give real viewers something useful, interesting or relevant to respond to.',
    items: [
      {
        title: 'Australian Creators',
        body: "Support videos that clearly represent the creator's niche, recurring format, expertise or current content direction.",
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Use Likes around genuine product demonstrations, launches and campaign videos connected to items customers can actually research or buy.',
      },
      {
        title: 'Local Businesses',
        body: 'Support TikToks showing real services, projects, products, locations or experiences that potential customers may want to understand.',
      },
      {
        title: 'Agencies and Client Campaigns',
        body: 'Choose quantities according to the purpose and existing performance of each client video rather than applying one standard engagement number.',
      },
      {
        title: 'Established Brands',
        body: 'Put visible engagement behind selected priority content while genuine publishing, advertising and audience activity continue separately.',
      },
    ],
  },
  'strong-content': {
    title: 'Use TikTok Likes to Support a Strong Video, Not to Replace One',
    lead: 'A Like count is visible beside the content, but real viewers still judge the video itself before deciding whether it deserves their attention.',
    bullets: STRONG_CONTENT_BULLETS,
    paragraphs: [
      'A stronger Like number can make a TikTok appear more active when someone encounters it, but that first impression works best when the creative has a clear subject and the account behind it makes sense.',
      "Use purchased Likes for the visible metric they provide. Keep the video's idea, execution and relevance as separate parts of the content strategy.",
    ],
    footer:
      'Likes can strengthen visible engagement. The quality and purpose of the TikTok determine what a genuine viewer finds behind that number.',
  },
  'content-engagement': {
    title: 'Create TikToks That Give Genuine Viewers a Reason to React',
    lead: 'If engagement matters beyond the public Like count, keep improving the parts of the video that real people actually experience.',
    footer:
      'Purchased Likes change one visible metric. Genuine audience response should guide what the account improves and publishes next.',
    items: [
      {
        title: 'Make the Topic Obvious Early',
        body: 'Help someone understand the subject quickly instead of making them wait through a long setup before the video becomes clear.',
      },
      {
        title: 'Show the Main Value Sooner',
        body: 'Bring useful information, the product, result, demonstration or main idea forward when that is what viewers came to see.',
      },
      {
        title: 'Use Visuals That Explain the Point',
        body: 'Show products, projects, places, processes or examples where seeing them communicates more effectively than description alone.',
      },
      {
        title: 'Build Formats the Account Can Repeat',
        body: 'When a genuine tutorial, comparison, transformation, demonstration or series format performs well, develop additional content around it.',
      },
      {
        title: 'Keep the Video Connected to the Account',
        body: 'The subject should make sense beside the creator niche, business or brand someone finds if they open the wider profile.',
      },
      {
        title: 'Use Genuine Interaction as Research',
        body: 'Real Comments, questions and audience responses can reveal which topics need another video, clearer explanation or a different approach.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use TikTok Likes Around Videos That Show a Real Australian Business',
    paragraphs: [
      'Short-form video can help a local business show customers something they cannot learn from a business name alone. A restaurant can show a dish or venue. A builder can document completed work. A salon may demonstrate a treatment or result. A retailer can show new stock. A property business may feature a listing. Tourism and hospitality businesses can present real destinations, accommodation or experiences. Trades and professional services can explain how their work is carried out.',
      'If you add Likes to this type of TikTok, keep the content connected to the genuine business. Locations, services, products, availability and public information should still match what customers find on the website, Google presence and other official channels.',
    ],
    footer:
      'Visible engagement can support presentation of the video. Local trust comes from the real business and what customers can verify behind the content.',
  },
  'real-experience': {
    title: 'Build TikTok Engagement Around Experience the Account Can Actually Demonstrate',
    lead: 'Videos become more useful when creators and businesses can show genuine work, knowledge, products or first-hand observations instead of repeating generic content.',
    footer:
      'Likes can support visible engagement around these TikToks. Genuine experience gives the audience something more meaningful to respond to.',
    items: [
      {
        title: 'Show Genuine Work and Results',
        body: 'Use real projects, transformations and completed work that the business or creator can accurately explain.',
      },
      {
        title: 'Demonstrate Products in Context',
        body: 'Show how a real product looks, works or is used when that information helps viewers understand it.',
      },
      {
        title: 'Explain Processes From Experience',
        body: 'Turn first-hand professional or practical knowledge into videos that answer questions people genuinely have.',
      },
      {
        title: 'Use Customer Questions as Content Ideas',
        body: 'Recurring enquiries about services, products, bookings or processes can reveal useful subjects for future TikToks.',
      },
      {
        title: 'Share an Original Point of View',
        body: 'A perspective based on genuine experience can give real viewers more to react to than advice copied across similar accounts.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Australian Brands More to Evaluate Than the TikTok Like Count',
    paragraphs: [
      'A creator may want stronger visible engagement when preparing a profile for collaborations, but an Australian brand or agency can assess much more than the Like number shown on selected videos.',
      'A professional partnership review may include creator positioning, audience relevance, content quality, genuine Views, authentic engagement, consistency, previous collaborations, communication, campaign suitability and reliable performance information.',
      'If partnerships matter, prepare the entire account for that review. Keep the niche clear, publish work you would be comfortable showing to a potential partner and use genuine analytics when real audience performance needs to be demonstrated. Do not present purchased Likes by themselves as proof of influence.',
    ],
  },
  'engagement-framework': {
    title: 'A Practical TikTok Engagement Plan for Australian Accounts',
    lead: 'Likes can support selected TikToks, but a stronger account comes from choosing the right videos, understanding genuine viewers and improving the content around real performance.',
    footer:
      'Keep purchased Likes in perspective as one visible engagement metric. Longer-term TikTok growth depends on content quality, clear positioning and genuine audience behaviour.',
    items: [
      {
        title: 'Decide What the Account Should Represent',
        body: 'Make the creator niche, business category or recurring content direction easy for a new viewer to understand.',
      },
      {
        title: 'Choose Priority Videos Deliberately',
        body: 'Identify launches, demonstrations, evergreen explainers, collaborations and other TikToks that have a specific reason to receive additional attention.',
      },
      {
        title: 'Test Formats With Genuine Viewers',
        body: 'Use demonstrations, comparisons, tutorials, transformations and other formats to learn what real people actually respond to.',
      },
      {
        title: 'Review Genuine TikTok Performance',
        body: 'Use actual account analytics to understand which videos earn real Views, interaction and useful audience behaviour.',
      },
      {
        title: 'Learn From Authentic Questions',
        body: 'Real Comments and audience questions can reveal topics that deserve clearer, deeper or follow-up content.',
      },
      {
        title: 'Strengthen the Profile Behind Each Video',
        body: 'Make sure someone interested in one TikTok can find more relevant content after opening the wider account.',
      },
      {
        title: 'Connect TikTok With the Wider Australian Customer Journey',
        body: 'Businesses may use TikTok alongside Instagram, ecommerce, their website, Google visibility, search, paid advertising and email.',
      },
      {
        title: 'Measure Purchased Likes Separately',
        body: 'Use Likes for the visible metric they provide while evaluating organic engagement, audience growth and commercial outcomes independently.',
      },
    ],
  },
};

function loadStorySections(path: string): StorySection[] {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    dummy?: { storySections?: StorySection[] };
  };
  return raw.dummy?.storySections ?? [];
}

function loadUsEngagementFrameworkProxy(path: string): StorySection {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    dummy?: {
      config?: {
        worldwide?: {
          title?: string;
          description?: string;
          closingNote?: string;
          cards?: { title: string; description: string }[];
        };
      };
    };
  };
  const w = raw.dummy?.config?.worldwide;
  if (!w) throw new Error('US dummy.config.worldwide block missing');
  return {
    id: 'engagement-framework-us-proxy',
    title: w.title ?? '',
    lead: w.description ?? '',
    footer: w.closingNote ?? '',
    items: (w.cards ?? []).map((c) => ({ title: c.title, body: c.description })),
  };
}

function sectionText(s: StorySection): string {
  const parts = [s.title];
  if (s.lead) parts.push(s.lead);
  if (s.footer) parts.push(s.footer);
  if (s.paragraphs) parts.push(...s.paragraphs);
  if (s.items) parts.push(...s.items.flatMap((i) => [i.title, i.body]));
  return parts.join('\n');
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 1 : inter / union;
}

function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
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

function compareSection(actual: StorySection, exp: Partial<StorySection>, id: string): boolean {
  let ok = true;
  if (actual.title !== exp.title) {
    console.error(`FAIL ${id} title`);
    ok = false;
  }
  if (exp.lead !== undefined && actual.lead !== exp.lead) {
    console.error(`FAIL ${id} lead`);
    ok = false;
  }
  if (exp.footer !== undefined && actual.footer !== exp.footer) {
    console.error(`FAIL ${id} footer`);
    ok = false;
  }
  if (exp.bullets && JSON.stringify(actual.bullets) !== JSON.stringify(exp.bullets)) {
    console.error(`FAIL ${id} bullets`);
    ok = false;
  }
  if (exp.paragraphs && JSON.stringify(actual.paragraphs) !== JSON.stringify(exp.paragraphs)) {
    console.error(`FAIL ${id} paragraphs`);
    ok = false;
  }
  if (id === 'brand-partnerships' && actual.footer !== undefined) {
    console.error('FAIL brand-partnerships has footer (should be absent)');
    ok = false;
  }
  if (exp.items) {
    if ((actual.items?.length ?? 0) !== exp.items.length) {
      console.error(`FAIL ${id} item count`);
      ok = false;
    }
    for (let i = 0; i < exp.items.length; i++) {
      if (actual.items?.[i]?.title !== exp.items[i]?.title) {
        console.error(`FAIL ${id} item[${i}] title`);
        ok = false;
      }
      if (actual.items?.[i]?.body !== exp.items[i]?.body) {
        console.error(`FAIL ${id} item[${i}] body`);
        ok = false;
      }
    }
  }
  if (ok) console.log(`OK ${id}`);
  return ok;
}

const auPath = 'content/markets/au/services/buy-tiktok-likes.json';
const usPath = 'content/markets/us/services/buy-tiktok-likes.json';
const ukPath = 'content/markets/uk/services/buy-tiktok-likes.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);
const usFrameworkProxy = loadUsEngagementFrameworkProxy(usPath);

const snapshotPath = join(tmpdir(), 'au-tt-likes-before-batch-au4.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (7 sections) ===');
for (const id of BATCH_AU4_IDS) {
  const actual = auSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = auSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function resolveOther(
  id: (typeof BATCH_AU4_IDS)[number],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU4_IDS)[number], string | null>,
  usProxy?: StorySection,
): StorySection {
  if (id === 'engagement-framework' && pairMap[id] === null && usProxy) return usProxy;
  const otherId = pairMap[id]!;
  const found = otherList.find((s) => s.id === otherId);
  if (!found) throw new Error(`Missing ${otherId}`);
  return found;
}

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU4_IDS)[number], string | null>,
  auBeforeList: StorySection[] | null,
  usProxy?: StorySection,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU4_IDS) {
    const au = auList.find((s) => s.id === id)!;
    const other = resolveOther(id, otherList, pairMap, usProxy);
    const otherLabel =
      id === 'engagement-framework' && pairMap[id] === null
        ? 'dummy.config.worldwide (US proxy)'
        : pairMap[id] ?? id;
    const after = jaccard(tokenSet(sectionText(au)), tokenSet(sectionText(other)));
    let line = `${id}↔${otherLabel}: ${(after * 100).toFixed(1)}%`;
    if (auBeforeList) {
      const auOld = auBeforeList.find((s) => s.id === id);
      if (auOld) {
        const before = jaccard(tokenSet(sectionText(auOld)), tokenSet(sectionText(other)));
        line += ` (was ${(before * 100).toFixed(1)}%)`;
      }
    }
    console.log(line);
  }
}

reportPair('AU vs US similarity (7 targeted sections)', auSections, usSections, US_PAIR, auBeforeSections, usFrameworkProxy);
reportPair('AU vs UK similarity (7 targeted sections)', auSections, ukSections, UK_PAIR, auBeforeSections);

function combinedAu(sections: StorySection[]): string {
  return BATCH_AU4_IDS.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function combinedOther(
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU4_IDS)[number], string | null>,
  usProxy?: StorySection,
): string {
  return BATCH_AU4_IDS.map((id) =>
    sectionText(resolveOther(id, otherList, pairMap, usProxy)),
  ).join('\n');
}

const auCombined = combinedAu(auSections);
const usCombined = combinedOther(usSections, US_PAIR, usFrameworkProxy);
const ukCombined = combinedOther(ukSections, UK_PAIR);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auCombined), tokenSet(usCombined));
const auUkAfter = jaccard(tokenSet(auCombined), tokenSet(ukCombined));
let usLine = `AU vs US After: ${(auUsAfter * 100).toFixed(1)}%`;
let ukLine = `AU vs UK After: ${(auUkAfter * 100).toFixed(1)}%`;
if (auBeforeSections) {
  const auBeforeCombined = combinedAu(auBeforeSections);
  usLine = `AU vs US Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(usCombined)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`;
  ukLine = `AU vs UK Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(ukCombined)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`;
}
console.log(usLine);
console.log(ukLine);
console.log('Note: US has no story-section engagement-framework; compared via dummy.config.worldwide proxy.');

console.log('\n=== Shared 8+ word phrases (AU vs US, 7 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU4_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = resolveOther(id, usSections, US_PAIR, usFrameworkProxy);
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 8);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases.slice(0, 5)) console.log(`  - "${p}"`);
    p8 = p8.concat(phrases);
  }
}
if (p8.length === 0) console.log('None');

console.log('\n=== Shared 20+ word phrases (AU vs US, 7 pairs) ===');
let p20: string[] = [];
for (const id of BATCH_AU4_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = resolveOther(id, usSections, US_PAIR, usFrameworkProxy);
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 20);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases) console.log(`  - "${p}"`);
    p20 = p20.concat(phrases);
  }
}
if (p20.length === 0) console.log('None');

console.log(`\n${pass}/7 exact-copy checks passed`);
process.exit(pass === 7 ? 0 : 1);
