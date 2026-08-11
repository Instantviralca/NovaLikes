import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type TikTokViewsChecklistItem = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type TikTokViewsAudienceCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type TikTokViewsPackageRec = {
  id: string;
  quantity: string;
  recommendedFor: string;
};

export type TikTokViewsTimelineStep = {
  id: string;
  title: string;
  description: string;
};

export type TikTokViewsDirectAnswer = {
  id: string;
  title: string;
  description: string;
};

export type TikTokViewsPageConfig = {
  orderNotice: string;
  canYouBuy: TikTokViewsDirectAnswer;
  supportVisibility: TikTokViewsDirectAnswer;
  doesBuyingWork: {
    id: string;
    title: string;
    description: string;
    helpTitle: string;
    helpItems: string[];
    limitTitle: string;
    limitItems: string[];
    closingNote: string;
  };
  whatHappens: {
    id: string;
    title: string;
    description: string;
    steps: TikTokViewsTimelineStep[];
  };
  worthIt: TikTokViewsDirectAnswer;
  shouldYouBuy: TikTokViewsDirectAnswer;
  serviceCompare: {
    id: string;
    title: string;
    description: string;
    views: { title: string; description: string };
    likes: { title: string; description: string; href: string; ctaLabel: string };
    followers: {
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    };
    combinedNote: string;
  };
  beforeBuying: {
    id: string;
    title: string;
    description: string;
    framingNote: string;
    items: TikTokViewsChecklistItem[];
  };
  canada: {
    id: string;
    title: string;
    description: string;
    body: string;
    cards: TikTokViewsAudienceCard[];
  };
  packageSizes: {
    id: string;
    title: string;
    description: string;
    rows: TikTokViewsPackageRec[];
    bottomNote: string;
  };
  bestPractices: {
    id: string;
    title: string;
    description: string;
    items: TikTokViewsChecklistItem[];
  };
};

/**
 * Lean topical blocks for Buy TikTok Views.
 * Hero, pricing, process, requirements, FAQ remain in data/content/tiktok.ts.
 */
