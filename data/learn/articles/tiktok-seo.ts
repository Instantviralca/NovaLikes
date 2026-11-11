/**
 * Article #4 — TikTok SEO in 2026
 * Scheduled: Monday 31 August 2026.
 * Informational intent. Does not claim ranking or algorithm-boost guarantees.
 */

import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';
import type { LearnArticleRecord } from '@/types/learn';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

const SLUG = 'tiktok-seo';
const SCHEDULED_AT = '2026-08-31T08:00:00.000Z';
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_CSI =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TIKTOK_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';
const TIKTOK_CREATIVE_CENTER =
  'https://ads.tiktok.com/business/creativecenter/trends/hub/pc/en';

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
    'p-1',
    'Many people now open TikTok to look things up, not just to scroll. They search for recipes, product reviews, travel ideas, how to fix things and answers to everyday questions. TikTok SEO simply means making videos that match those searches clearly enough for TikTok to show them, and useful enough for viewers to stay.',
  ),
  paragraph(
    'p-2',
    'It is not about stuffing keywords. TikTok\'s own explanation of how it recommends content says search results are shaped by how well a video matches the search, along with hashtags, sounds and how people interact with it. Relevance starts with the video itself.',
    [
      { href: TIKTOK_RECOMMENDS, label: 'how it recommends content', external: true },
    ],
  ),
  heading('h-how-tiktok-search-works', 'How TikTok Search Works', 2),
  paragraph(
    'p-3',
    'When someone types a search, TikTok shows matching videos, accounts, sounds and hashtags. To decide what to show, it looks at information about each video, such as what is said, shown and written in it, and at how people behave, such as which results they watch and engage with. TikTok also says the weight of each factor differs between search and the For You feed.',
  ),
  paragraph(
    'p-4',
    'Nobody outside TikTok can see the exact ranking system. What you can control is whether your video is clearly about the thing someone searched, and whether it answers it well.',
  ),
  figure(
    'fig-search-discovery',
    `${IMAGE_DIR}/search-discovery.png`,
    'Simplified illustration of TikTok search discovery: search topic, content relevance and viewer response, not an official ranking formula',
    'Simplified illustration, not an official ranking formula. Clear topic + useful content + relevant context.',
  ),
  heading('h-start-with-what-the-searcher-wants', 'Start With What the Searcher Wants', 2),
  paragraph(
    'p-5',
    'Before you think about keywords, think about the person searching. "Phone camera settings", "best iPhone camera settings" and "iPhone camera settings for low light video" all sound similar, but the last person wants something very specific. A general overview will not help them.',
  ),
  paragraph(
    'p-6',
    'Ask three questions before you film:',
  ),
  numbered('ol-1', [
    'What exactly is this person looking for?',
    'What is the quickest useful answer?',
    'What might they want to know next?',
  ]),
  paragraph(
    'p-7',
    'The third question gives you your follow up video.',
  ),
  heading('h-find-topics-with-creator-search-insights', 'Find Topics With Creator Search Insights', 2),
  paragraph(
    'p-8',
    'Creator Search Insights is the most useful free tool for TikTok SEO. You can find it in TikTok Studio, or by typing "Creator Search Insights" into the search bar. It shows:',
    [
      { href: TIKTOK_CSI, label: 'Creator Search Insights', external: true },
    ],
  ),
  bullets('ul-2', [
    'popular searches in different categories',
    'related searches around a topic',
    'a content gap filter, showing searches where people are not finding enough good videos',
    'searches made by your own followers, where available',
    'search analytics for your published posts',
  ]),
  paragraph(
    'p-9',
    'The content gap filter is especially useful for smaller creators, because it points to searches where there is less competition.',
  ),
  paragraph(
    'p-10',
    'A good topic is specific enough to answer in one video. "Fitness" is too broad. "Home workouts" is closer. "15 minute home workout for beginners with no equipment" is something you can actually film.',
  ),
  figure(
    'fig-broad-specific',
    `${IMAGE_DIR}/broad-to-specific.png`,
    'Infographic narrowing Fitness to Home Fitness to Home Workouts to a 15-minute beginner home workout',
    'Choose a topic specific enough to answer clearly in one video.',
  ),
  heading('h-make-the-topic-obvious-in-the-video', 'Make the Topic Obvious in the Video', 2),
  paragraph(
    'p-11',
    'Once you have your topic, make it clear from the first second. Say it out loud, show it in on screen text and mention it in the caption, in normal sentences. "Here are three ways to take better food photos on your iPhone" tells viewers and TikTok exactly what the video covers. "You will not believe this" tells them nothing.',
  ),
  paragraph(
    'p-12',
    'Write captions for people first. "How to edit TikTok captions after posting, plus what to check before you publish" is clearer than a string of repeated phrases. Keyword stuffing makes the caption harder to read and does not make the video more useful.',
  ),
  paragraph(
    'p-13',
    'Use a few hashtags that genuinely describe the video, rather than dozens of trending ones. Sounds can add context too, but a trending sound will not make an unclear video rank for a search.',
  ),
  heading('h-answer-the-question-quickly', 'Answer the Question Quickly', 2),
  paragraph(
    'p-14',
    'People who search usually want the answer now. Get to the useful part fast, then add detail. If someone searches how to turn off their activity status, show them where the setting is before explaining why they might want to.',
  ),
  paragraph(
    'p-15',
    'Match the format to the question. A how to search needs a demonstration. A comparison search needs a side by side. A "best places" search suits a list or a location walk through. An explanation suits a talking video with simple visuals.',
  ),
  figure(
    'fig-framework',
    `${IMAGE_DIR}/search-framework.png`,
    'Four-step TikTok search content framework: Search, Intent, Content and Measure',
    'Research → Answer → Measure → Repeat',
  ),
  heading('h-build-topic-clusters', 'Build Topic Clusters', 2),
  paragraph(
    'p-16',
    'One good search video helps. Several videos answering different questions within the same subject help more, because someone who watches one is likely to want the others. A photography account might cover phone settings, food photos, low light video, editing apps and composition tips as separate videos that link naturally to each other.',
  ),
  paragraph(
    'p-17',
    'Avoid making several near identical videos for slightly different wordings of the same search. Each video should answer a different question.',
  ),
  heading('h-check-search-analytics-after-posting', 'Check Search Analytics After Posting', 2),
  paragraph(
    'p-18',
    'TikTok SEO does not stop when you publish. Creator Search Insights includes search analytics showing how your posts perform in search results over a date range you choose. Use it to see which topics bring in search viewers, then make follow ups on those topics.',
  ),
  paragraph(
    'p-19',
    'Search videos can also keep getting views for weeks or months, long after the first day. Do not delete a useful video just because it started slowly.',
  ),
  heading('h-what-does-not-help-tiktok-search', 'What Does Not Help TikTok Search', 2),
  paragraph(
    'p-20',
    'A few common beliefs do not hold up:',
  ),
  bullets('ul-3', [
    'More followers do not automatically mean higher search rankings. Relevance and viewer response matter more.',
    'More hashtags do not mean better ranking. Use a few that fit.',
    'Bought views do not improve search position. They change a view count, not how well a video matches a search.',
    'Trends only help when they fit your topic.',
  ]),
  paragraph(
    'p-21',
    'TikTok\'s Creative Center is useful for spotting trends, while Creator Search Insights shows what people are actively looking for. Search and the For You feed are related but separate. A search friendly video can also be recommended on the For You feed, but doing well in one does not mean doing well in the other. For more on how the different TikTok numbers relate, see our guides on TikTok followers, likes and views and why views do not always turn into followers.',
    [
      { href: TIKTOK_CREATIVE_CENTER, label: 'Creative Center', external: true },
      { href: '/learn/tiktok-followers-vs-likes-vs-views', label: 'TikTok followers, likes and views' },
      { href: '/learn/tiktok-views-but-no-followers', label: 'why views do not always turn into followers' },
    ],
  ),
  heading('h-a-simple-tiktok-seo-workflow', 'A Simple TikTok SEO Workflow', 2),
  numbered('ol-4', [
    'Choose a broad subject your account covers.',
    'Open Creator Search Insights and look at popular searches, related searches and content gaps.',
    'Pick one specific search intent.',
    'Plan the direct answer viewers should have by the end.',
    'Make the topic clear in your first line, on screen text and caption.',
    'Publish with a few relevant hashtags.',
    'Review search analytics after a week or two and plan a follow up.',
  ]),
  paragraph(
    'p-22',
    'TikTok SEO is not a trick. It is the habit of making videos about things people are looking for, saying clearly what each video is about and giving a good answer. Do that consistently and search becomes a steady source of viewers.',
  ),
];

