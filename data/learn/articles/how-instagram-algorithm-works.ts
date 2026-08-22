/**
 * Article #5 — How the Instagram Algorithm Works in 2026
 * Scheduled: Wednesday 2 September 2026.
 * Informational intent. Does not claim ranking, Explore, or Reels-boost guarantees.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-instagram-algorithm-works';
const SCHEDULED_AT = '2026-09-02T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_RANKING =
  'https://about.instagram.com/blog/announcements/instagram-ranking-explained';
const IG_RECOMMENDATIONS =
  'https://www.facebook.com/help/instagram/313829416281232';
const IG_CREATORS_FAQ = 'https://creators.instagram.com/faq';
const IG_STORIES_GUIDE =
  'https://about.instagram.com/blog/tips-and-tricks/how-to-use-instagram-stories';
const IG_EXPLORE =
  'https://www.facebook.com/help/instagram/487224561296752';
const IG_ELIGIBILITY =
  'https://www.facebook.com/help/instagram/653964212890722';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const META_AI_2026 =
  'https://about.fb.com/news/2026/01/2026-ai-drives-performance/';
const IG_ORIGINALITY =
  'https://creators.instagram.com/blog/recommendations-and-originality';
const META_YOUR_ALGORITHM =
  'https://about.fb.com/news/2026/05/new-supervision-tools-parents-insights-teens-algorithm/';

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
    'There is no single Instagram algorithm deciding everything you see.',
  ),
  paragraph(
    'p-open-2',
    "Instagram uses different ranking and recommendation systems across different parts of the app because people use Feed, Stories, Explore and Reels differently. Instagram's creator guidance describes these areas as having their own ranking approaches rather than one universal formula. (Instagram About)",
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  paragraph('p-open-3', 'That distinction matters for creators.'),
  paragraph(
    'p-open-4',
    'A Reel that performs well with people who do not follow you is operating in a different discovery environment from a Story primarily being shown to people who already have a relationship with your account.',
  ),
  paragraph(
    'p-open-5',
    'Likewise, a Feed post, an Explore recommendation and a Reel should not be expected to perform identically.',
  ),
  paragraph(
    'p-open-6',
    "The useful question therefore isn't:",
  ),
  paragraph('p-open-7', '“How do I beat the Instagram algorithm?”'),
  paragraph('p-open-8', 'A better question is:'),
  paragraph(
    'p-open-9',
    '“What is Instagram trying to predict on this particular surface, and how can I create content that genuinely fits what viewers want there?”',
  ),
  paragraph(
    'p-open-10',
    "Instagram's recommendations are personalized, meaning two people can receive very different content based on their interests, activity and connections. (Facebook)",
    [{ href: IG_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-not-one',
    'Instagram Does Not Use One Universal Algorithm',
    2,
  ),
  paragraph(
    'p-one-1',
    'The phrase “Instagram algorithm” is convenient, but it can create the wrong mental model.',
  ),
  paragraph(
    'p-one-2',
    'Instagram has explained that people use different parts of the app for different purposes, so those parts are ranked differently. Feed, Stories, Explore and Reels each have their own context and ranking process. (Instagram About)',
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  paragraph('p-one-3', 'Imagine one person opens Instagram.'),
  paragraph('p-one-4', 'They may use:'),
  bullets('ul-one-use', [
    'Stories to check updates from friends,',
    'Feed to catch up with creators and accounts they follow,',
    'Explore to discover something new,',
    'and Reels to watch entertaining short-form videos.',
  ]),
  paragraph(
    'p-one-5',
    'It would make little sense to rank all four experiences exactly the same way.',
  ),
  paragraph('p-one-6', 'The important lesson is simple:'),
  paragraph(
    'p-one-7',
    'Do not optimize every Instagram format as though it serves the same purpose.',
  ),
  figure(
    'fig-four-systems',
    `${IMAGE_DIR}/four-ranking-systems.png`,
    'Simplified illustration of Instagram branching into Feed, Stories, Explore and Reels with different ranking contexts',
    'Simplified illustration based on Instagram\'s public ranking guidance. There is no single ranking formula for every part of Instagram.',
  ),

  heading('h-feed', 'How the Instagram Feed Algorithm Works', 2),
  paragraph(
    'p-feed-1',
    'Feed is designed to help people catch up with content Instagram believes will matter to them.',
  ),
  paragraph(
    'p-feed-2',
    "It can include content from accounts a person follows as well as recommended posts from accounts they do not follow. Instagram's public guidance says Feed ranking considers information about the post, the person who posted it, the viewer's activity and the viewer's history of interacting with that account. (Instagram About)",
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  paragraph(
    'p-feed-3',
    'That means the same post does not necessarily appear in the same position for every follower.',
  ),
  paragraph('p-feed-4', 'Instagram personalizes the experience.'),
  heading('h-feed-signals', 'Examples of Feed Signals', 3),
  paragraph(
    'p-feed-5',
    "Instagram's public explanations have included signals related to:",
  ),
  bullets('ul-feed-signals', [
    'what posts someone has interacted with',
    'information about the post',
    'information about the account posting it',
    'previous interactions between viewer and creator',
    'predicted actions a viewer may take',
  ]),
  paragraph(
    'p-feed-6',
    'These systems use multiple signals and predictions rather than one visible metric such as follower count. (Instagram About)',
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  heading('h-feed-creators', 'What This Means for Creators', 3),
  paragraph('p-feed-7', 'The practical objective is not:'),
  paragraph(
    'p-feed-8',
    '“Make Instagram show my post to every follower.”',
  ),
  paragraph('p-feed-9', 'Instagram does not promise that.'),
  paragraph(
    'p-feed-10',
    'Instead, create content that gives the relevant audience a genuine reason to:',
  ),
  bullets('ul-feed-actions', [
    'stop,',
    'read,',
    'watch,',
    'save,',
    'share,',
    'comment,',
    'or otherwise interact naturally.',
  ]),
  paragraph(
    'p-feed-11',
    'But even those actions should not be turned into a fake formula.',
  ),
  paragraph(
    'p-feed-12',
    'There is no official public equation such as:',
  ),
  paragraph('p-feed-13', '1 save = 5 likes'),
  paragraph('p-feed-14', 'or:'),
  paragraph(
    'p-feed-15',
    'comments are worth exactly twice as much as shares.',
  ),
  paragraph('p-feed-16', 'Avoid those claims.'),

  heading(
    'h-reels-vs-photos',
    'Does Instagram Prefer Reels Over Photos in Feed?',
    2,
  ),
  paragraph(
    'p-rvp-1',
    'Do not assume Feed automatically ranks every Reel above every photo.',
  ),
  paragraph(
    'p-rvp-2',
    "Instagram's current creator FAQ says Feed ranking does not simply give preference to Reels over photos; ranking instead predicts how valuable content may be to the individual viewer. (Instagram Creators)",
    [{ href: IG_CREATORS_FAQ, label: 'Instagram Creators', external: true }],
  ),
  paragraph(
    'p-rvp-3',
    'That is important because creators often hear statements such as:',
  ),
  paragraph('p-rvp-4', '“Instagram only wants video now.”'),
  paragraph('p-rvp-5', 'That is too simplistic.'),
  paragraph(
    'p-rvp-6',
    'Different formats can serve different purposes.',
  ),
  paragraph(
    'p-rvp-7',
    'A useful carousel can work well for an educational idea.',
  ),
  paragraph(
    'p-rvp-8',
    'A Reel may work better for demonstrating movement.',
  ),
  paragraph(
    'p-rvp-9',
    'A photo may be appropriate when one strong image communicates the idea.',
  ),
  paragraph(
    'p-rvp-10',
    'Choose the format because it fits the content, not because you believe one format automatically receives guaranteed ranking priority.',
  ),

  heading('h-stories', 'How Instagram Stories Ranking Works', 2),
  paragraph(
    'p-st-1',
    'Stories are different from Explore and Reels because they are strongly connected to accounts people already follow.',
  ),
  paragraph(
    'p-st-2',
    'Stories help viewers keep up with accounts they have chosen to connect with.',
  ),
  paragraph(
    'p-st-3',
    "Instagram's ranking explanations have historically highlighted signals around viewing history, engagement history and closeness when deciding which Stories to prioritize. (Instagram About)",
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  paragraph(
    'p-st-4',
    'In practical terms, Instagram is trying to predict things such as:',
  ),
  bullets('ul-st-predict', [
    'Which Stories is this person likely to open?',
    'Which accounts do they regularly interact with?',
    'Which relationships appear more important to them?',
  ]),
  paragraph(
    'p-st-5',
    'This makes Stories particularly useful for maintaining an existing audience relationship rather than treating every Story as a broad discovery tool.',
  ),
  heading(
    'h-st-focus',
    'What Creators Should Focus on With Stories',
    3,
  ),
  paragraph('p-st-6', 'Use Stories for things such as:'),
  bullets('ul-st-use', [
    'behind-the-scenes updates,',
    'quick explanations,',
    'questions,',
    'polls,',
    'announcements,',
    'new-post reminders,',
    'daily updates,',
    'and conversations with an existing audience.',
  ]),
  paragraph(
    'p-st-7',
    "Instagram's Stories product continues to support interaction tools such as polls, music and other features designed around lightweight sharing and connection. (Instagram About)",
    [{ href: IG_STORIES_GUIDE, label: 'Instagram About', external: true }],
  ),
  paragraph(
    'p-st-8',
    'The goal should not be to manipulate every Story for “algorithm points.”',
  ),
  paragraph(
    'p-st-9',
    'Use the format in the way your audience actually finds useful.',
  ),

  heading('h-explore', 'How the Instagram Explore Algorithm Works', 2),
  paragraph(
    'p-ex-1',
    'Explore is much more discovery-oriented.',
  ),
  paragraph(
    'p-ex-2',
    'Instagram says posts shown in Search and Explore are automatically selected using multiple factors to personalize what each person sees. (Facebook)',
    [{ href: IG_EXPLORE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ex-3',
    'A key difference from Stories is that much of Explore discovery can involve accounts the viewer does not already follow.',
  ),
  paragraph(
    'p-ex-4',
    'Instagram looks at patterns in what a person has previously shown interest in and tries to recommend related content. Its recommendation guidance gives examples such as interacting with restaurant or bookstore content leading to future recommendations around food, recipes, books or reading. (Facebook)',
    [{ href: IG_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  heading(
    'h-ex-interest',
    'Think of Explore as Interest Discovery',
    3,
  ),
  paragraph(
    'p-ex-5',
    'Imagine someone regularly interacts with:',
  ),
  bullets('ul-ex-interests', [
    'home renovation videos,',
    'interior-design posts,',
    'kitchen makeovers,',
    'and furniture content.',
  ]),
  paragraph(
    'p-ex-6',
    'Instagram may infer that this viewer has an interest around home design.',
  ),
  paragraph(
    'p-ex-7',
    'A useful post from an account they have never followed can therefore become relevant.',
  ),
  paragraph(
    'p-ex-8',
    'This is why Explore can introduce creators to non-followers.',
  ),
  paragraph(
    'p-ex-9',
    'But recommendation eligibility also matters.',
  ),
  paragraph(
    'p-ex-10',
    'Instagram says eligible public-account content may be recommended to people who do not follow the account across areas including Explore, Reels and Feed Recommendations. Eligibility does not guarantee recommendation; it means the content may be recommended. (Facebook)',
    [{ href: IG_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ex-11',
    'That distinction should always be preserved.',
  ),
  figure(
    'fig-followers-vs-discovery',
    `${IMAGE_DIR}/followers-vs-discovery.png`,
    'Comparison of Instagram relationship surfaces Feed and Stories with discovery surfaces Explore and Reels',
    'Instagram personalizes every surface differently. Feed can also contain recommended content from non-followed accounts.',
  ),

  heading('h-reels', 'How the Instagram Reels Algorithm Works', 2),
  paragraph(
    'p-re-1',
    'Reels are heavily associated with discovery and entertainment.',
  ),
  paragraph(
    'p-re-2',
    "Instagram's ranking explanation says Reels frequently contain content from accounts a person does not follow, which makes recommendation particularly important on this surface. (Instagram About)",
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  paragraph(
    'p-re-3',
    'Instagram evaluates multiple pieces of information when deciding what Reels may be useful or interesting to a particular person.',
  ),
  paragraph(
    'p-re-4',
    'Its public ranking explanation has discussed factors around:',
  ),
  bullets('ul-re-factors', [
    "the viewer's activity,",
    'their history with the person posting,',
    'information about the Reel,',
    'and information about the creator.',
  ]),
  paragraph(
    'p-re-5',
    'Again, there is no public creator-facing formula that lets you calculate an exact ranking score. (Instagram About)',
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  heading('h-re-better', 'A Better Reels Question', 3),
  paragraph('p-re-6', "Don't ask:"),
  paragraph(
    'p-re-7',
    '“How many likes does a Reel need before Instagram pushes it?”',
  ),
  paragraph(
    'p-re-8',
    'Instagram does not publish a universal number.',
  ),
  paragraph('p-re-9', 'Ask instead:'),
  paragraph(
    'p-re-10',
    '“Is this Reel understandable, interesting and appropriate for the audience it is reaching?”',
  ),
  paragraph('p-re-11', 'Then use Insights to study what happened.'),
  paragraph(
    'p-re-12',
    'Instagram provides performance insights for individual Reels and other content formats to professional accounts. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-original',
    'Original Content Matters More in 2026',
    2,
  ),
  paragraph(
    'p-or-1',
    'This is one of the more important current developments.',
  ),
  paragraph(
    'p-or-2',
    'Meta reported in January 2026 that it had increased the prevalence of original content in Instagram recommendations in the U.S. during Q4 2025. According to Meta, 75% of recommendations were coming from original posts at that point. (Facebook)',
    [{ href: META_AI_2026, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-or-3',
    'That does not mean every original post will rank.',
  ),
  paragraph(
    'p-or-4',
    'It also does not mean that simply labelling something “original” produces reach.',
  ),
  paragraph(
    'p-or-5',
    'But it does reinforce a clear direction:',
  ),
  paragraph(
    'p-or-6',
    'Instagram wants recommendation systems to surface more original content rather than making discovery dominated by copies and reposts.',
  ),
  paragraph(
    'p-or-7',
    'Instagram previously announced ranking changes intended to give original creators and smaller creators more opportunity in recommendations. (Instagram Creators)',
    [{ href: IG_ORIGINALITY, label: 'Instagram Creators', external: true }],
  ),
  heading('h-or-take', 'Practical Takeaway', 3),
  paragraph(
    'p-or-8',
    'Create something that genuinely comes from you:',
  ),
  bullets('ul-or', [
    'your explanation,',
    'your demonstration,',
    'your opinion,',
    'your footage,',
    'your experience,',
    'your comparison,',
    'your tutorial,',
    'or your creative execution.',
  ]),
  paragraph(
    'p-or-9',
    "Do not build the entire strategy around downloading somebody else's successful Reel and uploading it again.",
  ),

  heading(
    'h-your-algo',
    'What Is Instagram\'s “Your Algorithm” Feature?',
    2,
  ),
  paragraph(
    'p-ya-1',
    'Instagram has also made recommendation personalization more visible to users.',
  ),
  paragraph(
    'p-ya-2',
    "Meta said in May 2026 that Instagram's Your Algorithm feature allows users to customize topics they want to see more or less of. At that time, the feature was available for Reels and Explore in English-speaking countries, with Feed support planned next. (Facebook)",
    [{ href: META_YOUR_ALGORITHM, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ya-3',
    'This gives creators another useful insight into how Instagram should be understood:',
  ),
  paragraph(
    'p-ya-4',
    'The system is increasingly interest-driven and personalized.',
  ),
  paragraph(
    'p-ya-5',
    'Creators cannot assume there is one universal “best content.”',
  ),
  paragraph(
    'p-ya-6',
    'Different viewers have different interests.',
  ),
  heading('h-ya-why', 'Why This Matters', 3),
  paragraph('p-ya-7', 'Imagine two people:'),
  paragraph('p-ya-8', 'Person A regularly interacts with:'),
  bullets('ul-ya-a', ['football,', 'fitness,', 'and travel.']),
  paragraph('p-ya-9', 'Person B interacts with:'),
  bullets('ul-ya-b', [
    'interior design,',
    'recipes,',
    'and photography.',
  ]),
  paragraph(
    'p-ya-10',
    'Even if both follow the same creator, Instagram may not rank or recommend identical content to each person.',
  ),
  paragraph(
    'p-ya-11',
    'Personalization is central to the experience. (Facebook)',
    [{ href: META_YOUR_ALGORITHM, label: 'Facebook', external: true }],
  ),
  {
    id: 'cta-instagram-algorithm',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare Instagram Growth Options',
    text: 'Instagram followers, likes and views represent different visible metrics. They should not be presented as guaranteed methods for manipulating Feed, Reels or Explore ranking.',
    serviceSlugs: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ],
  },

  heading(
    'h-engagement',
    'Does Engagement Matter to Instagram Ranking?',
    2,
  ),
  paragraph(
    'p-eng-1',
    'Instagram uses interaction behaviour as part of its personalization and prediction systems. Its public ranking explanations discuss activity such as likes, saves, comments and other interactions when predicting what content may interest a viewer. (Instagram About)',
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  paragraph(
    'p-eng-2',
    'But creators often turn that fact into unsupported formulas.',
  ),
  paragraph('p-eng-3', 'For example:'),
  bullets('ul-eng-myths', [
    '“Shares are the most important signal.”',
    '“Saves are worth ten likes.”',
    '“You need a 7% engagement rate to reach Explore.”',
    '“Comments in the first ten minutes determine your reach.”',
  ]),
  paragraph(
    'p-eng-4',
    'Instagram does not publicly provide universal formulas supporting claims like these.',
  ),
  paragraph(
    'p-eng-5',
    'It is safer to think in terms of meaningful audience response, not secret scoring systems. For how Instagram followers, likes, views and comments differ as metrics, read that comparison separately from ranking claims.',
    [
      {
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        label: 'Instagram followers, likes, views and comments',
      },
    ],
  ),

  heading(
    'h-time',
    'Does Posting Time Affect the Instagram Algorithm?',
    2,
  ),
  paragraph(
    'p-time-1',
    'Posting when your audience is active can make practical sense because more relevant viewers may have an opportunity to encounter the content sooner.',
  ),
  paragraph(
    'p-time-2',
    'But do not treat a specific time such as:',
  ),
  paragraph('p-time-3', '7:43 PM'),
  paragraph('p-time-4', 'as a universal algorithm trick.'),
  paragraph(
    'p-time-5',
    'Different audiences live in different countries, keep different schedules and use Instagram differently.',
  ),
  paragraph(
    'p-time-6',
    'Professional accounts can use Instagram Insights to understand audience and content performance rather than relying on generic “best time to post” claims. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-more-followers',
    'Does Having More Followers Make Instagram Rank Every Post Higher?',
    2,
  ),
  paragraph(
    'p-mf-1',
    'No automatic guarantee should be assumed.',
  ),
  paragraph(
    'p-mf-2',
    "Follower count describes the size of the account's following.",
  ),
  paragraph(
    'p-mf-3',
    'Ranking and recommendation systems use multiple signals and personalized predictions.',
  ),
  paragraph(
    'p-mf-4',
    'Instagram also made changes specifically intended to improve recommendation opportunities for smaller original creators, which is inconsistent with the idea that follower count alone determines who gets recommended. (Instagram Creators)',
    [{ href: IG_ORIGINALITY, label: 'Instagram Creators', external: true }],
  ),
  paragraph(
    'p-mf-5',
    'A large account can publish a post that performs modestly.',
  ),
  paragraph(
    'p-mf-6',
    'A smaller account can create content that reaches beyond its existing follower base.',
  ),
  paragraph(
    'p-mf-7',
    'Treat follower count and content distribution as related parts of an account, not the same metric.',
  ),

  heading(
    'h-non-followers',
    'Can Instagram Recommend Your Content to Non-Followers?',
    2,
  ),
  paragraph(
    'p-nf-1',
    'Yes, when the account/content is eligible for recommendations.',
  ),
  paragraph(
    'p-nf-2',
    'Instagram says public-account content may be recommended to non-followers in places including Explore, Reels, Feed Recommendations, Search and suggested accounts. (Facebook)',
    [{ href: IG_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  bullets('ul-nf', [
    'Explore,',
    'Reels,',
    'Feed Recommendations,',
    'Search,',
    'and suggested accounts.',
  ]),
  paragraph('p-nf-4', 'Again:'),
  paragraph(
    'p-nf-5',
    'eligible does not mean guaranteed reach.',
  ),
  paragraph(
    'p-nf-6',
    'It means Instagram may consider the content for recommendation.',
  ),
  paragraph(
    'p-nf-7',
    'Creators using professional accounts can inspect recommendation eligibility through Account Status. (Facebook)',
    [{ href: IG_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  figure(
    'fig-reaches-people',
    `${IMAGE_DIR}/how-content-reaches-people.png`,
    'Diagram of publishing Instagram content to an existing audience via Feed and Stories and a potential new audience via Reels, Explore and Feed Recommendations',
    'Recommendation eligibility does not guarantee distribution.',
  ),

  heading(
    'h-stop',
    'What Can Stop Content From Being Recommended?',
    2,
  ),
  paragraph(
    'p-stop-1',
    'Instagram has separate Recommendation Guidelines covering whether public-account content is eligible to be recommended to people who do not follow that account. (Facebook)',
    [{ href: IG_ELIGIBILITY, label: 'Facebook', external: true }],
  ),
  paragraph('p-stop-2', 'This is important because:'),
  bullets('ul-stop', [
    'content can be allowed on Instagram,',
    'but still not necessarily be eligible for broad recommendation.',
  ]),
  paragraph(
    'p-stop-3',
    'Creators should therefore check Account Status when recommendation eligibility appears to be an issue rather than immediately assuming:',
  ),
  paragraph('p-stop-4', '“Instagram shadowbanned me.”'),
  paragraph(
    'p-stop-5',
    'A sudden performance change alone is not proof of a shadowban.',
  ),
  paragraph(
    'p-stop-6',
    'Look at actual account information first.',
  ),

  heading(
    'h-delete',
    'Should You Delete and Repost a Reel That Performs Poorly?',
    2,
  ),
  paragraph(
    'p-del-1',
    'Poor early performance by itself does not prove that a Reel is broken.',
  ),
  paragraph(
    'p-del-2',
    'Before deleting content, consider:',
  ),
  bullets('ul-del', [
    'Was the subject relevant to your audience?',
    'Was the opening understandable?',
    'Did the Reel deliver what it promised?',
    'Was it eligible for recommendation?',
    'Does the content fit the rest of your profile?',
    'Was this one unusual post or part of a consistent pattern?',
  ]),
  paragraph(
    'p-del-3',
    'Repeatedly deleting and reposting without understanding the underlying issue provides very little useful information.',
  ),
  paragraph(
    'p-del-4',
    'Use Insights and patterns across multiple posts instead. Instagram provides content-level insights precisely so professional accounts can review how individual posts, Stories and Reels perform. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-compare',
    'Feed vs Stories vs Explore vs Reels',
    2,
  ),
  paragraph(
    'p-cmp-1',
    'Here is the simplest practical comparison.',
  ),
  {
    id: 'table-surfaces',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Surface', 'Main User Context', 'Discovery Potential'],
    rows: [
      ['Feed', 'Catch-up + personalized content', 'Followers + recommendations'],
      ['Stories', 'Existing relationships', 'Primarily existing audience'],
      ['Explore', 'Topic discovery', 'Strong non-follower discovery'],
      ['Reels', 'Entertainment + discovery', 'Strong non-follower discovery'],
    ],
  },
  paragraph(
    'p-cmp-2',
    "This is a simplified creator-friendly interpretation of Instagram's public ranking guidance, not an official ranking formula. (Instagram About)",
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),

  heading(
    'h-work',
    'How to Work With the Instagram Algorithm in 2026',
    2,
  ),
  paragraph(
    'p-wk-1',
    "You cannot control Instagram's ranking system.",
  ),
  paragraph('p-wk-2', 'You can control what you publish.'),
  heading(
    'h-wk-1',
    "1. Know What Surface You're Creating For",
    3,
  ),
  paragraph(
    'p-wk-3',
    'A Story update and an Explore-oriented educational carousel do not have to serve the same purpose.',
  ),
  heading('h-wk-2', '2. Make the Content Easy to Understand', 3),
  paragraph('p-wk-4', 'The viewer should quickly understand:'),
  bullets('ul-wk-understand', [
    'what the content is about,',
    'who it is for,',
    'and why they may want to continue.',
  ]),
  heading('h-wk-3', '3. Create Original Content', 3),
  paragraph(
    'p-wk-5',
    "Instagram's recommendation direction has increasingly emphasized original posts, with Meta reporting that 75% of Instagram recommendations in the U.S. were coming from original posts in Q4 2025. (Facebook)",
    [{ href: META_AI_2026, label: 'Facebook', external: true }],
  ),
  heading(
    'h-wk-4',
    '4. Create for People, Not a Secret Formula',
    3,
  ),
  paragraph(
    'p-wk-6',
    "Don't make an awkward post because somebody claimed the algorithm needs exactly:",
  ),
  bullets('ul-wk-not', [
    'seven hashtags,',
    'a 12-second Reel,',
    'three comments,',
    'or a specific audio track.',
  ]),
  paragraph(
    'p-wk-7',
    "Use Instagram's actual performance data instead of unsupported recipes.",
  ),
  heading('h-wk-5', '5. Review Insights', 3),
  paragraph(
    'p-wk-8',
    'Professional accounts can use Instagram Insights to examine overall trends and individual content performance. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-wk-6', '6. Look for Repeatable Patterns', 3),
  paragraph(
    'p-wk-9',
    'One post performing well can be luck, timing, topic interest or strong execution.',
  ),
  paragraph(
    'p-wk-10',
    'If multiple posts around the same theme consistently resonate, that is a more useful planning signal.',
  ),
  heading('h-wk-7', '7. Check Recommendation Eligibility', 3),
  paragraph(
    'p-wk-11',
    'If discovery suddenly changes, inspect Account Status where available before jumping to conclusions. (Facebook)',
    [{ href: IG_ELIGIBILITY, label: 'Facebook', external: true }],
  ),

  heading(
    'h-not-guarantee',
    'What the Instagram Algorithm Does Not Guarantee',
    2,
  ),
  paragraph(
    'p-ng-1',
    'Instagram does not guarantee:',
  ),
  bullets('ul-ng', [
    'that every follower sees every post,',
    'that more followers create proportional views,',
    'that likes guarantee Explore placement,',
    'that views guarantee new followers,',
    'that purchasing engagement improves ranking,',
    'or that one “algorithm hack” will make a post viral.',
  ]),
  paragraph(
    'p-ng-2',
    "Instagram's public documentation describes personalized ranking systems with many signals, not deterministic creator shortcuts. (Instagram About)",
    [{ href: IG_RANKING, label: 'Instagram About', external: true }],
  ),
  paragraph(
    'p-ng-3',
    'This distinction is especially important when discussing social-media growth services.',
  ),
  paragraph(
    'p-ng-4',
    'Instagram followers describe account audience size, not a guaranteed ranking rule.',
    [{ href: '/buy-instagram-followers', label: 'Instagram followers' }],
  ),
  paragraph(
    'p-ng-5',
    'Instagram likes are a reaction metric, not an Explore-placement formula.',
    [{ href: '/buy-instagram-likes', label: 'Instagram likes' }],
  ),
  paragraph(
    'p-ng-6',
    'Instagram views measure viewing activity, not guaranteed recommendation.',
    [{ href: '/buy-instagram-views', label: 'Instagram views' }],
  ),
  paragraph(
    'p-ng-7',
    'Instagram comments are a conversation metric, not a ranking shortcut.',
    [{ href: '/buy-instagram-comments', label: 'Instagram comments' }],
  ),
  paragraph(
    'p-ng-8',
    "They should not be presented as guaranteed ways to manipulate Instagram's recommendation algorithm.",
  ),

  heading(
    'h-close',
    'The Instagram Algorithm Is Really a Set of Personalized Systems',
    2,
  ),
  paragraph(
    'p-cl-1',
    'The biggest misconception is treating “the algorithm” like one machine that gives every post a universal score.',
  ),
  paragraph('p-cl-2', 'Instagram works differently.'),
  paragraph(
    'p-cl-3',
    'Feed, Stories, Explore and Reels serve different behaviours.',
  ),
  paragraph('p-cl-4', 'Recommendations are personalized.'),
  paragraph('p-cl-5', 'Viewer interests matter.'),
  paragraph(
    'p-cl-6',
    'Relationships matter in some surfaces.',
  ),
  paragraph(
    'p-cl-7',
    'Discovery matters more in others.',
  ),
  paragraph(
    'p-cl-8',
    'Eligibility matters when content is being recommended beyond followers.',
  ),
  paragraph(
    'p-cl-9',
    'And in 2026, Meta continues increasing its use of AI-driven recommendation systems while emphasizing more timely and original recommendations. (Facebook)',
    [{ href: META_AI_2026, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cl-10',
    'Instead of trying to trick Instagram, use a simpler strategy:',
  ),
  bullets('ul-cl', [
    'Understand the surface.',
    'Understand the audience.',
    'Create useful original content.',
    'Publish consistently enough to learn.',
    'Review real performance.',
    'Repeat what genuinely works.',
  ]),
  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Instagram does not use one ranking algorithm for Feed, Stories, Explore and Reels.',
    'Recommendations are personalized around individual activity, connections and interests.',
    'Reels and Explore can introduce content from accounts a person does not already follow.',
    'Recommendation eligibility does not guarantee recommendation or reach.',
    'Meta reported that 75% of Instagram recommendations in the U.S. were from original posts in Q4 2025.',
    'Instagram launched Your Algorithm controls for Reels and Explore, reflecting how strongly recommendations are shaped around individual interests.',
    'There is no official universal formula where a specific number of likes, comments, saves or followers guarantees ranking.',
  ]),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list') return block.items.join(' ');
  if (block.type === 'comparison_table') {
    return [block.headers.join(' '), ...block.rows.map((row) => row.join(' '))].join(
      ' ',
    );
  }
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const HOW_INSTAGRAM_ALGORITHM_WORKS_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-instagram-algorithm-works',
  slug: SLUG,
  title:
    'How the Instagram Algorithm Works in 2026: Feed, Reels, Explore & Stories',
  excerpt:
    'There is no single Instagram algorithm deciding everything you see.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'instagram',
  tags: ['algorithm', 'analytics', 'creator', 'reels', 'followers'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Illustration of Instagram content flowing toward Feed, Stories, Explore and Reels without fake analytics numbers',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
  showModifiedDate: false,
  seo: {
    title: 'Instagram Algorithm 2026: Feed, Reels, Explore & Stories',
    description:
      'Learn how Instagram ranks Feed, Reels, Explore and Stories in 2026, what signals matter, and why each part of Instagram works differently.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'Instagram algorithm 2026',
      'how Instagram algorithm works',
      'Instagram Reels algorithm',
      'Instagram Feed algorithm',
      'Instagram Explore algorithm',
      'Instagram Stories algorithm',
    ],
  },
  relatedServices: [
    'buy-instagram-followers',
    'buy-instagram-likes',
    'buy-instagram-views',
    'buy-instagram-comments',
  ],
  relatedArticles: [
    'instagram-followers-vs-likes-vs-views-vs-comments',
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
    'Feed: content from accounts you follow + recommendations selected for your interests.',
    'Stories: more relationship-focused, helping you keep up with accounts you already interact with.',
    'Explore: discovery around topics and content Instagram predicts may interest you.',
    'Reels: entertainment and discovery, including substantial recommendations from accounts you do not already follow.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Is there one Instagram algorithm?',
      answer:
        'No. Instagram uses different ranking approaches across areas including Feed, Stories, Explore and Reels because people use those surfaces differently.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'How does Instagram decide what appears in Feed?',
      answer:
        "Instagram uses multiple signals, including a person's previous activity, information about posts and creators, and interaction history to predict what may be relevant.",
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'How does the Instagram Reels algorithm work?',
      answer:
        'Reels ranking uses multiple personalized signals and often recommends content from accounts the viewer does not follow. Instagram does not publish a simple universal scoring formula creators can calculate.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question:
        "Can Instagram recommend my posts to people who don't follow me?",
      answer:
        'Yes. Eligible public-account content may appear to non-followers through Reels, Explore, Feed Recommendations, Search and other recommendation surfaces.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does Instagram prefer original content?',
      answer:
        'Instagram has increasingly emphasized original content in recommendations. Meta reported in January 2026 that 75% of Instagram recommendations in the U.S. were coming from original posts during Q4 2025.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question:
        'Do more Instagram followers guarantee better algorithm reach?',
      answer:
        'No. Follower count is only one aspect of an account. Instagram describes ranking as personalized and based on multiple signals rather than a simple follower-count rule.',
      schemaEligible: true,
    },
  ],
};
