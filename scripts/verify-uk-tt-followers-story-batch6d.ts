import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH6D_UK_IDS = [
  'built-for-uk',
  'clear-niche',
  'videos-worth-watching',
  'better-profile',
  'local-businesses',
  'business-proof',
  'brand-partnerships',
  'business-results',
  'growth-framework',
] as const;

const US_PAIR: Record<(typeof BATCH6D_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'clear-niche': 'clear-niche',
  'videos-worth-watching': 'videos-worth-watching',
  'better-profile': 'better-profile',
  'local-businesses': 'local-businesses',
  'business-proof': 'business-proof',
  'brand-partnerships': 'brand-partnerships',
  'business-results': 'business-results',
  'growth-framework': 'growth-framework',
};

const UNTOUCHED_IDS = [
  'uk-campaign-moments',
  'fyp-reach',
  'monetisation',
  'organic-growth',
  'platform-rules',
] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'uk-campaign-moments': 'Use TikTok Followers Around Important UK Campaign Moments',
  'fyp-reach': 'Followers and For You Page Reach Are Different Things',
  monetisation: "Don't Treat Followers as a Shortcut to TikTok Features or Monetisation",
  'organic-growth': 'Understand Purchased Followers and Organic Growth as Different Outcomes',
  'platform-rules': 'TikTok Platform Rules and Third-Party Engagement Services',
};

const BATCH2_BENEFITS_TITLE = 'Support a TikTok Profile With a Clear Identity Behind It';

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

