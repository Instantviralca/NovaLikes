/**
 * Article #10 — How Are TikTok Video Views Counted?
 * Scheduled: Monday 14 September 2026.
 * Informational intent. Keeps public/post views separate from Creator Rewards qualified views.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-tiktok-video-views-are-counted';
const SCHEDULED_AT = '2026-09-14T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_STUDIO =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/tiktok-studio';
const TIKTOK_CREATOR_TOOLS =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/creator-tools-on-tiktok';
const TIKTOK_CREATOR_REWARDS =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program';
const TIKTOK_HOW_REWARDS_WORK =
  'https://support.tiktok.com/en/business-and-creator/creator-rewards-program/how-rewards-work';
const TIKTOK_PROMOTE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/use-promote-to-grow-your-tiktok-audience';
const TIKTOK_CSI =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TIKTOK_POST_VIEWS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/my-videos-arent-getting-views';
const TIKTOK_STORIES =
  'https://support.tiktok.com/en/using-tiktok/creating-videos/tiktok-stories';
const TIKTOK_LIVE =
  'https://support.tiktok.com/en/live-gifts-wallet/tiktok-live/what-is-tiktok-live';
const TIKTOK_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';
const TIKTOK_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';

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

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-open-1',
    'TikTok view counts look simple.',
  ),
  paragraph('p-open-2', 'You publish a video.'),
  paragraph('p-open-3', 'A number appears underneath it.'),
  paragraph(
    'p-open-4',
    'That number grows as the video receives more viewing activity.',
  ),
  paragraph(
    'p-open-5',
    'But once creators start looking closely at their analytics, the questions become more complicated:',
  ),
  bullets('ul-open-q', [
    'What actually counts as a TikTok view?',
    'Can the same person create more than one view?',
    'Are public views the same as unique viewers?',
    'Why are Creator Rewards qualified views lower than the video\'s total views?',
    'Does someone need to watch the entire video?',
  ]),
  paragraph(
    'p-open-6',
    'The first thing to understand is that TikTok uses the word views in several contexts.',
  ),
  paragraph(
    'p-open-7',
    'TikTok Studio tracks views as part of post performance analytics. Creator tools let creators examine content and follower performance, while individual posts can have their own analytics. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_TOOLS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-8',
    'But TikTok also uses the term qualified views inside its Creator Rewards Program, and those views have specific eligibility rules that should not be confused with the ordinary public view count. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-9',
    'So before asking how TikTok counts a view, ask:',
  ),
  paragraph(
    'p-open-10',
    'Which TikTok view metric are we talking about?',
  ),

  heading('h-what', 'What Does a TikTok Video View Mean?', 2),
  paragraph(
    'p-what-1',
    'At the simplest level, a TikTok view indicates viewing activity on a video.',
  ),
  paragraph(
    'p-what-2',
    'TikTok Studio lets creators track post performance including views and likes over time. (TikTok Support)',
    [{ href: TIKTOK_STUDIO, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-what-3',
    'However, you should be careful with articles that claim TikTok has one universally documented public rule such as:',
  ),
  paragraph(
    'p-what-4',
    '“Exactly one second always equals one view.”',
  ),
  paragraph('p-what-5', 'or:'),
  paragraph(
    'p-what-6',
    '“A viewer must watch exactly X% of a video before it counts.”',
  ),
  paragraph(
    'p-what-7',
    "TikTok's current public creator documentation does not provide a complete ordinary-view counting formula in those terms.",
  ),
  paragraph(
    'p-what-8',
    'What TikTok does document much more specifically is how qualified views work for Creator Rewards.',
  ),
  paragraph(
    'p-what-9',
    'Those are not necessarily equivalent to the number displayed publicly beneath a video.',
  ),
  paragraph(
    'p-what-10',
    'That distinction prevents a lot of confusion.',
  ),
  figure(
    'fig-contexts',
    `${IMAGE_DIR}/three-view-contexts.png`,
    'Three columns separating public TikTok video views, TikTok Studio analytics and Creator Rewards qualified views',
    'Do not assume all three numbers follow identical rules. Simplified explanation based on TikTok\'s public creator documentation.',
  ),

  heading(
    'h-unique',
    'Are TikTok Views the Same as Unique Viewers?',
    2,
  ),
  paragraph('p-un-1', 'Not necessarily.'),
  paragraph(
    'p-un-2',
    'A view count and a unique-person count answer different questions.',
  ),
  paragraph(
    'p-un-3',
    'Imagine one person encounters the same piece of content multiple times.',
  ),
  paragraph(
    'p-un-4',
    'The concept of:',
  ),
  paragraph('p-un-5', 'how much viewing activity occurred'),
  paragraph('p-un-6', 'is different from:'),
  paragraph(
    'p-un-7',
    'how many distinct people/accounts were involved.',
  ),
  paragraph(
    'p-un-8',
    "This distinction becomes especially obvious in TikTok's Creator Rewards documentation.",
  ),
  paragraph(
    'p-un-9',
    'For qualified Creator Rewards views, TikTok explicitly says views from the same account are calculated only once for one video. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-un-10',
    'That tells us qualified views are intentionally treated as a unique-view metric for that program.',
  ),
  paragraph(
    'p-un-11',
    'But you should not take that Creator Rewards rule and automatically claim that every ordinary public TikTok view counter follows the exact same deduplication rule.',
  ),
  paragraph(
    'p-un-12',
    'They are different metrics serving different purposes.',
  ),

  heading(
    'h-replay',
    'Can One Person Watch a TikTok More Than Once?',
    2,
  ),
  paragraph(
    'p-rp-1',
    'A person can obviously replay or encounter a video more than once.',
  ),
  paragraph(
    'p-rp-2',
    "What you should avoid doing is making an unsupported universal claim about exactly how every replay affects TikTok's normal public counter.",
  ),
  paragraph(
    'p-rp-3',
    'TikTok publicly gives a clearer rule for Creator Rewards qualified views:',
  ),
  paragraph(
    'p-rp-4',
    'views from the same account count only once for the same video. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rp-5',
    'So if someone watches an eligible Creator Rewards video repeatedly, those repeated watches should not be interpreted as multiple qualified views from that same account.',
  ),
  paragraph(
    'p-rp-6',
    'For the general public view count, keep the wording more careful unless TikTok provides a specific current definition.',
  ),

  heading('h-qualified', 'What Are TikTok Qualified Views?', 2),
  paragraph(
    'p-qv-1',
    "Qualified views are part of TikTok's Creator Rewards Program.",
  ),
  paragraph(
    'p-qv-2',
    'They are much more narrowly defined than simply:',
  ),
  paragraph(
    'p-qv-3',
    'someone interacted with the video somehow.',
  ),
  paragraph(
    'p-qv-4',
    'TikTok says qualified views are unique video views from the For You feed. It excludes certain types of viewing activity, including fraudulent views, paid views, disliked views and views lasting less than five seconds. (TikTok Support)',
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-qv-5',
    'TikTok also states that qualified views from the same account are calculated only once for one video and that a qualifying view must last longer than five seconds. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-qv-6', 'This means:'),
  paragraph(
    'p-qv-7',
    'Public video views ≠ automatically qualified Creator Rewards views.',
  ),
  paragraph(
    'p-qv-8',
    'A video can display one total publicly while the number relevant to rewards is smaller.',
  ),
  paragraph(
    'p-qv-9',
    'That is expected because the rewards metric applies additional filters.',
  ),

  heading('h-public-vs', 'Public Views vs Qualified Views', 2),
  {
    id: 'table-view-types',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Purpose', 'Key Difference'],
    rows: [
      [
        'Public/Post Views',
        'General video-performance visibility',
        'Broader post view metric',
      ],
      [
        'Qualified Views',
        'Creator Rewards calculation',
        'Must satisfy additional eligibility conditions',
      ],
    ],
  },
  paragraph(
    'p-pv-1',
    'For Creator Rewards, TikTok\'s current documentation says qualified views:',
  ),
  bullets('ul-pv', [
    'come from the For You feed',
    'are unique',
    'exclude fraudulent views',
    'exclude paid views',
    'exclude disliked views',
    'exclude views shorter than five seconds.',
  ]),
  paragraph(
    'p-pv-2',
    '(TikTok Support)',
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pv-3',
    "Therefore, don't compare:",
  ),
  paragraph('p-pv-4', '100,000 public views'),
  paragraph('p-pv-5', 'with:'),
  paragraph('p-pv-6', '65,000 qualified views'),
  paragraph(
    'p-pv-7',
    'and automatically conclude that TikTok “lost” 35,000 views.',
  ),
  paragraph(
    'p-pv-8',
    'Those metrics are not defined identically.',
  ),
  figure(
    'fig-filter',
    `${IMAGE_DIR}/public-to-qualified-views.png`,
    'Filter diagram showing general TikTok viewing activity passing through Creator Rewards rules such as unique For You views and a five-second minimum before becoming qualified views',
    'Qualified views are a filtered rewards metric, not simply the public total copied over.',
  ),

  heading(
    'h-five',
    'Does Someone Have to Watch Five Seconds for a TikTok View?',
    2,
  ),
  paragraph(
    'p-fv-1',
    'This is where people often mix up two different claims.',
  ),
  paragraph(
    'p-fv-2',
    'TikTok explicitly says Creator Rewards qualified views must be longer than five seconds. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fv-3',
    'That does not automatically prove:',
  ),
  paragraph(
    'p-fv-4',
    '“Every ordinary public TikTok view requires five seconds.”',
  ),
  paragraph(
    'p-fv-5',
    'Those are different metrics.',
  ),
  paragraph('p-fv-6', 'So the accurate statement is:'),
  paragraph(
    'p-fv-7',
    'Five seconds is a documented requirement for qualified Creator Rewards views.',
  ),
  paragraph(
    'p-fv-8',
    'Do not turn it into a universal definition for every view counter on TikTok unless TikTok explicitly documents that separately.',
  ),

  heading('h-paid', 'Do Paid TikTok Views Count?', 2),
  paragraph('p-pd-1', 'Again, context matters.'),
  paragraph(
    'p-pd-2',
    "TikTok's Creator Rewards documentation explicitly excludes paid views from qualified views. (TikTok Support)",
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pd-3',
    'TikTok also has its own Promote product, where creators can pay to promote content and track campaign metrics including post views, profile views and other activity. (TikTok Support)',
    [{ href: TIKTOK_PROMOTE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-pd-4',
    'So a video can receive paid distribution while Creator Rewards uses a different filtered metric for monetization.',
  ),
  paragraph(
    'p-pd-5',
    'This is another example of why “views” should not always be treated as one universal number across every TikTok feature.',
  ),

  heading(
    'h-third-party',
    'Do Purchased Third-Party Views Count Toward Creator Rewards?',
    2,
  ),
  paragraph(
    'p-tp-1',
    'They should not be presented as a way to qualify for or increase Creator Rewards earnings.',
  ),
  paragraph(
    'p-tp-2',
    "TikTok's qualified-view definition excludes fraudulent and paid views, and TikTok's Creator Rewards requirements prohibit fraudulent behaviour including fake video views. (TikTok Support)",
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-tp-3',
    'Therefore NovaLikes should never promise:',
  ),
  bullets('ul-tp', [
    'Buy TikTok views to earn Creator Rewards',
    'Buy views to increase Creator Rewards RPM',
    'Purchased views qualify for monetization',
    'Bought views guarantee reward eligibility',
  ]),
  paragraph(
    'p-tp-4',
    'A TikTok view service should be described only for the metric it provides.',
  ),

  heading(
    'h-fyp',
    'What About Views From the For You Page?',
    2,
  ),
  paragraph(
    'p-fyp-1',
    'The For You feed is a major TikTok discovery surface.',
  ),
  paragraph(
    'p-fyp-2',
    "TikTok's general recommendation system personalizes content based on signals including viewer interactions, content information and user information. (TikTok Support)",
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-3',
    'But for Creator Rewards, the relevance is more specific:',
  ),
  paragraph(
    'p-fyp-4',
    'TikTok says qualified views are unique video views from the For You feed. (TikTok Support)',
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fyp-5',
    'That is an important program-specific requirement.',
  ),
  paragraph(
    'p-fyp-6',
    'It does not mean every public view must originate from the For You feed.',
  ),
  paragraph(
    'p-fyp-7',
    'TikTok videos can be encountered through other parts of the platform, including profiles and Search.',
  ),

  heading(
    'h-search',
    'Can TikTok Search Generate Video Views?',
    2,
  ),
  paragraph(
    'p-se-1',
    'Yes, TikTok has a Search discovery system, and Creator Search Insights provides creators with Search analytics for posts. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-se-2',
    'That means TikTok content can receive meaningful discovery through Search in addition to the For You feed.',
  ),
  paragraph(
    'p-se-3',
    'This connects directly with our earlier guide to TikTok SEO.',
    [{ href: '/learn/tiktok-seo', label: 'TikTok SEO' }],
  ),
  paragraph(
    'p-se-4',
    'A useful video may continue attracting search visibility as people look for that topic.',
  ),
  paragraph(
    'p-se-5',
    'But keep this separate from Creator Rewards qualified-view definitions, which specifically reference qualifying views from the For You feed. (TikTok Support)',
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-full',
    'Does Watching a Full TikTok Count More Than Watching Part of It?',
    2,
  ),
  paragraph(
    'p-fl-1',
    'From an analytics perspective, watch behaviour can provide more context than a raw view total.',
  ),
  paragraph(
    'p-fl-2',
    'But do not tell readers:',
  ),
  paragraph(
    'p-fl-3',
    '“A full watch counts as two views.”',
  ),
  paragraph('p-fl-4', 'or:'),
  paragraph(
    'p-fl-5',
    '“TikTok multiplies a view score if you finish the video.”',
  ),
  paragraph(
    'p-fl-6',
    'TikTok does not publicly document a simple public-view multiplier like that.',
  ),
  paragraph(
    'p-fl-7',
    "A person viewing content and a person watching it deeply may provide different behavioural information to TikTok's systems, but that should not be converted into a fake arithmetic formula.",
  ),
  paragraph(
    'p-fl-8',
    'For Creator Rewards, the documented threshold relevant here is that qualified views must be longer than five seconds. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),

  heading('h-options', 'Understand TikTok View Options', 2),
  paragraph(
    'p-op-1',
    'A TikTok view service concerns the visible view metric.',
  ),
  paragraph(
    'p-op-2',
    'TikTok views should be understood as a content-level viewing-activity service.',
    [{ href: '/buy-tiktok-views', label: 'TikTok views' }],
  ),
  paragraph(
    'p-op-3',
    'It should not be represented as a guaranteed method for:',
  ),
  bullets('ul-op', [
    'Creator Rewards earnings',
    'FYP ranking',
    'TikTok Search ranking',
    'follower growth',
    'likes',
    'comments',
    'virality',
    'sales',
  ]),
  {
    id: 'cta-tiktok-views',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-tiktok-views',
    heading: 'Compare TikTok View Options',
    description:
      'TikTok views measure video viewing activity. Compare the available options without treating a view count as a guarantee of followers, engagement, FYP reach or Creator Rewards eligibility.',
    label: 'View TikTok View Packages',
  },

  heading(
    'h-change',
    'Why Can TikTok View Counts Change Quickly?',
    2,
  ),
  paragraph(
    'p-cg-1',
    'TikTok distribution can happen quickly.',
  ),
  paragraph(
    'p-cg-2',
    'A video can receive:',
  ),
  bullets('ul-cg', [
    'little activity initially,',
    'then more views later,',
    'or fluctuate compared with other posts.',
  ]),
  paragraph(
    'p-cg-3',
    'TikTok itself says video views can fluctuate and recommends creators use analytics to better understand content performance. (TikTok Support)',
    [{ href: TIKTOK_POST_VIEWS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-cg-4', 'So do not assume:'),
  paragraph(
    'p-cg-5',
    '“A video stops forever after the first hour.”',
  ),
  paragraph('p-cg-6', 'Likewise, do not assume:'),
  paragraph(
    'p-cg-7',
    '“Every video will eventually get another push.”',
  ),
  paragraph('p-cg-8', 'Neither is guaranteed.'),
  paragraph(
    'p-cg-9',
    'Use actual analytics rather than universal timing myths.',
  ),
  paragraph(
    'p-cg-10',
    'If you want to save a public TikTok for offline reference after reviewing the video itself, the TikTok Video Downloader is a separate tool. It does not measure or verify view counts.',
    [
      {
        href: '/tools/tiktok-video-downloader',
        label: 'TikTok Video Downloader',
      },
    ],
  ),

  heading(
    'h-different',
    'Why Do Two TikTok Videos Get Very Different View Counts?',
    2,
  ),
  paragraph(
    'p-df-1',
    'Because individual content performance can differ substantially.',
  ),
  paragraph(
    'p-df-2',
    'TikTok Studio exists specifically so creators can examine post performance, including views and engagement, over time. (TikTok Support)',
    [{ href: TIKTOK_STUDIO, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-df-3',
    'Possible differences worth investigating include:',
  ),
  bullets('ul-df', [
    'topic,',
    'audience interest,',
    'video execution,',
    'viewer behaviour,',
    'search relevance,',
    'recommendation eligibility,',
    'and how people respond to each post.',
  ]),
  paragraph(
    'p-df-4',
    'But do not reduce the difference to:',
  ),
  paragraph('p-df-5', '“TikTok randomly chose one.”'),
  paragraph('p-df-6', 'or:'),
  paragraph(
    'p-df-7',
    '“The algorithm permanently hates the other.”',
  ),
  paragraph(
    'p-df-8',
    'A view count alone cannot diagnose the cause.',
  ),
  figure(
    'fig-alone',
    `${IMAGE_DIR}/dont-read-views-alone.png`,
    'A TikTok video connected to views, likes, comments, followers and search performance as separate questions',
    'Views are useful — but they are only one part of video performance.',
  ),

  heading(
    'h-dashboards',
    'Why Does TikTok Sometimes Show Different Numbers in Different Places?',
    2,
  ),
  paragraph(
    'p-db-1',
    'Different TikTok features can report different metrics.',
  ),
  paragraph('p-db-2', 'For example:'),
  bullets('ul-db', [
    'public view count,',
    'TikTok Studio analytics,',
    'Creator Search Insights,',
    'Promote analytics,',
    'and Creator Rewards qualified views',
  ]),
  paragraph(
    'p-db-3',
    'serve different purposes. TikTok Studio tracks post performance; Creator Search Insights reports Search performance; Promote has campaign analytics; and Creator Rewards maintains its own qualified-view rules. (TikTok Support)',
    [{ href: TIKTOK_STUDIO, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-db-4',
    'So if two TikTok screens display different numbers, first check:',
  ),
  paragraph(
    'p-db-5',
    'Are they actually reporting the same metric?',
  ),
  paragraph(
    'p-db-6',
    'Do not assume every dashboard should show an identical count.',
  ),

  heading(
    'h-stories',
    'Are TikTok Story Views Counted the Same as Video Views?',
    2,
  ),
  paragraph(
    'p-st-1',
    'TikTok Stories have their own viewing experience and analytics.',
  ),
  paragraph(
    'p-st-2',
    'TikTok says Story creators can see the total number of Story views and view the accounts that watched their Story. (TikTok Support)',
    [{ href: TIKTOK_STORIES, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-st-3',
    'That is a separate content format from standard TikTok posts.',
  ),
  paragraph(
    'p-st-4',
    'So this article should not use Story view behaviour to define ordinary video-post view counting.',
  ),
  paragraph(
    'p-st-5',
    'Different TikTok products can have different analytics contexts.',
  ),

  heading(
    'h-live',
    'Are TikTok LIVE Views the Same as Video Views?',
    2,
  ),
  paragraph('p-lv-1', 'No.'),
  paragraph(
    'p-lv-2',
    'TikTok LIVE is a real-time creator/viewer format, separate from ordinary uploaded posts. (TikTok Support)',
    [{ href: TIKTOK_LIVE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-lv-3',
    'Metrics around a LIVE session should therefore not be treated as identical to views on a standard TikTok video.',
  ),
  paragraph(
    'p-lv-4',
    'When someone asks:',
  ),
  paragraph(
    'p-lv-5',
    '“How many TikTok views did I get?”',
  ),
  paragraph('p-lv-6', 'the content type matters:'),
  bullets('ul-lv', [
    'post,',
    'Story,',
    'LIVE,',
    'Promote campaign,',
    'or Creator Rewards qualified video.',
  ]),

  heading('h-reach', 'Do TikTok Views Equal Reach?', 2),
  paragraph('p-rc-1', 'Do not assume that.'),
  paragraph(
    'p-rc-2',
    'The term views refers to viewing activity.',
  ),
  paragraph(
    'p-rc-3',
    '“Reach” generally describes how many distinct people or accounts were exposed to content in platforms that expose such a metric.',
  ),
  paragraph(
    'p-rc-4',
    'One viewer and one view are not conceptually guaranteed to be identical.',
  ),
  paragraph(
    'p-rc-5',
    "TikTok's Creator Rewards system makes this difference especially clear because it explicitly deduplicates qualified views from the same account for the same video. (TikTok Support)",
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-rc-6', 'Therefore:'),
  paragraph(
    'p-rc-7',
    'view count ≠ automatically unique audience size.',
  ),

  heading('h-watch', 'Do TikTok Views Equal Watch Time?', 2),
  paragraph('p-wt-1', 'No.'),
  paragraph(
    'p-wt-2',
    'They answer different questions.',
  ),
  paragraph(
    'p-wt-3',
    'A view count tells you about viewing activity.',
  ),
  paragraph(
    'p-wt-4',
    'Watch time tells you how long people spent watching.',
  ),
  paragraph(
    'p-wt-5',
    'One video could have a large number of short viewing sessions.',
  ),
  paragraph(
    'p-wt-6',
    'Another could have fewer viewers who watch much longer.',
  ),
  paragraph(
    'p-wt-7',
    'This distinction is particularly important because Creator Rewards qualified views require more than five seconds of viewing, demonstrating that TikTok can apply time-based conditions when defining a specialized metric. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-likes',
    'Do More TikTok Views Guarantee More Likes?',
    2,
  ),
  paragraph('p-lk-1', 'No.'),
  paragraph(
    'p-lk-2',
    'Viewing and liking are separate actions.',
  ),
  paragraph(
    'p-lk-3',
    'Someone can watch a video and continue scrolling without tapping Like.',
  ),
  paragraph('p-lk-4', 'Likewise, a viewer may:'),
  bullets('ul-lk', [
    'watch,',
    'like,',
    'comment,',
    'share,',
    'visit the profile,',
    'or follow.',
  ]),
  paragraph(
    'p-lk-5',
    'These actions should not be treated as automatic stages where everyone progresses from one to the next.',
  ),
  paragraph(
    'p-lk-6',
    'Our earlier guide on TikTok followers, likes and views explains those metric differences in more detail.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
    ],
  ),

  heading(
    'h-followers',
    'Do More TikTok Views Guarantee More Followers?',
    2,
  ),
  paragraph('p-fo-1', 'No.'),
  paragraph(
    'p-fo-2',
    'Views are a content-level metric.',
  ),
  paragraph(
    'p-fo-3',
    'Followers are an account-level audience connection.',
  ),
  paragraph(
    'p-fo-4',
    "TikTok can recommend content to people beyond an account's current followers, which is why an individual video can receive substantial viewing activity without creating proportional follower growth.",
  ),
  paragraph(
    'p-fo-5',
    'If this is happening frequently, our guide on TikTok views but few followers covers the possible reasons in more detail.',
    [
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'TikTok views but few followers',
      },
    ],
  ),

  heading(
    'h-search-views',
    'Can You Tell How Many Views Came From Search?',
    2,
  ),
  paragraph(
    'p-sv-1',
    "TikTok's Creator Search Insights includes Search analytics that allow creators to review how their posts are performing in TikTok search results. (TikTok Support)",
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-sv-2',
    'This is useful because it lets you look beyond the overall view total.',
  ),
  paragraph(
    'p-sv-3',
    'A creator can begin asking:',
  ),
  bullets('ul-sv', [
    'Which videos are getting discovered through Search?',
    'Which topics generate ongoing search activity?',
    'Which posts should receive follow-up content?',
  ]),
  paragraph(
    'p-sv-4',
    'This is much more useful than assuming every view came from the For You page.',
  ),

  heading('h-remove', 'Can TikTok Remove Views?', 2),
  paragraph(
    'p-rm-1',
    'TikTok has systems designed to identify deceptive and fraudulent platform activity, and its monetization systems explicitly exclude fraudulent views from Creator Rewards qualification. (TikTok Support)',
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-rm-2',
    'What you should avoid promising is:',
  ),
  paragraph(
    'p-rm-3',
    '“TikTok never changes view counts.”',
  ),
  paragraph('p-rm-4', 'or:'),
  paragraph(
    'p-rm-5',
    '“Every view shown today is permanent forever.”',
  ),
  paragraph(
    'p-rm-6',
    'Platforms control their own analytics and enforcement.',
  ),
  paragraph(
    'p-rm-7',
    'A third-party provider cannot guarantee how TikTok will display or validate every metric indefinitely.',
  ),

  heading(
    'h-freeze',
    'Why Do TikTok Views Sometimes Freeze?',
    2,
  ),
  paragraph(
    'p-fr-1',
    'A temporarily unchanged view count does not provide enough information to diagnose the reason.',
  ),
  paragraph(
    'p-fr-2',
    'TikTok itself says views can fluctuate and points creators toward analytics for a better understanding of content performance. (TikTok Support)',
    [{ href: TIKTOK_POST_VIEWS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-fr-3',
    'If a video appears stuck, look at:',
  ),
  bullets('ul-fr', [
    'TikTok Studio,',
    'recent post analytics,',
    'whether the content is public,',
    'account status,',
    'and whether other posts are behaving normally.',
  ]),
  paragraph(
    'p-fr-4',
    'Do not immediately assume:',
  ),
  bullets('ul-fr-not', [
    'shadowban',
    'view suppression',
    'or account penalty',
  ]),
  paragraph('p-fr-5', 'without actual evidence.'),

  heading(
    'h-delete',
    'Should You Delete a TikTok With Low Views?',
    2,
  ),
  paragraph(
    'p-dl-1',
    'Not simply because the public view count is low.',
  ),
  paragraph(
    'p-dl-2',
    'A video may still:',
  ),
  bullets('ul-dl', [
    'answer a useful search query,',
    'serve existing followers,',
    'provide context for future videos,',
    'receive later search activity,',
    'or help you understand which content resonates.',
  ]),
  paragraph(
    'p-dl-3',
    'TikTok recommends reviewing analytics to understand content performance. (TikTok Support)',
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-dl-4',
    'The better question is:',
  ),
  paragraph(
    'p-dl-5',
    'Is this video useful and appropriate for the audience I want?',
  ),
  paragraph('p-dl-6', 'Not:'),
  paragraph(
    'p-dl-7',
    'Did it immediately reach a particular arbitrary number?',
  ),

  heading(
    'h-evaluate',
    'How to Evaluate TikTok Video Views Properly',
    2,
  ),
  heading('h-ev-1', '1. Start With the View Count', 3),
  paragraph(
    'p-ev-1',
    'Use it as a visibility/performance signal.',
  ),
  heading('h-ev-2', '2. Compare Similar Videos', 3),
  paragraph(
    'p-ev-2',
    'Compare tutorials with tutorials rather than a tutorial against an unrelated entertainment clip.',
  ),
  heading('h-ev-3', '3. Look at Likes and Comments', 3),
  paragraph(
    'p-ev-3',
    'Views show viewing activity.',
  ),
  paragraph('p-ev-4', 'Interactions add context.'),
  heading('h-ev-4', '4. Look at Follower Changes', 3),
  paragraph(
    'p-ev-5',
    'Did the video lead to meaningful profile interest?',
  ),
  heading('h-ev-5', '5. Check TikTok Studio', 3),
  paragraph(
    'p-ev-6',
    'TikTok Studio lets creators review post performance and track views and likes over time. (TikTok Support)',
    [{ href: TIKTOK_STUDIO, label: 'TikTok Support', external: true }],
  ),
  heading('h-ev-6', '6. Review Search Analytics', 3),
  paragraph(
    'p-ev-7',
    'If search matters, use Creator Search Insights rather than guessing. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  heading('h-ev-7', '7. Keep Creator Rewards Separate', 3),
  paragraph(
    'p-ev-8',
    "If you're monetizing through Creator Rewards, evaluate qualified views, not just the public counter. (TikTok Support)",
    [{ href: TIKTOK_HOW_REWARDS_WORK, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-monetization',
    'Public TikTok Views and Monetization Are Not the Same Thing',
    2,
  ),
  paragraph(
    'p-mn-1',
    'This deserves repeating because it prevents misleading expectations.',
  ),
  paragraph(
    'p-mn-2',
    'A video having:',
  ),
  paragraph('p-mn-3', '100,000 public views'),
  paragraph(
    'p-mn-4',
    'does not automatically mean:',
  ),
  paragraph('p-mn-5', '100,000 monetizable qualified views.'),
  paragraph(
    'p-mn-6',
    "TikTok's Creator Rewards Program applies additional conditions.",
  ),
  paragraph(
    'p-mn-7',
    'Qualified views must meet its criteria, including being unique For You feed views and excluding views that fail the program\'s stated requirements. (TikTok Support)',
    [{ href: TIKTOK_CREATOR_REWARDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-mn-8', 'Therefore:'),
  paragraph('p-mn-9', 'public popularity'),
  paragraph('p-mn-10', 'and:'),
  paragraph('p-mn-11', 'reward-eligible viewing'),
  paragraph(
    'p-mn-12',
    'are related but separate concepts.',
  ),

  heading(
    'h-simple',
    'How Are TikTok Video Views Counted in Simple Terms?',
    2,
  ),
  paragraph(
    'p-sm-1',
    'The safest way to think about the system is:',
  ),
  bullets('ul-sm', [
    'Someone encounters a TikTok video.',
    "Viewing activity contributes to the video's performance metrics.",
    'TikTok Studio lets creators inspect post performance.',
    'If the creator participates in Creator Rewards, TikTok separately evaluates which views meet qualified-view requirements.',
    'Only eligible views become qualified views for that program.',
  ]),
  paragraph(
    'p-sm-2',
    'TikTok does not need one universal view definition for every product because different features serve different purposes.',
  ),
  paragraph(
    'p-sm-3',
    'That is why creators should always check the label attached to the number.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'TikTok Studio tracks views as part of post performance analytics.',
    'TikTok does not publicly expose a complete ordinary-view formula that supports every popular “X seconds = a public view” claim.',
    'Public video views should not automatically be treated as unique viewers.',
    'Creator Rewards qualified views are a separate, stricter metric.',
    'Qualified views are unique views from the For You feed and exclude fraudulent, paid, disliked and under-five-second views.',
    'TikTok says views from the same account count only once for one video\'s Creator Rewards qualified-view calculation.',
    'Public views do not guarantee followers, likes, FYP reach, Search ranking or monetization.',
    'TikTok says post views can fluctuate and recommends using analytics to understand performance.',
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

export const HOW_TIKTOK_VIDEO_VIEWS_ARE_COUNTED_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-tiktok-video-views-are-counted',
  slug: SLUG,
  title: 'How Are TikTok Video Views Counted?',
  excerpt:
    'TikTok view counts look simple, but public video views and Creator Rewards qualified views are not the same metric.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['views', 'analytics', 'algorithm', 'creator', 'engagement'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Editorial illustration of a TikTok video player, a view icon and an analytics concept for counting video views',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'How Are TikTok Video Views Counted?',
    description:
      'Learn what TikTok video views measure, why views can differ from unique viewers, and how ordinary views differ from Creator Rewards qualified views.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how TikTok views are counted',
      'what counts as a view on TikTok',
      'TikTok views explained',
      'TikTok qualified views',
      'TikTok repeat views',
      'TikTok video analytics',
    ],
  },
  relatedServices: ['buy-tiktok-views'],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'tiktok-seo',
    'how-to-get-1000-tiktok-followers',
    'tiktok-likes-vs-views',
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
    'Video views: general viewing activity associated with a TikTok post.',
    'Unique viewers: a different concept from raw view count, where TikTok provides such analytics.',
    'Qualified views: a special Creator Rewards metric with additional requirements.',
    'Views do not automatically equal followers, likes, comments, shares, sales or unique people.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What counts as a view on TikTok?',
      answer:
        'TikTok tracks video views as part of post performance, but its public creator documentation does not expose a complete ordinary-view formula covering every possible playback scenario. Creator Rewards qualified views have their own much more specific rules.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does someone have to watch five seconds for a TikTok view?',
      answer:
        'TikTok specifically requires more than five seconds for a Creator Rewards qualified view. That requirement should not automatically be presented as the universal definition of every ordinary public TikTok view.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Can the same person create multiple TikTok views?',
      answer:
        'People can encounter or replay content more than once. For Creator Rewards specifically, TikTok says views from the same account are counted only once for one video when calculating qualified views.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Are TikTok public views the same as qualified views?',
      answer:
        'No. Creator Rewards qualified views have additional rules, including unique For You feed viewing and exclusions for fraudulent, paid, disliked and under-five-second views.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do purchased TikTok views count toward Creator Rewards?',
      answer:
        'They should not be represented that way. TikTok excludes paid and fraudulent views from qualified views and prohibits fraudulent activity such as fake video views within Creator Rewards.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Why are my TikTok views changing or fluctuating?',
      answer:
        'TikTok says post views can fluctuate and recommends reviewing analytics to better understand content performance.',
      schemaEligible: true,
    },
  ],
};
