import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU7_IDS = [
  'built-for-australia',
  'clear-niche',
  'stronger-presence',
  'videos-worth-watching',
  'brand-partnerships',
  'local-businesses',
  'business-results',
  'growth-framework',
] as const;

const US_PAIR: Record<(typeof BATCH_AU7_IDS)[number], string> = {
  'built-for-australia': 'built-for-us',
  'clear-niche': 'clear-niche',
  'stronger-presence': 'better-profile',
  'videos-worth-watching': 'videos-worth-watching',
  'brand-partnerships': 'brand-partnerships',
  'local-businesses': 'local-businesses',
  'business-results': 'business-results',
  'growth-framework': 'growth-framework',
};

const UK_PAIR: Record<(typeof BATCH_AU7_IDS)[number], string> = {
  'built-for-australia': 'built-for-uk',
  'clear-niche': 'clear-niche',
  'stronger-presence': 'better-profile',
  'videos-worth-watching': 'videos-worth-watching',
  'brand-partnerships': 'brand-partnerships',
  'local-businesses': 'local-businesses',
  'business-results': 'business-results',
  'growth-framework': 'growth-framework',
};

const UNTOUCHED_IDS = ['campaign-moments', 'fyp-reach', 'monetisation', 'platform-rules'] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-moments': 'Use TikTok Follower Growth Around Important Australian Campaigns',
  'fyp-reach': 'Followers and For You Page Reach Are Different Things',
  monetisation: "Don't Treat Purchased Followers as a Shortcut to Monetisation",
  'platform-rules': "Understand TikTok's Rules Around Artificial Engagement",
};

const BENEFITS_TITLE = 'Why Creators and Brands Build Their TikTok Follower Count';

type StoryItem = { title: string; body: string };
type StorySection = {
  id: string;
  title: string;
  lead?: string;
  footer?: string;
  paragraphs?: string[];
  items?: StoryItem[];
};

