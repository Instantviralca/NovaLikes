/**
 * Article #24 — How to Download a Public Facebook Reel
 * Scheduled: Friday 16 October 2026.
 * Utility / tool intent. Distinct from Facebook follower or Like packages.
 * Primary CTA: /tools/facebook-reels-downloader
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-to-download-facebook-reel';
const SCHEDULED_AT = '2026-10-16T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;
const TOOL_HREF = '/tools/facebook-reels-downloader';
const VIDEO_TOOL_HREF = '/tools/facebook-video-downloader';

const FB_REELS_TV = 'https://www.facebook.com/help/276515126152168';
const FB_DOWNLOAD_REEL = 'https://www.facebook.com/help/1005944300373812';
const FB_SELECT_AUDIENCE = 'https://www.facebook.com/help/211513702214269';
const FB_CHOOSE_WHO = 'https://www.facebook.com/help/120939471321735';
const FB_INTELLECTUAL_PROPERTY =
  'https://www.facebook.com/help/intellectual_property';
const FB_COMMUNITY = 'https://www.facebook.com/help/477434105621119';
const FB_AVOID_COPYRIGHTED = 'https://www.facebook.com/help/308895412492789';
const FB_MUSIC = 'https://www.facebook.com/help/728395571305053';
const FB_IG_REEL_DOWNLOAD =
  'https://www.facebook.com/help/instagram/520831036611383';
const FB_COPYRIGHT = 'https://www.facebook.com/help/1020633957973118';

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
    "Facebook Reels are now a much bigger part of Facebook's overall video experience.",
  ),
  paragraph(
    'p-open-2',
    'Meta says that since September 2025, all videos posted to Facebook are shared as Reels, regardless of their length or orientation. (Facebook)',
    [{ href: FB_REELS_TV, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-3',
    'That means a video that might previously have appeared as a normal Facebook video may now appear inside the Reels system.',
  ),
  paragraph(
    'p-open-4',
    'But one question remains the same: how do you save an actual Facebook Reel video file to your phone or computer?',
  ),
  paragraph(
    'p-open-5',
    "The answer depends on whether the Reel is yours, Facebook provides a native download option, or you're trying to retrieve publicly available Reel media from another public post.",
  ),
  paragraph(
    'p-open-6',
    'Meta currently lets users download Reels they shared themselves to their device. Download options differ depending on whether the Reel was posted before or after September 2025. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-7',
    'For supported public Reels that are not your own, the Facebook Reels Downloader can check whether Facebook exposes usable media for that public Reel URL.',
    [{ href: TOOL_HREF, label: 'Facebook Reels Downloader' }],
  ),
  paragraph(
    'p-open-8',
    'The workflow is: copy a public Facebook Reel link, paste it into NovaLikes, check available media and download the available version.',
  ),
  paragraph(
    'p-open-9',
    'No Facebook password should be required for this public-media workflow.',
  ),
  paragraph(
    'p-open-10',
    'Publicly visible does not mean copyright-free. Facebook still prohibits posting content that infringes other people\'s intellectual-property rights. (Facebook)',
    [{ href: FB_INTELLECTUAL_PROPERTY, label: 'Facebook', external: true }],
  ),

  heading('h-what', 'What Is a Facebook Reel in 2026?', 2),
  paragraph(
    'p-wh-1',
    'Historically, Facebook had several different video experiences.',
  ),
  paragraph('p-wh-2', 'There were:'),
  bullets('ul-wh', [
    'regular videos,',
    'short-form Reels,',
    'LIVE videos,',
    'and other video placements.',
  ]),
  paragraph(
    'p-wh-3',
    'That distinction has become simpler.',
  ),
  paragraph(
    'p-wh-4',
    'Meta says that since September 2025, every video posted to Facebook is shared as a Reel, regardless of video length or orientation. (Facebook)',
    [{ href: FB_REELS_TV, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wh-5',
    'So in 2026, a vertical 20-second clip can be a Reel, but so can a longer landscape video uploaded through Facebook\'s normal video workflow.',
  ),
  paragraph(
    'p-wh-6',
    'This is important for users searching for a Facebook video download versus a Facebook Reel download.',
  ),
  paragraph(
    'p-wh-7',
    'The content formats increasingly overlap even though those search intents remain useful to separate.',
  ),
  paragraph(
    'p-wh-8',
    'NovaLikes still uses the URL type to decide which helper to use. A Reel-style path belongs on the Reels downloader, while a watch or videos path belongs on the Facebook Video Downloader.',
    [{ href: VIDEO_TOOL_HREF, label: 'Facebook Video Downloader' }],
  ),
  paragraph(
    'p-wh-9',
    'Our earlier guide on how to download a public Facebook video covers the watch and videos workflow in more detail.',
    [
      {
        href: '/learn/how-to-download-facebook-video',
        label: 'how to download a public Facebook video',
      },
    ],
  ),
  figure(
    'fig-timeline',
    `${IMAGE_DIR}/video-to-reels.png`,
    'Before September 2025 Facebook videos and Reels looked like separate experiences; from September 2025 onward newly posted Facebook videos are shared as Reels',
    "Facebook's video system changed, but users still search for both video and Reel downloads.",
  ),

  heading('h-own', 'How to Download Your Own Facebook Reel', 2),
  paragraph(
    'p-ow-1',
    "If the Reel belongs to you, start with Facebook's native option.",
  ),
  paragraph(
    'p-ow-2',
    'Meta currently documents the following process on supported mobile devices:',
  ),
  numbered('ol-own', [
    'Open your Facebook profile.',
    'Open Reels.',
    'Choose the Reel you shared.',
    'Open the Reel options.',
    'Select Download reel where available.',
  ]),
  paragraph(
    'p-ow-3',
    'Meta documents that native download path in its Help Center. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ow-4',
    'Meta notes that the available download behaviour differs depending on whether the content was posted before or after September 2025. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ow-5',
    'This should be your first choice for your own Reel.',
  ),
  paragraph(
    'p-ow-6',
    'There is no reason to route users through an external tool when Facebook itself already offers the native function they need.',
  ),

  heading(
    'h-desktop',
    'Can You Download a Facebook Reel on Desktop?',
    2,
  ),
  paragraph(
    'p-dt-1',
    "Meta's current Help Center says the native download a Reel you shared feature is not available on computers and points users to the Facebook mobile apps for the supported workflow. (Facebook)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-dt-2',
    'That means your own Reel on mobile should use Facebook\'s native download option when available.',
  ),
  paragraph(
    'p-dt-3',
    'A web-based public Reel downloader can be useful from a browser or desktop when you have a supported public Reel URL and need the available video file.',
  ),
  paragraph(
    'p-dt-4',
    "Do not claim Facebook's native mobile download feature works identically on desktop if Meta says otherwise.",
  ),

  heading(
    'h-how',
    'How to Download a Public Facebook Reel With NovaLikes',
    2,
  ),
  paragraph(
    'p-how-1',
    'For a supported Reel that is publicly available:',
  ),
  heading('h-how-1', 'Step 1: Open the Facebook Reel', 3),
  paragraph(
    'p-how-2',
    'Open the Reel on Facebook.',
  ),
  paragraph(
    'p-how-3',
    'Make sure the content is genuinely accessible.',
  ),
  paragraph(
    'p-how-4',
    "If Facebook says the content is unavailable or you do not have permission to view it, then it is not a normal public-downloader use case.",
  ),
  heading('h-how-2', 'Step 2: Copy the Reel Link', 3),
  paragraph(
    'p-how-5',
    "Use Facebook's share or copy-link controls.",
  ),
  paragraph(
    'p-how-6',
    "You need the Reel's URL. The current NovaLikes Reels tool is for Reel paths, Reel share links and Facebook watch short links that resolve to Reel media.",
  ),
  heading('h-how-3', 'Step 3: Open NovaLikes Facebook Reels Downloader', 3),
  paragraph(
    'p-how-7',
    'Open the Facebook Reels Downloader on NovaLikes.',
  ),
  heading('h-how-4', 'Step 4: Paste the Reel URL', 3),
  paragraph(
    'p-how-8',
    'Paste the supported Facebook Reel URL into the input field.',
  ),
  heading('h-how-5', 'Step 5: Start the Extraction', 3),
  paragraph(
    'p-how-9',
    'NovaLikes checks whether Facebook currently exposes usable media for that public Reel.',
  ),
  heading('h-how-6', 'Step 6: Choose an Available Version', 3),
  paragraph(
    'p-how-10',
    'Depending on the source, Facebook may expose HD, SD or another supported rendition.',
  ),
  paragraph(
    'p-how-11',
    'Do not assume every Reel has every quality.',
  ),
  heading('h-how-7', 'Step 7: Download', 3),
  paragraph(
    'p-how-12',
    'Choose the available media result and save it to your device.',
  ),
  paragraph(
    'p-how-13',
    'No Facebook password is required for the NovaLikes public-Reel workflow.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/reels-workflow.png`,
    'How the Facebook Reels Downloader works: copy a Reel link, paste it into NovaLikes, check available HD or SD media, then download',
    'Public Reels only. No Facebook password required.',
  ),

  heading(
    'h-save',
    'What Is the Difference Between Saving and Downloading a Facebook Reel?',
    2,
  ),
  paragraph(
    'p-sv-1',
    'These actions are easy to confuse.',
  ),
  heading('h-sv-save', 'Save Reel', 3),
  paragraph(
    'p-sv-2',
    "Facebook's own Save feature keeps content available through your Facebook saved-items experience so you can return to it later.",
  ),
  paragraph(
    'p-sv-3',
    'That is basically an in-Facebook bookmark.',
  ),
  heading('h-sv-dl', 'Download Reel', 3),
  paragraph(
    'p-sv-4',
    'A download gives you an actual available video file on your device.',
  ),
  paragraph(
    'p-sv-5',
    'For content you created yourself, Facebook offers a native Reel-download option on supported mobile devices. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sv-6',
    'For other supported public Reels, a downloader may retrieve media Facebook publicly exposes.',
  ),
  paragraph(
    'p-sv-7',
    'So Save keeps it inside Facebook, while Download saves an actual media file.',
  ),
  {
    id: 'table-save-download',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Action', 'What it does'],
    rows: [
      ['Save Reel', 'Later viewing inside Facebook'],
      ['Download Reel', 'An available file on your device'],
      ['Your own Reel on mobile', 'Facebook native download when available'],
      ['Public Reel URL', 'NovaLikes can check exposed media'],
    ],
  },

  heading(
    'h-someone',
    "Can You Download Someone Else's Public Facebook Reel?",
    2,
  ),
  paragraph(
    'p-se-1',
    'Technically, a public Reel downloader can attempt to retrieve media Facebook exposes for that public URL.',
  ),
  paragraph(
    'p-se-2',
    'But two separate questions exist.',
  ),
  heading('h-se-file', 'Can You Retrieve the File?', 3),
  paragraph(
    'p-se-3',
    'This is a technical question.',
  ),
  heading('h-se-reuse', 'Can You Reuse the File?', 3),
  paragraph(
    'p-se-4',
    'This is a copyright and permission question.',
  ),
  paragraph(
    'p-se-5',
    "Facebook's Community Guidelines and intellectual-property rules say users should only post content they created themselves or have the right to share. (Facebook)",
    [{ href: FB_COMMUNITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-se-6',
    'Therefore publicly visible is not the same as free to republish.',
  ),
  paragraph(
    'p-se-7',
    'A creator making a Reel public allows people to see it. That does not automatically transfer ownership.',
  ),

  heading('h-copyright-free', 'Public Does Not Mean Copyright-Free', 2),
  paragraph(
    'p-cf-1',
    "Facebook's audience selector defines Public as content anyone can see, including people off Facebook. (Facebook)",
    [{ href: FB_SELECT_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cf-2',
    'That tells you about visibility.',
  ),
  paragraph(
    'p-cf-3',
    'It does not tell you that the media is public domain, royalty-free, commercially reusable or owned by the downloader.',
  ),
  paragraph(
    'p-cf-4',
    "Facebook's intellectual-property rules prohibit posting content that violates another person's copyright or trademark rights. (Facebook)",
    [{ href: FB_INTELLECTUAL_PROPERTY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cf-5',
    'Meta also advises users that the safest way to avoid copyright infringement is to post content they created themselves. (Facebook)',
    [{ href: FB_AVOID_COPYRIGHTED, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cf-6',
    "So if you download someone else's Reel, do not assume you can simply repost it as your own.",
  ),
  figure(
    'fig-rights',
    `${IMAGE_DIR}/visibility-vs-rights.png`,
    'A public Facebook Reel can be viewable by anyone, while creator ownership and permission still control reuse',
    'Public access answers whether you can see it, not automatically whether you can reuse it.',
  ),

  heading('h-private', 'Can You Download a Private Facebook Reel?', 2),
  paragraph(
    'p-pr-1',
    'No. NovaLikes should not be used as a private-content bypass.',
  ),
  paragraph(
    'p-pr-2',
    'Facebook lets publishers control who can see content through audience settings such as Public, Friends and Only Me. (Facebook)',
    [{ href: FB_CHOOSE_WHO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pr-3',
    'If a Reel requires account-specific permission or is otherwise restricted, the NovaLikes public downloader should not claim to bypass access, unlock it or download it secretly.',
  ),
  paragraph(
    'p-pr-4',
    'Do not treat the tool as a private Facebook Reel downloader, a way to unlock hidden Reels, a Friends-only Reel downloader or a Facebook privacy bypass.',
  ),
  paragraph(
    'p-pr-5',
    "The live tool returns an error for private, deleted or login-only Reels rather than inventing a file.",
  ),

  heading(
    'h-group',
    'Can You Download Reels From a Private Facebook Group?',
    2,
  ),
  paragraph(
    'p-gr-1',
    'Treat private-group media as restricted content.',
  ),
  paragraph(
    'p-gr-2',
    "Facebook's audience model exists to limit who can access different pieces of content. (Facebook)",
    [{ href: FB_CHOOSE_WHO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-gr-3',
    'The NovaLikes Reels Downloader should work with supported public Reel URLs rather than authenticated private-group media.',
  ),
  paragraph(
    'p-gr-4',
    'Do not ask users to paste Facebook session cookies, login credentials or exported browser authentication just to bypass group access.',
  ),

  heading(
    'h-login',
    'Can You Download Reels Without a Facebook Account?',
    2,
  ),
  paragraph(
    'p-lg-1',
    'If Facebook exposes the Reel publicly and the NovaLikes extractor can retrieve the media without authentication, the user should not need to provide a Facebook password.',
  ),
  paragraph(
    'p-lg-2',
    'Facebook itself says Public content can be visible to people off Facebook. (Facebook)',
    [{ href: FB_SELECT_AUDIENCE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lg-3',
    'But do not turn that into a promise that every Facebook Reel can always be downloaded without login.',
  ),
  paragraph(
    'p-lg-4',
    'Facebook can change web presentation, redirects, media URLs and unauthenticated-access behaviour.',
  ),
  paragraph(
    'p-lg-5',
    'The accurate product statement is: NovaLikes does not require your Facebook password for supported public Reel downloads.',
  ),

  heading('h-app', 'Do You Need to Install Anything?', 2),
  paragraph(
    'p-ap-1',
    'No. The normal NovaLikes workflow is web-based.',
  ),
  paragraph(
    'p-ap-2',
    'Use a browser, a Facebook Reel URL, the NovaLikes downloader and the available download.',
  ),
  paragraph(
    'p-ap-3',
    'No browser extension, Windows program, Android APK or iPhone app is required for the current tool.',
  ),
  paragraph(
    'p-ap-4',
    'Do not advertise an app that does not exist.',
  ),

  heading('h-mobile', 'Does It Work on Mobile?', 2),
  paragraph(
    'p-mb-1',
    'Yes, through the responsive NovaLikes web interface.',
  ),
  paragraph(
    'p-mb-2',
    'On mobile, open the Facebook Reel, copy its URL, open the NovaLikes tool, paste the link, retrieve the available media and save it through the browser or device download flow.',
  ),
  paragraph(
    'p-mb-3',
    'Where the file ends up can vary by browser, Android or iOS version and download settings.',
  ),
  paragraph(
    'p-mb-4',
    'Do not promise that every file appears in Gallery instantly. That is device-dependent.',
  ),

  heading('h-hd', 'Can You Download Facebook Reels in HD?', 2),
  paragraph(
    'p-hd-1',
    'When Facebook exposes a usable HD media version, NovaLikes can offer it.',
  ),
  paragraph(
    'p-hd-2',
    'But do not guarantee HD for every Reel.',
  ),
  paragraph(
    'p-hd-3',
    'Some sources may only expose SD, one available rendition or no usable media at all.',
  ),
  paragraph(
    'p-hd-4',
    'Correct wording is HD or SD when available, not that every Facebook Reel downloads in Full HD.',
  ),

  heading('h-1080', 'Can You Download Facebook Reels in 1080p?', 2),
  paragraph(
    'p-10-1',
    'Only if a supported 1080p rendition is actually available and the tool retrieves it.',
  ),
  paragraph(
    'p-10-2',
    'Do not add a 1080p guaranteed claim unless NovaLikes has verified that across the supported Reel sources.',
  ),
  paragraph(
    'p-10-3',
    'The tool should label what it actually gets, not what sounds better for SEO.',
  ),

  heading('h-4k', 'Can You Download Facebook Reels in 4K?', 2),
  paragraph(
    'p-4k-1',
    'Same rule.',
  ),
  paragraph(
    'p-4k-2',
    'Do not market the current tool as a 4K Facebook Reels Downloader unless the actual source and extractor reliably support 4K.',
  ),
  paragraph(
    'p-4k-3',
    'If Facebook only exposes SD or HD, show SD or HD.',
  ),
  paragraph(
    'p-4k-4',
    'A downloader does not magically create higher-resolution source media.',
  ),

  heading('h-only-sd', 'Why Is Only SD Available?', 2),
  paragraph('p-os-1', 'Possible reasons include:'),
  bullets('ul-sd', [
    'the source upload quality,',
    'the rendition Facebook currently exposes,',
    'or the specific media available through that public page.',
  ]),
  paragraph(
    'p-os-2',
    'If the only legitimate result is SD, show SD.',
  ),
  paragraph(
    'p-os-3',
    'Do not take an SD file, upscale it and label it Original HD. That would be misleading.',
  ),

  heading('h-improve', 'Does Downloading Improve Reel Quality?', 2),
  paragraph('p-im-1', 'No.'),
  paragraph(
    'p-im-2',
    'A downloader retrieves available media.',
  ),
  paragraph(
    'p-im-3',
    'It should not be described as an AI enhancer, upscaler, restoration system or quality booster unless NovaLikes adds and verifies such a feature separately.',
  ),
  paragraph(
    'p-im-4',
    'If the source is compressed, the downloaded file remains based on the available source.',
  ),

  heading(
    'h-watermark',
    'Can You Remove the Facebook Reel Watermark?',
    2,
  ),
  paragraph(
    'p-wm-1',
    'Do not expect that.',
  ),
  paragraph(
    'p-wm-2',
    'The NovaLikes Facebook Reels Downloader should retrieve the available video.',
  ),
  paragraph(
    'p-wm-3',
    'If that video contains logos, captions, creator branding or other embedded marks, the downloader should not claim to remove them automatically.',
  ),
  paragraph(
    'p-wm-4',
    'Download Reel and Remove Watermark are different products.',
  ),

  heading(
    'h-fb-watermark',
    'Does Facebook Put a Watermark on Downloaded Reels?',
    2,
  ),
  paragraph(
    'p-fw-1',
    "The exact output of Facebook's own native Reel-download feature can depend on Facebook's current implementation and the content.",
  ),
  paragraph(
    'p-fw-2',
    'The Meta sources reviewed here confirm that users can download Reels they shared but do not give us enough information to make one universal promise about every possible watermark, audio or output condition. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fw-3',
    'So do not add unsupported claims such as Facebook native downloads always have no watermark, or Facebook always adds a watermark.',
  ),
  paragraph(
    'p-fw-4',
    'Describe only what has been verified.',
  ),

  heading(
    'h-music',
    'What Happens to Music in a Downloaded Facebook Reel?',
    2,
  ),
  paragraph(
    'p-mu-1',
    'Be careful here too.',
  ),
  paragraph(
    'p-mu-2',
    "Facebook's Reels can include music, and Meta says its music use is governed by agreements with artists, songwriters and rights holders. (Facebook)",
    [{ href: FB_MUSIC, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-mu-3',
    'A Reel being playable on Facebook does not guarantee that music rights allow every external reuse, commercial redistribution or re-upload elsewhere.',
  ),
  paragraph(
    'p-mu-4',
    'A downloader should retrieve available media where supported. It should not imply that the user has acquired a license to the soundtrack.',
  ),

  heading('h-repost', 'Can You Repost a Downloaded Facebook Reel?', 2),
  paragraph(
    'p-rp-1',
    'Only when you have a legitimate right or permission to do so.',
  ),
  paragraph(
    'p-rp-2',
    'Meta advises users to share only content they have taken or have the right to share. (Facebook)',
    [{ href: FB_COMMUNITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rp-3',
    "Meta also states Facebook's rules prohibit intellectual-property infringement. (Facebook)",
    [{ href: FB_INTELLECTUAL_PROPERTY, label: 'Facebook', external: true }],
  ),
  paragraph('p-rp-4', 'Possible legitimate cases include:'),
  bullets('ul-repost', [
    'you made the Reel,',
    'you manage the business that owns it,',
    'the creator gave you permission,',
    'or the content license permits reuse.',
  ]),
  paragraph(
    'p-rp-5',
    'Downloading is not a copyright license.',
  ),

  heading(
    'h-business',
    "Can You Download Your Business Page's Reels?",
    2,
  ),
  paragraph(
    'p-bu-1',
    'If the Reel belongs to a Facebook profile or Page you legitimately manage, first check whether Facebook\'s native download option is available for that Reel.',
  ),
  paragraph(
    'p-bu-2',
    'Meta supports downloading Reels you shared yourself. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-bu-3',
    'That can be useful for archiving, re-editing, cross-channel workflows where rights allow or keeping company-owned media.',
  ),
  paragraph(
    'p-bu-4',
    'Use the native option when it solves the problem.',
  ),
  paragraph(
    'p-bu-5',
    "Use NovaLikes when you're working with a supported public URL and need the publicly available rendition.",
  ),

  heading("h-fail", "Why Doesn't My Facebook Reel Download?", 2),
  paragraph(
    'p-fa-1',
    'Several possible reasons exist.',
  ),
  paragraph(
    'p-fa-2',
    'The Reel may no longer be public, have been deleted, be restricted, use a malformed URL, not expose usable media, or Facebook may have changed how the content is delivered.',
  ),
  paragraph(
    'p-fa-3',
    'The correct NovaLikes behaviour is to return a useful error, not display a fake progress bar, generate an unrelated file or pretend the download succeeded.',
  ),

  heading('h-exposed', 'What Does Media Not Exposed Mean?', 2),
  paragraph(
    'p-ex-1',
    'This means the tool can identify the request or page context but cannot obtain a usable public Reel media source.',
  ),
  paragraph(
    'p-ex-2',
    'That can happen even when the page itself exists.',
  ),
  paragraph(
    'p-ex-3',
    'Page visibility and downloadable media exposure are not always the same technical thing.',
  ),
  paragraph(
    'p-ex-4',
    'If this happens, check the original Reel, confirm it is public, verify the URL and retry later if appropriate.',
  ),
  paragraph(
    'p-ex-5',
    'Do not ask the user to provide Facebook credentials, browser cookies or session tokens to force access.',
  ),

  heading('h-later', 'Can the Reel Become Unavailable Later?', 2),
  paragraph('p-lt-1', 'Yes.'),
  paragraph(
    'p-lt-2',
    "Facebook's audience system lets creators control who can see their posts. (Facebook)",
    [{ href: FB_CHOOSE_WHO, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lt-3',
    'A creator can also delete content.',
  ),
  paragraph(
    'p-lt-4',
    'So a Reel that was public when you saved its link may not remain public forever.',
  ),
  paragraph(
    'p-lt-5',
    "The downloader should respect the Reel's current accessibility, not the accessibility it had last week.",
  ),

  heading(
    'h-short',
    'Do Facebook Watch Short Links Work for Facebook Reels?',
    2,
  ),
  paragraph(
    'p-sh-1',
    "NovaLikes' Facebook extractor already supports valid Facebook watch short links that resolve to supported Reel media.",
  ),
  paragraph(
    'p-sh-2',
    'If a short Facebook URL resolves to a supported public Facebook Reel or media page, the tool can continue through its normal extraction flow.',
  ),
  paragraph(
    'p-sh-3',
    'If it resolves somewhere unsupported, return an error.',
  ),
  paragraph(
    'p-sh-4',
    'Do not let a short Facebook URL turn the downloader into a generic open redirect or fetch-anything proxy.',
  ),

  heading('h-validation', 'Why Does URL Validation Matter?', 2),
  paragraph(
    'p-va-1',
    'Because a downloader takes URLs from users.',
  ),
  paragraph(
    'p-va-2',
    'A secure implementation should not allow somebody to submit internal server addresses, localhost, private network IPs, cloud metadata endpoints or arbitrary external hosts and have your server fetch them.',
  ),
  paragraph(
    'p-va-3',
    "NovaLikes' existing tool architecture already uses host allowlisting, redirect validation, timeouts, size limits, signed download tokens and content-type enforcement.",
  ),
  paragraph(
    'p-va-4',
    'Users should paste a supported Facebook Reel URL, not Google Drive, YouTube, Dropbox, random file hosts or Instagram links.',
  ),

  heading(
    'h-vs-video',
    'Facebook Reels Downloader vs Facebook Video Downloader',
    2,
  ),
  paragraph(
    'p-vv-1',
    "This is a particularly interesting distinction after Facebook's September 2025 update.",
  ),
  paragraph(
    'p-vv-2',
    'Meta says all newly posted videos are now Reels. (Facebook)',
    [{ href: FB_REELS_TV, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-vv-3',
    'So technically, the content categories overlap much more than before.',
  ),
  paragraph(
    'p-vv-4',
    'But user intent still differs.',
  ),
  paragraph(
    'p-vv-5',
    'Someone searches Facebook Reel Downloader because the content appeared in Reels. Someone else searches Facebook Video Downloader because they think of it as a Facebook video.',
  ),
  paragraph(
    'p-vv-6',
    'NovaLikes can keep both dedicated landing pages for clear search intent, clear UX and existing SEO structure.',
  ),
  paragraph(
    'p-vv-7',
    "Just don't write content implying Facebook still has exactly the same old video-versus-Reel system it had years ago.",
  ),

  heading(
    'h-keep-both',
    'Why Keep Both NovaLikes Tools if All Videos Are Reels?',
    2,
  ),
  paragraph(
    'p-kb-1',
    "Because search behaviour and user terminology don't instantly change when a platform changes its product architecture.",
  ),
  paragraph(
    'p-kb-2',
    'Users still search Facebook video downloader and Facebook Reels downloader.',
  ),
  paragraph(
    'p-kb-3',
    'The two pages can help users reach the right utility from the terminology they already use.',
  ),
  paragraph(
    'p-kb-4',
    'The live tools still split by URL type: Reel paths and Reel share links on this page, watch and videos links on the video downloader.',
  ),
  paragraph(
    'p-kb-5',
    "Their content should acknowledge Facebook's current structure rather than contradict it.",
  ),

  heading('h-ig', 'Facebook Reel vs Instagram Reel', 2),
  paragraph(
    'p-ig-1',
    "Don't mix them.",
  ),
  paragraph(
    'p-ig-2',
    'They are both Meta products, but Facebook Reels and Instagram Reels have separate platform URLs, settings and downloader flows.',
  ),
  paragraph(
    'p-ig-3',
    'For example, Instagram currently has its own native public-Reel download settings and creator controls. (Facebook)',
    [{ href: FB_IG_REEL_DOWNLOAD, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ig-4',
    "NovaLikes' Facebook Reels Downloader should remain Facebook-specific.",
  ),
  paragraph(
    'p-ig-5',
    'Do not paste an Instagram link into this Facebook tool.',
  ),

  heading(
    'h-ig-tool',
    'Can You Download an Instagram Reel With the Facebook Tool?',
    2,
  ),
  paragraph('p-it-1', 'No.'),
  paragraph(
    'p-it-2',
    'Use the dedicated Instagram video downloader for supported Instagram public media.',
  ),
  paragraph(
    'p-it-3',
    'The Facebook Reels Downloader should reject unsupported Instagram hosts.',
  ),
  paragraph(
    'p-it-4',
    'This keeps tool intent, security and error messages clean.',
  ),

  heading('h-live', 'Can You Download Facebook LIVE as a Reel?', 2),
  paragraph(
    'p-lv-1',
    "Facebook's post-2025 video architecture increasingly uses Reels for uploaded video, but an active LIVE stream is still not the same as an ordinary completed public Reel file.",
  ),
  paragraph(
    'p-lv-2',
    "Do not advertise NovaLikes' Reels Downloader as a LIVE recorder or a way to download ongoing Facebook livestreams.",
  ),
  paragraph(
    'p-lv-3',
    'If an ended LIVE later exists as supported public video media, that is a different use case.',
  ),

  heading(
    'h-stories',
    'Can You Download Facebook Stories With the Reel Downloader?',
    2,
  ),
  paragraph(
    'p-st-1',
    'No claim should be made.',
  ),
  paragraph(
    'p-st-2',
    'Stories and Reels are different experiences.',
  ),
  paragraph(
    'p-st-3',
    'The current NovaLikes Facebook Reels Downloader should not become Reels plus Stories plus LIVE plus private-group video plus every Meta format just for marketing.',
  ),
  paragraph(
    'p-st-4',
    'Keep it focused.',
  ),

  heading('h-deleted', 'Can You Download Deleted Facebook Reels?', 2),
  paragraph('p-de-1', 'No.'),
  paragraph(
    'p-de-2',
    'Do not describe NovaLikes as a deleted-content archive, Facebook cache, wayback system or recovery service.',
  ),
  paragraph(
    'p-de-3',
    'If the Reel is deleted and no public supported media remains, the tool should fail. That is the correct result.',
  ),

  heading(
    'h-removed',
    'Can You Download Reels Removed for Copyright?',
    2,
  ),
  paragraph(
    'p-rm-1',
    "Do not position the tool as a way around Meta's copyright enforcement.",
  ),
  paragraph(
    'p-rm-2',
    'Facebook provides copyright enforcement and reporting systems for rights holders. (Facebook)',
    [{ href: FB_COPYRIGHT, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rm-3',
    'If Facebook removes media or makes it unavailable, NovaLikes should not claim it can resurrect the Reel.',
  ),

  heading(
    'h-notify',
    'Does Facebook Notify the Creator When You Download a Reel?',
    2,
  ),
  paragraph(
    'p-nf-1',
    'For your own Reel, Meta explicitly provides a download feature. (Facebook)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nf-2',
    'For third-party public-media retrieval, the official sources reviewed here do not establish a universal creator notification that NovaLikes can reliably promise either way.',
  ),
  paragraph(
    'p-nf-3',
    'So avoid a claim that the creator will never know. That privacy promise adds little value and could become wrong.',
  ),
  paragraph(
    'p-nf-4',
    'Better wording: no Facebook password is required, and the NovaLikes tool checks publicly available media.',
  ),

  heading(
    'h-anon',
    'Is a Facebook Reels Downloader Anonymous?',
    2,
  ),
  paragraph(
    'p-an-1',
    'Avoid the word anonymous as an absolute promise.',
  ),
  paragraph(
    'p-an-2',
    'A web tool still uses normal browser requests, your server, security logging and internet infrastructure.',
  ),
  paragraph(
    'p-an-3',
    'The real user benefit is: no Facebook login or password is required for supported public Reel URLs. That is enough.',
  ),

  heading('h-follow', 'Does Downloading a Reel Follow the Creator?', 2),
  paragraph('p-fo-1', 'No.'),
  paragraph(
    'p-fo-2',
    'The NovaLikes downloader should be read-only.',
  ),
  paragraph(
    'p-fo-3',
    'It should not follow, Like, comment, share or message the creator.',
  ),
  paragraph(
    'p-fo-4',
    'It only processes the submitted public media URL.',
  ),

  heading(
    'h-views',
    'Does Downloading a Reel Increase Its Views?',
    2,
  ),
  paragraph(
    'p-vi-1',
    "Don't promise that.",
  ),
  paragraph(
    'p-vi-2',
    'Meta provides separate metrics for Reel views, and merely retrieving a media file through a third-party public-media workflow should not be marketed as giving the creator another Reel view or boosting their engagement.',
  ),
  paragraph(
    'p-vi-3',
    'A downloader is not an engagement service. Keep it utility-only.',
  ),

  heading('h-free', 'Is the Facebook Reels Downloader Free?', 2),
  paragraph(
    'p-fr-1',
    "NovaLikes' Reels Downloader is part of the site's free tools.",
  ),
  paragraph(
    'p-fr-2',
    'There is no paid credit pack, API key, free trial, account signup or premium HD unlock for the normal web workflow.',
  ),
  paragraph(
    'p-fr-3',
    'The current value proposition is simpler: paste a public Reel link and retrieve available media.',
  ),

  heading('h-account', 'Do You Need a NovaLikes Account?', 2),
  paragraph(
    'p-ac-1',
    'No account or login system is required for the current free-tool workflow.',
  ),
  paragraph(
    'p-ac-2',
    'NovaLikes already operates guest-facing public tools. Keep the article aligned with the actual tool.',
  ),

  heading('h-fast', 'How Fast Is the Download?', 2),
  paragraph(
    'p-fs-1',
    'Do not promise instant downloads or a fixed number of seconds unless you measure and guarantee that.',
  ),
  paragraph(
    'p-fs-2',
    'Processing time can depend on Facebook response, redirects, media size, network conditions and server load.',
  ),
  paragraph(
    'p-fs-3',
    'The tool checks the URL and returns available media when it can retrieve it. That is factual.',
  ),

  heading('h-bulk', 'Can You Bulk Download Facebook Reels?', 2),
  paragraph(
    'p-bk-1',
    'The current tool handles one Reel URL at a time.',
  ),
  paragraph(
    'p-bk-2',
    'Do not expect a bulk Reel downloader, CSV upload, 100-Reel queue or creator-profile archive.',
  ),

  heading('h-iphone', 'How to Download a Facebook Reel on iPhone', 2),
  paragraph(
    'p-ip-1',
    'There are two situations.',
  ),
  heading('h-ip-own', "If It's Your Own Reel", 3),
  paragraph(
    'p-ip-2',
    "Use Facebook's native mobile Reel-download option when available. Meta specifically documents this on supported mobile apps. (Facebook)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  heading('h-ip-public', "If It's a Supported Public Reel", 3),
  paragraph(
    'p-ip-3',
    'Copy the Reel URL, open the NovaLikes Facebook Reels Downloader, paste the URL, retrieve the available media, then use Safari or iOS download handling.',
  ),
  paragraph(
    'p-ip-4',
    'Where the file appears depends on current iOS and browser settings.',
  ),

  heading('h-android', 'How to Download a Facebook Reel on Android', 2),
  paragraph(
    'p-ad-1',
    'Same principle.',
  ),
  paragraph(
    'p-ad-2',
    "For your own Reel, check Facebook's native Download reel option. (Facebook)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ad-3',
    'For another supported public Reel, copy the URL, open NovaLikes, paste the link and download the available media through the browser.',
  ),
  paragraph(
    'p-ad-4',
    'Do not tell users to install an APK. The web tool is enough.',
  ),

  heading('h-pc', 'How to Download a Facebook Reel on PC', 2),
  paragraph(
    'p-pc-1',
    "Meta's native own-Reel download feature is currently documented as mobile rather than computer functionality. (Facebook)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pc-2',
    'For a supported public Reel on desktop, copy the Facebook Reel URL, open the NovaLikes Facebook Reels Downloader, paste it, retrieve the available version, then save it through your browser.',
  ),
  paragraph(
    'p-pc-3',
    'No Facebook password should be required.',
  ),

  heading(
    'h-when-native',
    "When Should You Use Facebook's Native Download Instead?",
    2,
  ),
  paragraph(
    'p-wn-1',
    'Use Facebook\'s native option when the Reel is yours and Facebook shows the download function.',
  ),
  paragraph(
    'p-wn-2',
    'That keeps the process simple and first-party.',
  ),
  paragraph(
    'p-wn-3',
    "Use NovaLikes when you have a supported publicly accessible Reel URL, need the available media file, and Facebook's normal interface isn't offering the device-download workflow you need.",
  ),
  paragraph(
    'p-wn-4',
    "This article should not pretend NovaLikes is always better than Facebook's own feature. Use the right tool for the right situation.",
  ),

  heading('h-cta-section', 'Download a Public Facebook Reel', 2),
  paragraph(
    'p-ct-1',
    'This article has direct tool intent, so the next step is the free Reels Downloader rather than a Facebook follower, Page Like or Post Like package.',
  ),
  {
    id: 'cta-facebook-reels-downloader',
    type: 'internal_cta',
    order: nextOrder(),
    href: TOOL_HREF,
    heading: 'Download a Public Facebook Reel',
    description:
      'Paste a supported public Facebook Reel link to check the available media options. HD or SD may be shown depending on what Facebook exposes for the source.',
    label: 'Open Facebook Reels Downloader',
  },

  heading(
    'h-simple',
    'How to Download a Public Facebook Reel: Simple Version',
    2,
  ),
  paragraph('p-si-1', 'Use this workflow:'),
  numbered('ol-simple', [
    'Open the public Facebook Reel.',
    'Copy its link.',
    'Open the NovaLikes Facebook Reels Downloader.',
    'Paste the URL.',
    'Check the available public media.',
    'Choose HD or SD when available.',
    'Download.',
  ]),
  paragraph(
    'p-si-2',
    'If the Reel is private, deleted, restricted, unsupported, or Facebook does not expose usable media, the tool should return a clear error.',
  ),
  paragraph(
    'p-si-3',
    "And if the Reel belongs to you, remember that Facebook itself now provides a native download option for Reels you've shared on supported mobile devices. (Facebook)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook', external: true }],
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Since September 2025, Meta says all videos posted to Facebook are shared as Reels regardless of length or orientation.',
    'Facebook lets users download Reels they shared themselves to their device, with different behaviour depending on whether the content was posted before or after September 2025.',
    'Meta currently documents its own-Reel download feature as available on mobile rather than computers.',
    "Facebook's Public audience means anyone, including people off Facebook, can see the content.",
    'Facebook also lets publishers use more restricted audiences such as Friends or Only Me, so a public Reel downloader should not be represented as a privacy bypass.',
    'NovaLikes should offer HD or SD only when those media versions are actually exposed.',
    'No Facebook password is required for supported public-Reel downloads through NovaLikes.',
    'Publicly visible does not mean copyright-free; Facebook prohibits intellectual-property infringement.',
    "Downloading someone else's Reel and having permission to republish it are separate issues.",
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

export const HOW_TO_DOWNLOAD_FACEBOOK_REEL_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-to-download-facebook-reel',
  slug: SLUG,
  title: 'How to Download a Public Facebook Reel',
  excerpt:
    "Facebook Reels are now a much bigger part of Facebook's overall video experience.",
  content: CONTENT,
  blocks: BLOCKS,
  category: 'facebook',
  tags: ['creator', 'business', 'analytics'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'How to Download a Public Facebook Reel',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How to Download a Public Facebook Reel',
    description:
      'Learn how to download an available public Facebook Reel, when Facebook offers native downloads, and why some Reels cannot be retrieved.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'download Facebook Reel',
      'Facebook Reels downloader',
      'download public Facebook Reel',
      'save Facebook Reel to phone',
      'Facebook Reel download HD',
      'download Facebook Reel without login',
    ],
  },
  relatedServices: [],
  relatedArticles: ['how-to-download-facebook-video'],
  featured: true,
  published: true,
  status: 'published',
  scheduledAt: SCHEDULED_AT,
  editorialApproved: true,
  seoReviewed: true,
  contentReviewed: true,
  lastEditorialUpdate: SCHEDULED_AT,
  keyTakeaways: [
    'Your own Facebook Reel can use Facebook\'s native mobile download when available',
    'Public Reels can be seen by anyone, including people off Facebook',
    'Restricted Reels should not be treated as a privacy-bypass use case',
    'NovaLikes works with supported public Facebook Reel URLs when Facebook exposes usable media',
    'Publicly visible does not mean copyright-free',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How do I download a Facebook Reel?',
      answer:
        "If it's your own Reel, Facebook currently provides a native Download reel option on supported mobile devices. For a supported public Reel, you can copy the Reel URL and use the NovaLikes Facebook Reels Downloader to check the available media.",
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: "Can I download someone else's public Facebook Reel?",
      answer:
        'A public downloader can attempt to retrieve media Facebook exposes for the public URL, but downloading does not automatically give you copyright permission to republish the Reel. Facebook says users should only post content they created or have the right to share.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I download a private Facebook Reel?',
      answer:
        'NovaLikes should only process supported public Reel media. Facebook uses audience controls such as Public, Friends and Only Me, and the downloader should not be presented as a way to bypass those restrictions.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can I download Facebook Reels without logging in?',
      answer:
        'For supported public media, NovaLikes does not require your Facebook password. Facebook says Public content can be visible even to people off Facebook.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can I download Facebook Reels in HD?',
      answer:
        'When Facebook exposes an HD media rendition and the extractor supports it, NovaLikes can show HD. Do not guarantee HD for every Reel.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can I download my own Facebook Reel on PC?',
      answer:
        "Meta currently says its native own-Reel download feature isn't available on computers and documents mobile-app workflows instead.",
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Are all Facebook videos now Reels?',
      answer:
        'For videos posted from September 2025 onward, Meta says all videos posted to Facebook are shared as Reels regardless of length or orientation.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Can I repost a Reel after downloading it?',
      answer:
        "Only if you have the right to do so. Facebook prohibits content that infringes another person's intellectual-property rights.",
      schemaEligible: true,
    },
    {
      id: 'faq-9',
      question: "Why won't a Facebook Reel download?",
      answer:
        'It may be private, deleted, unsupported, malformed, unavailable, or Facebook may not expose usable media for that Reel. The tool should return an honest error rather than fabricate a file.',
      schemaEligible: true,
    },
    {
      id: 'faq-10',
      question: 'Does NovaLikes require my Facebook password?',
      answer:
        'No. The public Facebook Reels Downloader workflow does not require your Facebook password.',
      schemaEligible: true,
    },
  ],
};
