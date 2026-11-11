/**
 * Article #22 — Why Do TikTok Followers Drop? Common Causes Explained
 * Scheduled: Monday 12 October 2026.
 * Informational / retention-problem cluster. Not a shadowban diagnosis.
 * Primary CTA: /buy-tiktok-followers
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'why-tiktok-followers-drop';
const SCHEDULED_AT = '2026-10-12T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Reader-copy revision (batches 24–25): internal writing notes rewritten for readers. */
const REVISED_AT = '2026-10-10T20:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_FOLLOW_UNFOLLOW =
  'https://support.tiktok.com/en/using-tiktok/followers-and-following/following-and-unfollowing';
const TT_ACCOUNT_TYPES =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/switching-to-a-creator-or-business-account';
const TT_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';
const TT_SEARCH_INSIGHTS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TT_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';

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
    "If your count went from 8,420 to 8,376 overnight, the first instinct is to blame the algorithm, a shadowban or a fake-follower purge. But a falling TikTok follower count does not tell you the cause by itself. In most cases, the answer to why are my TikTok followers dropping is ordinary: people unfollowed, new-follower growth slowed, or the account changed in a way some followers did not sign up for.",
  ),
  paragraph(
    'p-open-5',
    'TikTok lets users unfollow accounts whenever they choose, and creators can remove followers from their own accounts. (TikTok Support)',
    [{ href: TT_FOLLOW_UNFOLLOW, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-open-9',
    "So the useful question is not whether TikTok is taking your followers, but what changed in your audience, content or account around the time the loss started. TikTok Analytics shows follower metrics alongside post performance, and you need at least one public post to access it. (TikTok Support)",
    [{ href: TT_ACCOUNT_TYPES, label: 'TikTok Support', external: true }],
  ),

  heading('h-1', 'Are People Simply Unfollowing You?', 2),
  paragraph(
    'p-1-3',
    "This is the most direct cause. A user can open your profile and tap the Following button to unfollow, so follower counts naturally move in both directions without any bug or penalty.",
  ),
  paragraph(
    'p-1-6',
    "People leave for ordinary reasons. They lose interest in the topic, they followed for one specific video, you started posting more of what they do not want or less of what they liked, or they are simply changing who they follow. Unfollowing also removes your posts from that person's Following feed or Friends Tab, so it is a real choice about what they want to see. (TikTok Support)",
    [{ href: TT_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-1-8',
    "You have no control over another person's decision to keep following, and that is normal. A follower is not a permanent subscription contract.",
  ),
  figure(
    'fig-change',
    `${IMAGE_DIR}/why-followers-change.png`,
    'TikTok follower counts change through audience choice, content fit and account direction, not only through platform penalties',
    'Follower totals move because audiences move.',
  ),

  heading('h-2', 'Did Your Content or Positioning Change?', 2),
  paragraph(
    'p-2-1',
    'People usually follow an account because of a recognizable pattern. If an account grew on TikTok SEO and analytics videos and then switches to crypto predictions, gym clips and random memes, some followers will decide it is no longer the account they followed. The new topics are not necessarily bad; those followers simply made their decision based on a different offer.',
  ),
  paragraph(
    'p-5-2',
    'The same thing happens on a smaller scale when one off-topic video brings in followers. If a fashion account posts a tutorial on getting TikTok LIVE and it attracts a wave of follows, some of those people will leave when the next videos return to fashion. When you analyze follower growth, ask what people thought they were following.',
  ),
  paragraph(
    'p-6-1',
    'Unclear positioning creates unstable growth too. A personality-driven creator can cover many topics because the creator is the reason to follow, but a niche account that drifts from business education to lifestyle to memes gives its audience no stable expectation. A simple test is whether someone could describe why they follow you in one sentence.',
  ),
  paragraph(
    'p-8-1',
    "Posting more does not fix this on its own. TikTok's growth guidance recommends regular, high-quality content (TikTok Support), but that is not a rule that you must post five times a day. If extra volume leads to repetitive videos, irrelevant trends or off-niche posts, it can make the account less clear, so aim for consistent value and positioning rather than maximum uploads.",
    [{ href: TT_GROW_AUDIENCE, label: 'TikTok Support', external: true }],
  ),

  heading('h-after-viral', 'Why Do TikTok Followers Drop After Going Viral?', 2),
  paragraph(
    'p-3-1',
    'Suppose your account is about small-business marketing and one unrelated comedy video gets far more exposure than usual. Many people discover you through that post and some follow. When your next ten videos go back to Google Business Profiles, SEO and advertising, part of that viral audience realizes they do not care about the topic and unfollows.',
  ),
  paragraph(
    'p-3-6',
    "The spike was real, but it did not represent strong long-term audience fit. A viral post shows that a video can attract attention; it does not show that those viewers want your normal content. This is an audience-fit explanation, and it does not prove TikTok removed anyone.",
  ),

  heading('h-7', 'Did Giveaways or Follow-for-Follow Bring the Wrong Audience?', 2),
  paragraph(
    'p-7-1',
    'More followers are not automatically better followers. If your goal is helping UK small businesses with marketing but most of your growth comes from unrelated global entertainment videos, the count can rise quickly while the audience and your future content drift apart. That is an audience-quality problem rather than a TikTok problem.',
  ),
  paragraph(
    'p-29-1',
    'Giveaways and follow-for-follow create the same mismatch. If an account gives away an expensive phone unrelated to its niche, thousands may follow for the prize and some will leave when normal content returns. People who followed mainly to get a follow back have even less reason to stay, so the audience becomes unstable.',
  ),
  paragraph(
    'p-30-4',
    'Growth holds up better when followers come from content, search, profile discovery and genuine interest rather than obligation. Our guide on how to get your first 1,000 TikTok followers organically focuses on that audience-fit approach.',
    [
      {
        href: '/learn/how-to-get-1000-tiktok-followers',
        label: 'how to get your first 1,000 TikTok followers organically',
      },
    ],
  ),

  heading('h-23', 'Has New-Follower Growth Slowed Down?', 2),
  paragraph(
    'p-23-1',
    'A falling total can mean fewer people are arriving, not that more are leaving. Imagine an account that normally gains 100 followers a day while 30 leave, for a net gain of 70. If new follows slow to 10 a day while unfollows stay around 30, the account now shows minus 20, even though follower-loss behaviour has not changed.',
  ),
  paragraph(
    'p-4-4',
    'The opposite case hides movement as well. An account that gains 500 followers and loses 420 in a week shows plus 80, which misses most of what happened. Growing accounts lose followers too; growth only means the balance is positive over the period you are measuring.',
  ),
  figure(
    'fig-net',
    `${IMAGE_DIR}/net-followers.png`,
    'Illustrative example of 500 followers gained, 420 lost and a net change of 80, showing that a small net number can hide audience movement',
    'A small net change can hide significant audience movement. Illustrative example only.',
  ),
  paragraph(
    'p-24-1',
    "Check whether the videos that used to bring in new followers stopped performing, aged or stopped being made. The fix is not to repost the same video forever but to ask what need those videos met and make useful related content. Creator Search Insights lets creators find search topics and see how posts perform in TikTok Search, which can help build discovery that lasts beyond one trend. (TikTok Support) Our TikTok SEO guide covers search-focused content in more depth.",
    [
      { href: TT_SEARCH_INSIGHTS, label: 'TikTok Support', external: true },
      { href: '/learn/tiktok-seo', label: 'TikTok SEO' },
    ],
  ),

  heading('h-16', 'Did You or Someone Managing the Account Remove Followers?', 2),
  paragraph(
    'p-16-2',
    'TikTok gives account owners a native Remove follower function, so if you, an employee, an agency or anyone else managing the account removes followers, the count goes down.',
  ),
  paragraph(
    'p-16-4',
    'On accounts with several managers, check whether anyone has been cleaning the follower list, blocking accounts or changing privacy settings before blaming TikTok. Following, removing followers and blocking are separate account-management controls, not ranking signals or algorithm penalties.',
  ),
  paragraph(
    'p-18-1',
    "Privacy changes matter as well. On a private account, only people the owner approves can follow and see its content and follower and following lists. Going private can change how easily people evaluate your content and follow you, but it is an access choice, not a penalty. Our guide on public vs private TikTok accounts explains the difference.",
    [
      {
        href: '/learn/public-vs-private-tiktok-account',
        label: 'public vs private TikTok accounts',
      },
    ],
  ),

  heading('h-delete-fake', 'Does TikTok Delete Fake Followers?', 2),
  paragraph(
    'p-df-1',
    "Yes. TikTok's Community Guidelines ban fake engagement for every account and say TikTok will remove fake followers or likes it finds. TikTok also removes fake and spam accounts, and when an account that followed you is removed, it drops off your count. TikTok does not show you which removed accounts followed you.",
  ),
  paragraph(
    'p-20-3',
    "TikTok's Creator Rewards eligibility rules also say creators must not engage in fraudulent activity such as inflating follower counts or acquiring fake video views. Bought followers are therefore not TikTok-approved, are not a safe way to meet creator-program eligibility and can disappear. Buying more does not stop a drop either: if people leave because of content mismatch or temporary viral interest, the audience problem remains.",
  ),
  paragraph(
    'p-pd-3',
    "Purchased followers can drop like any others, because users can unfollow, creators can remove followers and TikTok controls its account ecosystem. So be wary of claims such as followers can never drop, or permanent TikTok followers guaranteed forever.",
  ),
  paragraph(
    'p-20-5',
    'If you never bought followers, do not assume a drop means TikTok removed bots. The public counter does not tell you whether a loss came from unfollows, account removals, your own follower management or another cause, so work through the other causes in this guide first.',
  ),

  heading('h-19', 'Does TikTok Remove Inactive Followers?', 2),
  paragraph(
    'p-9-3',
    "A common claim is that TikTok removes followers who have not opened the app in 30 days, or deletes your followers if you stop posting. TikTok's Inactive Account Policy says something narrower: when an account remains inactive for 180 days or more, its username may be reset to a randomized numeric username.",
  ),
  paragraph(
    'p-19-2',
    "That is a username policy, not a follower-purge rule. TikTok does not say inactive accounts are removed from the accounts they follow, and its follower documentation describes no rule that unfollows people for not watching your videos. Your audience may still lose interest during a long break, but that is different from a documented follower-deletion countdown. If TikTok publishes a different policy, we will update this guide.",
  ),

  heading('h-12', "Does Losing Followers Mean You're Shadowbanned?", 2),
  paragraph(
    'p-12-2',
    'No. Follower loss alone does not prove a shadowban, recommendation restriction, fake-follower purge or algorithm penalty. TikTok has real tools for those questions, and they give much stronger signals than losing 30 followers.',
  ),
  paragraph(
    'p-12-3',
    'Account Status lets you review account-standing issues, including certain restrictions on login, posts, comments and other functions. Check it if follower loss comes with posting or comment restrictions, login problems or other changes to how the account works, rather than relying on rumours or unofficial shadowban-checker websites.',
  ),
  paragraph(
    'p-12-4',
    'Recommendation eligibility is separate. If an account becomes ineligible for recommendation, TikTok says it notifies the user in their inbox and profile, shows the flagged content and offers an appeal. Check those notices if discovery among non-followers collapses, but remember that follower count is an audience metric, and a decline does not tell you either system was triggered.',
  ),
  paragraph(
    'p-ha-2',
    'Losing followers also has no published direct effect on the algorithm. TikTok describes recommendation as using multiple signals, including user interactions, content information and user information, and it publishes no rule such as lose 100 followers and your next videos get 30 percent less reach. Follower loss is useful information about retention, not a ranking equation.',
  ),

  heading('h-views-up', 'Why Are My TikTok Followers Dropping While Views Go Up?', 2),
  paragraph(
    'p-vu-1',
    'Views and followers measure different things. A new video can reach many non-followers and gain views while existing followers leave, because TikTok recommends content based on interests and interactions rather than sending every post to every follower. Following and unfollowing remain separate user actions.',
  ),
  paragraph(
    'p-fu-1',
    'The reverse is also true: an account with 50,000 followers does not automatically get 50,000 views per post, so followers can rise while views fall. Analyze follower count and content performance separately. Our guide on TikTok followers, likes and views explains those distinctions, and our article on why TikTok videos get views but no followers covers the opposite problem.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'why TikTok videos get views but no followers',
      },
    ],
  ),

  heading('h-10', 'Is There a Normal Rate of Follower Loss on TikTok?', 2),
  paragraph(
    'p-10-1',
    'Be careful with articles claiming that losing 2 percent a week is normal, that anything over 5 percent means a shadowban, or that 10 followers per 1,000 are removed daily. TikTok gives you follower Analytics but does not publish a normal follower-loss rate. A 200-follower local account and a 10-million-follower celebrity have completely different audience behaviour, so compare against your own historical baseline instead.',
  ),

  heading('h-who', 'Can You See Exactly Who Unfollowed You on TikTok?', 2),
  paragraph(
    'p-who-1',
    'No. TikTok has a followers list and follower Analytics, but no list of who unfollowed you and when. For growth decisions the names matter less than the trend: which content attracted people, which period coincided with higher losses and whether the account still suits the audience a viral post brought in.',
  ),
  paragraph(
    'p-21-1',
    'Avoid third-party apps that promise to show exactly who unfollowed you or to get followers back instantly, especially if they ask for your password, two-factor codes or session cookies. TikTok has a formal authorization system for third-party apps and recommends reviewing permissions when you connect one. Your curiosity is not worth losing the account.',
  ),

  heading('h-what-do', 'What Should You Do When TikTok Followers Are Dropping?', 2),
  paragraph(
    'p-wd-1',
    'Work through the evidence before changing anything. A few days of decline can feel dramatic, but check a longer period before you overhaul your niche, username, format and posting schedule. This checklist covers the causes above in a sensible order.',
  ),
  numbered('ol-do', [
    'Record the follower trend over a meaningful period instead of relying on memory, and note how big the drop actually is.',
    'Open TikTok Analytics and review follower and post performance.',
    'Find the point where the decline began.',
    'Compare content before and after that date for changes in topic, format, language or audience.',
    'Look for a recent follower spike from a viral or off-niche post, a giveaway or a follow-for-follow push.',
    'Check whether anyone managing the account removed followers, blocked accounts or changed privacy settings.',
    'Check Account Status and any recommendation notice, and appeal if TikTok says the account is ineligible for recommendation.',
    'Rebuild around the content your intended audience originally followed you for.',
  ]),
  figure(
    'fig-diagnose',
    `${IMAGE_DIR}/diagnose-drop.png`,
    'Four-step diagnosis for a TikTok follower drop: confirm the change, check Analytics, review content, then check Account Status',
    'Use evidence before diagnosing a penalty.',
  ),
  paragraph(
    'p-ep-1',
    "If you lose followers every time you post, compare several posts and look for themes. When the same type of post keeps coinciding with losses, it probably conflicts with what people followed you for, which is useful information rather than proof that TikTok punishes posting. Even so, don't delete every video that loses followers, because the public counter rarely proves that one video caused a dozen unfollows. Remove a post when it is off-topic, inaccurate or clearly weak, not because the number moved by three.",
  ),
  paragraph(
    'p-30d-3',
    'A simple 30-day review keeps this manageable. In week one, record the count, recent posts, top discovery content and any spikes, and check Account Status. In week two, pick your strongest three to five themes, clarify your profile and cut unrelated content. In week three, build follow-ups, comparisons and FAQs on your strongest topic, then in week four review Analytics to see whether losses slowed and which topics attracted better-matched viewers.',
  ),
  paragraph(
    'p-33-2',
    "If a count looks clearly inconsistent or an account feature is failing, use TikTok's official Report a problem workflow under Settings and privacy. Most unexpected metric movement is not technical, so use it for genuine platform issues.",
  ),
  {
    id: 'cta-tiktok-followers',
    type: 'internal_cta',
    order: nextOrder(),
    href: '/buy-tiktok-followers',
    heading: 'Compare TikTok Follower Options',
    description:
      "Follower counts can change for several reasons. If you're comparing TikTok follower packages, review the available options without treating follower count as a guarantee of permanent retention, FYP reach or engagement.",
    label: 'View TikTok Followers',
  },

  heading('h-reduce', 'How Can You Reduce Avoidable Follower Loss?', 2),
  paragraph(
    'p-rd-1',
    'You cannot prevent every unfollow, and users should control their own Following list. What you can improve is the following:',
  ),
  bullets('ul-reduce', [
    "Account clarity: make the account's purpose obvious from the profile and recent posts.",
    'Content consistency: stay connected to the audience that followed you.',
    'Topic quality: answer questions people actually care about.',
    'Discovery fit: avoid attracting large unrelated audiences only for vanity metrics.',
    "Analytics review: use TikTok's follower and post metrics rather than guessing.",
    'Account health: check Account Status and recommendation notices when something appears wrong.',
  ]),
  paragraph(
    'p-hl-1',
    'Some unfollows are healthy. If you move from random viral content to focused TikTok marketing education, some entertainment-only followers will leave and the count may dip, but the account becomes more useful to the marketers, business owners and creators it is meant for. You cannot please every follower at once, so judge strategy by whether the audience is becoming more relevant, not by whether the number rose today.',
  ),
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

export const WHY_TIKTOK_FOLLOWERS_DROP_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-why-tiktok-followers-drop',
  slug: SLUG,
  title: 'Why Do TikTok Followers Drop? Common Causes Explained',
  excerpt:
    'A falling TikTok follower count does not tell you the cause by itself. Check audience, content and Account Status before assuming a penalty.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'analytics', 'algorithm', 'engagement', 'creator'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'A TikTok follower count falling from 8,420 to 8,376, surrounded by possible causes: unfollows, content fit, analytics and Account Status',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: REVISED_AT,
  showModifiedDate: true,
  seo: {
    title: 'Why Do TikTok Followers Drop? Common Causes Explained',
    description:
      'TikTok followers dropping? Learn common reasons follower counts change, what to check in Analytics and Account Status, and which follower-loss myths to avoid.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'why are my TikTok followers dropping',
      'TikTok losing followers',
      'TikTok followers decreasing',
      'why did my TikTok followers go down',
      'TikTok follower count dropping',
      'losing followers on TikTok',
    ],
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'how-to-get-1000-tiktok-followers',
    'public-vs-private-tiktok-account',
    'tiktok-seo',
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
    'People can manually unfollow',
    'You or an authorized manager can remove followers',
    'A viral video can attract poorly matched followers',
    'Content or positioning changes can cause turnover',
    'Check Analytics and Account Status before assuming a penalty',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Why are my TikTok followers suddenly dropping?',
      answer:
        'People can manually unfollow your account, and creators can also remove followers. Check TikTok Analytics to identify when the change started and compare it with recent content instead of assuming a penalty.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does TikTok remove inactive followers?',
      answer:
        'TikTok\'s current Inactive Account Policy says an account inactive for at least 180 days may have its username reset. It does not state that inactive users are automatically removed from every account they follow after a fixed period.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: "Does losing TikTok followers mean I'm shadowbanned?",
      answer:
        'No. A follower decline alone does not establish a recommendation restriction. TikTok provides Account Status for account-standing issues and separately notifies users when an account becomes ineligible for recommendation.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can TikTok followers drop after a viral video?',
      answer:
        "Yes, audience turnover can occur after any follower spike. A plausible reason is that people followed for one viral topic but later discovered the account's normal content did not match their interests. This is an audience-fit explanation, not proof of a TikTok penalty.",
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can I see who unfollowed me on TikTok?',
      answer:
        'TikTok has a followers list and follower Analytics, but no list of who unfollowed you and when. For growth decisions, follower trends and content Analytics are more useful.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question:
        'Does TikTok automatically unfollow people who stop watching my videos?',
      answer:
        "TikTok's follower documentation doesn't describe any rule like that. People can unfollow an account themselves, and creators can remove followers.",
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Can purchased TikTok followers drop?',
      answer:
        'Yes. People can unfollow, creators can remove followers, and TikTok says it removes fake followers it finds. Be wary of any service that promises followers can never disappear.',
      schemaEligible: true,
    },
    {
      id: 'faq-8',
      question: 'Does losing followers reduce TikTok views?',
      answer:
        'TikTok does not publish a simple rule where losing a certain number of followers causes a fixed reduction in views. Its recommendation systems use multiple personalized signals.',
      schemaEligible: true,
    },
  ],
};
