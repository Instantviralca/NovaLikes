import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH5C_UK_IDS = [
  'built-for-uk',
  'visible-momentum',
  'watch-behaviour',
  'reels-worth-watching',
  'profile-experience',
  'local-businesses',
  'real-experience',
  'brand-partnerships',
] as const;

const US_PAIR: Record<(typeof BATCH5C_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'visible-momentum': 'visible-momentum',
  'watch-behaviour': 'video-performance',
  'reels-worth-watching': 'reels-worth-watching',
  'profile-experience': 'profile-experience',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
  'brand-partnerships': 'brand-partnerships',
};

const UNTOUCHED_IDS = [
  'uk-campaign-moments',
  'organic-reach',
  'customer-proof',
  'instagram-insights',
  'growth-framework',
] as const;

const VISIBLE_MOMENTUM_BULLETS = [
  'the video itself',
  'Likes',
  'Comments',
  'caption',
  'creator or business profile',
  'overall account activity',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'uk-campaign-moments': 'Put More Views Behind Important UK Campaign Moments',
  'organic-reach': 'Views and Organic Reach Are Not the Same Thing',
  'customer-proof': 'Use Views Alongside Genuine Customer Proof',
  'instagram-insights': 'Use Instagram Insights to Understand Real Video Performance',
  'growth-framework': 'A Practical Instagram Reel Growth Framework for UK Accounts',
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

const EXPECTED: Record<(typeof BATCH5C_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Choose Instagram Views Around the Videos That Matter to Your UK Account',
    lead: 'A View package works on an individual Reel or eligible video, so the reason for supporting that content should come before the size of the number.',
    paragraphs: [
      'A UK creator may have one Reel that introduces their subject or strongest work particularly well. An online retailer may be using video for a new collection, demonstration or seasonal campaign. A local company might have a project walkthrough, service explanation or business introduction that deserves more attention. Agencies can face completely different video priorities across separate client accounts.',
      'Start with the video you actually want people to notice. Decide why that Reel matters to the account or campaign, then choose the visible View increase that fits that specific content.',
    ],
    footer:
      'Views belong to the selected video. The purpose of the video should determine whether increasing that number makes sense.',
    items: [
      {
        title: 'UK Creators',
        body: 'Prioritise Reels that communicate your niche, expertise, personality or creative direction clearly to someone discovering the account.',
      },
      {
        title: 'Online Retailers and Ecommerce Brands',
        body: 'Use Views around product demonstrations, launches, seasonal campaigns and videos that help customers understand what is being sold.',
      },
      {
        title: 'Local Businesses',
        body: 'Support videos showing genuine services, projects, locations, products or current activity from the real company behind the account.',
      },
      {
        title: 'Agencies and Client Accounts',
        body: 'Choose View quantities according to the role of each client video rather than applying the same number to every campaign.',
      },
      {
        title: 'Established Brands',
        body: 'Put additional visible Views behind selected campaign videos while publishing, advertising and genuine audience activity continue separately.',
      },
    ],
  },
  'visible-momentum': {
    title: 'Give a Strong Reel More Context When Someone Discovers It',
    lead: 'The View count is visible when someone watches an Instagram Reel, but viewers can also judge the opening, message, caption and profile connected to the video.',
    paragraphs: [
      'A larger visible View total can make selected content appear more watched, but it cannot explain a confusing idea, improve poor visuals or make an irrelevant video useful to the audience.',
      'Check the Reel itself before supporting the number. The opening should make sense quickly, the main subject should remain clear and anyone who becomes interested should be able to understand the account behind the video.',
    ],
    footer:
      'Use Views to support a Reel that already has a reason to be watched rather than expecting the public number to create that reason.',
  },
  'watch-behaviour': {
    title: 'Measure Real Video Interest Separately From the Public View Count',
    lead: 'Purchased Views change the number displayed on eligible video content. Genuine viewing behaviour answers different questions about whether real people found the Reel useful, interesting or worth exploring further.',
    footer:
      'Keep purchased Views separate from genuine performance analysis. Use your actual Instagram data to understand how real viewers respond.',
    items: [
      {
        title: 'Do Real Viewers Stay With the Reel?',
        body: 'Look at the genuine viewing information available to understand whether people remain long enough to receive the main message.',
      },
      {
        title: 'Do People Share It?',
        body: 'Voluntary shares can show that viewers found the video relevant enough to send to another person.',
      },
      {
        title: 'Do People Save It?',
        body: 'Saves may indicate that genuine users want to return to the information, idea or inspiration later.',
      },
      {
        title: 'What Do Genuine Comments Say?',
        body: 'Real questions and reactions can reveal whether viewers understood the subject and what they want to know next.',
      },
      {
        title: 'Does the Reel Lead to Profile Activity?',
        body: 'Check whether genuine interest in the video encourages people to explore the wider account.',
      },
      {
        title: 'Does the Content Earn Organic Followers?',
        body: 'Use genuine account data to understand which videos persuade real viewers to follow by choice.',
      },
    ],
  },
  'reels-worth-watching': {
    title: 'Make the Reel Worth Watching Even Without the View Number',
    lead: 'If video is important to the account, improve the parts that determine whether a genuine viewer understands the idea and wants to continue watching.',
    footer:
      'Purchased Views affect one displayed metric. The quality, relevance and structure of the Reel determine what genuine viewers experience.',
    items: [
      {
        title: 'Make the First Seconds Understandable',
        body: 'Give viewers enough information early to understand the subject without forcing them through a long introduction.',
      },
      {
        title: 'Bring the Main Value Forward',
        body: 'If there is a result, demonstration, product, idea or useful answer, do not hide it until the end without a reason.',
      },
      {
        title: 'Keep One Main Direction',
        body: 'A focused Reel is often easier to follow than a short video trying to communicate several unrelated messages.',
      },
      {
        title: 'Use the Visual Format Properly',
        body: 'Show the process, place, product, person or result when seeing it is more useful than only describing it.',
      },
      {
        title: 'Keep Text Easy to Process',
        body: 'On-screen wording should help viewers understand the video rather than covering the creative with too much information.',
      },
      {
        title: 'Develop Formats You Can Repeat',
        body: 'If genuine viewers respond well to demonstrations, explainers, walkthroughs or another recurring format, develop more content around that idea.',
      },
      {
        title: 'Learn From Real Viewing Data',
        body: 'Use genuine Instagram analytics to identify which subjects and video structures actually hold audience attention.',
      },
    ],
  },
  'profile-experience': {
    title: 'Make the Instagram Profile Ready for Viewers Who Want to See More',
    lead: 'A strong Reel can become the entry point to the rest of an account. If a genuine viewer becomes curious enough to visit the profile, make that second step useful.',
    footer:
      'Views can support the selected Reel. The profile determines whether an interested viewer finds anything relevant after watching it.',
    items: [
      {
        title: 'Explain the Account in the Bio',
        body: 'A visitor should quickly understand the creator, company or subject behind the Reel.',
      },
      {
        title: 'Pin Content That Introduces You Well',
        body: 'Use pinned posts and Reels to make important work, services, products or evergreen information easier to find.',
      },
      {
        title: 'Keep the Wider Content Relevant',
        body: 'Someone interested in one Reel should be able to find other posts connected to the same creator niche, business or subject.',
      },
      {
        title: 'Show That the Account Is Current',
        body: 'Recent activity gives a new visitor more evidence that the profile is still being actively managed.',
      },
      {
        title: 'Give Business Visitors a Clear Route Forward',
        body: 'For commercial accounts, make it easy to visit the website, enquire, book, shop, call or take another relevant next action.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use Instagram Views Around Videos That Show What a Local UK Business Does',
    paragraphs: [
      'Video can be particularly useful for a local business because potential customers may want to see the service, place, product or result rather than only read about it.',
      'A restaurant can show food preparation or the dining environment. A builder can record a project transformation. An interior designer can walk viewers through a completed space. A salon can show relevant work. A retailer can demonstrate new stock. An estate agent can create a property walkthrough. A fitness business can show facilities or classes. A tourism company can present an experience. Professional services can answer frequent customer questions through short explainers.',
      'If you add Views to one of these videos, keep the account behind it accurate. The location, service information, offer, website and contact details should still match the genuine business a potential customer will find next.',
    ],
    footer:
      'Visible Views can support presentation of the Reel. Local confidence depends on the real business and the information behind the video.',
  },
  'real-experience': {
    title: 'Use Video to Show Experience That the Account Can Actually Support',
    lead: 'A Reel becomes more useful when the creator or business has something genuine to demonstrate, explain or show from first-hand experience.',
    footer:
      'Views can strengthen one visible signal around the Reel. Genuine work and knowledge give viewers a reason to care about the content itself.',
    items: [
      {
        title: 'Document Genuine Projects',
        body: 'Show completed work, transformations or real examples instead of relying only on broad promotional claims.',
      },
      {
        title: 'Demonstrate Products Properly',
        body: 'Let viewers see how a real product looks, works, fits or is used where that information is relevant.',
      },
      {
        title: 'Explain Processes You Know',
        body: 'Turn genuine professional knowledge into clear videos that help viewers understand how something works.',
      },
      {
        title: 'Answer Recurring Customer Questions',
        body: 'Use questions from real enquiries, customers or consultations as ideas for practical Reel topics.',
      },
      {
        title: 'Show the People and Process Behind the Work',
        body: 'Relevant behind-the-scenes content can help viewers understand the real team, environment or process behind a business.',
      },
      {
        title: 'Share First-Hand Lessons',
        body: 'Original observations from genuine experience can offer more value than repeating general advice found across similar accounts.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Brand Partners More Evidence Than a Public View Count',
    paragraphs: [
      'A creator may care about how many Views appear on a Reel when preparing for commercial collaborations, but professional partnership decisions can involve far more than that number.',
      'UK brands and agencies may consider campaign fit, creator positioning, content quality, genuine audience relevance, real watch behaviour, authentic interactions, consistency, previous partnerships, communication and reliable performance information.',
      'If brand work matters to you, prepare the wider account for that assessment. Publish video you are comfortable presenting professionally, make the creator niche easy to understand and keep genuine analytics available where appropriate.',
    ],
    footer:
      'Views can be one visible metric. Do not present the purchased View total by itself as proof of influence, organic reach or campaign performance.',
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
  ids: readonly (typeof BATCH5C_UK_IDS)[number][],
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

const usBefore = readFileSync('content/markets/us/services/buy-instagram-views.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-instagram-views.json');
const ukSections = loadStorySections('content/markets/uk/services/buy-instagram-views.json');

const snapshotPath = join(tmpdir(), 'uk-ig-views-before-batch5c.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (8 sections) ===');
for (const id of BATCH5C_UK_IDS) {
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
const usAfter = readFileSync('content/markets/us/services/buy-instagram-views.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (8 direct pairs) ===');
for (const ukId of BATCH5C_UK_IDS) {
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
const usMatchingText = BATCH5C_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH5C_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH5C_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (8 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH5C_UK_IDS) {
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

console.log(`\n${pass}/8 exact-copy checks passed`);
process.exit(pass === 8 ? 0 : 1);
