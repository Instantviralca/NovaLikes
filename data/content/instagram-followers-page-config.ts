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
  };
  serviceCompare: {
    id: string;
    title: string;
    description: string;
    current: {
      title: string;
      description: string;
      ctaLabel: string;
    };
    likes: {
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    };
    views: {
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
    items: InstagramFollowersInfoCard[];
  };
  worldwide: {
    id: string;
    title: string;
    description: string;
    body: string;
    cards: InstagramFollowersInfoCard[];
  };
  packageSizes: {
    id: string;
    title: string;
    description: string;
    rows: Array<{ id: string; quantity: string; recommendedFor: string }>;
    bottomNote: string;
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
    items: InstagramFollowersInfoCard[];
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
      'NovaLikes provides a clear ordering experience with transparent package options, secure checkout and support before and after your purchase.',
    items: [
      {
        id: 'ig-f-wc-username',
        title: 'Public Username Only',
        description:
          'Orders use your public Instagram username — no private account access or login credentials.',
        icon: 'users',
      },
      {
        id: 'ig-f-wc-checkout',
        title: 'Secure Checkout',
        description:
          'Complete your purchase through a protected checkout process without sharing your Instagram password.',
        icon: 'lock',
      },
      {
        id: 'ig-f-wc-tracking',
        title: 'Order Tracking',
        description:
          'Monitor available delivery updates with your order ID and email after checkout.',
        icon: 'map-pin',
      },
      {
        id: 'ig-f-wc-support',
        title: 'Customer Support',
        description:
          'Get assistance with package selection, checkout questions and available order updates.',
        icon: 'headphones',
      },
    ],
  },
  whyBuyNote:
    'Motivations differ by account type and growth stage, but followers are typically chosen as visible social proof — not as a substitute for content, consistency or genuine audience engagement.',
  orderNotice:
    'NovaLikes processes follower orders using only your public Instagram username. Your Instagram password is never required during checkout.',
  canYouBuy: {
    id: 'can-you-buy-instagram-followers',
    title: 'Can You Buy Instagram Followers?',
    description:
      'Yes. You can buy Instagram followers for a publicly accessible Instagram profile. Your Instagram password is not required. Purchased followers can increase the visible follower count on your profile, but they do not guarantee engagement, reach, sales or algorithmic promotion.',
    cards: [
      {
        id: 'ig-f-can-username',
        title: 'Public Username',
        description:
          'Orders use the public Instagram username of the profile receiving the selected package — no private account access.',
        icon: 'users',
      },
      {
        id: 'ig-f-can-password',
        title: 'No Password Required',
        description:
          'You do not need to provide login credentials, private messages or account verification codes.',
        icon: 'lock',
      },
      {
        id: 'ig-f-can-packages',
        title: 'Transparent Package Options',
        description:
          'Compare available quantities, pricing and package details before you decide to order.',
        icon: 'sparkles',
      },
    ],
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
      'After your order is confirmed, the selected follower package is processed using your public Instagram username. As delivery progresses, the visible follower count on your profile increases according to the selected package. Buying followers does not automatically increase engagement, likes or business results.',
    steps: [
      {
        id: 'ig-f-th-confirmed',
        title: 'Order Confirmed',
        description:
          'Your payment is verified and your follower order enters the processing queue.',
      },
      {
        id: 'ig-f-th-delivery',
        title: 'Delivery Begins',
        description:
          'Followers begin to be delivered according to your selected package.',
      },
      {
        id: 'ig-f-th-increase',
        title: 'Followers Increase',
        description:
          'Your Instagram profile displays a higher visible follower count as your order progresses.',
      },
      {
        id: 'ig-f-th-grow',
        title: 'Continue Growing Your Profile',
        description:
          'Keep publishing useful content, engaging with your audience and updating your Instagram profile to support long-term growth beyond visible followers.',
      },
    ],
  },
  serviceCompare: {
    id: 'instagram-followers-vs-likes-vs-views',
    title: 'Instagram Followers vs Likes vs Views',
    description:
      'Instagram Followers, Likes and Views each serve a different purpose. Followers strengthen the visible audience on a profile, Likes focus on engagement for individual posts, and Views support visibility on videos and Reels. Choosing the right service depends on your growth goals.',
    current: {
      title: 'Instagram Followers',
      description:
        'Followers increase the visible audience count on your Instagram profile, helping create a stronger first impression for visitors discovering your content or brand.',
      ctaLabel: 'Current Service',
    },
    likes: {
      title: 'Instagram Likes',
      description:
        'Like packages focus on engagement for individual Instagram posts rather than the overall size of your audience.',
      href: '/buy-instagram-likes',
      ctaLabel: 'View Instagram Likes',
    },
    views: {
      title: 'Instagram Views',
      description:
        'View packages support visible play counts on Instagram videos and Reels rather than profile-level audience growth.',
      href: '/buy-instagram-views',
      ctaLabel: 'View Instagram Views',
    },
    combinedNote:
      'Many creators combine Followers, Likes, Views and Comments to support different campaign stages. While these services strengthen visible social proof, they do not guarantee higher engagement or business results.',
  },
  beforeBuying: {
    id: 'what-to-check-before-buying-instagram-followers',
    title: 'What Should You Check Before Buying Instagram Followers?',
    description:
      'Before purchasing Instagram followers, compare package details, pricing, delivery information, support availability and published service policies. Understanding what is included before checkout helps you make a more informed purchasing decision.',
    framingNote:
      'The best place to buy Instagram followers is one that clearly explains package details, pricing, support options and ordering requirements before payment instead of relying only on promotional claims.',
    items: [
      {
        id: 'ig-f-check-pricing',
        title: 'Transparent Pricing',
        description:
          'Review available package sizes and pricing so you know exactly what you are purchasing before checkout.',
        icon: 'credit-card',
      },
      {
        id: 'ig-f-check-username',
        title: 'Public Username Only',
        description:
          'Choose a provider that only requires your public Instagram username instead of requesting passwords or private account access.',
        icon: 'lock',
      },
      {
        id: 'ig-f-check-delivery',
        title: 'Delivery Information',
        description:
          'Review the expected delivery information and available order updates before placing your purchase.',
        icon: 'truck',
      },
      {
        id: 'ig-f-check-tracking',
        title: 'Order Tracking',
        description:
          'Look for order tracking so you can monitor your package throughout the delivery process.',
        icon: 'map-pin',
      },
      {
        id: 'ig-f-check-support',
        title: 'Customer Support',
        description:
          'Responsive customer support helps answer questions before, during and after your purchase.',
        icon: 'headphones',
      },
      {
        id: 'ig-f-check-policies',
        title: 'Published Policies',
        description:
          'Review refund policies, refill information and package details before placing your order.',
        icon: 'shield-check',
      },
    ],
  },
  worldwide: {
    id: 'buying-instagram-followers',
    title: 'Buying Instagram Followers worldwide',
    description:
      'NovaLikes provides Instagram follower packages for creators, businesses and brands worldwide. Compare package sizes, review available pricing and place your order using only your public Instagram username.',
    body: "Whether you're growing a personal profile, launching a new brand or expanding an established Instagram presence, choosing the right follower package starts with selecting a quantity that matches your current growth objectives.",
    cards: [
      {
        id: 'ig-f-ww-creators',
        title: 'Creators',
        description:
          'Build a stronger Instagram profile while continuing to publish valuable content for your audience.',
        icon: 'clapperboard',
      },
      {
        id: 'ig-f-ww-businesses',
        title: 'Local Businesses',
        description:
          'Support the visible presence of restaurants, agencies, retail stores and other local businesses worldwide.',
        icon: 'briefcase',
      },
      {
        id: 'ig-f-ww-brands',
        title: 'Brands',
        description:
          'Strengthen brand credibility while promoting products, services and awareness campaigns.',
        icon: 'megaphone',
      },
      {
        id: 'ig-f-ww-orgs',
        title: 'Organizations',
        description:
          'Increase the visible audience of nonprofit, educational and community Instagram profiles.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-instagram-followers-packages',
    title: 'Popular Instagram Followers Packages',
    description:
      'Choose a package that fits your current account size and growth objectives. Smaller packages are suitable for newer profiles, while larger quantities may better support established brands and creators.',
    rows: [
      {
        id: 'pkg-100',
        quantity: '100 Followers',
        recommendedFor: 'A practical option for newly launched Instagram profiles.',
      },
      {
        id: 'pkg-500',
        quantity: '500 Followers',
        recommendedFor: 'Suitable for creators beginning to build social proof.',
      },
      {
        id: 'pkg-1k',
        quantity: '1,000 Followers',
        recommendedFor: 'One of the most popular choices for active profiles.',
      },
      {
        id: 'pkg-5k',
        quantity: '5,000 Followers',
        recommendedFor: 'Designed for established brands and larger growth campaigns.',
      },
      {
        id: 'pkg-10k',
        quantity: '10,000+ Followers',
        recommendedFor:
          'Ideal for accounts looking to strengthen the visible audience of larger Instagram profiles.',
      },
    ],
    bottomNote:
      'Select the package that best matches your current account size and long-term growth strategy instead of automatically choosing the largest quantity.',
  },
  bestPractices: {
    id: 'best-practices-after-buying-instagram-followers',
    title: 'Best Practices After Buying Instagram Followers',
    description:
      'Instagram followers are most effective when they support an active content strategy rather than replace it. Continue publishing valuable posts, engaging with your audience and maintaining an up-to-date profile to strengthen your long-term presence.',
    closingNote:
      'Creators and businesses that regularly update their Instagram profile, respond to comments and share useful content are more likely to build long-term credibility than accounts that rely on visible metrics alone.',
    items: [
      {
        id: 'ig-f-bp-publish',
        title: 'Publish Consistently',
        description:
          'Share helpful posts, photos, Reels and updates regularly so visitors have fresh content to explore after discovering your profile.',
        icon: 'clapperboard',
      },
      {
        id: 'ig-f-bp-profile',
        title: 'Complete Your Profile',
        description:
          'Keep your bio, profile photo, links and branding up to date so your Instagram account looks professional and trustworthy.',
        icon: 'briefcase',
      },
      {
        id: 'ig-f-bp-engage',
        title: 'Engage With Your Audience',
        description:
          'Reply to comments, answer messages and encourage conversations with your followers to build stronger relationships.',
        icon: 'heart',
      },
      {
        id: 'ig-f-bp-growth',
        title: 'Keep Your Profile Active',
        description:
          'After followers arrive, keep posting, updating offers and responding to visitors so the profile stays useful beyond the visible follower count.',
        icon: 'sparkles',
      },
    ],
  },
  commonMistakes: {
    id: 'common-mistakes-when-buying-instagram-followers',
    title: 'Common Mistakes When Buying Instagram Followers',
    description:
      'Understanding common purchasing mistakes helps you choose the right package and maintain realistic expectations before placing your order.',
    items: [
      {
        id: 'ig-f-mistake-quantity',
        title: 'Choosing the Largest Package Immediately',
        description:
          'Select a package that matches your current account size and growth objectives instead of automatically choosing the highest quantity available.',
        icon: 'megaphone',
      },
      {
        id: 'ig-f-mistake-content',
        title: 'Ignoring Content Quality',
        description:
          'A higher follower count cannot replace valuable content, consistent publishing and meaningful engagement with your audience.',
        icon: 'clapperboard',
      },
      {
        id: 'ig-f-mistake-details',
        title: 'Not Reviewing Package Details',
        description:
          'Always review pricing, delivery information, support options and published service policies before completing your purchase.',
        icon: 'shield-check',
      },
      {
        id: 'ig-f-mistake-results',
        title: 'Expecting Instant Business Results',
        description:
          'Followers strengthen visible social proof, but they do not automatically generate leads, sales, customer enquiries or organic reach.',
        icon: 'briefcase',
      },
    ],
  },
};
