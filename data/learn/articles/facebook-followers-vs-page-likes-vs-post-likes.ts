/**
 * Article #6 — Facebook Followers vs Page Likes vs Post Likes
 * Scheduled: Friday 4 September 2026.
 * Informational intent. Treats Page Likes as a transitioning Page-level metric, not as deleted.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'facebook-followers-vs-page-likes-vs-post-likes';
const SCHEDULED_AT = '2026-09-04T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const FB_FOLLOW_PAGE =
  'https://www.facebook.com/help/171378103323792';
const FB_INVITE_FOLLOW =
  'https://www.facebook.com/help/174333482624856';
const FB_RECOMMENDATIONS =
  'https://www.facebook.com/help/1257205004624246';
const FB_FOLLOWER_INSIGHTS =
  'https://www.facebook.com/help/810929305732263';
const FB_PROFILES_PAGES_GROUPS =
  'https://www.facebook.com/help/337881706729661';
const FB_REACT =
  'https://www.facebook.com/help/933093216805622';
const FB_FEED_ORDER =
  'https://www.facebook.com/help/fblite/520348825116417';
const FB_HIDE_REACTIONS =
  'https://www.facebook.com/help/1142749619471850';
const FB_FOLLOW_PAGE_ALT =
  'https://www.facebook.com/help/216630288356463';
const FB_WHAT_LIKE_MEANS =
  'https://www.facebook.com/help/110920455663362';

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
    'Facebook uses several similar-looking terms around Pages and posts:',
  ),
  paragraph('p-open-2', 'Followers'),
  paragraph('p-open-3', 'Page Likes'),
  paragraph('p-open-4', 'Post Likes'),
  paragraph(
    'p-open-5',
    'They sound closely related, but they do not describe the same action.',
  ),
  paragraph(
    'p-open-6',
    'The difference has also become more confusing because Facebook has been moving Pages toward follows as the main audience connection. Meta currently says some Pages that previously had a Like button may now only have a Follow button. Its Page Insights documentation also says Page Likes have been replaced by follows in Meta Business Suite. (Facebook)',
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-7',
    'At the same time, Meta documentation still refers to people being able to like or follow Pages in some contexts, so the exact Page interface a user sees can vary. (Facebook)',
    [{ href: FB_INVITE_FOLLOW, label: 'Facebook', external: true }],
  ),
  paragraph('p-open-8', 'Post Likes are different again.'),
  paragraph(
    'p-open-9',
    'They relate to an individual Facebook post, not the audience connected to the Page itself.',
  ),
  paragraph(
    'p-open-10',
    'Understanding these distinctions is useful whether you manage a business Page, compare Facebook metrics or simply want to know what those different numbers mean.',
  ),

  heading('h-followers', 'What Are Facebook Page Followers?', 2),
  paragraph(
    'p-fol-1',
    'A Facebook Page follower is someone who follows the Page.',
  ),
  paragraph(
    'p-fol-2',
    'Meta explains that when someone follows a Page, they may receive updates from that Page in their Feed. (Facebook)',
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-fol-3',
    'This makes followers primarily a Page-level audience metric.',
  ),
  paragraph(
    'p-fol-4',
    "For example, if someone finds a local restaurant's Facebook Page and chooses to follow it, that person becomes part of the Page's follower audience.",
  ),
  paragraph(
    'p-fol-5',
    'They might then encounter updates from the Page in Feed.',
  ),
  paragraph(
    'p-fol-6',
    'Following does not mean they will necessarily see every post.',
  ),
  paragraph(
    'p-fol-7',
    'Facebook uses personalized Feed ranking and recommendations, so following a Page does not create a guarantee that every Page post reaches every follower. Meta\'s current recommendation documentation also confirms that Facebook may recommend Pages and posts people do not already follow. (Facebook)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  heading(
    'h-fol-useful',
    'Followers Are Most Useful For Understanding',
    3,
  ),
  bullets('ul-fol-useful', [
    'the audience connected to a Facebook Page',
    'changes in Page audience size',
    'who has chosen to follow Page updates',
    'longer-term Page audience growth',
  ]),
  paragraph(
    'p-fol-8',
    "Meta provides Page follower information through the Page's professional dashboard and Audience insights. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph('p-fol-9', 'Think of followers as:'),
  paragraph('p-fol-10', 'people connected to the Page'),
  paragraph('p-fol-11', 'rather than:'),
  paragraph('p-fol-12', 'people who liked one particular post.'),
  paragraph(
    'p-fol-13',
    'Facebook followers therefore describe the Page audience, not a reaction to one piece of content.',
    [{ href: '/buy-facebook-followers', label: 'Facebook followers' }],
  ),

  heading('h-page-likes', 'What Are Facebook Page Likes?', 2),
  paragraph(
    'p-pl-1',
    'Historically, liking a Facebook Page was one of the main ways people connected with businesses, brands, organizations and public figures.',
  ),
  paragraph(
    'p-pl-2',
    "But Facebook's Page experience has changed.",
  ),
  paragraph(
    'p-pl-3',
    'Meta currently states that some Pages that previously had a Like button may now only have a Follow button. (Facebook)',
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pl-4',
    'Its current Page follower Insights documentation goes further and says Page Likes have been replaced by follows in Meta Business Suite, meaning Page managers now see follow insights rather than Page Like insights there. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pl-5',
    "However, Facebook's wider documentation can still reference liking or following a Page, and Meta notes that its Page experience can change as features are tested. (Facebook)",
    [{ href: FB_PROFILES_PAGES_GROUPS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pl-6',
    'So Facebook Page Likes should now be understood as a Page-level connection whose visibility and availability can depend on the Page experience.',
    [{ href: '/buy-facebook-page-likes', label: 'Facebook Page Likes' }],
  ),
  heading(
    'h-pl-happens',
    'What Happens When Someone Likes a Page?',
    3,
  ),
  paragraph(
    'p-pl-7',
    "Meta's current follower documentation says that when someone likes a Page, they automatically follow it, and that connection is included in Page follow totals. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pl-8',
    'That is one reason Page Likes and Page Followers can look closely related.',
  ),
  paragraph(
    'p-pl-9',
    'But they should not simply be treated as identical historical metrics.',
  ),
  paragraph(
    'p-pl-10',
    'Facebook has changed how the Page connection works over time.',
  ),
  figure(
    'fig-page-vs-post',
    `${IMAGE_DIR}/page-vs-post-metrics.png`,
    'Infographic separating Facebook Page followers and Page Likes from Post Likes on individual content, noting many Page experiences are moving toward follows',
    'Page audience metrics and post engagement metrics are not the same thing. Facebook is transitioning many Page experiences toward follows.',
  ),

  heading('h-post-likes', 'What Are Facebook Post Likes?', 2),
  paragraph(
    'p-po-1',
    'A Post Like is an interaction with one specific Facebook post.',
  ),
  paragraph(
    'p-po-2',
    'Facebook now has a broader system called Reactions.',
  ),
  paragraph(
    'p-po-3',
    'A user can react to content with options including Like, Love, Haha, Wow, Sad and Angry. (Facebook)',
    [{ href: FB_REACT, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-po-4',
    'A Like on a post is therefore one type of reaction.',
  ),
  paragraph(
    'p-po-5',
    'This is completely different from liking or following the Page itself.',
  ),
  paragraph(
    'p-po-6',
    'Imagine a Facebook Page posts a photograph.',
  ),
  paragraph('p-po-7', 'Someone may:'),
  bullets('ul-po-may', [
    'see the post,',
    'press Like,',
    'and continue scrolling.',
  ]),
  paragraph(
    'p-po-8',
    'That does not automatically mean the person has followed the Page.',
  ),
  paragraph(
    'p-po-9',
    'Likewise, an existing follower may see the post without liking it.',
  ),
  heading(
    'h-po-useful',
    'Post Likes Are Most Useful For Understanding',
    3,
  ),
  bullets('ul-po-useful', [
    'reaction to one particular post',
    'differences between individual pieces of content',
    'visible interaction with specific posts',
    'how audiences respond to different topics or formats',
  ]),
  paragraph(
    'p-po-10',
    'Facebook Post Likes should therefore be considered a content-level interaction metric.',
    [{ href: '/buy-facebook-post-likes', label: 'Facebook Post Likes' }],
  ),

  heading(
    'h-glance',
    'Facebook Followers vs Page Likes vs Post Likes at a Glance',
    2,
  ),
  {
    id: 'table-glance',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Applies To', 'Mainly Represents'],
    rows: [
      ['Page Followers', 'Facebook Page', 'Page audience connection'],
      [
        'Page Likes',
        'Facebook Page',
        'Page-level Like connection where available',
      ],
      ['Post Likes', 'Individual post', 'Like reaction to that content'],
    ],
  },
  paragraph(
    'p-gl-1',
    'The easiest way to remember it:',
  ),
  paragraph('p-gl-2', 'Followers = Page audience'),
  paragraph('p-gl-3', 'Page Likes = Page-level connection'),
  paragraph('p-gl-4', 'Post Likes = content interaction'),
  paragraph(
    'p-gl-5',
    'Other platforms also separate account-level and content-level metrics. Instagram followers, likes, views and comments are a useful parallel when you need that distinction on Instagram.',
    [
      {
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
        label: 'Instagram followers, likes, views and comments',
      },
    ],
  ),

  heading(
    'h-why-diff',
    'Why Are Facebook Page Likes and Followers Different?',
    2,
  ),
  paragraph(
    'p-wd-1',
    "The difference partly comes from how Facebook's Page system developed over time.",
  ),
  paragraph(
    'p-wd-2',
    'Page Likes were historically highly visible.',
  ),
  paragraph(
    'p-wd-3',
    'Following became a more explicit way of choosing to receive updates.',
  ),
  paragraph(
    'p-wd-4',
    'Meta currently explains that liking a Page can automatically include following it, while some Pages now expose only a Follow option. (Facebook)',
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wd-5',
    "That means an older Page may have historical Like connections while Facebook's current management tools focus more heavily on followers.",
  ),
  heading('h-wd-ex', 'Example', 3),
  paragraph('p-wd-6', 'Imagine a Page displays:'),
  paragraph('p-wd-7', '12,000 followers'),
  paragraph(
    'p-wd-8',
    'and some interface or legacy context also refers to:',
  ),
  paragraph('p-wd-9', '10,500 Page Likes'),
  paragraph(
    'p-wd-10',
    'Those numbers should not automatically be expected to match.',
  ),
  paragraph(
    'p-wd-11',
    "They describe connections created through Facebook's Page systems at different times and under different Page experiences.",
  ),
  figure(
    'fig-evolved',
    `${IMAGE_DIR}/page-connection-evolved.png`,
    'Simplified timeline of Facebook Page connection moving from an earlier Like-and-follow experience toward a Follow-focused Page audience connection',
    'Simplified illustration of Facebook\'s Page transition. Some Pages and interfaces may still show Like-related functionality.',
  ),

  heading(
    'h-only-follow',
    'Why Does My Facebook Page Only Show a Follow Button?',
    2,
  ),
  paragraph(
    'p-of-1',
    "This may simply be part of Facebook's current Page experience.",
  ),
  paragraph(
    'p-of-2',
    'Meta explicitly says that some Pages that previously had a Like button may now only have a Follow button. (Facebook)',
    [{ href: FB_FOLLOW_PAGE_ALT, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-of-3',
    'If this is what you see, it does not necessarily mean something is wrong with the Page.',
  ),
  paragraph(
    'p-of-4',
    'Facebook has been changing how people connect to Pages.',
  ),
  paragraph(
    'p-of-5',
    'The important Page-level metric to watch in the current management experience is followers.',
  ),
  paragraph(
    'p-of-6',
    "Meta's Business Suite documentation now directs Page managers toward follower Insights because Page Like Insights have been replaced by follow Insights there. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-like-without-follow',
    'Can Someone Like a Facebook Post Without Following the Page?',
    2,
  ),
  paragraph('p-lwf-1', 'Yes.'),
  paragraph(
    'p-lwf-2',
    'A post reaction and a Page follow are separate actions.',
  ),
  paragraph(
    'p-lwf-3',
    'Facebook lets people react to posts directly, including with the Like reaction. (Facebook)',
    [{ href: FB_REACT, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lwf-4',
    'A person can therefore interact with an individual piece of public content without that interaction meaning they have followed the Page.',
  ),
  paragraph(
    'p-lwf-5',
    'This is particularly relevant because Facebook can recommend posts and Pages to people who do not already follow them. (Facebook)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  paragraph('p-lwf-6', 'Someone might:'),
  bullets('ul-lwf', [
    'discover a suggested post,',
    'like it,',
    'and never follow the Page.',
  ]),
  paragraph('p-lwf-7', 'That is normal.'),

  heading(
    'h-every-post',
    'Can a Facebook Follower Like Every Post?',
    2,
  ),
  paragraph(
    'p-ep-1',
    'They can react to posts they see, but being a follower does not mean they will automatically like every piece of content.',
  ),
  paragraph(
    'p-ep-2',
    'Following and liking content are separate actions.',
  ),
  paragraph('p-ep-3', 'A follower may:'),
  bullets('ul-ep', [
    'see a post and like it,',
    'see it and leave another reaction,',
    'comment,',
    'share,',
    'ignore it,',
    'or never encounter that specific post in their Feed.',
  ]),
  paragraph(
    'p-ep-4',
    'The follower count should therefore never be used as a direct prediction of how many likes every Page post should receive.',
  ),

  heading(
    'h-many-few',
    'Why Can a Page Have Many Followers but Few Post Likes?',
    2,
  ),
  paragraph(
    'p-mf-1',
    'Because the metrics measure different things.',
  ),
  paragraph('p-mf-2', 'Suppose a Page has:'),
  paragraph('p-mf-3', '20,000 followers'),
  paragraph('p-mf-4', 'but a new post receives:'),
  paragraph('p-mf-5', '120 Likes'),
  paragraph(
    'p-mf-6',
    'That does not automatically indicate something is broken.',
  ),
  paragraph(
    'p-mf-7',
    "The follower number represents the Page's overall connected audience.",
  ),
  paragraph(
    'p-mf-8',
    'The post Like total represents one specific type of reaction to one post.',
  ),
  paragraph(
    'p-mf-9',
    'Facebook Feed is personalized and considers multiple signals when determining which posts appear and how they are ordered. Public Facebook guidance notes that engagement signals such as comments, likes, reactions and shares can be among the information relevant to Feed ranking, but no simple relationship guarantees exposure to every follower. (Facebook)',
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),

  heading(
    'h-guarantee',
    'Do More Facebook Followers Guarantee More Post Likes?',
    2,
  ),
  paragraph('p-gu-1', 'No.'),
  paragraph(
    'p-gu-2',
    'A larger follower count does not guarantee proportional interaction on every post.',
  ),
  paragraph(
    'p-gu-3',
    'Followers describe a Page-level connection.',
  ),
  paragraph(
    'p-gu-4',
    'Post likes describe one particular interaction on one piece of content.',
  ),
  paragraph(
    'p-gu-5',
    'A Page with more followers could still publish a post that receives relatively little engagement.',
  ),
  paragraph(
    'p-gu-6',
    'A smaller Page could publish one post that gets shared or recommended widely.',
  ),
  paragraph(
    'p-gu-7',
    'Facebook can also recommend content to people who do not already follow the Page. (Facebook)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  paragraph('p-gu-8', 'Therefore:'),
  paragraph('p-gu-9', 'more followers ≠ guaranteed likes'),
  paragraph('p-gu-10', 'and:'),
  paragraph('p-gu-11', 'more post likes ≠ guaranteed followers'),
  paragraph(
    'p-gu-12',
    'These metrics should be assessed independently.',
  ),
  {
    id: 'cta-facebook-metrics',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare Facebook Options',
    text: 'Facebook Followers, Page Likes and Post Likes refer to different parts of a Facebook presence. Followers and Page Likes use a Page URL. Post Likes use a specific post URL.',
    serviceSlugs: [
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ],
  },

  heading(
    'h-still',
    'Are Page Likes Still Important in 2026?',
    2,
  ),
  paragraph('p-st-1', 'The better question is:'),
  paragraph(
    'p-st-2',
    'Does the Page experience you are using still expose Page Likes?',
  ),
  paragraph(
    'p-st-3',
    'Facebook is clearly placing more emphasis on follows.',
  ),
  paragraph('p-st-4', 'Meta says:'),
  bullets('ul-st', [
    'some Pages now only have Follow rather than Like',
    'Page Like insights have been replaced by follow insights in Meta Business Suite.',
  ]),
  paragraph(
    'p-st-6',
    'Those points come from Facebook\'s current Page-follow documentation. (Facebook)',
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-st-6',
    'So for Page owners evaluating their current audience, followers are now generally the more important current metric to monitor.',
  ),
  paragraph(
    'p-st-7',
    'That does not mean historical Page Like numbers never existed or that every Facebook interface changed identically at the same moment. Many Page experiences are moving toward follows.',
  ),
  paragraph(
    'p-st-8',
    'It means Page owners should evaluate the interface and metrics currently available on their own Page.',
  ),
  figure(
    'fig-which-metric',
    `${IMAGE_DIR}/which-metric.png`,
    'Decision graphic asking what you are measuring: Page audience as Followers, Page-level Like connection as Page Likes where currently available, or interaction on one post as Post Likes',
    'Choose the metric based on the object being measured: Page or post. Many Page experiences are moving toward follows.',
  ),

  heading(
    'h-not-same',
    'Page Likes Are Not the Same as Post Likes',
    2,
  ),
  paragraph(
    'p-ns-1',
    'This is probably the most common confusion.',
  ),
  paragraph('p-ns-2', 'When someone says:'),
  paragraph(
    'p-ns-3',
    '“My Facebook Page has 5,000 likes”',
  ),
  paragraph(
    'p-ns-4',
    'they may mean the historical Page-level Like count.',
  ),
  paragraph('p-ns-5', 'When they say:'),
  paragraph(
    'p-ns-6',
    '“This Facebook post has 500 likes”',
  ),
  paragraph(
    'p-ns-7',
    'they mean Likes on one individual piece of content.',
  ),
  paragraph(
    'p-ns-8',
    'Those numbers are not interchangeable.',
  ),
  paragraph(
    'p-ns-9',
    'One describes a relationship with the Page.',
  ),
  paragraph(
    'p-ns-10',
    'The other describes a reaction to content.',
  ),
  paragraph(
    'p-ns-11',
    'This is why Facebook Page Like services and Facebook Post Like services require different target URLs.',
  ),
  paragraph(
    'p-ns-12',
    'A Page-level action relates to the Facebook Page, while a Post Like relates to one specific post.',
  ),

  heading(
    'h-reactions',
    'Are Facebook Post Likes the Same as Reactions?',
    2,
  ),
  paragraph(
    'p-rx-1',
    'A Like is one type of Facebook Reaction.',
  ),
  paragraph(
    'p-rx-2',
    "Facebook's current reaction system includes Like as well as other options such as Love, Haha, Wow, Sad and Angry. (Facebook)",
    [{ href: FB_WHAT_LIKE_MEANS, label: 'Facebook', external: true }],
  ),
  paragraph('p-rx-3', 'So:'),
  paragraph('p-rx-4', 'Every Like is a reaction.'),
  paragraph('p-rx-5', 'But:'),
  paragraph('p-rx-6', 'Not every reaction is a Like.'),
  paragraph(
    'p-rx-7',
    'This distinction matters when reading Facebook engagement numbers.',
  ),
  paragraph(
    'p-rx-8',
    'A post may display an overall reaction count containing different reaction types rather than only Likes.',
  ),

  heading(
    'h-hide',
    'Can People Hide Facebook Reaction Counts?',
    2,
  ),
  paragraph(
    'p-hide-1',
    'Facebook provides settings allowing users to hide reaction totals on certain posts and Reels. (Facebook)',
    [{ href: FB_HIDE_REACTIONS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-hide-2',
    'So a visible public count may not always be presented in exactly the same way to every user or account.',
  ),
  paragraph(
    'p-hide-3',
    'That is another reason Page owners should rely on their own available management and Insights tools when evaluating content performance.',
  ),

  heading(
    'h-compare',
    'Should You Compare Followers With Post Likes?',
    2,
  ),
  paragraph(
    'p-cmp-1',
    'You can compare them for context, but not as equivalent metrics.',
  ),
  paragraph('p-cmp-2', 'For example:'),
  bullets('ul-cmp', [
    'Page followers: 10,000',
    'Post A Likes: 400',
    'Post B Likes: 900',
    'Post C Likes: 250',
  ]),
  paragraph(
    'p-cmp-3',
    'The follower count provides context about the Page audience.',
  ),
  paragraph(
    'p-cmp-4',
    'The post totals help compare individual posts.',
  ),
  paragraph(
    'p-cmp-5',
    'But simply dividing likes by total followers does not automatically explain:',
  ),
  bullets('ul-cmp-not', [
    'how many followers saw the post,',
    'how many non-followers saw it,',
    'or why one post performed differently.',
  ]),
  paragraph(
    'p-cmp-6',
    "Facebook's recommendations can expose content beyond an existing follower base, which makes simple follower-to-like comparisons incomplete. (Facebook)",
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-business',
    'Which Facebook Metric Should a Business Track?',
    2,
  ),
  paragraph(
    'p-biz-1',
    'It depends on what you want to understand.',
  ),
  heading('h-biz-audience', 'To Understand Page Audience', 3),
  paragraph('p-biz-2', 'Look at:'),
  paragraph('p-biz-3', 'Followers'),
  paragraph(
    'p-biz-4',
    "Meta's current Page management experience focuses on follower Insights. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading(
    'h-biz-content',
    'To Understand Individual Content Reactions',
    3,
  ),
  paragraph('p-biz-5', 'Look at:'),
  paragraph('p-biz-6', 'Likes and other reactions'),
  paragraph('p-biz-7', 'alongside:'),
  bullets('ul-biz-content', [
    'comments,',
    'shares,',
    'and other relevant post insights.',
  ]),
  paragraph(
    'p-biz-8',
    "Facebook's Feed systems consider various interaction signals, while businesses can assess post-level performance separately from Page audience size. (Facebook)",
    [{ href: FB_FEED_ORDER, label: 'Facebook', external: true }],
  ),
  heading('h-biz-history', 'To Understand Page Like History', 3),
  paragraph(
    'p-biz-9',
    "Use any Page Like information still available in your Page's current interface or historical reporting, keeping in mind Meta's transition toward followers. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-mismatch',
    'What Should You Do If Page Likes and Followers Do Not Match?',
    2,
  ),
  paragraph(
    'p-mm-1',
    'Do not assume the difference is an error.',
  ),
  paragraph(
    'p-mm-2',
    'Page Likes and Page follows have not always represented identical actions, and Facebook has changed its Page experience over time.',
  ),
  paragraph(
    'p-mm-3',
    'Meta says that on Pages where likes are still relevant, someone liking a Page can automatically follow it. It also says that people who previously liked and followed a Page remain followers when the Page shifts to the newer Follow-only experience. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-mm-4',
    "Historical connections and the Page's current experience can therefore produce different-looking numbers.",
  ),

  heading(
    'h-which-page',
    'What Matters More: Facebook Followers or Page Likes?',
    2,
  ),
  paragraph(
    'p-wp-1',
    'For a current Page owner, followers are increasingly the clearer audience metric.',
  ),
  paragraph(
    'p-wp-2',
    "That is supported by Facebook's own move toward Follow buttons, follower tabs and follower Insights. (Facebook)",
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wp-3',
    'But if your Page still exposes Page Like information, that number can still be understood in its proper context.',
  ),
  paragraph(
    'p-wp-4',
    'The key is not to pretend Facebook still works exactly as it did several years ago.',
  ),
  paragraph(
    'p-wp-5',
    'Use the metrics that actually exist on your Page today.',
  ),

  heading(
    'h-which-post',
    'What Matters More: Followers or Post Likes?',
    2,
  ),
  paragraph(
    'p-wpo-1',
    'Neither is universally “better.”',
  ),
  paragraph(
    'p-wpo-2',
    'They answer different questions.',
  ),
  paragraph('p-wpo-3', 'If you want to know:'),
  paragraph(
    'p-wpo-4',
    'How many people are connected to the Page?',
  ),
  paragraph(
    'p-wpo-5',
    'Followers are more relevant.',
  ),
  paragraph('p-wpo-6', 'If you want to know:'),
  paragraph(
    'p-wpo-7',
    'How did people react to this particular post?',
  ),
  paragraph(
    'p-wpo-8',
    'Post Likes and other reactions are more relevant.',
  ),
  paragraph(
    'p-wpo-9',
    'If you want a fuller picture, examine:',
  ),
  bullets('ul-wpo', [
    'Page audience,',
    'individual post performance,',
    'comments,',
    'shares,',
    'reactions,',
    'and trends over time.',
  ]),
  paragraph('p-wpo-10', 'One number is rarely enough.'),

  heading(
    'h-outcomes',
    "Don't Treat Facebook Metrics as Guaranteed Outcomes",
    2,
  ),
  paragraph(
    'p-out-1',
    'It is important to keep visible social metrics separate from business outcomes.',
  ),
  paragraph(
    'p-out-2',
    'More Facebook followers do not automatically guarantee:',
  ),
  bullets('ul-out-fol', [
    'more post likes,',
    'more website visits,',
    'more leads,',
    'more customers,',
    'or better Feed ranking.',
  ]),
  paragraph(
    'p-out-3',
    'More Post Likes do not automatically guarantee:',
  ),
  bullets('ul-out-likes', [
    'more followers,',
    'more Page reach,',
    'or more sales.',
  ]),
  paragraph(
    'p-out-4',
    'Meta describes Facebook recommendations and Feed as personalized systems influenced by multiple signals, rather than a simple rule based on one visible count. (Facebook)',
    [{ href: FB_RECOMMENDATIONS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-out-5',
    'This is also why NovaLikes should keep each Facebook service narrowly described by the metric it provides.',
  ),

  heading(
    'h-close',
    'One Page, Three Very Different Metrics',
    2,
  ),
  paragraph(
    'p-cl-1',
    "The easiest way to understand Facebook's terminology is to ask one question:",
  ),
  paragraph(
    'p-cl-2',
    'What exactly is the number attached to?',
  ),
  paragraph(
    'p-cl-3',
    "If it is attached to the Page audience, you're probably looking at followers or a Page-level Like connection.",
  ),
  paragraph(
    'p-cl-4',
    "If it is attached to one post, you're looking at reactions such as Post Likes.",
  ),
  paragraph(
    'p-cl-5',
    "Facebook's shift toward the Follow model has made followers increasingly central to Page management, but Page Likes can still appear in legacy/current contexts depending on the Page experience. (Facebook)",
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cl-6',
    'Once you separate Page metrics from post metrics, the terminology becomes much easier to understand.',
  ),
  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Facebook Page Followers are a Page-level audience metric.',
    'Meta is transitioning many Page experiences away from Page Likes and toward follows.',
    'Some Pages may now show only a Follow button.',
    'Post Likes are reactions to one individual Facebook post, not Likes on the Page itself.',
    'A Like is one type of Facebook Reaction.',
    'Page Followers, Page Likes and Post Likes should never be treated as interchangeable metrics.',
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

export const FACEBOOK_FOLLOWERS_VS_PAGE_LIKES_VS_POST_LIKES_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-facebook-followers-vs-page-likes-vs-post-likes',
    slug: SLUG,
    title:
      'Facebook Followers vs Page Likes vs Post Likes: What’s the Difference?',
    excerpt:
      'Facebook uses several similar-looking terms around Pages and posts: Followers, Page Likes and Post Likes.',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'facebook',
    tags: ['followers', 'likes', 'analytics', 'business', 'creator'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Illustration separating Facebook Page audience metrics from individual post likes',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
    showModifiedDate: false,
    seo: {
      title: 'Facebook Followers vs Page Likes vs Post Likes',
      description:
        "Learn the difference between Facebook Page followers, Page Likes and Post Likes, including how Facebook's newer Page experience affects these metrics.",
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'Facebook followers vs page likes',
        'Facebook page likes vs followers',
        'Facebook post likes',
        'difference between Facebook likes and followers',
        'Facebook Page followers',
        'Page Likes Facebook',
      ],
    },
    relatedServices: [
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ],
    relatedArticles: [
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'how-facebook-page-reach-works',
      'how-to-get-more-facebook-page-followers',
      'how-to-get-more-likes-on-facebook-post',
      'why-facebook-page-followers-drop',
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
      'Page Followers = people connected to the Page through following',
      'Page Likes = a Page-level connection that Facebook has been transitioning away from on many Page experiences',
      'Post Likes = Like reactions on one specific post',
    ],
    faqs: [
      {
        id: 'faq-1',
        question:
          'What is the difference between Facebook Page Likes and followers?',
        answer:
          'Followers represent people following the Page and potentially receiving Page updates in Feed. Page Likes are an older/page-level connection that Facebook has increasingly been replacing with the Follow model. Some Pages now only have a Follow button.',
        schemaEligible: true,
      },
      {
        id: 'faq-2',
        question: 'Are Facebook Page Likes being removed?',
        answer:
          'Facebook says some Pages that previously had a Like button may now only have a Follow button, and Meta Business Suite now focuses on Follows rather than Page Like insights.',
        schemaEligible: true,
      },
      {
        id: 'faq-3',
        question: 'Is liking a Facebook Page the same as liking a post?',
        answer:
          "No. A Page Like applies to the Page-level connection, while a Post Like is a reaction to one individual post. Facebook's reaction system treats Like as one of several available reactions.",
        schemaEligible: true,
      },
      {
        id: 'faq-4',
        question:
          'Can someone like my Facebook post without following my Page?',
        answer:
          'Yes. Reacting to a post and following a Page are separate actions. Facebook may also recommend content to people who do not already follow the Page.',
        schemaEligible: true,
      },
      {
        id: 'faq-5',
        question:
          'Why does my Facebook Page only have followers and no Likes?',
        answer:
          "That can be part of Facebook's newer Page experience. Meta says some Pages that previously had Like buttons now only have a Follow button.",
        schemaEligible: true,
      },
      {
        id: 'faq-6',
        question: 'Are Post Likes the same as Facebook reactions?',
        answer:
          'A Like is one type of reaction. Other Facebook reactions include Love, Haha, Wow, Sad and Angry.',
        schemaEligible: true,
      },
    ],
  };
