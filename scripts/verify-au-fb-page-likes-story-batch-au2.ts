import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU2_IDS = [
  'page-worth-exploring',
  'social-proof',
  'customer-proof',
  'content-people-need',
  'growth-framework',
] as const;

const UNTOUCHED_IDS = [
  'built-for-australia',
  'local-businesses',
  'campaign-moments',
  'page-likes-vs-followers',
  'reach-not-same',
  'brands-agencies',
] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'built-for-australia': 'Built for Australian Businesses, Brands and Organisations',
  'local-businesses': 'Facebook Page Likes for Australian Local Businesses',
  'campaign-moments': 'Use Page Likes Around Important Australian Business Moments',
  'page-likes-vs-followers': 'Page Likes and Facebook Followers Are Different Metrics',
  'reach-not-same': "More Facebook Page Likes Don't Automatically Mean More Reach",
  'brands-agencies': 'Facebook Page Likes for Brands and Agencies',
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

const EXPECTED: Record<(typeof BATCH_AU2_IDS)[number], Partial<StorySection>> = {
  'page-worth-exploring': {
    title: 'Give Australian Page Visitors Something Useful to Check Beyond the Like Count',
    lead: 'A stronger Page Like number can affect the first impression of a Facebook Page, but visitors may quickly look beyond it to decide whether the Page represents an active and credible business.',
    footer:
      'Page Likes can support the visible presentation of the Page. The information and activity behind that number determine whether the visit is actually useful.',
    items: [
      {
        title: 'Explain the Business Clearly',
        body: 'Make it easy to understand what the company, brand or organisation does without forcing visitors to piece the answer together from old posts.',
      },
      {
        title: 'Check the Details Customers Rely On',
        body: 'Keep website links, contact information, locations, opening details and other public information accurate wherever they appear on the Page.',
      },
      {
        title: 'Show Current Activity',
        body: 'Recent relevant posts can help visitors see that the Page still reflects the business as it operates today.',
      },
      {
        title: 'Use Recognisable Branding',
        body: 'Profile and cover imagery should match the business customers see on its website and other official channels.',
      },
      {
        title: 'Publish Information Worth Exploring',
        body: 'Use updates, projects, products, events, explanations and other content that helps people understand the business behind the Page.',
      },
      {
        title: 'Make the Customer Journey Clear',
        body: 'If someone becomes interested, make it straightforward to visit the website, enquire, book, shop, call or find the next relevant piece of information.',
      },
    ],
  },
  'social-proof': {
    title: 'Treat Facebook Page Likes as One Visible Signal, Not a Measure of Reputation',
    lead: 'A larger Page Like count may make a Facebook presence appear more established, but it does not tell an Australian customer what experience other people have actually had with the business.',
    footer:
      'Use Page Likes for the visible signal they provide. Let genuine customer experiences and verifiable business activity carry the reputation of the company.',
    items: [
      {
        title: 'Independent Customer Feedback',
        body: 'Use genuine reviews or Recommendations from people who have actually dealt with the business where that evidence is available.',
      },
      {
        title: 'Real Examples of the Work',
        body: 'Projects, products, transformations and other genuine examples can show what the company actually delivers.',
      },
      {
        title: 'Consistent Public Information',
        body: 'Make sure important business details agree across Facebook, the website, Google profiles and other official places customers may check.',
      },
      {
        title: 'Authentic Customer Evidence',
        body: 'Real testimonials, customer photos or case material can provide context that a Page Like number cannot create by itself.',
      },
      {
        title: 'Useful Customer Communication',
        body: 'How the business responds to genuine questions, messages and problems can influence trust more directly than the public Like total.',
      },
    ],
  },
  'customer-proof': {
    title: 'Keep Purchased Page Likes Separate From Genuine Customer Evidence',
    lead: 'If an Australian business has strong proof of its work or customer experience, show that proof clearly without presenting purchased Page Likes as if they created it.',
    footer:
      'Page Likes describe one Facebook metric. Genuine customer evidence helps visitors evaluate the real company behind the Page.',
    items: [
      {
        title: 'Verified Customer Reviews',
        body: 'Use genuine feedback from customers who have actually bought from, hired or dealt with the business.',
      },
      {
        title: 'Facebook Recommendations',
        body: 'Authentic Recommendations can help visitors understand experiences real customers independently chose to share.',
      },
      {
        title: 'Completed Projects and Results',
        body: 'Show work the company has genuinely delivered rather than relying only on promotional claims about quality or experience.',
      },
      {
        title: 'Customer-Created Material',
        body: 'Real photos, feedback or other customer contributions can add useful context when they are authentic and appropriate to publish.',
      },
      {
        title: 'Case Studies and Examples',
        body: 'Explain genuine situations, work and outcomes accurately when more detail helps a potential customer understand the service.',
      },
      {
        title: 'Business Details That Match Everywhere',
        body: 'Keep key information consistent across Facebook, the company website and other official profiles customers may use for verification.',
      },
    ],
  },
  'content-people-need': {
    title: 'Publish Facebook Content That Helps Australian Customers Understand the Business',
    lead: 'A Page can have a stronger visible Like count and still be unhelpful if visitors cannot find the information they came looking for.',
    footer:
      'Page Likes can support Page-level presentation. Useful, current content gives potential customers a reason to keep exploring after they arrive.',
    items: [
      {
        title: 'Changes Customers Need to Know About',
        body: 'Publish genuine updates about locations, services, opening information, availability and other changes that affect the customer experience.',
      },
      {
        title: 'Answers to Recurring Questions',
        body: 'Turn common enquiries into clear posts that explain products, services, processes, policies or decisions customers regularly ask about.',
      },
      {
        title: 'Product Information With Context',
        body: 'Show what is available and explain the details customers need instead of relying only on promotional images or short sales captions.',
      },
      {
        title: 'Real Project and Service Examples',
        body: 'Use completed work and genuine examples to help potential customers understand what the business can actually provide.',
      },
      {
        title: 'Offers With Clear Details',
        body: 'If the Page promotes an offer, explain the important dates, conditions, inclusions or availability accurately.',
      },
      {
        title: 'Useful Local Information',
        body: 'Share information relevant to the real suburb, city, region or service area when location genuinely affects the customer.',
      },
      {
        title: 'Events and Time-Sensitive Updates',
        body: 'Keep dates, locations, booking details and other practical information current when promoting events or limited-time activity.',
      },
    ],
  },
  'growth-framework': {
    title: 'A Practical Facebook Page Plan for Australian Businesses',
    lead: 'Page Likes can support the visible size of a Facebook presence, but stronger Page management comes from keeping the business clear, current and useful to the people who check it.',
    footer:
      'Keep purchased Page Likes in perspective as one visible metric. Judge the wider Facebook presence using genuine customer behaviour and real business outcomes.',
    items: [
      {
        title: 'Make the Page Easy to Verify',
        body: 'Check the business description, website, contact information, locations and other details a potential customer may compare with official sources.',
      },
      {
        title: 'Show What the Business Is Doing Now',
        body: 'Use genuine projects, products, services, team activity and current updates to keep the Page connected to the real operation.',
      },
      {
        title: 'Build Content Around Customer Needs',
        body: 'Mix practical information, education, real work, useful offers and updates instead of publishing only promotional posts.',
      },
      {
        title: 'Treat Genuine Interaction as Customer Communication',
        body: 'Real Comments and messages should receive appropriate responses from someone who can provide accurate information.',
      },
      {
        title: 'Use Proof the Business Can Support',
        body: 'Reviews, Recommendations, completed work and genuine customer evidence provide context that a Page Like count cannot replace.',
      },
      {
        title: 'Review Actual Performance',
        body: 'Use genuine Facebook information and business data to understand which content contributes to useful audience or customer activity.',
      },
      {
        title: 'Connect Facebook With the Wider Customer Journey',
        body: 'Australian businesses may use Facebook alongside their website, Google presence, Instagram, TikTok, search, paid media, ecommerce and email.',
      },
      {
        title: 'Measure Purchased Likes Separately',
        body: 'Use Page Likes for the visible metric they provide while evaluating organic audience activity, customer enquiries and commercial results independently.',
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

const auPath = 'content/markets/au/services/buy-facebook-page-likes.json';
const usPath = 'content/markets/us/services/buy-facebook-page-likes.json';
const ukPath = 'content/markets/uk/services/buy-facebook-page-likes.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-fb-page-likes-before-batch-au2.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (5 sections) ===');
for (const id of BATCH_AU2_IDS) {
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

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function reportPair(label: string, auList: StorySection[], otherList: StorySection[]) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU2_IDS) {
    const au = auList.find((s) => s.id === id)!;
    const other = otherList.find((s) => s.id === id)!;
    const after = jaccard(tokenSet(sectionText(au)), tokenSet(sectionText(other)));
    let line = `${id}: ${(after * 100).toFixed(1)}%`;
    if (auBeforeSections) {
      const auOld = auBeforeSections.find((s) => s.id === id);
      if (auOld) {
        const before = jaccard(tokenSet(sectionText(auOld)), tokenSet(sectionText(other)));
        line += ` (was ${(before * 100).toFixed(1)}%)`;
      }
    }
    console.log(line);
  }
}

reportPair('AU vs US similarity (5 targeted sections)', auSections, usSections);
reportPair('AU vs UK similarity (5 targeted sections)', auSections, ukSections);

function combinedText(sections: StorySection[], ids: readonly string[]): string {
  return ids.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

const auCombined = combinedText(auSections, BATCH_AU2_IDS);
const usCombined = combinedText(usSections, BATCH_AU2_IDS);
const ukCombined = combinedText(ukSections, BATCH_AU2_IDS);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auCombined), tokenSet(usCombined));
const auUkAfter = jaccard(tokenSet(auCombined), tokenSet(ukCombined));
let usLine = `AU vs US After: ${(auUsAfter * 100).toFixed(1)}%`;
let ukLine = `AU vs UK After: ${(auUkAfter * 100).toFixed(1)}%`;
if (auBeforeSections) {
  const auBeforeCombined = combinedText(auBeforeSections, BATCH_AU2_IDS);
  usLine = `AU vs US Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(usCombined)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`;
  ukLine = `AU vs UK Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(ukCombined)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`;
}
console.log(usLine);
console.log(ukLine);

console.log('\n=== Shared 8+ word phrases (AU vs US, 5 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU2_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === id)!;
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
for (const id of BATCH_AU2_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === id)!;
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
