import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH5E_UK_IDS = [
  'built-for-uk',
  'visible-momentum',
  'build-videos',
  'profile-experience',
  'local-businesses',
  'real-experience',
  'brand-partnerships',
  'business-results',
  'video-growth-framework',
] as const;

const US_PAIR: Record<(typeof BATCH5E_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'visible-momentum': 'visible-momentum',
  'build-videos': 'build-videos',
  'profile-experience': 'profile-experience',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
  'brand-partnerships': 'brand-partnerships',
  'business-results': 'business-results',
  'video-growth-framework': 'video-growth-framework',
};

const UNTOUCHED_IDS = [
  'uk-campaign-moments',
  'watch-behaviour',
  'fyp-reach',
  'unique-viewers',
  'monetisation-views',
  'views-not-likes',
  'customer-proof',
  'platform-rules',
  'hq-premium',
  'tiktok-analytics',
] as const;

const VISIBLE_MOMENTUM_BULLETS = [
  'Likes',
  'Comments',
  'Shares',
  'caption',
  'creator profile',
  'video quality',
  'overall account activity',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'uk-campaign-moments': 'Put More Views Behind Important UK Campaign Moments',
  'watch-behaviour': 'A Higher View Count Is Not the Same as Better Watch Behaviour',
  'fyp-reach': 'Views and For You Feed Reach Are Different Things',
  'unique-viewers': 'Views Are Not the Same as Unique Viewers',
  'monetisation-views':
    'Public TikTok Views and Qualified Monetisation Views Are Not the Same Metric',
  'views-not-likes': "More TikTok Views Don't Automatically Mean More Likes",
  'customer-proof': 'Use TikTok Views Alongside Genuine Customer Proof',
  'platform-rules': 'TikTok Platform Rules and Third-Party Views',
  'hq-premium': 'High Quality or Premium TikTok Views: Compare the Current Options',
  'tiktok-analytics': 'Use TikTok Analytics to Understand Genuine Video Performance',
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

const EXPECTED: Record<(typeof BATCH5E_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Choose TikTok Views Around the Videos That Matter to Your UK Account',
    lead: 'A Views package changes the displayed number on one eligible public video, so start with the role of that TikTok rather than treating every upload as equally important.',
    paragraphs: [
      'A UK creator may have one TikTok that explains their niche or showcases their strongest work particularly well. An ecommerce brand may be demonstrating a product, preparing a launch or supporting a seasonal campaign. A local company may have a service video, project transformation or business introduction worth highlighting. Agencies may manage several clients where every account has a different video objective.',
      'Choose the video first. Decide why that TikTok deserves additional visible attention, then select the View quantity and available package option that fit that individual piece of content.',
    ],
    footer:
      'Views belong to the selected video. The reason for increasing them should come from what that video is meant to achieve.',
    items: [
      {
        title: 'UK Creators',
        body: 'Prioritise videos that make your niche, expertise, personality or creative direction easier for new viewers to recognise.',
      },
      {
        title: 'Online Retailers and Ecommerce Brands',
        body: 'Use Views around demonstrations, launches, seasonal campaigns and product videos that help customers understand what you sell.',
      },
      {
        title: 'Local Businesses',
        body: 'Support content showing genuine services, projects, locations, products or current activity from the real company behind the account.',
      },
      {
        title: 'Agencies and Client Accounts',
        body: 'Choose View quantities according to the purpose and current performance of each client video instead of applying one package everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Put additional visible Views behind selected campaign videos while organic publishing, paid media and genuine audience activity continue separately.',
      },
    ],
  },
  'visible-momentum': {
    title: 'Give an Important TikTok More Context When Someone Finds It',
    lead: 'View count is visible around the video, but a viewer can also judge the creative, caption, comments, profile and overall quality of the account behind it.',
    paragraphs: [
      'A larger visible View total can make selected content appear more watched, but it cannot make a weak idea clearer or turn an irrelevant video into something useful to the audience.',
      'Review the TikTok before supporting the number. The opening should communicate enough to keep people oriented, the main subject should remain easy to follow and the profile should support what the video is presenting.',
    ],
    footer:
      'Use Views around a video that already deserves attention rather than expecting the displayed number to create the value of the content.',
  },
  'build-videos': {
    title: 'Make the TikTok Worth Watching Before Focusing on Its View Count',
    lead: 'If short-form video matters to the account beyond one campaign, keep improving the parts that influence whether genuine viewers understand the idea and remain interested.',
    footer:
      'Purchased Views change one displayed metric. Real viewing behaviour should guide how you plan, film and improve future TikTok content.',
    items: [
      {
        title: 'Make the First Moments Clear',
        body: 'Give viewers enough context early to understand the subject and why continuing to watch may be worthwhile.',
      },
      {
        title: 'Bring the Main Value Forward',
        body: 'Do not hide the demonstration, answer, result or important idea behind an unnecessarily long introduction.',
      },
      {
        title: 'Keep the Video Built Around One Direction',
        body: 'A focused TikTok is usually easier to process than short content trying to communicate several unrelated messages.',
      },
      {
        title: 'Use Video to Show What Words Cannot',
        body: 'Demonstrate the product, process, transformation, place or result when seeing it provides more value than simply describing it.',
      },
      {
        title: 'Keep On-Screen Wording Useful',
        body: 'Text should help explain the video without covering important visuals or making the content difficult to follow.',
      },
      {
        title: 'Develop Formats That Can Become Series',
        body: 'If genuine viewers respond well to walkthroughs, demonstrations, explainers or another recurring format, develop more ideas around it.',
      },
      {
        title: 'Use Genuine Performance to Learn',
        body: 'Review your actual TikTok analytics to identify which subjects and video structures hold real audience attention.',
      },
    ],
  },
  'profile-experience': {
    title: 'Make the TikTok Profile Useful After Someone Watches the Video',
    lead: 'A video can introduce someone to the account for the first time. If genuine interest leads to a profile visit, the rest of the account should make that visit worthwhile.',
    footer:
      'Views can support one video. The wider TikTok profile determines what an interested viewer discovers next.',
    items: [
      {
        title: 'Explain the Account Clearly',
        body: 'Use the bio and profile presentation to make the creator, company or subject of the account understandable without unnecessary searching.',
      },
      {
        title: 'Pin Videos That Introduce the Account Well',
        body: 'Keep strong examples, important services, useful evergreen content or other key videos easy to find near the top of the profile.',
      },
      {
        title: 'Keep the Wider Content Direction Consistent',
        body: 'Someone interested in one TikTok should be able to find more videos connected to the same niche, business or recurring subject.',
      },
      {
        title: 'Show Recent Activity',
        body: 'Current relevant videos give new visitors more evidence that the account is still actively managed.',
      },
      {
        title: 'Give Commercial Visitors a Clear Next Action',
        body: 'If TikTok supports a business, make it straightforward to visit the website, enquire, shop, book, call or take another relevant next step.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use TikTok Views Around Videos That Show a Real UK Business Clearly',
    paragraphs: [
      'TikTok can help a local company demonstrate what it does in a way that potential customers can understand quickly, especially when the service, place or result benefits from being seen.',
      'A restaurant can show preparation or the customer experience. A builder can record a transformation. A salon can present relevant work. A retailer can demonstrate products. An estate agent can create a property walkthrough. A fitness business can show facilities or classes. A tourism company can present an experience. An interior designer can show a completed space. Trades and professional services can explain processes or answer common customer questions.',
      'If you add Views to one of these videos, keep the underlying business information accurate. Locations, services, offers, website details and contact information should still match the genuine company a potential customer will find after watching.',
    ],
    footer:
      'Visible Views can support presentation of the TikTok. Local confidence comes from the real business and the evidence behind the video.',
  },
  'real-experience': {
    title: 'Use TikTok Video to Show Work and Knowledge You Actually Have',
    lead: 'First-hand experience gives short-form video substance that cannot be created simply by increasing the displayed View number.',
    footer:
      'Views can support the visible presentation of the TikTok. Genuine projects, products and expertise give viewers a reason to value what they are watching.',
    items: [
      {
        title: 'Document Genuine Work',
        body: 'Show completed projects, transformations or real results that the creator or company can confidently stand behind.',
      },
      {
        title: 'Demonstrate Real Products',
        body: 'Let viewers see how products genuinely look, work, fit or are used where that information is helpful.',
      },
      {
        title: 'Explain Processes You Understand',
        body: 'Use professional knowledge and practical experience to answer relevant questions through clear video.',
      },
      {
        title: 'Use Real Customer Questions as Topics',
        body: 'Recurring enquiries and conversations can reveal subjects that already matter to the people the business serves.',
      },
      {
        title: 'Show Relevant Behind-the-Scenes Detail',
        body: 'Real people, locations and processes can help viewers understand what happens behind a product, service or final result.',
      },
      {
        title: 'Share Lessons From First-Hand Experience',
        body: 'Original observations can make the video more useful than repeating general advice already common across similar accounts.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Potential TikTok Partners More Evidence Than a Public View Total',
    paragraphs: [
      'A creator may care about View counts when preparing a profile for collaborations, but professional brand decisions can involve a much wider assessment than one public metric.',
      'UK brands and agencies may consider campaign fit, creator positioning, video quality, genuine audience relevance, real watch behaviour, authentic engagement, consistency, previous partnerships, communication and reliable campaign data.',
      'If partnerships matter, build an account that can stand up to that wider review. Publish videos you are comfortable presenting professionally, make your niche easy to understand and keep genuine analytics available for legitimate discussions with potential partners.',
    ],
    footer:
      'A visible View count can be one signal. Do not present purchased Views alone as proof of influence, organic reach or campaign performance.',
  },
  'business-results': {
    title: 'Measure Business Outcomes Separately From TikTok Views',
    paragraphs: [
      'A larger displayed View count can make a video appear more watched, but it does not automatically mean the TikTok generated commercial value.',
      'A UK business may care more about ecommerce orders, customer enquiries, bookings, quote requests, calls, shop visits, website activity, qualified messages or genuine interest in a product or service.',
      'Those results depend on the video, offer, audience fit, pricing, website, reputation and customer experience as well as the wider marketing journey around the content.',
      'Track those outcomes directly. Use TikTok Views when the public View count is the metric you want to change, not as proof that leads or sales increased.',
    ],
  },
  'video-growth-framework': {
    title: 'A Practical Video Plan for Building a UK TikTok Account',
    lead: 'Views can support selected TikToks, but the value of the wider account depends on how you choose ideas, improve videos and respond to genuine audience behaviour.',
    footer:
      'Use the public View count in its proper role. Longer-term TikTok value comes from useful content, clear positioning and genuine audience response.',
    items: [
      {
        title: 'Decide What the Account Should Be Known For',
        body: 'Make the creator niche, business category, audience or recurring subject easy for a new viewer to recognise.',
      },
      {
        title: 'Choose Videos With a Clear Job',
        body: 'Separate routine publishing from launches, evergreen explainers, demonstrations and campaign videos that deserve additional attention.',
      },
      {
        title: 'Improve How the Video Begins',
        body: 'Test different openings that communicate the subject quickly enough for viewers to understand why they may want to continue.',
      },
      {
        title: 'Create Formats You Can Repeat',
        body: 'Turn genuinely useful demonstrations, walkthroughs, explainers or other successful ideas into recurring video formats.',
      },
      {
        title: 'Use Real TikTok Analytics',
        body: 'Review genuine performance information to understand which content earns real attention and meaningful audience activity.',
      },
      {
        title: 'Learn From Genuine Questions',
        body: 'Real comments and customer conversations can reveal subjects that deserve future videos.',
      },
      {
        title: 'Build the Profile Behind Every Strong TikTok',
        body: 'Make sure someone who becomes interested in one video can find more relevant content when they visit the account.',
      },
      {
        title: 'Connect TikTok With the Wider Customer Journey',
        body: 'UK businesses may use TikTok alongside Instagram, ecommerce, search visibility, paid media, email, their website and other marketing channels.',
      },
      {
        title: 'Keep Purchased Views in Perspective',
        body: 'Use Views for the displayed metric they provide while evaluating genuine audience response and business performance separately.',
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

function matchingPairsText(
  sections: StorySection[],
  ids: readonly (typeof BATCH5E_UK_IDS)[number][],
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

const usBefore = readFileSync('content/markets/us/services/buy-tiktok-views.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-tiktok-views.json');
const ukSections = loadStorySections('content/markets/uk/services/buy-tiktok-views.json');

const snapshotPath = join(tmpdir(), 'uk-tt-views-before-batch5e.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (9 sections) ===');
for (const id of BATCH5E_UK_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== visible-momentum bullets unchanged ===');
const vm = ukSections.find((s) => s.id === 'visible-momentum');
console.log(
  JSON.stringify(vm?.bullets) === JSON.stringify(VISIBLE_MOMENTUM_BULLETS) ? 'OK' : 'FAIL',
);

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = ukSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== US file unchanged ===');
const usAfter = readFileSync('content/markets/us/services/buy-tiktok-views.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (9 direct pairs) ===');
for (const ukId of BATCH5E_UK_IDS) {
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
const usMatchingText = BATCH5E_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH5E_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH5E_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (9 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH5E_UK_IDS) {
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
