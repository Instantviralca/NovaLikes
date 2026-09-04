import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU8_IDS = [
  'profile-growth-table',
  'audience-segments',
  'first-impression',
  'priority-content',
  'better-profile',
  'content-worth-following',
  'local-businesses',
  'customer-proof',
  'affordable-growth',
  'account-you-have',
] as const;

const UNTOUCHED_IDS = ['campaign-moments', 'metric-meanings'] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-moments': 'Put Instagram Growth Behind Australian Campaign Moments',
  'metric-meanings': 'Understand What Each Instagram Metric Actually Tells You',
};

const FIRST_IMPRESSION_BULLETS = [
  'profile image',
  'username',
  'bio',
  'follower count',
  'recent posts',
  'pinned content',
  'Reels',
  'Likes',
  'Comments',
  'overall visual consistency',
];

const CARD_SPOT: Record<string, string> = {
  'tt-followers': 'Strengthen the Audience Number Around Your TikTok Profile',
  'tt-likes': 'Support the TikTok Videos You Want People to Notice',
  'tt-views': 'Put More Visible Views Behind Your Stronger TikToks',
  'fb-followers': 'Grow the Visible Audience Around Your Facebook Page',
  'fb-page-likes': 'Add More Visible Page Likes to an Established Facebook Presence',
  'fb-post-likes': 'Support Facebook Posts That Matter More to Your Campaign',
};

const EXPECTED_ORDER = [
  'profile-growth-table',
  'audience-segments',
  'first-impression',
  'priority-content',
  'campaign-moments',
  'better-profile',
  'content-worth-following',
  'local-businesses',
  'customer-proof',
  'metric-meanings',
  'affordable-growth',
  'account-you-have',
];

type StoryItem = { title: string; body: string };
type StorySection = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: StoryItem[];
};

