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
/** Reader-copy revision (batches 24–25): internal writing notes rewritten for readers. */
const REVISED_AT = '2026-10-10T20:00:00.000Z';
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
    "To download a Facebook Reel you shared yourself, use the Download reel option in the Facebook app on iPhone or Android, which Meta documents in the Facebook Help Center. To download a public Reel posted by someone else, copy its link and paste it into the Facebook Reels Downloader, which checks whether Facebook exposes usable media for that public URL. No Facebook password should be required for this public-media workflow.",
    [
      { href: FB_DOWNLOAD_REEL, label: 'Facebook Help Center', external: true },
      { href: TOOL_HREF, label: 'Facebook Reels Downloader' },
    ],
  ),
  paragraph(
    'p-open-10',
    "Publicly visible does not mean copyright-free. Only download a Reel you own or have clear permission to use: the tool works only with media Facebook already exposes for a Reel URL, it does not bypass privacy settings or passwords, and downloading a file never transfers ownership. Facebook prohibits posting content that infringes other people's intellectual-property rights. (Facebook Help Center)",
    [{ href: FB_INTELLECTUAL_PROPERTY, label: 'Facebook Help Center', external: true }],
  ),

  heading('h-what', 'What Is a Facebook Reel in 2026?', 2),
  paragraph(
    'p-wh-4',
    "Facebook used to keep regular videos, short-form Reels and LIVE videos fairly separate. Meta says that in June 2025 it renamed the Videos tab to Reels, and that all videos posted to Facebook are shared as Reels, regardless of length or orientation. So a vertical 20-second clip is a Reel, and so is a longer landscape video uploaded through Facebook's normal video workflow. (Facebook Help Center)",
    [{ href: FB_REELS_TV, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-wh-8',
    'This matters when you are choosing between a Facebook video download and a Facebook Reel download. People still search for both, depending on whether they found the clip in Reels or think of it as an ordinary video. The formats overlap, but the links Facebook uses still differ, and the tools split by URL type: a Reel path or Reel share link belongs on the Reels downloader, while a watch or videos link belongs on the Facebook Video Downloader.',
    [{ href: VIDEO_TOOL_HREF, label: 'Facebook Video Downloader' }],
  ),
  paragraph(
    'p-wh-9',
    'General questions that apply to every Facebook video, such as whether you need an account or an app, watermarks, short links, business use and deleted videos, are covered in our guide on how to download a public Facebook video.',
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
    'Before June 2025 Facebook Videos and Reels were separate tabs; from June 2025 all new Facebook videos are shared as Reels, in any length or orientation',
    "Facebook's video system changed, but users still search for both video and Reel downloads.",
  ),

  heading('h-own', 'How to Download Your Own Facebook Reel on iPhone or Android', 2),
  paragraph(
    'p-ow-1',
    "If the Reel belongs to you, start with Facebook's native option. Meta documents this process in the Facebook app on iPhone and Android:",
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
    'This should be your first choice for your own Reel, because there is no reason to use an outside tool when Facebook already gives you the option. The same applies to Reels on a profile or Page you legitimately manage, where a native download is useful for archiving, re-editing or keeping company-owned media. (Facebook Help Center)',
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-fw-2',
    "Meta confirms that you can download Reels you shared, but it does not say what every downloaded file will contain in terms of watermarks or audio. Be wary of claims that native downloads never have a watermark, or always do, and check the file yourself before you rely on it. (Facebook Help Center)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook Help Center', external: true }],
  ),

  heading(
    'h-desktop',
    'Can You Download a Facebook Reel on a Computer?',
    2,
  ),
  paragraph(
    'p-dt-1',
    "Not with Facebook's own feature. Meta's Help Center says the option to download a Reel you shared is not available on computers and points users to the Facebook mobile apps instead. (Facebook Help Center)",
    [{ href: FB_DOWNLOAD_REEL, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-dt-3',
    "A web-based public Reel downloader does work from a desktop browser. Copy the Facebook Reel URL, paste it into the downloader, retrieve the available version and save it through your browser. That is useful when you are working on a computer and have a supported public Reel link, but for your own Reel, Facebook's mobile option remains the first-party route.",
  ),

  heading(
    'h-how',
    'How to Download a Public Facebook Reel',
    2,
  ),
  paragraph(
    'p-how-1',
    'For a supported Reel that is publicly available, the steps are the same on a phone or a computer:',
  ),
  numbered('ol-how', [
    'Open the Reel on Facebook and make sure it is genuinely accessible. If Facebook says the content is unavailable or you do not have permission to view it, a public downloader cannot retrieve it.',
    "Copy the Reel's URL with Facebook's share or copy-link controls. The tool accepts Reel paths, Reel share links and Facebook watch short links that resolve to Reel media.",
    'Open the NovaLikes Facebook Reels Downloader and paste the URL.',
    'Start the check. The tool looks at whether Facebook currently exposes usable media for that public Reel.',
    'Choose an available version, such as HD or SD, and save it to your device.',
  ]),
  paragraph(
    'p-how-13',
    'You do not sign in to Facebook or create an account at any step, and the downloader is read-only: it does not follow, like, comment on or message the creator, and downloading is not a way to add views to the Reel. It handles one Reel URL at a time.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/reels-workflow.png`,
    'How the Facebook Reels Downloader works: copy a Reel link, paste it into NovaLikes, check available HD or SD media, then download',
    'Public Reels only. No Facebook password required.',
  ),

  heading('h-mobile', 'Where Does a Downloaded Reel Go on iPhone and Android?', 2),
  paragraph(
    'p-mb-3',
    'On a phone, the downloader runs in your mobile browser, so you do not need to install an app or APK. Where the file ends up can vary by browser, iOS or Android version and download settings.',
  ),
  paragraph(
    'p-mb-4',
    'On iPhone the file usually goes to the Files app, where Share and then Save Video moves it to Photos. On Android it usually lands in Downloads and shows up in your gallery.',
  ),

  heading(
    'h-save',
    'What Is the Difference Between Saving and Downloading a Facebook Reel?',
    2,
  ),
  paragraph(
    'p-sv-2',
    "Facebook's Save feature is an in-Facebook bookmark: it keeps the Reel in your saved items so you can come back to it later. A download gives you an actual video file on your device, either through Facebook's native option for your own Reels or through a downloader for other public Reels. In short, Save keeps the Reel inside Facebook, while Download puts a media file on your phone or computer.",
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
      ['Public Reel URL', 'The Reels Downloader can check exposed media'],
    ],
  },

  heading('h-hd', 'Can You Download Facebook Reels in HD?', 2),
  paragraph(
    'p-hd-1',
    'Only when Facebook exposes an HD file for that Reel. The tool shows the HD and SD labels Facebook provides, so 1080p is not guaranteed and it is not a 4K Reels downloader. Some sources only expose SD, one rendition or no usable media at all, depending on the original upload quality and the rendition Facebook currently serves for that public page.',
  ),
  paragraph(
    'p-im-3',
    'Downloading does not improve quality either. The tool retrieves the available media as it is; it is not an upscaler, enhancer or restoration tool, and it will not relabel an SD file as HD. If the source is compressed, the downloaded file is too.',
  ),

  heading(
    'h-someone',
    "Can You Download Someone Else's Public Facebook Reel?",
    2,
  ),
  paragraph(
    'p-se-1',
    "Technically, a public Reel downloader can try to retrieve the media Facebook exposes for that URL. Whether you can reuse the file is a separate copyright and permission question. Facebook's audience selector defines Public as content anyone can see, including people off Facebook, which tells you about visibility, not that the media is royalty-free or yours to reuse. A creator who makes a Reel public lets people watch it; that does not transfer ownership to anyone who saves a copy. (Facebook Help Center)",
    [{ href: FB_SELECT_AUDIENCE, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-se-5',
    "Facebook's Community Guidelines say users should only post content they created themselves or have the right to share. Legitimate reasons to repost include making the Reel yourself, managing the business that owns it, having the creator's permission, or a licence that permits reuse. (Facebook Help Center)",
    [{ href: FB_COMMUNITY, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-cf-5',
    'Meta also advises that the safest way to avoid copyright infringement is to post content you created yourself, so do not repost a downloaded Reel as your own. (Facebook Help Center)',
    [{ href: FB_AVOID_COPYRIGHTED, label: 'Facebook Help Center', external: true }],
  ),
  figure(
    'fig-rights',
    `${IMAGE_DIR}/visibility-vs-rights.png`,
    'A public Facebook Reel can be viewable by anyone, while creator ownership and permission still control reuse',
    'Public access answers whether you can see it, not automatically whether you can reuse it.',
  ),

  heading(
    'h-music',
    'What Happens to Music in a Downloaded Facebook Reel?',
    2,
  ),
  paragraph(
    'p-mu-2',
    "Reels can include music, and Meta says its music use is governed by agreements with artists, songwriters and rights holders. A Reel being playable on Facebook does not mean those rights allow re-uploading elsewhere or commercial reuse, and a downloader does not give you a licence to the soundtrack. (Facebook Help Center)",
    [{ href: FB_MUSIC, label: 'Facebook Help Center', external: true }],
  ),

  heading('h-private', 'Can You Download a Private Facebook Reel?', 2),
  paragraph(
    'p-pr-2',
    'No. Facebook lets publishers control who can see content through audience settings such as Public, Friends and Only Me, and private groups limit access in the same way. (Facebook Help Center)',
    [{ href: FB_CHOOSE_WHO, label: 'Facebook Help Center', external: true }],
  ),
  paragraph(
    'p-pr-3',
    'The NovaLikes Reels Downloader is not a private-content bypass. If a Reel needs a login, is Friends-only or sits in a private group, the tool cannot unlock it, and it never asks for Facebook session cookies, credentials or exported browser data to force access. It returns an error for private, deleted or login-only Reels rather than inventing a file.',
  ),

  heading('h-other', 'Which Facebook Content Can the Reels Downloader Not Handle?', 2),
  paragraph(
    'p-st-3',
    "The tool handles Facebook Reels only. Even though Facebook now uses Reels for uploaded video, an active LIVE stream is not the same as a completed public Reel file, so the downloader is not a LIVE recorder. It does not download Stories or private-group videos, and for your own Stories you can use Facebook's archive options. It also rejects Instagram links, since Instagram Reels have their own URLs, settings and native download controls. (Instagram Help Center)",
    [{ href: FB_IG_REEL_DOWNLOAD, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-rm-2',
    "It is also not a way around Meta's copyright enforcement. Facebook runs copyright reporting systems for rights holders, and if Facebook removes a Reel or makes it unavailable, a downloader cannot bring it back. (Facebook Help Center)",
    [{ href: FB_COPYRIGHT, label: 'Facebook Help Center', external: true }],
  ),

  heading("h-fail", "Why Doesn't My Facebook Reel Download?", 2),
  paragraph(
    'p-fa-2',
    'The Reel may no longer be public, may have been deleted or restricted, the URL may be malformed, the Reel may not expose usable media, or Facebook may have changed how the content is delivered. A Reel that was public when you copied its link can later be made private or deleted by the creator. In each case the tool shows an error instead of a fake progress bar or an unrelated file.',
  ),
  paragraph(
    'p-ex-1',
    'A "media not exposed" error means the tool can see the request or page but cannot obtain a usable public media source, which can happen even when the Reel page exists. Page visibility and downloadable media are not always the same technical thing. Open the original Reel, check that it is still public, confirm the URL and try again later. A downloader can only work with what is accessible now, not what was accessible last week.',
  ),
  paragraph(
    'p-va-3',
    'The tool only fetches from approved Facebook hosts and checks redirects, timeouts, file size and file type before offering a download. Paste a Facebook Reel URL, not a Google Drive, YouTube, Dropbox or Instagram link.',
  ),

  heading(
    'h-when-native',
    "When Should You Use Facebook's Native Download Instead?",
    2,
  ),
  paragraph(
    'p-wn-1',
    "Use Facebook's native option when the Reel is yours and Facebook shows the download function, since it keeps the process simple and first-party. Use a public Reel downloader when you have a supported public Reel URL, need the available file, and Facebook's own interface does not offer the download you need, for example on a computer.",
  ),

  heading('h-cta-section', 'Download a Public Facebook Reel', 2),
  paragraph(
    'p-ct-1',
    'If you want to download a public Reel now, the free Reels Downloader is the next step.',
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
    alt: 'Three steps: a public Facebook Reel, its facebook.com/reel link, and the available file saved to a folder',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: REVISED_AT,
  showModifiedDate: true,
  seo: {
    title: 'How to Download a Public Facebook Reel',
    description:
      'Learn how to download an available public Facebook Reel, when Facebook offers native downloads, and why some Reels cannot be retrieved.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'download Facebook Reel',
      'download your own Facebook Reel',
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
    'Restricted Reels cannot be downloaded with a public tool',
    'The Facebook Reels Downloader works with supported public Reel URLs when Facebook exposes usable media',
    'Publicly visible does not mean copyright-free',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How do I download a Facebook Reel?',
      answer:
        "If it's your own Reel, Facebook currently provides a native Download reel option on supported mobile devices. For a supported public Reel, you can copy the Reel URL and use the Facebook Reels Downloader to check the available media.",
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
        'No. The Reels Downloader only processes supported public Reel media. Facebook uses audience controls such as Public, Friends and Only Me, and the downloader cannot get around those restrictions.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can I download Facebook Reels without logging in?',
      answer:
        'For supported public media, the Reels Downloader does not require your Facebook password. Facebook says Public content can be visible even to people off Facebook.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can I download Facebook Reels in HD?',
      answer:
        'When Facebook exposes an HD version, the tool shows an HD option. HD is not available for every Reel.',
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
        'Yes, for new videos. Meta says that since June 2025, all videos posted to Facebook are shared as Reels regardless of length or orientation.',
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
        'It may be private, deleted, unsupported, malformed, unavailable, or Facebook may not expose usable media for that Reel. In that case, the tool shows an error instead of a file.',
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
