/**
 * Article #18 — Why Do Facebook Page Followers Drop or Change?
 * Scheduled: Friday 2 October 2026.
 * Informational / diagnostic intent. Distinct from /buy-facebook-followers (buying intent).
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'why-facebook-page-followers-drop';
const SCHEDULED_AT = '2026-10-02T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const FB_FOLLOWER_INSIGHTS =
  'https://www.facebook.com/help/810929305732263';
const FB_UNFOLLOW =
  'https://www.facebook.com/help/190078864497547';
const META_FAKE_ACCOUNTS =
  'https://transparency.meta.com/reports/community-standards-enforcement/fake-accounts/';

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

function numbered(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'numbered_list', items, order: nextOrder() };
}

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-1',
    'A Facebook Page follower count is not fixed. People follow and unfollow every day, Meta removes fake accounts, and the move from Page Likes to follows has changed how audiences are counted. When the number drops, it tells you something changed, but not why.',
  ),
  paragraph(
    'p-2',
    'The good news is that the cause can usually be found. This guide covers the most common reasons Page followers drop, how to check which one applies to you and what you can do about it.',
  ),
  heading('h-people-unfollow', 'People Unfollow', 2),
  paragraph(
    'p-3',
    'The simplest explanation is often the right one. Facebook lets anyone unfollow a Page in two taps, and people do it for all sorts of reasons: the Page posts too often, the content no longer interests them, they followed for a one time offer, or they are cleaning up their Feed.',
    [
      { href: FB_UNFOLLOW, label: 'unfollow a Page', external: true },
    ],
  ),
  paragraph(
    'p-4',
    'Some unfollows are normal for every Page. A steady trickle is not a sign of a penalty or a technical fault.',
  ),
  figure(
    'fig-change',
    `${IMAGE_DIR}/why-followers-change.png`,
    'Why Facebook Page followers change: audience decisions, platform metric changes and account cleanup',
    'A changing follower total can have more than one cause.',
  ),
  heading('h-your-content-drifted-away-from-why-peopl', 'Your Content Drifted Away From Why People Followed', 2),
  paragraph(
    'p-5',
    'Imagine a Page that built its audience with local property advice and new listings. Six months later, it mostly posts motivational quotes, memes and adverts. Many followers will decide this is not what they signed up for.',
  ),
  paragraph(
    'p-6',
    'The same happens when a Page changes language, moves to a new city or shifts its focus to a different service. Those may be the right business decisions, but some of the original audience will leave. If you made a deliberate change, a smaller but better matched audience can be worth more than a larger one that no longer cares.',
  ),
  heading('h-a-viral-post-brought-in-short-term-follo', 'A Viral Post Brought in Short Term Followers', 2),
  paragraph(
    'p-7',
    'When a post reaches far beyond your usual audience, some of those viewers follow. If your normal content is different from the post that went viral, many of them leave again over the following weeks. A funny Reel on a construction Page might attract people who wanted more comedy, not renovation tips. The drop that follows is the spike settling back to normal.',
  ),
  heading('h-page-likes-became-follows', 'Page Likes Became Follows', 2),
  paragraph(
    'p-8',
    'Facebook has moved Pages from Likes to follows. Meta\'s help page on follower insights says Page Likes have been replaced by follows in Meta Business Suite, and in November 2025 Meta retired the old Page Likes metric from its Page insights API.',
    [
      { href: FB_FOLLOWER_INSIGHTS, label: 'follower insights', external: true },
      { href: 'https://developers.facebook.com/blog/post/2025/08/15/page-insights-api-updates/', label: 'Page insights API', external: true },
    ],
  ),
  paragraph(
    'p-9',
    'Meta also says that connections that were only Likes, without a follow, were removed during the transition. So if you compare an old Page Like total with today\'s follower count, the numbers will not match, and the gap is not a loss of real people. Make sure you are comparing follows with follows. Our guide on Facebook followers, Page Likes and Post Likes explains the difference.',
    [
      { href: '/learn/facebook-followers-vs-page-likes-vs-post-likes', label: 'Facebook followers, Page Likes and Post Likes' },
    ],
  ),
  figure(
    'fig-metric',
    `${IMAGE_DIR}/audience-metric-changed.png`,
    'Facebook Page audience metric changing from Page Likes and Follows toward Followers as the primary metric',
    'Historical Like totals and current follower totals should not automatically be treated as identical metrics.',
  ),
  heading('h-fake-accounts-were-removed', 'Fake Accounts Were Removed', 2),
  paragraph(
    'p-10',
    'Meta works continuously to remove fake accounts from Facebook. If any of your followers were fake or inauthentic, they disappear from your count when Meta removes them. This can cause a sudden drop, especially for Pages that gained followers through giveaways, follow exchanges or low quality services.',
    [
      { href: META_FAKE_ACCOUNTS, label: 'remove fake accounts', external: true },
    ],
  ),
  paragraph(
    'p-11',
    'Do not assume every drop is a fake account sweep, though. Real people unfollow too, and the total alone cannot tell you which happened.',
  ),
  heading('h-things-that-do-not-remove-followers', 'Things That Do Not Remove Followers', 2),
  paragraph(
    'p-12',
    'A few common worries are not supported by anything Meta has said:',
  ),
  bullets('ul-1', [
    'Facebook does not delete followers because a Page stopped posting for a while.',
    'Followers are not removed automatically for not engaging with your posts.',
    'Low reach does not delete followers. Reach and followers are separate metrics.',
    'A follower drop does not prove your reach was cut, and fewer followers does not automatically mean fewer post Likes.',
  ]),
  paragraph(
    'p-13',
    'If reach drops, investigate reach. If followers drop, investigate followers.',
  ),
  {
      id: 'cta-fb-followers',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-facebook-followers',
      heading: 'Compare Facebook Follower Options',
      description:
        "Facebook follower counts can change for several reasons. If you're comparing follower packages, review the available options without treating follower count as a guarantee of permanent retention, reach or engagement.",
      label: 'View Facebook Followers',
    },
  heading('h-how-to-work-out-what-happened', 'How to Work Out What Happened', 2),
  numbered('ol-2', [
    'Confirm you are looking at followers, not an old Page Like total.',
    'Open your Page, go to the professional dashboard, then Insights, and check follower trends. Look at follows and unfollows over time, not just the total.',
    'Pin down when the drop happened: one day, one week or a slow decline over months.',
    'Think about what changed around that date: topic, posting frequency, language, location or a promotion.',
    'Check whether a recent viral post or giveaway brought in an unusual burst of followers.',
    'If you suspect a restriction, check your Page\'s status in the professional dashboard rather than guessing from the follower count.',
  ]),
  paragraph(
    'p-14',
    'A sudden overnight drop often points to the Likes to follows switch or a fake account removal. A slow weekly decline usually points to content or audience fit.',
  ),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnose-follower-drop.png`,
    'Diagnose a Facebook follower drop by checking the metric, Insights, content and Page status',
    'Investigate the evidence before assuming a penalty.',
  ),
  paragraph(
    'p-15',
    'Facebook does not send unfollow alerts, and you cannot see a full list of everyone who left. Avoid third party apps that promise to show you unfollowers in exchange for your Facebook login. People who unfollow can always follow again later.',
  ),
  heading('h-reduce-avoidable-follower-loss', 'Reduce Avoidable Follower Loss', 2),
  paragraph(
    'p-16',
    'You cannot stop everyone from unfollowing, and you should not try. People should choose what they see in their Feed. What you can improve is the reason to stay:',
  ),
  bullets('ul-3', [
    'Keep the Page\'s purpose clear, so people know what they are following.',
    'Keep most posts useful or interesting, not just promotional.',
    'Experiment, but avoid turning the Page into a different brand every week.',
    'Use Insights to see which posts bring in followers, then make more of them.',
  ]),
  paragraph(
    'p-17',
    'Our guide on growing Facebook Page followers covers how to attract the right audience in the first place.',
    [
      { href: '/learn/how-to-get-more-facebook-page-followers', label: 'growing Facebook Page followers' },
    ],
  ),
  paragraph(
    'p-18',
    'Adding followers does not fix the reason people are leaving. If the content no longer matches the audience, new followers will drift away for the same reason.',
  ),
  paragraph(
    'p-19',
    'A follower count is a snapshot. The trend over months, and whether the people following actually engage, matters far more than any single day.',
  ),
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

export const WHY_FACEBOOK_PAGE_FOLLOWERS_DROP_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-why-facebook-page-followers-drop',
  slug: SLUG,
  title: 'Why Do Facebook Page Followers Drop or Change?',
  excerpt: 'Facebook Page followers can drop because people unfollow, fake accounts are removed or Page Likes were converted to follows. Here is how to find the real cause and what to do about it.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'facebook',
  tags: ['followers', 'analytics', 'algorithm', 'engagement', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A Facebook Page follower total dropping, with three possible causes: unfollows, metric changes and account cleanup',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'Why Do Facebook Page Followers Drop or Change?',
    description:
      "Facebook Page followers dropping? Learn why follower counts can change, how unfollows and Facebook's Page Likes transition affect totals, and what to check.",
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'why are my Facebook followers dropping',
      'Facebook Page losing followers',
      'Facebook follower count decreasing',
      'Facebook Page followers dropped',
      'why did my Facebook followers go down',
      'Facebook Page Likes vs followers',
    ],
  },
  relatedServices: ['buy-facebook-followers'],
  relatedArticles: [
    'facebook-followers-vs-page-likes-vs-post-likes',
    'how-facebook-page-reach-works',
    'how-to-get-more-facebook-page-followers',
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
    'People can unfollow a Page at any time, and some loss is normal.',
    'Content changes, viral spikes and repositioning often cause gradual drops.',
    'Page Likes have been replaced by follows, and Like only connections were removed.',
    'Meta removes fake accounts, which can cause sudden drops.',
    'Facebook does not delete followers for inactivity or low reach.',
    'Use follower Insights to find when the drop happened and what changed.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why are my Facebook Page followers decreasing?',
      answer:
        'Common reasons are people unfollowing, content that no longer matches your audience, short term followers from a viral post leaving, fake accounts being removed, and old Page Likes being replaced by follows.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Why did my Facebook followers drop overnight?',
      answer:
        'A sudden drop is often caused by Meta removing fake accounts or by comparing an old Page Like total with today\'s follower count. Check follower Insights to see when it happened.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Does Facebook remove fake followers from Pages?',
      answer:
        'Yes. Meta continuously removes fake accounts, and any that followed your Page disappear from your count.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can I see who unfollowed my Facebook Page?',
      answer:
        'Facebook does not provide unfollow alerts or a full list of people who left. Insights show follow and unfollow trends over time.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does Facebook remove followers if my Page stops posting?',
      answer:
        'No. Meta has no rule that deletes followers because a Page has been inactive.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Will buying followers fix a falling follower count?',
      answer:
        'No. If people are leaving because the content does not suit them, adding followers does not solve that.',
      schemaEligible: true,
    },
  ],
};
