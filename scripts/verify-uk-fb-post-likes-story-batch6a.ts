import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH6A_UK_IDS = [
  'built-for-uk',
  'strong-content',
  'real-activity',
  'local-businesses',
  'useful-next-step',
  'customer-proof',
  'genuine-engagement',
  'facebook-insights',
  'brand-campaigns',
  'content-framework',
] as const;

const US_PAIR: Record<(typeof BATCH6A_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'strong-content': 'strong-content',
  'real-activity': 'real-activity',
  'local-businesses': 'local-businesses',
  'useful-next-step': 'useful-next-step',
  'customer-proof': 'customer-proof',
  'genuine-engagement': 'genuine-engagement',
  'facebook-insights': 'facebook-insights',
  'brand-campaigns': 'brand-campaigns',
  'content-framework': 'content-framework',
};

const UNTOUCHED_IDS = ['campaign-content', 'organic-reach', 'metrics-distinction'] as const;

const STRONG_CONTENT_BULLETS = [
  'the image or video',
  'caption',
  'Comments',
  'Shares',
  'Page name',
  'Page information',
  'recent Page activity',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-content': 'Put More Engagement Behind Important UK Campaign Moments',
  'organic-reach': "More Facebook Post Likes Don't Automatically Mean More Reach",
  'metrics-distinction': 'Post Likes, Page Likes and Followers Are Different Metrics',
};

const BATCH2_BENEFITS_TITLE = 'Support Facebook Posts That Have Lasting Value for Your Page';

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

