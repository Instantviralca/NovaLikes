/**
 * Article #19 — How Many Followers Do You Need to Go LIVE on TikTok?
 * Scheduled: Monday 5 October 2026.
 * Informational / eligibility intent. Distinct from /buy-tiktok-followers (buying intent).
 * Do not present 1,000 followers as a universal LIVE unlock.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-many-followers-to-go-live-on-tiktok';
const SCHEDULED_AT = '2026-10-05T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Reader-copy revision (batches 24–25): internal writing notes rewritten for readers. */
const REVISED_AT = '2026-10-10T20:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_WHAT_IS_LIVE =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/what-is-tiktok-live';
const TT_LIVE_AGE =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/age-requirements-for-tiktok-live';
const TT_LIVE_ISSUES =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/issues-with-tiktok-live';
const TT_USER_SAFETY =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/user-safety';
const TT_CREATOR_REWARDS =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program';
const TT_LIVE_GIFTS =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/live-gifts-on-tiktok';
const TT_GIFTS =
  'https://support.tiktok.com/en/live-gifts-wallet/gifts/gifts';
const TT_COHOST =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/cohost-on-tiktok-live';
const TT_MULTI_GUEST =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/tiktok-live-multi-guest';
const TT_MODERATING =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/moderating-on-tiktok-live';
const TT_CREATOR_SEARCH_INSIGHTS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';

let order = 0;
function nextOrder(): number {
  order += 1;
  return order;
}

function heading(
  id: string,
  text: string,
  headingLevel: 2 | 3,
): ArticleContentBlock {
  return { id, type: 'heading', headingLevel, text, order: nextOrder() };
}

function paragraph(
  id: string,
  text: string,
  inlineLinks?: ArticleInlineLink[],
): ArticleContentBlock {
  return {
    id,
    type: 'paragraph',
    text,
    order: nextOrder(),
    ...(inlineLinks ? { inlineLinks } : {}),
  };
}

function bullets(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'bulleted_list', items, order: nextOrder() };
}

