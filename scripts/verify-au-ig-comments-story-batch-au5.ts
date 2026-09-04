import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BATCH_AU5_IDS = [
  'built-for-australia',
  'build-conversation',
  'make-comments-fit',
  'reply-genuine',
  'trust-management',
  'real-experience',
  'social-proof',
  'local-businesses',
] as const;

const US_PAIR: Record<(typeof BATCH_AU5_IDS)[number], string> = {
  'built-for-australia': 'built-for-us',
  'build-conversation': 'build-conversation',
  'make-comments-fit': 'make-comments-fit',
  'reply-genuine': 'reply-genuine',
  'trust-management': 'trust-management',
  'real-experience': 'real-experience',
  'social-proof': 'social-proof',
  'local-businesses': 'local-businesses',
};

const UK_PAIR: Record<(typeof BATCH_AU5_IDS)[number], string> = {
  'built-for-australia': 'built-for-uk',
  'build-conversation': 'build-conversation',
  'make-comments-fit': 'make-comments-fit',
  'reply-genuine': 'reply-genuine',
  'trust-management': 'trust-management',
  'real-experience': 'real-experience',
  'social-proof': 'social-proof',
  'local-businesses': 'local-businesses',
};

const UNTOUCHED_IDS = ['campaign-moments', 'organic-reach', 'comment-strategy'] as const;

const UNTOUCHED_SPOT: Record<(typeof UNTOUCHED_IDS)[number], string> = {
  'campaign-moments': 'Use Comments Around Australian Campaigns That Invite Discussion',
  'organic-reach': 'Instagram Comments and Organic Reach Are Not the Same Thing',
  'comment-strategy': 'A Practical Comment Strategy for Australian Accounts',
};

const BENEFITS_TITLE = 'Build Conversation Around Content That Deserves Attention';

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

