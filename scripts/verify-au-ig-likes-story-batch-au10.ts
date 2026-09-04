import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU10_IDS = [
  'built-for-australia',
  'better-content-experience',
  'support-content',
  'brand-partnerships',
  'local-businesses',
  'real-experience',
] as const;

const US_PAIR: Record<(typeof BATCH_AU10_IDS)[number], string> = {
  'built-for-australia': 'built-for-us',
  'better-content-experience': 'strong-first-glance',
  'support-content': 'content-worth-engaging',
  'brand-partnerships': 'brand-partnerships',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
};

const UK_PAIR: Record<(typeof BATCH_AU10_IDS)[number], string> = {
  'built-for-australia': 'built-for-uk',
  'better-content-experience': 'strong-first-glance',
  'support-content': 'content-worth-engaging',
  'brand-partnerships': 'brand-partnerships',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
};

const UNTOUCHED_IDS = ['campaign-moments', 'organic-reach', 'content-performance'] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-moments': 'Use Instagram Likes Around Important Australian Campaign Moments',
  'organic-reach': 'Instagram Likes and Organic Reach Are Not the Same Thing',
  'content-performance': "Likes Don't Tell You Everything About Content Performance",
};

const EXPECTED_ORDER = [
  'built-for-australia',
  'campaign-moments',
  'better-content-experience',
  'support-content',
  'organic-reach',
  'content-performance',
  'brand-partnerships',
  'local-businesses',
  'real-experience',
];

const STEP5_TITLE = 'Step 5';
const STEP5_DESC = 'Review your order details before checkout.';

type StoryItem = { title: string; body: string };
type StorySection = {
  id: string;
  title: string;
  lead?: string;
  footer?: string;
  paragraphs?: string[];
  items?: StoryItem[];
};

