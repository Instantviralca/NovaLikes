/**
 * Article #16 — How to Get Your First 1,000 TikTok Followers Organically
 * Scheduled: Monday 28 September 2026.
 * Informational / how-to intent. Distinct from /buy-tiktok-followers (buying intent).
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'how-to-get-1000-tiktok-followers';
const SCHEDULED_AT = '2026-09-28T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TT_GROW_AUDIENCE =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/how-to-grow-your-audience';
const TT_CREATOR_SEARCH_INSIGHTS =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TT_PUBLIC_OR_PRIVATE =
  'https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/making-your-account-public-or-private';

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
    'Your first 1,000 TikTok followers are the hardest to get. Nobody knows your account yet, there is no back catalogue for new viewers to browse, and every video has to earn attention on its own. The good news is that this stage is mostly about getting a few things right and repeating them, not about secret tricks.',
  ),
  paragraph(
    'p-2',
    'TikTok\'s own advice on growing your audience comes down to the same ideas this guide uses: know who you are making videos for, make content people want to watch, learn from your analytics and engage with the people who show up.',
    [
      { href: TT_GROW_AUDIENCE, label: 'growing your audience', external: true },
    ],
  ),
  heading('h-start-with-who-the-account-is-for', 'Start With Who the Account Is For', 2),
  paragraph(
    'p-3',
    'People follow an account because they expect more of something they liked. If your last ten videos cover cooking, gaming, a holiday and a product review, a new viewer has no idea what they would get by following.',
  ),
  paragraph(
    'p-4',
    'Try finishing this sentence: this account helps a specific kind of person with a specific thing. For example, "This account helps first time home cooks make quick weeknight dinners," or "This account explains budgeting for students." If you cannot finish it, viewers will struggle too.',
  ),
  paragraph(
    'p-5',
    'Then make your profile say the same thing. Your name, photo and bio should tell someone in two seconds what the account is about and why it is worth following. "Quick dinners for busy beginners, new recipe every weekday" works far better than "Food lover, living my best life."',
  ),
  figure(
    'fig-road',
    `${IMAGE_DIR}/road-to-1000-followers.png`,
    'The road to 1,000 TikTok followers: clear audience, useful topics, strong videos, profile visit, follow decision and repeat value',
    'There is no guaranteed timeline. Build a repeatable audience system.',
  ),
  heading('h-pick-three-to-five-content-pillars', 'Pick Three to Five Content Pillars', 2),
  paragraph(
    'p-6',
    'Pillars are the recurring topics your account covers. A cooking account might use quick recipes, kitchen basics, budget meals and common mistakes. Pillars keep you consistent without making every video the same, and they help both viewers and TikTok understand what you are about.',
  ),
  paragraph(
    'p-7',
    'When you are unsure what to make next, pick a pillar and answer one question within it.',
  ),
  heading('h-use-search-data-to-find-topics', 'Use Search Data to Find Topics', 2),
  paragraph(
    'p-8',
    'TikTok is now a search engine for many people, and it tells you what they are looking for. Creator Search Insights, found in TikTok Studio or by searching "Creator Search Insights" in the app, shows popular searches in your topic, including ones where people are not finding enough good videos.',
    [
      { href: TT_CREATOR_SEARCH_INSIGHTS, label: 'Creator Search Insights', external: true },
    ],
  ),
  paragraph(
    'p-9',
    'Specific questions beat broad topics. "Cooking tips" competes with millions of videos. "How to cook rice without it going sticky" matches exactly what someone typed, and a viewer who gets a clear answer has a good reason to check out the rest of your account. Say the topic in the video, put it in the caption and show it in on screen text so TikTok understands what the video covers. Our guide to TikTok SEO goes deeper on this.',
    [
      { href: '/learn/tiktok-seo', label: 'TikTok SEO' },
    ],
  ),
  figure(
    'fig-broad',
    `${IMAGE_DIR}/broad-to-specific.png`,
    'Broad TikTok topics narrowing into specific followable questions',
    'Specific topics give viewers a clearer reason to watch and understand your account.',
  ),
  heading('h-make-each-video-easy-to-watch-to-the-end', 'Make Each Video Easy to Watch to the End', 2),
  paragraph(
    'p-10',
    'Most viewers decide within a second or two whether to keep watching. Open with the result, the question or the most interesting moment, not a long greeting. Then deliver what you promised without dragging it out. A tight 25 second answer usually does better than a padded 60 second one.',
  ),
  paragraph(
    'p-11',
    'Watch your own videos with the sound off. If the topic is not obvious from the visuals and text, many viewers will scroll past.',
  ),
  heading('h-give-people-a-reason-to-follow', 'Give People a Reason to Follow', 2),
  paragraph(
    'p-12',
    'A view is not a follow. Someone can enjoy a video and move on. They follow when they believe more good content is coming. You can make that more likely by:',
  ),
  bullets('ul-1', [
    'building short series, such as "Part 1 of 5" or "Day 3 of learning guitar", so people want the next part',
    'ending a video by pointing to a related one, or answering a follow up question in a new video',
    'pinning your three best videos so profile visitors see your strongest work first',
    'replying to comments with video responses, which turns one viewer\'s question into new content',
  ]),
  paragraph(
    'p-13',
    'Comments are also free research. The questions people ask under your videos are often your next five video ideas.',
  ),
  heading('h-learn-from-your-analytics-early', 'Learn From Your Analytics Early', 2),
  paragraph(
    'p-14',
    'Switch to a creator or business account if you have not already, so you can see analytics in TikTok Studio. Look past the view count. For each video, check:',
  ),
  bullets('ul-2', [
    'average watch time and how many people watched to the end',
    'comments, shares and saves',
    'profile views',
    'new followers from that video',
  ]),
  paragraph(
    'p-15',
    'A video with 5,000 views and 80 new followers taught you more than one with 30,000 views and 5. Look for the topics and formats that bring in followers, then make more of them.',
  ),
  figure(
    'fig-metrics',
    `${IMAGE_DIR}/dont-measure-only-views.png`,
    'Do not measure only TikTok views: also consider likes, comments, profile visits and followers',
    'For your first 1,000 followers, identify content that creates follow intent, not just views.',
  ),
  paragraph(
    'p-16',
    'Do not panic over one quiet video, and do not delete everything that underperforms. Views go up and down from post to post. A pattern across several videos is what tells you something useful.',
  ),
  heading('h-post-consistently-not-constantly', 'Post Consistently, Not Constantly', 2),
  paragraph(
    'p-17',
    'TikTok does not publish an ideal number of posts per week. What matters is a pace you can keep while still making good videos. For most beginners, that means a few posts a week, every week, rather than ten videos one week and nothing for a month. More videos give you more chances to learn what works, but only if each one is worth watching.',
  ),
  heading('h-keep-the-account-public', 'Keep the Account Public', 2),
  paragraph(
    'p-18',
    'Growth needs discovery, and discovery needs a public account. Private accounts require you to approve every follower and do not reach people through the For You feed in the same way. Our guide on public vs private TikTok accounts explains the difference in full.',
    [
      { href: TT_PUBLIC_OR_PRIVATE, label: 'Private accounts', external: true },
      { href: '/learn/public-vs-private-tiktok-account', label: 'public vs private TikTok accounts' },
    ],
  ),
  heading('h-use-collaborations-duets-and-stitches-wi', 'Use Collaborations, Duets and Stitches Wisely', 2),
  paragraph(
    'p-19',
    'Working with creators in your niche puts you in front of people who already like your kind of content. Duets and Stitches can do the same when you add something real, such as a correction, a better method or a reaction that teaches something. Avoid Duets that only show you nodding along.',
  ),
  paragraph(
    'p-20',
    'Trends can help when they fit your topic. Built entirely around trends, an account attracts people who liked the trend, not people who want more of what you do.',
  ),
  heading('h-what-not-to-do', 'What Not to Do', 2),
  bullets('ul-3', [
    'Do not rely on follow for follow. Those followers rarely watch, which teaches you nothing.',
    'Do not chase a different audience every week. You end up with followers who do not care about your next post.',
    'Do not assume more followers automatically means more views. Each video still has to earn its audience.',
    'Do not use engagement bait such as "like if you agree" or misleading hooks. TikTok can stop recommending that kind of content.',
  ]),
  paragraph(
    'p-21',
    'Organic growth and paid follower services are different routes. If you are comparing follower options, keep your expectations clear: a follower count does not create views, comments or watch time on its own.',
  ),
  {
      id: 'cta-tt-followers',
      type: 'internal_cta',
      order: nextOrder(),
      href: '/buy-tiktok-followers',
      heading: 'Compare TikTok Follower Options',
      description:
        "Organic audience building and follower-count services are separate approaches. If you're comparing TikTok follower packages, review the available options without treating follower count as a guarantee of FYP reach, engagement or monetization.",
      label: 'View TikTok Followers',
    },
  heading('h-how-long-does-1-000-followers-take', 'How Long Does 1,000 Followers Take?', 2),
  paragraph(
    'p-22',
    'There is no fixed timeline and no set number of videos. Some accounts get there in a week because one video takes off. Many take a few months of steady posting. Accounts with a clear topic, useful videos and a consistent schedule tend to get there sooner.',
  ),
  paragraph(
    'p-23',
    'It helps to treat the journey in stages. Your first 100 followers show you which topics land. Between 100 and 500, refine your best formats and drop what does not work. From 500 to 1,000, double down on the series and topics that consistently bring in followers.',
  ),
  heading('h-does-1-000-followers-unlock-live', 'Does 1,000 Followers Unlock LIVE?', 2),
  paragraph(
    'p-24',
    'In many regions, going LIVE requires at least 1,000 followers and being 18 or older, but TikTok\'s requirements vary by country and change over time, so check the LIVE option in your own app. Reaching 1,000 does not change how TikTok ranks your videos. Each video is still shown based on how people respond to it. Our guide on how many followers you need to go LIVE covers the details.',
    [
      { href: '/learn/how-many-followers-to-go-live-on-tiktok', label: 'how many followers you need to go LIVE' },
    ],
  ),
  heading('h-a-simple-30-day-plan', 'A Simple 30 Day Plan', 2),
  numbered('ol-4', [
    'Week one: write your one sentence audience statement, update your profile, choose your pillars and post three to five videos.',
    'Week two: check analytics for profile views and new followers, and note which topics stood out.',
    'Week three: turn your best topic into a short series and answer comments with video replies.',
    'Week four: compare all your videos, keep what brought in followers and drop the rest.',
  ]),
  paragraph(
    'p-25',
    'Repeat that cycle. The first 1,000 followers are mostly a learning phase. Once you know what your audience wants, the next thousand usually comes faster.',
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

export const HOW_TO_GET_1000_TIKTOK_FOLLOWERS_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-how-to-get-1000-tiktok-followers',
  slug: SLUG,
  title: 'How to Get Your First 1,000 TikTok Followers Organically',
  excerpt:
    'A practical plan for reaching your first 1,000 TikTok followers: pick a clear audience, use TikTok search data, make videos that earn a follow, and learn from your analytics.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['followers', 'algorithm', 'analytics', 'creator', 'engagement'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Four steps from a creator profile and useful content to the right audience and a 1,000-follower milestone',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'How to Get Your First 1,000 TikTok Followers Organically',
    description:
      'Learn a practical strategy for reaching your first 1,000 TikTok followers organically using better topics, search insights, analytics and audience engagement.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'how to get 1000 followers on TikTok',
      'get TikTok followers organically',
      'first 1000 TikTok followers',
      'grow TikTok account',
      'TikTok follower growth',
      'how to grow on TikTok',
    ],
  },
  relatedServices: ['buy-tiktok-followers'],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'tiktok-seo',
    'how-tiktok-video-views-are-counted',
    'public-vs-private-tiktok-account',
    'how-many-followers-to-go-live-on-tiktok',
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
    'Pick a clear audience and make your profile explain it in seconds.',
    'Use three to five content pillars to stay consistent.',
    'Use Creator Search Insights to find specific questions people search for.',
    'Measure followers and profile views per video, not only views.',
    'Post at a pace you can keep, and keep the account public.',
    'There is no fixed timeline. Treat the first 1,000 as a learning phase.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How can I get 1,000 TikTok followers organically?',
      answer:
        'Choose a clear audience, post useful videos on a few consistent topics, use TikTok search data to pick subjects, give viewers reasons to follow, and use analytics to repeat what brings in followers.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'How long does it take to get 1,000 followers on TikTok?',
      answer:
        'There is no fixed timeline. Some accounts get there in days after one strong video, while most take weeks or months of steady posting.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'How many TikToks should I post to get 1,000 followers?',
      answer:
        'TikTok does not publish a number. Post at a pace you can keep, usually a few videos a week, and focus on making each one worth watching.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can TikTok search help me gain followers?',
      answer:
        'Yes. Videos that answer specific searches can keep getting views long after posting, and viewers who get a useful answer often check your profile.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does having 1,000 followers improve the TikTok algorithm?',
      answer:
        'No. TikTok recommends each video based on how people respond to it. A follower milestone does not change how your videos are ranked.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'What unlocks at 1,000 TikTok followers?',
      answer:
        'In many regions, going LIVE requires at least 1,000 followers and being 18 or older. Requirements vary by country, so check the LIVE option in your app.',
      schemaEligible: true,
    },
    {
      id: 'faq-7',
      question: 'Should I focus on views or followers?',
      answer:
        'Track both, but pay closest attention to which videos bring in followers. Those show you what your audience wants more of.',
      schemaEligible: true,
    },
  ],
};
