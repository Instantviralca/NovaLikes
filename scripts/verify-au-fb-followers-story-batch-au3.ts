import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU3_IDS = [
  'built-for-australia',
  'better-page',
  'page-trust',
  'customer-proof',
  'growth-framework',
] as const;

const US_PAIR: Record<(typeof BATCH_AU3_IDS)[number], string> = {
  'built-for-australia': 'built-for-us',
  'better-page': 'better-page',
  'page-trust': 'page-trust',
  'customer-proof': 'customer-proof',
  'growth-framework': 'growth-framework',
};

const UK_PAIR: Record<(typeof BATCH_AU3_IDS)[number], string> = {
  'built-for-australia': 'built-for-uk',
  'better-page': 'better-page',
  'page-trust': 'page-trust',
  'customer-proof': 'customer-proof',
  'growth-framework': 'growth-framework',
};

const UNTOUCHED_IDS = [
  'local-businesses',
  'campaign-moments',
  'followers-vs-likes',
  'reach-not-same',
  'brand-credibility',
] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'local-businesses': 'Facebook Followers for Australian Local Businesses',
  'campaign-moments': 'Use Facebook Followers Around Important Australian Business Moments',
  'followers-vs-likes': 'Followers and Facebook Page Likes Are Not the Same Thing',
  'reach-not-same': "More Facebook Followers Don't Automatically Mean More Reach",
  'brand-credibility': 'Put Facebook Followers in Context for Brand Credibility',
};

const BENEFITS_TITLE = 'Build a Stronger First Impression Around Your Facebook Page';

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