const EXPECTED: Record<(typeof BATCH_AU10_IDS)[number], Partial<StorySection>> = {
  'built-for-australia': {
    title: 'Choose Instagram Likes Around the Australian Content You Actually Want to Strengthen',
    lead: 'Instagram Likes apply to individual posts and Reels, so the right approach starts with the content itself rather than an arbitrary engagement number.',
    paragraphs: [
      'An Australian creator may want more visible engagement around a portfolio piece, collaboration or important Reel. An ecommerce business may focus on a product launch or campaign post. A local company may highlight completed work, a service, venue or useful customer update. Agencies may manage several client accounts where different pieces of content serve completely different purposes.',
      'Start with the post or Reel. Review what it communicates, how it fits the wider profile and why that piece of content matters before deciding what level of visible Likes makes sense.',
    ],
    footer:
      'Likes can support how active selected content appears. The post, Reel and account behind that number still need a clear purpose.',
    items: [
      {
        title: 'Australian Creators',
        body: "Support posts and Reels that genuinely represent the creator's niche, work, style or current content direction.",
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Use Likes around real product launches, demonstrations and campaign content connected to items customers can research or buy.',
      },
      {
        title: 'Local Businesses',
        body: 'Support content showing genuine services, projects, products, locations or business activity that potential customers may want to understand.',
      },
      {
        title: 'Agencies and Client Content',
        body: 'Choose Like quantities according to the individual post, account and campaign purpose instead of applying one standard engagement target.',
      },
      {
        title: 'Established Brands',
        body: 'Put visible engagement behind selected priority content while genuine publishing, advertising and wider audience activity continue independently.',
      },
    ],
  },
  'better-content-experience': {
    title: 'Make the Instagram Post Worth Exploring Beyond the Like Count',
    lead: 'A stronger visible Like number may affect the first impression of a post or Reel, but genuine viewers can still judge the creative, caption and wider profile immediately.',
    footer:
      'Likes can strengthen presentation. Clear and useful content determines what someone finds after that first impression.',
    items: [
      {
        title: 'Use Creative That Explains the Idea',
        body: 'Choose photos, carousels or Reels that make the subject, product, result or story understandable without relying on the engagement number.',
      },
      {
        title: 'Give the Caption a Clear Job',
        body: 'Use the caption to explain relevant context, details, offers or information instead of filling space with generic promotional wording.',
      },
      {
        title: 'Keep the Post Connected to the Profile',
        body: 'Make sure the content fits the creator niche, business or brand someone discovers if they open the wider account.',
      },
      {
        title: 'Give Interested People a Useful Next Step',
        body: 'For Australian businesses, help genuine viewers understand how to visit the website, research a product, enquire, book or contact the company.',
      },
      {
        title: 'Keep Building the Account After the Priority Post',
        body: 'One post with a stronger visible Like count should sit inside an ongoing content strategy rather than becoming the whole strategy.',
      },
    ],
  },
  'support-content': {
    title: 'Use Instagram Likes as One Part of the Content Strategy',
    lead: 'Purchased Likes can change a visible engagement number, but genuine Instagram growth still depends on what the account publishes and how real people respond.',
    footer:
      'Use purchased Likes for the metric they provide. Let genuine audience behaviour and Instagram Insights guide what the account creates next.',
    items: [
      {
        title: 'Build Recognisable Content Themes',
        body: 'Develop subjects that fit the creator niche, business or brand instead of publishing unrelated content simply to maintain activity.',
      },
      {
        title: 'Use Reels When Video Adds Meaning',
        body: 'Choose video for demonstrations, movement, explanations, transformations and stories that benefit from being shown rather than described.',
      },
      {
        title: 'Use Carousels When the Idea Needs More Space',
        body: 'Break useful information, projects, comparisons or product details into several slides when one image cannot communicate enough context.',
      },
      {
        title: 'Make Captions Useful',
        body: 'Add information that helps genuine viewers understand the content, business, product or subject more clearly.',
      },
      {
        title: 'Respond to Authentic Interaction',
        body: 'Real Comments and messages should receive appropriate responses from the creator or business behind the account.',
      },
      {
        title: 'Review Genuine Instagram Performance',
        body: 'Use actual account data to understand which posts and Reels earn real attention, interaction and profile activity.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Australian Brands More to Assess Than an Instagram Like Count',
    paragraphs: [
      'A creator may want stronger visible engagement when preparing content for future collaborations, but an Australian brand or agency can evaluate much more than the Like number shown on selected posts.',
      'A professional partnership review may include creator positioning, audience relevance, content quality, genuine engagement, consistency, previous collaborations, communication, campaign fit and reliable performance information.',
      'If partnerships matter, use content you would be comfortable presenting to a potential brand and keep genuine analytics available when real audience performance needs to be demonstrated.',
    ],
    footer: 'Treat Likes as one visible content metric rather than proof of genuine influence by themselves.',
  },
  'local-businesses': {
    title: 'Use Instagram Likes Around Local Business Content Customers Can Verify',
    paragraphs: [
      'For Australian local businesses, Instagram can help potential customers see real work, products, locations and experiences before they decide whether to make contact.',
      'A restaurant may show dishes or its venue. A builder can document completed projects. An interior designer may show finished spaces. A salon can present treatments or results. Retailers may feature genuine stock. Property businesses can show listings, while professional services may demonstrate processes or answer common questions.',
      'If you support this content with Likes, keep the post and profile consistent with the real business. Services, locations, contact details and public claims should match what customers can verify through the website, Google presence and other official channels.',
    ],
    footer:
      'Visible engagement can support presentation. Local trust comes from the Australian business and what customers can verify behind the post.',
  },
  'real-experience': {
    title: 'Build Instagram Engagement Around Work and Experience You Can Actually Show',
    lead: 'Content based on real work, products or first-hand knowledge gives genuine viewers more value than posts built only around generic claims.',
    footer:
      'Likes can support visible engagement around this content. Genuine experience gives the post or Reel substance beyond the displayed number.',
    items: [
      {
        title: 'Show Work You Have Actually Completed',
        body: 'Use real projects, portfolio examples and results that the business or creator can accurately explain.',
      },
      {
        title: 'Demonstrate Products You Really Offer',
        body: 'Show genuine products in useful context so interested customers can understand what they are looking at.',
      },
      {
        title: 'Explain Processes From First-Hand Knowledge',
        body: 'Turn professional or practical experience into posts and Reels that help people understand how something actually works.',
      },
      {
        title: 'Use Real Customer Questions as Content Ideas',
        body: 'Recurring enquiries about products, services, bookings or processes can reveal useful subjects for future Instagram content.',
      },
      {
        title: 'Share an Original Perspective',
        body: 'First-hand observations and experience can make content more useful than repeating generic advice already common across similar accounts.',
      },
    ],
  },
};

function loadStorySections(path: string): StorySection[] {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    dummy?: { storySections?: StorySection[]; howItWorks?: { steps?: { title: string; description: string }[] } };
    content?: { howItWorks?: { steps?: { title: string; description: string }[] } };
  };
  return raw.dummy?.storySections ?? [];
}

function loadStep5(path: string): { title: string; description: string } | undefined {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    content?: { howItWorks?: { steps?: { title: string; description: string }[] } };
  };
  const steps = raw.content?.howItWorks?.steps ?? [];
  return steps.find((s) => s.title === STEP5_TITLE);
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

const auPath = 'content/markets/au/services/buy-instagram-likes.json';
const usPath = 'content/markets/us/services/buy-instagram-likes.json';
const ukPath = 'content/markets/uk/services/buy-instagram-likes.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-ig-likes-before-batch-au10.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (6 sections) ===');
for (const id of BATCH_AU10_IDS) {
  const actual = auSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== Story section order ===');
const ids = auSections.map((s) => s.id);
console.log(JSON.stringify(ids) === JSON.stringify(EXPECTED_ORDER) ? 'OK order' : 'FAIL order');

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = auSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

const step5 = loadStep5(auPath);
console.log('\n=== Step 5 placeholder unchanged ===');
console.log(
  step5?.title === STEP5_TITLE && step5?.description === STEP5_DESC
    ? 'OK Step 5 placeholder'
    : 'FAIL Step 5 changed',
);

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function resolveOther(
  id: (typeof BATCH_AU10_IDS)[number],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU10_IDS)[number], string>,
): StorySection {
  const otherId = pairMap[id];
  const found = otherList.find((s) => s.id === otherId);
  if (!found) throw new Error(`Missing ${otherId}`);
  return found;
}

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU10_IDS)[number], string>,
  auBeforeList: StorySection[] | null,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU10_IDS) {
    const au = auList.find((s) => s.id === id)!;
    const other = resolveOther(id, otherList, pairMap);
    const otherLabel = pairMap[id];
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

reportPair('AU vs US similarity (6 targeted sections)', auSections, usSections, US_PAIR, auBeforeSections);
reportPair('AU vs UK similarity (6 targeted sections)', auSections, ukSections, UK_PAIR, auBeforeSections);

function combinedAuTargeted(sections: StorySection[]): string {
  return BATCH_AU10_IDS.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function combinedOtherTargeted(
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU10_IDS)[number], string>,
): string {
  return BATCH_AU10_IDS.map((id) => sectionText(resolveOther(id, otherList, pairMap))).join('\n');
}

function allStoryText(sections: StorySection[]): string {
  return sections.map(sectionText).join('\n');
}

const auTarget = combinedAuTargeted(auSections);
const usTarget = combinedOtherTargeted(usSections, US_PAIR);
const ukTarget = combinedOtherTargeted(ukSections, UK_PAIR);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auTarget), tokenSet(usTarget));
const auUkAfter = jaccard(tokenSet(auTarget), tokenSet(ukTarget));
if (auBeforeSections) {
  const auBeforeTarget = combinedAuTargeted(auBeforeSections);
  console.log(
    `AU vs US Before: ${(jaccard(tokenSet(auBeforeTarget), tokenSet(usTarget)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`,
  );
  console.log(
    `AU vs UK Before: ${(jaccard(tokenSet(auBeforeTarget), tokenSet(ukTarget)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`,
  );
} else {
  console.log(`AU vs US After: ${(auUsAfter * 100).toFixed(1)}%`);
  console.log(`AU vs UK After: ${(auUkAfter * 100).toFixed(1)}%`);
}
console.log(
  'Note: better-content-experience↔strong-first-glance; support-content↔content-worth-engaging; built-for-australia↔built-for-us/uk.',
);

