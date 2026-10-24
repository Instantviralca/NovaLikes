/**
 * Root English homepage v3 — TikTok-first, light SaaS-style design (October 2026).
 * Used ONLY by the root English homepage (/). Locale and market homepages keep homepageHubLegacy.
 * All copy is final. Do not edit wording in code.
 *
 * Headings with a gradient word use { lead, highlight, tail? }:
 * render as `${lead} <span class="tt-grad">${highlight}</span> ${tail}` (single H1/H2 element).
 * Placeholders: {fromPrice} = lowest active package price for that service, formatted like service pages.
 */

export type TikTokServiceKey = 'followers' | 'likes' | 'views';
export type SplitTitle = { lead: string; highlight: string; tail?: string };

export const HOME_TT = {
  hero: {
    eyebrow: 'TikTok growth services',
    title: { lead: 'Grow Your', highlight: 'TikTok', tail: 'with Followers, Likes & Views' } satisfies SplitTitle,
    subtitle:
      'Pick a package, add your public username or video link, and check out. No password needed, clear prices and order tracking on every order.',
    primaryCta: { label: 'See Packages', href: '#packages' },
    secondaryCta: { label: 'Find My Package', href: '#package-finder' },
    trust: ['No password needed', 'Clear prices', 'Order tracking', '30-day money-back on eligible orders'],
    /** Floating cards around the hero visual. Values come from the registry (popular package per service). */
    floating: {
      followers: { label: 'Followers', template: '{quantity} from {price}' },
      likes: { label: 'Likes', template: '{quantity} from {price}' },
      views: { label: 'Views', template: '{quantity} from {price}' },
      safe: { label: 'No password', value: 'Public username only' },
    },
  },

  packages: {
    id: 'packages',
    eyebrow: 'Packages',
    title: { lead: 'Pick Your', highlight: 'TikTok Package' } satisfies SplitTitle,
    subtitle: 'Choose a service, then a package. Prices are shown before checkout.',
    tabs: {
      followers: {
        label: 'Followers',
        note: 'Goes to your profile. You’ll need your public TikTok username.',
        seeAll: 'See all followers packages',
        href: '/buy-tiktok-followers',
      },
      likes: {
        label: 'Likes',
        note: 'Goes to one video. You’ll need the public video link.',
        seeAll: 'See all likes packages',
        href: '/buy-tiktok-likes',
      },
      views: {
        label: 'Views',
        note: 'Goes to one video. You’ll need the public video link.',
        seeAll: 'See all views packages',
        href: '/buy-tiktok-views',
      },
    } satisfies Record<TikTokServiceKey, { label: string; note: string; seeAll: string; href: string }>,
  },

  serviceCards: {
    id: 'choose-service',
    eyebrow: 'Services',
    title: { lead: 'Choose the Right', highlight: 'TikTok Service' } satisfies SplitTitle,
    subtitle: 'Each service works on a different part of your TikTok.',
    cards: [
      {
        key: 'followers',
        title: 'TikTok Followers',
        description: 'Grow the follower count on your profile.',
        bullets: ['Public username only', 'Shows on your profile', 'Packages from {fromPrice}'],
        cta: { label: 'Buy TikTok Followers', href: '/buy-tiktok-followers' },
      },
      {
        key: 'likes',
        title: 'TikTok Likes',
        description: 'Add likes to one specific video.',
        bullets: ['Public video link', 'Applies to one video', 'Packages from {fromPrice}'],
        cta: { label: 'Buy TikTok Likes', href: '/buy-tiktok-likes' },
      },
      {
        key: 'views',
        title: 'TikTok Views',
        description: 'Raise the view count on a video.',
        bullets: ['Public video link', 'Counts on that video', 'Packages from {fromPrice}'],
        cta: { label: 'Buy TikTok Views', href: '/buy-tiktok-views' },
      },
    ] satisfies { key: TikTokServiceKey; title: string; description: string; bullets: string[]; cta: { label: string; href: string } }[],
  },

  /** Alternating two-column sections, one per service (text left/right alternates). */
  serviceFeatures: {
    id: 'tiktok-services',
    items: [
      {
        key: 'followers',
        eyebrow: 'TikTok Followers',
        title: { lead: 'Build a profile that', highlight: 'looks established' } satisfies SplitTitle,
        body: 'Followers are added to your profile, so they show on your follower count, not on a single video. People usually order followers when they’re starting out, rebranding or launching a business account, and want the profile to look established when new viewers land on it.',
        subTitle: 'Followers for your profile',
        subBody: 'You only need your public TikTok username. Keep the account public until delivery is complete.',
        cta: { label: 'Get TikTok Followers', href: '/buy-tiktok-followers' },
      },
      {
        key: 'likes',
        eyebrow: 'TikTok Likes',
        title: { lead: 'Show more engagement on', highlight: 'the videos that matter' } satisfies SplitTitle,
        body: 'Likes go to one specific video. They’re useful when a post matters, such as a product launch, a collab or your best clip, and you want it to show more engagement when people watch it.',
        subTitle: 'Likes for one video',
        subBody: 'Paste the public video link at checkout. The likes apply to that video only.',
        cta: { label: 'Get TikTok Likes', href: '/buy-tiktok-likes' },
      },
      {
        key: 'views',
        eyebrow: 'TikTok Views',
        title: { lead: 'Give new uploads a', highlight: 'higher view count' } satisfies SplitTitle,
        body: 'Views raise the view count on one video. They suit new uploads, or clips you want to look active when you share the link somewhere else.',
        subTitle: 'Views for one video',
        subBody: 'Choose the exact video by pasting its public link at checkout.',
        cta: { label: 'Get TikTok Views', href: '/buy-tiktok-views' },
      },
    ] satisfies { key: TikTokServiceKey; eyebrow: string; title: SplitTitle; body: string; subTitle: string; subBody: string; cta: { label: string; href: string } }[],
  },

  finder: {
    id: 'package-finder',
    eyebrow: 'Package Finder',
    title: { lead: 'Not sure which', highlight: 'package to pick?' } satisfies SplitTitle,
    subtitle: 'Answer two quick questions and we’ll suggest a starting point.',
    q1: {
      label: 'What do you want to grow?',
      options: {
        followers: 'My profile (followers)',
        likes: 'Likes on a video',
        views: 'Views on a video',
      } satisfies Record<TikTokServiceKey, string>,
    },
    q2: {
      label: 'How big is your account right now?',
      options: {
        small: 'Just starting (under 1,000 followers)',
        medium: 'Growing (1,000–10,000 followers)',
        large: 'Established (10,000+ followers)',
      },
    },
    result: {
      title: 'Our suggestion',
      /** {service} = tab label in lower case, {range} = e.g. "500–1,000 followers" */
      body: 'For an account your size, {service} packages around {range} are a sensible place to start.',
      note: 'This is a suggestion based on your answers, not a guarantee of results.',
      viewButton: 'View this package',
      restart: 'Start over',
      unit: { followers: 'followers', likes: 'likes', views: 'views' } satisfies Record<TikTokServiceKey, string>,
      tips: {
        followers: {
          text: 'Tip: a clear bio and a few pinned videos help new visitors follow you.',
          linkLabel: 'How to get your first 1,000 followers',
          href: '/learn/how-to-get-1000-tiktok-followers',
        },
        likes: {
          text: 'Tip: pick a video that already does well with your audience.',
          linkLabel: 'TikTok likes vs views',
          href: '/learn/tiktok-likes-vs-views',
        },
        views: {
          text: 'Tip: a strong first two seconds keeps viewers watching.',
          linkLabel: 'How to get more views on TikTok',
          href: '/learn/how-to-get-more-views-on-tiktok',
        },
      } satisfies Record<TikTokServiceKey, { text: string; linkLabel: string; href: string }>,
    },
  },

  features: {
    id: 'why-novalikes',
    eyebrow: 'Why NovaLikes',
    title: { lead: 'Built for', highlight: 'TikTok growth' } satisfies SplitTitle,
    subtitle: 'What you get with every NovaLikes order.',
    items: [
      { icon: 'shield', title: 'No password needed', body: 'We only ask for your public username or video link.' },
      { icon: 'tag', title: 'Clear prices', body: 'Every package and price is shown before you pay.' },
      { icon: 'lock', title: 'Secure checkout', body: 'Card payments run through a secure payment provider. We never store full card numbers.' },
      { icon: 'search', title: 'Order tracking', body: 'Check your order status any time with your order ID and email.' },
      { icon: 'layout-dashboard', title: 'Free customer account', body: 'Create an account to see all your orders in one dashboard.' },
      { icon: 'headset', title: 'Real support', body: 'Message us by email or WhatsApp if something looks wrong.' },
    ],
  },

  howItWorks: {
    id: 'how-it-works',
    eyebrow: 'How it works',
    title: { lead: 'Get started in', highlight: '3 simple steps' } satisfies SplitTitle,
    steps: [
      { title: 'Pick a package', body: 'Choose followers, likes or views and the package size you want.' },
      { title: 'Add your details', body: 'Your public username or video link. No password needed.' },
      { title: 'Check out and track', body: 'Pay securely, then follow your order with your order ID.' },
    ],
  },

  whatToExpect: {
    id: 'what-to-expect',
    eyebrow: 'After you order',
    title: { lead: 'What to expect', highlight: 'after you order' } satisfies SplitTitle,
    items: [
      { icon: 'clock', title: 'Start time', body: 'Most orders start within 6–8 hours after payment is confirmed.' },
      {
        icon: 'gauge',
        title: 'Delivery pace',
        body: 'Standard delivery usually finishes 4–6 hours after it starts. Ask for gradual delivery at checkout or on WhatsApp if you prefer a slower pace.',
      },
      { icon: 'eye', title: 'Keep it public', body: 'Keep your account or video public and your username unchanged until delivery is complete.' },
      { icon: 'search', title: 'Track your order', body: 'Use your order ID and email on the Track Order page, or your dashboard if you have an account.' },
    ],
    cta: { label: 'Track an order', href: '/track-order' },
  },

  whoFor: {
    id: 'who-its-for',
    eyebrow: 'Who it’s for',
    title: { lead: 'Made for', highlight: 'creators and brands' } satisfies SplitTitle,
    items: [
      { icon: 'user', title: 'Creators', body: 'New and growing creators who want their profile to look active while they build a posting routine.' },
      { icon: 'store', title: 'Small businesses', body: 'Shops and local brands using TikTok to show products and send people to their store.' },
      { icon: 'music', title: 'Musicians and artists', body: 'Artists promoting a new track, video or release on TikTok.' },
      { icon: 'briefcase', title: 'Agencies and marketers', body: 'Teams managing client accounts who need simple ordering and clear prices.' },
    ],
  },

  guides: {
    eyebrow: 'Free TikTok guides',
    title: { lead: 'Learn how', highlight: 'TikTok growth works' } satisfies SplitTitle,
    intro:
      'Buying followers, likes or views won’t replace good content. TikTok still decides what to show based on how people watch and interact with your videos. Our free guides cover what actually moves views and followers, so you get more from every order.',
  },

  faq: {
    id: 'homepage-faq',
    eyebrow: 'FAQ',
    title: { lead: 'TikTok', highlight: 'questions and answers' } satisfies SplitTitle,
    items: [
      {
        question: 'Do I need to give NovaLikes my TikTok password?',
        answer:
          'No. For followers you only provide your public TikTok username. For likes and views you provide the public video link. Never share your password with anyone.',
      },
      {
        question: 'Does my TikTok account need to be public?',
        answer:
          'Yes, while the order is being delivered. A private account or private video can stop delivery. You can make it private again once delivery is complete.',
      },
      {
        question: 'What is the difference between TikTok followers, likes and views?',
        answer:
          'Followers are people who follow your profile. Likes and views belong to a single video. Choose followers to grow your profile, and likes or views to work on a specific video.',
      },
      {
        question: 'How quickly will my order start?',
        answer:
          'Most orders start within 6–8 hours after payment is confirmed, and standard delivery is usually finished 4–6 hours after it starts. If you prefer a slower, more natural pace, add a note at checkout or message us on WhatsApp to ask for gradual delivery.',
      },
      {
        question: 'What happens if my followers, likes or views drop?',
        answer:
          'Every NovaLikes order includes a 6-month refill from the delivery date. If the number drops in that time, message us on WhatsApp (+44 7454 758272) with your order ID and we top it back up. Keep the profile or content public and the username unchanged while a refill is being delivered.',
      },
      {
        question: 'How many TikTok followers should I buy?',
        answer:
          'There’s no right number. Many people start with a package that looks natural next to their current followers and views, then add more later. The Package Finder above suggests a starting point based on your account size.',
      },
      {
        question: 'Will likes or views get my video on the For You feed?',
        answer:
          'TikTok doesn’t publish exactly how it picks videos, and it looks mainly at how people watch and interact. No service can guarantee that a video will reach the For You feed.',
      },
      {
        question: 'Can I order for someone else’s account?',
        answer:
          'Only if you’re allowed to act for that account, for example as its manager or agency. You still only need the public username or video link.',
      },
      {
        question: 'What payment methods can I use?',
        answer: 'Available payment options are shown at checkout. NovaLikes doesn’t store full card numbers.',
      },
      {
        question: 'Can buying TikTok followers, likes or views affect my account?',
        answer:
          'Third-party services can carry platform-policy risks, and TikTok can remove activity or change how metrics are counted. NovaLikes never asks for your password, but no service can guarantee how TikTok will treat third-party engagement. Review TikTok’s current rules before ordering.',
      },
    ],
  },

  otherPlatforms: {
    id: 'other-platforms',
    title: 'Also on Instagram and Facebook',
    subtitle: 'NovaLikes also offers services for Instagram and Facebook.',
    links: [
      { label: 'Instagram Followers', href: '/buy-instagram-followers' },
      { label: 'Instagram Likes', href: '/buy-instagram-likes' },
      { label: 'Instagram Views', href: '/buy-instagram-views' },
      { label: 'Instagram Comments', href: '/buy-instagram-comments' },
      { label: 'Facebook Followers', href: '/buy-facebook-followers' },
      { label: 'Facebook Page Likes', href: '/buy-facebook-page-likes' },
      { label: 'Facebook Post Likes', href: '/buy-facebook-post-likes' },
    ],
  },

  finalCta: {
    id: 'home-final-cta',
    title: 'Ready to Grow Your TikTok?',
    subtitle: 'Pick a package and check out in a few minutes.',
    primaryCta: { label: 'See Packages', href: '#packages' },
    secondaryCta: { label: 'Track an Order', href: '/track-order' },
  },

  stickyCta: { label: 'See Packages', href: '#packages' },
} as const;