function figure(
  id: string,
  src: string,
  alt: string,
  caption: string,
): ArticleContentBlock {
  return {
    id,
    type: 'figure',
    order: nextOrder(),
    image: {
      src,
      alt,
      width: 1600,
      height: 900,
      caption,
    },
  };
}

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-open-4',
    "If you are wondering how many followers to go LIVE on TikTok, the short answer is 1,000. TikTok's Help Center lists 1,000 followers to go LIVE and notes that this may vary across regions. You must also be at least 18 years old to host a LIVE. (TikTok Support)",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-7',
    "Followers are only one part of eligibility. Your age, your location, feature availability and whether the account meets TikTok's eligibility requirements all matter, and TikTok says only creators who meet those requirements can start a LIVE. (TikTok Support) That is why two accounts with similar follower counts may not see the same LIVE options.",
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),

  heading('h-why-1000', 'Why Does Everyone Say You Need 1,000 TikTok Followers?', 2),
  paragraph(
    'p-w1-1',
    "Because it is the number TikTok's own Help Center gives for going LIVE. TikTok adds that the requirement may vary across regions, so it is not identical everywhere. (TikTok Support) The number is useful for planning, but it is not an automatic worldwide unlock.",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-in-3',
    'Reaching 1,000 followers also does not mean the LIVE button instantly appears. Other eligibility factors still apply, so if the option is missing at 1,000, check your age, Restricted Mode and actual account eligibility before contacting TikTok.',
  ),
  figure(
    'fig-elig',
    `${IMAGE_DIR}/live-eligibility-more-than-one-number.png`,
    'TikTok LIVE eligibility depends on followers, age, availability and account eligibility, not one universal number',
    '1,000 followers is commonly referenced, but it is not a universal automatic unlock.',
  ),

  heading('h-age', 'What Is the Minimum Age to Go LIVE on TikTok?', 2),
  paragraph(
    'p-ag-1',
    'TikTok currently requires creators to be at least 18 years old to host a LIVE. (TikTok Support) Many older articles still mention lower ages, including a "16+ to go LIVE, 18+ for Gifts" rule, but that is out of date. Under the current rule, a 16-year-old cannot go LIVE.',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-cf-2',
    'TikTok may also ask creators to confirm their age before allowing them to go LIVE, to ensure they meet the minimum-age requirement. (TikTok Support) This is an eligibility and safety check, and a follower count cannot substitute for it: an account with 100 followers and one with 1 million both have to satisfy the age rule.',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),

  heading('h-country', 'Does the TikTok LIVE Requirement Vary by Country?', 2),
  paragraph(
    'p-co-1',
    'It can. TikTok says the 1,000-follower requirement may vary across regions, and it does not give a separate number for the US or any other country. (TikTok Support) That is why this guide has no country-by-country table: TikTok does not publish one, so any such table would be a guess.',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ev-2',
    "TikTok's LIVE and Gift features also have regional and feature-specific availability requirements. (TikTok Support) One creator may report LIVE access below a number another creator needed, so check your own app and account rather than screenshots or articles written for another country.",
    [{ href: TT_LIVE_GIFTS, label: 'TikTok Support', external: true }],
  ),
  figure(
    'fig-two',
    `${IMAGE_DIR}/two-accounts-different-live-access.png`,
    'Two TikTok accounts with similar follower counts can see different LIVE access because of local threshold, eligibility or availability',
    'Follower count is only one part of TikTok LIVE eligibility.',
  ),

  heading('h-500', 'Can You Go LIVE on TikTok With 500 Followers?', 2),
  paragraph(
    'p-500-1',
    "Possibly for some accounts, if their local threshold allows it, but 500 followers does not unlock LIVE for everyone. TikTok lists 1,000 followers as the requirement and says it may vary across regions. (TikTok Support) There is no TikTok-supported trick that guarantees LIVE at 500 followers, so treat articles promising that a few settings will bypass the rule with caution.",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-tr-5',
    "A user seeing LIVE below 1,000 does not prove a universal bypass. It may reflect local eligibility, account-level availability or features TikTok is testing on that account. If LIVE appears on your account below 1,000, use it, but don't assume another account will get the same access.",
  ),

  heading('h-missing', "Why Can't I Go LIVE on TikTok Even With Enough Followers?", 2),
  paragraph(
    'p-ms-2',
    'If you think you meet the follower requirement but the LIVE option is missing, work through these checks before assuming a technical problem:',
  ),
  bullets('ul-ms', [
    'Age: you must be at least 18, and TikTok may ask you to confirm it.',
    'Followers: you need to have met the local minimum-follower threshold TikTok applies to your account, which may differ from 1,000.',
    'Availability: LIVE has to be available for your account and location.',
    'Eligibility: TikTok has to consider the account eligible for LIVE.',
    'Settings: Restricted Mode must be off.',
  ]),
  paragraph(
    'p-ms-7',
    'Restricted Mode is the one people overlook. TikTok says going LIVE is unavailable while Restricted Mode is enabled, and gifting on LIVE is disabled too. (TikTok Support) To check, go to Settings and privacy, then Content preferences, then Restricted Mode. If it was turned on deliberately for safety or Family Pairing reasons, think before switching it off.',
    [{ href: TT_USER_SAFETY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-st-2',
    "If you meet every requirement and still can't go LIVE, TikTok's troubleshooting page says you can report the problem through the app. (TikTok Support) That is more reliable than refreshing the app 50 times, changing your username or switching languages.",
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),

  heading('h-dw', "What Doesn't Work to Unlock TikTok LIVE?", 2),
  paragraph(
    'p-dw-1',
    "TikTok controls LIVE eligibility, and only creators who meet its requirements can go LIVE. (TikTok Support) None of the common workarounds changes that:",
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  bullets('ul-dw', [
    'A VPN: TikTok uses local eligibility for LIVE, and disguising your location does not make the account qualify. It can also complicate account security and feature availability.',
    "Changing your birthday: pretending to be older breaks TikTok's rules and puts the account at risk. If your birthday is genuinely wrong, use TikTok's age and support process.",
    'Switching to a Business Account: there is no TikTok rule that makes follower requirements disappear for a different account type, so choose the type the account actually needs.',
    'Asking support to bypass the rules: support is for accounts that meet the requirements but still have problems. Claiming you previously had LIVE when you did not misrepresents your account.',
    'Hidden settings or supposed bugs: a feature appearing on someone else\'s account is not a bypass you can copy.',
    'Sharing your login: never send your password, verification code or credentials to anyone who says they can unlock LIVE manually.',
  ]),
  paragraph(
    'p-by-5',
    "Buying followers does not unlock LIVE either. A follower number alone cannot guarantee age eligibility, regional availability, account eligibility, Gifts or monetization, and TikTok's rules ban fake engagement, so TikTok may remove bought followers and the purchase can put your account at risk.",
    [{ href: 'https://www.tiktok.com/community-guidelines/en/integrity-authenticity', label: "TikTok's rules", external: true }],
  ),

  heading('h-remove', 'Can You Lose TikTok LIVE Access Later?', 2),
  paragraph(
    'p-rl-2',
    "LIVE access is not permanently guaranteed because an account once qualified. TikTok's LIVE troubleshooting guidance is built around continuing eligibility (TikTok Support), so an account that breaks the rules or otherwise becomes ineligible cannot rely on its follower count to keep LIVE.",
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-dl-1',
    "TikTok does not say exactly what happens if an account's follower count later drops below its local threshold, so be wary of anyone who claims LIVE disappears instantly below 1,000 or that you keep it forever once unlocked. Follower counts move both ways, because people unfollow and TikTok acts against invalid accounts. Our guide on why TikTok followers drop covers those causes in more depth.",
    [
      {
        href: '/learn/why-tiktok-followers-drop',
        label: 'why TikTok followers drop',
      },
    ],
  ),

  heading('h-public', 'Does TikTok LIVE Require a Public Account?', 2),
  paragraph(
    'p-pu-1',
    "TikTok's LIVE help pages do not list a public account as a requirement; the documented requirements are age, follower eligibility and feature availability. (TikTok Support) A public account usually makes more sense if audience growth is your goal, because public accounts are more visible, but going public does not unlock LIVE by itself. Our guide on public vs private TikTok accounts covers the difference.",
    [
      { href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true },
      {
        href: '/learn/public-vs-private-tiktok-account',
        label: 'public vs private TikTok accounts',
      },
    ],
  ),

  heading('h-rewards', 'Are TikTok LIVE and Creator Rewards Requirements the Same?', 2),
  paragraph(
    'p-vw-1',
    "No. TikTok has several creator features with their own purposes and thresholds, so always check which feature a requirement belongs to.",
  ),
  {
    id: 'table-features',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Feature', 'Main Purpose'],
    rows: [
      ['TikTok LIVE', 'Real-time livestreaming'],
      ['Creator Rewards', 'Monetization of eligible original videos'],
      ['Video Gifts', 'Viewer gifting on eligible videos'],
      ['TikTok One', 'Creator and brand collaboration platform'],
    ],
  },
  paragraph(
    'p-rw-2',
    'Creator Rewards currently requires at least 10,000 followers and 100,000 video views in the previous 30 days in eligible regions. (TikTok Support) Those are Creator Rewards requirements, not LIVE requirements, so you do not need 100,000 recent views to go LIVE.',
    [{ href: TT_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),

  heading('h-gifts-same', 'Is TikTok LIVE the Same as LIVE Gifts?', 2),
  paragraph(
    'p-gs-3',
    'No. Being able to host a LIVE and being eligible to earn from it are different questions. TikTok describes LIVE Gifts as a separate feature that lets viewers send virtual Gifts during qualifying LIVE streams, with its own creator eligibility and availability conditions. (TikTok Support)',
    [{ href: TT_LIVE_GIFTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ga-1',
    "TikTok's Gifts documentation also says users need to be at least 18, or 19 in South Korea, to purchase and use Coins for Gifts. (TikTok Support) This is another reason the idea that 1,000 followers unlocks everything is wrong: different features have different rules.",
    [{ href: TT_GIFTS, label: 'TikTok Support', external: true }],
  ),
  figure(
    'fig-features',
    `${IMAGE_DIR}/features-different-requirements.png`,
    'TikTok LIVE, LIVE Gifts, Creator Rewards and TikTok One have different eligibility requirements',
    'One follower milestone does not unlock every TikTok creator feature.',
  ),

  heading('h-more-followers', 'Does Going LIVE Help You Get More Followers?', 2),
  paragraph(
    'p-mf-2',
    'It can give your audience another way to interact with you. TikTok LIVE supports real-time creator and viewer interaction, and features such as multi-guest and co-hosting add more forms of participation. (TikTok Support) But a viewer can watch, comment, leave or follow, and those are separate actions, so the quality and relevance of the LIVE still decide whether people follow.',
    [{ href: TT_COHOST, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-2',
    'TikTok does not say that hosting a LIVE gives your future videos a ranking boost or increases For You reach by any fixed amount, so treat claims of a LIVE-to-FYP boost as unconfirmed. Followers, likes and views also measure different things; our guide on TikTok followers, likes and views explains how.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
    ],
  ),
  {
    id: 'cta-tt-followers',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-tiktok-followers',
    heading: 'Understanding TikTok Follower Options',
    description:
      "Follower count is only one part of TikTok LIVE eligibility. If you're comparing TikTok follower packages, do not treat a follower purchase as a guaranteed way to unlock LIVE or other TikTok features.",
    label: 'View TikTok Followers',
  },

  heading('h-organic', 'How Do You Reach the LIVE Follower Threshold Organically?', 2),
  paragraph(
    'p-uf-3',
    "1,000 followers is a useful audience milestone and a common LIVE planning benchmark, not a magic algorithm number. If LIVE is your goal, build an audience that actually wants to follow you rather than chasing the visible count:",
  ),
  bullets('ul-og', [
    'Make the account easy to understand, so a new viewer knows who it is for, what you publish and why to follow.',
    'Create specific content: instead of general "TikTok tips", answer a problem such as why TikTok videos get views but no followers.',
    'Use Creator Search Insights to find search topics, content gaps and Search performance.',
    'Build related videos, so one useful post leads naturally to the next.',
    'Review Analytics to find content that drives views, profile interest, comments and followers.',
    'Use comments and audience questions as a source of future topics, and repeat what attracts the right audience instead of changing niche after every post.',
  ]),
  paragraph(
    'p-og-4',
    "Creator Search Insights helps you make content around questions people already search for. (TikTok Support) Our TikTok SEO guide covers search-focused publishing in more detail, and our guide on how to get your first 1,000 TikTok followers organically walks through positioning, content clusters and analytics.",
    [
      { href: TT_CREATOR_SEARCH_INSIGHTS, label: 'TikTok Support', external: true },
      { href: '/learn/tiktok-seo', label: 'TikTok SEO' },
      {
        href: '/learn/how-to-get-1000-tiktok-followers',
        label: 'how to get your first 1,000 TikTok followers organically',
      },
    ],
  ),
  paragraph(
    'p-sy-4',
    'Your follower strategy should make sense even before LIVE becomes available, because TikTok still offers short-form posts, Search, For You discovery, Duet, Stitch and comments. The best position to reach LIVE from is an account people already want to follow.',
  ),

  heading('h-first-live', 'What Should Your First TikTok LIVE Be About?', 2),
  paragraph(
    'p-fl-1',
    'Once LIVE is available, give the session a clear purpose instead of opening with "what should we talk about?" An educational creator might host a TikTok SEO Q&A, a fitness creator could answer beginner workout form questions, a local roofer could run an "ask us anything about roof repairs" session, an ecommerce brand could demonstrate a product live, and a photographer could edit a photo from start to finish.',
  ),
  paragraph(
    'p-md-3',
    'LIVE is real-time, so you cannot review comments before they appear the way you would edit a prerecorded video. TikTok provides LIVE moderation tools that let creators and moderators manage comments and filtering. (TikTok Support) Before a larger LIVE, review those controls, consider assigning a moderator, set blocked keywords where relevant and decide how you will handle inappropriate comments.',
    [{ href: TT_MODERATING, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fl-10',
    "TikTok's LIVE tools support direct interaction, comments, moderation and multi-guest formats, so the format suits real-time conversation best. (TikTok Support)",
    [{ href: TT_MULTI_GUEST, label: 'TikTok Support', external: true }],
  ),

  heading('h-answer', 'So, How Many Followers Do You Need to Go LIVE on TikTok?', 2),
  paragraph(
    'p-an-3',
    "TikTok's Help Center gives 1,000 followers and adds that the requirement may vary across regions, so once you reach it, check whether the LIVE option appears on your own account. (TikTok Support) You must also be 18 or older and meet TikTok's other LIVE eligibility requirements. In practice, 999 is not universally impossible and 1,000 is not guaranteed LIVE, so your own account is the final answer.",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'blockquote') return block.text;
  if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
    return block.items.join(' ');
  }
  if (block.type === 'comparison_table') {
    return [block.headers.join(' '), ...block.rows.map((row) => row.join(' '))].join(
      ' ',
    );
  }
  if (block.type === 'internal_cta') {
    return `${block.heading ?? ''} ${block.description ?? ''} ${block.label}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const HOW_MANY_FOLLOWERS_TO_GO_LIVE_ON_TIKTOK_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-many-followers-to-go-live-on-tiktok',
  slug: SLUG,
  title: 'How Many Followers Do You Need to Go LIVE on TikTok?',
  excerpt:
    "If you're searching for the TikTok LIVE follower requirement, you have probably seen one number repeated everywhere: 1,000 followers.",
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'creator', 'algorithm', 'analytics', 'engagement'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A phone going LIVE beside three TikTok LIVE requirements: 1,000 followers (may vary across regions), age 18 or older, and an eligible account',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: REVISED_AT,
  showModifiedDate: true,
  seo: {
    title: 'How Many Followers Do You Need to Go LIVE on TikTok?',
    description:
      'Learn TikTok LIVE follower and age requirements, why the threshold can vary by location, and what to check if the LIVE option is missing.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how many followers to go live on TikTok',
      'TikTok LIVE requirements',
      'TikTok LIVE follower requirement',
      'TikTok live 1000 followers',
      "why can't I go live on TikTok",
      'TikTok LIVE age requirement',
    ],
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'how-to-get-1000-tiktok-followers',
    'tiktok-followers-vs-likes-vs-views',
    'public-vs-private-tiktok-account',
    'tiktok-seo',
  ],
  featured: true,
  published: true,
  status: 'published',
  scheduledAt: SCHEDULED_AT,
  editorialApproved: true,
  seoReviewed: true,
  contentReviewed: true,
  lastEditorialUpdate: SCHEDULED_AT,
  keyTakeaways: [
    'You must currently be 18 or older to host a TikTok LIVE',
    "TikTok's Help Center lists 1,000 followers to go LIVE, and says this may vary across regions",
    "LIVE features are subject to TikTok's current feature and regional availability",
    'Only creators who meet LIVE eligibility requirements can start a LIVE',
    'Reaching 1,000 followers does not guarantee LIVE if other eligibility rules are not met',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How many followers do you need to go LIVE on TikTok in 2026?',
      answer:
        "TikTok's Help Center says you need 1,000 followers to go LIVE, and notes that this may vary across regions. You must also be 18 or older and meet TikTok's other LIVE eligibility rules.",
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can you go LIVE on TikTok with 500 followers?',
      answer:
        "Some accounts may have different local eligibility conditions, but TikTok does not guarantee LIVE access at 500 followers. Check the LIVE option on the actual account rather than relying on another creator's threshold.",
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Do you have to be 18 to go LIVE on TikTok?',
      answer:
        "Yes. TikTok's current Help Center says creators must be at least 18 years old to host a LIVE.",
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: "Why can't I go LIVE even though I have 1,000 followers?",
      answer:
        'Follower count is only one eligibility factor. Check your age, actual local threshold, account eligibility and whether Restricted Mode is enabled. TikTok says eligible creators experiencing LIVE issues can report the problem.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does Restricted Mode disable TikTok LIVE?',
      answer:
        'Yes. TikTok says going LIVE is one of the features unavailable while Restricted Mode is active.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can buying followers guarantee TikTok LIVE access?',
      answer:
        "No. TikTok decides LIVE eligibility itself, and follower count is only one part of it. Buying followers also breaks TikTok's rules on fake engagement.",
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Are TikTok LIVE and LIVE Gifts the same eligibility?',
      answer:
        'No. LIVE Gifts is a separate feature with its own eligibility, age and availability requirements.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Is TikTok Creator Rewards the same as TikTok LIVE?',
      answer:
        'No. Creator Rewards is a separate monetization program with different follower and view requirements.',
      schemaEligible: true,
    },
  ],
};
