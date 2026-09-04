import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH6E_UK_IDS = [
  'built-for-uk',
  'build-conversation',
  'make-comments-fit',
  'reply-genuine',
  'trust-management',
  'real-experience',
  'social-proof',
  'measure-performance',
  'local-businesses',
] as const;

const US_PAIR: Record<(typeof BATCH6E_UK_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'build-conversation': 'build-conversation',
  'make-comments-fit': 'make-comments-fit',
  'reply-genuine': 'reply-genuine',
  'trust-management': 'trust-management',
  'real-experience': 'real-experience',
  'social-proof': 'social-proof',
  'measure-performance': 'measure-performance',
  'local-businesses': 'local-businesses',
};

const UNTOUCHED_IDS = [
  'uk-campaign-moments',
  'organic-reach',
  'instagram-insights',
  'comment-strategy',
] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'uk-campaign-moments': 'Put More Conversation Behind Important UK Campaign Moments',
  'organic-reach': 'Instagram Comments and Organic Reach Are Not the Same Thing',
  'instagram-insights': 'Use Instagram Insights to Understand Genuine Conversation',
  'comment-strategy': 'A Practical Instagram Comment Strategy for UK Accounts',
};

const BATCH2_BENEFITS_TITLE =
  'Build Visible Discussion Around Instagram Content Worth Talking About';

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

