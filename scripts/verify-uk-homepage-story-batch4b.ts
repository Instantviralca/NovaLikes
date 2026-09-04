import { readFileSync } from 'node:fs';

const BATCH4B_IDS = [
  'local-businesses',
  'customer-proof',
  'affordable-growth',
  'account-you-have',
] as const;

const BATCH4A_IDS = [
  'profile-growth-table',
  'audience-segments',
  'first-impression',
  'priority-content',
  'content-worth-following',
  'better-profile',
] as const;

const UNTOUCHED_IDS = [
  'metric-meanings',
  'campaign-moments',
  'wider-marketing',
  'business-outcomes',
  'agency-reporting',
];

const PARA_COUNTS: Record<(typeof BATCH4B_IDS)[number], number> = {
  'local-businesses': 4,
  'customer-proof': 4,
  'affordable-growth': 3,
  'account-you-have': 4,
};

const BATCH4A_SPOT = {
  'profile-growth-table': 'Choose Your Instagram Priority',
  'audience-segments': 'Different UK Accounts Need Different Instagram Priorities',
  'first-impression': 'Make the Profile Useful When New Visitors Arrive',
  'priority-content': 'Choose the Instagram Content That Deserves Extra Attention',
  'content-worth-following': 'Give People a Reason to Follow Beyond the Visible Numbers',
  'better-profile': 'Turn More Visible Growth Into a More Useful UK Instagram Profile',
};

type StorySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  lead?: string;
  items?: { title: string; body: string }[];
};

const EXPECTED: Record<(typeof BATCH4B_IDS)[number], { title: string; paragraphs: string[] }> = {
  'local-businesses': {
    title: 'Use Instagram to Support the Local Business People Actually Find',
    paragraphs: [
      'For a UK local business, Instagram can sit alongside your website, Google Business Profile, local search visibility, referrals and paid campaigns. Someone who reaches the profile may be checking whether the business looks active, what recent work looks like or whether the service matches what they need.',
      'The useful content will depend on the company. A restaurant can show current dishes and the atmosphere customers can expect. A trades business can publish completed projects. A salon or clinic can show relevant work where appropriate. An estate agency can feature properties. A retailer can introduce new stock. A fitness business can show classes or facilities. A professional service can explain common questions and the way it works.',
      'If you use Followers, Likes, Views or Comments around a local-business account, keep the genuine business details accurate at the same time. Make the service area clear where it matters, keep important links current and show real work rather than relying on visible social numbers to explain the company.',
      'Instagram metrics can support the presentation of the profile. Local trust still comes from the real business, accurate information, genuine customer experience and the quality of what people find when they look further.',
    ],
  },
  'customer-proof': {
    title: 'Keep Real Customer Evidence Separate From Instagram Numbers',
    paragraphs: [
      'A follower count, Like total or Reel view number is not the same thing as evidence that customers recommend a business. Keep those two types of signals separate.',
      'For UK companies, stronger customer proof can come from genuine reviews, authentic testimonials, completed work, case studies, customer-created content, real enquiries and other evidence connected to actual customer experiences. Use the proof you genuinely have rather than creating claims simply to make the profile look more convincing.',
      'The same principle applies when a campaign uses purchased Instagram metrics. Do not present purchased Followers, Likes, Views or Comments as if they were customer reviews, organic engagement or proof of business quality.',
      'Visible metrics can support how an Instagram profile looks at first glance. Genuine customer evidence answers a different and more important question: what experience have real customers actually had with the business?',
    ],
  },
  'affordable-growth': {
    title: 'Compare Instagram Growth by Value, Not Just the Cheapest Number',
    paragraphs: [
      "If you're looking for affordable Instagram growth in the UK, price is naturally part of the decision. But two packages that look inexpensive may still offer different quantities, work on different Instagram metrics or require different information before an order can be processed.",
      "Check the exact service first. Confirm whether you're buying Followers for the profile, Likes for selected content, Views for eligible video or Comments for a post or Reel. Then review the quantity, current displayed price, public information required, password policy, checkout process, order tracking, support options and applicable refund terms.",
      "The better-value option is the one you can understand before paying. NovaLikes shows the service and available package choices so you can select the metric and quantity that fit the account or content you're actually working on.",
    ],
  },
  'account-you-have': {
    title: 'Choose Instagram Growth for the Account You Have Today',
    paragraphs: [
      'Package choice should start with the current Instagram account, not with an arbitrary number that looks impressive.',
      'A newer UK creator may be focused on making the overall profile look more developed. An established creator may care more about one important Reel or collaboration. An ecommerce business may prioritise Likes or Views around a launch. A local company may want the profile ready before advertising or another campaign sends more potential customers towards it. An agency may need completely different metrics for different clients.',
      "Look at the current profile, the content already published and the campaign you're preparing. Decide whether the priority is profile audience, post engagement, video visibility or visible conversation, then choose the corresponding service and an appropriate available package.",
      'Growth services should support the account and campaign you already have. They should not become a substitute for deciding what the profile is actually trying to achieve.',
    ],
  },
};

