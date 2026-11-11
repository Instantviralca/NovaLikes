/**
 * Article #10 — How Are TikTok Video Views Counted?
 * Scheduled: Monday 14 September 2026.
 * Informational intent. Keeps public/post views separate from Creator Rewards qualified views.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-tiktok-video-views-are-counted';
const SCHEDULED_AT = '2026-09-14T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_STUDIO =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/tiktok-studio';
const TIKTOK_CREATOR_REWARDS =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program';
const TIKTOK_HOW_REWARDS_WORK =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/how-rewards-work';
const TIKTOK_CSI =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TIKTOK_POST_VIEWS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/my-videos-arent-getting-views';

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
    'The number under a TikTok video looks like a straightforward count, but TikTok uses the word views for several different metrics. The public counter, the figures in TikTok Studio and the qualified views used for Creator Rewards are not calculated the same way. Most confusion about TikTok views comes from comparing numbers that were never meant to match.',
  ),
  paragraph(
    'p-2',
    'So before asking how TikTok counts a view, it helps to ask which view number you are looking at.',
  ),
  heading('h-what-a-public-tiktok-view-means', 'What a Public TikTok View Means', 2),
  paragraph(
    'p-3',
    'The public count under a video shows how much viewing activity it has received. TikTok Studio tracks the same kind of figure for each post, along with likes, comments, shares and other performance data over time.',
    [
      { href: TIKTOK_STUDIO, label: 'TikTok Studio', external: true },
    ],
  ),
  paragraph(
    'p-4',
    'What TikTok does not publish is a precise rule for the public counter. You will find articles claiming a view counts after exactly one second, or only after a set percentage of the video. TikTok has not confirmed either. The safest way to read the public number is as a general measure of how often the video was watched, not as a count of unique people.',
  ),
  figure(
    'fig-contexts',
    `${IMAGE_DIR}/three-view-contexts.png`,
    'Three columns separating public TikTok video views, TikTok Studio analytics and Creator Rewards qualified views',
    'Do not assume all three numbers follow identical rules. Simplified explanation based on TikTok\'s public creator documentation.',
  ),
  heading('h-what-are-qualified-views', 'What Are Qualified Views?', 2),
  paragraph(
    'p-5',
    'Qualified views belong to the Creator Rewards Program, and they are defined much more strictly. TikTok\'s explanation of how rewards are calculated says qualified views:',
    [
      { href: TIKTOK_CREATOR_REWARDS, label: 'Creator Rewards Program', external: true },
      { href: TIKTOK_HOW_REWARDS_WORK, label: 'how rewards are calculated', external: true },
    ],
  ),
  bullets('ul-1', [
    'come from the For You feed',
    'are unique, so repeat views from the same account count only once per video',
    'must last longer than five seconds',
    'exclude fraudulent views, paid views and disliked views',
  ]),
  paragraph(
    'p-6',
    'Because of those filters, the qualified figure is almost always lower than the public count. A video with 100,000 public views and 65,000 qualified views has not lost anything. The two numbers simply measure different things.',
  ),
  {
    id: 'table-view-types',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Purpose', 'Key Difference'],
    rows: [
      [
        'Public/Post Views',
        'General video-performance visibility',
        'Broader post view metric',
      ],
      [
        'Qualified Views',
        'Creator Rewards calculation',
        'Must satisfy additional eligibility conditions',
      ],
    ],
  },
  figure(
    'fig-filter',
    `${IMAGE_DIR}/public-to-qualified-views.png`,
    'Filter diagram showing general TikTok viewing activity passing through Creator Rewards rules such as unique For You views and a five-second minimum before becoming qualified views',
    'Qualified views are a filtered rewards metric, not simply the public total copied over.',
  ),
  heading('h-does-a-tiktok-view-need-five-seconds', 'Does a TikTok View Need Five Seconds?', 2),
  paragraph(
    'p-7',
    'Five seconds is a documented rule for qualified views in Creator Rewards. TikTok has not said the same rule applies to the public counter, so it is not accurate to claim every TikTok view needs five seconds.',
  ),
  paragraph(
    'p-8',
    'The same goes for replays. Creator Rewards counts one qualified view per account per video, however many times that person watches. TikTok has not published how replays affect the public counter, so avoid treating public views as a count of individual viewers.',
  ),
  heading('h-paid-and-bought-views', 'Paid and Bought Views', 2),
  paragraph(
    'p-9',
    'TikTok\'s own Promote tool lets creators pay to show a video to more people, and those campaigns have their own reporting. Promoted views are excluded from qualified views, so paying for distribution does not raise Creator Rewards earnings.',
  ),
  paragraph(
    'p-10',
    'Views from third party services are a different matter. TikTok excludes fraudulent views from qualified views, and its Creator Rewards rules prohibit fake views. No service can honestly promise that bought views will help you qualify for rewards or raise your earnings, and they can put a monetised account at risk.',
  ),
  {
      id: 'cta-tiktok-views',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-tiktok-views',
      heading: 'Compare TikTok View Options',
      description:
        'TikTok views measure video viewing activity. Compare the available options without treating a view count as a guarantee of followers, engagement, FYP reach or Creator Rewards eligibility.',
      label: 'View TikTok View Packages',
    },
  heading('h-where-tiktok-views-come-from', 'Where TikTok Views Come From', 2),
  paragraph(
    'p-11',
    'Most views on TikTok come from the For You feed, which shows each person videos based on what they have watched and interacted with, along with information about the video itself. But views also come from your profile, from followers, from shares and from search.',
  ),
  paragraph(
    'p-12',
    'Search is worth paying attention to. TikTok\'s Creator Search Insights show which of your posts appear in search results and what people are searching for, so a useful video can keep getting views long after it was posted. Our guide to TikTok SEO covers how to make videos easier to find. Remember that only For You feed views count towards qualified views, even though search views appear in the public count.',
    [
      { href: TIKTOK_CSI, label: 'Creator Search Insights', external: true },
      { href: '/learn/tiktok-seo', label: 'TikTok SEO' },
    ],
  ),
  heading('h-why-different-screens-show-different-num', 'Why Different Screens Show Different Numbers', 2),
  paragraph(
    'p-13',
    'The public counter, TikTok Studio, Creator Search Insights, Promote campaign reports and Creator Rewards all report on different things. Stories and LIVE sessions have their own view figures too, separate from regular posts. If two screens show different numbers, first check whether they are measuring the same metric. Often they are not.',
  ),
  figure(
    'fig-alone',
    `${IMAGE_DIR}/dont-read-views-alone.png`,
    'A TikTok video connected to views, likes, comments, followers and search performance as separate questions',
    'Views are useful, but they are only one part of video performance.',
  ),
  heading('h-views-are-not-reach-watch-time-or-follow', 'Views Are Not Reach, Watch Time or Followers', 2),
  paragraph(
    'p-14',
    'A view count tells you a video was watched. It does not tell you how many different people saw it, how long they watched or whether they cared.',
  ),
  paragraph(
    'p-15',
    'Watch time fills part of that gap. One video might get many short views while another gets fewer views from people who watch to the end. TikTok Studio shows watch time and average watch time for each post, and those figures often say more about quality than the view count does.',
  ),
  paragraph(
    'p-16',
    'Views also do not convert automatically into likes or followers. Plenty of people watch a video, enjoy it and keep scrolling. Our guides on TikTok followers, likes and views and on getting views but no followers explain why those numbers move separately.',
    [
      { href: '/learn/tiktok-followers-vs-likes-vs-views', label: 'TikTok followers, likes and views' },
      { href: '/learn/tiktok-views-but-no-followers', label: 'getting views but no followers' },
    ],
  ),
  heading('h-why-view-counts-rise-stall-or-drop', 'Why View Counts Rise, Stall or Drop', 2),
  paragraph(
    'p-17',
    'TikTok says in its help page on videos not getting views that views naturally go up and down from post to post. A video can start slowly and pick up later, or stop growing after a strong first day. Neither pattern is a rule.',
    [
      { href: TIKTOK_POST_VIEWS, label: 'videos not getting views', external: true },
    ],
  ),
  paragraph(
    'p-18',
    'If a video seems stuck, check that it is public, look at its analytics in TikTok Studio, and see whether your other recent posts are behaving normally. A single quiet video is not evidence of a shadowban. If several posts stop getting views at once, check your inbox and Account status for any notices.',
  ),
  paragraph(
    'p-19',
    'Do not delete a video just because its view count is low. It may still be found through search later, it may serve your existing followers, and it gives you information for the next one.',
  ),
  heading('h-how-to-read-your-tiktok-views', 'How to Read Your TikTok Views', 2),
  numbered('ol-2', [
    'Use the public view count as a rough guide to visibility.',
    'Compare it with similar videos on your own account, not with unrelated content.',
    'Check likes, comments, shares and new followers to see how viewers responded.',
    'Look at watch time in TikTok Studio to see whether people stayed.',
    'Use Creator Search Insights if search matters to your content.',
    'If you earn through Creator Rewards, judge results by qualified views, not the public counter.',
  ]),
  paragraph(
    'p-20',
    'A video with 100,000 public views does not have 100,000 qualified views, 100,000 unique viewers or 100,000 people who cared. It has a lot of viewing activity, and the other numbers tell you what that activity was worth.',
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

export const HOW_TIKTOK_VIDEO_VIEWS_ARE_COUNTED_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-tiktok-video-views-are-counted',
  slug: SLUG,
  title: 'How Are TikTok Video Views Counted?',
  excerpt:
    'TikTok uses the word views for several different numbers. Here is how public views differ from Creator Rewards qualified views, why the numbers rarely match, and how to read them.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['views', 'analytics', 'algorithm', 'creator', 'engagement'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Editorial illustration of a TikTok video player, a view icon and an analytics concept for counting video views',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'How Are TikTok Video Views Counted?',
    description:
      'Learn what TikTok video views measure, why views can differ from unique viewers, and how ordinary views differ from Creator Rewards qualified views.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how TikTok views are counted',
      'what counts as a view on TikTok',
      'TikTok views explained',
      'TikTok qualified views',
      'TikTok repeat views',
      'TikTok video analytics',
    ],
  },
  relatedServices: ['buy-tiktok-views'],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'tiktok-seo',
    'how-to-get-1000-tiktok-followers',
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
    'TikTok uses the word views for several different metrics.',
    'TikTok does not publish an exact rule for the public view counter.',
    'Qualified views for Creator Rewards are unique, from the For You feed and longer than five seconds.',
    'Fraudulent, paid and disliked views are excluded from qualified views.',
    'Views can come from the For You feed, profiles, shares and search.',
    'Views alone do not show unique reach, watch time or follower growth.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What counts as a view on TikTok?',
      answer:
        'The public counter shows how often a video was watched. TikTok does not publish an exact rule for it. Qualified views for Creator Rewards have stricter rules.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'What are qualified views on TikTok?',
      answer:
        'Qualified views are used to calculate Creator Rewards. They must come from the For You feed, last longer than five seconds and count only once per account per video. Fraudulent and paid views are excluded.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Does someone have to watch five seconds for a TikTok view to count?',
      answer:
        'Five seconds is the rule for qualified views in Creator Rewards. TikTok has not said it applies to the public view counter.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Why are my qualified views lower than my total views?',
      answer:
        'Qualified views filter out repeat views, short views, paid views and views from outside the For You feed, so they are almost always lower than the public count.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do bought views count towards Creator Rewards?',
      answer:
        'No. TikTok excludes fraudulent and paid views from qualified views, and fake views break the Creator Rewards rules.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Why did my TikTok views stop going up?',
      answer:
        'Views naturally rise and fall. Check that the video is public, review TikTok Studio and compare it with your other recent posts before assuming there is a problem.',
      schemaEligible: true,
    },
  ],
};
