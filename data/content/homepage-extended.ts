import { routes } from '@/config/routes';
import { learnCategoryPath } from '@/config/routes';

/**
 * Homepage Sections 11–16 — educational / authority content.
 * Stats avoid invented figures; use verifiable qualitative claims only.
 */
export const homepageExtendedSections = {
  byTheNumbers: {
    id: 'instagram-by-the-numbers',
    title: 'Instagram by the Numbers',
    intro:
      "Instagram continues to be one of the world's leading social platforms for creators, businesses, and brands. Building a professional profile requires consistent content, audience engagement, and a strong first impression.",
    /** Qualitative cards only — replace with cited verified figures before publishing numeric claims. */
    stats: [
      {
        id: 'active-users',
        label: 'Active Users',
        value: 'Global Platform',
        description:
          'Instagram continues to be one of the largest social platforms globally.',
      },
      {
        id: 'businesses',
        label: 'Businesses',
        value: 'Brand Presence',
        description:
          'Businesses use Instagram to showcase products and connect with customers.',
      },
      {
        id: 'creators',
        label: 'Creators',
        value: 'Audience Growth',
        description:
          'Creators use Instagram to grow audiences and build partnerships.',
      },
      {
        id: 'engagement',
        label: 'Daily Engagement',
        value: 'Ongoing Activity',
        description: 'Millions of interactions happen on Instagram every day.',
      },
    ],
    whyTitle: 'Why These Numbers Matter',
    whyBody:
      'Strong profiles are built through a combination of quality content, consistent activity, and audience trust. A professional presentation helps businesses and creators make a stronger first impression.',
    cta: {
      label: 'Learn More About Instagram Growth',
      href: learnCategoryPath('instagram'),
    },
    mediaKey: 'byTheNumbers' as const,
  },
  whoWeHelp: {
    id: 'who-we-help',
    title: 'Creators, Businesses & Brands Building Instagram Presence',
    intro: '',
    audiences: [
      {
        id: 'content-creators',
        title: 'Content Creators',
        description: 'Build a stronger creator profile while consistently publishing content.',
      },
      {
        id: 'influencers',
        title: 'Influencers',
        description: 'Present more established brand presence before collaborations.',
      },
      {
        id: 'small-businesses',
        title: 'Small Businesses',
        description: 'Strengthen online visibility and business presence.',
      },
      {
        id: 'ecommerce',
        title: 'Ecommerce Stores',
        description:
          'Support product marketing with professional visual credibility.',
      },
      {
        id: 'restaurants',
        title: 'Restaurants',
        description: 'Promote your menu and connect with local customers.',
      },
      {
        id: 'real-estate',
        title: 'Real Estate Agents',
        description: 'Showcase listings and build credibility.',
      },
      {
        id: 'agencies',
        title: 'Marketing Agencies',
        description: 'Support client campaigns with audience growth options.',
      },
      {
        id: 'personal-brands',
        title: 'Personal Brands',
        description:
          'Grow a creator profile that reflects your expertise and professionalism.',
      },
    ],
    cta: {
      label: 'Explore Growth Options',
      href: '#instagram-growth-services',
    },
    mediaKey: 'whoWeHelp' as const,
  },
  socialProofMatters: {
    id: 'why-social-proof-matters',
    title: 'Why Social Proof Matters on Instagram',
    intro: [
      'When someone visits an Instagram profile, they often make a decision within seconds. Profile presentation, consistent content, and visible audience activity all contribute to that first impression.',
      "Social proof isn't a replacement for quality content—it complements a long-term content strategy by helping profiles appear more established.",
    ],
    timeline: [
      'Visitor',
      'Views Profile',
      'Checks Followers',
      'Looks at Content',
      'Decides to Follow',
    ],
    benefits: [
      'Stronger first impressions',
      'Better brand presentation',
      'Professional appearance',
      'Increased profile confidence',
    ],
    cta: {
      label: 'Explore Instagram Followers Packages',
      href: '/buy-instagram-followers',
    },
    mediaKey: 'socialProofMatters' as const,
  },
  learnMore: {
    id: 'learn-instagram-growth',
    title: 'Continue Learning About Instagram Growth',
    intro:
      'Looking to improve your Instagram strategy? Explore our guides covering content creation, profile optimization, Reels, engagement, and audience growth.',
    cards: [
      {
        id: 'followers-guide',
        title: 'Instagram Followers Guide',
        description:
          'Learn about follower growth and professional profile presentation.',
        href: learnCategoryPath('instagram'),
      },
      {
        id: 'likes-guide',
        title: 'Instagram Likes Guide',
        description: 'Understand how likes support post visibility.',
        href: learnCategoryPath('instagram'),
      },
      {
        id: 'views-guide',
        title: 'Instagram Views Guide',
        description: 'Discover how video views fit into an Instagram strategy.',
        href: learnCategoryPath('instagram'),
      },
      {
        id: 'comments-guide',
        title: 'Instagram Comments Guide',
        description:
          'Learn how visible conversations contribute to profile activity.',
        href: learnCategoryPath('instagram'),
      },
      {
        id: 'growth-tips',
        title: 'Instagram Growth Tips',
        description: 'Educational content focused on long-term account growth.',
        href: learnCategoryPath('instagram'),
      },
      {
        id: 'creator-resources',
        title: 'Creator Resources',
        description: 'Helpful articles for creators and businesses.',
        href: learnCategoryPath('instagram'),
      },
    ],
    cta: {
      label: 'Browse All Learn Guides',
      href: routes.learn,
    },
    mediaKey: 'learnGrowth' as const,
  },
  compareServices: {
    id: 'compare-instagram-services',
    title: 'Which Instagram Service Matches Your Goal?',
    rows: [
      {
        goal: 'Build profile credibility',
        service: 'Followers',
        bestFor: 'Overall profile presentation',
      },
      {
        goal: 'Increase post engagement',
        service: 'Likes',
        bestFor: 'Individual posts',
      },
      {
        goal: 'Improve Reel visibility',
        service: 'Views',
        bestFor: 'Video content',
      },
      {
        goal: 'Add visible discussion',
        service: 'Comments',
        bestFor: 'Selected posts',
      },
    ],
    supporting:
      'Each Instagram service supports a different objective. Understanding the role of followers, likes, views, and comments helps you choose the package that best aligns with your current marketing goals.',
    miniCards: [
      { label: 'Followers', focus: 'Profile', href: '/buy-instagram-followers' },
      { label: 'Likes', focus: 'Posts', href: '/buy-instagram-likes' },
      { label: 'Views', focus: 'Videos', href: '/buy-instagram-views' },
      { label: 'Comments', focus: 'Community', href: '/buy-instagram-comments' },
    ],
    cta: {
      label: 'Compare All Instagram Packages',
      href: '#instagram-growth-services',
    },
    mediaKey: 'compareServices' as const,
  },
  needHelp: {
    id: 'need-help-choosing-package',
    title: 'Not Sure Which Instagram Package Is Right for You?',
    intro:
      "Choosing the right package depends on your goals, account type, and content strategy. If you're unsure where to start, our team can help you compare available options and answer questions before you place an order.",
    cards: [
      {
        id: 'help-package',
        title: 'Help Choosing a Package',
        description: "We'll explain the available options.",
      },
      {
        id: 'help-ordering',
        title: 'Questions About Ordering',
        description: 'Learn how the process works before checkout.',
      },
      {
        id: 'help-tracking',
        title: 'Order Tracking Support',
        description: 'Get assistance with an existing order.',
      },
      {
        id: 'help-general',
        title: 'General Assistance',
        description: 'Our support team is available to help.',
      },
    ],
    primaryCta: {
      label: 'Compare Packages',
      href: '/buy-youtube-subscribers',
    },
    secondaryCta: {
      label: 'Contact Support',
      href: routes.contact,
    },
    mediaKey: 'needHelp' as const,
  },
} as const;

