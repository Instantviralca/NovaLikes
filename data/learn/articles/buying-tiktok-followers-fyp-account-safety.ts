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
    'Buying TikTok followers raises two different questions that are often mixed together:',
  ),
  paragraph('p-open-2', 'Can it affect your account?'),
  paragraph('p-open-3', 'and:'),
  paragraph('p-open-4', 'Can it affect your For You Page reach?'),
  paragraph('p-open-5', 'Those questions do not have the same answer.'),
  paragraph(
    'p-open-6',
    'TikTok publicly prohibits fake engagement and says its rules cover services that artificially increase engagement, including followers and likes. TikTok also has separate systems for account standing, content eligibility and recommendations. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-open-7',
    'At the same time, TikTok does not publish a simple formula saying:',
  ),
  paragraph(
    'p-open-8',
    '“Buying X followers automatically reduces your FYP reach by Y%.”',
  ),
  paragraph(
    'p-open-9',
    'That kind of claim would go beyond what TikTok publicly documents.',
  ),
  paragraph('p-open-10', 'So the accurate answer is more nuanced:'),
  paragraph(
    'p-open-11',
    'Using third-party follower services can create platform-policy risk, but there is no public TikTok formula that lets someone predict an exact FYP penalty from a follower purchase.',
  ),
  paragraph('p-open-12', 'That distinction matters.'),

  heading(
    'h-policy',
    'What Does TikTok Say About Artificial Engagement?',
    2,
  ),
  paragraph('p-pol-1', "TikTok's public policy position is clear."),
  paragraph(
    'p-pol-2',
    'In its explanation of how it counters deceptive behaviour, TikTok says it does not allow fake engagement, including facilitating the trade or marketing of services designed to artificially increase engagement, such as selling followers or likes. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-pol-3',
    'This is important because discussions about follower services often make claims such as:',
  ),
  paragraph('p-pol-4', '“TikTok doesn\'t care.”'),
  paragraph('p-pol-5', 'or:'),
  paragraph('p-pol-6', '“Buying followers is completely safe.”'),
  paragraph('p-pol-7', 'Neither should be presented as fact.'),
  paragraph(
    'p-pol-8',
    'TikTok has explicitly documented a policy against artificial/fake engagement. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),

  heading(
    'h-owner',
    'What Does That Mean for an Account Owner?',
    3,
  ),
  paragraph(
    'p-own-1',
    'It means you should understand that third-party engagement activity can carry platform-policy risk.',
  ),
  paragraph(
    'p-own-2',
    'That does not mean every account will experience the same outcome.',
  ),
  paragraph(
    'p-own-3',
    'It also does not mean we can predict exactly what TikTok will do in every case.',
  ),
  paragraph(
    'p-own-4',
    'But it does mean that zero-risk guarantees are not credible.',
  ),
  figure(
    'fig-three-questions',
    `${IMAGE_DIR}/three-separate-questions.png`,
    'Three columns separating TikTok platform policy, account standing and For You Page distribution as related but different questions',
    'Policy risk, account enforcement and recommendation performance are related topics — but they are not identical.',
  ),

  heading('h-safe', 'Is Buying TikTok Followers “Safe”?', 2),
  paragraph('p-safe-1', 'The word “safe” is too absolute.'),
  paragraph(
    'p-safe-2',
    "Nobody outside TikTok controls TikTok's enforcement systems.",
  ),
  paragraph(
    'p-safe-3',
    'A third-party service therefore cannot truthfully promise:',
  ),
  bullets('ul-safe-promises', [
    'completely safe',
    'zero risk',
    'TikTok approved',
    'impossible to detect',
    'or that your account can never be affected',
  ]),
  paragraph(
    'p-safe-4',
    'TikTok\'s public materials show that it actively works against deceptive behaviour and fake engagement. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph('p-safe-5', 'The more responsible wording is:'),
  paragraph(
    'p-safe-6',
    'There can be platform-policy risk when using third-party engagement services, and outcomes cannot be guaranteed.',
  ),
  paragraph('p-safe-7', 'That is less exciting marketing copy.'),
  paragraph('p-safe-8', 'It is also more accurate.'),

  heading('h-ban', 'Does TikTok Ban Accounts for Fake Engagement?', 2),
  paragraph(
    'p-ban-1',
    'TikTok has enforcement systems covering Community Guidelines violations and can apply restrictions or bans depending on violations and account history. Its Help Center provides a process for reviewing violation notices and account updates. (TikTok Support)',
    [{ href: TIKTOK_VIOLATIONS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ban-2',
    'TikTok also provides an Account Status area where users can review issues affecting their account or posts. (TikTok Support)',
    [{ href: TIKTOK_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-ban-3', 'However, it would be inaccurate to claim:'),
  paragraph('p-ban-4', '“Buying followers always results in a ban.”'),
  paragraph('p-ban-5', 'TikTok does not publish such a universal rule.'),
  paragraph('p-ban-6', 'The more supportable statement is:'),
  paragraph(
    'p-ban-7',
    'Artificial engagement is prohibited, and TikTok has enforcement mechanisms for policy violations.',
  ),
  paragraph(
    'p-ban-8',
    'The exact outcome can depend on circumstances TikTok does not publicly expose in a simple formula.',
  ),

  heading('h-rewards', 'What About TikTok Creator Rewards?', 2),
  paragraph(
    'p-rew-1',
    'This is an especially important distinction for creators interested in monetization.',
  ),
  paragraph(
    'p-rew-2',
    "TikTok's current Creator Rewards Program requirements explicitly say participating accounts must not engage in malicious or fraudulent activities such as obtaining fake video views or inflating follower counts. (TikTok Support)",
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rew-3',
    'So if your goal is Creator Rewards eligibility or participation, artificial follower inflation is directly relevant to TikTok\'s published program rules.',
  ),
  paragraph('p-rew-4', 'You should not assume:'),
  paragraph('p-rew-5', '“The follower number is all that matters.”'),
  paragraph(
    'p-rew-6',
    'The program considers account standing and authenticity requirements in addition to numeric eligibility conditions. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),

  heading('h-fyp', 'Can Buying TikTok Followers Affect the FYP?', 2),
  paragraph(
    'p-fyp-1',
    'This is where a lot of online advice becomes speculative.',
  ),
  paragraph('p-fyp-2', "TikTok's For You system is personalized."),
  paragraph(
    'p-fyp-3',
    'TikTok says its recommendation systems use information including user interactions, content information and user information, with different factors weighted depending on the recommendation surface. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-4',
    'The For You feed itself can be influenced by actions such as watching, liking, sharing and commenting on similar posts. (TikTok Support)',
    [{ href: TIKTOK_FOR_YOU, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-5',
    'What TikTok does not publicly provide is a formula like:',
  ),
  {
    id: 'bq-formula',
    type: 'blockquote',
    text: 'Purchase 1,000 followers → lose 30% FYP reach.',
    order: nextOrder(),
  },
  paragraph(
    'p-fyp-6',
    "That formula does not exist in TikTok's public documentation.",
  ),
  paragraph('p-fyp-7', 'So we should separate two statements:'),
  heading('h-stmt-1', 'Statement 1', 3),
  paragraph(
    'p-stmt-1',
    'Artificial engagement can violate TikTok policy. Supported. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  heading('h-stmt-2', 'Statement 2', 3),
  paragraph(
    'p-stmt-2',
    'Buying a particular number of followers causes a specific FYP penalty. Not supported by a public TikTok formula.',
  ),
  paragraph(
    'p-fyp-8',
    'That distinction should remain clear throughout this article.',
  ),

  heading(
    'h-metrics',
    'Followers and FYP Reach Are Different Metrics',
    2,
  ),
  paragraph(
    'p-met-1',
    'A follower count sits at the account level.',
  ),
  paragraph(
    'p-met-2',
    'FYP distribution concerns how individual content is recommended to viewers.',
  ),
  paragraph(
    'p-met-3',
    'These concepts can interact within the broader platform, but they are not interchangeable.',
  ),
  paragraph('p-met-4', 'A profile might have:'),
  paragraph('p-met-5', '50,000 followers'),
  paragraph('p-met-6', 'while one video receives:'),
  paragraph('p-met-7', '3,000 views'),
  paragraph('p-met-8', 'and another receives:'),
  paragraph('p-met-9', '200,000 views.'),
  paragraph(
    'p-met-10',
    'That difference alone does not prove anything about follower authenticity.',
  ),
  paragraph(
    'p-met-11',
    'Those metrics are easier to interpret when you keep TikTok followers, likes and views as separate measurements.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
    ],
  ),
  paragraph(
    'p-met-12',
    'You can also see TikTok views but few followers on an account that is still being discovered through recommendations.',
    [
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'TikTok views but few followers',
      },
    ],
  ),
  paragraph(
    'p-met-13',
    'TikTok itself says post views can fluctuate and recommends using analytics to understand content performance. (TikTok Support)',
    [{ href: TIKTOK_POST_VIEWS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-met-14',
    'Individual videos can perform differently because recommendation is personalized and content-level factors matter. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  figure(
    'fig-followers-fyp',
    `${IMAGE_DIR}/followers-not-fyp-reach.png`,
    'Diagram showing account-level followers as different from For You recommendations for an individual video',
    'Follower count does not create a guaranteed level of FYP distribution.',
  ),

  heading(
    'h-more-fyp',
    'Does Having More Followers Automatically Increase FYP Reach?',
    2,
  ),
  paragraph(
    'p-more-1',
    'No such guarantee is published by TikTok.',
  ),
  paragraph(
    'p-more-2',
    "TikTok's recommendation documentation describes a multi-signal personalized system rather than a simple ranking rule based on follower count. (TikTok Support)",
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-more-3',
    'This means NovaLikes should never say:',
  ),
  bullets('ul-more-never', [
    'Buy followers to unlock the FYP',
    'More followers make TikTok push your videos',
    'Followers trigger the algorithm',
  ]),
  paragraph(
    'p-more-4',
    'Those are unsupported claims.',
  ),
  paragraph(
    'p-more-5',
    'Followers and recommendation reach should be presented separately.',
  ),

  heading(
    'h-ratios',
    'Could Low-Quality Followers Hurt Engagement Ratios?',
    2,
  ),
  paragraph('p-rat-1', 'This requires careful wording.'),
  paragraph(
    'p-rat-2',
    'Mathematically, if your follower number changes while genuine interactions remain the same, simple ratios calculated using follower count can change.',
  ),
  paragraph('p-rat-3', 'For example:'),
  paragraph('p-rat-4', '100 interactions / 1,000 followers'),
  paragraph('p-rat-5', 'and:'),
  paragraph('p-rat-6', '100 interactions / 10,000 followers'),
  paragraph('p-rat-7', 'produce different percentages.'),
  paragraph('p-rat-8', 'That is arithmetic.'),
  paragraph(
    'p-rat-9',
    'But you should not leap from that arithmetic to:',
  ),
  paragraph(
    'p-rat-10',
    '“TikTok automatically punishes accounts because their public engagement rate falls below X%.”',
  ),
  paragraph(
    'p-rat-11',
    'TikTok does not publish a universal engagement-rate threshold controlling FYP eligibility.',
  ),
  paragraph('p-rat-12', 'So there are two separate concepts:'),
  paragraph(
    'p-rat-13',
    'Third-party analytics ratios may look different.',
  ),
  paragraph('p-rat-14', 'and:'),
  paragraph(
    'p-rat-15',
    "TikTok's internal recommendation systems.",
  ),
  paragraph(
    'p-rat-16',
    'Do not pretend they are the same system.',
  ),

  heading('h-remove', 'Can TikTok Remove Followers?', 2),
  paragraph(
    'p-rem-1',
    "Users themselves can remove individual followers from their accounts through TikTok's follower controls. (TikTok Support)",
    [{ href: TIKTOK_REMOVE_FOLLOWERS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rem-2',
    'TikTok also publicly describes substantial proactive enforcement against fake engagement activity and manipulative behaviour. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph('p-rem-3', 'However, do not tell customers:'),
  paragraph(
    'p-rem-4',
    '“TikTok will definitely never remove followers.”',
  ),
  paragraph('p-rem-5', 'Nor should you claim:'),
  paragraph(
    'p-rem-6',
    '“TikTok removes every purchased follower.”',
  ),
  paragraph('p-rem-7', 'Neither absolute is supportable.'),
  paragraph(
    'p-rem-8',
    'Follower counts on social platforms can change for multiple reasons.',
  ),

  heading('h-change', 'Why Follower Counts Can Change', 2),
  paragraph(
    'p-chg-1',
    'A TikTok follower number is not permanently fixed.',
  ),
  paragraph(
    'p-chg-2',
    'Possible reasons for changes can include:',
  ),
  bullets('ul-chg', [
    'users unfollowing,',
    'accounts being removed,',
    'users deleting accounts,',
    'platform enforcement,',
    'or ordinary audience movement.',
  ]),
  paragraph(
    'p-chg-3',
    'Because TikTok maintains account and enforcement systems, creators should not assume every follower count will remain unchanged forever. (TikTok Support)',
    [{ href: TIKTOK_VIOLATIONS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-chg-4',
    'This is why guarantees about permanent follower retention should be treated carefully unless a service has a clearly defined contractual refill policy.',
  ),

  heading(
    'h-drop',
    'Is a Sudden Drop in Views Proof You Were Penalized for Buying Followers?',
    2,
  ),
  paragraph('p-drop-1', 'No.'),
  paragraph(
    'p-drop-2',
    'A drop in views alone is not enough evidence to diagnose the cause.',
  ),
  paragraph(
    'p-drop-3',
    'TikTok itself says video views can fluctuate and recommends reviewing analytics to understand performance. (TikTok Support)',
    [{ href: TIKTOK_POST_VIEWS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-drop-4',
    'If performance changes, investigate actual account information rather than immediately concluding:',
  ),
  paragraph('p-drop-5', '“I am shadowbanned.”'),
  paragraph('p-drop-6', 'Useful checks include:'),
  bullets('ul-drop-checks', [
    'recent analytics,',
    'Account Status,',
    'violation notifications,',
    'recommendation eligibility notices,',
    'and whether the problem affects one video or many videos.',
  ]),
  paragraph(
    'p-drop-7',
    'TikTok provides dedicated tools for reviewing account status and recommendation eligibility. (TikTok Support)',
    [{ href: TIKTOK_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-ineligible',
    'What Does “Not Eligible for Recommendation” Mean?',
    2,
  ),
  paragraph(
    'p-inel-1',
    'TikTok can mark accounts as ineligible for recommendation.',
  ),
  paragraph(
    'p-inel-2',
    'Its current Help Center says that when an account repeatedly posts content unsuitable for the For You feed, the account and its posts may stop appearing in For You and become harder to find. TikTok says affected users receive notifications and can review flagged content and appeal. (TikTok Support)',
    [{ href: TIKTOK_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-inel-3',
    'That is an actual documented recommendation restriction.',
  ),
  paragraph('p-inel-4', 'But note what the documentation says:'),
  paragraph(
    'p-inel-5',
    'it discusses content unsuitable for recommendation.',
  ),
  paragraph(
    'p-inel-6',
    'It does not provide a public rule saying every follower purchase automatically triggers this exact status.',
  ),
  paragraph('p-inel-7', 'Do not merge those claims.'),

  heading('h-transparency', 'Service Transparency', 2),
  paragraph(
    'p-tr-1',
    'If you are considering a TikTok follower service, evaluate it for what it actually provides.',
  ),
  paragraph(
    'p-tr-2',
    'A TikTok followers package should be understood as a follower-count service.',
    [{ href: '/buy-tiktok-followers', label: 'TikTok followers' }],
  ),
  paragraph(
    'p-tr-3',
    'It should not be represented as a guaranteed method for:',
  ),
  bullets('ul-tr-not', [
    'reaching the For You page',
    'improving TikTok Search rankings',
    'making videos viral',
    'qualifying safely for Creator Rewards',
    'increasing organic engagement',
    'producing sales',
    'avoiding TikTok enforcement',
  ]),
  {
    id: 'cta-follower-service',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-tiktok-followers',
    heading: 'Understand What a Follower Service Does',
    description:
      'A follower service changes a follower-count metric. It should not be treated as a guaranteed method for improving FYP reach, search rankings, engagement or monetization eligibility.',
    label: 'View TikTok Followers',
  },

  heading(
    'h-qualify',
    'Does Buying Followers Help You Qualify for Creator Rewards?',
    2,
  ),
  paragraph(
    'p-qual-1',
    'This is one of the clearest areas where caution is necessary.',
  ),
  paragraph(
    'p-qual-2',
    'Even if a numeric follower threshold matters for a TikTok feature, simply reaching the displayed number does not necessarily mean the account satisfies all eligibility requirements.',
  ),
  paragraph(
    'p-qual-3',
    "TikTok's Creator Rewards rules explicitly prohibit fraudulent behaviour including inflating follower counts and acquiring fake video views. (TikTok Support)",
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-qual-4',
    'Therefore, the article should never recommend purchasing followers as a method for meeting Creator Rewards requirements.',
  ),
  paragraph(
    'p-qual-5',
    "That would conflict directly with TikTok's published program rules.",
  ),

  heading(
    'h-live',
    'What About TikTok LIVE Follower Requirements?',
    2,
  ),
  paragraph(
    'p-live-1',
    'TikTok says LIVE availability depends on age requirements and a local minimum-follower threshold. (TikTok Support)',
    [{ href: TIKTOK_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-live-2',
    'That does not mean third-party follower purchases should be treated as a safe shortcut to eligibility.',
  ),
  paragraph(
    'p-live-3',
    'Platform feature requirements and platform engagement policies need to be considered together.',
  ),
  paragraph(
    'p-live-4',
    'A numeric threshold is not permission to manipulate that metric.',
  ),
  figure(
    'fig-account-risk',
    `${IMAGE_DIR}/before-judging-account-risk.png`,
    'Four checks before judging TikTok account risk: Account Status, recommendation status, analytics and platform rules',
    'Use real account information instead of guessing from one metric.',
  ),

  heading('h-no-drop', 'Is It Possible to Guarantee “No Drop”?', 2),
  paragraph(
    'p-nd-1',
    'No responsible provider should guarantee what another platform will permanently display.',
  ),
  paragraph(
    'p-nd-2',
    'TikTok controls TikTok accounts and platform data.',
  ),
  paragraph(
    'p-nd-3',
    'Third-party services do not control:',
  ),
  bullets('ul-nd', [
    'account removals,',
    'user behaviour,',
    'TikTok enforcement,',
    'future product changes,',
    'or recommendation systems.',
  ]),
  paragraph(
    'p-nd-4',
    'This is why wording such as:',
  ),
  paragraph(
    'p-nd-5',
    '“permanent followers guaranteed forever”',
  ),
  paragraph(
    'p-nd-6',
    'should be avoided unless a clearly defined service policy genuinely supports what is being promised.',
  ),
  paragraph(
    'p-nd-7',
    'A refill policy, where one exists, is different from claiming TikTok itself guarantees retention.',
  ),

  heading('h-no-ban', 'Is It Possible to Guarantee “No Ban”?', 2),
  paragraph('p-nb-1', 'No.'),
  paragraph(
    'p-nb-2',
    'A third-party provider does not control TikTok enforcement.',
  ),
  paragraph(
    'p-nb-3',
    'TikTok has published policies against fake engagement and operates content/account enforcement systems. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-nb-4',
    'A provider can explain its own process.',
  ),
  paragraph(
    'p-nb-5',
    'It cannot truthfully guarantee:',
  ),
  paragraph('p-nb-6', 'TikTok will never take action.'),
  paragraph(
    'p-nb-7',
    'This is why NovaLikes copy should continue avoiding absolute phrases such as:',
  ),
  bullets('ul-nb', [
    'completely safe',
    'zero account risk',
    'undetectable',
    'TikTok approved',
  ]),

  heading(
    'h-detect',
    'Does TikTok Know When Engagement Is Artificial?',
    2,
  ),
  paragraph(
    'p-det-1',
    'TikTok publicly says it invests in technologies for detecting and preventing deceptive behaviour and fake engagement. Its 2024 explanation reported proactive removals under fake-engagement policies. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-det-2',
    'TikTok does not publicly reveal all detection methods.',
  ),
  paragraph('p-det-3', 'That is expected.'),
  paragraph(
    'p-det-4',
    'Platforms generally do not publish exact enforcement systems in a way that would make them easy to evade.',
  ),
  paragraph(
    'p-det-5',
    'The useful takeaway for users is not:',
  ),
  paragraph('p-det-6', '“How can I beat detection?”'),
  paragraph('p-det-7', 'It is:'),
  paragraph(
    'p-det-8',
    '“I should understand that artificial engagement is a policy-controlled area.”',
  ),

  heading(
    'h-check',
    'What Should You Check Before Using Any Third-Party TikTok Service?',
    2,
  ),
  paragraph('p-chk-1', 'Focus on transparency.'),
  heading('h-check-1', '1. What Metric Are You Actually Purchasing?', 3),
  paragraph('p-chk-2', 'Followers? Likes? Views?'),
  paragraph('p-chk-3', 'They are different metrics.'),
  paragraph(
    'p-chk-4',
    'Do not buy one while expecting guaranteed results in another.',
  ),
  heading(
    'h-check-2',
    '2. Does the Provider Ask for Your Password?',
    3,
  ),
  paragraph(
    'p-chk-5',
    'Avoid giving account credentials to unnecessary third parties.',
  ),
  paragraph(
    'p-chk-6',
    'TikTok itself warns users to be cautious with suspicious links and third-party sites promising free likes or fans. (TikTok Support)',
    [{ href: TIKTOK_PHISHING, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-chk-7',
    'For NovaLikes-supported ordering flows, the service should request only the public profile/content information required for the selected service.',
  ),
  heading('h-check-3', '3. Are There Unrealistic Algorithm Claims?', 3),
  paragraph('p-chk-8', 'Be cautious with:'),
  bullets('ul-chk-claims', [
    '“Guaranteed FYP”',
    '“Guaranteed viral”',
    '“Guaranteed engagement”',
    '“Guaranteed organic reach”',
    '“Guaranteed Creator Rewards eligibility”',
  ]),
  paragraph(
    'p-chk-9',
    'Those promises cannot be responsibly guaranteed.',
  ),
  heading('h-check-4', '4. Is the Refund Policy Clear?', 3),
  paragraph(
    'p-chk-10',
    'Read the actual policy instead of assuming every order qualifies for every outcome.',
  ),
  heading(
    'h-check-5',
    '5. Does the Provider Explain Platform Risk?',
    3,
  ),
  paragraph('p-chk-11', 'A provider saying:'),
  paragraph(
    'p-chk-12',
    '“There is absolutely no risk under any circumstances”',
  ),
  paragraph(
    'p-chk-13',
    "is making a much stronger claim than TikTok's own policies support.",
  ),

  heading(
    'h-likes-views',
    'Can Buying Likes or Views Affect an Account Too?',
    2,
  ),
  paragraph(
    'p-lv-1',
    "TikTok's fake-engagement rules are not limited only to follower count.",
  ),
  paragraph(
    'p-lv-2',
    "TikTok's published deceptive-behaviour guidance explicitly discusses artificially increasing engagement such as followers or likes, and Creator Rewards specifically prohibits fake video views and inflated follower counts. (TikTok Newsroom)",
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph('p-lv-3', 'So the underlying issue is broader:'),
  paragraph('p-lv-4', 'artificial engagement'),
  paragraph(
    'p-lv-5',
    'rather than one specific public metric.',
  ),
  paragraph(
    'p-lv-6',
    'Again, that does not give us a precise penalty formula.',
  ),
  paragraph('p-lv-7', 'It establishes the policy direction.'),

  heading(
    'h-promote',
    'Is TikTok Promote the Same as Buying Followers?',
    2,
  ),
  paragraph('p-pr-1', 'No.'),
  paragraph(
    'p-pr-2',
    'TikTok has its own official Promote advertising feature for increasing visibility and supporting audience-growth goals. TikTok lists Promote among its creator growth resources. (TikTok Support)',
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pr-3',
    'Official paid promotion and third-party artificial engagement should not be described as the same thing.',
  ),
  paragraph(
    'p-pr-4',
    "If someone's goal is paying TikTok directly to promote content through TikTok's advertising tools, that is a separate platform-supported product.",
  ),

  heading(
    'h-grow',
    'How Should You Grow a TikTok Account Alongside Visible Metrics?',
    2,
  ),
  paragraph(
    'p-gr-1',
    "TikTok's own audience-growth guidance recommends practices such as:",
  ),
  bullets('ul-gr', [
    'engaging with viewers,',
    'reviewing analytics,',
    'publishing quality content regularly,',
    'collaborating with creators,',
    'and using creator tools to learn what performs.',
  ]),
  paragraph(
    'p-gr-2',
    '(TikTok Support)',
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-gr-3',
    'Those activities address the content and audience side of growth.',
  ),
  paragraph(
    'p-gr-4',
    'They should not be replaced by the assumption that changing a visible follower number will automatically improve content performance.',
  ),
  paragraph(
    'p-gr-5',
    'Search-focused publishing is covered separately in TikTok SEO.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO' }],
  ),
  paragraph(
    'p-gr-6',
    'A sustainable account strategy should still focus on:',
  ),
  bullets('ul-gr-focus', [
    'content,',
    'audience fit,',
    'profile clarity,',
    'consistency,',
    'search demand,',
    'analytics,',
    'and genuine interaction.',
  ]),

  heading(
    'h-separate',
    'Followers, Reach and Safety Should Be Evaluated Separately',
    2,
  ),
  paragraph(
    'p-sep-1',
    'One of the biggest mistakes in this topic is combining everything into one statement:',
  ),
  paragraph(
    'p-sep-2',
    '“Buy followers → algorithm boost → more FYP reach → safe account.”',
  ),
  paragraph('p-sep-3', 'There is no support for that chain.'),
  paragraph('p-sep-4', 'A more accurate framework is:'),
  heading('h-fw-fol', 'Followers', 3),
  paragraph('p-sep-5', 'A visible account-level metric.'),
  heading('h-fw-fyp', 'FYP Reach', 3),
  paragraph(
    'p-sep-6',
    'A personalized content-recommendation outcome driven by multiple signals. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  heading('h-fw-safe', 'Account Safety', 3),
  paragraph(
    'p-sep-7',
    'Related to account security, policy compliance and platform enforcement. TikTok provides account-status and enforcement tools for reviewing these issues. (TikTok Support)',
    [{ href: TIKTOK_VIOLATIONS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-sep-8',
    'These areas can exist on the same account without being the same thing.',
  ),

  heading(
    'h-account',
    'Can Buying TikTok Followers Affect Your Account?',
    2,
  ),
  paragraph('p-acc-1', 'The most accurate answer is:'),
  paragraph(
    'p-acc-2',
    'It can introduce platform-policy risk because TikTok prohibits fake/artificial engagement. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph(
    'p-acc-3',
    'What cannot be accurately predicted is:',
  ),
  bullets('ul-acc', [
    'the exact enforcement outcome,',
    'the exact timing,',
    'or an exact FYP impact.',
  ]),
  paragraph(
    'p-acc-4',
    'TikTok does not publish a universal formula connecting a particular follower purchase with a particular recommendation penalty.',
  ),
  paragraph(
    'p-acc-5',
    'That means both extremes should be avoided.',
  ),
  paragraph('p-acc-6', 'Not:'),
  paragraph('p-acc-7', '“Nothing can ever happen.”'),
  paragraph('p-acc-8', 'And not:'),
  paragraph(
    'p-acc-9',
    '“Your account will definitely be banned immediately.”',
  ),
  paragraph('p-acc-10', 'Neither is sufficiently supported.'),

  heading(
    'h-fyp-answer',
    'Can Buying TikTok Followers Affect FYP Reach?',
    2,
  ),
  paragraph(
    'p-fa-1',
    'There is no public TikTok rule that lets us state a guaranteed direct percentage impact.',
  ),
  paragraph(
    'p-fa-2',
    'TikTok describes For You recommendations as personalized and influenced by multiple factors, including interactions and content information. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fa-3',
    'Therefore, follower count alone should not be treated as:',
  ),
  bullets('ul-fa', [
    'a guaranteed FYP boost,',
    'or a guaranteed FYP penalty formula.',
  ]),
  paragraph(
    'p-fa-4',
    "If your FYP performance changes, use TikTok's analytics, Account Status and recommendation notices to investigate the actual account rather than relying on assumptions. (TikTok Support)",
    [{ href: TIKTOK_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),

  heading('h-practical', 'The Practical Answer', 2),
  paragraph(
    'p-prac-1',
    "If you're considering buying TikTok followers, understand what you're actually doing.",
  ),
  paragraph(
    'p-prac-2',
    'You are changing a visible account metric through a third-party service.',
  ),
  paragraph(
    'p-prac-3',
    "You are not purchasing control of TikTok's recommendation system.",
  ),
  paragraph('p-prac-4', 'You are not guaranteed:'),
  bullets('ul-prac', [
    'more FYP reach,',
    'better search rankings,',
    'more organic engagement,',
    'Creator Rewards eligibility,',
    'sales,',
    'or account safety.',
  ]),
  paragraph(
    'p-prac-5',
    'TikTok explicitly restricts fake engagement and maintains systems for account enforcement and recommendation eligibility. (TikTok Newsroom)',
    [{ href: TIKTOK_DECEPTIVE, label: 'TikTok Newsroom', external: true }],
  ),
  paragraph('p-prac-6', 'So the responsible approach is:'),
  bullets('ul-prac-approach', [
    'understand the policy risk,',
    'avoid exaggerated promises,',
    'protect your credentials,',
    'keep follower metrics separate from algorithm claims,',
    'and continue building content based on audience response and actual analytics.',
  ]),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'TikTok prohibits fake/artificial engagement, including services that artificially increase followers or likes.',
    'TikTok Creator Rewards explicitly prohibits inflated follower counts and fake video views.',
    'TikTok does not publish a simple formula saying a follower purchase causes a specific FYP penalty.',
    'Follower count does not guarantee For You reach. TikTok describes recommendation as a personalized, multi-signal system.',
    'A sudden view drop alone is not proof of an enforcement action. TikTok recommends reviewing analytics when views fluctuate.',
    'Account Status and recommendation notices are more useful than guessing whether an account has been penalized.',
    'No third-party service should promise zero TikTok policy risk or guaranteed FYP improvement.',
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
          'TikTok\'s Creator Rewards rules explicitly prohibit fraudulent activity such as inflating follower counts or acquiring fake video views. Buying followers should therefore not be recommended as a method for satisfying Creator Rewards requirements.',
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
