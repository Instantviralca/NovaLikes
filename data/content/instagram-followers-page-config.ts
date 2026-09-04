import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type InstagramFollowersInfoCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type InstagramFollowersDirectAnswer = {
  id: string;
  title: string;
  description: string;
};

export type InstagramFollowersPageConfig = {
  whyChoose: {
    id: string;
    title: string;
    description: string;
    items: InstagramFollowersInfoCard[];
  };
  whyBuyNote: string;
  orderNotice: string;
  canYouBuy: InstagramFollowersDirectAnswer & {
    cards: InstagramFollowersInfoCard[];
    closingNote: string;
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
    steps: Array<{ id: string; title: string; description: string }>;
    closingNote: string;
  };
  serviceCompare: {
    id: string;
    title: string;
    description: string;
    current: {
      title: string;
      description: string;
      bestFor: string;
      ctaLabel: string;
    };
    likes: {
      title: string;
      description: string;
      bestFor: string;
      href: string;
      ctaLabel: string;
    };
    views: {
      title: string;
      description: string;
      bestFor: string;
      href: string;
      ctaLabel: string;
    };
    combinedNote: string;
    commentsHref: string;
  };
  beforeBuying: {
    id: string;
    title: string;
    description: string;
    framingNote: string;
    items: InstagramFollowersInfoCard[];
  };
  worldwide: {
    id: string;
    title: string;
    description: string;
    body?: string;
    closingNote: string;
    eyebrow: string;
    cards: InstagramFollowersInfoCard[];
  };
  packageSizes: {
    id: string;
    title: string;
    description: string;
    rows: Array<{ id: string; quantity: string; recommendedFor: string }>;
    bottomNote?: string;
    unitSuffix?: string;
    quantityColumnLabel?: string;
    recommendedColumnLabel?: string;
  };
  bestPractices: {
    id: string;
    title: string;
    description: string;
    closingNote: string;
    items: InstagramFollowersInfoCard[];
  };
  commonMistakes: {
    id: string;
    title: string;
    description: string;
    closingNote: string;
    items: InstagramFollowersInfoCard[];
  };
  relatedPackages: {
    copyBySlug: Record<
      string,
      {
        title: string;
        description: string;
        ctaLabel: string;
      }
    >;
  };
};

/**
 * Topical blocks for Buy Instagram Followers.
 * Hero, pricing, Why Buy, How to Buy, and requirements remain in data/content/instagram.ts.
 */
