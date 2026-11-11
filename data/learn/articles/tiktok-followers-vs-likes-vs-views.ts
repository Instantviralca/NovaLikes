/**
 * Article #1 — TikTok Followers vs Likes vs Views
 * Scheduled: Monday 24 August 2026.
 * Informational intent. Supports existing TikTok commercial pages; does not compete with them.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'tiktok-followers-vs-likes-vs-views';
const SCHEDULED_AT = '2026-08-24T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';

const TIKTOK_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';
const TIKTOK_STUDIO =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/tiktok-studio';

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

function numbered(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'numbered_list', items, order: nextOrder() };
}

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-1',
    'Open any TikTok profile and three numbers stand out: followers, likes and views. They all make an account look active, but each measures something different. A video can get thousands of views without adding many followers, and an account with a modest following can still pull in big views on individual videos. Once you know what each number tracks, these patterns stop being confusing.',
  ),
  heading('h-followers-the-audience-of-your-account', 'Followers: The Audience of Your Account', 2),
  paragraph(
    'p-2',
    'A follower is someone who has chosen to keep up with your account. The follower count belongs to the profile, not to any single video. It shows how many people wanted an ongoing connection with you, and over time it tells you whether that audience is growing.',
  ),
  paragraph(
    'p-3',
    'It does not tell you how a new video will perform. TikTok shows videos to people based on their interests, so many of your viewers will not be followers, and many followers will not see every post.',
  ),
  heading('h-likes-a-quick-reaction-to-one-video', 'Likes: A Quick Reaction to One Video', 2),
  paragraph(
    'p-4',
    'A like is a tap on the heart under a video. It belongs to that video, not to your account. Someone can like a video without following you, and a loyal follower can watch every post without ever liking one.',
  ),
  paragraph(
    'p-5',
    'Likes mean most when you compare them with views. 5,000 likes on a video with 50,000 views is a strong response. 5,000 likes on a video with 500,000 views shows that most viewers watched without reacting. Our guide on TikTok likes vs views covers like to view ratios in more detail.',
    [
      { href: '/learn/tiktok-likes-vs-views', label: 'TikTok likes vs views' },
    ],
  ),
  heading('h-views-how-much-a-video-was-watched', 'Views: How Much a Video Was Watched', 2),
  paragraph(
    'p-6',
    'Views measure viewing activity on a video. They show how far a post travelled, but a view does not mean someone liked it, followed you, commented or bought anything. TikTok also uses the word views for several different numbers, which our guide on how TikTok video views are counted explains.',
    [
      { href: '/learn/how-tiktok-video-views-are-counted', label: 'how TikTok video views are counted' },
    ],
  ),
  figure(
    'fig-profile-vs-content',
    '/assets/images/learn/tiktok-followers-vs-likes-vs-views/profile-vs-content.png',
    'Infographic comparing followers as a profile-level audience metric with likes as content interaction and views as content visibility',
    'Followers are a profile-level audience metric. Likes measure content interaction. Views measure content visibility.',
  ),
  heading('h-the-three-metrics-at-a-glance', 'The Three Metrics at a Glance', 2),
  {
    id: 'table-glance',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Mainly Measures', 'Level'],
    rows: [
      ['Followers', 'People following the account', 'Profile'],
      ['Likes', 'Positive interaction with content', 'Post/content'],
      ['Views', 'Viewing activity on content', 'Post/content'],
    ],
  },
  paragraph(
    'p-7',
    'An easy way to remember it: followers are your audience, views are visibility and likes are interaction. They overlap, but they are not interchangeable.',
  ),
  heading('h-why-the-numbers-rarely-move-together', 'Why the Numbers Rarely Move Together', 2),
  paragraph(
    'p-8',
    'Each number reflects a separate decision. A viewer sees your video, which adds a view. They might like it. Fewer will open your profile, and fewer still will follow. Most people stop after the first step.',
  ),
  paragraph(
    'p-9',
    'That is why lots of views and few followers is so common. A video that answers one quick question or rides a trend can be enjoyed and forgotten, with no reason to follow. Our guide on getting TikTok views but no followers goes through the reasons and fixes.',
    [
      { href: '/learn/tiktok-views-but-no-followers', label: 'getting TikTok views but no followers' },
    ],
  ),
  paragraph(
    'p-10',
    'The opposite happens too. An account with 50,000 followers can post a video that gets 3,000 views, because each video is judged on its own and shown to whoever TikTok thinks will enjoy it.',
  ),
  figure(
    'fig-views-likes-followers-flow',
    '/assets/images/learn/tiktok-followers-vs-likes-vs-views/views-likes-followers-flow.png',
    'Diagram showing that a TikTok view does not automatically become a like, and a like does not automatically become a follower',
    'A view does not automatically become a like, and a like does not automatically become a follower.',
  ),
  heading('h-which-metric-matters-most', 'Which Metric Matters Most?', 2),
  paragraph(
    'p-11',
    'None of them on its own. The useful question is which metric matches what you want to know.',
  ),
  bullets('ul-1', [
    'To see whether your content gets discovered, look at views.',
    'To see whether viewers enjoyed it, look at likes, comments, shares and saves relative to views.',
    'To see whether your audience is growing, look at followers over weeks.',
  ]),
  paragraph(
    'p-12',
    'Some common patterns and what they usually mean:',
  ),
  bullets('ul-2', [
    'Views rising, followers flat: people find your videos but do not yet see a reason to follow.',
    'Views and followers both rising: discovery is working and some viewers want more.',
    'High views, low likes: lots of people watched, but the video did not move them to react.',
    'Followers growing while views vary: your audience is building, even though each video still performs differently.',
  ]),
  figure(
    'fig-read-metrics-together',
    '/assets/images/learn/tiktok-followers-vs-likes-vs-views/read-metrics-together.png',
    'Infographic showing TikTok views, likes and followers should be read together rather than as one isolated number',
    'Performance should be interpreted together, not from one isolated number.',
  ),
  heading('h-reading-your-results-together', 'Reading Your Results Together', 2),
  paragraph(
    'p-13',
    'Imagine two videos. Video A gets 80,000 views and 2,000 likes. Video B gets 20,000 views and 2,500 likes. Video A reached more people, but Video B landed better with those who saw it. Add follower growth, comments and watch time, and the picture can change again. No single number tells you which video did better.',
  ),
  paragraph(
    'p-14',
    'More followers do not automatically mean more likes or views on each video, and more views do not automatically bring more followers. Each metric has to be read for what it is.',
  ),
  paragraph(
    'p-15',
    'A simple review habit helps:',
  ),
  numbered('ol-3', [
    'Look at your last ten to twenty videos together, not one at a time.',
    'Compare views to see which topics and formats get discovered.',
    'Compare likes, comments and shares relative to views.',
    'Track follower changes over weeks, not hours.',
    'Use TikTok Studio to see watch time, traffic sources and new followers per video.',
    'Look for patterns rather than reacting to one result.',
  ]),
  paragraph(
    'p-16',
    'TikTok Studio holds all of these numbers for each post, and TikTok\'s own advice on growing your audience says the same: review your analytics and top posts, then build on what works.',
    [
      { href: TIKTOK_STUDIO, label: 'TikTok Studio', external: true },
      { href: TIKTOK_GROW_AUDIENCE, label: 'growing your audience', external: true },
    ],
  ),
  paragraph(
    'p-17',
    'Followers tell you about your audience. Views tell you about reach. Likes tell you about reaction. Read them together and you get a much clearer picture of what your content is actually doing.',
  ),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list') return block.items.join(' ');
  if (block.type === 'blockquote') return block.text;
  if (block.type === 'comparison_table') {
    return [block.headers.join(' '), ...block.rows.map((row) => row.join(' '))].join(
      ' ',
    );
  }
  if (block.type === 'faq_group') {
    return block.items.map((item) => `${item.question} ${item.answer}`).join(' ');
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const TIKTOK_FOLLOWERS_VS_LIKES_VS_VIEWS_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-tiktok-followers-vs-likes-vs-views',
  slug: SLUG,
  title: 'TikTok Followers vs Likes vs Views: What’s the Difference?',
  excerpt:
    'TikTok followers, likes and views measure different things. Here is what each number means, why they rarely move together, and how to read them to understand your account.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'likes', 'views', 'analytics', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: '/assets/images/learn/tiktok-followers-vs-likes-vs-views/featured.png',
    alt: 'Comparison graphic showing TikTok followers, likes and views as three separate metrics',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'TikTok Followers vs Likes vs Views: Key Differences',
    description:
      'Learn what TikTok followers, likes and views each measure, which one a new creator should watch first, and how to read all three together.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: '/assets/images/learn/tiktok-followers-vs-likes-vs-views/featured.png',
    keywords: [
      'TikTok followers vs likes vs views',
      'TikTok followers meaning',
      'TikTok profile metrics explained',
      'which TikTok metric matters most',
      'TikTok metrics for new creators',
      'TikTok metrics',
    ],
  },
  relatedServices: [
    'buy-tiktok-followers',
    'buy-tiktok-likes',
    'buy-tiktok-views',
  ],
  relatedArticles: [
    'tiktok-views-but-no-followers',
    'tiktok-seo',
    'buying-tiktok-followers-fyp-account-safety',
    'how-tiktok-video-views-are-counted',
    'public-vs-private-tiktok-account',
    'how-to-get-1000-tiktok-followers',
    'how-many-followers-to-go-live-on-tiktok',
    'why-tiktok-followers-drop',
    'tiktok-likes-vs-views',
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
    'Followers measure your account\'s audience. Likes and views measure individual videos.',
    'A like is a reaction to one video and does not mean someone follows you.',
    'Views show how much a video was watched, not who followed or engaged.',
    'Lots of views with few followers is common and not a sign of a problem.',
    'Compare likes with views rather than reading either alone.',
    'Review several videos together and look for patterns over time.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is the difference between TikTok followers, likes and views?',
      answer:
        'Followers are people who follow your account. Likes are reactions to individual videos. Views show how much each video was watched.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can you have lots of TikTok views but few followers?',
      answer:
        'Yes. Many viewers enjoy a video without deciding to follow. It is one of the most common patterns on TikTok.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Do more followers mean more views?',
      answer:
        'Not automatically. TikTok shows each video based on how people respond to it, so follower count does not decide views.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Which TikTok metric is most important?',
      answer:
        'It depends on your goal. Views show discovery, likes and comments show reaction, and followers show audience growth.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Is a like the same as a follow on TikTok?',
      answer:
        'No. A like is a reaction to one video. A follow is a choice to keep seeing content from that account.',
      schemaEligible: true,
    },
  ],
};