export const homepageExtendedMedia = {
  byTheNumbers: {
    src: '/assets/images/illustrations/instagram-by-the-numbers-v2.webp',
    alt: 'Instagram growth statistics dashboard',
    title: 'Instagram by the Numbers',
    caption:
      'Educational context for Instagram growth — verify any numeric claims before publishing.',
    width: 1536,
    height: 1024,
  },
  whoWeHelp: {
    src: '/assets/images/illustrations/who-we-help-instagram-v2.webp',
    alt: 'Creators and businesses growing with Instagram dashboards',
    title: 'Who We Help on Instagram',
    caption: 'NovaLikes supports creators, businesses, and brands worldwide.',
    width: 1536,
    height: 1024,
  },
  socialProofMatters: {
    src: '/assets/images/illustrations/why-social-proof-matters-v2.webp',
    alt: 'Instagram profile social proof and analytics dashboard',
    title: 'Why Social Proof Matters',
    caption:
      'Social proof supports first impressions alongside quality content and consistency.',
    width: 1536,
    height: 1024,
  },
  learnGrowth: {
    src: '/assets/images/illustrations/learn-instagram-growth-v2.webp',
    alt: 'Instagram growth learning resources and guides dashboard',
    title: 'Learn About Instagram Growth',
    caption: 'Explore NovaLikes Learn guides for Instagram strategy and growth.',
    width: 1536,
    height: 1024,
  },
  compareServices: {
    src: '/assets/images/illustrations/compare-instagram-services-v2.webp',
    alt: 'Compare Instagram followers likes views and comments services',
    title: 'Compare Instagram Services',
    caption: 'Match followers, likes, views, and comments to your current goal.',
    width: 1536,
    height: 1024,
  },
  needHelp: {
    src: '/assets/images/illustrations/need-help-choosing-package-v2.webp',
    alt: 'Customer support helping choose Instagram packages',
    title: 'Need Help Choosing a Package',
    caption: 'Compare packages or contact NovaLikes support before you order.',
    width: 1536,
    height: 1024,
  },
} as const;