const EXPECTED: Record<(typeof BATCH_AU3_IDS)[number], Partial<StorySection>> = {
  'built-for-australia': {
    title: 'Build Facebook Followers Around the Australian Page Customers Actually Find',
    lead: 'A Facebook follower number sits beside the rest of the Page, so the right approach depends on what that Page represents and what an Australian visitor is likely to see after opening it.',
    paragraphs: [
      'A local company may use Facebook to keep customers informed about services, locations and current activity. An ecommerce business may publish launches and promotional content. Trades and service businesses may show completed work. Hospitality and tourism businesses may use the Page for events, experiences and seasonal information. Creators may maintain Facebook alongside other platforms, while agencies can manage Pages with completely different audience and campaign objectives.',
      'Start with the existing Page rather than an arbitrary follower target. Review the current audience, recent content, business information and role Facebook plays in the wider customer journey before choosing the visible increase you want.',
    ],
    footer:
      'Followers can strengthen the displayed audience size. The usefulness and credibility of the Page still come from the business, content and information behind that number.',
    items: [
      {
        title: 'Australian Local Businesses',
        body: 'Build the audience around a Page that helps nearby customers understand the real services, locations, contact details and current activity of the business.',
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Use follower growth alongside genuine product releases, seasonal promotions and Facebook content connected to the actual online store.',
      },
      {
        title: 'Trades and Service Businesses',
        body: 'Support a Page that shows completed work, explains services and answers the practical questions potential customers may have before enquiring.',
      },
      {
        title: 'Creators',
        body: 'Use Followers as one visible Page metric while continuing to publish content that makes the creator, subject and reason to follow easy to understand.',
      },
      {
        title: 'Agencies and Client Pages',
        body: "Choose quantities around each client's existing audience, Page quality and campaign purpose rather than applying one standard follower target.",
      },
      {
        title: 'Established Brands',
        body: 'Support Page presentation while genuine publishing, advertising, customer communication and wider brand marketing continue independently.',
      },
    ],
  },
  'better-page': {
    title: 'Make the Facebook Page More Useful Before Focusing on a Larger Audience',
    lead: 'A bigger follower number has more value when someone checking the Page can quickly understand the business, confirm important details and find recent information.',
    footer:
      'Follower growth can support how the Page looks at first glance. Clear and current Page management determines what a visitor finds after that first impression.',
    items: [
      {
        title: 'Explain the Business Without Making Visitors Guess',
        body: 'Use the About information and visible Page details to make the company, creator or organisation easy to identify.',
      },
      {
        title: 'Check the Details That Affect Real Customers',
        body: 'Keep website links, phone numbers, locations, opening information and other practical details accurate.',
      },
      {
        title: 'Show That the Page Is Still Current',
        body: 'Recent relevant posts help visitors see that the Facebook presence still reflects the business as it operates now.',
      },
      {
        title: 'Keep the Visual Identity Consistent',
        body: 'Profile and cover imagery should match the business customers see across its website and other official channels.',
      },
      {
        title: 'Make Important Updates Easy to Find',
        body: 'Give launches, service changes, offers, events and other priority information enough context for visitors to understand why they matter.',
      },
      {
        title: 'Give Interested People a Clear Next Action',
        body: 'Make it obvious how someone can visit the website, enquire, shop, book, call or continue researching the business.',
      },
    ],
  },
  'page-trust': {
    title: 'Build Facebook Followers Around a Page Australian Customers Can Verify',
    lead: 'Follower count can influence how established a Page appears, but trust becomes stronger when visitors can confirm that the business, information and activity behind it are genuine.',
    footer:
      'Followers can support visible social proof. Verifiable business information and real customer experience provide the deeper trust behind the Page.',
    items: [
      {
        title: 'Show Activity the Business Can Stand Behind',
        body: 'Use genuine projects, products, locations, events and company updates instead of depending on generic promotional content.',
      },
      {
        title: 'Keep Public Details Consistent',
        body: 'Make sure important contact, service and location information agrees with the company website, Google presence and other official profiles.',
      },
      {
        title: 'Publish Information Customers Can Use',
        body: 'Answer common questions and explain services, products or processes clearly enough to help someone make a real decision.',
      },
      {
        title: 'Treat Genuine Messages as Customer Conversations',
        body: 'When real people contact or comment on the Page, respond using accurate information from the actual business.',
      },
      {
        title: 'Make the Page Match the Real Brand',
        body: 'The tone, visuals and public claims on Facebook should be consistent with what customers encounter elsewhere from the company.',
      },
    ],
  },
  'customer-proof': {
    title: 'Keep Purchased Followers Separate From Genuine Customer Evidence',
    paragraphs: [
      'A larger follower number may make a Facebook Page appear more established, but it does not show whether genuine customers have bought from, hired, visited or recommended the business.',
      'Australian companies may have stronger proof through verified reviews, authentic Facebook Recommendations, real testimonials, completed projects, customer photos, case studies, genuine Comments and consistent public business information.',
      'Use that evidence when it genuinely exists. Do not present purchased Followers as customer approval or invent customer experiences to make the Page appear more credible.',
    ],
    footer:
      'Followers change one visible audience metric. Genuine customer evidence helps potential customers evaluate the real business behind the Page.',
  },
  'growth-framework': {
    title: 'A Practical Facebook Audience Plan for Australian Businesses',
    lead: 'Followers can support the visible audience around a Facebook Page, but stronger Page growth comes from making the business easier to understand, verify and contact.',
    footer:
      'Keep purchased Followers in perspective as one visible audience metric. Measure the wider Facebook presence using genuine customer behaviour and real business results.',
    items: [
      {
        title: 'Get the Public Business Details Right',
        body: 'Review the Page description, website, contact information, locations and other details customers may compare with official sources.',
      },
      {
        title: 'Build Content Around Real Customer Needs',
        body: 'Mix practical updates, education, services, products, projects, events and useful offers rather than filling the Page only with promotional posts.',
      },
      {
        title: 'Show Genuine Business Activity',
        body: 'Use current work, real products, team activity and business developments to demonstrate what is actually happening behind the Page.',
      },
      {
        title: 'Respond to Genuine People Properly',
        body: 'Treat authentic Comments and messages as conversations with customers or community members, not simply additional engagement metrics.',
      },
      {
        title: 'Review Real Facebook Performance',
        body: 'Use genuine Page information and business data to understand which posts and activities contribute useful audience or customer outcomes.',
      },
      {
        title: 'Connect Facebook With the Wider Australian Customer Journey',
        body: 'Businesses may use Facebook alongside their website, Google presence, Instagram, TikTok, search visibility, paid advertising, ecommerce and email.',
      },
      {
        title: 'Measure Purchased Followers Separately',
        body: 'Use Followers for the displayed audience number they provide while evaluating organic growth, enquiries, bookings, sales and other business results independently.',
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

function loadBenefitsTitle(path: string): string {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as {
    content?: { benefits?: { title?: string } };
  };
  return raw.content?.benefits?.title ?? '';
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
  if (id === 'customer-proof' && (actual.items?.length ?? 0) > 0) {
    console.error('FAIL customer-proof has items (should be absent)');
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

const auPath = 'content/markets/au/services/buy-facebook-followers.json';
const usPath = 'content/markets/us/services/buy-facebook-followers.json';
const ukPath = 'content/markets/uk/services/buy-facebook-followers.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-fb-followers-before-batch-au3.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;
const benefitsBefore = existsSync(snapshotPath)
  ? loadBenefitsTitle(snapshotPath)
  : BENEFITS_TITLE;

let pass = 0;
console.log('=== Exact copy verification (5 sections) ===');
for (const id of BATCH_AU3_IDS) {
  const actual = auSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = auSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== Benefits unchanged ===');
const benefitsNow = loadBenefitsTitle(auPath);
console.log(
  benefitsNow === benefitsBefore && benefitsNow === BENEFITS_TITLE
    ? 'OK benefits'
    : 'FAIL benefits',
);

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU3_IDS)[number], string>,
  auBeforeList: StorySection[] | null,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU3_IDS) {
    const au = auList.find((s) => s.id === id)!;
    const otherId = pairMap[id];
    const other = otherList.find((s) => s.id === otherId)!;
    const after = jaccard(tokenSet(sectionText(au)), tokenSet(sectionText(other)));
    let line = `${id}↔${otherId}: ${(after * 100).toFixed(1)}%`;
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

reportPair('AU vs US similarity (5 targeted sections)', auSections, usSections, US_PAIR, auBeforeSections);
reportPair('AU vs UK similarity (5 targeted sections)', auSections, ukSections, UK_PAIR, auBeforeSections);

function combinedText(sections: StorySection[], ids: readonly string[]): string {
  return ids.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function combinedOther(
  auIds: readonly string[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU3_IDS)[number], string>,
): string {
  return auIds
    .map((id) => {
      const otherId = pairMap[id as (typeof BATCH_AU3_IDS)[number]];
      return sectionText(otherList.find((s) => s.id === otherId)!);
    })
    .join('\n');
}

const auCombined = combinedText(auSections, BATCH_AU3_IDS);
const usCombined = combinedOther(BATCH_AU3_IDS, usSections, US_PAIR);
const ukCombined = combinedOther(BATCH_AU3_IDS, ukSections, UK_PAIR);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auCombined), tokenSet(usCombined));
const auUkAfter = jaccard(tokenSet(auCombined), tokenSet(ukCombined));
let usLine = `AU vs US After: ${(auUsAfter * 100).toFixed(1)}%`;
let ukLine = `AU vs UK After: ${(auUkAfter * 100).toFixed(1)}%`;
if (auBeforeSections) {
  const auBeforeCombined = combinedText(auBeforeSections, BATCH_AU3_IDS);
  usLine = `AU vs US Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(usCombined)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`;
  ukLine = `AU vs UK Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(ukCombined)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`;
}
console.log(usLine);
console.log(ukLine);

console.log('\n=== Shared 8+ word phrases (AU vs US, 5 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU3_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === US_PAIR[id])!;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 8);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases.slice(0, 5)) console.log(`  - "${p}"`);
    p8 = p8.concat(phrases);
  }
}
if (p8.length === 0) console.log('None');

console.log('\n=== Shared 20+ word phrases (AU vs US, 5 pairs) ===');
let p20: string[] = [];
for (const id of BATCH_AU3_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === US_PAIR[id])!;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 20);
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases) console.log(`  - "${p}"`);
    p20 = p20.concat(phrases);
  }
}
if (p20.length === 0) console.log('None');

console.log(`\n${pass}/5 exact-copy checks passed`);
process.exit(pass === 5 ? 0 : 1);