type ServiceCard = { id: string; title: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EXPECTED: Record<(typeof BATCH_AU8_IDS)[number], Partial<StorySection>> = {
  'profile-growth-table': {
    eyebrow: 'Choose the Right Metric',
    title: 'Choose the Instagram Metric That Matches What You Actually Want to Strengthen',
    lead: 'Start with the part of the Australian account or content you want to change, then choose the service built for that specific metric.',
    footer:
      'Followers, Likes, Views and Comments change different visible Instagram metrics. Decide what needs attention first instead of treating every package as the same type of growth.',
    items: [
      {
        title: 'Strengthen the Visible Audience Around the Profile',
        body: 'Choose Instagram Followers when the profile-level follower count is the metric you want to increase.',
      },
      {
        title: 'Add Visible Engagement to a Post or Reel',
        body: 'Choose Instagram Likes when the Like count on one eligible piece of content is the priority.',
      },
      {
        title: 'Support the Displayed View Count on Video Content',
        body: 'Choose Instagram Views when you want to increase the visible Views on an eligible Reel or video.',
      },
      {
        title: 'Build Visible Conversation Around Selected Content',
        body: 'Choose Instagram Comments when the goal is to add visible discussion to an eligible post or Reel.',
      },
    ],
  },
  'audience-segments': {
    eyebrow: 'Australian Instagram',
    title: 'Different Australian Accounts Need Different Instagram Priorities',
    lead: 'A creator profile, ecommerce store and local service business should not use Instagram growth in exactly the same way.',
    items: [
      {
        title: 'Creators',
        body: 'Build around a recognisable niche, strong examples of your content and the profile visitors actually see after discovering a Reel or collaboration.',
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Support product launches, demonstrations and priority content while keeping the store, product information and customer journey clear.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Instagram around real services, locations, completed work and customer information that people can verify elsewhere.',
      },
      {
        title: 'Agencies',
        body: 'Choose Followers, Likes, Views or Comments according to the individual client, account condition and purpose of the campaign.',
      },
      {
        title: 'Established Brands',
        body: 'Use visible Instagram metrics as one part of a wider strategy that may also include organic content, creators, paid media, ecommerce and the company website.',
      },
    ],
  },
  'first-impression': {
    title: 'Make the Australian Instagram Profile Worth Checking Beyond the Numbers',
    lead: 'Visible metrics may shape the first few seconds of a profile visit, but people can quickly look beyond them to understand the account itself.',
    paragraphs: [
      'A stronger follower count or more visible activity can make an Instagram account appear more established, but the bio, recent posts, pinned content, Reels and public information still need to support that impression.',
      'For Australian businesses, that also means making the offer, location and next step easy to understand. Creators should make their niche recognisable, while brands should keep the profile consistent with the identity customers see across other official channels.',
    ],
    items: [
      {
        title: 'For Creators',
        body: 'Make the subject, style and reason to explore the account clear enough for a new visitor to recognise quickly.',
      },
      {
        title: 'For Businesses',
        body: 'Help potential customers understand what the company offers and where they should go if they want to research, enquire, book or buy.',
      },
      {
        title: 'For Brands',
        body: 'Keep profile visuals, messaging and campaign content consistent with the wider brand rather than relying on social numbers alone.',
      },
      {
        title: 'For Local Businesses',
        body: "Keep locations, services and contact information accurate when Instagram is part of the customer's research process.",
      },
    ],
  },
  'priority-content': {
    title: 'Put Instagram Support Behind Content With a Clear Job to Do',
    lead: 'Not every post deserves the same level of attention. Start by identifying the content that matters to the account, campaign or customer journey.',
    footer:
      'Choose the priority content first. Then decide whether Followers, Likes, Views or Comments are the most relevant visible metric to support.',
    items: [
      {
        title: 'A Product Launch People Can Research',
        body: 'Support the post or Reel that explains or demonstrates the real product clearly enough for interested customers to continue exploring it.',
      },
      {
        title: 'A Creator Collaboration With a Purpose',
        body: 'Focus on the content that best communicates the partnership instead of spreading support across unrelated posts.',
      },
      {
        title: 'A Business Introduction',
        body: 'Use content that helps someone discovering the company understand what it does, where it operates and why the profile may be useful.',
      },
      {
        title: 'Work You Would Show a Real Customer or Partner',
        body: 'Prioritise portfolio pieces, projects or examples that genuinely represent the quality and type of work behind the account.',
      },
      {
        title: 'Evergreen Content That Keeps Working',
        body: 'Tutorials, demonstrations and useful explainers may continue introducing the account long after the original publication date.',
      },
      {
        title: 'A Time-Sensitive Business Update',
        body: 'New services, locations, events and other important changes may deserve more attention when customers genuinely need the information.',
      },
    ],
  },
  'better-profile': {
    title: 'Improve the Instagram Profile Before Sending More Attention Towards It',
    lead: 'A stronger-looking metric is more useful when the account itself gives new visitors enough context to understand the creator, business or brand.',
    footer:
      'Visible growth can support the first impression. A useful and current profile determines what happens after someone becomes interested.',
    items: [
      {
        title: 'Explain the Account Clearly',
        body: 'Use the bio to make the creator niche, business offer or brand purpose understandable without forcing visitors to guess.',
      },
      {
        title: 'Use Pinned Content as an Introduction',
        body: 'Keep strong posts or Reels visible when they help explain the account, key products, services or best work.',
      },
      {
        title: 'Keep the Content Direction Recognisable',
        body: 'Give visitors enough consistency to understand what they are likely to find if they continue exploring.',
      },
      {
        title: 'Check Information Customers Depend On',
        body: 'Keep links, products, services, locations and important public details current where they affect a real customer decision.',
      },
      {
        title: 'Show Recent Relevant Activity',
        body: 'Current content gives people stronger context than visible metrics sitting beside a profile that appears neglected.',
      },
      {
        title: 'Make the Next Step Obvious',
        body: 'For commercial accounts, help interested Australian visitors understand how to visit the website, enquire, shop, book or learn more.',
      },
    ],
  },
  'content-worth-following': {
    title: 'Give Real People a Reason to Keep Following the Australian Account',
    lead: 'Purchased metrics can change visible numbers, but they cannot create the ongoing Instagram content that makes genuine viewers choose to stay connected.',
    footer:
      'Use purchased metrics for the visible changes they provide. Let genuine audience behaviour show which content deserves more investment over time.',
    items: [
      {
        title: 'Build Recognisable Content Themes',
        body: 'Develop subjects that connect naturally with the audience, creator niche or business the account wants to represent.',
      },
      {
        title: 'Use Reels for More Than Frequency',
        body: 'Create demonstrations, explainers, stories, transformations, comparisons or other videos with a clear reason to exist.',
      },
      {
        title: 'Make Feed Posts Useful',
        body: 'Use posts and carousels for real education, product context, projects, proof and information visitors may genuinely want.',
      },
      {
        title: 'Give Captions Useful Context',
        body: 'Use captions to explain the story, product, project or subject instead of treating them as empty space below the creative.',
      },
      {
        title: 'Respond to Genuine People',
        body: 'Real Comments, questions and messages should receive appropriate responses from the creator or business behind the profile.',
      },
      {
        title: 'Learn From Genuine Instagram Performance',
        body: 'Use actual Insights to understand which topics and formats earn authentic attention instead of judging the strategy by visible metrics alone.',
      },
    ],
  },
  'local-businesses': {
    title: 'Build Instagram Growth Around a Local Australian Business People Can Verify',
    paragraphs: [
      'For a local business, Instagram may be only one part of the research journey. Potential customers can also check the company website, Google presence, reviews, referrals and other public information before deciding whether to make contact.',
      'That means the profile should help people understand the real operation rather than simply display stronger social numbers.',
      'Restaurants may show dishes and venues. Trades can document completed work. Interior designers may show finished spaces. Salons can present treatments. Retailers may feature real products. Property businesses can show listings. Tourism and hospitality companies can present destinations and experiences. Professional services can answer common customer questions.',
      'If you support the Instagram profile with Followers, Likes, Views or Comments, keep locations, services, public claims and contact information consistent with what customers can verify elsewhere.',
      'Visible Instagram metrics can support presentation. Local trust comes from the Australian business, its work and the customer experience behind the account.',
    ],
  },
  'customer-proof': {
    title: 'Keep Visible Instagram Metrics Separate From Genuine Customer Evidence',
    paragraphs: [
      'Follower counts, Likes, Views and Comments can affect how active or established an Instagram account appears, but they do not show whether genuine customers have bought from, hired or recommended the business.',
      'Australian businesses may have stronger evidence through verified reviews, authentic testimonials, real customer Comments, completed projects, case studies, tagged customer content and consistent public company information.',
      'Use that evidence where it genuinely exists. Do not invent testimonials or present purchased Instagram activity as customer approval.',
      'Visible social metrics can support presentation. Genuine customer experience gives potential customers a different and more meaningful reason to trust the business.',
    ],
  },
  'affordable-growth': {
    title: 'Compare Affordable Instagram Growth by What You Actually Receive',
    paragraphs: [
      'Price matters when comparing Instagram growth services in Australia, but the cheapest package does not automatically make two offers equivalent.',
      'Check the metric being changed, quantity, current price, required public information, password policy, tracking, support, service conditions and the exact outcome the provider says the package delivers.',
      'Compare the service itself before comparing only the dollar amount. NovaLikes shows the available metric and package information before checkout so you can decide whether the option fits the account or content you want to support.',
    ],
  },
  'account-you-have': {
    title: 'Choose Instagram Growth Around the Australian Account You Have Today',
    paragraphs: [
      'There is no single Followers, Likes, Views or Comments package that automatically makes sense for every Australian creator, business or brand.',
      'A newer profile may care about its overall audience number. An established creator may want to support one important Reel. An ecommerce business may focus on a product launch. A local company may want the wider profile to look stronger before advertising or another campaign sends new customers towards it.',
      'Review the account as it exists now, including the current metric, content, profile quality and purpose of the campaign. Then choose the service that matches the specific area you want to strengthen.',
      'Instagram growth should support the real strategy behind the account, not become a substitute for it.',
    ],
  },
};

function loadHomepage(path: string): { storySections: StorySection[]; services: ServiceCard[] } {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    storySections?: StorySection[];
    services?: ServiceCard[];
  };
  return { storySections: raw.storySections ?? [], services: raw.services ?? [] };
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
  if (exp.eyebrow !== undefined && actual.eyebrow !== exp.eyebrow) {
    console.error(`FAIL ${id} eyebrow`);
    ok = false;
  }
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

const auPath = 'content/markets/au/homepage.json';
const usPath = 'content/markets/us/homepage.json';
const ukPath = 'content/markets/uk/homepage.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const au = loadHomepage(auPath);
const us = loadHomepage(usPath);
const uk = loadHomepage(ukPath);

const snapshotPath = join(tmpdir(), 'au-homepage-before-batch-au8.json');
const auBefore = existsSync(snapshotPath) ? loadHomepage(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (10 sections) ===');
for (const id of BATCH_AU8_IDS) {
  const actual = au.storySections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== first-impression bullets unchanged ===');
const fi = au.storySections.find((s) => s.id === 'first-impression');
console.log(
  JSON.stringify(fi?.bullets) === JSON.stringify(FIRST_IMPRESSION_BULLETS)
    ? 'OK bullets'
    : 'FAIL bullets',
);

console.log('\n=== Story section order ===');
const ids = au.storySections.map((s) => s.id);
console.log(JSON.stringify(ids) === JSON.stringify(EXPECTED_ORDER) ? 'OK order' : 'FAIL order');

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = au.storySections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== TikTok/Facebook service cards unchanged ===');
for (const [cardId, title] of Object.entries(CARD_SPOT)) {
  const card = au.services.find((s) => s.id === cardId);
  console.log(card?.title === title ? `OK ${cardId}` : `FAIL ${cardId}`);
}

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  auBeforeList: StorySection[] | null,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU8_IDS) {
    const auSec = auList.find((s) => s.id === id)!;
    const other = otherList.find((s) => s.id === id)!;
    const after = jaccard(tokenSet(sectionText(auSec)), tokenSet(sectionText(other)));
    let line = `${id}: ${(after * 100).toFixed(1)}%`;
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

reportPair('AU vs US similarity (10 targeted sections)', au.storySections, us.storySections, auBefore?.storySections ?? null);
reportPair('AU vs UK similarity (10 targeted sections)', au.storySections, uk.storySections, auBefore?.storySections ?? null);

function combinedTargeted(sections: StorySection[]): string {
  return BATCH_AU8_IDS.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function allStoryText(sections: StorySection[]): string {
  return sections.map(sectionText).join('\n');
}

const auTarget = combinedTargeted(au.storySections);
const usTarget = combinedTargeted(us.storySections);
const ukTarget = combinedTargeted(uk.storySections);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auTarget), tokenSet(usTarget));
const auUkAfter = jaccard(tokenSet(auTarget), tokenSet(ukTarget));
let usLine = `AU vs US After: ${(auUsAfter * 100).toFixed(1)}%`;
let ukLine = `AU vs UK After: ${(auUkAfter * 100).toFixed(1)}%`;
if (auBefore) {
  const auBeforeTarget = combinedTargeted(auBefore.storySections);
  usLine = `AU vs US Before: ${(jaccard(tokenSet(auBeforeTarget), tokenSet(usTarget)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`;
  ukLine = `AU vs UK Before: ${(jaccard(tokenSet(auBeforeTarget), tokenSet(ukTarget)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`;
}
console.log(usLine);
console.log(ukLine);

console.log('\n=== Whole storySections similarity ===');
const wholeAuUsAfter = jaccard(tokenSet(allStoryText(au.storySections)), tokenSet(allStoryText(us.storySections)));
const wholeAuUkAfter = jaccard(tokenSet(allStoryText(au.storySections)), tokenSet(allStoryText(uk.storySections)));
if (auBefore) {
  const wholeAuUsBefore = jaccard(
    tokenSet(allStoryText(auBefore.storySections)),
    tokenSet(allStoryText(us.storySections)),
  );
  const wholeAuUkBefore = jaccard(
    tokenSet(allStoryText(auBefore.storySections)),
    tokenSet(allStoryText(uk.storySections)),
  );
  console.log(`AU vs US Before: ${(wholeAuUsBefore * 100).toFixed(1)}% | After: ${(wholeAuUsAfter * 100).toFixed(1)}%`);
  console.log(`AU vs UK Before: ${(wholeAuUkBefore * 100).toFixed(1)}% | After: ${(wholeAuUkAfter * 100).toFixed(1)}%`);
} else {
  console.log(`AU vs US After: ${(wholeAuUsAfter * 100).toFixed(1)}%`);
  console.log(`AU vs UK After: ${(wholeAuUkAfter * 100).toFixed(1)}%`);
}

console.log('\n=== Shared 8+ word phrases (AU vs US, 10 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU8_IDS) {
  const auSec = au.storySections.find((s) => s.id === id)!;
  const usSec = us.storySections.find((s) => s.id === id)!;
  const phrases = sharedPhrases(sectionText(auSec), sectionText(usSec), 8);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases.slice(0, 6)) console.log(`  - "${p}"`);
    p8 = p8.concat(phrases);
  }
}
if (p8.length === 0) console.log('None');

console.log('\n=== Shared 20+ word phrases (AU vs US, 10 pairs) ===');
let p20: string[] = [];
for (const id of BATCH_AU8_IDS) {
  const auSec = au.storySections.find((s) => s.id === id)!;
  const usSec = us.storySections.find((s) => s.id === id)!;
  const phrases = sharedPhrases(sectionText(auSec), sectionText(usSec), 20);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases) console.log(`  - "${p}"`);
    p20 = p20.concat(phrases);
  }
}
if (p20.length === 0) console.log('None');

console.log(`\n${pass}/10 exact-copy checks passed`);
process.exit(pass === 10 ? 0 : 1);