export const TIKTOK_VIEWS_PAGE_CONFIG: TikTokViewsPageConfig = {
  orderNotice:
    'NovaLikes never asks for your TikTok password. The order is processed using only the public video URL and the details entered at checkout.',
  canYouBuy: {
    id: 'can-you-buy-tiktok-views',
    title: 'Can You Buy TikTok Views?',
    description:
      'Yes. TikTok view packages allow you to increase the visible watch count on a public video by selecting a package, providing the public video link and completing checkout. The process does not require your TikTok password. Purchased views can improve a video\'s visible activity, but they do not guarantee likes, followers, engagement or viral reach.',
  },
  supportVisibility: {
    id: 'how-tiktok-views-support-video-visibility',
    title: 'How TikTok Views Support Video Visibility',
    description:
      'A higher visible watch count can make a public TikTok video look more active when someone opens it from a profile, shared link or feed. That first impression may encourage viewers to stay longer, but views alone do not create likes, comments, followers or For You placement. Visibility support works best when the video already has a clear hook and a reason for people to watch.',
  },
  doesBuyingWork: {
    id: 'does-buying-tiktok-views-work',
    title: 'Does Buying TikTok Views Work?',
    description:
      'Buying TikTok views increases the visible watch count on a selected public video and may improve how active the post appears to new viewers. It does not guarantee likes, comments, followers, sales, viral reach or placement on the For You feed.',
    helpTitle: 'What It Can Help With',
    helpItems: [
      'Increase the visible watch count',
      'Improve the first impression of an active post',
      'Support product launches and creator campaigns',
      'Add visible activity to branded content',
    ],
    limitTitle: 'What It Does Not Guarantee',
    limitItems: [
      'Viral reach',
      'Organic likes or comments',
      'More followers',
      'Sales or conversions',
      'Algorithmic promotion',
      'Protection from platform enforcement',
    ],
    closingNote:
      'View packages work best when they support original videos, strong hooks, consistent publishing and genuine audience interaction rather than replace them.',
  },
  whatHappens: {
    id: 'what-happens-when-you-buy-tiktok-views',
    title: 'What Happens When You Buy TikTok Views?',
    description:
      "When you buy TikTok views, the selected public video receives the purchased view package according to the provider's delivery process. This increases the visible view count on that video, but it does not automatically generate likes, comments, followers or viral reach. Long-term performance still depends on the quality of your content and audience engagement.",
    steps: [
      {
        id: 'tt-v-th-confirmed',
        title: 'Order Confirmed',
        description: 'After checkout, your order is verified and prepared for processing.',
      },
      {
        id: 'tt-v-th-delivery',
        title: 'Delivery Begins',
        description:
          'Views start being delivered according to the selected package and delivery schedule.',
      },
      {
        id: 'tt-v-th-count',
        title: 'View Count Increases',
        description:
          'The visible watch count on your selected TikTok video gradually increases.',
      },
      {
        id: 'tt-v-th-continues',
        title: 'Campaign Continues',
        description:
          'Continue publishing quality content to support long-term account growth.',
      },
    ],
  },
  worthIt: {
    id: 'is-buying-tiktok-views-worth-it',
    title: 'Is Buying TikTok Views Worth It?',
    description:
      'Buying TikTok views can be worth it when your goal is to support the visible watch count on a public video and strengthen its first impression. It is less useful if you expect guaranteed likes, followers, sales or viral reach. Sustainable results still depend on original content, clear hooks and consistent publishing alongside any package you choose.',
  },
  shouldYouBuy: {
    id: 'should-you-buy-tiktok-views',
    title: 'Should You Buy TikTok Views?',
    description:
      'You should buy TikTok views only when a higher visible watch count matches your campaign goal and you already plan to keep publishing strong content. Skip packages if you need guaranteed followers, sales or viral reach. For many creators and businesses, views are a support tool for first impressions — not a replacement for hooks, consistency and audience engagement.',
  },
  serviceCompare: {
    id: 'tiktok-views-likes-or-followers',
    title: 'Views vs Likes vs Followers',
    description:
      'Each TikTok service supports a different goal. Views increase the visible watch count on a video, likes strengthen visible engagement, and followers increase the audience displayed on your profile. Choosing the right service depends on what you want to improve.',
    views: {
      title: 'TikTok Views',
      description:
        'Choose views when your goal is to increase the visible watch count on a specific public video.',
    },
    likes: {
      title: 'TikTok Likes',
      description:
        'Choose likes when you want to improve the visible engagement on a selected video.',
      href: '/buy-tiktok-likes',
      ctaLabel: 'View TikTok Likes',
    },
    followers: {
      title: 'TikTok Followers',
      description:
        "Choose followers when your goal is to strengthen your profile's visible audience.",
      href: '/buy-tiktok-followers',
      ctaLabel: 'View TikTok Followers',
    },
    combinedNote:
      'Many creators combine views, likes and followers across different campaigns, but each service should be selected according to the objective of the video or profile. No package guarantees organic growth or viral performance.',
  },
  beforeBuying: {
    id: 'what-to-check-before-buying-tiktok-views',
    title: 'What Should You Check Before Buying TikTok Views?',
    description:
      "Before purchasing TikTok views, review the provider's package details, pricing, delivery information, support options and published policies. A transparent ordering process helps you understand exactly what you're buying before checkout.",
    framingNote:
      'The best place to buy TikTok views is one that clearly explains pricing, delivery timelines, support and service policies before payment rather than relying on marketing claims alone.',
    items: [
      {
        id: 'tt-v-check-pricing',
        title: 'Transparent Pricing',
        description:
          'Package prices should be clearly displayed before payment with no unexpected charges.',
        icon: 'credit-card',
      },
      {
        id: 'tt-v-check-url',
        title: 'Public Video Link Only',
        description:
          'A standard view order only requires the public TikTok video URL, not your account password.',
        icon: 'lock',
      },
      {
        id: 'tt-v-check-delivery',
        title: 'Delivery Information',
        description: 'Review estimated delivery details before placing your order.',
        icon: 'truck',
      },
      {
        id: 'tt-v-check-tracking',
        title: 'Order Tracking',
        description:
          'Track your order progress after checkout using your order information.',
        icon: 'map-pin',
      },
      {
        id: 'tt-v-check-support',
        title: 'Customer Support',
        description:
          'Choose a provider that offers accessible support if you need help with your order.',
        icon: 'headphones',
      },
      {
        id: 'tt-v-check-policies',
        title: 'Clear Policies',
        description:
          'Review refund, refill and service policies before completing your purchase.',
        icon: 'shield-check',
      },
    ],
  },
  canada: {
    id: 'buying-tiktok-views',
    title: 'Buying TikTok Views worldwide',
    description:
      'NovaLikes provides TikTok view packages for creators, businesses and brands worldwide. Compare package sizes, review pricing and complete your order using only the public TikTok video link.',
    body: "Whether you're promoting a product, launching a campaign or increasing the visibility of a public video, selecting the right package starts with understanding your goals. Review the package details and delivery information before completing your purchase.",
    cards: [
      {
        id: 'tt-v-ca-creators',
        title: 'For Creators',
        description:
          'Support new videos while continuing to publish original content.',
        icon: 'clapperboard',
      },
      {
        id: 'tt-v-ca-businesses',
        title: 'For Businesses',
        description:
          'Increase visibility for promotional videos and brand campaigns.',
        icon: 'briefcase',
      },
      {
        id: 'tt-v-ca-brands',
        title: 'For Brands',
        description:
          'Choose larger packages for product launches and marketing campaigns.',
        icon: 'megaphone',
      },
      {
        id: 'tt-v-ca-agencies',
        title: 'For Agencies',
        description:
          'Manage video campaigns across multiple client accounts with flexible package options.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-tiktok-view-package-sizes',
    title: 'Popular TikTok View Package Sizes',
    description:
      'Different campaigns require different levels of visibility. These recommendations can help you choose a package that fits naturally with your current goals.',
    rows: [
      { id: 'pkg-100', quantity: '100 Views', recommendedFor: 'Testing a new video' },
      { id: 'pkg-1k', quantity: '1,000 Views', recommendedFor: 'Active creators' },
      {
        id: 'pkg-10k',
        quantity: '10,000 Views',
        recommendedFor: 'Growing business videos',
      },
      {
        id: 'pkg-100k',
        quantity: '100,000 Views',
        recommendedFor: 'Large campaigns',
      },
      {
        id: 'pkg-1m',
        quantity: '1 Million Views',
        recommendedFor: 'High-volume promotional campaigns',
      },
    ],
    bottomNote:
      'Choose a package that matches your current content strategy rather than automatically selecting the largest available option. Many customers buy 100 TikTok views to test a new video, buy 1,000 TikTok views for active creator posts, buy 10,000 TikTok views for growing business content, or buy 100,000 TikTok views and buy 1 million TikTok views when larger campaign visibility is the goal.',
  },
  bestPractices: {
    id: 'best-practices-after-buying-tiktok-views',
    title: 'Best Practices After Buying TikTok Views',
    description:
      'TikTok view packages work best when they support an active publishing strategy rather than replace one. Continue creating original videos, improving content quality and engaging with your audience to build long-term visibility.',
    items: [
      {
        id: 'bp-publish',
        title: 'Keep Publishing',
        description:
          'Upload new videos consistently to keep your profile active and encourage ongoing audience interest.',
        icon: 'clapperboard',
      },
      {
        id: 'bp-quality',
        title: 'Improve Video Quality',
        description:
          'Strong hooks, clear visuals and engaging storytelling are still the biggest drivers of long-term TikTok performance.',
        icon: 'sparkles',
      },
      {
        id: 'bp-engage',
        title: 'Engage With Your Audience',
        description:
          'Reply to comments, answer questions and encourage interaction to build stronger community engagement.',
        icon: 'heart',
      },
      {
        id: 'bp-long-term',
        title: 'Build Sustainable Growth',
        description:
          "View packages can support a video's presentation, but consistent publishing and audience interaction remain the foundation of long-term account growth.",
        icon: 'users',
      },
    ],
  },
};
