import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type FacebookPageLikesInfoCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type FacebookPageLikesDirectAnswer = {
  id: string;
  title: string;
  description: string;
};

export type FacebookPageLikesPageConfig = {
  whyChoose: {
    id: string;
    title: string;
    description: string;
    items: FacebookPageLikesInfoCard[];
  };
  whyBuyNote: string;
  orderNotice: string;
  canYouBuy: FacebookPageLikesDirectAnswer & {
    cards: FacebookPageLikesInfoCard[];
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
    pageLikes: {
      title: string;
      description: string;
      ctaLabel: string;
    };
    followers: {
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
    items: FacebookPageLikesInfoCard[];
  };
  canada: {
    id: string;
    title: string;
    description: string;
    body: string;
    cards: FacebookPageLikesInfoCard[];
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
    items: FacebookPageLikesInfoCard[];
  };
  commonMistakes: {
    id: string;
    title: string;
    description: string;
    items: FacebookPageLikesInfoCard[];
  };
};

/**
 * Topical blocks for Buy Facebook Page Likes.
 * Hero, pricing, Why Buy, How to Buy, and requirements remain in data/content/facebook.ts.
 */
export const FACEBOOK_PAGE_LIKES_PAGE_CONFIG: FacebookPageLikesPageConfig = {
  whyChoose: {
    id: 'why-choose-novalikes-facebook-page-likes',
    title: 'Why Choose NovaLikes for Facebook Page Likes?',
    description:
      'NovaLikes provides a clear ordering experience with transparent package options, secure checkout and support before and after your purchase.',
    items: [
      {
        id: 'fb-pl-wc-2018',
        title: 'Serving Customers Since 2018',
        description:
          'Years of experience helping businesses, creators and brands strengthen their social media presence.',
        icon: 'sparkles',
      },
      {
        id: 'fb-pl-wc-customers',
        title: '50,000+ Customers',
        description:
          'Trusted by a growing customer base looking for straightforward package options and dependable order support.',
        icon: 'users',
      },
      {
        id: 'fb-pl-wc-checkout',
        title: 'Secure Checkout',
        description:
          'Complete your purchase through a protected checkout process without sharing your Facebook password.',
        icon: 'lock',
      },
      {
        id: 'fb-pl-wc-support',
        title: 'Customer Support',
        description:
          'Get assistance with package selection, checkout questions and available order updates.',
        icon: 'headphones',
      },
    ],
  },
  whyBuyNote:
    'Motivations differ by page type and campaign stage, but Page Likes are typically chosen as visible social proof — not as a substitute for content, ads or customer engagement.',
  orderNotice:
    'NovaLikes processes Page Like orders using only your public Facebook Page URL. Your Facebook password is never required during checkout.',
  canYouBuy: {
    id: 'can-you-buy-facebook-page-likes',
    title: 'Can You Buy Facebook Page Likes?',
    description:
      'Yes. You can buy Facebook Page Likes for a publicly accessible Facebook page. Your Facebook password is not required. Purchased Page Likes can increase the visible Like count on the page, but they do not guarantee engagement, sales, organic reach or algorithmic promotion.',
    cards: [
      {
        id: 'fb-pl-can-url',
        title: 'Public Page URL',
        description:
          'Orders use the public URL of the Facebook page receiving the selected package — no private account access.',
        icon: 'users',
      },
      {
        id: 'fb-pl-can-password',
        title: 'No Password Required',
        description:
          'You do not need to provide login credentials, private messages or account verification codes.',
        icon: 'lock',
      },
      {
        id: 'fb-pl-can-packages',
        title: 'Transparent Package Options',
        description:
          'Compare available quantities, pricing and package details before you decide to order.',
        icon: 'sparkles',
      },
    ],
  },
  doesBuyingHelp: {
    id: 'does-buying-facebook-page-likes-help',
    title: 'Does Buying Facebook Page Likes Help?',
    description:
      "Buying Facebook Page Likes increases the visible Like count displayed on a Facebook page, which may help create a stronger first impression for visitors. However, Page Like packages do not guarantee more engagement, increased organic reach, additional sales or better visibility in Facebook's recommendation systems.",
    helpTitle: 'What Page Likes Can Help With',
    helpItems: [
      'A higher visible Page Like count',
      'A stronger first impression for new visitors',
      'Extra social proof during launches',
      'Support alongside ads and publishing',
      'A more established look for public pages',
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
      'Page Likes are most effective when combined with valuable content, consistent publishing and genuine customer engagement rather than being treated as a replacement for an active Facebook strategy.',
  },
  whatHappens: {
    id: 'what-happens-after-you-buy-facebook-page-likes',
    title: 'What Happens After You Buy Facebook Page Likes?',
    description:
      'After your order is confirmed, the selected Page Likes package is processed using your public Facebook Page URL. As delivery progresses, the visible Like count on your page increases according to the selected package. Buying Page Likes does not automatically increase engagement, followers or business results.',
    steps: [
      {
        id: 'fb-pl-th-confirmed',
        title: 'Order Confirmed',
        description:
          'Your payment is verified and your Page Like order enters the processing queue.',
      },
      {
        id: 'fb-pl-th-delivery',
        title: 'Delivery Begins',
        description:
          'Page Likes begin to be delivered according to your selected package.',
      },
      {
        id: 'fb-pl-th-increase',
        title: 'Page Likes Increase',
        description:
          'Your Facebook page displays a higher visible Page Like count as your order progresses.',
      },
      {
        id: 'fb-pl-th-grow',
        title: 'Continue Growing Your Page',
        description:
          'Keep publishing useful content, engaging with your audience and updating your Facebook page to support long-term growth beyond visible Page Likes.',
      },
    ],
  },
  serviceCompare: {
    id: 'facebook-page-likes-vs-followers-vs-post-likes',
    title: 'Facebook Page Likes vs Followers vs Post Likes',
    description:
      "Facebook Page Likes, Followers and Post Likes each serve a different purpose. Page Likes strengthen the visible popularity of a Facebook page, Followers increase the page's audience, and Post Likes focus on engagement for individual posts. Choosing the right service depends on your marketing goals.",
    pageLikes: {
      title: 'Facebook Page Likes',
      description:
        'Page Likes increase the visible Like count displayed on your Facebook page, helping create a stronger first impression for visitors discovering your business or brand.',
      ctaLabel: 'Current Service',
    },
    followers: {
      title: 'Facebook Followers',
      description:
        'Followers increase the number of people following your Facebook page and support overall audience growth across future content.',
      href: '/buy-facebook-followers',
      ctaLabel: 'View Facebook Followers',
    },
    postLikes: {
      title: 'Facebook Post Likes',
      description:
        'Post Like packages focus on engagement for individual Facebook posts rather than the overall popularity of your page.',
      href: '/buy-facebook-post-likes',
      ctaLabel: 'View Facebook Post Likes',
    },
    combinedNote:
      'Many businesses combine Page Likes, Followers and Post Likes to support different marketing campaigns. While these services strengthen visible social proof, they do not guarantee higher engagement or business results.',
  },
  beforeBuying: {
    id: 'what-to-check-before-buying-facebook-page-likes',
    title: 'What Should You Check Before Buying Facebook Page Likes?',
    description:
      'Before purchasing Facebook Page Likes, compare package details, pricing, delivery information, support availability and published service policies. Understanding what is included before checkout helps you make a more informed purchasing decision.',
    framingNote:
      'The best place to buy Facebook Page Likes is one that clearly explains package details, pricing, support options and ordering requirements before payment instead of relying only on promotional claims.',
    items: [
      {
        id: 'fb-pl-check-pricing',
        title: 'Transparent Pricing',
        description:
          'Review available package sizes and pricing so you know exactly what you are purchasing before checkout.',
        icon: 'credit-card',
      },
      {
        id: 'fb-pl-check-url',
        title: 'Public Facebook Page URL',
        description:
          'Choose a provider that only requires your public Facebook Page URL instead of requesting passwords or private account access.',
        icon: 'lock',
      },
      {
        id: 'fb-pl-check-delivery',
        title: 'Delivery Information',
        description:
          'Review the expected delivery information and available order updates before placing your purchase.',
        icon: 'truck',
      },
      {
        id: 'fb-pl-check-tracking',
        title: 'Order Tracking',
        description:
          'Look for order tracking so you can monitor your package throughout the delivery process.',
        icon: 'map-pin',
      },
      {
        id: 'fb-pl-check-support',
        title: 'Customer Support',
        description:
          'Responsive customer support helps answer questions before, during and after your purchase.',
        icon: 'headphones',
      },
      {
        id: 'fb-pl-check-policies',
        title: 'Published Policies',
        description:
          'Review refund policies, refill information and package details before placing your order.',
        icon: 'shield-check',
      },
    ],
  },
  canada: {
    id: 'buying-facebook-page-likes',
    title: 'Buying Facebook Page Likes worldwide',
    description:
      'NovaLikes provides Facebook Page Like packages for businesses, creators and organizations worldwide. Compare package sizes, review available pricing and place your order using only your public Facebook Page URL.',
    body: "Whether you're growing a local business, launching a new brand or expanding an established Facebook presence, choosing the right Page Like package starts with selecting a quantity that matches your current marketing objectives.",
    cards: [
      {
        id: 'fb-pl-ca-businesses',
        title: 'Local Businesses',
        description:
          'Support the visible popularity of restaurants, agencies, retail stores and other local businesses worldwide.',
        icon: 'briefcase',
      },
      {
        id: 'fb-pl-ca-brands',
        title: 'Brands',
        description:
          'Strengthen brand credibility while promoting products, services and awareness campaigns.',
        icon: 'megaphone',
      },
      {
        id: 'fb-pl-ca-creators',
        title: 'Creators',
        description:
          'Build a stronger Facebook page while continuing to publish valuable content for your audience.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-pl-ca-orgs',
        title: 'Organizations',
        description:
          'Increase the visible popularity of nonprofit, educational and community Facebook pages.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-facebook-page-likes-packages',
    title: 'Popular Facebook Page Likes Packages',
    description:
      'Choose a package that fits your current page size and growth objectives. Smaller packages are suitable for newer pages, while larger quantities may better support established brands and businesses.',
    rows: [
      {
        id: 'pkg-100',
        quantity: '100 Page Likes',
        recommendedFor: 'A practical option for newly launched Facebook pages.',
      },
      {
        id: 'pkg-500',
        quantity: '500 Page Likes',
        recommendedFor: 'Suitable for businesses beginning to build social proof.',
      },
      {
        id: 'pkg-1k',
        quantity: '1,000 Page Likes',
        recommendedFor: 'One of the most popular choices for active business pages.',
      },
      {
        id: 'pkg-5k',
        quantity: '5,000 Page Likes',
        recommendedFor: 'Designed for established brands and larger awareness campaigns.',
      },
      {
        id: 'pkg-10k',
        quantity: '10,000+ Page Likes',
        recommendedFor:
          'Ideal for businesses looking to strengthen the visible popularity of larger Facebook pages.',
      },
    ],
    bottomNote:
      'Select the package that best matches your current page size and long-term marketing strategy instead of automatically choosing the largest quantity.',
  },
  bestPractices: {
    id: 'best-practices-after-buying-facebook-page-likes',
    title: 'Best Practices After Buying Facebook Page Likes',
    description:
      'Facebook Page Likes are most effective when they support an active marketing strategy rather than replace it. Continue publishing valuable content, engaging with your audience and maintaining an up-to-date Facebook page to strengthen your long-term online presence.',
    closingNote:
      'Businesses that regularly update their Facebook page, respond to customers and share useful content are more likely to build long-term credibility than pages that rely on visible metrics alone.',
    items: [
      {
        id: 'fb-pl-bp-publish',
        title: 'Publish Consistently',
        description:
          'Share helpful posts, photos, videos and updates regularly so visitors have fresh content to explore after discovering your Facebook page.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-pl-bp-profile',
        title: 'Complete Your Business Profile',
        description:
          'Keep your business information, contact details, opening hours and branding up to date so your Facebook page looks professional and trustworthy.',
        icon: 'briefcase',
      },
      {
        id: 'fb-pl-bp-engage',
        title: 'Engage With Your Audience',
        description:
          'Reply to comments, answer messages and encourage conversations with your followers to build stronger relationships and community trust.',
        icon: 'heart',
      },
      {
        id: 'fb-pl-bp-growth',
        title: 'Keep Your Page Active',
        description:
          'After Page Likes arrive, keep posting, updating offers and responding to visitors so the page stays useful beyond the visible Like count.',
        icon: 'sparkles',
      },
    ],
  },
  commonMistakes: {
    id: 'common-mistakes-when-buying-facebook-page-likes',
    title: 'Common Mistakes When Buying Facebook Page Likes',
    description:
      'Understanding common purchasing mistakes helps you choose the right package and maintain realistic expectations before placing your order.',
    items: [
      {
        id: 'fb-pl-mistake-quantity',
        title: 'Choosing the Largest Package Immediately',
        description:
          'Select a package that matches your current page size and marketing objectives instead of automatically choosing the highest quantity available.',
        icon: 'megaphone',
      },
      {
        id: 'fb-pl-mistake-content',
        title: 'Ignoring Content Quality',
        description:
          'A higher Page Like count cannot replace valuable content, consistent publishing and meaningful engagement with your audience.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-pl-mistake-details',
        title: 'Not Reviewing Package Details',
        description:
          'Always review pricing, delivery information, support options and published service policies before completing your purchase.',
        icon: 'shield-check',
      },
      {
        id: 'fb-pl-mistake-results',
        title: 'Expecting Instant Business Results',
        description:
          'Page Likes strengthen visible social proof, but they do not automatically generate leads, sales, customer enquiries or organic reach.',
        icon: 'briefcase',
      },
    ],
  },
};
