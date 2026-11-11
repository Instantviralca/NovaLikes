/**
 * Article #6 — Facebook Followers vs Page Likes vs Post Likes
 * Scheduled: Friday 4 September 2026.
 * Informational intent. Treats Page Likes as a transitioning Page-level metric, not as deleted.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'facebook-followers-vs-page-likes-vs-post-likes';
const SCHEDULED_AT = '2026-09-04T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const FB_FOLLOW_PAGE =
  'https://www.facebook.com/help/171378103323792';
const FB_RECOMMENDATIONS =
  'https://www.facebook.com/help/1257205004624246';
const FB_FOLLOWER_INSIGHTS =
  'https://www.facebook.com/help/810929305732263';
const FB_REACT =
  'https://www.facebook.com/help/933093216805622';

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
    'p-1',
    'Facebook shows three numbers that sound almost the same: Page followers, Page Likes and Post Likes. They are easy to mix up, and the confusion has grown because Facebook has been moving Pages away from Likes and towards follows. Each one measures something different, so reading them correctly makes it much easier to judge how a Page is doing.',
  ),
  paragraph(
    'p-2',
    'The short version is this. Followers and Page Likes describe people connected to the Page. Post Likes describe a reaction to one post. The first two are about the audience, and the third is about a single piece of content.',
  ),
  heading('h-what-are-facebook-page-followers', 'What Are Facebook Page Followers?', 2),
  paragraph(
    'p-3',
    'A follower is someone who has chosen to get updates from a Page. Facebook\'s help page on following a Page explains that followers may see the Page\'s posts in their Feed, and it also notes that some Pages that used to have a Like button now only show a Follow button.',
    [
      { href: FB_FOLLOW_PAGE, label: 'following a Page', external: true },
    ],
  ),
  paragraph(
    'p-4',
    'Following does not mean someone sees every post. Facebook ranks each person\'s Feed individually and mixes in recommended content, so a Page with 10,000 followers might reach a fraction of them with any given post, and sometimes reach people who do not follow it at all.',
  ),
  paragraph(
    'p-5',
    'For Page owners, the follower count is now the main audience number. It appears in the professional dashboard and in Meta Business Suite, where Facebook says Page Likes have been replaced by follows in the audience insights.',
    [
      { href: FB_FOLLOWER_INSIGHTS, label: 'Page Likes have been replaced by follows', external: true },
    ],
  ),
  heading('h-what-are-facebook-page-likes', 'What Are Facebook Page Likes?', 2),
  paragraph(
    'p-6',
    'For years, liking a Page was the standard way to connect with a business or public figure, and the Page Like count was the number everyone looked at. That has changed. When someone likes a Page, Facebook automatically makes them a follower too, so both actions now feed into the follower total.',
  ),
  paragraph(
    'p-7',
    'Meta has also retired the old metric behind the scenes. In November 2025 it removed the Page Likes metric, known as Page fans, from its Page insights API, leaving follows as the audience number it reports.',
    [
      { href: 'https://developers.facebook.com/blog/post/2025/08/15/page-insights-api-updates/', label: 'Page insights API', external: true },
    ],
  ),
  paragraph(
    'p-8',
    'So if you still see a Page Like figure somewhere, treat it as a historical number. It shows how many people liked the Page under the older system, not how big the audience is today.',
  ),
  figure(
    'fig-page-vs-post',
    `${IMAGE_DIR}/page-vs-post-metrics.png`,
    'Infographic separating Facebook Page followers and Page Likes from Post Likes on individual content, noting many Page experiences are moving toward follows',
    'Page audience metrics and post engagement metrics are not the same thing. Facebook is transitioning many Page experiences toward follows.',
  ),
  heading('h-what-are-facebook-post-likes', 'What Are Facebook Post Likes?', 2),
  paragraph(
    'p-9',
    'A Post Like is a reaction to one specific post. Facebook lets people react to posts with Like, Love, Care, Haha, Wow, Sad or Angry, and Like is just one of those options. Every Like is a reaction, but not every reaction is a Like, which is why the total shown under a post often includes several reaction types.',
    [
      { href: FB_REACT, label: 'react to posts', external: true },
    ],
  ),
  paragraph(
    'p-10',
    'Liking a post has nothing to do with following the Page. Someone can like a post that appears in their Feed and never follow the Page that published it. A loyal follower, on the other hand, may scroll past without reacting. Post Likes tell you how people responded to that piece of content and nothing more.',
  ),
  heading('h-the-three-metrics-side-by-side', 'The Three Metrics Side by Side', 2),
  {
    id: 'table-glance',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Applies To', 'Mainly Represents'],
    rows: [
      ['Page Followers', 'Facebook Page', 'Page audience connection'],
      [
        'Page Likes',
        'Facebook Page',
        'Page-level Like connection where available',
      ],
      ['Post Likes', 'Individual post', 'Like reaction to that content'],
    ],
  },
  paragraph(
    'p-11',
    'An easy way to remember it: followers are the Page\'s audience, Page Likes are an older way of joining that audience, and Post Likes are reactions to individual posts. The same split between account metrics and content metrics exists on other platforms too, as our guide to Instagram followers, likes, views and comments shows.',
    [
      { href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments', label: 'Instagram followers, likes, views and comments' },
    ],
  ),
  heading('h-why-page-likes-and-followers-do-not-alwa', 'Why Page Likes and Followers Do Not Always Match', 2),
  paragraph(
    'p-12',
    'Older Pages often show a follower count that differs from their historical Like count. That is normal. Some people followed without liking, some liked before follows became the standard, and some unfollowed while their old Like stayed in the history. Meta says people who liked and followed a Page stay as followers when the Page moves to the newer Follow only layout, so nothing is lost in the switch.',
  ),
  paragraph(
    'p-13',
    'If your Page only shows a Follow button, nothing is wrong. It simply means your Page is on the newer layout. Focus on followers, because that is the number Facebook\'s own tools now report.',
  ),
  figure(
    'fig-evolved',
    `${IMAGE_DIR}/page-connection-evolved.png`,
    'Simplified timeline of Facebook Page connection moving from an earlier Like-and-follow experience toward a Follow-focused Page audience connection',
    'Simplified illustration of Facebook\'s Page transition. Some Pages and interfaces may still show Like-related functionality.',
  ),
  heading('h-why-a-page-can-have-many-followers-but-f', 'Why a Page Can Have Many Followers but Few Post Likes', 2),
  paragraph(
    'p-14',
    'Suppose a Page has 20,000 followers and a new post gets 120 Likes. That gap does not mean the followers are fake or the Page is broken. Most followers will not see any single post, because Facebook decides what appears in each Feed based on what that person tends to engage with. Of those who do see it, only some will react, and they may choose a reaction other than Like or leave a comment instead.',
  ),
  paragraph(
    'p-15',
    'The opposite can happen too. Facebook recommends posts to people who do not follow the Page, so a small Page can publish something that gets shared widely and collects far more Likes than it has followers.',
    [
      { href: FB_RECOMMENDATIONS, label: 'recommends posts to people who do not follow the Page', external: true },
    ],
  ),
  paragraph(
    'p-16',
    'This is why more followers do not automatically mean more Likes on every post, and why a popular post does not automatically bring in followers. The two numbers move for different reasons.',
  ),
  heading('h-which-metric-should-a-business-watch', 'Which Metric Should a Business Watch?', 2),
  paragraph(
    'p-17',
    'It depends on the question you are asking.',
  ),
  bullets('ul-1', [
    'To understand the size and growth of your audience, watch followers.',
    'To see which posts people respond to, compare reactions, comments and shares on each post.',
    'To see how far content travels, check views and reach in your post insights, which show how many people actually saw it.',
  ]),
  paragraph(
    'p-18',
    'One number is rarely enough. A healthy Page usually shows steady follower growth alongside posts that get a reasonable mix of reactions, comments and shares from the people who see them. If you want to understand why some posts travel further than others, our guide on how Facebook Page reach works covers the main factors.',
    [
      { href: '/learn/how-facebook-page-reach-works', label: 'how Facebook Page reach works' },
    ],
  ),
  paragraph(
    'p-19',
    'Keep in mind that people can also hide reaction counts on their own Feed, so the number a visitor sees may not match what you see in your insights. For decisions, always use the figures in your own dashboard.',
  ),
  figure(
    'fig-which-metric',
    `${IMAGE_DIR}/which-metric.png`,
    'Decision graphic asking what you are measuring: Page audience as Followers, Page-level Like connection as Page Likes where currently available, or interaction on one post as Post Likes',
    'Choose the metric based on the object being measured: Page or post. Many Page experiences are moving toward follows.',
  ),
  heading('h-page-likes-and-post-likes-are-not-interc', 'Page Likes and Post Likes Are Not Interchangeable', 2),
  paragraph(
    'p-20',
    'When someone says their Page has 5,000 likes, they usually mean the old Page level count. When they say a post has 500 likes, they mean reactions on that one post. These numbers answer different questions, which is also why a Page service and a post service on any platform ask for different links: one points to the Page, the other to a specific post.',
  ),
  paragraph(
    'p-21',
    'None of these numbers is a business result on its own. Followers, Page Likes and Post Likes do not directly translate into website visits, enquiries or sales. They are signals that help you understand your audience and your content, and they are most useful when you read them together.',
  ),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list') return block.items.join(' ');
  if (block.type === 'comparison_table') {
    return [block.headers.join(' '), ...block.rows.map((row) => row.join(' '))].join(
      ' ',
    );
  }
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const FACEBOOK_FOLLOWERS_VS_PAGE_LIKES_VS_POST_LIKES_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-facebook-followers-vs-page-likes-vs-post-likes',
    slug: SLUG,
    title:
      'Facebook Followers vs Page Likes vs Post Likes: What’s the Difference?',
    excerpt:
      'Facebook Page followers, Page Likes and Post Likes measure different things. Here is what each number means, why Page Likes are being phased out, and which metric to watch.',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'facebook',
    tags: ['followers', 'likes', 'analytics', 'business', 'creator'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Illustration separating Facebook Page audience metrics from individual post likes',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    showModifiedDate: true,
    seo: {
      title: 'Facebook Followers vs Page Likes vs Post Likes',
      description:
        "Learn the difference between Facebook Page followers, Page Likes and Post Likes, including how Facebook's newer Page experience affects these metrics.",
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'Facebook followers vs page likes',
        'Facebook page likes vs followers',
        'Facebook post likes',
        'difference between Facebook likes and followers',
        'Facebook Page followers',
        'Page Likes Facebook',
      ],
    },
    relatedServices: [
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ],
    relatedArticles: [
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'how-facebook-page-reach-works',
      'how-to-get-more-facebook-page-followers',
      'how-to-get-more-likes-on-facebook-post',
      'why-facebook-page-followers-drop',
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
    'Followers are the main audience number for Facebook Pages today.',
    'Page Likes are being phased out, and liking a Page now makes someone a follower too.',
    'Meta removed the old Page Likes metric from its Page insights API in November 2025.',
    'Post Likes are reactions to one post and do not mean someone follows the Page.',
    'Like is one of several Facebook reactions.',
    'Follower count does not predict how many Likes each post will get.',
  ],
    faqs: [
    {
      id: 'faq-1',
      question: 'What is the difference between Facebook followers and Page Likes?',
      answer:
        'Both describe people connected to a Page. Followers get updates from the Page and are now the main audience metric. Page Likes are an older way of connecting, and anyone who likes a Page is automatically made a follower.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Why does my Facebook Page only have a Follow button?',
      answer:
        'Facebook has moved many Pages to a newer layout that only shows Follow. It is not a problem with your Page, and people who liked it before remain followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Are Post Likes the same as Page Likes?',
      answer:
        'No. A Post Like is a reaction to one post. A Page Like is a connection to the whole Page. Someone can like a post without following or liking the Page.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Why do my posts get few Likes when my Page has many followers?',
      answer:
        'Most followers do not see every post, because Facebook ranks each Feed individually. Of the people who do see a post, only some react, and some choose a reaction other than Like.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do Page Likes still matter?',
      answer:
        'Not as a current metric. Meta retired the Page Likes metric from its Page insights API in November 2025, and its tools now report follows instead.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Is a Like the same as a reaction?',
      answer:
        'A Like is one type of reaction. Facebook also offers Love, Care, Haha, Wow, Sad and Angry, and the total shown on a post can include all of them.',
      schemaEligible: true,
    },
  ],
  };
