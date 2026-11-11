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
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Reader-copy revision (batches 24–25): internal writing notes rewritten for readers. */
const REVISED_AT = '2026-10-10T20:00:00.000Z';
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
    "Yes, you can check an Instagram follower count without logging in. Instagram treats the number as public profile information, so you only need the account's username. You don't need an Instagram account of your own, and no Instagram password is required.",
  ),
  paragraph(
    'p-open-4',
    'Meta currently lists the number of followers and following among Instagram profile information that is always public. This applies to both public and private accounts, and Meta says this information can be visible to people on or off Instagram, including people without an Instagram account. (Instagram Help Center)',
    [{ href: IG_PUBLIC_PROFILE_INFO, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-open-8',
    'The Instagram Follower Counter does one job: you enter a username, and it shows the follower count Instagram currently publishes for that profile. Keep one distinction in mind throughout this guide. The follower count is a public number, while the follower list is the identities behind that number, and the two follow different access rules.',
    [{ href: TOOL_HREF, label: 'Instagram Follower Counter' }],
  ),

  heading('h-what', 'What Is an Instagram Follower Count?', 2),
  paragraph(
    'p-wh-1',
    "An Instagram follower count is the number on a profile showing how many accounts currently follow it, such as 872K or 104M. It gives a quick sense of the account's displayed audience size. It does not tell you who the followers are, how active or engaged they are, how many see each post or how much reach the account gets.",
  ),
  paragraph(
    'p-fg-4',
    'Profiles also show a following count, which is the number of accounts the profile itself follows. Meta lists both the number of followers and following as public profile information.',
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
    'p-nl-2',
    "Yes. Meta says the number of followers and following is public to everyone on or off Instagram, including people who don't have an Instagram account.",
  ),
  paragraph(
    'p-nl-3',
    "That classification does not mean Instagram shows every visitor the same web page forever. Instagram can change login prompts, page delivery and public-profile behaviour, so any lookup tool depends on Instagram exposing usable public data. If the count isn't exposed, the counter shows an error rather than a made-up number.",
  ),
  paragraph(
    'p-em-1',
    'Other places that show the number are less dependable. Search engines decide for themselves whether to index a profile field or keep it fresh, and Instagram lets public profiles be embedded on other websites when embedding is enabled, which is a different feature from a follower-count check. (Instagram Help Center)',
    [{ href: IG_EMBED, label: 'Instagram Help Center', external: true }],
  ),

  heading(
    'h-how',
    'How to Check an Instagram Follower Count Without Logging In',
    2,
  ),
  paragraph(
    'p-how-1',
    'The free counter works in any up-to-date browser, on desktop or mobile, with nothing to install.',
  ),
  numbered('ol-simple', [
    "Find the account's username, for example nasa rather than the display name NASA.",
    'Open the Instagram Follower Counter.',
    'Enter the username or profile URL, with or without the @.',
    'Run the check.',
    'Read the follower count Instagram currently publishes for that profile.',
  ]),
  paragraph(
    'p-how-10',
    'If Instagram shows the number in an abbreviated form such as 104M, the result shows 104M too. No Instagram password is required at any step.',
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
    'Large counts are abbreviated for readability, as in 1.2K, 872K, 2.5M or 104M. When the public profile publishes the count that way, the NovaLikes counter does not invent additional precision. It will not turn 104M into something like 104,237,619, because the public source never provided those digits.',
  ),
  paragraph(
    'p-et-5',
    'If Instagram shows a full number, as it often does for smaller accounts, the tool shows that full number. Be wary of any tool that promises a secret exact follower count when Instagram only shows an abbreviated value.',
  ),

  heading(
    'h-exactly',
    'Does 104M Mean Exactly 104,000,000 Followers?',
    2,
  ),
  paragraph(
    'p-ex-2',
    'Not necessarily. An abbreviated display is a rounded or shortened public representation, not proof of a specific underlying number. So you cannot say the account has exactly 104,000,000 followers. What you can accurately say is that the publicly displayed follower count is 104M.',
  ),

  heading(
    'h-private-count',
    "Can You Check a Private Instagram Account's Follower Count?",
    2,
  ),
  paragraph(
    'p-pc-1',
    'Yes. Meta specifically says the number of followers and following remains public regardless of whether a personal account is private or public.',
  ),
  paragraph(
    'p-pc-3',
    "That does not give you access to the private account's posts, Reels, Stories or full follower list. Instagram says only approved followers can see posts from a private account. (Instagram Help Center)",
    [{ href: IG_WHO_CAN_SEE_POSTS, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pc-7',
    'The NovaLikes lookup still depends on Instagram exposing usable public profile data. Private, hidden or login-gated profiles can return an error instead of a count.',
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

  heading(
    'h-private-list',
    'Can a Follower Counter Show Who Follows a Private Account?',
    2,
  ),
  paragraph(
    'p-pl-2',
    "No. Knowing that an account has 25,000 followers gives you neither permission nor technical access to a restricted follower list. Meta's privacy guidance says people may need to send a follow request to see a private account's posts, followers or following list. (Instagram Help Center)",
    [{ href: IG_MANAGE_PRIVACY, label: 'Instagram Help Center', external: true }],
  ),
  paragraph(
    'p-pl-4',
    'The Follower Counter does not show private followers, unlock hidden follower lists or bypass Instagram privacy in any way. It checks a count and nothing more.',
  ),

  heading(
    'h-can-hide',
    'Can Someone Hide Their Instagram Follower Count?',
    2,
  ),
  paragraph(
    'p-hi-5',
    "No. Meta says the number of followers and following can't be hidden and remains public regardless of whether the personal account is private or public.",
  ),
  paragraph(
    'p-ch-2',
    "Making an account private controls access to content and requires follower approval, but it offers no setting to hide the follower and following numbers. Instagram does have separate controls for things like post Like counts and view counts, so don't assume every profile metric can be hidden the same way.",
  ),

  heading(
    'h-insights',
    "What Does Instagram Insights Show That a Follower Counter Doesn't?",
    2,
  ),
  paragraph(
    'p-in-4',
    'A public counter shows the current displayed total. Instagram Insights is available only to the owner of a professional account and goes much deeper: Meta says it can include follower Growth (followers gained and lost), locations, age ranges and active times when the relevant requirements are met. (Instagram Help Center)',
    [{ href: IG_INSIGHTS, label: 'Instagram Help Center', external: true }],
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
    "No public follower counter, including this one, can reveal somebody else's private Insights. For your own professional account, Insights is the better tool for growth analysis than repeatedly checking 42.7K on a public counter.",
  ),
  figure(
    'fig-insights',
    `${IMAGE_DIR}/public-vs-insights.png`,
    'A public follower count is visible profile information, while Instagram Insights such as followers gained or lost stay with the account owner',
    "A public follower counter is not access to another account's Instagram Insights.",
  ),

  heading(
    'h-history',
    'Can You Track Instagram Follower Changes Over Time?',
    2,
  ),
  paragraph(
    'p-hs-1',
    'Not with the counter. Each check is a fresh lookup of the count available at that moment. It does not stream live updates, refresh automatically or keep a history of followers gained and lost.',
  ),
  paragraph(
    'p-mn-1',
    'For legitimate research on a public profile, you can record counts yourself, for example 24.8K on Monday and 25.1K on Friday. Changes smaller than the rounding level will not show, so exact daily gains or losses cannot be worked out from abbreviated numbers.',
  ),
  paragraph(
    'p-uc-3',
    'This also explains why a count can look frozen. An account displayed as 1.2M can gain or lose followers and still round to 1.2M, so an unchanged number does not mean the counter or Instagram is broken.',
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
    'h-engagement',
    'Does a Higher Follower Count Mean More Reach or Engagement?',
    2,
  ),
  paragraph(
    'p-eg-4',
    'Not automatically. Follower count measures audience size, while engagement and reach describe what happens to content, and Instagram Insights treats follower information and content performance as separate categories.',
  ),
  paragraph(
    'p-rc-4',
    "A profile can have many followers and modest post interaction, or a smaller audience with stronger interaction. Public content can also reach people beyond the follower base through Instagram's recommendations, so 100K followers does not mean 100K people see every post.",
  ),
  paragraph(
    'p-re-2',
    'The count also says nothing about whether followers are real. The counter is not a fake-follower detector or bot-percentage calculator, and for competitor research it is one input, not a measure of traffic, sales, engagement or profitability.',
  ),
  paragraph(
    'p-co-2',
    'As one research input, a public count is still useful. You might compare how large several public brand audiences appear, or note how their counts change over longer periods.',
  ),
  paragraph(
    'p-eg-6',
    'Our guides on Instagram followers, likes, views and comments and on how Instagram Reel views are counted explain those metrics separately.',
    [
      {
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        label: 'Instagram followers, likes, views and comments',
      },
      {
        href: '/learn/how-instagram-reels-views-are-counted',
        label: 'how Instagram Reel views are counted',
      },
    ],
  ),

  heading('h-password', 'Do You Need an Instagram Password or Account?', 2),
  paragraph(
    'p-pw-2',
    'No. You enter a username, and the tool reads the follower label from the public profile, the same one any visitor can see. It has no Instagram login form, and it needs no API key, Meta developer account or Instagram account of your own.',
  ),
  paragraph(
    'p-pw-4',
    'Follower-counter searches often attract websites that ask for Instagram login details, verification codes, browser cookies or account authorization. A public follower-count tool has no reason to ask for any of these, so never type your Instagram credentials into an unknown third-party login.',
  ),

  heading(
    'h-notify',
    'Does Instagram Notify Someone When You Check Their Follower Count?',
    2,
  ),
  paragraph(
    'p-nf-1',
    'A follower-count check is read-only. It does not follow the account, send a follow request, Like, comment, message or change the profile, and it cannot add or remove followers. Even so, no website can honestly promise that a check is completely untraceable.',
  ),

  heading('h-fail', 'Why Does the Follower Counter Show an Error?', 2),
  paragraph(
    'p-fa-1',
    'The counter shows an error rather than a guessed number when it cannot find usable data. Common causes are:',
  ),
  bullets('ul-fail', [
    'a misspelled username, so check underscores and periods;',
    'an old username the account no longer uses;',
    'a display name entered instead of the username;',
    'an account that no longer exists;',
    'or Instagram changing its public page behaviour or temporarily restricting the request.',
  ]),
  paragraph(
    'p-mi-4',
    "The tool will not present the closest match or another account's number as the profile you asked for. Display names can contain spaces, change or be shared by several accounts, so confirm the current username first. Instagram says some accounts may require using the exact username to find them in Search.",
  ),
  paragraph(
    'p-fn-2',
    "To find a username, open the account's profile or use Instagram Search, which lets users search for people and topics through Search and Explore.",
  ),

  heading('h-tool-facts', "What the Follower Counter Does and Doesn't Do", 2),
  paragraph(
    'p-uf-1',
    'The counter is most useful for a quick no-login check, a simple brand or profile comparison, or confirming a public profile from a browser where you are not signed into Instagram. Its scope is deliberately narrow:',
  ),
  bullets('ul-tool-facts', [
    'It is free, with no credit packs, trials or premium checks.',
    'It works in any browser, including on mobile, and there is no app or extension to install.',
    'It accepts a username or profile URL, but not a post or Reel link.',
    'It checks one username at a time, with no bulk or CSV upload.',
    'It shows the count at the moment you check and is not a live tracker.',
    'It reads public profile information only and gives no access to restricted data.',
  ]),

  heading('h-cta-section', 'Check an Instagram Follower Count', 2),
  paragraph(
    'p-ct-1',
    'If you want to check a count now, the free counter is the next step.',
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
    alt: 'A public Instagram profile showing 104M followers, with the published follower count checked without an Instagram login',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: REVISED_AT,
  showModifiedDate: true,
  seo: {
    title: 'Check Instagram Follower Count Without Logging In',
    description:
      'Learn how to check a public Instagram follower count without logging in, what follower numbers mean, and why displayed counts may be abbreviated.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'check Instagram follower count without login',
      'check Instagram followers',
      'why Instagram follower counts are abbreviated',
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
        'Yes. Meta says the numerical follower count remains public profile information even when the account is private, while private posts stay restricted to approved followers. A lookup can still only show the count if Instagram exposes usable public profile data.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can I see the followers of a private Instagram account?',
      answer:
        "Not without approval. The numerical follower count is public, but Meta says people may need to send a follow request to see a private account's followers or following list.",
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Do I need an Instagram password to use the follower counter?',
      answer:
        'No. The follower counter checks publicly available profile-count information and does not require your Instagram password.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Why does the counter show 104M instead of an exact number?',
      answer:
        'If the available public count is published in abbreviated form, the counter preserves that representation instead of inventing unsupported digits.',
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
        'Not from the count alone. The counter shows the number only and does not check whether followers are real.',
      schemaEligible: true,
    },
    {
      id: 'faq-9',
      question: 'Does the follower counter show followers gained and lost?',
      answer:
        "No. The counter shows the current available total only. Instagram's own Insights can show Growth, including followers gained and lost, to owners of professional accounts.",
      schemaEligible: true,
    },
    {
      id: 'faq-10',
      question: 'Can I check Instagram followers from my phone?',
      answer:
        'Yes. The counter is web-based and works in a mobile browser without a separate app.',
      schemaEligible: true,
    },
  ],
};