const EXPECTED: Record<(typeof BATCH6A_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Choose Facebook Post Likes Around the Content Your UK Page Actually Needs to Support',
    lead: 'Post Likes apply to one individual Facebook post, so the content should have a clear reason for receiving additional visible engagement.',
    paragraphs: [
      'A UK retailer may have a product launch or seasonal offer that deserves more attention than routine updates. A restaurant may be promoting a new menu, event or opening. A builder or interior business may want to highlight completed work. An estate agency may have an important property post. A creator may be supporting a collaboration, while an agency may be managing completely different campaign priorities across several client Pages.',
      'Start with the individual post rather than the package size. Decide what the content is doing for the Page, then choose the visible Like increase that fits that particular post.',
    ],
    footer:
      'Facebook Post Likes support one piece of content. The value of that content still comes from the message, offer or real activity behind it.',
    items: [
      {
        title: 'UK Local Businesses',
        body: 'Prioritise posts showing real services, products, locations, projects, events or useful updates from the business.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Use Post Likes around launches, seasonal promotions and selected shopping content rather than treating every product post equally.',
      },
      {
        title: 'Service Businesses',
        body: 'Support project showcases, educational posts, case-related content and important company announcements that accurately represent the service.',
      },
      {
        title: 'Creators',
        body: 'Choose priority Facebook content connected to genuine work, collaborations or subjects that represent the creator clearly.',
      },
      {
        title: 'Agencies',
        body: 'Select the Like quantity according to the purpose of each client post instead of applying one standard engagement number across every Page.',
      },
      {
        title: 'Established Brands',
        body: 'Use visible engagement around selected campaign posts while genuine publishing, advertising and customer communication continue separately.',
      },
    ],
  },
  'strong-content': {
    title: 'Make the Facebook Post Worth Attention Before Focusing on Its Like Count',
    lead: 'Someone viewing a Facebook post can see more than the Like number. The creative, copy, comments, Page identity and recent activity all help shape the impression of the content.',
    paragraphs: [
      'A larger visible Like count can make a selected post appear more active, but it cannot make unclear information easier to understand or make weak creative useful to potential customers.',
      'Check the post before supporting the metric. The main message should be obvious, important claims should be accurate and anyone who becomes interested should have a sensible next step.',
    ],
    footer:
      'Use Post Likes around content that already deserves attention rather than expecting the engagement number to create the value of the post.',
  },
  'real-activity': {
    title: 'Build Facebook Posts Around Activity the Business Can Actually Show',
    lead: 'Useful business content often begins with something real that happened, changed, launched, sold, opened, completed or needed explaining.',
    footer:
      'Post Likes can support the presentation of this content. Genuine business activity gives the post substance.',
    items: [
      {
        title: 'Completed Work',
        body: 'Show real projects, installations, transformations or other work the business has genuinely completed.',
      },
      {
        title: 'Products Currently Offered',
        body: 'Use accurate images, details and availability for products customers can actually buy or enquire about.',
      },
      {
        title: 'Real Business Updates',
        body: 'Share openings, expansions, milestones, team changes or other genuine company developments when they are relevant to customers.',
      },
      {
        title: 'Current Events',
        body: 'Publish correct dates, locations, booking information and other details people need before attending.',
      },
      {
        title: 'Questions Customers Ask',
        body: 'Turn recurring enquiries into useful posts that explain a service, process, policy or decision clearly.',
      },
      {
        title: 'Behind-the-Scenes Activity',
        body: 'Show relevant people, locations or processes when they help customers better understand how the business operates.',
      },
      {
        title: 'Professional Experience',
        body: 'Use genuine knowledge to explain subjects that matter to the people considering the business or service.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use Facebook Post Likes Around Content That Helps Explain a Local UK Business',
    paragraphs: [
      'For a local company, Facebook can help a potential customer see recent work, current offers, important updates and the type of service or experience the business provides.',
      'A restaurant can feature a new dish or event. A builder can show a completed renovation. A salon can present recent work. A retailer can introduce new stock. An estate agent can highlight a property. An interior designer can show a finished room. A tourism company can promote a current experience. A professional service can answer a question customers regularly ask.',
      'If you add Likes to one of these posts, make sure the Facebook Page behind it is useful as well. Contact information, website links, locations, opening details and service information should remain accurate.',
    ],
    footer:
      'Visible engagement can support presentation of the post. Local confidence comes from the real company and the information customers find behind it.',
  },
  'useful-next-step': {
    title: 'Make It Clear What an Interested Facebook User Should Do Next',
    lead: 'A post may attract attention, but the Page still needs to help an interested person move from the content towards useful information or a real business action.',
    footer:
      'Post Likes support visible interaction around the selected content. The Page, offer and destination determine whether that attention becomes commercially useful.',
    items: [
      {
        title: 'Keep Essential Page Details Accurate',
        body: 'Check the website, telephone number, location and other customer-facing information before putting more attention behind the post.',
      },
      {
        title: 'Explain the Offer Properly',
        body: 'If the post promotes a product, service, event or offer, make the important details easy to understand.',
      },
      {
        title: 'Link to the Right Place',
        body: 'Send interested users to the relevant product, service, booking, enquiry or information page rather than an unrelated destination.',
      },
      {
        title: 'Handle Genuine Questions Properly',
        body: 'Real customer comments and messages should receive accurate responses from the business or Page manager.',
      },
      {
        title: 'Give Visitors More Useful Content to Explore',
        body: 'Someone who opens the wider Facebook Page should find other recent posts that help them understand the business.',
      },
    ],
  },
  'customer-proof': {
    title: 'Keep Facebook Post Likes Separate From Genuine Customer Evidence',
    paragraphs: [
      'A larger Like count may make a post appear more active, but it does not show whether real customers have bought from, hired or recommended the business.',
      'UK businesses may have genuine customer evidence through verified reviews, Facebook Recommendations, authentic testimonials, completed projects, case studies, real customer comments, customer photos and accurate public business information.',
      'Use real proof when it exists. Do not present purchased Post Likes as customer approval, organic engagement or evidence that customers recommend the company.',
    ],
    footer:
      'Post Likes and customer proof serve different purposes. Keep the two signals separate so visitors are not given a misleading impression.',
  },
  'genuine-engagement': {
    title: 'Purchased Post Likes and Real Facebook Interaction Should Be Measured Separately',
    paragraphs: [
      'A purchased Post Likes package changes the visible Like number on the selected eligible Facebook post. Genuine interaction comes from real people independently choosing to respond to the Page or content.',
      'Real users may leave Comments, share a post, click a link, follow the Page, Like the Page, send a message, visit the website, make an enquiry, book or purchase something.',
      'Do not assume those actions are included with a Post Likes order. Measure genuine engagement and business activity independently when reviewing how the content performed.',
    ],
  },
  'facebook-insights': {
    title: 'Use Real Facebook Data to Understand Which Posts Actually Perform',
    lead: 'If your Page provides performance information, use that genuine data to learn what your audience responds to instead of judging every post by its public Like count.',
    footer:
      'Purchased Post Likes affect one visible metric. Genuine Page data and business outcomes should guide your wider publishing decisions.',
    items: [
      {
        title: 'Compare Topics and Post Types',
        body: 'Look for patterns in the subjects, formats and messages that genuinely perform better with your audience.',
      },
      {
        title: 'Separate Purchased Likes From Real Interaction',
        body: 'Review authentic Comments, Shares, clicks and other available activity independently from the purchased Like number.',
      },
      {
        title: 'Test Different Creative Approaches',
        body: 'Compare images, video, offers, educational posts and other formats to understand what genuine users respond to.',
      },
      {
        title: 'Connect Posts to Campaign Objectives',
        body: 'Judge campaign content against the real objective, such as enquiries, website activity, event interest, bookings or sales where relevant.',
      },
      {
        title: 'Use the Findings in Future Publishing',
        body: 'Let genuine performance information influence what the Page creates, improves and prioritises next.',
      },
    ],
  },
  'brand-campaigns': {
    title: 'Keep Facebook Post Likes Clear Inside Wider UK Campaign Reporting',
    paragraphs: [
      'For brands and agencies, a Facebook post may sit inside a much larger campaign involving paid social, Instagram, TikTok, ecommerce, search, email, creator activity and the company website.',
      'If purchased Post Likes are used around one campaign asset, record them as the metric they actually are instead of combining them with organic performance.',
      'Keep purchased Likes, genuine engagement, organic reach, paid reach, Page growth, website activity and commercial outcomes separate in reporting. That gives clients and internal teams a clearer picture of what each part of the campaign produced.',
    ],
  },
  'content-framework': {
    title: 'A Practical Facebook Content Plan for UK Businesses',
    lead: 'Post Likes can support individual content, but a useful Facebook presence depends on what the business publishes and what customers can do after seeing it.',
    footer:
      'Use Post Likes for the visible metric they provide. Judge the wider Facebook strategy using genuine audience behaviour and real business outcomes.',
    items: [
      {
        title: 'Decide the Job of the Post',
        body: 'Know whether the content is meant to inform, demonstrate, promote, announce, educate or direct customers towards another action.',
      },
      {
        title: 'Identify the Posts That Matter Most',
        body: 'Separate normal Page updates from launches, important offers, strong project content and campaign assets that deserve additional attention.',
      },
      {
        title: 'Use Genuine Business Material',
        body: 'Build posts around real products, services, completed work, company activity and knowledge the business can support.',
      },
      {
        title: 'Make the Creative Easy to Understand',
        body: 'Use an image or video that communicates the subject clearly and matches the message in the post.',
      },
      {
        title: 'Write Copy That Helps the Reader',
        body: 'Include the information someone genuinely needs rather than filling the caption with vague promotional language.',
      },
      {
        title: 'Provide a Useful Next Action',
        body: 'Make it obvious how an interested person can learn more, enquire, book, shop or contact the business.',
      },
      {
        title: 'Respond to Genuine Customers',
        body: 'Treat real Comments and messages as genuine customer conversations rather than simply additional engagement numbers.',
      },
      {
        title: 'Review Actual Performance',
        body: 'Use real Facebook data and business results to understand which posts contribute something useful.',
      },
      {
        title: 'Connect Facebook With Wider Marketing',
        body: 'UK businesses may use Facebook alongside their website, search visibility, Google Ads, Instagram, TikTok, email, ecommerce and other paid media.',
      },
      {
        title: 'Keep the Post Like Number in Perspective',
        body: 'Visible Likes can support one post, but the quality of the Page, business and customer journey determine the wider value of Facebook activity.',
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

function loadBenefits(path: string): unknown {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as { content?: { benefits?: unknown } };
  return raw.content?.benefits;
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
  ids: readonly (typeof BATCH6A_UK_IDS)[number][],
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

const ukPath = 'content/markets/uk/services/buy-facebook-post-likes.json';
const usBefore = readFileSync('content/markets/us/services/buy-facebook-post-likes.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-facebook-post-likes.json');
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'uk-fb-post-likes-before-batch6a.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (10 sections) ===');
for (const id of BATCH6A_UK_IDS) {
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

console.log('\n=== Batch 2 benefits unchanged ===');
const benefitsNow = loadBenefits(ukPath) as { title?: string };
const benefitsBefore = existsSync(snapshotPath) ? loadBenefits(snapshotPath) : null;
const benefitsOk =
  benefitsNow?.title === BATCH2_BENEFITS_TITLE &&
  (benefitsBefore === null ||
    JSON.stringify(benefitsNow) === JSON.stringify(benefitsBefore));
console.log(benefitsOk ? 'OK' : 'FAIL');

console.log('\n=== US file unchanged ===');
const usAfter = readFileSync('content/markets/us/services/buy-facebook-post-likes.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (10 direct pairs) ===');
for (const ukId of BATCH6A_UK_IDS) {
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
const usMatchingText = BATCH6A_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH6A_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH6A_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (10 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH6A_UK_IDS) {
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

const allPass = pass === 10 && benefitsOk;
console.log(`\n${pass}/10 exact-copy checks passed`);
process.exit(allPass ? 0 : 1);
