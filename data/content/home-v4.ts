/**
 * Root English homepage v4 — Instagram + TikTok (+ Facebook tab), October 2026.
 * Used ONLY by the root English homepage (/). Locale (/de/ …) and market (/uk/ …) homepages
 * keep homepageHubLegacy and must not change.
 * All copy is final. Do not edit wording in code.
 *
 * SplitTitle renders as `${lead} <span class="nl-grad-text">${highlight}</span> ${tail}` in ONE heading element.
 * {fromPrice} = lowest active package price for that service slug, from the pricing registry,
 *               formatted exactly like the service-page price block. Never hard-code prices.
 * Facts used (keep identical site-wide): orders start within 6–8 hours, standard delivery finishes
 * 4–6 hours after start, gradual delivery on request, 6-month refill from delivery, 24/7 WhatsApp
 * +44 7454 758272, prices in USD, no password ever.
 */

export type SplitTitle = { lead: string; highlight: string; tail?: string };
export type PlatformKey = 'instagram' | 'tiktok' | 'facebook';

type HeroCard = { slug: string; title: string; line: string };
type ServiceBlock = {
  slug: string;
  platform: 'instagram' | 'tiktok';
  /** Rendered as an H2. */
  title: SplitTitle;
  intro: string;
  bullets: [string, string, string, string];
  cta: string;
  /** Two collapsible questions under the block (<details>, answers in server HTML). */
  questions: [{ q: string; a: string }, { q: string; a: string }];
};

