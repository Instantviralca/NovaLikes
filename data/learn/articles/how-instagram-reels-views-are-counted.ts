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
/** Public live date - NovaLikes production launch (registry commit 23c2480). Editorial target remains SCHEDULED_AT. */
const PUBLISHED_AT = '2026-08-22T08:00:00.000Z';
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_REEL_INSIGHTS =
  'https://www.facebook.com/help/instagram/202865988324236';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
const IG_CREATORS_BREAKTHROUGH =
  'https://creators.instagram.com/blog/helping-creators-of-all-sizes-break-through';
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
    'A Reel\'s view count looks simple, but it raises a lot of questions. Does a replay count? Can one person add several views? Why is the view number higher than the number of accounts reached? The answers all come from one definition.',
  ),
  paragraph(
    'p-2',
    'In its Reel Insights help page, Instagram defines Views as the number of times a Reel starts to play or replay. It defines Accounts reached separately, as the number of unique accounts that saw the Reel at least once. Views measure playback. Reach measures people. Most confusion about Reel numbers disappears once you keep those two apart.',
    [
      { href: IG_REEL_INSIGHTS, label: 'Reel Insights help page', external: true },
    ],
  ),
  heading('h-what-counts-as-a-reel-view', 'What Counts as a Reel View?', 2),
  paragraph(
    'p-3',
    'A view is counted when the Reel starts playing, and again each time it replays. Instagram does not say a viewer has to watch the whole Reel, or a set number of seconds, for the view to count. You will still see claims online about three second or full watch rules, but those come from older metrics and other platforms, not from Instagram\'s current definition.',
  ),
  paragraph(
    'p-4',
    'That makes the view count a measure of activity, not an audience headcount. If you want to know how many different people saw a Reel, Accounts reached is the number to look at.',
  ),
  figure(
    'fig-views-reach',
    `${IMAGE_DIR}/reel-views-vs-reach.png`,
    'Simplified example with three people watching a Reel for four total plays, showing views as four plays or replays and accounts reached as three unique accounts',
    'Views can be higher than reach because replays are included in the Reel view metric. Simplified example.',
  ),
  heading('h-why-views-can-be-higher-than-reach', 'Why Views Can Be Higher Than Reach', 2),
  paragraph(
    'p-5',
    'Imagine three people watch your Reel. Two watch it once, and one watches it twice. Instagram would show 4 views but 3 accounts reached, because one person replayed it.',
  ),
  paragraph(
    'p-6',
    'Scale that up and the gap is normal. A Reel with 25,000 views and 18,000 accounts reached does not have an error or fake activity. Some viewers simply watched more than once, or came across the Reel again later. A short, looping Reel usually shows a bigger gap than a long one, because replays happen more easily.',
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
    'p-7',
    'The same logic applies to how you describe results. "The Reel got 20,000 views" is accurate. "20,000 people watched the Reel" is only accurate if your reach figure says so.',
  ),
  heading('h-watch-time-tells-you-how-people-watched', 'Watch Time Tells You How People Watched', 2),
  paragraph(
    'p-8',
    'Reel Insights also show Watch time, the total time your Reel was played, and Average watch time per play. These numbers add depth that views cannot.',
  ),
  paragraph(
    'p-9',
    'Two Reels might each have 10,000 views, but if viewers stay for most of one and leave the other after a couple of seconds, they performed very differently. Average watch time is most useful when you compare Reels of similar length and style on your own account. There is no published percentage that unlocks Explore or wider recommendations, so treat it as a way to learn what holds your audience, not as a target.',
  ),
  figure(
    'fig-three-q',
    `${IMAGE_DIR}/three-different-questions.png`,
    'An Instagram Reel connected to three questions: views for plays and replays, reach for unique accounts, and watch time for total viewing duration',
    'One Reel can produce three different numbers because the metrics measure different things.',
  ),
  heading('h-why-views-can-be-much-higher-than-follow', 'Why Views Can Be Much Higher Than Followers', 2),
  paragraph(
    'p-10',
    'Followers belong to your account. Views belong to each Reel. Instagram\'s creator team has pointed out that people often watch Reels from accounts they do not follow, which is why a Reel can collect far more views than the account has followers. An account with 5,000 followers getting 50,000 views on a Reel is not unusual at all. It means the Reel reached people beyond the existing audience, and some of them watched more than once.',
    [
      { href: IG_CREATORS_BREAKTHROUGH, label: 'people often watch Reels from accounts they do not follow', external: true },
    ],
  ),
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
  heading('h-why-a-reel-can-have-many-views-but-few-l', 'Why a Reel Can Have Many Views but Few Likes or Follows', 2),
  paragraph(
    'p-11',
    'Watching, liking and following are separate decisions. Many people watch a Reel, maybe replay it, and keep scrolling without tapping anything. Fewer leave a like, fewer still comment or save, and only a small share go on to follow the account.',
  ),
  paragraph(
    'p-12',
    'Reel Insights track each of these separately, including how many follows a Reel brought in. So high views with modest likes is not strange. It just means lots of people watched and fewer chose to interact. If you want the bigger picture of how these numbers relate, our guide on Instagram followers, likes, views and comments covers each one.',
    [
      { href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments', label: 'Instagram followers, likes, views and comments' },
    ],
  ),
  figure(
    'fig-actions',
    `${IMAGE_DIR}/view-to-optional-actions.png`,
    'Flow from a Reel appearing and receiving a view to optional later actions such as like, comment, save, share or follow',
    'A view does not automatically create any of the next actions.',
  ),
  heading('h-reel-views-compared-with-story-views', 'Reel Views Compared With Story Views', 2),
  paragraph(
    'p-13',
    'Instagram now uses Views across most formats. Its broader Insights documentation describes Views as the number of times content was played or displayed, whether that content is a Reel, post, Story or Live video.',
    [
      { href: IG_INSIGHTS, label: 'Insights documentation', external: true },
    ],
  ),
  paragraph(
    'p-14',
    'For Stories, Instagram also shows Viewers, the unique accounts that saw it, and lets you see the list of who watched. Reels work differently. You get totals such as views and accounts reached, but not a list of the individual people who watched. If you see older articles talking about Plays or Impressions, those are earlier labels. Go by the names in your own Insights today.',
  ),
  heading('h-do-bought-views-help-a-reel-get-recommen', 'Do Bought Views Help a Reel Get Recommended?', 2),
  paragraph(
    'p-15',
    'No. Instagram\'s ranking systems look at how people respond to a Reel and predict who else might enjoy it. Instagram\'s Community Guidelines also prohibit artificially collecting engagement, and the platform can remove activity it considers inauthentic. Any view service is separate from Instagram\'s own promotion tools and does not change how the platform ranks content. If you want to understand what does influence recommendations, read our guide on how the Instagram algorithm works.',
    [
      { href: '/learn/how-instagram-algorithm-works', label: 'how the Instagram algorithm works' },
    ],
  ),
  paragraph(
    'p-16',
    'Boosted Reels are a different case. When you pay Instagram to promote a Reel, your Insights separate paid and organic results where that data is available, so compare them separately.',
  ),
  heading('h-what-to-do-when-views-stall', 'What to Do When Views Stall', 2),
  paragraph(
    'p-17',
    'A view count that stops climbing does not tell you why on its own. Before deciding you have been shadowbanned or that a Reel failed, check:',
  ),
  numbered('ol-1', [
    'Accounts reached, to see whether fewer new people saw it.',
    'Average watch time, to see whether people left early.',
    'Likes, comments, saves and shares, to see whether those who watched cared.',
    'Follows from the Reel, to see whether it brought in new people.',
    'Account Status, to confirm your content can still be recommended.',
  ]),
  paragraph(
    'p-18',
    'Then compare it with similar Reels you have posted. One Reel is one data point. A pattern across several posts tells you far more, and Instagram\'s own creator guide to Insights suggests using them in exactly that way.',
    [
      { href: IG_CREATORS_INSIGHTS, label: 'creator guide to Insights', external: true },
    ],
  ),
  paragraph(
    'p-19',
    'Do not delete a Reel just because its views are lower than you hoped. It may still answer a question, earn saves or bring in followers, and it gives you information to improve the next one.',
  ),
  heading('h-which-reel-did-better', 'Which Reel Did Better?', 2),
  paragraph(
    'p-20',
    'Say one Reel has 100,000 views and few profile visits, and another has 30,000 views but more saves, comments and new followers. Which performed better depends on your goal. If you wanted visibility, the first one won. If you wanted to grow an engaged audience, the second one probably did more for you.',
  ),
  paragraph(
    'p-21',
    'That is the real point of understanding how views are counted. A view tells you a Reel played. It does not tell you that a unique person watched, that they finished it, or that they cared enough to like, save or follow. Read views alongside reach, watch time and interactions, and Reel analytics become much easier to use.',
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

export const HOW_INSTAGRAM_REELS_VIEWS_ARE_COUNTED_ARTICLE: LearnArticleRecord =
  {
    id: 'learn-article-how-instagram-reels-views-are-counted',
    slug: SLUG,
    title: 'How Are Instagram Reels Views Counted?',
    excerpt:
      'Instagram counts a Reel view every time it starts to play or replay, so views can be higher than the number of people reached. Here is how views, reach and watch time differ.',
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
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    showModifiedDate: true,
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
    'Instagram counts a Reel view each time it starts to play or replay.',
    'Accounts reached shows how many unique accounts saw the Reel.',
    'Views are often higher than reach because replays count.',
    'Watch time and average watch time show how long people actually watched.',
    'Reels can reach far more people than the account\'s follower count.',
    'Views do not automatically turn into likes, follows or recommendations.',
  ],
    faqs: [
    {
      id: 'faq-1',
      question: 'What counts as a view on Instagram Reels?',
      answer:
        'Instagram counts a view each time a Reel starts to play or replays. There is no published minimum watch time.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Do replays count as Reel views?',
      answer:
        'Yes. Instagram includes replays in the Views metric, which is why one person can add more than one view.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Why are my Reel views higher than accounts reached?',
      answer:
        'Views include replays, while Accounts reached counts each unique account only once. Some people watched more than once.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Can I see who viewed my Instagram Reel?',
      answer:
        'No. Reel Insights show totals such as views and accounts reached, not a list of individual viewers. Stories are the format where you can see who watched.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Why do my Reels get views but no followers?',
      answer:
        'Watching and following are separate decisions. Many people enjoy a Reel without choosing to follow the account. Reel Insights show how many follows each Reel brought in.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Is watch time more important than views?',
      answer:
        'They answer different questions. Views show how often the Reel played, and watch time shows how long people stayed. Looking at both gives a clearer picture.',
      schemaEligible: true,
    },
  ],
  };
