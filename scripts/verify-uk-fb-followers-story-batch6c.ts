import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH6C_UK_IDS = [
  'built-for-uk',
  'local-businesses',
  'better-page',
  'page-trust',
  'customer-proof',
  'facebook-insights',
  'brand-credibility',
  'growth-framework',
] as const;

const US_PAIR: Record<(typeof BATCH6C_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'local-businesses': 'local-businesses',
  'better-page': 'better-page',
  'page-trust': 'page-trust',
  'customer-proof': 'customer-proof',
  'facebook-insights': 'facebook-insights',
  'brand-credibility': 'brand-credibility',
  'growth-framework': 'growth-framework',
};

const UNTOUCHED_IDS = ['campaign-moments', 'followers-vs-likes', 'reach-not-same'] as const;

const LOCAL_BUSINESSES_BULLETS = [
  'recent activity',
  'services',
  'opening information',
  'products',
  'projects',
  'events',
  'customer comments',
  'contact details',
  'location information',
  'whether the business still appears active',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-moments': 'Use Facebook Followers Around Important UK Campaign Moments',
  'followers-vs-likes': 'Followers, Page Likes and Post Likes Are Different Metrics',
  'reach-not-same': "More Facebook Followers Don't Automatically Mean More Reach",
};

const BATCH2_BENEFITS_TITLE = 'Build Follower Count Around a Facebook Page That Looks Current';

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

