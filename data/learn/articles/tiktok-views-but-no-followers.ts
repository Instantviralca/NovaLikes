/**
 * Article #2 — Why Do TikTok Videos Get Views but No Followers?
 * Scheduled: Wednesday 26 August 2026.
 * Informational intent. Supports existing TikTok commercial pages; does not compete with them.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'tiktok-views-but-no-followers';
const SCHEDULED_AT = '2026-08-26T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';
const TIKTOK_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';
const TIKTOK_NOT_RECOMMENDED =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/why-is-my-account-not-being-recommended';
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
    'Getting views on TikTok but hardly any new followers is one of the most common frustrations for creators. A video can reach thousands of people while your follower count barely moves. In most cases nothing is wrong with your account. Watching a video and following an account are two separate decisions, and the second one needs a different reason.',
  ),
  paragraph(
    'p-2',
    'TikTok\'s recommendation system shows videos to people based on their interests, not on whether they follow you. That is great for reach, but it means most viewers meet your content once, with no plan to come back. Our guide on TikTok followers, likes and views explains why these numbers move separately.',
    [
      { href: TIKTOK_RECOMMENDS, label: 'recommendation system', external: true },
      { href: '/learn/tiktok-followers-vs-likes-vs-views', label: 'TikTok followers, likes and views' },
    ],
  ),
  heading('h-the-video-solved-the-problem-then-the-vi', 'The Video Solved the Problem, Then the Viewer Left', 2),
  paragraph(
    'p-3',
    'Someone searches "how to clean white sneakers", finds your video, gets the answer and moves on. The video did its job perfectly. It just did not give them a reason to want more from you.',
  ),
  paragraph(
    'p-4',
    'This happens a lot with quick tips, one off answers, trending clips and funny moments. The question to ask is: if someone liked this video, is it obvious what they would get by following? If not, the gap is between the video and the rest of your account.',
  ),
  heading('h-your-profile-does-not-explain-why-to-fol', 'Your Profile Does Not Explain Why to Follow', 2),
  paragraph(
    'p-5',
    'When a viewer taps through to your profile, they decide in a few seconds whether they want more. They glance at your name, photo, bio and the grid of recent videos.',
  ),
  paragraph(
    'p-6',
    'Compare two accounts. One has recent posts about a recipe, a holiday, a phone review, a dance and a rant about traffic. The other has ten videos that all teach beginner photography. Someone who found the second account through a photography video knows exactly what following will bring.',
  ),
  paragraph(
    'p-7',
    'You do not need an extremely narrow niche. You just need visitors to understand what you offer. Write a bio that says it plainly, and pin your three best videos so newcomers see your strongest work first.',
  ),
  figure(
    'fig-views-profile-follow',
    `${IMAGE_DIR}/views-profile-follow.png`,
    'Diagram showing that a TikTok video view, a profile visit and a follow are three separate actions',
    'A view does not automatically become a profile visit, and a profile visit does not automatically become a follow.',
  ),
  heading('h-one-video-took-off-but-it-does-not-match', 'One Video Took Off, but It Does Not Match the Rest', 2),
  paragraph(
    'p-8',
    'Sometimes one video reaches a very different audience from your usual one. A fitness account posts a funny clip about a broken treadmill and it gets 200,000 views. People loved the joke, visited the profile, found workout videos and left.',
  ),
  paragraph(
    'p-9',
    'Those views were real, but the audience was not interested in your normal content. When one video does far better than the rest, check whether it brought in followers or just viewers, and whether it matches what you usually make.',
  ),
  heading('h-nothing-suggests-more-is-coming', 'Nothing Suggests More Is Coming', 2),
  paragraph(
    'p-10',
    'People follow because they expect future value. "That was a good video" and "I want to see what this person posts next" are different reactions. A single strong video can earn the first. A clear, ongoing direction earns the second.',
  ),
  paragraph(
    'p-11',
    'Series help a lot. "Part 1 of 5", "Day 3 of learning piano" or a weekly mistake breakdown tells viewers there is more to come. You do not need to turn everything into a series, but some sense of continuity makes following feel worthwhile.',
  ),
  heading('h-the-hook-attracts-the-wrong-viewers', 'The Hook Attracts the Wrong Viewers', 2),
  paragraph(
    'p-12',
    'A broad, vague opening such as "you will not believe what happened next" can pull in curious viewers who have no interest in your topic. A specific one such as "three mistakes beginners make when shooting indoor photos" attracts the people most likely to want more. Specific hooks may bring slightly fewer views, but those views are much more likely to turn into followers.',
  ),
  heading('h-you-are-judging-only-one-number', 'You Are Judging Only One Number', 2),
  paragraph(
    'p-13',
    'It is easy to see 20,000 views and wonder why you did not gain hundreds of followers. But compare two videos. Video A gets 20,000 views and 15 followers. Video B gets 4,000 views and 60 followers. Video A was seen more, but Video B created far more interest in you.',
  ),
  paragraph(
    'p-14',
    'TikTok\'s advice on growing your audience recommends using analytics to study your top content. In TikTok Studio, check profile views and new followers for each video, not just the view count.',
    [
      { href: TIKTOK_GROW_AUDIENCE, label: 'growing your audience', external: true },
    ],
  ),
  figure(
    'fig-would-you-follow',
    `${IMAGE_DIR}/would-you-follow.png`,
    'Checklist showing a clear topic, recognizable profile, related posts, useful bio and a reason to return',
    'A view introduces the content. Your profile explains why someone might stay.',
  ),
  heading('h-when-low-views-are-a-different-problem', 'When Low Views Are a Different Problem', 2),
  paragraph(
    'p-15',
    'If views drop sharply across many posts at once, that is a separate issue from views without followers. TikTok can make content or accounts ineligible for recommendation if they break its guidelines, and it tells you through notifications and Account status. TikTok also notes in its help page on videos not getting views that views naturally go up and down between posts. Check those before assuming the worst.',
    [
      { href: TIKTOK_NOT_RECOMMENDED, label: 'ineligible for recommendation', external: true },
      { href: TIKTOK_POST_VIEWS, label: 'videos not getting views', external: true },
    ],
  ),
  heading('h-how-to-turn-more-viewers-into-followers', 'How to Turn More Viewers Into Followers', 2),
  numbered('ol-1', [
    'Make the account\'s purpose obvious in your name, bio and pinned videos.',
    'Look at your profile as a stranger would. If the next six to nine videos do not feel related, fix that first.',
    'Make follow up videos on topics that bring in followers. Questions in comments and Creator Search Insights are full of ideas.',
    'Build short series so viewers know more is coming.',
    'Point to related content naturally, for example "part two is on my profile" or "I covered the editing side in my last video", rather than shouting "follow me".',
    'Compare several videos, not just your biggest one, and look for patterns in which topics bring in followers.',
  ]),
  paragraph(
    'p-16',
    'There is no correct view to follower ratio. Tutorials found through search often bring one time viewers. Personality led series tend to bring more followers. Trending clips reach broad audiences who may not care about your niche. Judge each video against what it was meant to do.',
  ),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnosing-views-without-followers.png`,
    'Four scenarios for diagnosing TikTok views without followers, based on profile interest and follower growth rather than fake percentages',
    'Use patterns across multiple posts rather than judging one number alone.',
  ),
  heading('h-should-you-delete-videos-that-got-views-', 'Should You Delete Videos That Got Views but No Followers?', 2),
  paragraph(
    'p-17',
    'Usually not. A video can still answer a question, bring in search traffic for months, show you what your audience is interested in or support your other content. Deleting it removes useful information without fixing the real problem.',
  ),
  paragraph(
    'p-18',
    'Posting more is not automatically the answer either. A better plan is to understand why people watched, then make follow up videos for the viewers you actually want.',
  ),
  paragraph(
    'p-19',
    'Views are how people discover you. Following is a separate choice they make when they believe more good content is coming. Make that belief easy to reach, and views start turning into followers.',
  ),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list') return block.items.join(' ');
  if (block.type === 'blockquote') return block.text;
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const TIKTOK_VIEWS_BUT_NO_FOLLOWERS_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-tiktok-views-but-no-followers',
  slug: SLUG,
  title: 'Why Do TikTok Videos Get Views but No Followers?',
  excerpt:
    'Getting TikTok views but few followers is common. Here are the real reasons views do not turn into follows, and practical fixes for your profile, content and follow up videos.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'views', 'analytics', 'creator', 'algorithm'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Illustration of TikTok video discovery and views on one side, with a profile follow decision on the other',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'TikTok Views but No Followers? 9 Common Reasons',
    description:
      'Getting TikTok views but few new followers? Learn why this happens and what to improve in your content, profile and audience strategy.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'TikTok views but no followers',
      'TikTok views but not followers',
      'why am I getting views but no followers on TikTok',
      'TikTok views not converting to followers',
      'how to get followers from TikTok views',
    ],
  },
  relatedServices: [
    'buy-tiktok-followers',
    'buy-tiktok-likes',
    'buy-tiktok-views',
  ],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-seo',
    'public-vs-private-tiktok-account',
    'how-to-get-1000-tiktok-followers',
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
    'Watching a video and following an account are separate decisions.',
    'Many viewers get what they need from one video and leave.',
    'A clear bio, pinned videos and related recent posts help visitors decide to follow.',
    'Series and follow up videos give people a reason to come back.',
    'Specific hooks attract viewers who are more likely to follow.',
    'Compare followers and profile views per video, not just total views.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why do I get views on TikTok but no followers?',
      answer:
        'Most viewers watch one video and move on. They follow only when your profile and other videos make it clear that more of what they liked is coming.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Do TikTok views turn into followers automatically?',
      answer:
        'No. Views measure watching. Following is a separate decision, so some videos with huge views bring in very few followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'What is a good view to follower ratio on TikTok?',
      answer:
        'There is no standard ratio. It depends on the type of video. Compare your own videos to find which topics bring in followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'How can I convert TikTok viewers into followers?',
      answer:
        'Make your profile purpose clear, pin your best videos, keep recent posts related, build series and make follow up videos on topics that work.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Should I delete TikTok videos that get views but no followers?',
      answer:
        'Usually not. They may still bring search traffic and show you what your audience likes.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Could low followers mean I am shadowbanned?',
      answer:
        'Usually not. If views fall sharply across many posts, check your inbox and Account status for any restriction notices.',
      schemaEligible: true,
    },
  ],
};
