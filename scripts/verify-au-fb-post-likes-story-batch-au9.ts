import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU9_IDS = [
  'built-for-australia',
  'strong-content',
  'real-activity',
  'local-businesses',
  'customer-proof',
  'clear-goal',
  'campaign-presentation',
  'facebook-insights',
  'content-framework',
] as const;

const US_PAIR: Record<(typeof BATCH_AU9_IDS)[number], string | null> = {
  'built-for-australia': 'built-for-us',
  'strong-content': 'strong-content',
  'real-activity': 'real-activity',
  'local-businesses': 'local-businesses',
  'customer-proof': 'customer-proof',
  'clear-goal': 'useful-next-step',
  'campaign-presentation': 'brand-campaigns',
  'facebook-insights': 'facebook-insights',
  'content-framework': 'content-framework',
};

const UK_PAIR: Record<(typeof BATCH_AU9_IDS)[number], string | null> = {
  'built-for-australia': 'built-for-uk',
  'strong-content': 'strong-content',
  'real-activity': 'real-activity',
  'local-businesses': 'local-businesses',
  'customer-proof': 'customer-proof',
  'clear-goal': 'useful-next-step',
  'campaign-presentation': 'brand-campaigns',
  'facebook-insights': 'facebook-insights',
  'content-framework': 'content-framework',
};

const UNTOUCHED_IDS = ['campaign-content', 'organic-reach'] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-content': 'Put More Engagement Behind Important Australian Campaign Content',
  'organic-reach': 'Post Likes and Organic Reach Are Not the Same Thing',
};

const STRONG_CONTENT_BULLETS = [
  'the post image or video',
  'caption',
  'comments',
  'shares',
  'Page name',
  'business information',
  'recent Page activity',
];

const BENEFITS_TITLE = 'Build Stronger Visible Activity Around Important Content';

