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
const IMAGE_DIR = `/assets/images/learn/${SLUG}`;

const TIKTOK_CSI =
  'https://support.tiktok.com/en/using-tiktok/growing-your-audience/creator-search-insights';
const TIKTOK_DISCOVER =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/discover-and-search';
const TIKTOK_RECOMMENDS =
  'https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content';
const TIKTOK_CREATIVE_CENTER =
  'https://ads.tiktok.com/business/creativecenter/trends/hub/pc/en';
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
    'TikTok is not only a feed where people scroll through recommended videos.',
  ),
  paragraph(
    'p-open-2',
    "It also has a search system people use to find videos, creators, hashtags, topics and other content. TikTok's own search documentation describes search as a way to discover specific content as well as trending videos, hashtags and creators. (TikTok Support)",
    [{ href: TIKTOK_DISCOVER, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-open-3', 'That creates an opportunity for creators.'),
  paragraph(
    'p-open-4',
    'Instead of making a video and hoping the right audience happens to encounter it, you can create content around questions and topics people are actively looking for.',
  ),
  paragraph(
    'p-open-5',
    'That is what people generally mean when they talk about TikTok SEO.',
  ),
  paragraph(
    'p-open-6',
    'TikTok itself does not present a guaranteed “SEO formula.” A practical definition is simply:',
  ),
  paragraph(
    'p-open-7',
    "TikTok SEO is the process of making a video's topic and purpose clear enough that it can be understood and potentially surfaced for relevant searches.",
  ),
  paragraph('p-open-8', 'The important word is relevant.'),
  paragraph(
    'p-open-9',
    'The goal is not to stuff as many keywords as possible into a caption.',
  ),
  paragraph(
    'p-open-10',
    'The goal is to make genuinely useful content about a clearly defined topic.',
  ),

  heading('h-what', 'What Is TikTok SEO?', 2),
  paragraph(
    'p-what-1',
    'TikTok SEO is a convenient industry term for optimizing content around searches people perform inside TikTok.',
  ),
  paragraph('p-what-2', 'Imagine someone searches:'),
  paragraph('p-what-3', 'how to clean white shoes'),
  paragraph(
    'p-what-4',
    'TikTok needs to decide which content may be relevant to that query.',
  ),
  paragraph(
    'p-what-5',
    'TikTok says its recommendation systems use several categories of information. For Search specifically, content information can include how well a post matches the search inquiry, hashtags and sounds, while user behaviour and other information can also affect recommendations. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-what-6', 'That means creators should think beyond:'),
  paragraph('p-what-7', '“How do I make this video go viral?”'),
  paragraph('p-what-8', 'and also ask:'),
  paragraph(
    'p-what-9',
    '“What specific question or topic does this video answer?”',
  ),
  paragraph(
    'p-what-10',
    'That shift is the foundation of useful TikTok SEO.',
  ),

  heading('h-how', 'How Does TikTok Search Work?', 2),
  paragraph(
    'p-how-1',
    'TikTok allows users to enter a search and explore matching content, including videos, creators, hashtags and other results. (TikTok Support)',
    [{ href: TIKTOK_DISCOVER, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-how-2',
    'The exact ranking system is not something creators can control directly.',
  ),
  paragraph(
    'p-how-3',
    'However, TikTok does publicly describe several types of information its recommendation systems may consider.',
  ),
  paragraph(
    'p-how-4',
    'For search-related recommendations, this can include:',
  ),
  bullets('ul-how-signals', [
    'how closely content matches the search inquiry',
    'hashtags',
    'sounds',
    'previous search behaviour',
    'content people watch, like, share, comment on or skip',
  ]),
  paragraph(
    'p-how-5',
    'TikTok also says the weight of different factors can vary depending on the recommendation surface. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-how-6',
    'This is why TikTok SEO should not be reduced to putting a keyword in one place.',
  ),
  paragraph(
    'p-how-7',
    'Search relevance starts with the actual content.',
  ),
  figure(
    'fig-search-discovery',
    `${IMAGE_DIR}/search-discovery.png`,
    'Simplified illustration of TikTok search discovery: search topic, content relevance and viewer response, not an official ranking formula',
    'Simplified illustration, not an official ranking formula. Clear topic + useful content + relevant context.',
  ),

  heading('h-intent', 'Start With Search Intent, Not Keywords', 2),
  paragraph(
    'p-intent-1',
    'Before choosing a keyword, understand what the person searching actually wants.',
  ),
  paragraph('p-intent-2', 'Consider these searches:'),
  bullets('ul-intent-examples', [
    'TikTok camera settings',
    'best TikTok camera settings',
    'TikTok camera settings for low light',
  ]),
  paragraph('p-intent-3', 'All three involve camera settings.'),
  paragraph(
    'p-intent-4',
    'But the intent becomes more specific each time.',
  ),
  paragraph(
    'p-intent-5',
    'Someone searching the third phrase probably does not want a broad introduction to phone cameras.',
  ),
  paragraph(
    'p-intent-6',
    'They want help specifically with low-light filming.',
  ),
  paragraph('p-intent-7', 'That should influence the video.'),
  paragraph(
    'p-intent-8',
    'A strong search-focused TikTok should answer the actual problem rather than merely repeating the search phrase.',
  ),
  heading('h-intent-q', 'Ask Three Questions Before Creating', 3),
  heading('h-intent-q1', '1. What is the person searching for?', 3),
  bullets('ul-intent-q1', [
    'Information?',
    'A tutorial?',
    'A comparison?',
    'An explanation?',
    'A product?',
    'A location?',
  ]),
  heading(
    'h-intent-q2',
    '2. What would satisfy that search quickly?',
    3,
  ),
  paragraph('p-intent-9', 'If the query asks:'),
  paragraph('p-intent-10', 'how to remove background in Canva'),
  paragraph(
    'p-intent-11',
    'a ten-minute story about why you started using Canva probably delays the answer.',
  ),
  heading(
    'h-intent-q3',
    '3. What could they reasonably want next?',
    3,
  ),
  bullets('ul-intent-q3', [
    'A more advanced tutorial?',
    'Another example?',
    'A comparison?',
  ]),
  paragraph(
    'p-intent-12',
    'That helps you create useful follow-up content rather than isolated videos.',
  ),

  heading('h-csi', 'Use TikTok Creator Search Insights', 2),
  paragraph(
    'p-csi-1',
    'This is one of the most useful tools TikTok currently provides for search-focused content planning.',
  ),
  paragraph(
    'p-csi-2',
    'Creator Search Insights provides information about topics people search for on TikTok. TikTok says creators can browse frequently searched topics, inspect related searches, identify topics that may have a shortage of content and review search performance for their own posts. (TikTok Support)',
    [
      {
        href: TIKTOK_CSI,
        label: 'Creator Search Insights',
        external: true,
      },
      { href: TIKTOK_CSI, label: 'TikTok Support', external: true },
    ],
  ),
  paragraph(
    'p-csi-3',
    'That makes it much more useful than randomly guessing keywords.',
  ),
  heading('h-csi-use', 'You Can Use It to Find', 3),
  heading('h-csi-popular', 'Popular searches', 3),
  paragraph(
    'p-csi-4',
    'Topics people are actively looking for.',
  ),
  heading('h-csi-gaps', 'Content gaps', 3),
  paragraph(
    'p-csi-5',
    'TikTok provides a Content gap filter for topics that may be searched often relative to available content. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  heading('h-csi-followers', 'Searches by followers', 3),
  paragraph(
    'p-csi-6',
    'Where available, Creator Search Insights can also surface searches connected with your followers. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  heading('h-csi-related', 'Related searches', 3),
  paragraph(
    'p-csi-7',
    'A broad topic can reveal more specific questions.',
  ),
  heading('h-csi-analytics', 'Search analytics', 3),
  paragraph(
    'p-csi-8',
    'TikTok allows creators to review the search performance of their posts and select different date ranges. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-csi-9', 'This gives you a loop:'),
  paragraph('p-csi-10', 'Research → Publish → Measure → Improve'),
  paragraph('p-csi-11', 'instead of:'),
  paragraph('p-csi-12', 'Guess → Publish → Guess again'),

  heading('h-keywords', 'How to Find TikTok Keywords', 2),
  paragraph(
    'p-kw-1',
    "You don't need hundreds of keywords for one TikTok.",
  ),
  paragraph('p-kw-2', 'Start with one clear topic.'),
  paragraph('p-kw-3', 'Suppose your broad subject is:'),
  paragraph('p-kw-4', 'Instagram photography'),
  paragraph(
    'p-kw-5',
    'Searching around that topic may reveal more specific ideas such as:',
  ),
  bullets('ul-kw-ideas', [
    'Instagram photo poses',
    'phone photography tips',
    'night photography settings',
    'product photography setup',
    'photography lighting ideas',
  ]),
  paragraph(
    'p-kw-6',
    'The exact available suggestions will change over time, which is why current TikTok search data is more useful than maintaining a static keyword list.',
  ),
  paragraph(
    'p-kw-7',
    'Creator Search Insights is specifically designed to expose current search topics and related search information. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  heading('h-kw-broad', 'Broad Topic vs Specific Search', 3),
  paragraph('p-kw-8', 'Compare:'),
  paragraph('p-kw-9', 'SEO'),
  paragraph('p-kw-10', 'with:'),
  paragraph('p-kw-11', 'local SEO for restaurants'),
  paragraph('p-kw-12', 'and then:'),
  paragraph(
    'p-kw-13',
    'how to optimize Google Business Profile for restaurants',
  ),
  paragraph(
    'p-kw-14',
    'The final topic gives you a much clearer video to create.',
  ),
  paragraph(
    'p-kw-15',
    'Specificity helps both the viewer and the creator understand what the content is actually about.',
  ),
  figure(
    'fig-broad-specific',
    `${IMAGE_DIR}/broad-to-specific.png`,
    'Infographic narrowing Fitness to Home Fitness to Home Workouts to a 15-minute beginner home workout',
    'Choose a topic specific enough to answer clearly in one video.',
  ),

  heading(
    'h-topic-video',
    'Put the Main Topic in the Video Naturally',
    2,
  ),
  paragraph(
    'p-tv-1',
    'Once you know the search topic, make it obvious what the video is about.',
  ),
  paragraph('p-tv-2', 'For a video targeting:'),
  paragraph('p-tv-3', 'how to photograph food with an iPhone'),
  paragraph('p-tv-4', 'the creator might begin:'),
  paragraph(
    'p-tv-5',
    '“Here are three ways to take better food photos with an iPhone.”',
  ),
  paragraph(
    'p-tv-6',
    'That immediately establishes context.',
  ),
  paragraph('p-tv-7', 'Compare that with:'),
  paragraph(
    'p-tv-8',
    "“Okay guys, you're not going to believe this…”",
  ),
  paragraph(
    'p-tv-9',
    'The second opening may create curiosity, but it does not immediately identify the subject.',
  ),
  paragraph(
    'p-tv-10',
    'This does not mean every TikTok needs robotic keyword repetition.',
  ),
  paragraph(
    'p-tv-11',
    'It means the topic should be unmistakable.',
  ),

  heading('h-captions', 'Write Captions for Humans First', 2),
  paragraph(
    'p-cap-1',
    'A useful TikTok caption should support the content.',
  ),
  paragraph('p-cap-2', 'If your video explains:'),
  paragraph('p-cap-3', 'how to edit TikTok captions'),
  paragraph('p-cap-4', 'a caption such as:'),
  paragraph(
    'p-cap-5',
    'How to edit TikTok captions after creating your video, plus what to check before posting.',
  ),
  paragraph('p-cap-6', 'is clearer than:'),
  paragraph(
    'p-cap-7',
    'TikTok captions TikTok caption editing captions TikTok tips viral TikTok',
  ),
  paragraph(
    'p-cap-8',
    'Keyword stuffing makes the text harder to read and does not improve the usefulness of the video.',
  ),
  paragraph(
    'p-cap-9',
    'Because TikTok says content information can contribute to search recommendations, the better goal is clear relevance, not repetition. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),

  heading('h-hashtags', 'Do Hashtags Matter for TikTok SEO?', 2),
  paragraph(
    'p-hash-1',
    'Hashtags can help describe or categorize content, and TikTok explicitly lists hashtags among the content information that can be considered in its recommendation systems. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-hash-2', 'But that does not mean:'),
  paragraph('p-hash-3', 'more hashtags = higher ranking.'),
  paragraph(
    'p-hash-4',
    'TikTok does not publish such a rule.',
  ),
  paragraph(
    'p-hash-5',
    'A practical approach is to use hashtags that genuinely relate to the video.',
  ),
  paragraph(
    'p-hash-6',
    'For example, a beginner photography tutorial might reasonably use:',
  ),
  bullets('ul-hash', ['#PhotographyTips', '#PhonePhotography']),
  paragraph(
    'p-hash-7',
    'rather than filling the caption with dozens of unrelated trending hashtags.',
  ),
  paragraph(
    'p-hash-8',
    'The topic should still make sense even if you removed the hashtags entirely.',
  ),

  heading('h-sound', 'Does the Sound Affect TikTok Search?', 2),
  paragraph(
    'p-sound-1',
    'TikTok lists sounds among the content information its recommendation systems may use. (TikTok Support)',
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-sound-2',
    'That does not mean choosing a trending sound automatically makes a post rank for a search query.',
  ),
  paragraph(
    'p-sound-3',
    'A sound may provide context, but it should not replace topic relevance.',
  ),
  paragraph(
    'p-sound-4',
    "If you're creating an educational search-focused video, clarity should come first.",
  ),

  heading(
    'h-say-kw',
    'Should You Say the Keyword in the Video?',
    2,
  ),
  paragraph(
    'p-say-1',
    "Making the topic clear in spoken content can improve the video's clarity for viewers.",
  ),
  paragraph('p-say-2', 'For example:'),
  paragraph(
    'p-say-3',
    '“Here is how to clean white sneakers without putting them in the washing machine.”',
  ),
  paragraph('p-say-4', 'is immediately understandable.'),
  paragraph(
    'p-say-5',
    'I would use this because it creates a better user experience, not because TikTok publicly promises that saying an exact keyword gives a specific ranking boost.',
  ),
  paragraph('p-say-6', 'That distinction matters.'),
  paragraph('p-say-7', 'Build for the viewer first.'),

  heading(
    'h-onscreen',
    'Should the Keyword Appear on Screen?',
    2,
  ),
  paragraph(
    'p-os-1',
    'On-screen text is useful when it helps viewers immediately understand the subject.',
  ),
  paragraph('p-os-2', 'For example:'),
  paragraph('p-os-3', '3 Beginner Excel Formulas'),
  paragraph('p-os-4', 'is clearer than:'),
  paragraph('p-os-5', 'You NEED to know this!'),
  paragraph(
    'p-os-6',
    'Again, the goal is clarity rather than stuffing.',
  ),
  paragraph(
    'p-os-7',
    'Do not repeat the phrase unnecessarily across every frame.',
  ),
  {
    id: 'cta-tiktok-seo',
    type: 'service_cluster_cta',
    order: nextOrder(),
    heading: 'Compare TikTok Growth Options',
    text: 'TikTok search visibility, followers, likes and views describe different parts of a TikTok presence.',
    serviceSlugs: [
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
    ],
  },

  heading(
    'h-best-answer',
    'Create the Best Answer You Can for the Search',
    2,
  ),
  paragraph(
    'p-ba-1',
    'The keyword gets you to the topic.',
  ),
  paragraph(
    'p-ba-2',
    'The content still has to be useful.',
  ),
  paragraph('p-ba-3', 'Suppose the query is:'),
  paragraph('p-ba-4', 'how to remove coffee stain from carpet'),
  paragraph(
    'p-ba-5',
    'A useful short-form answer might:',
  ),
  numbered('ol-ba', [
    'show the stain',
    'explain the first step',
    'demonstrate the method',
    'show what to avoid',
    'show the result',
  ]),
  paragraph(
    'p-ba-6',
    'That is more useful than spending most of the video saying:',
  ),
  paragraph('p-ba-7', 'coffee stain removal'),
  paragraph('p-ba-8', 'over and over.'),
  paragraph(
    'p-ba-9',
    'Search-focused content should still be good content.',
  ),

  heading('h-early', 'Answer the Question Early', 2),
  paragraph(
    'p-early-1',
    'People searching usually have a specific reason for doing so.',
  ),
  paragraph(
    'p-early-2',
    'For informational searches, start addressing the question quickly.',
  ),
  paragraph(
    'p-early-3',
    'That does not mean every video needs to be five seconds long.',
  ),
  paragraph(
    'p-early-4',
    'It means avoid unnecessary delay before the useful part begins.',
  ),
  paragraph('p-early-5', 'If the video is:'),
  paragraph('p-early-6', 'How to turn off Instagram activity status'),
  paragraph(
    'p-early-7',
    'tell the viewer what they need to do.',
  ),
  paragraph(
    'p-early-8',
    'Then explain exceptions or additional detail.',
  ),
  paragraph(
    'p-early-9',
    'Do not hide a simple answer behind a long introduction just to increase video length.',
  ),

  heading('h-format', 'Match the Format to the Question', 2),
  paragraph(
    'p-fmt-1',
    'Different searches deserve different formats.',
  ),
  heading('h-fmt-seo', '“What is TikTok SEO?”', 3),
  paragraph('p-fmt-2', 'An explanation works.'),
  heading('h-fmt-pin', '“How to pin a TikTok video”', 3),
  paragraph('p-fmt-3', 'A demonstration is more useful.'),
  heading('h-fmt-capcut', '“CapCut vs TikTok editor”', 3),
  paragraph('p-fmt-4', 'A comparison works.'),
  heading('h-fmt-dubai', '“Best places to eat in Dubai”', 3),
  paragraph(
    'p-fmt-5',
    'A list, map or location-led format makes more sense.',
  ),
  paragraph(
    'p-fmt-6',
    'Do not force every keyword into the same video structure.',
  ),
  paragraph(
    'p-fmt-7',
    'The search intent should shape the content.',
  ),
  figure(
    'fig-framework',
    `${IMAGE_DIR}/search-framework.png`,
    'Four-step TikTok search content framework: Search, Intent, Content and Measure',
    'Research → Answer → Measure → Repeat',
  ),

  heading(
    'h-analytics',
    'Use Search Analytics After Publishing',
    2,
  ),
  paragraph(
    'p-an-1',
    "TikTok's Creator Search Insights includes Search analytics, where creators can review how posts are performing in search results. TikTok says creators can view overall posts or posts inspired by Creator Search Insights and choose a date range. (TikTok Support)",
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-an-2', 'This is extremely important.'),
  paragraph(
    'p-an-3',
    'TikTok SEO should not end when you press Publish.',
  ),
  paragraph('p-an-4', 'Review what happens.'),
  heading('h-an-look', 'Look For Questions Such As', 3),
  bullets('ul-an', [
    'Which posts appear to attract search traffic?',
    'Which topics consistently work?',
    'Which searches lead to content opportunities?',
    'Did a specific topic perform better than a broad version?',
    'Which successful topic deserves a follow-up video?',
  ]),
  paragraph(
    'p-an-5',
    'Over time, this can help you build a search content strategy based on evidence rather than assumptions.',
  ),

  heading(
    'h-clusters',
    'Create Topic Clusters, Not Random Videos',
    2,
  ),
  paragraph(
    'p-cl-1',
    'One useful search video can work independently.',
  ),
  paragraph(
    'p-cl-2',
    'But several useful videos around the same subject can create a stronger content library for the viewer.',
  ),
  paragraph('p-cl-3', 'For example:'),
  heading('h-cl-photo', 'TikTok Photography Cluster', 3),
  bullets('ul-cl-photo', [
    'How to Take Better TikTok Videos at Night',
    'Best Phone Camera Settings for TikTok',
    'How to Light TikTok Videos at Home',
    'Natural Light vs Ring Light for TikTok',
    'How to Stop Grainy TikTok Videos',
  ]),
  paragraph(
    'p-cl-4',
    'This is useful because someone interested in one topic may reasonably care about another.',
  ),
  paragraph(
    'p-cl-5',
    'You are not creating five versions of the same video.',
  ),
  paragraph(
    'p-cl-6',
    'You are answering five different questions within one broader subject.',
  ),

  heading(
    'h-dupes',
    "Don't Create Multiple Videos That Answer Exactly the Same Search",
    2,
  ),
  paragraph(
    'p-du-1',
    'A common SEO mistake is seeing one keyword and trying to create endless near-identical variations.',
  ),
  paragraph('p-du-2', 'For example:'),
  bullets('ul-du-same', [
    'how to get TikTok followers',
    'how do I get followers on TikTok',
    'ways to gain TikTok followers',
  ]),
  paragraph(
    'p-du-3',
    'If all three videos would contain essentially the same answer, you probably do not need three separate posts.',
  ),
  paragraph('p-du-4', 'Instead, cover different intents:'),
  bullets('ul-du-intents', [
    'How TikTok Followers Work',
    "Why TikTok Views Don't Become Followers",
    'How to Improve Your TikTok Profile',
    'TikTok Followers vs Views',
    'How to Find Content Ideas With Creator Search Insights',
  ]),
  paragraph(
    'p-du-5',
    'Each video should have a reason to exist. For a clearer metric breakdown, see TikTok followers, likes and views. If the issue is TikTok views but few followers, that is a separate topic from search ranking.',
    [
      {
        href: '/learn/tiktok-followers-vs-likes-vs-views',
        label: 'TikTok followers, likes and views',
      },
      {
        href: '/learn/tiktok-views-but-no-followers',
        label: 'TikTok views but few followers',
      },
    ],
  ),

  heading(
    'h-trends',
    'Do Trending Topics Help TikTok Search?',
    2,
  ),
  paragraph(
    'p-tr-1',
    "Trends can help you identify what people are currently interested in, but not every trend is appropriate for every creator.",
  ),
  paragraph(
    'p-tr-2',
    "TikTok's Creative Center provides trend exploration, including trending topics and other inspiration resources, while Creator Search Insights is more directly focused on what users are searching for. (TikTok For Business)",
    [
      {
        href: TIKTOK_CREATIVE_CENTER,
        label: 'TikTok For Business',
        external: true,
      },
    ],
  ),
  paragraph('p-tr-3', 'Use a trend when:'),
  bullets('ul-tr', [
    'it fits your audience,',
    'you have something useful to contribute,',
    'and it makes sense for your subject.',
  ]),
  paragraph(
    'p-tr-4',
    'Do not force a trend onto unrelated content simply because it is popular.',
  ),

  heading(
    'h-older',
    'Can Older TikTok Videos Rank in Search?',
    2,
  ),
  paragraph(
    'p-old-1',
    'Search visibility does not need to be thought of as only a launch-day outcome.',
  ),
  paragraph(
    'p-old-2',
    'TikTok provides search analytics over selectable date ranges, which makes it worthwhile to review the continuing search performance of published posts rather than judging them only immediately after posting. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-old-3', 'The practical lesson:'),
  paragraph(
    'p-old-4',
    'Do not automatically delete a useful search-focused video because it did not immediately receive large numbers.',
  ),
  paragraph(
    'p-old-5',
    'Evaluate it over time and in context.',
  ),

  heading(
    'h-followers-rank',
    'Does More Followers Mean Higher TikTok Search Rankings?',
    2,
  ),
  paragraph('p-fr-1', 'Do not assume that.'),
  paragraph(
    'p-fr-2',
    'Follower count and search relevance are different concepts. TikTok followers are an audience metric, not a search-ranking rule.',
    [{ href: '/buy-tiktok-followers', label: 'TikTok followers' }],
  ),
  paragraph(
    'p-fr-3',
    'TikTok likes are a content interaction, not a promised search-ranking lever.',
    [{ href: '/buy-tiktok-likes', label: 'TikTok likes' }],
  ),
  paragraph(
    'p-fr-4',
    "TikTok's public description of recommendations identifies multiple types of information that can influence what is shown, including content relevance and user interactions. It does not provide a simple rule stating that accounts with more followers automatically rank above smaller accounts in Search. (TikTok Support)",
    [{ href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true }],
  ),
  paragraph('p-fr-5', 'So we should not tell creators:'),
  paragraph(
    'p-fr-6',
    '“Get more followers and TikTok will rank your videos higher.”',
  ),
  paragraph(
    'p-fr-7',
    'There is no basis for that guarantee.',
  ),
  paragraph(
    'p-fr-8',
    'The same applies to buying followers, likes or views.',
  ),
  paragraph(
    'p-fr-9',
    'NovaLikes services should never be marketed as guaranteed TikTok SEO ranking tools.',
  ),

  heading(
    'h-buy-views',
    'Does Buying TikTok Views Improve TikTok SEO?',
    2,
  ),
  paragraph(
    'p-bv-1',
    'There is no basis for NovaLikes to promise that purchasing TikTok views will improve TikTok Search rankings.',
    [{ href: '/buy-tiktok-views', label: 'TikTok views' }],
  ),
  paragraph(
    'p-bv-2',
    'Views are a different metric from search positioning.',
  ),
  paragraph(
    'p-bv-3',
    'A view service should be represented as a view service, not as a guaranteed method of:',
  ),
  bullets('ul-bv-not', [
    'ranking in TikTok Search,',
    'reaching the For You page,',
    'increasing followers,',
    'making a video viral,',
    'or producing sales.',
  ]),
  paragraph(
    'p-bv-4',
    'Keeping those concepts separate protects both accuracy and user expectations.',
  ),

  heading('h-fyp', 'What About the For You Page?', 2),
  paragraph(
    'p-fyp-1',
    "Search and the For You feed are related to TikTok's broader recommendation ecosystem, but they are not the same surface.",
  ),
  paragraph(
    'p-fyp-2',
    'TikTok describes the For You feed as personalized recommendations and separately provides search/discovery functionality. Its recommendation documentation notes that different factors may carry different weight depending on the recommendation surface. (TikTok Support)',
    [
      { href: TIKTOK_FOR_YOU, label: 'For You feed', external: true },
      { href: TIKTOK_RECOMMENDS, label: 'TikTok Support', external: true },
    ],
  ),
  paragraph(
    'p-fyp-3',
    'A video created around a search topic can still be discovered elsewhere.',
  ),
  paragraph('p-fyp-4', 'But:'),
  paragraph(
    'p-fyp-5',
    'ranking in Search ≠ guaranteed For You distribution',
  ),
  paragraph('p-fyp-6', 'and:'),
  paragraph(
    'p-fyp-7',
    'For You visibility ≠ guaranteed Search ranking.',
  ),
  paragraph(
    'p-fyp-8',
    'Treat them as distinct discovery opportunities.',
  ),

  heading('h-mistakes', 'Common TikTok SEO Mistakes', 2),
  heading(
    'h-m1',
    '1. Choosing a Keyword Before Understanding the Question',
    3,
  ),
  paragraph(
    'p-m1',
    'A phrase is not useful if the video does not satisfy the search behind it.',
  ),
  heading('h-m2', '2. Keyword Stuffing Captions', 3),
  paragraph(
    'p-m2',
    'Clear language beats repetitive phrases.',
  ),
  heading('h-m3', '3. Using Unrelated Hashtags', 3),
  paragraph(
    'p-m3',
    'Relevant context matters more than filling every available hashtag slot.',
  ),
  heading(
    'h-m4',
    '4. Creating a Long Intro Before Answering',
    3,
  ),
  paragraph(
    'p-m4-1',
    'Searchers usually arrived with a purpose.',
  ),
  paragraph('p-m4-2', 'Respect it.'),
  heading(
    'h-m5',
    '5. Copying the Same Video for Every Keyword Variation',
    3,
  ),
  paragraph(
    'p-m5',
    'Create different content only when the search intent actually differs.',
  ),
  heading('h-m6', '6. Ignoring Creator Search Insights', 3),
  paragraph(
    'p-m6',
    'TikTok gives creators a first-party tool for discovering searched topics and analyzing search performance. Use it. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  heading('h-m7', '7. Never Checking Results', 3),
  paragraph(
    'p-m7',
    'Without reviewing search analytics, you cannot tell which topics deserve follow-up content. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),

  heading('h-workflow', 'A Simple TikTok SEO Workflow', 2),
  paragraph(
    'p-wf-1',
    'Use this process for future content.',
  ),
  heading('h-wf-1', 'Step 1: Choose Your Broader Topic', 3),
  paragraph('p-wf-2', 'Example:'),
  paragraph('p-wf-3', 'Local SEO'),
  heading('h-wf-2', 'Step 2: Open Creator Search Insights', 3),
  paragraph(
    'p-wf-4',
    'Look for searches, related topics and content gaps. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  heading('h-wf-3', 'Step 3: Select One Clear Search Intent', 3),
  paragraph('p-wf-5', 'Example:'),
  paragraph('p-wf-6', 'How to respond to Google reviews'),
  heading('h-wf-4', 'Step 4: Plan the Direct Answer', 3),
  paragraph(
    'p-wf-7',
    'Decide what viewers should know by the end.',
  ),
  heading('h-wf-5', 'Step 5: Make the Topic Obvious', 3),
  paragraph('p-wf-8', 'Use clear:'),
  bullets('ul-wf-clear', [
    'spoken language,',
    'on-screen context,',
    'caption copy,',
    'and relevant hashtags where appropriate.',
  ]),
  heading('h-wf-6', 'Step 6: Publish', 3),
  paragraph(
    'p-wf-9',
    'Do not stuff unrelated terms into the post.',
  ),
  heading('h-wf-7', 'Step 7: Review Search Analytics', 3),
  paragraph(
    'p-wf-10',
    'Check performance after publishing. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  heading('h-wf-8', 'Step 8: Build Useful Follow-Ups', 3),
  paragraph(
    'p-wf-11',
    'Create another video only when there is a distinct related question worth answering.',
  ),

  heading(
    'h-close',
    'TikTok SEO Is About Relevance Before Tricks',
    2,
  ),
  paragraph(
    'p-close-1',
    'There is no need to make TikTok SEO complicated.',
  ),
  paragraph('p-close-2', 'Start with:'),
  paragraph('p-close-3', 'What are people searching for?'),
  paragraph('p-close-4', 'Then:'),
  paragraph(
    'p-close-5',
    'What would genuinely answer that search?',
  ),
  paragraph(
    'p-close-6',
    'Then make sure the video clearly communicates that topic.',
  ),
  paragraph(
    'p-close-7',
    'TikTok itself gives creators tools for identifying searched topics, finding content gaps and reviewing search performance. (TikTok Support)',
    [{ href: TIKTOK_CSI, label: 'TikTok Support', external: true }],
  ),
  paragraph(
    'p-close-8',
    'That is much more useful than looking for a secret list of hashtags or pretending one keyword placement guarantees rankings.',
  ),
  paragraph(
    'p-close-9',
    'A sustainable TikTok search strategy is built around:',
  ),
  bullets('ul-close', [
    'Search demand',
    'Clear intent',
    'Useful content',
    'Relevant context',
    'Performance review',
  ]),
  paragraph(
    'p-close-10',
    'Then repeat the process based on what the data tells you.',
  ),
  heading('h-takeaways', 'Key Takeaways', 2),
  bullets('ul-takeaways', [
    'TikTok search is a real discovery surface for videos, creators, hashtags and other content.',
    'Creator Search Insights can show searched topics, content gaps, related searches and search analytics.',
    'TikTok says search recommendations can consider how well content matches the query, alongside information such as hashtags and sounds.',
    'There is no public TikTok formula guaranteeing a #1 search position.',
    'Do not keyword-stuff. Make the subject of the video clear and useful.',
    'Follower, like or view services should not be represented as guaranteed TikTok search-ranking tools.',
  ]),
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
    'TikTok is not only a feed where people scroll through recommended videos.',
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
  publishedAt: SCHEDULED_AT,
  updatedAt: SCHEDULED_AT,
  showModifiedDate: false,
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
    'Find a real search topic',
    'Understand what the searcher wants',
    'Create a video that directly addresses it',
    'Make the topic clear in the video and supporting text',
    'Publish and review search performance',
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is TikTok SEO?',
      answer:
        "TikTok SEO is a practical term for creating and presenting content so its topic clearly aligns with relevant searches people perform on TikTok. TikTok's search system surfaces content, hashtags, creators and more, while its Creator Search Insights tool exposes topics users are searching for.",
      schemaEligible: true,
    },
    {
      id: 'faq-2',
      question: 'How do I find keywords for TikTok?',
      answer:
        'Start with TikTok\'s Creator Search Insights. It allows creators to explore frequently searched topics, related searches and content gaps.',
      schemaEligible: true,
    },
    {
      id: 'faq-3',
      question: 'Do hashtags help TikTok search?',
      answer:
        'TikTok lists hashtags among the content information that can influence recommendations, including Search. However, TikTok does not state that using more hashtags automatically produces higher rankings.',
      schemaEligible: true,
    },
    {
      id: 'faq-4',
      question: 'Should I put my TikTok keyword in the caption?',
      answer:
        'Use clear caption wording that naturally describes the video. TikTok says content relevance to a search query is one factor considered for Search, but keyword stuffing is unnecessary and makes captions less useful.',
      schemaEligible: true,
    },
    {
      id: 'faq-5',
      question: 'Can I see whether my TikToks are performing in Search?',
      answer:
        'Yes. Creator Search Insights includes Search analytics where creators can review the search performance of their posts over selected periods.',
      schemaEligible: true,
    },
    {
      id: 'faq-6',
      question: 'Do more TikTok followers guarantee better Search rankings?',
      answer:
        'No such guarantee is provided by TikTok. Its public recommendation documentation describes multiple signals rather than a simple follower-count ranking rule.',
      schemaEligible: true,
    },
  ],
};
