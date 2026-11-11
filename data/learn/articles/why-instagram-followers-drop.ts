/**
 * Article #8 — Why Do Instagram Followers Drop?
 * Scheduled: Wednesday 9 September 2026.
 * Informational intent. Diagnoses follower-loss causes; not a “post better content” shortcut.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'why-instagram-followers-drop';
const SCHEDULED_AT = '2026-09-09T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_COUNT_CHANGES =
  'https://www.facebook.com/help/instagram/572730176521116';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_COMMUNITY_GUIDELINES =
  'https://www.facebook.com/help/instagram/477434105621119';
const IG_ACCOUNT_STATUS =
  'https://www.facebook.com/help/instagram/338481628002750';

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
    'Watching your Instagram follower count fall is frustrating, especially when it happens overnight. But a drop on its own does not mean your account is in trouble. Follower counts move for a handful of ordinary reasons, and most of them can be identified once you know where to look.',
  ),
  paragraph(
    'p-2',
    'Instagram itself explains in its help page on why follower counts change that it routinely removes disabled accounts, and that this updates the totals other accounts see. That is one cause. Here are the others, and how to tell them apart.',
    [
      { href: IG_COUNT_CHANGES, label: 'why follower counts change', external: true },
    ],
  ),
  heading('h-people-unfollow', 'People Unfollow', 2),
  paragraph(
    'p-3',
    'The simplest explanation is often right. People unfollow accounts all the time: they lose interest, clean up their Feed, followed for one post, or no longer want what the account offers. Even growing accounts lose some followers every week. Growth is the difference between gains and losses, not a line that only goes up.',
  ),
  heading('h-instagram-removed-disabled-or-spam-accou', 'Instagram Removed Disabled or Spam Accounts', 2),
  paragraph(
    'p-4',
    'When Instagram disables an account, whether it was fake, spam or simply deactivated by its owner, it stops counting toward anyone\'s follower total. Instagram also removes likes and follows from accounts that break its Community Guidelines, which prohibit artificially collecting followers or likes.',
    [
      { href: IG_COMMUNITY_GUIDELINES, label: 'Community Guidelines', external: true },
    ],
  ),
  paragraph(
    'p-5',
    'These removals can make a drop look sudden, because many accounts may disappear from your count at once. They are not a judgement on your latest post. Instagram even lets you remove potential spam followers yourself from your follower list.',
  ),
  figure(
    'fig-counts-change',
    `${IMAGE_DIR}/why-follower-counts-change.png`,
    'Diagram showing Instagram follower count changing because of people following or unfollowing, platform cleanup of disabled accounts, and audience-fit changes',
    'The visible total can change for more than one reason.',
  ),
  heading('h-a-viral-post-brought-followers-who-did-n', 'A Viral Post Brought Followers Who Did Not Stay', 2),
  paragraph(
    'p-6',
    'A Reel that travels far beyond your usual audience can bring in a burst of followers. If they followed for that one post and your normal content is different, many will leave again over the next few weeks. A fitness account that goes viral with a funny gym fail may gain people who wanted comedy, not workout advice. The decline afterwards is the spike settling down, not a penalty.',
  ),
  heading('h-your-content-changed', 'Your Content Changed', 2),
  paragraph(
    'p-7',
    'People follow for a reason. If an account built on budget travel tips gradually becomes product promotions and personal updates, some followers will decide it is no longer for them. The same can happen after a change of language, location, posting style or topic.',
  ),
  paragraph(
    'p-8',
    'Changing direction can be the right move. Just expect some turnover, and look at whether the people who stay and the new ones who join match what you want to build. A smaller, better matched audience is often worth more. If your reach changed at the same time, our guide on how the Instagram algorithm works explains what drives distribution.',
    [
      { href: '/learn/how-instagram-algorithm-works', label: 'how the Instagram algorithm works' },
    ],
  ),
  figure(
    'fig-follow-stay',
    `${IMAGE_DIR}/views-follow-stay.png`,
    'Three-stage diagram from discovering a Reel, to following a profile, to staying if later content still matches expectations',
    'A follow is not necessarily permanent.',
  ),
  heading('h-one-topic-attracted-the-wrong-audience', 'One Topic Attracted the Wrong Audience', 2),
  paragraph(
    'p-9',
    'Sometimes a single post on a side topic pulls in people who would never be interested in your main content. They follow, scroll through your profile later and leave. Check whether your recent drops follow posts that sit outside your usual focus.',
  ),
  heading('h-check-insights-before-guessing', 'Check Insights Before Guessing', 2),
  paragraph(
    'p-10',
    'Professional accounts can see follower growth in Instagram Insights, including how many followers were gained and lost over a chosen period. That turns one confusing number into something you can investigate:',
    [
      { href: IG_INSIGHTS, label: 'Instagram Insights', external: true },
    ],
  ),
  numbered('ol-1', [
    'When did the drop start, and was it one day or a steady trend?',
    'Did you also gain followers in that period, so the net change hides real growth?',
    'What did you post just before the drop?',
    'Did a viral post recently bring in an unusual spike?',
    'Has your topic, posting frequency or style changed?',
  ]),
  paragraph(
    'p-11',
    'Net figures can mislead. If 150 people followed and 100 unfollowed in a week, you grew by 50 even though it may not feel like much.',
  ),
  {
      id: 'cta-ig-followers',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-instagram-followers',
      heading: 'Compare Instagram Follower Options',
      description:
        "Follower count is only one Instagram metric. If you're comparing follower packages, review the available options without treating follower count as a guarantee of reach, engagement or other outcomes.",
      label: 'View Instagram Followers',
    },
  heading('h-a-drop-does-not-mean-you-are-shadowbanne', 'A Drop Does Not Mean You Are Shadowbanned', 2),
  paragraph(
    'p-12',
    'Losing followers is not evidence of a restriction. If you suspect a real policy problem, open Account Status in your settings. It shows removed content, any restrictions on features and whether your content can be recommended to non-followers. If it shows nothing, focus on the audience and content evidence instead.',
    [
      { href: IG_ACCOUNT_STATUS, label: 'Account Status', external: true },
    ],
  ),
  paragraph(
    'p-13',
    'Instagram also does not remove followers because you stopped posting for a while or because someone stopped liking your posts. Long gaps can make people lose interest, but there is no automatic removal rule.',
  ),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnose-the-drop.png`,
    'Four checks for diagnosing an Instagram follower drop: Insights, recent content, Account Status and whether the pattern is one day or longer',
    "Investigate first. Don't diagnose from follower count alone.",
  ),
  heading('h-be-careful-with-follower-and-unfollower-', 'Be Careful With Follower and Unfollower Apps', 2),
  paragraph(
    'p-14',
    'Instagram warns that apps offering free likes or followers, or asking for your login, can lead to limits on your account. Apps that claim to show exactly who unfollowed you usually need your password too, which puts your account at risk. NovaLikes never asks for your Instagram password, and you should be wary of any service that does.',
  ),
  paragraph(
    'p-15',
    'Instagram does not offer an official list of everyone who unfollowed you. Insights show the trend, which is the more useful number anyway.',
  ),
  heading('h-how-many-lost-followers-is-normal', 'How Many Lost Followers Is Normal?', 2),
  paragraph(
    'p-16',
    'There is no universal figure. Losing ten followers a day means very different things for an account with 200 followers and one with 2 million. Compare against your own baseline over several weeks rather than reacting to a single day.',
  ),
  heading('h-how-to-reduce-avoidable-follower-loss', 'How to Reduce Avoidable Follower Loss', 2),
  paragraph(
    'p-17',
    'You cannot stop every unfollow, and you should not try. People should choose what they follow. What you can do is make the account worth staying for:',
  ),
  bullets('ul-2', [
    'Keep your bio and profile clear about what the account offers.',
    'Stay reasonably consistent with the topics that brought people in.',
    'Judge posts by the followers they bring and keep, not only their views.',
    'Review follower growth in Insights monthly rather than daily.',
    'Do not change your whole strategy because of one bad day.',
  ]),
  paragraph(
    'p-18',
    'Adding followers to replace the ones you lost does not fix the reason they left. Instagram can also remove disabled and spam accounts again later, so chasing a previous number rarely solves anything. Understand the cause first.',
  ),
  paragraph(
    'p-19',
    'Your follower count is a moving audience, not a fixed list. The right response to a drop is not panic. It is a quick look at when it happened, what changed and whether the people following you still match what you post.',
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

export const WHY_INSTAGRAM_FOLLOWERS_DROP_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-why-instagram-followers-drop',
  slug: SLUG,
  title: 'Why Do Instagram Followers Drop? Common Reasons Explained',
  excerpt:
    'Instagram followers drop because people unfollow, Instagram removes disabled and spam accounts, or a viral spike settles down. Here is how to find the cause and what to do next.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['followers', 'analytics', 'algorithm', 'engagement', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Editorial illustration of an Instagram follower graph moving gently up and down beside profile icons',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'Why Do Instagram Followers Drop? Common Reasons Explained',
    description:
      'Instagram followers dropping? Learn why follower counts can change, how disabled or spam accounts affect totals, and what to check in Insights.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'why are my Instagram followers dropping',
      'Instagram losing followers',
      'Instagram follower count dropping',
      'why did my Instagram followers decrease',
      'Instagram followers disappearing',
      'Instagram unfollowers',
    ],
  },
  relatedServices: ['buy-instagram-followers'],
  relatedArticles: [
    'instagram-followers-vs-likes-vs-views-vs-comments',
    'how-instagram-algorithm-works',
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
    'People unfollow accounts all the time, even when an account is growing.',
    'Instagram removes disabled and spam accounts, which can cause sudden drops.',
    'Viral spikes often bring followers who leave again.',
    'Changes in content or focus naturally cause some audience turnover.',
    'Insights show followers gained and lost, which is more useful than the total.',
    'A follower drop alone is not evidence of a shadowban. Check Account Status.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why do my Instagram followers keep dropping?',
      answer:
        'The usual reasons are people unfollowing, Instagram removing disabled or spam accounts, followers from a viral post leaving, or changes in your content.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does Instagram remove fake followers?',
      answer:
        'Yes. Instagram removes disabled, fake and spam accounts, and they stop counting toward your followers. You can also remove potential spam followers yourself.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I see who unfollowed me on Instagram?',
      answer:
        'Instagram does not provide a list of people who unfollowed you. Insights show followers gained and lost over time. Avoid apps that ask for your password to show unfollowers.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Is losing followers every day normal?',
      answer:
        'Yes, some daily loss is normal for most accounts. Compare it with your own usual pattern over several weeks.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does a follower drop mean I am shadowbanned?',
      answer:
        'No. Check Account Status in your settings to see if there are any restrictions. Most drops have ordinary causes.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Does Instagram remove followers if I stop posting?',
      answer:
        'No. There is no rule that removes followers for inactivity, although long gaps can make some people lose interest.',
      schemaEligible: true,
    },
  ],
};
