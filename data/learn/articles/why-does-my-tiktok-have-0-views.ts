/**
 * Why Does My TikTok Have 0 Views? — first post-launch Learn article.
 * Published 10 October 2026 (real publication date, not a launch backfill).
 * Informational intent: troubleshooting a TikTok post stuck at zero views.
 * Supports TikTok commercial pages without targeting them.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'why-does-my-tiktok-have-0-views';
const PUBLISHED_AT = '2026-10-10T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_VISIBILITY =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/video-visibility';
const TIKTOK_RECOMMENDATION_SYSTEM =
  'https://www.tiktok.com/transparency/en/recommendation-system';
const TIKTOK_FYF_STANDARDS =
  'https://www.tiktok.com/community-guidelines/en/fyf-standards';
const TIKTOK_NOT_RECOMMENDED =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/why-is-my-account-not-being-recommended';
const TIKTOK_ACCOUNT_STATUS =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-status';
const TIKTOK_POST_VIEWS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/my-videos-arent-getting-views';
const TIKTOK_NEWSROOM_FOR_YOU =
  'https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you';

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

function steps(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'numbered_list', items, order: nextOrder() };
}

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-answer',
    'A TikTok video usually sits at 0 views for one of five reasons: it is not set to public, it is still being reviewed, it is not eligible for the For You feed, your account has a restriction, or the upload did not finish properly. Check them in the order below. The first two take seconds, and together they explain most stuck videos.',
  ),
  paragraph(
    'p-answer-2',
    'A brand-new account with no followers can also wait a little before its first viewers arrive, but a public video that is still at exactly 0 after an hour is more often blocked than unlucky.',
  ),

  heading('h-checklist', 'Quick Checklist: Causes and Fixes', 2),
  {
    id: 'table-checklist',
    type: 'comparison_table',
    order: nextOrder(),
    caption: 'Work from the top down. Stop when you find the cause.',
    headers: ['Cause', 'How to check', 'What to do'],
    rows: [
      [
        'Post is not public',
        'Open the post, tap More options, then Privacy settings',
        'Set who can view it to Everyone; a private account limits views to followers',
      ],
      [
        'Still in review',
        'The post shows a review notice, or it was uploaded only minutes ago',
        'Wait; do not delete and re-upload while it is being reviewed',
      ],
      [
        'Not eligible for the For You feed',
        'A notice on the post or in your inbox says it will not be recommended',
        'Read which rule applies, edit or remove the post, or appeal if you think it is a mistake',
      ],
      [
        'Account restriction',
        'Account status in Settings and privacy, plus notices on your profile',
        'Follow the notice; appeal from the inbox or profile notice if it is wrong',
      ],
      [
        'Upload or app problem',
        'The video will not play from your own profile, or other posts show views normally',
        'Update the app, reconnect, and only then consider re-uploading',
      ],
    ],
  },

  heading('h-zero-vs-low', 'Is It Really 0 Views, or Just Low?', 2),
  paragraph(
    'p-zvl-1',
    'These are different problems. A video at exactly 0 usually means nobody is being shown it at all, so look for a setting, a review or a restriction. A video stuck at a few dozen or a few hundred views has been shown to people, and the issue is more likely how viewers reacted to it.',
  ),
  paragraph(
    'p-zvl-2',
    'View counts can also lag behind. TikTok notes that post views can fluctuate and points creators to analytics for a clearer picture of performance. (TikTok Support) Our guide to how TikTok video views are counted explains what does and does not count as a view.',
    [
      { href: TIKTOK_POST_VIEWS, label: 'TikTok Support', external: true },
      {
        href: '/learn/how-tiktok-video-views-are-counted',
        label: 'how TikTok video views are counted',
      },
    ],
  ),

  heading('h-privacy', '1. The Video Is Not Set to Public', 2),
  paragraph(
    'p-priv-1',
    'This is the most common cause and the quickest to fix. On a public account, each post can be shown to Everyone, Friends (followers you follow back) or Only you. On a private account, the options are Followers, Friends or Only you. (TikTok Support)',
    [{ href: TIKTOK_VISIBILITY, label: 'TikTok Support', external: true }],
  ),
  steps('ol-priv', [
    'Tap Profile and open the video.',
    'Tap More options on the side of the post.',
    'Tap Privacy settings (you may need to swipe left).',
    'Choose Everyone.',
  ]),
  paragraph(
    'p-priv-2',
    'If your whole account is private, only approved followers can watch, so a new private account can easily show 0 views. Our comparison of public and private TikTok accounts covers what else changes.',
    [
      {
        href: '/learn/public-vs-private-tiktok-account',
        label: 'public and private TikTok accounts',
      },
    ],
  ),

  heading('h-review', '2. The Video Is Still Under Review', 2),
  paragraph(
    'p-rev-1',
    'Every new upload is checked before it can be recommended. TikTok says that when a video is first uploaded it goes through its content moderation system, and only videos that pass moderation enter the pool that can be recommended in the For You feed. (TikTok)',
    [{ href: TIKTOK_RECOMMENDATION_SYSTEM, label: 'TikTok', external: true }],
  ),
  paragraph(
    'p-rev-2',
    'Most reviews finish quickly, but TikTok does not publish a fixed time. While a post is in review, deleting it and uploading it again only restarts the process. Give it time first.',
  ),

  heading('h-ineligible', '3. The Video Is Not Eligible for the For You Feed', 2),
  paragraph(
    'p-inel-1',
    'A video can stay on TikTok and still be kept out of the For You feed. TikTok publishes For You feed eligibility standards that list the types of content it does not recommend, including:',
    [
      {
        href: TIKTOK_FYF_STANDARDS,
        label: 'For You feed eligibility standards',
        external: true,
      },
    ],
  ),
  bullets('ul-inel', [
    'content from accounts of creators under 16',
    'dangerous activities and challenges',
    'body exposure and sexually suggestive content',
    'shocking and graphic content',
    'misinformation, and civic and election integrity issues',
    'fake engagement',
    'unoriginal content and QR codes',
    'alcohol, tobacco and drugs',
  ]),
  paragraph(
    'p-inel-2',
    'TikTok says ineligible posts can still be discovered in other ways, such as search or by people who follow you. On a new account with few followers, though, an ineligible post can stay at or near 0. (TikTok)',
    [{ href: TIKTOK_FYF_STANDARDS, label: 'TikTok', external: true }],
  ),
  paragraph(
    'p-inel-3',
    'Fake engagement is on that list, so be careful with anything that promises automatic views or follows. Our guide on whether buying TikTok followers affects FYP reach covers what TikTok says about it.',
    [
      {
        href: '/learn/buying-tiktok-followers-fyp-account-safety',
        label: 'whether buying TikTok followers affects FYP reach',
      },
    ],
  ),

  heading('h-account', '4. Your Account Has a Restriction', 2),
  paragraph(
    'p-acc-1',
    'If every new post is stuck, look at the account rather than the video. TikTok says that if you repeatedly post content it considers unsuitable for the For You feed, your account and posts can stop appearing there and become harder to find in search. When that happens, it notifies you in your inbox and on your profile and explains which content was flagged. (TikTok Support)',
    [{ href: TIKTOK_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-acc-2',
    'Check your inbox notifications, the notice under your username on your profile, and the Account status page in Settings and privacy, which lists recent violations and restrictions. (TikTok Support) Menu names can differ slightly between app versions.',
    [{ href: TIKTOK_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-acc-3',
    'If you think TikTok made a mistake, you can appeal:',
  ),
  steps('ol-appeal', [
    'From your inbox: tap the ineligibility notification, tap View more, review the videos, then tap Appeal.',
    'From your profile: tap the “Ineligible for recommendation” notice below your username, review the videos, then tap Appeal.',
  ]),
  paragraph(
    'p-acc-4',
    'TikTok says it may restore recommendations automatically, but it does not give a fixed timeframe. (TikTok Support)',
    [{ href: TIKTOK_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),

  heading('h-upload', '5. The Upload or the App Is the Problem', 2),
  paragraph(
    'p-up-1',
    'Sometimes nothing is wrong with the post or the account. Rule out a technical problem before changing anything else:',
  ),
  bullets('ul-up', [
    'Open the video from your own profile and make sure it plays all the way through.',
    'Check whether your other recent posts are collecting views normally. If they are, the issue is this one post.',
    'Update the TikTok app and make sure you were on a stable connection when you posted.',
    'Look in Drafts to confirm the post was actually published and not saved.',
  ]),

  heading('h-new-account', 'What If My Account Is Brand New?', 2),
  paragraph(
    'p-new-1',
    'Follower count is not what decides whether a video gets shown. TikTok says that neither follower count nor previous high-performing videos are direct factors in its recommendation system; it looks at things such as viewer interactions, video information like captions, sounds and hashtags, and device and account settings. (TikTok Newsroom)',
    [{ href: TIKTOK_NEWSROOM_FOR_YOU, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-new-2',
    'So a new account can get views on its first post. If it stays at 0, go back through the checklist above before assuming it is about follower count. Clear captions and spoken keywords also help TikTok match a new video to the right viewers; our TikTok SEO guide shows how.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO guide' }],
  ),

  heading('h-200', 'What About “200 View Jail”?', 2),
  paragraph(
    'p-200-1',
    '“200 view jail” is a creator nickname, not a TikTok term. TikTok has not published a fixed test audience or a view limit. A video that stops in the low hundreds has been shown to people, so it is not a 0-view problem.',
  ),
  paragraph(
    'p-200-2',
    'In that case, compare the video with your better posts in TikTok Studio. Look at how quickly viewers swiped away, how much of the video they watched, and whether the topic matched what your account usually posts. Those numbers tell you more than any view count.',
  ),

  heading('h-repost', 'Should You Delete and Repost a 0-View Video?', 2),
  paragraph(
    'p-rep-1',
    'Only after you have found the cause. Reposting the same file does not fix a privacy setting, an eligibility decision or an account restriction, and a post that breaks a rule will run into the same decision again.',
  ),
  paragraph(
    'p-rep-2',
    'If the cause was technical, or you have changed the part that caused the problem, uploading again is reasonable. Delete the stuck version first so you do not end up with two copies on your profile.',
  ),

  {
    id: 'cta-tiktok-growth',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare TikTok Growth Options',
    text: 'Views, likes and followers measure different things. Fix any privacy, review or eligibility issue first: no package changes a setting or a TikTok decision about your post.',
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

export const WHY_DOES_MY_TIKTOK_HAVE_0_VIEWS_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-why-does-my-tiktok-have-0-views',
  slug: SLUG,
  title: 'Why Does My TikTok Have 0 Views? Causes and Fixes',
  excerpt:
    'A TikTok stuck at 0 views is usually not public, still in review, ineligible for the For You feed, restricted at account level, or stuck in upload. Here is how to check each one.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['views', 'algorithm', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A phone showing a TikTok-style video with a view counter at 0 and a checklist of possible causes',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'Why Does My TikTok Have 0 Views? 5 Causes and Fixes',
    description:
      'TikTok video stuck at 0 views? Check privacy, review, For You feed eligibility, account status and upload problems in order, with the fix for each.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'why does my tiktok have 0 views',
      'tiktok 0 views',
      'tiktok video stuck at 0 views',
      'why does my tiktok have 0 views after an hour',
      'why are my tiktoks getting 0 views',
      'tiktok 200 view jail',
    ],
  },
  relatedServices: ['buy-tiktok-views', 'buy-tiktok-likes', 'buy-tiktok-followers'],
  relatedArticles: [
    'how-tiktok-video-views-are-counted',
    'public-vs-private-tiktok-account',
    'tiktok-views-but-no-followers',
    'buying-tiktok-followers-fyp-account-safety',
    'tiktok-seo',
    'tiktok-likes-vs-views',
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
    'Exactly 0 views usually means a blocker: privacy, review, eligibility, an account restriction or a failed upload.',
    'Check post privacy first. It takes seconds and is the most common cause.',
    'Ineligible posts are kept out of the For You feed but can still be found through search and followers.',
    'Follower count is not a direct factor in TikTok recommendations, so new accounts can get views.',
    '“200 view jail” is not an official TikTok term. Low views are a different problem from 0 views.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why does my TikTok have 0 views after an hour?',
      answer:
        'There is no official timeline, but a public video still at 0 after an hour is usually blocked rather than slow. Check that the post is set to Everyone, that it is not still in review, and that you have no ineligibility notice in your inbox or on your profile.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Is 0 views on TikTok a shadowban?',
      answer:
        'TikTok does not use the word shadowban. It does make some posts and accounts ineligible for recommendation, and it says it notifies you in your inbox and on your profile when that happens. If you see no notice, check privacy and review status first.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Why does my TikTok show 0 views but has likes?',
      answer:
        'View counts can update later than likes and comments. If likes are arriving, people are seeing the video. Wait, refresh, and check the post in TikTok Studio, which gives a more reliable picture than the public counter.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Does a private TikTok account get 0 views?',
      answer:
        'It can. On a private account, only approved followers can watch your posts, so an account with few followers can easily show 0 views.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Should I delete a TikTok with 0 views?',
      answer:
        'Find the cause first. Reposting does not fix a privacy setting, an eligibility decision or an account restriction. If the problem was a failed upload, deleting and posting again is reasonable.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'How do I appeal a TikTok video that will not be recommended?',
      answer:
        'Open the ineligibility notification in your inbox and tap View more, or tap the “Ineligible for recommendation” notice under your username. Review the videos listed, then tap Appeal.',
      schemaEligible: true,
    },
  ],
};
