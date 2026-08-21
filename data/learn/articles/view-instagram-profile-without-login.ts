/**
 * Article #26 — How to View a Public Instagram Profile Without Logging In
 * Scheduled: Wednesday 21 October 2026.
 * Utility / tool intent. Distinct from Instagram follower or Like packages.
 * Primary CTA: /tools/instagram-profile-viewer
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'view-instagram-profile-without-login';
const SCHEDULED_AT = '2026-10-21T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;
const TOOL_HREF = '/tools/instagram-profile-viewer';
const PICTURE_TOOL_HREF = '/tools/instagram-profile-picture-viewer';
const COUNTER_HREF = '/tools/instagram-follower-counter';
const VIDEO_TOOL_HREF = '/tools/instagram-video-downloader';

const IG_WEB_PROFILE =
  'https://www.facebook.com/help/instagram/365041933611384';
const IG_PUBLIC_PROFILE_INFO =
  'https://www.facebook.com/help/instagram/347751748650214';
const IG_MAKE_PRIVATE =
  'https://www.facebook.com/help/instagram/448523408565555';
const IG_PUBLIC_VS_PRIVATE =
  'https://www.facebook.com/help/instagram/517073653436611';
const IG_EMBED =
  'https://www.facebook.com/help/instagram/620154495870484';
const IG_ON_THE_WEB =
  'https://www.facebook.com/help/instagram/513918941996087';
const IG_AGE_RESTRICTED =
  'https://www.facebook.com/help/instagram/1462811168095506';
const IG_BUSINESS_BUTTON =
  'https://www.facebook.com/help/instagram/1419650861499317';
const IG_TURN_OFF_EMBED =
  'https://www.facebook.com/help/instagram/252460186989212';

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
    "Sometimes you don't want to create an Instagram account, open the Instagram app or sign into an existing profile.",
  ),
  paragraph(
    'p-open-2',
    'You may simply want to check publicly available information about a business, creator, brand, organization or other public Instagram profile.',
  ),
  paragraph(
    'p-open-3',
    'Instagram does make some profile information publicly available.',
  ),
  paragraph(
    'p-open-4',
    "Meta says information including a user's name, username, profile picture, bio, links and number of followers and following is public to everyone on or off Instagram, including people who don't have an Instagram account. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-5',
    "For public accounts, Meta also says anyone can view the profile and its public posts by visiting the account's Instagram web address. (Facebook)",
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-6',
    'That means there is an important difference between viewing publicly available Instagram information and trying to bypass account privacy.',
  ),
  paragraph(
    'p-open-7',
    'A legitimate Instagram Profile Viewer belongs in the first category.',
    [{ href: TOOL_HREF, label: 'Instagram Profile Viewer' }],
  ),
  paragraph(
    'p-open-8',
    'The live NovaLikes tool checks the public identity snapshot Instagram already shows: photo, name, bio and published count labels when those fields are exposed. It does not list posts, Stories or Highlights, and it does not unlock private-account content.',
  ),
  paragraph(
    'p-open-9',
    'No Instagram password is required for the NovaLikes public-profile viewing workflow.',
  ),
  paragraph(
    'p-open-10',
    'The rule is simple: a public-profile viewer is for public information, not a private-account unlocker.',
  ),

  heading(
    'h-mean',
    'What Does View Instagram Without Logging In Actually Mean?',
    2,
  ),
  paragraph(
    'p-mn-1',
    'This phrase can mean several different things.',
  ),
  paragraph(
    'p-mn-2',
    'Someone may want to check a username, see a profile picture, read a public bio, check a follower count, inspect a public profile or see publicly accessible posts.',
  ),
  paragraph(
    'p-mn-3',
    "These are all different from logging into somebody else's account, accessing private posts, seeing restricted Stories, reading DMs or bypassing follower approval.",
  ),
  paragraph(
    'p-mn-4',
    'Meta explicitly recognizes that certain Instagram profile information is public on or off Instagram. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-mn-5',
    'So a no-login viewer can legitimately focus on that public layer. It should not pretend to provide access to everything Instagram contains.',
  ),
  figure(
    'fig-layers',
    `${IMAGE_DIR}/profile-layers.png`,
    'An Instagram profile has a public information layer for username, name, picture, bio, links and counts, while private-account posts stay restricted',
    'Public profile information and private account content are different layers.',
  ),

  heading('h-no-account', 'Can You View Instagram Without an Account?', 2),
  paragraph(
    'p-na-1',
    'Some Instagram information can be public even to people without Instagram accounts.',
  ),
  paragraph(
    'p-na-2',
    "Meta specifically says its public profile-information list can be seen by people on or off Instagram, even if they don't have an Instagram account. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-na-3',
    'For public accounts, Meta also says people can see the profile and posts through the account\'s web address. (Facebook)',
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-na-4',
    'However, this does not mean Instagram promises an unlimited, identical no-login browsing experience forever.',
  ),
  paragraph(
    'p-na-5',
    'Instagram can change login prompts, page presentation, rate limits, web interfaces and technical accessibility.',
  ),
  paragraph(
    'p-na-6',
    'Therefore do not promise that anyone can browse unlimited Instagram forever without login.',
  ),
  paragraph(
    'p-na-7',
    'A more accurate statement is: certain public Instagram profile information can be viewed without providing an Instagram login.',
  ),

  heading(
    'h-how',
    'How to View a Public Instagram Profile With NovaLikes',
    2,
  ),
  paragraph(
    'p-hw-1',
    'The NovaLikes workflow should stay simple.',
  ),
  heading('h-how-1', 'Step 1: Open the Instagram Profile Viewer', 3),
  paragraph(
    'p-hw-2',
    'Open the Instagram Profile Viewer on NovaLikes.',
  ),
  heading('h-how-2', 'Step 2: Enter the Username or Profile URL', 3),
  paragraph(
    'p-hw-3',
    'Enter the Instagram username you want to check, with or without the @ sign. The live tool also accepts a public profile URL.',
  ),
  paragraph(
    'p-hw-4',
    'Use the actual username, such as nasa, rather than relying only on the display name NASA.',
  ),
  heading('h-how-3', 'Step 3: Run the Check', 3),
  paragraph(
    'p-hw-5',
    'Submit the username. NovaLikes checks the public profile information available for that Instagram account.',
  ),
  heading('h-how-4', 'Step 4: Review the Available Profile Details', 3),
  paragraph(
    'p-hw-6',
    'Depending on what the public source currently exposes, you can review the photo, display name, username, biography and published Followers, Following and Posts labels when Instagram includes them.',
  ),
  paragraph(
    'p-hw-7',
    'No Instagram password should be required.',
  ),
  paragraph(
    'p-hw-8',
    'If Instagram does not expose usable public data for the request, the tool should return an honest error instead of inventing information.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/viewer-workflow.png`,
    'Instagram Profile Viewer workflow: enter a username, check public profile information, then review the available details',
    'No Instagram password required. Public information only.',
  ),

  heading('h-public-fields', 'What Information Is Public on Instagram?', 2),
  paragraph(
    'p-pf-1',
    'Meta currently lists several profile fields as information anyone can see.',
  ),
  bullets('ul-fields', [
    'Name',
    'Username',
    'Profile picture',
    'Bio',
    'Links',
    'Number of followers',
    'Number of accounts followed',
  ]),
  paragraph(
    'p-pf-2',
    'Some other profile-related information can also appear depending on the account and features. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pf-3',
    'This is an important privacy distinction. Even a private Instagram account still has a public-facing profile layer.',
  ),
  paragraph(
    'p-pf-4',
    'Private does not mean nothing about the account exists publicly. Instead, account privacy primarily controls access to protected content and related account experiences. (Facebook)',
    [{ href: IG_PUBLIC_VS_PRIVATE, label: 'Facebook', external: true }],
  ),

  heading(
    'h-public-account',
    'What Can You See on a Public Instagram Account?',
    2,
  ),
  paragraph(
    'p-pa-1',
    "Meta says that if an Instagram account is public, anyone can see its profile and posts through its Instagram web URL. (Facebook)",
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pa-2',
    'A public account can therefore expose considerably more than a private account.',
  ),
  paragraph(
    'p-pa-3',
    "Depending on Instagram's current web experience, this can include publicly shared posts, Reels, profile information and related public content.",
  ),
  paragraph(
    'p-pa-4',
    'Instagram also allows public profiles and public posts or Reels to be embedded on websites when embedding is enabled. (Facebook)',
    [{ href: IG_EMBED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pa-5',
    'This reinforces the distinction that a public Instagram account is intentionally designed for broader visibility.',
  ),
  paragraph(
    'p-pa-6',
    'The NovaLikes Profile Viewer still focuses on the public identity snapshot. It does not become a full post archive just because Instagram itself can show public posts on the web.',
  ),

  heading(
    'h-private',
    'Can You View a Private Instagram Profile Without Logging In?',
    2,
  ),
  paragraph(
    'p-pr-1',
    'Meta says you may still be able to see the basic public profile information that remains visible regardless of account privacy, including username, name, profile picture, bio, links and follower or following counts. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pr-2',
    "But that does not mean the private account's protected posts become available.",
  ),
  paragraph(
    'p-pr-3',
    "Instagram's privacy settings exist specifically so users can restrict who sees their posts, Reels and Stories. (Facebook)",
    [{ href: IG_MAKE_PRIVATE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pr-4',
    'The live NovaLikes Profile Viewer currently checks public profiles Instagram already exposes. Private, hidden or login-gated profiles can return an error instead of a snapshot.',
  ),
  heading('h-pr-basics', 'Private Profile Basics', 3),
  paragraph(
    'p-pr-5',
    'Some profile information remains public according to Meta. A lookup still only succeeds when Instagram exposes usable public data for the request.',
  ),
  heading('h-pr-posts', 'Private Posts and Protected Content', 3),
  paragraph(
    'p-pr-6',
    'Not a public-viewer use case.',
  ),

  heading(
    'h-unlock',
    'Can an Instagram Profile Viewer Unlock Private Posts?',
    2,
  ),
  paragraph('p-un-1', 'No.'),
  paragraph(
    'p-un-2',
    'A legitimate Instagram Profile Viewer should not claim to view private Instagram posts, unlock private Reels, see hidden Stories, bypass follow requests or access any private account.',
  ),
  paragraph(
    'p-un-3',
    'Instagram lets users make their accounts private specifically to control who can see protected content. (Facebook)',
    [{ href: IG_MAKE_PRIVATE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-un-4',
    'NovaLikes should respect that boundary.',
  ),
  paragraph(
    'p-un-5',
    'If a user wants to see private-account content, the legitimate route is to send a follow request and wait for the account owner to approve it. A public-profile tool is not a privacy bypass.',
  ),
  figure(
    'fig-access',
    `${IMAGE_DIR}/public-vs-private.png`,
    'Public Instagram accounts can show public posts, while private accounts keep protected content restricted even though basic profile information remains public',
    'Account privacy controls content access, not the existence of basic public profile information.',
  ),
  {
    id: 'table-access',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Layer', 'Public account', 'Private account'],
    rows: [
      ['Name, username, picture, bio, links', 'Public', 'Public according to Meta'],
      ['Follower and following numbers', 'Public', 'Public according to Meta'],
      ['Posts, Reels and Stories', 'Public posts may be viewable', 'Restricted to approved followers'],
      ['NovaLikes Profile Viewer', 'Public snapshot when exposed', 'Can error if Instagram does not expose the profile'],
    ],
  },

  heading(
    'h-hidden',
    'Is a Private Instagram Profile Completely Hidden?',
    2,
  ),
  paragraph('p-hi-1', 'No.'),
  paragraph(
    'p-hi-2',
    'Meta explicitly says profile information such as name, username, profile picture, bio, links and follower or following numbers remains public. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hi-3',
    'So private means content access is restricted rather than the profile becoming invisible.',
  ),
  paragraph(
    'p-hi-4',
    'This is the same distinction we covered in our guide to public vs private Instagram accounts.',
    [
      {
        href: '/learn/public-vs-private-instagram-account',
        label: 'public vs private Instagram accounts',
      },
    ],
  ),

  heading(
    'h-dp',
    'Can You See a Private Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-dp-1',
    'The profile picture itself is part of the information Meta says anyone can see. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-dp-2',
    'That is why NovaLikes also has a separate Instagram Profile Picture Viewer for users whose intent is specifically to see the available profile picture more clearly.',
    [{ href: PICTURE_TOOL_HREF, label: 'Instagram Profile Picture Viewer' }],
  ),
  paragraph(
    'p-dp-3',
    'The Profile Viewer and Profile Picture Viewer should not be merged conceptually.',
  ),
  heading('h-dp-viewer', 'Profile Viewer', 3),
  paragraph(
    'p-dp-4',
    'Broader publicly available profile information.',
  ),
  heading('h-dp-picture', 'Profile Picture Viewer', 3),
  paragraph(
    'p-dp-5',
    'Profile image specifically. Different search intent. Different tool page. Our guide on how to view an Instagram profile picture in full size covers that workflow.',
    [
      {
        href: '/learn/view-instagram-profile-picture-full-size',
        label: 'view an Instagram profile picture in full size',
      },
    ],
  ),

  heading(
    'h-count',
    "Can You See a Private Account's Follower Count?",
    2,
  ),
  paragraph(
    'p-ct-1',
    'Meta lists the number of followers and following as public profile information. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ct-2',
    'That is different from seeing the identities of every person inside the follower or following lists.',
  ),
  paragraph(
    'p-ct-3',
    'So you may know this account publicly shows 25K followers without being entitled to browse every restricted follower relationship.',
  ),
  paragraph(
    'p-ct-4',
    'This is why NovaLikes also has a separate Instagram Follower Counter, and a dedicated guide on how to check an Instagram follower count without logging in.',
    [
      { href: COUNTER_HREF, label: 'Instagram Follower Counter' },
      {
        href: '/learn/check-instagram-follower-count-without-login',
        label: 'check an Instagram follower count without logging in',
      },
    ],
  ),

  heading(
    'h-list',
    'Public Follower Count vs Private Follower List',
    2,
  ),
  heading('h-list-count', 'Public Follower Count', 3),
  paragraph(
    'p-li-1',
    'A numerical profile field, such as 25K Followers. Large accounts may appear as abbreviated labels such as 104M when Instagram writes them that way.',
  ),
  heading('h-list-people', 'Follower List', 3),
  paragraph(
    'p-li-2',
    'The actual collection of accounts behind that number. Privacy rules may restrict access differently.',
  ),
  paragraph(
    'p-li-3',
    'Do not market an Instagram Profile Viewer as a private follower list viewer simply because the follower total itself is visible.',
  ),

  heading('h-browser', 'Can You View Instagram Profiles in a Browser?', 2),
  paragraph('p-br-1', 'Yes.'),
  paragraph(
    'p-br-2',
    'Meta says public Instagram profiles can be viewed on the web by visiting instagram.com plus the username for a public account. (Facebook)',
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-br-3',
    "Instagram also has a normal web interface. Meta's Help Center documents accessing Instagram through instagram.com. (Facebook)",
    [{ href: IG_ON_THE_WEB, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-br-4',
    'The difference is that Instagram itself may prompt users to log in for parts of the experience.',
  ),
  paragraph(
    'p-br-5',
    "A public Profile Viewer can provide a simpler lookup when the user's goal is only supported public information.",
  ),

  heading(
    'h-prompt',
    'Why Does Instagram Sometimes Ask Me to Log In?',
    2,
  ),
  paragraph(
    'p-pp-1',
    'Instagram controls its own web interface.',
  ),
  paragraph(
    'p-pp-2',
    'Even though certain profile information is publicly classified, Instagram can still decide how much browsing is shown before login, how pages load, what interactions require authentication and how the web product behaves.',
  ),
  paragraph(
    'p-pp-3',
    'That is why information is public does not always mean Instagram promises an unlimited no-login browsing interface.',
  ),
  paragraph(
    'p-pp-4',
    'These are different questions. A third-party viewer should avoid promising that Instagram itself will never show login prompts.',
  ),

  heading(
    'h-login-for-me',
    'Does a Profile Viewer Log Into Instagram for Me?',
    2,
  ),
  paragraph(
    'p-lf-1',
    'NovaLikes should not claim or require that.',
  ),
  paragraph(
    'p-lf-2',
    'The user-facing workflow should remain username or public profile URL to public information, not Instagram username and password to a third-party login.',
  ),
  paragraph(
    'p-lf-3',
    'This matters for both usability and account security. For publicly available profile information, there is no reason to ask users to surrender their Instagram credentials.',
  ),

  heading(
    'h-password',
    'Should an Instagram Profile Viewer Ask for Your Password?',
    2,
  ),
  paragraph(
    'p-pw-1',
    "No, not for NovaLikes' current public-profile viewing workflow.",
  ),
  paragraph(
    'p-pw-2',
    'The tool should not ask for Instagram password, two-factor authentication code, session cookie, backup code or login approval.',
  ),
  paragraph(
    'p-pw-3',
    'If all you are trying to do is inspect information Meta categorizes as public, those credentials are unnecessary.',
  ),

  heading(
    'h-anon',
    'Is an Instagram Profile Viewer Anonymous?',
    2,
  ),
  paragraph(
    'p-an-1',
    'Avoid an absolute promise such as 100% anonymous and untraceable. That wording is unnecessarily broad.',
  ),
  paragraph(
    'p-an-2',
    'A website still involves network connections, server requests, security systems and potentially ordinary operational logs.',
  ),
  paragraph(
    'p-an-3',
    'The more accurate NovaLikes promise is: no Instagram password is required, and the tool does not need to follow or interact with the target account to check supported public profile information. That is enough.',
  ),

  heading(
    'h-notify',
    'Does Instagram Notify Someone When You View Their Profile?',
    2,
  ),
  paragraph(
    'p-nf-1',
    "Instagram's public profile-information documentation does not describe ordinary profile viewing as an action that sends the profile owner a visitor notification. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nf-2',
    'However, do not turn that into an exaggerated promise that Instagram can never know anything about visits or provides universal invisible browsing.',
  ),
  paragraph(
    'p-nf-3',
    'NovaLikes does not need such a claim. The tool should simply remain read-only and avoid following, liking, commenting or messaging the target account.',
  ),

  heading(
    'h-follow-req',
    'Does Viewing a Profile Send a Follow Request?',
    2,
  ),
  paragraph('p-fr-1', 'No.'),
  paragraph(
    'p-fr-2',
    'A follow request is a separate Instagram action.',
  ),
  paragraph(
    'p-fr-3',
    'Viewing publicly available profile information should not follow the account, request approval, Like content, comment or send a message.',
  ),
  paragraph(
    'p-fr-4',
    "NovaLikes' Profile Viewer should remain a lookup utility.",
  ),

  heading(
    'h-add-followers',
    'Does Viewing a Profile Increase Its Follower Count?',
    2,
  ),
  paragraph('p-af-1', 'No.'),
  paragraph(
    'p-af-2',
    'Viewing and following are different actions. The Profile Viewer does not need to modify the account in any way.',
  ),
  paragraph(
    'p-af-3',
    'If the profile publicly shows 20K followers before the lookup, the viewer is not designed to add, remove or purchase followers.',
  ),
  paragraph(
    'p-af-4',
    "NovaLikes' commercial follower service is a separate product with separate intent and is not the CTA for this article.",
  ),

  heading('h-search', 'Profile Viewer vs Instagram Search', 2),
  paragraph(
    'p-sr-1',
    'Instagram Search can help users discover accounts, topics and other content. But a Profile Viewer solves a different task.',
  ),
  paragraph(
    'p-sr-2',
    'Search asks which account you are looking for. Profile Viewer asks for the public information for this known username.',
  ),
  paragraph(
    'p-sr-3',
    'If you already know the username, a direct lookup is simpler.',
  ),

  heading('h-username', 'Why Is the Username Important?', 2),
  paragraph(
    'p-us-1',
    'Instagram display names are not unique in the same way usernames are used to identify profiles.',
  ),
  paragraph(
    'p-us-2',
    'For example, the display name NASA is different from the username nasa. A different account could also use NASA Fan or another similar display name.',
  ),
  paragraph(
    'p-us-3',
    'For a profile lookup, use the actual username. This helps avoid returning the wrong account.',
  ),

  heading('h-wrong', 'What If the Username Is Wrong?', 2),
  paragraph(
    'p-wr-1',
    'The tool should return Profile not found or another clear error.',
  ),
  paragraph(
    'p-wr-2',
    'It should not guess another person, show a near-match as though it were exact or fabricate profile information.',
  ),
  paragraph(
    'p-wr-3',
    'A public viewer is useful only when its result can be trusted. Accuracy is more important than always showing something.',
  ),

  heading(
    'h-changed',
    'What If the User Changed Their Username?',
    2,
  ),
  paragraph(
    'p-ch-1',
    'The old username may no longer resolve to the expected account. Use the account\'s current Instagram username.',
  ),
  paragraph(
    'p-ch-2',
    'The Profile Viewer should not be marketed as a historical username tracker, identity database or account-history lookup system unless such functionality actually exists.',
  ),

  heading('h-real-name', 'Can You Search by Real Name?', 2),
  paragraph(
    'p-rn-1',
    'The current NovaLikes tool accepts usernames, with or without @, and public profile URLs.',
  ),
  paragraph(
    'p-rn-2',
    'Do not promise name search, email search, phone-number search, face search or reverse image lookup.',
  ),
  paragraph(
    'p-rn-3',
    'The user should enter the supported Instagram username or public profile URL.',
  ),

  heading(
    'h-phone',
    'Can You Search an Instagram Profile by Phone Number?',
    2,
  ),
  paragraph(
    'p-ph-1',
    'Not through the NovaLikes Profile Viewer.',
  ),
  paragraph(
    'p-ph-2',
    'And the article should not encourage people to use private contact information to identify accounts.',
  ),
  paragraph(
    'p-ph-3',
    'The tool is designed around public Instagram username and profile information. That is a clean boundary.',
  ),

  heading(
    'h-email',
    'Can You Search an Instagram Profile by Email Address?',
    2,
  ),
  paragraph(
    'p-em-1',
    'Same answer.',
  ),
  paragraph(
    'p-em-2',
    'Do not turn a public-profile utility into people-search, contact enrichment or identity matching.',
  ),
  paragraph(
    'p-em-3',
    'Use the username associated with the public Instagram profile.',
  ),

  heading(
    'h-posts',
    'Can the Profile Viewer Show Instagram Posts?',
    2,
  ),
  paragraph(
    'p-po-1',
    "For public accounts, Meta says public posts can be visible through the account's web profile. (Facebook)",
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-po-2',
    'The current NovaLikes Profile Viewer focuses on public profile-level information. It does not list posts, Stories or Highlights.',
  ),
  paragraph(
    'p-po-3',
    'Do not add full post archive, Story viewer, private Reel browser or download-all-media claims simply because those features might be technically adjacent. Keep documentation aligned with the live product.',
  ),

  heading(
    'h-reels',
    'Can You View Instagram Reels Without Logging In?',
    2,
  ),
  paragraph(
    'p-rl-1',
    "Public-account Reels can form part of Instagram's public content environment, and public posts or Reels can be embeddable when the account's embed settings allow it. (Facebook)",
    [{ href: IG_EMBED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rl-2',
    "But Instagram's no-login web behaviour can vary. Therefore avoid promising that every Reel is always playable without an Instagram account.",
  ),
  paragraph(
    'p-rl-3',
    "If the intent is specifically downloading public Instagram video or Reel media, use NovaLikes' separate Instagram Video / Reels Downloader where supported. Don't turn the Profile Viewer into a downloader.",
    [{ href: VIDEO_TOOL_HREF, label: 'Instagram Video / Reels Downloader' }],
  ),

  heading(
    'h-stories',
    'Can You View Instagram Stories Without Logging In?',
    2,
  ),
  paragraph(
    'p-st-1',
    'Do not claim this through the Profile Viewer.',
  ),
  paragraph(
    'p-st-2',
    'Stories are a separate Instagram format with their own visibility rules.',
  ),
  paragraph(
    'p-st-3',
    'NovaLikes does not need to advertise anonymous Story viewing, private Story access or hidden Story viewing on this page. The current tool is about public profile information. Stay focused.',
  ),

  heading(
    'h-highlights',
    'Can You View Instagram Highlights Without Logging In?',
    2,
  ),
  paragraph(
    'p-hl-1',
    "Again, don't promise unsupported capabilities.",
  ),
  paragraph(
    'p-hl-2',
    "If Instagram publicly exposes some profile content in a specific context, that doesn't automatically mean the NovaLikes Profile Viewer supports every content type.",
  ),
  paragraph(
    'p-hl-3',
    'The article should distinguish what Instagram may expose from what the NovaLikes tool actually provides. Never expand tool scope through SEO copy.',
  ),

  heading('h-deleted-posts', 'Can You View Deleted Instagram Posts?', 2),
  paragraph('p-de-1', 'No.'),
  paragraph(
    'p-de-2',
    'The Profile Viewer is not an archive, cache, deleted-post recovery service or wayback machine.',
  ),
  paragraph(
    'p-de-3',
    'If content is no longer publicly available, the tool should not promise to recover it.',
  ),

  heading(
    'h-deleted-profile',
    'Can You View Deleted Instagram Profiles?',
    2,
  ),
  paragraph(
    'p-dpf-1',
    'If an Instagram profile no longer exists or is no longer publicly retrievable, the tool should return an error.',
  ),
  paragraph(
    'p-dpf-2',
    'Do not invent historical profile snapshots, old bios, old profile pictures or follower numbers. A current profile viewer should show current supported public data.',
  ),

  heading('h-blocked', 'Can You View a Blocked Instagram Account?', 2),
  paragraph(
    'p-bk-1',
    'This depends on what you mean by blocked.',
  ),
  paragraph(
    'p-bk-2',
    'If your logged-in Instagram account has been blocked by another user, that is an account relationship inside Instagram.',
  ),
  paragraph(
    'p-bk-3',
    "NovaLikes should not be marketed as a block bypass tool or a way to defeat another person's decision to block you.",
  ),
  paragraph(
    'p-bk-4',
    'The Profile Viewer should remain focused on generally public profile information, not bypassing person-to-person account controls.',
  ),

  heading(
    'h-age',
    'Can You View an Age-Restricted Instagram Profile?',
    2,
  ),
  paragraph(
    'p-ag-1',
    'Do not promise a bypass.',
  ),
  paragraph(
    'p-ag-2',
    'Instagram applies age-related access and availability rules to some accounts and content. Meta has documented that certain profile or content visibility can depend on age restrictions. (Facebook)',
    [{ href: IG_AGE_RESTRICTED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ag-3',
    'NovaLikes should respect the public information actually available. No age-gate bypass claims.',
  ),

  heading('h-business', 'Can You View Business Instagram Profiles?', 2),
  paragraph(
    'p-bu-1',
    'Yes, public business or professional profiles can have publicly visible profile information like other public accounts.',
  ),
  paragraph(
    'p-bu-2',
    'Instagram business accounts can also display additional public business information and action buttons depending on their setup. (Facebook)',
    [{ href: IG_BUSINESS_BUTTON, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-bu-3',
    'A public-profile viewer can therefore be useful for checking brand identity, username, bio, links, profile picture and other supported public-facing information.',
  ),

  heading('h-creator', 'Can You View Creator Profiles?', 2),
  paragraph(
    'p-cr-1',
    'The same basic principle applies.',
  ),
  paragraph(
    'p-cr-2',
    'If the account is public, Meta says its profile and public posts can be visible on the web. (Facebook)',
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cr-3',
    'The tool does not need special access to treat a public creator profile as publicly viewable.',
  ),

  heading(
    'h-celeb',
    'Can You View Celebrity Instagram Profiles Without Logging In?',
    2,
  ),
  paragraph(
    'p-ce-1',
    'If the profile is public, the same public-account rules apply.',
  ),
  paragraph(
    'p-ce-2',
    'But the NovaLikes tool should not claim special celebrity databases, verified-person identification or extra access.',
  ),
  paragraph(
    'p-ce-3',
    'It should simply process the supported username like another public profile.',
  ),

  heading(
    'h-embed',
    'Public Instagram Profiles Can Be Embedded on Websites',
    2,
  ),
  paragraph(
    'p-eb-1',
    'Meta allows public Instagram profiles, posts and Reels to be embedded into external websites when the account has not disabled embedding. (Facebook)',
    [{ href: IG_EMBED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-eb-2',
    'This is useful context because it demonstrates that public Instagram content can exist beyond the Instagram app itself.',
  ),
  paragraph(
    'p-eb-3',
    'But embedding and profile viewing are still different things. An embed places Instagram content inside another page. A profile viewer checks and presents supported public-profile information.',
  ),

  heading(
    'h-disable-embed',
    'Can a Public Instagram Account Disable Embedding?',
    2,
  ),
  paragraph('p-di-1', 'Yes.'),
  paragraph(
    'p-di-2',
    'Meta says users with public accounts can turn off the setting that lets external websites embed their profile and content. (Facebook)',
    [{ href: IG_TURN_OFF_EMBED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-di-3',
    'That means public does not automatically mean embeddable everywhere. The account can be public while the owner disables embedding.',
  ),

  heading(
    'h-three',
    'Public Profile vs Embed vs Downloader',
    2,
  ),
  heading('h-th-viewer', 'Profile Viewer', 3),
  paragraph(
    'p-th-1',
    'What public profile information is available?',
  ),
  heading('h-th-embed', 'Embed', 3),
  paragraph(
    'p-th-2',
    'Can this public Instagram content be displayed inside another website?',
  ),
  heading('h-th-dl', 'Downloader', 3),
  paragraph(
    'p-th-3',
    'Is publicly exposed media available for download through the supported tool?',
  ),
  paragraph(
    'p-th-4',
    'Do not combine all three into one fake Instagram everything tool. Clear tools are better.',
  ),

  heading(
    'h-vs-picture',
    'Instagram Profile Viewer vs Profile Picture Viewer',
    2,
  ),
  paragraph(
    'p-vp-1',
    'NovaLikes has both for a reason.',
  ),
  paragraph(
    'p-vp-2',
    'Use the Profile Viewer when you want broader public profile information. Use the Profile Picture Viewer when you specifically want the available profile picture in a larger presentation.',
  ),
  paragraph(
    'p-vp-3',
    'That creates better user intent matching and avoids bloated interfaces.',
  ),

  heading(
    'h-vs-counter',
    'Instagram Profile Viewer vs Follower Counter',
    2,
  ),
  paragraph(
    'p-vc-1',
    'Same principle.',
  ),
  paragraph(
    'p-vc-2',
    'The Profile Viewer is a broad profile lookup. The Follower Counter is a focused follower-count check.',
  ),
  paragraph(
    'p-vc-3',
    'Someone searching Instagram follower count should not need to dig through a general profile viewer. Someone searching Instagram profile viewer may want broader context than a number. Keep both.',
  ),

  heading(
    'h-vs-video',
    'Instagram Profile Viewer vs Video Downloader',
    2,
  ),
  paragraph(
    'p-vv-1',
    'The Profile Viewer is not a downloader.',
  ),
  paragraph(
    'p-vv-2',
    'If a user wants to save supported public Instagram video or Reel media, send them to the dedicated Instagram video downloader page.',
  ),
  paragraph(
    'p-vv-3',
    'Do not add Download All Posts, Download Entire Profile or Bulk Instagram Scraper to this article. Those features do not belong here.',
  ),

  heading('h-cta-section', 'View a Public Instagram Profile', 2),
  paragraph(
    'p-cs-1',
    'This is direct tool intent, so the next step is the free Instagram Profile Viewer rather than an Instagram follower, Like, View or Comment package.',
  ),
  {
    id: 'cta-instagram-profile-viewer',
    type: 'internal_cta',
    order: nextOrder(),
    href: TOOL_HREF,
    heading: 'View a Public Instagram Profile',
    description:
      'Enter an Instagram username to check the public profile information currently available for that account. No Instagram password is required.',
    label: 'Open Instagram Profile Viewer',
  },

  heading('h-nl-account', 'Do You Need a NovaLikes Account?', 2),
  paragraph(
    'p-nl-1',
    'The existing tool does not require a NovaLikes account.',
  ),
  paragraph(
    'p-nl-2',
    'The user should be able to open the tool, enter a username and check the supported public profile information.',
  ),
  paragraph(
    'p-nl-3',
    'Do not invent signup, premium credits, email verification or subscription access.',
  ),

  heading('h-free', 'Is the Instagram Profile Viewer Free?', 2),
  paragraph(
    'p-fe-1',
    "NovaLikes' Profile Viewer is part of the site's free tools.",
  ),
  paragraph(
    'p-fe-2',
    'Keep the positioning as a free public-profile utility. Do not add a free-trial claim if there is no paid version.',
  ),

  heading('h-api', 'Does It Use an External API?', 2),
  paragraph(
    'p-ap-1',
    'This is not something the end user needs to configure.',
  ),
  paragraph(
    'p-ap-2',
    'The NovaLikes tool should not require users to enter Meta API credentials, RapidAPI keys, Instagram developer tokens or third-party login information.',
  ),
  paragraph(
    'p-ap-3',
    'The user-facing experience is a standard public web tool.',
  ),

  heading('h-realtime', 'Is It Real-Time?', 2),
  paragraph(
    'p-rt-1',
    'Be careful with this phrase.',
  ),
  paragraph(
    'p-rt-2',
    'A profile lookup can retrieve the information publicly available at the time of the request.',
  ),
  paragraph(
    'p-rt-3',
    'That is not the same as continuous live monitoring, second-by-second profile tracking or historical change alerts.',
  ),
  paragraph(
    'p-rt-4',
    'Better wording: check the currently available public profile information. Not: live-track any Instagram account forever.',
  ),

  heading('h-history', 'Does the Profile Viewer Track Changes?', 2),
  paragraph(
    'p-hs-1',
    'The current tool does not store historical snapshots.',
  ),
  paragraph(
    'p-hs-2',
    "Don't promise old bios, username history, daily follower charts, profile-picture history or deleted-profile records.",
  ),
  paragraph(
    'p-hs-3',
    'A current lookup tool should remain a current lookup tool.',
  ),

  heading(
    'h-bulk',
    'Can You View Multiple Profiles at Once?',
    2,
  ),
  paragraph(
    'p-bm-1',
    'The existing interface accepts one username or profile URL at a time.',
  ),
  paragraph(
    'p-bm-2',
    'Do not invent bulk CSV uploads, 100-profile monitoring, competitive dashboards or batch Instagram scraping. Those would be separate products.',
  ),

  heading(
    'h-fake',
    'Can the Profile Viewer Tell if an Account Is Fake?',
    2,
  ),
  paragraph(
    'p-fk-1',
    'Not reliably from basic public profile information alone.',
  ),
  paragraph(
    'p-fk-2',
    'Do not add Fake Account Score, Bot Probability, Trust Score or Real Profile Verification unless NovaLikes actually has a verified detection system.',
  ),
  paragraph(
    'p-fk-3',
    "A profile viewer can show supported public information. It cannot automatically determine the truthfulness of someone's identity.",
  ),

  heading(
    'h-verified',
    'Can It Tell Whether a Profile Is Verified?',
    2,
  ),
  paragraph(
    'p-vf-1',
    'The current Profile Viewer documents the public identity snapshot Instagram exposes. Do not invent a verified-status field if the live result does not display one.',
  ),
  paragraph(
    'p-vf-2',
    'Likewise, don\'t confuse a similar username, brand logo or follower count with official verification. Tool documentation should match actual output.',
  ),

  heading(
    'h-competitor',
    'Can You Use a Profile Viewer for Competitor Research?',
    2,
  ),
  paragraph(
    'p-cp-1',
    'Yes, at a basic public-information level.',
  ),
  paragraph(
    'p-cp-2',
    'For example, you could use publicly available information to review bio positioning, profile naming, links or broad profile presentation.',
  ),
  paragraph(
    'p-cp-3',
    'But do not treat a profile viewer as private competitor analytics, sales estimates, audience demographics, engagement intelligence or internal Instagram Insights.',
  ),
  paragraph(
    'p-cp-4',
    'Those are not available simply because the profile is public.',
  ),

  heading(
    'h-insights',
    'Public Profile Data Is Not Instagram Insights',
    2,
  ),
  heading('h-in-public', 'Public Profile Information', 3),
  paragraph(
    'p-in-1',
    'Things anyone may see, such as username, bio, profile picture, links and follower or following numbers. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  heading('h-in-owner', 'Instagram Insights', 3),
  paragraph(
    'p-in-2',
    'Account-owner analytics. These can contain performance and audience information that is not simply part of another user\'s public profile.',
  ),
  paragraph(
    'p-in-3',
    "A public Profile Viewer should never claim to see any account's private Insights or view their internal analytics.",
  ),

  heading(
    'h-who-viewed',
    'Can You See Who Viewed an Instagram Profile?',
    2,
  ),
  paragraph(
    'p-wv-1',
    'This article is about viewing a profile, not discovering profile visitors.',
  ),
  paragraph(
    'p-wv-2',
    'Do not introduce a claim that NovaLikes can show who viewed your Instagram profile unless there is a genuine Instagram-supported feature or verified NovaLikes functionality for that.',
  ),
  paragraph(
    'p-wv-3',
    'The current Profile Viewer does not need that promise.',
  ),

  heading(
    'h-they-know',
    'Can Someone Tell You Checked Their Profile Through NovaLikes?',
    2,
  ),
  paragraph(
    'p-tk-1',
    'NovaLikes should avoid guaranteeing they can never know.',
  ),
  paragraph(
    'p-tk-2',
    'The more useful factual product statement is: the tool does not require your Instagram password or an explicit follow, Like or comment action to perform the supported public lookup.',
  ),
  paragraph(
    'p-tk-3',
    'Keep privacy claims narrow and defensible.',
  ),

  heading(
    'h-reuse',
    'Does Viewing Public Information Mean You Can Reuse It?',
    2,
  ),
  paragraph('p-ru-1', 'No.'),
  paragraph(
    'p-ru-2',
    'Visibility and reuse rights are different issues.',
  ),
  paragraph(
    'p-ru-3',
    "A public profile picture, brand logo, photo or Reel does not automatically become your property.",
  ),
  paragraph(
    'p-ru-4',
    "If you want to republish, commercially reuse or impersonate another account's content or branding, separate copyright, trademark and personality-right issues may apply. A viewer gives you visibility, not ownership.",
  ),

  heading('h-scrape', 'Can You Scrape Entire Instagram Profiles?', 2),
  paragraph(
    'p-sc-1',
    'That should not be the positioning of this tool.',
  ),
  paragraph(
    'p-sc-2',
    'NovaLikes is not offering bulk surveillance, mass profile archiving, full follower scraping or private data collection.',
  ),
  paragraph(
    'p-sc-3',
    'The tool should remain: user submits a supported public username, then the tool returns supported public information. Clear purpose. Clear limits.',
  ),

  heading(
    'h-down',
    'What If the Profile Viewer Stops Working Temporarily?',
    2,
  ),
  paragraph(
    'p-dw-1',
    'Instagram can change its public web behaviour.',
  ),
  paragraph(
    'p-dw-2',
    'If the tool relies on public information that Instagram stops exposing in the same way, extraction may temporarily fail.',
  ),
  paragraph(
    'p-dw-3',
    'Correct behaviour: show an error and fix the extractor. Incorrect behaviour: invent profile information just to avoid showing failure.',
  ),
  paragraph(
    'p-dw-4',
    'Reliability does not mean pretending every request succeeded.',
  ),

  heading(
    'h-unavailable',
    'Why Might Public Information Be Unavailable?',
    2,
  ),
  paragraph('p-ua-1', 'Possible reasons include:'),
  bullets('ul-unavailable', [
    'the username is incorrect,',
    'the profile was removed,',
    'the account changed usernames,',
    'Instagram changed its page response,',
    'the request was temporarily blocked,',
    'or the expected public data was not exposed.',
  ]),
  paragraph(
    'p-ua-2',
    'A good tool distinguishes profile not found from public data unavailable where possible.',
  ),
  paragraph(
    'p-ua-3',
    'Do not turn every failure into private account detected. That may be wrong.',
  ),

  heading(
    'h-instead',
    'Should You Use a Profile Viewer Instead of Instagram?',
    2,
  ),
  paragraph(
    'p-is-1',
    'Not necessarily.',
  ),
  paragraph(
    'p-is-2',
    "If Instagram's public web profile gives you exactly what you need, use Instagram.",
  ),
  paragraph(
    'p-is-3',
    'NovaLikes is useful when you want a focused utility without navigating the broader Instagram interface.',
  ),
  paragraph(
    'p-is-4',
    'This is the same philosophy as the other NovaLikes tools: solve one specific task clearly. It does not need to replace Instagram itself.',
  ),

  heading(
    'h-useful',
    'When Is the Instagram Profile Viewer Most Useful?',
    2,
  ),
  paragraph(
    'p-uf-1',
    'Typical legitimate uses include:',
  ),
  bullets('ul-useful', [
    'checking whether you found the correct public brand profile,',
    'reviewing public bio information,',
    "checking an account's public profile presentation,",
    'viewing supported public profile information without signing into Instagram,',
    'confirming a username,',
    'or doing basic public-profile research.',
  ]),
  paragraph(
    'p-uf-2',
    'The tool is not for accessing private posts, reading DMs, unlocking Stories, bypassing blocks or retrieving hidden data.',
  ),

  heading(
    'h-simple',
    'How to View a Public Instagram Profile Without Logging In: Simple Version',
    2,
  ),
  paragraph('p-si-1', 'Use this workflow:'),
  numbered('ol-simple', [
    'Find the Instagram username.',
    'Open the NovaLikes Instagram Profile Viewer.',
    'Enter the username or public profile URL.',
    'Check the public profile information.',
    'Review the available result.',
  ]),
  paragraph(
    'p-si-2',
    'No Instagram password is required.',
  ),
  paragraph(
    'p-si-3',
    'For public accounts, Instagram itself also allows web visibility of profiles and public posts through the account URL. (Facebook)',
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-si-4',
    'Meta also says several basic profile fields remain public to people on or off Instagram. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-si-5',
    'The key boundary is public information only. If an account has restricted content through privacy settings, a profile viewer should not attempt to override those settings.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Meta says certain Instagram profile information is public to everyone on or off Instagram, including people without an Instagram account.',
    'Public profile information includes name, username, profile picture, bio, links and the number of followers and following.',
    'For a public Instagram account, Meta says anyone can see the profile and public posts through its Instagram web URL.',
    'Making an Instagram account private restricts access to posts, Reels and Stories; it does not make every basic profile field invisible.',
    'Public Instagram profiles and content can be embedded on external websites when embedding is enabled.',
    'A public Profile Viewer should not claim to unlock private posts, Stories, DMs or restricted follower lists.',
    'NovaLikes does not require an Instagram password for its public-profile lookup workflow.',
    'Profile viewing, profile-picture viewing, follower counting and video downloading are different search intents and should remain separate tools.',
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
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const VIEW_INSTAGRAM_PROFILE_WITHOUT_LOGIN_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-view-instagram-profile-without-login',
  slug: SLUG,
  title: 'How to View a Public Instagram Profile Without Logging In',
  excerpt:
    'Sometimes you simply want to check publicly available information about a public Instagram profile without creating an account or signing in.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['creator', 'business', 'analytics'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'How to View a Public Instagram Profile Without Logging In',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
  seo: {
    title: 'View a Public Instagram Profile Without Logging In',
    description:
      'Learn how to view available public Instagram profile information without logging in, what stays public, and what you cannot access on private accounts.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'view Instagram profile without login',
      'Instagram profile viewer',
      'view Instagram without account',
      'Instagram viewer without login',
      'public Instagram profile viewer',
      'see Instagram profile anonymously',
    ],
  },
  relatedServices: [],
  relatedArticles: [
    'public-vs-private-instagram-account',
    'view-instagram-profile-picture-full-size',
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
    'A public Instagram profile and its public posts can be viewed through the account web URL',
    'Name, username, profile picture, bio, links and follower or following numbers are public profile information',
    'Private-account posts, Reels and Stories stay restricted',
    'NovaLikes checks publicly available profile information the tool supports',
    'No Instagram password is required for the public-profile viewing workflow',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Can I view an Instagram profile without logging in?',
      answer:
        "Certain Instagram profile information is public even to people who aren't logged into Instagram. Meta says information such as username, profile picture, bio, links and follower or following numbers is public on or off Instagram.",
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can I view a public Instagram account without an account?',
      answer:
        "Meta says anyone can view a public Instagram profile and its public posts through the profile's web URL. The exact unauthenticated Instagram web experience can change, but the profile itself is public.",
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I view a private Instagram profile without following it?',
      answer:
        'Meta classifies some basic profile fields as public even on private accounts, but private-account content remains restricted. The NovaLikes Profile Viewer currently checks public profiles Instagram already exposes, and a private or login-gated lookup can return an error.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can an Instagram Profile Viewer show private posts?',
      answer:
        "No. NovaLikes should not be presented as a private-content bypass. Private-account content remains subject to Instagram's privacy settings.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do I need an Instagram password to use NovaLikes Profile Viewer?',
      answer:
        'No. The NovaLikes public-profile workflow does not require your Instagram password.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: "Can I see a private account's profile picture?",
      answer:
        'Meta lists profile pictures among information that remains public even when an account is private. A lookup still only succeeds when Instagram exposes usable public data.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: "Can I check a private account's follower count?",
      answer:
        'Meta lists the number of followers and following as public profile information. This does not mean the full follower list is publicly accessible.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Does Instagram notify someone when I view their public profile?',
      answer:
        "Meta's public profile-information guidance does not describe ordinary profile viewing as an action that sends a profile-visitor notification. NovaLikes should still avoid making an absolute untraceable promise.",
      schemaEligible: true,
    },
    {
      id: 'faq-9',
      question: 'Can I view Instagram Reels without logging in?',
      answer:
        "Public Reels can form part of Instagram's public web content, and Meta allows public Reels to be embedded when embedding is enabled. However, Instagram's no-login web experience can vary, so don't treat every Reel as guaranteed to play without an account.",
      schemaEligible: true,
    },
    {
      id: 'faq-10',
      question: 'Can the Profile Viewer show deleted Instagram profiles?',
      answer:
        'No historical or deleted-profile recovery should be promised. If the current public profile is unavailable, the tool should return an error.',
      schemaEligible: true,
    },
  ],
};