export const HOME_V4 = {
  hero: {
    eyebrow: 'Instagram & TikTok growth services',
    title: { lead: 'Buy', highlight: 'Instagram & TikTok', tail: 'Followers, Likes and Views' } satisfies SplitTitle,
    subtitle:
      'Pick a platform and a service, add your public username or post link, and check out in USD. No password, orders start within 6–8 hours, and every order includes a 6-month refill.',
    /** Platform tabs. Instagram is selected by default. Each card links to its service page. */
    tabs: {
      instagram: {
        label: 'Instagram',
        cards: [
          { slug: 'buy-instagram-followers', title: 'Followers', line: 'Grow your profile' },
          { slug: 'buy-instagram-likes', title: 'Likes', line: 'For posts and Reels' },
          { slug: 'buy-instagram-views', title: 'Views', line: 'For Reels and videos' },
          { slug: 'buy-instagram-comments', title: 'Comments', line: 'Start the conversation' },
        ],
      },
      tiktok: {
        label: 'TikTok',
        cards: [
          { slug: 'buy-tiktok-followers', title: 'Followers', line: 'Grow your profile' },
          { slug: 'buy-tiktok-likes', title: 'Likes', line: 'For one video' },
          { slug: 'buy-tiktok-views', title: 'Views', line: 'For one video' },
        ],
      },
      facebook: {
        label: 'Facebook',
        cards: [
          { slug: 'buy-facebook-followers', title: 'Followers', line: 'For Pages and profiles' },
          { slug: 'buy-facebook-page-likes', title: 'Page Likes', line: 'For Pages with a like count' },
          { slug: 'buy-facebook-post-likes', title: 'Post Likes', line: 'For one public post' },
        ],
      },
    } satisfies Record<PlatformKey, { label: string; cards: HeroCard[] }>,
    /** Shown on every card under `line`. */
    cardPrice: 'From {fromPrice}',
    trust: ['No password needed', 'Starts in 6–8 hours', '6-month refill', '24/7 WhatsApp support', 'Prices in USD'],
  },

  intro: {
    id: 'services',
    eyebrow: 'Our services',
    title: { lead: 'Instagram and TikTok', highlight: 'services in one place' } satisfies SplitTitle,
    body: 'Each service changes one number on one platform, so start with the number your visitors see first. Followers sit on your profile. Likes, views and comments sit on a single post or video. Every order needs only a public username or link, and you can track it from your order ID.',
  },

  services: [
    {
      slug: 'buy-instagram-followers',
      platform: 'instagram',
      title: { lead: 'Buy', highlight: 'Instagram Followers' },
      intro:
        'Grow the follower count on a public Instagram account. It is the first number people check when they land on your profile, so it shapes whether they take the account seriously.',
      bullets: ['Public username only, never your password', 'Packages from {fromPrice}', 'Starts within 6–8 hours', '6-month refill from delivery'],
      cta: 'Buy Instagram Followers',
      questions: [
        {
          q: 'When do Instagram followers make sense?',
          a: 'When a new or rebranded account looks empty next to the content it posts, or before you send people to the profile from ads, a website or your link in bio.',
        },
        {
          q: 'What do you need to order?',
          a: 'Only the public username. Keep the account public and the username unchanged until delivery, and any refill, is complete.',
        },
      ],
    },
    {
      slug: 'buy-instagram-likes',
      platform: 'instagram',
      title: { lead: 'Buy', highlight: 'Instagram Likes' },
      intro:
        'Add likes to a public photo, carousel or Reel. Likes sit right under the post, so they are the quickest signal a new viewer sees.',
      bullets: ['Posts, carousels and Reels', 'Paste the post link, no login', 'Packages from {fromPrice}', 'Gradual delivery on request'],
      cta: 'Buy Instagram Likes',
      questions: [
        {
          q: 'Which posts are worth adding likes to?',
          a: 'Posts you are pointing people to elsewhere: a launch, an offer, a collab or the content you pin to your profile.',
        },
        {
          q: 'What do you need to order?',
          a: 'The public link to one post. Each order applies to that post only.',
        },
      ],
    },
    {
      slug: 'buy-instagram-views',
      platform: 'instagram',
      title: { lead: 'Buy', highlight: 'Instagram Views' },
      intro:
        'Raise the view count on a public Reel or video. A healthy count makes a new Reel look worth watching when you share the link.',
      bullets: ['Reels and video posts', 'Paste the link, no password', 'Packages from {fromPrice}', 'Gradual delivery on request'],
      cta: 'Buy Instagram Views',
      questions: [
        {
          q: 'Do views change my other numbers?',
          a: 'No. Views change the view count on that video only. Likes, comments and follows still depend on how people respond to the content.',
        },
        {
          q: 'What do you need to order?',
          a: 'The public link to the Reel or video. Keep it public until delivery is complete.',
        },
      ],
    },
    {
      slug: 'buy-instagram-comments',
      platform: 'instagram',
      title: { lead: 'Buy', highlight: 'Instagram Comments' },
      intro:
        'Add comments to a public post or Reel, so it looks active and gives other people a reason to join in.',
      bullets: ['High Quality or Premium comments', 'Your own wording on request', 'Packages from {fromPrice}', '6-month refill from delivery'],
      cta: 'Buy Instagram Comments',
      questions: [
        {
          q: 'What is the difference between High Quality and Premium?',
          a: 'High Quality comments are general. Premium comments are written around what your post is actually about.',
        },
        {
          q: 'Can I choose the wording or language?',
          a: 'Yes. Paste your own comments, or ask for another language, in the checkout note.',
        },
      ],
    },
    {
      slug: 'buy-tiktok-followers',
      platform: 'tiktok',
      title: { lead: 'Buy', highlight: 'TikTok Followers' },
      intro:
        'Grow the follower count on a public TikTok account. New viewers check it on your profile before they decide whether to follow.',
      bullets: ['Username only, no password', 'Packages from {fromPrice}', 'Starts within 6–8 hours', '6-month refill from delivery'],
      cta: 'Buy TikTok Followers',
      questions: [
        {
          q: 'When do TikTok followers make sense?',
          a: 'When you are starting out, rebranding or launching a business account, and the profile looks empty next to the videos you post.',
        },
        {
          q: 'What do you need to order?',
          a: 'Your public TikTok username. Keep the account public until delivery is complete.',
        },
      ],
    },
    {
      slug: 'buy-tiktok-likes',
      platform: 'tiktok',
      title: { lead: 'Buy', highlight: 'TikTok Likes' },
      intro:
        'Add likes to one public TikTok video, such as a product launch, a collab or your best clip.',
      bullets: ['One video per order', 'Paste the video link, no login', 'Packages from {fromPrice}', 'Gradual delivery on request'],
      cta: 'Buy TikTok Likes',
      questions: [
        {
          q: 'Which video should get likes?',
          a: 'One you are sharing outside TikTok or pinning to your profile, so new visitors see engagement on it.',
        },
        {
          q: 'What do you need to order?',
          a: 'The public video link. The likes apply to that video only.',
        },
      ],
    },
    {
      slug: 'buy-tiktok-views',
      platform: 'tiktok',
      title: { lead: 'Buy', highlight: 'TikTok Views' },
      intro:
        'Raise the view count on a public TikTok video. A low count can make a good video look ignored, especially on new uploads.',
      bullets: ['High Quality or Premium views', 'Paste the video link', 'Packages from {fromPrice}', 'Starts within 6–8 hours'],
      cta: 'Buy TikTok Views',
      questions: [
        {
          q: 'Will views put my video on the For You feed?',
          a: 'No service can promise that. TikTok decides what to recommend based on how people watch and interact with each video.',
        },
        {
          q: 'What do you need to order?',
          a: 'The public video link. Choose High Quality or Premium on the service page.',
        },
      ],
    },
  ] satisfies ServiceBlock[],

  howItWorks: {
    id: 'how-it-works',
    eyebrow: 'How it works',
    title: { lead: 'Order in', highlight: 'three steps' } satisfies SplitTitle,
    steps: [
      { title: 'Choose a service', body: 'Pick the platform, the service and a package size. Prices are shown in USD before checkout.' },
      { title: 'Add your link', body: 'Enter your public username or the post link. We never ask for your password.' },
      { title: 'Pay and track', body: 'Check out securely, then follow the order with your order ID and email.' },
    ],
  },

  promises: {
    id: 'our-promises',
    eyebrow: 'Our promises',
    title: { lead: 'What every', highlight: 'order includes' } satisfies SplitTitle,
    subtitle: 'The same rules apply to every Instagram, TikTok and Facebook order.',
    items: [
      { icon: 'shield', title: 'No password, ever', body: 'We only need a public username or link. Anyone asking for your login is not someone to trust.' },
      { icon: 'clock', title: 'Starts in 6–8 hours', body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after starting. Ask for gradual delivery if you prefer a slower pace.' },
      { icon: 'refresh-cw', title: '6-month refill', body: 'If the count drops within 6 months of delivery, send your order ID on WhatsApp and we top it back up.' },
      { icon: 'message-circle', title: '24/7 WhatsApp support', body: 'Message +44 7454 758272 before or after you order. A person replies, not a bot.' },
      { icon: 'lock', title: 'Secure checkout', body: 'Card payments run through a secure payment provider. We never store full card numbers.' },
      { icon: 'search', title: 'Order tracking', body: 'Check any order on the Track Order page, or in your free customer dashboard.' },
    ],
  },

  faq: {
    id: 'homepage-faq',
    eyebrow: 'Before you order',
    title: { lead: 'Questions people ask', highlight: 'before they order' } satisfies SplitTitle,
    items: [
      {
        question: 'Which service should I start with?',
        answer:
          'Start with the number visitors see first. For a profile that looks empty, that is followers. For one post or video you are promoting, it is likes or views on that post.',
      },
      {
        question: 'Do you need my Instagram or TikTok password?',
        answer:
          'No. Followers need your public username, and likes, views and comments need the public post or video link. Never share your password with any growth service.',
      },
      {
        question: 'Does my account need to be public?',
        answer:
          'Yes, while the order is being delivered. A private account or a private post can stop delivery. You can make it private again once delivery is complete.',
      },
      {
        question: 'How quickly will my order start?',
        answer:
          'Most orders start within 6–8 hours after payment is confirmed, and standard delivery usually finishes 4–6 hours after it starts. Ask for gradual delivery in the checkout note or on WhatsApp if you prefer a slower pace.',
      },
      {
        question: 'What happens if the numbers drop?',
        answer:
          'Every order includes a 6-month refill from the delivery date. Message us on WhatsApp (+44 7454 758272) with your order ID and we top it back up.',
      },
      {
        question: 'Do you offer Facebook services too?',
        answer:
          'Yes. Facebook Followers, Page Likes and Post Likes are in the Facebook tab at the top of this page. For Page Likes, check first that your Page still shows a like count.',
      },
      {
        question: 'Can buying followers, likes or views affect my account?',
        answer:
          'Instagram and TikTok rules do not allow buying engagement, and both platforms can remove activity they treat as inauthentic. NovaLikes never asks for your password, but no service can control how a platform treats an account. Read the platform rules before you order.',
      },
      {
        question: 'Will this get my post on Explore or the For You feed?',
        answer:
          'No service can promise that. Instagram and TikTok decide what to recommend based on how people watch and interact with each post.',
      },
    ],
  },

  guides: {
    id: 'guides',
    eyebrow: 'Free guides',
    title: { lead: 'Learn how', highlight: 'Instagram and TikTok work' } satisfies SplitTitle,
    intro:
      'Buying a package will not replace good content. These free guides explain what actually moves views and followers on each platform.',
    items: [
      { title: 'How to Grow Instagram Followers Organically', description: 'A step-by-step plan built on Instagram’s own tools.', href: '/learn/how-to-grow-instagram-followers-organically' },
      { title: 'How the Instagram Algorithm Works', description: 'Feed, Reels, Explore and Stories, explained one by one.', href: '/learn/how-instagram-algorithm-works' },
      { title: 'How Are Instagram Reels Views Counted?', description: 'What counts as a view, and why replays are included.', href: '/learn/how-instagram-reels-views-are-counted' },
      { title: 'How to Get More Views on TikTok', description: 'Hooks, search words and watch time: what actually moves views.', href: '/learn/how-to-get-more-views-on-tiktok' },
      { title: 'TikTok Shadowban: How to Check and Fix It', description: 'How to tell a real restriction from a slow video.', href: '/learn/tiktok-shadowban' },
      { title: 'How to Get Your First 1,000 TikTok Followers', description: 'A practical plan for new and small accounts.', href: '/learn/how-to-get-1000-tiktok-followers' },
    ],
    cta: { label: 'All Guides', href: '/learn' },
  },

  getStarted: {
    id: 'get-started',
    title: { lead: 'Get', highlight: 'started' } satisfies SplitTitle,
    subtitle: 'Choose a platform and a service.',
    /** Link grid by platform; reuse hero.tabs (same slugs, labels as "Buy <Platform> <Title>"). */
  },

  finalCta: {
    id: 'home-final-cta',
    title: 'Ready to grow your Instagram or TikTok?',
    subtitle: 'Pick a service, add your link and check out in a few minutes.',
    primaryCta: { label: 'Choose a Service', href: '#homepage-hero' },
    secondaryCta: { label: 'Track an Order', href: '/track-order' },
  },

  stickyCta: { label: 'Choose a Service', href: '#homepage-hero' },
} as const;

/** Root English homepage metadata (route "/"). Replaces ROOT_HOMEPAGE_METADATA. */
export const ROOT_HOMEPAGE_METADATA_V4 = {
  title: 'Buy Instagram & TikTok Followers, Likes & Views | NovaLikes',
  description:
    'Buy Instagram and TikTok followers, likes and views in USD. No password needed, orders start within 6–8 hours, and every order has a 6-month refill.',
} as const;
