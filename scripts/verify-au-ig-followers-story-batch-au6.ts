import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU6_IDS = [
  'first-impression',
  'better-profile',
  'content-worth-following',
  'brand-partnerships',
  'customer-proof',
  'measure-growth',
  'growth-framework',
] as const;

const US_PAIR: Record<(typeof BATCH_AU6_IDS)[number], string> = {
  'first-impression': 'first-impression',
  'better-profile': 'better-profile',
  'content-worth-following': 'content-worth-following',
  'brand-partnerships': 'brand-partnerships',
  'customer-proof': 'customer-proof',
  'measure-growth': 'measure-growth',
  'growth-framework': 'growth-framework',
};

const UK_PAIR = US_PAIR;

const UNTOUCHED_IDS = ['business-moments', 'reach-context', 'local-businesses'] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'business-moments': 'Use Follower Growth Around the Right Business Moments',
  'reach-context': "More Followers Don't Automatically Mean More Reach",
  'local-businesses': 'Instagram Followers for Australian Local Businesses',
};

const FIRST_IMPRESSION_BULLETS = [
  'your profile photo',
  'bio',
  'recent posts',
  'Reels',
  'pinned content',
  'highlights',
  'follower and following counts',
  'visible engagement',
  'overall visual consistency',
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

const EXPECTED: Record<(typeof BATCH_AU6_IDS)[number], Partial<StorySection>> = {
  'first-impression': {
    title: 'Make the Instagram Profile Worth Checking Beyond the Follower Number',
    lead: 'Follower count can influence the first impression of an Instagram profile, but an Australian visitor can quickly look at the rest of the account before deciding what that number means in context.',
    bullets: FIRST_IMPRESSION_BULLETS,
    paragraphs: [
      'A stronger visible audience can make a profile appear more established, but the bio, recent content, pinned posts, Highlights and visible activity still need to support the account someone has just discovered.',
      'For a creator, make the niche and point of view easy to recognise. For an Australian business, help visitors understand what you offer, where you operate and how to take the next step. For a brand, make sure the profile reflects the same identity customers find across your other official channels.',
    ],
    footer:
      'Followers can strengthen one visible profile signal. The rest of the Instagram account determines what a visitor finds behind that number.',
  },
  'better-profile': {
    title: 'Improve the Instagram Profile Before Putting More Attention Behind It',
    lead: 'A larger follower count works better when new visitors can quickly understand the account, find useful content and see a clear reason to keep exploring.',
    footer:
      'Follower growth can support profile presentation. A clear, current and useful account gives that visible audience number better context.',
    items: [
      {
        title: 'Explain the Account Clearly in the Bio',
        body: 'Make the creator niche, business offer or brand purpose understandable without forcing new visitors to work it out from several posts.',
      },
      {
        title: 'Use Pinned Content as an Introduction',
        body: 'Keep important posts or Reels visible when they help explain the account, current offer, strongest work or content direction.',
      },
      {
        title: 'Give the Feed a Recognisable Direction',
        body: 'Build enough consistency in subjects and formats that someone can understand what they are likely to see if they follow.',
      },
      {
        title: 'Keep the Profile Connected to Current Activity',
        body: 'Recent relevant content gives visitors stronger context than an audience number sitting beside an account that appears inactive.',
      },
      {
        title: 'Make the Business Next Step Easy to Find',
        body: 'If Instagram supports a commercial goal, help interested Australian customers understand how to visit the website, enquire, shop, book or contact the business.',
      },
    ],
  },
  'content-worth-following': {
    title: 'Give Genuine People a Reason to Follow After They Find the Account',
    lead: 'Purchased Followers can change the displayed audience number, but they cannot create the ongoing content that makes a real person choose to stay connected to the profile.',
    footer:
      'Use purchased Followers for the visible metric they provide. Let genuine audience behaviour show which content is actually worth developing further.',
    items: [
      {
        title: 'Reels With a Clear Purpose',
        body: 'Use short-form video to demonstrate, explain, entertain, compare or answer something relevant to the audience the account wants to reach.',
      },
      {
        title: 'Posts That Add Useful Context',
        body: 'Use carousels and feed posts for real projects, products, ideas, education and stories that give visitors more to explore.',
      },
      {
        title: 'A Recognisable Content Position',
        body: 'Make it clear why someone interested in one post should expect the rest of the account to remain relevant to them.',
      },
      {
        title: 'Real Community Responses',
        body: 'When genuine people ask useful questions or leave meaningful Comments, respond from the actual creator or business.',
      },
      {
        title: 'Decisions Based on Genuine Performance',
        body: 'Use real Instagram Insights to identify which topics, formats and posts earn authentic attention rather than judging content by follower count alone.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Australian Brands More to Assess Than the Instagram Follower Count',
    paragraphs: [
      'A creator may want a stronger visible audience when preparing an Instagram profile for collaborations, but an Australian brand or agency can evaluate much more than the follower number at the top of the account.',
      'A professional review may consider creator positioning, audience relevance, content quality, genuine engagement, previous partnerships, consistency, communication, campaign fit and reliable performance information.',
      'If brand work is part of the goal, prepare the whole profile for that assessment. Keep the niche clear, publish examples you would be comfortable showing to a potential partner and use genuine analytics when real audience performance needs to be demonstrated.',
    ],
    footer: 'Treat Followers as one visible profile metric rather than evidence of influence by themselves.',
  },
  'customer-proof': {
    title: 'Keep Instagram Follower Count Separate From Genuine Customer Evidence',
    paragraphs: [
      'A larger follower number may contribute to how established a business profile appears, but it does not show whether genuine customers have bought from, hired or recommended the company.',
      'Australian businesses may have stronger evidence through verified reviews, authentic testimonials, completed projects, genuine customer Comments, tagged content, case studies and consistent information across Instagram, the business website and other official profiles.',
      'Use that evidence where it genuinely exists. Do not invent testimonials or present purchased Followers as customer approval simply to strengthen the appearance of the account.',
    ],
    footer:
      'Followers support one visible audience metric. Genuine customer experience provides a different and more meaningful form of proof.',
  },
  'measure-growth': {
    title: 'Measure What Instagram Is Actually Doing Beyond the Public Follower Count',
    lead: 'Follower count shows the displayed size of the audience. Genuine account data and real business outcomes can tell you whether Instagram is creating useful attention.',
    footer:
      'Purchased Followers affect one visible metric. Use genuine Instagram and business data when making longer-term decisions about the account.',
    items: [
      {
        title: 'Which Posts Earn Real Attention?',
        body: 'Compare genuine performance across posts and Reels to see which subjects and formats people actually choose to watch or explore.',
      },
      {
        title: 'Are People Exploring the Profile?',
        body: 'Look at genuine profile activity to understand whether content creates enough interest for real users to investigate the wider account.',
      },
      {
        title: 'Where Does Authentic Interaction Happen?',
        body: 'Review genuine Comments, Shares, Saves and messages where available instead of treating the follower total as an engagement measure.',
      },
      {
        title: 'Is the Account Reaching Relevant People?',
        body: 'For creators and businesses, audience relevance can be more useful than simply trying to make the visible number as large as possible.',
      },
      {
        title: 'Is Instagram Contributing to the Real Objective?',
        body: 'For an Australian business, that may mean website activity, enquiries, bookings or sales. For a creator, it may mean authentic audience growth, opportunities or partnership interest.',
      },
    ],
  },
  'growth-framework': {
    title: 'A Practical Instagram Audience Plan for Australian Accounts',
    lead: 'Follower count can support profile presentation, but stronger Instagram growth comes from making the account clear, useful and worth returning to.',
    items: [
      {
        title: 'Define What the Account Should Be Known For',
        body: 'Make the creator niche, business category or brand position easy for a new visitor to understand.',
      },
      {
        title: 'Build Enough Content to Support the Profile',
        body: 'Give visitors several relevant posts and Reels to explore instead of depending on one strong piece of content.',
      },
      {
        title: 'Keep Important Profile Information Current',
        body: 'Review the bio, links, pinned posts and Highlights so they continue to reflect what the account actually represents.',
      },
      {
        title: 'Give Each Post a Reason to Exist',
        body: 'Publish with a specific purpose such as education, demonstration, proof, entertainment, product discovery or customer information.',
      },
      {
        title: 'Use Genuine Instagram Insights',
        body: 'Let real account performance show which subjects and formats deserve more attention in the future.',
      },
      {
        title: 'Treat Authentic Interaction as Useful Feedback',
        body: 'Real Comments and messages can reveal questions, interests and problems that should influence future content.',
      },
      {
        title: 'Connect Instagram With the Wider Australian Customer Journey',
        body: 'Businesses may use Instagram alongside their website, Google presence, search visibility, ecommerce, paid advertising, TikTok and email.',
      },
      {
        title: 'Measure Purchased Followers Separately',
        body: 'Use Followers for the displayed audience number they provide while evaluating organic growth, genuine engagement and business outcomes independently.',
      },
    ],
  },
};

function loadStorySections(path: string): StorySection[] {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    followersAuthority?: { storySections?: StorySection[] };
    dummy?: { storySections?: StorySection[] };
  };
  return raw.followersAuthority?.storySections ?? raw.dummy?.storySections ?? [];
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
  if (id === 'growth-framework' && actual.footer !== undefined) {
    console.error('FAIL growth-framework has footer (should be absent)');
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

const auPath = 'content/markets/au/services/buy-instagram-followers.json';
const usPath = 'content/markets/us/services/buy-instagram-followers.json';
const ukPath = 'content/markets/uk/services/buy-instagram-followers.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-ig-followers-before-batch-au6.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (7 sections) ===');
for (const id of BATCH_AU6_IDS) {
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

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU6_IDS)[number], string>,
  auBeforeList: StorySection[] | null,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU6_IDS) {
    const au = auList.find((s) => s.id === id)!;
    const otherId = pairMap[id];
    const other = otherList.find((s) => s.id === otherId)!;
    const after = jaccard(tokenSet(sectionText(au)), tokenSet(sectionText(other)));
    let line = `${id}↔${otherId}: ${(after * 100).toFixed(1)}%`;
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

reportPair('AU vs US similarity (7 targeted sections)', auSections, usSections, US_PAIR, auBeforeSections);
reportPair('AU vs UK similarity (7 targeted sections)', auSections, ukSections, UK_PAIR, auBeforeSections);

function combinedAu(sections: StorySection[]): string {
  return BATCH_AU6_IDS.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function combinedOther(otherList: StorySection[], pairMap: Record<(typeof BATCH_AU6_IDS)[number], string>): string {
  return BATCH_AU6_IDS.map((id) => sectionText(otherList.find((s) => s.id === pairMap[id])!)).join('\n');
}

const auCombined = combinedAu(auSections);
const usCombined = combinedOther(usSections, US_PAIR);
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

console.log('\n=== Shared 8+ word phrases (AU vs US, 7 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU6_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === US_PAIR[id])!;
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
for (const id of BATCH_AU6_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === US_PAIR[id])!;
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
