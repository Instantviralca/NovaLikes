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
/** Reader-copy revision (batches 24–25): internal writing notes rewritten for readers. */
const REVISED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;
const TOOL_HREF = '/tools/facebook-video-downloader';
const REELS_TOOL_HREF = '/tools/facebook-reels-downloader';

const FB_SAVE_VIDEO = 'https://www.facebook.com/help/283351151337206';
const FB_DOWNLOAD_REEL = 'https://www.facebook.com/help/1005944300373812';
const FB_SELECT_AUDIENCE = 'https://www.facebook.com/help/211513702214269';

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
    'p-1',
    'Facebook makes videos easy to watch but not always easy to keep. The Save option you see on a video does not put a file on your device. It bookmarks the video inside Facebook so you can find it again later. If you want an actual video file on your phone or computer, you need a download.',
  ),
  paragraph(
    'p-2',
    'This guide covers how to download a public Facebook video, when Facebook\'s own download options are the better choice, why some videos will not download, and what rights you have over the file afterwards.',
  ),
  heading('h-save-video-vs-download-video', 'Save Video vs Download Video', 2),
  paragraph(
    'p-3',
    'Facebook describes Save video as a way to watch something later. The video goes into your Saved items in the app, and it disappears from there if the creator deletes it or changes who can see it. No file is created on your device.',
    [
      { href: FB_SAVE_VIDEO, label: 'Save video', external: true },
    ],
  ),
  paragraph(
    'p-4',
    'A download is different. It stores a copy of the video file in your Downloads folder, camera roll or Files app, so you can watch it offline or use it in an edit, provided you have the right to.',
  ),
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
  heading('h-only-public-videos-can-be-downloaded', 'Only Public Videos Can Be Downloaded', 2),
  paragraph(
    'p-5',
    'Every Facebook post has an audience. Facebook\'s help page on choosing an audience explains that Public means anyone can see it, including people who are not on Facebook. Friends, Only Me, custom lists and private groups all restrict who can watch.',
    [
      { href: FB_SELECT_AUDIENCE, label: 'choosing an audience', external: true },
    ],
  ),
  paragraph(
    'p-6',
    'The NovaLikes downloader only works with public videos. It cannot open Friends only videos, private group posts or anything that needs you to be logged in, and it never asks for your Facebook password. If a video is not public, it cannot be downloaded with this tool.',
  ),
  paragraph(
    'p-7',
    'Audiences can also change. A video that was public last week may be Friends only today, and the old link will stop working.',
  ),
  figure(
    'fig-public',
    `${IMAGE_DIR}/public-vs-restricted.png`,
    'Public Facebook videos can be viewed through a public audience, while Friends or private videos stay access-controlled',
    "A downloader should respect the video's existing Facebook audience settings.",
  ),
  heading('h-how-to-download-a-public-facebook-video', 'How to Download a Public Facebook Video', 2),
  numbered('ol-1', [
    'Open the video on Facebook and check it plays normally.',
    'Tap Share and choose Copy link.',
    'Open the NovaLikes Facebook Video Downloader.',
    'Paste the link and start the check.',
    'Choose HD or SD from the options shown.',
    'Save the file to your device.',
  ]),
  paragraph(
    'p-8',
    'On iPhone the file usually ends up in the Files app, and on Android in the Downloads folder. On a computer, check your browser\'s downloads list. No app, extension or account is needed.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/downloader-workflow.png`,
    'How the Facebook Video Downloader works: copy a public video link, paste it into NovaLikes, check available HD or SD media, then download',
    'Public videos only. No Facebook password required.',
  ),
  heading('h-hd-sd-and-video-quality', 'HD, SD and Video Quality', 2),
  paragraph(
    'p-9',
    'The downloader shows the versions Facebook makes available for that video. Many videos come in both HD and SD, some only in SD. If HD is not offered, it is usually because the original upload was low resolution or Facebook only provides a smaller version for that post.',
  ),
  paragraph(
    'p-10',
    'The tool does not upscale, sharpen or relabel files. What you download is the same quality Facebook serves. There is no 4K option, and a low quality upload cannot be turned back into a sharp original. File size depends on length, resolution and compression, so it is not a reliable sign of quality on its own.',
  ),
  heading('h-downloading-your-own-videos-and-lives', 'Downloading Your Own Videos and LIVEs', 2),
  paragraph(
    'p-11',
    'If the video is yours, Facebook\'s own tools are often simpler. In the Facebook app on iPhone and Android, you can download a Reel you shared directly. You can also download your own LIVE videos from your video library once the broadcast ends, and export copies of your posts, photos and videos through Download your information.',
    [
      { href: FB_DOWNLOAD_REEL, label: 'download a Reel you shared', external: true },
    ],
  ),
  paragraph(
    'p-12',
    'Act quickly with LIVE recordings. Since February 2025, Facebook keeps new LIVE videos for 30 days and then removes them automatically, so download any you want to keep before then.',
    [
      { href: 'https://about.fb.com/news/2025/02/updating-our-facebook-live-video-storage-policy/', label: 'keeps new LIVE videos for 30 days', external: true },
    ],
  ),
  paragraph(
    'p-13',
    'The NovaLikes tool does not record streams that are still running, and it is not a Story downloader. For your own Stories, use the save options in your Story archive.',
  ),
  heading('h-videos-and-reels-use-different-links', 'Videos and Reels Use Different Links', 2),
  paragraph(
    'p-14',
    'In 2025 Facebook renamed its Videos tab to Reels, and new videos are now shared as Reels. Older videos still open from watch or video links, while newer ones usually open as Reel links.',
    [
      { href: 'https://www.facebook.com/help/276515126152168', label: 'renamed its Videos tab to Reels', external: true },
    ],
  ),
  paragraph(
    'p-15',
    'That is why NovaLikes has a separate tool for each. This page is for watch links and Page video links. If you have a Reel link, use the Facebook Reels Downloader instead. Our guide on downloading Facebook Reels walks through that version.',
    [
      { href: REELS_TOOL_HREF, label: 'Facebook Reels Downloader' },
      { href: '/learn/how-to-download-facebook-reel', label: 'downloading Facebook Reels' },
    ],
  ),
  heading('h-why-a-download-might-fail', 'Why a Download Might Fail', 2),
  paragraph(
    'p-16',
    'When a video cannot be downloaded, the tool shows an error rather than a broken file. The usual reasons are:',
  ),
  bullets('ul-2', [
    'The video is no longer public, or it was deleted.',
    'The link is incomplete or points to something other than a video.',
    'The video sits inside a private group or behind a login.',
    'Facebook has not made a downloadable version available for that link.',
  ]),
  paragraph(
    'p-17',
    'If you see an error, open the link in a private browser window. If it does not play there without logging in, it is not public. Deleted videos cannot be recovered, and the tool does not keep copies of anything.',
  ),
  heading('h-public-does-not-mean-free-to-reuse', 'Public Does Not Mean Free to Reuse', 2),
  paragraph(
    'p-18',
    'Being able to watch or download a video does not give you any rights to it. People who post on Facebook keep the rights to what they create. Public only controls who can see a post. It does not make the video free to repost, edit into your own content, sell or use in ads.',
  ),
  paragraph(
    'p-19',
    'Reasonable uses include keeping your own content, saving material your business owns, and keeping a copy the creator has allowed you to have. Reposting someone else\'s video without permission can lead to copyright reports and removal under Facebook\'s rules. Downloading also does not remove watermarks, captions or logos. They stay in the file as they appear on Facebook.',
  ),
  paragraph(
    'p-20',
    'If you only want to watch something again later, Save video is the simpler option. Download when you need the file and have the right to keep it.',
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
    'How to download a public Facebook video to your phone or computer, how it differs from Save video, when HD is available, and what you can and cannot do with the file.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'facebook',
  tags: ['creator', 'business', 'analytics'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Three steps: a public Facebook video, its facebook.com/watch link, and the available file saved to a folder',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: REVISED_AT,
  showModifiedDate: true,
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
    'Save video bookmarks a video inside Facebook. Downloading puts a file on your device.',
    'Only videos shared with a Public audience can be downloaded with the NovaLikes tool.',
    'HD appears only when Facebook makes an HD version available.',
    'Facebook lets you download your own Reels in the app and your own LIVEs from your video library.',
    'New Facebook LIVE videos are deleted after 30 days, so download them early.',
    'Public videos are still owned by their creators, so download only what you have the right to use.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How do I download a public Facebook video?',
      answer:
        'Copy the video link from Facebook, paste it into the NovaLikes Facebook Video Downloader, choose HD or SD if available, and save the file to your device.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Is Save video the same as downloading?',
      answer:
        'No. Save video keeps a bookmark inside Facebook so you can watch it later. Downloading stores a copy of the file on your phone or computer.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I download private or Friends only Facebook videos?',
      answer:
        'No. The NovaLikes tool only works with public videos and never asks for your Facebook login.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Why is only SD available?',
      answer:
        'The downloader can only offer the versions Facebook makes available for that video. If the upload was low resolution, there may be no HD version.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Where do downloaded Facebook videos go on my phone?',
      answer:
        'On iPhone they usually go to the Files app, and on Android to the Downloads folder. Check your browser\'s downloads list if you cannot find the file.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can I repost a Facebook video I downloaded?',
      answer:
        'Only if you own it or have permission from the creator. A public video is still owned by the person who made it.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Can I download my own Facebook LIVE video?',
      answer:
        'Yes. Go to your video library after the broadcast ends and download it. New LIVE videos are removed after 30 days, so do it before then.',
      schemaEligible: true,
    },
  ],
};
