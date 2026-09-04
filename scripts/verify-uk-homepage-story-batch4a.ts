import { readFileSync } from 'node:fs';

const SECTION_IDS = [
  'profile-growth-table',
  'audience-segments',
  'first-impression',
  'priority-content',
  'content-worth-following',
  'better-profile',
] as const;

const UNTOUCHED_IDS = [
  'campaign-moments',
  'local-businesses',
  'customer-proof',
  'metric-meanings',
  'wider-marketing',
  'business-outcomes',
  'agency-reporting',
  'affordable-growth',
  'account-you-have',
];

const ITEM_COUNTS: Record<(typeof SECTION_IDS)[number], number> = {
  'profile-growth-table': 4,
  'audience-segments': 5,
  'first-impression': 4,
  'priority-content': 6,
  'content-worth-following': 7,
  'better-profile': 6,
};

const FIRST_IMPRESSION_BULLETS = [
  'profile image',
  'username',
  'bio',
  'follower count',
  'recent posts',
  'pinned content',
  'Reels',
  'highlights',
  'visible engagement',
  'overall consistency',
];

type StoryItem = { title: string; body: string };
type StorySection = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  footer?: string;
  bullets?: string[];
  paragraphs?: string[];
  items?: StoryItem[];
};

const EXPECTED: Record<(typeof SECTION_IDS)[number], Partial<StorySection>> = {
  'profile-growth-table': {
    eyebrow: 'Choose Your Instagram Priority',
    title: "Which Instagram Metric Fits What You're Trying to Improve?",
    lead: 'Start by deciding whether the priority is the overall profile, engagement on a particular post, visibility on video content or conversation beneath a post.',
    footer:
      'These metrics do different jobs. A stronger follower count does not automatically add Likes to your posts, and more Views do not automatically create new Followers. Choose the Instagram result you actually need before selecting a package.',
    items: [
      {
        title: 'Build the visible audience around the whole profile',
        body: 'Choose Instagram Followers when profile-level audience size is your priority.',
      },
      {
        title: 'Support engagement on one post or Reel',
        body: 'Choose Instagram Likes when you want to work on the visible Like count of selected content.',
      },
      {
        title: 'Put more visible attention behind a Reel or video',
        body: 'Choose Instagram Views when eligible video content is the part of the account you want to support.',
      },
      {
        title: 'Create more visible discussion beneath content',
        body: 'Choose Instagram Comments when conversation around an eligible post or Reel is the metric that matters.',
      },
    ],
  },
  'audience-segments': {
    eyebrow: 'UK Instagram',
    title: 'Different UK Accounts Need Different Instagram Priorities',
    lead: 'A creator account, local company, ecommerce brand and agency client should not all approach Instagram growth in exactly the same way.',
    items: [
      {
        title: 'UK Creators',
        body: 'Build the visible profile around a recognisable subject, style or area of expertise, then use the metric that supports the content you are prioritising.',
      },
      {
        title: 'Online Shops and Ecommerce Brands',
        body: 'Product launches, seasonal offers and creator partnerships may make particular Reels or posts more important than the overall profile number.',
      },
      {
        title: 'Local and Regional Businesses',
        body: 'Use Instagram to support real services, locations, completed work and current business activity that potential customers can understand.',
      },
      {
        title: 'Agencies and Client Teams',
        body: "Choose the service according to each client's campaign objective rather than applying the same follower or engagement package to every account.",
      },
      {
        title: 'Established UK Brands',
        body: 'Use selected visible metrics alongside genuine publishing, paid social, ecommerce, search, email and customer communication.',
      },
    ],
  },
  'first-impression': {
    title: 'Make the Profile Useful When New Visitors Arrive',
    lead: 'A UK customer or potential follower may reach your Instagram account from Google, a Reel, an advert, a creator partnership, a recommendation or your own website. The visible numbers are only part of what they can assess.',
    paragraphs: [
      'A stronger visible metric can help the account look more developed, but a visitor can also judge the bio, recent content, pinned posts, branding and whether the profile still looks active.',
      'Use NovaLikes for the specific visible metric you choose, then make sure the account behind it gives people enough information to understand who you are, what you publish and where they should go next.',
    ],
    items: [
      {
        title: 'Creator Profiles',
        body: 'Make your niche, personality and strongest work easy to recognise without expecting the follower number to explain the account for you.',
      },
      {
        title: 'Business Profiles',
        body: 'State clearly what the company provides and make the route to your website, booking page, shop or enquiry process easy to find.',
      },
      {
        title: 'Ecommerce Accounts',
        body: 'Keep important products, launches and campaign content visible when new visitors arrive from another marketing channel.',
      },
      {
        title: 'Local UK Businesses',
        body: 'Keep service, location and contact information accurate so interested visitors are not sent towards outdated business details.',
      },
    ],
  },
  'priority-content': {
    title: 'Choose the Instagram Content That Deserves Extra Attention',
    lead: 'A routine post and a major campaign asset do not have the same job. Decide which content matters commercially or creatively before choosing the metric you want to support.',
    footer:
      'Start with the role of the content. Then decide whether Likes, Views, Comments or profile-level Followers are actually relevant to that goal.',
    items: [
      {
        title: 'New Product or Collection Launches',
        body: 'Prioritise the post or Reel that explains the product clearly and represents the launch better than routine feed content.',
      },
      {
        title: 'Creator and Brand Partnerships',
        body: 'Support the content that introduces the collaboration to people who may be discovering either account for the first time.',
      },
      {
        title: 'New Business or Service Introductions',
        body: 'Use clear content to explain what the company does, who it serves and what an interested visitor should do next.',
      },
      {
        title: 'Portfolio and Project Work',
        body: 'Highlight genuine work that you would still want a potential client or customer to see several weeks or months later.',
      },
      {
        title: 'Useful Evergreen Reels',
        body: 'Tutorials, demonstrations, comparisons and practical explainers can keep representing the account long after their publication date.',
      },
      {
        title: 'Events, Openings and Major Updates',
        body: 'A new location, event, milestone or important company announcement may deserve more attention than ordinary day-to-day posts.',
      },
    ],
  },
  'content-worth-following': {
    title: 'Give People a Reason to Follow Beyond the Visible Numbers',
    lead: 'Purchased Instagram metrics can change what someone sees at a glance. They cannot create the content strategy that gives a real audience a reason to return.',
    footer:
      'Use genuine Instagram Insights and real audience behaviour to decide what deserves more of your time. Visible metrics can support presentation, but your own content should guide the longer-term strategy.',
    items: [
      {
        title: 'Use Reels to Do Something Useful',
        body: 'Demonstrate a product, explain a subject, answer a question, entertain the audience or tell a story connected to the account.',
      },
      {
        title: 'Use Carousels When More Context Helps',
        body: 'Multiple slides can work well for comparisons, processes, advice, project details and subjects that cannot be explained clearly in one image.',
      },
      {
        title: 'Make the Main Message Obvious',
        body: 'Strong creative should help viewers understand what the post is about without forcing them to guess at the purpose.',
      },
      {
        title: 'Build Recognisable Content Categories',
        body: 'Repeated themes can make it easier for visitors to understand what they are likely to see if they continue following the account.',
      },
      {
        title: 'Use Captions to Add Something',
        body: 'Provide context, useful details, relevant explanations or a clear next step instead of simply repeating the visual.',
      },
      {
        title: 'Handle Genuine Interaction Properly',
        body: 'Real customer questions, useful comments and direct messages should receive genuine responses from the creator or business behind the profile.',
      },
      {
        title: 'Use Real Account Data',
        body: 'Review Instagram Insights to understand which posts and Reels genuinely attract attention, interaction and useful audience behaviour.',
      },
    ],
  },
  'better-profile': {
    title: 'Turn More Visible Growth Into a More Useful UK Instagram Profile',
    lead: 'If additional visible activity brings more people towards the profile, make sure they arrive at an account that is clear, current and easy to explore.',
    footer:
      'The metric may influence the first glance. The quality and clarity of the profile determine what a visitor finds after that.',
    items: [
      {
        title: 'Explain the Account Clearly in the Bio',
        body: 'A new visitor should be able to understand the creator, company or subject of the account without searching through older posts.',
      },
      {
        title: 'Use Pinned Content Strategically',
        body: 'Keep introductions, important services, strong projects or useful evergreen Reels easy to find near the top of the profile.',
      },
      {
        title: 'Keep the Content Direction Understandable',
        body: 'A consistent subject or brand direction helps visitors understand what else they can expect from the account.',
      },
      {
        title: 'Remove Outdated Commercial Information',
        body: 'Check links, locations, offers and contact information so potential customers are not sent towards details that no longer apply.',
      },
      {
        title: 'Show Recent Activity',
        body: 'Current posts and Reels give visitors more evidence that the profile is actively managed today.',
      },
      {
        title: 'Make the Next Action Obvious',
        body: 'If the account supports a business, make it straightforward for interested visitors to shop, enquire, book, contact you or learn more.',
      },
    ],
  },
};

