/**
 * Article #22 — Why Do TikTok Followers Drop? Common Causes Explained
 * Scheduled: Monday 12 October 2026.
 * Informational / retention-problem cluster. Not a shadowban diagnosis.
 * Primary CTA: /buy-tiktok-followers
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'why-tiktok-followers-drop';
const SCHEDULED_AT = '2026-10-12T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_FOLLOW_UNFOLLOW =
  'https://support.tiktok.com/en/using-tiktok/followers-and-following/following-and-unfollowing';
const TT_ACCOUNT_TYPES =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/switching-to-a-creator-or-business-account';
const TT_INACTIVE =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/inactive-account-policy';
const TT_ACCOUNT_STATUS =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-status';
const TT_NOT_RECOMMENDED =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/why-is-my-account-not-being-recommended';
const TT_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';
const TT_REMOVE_FOLLOWERS =
  'https://support.tiktok.com/en/using-tiktok/followers-and-following/removing-followers';
const TT_FOLLOWERS_FOLLOWING =
  'https://support.tiktok.com/en/using-tiktok/followers-and-following';
const TT_PRIVATE =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/making-your-account-public-or-private';
const TT_CREATOR_REWARDS =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program';
const TT_THIRD_PARTY =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/connect-to-third-party-apps';
const TT_SEARCH_INSIGHTS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TT_REPORT_PROBLEM =
  'https://support.tiktok.com/en/using-tiktok/report-a-problem/report-a-problem';
const TT_GROW_AUDIENCE =
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

function numbered(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'numbered_list', items, order: nextOrder() };
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
    'You open TikTok and notice yesterday you had 8,420 followers and today you have 8,376.',
  ),
  paragraph('p-open-2', 'What happened?'),
  paragraph(
    'p-open-3',
    'The first instinct is often to blame the algorithm, a shadowban, a fake-follower purge or some mysterious account penalty.',
  ),
  paragraph(
    'p-open-4',
    'But a falling TikTok follower count does not tell you the cause by itself.',
  ),
  paragraph(
    'p-open-5',
    'TikTok gives users the ability to unfollow accounts whenever they choose. Creators can also manually remove followers from their own accounts. (TikTok Support)',
    [{ href: TT_FOLLOW_UNFOLLOW, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-6',
    'Your audience can therefore change naturally.',
  ),
  paragraph('p-open-7', 'Followers may leave because:'),
  bullets('ul-open-why', [
    'your content changed,',
    'their interests changed,',
    'they followed after one unusual viral video,',
    'your account stopped matching what they originally expected,',
    'or they simply no longer want your posts in their Following experience.',
  ]),
  paragraph(
    'p-open-8',
    "There can also be platform or account-level changes worth investigating, but these should be checked through TikTok's actual tools rather than assumed from a follower number.",
  ),
  paragraph(
    'p-open-9',
    "TikTok's account documentation says Analytics provides follower-related metrics alongside post and other performance information, and that at least one public post is required to access Analytics. (TikTok Support)",
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-10',
    'The useful question is not why TikTok is stealing your followers.',
  ),
  paragraph(
    'p-open-11',
    'It is what changed in the audience, content or account around the same time as the follower loss.',
  ),
  paragraph(
    'p-open-12',
    'There is no need to diagnose every follower decline as a penalty.',
  ),

  heading('h-1', '1. People Can Simply Unfollow You', 2),
  paragraph(
    'p-1-1',
    'This is the most direct cause.',
  ),
  paragraph(
    'p-1-2',
    'TikTok has a normal unfollow feature.',
  ),
  paragraph(
    'p-1-3',
    "A user can open another account's profile and tap the Following button to unfollow it. (TikTok Support)",
    [{ href: TT_FOLLOW_UNFOLLOW, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-1-4',
    'That means follower counts are naturally capable of moving in both directions.',
  ),
  paragraph(
    'p-1-5',
    'People follow. People unfollow. There does not need to be a bug.',
  ),
  heading('h-1-why', 'Why Might Someone Unfollow?', 3),
  paragraph('p-1-6', 'Maybe:'),
  bullets('ul-1-why', [
    'they no longer care about the topic,',
    'they followed after one specific video,',
    'you changed niches,',
    'you started posting too much content they do not want,',
    'you stopped posting the content they originally liked,',
    'or they are simply changing who they follow.',
  ]),
  paragraph(
    'p-1-7',
    "TikTok does not provide creators with control over another person's decision to continue following.",
  ),
  paragraph(
    'p-1-8',
    'And that is normal. A follower is not a permanent subscription contract.',
  ),
  figure(
    'fig-change',
    `${IMAGE_DIR}/why-followers-change.png`,
    'TikTok follower counts change through audience choice, content fit and account direction, not only through platform penalties',
    'Follower totals move because audiences move.',
  ),

  heading('h-2', '2. Your Content May Have Changed', 2),
  paragraph(
    'p-2-1',
    'People often follow a TikTok account because of a recognizable pattern.',
  ),
  paragraph(
    'p-2-2',
    'Imagine an account grows through videos about TikTok SEO, analytics, content strategy and creator tools.',
  ),
  paragraph(
    'p-2-3',
    'Then suddenly the account becomes crypto predictions, gym videos, restaurant reviews, personal arguments and random memes.',
  ),
  paragraph(
    'p-2-4',
    'Some followers may decide this is no longer the account they followed.',
  ),
  paragraph(
    'p-2-5',
    'That does not mean those new topics are bad.',
  ),
  paragraph(
    'p-2-6',
    'The problem is expectation. Your previous audience made a follow decision based on one type of content. You changed the offer.',
  ),
  paragraph(
    'p-2-7',
    'Some audience turnover is therefore understandable.',
  ),

  heading(
    'h-3',
    "3. A Viral Video Can Bring Followers Who Don't Stay",
    2,
  ),
  paragraph(
    'p-3-1',
    'Suppose your normal account is about small-business marketing.',
  ),
  paragraph(
    'p-3-2',
    'Then one unrelated comedy video receives dramatically more exposure than your usual content.',
  ),
  paragraph(
    'p-3-3',
    'A large number of people discover you through that post. Some follow.',
  ),
  paragraph(
    'p-3-4',
    'Then your next ten videos go back to Google Business Profiles, SEO, websites and advertising.',
  ),
  paragraph(
    'p-3-5',
    'Part of the viral audience may realize they do not actually care about this topic. They unfollow.',
  ),
  paragraph(
    'p-3-6',
    'The follower spike was real. But it may not have represented strong long-term audience fit.',
  ),
  heading('h-3-viral', 'Viral Growth vs Audience Fit', 3),
  paragraph(
    'p-3-7',
    'A viral post can answer whether this video can attract attention.',
  ),
  paragraph(
    'p-3-8',
    'It does not necessarily answer whether this audience wants your normal content.',
  ),
  paragraph('p-3-9', 'Those are different questions.'),

  heading(
    'h-4',
    '4. Stop Judging Growth Only by the Final Follower Number',
    2,
  ),
  paragraph('p-4-1', 'Imagine Monday: 10,000 followers.'),
  paragraph(
    'p-4-2',
    'During the week, 500 people follow and 420 people unfollow.',
  ),
  paragraph('p-4-3', 'Sunday: 10,080 followers.'),
  paragraph(
    'p-4-4',
    'If you only look at plus 80, you miss most of what happened.',
  ),
  paragraph(
    'p-4-5',
    'Your audience actually experienced significant movement.',
  ),
  paragraph(
    'p-4-6',
    'This is why follower trends are more useful than staring at one public counter.',
  ),
  paragraph(
    'p-4-7',
    'TikTok says Analytics provides follower metrics alongside post and other performance information. (TikTok Support)',
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-4-8', 'The useful questions are:'),
  bullets('ul-4-q', [
    'Which posts attracted followers?',
    'When did losses increase?',
    'Did the content change?',
    'Did a viral post create an unusual spike?',
    'Did follower growth stop while normal unfollows continued?',
  ]),
  paragraph('p-4-9', 'You need trends, not panic.'),
  figure(
    'fig-net',
    `${IMAGE_DIR}/net-followers.png`,
    'Illustrative example of 500 followers gained, 420 lost and a net change of 80, showing that a small net number can hide audience movement',
    'A small net change can hide significant audience movement. Illustrative example only.',
  ),

  heading(
    'h-5',
    '5. Your New Followers May Have Come for One Topic Only',
    2,
  ),
  paragraph(
    'p-5-1',
    'This happens even without a viral post.',
  ),
  paragraph(
    'p-5-2',
    'Suppose one video teaches how to get TikTok LIVE and it attracts a lot of followers, but your normal account is about fashion.',
  ),
  paragraph(
    'p-5-3',
    'Some users may have followed because they expected TikTok tutorials. When the next videos return to fashion, they leave.',
  ),
  paragraph(
    'p-5-4',
    'The problem is not necessarily the quality of the fashion videos. It is that the content that generated the follow did not represent the normal account.',
  ),
  paragraph(
    'p-5-5',
    'When analyzing follower growth, ask what exactly people thought they were following.',
  ),

  heading('h-6', '6. Your Account Positioning May Be Unclear', 2),
  paragraph(
    'p-6-1',
    'An unclear profile can create unstable growth.',
  ),
  paragraph(
    'p-6-2',
    'Today you appear to be a business educator. Tomorrow a lifestyle creator. Next week a meme Page.',
  ),
  paragraph(
    'p-6-3',
    'The audience has no stable expectation.',
  ),
  paragraph(
    'p-6-4',
    'For a personality-driven creator, multiple topics may work because the creator themselves is the central reason to follow.',
  ),
  paragraph(
    'p-6-5',
    'For a niche account, random topic movement can make retention harder.',
  ),
  paragraph(
    'p-6-6',
    'A simple test: can someone describe why they follow you in one sentence?',
  ),
  paragraph(
    'p-6-7',
    'If not, the account may need clearer positioning.',
  ),

  heading('h-7', '7. You May Be Attracting the Wrong Audience', 2),
  paragraph(
    'p-7-1',
    'More followers are not automatically better followers.',
  ),
  paragraph(
    'p-7-2',
    'Suppose your goal is helping UK small businesses with marketing, but the majority of your follower growth comes from unrelated global entertainment videos.',
  ),
  paragraph(
    'p-7-3',
    'Your count may increase rapidly. But your audience and future content may not match. Then follower losses begin.',
  ),
  paragraph(
    'p-7-4',
    'That can be an audience-quality problem rather than a TikTok problem.',
  ),
  paragraph(
    'p-7-5',
    'A smaller audience that genuinely cares about your content can be strategically more useful than a larger audience that followed for something unrelated.',
  ),

  heading(
    'h-8',
    "8. Posting More Doesn't Automatically Stop Unfollows",
    2,
  ),
  paragraph(
    'p-8-1',
    "TikTok's growth guidance recommends regular, high-quality content when discussing audience growth. (TikTok Support)",
    [{ href: TT_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-8-2',
    'That should not be rewritten as a rule that you must post five times per day or followers will leave.',
  ),
  paragraph(
    'p-8-3',
    'There is no universal TikTok formula like that.',
  ),
  paragraph(
    'p-8-4',
    'More posting creates more content. It does not guarantee better audience retention.',
  ),
  paragraph(
    'p-8-5',
    'If increasing volume causes you to publish repetitive videos, irrelevant trends, weak ideas or content outside your niche, more volume may actually make the account less clear.',
  ),
  paragraph(
    'p-8-6',
    'Consistency should mean consistent value and positioning, not maximum uploads.',
  ),

  heading(
    'h-9',
    "9. Posting Less Doesn't Mean TikTok Automatically Deletes Followers",
    2,
  ),
  paragraph(
    'p-9-1',
    'Another myth is that if you stop posting, TikTok removes inactive followers.',
  ),
  paragraph(
    'p-9-2',
    "TikTok's current Inactive Account Policy does not say followers are automatically removed because the creator stopped posting for a fixed period.",
  ),
  paragraph(
    'p-9-3',
    'TikTok says that when an account itself remains inactive for 180 days or more, its username may be reset to a randomized numeric username. (TikTok Support)',
    [{ href: TT_INACTIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-9-4',
    'That is an inactive-account username policy. It is not a rule that TikTok removes your followers after 30, 60 or 90 days of inactivity.',
  ),
  paragraph(
    'p-9-5',
    'Do not mix those concepts.',
  ),
  paragraph(
    'p-9-6',
    'Your audience may naturally lose interest during a long absence. But that is different from claiming TikTok runs a documented follower-deletion countdown.',
  ),

  heading(
    'h-10',
    '10. TikTok Does Not Publish a Universal Normal Follower-Loss Number',
    2,
  ),
  paragraph(
    'p-10-1',
    'Be careful with articles claiming that losing 2 percent per week is normal, that anything over 5 percent means a shadowban, or that 10 followers per 1,000 are removed daily.',
  ),
  paragraph(
    'p-10-2',
    "TikTok's official support resources reviewed for this article provide follower Analytics and audience-management functionality, but they do not provide one universal follower-loss benchmark that every account should expect. (TikTok Support)",
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-10-3',
    'That makes sense because a 200-follower local account, a 10-million-follower celebrity, a new creator and a viral news account can have completely different audience behaviour.',
  ),
  paragraph(
    'p-10-4',
    'Compare against your own historical baseline instead.',
  ),

  heading('h-11', '11. Check Analytics Before Assuming Anything', 2),
  paragraph(
    'p-11-1',
    'TikTok says Analytics can provide insight into post performance, followers, LIVE and other metrics. (TikTok Support)',
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-11-2', 'Use it.'),
  paragraph(
    'p-11-3',
    'When followers drop, review the period around the change.',
  ),
  paragraph('p-11-4', 'Ask:'),
  bullets('ul-11', [
    'Which videos were published?',
    'Which content received unusual discovery?',
    'Did the account change topic?',
    'Did growth come from one particular video?',
    'Are new videos reaching the same type of audience?',
    'Did follower growth stop?',
    'Were losses gradual or concentrated?',
  ]),
  paragraph(
    'p-11-5',
    'This gives you something much more useful than assuming TikTok hates you because the number went down.',
  ),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnose-drop.png`,
    'Four-step diagnosis for a TikTok follower drop: confirm the change, check Analytics, review content, then check Account Status',
    'Use evidence before diagnosing a penalty.',
  ),

  heading(
    'h-12',
    '12. Follower Loss Does Not Automatically Mean Shadowban',
    2,
  ),
  paragraph(
    'p-12-1',
    'This is one of the most important sections.',
  ),
  paragraph(
    'p-12-2',
    'A lower follower number alone does not prove that TikTok restricted your account.',
  ),
  paragraph(
    'p-12-3',
    'TikTok provides an actual Account Status area where users can review account-standing issues, including certain restrictions involving login, posts, comments and other account functions. (TikTok Support)',
    [{ href: TT_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-12-4',
    'TikTok separately says that if an account becomes ineligible for recommendation, it will notify the user through their inbox and profile, including information about flagged content and an appeal process. (TikTok Support)',
    [{ href: TT_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-12-5',
    'Those are much stronger signals than losing 30 followers.',
  ),
  paragraph(
    'p-12-6',
    "So if you suspect an actual platform restriction, check TikTok's actual status tools. Do not diagnose from follower count alone.",
  ),

  heading(
    'h-status-vs',
    'Account Status vs Recommendation Eligibility',
    2,
  ),
  paragraph(
    'p-sv-1',
    'These concepts can overlap in your troubleshooting, but do not flatten them into one mysterious shadowban score.',
  ),
  heading('h-sv-status', 'Account Status', 3),
  paragraph(
    'p-sv-2',
    'TikTok provides this to help users review account-standing and certain functionality issues. (TikTok Support)',
    [{ href: TT_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  heading('h-sv-rec', 'Recommendation Eligibility', 3),
  paragraph(
    'p-sv-3',
    'TikTok can notify an account when it becomes ineligible for recommendation and allows appeals if the creator believes the decision is wrong. (TikTok Support)',
    [{ href: TT_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),
  heading('h-sv-count', 'Follower Count', 3),
  paragraph(
    'p-sv-4',
    'This is an audience metric.',
  ),
  paragraph(
    'p-sv-5',
    'A follower decline by itself does not tell you that either of the first two systems triggered.',
  ),

  heading(
    'h-13',
    '13. Low Views and Follower Loss Are Different Problems',
    2,
  ),
  paragraph(
    'p-13-1',
    'Suppose followers are declining but video views remain normal. Or followers are stable but recent video views fall.',
  ),
  paragraph(
    'p-13-2',
    'Those are different patterns.',
  ),
  paragraph(
    'p-13-3',
    'Our earlier article on why TikTok videos get views but no followers covered the opposite scenario: content can receive views without converting viewers into followers.',
    [
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'why TikTok videos get views but no followers',
      },
    ],
  ),
  paragraph(
    'p-13-4',
    'Likewise, existing followers can leave without proving that TikTok stopped distributing your videos.',
  ),
  paragraph(
    'p-13-5',
    "Don't combine every metric into one diagnosis.",
  ),

  heading(
    'h-14',
    '14. More Views Do Not Guarantee Followers Will Stay',
    2,
  ),
  paragraph(
    'p-14-1',
    'Imagine one account receives millions of views.',
  ),
  paragraph(
    'p-14-2',
    'That does not mean every person who follows will remain forever.',
  ),
  paragraph(
    'p-14-3',
    'Following is an account-level relationship. Video viewing is content-level activity.',
  ),
  paragraph(
    'p-14-4',
    "TikTok's recommendation system uses multiple signals and can recommend content to users based on their interests and interactions rather than simply distributing every post to every follower. (TikTok Support)",
    [{ href: TT_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-14-5',
    'So high views and stable follower retention are different outcomes.',
  ),

  heading(
    'h-15',
    '15. More Followers Do Not Guarantee More Views Either',
    2,
  ),
  paragraph(
    'p-15-1',
    'The reverse is also true.',
  ),
  paragraph(
    'p-15-2',
    'An account with 50,000 followers does not automatically receive 50,000 views on every post.',
  ),
  paragraph(
    'p-15-3',
    'TikTok recommendation systems use multiple signals for content distribution. (TikTok Support)',
    [{ href: TT_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-15-4',
    'That is why follower count and content performance should be analyzed separately.',
  ),
  paragraph(
    'p-15-5',
    'Our guide on TikTok followers, likes and views explains those distinctions in detail.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
    ],
  ),

  heading('h-16', '16. Creators Can Remove Followers Manually', 2),
  paragraph(
    'p-16-1',
    'There is another simple reason follower numbers can change.',
  ),
  paragraph(
    'p-16-2',
    'TikTok gives account owners a native Remove follower function. (TikTok Support)',
    [{ href: TT_REMOVE_FOLLOWERS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-16-3',
    'So if you, an employee, an agency or another authorized person managing the account removes followers, the count naturally goes down.',
  ),
  paragraph(
    'p-16-4',
    'This may sound obvious. But on accounts with multiple managers, it is worth checking before blaming TikTok.',
  ),
  paragraph(
    'p-16-5',
    'Also review whether anyone managing the account has been cleaning the follower list, blocking accounts or changing privacy-related settings.',
  ),

  heading(
    'h-17',
    '17. Blocking and Follower Management Are Separate From Algorithm Performance',
    2,
  ),
  paragraph(
    'p-17-1',
    'TikTok provides separate controls for following and unfollowing, removing followers, blocking users and managing follower relationships. (TikTok Support)',
    [{ href: TT_FOLLOWERS_FOLLOWING, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-17-2',
    'Those are account-management actions.',
  ),
  paragraph(
    'p-17-3',
    'They should not automatically be interpreted as ranking signals, algorithm penalties or content recommendations.',
  ),
  paragraph(
    'p-17-4',
    'Keep audience-management actions separate from distribution analysis.',
  ),

  heading(
    'h-18',
    '18. Private Accounts Have a Different Follower Journey',
    2,
  ),
  paragraph(
    'p-18-1',
    "A private TikTok account requires approval before someone can follow and access the private account's protected content. TikTok says only people approved by a private-account owner can follow and see the account's private content and follower and following lists. (TikTok Support)",
    [{ href: TT_PRIVATE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-18-2',
    'That means public and private accounts have different follower-acquisition experiences.',
  ),
  paragraph(
    'p-18-3',
    'If you recently changed privacy strategy, consider whether it changed how easily people can evaluate your content, how people follow or who you approve.',
  ),
  paragraph(
    'p-18-4',
    'Our separate guide on public vs private TikTok accounts explains that distinction.',
    [
      {
        href: '/learn/public-vs-private-tiktok-account',
        label: 'public vs private TikTok accounts',
      },
    ],
  ),
  paragraph(
    'p-18-5',
    'Do not call private status a penalty. It is an access choice.',
  ),

  heading(
    'h-19',
    '19. Do Not Assume TikTok Removed Inactive Followers',
    2,
  ),
  paragraph(
    'p-19-1',
    'Another common claim is that TikTok periodically removes everyone who has not opened the app in 30 days.',
  ),
  paragraph(
    'p-19-2',
    'The current TikTok Inactive Account Policy we reviewed says an account inactive for at least 180 days may have its username reset. It does not state that an otherwise valid inactive account is automatically removed from every account it follows simply because it has been inactive for that period. (TikTok Support)',
    [{ href: TT_INACTIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-19-3',
    "So don't invent an inactive-follower cleanup rule.",
  ),
  paragraph(
    'p-19-4',
    'If TikTok publishes a different policy later, update the article.',
  ),
  paragraph(
    'p-19-5',
    'For now, inactive account policy is not an automatic follower-purge policy.',
  ),

  heading('h-20', '20. What About Fake Followers?', 2),
  paragraph(
    'p-20-1',
    'This needs careful wording.',
  ),
  paragraph(
    'p-20-2',
    "TikTok clearly treats artificially inflated follower counts as a problem in creator monetization contexts.",
  ),
  paragraph(
    'p-20-3',
    "TikTok's current Creator Rewards eligibility rules say participating creators must not engage in malicious or fraudulent activity such as inflating follower counts or acquiring fake video views. (TikTok Support)",
    [{ href: TT_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-20-4',
    'That is enough reason not to describe artificial follower acquisition as TikTok-approved, risk-free or guaranteed safe for eligibility.',
  ),
  paragraph(
    'p-20-5',
    'But a follower decline should not automatically be labelled as TikTok removed bots.',
  ),
  paragraph(
    'p-20-6',
    'The public follower counter does not tell you whether a specific loss came from manual unfollows, account removal, your own follower management or another cause.',
  ),
  paragraph(
    'p-20-7',
    'Diagnose what you can actually verify.',
  ),

  heading('h-delete-fake', 'Does TikTok Delete Fake Followers?', 2),
  paragraph(
    'p-df-1',
    "TikTok's public documentation makes clear that inflated or fake engagement is not something creators should rely on, particularly in programs such as Creator Rewards. (TikTok Support)",
    [{ href: TT_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-df-2',
    "However, TikTok's official support pages reviewed for this article do not provide creators with a universal dashboard saying today we deleted exactly X fake followers from your account.",
  ),
  paragraph(
    'p-df-3',
    'So if the count falls, do not automatically attribute the loss to a fake-follower cleanup unless you have supporting evidence.',
  ),
  paragraph(
    'p-df-4',
    'The accurate wording is: fake or artificially inflated follower activity can create platform-policy risk, but a follower-count decline alone does not identify its cause.',
  ),

  heading(
    'h-21',
    '21. Do Not Use Follower-Loss Apps That Ask for Your Password',
    2,
  ),
  paragraph(
    'p-21-1',
    'If you are trying to identify follower changes, avoid handing TikTok credentials to random third-party apps simply because they promise to show exactly who unfollowed you or to get followers back instantly.',
  ),
  paragraph(
    'p-21-2',
    'TikTok provides a formal third-party app authorization system and recommends reviewing permissions when connecting apps to your TikTok account. (TikTok Support)',
    [{ href: TT_THIRD_PARTY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-21-3',
    'Use TikTok Analytics for performance trends.',
  ),
  paragraph(
    'p-21-4',
    'Be particularly cautious if an unrelated service asks for your TikTok password, two-factor codes, session cookies or credentials beyond a legitimate TikTok authorization flow.',
  ),
  paragraph(
    'p-21-5',
    'Your follower curiosity is not worth losing the account.',
  ),

  heading(
    'h-who',
    'Can You See Exactly Who Unfollowed You on TikTok?',
    2,
  ),
  paragraph(
    'p-who-1',
    'TikTok has a standard followers list and provides Analytics around follower performance, but the official tools reviewed here are not presented as a dedicated chronological list of these 37 people unfollowed you today. (TikTok Support)',
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-who-2',
    'For growth strategy, the individual names usually matter less than the trend.',
  ),
  paragraph('p-who-3', 'Ask:'),
  bullets('ul-who', [
    'Which content attracted people?',
    'Which content period coincided with higher losses?',
    'What audience did a viral post bring?',
    'Is the account still aligned with those people?',
  ]),
  paragraph(
    'p-who-4',
    'That is much more actionable.',
  ),

  heading(
    'h-22',
    '22. Your Follower Count Can Drop Even While the Account Is Growing',
    2,
  ),
  paragraph(
    'p-22-1',
    "This sounds contradictory, but it isn't.",
  ),
  paragraph(
    'p-22-2',
    'Imagine morning: 20,000 followers. Twenty people unfollow during the day. Then 50 new people follow. Net result: plus 30.',
  ),
  paragraph(
    'p-22-3',
    'Follower loss still happened. You just gained more than you lost.',
  ),
  paragraph(
    'p-22-4',
    'When people say their account never loses followers, they may simply be looking at a total that continues rising.',
  ),
  paragraph(
    'p-22-5',
    'Every changing audience can include arrivals and departures.',
  ),
  paragraph(
    'p-22-6',
    "Growth means the balance is positive over the period you're measuring.",
  ),

  heading(
    'h-23',
    '23. A Falling Follower Count Can Also Mean New Growth Has Slowed',
    2,
  ),
  paragraph(
    'p-23-1',
    'Suppose your account normally gets 100 new followers per day while 30 leave. Net: plus 70.',
  ),
  paragraph(
    'p-23-2',
    'Then new follower acquisition slows to 10 per day while normal unfollows remain around 30. Now the account shows minus 20.',
  ),
  paragraph(
    'p-23-3',
    'The follower-loss behaviour may not have dramatically changed. The growth side changed.',
  ),
  paragraph(
    'p-23-4',
    'This is why you should analyze new follower acquisition and audience retention together.',
  ),
  paragraph(
    'p-23-5',
    "A declining total doesn't always mean an unfollow crisis. Sometimes discovery slowed.",
  ),

  heading(
    'h-24',
    '24. Check Whether Your Best Discovery Content Disappeared',
    2,
  ),
  paragraph(
    'p-24-1',
    'Maybe one set of videos was responsible for a large percentage of new followers.',
  ),
  paragraph(
    'p-24-2',
    'Then the topic stopped performing, the posts aged, you stopped publishing related content or you changed strategy.',
  ),
  paragraph(
    'p-24-3',
    'New follower acquisition falls. Ordinary audience churn continues. Net follower count starts declining.',
  ),
  paragraph(
    'p-24-4',
    'The lesson is not necessarily to repost the same video forever.',
  ),
  paragraph(
    'p-24-5',
    'Instead ask what need those successful videos satisfied. Then create useful related content.',
  ),

  heading(
    'h-25',
    '25. Search Traffic Can Help Stabilize Discovery',
    2,
  ),
  paragraph(
    'p-25-1',
    'TikTok provides Creator Search Insights, which lets creators identify search topics and review how posts perform in TikTok Search. (TikTok Support)',
    [{ href: TT_SEARCH_INSIGHTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-25-2',
    'Search-focused content can be useful because it targets specific questions, ongoing problems and topics users actively look for.',
  ),
  paragraph(
    'p-25-3',
    'A question such as why TikTok followers are dropping can continue to be useful beyond the day it is published.',
  ),
  paragraph(
    'p-25-4',
    'Our TikTok SEO guide covers this strategy more deeply.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO' }],
  ),
  paragraph(
    'p-25-5',
    "Don't depend entirely on one temporary trend for follower acquisition. Build evergreen discovery too.",
  ),

  heading(
    'h-26',
    "26. Don't Change Everything After One Bad Week",
    2,
  ),
  paragraph(
    'p-26-1',
    'A few days of follower decline can feel dramatic.',
  ),
  paragraph(
    'p-26-2',
    'But before completely changing your niche, username, content format, posting schedule, profile and strategy, check a longer period.',
  ),
  paragraph('p-26-3', 'Ask:'),
  bullets('ul-26', [
    'Is this genuinely a trend?',
    'Or ordinary variation?',
    'What changed immediately before it?',
    'Which content is still working?',
  ]),
  paragraph(
    'p-26-4',
    'TikTok Analytics exists specifically to help creators understand follower and post performance. (TikTok Support)',
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-26-5',
    'Change strategy based on patterns. Not fear.',
  ),

  heading(
    'h-27',
    "27. Don't Delete Every Video That Loses Followers",
    2,
  ),
  paragraph(
    'p-27-1',
    'You usually cannot prove that this exact video caused these exact 12 unfollows simply by watching the public follower number.',
  ),
  paragraph(
    'p-27-2',
    'A controversial or off-topic post may obviously create audience reaction.',
  ),
  paragraph(
    'p-27-3',
    "But don't treat every follower fluctuation as a reason to erase content.",
  ),
  paragraph(
    'p-27-4',
    'Instead review whether the video fits the account, whether information is correct, how it performed, what comments say and whether similar posts produce a pattern.',
  ),
  paragraph(
    'p-27-5',
    'Keep useful content. Learn from weak content. Remove posts when there is a real reason. Not because the counter moved by three.',
  ),

  heading(
    'h-28',
    "28. Don't Become a Different Creator Just to Stop Unfollows",
    2,
  ),
  paragraph(
    'p-28-1',
    'Trying to please every follower creates another problem.',
  ),
  paragraph(
    'p-28-2',
    'If one user dislikes tutorials, another dislikes long videos, another dislikes short videos, another dislikes talking-head videos and another dislikes text, you cannot satisfy everyone simultaneously.',
  ),
  paragraph(
    'p-28-3',
    'Your goal should be to serve the audience the account is genuinely designed for.',
  ),
  paragraph(
    'p-28-4',
    'Some unfollows are simply the audience becoming more accurately matched. That can be healthy.',
  ),

  heading(
    'h-29',
    '29. Watch for Audience Mismatch After a Giveaway',
    2,
  ),
  paragraph(
    'p-29-1',
    'Suppose an account gives away an expensive phone with little connection to its normal niche.',
  ),
  paragraph(
    'p-29-2',
    'Thousands follow because they want the prize. The giveaway ends. Normal content returns. Some leave.',
  ),
  paragraph(
    'p-29-3',
    'The growth looked impressive. The audience fit was weak.',
  ),
  paragraph(
    'p-29-4',
    'If you use promotions, ask whether these people would still care about the account if there were no prize.',
  ),
  paragraph(
    'p-29-5',
    'That question matters more than the temporary follower spike.',
  ),

  heading(
    'h-30',
    "30. Don't Use Follow-for-Follow to Hide Retention Problems",
    2,
  ),
  paragraph(
    'p-30-1',
    'Follow-for-follow can increase a displayed follower count. It does not prove those followers care about your content.',
  ),
  paragraph(
    'p-30-2',
    'If they followed primarily to receive a follow back, their incentive can disappear quickly. Then the audience becomes unstable.',
  ),
  paragraph(
    'p-30-3',
    'If your goal is actual organic growth, follower acquisition should ideally come from content, search, profile discovery, recommendation and genuine audience interest. Not obligation.',
  ),
  paragraph(
    'p-30-4',
    'Our guide on how to get your first 1,000 TikTok followers organically focuses on that audience-fit approach.',
    [
      {
        href: '/learn/how-to-get-1000-tiktok-followers',
        label: 'how to get your first 1,000 TikTok followers organically',
      },
    ],
  ),

  heading(
    'h-31',
    '31. Check Account Status if Something Looks Bigger Than Follower Loss',
    2,
  ),
  paragraph(
    'p-31-1',
    'If follower loss happens alongside posting restrictions, comment restrictions, login issues or other account-function changes, check TikTok Account Status.',
  ),
  paragraph(
    'p-31-2',
    'TikTok says Account Status can be used to troubleshoot account standing and post-performance concerns and can show categories of account issues. (TikTok Support)',
    [{ href: TT_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-31-3',
    'Do not rely on rumors, unofficial shadowban-checker websites or somebody promising to inspect TikTok\'s secret score.',
  ),
  paragraph(
    'p-31-4',
    "Use the platform's own status information first.",
  ),

  heading(
    'h-32',
    '32. Check Recommendation Notifications if Discovery Collapses',
    2,
  ),
  paragraph(
    'p-32-1',
    'If the issue is not just follower loss but a significant change in non-follower discovery, TikTok says accounts that become ineligible for recommendation are notified in their inbox and profile and can review flagged content and appeal. (TikTok Support)',
    [{ href: TT_NOT_RECOMMENDED, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-32-2',
    'That provides an actual troubleshooting path. It is much stronger evidence than my views were lower yesterday.',
  ),
  paragraph(
    'p-32-3',
    'Recommendation eligibility and follower count should still be kept conceptually separate.',
  ),
  paragraph(
    'p-32-4',
    'One can influence growth opportunities. But follower loss alone does not prove recommendation ineligibility.',
  ),

  heading(
    'h-33',
    '33. Report Genuine Technical Problems to TikTok',
    2,
  ),
  paragraph(
    'p-33-1',
    'Sometimes a displayed number or account feature may genuinely appear wrong.',
  ),
  paragraph(
    'p-33-2',
    'TikTok has an official Report a problem workflow under Settings and privacy. (TikTok Support)',
    [{ href: TT_REPORT_PROBLEM, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-33-3',
    'Use that if you have a real platform issue.',
  ),
  paragraph(
    'p-33-4',
    'Do not assume every unexpected metric movement is technical.',
  ),
  paragraph(
    'p-33-5',
    "But if counts appear obviously inconsistent, features fail or account functionality is behaving incorrectly, TikTok's support flow is the right place to report it.",
  ),

  heading(
    'h-cta-section',
    'TikTok Follower Services and Follower Retention',
    2,
  ),
  paragraph(
    'p-ct-1',
    "A TikTok follower service concerns the account's follower-count metric.",
  ),
  paragraph(
    'p-ct-2',
    'It should not be described as a cure for organic follower loss, a guaranteed retention system, a guaranteed FYP boost or a guarantee that every follower remains forever.',
  ),
  paragraph(
    'p-ct-3',
    "If someone wants to compare the separate NovaLikes option, TikTok followers should be understood as a follower-count service.",
    [{ href: '/buy-tiktok-followers', label: 'TikTok followers' }],
  ),
  paragraph(
    'p-ct-4',
    'Keep that service separate from organic audience retention.',
  ),
  paragraph(
    'p-ct-5',
    'TikTok itself controls platform access, account enforcement, recommendations and other TikTok functionality.',
  ),
  {
    id: 'cta-tiktok-followers',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-tiktok-followers',
    heading: 'Compare TikTok Follower Options',
    description:
      "Follower counts can change for several reasons. If you're comparing TikTok follower packages, review the available options without treating follower count as a guarantee of permanent retention, FYP reach or engagement.",
    label: 'View TikTok Followers',
  },

  heading(
    'h-buy-stop',
    'Can Buying Followers Stop Your Follower Count From Dropping?',
    2,
  ),
  paragraph(
    'p-bs-1',
    'Not as an organic retention strategy.',
  ),
  paragraph(
    'p-bs-2',
    'If the reason people leave is content mismatch, changing niche, poor audience fit or temporary viral followers, adding another set of followers does not fix those issues.',
  ),
  paragraph(
    'p-bs-3',
    'The visible total may change. The audience problem remains.',
  ),
  paragraph(
    'p-bs-4',
    "Also, TikTok's Creator Rewards rules explicitly prohibit malicious or fraudulent behaviour such as inflating follower counts, so third-party follower acquisition should not be presented as TikTok-approved or as a safe way to satisfy creator-program eligibility. (TikTok Support)",
    [{ href: TT_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-bs-5',
    'Keep follower-count services and organic audience retention separate.',
  ),

  heading('h-purchased-drop', 'Can Purchased Followers Drop Later?', 2),
  paragraph(
    'p-pd-1',
    'No third-party follower package should be described as permanent forever unless the underlying service actually guarantees and can support that exact promise.',
  ),
  paragraph(
    'p-pd-2',
    'Follower relationships exist on TikTok\'s platform. Users can unfollow, creators can remove followers, and TikTok controls its account ecosystem. (TikTok Support)',
    [{ href: TT_FOLLOW_UNFOLLOW, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pd-3',
    'NovaLikes should therefore avoid absolute claims such as followers can never drop, or permanent TikTok followers guaranteed forever.',
  ),
  paragraph(
    'p-pd-4',
    'If a package has a specific documented guarantee, state only that actual guarantee. Do not invent one.',
  ),

  heading(
    'h-hurt-algo',
    'Does Losing Followers Hurt the TikTok Algorithm?',
    2,
  ),
  paragraph(
    'p-ha-1',
    'Do not claim a direct formula.',
  ),
  paragraph(
    'p-ha-2',
    'TikTok describes recommendation as using multiple signals, including user interactions, content information and user information. (TikTok Support)',
    [{ href: TT_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ha-3',
    'It does not publish a rule such as lose 100 followers and your next videos get 30 percent less reach.',
  ),
  paragraph(
    'p-ha-4',
    'Follower loss can be strategically useful information because it tells you something about audience retention.',
  ),
  paragraph(
    'p-ha-5',
    "But don't turn it into an invented ranking equation.",
  ),

  heading(
    'h-unfollow-feed',
    'Does Unfollowing Affect What a User Sees?',
    2,
  ),
  paragraph(
    'p-uf-1',
    "TikTok says unfollowing an account can remove that account's posts from the user's Following feed or Friends Tab. (TikTok Support)",
    [{ href: TT_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-uf-2',
    'That makes intuitive sense: the user has explicitly said they no longer want to follow that account.',
  ),
  paragraph(
    'p-uf-3',
    'For creators, the lesson is that the follower relationship matters to that person\'s following experience. It is not simply a decorative number on your profile.',
  ),

  heading(
    'h-180',
    'Does TikTok Remove Followers After 180 Days?',
    2,
  ),
  paragraph(
    'p-180-1',
    "TikTok's 180-day inactive-account policy does not say this.",
  ),
  paragraph(
    'p-180-2',
    "The policy says an inactive account's username may be reset after 180 days or more of inactivity. (TikTok Support)",
    [{ href: TT_INACTIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-180-3',
    'Therefore do not publish a claim that TikTok deletes inactive followers every 180 days.',
  ),
  paragraph(
    'p-180-4',
    'That would turn one policy into another policy TikTok did not state.',
  ),

  heading(
    'h-watch',
    "Does TikTok Remove Followers Who Don't Watch Your Videos?",
    2,
  ),
  paragraph(
    'p-dw-1',
    "TikTok's official follower documentation reviewed here does not establish a rule where someone is automatically unfollowed simply because they haven't watched your videos recently. (TikTok Support)",
    [{ href: TT_FOLLOW_UNFOLLOW, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-dw-2',
    'Users can manually unfollow. Creators can remove them.',
  ),
  paragraph(
    'p-dw-3',
    "Don't invent an automatic inactivity-based unfollow rule without official evidence.",
  ),

  heading(
    'h-overnight',
    'Why Did My TikTok Followers Drop Overnight?',
    2,
  ),
  paragraph('p-ov-1', 'Start with four questions.'),
  heading('h-ov-1', '1. How Big Was the Drop?', 3),
  paragraph(
    'p-ov-2',
    '10 followers? 100? 10,000? Context changes how urgently you should investigate.',
  ),
  heading('h-ov-2', '2. Was There a Recent Follower Spike?', 3),
  paragraph(
    'p-ov-3',
    'A viral video may have brought temporary followers.',
  ),
  heading('h-ov-3', '3. Did Your Content Change?', 3),
  paragraph(
    'p-ov-4',
    'Topic, language, audience or format?',
  ),
  heading('h-ov-4', '4. Is There an Actual Account Issue?', 3),
  paragraph(
    'p-ov-5',
    'Check Account Status and any recommendation notifications rather than assuming a penalty. TikTok provides both systems for real account and recommendation issues. (TikTok Support)',
    [{ href: TT_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ov-6',
    'Then review Analytics. TikTok includes follower-related metrics there. (TikTok Support)',
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-every-post',
    'Why Do I Lose Followers Every Time I Post?',
    2,
  ),
  paragraph(
    'p-ep-1',
    'If the pattern is genuine and repeated, investigate the relationship between what people originally followed for and what you currently publish.',
  ),
  paragraph(
    'p-ep-2',
    'Possible strategic explanations include topic mismatch, audience mismatch, an overly broad follower base or content that repeatedly conflicts with the account\'s established purpose.',
  ),
  paragraph(
    'p-ep-3',
    'Do not jump immediately to the idea that TikTok punishes you whenever you post.',
  ),
  paragraph(
    'p-ep-4',
    'Compare several posts. Look for themes. If the same type of post repeatedly coincides with audience loss, that is useful information.',
  ),

  heading(
    'h-after-viral',
    'Why Do TikTok Followers Drop After Going Viral?',
    2,
  ),
  paragraph(
    'p-av-1',
    'One plausible explanation is audience mismatch.',
  ),
  paragraph(
    'p-av-2',
    'A viral post may be discovered by a much broader audience than your normal content.',
  ),
  paragraph(
    'p-av-3',
    "Some of those viewers follow based on that one post. If your later videos are unrelated, part of that audience may leave.",
  ),
  paragraph(
    'p-av-4',
    'This does not prove TikTok removed them.',
  ),
  paragraph(
    'p-av-5',
    "It can simply mean the viral video's audience and the account's normal audience were different.",
  ),
  paragraph(
    'p-av-6',
    'This is why sustainable growth depends on follow intent that matches future content.',
  ),

  heading(
    'h-views-up',
    'Why Are My Followers Dropping but Views Are Increasing?',
    2,
  ),
  paragraph(
    'p-vu-1',
    'Because views and followers measure different things.',
  ),
  paragraph(
    'p-vu-2',
    'A new video can attract large discovery, many non-followers and substantial views while existing followers simultaneously leave.',
  ),
  paragraph(
    'p-vu-3',
    "TikTok's recommendation system can distribute content based on multiple personalized signals, while following and unfollowing remains a separate user action. (TikTok Support)",
    [{ href: TT_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-vu-4',
    'So the metrics can move in opposite directions.',
  ),

  heading(
    'h-followers-up',
    'Why Are Followers Increasing but Views Decreasing?',
    2,
  ),
  paragraph(
    'p-fu-1',
    'Again, follower count does not guarantee a certain number of views.',
  ),
  paragraph(
    'p-fu-2',
    "TikTok's recommendation system does not work as number of followers equals mandatory number of views. (TikTok Support)",
    [{ href: TT_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fu-3',
    'Analyze topic, content performance, audience activity and distribution separately.',
  ),
  paragraph(
    'p-fu-4',
    'Do not treat follower count as guaranteed reach.',
  ),

  heading(
    'h-what-do',
    'What Should You Do When TikTok Followers Are Dropping?',
    2,
  ),
  paragraph('p-wd-1', 'Use this process.'),
  numbered('ol-do', [
    'Record the trend across a meaningful period instead of relying on memory.',
    'Open TikTok Analytics and review follower and content-performance information.',
    'Find the starting point: when did the decline begin?',
    'Review content before and after that date for topic, format, language, audience or posting-style changes.',
    'Look for viral-spike followers from one unusual post outside your normal niche.',
    'Check Account Status for actual account-standing issues.',
    'Check recommendation notices and appeal if TikTok says the account is ineligible for recommendation.',
    'Rebuild around audience fit by creating more of the content the intended audience originally wanted.',
  ]),

  heading(
    'h-30day',
    'A 30-Day TikTok Follower Retention Review',
    2,
  ),
  paragraph(
    'p-30d-1',
    'This is a review framework. Not a promise of zero follower loss.',
  ),
  heading('h-30d-1', 'Week 1: Diagnose', 3),
  paragraph(
    'p-30d-2',
    'Record follower count, recent posts, top discovery content, major follower spikes and content changes. Check Account Status. (TikTok Support)',
    [{ href: TT_ACCOUNT_STATUS, label: 'TikTok Support', external: true }],
  ),
  heading('h-30d-2', 'Week 2: Restore Clarity', 3),
  paragraph(
    'p-30d-3',
    'Pick your strongest 3 to 5 content themes. Make profile positioning clear. Reduce unrelated content.',
  ),
  heading('h-30d-3', 'Week 3: Build Connected Content', 3),
  paragraph(
    'p-30d-4',
    'Take the strongest audience topic and create a follow-up, comparison, FAQ, mistake video and deeper explanation.',
  ),
  paragraph(
    'p-30d-5',
    'Use Creator Search Insights to identify relevant searched topics where helpful. (TikTok Support)',
    [{ href: TT_SEARCH_INSIGHTS, label: 'TikTok Support', external: true }],
  ),
  heading('h-30d-4', 'Week 4: Compare', 3),
  paragraph(
    'p-30d-6',
    'Review TikTok Analytics again. TikTok provides follower and post analytics for this kind of performance analysis. (TikTok Support)',
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-30d-7', 'Ask:'),
  bullets('ul-30d', [
    'Did follower losses slow?',
    'Did follower acquisition improve?',
    'Which content attracted better-matched viewers?',
    'Which topic deserves continued investment?',
  ]),
  paragraph(
    'p-30d-8',
    "Then build next month's plan.",
  ),

  heading('h-reduce', 'How to Reduce Avoidable Follower Loss', 2),
  paragraph(
    'p-rd-1',
    'You cannot prevent every unfollow. Nor should you try.',
  ),
  paragraph(
    'p-rd-2',
    'Users should control their own Following list.',
  ),
  paragraph('p-rd-3', 'What you can improve is:'),
  bullets('ul-reduce', [
    'Account clarity: make the account\'s purpose obvious.',
    'Content consistency: stay connected to the audience that followed you.',
    'Topic quality: answer questions people actually care about.',
    'Discovery fit: avoid attracting huge unrelated audiences only for vanity metrics.',
    'Profile experience: give new followers an accurate idea of future content.',
    'Analytics review: use TikTok\'s follower and post metrics rather than guessing.',
    'Account health: check real Account Status and recommendation notices when something appears wrong.',
  ]),

  heading('h-healthy', 'Some Unfollows Are Healthy', 2),
  paragraph(
    'p-hl-1',
    'Suppose you previously posted random viral content. Now you deliberately focus on TikTok marketing education.',
  ),
  paragraph(
    'p-hl-2',
    'Some entertainment-only followers leave. Your follower count may temporarily decline.',
  ),
  paragraph(
    'p-hl-3',
    'But the account may become more useful for marketers, business owners, creators and people genuinely interested in TikTok strategy.',
  ),
  paragraph(
    'p-hl-4',
    'That can improve audience alignment.',
  ),
  paragraph(
    'p-hl-5',
    "Don't evaluate every strategy decision only by whether the follower number increased today.",
  ),
  paragraph(
    'p-hl-6',
    'Ask whether the audience is becoming more relevant to what this account is supposed to do.',
  ),

  heading('h-simple', 'TikTok Follower Loss in Simple Terms', 2),
  paragraph(
    'p-si-1',
    'Think of followers as a moving audience.',
  ),
  paragraph(
    'p-si-2',
    'Someone discovers you. They follow. Then one of two broad things happens.',
  ),
  heading('h-si-stay', 'They Stay', 3),
  paragraph(
    'p-si-3',
    'Your future content continues giving them a reason to follow.',
  ),
  heading('h-si-leave', 'They Leave', 3),
  paragraph(
    'p-si-4',
    "They manually unfollow, are removed by the account owner, or otherwise no longer remain part of the account's follower audience. TikTok supports both user unfollowing and creator-side follower removal. (TikTok Support)",
    [{ href: TT_FOLLOW_UNFOLLOW, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-si-5',
    'Meanwhile, new people may continue following. That produces the visible total.',
  ),
  paragraph(
    'p-si-6',
    'So follower count is ongoing audience movement, not a permanent number that should only increase.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'TikTok users can manually unfollow accounts.',
    'TikTok creators can manually remove people from their follower list.',
    'TikTok Analytics includes follower and post-performance metrics and requires at least one public post for access.',
    'TikTok Account Status can show certain account-standing restrictions and is a better troubleshooting source than assuming a penalty from follower loss alone.',
    'TikTok says it notifies users when an account becomes ineligible for recommendation and provides an appeal process.',
    "TikTok's inactive-account policy says an inactive account's username may be reset after 180 days; it does not establish a rule automatically deleting followers after 180 days.",
    'TikTok Creator Rewards rules prohibit fraudulent activity such as inflating follower counts, so third-party follower services should not be described as TikTok-approved or guaranteed safe for creator-program eligibility.',
    'Follower loss alone does not prove a shadowban, recommendation restriction, fake-follower purge or algorithm penalty.',
    'Views and followers can move in different directions because content recommendation and following or unfollowing are separate parts of TikTok.',
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
  if (block.type === 'internal_cta') {
    return `${block.heading ?? ''} ${block.description ?? ''} ${block.label}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const WHY_TIKTOK_FOLLOWERS_DROP_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-why-tiktok-followers-drop',
  slug: SLUG,
  title: 'Why Do TikTok Followers Drop? Common Causes Explained',
  excerpt:
    'A falling TikTok follower count does not tell you the cause by itself. Check audience, content and Account Status before assuming a penalty.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'analytics', 'algorithm', 'engagement', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Why Do TikTok Followers Drop? Common Causes Explained',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
  seo: {
    title: 'Why Do TikTok Followers Drop? Common Causes Explained',
    description:
      'TikTok followers dropping? Learn common reasons follower counts change, what to check in Analytics and Account Status, and which follower-loss myths to avoid.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'why are my TikTok followers dropping',
      'TikTok losing followers',
      'TikTok followers decreasing',
      'why did my TikTok followers go down',
      'TikTok follower count dropping',
      'losing followers on TikTok',
    ],
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'how-to-get-1000-tiktok-followers',
    'public-vs-private-tiktok-account',
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
    'People can manually unfollow',
    'You or an authorized manager can remove followers',
    'A viral video can attract poorly matched followers',
    'Content or positioning changes can cause turnover',
    'Check Analytics and Account Status before assuming a penalty',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why are my TikTok followers suddenly dropping?',
      answer:
        'People can manually unfollow your account, and creators can also remove followers. Check TikTok Analytics to identify when the change started and compare it with recent content instead of assuming a penalty.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does TikTok remove inactive followers?',
      answer:
        'TikTok\'s current Inactive Account Policy says an account inactive for at least 180 days may have its username reset. It does not state that inactive users are automatically removed from every account they follow after a fixed period.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: "Does losing TikTok followers mean I'm shadowbanned?",
      answer:
        'No. A follower decline alone does not establish a recommendation restriction. TikTok provides Account Status for account-standing issues and separately notifies users when an account becomes ineligible for recommendation.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can TikTok followers drop after a viral video?',
      answer:
        "Yes, audience turnover can occur after any follower spike. A plausible reason is that people followed for one viral topic but later discovered the account's normal content did not match their interests. This is an audience-fit explanation, not proof of a TikTok penalty.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can I see who unfollowed me on TikTok?',
      answer:
        'TikTok provides follower lists and Analytics, but the official tools reviewed here are not presented as a dedicated chronological unfollower notification system. For growth strategy, use follower trends and content Analytics.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question:
        'Does TikTok automatically unfollow people who stop watching my videos?',
      answer:
        "TikTok's official follower documentation reviewed here does not establish a rule automatically unfollowing someone because they have not watched an account's videos recently. Users can manually unfollow accounts themselves.",
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Can purchased TikTok followers drop?',
      answer:
        'Follower relationships exist on TikTok\'s platform, where users can unfollow and creators can remove followers. Avoid any service claim promising that a follower can never disappear unless that exact guarantee is genuinely supported.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Does losing followers reduce TikTok views?',
      answer:
        'TikTok does not publish a simple rule where losing a certain number of followers causes a fixed reduction in views. Its recommendation systems use multiple personalized signals.',
      schemaEligible: true,
    },
  ],
};