const EXPECTED: Record<(typeof BATCH_AU7_IDS)[number], Partial<StorySection>> = {
  'built-for-australia': {
    title: 'Build TikTok Followers Around the Australian Account You Actually Want to Grow',
    lead: 'A TikTok follower number belongs to the whole profile, so the right approach starts with what the account represents and what genuine visitors will find after they open it.',
    paragraphs: [
      'An Australian creator may be developing a recognisable subject, style or recurring series. An ecommerce business may use TikTok to demonstrate products and support launches. Local businesses may show real services, projects, venues or experiences. Established brands may connect TikTok with broader campaigns, while agencies can manage client accounts with very different audiences and commercial objectives.',
      'Start with the existing account rather than choosing a follower number in isolation. Review the niche, recent videos, current audience and role TikTok plays in the wider strategy before deciding what visible increase makes sense.',
    ],
    footer:
      'Followers can strengthen the displayed audience size. The profile, content and real account behind that number still determine what a visitor finds.',
    items: [
      {
        title: 'Australian Creators',
        body: 'Build the visible audience around a profile with a clear niche, recognisable content direction and enough useful videos for new visitors to explore.',
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Use follower growth alongside genuine demonstrations, launches and product content connected to items customers can actually research or buy.',
      },
      {
        title: 'Local Businesses',
        body: 'Support a TikTok profile that shows genuine services, locations, work or experiences rather than depending on audience size alone.',
      },
      {
        title: 'Agencies and Client Accounts',
        body: "Choose quantities according to each client's current profile, content base and campaign objective instead of using one standard follower target.",
      },
      {
        title: 'Established Brands',
        body: 'Support profile presentation while genuine publishing, advertising, partnerships and wider audience activity continue independently.',
      },
    ],
  },
  'clear-niche': {
    title: 'Give New TikTok Visitors a Clear Reason to Understand the Account',
    lead: 'Follower growth has stronger context when someone opening the profile can quickly see what subjects, expertise, products or experiences the account is built around.',
    footer:
      'Follower packages can support the visible audience. Clear positioning helps genuine visitors understand why the account may be relevant to them.',
    items: [
      {
        title: 'Make the Main Subject Easy to Recognise',
        body: 'A new visitor should not need to watch ten unrelated videos before understanding what the creator, business or brand usually publishes.',
      },
      {
        title: 'Develop Formats That Fit the Account',
        body: 'Turn genuine tutorials, demonstrations, comparisons, transformations, explainers or recurring series into recognisable content patterns.',
      },
      {
        title: 'Use Pinned Videos as an Introduction',
        body: 'Keep important videos visible when they explain the account, show strong work or give new visitors a useful place to begin.',
      },
      {
        title: 'Keep Recent Videos Connected to the Positioning',
        body: 'A profile becomes easier to understand when recent activity supports the subject or purpose the account claims to represent.',
      },
      {
        title: 'Give People a Reason to Come Back',
        body: 'Use ongoing content to show what genuine followers can expect in the future rather than relying on the existing audience number.',
      },
    ],
  },
  'stronger-presence': {
    title: 'Make the TikTok Profile More Useful Before Focusing on a Larger Audience',
    lead: 'A bigger follower number works better when the profile itself gives new visitors enough information and content to decide whether they want to keep exploring.',
    footer:
      'Followers can support profile presentation. A clear and active account gives the visible audience number better context.',
    items: [
      {
        title: 'Use the Bio to Clarify the Account',
        body: 'Explain the creator, brand or business clearly enough that someone arriving from one video can understand what the wider profile represents.',
      },
      {
        title: 'Keep Strong Introductory Videos Visible',
        body: "Pin useful content when it helps demonstrate the niche, business, products, services or strongest examples of the account's work.",
      },
      {
        title: 'Publish With a Consistent Purpose',
        body: 'Consistency should come from a recognisable direction rather than posting unrelated videos simply to keep the account active.',
      },
      {
        title: 'Make the Profile Match the Real Brand',
        body: 'For Australian businesses, TikTok visuals, claims and public information should align with the company customers find on other official channels.',
      },
      {
        title: 'Give Interested Viewers Somewhere to Go Next',
        body: 'If the account supports a business, help genuine visitors understand how to research a product, visit the website, enquire, book or take another appropriate action.',
      },
    ],
  },
  'videos-worth-watching': {
    title: 'Give Genuine Viewers a Reason to Follow After Watching the Video',
    lead: 'Purchased Followers can change the audience number shown on the profile, but they cannot create the videos that make a real viewer decide the account is worth following.',
    footer:
      'Use purchased Followers for the visible metric they provide. Let genuine watch behaviour and audience response guide the content strategy.',
    items: [
      {
        title: 'Make the Subject Clear Early',
        body: 'Help viewers understand what the video is about before a long introduction gives them a reason to scroll away.',
      },
      {
        title: 'Bring the Useful Part Forward',
        body: 'Show the result, demonstration, explanation, product or main idea early when that is what makes the video worth watching.',
      },
      {
        title: 'Test Different Ways to Open a Video',
        body: 'Use genuine performance to learn which openings make the subject easier to understand and hold attention more effectively.',
      },
      {
        title: 'Turn Strong Subjects Into Ongoing Series',
        body: 'When real viewers respond well to a topic, build related videos that give followers another reason to return.',
      },
      {
        title: 'Learn From Authentic Questions',
        body: 'Real Comments can reveal what viewers did not understand, what interested them and what they may want the account to cover next.',
      },
      {
        title: 'Use Genuine TikTok Analytics',
        body: 'Review actual account performance to understand which videos earn real attention instead of judging content by follower count alone.',
      },
    ],
  },
  'brand-partnerships': {
    title: 'Give Australian Brands More to Assess Than the TikTok Follower Number',
    paragraphs: [
      'A creator may want a stronger visible audience when preparing for collaborations, but an Australian brand or agency can assess much more than the follower total displayed on the profile.',
      'A professional partnership review may consider creator positioning, audience relevance, video quality, genuine Views, authentic engagement, consistency, previous collaborations, communication, campaign suitability and reliable performance information.',
      'If brand work matters, prepare the whole account for that assessment. Keep the niche easy to understand, publish videos you would be comfortable showing to a potential partner and use genuine analytics when real audience performance needs to be demonstrated.',
    ],
  },
  'local-businesses': {
    title: 'Build TikTok Followers Around a Local Business People Can Actually Verify',
    paragraphs: [
      'TikTok can help an Australian local business show customers details that are difficult to communicate through a business name alone. Restaurants can show venues and food. Trades can document completed work. Salons can demonstrate treatments. Retailers may show products. Property businesses can feature listings. Tourism and hospitality companies can present real destinations and experiences. Professional services can explain how their work is carried out.',
      'If you build Followers around this type of account, make sure the profile represents the genuine company. Locations, services, contact information and public claims should remain consistent with the website, Google presence and other official channels customers may use to verify the business.',
    ],
    footer:
      'Visible audience size can support presentation. Local trust comes from the real Australian business behind the TikTok account.',
  },
  'business-results': {
    title: 'Measure What TikTok Contributes Beyond the Follower Total',
    lead: 'A larger follower number may affect how established the profile appears, but it does not tell an Australian business whether TikTok is creating useful customer activity.',
    footer:
      'Use Followers for the displayed audience metric they provide. Judge commercial value using the real outcomes the business actually cares about.',
    items: [
      {
        title: 'Website Activity',
        body: 'Check whether genuine TikTok interest leads people to visit and explore the business website.',
      },
      {
        title: 'Real Enquiries and Messages',
        body: 'Track whether potential customers contact the company with genuine questions about products, services, availability or bookings.',
      },
      {
        title: 'Bookings and In-Person Actions',
        body: 'For relevant businesses, measure whether TikTok contributes to appointments, reservations, store visits or other real-world customer activity.',
      },
      {
        title: 'Orders and Product Interest',
        body: 'Where ecommerce or products are involved, evaluate genuine purchases and buying interest separately from follower growth.',
      },
      {
        title: 'Business Awareness',
        body: 'Look at whether TikTok helps relevant people understand the brand, offering or reason the business may be useful to them.',
      },
    ],
  },
  'growth-framework': {
    title: 'A Practical TikTok Audience Plan for Australian Accounts',
    lead: 'Follower count can support the profile, but stronger TikTok growth comes from clear positioning, useful videos and learning from genuine audience behaviour.',
    footer:
      'Keep purchased Followers in perspective as one visible audience metric. Longer-term growth depends on the content and genuine people behind the account.',
    items: [
      {
        title: 'Define What the Account Should Be Known For',
        body: 'Make the creator niche, business category or brand position easy for a new visitor to recognise.',
      },
      {
        title: 'Build Enough Content to Support the Profile',
        body: 'Give people several useful videos to explore so the account has substance beyond its displayed follower count.',
      },
      {
        title: 'Develop Formats You Can Repeat',
        body: 'Turn genuinely useful demonstrations, explainers, series and other successful concepts into recurring content.',
      },
      {
        title: 'Keep Testing the Creative',
        body: 'Experiment with openings, subjects and video structures while using real audience behaviour to judge what improves.',
      },
      {
        title: 'Review Genuine TikTok Analytics',
        body: 'Use actual account data to understand which videos earn real attention and interaction from genuine viewers.',
      },
      {
        title: 'Treat Authentic Interaction as Feedback',
        body: 'Real Comments and questions can reveal what people want explained, demonstrated or discussed in future videos.',
      },
      {
        title: 'Connect TikTok With the Wider Australian Customer Journey',
        body: 'Businesses may use TikTok alongside Instagram, their website, Google visibility, search, ecommerce, paid media and email.',
      },
      {
        title: 'Measure Purchased Followers Separately',
        body: 'Use Followers for the public audience number they provide while evaluating organic growth, genuine engagement and commercial outcomes independently.',
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
  if (exp.paragraphs && JSON.stringify(actual.paragraphs) !== JSON.stringify(exp.paragraphs)) {
    console.error(`FAIL ${id} paragraphs`);
    ok = false;
  }
  if (id === 'brand-partnerships' && actual.footer !== undefined) {
    console.error('FAIL brand-partnerships has footer (should be absent)');
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

const auPath = 'content/markets/au/services/buy-tiktok-followers.json';
const usPath = 'content/markets/us/services/buy-tiktok-followers.json';
const ukPath = 'content/markets/uk/services/buy-tiktok-followers.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auRaw = JSON.parse(readFileSync(auPath, 'utf8')) as {
  content?: { benefits?: { title: string } };
  dummy?: { storySections?: StorySection[] };
};
const auSections = auRaw.dummy?.storySections ?? [];
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-tt-followers-before-batch-au7.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;

let pass = 0;
console.log('=== Exact copy verification (8 sections) ===');
for (const id of BATCH_AU7_IDS) {
  const actual = auSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== Story section order ===');
const ids = auSections.map((s) => s.id);
const expectedOrder = [
  'built-for-australia',
  'clear-niche',
  'stronger-presence',
  'campaign-moments',
  'fyp-reach',
  'videos-worth-watching',
  'brand-partnerships',
  'local-businesses',
  'business-results',
  'monetisation',
  'platform-rules',
  'growth-framework',
];
console.log(JSON.stringify(ids) === JSON.stringify(expectedOrder) ? 'OK order' : 'FAIL order');

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = auSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== Benefits unchanged ===');
console.log(auRaw.content?.benefits?.title === BENEFITS_TITLE ? 'OK benefits title' : 'FAIL benefits title');

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU7_IDS)[number], string>,
  auBeforeList: StorySection[] | null,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU7_IDS) {
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

reportPair('AU vs US similarity (8 targeted sections)', auSections, usSections, US_PAIR, auBeforeSections);
reportPair('AU vs UK similarity (8 targeted sections)', auSections, ukSections, UK_PAIR, auBeforeSections);

function combinedAu(sections: StorySection[]): string {
  return BATCH_AU7_IDS.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function combinedOther(
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU7_IDS)[number], string>,
): string {
  return BATCH_AU7_IDS.map((id) =>
    sectionText(otherList.find((s) => s.id === pairMap[id])!),
  ).join('\n');
}

const auCombined = combinedAu(auSections);
const usCombined = combinedOther(usSections, US_PAIR);
const ukCombined = combinedOther(ukSections, UK_PAIR);

console.log('\n=== Combined targeted-section similarity ===');
const auUsAfter = jaccard(tokenSet(auCombined), tokenSet(usCombined));
const auUkAfter = jaccard(tokenSet(auCombined), tokenSet(ukCombined));
let usLine = `AU vs US After: ${(auUsAfter * 100).toFixed(1)}%`;
let ukLine = `AU vs UK After: ${(auUkAfter * 100).toFixed(1)}%`;
if (auBeforeSections) {
  const auBeforeCombined = combinedAu(auBeforeSections);
  usLine = `AU vs US Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(usCombined)) * 100).toFixed(1)}% | After: ${(auUsAfter * 100).toFixed(1)}%`;
  ukLine = `AU vs UK Before: ${(jaccard(tokenSet(auBeforeCombined), tokenSet(ukCombined)) * 100).toFixed(1)}% | After: ${(auUkAfter * 100).toFixed(1)}%`;
}
console.log(usLine);
console.log(ukLine);
console.log('Note: AU stronger-presence compared to US/UK better-profile.');

console.log('\n=== Shared 8+ word phrases (AU vs US, 8 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU7_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === US_PAIR[id])!;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 8);
  if (phrases.length) {
    console.log(`${id}↔${US_PAIR[id]}:`);
    for (const p of phrases.slice(0, 8)) console.log(`  - "${p}"`);
    p8 = p8.concat(phrases);
  }
}
if (p8.length === 0) console.log('None');

console.log('\n=== Shared 20+ word phrases (AU vs US, 8 pairs) ===');
let p20: string[] = [];
for (const id of BATCH_AU7_IDS) {
  const au = auSections.find((s) => s.id === id)!;
  const us = usSections.find((s) => s.id === US_PAIR[id])!;
  const phrases = sharedPhrases(sectionText(au), sectionText(us), 20);
  if (phrases.length) {
    console.log(`${id}↔${US_PAIR[id]}:`);
    for (const p of phrases) console.log(`  - "${p}"`);
    p20 = p20.concat(phrases);
  }
}
if (p20.length === 0) console.log('None');

console.log(`\n${pass}/8 exact-copy checks passed`);
process.exit(pass === 8 ? 0 : 1);
