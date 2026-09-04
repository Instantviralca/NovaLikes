import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH6B_UK_IDS = [
  'built-for-uk',
  'local-businesses',
  'page-worth-exploring',
  'social-proof',
  'customer-proof',
  'content-people-need',
  'brands-agencies',
  'growth-framework',
] as const;

const US_PAIR: Record<(typeof BATCH6B_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'local-businesses': 'local-businesses',
  'page-worth-exploring': 'page-worth-exploring',
  'social-proof': 'social-proof',
  'customer-proof': 'customer-proof',
  'content-people-need': 'content-people-need',
  'brands-agencies': 'brands-agencies',
  'growth-framework': 'growth-framework',
};

const UNTOUCHED_IDS = ['campaign-moments', 'page-likes-vs-followers', 'reach-not-same'] as const;

const LOCAL_BUSINESSES_BULLETS = [
  'recent business activity',
  'services',
  'products',
  'opening information',
  'projects',
  'events',
  'customer feedback',
  'contact details',
  'location information',
  'whether the business appears active',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-moments': 'Put Page Likes Behind Important UK Business Moments',
  'page-likes-vs-followers': 'Page Likes and Facebook Followers Are Different Metrics',
  'reach-not-same': "More Facebook Page Likes Don't Automatically Mean More Reach",
};

const BATCH2_BENEFITS_TITLE = 'Give Your Facebook Page Like Count a Stronger Foundation';

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

