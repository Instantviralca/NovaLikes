/**
 * Article #12 — How to Get More Facebook Page Followers Organically
 * Scheduled: Friday 18 September 2026.
 * Informational / how-to intent. Distinct from /buy-facebook-followers (buying intent).
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-to-get-more-facebook-page-followers';
const SCHEDULED_AT = '2026-09-18T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const FB_RECOMMENDATIONS =
  'https://www.facebook.com/help/1257205004624246';
const FB_INVITE_FRIENDS =
  'https://www.facebook.com/help/174333482624856';
const FB_SIMILAR_PAGE_SUGGESTIONS =
  'https://www.facebook.com/help/514622715244231';
const FB_PAGE_INSIGHTS =
  'https://www.facebook.com/help/268680253165747';

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
    'Getting more Facebook Page followers is not about posting more. It is about giving the right people a clear reason to follow, then making it easy for them to find you. Most people discover a Page through one post, glance at the Page, and decide in a few seconds whether more of the same would be worth seeing.',
  ),
  paragraph(
    'p-2',
    'This guide covers the steps that make the biggest difference for a Page growing without paid ads, along with the shortcuts that tend to backfire.',
  ),
  heading('h-make-it-obvious-why-someone-should-follo', 'Make It Obvious Why Someone Should Follow', 2),
  paragraph(
    'p-3',
    'When someone lands on your Page, they should understand straight away what it offers. Your name, profile picture, cover image, intro and pinned post all do that job together.',
  ),
  paragraph(
    'p-4',
    'A description of the business is not enough. "Family run bakery in Leeds" says who you are. "Daily bakes, weekend specials and behind the scenes from our kitchen" tells people what they will get by following. Pin a post that shows your best content, and make sure the details people look for, such as opening hours, location, website and contact options, are complete and current.',
  ),
  figure(
    'fig-follow-decision',
    `${IMAGE_DIR}/facebook-follow-decision.png`,
    'The Facebook Follow Decision: discover a post, visit the Page, then decide whether to follow',
    'Discovery gets attention. Page clarity gives people a reason to stay.',
  ),
  heading('h-post-for-a-specific-audience', 'Post for a Specific Audience', 2),
  paragraph(
    'p-5',
    'Pages that try to appeal to everyone usually appeal to no one in particular. Ask who exactly should care about your Page. A local gym might aim at beginners who feel nervous about starting, rather than "anyone interested in fitness." A local accountant might write for small business owners who dread tax season.',
  ),
  paragraph(
    'p-6',
    'Once you know who the Page is for, decide on a few recurring topics that matter to them. That consistency is what makes a visitor think the next post will be useful too.',
  ),
  heading('h-stop-making-every-post-an-advert', 'Stop Making Every Post an Advert', 2),
  paragraph(
    'p-7',
    'People follow Pages that inform, help or entertain them. If every post is a sale, an offer or a "book now," there is little reason to follow. A good rule is that most posts should be useful or interesting on their own, with promotional posts mixed in.',
  ),
  paragraph(
    'p-8',
    'Your customers already tell you what to post. The questions they ask in person, by email or in comments make excellent content. A dentist explaining what to do about a chipped tooth, or a garden centre showing which plants survive winter, will usually get more shares than a discount banner.',
  ),
  heading('h-create-posts-people-want-to-share', 'Create Posts People Want to Share', 2),
  paragraph(
    'p-9',
    'Shares are one of the best ways to reach new people for free, because each share puts your post in front of someone else\'s friends. Posts that get shared tend to be useful, local, surprising or easy to agree with: tips, checklists, before and after photos, community news, or a short video that answers a common question.',
  ),
  paragraph(
    'p-10',
    'Use a mix of formats. Photos, short videos, Reels, text updates and links all reach people differently, and your Insights will show which work best for your audience.',
  ),
  heading('h-use-facebook-s-free-discovery-tools', 'Use Facebook\'s Free Discovery Tools', 2),
  paragraph(
    'p-11',
    'Facebook gives Pages a few built in ways to reach new people.',
  ),
  paragraph(
    'p-12',
    'Invites are the simplest. You can invite your friends to follow the Page, but invite people who would actually be interested rather than everyone you know.',
    [
      { href: FB_INVITE_FRIENDS, label: 'invite your friends to follow the Page', external: true },
    ],
  ),
  paragraph(
    'p-13',
    'Similar Page suggestions show your Page to people browsing related Pages. Check that similar Page suggestions are turned on in your Page settings.',
    [
      { href: FB_SIMILAR_PAGE_SUGGESTIONS, label: 'similar Page suggestions', external: true },
    ],
  ),
  paragraph(
    'p-14',
    'Recommendations matter most. Facebook recommends posts and Pages to people who do not follow them yet, based on their interests. Public, original and engaging posts are the ones that get picked.',
    [
      { href: FB_RECOMMENDATIONS, label: 'recommends posts and Pages', external: true },
    ],
  ),
  paragraph(
    'p-15',
    'Outside Facebook, link to your Page from your website, email signature, receipts and other social profiles. Do not copy every post across every platform, though. Give people a reason to follow you in each place.',
  ),
  figure(
    'fig-discovery',
    `${IMAGE_DIR}/organic-page-discovery.png`,
    'Organic Facebook Page discovery paths including search, invitations, suggested content, similar Pages, shares and website links',
    'Organic follower growth can begin through several discovery paths.',
  ),
  heading('h-build-series-people-look-forward-to', 'Build Series People Look Forward To', 2),
  paragraph(
    'p-16',
    'A recurring post such as a weekly tip, a Friday customer spotlight or a monthly local guide gives people a reason to come back and a reason to follow so they do not miss the next one. When one topic does well, follow it up with a related angle instead of repeating the same post.',
  ),
  paragraph(
    'p-17',
    'Keep follow prompts natural. A short line such as "Follow for a new money saving tip every Monday" works because it tells people what they will get. Asking strangers to follow without a reason rarely does.',
  ),
  heading('h-reply-to-comments', 'Reply to Comments', 2),
  paragraph(
    'p-18',
    'Replies show visitors that a real person runs the Page and that questions get answered. They also keep conversations going under your posts, which helps those posts reach more people. Answer genuine questions, thank people for useful feedback and remove spam quickly.',
  ),
  heading('h-use-insights-to-see-what-works', 'Use Insights to See What Works', 2),
  paragraph(
    'p-19',
    'Your Page Insights in the professional dashboard or Meta Business Suite show views, reach, interactions and follower growth. Once a month, look at:',
    [
      { href: FB_PAGE_INSIGHTS, label: 'Page Insights', external: true },
    ],
  ),
  bullets('ul-1', [
    'which posts brought in the most new followers',
    'which topics and formats got the most shares and comments',
    'when your followers are most active',
    'where your followers are located, and whether that matches who you want to reach',
  ]),
  paragraph(
    'p-20',
    'Then make more of what works. Generic advice about the best day to post is no substitute for your own numbers.',
  ),
  figure(
    'fig-loop',
    `${IMAGE_DIR}/organic-growth-loop.png`,
    'Organic Facebook growth feedback loop: publish, measure, learn and improve',
    "Use your Page's own data instead of generic growth formulas.",
  ),
  heading('h-understand-reach-before-judging-growth', 'Understand Reach Before Judging Growth', 2),
  paragraph(
    'p-21',
    'Followers do not see every post. Facebook ranks each person\'s Feed and mixes in recommended content, so a post may reach only a small share of your followers and some people who do not follow you at all. Low reach on one post does not mean your Page is broken. Our guide on how Facebook Page reach works explains the factors involved.',
    [
      { href: '/learn/how-facebook-page-reach-works', label: 'how Facebook Page reach works' },
    ],
  ),
  paragraph(
    'p-22',
    'More engagement does not automatically turn into more followers either. A post can collect hundreds of reactions from people who never visit your Page. That is why a clear Page and consistent content matter so much: they turn interested viewers into followers.',
  ),
  {
      id: 'cta-fb-followers',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-facebook-followers',
      heading: 'Compare Facebook Follower Options',
      description:
        "Organic audience growth and follower-count services are different approaches. If you're comparing Facebook follower packages, review the available options without treating follower count as a guarantee of reach, engagement or business results.",
      label: 'View Facebook Followers',
    },
  heading('h-common-questions-about-shortcuts', 'Common Questions About Shortcuts', 2),
  paragraph(
    'p-23',
    'Giveaways can add followers quickly, but many of those people only wanted the prize and will not engage afterwards. If you run one, make the prize relevant to your real audience.',
  ),
  paragraph(
    'p-24',
    'Viral posts bring a spike, but they only build lasting growth if the Page gives new visitors a reason to stay. Following lots of other Pages in the hope they follow back does not attract people who care about your content.',
  ),
  paragraph(
    'p-25',
    'Posting more often only helps if the extra posts are worth seeing. A few good posts a week usually beat daily filler.',
  ),
  paragraph(
    'p-26',
    'Growth takes time. Most Pages grow gradually through steady, useful posting, with occasional jumps when a post gets shared widely.',
  ),
  heading('h-a-simple-30-day-plan', 'A Simple 30 Day Plan', 2),
  numbered('ol-2', [
    'Week one: complete every Page detail, write a clear intro, pin your best post and invite a small group of relevant friends.',
    'Week two: answer five common customer questions as separate posts.',
    'Week three: start a weekly series and post a short video or Reel.',
    'Week four: check Insights, see which posts brought in followers and plan next month around them.',
  ]),
  paragraph(
    'p-27',
    'A Page with fewer followers who engage, buy and recommend you is worth more than a bigger Page full of people who never notice your posts. Grow for the right audience and the numbers usually follow.',
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

export const HOW_TO_GET_MORE_FACEBOOK_PAGE_FOLLOWERS_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-how-to-get-more-facebook-page-followers',
    slug: SLUG,
    title: 'How to Get More Facebook Page Followers Organically',
    excerpt:
      'Practical ways to grow Facebook Page followers without ads: make the Page worth following, post content people share, use invites and similar Page suggestions, and learn from Insights.',
    content: CONTENT,
    blocks: BLOCKS,
    category: 'facebook',
    tags: ['followers', 'analytics', 'algorithm', 'engagement', 'business'],
    authorId: 'author-novalikes-editorial',
    featuredImage: {
      src: `${IMAGE_DIR}/featured.png`,
      alt: 'Sketch of the path from discovering a Facebook Page post to useful content, a Page visit and a follow decision',
      width: 1600,
      height: 900,
      priority: true,
    },
    readingTime: estimateReadingTimeMinutes(CONTENT),
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    showModifiedDate: true,
    seo: {
      title: 'How to Get More Facebook Page Followers Organically',
      description:
        'Learn practical ways to grow Facebook Page followers organically using better content, Page discovery, invitations, Insights and audience-focused publishing.',
      canonicalPath: `/learn/${SLUG}`,
      ogImage: `${IMAGE_DIR}/featured.png`,
      keywords: [
        'how to get more Facebook followers',
        'get Facebook Page followers',
        'increase Facebook followers organically',
        'grow Facebook Page',
        'Facebook Page follower growth',
        'organic Facebook followers',
      ],
    },
    relatedServices: ['buy-facebook-followers'],
    relatedArticles: [
      'facebook-followers-vs-page-likes-vs-post-likes',
      'how-facebook-page-reach-works',
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
    'People follow a Page when they can see what they will get from it.',
    'Most posts should be useful or interesting, not adverts.',
    'Shares, invites, similar Page suggestions and recommendations are the main free discovery routes.',
    'Weekly series give people a reason to follow and come back.',
    'Page Insights show which posts actually bring in followers.',
    'Followers do not see every post, so judge growth over weeks, not single posts.',
  ],
    faqs: [
    {
      id: 'faq-1',
      question: 'How can I get more followers on my Facebook Page for free?',
      answer:
        'Make the Page clear and complete, post useful content for a specific audience, invite relevant friends, keep similar Page suggestions turned on, encourage shares and use Insights to repeat what works.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Can I invite friends to follow my Facebook Page?',
      answer:
        'Yes. Facebook lets Page admins invite friends to follow the Page. Invite people who would actually be interested in your content.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Does posting every day get more Facebook followers?',
      answer:
        'Not by itself. Posting more only helps if each post is worth seeing. A few useful posts a week usually beat daily filler.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can people see posts from Pages they do not follow?',
      answer:
        'Yes. Facebook recommends posts and Pages to people based on their interests, so a strong post can reach people who have never visited your Page.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'How can I see which Facebook posts bring in followers?',
      answer:
        'Open Insights in your professional dashboard or Meta Business Suite and compare posts by views, interactions and follows over the past month.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Do giveaways help grow a Facebook Page?',
      answer:
        'They can add followers quickly, but many will only want the prize. Choose prizes that appeal to your real audience if you run one.',
      schemaEligible: true,
    },
  ],
  };
