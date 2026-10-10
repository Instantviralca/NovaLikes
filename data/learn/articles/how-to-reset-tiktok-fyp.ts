/**
 * How to Reset Your TikTok FYP — post-launch Learn article.
 * Published 10 October 2026 (real publication date, not a launch backfill).
 * Informational intent: refreshing and retraining the For You feed.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-to-reset-tiktok-fyp';
const PUBLISHED_AT = '2026-10-10T12:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_REFRESH_SUPPORT =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/refresh-your-for-you-feed';
const TIKTOK_REFRESH_NEWSROOM =
  'https://newsroom.tiktok.com/en-au/introducing-a-way-to-refresh-your-for-you-feed-on-tiktok-au';
const TIKTOK_SHAPE_FEED_2025 =
  'https://newsroom.tiktok.com/en-gb/tiktok-trending-summer-2025-and-new-ways-to-shape-your-feed';
const TIKTOK_NEWSROOM_FOR_YOU =
  'https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you';

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

function steps(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'numbered_list', items, order: nextOrder() };
}

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-answer',
    'To reset your TikTok FYP, go to Profile, tap the menu, open Settings and privacy, then Content preferences, and choose Refresh your For You feed. TikTok then shows you content as if you had just joined and rebuilds your recommendations from what you watch next. (TikTok Newsroom)',
    [{ href: TIKTOK_REFRESH_NEWSROOM, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-answer-2',
    'The refresh does not unfollow anyone or undo your other settings. The first few sessions after it matter most, because that is what TikTok learns from.',
  ),

  heading('h-steps', 'How to Refresh Your For You Feed, Step by Step', 2),
  steps('ol-refresh', [
    'Open TikTok and tap Profile.',
    'Tap the menu (three lines) in the top corner.',
    'Tap Settings and privacy.',
    'Tap Content preferences.',
    'Tap Refresh your For You feed.',
    'Tap Continue, then Refresh to confirm.',
  ]),
  paragraph(
    'p-steps-1',
    'TikTok documents the feature on its support site. (TikTok Support) Menu names can change slightly between app versions, so if the wording is different, look for the refresh option inside Content preferences.',
    [{ href: TIKTOK_REFRESH_SUPPORT, label: 'TikTok Support', external: true }],
  ),

  heading('h-changes', 'What a Refresh Changes and What It Does Not', 2),
  {
    id: 'table-changes',
    type: 'comparison_table',
    order: nextOrder(),
    caption: 'Based on TikTok’s announcement of the refresh feature.',
    headers: ['Changes', 'Does not change'],
    rows: [
      [
        'Your For You feed starts again, as if you had just joined',
        'The accounts you follow',
        ],
      [
        'Recommendations are rebuilt from your new interactions',
        'Settings you already turned on, such as keyword filters',
      ],
      [
        'Old interests stop steering what you are shown',
        'Your own posts, followers or likes',
      ],
    ],
  },
  paragraph(
    'p-changes-1',
    'TikTok says enabling a refresh will not override settings you have already chosen or affect the accounts you follow. (TikTok Newsroom) Your own videos, followers and likes are part of your account, not your feed, so a refresh is not a way to delete them.',
    [{ href: TIKTOK_REFRESH_NEWSROOM, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-retrain', 'How to Retrain Your Feed After the Refresh', 2),
  paragraph(
    'p-retrain-1',
    'TikTok recommends videos based on your interactions (what you watch, like, share, comment on and follow), information about the videos (captions, sounds and hashtags) and your device and account settings, such as language and country. (TikTok Newsroom) After a refresh, use that to your advantage:',
    [{ href: TIKTOK_NEWSROOM_FOR_YOU, label: 'TikTok Newsroom', external: true }],
  ),
  bullets('ul-retrain', [
    'Search for the topics you actually want and watch a few videos to the end.',
    'Like, save or share the videos you want more of. These are clear signals.',
    'Follow a handful of creators in your chosen topics.',
    'Swipe away quickly from videos you do not want, instead of watching them out of curiosity.',
    'Long-press a video and tap Not interested for anything that keeps coming back.',
  ]),

  heading('h-without-reset', 'Fixing Your FYP Without a Full Reset', 2),
  paragraph(
    'p-wr-1',
    'If only part of your feed is wrong, a full refresh is more than you need. TikTok gives you lighter controls:',
  ),
  bullets('ul-wr', [
    'Not interested: tells TikTok to show you fewer videos like this one, including from that creator or with that sound.',
    'Keyword filters: hide videos that use specific words or hashtags from your For You feed.',
    'Manage Topics: choose to see more or less of a set of popular topics. It does not remove a topic completely.',
  ]),
  paragraph(
    'p-wr-2',
    'TikTok pointed to keyword filters and Not interested when it launched the refresh feature, and in 2025 added Manage Topics and smarter keyword filters that also catch similar words and synonyms. (TikTok Newsroom) Look for them under Content preferences, near the refresh option.',
    [{ href: TIKTOK_SHAPE_FEED_2025, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-creator', 'Will Resetting My FYP Help My Own Videos Get More Views?', 2),
  paragraph(
    'p-cr-1',
    'No. Refreshing changes what you see, not who sees your videos. Your posts are recommended to other people based on their interactions and your video’s information, not on your personal feed.',
  ),
  paragraph(
    'p-cr-2',
    'If your own videos are stuck, look at the posts and the account instead. Our guide on why a TikTok has 0 views walks through privacy, review, eligibility and account checks in order.',
    [
      {
        href: '/learn/why-does-my-tiktok-have-0-views',
        label: 'why a TikTok has 0 views',
      },
    ],
  ),

  heading('h-cache', 'Does Clearing the Cache Reset the Algorithm?', 2),
  paragraph(
    'p-cache-1',
    'No. Clearing the cache (usually under Settings and privacy, Free up space) removes temporary files and frees storage on your phone. TikTok does not describe it as a way to change recommendations. Use Refresh your For You feed for that.',
  ),

  {
    id: 'cta-tiktok-growth',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Growing Your Own TikTok?',
    text: 'Resetting your feed only changes what you watch. If you are working on your own account, compare views, likes and followers to see which metric matters for your goal.',
    serviceSlugs: ['buy-tiktok-views', 'buy-tiktok-likes', 'buy-tiktok-followers'],
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

export const HOW_TO_RESET_TIKTOK_FYP_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-to-reset-tiktok-fyp',
  slug: SLUG,
  title: 'How to Reset Your TikTok FYP (Refresh Your For You Feed)',
  excerpt:
    'Reset your TikTok FYP in Settings and privacy, Content preferences, Refresh your For You feed. Here is what changes, what stays, and how to retrain your feed afterwards.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['algorithm', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A phone with a refresh arrow next to the steps to refresh the TikTok For You feed',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How to Reset Your TikTok FYP: Steps and What Changes',
    description:
      'Reset your TikTok FYP with Refresh your For You feed. Step-by-step path, what a refresh changes, and how to retrain your feed so it shows what you want.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how to reset tiktok fyp',
      'how to reset fyp on tiktok',
      'how to reset tiktok algorithm',
      'refresh for you feed tiktok',
      'reset tiktok for you page',
      'why is my tiktok algorithm messed up',
    ],
  },
  relatedServices: ['buy-tiktok-views', 'buy-tiktok-likes', 'buy-tiktok-followers'],
  relatedArticles: [
    'why-does-my-tiktok-have-0-views',
    'tiktok-seo',
    'how-tiktok-video-views-are-counted',
    'tiktok-views-but-no-followers',
    'public-vs-private-tiktok-account',
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
    'Reset path: Profile, menu, Settings and privacy, Content preferences, Refresh your For You feed.',
    'A refresh restarts your For You feed but keeps the accounts you follow and your existing settings.',
    'Your first sessions after a refresh shape the new feed the most.',
    'For a partly wrong feed, use Not interested, keyword filters or Manage Topics instead.',
    'Resetting your feed does not change who sees your own videos.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Will resetting my FYP unfollow accounts or delete my likes?',
      answer:
        'No. TikTok says a refresh does not affect the accounts you follow or override settings you already chose. Your followers, posts and likes are part of your account, not your For You feed.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Why can’t I find Refresh your For You feed?',
      answer:
        'Update the app first. The option sits under Profile, menu, Settings and privacy, Content preferences. Menu labels can change between app versions, so look for the word refresh in that section.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'How long does it take for my FYP to change after a reset?',
      answer:
        'TikTok does not publish a timeline. The feed starts adjusting as soon as you interact with new videos, so watching, liking and following in your chosen topics right away speeds it up.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Why is my TikTok algorithm messed up?',
      answer:
        'Usually because your recent interactions point somewhere you did not intend, such as videos you watched to the end out of curiosity. Use Not interested on those videos, add keyword filters, or refresh the feed if most of it feels wrong.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does resetting my FYP help my videos get more views?',
      answer:
        'No. It only changes what you are shown. Your videos are recommended to other people based on their interactions and your video’s information.',
      schemaEligible: true,
    },
  ],
};
