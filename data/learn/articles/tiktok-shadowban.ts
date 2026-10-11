/**
 * TikTok Shadowban — post-launch Learn article (second TikTok how-to batch).
 * Published 10 October 2026 (real publication date, not a launch backfill).
 * Informational intent: what creators call a shadowban, how to check, fix and
 * how long it lasts, based on TikTok's own eligibility and appeal process.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'tiktok-shadowban';
const PUBLISHED_AT = '2026-10-10T20:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_NOT_RECOMMENDED =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/why-is-my-account-not-being-recommended';
const TIKTOK_FYF_STANDARDS =
  'https://www.tiktok.com/community-guidelines/en/fyf-standards';
const TIKTOK_ACCOUNT_STATUS =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-status';
const TIKTOK_DECEPTIVE_BEHAVIOUR =
  'https://newsroom.tiktok.com/en-eu/how-tiktok-counters-deceptive-behaviour';
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
    'TikTok does not use the word shadowban. What it does do is make some videos, and sometimes whole accounts, ineligible for the For You feed, so they are shown to far fewer people. TikTok says it tells you when this happens, in your inbox and with a notice on your profile. So the quickest check is to look for that notice. If there is none, a sudden drop in views is much more likely to be a normal dip than a hidden penalty.',
  ),

  heading('h-what', 'What a TikTok Shadowban Actually Is', 2),
  paragraph(
    'p-what-1',
    'Creators say “shadowban” when views fall suddenly and nothing seems to be wrong. TikTok describes three separate things that can cause that kind of drop:',
  ),
  {
    id: 'table-what',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['What happens', 'What it means', 'How you find out'],
    rows: [
      [
        'One video is ineligible for the For You feed',
        'That video is not recommended, but it stays up and can still be found through search or by your followers',
        'A notice on the video or in your inbox',
      ],
      [
        'Your account is ineligible for recommendation',
        'Your account and posts stop appearing in the For You feed and are harder to find in search',
        'An inbox notification and an “Ineligible for recommendation” notice under your username',
      ],
      [
        'A violation, restriction or ban',
        'A post is removed, or features such as posting, commenting or LIVE are limited',
        'Notifications and the Account status page',
      ],
    ],
  },
  paragraph(
    'p-what-2',
    'TikTok says that if an account repeatedly posts content it considers unsuitable for the For You feed, the account and its posts will not appear there and will be harder to find in search. It also says it notifies the creator and explains which content was flagged. (TikTok Support)',
    [{ href: TIKTOK_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),

  heading('h-check', 'How to Check if You Are Shadowbanned on TikTok', 2),
  steps('ol-check', [
    'Open your Inbox and look for a notification saying a video or your account is not eligible for recommendation.',
    'Go to your profile and look for an “Ineligible for recommendation” notice under your username.',
    'Open Account status in Settings and privacy and check for recent violations or restrictions. Menu names can differ slightly between app versions.',
    'Open a recent video in TikTok Studio and look at where its views came from. If For You views fell sharply while views from followers and your profile look normal, the change is in recommendations.',
    'Compare the video with your usual posts, not with your best one.',
  ]),
  paragraph(
    'p-check-1',
    'Account status lists issues that affect your account or posts, such as violations and restrictions on features. (TikTok Support)',
    [{ href: TIKTOK_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-check-2',
    'If the first three checks show nothing, TikTok has not told you about any restriction. Skip third-party “shadowban checker” sites as well. They cannot see TikTok’s internal decisions, and some ask for your login details.',
  ),

  heading('h-why', 'Why TikTok Restricts Videos and Accounts', 2),
  paragraph(
    'p-why-1',
    'TikTok publishes For You feed eligibility standards that list the content it does not recommend. The ones creators run into most often are:',
    [{ href: TIKTOK_FYF_STANDARDS, label: 'For You feed eligibility standards', external: true }],
  ),
  bullets('ul-why', [
    'unoriginal content: videos uploaded again without new or creative edits, and very short, low-quality clips',
    'fake engagement: content that tricks people into liking, following or commenting, such as like-for-like promises',
    'dangerous activities and challenges',
    'body exposure and sexually suggestive content',
    'shocking and graphic content',
    'misinformation',
    'any content from accounts of creators under 16',
  ]),
  paragraph(
    'p-why-2',
    'TikTok also says it does not allow services that artificially increase engagement, such as selling followers or likes. (TikTok Newsroom) Our guide on whether buying TikTok followers affects FYP reach covers what that means in practice.',
    [
      { href: TIKTOK_DECEPTIVE_BEHAVIOUR, label: 'TikTok Newsroom', external: true },
      {
        href: '/learn/buying-tiktok-followers-fyp-account-safety',
        label: 'whether buying TikTok followers affects FYP reach',
      },
    ],
  ),

  heading('h-how-long', 'How Long Does a TikTok Shadowban Last?', 2),
  paragraph(
    'p-long-1',
    'TikTok gives no fixed time. It says it may restore an account to good standing automatically at any time, depending on how much of the account’s content is unsuitable. (TikTok Support)',
    [{ href: TIKTOK_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-long-2',
    'The “14 days” figure you see online comes from creator reports, not from TikTok. Because TikTok links recovery to how much of your content is unsuitable, fixing or removing the flagged posts is the part most within your control.',
  ),

  heading('h-fix', 'How to Fix a TikTok Shadowban', 2),
  steps('ol-fix', [
    'Read the notice. It tells you which videos were flagged and why.',
    'If you think TikTok got it wrong, appeal. From your inbox, tap the notification, tap View more, review the videos, then tap Appeal. Or tap the “Ineligible for recommendation” notice on your profile and do the same.',
    'If the notice is right, delete or edit the flagged videos and stop posting that type of content.',
    'Keep posting original videos that follow the rules. Ineligible posts can still reach your followers and appear in search, so your account is not invisible while this is resolved.',
    'If a feature such as posting, commenting or LIVE is limited, follow the steps shown in Account status.',
  ]),

  heading('h-myths', 'Fixes That Do Not Work', 2),
  bullets('ul-myths', [
    'Deleting and reinstalling the app or clearing the cache. The decision is tied to your content and account, not to your phone.',
    'Switching to a Business or Creator account. TikTok does not list account type as a reason for a video being ineligible.',
    'Adding #fyp or #foryou. TikTok’s recommendation explanations give these hashtags no special role.',
    'Deleting all your old videos. Only the flagged posts matter, and removing good videos takes away content that still works for you.',
  ]),
  paragraph(
    'p-myths-1',
    'TikTok says its recommendations are based on factors such as how viewers interact with videos, video information like captions, sounds and hashtags, and device and account settings. (TikTok Newsroom)',
    [{ href: TIKTOK_NEWSROOM_FOR_YOU, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-no-notice', 'No Notice, but Your Views Dropped?', 2),
  paragraph(
    'p-nn-1',
    'Then you are most likely not restricted. Views move a lot from one video to the next, because each video is recommended on its own. Check these first:',
  ),
  bullets('ul-nn', [
    'Is the drop on every video, or only on one or two?',
    'Did you change topic, length or format recently?',
    'Are the first few seconds weaker than in your stronger videos?',
    'Are For You views down while your followers still watch?',
  ]),
  paragraph(
    'p-nn-2',
    'If a video is stuck at exactly zero, our guide on why a TikTok has 0 views goes through each cause in order. If views are low rather than zero, our guide on how to get more views on TikTok covers what to change.',
    [
      { href: '/learn/why-does-my-tiktok-have-0-views', label: 'why a TikTok has 0 views' },
      { href: '/learn/how-to-get-more-views-on-tiktok', label: 'how to get more views on TikTok' },
    ],
  ),

  {
    id: 'cta-tiktok-growth',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare TikTok Growth Options',
    text: 'No package lifts a TikTok restriction or changes an eligibility decision. Fake engagement is on TikTok’s list of content it does not recommend, so deal with any flagged posts first.',
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

export const TIKTOK_SHADOWBAN_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-tiktok-shadowban',
  slug: SLUG,
  title: 'TikTok Shadowban: How to Check, Fix It and How Long It Lasts',
  excerpt:
    'TikTok does not use the word shadowban, but it does make videos and accounts ineligible for the For You feed. Here is how to check, appeal and fix it.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['algorithm', 'views', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A phone showing an “Ineligible for recommendation” notice next to a checklist for checking a TikTok shadowban',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'TikTok Shadowban: How to Check and Fix It',
    description:
      'TikTok shadowban explained: how to check for an ineligible notice, how to appeal, how long it lasts and which popular fixes do not work.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'tiktok shadowban',
      'how to tell if you are shadowbanned on tiktok',
      'how long does a tiktok shadowban last',
      'how to get rid of tiktok shadowban',
      'tiktok ineligible for recommendation',
      'tiktok shadowban checker',
    ],
  },
  relatedServices: ['buy-tiktok-views', 'buy-tiktok-likes', 'buy-tiktok-followers'],
  relatedArticles: [
    'why-does-my-tiktok-have-0-views',
    'how-to-get-more-views-on-tiktok',
    'buying-tiktok-followers-fyp-account-safety',
    'why-tiktok-followers-drop',
    'tiktok-seo',
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
    'TikTok does not use the word shadowban; it makes some videos and accounts ineligible for the For You feed.',
    'TikTok says it notifies you in your inbox and on your profile when this happens.',
    'No notice usually means no restriction, so look at the videos themselves.',
    'There is no fixed duration. Fixing or removing flagged posts is what you can control.',
    'Reinstalling the app, switching account type or adding #fyp does not lift it.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Is a TikTok shadowban real?',
      answer:
        'Not under that name. TikTok makes some videos and accounts ineligible for the For You feed, which cuts their reach, and it says it notifies the creator in their inbox and on their profile when it does.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'How do I know if I am shadowbanned on TikTok?',
      answer:
        'Check your inbox for an ineligibility notification, look for an “Ineligible for recommendation” notice under your username, and open Account status in Settings and privacy. If all three are clear, TikTok has not restricted your account.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'How long does a TikTok shadowban last?',
      answer:
        'TikTok does not give a fixed time. It says it may restore an account automatically at any time, depending on how much of its content is unsuitable for the For You feed.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can you appeal a TikTok shadowban?',
      answer:
        'Yes. Open the ineligibility notification in your inbox and tap View more, or tap the “Ineligible for recommendation” notice under your username. Review the videos listed, then tap Appeal.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does deleting TikTok and reinstalling it remove a shadowban?',
      answer:
        'No. Eligibility decisions are tied to your content and your account, not to the app on your phone.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can buying followers get you shadowbanned on TikTok?',
      answer:
        'It carries risk. Fake engagement is on TikTok’s list of content it does not recommend, and TikTok says it does not allow services that artificially increase followers or likes.',
      schemaEligible: true,
    },
  ],
};
