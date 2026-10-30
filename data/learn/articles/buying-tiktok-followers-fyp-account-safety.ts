/**
 * Article #7 — Buying TikTok Followers: FYP & Account Safety
 * Scheduled: Monday 7 September 2026.
 * Near commercial intent, but informational: policy risk + FYP reality, not promotion.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'buying-tiktok-followers-fyp-account-safety';
const SCHEDULED_AT = '2026-09-07T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_DECEPTIVE =
  'https://newsroom.tiktok.com/en-eu/how-tiktok-counters-deceptive-behaviour';
const TIKTOK_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';
const TIKTOK_VIOLATIONS =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/content-violations-and-bans';
const TIKTOK_ACCOUNT_STATUS =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-status';
const TIKTOK_CREATOR_REWARDS =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program';
const TIKTOK_FOR_YOU =
  'https://support.tiktok.com/en/getting-started/for-you';
const TIKTOK_POST_VIEWS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/my-videos-arent-getting-views';
const TIKTOK_REMOVE_FOLLOWERS =
  'https://support.tiktok.com/en/using-tiktok/followers-and-following/removing-followers';
const TIKTOK_NOT_RECOMMENDED =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/why-is-my-account-not-being-recommended';
const TIKTOK_LIVE =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/what-is-tiktok-live';
const TIKTOK_PHISHING =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/avoid-fraudulent-message-attacks-on-tiktok';
const TIKTOK_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';

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
    'Buying TikTok followers can affect your account, and it is not a way to get more For You Page reach or to qualify for Creator Rewards. TikTok bans fake engagement and says its rules cover services that artificially increase engagement, including selling followers or likes. It also runs separate systems for account standing, content eligibility and recommendations. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-open-11',
    'What TikTok does not publish is a fixed penalty. There is no public TikTok formula that lets someone predict an exact FYP penalty from a follower purchase, and no rule saying that more followers means more reach. The sections below take account risk, FYP reach and monetization one at a time, because they have different answers.',
  ),

  heading(
    'h-policy',
    'What Does TikTok Say About Artificial Engagement?',
    2,
  ),
  paragraph(
    'p-pol-2',
    'In its explanation of how it counters deceptive behaviour, TikTok says it does not allow fake engagement, including facilitating the trade or marketing of services designed to artificially increase engagement, such as selling followers or likes. TikTok says it invests in technologies for detecting and preventing this behaviour, and its 2024 explanation reported proactive removals under its fake-engagement policies. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-own-1',
    'So claims that TikTok does not care, or that buying followers is completely safe, do not hold up. Not every account will see the same outcome, but third-party engagement activity carries platform-policy risk, and zero-risk guarantees are not credible.',
  ),
  figure(
    'fig-three-questions',
    `${IMAGE_DIR}/three-separate-questions.png`,
    'Three columns separating TikTok platform policy, account standing and For You Page distribution as related but different questions',
    'Policy risk, account enforcement and recommendation performance are related topics — but they are not identical.',
  ),

  heading('h-safe', 'Is Buying TikTok Followers “Safe”?', 2),
  paragraph(
    'p-safe-1',
    "The word “safe” is too absolute. Nobody outside TikTok controls TikTok's enforcement systems, account removals or future product changes, so a third-party service cannot truthfully promise any of the following:",
  ),
  bullets('ul-safe-promises', [
    'that it is completely safe or carries zero risk',
    'that it is TikTok approved',
    'that it is impossible to detect',
    'that your account can never be affected',
    'that the followers will stay forever',
  ]),
  paragraph(
    'p-safe-6',
    "The accurate wording is that third-party engagement services carry platform-policy risk and outcomes cannot be guaranteed.",
  ),

  heading('h-ban', 'Does TikTok Ban Accounts for Fake Engagement?', 2),
  paragraph(
    'p-ban-1',
    'TikTok enforces its Community Guidelines and can apply restrictions or bans depending on the violation and the account history. Its Help Center explains how to review violation notices and account updates. (TikTok Support)',
    [{ href: TIKTOK_VIOLATIONS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ban-5',
    'TikTok does not publish a rule saying that buying followers always results in a ban, and it does not reveal all of its detection methods. The supportable statement is narrower: artificial engagement is prohibited, TikTok can enforce that, and the exact outcome depends on circumstances it does not publish.',
  ),

  heading('h-fyp', 'Can Buying TikTok Followers Affect FYP Reach?', 2),
  paragraph(
    'p-fyp-3',
    "TikTok's For You system is personalized. TikTok says its recommendation systems use information including user interactions, content information and user information, with different factors weighted depending on the recommendation surface. (TikTok Support)",
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-4',
    'The feed each viewer sees is shaped by their own behaviour. TikTok says the For You feed can be influenced by actions such as watching, liking, sharing and commenting on similar posts. (TikTok Support)',
    [{ href: TIKTOK_FOR_YOU, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-5',
    'What TikTok does not publish is a formula such as “buy 1,000 followers and lose 30% of your FYP reach.” The supported statement is that artificial engagement can violate TikTok policy. The unsupported one is that buying a particular number of followers causes a specific FYP penalty.',
  ),
  paragraph(
    'p-more-2',
    'The opposite claim is unsupported too. TikTok describes a multi-signal personalized system rather than a ranking rule based on follower count, so be wary of anyone who says bought followers unlock the FYP, make TikTok push your videos or trigger the algorithm. Follower count is neither a guaranteed FYP boost nor a fixed FYP penalty. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-metrics',
    'Are TikTok Followers and FYP Reach the Same Metric?',
    2,
  ),
  paragraph(
    'p-met-1',
    'No. A follower count sits at the account level, while FYP distribution concerns how each video is recommended to viewers. A profile with 50,000 followers might get 3,000 views on one video and 200,000 on another, and that difference alone proves nothing about whether the followers are real.',
  ),
  paragraph(
    'p-met-11',
    'Those numbers are easier to read when you keep TikTok followers, likes and views as separate measurements. You can also see TikTok views but few followers on an account that is still being discovered through recommendations.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'TikTok views but few followers',
      },
    ],
  ),
  paragraph(
    'p-met-13',
    'TikTok says post views can fluctuate and recommends using analytics to understand content performance. Individual videos can perform differently because recommendation is personalized and content-level factors matter. (TikTok Support)',
    [{ href: TIKTOK_POST_VIEWS, label: 'TikTok Support', external: true }],
  ),
  figure(
    'fig-followers-fyp',
    `${IMAGE_DIR}/followers-not-fyp-reach.png`,
    'Diagram showing account-level followers as different from For You recommendations for an individual video',
    'Follower count does not create a guaranteed level of FYP distribution.',
  ),

  heading(
    'h-ratios',
    'Could Low-Quality Followers Hurt Engagement Ratios?',
    2,
  ),
  paragraph(
    'p-rat-2',
    'In simple arithmetic, yes. If your follower count rises while genuine interactions stay the same, any ratio calculated from follower count falls: 100 interactions on 1,000 followers is 10%, while 100 interactions on 10,000 followers is 1%. Third-party analytics ratios can therefore look worse.',
  ),
  paragraph(
    'p-rat-11',
    "It does not follow that TikTok automatically punishes accounts whose public engagement rate drops below a set percentage. TikTok does not publish a universal engagement-rate threshold controlling FYP eligibility, and a third-party ratio is not the same thing as TikTok's internal recommendation systems.",
  ),
  {
      id: 'cta-follower-service',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-tiktok-followers',
      heading: 'Understand What a Follower Service Does',
      description:
        'A follower service changes a follower-count metric. It is not a guaranteed method for improving FYP reach, search rankings, engagement or monetization eligibility.',
      label: 'View TikTok Followers',
    },


  heading(
    'h-qualify',
    'Does Buying Followers Help You Qualify for Creator Rewards?',
    2,
  ),
  paragraph(
    'p-rew-2',
    "No. TikTok's current Creator Rewards Program requirements say participating accounts must not engage in malicious or fraudulent activities such as obtaining fake video views or inflating follower counts. The program considers account standing and authenticity in addition to numeric eligibility conditions. (TikTok Support)",
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-qual-2',
    "Even where a follower threshold matters, reaching the displayed number does not mean the account meets every requirement. Buying followers is not a way to meet Creator Rewards requirements, because it conflicts directly with TikTok's published program rules.",
  ),

  heading(
    'h-live',
    'What About TikTok LIVE Follower Requirements?',
    2,
  ),
  paragraph(
    'p-live-1',
    'Bought followers are not a safe shortcut to LIVE either. A numeric threshold is not permission to manipulate that metric, and engagement policies apply alongside feature requirements. TikTok says LIVE availability depends on age requirements and a local minimum-follower threshold. (TikTok Support)',
    [{ href: TIKTOK_LIVE, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-likes-views',
    'Can Buying Likes or Views Affect an Account Too?',
    2,
  ),
  paragraph(
    'p-lv-2',
    "Yes. TikTok's fake-engagement rules are not limited to follower count. Its deceptive-behaviour guidance discusses artificially increasing engagement such as followers or likes, and Creator Rewards specifically prohibits fake video views as well as inflated follower counts. The issue is artificial engagement in general, although this still does not give a precise penalty formula. (TikTok Newsroom)",
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),

  heading('h-remove', 'Can TikTok Remove Followers?', 2),
  paragraph(
    'p-rem-1',
    "A TikTok follower number is not fixed. It changes when users unfollow or delete their accounts, when accounts are removed through platform enforcement, and through ordinary audience movement. Account owners can also remove individual followers themselves through TikTok's follower controls. (TikTok Support)",
    [{ href: TIKTOK_REMOVE_FOLLOWERS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rem-2',
    "Nobody can honestly promise that TikTok will never remove followers, or claim that it removes every purchased follower. A refill policy, where one exists, is the provider's commitment, not a TikTok guarantee. TikTok publicly describes substantial proactive enforcement against fake engagement activity and manipulative behaviour. (TikTok Newsroom)",
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),

  heading(
    'h-drop',
    'Is a Sudden Drop in Views Proof You Were Penalized for Buying Followers?',
    2,
  ),
  paragraph(
    'p-drop-2',
    'No. A drop in views alone is not enough evidence to diagnose the cause, and TikTok says video views can fluctuate. Before concluding that you are shadowbanned, check your recent analytics, Account Status, violation notifications and any recommendation eligibility notices, and whether the problem affects one video or many. TikTok provides an Account Status area for reviewing issues affecting your account or posts. (TikTok Support)',
    [{ href: TIKTOK_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-ineligible',
    'What Does “Not Eligible for Recommendation” Mean?',
    2,
  ),
  paragraph(
    'p-inel-2',
    'TikTok can mark accounts as ineligible for recommendation. Its Help Center says that when an account repeatedly posts content unsuitable for the For You feed, the account and its posts may stop appearing in For You and become harder to find. Affected users receive notifications and can review flagged content and appeal. (TikTok Support)',
    [{ href: TIKTOK_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-inel-6',
    'That is a documented recommendation restriction, but it is about content unsuitable for recommendation. TikTok does not publish a rule saying every follower purchase automatically triggers this status.',
  ),
  figure(
    'fig-account-risk',
    `${IMAGE_DIR}/before-judging-account-risk.png`,
    'Four checks before judging TikTok account risk: Account Status, recommendation status, analytics and platform rules',
    'Use real account information instead of guessing from one metric.',
  ),

  heading(
    'h-promote',
    'Is TikTok Promote the Same as Buying Followers?',
    2,
  ),
  paragraph(
    'p-pr-2',
    "No. Promote is TikTok's own advertising feature for increasing visibility and supporting audience-growth goals, and TikTok lists it among its creator growth resources. Paying TikTok directly through its advertising tools is a platform-supported product, not third-party artificial engagement. (TikTok Support)",
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-check',
    'What Should You Check Before Using Any Third-Party TikTok Service?',
    2,
  ),
  paragraph(
    'p-tr-1',
    'A follower package changes a visible count, not your For You reach, search rankings or organic engagement. If you are assessing any third-party service, check these points:',
  ),
  bullets('ul-chk', [
    'Which metric it changes. Followers, likes and views are different, so do not expect results in one from buying another.',
    'Whether it asks for your password. Do not give account credentials to third parties.',
    'Whether it claims guaranteed FYP, viral reach, organic engagement or Creator Rewards eligibility. None of these can be guaranteed.',
    'Whether its refund policy is written down. Read it rather than assuming every order qualifies.',
    "Whether it claims there is no risk at all. That goes further than TikTok's own policies support.",
  ]),
  paragraph(
    'p-chk-6',
    'TikTok itself warns users to be cautious with suspicious links and third-party sites promising free likes or fans. (TikTok Support)',
    [{ href: TIKTOK_PHISHING, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-grow',
    'How Do You Grow a TikTok Account Without Fake Engagement?',
    2,
  ),
  paragraph(
    'p-gr-1',
    "TikTok's own audience-growth guidance recommends engaging with viewers, reviewing analytics, publishing quality content regularly, collaborating with creators and using creator tools to learn what performs. (TikTok Support)",
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-gr-4',
    'Those activities address the content and audience side of growth, and changing a visible follower number does not replace that work. Search-focused publishing is covered separately in TikTok SEO.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO' }],
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'TikTok prohibits fake engagement, including services that artificially increase followers or likes.',
    'TikTok Creator Rewards explicitly prohibits inflated follower counts and fake video views.',
    'TikTok does not publish a formula saying a follower purchase causes a specific FYP penalty.',
    'Follower count does not guarantee For You reach. TikTok describes recommendation as a personalized, multi-signal system.',
    'A sudden view drop is not proof of enforcement. Check analytics, Account Status and recommendation notices instead of guessing.',
    'No third-party service can honestly promise zero TikTok policy risk or guaranteed FYP improvement.',
  ]),
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

export const BUYING_TIKTOK_FOLLOWERS_FYP_ACCOUNT_SAFETY_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-buying-tiktok-followers-fyp-account-safety',
    slug: SLUG,
    title:
      'Can Buying TikTok Followers Affect FYP Reach or Account Safety?',
    excerpt:
      'Buying TikTok followers raises two different questions that are often mixed together: can it affect your account, and can it affect your For You Page reach?',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'tiktok',
    tags: ['followers', 'algorithm', 'engagement', 'creator', 'analytics'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Editorial illustration combining a TikTok profile follower icon, a For You video feed and a shield with a question mark',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    showModifiedDate: false,
    seo: {
      title: 'Buying TikTok Followers: FYP & Account Safety Explained',
      description:
        'Can buying TikTok followers affect FYP reach or account safety? Learn what TikTok says about fake engagement, recommendations and account status.',
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'does buying TikTok followers affect your account',
        'buying TikTok followers safe',
        'TikTok followers FYP',
        'fake followers TikTok',
        'TikTok account safety followers',
        'TikTok artificial engagement',
      ],
    },
    relatedServices: ['buy-tiktok-followers'],
    relatedArticles: [
      'tiktok-followers-vs-likes-vs-views',
      'tiktok-views-but-no-followers',
      'tiktok-seo',
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
      'TikTok prohibits fake engagement.',
      'Follower count and FYP distribution are not the same thing.',
      "TikTok's recommendation systems use multiple signals and personalization.",
      'No provider can honestly guarantee that a follower purchase is completely risk-free.',
      'No provider can honestly guarantee that purchasing followers will improve FYP reach.',
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'Is buying TikTok followers against TikTok rules?',
        answer:
          'TikTok publicly prohibits fake engagement and specifically mentions facilitating or marketing services that artificially increase engagement such as followers or likes.',
        schemaEligible: true,
      },
      {
        id: 'faq-2',
        question: 'Will TikTok ban me if I buy followers?',
        answer:
          'TikTok has enforcement systems for policy violations, but it does not publish a rule stating that every follower purchase automatically causes an immediate account ban. Artificial engagement is nevertheless an area TikTok explicitly restricts.',
        schemaEligible: true,
      },
      {
        id: 'faq-3',
        question: 'Does buying TikTok followers reduce FYP reach?',
        answer:
          'TikTok does not publish a fixed formula connecting a particular follower purchase with a particular reduction in FYP reach. Its For You recommendations use multiple personalized signals.',
        schemaEligible: true,
      },
      {
        id: 'faq-4',
        question: 'Do more TikTok followers improve FYP reach?',
        answer:
          'There is no TikTok guarantee that increasing follower count automatically improves For You distribution. TikTok describes recommendation as a multi-signal personalized system rather than a follower-count formula.',
        schemaEligible: true,
      },
      {
        id: 'faq-5',
        question: 'Can purchased followers help me enter Creator Rewards?',
        answer:
          'TikTok\'s Creator Rewards rules explicitly prohibit fraudulent activity such as inflating follower counts or acquiring fake video views. Buying followers is therefore not a way to meet Creator Rewards requirements.',
        schemaEligible: true,
      },
      {
        id: 'faq-6',
        question: 'How do I know if TikTok has restricted my account?',
        answer:
          "Check TikTok's Account Status, violation notifications and any recommendation-ineligibility notices. TikTok provides specific areas for reviewing these issues and appealing recommendation decisions.",
        schemaEligible: true,
      },
    ],
  };
