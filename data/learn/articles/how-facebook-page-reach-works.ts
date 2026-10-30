/**
 * Article #9 — How Facebook Page Reach Works in 2026
 * Scheduled: Friday 11 September 2026.
 * Informational intent. Keeps Reach, Impressions and Page Views as separate Meta metrics.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-facebook-page-reach-works';
const SCHEDULED_AT = '2026-09-11T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const FB_VIEWS_REACH_IMPRESSIONS =
  'https://www.facebook.com/help/274400362581037';
const FB_FEEDS_TAB =
  'https://www.facebook.com/help/218728138156311';
const FB_ORGANIC_PAID_POST_REACH =
  'https://www.facebook.com/help/285625061456389';
const FB_RECOMMENDATIONS =
  'https://www.facebook.com/help/1257205004624246';
const FB_BUSINESS_SUITE_INSIGHTS =
  'https://www.facebook.com/business/help/700570830721044';
const FB_FEED_ORDER =
  'https://www.facebook.com/help/fblite/520348825116417';
const FB_FEED_POST_TYPES =
  'https://www.facebook.com/help/166738576721085';
const FB_PAGE_INSIGHTS_BUSINESS =
  'https://www.facebook.com/business/help/144825579583746';
const FB_SEE_PAGE_INSIGHTS =
  'https://www.facebook.com/help/268680253165747';
const FB_WHY_ADVERTISE =
  'https://www.facebook.com/business/help/205029060038706';
const FB_HASHTAGS =
  'https://www.facebook.com/help/587836257914341';

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
    "Facebook Page reach is Meta's estimate of how many people saw content from your Page, not a count of how many followers your Page has. A Page can have thousands of followers without every post reaching thousands of people, because Facebook's Feed is ranked and personalized rather than a simple chronological stream of every post from every Page someone follows. (Facebook Help Center)",
    [{ href: FB_FEEDS_TAB, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-open-7',
    "Meta has long defined reach as the estimated number of people who saw content from your Page or about your Page, and impressions as the number of times that content entered someone's screen. In its newer insights, Meta reports these as Viewers and Views. (Facebook Help Center)",
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-open-8',
    'Followers measure Page audience connections, reach measures the people who encountered content, and impressions measure how many times content appeared on screens. Followers do not guarantee reach, and reach does not guarantee engagement.',
  ),
  heading('h-renamed', 'Reach and Impressions Are Now Viewers and Views', 2),
  paragraph(
    'p-rn-1',
    "Meta has been renaming these metrics. Views (how many times your content was on screen) replaced impressions as Meta's main content metric, and Meta retired the old impressions metric from its Page insights API on 15 November 2025.",
    [{ href: 'https://developers.facebook.com/blog/post/2025/08/15/page-insights-api-updates/', label: 'Page insights API', external: true }],
  ),
  paragraph(
    'p-rn-2',
    "In 2026 Meta started replacing reach with Viewers, which counts the accounts that saw your content at least once. Meta's developer blog says the older reach metric is being retired in June 2026.",
    [{ href: 'https://developers.facebook.com/blog/post/2026/02/18/introducing-graph-api-v25-and-marketing-api-v25', label: "Meta's developer blog", external: true }],
  ),
  paragraph(
    'p-rn-3',
    'Viewers is the people-based number that used to be called reach, and Views is the closest match to impressions. Depending on the tool and date range, your Insights may show either set of names, and new Viewers totals may not match older reach numbers exactly.',
  ),

  heading('h-vs-imp', 'What Is the Difference Between Facebook Reach and Impressions?', 2),
  paragraph(
    'p-wr-1',
    "Reach is a people-based visibility metric: the estimated number of people who saw content from your Page or about your Page. Impressions count the number of times that content entered someone's screen. Because people can see the same post more than once, Facebook tracks the two separately. (Facebook Help Center)",
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-vi-8',
    'For example, if a post shows reach of 1,000 and impressions of 1,600, a simplified reading is that about 1,000 people were reached and some saw the post more than once. That is an illustration, not an official Facebook formula.',
  ),
  figure(
    'fig-reach-imp',
    `${IMAGE_DIR}/reach-vs-impressions.png`,
    'Simplified example with three people seeing a Facebook post a total of five times, showing reach as three people and impressions as five screen appearances',
    'Simplified example for explaining the metric difference. These numbers are not actual Facebook analytics.',
  ),

  heading('h-post-reach', 'What Is Facebook Post Reach?', 2),
  paragraph(
    'p-pr-1',
    'Facebook defines Post Reach as the estimated number of people who saw any of your posts at least once. (Facebook Help Center)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-pr-2',
    'Post Reach is useful for comparing individual posts, but the post that reached the most people is not automatically the best one. What the post was meant to achieve still matters.',
  ),

  heading('h-organic', 'What Is the Difference Between Organic and Paid Reach?', 2),
  paragraph(
    'p-org-1',
    'Organic reach refers to people who had an unpaid post from your Page enter their screen. Paid reach refers to people who had a paid post from your Page enter their screen, through advertising or promotion. Meta keeps separate definitions for organic, paid and post reach. (Facebook Help Center)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook Help Center', external: true }],
  ),
  {
    id: 'table-reach-types',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'What It Helps Describe'],
    rows: [
      ['Organic Reach', 'Unpaid distribution'],
      ['Paid Reach', 'Distribution involving paid promotion'],
      ['Post Reach', 'People who saw posts'],
    ],
  },
  paragraph(
    'p-th-3',
    "One person can sometimes fall into more than one reporting category depending on how they encountered content, so these metrics should not simply be added together. Organic reach is also not the same as followers reached, since it can include people shown recommended content. Meta's reach metrics are estimates rather than exact counts of identified individual people. (Facebook Help Center)",
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-pd-6',
    'Meta Business Suite exists partly to help businesses understand both paid and organic activity across their Meta presence. (Meta Business Help Center)',
    [{ href: FB_BUSINESS_SUITE_INSIGHTS, label: 'Meta Business Help Center', external: true }],
  ),

  heading(
    'h-not-all',
    "Why Don't All Facebook Followers See Every Post?",
    2,
  ),
  paragraph(
    'p-na-2',
    'Because the Facebook Feed is ranked. Meta says the default Feed uses ranking to show people posts considered relevant to them rather than displaying everything chronologically. Users can open a Feeds view for more recent content, but the normal Feed returns to ranked ordering. (Facebook Help Center)',
    [{ href: FB_FEEDS_TAB, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-na-5',
    "Following a Page makes someone part of the Page's connected audience. It does not mean every Page post will automatically appear to that person, which is why follower count and reach can differ so much. A Page with 20,000 followers and a post that reached 4,000 people does not necessarily have a technical problem.",
  ),
  figure(
    'fig-followers-reach',
    `${IMAGE_DIR}/followers-not-automatic-reach.png`,
    'Diagram showing a Facebook Page audience passing through Feed ranking, with some posts shown to relevant viewers and recommendations reaching people who do not already follow the Page',
    'Followers are an audience connection. Reach describes actual content visibility.',
  ),

  heading(
    'h-ranking',
    'What Influences Facebook Feed Ranking?',
    2,
  ),
  paragraph(
    'p-rk-1',
    "Meta says posts higher in Feed can be influenced by people's activity and engagement with Facebook content. Its Help documentation gives examples such as the content someone watches, comments, likes, reactions and the type of post. (Facebook Help Center)",
    [{ href: FB_FEED_POST_TYPES, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-rk-4',
    'Facebook also describes Feed ranking as personalized around the people, Pages, businesses and communities a person connects with, so two people who follow the same Page do not necessarily see the same Feed order. (Facebook Help Center)',
    [{ href: FB_FEED_ORDER, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-rk-8',
    'Be wary of claims such as "10 comments equal 1,000 extra reach" or "every post reaches a fixed percentage of followers". Meta does not provide universal equations like these in its public ranking documentation, so your own Page Insights are a better guide than invented benchmarks.',
  ),

  heading(
    'h-higher',
    'Can Facebook Page Reach Be Higher Than Your Follower Count?',
    2,
  ),
  paragraph(
    'p-hi-2',
    'Yes. Facebook has recommendation experiences that surface content and Pages people do not already follow, including Suggested For You posts and Pages You May Like. (Facebook Help Center)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-nf-10',
    "For example, a Page with 5,000 followers can publish a post that reaches 20,000 people. Those numbers do not contradict each other; the post simply reached people outside the Page's existing follower audience. The reverse also holds: a Page with 100,000 followers can have a post with modest reach, so follower count should not be treated as a reach multiplier.",
  ),

  heading(
    'h-why-change',
    'Why Does Facebook Reach Change From Post to Post?',
    2,
  ),
  paragraph(
    'p-ch-1',
    "Different posts receive different reach because Feed and recommendations are personalized and content performance is not uniform. Meta says Feed ordering can reflect people's prior activity, engagement and the type of content involved. (Facebook Help Center)",
    [{ href: FB_FEED_POST_TYPES, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-ch-2',
    'Rather than putting it down to "the algorithm liked this one", look for patterns. Useful questions include:',
  ),
  bullets('ul-ch', [
    'Was the topic or format different?',
    'Was the post aimed at the same audience?',
    'Did people react differently?',
    'Was some distribution paid?',
    'Did the post get discovered beyond current followers?',
  ]),

  heading(
    'h-engagement',
    'Does Engagement Increase Facebook Reach?',
    2,
  ),
  paragraph(
    'p-eg-1',
    'Engagement and Feed distribution can be related, because Meta says signals such as likes, reactions and comments can contribute to what appears higher in Feed. But Facebook does not publish an equation in which each interaction creates a fixed amount of extra reach. (Facebook Help Center)',
    [{ href: FB_FEED_POST_TYPES, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-hr-1',
    'Seeing content and reacting to it are separate actions. Someone can read or watch a post and keep scrolling, which adds to reach without creating a Like, so high reach with modest Likes is not a contradiction. Facebook itself separates Page reach from engagement and performance metrics in Insights. (Meta Business Help Center)',
    [{ href: FB_PAGE_INSIGHTS_BUSINESS, label: 'Meta Business Help Center', external: true }],
  ),
  paragraph(
    'p-lr-2',
    'The reverse also happens: a post can reach a smaller group that finds it relevant and leaves many comments. Which is better depends on whether the goal was broad visibility or discussion within an existing community, so read reach and engagement together.',
  ),
  figure(
    'fig-together',
    `${IMAGE_DIR}/read-metrics-together.png`,
    'A Facebook post connected to four separate questions: reach, impressions, interactions and Page followers',
    'Different metrics answer different questions.',
  ),

  heading(
    'h-page-views',
    'What Is the Difference Between Page Reach and Page Views?',
    2,
  ),
  paragraph(
    'p-pv-2',
    "Meta has described Page views as the number of times the Page's profile itself was viewed, while reach relates to people encountering content from or about the Page. Depending on the tool, Page views may be labelled differently or no longer shown. Someone who sees a Page post in Feed without opening the Page adds to reach but not to Page views. (Facebook Help Center)",
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-um-1',
    'Facebook Followers, Page Likes and Post Likes are also separate from Facebook Page reach. Facebook Followers vs Page Likes vs Post Likes explains those Page and post metrics in more detail.',
    [
      {
        href: '/learn/facebook-followers-vs-page-likes-vs-post-likes',
        label: 'Facebook Followers vs Page Likes vs Post Likes',
      },
    ],
  ),

  heading(
    'h-where',
    'Where Can You Check Facebook Page Reach?',
    2,
  ),
  paragraph(
    'p-wh-1',
    'Page owners can use Page Insights and Meta Business Suite. Meta says Page Insights can help you understand how people engage with the Page, view performance metrics, identify posts with stronger engagement and see when your audience is using Facebook. Page Insights data can currently be accessed for up to the previous two years. (Facebook Help Center)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-wh-4',
    "Meta Business Suite also provides insights covering organic and paid activity. These tools should be your main source for judging your own Page, because third-party \"average reach\" articles cannot know your Page better than your own analytics. (Meta Business Help Center)",
    [{ href: FB_BUSINESS_SUITE_INSIGHTS, label: 'Meta Business Help Center', external: true }],
  ),

  heading(
    'h-evaluate',
    'How Do You Evaluate Facebook Page Reach?',
    2,
  ),
  paragraph(
    'p-ev-1',
    'A simple review in Page Insights works through the metrics in order and compares like with like:',
  ),
  bullets('ul-ev', [
    "Check followers to understand the size of the Page's connected audience.",
    'Check reach (Viewers) to see how many people encountered the content, and impressions (Views) to see how often it appeared on screens.',
    'Separate organic and paid distribution. A boosted post and an unboosted one cannot be read the same way, and Meta tracks the two separately.',
    'Look at engagement: did the people reached react, comment, click, share or keep scrolling?',
    'Compare similar posts, not a short announcement against a long educational video or a promotional offer.',
    'Compare similar periods, such as the last 28 days against the previous 28 days, rather than one viral day against an ordinary month.',
  ]),
  paragraph(
    'p-ev-12',
    'One unusually strong or weak post does not define the entire Page, and patterns across several posts are more informative than one screenshot. Availability and reporting windows vary by metric. (Facebook Help Center)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook Help Center', external: true }],
  ),

  heading(
    'h-increase',
    'Can You Increase Facebook Organic Reach?',
    2,
  ),
  paragraph(
    'p-inc-2',
    "There is no guaranteed formula. Facebook's own business guidance acknowledges that organic reach has limits, recommends regular Page publishing as one way to reach customers, and presents advertising as an option for businesses that want more reach. (Meta Business Help Center)",
    [{ href: FB_WHY_ADVERTISE, label: 'Meta Business Help Center', external: true }],
  ),
  paragraph(
    'p-inc-3',
    'Focus on what you can control: the relevance and quality of the subject, clarity, audience fit, format and consistency. Posting more often gives Facebook more content to distribute, but five weak posts do not guarantee that one will perform.',
  ),
  paragraph(
    'p-tm-2',
    'Posting time can matter because your audience is active at certain hours, and Meta says Page Insights can show when your audience is on Facebook. That is a better guide than a generic "best time to post", since Pages differ by country, industry and audience habits. (Facebook Help Center)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-hs-1',
    'Hashtags turn topics and phrases into clickable links that can help people find posts about subjects they are interested in. Facebook does not publish a hashtag-to-reach formula, so use a hashtag when it describes the subject rather than filling a caption with unrelated tags. (Facebook Help Center)',
    [{ href: FB_HASHTAGS, label: 'Facebook Help Center', external: true }],
  ),

  heading(
    'h-drop',
    'Why Did My Facebook Organic Reach Drop?',
    2,
  ),
  paragraph(
    'p-dr-1',
    'Meta says multiple factors can affect reach, and personalized ranking means different posts naturally receive different distribution. Before assuming one cause, check your recent content, audience response, organic versus paid distribution, format changes, publishing patterns and Page Insights. One decline does not prove a penalty, a "shadowban" or an account problem. (Facebook Help Center)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook Help Center', external: true }],
  ),

  heading(
    'h-buy-followers',
    'Does Buying Facebook Followers or Likes Increase Page Reach?',
    2,
  ),
  paragraph(
    'p-bf-1',
    "No. Meta's rules ban inauthentic engagement, and Meta may remove it. Bought followers, Page Likes or Post Likes don't make Facebook show your posts to more people.",
    [{ href: 'https://transparency.meta.com/policies/community-standards/inauthentic-behavior/', label: "Meta's rules", external: true }],
  ),
  paragraph(
    'p-bf-4',
    "Followers and Page Likes are Page-level metrics, while reach is a visibility metric. Facebook's own systems decide what people see through personalized ranking and recommendations, and Meta publishes no rule saying more followers or Likes produce a matching rise in reach. (Facebook Help Center)",
    [{ href: FB_FEED_ORDER, label: 'Facebook Help Center', external: true }],
  ),

  heading(
    'h-not-results',
    'Does High Facebook Page Reach Mean Good Results?',
    2,
  ),
  paragraph(
    'p-nr-1',
    'Not on its own. Reach tells you whether content is being seen, but it cannot tell you whether people liked it, followed the Page, contacted the business or bought something. A business can have high reach and few leads, or modest reach and several valuable enquiries, so those outcomes need their own measurements.',
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
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const HOW_FACEBOOK_PAGE_REACH_WORKS_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-facebook-page-reach-works',
  slug: SLUG,
  title: 'How Facebook Page Reach Works in 2026',
  excerpt:
    'A Facebook Page can have thousands of followers without every post reaching thousands of people.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'facebook',
  tags: ['analytics', 'algorithm', 'followers', 'likes', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Editorial illustration of a Facebook Page post spreading toward both followers and non-followers, with reach and impressions as separate concepts',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How Facebook Page Reach Works in 2026',
    description:
      'Learn what Facebook Page reach means, how organic and paid reach differ, why reach changes, and how to evaluate Page performance in 2026.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'Facebook Page reach',
      'Facebook organic reach',
      'Facebook post reach',
      'Facebook reach vs impressions',
      'how Facebook reach works',
      'increase Facebook Page reach',
    ],
  },
  relatedServices: [
    'buy-facebook-followers',
    'buy-facebook-page-likes',
    'buy-facebook-post-likes',
  ],
  relatedArticles: [
    'facebook-followers-vs-page-likes-vs-post-likes',
    'how-to-get-more-facebook-page-followers',
    'how-to-get-more-likes-on-facebook-post',
    'why-facebook-page-followers-drop',
    'how-to-download-facebook-video',
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
    'Followers: people connected to your Page.',
    'Reach (now Viewers): estimated number of people who saw Page-related content.',
    "Impressions (now Views): number of times Page-related content entered people's screens.",
    'Engagement: actions people take around the content.',
    "A Page's follower number is not a delivery guarantee for each post.",
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What does reach mean on Facebook?',
      answer:
        "Reach is Meta's estimated number of people who saw any content from your Page or about your Page. Meta's newer insights call this Viewers.",
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'What is the difference between Facebook reach and impressions?',
      answer:
        "Reach focuses on people who saw Page-related content, while impressions measure how many times that content entered people's screens. In Meta's newer insights these are called Viewers and Views.",
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'What is organic Facebook reach?',
      answer:
        'Organic reach is the number of people who had an unpaid post from your Page enter their screen.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can Facebook reach be higher than follower count?',
      answer:
        "Yes. Facebook can recommend posts and Pages to people who do not already follow them, so content visibility can extend beyond a Page's existing follower audience.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: "Why don't all my Facebook followers see my posts?",
      answer:
        "Facebook's default Feed uses personalized ranking rather than automatically displaying every Page post to every follower.",
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Where can I see Facebook Page reach?',
      answer:
        'Page owners can use Facebook Page Insights and Meta Business Suite to evaluate Page performance and content metrics.',
      schemaEligible: true,
    },
  ],
};
