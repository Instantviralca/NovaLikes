import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH5A_IDS = [
  'first-impression',
  'clear-identity',
  'better-profile',
  'content-worth-following',
  'brand-partnerships',
  'customer-proof',
  'more-business',
  'measure-growth',
  'growth-framework',
] as const;

const UNTOUCHED_IDS = ['uk-campaign-moments', 'reach-context', 'local-businesses'] as const;

const FIRST_IMPRESSION_BULLETS = [
  'profile image',
  'username',
  'bio',
  'follower count',
  'recent posts',
  'Reels',
  'pinned content',
  'highlights',
  'visible engagement',
  'overall profile consistency',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'uk-campaign-moments': 'Use Instagram Followers Around Important UK Campaign Moments',
  'reach-context': "More Instagram Followers Don't Automatically Mean More Reach",
  'local-businesses': 'Instagram Followers for UK Local Businesses',
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

const EXPECTED: Record<(typeof BATCH5A_IDS)[number], Partial<StorySection>> = {
  'first-impression': {
    title: 'Make the Follower Number Part of a Stronger First Look',
    lead: 'Someone reaching your Instagram profile may be deciding whether the account is worth another minute of their attention. The follower total is visible, but it sits beside several other signals.',
    paragraphs: [
      'A larger follower count can help a profile appear more developed, but visitors can also see whether the bio is useful, the recent feed is active, the pinned content is relevant and the account has a clear purpose.',
      'For a UK creator, that means making the niche and strongest work obvious. For a business, it means explaining what you offer and where customers should go next. For a brand, the visual identity and campaign message should remain consistent across the profile.',
    ],
    footer:
      'Follower count can influence the first glance. The rest of the profile decides whether there is anything worth exploring after it.',
  },
  'clear-identity': {
    title: 'Give the Instagram Profile a Clear Reason to Exist',
    lead: 'Audience size is easier to understand when the account itself has a recognisable identity. A visitor should not need to scroll through dozens of posts to work out who the profile is for.',
    footer:
      'A visible audience can support profile presentation. Clear positioning helps new visitors understand why the account deserves their attention.',
    items: [
      {
        title: 'Define the Main Subject',
        body: 'Creators should make their niche, expertise, style or recurring content theme obvious from the profile.',
      },
      {
        title: 'Explain the Commercial Offer',
        body: 'UK business accounts should make it easy to understand what they sell, provide or help customers with.',
      },
      {
        title: 'Use a Recognisable Visual Direction',
        body: 'Consistent imagery, design and presentation can make separate posts feel like they belong to the same account.',
      },
      {
        title: 'Use Pinned Posts as an Introduction',
        body: 'Pin content that explains the account, presents strong work, introduces an important service or answers a useful question.',
      },
      {
        title: 'Keep the Recent Feed Relevant',
        body: 'Follower growth has more context when the latest posts still reflect the subject and purpose described in the profile.',
      },
    ],
  },
  'better-profile': {
    title: 'Make the Profile Better Before You Send More Attention Towards It',
    lead: 'A follower package changes one visible number. If more people later visit the account through content, search, advertising or recommendations, the profile should be ready for them.',
    footer:
      'Use follower growth to support the profile people actually land on. Good account management gives the audience number useful context.',
    items: [
      {
        title: 'Write a Bio That Answers the Basics',
        body: 'Tell visitors who the account represents and what they can expect without filling the bio with vague promotional language.',
      },
      {
        title: 'Put Important Content Near the Top',
        body: 'Use pinned posts and Reels for introductions, useful evergreen content, major services or examples of your strongest work.',
      },
      {
        title: 'Make the Feed Feel Connected',
        body: 'A consistent subject and content direction can make it easier for new visitors to understand why they might follow.',
      },
      {
        title: 'Check Links and Business Details',
        body: 'Do not direct potential customers towards expired offers, old websites, closed locations or contact information that no longer works.',
      },
      {
        title: 'Keep Publishing Current Content',
        body: 'Recent activity shows that the profile is still being managed and gives the visible follower count more context.',
      },
      {
        title: 'Give Commercial Visitors Somewhere to Go',
        body: 'If the account represents a business, make the next step clear whether that is shopping, booking, enquiring, calling or visiting the website.',
      },
    ],
  },
  'content-worth-following': {
    title: 'Build the Audience Number Around Content With a Reason to Return',
    lead: 'A follower package can change the visible audience total. It cannot create the publishing strategy that makes genuine viewers want to see the next post.',
    footer:
      'Use real audience behaviour and Instagram Insights to decide which content deserves more investment over time.',
    items: [
      {
        title: 'Create Reels With a Specific Job',
        body: 'Use video to teach, demonstrate, compare, entertain, answer a question or tell a story relevant to the account.',
      },
      {
        title: 'Make Carousels Useful',
        body: 'Use multiple slides for subjects that benefit from steps, comparisons, examples, explanations or extra context.',
      },
      {
        title: 'Develop Repeatable Content Themes',
        body: 'A few recognisable subject areas can help visitors understand what they are likely to receive by following.',
      },
      {
        title: 'Make Captions Add Context',
        body: 'Use captions for information, explanation or a useful next step rather than simply describing what the image already shows.',
      },
      {
        title: 'Reply to Real Interaction',
        body: 'Genuine questions, comments and messages should receive genuine attention from the creator or business managing the account.',
      },
      {
        title: 'Learn From Actual Performance',
        body: 'Review your own Insights to see which posts and Reels attract genuine attention, profile activity and audience response.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Prepare More Than a Follower Count for Brand Collaborations',
    paragraphs: [
      'UK creators may want a stronger-looking audience when building a profile for potential collaborations, but a professional partnership decision rarely comes down to the follower total alone.',
      'A brand or agency may also consider whether the creator fits the campaign, the quality and consistency of the content, genuine audience interaction, previous work, communication, reliability and any real performance data available for relevant campaigns.',
      'If collaborations matter to you, build a profile that can stand up to that wider review. Make the niche clear, publish work you are comfortable showing professionally and keep genuine account analytics available when a serious partner needs them.',
    ],
    footer:
      'Follower count can contribute to profile presentation. It should not be presented as proof of influence or campaign performance by itself.',
  },
  'customer-proof': {
    title: 'Do Not Confuse Instagram Followers With Customer Trust',
    paragraphs: [
      'A larger follower number may affect how established a profile appears, but it does not tell a customer whether other people have actually bought from, hired or recommended the business.',
      'For UK companies, genuine trust can come from verified reviews, authentic testimonials, completed projects, case studies, real customer comments, customer-created content, accurate company information and responsive service.',
      'Show genuine proof when you have it. Keep purchased followers separate from customer evidence and never present the follower total as if it were a review score or proof of customer satisfaction.',
    ],
    footer:
      'Followers support one visible social metric. Genuine customer experiences provide a different kind of credibility.',
  },
  'more-business': {
    title: 'A Bigger Instagram Audience Is Not the Same as More Customers',
    paragraphs: [
      'An Instagram follower total can influence profile presentation, but increasing that number does not automatically create commercial demand.',
      'A UK business may actually care about online orders, bookings, qualified enquiries, phone calls, quote requests, shop visits, website activity or useful direct messages. Those are different outcomes from the number displayed beside Followers.',
      'Your offer, content, reputation, pricing, website, audience fit and customer experience can all affect whether Instagram attention turns into business.',
      'Track the commercial result separately. Use Followers when follower count is the metric you want to change, not as a substitute for measuring whether the business is actually growing.',
    ],
  },
  'measure-growth': {
    title: 'Judge Instagram Progress With More Than the Follower Total',
    lead: 'Follower count can show the visible size of the profile audience. To understand whether your Instagram activity is becoming more useful, look at the behaviour behind the account as well.',
    footer:
      'Purchased Followers change the visible follower count. Your genuine Instagram data should guide decisions about content and longer-term growth.',
    items: [
      {
        title: 'Which Posts Keep Earning Attention?',
        body: 'Compare genuine performance across different formats and subjects to see which content continues attracting real viewers.',
      },
      {
        title: 'Are Visitors Exploring the Account?',
        body: 'Use available profile activity and genuine account data to understand whether content is leading people towards the wider profile.',
      },
      {
        title: 'Where Does Real Interaction Happen?',
        body: 'Pay attention to authentic replies, shares, saves, useful comments and messages rather than treating every visible metric as the same thing.',
      },
      {
        title: 'What Encourages Organic Follows?',
        body: 'Identify the content and profile experiences that persuade genuine viewers to choose to follow without being part of a purchased package.',
      },
      {
        title: 'Does Instagram Contribute to the Business?',
        body: 'Commercial accounts should track genuine website visits, bookings, leads, sales and other relevant outcomes independently.',
      },
    ],
  },
  'growth-framework': {
    title: 'A Practical Instagram Plan for Growing a UK Profile',
    lead: 'Treat follower count as one part of the profile rather than the strategy itself. Build the account in an order that gives the visible audience something useful to sit behind.',
    items: [
      {
        title: 'Decide What the Account Should Be Known For',
        body: 'Define the creator niche, business category, audience or subject clearly enough that a new visitor can recognise it quickly.',
      },
      {
        title: 'Create a Useful Base of Content',
        body: 'Publish enough strong posts and Reels that someone arriving for the first time has more than one piece of content to explore.',
      },
      {
        title: 'Set Up the Profile Properly',
        body: 'Review the bio, important links, pinned posts, contact options and Highlights before putting more attention behind the account.',
      },
      {
        title: 'Plan Content Around Real Objectives',
        body: 'Know whether a post is intended to educate, demonstrate, introduce, entertain, sell, answer or support a campaign.',
      },
      {
        title: 'Use Instagram Insights for Decisions',
        body: 'Let genuine reach, interactions, profile activity and other available account data show what real viewers respond to.',
      },
      {
        title: 'Maintain Genuine Community Activity',
        body: 'Respond properly when real users ask questions, leave meaningful comments or contact the account directly.',
      },
      {
        title: 'Connect Instagram With Your Wider UK Marketing',
        body: 'A business may use Instagram alongside its website, search visibility, Google Business Profile, paid campaigns, email, ecommerce, Facebook, TikTok and creator partnerships.',
      },
      {
        title: 'Keep the Follower Metric in Perspective',
        body: 'A visible audience number can support presentation. Sustainable account value still depends on the content, positioning and genuine audience activity behind it.',
      },
    ],
  },
};

function loadStorySections(path: string): StorySection[] {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    followersAuthority?: { storySections?: StorySection[] };
  };
  return raw.followersAuthority?.storySections ?? [];
}

function sectionText(s: StorySection): string {
  const parts = [s.title];
  if (s.lead) parts.push(s.lead);
  if (s.footer) parts.push(s.footer);
  if (s.paragraphs) parts.push(...s.paragraphs);
  if (s.items) parts.push(...s.items.flatMap((i) => [i.title, i.body]));
  return parts.join('\n');
}

function allStoryText(sections: StorySection[]): string {
  return sections.map(sectionText).join('\n');
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
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);
}

function sharedPhrases8Plus(usText: string, ukText: string): string[] {
  const usWords = words(usText);
  const ukWords = words(ukText);
  const shared: string[] = [];
  for (let len = 8; len <= Math.min(usWords.length, ukWords.length); len++) {
    const usPhrases = new Set<string>();
    for (let i = 0; i <= usWords.length - len; i++) {
      usPhrases.add(usWords.slice(i, i + len).join(' '));
    }
    for (let i = 0; i <= ukWords.length - len; i++) {
      const phrase = ukWords.slice(i, i + len).join(' ');
      if (usPhrases.has(phrase) && !shared.includes(phrase)) shared.push(phrase);
    }
  }
  return shared;
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

const usBefore = readFileSync('content/markets/us/services/buy-instagram-followers.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-instagram-followers.json');
const ukSections = loadStorySections('content/markets/uk/services/buy-instagram-followers.json');

const snapshotPath = join(tmpdir(), 'uk-ig-followers-before-batch5a.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (9 sections) ===');
for (const id of BATCH5A_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== first-impression bullets unchanged ===');
const fi = ukSections.find((s) => s.id === 'first-impression');
console.log(
  JSON.stringify(fi?.bullets) === JSON.stringify(FIRST_IMPRESSION_BULLETS) ? 'OK' : 'FAIL',
);

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = ukSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== US file unchanged ===');
const usAfter = readFileSync('content/markets/us/services/buy-instagram-followers.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (9 rewritten sections) ===');
for (const id of BATCH5A_IDS) {
  const us = usSections.find((s) => s.id === id)!;
  const uk = ukSections.find((s) => s.id === id)!;
  const after = jaccard(tokenSet(sectionText(us)), tokenSet(sectionText(uk)));
  let line = `${id}: ${(after * 100).toFixed(1)}%`;
  if (ukBeforeSections) {
    const ukOld = ukBeforeSections.find((s) => s.id === id);
    if (ukOld) {
      const before = jaccard(tokenSet(sectionText(us)), tokenSet(sectionText(ukOld)));
      line += ` (was ${(before * 100).toFixed(1)}%)`;
    }
  }
  console.log(line);
}

console.log('\n=== Combined storySections similarity ===');
const afterAll = jaccard(tokenSet(allStoryText(usSections)), tokenSet(allStoryText(ukSections)));
let combinedLine = `After: ${(afterAll * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const beforeAll = jaccard(
    tokenSet(allStoryText(usSections)),
    tokenSet(allStoryText(ukBeforeSections)),
  );
  combinedLine = `Before: ${(beforeAll * 100).toFixed(1)}% | After: ${(afterAll * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (9 sections US vs UK) ===');
let allShared: string[] = [];
for (const id of BATCH5A_IDS) {
  const us = usSections.find((s) => s.id === id)!;
  const uk = ukSections.find((s) => s.id === id)!;
  const phrases = sharedPhrases8Plus(sectionText(us), sectionText(uk));
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases.slice(0, 5)) console.log(`  - "${p}"`);
    if (phrases.length > 5) console.log(`  ... and ${phrases.length - 5} more`);
    allShared = allShared.concat(phrases);
  }
}
if (allShared.length === 0) console.log('None');

console.log(`\n${pass}/9 exact-copy checks passed`);
process.exit(pass === 9 && usBefore === usAfter ? 0 : 1);
