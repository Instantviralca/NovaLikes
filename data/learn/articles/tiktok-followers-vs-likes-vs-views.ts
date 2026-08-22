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

const TIKTOK_CREATOR_TOOLS =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/creator-tools-on-tiktok';
const TIKTOK_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';
const TIKTOK_STUDIO =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/tiktok-studio';
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

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-open-1',
    'Open almost any TikTok profile and three numbers immediately stand out: followers, likes and video views. They can all make an account look active, but they do not measure the same thing.',
  ),
  paragraph(
    'p-open-2',
    'A video can receive thousands of views without adding many new followers. Another creator might have a relatively modest follower count but consistently receive strong engagement on individual posts. You may also see an established profile with many followers while some new videos attract far fewer views.',
  ),
  paragraph(
    'p-open-3',
    'None of those situations is automatically unusual.',
  ),
  paragraph(
    'p-open-4',
    'TikTok tracks different types of performance separately. Its creator analytics include metrics such as views, followers and likes, while individual-post analytics provide more detailed information about content performance. (TikTok Support)',
    [
      { href: TIKTOK_CREATOR_TOOLS, label: 'creator analytics', external: true },
      { href: TIKTOK_CREATOR_TOOLS, label: 'TikTok Support', external: true },
    ],
  ),
  paragraph(
    'p-open-5',
    'Understanding what each metric actually represents makes it much easier to evaluate a TikTok account without focusing on one number alone.',
  ),

  heading('h-followers', 'What Are TikTok Followers?', 2),
  paragraph(
    'p-followers-1',
    'A follower is someone who chooses to follow a TikTok account.',
  ),
  paragraph(
    'p-followers-2',
    'Followers are primarily a profile-level metric. They represent the audience that has decided they want an ongoing connection with a creator, brand or account.',
  ),
  paragraph(
    'p-followers-3',
    'A growing follower count can indicate that people are interested enough in what they have seen to follow the profile rather than simply watch one video and move on.',
  ),
  paragraph(
    'p-followers-4',
    'However, follower count should not be confused with guaranteed video reach.',
  ),
  paragraph(
    'p-followers-5',
    "Having 20,000 followers does not mean every new TikTok will automatically receive 20,000 views. TikTok distributes and recommends content through feeds and other discovery surfaces, so the audience for an individual post can differ considerably from the account's total follower count.",
  ),
  paragraph(
    'p-followers-6',
    'TikTok itself recommends creators use analytics to understand how their content performs rather than relying on a single headline number. (TikTok Support)',
    [
      {
        href: TIKTOK_GROW_AUDIENCE,
        label: 'use analytics to understand how their content performs',
        external: true,
      },
    ],
  ),
  heading('h-followers-useful', 'Followers are most useful for measuring:', 3),
  bullets('ul-followers', [
    "the size of an account's following",
    'longer-term audience growth',
    'whether viewers are converting into followers',
    'changes in profile audience over time',
  ]),
  paragraph(
    'p-followers-7',
    "Think of followers as the audience attached to the account, rather than the audience of one particular video.",
  ),

  heading('h-likes', 'What Are TikTok Likes?', 2),
  paragraph(
    'p-likes-1',
    'A TikTok like is an interaction with a post.',
  ),
  paragraph(
    'p-likes-2',
    'When someone taps the heart button on a TikTok, they are giving that particular piece of content a positive interaction.',
  ),
  paragraph(
    'p-likes-3',
    'This makes likes different from followers.',
  ),
  paragraph(
    'p-likes-4',
    'A person can like a TikTok without following the account. Likewise, someone who already follows an account will not necessarily like every video it publishes.',
  ),
  paragraph(
    'p-likes-5',
    'Likes therefore tell you more about how viewers responded to specific content.',
  ),
  paragraph(
    'p-likes-6',
    'TikTok Studio includes likes as one of the metrics creators can use when tracking content performance over time. (TikTok Support)',
    [
      { href: TIKTOK_STUDIO, label: 'TikTok Studio', external: true },
    ],
  ),
  heading('h-likes-useful', 'Likes can help you understand:', 3),
  bullets('ul-likes', [
    'which videos receive stronger viewer reactions',
    'which topics or formats appear to resonate',
    'whether one post performs differently from another',
    'how viewers interact after watching',
  ]),
  paragraph(
    'p-likes-7',
    'Likes are useful, but they should still be read in context.',
  ),
  paragraph(
    'p-likes-8',
    'For example, comparing 5,000 likes on a video with 50,000 views tells you something different from seeing 5,000 likes on a video with 500,000 views.',
  ),
  paragraph(
    'p-likes-9',
    'The raw like total alone does not tell the whole story.',
  ),

  heading('h-views', 'What Are TikTok Views?', 2),
  paragraph(
    'p-views-1',
    'Views measure viewing activity around TikTok content.',
    [{ href: '/tools/tiktok-video-downloader', label: 'TikTok content' }],
  ),
  paragraph(
    'p-views-2',
    'They are primarily a content-level visibility metric.',
  ),
  paragraph(
    'p-views-3',
    "If followers tell you about the account's audience and likes tell you about one type of engagement, views tell you how much viewing activity a post has received.",
  ),
  paragraph(
    'p-views-4',
    'This is why a video may have significantly more views than the creator has followers.',
  ),
  paragraph(
    'p-views-5',
    'TikTok content can be discovered by people who have never followed or previously interacted with the creator.',
  ),
  paragraph(
    'p-views-6',
    'TikTok also acknowledges that post views can fluctuate and recommends using its analytics dashboard to better understand content performance. (TikTok Support)',
    [
      { href: TIKTOK_POST_VIEWS, label: 'analytics dashboard', external: true },
    ],
  ),
  heading('h-views-useful', 'Views are useful for understanding:', 3),
  bullets('ul-views', [
    'how much viewing activity a video receives',
    'which posts attract more visibility',
    'changes in video performance',
    'how different pieces of content compare',
  ]),
  paragraph(
    'p-views-7',
    'A view does not automatically mean the viewer followed the account, liked the video, commented, purchased something or took another action.',
  ),
  paragraph(
    'p-views-8',
    'That distinction is important.',
  ),
  figure(
    'fig-profile-vs-content',
    '/assets/images/learn/tiktok-followers-vs-likes-vs-views/profile-vs-content.png',
    'Infographic comparing followers as a profile-level audience metric with likes as content interaction and views as content visibility',
    'Followers are a profile-level audience metric. Likes measure content interaction. Views measure content visibility.',
  ),

  heading('h-glance', 'TikTok Followers vs Likes vs Views at a Glance', 2),
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
    'p-glance-1',
    'This is the easiest way to remember the difference:',
  ),
  paragraph('p-glance-2', 'Followers = audience'),
  paragraph('p-glance-3', 'Views = visibility'),
  paragraph('p-glance-4', 'Likes = interaction'),
  paragraph(
    'p-glance-5',
    'They overlap, but they are not interchangeable.',
  ),

  heading('h-views-few-followers', 'Can You Have Lots of Views but Few Followers?', 2),
  paragraph('p-vff-1', 'Yes.'),
  paragraph(
    'p-vff-2',
    'In fact, this is one of the most useful patterns to examine when reviewing TikTok performance.',
  ),
  figure(
    'fig-views-likes-followers-flow',
    '/assets/images/learn/tiktok-followers-vs-likes-vs-views/views-likes-followers-flow.png',
    'Diagram showing that a TikTok view does not automatically become a like, and a like does not automatically become a follower',
    'A view does not automatically become a like, and a like does not automatically become a follower.',
  ),
  paragraph(
    'p-vff-3',
    'Imagine a profile has:',
  ),
  bullets('ul-vff', [
    '50,000 views on a video',
    '1,500 likes',
    '40 new followers',
  ]),
  paragraph(
    'p-vff-4',
    'The video clearly received viewing activity, but only a portion of those viewers decided to follow the account.',
  ),
  paragraph(
    'p-vff-5',
    'That does not necessarily mean the video failed.',
  ),
  paragraph(
    'p-vff-6',
    'The purpose of the video matters.',
  ),
  paragraph(
    'p-vff-7',
    'Some content is designed to entertain, answer one specific question or benefit from a temporary trend. A viewer may enjoy it without feeling a reason to follow the creator.',
  ),
  paragraph(
    'p-vff-8',
    'If this happens repeatedly, however, it may be worth examining whether the profile gives viewers a clear reason to return.',
  ),

  heading('h-followers-fewer-views', 'Can You Have Many Followers but Fewer Views?', 2),
  paragraph('p-ffv-1', 'Also yes.'),
  paragraph(
    'p-ffv-2',
    'Follower count and individual video views should never be expected to match exactly.',
  ),
  paragraph(
    'p-ffv-3',
    'An account may have accumulated followers over months or years while each new video reaches a different subset of people.',
  ),
  paragraph(
    'p-ffv-4',
    'Content topic, viewer interest, posting history and many other factors can affect what actually gets watched.',
  ),
  paragraph(
    'p-ffv-5',
    'This is why judging a TikTok account solely by follower count can be misleading.',
  ),
  paragraph(
    'p-ffv-6',
    'Look at the profile and its recent content together.',
  ),

  heading('h-likes-vs-views', 'Are Likes More Important Than Views?', 2),
  paragraph(
    'p-lvv-1',
    'There is no universal answer.',
  ),
  paragraph(
    'p-lvv-2',
    'They measure different things.',
  ),
  paragraph(
    'p-lvv-3',
    'If your goal is to understand visibility, views are more relevant.',
  ),
  paragraph(
    'p-lvv-4',
    "If you're examining whether people actively respond to a video, likes provide another useful signal.",
  ),
  paragraph(
    'p-lvv-5',
    'If your goal is building an ongoing audience, follower growth becomes more important.',
  ),
  paragraph(
    'p-lvv-6',
    'Instead of asking:',
  ),
  {
    id: 'bq-which-best',
    type: 'blockquote',
    text: 'Which metric is the best?',
    order: nextOrder(),
  },
  paragraph(
    'p-lvv-7',
    'A more useful question is:',
  ),
  {
    id: 'bq-which-match',
    type: 'blockquote',
    text: 'Which metric best matches what I am trying to measure?',
    order: nextOrder(),
  },
  paragraph(
    'p-lvv-8',
    'That change in perspective makes TikTok analytics much easier to understand.',
  ),

  heading('h-new-creator', 'Which TikTok Metric Should a New Creator Watch?', 2),
  paragraph(
    'p-nc-1',
    'New creators should avoid becoming obsessed with only one number.',
  ),
  paragraph(
    'p-nc-2',
    'Start by looking at the relationship between several metrics.',
  ),
  paragraph(
    'p-nc-3',
    'For example:',
  ),
  heading('h-nc-1', 'Views rising, followers flat', 3),
  paragraph(
    'p-nc-4',
    'Your content may be getting discovered, but viewers may not yet have a strong reason to follow.',
  ),
  heading('h-nc-2', 'Views and followers both rising', 3),
  paragraph(
    'p-nc-5',
    'More people are seeing the content and some are choosing to stay connected to the profile.',
  ),
  heading('h-nc-3', 'Views high, likes relatively low', 3),
  paragraph(
    'p-nc-6',
    'People are seeing the video, but its visible interaction pattern differs from posts that receive stronger reactions.',
  ),
  heading('h-nc-4', 'Followers rising, individual video performance changing', 3),
  paragraph(
    'p-nc-7',
    'Your account audience may be growing even though individual posts continue to perform differently.',
  ),
  paragraph(
    'p-nc-8',
    'TikTok provides analytics specifically so creators can examine content and audience performance in more detail. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_TOOLS, label: 'TikTok Support', external: true }],
  ),
  {
    id: 'cta-tiktok-metrics',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare TikTok Growth Options',
    text: 'Followers, likes and views measure different parts of a TikTok presence. Compare the available NovaLikes options for the metric you want to focus on.',
    serviceSlugs: [
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
    ],
  },

  heading('h-compare', 'Why Comparing TikTok Metrics Together Matters', 2),
  paragraph(
    'p-cmp-1',
    'Imagine two videos.',
  ),
  heading('h-video-a', 'Video A', 3),
  bullets('ul-video-a', ['100,000 views', '2,000 likes']),
  heading('h-video-b', 'Video B', 3),
  bullets('ul-video-b', ['30,000 views', '3,500 likes']),
  paragraph(
    'p-cmp-2',
    'Which one performed better?',
  ),
  paragraph(
    'p-cmp-3',
    "There isn't enough information to answer that objectively.",
  ),
  paragraph(
    'p-cmp-4',
    'Video A received more viewing activity.',
  ),
  paragraph(
    'p-cmp-5',
    'Video B received more likes despite having fewer views.',
  ),
  paragraph(
    'p-cmp-6',
    "Depending on the creator's goal, either result could be more useful.",
  ),
  paragraph(
    'p-cmp-7',
    'Now add follower growth, comments, shares, watch behaviour or conversions and the picture changes again.',
  ),
  paragraph(
    'p-cmp-8',
    'That is why isolated screenshots of one TikTok number rarely explain overall performance.',
  ),
  figure(
    'fig-read-metrics-together',
    '/assets/images/learn/tiktok-followers-vs-likes-vs-views/read-metrics-together.png',
    'Infographic showing TikTok views, likes and followers should be read together rather than as one isolated number',
    'Performance should be interpreted together, not from one isolated number.',
  ),

  heading(
    'h-no-guarantee',
    'Do More Followers Automatically Create More Likes and Views?',
    2,
  ),
  paragraph(
    'p-ng-1',
    'No guaranteed relationship should be assumed.',
  ),
  paragraph(
    'p-ng-2',
    'Followers, likes and views are connected to the same ecosystem, but increasing one metric does not guarantee proportional increases in the others.',
  ),
  paragraph(
    'p-ng-3',
    'A larger follower number does not guarantee that each follower will watch every post.',
  ),
  paragraph(
    'p-ng-4',
    'More video views do not guarantee more followers.',
  ),
  paragraph(
    'p-ng-5',
    'More likes do not guarantee more sales, enquiries or website visits.',
  ),
  paragraph(
    'p-ng-6',
    'This is particularly important when comparing social media growth services.',
  ),
  paragraph(
    'p-ng-7',
    'A follower service should be evaluated as a follower-count service. A view service concerns views. A like service concerns likes.',
  ),
  paragraph(
    'p-ng-8',
    'They should not be presented as guaranteed shortcuts to unrelated business outcomes.',
  ),

  heading('h-evaluate', 'How to Evaluate Your TikTok Performance Better', 2),
  paragraph(
    'p-ev-1',
    'Instead of checking your follower count every few minutes, build a simple review habit.',
  ),
  heading('h-ev-1', '1. Look at recent posts together', 3),
  paragraph(
    'p-ev-2',
    'Avoid making conclusions from one unusually strong or weak video.',
  ),
  heading('h-ev-2', '2. Compare views between posts', 3),
  paragraph(
    'p-ev-3',
    'Identify which topics and formats attract more viewing activity.',
  ),
  heading('h-ev-3', '3. Compare engagement', 3),
  paragraph(
    'p-ev-4',
    'Look at likes, comments and other interactions alongside views.',
  ),
  heading('h-ev-4', '4. Track follower changes', 3),
  paragraph(
    'p-ev-5',
    'Check whether account-level audience growth is moving over time.',
  ),
  heading('h-ev-5', "5. Use TikTok's analytics", 3),
  paragraph(
    'p-ev-6',
    'TikTok encourages creators to review analytics and top-performing posts when working on audience growth. (TikTok Support)',
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  heading('h-ev-6', '6. Look for patterns, not isolated numbers', 3),
  paragraph(
    'p-ev-7',
    'One number can be interesting.',
  ),
  paragraph(
    'p-ev-8',
    'A pattern across ten or twenty posts is usually more informative.',
  ),

  heading(
    'h-purposes',
    'TikTok Followers, Likes and Views Serve Different Purposes',
    2,
  ),
  paragraph(
    'p-pur-1',
    'The biggest mistake is treating all three metrics as if they represent the same thing.',
  ),
  paragraph(
    'p-pur-2',
    "They don't.",
  ),
  paragraph(
    'p-pur-3',
    'TikTok followers tell you about the audience connected to your account.',
    [{ href: '/buy-tiktok-followers', label: 'TikTok followers' }],
  ),
  paragraph(
    'p-pur-4',
    'TikTok likes show one form of interaction with individual content.',
    [{ href: '/buy-tiktok-likes', label: 'TikTok likes' }],
  ),
  paragraph(
    'p-pur-5',
    'TikTok views show viewing activity around individual posts.',
    [{ href: '/buy-tiktok-views', label: 'TikTok views' }],
  ),
  paragraph(
    'p-pur-6',
    'A healthy analysis therefore looks at all three in context.',
  ),
  paragraph(
    'p-pur-7',
    'If your goal is audience building, watch follower growth.',
  ),
  paragraph(
    'p-pur-8',
    'If your goal is understanding visibility, examine views.',
  ),
  paragraph(
    'p-pur-9',
    'If you want to understand how viewers react to posts, include likes and other engagement signals in your analysis.',
  ),
  paragraph(
    'p-pur-10',
    'The numbers become far more useful once you stop expecting one metric to explain everything.',
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
    'Open almost any TikTok profile and three numbers immediately stand out: followers, likes and video views. They can all make an account look active, but they do not measure the same thing.',
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
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'TikTok Followers vs Likes vs Views: Key Differences',
    description:
      'Learn the difference between TikTok followers, likes and views, what each metric measures, and how to evaluate your TikTok performance.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: '/assets/images/learn/tiktok-followers-vs-likes-vs-views/featured.png',
    keywords: [
      'TikTok followers vs likes vs views',
      'TikTok followers meaning',
      'TikTok likes meaning',
      'TikTok views meaning',
      'TikTok metrics',
      'likes vs views TikTok',
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
    'Followers = audience',
    'Views = visibility',
    'Likes = interaction',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Are TikTok followers and likes the same thing?',
      answer:
        'No. A follower follows an account, while a like is an interaction with an individual TikTok post.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Are TikTok views the same as followers?',
      answer:
        'No. Views relate to viewing activity on content. Followers are users who have chosen to follow the account.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can a TikTok video get more views than the account has followers?',
      answer:
        "Yes. TikTok content can be viewed by people beyond an account's existing followers, so individual posts can receive substantially more views than the profile's follower count.",
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Why do I get TikTok views but no new followers?',
      answer:
        'Watching a video does not require someone to follow its creator. Viewers may enjoy or discover an individual post without deciding to follow the account.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does having more TikTok followers guarantee more views?',
      answer:
        'No. Follower count and individual post performance are separate metrics, and TikTok itself provides separate analytics for follower and content performance.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Which is better: TikTok followers, likes or views?',
      answer:
        'None is universally “better.” Followers are useful for assessing account audience, views for content visibility and likes for one form of viewer interaction.',
      schemaEligible: true,
    },
  ],
};
