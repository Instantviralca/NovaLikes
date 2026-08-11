import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type FacebookFollowersInfoCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type FacebookFollowersDirectAnswer = {
  id: string;
  title: string;
  description: string;
};

export type FacebookFollowersTimelineStep = {
  id: string;
  title: string;
  description: string;
};

export type FacebookFollowersPackageRec = {
  id: string;
  quantity: string;
  recommendedFor: string;
};

export type FacebookFollowersPageConfig = {
  orderNotice: string;
  canYouBuy: FacebookFollowersDirectAnswer & {
    cards: FacebookFollowersInfoCard[];
  };
  doesBuyingHelp: {
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
    steps: FacebookFollowersTimelineStep[];
  };
  serviceCompare: {
    id: string;
    title: string;
    description: string;
    followers: { title: string; description: string };
    pageLikes: {
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    };
    postLikes: {
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
    items: FacebookFollowersInfoCard[];
  };
  canada: {
    id: string;
    title: string;
    description: string;
    body: string;
    cards: FacebookFollowersInfoCard[];
  };
  packageSizes: {
    id: string;
    title: string;
    description: string;
    rows: FacebookFollowersPackageRec[];
    bottomNote: string;
  };
  whyChoose: {
    id: string;
    title: string;
    description: string;
    items: FacebookFollowersInfoCard[];
  };
  bestPractices: {
    id: string;
    title: string;
    description: string;
    items: FacebookFollowersInfoCard[];
  };
  commonMistakes: {
    id: string;
    title: string;
    description: string;
    items: FacebookFollowersInfoCard[];
  };
};

/**
 * Lean topical blocks for Buy Facebook Followers.
 * Hero, pricing, Why Buy, How to Buy, and requirements remain in data/content/facebook.ts.
 */
export const FACEBOOK_FOLLOWERS_PAGE_CONFIG: FacebookFollowersPageConfig = {
  orderNotice:
    'NovaLikes never asks for your Facebook password. Your order is processed using only your public Facebook Page URL and the information you provide during checkout.',
  canYouBuy: {
    id: 'can-you-buy-facebook-followers',
    title: 'Can You Buy Facebook Followers?',
    description:
      "Yes. Facebook follower packages allow you to increase the visible follower count on a public Facebook page by selecting a package, providing your public Page URL and completing checkout. Your Facebook password is not required. While follower packages can strengthen a page's visible audience, they do not guarantee engagement, sales or increased organic reach.",
    cards: [
      {
        id: 'fb-f-can-page',
        title: 'Public Facebook Page',
        description:
          'Orders are completed using the public URL of your Facebook page.',
        icon: 'users',
      },
      {
        id: 'fb-f-can-password',
        title: 'No Password Required',
        description:
          'Your Facebook login credentials are never required during checkout.',
        icon: 'lock',
      },
      {
        id: 'fb-f-can-packages',
        title: 'Transparent Packages',
        description:
          'Compare package sizes before selecting the quantity that matches your page.',
        icon: 'sparkles',
      },
      {
        id: 'fb-f-can-track',
        title: 'Order Tracking',
        description:
          'Track available delivery updates after your purchase has been confirmed.',
        icon: 'map-pin',
      },
    ],
  },
  doesBuyingHelp: {
    id: 'does-buying-facebook-followers-help',
    title: 'Does Buying Facebook Followers Help?',
    description:
      "Buying Facebook followers increases the visible follower count on a Facebook page, which may help create a stronger first impression for visitors. However, follower packages do not guarantee more engagement, higher organic reach, additional sales or better rankings within Facebook's recommendation systems.",
    helpTitle: 'What It Can Help With',
    helpItems: [
      "Strengthen your page's visible audience",
      'Improve credibility for new visitors',
      'Support business launches and promotions',
      'Help build a stronger community appearance',
    ],
    limitTitle: 'What It Does Not Guarantee',
    limitItems: [
      'More post engagement',
      'Higher organic reach',
      'Increased sales',
      'More comments or shares',
      'Monetization approval',
      'Algorithmic promotion',
    ],
    closingNote:
      'Facebook followers work best when they support consistent publishing, community engagement and valuable content rather than replace them.',
  },
  whatHappens: {
    id: 'what-happens-when-you-buy-facebook-followers',
    title: 'What Happens When You Buy Facebook Followers?',
    description:
      'After your order is confirmed, the selected follower package is processed using the public Facebook Page URL you provided. As delivery progresses, the visible follower count on your page increases according to the selected package. This does not automatically increase engagement, page reach or business results.',
    steps: [
      {
        id: 'fb-f-th-confirmed',
        title: 'Order Confirmed',
        description:
          'Your payment is verified and your order enters the processing queue.',
      },
      {
        id: 'fb-f-th-delivery',
        title: 'Delivery Begins',
        description:
          'Followers begin to be delivered according to the selected package.',
      },
      {
        id: 'fb-f-th-audience',
        title: 'Audience Increases',
        description:
          'Your Facebook page displays a higher visible follower count as the order progresses.',
      },
      {
        id: 'fb-f-th-community',
        title: 'Continue Building Your Community',
        description:
          'Keep publishing useful content and engaging with your audience to support long-term page growth.',
      },
    ],
  },
  serviceCompare: {
    id: 'facebook-followers-vs-page-likes-vs-post-likes',
    title: 'Facebook Followers vs Page Likes vs Post Likes',
    description:
      'Facebook followers, Page Likes and Post Likes each support a different goal. Followers increase the visible audience connected to your page, Page Likes show overall page appreciation, and Post Likes reflect engagement on individual posts. Choosing the right service depends on what you want to strengthen.',
    followers: {
      title: 'Facebook Followers',
      description:
        'Follower packages help increase the visible audience on your Facebook page, making your page appear more established to new visitors.',
    },
    pageLikes: {
      title: 'Facebook Page Likes',
      description:
        'Page Likes show overall interest in your page and can support brand credibility for businesses, creators and organizations.',
      href: '/buy-facebook-page-likes',
      ctaLabel: 'View Facebook Page Likes',
    },
    postLikes: {
      title: 'Facebook Post Likes',
      description:
        'Post Like packages focus on engagement for individual posts rather than the overall audience displayed on your page.',
      href: '/buy-facebook-post-likes',
      ctaLabel: 'View Facebook Post Likes',
    },
    combinedNote:
      'Many businesses combine follower, Page Like and Post Like packages depending on the objective of each campaign. While these services can improve visible social proof, they do not guarantee higher organic reach or business results.',
  },
  beforeBuying: {
    id: 'what-to-check-before-buying-facebook-followers',
    title: 'What Should You Check Before Buying Facebook Followers?',
    description:
      'Before purchasing Facebook followers, compare package details, pricing, delivery information, support options and published service policies. A transparent ordering process helps you understand exactly what is included before completing your purchase.',
    framingNote:
      'The best place to buy Facebook followers is one that clearly explains pricing, ordering requirements, customer support and service policies before payment rather than relying only on promotional claims.',
    items: [
      {
        id: 'fb-f-check-pricing',
        title: 'Transparent Pricing',
        description:
          'Review package sizes and pricing before checkout so you know exactly what you are purchasing.',
        icon: 'credit-card',
      },
      {
        id: 'fb-f-check-page',
        title: 'Public Facebook Page',
        description:
          'Follower packages should only require the public Facebook Page URL rather than your account password.',
        icon: 'lock',
      },
      {
        id: 'fb-f-check-delivery',
        title: 'Delivery Information',
        description:
          'Check the expected delivery information and package details before placing your order.',
        icon: 'truck',
      },
      {
        id: 'fb-f-check-tracking',
        title: 'Order Tracking',
        description:
          'A clear tracking system allows you to monitor your order after checkout.',
        icon: 'map-pin',
      },
      {
        id: 'fb-f-check-support',
        title: 'Customer Support',
        description:
          'Choose a provider that offers responsive support if you need assistance before or after ordering.',
        icon: 'headphones',
      },
      {
        id: 'fb-f-check-policies',
        title: 'Published Policies',
        description:
          'Review refund, refill and support policies before making your purchase.',
        icon: 'shield-check',
      },
    ],
  },
  canada: {
    id: 'buying-facebook-followers',
    title: 'Buying Facebook Followers worldwide',
    description:
      'NovaLikes offers Facebook follower packages for businesses, creators and organizations worldwide. Compare package options, review pricing and place your order using only your public Facebook Page URL.',
    body: "Whether you're building a local business page, expanding a creator community or supporting a brand campaign, choosing the right follower package starts with understanding your goals. Compare available quantities before completing your purchase.",
    cards: [
      {
        id: 'fb-f-ca-businesses',
        title: 'Local Businesses',
        description:
          'Support the visible audience for restaurants, retail stores, agencies and other local businesses.',
        icon: 'briefcase',
      },
      {
        id: 'fb-f-ca-brands',
        title: 'Brands',
        description:
          'Strengthen page credibility while running product launches and awareness campaigns.',
        icon: 'megaphone',
      },
      {
        id: 'fb-f-ca-creators',
        title: 'Creators',
        description:
          'Build a larger visible audience while continuing to publish original Facebook content.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-f-ca-orgs',
        title: 'Organizations',
        description:
          'Increase page visibility for nonprofits, community groups and public organizations.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-facebook-follower-packages',
    title: 'Popular Facebook Follower Packages',
    description:
      'Choose a follower package that matches your current page size and marketing objectives. Smaller packages are often suitable for newer pages, while larger packages may better fit established businesses and brands.',
    rows: [
      {
        id: 'pkg-100',
        quantity: '100 Followers',
        recommendedFor: 'Best for newly created Facebook pages.',
      },
      {
        id: 'pkg-500',
        quantity: '500 Followers',
        recommendedFor: 'Suitable for growing local businesses.',
      },
      {
        id: 'pkg-1k',
        quantity: '1,000 Followers',
        recommendedFor: 'A popular choice for active business pages.',
      },
      {
        id: 'pkg-5k',
        quantity: '5,000 Followers',
        recommendedFor: 'Designed for larger campaigns and established communities.',
      },
      {
        id: 'pkg-10k',
        quantity: '10,000+ Followers',
        recommendedFor:
          'Ideal for brands managing high-visibility promotional campaigns.',
      },
    ],
    bottomNote:
      'Select a package that aligns with your current audience and long-term marketing strategy instead of automatically choosing the largest option.',
  },
  whyChoose: {
    id: 'why-choose-novalikes-facebook-followers',
    title: 'Why Choose NovaLikes',
    description:
      'NovaLikes provides a clear, secure way to buy Facebook follower packages with transparent pricing and customer support.',
    items: [
      {
        id: 'fb-f-wc-2018',
        title: 'Founded Since 2018',
        description:
          'Years of experience helping businesses, creators and brands grow their Facebook presence.',
        icon: 'sparkles',
      },
      {
        id: 'fb-f-wc-customers',
        title: '50,000+ Customers',
        description:
          'Trusted by a growing community of pages looking for transparent package options and reliable ordering.',
        icon: 'users',
      },
      {
        id: 'fb-f-wc-checkout',
        title: 'Secure Checkout',
        description:
          'Complete your purchase through a protected checkout flow without sharing your Facebook password.',
        icon: 'lock',
      },
      {
        id: 'fb-f-wc-support',
        title: 'Customer Support',
        description:
          'Get help from a support team available for questions before and after you place your order.',
        icon: 'headphones',
      },
    ],
  },
  bestPractices: {
    id: 'best-practices-after-buying-facebook-followers',
    title: 'Best Practices After Buying Facebook Followers',
    description:
      'Facebook follower packages work best when they support an active content strategy. Continue publishing valuable posts, engaging with your audience and maintaining a consistent page presence to build long-term community growth.',
    items: [
      {
        id: 'fb-f-bp-publish',
        title: 'Publish Consistently',
        description:
          'Share useful updates, videos and images regularly to keep your Facebook page active and encourage returning visitors.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-f-bp-engage',
        title: 'Engage With Your Community',
        description:
          'Reply to comments, answer messages and participate in conversations to strengthen relationships with your audience.',
        icon: 'heart',
      },
      {
        id: 'fb-f-bp-optimize',
        title: 'Optimize Your Facebook Page',
        description:
          'Complete your business information, upload quality branding and keep your page details up to date to improve credibility.',
        icon: 'sparkles',
      },
      {
        id: 'fb-f-bp-trust',
        title: 'Build Long-Term Trust',
        description:
          "Follower packages can strengthen your page's visible audience, but sustainable growth comes from valuable content and genuine community engagement.",
        icon: 'users',
      },
    ],
  },
  commonMistakes: {
    id: 'common-mistakes-when-buying-facebook-followers',
    title: 'Common Mistakes When Buying Facebook Followers',
    description:
      'Choosing a follower package should be part of a broader marketing strategy. Understanding common mistakes can help you make more informed purchasing decisions.',
    items: [
      {
        id: 'fb-f-mistake-quantity',
        title: 'Choosing Quantity Over Strategy',
        description:
          'Selecting the largest package without considering your current audience or marketing goals can create unrealistic expectations.',
        icon: 'megaphone',
      },
      {
        id: 'fb-f-mistake-content',
        title: 'Ignoring Content Quality',
        description:
          'Followers alone cannot replace useful posts, consistent publishing and meaningful engagement with your audience.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-f-mistake-provider',
        title: 'Not Reviewing Provider Information',
        description:
          'Always review pricing, delivery information, support options and service policies before placing an order.',
        icon: 'shield-check',
      },
      {
        id: 'fb-f-mistake-results',
        title: 'Expecting Instant Business Results',
        description:
          "Follower packages may strengthen your page's visible audience, but they do not guarantee sales, leads or increased organic reach.",
        icon: 'briefcase',
      },
    ],
  },
};
