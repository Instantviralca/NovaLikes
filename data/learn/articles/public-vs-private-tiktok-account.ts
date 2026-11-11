/**
 * Article #13 — Public vs Private TikTok Accounts: What Actually Changes?
 * Scheduled: Monday 21 September 2026.
 * Informational privacy/discovery intent. Distinct from /buy-tiktok-followers.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'public-vs-private-tiktok-account';
const SCHEDULED_AT = '2026-09-21T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_PUBLIC_OR_PRIVATE =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/making-your-account-public-or-private';
const TT_DUETS =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/duets';
const TT_VIDEO_VISIBILITY =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/video-visibility';
const TT_UNDER_18 =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/privacy-and-safety-settings-for-users-under-age-18';
const TT_PRIVACY_SETTINGS =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings';

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
    'Making a TikTok account private is often described as hiding it, but that is not quite what happens. The setting decides who can follow you, who can watch your videos, and whether other people can reuse your content. It does not remove your profile from TikTok.',
  ),
  paragraph(
    'p-2',
    'TikTok\'s own help page on public and private accounts says that with either setting, people can still search for you, and your name, username and profile photo stay visible. What changes is how much of the account a stranger can see and do.',
    [
      { href: TT_PUBLIC_OR_PRIVATE, label: 'public and private accounts', external: true },
    ],
  ),
  heading('h-what-a-private-tiktok-account-does', 'What a Private TikTok Account Does', 2),
  paragraph(
    'p-3',
    'With a private account, you approve every person who wants to follow you. Only approved followers can watch your videos and LIVEs, read your bio, and see your likes and your follower and following lists. Anyone else who finds your profile sees the basics and a button to request a follow.',
  ),
  paragraph(
    'p-4',
    'This suits personal accounts, accounts for friends and family, and anyone who wants to know exactly who is watching. The cost is that new people have very little to go on before they decide whether to request access.',
  ),
  paragraph(
    'p-5',
    'Private accounts also turn off several ways other people can use your content. Other users cannot Duet or Stitch your videos, and they cannot download them through TikTok.',
  ),
  figure(
    'fig-compare',
    `${IMAGE_DIR}/public-vs-private-tiktok.png`,
    'Public vs Private TikTok: broader visibility versus an approved audience',
    'Private does not mean completely invisible. Name, username and profile photo can still remain visible.',
  ),
  heading('h-what-a-public-tiktok-account-does', 'What a Public TikTok Account Does', 2),
  paragraph(
    'p-6',
    'A public account lets anyone watch your videos, follow you without approval, and share your content on or off TikTok, within the limits of your other settings. Your videos can also be shown to people who do not follow you, including on the For You feed and in search results.',
  ),
  paragraph(
    'p-7',
    'Public does not mean you lose control. TikTok lets you set visibility for each video, so a public account can still post a video for friends only or keep one visible only to yourself. Account privacy and post privacy are two separate layers, and it is worth using both.',
    [
      { href: TT_VIDEO_VISIBILITY, label: 'visibility for each video', external: true },
    ],
  ),
  heading('h-can-people-still-find-a-private-tiktok-a', 'Can People Still Find a Private TikTok Account?', 2),
  paragraph(
    'p-8',
    'Yes, and this is the most common misunderstanding. A private account still appears in search, and your name, username and profile photo remain visible. TikTok may also suggest your account to people through contacts and mutual connections unless you change the suggested account settings.',
  ),
  paragraph(
    'p-9',
    'So going private is not the same as disappearing. It is closer to locking the door: people can find the house, but they need your permission to come in.',
  ),
  figure(
    'fig-invisible',
    `${IMAGE_DIR}/private-not-invisible.png`,
    'Private TikTok is not invisible: search can find the profile, then a follow request is needed for restricted content',
    'Privacy controls access, not necessarily discoverability of the basic profile.',
  ),
  heading('h-does-a-private-account-get-fewer-followe', 'Does a Private Account Get Fewer Followers?', 2),
  paragraph(
    'p-10',
    'TikTok does not publish any figure for this, but the mechanics make the answer clear. On a public account, a viewer can enjoy a video, open your profile, watch a few more and follow in a few seconds. On a private account, they see almost nothing, send a request and wait for you to approve it. Some will never bother.',
  ),
  paragraph(
    'p-11',
    'That extra step is the purpose of the setting, not a flaw. It also explains why creators who want to grow usually keep their accounts public. If you are already public and still get views without followers, our guide on why TikTok views do not always turn into followers looks at the other reasons this happens.',
    [
      { href: '/learn/tiktok-views-but-no-followers', label: 'why TikTok views do not always turn into followers' },
    ],
  ),
  heading('h-does-going-private-hurt-the-for-you-feed', 'Does Going Private Hurt the For You Feed?', 2),
  paragraph(
    'p-12',
    'TikTok does not punish accounts for choosing a privacy setting. A private account simply restricts who can watch its videos, so they are not shown to the wide audience that public videos can reach. Your approved followers still see your content as normal.',
  ),
  paragraph(
    'p-13',
    'The reverse is also true. Making an account public opens the door to the For You feed and search, but it does not decide how far a video travels. That still depends on how people respond to it and how clearly it matches what they are looking for. Our guide to TikTok SEO covers the search side in more detail.',
    [
      { href: '/learn/tiktok-seo', label: 'TikTok SEO' },
    ],
  ),
  heading('h-duet-stitch-and-downloads', 'Duet, Stitch and Downloads', 2),
  paragraph(
    'p-14',
    'TikTok says you need a public account to allow Duets, and the same rule applies to Stitch. If your strategy depends on other creators reacting to, responding to or building on your videos, going private switches that off entirely.',
    [
      { href: TT_DUETS, label: 'public account to allow Duets', external: true },
    ],
  ),
  paragraph(
    'p-15',
    'Private accounts also stop other people downloading your videos through TikTok. Public accounts can turn downloads off separately in the privacy settings. Keep in mind that no setting can stop someone who can see a video from recording their screen, so post with that in mind.',
  ),
  figure(
    'fig-changes',
    `${IMAGE_DIR}/what-changes-private.png`,
    'What changes when a TikTok account goes from public to private: followers, content, Duet, Stitch and basic profile search',
    'Privacy changes access and reuse, not every part of profile visibility.',
  ),
  heading('h-what-happens-to-your-existing-followers', 'What Happens to Your Existing Followers?', 2),
  paragraph(
    'p-16',
    'Switching to private does not remove anyone who already follows you. They keep access as approved followers. If there are people you no longer want to see your content, remove them one by one from your follower list. New followers from that point on will need your approval.',
  ),
  paragraph(
    'p-17',
    'Switching back to public works the same way in reverse. Your followers stay, and new people can follow freely again. Before you do it, scroll through your older videos. Something you were happy to share with a small approved audience may not be something you want strangers to see.',
  ),
  heading('h-teen-accounts-have-different-defaults', 'Teen Accounts Have Different Defaults', 2),
  paragraph(
    'p-18',
    'TikTok applies stricter privacy settings for users under 18. Accounts for younger teens are set to private by default, and features such as direct messages, Duet and Stitch are limited by age. Some of these settings cannot be changed. For teenagers, those protections matter far more than follower growth.',
    [
      { href: TT_UNDER_18, label: 'privacy settings for users under 18', external: true },
    ],
  ),
  heading('h-which-setting-should-you-choose', 'Which Setting Should You Choose?', 2),
  paragraph(
    'p-19',
    'Choose public if you want new people to discover your videos. That includes creators, brands, businesses and anyone who wants Duets and Stitches or plans to grow an audience. Use post level visibility for the occasional video you want to keep limited.',
  ),
  paragraph(
    'p-20',
    'Choose private if the account is mainly for people you know, if you want to approve every follower, or if you want to limit how your videos are reused and shared.',
  ),
  paragraph(
    'p-21',
    'Whichever you choose, the privacy toggle is only one part of the picture. Comments, Duets, Stitches, downloads, messages and suggested accounts all have their own controls in TikTok\'s privacy settings, and it is worth checking them whenever you change account type.',
    [
      { href: TT_PRIVACY_SETTINGS, label: 'TikTok\'s privacy settings', external: true },
    ],
  ),
  heading('h-how-to-change-your-account-privacy', 'How to Change Your Account Privacy', 2),
  numbered('ol-1', [
    'Go to your profile and tap the menu icon.',
    'Tap Settings and privacy, then Privacy.',
    'Turn Private account on or off.',
  ]),
  paragraph(
    'p-22',
    'TikTok sometimes renames menus, so follow the wording in your app if it looks slightly different. If the toggle is greyed out, your age or account type may limit the option.',
  ),
  {
      id: 'cta-tt-followers',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-tiktok-followers',
      heading: 'Using a Public TikTok Profile?',
      description:
        'NovaLikes TikTok follower orders use the public profile information required for the selected service. You do not need to provide your TikTok password.',
      label: 'View TikTok Followers',
    },
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

export const PUBLIC_VS_PRIVATE_TIKTOK_ACCOUNT_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-public-vs-private-tiktok-account',
  slug: SLUG,
  title: 'Public vs Private TikTok Accounts: What Actually Changes?',
  excerpt:
    'A private TikTok account lets you approve followers and blocks Duets, Stitches and downloads, but your profile can still be found in search. Here is what each setting changes.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'algorithm', 'creator', 'engagement', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Two phones compared: a public TikTok profile visible worldwide and a private profile locked to approved followers',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'Public vs Private TikTok Accounts: What Changes?',
    description:
      'Learn what changes when a TikTok account is public or private, including followers, video visibility, Duet, Stitch, search and account discovery.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'public vs private TikTok account',
      'TikTok private account',
      'TikTok public account',
      'what happens when TikTok is private',
      'can people find private TikTok accounts',
      'private TikTok followers',
      'TikTok privacy settings',
    ],
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'tiktok-seo',
    'how-to-get-1000-tiktok-followers',
    'how-many-followers-to-go-live-on-tiktok',
    'why-tiktok-followers-drop',
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
    'On a private account you approve every follower, and only they can see your videos, bio, likes and follower lists.',
    'Private accounts can still be found in search, with name, username and profile photo visible.',
    'Public accounts can reach people who do not follow you, including on the For You feed.',
    'You can set visibility for individual videos on both public and private accounts.',
    'Duet and Stitch only work on public accounts.',
    'Going private is not a penalty, and going public does not decide how far a video travels.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is the difference between a public and private TikTok account?',
      answer:
        'On a public account anyone can watch your videos and follow you. On a private account you approve each follower, and only approved followers can see your videos, bio, likes and follower lists.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can people find a private TikTok account?',
      answer:
        'Yes. Private accounts still appear in search, and your name, username and profile photo stay visible. People just cannot see your content until you approve their follow request.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Does making TikTok private hurt the For You feed?',
      answer:
        'TikTok does not penalize private accounts. Private videos are only shown to approved followers, so they do not reach the wider audience that public videos can.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can people Duet or Stitch a private TikTok account?',
      answer:
        'No. TikTok only allows Duet and Stitch on videos from public accounts.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does going private remove my existing followers?',
      answer:
        'No. Current followers stay. You can remove individual followers yourself if you want to.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can a public account have private videos?',
      answer:
        'Yes. You can set the visibility of each video separately, so a public account can still post videos for friends only or for yourself.',
      schemaEligible: true,
    },
  ],
};
