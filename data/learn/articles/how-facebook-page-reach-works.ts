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
    'A Facebook Page can have thousands of followers without every post reaching thousands of people.',
  ),
  paragraph(
    'p-open-2',
    'That often leads Page owners to ask:',
  ),
  paragraph(
    'p-open-3',
    "Why didn't all my followers see the post?",
  ),
  paragraph('p-open-4', 'or:'),
  paragraph(
    'p-open-5',
    'Why did one post reach 10,000 people while another reached 800?',
  ),
  paragraph(
    'p-open-6',
    'The answer begins with understanding what reach actually measures.',
  ),
  paragraph(
    'p-open-7',
    'Meta defines Facebook Page reach as the estimated number of people who saw content from your Page or about your Page. It defines impressions separately as the number of times that content entered someone\'s screen. (Facebook)',
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-8',
    'That distinction matters because:',
  ),
  bullets('ul-open-metrics', [
    'Followers measure Page audience connections.',
    'Reach measures people who encountered content.',
    'Impressions measure how many times content appeared on screens.',
  ]),
  paragraph(
    'p-open-9',
    'Those numbers should not be expected to match.',
  ),
  paragraph(
    'p-open-10',
    "Facebook's Feed is also ranked and personalized rather than being a simple chronological stream of every post from every Page someone follows. (Facebook)",
    [{ href: FB_FEEDS_TAB, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-11',
    'So a better way to understand Facebook Page performance is:',
  ),
  paragraph('p-open-12', 'Followers ≠ guaranteed reach'),
  paragraph('p-open-13', 'and:'),
  paragraph('p-open-14', 'Reach ≠ guaranteed engagement'),
  paragraph(
    'p-open-15',
    'Each metric answers a different question.',
  ),

  heading('h-what-reach', 'What Is Facebook Reach?', 2),
  paragraph(
    'p-wr-1',
    'Facebook Page reach measures the estimated number of people who saw content from your Page or about your Page. (Facebook)',
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wr-2',
    'That makes reach a people-based visibility metric.',
  ),
  paragraph('p-wr-3', 'Suppose a post has:'),
  paragraph('p-wr-4', '5,000 reach'),
  paragraph(
    'p-wr-5',
    'That does not necessarily mean the Page has:',
  ),
  paragraph('p-wr-6', '5,000 followers.'),
  paragraph(
    'p-wr-7',
    'Nor does it necessarily mean the post appeared only 5,000 times.',
  ),
  paragraph(
    'p-wr-8',
    'Some people may encounter the same content more than once, which is why Facebook tracks impressions separately. (Facebook)',
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  heading('h-think-reach', 'Think of Reach as:', 3),
  paragraph(
    'p-wr-9',
    'How many people did this content get in front of?',
  ),
  paragraph('p-wr-10', 'Rather than:'),
  paragraph('p-wr-11', 'How many times did it appear?'),
  paragraph(
    'p-wr-12',
    'That second question belongs more closely to impressions.',
  ),

  heading('h-vs-imp', 'Facebook Reach vs Impressions', 2),
  paragraph(
    'p-vi-1',
    'These terms are easy to confuse.',
  ),
  paragraph('p-vi-2', 'Meta defines them differently.'),
  heading('h-vs-reach', 'Reach', 3),
  paragraph(
    'p-vi-3',
    'Estimated number of people who saw content from your Page or about your Page. (Facebook)',
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  heading('h-vs-impressions', 'Impressions', 3),
  paragraph(
    'p-vi-4',
    "Number of times content from your Page or about your Page entered someone's screen. (Facebook)",
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  paragraph('p-vi-5', 'Imagine:'),
  paragraph('p-vi-6', 'Reach: 1,000'),
  paragraph('p-vi-7', 'Impressions: 1,600'),
  paragraph(
    'p-vi-8',
    'A simplified interpretation is that approximately 1,000 people were reached while the content generated more total screen appearances because some people could encounter it more than once.',
  ),
  paragraph(
    'p-vi-9',
    'Do not interpret that example as an official Facebook calculation formula.',
  ),
  paragraph(
    'p-vi-10',
    'It simply illustrates why reach and impressions can differ.',
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
    'Facebook defines Post Reach as the estimated number of people who saw any of your posts at least once. (Facebook)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pr-2',
    'This is particularly useful when comparing individual content performance.',
  ),
  paragraph('p-pr-3', 'For example, you might have:'),
  bullets('ul-pr', [
    'Post A → higher reach',
    'Post B → lower reach',
    'Post C → higher engagement from fewer people',
  ]),
  paragraph(
    'p-pr-4',
    'That does not automatically mean Post A was the “best.”',
  ),
  paragraph(
    'p-pr-5',
    'It means Post A reached more people according to that metric.',
  ),
  paragraph(
    'p-pr-6',
    'The objective of the content still matters.',
  ),

  heading('h-organic', 'What Is Organic Facebook Reach?', 2),
  paragraph(
    'p-org-1',
    'Organic reach refers to people who had an unpaid post from your Page enter their screen. Meta distinguishes organic reach from reach generated through paid distribution. (Facebook)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-org-2',
    "This includes visibility earned through Facebook's unpaid distribution systems rather than advertising spend.",
  ),
  paragraph(
    'p-org-3',
    'Organic reach can come from people who:',
  ),
  bullets('ul-org', [
    'already follow the Page,',
    'encounter recommended content,',
    'see content through other Facebook discovery mechanisms,',
    'or encounter activity related to your Page.',
  ]),
  paragraph(
    'p-org-4',
    'Facebook also recommends content and Pages people do not already follow, including “Suggested For You” posts and Pages You May Like. (Facebook)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-org-5',
    'So organic reach should not automatically be interpreted as:',
  ),
  paragraph('p-org-6', 'followers reached.'),
  paragraph(
    'p-org-7',
    'It can extend beyond the existing follower audience.',
  ),

  heading('h-paid', 'What Is Paid Reach?', 2),
  paragraph(
    'p-pd-1',
    'Paid reach represents people who had a paid post from your Page enter their screen. (Facebook)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pd-2',
    'That can occur through Facebook advertising or promotion.',
  ),
  paragraph(
    'p-pd-3',
    'Paid reach and organic reach therefore have different distribution mechanisms.',
  ),
  paragraph(
    'p-pd-4',
    'A Page owner might see:',
  ),
  bullets('ul-pd', [
    'organic visibility from normal Page publishing,',
    'plus paid visibility from advertising.',
  ]),
  paragraph(
    'p-pd-5',
    'Do not combine the two mentally and assume every person came from the same source.',
  ),
  paragraph(
    'p-pd-6',
    'Meta Business Suite exists partly to help businesses understand both paid and organic activity across their Meta presence. (Facebook)',
    [{ href: FB_BUSINESS_SUITE_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-three-reach',
    'Organic Reach vs Paid Reach vs Post Reach',
    2,
  ),
  paragraph(
    'p-th-1',
    'The easiest distinction is:',
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
    'p-th-2',
    'Meta explicitly maintains separate definitions for organic, paid and post reach. (Facebook)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-th-3',
    "One person can sometimes fall into more than one reporting category depending on how they encountered content, so these metrics should not simply be added together without understanding the reporting context. Meta's reach metrics are also estimated rather than exact counts of identified individual humans. (Facebook)",
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-not-all',
    "Why Don't All Facebook Followers See Every Post?",
    2,
  ),
  paragraph('p-na-1', 'Because Facebook Feed is ranked.'),
  paragraph(
    'p-na-2',
    'Meta says the default Feed uses ranking to show people posts considered relevant to them rather than simply displaying everything chronologically. Users can access a Feeds view for more recent content, but the normal Feed returns to ranked ordering. (Facebook)',
    [{ href: FB_FEEDS_TAB, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-na-3',
    'Facebook describes Feed ranking as personalized around content from people, Pages, businesses and communities a person connects with. (Facebook)',
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),
  paragraph('p-na-4', 'So:'),
  paragraph(
    'p-na-5',
    "Following a Page makes someone part of the Page's connected audience.",
  ),
  paragraph('p-na-6', 'It does not mean:'),
  paragraph(
    'p-na-7',
    'Every Page post will automatically appear to that person.',
  ),
  paragraph(
    'p-na-8',
    'That distinction explains why follower count and reach can differ dramatically.',
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
    "Meta says posts higher in Feed can be influenced by people's activity and engagement with Facebook content.",
  ),
  paragraph(
    'p-rk-2',
    'Its current Help documentation gives examples such as:',
  ),
  bullets('ul-rk', [
    'the content someone watches,',
    'comments,',
    'likes,',
    'reactions,',
    'and the type of post,',
  ]),
  paragraph(
    'p-rk-3',
    'among the information that can influence what appears higher in Feed. (Facebook)',
    [{ href: FB_FEED_POST_TYPES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rk-4',
    'Facebook also describes Feed ranking as personalized. (Facebook)',
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),
  paragraph('p-rk-5', 'The important word is:'),
  paragraph('p-rk-6', 'personalized.'),
  paragraph(
    'p-rk-7',
    'Two people following the same Page do not necessarily receive identical Feed ordering.',
  ),
  heading('h-no-formula', 'Do Not Turn This Into a Fake Formula', 3),
  paragraph('p-rk-8', 'Avoid claims such as:'),
  bullets('ul-rk-avoid', [
    '10 comments = 1,000 extra reach',
    'shares are worth exactly 5× likes',
    'posting in the first ten minutes determines total reach',
    'every post reaches a fixed percentage of followers',
  ]),
  paragraph(
    'p-rk-9',
    'Meta does not provide universal equations like these in its public ranking documentation.',
  ),
  paragraph(
    'p-rk-10',
    "Use Facebook's real Page Insights instead of invented benchmarks.",
  ),

  heading(
    'h-non-followers',
    'Can Facebook Show Page Posts to Non-Followers?',
    2,
  ),
  paragraph('p-nf-1', 'Yes.'),
  paragraph(
    'p-nf-2',
    'Facebook has recommendation experiences that can surface content, accounts and entities people do not already follow.',
  ),
  paragraph(
    'p-nf-3',
    'Meta specifically lists examples including:',
  ),
  bullets('ul-nf', [
    'Suggested For You posts',
    'and Pages You May Like.',
  ]),
  paragraph(
    'p-nf-4',
    '(Facebook)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  paragraph('p-nf-5', 'That means:'),
  paragraph('p-nf-6', 'Reach can exceed follower count.'),
  paragraph('p-nf-7', 'Imagine:'),
  paragraph('p-nf-8', 'Page followers: 5,000'),
  paragraph('p-nf-9', 'Post reach: 20,000'),
  paragraph(
    'p-nf-10',
    'Those numbers do not inherently contradict each other.',
  ),
  paragraph(
    'p-nf-11',
    "The post may have reached people outside the Page's existing follower audience.",
  ),

  heading(
    'h-no-guarantee',
    'Does a Higher Follower Count Guarantee Higher Reach?',
    2,
  ),
  paragraph('p-ng-1', 'No such guarantee exists.'),
  paragraph(
    'p-ng-2',
    "Follower count describes the Page's connected audience.",
  ),
  paragraph(
    'p-ng-3',
    'Reach measures visibility of content.',
  ),
  paragraph(
    'p-ng-4',
    "Facebook's ranking and recommendation systems can surface or prioritize content based on multiple personalized signals rather than simply distributing every Page post to every follower. (Facebook)",
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),
  paragraph('p-ng-5', 'This means a Page with:'),
  paragraph('p-ng-6', '100,000 followers'),
  paragraph(
    'p-ng-7',
    'can have one post with relatively modest reach.',
  ),
  paragraph(
    'p-ng-8',
    'And a smaller Page can potentially publish content that reaches beyond its existing followers.',
  ),
  paragraph(
    'p-ng-9',
    'Do not treat follower count as a reach multiplier.',
  ),

  heading(
    'h-understand',
    'Understand Facebook Page Metrics',
    2,
  ),
  paragraph(
    'p-um-1',
    'Facebook Followers, Page Likes and Post Likes represent separate visible metrics from Facebook Page reach. Facebook Followers vs Page Likes vs Post Likes explains those Page and post metrics in more detail.',
    [
      {
        href: '/learn/facebook-followers-vs-page-likes-vs-post-likes',
        label: 'Facebook Followers vs Page Likes vs Post Likes',
      },
    ],
  ),
  paragraph(
    'p-um-2',
    'If you want to compare the Page-level options available through NovaLikes, Facebook followers are a Page audience metric.',
    [{ href: '/buy-facebook-followers', label: 'Facebook followers' }],
  ),
  paragraph(
    'p-um-3',
    'Facebook Page Likes are a Page-level connection metric where they still appear.',
    [{ href: '/buy-facebook-page-likes', label: 'Facebook Page Likes' }],
  ),
  paragraph(
    'p-um-4',
    'Facebook Post Likes are reactions on individual posts.',
    [{ href: '/buy-facebook-post-likes', label: 'Facebook Post Likes' }],
  ),
  paragraph('p-um-5', 'Important:'),
  paragraph(
    'p-um-6',
    'Do not represent any of these as guaranteed ways to:',
  ),
  bullets('ul-um-not', [
    'increase organic Page reach,',
    'improve Feed ranking,',
    'get Suggested For You placement,',
    'generate leads,',
    'or reach every follower.',
  ]),
  {
    id: 'cta-facebook-metrics',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Understand Your Facebook Metrics',
    text: 'Followers, Page Likes, Post Likes and reach measure different parts of a Facebook presence. Compare the available Page and post options without treating any one metric as a guarantee of organic reach.',
    serviceSlugs: [
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ],
  },

  heading(
    'h-why-change',
    'Why Does Facebook Reach Change From Post to Post?',
    2,
  ),
  paragraph(
    'p-ch-1',
    'Different posts can receive different reach because Facebook Feed and recommendations are personalized and content performance is not uniform. Meta says Feed ordering can reflect people\'s prior activity, engagement and the type of content involved. (Facebook)',
    [{ href: FB_FEED_POST_TYPES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ch-2',
    'For a Page owner, useful questions include:',
  ),
  bullets('ul-ch', [
    'Was the topic different?',
    'Was the format different?',
    'Was the post aimed at the same audience?',
    'Did people react differently?',
    'Was some distribution paid?',
    'Did the post get discovered beyond current followers?',
    'Was the content useful enough for people to keep interacting with it?',
  ]),
  paragraph(
    'p-ch-3',
    'Do not reduce everything to:',
  ),
  paragraph('p-ch-4', '“The algorithm liked this one.”'),
  paragraph('p-ch-5', 'Try to identify actual patterns.'),

  heading(
    'h-engagement',
    'Does Engagement Increase Facebook Reach?',
    2,
  ),
  paragraph(
    'p-eg-1',
    'Engagement and Feed distribution can be related because Meta says signals such as likes, reactions and comments can contribute to what appears higher in Feed. (Facebook)',
    [{ href: FB_FEED_POST_TYPES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-eg-2',
    'But that does not mean every interaction automatically creates a fixed amount of additional reach.',
  ),
  paragraph(
    'p-eg-3',
    'Facebook does not publish a guaranteed equation.',
  ),
  paragraph('p-eg-4', 'A more accurate approach:'),
  paragraph(
    'p-eg-5',
    'Engagement provides information about audience response.',
  ),
  paragraph(
    'p-eg-6',
    'Reach provides information about visibility.',
  ),
  paragraph('p-eg-7', 'Study them together.'),
  paragraph(
    'p-eg-8',
    'Do not pretend they are interchangeable.',
  ),
  figure(
    'fig-together',
    `${IMAGE_DIR}/read-metrics-together.png`,
    'A Facebook post connected to four separate questions: reach, impressions, interactions and Page followers',
    'Different metrics answer different questions.',
  ),

  heading(
    'h-high-reach',
    'Why Can a Post Have High Reach but Few Likes?',
    2,
  ),
  paragraph(
    'p-hr-1',
    'Because seeing content and reacting to content are separate actions.',
  ),
  paragraph('p-hr-2', 'Someone can:'),
  bullets('ul-hr', [
    'encounter a Facebook post,',
    'read it,',
    'watch it,',
    'and keep scrolling.',
  ]),
  paragraph(
    'p-hr-3',
    'That contributes to visibility without necessarily creating a Like.',
  ),
  paragraph(
    'p-hr-4',
    'Facebook itself separates Page reach from engagement/performance metrics inside Insights. (Facebook)',
    [{ href: FB_PAGE_INSIGHTS_BUSINESS, label: 'Facebook', external: true }],
  ),
  paragraph('p-hr-5', 'Therefore:'),
  paragraph('p-hr-6', 'high reach + modest Likes'),
  paragraph(
    'p-hr-7',
    'is not automatically contradictory.',
  ),
  paragraph(
    'p-hr-8',
    'It may simply mean many people encountered the content but fewer chose that particular interaction.',
  ),

  heading(
    'h-low-reach',
    'Why Can a Post Have Lower Reach but Strong Engagement?',
    2,
  ),
  paragraph(
    'p-lr-1',
    'The reverse can happen too.',
  ),
  paragraph(
    'p-lr-2',
    'A post might reach a smaller group that finds the content especially relevant.',
  ),
  paragraph('p-lr-3', 'For example:'),
  paragraph(
    'p-lr-4',
    'Post A: large reach, relatively little discussion',
  ),
  paragraph(
    'p-lr-5',
    'Post B: smaller reach, many comments from the audience it did reach',
  ),
  paragraph('p-lr-6', 'Which post was better?'),
  paragraph(
    'p-lr-7',
    'You cannot answer without knowing the objective.',
  ),
  paragraph(
    'p-lr-8',
    'If the goal was broad visibility, Post A may be useful.',
  ),
  paragraph(
    'p-lr-9',
    'If the goal was discussion among an existing community, Post B may be useful.',
  ),
  paragraph(
    'p-lr-10',
    'This is why Page owners should not judge every Facebook post using one universal metric.',
  ),

  heading(
    'h-page-views',
    'What Is Facebook Page Reach vs Page Views?',
    2,
  ),
  paragraph('p-pv-1', 'These are also different.'),
  paragraph(
    'p-pv-2',
    "Meta defines Page Views as the number of times the Page's profile itself has been viewed. (Facebook)",
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pv-3',
    'Reach relates to people encountering content from or about the Page. (Facebook)',
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pv-4',
    'Someone could therefore:',
  ),
  paragraph(
    'p-pv-5',
    'see a Facebook Page post in Feed',
  ),
  paragraph('p-pv-6', 'without:'),
  paragraph('p-pv-7', 'opening the Page profile.'),
  paragraph(
    'p-pv-8',
    'That person may contribute to reach without necessarily creating a Page View.',
  ),

  heading(
    'h-where',
    'Where Can You Check Facebook Page Reach?',
    2,
  ),
  paragraph(
    'p-wh-1',
    'Facebook Page owners can use Page Insights and Meta Business Suite.',
  ),
  paragraph(
    'p-wh-2',
    'Meta says Page Insights can help businesses:',
  ),
  bullets('ul-wh', [
    'understand how people engage with the Page,',
    'view Page performance metrics,',
    'identify posts with stronger engagement,',
    'and see when the audience is using Facebook.',
  ]),
  paragraph(
    'p-wh-3',
    '(Facebook)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wh-4',
    'Meta Business Suite also provides insights covering organic and paid activity. (Facebook)',
    [{ href: FB_BUSINESS_SUITE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wh-5',
    'This should be your main source for evaluating your own Facebook Page.',
  ),
  paragraph(
    'p-wh-6',
    'Third-party “average reach” articles cannot know your Page better than your own analytics.',
  ),

  heading(
    'h-evaluate',
    'How to Evaluate Facebook Page Reach Properly',
    2,
  ),
  heading('h-ev-1', '1. Compare Similar Posts', 3),
  paragraph('p-ev-1', 'Do not compare:'),
  bullets('ul-ev-1', [
    'a short announcement,',
    'a long educational video,',
    'a promotional offer,',
    'and a viral community post',
  ]),
  paragraph(
    'p-ev-2',
    'as if they are identical content.',
  ),
  paragraph(
    'p-ev-3',
    'Compare like with like where possible.',
  ),
  heading(
    'h-ev-2',
    '2. Separate Organic and Paid Distribution',
    3,
  ),
  paragraph(
    'p-ev-4',
    'If one post was boosted and another was not, reach cannot be interpreted in exactly the same way.',
  ),
  paragraph(
    'p-ev-5',
    'Meta tracks organic and paid reach separately. (Facebook)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook', external: true }],
  ),
  heading('h-ev-3', '3. Compare Reach and Impressions', 3),
  paragraph(
    'p-ev-6',
    'If impressions are higher than reach, remember those metrics measure different things.',
  ),
  paragraph(
    'p-ev-7',
    'Reach focuses on people reached.',
  ),
  paragraph(
    'p-ev-8',
    'Impressions focus on screen appearances. (Facebook)',
    [{ href: FB_VIEWS_REACH_IMPRESSIONS, label: 'Facebook', external: true }],
  ),
  heading('h-ev-4', '4. Look at Engagement', 3),
  paragraph(
    'p-ev-9',
    'What did the people reached actually do?',
  ),
  paragraph('p-ev-10', 'Did they:'),
  bullets('ul-ev-4', [
    'react,',
    'comment,',
    'click,',
    'share,',
    'or continue scrolling?',
  ]),
  paragraph(
    'p-ev-11',
    'The answer helps put visibility into context.',
  ),
  heading('h-ev-5', '5. Look at Several Posts', 3),
  paragraph(
    'p-ev-12',
    'One unusually strong or weak post does not define the entire Page.',
  ),
  paragraph(
    'p-ev-13',
    'Page Insights exists to help Page owners compare performance across content. (Facebook)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-increase',
    'Can You Increase Facebook Organic Reach?',
    2,
  ),
  paragraph(
    'p-inc-1',
    'There is no guaranteed formula.',
  ),
  paragraph(
    'p-inc-2',
    "Facebook's own business guidance acknowledges that organic reach has limits and recommends regular Page publishing as one way businesses can reach customers while also presenting advertising as an option when businesses want additional reach. (Facebook)",
    [{ href: FB_WHY_ADVERTISE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-inc-3',
    'For organic strategy, focus on things you can actually control:',
  ),
  bullets('ul-inc', [
    'the relevance of the subject,',
    'quality of the content,',
    'clarity,',
    'usefulness,',
    'audience fit,',
    'format,',
    'consistency,',
    'and learning from Page Insights.',
  ]),
  paragraph('p-inc-4', 'Do not promise:'),
  paragraph(
    'p-inc-5',
    'Post at 8 PM and reach will double.',
  ),
  paragraph('p-inc-6', 'or:'),
  paragraph(
    'p-inc-7',
    'Use three hashtags and Facebook will push the post.',
  ),
  paragraph(
    'p-inc-8',
    'Those are not reliable universal rules.',
  ),

  heading(
    'h-more-often',
    'Does Posting More Often Increase Reach?',
    2,
  ),
  paragraph('p-mo-1', 'Not automatically.'),
  paragraph(
    'p-mo-2',
    'Posting gives Facebook more content that can potentially be distributed.',
  ),
  paragraph('p-mo-3', 'But:'),
  paragraph(
    'p-mo-4',
    'more posts ≠ guaranteed more reach per post.',
  ),
  paragraph(
    'p-mo-5',
    'Publishing five weak posts does not create a mathematical guarantee that one will perform.',
  ),
  paragraph(
    'p-mo-6',
    'Instead, use Insights to understand which content is producing useful visibility and audience response. Meta specifically positions Insights as a way to evaluate Page performance and identify stronger posts. (Facebook)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading('h-time', 'Does Posting Time Matter?', 2),
  paragraph(
    'p-tm-1',
    "Your audience's activity can be relevant when deciding when to publish.",
  ),
  paragraph(
    'p-tm-2',
    'Meta says Page Insights can help you see when your audience is on Facebook. (Facebook)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-tm-3',
    'That is a much better basis for scheduling than generic claims such as:',
  ),
  paragraph(
    'p-tm-4',
    '“Tuesday at 7:15 PM is always the best Facebook posting time.”',
  ),
  paragraph(
    'p-tm-5',
    'Different Pages have:',
  ),
  bullets('ul-tm', [
    'different countries,',
    'different audiences,',
    'different industries,',
    'and different audience habits.',
  ]),
  paragraph('p-tm-6', 'Use your own data.'),

  heading('h-hashtags', 'Do Facebook Hashtags Increase Reach?', 2),
  paragraph(
    'p-hs-1',
    'Facebook supports hashtags and says hashtags turn topics and phrases into clickable links that can help people find posts about subjects they are interested in. (Facebook)',
    [{ href: FB_HASHTAGS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hs-2',
    'But that does not mean:',
  ),
  paragraph(
    'p-hs-3',
    'more hashtags automatically produce more reach.',
  ),
  paragraph(
    'p-hs-4',
    'Facebook does not publish a universal hashtag-to-reach formula.',
  ),
  paragraph(
    'p-hs-5',
    'Use a hashtag when it genuinely helps describe or organize the subject.',
  ),
  paragraph(
    'p-hs-6',
    "Don't turn a Facebook caption into a block of unrelated hashtags just because you are chasing visibility.",
  ),

  heading(
    'h-buy-followers',
    'Does Buying Facebook Followers Increase Page Reach?',
    2,
  ),
  paragraph(
    'p-bf-1',
    'No guaranteed relationship should be claimed.',
  ),
  paragraph(
    'p-bf-2',
    'A Facebook follower service concerns a Page-level follower metric.',
  ),
  paragraph(
    'p-bf-3',
    'Facebook reach concerns content visibility.',
  ),
  paragraph(
    'p-bf-4',
    "Facebook's Feed and recommendation systems are personalized, and Meta does not publish a rule saying adding a particular number of followers automatically creates a proportional increase in Page reach. (Facebook)",
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-bf-5',
    'Therefore NovaLikes should never claim:',
  ),
  bullets('ul-bf', [
    'a specific follower purchase will create matching additional reach',
    'more purchased followers will make Facebook push your posts',
    'followers guarantee organic Page reach',
  ]),
  paragraph('p-bf-6', 'Keep the metrics separate.'),

  heading(
    'h-page-likes-reach',
    'Do Facebook Page Likes Increase Reach?',
    2,
  ),
  paragraph(
    'p-pl-1',
    'The same caution applies.',
  ),
  paragraph(
    'p-pl-2',
    'Page Likes are a Page-level metric.',
  ),
  paragraph('p-pl-3', 'Reach is a visibility metric.'),
  paragraph(
    'p-pl-4',
    'Changing one visible Page metric does not give a third-party service control over Facebook Feed distribution.',
  ),
  paragraph(
    'p-pl-5',
    "Facebook's own systems determine what users see based on personalized ranking and recommendations. (Facebook)",
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pl-6',
    'Do not promise algorithm outcomes from a Page Like package.',
  ),

  heading(
    'h-post-likes-reach',
    'Do Facebook Post Likes Increase Reach?',
    2,
  ),
  paragraph(
    'p-pt-1',
    'Facebook says reactions and other engagement information can influence Feed ranking. (Facebook)',
    [{ href: FB_FEED_POST_TYPES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pt-2',
    'But that does not justify promising:',
  ),
  paragraph(
    'p-pt-3',
    'Buying Likes will increase your reach.',
  ),
  paragraph(
    'p-pt-4',
    'There is no official public equation establishing such an outcome.',
  ),
  paragraph(
    'p-pt-5',
    'A Post Like service should be represented as:',
  ),
  paragraph('p-pt-6', 'a Post Like service.'),
  paragraph('p-pt-7', 'Not:'),
  bullets('ul-pt', [
    'an organic reach service,',
    'a Feed-ranking service,',
    'or a guaranteed recommendation tool.',
  ]),

  heading(
    'h-higher',
    'Can Reach Be Higher Than Your Follower Count?',
    2,
  ),
  paragraph('p-hi-1', 'Yes.'),
  paragraph(
    'p-hi-2',
    'Facebook recommendations can show posts and Pages to people who do not already follow them. (Facebook)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  paragraph('p-hi-3', 'So:'),
  paragraph('p-hi-4', 'followers = 2,500'),
  paragraph('p-hi-5', 'reach = 8,000'),
  paragraph(
    'p-hi-6',
    'is entirely possible as a metric relationship.',
  ),
  paragraph(
    'p-hi-7',
    'Do not automatically assume reach must stop at the follower number.',
  ),

  heading(
    'h-lower',
    'Can Reach Be Lower Than Your Follower Count?',
    2,
  ),
  paragraph('p-lo-1', 'Also yes.'),
  paragraph(
    'p-lo-2',
    'Following a Page does not mean every post is automatically delivered to every follower.',
  ),
  paragraph(
    'p-lo-3',
    "Facebook's default Feed is ranked and personalized. (Facebook)",
    [{ href: FB_FEEDS_TAB, label: 'Facebook', external: true }],
  ),
  paragraph('p-lo-4', 'So:'),
  paragraph('p-lo-5', 'followers = 20,000'),
  paragraph('p-lo-6', 'post reach = 4,000'),
  paragraph(
    'p-lo-7',
    'does not automatically indicate a technical error.',
  ),
  paragraph(
    'p-lo-8',
    'You need more context before diagnosing anything.',
  ),

  heading(
    'h-drop',
    'Why Did My Facebook Organic Reach Drop?',
    2,
  ),
  paragraph(
    'p-dr-1',
    'Meta itself says multiple factors can affect reach. (Facebook)',
    [{ href: FB_ORGANIC_PAID_POST_REACH, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-dr-2',
    'Instead of assuming one cause, inspect:',
  ),
  bullets('ul-dr', [
    'your recent content,',
    'audience response,',
    'organic vs paid distribution,',
    'format changes,',
    'publishing patterns,',
    'and Page Insights.',
  ]),
  paragraph(
    'p-dr-3',
    "Also remember that Facebook's personalized ranking means different posts can naturally receive different distribution.",
  ),
  paragraph(
    'p-dr-4',
    'One decline does not automatically prove:',
  ),
  bullets('ul-dr-not', [
    'a penalty,',
    'a “shadowban,”',
    'or an account problem.',
  ]),
  paragraph('p-dr-5', 'Look for evidence first.'),

  heading(
    'h-periods',
    'Should You Compare Reach Across Different Time Periods?',
    2,
  ),
  paragraph(
    'p-pe-1',
    'Yes, but do it carefully.',
  ),
  paragraph(
    'p-pe-2',
    'Compare similar periods whenever possible.',
  ),
  paragraph('p-pe-3', 'For example:'),
  paragraph(
    'p-pe-4',
    'last 28 days vs previous 28 days',
  ),
  paragraph(
    'p-pe-5',
    'can often be more meaningful than:',
  ),
  paragraph(
    'p-pe-6',
    'one exceptional viral day vs an ordinary month.',
  ),
  paragraph(
    'p-pe-7',
    'Meta says Page Insights data can be used to understand performance over time, although availability and reporting windows vary by metric. Facebook currently states Page Insights data can be accessed for up to the previous two years. (Facebook)',
    [{ href: FB_SEE_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pe-8',
    'Patterns are usually more informative than one screenshot.',
  ),

  heading('h-review', 'A Simple Facebook Reach Review', 2),
  paragraph(
    'p-rv-1',
    'When reviewing a Facebook Page, use this sequence.',
  ),
  heading('h-rv-1', 'Step 1: Check Followers', 3),
  paragraph(
    'p-rv-2',
    "Understand the size of the Page's connected audience.",
  ),
  heading('h-rv-2', 'Step 2: Check Reach', 3),
  paragraph(
    'p-rv-3',
    'How many people encountered Page content?',
  ),
  heading('h-rv-3', 'Step 3: Check Impressions', 3),
  paragraph(
    'p-rv-4',
    'How often did the content appear on screens?',
  ),
  heading('h-rv-4', 'Step 4: Separate Organic and Paid', 3),
  paragraph('p-rv-5', 'Did promotion contribute?'),
  heading('h-rv-5', 'Step 5: Check Engagement', 3),
  paragraph(
    'p-rv-6',
    'What did people do after encountering the post?',
  ),
  heading('h-rv-6', 'Step 6: Compare Similar Posts', 3),
  paragraph(
    'p-rv-7',
    'Look for patterns across topics and formats.',
  ),
  heading('h-rv-7', 'Step 7: Repeat Over Time', 3),
  paragraph(
    'p-rv-8',
    'Do not rebuild your strategy around one unusually high or low post.',
  ),

  heading(
    'h-not-results',
    'Facebook Reach Is Visibility, Not a Guarantee of Results',
    2,
  ),
  paragraph(
    'p-nr-1',
    'Reach can tell you whether content is being seen.',
  ),
  paragraph(
    'p-nr-2',
    'It cannot by itself tell you:',
  ),
  bullets('ul-nr', [
    'whether people liked what they saw,',
    'whether they followed the Page,',
    'whether they purchased something,',
    'whether they contacted the business,',
    'or whether the post generated revenue.',
  ]),
  paragraph(
    'p-nr-3',
    'Those outcomes require separate measurements.',
  ),
  paragraph(
    'p-nr-4',
    'A business could have:',
  ),
  bullets('ul-nr-ex', [
    'high reach and few leads,',
    'or modest reach and several valuable enquiries.',
  ]),
  paragraph(
    'p-nr-5',
    'Neither result can be understood from reach alone.',
  ),
  paragraph(
    'p-nr-6',
    'Use the metric for the question it actually answers.',
  ),

  heading(
    'h-simple',
    'How Facebook Page Reach Works in Simple Terms',
    2,
  ),
  paragraph('p-sm-1', 'The easiest model is:'),
  bullets('ul-sm', [
    'You publish a post.',
    'Facebook determines where it may appear through Feed and recommendation systems.',
    'People encounter the content.',
    'That contributes to reach.',
    'Repeated screen appearances contribute to impressions.',
    'Some people may interact.',
  ]),
  paragraph(
    'p-sm-2',
    '(Facebook)',
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sm-3',
    'Followers provide context about your Page audience, but they are not the same thing as reach.',
  ),
  paragraph(
    'p-sm-4',
    'That is why Page owners should stop asking:',
  ),
  paragraph(
    'p-sm-5',
    "“Why doesn't my reach equal my followers?”",
  ),
  paragraph(
    'p-sm-6',
    'Those metrics were never designed to be identical.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Facebook Page reach is the estimated number of people who saw content from your Page or about your Page.',
    'Impressions measure screen appearances and are different from reach.',
    'Organic reach comes from unpaid distribution, while paid reach relates to paid distribution.',
    "Facebook's default Feed is ranked and personalized, so following a Page does not guarantee seeing every Page post.",
    'Facebook can recommend posts and Pages to people who do not already follow them.',
    'Reach can therefore be either higher or lower than follower count.',
    'Likes, followers and Page Likes should not be advertised as guaranteed methods for increasing Facebook reach.',
  ]),
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
    'Reach: estimated number of people who saw Page-related content.',
    'Impressions: number of times Page-related content entered people\'s screens.',
    'Engagement: actions people take around the content.',
    "A Page's follower number is not a delivery guarantee for each post.",
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What does reach mean on Facebook?',
      answer:
        'Reach is Meta\'s estimated number of people who saw any content from your Page or about your Page.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'What is the difference between Facebook reach and impressions?',
      answer:
        "Reach focuses on people who saw Page-related content, while impressions measure how many times that content entered people's screens.",
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
