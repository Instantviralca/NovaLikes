import { routes } from '@/config/routes';
import { resolveCta } from '@/data/content/cta';
import type { HomepageContent } from '@/types/content';

/**
 * Homepage content — Buy Instagram Followers commercial authority.
 * Section components consume this via HomePageView / mappers.
 */
export const homepageContent: HomepageContent = {
  hero: {
    eyebrow: 'Instagram Growth Platform worldwide',
    title: 'Buy Instagram Followers',
    description:
      'Build stronger social proof for your Instagram profile with package-based growth for creators, businesses, and brands. Compare real audience packages, likes, and views—then buy IG followers or buy followers for Instagram when you are ready.',
    primaryMessage:
      'The clear path to buy Instagram followers and grow brand presence worldwide.',
    purpose: 'Convert visitors searching to buy Instagram followers worldwide',
    primaryKeyword: 'buy instagram followers',
    supportingKeywords: [
      'buy instagram followers',
      'buy followers instagram',
      'buy ig followers',
      'buy real instagram followers',
      'buy followers for instagram',
      'buy instagram likes',
      'buy instagram views',
      'instagram growth services',
    ],
    suggestedWordCount: 120,
    primaryCta: resolveCta('getStarted', {
      label: 'View Instagram Followers Packages',
      href: '/buy-instagram-followers',
    }),
    secondaryCta: resolveCta('browseServices', {
      label: 'Explore Growth Options',
      href: '#instagram-growth-services',
    }),
    microcopy: 'No password required · Secure checkout · Order tracking',
    visual: {
      src: '/assets/images/illustrations/buy-instagram-followers-global-hero-v2.webp',
      alt: 'Buy Instagram Followers dashboard showing follower growth and secure delivery',
      title: 'Buy Instagram Followers',
      caption:
        'Premium Instagram growth for creators and businesses worldwide.',
      width: 1536,
      height: 1024,
    },
  },
  /** Hero trust labels — credibility signals under the hero CTAs (max 3). */
  trustBar: {
    id: 'home-hero-trust',
    title: 'Trust labels',
    purpose: 'Hero credibility signals',
    items: [
      {
        id: 'trust-no-password',
        label: 'No Password Required',
        description: 'Orders use your public Instagram username only.',
        iconKey: 'ShieldCheck',
      },
      {
        id: 'trust-secure',
        label: 'Secure Checkout',
        description: 'Complete checkout through a secure payment flow.',
        iconKey: 'ShieldCheck',
      },
      {
        id: 'trust-tracking',
        label: 'Order Tracking',
        description: 'Monitor available status updates after checkout.',
        iconKey: 'Layers3',
      },
    ],
  },
  heroStats: {
    id: 'home-hero-stats',
    title: 'Verified NovaLikes metrics',
    purpose: 'Hero trust statistics from approved claims only',
    statIds: ['stat-founded', 'stat-customers', 'stat-delivered', 'stat-support'],
  },
  platformGrid: {
    id: 'platform-selector',
    title: 'Choose Your Platform',
    description:
      'Start with Instagram follower packages, or explore growth services for TikTok and Facebook when you are ready.',
    purpose: 'Route users by platform',
    primaryKeyword: 'instagram growth services',
    suggestedWordCount: 50,
    platformIds: ['instagram', 'tiktok', 'facebook'],
    internalLinks: [
      { label: 'Instagram', href: '/buy-instagram-followers' },
      { label: 'TikTok', href: '/buy-tiktok-followers' },
      { label: 'Facebook', href: '/buy-facebook-followers' },
    ],
    cards: [
      {
        platformId: 'instagram',
        description:
          'Buy Instagram followers, likes, views and comments with clear package options for creators, businesses and brands worldwide.',
        ctaLabel: 'View Instagram Packages',
        href: '#instagram-growth-services',
        previewServiceSlugs: [
          'buy-instagram-followers',
          'buy-instagram-likes',
          'buy-instagram-views',
          'buy-instagram-comments',
        ],
      },
      {
        platformId: 'tiktok',
        description:
          'Discover TikTok services for followers, likes and views. Select packages that help creators and businesses expand reach on short-form video.',
        ctaLabel: 'View TikTok Packages',
        href: '#featured-services-tiktok',
        previewServiceSlugs: ['buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views'],
      },
      {
        platformId: 'facebook',
        description:
          'Grow Facebook with followers, page likes and post likes. Packages suited to businesses, creators and brands building page presence.',
        ctaLabel: 'View Facebook Packages',
        href: '#featured-services-facebook',
        previewServiceSlugs: [
          'buy-facebook-followers',
          'buy-facebook-page-likes',
          'buy-facebook-post-likes',
        ],
      },
    ],
  },
  servicesGrid: {
    id: 'featured-services',
    title: 'Popular Instagram Growth Services',
    description:
      'Compare Instagram follower, like, view and comment packages. Start with followers when profile-level social proof is the priority.',
    purpose: 'Highlight curated Instagram services',
    suggestedWordCount: 30,
    ctaLabel: 'View Packages',
    serviceSlugs: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ],
    descriptions: {
      'buy-instagram-followers':
        'Build stronger Instagram profile visibility with follower packages for creators, businesses and brands worldwide.',
      'buy-instagram-likes':
        'Add visible interaction to selected Instagram posts with like packages in several quantities.',
      'buy-instagram-views':
        'Increase the displayed view count on eligible Instagram videos or reels.',
      'buy-instagram-comments':
        'Support visible conversation on posts where added comment activity is part of the campaign goal.',
    },
    badges: {
      'buy-instagram-followers': 'Best Seller',
      'buy-instagram-likes': 'Popular',
      'buy-instagram-views': 'Trending',
      'buy-instagram-comments': 'Recommended',
    },
  },
  whyChooseUs: {
    id: 'home-why',
    title: 'Why Customers Choose NovaLikes',
    description:
      'NovaLikes keeps Instagram ordering clear for customers — from package selection through checkout and delivery tracking.',
    purpose: 'Explain practical ordering features',
    suggestedWordCount: 200,
    cta: {
      label: 'View Instagram Followers Packages',
      href: '/buy-instagram-followers',
    },
    items: [
      {
        id: 'why-no-password',
        title: 'No Instagram Password Required',
        description:
          'Orders use the public Instagram username supplied at checkout. Customers do not need to provide their Instagram password.',
      },
      {
        id: 'why-gradual-delivery',
        title: 'Gradual Delivery',
        description:
          'Orders are delivered according to the selected package details rather than appearing as one unexplained bulk action.',
      },
      {
        id: 'why-secure-checkout',
        title: 'Secure Checkout',
        description:
          'Payments are completed through the secure checkout process available on the website.',
      },
      {
        id: 'why-order-tracking',
        title: 'Order Tracking',
        description:
          'Customers can check their order status through the NovaLikes tracking system.',
      },
      {
        id: 'why-clear-packages',
        title: 'Clear Package Options',
        description:
          'Follower, like and view packages are separated so customers can choose the Instagram service that matches their goal.',
      },
      {
        id: 'why-customer-support',
        title: 'Customer Support',
        description:
          'Support is available for package selection, order questions and delivery-related assistance.',
      },
    ],
  },
  howItWorks: {
    id: 'home-how',
    title: 'How to Buy Instagram Followers worldwide',
    description:
      'Buying Instagram followers should be simple, transparent, and secure. At NovaLikes, complete an order in a few minutes without sharing your Instagram password.',
    purpose: 'Explain how to buy Instagram followers',
    primaryKeyword: 'how to buy Instagram followers',
    suggestedWordCount: 150,
    cta: resolveCta('getStarted', {
      label: 'Compare Packages',
      href: '/buy-instagram-followers',
    }),
    steps: [
      {
        id: 'step-choose-package',
        title: 'Choose Your Instagram Followers Package',
        description:
          "Select the follower package that best matches your goals. Each package clearly displays what you'll receive before checkout.",
      },
      {
        id: 'step-enter-username',
        title: 'Enter Your Public Instagram Username',
        description:
          "Provide the public Instagram username where you'd like the followers delivered. Your Instagram password is never required.",
      },
      {
        id: 'step-checkout',
        title: 'Complete Secure Checkout',
        description:
          'Review your order details and complete payment. Once confirmed, your order moves into processing.',
      },
      {
        id: 'step-track',
        title: 'Track Your Order',
        description:
          'Use the order tracking page to monitor delivery progress from confirmation through delivery.',
      },
    ],
  },
  stats: {
    id: 'home-stats',
    title: 'Experience You Can Verify',
    purpose: 'Reinforce trust with approved claims only',
    statIds: ['stat-founded', 'stat-customers', 'stat-delivered', 'stat-support'],
  },
  testimonials: {
    id: 'home-testimonials',
    title: 'Customer Experiences with NovaLikes',
    description:
      'Genuine customer feedback for NovaLikes Instagram and social media growth services.',
    purpose: 'Social proof',
    testimonialIds: [],
  },
  faq: {
    id: 'home-faq',
    title: 'Frequently Asked Questions About Buying Instagram Followers',
    purpose: 'Answer Instagram follower buying questions',
    primaryKeyword: 'buy instagram followers',
    faqIds: [
      'faq-home-buy-followers',
      'faq-home-how-buy-followers',
      'faq-home-password',
      'faq-home-where-buy',
      'faq-home-likes-views',
      'faq-home-engagement-guarantee',
      'faq-home-check-before',
      'faq-home-track-order',
    ],
  },
  finalCta: {
    id: 'home-final-cta',
    title: 'Ready to Grow Your Instagram Presence?',
    description:
      "Whether you're building a personal brand, launching a new business, promoting an online store, or growing a creator account, NovaLikes makes it easy to compare Instagram growth services and choose the package that matches your goals. Browse our Instagram Followers, Likes, Views, and Comments packages, complete your order through a secure checkout, and track your order every step of the way.",
    purpose: 'Drive conversions to Instagram follower packages',
    primaryCta: {
      label: 'Compare Instagram Followers Packages',
      href: '/buy-instagram-followers',
    },
    secondaryCta: {
      label: 'Explore All Instagram Services',
      href: '#instagram-growth-services',
    },
  },
};

export function getHomepageContent(): HomepageContent {
  return homepageContent;
}