const EXPECTED: Record<(typeof BATCH6E_UK_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Choose Instagram Comments Around the UK Content You Actually Want to Support',
    lead: 'Comments belong to an individual post or Reel, so the right approach depends on the subject of that content and the account publishing it.',
    paragraphs: [
      'A UK creator may have a collaboration, opinion post or Reel that naturally gives viewers something to discuss. An ecommerce brand may be launching a product or collection where people could have genuine questions. A local business may publish work, services or updates that need explanation. Agencies may manage several client campaigns where the purpose and tone of the conversation differ from account to account.',
      'Start with the post rather than the number of Comments. Understand what the content is communicating, what type of conversation fits beside it and how the account will handle genuine responses afterwards.',
    ],
    footer:
      'Comments can support visible conversation around selected content. The post itself should provide the context that makes that conversation believable and useful.',
    items: [
      {
        title: 'UK Creators',
        body: 'Use Comments around posts and Reels with a clear subject that naturally allows genuine viewers to react, ask questions or share an opinion.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Focus on launches, collections, demonstrations and product content where questions about genuine products could reasonably appear.',
      },
      {
        title: 'Local Businesses',
        body: 'Support content showing real services, projects, locations and updates that potential customers may genuinely want to understand better.',
      },
      {
        title: 'Agencies and Client Accounts',
        body: 'Choose the comment option and quantity according to the individual client post rather than applying one engagement pattern across every campaign.',
      },
      {
        title: 'Established Brands',
        body: 'Use visible conversation around selected campaign content while genuine community management and customer communication continue separately.',
      },
    ],
  },
  'build-conversation': {
    title: 'Give the Instagram Post a Clear Subject Before Building Conversation Around It',
    lead: 'A visible comment section makes more sense when viewers can immediately understand what the post is about and what there is to respond to.',
    footer:
      'Purchased Comments can add visible activity. Clear content gives the conversation around the post useful context.',
    items: [
      {
        title: 'Give Viewers Something Specific to Discuss',
        body: 'Use a clear question, comparison, opinion, product detail, result or subject instead of relying on a vague request for engagement.',
      },
      {
        title: 'Use the Caption to Add Context',
        body: 'Explain enough of the story, product, project or idea for someone reading the post to understand what is happening.',
      },
      {
        title: 'Make the Creative Match the Subject',
        body: 'The image, carousel or Reel should support the same topic rather than sending a different message from the caption and conversation.',
      },
      {
        title: 'Keep the Post Focused',
        body: 'One understandable subject usually provides stronger context for discussion than a post trying to communicate several unrelated messages.',
      },
      {
        title: 'Make the Wider Profile Support the Post',
        body: 'If genuine interest leads someone to explore the account, the profile should reinforce the creator niche, business or brand behind the content.',
      },
    ],
  },
  'make-comments-fit': {
    title: 'Make Sure the Comment Section Makes Sense Beside the Content',
    lead: 'Comment relevance matters because someone can see the conversation and the post together.',
    paragraphs: [
      'A restaurant Reel may lead to discussion about the dish, menu or location. A renovation post may create questions about materials, design or the finished work. A beauty post may invite questions about the treatment or product. A clothing launch may generate discussion around colours, fit or availability. An estate agency post may lead to property questions. A creator partnership may prompt reactions to the collaboration. Educational content may create genuine follow-up questions about the subject being explained.',
    ],
    footer:
      'A larger comment count is not automatically better when the conversation looks unrelated to the post. Keep visible interaction connected to the content it appears beneath.',
  },
  'reply-genuine': {
    title: 'Handle Genuine Instagram Questions With Your Own Real Information',
    lead: 'Purchased Comments and genuine audience responses are different. When real users ask about the creator, product, service or business, those replies should come from someone who actually knows the answer.',
    paragraphs: [
      'For a UK business, genuine questions may involve prices, delivery areas, opening times, appointments, availability, products, services, bookings or locations. Creators may receive real questions about the subject, collaboration or content itself. Answer those users accurately instead of treating every comment as just another engagement number.',
    ],
    footer:
      'Real people deserve real answers. Use first-hand knowledge so genuine public conversations remain accurate and useful.',
  },
  'trust-management': {
    title: 'Manage the Comment Section Like Part of the Public Customer Experience',
    lead: 'Anyone viewing the post can also see how the account handles questions, complaints, spam and genuine interaction.',
    footer:
      'Visible conversation can support presentation. Credibility depends on how accurately and responsibly the account communicates with real people.',
    items: [
      {
        title: 'Answer Real Questions With Accurate Information',
        body: 'Check genuine product, service, availability or policy information rather than guessing in a public reply.',
      },
      {
        title: 'Do Not Turn Comments Into Fake Customer Stories',
        body: 'Do not present invented testimonials, purchases or experiences as if they came from genuine customers.',
      },
      {
        title: 'Keep Irrelevant Spam Under Control',
        body: 'Moderate obvious spam or unrelated activity where appropriate so useful conversations remain easier to follow.',
      },
      {
        title: 'Handle Real Complaints Through the Proper Process',
        body: "If an actual customer raises a problem, respond appropriately and move the issue into the business's normal support process when necessary.",
      },
      {
        title: 'Keep Genuine Replies Consistent With the Account',
        body: 'Responses from the creator or business should match its normal voice and provide information the account can genuinely support.',
      },
    ],
  },
  'real-experience': {
    title: 'Use Instagram Conversation Around Content Based on Real Experience',
    lead: 'Posts built from genuine work, products and knowledge naturally give viewers more specific things to ask about or discuss.',
    footer:
      'Comments can support visible interaction. First-hand experience gives the underlying content something meaningful for people to respond to.',
    items: [
      {
        title: 'Show Work You Have Actually Completed',
        body: 'Use genuine projects, transformations and results that give viewers specific details they can see and discuss.',
      },
      {
        title: 'Talk About Products You Really Offer',
        body: 'Use accurate product information so genuine questions about features, availability or use can be answered properly.',
      },
      {
        title: 'Explain Processes You Understand',
        body: 'Turn real professional or practical knowledge into content that can support useful follow-up discussion.',
      },
      {
        title: 'Use Recurring Customer Questions as Content Ideas',
        body: 'Questions received through enquiries, consultations and customer conversations can reveal subjects people genuinely want explained.',
      },
      {
        title: 'Share a First-Hand Point of View',
        body: 'Original experience and informed opinions can give genuine viewers more to respond to than general advice repeated across similar accounts.',
      },
    ],
  },
  'social-proof': {
    title: 'Keep Instagram Comments Separate From Genuine Customer Proof',
    paragraphs: [
      'Visible conversation can make a post appear more active, but a comment count does not show whether genuine customers have bought from, hired or recommended the business.',
      'UK businesses may have stronger customer evidence through verified reviews, authentic testimonials, genuine customer Comments, customer-created content, completed projects, case studies, accurate company information and responsive service.',
      'Use real proof where it exists. Do not present purchased Comments as customer approval or as evidence that genuine buyers recommend the business.',
    ],
    footer:
      'Comments can support the visible conversation around a post. Genuine customer experience provides a separate and more meaningful form of proof.',
  },
  'measure-performance': {
    title: 'Measure Real Instagram Response Separately From the Public Comment Count',
    lead: 'The number of visible Comments is only one part of a post. Genuine Instagram and business data can show whether real people found the content useful enough to interact or take another action.',
    footer:
      'Purchased Comments affect one visible metric. Use genuine Instagram Insights and real business outcomes when deciding what content actually performs.',
    items: [
      {
        title: 'Genuine Audience Comments',
        body: 'Look at what real users independently ask, discuss or contribute around the content.',
      },
      {
        title: 'Voluntary Shares',
        body: 'People choosing to send the post to someone else can indicate that the content was relevant or useful to them.',
      },
      {
        title: 'Real Saves',
        body: 'Saves may show that genuine viewers want to return to the information, idea or inspiration later.',
      },
      {
        title: 'Profile Activity',
        body: 'Check whether genuine interest in the content encourages people to explore the wider Instagram account.',
      },
      {
        title: 'Messages and Enquiries',
        body: 'For creators and businesses, genuine direct contact can show that the post created interest beyond its public engagement numbers.',
      },
      {
        title: 'Commercial or Campaign Outcomes',
        body: 'Where relevant, measure bookings, enquiries, orders or other real objectives directly rather than using the Comment count as a substitute.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use Instagram Comments Around Posts That Naturally Create Local Customer Questions',
    paragraphs: [
      'Local-business content can provide useful conversation opportunities because potential customers often need practical information before deciding whether to visit, enquire or buy.',
      'A restaurant may post a menu item that creates questions about availability or location. A builder may show completed work that prompts questions about the project. A salon may present a treatment. An interior designer can show a finished space. A retailer may introduce new stock. An estate agent can feature a property. An event business may receive questions about dates or access. A professional service can publish an explanation around a common customer concern.',
      'If you add Comments to this type of content, keep the business behind the post accurate. Genuine questions about services, locations, availability or bookings should still receive reliable answers.',
    ],
    footer:
      'Visible conversation can support presentation of a local-business post. Local trust comes from the real company, its work and how it responds to genuine customers.',
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
  ids: readonly (typeof BATCH6E_UK_IDS)[number][],
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

const ukPath = 'content/markets/uk/services/buy-instagram-comments.json';
const usBefore = readFileSync('content/markets/us/services/buy-instagram-comments.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-instagram-comments.json');
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'uk-ig-comments-before-batch6e.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (9 sections) ===');
for (const id of BATCH6E_UK_IDS) {
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
const usAfter = readFileSync('content/markets/us/services/buy-instagram-comments.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (9 direct pairs) ===');
for (const ukId of BATCH6E_UK_IDS) {
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
const usMatchingText = BATCH6E_UK_IDS.map((ukId) =>
  sectionText(usSections.find((s) => s.id === US_PAIR[ukId])!),
).join('\n');
const ukMatchingAfter = matchingPairsText(ukSections, BATCH6E_UK_IDS);
const afterCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingAfter));
let combinedLine = `After: ${(afterCombined * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukMatchingBefore = matchingPairsText(ukBeforeSections, BATCH6E_UK_IDS);
  const beforeCombined = jaccard(tokenSet(usMatchingText), tokenSet(ukMatchingBefore));
  combinedLine = `Before: ${(beforeCombined * 100).toFixed(1)}% | After: ${(afterCombined * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (9 pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH6E_UK_IDS) {
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
