/**
 * Article #23 — How to Check an Instagram Follower Count Without Logging In
 * Scheduled: Wednesday 14 October 2026.
 * Utility / tool intent. Distinct from Instagram follower packages.
 * Primary CTA: /tools/instagram-follower-counter
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'check-instagram-follower-count-without-login';
const SCHEDULED_AT = '2026-10-14T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;
const TOOL_HREF = '/tools/instagram-follower-counter';
const PROFILE_VIEWER_HREF = '/tools/instagram-profile-viewer';

const IG_PUBLIC_PROFILE_INFO =
  'https://www.facebook.com/help/instagram/347751748650214';
const IG_MANAGE_PRIVACY =
  'https://www.facebook.com/help/instagram/667810236572057';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_WHO_CAN_SEE_POSTS =
  'https://www.facebook.com/help/instagram/183881842314338';
const IG_SEARCH_ACCOUNTS =
  'https://www.facebook.com/help/instagram/415595770433263';
const IG_SEARCH =
  'https://www.facebook.com/help/instagram/1482378711987121';
const IG_EMBED =
  'https://www.facebook.com/help/instagram/620154495870484';

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
    'Sometimes you only need one piece of information from an Instagram profile: how many followers does this account have?',
  ),
  paragraph(
    'p-open-2',
    "Maybe you're checking a creator, a business, a competitor, a public figure, a brand or your own profile from another device.",
  ),
  paragraph(
    'p-open-3',
    'Creating an account or handing a third-party website your Instagram password should not be necessary simply to check a publicly displayed follower total.',
  ),
  paragraph(
    'p-open-4',
    'Meta currently lists the number of followers and following among Instagram profile information that is always public. This applies to both public and private accounts, and Meta says this information can be visible to people on or off Instagram, including people without an Instagram account. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-5',
    "That makes follower-count checking different from accessing someone's posts or full follower list.",
  ),
  paragraph(
    'p-open-6',
    'You may be able to see a follower count such as 104M without being able to browse all of the accounts behind that number.',
  ),
  paragraph(
    'p-open-7',
    'Those are different types of information.',
  ),
  paragraph(
    'p-open-8',
    'The Instagram Follower Counter focuses on the first task: enter an Instagram username, check the publicly published follower count and display the count currently available for that profile.',
    [{ href: TOOL_HREF, label: 'Instagram Follower Counter' }],
  ),
  paragraph(
    'p-open-9',
    'No Instagram password is required.',
  ),
  paragraph(
    'p-open-10',
    'The simplest distinction: follower count is a public number. The follower list is the identities behind that number. They are not the same thing.',
  ),

  heading('h-what', 'What Is an Instagram Follower Count?', 2),
  paragraph(
    'p-wh-1',
    'An Instagram follower count is the number displayed on a profile showing how many accounts currently follow that profile.',
  ),
  paragraph(
    'p-wh-2',
    'Meta includes the number of followers and following in the profile information anyone can see. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wh-3',
    "For example, a profile might display 872K followers or 104M followers. That number provides a quick indication of the account's current displayed audience size.",
  ),
  paragraph('p-wh-4', 'It does not tell you:'),
  bullets('ul-wh-not', [
    'who every follower is,',
    'how active those followers are,',
    'how many see each post,',
    'how many are online,',
    'how engaged they are,',
    'or how much reach the account receives.',
  ]),
  paragraph(
    'p-wh-5',
    'Follower count is one metric. It should not be treated as a complete performance report.',
  ),
  paragraph(
    'p-wh-6',
    'If you also want the public name, bio and related published counts together, the Instagram Profile Viewer gathers that public identity snapshot instead of only the follower label.',
    [{ href: PROFILE_VIEWER_HREF, label: 'Instagram Profile Viewer' }],
  ),
  figure(
    'fig-count-list',
    `${IMAGE_DIR}/count-vs-list.png`,
    'A public Instagram follower count is a profile number, while the follower list is the individual accounts behind that number and can have different access rules',
    'Seeing the follower total is not the same as accessing the full follower list.',
  ),

  heading(
    'h-without',
    'Can You Check an Instagram Follower Count Without Logging In?',
    2,
  ),
  paragraph(
    'p-nl-1',
    'Yes, because Instagram categorizes the number of followers and following as public profile information.',
  ),
  paragraph(
    'p-nl-2',
    "Meta says this information is public to everyone on or off Instagram, including people who don't have an Instagram account. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nl-3',
    'That does not mean Instagram guarantees that every visitor will always receive exactly the same web interface.',
  ),
  paragraph(
    'p-nl-4',
    'Instagram can change login prompts, web presentation, technical page delivery and public-profile behaviour.',
  ),
  paragraph(
    'p-nl-5',
    'But the underlying privacy classification of the follower count is clear: the number itself is public profile information. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nl-6',
    'A follower-counter tool can make this information easier to check without requiring you to sign into Instagram.',
  ),
  paragraph(
    'p-nl-7',
    'The NovaLikes lookup still depends on Instagram exposing usable public profile data for that request. If Instagram does not expose the count, the tool should return an error rather than invent a number.',
  ),

  heading(
    'h-how',
    'How to Check an Instagram Follower Count With NovaLikes',
    2,
  ),
  paragraph(
    'p-how-1',
    'Use the free Instagram Follower Counter.',
  ),
  heading('h-how-1', 'Step 1: Open the Tool', 3),
  paragraph(
    'p-how-2',
    'Open the Instagram Follower Counter on NovaLikes.',
  ),
  heading('h-how-2', 'Step 2: Enter the Instagram Username', 3),
  paragraph(
    'p-how-3',
    'Enter the username of the account you want to check.',
  ),
  paragraph(
    'p-how-4',
    'For example: nasa, not necessarily NASA as a display name.',
  ),
  paragraph(
    'p-how-5',
    'The username is the more precise account identifier.',
  ),
  paragraph(
    'p-how-6',
    'The current NovaLikes field also accepts a profile URL, with or without an @ on the username.',
  ),
  heading('h-how-3', 'Step 3: Start the Check', 3),
  paragraph(
    'p-how-7',
    'Submit the username.',
  ),
  paragraph(
    'p-how-8',
    'The tool attempts to retrieve the public profile information available for that account.',
  ),
  heading('h-how-4', 'Step 4: View the Published Follower Count', 3),
  paragraph(
    'p-how-9',
    'If the count is available, NovaLikes displays the follower number published for that profile.',
  ),
  paragraph(
    'p-how-10',
    'If Instagram presents the number in an abbreviated form such as 104M, the tool should preserve that published representation rather than pretending it knows an exact hidden integer.',
  ),
  paragraph(
    'p-how-11',
    'No Instagram password is required.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/counter-workflow.png`,
    'How the Instagram Follower Counter works: enter a username, check public profile information, then view the published follower count',
    'No Instagram password required. Displayed values may remain abbreviated when that is how the public count is published.',
  ),

  heading(
    'h-abbrev',
    'Why Does Instagram Show 104M Instead of an Exact Number?',
    2,
  ),
  paragraph(
    'p-ab-1',
    'Large social-media counts are often displayed in abbreviated form for readability.',
  ),
  paragraph(
    'p-ab-2',
    'For example: 1.2K, 872K, 2.5M or 104M.',
  ),
  paragraph(
    'p-ab-3',
    'If the publicly available profile information presents the follower count in an abbreviated form, a responsible follower counter should not invent additional precision.',
  ),
  paragraph(
    'p-ab-4',
    'If Instagram gives the available value as 104M, the tool should not transform that into 104,237,619 unless it actually has a reliable source for that exact value.',
  ),
  paragraph(
    'p-ab-5',
    'That would be false precision.',
  ),
  paragraph(
    'p-ab-6',
    'The safest result is to show what the public source actually provides.',
  ),

  heading(
    'h-exactly',
    'Does 104M Mean Exactly 104,000,000 Followers?',
    2,
  ),
  paragraph('p-ex-1', 'Not necessarily.'),
  paragraph(
    'p-ex-2',
    'An abbreviated display should be understood as a rounded or shortened public representation rather than proof of a specific exact underlying integer.',
  ),
  paragraph(
    'p-ex-3',
    'So if a profile shows 104M, do not write that the account has exactly 104,000,000 followers.',
  ),
  paragraph(
    'p-ex-4',
    'Instead: the publicly displayed follower count is 104M.',
  ),
  paragraph(
    'p-ex-5',
    'That language accurately describes what you observed.',
  ),

  heading(
    'h-exact',
    'Can You Check the Exact Instagram Follower Count?',
    2,
  ),
  paragraph(
    'p-et-1',
    'Only if the source you are using actually exposes an exact number.',
  ),
  paragraph(
    'p-et-2',
    'Do not build a follower-counter page around the promise of a secret exact follower count Instagram hides if the available public source only provides an abbreviated value.',
  ),
  paragraph(
    'p-et-3',
    'NovaLikes should prioritize accuracy over fake precision.',
  ),
  paragraph(
    'p-et-4',
    'If the published result is 872K, show 872K.',
  ),
  paragraph(
    'p-et-5',
    'If a more precise public value is legitimately available, the tool can use it. But never manufacture digits.',
  ),

  heading(
    'h-insights',
    'Public Follower Count vs Instagram Insights',
    2,
  ),
  paragraph(
    'p-in-1',
    'These are very different things.',
  ),
  paragraph(
    'p-in-2',
    'A public follower counter can tell you the current publicly displayed follower total.',
  ),
  paragraph(
    'p-in-3',
    'Instagram Insights can give the owner of an eligible professional account much deeper information.',
  ),
  paragraph(
    'p-in-4',
    'Meta says Instagram Insights can include follower Growth, meaning followers gained and lost, as well as locations, age ranges and active times when the relevant requirements are met. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  {
    id: 'table-count-insights',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Source', 'What it can show'],
    rows: [
      ['Public follower count', 'Current displayed audience number'],
      ['Follower list', 'Identities behind the number; access can differ on private profiles'],
      ['Instagram Insights', 'Owner-only growth, audience and performance information'],
    ],
  },
  paragraph(
    'p-in-5',
    "A third-party public follower counter should never pretend it can reveal somebody else's private Insights.",
  ),
  figure(
    'fig-insights',
    `${IMAGE_DIR}/public-vs-insights.png`,
    'A public follower count is visible profile information, while Instagram Insights such as followers gained or lost stay with the account owner',
    "A public follower counter is not access to another account's Instagram Insights.",
  ),

  heading(
    'h-private-count',
    "Can You Check a Private Instagram Account's Follower Count?",
    2,
  ),
  paragraph(
    'p-pc-1',
    'Meta specifically says the number of followers and following remains public regardless of whether a personal account is private or public. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pc-2',
    "But do not confuse that with accessing the private account's posts, Reels, Stories or full follower list.",
  ),
  paragraph(
    'p-pc-3',
    'Instagram says only approved followers can see posts from a private account. (Facebook)',
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pc-4',
    "Meta's privacy guidance also says people may need to send a follow request to see a private account's posts, followers or following list. (Facebook)",
    [{ href: IG_MANAGE_PRIVACY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pc-5',
    'So the private-profile follower count is public numerical information, while private-profile content stays restricted and the private-profile follower list can be access-controlled.',
  ),
  paragraph(
    'p-pc-6',
    'Our guide on public vs private Instagram accounts covers that access difference in more detail.',
    [
      {
        href: '/learn/public-vs-private-instagram-account',
        label: 'public vs private Instagram accounts',
      },
    ],
  ),
  paragraph(
    'p-pc-7',
    'The NovaLikes lookup still depends on Instagram exposing usable public profile data. Private, hidden or login-gated profiles can return an error instead of a count.',
  ),

  heading(
    'h-private-list',
    'Can a Follower Counter Show Who Follows a Private Account?',
    2,
  ),
  paragraph('p-pl-1', 'No. That is not what the tool is for.'),
  paragraph(
    'p-pl-2',
    'Knowing that an account has 25,000 followers does not give you permission or technical access to a restricted follower list.',
  ),
  paragraph(
    'p-pl-3',
    'Meta separates the publicly visible number of followers from the access rules that can apply to followers and following lists on private accounts. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pl-4',
    'NovaLikes should never market the Follower Counter as a way to see private followers, unlock a hidden follower list, view every private follower or bypass Instagram privacy.',
  ),
  paragraph(
    'p-pl-5',
    'It checks a count. Nothing more.',
  ),

  heading(
    'h-hide',
    'Does Making Instagram Private Hide Your Follower Count?',
    2,
  ),
  paragraph('p-hi-1', 'No.'),
  paragraph(
    'p-hi-2',
    'Meta states that the number of followers and following remains public profile information even when a personal account is private. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hi-3',
    'Making an Instagram account private primarily affects access to content and follower approval.',
  ),
  paragraph(
    'p-hi-4',
    'It does not provide a setting to hide the numerical follower and following count from everyone.',
  ),
  paragraph(
    'p-hi-5',
    "Meta says that profile information can't be hidden and remains public regardless of whether the personal account is private or public. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),

  heading(
    'h-can-hide',
    'Can Someone Hide Their Instagram Follower Count?',
    2,
  ),
  paragraph(
    'p-ch-1',
    'According to Meta\'s current profile-information guidance, the number of followers and following is among the information that cannot be hidden and remains public. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ch-2',
    "That is different from Instagram's controls around post Like counts, view counts, content visibility and account privacy.",
  ),
  paragraph(
    'p-ch-3',
    'Do not assume that because Instagram lets users hide or control one metric, every profile metric can also be hidden.',
  ),
  paragraph(
    'p-ch-4',
    'Follower count is currently part of the public profile layer.',
  ),

  heading(
    'h-search',
    'Does a Private Instagram Account Still Appear in Search?',
    2,
  ),
  paragraph(
    'p-se-1',
    'Instagram maintains Search for finding accounts, and some searches may require entering an exact username. (Facebook)',
    [{ href: IG_SEARCH_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-se-2',
    'Private account status changes access to posts, not the basic fact that the account can exist and be discoverable.',
  ),
  paragraph(
    'p-se-3',
    'This is why knowing the correct username matters when using a follower counter.',
  ),

  heading('h-username', 'Username vs Display Name', 2),
  paragraph(
    'p-un-1',
    'Instagram accounts have a username and can also have a display name.',
  ),
  paragraph(
    'p-un-2',
    'Those should not be treated as interchangeable.',
  ),
  paragraph(
    'p-un-3',
    'For example, a display name might be NASA while the username is nasa.',
  ),
  paragraph(
    "p-un-4",
    "A follower counter should use the account's actual username because display names may contain spaces, change or be shared by multiple accounts.",
  ),
  paragraph(
    'p-un-5',
    'If you check the wrong username, you may receive the wrong profile or no result.',
  ),

  heading('h-find', 'How Do You Find an Instagram Username?', 2),
  paragraph(
    'p-fn-1',
    "Open the account's profile and identify the username associated with it.",
  ),
  paragraph(
    'p-fn-2',
    "You can also use Instagram Search to look for accounts; Instagram's current Help Center says users can search for people and topics through Search and Explore. (Facebook)",
    [{ href: IG_SEARCH, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fn-3',
    'Once you have the correct username, use that in the follower counter.',
  ),
  paragraph(
    'p-fn-4',
    "Avoid guessing based only on a business name, a person's name or a logo. Similar profiles can exist.",
  ),

  heading(
    'h-url',
    'Can You Check Followers Using an Instagram Profile URL?',
    2,
  ),
  paragraph(
    'p-ur-1',
    'The current NovaLikes follower counter accepts a username or an Instagram profile URL.',
  ),
  paragraph(
    'p-ur-2',
    'That includes usernames with or without @, and Instagram profile addresses.',
  ),
  paragraph(
    'p-ur-3',
    'It is still a profile lookup, not a post, Reel or Stories checker.',
  ),
  paragraph(
    'p-ur-4',
    'Do not paste a post URL or Reel URL expecting the tool to open that post.',
  ),

  heading('h-password', 'Do You Need an Instagram Password?', 2),
  paragraph('p-pw-1', 'No.'),
  paragraph(
    'p-pw-2',
    'Checking publicly available follower-count information should not require you to give NovaLikes your Instagram password.',
  ),
  paragraph(
    'p-pw-3',
    'The user enters a profile username. The tool checks public profile information. That is it.',
  ),
  paragraph(
    'p-pw-4',
    'This is particularly important because follower-counter searches often attract websites that ask for unnecessary Instagram login details, verification codes, browser cookies or account authorization.',
  ),
  paragraph(
    'p-pw-5',
    'A public follower-count tool does not need to become an account-login tool.',
  ),

  heading(
    'h-fake-login',
    'Should You Log Into Instagram Through a Follower Counter Website?',
    2,
  ),
  paragraph(
    'p-fl-1',
    'For NovaLikes: no.',
  ),
  paragraph(
    'p-fl-2',
    'The follower counter should not present a fake Instagram login form.',
  ),
  paragraph(
    'p-fl-3',
    "It should not ask for username plus password to check another profile's public follower total.",
  ),
  paragraph(
    'p-fl-4',
    'Meta itself classifies follower numbers as public profile information. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fl-5',
    'So the user-facing workflow should remain Instagram username to follower count, not Instagram credentials into a mystery third-party login.',
  ),

  heading('h-need-account', 'Do You Need an Instagram Account?', 2),
  paragraph(
    'p-na-1',
    'Not for the NovaLikes follower-counter workflow.',
  ),
  paragraph(
    'p-na-2',
    "Meta's current Help Center says the number of followers and following is public to everyone on or off Instagram, including people who don't have an Instagram account. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-na-3',
    'Again, that does not guarantee Instagram itself will present every unauthenticated visitor with exactly the same interface forever.',
  ),
  paragraph(
    'p-na-4',
    'But the public information classification supports a no-login follower-count use case.',
  ),

  heading('h-browser', 'Can You Check Instagram Followers From a Browser?', 2),
  paragraph(
    'p-br-1',
    'NovaLikes is a web-based tool.',
  ),
  paragraph(
    'p-br-2',
    'So the normal workflow can be completed through a supported browser: open NovaLikes, enter the username and check the count.',
  ),
  paragraph(
    'p-br-3',
    'No browser extension or separate desktop application is required for the existing tool.',
  ),
  paragraph(
    'p-br-4',
    'Do not expect a Chrome extension, Windows program, iOS app or Android app unless NovaLikes actually releases one.',
  ),

  heading('h-mobile', 'Does It Work on Mobile?', 2),
  paragraph(
    'p-mb-1',
    'The tool should work through the normal responsive NovaLikes web interface.',
  ),
  paragraph(
    'p-mb-2',
    'On a phone, open the Follower Counter, enter or paste the username, run the check and view the count.',
  ),
  paragraph(
    'p-mb-3',
    'No separate app install should be required.',
  ),

  heading('h-free', 'Is the Instagram Follower Counter Free?', 2),
  paragraph(
    'p-fr-1',
    "NovaLikes' Instagram Follower Counter is part of the site's free tools.",
  ),
  paragraph(
    'p-fr-2',
    'There is no credit pack, free trial, premium follower check or API subscription required for the normal web workflow.',
  ),
  paragraph(
    'p-fr-3',
    'The user comes to this page for a simple utility. Keep it simple.',
  ),

  heading('h-realtime', 'Is the Follower Counter Real-Time?', 2),
  paragraph(
    'p-rt-1',
    'Be careful with the term real-time.',
  ),
  paragraph(
    'p-rt-2',
    'The safest wording is: the tool checks the follower count currently available from the public profile source at the time of the request.',
  ),
  paragraph(
    'p-rt-3',
    'Do not expect live millisecond updates or instant second-by-second follower tracking unless NovaLikes actually runs continuous tracking infrastructure.',
  ),
  paragraph(
    'p-rt-4',
    'A one-time lookup and a live monitoring system are different products.',
  ),

  heading(
    'h-history',
    'Does the Tool Track Follower Changes Over Time?',
    2,
  ),
  paragraph(
    'p-hs-1',
    'The current NovaLikes follower counter should not be described as a historical analytics platform.',
  ),
  paragraph(
    'p-hs-2',
    'A standard lookup tells you what the published count is now.',
  ),
  paragraph(
    'p-hs-3',
    'It does not automatically tell you what it was yesterday, how many followed today, how many unfollowed or a 30-day graph.',
  ),
  paragraph(
    'p-hs-4',
    "For your own eligible professional Instagram account, Meta's Insights can provide follower Growth data including followers gained and lost. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hs-5',
    'That is different from a public follower-count check.',
  ),
  paragraph(
    'p-hs-6',
    'If the question is why a count later moved, our guide on why Instagram followers drop covers audience-side reasons separately.',
    [
      {
        href: '/learn/why-instagram-followers-drop',
        label: 'why Instagram followers drop',
      },
    ],
  ),

  heading(
    'h-manual',
    "How Can You Track an Account's Follower Growth Manually?",
    2,
  ),
  paragraph(
    'p-mn-1',
    'If you are checking a public profile for legitimate research, you can record periodic public counts yourself.',
  ),
  paragraph(
    'p-mn-2',
    'For example: Monday 24.8K, Friday 25.1K, later 25.3K.',
  ),
  paragraph(
    'p-mn-3',
    'But remember the limitation: if Instagram publishes abbreviated values, changes below the displayed rounding level may not appear.',
  ),
  paragraph(
    'p-mn-4',
    'So do not calculate ultra-precise daily growth percentages, exact followers gained or exact follower-loss counts from rounded public numbers.',
  ),
  paragraph(
    'p-mn-5',
    'Your data is only as precise as the source.',
  ),

  heading('h-unchanged', "Why Didn't the Follower Count Change?", 2),
  paragraph(
    'p-uc-1',
    'Several simple explanations are possible.',
  ),
  paragraph(
    'p-uc-2',
    'One is that the underlying change may be too small to alter an abbreviated public display.',
  ),
  paragraph(
    'p-uc-3',
    'For example, an account displayed as 1.2M could potentially change while still rounding to 1.2M.',
  ),
  paragraph(
    'p-uc-4',
    "Another possibility: the account simply didn't gain or lose enough followers to change the displayed value.",
  ),
  paragraph(
    'p-uc-5',
    'Do not assume the counter is frozen, Instagram is broken or the account secretly has no follower movement from a rounded number alone.',
  ),

  heading(
    'h-same',
    'Why Does NovaLikes Show the Same Abbreviated Number as Instagram?',
    2,
  ),
  paragraph(
    'p-sm-1',
    'Because preserving the published representation is more accurate than fabricating precision.',
  ),
  paragraph(
    'p-sm-2',
    'If Instagram exposes 104M, NovaLikes should not claim 104,283,472 without evidence.',
  ),
  paragraph(
    'p-sm-3',
    'An SEO tool page often looks more impressive when it shows a huge exact number. But accuracy is more important than decorative precision.',
  ),

  heading(
    'h-competitor',
    'Can You Use the Counter for Competitor Research?',
    2,
  ),
  paragraph(
    'p-co-1',
    'Yes, a publicly displayed follower count can be one simple research input.',
  ),
  paragraph(
    'p-co-2',
    'For example, you might compare how large several public brand audiences appear, how those counts change over longer periods or which competitors have larger public audiences.',
  ),
  paragraph(
    'p-co-3',
    'But follower count alone should not become a competitor performance score.',
  ),
  paragraph(
    'p-co-4',
    'It tells you nothing automatically about traffic, sales, reach, engagement, lead quality or profitability.',
  ),
  paragraph(
    'p-co-5',
    'Use it as one metric. Not a business valuation system.',
  ),

  heading(
    'h-engagement',
    'Can You Use Follower Count to Measure Engagement?',
    2,
  ),
  paragraph('p-eg-1', 'No.'),
  paragraph(
    'p-eg-2',
    'Follower count measures audience size. Engagement involves interactions with content.',
  ),
  paragraph(
    'p-eg-3',
    'A profile can have many followers and modest post interaction, or a smaller audience with stronger interaction.',
  ),
  paragraph(
    'p-eg-4',
    'Instagram Insights itself treats follower information and content-performance or engagement metrics as separate categories. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-eg-5',
    'So followers are not the same as engagement.',
  ),
  paragraph(
    'p-eg-6',
    'Our earlier guide on Instagram followers, likes, views and comments explains these metrics separately.',
    [
      {
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        label: 'Instagram followers, likes, views and comments',
      },
    ],
  ),

  heading(
    'h-reach',
    'Does More Instagram Followers Mean More Reach?',
    2,
  ),
  paragraph('p-rc-1', 'Not automatically.'),
  paragraph(
    'p-rc-2',
    'Follower count tells you how many accounts follow the profile. Reach and content viewing are separate measurements.',
  ),
  paragraph(
    'p-rc-3',
    'Instagram Insights treats audience growth and content performance separately. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rc-4',
    "Public-account content may also be discoverable beyond an existing follower audience depending on Instagram's recommendation systems, so content reach does not need to equal follower count.",
  ),
  paragraph(
    'p-rc-5',
    'Do not turn 100K followers into 100K people see every post. That is not what the follower count promises.',
  ),

  heading(
    'h-reels',
    'Does More Followers Mean More Reel Views?',
    2,
  ),
  paragraph(
    'p-rl-1',
    'No guaranteed relationship should be claimed.',
  ),
  paragraph(
    'p-rl-2',
    'A follower is an account-level connection. A Reel view is a content-level viewing metric.',
  ),
  paragraph(
    'p-rl-3',
    'Our guide on how Instagram Reel views are counted explains why Reel views and unique audience metrics need to be interpreted separately.',
    [
      {
        href: '/learn/how-instagram-reels-views-are-counted',
        label: 'how Instagram Reel views are counted',
      },
    ],
  ),
  paragraph(
    'p-rl-4',
    'The follower counter does not predict future Reel views, Explore placement or viral reach.',
  ),

  heading(
    'h-real',
    'Can You Check Whether Followers Are Real?',
    2,
  ),
  paragraph(
    'p-re-1',
    'Not from the follower count alone.',
  ),
  paragraph(
    'p-re-2',
    'A public counter showing 50K does not tell you the identity, behaviour or authenticity of every follower behind the number.',
  ),
  paragraph(
    'p-re-3',
    'Do not treat the NovaLikes counter as a real-follower checker, fake-follower detector or bot-percentage calculator.',
  ),
  paragraph(
    'p-re-4',
    'The current tool checks the public follower number. That is all it needs to do.',
  ),

  heading(
    'h-list-without',
    'Can You Check Someone\'s Follower List Without Following Them?',
    2,
  ),
  paragraph(
    'p-lw-1',
    "That depends on the account's privacy settings.",
  ),
  paragraph(
    'p-lw-2',
    'Meta says for private accounts, people may need to send a follow request to see posts, followers or following lists. (Facebook)',
    [{ href: IG_MANAGE_PRIVACY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lw-3',
    'That is different from the numerical follower count, which Meta says remains public. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lw-4',
    'The Follower Counter should never claim to bypass that distinction.',
  ),

  heading('h-following', 'Follower Count vs Following Count', 2),
  paragraph(
    'p-fg-1',
    'Every Instagram profile can show two separate audience-related counts.',
  ),
  heading('h-fg-followers', 'Followers', 3),
  paragraph(
    'p-fg-2',
    'Accounts that follow this profile.',
  ),
  heading('h-fg-following', 'Following', 3),
  paragraph(
    'p-fg-3',
    'Accounts this profile follows.',
  ),
  paragraph(
    'p-fg-4',
    'Meta lists the number of followers and following as public profile information. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fg-5',
    "The NovaLikes tool's primary job is the follower count.",
  ),
  paragraph(
    'p-fg-6',
    'Do not turn the page into a full social-network relationship-analysis product unless those additional functions actually exist.',
  ),

  heading(
    'h-notify',
    'Does Instagram Notify Someone When You Check Their Follower Count?',
    2,
  ),
  paragraph(
    'p-nf-1',
    'Checking a public numerical count is different from following, liking, commenting or messaging.',
  ),
  paragraph(
    'p-nf-2',
    'NovaLikes does not need to interact with the target account to display public follower-count information.',
  ),
  paragraph(
    'p-nf-3',
    'But avoid absolute marketing language such as completely untraceable forever. That is unnecessary.',
  ),
  paragraph(
    'p-nf-4',
    'The accurate value proposition is simply: no Instagram login is required to check the publicly available follower count.',
  ),

  heading(
    'h-request',
    'Does Checking a Follower Count Send a Follow Request?',
    2,
  ),
  paragraph('p-rq-1', 'No.'),
  paragraph(
    'p-rq-2',
    'A follower-count lookup should be read-only.',
  ),
  paragraph(
    'p-rq-3',
    'It should not follow the account, Like anything, comment, send a message or change the target profile.',
  ),
  paragraph(
    'p-rq-4',
    'A follow request requires a separate user action through Instagram.',
  ),
  paragraph(
    'p-rq-5',
    'The counter simply reports the available public number.',
  ),

  heading(
    'h-change',
    "Can the Follower Counter Change Someone's Followers?",
    2,
  ),
  paragraph('p-cg-1', 'No.'),
  paragraph(
    'p-cg-2',
    'It is a viewer and checking tool.',
  ),
  paragraph(
    'p-cg-3',
    'It does not add followers. It does not remove followers. It does not modify the profile.',
  ),
  paragraph(
    'p-cg-4',
    "It should not be confused with NovaLikes' separate commercial Instagram follower service.",
  ),

  heading(
    'h-vs-service',
    'Follower Counter vs Instagram Follower Service',
    2,
  ),
  paragraph(
    'p-vs-1',
    'These have completely different intents.',
  ),
  heading('h-vs-counter', 'Instagram Follower Counter', 3),
  paragraph(
    'p-vs-2',
    'Question: how many followers does this profile publicly show?',
  ),
  heading('h-vs-pkg', 'Instagram Followers Service', 3),
  paragraph(
    'p-vs-3',
    'Question: what follower options are available for a public Instagram profile?',
  ),
  paragraph(
    'p-vs-4',
    'Keep the pages separate.',
  ),
  paragraph(
    'p-vs-5',
    'Someone searching how to check Instagram followers without login does not need a sales page inserted in front of the answer.',
  ),
  paragraph(
    'p-vs-6',
    'The Learn article should primarily support the free tool.',
  ),

  heading('h-cta-section', 'Check an Instagram Follower Count', 2),
  paragraph(
    'p-ct-1',
    'Because this article has direct tool intent, the next step is the free counter rather than a follower package.',
  ),
  {
    id: 'cta-instagram-follower-counter',
    type: 'internal_cta',
    order: nextOrder(),
    href: TOOL_HREF,
    heading: 'Check an Instagram Follower Count',
    description:
      'Enter an Instagram username to check the follower count currently available from its public profile information. No Instagram password is required.',
    label: 'Open Instagram Follower Counter',
  },

  heading(
    'h-own',
    'Should You Use the Counter to Monitor Your Own Account?',
    2,
  ),
  paragraph(
    'p-ow-1',
    'You can use it for a quick public check.',
  ),
  paragraph(
    'p-ow-2',
    "But if it's your own professional Instagram account and you want useful growth analysis, use Instagram Insights.",
  ),
  paragraph(
    'p-ow-3',
    'Meta says Insights can show followers gained, followers lost, audience locations, age ranges and follower activity times for eligible professional accounts. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ow-4',
    'That is much richer than repeatedly checking 42.7K on a public counter.',
  ),
  paragraph(
    'p-ow-5',
    'Use the right tool for the question.',
  ),

  heading(
    'h-useful',
    'When Is a Public Follower Counter Most Useful?',
    2,
  ),
  paragraph('p-uf-1', 'It is useful when you want:'),
  bullets('ul-useful', [
    'a quick follower number,',
    'a no-login check,',
    'a simple brand or profile comparison,',
    'a public profile verification,',
    'or a count check from a browser where you are not signed into Instagram.',
  ]),
  paragraph(
    'p-uf-2',
    'It is not a replacement for Instagram Insights, social listening, engagement analysis, audience demographics or account-owner analytics.',
  ),

  heading(
    'h-missing',
    "What If the Instagram Profile Doesn't Exist?",
    2,
  ),
  paragraph(
    'p-mi-1',
    'The tool should return an honest error.',
  ),
  paragraph(
    'p-mi-2',
    "It should not invent an account, display another user's number or guess the closest username and present it as the requested profile.",
  ),
  paragraph(
    'p-mi-3',
    'Check spelling, underscores, periods and the current username.',
  ),
  paragraph(
    'p-mi-4',
    'Instagram says some accounts may require using the exact username to find them in Search. (Facebook)',
    [{ href: IG_SEARCH_ACCOUNTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-changed',
    'What If Someone Changed Their Instagram Username?',
    2,
  ),
  paragraph(
    'p-cd-1',
    "Use the account's current username.",
  ),
  paragraph(
    'p-cd-2',
    'A follower counter is not necessarily a historical username database, a redirect tracker or an account-identity investigation tool.',
  ),
  paragraph(
    'p-cd-3',
    'If an old username no longer resolves to the expected profile, find the current account first and then check it.',
  ),

  heading('h-fail', 'Why Does the Tool Sometimes Fail?', 2),
  paragraph('p-fa-1', 'Possible causes include:'),
  bullets('ul-fail', [
    'the username is incorrect,',
    'the account no longer exists,',
    "the public profile data isn't available to the extractor at that moment,",
    'Instagram changed its public page behaviour,',
    'or a temporary platform restriction prevents the request from succeeding.',
  ]),
  paragraph(
    'p-fa-2',
    'The correct behaviour is to show a useful error, not invent a follower count.',
  ),
  paragraph(
    'p-fa-3',
    'Accuracy matters more than always returning a number.',
  ),

  heading(
    'h-api',
    "Does the Tool Use Instagram's Private API?",
    2,
  ),
  paragraph(
    'p-ap-1',
    'The user does not need an Instagram API key, Meta developer account or Instagram login to use the NovaLikes public follower-counter interface.',
  ),
  paragraph(
    'p-ap-2',
    'Do not advertise secret or private API access unless that actually exists and is authorized.',
  ),
  paragraph(
    'p-ap-3',
    'The product benefit is much simpler: check publicly published profile information through a convenient interface.',
  ),

  heading(
    'h-live-label',
    'Is It a Live Instagram Follower Counter?',
    2,
  ),
  paragraph(
    'p-ll-1',
    'Only use that phrase carefully.',
  ),
  paragraph(
    'p-ll-2',
    'If NovaLikes performs a fresh lookup when the user submits the username, you can describe it as checking the currently available public follower count.',
  ),
  paragraph(
    'p-ll-3',
    'But do not imply second-by-second streaming, automatic continuous refresh or historical monitoring unless those features exist.',
  ),
  paragraph(
    'p-ll-4',
    'Live can easily overpromise what is really a lookup.',
  ),

  heading(
    'h-bulk',
    'Can You Check Multiple Instagram Accounts at Once?',
    2,
  ),
  paragraph(
    'p-bu-1',
    'The current NovaLikes UI processes one username at a time.',
  ),
  paragraph(
    'p-bu-2',
    'Do not expect bulk upload, CSV checking, a 100-profile comparison or a competitor dashboard.',
  ),
  paragraph(
    'p-bu-3',
    'The tool documentation should match the product exactly.',
  ),

  heading(
    'h-personal',
    'Is a Public Follower Count Personal Information?',
    2,
  ),
  paragraph(
    'p-pe-1',
    'The article does not need to make a legal classification.',
  ),
  paragraph(
    'p-pe-2',
    "The relevant product fact is simpler: Meta itself categorizes the number of followers and following among the Instagram profile information that's public to everyone. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pe-3',
    'Use publicly available profile information responsibly. Do not claim access to restricted data.',
  ),

  heading(
    'h-search-engines',
    'Can Search Engines See Instagram Follower Counts?',
    2,
  ),
  paragraph(
    'p-sg-1',
    'Do not guarantee that a search engine will index a particular current follower number.',
  ),
  paragraph(
    'p-sg-2',
    'Meta says certain profile information is public on or off Instagram, and public Instagram profiles can also be viewed through their web URL. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sg-3',
    'But whether a search engine indexes a particular profile field or keeps the number fresh is controlled by the search engine and current Instagram web behaviour.',
  ),
  paragraph(
    'p-sg-4',
    'So the correct promise is not that Google always shows the latest follower count.',
  ),
  paragraph(
    'p-sg-5',
    'Use the dedicated counter if you want to check the currently available profile number.',
  ),

  heading(
    'h-embed',
    'Does an Instagram Embed Show Follower Information?',
    2,
  ),
  paragraph(
    'p-em-1',
    'Instagram allows public profiles to be embedded on external websites when embedding is enabled. (Facebook)',
    [{ href: IG_EMBED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-em-2',
    'But an embed is a different feature from a dedicated follower-counter lookup.',
  ),
  paragraph(
    'p-em-3',
    'Do not depend on an embedded profile to function as a precise follower monitoring system.',
  ),
  paragraph(
    'p-em-4',
    'The counter has one job: check the follower count.',
  ),

  heading(
    'h-simple',
    'How to Check Instagram Followers Without Logging In: Simple Version',
    2,
  ),
  paragraph('p-si-1', 'Use this process:'),
  numbered('ol-simple', [
    'Find the Instagram username.',
    'Open the NovaLikes Instagram Follower Counter.',
    'Enter the username.',
    'Check the public profile information.',
    'View the published follower count.',
  ]),
  paragraph(
    'p-si-2',
    'If Instagram\'s available public number is abbreviated, such as 104M, the result should remain appropriately abbreviated rather than inventing unsupported precision.',
  ),
  paragraph(
    'p-si-3',
    'No Instagram password is required.',
  ),
  paragraph(
    'p-si-4',
    "And importantly: checking the public follower count does not mean you gain access to a private account's follower list or posts.",
  ),
  paragraph(
    'p-si-5',
    'Meta treats the number of followers as public profile information while private-account content and follower-list access can remain restricted. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Meta says the number of Instagram followers and following is public profile information for both public and private accounts.',
    'Meta says this public profile information can be visible to people on or off Instagram, including people without an Instagram account.',
    'A private Instagram account still restricts its posts to approved followers.',
    'The numerical follower count and the actual follower list are not the same thing; private accounts can restrict access to their followers and following lists.',
    'Instagram Insights provides account owners with deeper follower information such as followers gained or lost and audience trends; a public follower counter does not expose those private analytics.',
    'NovaLikes should preserve abbreviated public counts such as 104M rather than inventing an unsupported exact follower number.',
    'No Instagram password is required for the NovaLikes follower-counter workflow.',
    'A follower counter should not claim to reveal private follower identities, private posts, fake-follower percentages or secret Instagram analytics.',
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

export const CHECK_INSTAGRAM_FOLLOWER_COUNT_WITHOUT_LOGIN_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-check-instagram-follower-count-without-login',
  slug: SLUG,
  title: 'How to Check an Instagram Follower Count Without Logging In',
  excerpt:
    'Sometimes you only need one piece of information from an Instagram profile: how many followers does this account have?',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['followers', 'analytics', 'creator', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'How to Check an Instagram Follower Count Without Logging In',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
  seo: {
    title: 'Check Instagram Follower Count Without Logging In',
    description:
      'Learn how to check a public Instagram follower count without logging in, what follower numbers mean, and why displayed counts may be abbreviated.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'check Instagram follower count without login',
      'Instagram follower counter',
      'check Instagram followers',
      'Instagram follower count viewer',
      'Instagram follower count without account',
      'public Instagram follower count',
    ],
  },
  relatedServices: [],
  relatedArticles: [
    'instagram-followers-vs-likes-vs-views-vs-comments',
    'why-instagram-followers-drop',
    'public-vs-private-instagram-account',
    'view-instagram-profile-without-login',
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
    'The numerical follower count is public profile information',
    'A private account still restricts posts to approved followers',
    'The follower list can have different access rules than the count',
    'NovaLikes shows the publicly published follower count for the requested username',
    'No Instagram password is required',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Can I check an Instagram follower count without logging in?',
      answer:
        'Yes. Meta says the number of followers and following is public profile information and can be visible to people on or off Instagram, including people without an Instagram account.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can I check the follower count of a private Instagram account?',
      answer:
        'Meta says the numerical follower count remains public profile information even when the account is private. Private posts remain restricted to approved followers. A lookup can still only show the count if Instagram exposes usable public profile data.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I see the followers of a private Instagram account?',
      answer:
        "Do not confuse the numerical follower count with the follower list. Meta says people may need to send a follow request to see a private account's followers or following list.",
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Do I need an Instagram password to use the follower counter?',
      answer:
        "No. NovaLikes' follower-counter workflow checks publicly available profile-count information and does not require your Instagram password.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Why does the counter show 104M instead of an exact number?',
      answer:
        'If the available public count is published in abbreviated form, NovaLikes preserves that representation instead of inventing unsupported digits.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Does 104M mean exactly 104,000,000 followers?',
      answer:
        'Not necessarily. An abbreviated public display should not be treated as proof of an exact underlying integer. Report it as the displayed count: 104M.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Is Instagram follower count the same as reach?',
      answer:
        'No. Follower count is an audience metric. Instagram Insights separately tracks follower trends and content-performance information.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Can a follower counter tell whether followers are real?',
      answer:
        'Not from the count alone. NovaLikes should not claim fake-follower detection unless a separate verified analysis system actually exists.',
      schemaEligible: true,
    },
    {
      id: 'faq-9',
      question: 'Does the follower counter show followers gained and lost?',
      answer:
        "The current public counter is for the available profile total. Instagram's own Insights can show Growth, including followers gained and lost, to eligible account owners.",
      schemaEligible: true,
    },
    {
      id: 'faq-10',
      question: 'Can I check Instagram followers from my phone?',
      answer:
        'Yes, the NovaLikes tool is web-based and can be used through its responsive browser interface without requiring a separate app.',
      schemaEligible: true,
    },
  ],
};
