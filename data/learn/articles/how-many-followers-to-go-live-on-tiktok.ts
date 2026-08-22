/**
 * Article #19 — How Many Followers Do You Need to Go LIVE on TikTok?
 * Scheduled: Monday 5 October 2026.
 * Informational / eligibility intent. Distinct from /buy-tiktok-followers (buying intent).
 * Do not present 1,000 followers as a universal LIVE unlock.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-many-followers-to-go-live-on-tiktok';
const SCHEDULED_AT = '2026-10-05T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_WHAT_IS_LIVE =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/what-is-tiktok-live';
const TT_LIVE_AGE =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/age-requirements-for-tiktok-live';
const TT_LIVE_ISSUES =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/issues-with-tiktok-live';
const TT_USER_SAFETY =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/user-safety';
const TT_CREATOR_REWARDS =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program';
const TT_LIVE_GIFTS =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/live-gifts-on-tiktok';
const TT_GIFTS =
  'https://support.tiktok.com/en/live-gifts-wallet/gifts/gifts';
const TT_COHOST =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/cohost-on-tiktok-live';
const TT_MULTI_GUEST =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/tiktok-live-multi-guest';
const TT_MODERATING =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/moderating-on-tiktok-live';
const TT_CREATOR_SEARCH_INSIGHTS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';

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
    "If you're searching for the TikTok LIVE follower requirement, you have probably seen one number repeated everywhere: 1,000 followers.",
  ),
  paragraph(
    'p-open-2',
    'That number is commonly used as a TikTok LIVE benchmark.',
  ),
  paragraph(
    'p-open-3',
    "But TikTok's current official guidance is more careful.",
  ),
  paragraph(
    'p-open-4',
    'TikTok says creators must meet a local minimum-follower threshold to access LIVE rather than publishing one universal follower number that applies identically to every account in every country. TikTok also requires creators to be at least 18 years old to host a LIVE. (TikTok Support)',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-5',
    'So the most accurate 2026 answer is that many creators use 1,000 followers as a practical reference point, but TikTok does not currently present 1,000 as a guaranteed worldwide unlock for every account.',
  ),
  paragraph(
    'p-open-6',
    'Your actual LIVE eligibility can depend on:',
  ),
  bullets('ul-open', [
    'your follower threshold,',
    'your age,',
    'your location,',
    'feature availability,',
    "and whether the account meets TikTok's eligibility requirements.",
  ]),
  paragraph(
    'p-open-7',
    'TikTok says only creators who meet its LIVE eligibility requirements can start a LIVE. (TikTok Support)',
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-8',
    'This explains why two accounts with similar follower counts may not necessarily see the same LIVE options.',
  ),

  heading(
    'h-why-1000',
    'Why Does Everyone Say You Need 1,000 TikTok Followers?',
    2,
  ),
  paragraph(
    'p-w1-1',
    'Because 1,000 followers has historically been the most commonly referenced TikTok LIVE threshold and continues to appear across creator guidance.',
  ),
  paragraph(
    'p-w1-2',
    "But TikTok's current official wording focuses on meeting a local follower threshold rather than promising one universal number across every market. (TikTok Support)",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-w1-3',
    'That means 1,000 can still be useful for planning.',
  ),
  paragraph(
    'p-w1-4',
    'It just should not be treated as an automatic worldwide guarantee.',
  ),
  paragraph(
    'p-w1-5',
    'A better way to write the rule is: around 1,000 followers is commonly used as the TikTok LIVE benchmark, but TikTok applies a local minimum-follower threshold, so eligibility can vary.',
  ),
  paragraph(
    'p-w1-6',
    'Not: TikTok always unlocks LIVE at exactly 1,000 followers.',
  ),
  figure(
    'fig-elig',
    `${IMAGE_DIR}/live-eligibility-more-than-one-number.png`,
    'TikTok LIVE eligibility depends on followers, age, availability and account eligibility, not one universal number',
    '1,000 followers is commonly referenced, but it is not a universal automatic unlock.',
  ),

  heading(
    'h-age',
    'What Is the Minimum Age to Go LIVE on TikTok?',
    2,
  ),
  paragraph(
    'p-ag-1',
    'TikTok currently requires users to be 18 years old or older to go LIVE. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ag-2',
    'This is important because many older articles still mention lower age requirements.',
  ),
  paragraph(
    'p-ag-3',
    'Those articles may be outdated.',
  ),
  paragraph(
    'p-ag-4',
    "TikTok's current Help Center says 18+ to host a LIVE. (TikTok Support)",
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ag-5',
    'TikTok can also ask users to confirm their age before allowing LIVE access. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ag-6',
    'So having enough followers is not enough if the account does not meet the age requirement.',
  ),

  heading(
    'h-16',
    'Can a 16-Year-Old Go LIVE on TikTok?',
    2,
  ),
  paragraph(
    'p-16-1',
    "Under TikTok's current published rule, no.",
  ),
  paragraph(
    'p-16-2',
    'TikTok says creators must be at least 18 years old to host a LIVE. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-16-3',
    "This is one area where older tutorials can be particularly misleading because TikTok's age rules have changed over time.",
  ),
  paragraph(
    'p-16-4',
    'For a current article, use the current 18+ requirement.',
  ),
  paragraph(
    'p-16-5',
    'Do not repeat an older “16+ to go LIVE, 18+ for Gifts” rule.',
  ),
  paragraph(
    'p-16-6',
    "That is not TikTok's current LIVE-hosting guidance.",
  ),

  heading(
    'h-confirm',
    'Does TikTok Check Your Age Before You Go LIVE?',
    2,
  ),
  paragraph('p-cf-1', 'It can.'),
  paragraph(
    'p-cf-2',
    'TikTok says it may ask creators to confirm their age before allowing them to go LIVE in order to ensure they meet the minimum-age requirement. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-cf-3',
    'That means an account could potentially meet a follower threshold while still needing to complete an age-confirmation step.',
  ),
  paragraph(
    'p-cf-4',
    'If TikTok believes the account does not meet the required age, follower count will not override that requirement.',
  ),

  heading(
    'h-us',
    'How Many Followers Do You Need to Go LIVE in the US?',
    2,
  ),
  paragraph(
    'p-us-1',
    "TikTok's current global Help Center does not give us a reliable basis for promising that one exact follower number applies to every US account.",
  ),
  paragraph(
    'p-us-2',
    'Its current wording uses a local minimum-follower threshold. (TikTok Support)',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-us-3',
    'That is why this article does not publish a country-by-country follower table unless TikTok itself currently publishes those country-specific figures.',
  ),
  paragraph(
    'p-us-4',
    'Otherwise we would be inventing precision.',
  ),
  paragraph(
    'p-us-5',
    'The better advice: check whether LIVE appears on the actual account after you meet the age and follower requirements applicable to your location.',
  ),

  heading(
    'h-country',
    'Does the TikTok LIVE Requirement Vary by Country?',
    2,
  ),
  paragraph(
    'p-co-1',
    "TikTok's use of a local minimum-follower threshold indicates that follower eligibility is not necessarily identical in every market. (TikTok Support)",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-co-2',
    'This is why one user may report LIVE access below a number another creator needed, or two accounts in different locations may not receive identical feature access.',
  ),
  paragraph(
    'p-co-3',
    'Do not build your strategy around screenshots from another creator without checking your own account.',
  ),
  paragraph(
    'p-co-4',
    'TikTok controls feature eligibility.',
  ),
  figure(
    'fig-two',
    `${IMAGE_DIR}/two-accounts-different-live-access.png`,
    'Two TikTok accounts with similar follower counts can see different LIVE access because of local threshold, eligibility or availability',
    'Follower count is only one part of TikTok LIVE eligibility.',
  ),

  heading(
    'h-500',
    'Can You Go LIVE on TikTok With 500 Followers?',
    2,
  ),
  paragraph(
    'p-500-1',
    'Possibly for some accounts if their applicable eligibility threshold allows it, but you should not promise that 500 followers unlocks LIVE.',
  ),
  paragraph(
    'p-500-2',
    'TikTok currently describes the requirement as a local minimum-follower threshold. (TikTok Support)',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-500-3',
    'So claims such as “500 followers now unlock LIVE for everyone” would be unreliable.',
  ),
  paragraph(
    'p-500-4',
    'If LIVE appears on an eligible account below the commonly quoted 1,000 benchmark, use the feature TikTok has actually provided.',
  ),
  paragraph(
    'p-500-5',
    "But don't assume another account will receive the same access.",
  ),

  heading(
    'h-under',
    'Can You Go LIVE With Fewer Than 1,000 Followers?',
    2,
  ),
  paragraph(
    'p-un-1',
    'The safest answer is that some accounts may have a local eligibility threshold that differs from the commonly referenced 1,000 followers.',
  ),
  paragraph(
    'p-un-2',
    "TikTok's current wording supports variation rather than one universal global number. (TikTok Support)",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-un-3',
    'Do not advise users to change region with a VPN, fake their age, switch account type repeatedly, contact support pretending they previously had LIVE, or exploit a supposed bug just to bypass an eligibility requirement.',
  ),
  paragraph(
    'p-un-4',
    'If TikTok has not made LIVE available to the account, the sensible path is to continue meeting the legitimate account requirements.',
  ),

  heading(
    'h-trick',
    'Is There a TikTok LIVE 500 Follower Trick?',
    2,
  ),
  paragraph(
    'p-tr-1',
    'There is no official TikTok-supported trick that guarantees LIVE access at 500 followers.',
  ),
  paragraph(
    'p-tr-2',
    "TikTok's official position is that only creators who meet eligibility requirements can go LIVE. (TikTok Support)",
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-tr-3',
    'So articles promising that three settings will bypass the follower rule should be treated carefully.',
  ),
  paragraph(
    'p-tr-4',
    'A user seeing LIVE below 1,000 does not prove a universal bypass.',
  ),
  paragraph(
    'p-tr-5',
    'It may simply reflect local eligibility, account-level availability or TikTok testing and features available to that account.',
  ),

  heading(
    'h-business',
    'Can Switching to a Business Account Unlock TikTok LIVE?',
    2,
  ),
  paragraph(
    'p-bu-1',
    'Do not recommend switching account types as a guaranteed LIVE bypass.',
  ),
  paragraph(
    'p-bu-2',
    "TikTok's official LIVE troubleshooting guidance says only eligible creators can go LIVE. (TikTok Support)",
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-bu-3',
    'There is no current official TikTok rule saying switch to a Business Account and follower requirements disappear.',
  ),
  paragraph(
    'p-bu-4',
    'Choose an account type based on what the account actually needs.',
  ),
  paragraph('p-bu-5', 'Not as an eligibility hack.'),

  heading(
    'h-missing',
    "Why Don't I Have the LIVE Option Even With Enough Followers?",
    2,
  ),
  paragraph(
    'p-ms-1',
    'This is where the article becomes genuinely useful.',
  ),
  paragraph(
    'p-ms-2',
    'If you believe your account meets the follower threshold, several other conditions may still matter.',
  ),
  heading('h-ms-age', '1. Check Your Age', 3),
  paragraph(
    'p-ms-3',
    'You must be at least 18 to host a TikTok LIVE. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  heading('h-ms-confirm', '2. Check Whether TikTok Has Asked You to Confirm Your Age', 3),
  paragraph(
    'p-ms-4',
    'TikTok may require age confirmation before giving LIVE access. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  heading('h-ms-region', '3. Check Regional and Account Availability', 3),
  paragraph(
    'p-ms-5',
    "TikTok uses a local follower threshold, so another creator's experience may not match yours. (TikTok Support)",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  heading('h-ms-elig', '4. Check Eligibility', 3),
  paragraph(
    'p-ms-6',
    'TikTok says only eligible creators can go LIVE. (TikTok Support)',
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  heading('h-ms-restricted', '5. Check Restricted Mode', 3),
  paragraph(
    'p-ms-7',
    'TikTok says going LIVE is unavailable while Restricted Mode is enabled. (TikTok Support)',
    [{ href: TT_USER_SAFETY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ms-8',
    'That one is easy to overlook.',
  ),

  heading(
    'h-restricted',
    'Restricted Mode Can Prevent TikTok LIVE',
    2,
  ),
  paragraph(
    'p-rm-1',
    "TikTok's current Safety documentation specifically says certain features are unavailable when Restricted Mode is turned on, including going LIVE and gifting on LIVE. (TikTok Support)",
    [{ href: TT_USER_SAFETY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rm-2',
    'If your account otherwise appears eligible but LIVE is unavailable, review Settings and privacy, then Content preferences, then Restricted Mode, and check whether Restricted Mode is active. (TikTok Support)',
    [{ href: TT_USER_SAFETY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rm-3',
    'Do not turn it off automatically if it was deliberately enabled for safety or Family Pairing reasons.',
  ),
  paragraph(
    'p-rm-4',
    'Just understand that it affects LIVE access.',
  ),

  heading(
    'h-still',
    "What If I Meet the Requirements but Still Can't Go LIVE?",
    2,
  ),
  paragraph(
    'p-st-1',
    'TikTok has an official LIVE troubleshooting page.',
  ),
  paragraph(
    'p-st-2',
    'It says only creators meeting eligibility requirements can go LIVE, and users who meet the requirements but still experience issues can report the problem to TikTok. (TikTok Support)',
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-st-3',
    'That is more legitimate than following random LIVE-unlock tricks.',
  ),
  paragraph(
    'p-st-4',
    "Use TikTok's in-app support and reporting process.",
  ),
  paragraph(
    'p-st-5',
    'Do not send your password, verification code or account credentials to somebody claiming they can manually unlock LIVE.',
  ),

  heading(
    'h-instant',
    'Does Reaching 1,000 Followers Instantly Unlock LIVE?',
    2,
  ),
  paragraph('p-in-1', 'Do not promise that.'),
  paragraph(
    'p-in-2',
    "Even if 1,000 is the commonly used planning benchmark, TikTok's current requirement is described as a local minimum-follower threshold, and other eligibility factors still apply. (TikTok Support)",
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-in-3',
    'So reaching 1,000 followers does not necessarily equal LIVE instantly appearing everywhere.',
  ),
  paragraph(
    'p-in-4',
    'If the button is absent, check age, Restricted Mode, actual account eligibility and TikTok support.',
  ),

  heading(
    'h-public',
    'Does TikTok LIVE Require a Public Account?',
    2,
  ),
  paragraph(
    'p-pu-1',
    "Do not invent a blanket rule unless TikTok's current account interface specifically requires it for your account.",
  ),
  paragraph(
    'p-pu-2',
    'The more important documented requirements are age, follower eligibility and LIVE feature availability. (TikTok Support)',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pu-3',
    'If public audience growth is your broader objective, a public account usually makes more strategic sense because TikTok public accounts provide broader visibility than private accounts.',
  ),
  paragraph(
    'p-pu-4',
    'Our separate guide on public vs private TikTok accounts covers that distinction.',
    [
      {
        href: '/learn/public-vs-private-tiktok-account',
        label: 'public vs private TikTok accounts',
      },
    ],
  ),
  paragraph(
    'p-pu-5',
    'But do not rewrite that into “public automatically unlocks LIVE.”',
  ),
  paragraph('p-pu-6', "It doesn't."),

  heading(
    'h-views',
    'Does TikTok LIVE Require a Certain Number of Video Views?',
    2,
  ),
  paragraph(
    'p-vw-1',
    "TikTok's current general LIVE requirements should not be confused with Creator Rewards requirements.",
  ),
  paragraph(
    'p-vw-2',
    'Creator Rewards has separate criteria such as follower and recent video-view requirements. (TikTok Support)',
    [{ href: TT_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-vw-3', 'Those are different programs.'),
  paragraph(
    'p-vw-4',
    'Do not tell users they need 100,000 recent views to go LIVE.',
  ),
  paragraph(
    'p-vw-5',
    'That figure belongs to Creator Rewards eligibility, not normal LIVE hosting.',
  ),
  paragraph(
    'p-vw-6',
    'TikTok has multiple creator features with different thresholds.',
  ),
  paragraph(
    'p-vw-7',
    'Always check which feature a requirement belongs to.',
  ),

  heading(
    'h-rewards',
    'TikTok LIVE vs Creator Rewards Requirements',
    2,
  ),
  paragraph('p-rw-1', 'These are separate.'),
  {
    id: 'table-features',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Feature', 'Main Purpose'],
    rows: [
      ['TikTok LIVE', 'Real-time livestreaming'],
      ['Creator Rewards', 'Monetization of eligible original videos'],
      ['Video Gifts', 'Viewer gifting on eligible videos'],
      ['TikTok One', 'Creator and brand collaboration platform'],
    ],
  },
  paragraph(
    'p-rw-2',
    'Creator Rewards currently has requirements including at least 10,000 followers and 100,000 video views in the previous 30 days in eligible regions. (TikTok Support)',
    [{ href: TT_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rw-3',
    "Those requirements should not be copied into a TikTok LIVE eligibility article as though they're LIVE rules.",
  ),

  heading(
    'h-gifts-same',
    'Is TikTok LIVE the Same as LIVE Gifts?',
    2,
  ),
  paragraph('p-gs-1', 'No.'),
  paragraph(
    'p-gs-2',
    'Being able to host a LIVE and being eligible for every LIVE monetization feature are not automatically the same thing.',
  ),
  paragraph(
    'p-gs-3',
    'TikTok describes LIVE Gifts as a separate feature that allows viewers to send virtual Gifts during qualifying LIVE streams. (TikTok Support)',
    [{ href: TT_LIVE_GIFTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-gs-4',
    'Gift and Coin features also have their own age, availability and eligibility rules. (TikTok Support)',
    [{ href: TT_GIFTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-gs-5',
    'So someone asking whether they can go LIVE and someone asking whether they can earn from LIVE Gifts are asking two different questions.',
  ),

  heading(
    'h-gifts-age',
    'How Old Do You Need to Be for TikTok LIVE Gifts?',
    2,
  ),
  paragraph(
    'p-ga-1',
    "TikTok's current Gifts documentation says users need to be at least 18 years old, or 19 in South Korea, to purchase and use Coins for Gifts. (TikTok Support)",
    [{ href: TT_GIFTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ga-2',
    "TikTok's LIVE Gifts feature also has separate creator eligibility and availability conditions. (TikTok Support)",
    [{ href: TT_LIVE_GIFTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ga-3',
    'This is another reason not to summarize all TikTok creator features with “get 1,000 followers and everything unlocks.”',
  ),
  paragraph(
    'p-ga-4',
    "That's not how the platform works.",
  ),
  paragraph(
    'p-ga-5',
    'Different features have different rules.',
  ),
  figure(
    'fig-features',
    `${IMAGE_DIR}/features-different-requirements.png`,
    'TikTok LIVE, LIVE Gifts, Creator Rewards and TikTok One have different eligibility requirements',
    'One follower milestone does not unlock every TikTok creator feature.',
  ),

  heading(
    'h-more-followers',
    'Does Going LIVE Help You Get More Followers?',
    2,
  ),
  paragraph(
    'p-mf-1',
    'A LIVE can create another way for an audience to interact with a creator.',
  ),
  paragraph(
    'p-mf-2',
    'TikTok LIVE supports real-time creator and viewer interaction, and features such as multi-guest and co-hosting can create additional forms of live participation. (TikTok Support)',
    [{ href: TT_COHOST, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-mf-3',
    'But do not promise that going LIVE always increases followers.',
  ),
  paragraph(
    'p-mf-4',
    'A viewer can watch, comment, leave or choose to follow.',
  ),
  paragraph(
    'p-mf-5',
    'Those are separate actions.',
  ),
  paragraph(
    'p-mf-6',
    'The quality and relevance of the LIVE still matter.',
  ),
  paragraph(
    'p-mf-7',
    'TikTok followers, likes and views also measure different things, so LIVE activity should not be treated as a substitute for understanding those metrics.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
    ],
  ),

  heading(
    'h-fyp',
    'Does Going LIVE Improve FYP Reach?',
    2,
  ),
  paragraph(
    'p-fyp-1',
    'Do not claim a guaranteed relationship.',
  ),
  paragraph(
    'p-fyp-2',
    'TikTok does not publicly state that hosting a LIVE gives your future videos a ranking boost, or that LIVE increases FYP reach by a fixed percentage.',
  ),
  paragraph(
    'p-fyp-3',
    'So this article should not repeat that type of growth myth.',
  ),
  paragraph('p-fyp-4', 'LIVE is a creator format.'),
  paragraph(
    'p-fyp-5',
    "FYP video recommendation is another part of TikTok's ecosystem.",
  ),
  paragraph(
    'p-fyp-6',
    'Treat them separately unless TikTok documents a direct relationship.',
  ),

  heading(
    'h-buy',
    'Can Buying Followers Unlock TikTok LIVE?',
    2,
  ),
  paragraph(
    'p-by-1',
    'This needs careful wording.',
  ),
  paragraph(
    'p-by-2',
    'Changing a follower count through a third-party service should not be presented as a guaranteed way to unlock TikTok LIVE.',
  ),
  paragraph(
    'p-by-3',
    'TikTok controls LIVE eligibility and says only creators meeting the required eligibility conditions can use LIVE. (TikTok Support)',
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-by-4',
    'A follower number alone cannot guarantee LIVE access, age eligibility, regional availability, account eligibility, Gifts or monetization.',
  ),
  paragraph(
    'p-by-5',
    'TikTok also has rules against artificial or fake engagement, so third-party engagement carries platform-policy risk and should not be presented as TikTok-approved or risk-free.',
  ),
  paragraph(
    'p-by-6',
    'Therefore this article should never claim that buying followers unlocks LIVE, that LIVE is enabled after purchase, or that TikTok approves purchased followers for eligibility.',
  ),
  paragraph('p-by-7', 'Those would be unsupported.'),

  heading(
    'h-service',
    'TikTok Followers and LIVE Eligibility Are Separate',
    2,
  ),
  paragraph(
    'p-svc-1',
    'If someone is comparing TikTok follower options, TikTok followers should be understood as a follower-count service, not a LIVE-unlock method.',
    [{ href: '/buy-tiktok-followers', label: 'TikTok followers' }],
  ),
  paragraph(
    'p-svc-2',
    'A follower service concerns the follower-count metric.',
  ),
  paragraph(
    'p-svc-3',
    'TikTok itself decides whether an account meets LIVE requirements.',
  ),
  {
    id: 'cta-tt-followers',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-tiktok-followers',
    heading: 'Understanding TikTok Follower Options',
    description:
      "Follower count is only one part of TikTok LIVE eligibility. If you're comparing TikTok follower packages, do not treat a follower purchase as a guaranteed way to unlock LIVE or other TikTok features.",
    label: 'View TikTok Followers',
  },

  heading(
    'h-useful',
    'Is 1,000 Followers a Useful Goal Anyway?',
    2,
  ),
  paragraph('p-uf-1', 'Yes, as an audience milestone.'),
  paragraph(
    'p-uf-2',
    'Our earlier guide on how to get your first 1,000 TikTok followers organically explains how to work toward that level through clear audience positioning, search-driven topics, content clusters, analytics and audience feedback.',
    [
      {
        href: '/learn/how-to-get-1000-tiktok-followers',
        label: 'how to get your first 1,000 TikTok followers organically',
      },
    ],
  ),
  paragraph(
    'p-uf-3',
    'But 1,000 should be treated as an audience milestone and common LIVE planning benchmark rather than a magical TikTok algorithm number.',
  ),
  paragraph('p-uf-4', 'Even at 1,000 followers:'),
  bullets('ul-uf', [
    'video performance can vary,',
    'LIVE access still depends on actual eligibility,',
    'and other creator programs can have completely different requirements.',
  ]),

  heading(
    'h-organic',
    'How to Reach the LIVE Threshold Organically',
    2,
  ),
  paragraph(
    'p-og-1',
    'If LIVE is your goal, focus on building an actual audience rather than chasing only the visible number.',
  ),
  heading('h-og-1', '1. Make Your Account Easy to Understand', 3),
  paragraph(
    'p-og-2',
    'A new viewer should know who the account is for, what you publish and why they should follow.',
  ),
  heading('h-og-2', '2. Create Specific Content', 3),
  paragraph(
    'p-og-3',
    'Instead of “TikTok Tips,” try a specific problem such as why TikTok videos get views but no followers. Specific problems create clearer reasons to watch.',
  ),
  heading('h-og-3', '3. Use Creator Search Insights', 3),
  paragraph(
    'p-og-4',
    "TikTok's Creator Search Insights lets creators identify search topics, content gaps and Search performance. That can help you create content around questions people already search for. (TikTok Support)",
    [{ href: TT_CREATOR_SEARCH_INSIGHTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-og-5',
    'Our TikTok SEO guide covers search-focused publishing in more detail.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO' }],
  ),
  heading('h-og-4', '4. Build Related Videos', 3),
  paragraph(
    'p-og-6',
    'One useful post should lead naturally to another.',
  ),
  heading('h-og-5', '5. Review Analytics', 3),
  paragraph(
    'p-og-7',
    'Find content that generates views, profile interest, comments and followers.',
  ),
  heading('h-og-6', '6. Respond to Audience Questions', 3),
  paragraph(
    'p-og-8',
    'Comments can reveal future topics.',
  ),
  heading('h-og-7', '7. Repeat What Attracts the Right Audience', 3),
  paragraph(
    'p-og-9',
    "Don't change niche after every post.",
  ),
  paragraph('p-og-10', 'Build patterns.'),

  heading(
    'h-support',
    'Can You Get TikTok LIVE Through Support?',
    2,
  ),
  paragraph(
    'p-su-1',
    'TikTok support should be used for legitimate troubleshooting.',
  ),
  paragraph(
    'p-su-2',
    'TikTok says users who meet LIVE eligibility requirements but still cannot go LIVE can report the problem. (TikTok Support)',
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-su-3',
    "That is different from asking support to bypass requirements you don't meet.",
  ),
  paragraph(
    'p-su-4',
    'Do not tell readers to submit fake messages such as “I previously had LIVE and it disappeared” when that is not true.',
  ),
  paragraph(
    'p-su-5',
    'Use support to fix actual issues.',
  ),
  paragraph(
    'p-su-6',
    'Not to misrepresent account history.',
  ),

  heading('h-vpn', 'Can a VPN Unlock TikTok LIVE?', 2),
  paragraph('p-vpn-1', 'Do not recommend it.'),
  paragraph(
    'p-vpn-2',
    'TikTok explicitly uses local eligibility concepts for LIVE. (TikTok Support)',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-vpn-3',
    'Trying to disguise your location does not create a legitimate guarantee that the account will qualify.',
  ),
  paragraph(
    'p-vpn-4',
    'It can also complicate account security, location signals and feature availability.',
  ),
  paragraph(
    'p-vpn-5',
    'The correct approach is to use the requirements TikTok applies to the real account.',
  ),

  heading(
    'h-birthday',
    'Can You Change Your Birthday to Unlock LIVE?',
    2,
  ),
  paragraph(
    'p-bd-1',
    'Do not falsify age information.',
  ),
  paragraph(
    'p-bd-2',
    'TikTok requires creators to be at least 18 to host LIVE and may ask them to confirm their age. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-bd-3',
    "If the birthday on your account is genuinely incorrect, use TikTok's legitimate age and support process.",
  ),
  paragraph(
    'p-bd-4',
    'Do not advise users to pretend to be older.',
  ),

  heading(
    'h-why-age',
    'Why Does TikTok Ask for Age Verification?',
    2,
  ),
  paragraph(
    'p-wa-1',
    'TikTok says it may ask LIVE creators to confirm their age to ensure they meet the minimum age requirement. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-wa-2',
    'That is an eligibility and safety check.',
  ),
  paragraph(
    'p-wa-3',
    'A follower count cannot substitute for it.',
  ),
  paragraph(
    'p-wa-4',
    'Someone with 100 followers and someone with 1 million followers both still need to satisfy age rules when those rules apply.',
  ),

  heading(
    'h-remove',
    'Can TikTok Remove LIVE Access Later?',
    2,
  ),
  paragraph(
    'p-rl-1',
    'LIVE access should not be treated as permanently guaranteed simply because an account once qualified.',
  ),
  paragraph(
    'p-rl-2',
    'TikTok maintains content and account enforcement systems, and its LIVE troubleshooting documentation is built around continuing eligibility. (TikTok Support)',
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rl-3',
    'If an account violates TikTok rules or otherwise becomes ineligible for a feature, follower count alone should not be assumed to protect LIVE access.',
  ),
  paragraph(
    'p-rl-4',
    'Therefore “once you unlock LIVE, TikTok can never take it away” should not appear as a promise.',
  ),

  heading(
    'h-drop-live',
    'Does Going Below the Follower Threshold Remove LIVE?',
    2,
  ),
  paragraph(
    'p-dl-1',
    "TikTok's public documentation does not give us enough detail to promise exactly what will happen to every account if its follower count later drops below its local LIVE threshold.",
  ),
  paragraph(
    'p-dl-2',
    'So avoid writing that LIVE disappears instantly if you drop below 1,000, or that once unlocked you keep LIVE forever.',
  ),
  paragraph('p-dl-3', 'Both are too absolute.'),
  paragraph(
    'p-dl-4',
    'If availability changes on an actual account, check the LIVE button, TikTok eligibility and support.',
  ),

  heading(
    'h-drop-before',
    'What If Your TikTok Followers Drop Before You Unlock LIVE?',
    2,
  ),
  paragraph(
    'p-db-1',
    'Follower counts can move in both directions.',
  ),
  paragraph('p-db-2', 'People can unfollow.'),
  paragraph('p-db-3', 'Accounts can disappear.'),
  paragraph(
    'p-db-4',
    'TikTok can take action against invalid accounts.',
  ),
  paragraph(
    'p-db-5',
    'If your account is approaching a required local follower threshold and later falls below it, keep working on audience growth rather than assuming the count is permanent.',
  ),
  paragraph(
    'p-db-6',
    'A later Learn guide on why TikTok followers drop will cover those causes in more depth.',
  ),

  heading(
    'h-first-live',
    'What Should Your First TikTok LIVE Be About?',
    2,
  ),
  paragraph(
    'p-fl-1',
    'Once LIVE is genuinely available, do not start with “I am LIVE… what should we talk about?”',
  ),
  paragraph(
    'p-fl-2',
    'Give the session a purpose.',
  ),
  paragraph('p-fl-3', 'Examples:'),
  heading('h-fl-edu', 'Educational Creator', 3),
  paragraph('p-fl-4', 'TikTok SEO Q&A'),
  heading('h-fl-fit', 'Fitness Creator', 3),
  paragraph('p-fl-5', 'Beginner Workout Form Questions'),
  heading('h-fl-local', 'Local Business', 3),
  paragraph('p-fl-6', 'Ask Us Anything About Roof Repairs'),
  heading('h-fl-ecom', 'Ecommerce Brand', 3),
  paragraph('p-fl-7', 'Live Product Demonstration'),
  heading('h-fl-photo', 'Photographer', 3),
  paragraph('p-fl-8', 'Editing a Photo From Start to Finish'),
  paragraph(
    'p-fl-9',
    'The audience should understand why the LIVE exists.',
  ),
  paragraph(
    'p-fl-10',
    "TikTok's LIVE tools support direct interaction, comments, moderation and multi-guest formats, so the format works particularly well for real-time conversation. (TikTok Support)",
    [{ href: TT_MULTI_GUEST, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-mod',
    'Prepare Moderation Before Your First LIVE',
    2,
  ),
  paragraph('p-md-1', 'LIVE is real-time.'),
  paragraph(
    'p-md-2',
    'That means you cannot edit comments before they appear in the same way you edit a prerecorded video.',
  ),
  paragraph(
    'p-md-3',
    'TikTok provides LIVE moderation tools and allows creators and moderators to manage things such as comments and filtering. (TikTok Support)',
    [{ href: TT_MODERATING, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-md-4', 'Before a larger LIVE:'),
  bullets('ul-mod', [
    'review moderation controls,',
    'consider assigning a moderator,',
    'review blocked keywords where relevant,',
    'and know how to handle inappropriate comments.',
  ]),
  paragraph(
    'p-md-5',
    'A follower milestone gets you closer to eligibility.',
  ),
  paragraph(
    'p-md-6',
    'It does not prepare the LIVE for you.',
  ),

  heading(
    'h-everywhere',
    'Is TikTok LIVE Available Everywhere?',
    2,
  ),
  paragraph(
    'p-ev-1',
    'Do not assume every TikTok feature has identical availability worldwide.',
  ),
  paragraph(
    'p-ev-2',
    "TikTok's LIVE and Gift ecosystem has regional and feature-specific availability requirements. (TikTok Support)",
    [{ href: TT_LIVE_GIFTS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-ev-3',
    'That means a creator should check the actual TikTok app and account rather than relying on an article written for another country.',
  ),
  paragraph(
    'p-ev-4',
    'This is also why our copy should avoid saying TikTok LIVE requires exactly one follower number in every country.',
  ),

  heading(
    'h-know',
    'How Do You Know When TikTok LIVE Is Available?',
    2,
  ),
  paragraph(
    'p-kn-1',
    'The most practical indicator is your account itself.',
  ),
  paragraph(
    'p-kn-2',
    'If the account meets the applicable requirements and TikTok has enabled LIVE, the LIVE creation option should become available through the normal creation flow.',
  ),
  paragraph(
    'p-kn-3',
    "If you believe all requirements are met but the option is missing, TikTok's official troubleshooting guidance says to report the issue. (TikTok Support)",
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-kn-4',
    'This is more reliable than refreshing the app 50 times, changing your username, switching languages or using an alleged hidden setting.',
  ),

  heading(
    'h-strategy',
    'Should You Build Your Entire TikTok Strategy Around Unlocking LIVE?',
    2,
  ),
  paragraph('p-sy-1', 'Probably not.'),
  paragraph('p-sy-2', 'LIVE can be useful.'),
  paragraph('p-sy-3', 'But TikTok still offers:'),
  bullets('ul-sy', [
    'short-form posts,',
    'Search,',
    'For You discovery,',
    'profiles,',
    'Duet,',
    'Stitch,',
    'comments,',
    'and other content formats.',
  ]),
  paragraph(
    'p-sy-4',
    'Your follower strategy should make sense even before LIVE becomes available.',
  ),
  paragraph(
    'p-sy-5',
    'The best position to reach LIVE from is an account people already want to follow.',
  ),
  paragraph(
    'p-sy-6',
    'Not an empty account whose only goal is reaching a threshold.',
  ),

  heading(
    'h-simple',
    'TikTok LIVE Requirements in Simple Terms',
    2,
  ),
  paragraph(
    'p-sm-1',
    'Think of LIVE eligibility as several gates.',
  ),
  heading('h-sm-1', 'Gate 1: Age', 3),
  paragraph(
    'p-sm-2',
    'Are you 18 or older? (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  heading('h-sm-2', 'Gate 2: Followers', 3),
  paragraph(
    'p-sm-3',
    'Have you met the local minimum-follower threshold TikTok applies to your account? (TikTok Support)',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  heading('h-sm-3', 'Gate 3: Availability', 3),
  paragraph(
    'p-sm-4',
    'Is LIVE available for the account and location?',
  ),
  heading('h-sm-4', 'Gate 4: Eligibility', 3),
  paragraph(
    'p-sm-5',
    'Does TikTok consider the creator eligible for LIVE? (TikTok Support)',
    [{ href: TT_LIVE_ISSUES, label: 'TikTok Support', external: true }],
  ),
  heading('h-sm-5', 'Gate 5: Account Settings', 3),
  paragraph(
    'p-sm-6',
    'Is something such as Restricted Mode preventing LIVE access? TikTok explicitly says Restricted Mode disables going LIVE. (TikTok Support)',
    [{ href: TT_USER_SAFETY, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-sm-7',
    'Pass those checks before diagnosing a technical problem.',
  ),

  heading(
    'h-answer',
    'So, How Many Followers Do You Need to Go LIVE on TikTok?',
    2,
  ),
  paragraph(
    'p-an-1',
    'The answer most creators hear is 1,000 followers.',
  ),
  paragraph(
    'p-an-2',
    'That remains a useful practical benchmark.',
  ),
  paragraph(
    'p-an-3',
    'But the more accurate 2026 answer is that TikTok currently uses a local minimum-follower threshold rather than publishing one universal worldwide follower number for every account. (TikTok Support)',
    [{ href: TT_WHAT_IS_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-an-4',
    'You must also be 18 or older and meet TikTok\'s other LIVE eligibility requirements. (TikTok Support)',
    [{ href: TT_LIVE_AGE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-an-5',
    'So do not treat 999 as universally impossible and 1,000 as guaranteed LIVE.',
  ),
  paragraph(
    'p-an-6',
    'Check the actual account.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'TikTok currently requires creators to be at least 18 years old to host a LIVE.',
    'TikTok uses a local minimum-follower threshold for LIVE rather than presenting one guaranteed global number.',
    '1,000 followers remains a commonly used practical benchmark, but it should not be described as an automatic worldwide unlock.',
    "Only creators who meet TikTok's LIVE eligibility requirements can go LIVE.",
    'TikTok may ask creators to confirm their age before granting LIVE access.',
    'Restricted Mode prevents users from going LIVE.',
    'LIVE Gifts and other monetization features have additional requirements separate from normal LIVE access.',
    'Creator Rewards requirements should not be confused with TikTok LIVE requirements.',
    'A third-party follower service should never be represented as guaranteed TikTok LIVE access.',
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

export const HOW_MANY_FOLLOWERS_TO_GO_LIVE_ON_TIKTOK_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-many-followers-to-go-live-on-tiktok',
  slug: SLUG,
  title: 'How Many Followers Do You Need to Go LIVE on TikTok?',
  excerpt:
    "If you're searching for the TikTok LIVE follower requirement, you have probably seen one number repeated everywhere: 1,000 followers.",
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'creator', 'algorithm', 'analytics', 'engagement'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'How Many Followers Do You Need to Go LIVE on TikTok?',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How Many Followers Do You Need to Go LIVE on TikTok?',
    description:
      'Learn TikTok LIVE follower and age requirements, why the threshold can vary by location, and what to check if the LIVE option is missing.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how many followers to go live on TikTok',
      'TikTok LIVE requirements',
      'TikTok LIVE follower requirement',
      'TikTok live 1000 followers',
      "why can't I go live on TikTok",
      'TikTok LIVE age requirement',
    ],
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'how-to-get-1000-tiktok-followers',
    'tiktok-followers-vs-likes-vs-views',
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
    'You must currently be 18 or older to host a TikTok LIVE',
    'TikTok uses a local minimum-follower threshold rather than publishing one guaranteed global number',
    "LIVE features are subject to TikTok's current feature and regional availability",
    'Only creators who meet LIVE eligibility requirements can start a LIVE',
    '1,000 followers is a useful commonly referenced benchmark, not an automatic worldwide unlock',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How many followers do you need to go LIVE on TikTok in 2026?',
      answer:
        'TikTok currently says creators need to meet a local minimum-follower threshold. Around 1,000 followers remains a commonly referenced planning benchmark, but TikTok does not present it as one guaranteed global threshold for every account.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can you go LIVE on TikTok with 500 followers?',
      answer:
        "Some accounts may have different local eligibility conditions, but TikTok does not guarantee LIVE access at 500 followers. Check the LIVE option on the actual account rather than relying on another creator's threshold.",
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Do you have to be 18 to go LIVE on TikTok?',
      answer:
        "Yes. TikTok's current Help Center says creators must be at least 18 years old to host a LIVE.",
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: "Why can't I go LIVE even though I have 1,000 followers?",
      answer:
        'Follower count is only one eligibility factor. Check your age, actual local threshold, account eligibility and whether Restricted Mode is enabled. TikTok says eligible creators experiencing LIVE issues can report the problem.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does Restricted Mode disable TikTok LIVE?',
      answer:
        'Yes. TikTok says going LIVE is one of the features unavailable while Restricted Mode is active.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can buying followers guarantee TikTok LIVE access?',
      answer:
        'No. TikTok controls LIVE eligibility, and follower count is only one part of the requirements. A follower service should not be represented as a guaranteed LIVE-unlock method.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Are TikTok LIVE and LIVE Gifts the same eligibility?',
      answer:
        'No. LIVE Gifts is a separate feature with its own eligibility, age and availability requirements.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Is TikTok Creator Rewards the same as TikTok LIVE?',
      answer:
        'No. Creator Rewards is a separate monetization program with different follower and view requirements.',
      schemaEligible: true,
    },
  ],
};
