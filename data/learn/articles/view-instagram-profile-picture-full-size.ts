/**
 * Article #20 — How to View an Instagram Profile Picture in Full Size
 * Scheduled: Wednesday 7 October 2026.
 * Utility / tool intent. Distinct from Instagram follower packages.
 * Primary CTA: /tools/instagram-profile-picture-viewer
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'view-instagram-profile-picture-full-size';
const SCHEDULED_AT = '2026-10-07T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;
const TOOL_HREF = '/tools/instagram-profile-picture-viewer';

const IG_PUBLIC_PROFILE_INFO =
  'https://www.facebook.com/help/instagram/347751748650214';
const IG_WEB_PROFILE =
  'https://www.facebook.com/help/instagram/365041933611384';
const IG_CHANGE_PROFILE_PICTURE =
  'https://www.facebook.com/help/instagram/557544397610546';
const IG_PROFESSIONAL_ACCOUNTS =
  'https://www.facebook.com/help/instagram/138925576505882';
const IG_SYNC_PROFILE =
  'https://www.facebook.com/help/instagram/451345223552070';

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
    'Instagram profile pictures are often displayed as relatively small circular images inside the app.',
  ),
  paragraph(
    'p-open-2',
    'That can be inconvenient when you want to recognize an account, check whether you found the correct profile, see a logo more clearly, or simply view the profile image without the small circular presentation.',
  ),
  paragraph(
    'p-open-3',
    'The first thing to understand is that an Instagram profile picture is different from the photos and videos someone publishes as posts.',
  ),
  paragraph(
    'p-open-4',
    'Meta currently says certain Instagram profile information is always public, whether the account itself is public or private.',
  ),
  paragraph('p-open-5', 'That includes:'),
  bullets('ul-open-public', [
    'name',
    'username',
    'profile picture',
    'bio',
    'links',
    'and follower/following counts.',
  ]),
  paragraph(
    'p-open-6',
    'Meta lists those items among the profile information anyone can see. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-7',
    'So making an Instagram account private does not make its profile picture private in the same way it restricts its posts.',
  ),
  paragraph(
    'p-open-8',
    "That distinction is important if you're using a profile picture viewer.",
  ),
  paragraph(
    'p-open-9',
    'The important distinction: a private account is not the same thing as a private profile picture.',
  ),

  heading('h-small', 'Why Are Instagram Profile Pictures So Small?', 2),
  paragraph(
    'p-sm-1',
    'Instagram uses profile pictures primarily as identity markers.',
  ),
  paragraph('p-sm-2', 'You see them:'),
  bullets('ul-sm', [
    'next to posts,',
    'beside comments,',
    'in Stories,',
    'in messages,',
    'and at the top of profiles.',
  ]),
  paragraph(
    'p-sm-3',
    'In many of those places, the image is displayed as a small circular thumbnail rather than as a normal photo gallery item.',
  ),
  paragraph(
    'p-sm-4',
    "Instagram's official Help Center provides controls for adding or changing a profile picture through Edit Profile or Accounts Center. (Facebook)",
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sm-5',
    'But a profile picture is not presented in the same way as a standard Feed photo.',
  ),
  paragraph(
    'p-sm-6',
    "That's why users often look for a simpler way to inspect the available image at a larger size.",
  ),
  figure(
    'fig-vs',
    `${IMAGE_DIR}/profile-picture-vs-post.png`,
    'Instagram profile pictures are public identity markers, while Feed posts can follow account privacy rules',
    'A profile picture and a private Instagram post do not follow the same visibility rules.',
  ),

  heading(
    'h-can',
    'Can You View an Instagram Profile Picture in Full Size?',
    2,
  ),
  paragraph(
    'p-can-1',
    'You can view the available profile-picture image at a larger presentation using a profile-picture viewing tool when the image is publicly retrievable.',
  ),
  paragraph(
    'p-can-2',
    'The Instagram Profile Picture Viewer lets you enter an Instagram username and view the profile-picture media that is publicly available for that profile.',
    [{ href: TOOL_HREF, label: 'Instagram Profile Picture Viewer' }],
  ),
  paragraph(
    'p-can-3',
    "This is particularly useful when Instagram's ordinary interface displays the image too small for what you need.",
  ),
  paragraph(
    'p-can-4',
    'Keep one limitation in mind: full size means the image version that is actually available from the profile or media source.',
  ),
  paragraph(
    'p-can-5',
    'A viewer cannot manufacture image detail that never existed in the original uploaded or available image.',
  ),
  paragraph(
    'p-can-6',
    'Do not expect 4K enhancement, an original camera file or unlimited-resolution recovery unless those things actually exist.',
  ),

  heading(
    'h-how',
    'How to View an Instagram Profile Picture With NovaLikes',
    2,
  ),
  paragraph('p-how-1', 'The process is simple.'),
  heading('h-how-1', 'Step 1: Open the Instagram Profile Picture Viewer', 3),
  paragraph(
    'p-how-2',
    'Open the Instagram Profile Picture Viewer on NovaLikes.',
  ),
  heading('h-how-2', 'Step 2: Enter the Instagram Username', 3),
  paragraph(
    'p-how-3',
    'Enter the profile username you want to check.',
  ),
  paragraph(
    'p-how-4',
    'For example: instagram or nasa.',
  ),
  paragraph(
    'p-how-5',
    'Use the username rather than guessing from a display name.',
  ),
  paragraph(
    'p-how-6',
    'The current NovaLikes field also accepts a profile URL, with or without an @ on the username.',
  ),
  heading('h-how-3', 'Step 3: Start the Search', 3),
  paragraph(
    'p-how-7',
    'Submit the username.',
  ),
  paragraph(
    'p-how-8',
    'The tool checks the publicly available profile information for that account.',
  ),
  heading('h-how-4', 'Step 4: View the Profile Picture', 3),
  paragraph(
    'p-how-9',
    'If the profile picture is available, the tool displays it in a larger, easier-to-view format.',
  ),
  paragraph(
    'p-how-10',
    'No Instagram password should be required for this workflow.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/how-viewer-works.png`,
    'How the Instagram Profile Picture Viewer works: enter a username, find the public profile, then view the larger picture',
    'No Instagram password required.',
  ),

  heading(
    'h-need-account',
    'Do You Need an Instagram Account to View a Profile Picture?',
    2,
  ),
  paragraph(
    'p-na-1',
    'Meta says certain profile information is public to everyone on or off Instagram, even if they do not have an Instagram account. That public information includes the profile picture. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-na-2',
    'That means the profile picture itself should not be confused with account-only private post content.',
  ),
  paragraph(
    'p-na-3',
    'However, Instagram can change web behaviour, rate limits, login prompts and public page presentation.',
  ),
  paragraph(
    'p-na-4',
    'A third-party viewer should therefore be understood as a convenience interface around publicly accessible profile information, not as a way of bypassing private Instagram content.',
  ),

  heading(
    'h-private-pic',
    "Can You See a Private Instagram Account's Profile Picture?",
    2,
  ),
  paragraph(
    'p-pp-1',
    'Meta explicitly says certain profile information is always public for both public and private Instagram accounts, including the profile picture. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pp-2',
    'What changes with a private account is access to its posts and other restricted content.',
  ),
  paragraph(
    'p-pp-3',
    'Meta says private-account profiles and posts on the web are available to logged-in Instagram users whom the account owner has approved to follow them. (Facebook)',
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pp-4',
    'Our guide on public vs private Instagram accounts covers that post-visibility difference in more detail.',
    [
      {
        href: '/learn/public-vs-private-instagram-account',
        label: 'public vs private Instagram accounts',
      },
    ],
  ),
  paragraph(
    'p-pp-5',
    'So the profile picture belongs to public profile information, while posts on a private account remain restricted to approved followers.',
  ),
  paragraph(
    'p-pp-6',
    'The NovaLikes viewer can display that picture only when Instagram actually exposes usable profile-picture media for the lookup. If Instagram does not expose it, the tool returns an error rather than bypassing private posts.',
  ),

  heading(
    'h-private-posts',
    'Can You View Private Instagram Posts With a Profile Picture Viewer?',
    2,
  ),
  paragraph('p-po-1', 'No.'),
  paragraph(
    'p-po-2',
    'A profile-picture viewer should not be described as a private-account bypass.',
  ),
  paragraph(
    'p-po-3',
    "Instagram's privacy rules restrict private-account posts to approved followers. (Facebook)",
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-po-4',
    'A legitimate profile-picture tool should not claim to unlock private photos, see private posts anonymously, bypass Instagram privacy or access hidden Stories just because the profile picture itself is public.',
  ),
  paragraph(
    'p-po-5',
    "NovaLikes' Instagram Profile Picture Viewer is for the profile picture, not private post access.",
  ),

  heading(
    'h-table',
    'Profile Picture Visibility vs Post Visibility',
    2,
  ),
  paragraph(
    'p-tb-1',
    'This is the main concept users need to understand.',
  ),
  {
    id: 'table-visibility',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Instagram Element', 'Public or private behaviour'],
    rows: [
      ['Profile picture', 'Public profile information'],
      ['Username', 'Public profile information'],
      ['Name', 'Public profile information'],
      ['Bio', 'Public profile information'],
      ['Private-account posts', 'Approved followers'],
      ['Public-account posts', 'Publicly accessible'],
    ],
  },
  paragraph(
    'p-tb-2',
    'Meta specifically lists profile pictures among information anyone can see, while account privacy separately controls access to private posts. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-tb-3',
    "That is why a profile-picture viewer can work without needing access to somebody's private post library.",
  ),

  heading(
    'h-hide',
    'Does Making Instagram Private Hide Your Profile Picture?',
    2,
  ),
  paragraph('p-hi-1', 'No.'),
  paragraph(
    'p-hi-2',
    'This is one of the most common misunderstandings.',
  ),
  paragraph(
    'p-hi-3',
    'Meta says profile pictures remain part of the information that anyone can see, including for private accounts. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hi-4',
    'Making your account private primarily changes who can see your posts and other protected account content.',
  ),
  paragraph(
    'p-hi-5',
    'If your privacy concern is that you do not want strangers seeing this particular profile image, the better solution is to change the profile picture itself rather than assuming a private account hides it.',
  ),
  paragraph(
    'p-hi-6',
    'Instagram lets users change their profile picture through Edit Profile or Accounts Center. (Facebook)',
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Facebook', external: true }],
  ),
  figure(
    'fig-private',
    `${IMAGE_DIR}/private-account-does-not-hide-everything.png`,
    'A private Instagram account still has public profile information such as username, name, profile picture and bio, while posts stay restricted',
    'Account privacy restricts content, but some profile information remains public.',
  ),

  heading(
    'h-follow',
    'Can Someone See Your Instagram Profile Picture Without Following You?',
    2,
  ),
  paragraph(
    'p-fl-1',
    'Yes. Because Meta categorizes profile pictures as profile information that anyone can see, following the account is not required simply to see that profile picture. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fl-2',
    'This remains true even when the account is private.',
  ),
  paragraph(
    'p-fl-3',
    'A follow approval is required for restricted private content, not for every piece of basic profile information.',
  ),

  heading(
    'h-login',
    'Can Someone See Your Instagram Profile Picture Without Logging In?',
    2,
  ),
  paragraph(
    'p-lg-1',
    "Meta's current Help Center says certain profile information is public to everyone on or off Instagram, including people who do not have an Instagram account. Profile picture is included in that list. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lg-2',
    'This does not mean Instagram guarantees the same website interface to every visitor at all times.',
  ),
  paragraph(
    'p-lg-3',
    'Instagram can still show login prompts, change its web experience or restrict certain interactions.',
  ),
  paragraph(
    'p-lg-4',
    'But the privacy classification of the profile picture itself is public.',
  ),

  heading(
    'h-old',
    "Can You View Someone's Old Instagram Profile Pictures?",
    2,
  ),
  paragraph(
    'p-old-1',
    'A standard current-profile-picture viewer should not be described as an archive.',
  ),
  paragraph(
    'p-old-2',
    'The tool retrieves the current available profile picture.',
  ),
  paragraph(
    'p-old-3',
    'Do not expect access to previous profile photos, deleted images, old avatars or profile-picture history unless the tool actually stores or obtains that information through a legitimate source.',
  ),
  paragraph(
    'p-old-4',
    'NovaLikes does not create an archive of historical Instagram profile pictures for this tool.',
  ),
  paragraph(
    'p-old-5',
    'Keep its purpose simple: view the current publicly available profile picture.',
  ),

  heading(
    'h-deleted',
    'Can You View a Deleted Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-del-1',
    'If an account or image is no longer publicly available, a normal current-profile viewer cannot guarantee recovery.',
  ),
  paragraph(
    'p-del-2',
    'The tool should not be treated as a deleted-content recovery service, an Instagram archive or a forensic image-retrieval tool.',
  ),
  paragraph(
    'p-del-3',
    'It works with what is presently available from the public profile.',
  ),

  heading(
    'h-original',
    'Can You View the Original Uploaded Instagram Profile Photo?',
    2,
  ),
  paragraph(
    'p-or-1',
    'Be careful with the word original.',
  ),
  paragraph(
    'p-or-2',
    "Instagram users can upload a profile photo, and Instagram may process that image for its own platform use. Meta's official profile-picture documentation explains how users upload or change the profile photo but does not promise third parties access to the creator's untouched original camera file. (Facebook)",
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-or-3',
    'So use available profile picture or larger profile picture rather than promising the exact untouched original file.',
  ),
  paragraph('p-or-4', 'That is more accurate.'),

  heading('h-blurry', 'Why Does the Profile Picture Look Blurry?', 2),
  paragraph(
    'p-bl-1',
    'Several things can affect perceived image quality.',
  ),
  paragraph(
    'p-bl-2',
    'The user may have uploaded a small image, a heavily compressed image, a cropped image or an image containing very fine detail that does not display well as a profile thumbnail.',
  ),
  paragraph(
    'p-bl-3',
    'Instagram also presents profile pictures at relatively small sizes throughout much of the product.',
  ),
  paragraph(
    'p-bl-4',
    'A larger viewer can make the available image easier to inspect.',
  ),
  paragraph(
    'p-bl-5',
    'It cannot recreate missing detail that was never present in the available image.',
  ),
  paragraph(
    'p-bl-6',
    'Do not expect AI-enhanced original quality unless a separate enhancement process is actually being used. This viewer does not invent missing pixels.',
  ),

  heading('h-zoom', 'Can You Zoom an Instagram Profile Picture?', 2),
  paragraph(
    'p-zo-1',
    "Instagram's ordinary profile presentation is designed around the profile avatar rather than a traditional image-gallery experience.",
  ),
  paragraph(
    'p-zo-2',
    'A profile-picture viewer solves this more cleanly by presenting the available profile image separately so it can be viewed more comfortably.',
  ),
  paragraph(
    'p-zo-3',
    'This is also better than taking a screenshot of a tiny avatar and enlarging the screenshot.',
  ),
  paragraph(
    'p-zo-4',
    'Enlarging a small screenshot does not restore missing detail.',
  ),

  heading('h-screenshot', 'Screenshot vs Profile Picture Viewer', 2),
  paragraph(
    'p-ss-1',
    'Suppose the profile picture appears as a 100-pixel-looking circle on your screen.',
  ),
  paragraph(
    'p-ss-2',
    'You could take a screenshot, crop it, then enlarge it.',
  ),
  paragraph(
    'p-ss-3',
    "But you're enlarging the pixels already displayed on the screen.",
  ),
  paragraph(
    'p-ss-4',
    'A profile-picture viewer instead attempts to use the available profile-image source rather than merely magnifying your screenshot.',
  ),
  paragraph(
    'p-ss-5',
    'That can produce a much more useful result when a larger available version exists.',
  ),
  paragraph(
    'p-ss-6',
    'Again: a larger available image is not magically restored original camera quality.',
  ),

  heading(
    'h-why',
    'Why Would Someone Need to View a Profile Picture Larger?',
    2,
  ),
  paragraph(
    'p-wh-1',
    'There are several legitimate reasons.',
  ),
  heading('h-wh-confirm', 'Confirming an Account', 3),
  paragraph(
    'p-wh-2',
    'You may be trying to determine which similarly named profile belongs to a business, creator, friend or organization.',
  ),
  heading('h-wh-logo', 'Viewing a Business Logo', 3),
  paragraph(
    'p-wh-3',
    "Company profile logos can be difficult to inspect inside Instagram's small circular avatar.",
  ),
  heading('h-wh-brand', 'Checking Branding', 3),
  paragraph(
    'p-wh-4',
    'A social media manager may want to review logo clarity, cropping or visual consistency.',
  ),
  heading('h-wh-access', 'Accessibility', 3),
  paragraph(
    'p-wh-5',
    'A larger image may simply be easier to see.',
  ),
  heading('h-wh-research', 'Researching a Public Brand Profile', 3),
  paragraph(
    'p-wh-6',
    'Profile imagery can help distinguish official and unofficial accounts.',
  ),
  paragraph(
    'p-wh-7',
    'The important condition is to use public information responsibly.',
  ),

  heading(
    'h-download',
    'Can You Download an Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-dl-1',
    'When Instagram exposes the public image, the NovaLikes viewer can offer a download of that available file.',
  ),
  paragraph(
    'p-dl-2',
    'But viewing or downloading a publicly visible image does not transfer ownership or usage rights.',
  ),
  paragraph(
    'p-dl-3',
    'Do not assume publicly visible means free to reuse commercially.',
  ),
  paragraph(
    'p-dl-4',
    'Copyright, publicity, trademark and other rights can still apply depending on the image and intended use.',
  ),
  paragraph(
    'p-dl-5',
    'For ordinary identification or viewing, that distinction may not matter.',
  ),
  paragraph(
    'p-dl-6',
    'For republishing, consider whether you have permission.',
  ),

  heading(
    'h-anon',
    'Is It Anonymous to View an Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-an-1',
    'Do not make an absolute privacy promise such as completely anonymous and impossible for anyone to know.',
  ),
  paragraph(
    'p-an-2',
    "The profile-picture viewer does not need to log into the target person's account or interact with their private content simply to retrieve publicly available profile information.",
  ),
  paragraph(
    'p-an-3',
    'But websites still operate normal infrastructure such as network requests, server logs, security controls and rate limiting.',
  ),
  paragraph(
    'p-an-4',
    'So the safe product wording is: no Instagram login is required for the profile-picture viewing workflow.',
  ),
  paragraph(
    'p-an-5',
    'Not: completely untraceable forever.',
  ),

  heading(
    'h-notify',
    'Does Instagram Notify Someone When You View Their Profile Picture?',
    2,
  ),
  paragraph(
    'p-nt-1',
    "Instagram's Help Center documents profile information as publicly viewable and does not describe ordinary profile-picture viewing as an interactive notification action in the way features such as following or commenting are interactive actions. (Facebook)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nt-2',
    'However, do not oversell this as Instagram can never know anything about profile visits.',
  ),
  paragraph(
    'p-nt-3',
    'Instagram has various account and interaction systems that can evolve.',
  ),
  paragraph(
    'p-nt-4',
    'For NovaLikes, the more defensible statement is that the tool does not require you to follow, message or interact with the target profile simply to view the available profile picture.',
  ),

  heading(
    'h-request',
    'Does Viewing a Profile Picture Send a Follow Request?',
    2,
  ),
  paragraph('p-rq-1', 'No.'),
  paragraph(
    'p-rq-2',
    'Viewing public profile information and requesting to follow a private account are separate actions.',
  ),
  paragraph(
    'p-rq-3',
    'A follow request requires an explicit follow action.',
  ),
  paragraph(
    'p-rq-4',
    'A profile-picture viewer should not follow the user, Like content, send a message or change anything on their account.',
  ),
  paragraph('p-rq-5', 'The tool should remain read-only.'),

  heading(
    'h-approve',
    'Does the Profile Owner Need to Approve You?',
    2,
  ),
  paragraph(
    'p-ap-1',
    'Not for the profile picture itself.',
  ),
  paragraph(
    'p-ap-2',
    'Meta says the profile picture belongs to Instagram information that anyone can see. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ap-3',
    'Approval becomes relevant when trying to access private-account content that Instagram restricts to approved followers. (Facebook)',
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ap-4',
    'So the profile picture does not require follower approval, while private posts do.',
  ),

  heading(
    'h-business',
    'Does the Tool Work for Business Instagram Accounts?',
    2,
  ),
  paragraph(
    'p-bs-1',
    'If a public Instagram business or professional profile exposes a standard profile picture, that profile picture can be handled like other publicly visible profile-picture information.',
  ),
  paragraph(
    'p-bs-2',
    'Instagram professional accounts also display public-facing profile information and can include additional professional features. Meta documents professional accounts separately, including their public-facing category information. (Facebook)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-bs-3',
    'This makes the viewer useful for logos, brand avatars, creator headshots and other public profile images.',
  ),

  heading(
    'h-tool-private',
    'Does the Tool Work for Private Instagram Accounts?',
    2,
  ),
  paragraph(
    'p-tp-1',
    'The key factor is whether the profile picture itself is publicly available, not whether the post library is private.',
  ),
  paragraph(
    'p-tp-2',
    'Meta explicitly says profile pictures are part of public profile information for public and private accounts. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-tp-3',
    'The NovaLikes lookup still depends on Instagram exposing usable media. Private, hidden or login-gated profiles can return an error instead of an image.',
  ),
  paragraph(
    'p-tp-4',
    'If Instagram does not expose usable media for a particular request at that moment, the tool should return an honest error rather than fabricate an image.',
  ),

  heading(
    'h-missing',
    'What If the Instagram Username Does Not Exist?',
    2,
  ),
  paragraph(
    'p-mi-1',
    'A viewer should return a clear error.',
  ),
  paragraph(
    'p-mi-2',
    "It should not invent a profile, show somebody else's picture or guess the closest username as though it were the requested account.",
  ),
  paragraph(
    'p-mi-3',
    'Check the spelling carefully.',
  ),
  paragraph(
    'p-mi-4',
    'Instagram usernames can look very similar.',
  ),
  paragraph(
    'p-mi-5',
    'For example, brandname and brand_name can belong to completely different accounts.',
  ),

  heading(
    'h-changed',
    'What If Someone Changed Their Username?',
    2,
  ),
  paragraph(
    'p-ch-1',
    "Use the account's current username.",
  ),
  paragraph(
    'p-ch-2',
    'A profile-picture viewer is not meant to be a historical username lookup service.',
  ),
  paragraph(
    'p-ch-3',
    'If you enter an old username that no longer resolves to the account, the tool may be unable to find the profile.',
  ),
  paragraph('p-ch-4', 'Find the current profile first.'),
  paragraph(
    'p-ch-5',
    'Then enter its current username.',
  ),

  heading('h-username', 'Username vs Display Name', 2),
  paragraph('p-un-1', 'These are different.'),
  heading('h-un-display', 'Display Name', 3),
  paragraph(
    'p-un-2',
    'Can be something like NovaLikes Social.',
  ),
  heading('h-un-user', 'Username', 3),
  paragraph(
    'p-un-3',
    'Could be novalikes.',
  ),
  paragraph(
    'p-un-4',
    'The username identifies the profile URL and account more precisely.',
  ),
  paragraph(
    'p-un-5',
    'For a profile viewer, use the username.',
  ),
  paragraph(
    'p-un-6',
    'Do not rely on the display name because many accounts can use similar or identical names.',
  ),

  heading(
    'h-always-public',
    'What Profile Information Is Always Public on Instagram?',
    2,
  ),
  paragraph(
    'p-al-1',
    'Meta currently lists several items as information anyone can see.',
  ),
  paragraph('p-al-2', 'These include:'),
  bullets('ul-al', [
    'name',
    'username',
    'profile picture',
    'bio',
    'links',
    'follower count',
    'following count',
    'Threads username in applicable cases',
    'and channels someone has created or joined, where applicable.',
  ]),
  paragraph(
    'p-al-3',
    'Meta includes those items in the public-profile list. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-al-4',
    'That applies even when the account is private.',
  ),
  paragraph(
    'p-al-5',
    'This does not make private posts public.',
  ),
  paragraph(
    'p-al-6',
    'It means Instagram maintains a public profile layer around the account.',
  ),

  heading(
    'h-not-everything',
    'Public Profile Information Does Not Mean Everything Is Public',
    2,
  ),
  paragraph(
    'p-ne-1',
    'This distinction is essential.',
  ),
  paragraph(
    'p-ne-2',
    "If an Instagram account is private, its private content remains restricted according to Instagram's privacy rules. Meta says private profiles and posts on the web are visible to logged-in users approved to follow the account. (Facebook)",
    [{ href: IG_WEB_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ne-3',
    "Therefore a public profile picture does not imply public private-account Reels, public private posts, public Stories or permission to bypass the account's follower controls.",
  ),
  paragraph(
    'p-ne-4',
    'A legitimate tool should stay within the public profile layer.',
  ),

  heading(
    'h-vs-viewer',
    'Profile Picture Viewer vs Instagram Profile Viewer',
    2,
  ),
  paragraph(
    'p-vv-1',
    'NovaLikes has separate tool concepts because they answer different questions.',
  ),
  heading('h-vv-pic', 'Instagram Profile Picture Viewer', 3),
  paragraph('p-vv-2', 'Focus: view the profile picture.'),
  heading('h-vv-prof', 'Instagram Profile Viewer', 3),
  paragraph(
    'p-vv-3',
    'Focus: review publicly available profile information.',
    [
      {
        href: '/tools/instagram-profile-viewer',
        label: 'Instagram Profile Viewer',
      },
    ],
  ),
  paragraph(
    'p-vv-4',
    'Do not combine every function into one page just because both tools start with an Instagram username.',
  ),
  paragraph(
    'p-vv-5',
    'Separate search intent is useful for users and SEO.',
  ),

  heading(
    'h-vs-counter',
    'Profile Picture Viewer vs Instagram Follower Counter',
    2,
  ),
  paragraph(
    'p-vc-1',
    'These also serve different purposes.',
  ),
  heading('h-vc-pic', 'Profile Picture Viewer', 3),
  paragraph('p-vc-2', 'Visual identity.'),
  heading('h-vc-count', 'Follower Counter', 3),
  paragraph('p-vc-3', 'Public follower-count information.'),
  paragraph(
    'p-vc-4',
    "A person who wants to know how many followers an account shows has a different task from someone who wants to see this account's profile photo larger.",
  ),
  paragraph(
    'p-vc-5',
    'Keep those jobs on separate tools rather than turning this article into a tool directory.',
  ),

  heading('h-cta-section', 'View an Instagram Profile Picture', 2),
  paragraph(
    'p-ct-1',
    'This article has strong direct tool intent, so the next step is the free viewer rather than a follower package.',
  ),
  {
    id: 'cta-profile-picture-viewer',
    type: 'internal_cta',
    order: nextOrder(),
    href: TOOL_HREF,
    heading: 'View an Instagram Profile Picture',
    description:
      'Enter an Instagram username to view the profile picture available from its public profile information. No Instagram password is required.',
    label: 'Open Profile Picture Viewer',
  },

  heading(
    'h-free',
    'Is the Instagram Profile Picture Viewer Free?',
    2,
  ),
  paragraph(
    'p-fr-1',
    "NovaLikes' profile-picture viewer is part of the site's free tools.",
  ),
  paragraph(
    'p-fr-2',
    'There is no free trial, credit pack, premium unlock or API key required for the normal web workflow.',
  ),
  paragraph(
    'p-fr-3',
    'The tool remains aligned with the existing self-hosted NovaLikes tools system.',
  ),

  heading('h-api', 'Do You Need an API Key?', 2),
  paragraph(
    'p-ak-1',
    'No user-facing API key should be needed to use the tool.',
  ),
  paragraph(
    'p-ak-2',
    'The user simply enters the supported public-profile identifier into the interface.',
  ),
  paragraph(
    'p-ak-3',
    'Do not expect to need RapidAPI, Meta developer access, Instagram credentials or a browser extension.',
  ),
  paragraph(
    'p-ak-4',
    'The experience should remain simple.',
  ),

  heading('h-install', 'Do You Need to Install Anything?', 2),
  paragraph(
    'p-is-1',
    'No separate browser extension or desktop program should be necessary for the normal NovaLikes web tool.',
  ),
  paragraph('p-is-2', 'Open the tool.'),
  paragraph('p-is-3', 'Enter the username.'),
  paragraph('p-is-4', 'View the result.'),
  paragraph(
    'p-is-5',
    'That simplicity should be one of the main usability benefits.',
  ),

  heading(
    'h-password',
    'Should You Log In With Your Instagram Password?',
    2,
  ),
  paragraph('p-pw-1', 'Not for this use case.'),
  paragraph(
    'p-pw-2',
    "A profile-picture viewer based on publicly available profile information should not require the user's Instagram password.",
  ),
  paragraph(
    'p-pw-3',
    'Be cautious with unrelated tools that unnecessarily ask you to enter your Instagram password, provide a verification code or authorize suspicious account access just to view public profile information.',
  ),
  paragraph(
    'p-pw-4',
    'For the NovaLikes tool: no Instagram password required.',
  ),

  heading('h-mobile', 'Can You Use the Tool on Mobile?', 2),
  paragraph(
    'p-mo-1',
    'The web tool should work through the normal responsive NovaLikes interface on supported mobile browsers.',
  ),
  paragraph(
    'p-mo-2',
    'The use case is simple: copy username, open viewer, paste username, view image.',
  ),
  paragraph(
    'p-mo-3',
    'No separate mobile app is necessary.',
  ),
  paragraph(
    'p-mo-4',
    'NovaLikes does not currently advertise a dedicated iOS or Android app for this lookup.',
  ),

  heading(
    'h-find-user',
    'How to Find the Correct Instagram Username',
    2,
  ),
  paragraph(
    'p-fu-1',
    "Open the person's Instagram profile.",
  ),
  paragraph(
    'p-fu-2',
    'Look at the username associated with the account.',
  ),
  paragraph(
    'p-fu-3',
    'For example, a profile display name might be NASA while the username is nasa.',
  ),
  paragraph(
    'p-fu-4',
    'Enter nasa into the viewer.',
  ),
  paragraph(
    'p-fu-5',
    'Do not enter a random hashtag, post caption or unrelated URL unless the tool explicitly supports those formats.',
  ),

  heading(
    'h-url',
    'Can You Use an Instagram Profile URL Instead?',
    2,
  ),
  paragraph(
    'p-url-1',
    'The current NovaLikes viewer accepts a username or an Instagram profile URL.',
  ),
  paragraph(
    'p-url-2',
    'That includes usernames with or without @, and Instagram profile addresses.',
  ),
  paragraph(
    'p-url-3',
    'It is still a profile lookup, not a post or Stories downloader.',
  ),
  paragraph(
    'p-url-4',
    'Do not paste a post URL or Reel URL expecting the tool to open that post.',
  ),

  heading(
    'h-count',
    "Does Profile-Picture Viewing Affect the Account's Follower Count?",
    2,
  ),
  paragraph('p-cn-1', 'No.'),
  paragraph(
    'p-cn-2',
    'Viewing publicly available profile information does not itself create a follower.',
  ),
  paragraph(
    'p-cn-3',
    'Likewise, it does not unfollow, Like, comment or modify the profile.',
  ),
  paragraph(
    'p-cn-4',
    'The viewer is a utility tool.',
  ),
  paragraph(
    'p-cn-5',
    "It should not be confused with NovaLikes' separate Instagram follower packages.",
  ),

  heading(
    'h-growth',
    'Does It Help You Gain Instagram Followers?',
    2,
  ),
  paragraph(
    'p-gr-1',
    'No direct growth promise should be made.',
  ),
  paragraph(
    'p-gr-2',
    'Viewing a profile picture is a utility function.',
  ),
  paragraph(
    'p-gr-3',
    'It does not guarantee more followers, better reach, Explore placement, Reels distribution, likes or engagement.',
  ),
  paragraph(
    'p-gr-4',
    'The tool solves one task: view the available Instagram profile picture more clearly.',
  ),
  paragraph(
    'p-gr-5',
    'Keep the positioning that simple.',
  ),

  heading(
    'h-good',
    'What Makes a Good Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-gd-1',
    "If you're viewing your own profile picture and deciding whether to replace it, remember that profile pictures are often displayed at small sizes.",
  ),
  paragraph(
    'p-gd-2',
    'That means designs generally benefit from clear subjects, simple shapes, good contrast, recognizable branding and avoiding tiny text.',
  ),
  paragraph(
    'p-gd-3',
    'For a business logo, a mark that remains recognizable inside a small circle usually works better than a detailed landscape logo squeezed into the avatar.',
  ),
  paragraph(
    'p-gd-4',
    'Instagram lets you replace the profile image through Edit Profile or Accounts Center. (Facebook)',
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-gd-5',
    'Use the profile-picture viewer to inspect how your available image looks more closely, then make branding decisions from there.',
  ),

  heading(
    'h-change',
    'How to Change Your Instagram Profile Picture',
    2,
  ),
  paragraph(
    'p-cg-1',
    "Instagram's current workflow includes:",
  ),
  numbered('ol-change', [
    'Go to your profile.',
    'Open Edit profile.',
    'Choose Edit picture or avatar.',
    'Select or upload the image you want.',
    'Save the change.',
  ]),
  paragraph(
    'p-cg-2',
    'Instagram also allows profile-picture changes through Accounts Center. (Facebook)',
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cg-3',
    'If your profile picture looks blurry or poorly cropped, uploading a better source image is usually more useful than repeatedly enlarging the existing one.',
  ),

  heading(
    'h-facebook',
    'Can Instagram Use the Same Picture as Facebook?',
    2,
  ),
  paragraph(
    'p-fb-1',
    "Meta's profile-picture documentation says Instagram can let users import the same picture they are already using for their Facebook profile when updating the Instagram profile photo. (Facebook)",
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fb-2',
    'Meta also provides profile-syncing features through Accounts Center. (Facebook)',
    [{ href: IG_SYNC_PROFILE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fb-3',
    'This can help people who want consistent branding across Meta accounts.',
  ),
  paragraph(
    'p-fb-4',
    "But syncing is optional depending on how you've configured Accounts Center.",
  ),

  heading(
    'h-search',
    'Can Search Engines See an Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-se-1',
    'Meta says certain profile information can be public on or off Instagram, and it separately explains that search engines can process publicly visible Instagram profile information under their own systems. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-se-2',
    'That does not mean every profile picture is guaranteed to appear in Google Images.',
  ),
  paragraph(
    'p-se-3',
    "Search indexing is controlled by the search engine and Instagram's current technical exposure.",
  ),
  paragraph(
    'p-se-4',
    'The safe statement is that public profile information can be accessible beyond the Instagram app.',
  ),
  paragraph(
    'p-se-5',
    'Not that every Instagram profile image is indexed by Google.',
  ),

  heading(
    'h-bypass',
    "Is Viewing Someone's Public Profile Picture a Privacy Bypass?",
    2,
  ),
  paragraph(
    'p-by-1',
    'No, not when the tool only displays profile information Instagram itself classifies as public.',
  ),
  paragraph(
    'p-by-2',
    'Meta explicitly says profile pictures are among the items anyone can see. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-by-3',
    'A privacy bypass would involve attempting to access information that the account owner has restricted, such as private posts without approval.',
  ),
  paragraph(
    'p-by-4',
    'That is not what a legitimate profile-picture viewer should do.',
  ),

  heading(
    'h-responsible',
    'Use Public Information Responsibly',
    2,
  ),
  paragraph(
    'p-rs-1',
    'Public visibility does not mean there are no boundaries.',
  ),
  paragraph(
    'p-rs-2',
    "Don't use someone else's profile photo for impersonation, deceptive accounts, harassment or misleading commercial representation.",
  ),
  paragraph(
    'p-rs-3',
    "If you're using another person's or company's image beyond simple viewing or identification, make sure your use is legitimate.",
  ),
  paragraph(
    'p-rs-4',
    'The tool exists to make a publicly visible profile image easier to view.',
  ),
  paragraph('p-rs-5', 'That is enough.'),

  heading(
    'h-simple',
    'How to View an Instagram Profile Picture in Full Size: Simple Version',
    2,
  ),
  paragraph('p-si-1', 'Use this process:'),
  bullets('ul-simple', [
    'Find the Instagram username',
    'Open the NovaLikes Instagram Profile Picture Viewer',
    'Enter the username',
    'Fetch the publicly available profile picture',
    'View the larger available image',
  ]),
  paragraph("p-si-2", "That's it."),
  paragraph(
    'p-si-3',
    "You don't need to follow the account, ask for access to private posts, provide an Instagram password or install a browser extension.",
  ),
  paragraph(
    'p-si-4',
    'And because Instagram treats the profile picture as public profile information, an account being private does not by itself hide the profile picture. (Facebook)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Facebook', external: true }],
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Instagram profile pictures are part of the profile information Meta says anyone can see, including for private accounts.',
    'Private-account posts remain restricted to approved followers; a public profile picture does not make private posts public.',
    'Instagram lets users add or change their profile picture through Edit Profile and Accounts Center.',
    'A profile-picture viewer should work with public profile information rather than claiming to bypass private Instagram content.',
    'Full size should refer to the larger image version actually available; do not promise an untouched original camera file or manufactured resolution.',
    'No Instagram password is required for the NovaLikes profile-picture viewing workflow.',
    'Viewing a profile picture does not automatically follow, Like, message or otherwise modify the target account.',
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

export const VIEW_INSTAGRAM_PROFILE_PICTURE_FULL_SIZE_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-view-instagram-profile-picture-full-size',
  slug: SLUG,
  title: 'How to View an Instagram Profile Picture in Full Size',
  excerpt:
    'Instagram profile pictures are often displayed as relatively small circular images inside the app.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['creator', 'business', 'analytics'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'How to View an Instagram Profile Picture in Full Size',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How to View an Instagram Profile Picture in Full Size',
    description:
      'Learn how Instagram profile pictures work, what stays public on private accounts, and how to view an available profile picture at a larger size.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'view Instagram profile picture full size',
      'Instagram profile picture viewer',
      'view Instagram DP',
      'Instagram profile photo full size',
      'see Instagram profile picture',
      'private Instagram profile picture',
    ],
  },
  relatedServices: [],
  relatedArticles: [
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
    "Part of the account's public profile information",
    'Private-account posts stay restricted to approved followers',
    'Public-account posts can be viewed through the Instagram profile or web experience',
    'A profile-picture viewer can show the publicly available profile image at a larger size',
    'A private account is not the same as a private profile picture',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Can I view an Instagram profile picture in full size?',
      answer:
        'You can use a profile-picture viewer to display the profile-picture image that is publicly available for an Instagram account in a larger, easier-to-view format. The available resolution depends on the image Instagram or the profile source exposes.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can I see the profile picture of a private Instagram account?',
      answer:
        'Meta says profile pictures are among the profile information anyone can see for both public and private accounts. Private posts remain restricted separately. A viewer can still only show the image if Instagram exposes usable media for that lookup.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question:
        'Does someone need to accept my follow request before I can see their profile picture?',
      answer:
        'No. The profile picture is part of public Instagram profile information. Follow approval applies to restricted private-account content.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can I view an Instagram profile picture without logging in?',
      answer:
        'Meta says certain profile information, including the profile picture, is public to people on or off Instagram, even if they do not have an Instagram account.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can an Instagram Profile Picture Viewer show private posts?',
      answer:
        'No. A legitimate profile-picture viewer should only handle the profile image and public profile information. Instagram restricts private posts to approved followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Do I need to give NovaLikes my Instagram password?',
      answer:
        'No. The NovaLikes Instagram Profile Picture Viewer uses the public profile information required for the tool and does not require your Instagram password.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: "Can I see someone's old Instagram profile pictures?",
      answer:
        'The current NovaLikes viewer should be described as viewing the current available profile picture, not as a historical archive of deleted or previous profile photos.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Why is an Instagram profile picture blurry when enlarged?',
      answer:
        'The available source image may be small, compressed or heavily cropped. Enlarging it cannot restore detail that is not present in the available image.',
      schemaEligible: true,
    },
  ],
};
