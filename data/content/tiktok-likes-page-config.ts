import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type TikTokLikesChecklistItem = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type TikTokLikesAudienceCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type TikTokLikesPackageRec = {
  id: string;
  quantity: string;
  recommendedFor: string;
};

export type TikTokLikesPageConfig = {
  orderNotice: string;
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
  serviceCompare: {
    id: string;
    title: string;
    description: string;
    likes: { title: string; description: string };
    views: { title: string; description: string; href: string; ctaLabel: string };
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
    items: TikTokLikesChecklistItem[];
  };
  canada: {
    id: string;
    title: string;
    description: string;
    body: string;
    cards: TikTokLikesAudienceCard[];
  };
  packageSizes: {
    id: string;
    title: string;
    description: string;
    rows: TikTokLikesPackageRec[];
    bottomNote: string;
  };
  bestPractices: {
    id: string;
    title: string;
    description: string;
    items: TikTokLikesChecklistItem[];
  };
};

/**
 * Lean topical blocks for Buy TikTok Likes.
 * Hero, pricing, process, requirements, FAQ remain in data/content/tiktok.ts.
 */
export const TIKTOK_LIKES_PAGE_CONFIG: TikTokLikesPageConfig = {
  orderNotice:
    'NovaLikes never asks for your TikTok password. The order is processed using only the public video URL and the details entered at checkout.',
  doesBuyingWork: {
    id: 'does-buying-tiktok-likes-work',
    title: 'Does Buying TikTok Likes Work?',
    description:
      'Buying TikTok likes increases the visible like count on a selected public video and may improve how active the post appears to new viewers. It does not guarantee additional views, followers, comments, sales or TikTok algorithm promotion.',
    helpTitle: 'What It Can Help With',
    helpItems: [
      'Strengthen the visible engagement on a selected video',
      'Improve the first impression of an active post',
      'Support product launches and creator campaigns',
      'Add visible reaction activity to branded content',
    ],
    limitTitle: 'What It Does Not Guarantee',
    limitItems: [
      'Viral reach',
      'Organic comments or shares',
      'More followers',
      'Sales or conversions',
      'Placement on the For You feed',
      'Protection from platform enforcement',
    ],
    closingNote:
      'Like packages work best when they support original videos, consistent publishing and genuine audience interaction rather than replace them.',
  },
  serviceCompare: {
    id: 'tiktok-likes-views-or-followers',
    title: 'Should You Choose TikTok Likes, Views or Followers?',
    description:
      'The right service depends on what you want to support. Likes affect the visible reaction count on a specific video, views affect its visible watch count, and followers affect the audience count shown on your profile.',
    likes: {
      title: 'TikTok Likes',
      description:
        'Choose likes when your goal is to support visible engagement on a particular public video.',
    },
    views: {
      title: 'TikTok Views',
      description:
        'Choose views when your goal is to increase the visible watch count on a selected video.',
      href: '/buy-tiktok-views',
      ctaLabel: 'View TikTok Views Packages',
    },
    followers: {
      title: 'TikTok Followers',
      description:
        'Choose followers when your goal is to strengthen the audience count displayed on your TikTok profile.',
      href: '/buy-tiktok-followers',
      ctaLabel: 'View TikTok Followers Packages',
    },
    combinedNote:
      'Some campaigns use likes and views together, but each service should be selected separately according to the video and account goal. A package cannot guarantee organic engagement or long-term growth.',
  },
  beforeBuying: {
    id: 'what-to-check-before-buying-tiktok-likes',
    title: 'What Should You Check Before Buying TikTok Likes?',
    description:
      'Before buying TikTok likes, check that the provider displays clear pricing, accepts a public video URL, does not request your password and explains delivery, tracking, support and refund conditions before payment.',
    framingNote:
      'The best place to buy TikTok likes is one that clearly explains its pricing, delivery process, account requirements and customer-support policies before checkout.',
    items: [
      {
        id: 'tt-l-check-pricing',
        title: 'Clear Package Pricing',
        description:
          'The quantity and final price should be visible before checkout, without unexpected charges appearing later.',
        icon: 'credit-card',
      },
      {
        id: 'tt-l-check-url',
        title: 'Public Video Link Only',
        description:
          'A standard like order should require the selected public video URL, not access to your TikTok account.',
        icon: 'lock',
      },
      {
        id: 'tt-l-check-delivery',
        title: 'Delivery Information',
        description:
          'Review the available delivery estimate and any package conditions before completing payment.',
        icon: 'truck',
      },
      {
        id: 'tt-l-check-tracking',
        title: 'Order Tracking',
        description:
          'A visible status system makes it easier to understand whether the order is confirmed, processing or complete.',
        icon: 'map-pin',
      },
      {
        id: 'tt-l-check-support',
        title: 'Customer Support',
        description:
          'Choose a service with a clear contact option in case the video link, package or delivery details need attention.',
        icon: 'headphones',
      },
      {
        id: 'tt-l-check-policies',
        title: 'Written Policies',
        description:
          'Read the refund, refill and eligibility terms so you understand what is covered after purchase.',
        icon: 'shield-check',
      },
    ],
  },
  canada: {
    id: 'buying-tiktok-likes',
    title: 'Buying TikTok Likes worldwide',
    description:
      'NovaLikes offers TikTok like packages for creators, businesses, agencies and brands worldwide. You can compare package sizes, review pricing, and complete your order using a public TikTok video link without providing your account password.',
    body: "Whether you're promoting a product launch, growing a creator account, or increasing engagement on a business video, choosing the right package starts with understanding your goals. Before checkout, review the selected quantity, delivery information and package details so you know exactly what to expect.",
    cards: [
      {
        id: 'tt-l-ca-creators',
        title: 'For Creators',
        description:
          'Support engagement on public videos while continuing to publish original short-form content.',
        icon: 'clapperboard',
      },
      {
        id: 'tt-l-ca-businesses',
        title: 'For Businesses',
        description:
          'Highlight promotional videos, product launches and brand announcements with additional visible engagement.',
        icon: 'briefcase',
      },
      {
        id: 'tt-l-ca-brands',
        title: 'For Brands',
        description:
          'Choose package sizes that match your campaign goals and existing audience.',
        icon: 'megaphone',
      },
      {
        id: 'tt-l-ca-agencies',
        title: 'For Agencies',
        description:
          'Compare different quantities for client campaigns while keeping the ordering process simple and transparent.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-tiktok-like-package-sizes',
    title: 'Popular TikTok Like Package Sizes',
    description:
      "Choosing the right quantity depends on your video's current engagement, audience size and campaign objective. These recommendations are intended to help you select a package that fits naturally with your content.",
    rows: [
      { id: 'pkg-50', quantity: '50 Likes', recommendedFor: 'New videos' },
      { id: 'pkg-100', quantity: '100 Likes', recommendedFor: 'Testing the service' },
      { id: 'pkg-200', quantity: '200 Likes', recommendedFor: 'Active creators' },
      { id: 'pkg-500', quantity: '500 Likes', recommendedFor: 'Business content' },
      { id: 'pkg-1000', quantity: '1,000 Likes', recommendedFor: 'Larger campaigns' },
      {
        id: 'pkg-10k',
        quantity: '10K+ Likes',
        recommendedFor: 'High-volume promotional content',
      },
    ],
    bottomNote:
      'Rather than selecting the largest available package immediately, consider a quantity that aligns with your current engagement and posting activity. Many customers buy 50 TikTok likes or buy 100 TikTok likes to start, buy 200 TikTok likes for active creator posts, or buy 10K TikTok likes for larger promotions when that scale fits the campaign.',
  },
  bestPractices: {
    id: 'best-practices-after-buying-tiktok-likes',
    title: 'Best Practices After Buying TikTok Likes',
    description:
      'TikTok like packages work best when they support an active content strategy. Continue publishing original videos and engaging with your audience to maintain long-term profile growth.',
    items: [
      {
        id: 'bp-publish',
        title: 'Publish Consistently',
        description: 'Keep uploading new videos to maintain activity on your profile.',
        icon: 'clapperboard',
      },
      {
        id: 'bp-quality',
        title: 'Create High-Quality Content',
        description:
          'Strong video quality, clear captions and engaging topics remain essential for long-term success.',
        icon: 'sparkles',
      },
      {
        id: 'bp-engage',
        title: 'Engage With Your Audience',
        description:
          'Reply to comments and interact with viewers to encourage genuine community engagement.',
        icon: 'heart',
      },
      {
        id: 'bp-long-term',
        title: 'Build Long-Term Growth',
        description:
          "Likes can support a video's presentation, but sustainable growth comes from consistent publishing and audience interaction.",
        icon: 'users',
      },
    ],
  },
};