const EXPECTED: Record<(typeof BATCH6B_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Build Facebook Page Likes Around the UK Page You Actually Manage',
    lead: 'A Facebook Page Like is a Page-level metric, so the right context depends on the business, brand, creator or organisation behind that Page.',
    paragraphs: [
      'A local company may use Facebook to publish customer information, recent work and community updates. An ecommerce brand may use its Page around launches and seasonal campaigns. A service business may explain what it does and show completed projects. A venue may publish events and opening details. A creator may maintain Facebook alongside other social platforms, while an agency may manage Pages with completely different commercial objectives.',
      'Start with the current Page rather than an arbitrary target number. Look at how complete the Page is, what it publishes and what a visitor is likely to find before choosing the visible Like increase you want.',
    ],
    footer:
      'Page Likes can support one visible Page metric. The usefulness and credibility of the Facebook presence still depend on what sits behind that number.',
    items: [
      {
        title: 'UK Local Businesses',
        body: 'Build the visible Page around accurate services, locations, contact information and recent activity potential customers can check.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Use Page growth alongside product launches, seasonal campaigns and a Facebook presence that directs customers towards genuine products and offers.',
      },
      {
        title: 'Service Businesses',
        body: 'Keep the Page useful with real projects, service information, customer questions and other content that helps explain what the company provides.',
      },
      {
        title: 'Creators',
        body: 'Use Page Likes as one profile-level signal while continuing to publish content that makes the creator and subject of the Page easy to understand.',
      },
      {
        title: 'Agencies',
        body: 'Choose quantities according to the current state and objective of each individual client Page instead of applying the same target everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Support Page presentation while genuine content, paid campaigns, customer service and wider marketing continue separately.',
      },
    ],
  },
  'local-businesses': {
    title: 'Make the Facebook Page Useful to People Checking a Local UK Business',
    lead: 'A potential customer may reach a local Facebook Page from search, an advert, another social platform, a recommendation or a direct link. The Like count is only one part of what they can inspect.',
    paragraphs: [
      'Different businesses need different Page content. A restaurant may publish menus, opening information and events. A builder may show completed work. A salon can present recent services. A retailer may introduce new stock. An estate agency can feature properties. A fitness business may publish classes. Professional services can answer recurring customer questions.',
    ],
    footer:
      'Page Likes can help the Facebook presence appear more developed. Accurate business information, current activity and genuine customer experience determine whether the Page is actually useful.',
  },
  'page-worth-exploring': {
    title: 'Give New Page Visitors More Than a Like Count to Explore',
    lead: 'If someone becomes interested enough to open the Facebook Page, make sure the account gives them enough information to understand who is behind it and what they can do next.',
    footer:
      'The Page Like number can support presentation. The quality and clarity of the Page determine what a visitor finds after arriving.',
    items: [
      {
        title: 'Explain the Page Clearly',
        body: 'Make the business, brand, creator or organisation easy to identify from the Page information and visible presentation.',
      },
      {
        title: 'Check Customer-Facing Details',
        body: 'Keep website links, telephone numbers, locations, opening information and other important details accurate.',
      },
      {
        title: 'Show Current Activity',
        body: 'Recent posts give visitors more evidence that the Page is still actively used and managed.',
      },
      {
        title: 'Use Recognisable Page Visuals',
        body: 'Profile and cover imagery should help visitors recognise the company or organisation rather than create confusion about the Page.',
      },
      {
        title: 'Publish Content With a Job',
        body: 'Use updates, educational posts, projects, offers, events and other content that gives visitors useful context about the Page.',
      },
      {
        title: 'Make the Next Action Obvious',
        body: 'If the Page represents a business, make it straightforward for interested visitors to enquire, book, shop, call or learn more.',
      },
    ],
  },
  'social-proof': {
    title: 'Treat Facebook Page Likes as a Visible Signal, Not a Reputation Score',
    lead: 'A larger Page Like count may influence how established a Facebook Page looks at first glance, but it does not tell visitors what experience real customers have had.',
    footer:
      'Use Page Likes for the visible metric they provide. Build actual reputation through genuine customer experiences and evidence the business can support.',
    items: [
      {
        title: 'Customer Reviews',
        body: 'Use genuine feedback from people who have actually dealt with the business where that evidence is available.',
      },
      {
        title: 'Facebook Recommendations',
        body: 'Authentic Recommendations can give potential customers useful context about real experiences with the company.',
      },
      {
        title: 'Real Testimonials',
        body: 'Publish customer comments only when they genuinely come from the person or organisation being represented.',
      },
      {
        title: 'Evidence of Real Work',
        body: 'Projects, products, results and other genuine examples can help visitors understand what the business actually does.',
      },
      {
        title: 'Responsive Communication',
        body: 'How the business handles genuine questions, messages and customer issues can matter more than the Page Like number itself.',
      },
    ],
  },
  'customer-proof': {
    title: 'Keep Page Likes Separate From the Evidence Customers Actually Use',
    lead: 'If a UK business has genuine proof of its work or customer experience, make that evidence clear without confusing it with purchased Page growth.',
    footer:
      'Page Likes describe one visible Facebook metric. Genuine customer evidence answers a different question about the company behind the Page.',
    items: [
      {
        title: 'Verified Customer Feedback',
        body: 'Use genuine reviews from customers who have actually used the product, service or business.',
      },
      {
        title: 'Real Facebook Recommendations',
        body: 'Authentic Recommendations can help potential customers understand experiences other people chose to share.',
      },
      {
        title: 'Customer Testimonials',
        body: 'Use real customer statements accurately and avoid inventing quotes simply to make the Page look more trustworthy.',
      },
      {
        title: 'Completed Work',
        body: 'Show projects, installations, transformations or other results the company has genuinely delivered.',
      },
      {
        title: 'Customer-Created Content',
        body: 'Real photos and other customer contributions can provide additional context when they are authentic and appropriate to use.',
      },
      {
        title: 'Case Studies',
        body: 'Businesses and professional services can explain genuine situations, work and outcomes without relying on vague claims.',
      },
      {
        title: 'Consistent Company Details',
        body: 'Keep important information aligned across Facebook, the company website and other official business profiles.',
      },
    ],
  },
  'content-people-need': {
    title: 'Give People a Reason to Use the Facebook Page After They Find It',
    lead: 'Page Likes can change the visible size of the Page audience, but visitors still need useful content if Facebook is going to support the business or organisation.',
    footer:
      'Use Page Likes to support Page-level presentation. Let genuine customer needs and actual Page performance guide what gets published next.',
    items: [
      {
        title: 'Current Business Information',
        body: 'Publish genuine updates about services, locations, opening details and other changes customers may need to know.',
      },
      {
        title: 'Answers to Common Questions',
        body: 'Turn recurring enquiries into clear posts that help people understand products, services, policies or processes.',
      },
      {
        title: 'Useful Product Information',
        body: 'Show what is being sold with accurate details that help customers understand the product rather than relying only on promotional wording.',
      },
      {
        title: 'Examples of Real Work',
        body: 'Use genuine projects and completed results to demonstrate experience where that is relevant to the business.',
      },
      {
        title: 'Clear Offers and Campaigns',
        body: 'Explain promotions, availability, dates and conditions clearly enough for customers to understand what is being offered.',
      },
      {
        title: 'Relevant Local Information',
        body: 'Publish content connected to the actual town, city, service area or community when it genuinely matters to the audience.',
      },
      {
        title: 'Events and Important Dates',
        body: 'Keep event times, locations, booking details and other information accurate and easy to find.',
      },
    ],
  },
  'brands-agencies': {
    title: 'Keep Facebook Page Likes Clear Inside UK Brand and Agency Reporting',
    paragraphs: [
      'A Facebook Page may be only one part of a wider UK campaign involving paid social, Instagram, TikTok, search, ecommerce, email, creator partnerships and the company website.',
      'If purchased Page Likes are used as part of that activity, record them as a Page-level metric instead of treating them as organic audience growth.',
      'Keep purchased Page Likes, organic Followers, genuine engagement, organic reach, paid media results, website activity and commercial outcomes separate. Clear reporting makes it easier for clients and internal teams to understand what each channel and metric actually contributed.',
    ],
  },
  'growth-framework': {
    title: 'A Practical Facebook Page Plan for UK Businesses',
    lead: 'Page Likes can support the visible size of the Page, but a stronger Facebook presence comes from maintaining accurate information, useful content and genuine customer interaction.',
    footer:
      'Keep Page Likes in their proper role as one visible metric. Judge the wider Facebook presence using real audience behaviour and business outcomes.',
    items: [
      {
        title: 'Get the Basic Page Information Right',
        body: 'Check the business name, description, contact information, website, location and other customer-facing details.',
      },
      {
        title: 'Publish Evidence of Current Activity',
        body: 'Use genuine company updates, products, services, projects and events to show that the Page represents an active organisation.',
      },
      {
        title: 'Build a Useful Mix of Posts',
        body: 'Combine practical information, educational content, real work, relevant promotions and customer-focused updates.',
      },
      {
        title: 'Respond to Real People',
        body: 'Treat genuine Comments, Recommendations and messages as actual conversations with customers or community members.',
      },
      {
        title: 'Use Genuine Proof Where Available',
        body: 'Reviews, Recommendations, real projects and authentic customer evidence can provide context that a Page Like number cannot.',
      },
      {
        title: 'Review Actual Page Performance',
        body: 'Use genuine Facebook information and business data to understand what content and activity produce useful results.',
      },
      {
        title: 'Connect Facebook With Wider Marketing',
        body: 'UK businesses may use the Page alongside their website, Google, search visibility, Instagram, TikTok, paid media, ecommerce and email.',
      },
      {
        title: 'Keep Purchased Page Likes in Perspective',
        body: 'Use the visible Like count for the purpose it serves while measuring genuine Page growth, customer behaviour and commercial results separately.',
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
  ids: readonly (typeof BATCH6B_UK_IDS)[number][],
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

const ukPath = 'content/markets/uk/services/buy-facebook-page-likes.json';
const usBefore = readFileSync('content/markets/us/services/buy-facebook-page-likes.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-facebook-page-likes.json');
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'uk-fb-page-likes-before-batch6b.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (8 sections) ===');
for (const id of BATCH6B_UK_IDS) {
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
const usAfter = readFileSync('content/markets/us/services/buy-facebook-page-likes.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (8 direct pairs) ===');
for (const ukId of BATCH6B_UK_IDS) {
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
const usMatchingText = BATCH6B_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH6B_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH6B_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (8 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH6B_UK_IDS) {
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
