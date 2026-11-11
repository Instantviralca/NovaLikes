/**
 * Article #15 — How to Get More Likes on a Facebook Post Without Ads
 * Scheduled: Friday 25 September 2026.
 * Informational / how-to intent. Distinct from /buy-facebook-post-likes (buying intent).
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-to-get-more-likes-on-facebook-post';
const SCHEDULED_AT = '2026-09-25T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const FB_REACH_BEST_PRACTICES =
  'https://www.facebook.com/business/help/1424020861341537';
const FB_POST_INSIGHTS =
  'https://www.facebook.com/help/536633796429273';
const FB_PAGE_POST_BEST_PRACTICES =
  'https://www.facebook.com/business/help/134641900522571';
const FB_ENGAGEMENT_BAIT =
  'https://www.facebook.com/business/help/259911614709806';
const FB_DISTRIBUTES_CONTENT =
  'https://www.facebook.com/business/help/718033381901819';

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
    'More Likes on a Facebook post start with something simple: the post has to reach people, and those people have to care enough to react. You cannot control the first part directly, but the second part is almost entirely about the content. Facebook\'s own advice to Pages points the same way, favouring posts that are meaningful, original and relevant to the people seeing them.',
  ),
  paragraph(
    'p-2',
    'This guide covers what makes people like a post, the mistakes that quietly hold Pages back, and how to use your own data to improve.',
  ),
  heading('h-start-with-a-topic-your-audience-cares-a', 'Start With a Topic Your Audience Cares About', 2),
  paragraph(
    'p-3',
    'People react to posts that feel relevant to them. Before you post, ask who it is for and why they would care. A bakery sharing "new opening hours" will get fewer Likes than a photo of the first batch of the season with a line about what is coming next weekend.',
  ),
  paragraph(
    'p-4',
    'Look at the questions customers ask, the comments under your best posts and the topics people bring up in person. Those are usually better ideas than anything on a generic content calendar.',
  ),
  figure(
    'fig-why-like',
    `${IMAGE_DIR}/why-people-like-a-post.png`,
    'Why people Like a Facebook post: relevance, learning, agreement and whether the post is worth reacting to',
    'Engagement starts with audience relevance, not a trick.',
  ),
  heading('h-give-each-post-one-clear-purpose', 'Give Each Post One Clear Purpose', 2),
  paragraph(
    'p-5',
    'A post that tries to announce, sell, educate and entertain at the same time usually does none of them well. Decide whether this post should inform, help, celebrate or make people smile, and build it around that.',
  ),
  heading('h-write-a-first-line-that-earns-attention', 'Write a First Line That Earns Attention', 2),
  paragraph(
    'p-6',
    'Most people decide in a second whether to stop scrolling. Lead with the most interesting part: the result, the surprising fact, the question your audience keeps asking. "We tested five budget umbrellas in Manchester rain. Only one survived" works far better than "Hi everyone, hope you are having a great week."',
  ),
  paragraph(
    'p-7',
    'A strong opening is not the same as clickbait. Facebook reduces the reach of headlines that withhold information or exaggerate to get clicks, so make sure the post delivers what the first line promises.',
  ),
  heading('h-use-original-helpful-visuals', 'Use Original, Helpful Visuals', 2),
  paragraph(
    'p-8',
    'Photos and videos you made yourself almost always beat stock images and recycled memes. Show the real product, the real team, the real before and after. Meta\'s best practices for Page posts recommend clean, uncluttered visuals, so make sure the image is clear on a phone and any text on it is short and easy to read.',
    [
      { href: FB_PAGE_POST_BEST_PRACTICES, label: 'best practices for Page posts', external: true },
    ],
  ),
  paragraph(
    'p-9',
    'Facebook looks at many signals when it decides how it distributes content, and Meta has said it reduces the reach of unoriginal posts that simply repost other people\'s work. Your own take on a topic, even a simple one, is worth more than a shared viral clip.',
    [
      { href: FB_DISTRIBUTES_CONTENT, label: 'how it distributes content', external: true },
    ],
  ),
  figure(
    'fig-weak-strong',
    `${IMAGE_DIR}/weak-vs-strong-post.png`,
    'Weak Facebook post versus strong Facebook post: generic crowded graphics versus a clear original audience-focused message',
    'Simple and relevant usually gives people more reason to engage.',
  ),
  heading('h-stop-asking-for-likes', 'Stop Asking for Likes', 2),
  paragraph(
    'p-10',
    '"Like if you agree" and "Tag three friends" may feel harmless, but Facebook treats them as engagement bait and shows those posts to fewer people. You can still invite interaction, but it has to be natural.',
    [
      { href: FB_ENGAGEMENT_BAIT, label: 'engagement bait', external: true },
    ],
  ),
  paragraph(
    'p-11',
    'Ask questions people actually want to answer. "Which of these two designs should we launch with?" or "What is the one thing you wish your accountant had told you sooner?" give people a reason to respond, and posts with real conversations tend to collect Likes too. When people comment, reply. It shows the Page is run by real people and keeps the conversation going.',
  ),
  heading('h-post-when-your-audience-is-around', 'Post When Your Audience Is Around', 2),
  paragraph(
    'p-12',
    'Your Insights show when your followers are most active. Posting then gives a post a better chance of early reactions from the people most likely to care. There is no universal best time, though. A post that is not interesting will not do well at the perfect hour, and a good post can do well at an odd one.',
  ),
  paragraph(
    'p-13',
    'Posting more often does not automatically mean more Likes. Several weak posts a day can spread your audience\'s attention thin. A few strong posts a week usually work better.',
  ),
  heading('h-try-different-formats', 'Try Different Formats', 2),
  paragraph(
    'p-14',
    'Photos, short videos, Reels, text posts, carousels and links all perform differently for different audiences. Test each format for a few weeks and compare them in your Insights rather than relying on generic claims that one format always wins.',
  ),
  paragraph(
    'p-15',
    'When a post does well, turn it into a series. A weekly tip, a monthly behind the scenes post or a regular customer spotlight gives people something to look forward to.',
  ),
  heading('h-use-insights-instead-of-guessing', 'Use Insights Instead of Guessing', 2),
  paragraph(
    'p-16',
    'Your post insights show views, reach, reactions, comments and shares for each post. Once a month, list your five best and five weakest posts and ask what separates them: topic, format, opening line, visual or timing.',
    [
      { href: FB_POST_INSIGHTS, label: 'post insights', external: true },
    ],
  ),
  figure(
    'fig-loop',
    `${IMAGE_DIR}/organic-like-loop.png`,
    'Organic Facebook Like feedback loop: publish, measure, learn and improve',
    'Use your own Page data instead of universal engagement formulas.',
  ),
  paragraph(
    'p-17',
    'Two patterns are worth knowing. If a post got good reach but few Likes, people saw it and were not moved, so the content or opening needs work. If a post got lots of Likes from a small reach, the content worked, and similar posts may do well as they reach more people.',
  ),
  heading('h-reach-comes-before-likes', 'Reach Comes Before Likes', 2),
  paragraph(
    'p-18',
    'Nobody can like a post they never see. Followers do not see everything a Page posts, because Facebook ranks each person\'s Feed and also shows posts from Pages they do not follow. Facebook\'s advice on how to reach more people focuses on the same things this guide does: relevant, original posts that people want to engage with. Our guide on how Facebook Page reach works explains the process in more detail.',
    [
      { href: FB_REACH_BEST_PRACTICES, label: 'how to reach more people', external: true },
      { href: '/learn/how-facebook-page-reach-works', label: 'how Facebook Page reach works' },
    ],
  ),
  paragraph(
    'p-19',
    'That is also why a bigger follower count does not automatically mean more Likes per post. Followers and Post Likes measure different things, as our guide on Facebook followers, Page Likes and Post Likes explains.',
    [
      { href: '/learn/facebook-followers-vs-page-likes-vs-post-likes', label: 'Facebook followers, Page Likes and Post Likes' },
    ],
  ),
  {
      id: 'cta-fb-post-likes',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-facebook-post-likes',
      heading: 'Compare Facebook Post Like Options',
      description:
        "Organic engagement and Post Like services are separate approaches. If you're comparing Facebook Post Like packages, review the available options without treating Likes as a guarantee of organic reach, followers or business results.",
      label: 'View Facebook Post Likes',
    },
  heading('h-boosting-sharing-and-other-shortcuts', 'Boosting, Sharing and Other Shortcuts', 2),
  paragraph(
    'p-20',
    'Boosting a post with Facebook ads puts it in front of more people for a fee and can bring in more reactions, but those results come from paid reach, not organic reach, and Insights report them separately.',
  ),
  paragraph(
    'p-21',
    'Sharing a post into relevant groups can help, as long as the group allows it and the post is genuinely useful there. Dropping links into every group you can find tends to annoy members and get posts removed.',
  ),
  paragraph(
    'p-22',
    'Hashtags have little effect on Facebook compared with other platforms. One or two relevant ones are fine, but they will not rescue a weak post.',
  ),
  paragraph(
    'p-23',
    'Deleting and reposting a post that did poorly rarely helps. Hiding it does not either. Learn from it, then make the next one better.',
  ),
  heading('h-post-ideas-that-naturally-earn-likes', 'Post Ideas That Naturally Earn Likes', 2),
  bullets('ul-1', [
    'A before and after photo of real work',
    'A quick tip that solves a common customer problem',
    'A behind the scenes look at how something is made',
    'A milestone or thank you to customers',
    'A local event, news item or recommendation',
    'A short video answering a frequently asked question',
    'A customer story, shared with permission',
    'A simple poll between two real options',
  ]),
  paragraph(
    'p-24',
    'Getting more Likes is mostly a content question. Post things your audience finds useful or enjoyable, make the first line count, avoid tricks that Facebook demotes, and let your own Insights guide what you do next.',
  ),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'blockquote') return block.text;
  if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
    return block.items.join(' ');
  }
  if (block.type === 'internal_cta') {
    return `${block.heading ?? ''} ${block.description ?? ''} ${block.label}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const HOW_TO_GET_MORE_LIKES_ON_FACEBOOK_POST_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-how-to-get-more-likes-on-facebook-post',
    slug: SLUG,
    title: 'How to Get More Likes on a Facebook Post Without Ads',
    excerpt:
      'How to get more Likes on Facebook posts without ads: pick topics your audience cares about, write a strong opening, use original visuals, avoid engagement bait and learn from Insights.',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'facebook',
    tags: ['likes', 'engagement', 'analytics', 'followers', 'business'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Sketch of a Facebook Page post with three tips: create useful content, reach the right audience and earn natural reactions',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    showModifiedDate: true,
    seo: {
      title: 'How to Get More Likes on Facebook Posts Without Ads',
      description:
        'Learn practical ways to get more Facebook post likes organically using better topics, visuals, timing, Page Insights and genuine audience engagement.',
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'how to get more likes on Facebook',
        'get more likes on Facebook post',
        'Facebook post likes organically',
        'increase Facebook post engagement',
        'Facebook Page engagement',
        'Facebook content strategy',
      ],
    },
    relatedServices: ['buy-facebook-post-likes'],
    relatedArticles: [
      'facebook-followers-vs-page-likes-vs-post-likes',
      'how-facebook-page-reach-works',
      'how-to-get-more-facebook-page-followers',
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
    'Likes depend on reaching people and giving them a reason to react.',
    'A strong first line and original visuals make posts easier to engage with.',
    'Asking for Likes or tags is treated as engagement bait and reduces reach.',
    'Ask genuine questions and reply to comments.',
    'Use post insights to compare your best and weakest posts each month.',
    'More followers do not automatically mean more Likes on each post.',
  ],
    faqs: [
    {
      id: 'faq-1',
      question: 'How can I get more Likes on my Facebook posts for free?',
      answer:
        'Post about topics your audience cares about, lead with a strong first line, use your own photos and videos, ask genuine questions, reply to comments and use Insights to repeat what works.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can I ask people to like my Facebook post?',
      answer:
        'Avoid it. Facebook treats posts that ask for Likes, shares or tags as engagement bait and shows them to fewer people.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'What is the best time to post on Facebook for Likes?',
      answer:
        'There is no universal best time. Check when your followers are most active in Insights and test posting around then.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Do more followers mean more Likes on each post?',
      answer:
        'Not automatically. Followers do not see every post, and those who do will only react if the content interests them.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Are photos or videos better for Facebook Likes?',
      answer:
        'It depends on your audience. Test both for a few weeks and compare results in your post insights.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Should I delete a Facebook post that got few Likes?',
      answer:
        'Usually not. Deleting does not help future posts. Look at what was different about it and use that to improve the next one.',
      schemaEligible: true,
    },
  ],
  };
