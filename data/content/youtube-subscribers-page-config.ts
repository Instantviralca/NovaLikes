import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type YouTubeSubscribersInfoCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type YouTubeSubscribersDirectAnswer = {
  id: string;
  title: string;
  description: string;
};

/**
 * Topical blocks for Buy YouTube Subscribers.
 * Hero, pricing, Why Buy, How to Buy, and requirements remain in data/content/youtube.ts.
 */
export type YouTubeSubscribersPageConfig = {
  whyChoose: {
    id: string;
    title: string;
    description: string;
    items: YouTubeSubscribersInfoCard[];
  };
  whyBuyNote: string;
  orderNotice: string;
  canYouBuy: YouTubeSubscribersDirectAnswer & {
    cards: YouTubeSubscribersInfoCard[];
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
    subscribers: {
      title: string;
      description: string;
      ctaLabel: string;
    };
    views: {
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    };
    watchTime: {
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
    closingNote: string;
    cards: YouTubeSubscribersInfoCard[];
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
    items: YouTubeSubscribersInfoCard[];
  };
  commonMistakes: {
    id: string;
    title: string;
    items: YouTubeSubscribersInfoCard[];
  };
  exploreMore: {
    id: string;
    title: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    }>;
  };
};

export const YOUTUBE_SUBSCRIBERS_PAGE_CONFIG: YouTubeSubscribersPageConfig = {
  whyChoose: {
    id: 'why-choose-novalikes-youtube-subscribers',
    title: 'Why Choose NovaLikes for YouTube Subscribers?',
    description:
      'NovaLikes provides a straightforward ordering experience with transparent subscriber packages, secure checkout and support throughout your purchase.',
    items: [
      {
        id: 'yt-s-wc-2018',
        title: 'Serving Customers Since 2018',
        description:
          'Helping creators, brands and businesses strengthen their online presence across major social platforms.',
        icon: 'sparkles',
      },
      {
        id: 'yt-s-wc-customers',
        title: '50,000+ Customers',
        description:
          'Trusted by thousands of customers looking for reliable social media growth solutions.',
        icon: 'users',
      },
      {
        id: 'yt-s-wc-checkout',
        title: 'Secure Checkout',
        description:
          'Complete your purchase without sharing your YouTube account password or private login details.',
        icon: 'lock',
      },
      {
        id: 'yt-s-wc-support',
        title: 'Customer Support',
        description:
          'Get assistance before and after your purchase whenever you need help with package selection or order updates.',
        icon: 'headphones',
      },
    ],
  },
  whyBuyNote:
    'Subscriber packages work best alongside consistent publishing, high-quality videos and audience engagement rather than replacing a long-term YouTube strategy.',
  orderNotice:
    'NovaLikes only requires your public YouTube channel URL. Your YouTube password is never requested or stored.',
  canYouBuy: {
    id: 'can-you-buy-youtube-subscribers',
    title: 'Can You Buy YouTube Subscribers?',
    description:
      'Yes. YouTube subscriber packages can be purchased by selecting a package, providing your public YouTube channel URL and completing secure checkout. Your YouTube password is not required. Subscriber packages increase the visible subscriber count on your channel, but they do not guarantee additional views, watch time, monetization approval or algorithmic promotion.',
    cards: [
      {
        id: 'yt-s-can-url',
        title: 'Public Channel URL',
        description:
          'Orders are processed using the public URL of your YouTube channel.',
        icon: 'users',
      },
      {
        id: 'yt-s-can-password',
        title: 'No Password Required',
        description:
          'Private login credentials and verification codes are never required.',
        icon: 'lock',
      },
      {
        id: 'yt-s-can-packages',
        title: 'Transparent Packages',
        description:
          'Compare subscriber quantities, pricing and package details before placing your order.',
        icon: 'sparkles',
      },
      {
        id: 'yt-s-can-track',
        title: 'Order Tracking',
        description:
          'Monitor available delivery updates after your order has been confirmed.',
        icon: 'map-pin',
      },
    ],
  },
  doesBuyingHelp: {
    id: 'does-buying-youtube-subscribers-help',
    title: 'Does Buying YouTube Subscribers Help?',
    description:
      'Buying YouTube subscribers increases the visible subscriber count displayed on your channel, which may help create a stronger first impression for new visitors. However, subscriber packages do not guarantee additional video views, watch time, audience retention, monetization approval or higher visibility in YouTube recommendations.',
    helpTitle: 'What Subscriber Packages Can Help With',
    helpItems: [
      'Improve visible channel credibility',
      'Support new channel launches',
      'Strengthen first impressions',
      'Build audience confidence',
      'Complement long-term publishing',
    ],
    limitTitle: 'What They Do Not Guarantee',
    limitItems: [
      'More video views',
      'Higher watch time',
      'Audience retention',
      'Monetization approval',
      'Algorithm recommendations',
      'Increased revenue',
    ],
    closingNote:
      'Subscriber packages are most effective when combined with valuable videos, consistent publishing and a long-term content strategy rather than replacing organic channel development.',
  },
  whatHappens: {
    id: 'what-happens-after-you-buy-youtube-subscribers',
    title: 'What Happens After You Buy YouTube Subscribers?',
    description:
      'After your order is confirmed, the selected subscriber package is processed using your public YouTube channel URL. As delivery progresses, the visible subscriber count on your channel increases according to the package you selected. Subscriber packages do not automatically increase video views, watch time or channel revenue.',
    steps: [
      {
        id: 'yt-s-th-confirmed',
        title: 'Order Confirmed',
        description:
          'Your payment is verified and your subscriber package enters the processing queue.',
      },
      {
        id: 'yt-s-th-delivery',
        title: 'Delivery Begins',
        description:
          'Subscribers begin arriving according to the package selected during checkout.',
      },
      {
        id: 'yt-s-th-increase',
        title: 'Subscriber Count Increases',
        description:
          'Your channel displays a higher visible subscriber count as delivery progresses.',
      },
      {
        id: 'yt-s-th-grow',
        title: 'Continue Growing Your Channel',
        description:
          'Keep publishing valuable videos, improving thumbnails and titles, and reviewing YouTube Studio analytics to build sustainable long-term channel growth.',
      },
    ],
  },
  serviceCompare: {
    id: 'youtube-subscribers-vs-views-vs-watch-time',
    title: 'YouTube Subscribers vs Views vs Watch Time',
    description:
      'YouTube Subscribers, Views and Watch Time measure different aspects of channel performance. Subscribers represent people who choose to follow your channel, Views count how many times videos are watched, and Watch Time measures how long viewers spend watching your content. Each metric supports a different stage of channel growth.',
    subscribers: {
      title: 'YouTube Subscribers',
      description:
        'Subscribers strengthen the visible audience of your channel and show that people have chosen to follow your future content.',
      ctaLabel: 'Current Service',
    },
    views: {
      title: 'YouTube Views',
      description:
        'Views measure how many times individual videos are watched and help creators understand the reach of their content.',
      href: '/buy-youtube-views',
      ctaLabel: 'View YouTube Views',
    },
    watchTime: {
      title: 'Watch Time',
      description:
        'Watch Time measures total viewing duration across your videos and is one of the important performance metrics available inside YouTube Studio.',
      href: '/learn/how-the-youtube-algorithm-works',
      ctaLabel: 'Learn About Watch Time',
    },
    combinedNote:
      'Successful YouTube channels focus on multiple performance indicators rather than a single metric. Subscribers, Views and Watch Time each contribute to understanding overall channel performance and audience behaviour.',
  },
  canada: {
    id: 'buying-youtube-subscribers',
    title: 'Buying YouTube Subscribers worldwide',
    description:
      "NovaLikes offers YouTube Subscriber packages for creators, businesses and organizations worldwide. Whether you're starting a new channel or growing an existing audience, you can compare available packages and choose the option that aligns with your publishing goals.",
    body: 'Different channels have different growth objectives. A new creator may begin with a smaller subscriber package, while established brands and businesses often select larger packages that better match their existing audience and long-term content strategy.',
    closingNote:
      'Choose the package that best matches your current subscriber base rather than automatically selecting the largest option.',
    cards: [
      {
        id: 'yt-s-ca-creators',
        title: 'Content Creators',
        description:
          'Support the presentation of lifestyle, education, entertainment and personal creator channels.',
        icon: 'clapperboard',
      },
      {
        id: 'yt-s-ca-businesses',
        title: 'Businesses',
        description:
          'Strengthen the appearance of product demonstrations, brand storytelling and company channels.',
        icon: 'briefcase',
      },
      {
        id: 'yt-s-ca-educators',
        title: 'Educators',
        description:
          'Present online courses, tutorials and educational content through a stronger-looking YouTube presence.',
        icon: 'sparkles',
      },
      {
        id: 'yt-s-ca-agencies',
        title: 'Agencies',
        description:
          'Manage subscriber growth across multiple client channels and marketing campaigns.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-youtube-subscriber-packages',
    title: 'Popular YouTube Subscriber Packages',
    description:
      'Choose a subscriber package that reflects your current audience size, publishing schedule and channel objectives. Selecting the right quantity helps create a balanced growth strategy for new and established YouTube channels.',
    rows: [
      {
        id: 'pkg-100',
        quantity: '100 Subscribers',
        recommendedFor: 'A practical starting point for newly launched YouTube channels.',
      },
      {
        id: 'pkg-500',
        quantity: '500 Subscribers',
        recommendedFor: 'Suitable for creators consistently publishing new videos.',
      },
      {
        id: 'pkg-1k',
        quantity: '1,000 Subscribers',
        recommendedFor:
          'Frequently selected by creators growing a consistent publishing schedule.',
      },
      {
        id: 'pkg-2-5k',
        quantity: '2,500 Subscribers',
        recommendedFor:
          'Designed for growing brands and creators expanding their YouTube presence.',
      },
      {
        id: 'pkg-5k',
        quantity: '5,000+ Subscribers',
        recommendedFor:
          'Suitable for larger channels focused on strengthening their visible audience.',
      },
    ],
    bottomNote:
      'Choose the subscriber package that best fits your current channel size instead of automatically selecting the largest available quantity.',
  },
  bestPractices: {
    id: 'best-practices-after-buying-youtube-subscribers',
    title: 'Best Practices After Buying YouTube Subscribers',
    description:
      'Subscriber growth is only one part of building a successful YouTube channel. Continue creating valuable videos, improving channel branding and reviewing YouTube Studio analytics to support sustainable long-term growth.',
    closingNote:
      'Long-term YouTube growth depends on consistently publishing valuable content and understanding audience behaviour through YouTube Studio insights.',
    items: [
      {
        id: 'yt-s-bp-publish',
        title: 'Publish Consistently',
        description:
          'Maintain a regular upload schedule so subscribers always have fresh content to watch.',
        icon: 'clapperboard',
      },
      {
        id: 'yt-s-bp-thumbnails',
        title: 'Improve Thumbnails',
        description:
          'Professional thumbnails help attract viewers and encourage more clicks from search results and recommendations.',
        icon: 'sparkles',
      },
      {
        id: 'yt-s-bp-titles',
        title: 'Write Better Titles',
        description:
          'Clear, descriptive titles make videos easier to understand while improving discoverability.',
        icon: 'megaphone',
      },
      {
        id: 'yt-s-bp-analytics',
        title: 'Review YouTube Analytics',
        description:
          'Monitor audience behaviour, returning viewers and engagement trends to improve future content decisions.',
        icon: 'briefcase',
      },
    ],
  },
  commonMistakes: {
    id: 'common-mistakes-when-buying-youtube-subscribers',
    title: 'Common Mistakes When Buying YouTube Subscribers',
    items: [
      {
        id: 'yt-s-mistake-oversized',
        title: 'Choosing an Oversized Package',
        description:
          'Select a package that matches your current channel size and publishing activity instead of automatically choosing the highest quantity.',
        icon: 'megaphone',
      },
      {
        id: 'yt-s-mistake-instant',
        title: 'Expecting Instant Success',
        description:
          'Subscribers strengthen the visible audience of your channel, but they do not automatically generate views, watch time or monetization.',
        icon: 'sparkles',
      },
      {
        id: 'yt-s-mistake-quality',
        title: 'Ignoring Video Quality',
        description:
          'Publishing valuable videos remains essential for attracting returning viewers and maintaining audience interest.',
        icon: 'clapperboard',
      },
      {
        id: 'yt-s-mistake-studio',
        title: 'Not Using YouTube Studio',
        description:
          'Regularly review channel analytics to understand which videos perform well and where future improvements can be made.',
        icon: 'briefcase',
      },
    ],
  },
  exploreMore: {
    id: 'explore-more-youtube-growth-services',
    title: 'Explore More YouTube Growth Services',
    cards: [
      {
        id: 'yt-s-explore-views',
        title: 'YouTube Views',
        description:
          'Support the visibility of individual videos with YouTube View packages.',
        href: '/buy-youtube-views',
        ctaLabel: 'Explore Service',
      },
      {
        id: 'yt-s-explore-watch-time',
        title: 'YouTube Watch Time',
        description:
          'Explore resources related to YouTube Watch Time and channel performance.',
        href: '/learn/how-the-youtube-algorithm-works',
        ctaLabel: 'Explore Service',
      },
    ],
  },
};
