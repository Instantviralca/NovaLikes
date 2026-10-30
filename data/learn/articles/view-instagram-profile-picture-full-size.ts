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
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Reader-copy revision (batches 24–25): internal writing notes rewritten for readers. */
const REVISED_AT = '2026-10-10T20:00:00.000Z';
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
    "To view an Instagram profile picture in full size, enter the account's username into a profile picture viewer, which shows the available image larger than the small circle in the app. Full size has a limit, though. Instagram stores profile pictures at a small size, so you get the largest version Instagram makes available, not the original photo.",
  ),
  paragraph(
    'p-open-4',
    'Meta currently says certain Instagram profile information is always public, whether the account itself is public or private. That includes the name, username, profile picture, bio, links and follower and following counts. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-open-7',
    'So making an account private does not make its profile picture private in the way it restricts posts. A private account is not the same thing as a private profile picture.',
  ),

  heading('h-small', 'Why Are Instagram Profile Pictures So Small?', 2),
  paragraph(
    'p-sm-1',
    'Instagram uses profile pictures as identity markers. You see them as small circular thumbnails next to posts, beside comments, in Stories, in messages and at the top of profiles, rather than as a photo you can open and inspect like a Feed post.',
  ),

  heading('h-size', 'What Size Is a Full-Size Instagram Profile Picture?', 2),
  paragraph(
    'p-sm-3b',
    "Instagram doesn't publish the exact size, but profile pictures are widely reported to be stored at about 320 × 320 pixels and shown at around 110 pixels across in the app. So “full size” usually means roughly 320 pixels wide, not the original photo.",
  ),
  paragraph(
    'p-or-2',
    "Instagram may process an uploaded profile photo for its own platform use. Meta's profile-picture documentation explains how users upload or change the photo, but it does not promise third parties access to the creator's untouched original camera file. (Instagram Help Center)",
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-can-5',
    'A viewer cannot manufacture detail that never existed in the available image. Do not expect 4K enhancement, the original camera file or unlimited resolution from any tool.',
  ),

  heading('h-how', 'How to View an Instagram Profile Picture in Full Size', 2),
  paragraph(
    'p-can-2',
    'The free Instagram Profile Picture Viewer works in any browser, including on mobile, with nothing to install.',
    [{ href: TOOL_HREF, label: 'Instagram Profile Picture Viewer' }],
  ),
  numbered('ol-simple', [
    "Find the account's username, for example nasa rather than the display name NASA.",
    'Open the Instagram Profile Picture Viewer.',
    'Enter the username or profile URL, with or without the @.',
    'Run the search.',
    'View the larger available image, and download it if you need a copy.',
  ]),
  paragraph(
    'p-un-6',
    "Use the username rather than the display name, because many accounts can share similar or identical display names. If the username doesn't exist, the tool shows an error; it will not show someone else's picture or present the closest match as the account you asked for.",
  ),
  paragraph(
    'p-how-10',
    "No Instagram password should be required for this workflow, and the tool does not ask for one. If Instagram doesn't expose usable profile-picture media for the lookup, the tool shows an error instead of an image.",
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/how-viewer-works.png`,
    'How the Instagram Profile Picture Viewer works: enter a username, find the public profile, then view the larger picture',
    'No Instagram password required.',
  ),

  heading(
    'h-private-pic',
    "Can You See a Private Instagram Account's Profile Picture?",
    2,
  ),
  paragraph(
    'p-pp-1',
    'Yes. Meta explicitly says certain profile information is always public for both public and private Instagram accounts, including the profile picture. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pp-3',
    'What changes with a private account is access to its posts. Meta says private-account profiles and posts on the web are available to logged-in Instagram users whom the account owner has approved to follow them. (Instagram Help Center)',
    [{ href: IG_WEB_PROFILE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-tp-3',
    'The NovaLikes lookup still depends on Instagram exposing usable media, and Instagram can change rate limits, login prompts and page behaviour. Private, hidden or login-gated profiles can return an error instead of an image.',
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
  figure(
    'fig-vs',
    `${IMAGE_DIR}/profile-picture-vs-post.png`,
    'Instagram profile pictures are public identity markers, while Feed posts can follow account privacy rules',
    'A profile picture and a private Instagram post do not follow the same visibility rules.',
  ),

  heading(
    'h-table',
    'What Stays Public on a Private Instagram Account?',
    2,
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
    "Meta's list of information anyone can see also covers links, follower and following counts and, where applicable, a Threads username and channels someone has created or joined. Account privacy separately controls access to posts. (Instagram Help Center)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-ne-3',
    "That is why a profile-picture viewer can work without access to anyone's private post library. A public profile picture does not make private Reels, posts or Stories public, and it gives no permission to bypass the account's follower controls.",
  ),

  heading(
    'h-private-posts',
    'Can a Profile Picture Viewer Show Private Posts?',
    2,
  ),
  paragraph(
    'p-po-4',
    'No. A legitimate profile-picture tool cannot unlock private photos, show private posts anonymously, bypass Instagram privacy or reveal hidden Stories just because the profile picture itself is public.',
  ),
  paragraph(
    'p-by-3',
    'Viewing a public profile picture is not a privacy bypass. A bypass would mean accessing information the account owner has restricted, such as private posts without approval, and a viewer that only shows what Instagram itself classifies as public does not do that.',
  ),
  paragraph(
    'p-ap-3',
    "You don't need to follow the account or wait for the owner's approval to see the profile picture. Approval only becomes relevant for private-account content that Instagram restricts to approved followers. (Instagram Help Center)",
    [{ href: IG_WEB_PROFILE, label: 'Instagram Help Center', external: true }],
  ),

  heading(
    'h-hide',
    'Does Making Instagram Private Hide Your Profile Picture?',
    2,
  ),
  paragraph(
    'p-hi-3',
    'No, and this is one of the most common misunderstandings. Meta says the profile picture stays among the information anyone can see even when an account is private, and that this information is public to people on or off Instagram, including those without an Instagram account. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-hi-5',
    "If you don't want strangers seeing a particular image, change the profile picture itself rather than relying on a private account to hide it. Instagram lets users change their profile picture through Edit Profile or Accounts Center. (Instagram Help Center)",
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-se-1',
    'Not every profile picture appears in Google Images, because indexing is up to the search engine. Still, a profile picture can be accessible outside the app: Meta explains that search engines can process publicly visible Instagram profile information under their own systems. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  figure(
    'fig-private',
    `${IMAGE_DIR}/private-account-does-not-hide-everything.png`,
    'A private Instagram account still has public profile information such as username, name, profile picture and bio, while posts stay restricted',
    'Account privacy restricts content, but some profile information remains public.',
  ),

  heading('h-blurry', 'Why Does an Enlarged Profile Picture Look Blurry?', 2),
  paragraph(
    'p-bl-2',
    "The account owner may have uploaded a small, heavily compressed or tightly cropped image, or one with fine detail that doesn't survive at thumbnail size. Combined with the small stored size, that puts a hard ceiling on how sharp an enlarged picture can be.",
  ),
  paragraph(
    'p-bl-6',
    'A larger view makes the available image easier to inspect, but it cannot recreate detail that was never there. The NovaLikes viewer does not use AI enhancement and does not invent missing pixels.',
  ),

  heading('h-screenshot', 'Can You Zoom In on an Instagram Profile Picture?', 2),
  paragraph(
    'p-zo-1',
    "Not easily inside the app. Instagram's ordinary profile presentation is designed around the avatar rather than a traditional image-gallery experience, so a viewer that shows the available image on its own is the cleaner option.",
  ),
  paragraph(
    'p-ss-1',
    'It also beats a screenshot. If you screenshot a profile picture that appears as a 100-pixel-looking circle and enlarge it, you are only magnifying the pixels already on your screen. A viewer uses the available profile-image source instead, which gives a more useful result when a larger version exists. It is still not restored original camera quality.',
  ),

  heading(
    'h-old',
    'Can You See Old or Deleted Instagram Profile Pictures?',
    2,
  ),
  paragraph(
    'p-old-1',
    'No. The viewer retrieves the current available profile picture only. It is not an archive, a deleted-content recovery service or a forensic tool, so it cannot show previous avatars, deleted images or profile-picture history.',
  ),

  heading(
    'h-download',
    'Can You Download an Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-dl-1',
    'When Instagram exposes the public image, the viewer can offer a download of that available file. Viewing or downloading a publicly visible image does not transfer ownership or usage rights, and copyright, publicity, trademark and other rights can still apply.',
  ),
  paragraph(
    'p-rs-2',
    "For ordinary identification that may not matter, but for republishing, consider whether you have permission. Don't use someone else's profile photo for impersonation, deceptive accounts, harassment or misleading commercial representation.",
  ),

  heading(
    'h-why',
    'Why View an Instagram Profile Picture Larger?',
    2,
  ),
  paragraph(
    'p-wh-1',
    'The common legitimate reasons are confirming which similarly named profile belongs to a business, creator or organization, inspecting a company logo that is hard to read in the small circle, and reviewing logo clarity or cropping as a social media manager. A larger image may also simply be easier to see, and profile imagery can help tell official accounts from unofficial ones.',
  ),
  paragraph(
    'p-bs-2',
    'Business and creator profiles work the same way. Meta documents professional accounts separately, including the public-facing category information they can display, and their logos and headshots are public profile pictures like any other. (Instagram Help Center)',
    [{ href: IG_PROFESSIONAL_ACCOUNTS, label: 'Instagram Help Center', external: true }],
  ),

  heading(
    'h-change',
    'How Do You Change Your Instagram Profile Picture?',
    2,
  ),
  paragraph(
    'p-gd-1',
    'If your own picture looks blurry or poorly cropped, uploading a better source image does more than enlarging the existing one. Because the picture is usually shown small, clear subjects, simple shapes, good contrast and no tiny text work best. For a business, a logo mark that stays recognizable inside a small circle beats a detailed wide logo squeezed into the avatar.',
  ),
  numbered('ol-change', [
    'Go to your profile.',
    'Open Edit profile.',
    'Choose Edit picture or avatar.',
    'Select or upload the image you want.',
    'Save the change.',
  ]),
  paragraph(
    'p-fb-1',
    "Instagram also allows changes through Accounts Center, and Meta's documentation says you can import the picture you already use on your Facebook profile. (Instagram Help Center)",
    [{ href: IG_CHANGE_PROFILE_PICTURE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-fb-2',
    'For consistent branding across Meta accounts, Accounts Center also offers optional profile syncing. (Instagram Help Center)',
    [{ href: IG_SYNC_PROFILE, label: 'Instagram Help Center', external: true }],
  ),

  heading(
    'h-notify',
    'Does Instagram Notify Someone When You View Their Profile Picture?',
    2,
  ),
  paragraph(
    'p-nt-1',
    "Instagram's Help Center documents profile information as publicly viewable and does not describe viewing a profile picture as an action that notifies anyone, unlike interactive actions such as following or commenting. (Instagram Help Center)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-an-3',
    "The viewer is read-only. It does not log into anyone's account, follow, send a follow request, Like, message or change anything. Websites still run normal infrastructure such as server logs, security controls and rate limiting, so no tool can honestly promise that a visit is completely untraceable.",
  ),

  heading('h-tool-facts', "What the Profile Picture Viewer Does and Doesn't Do", 2),
  bullets('ul-tool-facts', [
    'It is free, with no signup, trial, credit pack or premium unlock.',
    'It needs no API key, Meta developer access or browser extension.',
    'It works in any browser, including on mobile, and there is no separate iOS or Android app.',
    'It accepts a username or profile URL, but not a post, Reel, hashtag or Stories link.',
    'It looks up the current username only, so brandname and brand_name are treated as different accounts.',
    'It does not add followers, change the follower count or help an account grow.',
  ]),
  paragraph(
    'p-vv-3',
    'If you want more than the image, the Instagram Profile Viewer reviews the wider public profile information, such as the name and bio. Each tool does one job, even though both start with an Instagram username.',
    [
      {
        href: '/tools/instagram-profile-viewer',
        label: 'Instagram Profile Viewer',
      },
    ],
  ),
  paragraph(
    'p-pw-3',
    'Be cautious with any tool that asks for your Instagram password, a verification code or account authorization just to show public profile information.',
  ),

  heading('h-cta-section', 'View an Instagram Profile Picture', 2),
  paragraph(
    'p-ct-1',
    'If you want to view a profile picture now, the free viewer is the next step.',
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

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Instagram profile pictures are part of the profile information Meta says anyone can see, including for private accounts.',
    'Private-account posts remain restricted to approved followers; a public profile picture does not make private posts public.',
    'Full size means the larger version actually available, widely reported at about 320 × 320 pixels, not the original camera file.',
    'Enlarging cannot add detail, and a profile-picture viewer cannot bypass private Instagram content.',
    'No Instagram password is required to view a public profile picture.',
    'Viewing a profile picture does not follow, Like, message or otherwise modify the target account.',
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
    alt: 'A small Instagram profile thumbnail next to the larger profile picture that is publicly available',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: REVISED_AT,
  showModifiedDate: true,
  seo: {
    title: 'How to View an Instagram Profile Picture in Full Size',
    description:
      'Learn how Instagram profile pictures work, what stays public on private accounts, and how to view an available profile picture at a larger size.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'view Instagram profile picture full size',
      'why Instagram profile pictures are small',
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
        "You can use a profile-picture viewer to display the profile picture that is publicly available for an Instagram account at a larger size. Instagram doesn't publish the exact size, but it is widely reported to be about 320 × 320 pixels.",
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
        'No. A profile-picture viewer only handles the profile image and public profile information. Instagram restricts private posts to approved followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Do I need to give NovaLikes my Instagram password?',
      answer:
        'No. The profile picture viewer uses public profile information only and does not require your Instagram password.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: "Can I see someone's old Instagram profile pictures?",
      answer:
        'No. The viewer shows the current available profile picture. It is not an archive of deleted or previous profile photos.',
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