const EXPECTED: Record<(typeof BATCH6D_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Build TikTok Followers Around the UK Account You Actually Have',
    lead: 'TikTok Followers are a profile-level audience metric, so the right quantity depends on the account, its current content and the role TikTok plays in the wider brand or business.',
    paragraphs: [
      'A UK creator may be developing an audience around a specific subject, personality or style. An ecommerce brand may use TikTok for demonstrations, launches and seasonal campaigns. A local company may use short-form video to show services, products or completed work. Agencies can manage several profiles with completely different audiences, while established brands may use TikTok alongside paid media, search, ecommerce, email and other social platforms.',
      'Start with the profile as it exists today. Look at the current follower count, video library, niche and purpose of the account before choosing the visible audience increase you want.',
    ],
    footer:
      'Followers can strengthen the displayed audience size. The content and profile behind that number determine whether the account is worth exploring.',
    items: [
      {
        title: 'UK Creators',
        body: 'Build the visible audience around a recognisable niche while continuing to publish videos that give genuine viewers a reason to return.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Use follower growth alongside product demonstrations, launches, customer education and campaigns connected to genuine products.',
      },
      {
        title: 'Local Businesses',
        body: 'Support profiles built around real services, projects, locations, products and current business activity.',
      },
      {
        title: 'Agencies and Client Accounts',
        body: "Choose follower quantities according to each client's existing profile, content base and campaign objective rather than applying one standard number.",
      },
      {
        title: 'Established Brands',
        body: 'Support profile presentation while genuine publishing, advertising, partnerships and audience activity continue separately.',
      },
    ],
  },
  'clear-niche': {
    title: 'Make the TikTok Account Easy to Understand Before Growing the Audience Number',
    lead: 'A larger follower total has more context when someone visiting the profile can quickly recognise what the account is about and why they might want to follow it.',
    footer:
      'Purchased Followers can support visible audience size. Clear positioning helps genuine visitors understand what that audience is following.',
    items: [
      {
        title: 'Define the Main Subject Clearly',
        body: 'Make the creator niche, business category, expertise or recurring subject obvious enough for a new visitor to recognise quickly.',
      },
      {
        title: 'Create Formats People Can Recognise',
        body: 'Develop demonstrations, explainers, reactions, behind-the-scenes videos or other formats that fit the subject and can be repeated naturally.',
      },
      {
        title: 'Use Pinned Videos as an Introduction',
        body: 'Pin content that explains the account, presents strong work, introduces an important product or answers a useful question.',
      },
      {
        title: 'Keep Recent Videos Connected to the Positioning',
        body: 'A follower number makes more sense when the latest content still reflects the niche or purpose described by the profile.',
      },
      {
        title: 'Show What Someone Can Expect Next',
        body: 'The existing video library should give genuine visitors a reasonable idea of the type of content they are likely to see by following.',
      },
    ],
  },
  'videos-worth-watching': {
    title: 'Give the Follower Number a Video Library Worth Exploring',
    lead: 'Follower growth changes the visible size of the profile audience. If TikTok matters beyond that metric, keep improving the videos that genuine visitors find when they arrive.',
    footer:
      'Purchased Followers affect one profile number. Genuine viewing behaviour should guide what the account films, improves and publishes next.',
    items: [
      {
        title: 'Make the Subject Clear Early',
        body: 'Give viewers enough context in the opening moments to understand what the video is about and why they may want to continue.',
      },
      {
        title: 'Give Each Video a Useful Job',
        body: 'Teach, demonstrate, compare, entertain, answer, explain or show something relevant instead of publishing without a clear reason.',
      },
      {
        title: 'Test Different Ways to Open the Same Topic',
        body: 'Experiment with hooks, questions, demonstrations and direct introductions to learn what genuine viewers respond to.',
      },
      {
        title: 'Turn Strong Ideas Into Repeatable Series',
        body: 'When a subject or format genuinely performs well, build additional videos around the idea instead of treating it as a one-off.',
      },
      {
        title: 'Use Real Questions as Content Research',
        body: 'Genuine Comments, customer enquiries and recurring audience questions can reveal useful subjects for future videos.',
      },
      {
        title: 'Review Your Actual TikTok Analytics',
        body: 'Use genuine performance information to understand which videos earn real attention and which ideas need improvement.',
      },
    ],
  },
  'better-profile': {
    title: 'Make the TikTok Profile Useful to Someone Who Checks the New Audience',
    lead: 'If someone discovers one video and then opens the profile, the account should make it easy to understand who is behind it and what else is worth watching.',
    footer:
      'Followers can support visible audience size. The profile experience determines what an interested visitor finds after arriving.',
    items: [
      {
        title: 'Write a Bio With a Clear Purpose',
        body: 'Explain the creator, company or subject of the account without relying on vague wording that tells visitors very little.',
      },
      {
        title: 'Pin the Right Videos',
        body: 'Keep introductions, strong evergreen videos, key products or useful examples easy to find near the top of the profile.',
      },
      {
        title: 'Keep the Wider Content Direction Consistent',
        body: 'Someone interested in one video should be able to find other content connected to the same niche, business or recurring theme.',
      },
      {
        title: 'Maintain Current Activity',
        body: 'Recent relevant videos show that the account is still actively managed and give the follower total more useful context.',
      },
      {
        title: 'Give Commercial Visitors a Clear Route Forward',
        body: 'If TikTok supports a business, make it straightforward for interested viewers to visit the website, shop, enquire, book or take another relevant action.',
      },
    ],
  },
  'local-businesses': {
    title: 'Build TikTok Followers Around Content That Shows a Real UK Business',
    paragraphs: [
      'For a local business, TikTok can help potential customers see the people, services, products, places and work behind the company rather than relying only on a written description.',
      'A restaurant can show preparation or new dishes. A builder can document a transformation. A salon may present recent work. A retailer can demonstrate products. An estate agent may feature a property. A fitness business can show classes or facilities. A tourism company may present an experience. Trades and professional services can answer common customer questions through short videos.',
      'If you grow the visible follower count around that profile, keep the account connected to the genuine business. Services, locations, offers, website details and contact information should still match what a potential customer will find elsewhere.',
    ],
    footer:
      'Follower count can support profile presentation. Local confidence comes from the genuine company and the activity behind the TikTok account.',
  },
  'business-proof': {
    title: 'Keep TikTok Followers Separate From Genuine Business and Customer Proof',
    paragraphs: [
      'A larger follower number may affect how established a business profile appears, but it does not show whether real customers have used, recommended or been satisfied with the company.',
      'UK businesses may have genuine proof through verified reviews, authentic testimonials, completed projects, case studies, customer-created content, real customer comments, accurate company information and responsive customer service.',
      'Use that evidence where it genuinely exists. Do not present purchased Followers as customer approval or as proof that the business has earned a particular reputation.',
    ],
    footer:
      'Followers support one visible social metric. Genuine business activity and customer experience provide a different kind of credibility.',
  },
  'brand-partnerships': {
    title: 'Give Potential TikTok Partners More to Assess Than the Follower Count',
    paragraphs: [
      'A creator may care about follower count when preparing a profile for commercial collaborations, but serious partnership decisions can involve much more than the audience number.',
      'UK brands and agencies may look at creator positioning, content quality, genuine audience relevance, real engagement, video performance, consistency, previous collaborations, communication, professionalism and reliable campaign information.',
      'If partnerships matter, prepare the wider profile for that review. Make the niche easy to understand, publish videos you are comfortable presenting professionally and keep genuine analytics available for legitimate discussions with potential partners.',
    ],
    footer:
      'Follower count can be one visible signal. Do not present purchased Followers by themselves as proof of influence or campaign performance.',
  },
  'business-results': {
    title: 'Measure Business Results Separately From the TikTok Follower Number',
    paragraphs: [
      'A larger follower total can change how established a TikTok profile appears, but it does not automatically mean the account has created commercial value.',
      'A UK business may care more about online orders, customer enquiries, bookings, quote requests, phone calls, website visits, shop visits, qualified messages or genuine product interest.',
      'Those outcomes depend on the videos, offer, audience fit, website, pricing, reputation and customer experience as well as the wider marketing around the account.',
      'Track those results directly. Use TikTok Followers when the visible follower count is the metric you want to change, not as proof that leads or sales increased.',
    ],
  },
  'growth-framework': {
    title: 'A Practical TikTok Audience Plan for UK Accounts',
    lead: 'Followers can support the visible audience around a profile, but stronger TikTok growth comes from giving genuine viewers a clear account, useful videos and reasons to return.',
    footer:
      'Keep purchased Followers in their proper role as one visible audience metric. Use genuine viewing and account data to guide longer-term TikTok decisions.',
    items: [
      {
        title: 'Decide What the Account Should Be Known For',
        body: 'Define the creator niche, business category or recurring subject clearly enough that a new visitor can recognise it.',
      },
      {
        title: 'Build Enough Useful Videos to Explore',
        body: 'Give profile visitors several relevant pieces of content instead of expecting one strong TikTok to explain the entire account.',
      },
      {
        title: 'Develop Repeatable Content Formats',
        body: 'Turn demonstrations, explainers, series and other genuinely useful ideas into formats the account can continue producing.',
      },
      {
        title: 'Keep Testing the Creative',
        body: 'Experiment with openings, pacing, subjects and presentation so future decisions are based on real audience response.',
      },
      {
        title: 'Review Genuine TikTok Data',
        body: 'Use actual account performance to understand which videos attract real attention, interaction and organic follower activity.',
      },
      {
        title: 'Respond to Real People',
        body: 'Treat genuine Comments, questions and messages as audience conversations that can also reveal future content opportunities.',
      },
      {
        title: 'Connect TikTok With Wider UK Marketing',
        body: 'Businesses may use TikTok alongside Instagram, ecommerce, their website, search visibility, paid media, email and other customer acquisition channels.',
      },
      {
        title: 'Keep the Follower Number in Perspective',
        body: 'Use purchased Followers for the visible metric they provide while measuring genuine audience growth and business performance separately.',
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
  ids: readonly (typeof BATCH6D_UK_IDS)[number][],
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

const ukPath = 'content/markets/uk/services/buy-tiktok-followers.json';
const usBefore = readFileSync('content/markets/us/services/buy-tiktok-followers.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-tiktok-followers.json');
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'uk-tt-followers-before-batch6d.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (9 sections) ===');
for (const id of BATCH6D_UK_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

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
const usAfter = readFileSync('content/markets/us/services/buy-tiktok-followers.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (9 direct pairs) ===');
for (const ukId of BATCH6D_UK_IDS) {
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
const usMatchingText = BATCH6D_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH6D_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH6D_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (9 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH6D_UK_IDS) {
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

const allPass = pass === 9 && benefitsOk;
console.log(`\n${pass}/9 exact-copy checks passed`);
process.exit(allPass ? 0 : 1);