function loadStorySections(market: 'us' | 'uk'): StorySection[] {
  const raw = JSON.parse(readFileSync(`content/markets/${market}/homepage.json`, 'utf8')) as {
    storySections: StorySection[];
  };
  return raw.storySections;
}

function sectionText(s: StorySection): string {
  const parts: string[] = [s.title];
  if (s.eyebrow) parts.push(s.eyebrow);
  if (s.lead) parts.push(s.lead);
  if (s.footer) parts.push(s.footer);
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

function compareSection(actual: StorySection, exp: Partial<StorySection>, id: string): boolean {
  let ok = true;
  if (exp.eyebrow !== undefined && actual.eyebrow !== exp.eyebrow) {
    console.error(`FAIL ${id} eyebrow`);
    ok = false;
  }
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
  if (exp.paragraphs) {
    if (JSON.stringify(actual.paragraphs) !== JSON.stringify(exp.paragraphs)) {
      console.error(`FAIL ${id} paragraphs`);
      ok = false;
    }
  }
  const expectedItems = exp.items ?? [];
  if ((actual.items?.length ?? 0) !== expectedItems.length) {
    console.error(`FAIL ${id} item count`);
    ok = false;
  }
  for (let i = 0; i < expectedItems.length; i++) {
    if (actual.items?.[i]?.title !== expectedItems[i]?.title) {
      console.error(`FAIL ${id} item[${i}] title`);
      ok = false;
    }
    if (actual.items?.[i]?.body !== expectedItems[i]?.body) {
      console.error(`FAIL ${id} item[${i}] body`);
      ok = false;
    }
  }
  if (ok) console.log(`OK ${id}`);
  return ok;
}

const usBefore = readFileSync('content/markets/us/homepage.json', 'utf8');
const ukSections = loadStorySections('uk');
const usSections = loadStorySections('us');

let pass = 0;
console.log('=== Exact copy verification (6 sections) ===');
for (const id of SECTION_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== Section order ===');
const ukIds = ukSections.map((s) => s.id);
const expectedOrder = ukIds.indexOf('profile-growth-table');
const orderOk =
  SECTION_IDS.every((id, i) => ukIds.indexOf(id) === ukIds.indexOf(SECTION_IDS[0]) + i);
console.log(orderOk ? 'OK — 6 sections in same relative order' : 'FAIL order');

console.log('\n=== first-impression bullets unchanged ===');
const fi = ukSections.find((s) => s.id === 'first-impression');
const bulletsOk = JSON.stringify(fi?.bullets) === JSON.stringify(FIRST_IMPRESSION_BULLETS);
console.log(bulletsOk ? 'OK' : 'FAIL');

console.log('\n=== Other storySections present ===');
for (const id of UNTOUCHED_IDS) {
  console.log(ukIds.includes(id) ? `OK ${id}` : `FAIL missing ${id}`);
}

console.log('\n=== US homepage unchanged ===');
const usAfter = readFileSync('content/markets/us/homepage.json', 'utf8');
console.log(usBefore === usAfter ? 'OK — us/homepage.json unchanged' : 'FAIL — us changed');

console.log('\n=== US vs UK similarity (6 rewritten sections) ===');
for (const id of SECTION_IDS) {
  const us = usSections.find((s) => s.id === id)!;
  const uk = ukSections.find((s) => s.id === id)!;
  const sim = jaccard(tokenSet(sectionText(us)), tokenSet(sectionText(uk)));
  console.log(`${id}: ${(sim * 100).toFixed(1)}%`);
}

console.log('\n=== Overall US vs UK homepage storySections similarity ===');
const overallSim = jaccard(
  tokenSet(homepageText(usSections)),
  tokenSet(homepageText(ukSections)),
);
console.log(`${(overallSim * 100).toFixed(1)}%`);

console.log('\n=== Shared 8+ word phrases (6 sections US vs UK) ===');
let allShared: string[] = [];
for (const id of SECTION_IDS) {
  const us = usSections.find((s) => s.id === id)!;
  const uk = ukSections.find((s) => s.id === id)!;
  const phrases = sharedPhrases8Plus(sectionText(us), sectionText(uk));
  if (phrases.length) {
    console.log(`${id}:`);
    for (const p of phrases.slice(0, 5)) console.log(`  - "${p}"`);
    if (phrases.length > 5) console.log(`  ... and ${phrases.length - 5} more`);
    allShared = allShared.concat(phrases);
  }
}
if (allShared.length === 0) console.log('None');

console.log(`\n${pass}/6 exact-copy checks passed`);
process.exit(
  pass === 6 && orderOk && bulletsOk && usBefore === usAfter ? 0 : 1,
);
