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
/** Full reader revision: tighter copy, fewer repeated source links. */
const UPDATED_AT = '2026-11-11T10:00:00.000Z';
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const IG_RANKING =
  'https://about.instagram.com/blog/announcements/instagram-ranking-explained';
const IG_ELIGIBILITY =
  'https://www.facebook.com/help/instagram/653964212890722';
const IG_INSIGHTS =
  'https://www.facebook.com/help/instagram/788388387972460';
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

function numbered(id: string, items: string[]): ArticleContentBlock {
  return { id, type: 'numbered_list', items, order: nextOrder() };
}

const BLOCKS: ArticleContentBlock[] = [
  paragraph(
    'p-1',
    'People talk about "the Instagram algorithm" as if one formula scores every post. In reality, Instagram uses separate ranking systems for Feed, Stories, Explore and Reels, because people use each part of the app for a different reason. Understanding that difference is far more useful than any list of hacks.',
  ),
  paragraph(
    'p-2',
    'Instagram explains this in its own guide to how Instagram ranking works. Each system looks at signals about the post, the person who shared it, the viewer\'s activity and the history between them, then predicts what that viewer is most likely to care about. Two people who follow the same account can see very different things.',
    [
      { href: IG_RANKING, label: 'how Instagram ranking works', external: true },
    ],
  ),
  heading('h-instagram-runs-several-systems-not-one', 'Instagram Runs Several Systems, Not One', 2),
  paragraph(
    'p-3',
    'Think about how one person uses the app in a single session. They tap through Stories to see what friends are doing, scroll Feed to catch up with accounts they follow, open Explore when they want something new, and swipe through Reels when they want to be entertained. Ranking all four the same way would make little sense.',
  ),
  paragraph(
    'p-4',
    'For creators, the lesson is to stop expecting every format to behave the same. A Story is mostly seen by people who already know you. A Reel is often shown to people who have never heard of you. Judging both by the same numbers leads to the wrong conclusions.',
  ),
  figure(
    'fig-four-systems',
    `${IMAGE_DIR}/four-ranking-systems.png`,
    'Simplified illustration of Instagram branching into Feed, Stories, Explore and Reels with different ranking contexts',
    'Simplified illustration based on Instagram\'s public ranking guidance. There is no single ranking formula for every part of Instagram.',
  ),
  heading('h-how-feed-ranking-works', 'How Feed Ranking Works', 2),
  paragraph(
    'p-5',
    'Feed mixes posts from accounts you follow with recommended posts from accounts you do not. Instagram ranks them using what it knows about the post, such as when it was shared and what it contains, along with your past interactions with that account and the kinds of posts you usually engage with.',
  ),
  paragraph(
    'p-6',
    'Instagram has said Feed does not simply favour Reels over photos. It tries to predict which post will be most valuable to each person, whatever the format. So choose the format that fits the idea. A carousel suits a step by step explanation, a Reel suits something that needs movement, and a single photo is often enough when one strong image tells the story.',
  ),
  paragraph(
    'p-7',
    'Following an account does not mean you will see every post it shares. Feed is personalised, and posts from accounts you interact with often tend to appear higher.',
  ),
  heading('h-how-stories-ranking-works', 'How Stories Ranking Works', 2),
  paragraph(
    'p-8',
    'Stories are about relationships. They appear in the bar at the top of the app and mostly come from accounts you follow. Instagram looks at which Stories you usually watch, which accounts you message or react to, and how close you seem to be to each account.',
  ),
  paragraph(
    'p-9',
    'That makes Stories a tool for keeping your current audience engaged rather than reaching new people. Behind the scenes updates, quick questions, polls, reminders about new posts and day to day moments all work well here, because they give your existing followers a reason to keep tapping through.',
  ),
  heading('h-how-explore-ranking-works', 'How Explore Ranking Works', 2),
  paragraph(
    'p-10',
    'Explore is built for discovery. Most of what appears there comes from accounts the viewer does not follow, chosen because they match interests Instagram has picked up from that person\'s activity. Someone who keeps engaging with kitchen makeovers and interior design will start seeing home content from accounts they have never visited.',
  ),
  paragraph(
    'p-11',
    'This is why a smaller account can show up in Explore. What matters is how well a post matches what a particular viewer is interested in, not the size of the account behind it.',
  ),
  figure(
    'fig-followers-vs-discovery',
    `${IMAGE_DIR}/followers-vs-discovery.png`,
    'Comparison of Instagram relationship surfaces Feed and Stories with discovery surfaces Explore and Reels',
    'Instagram personalizes every surface differently. Feed can also contain recommended content from non-followed accounts.',
  ),
  heading('h-how-reels-ranking-works', 'How Reels Ranking Works', 2),
  paragraph(
    'p-12',
    'Reels are the most discovery driven part of Instagram. Much of what people see in the Reels tab comes from accounts they do not follow, so Instagram leans heavily on predictions about whether a viewer will watch, like, share or open the creator\'s profile.',
  ),
  paragraph(
    'p-13',
    'Signals include the viewer\'s recent activity, any history they have with the creator, and information about the Reel itself, such as its audio and what is shown in it. Instagram does not publish a number of likes or views a Reel needs before it gets pushed further. A better question to ask is whether the Reel is clear, interesting and right for the people who are likely to see it. Then check your Insights to see how it actually did.',
  ),
  heading('h-recommendations-need-eligibility', 'Recommendations Need Eligibility', 2),
  paragraph(
    'p-14',
    'Content can only be shown to non-followers if it meets Instagram\'s recommendation eligibility guidelines. A post can be allowed on Instagram and still not be eligible to be recommended, for example if it falls into sensitive categories or comes from an account with recent violations. Private accounts are not eligible at all.',
    [
      { href: IG_ELIGIBILITY, label: 'recommendation eligibility guidelines', external: true },
    ],
  ),
  paragraph(
    'p-15',
    'Eligibility opens the door but does not decide how far a post travels. If your reach to non-followers drops suddenly, check Account Status in your settings before assuming a shadowban. It shows whether your account or content can currently be recommended.',
  ),
  figure(
    'fig-reaches-people',
    `${IMAGE_DIR}/how-content-reaches-people.png`,
    'Diagram of publishing Instagram content to an existing audience via Feed and Stories and a potential new audience via Reels, Explore and Feed Recommendations',
    'Recommendation eligibility does not guarantee distribution.',
  ),
  heading('h-original-content-matters-more-in-2026', 'Original Content Matters More in 2026', 2),
  paragraph(
    'p-16',
    'Instagram has been steadily pushing original work ahead of reposts. In 2024 it announced ranking changes that favour original creators, including replacing reposted content in recommendations with the original when it can identify it. In January 2026, Meta reported that 75% of Instagram recommendations in the US came from original posts by the end of 2025.',
    [
      { href: IG_ORIGINALITY, label: 'ranking changes that favour original creators', external: true },
    ],
  ),
  paragraph(
    'p-17',
    'Original does not have to mean expensive. Your own explanation, demonstration, opinion, footage or comparison all count. What does not count is downloading someone else\'s successful Reel and uploading it again with a new caption.',
  ),
  heading('h-viewers-can-now-shape-their-own-recommen', 'Viewers Can Now Shape Their Own Recommendations', 2),
  paragraph(
    'p-18',
    'Instagram also gives people more control over what they see. Its Your Algorithm controls let users pick topics they want more or less of, starting with Reels and Explore. For creators, this is another reminder that there is no single best type of content. People choose what they want to see, and the clearer your topic is, the easier it is for the right viewers to find you.',
    [
      { href: META_YOUR_ALGORITHM, label: 'Your Algorithm controls', external: true },
    ],
  ),
  heading('h-common-algorithm-myths', 'Common Algorithm Myths', 2),
  paragraph(
    'p-19',
    'A few claims get repeated so often that they sound official. None of these come from Instagram:',
  ),
  bullets('ul-1', [
    'Saves are worth a fixed number of likes.',
    'You need a certain engagement rate to reach Explore.',
    'Comments in the first few minutes decide a post\'s fate.',
    'A specific number of hashtags or a set Reel length unlocks reach.',
  ]),
  paragraph(
    'p-20',
    'Engagement does matter, because likes, comments, shares, saves and watch time help Instagram predict what people want. There is simply no public formula that turns those actions into a score.',
  ),
  paragraph(
    'p-21',
    'Posting time works the same way. Sharing when your audience is online can help a post get early attention from the right people, but there is no universal best minute. Your own Insights will tell you far more than a generic chart.',
  ),
  paragraph(
    'p-22',
    'Follower count does not decide reach either. A large account can post something that barely travels, and a small account can reach thousands of non-followers with one useful Reel. If you want to understand how those numbers relate, our guide on Instagram followers, likes, views and comments explains what each metric measures.',
    [
      { href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments', label: 'Instagram followers, likes, views and comments' },
    ],
  ),
  heading('h-feed-stories-explore-and-reels-compared', 'Feed, Stories, Explore and Reels Compared', 2),
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
    'p-23',
    'This is a simplified way to think about Instagram\'s public guidance, not an official formula.',
  ),
  heading('h-what-you-can-actually-control', 'What You Can Actually Control', 2),
  paragraph(
    'p-24',
    'You cannot control how Instagram ranks content. You can control what you publish and how you learn from it.',
  ),
  numbered('ol-2', [
    'Decide which part of the app a piece of content is for before you make it.',
    'Make the topic clear in the first second of a Reel or the first slide of a carousel.',
    'Post original work that reflects your own knowledge, style or experience.',
    'Stay close to a few topics so Instagram, and viewers, know what your account is about.',
    'Use Instagram Insights to compare posts and look for patterns, rather than reacting to one result.',
    'If reach drops sharply, check Account Status before changing everything.',
  ]),
  paragraph(
    'p-25',
    'Instagram\'s Insights help page explains what each number means. One post doing well can be luck. Several posts on the same theme doing well is a pattern worth repeating. Instagram\'s Community Guidelines also prohibit artificially collecting likes or followers, so focus your effort on content people choose to engage with.',
    [
      { href: IG_INSIGHTS, label: 'Insights help page', external: true },
    ],
  ),
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
    'Instagram ranks Feed, Stories, Explore and Reels with separate systems. Here is what each one looks at, why originality matters more in 2026, and what creators can actually control.',
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
  updatedAt: UPDATED_AT,
  showModifiedDate: true,
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
    'Instagram uses separate ranking systems for Feed, Stories, Explore and Reels.',
    'Stories favour existing relationships, while Explore and Reels focus on discovery.',
    'Recommendations are personalised, so different viewers see different content.',
    'Only eligible public content can be recommended to non-followers.',
    'Meta reported that 75% of US recommendations came from original posts by late 2025.',
    'There is no official formula that turns a set number of likes or comments into reach.',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Is there one Instagram algorithm?',
      answer:
        'No. Instagram uses different ranking systems for Feed, Stories, Explore and Reels, because people use each part of the app for a different reason.',
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'Does Instagram show my posts to all my followers?',
      answer:
        'Not always. Feed and Stories are ranked for each viewer, so followers who interact with you more often tend to see your posts sooner.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'How does Instagram decide what goes on Explore?',
      answer:
        'Explore shows content from accounts you do not follow that matches interests Instagram has learned from your activity. Content must also meet Instagram\'s recommendation guidelines.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Does Instagram prefer Reels over photos?',
      answer:
        'Instagram says Feed does not simply favour Reels over photos. It predicts which post will be most valuable to each person, whatever the format.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Does having more followers mean more reach?',
      answer:
        'Not by itself. Reach depends on how people respond to each post. Small accounts can reach many non-followers, and large accounts can post things that barely travel.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'What should I do if my reach suddenly drops?',
      answer:
        'Check Account Status in your settings to see if your account or content can be recommended, then compare recent posts in Insights to look for a pattern.',
      schemaEligible: true,
    },
  ],
};
