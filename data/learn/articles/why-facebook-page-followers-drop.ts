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
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const FB_FOLLOWER_INSIGHTS =
  'https://www.facebook.com/help/810929305732263';
const FB_UNFOLLOW =
  'https://www.facebook.com/help/190078864497547';
const FB_FOLLOW_PAGE =
  'https://www.facebook.com/help/171378103323792';
const FB_SEE_WHO_FOLLOWS =
  'https://www.facebook.com/help/843537565758741';
const META_FAKE_ACCOUNTS =
  'https://transparency.meta.com/reports/community-standards-enforcement/fake-accounts/';
const META_INAUTHENTIC_BEHAVIOR =
  'https://transparency.meta.com/policies/community-standards/inauthentic-behavior/';
const FB_PAGE_INSIGHTS =
  'https://www.facebook.com/help/268680253165747';
const FB_WHO_CAN_LIKE_COMMENT =
  'https://www.facebook.com/help/167598583302066';
const FB_LIKES_TO_FOLLOWERS =
  'https://www.facebook.com/business/help/3201129440060523';
const FB_PAGE_LIMITS =
  'https://www.facebook.com/help/348805468517220';
const FB_FREE_LIKES_WARNING =
  'https://www.facebook.com/help/524275404355719';
const FB_RECONNECT =
  'https://www.facebook.com/help/146865632052048';

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
    'A Facebook Page follower count is not a permanent number.',
  ),
  paragraph('p-open-2', 'People can follow your Page.'),
  paragraph('p-open-3', 'People can unfollow it.'),
  paragraph(
    'p-open-4',
    'Facebook can change how Page audience connections are represented.',
  ),
  paragraph(
    'p-open-5',
    'Accounts involved in fake or inauthentic activity can also be removed from Facebook.',
  ),
  paragraph(
    'p-open-6',
    'And Facebook has been making a larger structural change from Page Likes toward Page Follows, which can make older audience numbers difficult to compare directly with current ones. (Facebook)',
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-open-7',
    'So if your Facebook Page suddenly shows fewer followers than expected, do not immediately conclude that Facebook has penalized your Page.',
  ),
  paragraph(
    'p-open-8',
    'A changing follower count does not, by itself, tell you why the change occurred.',
  ),
  paragraph('p-open-9', 'You need to look at:'),
  bullets('ul-open-look', [
    'the size of the change,',
    'when it happened,',
    'whether it was gradual or sudden,',
    'your Page Insights,',
    'recent content,',
    'and whether you are comparing old Page Like data with current follower data.',
  ]),
  paragraph(
    'p-open-10',
    'The important distinction is that the follower number tells you what changed.',
  ),
  paragraph(
    'p-open-11',
    'It does not explain the cause by itself.',
  ),
  paragraph(
    'p-open-12',
    'Facebook now directs Page managers toward Follower Insights inside Professional Dashboard rather than Page Like Insights. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),

  heading(
    'h-unfollow',
    '1. People Can Simply Unfollow Your Facebook Page',
    2,
  ),
  paragraph(
    'p-uf-1',
    'The most basic explanation is also one of the most common.',
  ),
  paragraph(
    'p-uf-2',
    'Facebook gives users an explicit Unfollow option for Pages.',
  ),
  paragraph(
    'p-uf-3',
    "Meta's current Help Center says users can go to a Page, select Following and choose Unfollow. (Facebook)",
    [{ href: FB_UNFOLLOW, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-uf-4',
    "Following a Page means the user may see updates from that Page in Feed. Unfollowing means they stop following that Page's updates. (Facebook)",
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph('p-uf-5', 'People can unfollow because:'),
  bullets('ul-uf', [
    'their interests changed,',
    'they no longer need the business,',
    'the Page changed topics,',
    'they followed after one particular post,',
    'the content became less relevant,',
    'or they are simply cleaning up their Facebook Feed.',
  ]),
  paragraph(
    'p-uf-6',
    'None of those situations requires a technical problem, an account penalty or a Facebook bug.',
  ),
  paragraph('p-uf-7', 'Audience movement is normal.'),
  figure(
    'fig-change',
    `${IMAGE_DIR}/why-followers-change.png`,
    'Why Facebook Page followers change: audience decisions, platform metric changes and account cleanup',
    'A changing follower total can have more than one cause.',
  ),

  heading(
    'h-match',
    '2. Your Audience May No Longer Match Your Content',
    2,
  ),
  paragraph(
    'p-ma-1',
    'Imagine someone follows a Facebook Page because it regularly publishes local property advice, new listings, home-buying guidance and area updates.',
  ),
  paragraph(
    'p-ma-2',
    'Six months later the Page mainly publishes generic motivational quotes, unrelated memes, office birthday pictures and promotional posts.',
  ),
  paragraph(
    'p-ma-3',
    'Some followers may decide this is not why they followed.',
  ),
  paragraph('p-ma-4', 'Then they unfollow.'),
  paragraph(
    'p-ma-5',
    'That does not mean the content is objectively bad.',
  ),
  paragraph(
    'p-ma-6',
    'It can simply mean the content no longer matches the audience expectation that created the follow.',
  ),
  paragraph(
    'p-ma-7',
    'This is particularly important after a Page changes industry focus, location, language, brand positioning, product range or target customer.',
  ),
  paragraph(
    'p-ma-8',
    'A content change can naturally create audience turnover.',
  ),

  heading(
    'h-viral',
    '3. One Viral Post Can Attract Temporary Followers',
    2,
  ),
  paragraph(
    'p-vi-1',
    'Suppose a local construction Page publishes an unrelated funny Reel.',
  ),
  paragraph(
    'p-vi-2',
    'The Reel gets far more visibility than the Page normally receives.',
  ),
  paragraph('p-vi-3', 'Some viewers follow.'),
  paragraph(
    'p-vi-4',
    'Then the Page goes back to building projects, renovation advice and local construction content.',
  ),
  paragraph(
    'p-vi-5',
    'Part of the new audience may realize they followed for the funny videos, not construction.',
  ),
  paragraph('p-vi-6', 'They leave.'),
  paragraph(
    'p-vi-7',
    'This does not necessarily mean the Page suddenly became worse.',
  ),
  paragraph(
    'p-vi-8',
    'The original growth may simply have included people who were never a strong long-term audience fit.',
  ),
  paragraph(
    'p-vi-9',
    'That is why a follower spike should be evaluated after some time rather than assumed to represent permanent audience growth.',
  ),

  heading(
    'h-transition',
    '4. Facebook Page Likes and Followers Are Changing',
    2,
  ),
  paragraph(
    'p-tr-1',
    'This is one of the most important 2026 explanations.',
  ),
  paragraph(
    'p-tr-2',
    'Facebook has been transitioning Page Likes to Followers.',
  ),
  paragraph(
    'p-tr-3',
    'Meta currently says Page Likes have been replaced by Follows in Meta Business Suite, meaning Page managers now see follower Insights rather than Page Like Insights there. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-tr-4',
    "Meta's Page-follow documentation also states that if someone previously liked a Page but did not follow it, that connection was removed as Facebook transitioned toward the follower model. (Facebook)",
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-tr-5',
    'This means an old screenshot showing 15,000 Page Likes should not automatically be compared with a current number showing 13,500 Followers and interpreted as “We lost 1,500 followers.”',
  ),
  paragraph(
    'p-tr-6',
    'Those figures may represent different Page-connection models.',
  ),

  heading(
    'h-not-same',
    'Page Likes Are Not the Same Historical Metric as Current Followers',
    2,
  ),
  paragraph(
    'p-ns-1',
    'Earlier Facebook Page systems gave a prominent role to Page Likes.',
  ),
  paragraph(
    'p-ns-2',
    "Facebook's newer model places more emphasis on following.",
  ),
  paragraph(
    'p-ns-3',
    "Meta's current documentation says Page managers no longer get Page Like Insights in Meta Business Suite because Likes have been replaced by Follows. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ns-4',
    'It also says Page managers can no longer see people who Like the Page in the same way; current audience management is follower-focused. (Facebook)',
    [{ href: FB_SEE_WHO_FOLLOWS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ns-5',
    'So if your Page has existed for years, be very careful when comparing old Page Like reports, old screenshots, third-party historical metrics and current Facebook follower numbers.',
  ),
  paragraph(
    'p-ns-6',
    'You may not be comparing the same measurement.',
  ),
  paragraph(
    'p-ns-7',
    'If you are comparing that older Page-connection option separately, Facebook Page Likes should be understood as a historical Page-connection metric, not as current follower Insights.',
    [{ href: '/buy-facebook-page-likes', label: 'Facebook Page Likes' }],
  ),
  figure(
    'fig-metric',
    `${IMAGE_DIR}/audience-metric-changed.png`,
    'Facebook Page audience metric changing from Page Likes and Follows toward Followers as the primary metric',
    'Historical Like totals and current follower totals should not automatically be treated as identical metrics.',
  ),

  heading(
    'h-fake',
    '5. Fake or Inauthentic Accounts Can Be Removed',
    2,
  ),
  paragraph(
    'p-fk-1',
    'Meta actively removes fake accounts from Facebook.',
  ),
  paragraph(
    'p-fk-2',
    "Its current Community Standards Enforcement reporting says Meta's goal is to remove as many fake Facebook accounts as possible, including accounts created with malicious intent. (Transparency)",
    [{ href: META_FAKE_ACCOUNTS, label: 'Transparency', external: true }],
  ),
  paragraph(
    'p-fk-3',
    "Meta's inauthentic-behavior policy also says that when it identifies coordinated inauthentic networks, it removes fake accounts and other involved Meta assets. (Transparency)",
    [{ href: META_INAUTHENTIC_BEHAVIOR, label: 'Transparency', external: true }],
  ),
  paragraph(
    'p-fk-4',
    'That matters for follower counts.',
  ),
  paragraph(
    'p-fk-5',
    "If an account that follows a Page is subsequently removed from Facebook, it is reasonable to infer that the removed account can no longer remain part of the Page's active follower audience. (Transparency)",
    [{ href: META_FAKE_ACCOUNTS, label: 'Transparency', external: true }],
  ),
  paragraph(
    'p-fk-6',
    'So a follower decline does not automatically mean real customers manually unfollowed you.',
  ),
  paragraph(
    'p-fk-7',
    'Some changes may reflect platform enforcement against invalid accounts.',
  ),
  paragraph(
    'p-fk-8',
    'But do not claim that every follower drop is Facebook deleting bots.',
  ),
  paragraph('p-fk-9', 'There is no basis for that.'),

  heading(
    'h-not-bots',
    '6. Do Not Assume Every Follower Drop Is a Bot Purge',
    2,
  ),
  paragraph(
    'p-nb-1',
    'This is the opposite mistake.',
  ),
  paragraph(
    'p-nb-2',
    'Page owners sometimes see minus 300 followers and immediately say Facebook removed fake followers.',
  ),
  paragraph(
    'p-nb-3',
    'You cannot know that from the total alone.',
  ),
  paragraph(
    'p-nb-4',
    'Facebook does remove fake accounts. (Transparency)',
    [{ href: META_FAKE_ACCOUNTS, label: 'Transparency', external: true }],
  ),
  paragraph(
    'p-nb-5',
    'But real users also have a direct Unfollow option. (Facebook)',
    [{ href: FB_UNFOLLOW, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-nb-6',
    'Therefore a decline could reflect real unfollows, platform account removal, audience mismatch, metric transition or several factors at once.',
  ),
  paragraph(
    'p-nb-7',
    'The correct approach is diagnosis, not guessing.',
  ),

  heading(
    'h-insights',
    '7. Check Follower Insights Before Panicking',
    2,
  ),
  paragraph(
    'p-in-1',
    "Facebook provides follower Insights through the Page's Professional Dashboard.",
  ),
  paragraph(
    'p-in-2',
    "Meta's current instructions direct Page managers to switch into the Page, open Professional Dashboard, select Insights and review Audience/Follower information. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-in-3',
    'This should be your first source when evaluating Page follower trends.',
  ),
  paragraph(
    'p-in-4',
    "Meta's broader Page Insights system also provides information about Page performance, audience demographics and how people respond to posts. (Facebook)",
    [{ href: FB_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-in-5',
    'Instead of looking only at a current follower total, ask:',
  ),
  bullets('ul-in', [
    'When did the change begin?',
    'Was it one large change or gradual?',
    'What content was published around that time?',
    'Did reach change too?',
    'Did the Page change direction?',
    'Are we comparing followers with old Page Likes?',
  ]),
  paragraph(
    'p-in-6',
    'That turns the follower number into something useful.',
  ),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnose-follower-drop.png`,
    'Diagnose a Facebook follower drop by checking the metric, Insights, content and Page status',
    'Investigate the evidence before assuming a penalty.',
  ),

  heading(
    'h-reach',
    '8. A Follower Drop Does Not Automatically Mean Your Reach Was Penalized',
    2,
  ),
  paragraph(
    'p-re-1',
    'Followers and reach are different metrics.',
  ),
  paragraph(
    'p-re-2',
    'Facebook Page followers describe people connected to the Page.',
  ),
  paragraph(
    'p-re-3',
    'Facebook reach describes visibility of Page content.',
  ),
  paragraph(
    'p-re-4',
    "Meta's Page Insights treats audience and content-performance metrics separately. (Facebook)",
    [{ href: FB_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-re-5',
    'So a follower drop does not automatically prove Facebook reduced your organic reach.',
  ),
  paragraph(
    'p-re-6',
    'Likewise, a reach drop does not automatically prove followers disappeared.',
  ),
  paragraph(
    'p-re-7',
    'Our separate guide on how Facebook Page reach works covers that distinction in detail.',
    [
      {
        href: '/learn/how-facebook-page-reach-works',
        label: 'how Facebook Page reach works',
      },
    ],
  ),
  paragraph(
    'p-re-8',
    'Keep the metrics separate until the evidence connects them.',
  ),

  heading(
    'h-likes',
    '9. Fewer Followers Does Not Automatically Mean Fewer Post Likes',
    2,
  ),
  paragraph(
    'p-pl-1',
    'The same distinction applies to engagement.',
  ),
  paragraph(
    'p-pl-2',
    'Facebook followers, Page Likes and Post Likes are different concepts.',
  ),
  paragraph(
    'p-pl-3',
    'A person can follow your Page without Liking every post.',
  ),
  paragraph(
    'p-pl-4',
    'A non-follower can also interact with public Facebook content.',
  ),
  paragraph(
    'p-pl-5',
    'Meta says public posts can be liked or commented on even by people who are not following the person or profile, illustrating that interaction and following are separate actions. (Facebook)',
    [{ href: FB_WHO_CAN_LIKE_COMMENT, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pl-6',
    'So do not assume that lost 100 followers means future posts will receive exactly 100 fewer Likes.',
  ),
  paragraph(
    'p-pl-7',
    'Facebook does not work through a one-to-one formula like that.',
  ),
  paragraph(
    'p-pl-8',
    'Our comparison of Facebook Followers vs Page Likes vs Post Likes explains those differences in more detail.',
    [
      {
        href: '/learn/facebook-followers-vs-page-likes-vs-post-likes',
        label: 'Facebook Followers vs Page Likes vs Post Likes',
      },
    ],
  ),

  heading(
    'h-freq',
    '10. Content Frequency Can Affect Audience Expectations',
    2,
  ),
  paragraph(
    'p-fr-1',
    'Facebook does not publish a universal rule saying post five times per day and followers will leave.',
  ),
  paragraph(
    'p-fr-2',
    "So don't invent one.",
  ),
  paragraph(
    'p-fr-3',
    'But audiences can react to changes in content behaviour.',
  ),
  paragraph(
    'p-fr-4',
    'A Page that normally publishes two useful posts per week and suddenly publishes ten promotional posts every day may feel different to the people who followed it.',
  ),
  paragraph(
    'p-fr-5',
    'Some may unfollow because they no longer want those updates.',
  ),
  paragraph(
    'p-fr-6',
    'The key point here is audience behaviour, not an official Facebook penalty formula.',
  ),

  heading(
    'h-promo',
    '11. Too Much Promotional Content Can Change Why People Stay',
    2,
  ),
  paragraph(
    'p-pr-1',
    'Imagine every Page post becomes:',
  ),
  bullets('ul-promo', [
    'Buy now',
    'Sale',
    'Call now',
    'Book now',
    'Last chance',
  ]),
  paragraph(
    'p-pr-2',
    'A customer may want the business.',
  ),
  paragraph(
    'p-pr-3',
    'They may not want their Feed filled with repeated advertising.',
  ),
  paragraph(
    'p-pr-4',
    'A stronger Page can mix commercial content with education, answers, examples, updates, stories, helpful information and actual reasons to stay connected.',
  ),
  paragraph(
    'p-pr-5',
    'The follower question is what this Page will give me after I follow.',
  ),
  paragraph(
    'p-pr-6',
    'If the answer is advertisements forever, some people will decide they no longer need the connection.',
  ),

  heading(
    'h-location',
    '12. Changing Your Business Location Can Affect Followers',
    2,
  ),
  paragraph(
    'p-lo-1',
    'Suppose a local restaurant Page builds an audience in Manchester.',
  ),
  paragraph(
    'p-lo-2',
    'Then the business relocates permanently to London.',
  ),
  paragraph(
    'p-lo-3',
    'Some Manchester followers may no longer find the Page relevant.',
  ),
  paragraph('p-lo-4', 'They may unfollow.'),
  paragraph(
    'p-lo-5',
    'That is not necessarily a problem with Facebook.',
  ),
  paragraph(
    'p-lo-6',
    'It can be a normal consequence of the business changing.',
  ),
  paragraph(
    'p-lo-7',
    'The same can happen when a Page changes country, service area, industry, language or customer segment.',
  ),
  paragraph(
    'p-lo-8',
    'Follower retention should be evaluated in the context of who the Page is now designed to serve.',
  ),

  heading(
    'h-language',
    '13. Language Changes Can Affect Audience Retention',
    2,
  ),
  paragraph(
    'p-la-1',
    'Imagine a Page builds most of its following through English content.',
  ),
  paragraph(
    'p-la-2',
    'Then it suddenly publishes almost entirely in another language.',
  ),
  paragraph(
    'p-la-3',
    'That may be the right business decision.',
  ),
  paragraph(
    'p-la-4',
    'But some existing followers may no longer understand or need the content.',
  ),
  paragraph(
    'p-la-5',
    'Audience changes can follow strategic changes.',
  ),
  paragraph(
    'p-la-6',
    'The important thing is to distinguish intentional repositioning from unexpected audience loss.',
  ),
  paragraph(
    'p-la-7',
    'A temporary decline can sometimes be part of moving toward a more relevant audience.',
  ),

  heading(
    'h-not-bad',
    '14. Follower Loss Is Not Always a Bad Thing',
    2,
  ),
  paragraph(
    'p-nb2-1',
    'Suppose your Facebook Page has 20,000 followers.',
  ),
  paragraph(
    'p-nb2-2',
    'But many came from an old entertainment campaign unrelated to your current business.',
  ),
  paragraph(
    'p-nb2-3',
    'You now refocus the Page on local home renovation.',
  ),
  paragraph(
    'p-nb2-4',
    'Some of the unrelated followers leave.',
  ),
  paragraph(
    'p-nb2-5',
    'Your count becomes smaller.',
  ),
  paragraph(
    'p-nb2-6',
    'But the remaining and newly arriving audience may be more aligned with homeowners, renovation customers, local buyers and the actual purpose of the Page.',
  ),
  paragraph(
    'p-nb2-7',
    'A smaller number does not automatically mean a worse Page.',
  ),
  paragraph('p-nb2-8', 'Follower relevance matters too.'),

  heading(
    'h-compare',
    '15. Do Not Compare Facebook Followers to Page Likes Without Context',
    2,
  ),
  paragraph(
    'p-cp-1',
    "This deserves repeating because Facebook's Page model is currently changing.",
  ),
  paragraph(
    'p-cp-2',
    'Meta says Page Likes are transitioning to Followers and that Page Like Insights are no longer available in Meta Business Suite. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cp-3',
    'Meta also says that previous Like-only connections that were not also follows were removed during the transition. (Facebook)',
    [{ href: FB_FOLLOW_PAGE, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-cp-4',
    'Therefore historical Page Likes and current Page Followers should not automatically be placed on the same graph as if they were identical data.',
  ),
  paragraph(
    'p-cp-5',
    'If you are preparing a client report, label them clearly.',
  ),
  paragraph(
    'p-cp-6',
    'For example, historical Page Likes versus current Followers, rather than claiming an unsupported follower loss.',
  ),

  heading(
    'h-why-show',
    'Why Does Facebook Now Show Followers Instead of Page Likes?',
    2,
  ),
  paragraph(
    'p-ws-1',
    'Because Facebook is transitioning Page audience connections toward the follower model.',
  ),
  paragraph(
    'p-ws-2',
    "Meta's current Business Help documentation says Likes on Facebook Pages are being transitioned to Followers, while current follower Insights documentation says Page Like Insights have been replaced by Follow Insights in Meta Business Suite. (Facebook)",
    [{ href: FB_LIKES_TO_FOLLOWERS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ws-3',
    'This makes followers the more relevant current Page audience metric.',
  ),
  paragraph(
    'p-ws-4',
    'For 2026 reporting, focus primarily on Followers rather than trying to recreate the old Page Like model.',
  ),

  heading(
    'h-service',
    'Understand Your Facebook Follower Metric',
    2,
  ),
  paragraph(
    'p-svc-1',
    'If someone is comparing Facebook Page follower options, Facebook followers should be understood as a follower-count service rather than a retention guarantee.',
    [{ href: '/buy-facebook-followers', label: 'Facebook followers' }],
  ),
  paragraph(
    'p-svc-2',
    "A follower service concerns the Page's follower-count metric.",
  ),
  paragraph(
    'p-svc-3',
    'It should not be represented as a guaranteed method for:',
  ),
  bullets('ul-svc-not', [
    'preventing future follower loss,',
    'increasing organic reach,',
    'creating Post Likes,',
    'improving Feed ranking,',
    'generating sales,',
    'or permanently preserving every follower.',
  ]),
  paragraph(
    'p-svc-4',
    "Facebook controls Facebook's platform, accounts and enforcement.",
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

  heading(
    'h-buy',
    'Does Buying More Followers Fix a Falling Follower Count?',
    2,
  ),
  paragraph('p-buy-1', 'Not necessarily.'),
  paragraph(
    'p-buy-2',
    'First identify why the Page is losing followers.',
  ),
  paragraph(
    'p-buy-3',
    'If people are leaving because the content changed, the Page became irrelevant, the business changed location or the audience no longer understands the Page, adding more followers does not solve the underlying audience problem.',
  ),
  paragraph(
    'p-buy-4',
    'Likewise, if Facebook removes fake accounts as part of platform enforcement, simply chasing the previous public number does not address why the count changed. Meta actively removes fake accounts from Facebook. (Transparency)',
    [{ href: META_FAKE_ACCOUNTS, label: 'Transparency', external: true }],
  ),
  paragraph(
    'p-buy-5',
    'Follower-count services and audience-retention strategy are different things.',
  ),

  heading('h-remove-fake', 'Can Facebook Remove Fake Followers?', 2),
  paragraph(
    'p-rf-1',
    'Facebook actively removes fake accounts.',
  ),
  paragraph(
    'p-rf-2',
    "Meta's transparency reporting explicitly states that it works to remove fake Facebook accounts, and its inauthentic-behavior enforcement includes removing fake accounts involved in coordinated manipulation. (Transparency)",
    [{ href: META_FAKE_ACCOUNTS, label: 'Transparency', external: true }],
  ),
  paragraph(
    'p-rf-3',
    "If such an account was part of a Page's follower audience, its removal can reasonably affect that Page's follower total.",
  ),
  paragraph(
    'p-rf-4',
    'But Facebook does not give Page owners a simple report saying it removed exactly 73 fake followers from your Page today.',
  ),
  paragraph(
    'p-rf-5',
    'So do not attribute a drop to fake-account cleanup unless you have supporting evidence.',
  ),

  heading(
    'h-penalize',
    'Can Facebook Penalize Pages for Fake Engagement?',
    2,
  ),
  paragraph(
    'p-pe-1',
    'Meta says Pages may have limits applied if they violate Community Standards, and specifically notes that the Like button may be disabled on Pages it determines are deceptively obtaining Likes. (Facebook)',
    [{ href: FB_PAGE_LIMITS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pe-2',
    'Meta also warns against apps or websites that offer free Facebook Likes or followers in exchange for Facebook login information because they can create account-security risks. (Facebook)',
    [{ href: FB_FREE_LIKES_WARNING, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-pe-3',
    'That means this article should not say Facebook approves purchased followers, followers are undetectable, there is zero platform risk, or Facebook can never take action.',
  ),
  paragraph('p-pe-4', 'Those claims are too absolute.'),

  heading(
    'h-inactive',
    "Does Facebook Remove Followers Because You Didn't Post?",
    2,
  ),
  paragraph(
    'p-ia-1',
    'There is no official Meta rule saying Facebook deletes Page followers merely because a Page did not publish for a particular number of days.',
  ),
  paragraph(
    'p-ia-2',
    'So do not tell users that Facebook removes inactive Page followers after 30 days.',
  ),
  paragraph(
    'p-ia-3',
    'There is no support for that claim in the current Meta sources reviewed.',
  ),
  paragraph(
    'p-ia-4',
    'A period of inactivity can affect audience interest when the Page returns, but that is different from Facebook automatically deleting followers because the Page stopped posting.',
  ),

  heading(
    'h-stop-engaging',
    'Does Facebook Remove Followers if They Stop Engaging?',
    2,
  ),
  paragraph('p-se-1', 'Do not claim that either.'),
  paragraph(
    'p-se-2',
    'Facebook allows people to unfollow Pages themselves. (Facebook)',
    [{ href: FB_UNFOLLOW, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-se-3',
    'But there is no current official Meta rule saying that if a user does not Like your posts for a set number of months, Facebook automatically unfollows them.',
  ),
  paragraph(
    'p-se-4',
    'If a follower disappears, do not infer an inactivity rule without evidence.',
  ),

  heading(
    'h-low-reach',
    'Does Low Reach Cause Followers to Be Removed?',
    2,
  ),
  paragraph(
    'p-lr-1',
    'No official Meta documentation supports a rule where low Page reach automatically deletes followers.',
  ),
  paragraph(
    'p-lr-2',
    'Reach and followers are different Page metrics.',
  ),
  paragraph(
    'p-lr-3',
    "Meta's Page Insights separately helps managers understand Page performance and audience information. (Facebook)",
    [{ href: FB_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-lr-4',
    'If reach drops, investigate reach.',
  ),
  paragraph(
    'p-lr-5',
    'If followers drop, investigate followers.',
  ),
  paragraph(
    'p-lr-6',
    'Only connect the two when your data supports the relationship.',
  ),

  heading(
    'h-overnight',
    'Why Did My Facebook Followers Drop Overnight?',
    2,
  ),
  paragraph(
    'p-on-1',
    'A one-day decline can have multiple possible explanations.',
  ),
  paragraph('p-on-2', 'Start by checking:'),
  paragraph(
    'p-on-3',
    'Was the old number actually Page Likes? Facebook has transitioned Like reporting toward Follows. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-on-4',
    'Did the Page recently receive unusual follower growth? Temporary audience spikes can later normalize.',
  ),
  paragraph(
    'p-on-5',
    'Did you change your content or business positioning? That can affect audience fit.',
  ),
  paragraph(
    'p-on-6',
    'Could removed accounts have been part of the follower base? Meta does remove fake accounts, although the follower total alone cannot prove that was the cause. (Transparency)',
    [{ href: META_FAKE_ACCOUNTS, label: 'Transparency', external: true }],
  ),
  paragraph(
    'p-on-7',
    'Do Page Insights show the change as a real trend? Use Professional Dashboard, then Insights, then Audience/Followers. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-on-8',
    "Don't diagnose the cause from one screenshot.",
  ),

  heading(
    'h-slow',
    'Why Do Facebook Followers Drop Slowly Every Week?',
    2,
  ),
  paragraph(
    'p-sl-1',
    'A gradual decline often suggests an ongoing audience-retention problem is worth investigating, although the total alone still cannot identify the cause.',
  ),
  paragraph('p-sl-2', 'Look for changes in:'),
  bullets('ul-slow', [
    'content relevance,',
    'topic consistency,',
    'publishing behaviour,',
    'location,',
    'audience,',
    'business direction,',
    'and follower acquisition sources.',
  ]),
  paragraph(
    'p-sl-3',
    'Then use Page Insights to compare audience trends with Page and content performance. Meta specifically provides Page Insights to help understand audience demographics and how people respond to posts. (Facebook)',
    [{ href: FB_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sl-4',
    'Look for patterns rather than one isolated day.',
  ),

  heading(
    'h-who',
    'Can You See Exactly Who Unfollowed Your Facebook Page?',
    2,
  ),
  paragraph(
    'p-wh-1',
    'Facebook provides Page follower and audience Insights and lets Page managers view follower information through its current Page tools, but its documented Page Insights workflow is designed around audience analysis rather than an unfollower-alert system. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wh-2',
    'Do not use suspicious third-party services that ask for unnecessary Facebook login credentials merely to promise an unfollower list. Meta itself warns that sites offering free Likes or followers in exchange for login details can put account security at risk. (Facebook)',
    [{ href: FB_FREE_LIKES_WARNING, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-wh-3',
    'For strategy, the trend usually matters more than individual names anyway.',
  ),

  heading(
    'h-again',
    'Can Someone Follow Your Page Again After Unfollowing?',
    2,
  ),
  paragraph('p-ag-1', 'Yes.'),
  paragraph(
    'p-ag-2',
    'Facebook provides a reconnect feature for people, Pages and groups a user previously unfollowed. Meta says the user can reconnect by following again. (Facebook)',
    [{ href: FB_RECONNECT, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-ag-3',
    'So an unfollow is not necessarily permanent.',
  ),
  paragraph(
    'p-ag-4',
    'Audience connections can change over time.',
  ),

  heading(
    'h-do',
    'What Should You Do When Facebook Followers Are Dropping?',
    2,
  ),
  paragraph('p-do-1', 'Use a structured diagnosis.'),
  heading('h-do-1', 'Step 1: Confirm the Metric', 3),
  paragraph('p-do-2', 'Are you looking at:'),
  bullets('ul-do-metric', [
    'Followers?',
    'Historical Page Likes?',
    'A third-party tool?',
  ]),
  paragraph(
    'p-do-3',
    'Do not mix them. Facebook has transitioned Page Like reporting toward Followers. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-do-2', 'Step 2: Open Follower Insights', 3),
  paragraph(
    'p-do-4',
    'Use Professional Dashboard, then Insights, then Audience/Followers. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-do-3', 'Step 3: Identify the Date', 3),
  paragraph('p-do-5', 'Was the decline one day, one week or several months?'),
  heading('h-do-4', 'Step 4: Review Content Changes', 3),
  paragraph(
    'p-do-6',
    'Did you change topic, frequency, language, location, format or audience?',
  ),
  heading('h-do-5', 'Step 5: Review Growth Sources', 3),
  paragraph(
    'p-do-7',
    'Did one unusually popular post attract temporary followers?',
  ),
  heading('h-do-6', 'Step 6: Check Page Status', 3),
  paragraph(
    'p-do-8',
    "If you suspect an actual Facebook restriction, use Facebook's Page and account status tools rather than diagnosing a penalty from follower count alone. Meta documents that Pages can face limits for Community Standards issues. (Facebook)",
    [{ href: FB_PAGE_LIMITS, label: 'Facebook', external: true }],
  ),
  heading('h-do-7', 'Step 7: Improve Audience Fit', 3),
  paragraph(
    'p-do-9',
    'Create content for people who have a reason to remain followers.',
  ),
  paragraph(
    'p-do-10',
    'Our guide on how to grow Facebook Page followers organically covers that audience-building work in more detail.',
    [
      {
        href: '/learn/how-to-get-more-facebook-page-followers',
        label: 'how to grow Facebook Page followers organically',
      },
    ],
  ),

  heading(
    'h-reduce',
    'How to Reduce Avoidable Facebook Follower Loss',
    2,
  ),
  paragraph(
    'p-rd-1',
    'You cannot stop every person from unfollowing.',
  ),
  paragraph('p-rd-2', 'Nor should you.'),
  paragraph(
    'p-rd-3',
    'Users should decide what they want in their Feed.',
  ),
  paragraph(
    'p-rd-4',
    'What you can improve is the Page itself.',
  ),
  heading('h-rd-purpose', 'Keep the Page Purpose Clear', 3),
  paragraph(
    'p-rd-5',
    "People should know what they're following.",
  ),
  heading('h-rd-relevant', 'Keep Content Relevant', 3),
  paragraph(
    'p-rd-6',
    'The content should generally match the audience the Page wants.',
  ),
  heading('h-rd-topics', 'Avoid Constant Random Topic Changes', 3),
  paragraph(
    'p-rd-7',
    'Experiment without turning the Page into a different brand every week.',
  ),
  heading('h-rd-ads', "Don't Make Every Post an Advertisement", 3),
  paragraph(
    'p-rd-8',
    'Give the audience reasons to stay between purchase decisions.',
  ),
  heading('h-rd-study', 'Study Insights', 3),
  paragraph(
    'p-rd-9',
    "Use Facebook's Page performance and follower tools instead of guessing. (Facebook)",
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  heading('h-rd-build', 'Build on Successful Topics', 3),
  paragraph(
    'p-rd-10',
    'If one subject attracts the right followers, create useful follow-ups.',
  ),

  heading(
    'h-better',
    'A Smaller but Better-Matched Audience Can Be More Valuable',
    2,
  ),
  paragraph('p-bt-1', 'Imagine:'),
  heading('h-bt-a', 'Page A', 3),
  bullets('ul-bt-a', [
    '50,000 followers',
    'Most came from unrelated viral entertainment content.',
  ]),
  heading('h-bt-b', 'Page B', 3),
  bullets('ul-bt-b', [
    '12,000 followers',
    "Most are relevant to the Page's location, industry or content.",
  ]),
  paragraph(
    'p-bt-2',
    'Which Page has the better audience?',
  ),
  paragraph(
    'p-bt-3',
    'Follower count alone cannot answer.',
  ),
  paragraph(
    'p-bt-4',
    'For a business, the second audience may be much more useful even though the visible number is smaller.',
  ),
  paragraph(
    'p-bt-5',
    'This is why losing unrelated followers during a deliberate repositioning is not always a failure.',
  ),
  paragraph('p-bt-6', 'The context matters.'),

  heading(
    'h-trend',
    'Facebook Follower Counts Should Be Read as a Trend',
    2,
  ),
  paragraph(
    'p-tn-1',
    'A follower count is a snapshot.',
  ),
  paragraph(
    'p-tn-2',
    'What matters strategically is the pattern.',
  ),
  paragraph('p-tn-3', 'Look at:'),
  bullets('ul-trend', [
    'Where did we start?',
    'How many people are following now?',
    'When did growth accelerate?',
    'When did losses increase?',
    'What changed on the Page?',
    'Were we previously reporting Page Likes instead?',
    'Which content attracted the audience?',
    'Which content seems to retain it?',
  ]),
  paragraph(
    'p-tn-4',
    "Facebook's current Insights tools exist to help Page managers understand their audience and Page performance over time. (Facebook)",
    [{ href: FB_PAGE_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-tn-5',
    'One number cannot tell the whole story.',
  ),

  heading(
    'h-simple',
    'Why Facebook Page Followers Change in Simple Terms',
    2,
  ),
  paragraph(
    'p-sm-1',
    'Think of the follower count as a moving audience.',
  ),
  paragraph(
    'p-sm-2',
    'Someone follows and becomes part of the Page audience.',
  ),
  paragraph(
    'p-sm-3',
    'Later they may remain or unfollow.',
  ),
  paragraph(
    'p-sm-4',
    'Meanwhile Facebook can change Page audience reporting, transition Page Likes toward Follows, or remove accounts that violate its rules. (Facebook)',
    [{ href: FB_FOLLOWER_INSIGHTS, label: 'Facebook', external: true }],
  ),
  paragraph(
    'p-sm-5',
    'The visible total therefore changes.',
  ),
  paragraph(
    'p-sm-6',
    'The correct response is not panic.',
  ),
  paragraph(
    'p-sm-7',
    'It is to identify which part of the audience system changed.',
  ),

  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'Facebook users can manually unfollow a Page.',
    'Following a Page means users may receive Page updates in Feed.',
    'Facebook is transitioning Page Likes toward Followers.',
    'Page Like Insights have been replaced by Follow Insights in Meta Business Suite.',
    'Meta says people who previously Liked a Page but did not follow it had that Like-only connection removed during the transition.',
    'Meta actively removes fake Facebook accounts, so platform account cleanup can reasonably affect Page audiences when removed accounts were followers.',
    'Facebook provides follower Insights through Professional Dashboard, Insights and Audience.',
    'A follower decline alone does not prove that Facebook penalized Page reach.',
    'Historical Page Likes and current Followers should not automatically be treated as identical metrics.',
  ]),
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
  excerpt: 'A Facebook Page follower count is not a permanent number.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'facebook',
  tags: ['followers', 'analytics', 'algorithm', 'engagement', 'business'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Why Do Facebook Page Followers Drop or Change?',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
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
    'People manually unfollow the Page',
    'Audience interests change',
    'Content direction changes',
    'A temporary growth spike brings followers who later leave',
    'Facebook removes fake or inauthentic accounts',
    "Facebook's Page Likes to Followers transition changes what audience metric you are comparing",
    'Page or account enforcement or other platform changes affect how a Page operates',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why are my Facebook Page followers suddenly dropping?',
      answer:
        'People can manually unfollow a Page, and Meta also removes fake accounts from Facebook. In addition, Facebook is transitioning Page Likes toward Followers, so make sure you are not comparing an older Like metric with a current follower metric.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Did Facebook replace Page Likes with followers?',
      answer:
        'Meta says Page Likes are being transitioned to Followers, and Page Like Insights have already been replaced by Follow Insights in Meta Business Suite.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Why are my Facebook Page Likes and followers different?',
      answer:
        'They have historically represented different Page connections, and Facebook is now moving Page audience reporting toward Followers. Meta also says Like-only connections that were not also follows were removed during the transition.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Does Facebook remove fake followers?',
      answer:
        "Meta actively removes fake Facebook accounts. If a removed account was following a Page, it can reasonably no longer remain part of that Page's active follower audience, although a follower decline by itself does not prove fake-account removal caused it.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does losing Facebook followers mean my Page is penalized?',
      answer:
        "No. Users can unfollow Pages themselves, and follower counts can change for several reasons. If you suspect an actual Page restriction, check Facebook's Page and account status rather than inferring a penalty solely from the follower number. Meta separately documents Page limits for Community Standards issues.",
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Where can I check my Facebook Page followers?',
      answer:
        'Facebook directs Page managers to Professional Dashboard, Insights and Audience to review follower Insights.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Can someone follow my Facebook Page again after unfollowing?',
      answer:
        'Yes. Facebook provides a reconnect option that lets users follow a previously unfollowed person, Page or group again.',
      schemaEligible: true,
    },
  ],
};
