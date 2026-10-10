/**
 * How Many Followers Do You Need to Make Money on TikTok? — post-launch Learn article.
 * Published 10 October 2026 (real publication date, not a launch backfill).
 * Informational intent: follower and view thresholds for TikTok earning features.
 * Requirements change by country and over time — re-check sources when updating.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-many-followers-to-make-money-on-tiktok';
const PUBLISHED_AT = '2026-10-10T15:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_CREATOR_REWARDS_NEWSROOM =
  'https://newsroom.tiktok.com/introducing-the-new-creator-rewards-program?lang=en';
const TT_CREATOR_REWARDS_SUPPORT =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program';
const TT_LIVE_SUBSCRIPTION =
  'https://newsroom.tiktok.com/en-us/live-subscription-subscriber-only-videos';
const TT_SHOP_CREATOR_ELIGIBILITY =
  'https://seller-us.tiktok.com/university/essay?knowledge_id=6939143037667118&lang=en';
const TT_WHAT_IS_LIVE =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/what-is-tiktok-live';
const TT_LIVE_GIFTS =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/live-gifts-on-tiktok';

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

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-answer',
    'Most TikTok earning features start at 1,000 followers. LIVE Subscriptions and TikTok Shop affiliate (in the US) both require 1,000 followers, and you must be 18 or older. The Creator Rewards Program, which pays for video views, needs at least 10,000 followers and 100,000 video views in the last 30 days.',
  ),
  paragraph(
    'p-answer-2',
    'Follower count is only one condition. Age, country, account standing and the type of content you post all decide whether a feature is available to you, and TikTok can change these rules by region.',
  ),

  heading('h-table', 'TikTok Money Features and Their Requirements', 2),
  {
    id: 'table-requirements',
    type: 'comparison_table',
    order: nextOrder(),
    caption: 'Requirements as published by TikTok at the time of writing. They vary by country and can change.',
    headers: ['Feature', 'Followers', 'Other requirements'],
    rows: [
      [
        'Creator Rewards Program (paid for qualified views)',
        '10,000',
        '18+, 100,000 video views in the last 30 days, personal account in good standing, available country, original videos over 1 minute',
      ],
      [
        'LIVE Subscriptions (monthly viewer subscriptions)',
        '1,000',
        '18+',
      ],
      [
        'TikTok Shop affiliate (commission on products, US)',
        '1,000',
        '18+, apply as an individual creator',
      ],
      [
        'Hosting a LIVE (needed for LIVE Gifts)',
        'Local minimum; 1,000 is the common reference',
        '18+; LIVE Gifts have their own eligibility rules',
      ],
      [
        'Brand deals arranged directly with brands',
        'No TikTok minimum',
        'Brands set their own expectations; disclose paid partnerships',
      ],
    ],
  },
  paragraph(
    'p-table-src',
    'Sources: Creator Rewards requirements from TikTok Newsroom; LIVE Subscriptions from TikTok Newsroom; TikTok Shop creator eligibility from TikTok Shop Academy (US); LIVE hosting and LIVE Gifts from TikTok Support.',
    [
      { href: TT_CREATOR_REWARDS_NEWSROOM, label: 'Creator Rewards requirements', external: true },
      { href: TT_LIVE_SUBSCRIPTION, label: 'LIVE Subscriptions', external: true },
      { href: TT_SHOP_CREATOR_ELIGIBILITY, label: 'TikTok Shop creator eligibility', external: true },
      { href: TT_WHAT_IS_LIVE, label: 'LIVE hosting', external: true },
      { href: TT_LIVE_GIFTS, label: 'LIVE Gifts', external: true },
    ],
  ),

  heading('h-1000', 'Can You Make Money on TikTok With 1,000 Followers?', 2),
  paragraph(
    'p-1000-1',
    'Yes, in several ways. At 1,000 followers and 18 or older you can usually offer LIVE Subscriptions, and in the US you can apply to TikTok Shop as an affiliate creator and earn commission on products you promote. (TikTok Shop Academy)',
    [{ href: TT_SHOP_CREATOR_ELIGIBILITY, label: 'TikTok Shop Academy', external: true }],
  ),
  paragraph(
    'p-1000-2',
    '1,000 followers is also the number most creators associate with going LIVE, but TikTok says it applies a local minimum rather than one worldwide figure. Our guide to how many followers you need to go LIVE on TikTok explains the details.',
    [
      {
        href: '/learn/how-many-followers-to-go-live-on-tiktok',
        label: 'how many followers you need to go LIVE on TikTok',
      },
    ],
  ),
  paragraph(
    'p-1000-3',
    'If you are still working towards that number, see how to get your first 1,000 TikTok followers.',
    [
      {
        href: '/learn/how-to-get-1000-tiktok-followers',
        label: 'how to get your first 1,000 TikTok followers',
      },
    ],
  ),

  heading('h-views', 'How Many Views Do You Need to Make Money on TikTok?', 2),
  paragraph(
    'p-views-1',
    'For the Creator Rewards Program, you need 100,000 video views in the last 30 days to qualify, alongside 10,000 followers. (TikTok Newsroom) Because the window is the last 30 days, views from a video that went viral months ago do not count towards it.',
    [{ href: TT_CREATOR_REWARDS_NEWSROOM, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-views-2',
    'Once you are in the program, earnings are based on qualified views, not all views. TikTok says qualified views are unique views from the For You feed and exclude views under five seconds, paid views and fraudulent views. (TikTok Support) TikTok does not publish a fixed rate per 1,000 views.',
    [{ href: TT_CREATOR_REWARDS_SUPPORT, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-views-3',
    'Our guide on how TikTok video views are counted explains the difference between the public view count and qualified views.',
    [
      {
        href: '/learn/how-tiktok-video-views-are-counted',
        label: 'how TikTok video views are counted',
      },
    ],
  ),

  heading('h-no-followers', 'Can You Make Money on TikTok Without Followers?', 2),
  paragraph(
    'p-nf-1',
    'Not through TikTok’s own programs, which all start at 1,000 followers or more. You can still earn from TikTok skills without a large audience:',
  ),
  bullets('ul-nf', [
    'Make videos for brands to post on their own accounts (often called UGC). You are paid for the content, not your reach.',
    'Use TikTok to send customers to your own product, service or shop. Sales do not depend on a follower minimum.',
    'Work with smaller brands directly. Some value a niche, engaged audience more than a big follower count.',
  ]),
  paragraph(
    'p-nf-2',
    'Be careful with offers that promise money for watching or scrolling TikTok videos. None of the creator programs above pay you for watching, and these offers are a common route to scams.',
  ),

  heading('h-quality', 'Do Your Followers Need to Be Real?', 2),
  paragraph(
    'p-q-1',
    'For the features that pay you, yes. Creator Rewards requires an account in good standing and counts only qualified views, and TikTok excludes fraudulent and paid views from them. (TikTok Support) Followers who never watch your videos will not help you reach 100,000 views in 30 days.',
    [{ href: TT_CREATOR_REWARDS_SUPPORT, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-q-2',
    'Our guide on whether buying TikTok followers affects FYP reach or account safety covers what TikTok says about fake engagement and why a higher follower number does not make an account eligible on its own.',
    [
      {
        href: '/learn/buying-tiktok-followers-fyp-account-safety',
        label: 'whether buying TikTok followers affects FYP reach or account safety',
      },
    ],
  ),

  {
    id: 'cta-tiktok-growth',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare TikTok Growth Options',
    text: 'Followers, likes and views measure different things. A higher count does not unlock Creator Rewards or other earning features by itself; TikTok checks views, account standing and authenticity separately.',
    serviceSlugs: ['buy-tiktok-followers', 'buy-tiktok-views', 'buy-tiktok-likes'],
  },
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
    return block.items.join(' ');
  }
  if (block.type === 'comparison_table') {
    return [...block.headers, ...block.rows.flat()].join(' ');
  }
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const HOW_MANY_FOLLOWERS_TO_MAKE_MONEY_ON_TIKTOK_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-many-followers-to-make-money-on-tiktok',
  slug: SLUG,
  title: 'How Many Followers Do You Need to Make Money on TikTok?',
  excerpt:
    'Most TikTok earning features start at 1,000 followers; Creator Rewards needs 10,000 followers and 100,000 views in 30 days. Every requirement in one table.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'views', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A phone with a coin icon next to a table of TikTok earning features and their follower requirements',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How Many TikTok Followers Do You Need to Make Money?',
    description:
      'Most TikTok earning features start at 1,000 followers. Creator Rewards needs 10,000 plus 100,000 views in 30 days. See every requirement in one table.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how many followers on tiktok to make money',
      'how many followers to make money on tiktok',
      'how many views on tiktok to make money',
      'how to make money on tiktok without followers',
      'tiktok creator rewards program requirements',
      'how to make money on tiktok with 1000 followers',
    ],
  },
  relatedServices: ['buy-tiktok-followers', 'buy-tiktok-views', 'buy-tiktok-likes'],
  relatedArticles: [
    'how-many-followers-to-go-live-on-tiktok',
    'how-to-get-1000-tiktok-followers',
    'how-tiktok-video-views-are-counted',
    'buying-tiktok-followers-fyp-account-safety',
    'tiktok-views-but-no-followers',
    'why-does-my-tiktok-have-0-views',
  ],
  featured: false,
  published: true,
  status: 'published',
  scheduledAt: PUBLISHED_AT,
  editorialApproved: true,
  seoReviewed: true,
  contentReviewed: true,
  lastEditorialUpdate: PUBLISHED_AT,
  keyTakeaways: [
    'LIVE Subscriptions and TikTok Shop affiliate (US) start at 1,000 followers and age 18.',
    'Creator Rewards needs 10,000 followers and 100,000 video views in the last 30 days.',
    'Creator Rewards pays on qualified views only: unique For You views, over five seconds, not paid or fraudulent.',
    'Requirements vary by country and change over time, so check TikTok’s own pages before you plan around them.',
    'Offers that pay you to watch or scroll TikTok are not creator programs and are often scams.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How many followers do you need to get paid on TikTok?',
      answer:
        '1,000 followers for LIVE Subscriptions and TikTok Shop affiliate in the US, and 10,000 followers plus 100,000 views in the last 30 days for the Creator Rewards Program. You also need to be 18 or older.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does TikTok pay you for followers?',
      answer:
        'No. TikTok does not pay per follower. Followers unlock access to features such as LIVE Subscriptions or Creator Rewards; the money comes from views, subscriptions, gifts or sales.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'How much does TikTok pay per 1,000 views?',
      answer:
        'TikTok does not publish a fixed rate. Creator Rewards pays on qualified views, and the amount depends on factors TikTok does not list as a single number, so treat any exact per-view figure you see online as an estimate.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can you make money on TikTok if you are under 18?',
      answer:
        'Not through TikTok’s main earning features. Creator Rewards, LIVE Subscriptions, hosting a LIVE and TikTok Shop creator accounts all require you to be 18 or older.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Is 1,000 followers enough for TikTok Shop?',
      answer:
        'In the US, TikTok Shop Academy lists 1,000 followers and age 18 as the creator requirements. Other countries can set different thresholds, so check the TikTok Shop page for your region.',
      schemaEligible: true,
    },
  ],
};