const EXPECTED: Record<(typeof BATCH_AU5_IDS)[number], Partial<StorySection>> = {
  'built-for-australia': {
    title: 'Choose Instagram Comments Around the Australian Content You Actually Want People to Discuss',
    lead: 'Comments belong to a specific post or Reel, so the right approach starts with what the content is about and why that particular conversation matters.',
    paragraphs: [
      'An Australian creator may have a collaboration, opinion or educational Reel that naturally invites discussion. An ecommerce business may publish a product launch where genuine viewers could have questions about the item. A local company may show a project, service, venue or update that potential customers want to understand. Agencies may manage several client campaigns where the purpose and tone of the conversation differ from post to post.',
      'Start with the content rather than an arbitrary comment total. Look at the subject, existing interaction, account context and type of discussion that would make sense beside the post before choosing the visible conversation you want to support.',
    ],
    footer:
      'Comments can strengthen visible interaction around selected content. The post itself should provide enough context for that conversation to make sense.',
    items: [
      {
        title: 'Australian Creators',
        body: 'Use Comments around posts and Reels with a clear subject that genuinely gives viewers something to react to, question or discuss.',
      },
      {
        title: 'Ecommerce Businesses',
        body: 'Support launches, product demonstrations and collection content where real customers could reasonably want more information.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Comments around genuine services, projects, venues, products and updates that potential customers may naturally ask about.',
      },
      {
        title: 'Agencies and Client Content',
        body: 'Choose comment options according to the individual post and campaign objective instead of applying the same pattern across every account.',
      },
      {
        title: 'Established Brands',
        body: 'Support selected priority posts while genuine community management, customer communication and wider campaign activity continue separately.',
      },
    ],
  },
  'build-conversation': {
    title: 'Give People Something Specific to Respond to Before Building Visible Conversation',
    lead: 'A comment section feels more natural when the post has one clear subject and viewers can immediately understand what there is to discuss.',
    footer:
      'Purchased Comments can add visible activity around a post. Clear content gives that activity useful context.',
    items: [
      {
        title: 'Start With a Real Discussion Point',
        body: 'Use a genuine question, comparison, opinion, result, product detail or useful subject rather than relying on a generic request for comments.',
      },
      {
        title: 'Use the Caption to Explain What Matters',
        body: 'Give enough context for someone to understand the story, product, project or idea without guessing why it was published.',
      },
      {
        title: 'Make the Creative Support the Same Topic',
        body: 'The image, carousel or Reel should reinforce the conversation rather than presenting something unrelated to the caption.',
      },
      {
        title: 'Keep the Post Focused',
        body: 'One understandable subject usually creates better discussion context than a post trying to communicate several separate messages.',
      },
      {
        title: 'Make the Wider Account Support the Content',
        body: 'If genuine interest leads someone to visit the profile, the bio and recent posts should reinforce the creator, business or niche behind the original content.',
      },
    ],
  },
  'make-comments-fit': {
    title: 'Make the Instagram Conversation Fit What Australian Viewers Can Actually See',
    lead: 'Someone reading the comments can also see the post above them, so the subject and visible discussion should make sense together.',
    paragraphs: [
      'A café Reel may naturally prompt questions about a dish, location or opening times. A renovation post may lead to questions about the project or finished result. A salon Reel may create discussion about a treatment. A retailer may receive questions about colours, stock or availability. A property post may lead to enquiries about the listing. A tourism or hospitality post can generate questions about an experience, booking or location. Educational content may invite genuine follow-up questions about the topic being explained.',
    ],
    footer:
      'More Comments are not automatically better when the conversation appears disconnected from the content. Relevance gives the visible interaction stronger context.',
  },
  'reply-genuine': {
    title: 'Answer Genuine Instagram Questions With Information From the Real Business or Creator',
    lead: 'Purchased Comments and authentic audience interaction serve different purposes. When a real person asks a real question, the response should come from someone who actually knows the answer.',
    paragraphs: [
      'For an Australian business, genuine questions may involve pricing, suburbs or service areas, opening hours, delivery, bookings, appointments, availability, products or locations. Creators may receive questions about the subject, collaboration or experience shown in the post. Treat those interactions as real conversations rather than simply another engagement number.',
    ],
    footer:
      'Use first-hand knowledge when responding to genuine users so public information remains accurate and useful.',
  },
  'trust-management': {
    title: 'Treat the Instagram Comment Section as Part of the Public Customer Experience',
    lead: 'For businesses and professional accounts, the way genuine questions, complaints and irrelevant activity are handled can affect how the account is perceived.',
    footer:
      'Visible activity can support presentation. Trust depends on how responsibly the account communicates with real people.',
    items: [
      {
        title: 'Check the Answer Before You Reply',
        body: 'Use accurate product, service, availability or policy information when a genuine customer asks something specific.',
      },
      {
        title: 'Do Not Create Fake Customer Stories',
        body: 'Do not turn purchased activity into invented testimonials, purchases or experiences that appear to come from genuine customers.',
      },
      {
        title: 'Keep Irrelevant Spam Under Control',
        body: 'Moderate obvious spam or unrelated activity where appropriate so useful public conversations remain easier to follow.',
      },
      {
        title: 'Handle Genuine Problems Properly',
        body: "If a real customer raises a complaint or issue, respond appropriately and move it through the business's normal support process when necessary.",
      },
      {
        title: 'Keep Real Replies Consistent With the Account',
        body: 'Responses from the creator or business should match its normal tone and contain information the account can genuinely stand behind.',
      },
    ],
  },
  'real-experience': {
    title: 'Build Instagram Conversation Around Work, Products and Knowledge You Can Actually Show',
    lead: 'Content based on genuine experience gives people more specific things to ask about than general posts repeating information they can find anywhere.',
    footer:
      'Comments can support visible conversation. First-hand experience gives the underlying content something meaningful for real viewers to respond to.',
    items: [
      {
        title: 'Show Work You Have Completed',
        body: 'Use real projects, transformations and results that give viewers visible details they can ask about or discuss.',
      },
      {
        title: 'Present Products You Really Offer',
        body: 'Show genuine products accurately so real questions about features, stock, pricing or use can be answered properly.',
      },
      {
        title: 'Explain Processes From Experience',
        body: 'Turn genuine professional or practical knowledge into content that helps viewers understand how something actually works.',
      },
      {
        title: 'Turn Customer Questions Into Content',
        body: 'Recurring enquiries about services, products, bookings or processes can reveal useful subjects for future posts and Reels.',
      },
      {
        title: 'Share a First-Hand Point of View',
        body: 'Original experience can create a more useful conversation than generic advice repeated across many similar accounts.',
      },
    ],
  },
  'social-proof': {
    title: 'Keep Visible Instagram Conversation Separate From Genuine Customer Proof',
    paragraphs: [
      'A busy-looking comment section may affect how active a post appears, but it does not show whether genuine customers have bought from, hired, visited or recommended the business.',
      'Australian businesses may have stronger evidence through verified reviews, authentic testimonials, genuine customer Comments, customer photos, tagged content, completed projects, case studies and consistent public business information. Use that evidence where it genuinely exists rather than treating purchased Comments as customer approval.',
    ],
    footer:
      'Comments support one visible engagement metric. Genuine customer experience provides a different and more meaningful form of proof.',
  },
  'local-businesses': {
    title: 'Use Instagram Comments Around Local Content That Naturally Creates Customer Questions',
    paragraphs: [
      'Local-business posts can create useful conversation because potential customers often need practical details before deciding whether to visit, enquire or book. A restaurant may publish a new dish or venue update. A builder can show completed work. A salon may present a treatment. An interior designer can show a finished space. A retailer may introduce new stock. A property business can feature a listing. Tourism and hospitality businesses may show a destination, venue or experience.',
      'If you support this content with Comments, keep the business behind the post accurate. Real questions about availability, services, locations, prices or bookings should still receive reliable answers from the actual company.',
    ],
    footer:
      'Visible conversation can support presentation of the post. Local trust comes from the real business, its work and how it communicates with genuine customers.',
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

const auPath = 'content/markets/au/services/buy-instagram-comments.json';
const usPath = 'content/markets/us/services/buy-instagram-comments.json';
const ukPath = 'content/markets/uk/services/buy-instagram-comments.json';
const usBefore = readFileSync(usPath, 'utf8');
const ukBefore = readFileSync(ukPath, 'utf8');

const auSections = loadStorySections(auPath);
const usSections = loadStorySections(usPath);
const ukSections = loadStorySections(ukPath);

const snapshotPath = join(tmpdir(), 'au-ig-comments-before-batch-au5.json');
const auBeforeSections = existsSync(snapshotPath) ? loadStorySections(snapshotPath) : null;
const benefitsBefore = existsSync(snapshotPath)
  ? loadBenefitsTitle(snapshotPath)
  : BENEFITS_TITLE;

let pass = 0;
console.log('=== Exact copy verification (8 sections) ===');
for (const id of BATCH_AU5_IDS) {
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
  benefitsNow === benefitsBefore && benefitsNow === BENEFITS_TITLE ? 'OK benefits' : 'FAIL benefits',
);

console.log('\n=== US/UK files unchanged ===');
console.log(readFileSync(usPath, 'utf8') === usBefore ? 'OK US' : 'FAIL US');
console.log(readFileSync(ukPath, 'utf8') === ukBefore ? 'OK UK' : 'FAIL UK');

function reportPair(
  label: string,
  auList: StorySection[],
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU5_IDS)[number], string>,
  auBeforeList: StorySection[] | null,
) {
  console.log(`\n=== ${label} ===`);
  for (const id of BATCH_AU5_IDS) {
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
  return BATCH_AU5_IDS.map((id) => sectionText(sections.find((s) => s.id === id)!)).join('\n');
}

function combinedOther(
  otherList: StorySection[],
  pairMap: Record<(typeof BATCH_AU5_IDS)[number], string>,
): string {
  return BATCH_AU5_IDS.map((id) =>
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

console.log('\n=== Shared 8+ word phrases (AU vs US, 8 pairs) ===');
let p8: string[] = [];
for (const id of BATCH_AU5_IDS) {
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

console.log('\n=== Shared 20+ word phrases (AU vs US, 8 pairs) ===');
let p20: string[] = [];
for (const id of BATCH_AU5_IDS) {
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

console.log(`\n${pass}/8 exact-copy checks passed`);
process.exit(pass === 8 ? 0 : 1);
