import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH5D_UK_IDS = [
  'built-for-uk',
  'strong-content',
  'measure-quality',
  'content-engagement',
  'local-businesses',
  'real-experience',
  'brand-partnerships',
  'business-results',
  'organic-engagement',
] as const;

const US_PAIR: Record<(typeof BATCH5D_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'strong-content': 'strong-content',
  'measure-quality': 'measure-quality',
  'content-engagement': 'content-engagement',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
  'brand-partnerships': 'brand-partnerships',
  'business-results': 'business-results',
  'organic-engagement': 'organic-engagement',
};

const UNTOUCHED_IDS = [
  'uk-campaign-moments',
  'likes-vs-views',
  'likes-reach',
  'customer-proof',
  'platform-rules',
  'tiktok-analytics',
  'engagement-framework',
] as const;

const STRONG_CONTENT_BULLETS = [
  'View count',
  'Comments',
  'Shares',
  'caption',
  'creator profile',
  'video quality',
  'overall account activity',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'uk-campaign-moments': 'Put More Engagement Behind Important UK Campaign Moments',
  'likes-vs-views': 'Likes and Views Are Different TikTok Metrics',
  'likes-reach': 'Likes and For You Feed Reach Are Different Things',
  'customer-proof': 'Use TikTok Likes Alongside Genuine Customer Proof',
  'platform-rules': 'TikTok Platform Rules and Artificial Engagement',
  'tiktok-analytics': 'Use TikTok Analytics to Understand Genuine Video Performance',
  'engagement-framework': 'A Practical TikTok Engagement Framework for UK Accounts',
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

const EXPECTED: Record<(typeof BATCH5D_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Choose TikTok Likes Around the Videos That Matter to Your UK Account',
    lead: 'A Likes package applies to an individual public video, so start with the role of that content rather than treating every upload on the account the same way.',
    paragraphs: [
      'A UK creator may have one video that represents their niche especially well. An ecommerce brand may be launching a product, testing a demonstration or supporting a seasonal campaign. A local company may have a project video, service explanation or business introduction that deserves more attention. An agency may be managing separate client accounts where each campaign has a completely different engagement objective.',
      'Choose the TikTok first. Understand why that video matters to the profile or campaign, then decide what visible Like increase makes sense for that specific piece of content.',
    ],
    footer:
      'The Like count belongs to the selected video. The reason for increasing it should come from the job that video is meant to do.',
    items: [
      {
        title: 'UK Creators',
        body: 'Prioritise videos that communicate your niche, personality, expertise or creative direction clearly to people discovering the account.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Use Likes around demonstrations, launches, creator partnerships and campaign videos connected to products customers can genuinely explore.',
      },
      {
        title: 'Local Businesses',
        body: 'Support videos showing real services, completed work, locations, products or current activity from the business behind the profile.',
      },
      {
        title: 'Agencies and Client Accounts',
        body: 'Choose Like quantities according to the objective of each individual client video instead of applying one standard number everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Use visible Likes around selected campaign content while organic publishing, paid activity and genuine community management continue separately.',
      },
    ],
  },
  'strong-content': {
    title: 'Give a Strong TikTok Video More Context at First Glance',
    lead: 'The Like count is one of several public signals visible around a TikTok video. Viewers can also judge the creative, caption, comments, profile and wider account activity.',
    paragraphs: [
      'A larger visible Like count can make selected content appear more active, but it cannot turn a confusing idea into a clear one or make an irrelevant video valuable to the audience.',
      'Check the video itself before supporting the number. The opening should make sense quickly, the main message should stay focused and anyone interested enough to visit the profile should find an account that supports what the video is saying.',
    ],
    footer:
      'Use Likes to support TikTok content that already has a reason to earn attention rather than expecting the public number to create that reason.',
  },
  'measure-quality': {
    title: 'Judge TikTok Video Performance With More Than the Like Number',
    lead: 'A public Like total tells you about one visible engagement metric. It does not explain how genuine viewers actually watched, shared or responded to the video.',
    footer:
      'Keep purchased Likes separate from genuine performance reporting. Use your actual TikTok analytics and business data when deciding what content deserves more investment.',
    items: [
      {
        title: 'Viewing Behaviour',
        body: 'Use genuine account data to understand whether real viewers remain with the video long enough to receive the main idea.',
      },
      {
        title: 'Real Views',
        body: 'Look at genuine viewing activity separately from the Likes added through a purchased package.',
      },
      {
        title: 'Voluntary Shares',
        body: 'People choosing to send the video to others can indicate that the content is relevant, useful or entertaining to a real audience.',
      },
      {
        title: 'Meaningful Comments',
        body: 'Real questions and reactions can reveal what viewers understood and what subjects they want to discuss further.',
      },
      {
        title: 'Profile Activity',
        body: 'Check whether genuine interest in the video encourages people to explore the account behind it.',
      },
      {
        title: 'Organic and Commercial Outcomes',
        body: 'Track genuine Follows, website activity, enquiries, bookings or other relevant outcomes separately from the purchased Like count.',
      },
    ],
  },
  'content-engagement': {
    title: 'Make the TikTok Worth Engaging With Before Focusing on the Like Count',
    lead: 'If TikTok matters beyond one order, keep improving the parts of the video that influence whether a genuine viewer understands the idea and wants to interact.',
    footer:
      'Purchased Likes change the selected visible number. Real audience behaviour should guide what you film, edit and publish next.',
    items: [
      {
        title: 'Make the Opening Easy to Understand',
        body: 'Give viewers enough context in the first moments to understand what the video is about and why they may want to continue.',
      },
      {
        title: 'Bring the Main Point Forward',
        body: 'Do not hide the strongest demonstration, result, idea or answer behind an unnecessarily long introduction.',
      },
      {
        title: 'Keep One Main Direction',
        body: 'A focused short video is often easier to follow than content trying to communicate several unrelated messages at once.',
      },
      {
        title: 'Use the Visual Format Properly',
        body: 'Show the product, process, place, person or result when seeing it is more useful than only hearing or reading about it.',
      },
      {
        title: 'Use On-Screen Text as Support',
        body: 'Keep wording readable and relevant so it helps explain the video instead of competing with the creative.',
      },
      {
        title: 'Develop Formats You Can Reuse',
        body: 'If genuine viewers respond well to demonstrations, explainers, transformations or another format, build future ideas around what worked.',
      },
      {
        title: 'Learn From Genuine Reactions',
        body: 'Real comments, questions and audience responses can provide useful ideas for the next videos you create.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use TikTok Likes Around Videos That Show a Real UK Business in Action',
    paragraphs: [
      'Short video can help potential local customers understand a business in ways that static information sometimes cannot. The useful video will depend on what the company actually does.',
      'A restaurant can show preparation or the customer experience. A builder can document a transformation. A salon can present relevant work. A retailer can demonstrate new stock. An estate agent can show a property. A fitness business can present facilities or classes. A tourism company can show an experience. A trades or professional service business can explain a process or answer a common customer question.',
      'If you add Likes to one of these videos, keep the business behind it accurate. Locations, services, offers, contact information and website details should still match what a potential customer will find if they investigate further.',
    ],
    footer:
      'Visible Likes can support how the TikTok appears. Local trust comes from the genuine business, its work and the information behind the video.',
  },
  'real-experience': {
    title: 'Build TikTok Videos Around Experience the Account Can Actually Support',
    lead: 'First-hand work and knowledge can give a TikTok something useful that a larger engagement number cannot create.',
    footer:
      'Likes can strengthen one visible signal around the content. Real expertise, products and experience give viewers a reason to value the video itself.',
    items: [
      {
        title: 'Show Genuine Completed Work',
        body: 'Use real projects, transformations and examples that the creator or company can stand behind.',
      },
      {
        title: 'Demonstrate Products Properly',
        body: 'Show products you genuinely sell or use and help viewers understand how they look, work or fit into a real situation.',
      },
      {
        title: 'Explain Processes You Know',
        body: 'Turn professional knowledge and practical experience into simple videos that answer relevant questions.',
      },
      {
        title: 'Use Questions From Real Customers',
        body: 'Recurring enquiries and conversations can provide useful topics that already matter to the people the business serves.',
      },
      {
        title: 'Show What Happens Behind the Result',
        body: 'Relevant behind-the-scenes footage can help viewers understand the people, location or process connected to the final outcome.',
      },
      {
        title: 'Share First-Hand Lessons',
        body: 'Original observations from real experience can offer more value than repeating broad advice already common across similar TikTok accounts.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Potential TikTok Partners More to Assess Than a Like Count',
    paragraphs: [
      'A creator may care about visible Likes when preparing a profile for commercial partnerships, but serious brand decisions can involve far more than one engagement number.',
      'UK brands and agencies may evaluate campaign fit, creator positioning, video quality, genuine audience relevance, real viewing behaviour, authentic interactions, consistency, previous collaborations, communication and reliable performance information.',
      'If partnerships matter to you, prepare the wider profile for that assessment. Publish videos you would be comfortable presenting professionally, make the creator niche easy to recognise and keep genuine analytics available for legitimate campaign discussions.',
    ],
    footer:
      'A public Like count can be one visible signal. Do not present purchased Likes by themselves as proof of influence, reach or campaign performance.',
  },
  'business-results': {
    title: 'Do Not Use TikTok Likes as a Substitute for Measuring Business Results',
    paragraphs: [
      'A larger Like number can change how active a TikTok video appears, but it does not automatically mean that the content created commercial value.',
      'A UK business may care more about ecommerce orders, enquiries, bookings, quote requests, calls, shop visits, website activity, qualified messages or genuine interest in a product or service.',
      'Those outcomes depend on the content, offer, audience fit, website, pricing, reputation and real customer experience as well as the wider marketing around the video.',
      'Track the business result directly. Use TikTok Likes when the visible Like count is the metric you want to change, not as proof that sales or leads increased.',
    ],
  },
  'organic-engagement': {
    title: 'Keep Purchased TikTok Likes Separate From Genuine Audience Interaction',
    paragraphs: [
      'A purchased Likes package changes the visible Like total on the selected eligible video. Organic engagement comes from real TikTok users independently choosing to interact with the content.',
      'When analysing the account, separate purchased Likes from genuine Likes, Comments, Shares, viewing behaviour, profile activity and organic Followers. Those genuine signals can help you understand how real people respond to what you publish.',
      "Do not report purchased Likes as organic engagement. Review TikTok's current platform rules as part of any decision to use a third-party engagement service.",
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

function matchingPairsText(
  sections: StorySection[],
  ids: readonly (typeof BATCH5D_UK_IDS)[number][],
): string {
  return ids.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
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

const usBefore = readFileSync('content/markets/us/services/buy-tiktok-likes.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-tiktok-likes.json');
const ukSections = loadStorySections('content/markets/uk/services/buy-tiktok-likes.json');

const snapshotPath = join(tmpdir(), 'uk-tt-likes-before-batch5d.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (9 sections) ===');
for (const id of BATCH5D_UK_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== strong-content bullets unchanged ===');
const sc = ukSections.find((s) => s.id === 'strong-content');
console.log(
  JSON.stringify(sc?.bullets) === JSON.stringify(STRONG_CONTENT_BULLETS) ? 'OK' : 'FAIL',
);

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = ukSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== US file unchanged ===');
const usAfter = readFileSync('content/markets/us/services/buy-tiktok-likes.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (9 direct pairs) ===');
for (const ukId of BATCH5D_UK_IDS) {
  const usId = US_PAIR[ukId];
  const us = usSections.find((s) => s.id === usId)!;
  const uk = ukSections.find((s) => s.id === ukId)!;
  const after = jaccard(tokenSet(sectionText(us)), tokenSet(sectionText(uk)));
  let line = `${ukId} (vs ${usId}): ${(after * 100).toFixed(1)}%`;
  if (ukBeforeSections) {
    const ukOld = ukBeforeSections.find((s) => s.id === ukId);
    if (ukOld) {
      const before = jaccard(tokenSet(sectionText(us)), tokenSet(sectionText(ukOld)));
      line += ` (was ${(before * 100).toFixed(1)}%)`;
    }
  }
  console.log(line);
}

console.log('\n=== Combined matching-pair similarity ===');
const usMatchingText = BATCH5D_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH5D_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH5D_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (9 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH5D_UK_IDS) {
  const usId = US_PAIR[ukId];
  const us = usSections.find((s) => s.id === usId)!;
  const uk = ukSections.find((s) => s.id === ukId)!;
  const phrases = sharedPhrases8Plus(sectionText(us), sectionText(uk));
  if (phrases.length) {
    console.log(`${ukId}:`);
    for (const p of phrases.slice(0, 5)) console.log(`  - "${p}"`);
    if (phrases.length > 5) console.log(`  ... and ${phrases.length - 5} more`);
    allShared = allShared.concat(phrases);
  }
}
if (allShared.length === 0) console.log('None');

console.log(`\n${pass}/9 exact-copy checks passed`);
process.exit(pass === 9 ? 0 : 1);
