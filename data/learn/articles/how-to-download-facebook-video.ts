/**
 * Article #21 — How to Download a Public Facebook Video
 * Scheduled: Friday 9 October 2026.
 * Utility / tool intent. Distinct from Facebook follower or Like packages.
 * Primary CTA: /tools/facebook-video-downloader
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-to-download-facebook-video';
const SCHEDULED_AT = '2026-10-09T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;
const TOOL_HREF = '/tools/facebook-video-downloader';
const REELS_TOOL_HREF = '/tools/facebook-reels-downloader';

const FB_SAVE_VIDEO = 'https://www.facebook.com/help/283351151337206';
const FB_SAVE_LATER = 'https://www.facebook.com/help/516581611792218';
const FB_DOWNLOAD_REEL = 'https://www.facebook.com/help/1005944300373812';
const FB_SELECT_AUDIENCE = 'https://www.facebook.com/help/211513702214269';
const FB_CHOOSE_WHO = 'https://www.facebook.com/help/120939471321735';
const FB_CONTROL_SHARE = 'https://www.facebook.com/help/1297502253597210';
const FB_EXPORT_INFO = 'https://www.facebook.com/help/212802592074644';
const FB_SAVE_LIVE = 'https://www.facebook.com/help/248731546323140';
const FB_TERMS = 'https://www.facebook.com/help/581066165581870';
const FB_INTELLECTUAL_PROPERTY =
  'https://www.facebook.com/help/intellectual_property';
const FB_AVOID_COPYRIGHTED = 'https://www.facebook.com/help/308895412492789';
const FB_COPYRIGHT = 'https://www.facebook.com/help/1020633957973118';
const FB_GROUP_MEDIA = 'https://www.facebook.com/help/149759085093429';
const FB_CHANGE_AUDIENCE = 'https://www.facebook.com/help/233739099984085';
const FB_SAVE_STORY = 'https://www.facebook.com/help/740258937625019';
const FB_PHOTOS_VIDEOS = 'https://www.facebook.com/help/121317464722113';
const FB_COMMUNITY = 'https://www.facebook.com/help/477434105621119';
const FB_DOWNLOAD_PAGE = 'https://www.facebook.com/help/466076673571942';

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
    'Facebook makes it easy to watch videos.',
  ),
  paragraph(
    'p-open-2',
    'Saving one as an actual file on your device is a different question.',
  ),
  paragraph(
    'p-open-3',
    'When Facebook shows Save video, that usually means saving the video inside Facebook so you can find and watch it again later. Meta describes Save video and Save reel as features for viewing content later. (Facebook)',
    [{ href: FB_SAVE_LATER, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-4',
    'That is different from downloading a video file to your phone, computer, Downloads folder or another storage location.',
  ),
  paragraph(
    'p-open-5',
    'Facebook does provide direct downloading for some content you own. Meta documents downloading Reels you shared yourself and downloading your own Facebook LIVE video after the stream has ended. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-6',
    'For an ordinary public Facebook video, a downloader can be useful when Facebook exposes a downloadable media source for that public post.',
  ),
  paragraph(
    'p-open-7',
    'The Facebook Video Downloader is designed for that specific task: a public Facebook video URL, a check of the available media, the video quality Facebook exposes, and a download of the available file.',
    [{ href: TOOL_HREF, label: 'Facebook Video Downloader' }],
  ),
  paragraph(
    'p-open-8',
    'It cannot turn a private video into a public one.',
  ),
  paragraph(
    'p-open-9',
    'And it is not a way to bypass Facebook privacy.',
  ),
  paragraph(
    'p-open-10',
    'The simplest rule: publicly viewable does not mean every Facebook video is technically downloadable in every quality.',
  ),
  paragraph(
    'p-open-11',
    'Important: only download a video you own or have clear permission to use. This tool works only with media Facebook already exposes publicly for a given URL — it does not bypass privacy settings, passwords or any technical protection, and downloading a file never transfers copyright or ownership to you.',
  ),

  heading('h-public-mean', 'What Does a Public Facebook Video Mean?', 2),
  paragraph(
    'p-pm-1',
    'Facebook lets users choose who can see content through its audience selector.',
  ),
  paragraph(
    'p-pm-2',
    'Meta says that when something is shared as Public, anyone can see it, including people who are not Facebook friends and people outside Facebook. (Facebook)',
    [{ href: FB_SELECT_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pm-3',
    'Other audience options can restrict access.',
  ),
  paragraph('p-pm-4', 'For example:'),
  bullets('ul-audience', [
    'Friends limits content to friends.',
    'Only Me restricts it to the account owner.',
    'Other contextual audience controls can also apply depending on where the content is posted.',
  ]),
  paragraph(
    'p-pm-5',
    'Facebook documents those audience choices separately from the Public setting. (Facebook)',
    [{ href: FB_CHOOSE_WHO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pm-6',
    'This matters for downloading.',
  ),
  paragraph(
    'p-pm-7',
    "A public downloader only works with media that is actually publicly accessible. It cannot get around an account's audience restrictions.",
  ),
  paragraph(
    'p-pm-8',
    'Public availability is also not the same as Facebook Page reach. A public video can be seen by anyone who is allowed to open it, while reach measures how many people actually saw Page-related content. Our guide on how Facebook Page reach works explains that delivery question separately.',
    [
      {
        href: '/learn/how-facebook-page-reach-works',
        label: 'how Facebook Page reach works',
      },
    ],
  ),
  figure(
    'fig-public',
    `${IMAGE_DIR}/public-vs-restricted.png`,
    'Public Facebook videos can be viewed through a public audience, while Friends or private videos stay access-controlled',
    "A downloader should respect the video's existing Facebook audience settings.",
  ),

  heading(
    'h-how',
    'How to Download a Public Facebook Video With NovaLikes',
    2,
  ),
  paragraph('p-how-1', 'The basic process is straightforward.'),
  heading('h-how-1', 'Step 1: Find the Facebook Video', 3),
  paragraph(
    'p-how-2',
    'Open the public Facebook video you want to save.',
  ),
  paragraph(
    'p-how-3',
    'Make sure you can actually view it normally.',
  ),
  paragraph(
    'p-how-4',
    'If Facebook itself says the content is unavailable, you do not have permission, or the post is restricted, a public downloader will not get around that.',
  ),
  paragraph(
    'p-how-5',
    'Facebook audience controls determine who can see shared content. (Facebook)',
    [{ href: FB_CONTROL_SHARE, label: 'Facebook', external: true }],
  ),
  heading('h-how-2', 'Step 2: Copy the Video Link', 3),
  paragraph(
    'p-how-6',
    "Use Facebook's normal sharing or link controls to copy the URL associated with the video.",
  ),
  paragraph(
    'p-how-7',
    'NovaLikes can work with supported Facebook video URLs, including supported Facebook watch short links.',
  ),
  heading('h-how-3', 'Step 3: Open the Facebook Video Downloader', 3),
  paragraph(
    'p-how-8',
    'Open the Facebook Video Downloader on NovaLikes.',
  ),
  heading('h-how-4', 'Step 4: Paste the Facebook Video URL', 3),
  paragraph(
    'p-how-9',
    'Paste the public video link into the downloader.',
  ),
  heading('h-how-5', 'Step 5: Start the Extraction', 3),
  paragraph(
    'p-how-10',
    'The tool checks the URL and attempts to locate the media that Facebook publicly exposes for that video.',
  ),
  heading('h-how-6', 'Step 6: Choose an Available Quality', 3),
  paragraph(
    'p-how-11',
    'Depending on the source video and what Facebook exposes, the tool can return available options such as HD or SD.',
  ),
  paragraph(
    'p-how-12',
    'Not every video necessarily exposes both.',
  ),
  heading('h-how-7', 'Step 7: Download the File', 3),
  paragraph(
    'p-how-13',
    'Choose the available result you want and save the video to your device.',
  ),
  paragraph(
    'p-how-14',
    'No Facebook password should be required for this public-video workflow.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/downloader-workflow.png`,
    'How the Facebook Video Downloader works: copy a public video link, paste it into NovaLikes, check available HD or SD media, then download',
    'Public videos only. No Facebook password required.',
  ),

  heading(
    'h-save-vs',
    'What Is the Difference Between Saving and Downloading a Facebook Video?',
    2,
  ),
  paragraph(
    'p-sv-1',
    'This causes a lot of confusion.',
  ),
  heading('h-sv-save', 'Save Video', 3),
  paragraph(
    'p-sv-2',
    "Facebook's built-in Save video function stores the video in your saved Facebook content so you can return to it later. Meta specifically describes saving Reels and videos as a way to view them later. (Facebook)",
    [{ href: FB_SAVE_VIDEO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sv-3',
    'It does not necessarily create a normal video file in your Downloads folder.',
  ),
  heading('h-sv-dl', 'Download Video', 3),
  paragraph(
    'p-sv-4',
    'A download saves an available video file to the device or another selected storage location.',
  ),
  paragraph(
    'p-sv-5',
    'That is what a Facebook Video Downloader helps with.',
  ),
  paragraph(
    'p-sv-6',
    'So Save is a bookmark inside Facebook, while Download is a video file on your device.',
  ),
  paragraph('p-sv-7', 'They solve different problems.'),
  {
    id: 'table-save-download',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Action', 'What it does'],
    rows: [
      ['Save video', 'Later viewing inside Facebook'],
      ['Download video', 'An available file on your device'],
      ['Public audience', 'Anyone can see it, including people off Facebook'],
      ['Friends or Only Me', 'Restricted to the selected audience'],
    ],
  },
  figure(
    'fig-save',
    `${IMAGE_DIR}/save-vs-download.png`,
    'Facebook Save video keeps a clip in saved items, while a download stores an available video file on the device',
    'Save video and download video are not the same action.',
  ),

  heading('h-native', 'Can Facebook Download Videos Natively?', 2),
  paragraph(
    'p-nt-1',
    'For some situations, yes.',
  ),
  paragraph(
    'p-nt-2',
    "But you need to distinguish between your own content and someone else's public content.",
  ),
  paragraph(
    'p-nt-3',
    'Meta currently documents the ability to download a Reel you shared to Facebook. It also documents downloading your own Facebook LIVE video after the stream has ended. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nt-4',
    'Facebook also lets users export copies of their own Facebook information and select media quality during an export. (Facebook)',
    [{ href: FB_EXPORT_INFO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nt-5',
    'These are legitimate first-party options for your own content.',
  ),
  paragraph(
    'p-nt-6',
    "For another creator's ordinary public video, Facebook's general Save feature is primarily designed around returning to the content later inside Facebook. (Facebook)",
    [{ href: FB_SAVE_VIDEO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nt-7',
    'That is where a public-video download tool serves a different purpose.',
  ),

  heading('h-own-reel', 'Can You Download Your Own Facebook Reel?', 2),
  paragraph('p-or-1', 'Yes.'),
  paragraph(
    'p-or-2',
    "Meta currently documents a native option for downloading a Reel you've shared to Facebook to your device. Meta notes that download options can differ depending on whether the Reel was posted before or after September 2025. (Facebook)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-or-3',
    'If you simply want a copy of your own Reel, use Facebook\'s native option when it is available.',
  ),
  paragraph(
    'p-or-4',
    'There is no need to use an outside tool for something Facebook already does directly.',
  ),

  heading(
    'h-own-live',
    'Can You Download Your Own Facebook LIVE Video?',
    2,
  ),
  paragraph('p-ol-1', 'Yes.'),
  paragraph(
    'p-ol-2',
    'Meta documents downloading an ended Facebook LIVE video from your video library. (Facebook)',
    [{ href: FB_SAVE_LIVE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ol-3',
    "Again, if it is your own LIVE recording, Facebook's native download workflow may be the simplest option.",
  ),
  paragraph(
    'p-ol-4',
    'A public Facebook Video Downloader is more relevant when you are working with a normal publicly accessible video URL rather than exporting your own account content.',
  ),

  heading(
    'h-someone',
    "Can You Download Someone Else's Public Facebook Video?",
    2,
  ),
  paragraph(
    'p-se-1',
    'Technically, a public downloader can attempt to retrieve media that Facebook publicly exposes for the URL.',
  ),
  paragraph(
    'p-se-2',
    'But two separate questions matter:',
  ),
  bullets('ul-se', [
    'Can the file be technically retrieved?',
    'Do you have the right to reuse it?',
  ]),
  paragraph(
    'p-se-3',
    'Those are not the same thing.',
  ),
  paragraph(
    'p-se-4',
    'Facebook being able to display a public video does not transfer copyright ownership to everybody who can watch it.',
  ),
  paragraph(
    'p-se-5',
    "Meta says Facebook does not claim ownership of users' content; users retain rights in the content they create while granting Meta the licenses necessary to operate its services. (Facebook)",
    [{ href: FB_TERMS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-se-6',
    "Meta also says Facebook's terms do not allow people to post content that violates another person's intellectual-property rights. (Facebook)",
    [{ href: FB_INTELLECTUAL_PROPERTY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-se-7',
    "So downloading for legitimate personal use and republishing somebody else's video as your own are different questions.",
  ),

  heading('h-copyright-free', 'Does Public Mean Copyright-Free?', 2),
  paragraph('p-cf-1', 'No.'),
  paragraph(
    'p-cf-2',
    'This is an important distinction.',
  ),
  paragraph(
    'p-cf-3',
    'A Facebook creator can choose Public as the audience, which means the post can be seen broadly. (Facebook)',
    [{ href: FB_SELECT_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cf-4',
    'That setting controls visibility.',
  ),
  paragraph(
    'p-cf-5',
    'It does not automatically remove copyright, ownership, licensing, trademark or other rights.',
  ),
  paragraph(
    'p-cf-6',
    "Meta recommends getting permission from the author before posting someone else's copyrighted work when necessary. (Facebook)",
    [{ href: FB_AVOID_COPYRIGHTED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cf-7',
    'So Public means publicly viewable. It does not mean free for anyone to copy, sell or repost.',
  ),

  heading(
    'h-when',
    'When Is Downloading a Facebook Video Reasonable?',
    2,
  ),
  paragraph('p-wh-1', 'Examples can include:'),
  bullets('ul-when', [
    'saving your own media,',
    'keeping a permitted offline copy,',
    'preserving a video when the creator has allowed you to,',
    'downloading company content you manage,',
    'keeping an authorized training or reference copy,',
    'or saving content you have the rights to use.',
  ]),
  paragraph(
    'p-wh-2',
    'Copyright rules vary by country and use, so no downloader can give you blanket legal permission.',
  ),
  paragraph(
    'p-wh-3',
    "The safe principle is: download only content you're entitled to save or use.",
  ),
  paragraph(
    'p-wh-4',
    'Meta maintains copyright reporting and intellectual-property enforcement systems when rights holders believe their work has been used without permission. (Facebook)',
    [{ href: FB_COPYRIGHT, label: 'Facebook', external: true }],
  ),

  heading('h-private', 'Can You Download a Private Facebook Video?', 2),
  paragraph(
    'p-pr-1',
    'No. NovaLikes is not a private-video bypass.',
  ),
  paragraph(
    'p-pr-2',
    'A video restricted to Friends, a private audience or another access-controlled context cannot be downloaded with the public Facebook Video Downloader.',
  ),
  paragraph(
    'p-pr-3',
    "Facebook's audience settings exist specifically to control who can view a post. (Facebook)",
    [{ href: FB_CONTROL_SHARE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pr-4',
    'The tool cannot download private Facebook videos, bypass Facebook privacy, unlock Friends-only videos or retrieve hidden Facebook videos.',
  ),
  paragraph(
    'p-pr-5',
    'It only works with public media.',
  ),

  heading(
    'h-group',
    'Can You Download Videos From a Private Facebook Group?',
    2,
  ),
  paragraph(
    'p-gr-1',
    'Content inside a private group has different access rules from a public post.',
  ),
  paragraph(
    'p-gr-2',
    "Meta says photos and videos in public groups are visible to the group's public audience, while content in private groups is available only to group members. (Facebook)",
    [{ href: FB_GROUP_MEDIA, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-gr-3',
    'So a public Facebook downloader cannot get you into a private group, sign in as another user or skip membership requirements.',
  ),
  paragraph(
    'p-gr-4',
    'If the video is not available publicly, the NovaLikes downloader cannot retrieve it.',
  ),

  heading(
    'h-login',
    'Can You Download a Facebook Video Without Logging In?',
    2,
  ),
  paragraph(
    'p-lg-1',
    'Yes, for public videos. If Facebook exposes the video publicly and the NovaLikes tool can reach its media without signing in, it processes that public source without asking for a Facebook password.',
  ),
  paragraph(
    'p-lg-2',
    'Facebook itself defines Public content as viewable by anyone, including people off Facebook. (Facebook)',
    [{ href: FB_SELECT_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lg-3',
    'However, Facebook can change its public web experience, media exposure, redirect behaviour and technical delivery.',
  ),
  paragraph(
    'p-lg-4',
    'So nobody can promise that every public Facebook video will always download without a login.',
  ),
  paragraph(
    'p-lg-5',
    'What NovaLikes can promise is that no Facebook password is required for its public-video downloader.',
  ),

  heading('h-app', 'Do You Need to Install an App?', 2),
  paragraph(
    'p-ap-1',
    'No separate NovaLikes desktop application or browser extension is required for the normal web-tool workflow.',
  ),
  paragraph(
    'p-ap-2',
    'All you need is a browser, a Facebook video URL and the NovaLikes downloader.',
  ),
  paragraph(
    'p-ap-3',
    'There is currently no NovaLikes Chrome extension, Android app, iPhone app or desktop program for this tool.',
  ),

  heading('h-mobile', 'Does It Work on Mobile?', 2),
  paragraph(
    'p-mb-1',
    'Yes. The NovaLikes downloader works through the website on mobile.',
  ),
  paragraph(
    'p-mb-2',
    'On mobile, copy the Facebook video URL, open the tool, paste the link, retrieve the available media, then use the browser or device download behaviour.',
  ),
  paragraph(
    'p-mb-3',
    'The exact location where the finished file appears can vary by browser, operating system and device download settings.',
  ),
  paragraph(
    'p-mb-4',
    "So check your browser's downloads list if you cannot find the file. On iPhone it usually goes to the Files app, and on Android to Downloads.",
  ),

  heading('h-hd', 'Can You Download Facebook Videos in HD?', 2),
  paragraph('p-hd-1', 'Sometimes.'),
  paragraph(
    'p-hd-2',
    'NovaLikes can show HD and SD options when Facebook exposes those media variants for the requested video.',
  ),
  paragraph(
    'p-hd-3',
    'HD cannot be guaranteed for every URL.',
  ),
  paragraph(
    'p-hd-4',
    'The source video may not have been uploaded in HD, may have different available renditions, or may not expose the expected media format.',
  ),
  paragraph(
    'p-hd-5',
    'So expect HD or SD when available, not full HD for every Facebook video.',
  ),

  heading('h-sd', 'What Is Facebook SD Video?', 2),
  paragraph(
    'p-sd-1',
    'SD means a lower-resolution version of a video compared with an available higher-definition version.',
  ),
  paragraph(
    'p-sd-2',
    'For some Facebook video URLs, the publicly exposed media may include HD, SD, both or another available rendition.',
  ),
  paragraph(
    'p-sd-3',
    'The downloader shows what actually exists.',
  ),
  paragraph(
    'p-sd-4',
    'It does not label a file 4K, 1080p or HD when the source does not support it.',
  ),

  heading('h-4k', 'Can You Download Facebook Videos in 4K?', 2),
  paragraph(
    'p-4k-1',
    'Not with NovaLikes at the moment.',
  ),
  paragraph(
    'p-4k-2',
    'The current Facebook Video Downloader offers the HD and SD files Facebook labels. It is not a 4K downloader.',
  ),
  paragraph(
    'p-4k-3',
    'So expect HD or SD when available.',
  ),
  paragraph(
    'p-4k-4',
    'That is more honest than a 4K button that cannot deliver.',
  ),

  heading('h-only-sd', 'Why Is Only SD Available?', 2),
  paragraph('p-os-1', 'Possible technical reasons include:'),
  bullets('ul-only-sd', [
    'the source upload,',
    'the available Facebook rendition,',
    'or what Facebook currently exposes for that particular URL.',
  ]),
  paragraph(
    'p-os-2',
    'The downloader cannot create an HD source that Facebook does not provide.',
  ),
  paragraph(
    'p-os-3',
    'If only SD is exposed, the tool shows SD.',
  ),
  paragraph(
    'p-os-4',
    'It does not upscale the file or label it Original HD.',
  ),

  heading(
    'h-fail',
    'Why Does the Facebook Video Downloader Sometimes Fail?',
    2,
  ),
  paragraph(
    'p-fl-1',
    'A failed request does not always mean the tool is broken.',
  ),
  paragraph('p-fl-2', 'Possible reasons include:'),
  bullets('ul-fail', [
    'the video is no longer public,',
    'the post was removed,',
    'the URL is malformed,',
    'Facebook changed the page or media structure,',
    'the media is not currently exposed,',
    'or the video belongs to an unsupported or restricted context.',
  ]),
  paragraph(
    'p-fl-3',
    'When media is not exposed, the tool says so.',
  ),
  paragraph(
    'p-fl-4',
    'It shows a clear error instead of producing a fake download.',
  ),

  heading('h-exposed', 'What Does Media Not Exposed Mean?', 2),
  paragraph(
    'p-ex-1',
    'It means the tool found the Facebook page or request context but could not obtain a usable public video source from it.',
  ),
  paragraph(
    'p-ex-2',
    'That distinction matters.',
  ),
  paragraph(
    'p-ex-3',
    'A page existing does not guarantee the underlying downloadable media is exposed in a way the tool can safely retrieve.',
  ),
  paragraph(
    'p-ex-4',
    'If that happens, try checking whether the original video still plays publicly, confirm the URL, and try again later if appropriate.',
  ),
  paragraph(
    'p-ex-5',
    'The NovaLikes tool never asks for your Facebook password, cookies, session tokens or a browser-login export to force a download.',
  ),

  heading(
    'h-unavailable',
    'Why Does a Facebook Video Link Say It Is Unavailable?',
    2,
  ),
  paragraph(
    'p-un-1',
    'The creator may have deleted the content, changed its audience, restricted access, or Facebook may have removed it.',
  ),
  paragraph(
    'p-un-2',
    'Facebook allows people to change the audience of posts after publishing them. (Facebook)',
    [{ href: FB_CHANGE_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-un-3',
    'So a URL that was public yesterday may not remain public forever.',
  ),
  paragraph(
    'p-un-4',
    'A downloader can only work with what is accessible now.',
  ),

  heading(
    'h-became-private',
    'What If a Public Video Becomes Private After I Save the Link?',
    2,
  ),
  paragraph(
    'p-bp-1',
    'The current Facebook audience setting matters.',
  ),
  paragraph(
    'p-bp-2',
    'Meta lets publishers change who can see past posts. (Facebook)',
    [{ href: FB_CHANGE_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-bp-3',
    'So previously public does not guarantee currently public.',
  ),
  paragraph(
    'p-bp-4',
    'If the creator restricts the post later, NovaLikes cannot get around the new privacy setting just because you still have the old URL.',
  ),

  heading('h-short', 'Do Facebook Watch Short Links Work?', 2),
  paragraph(
    'p-sh-1',
    'NovaLikes supports valid Facebook watch short links in the Facebook video extraction flow.',
  ),
  paragraph(
    'p-sh-2',
    'A short Facebook URL can redirect to the underlying Facebook video or post.',
  ),
  paragraph(
    'p-sh-3',
    'The tool checks and follows supported Facebook redirects under its security rules before looking for media.',
  ),
  paragraph(
    'p-sh-4',
    'If the redirect does not lead to supported public media, the tool shows an error. It does not fetch other external URLs.',
  ),

  heading(
    'h-any-url',
    'Can You Paste Any Website URL Into the Downloader?',
    2,
  ),
  paragraph('p-au-1', 'No.'),
  paragraph(
    'p-au-2',
    'The Facebook Video Downloader only works with Facebook links.',
  ),
  paragraph(
    'p-au-3',
    'It handles Facebook URLs specifically. It is not a general tool for downloading anything from the internet.',
  ),
  paragraph(
    'p-au-4',
    'That keeps it more secure and more predictable.',
  ),
  paragraph(
    'p-au-5',
    'Paste a supported Facebook video URL.',
  ),
  paragraph(
    'p-au-6',
    'Do not paste Google Drive, YouTube, Dropbox, random file hosts or internal network URLs.',
  ),

  heading('h-vs-reel', 'Facebook Video vs Facebook Reel', 2),
  paragraph(
    'p-vr-1',
    "Facebook's video ecosystem now includes Reels alongside other video content.",
  ),
  paragraph(
    'p-vr-2',
    'Meta has increasingly integrated video into Reels experiences, but user search intent still differs.',
  ),
  paragraph(
    'p-vr-3',
    'Downloading a Facebook video and downloading a Facebook Reel are separate tasks.',
  ),
  paragraph(
    'p-vr-4',
    'NovaLikes therefore has a Facebook video tool and a separate Facebook Reels tool.',
  ),
  paragraph(
    'p-vr-5',
    'Each one handles the link type it was built for.',
  ),
  paragraph(
    'p-vr-6',
    'Use the tool that matches what you are trying to save.',
  ),

  heading(
    'h-reel-with-video',
    'Can You Download a Facebook Reel With the Video Downloader?',
    2,
  ),
  paragraph(
    'p-rw-1',
    'If you have a Reel, use the Facebook Reels Downloader instead.',
    [{ href: REELS_TOOL_HREF, label: 'Facebook Reels Downloader' }],
  ),
  paragraph(
    'p-rw-2',
    'The NovaLikes video page is for watch links and page video paths. Reel links belong on the Reels downloader.',
  ),
  paragraph(
    'p-rw-3',
    'If you paste a Reel link here, the tool points you to the right page.',
  ),
  paragraph(
    'p-rw-4',
    'The dedicated Facebook Reel downloading guide explains that workflow separately.',
  ),

  heading('h-live', 'Can You Download Facebook Live Videos?', 2),
  paragraph(
    'p-lv-1',
    'There are two situations.',
  ),
  heading('h-lv-own', 'Your Own LIVE', 3),
  paragraph(
    'p-lv-2',
    'Meta provides a native workflow for saving or downloading your own ended Facebook LIVE video. (Facebook)',
    [{ href: FB_SAVE_LIVE, label: 'Facebook', external: true }],
  ),
  heading('h-lv-other', "Someone Else's Public LIVE Recording", 3),
  paragraph(
    'p-lv-3',
    'If the ended recording is available as a public video and Facebook exposes usable media, the downloader may be able to process it.',
  ),
  paragraph(
    'p-lv-4',
    'It does not support streams that are still running, private LIVE broadcasts or content Facebook does not expose.',
  ),
  paragraph(
    'p-lv-5',
    'The current NovaLikes tool is a video downloader, not a LIVE stream recorder.',
  ),

  heading('h-ongoing', 'Can You Download an Ongoing Facebook LIVE?', 2),
  paragraph(
    'p-og-1',
    'No. The NovaLikes tool is not a stream recorder.',
  ),
  paragraph(
    'p-og-2',
    'Downloading an existing video file and recording an active stream are technically different jobs.',
  ),
  paragraph(
    'p-og-3',
    'NovaLikes works with existing public videos, not real-time stream capture.',
  ),
  paragraph(
    'p-og-4',
    'If Facebook later publishes the LIVE as a normal available recording, that is a different situation.',
  ),

  heading('h-stories', 'Can You Download Facebook Stories?', 2),
  paragraph(
    'p-st-1',
    'Not with this tool.',
  ),
  paragraph(
    'p-st-2',
    'The Facebook Video Downloader is not a Facebook Story Downloader.',
  ),
  paragraph(
    'p-st-3',
    'Meta has separate Story features and even provides creators with native options for saving their own archived Stories to a device. (Facebook)',
    [{ href: FB_SAVE_STORY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-st-4',
    'If you want your own Stories, use those native options.',
  ),

  heading(
    'h-watermark',
    'Does Downloading a Video Remove Its Watermark?',
    2,
  ),
  paragraph(
    'p-wm-1',
    'No.',
  ),
  paragraph(
    'p-wm-2',
    'The downloader retrieves the available media as it is.',
  ),
  paragraph(
    'p-wm-3',
    'If the source contains branding, text, logos, captions or embedded marks, they stay in the file.',
  ),
  paragraph(
    'p-wm-4',
    'Download video and remove watermark are separate functions.',
  ),
  paragraph(
    'p-wm-5',
    'NovaLikes does not offer watermark removal.',
  ),

  heading('h-quality-change', 'Does Downloading Change the Video Quality?', 2),
  paragraph(
    'p-qc-1',
    'No. The downloader saves an available media version as it is.',
  ),
  paragraph(
    'p-qc-2',
    'It does not enhance, restore or upscale the video.',
  ),
  paragraph(
    'p-qc-3',
    'If Facebook exposes HD, you get HD.',
  ),
  paragraph(
    'p-qc-4',
    'If only SD is exposed, you get SD.',
  ),
  paragraph(
    'p-qc-5',
    'The file matches the source Facebook provides.',
  ),

  heading(
    'h-deleted',
    'Can a Downloader Recover a Deleted Facebook Video?',
    2,
  ),
  paragraph('p-de-1', 'No.'),
  paragraph(
    'p-de-2',
    'The NovaLikes downloader is not an archive, deleted-video recovery system, cache explorer or Facebook history database.',
  ),
  paragraph(
    'p-de-3',
    'If the video is deleted and no supported public media remains, the tool shows an error.',
  ),
  paragraph(
    'p-de-4',
    'It does not keep or create old copies.',
  ),

  heading(
    'h-removed',
    'Can a Downloader Recover a Removed Copyright Video?',
    2,
  ),
  paragraph('p-rm-1', 'No.'),
  paragraph(
    'p-rm-2',
    'If Facebook removes content because it is unavailable or because of enforcement, a downloader cannot undo that.',
  ),
  paragraph(
    'p-rm-3',
    'Meta operates copyright reporting and intellectual-property enforcement systems across Facebook. (Facebook)',
    [{ href: FB_COPYRIGHT, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rm-4',
    'The tool works with currently accessible supported public media.',
  ),

  heading(
    'h-password',
    'Is It Safe to Give a Facebook Downloader Your Password?',
    2,
  ),
  paragraph(
    'p-pw-1',
    "You do not need to provide your Facebook password for NovaLikes' public video downloader.",
  ),
  paragraph(
    'p-pw-2',
    'Be particularly careful with tools that ask you to paste Facebook credentials, session cookies, two-factor codes or browser authentication data just to process a public video.',
  ),
  paragraph(
    'p-pw-3',
    "NovaLikes' tool only works with public video media. It never signs into Facebook accounts.",
  ),

  heading(
    'h-store',
    'Does NovaLikes Store My Facebook Password?',
    2,
  ),
  paragraph(
    'p-sp-1',
    'There is no Facebook password field in the downloader workflow because the tool does not need your Facebook password.',
  ),
  paragraph(
    'p-sp-2',
    'That is safer than asking for a password and then asking you to trust the site with it.',
  ),
  paragraph(
    'p-sp-3',
    'For a public video, paste the public video URL.',
  ),
  paragraph(
    'p-sp-4',
    'Nothing else is needed from your Facebook account.',
  ),

  heading('h-every', 'Can the Tool Download Every Facebook Video?', 2),
  paragraph('p-ev-1', 'No.'),
  paragraph(
    'p-ev-2',
    'Be wary of any tool that says it can.',
  ),
  paragraph(
    'p-ev-3',
    'What it can do is download supported public Facebook videos when Facebook exposes usable video media.',
  ),
  paragraph(
    'p-ev-4',
    'It may fail when content is private, media is unavailable, the post was removed, Facebook blocks or exposes the page differently, or the URL is unsupported.',
  ),
  paragraph(
    'p-ev-5',
    'When a video cannot be retrieved, the tool tells you.',
  ),

  heading(
    'h-notify',
    'Does Facebook Notify the Creator When You Download a Public Video?',
    2,
  ),
  paragraph(
    'p-nf-1',
    'Meta documents ordinary actions such as saving content for later viewing, but its official sources do not describe a creator notification for downloads of public video media by outside tools. (Facebook)',
    [{ href: FB_SAVE_VIDEO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nf-2',
    'Even so, nobody can promise that the creator can never know you downloaded it.',
  ),
  paragraph(
    'p-nf-3',
    'NovaLikes does not make that promise.',
  ),
  paragraph(
    'p-nf-4',
    'What it does offer is public media retrieval without your Facebook password, not invisible activity.',
  ),

  heading(
    'h-page',
    'Can You Download Videos From a Facebook Page?',
    2,
  ),
  paragraph(
    'p-pg-1',
    "Yes, if the Page's video is currently public and Facebook exposes the media.",
  ),
  paragraph(
    'p-pg-2',
    'Facebook Pages commonly publish public-facing video content, but individual posts still operate under Facebook\'s visibility and content systems. (Facebook)',
    [{ href: FB_PHOTOS_VIDEOS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pg-3',
    'So the relevant question is whether this specific video is publicly accessible, not merely whether it is posted by a Page.',
  ),

  heading(
    'h-profile',
    'Can You Download a Video From a Facebook Profile?',
    2,
  ),
  paragraph(
    'p-pf-1',
    'The same principle applies.',
  ),
  paragraph(
    'p-pf-2',
    'If the owner selected Public for that video or post, Public means anyone can see it, including people off Facebook. (Facebook)',
    [{ href: FB_SELECT_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pf-3',
    'If it is Friends-only, Only Me or otherwise restricted, the public downloader cannot retrieve it. (Facebook)',
    [{ href: FB_CHOOSE_WHO, label: 'Facebook', external: true }],
  ),

  heading(
    'h-source-quality',
    'Facebook Video Quality Depends on the Source',
    2,
  ),
  paragraph(
    'p-sq-1',
    'Users sometimes expect Original HD for every video.',
  ),
  paragraph(
    'p-sq-2',
    'But the downloader only has access to the media rendition that is actually available.',
  ),
  paragraph(
    'p-sq-3',
    'A low-quality upload cannot be converted back into an untouched high-quality camera source through ordinary downloading.',
  ),
  paragraph(
    'p-sq-4',
    'So expect HD when available and SD when available, rather than guaranteed original quality.',
  ),

  heading(
    'h-smaller',
    'Why Is the Downloaded Video Smaller Than Expected?',
    2,
  ),
  paragraph(
    'p-sm-1',
    'File size depends on things such as video duration, resolution, encoding, bitrate and the source rendition.',
  ),
  paragraph(
    'p-sm-2',
    'A one-minute SD clip and a ten-minute HD video should not be expected to have identical file sizes.',
  ),
  paragraph(
    'p-sm-3',
    'File size alone does not tell you whether a video is HD.',
  ),
  paragraph(
    'p-sm-4',
    'Resolution and actual playback properties are more useful than one universal file-size assumption.',
  ),

  heading('h-after', 'What Can You Do After Downloading a Video?', 2),
  paragraph(
    'p-af-1',
    'That depends on your rights to the content.',
  ),
  paragraph('p-af-2', 'Legitimate examples could include:'),
  bullets('ul-after', [
    'offline viewing,',
    'keeping your own business content,',
    'authorized editing,',
    'archiving material you own,',
    'or using the file in a workflow the copyright owner has permitted.',
  ]),
  paragraph(
    'p-af-3',
    "But downloading does not automatically give permission to remove attribution, re-upload another creator's work, sell it, run ads with it or impersonate its creator.",
  ),
  paragraph(
    'p-af-4',
    "Meta's Terms preserve creators' rights in the content they create, and Meta maintains intellectual-property enforcement processes. (Facebook)",
    [{ href: FB_TERMS, label: 'Facebook', external: true }],
  ),

  heading('h-repost', 'Can You Repost a Downloaded Facebook Video?', 2),
  paragraph(
    'p-rp-1',
    'Only if you have a legitimate basis to do so.',
  ),
  paragraph(
    'p-rp-2',
    'Meta advises users to avoid posting copied content they do not have the right to post and operates copyright reporting systems for rights holders. (Facebook)',
    [{ href: FB_COMMUNITY, label: 'Facebook', external: true }],
  ),
  paragraph('p-rp-3', 'Possible legitimate situations include:'),
  bullets('ul-repost', [
    'you created it,',
    'the owner gave permission,',
    'the license allows the intended use,',
    'or another applicable legal basis exists.',
  ]),
  paragraph(
    'p-rp-4',
    'The downloader cannot decide that for you.',
  ),

  heading(
    'h-business',
    'Facebook Downloading for Your Own Business Content',
    2,
  ),
  paragraph(
    'p-bu-1',
    'One of the clearest use cases is your own material.',
  ),
  paragraph(
    'p-bu-2',
    'A business might need a copy of a video previously posted to its Page, a completed LIVE recording, an old campaign asset or content being reused in an authorized company archive.',
  ),
  paragraph(
    'p-bu-3',
    'For broader exports, Facebook provides tools for downloading copies of Page and profile information, and creators can download certain own-content types directly. (Facebook)',
    [{ href: FB_DOWNLOAD_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-bu-4',
    "Use Facebook's native export or download options first when they fit your use case.",
  ),
  paragraph(
    'p-bu-5',
    'Use the NovaLikes downloader when you simply have a supported public video URL and need the exposed media file.',
  ),

  heading('h-later', 'View Later or Keep a File?', 2),
  paragraph(
    'p-lt-1',
    'Ask one question: why do I need this video?',
  ),
  paragraph(
    'p-lt-2',
    'If the answer is that you just want to watch it again later on Facebook, use Facebook\'s native Save video feature. (Facebook)',
    [{ href: FB_SAVE_VIDEO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lt-3',
    'If the answer is that you need an actual available file on your device, and you have the right to save it, then use a video download workflow.',
  ),
  paragraph(
    'p-lt-4',
    'That distinction can save a lot of unnecessary work.',
  ),

  heading('h-cta-section', 'Download a Public Facebook Video', 2),
  paragraph(
    'p-ct-1',
    'If you want to download a public video now, the free downloader is the next step.',
  ),
  {
    id: 'cta-facebook-video-downloader',
    type: 'internal_cta',
    order: nextOrder(),
    href: TOOL_HREF,
    heading: 'Download a Public Facebook Video',
    description:
      'Paste a supported public Facebook video link to check the available video options. HD or SD may be shown depending on what Facebook exposes for the source.',
    label: 'Open Facebook Video Downloader',
  },

  heading(
    'h-simple',
    'How to Download a Public Facebook Video: Simple Version',
    2,
  ),
  paragraph('p-si-1', 'Use this process:'),
  numbered('ol-simple', [
    'Open the public Facebook video.',
    'Copy its link.',
    'Open the NovaLikes Facebook Video Downloader.',
    'Paste the URL.',
    'Let the tool check the publicly exposed media.',
    'Choose HD or SD when available.',
    'Download.',
  ]),
  paragraph(
    'p-si-2',
    'If the video is private, deleted, unavailable, or Facebook does not expose usable media, the tool shows an error instead of pretending the download worked.',
  ),
  paragraph(
    'p-si-3',
    "And remember: being able to download a public file does not give you ownership of somebody else's content. Meta retains a copyright and intellectual-property framework for Facebook content and does not take ownership away from creators merely because they post it to Facebook. (Facebook)",
    [{ href: FB_TERMS, label: 'Facebook', external: true }],
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    "Facebook's native Save video feature saves content for later viewing inside Facebook; it should not be confused with downloading a video file to your device.",
    'Facebook defines Public audience content as content anyone can see, including people off Facebook.',
    "Facebook lets publishers select and later change the audience for posts, so a video's accessibility can change.",
    'Meta provides native download options for some content you own, including your own shared Reels and ended LIVE videos.',
    "NovaLikes' Facebook Video Downloader is for supported publicly accessible videos; it is not a private-content bypass.",
    'HD and SD options only appear when Facebook makes those files available.',
    'The NovaLikes downloader does not ask for a Facebook password to process supported public video media.',
    'Publicly visible does not mean copyright-free. Meta says users retain rights in their content and prohibits intellectual-property infringing content on Facebook.',
    'Downloading and republishing are separate actions; permission or another legitimate legal basis may be needed for reuse.',
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

export const HOW_TO_DOWNLOAD_FACEBOOK_VIDEO_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-to-download-facebook-video',
  slug: SLUG,
  title: 'How to Download a Public Facebook Video',
  excerpt:
    'Facebook makes it easy to watch videos. Saving one as an actual file on your device is a different question.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'facebook',
  tags: ['creator', 'business', 'analytics'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'How to Download a Public Facebook Video',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How to Download a Public Facebook Video',
    description:
      'Learn how to download an available public Facebook video, the difference between Save and Download, and why some Facebook videos cannot be retrieved.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'download Facebook video',
      'Facebook save video vs download',
      'download public Facebook video',
      'save Facebook video to device',
      'why a Facebook video cannot be downloaded',
      'Facebook video URL',
    ],
  },
  relatedServices: [],
  relatedArticles: [
    'how-facebook-page-reach-works',
    'how-to-download-facebook-reel',
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
    'Facebook Save video keeps the clip in saved Facebook items for later viewing',
    'Device download saves an available video file on your device',
    'Public Facebook videos can be seen by anyone, including people off Facebook',
    "Restricted videos stay controlled by the publisher's audience setting",
    'NovaLikes works with supported public Facebook video URLs when Facebook exposes usable media',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How can I download a public Facebook video?',
      answer:
        'Copy the public Facebook video URL, open the NovaLikes Facebook Video Downloader, paste the link and check the available video options. The tool can return supported media such as HD or SD when Facebook exposes those versions.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Is Facebook Save Video the same as downloading?',
      answer:
        'No. Facebook describes Save video as a way to save videos inside Facebook for later viewing. Downloading means saving an actual available video file to your device.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I download Facebook videos in HD?',
      answer:
        'When Facebook exposes an HD version and the tool can retrieve it, NovaLikes shows an HD option. HD is not available for every video.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can I download a private Facebook video?',
      answer:
        'No. The NovaLikes tool only works with supported public Facebook videos. Facebook uses audience controls such as Public, Friends and Only Me to restrict who can see posts.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can I download a Facebook video without logging in?',
      answer:
        'For supported publicly accessible media, the NovaLikes downloader does not require your Facebook password. Facebook defines Public content as viewable even by people off Facebook.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can Facebook download my own videos?',
      answer:
        'Meta provides direct download and export options for several types of your own content, including your own shared Reels, ended LIVE videos and Facebook information exports.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Does a public Facebook video mean I can repost it anywhere?',
      answer:
        'No. Public controls who can see the video, not who owns it. Meta says creators retain rights in their content and prohibits intellectual-property infringement.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: "Why can't the downloader find my Facebook video?",
      answer:
        'The video may no longer be public, the URL may be invalid, Facebook may not expose usable video media, or the content may have been deleted or restricted. Facebook lets publishers change a post\'s audience after publishing.',
      schemaEligible: true,
    },
    {
      id: 'faq-9',
      question: 'Does NovaLikes need my Facebook password?',
      answer:
        'No. The public Facebook Video Downloader workflow does not require your Facebook password.',
      schemaEligible: true,
    },
    {
      id: 'faq-10',
      question: 'Can I use a Facebook watch short link?',
      answer:
        'Yes. NovaLikes supports valid Facebook watch short links. If the redirect does not lead to supported public media, the tool shows an error instead of a download.',
      schemaEligible: true,
    },
  ],
};