const EXPECTED: Record<(typeof BATCH6C_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Build Facebook Followers Around the UK Page You Actually Have',
    lead: 'Facebook Followers are a Page-level audience metric, so the right quantity depends on the type of Page, its current activity and what visitors are likely to find there.',
    paragraphs: [
      'A UK local business may use Facebook for customer information, projects and community updates. An ecommerce brand may use its Page around launches and promotional periods. A service company may publish completed work and practical advice. A restaurant or venue may share events and opening details. A creator may maintain Facebook alongside other social channels, while an agency may manage several client Pages with very different audience goals.',
      'Start with the Page as it exists today. Review its current follower count, content, business information and purpose before deciding what visible audience increase makes sense.',
    ],
    footer:
      'Followers can support the visible size of the Page audience. The value of that audience number still depends on the business, content and information behind it.',
    items: [
      {
        title: 'UK Local Businesses',
        body: 'Build the visible audience around a Page that accurately explains services, locations, contact details and recent business activity.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Use follower growth alongside launches, seasonal promotions and a Facebook presence connected to genuine products and offers.',
      },
      {
        title: 'Service Businesses',
        body: 'Support a Page that shows real work, answers useful questions and helps potential customers understand what the company provides.',
      },
      {
        title: 'Creators',
        body: 'Use Followers as one Page-level signal while continuing to publish content that gives people a reason to explore the creator or subject further.',
      },
      {
        title: 'Agencies',
        body: "Choose follower quantities according to each client's current Page, campaign priorities and existing audience rather than applying one standard target.",
      },
      {
        title: 'Established Brands',
        body: 'Support Page presentation while genuine publishing, advertising, customer communication and wider brand activity continue separately.',
      },
    ],
  },
  'local-businesses': {
    title: 'Make the Facebook Page Useful to People Checking a Local UK Business',
    lead: 'Someone may visit a local Facebook Page after seeing the company in search, an advert, another social network, a recommendation or a shared post. The follower number is only one signal they can inspect.',
    paragraphs: [
      'A restaurant may share current menus or opening updates. A builder can show completed work. A salon may present recent services. A retailer can introduce new stock. An estate agent may feature properties. A fitness business can publish class information. Professional services can answer questions customers regularly ask.',
    ],
    footer:
      'A stronger follower number can support Page presentation. Accurate information, current content and the genuine business determine whether the Page deserves trust.',
  },
  'better-page': {
    title: 'Make the Facebook Page Better Before Focusing on a Bigger Audience Number',
    lead: 'If follower growth makes the Page appear more established, the rest of the Facebook presence should give new visitors enough useful information to understand what they have found.',
    footer:
      'Followers can support audience presentation. Strong Page management gives that audience number meaningful context.',
    items: [
      {
        title: 'Explain What the Page Represents',
        body: 'Use the About information and visible Page details to make the business, creator or organisation easy to understand.',
      },
      {
        title: 'Check Contact and Website Details',
        body: 'Keep telephone numbers, links, locations and other customer-facing information accurate before sending more attention towards the Page.',
      },
      {
        title: 'Show That the Page Is Active',
        body: 'Recent relevant posts help visitors see that the Facebook presence is still being maintained.',
      },
      {
        title: 'Use Clear Page Branding',
        body: 'Profile and cover images should help visitors recognise the business or organisation and match its other official channels.',
      },
      {
        title: 'Keep Important Information Easy to Find',
        body: 'Make launches, events, offers, service information and other priority updates visible when they matter to customers.',
      },
      {
        title: 'Give Interested Visitors Somewhere to Go',
        body: 'For business Pages, make the next action clear whether that means visiting the website, enquiring, shopping, booking or making contact.',
      },
    ],
  },
  'page-trust': {
    title: 'Give the Facebook Page Credibility Beyond Its Follower Count',
    lead: 'A larger audience number may influence the first impression of a Page, but genuine credibility comes from what customers can verify about the company or creator behind it.',
    footer:
      'Followers can contribute to visible social proof. Real business activity, accurate information and genuine customer experience create deeper trust.',
    items: [
      {
        title: 'Show Genuine Activity',
        body: 'Use real projects, products, events, team updates and company developments rather than relying only on promotional claims.',
      },
      {
        title: 'Keep Public Information Accurate',
        body: 'Make sure contact details, locations, services and other important information reflect the real business.',
      },
      {
        title: 'Publish Content That Helps Visitors',
        body: 'Answer questions, explain services, share updates and provide useful context for people considering the company.',
      },
      {
        title: 'Respond Properly to Genuine Customers',
        body: 'Real Comments and messages should be treated as real customer or community conversations.',
      },
      {
        title: 'Keep the Brand Consistent',
        body: 'The Facebook Page should align with the website and other official profiles so visitors receive a consistent picture of the business.',
      },
    ],
  },
  'customer-proof': {
    title: 'Keep Facebook Followers Separate From Genuine Customer Evidence',
    paragraphs: [
      'A larger follower count can make a Page appear more established, but it does not show whether real customers have used, recommended or been satisfied with the business.',
      'For UK companies, genuine customer evidence may include verified reviews, authentic Facebook Recommendations, real testimonials, customer photos, completed projects, case studies, genuine comments and responsive customer service.',
      'Use that proof when it genuinely exists. Do not present purchased Followers as customer approval or create invented testimonials simply to make the Page look more credible.',
    ],
    footer:
      'Followers support one visible audience metric. Genuine customer experience provides a different and more meaningful form of proof.',
  },
  'facebook-insights': {
    title: 'Use Genuine Facebook Data to Understand the Audience You Are Building',
    lead: 'A purchased follower package changes the visible follower number. If Page or Meta performance data is available, use genuine information to understand what real users actually respond to.',
    footer:
      'Keep purchased follower growth separate from organic performance analysis. Use real Page data to guide future content and marketing decisions.',
    items: [
      {
        title: 'Compare Content Topics',
        body: 'Look for genuine patterns in the subjects and updates that attract useful audience activity.',
      },
      {
        title: 'Compare Creative Formats',
        body: 'Review how real users respond to images, video, links and other types of Page content.',
      },
      {
        title: 'Learn From Real Interaction',
        body: 'Genuine Comments, reactions, Shares and messages can reveal what the actual audience cares about.',
      },
      {
        title: 'Track Organic Audience Movement Separately',
        body: 'Review genuine follower trends independently from Followers added through a purchased package.',
      },
      {
        title: 'Use the Findings in Future Publishing',
        body: 'Let real Page performance influence which topics, formats and campaigns receive more attention next.',
      },
    ],
  },
  'brand-credibility': {
    title: 'A Facebook Follower Number Is Only One Part of Business Credibility',
    paragraphs: [
      'Follower count may contribute to how established a Facebook Page looks when someone first visits, but customers, suppliers and potential partners can evaluate much more than the audience number.',
      'They may also notice whether the Page is complete, whether recent content is relevant, what genuine reviews and Recommendations say, how the business responds to customers, whether the website looks credible and whether public information is consistent across official channels.',
      "A Page with a larger follower count can still create a poor impression if the information is outdated or the business behind it is difficult to verify. Build the entire Facebook presence rather than asking one metric to carry the brand's credibility.",
    ],
  },
  'growth-framework': {
    title: 'A Practical Facebook Audience Plan for UK Businesses',
    lead: 'Followers can support the visible audience around a Facebook Page, but a stronger presence depends on accurate information, relevant content and genuine interaction with the people the business actually serves.',
    footer:
      'Keep Facebook Followers in their proper role as one visible audience metric. Judge wider Page growth using real audience behaviour and business results.',
    items: [
      {
        title: 'Get the Page Basics Right',
        body: 'Review the business name, About information, website, contact details, locations and other information visitors may rely on.',
      },
      {
        title: 'Create a Useful Content Mix',
        body: 'Combine genuine updates, educational posts, projects, offers, events and other information relevant to customers or the community.',
      },
      {
        title: 'Show Real Business Activity',
        body: 'Use products, services, completed work and genuine company developments to show what is actually happening behind the Page.',
      },
      {
        title: 'Respond to Genuine People',
        body: 'Treat real Comments, Recommendations and messages as conversations rather than simply additional engagement numbers.',
      },
      {
        title: 'Use Genuine Customer Proof',
        body: 'Real reviews, Recommendations, projects and customer experiences can provide context a follower count cannot create by itself.',
      },
      {
        title: 'Review Actual Page Performance',
        body: 'Use genuine Facebook information and business data to understand which content and activity produce useful results.',
      },
      {
        title: 'Connect Facebook With Wider Marketing',
        body: 'UK businesses may use Facebook alongside their website, Google, search visibility, Instagram, TikTok, paid media, ecommerce and email.',
      },
      {
        title: 'Keep Purchased Followers in Perspective',
        body: 'Use Followers for the visible audience metric they provide while measuring organic Page growth, customer behaviour and commercial outcomes separately.',
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
  ids: readonly (typeof BATCH6C_UK_IDS)[number][],
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

const ukPath = 'content/markets/uk/services/buy-facebook-followers.json';
const usBefore = readFileSync('content/markets/us/services/buy-facebook-followers.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-facebook-followers.json');
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'uk-fb-followers-before-batch6c.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (8 sections) ===');
for (const id of BATCH6C_UK_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== local-businesses bullets unchanged ===');
const lb = ukSections.find((s) => s.id === 'local-businesses');
console.log(
  JSON.stringify(lb?.bullets) === JSON.stringify(LOCAL_BUSINESSES_BULLETS) ? 'OK' : 'FAIL',
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
const usAfter = readFileSync('content/markets/us/services/buy-facebook-followers.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (8 direct pairs) ===');
for (const ukId of BATCH6C_UK_IDS) {
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
const usMatchingText = BATCH6C_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH6C_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH6C_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (8 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH6C_UK_IDS) {
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

const allPass = pass === 8 && benefitsOk;
console.log(`\n${pass}/8 exact-copy checks passed`);
process.exit(allPass ? 0 : 1);
