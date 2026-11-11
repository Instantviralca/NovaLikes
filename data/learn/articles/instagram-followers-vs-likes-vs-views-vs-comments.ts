/**
 * Article #3 — Instagram Followers vs Likes vs Views vs Comments
 * Scheduled: Friday 28 August 2026.
 * Informational intent. Supports existing Instagram commercial pages; does not compete with them.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'instagram-followers-vs-likes-vs-views-vs-comments';
const SCHEDULED_AT = '2026-08-28T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_REEL_INSIGHTS =
  'https://www.facebook.com/help/instagram/202865988324236';
const IG_CREATORS_FAQ = 'https://creators.instagram.com/faq';

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
    'Open any Instagram profile or Reel and you will see several numbers at once: followers, likes, views and comments. They are all signs of activity, but each one measures a different action. That is why an account with 25,000 followers can post a Reel that gets 3,000 views, while a smaller account\'s Reel reaches 200,000 people.',
  ),
  paragraph(
    'p-2',
    'Instagram\'s own Insights treat these as separate metrics for a reason. Once you know what each one measures, it becomes much easier to understand what your content is actually doing.',
    [
      { href: IG_INSIGHTS, label: 'Insights', external: true },
    ],
  ),
  heading('h-followers-your-audience', 'Followers: Your Audience', 2),
  paragraph(
    'p-3',
    'Followers are accounts that have chosen to follow a profile. The count belongs to the account, not to any single post. It tells you how big your connected audience is and, over time, whether it is growing.',
  ),
  paragraph(
    'p-4',
    'What it does not tell you is how any post will perform. Followers do not see everything you share, because Feed and Stories are ranked for each person. And plenty of your views may come from people who do not follow you at all.',
  ),
  paragraph(
    'p-5',
    'For professional accounts, Insights show follower growth, where your followers are located, their age range and when they are most active.',
  ),
  heading('h-views-how-often-content-was-seen', 'Views: How Often Content Was Seen', 2),
  paragraph(
    'p-6',
    'Instagram defines Views as the number of times your content was played or displayed. The same definition now applies across Reels, photos, carousels, Stories and Live videos.',
  ),
  paragraph(
    'p-7',
    'Views are not the same as people. Insights also show Accounts reached, the number of unique accounts that saw your content at least once. If one person watches a Reel three times, that adds three views but only one account reached. A Reel with 10,000 views might have been seen by 7,000 different people. Our guide on how Instagram Reels views are counted goes into this in more detail.',
    [
      { href: '/learn/how-instagram-reels-views-are-counted', label: 'how Instagram Reels views are counted' },
    ],
  ),
  figure(
    'fig-four-jobs',
    `${IMAGE_DIR}/four-metrics-four-jobs.png`,
    'Infographic showing Instagram followers as profile audience, views as content visibility, likes as quick interaction and comments as conversation',
    'Read the metrics together, not as interchangeable numbers.',
  ),
  heading('h-likes-a-quick-reaction', 'Likes: A Quick Reaction', 2),
  paragraph(
    'p-8',
    'A like is the simplest way to react to a post. Instagram groups likes with comments, saves and shares under Interactions in Insights.',
  ),
  paragraph(
    'p-9',
    'A like is not a follow, and it is not a comment. Someone can like a Reel from an account they will never visit again, and a loyal follower can watch every post without ever tapping the heart. Likes are most useful when you compare them with views. If one post has 50,000 views and 900 likes, and another has 8,000 views and 850 likes, the second one landed far better with the people who saw it.',
  ),
  heading('h-comments-conversation', 'Comments: Conversation', 2),
  paragraph(
    'p-10',
    'A comment takes more effort than a like, so it often tells you more. The words themselves can show what people found useful, what confused them and what they want to see next.',
  ),
  paragraph(
    'p-11',
    'More comments are not always better, though. A post can collect hundreds of comments because it annoyed people, or because it ran a giveaway asking everyone to tag friends. Read what people are saying before you treat a high number as a win.',
  ),
  heading('h-the-four-metrics-at-a-glance', 'The Four Metrics at a Glance', 2),
  {
    id: 'table-glance',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Mainly Measures', 'Level'],
    rows: [
      ['Followers', 'Accounts following the profile', 'Profile'],
      ['Views', 'Times content was played/displayed', 'Content'],
      ['Likes', 'One type of interaction', 'Content'],
      ['Comments', 'Written interaction', 'Content'],
    ],
  },
  paragraph(
    'p-12',
    'An easy way to remember it: followers are your audience, views are visibility, likes are a quick reaction and comments are conversation.',
  ),
  heading('h-why-the-numbers-rarely-move-together', 'Why the Numbers Rarely Move Together', 2),
  paragraph(
    'p-13',
    'Each number reflects a separate decision. Someone sees your Reel, which adds a view. They might watch to the end, like it, comment, save it, share it, visit your profile or follow. Most people do only the first step or two.',
  ),
  paragraph(
    'p-14',
    'That is why a Reel can have lots of views but few likes, or more views than you have followers. Instagram\'s Reel Insights report views, watch time, accounts reached, likes, comments, saves, shares and follows separately, including how many people followed you because of that Reel. Instagram\'s creator resources also encourage using Insights to understand people who view your content without following you.',
    [
      { href: IG_REEL_INSIGHTS, label: 'Reel Insights', external: true },
      { href: IG_CREATORS_FAQ, label: 'creator resources', external: true },
    ],
  ),
  paragraph(
    'p-15',
    'More followers do not automatically bring more likes or views on each post, and more views do not automatically bring more followers. Each metric has to be read for what it is.',
  ),
  figure(
    'fig-profile-vs-content',
    `${IMAGE_DIR}/profile-vs-content.png`,
    'Infographic contrasting Instagram followers as a profile metric with views, likes and comments as individual content metrics',
    'Account size and individual content performance should not be expected to match.',
  ),
  heading('h-which-metric-matters-most', 'Which Metric Matters Most?', 2),
  paragraph(
    'p-16',
    'It depends on what you want to know.',
  ),
  bullets('ul-1', [
    'To see how big your audience is and whether it is growing, look at followers.',
    'To see how far a post travelled, look at views and accounts reached.',
    'To see whether people enjoyed it, look at likes, saves and shares.',
    'To see what people think, read the comments.',
    'To see whether a post grew the account, look at follows from that post.',
  ]),
  paragraph(
    'p-17',
    'Comments are not automatically more valuable than likes. A funny Reel may get thousands of likes and few comments, while a tutorial that ends with a question may spark a long thread. Ask what you wanted the post to achieve, then check the numbers that match.',
  ),
  heading('h-reading-your-results-properly', 'Reading Your Results Properly', 2),
  paragraph(
    'p-18',
    'Imagine two Reels. Reel A gets 120,000 views, 2,000 likes and 40 comments. Reel B gets 20,000 views, 1,800 likes and 150 comments. Reel A reached more people. Reel B connected far better with the people who saw it. If Reel A also brought in 300 new followers and Reel B brought in 20, the picture changes again. No single number tells you which was better.',
  ),
  figure(
    'fig-read-together',
    `${IMAGE_DIR}/read-metrics-together.png`,
    'Diagram showing Instagram views, likes, comments and followers as different questions about the same content',
    'Different questions require different metrics.',
  ),
  paragraph(
    'p-19',
    'A simple monthly review helps:',
  ),
  numbered('ol-2', [
    'Compare similar content, such as Reels with Reels, rather than mixing formats.',
    'Look at views and accounts reached side by side.',
    'Check likes, comments, saves and shares relative to views.',
    'Track follower growth over weeks, not after every post.',
    'Note which posts brought in new followers.',
    'Look for topics and formats that work more than once.',
  ]),
  paragraph(
    'p-20',
    'All of this lives in Insights, which are available on creator and business accounts. If you are on a personal account, switching to a professional account gives you access to these numbers.',
  ),
  paragraph(
    'p-21',
    'Followers, views, likes and comments each tell part of the story. Read together, they show who your audience is, how far your content reaches and whether it is worth their time.',
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

export const INSTAGRAM_FOLLOWERS_VS_LIKES_VS_VIEWS_VS_COMMENTS_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-instagram-followers-vs-likes-vs-views-vs-comments',
    slug: SLUG,
    title:
      'Instagram Followers vs Likes vs Views vs Comments: What Each Metric Means',
    excerpt:
      'Instagram followers, likes, views and comments each measure something different. Here is what every number means, why they rarely move together, and how to read them as a set.',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'instagram',
    tags: ['followers', 'likes', 'views', 'comments', 'analytics', 'creator'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Illustration comparing Instagram followers, likes, views and comments as four distinct metrics',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    showModifiedDate: true,
    seo: {
      title: 'Instagram Followers vs Likes vs Views vs Comments',
      description:
        'Learn what Instagram followers, likes, views and comments measure, how they differ, and how to read these metrics together.',
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'Instagram followers vs likes vs views',
        'Instagram followers vs likes',
        'Instagram likes vs views',
        'Instagram comments meaning',
        'Instagram metrics explained',
        'Instagram views meaning',
      ],
    },
    relatedServices: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ],
    relatedArticles: [
      'how-instagram-algorithm-works',
      'why-instagram-followers-drop',
      'how-instagram-reels-views-are-counted',
      'public-vs-private-instagram-account',
      'how-to-grow-instagram-followers-organically',
      'check-instagram-follower-count-without-login',
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
    'Followers measure your audience. Views, likes and comments measure individual posts.',
    'Views count how often content was played or displayed, not unique people.',
    'Accounts reached shows how many unique accounts saw a post.',
    'Likes are quick reactions, while comments show what people think.',
    'The numbers rarely move together because each reflects a separate decision.',
    'Read several metrics together and judge them against what the post was meant to do.',
  ],
    faqs: [
    {
      id: 'faq-1',
      question: 'What is the difference between Instagram followers, likes, views and comments?',
      answer:
        'Followers are accounts that follow your profile. Views count how often your content was played or displayed. Likes are quick reactions to a post, and comments are written responses.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can you have more Instagram views than followers?',
      answer:
        'Yes. Reels in particular are often shown to people who do not follow you, and views also include repeat plays.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Why does my Reel have lots of views but few likes?',
      answer:
        'Watching and liking are separate decisions. Many people watch a Reel and keep scrolling without reacting.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Are comments more important than likes?',
      answer:
        'Not always. They show different things. Comments reveal what people think, while likes show a quick positive reaction. What matters depends on the goal of the post.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do more followers mean more likes and views?',
      answer:
        'Not automatically. Followers do not see every post, and much of your reach can come from non-followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Where can I see these numbers for my account?',
      answer:
        'In Instagram Insights, which are available on creator and business accounts.',
      schemaEligible: true,
    },
  ],
  };