export const INSTAGRAM_FOLLOWERS_PAGE_CONFIG: InstagramFollowersPageConfig = {
  whyChoose: {
    id: 'why-choose-novalikes-instagram-followers',
    title: 'Why Choose NovaLikes for Instagram Followers?',
    description:
      'NovaLikes keeps the Instagram follower ordering process simple. You can compare package sizes and prices before buying, order with your public username, track your purchase, and contact support if you need help.',
    items: [
      {
        id: 'ig-f-wc-username',
        title: 'Packages for Different Account Sizes',
        description:
          'Choose from smaller and larger follower quantities instead of paying for a fixed package that may not suit your profile.',
        icon: 'users',
      },
      {
        id: 'ig-f-wc-checkout',
        title: 'Pricing Before You Order',
        description:
          'See the cost of each Instagram followers package before adding your selection to the cart.',
        icon: 'lock',
      },
      {
        id: 'ig-f-wc-tracking',
        title: 'Track Your Order',
        description:
          'Use your order details to check available status updates after your purchase has been placed.',
        icon: 'map-pin',
      },
      {
        id: 'ig-f-wc-support',
        title: 'Customer Support',
        description:
          'Contact NovaLikes if you need help choosing a package or have a question about an existing follower order.',
        icon: 'headphones',
      },
    ],
  },
  whyBuyNote:
    'The right package depends on your account and what you want to change. If your goal is post likes, Reel views, or comments rather than follower count, choose the corresponding Instagram service instead.',
  orderNotice:
    'NovaLikes processes follower orders using only your public Instagram username. Your Instagram password is never required during checkout.',
  canYouBuy: {
    id: 'can-you-buy-instagram-followers',
    title: 'Can You Buy Instagram Followers?',
    description:
      'Yes. Instagram follower packages can be purchased from third party services such as NovaLikes. You choose the number of followers you want, provide the public Instagram username for the profile, and complete the order through the website.',
    cards: [
      {
        id: 'ig-f-can-username',
        title: 'What Buying Instagram Followers Actually Changes',
        description:
          'An Instagram followers order is focused on the follower count shown on the selected profile. It does not automatically increase the likes, comments, or views on your posts, and it does not guarantee that Instagram will show your content to more people.',
        icon: 'users',
      },
      {
        id: 'ig-f-can-password',
        title: 'Your Account Still Needs Its Own Content',
        description:
          'A larger follower count does not replace posting. Photos, Reels, Stories, captions, replies, and other account activity still come from you. If you want to build an audience that regularly interacts with your content, your Instagram activity remains important.',
        icon: 'lock',
      },
      {
        id: 'ig-f-can-packages',
        title: 'Followers Are Different From Other Instagram Services',
        description:
          'Choose followers when the profile follower count is what you want to change. Instagram Likes are for individual posts or Reels, Instagram Views are for eligible video content, and Instagram Comments are for comments on selected content.',
        icon: 'sparkles',
      },
    ],
    closingNote:
      'Before ordering, check that you have selected the correct service and follower quantity for your profile. The package options and prices are shown on this page so you can compare them before checkout.',
  },
  doesBuyingHelp: {
    id: 'does-buying-instagram-followers-help',
    title: 'Does Buying Instagram Followers Help?',
    description:
      "Buying Instagram followers increases the visible follower count displayed on a profile, which may help create a stronger first impression for visitors. However, follower packages do not guarantee more engagement, increased organic reach, additional sales or better visibility in Instagram's recommendation systems.",
    helpTitle: 'What Followers Can Help With',
    helpItems: [
      'A higher visible follower count',
      'A stronger first impression for new visitors',
      'Extra social proof during launches',
      'Support alongside content and ads',
      'A more established look for public profiles',
    ],
    limitTitle: 'What They Do Not Guarantee',
    limitItems: [
      'Higher post engagement',
      'More comments or shares',
      'Increased organic reach',
      'Additional sales',
      'Monetization approval',
      'Algorithmic promotion',
    ],
    closingNote:
      'Followers are most effective when combined with valuable content, consistent publishing and genuine audience engagement rather than being treated as a replacement for an active Instagram strategy.',
  },
  whatHappens: {
    id: 'what-happens-after-you-buy-instagram-followers',
    title: 'What Happens After You Buy Instagram Followers?',
    description:
      'After you place an Instagram followers order, the details you submitted are used to process the selected package for the correct profile. Keep the account information you provided unchanged while the order is being handled.',
    steps: [
      {
        id: 'ig-f-th-confirmed',
        title: 'Your Order Details Are Checked',
        description:
          'The selected follower package and Instagram username are associated with your order so the request can be processed for the intended public profile.',
      },
      {
        id: 'ig-f-th-delivery',
        title: 'Delivery Goes to the Submitted Profile',
        description:
          'Followers are directed to the Instagram account connected to the username you entered. Check your username carefully before completing the order.',
      },
      {
        id: 'ig-f-th-increase',
        title: 'Larger Orders May Take Longer',
        description:
          'The time needed to process an order can vary depending on the follower quantity and current order conditions. Avoid relying on one fixed delivery time for every package.',
      },
      {
        id: 'ig-f-th-grow',
        title: 'You Can Check Your Order Status',
        description:
          'Use NovaLikes order tracking to check available updates for your purchase. If you need help with an order, contact support with the relevant order information.',
      },
    ],
    closingNote:
      'Keep your Instagram profile publicly accessible where required while the order is being processed. If you change your username or other relevant account details after ordering, contact support if you need assistance.',
  },
  serviceCompare: {
    id: 'instagram-followers-vs-likes-vs-views',
    title: 'Instagram Followers vs Likes vs Views',
    description:
      'Followers, likes, and views measure different parts of an Instagram account. The right service depends on whether you want to work on your profile, engagement on a specific post or Reel, or the view count on video content.',
    current: {
      title: 'Instagram Followers',
      description:
        'Followers are a profile-level metric. Choose Instagram followers when you want to increase the follower count shown on your account.',
      bestFor:
        'Profile follower count, new accounts, creators, brands, and business profiles.',
      ctaLabel: 'Instagram Followers',
    },
    likes: {
      title: 'Instagram Likes',
      description:
        'Likes are tied to individual content. Choose Instagram likes when you want more likes shown on a specific public post or Reel.',
      bestFor:
        'Posts, Reels, and content where the visible like count is the metric you want to work on.',
      href: '/buy-instagram-likes',
      ctaLabel: 'View Instagram Likes',
    },
    views: {
      title: 'Instagram Views',
      description:
        'Views apply to eligible video content. Choose Instagram views when you want to increase the view count shown on a public Reel or video.',
      bestFor: 'Reels, videos, and other eligible Instagram video content.',
      href: '/buy-instagram-views',
      ctaLabel: 'View Instagram Views',
    },
    combinedNote:
      'If comments are the interaction you need, Instagram Comments are available separately for eligible posts and Reels.',
    commentsHref: '/buy-instagram-comments',
  },
  beforeBuying: {
    id: 'what-to-check-before-buying-instagram-followers',
    title: 'What to Check Before Buying Instagram Followers',
    description:
      'Before you buy Instagram followers, check the service details as carefully as you would with any online purchase. The package, account information, pricing, policies, and available support should be clear before you complete checkout.',
    framingNote:
      'Avoid choosing a service based only on exaggerated promises. Claims about guaranteed engagement, reach, sales, or Instagram algorithm performance should not be treated as a substitute for understanding what the follower package actually provides.',
    items: [
      {
        id: 'ig-f-check-pricing',
        title: 'Check the Follower Quantity',
        description:
          'Make sure you have selected the number of Instagram followers you actually want for your profile. Review the package again before adding it to your cart.',
        icon: 'credit-card',
      },
      {
        id: 'ig-f-check-username',
        title: 'Confirm the Price',
        description:
          'Check the full price of the selected package before checkout. If you switch to a different follower quantity, review the updated price before ordering.',
        icon: 'lock',
      },
      {
        id: 'ig-f-check-delivery',
        title: 'Use the Correct Instagram Username',
        description:
          'Double check the public username you submit. A spelling mistake or the wrong account can cause problems with where the order is directed.',
        icon: 'truck',
      },
      {
        id: 'ig-f-check-tracking',
        title: 'Read the Relevant Policies',
        description:
          'Review the terms, refund information, and other applicable policies so you understand the conditions associated with your purchase.',
        icon: 'shield-check',
      },
      {
        id: 'ig-f-check-support',
        title: 'Know How to Get Help',
        description:
          'Check that you can contact support and track your order if you have a question after checkout.',
        icon: 'headphones',
      },
    ],
  },
  worldwide: {
    id: 'buying-instagram-followers',
    title: 'Preparing Your Instagram Profile for a Followers Order',
    description:
      'Before placing an Instagram Followers order, make sure the profile you want to use is the correct public account and that the username will remain unchanged while the order is being processed.',
    eyebrow: 'Ready for Instagram Followers',
    closingNote:
      'Instagram Followers is a profile-level service. Confirm the username, keep the profile accessible where required, and review the selected package before checkout.',
    cards: [
      {
        id: 'ig-f-ww-creators',
        title: 'Check Your Public Username',
        description:
          'Confirm the exact Instagram username before checkout. The profile information you submit is used to identify where the follower order should be processed.',
        icon: 'clapperboard',
      },
      {
        id: 'ig-f-ww-businesses',
        title: 'Keep the Profile Accessible',
        description:
          'Keep the Instagram profile publicly accessible where the selected service requires it. Changing visibility during an active order can interfere with processing.',
        icon: 'briefcase',
      },
      {
        id: 'ig-f-ww-brands',
        title: 'Avoid Changing Your Username',
        description:
          'If possible, do not change the submitted username while an order is active. Contact support if an important account change affects an existing order.',
        icon: 'megaphone',
      },
      {
        id: 'ig-f-ww-orgs',
        title: 'Review the Package Before Checkout',
        description:
          'Check the follower quantity and price one more time before completing your order so the selected package matches what you intended to purchase.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-instagram-followers-packages',
    title: 'Popular Instagram Followers Packages',
    description:
      'Not sure which package to choose? These are some of the Instagram follower quantities available on NovaLikes. Compare the options below, or return to the full pricing section to see every available package.',
    rows: [
      {
        id: 'pkg-100',
        quantity: '100 Followers',
        recommendedFor:
          'A smaller option for profiles that want to start with a modest follower increase.',
      },
      {
        id: 'pkg-500',
        quantity: '500 Followers',
        recommendedFor:
          'A mid-range option for accounts looking for a more noticeable change in follower count.',
      },
      {
        id: 'pkg-1k',
        quantity: '1,000 Followers',
        recommendedFor:
          'A larger package for profiles that want to add one thousand followers in a single order.',
      },
      {
        id: 'pkg-5k',
        quantity: '5,000 Followers',
        recommendedFor:
          'A higher-volume option for accounts that want a larger increase in their displayed follower count.',
      },
      {
        id: 'pkg-10k',
        quantity: '10,000+ Followers',
        recommendedFor:
          'An option for profiles choosing one of the larger follower quantities available on NovaLikes.',
      },
    ],
  },
  bestPractices: {
    id: 'best-practices-after-buying-instagram-followers',
    title: 'Best Practices After Buying Instagram Followers',
    description:
      'Buying followers changes the follower count on your profile, but the rest of your Instagram presence still depends on how you manage the account. Keep publishing, improve your profile, and use your own account data to understand what your audience responds to.',
    closingNote:
      'Follower count is only one part of an Instagram profile. Content quality, posting habits, audience interaction, and the way you present your account still need ongoing attention.',
    items: [
      {
        id: 'ig-f-bp-publish',
        title: 'Keep Posting Consistently',
        description:
          'Continue publishing posts, Reels, and Stories instead of treating a follower order as a replacement for regular content.',
        icon: 'clapperboard',
      },
      {
        id: 'ig-f-bp-profile',
        title: 'Keep Your Profile Complete',
        description:
          'Use a clear profile photo, useful bio, relevant link, and accurate account information so visitors can quickly understand who you are and what you post about.',
        icon: 'briefcase',
      },
      {
        id: 'ig-f-bp-engage',
        title: 'Create Content for Your Audience',
        description:
          'Plan posts around the topics, products, services, or interests that are relevant to the people you want to reach.',
        icon: 'megaphone',
      },
      {
        id: 'ig-f-bp-growth',
        title: 'Pay Attention to Instagram Insights',
        description:
          'If Insights are available on your account, review metrics such as reach, views, interactions, and follower activity to see how your own content performs.',
        icon: 'sparkles',
      },
      {
        id: 'ig-f-bp-formats',
        title: 'Use Reels, Posts, and Stories for Different Purposes',
        description:
          'Different Instagram formats give you different ways to publish. Test the formats that make sense for your account instead of relying on only one type of content.',
        icon: 'users',
      },
      {
        id: 'ig-f-bp-respond',
        title: 'Respond to Real Interactions',
        description:
          'Reply to genuine comments and messages when appropriate. Buying followers does not replace the conversations and relationships you build through your own account activity.',
        icon: 'heart',
      },
    ],
  },
  commonMistakes: {
    id: 'common-mistakes-when-buying-instagram-followers',
    title: 'Common Mistakes When Buying Instagram Followers',
    description:
      'Most problems can be avoided by checking a few details before and after ordering. These are some common mistakes to watch for when choosing an Instagram followers package.',
    closingNote:
      'Before checkout, review your profile details, selected service, follower quantity, and price one more time. If something about an existing order is unclear, use the available tracking or support options.',
    items: [
      {
        id: 'ig-f-mistake-quantity',
        title: 'Entering the Wrong Username',
        description:
          'Check your Instagram username carefully before checkout. The order needs to be associated with the correct public profile.',
        icon: 'megaphone',
      },
      {
        id: 'ig-f-mistake-content',
        title: 'Choosing the Wrong Service',
        description:
          'Followers, likes, views, and comments are different services. Choose followers only when the follower count on your profile is what you want to change.',
        icon: 'clapperboard',
      },
      {
        id: 'ig-f-mistake-details',
        title: 'Picking a Package Without Checking the Quantity',
        description:
          'Review the number of followers included in the package before ordering so you know exactly which quantity you selected.',
        icon: 'shield-check',
      },
      {
        id: 'ig-f-mistake-results',
        title: 'Expecting Followers to Replace Content',
        description:
          'A larger follower count does not replace posts, Reels, Stories, or the work involved in managing your Instagram account.',
        icon: 'briefcase',
      },
      {
        id: 'ig-f-mistake-engagement',
        title: 'Expecting Guaranteed Engagement or Reach',
        description:
          'Do not assume that changing your follower count will automatically produce more likes, comments, views, reach, sales, or organic growth.',
        icon: 'lock',
      },
      {
        id: 'ig-f-mistake-account-change',
        title: 'Changing Important Account Details During an Order',
        description:
          'Avoid changing the submitted username or other relevant profile details while an order is being processed. Contact support if a necessary account change affects an existing order.',
        icon: 'users',
      },
    ],
  },
  relatedPackages: {
    copyBySlug: {
      'buy-instagram-likes': {
        title: 'Instagram Likes',
        description:
          'Choose Instagram Likes when you want to add likes to a specific public post or Reel.',
        ctaLabel: 'View Instagram Likes',
      },
      'buy-instagram-views': {
        title: 'Instagram Views',
        description:
          'Choose Instagram Views when you want to increase the view count on an eligible public Reel or video.',
        ctaLabel: 'View Instagram Views',
      },
      'buy-instagram-comments': {
        title: 'Instagram Comments',
        description:
          'Choose Instagram Comments when you want comments added to an eligible public post or Reel.',
        ctaLabel: 'View Instagram Comments',
      },
    },
  },
};