function loadSections(market: 'us' | 'uk'): StorySection[] {
  const raw = JSON.parse(readFileSync(`content/markets/${market}/homepage.json`, 'utf8')) as {
    storySections: StorySection[];
  };
  return raw.storySections;
}

function sectionText(s: StorySection): string {
  const parts = [s.title];
  if (s.lead) parts.push(s.lead);
  if (s.paragraphs) parts.push(...s.paragraphs);
  if (s.items) parts.push(...s.items.flatMap((i) => [i.title, i.body]));
  return parts.join('\n');
}

function homepageText(sections: StorySection[]): string {
  return sections.map(sectionText).join('\n');
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
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);
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

const usBefore = readFileSync('content/markets/us/homepage.json', 'utf8');
const caBefore = readFileSync('content/markets/ca/homepage.json', 'utf8');
const auBefore = readFileSync('content/markets/au/homepage.json', 'utf8');

const ukSections = loadSections('uk');
const usSections = loadSections('us');

let pass = 0;
console.log('=== Exact copy verification (4 sections) ===');
for (const id of BATCH4B_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  const exp = EXPECTED[id];
  let ok = true;
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (actual.title !== exp.title) {
    console.error(`FAIL ${id} title`);
    ok = false;
  }
  if (JSON.stringify(actual.paragraphs) !== JSON.stringify(exp.paragraphs)) {
    console.error(`FAIL ${id} paragraphs`);
    ok = false;
  }
  if ((actual.paragraphs?.length ?? 0) !== PARA_COUNTS[id]) {
    console.error(`FAIL ${id} paragraph count`);
    ok = false;
  }
  if (ok) {
    console.log(`OK ${id}`);
    pass++;
  }
}

console.log('\n=== Batch 4A sections unchanged ===');
let batch4aOk = true;
for (const id of BATCH4A_IDS) {
  const s = ukSections.find((x) => x.id === id);
  if (!s || s.title !== BATCH4A_SPOT[id]) {
    console.error(`FAIL Batch 4A changed: ${id}`);
    batch4aOk = false;
  } else {
    console.log(`OK ${id}`);
  }
}

console.log('\n=== Other untouched sections present ===');
for (const id of UNTOUCHED_IDS) {
  console.log(ukSections.some((s) => s.id === id) ? `OK ${id}` : `FAIL missing ${id}`);
}

console.log('\n=== Other market homepages unchanged ===');
const usAfter = readFileSync('content/markets/us/homepage.json', 'utf8');
const caAfter = readFileSync('content/markets/ca/homepage.json', 'utf8');
const auAfter = readFileSync('content/markets/au/homepage.json', 'utf8');
console.log(usBefore === usAfter ? 'OK US' : 'FAIL US changed');
console.log(caBefore === caAfter ? 'OK CA' : 'FAIL CA changed');
console.log(auBefore === auAfter ? 'OK AU' : 'FAIL AU changed');

console.log('\n=== US vs UK similarity (4 rewritten sections) ===');
for (const id of BATCH4B_IDS) {
  const us = usSections.find((s) => s.id === id)!;
  const uk = ukSections.find((s) => s.id === id)!;
  const sim = jaccard(tokenSet(sectionText(us)), tokenSet(sectionText(uk)));
  console.log(`${id}: ${(sim * 100).toFixed(1)}%`);
}

console.log('\n=== Overall US vs UK storySections similarity ===');
const overallSim = jaccard(
  tokenSet(homepageText(usSections)),
  tokenSet(homepageText(ukSections)),
);
console.log(`${(overallSim * 100).toFixed(1)}%`);

console.log('\n=== Shared 8+ word phrases (4 sections US vs UK) ===');
let allShared: string[] = [];
for (const id of BATCH4B_IDS) {
  const us = usSections.find((s) => s.id === id)!;
  const uk = ukSections.find((s) => s.id === id)!;
  const phrases = sharedPhrases8Plus(sectionText(us), sectionText(uk));
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases.slice(0, 8)) console.log(`  - "${p}"`);
    if (phrases.length > 8) console.log(`  ... and ${phrases.length - 8} more`);
    allShared = allShared.concat(phrases);
  }
}
if (allShared.length === 0) console.log('None');

console.log(`\n${pass}/4 exact-copy checks passed`);
process.exit(
  pass === 4 && batch4aOk && usBefore === usAfter && caBefore === caAfter && auBefore === auAfter
    ? 0
    : 1,
);