const EXPECTED_ORDER = [
  'built-for-australia',
  'campaign-content',
  'strong-content',
  'real-activity',
  'local-businesses',
  'customer-proof',
  'organic-reach',
  'clear-goal',
  'campaign-presentation',
  'facebook-insights',
  'content-framework',
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

const EXPECTED: Record<(typeof BATCH_AU9_IDS)[number], Partial<StorySection>> = {
  'built-for-australia': {
    title: 'Choose Facebook Post Likes Around the Australian Content You Actually Want to Support',
    lead: 'Post Likes apply to one individual Facebook post, so the right approach starts with what that content is doing for the Page and why it deserves additional visible engagement.',
    paragraphs: [
      'An Australian retailer may have a product release or sale post that matters more than everyday updates. A local business may want to highlight completed work, a new service or an important announcement. Restaurants and venues may publish events or seasonal offers. Creators may have collaboration content. Ecommerce brands can support selected campaign posts, while agencies may manage client Pages with completely different priorities.',
      'Start with the post rather than an arbitrary Like total. Review the message, current activity, Page context and purpose of the content before deciding what level of visible engagement makes sense.',
    ],
    footer:
      'Post Likes can support how active selected content appears. The post itself still needs a clear purpose and accurate information behind it.',
    items: [
      {
        title: 'Australian Local Businesses',
        body: 'Support posts showing genuine services, projects, locations, events or updates that potential customers may actually want to understand.',
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Use Post Likes around real launches, promotions and product content connected to items customers can research or buy.',
      },
      {
        title: 'Creators',
        body: 'Support collaborations, announcements and other selected posts that genuinely represent the creator or partnership behind them.',
      },
      {
        title: 'Agencies and Client Pages',
        body: 'Choose Like quantities according to each post and campaign objective rather than applying one standard engagement number across clients.',
      },
      {
        title: 'Established Brands',
        body: 'Put visible engagement behind priority Facebook content while genuine publishing, paid media and wider customer activity continue independently.',
      },
    ],
  },
  'strong-content': {
    title: 'Use Facebook Post Likes to Support Strong Content, Not to Replace It',
    lead: 'A public Like number may influence the first impression of a Facebook post, but people can still see the creative, caption and Page behind it.',
    bullets: STRONG_CONTENT_BULLETS,
    paragraphs: [
      'A stronger Like count can make selected content appear more active, but it cannot fix unclear messaging, outdated information or creative that gives the audience no reason to pay attention.',
      "Use purchased Post Likes for the visible metric they provide. Keep the post's message, accuracy and usefulness as separate parts of the campaign.",
    ],
    footer:
      'Post Likes can strengthen visible engagement. The quality and relevance of the post determine what a genuine viewer finds behind that number.',
  },
  'real-activity': {
    title: 'Build Facebook Engagement Around Work and Activity the Business Can Actually Show',
    lead: 'Posts become more useful when they document genuine products, projects, events, knowledge or business activity rather than relying only on promotional claims.',
    footer:
      'Post Likes can support the visible engagement around this content. Real activity gives the post substance beyond the displayed number.',
    items: [
      {
        title: 'Completed Work',
        body: 'Use genuine projects, transformations or results that the business can accurately explain and stand behind.',
      },
      {
        title: 'Products the Business Really Offers',
        body: 'Show actual products with information that customers can verify if they decide to research or purchase them.',
      },
      {
        title: 'Meaningful Business Developments',
        body: 'Share real openings, expansions, anniversaries, new services or other changes when they are genuinely relevant to customers.',
      },
      {
        title: 'Events With Accurate Information',
        body: 'Publish real dates, locations, booking details and other practical information people may need before attending.',
      },
      {
        title: 'Questions Customers Regularly Ask',
        body: 'Turn recurring enquiries into useful Facebook posts that explain services, products, policies or processes clearly.',
      },
      {
        title: 'Behind-the-Scenes Business Activity',
        body: 'Show genuine people, processes, locations or preparation where that context helps customers understand the operation.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use Facebook Post Likes Around Local Content Australian Customers Can Verify',
    paragraphs: [
      'Local-business posts can help customers see what the company actually does before they make contact. A restaurant can show a dish or venue. A builder may publish completed work. A salon can show a treatment or result. A retailer may introduce new stock. A property business can feature a listing. Tourism and hospitality businesses may show real experiences, while professional services can explain useful topics or processes.',
      'If you support these posts with Likes, keep the Page and content consistent with the real business. Locations, services, availability, prices and public claims should match what customers can verify through the website, Google presence and other official channels.',
    ],
    footer:
      'Visible engagement can support presentation of the post. Local trust comes from the real Australian business and what customers find behind the content.',
  },
  'customer-proof': {
    title: 'Keep Facebook Post Likes Separate From Genuine Customer Evidence',
    paragraphs: [
      'A larger Like count can make a post appear more active, but it does not show whether genuine customers have bought from, hired, visited or recommended the business.',
      'Australian companies may have stronger evidence through genuine reviews, Facebook Recommendations, authentic testimonials, completed projects, case studies, customer photos, real Comments and consistent public business information.',
      'Use that proof where it genuinely exists. Do not present purchased Post Likes as customer approval or invent customer experiences simply to make the content appear more credible.',
    ],
  },
  'clear-goal': {
    title: 'Decide What the Facebook Post Is Supposed to Achieve Before Supporting It',
    lead: 'A post is easier to evaluate when the business knows why it was published and what a genuine viewer should understand or do after seeing it.',
    footer: 'A clear job gives the post and its visible engagement useful context.',
    items: [
      {
        title: 'Introduce Something Important',
        body: 'Use the post for awareness when customers genuinely need to learn about a product, service, location, brand or business update.',
      },
      {
        title: 'Explain a Useful Topic',
        body: 'Educational posts should answer real questions or clarify information the audience may need before making a decision.',
      },
      {
        title: 'Show Evidence',
        body: 'Use genuine projects, products, results or business activity when the purpose is to demonstrate what the company actually does.',
      },
      {
        title: 'Promote a Real Offer',
        body: 'Make prices, dates, availability, inclusions and important conditions clear when the post supports a promotion.',
      },
      {
        title: 'Create a Genuine Discussion Point',
        body: 'If conversation matters, give people a specific subject or question worth responding to rather than asking for generic engagement.',
      },
      {
        title: 'Guide the Next Customer Action',
        body: 'If the goal is commercial, make it clear how an interested person can visit, enquire, book, shop or learn more.',
      },
    ],
  },
  'campaign-presentation': {
    title: 'Use Post Likes as One Part of a Campaign That Still Works Without Them',
    lead: 'Visible engagement can improve how active a campaign post appears, but the campaign still needs to make sense to a genuine customer who sees the content.',
    footer:
      'Post Likes can support campaign presentation. The offer, creative, information and customer journey determine whether the campaign itself is useful.',
    items: [
      {
        title: 'An Offer People Can Understand',
        body: 'Make the product, service, event or promotion clear enough that customers know what is actually being presented.',
      },
      {
        title: 'Information Customers Can Trust',
        body: 'Check dates, prices, locations, availability and relevant conditions before putting more attention behind the post.',
      },
      {
        title: 'Creative That Supports the Message',
        body: 'Use an image or video that helps communicate the campaign instead of relying on the Like number to create interest.',
      },
      {
        title: 'A Clear Next Step',
        body: 'Help genuine viewers understand where to visit, enquire, book, purchase or find more information if they become interested.',
      },
      {
        title: 'Real Follow-Up From the Business',
        body: 'Genuine customer questions and problems should be handled by someone with accurate information from the actual company.',
      },
    ],
  },
  'facebook-insights': {
    title: 'Use Genuine Facebook Data to Judge What the Page Should Publish Next',
    lead: 'Post Likes change one visible content metric. Real Page performance can provide better evidence about which subjects and formats genuine users actually respond to.',
    footer:
      'Purchased Post Likes affect the displayed Like number. Use genuine Page and business data when deciding what content deserves more attention in the future.',
    items: [
      {
        title: 'Which Posts Attract Genuine Attention?',
        body: 'Compare real performance across multiple pieces of content instead of judging the strategy from one Like total.',
      },
      {
        title: 'Which Subjects Create Authentic Interaction?',
        body: 'Look at genuine Comments, Shares and other available signals to understand what people actually respond to.',
      },
      {
        title: 'Which Content Formats Work Best?',
        body: 'Compare real behaviour across images, videos, links and other post types used by the Page.',
      },
      {
        title: 'Does the Content Lead to Useful Customer Activity?',
        body: 'For Australian businesses, genuine outcomes may include website visits, enquiries, bookings, store activity or purchases.',
      },
      {
        title: 'What Should the Page Do More of?',
        body: 'Use actual performance patterns to choose future topics and formats rather than relying on purchased engagement as the decision signal.',
      },
    ],
  },
  'content-framework': {
    title: 'A Practical Facebook Content Plan for Australian Pages',
    lead: 'Post Likes can support selected pieces of content, but stronger Facebook marketing comes from publishing useful posts and measuring genuine customer response.',
    footer:
      'Keep purchased Post Likes in perspective as one visible content metric. Longer-term value comes from the Page, content and genuine business activity behind it.',
    items: [
      {
        title: 'Build Content Around Several Customer Needs',
        body: 'Use a useful mix of business updates, education, genuine proof, promotions, products, services and community information.',
      },
      {
        title: 'Choose Priority Posts Deliberately',
        body: 'Identify which posts have a real campaign, customer or business purpose instead of treating every update as equally important.',
      },
      {
        title: 'Use First-Hand Business Experience',
        body: 'Show genuine work, products, services, projects and knowledge that the company can accurately explain.',
      },
      {
        title: 'Keep the Page Behind the Post Accurate',
        body: 'Make sure visitors can verify important business information after a post creates interest.',
      },
      {
        title: 'Respond to Authentic Interaction',
        body: 'Treat real Comments and messages as customer or community conversations rather than simply additional engagement numbers.',
      },
      {
        title: 'Review Genuine Performance',
        body: 'Use actual Page insights and business data to understand which content contributes useful audience or customer activity.',
      },
      {
        title: 'Connect Facebook With the Wider Australian Customer Journey',
        body: 'Businesses may use Facebook alongside Instagram, their website, Google visibility, search, paid media, ecommerce and email.',
      },
      {
        title: 'Measure Purchased Post Likes Separately',
        body: 'Use Post Likes for the visible metric they provide while evaluating organic interaction and commercial outcomes independently.',
      },
    ],
  },
};

function loadStorySections(path: string): StorySection[] {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    dummy?: { storySections?: StorySection[] };
    content?: { benefits?: { title: string } };
  };
  return raw.dummy?.storySections ?? [];
}

function loadBenefitsTitle(path: string): string | undefined {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    content?: { benefits?: { title: string } };
  };
  return raw.content?.benefits?.title;
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

const auPath = 'content/markets/au/services/buy-facebook-post-likes.json';
const usPath = 'content/markets/us/services/buy-facebook-post-likes.json';
const ukPath = 'content/markets/uk/services/buy-facebook-post-likes.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-fb-post-likes-before-batch-au9.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (9 sections) ===');
for (const id of BATCH_AU9_IDS) {
  const actual = auSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== strong-content bullets unchanged ===');
const sc = auSections.find((s) => s.id === 'strong-content');
console.log(
  JSON.stringify(sc?.bullets) === JSON.stringify(STRONG_CONTENT_BULLETS) ? 'OK bullets' : 'FAIL bullets',
);

console.log('\n=== Story section order ===');
const ids = auSections.map((s) => s.id);
console.log(JSON.stringify(ids) === JSON.stringify(EXPECTED_ORDER) ? 'OK order' : 'FAIL order');

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = auSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== Benefits unchanged ===');
console.log(loadBenefitsTitle(auPath) === BENEFITS_TITLE ? 'OK benefits title' : 'FAIL benefits title');

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function resolveOther(
  id: (typeof BATCH_AU9_IDS)[number],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU9_IDS)[number], string | null>,
): StorySection | null {
  const otherId = pairMap[id];
  if (!otherId) return null;
  return otherList.find((s) => s.id === otherId) ?? null;
}

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU9_IDS)[number], string | null>,
  auBeforeList: StorySection[] | null,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU9_IDS) {
    const au = auList.find((s) => s.id === id)!;
    const other = resolveOther(id, otherList, pairMap);
    if (!other) {
      console.log(`${id}: N/A (no mapped counterpart)`);
      continue;
    }
    const otherLabel = pairMap[id] ?? id;
    const after = jaccard(tokenSet(sectionText(au)), tokenSet(sectionText(other)));
    let line = `${id}↔${otherLabel}: ${(after * 100).toFixed(1)}%`;
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

reportPair('AU vs US similarity (9 targeted sections)', auSections, usSections, US_PAIR, auBeforeSections);
reportPair('AU vs UK similarity (9 targeted sections)', auSections, ukSections, UK_PAIR, auBeforeSections);

function combinedAuTargeted(sections: StorySection[]): string {
  return BATCH_AU9_IDS.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function combinedOtherTargeted(
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU9_IDS)[number], string | null>,
): string {
  return BATCH_AU9_IDS.map((id) => {
    const other = resolveOther(id, otherList, pairMap);
    return other ? sectionText(other) : '';
  })
    .filter(Boolean)
    .join('\n');
}

const auTarget = combinedAuTargeted(auSections);
const usTarget = combinedOtherTargeted(usSections, US_PAIR);
const ukTarget = combinedOtherTargeted(ukSections, UK_PAIR);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auTarget), tokenSet(usTarget));
const auUkAfter = jaccard(tokenSet(auTarget), tokenSet(ukTarget));
let usLine = `AU vs US After (mapped pairs): ${(auUsAfter * 100).toFixed(1)}%`;
let ukLine = `AU vs UK After (mapped pairs): ${(auUkAfter * 100).toFixed(1)}%`;
if (auBeforeSections) {
  const auBeforeTarget = combinedAuTargeted(auBeforeSections);
  usLine = `AU vs US Before: ${(jaccard(tokenSet(auBeforeTarget), tokenSet(usTarget)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`;
  ukLine = `AU vs UK Before: ${(jaccard(tokenSet(auBeforeTarget), tokenSet(ukTarget)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`;
}
console.log(usLine);
console.log(ukLine);
console.log(
  'Note: clear-goal↔useful-next-step and campaign-presentation↔brand-campaigns are conceptual proxies; built-for-australia↔built-for-us/uk.',
);

console.log('\n=== Shared 8+ word phrases (AU vs US, mapped pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU9_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = resolveOther(id, usSections, US_PAIR);
  if (!us) continue;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 8);
  if (phrases.length) {
    console.log(`${id}↔${US_PAIR[id]}:`);
    for (const p of phrases.slice(0, 6)) console.log(`  - "${p}"`);
    p8 = p8.concat(phrases);
  }
}
if (p8.length === 0) console.log('None');

console.log('\n=== Shared 20+ word phrases (AU vs US, mapped pairs) ===');
let p20: string[] = [];
for (const id of BATCH_AU9_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = resolveOther(id, usSections, US_PAIR);
  if (!us) continue;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 20);
  if (phrases.length) {
    console.log(`${id}↔${US_PAIR[id]}:`);
    for (const p of phrases) console.log(`  - "${p}"`);
    p20 = p20.concat(phrases);
  }
}
if (p20.length === 0) console.log('None');

console.log(`\n${pass}/9 exact-copy checks passed`);
process.exit(pass === 9 ? 0 : 1);
