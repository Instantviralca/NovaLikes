import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH5B_IDS = [
  'built-for-uk',
  'strong-first-glance',
  'clear-purpose',
  'content-worth-engaging',
  'measure-quality',
  'local-businesses',
  'real-experience',
  'customer-proof',
  'brand-partnerships',
  'growth-framework',
] as const;

const UNTOUCHED_IDS = [
  'uk-campaign-moments',
  'organic-reach',
  'likes-vs-views',
  'instagram-insights',
] as const;

const STRONG_FIRST_GLANCE_BULLETS = [
  'the photo or Reel',
  'caption',
  'Comments',
  'View count',
  'creator or business profile',
  'overall account activity',
];

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'uk-campaign-moments': 'Put More Engagement Behind Important UK Campaign Moments',
  'organic-reach': 'Instagram Likes and Organic Reach Are Not the Same Thing',
  'likes-vs-views': 'Likes and Views Tell You Different Things',
  'instagram-insights': 'Use Instagram Insights to Understand Genuine Post Performance',
};

const US_PAIR: Record<(typeof BATCH5B_IDS)[number], string> = {
  'built-for-uk': 'built-for-us',
  'strong-first-glance': 'strong-first-glance',
  'clear-purpose': 'clear-purpose',
  'content-worth-engaging': 'content-worth-engaging',
  'measure-quality': 'measure-quality',
  'local-businesses': 'local-businesses',
  'real-experience': 'real-experience',
  'customer-proof': 'customer-proof',
  'brand-partnerships': 'brand-partnerships',
  'growth-framework': '__worldwide_growth__',
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

const EXPECTED: Record<(typeof BATCH5B_IDS)[number], Partial<StorySection>> = {
  'built-for-uk': {
    title: 'Choose Instagram Likes Around the Content Your UK Account Actually Uses',
    lead: 'The reason for adding Likes should come from the role of the post or Reel, not simply from wanting every piece of content to display a larger number.',
    paragraphs: [
      'A UK creator may have a Reel that introduces their niche to a wider audience. An online retailer may have one post carrying a new collection or seasonal offer. A local company may want to support a project showcase, service explanation or important announcement. An agency may be managing several accounts where each campaign has a completely different priority.',
      'Treat Likes as a content-level choice. Start with the post that matters, understand why it matters, then choose the visible increase that fits that specific piece of content.',
    ],
    footer:
      'The Like count belongs to the post. The reason for supporting it should come from what that post is meant to achieve.',
    items: [
      {
        title: 'Creators and Personal Brands',
        body: 'Prioritise the posts and Reels that communicate your niche, strongest work or current creative direction most clearly.',
      },
      {
        title: 'Online Retailers',
        body: 'Use Likes around product launches, demonstrations, seasonal campaigns and content customers may genuinely explore before visiting the shop.',
      },
      {
        title: 'UK Local Businesses',
        body: 'Support useful posts showing real services, completed work, locations, products or current business activity.',
      },
      {
        title: 'Agencies and Client Accounts',
        body: 'Base the Like quantity on the individual content objective instead of applying one standard engagement number across every client.',
      },
      {
        title: 'Established Brands',
        body: 'Use visible Likes around selected campaign assets while genuine publishing, media activity and community management continue separately.',
      },
    ],
  },
  'strong-first-glance': {
    title: 'Give a Strong Post More Context When Someone Sees It',
    lead: 'Someone viewing an Instagram post can judge much more than the Like number. The creative, caption, comments and profile behind the post all contribute to the first impression.',
    paragraphs: [
      'A higher visible Like count can make selected content appear more active, but it cannot make an unclear offer easier to understand or turn weak creative into useful content.',
      'Before supporting the post, check that the image or Reel communicates the main idea, the caption adds useful context and the account behind it still represents the creator or business accurately.',
    ],
    footer:
      'Use Likes to support content that already deserves attention rather than expecting the number to create the value of the post.',
  },
  'clear-purpose': {
    title: 'Decide What the Post Is Supposed to Do Before Adding Likes',
    lead: 'A visible engagement increase is more purposeful when you can explain the job of the content first.',
    footer:
      'The clearer the role of the post, the easier it is to decide whether additional visible Likes actually fit the objective.',
    items: [
      {
        title: 'Introduce',
        body: 'Is this the post that introduces a creator, company, service, product or new campaign to people seeing it for the first time?',
      },
      {
        title: 'Explain',
        body: 'Does the content answer a useful question, demonstrate something or make a complicated subject easier to understand?',
      },
      {
        title: 'Show Evidence',
        body: 'Is the post presenting genuine work, a real product, a completed project or expertise that the account can actually support?',
      },
      {
        title: 'Promote',
        body: 'Does the content contain a current launch, event, offer or commercial message with accurate details?',
      },
      {
        title: 'Encourage Interaction',
        body: 'Does the subject naturally give genuine viewers something meaningful to respond to, save or share?',
      },
      {
        title: 'Move Visitors Forward',
        body: 'If someone becomes interested, is the website, shop, booking route or other next step clear?',
      },
    ],
  },
  'content-worth-engaging': {
    title: 'Use Visible Likes Around Content That Earns Its Place on the Profile',
    lead: 'If the account matters beyond one campaign, keep improving the publishing quality that a purchased Like count cannot replace.',
    footer:
      'Purchased Likes affect the selected visible number. Genuine account data should tell you what type of content deserves to be created again.',
    items: [
      {
        title: 'Make Reels Useful or Memorable',
        body: 'Demonstrate, teach, compare, explain, entertain or tell a relevant story instead of publishing video simply because Reels are available.',
      },
      {
        title: 'Use Carousels for Deeper Subjects',
        body: 'Steps, comparisons, examples and explanations often benefit from more than one slide.',
      },
      {
        title: 'Write Captions That Add Information',
        body: 'Use the caption to provide context, details or a next action instead of repeating what viewers can already see.',
      },
      {
        title: 'Keep the Account Recognisable',
        body: 'Visual choices and recurring subjects should help a visitor connect the individual post with the wider creator or brand.',
      },
      {
        title: 'Treat Real Replies as Real People',
        body: 'Meaningful comments and genuine questions deserve a proper response from whoever manages the account.',
      },
      {
        title: 'Compare Content Using Your Own Insights',
        body: 'Look at genuine performance across posts and Reels to identify the formats and subjects your actual audience responds to.',
      },
    ],
  },
  'measure-quality': {
    title: 'Use Real Performance Signals to Judge Whether the Post Worked',
    lead: 'The public Like total is only one visible number. When assessing content created for a real audience or commercial goal, review the behaviour that happened around it as well.',
    footer:
      'Purchased Likes should remain separate from genuine performance reporting. Use real Instagram and business data for decisions about future content and campaigns.',
    items: [
      {
        title: 'Saves',
        body: 'Are genuine viewers keeping the post because the information, idea or inspiration may be useful again later?',
      },
      {
        title: 'Shares',
        body: 'Are people voluntarily sending the content to friends, colleagues or other users?',
      },
      {
        title: 'Meaningful Comments',
        body: 'Are real viewers asking questions, adding opinions or starting useful conversation beneath the post?',
      },
      {
        title: 'Profile Visits and Activity',
        body: 'Does the content create enough interest for genuine users to explore the account behind it?',
      },
      {
        title: 'Website or Booking Actions',
        body: 'For commercial accounts, does the campaign contribute to useful activity outside Instagram?',
      },
      {
        title: 'Enquiries, Orders or Other Business Results',
        body: 'Measure the real outcome the campaign was designed to support instead of using the Like number as a substitute.',
      },
    ],
  },
  'local-businesses': {
    title: 'Use Instagram Likes Around Posts That Help Explain a Local UK Business',
    paragraphs: [
      'For a local business, some Instagram posts are more useful than others because they show a potential customer what the company actually provides.',
      'A restaurant might highlight a new menu item or dining experience. A builder can show a completed project. A salon may share recent work. An estate agent can feature a property. A retailer can introduce new stock. A fitness business can show its facilities or classes. An interior designer can present a finished space. A professional service can turn a common customer question into an informative post.',
      'If you add Likes to that content, keep the underlying business details accurate as well. The service, location, offer, contact information and account itself should still match what a potential customer would find if they looked further.',
    ],
    footer:
      'Visible Likes can support how a business post appears. Local confidence comes from the genuine company and the evidence behind the content.',
  },
  'real-experience': {
    title: 'Put More Attention Behind Content Based on Real Work and Knowledge',
    lead: 'Original experience gives a post something that a larger engagement number cannot manufacture.',
    footer:
      'Likes can support the visible presentation of strong content. The real project, product knowledge or expertise gives that content substance.',
    items: [
      {
        title: 'Show Completed Work',
        body: 'Use genuine projects, portfolio examples, transformations or results that the creator or business can actually stand behind.',
      },
      {
        title: 'Demonstrate Real Products',
        body: 'Show products you genuinely sell or use and give viewers enough context to understand what they are seeing.',
      },
      {
        title: 'Explain What You Know',
        body: 'Turn professional knowledge, practical experience and recurring problems into clear educational content.',
      },
      {
        title: 'Share First-Hand Observations',
        body: 'Original lessons and experiences can make a post more useful than repeating advice available on hundreds of other accounts.',
      },
      {
        title: 'Answer Questions Customers Really Ask',
        body: 'Use enquiries, consultations and everyday customer conversations as inspiration for relevant posts and Reels.',
      },
    ],
  },
  'customer-proof': {
    title: 'Keep Post Likes Separate From Genuine Customer Evidence',
    paragraphs: [
      'A visible Like count can affect how active a post looks. It does not tell a potential customer whether real people have had a good experience with the business.',
      'For UK companies, genuine credibility may come from verified reviews, authentic testimonials, completed work, case studies, real customer comments, customer-created content and accurate public business information.',
      'Use that evidence where it genuinely exists. Do not describe purchased Likes as customer approval, organic engagement or proof that buyers recommend the company.',
    ],
    footer:
      'Likes and customer proof answer different questions. Keep them separate so the profile presents each signal accurately.',
  },
  'brand-partnerships': {
    title: 'Give Potential Brand Partners More to Evaluate Than a Like Count',
    paragraphs: [
      'Visible engagement may be one detail a creator considers when preparing a profile for commercial partnerships, but serious collaboration decisions usually involve a much wider review.',
      'A UK brand or agency may look at whether the creator fits the campaign, the quality of the content, genuine audience relevance, consistency, communication, previous partnerships and real performance information where it is available.',
      'If partnerships matter, prepare the account for that wider assessment. Make the niche obvious, publish work you would be comfortable presenting professionally and keep genuine analytics available for legitimate campaign discussions.',
    ],
    footer:
      'A Like total can be one visible signal. It should not be presented by itself as proof of influence, reach or partnership performance.',
  },
  'growth-framework': {
    title: 'A Practical Content Plan for a UK Instagram Account',
    lead: 'Likes can support an individual post, but useful Instagram growth comes from making better decisions across the entire account.',
    items: [
      {
        title: 'Choose a Recognisable Content Direction',
        body: 'Make the creator subject, business category or brand positioning clear enough that visitors understand what connects your posts.',
      },
      {
        title: 'Identify the Posts With the Most Important Job',
        body: 'Separate everyday publishing from launches, evergreen content, strong portfolio work and campaign assets that deserve extra attention.',
      },
      {
        title: 'Use the Format That Fits the Message',
        body: 'Choose between photos, carousels, Reels and Stories based on what communicates the idea effectively rather than forcing every subject into the same format.',
      },
      {
        title: 'Use Insights to Learn From Real Viewers',
        body: 'Review genuine account data to understand which subjects, formats and posts earn meaningful audience activity.',
      },
      {
        title: 'Look at Genuine Engagement Beyond Likes',
        body: 'Shares, saves, useful comments and other voluntary actions can reveal how real viewers value the content.',
      },
      {
        title: 'Build the Profile Behind the Individual Post',
        body: 'Someone interested in one piece of content should be able to visit the account and find more relevant material worth exploring.',
      },
      {
        title: 'Connect Instagram With the Wider Customer Journey',
        body: 'UK businesses may use Instagram alongside their website, ecommerce, email, paid media, search visibility, local search and other social platforms.',
      },
      {
        title: 'Keep the Like Number in Its Proper Role',
        body: 'Visible Likes can support presentation on selected content. The wider value of the account depends on its positioning, publishing and genuine audience response.',
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

function loadUsWorldwideGrowthText(): string {
  const raw = JSON.parse(
    readFileSync('content/markets/us/services/buy-instagram-likes.json', 'utf8'),
  ) as {
    dummy?: {
      config?: {
        worldwide?: {
          title?: string;
          description?: string;
          closingNote?: string;
          cards?: { title: string; description: string }[];
        };
      };
    };
  };
  const w = raw.dummy?.config?.worldwide;
  if (!w) return '';
  const parts = [w.title ?? '', w.description ?? '', w.closingNote ?? ''];
  if (w.cards) parts.push(...w.cards.flatMap((c) => [c.title, c.description]));
  return parts.join('\n');
}

function sectionText(s: StorySection): string {
  const parts = [s.title];
  if (s.lead) parts.push(s.lead);
  if (s.footer) parts.push(s.footer);
  if (s.paragraphs) parts.push(...s.paragraphs);
  if (s.items) parts.push(...s.items.flatMap((i) => [i.title, i.body]));
  return parts.join('\n');
}

function allStoryText(sections: StorySection[]): string {
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

const usBefore = readFileSync('content/markets/us/services/buy-instagram-likes.json', 'utf8');
const usSections = loadStorySections('content/markets/us/services/buy-instagram-likes.json');
const ukSections = loadStorySections('content/markets/uk/services/buy-instagram-likes.json');

const snapshotPath = join(tmpdir(), 'uk-ig-likes-before-batch5b.json');
const ukBeforeSections = existsSync(snapshotPath)
  ? loadStorySections(snapshotPath)
  : null;

let pass = 0;
console.log('=== Exact copy verification (10 sections) ===');
for (const id of BATCH5B_IDS) {
  const actual = ukSections.find((s) => s.id === id);
  if (!actual) {
    console.error(`FAIL missing ${id}`);
    continue;
  }
  if (compareSection(actual, EXPECTED[id], id)) pass++;
}

console.log('\n=== strong-first-glance bullets unchanged ===');
const sfg = ukSections.find((s) => s.id === 'strong-first-glance');
console.log(
  JSON.stringify(sfg?.bullets) === JSON.stringify(STRONG_FIRST_GLANCE_BULLETS) ? 'OK' : 'FAIL',
);

console.log('\n=== Untouched sections ===');
for (const id of UNTOUCHED_IDS) {
  const s = ukSections.find((x) => x.id === id);
  console.log(s?.title === UNTOUCHED_SPOT[id] ? `OK ${id}` : `FAIL ${id}`);
}

console.log('\n=== US file unchanged ===');
const usAfter = readFileSync('content/markets/us/services/buy-instagram-likes.json', 'utf8');
console.log(usBefore === usAfter ? 'OK' : 'FAIL');

console.log('\n=== US vs UK similarity (9 rewritten matching pairs) ===');
for (const ukId of BATCH5B_IDS) {
  if (ukId === 'growth-framework') continue;
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

console.log('\n=== growth-framework vs US worldwide (closest equivalent) ===');
const usGrowthText = loadUsWorldwideGrowthText();
const ukGrowth = ukSections.find((s) => s.id === 'growth-framework')!;
const gfAfter = jaccard(tokenSet(usGrowthText), tokenSet(sectionText(ukGrowth)));
let gfLine = `growth-framework vs instagram-content-growth-framework-usa: ${(gfAfter * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const ukOld = ukBeforeSections.find((s) => s.id === 'growth-framework');
  if (ukOld) {
    const gfBefore = jaccard(tokenSet(usGrowthText), tokenSet(sectionText(ukOld)));
    gfLine += ` (was ${(gfBefore * 100).toFixed(1)}%)`;
  }
}
console.log(gfLine);

console.log('\n=== Combined storySections similarity ===');
const afterAll = jaccard(tokenSet(allStoryText(usSections)), tokenSet(allStoryText(ukSections)));
let combinedLine = `After: ${(afterAll * 100).toFixed(1)}%`;
if (ukBeforeSections) {
  const beforeAll = jaccard(
    tokenSet(allStoryText(usSections)),
    tokenSet(allStoryText(ukBeforeSections)),
  );
  combinedLine = `Before: ${(beforeAll * 100).toFixed(1)}% | After: ${(afterAll * 100).toFixed(1)}%`;
}
console.log(combinedLine);

console.log('\n=== Shared 8+ word phrases (9 matching pairs) ===');
let allShared: string[] = [];
for (const ukId of BATCH5B_IDS) {
  if (ukId === 'growth-framework') continue;
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

console.log(`\n${pass}/10 exact-copy checks passed`);
process.exit(pass === 10 ? 0 : 1);
