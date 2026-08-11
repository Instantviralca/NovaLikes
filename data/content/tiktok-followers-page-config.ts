import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type TikTokFollowersBestPractice = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type TikTokFollowersPackageRec = {
  id: string;
  quantity: string;
  recommendedFor: string;
};

export type TikTokFollowersPageConfig = {
  doesBuyingWork: {
    id: string;
    title: string;
    description: string;
  };
  packageRecommendation: {
    id: string;
    title: string;
    description: string;
    rows: TikTokFollowersPackageRec[];
  };
  bestPractices: {
    id: string;
    title: string;
    description: string;
    items: TikTokFollowersBestPractice[];
  };
};

/**
 * Lean topical blocks for Buy TikTok Followers.
 * Hero, pricing, process, requirements, FAQ remain in data/content/tiktok.ts.
 */
export const TIKTOK_FOLLOWERS_PAGE_CONFIG: TikTokFollowersPageConfig = {
  doesBuyingWork: {
    id: 'does-buying-tiktok-followers-work',
    title: 'Does Buying TikTok Followers Work?',
    description:
      'Buying TikTok followers increases the visible follower count on your profile, which may improve how your account appears to new visitors. Follower packages do not guarantee viral videos, higher engagement, or business growth. Consistent content remains the most important factor for long-term success.',
  },
  packageRecommendation: {
    id: 'compare-popular-tiktok-follower-packages',
    title: 'Compare Popular TikTok Follower Packages',
    description:
      'Choosing the right package depends on your current audience size, content activity, and overall growth goals. Use these recommendations to pick a quantity that fits naturally with your profile.',
    rows: [
      { id: 'pkg-100', quantity: '100', recommendedFor: 'Starter — testing the ordering process' },
      { id: 'pkg-500', quantity: '500', recommendedFor: 'Creator — new accounts building an audience' },
      { id: 'pkg-1000', quantity: '1,000', recommendedFor: 'Business — active creators and small businesses' },
      { id: 'pkg-3000', quantity: '3,000', recommendedFor: 'Brand — established creator accounts' },
      { id: 'pkg-5000', quantity: '5,000', recommendedFor: 'Campaign — brands and larger campaigns' },
      { id: 'pkg-10000', quantity: '10,000+', recommendedFor: 'Enterprise — high-volume promotions' },
    ],
  },
  bestPractices: {
    id: 'tiktok-followers-best-practices',
    title: 'Best Practices After You Buy TikTok Followers',
    description:
      'Buying followers on TikTok works best when it supports an active content routine. Use these four habits to keep your profile looking balanced and credible.',
    items: [
      {
        id: 'bp-profile',
        title: 'Complete your profile',
        description:
          'Add a clear photo, bio, and links so new visitors understand who you are after they land on your account.',
        icon: 'users',
      },
      {
        id: 'bp-post',
        title: 'Post consistently',
        description:
          'Publish on a steady schedule so growth looks natural alongside ongoing audience activity.',
        icon: 'clapperboard',
      },
      {
        id: 'bp-quality',
        title: 'Publish quality videos',
        description:
          'Original, well-edited short-form videos remain the strongest driver of lasting TikTok growth.',
        icon: 'sparkles',
      },
      {
        id: 'bp-engage',
        title: 'Engage with your audience',
        description:
          'Reply to comments and interact with viewers to turn profile visits into ongoing community activity.',
        icon: 'heart',
      },
    ],
  },
};
