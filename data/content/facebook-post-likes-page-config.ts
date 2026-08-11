import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type FacebookPostLikesInfoCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type FacebookPostLikesDirectAnswer = {
  id: string;
  title: string;
  description: string;
};

export type FacebookPostLikesPageConfig = {
  whyChoose: {
    id: string;
    title: string;
    description: string;
    items: FacebookPostLikesInfoCard[];
  };
  whyBuyNote: string;
  orderNotice: string;
  canYouBuy: FacebookPostLikesDirectAnswer & {
    cards: FacebookPostLikesInfoCard[];
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
    postLikes: {
      title: string;
      description: string;
      ctaLabel: string;
    };
    pageLikes: {
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    };
    followers: {
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    };
    combinedNote: string;
  };
  canada: {
    id: string;
    title: string;
    description: string;
    body: string;
    cards: FacebookPostLikesInfoCard[];
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
    items: FacebookPostLikesInfoCard[];
  };
  commonMistakes: {
    id: string;
    title: string;
    description: string;
    items: FacebookPostLikesInfoCard[];
  };
};

/**
 * Topical blocks for Buy Facebook Post Likes.
 * Hero, pricing, Why Buy, How to Buy, and requirements remain in data/content/facebook.ts.
 */
export const FACEBOOK_POST_LIKES_PAGE_CONFIG: FacebookPostLikesPageConfig = {
  whyChoose: {
    id: 'why-choose-novalikes-facebook-post-likes',
    title: 'Why Choose NovaLikes for Facebook Post Likes?',
    description:
      'NovaLikes offers a straightforward ordering experience with secure checkout, transparent package options and support throughout the ordering process.',
    items: [
      {
        id: 'fb-post-wc-2018',
        title: 'Since 2018',
        description:
          'Helping businesses, creators and brands strengthen their social media presence for years.',
        icon: 'sparkles',
      },
      {
        id: 'fb-post-wc-customers',
        title: '50,000+ Customers',
        description:
          'Trusted by thousands of customers looking for simple and reliable social media growth services.',
        icon: 'users',
      },
      {
        id: 'fb-post-wc-checkout',
        title: 'Secure Checkout',
        description:
          'Place your order confidently without sharing your Facebook account password.',
        icon: 'lock',
      },
      {
        id: 'fb-post-wc-support',
        title: 'Customer Support',
        description:
          'Friendly assistance before and after your order whenever you need help.',
        icon: 'headphones',
      },
    ],
  },
  whyBuyNote:
    'Post Likes work best when paired with useful content, relevant visuals and meaningful conversations with your audience.',
  orderNotice:
    'NovaLikes only requires the public URL of your Facebook post. Your Facebook password is never requested or stored.',
  canYouBuy: {
    id: 'can-you-buy-facebook-post-likes',
    title: 'Can You Buy Facebook Post Likes?',
    description:
      'Yes. Facebook Post Like packages can be purchased by selecting a package, entering the public URL of the Facebook post and completing secure checkout. Your Facebook password is not required. Purchased Post Likes increase the visible Like count on the selected post, but they do not guarantee additional comments, shares, sales or higher organic reach.',
    cards: [
      {
        id: 'fb-post-can-url',
        title: 'Public Post URL',
        description:
          'Orders are processed using the public URL of the Facebook post receiving the selected package.',
        icon: 'users',
      },
      {
        id: 'fb-post-can-password',
        title: 'No Password Required',
        description:
          'Your Facebook login credentials are never requested during checkout.',
        icon: 'lock',
      },
      {
        id: 'fb-post-can-packages',
        title: 'Transparent Packages',
        description:
          'Review package sizes, pricing and delivery information before placing your order.',
        icon: 'sparkles',
      },
      {
        id: 'fb-post-can-track',
        title: 'Order Tracking',
        description:
          'Follow available order updates after your purchase has been confirmed.',
        icon: 'map-pin',
      },
    ],
  },
  doesBuyingHelp: {
    id: 'does-buying-facebook-post-likes-help',
    title: 'Does Buying Facebook Post Likes Help?',
    description:
      'Buying Facebook Post Likes increases the visible Like count on a specific Facebook post, which may help create stronger social proof and encourage more people to view the content. However, Post Like packages do not guarantee additional comments, shares, sales or increased organic reach.',
    helpTitle: 'What Post Likes Can Help With',
    helpItems: [
      'Improve post activity',
      'Strengthen social proof',
      'Support promotional campaigns',
      'Create a stronger first impression',
      'Complement paid advertising',
    ],
    limitTitle: 'What They Do Not Guarantee',
    limitItems: [
      'Higher organic reach',
      'More comments',
      'More shares',
      'Additional sales',
      'Viral performance',
      'Facebook algorithm promotion',
    ],
    closingNote:
      'Facebook Post Likes are most effective when combined with useful content, strong visuals and a consistent publishing strategy rather than being treated as a replacement for quality content.',
  },
  whatHappens: {
    id: 'what-happens-after-you-buy-facebook-post-likes',
    title: 'What Happens After You Buy Facebook Post Likes?',
    description:
      'After your order is confirmed, the selected Post Like package is processed using the public URL of your Facebook post. As delivery progresses, the visible Like count on the selected post increases according to the package you purchased. This does not automatically increase comments, shares or overall page growth.',
    steps: [
      {
        id: 'fb-post-th-confirmed',
        title: 'Order Confirmed',
        description:
          'Your payment is verified and your Facebook Post Like order enters the processing queue.',
      },
      {
        id: 'fb-post-th-delivery',
        title: 'Delivery Begins',
        description:
          'The selected Like package starts processing for your Facebook post.',
      },
      {
        id: 'fb-post-th-increase',
        title: 'Likes Increase',
        description:
          'The visible Like count on your Facebook post increases as delivery progresses.',
      },
      {
        id: 'fb-post-th-promote',
        title: 'Continue Promoting Your Content',
        description:
          'Keep sharing valuable content, responding to comments and promoting your Facebook post to encourage long-term engagement beyond visible Like counts.',
      },
    ],
  },
  serviceCompare: {
    id: 'facebook-post-likes-vs-page-likes-vs-followers',
    title: 'Facebook Post Likes vs Page Likes vs Followers',
    description:
      'Facebook Post Likes, Page Likes and Followers measure different types of activity. Post Likes increase engagement metrics on an individual post, Page Likes strengthen the visible popularity of your Facebook page, and Followers represent the audience that receives updates from your page. Choosing the right service depends on whether your goal is to improve a single post or your overall page presence.',
    postLikes: {
      title: 'Facebook Post Likes',
      description:
        'Designed for individual Facebook posts, helping increase the visible Like count on a specific update, announcement, promotion or campaign.',
      ctaLabel: 'Current Service',
    },
    pageLikes: {
      title: 'Facebook Page Likes',
      description:
        'Focuses on increasing the visible Like count displayed on your Facebook Business Page rather than a single post.',
      href: '/buy-facebook-page-likes',
      ctaLabel: 'View Facebook Page Likes',
    },
    followers: {
      title: 'Facebook Followers',
      description:
        'Supports audience growth by increasing the number of people following your Facebook page and future content.',
      href: '/buy-facebook-followers',
      ctaLabel: 'View Facebook Followers',
    },
    combinedNote:
      'Many businesses combine Post Likes, Page Likes and Followers as part of a broader Facebook marketing strategy. Each service supports a different objective and should be selected according to your campaign goals.',
  },
  canada: {
    id: 'buying-facebook-post-likes',
    title: 'Buying Facebook Post Likes worldwide',
    description:
      "NovaLikes provides Facebook Post Like packages for businesses, creators and brands worldwide. Whether you're promoting a product launch, seasonal campaign or important announcement, you can choose the package that best matches your engagement goals.",
    body: 'Different posts require different levels of engagement. A local promotion may only need a smaller package, while a larger marketing campaign or product announcement may benefit from a higher quantity of Post Likes.',
    cards: [
      {
        id: 'fb-post-ca-businesses',
        title: 'Small Businesses',
        description:
          'Support promotional posts, offers and customer announcements for local businesses.',
        icon: 'briefcase',
      },
      {
        id: 'fb-post-ca-ecommerce',
        title: 'E-commerce Brands',
        description:
          'Increase engagement signals around product launches, collections and seasonal campaigns.',
        icon: 'megaphone',
      },
      {
        id: 'fb-post-ca-creators',
        title: 'Content Creators',
        description:
          'Strengthen the presentation of important Facebook posts shared with your audience.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-post-ca-agencies',
        title: 'Marketing Agencies',
        description:
          'Manage engagement across client campaigns while selecting package sizes for different objectives.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-facebook-post-likes-packages',
    title: 'Popular Facebook Post Likes Packages',
    description:
      'Choose a package that fits the importance of your post and your overall campaign strategy. Smaller packages are suitable for everyday content, while larger quantities may better support major announcements and promotions.',
    rows: [
      {
        id: 'pkg-100',
        quantity: '100 Post Likes',
        recommendedFor: 'Suitable for routine updates and everyday Facebook posts.',
      },
      {
        id: 'pkg-500',
        quantity: '500 Post Likes',
        recommendedFor: 'A popular option for promotions and product highlights.',
      },
      {
        id: 'pkg-1k',
        quantity: '1,000 Post Likes',
        recommendedFor: 'Ideal for business campaigns and high-priority announcements.',
      },
      {
        id: 'pkg-2-5k',
        quantity: '2,500 Post Likes',
        recommendedFor: 'Designed for larger promotional campaigns and product launches.',
      },
      {
        id: 'pkg-5k',
        quantity: '5,000+ Post Likes',
        recommendedFor:
          'Best suited for high-visibility marketing campaigns and important brand announcements.',
      },
    ],
    bottomNote:
      'Select a package that reflects your campaign objectives and the importance of the post instead of automatically choosing the largest quantity.',
  },
  bestPractices: {
    id: 'best-practices-after-buying-facebook-post-likes',
    title: 'Best Practices After Buying Facebook Post Likes',
    description:
      'Audience interaction is only one part of a successful Facebook content strategy. Continue improving your posts, interacting with your audience and reviewing performance data to support long-term results.',
    closingNote:
      'Facebook Post Likes support social proof on individual updates, but long-term performance depends on creating useful content that encourages genuine interaction.',
    items: [
      {
        id: 'fb-post-bp-captions',
        title: 'Write Clear Captions',
        description:
          'Use concise, relevant captions that explain the purpose of your post and encourage readers to continue engaging with the content.',
        icon: 'clapperboard',
      },
      {
        id: 'fb-post-bp-visuals',
        title: 'Use High-Quality Visuals',
        description:
          'Images and videos that match your message can make posts more appealing to people browsing Facebook.',
        icon: 'sparkles',
      },
      {
        id: 'fb-post-bp-reply',
        title: 'Reply to Comments',
        description:
          'Continue the conversation by responding to questions, feedback and comments after publishing your post.',
        icon: 'heart',
      },
      {
        id: 'fb-post-bp-insights',
        title: 'Monitor Post Insights',
        description:
          'Review Facebook Insights to understand how people interact with your posts and use those insights to improve future content.',
        icon: 'briefcase',
      },
    ],
  },
  commonMistakes: {
    id: 'common-mistakes-when-buying-facebook-post-likes',
    title: 'Common Mistakes When Buying Facebook Post Likes',
    description:
      'Avoid these common mistakes so your order targets the right post and your expectations stay realistic.',
    items: [
      {
        id: 'fb-post-mistake-url',
        title: 'Using the Wrong Post URL',
        description:
          "Always double-check that you're submitting the URL of the specific Facebook post rather than your main Facebook page.",
        icon: 'megaphone',
      },
      {
        id: 'fb-post-mistake-package',
        title: 'Choosing an Unbalanced Package',
        description:
          'Select a quantity that fits the purpose of your campaign and the existing engagement on the post.',
        icon: 'sparkles',
      },
      {
        id: 'fb-post-mistake-private',
        title: 'Making the Post Private',
        description:
          'The selected Facebook post should remain publicly accessible while your order is being processed.',
        icon: 'lock',
      },
      {
        id: 'fb-post-mistake-content',
        title: 'Ignoring Content Quality',
        description:
          'Visible Like counts cannot replace useful content, compelling visuals and meaningful conversations with your audience.',
        icon: 'clapperboard',
      },
    ],
  },
};