console.log('\n=== Whole storySections similarity ===');
const wholeAuUsAfter = jaccard(tokenSet(allStoryText(auSections)), tokenSet(allStoryText(usSections)));
const wholeAuUkAfter = jaccard(tokenSet(allStoryText(auSections)), tokenSet(allStoryText(ukSections)));
if (auBeforeSections) {
  console.log(
    `AU vs US Before: ${(jaccard(tokenSet(allStoryText(auBeforeSections)), tokenSet(allStoryText(usSections))) * 100).toFixed(1)}% | After: ${(wholeAuUsAfter * 100).toFixed(1)}%`,
  );
  console.log(
    `AU vs UK Before: ${(jaccard(tokenSet(allStoryText(auBeforeSections)), tokenSet(allStoryText(ukSections))) * 100).toFixed(1)}% | After: ${(wholeAuUkAfter * 100).toFixed(1)}%`,
  );
} else {
  console.log(`AU vs US After: ${(wholeAuUsAfter * 100).toFixed(1)}%`);
  console.log(`AU vs UK After: ${(wholeAuUkAfter * 100).toFixed(1)}%`);
}

console.log('\n=== Shared 8+ word phrases (AU vs US, mapped pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU10_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = resolveOther(id, usSections, US_PAIR);
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
for (const id of BATCH_AU10_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = resolveOther(id, usSections, US_PAIR);
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 20);
  if (phrases.length) {
    console.log(`${id}↔${US_PAIR[id]}:`);
    for (const p of phrases) console.log(`  - "${p}"`);
    p20 = p20.concat(phrases);
  }
}
if (p20.length === 0) console.log('None');

console.log(`\n${pass}/6 exact-copy checks passed`);
process.exit(pass === 6 ? 0 : 1);
