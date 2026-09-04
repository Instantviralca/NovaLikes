import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU1_IDS = [
  'build-videos',
  'real-experience',
  'brand-partnerships',
  'video-growth-framework',
] as const;

const UNTOUCHED_IDS = [
  'built-for-australia',
  'visible-momentum',
  'campaign-moments',
  'fyp-reach',
  'profile-experience',
  'local-businesses',
  'creator-rewards',
  'platform-rules',
  'hq-premium',
] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'built-for-australia': 'Built for Australian Creators, Businesses and Brands',
  'visible-momentum': 'Use Visible Momentum Around the Videos That Matter Most',
  'campaign-moments': 'Put TikTok Views Behind Important Australian Campaign Moments',
  'fyp-reach': 'TikTok Views and For You Page Reach Are Different Things',
  'profile-experience': 'Turn Video Views Into a Better TikTok Profile Experience',
  'local-businesses': 'TikTok Views for Australian Local Businesses',
  'creator-rewards': 'Purchased Views and Creator Rewards Are Not the Same Thing',
  'platform-rules': "Understand TikTok's Rules Around Artificial Engagement",
  'hq-premium': 'High Quality or Premium TikTok Views: Choose From the Current Package Options',
};

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

const EXPECTED: Record<(typeof BATCH_AU1_IDS)[number], Partial<StorySection>> = {
  'build-videos': {
    title: 'Build TikToks That Give Australian Viewers a Reason to Keep Watching',
    lead: 'If TikTok is an ongoing channel for the account, treat the View count as one part of the video rather than the strategy itself. The creative still has to earn attention from real people.',
    footer:
      'Purchased Views change the displayed number. Genuine watch behaviour should guide how you improve the next Australian TikTok you publish.',
    items: [
      {
        title: 'Make the Opening Easy to Understand',
        body: 'Show the subject early enough that someone scrolling quickly can understand what the video is about without waiting through a long introduction.',
      },
      {
        title: 'Bring the Useful Part Forward',
        body: 'If the video contains a demonstration, result, offer, answer or transformation, avoid hiding the main value behind unnecessary setup.',
      },
      {
        title: 'Give Each TikTok One Clear Direction',
        body: 'A focused short-form video is easier to follow than content trying to explain several unrelated ideas at the same time.',
      },
      {
        title: 'Use the Format to Show, Not Just Tell',
        body: 'Products, places, projects, services and experiences often make more sense when viewers can actually see what is being discussed.',
      },
      {
        title: 'Keep On-Screen Text Practical',
        body: 'Use text to clarify the idea, price, location, step or context where useful without covering important parts of the video.',
      },
      {
        title: 'Develop Formats the Account Can Repeat',
        body: 'If genuine viewers respond well to walkthroughs, comparisons, demonstrations, explainers or another format, build more content around that pattern.',
      },
      {
        title: 'Use Real Performance to Decide What Comes Next',
        body: 'Review genuine TikTok analytics to understand which topics, openings and video structures actually hold audience attention.',
      },
    ],
  },
  'real-experience': {
    title: 'Use TikTok Views Around Content Based on Work You Can Actually Show',
    lead: 'Australian creators and businesses can make stronger short-form content when the video starts with real products, projects, places, knowledge or first-hand experience.',
    footer:
      'Views can support the visible presentation of a TikTok. Genuine experience gives the video substance beyond the number shown underneath it.',
    items: [
      {
        title: 'Document Real Projects',
        body: 'Show completed work, transformations or results the business or creator can genuinely stand behind.',
      },
      {
        title: 'Demonstrate Products Properly',
        body: 'Let viewers see how a real product looks, works, fits or is used when that visual information helps them understand it.',
      },
      {
        title: 'Explain Processes You Know First-Hand',
        body: 'Turn genuine professional or practical knowledge into clear videos that answer questions people may actually have.',
      },
      {
        title: 'Use Customer Questions as Video Ideas',
        body: 'Recurring enquiries about services, products, delivery, bookings or processes can reveal useful subjects for future TikToks.',
      },
      {
        title: 'Show the People and Places Behind the Work',
        body: 'Relevant workplaces, teams, locations and behind-the-scenes activity can help viewers understand the real operation behind the account.',
      },
      {
        title: 'Share What You Have Learned Yourself',
        body: 'First-hand observations can make a TikTok more useful than repeating general advice already common across similar accounts.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Australian Brands More to Assess Than a Public TikTok View Count',
    paragraphs: [
      'A creator may want stronger visible View numbers when presenting a TikTok profile professionally, but an Australian brand or agency can evaluate much more than the number displayed on one video.',
      'A partnership review may consider creator positioning, audience relevance, video quality, genuine watch behaviour, authentic engagement, consistency, previous collaborations, communication, campaign fit and whether the creator can provide reliable performance information.',
      'If brand work matters to the account, prepare for that wider assessment. Keep the niche easy to understand, publish videos you would be comfortable including in a media kit or campaign discussion and use genuine analytics when a potential partner needs evidence of real audience performance.',
    ],
  },
  'video-growth-framework': {
    title: 'A Practical TikTok Video Plan for Australian Accounts',
    lead: 'Views can support selected videos, but a stronger Australian TikTok presence comes from knowing which content deserves attention, learning from genuine viewers and improving what the account publishes next.',
    footer:
      'Keep purchased Views in perspective as one visible video metric. Longer-term TikTok value comes from stronger content, clear positioning and genuine audience response.',
    items: [
      {
        title: 'Decide What the Account Should Be Known For',
        body: 'Make the creator niche, business category or recurring content direction clear enough for a new Australian viewer to understand quickly.',
      },
      {
        title: 'Choose Which Videos Actually Matter',
        body: 'Separate normal publishing from product launches, evergreen explainers, demonstrations, campaign videos and other content that has a specific reason to receive more attention.',
      },
      {
        title: 'Improve the First Few Moments',
        body: 'Test different ways to communicate the subject early so genuine viewers can understand why continuing to watch may be worthwhile.',
      },
      {
        title: 'Turn Strong Ideas Into Repeatable Formats',
        body: 'When demonstrations, walkthroughs, comparisons, explainers or another format performs genuinely well, develop additional videos around the idea.',
      },
      {
        title: 'Review Genuine TikTok Analytics',
        body: 'Use actual account performance to understand which videos earn real attention, interaction and meaningful watch behaviour.',
      },
      {
        title: 'Learn From Real Questions and Comments',
        body: 'Genuine audience questions can reveal confusion, interests and topics that deserve clearer or more detailed future content.',
      },
      {
        title: 'Build the Profile Behind Every Priority Video',
        body: 'Make sure someone who becomes interested in one TikTok can find other relevant videos when they explore the wider account.',
      },
      {
        title: 'Connect TikTok With the Wider Australian Customer Journey',
        body: 'Businesses may use TikTok alongside Instagram, ecommerce, search visibility, paid advertising, email, their website and other channels that help customers research or buy.',
      },
      {
        title: 'Measure Purchased Views Separately',
        body: 'Use the public View count for the metric it provides while evaluating genuine video performance, organic audience activity and business outcomes independently.',
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

const auPath = 'content/markets/au/services/buy-tiktok-views.json';
const usPath = 'content/markets/us/services/buy-tiktok-views.json';
const ukPath = 'content/markets/uk/services/buy-tiktok-views.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-tt-views-before-batch-au1.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (4 sections) ===');
for (const id of BATCH_AU1_IDS) {
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

function reportPair(label: string, auList: StorySection[], otherList: StorySection[]) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU1_IDS) {
    const au = auList.find((s) => s.id === id)!;
    const other = otherList.find((s) => s.id === id)!;
    const after = jaccard(tokenSet(sectionText(au)), tokenSet(sectionText(other)));
    let line = `${id}: ${(after * 100).toFixed(1)}%`;
    if (auBeforeSections) {
      const auOld = auBeforeSections.find((s) => s.id === id);
      if (auOld) {
        const before = jaccard(tokenSet(sectionText(auOld)), tokenSet(sectionText(other)));
        line += ` (was ${(before * 100).toFixed(1)}%)`;
      }
    }
    console.log(line);
  }
}

reportPair('AU vs US similarity (4 targeted sections)', auSections, usSections);
reportPair('AU vs UK similarity (4 targeted sections)', auSections, ukSections);

function combinedText(sections: StorySection[], ids: readonly string[]): string {
  return ids.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

const auCombined = combinedText(auSections, BATCH_AU1_IDS);
const usCombined = combinedText(usSections, BATCH_AU1_IDS);
const ukCombined = combinedText(ukSections, BATCH_AU1_IDS);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auCombined), tokenSet(usCombined));
const auUkAfter = jaccard(tokenSet(auCombined), tokenSet(ukCombined));
let usLine = `AU vs US After: ${(auUsAfter * 100).toFixed(1)}%`;
let ukLine = `AU vs UK After: ${(auUkAfter * 100).toFixed(1)}%`;
if (auBeforeSections) {
  const auBeforeCombined = combinedText(auBeforeSections, BATCH_AU1_IDS);
  usLine = `AU vs US Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(usCombined)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`;
  ukLine = `AU vs UK Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(ukCombined)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`;
}
console.log(usLine);
console.log(ukLine);

console.log('\n=== Shared 8+ word phrases (AU vs US, 4 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU1_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === id)!;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 8);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases.slice(0, 5)) console.log(`  - "${p}"`);
    p8 = p8.concat(phrases);
  }
}
if (p8.length === 0) console.log('None');

console.log('\n=== Shared 20+ word phrases (AU vs US, 4 pairs) ===');
let p20: string[] = [];
for (const id of BATCH_AU1_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === id)!;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 20);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases) console.log(`  - "${p}"`);
    p20 = p20.concat(phrases);
  }
}
if (p20.length === 0) console.log('None');

console.log(`\n${pass}/4 exact-copy checks passed`);
process.exit(pass === 4 ? 0 : 1);
