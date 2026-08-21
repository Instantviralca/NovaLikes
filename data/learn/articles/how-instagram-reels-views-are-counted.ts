/**
 * Article #11 — How Are Instagram Reels Views Counted?
 * Scheduled: Wednesday 16 September 2026.
 * Informational intent. Keeps Reel Views (plays/replays) separate from Accounts reached and Watch time.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-instagram-reels-views-are-counted';
const SCHEDULED_AT = '2026-09-16T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_REEL_INSIGHTS =
  'https://www.facebook.com/help/instagram/202865988324236';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_CREATORS_BREAKTHROUGH =
  'https://creators.instagram.com/blog/helping-creators-of-all-sizes-break-through';
const IG_CREATORS_FAQ = 'https://creators.instagram.com/faq';
const IG_STORY_INSIGHTS =
  'https://www.facebook.com/help/instagram/383939598845756';
const IG_CREATORS_INSIGHTS =
  'https://creators.instagram.com/grow/insights';

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
    'Instagram Reels display a simple number that can raise surprisingly complicated questions.',
  ),
  bullets('ul-open-q', [
    'What counts as a view?',
    'Does a replay count?',
    'Can one person create multiple views?',
    'Why can Reel views be higher than the number of accounts reached?',
    'And is a view the same thing as watch time?',
  ]),
  paragraph(
    'p-open-2',
    "Instagram's current Reel Insights documentation gives a useful starting point.",
  ),
  paragraph(
    'p-open-3',
    'For Reels, Instagram defines Views as the number of times the Reel starts to play or replay. It separately defines Accounts reached as the number of unique accounts that have seen the Reel at least once. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-4',
    'That distinction explains one of the biggest sources of confusion:',
  ),
  paragraph('p-open-5', 'Views measure plays and replays.'),
  paragraph(
    'p-open-6',
    'Accounts reached measures unique accounts.',
  ),
  paragraph(
    'p-open-7',
    'So if one person watches a Reel more than once, your total views can be higher than the number of unique accounts reached.',
  ),

  heading(
    'h-what',
    'What Counts as an Instagram Reel View?',
    2,
  ),
  paragraph(
    'p-wh-1',
    "Instagram's current Help Center describes Reel Views as the number of times the Reel starts to play or replay. (Facebook)",
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wh-2',
    'This means you should not think of the Reel view total as a strict count of individual people.',
  ),
  paragraph('p-wh-3', 'It is a playback metric.'),
  paragraph(
    'p-wh-4',
    "If a Reel starts playing, that contributes to the view metric according to Instagram's definition.",
  ),
  paragraph(
    'p-wh-5',
    'If it replays, that can also contribute to views.',
  ),
  paragraph(
    'p-wh-6',
    'This is different from Accounts reached, which Instagram defines around unique accounts.',
  ),
  heading('h-example', 'Simple Example', 3),
  paragraph(
    'p-wh-7',
    'Imagine three people watch your Reel.',
  ),
  paragraph('p-wh-8', 'Person A watches once.'),
  paragraph('p-wh-9', 'Person B watches twice.'),
  paragraph('p-wh-10', 'Person C watches once.'),
  paragraph(
    'p-wh-11',
    'Conceptually, you could have:',
  ),
  paragraph('p-wh-12', 'Accounts reached: 3'),
  paragraph('p-wh-13', 'while:'),
  paragraph('p-wh-14', 'Views: 4'),
  paragraph(
    'p-wh-15',
    'because one account replayed the Reel.',
  ),
  paragraph(
    'p-wh-16',
    'This is only a simplified example showing why the two metrics can diverge. It is not a prediction of how any specific Reel will perform.',
  ),
  figure(
    'fig-views-reach',
    `${IMAGE_DIR}/reel-views-vs-reach.png`,
    'Simplified example with three people watching a Reel for four total plays, showing views as four plays or replays and accounts reached as three unique accounts',
    'Views can be higher than reach because replays are included in the Reel view metric. Simplified example.',
  ),

  heading(
    'h-replays',
    'Do Replays Count as Instagram Reel Views?',
    2,
  ),
  paragraph('p-rp-1', 'Yes.'),
  paragraph(
    'p-rp-2',
    'Instagram explicitly includes replays in its current Reel Views definition. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-rp-3',
    'That is important because it means:',
  ),
  paragraph(
    'p-rp-4',
    '10,000 Reel views does not necessarily mean 10,000 different accounts watched the Reel.',
  ),
  paragraph(
    'p-rp-5',
    'Some of those views may involve repeat playback.',
  ),
  paragraph(
    'p-rp-6',
    'To understand how many unique accounts saw the content, Accounts reached is the more relevant metric.',
  ),
  paragraph(
    'p-rp-7',
    'This is one reason creators should avoid using:',
  ),
  paragraph('p-rp-8', 'Views = people'),
  paragraph(
    'p-rp-9',
    'as if the terms are interchangeable.',
  ),
  paragraph('p-rp-10', 'They are not.'),

  heading('h-unique', 'Are Instagram Reel Views Unique?', 2),
  paragraph('p-un-1', 'No.'),
  paragraph(
    'p-un-2',
    'The Reel view metric itself is not a unique-account metric because it includes starts and replays. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-un-3',
    'For unique audience size, Instagram provides Accounts reached.',
  ),
  paragraph(
    'p-un-4',
    "Meta's broader Instagram Insights documentation similarly defines Views as the number of times content was played or displayed, while reach-based metrics focus on unique accounts. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-un-5',
    'So when reporting results, it is more accurate to say:',
  ),
  paragraph(
    'p-un-6',
    '“The Reel received 20,000 views.”',
  ),
  paragraph('p-un-7', 'rather than:'),
  paragraph(
    'p-un-8',
    '“20,000 people watched the Reel.”',
  ),
  paragraph(
    'p-un-9',
    'unless you actually have unique reach data supporting that second statement.',
  ),

  heading(
    'h-vs-reach',
    'Instagram Reel Views vs Accounts Reached',
    2,
  ),
  paragraph(
    'p-vr-1',
    'These are two of the most useful Reel metrics to compare.',
  ),
  {
    id: 'table-views-reach',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Measures'],
    rows: [
      ['Views', 'Starts and replays'],
      ['Accounts reached', 'Unique accounts that saw the Reel'],
    ],
  },
  paragraph(
    'p-vr-2',
    'Instagram clearly separates the two in Reel Insights. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-vr-ex', 'Example', 3),
  paragraph('p-vr-3', 'Suppose:'),
  paragraph('p-vr-4', 'Views: 25,000'),
  paragraph('p-vr-5', 'Accounts reached: 18,000'),
  paragraph(
    'p-vr-6',
    'That does not mean Instagram made a mistake.',
  ),
  paragraph(
    'p-vr-7',
    'A reasonable interpretation is that the Reel accumulated more total playback activity than unique-account exposure.',
  ),
  paragraph(
    'p-vr-8',
    'Some viewers may have encountered or replayed the content more than once.',
  ),

  heading(
    'h-higher',
    'Why Can Views Be Higher Than Reach?',
    2,
  ),
  paragraph(
    'p-hi-1',
    'Because the metrics answer different questions.',
  ),
  paragraph('p-hi-2', 'Reach asks:'),
  paragraph(
    'p-hi-3',
    'How many unique accounts saw the content?',
  ),
  paragraph('p-hi-4', 'Views asks:'),
  paragraph(
    'p-hi-5',
    'How much play/replay activity did the Reel receive?',
  ),
  paragraph(
    'p-hi-6',
    "Instagram's documentation explicitly includes replays in views, so repeat viewing can make the view total higher than unique reach. (Facebook)",
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hi-7',
    'This is normal metric behaviour.',
  ),
  paragraph(
    'p-hi-8',
    'It should not automatically be interpreted as:',
  ),
  bullets('ul-hi-not', [
    'fake views,',
    'an analytics bug,',
    'or Instagram inflating numbers.',
  ]),
  paragraph(
    'p-hi-9',
    'First compare what each metric is designed to measure.',
  ),
  figure(
    'fig-three-q',
    `${IMAGE_DIR}/three-different-questions.png`,
    'An Instagram Reel connected to three questions: views for plays and replays, reach for unique accounts, and watch time for total viewing duration',
    'One Reel can produce three different numbers because the metrics measure different things.',
  ),

  heading('h-watch', 'What Is Instagram Reel Watch Time?', 2),
  paragraph(
    'p-wt-1',
    'Instagram Reel Insights includes Watch time, which Meta defines as the total amount of time a Reel was played. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wt-2',
    'This is different from views.',
  ),
  paragraph(
    'p-wt-3',
    'Two Reels could each have:',
  ),
  paragraph('p-wt-4', '10,000 views'),
  paragraph(
    'p-wt-5',
    'but very different total watch time.',
  ),
  paragraph('p-wt-6', 'Imagine:'),
  paragraph('p-wt-7', 'Reel A is 10 seconds long.'),
  paragraph('p-wt-8', 'Reel B is 60 seconds long.'),
  paragraph(
    'p-wt-9',
    'Even with identical public view totals, audience viewing behaviour could be very different.',
  ),
  paragraph(
    'p-wt-10',
    'That is why views alone do not tell you how deeply people watched.',
  ),
  heading('h-views-ask', 'Views Ask', 3),
  paragraph(
    'p-wt-11',
    'Did the Reel play or replay?',
  ),
  heading('h-watch-ask', 'Watch Time Asks', 3),
  paragraph(
    'p-wt-12',
    'How much viewing time accumulated?',
  ),
  paragraph(
    'p-wt-13',
    'Those metrics work better together than separately.',
  ),

  heading('h-avg', 'What Is Average Watch Time?', 2),
  paragraph(
    'p-av-1',
    'Instagram also provides average watch-time information in Reel Insights, helping creators understand the average amount of time viewers spent playing their Reel. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-av-2',
    'Average watch time can add context when comparing content.',
  ),
  paragraph(
    'p-av-3',
    'For example:',
  ),
  paragraph(
    'p-av-4',
    'A 45-second Reel with an average viewing duration of several seconds tells a different story from another 45-second Reel where viewers consistently spend much longer watching.',
  ),
  paragraph(
    'p-av-5',
    'But avoid turning average watch time into an unsupported universal rule such as:',
  ),
  paragraph(
    'p-av-6',
    '“You need a specific watch-time percentage to reach Explore.”',
  ),
  paragraph(
    'p-av-7',
    'Instagram does not publish one universal threshold that guarantees recommendation.',
  ),
  paragraph(
    'p-av-8',
    'Use the metric to compare your own content instead.',
  ),

  heading(
    'h-complete',
    'Does Someone Need to Watch the Entire Reel for It to Count as a View?',
    2,
  ),
  paragraph(
    'p-cm-1',
    "Instagram's current public Reel Views definition does not say someone must complete the entire Reel before the view exists.",
  ),
  paragraph(
    'p-cm-2',
    'It defines views around the Reel starting to play or replay. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cm-3',
    'So statements such as:',
  ),
  paragraph(
    'p-cm-4',
    '“A Reel only counts after someone watches 100%.”',
  ),
  paragraph(
    'p-cm-5',
    "would conflict with Instagram's current published definition.",
  ),
  paragraph(
    'p-cm-6',
    'Completion can still be useful performance context, but it is not how Meta currently defines the basic Reel Views metric.',
  ),

  heading(
    'h-three-sec',
    'Does Someone Need to Watch Three Seconds?',
    2,
  ),
  paragraph(
    'p-ts-1',
    'Be careful with this claim too.',
  ),
  paragraph(
    'p-ts-2',
    'Older social-video metrics, advertising metrics and other platforms have sometimes used different time thresholds.',
  ),
  paragraph(
    'p-ts-3',
    "But Instagram's current Reel Insights definition presented to creators is simply:",
  ),
  paragraph(
    'p-ts-4',
    'the number of times the Reel starts to play or replay. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ts-5',
    "So don't insert an unsupported:",
  ),
  paragraph(
    'p-ts-6',
    '“Three seconds are required for every Reel view.”',
  ),
  paragraph(
    'p-ts-7',
    "Use Instagram's current definition rather than recycled advice from old articles.",
  ),

  heading(
    'h-same-person',
    'Can the Same Person Create Multiple Reel Views?',
    2,
  ),
  paragraph(
    'p-sp-1',
    'Because Instagram includes replays in Reel Views, repeat playback can contribute to total view activity. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sp-2',
    'That is exactly why the unique audience metric is separate.',
  ),
  paragraph(
    'p-sp-3',
    'One account can contribute to:',
  ),
  paragraph('p-sp-4', 'one Account reached'),
  paragraph(
    'p-sp-5',
    'while the Reel accumulates more than one playback through replay behaviour.',
  ),
  paragraph('p-sp-6', 'Again:'),
  paragraph('p-sp-7', 'Views = playback'),
  paragraph('p-sp-8', 'Reach = unique audience'),

  heading('h-loops', 'Do Loops Count as Replays?', 2),
  paragraph(
    'p-lp-1',
    'Instagram confirms that replays are included in the Views metric, but its public Help documentation does not provide a complete technical breakdown of every automatic looping scenario.',
  ),
  paragraph(
    'p-lp-2',
    'So avoid over-specific statements such as:',
  ),
  paragraph(
    'p-lp-3',
    '“Every automatic loop always adds exactly one view.”',
  ),
  paragraph(
    'p-lp-4',
    'What we can safely say is:',
  ),
  paragraph(
    'p-lp-5',
    'replays are included in Reel Views. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lp-6',
    'We do not need to invent implementation details that Instagram does not publicly document.',
  ),

  heading(
    'h-followers',
    'Why Are Reel Views Higher Than Followers?',
    2,
  ),
  paragraph(
    'p-fo-1',
    'Because follower count and Reel views measure entirely different things.',
  ),
  paragraph(
    'p-fo-2',
    'Followers are connected to the account.',
  ),
  paragraph(
    'p-fo-3',
    'Reel Views measure playback activity on content.',
  ),
  paragraph(
    'p-fo-4',
    "Instagram's creator resources also emphasize that Reels can reach people who do not already follow the creator. Instagram specifically notes that people often watch Reels from accounts they do not follow. (Instagram Creators)",
    [{ href: IG_CREATORS_BREAKTHROUGH, label: 'Instagram Creators', external: true }],
  ),
  paragraph('p-fo-5', 'So:'),
  paragraph('p-fo-6', '5,000 followers'),
  paragraph('p-fo-7', 'and:'),
  paragraph('p-fo-8', '50,000 Reel views'),
  paragraph(
    'p-fo-9',
    'are not contradictory.',
  ),
  paragraph(
    'p-fo-10',
    'The Reel can be discovered beyond the existing follower audience, and viewers can replay it as well.',
  ),

  heading(
    'h-options',
    'Compare Instagram View Options',
    2,
  ),
  paragraph(
    'p-op-1',
    'Instagram Reel views are a content-level metric.',
  ),
  paragraph(
    'p-op-2',
    'Instagram views should be understood as a playback-activity service.',
    [{ href: '/buy-instagram-views', label: 'Instagram views' }],
  ),
  paragraph(
    'p-op-3',
    'A view service should be represented as a view service.',
  ),
  paragraph(
    'p-op-4',
    'It should not be described as a guaranteed method for:',
  ),
  bullets('ul-op', [
    'more followers,',
    'Explore placement,',
    'Reels recommendation,',
    'likes,',
    'comments,',
    'sales,',
    'or organic reach.',
  ]),
  {
    id: 'cta-ig-views',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-instagram-views',
    heading: 'Compare Instagram View Options',
    description:
      'Instagram views measure content playback activity. Compare the available options without treating views as a guarantee of followers, engagement, reach or recommendation performance.',
    label: 'View Instagram View Packages',
  },

  heading(
    'h-few-likes',
    'Why Can a Reel Have Many Views but Few Likes?',
    2,
  ),
  paragraph(
    'p-fl-1',
    'Because watching and liking are separate actions.',
  ),
  paragraph('p-fl-2', 'A viewer can:'),
  bullets('ul-fl', [
    'watch,',
    'replay,',
    'and move on',
  ]),
  paragraph(
    'p-fl-3',
    'without pressing Like.',
  ),
  paragraph(
    'p-fl-4',
    'Instagram tracks Reel Views separately from interactions such as likes, comments, saves and shares. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph('p-fl-5', 'So:'),
  paragraph('p-fl-6', 'high views + lower likes'),
  paragraph(
    'p-fl-7',
    'is not automatically strange.',
  ),
  paragraph(
    'p-fl-8',
    'It means the Reel received significant playback activity while fewer viewers chose that specific form of interaction.',
  ),
  paragraph(
    'p-fl-9',
    'To understand content performance better, compare several metrics.',
  ),

  heading(
    'h-few-followers',
    'Why Can a Reel Have Many Views but Few Followers?',
    2,
  ),
  paragraph(
    'p-ff-1',
    'The same principle applies.',
  ),
  paragraph(
    'p-ff-2',
    'A view means the Reel played.',
  ),
  paragraph(
    'p-ff-3',
    'A follow requires someone to make an additional account-level decision.',
  ),
  paragraph(
    'p-ff-4',
    'Instagram Reel Insights can show follows generated from a Reel separately from the view count. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph('p-ff-5', 'This shows why:'),
  paragraph('p-ff-6', 'view ≠ follow'),
  paragraph(
    'p-ff-7',
    'A viewer may enjoy one Reel without deciding to follow the profile.',
  ),
  paragraph(
    'p-ff-8',
    'For more detail on account-level versus content-level Instagram metrics, our earlier guide on Instagram followers, likes, views and comments explains the differences.',
    [
      {
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        label: 'Instagram followers, likes, views and comments',
      },
    ],
  ),
  paragraph(
    'p-ff-9',
    'If follower totals later change after a period of Reel discovery, why Instagram followers can drop covers ordinary unfollows, disabled accounts and other audience-change reasons besides view performance.',
    [
      {
        href: '/learn/why-instagram-followers-drop',
        label: 'why Instagram followers can drop',
      },
    ],
  ),

  heading(
    'h-non-followers',
    'Can Reel Views Come From Non-Followers?',
    2,
  ),
  paragraph('p-nf-1', 'Yes.'),
  paragraph(
    'p-nf-2',
    'Instagram explicitly encourages creators to use Insights to understand people viewing their content even when those people do not follow them, and its creator guidance emphasizes Reels as a discovery format capable of reaching new audiences. (Instagram Creators)',
    [{ href: IG_CREATORS_FAQ, label: 'Instagram Creators', external: true }],
  ),
  paragraph(
    'p-nf-3',
    "This is one reason Reels can generate view totals substantially higher than an account's follower number.",
  ),
  paragraph(
    'p-nf-4',
    'Instagram recommendations are personalized, so content may be surfaced to people based on relevance and interests rather than follower connection alone.',
  ),
  figure(
    'fig-actions',
    `${IMAGE_DIR}/view-to-optional-actions.png`,
    'Flow from a Reel appearing and receiving a view to optional later actions such as like, comment, save, share or follow',
    'A view does not automatically create any of the next actions.',
  ),

  heading(
    'h-impressions',
    'What Is the Difference Between Reel Views and Impressions?',
    2,
  ),
  paragraph(
    'p-im-1',
    "Instagram's current Insights model increasingly uses Views as a broad metric for how often content was played or displayed. Meta's Instagram Insights documentation says Views can apply across Reels, posts, Stories, Live videos and ads. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-im-2',
    'For Reels specifically, the clearer creator-facing comparison is usually:',
  ),
  paragraph('p-im-3', 'Views vs Accounts reached'),
  paragraph(
    'p-im-4',
    'Views includes starts/replays.',
  ),
  paragraph(
    'p-im-5',
    'Accounts reached represents unique accounts.',
  ),
  paragraph(
    'p-im-6',
    'Older articles may use terminology such as Plays or Impressions depending on the period and analytics surface.',
  ),
  paragraph(
    'p-im-7',
    "For a current article, follow Instagram's current UI terminology rather than copying outdated metric labels.",
  ),

  heading(
    'h-changed',
    'Why Did Instagram Change Reel Metrics?',
    2,
  ),
  paragraph(
    'p-ch-1',
    'Instagram frequently updates how Insights are presented.',
  ),
  paragraph(
    'p-ch-2',
    'The practical response is not to build an article around historical labels.',
  ),
  paragraph(
    'p-ch-3',
    "Use the metric definitions available in Instagram's current Help Center.",
  ),
  paragraph(
    'p-ch-4',
    'At present:',
  ),
  paragraph(
    'p-ch-5',
    'Views is the key play/display metric across Instagram Insights, and for Reels it includes starts and replays. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ch-6',
    'If Instagram changes that definition later, this article should be updated rather than preserving an outdated explanation.',
  ),

  heading(
    'h-who',
    'Can You See Who Viewed an Instagram Reel?',
    2,
  ),
  paragraph(
    'p-who-1',
    'Instagram Reel Insights gives creators aggregated performance metrics such as views and accounts reached.',
  ),
  paragraph(
    'p-who-2',
    "It does not function like Story viewers where Instagram can show a list of individual accounts that viewed a Story. Instagram's Story Insights documentation distinguishes total Views from unique Viewers. (Facebook)",
    [{ href: IG_STORY_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-who-3',
    'So do not advertise ordinary Reel analytics as a tool for identifying every person who watched a Reel.',
  ),
  paragraph(
    'p-who-4',
    'That is not the purpose of the view metric.',
  ),

  heading('h-stories', 'Reel Views vs Story Views', 2),
  paragraph(
    'p-st-1',
    'Both formats now use a Views metric, but they are different content experiences.',
  ),
  paragraph(
    'p-st-2',
    'Instagram defines Story Views as the number of times a Story was played or displayed and separately defines Viewers as unique accounts that saw it. (Facebook)',
    [{ href: IG_STORY_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph('p-st-3', 'For Reels:'),
  bullets('ul-st', [
    'Views are starts/replays.',
    'Accounts reached provides unique-account context.',
  ]),
  paragraph(
    'p-st-4',
    '(Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-st-5',
    'The broad concept is similar:',
  ),
  paragraph(
    'p-st-6',
    'total viewing activity is separate from unique audience.',
  ),
  paragraph(
    'p-st-7',
    'But avoid using Story-specific behaviour to invent Reel rules.',
  ),

  heading(
    'h-boosted',
    'Can Boosted Reel Views Be Different From Organic Views?',
    2,
  ),
  paragraph(
    'p-bo-1',
    'Paid distribution and organic discovery are different traffic contexts.',
  ),
  paragraph(
    'p-bo-2',
    'Instagram supports promoted content and advertising, so a creator evaluating a boosted Reel should distinguish paid performance from organic performance where the relevant reporting is available.',
  ),
  paragraph(
    'p-bo-3',
    'Do not assume every view has the same acquisition source.',
  ),
  paragraph(
    'p-bo-4',
    'More importantly for NovaLikes:',
  ),
  paragraph(
    'p-bo-5',
    'do not present third-party Instagram view services as:',
  ),
  bullets('ul-bo', [
    'Instagram advertising',
    'or official Instagram promotion.',
  ]),
  paragraph(
    'p-bo-6',
    'They are different products and should remain clearly separated.',
  ),

  heading(
    'h-algorithm',
    'Do Purchased Instagram Views Improve the Algorithm?',
    2,
  ),
  paragraph(
    'p-al-1',
    'No guarantee should be made.',
  ),
  paragraph(
    'p-al-2',
    'A view service concerns the view metric.',
  ),
  paragraph(
    'p-al-3',
    'Instagram ranking and recommendation systems evaluate multiple signals and personalize what people see. Our separate guide on how the Instagram algorithm works explains those systems in more detail.',
    [
      {
        href: '/learn/how-instagram-algorithm-works',
        label: 'how the Instagram algorithm works',
      },
    ],
  ),
  paragraph(
    'p-al-4',
    'There is no responsible basis for promising:',
  ),
  bullets('ul-al', [
    'Buy views → reach Explore',
    'Buy views → Instagram pushes the Reel',
    'Buy views → more organic followers',
    'Buy views → viral Reel',
  ]),
  paragraph(
    'p-al-5',
    'Those are different outcomes.',
  ),

  heading(
    'h-likes-imp',
    'Are Views More Important Than Likes?',
    2,
  ),
  paragraph(
    'p-li-1',
    'Neither is universally more important.',
  ),
  paragraph(
    'p-li-2',
    'They answer different questions.',
  ),
  paragraph(
    'p-li-3',
    'If you want to understand:',
  ),
  paragraph(
    'p-li-4',
    'How much playback activity occurred?',
  ),
  paragraph('p-li-5', 'Views are useful.'),
  paragraph(
    'p-li-6',
    'If you want to understand:',
  ),
  paragraph(
    'p-li-7',
    'How many people chose to tap Like?',
  ),
  paragraph('p-li-8', 'Likes are useful.'),
  paragraph('p-li-9', 'If you want:'),
  paragraph('p-li-10', 'unique audience size'),
  paragraph(
    'p-li-11',
    'look at Accounts reached.',
  ),
  paragraph('p-li-12', 'If you want:'),
  paragraph('p-li-13', 'viewing depth'),
  paragraph('p-li-14', 'use watch-time metrics.'),
  paragraph(
    'p-li-15',
    'The right metric depends on the question.',
  ),

  heading(
    'h-reach-imp',
    'Are Views More Important Than Reach?',
    2,
  ),
  paragraph(
    'p-ri-1',
    'Again, they measure different things.',
  ),
  paragraph('p-ri-2', 'Imagine:'),
  heading('h-reel-a', 'Reel A', 3),
  paragraph('p-ri-3', 'Views: 100,000'),
  paragraph('p-ri-4', 'Accounts reached: 90,000'),
  heading('h-reel-b', 'Reel B', 3),
  paragraph('p-ri-5', 'Views: 100,000'),
  paragraph('p-ri-6', 'Accounts reached: 45,000'),
  paragraph(
    'p-ri-7',
    'Both have the same total views.',
  ),
  paragraph(
    'p-ri-8',
    'But Reel B has much more playback activity relative to the number of unique accounts reached.',
  ),
  paragraph(
    'p-ri-9',
    'That could suggest greater repeat viewing, although you should inspect the full analytics before drawing conclusions.',
  ),
  paragraph('p-ri-10', 'The point is:'),
  paragraph(
    'p-ri-11',
    'same views ≠ same audience behaviour.',
  ),

  heading(
    'h-stop',
    'Why Did My Reel Views Suddenly Stop?',
    2,
  ),
  paragraph(
    'p-stop-1',
    'A stalled public view count alone does not tell you why distribution changed.',
  ),
  paragraph(
    'p-stop-2',
    'Possible areas to investigate include:',
  ),
  bullets('ul-stop', [
    'recent Reel Insights,',
    'Accounts reached,',
    'watch-time patterns,',
    'engagement,',
    'recommendation eligibility,',
    'and Account Status.',
  ]),
  paragraph(
    'p-stop-3',
    'Do not immediately diagnose:',
  ),
  bullets('ul-stop-not', [
    'shadowban',
    'or algorithm penalty',
  ]),
  paragraph(
    'p-stop-4',
    'based only on one number.',
  ),
  paragraph(
    'p-stop-5',
    'Instagram offers Insights specifically so creators can examine content performance beyond a public view counter. (Instagram Creators)',
    [{ href: IG_CREATORS_INSIGHTS, label: 'Instagram Creators', external: true }],
  ),

  heading(
    'h-delete',
    'Should You Delete a Reel With Low Views?',
    2,
  ),
  paragraph(
    'p-dl-1',
    'Not simply because its public view count is lower than expected.',
  ),
  paragraph(
    'p-dl-2',
    'A Reel might still:',
  ),
  bullets('ul-dl', [
    'answer a useful question,',
    'serve an existing audience,',
    'generate saves,',
    'bring profile visits,',
    'create followers,',
    'or provide information you can use to improve future content.',
  ]),
  paragraph(
    'p-dl-3',
    'One Reel is one data point.',
  ),
  paragraph(
    'p-dl-4',
    'Look at performance across multiple posts before making large strategic changes.',
  ),

  heading(
    'h-evaluate',
    'How to Evaluate Instagram Reel Views Properly',
    2,
  ),
  heading('h-ev-1', '1. Start With Views', 3),
  paragraph(
    'p-ev-1',
    'Understand how much playback/replay activity occurred.',
  ),
  heading('h-ev-2', '2. Check Accounts Reached', 3),
  paragraph(
    'p-ev-2',
    'How many unique accounts saw the Reel?',
  ),
  paragraph(
    'p-ev-3',
    'Instagram separates this explicitly from Views. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-ev-3', '3. Check Watch Time', 3),
  paragraph(
    'p-ev-4',
    'How much viewing time accumulated? (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-ev-4', '4. Check Likes and Comments', 3),
  paragraph(
    'p-ev-5',
    'Did viewers actively interact?',
  ),
  heading('h-ev-5', '5. Check Saves and Shares', 3),
  paragraph(
    'p-ev-6',
    'Did people find the content useful enough to save or share?',
  ),
  heading('h-ev-6', '6. Check Follows', 3),
  paragraph(
    'p-ev-7',
    'Did the Reel contribute to new followers?',
  ),
  paragraph(
    'p-ev-8',
    'Instagram provides follow information within Reel Insights. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-ev-7', '7. Compare Similar Reels', 3),
  paragraph(
    'p-ev-9',
    'Do not compare one short comedy clip with a long educational tutorial as though their audience behaviour should be identical.',
  ),
  heading('h-ev-8', '8. Look for Patterns', 3),
  paragraph(
    'p-ev-10',
    'Several posts tell you more than one unusually strong or weak Reel.',
  ),

  heading(
    'h-one-part',
    'Instagram Reel Views Are Only One Part of Performance',
    2,
  ),
  paragraph(
    'p-op2-1',
    'A Reel with the largest view number is not automatically your most useful Reel.',
  ),
  paragraph('p-op2-2', 'Consider:'),
  paragraph('p-op2-3', 'Reel A:'),
  paragraph('p-op2-4', '100,000 views'),
  paragraph('p-op2-5', 'few profile actions'),
  paragraph('p-op2-6', 'Reel B:'),
  paragraph('p-op2-7', '30,000 views'),
  paragraph(
    'p-op2-8',
    'more saves, comments and new followers',
  ),
  paragraph(
    'p-op2-9',
    'Which one performed better?',
  ),
  paragraph(
    'p-op2-10',
    'That depends on your goal.',
  ),
  paragraph(
    'p-op2-11',
    'If the objective was:',
  ),
  paragraph('p-op2-12', 'visibility'),
  paragraph(
    'p-op2-13',
    'Reel A may be more relevant.',
  ),
  paragraph(
    'p-op2-14',
    'If the objective was:',
  ),
  paragraph('p-op2-15', 'audience growth'),
  paragraph(
    'p-op2-16',
    'Reel B may be more useful.',
  ),
  paragraph(
    'p-op2-17',
    'Instagram provides multiple Insights metrics because one number cannot describe every type of performance. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-simple',
    'How Instagram Reel Views Are Counted in Simple Terms',
    2,
  ),
  paragraph(
    'p-sm-1',
    'The cleanest way to understand it is:',
  ),
  bullets('ul-sm', [
    'A Reel starts playing.',
    'That contributes to Views.',
    'If it replays, the replay can also contribute to Views.',
    'Instagram separately tracks unique Accounts reached.',
    'Watch time measures viewing duration.',
    'Likes, comments, saves, shares and follows measure additional actions.',
  ]),
  paragraph(
    'p-sm-2',
    'So when someone says:',
  ),
  paragraph(
    'p-sm-3',
    '“My Reel has 50,000 views.”',
  ),
  paragraph(
    'p-sm-4',
    'that tells you about playback activity.',
  ),
  paragraph(
    'p-sm-5',
    'It does not automatically mean:',
  ),
  bullets('ul-sm-not', [
    '50,000 unique people,',
    '50,000 full watches,',
    '50,000 followers,',
    'or 50,000 engaged viewers.',
  ]),
  paragraph(
    'p-sm-6',
    'Understanding that difference makes Instagram Reel analytics much easier to interpret.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Instagram defines Reel Views as the number of times a Reel starts to play or replay.',
    'Replays are therefore included in Reel Views.',
    'Accounts reached is a separate unique-account metric.',
    'Views can be higher than Accounts reached because total playback and unique audience are different measurements.',
    'Instagram tracks Watch time separately from Views.',
    "Instagram's broader Insights system defines Views as how many times content was played or displayed across formats.",
    'Reel views do not automatically equal followers, likes, reach, sales or algorithmic distribution.',
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

export const HOW_INSTAGRAM_REELS_VIEWS_ARE_COUNTED_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-how-instagram-reels-views-are-counted',
    slug: SLUG,
    title: 'How Are Instagram Reels Views Counted?',
    excerpt:
      'Instagram Reels display a simple number that can raise surprisingly complicated questions about views, replays, reach and watch time.',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'instagram',
    tags: ['views', 'reels', 'analytics', 'algorithm', 'engagement'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Editorial illustration of an Instagram Reel player with play, replay and unique-reach concepts',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: SCHEDULED_AT,
    updatedAt: SCHEDULED_AT,
    showModifiedDate: false,
    seo: {
      title: 'How Are Instagram Reels Views Counted?',
      description:
        'Learn what counts as an Instagram Reel view, how replays affect views, and the difference between views, reach and watch time.',
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'how Instagram Reels views are counted',
        'what counts as a Reel view',
        'Instagram Reel views explained',
        'Reel views vs reach',
        'Instagram replay views',
        'Instagram Reel watch time',
      ],
    },
    relatedServices: ['buy-instagram-views'],
    relatedArticles: [
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'how-instagram-algorithm-works',
      'why-instagram-followers-drop',
      'public-vs-private-instagram-account',
      'how-to-grow-instagram-followers-organically',
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
      'Views: how many times the Reel started to play or replay.',
      'Accounts reached: unique accounts that saw the Reel at least once.',
      'Watch time: total time the Reel was played.',
      'Likes, comments, saves and shares are separate interaction metrics.',
      'Views = playback activity. Reach = unique audience. Watch time = viewing duration.',
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'What counts as a view on Instagram Reels?',
        answer:
          'Instagram defines Reel Views as the number of times your Reel starts to play or replay.',
        schemaEligible: true,
      },
      {
        id: 'faq-2',
        question: 'Do replays count as Instagram Reel views?',
        answer:
          'Yes. Instagram explicitly includes replays in its Reel Views definition.',
        schemaEligible: true,
      },
      {
        id: 'faq-3',
        question: 'Are Instagram Reel views unique?',
        answer:
          'No. Views can include replays. For unique audience information, Instagram provides Accounts reached.',
        schemaEligible: true,
      },
      {
        id: 'faq-4',
        question: 'Why are my Reel views higher than accounts reached?',
        answer:
          'Because Views include starts and replays, while Accounts reached represents unique accounts that saw the Reel at least once.',
        schemaEligible: true,
      },
      {
        id: 'faq-5',
        question:
          'Does someone need to watch the entire Reel for it to count as a view?',
        answer:
          "Instagram's current Reel Views definition is based on the Reel starting to play or replay; it does not define a view as requiring completion of the full Reel.",
        schemaEligible: true,
      },
      {
        id: 'faq-6',
        question: 'Are Instagram Reel views the same as watch time?',
        answer:
          'No. Views count playback/replay activity, while Watch time represents the total time the Reel was played.',
        schemaEligible: true,
      },
    ],
  };