const CONTENT = BLOCKS.map((block) => {
  if (block.type === 'paragraph') return block.text;
  if (block.type === 'heading') return block.text;
  if (block.type === 'bulleted_list' || block.type === 'numbered_list') {
    return block.items.join(' ');
  }
  if (block.type === 'service_cluster_cta') {
    return `${block.heading} ${block.text}`;
  }
  return '';
})
  .filter(Boolean)
  .join('\n\n');

export const TIKTOK_SEO_ARTICLE: LearnArticleRecord = {
  id: 'learn-article-tiktok-seo',
  slug: SLUG,
  title: 'TikTok SEO in 2026: How to Rank Videos in TikTok Search',
  excerpt:
    'TikTok SEO means making videos that match what people search for inside TikTok. Here is how TikTok search works, how to find topics with Creator Search Insights, and what actually helps.',
  content: CONTENT,
  blocks: BLOCKS,
  category: 'tiktok',
  tags: ['algorithm', 'analytics', 'creator', 'views', 'followers'],
  authorId: 'author-novalikes-editorial',
  featuredImage: {
    src: `${IMAGE_DIR}/featured.png`,
    alt: 'Editorial illustration of TikTok search discovery with a search bar and video results, without fake ranking numbers',
    width: 1600,
    height: 900,
    priority: true,
  },
  readingTime: estimateReadingTimeMinutes(CONTENT),
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
  seo: {
    title: 'TikTok SEO in 2026: How to Rank in TikTok Search',
    description:
      'Learn how TikTok search works, how to find topics people search for, and how to optimize videos for clearer search relevance.',
    canonicalPath: `/learn/${SLUG}`,
    ogImage: `${IMAGE_DIR}/featured.png`,
    keywords: [
      'TikTok SEO',
      'TikTok search SEO',
      'how to rank on TikTok search',
      'TikTok keywords',
      'TikTok search ranking',
      'TikTok Creator Search Insights',
    ],
  },
  relatedServices: [
    'buy-tiktok-followers',
    'buy-tiktok-likes',
    'buy-tiktok-views',
  ],
  relatedArticles: [
    'tiktok-followers-vs-likes-vs-views',
    'tiktok-views-but-no-followers',
    'public-vs-private-tiktok-account',
    'how-to-get-1000-tiktok-followers',
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
    'TikTok SEO means making videos that match what people search for inside TikTok.',
    'TikTok ranks search results using video content, hashtags, sounds and viewer behaviour.',
    'Creator Search Insights shows popular searches, related searches and content gaps.',
    'Say the topic clearly in the video, on screen text and caption, without stuffing.',
    'Answer the question quickly and match the format to the search.',
    'Review search analytics and build follow up videos around topics that work.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is TikTok SEO?',
      answer:
        'TikTok SEO is the practice of making videos that match what people search for inside TikTok, so they appear in search results and answer the viewer\'s question well.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'How do I find keywords for TikTok?',
      answer:
        'Use Creator Search Insights in TikTok Studio to see popular searches, related searches and content gaps. TikTok\'s search suggestions also show what people type.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Do hashtags help TikTok SEO?',
      answer:
        'Relevant hashtags help describe a video, but more hashtags do not mean better rankings. Use a few that fit the content.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Should I say the keyword in my TikTok?',
      answer:
        'Saying the topic clearly at the start helps viewers understand the video. Put it in on screen text and the caption too, in natural language.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Do more followers help TikTok search rankings?',
      answer:
        'Not directly. Search results depend mainly on how well a video matches the search and how people respond to it.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Can older TikTok videos rank in search?',
      answer:
        'Yes. Search videos can keep getting views for months. Check search analytics before deleting anything.',
      schemaEligible: true,
    },
  ],
};
