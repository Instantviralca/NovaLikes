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
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_COUNT_CHANGES =
  'https://www.facebook.com/help/instagram/572730176521116';
const IG_UNFOLLOW =
  'https://www.facebook.com/help/instagram/286340048138725';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_COMMUNITY_GUIDELINES =
  'https://www.facebook.com/help/instagram/477434105621119';
const IG_SPAM_FOLLOWERS =
  'https://www.facebook.com/help/instagram/340413218365867';
const IG_ACCOUNT_CONTENT_INSIGHTS =
  'https://www.facebook.com/help/instagram/1533933820244654';
const IG_ACCOUNT_STATUS =
  'https://www.facebook.com/help/instagram/338481628002750';
const IG_THIRD_PARTY_APPS =
  'https://www.facebook.com/help/instagram/506028015852553';
const IG_REMOVED_ACCOUNTS =
  'https://www.facebook.com/help/instagram/309501049246773';
const IG_REMOVE_FOLLOWER =
  'https://www.facebook.com/help/instagram/413012278753813';

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
    'Seeing your Instagram follower count fall can be frustrating, especially when the change happens quickly.',
  ),
  paragraph(
    'p-open-2',
    'You might lose a handful of followers overnight.',
  ),
  paragraph(
    'p-open-3',
    'You might notice a slow decline over several weeks.',
  ),
  paragraph(
    'p-open-4',
    'Or the number might suddenly drop much more than usual.',
  ),
  paragraph(
    'p-open-5',
    'There is no single explanation that applies to every account.',
  ),
  paragraph(
    'p-open-6',
    'Some followers simply choose to unfollow. Instagram also routinely removes disabled accounts, which can directly change follower totals. Spam and fake accounts may be removed too, and Instagram provides tools for identifying potential spam followers. (Facebook)',
    [{ href: IG_COUNT_CHANGES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-7',
    'That means a falling follower count does not automatically prove that:',
  ),
  bullets('ul-open-not', [
    'Instagram has penalized your account,',
    'your content has been “shadowbanned,”',
    'someone attacked your profile,',
    'or your account is permanently declining.',
  ]),
  paragraph(
    'p-open-8',
    'The useful approach is to identify what kind of follower loss you are seeing before trying to fix it.',
  ),

  heading(
    'h-unfollow',
    '1. People Naturally Unfollow Instagram Accounts',
    2,
  ),
  paragraph(
    'p-un-1',
    'The simplest explanation is often the correct one.',
  ),
  paragraph(
    'p-un-2',
    "Instagram lets users follow and unfollow accounts whenever they choose. The platform's Help Center provides a standard Unfollow action directly from a profile. (Facebook)",
    [{ href: IG_UNFOLLOW, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-un-3',
    'People unfollow for many ordinary reasons.',
  ),
  bullets('ul-un', [
    'Their interests change.',
    'They clean up the accounts they follow.',
    'They stop using Instagram as much.',
    'They followed for one specific topic.',
    'They no longer find the content relevant.',
    'They followed after seeing one Reel but later realized the rest of the profile was different.',
  ]),
  paragraph(
    'p-un-4',
    'None of those behaviours requires a technical problem.',
  ),
  paragraph(
    'p-un-5',
    'Follower growth is rarely a perfectly straight line.',
  ),
  paragraph(
    'p-un-6',
    'An account can gain followers and lose followers during the same period.',
  ),
  paragraph(
    'p-un-7',
    'For professional accounts, Instagram Insights specifically includes follower growth information showing followers gained and lost over time. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-un-8',
    'That alone tells you something important:',
  ),
  paragraph(
    'p-un-9',
    'Instagram itself treats follower gains and follower losses as normal measurable audience activity.',
  ),

  heading(
    'h-disabled',
    '2. Instagram Removes Disabled Accounts',
    2,
  ),
  paragraph(
    'p-dis-1',
    'This is one of the clearest platform-confirmed reasons follower counts can change.',
  ),
  paragraph(
    'p-dis-2',
    'Instagram says it routinely removes disabled accounts to keep the platform safe, and that this can cause updates to the total number of followers an account displays. (Facebook)',
    [{ href: IG_COUNT_CHANGES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-dis-3',
    'Imagine 150 accounts following you eventually become disabled.',
  ),
  paragraph(
    'p-dis-4',
    'If Instagram removes those accounts, your follower total can decrease even though 150 active people did not manually decide to unfollow you that day.',
  ),
  paragraph('p-dis-5', 'This distinction matters.'),
  paragraph(
    'p-dis-6',
    'A follower decrease can reflect:',
  ),
  bullets('ul-dis', [
    'audience behaviour',
    'or changes to accounts that previously made up that audience.',
  ]),
  paragraph('p-dis-7', 'Those are not the same thing.'),
  heading('h-sudden', 'Why This Can Look Sudden', 3),
  paragraph(
    'p-dis-8',
    'Audience unfollows may happen gradually.',
  ),
  paragraph(
    'p-dis-9',
    'Platform cleanups can sometimes appear more noticeable because multiple invalid or disabled accounts may stop being represented in the visible total.',
  ),
  paragraph(
    'p-dis-10',
    'Do not immediately interpret every noticeable drop as evidence that your newest post failed.',
  ),
  figure(
    'fig-counts-change',
    `${IMAGE_DIR}/why-follower-counts-change.png`,
    'Diagram showing Instagram follower count changing because of people following or unfollowing, platform cleanup of disabled accounts, and audience-fit changes',
    'The visible total can change for more than one reason.',
  ),

  heading('h-spam', '3. Spam or Fake Accounts Can Disappear', 2),
  paragraph(
    'p-sp-1',
    "Instagram's Community Guidelines tell users not to artificially collect followers, likes or shares, and Meta says spam, fake accounts and other accounts that violate its rules may be removed from Instagram. (Facebook)",
    [{ href: IG_COMMUNITY_GUIDELINES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sp-2',
    'Instagram also has a built-in Potential spam follower feature that lets users review and remove accounts Instagram has identified as possible spam followers. (Facebook)',
    [{ href: IG_SPAM_FOLLOWERS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sp-3',
    'This makes follower quality important when interpreting a drop.',
  ),
  paragraph(
    'p-sp-4',
    'Suppose an account gains many suspicious or spam-looking followers.',
  ),
  paragraph(
    'p-sp-5',
    'If some of those accounts later disappear from Instagram, the visible follower count can decrease.',
  ),
  paragraph(
    'p-sp-6',
    'That does not necessarily mean your genuine audience suddenly abandoned the account.',
  ),
  paragraph(
    'p-sp-7',
    'It may mean some of the accounts previously included in the total no longer exist or no longer count.',
  ),

  heading(
    'h-viral',
    '4. A Viral Reel Can Bring Followers Who Do Not Stay',
    2,
  ),
  paragraph(
    'p-vir-1',
    'A large spike in visibility can introduce your profile to people who had never encountered it before.',
  ),
  paragraph(
    'p-vir-2',
    'Some may follow quickly because they enjoyed that particular Reel.',
  ),
  paragraph(
    'p-vir-3',
    "But later they may discover that the account's normal content is different from the video that attracted them.",
  ),
  paragraph(
    'p-vir-4',
    'Imagine an account usually publishes:',
  ),
  bullets('ul-vir-usual', [
    'home workouts,',
    'fitness advice,',
    'and nutrition tips.',
  ]),
  paragraph(
    'p-vir-5',
    'Then one humorous video about a gym accident becomes unusually popular.',
  ),
  paragraph(
    'p-vir-6',
    'Some viewers may follow because of the joke.',
  ),
  paragraph(
    'p-vir-7',
    'If the next several posts return to detailed workout education, part of that temporary audience may decide the profile is not what they expected.',
  ),
  paragraph(
    'p-vir-8',
    "That doesn't mean the viral post was bad.",
  ),
  paragraph('p-vir-9', 'It means:'),
  paragraph(
    'p-vir-10',
    "the audience attracted by one piece of content may not perfectly match the account's long-term audience.",
  ),
  paragraph(
    'p-vir-11',
    'This is why follower growth from one high-visibility post should be evaluated over time rather than treated as permanent immediately.',
  ),

  heading('h-direction', '5. Your Content Direction Changed', 2),
  paragraph('p-dir-1', 'Audience expectations matter.'),
  paragraph(
    'p-dir-2',
    'Suppose people followed a profile for:',
  ),
  paragraph('p-dir-3', 'budget travel advice.'),
  paragraph(
    'p-dir-4',
    'Then the account gradually becomes mostly:',
  ),
  bullets('ul-dir-new', [
    'personal lifestyle content,',
    'restaurant posts,',
    'and unrelated motivational quotes.',
  ]),
  paragraph('p-dir-5', 'Some followers may stay.'),
  paragraph(
    'p-dir-6',
    'Others may leave because the account no longer provides what originally interested them.',
  ),
  paragraph(
    'p-dir-7',
    'The same can happen when an account changes:',
  ),
  bullets('ul-dir-change', [
    'industry,',
    'language,',
    'geographic focus,',
    'posting format,',
    'content subject,',
    'or target audience.',
  ]),
  paragraph(
    'p-dir-8',
    'Changing direction is not automatically wrong.',
  ),
  paragraph('p-dir-9', 'Sometimes it is necessary.'),
  paragraph(
    'p-dir-10',
    'But a repositioning can naturally create audience turnover.',
  ),
  heading('h-ask', 'Ask Yourself', 3),
  paragraph(
    'p-dir-11',
    'Look at the content from when your audience grew.',
  ),
  paragraph(
    'p-dir-12',
    'Then compare it with your most recent posts.',
  ),
  bullets('ul-dir-ask', [
    'Has the subject changed substantially?',
    'Has the intended audience changed?',
    'Has the value proposition of following the account become less obvious?',
  ]),
  paragraph(
    'p-dir-13',
    'Those questions are more useful than simply asking:',
  ),
  paragraph(
    'p-dir-14',
    '“Why does Instagram hate my account?”',
  ),
  paragraph(
    'p-dir-15',
    'If distribution also changed, it can help to understand how the Instagram algorithm works across Feed, Reels, Explore and Stories rather than assuming follower loss is the only signal.',
    [
      {
        href: '/learn/how-instagram-algorithm-works',
        label: 'how the Instagram algorithm works',
      },
    ],
  ),

  heading(
    'h-wrong-audience',
    '6. One Topic Attracted the Wrong Audience',
    2,
  ),
  paragraph(
    'p-wa-1',
    'This is related to content changes, but slightly different.',
  ),
  paragraph(
    'p-wa-2',
    'Your overall content direction may still be consistent.',
  ),
  paragraph(
    'p-wa-3',
    'One particular topic can simply attract an audience that does not fit the rest of your profile.',
  ),
  paragraph(
    'p-wa-4',
    'For example, a social media education account posts:',
  ),
  paragraph(
    'p-wa-5',
    'Celebrity Instagram Follower Counts Compared',
  ),
  paragraph(
    'p-wa-6',
    'That post could attract people interested mainly in celebrity news.',
  ),
  paragraph('p-wa-7', 'Some may follow.'),
  paragraph(
    'p-wa-8',
    'Then they discover the profile primarily publishes technical social media tutorials.',
  ),
  paragraph('p-wa-9', 'They leave.'),
  paragraph('p-wa-10', "The lesson isn't:"),
  paragraph('p-wa-11', 'Never create broad-reach content.'),
  paragraph('p-wa-12', 'The lesson is:'),
  paragraph(
    'p-wa-13',
    'Follower growth is more useful when the people arriving are reasonably aligned with what you plan to publish next.',
  ),
  figure(
    'fig-follow-stay',
    `${IMAGE_DIR}/views-follow-stay.png`,
    'Three-stage diagram from discovering a Reel, to following a profile, to staying if later content still matches expectations',
    'A follow is not necessarily permanent.',
  ),

  heading(
    'h-inconsistent',
    '7. Posting Inconsistently Can Change Audience Behaviour',
    2,
  ),
  paragraph(
    'p-inc-1',
    'There is no official rule saying:',
  ),
  paragraph(
    'p-inc-2',
    '“If you stop posting for exactly seven days, Instagram removes followers.”',
  ),
  paragraph('p-inc-3', "Don't make that claim."),
  paragraph(
    'p-inc-4',
    'Instagram does not automatically delete ordinary followers because you did not upload enough content.',
  ),
  paragraph(
    'p-inc-5',
    'However, from an audience perspective, a long change in publishing behaviour can affect how connected people feel to an account.',
  ),
  paragraph(
    'p-inc-6',
    'Someone might follow because they enjoy:',
  ),
  paragraph('p-inc-7', 'daily photography tutorials.'),
  paragraph(
    'p-inc-8',
    'If the account becomes inactive for months and later returns with completely different content, some followers may decide to leave.',
  ),
  paragraph(
    'p-inc-9',
    'That is ordinary audience behaviour, not necessarily an algorithmic penalty.',
  ),
  paragraph('p-inc-10', 'Keep the distinction clear:'),
  paragraph(
    'p-inc-11',
    'Publishing consistency can affect audience expectations.',
  ),
  paragraph(
    'p-inc-12',
    'It should not be presented as a secret follower-count rule.',
  ),

  heading(
    'h-repetitive',
    '8. Too Much Repetitive or Irrelevant Content Can Cause Unfollows',
    2,
  ),
  paragraph('p-rep-1', 'Following an account is a choice.'),
  paragraph('p-rep-2', 'People can reverse that choice.'),
  paragraph(
    'p-rep-3',
    "If someone's Feed repeatedly contains content they no longer find useful, they can simply unfollow.",
  ),
  paragraph(
    'p-rep-4',
    'Possible examples include:',
  ),
  bullets('ul-rep', [
    'repeating almost identical posts,',
    'changing to unrelated topics,',
    'publishing too much promotional content,',
    'posting content very different from what originally attracted the audience.',
  ]),
  paragraph(
    'p-rep-5',
    'There is no universal posting frequency where this begins.',
  ),
  paragraph(
    'p-rep-6',
    'Different audiences tolerate and prefer different publishing patterns.',
  ),
  paragraph(
    'p-rep-7',
    'Instead of chasing an arbitrary number like:',
  ),
  paragraph('p-rep-8', '“Post exactly twice per day”'),
  paragraph(
    'p-rep-9',
    'review your own audience behaviour and content performance.',
  ),

  heading(
    'h-insights',
    'Use Instagram Insights Before Guessing',
    2,
  ),
  paragraph(
    'p-ins-1',
    'For professional accounts, Instagram Insights provides follower-related information.',
  ),
  paragraph(
    'p-ins-2',
    "Meta's current documentation says follower Insights can include Growth, meaning the number of followers gained or lost. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ins-3',
    "Instagram's professional dashboard also provides recent account metrics including new followers alongside views, interactions and content performance. (Facebook)",
    [{ href: IG_ACCOUNT_CONTENT_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ins-4',
    'This is much better than relying only on the public follower total.',
  ),
  paragraph(
    'p-ins-5',
    'If you only need a public snapshot of the current total while you compare those trends, the Instagram Follower Counter can show the follower count published on a public profile. It does not identify who unfollowed you.',
    [
      {
        href: '/tools/instagram-follower-counter',
        label: 'Instagram Follower Counter',
      },
    ],
  ),
  heading('h-instead', 'Instead of Asking', 3),
  paragraph(
    'p-ins-6',
    '“I lost 40 followers. What happened?”',
  ),
  paragraph('p-ins-7', 'Try asking:'),
  bullets('ul-ins-ask', [
    'When did the decline start?',
    'Was it one day or a multi-week trend?',
    'Did follower gains also change?',
    'Did a specific Reel previously create a large spike?',
    'Did the content subject change?',
    'Did overall views or interactions change too?',
  ]),
  paragraph(
    'p-ins-8',
    'That turns one number into something you can actually investigate.',
  ),

  heading(
    'h-understand',
    'Understand Your Instagram Follower Count',
    2,
  ),
  paragraph(
    'p-und-1',
    'Follower count is an account-level metric. It should not be treated as a guaranteed predictor of likes, views, comments, reach or sales.',
  ),
  paragraph(
    'p-und-2',
    'Those outcomes are easier to separate when you keep Instagram followers, likes, views and comments as different measurements.',
    [
      {
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        label: 'Instagram followers, likes, views and comments',
      },
    ],
  ),
  paragraph(
    'p-und-3',
    "If you're comparing follower options, Instagram followers should be understood as a follower-count service.",
    [{ href: '/buy-instagram-followers', label: 'Instagram followers' }],
  ),
  paragraph(
    'p-und-4',
    'It should not be represented as a guaranteed method for:',
  ),
  bullets('ul-und-not', [
    "improving Instagram's algorithm,",
    'reaching Explore,',
    'increasing Reel views,',
    'producing organic engagement,',
    'or permanently preventing follower loss.',
  ]),
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

  heading(
    'h-net',
    '9. You May Be Looking at Net Growth Instead of Gross Gains',
    2,
  ),
  paragraph('p-net-1', 'This is an easy mistake.'),
  paragraph('p-net-2', 'Suppose over one week:'),
  paragraph('p-net-3', '150 people follow'),
  paragraph('p-net-4', 'but:'),
  paragraph('p-net-5', '100 people unfollow'),
  paragraph('p-net-6', 'Your net growth is:'),
  paragraph('p-net-7', '+50 followers'),
  paragraph(
    'p-net-8',
    'Looking only at the final number can make it seem like growth is weak even though many new people actually followed.',
  ),
  paragraph('p-net-9', 'The reverse can happen too.'),
  paragraph('p-net-10', 'Suppose:'),
  paragraph('p-net-11', '40 people follow'),
  paragraph('p-net-12', 'but:'),
  paragraph('p-net-13', '100 people leave.'),
  paragraph('p-net-14', 'Net change:'),
  paragraph('p-net-15', '-60'),
  paragraph(
    'p-net-16',
    "Instagram Insights' gained/lost follower information can help professional accounts understand this difference. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-net-17',
    'The useful metric is therefore not always:',
  ),
  paragraph('p-net-18', 'How many followers do I have?'),
  paragraph('p-net-19', 'Sometimes it is:'),
  paragraph(
    'p-net-20',
    'How many are arriving, how many are leaving, and how is that pattern changing?',
  ),

  heading(
    'h-restricted',
    '10. A Falling Count Does Not Automatically Mean Instagram Restricted You',
    2,
  ),
  paragraph('p-res-1', 'People often see:'),
  bullets('ul-res-see', [
    'followers dropping,',
    'views changing,',
    'or engagement fluctuating,',
  ]),
  paragraph(
    'p-res-2',
    'and immediately assume the account has been “shadowbanned.”',
  ),
  paragraph(
    'p-res-3',
    'That conclusion requires more evidence.',
  ),
  paragraph(
    'p-res-4',
    'Instagram provides an Account Status area where users can review removed content and certain restrictions affecting features. (Facebook)',
    [{ href: IG_ACCOUNT_STATUS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-res-5',
    'If you genuinely suspect a policy problem, inspect the actual account information available there.',
  ),
  paragraph(
    'p-res-6',
    "Don't diagnose an account restriction from follower count alone.",
  ),
  paragraph(
    'p-res-7',
    'A falling follower total could have completely ordinary explanations such as:',
  ),
  bullets('ul-res-ord', [
    'unfollows,',
    'disabled accounts,',
    'spam cleanup,',
    'or changes in audience fit.',
  ]),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnose-the-drop.png`,
    'Four checks for diagnosing an Instagram follower drop: Insights, recent content, Account Status and whether the pattern is one day or longer',
    "Investigate first. Don't diagnose from follower count alone.",
  ),

  heading(
    'h-apps',
    '11. Third-Party Follower Apps Can Create Additional Risk',
    2,
  ),
  paragraph('p-app-1', 'This needs careful handling.'),
  paragraph(
    'p-app-2',
    'Instagram explicitly warns users about non-Instagram apps that offer likes and followers. Meta says accounts that continue using some of these apps may have parts of the account limited, and another official Help Center page warns that accounts using apps to gain likes or followers may be disabled or terminated. (Facebook)',
    [{ href: IG_THIRD_PARTY_APPS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-app-3',
    'This is particularly relevant when an app requires you to:',
  ),
  bullets('ul-app', [
    'log in with Instagram credentials,',
    'share your password,',
    'authorize suspicious access,',
    'or automate activity through your account.',
  ]),
  paragraph(
    'p-app-4',
    'Do not give third-party applications account credentials unless there is a legitimate, trusted reason for doing so.',
  ),
  paragraph(
    'p-app-5',
    'NovaLikes-supported service ordering should remain separate from giving away an Instagram password.',
  ),

  heading('h-fake', 'Does Instagram Remove Fake Followers?', 2),
  paragraph(
    'p-fk-1',
    'Instagram says spam and fake accounts that violate its Community Guidelines may be removed, and it also provides users with a tool for removing potential spam followers themselves. (Facebook)',
    [{ href: IG_REMOVED_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fk-2',
    'So yes, follower totals can be affected when invalid accounts disappear.',
  ),
  paragraph(
    'p-fk-3',
    'What we should not claim is:',
  ),
  paragraph(
    'p-fk-4',
    'Instagram removes every suspicious follower instantly.',
  ),
  paragraph('p-fk-5', 'or:'),
  paragraph(
    'p-fk-6',
    'Instagram never removes followers.',
  ),
  paragraph('p-fk-7', 'Neither absolute is supported.'),
  paragraph(
    'p-fk-8',
    'Platform enforcement occurs continuously and individual accounts can change over time.',
  ),

  heading('h-real', 'Can Instagram Remove Real Followers?', 2),
  paragraph(
    'p-rl-1',
    'Instagram users themselves can unfollow accounts.',
  ),
  paragraph(
    'p-rl-2',
    'Account owners with private profiles can also remove followers from their follower list. (Facebook)',
    [{ href: IG_REMOVE_FOLLOWER, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rl-3',
    'Instagram separately removes disabled and rule-breaking accounts. (Facebook)',
    [{ href: IG_COUNT_CHANGES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rl-4',
    'So when a follower disappears from your total, you generally cannot determine the exact reason from the public follower number alone.',
  ),
  paragraph(
    'p-rl-5',
    'That is why follower-loss tracker claims should be treated carefully.',
  ),

  heading(
    'h-who',
    'Can You See Exactly Who Unfollowed You?',
    2,
  ),
  paragraph(
    'p-who-1',
    "Instagram's official Insights focuses on follower trends such as growth and follower gains/losses rather than providing an official professional dashboard whose purpose is to list every person who recently unfollowed you. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-who-2',
    'Be cautious about third-party “unfollower” applications, particularly any service asking for unnecessary Instagram login credentials.',
  ),
  paragraph(
    'p-who-3',
    'Instagram itself warns about apps offering likes and followers and the account risks associated with some non-Instagram services. (Facebook)',
    [{ href: IG_THIRD_PARTY_APPS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-who-4',
    'For strategy, the trend is usually more useful than obsessing over individual usernames anyway.',
  ),

  heading(
    'h-after-spike',
    'Why Do Followers Drop Immediately After a Big Increase?',
    2,
  ),
  paragraph(
    'p-spk-1',
    'Several explanations are possible.',
  ),
  bullets('ul-spk', [
    'A successful Reel may bring a temporary audience.',
    'Some viewers may follow quickly and later realize the profile isn\'t relevant to them.',
    'Some accounts may become disabled.',
    'Some suspicious accounts may eventually be removed.',
  ]),
  paragraph(
    'p-spk-2',
    'The important thing is not to assume one explanation without evidence.',
  ),
  paragraph('p-spk-3', 'Look at:'),
  bullets('ul-spk-look', [
    'where the growth came from,',
    'what content caused it,',
    'what you posted afterward,',
    'and what Instagram Insights shows about gains and losses.',
  ]),

  heading(
    'h-ten',
    'Is Losing 10 Instagram Followers a Day Normal?',
    2,
  ),
  paragraph(
    'p-ten-1',
    'There is no universal number that can be labelled “normal” for every Instagram account.',
  ),
  paragraph(
    'p-ten-2',
    'Ten followers would mean something very different for an account with:',
  ),
  paragraph('p-ten-3', '200 followers'),
  paragraph('p-ten-4', 'than for an account with:'),
  paragraph('p-ten-5', '2 million followers.'),
  paragraph('p-ten-6', 'Your own baseline is more useful.'),
  paragraph('p-ten-7', 'Compare:'),
  bullets('ul-ten', [
    'daily losses,',
    'daily gains,',
    'weekly net growth,',
    'content activity,',
    'and previous periods.',
  ]),
  paragraph(
    'p-ten-8',
    'Professional Insights allow follower growth to be evaluated over time instead of treating one day\'s movement in isolation. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-weeks',
    'What If Followers Keep Dropping for Weeks?',
    2,
  ),
  paragraph(
    'p-wk-1',
    'A persistent trend deserves more investigation than one unusual day.',
  ),
  paragraph('p-wk-2', 'Review:'),
  bullets('ul-wk', [
    'your follower gains and losses,',
    'recent content topics,',
    'whether you changed audience or niche,',
    'whether a viral post previously inflated growth,',
    'whether overall views changed,',
    'and your Account Status.',
  ]),
  paragraph(
    'p-wk-3',
    'Instagram Insights provides audience and content data to professional accounts, while Account Status can surface actual platform issues. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wk-4',
    "If there is no platform warning, don't invent one.",
  ),
  paragraph(
    'p-wk-5',
    'Focus on the audience and content evidence you actually have.',
  ),

  heading(
    'h-strategy',
    'Should You Change Your Entire Content Strategy When Followers Drop?',
    2,
  ),
  paragraph('p-st-1', 'Not after one small movement.'),
  paragraph('p-st-2', 'A single day is weak evidence.'),
  paragraph(
    'p-st-3',
    'Instead, look for patterns across multiple pieces of content and a meaningful period of time.',
  ),
  paragraph(
    'p-st-4',
    'If the account repeatedly:',
  ),
  bullets('ul-st', [
    'gains followers after one topic,',
    'loses momentum after another,',
    'and performs differently across formats,',
  ]),
  paragraph(
    'p-st-5',
    'that information can help guide future content.',
  ),
  paragraph(
    'p-st-6',
    'But changing the entire strategy every time the follower count moves creates another problem:',
  ),
  paragraph(
    'p-st-7',
    'the audience never gets a consistent idea of what the account represents.',
  ),

  heading(
    'h-delete',
    'Should You Delete Posts That Caused Unfollows?',
    2,
  ),
  paragraph(
    'p-del-1',
    'Usually, follower loss alone is insufficient evidence that a specific post should be deleted.',
  ),
  paragraph(
    'p-del-2',
    'Ask whether the post:',
  ),
  bullets('ul-del', [
    'fits your intended audience,',
    'is factually useful,',
    'matches your brand,',
    'violates any policy,',
    'or represents the direction you actually want the account to take.',
  ]),
  paragraph(
    'p-del-3',
    'If the content is appropriate but some old followers do not want that direction, losing those followers may simply reflect audience repositioning.',
  ),
  paragraph(
    'p-del-4',
    'A smaller but better-aligned audience can sometimes be more useful than preserving every historical follower at all costs.',
  ),

  heading(
    'h-buy',
    'Should You Buy More Followers Every Time the Count Drops?',
    2,
  ),
  paragraph(
    'p-buy-1',
    'No strategy should be based on automatically replacing every visible decrease.',
  ),
  paragraph(
    'p-buy-2',
    'First understand why the number changed.',
  ),
  paragraph(
    'p-buy-3',
    'If Instagram removed disabled or spam accounts, repeatedly chasing the previous number does not solve the underlying issue. Instagram explicitly says disabled-account removals can change follower totals. (Facebook)',
    [{ href: IG_COUNT_CHANGES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-buy-4',
    'Likewise, if real people are leaving because the content no longer matches what they followed for, increasing the visible count does not fix the content-audience mismatch.',
  ),
  paragraph(
    'p-buy-5',
    'A follower service should therefore be treated as exactly that:',
  ),
  paragraph('p-buy-6', 'a follower-count service.'),
  paragraph(
    'p-buy-7',
    'Not as a substitute for understanding retention, content or audience fit.',
  ),

  heading(
    'h-reduce',
    'How to Reduce Avoidable Instagram Follower Loss',
    2,
  ),
  paragraph(
    'p-rd-1',
    'You cannot prevent every unfollow.',
  ),
  paragraph('p-rd-2', 'Nor should you try.'),
  paragraph(
    'p-rd-3',
    'People should be able to decide what they want to follow.',
  ),
  paragraph(
    'p-rd-4',
    'What you can do is make your account easier to understand.',
  ),
  heading('h-rd-profile', 'Keep the Profile Clear', 3),
  paragraph(
    'p-rd-5',
    'A new visitor should quickly understand what your account is about.',
  ),
  heading(
    'h-rd-expect',
    'Keep Content Expectations Reasonably Consistent',
    3,
  ),
  paragraph(
    'p-rd-6',
    'You can experiment without turning the profile into an unrelated mix of topics.',
  ),
  heading(
    'h-rd-right',
    'Study What Attracts the Right Followers',
    3,
  ),
  paragraph(
    'p-rd-7',
    "Don't evaluate content only by views.",
  ),
  paragraph(
    'p-rd-8',
    'Look at whether the resulting audience actually fits the profile.',
  ),
  heading('h-rd-insights', 'Review Instagram Insights', 3),
  paragraph(
    'p-rd-9',
    'Track gains and losses rather than obsessing only over the headline follower total. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading(
    'h-rd-status',
    'Check Account Status When Necessary',
    3,
  ),
  paragraph(
    'p-rd-10',
    'If you suspect a real platform restriction, look for actual evidence in Account Status rather than guessing. (Facebook)',
    [{ href: IG_ACCOUNT_STATUS, label: 'Facebook', external: true }],
  ),

  heading('h-not-bad', 'Follower Loss Is Not Always Bad', 2),
  paragraph(
    'p-nb-1',
    'This may sound counterintuitive.',
  ),
  paragraph(
    'p-nb-2',
    'Suppose your account originally covered:',
  ),
  paragraph('p-nb-3', 'general lifestyle content.'),
  paragraph(
    'p-nb-4',
    'You decide to focus exclusively on:',
  ),
  paragraph('p-nb-5', 'professional photography.'),
  paragraph(
    'p-nb-6',
    'Some followers who wanted lifestyle content leave.',
  ),
  paragraph(
    'p-nb-7',
    'At the same time, photographers begin following.',
  ),
  paragraph(
    'p-nb-8',
    'Your follower count might temporarily grow more slowly or even decline.',
  ),
  paragraph(
    'p-nb-9',
    'But your audience becomes more aligned with what you actually want to publish.',
  ),
  paragraph(
    'p-nb-10',
    'This is why follower count should be treated as a metric, not as the entire purpose of an Instagram account.',
  ),

  heading(
    'h-moving',
    'Your Instagram Follower Count Is a Moving Audience',
    2,
  ),
  paragraph(
    'p-mv-1',
    'Followers are not permanent entries in a database you control.',
  ),
  paragraph(
    'p-mv-2',
    'They are Instagram accounts connected to your profile.',
  ),
  bullets('ul-mv', [
    'People can unfollow.',
    'Accounts can become disabled.',
    'Spam or fake accounts may be removed.',
  ]),
  paragraph(
    'p-mv-3',
    'Instagram itself may update follower totals when disabled accounts are removed. (Facebook)',
    [{ href: IG_COUNT_CHANGES, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-mv-4',
    'The correct response to a follower drop is therefore not panic.',
  ),
  paragraph('p-mv-5', 'It is diagnosis.'),
  paragraph('p-mv-6', 'Look at:'),
  bullets('ul-mv-look', [
    'how large the change was,',
    'when it happened,',
    'whether gains also changed,',
    'what content preceded it,',
    'whether the audience fits your profile,',
    'and whether Instagram shows an actual account issue.',
  ]),
  paragraph(
    'p-mv-7',
    'That gives you useful information.',
  ),
  paragraph(
    'p-mv-8',
    'The raw follower number alone does not.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Instagram followers can leave simply by unfollowing an account.',
    'Instagram routinely removes disabled accounts, which can change follower totals.',
    'Spam and fake accounts may be removed from Instagram.',
    'Instagram can identify potential spam followers and provides tools for removing them.',
    'Professional Instagram Insights can show follower growth, including followers gained and lost.',
    'A follower decline alone does not prove that Instagram has restricted an account. Account Status is the better place to check for actual platform issues.',
    'Follower count should not be treated as a guarantee of views, likes, reach or sales.',
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

export const WHY_INSTAGRAM_FOLLOWERS_DROP_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-why-instagram-followers-drop',
  slug: SLUG,
  title: 'Why Do Instagram Followers Drop? Common Reasons Explained',
  excerpt:
    'Seeing your Instagram follower count fall can be frustrating, especially when the change happens quickly.',
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
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
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
    'People unfollow normally',
    'Instagram removes disabled accounts',
    'Spam or fake accounts disappear',
    'Your recent content attracts a different audience',
    'A viral post brought temporary followers who later leave',
    'Your content direction changes',
    'Your account has an actual status or policy issue',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why did my Instagram followers suddenly drop?',
      answer:
        'One possible reason is Instagram removing disabled accounts. Instagram explicitly says it routinely removes disabled accounts and that this can update follower totals. Normal unfollows and removal of spam/fake accounts can also contribute.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does Instagram remove fake followers?',
      answer:
        'Instagram says spam and fake accounts that violate its rules may be removed, and it provides a Potential spam follower-management feature.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I see how many Instagram followers I gained and lost?',
      answer:
        'Professional Instagram Insights can show follower Growth, including the number of followers gained or lost.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Does losing followers mean I am shadowbanned?',
      answer:
        "Not by itself. Follower loss has multiple possible causes. If you suspect an actual account restriction, Instagram's Account Status provides information about removed content and certain feature restrictions.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Why do I lose followers after gaining them quickly?',
      answer:
        'A rapid growth period may attract people who later decide the profile is not relevant to them, while disabled or spam accounts can also disappear. Instagram confirms that removal of disabled accounts can change follower totals.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can third-party follower apps affect my Instagram account?',
      answer:
        'Instagram warns that continued use of certain non-Instagram apps used to gain followers or likes can lead to account limitations, and official guidance also warns that accounts using these apps may be disabled or terminated.',
      schemaEligible: true,
    },
  ],
};
