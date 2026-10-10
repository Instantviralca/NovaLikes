/**
 * How to Get More Views on TikTok — post-launch Learn article.
 * Published 10 October 2026 (real publication date, not a launch backfill).
 * Informational intent: organic ways to increase TikTok video views.
 * Blocked (0-view) videos are covered separately in why-does-my-tiktok-have-0-views.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-to-get-more-views-on-tiktok';
const PUBLISHED_AT = '2026-10-10T16:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_NEWSROOM_FOR_YOU =
  'https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you';
const TT_NEWSROOM_CREATOR_TIPS =
  'https://newsroom.tiktok.com/en-us/5-tips-for-tiktok-creators';
const TT_STUDIO =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/tiktok-studio';
const TT_SEARCH_INSIGHTS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TT_PROMOTE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/use-promote-to-grow-your-tiktok-audience';
const TT_FYF_STANDARDS =
  'https://www.tiktok.com/community-guidelines/en/fyf-standards';

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
    'To get more views on TikTok, show the payoff in the first seconds, make the video easy to watch to the end, and describe it clearly in the caption, on-screen text and what you say, so TikTok can match it to the right viewers. Post regularly in one topic, give each video a couple of days, and use TikTok Studio to repeat what works.',
  ),
  paragraph(
    'p-answer-2',
    'If a video is stuck at exactly 0 views, that is usually a setting, review or eligibility issue rather than a content problem. Start with our guide on why a TikTok has 0 views instead.',
    [{ href: '/learn/why-does-my-tiktok-have-0-views', label: 'why a TikTok has 0 views' }],
  ),

  heading('h-what-decides', 'What Decides How Many Views a TikTok Gets', 2),
  paragraph(
    'p-wd-1',
    'TikTok recommends videos using viewer interactions (likes, shares, comments, follows and what people watch), information about the video such as captions, sounds and hashtags, and device and account settings like language and country. It says follower count and past high-performing videos are not direct factors. (TikTok Newsroom)',
    [{ href: TT_NEWSROOM_FOR_YOU, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-wd-2',
    'In practice, that means two things matter most: whether people who see your video keep watching and interact with it, and whether TikTok understands what the video is about.',
  ),

  heading('h-ways', '10 Ways to Get More Views on TikTok', 2),

  heading('h-w1', '1. Put the payoff in the first seconds', 3),
  paragraph(
    'p-w1',
    'TikTok says capturing viewers’ attention early and keeping it makes for watchable, shareable content. (TikTok Newsroom) Open with the result, the question or the most surprising moment, not an introduction.',
    [{ href: TT_NEWSROOM_CREATOR_TIPS, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-w2', '2. Make it easy to watch to the end', 3),
  paragraph(
    'p-w2',
    'Cut pauses and repeated points, and keep the video only as long as the idea needs. Film vertically: TikTok says vertical videos, and videos longer than five seconds, perform best. (TikTok Newsroom)',
    [{ href: TT_NEWSROOM_CREATOR_TIPS, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-w3', '3. Say and show what the video is about', 3),
  paragraph(
    'p-w3',
    'Put the topic in your caption, in on-screen text and in the first thing you say. Clear wording helps TikTok match the video to people interested in that subject and helps it appear in TikTok search. Our TikTok SEO guide covers this in detail.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO guide' }],
  ),

  heading('h-w4', '4. Use a few relevant hashtags', 3),
  paragraph(
    'p-w4',
    'Choose hashtags that describe the video. TikTok says #FYP, #ForYou and #ForYouPage work just like any other hashtag, so they are not a shortcut to the For You feed. (TikTok Newsroom)',
    [{ href: TT_NEWSROOM_CREATOR_TIPS, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-w5', '5. Add a sound that fits', 3),
  paragraph(
    'p-w5',
    'Sounds are part of the video information TikTok uses, and a sound that suits your topic can help the video reach people who engage with similar content. Pick one that fits the video rather than any sound that happens to be popular.',
  ),

  heading('h-w6', '6. Stick to one main topic', 3),
  paragraph(
    'p-w6',
    'When most of your videos cover the same subject, the people who interact with one are likely to want the next. Jumping between unrelated topics makes it harder for each video to find its audience.',
  ),

  heading('h-w7', '7. Post consistently, not constantly', 3),
  paragraph(
    'p-w7',
    'TikTok says the number of videos you post will not affect how your content is recommended in the For You feed. (TikTok Newsroom) A schedule you can keep, with videos you are happy with, beats posting several weaker videos a day.',
    [{ href: TT_NEWSROOM_CREATOR_TIPS, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-w8', '8. Give each video time', 3),
  paragraph(
    'p-w8',
    'TikTok says video performance extends over a couple of days. (TikTok Newsroom) Do not delete a video after a few hours because it started slowly.',
    [{ href: TT_NEWSROOM_CREATOR_TIPS, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-w9', '9. Learn from TikTok Studio', 3),
  paragraph(
    'p-w9',
    'Compare your best and weakest videos in TikTok Studio: how long people watched and where the views came from. (TikTok Support) Creator Search Insights shows topics people are searching for, which can give you video ideas with built-in demand. (TikTok Support)',
    [
      { href: TT_STUDIO, label: 'TikTok Support', external: true },
      { href: TT_SEARCH_INSIGHTS, label: 'Creator Search Insights', external: true },
    ],
  ),

  heading('h-w10', '10. Give people a reason to comment and share', 3),
  paragraph(
    'p-w10',
    'Comments and shares are interactions TikTok uses for recommendations. Ask a real question, reply to good comments with a video, and make things people want to send to a friend.',
  ),

  heading('h-after', 'How to Get More Views on a TikTok After Posting', 2),
  bullets('ul-after', [
    'Share the link outside TikTok, for example in a group chat, on Instagram or in a newsletter.',
    'Reply to comments early. A video reply can bring new viewers back to the original post.',
    'Pin your strongest video to the top of your profile so profile visitors start there.',
    'Leave the video up. Deleting and reposting the same file restarts its time to perform.',
  ]),
  paragraph(
    'p-after-1',
    'TikTok also has a paid option, Promote, which lets you pay to show a post to more people and track post views and profile views. (TikTok Support) TikTok excludes paid views from Creator Rewards qualified views, so promoted views do not count there.',
    [{ href: TT_PROMOTE, label: 'TikTok Support', external: true }],
  ),

  heading('h-live', 'How to Get More Views on TikTok LIVE', 2),
  paragraph(
    'p-live-1',
    'Go LIVE at a regular time so followers know when to come back, give the LIVE a clear title, and tell people about it in a video beforehand. LIVE access has its own requirements; see how many followers you need to go LIVE on TikTok.',
    [
      {
        href: '/learn/how-many-followers-to-go-live-on-tiktok',
        label: 'how many followers you need to go LIVE on TikTok',
      },
    ],
  ),

  heading('h-dont', 'What Does Not Help', 2),
  bullets('ul-dont', [
    'Adding #fyp, #foryou or #viral to every video.',
    'Posting as many videos as possible every day.',
    'Deleting and reposting a video that started slowly.',
    'Fake engagement from bots or engagement groups.',
  ]),
  paragraph(
    'p-dont-1',
    'Fake engagement is on TikTok’s list of content that is not eligible for the For You feed. (TikTok) Our guide on whether buying TikTok followers affects FYP reach explains what TikTok says about it.',
    [
      { href: TT_FYF_STANDARDS, label: 'TikTok', external: true },
      {
        href: '/learn/buying-tiktok-followers-fyp-account-safety',
        label: 'whether buying TikTok followers affects FYP reach',
      },
    ],
  ),
  paragraph(
    'p-dont-2',
    'If your videos get views but few new followers, that is a different problem; see why TikTok videos get views but no followers.',
    [
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'why TikTok videos get views but no followers',
      },
    ],
  ),

  {
    id: 'cta-tiktok-views',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare TikTok Growth Options',
    text: 'Views, likes and followers measure different things. Purchased views are paid views: they do not count towards Creator Rewards qualified views, and content is still what keeps people watching.',
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

export const HOW_TO_GET_MORE_VIEWS_ON_TIKTOK_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-to-get-more-views-on-tiktok',
  slug: SLUG,
  title: 'How to Get More Views on TikTok: 10 Ways That Work',
  excerpt:
    'Hook viewers early, make videos easy to finish, describe them clearly, post consistently in one topic and learn from TikTok Studio. Ten ways to get more TikTok views, with TikTok’s own guidance.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['views', 'algorithm', 'creator', 'engagement'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A phone with a rising view count next to a checklist of ways to get more TikTok views',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How to Get More Views on TikTok: 10 Ways That Work',
    description:
      'Ten ways to get more views on TikTok, based on TikTok’s own guidance: hooks, watch time, captions, hashtags, posting schedule and TikTok Studio.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how to get more views on tiktok',
      'how to get more views on tiktok after posting',
      'how to get more views on tiktok without paying',
      'how to get more views and likes on tiktok',
      'how to get more views on tiktok live',
    ],
  },
  relatedServices: ['buy-tiktok-views', 'buy-tiktok-likes', 'buy-tiktok-followers'],
  relatedArticles: [
    'why-does-my-tiktok-have-0-views',
    'tiktok-seo',
    'how-tiktok-video-views-are-counted',
    'tiktok-views-but-no-followers',
    'how-to-reset-tiktok-fyp',
    'how-many-followers-to-make-money-on-tiktok',
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
    'TikTok recommends videos based on viewer interactions, video information and settings, not follower count.',
    'The first seconds and how much of the video people watch matter most.',
    'Describe the topic in the caption, on-screen text and speech; #fyp works like any other hashtag.',
    'Posting more often does not change how TikTok recommends your videos. Consistency and quality do.',
    'Video performance builds over a couple of days, so do not delete slow starters.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How long does it take for a TikTok to get views?',
      answer:
        'Most public videos start getting views soon after posting, but TikTok says performance builds over a couple of days. If a video is still at exactly 0 after an hour, check its privacy and review status.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does posting more often get more views on TikTok?',
      answer:
        'Not by itself. TikTok says the number of videos you post does not affect how your content is recommended in the For You feed. Consistent, watchable videos matter more than volume.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Do #fyp hashtags help you get more views?',
      answer:
        'No more than any other hashtag. TikTok says #FYP, #ForYou and #ForYouPage work like all other hashtags. Use a few hashtags that describe your video instead.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'How can I get more views on TikTok without paying?',
      answer:
        'Hook viewers in the first seconds, keep videos easy to finish, describe the topic clearly, post regularly in one niche, reply to comments and share your videos outside TikTok.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Why did my TikTok views suddenly drop?',
      answer:
        'Views vary from video to video, and TikTok notes that view counts can fluctuate. Compare recent videos in TikTok Studio. If several new posts are stuck near 0, check for privacy, review or eligibility notices.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Do followers help you get more views on TikTok?',
      answer:
        'Not directly. TikTok says follower count is not a direct factor in For You recommendations, so a video can reach people who do not follow you. Followers do see your posts in their Following feed.',
      schemaEligible: true,
    },
  ],
};
