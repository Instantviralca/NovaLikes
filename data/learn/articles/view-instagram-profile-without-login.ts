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
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Reader-copy revision (batches 24–25): internal writing notes rewritten for readers. */
const REVISED_AT = '2026-10-10T20:00:00.000Z';
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
    "Yes, you can view a public Instagram profile without logging in. Instagram treats basic profile information as public, and anyone can open a public account's web address. What no tool can do is show a private account's posts, Stories or follower list without the owner's approval.",
  ),
  paragraph(
    'p-open-4',
    "Meta says information including a user's name, username, profile picture, bio, links and number of followers and following is public to everyone on or off Instagram, including people who don't have an Instagram account. (Instagram Help Center)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-open-5',
    "For public accounts, Meta also says anyone can view the profile and its public posts by visiting the account's Instagram web address. (Instagram Help Center)",
    [{ href: IG_WEB_PROFILE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-open-8',
    'The Instagram Profile Viewer checks the public identity snapshot Instagram already shows: photo, name, bio and published count labels when those fields are exposed. It does not list posts, Stories or Highlights, and it does not unlock private-account content.',
    [{ href: TOOL_HREF, label: 'Instagram Profile Viewer' }],
  ),
  paragraph(
    'p-open-10',
    'No Instagram password is required, and the rule is simple: a public-profile viewer is for public information, not a private-account unlocker.',
  ),

  heading(
    'h-public-fields',
    'What Instagram Profile Information Can You See Without Logging In?',
    2,
  ),
  paragraph(
    'p-mn-2',
    "People who search for this usually want to check a username, see a profile picture, read a public bio, check a follower count or see public posts. Those tasks are different from logging into somebody else's account, accessing private posts, seeing restricted Stories, reading DMs or bypassing follower approval.",
  ),
  paragraph(
    'p-pf-1',
    'Meta currently lists several profile fields as information anyone can see:',
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
    'Some other profile-related information can also appear depending on the account and features. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pf-4',
    'Even a private account keeps this public-facing layer. Private does not mean nothing about the account exists publicly; account privacy mainly controls access to protected content and related account experiences. (Instagram Help Center)',
    [{ href: IG_PUBLIC_VS_PRIVATE, label: 'Instagram Help Center', external: true }],
  ),
  figure(
    'fig-layers',
    `${IMAGE_DIR}/profile-layers.png`,
    'An Instagram profile has a public information layer for username, name, picture, bio, links and counts, while private-account posts stay restricted',
    'Public profile information and private account content are different layers.',
  ),

  heading(
    'h-public-account',
    'What Can You See on a Public Instagram Account?',
    2,
  ),
  paragraph(
    'p-pa-1',
    'Meta says that if an Instagram account is public, anyone can see its profile and posts through its Instagram web URL, which is instagram.com plus the username. (Instagram Help Center)',
    [{ href: IG_WEB_PROFILE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pa-4',
    'Public profiles, posts and Reels can also be embedded on other websites when embedding is enabled. (Instagram Help Center)',
    [{ href: IG_EMBED, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-di-2',
    'Public does not automatically mean embeddable everywhere, though. Meta says users with public accounts can turn off the setting that lets external websites embed their profile and content. (Instagram Help Center)',
    [{ href: IG_TURN_OFF_EMBED, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pa-6',
    'The Profile Viewer still focuses on the public identity snapshot. It does not become a full post archive just because Instagram itself can show public posts on the web. An embed places Instagram content inside another page, a profile viewer presents public-profile information, and a downloader saves supported public media; each answers a different question.',
  ),

  heading(
    'h-prompt',
    'Why Does Instagram Ask You to Log In?',
    2,
  ),
  paragraph(
    'p-br-3',
    "Instagram controls its own web interface, which Meta's Help Center documents at instagram.com. (Instagram Help Center)",
    [{ href: IG_ON_THE_WEB, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pp-2',
    'Even though certain profile information is classified as public, Instagram can still decide how much browsing it shows before login, how pages load and which interactions need an account. It can change login prompts, rate limits and page presentation, and no outside tool can stop it showing its own prompts. What you can rely on is narrower: certain public profile information can be viewed without an Instagram login.',
  ),

  heading(
    'h-how',
    'How to View an Instagram Profile Without Logging In',
    2,
  ),
  numbered('ol-simple', [
    "Find the account's username, such as nasa, rather than relying only on the display name NASA.",
    'Open the Instagram Profile Viewer.',
    'Enter the username, with or without the @ sign, or a public profile URL.',
    'Run the check.',
    'Review the available profile details.',
  ]),
  paragraph(
    'p-hw-6',
    'Depending on what the public source currently exposes, you can review the photo, display name, username, biography and published Followers, Following and Posts labels when Instagram includes them. No Instagram password should be required.',
  ),
  paragraph(
    'p-sr-1',
    'Instagram Search helps users discover accounts, topics and other content when you are not sure which account you want. If you already know the username, a direct lookup is simpler.',
  ),
  paragraph(
    'p-hw-8',
    'If Instagram does not expose usable public data for that profile, the tool shows an error instead of guessing.',
  ),
  figure(
    'fig-how',
    `${IMAGE_DIR}/viewer-workflow.png`,
    'Instagram Profile Viewer workflow: enter a username, check public profile information, then review the available details',
    'No Instagram password required. Public information only.',
  ),

  heading(
    'h-private',
    'Can You View a Private Instagram Profile Without Logging In?',
    2,
  ),
  paragraph(
    'p-pr-1',
    'Only its basic profile information. Meta says the username, name, profile picture, bio, links and follower or following counts remain visible regardless of account privacy. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pr-3',
    "So private means content access is restricted rather than the profile becoming invisible, and the account's protected posts do not become available. Instagram's privacy settings exist specifically so users can restrict who sees their posts, Reels and Stories. (Instagram Help Center)",
    [{ href: IG_MAKE_PRIVATE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pr-4',
    'The Profile Viewer currently checks public profiles Instagram already exposes. Private, hidden or login-gated profiles can return an error instead of a snapshot.',
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
      ['Profile Viewer result', 'Public snapshot when exposed', 'Can error if Instagram does not expose the profile'],
    ],
  },
  paragraph(
    'p-hi-4',
    'Our guide to public vs private Instagram accounts covers the same distinction in more detail.',
    [
      {
        href: '/learn/public-vs-private-instagram-account',
        label: 'public vs private Instagram accounts',
      },
    ],
  ),

  heading(
    'h-unlock',
    'Can an Instagram Profile Viewer Unlock Private Posts?',
    2,
  ),
  paragraph(
    'p-un-2',
    'No. No legitimate profile viewer can show private posts, unlock private Reels, reveal hidden Stories, skip follow requests or open a private account. If you want to see private-account content, the legitimate route is to send a follow request and wait for the account owner to approve it.',
  ),
  paragraph(
    'p-ag-2',
    "The same applies to other account controls. If another user has blocked your Instagram account, the viewer is not a way around that decision, and it does not get around age limits either. Meta has documented that certain profile or content visibility can depend on age restrictions. (Instagram Help Center)",
    [{ href: IG_AGE_RESTRICTED, label: 'Instagram Help Center', external: true }],
  ),
  figure(
    'fig-access',
    `${IMAGE_DIR}/public-vs-private.png`,
    'Public Instagram accounts can show public posts, while private accounts keep protected content restricted even though basic profile information remains public',
    'Account privacy controls content access, not the existence of basic public profile information.',
  ),

  heading(
    'h-count',
    "Can You See a Private Account's Profile Picture and Follower Count?",
    2,
  ),
  paragraph(
    'p-dp-1',
    'Yes. Both are on the list of information Meta says anyone can see, even for private accounts. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-ct-2',
    'A visible count is not the follower list, though. You may see that an account shows 25K followers, or an abbreviated label such as 104M on a large account, without being able to browse the people behind that number. The Profile Viewer does not show that list.',
  ),
  paragraph(
    'p-dp-2',
    'If you only want the picture, shown larger, use the Instagram Profile Picture Viewer. Our guide on how to view an Instagram profile picture in full size covers that workflow.',
    [
      { href: PICTURE_TOOL_HREF, label: 'Instagram Profile Picture Viewer' },
      {
        href: '/learn/view-instagram-profile-picture-full-size',
        label: 'view an Instagram profile picture in full size',
      },
    ],
  ),
  paragraph(
    'p-ct-4',
    'If you only need a follower number, the Instagram Follower Counter is a quicker, focused check, and our guide explains how to check an Instagram follower count without logging in.',
    [
      { href: COUNTER_HREF, label: 'Instagram Follower Counter' },
      {
        href: '/learn/check-instagram-follower-count-without-login',
        label: 'check an Instagram follower count without logging in',
      },
    ],
  ),

  heading(
    'h-anon',
    'Can You View an Instagram Profile Anonymously?',
    2,
  ),
  paragraph(
    'p-nf-1',
    "Instagram's public profile-information documentation does not describe ordinary profile viewing as an action that sends the profile owner a visitor notification. (Instagram Help Center)",
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-an-1',
    'That is not the same as anonymity. Be wary of any tool that promises to be 100% anonymous and untraceable, because a website still involves network connections, server requests, security systems and ordinary operational logs. No website can honestly promise that nobody will ever know.',
  ),
  paragraph(
    'p-an-3',
    'What NovaLikes can say is narrower: no Instagram password is required, and the viewer is read-only. It does not use your Instagram account, and it does not follow, send a follow request, Like, comment on or message the profile you check, so the follower count stays the same.',
  ),
  paragraph(
    'p-wv-1',
    'The tool also works in one direction only. It looks up a profile and cannot show who viewed yours, so be cautious with any tool that claims it can.',
  ),

  heading(
    'h-password',
    'Should an Instagram Profile Viewer Ask for Your Password?',
    2,
  ),
  paragraph(
    'p-pw-2',
    'No. The viewer does not log into Instagram for you and does not ask for your Instagram password, two-factor authentication code, session cookie, backup code or login approval. If all you want is information Meta categorizes as public, there is no reason to hand over those credentials, and doing so puts your account security at risk.',
  ),

  heading(
    'h-posts',
    'Can You View Instagram Posts, Reels or Stories Without Logging In?',
    2,
  ),
  paragraph(
    'p-po-1',
    "Sometimes, on Instagram itself. For public accounts, Meta says public posts can be visible through the account's web profile. (Instagram Help Center)",
    [{ href: IG_WEB_PROFILE, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-rl-2',
    "Instagram's no-login behaviour varies, so not every Reel will play without an account, and Stories and Highlights have their own visibility rules. The Profile Viewer covers none of them. It returns the profile snapshot only, and it is not a post archive, Story viewer or download-all-media tool.",
  ),
  paragraph(
    'p-rl-3',
    "If you want to download a public Instagram video or Reel, use the separate Instagram Video / Reels Downloader where supported. The Profile Viewer does not download media.",
    [{ href: VIDEO_TOOL_HREF, label: 'Instagram Video / Reels Downloader' }],
  ),

  heading(
    'h-business',
    'Can You View Business, Creator or Celebrity Profiles?',
    2,
  ),
  paragraph(
    'p-bu-2',
    'Yes, if they are public. Business accounts can also display additional public business information and action buttons depending on their setup. (Instagram Help Center)',
    [{ href: IG_BUSINESS_BUTTON, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-ce-2',
    'The viewer has no special celebrity database, verification system or extra access; it checks every public username the same way. That makes it useful for confirming you found the right brand profile or reviewing a public bio, links and profile picture.',
  ),

  heading(
    'h-limits',
    "What Can't a Public Profile Viewer Tell You?",
    2,
  ),
  paragraph(
    'p-fk-2',
    "Basic public information has limits. The viewer gives no fake-account score, bot probability or trust rating. A similar username, brand logo or large follower count is not the same as official verification, so check for a verified badge on Instagram itself. A profile viewer can show supported public information, but it cannot work out whether someone's identity is genuine.",
  ),
  paragraph(
    'p-in-2',
    "At a basic level, public information is enough to review a competitor's bio positioning, profile naming, links or broad profile presentation. The viewer cannot show another account's Instagram Insights, sales estimates, audience demographics or engagement data. Those are account-owner analytics, not part of a public profile.",
  ),
  paragraph(
    'p-ru-4',
    'Finally, visibility is not ownership. A public profile picture, brand logo, photo or Reel does not become your property, and copyright, trademark and personality-right issues may apply if you republish or reuse it.',
  ),

  heading(
    'h-unavailable',
    'Why Does the Profile Viewer Show an Error?',
    2,
  ),
  paragraph(
    'p-ua-1',
    'The tool shows Profile not found or another clear error rather than guessing a near-match or making up details. Possible reasons include:',
  ),
  bullets('ul-unavailable', [
    'the username is incorrect,',
    'the profile was removed,',
    'the account changed usernames,',
    'Instagram changed its page response,',
    'the request was temporarily blocked,',
    'or the expected public data was not exposed.',
  ]),
  paragraph(
    'p-ua-3',
    'These cases look similar from the outside, and an error does not automatically mean the account is private. When Instagram changes how it exposes public information, lookups can fail for a while; the tool shows an error rather than filling the gap with made-up details, because an honest error is more useful than a wrong result.',
  ),
  paragraph(
    'p-rn-2',
    'Lookups work only with a current username or public profile URL. Display names are not unique in the same way: the display name NASA is different from the username nasa, and another account could use NASA Fan. The tool does not search by real name, email address or phone number, keep username history or old snapshots, or recover deleted profiles and posts. If you only know a name, find the account on Instagram first.',
  ),

  heading('h-tool-facts', "What the Profile Viewer Does and Doesn't Do", 2),
  bullets('ul-tool-facts', [
    'It is free, with no paid version, trial, signup or NovaLikes account.',
    'It needs no Meta API credentials, developer tokens or third-party login.',
    'It checks one username or profile URL at a time, with no bulk monitoring or scraping.',
    'It shows the profile as it is at that moment and does not track changes over time.',
  ]),
  paragraph(
    'p-is-2',
    "If Instagram's public web profile already gives you exactly what you need, use Instagram. The viewer is meant for a quick, focused lookup, not as a replacement.",
  ),

  heading('h-cta-section', 'View a Public Instagram Profile', 2),
  paragraph(
    'p-cs-1',
    'If you want to check a profile now, the free Instagram Profile Viewer is the next step.',
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

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Meta says name, username, profile picture, bio, links and follower and following numbers are public to everyone on or off Instagram, including people without an account.',
    'For a public Instagram account, Meta says anyone can see the profile and public posts through its Instagram web URL.',
    'Making an account private restricts posts, Reels and Stories; it does not make every basic profile field invisible.',
    'A public profile viewer cannot unlock private posts, Stories, DMs or restricted follower lists.',
    'No Instagram password is required, but no website can honestly promise a completely untraceable visit.',
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
    alt: 'A public Instagram profile showing name, bio and follower count, viewed without an Instagram login',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: REVISED_AT,
  showModifiedDate: true,
  seo: {
    title: 'View a Public Instagram Profile Without Logging In',
    description:
      'Learn how to view available public Instagram profile information without logging in, what stays public, and what you cannot access on private accounts.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'view Instagram profile without login',
      'view Instagram without account',
      'Instagram viewer without login',
      'what is public on an Instagram profile',
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
        'Meta classifies some basic profile fields as public even on private accounts, but private-account content remains restricted. The Profile Viewer checks public profiles Instagram already exposes, and a private or login-gated lookup can return an error.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can an Instagram Profile Viewer show private posts?',
      answer:
        "No. The viewer is not a private-content bypass. Private-account content remains subject to Instagram's privacy settings.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do I need an Instagram password to use NovaLikes Profile Viewer?',
      answer:
        'No. The public-profile lookup does not require your Instagram password.',
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
        "Meta's public profile-information guidance does not describe ordinary profile viewing as an action that sends a profile-visitor notification. Even so, no website can promise that a visit is completely untraceable.",
      schemaEligible: true,
    },
    {
      id: 'faq-9',
      question: 'Can I view Instagram Reels without logging in?',
      answer:
        "Public Reels can form part of Instagram's public web content, and Meta allows public Reels to be embedded when embedding is enabled. However, Instagram's no-login web experience can vary, so not every Reel is guaranteed to play without an account.",
      schemaEligible: true,
    },
    {
      id: 'faq-10',
      question: 'Can the Profile Viewer show deleted Instagram profiles?',
      answer:
        'No. The tool does not recover deleted or historical profiles. If the current public profile is unavailable, it shows an error.',
      schemaEligible: true,
    },
  ],
};
