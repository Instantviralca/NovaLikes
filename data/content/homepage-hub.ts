/**
 * Homepage multi-platform commercial hub — Phase 1A.
 * Original NovaLikes copy. Not an Instagram Followers landing page.
 * Dedicated /buy-* pages remain transactional authorities.
 */

import type { PlatformId } from '@/types/platform';

export type HubCta = { label: string; href: string };

export type HubServiceMini = {
  id: string;
  platform: PlatformId;
  slug: string;
  href: string;
  name: string;
  commercialLabel: string;
  title: string;
  intro: string;
  points: string[];
  cta: HubCta;
  image: { src: string; alt: string };
  tone: 'rose' | 'slate' | 'blue' | 'red' | 'amber' | 'violet' | 'cyan' | 'orange';
};

export const homepageHub = {
  hero: {
    eyebrow: 'Social media growth for Instagram, TikTok, Facebook & YouTube',
    title: 'Grow your presence across the platforms that matter',
    description:
      'NovaLikes helps creators, brands, and businesses compare clear growth packages, order with a public username or URL only, and track progress in one place—without handing over account passwords.',
    primaryCta: { label: 'Explore services', href: '#services-overview' },
    secondaryCta: { label: 'How ordering works', href: '#how-it-works' },
    microcopy: 'No password required · Secure checkout · Public profile or content URL only',
    visual: {
      src: '/assets/images/illustrations/homepage-dashboard.svg',
      alt: 'NovaLikes multi-platform social growth dashboard illustration',
      width: 720,
      height: 560,
    },
  },

  platformSelector: {
    id: 'platform-selector',
    title: 'Choose your platform',
    description:
      'Jump to the network you want to grow. Each platform links to focused service pages with packages and ordering details.',
    platforms: [
      {
        id: 'instagram' as const,
        name: 'Instagram',
        description: 'Followers, likes, views, and comments packages.',
        href: '#instagram-services',
        ctaLabel: 'View Instagram',
      },
      {
        id: 'tiktok' as const,
        name: 'TikTok',
        description: 'Followers, likes, and views for short-form growth.',
        href: '#tiktok-services',
        ctaLabel: 'View TikTok',
      },
      {
        id: 'facebook' as const,
        name: 'Facebook',
        description: 'Followers, page likes, and post likes.',
        href: '#facebook-services',
        ctaLabel: 'View Facebook',
      },
      {
        id: 'youtube' as const,
        name: 'YouTube',
        description: 'Subscribers and views for channel growth.',
        href: '#youtube-services',
        ctaLabel: 'View YouTube',
      },
    ],
  },

  trustValue: {
    id: 'trust-value',
    title: 'Clear packages. Straightforward ordering.',
    description:
      'NovaLikes is built to feel like a modern product—not a cluttered panel. Compare real package options, review published policies, and complete checkout with the public details your order needs.',
    points: [
      {
        title: 'Public details only',
        body: 'Orders use a public username or content URL. We do not ask for your social media password.',
      },
      {
        title: 'Transparent catalog',
        body: 'Service pages show the packages available for that offer—quantities and prices from the live catalog.',
      },
      {
        title: 'Policies you can read first',
        body: 'Refund, terms, and privacy pages are published so you can review them before you buy.',
      },
      {
        title: 'Order tracking',
        body: 'After checkout, use your order details to check status from the track-order page.',
      },
    ],
  },

  servicesOverview: {
    id: 'services-overview',
    title: 'All NovaLikes services',
    description:
      'Twelve focused growth offers across four platforms. Open a service page for packages, delivery notes, and checkout.',
  },

  platformGroupTitles: {
    instagram: {
      id: 'instagram-services',
      title: 'Instagram growth',
      description: 'Audience and engagement options for profiles, posts, and Reels.',
    },
    tiktok: {
      id: 'tiktok-services',
      title: 'TikTok growth',
      description: 'Support discovery and engagement on short-form video.',
    },
    facebook: {
      id: 'facebook-services',
      title: 'Facebook growth',
      description: 'Strengthen pages, profiles, and post engagement.',
    },
    youtube: {
      id: 'youtube-services',
      title: 'YouTube growth',
      description: 'Build channel audience and video reach with clear packages.',
    },
  },

  why: {
    id: 'why-novalikes',
    title: 'Why NovaLikes',
    description:
      'We compete on clarity and trust—not hype. The goal is a calm buying experience where you understand what you are ordering and what happens next.',
    points: [
      {
        title: 'Multi-platform in one place',
        body: 'Instagram, TikTok, Facebook, and YouTube services share the same ordering patterns and policies.',
      },
      {
        title: 'Education before pressure',
        body: 'Service pages explain the offer before asking you to checkout.',
      },
      {
        title: 'No password culture',
        body: 'Account access stays with you. Public information is enough to place an order.',
      },
      {
        title: 'Supportable claims only',
        body: 'We avoid inflated guarantees and unpublished statistics.',
      },
    ],
  },

  howItWorks: {
    id: 'how-it-works',
    title: 'How it works',
    description: 'Most orders follow the same simple path.',
    steps: [
      {
        title: 'Pick a platform and service',
        body: 'Start from the homepage overview or open a dedicated service page.',
      },
      {
        title: 'Choose a package',
        body: 'Select a quantity from the live catalog shown on that service page.',
      },
      {
        title: 'Add public details',
        body: 'Provide the public username or content URL required for delivery.',
      },
      {
        title: 'Checkout securely',
        body: 'Complete payment through the NovaLikes checkout flow.',
      },
      {
        title: 'Track your order',
        body: 'Use your order ID and email on the track-order page when you need a status update.',
      },
    ],
  },

  guarantees: {
    id: 'guarantees',
    title: 'Trust & purchase protections',
    description:
      'These points reflect how NovaLikes is configured today. Package-specific refill or refund eligibility is shown on service pages and in the Refund Policy when it applies.',
    items: [
      {
        title: 'No password required',
        body: 'We never ask for your Instagram, TikTok, Facebook, or YouTube password.',
      },
      {
        title: 'Secure checkout',
        body: 'Orders are placed through the site checkout with encrypted payment handling by the configured payment provider.',
      },
      {
        title: 'Published policies',
        body: 'Terms, privacy, refund, and related legal pages are available before you purchase.',
      },
      {
        title: 'Eligible refill / refund options',
        body: 'Some packages may include refill or money-back eligibility. Those terms are package-specific—review the service page and Refund Policy rather than assuming every order is covered.',
      },
      {
        title: 'Customer support',
        body: 'Contact support when you need help with an order or a product question.',
      },
    ],
  },

  beforeYouBuy: {
    id: 'before-you-buy',
    title: 'Before you buy',
    description: 'Quick answers that help you choose the right path.',
    items: [
      {
        question: 'Which service should I choose?',
        answer:
          'Followers and subscribers grow account audience. Likes and comments support post engagement. Views support video reach. Start with the metric that matches your goal, then open that service page for packages.',
      },
      {
        question: 'Do you need my password?',
        answer:
          'No. NovaLikes only needs a public username or a public content URL, depending on the service.',
      },
      {
        question: 'How does delivery work?',
        answer:
          'After payment, fulfillment follows the delivery notes on the service page for the package you selected. Timing can vary by service and quantity.',
      },
      {
        question: 'What information is required?',
        answer:
          'Typically your email for the order receipt plus the public profile or content link the package targets. Exact fields appear during order configuration.',
      },
      {
        question: 'What happens after checkout?',
        answer:
          'You receive order confirmation details and can track status with your order ID and email on the track-order page.',
      },
    ],
  },

  faq: {
    id: 'homepage-faq',
    title: 'Frequently asked questions',
    description: 'Common questions about ordering on NovaLikes.',
    items: [
      {
        question: 'Is NovaLikes only for Instagram?',
        answer:
          'No. NovaLikes offers Instagram, TikTok, Facebook, and YouTube growth packages from one catalog.',
      },
      {
        question: 'Where do I see prices and package sizes?',
        answer:
          'Open the dedicated service page for the offer you want. Each page lists the live packages for that service.',
      },
      {
        question: 'Can I buy without sharing my password?',
        answer:
          'Yes. Orders are designed around public profile or content details only.',
      },
      {
        question: 'How do I get help with an order?',
        answer:
          'Use the contact page for support, or the track-order page when you already have an order ID and email.',
      },
      {
        question: 'Are refunds always available?',
        answer:
          'Refund and refill rules depend on the package and the Refund Policy. Review those details before purchasing.',
      },
    ],
  },

  reviews: {
    id: 'homepage-reviews',
    title: 'Customer reviews',
    description:
      'Feedback from customers who purchased NovaLikes services. Only approved reviews are shown.',
    cta: { label: 'Read more reviews', href: '/reviews' },
  },

  finalCta: {
    id: 'home-final-cta',
    title: 'Ready to choose a growth service?',
    description:
      'Browse all twelve offers, open the page that matches your goal, and compare live packages before you checkout.',
    primaryCta: { label: 'Browse all services', href: '#services-overview' },
    secondaryCta: { label: 'Contact support', href: '/contact' },
  },

  services: [
    {
      id: 'ig-followers',
      platform: 'instagram',
      slug: 'buy-instagram-followers',
      href: '/buy-instagram-followers',
      name: 'Instagram Followers',
      commercialLabel: 'Buy Instagram Followers',
      title: 'Instagram Followers packages',
      intro:
        'Build a clearer audience baseline for your Instagram profile with packages sized for different stages of growth.',
      points: [
        'Public username only—no password',
        'Multiple package sizes in the live catalog',
        'Useful when you want account-level social proof',
        'Compare options on the dedicated service page',
      ],
      cta: { label: 'View Instagram Followers', href: '/buy-instagram-followers' },
      image: {
        src: '/assets/images/illustrations/buy-instagram-followers-hero-v2.webp',
        alt: 'Illustration for Instagram Followers growth packages on NovaLikes',
      },
      tone: 'rose',
    },
    {
      id: 'ig-likes',
      platform: 'instagram',
      slug: 'buy-instagram-likes',
      href: '/buy-instagram-likes',
      name: 'Instagram Likes',
      commercialLabel: 'Buy Instagram Likes',
      title: 'Instagram Likes packages',
      intro:
        'Support post engagement when you want a stronger first impression on photos, carousels, or Reels.',
      points: [
        'Target a public post URL',
        'Choose a quantity that fits the post',
        'Pairs well with views on video content',
        'Full package list on the service page',
      ],
      cta: { label: 'View Instagram Likes', href: '/buy-instagram-likes' },
      image: {
        src: '/assets/images/illustrations/buy-instagram-likes-hero-v2.webp',
        alt: 'Illustration for Instagram Likes packages on NovaLikes',
      },
      tone: 'violet',
    },
    {
      id: 'ig-views',
      platform: 'instagram',
      slug: 'buy-instagram-views',
      href: '/buy-instagram-views',
      name: 'Instagram Views',
      commercialLabel: 'Buy Instagram Views',
      title: 'Instagram Views packages',
      intro:
        'Help Reels and video posts get started with view packages matched to your content URL.',
      points: [
        'Built for video and Reels URLs',
        'Clear quantities in the catalog',
        'Complements likes for engagement',
        'Delivery notes listed on the service page',
      ],
      cta: { label: 'View Instagram Views', href: '/buy-instagram-views' },
      image: {
        src: '/assets/images/illustrations/buy-instagram-views-hero-v2.webp',
        alt: 'Illustration for Instagram Views packages on NovaLikes',
      },
      tone: 'orange',
    },
    {
      id: 'ig-comments',
      platform: 'instagram',
      slug: 'buy-instagram-comments',
      href: '/buy-instagram-comments',
      name: 'Instagram Comments',
      commercialLabel: 'Buy Instagram Comments',
      title: 'Instagram Comments packages',
      intro:
        'Add conversation signals to a public post when comments are part of your engagement plan.',
      points: [
        'Post URL based ordering',
        'HQ and Premium options where offered',
        'Review package details before checkout',
        'Use thoughtfully alongside organic replies',
      ],
      cta: { label: 'View Instagram Comments', href: '/buy-instagram-comments' },
      image: {
        src: '/assets/images/illustrations/buy-instagram-comments-hero-v2.webp',
        alt: 'Illustration for Instagram Comments packages on NovaLikes',
      },
      tone: 'amber',
    },
    {
      id: 'tt-followers',
      platform: 'tiktok',
      slug: 'buy-tiktok-followers',
      href: '/buy-tiktok-followers',
      name: 'TikTok Followers',
      commercialLabel: 'Buy TikTok Followers',
      title: 'TikTok Followers packages',
      intro:
        'Grow your TikTok audience count with packages designed around a public profile username.',
      points: [
        'No password required',
        'Multiple follower package sizes',
        'Good starting point for account presence',
        'Compare pricing on the service page',
      ],
      cta: { label: 'View TikTok Followers', href: '/buy-tiktok-followers' },
      image: {
        src: '/assets/images/illustrations/buy-tiktok-followers-hero-v2.webp',
        alt: 'Illustration for TikTok Followers packages on NovaLikes',
      },
      tone: 'slate',
    },
    {
      id: 'tt-likes',
      platform: 'tiktok',
      slug: 'buy-tiktok-likes',
      href: '/buy-tiktok-likes',
      name: 'TikTok Likes',
      commercialLabel: 'Buy TikTok Likes',
      title: 'TikTok Likes packages',
      intro:
        'Boost engagement on a specific TikTok video when likes are the metric you want to move.',
      points: [
        'Public video URL required',
        'Package sizes for different video stages',
        'Often paired with views',
        'Full details on the dedicated page',
      ],
      cta: { label: 'View TikTok Likes', href: '/buy-tiktok-likes' },
      image: {
        src: '/assets/images/illustrations/buy-tiktok-likes-hero-v2.webp',
        alt: 'Illustration for TikTok Likes packages on NovaLikes',
      },
      tone: 'cyan',
    },
    {
      id: 'tt-views',
      platform: 'tiktok',
      slug: 'buy-tiktok-views',
      href: '/buy-tiktok-views',
      name: 'TikTok Views',
      commercialLabel: 'Buy TikTok Views',
      title: 'TikTok Views packages',
      intro:
        'Support video reach with view packages, including quality tiers when listed in the catalog.',
      points: [
        'HQ and Premium tiers where available',
        'Sized for different content goals',
        'Public video link only',
        'See delivery notes on the service page',
      ],
      cta: { label: 'View TikTok Views', href: '/buy-tiktok-views' },
      image: {
        src: '/assets/images/illustrations/buy-tiktok-views-hero-v2.webp',
        alt: 'Illustration for TikTok Views packages on NovaLikes',
      },
      tone: 'slate',
    },
    {
      id: 'fb-followers',
      platform: 'facebook',
      slug: 'buy-facebook-followers',
      href: '/buy-facebook-followers',
      name: 'Facebook Followers',
      commercialLabel: 'Buy Facebook Followers',
      title: 'Facebook Followers packages',
      intro:
        'Strengthen profile or page follower counts when audience size is your primary Facebook goal.',
      points: [
        'Public Facebook details only',
        'Package ladder in the live catalog',
        'Useful for newer pages and profiles',
        'Order from the dedicated service page',
      ],
      cta: { label: 'View Facebook Followers', href: '/buy-facebook-followers' },
      image: {
        src: '/assets/images/illustrations/buy-facebook-followers-hero-v2.webp',
        alt: 'Illustration for Facebook Followers packages on NovaLikes',
      },
      tone: 'blue',
    },
    {
      id: 'fb-page-likes',
      platform: 'facebook',
      slug: 'buy-facebook-page-likes',
      href: '/buy-facebook-page-likes',
      name: 'Facebook Page Likes',
      commercialLabel: 'Buy Facebook Page Likes',
      title: 'Facebook Page Likes packages',
      intro:
        'Support Page credibility with page like packages aimed at public Facebook Pages.',
      points: [
        'Page URL based ordering',
        'Multiple quantities available',
        'Distinct from post likes',
        'Review packages before checkout',
      ],
      cta: { label: 'View Facebook Page Likes', href: '/buy-facebook-page-likes' },
      image: {
        src: '/assets/images/illustrations/buy-facebook-page-likes-hero-v2.webp',
        alt: 'Illustration for Facebook Page Likes packages on NovaLikes',
      },
      tone: 'blue',
    },
    {
      id: 'fb-post-likes',
      platform: 'facebook',
      slug: 'buy-facebook-post-likes',
      href: '/buy-facebook-post-likes',
      name: 'Facebook Post Likes',
      commercialLabel: 'Buy Facebook Post Likes',
      title: 'Facebook Post Likes packages',
      intro:
        'Add engagement to a specific public Facebook post when post-level likes are the goal.',
      points: [
        'Public post URL required',
        'Flexible package sizes',
        'Complements page-level growth',
        'Details live on the service page',
      ],
      cta: { label: 'View Facebook Post Likes', href: '/buy-facebook-post-likes' },
      image: {
        src: '/assets/images/illustrations/buy-facebook-post-likes-hero-v2.webp',
        alt: 'Illustration for Facebook Post Likes packages on NovaLikes',
      },
      tone: 'blue',
    },
    {
      id: 'yt-subscribers',
      platform: 'youtube',
      slug: 'buy-youtube-subscribers',
      href: '/buy-youtube-subscribers',
      name: 'YouTube Subscribers',
      commercialLabel: 'Buy YouTube Subscribers',
      title: 'YouTube Subscribers packages',
      intro:
        'Grow channel subscriber counts with packages tailored to public YouTube channels.',
      points: [
        'Channel-focused ordering',
        'No password required',
        'Catalog spans starter to larger sizes',
        'Compare options on the service page',
      ],
      cta: { label: 'View YouTube Subscribers', href: '/buy-youtube-subscribers' },
      image: {
        src: '/assets/images/illustrations/buy-youtube-subscribers-hero-v2.webp',
        alt: 'Illustration for YouTube Subscribers packages on NovaLikes',
      },
      tone: 'red',
    },
    {
      id: 'yt-views',
      platform: 'youtube',
      slug: 'buy-youtube-views',
      href: '/buy-youtube-views',
      name: 'YouTube Views',
      commercialLabel: 'Buy YouTube Views',
      title: 'YouTube Views packages',
      intro:
        'Support video performance with view packages aimed at a public YouTube video URL.',
      points: [
        'Video URL based delivery target',
        'Quantities for different video goals',
        'Pairs with subscriber growth strategies',
        'Full package list on the service page',
      ],
      cta: { label: 'View YouTube Views', href: '/buy-youtube-views' },
      image: {
        src: '/assets/images/illustrations/buy-youtube-views-hero-v2.webp',
        alt: 'Illustration for YouTube Views packages on NovaLikes',
      },
      tone: 'red',
    },
  ] as const satisfies readonly HubServiceMini[],
} as const;

export type HomepageHub = typeof homepageHub;
