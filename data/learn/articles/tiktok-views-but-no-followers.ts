/**
 * Article #2 — Why Do TikTok Videos Get Views but No Followers?
 * Scheduled: Wednesday 26 August 2026.
 * Informational intent. Supports existing TikTok commercial pages; does not compete with them.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'tiktok-views-but-no-followers';
const SCHEDULED_AT = '2026-08-26T08:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';
const TIKTOK_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';
const TIKTOK_NOT_RECOMMENDED =
  'https://support.tiktok.com/en/safety-hc/account-and-user-safety/why-is-my-account-not-being-recommended';
const TIKTOK_POST_VIEWS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/my-videos-arent-getting-views';
const TIKTOK_SEARCH_INSIGHTS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TIKTOK_FOR_YOU =
  'https://support.tiktok.com/en/getting-started/for-you';

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
    'Getting views on TikTok but hardly any new followers can feel confusing.',
  ),
  paragraph(
    'p-open-2',
    'A video may reach hundreds, thousands or even more viewers while your follower count barely changes. That does not necessarily mean something is wrong with your account.',
  ),
  paragraph(
    'p-open-3',
    'Views and follows represent two different actions. The same is true of TikTok followers, likes and views more generally: they describe different actions, not one interchangeable result.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
    ],
  ),
  paragraph(
    'p-open-4',
    'A view means someone encountered and watched your content. Following requires an additional decision: the viewer has to believe that seeing more content from your account will be worthwhile.',
  ),
  paragraph(
    'p-open-5',
    "TikTok's For You feed is personalized around each viewer's interests and interactions, meaning your content can be recommended to people who do not already follow you. (TikTok Support)",
    [
      { href: TIKTOK_RECOMMENDS, label: 'For You feed', external: true },
      { href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true },
    ],
  ),
  paragraph(
    'p-open-6',
    'That discovery system is one reason TikTok videos can receive significantly more views than the number of followers an account gains from them.',
  ),
  paragraph(
    'p-open-7',
    "So if you're getting TikTok views but no followers, the useful question isn't simply:",
    [{ href: '/buy-tiktok-views', label: 'TikTok views' }],
  ),
  paragraph(
    'p-open-8',
    "“Why didn't these views turn into followers?”",
  ),
  paragraph('p-open-9', 'It is:'),
  paragraph(
    'p-open-10',
    '“What did viewers see after discovering my video that would make them want to come back?”',
  ),

  heading(
    'h-reach',
    "1. Your Video Can Reach People Who Don't Follow You",
    2,
  ),
  paragraph(
    'p-reach-1',
    "One of TikTok's most important characteristics is content discovery.",
  ),
  paragraph(
    'p-reach-2',
    'The For You feed is specifically built to recommend content based on individual interests and engagement rather than showing people only posts from accounts they already follow. TikTok says its recommendation systems use signals including user interactions, content information and user information to determine what may be relevant to each viewer. (TikTok Support)',
    [
      { href: TIKTOK_FOR_YOU, label: 'For You feed', external: true },
      { href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true },
    ],
  ),
  paragraph('p-reach-3', 'That means a viewer may:'),
  bullets('ul-reach', [
    'see your video,',
    'watch it,',
    'enjoy it,',
    'and then continue scrolling.',
  ]),
  paragraph(
    'p-reach-4',
    'They do not need to visit your profile or follow you.',
  ),
  paragraph(
    'p-reach-5',
    'This is fundamentally different from assuming that every person who watches a TikTok has entered some kind of follower funnel.',
  ),
  paragraph('p-reach-6', "They haven't."),
  paragraph(
    'p-reach-7',
    'They may simply have encountered one useful or entertaining piece of content.',
  ),
  heading('h-reach-means', 'What this means', 3),
  paragraph(
    'p-reach-8',
    'A high view count can tell you that a video received visibility.',
  ),
  paragraph(
    'p-reach-9',
    'It does not tell you how many viewers:',
  ),
  bullets('ul-reach-metrics', [
    'visited your profile,',
    'watched another video,',
    'liked the content,',
    'followed the account,',
    'or became a returning viewer.',
  ]),
  paragraph(
    'p-reach-10',
    'This is why views should be evaluated separately from follower growth.',
  ),

  heading(
    'h-useful',
    '2. The Video May Be Useful Without Creating a Reason to Follow',
    2,
  ),
  paragraph('p-useful-1', 'Imagine someone searches TikTok for:'),
  paragraph('p-useful-2', 'How to clean white sneakers'),
  paragraph('p-useful-3', 'They find your video.'),
  paragraph('p-useful-4', 'It gives them exactly the answer they needed.'),
  paragraph('p-useful-5', 'They watch it.'),
  paragraph('p-useful-6', 'Problem solved.'),
  paragraph('p-useful-7', 'Then they leave.'),
  paragraph(
    'p-useful-8',
    'That viewer may have been completely satisfied with the video without ever wanting another piece of content from your account.',
  ),
  paragraph('p-useful-9', 'This happens with:'),
  bullets('ul-useful', [
    'quick tutorials,',
    'one-off answers,',
    'trend videos,',
    'single product demonstrations,',
    'news-related clips,',
    'specific troubleshooting videos,',
    'and highly searchable informational content.',
  ]),
  paragraph(
    'p-useful-10',
    'The content can perform its immediate job while generating relatively few followers.',
  ),
  paragraph(
    'p-useful-11',
    "That isn't automatically poor performance.",
  ),
  heading('h-useful-q', 'The important question', 3),
  paragraph('p-useful-12', 'Ask:'),
  paragraph(
    'p-useful-13',
    'If someone liked this specific video, is it obvious what they would receive by following my account?',
  ),
  paragraph(
    'p-useful-14',
    'If the answer is unclear, the problem may not be the video.',
  ),
  paragraph(
    'p-useful-15',
    'The problem may be the connection between the video and the rest of your content.',
  ),

  heading(
    'h-profile',
    '3. Your TikTok Profile May Not Give Viewers a Clear Reason to Follow',
    2,
  ),
  paragraph(
    'p-profile-1',
    'Getting someone to your profile is only half the job.',
  ),
  paragraph(
    'p-profile-2',
    'Once they arrive, they may quickly examine:',
  ),
  bullets('ul-profile-scan', [
    'your profile photo,',
    'username,',
    'bio,',
    'recent posts,',
    'pinned videos,',
    'and the general pattern of your content.',
  ]),
  paragraph('p-profile-3', 'They are effectively deciding:'),
  paragraph('p-profile-4', '“Do I want more of this?”'),
  paragraph(
    'p-profile-5',
    "If the answer isn't immediately obvious, they may leave.",
  ),
  paragraph('p-profile-6', 'Consider two profiles.'),
  heading('h-profile-a', 'Profile A', 3),
  paragraph('p-profile-7', 'Recent posts include:'),
  bullets('ul-profile-a', [
    'a restaurant review,',
    'a gaming clip,',
    'a motivational quote,',
    'a random meme,',
    'and a phone tutorial.',
  ]),
  heading('h-profile-b', 'Profile B', 3),
  paragraph('p-profile-8', 'Recent posts consistently teach:'),
  bullets('ul-profile-b', ['simple smartphone photography tips.']),
  paragraph(
    'p-profile-9',
    'Someone discovering Profile B through a photography video can more easily understand what following the account means.',
  ),
  paragraph(
    'p-profile-10',
    'This does not mean every account needs an extremely narrow niche.',
  ),
  paragraph(
    'p-profile-11',
    'It means that your profile should give visitors enough context to understand what they can expect.',
  ),

  heading(
    'h-mismatch',
    "4. One Video Worked, but the Rest of the Profile Doesn't Match It",
    2,
  ),
  paragraph(
    'p-mismatch-1',
    'This is slightly different from having an unclear profile.',
  ),
  paragraph(
    'p-mismatch-2',
    "Sometimes one particular TikTok reaches an audience that is very different from the account's usual content.",
  ),
  paragraph('p-mismatch-3', 'Imagine an account normally posts:'),
  bullets('ul-mismatch-usual', [
    'fitness routines,',
    'meal preparation,',
    'and gym advice.',
  ]),
  paragraph(
    'p-mismatch-4',
    'Then one humorous video about a broken treadmill unexpectedly gets a large number of views.',
  ),
  paragraph('p-mismatch-5', 'People may enjoy that clip.'),
  paragraph(
    'p-mismatch-6',
    "But when they visit the profile, they discover that the rest of the account isn't primarily comedy.",
  ),
  paragraph('p-mismatch-7', 'Many will simply move on.'),
  paragraph(
    'p-mismatch-8',
    'The views were real viewing activity.',
  ),
  paragraph(
    'p-mismatch-9',
    "The audience just wasn't necessarily interested in the creator's usual topic.",
  ),
  heading('h-mismatch-beyond', 'Look beyond the viral post', 3),
  paragraph(
    'p-mismatch-10',
    'When a video receives much more attention than normal, compare:',
  ),
  bullets('ul-mismatch-compare', [
    "the video's topic,",
    'its format,',
    'the viewers it likely appeals to,',
    'and your normal content.',
  ]),
  paragraph(
    'p-mismatch-11',
    'A spike in visibility can be useful without automatically representing ideal follower growth.',
  ),
  figure(
    'fig-views-profile-follow',
    `${IMAGE_DIR}/views-profile-follow.png`,
    'Diagram showing that a TikTok video view, a profile visit and a follow are three separate actions',
    'A view does not automatically become a profile visit, and a profile visit does not automatically become a follow.',
  ),

  heading(
    'h-future',
    '5. Your Content May Not Create an Expectation of Future Value',
    2,
  ),
  paragraph(
    'p-future-1',
    'People usually follow accounts because they expect something useful, entertaining or interesting in the future.',
  ),
  paragraph('p-future-2', 'Think about the difference between:'),
  paragraph('p-future-3', '“That was a good video.”'),
  paragraph('p-future-4', 'and:'),
  paragraph(
    'p-future-5',
    '“I want to see what this creator posts next.”',
  ),
  paragraph('p-future-6', 'Those are not the same reaction.'),
  paragraph(
    'p-future-7',
    'A single good video can earn the first.',
  ),
  paragraph(
    'p-future-8',
    'A recognizable content direction is more likely to encourage the second.',
  ),
  paragraph(
    'p-future-9',
    'For example, instead of publishing isolated tips, a creator might develop recognizable themes such as:',
  ),
  bullets('ul-future-themes', [
    '“30-second Photoshop fixes”',
    '“Things new restaurant owners should know”',
    '“Budget travel mistakes”',
    '“Daily beginner fitness tips”',
    '“Common SEO mistakes”',
  ]),
  paragraph(
    'p-future-10',
    "The objective isn't to manufacture a formula.",
  ),
  paragraph(
    'p-future-11',
    'It is to help viewers understand that the account offers continued value, not just one isolated video.',
  ),

  heading(
    'h-hook',
    '6. Your Opening Hook May Generate Views Without Attracting the Right Audience',
    2,
  ),
  paragraph(
    'p-hook-1',
    'Strong openings help get attention.',
  ),
  paragraph(
    'p-hook-2',
    "But attention alone doesn't tell you whether the viewer is a good fit for the account.",
  ),
  paragraph(
    'p-hook-3',
    "A very broad hook might attract people who are curious about one surprising statement without having much interest in the creator's regular subject.",
  ),
  paragraph('p-hook-4', 'For example:'),
  paragraph(
    'p-hook-5',
    '“You won\'t believe what happened next…”',
  ),
  paragraph('p-hook-6', 'may produce curiosity.'),
  paragraph('p-hook-7', 'But compare it with:'),
  paragraph(
    'p-hook-8',
    '“Three mistakes new photographers make when shooting indoors…”',
  ),
  paragraph(
    'p-hook-9',
    'The second introduction immediately identifies who the video is for.',
  ),
  paragraph(
    'p-hook-10',
    'Neither format is automatically superior.',
  ),
  paragraph(
    'p-hook-11',
    'They simply attract viewers for different reasons.',
  ),
  paragraph(
    'p-hook-12',
    'If follower growth matters to you, consider whether your content attracts the type of viewer who is likely to care about your next post too.',
  ),

  heading(
    'h-continuity',
    '7. Your Account May Lack Content Continuity',
    2,
  ),
  paragraph(
    'p-cont-1',
    'One effective video can generate attention.',
  ),
  paragraph(
    'p-cont-2',
    'A recognizable series can give people a reason to return.',
  ),
  paragraph(
    'p-cont-3',
    'Content continuity can be as simple as:',
  ),
  bullets('ul-cont', [
    'Part 1 / Part 2,',
    'weekly comparisons,',
    'beginner series,',
    'myth vs fact,',
    'before and after,',
    'common mistakes,',
    'questions from comments,',
    'or repeated content formats around one subject.',
  ]),
  paragraph('p-cont-4', 'For example:'),
  paragraph('p-cont-5', 'TikTok SEO Mistake #1'),
  paragraph('p-cont-6', 'followed later by:'),
  paragraph('p-cont-7', 'TikTok SEO Mistake #2'),
  paragraph(
    'p-cont-8',
    'creates a clearer expectation than unrelated standalone posts.',
  ),
  paragraph(
    'p-cont-9',
    "You don't need to turn every video into a numbered series.",
  ),
  paragraph(
    'p-cont-10',
    'The larger idea is consistency of value.',
  ),
  paragraph(
    'p-cont-11',
    'Someone arriving on your profile should be able to see several posts they might reasonably want to watch next.',
  ),

  heading(
    'h-metric',
    '8. You May Be Looking at the Wrong Metric in Isolation',
    2,
  ),
  paragraph(
    'p-metric-1',
    'It is easy to see 20,000 views and immediately ask why you didn\'t gain hundreds of followers.',
  ),
  paragraph(
    'p-metric-2',
    "But the view total alone doesn't provide enough information.",
  ),
  paragraph(
    'p-metric-3',
    'TikTok followers and TikTok views answer different questions about that objective.',
    [{ href: '/buy-tiktok-followers', label: 'TikTok followers' }],
  ),
  paragraph('p-metric-4', 'Consider:'),
  heading('h-video-a', 'Video A', 3),
  bullets('ul-video-a', [
    '20,000 views',
    'few profile visits',
    'few followers gained',
  ]),
  heading('h-video-b', 'Video B', 3),
  bullets('ul-video-b', [
    '5,000 views',
    'more profile interest',
    'more followers gained',
  ]),
  paragraph(
    'p-metric-5',
    'Video A had greater visibility.',
  ),
  paragraph(
    'p-metric-6',
    'Video B may have created stronger interest in the creator.',
  ),
  paragraph(
    'p-metric-7',
    'Which performed better depends on the objective.',
  ),
  paragraph(
    'p-metric-8',
    'TikTok provides creators with analytics and TikTok Studio specifically to review content and account performance rather than relying on a single visible number. TikTok also recommends reviewing analytics and top-performing posts when working on audience growth. (TikTok Support)',
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  {
    id: 'cta-tiktok-metrics',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare TikTok Growth Options',
    text: 'Followers, likes and views represent different parts of a TikTok presence. Compare the available NovaLikes options for the metric you want to focus on.',
    serviceSlugs: [
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
    ],
  },

  heading(
    'h-limits',
    '9. Your Content or Account May Have Recommendation Limitations',
    2,
  ),
  paragraph(
    'p-limits-1',
    'If views suddenly become unusually low across multiple posts, there can be a different issue.',
  ),
  paragraph(
    'p-limits-2',
    'TikTok has systems determining whether content is eligible for recommendation. TikTok says that if an account becomes ineligible for recommendation, it can notify the account and provide information about flagged content. (TikTok Support)',
    [
      {
        href: TIKTOK_NOT_RECOMMENDED,
        label: 'TikTok Support',
        external: true,
      },
    ],
  ),
  paragraph(
    'p-limits-3',
    'This is different from simply having a video that gets views but few followers.',
  ),
  paragraph(
    'p-limits-4',
    'Do not automatically assume every unusual performance pattern is a “shadowban.”',
  ),
  paragraph('p-limits-5', 'Instead, check:'),
  bullets('ul-limits', [
    'TikTok notifications,',
    'account status where available,',
    'analytics,',
    'recent content,',
    'and whether the change affects one post or the account more broadly.',
  ]),
  paragraph(
    'p-limits-6',
    'TikTok itself notes that post views can fluctuate and directs creators toward analytics to understand changes in content performance. (TikTok Support)',
    [{ href: TIKTOK_POST_VIEWS, label: 'TikTok Support', external: true }],
  ),

  heading(
    'h-turn',
    'How to Turn More TikTok Viewers Into Potential Followers',
    2,
  ),
  paragraph(
    'p-turn-1',
    'There is no guaranteed view-to-follower formula.',
  ),
  paragraph(
    'p-turn-2',
    'But you can make the decision to follow easier to understand.',
  ),
  heading('h-turn-purpose', '1. Make Your Account Purpose Clear', 3),
  paragraph(
    'p-turn-3',
    'Someone visiting your profile should quickly understand what type of content you create.',
  ),
  paragraph('p-turn-4', 'Ask yourself:'),
  paragraph(
    'p-turn-5',
    'What would I tell someone they will get by following this account?',
  ),
  paragraph(
    'p-turn-6',
    'If answering that takes a paragraph, the profile may need more clarity.',
  ),
  heading(
    'h-turn-visitor',
    '2. Review Your Recent Posts as a New Visitor',
    3,
  ),
  paragraph(
    'p-turn-7',
    "Don't look at your profile as its owner.",
  ),
  paragraph(
    'p-turn-8',
    'Imagine you discovered one video five seconds ago.',
  ),
  paragraph('p-turn-9', 'Now inspect the next six to nine posts.'),
  paragraph(
    'p-turn-10',
    'Do they feel related enough that you might want to watch another?',
  ),
  paragraph(
    'p-turn-11',
    "If not, that disconnect may explain why viewers don't continue deeper into the profile.",
  ),
  heading('h-turn-followup', '3. Create Natural Follow-Up Content', 3),
  paragraph(
    'p-turn-12',
    "If one topic performs well, you don't necessarily need to abandon everything and copy the same video.",
  ),
  paragraph(
    'p-turn-13',
    'But there may be unanswered questions around that subject.',
  ),
  paragraph('p-turn-14', 'Look at:'),
  bullets('ul-turn-followup', [
    'comments,',
    'common questions,',
    'related searches,',
    'follow-up examples,',
    'mistakes,',
    'comparisons,',
    'and deeper explanations.',
  ]),
  paragraph(
    'p-turn-15',
    "TikTok's Creator Search Insights can show commonly searched topics and content gaps, which can help creators identify subjects people are actively looking for. (TikTok Support)",
    [
      {
        href: TIKTOK_SEARCH_INSIGHTS,
        label: 'Creator Search Insights',
        external: true,
      },
      { href: TIKTOK_SEARCH_INSIGHTS, label: 'TikTok Support', external: true },
    ],
  ),
  paragraph(
    'p-turn-16',
    'If you need a closer look at a public post while planning that follow-up, the TikTok Video Downloader is available as a free NovaLikes tool.',
    [
      {
        href: '/tools/tiktok-video-downloader',
        label: 'TikTok Video Downloader',
      },
    ],
  ),
  figure(
    'fig-would-you-follow',
    `${IMAGE_DIR}/would-you-follow.png`,
    'Checklist showing a clear topic, recognizable profile, related posts, useful bio and a reason to return',
    'A view introduces the content. Your profile explains why someone might stay.',
  ),
  heading('h-turn-patterns', '4. Look for Repeatable Patterns', 3),
  paragraph(
    'p-turn-17',
    'TikTok recommends using creator analytics to understand top-performing content and audience activity. (TikTok Support)',
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-turn-18',
    'Instead of studying only your biggest video, compare multiple posts.',
  ),
  paragraph('p-turn-19', 'Ask:'),
  bullets('ul-turn-ask', [
    'Which topics receive more views?',
    'Which lead people to explore the profile?',
    'Which formats receive stronger interactions?',
    'Which topics continue performing across several posts?',
    'Which videos attract the type of audience you actually want?',
  ]),
  paragraph(
    'p-turn-20',
    'A single viral-looking result can be interesting.',
  ),
  paragraph(
    'p-turn-21',
    'Repeatable patterns are usually more useful for planning future content.',
  ),
  heading(
    'h-turn-explore',
    '5. Give Viewers a Natural Reason to Explore More',
    3,
  ),
  paragraph('p-turn-22', 'Not every video needs:'),
  paragraph('p-turn-23', 'FOLLOW ME NOW!'),
  paragraph(
    'p-turn-24',
    'Aggressive calls to action can feel unnecessary.',
  ),
  paragraph(
    'p-turn-25',
    'Sometimes the content itself can create the next step.',
  ),
  paragraph('p-turn-26', 'For example:'),
  bullets('ul-turn-cta', [
    "“Tomorrow I'll compare the other method.”",
    '“I tested this again with a different example.”',
    '“The full explanation is in the previous video.”',
    "“I've covered the beginner version on my profile.”",
  ]),
  paragraph(
    'p-turn-27',
    'This encourages further exploration without making the entire video feel like an advertisement for the profile.',
  ),

  heading(
    'h-supposed',
    'Are More TikTok Views Supposed to Mean More Followers?',
    2,
  ),
  paragraph(
    'p-supposed-1',
    'No fixed relationship should be assumed.',
  ),
  paragraph(
    'p-supposed-2',
    'Views measure viewing activity.',
  ),
  paragraph(
    'p-supposed-3',
    'Followers represent people who have made an additional decision to follow the account.',
  ),
  paragraph(
    'p-supposed-4',
    'A person can watch several videos without following.',
  ),
  paragraph(
    'p-supposed-5',
    'Another person might discover one video, visit the profile and immediately follow.',
  ),
  paragraph('p-supposed-6', 'Both behaviours are possible.'),
  paragraph(
    'p-supposed-7',
    'This is why comparing raw follower gains between videos without considering their audience, subject and purpose can be misleading.',
  ),

  heading(
    'h-rate',
    'What Is a Good View-to-Follower Conversion Rate on TikTok?',
    2,
  ),
  paragraph(
    'p-rate-1',
    'There is no universal percentage that every TikTok account should achieve.',
  ),
  paragraph(
    'p-rate-2',
    'Be careful with articles or social posts claiming that every creator should turn a specific percentage of views into followers.',
  ),
  paragraph(
    'p-rate-3',
    'Different videos serve different purposes.',
  ),
  paragraph(
    'p-rate-4',
    'A searchable tutorial may attract one-time viewers.',
  ),
  paragraph(
    'p-rate-5',
    'A personality-led series may create more recurring interest.',
  ),
  paragraph(
    'p-rate-6',
    'A trending video may reach a broad audience.',
  ),
  paragraph(
    'p-rate-7',
    'A niche educational post may reach fewer viewers but align more closely with the rest of the account.',
  ),
  paragraph(
    'p-rate-8',
    'Instead of chasing an arbitrary benchmark, establish your own baseline across multiple posts and compare future content against it.',
  ),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnosing-views-without-followers.png`,
    'Four scenarios for diagnosing TikTok views without followers, based on profile interest and follower growth rather than fake percentages',
    'Use patterns across multiple posts rather than judging one number alone.',
  ),

  heading(
    'h-delete',
    'Should You Delete Videos That Get Views but No Followers?',
    2,
  ),
  paragraph(
    'p-delete-1',
    'Usually, follower conversion alone is not enough information to decide whether a post should be removed.',
  ),
  paragraph('p-delete-2', 'A video may still:'),
  bullets('ul-delete', [
    'answer a useful question,',
    'bring discovery,',
    'attract profile visits,',
    'generate comments,',
    'help you identify an interesting topic,',
    'or provide information to viewers.',
  ]),
  paragraph(
    'p-delete-3',
    'Evaluate the post based on what it was intended to accomplish.',
  ),
  paragraph(
    'p-delete-4',
    "Deleting content simply because it didn't produce followers can remove useful information without addressing the actual issue.",
  ),

  heading(
    'h-post-more',
    'Should You Post More When Views Are Coming In?',
    2,
  ),
  paragraph(
    'p-post-1',
    'Posting more content just for the sake of volume is not necessarily the solution.',
  ),
  paragraph(
    'p-post-2',
    'A better approach is to understand why people are watching.',
  ),
  paragraph(
    'p-post-3',
    "TikTok's own audience-growth guidance recommends engaging with viewers, reviewing analytics and publishing high-quality content regularly. (TikTok Support)",
    [{ href: TIKTOK_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-post-4',
    'If one subject appears to attract relevant viewers, consider creating useful follow-up content around it.',
  ),
  paragraph(
    'p-post-5',
    'The goal is not to flood the account.',
  ),
  paragraph(
    'p-post-6',
    'The goal is to learn from the signal the successful content gave you.',
  ),

  heading(
    'h-close',
    'Views Are Discovery. Following Is a Separate Decision.',
    2,
  ),
  paragraph(
    'p-close-1',
    'Getting TikTok views without many followers is not automatically a problem.',
  ),
  paragraph(
    'p-close-2',
    'The two metrics measure different behaviour.',
  ),
  paragraph(
    'p-close-3',
    'TikTok can recommend your videos to people beyond your existing audience. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-close-4', 'Those viewers may:'),
  bullets('ul-close', [
    'watch one video and leave,',
    'visit your profile,',
    'watch several posts,',
    'or decide to follow.',
  ]),
  paragraph(
    'p-close-5',
    'Your job is not to force every viewer into becoming a follower.',
  ),
  paragraph(
    'p-close-6',
    'It is to make it easy for the right viewer to understand:',
  ),
  bullets('ul-close-why', [
    'who you are,',
    'what you publish,',
    'and why coming back could be worthwhile.',
  ]),
  paragraph(
    'p-close-7',
    'When views are increasing but followers remain flat, examine the full path:',
  ),
  paragraph(
    'p-close-8',
    'Discovery → Video → Profile → More Content → Follow',
  ),
  paragraph(
    'p-close-9',
    'That usually tells you much more than the view number by itself.',
  ),
  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Views and followers are different metrics.',
    'TikTok videos can reach people who do not follow the account.',
    'A useful video may satisfy someone without giving them a reason to follow.',
    'Profile clarity and consistent content can make it easier for visitors to understand what the account offers.',
    "One unusually successful video may attract an audience that doesn't match the rest of the profile.",
    'Use TikTok analytics to compare patterns across several posts rather than relying on one visible number.',
  ]),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list') return block.items.join(' ');
  if (block.type === 'blockquote') return block.text;
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const TIKTOK_VIEWS_BUT_NO_FOLLOWERS_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-tiktok-views-but-no-followers',
  slug: SLUG,
  title: 'Why Do TikTok Videos Get Views but No Followers?',
  excerpt:
    'Getting views on TikTok but hardly any new followers can feel confusing.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'views', 'analytics', 'creator', 'algorithm'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Illustration of TikTok video discovery and views on one side, with a profile follow decision on the other',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
  seo: {
    title: 'TikTok Views but No Followers? 9 Common Reasons',
    description:
      'Getting TikTok views but few new followers? Learn why this happens and what to improve in your content, profile and audience strategy.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'TikTok views but no followers',
      'TikTok views but not followers',
      'why am I getting views but no followers on TikTok',
      'TikTok views not converting to followers',
      'how to get followers from TikTok views',
    ],
  },
  relatedServices: [
    'buy-tiktok-followers',
    'buy-tiktok-likes',
    'buy-tiktok-views',
  ],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-seo',
    'public-vs-private-tiktok-account',
    'how-to-get-1000-tiktok-followers',
    'why-tiktok-followers-drop',
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
    'Views = people discovering or watching your content',
    'Followers = people choosing to stay connected to your account',
    'A successful video does not automatically produce followers.',
    'The goal is to give the right viewers a clear reason to want more.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why am I getting TikTok views but no followers?',
      answer:
        "Because viewing and following are separate actions. TikTok can recommend your content to people who don't follow you, and a viewer can enjoy a post without deciding they want ongoing content from the account.",
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can TikTok videos get views from non-followers?',
      answer:
        "Yes. TikTok's For You feed is designed around personalized content discovery, so content can be recommended outside an account's existing followers.",
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Does getting more TikTok views guarantee more followers?',
      answer:
        'No. More viewing activity does not guarantee a proportional increase in followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Should I ask people to follow in every TikTok?',
      answer:
        'Not necessarily. A clear content direction and a reason to return can often be more useful than repeating an aggressive follow request in every post.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Why did one of my TikToks go viral but my followers barely changed?',
      answer:
        "One possible explanation is that the individual video's audience or subject did not closely match the account's normal content. High visibility and follower growth should be evaluated separately.",
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'How can I understand which TikTok videos bring better followers?',
      answer:
        'Use TikTok Studio and creator analytics to compare content performance and follower-related trends across multiple posts rather than relying only on public view totals.',
      schemaEligible: true,
    },
  ],
};
