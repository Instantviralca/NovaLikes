/**
 * Article #3 — Instagram Followers vs Likes vs Views vs Comments
 * Scheduled: Friday 28 August 2026.
 * Informational intent. Supports existing Instagram commercial pages; does not compete with them.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'instagram-followers-vs-likes-vs-views-vs-comments';
const SCHEDULED_AT = '2026-08-28T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_REEL_INSIGHTS =
  'https://www.facebook.com/help/instagram/202865988324236';
const IG_CREATORS_FAQ = 'https://creators.instagram.com/faq';

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
    'Open an Instagram profile or Reel and several different numbers can appear important at the same time.',
  ),
  paragraph('p-open-2', 'Followers.'),
  paragraph('p-open-3', 'Likes.'),
  paragraph('p-open-4', 'Views.'),
  paragraph('p-open-5', 'Comments.'),
  paragraph(
    'p-open-6',
    'They are all connected to activity on Instagram, but they do not measure the same thing.',
  ),
  paragraph(
    'p-open-7',
    "An account can have a large follower count while a particular Reel receives relatively few views. Another Reel can reach far beyond the account's existing audience. A post may receive many views but comparatively few comments, while another receives fewer views but starts a stronger conversation.",
  ),
  paragraph(
    'p-open-8',
    'Those differences are normal because each metric represents a different action.',
  ),
  paragraph(
    'p-open-9',
    "Instagram's own Insights separates views, interactions and followers rather than treating them as one combined performance number. Meta defines interactions as actions such as likes, comments, saves and shares, while follower insights describe trends in the account's audience. (Facebook)",
    [
      { href: IG_INSIGHTS, label: 'Insights', external: true },
      { href: IG_INSIGHTS, label: 'Facebook', external: true },
    ],
  ),
  paragraph(
    'p-open-10',
    'Understanding those distinctions makes it easier to evaluate an Instagram account without assuming one number tells the entire story.',
  ),

  heading('h-followers', 'What Are Instagram Followers?', 2),
  paragraph(
    'p-followers-1',
    'Instagram followers are accounts that have chosen to follow a profile.',
    [{ href: '/buy-instagram-followers', label: 'Instagram followers' }],
  ),
  paragraph(
    'p-followers-2',
    'This makes follower count primarily an account-level metric rather than a measurement of one individual post or Reel.',
  ),
  paragraph(
    'p-followers-3',
    'Follower numbers help describe the audience connected to a profile over time.',
  ),
  paragraph(
    'p-followers-4',
    "For professional accounts, Instagram's Insights can show follower trends, including growth and audience information when the relevant eligibility thresholds are met. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-followers-5',
    "That makes followers useful when you're trying to understand questions such as:",
  ),
  bullets('ul-followers-q', [
    "Is the account's audience growing?",
    'Are people choosing to stay connected after discovering the content?',
    "How is the profile's audience changing over time?",
    'What type of audience follows the account?',
  ]),
  paragraph(
    'p-followers-6',
    'But follower count should not be confused with guaranteed content reach.',
  ),
  paragraph(
    'p-followers-7',
    'Having 25,000 followers does not mean every new Reel will receive exactly 25,000 views.',
  ),
  paragraph(
    'p-followers-8',
    'The follower count belongs to the profile.',
  ),
  paragraph(
    'p-followers-9',
    'The performance of an individual piece of content is measured separately.',
  ),
  heading(
    'h-followers-useful',
    'Followers Are Most Useful For Understanding',
    3,
  ),
  bullets('ul-followers-useful', [
    'overall account audience',
    'follower growth over time',
    'audience trends',
    'whether people are choosing to continue following the profile',
  ]),
  paragraph(
    'p-followers-10',
    'Think of followers as the people who have made an ongoing connection with the account.',
  ),
  paragraph(
    'p-followers-11',
    "If you want a simple public snapshot of an account's follower number while reviewing those trends, the Instagram Follower Counter is available as a free NovaLikes tool.",
    [
      {
        href: '/tools/instagram-follower-counter',
        label: 'Instagram Follower Counter',
      },
    ],
  ),

  heading('h-likes', 'What Are Instagram Likes?', 2),
  paragraph(
    'p-likes-1',
    'A like is one way someone can interact with Instagram content.',
  ),
  paragraph(
    'p-likes-2',
    'Instagram includes likes within its broader Interactions metric alongside actions such as comments, saves and shares. (Facebook)',
    [
      { href: IG_INSIGHTS, label: 'Interactions', external: true },
      { href: IG_INSIGHTS, label: 'Facebook', external: true },
    ],
  ),
  paragraph('p-likes-3', 'That distinction matters.'),
  paragraph('p-likes-4', 'A like is not the same thing as:'),
  bullets('ul-likes-not', [
    'a view,',
    'a follower,',
    'a comment,',
    'or a unique account reached.',
  ]),
  paragraph(
    'p-likes-5',
    'Someone can like a Reel without following its creator.',
  ),
  paragraph(
    'p-likes-6',
    'An existing follower can view a post without liking it.',
  ),
  paragraph(
    'p-likes-7',
    'And someone can like content without leaving a comment.',
  ),
  paragraph(
    'p-likes-8',
    'Instagram likes therefore help describe one particular type of reaction to content.',
    [{ href: '/buy-instagram-likes', label: 'Instagram likes' }],
  ),
  heading('h-likes-tell', 'What Can Likes Tell You?', 3),
  paragraph('p-likes-9', 'Likes can help you compare:'),
  bullets('ul-likes-compare', [
    'which posts receive more visible positive interaction,',
    'which topics appear to resonate with viewers,',
    'how different pieces of content perform relative to each other,',
    'and how audience reaction changes over time.',
  ]),
  paragraph(
    'p-likes-10',
    'They become more informative when compared with other metrics rather than read alone.',
  ),
  paragraph('p-likes-11', 'Imagine:'),
  heading('h-post-a', 'Post A', 3),
  bullets('ul-post-a', ['50,000 views', '3,000 likes']),
  heading('h-post-b', 'Post B', 3),
  bullets('ul-post-b', ['15,000 views', '2,500 likes']),
  paragraph(
    'p-likes-12',
    'Post A received substantially more viewing activity.',
  ),
  paragraph(
    'p-likes-13',
    'Post B received almost as many likes from a much smaller view total.',
  ),
  paragraph('p-likes-14', 'Those two posts tell different stories.'),

  heading('h-views', 'What Are Instagram Views?', 2),
  paragraph(
    'p-views-1',
    'Instagram currently defines Views in Insights as the number of times content was played or displayed. The metric can apply across content including Reels, posts, Stories, Live videos and ads. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-views-2',
    'Instagram views therefore relate primarily to content consumption or visibility.',
    [{ href: '/buy-instagram-views', label: 'Instagram views' }],
  ),
  paragraph(
    'p-views-3',
    'But an important distinction exists between:',
  ),
  paragraph('p-views-4', 'Views'),
  paragraph('p-views-5', 'and'),
  paragraph('p-views-6', 'Accounts reached'),
  paragraph(
    'p-views-7',
    'Instagram says Accounts reached represents unique accounts that saw the content at least once, while Views can include multiple views from the same account. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph('p-views-8', 'That means:'),
  paragraph('p-views-9', '10,000 views'),
  paragraph(
    'p-views-10',
    'does not necessarily mean:',
  ),
  paragraph('p-views-11', '10,000 different people.'),
  paragraph(
    'p-views-12',
    'For Reels specifically, Instagram says views count when a Reel starts to play or replay, while Accounts reached represents unique accounts that saw the Reel. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading(
    'h-views-useful',
    'Views Are Useful For Understanding',
    3,
  ),
  bullets('ul-views-useful', [
    'how much viewing/display activity content receives',
    'which content attracts more consumption',
    'performance differences between posts or Reels',
    'how widely content activity is developing over time',
  ]),
  paragraph(
    'p-views-13',
    'Views do not automatically mean someone:',
  ),
  bullets('ul-views-not', [
    'followed,',
    'liked,',
    'commented,',
    'shared,',
    'saved,',
    'visited a website,',
    'or purchased something.',
  ]),
  paragraph('p-views-14', 'Those are different actions.'),
  figure(
    'fig-four-jobs',
    `${IMAGE_DIR}/four-metrics-four-jobs.png`,
    'Infographic showing Instagram followers as profile audience, views as content visibility, likes as quick interaction and comments as conversation',
    'Read the metrics together, not as interchangeable numbers.',
  ),

  heading('h-comments', 'What Are Instagram Comments?', 2),
  paragraph(
    'p-comments-1',
    'Instagram comments are another form of interaction with content.',
    [{ href: '/buy-instagram-comments', label: 'Instagram comments' }],
  ),
  paragraph(
    'p-comments-2',
    'Unlike a like, a comment requires someone to leave a written response under the post or Reel.',
  ),
  paragraph(
    'p-comments-3',
    'Instagram includes comments within its Interactions metrics alongside likes, saves and shares. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-comments-4',
    'Comments can be useful because they may reveal more context than a simple interaction count.',
  ),
  paragraph('p-comments-5', 'They can contain:'),
  bullets('ul-comments-contain', [
    'questions,',
    'opinions,',
    'feedback,',
    'reactions,',
    'requests for more information,',
    'or conversations between users.',
  ]),
  paragraph(
    'p-comments-6',
    'But more comments do not automatically mean a post was more successful.',
  ),
  paragraph('p-comments-7', 'Context matters.'),
  paragraph('p-comments-8', 'For example, comments could be:'),
  bullets('ul-comments-types', [
    'positive,',
    'critical,',
    'questions,',
    'support requests,',
    'spam,',
    'or unrelated discussion.',
  ]),
  paragraph(
    'p-comments-9',
    'So the raw number should not be interpreted without looking at what people are actually saying.',
  ),
  heading(
    'h-comments-help',
    'Comments Can Help You Understand',
    3,
  ),
  bullets('ul-comments-help', [
    'which posts create discussion',
    'what questions viewers have',
    'recurring audience interests',
    'topics people want explained further',
    'potential ideas for future content',
  ]),
  paragraph(
    'p-comments-10',
    'For creators and businesses, the content of the comments can sometimes be more valuable than the total comment count.',
  ),

  heading(
    'h-glance',
    'Instagram Followers vs Likes vs Views vs Comments at a Glance',
    2,
  ),
  {
    id: 'table-glance',
    type: 'comparison_table',
    order: nextOrder(),
    headers: ['Metric', 'Mainly Measures', 'Level'],
    rows: [
      ['Followers', 'Accounts following the profile', 'Profile'],
      ['Views', 'Times content was played/displayed', 'Content'],
      ['Likes', 'One type of interaction', 'Content'],
      ['Comments', 'Written interaction', 'Content'],
    ],
  },
  paragraph(
    'p-glance-1',
    'The simplest way to remember the difference is:',
  ),
  paragraph('p-glance-2', 'Followers = audience'),
  paragraph('p-glance-3', 'Views = visibility'),
  paragraph('p-glance-4', 'Likes = reaction'),
  paragraph('p-glance-5', 'Comments = conversation'),

  heading(
    'h-more-views',
    'Can You Have More Instagram Views Than Followers?',
    2,
  ),
  paragraph('p-more-1', 'Yes.'),
  paragraph(
    'p-more-2',
    'Follower count represents the audience following the profile.',
  ),
  paragraph(
    'p-more-3',
    'Views relate to content activity.',
  ),
  paragraph(
    'p-more-4',
    'Instagram provides creators with insights about both followers and content performance separately, and its creator resources specifically discuss understanding people who view content even when they do not follow the account. (Instagram Creators)',
    [
      {
        href: IG_CREATORS_FAQ,
        label: 'Instagram Creators',
        external: true,
      },
    ],
  ),
  paragraph(
    'p-more-5',
    "So a Reel receiving more views than the account's follower count is not inherently unusual.",
  ),
  paragraph('p-more-6', 'For example:'),
  bullets('ul-more-example', [
    'Profile followers: 4,000',
    'Reel views: 30,000',
  ]),
  paragraph(
    'p-more-7',
    'Those numbers measure different things.',
  ),
  paragraph(
    'p-more-8',
    "The Reel's visibility extends beyond the simple size of the follower number.",
  ),
  figure(
    'fig-profile-vs-content',
    `${IMAGE_DIR}/profile-vs-content.png`,
    'Infographic contrasting Instagram followers as a profile metric with views, likes and comments as individual content metrics',
    'Account size and individual content performance should not be expected to match.',
  ),

  heading(
    'h-views-few-likes',
    'Why Can a Reel Have Lots of Views but Few Likes?',
    2,
  ),
  paragraph(
    'p-vfl-1',
    'Because watching and liking are separate actions.',
  ),
  paragraph('p-vfl-2', 'A person can:'),
  bullets('ul-vfl-watch', [
    'see a Reel,',
    'watch part or all of it,',
    'and continue scrolling without interacting.',
  ]),
  paragraph(
    'p-vfl-3',
    'That still contributes to content viewing activity but does not create a like.',
  ),
  paragraph('p-vfl-4', 'Another viewer may:'),
  bullets('ul-vfl-act', [
    'watch,',
    'like,',
    'comment,',
    'save,',
    'share,',
    'or follow.',
  ]),
  paragraph(
    'p-vfl-5',
    'Each action represents a different level or type of behaviour.',
  ),
  paragraph(
    'p-vfl-6',
    'For Reels, Instagram provides separate metrics for views, likes, comments, saves, shares and follows generated from the Reel. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-vfl-7',
    'This is why interpreting only the view count can miss important context.',
  ),

  heading(
    'h-comments-vs-likes',
    'Are Comments More Important Than Likes?',
    2,
  ),
  paragraph('p-cvl-1', 'Not universally.'),
  paragraph('p-cvl-2', 'They are different interactions.'),
  paragraph(
    'p-cvl-3',
    'A like is usually a quick reaction.',
  ),
  paragraph(
    'p-cvl-4',
    'A comment involves leaving a written response.',
  ),
  paragraph(
    'p-cvl-5',
    'Depending on the content, either can be useful.',
  ),
  paragraph(
    'p-cvl-6',
    'A simple entertaining Reel might naturally receive many likes and relatively few comments.',
  ),
  paragraph(
    'p-cvl-7',
    'A tutorial ending with an interesting question may generate more discussion.',
  ),
  paragraph(
    'p-cvl-8',
    'A controversial topic may receive many comments but not necessarily indicate positive audience sentiment.',
  ),
  paragraph('p-cvl-9', 'Instead of asking:'),
  paragraph('p-cvl-10', '“Are comments better than likes?”'),
  paragraph('p-cvl-11', 'Ask:'),
  paragraph(
    'p-cvl-12',
    '“What does this content want viewers to do?”',
  ),
  paragraph(
    'p-cvl-13',
    'That produces a more useful analysis.',
  ),

  heading('h-which', 'Which Instagram Metric Matters Most?', 2),
  paragraph(
    'p-which-1',
    'There is no single metric that is always most important.',
  ),
  paragraph(
    'p-which-2',
    'The useful metric depends on your objective.',
  ),
  heading(
    'h-which-audience',
    'If you want to understand audience size',
    3,
  ),
  paragraph('p-which-3', 'Look at followers.'),
  heading(
    'h-which-visibility',
    'If you want to understand content visibility',
    3,
  ),
  paragraph(
    'p-which-4',
    'Look at views and reach-related information.',
  ),
  heading(
    'h-which-reaction',
    'If you want to understand quick content reaction',
    3,
  ),
  paragraph('p-which-5', 'Include likes.'),
  heading(
    'h-which-discussion',
    'If you want to understand discussion',
    3,
  ),
  paragraph(
    'p-which-6',
    'Examine comments, including what people are actually saying.',
  ),
  heading(
    'h-which-fuller',
    'If you want a fuller performance picture',
    3,
  ),
  paragraph(
    'p-which-7',
    'Read several metrics together.',
  ),
  paragraph(
    'p-which-8',
    "Instagram provides multiple metrics in Insights for exactly this reason rather than collapsing performance into one number. (Facebook)",
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  {
    id: 'cta-instagram-metrics',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare Instagram Growth Options',
    text: "Different Instagram metrics represent different parts of a profile's visible presence.",
    serviceSlugs: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ],
  },

  heading(
    'h-misleading',
    'Why Looking at One Instagram Metric Can Be Misleading',
    2,
  ),
  paragraph('p-mis-1', 'Imagine two Reels.'),
  heading('h-reel-a', 'Reel A', 3),
  bullets('ul-reel-a', [
    '100,000 views',
    '3,000 likes',
    '150 comments',
  ]),
  heading('h-reel-b', 'Reel B', 3),
  bullets('ul-reel-b', [
    '40,000 views',
    '4,000 likes',
    '500 comments',
  ]),
  paragraph('p-mis-2', 'Which Reel performed better?'),
  paragraph(
    'p-mis-3',
    "You cannot answer properly without knowing the creator's goal.",
  ),
  paragraph(
    'p-mis-4',
    'Reel A received substantially more viewing activity.',
  ),
  paragraph(
    'p-mis-5',
    'Reel B received more likes and comments despite fewer views.',
  ),
  paragraph(
    'p-mis-6',
    'Now imagine Reel A also generated substantially more followers.',
  ),
  paragraph('p-mis-7', 'The interpretation changes again.'),
  paragraph(
    'p-mis-8',
    'Or imagine Reel B generated more saves and shares.',
  ),
  paragraph('p-mis-9', 'Again, the picture changes.'),
  paragraph(
    'p-mis-10',
    'This is why Instagram performance should not be reduced to:',
  ),
  paragraph('p-mis-11', 'highest views = best post.'),
  paragraph(
    'p-mis-12',
    'The relationship between metrics is often more useful.',
  ),
  figure(
    'fig-read-together',
    `${IMAGE_DIR}/read-metrics-together.png`,
    'Diagram showing Instagram views, likes, comments and followers as different questions about the same content',
    'Different questions require different metrics.',
  ),

  heading(
    'h-evaluate',
    'How to Evaluate Your Instagram Performance Better',
    2,
  ),
  paragraph(
    'p-ev-1',
    'Instead of checking one headline number repeatedly, create a simple review process.',
  ),
  heading('h-ev-1', '1. Compare Similar Content', 3),
  paragraph(
    'p-ev-2',
    'A Reel should ideally be compared with other similar Reels.',
  ),
  paragraph(
    'p-ev-3',
    'A carousel may behave differently from a short Reel.',
  ),
  paragraph(
    'p-ev-4',
    'Try to avoid comparing completely different formats without context.',
  ),
  heading('h-ev-2', '2. Look at Views and Reach Separately', 3),
  paragraph(
    'p-ev-5',
    'Remember that views and unique accounts reached are not necessarily the same thing. Instagram explicitly distinguishes the two in Insights. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-ev-3', '3. Review Interactions', 3),
  paragraph('p-ev-6', 'Look at:'),
  bullets('ul-ev-interactions', [
    'likes,',
    'comments,',
    'saves,',
    'and shares.',
  ]),
  paragraph(
    'p-ev-7',
    'Instagram groups these types of actions under content interactions. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-ev-4', '4. Track Follower Trends', 3),
  paragraph(
    'p-ev-8',
    'Follower growth is an account-level signal.',
  ),
  paragraph(
    'p-ev-9',
    'Instead of expecting one post to transform the entire account, review trends over time.',
  ),
  heading(
    'h-ev-5',
    '5. Examine Which Reels Actually Generate Follows',
    3,
  ),
  paragraph(
    'p-ev-10',
    'Instagram Reel Insights can show how many accounts followed you as a result of viewing a particular Reel. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ev-11',
    'That can be more informative than assuming every high-view Reel automatically creates follower growth.',
  ),
  heading('h-ev-6', '6. Look for Repeatable Patterns', 3),
  paragraph(
    'p-ev-12',
    'One unusually strong post is useful information.',
  ),
  paragraph(
    'p-ev-13',
    'Several successful posts around the same subject are even more useful.',
  ),
  paragraph('p-ev-14', 'Compare:'),
  bullets('ul-ev-compare', [
    'topics,',
    'formats,',
    'openings,',
    'length,',
    'audience reactions,',
    'and follower outcomes.',
  ]),

  heading(
    'h-more-followers',
    'Do More Instagram Followers Automatically Mean More Likes and Views?',
    2,
  ),
  paragraph(
    'p-mf-1',
    'No guaranteed relationship should be assumed.',
  ),
  paragraph(
    'p-mf-2',
    'Followers represent accounts connected to the profile.',
  ),
  paragraph(
    'p-mf-3',
    'Views and likes relate to content activity and interaction.',
  ),
  paragraph(
    'p-mf-4',
    'An account can therefore have many followers while individual posts perform differently.',
  ),
  paragraph(
    'p-mf-5',
    "Likewise, a Reel may receive substantial viewing activity from people outside the existing follower base. Instagram's creator resources explicitly note that creators can use Insights to understand people viewing their content even if those people do not follow them. (Instagram Creators)",
    [
      {
        href: IG_CREATORS_FAQ,
        label: 'Instagram Creators',
        external: true,
      },
    ],
  ),
  paragraph(
    'p-mf-6',
    'More followers should therefore not be presented as a guaranteed method for obtaining proportional increases in:',
  ),
  bullets('ul-mf-not', [
    'views,',
    'likes,',
    'comments,',
    'sales,',
    'website visits,',
    'or other outcomes.',
  ]),
  paragraph(
    'p-mf-7',
    'Each metric should be evaluated for what it actually represents.',
  ),

  heading(
    'h-more-views-followers',
    'Do More Instagram Views Automatically Mean More Followers?',
    2,
  ),
  paragraph('p-mvf-1', 'No.'),
  paragraph(
    'p-mvf-2',
    'A Reel view and a follow are separate events.',
  ),
  paragraph(
    'p-mvf-3',
    'Instagram even reports Follows separately in Reel Insights, defining it as accounts that started following as a result of viewing the Reel. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph('p-mvf-4', 'That distinction is useful.'),
  paragraph('p-mvf-5', 'Views can show visibility.'),
  paragraph(
    'p-mvf-6',
    'Follows generated from content tell you something different about whether the Reel led viewers to make an additional connection with the account.',
  ),

  heading(
    'h-insights',
    'How Professional Accounts Can Use Instagram Insights',
    2,
  ),
  paragraph(
    'p-ins-1',
    'Instagram Insights are available to professional accounts such as business and creator accounts. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ins-2',
    'Rather than guessing from visible profile numbers alone, creators can use Insights to inspect Views, Accounts reached, Interactions, Accounts engaged, Total followers, and individual content performance. (Facebook)',
    [{ href: IG_INSIGHTS, label: 'Facebook', external: true }],
  ),
  bullets('ul-ins-metrics', [
    'Views,',
    'Accounts reached,',
    'Interactions,',
    'Accounts engaged,',
    'Total followers,',
    'and individual content performance.',
  ]),
  paragraph(
    'p-ins-4',
    'Reel-specific Insights can also include metrics such as views, watch time, accounts reached, likes, comments, saves, shares, and follows. (Facebook)',
    [{ href: IG_REEL_INSIGHTS, label: 'Facebook', external: true }],
  ),
  bullets('ul-ins-reels', [
    'views,',
    'watch time,',
    'accounts reached,',
    'likes,',
    'comments,',
    'saves,',
    'shares,',
    'and follows.',
  ]),
  paragraph(
    'p-ins-6',
    "That makes Instagram's own analytics the better place to investigate performance patterns.",
  ),

  heading(
    'h-close',
    'Followers, Likes, Views and Comments Tell Different Stories',
    2,
  ),
  paragraph(
    'p-close-1',
    'Instagram performance makes more sense once you stop expecting one number to explain everything.',
  ),
  paragraph(
    'p-close-2',
    'Followers describe the audience connected to your profile.',
  ),
  paragraph(
    'p-close-3',
    'Views describe how often content was played or displayed.',
  ),
  paragraph(
    'p-close-4',
    'Likes represent one form of interaction.',
  ),
  paragraph(
    'p-close-5',
    'Comments represent written interaction and discussion.',
  ),
  paragraph(
    'p-close-6',
    'Each metric answers a different question.',
  ),
  paragraph(
    'p-close-7',
    'The useful approach is not to choose one metric and ignore the rest.',
  ),
  paragraph('p-close-8', 'It is to determine:'),
  bullets('ul-close', [
    'what you are trying to achieve,',
    'which metric relates most closely to that objective,',
    'and how the other metrics add context.',
  ]),
  paragraph(
    'p-close-9',
    'That gives you a more realistic understanding of what your Instagram content is actually doing.',
  ),
  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Followers are primarily a profile-level audience metric.',
    'Views measure content plays/displays and can include repeated views.',
    'Likes and comments are separate types of interactions.',
    'Accounts reached and views are not the same metric.',
    'A Reel can generate views without generating the same number of likes, comments or followers.',
    'Read Instagram metrics together rather than expecting one number to represent overall performance.',
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

export const INSTAGRAM_FOLLOWERS_VS_LIKES_VS_VIEWS_VS_COMMENTS_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-instagram-followers-vs-likes-vs-views-vs-comments',
    slug: SLUG,
    title:
      'Instagram Followers vs Likes vs Views vs Comments: What Each Metric Means',
    excerpt:
      'Open an Instagram profile or Reel and several different numbers can appear important at the same time.',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'instagram',
    tags: ['followers', 'likes', 'views', 'comments', 'analytics', 'creator'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Illustration comparing Instagram followers, likes, views and comments as four distinct metrics',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: SCHEDULED_AT,
    updatedAt: SCHEDULED_AT,
    showModifiedDate: false,
    seo: {
      title: 'Instagram Followers vs Likes vs Views vs Comments',
      description:
        'Learn what Instagram followers, likes, views and comments measure, how they differ, and how to read these metrics together.',
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'Instagram followers vs likes vs views',
        'Instagram followers vs likes',
        'Instagram likes vs views',
        'Instagram comments meaning',
        'Instagram metrics explained',
        'Instagram views meaning',
      ],
    },
    relatedServices: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ],
    relatedArticles: [
      'how-instagram-algorithm-works',
      'why-instagram-followers-drop',
      'how-instagram-reels-views-are-counted',
      'public-vs-private-instagram-account',
      'how-to-grow-instagram-followers-organically',
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
      'Followers = account audience',
      'Views = content viewing activity',
      'Likes = one form of content interaction',
      'Comments = written interaction and conversation',
    ],
    faqs: [
      {
        id: 'faq-1',
        question: "What's the difference between Instagram followers and likes?",
        answer:
          'Followers are accounts that follow your profile. Likes are interactions with individual pieces of content. Instagram tracks follower trends and content interactions separately in Insights.',
        schemaEligible: true,
      },
      {
        id: 'faq-2',
        question: "What's the difference between Instagram views and likes?",
        answer:
          'Views relate to how often content is played or displayed, while likes are one type of interaction someone can make with that content.',
        schemaEligible: true,
      },
      {
        id: 'faq-3',
        question:
          'Can an Instagram Reel have more views than the account has followers?',
        answer:
          "Yes. Content can be viewed by people beyond an account's existing followers, and Instagram provides creator insights for understanding viewers who do not already follow the account.",
        schemaEligible: true,
      },
      {
        id: 'faq-4',
        question: 'Are Instagram views unique people?',
        answer:
          'Not necessarily. Instagram distinguishes Views from Accounts reached. Views can include multiple views, while Accounts reached measures unique accounts that saw the content at least once.',
        schemaEligible: true,
      },
      {
        id: 'faq-5',
        question: 'Do Instagram comments count as interactions?',
        answer:
          'Yes. Instagram lists comments alongside actions such as likes, saves and shares within its interaction metrics.',
        schemaEligible: true,
      },
      {
        id: 'faq-6',
        question: 'Can Instagram show which Reels gained followers?',
        answer:
          'For professional accounts using Reel Insights, Instagram can show Follows, meaning accounts that started following as a result of viewing the Reel.',
        schemaEligible: true,
      },
    ],
  };
