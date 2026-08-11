import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type YouTubeViewsInfoCard = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type YouTubeViewsDirectAnswer = {
  id: string;
  title: string;
  description: string;
};

/**
 * Topical blocks for Buy YouTube Views.
 * Hero, pricing, Why Buy, How to Buy, and requirements remain in data/content/youtube.ts.
 */
export type YouTubeViewsPageConfig = {
  whyChoose: {
    id: string;
    title: string;
    description: string;
    items: YouTubeViewsInfoCard[];
  };
  whyBuyNote: string;
  orderNotice: string;
  canYouBuy: YouTubeViewsDirectAnswer & {
    cards: YouTubeViewsInfoCard[];
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
    views: {
      title: string;
      description: string;
      ctaLabel: string;
    };
    subscribers: {
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
    cards: YouTubeViewsInfoCard[];
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
    items: YouTubeViewsInfoCard[];
  };
  commonMistakes: {
    id: string;
    title: string;
    items: YouTubeViewsInfoCard[];
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

export const YOUTUBE_VIEWS_PAGE_CONFIG: YouTubeViewsPageConfig = {
  whyChoose: {
    id: 'why-choose-novalikes-youtube-views',
    title: 'Why Choose NovaLikes for YouTube Views?',
    description:
      'NovaLikes provides transparent YouTube View packages with secure checkout, straightforward ordering and customer support throughout your purchase.',
    items: [
      {
        id: 'yt-v-wc-2018',
        title: 'Serving Customers Since 2018',
        description:
          'Helping creators, brands and businesses strengthen their online presence across major social platforms.',
        icon: 'sparkles',
      },
      {
        id: 'yt-v-wc-customers',
        title: '50,000+ Customers',
        description:
          'Trusted by thousands of customers looking for reliable social media growth solutions.',
        icon: 'users',
      },
      {
        id: 'yt-v-wc-checkout',
        title: 'Secure Checkout',
        description:
          'Complete your purchase without sharing your YouTube account password or private login details.',
        icon: 'lock',
      },
      {
        id: 'yt-v-wc-support',
        title: 'Customer Support',
        description:
          'Get assistance before and after your purchase whenever you need help with package selection or order updates.',
        icon: 'headphones',
      },
    ],
  },
  whyBuyNote:
    'View packages work best alongside valuable content, attractive thumbnails and consistent publishing rather than replacing long-term YouTube growth strategies.',
  orderNotice:
    'NovaLikes only requires the public URL of your YouTube video. Your YouTube password is never requested or stored.',
  canYouBuy: {
    id: 'can-you-buy-youtube-views',
    title: 'Can You Buy YouTube Views?',
    description:
      'Yes. YouTube View packages can be purchased by selecting a package, providing your public YouTube video URL and completing secure checkout. Your YouTube password is not required. View packages increase the public view count on eligible videos, but they do not guarantee subscriber growth, watch time, audience retention or higher rankings in YouTube recommendations.',
    cards: [
      {
        id: 'yt-v-can-url',
        title: 'Public Video URL',
        description: 'Orders are processed using the public URL of your YouTube video.',
        icon: 'users',
      },
      {
        id: 'yt-v-can-password',
        title: 'No Password Required',
        description:
          'Private login credentials and verification codes are never requested.',
        icon: 'lock',
      },
      {
        id: 'yt-v-can-packages',
        title: 'Transparent Packages',
        description:
          'Compare available view quantities, pricing and package details before ordering.',
        icon: 'sparkles',
      },
      {
        id: 'yt-v-can-track',
        title: 'Order Tracking',
        description:
          'Monitor available delivery updates after your order has been confirmed.',
        icon: 'map-pin',
      },
    ],
  },
  doesBuyingHelp: {
    id: 'does-buying-youtube-views-help',
    title: 'Does Buying YouTube Views Help?',
    description:
      'Buying YouTube views increases the public view count on a specific video, which may strengthen social proof and improve first impressions for new viewers. However, View packages do not guarantee more subscribers, higher watch time, stronger audience retention, increased revenue or better placement in YouTube recommendations.',
    helpTitle: 'What YouTube View Packages Can Help With',
    helpItems: [
      'Increase video exposure',
      'Strengthen social proof',
      'Support new video launches',
      'Improve first impressions',
      'Complement promotional campaigns',
    ],
    limitTitle: 'What They Do Not Guarantee',
    limitItems: [
      'More subscribers',
      'Higher watch time',
      'Better audience retention',
      'Monetization approval',
      'Algorithm recommendations',
      'Increased revenue',
    ],
    closingNote:
      'YouTube View packages are most effective when combined with valuable content, strong thumbnails, clear titles and consistent promotion rather than replacing long-term channel development.',
  },
  whatHappens: {
    id: 'what-happens-after-you-buy-youtube-views',
    title: 'What Happens After You Buy YouTube Views?',
    description:
      'After your order is confirmed, the selected YouTube View package is processed using your public video URL. As delivery progresses, the public view count on the video increases according to the package you purchased. Buying views does not automatically increase subscribers, watch time, audience retention or revenue.',
    steps: [
      {
        id: 'yt-v-th-confirmed',
        title: 'Order Confirmed',
        description:
          'Your payment is verified and the selected YouTube View package enters the processing queue.',
      },
      {
        id: 'yt-v-th-delivery',
        title: 'Delivery Begins',
        description:
          'Views begin arriving according to the package and delivery information shown during checkout.',
      },
      {
        id: 'yt-v-th-increase',
        title: 'View Count Increases',
        description:
          'Viewing activity on your YouTube video increases as delivery progresses.',
      },
      {
        id: 'yt-v-th-promote',
        title: 'Continue Promoting Your Video',
        description:
          'Keep improving the thumbnail, title, description and audience experience while reviewing YouTube Studio analytics for long-term performance.',
      },
    ],
  },
  serviceCompare: {
    id: 'youtube-views-vs-subscribers-vs-watch-time',
    title: 'YouTube Views vs Subscribers vs Watch Time',
    description:
      'YouTube Views, Subscribers and Watch Time measure different aspects of video and channel performance. Views count how many times a video has been watched, Subscribers represent people who choose to follow your channel, and Watch Time measures how long viewers spend watching your videos. Each metric contributes differently to overall YouTube growth.',
    views: {
      title: 'YouTube Views',
      description:
        'Views measure how many times individual videos are watched and help demonstrate the visibility and reach of your content.',
      ctaLabel: 'Current Service',
    },
    subscribers: {
      title: 'YouTube Subscribers',
      description:
        'Subscribers represent the audience that follows your channel and receives updates when new content is published.',
      href: '/buy-youtube-subscribers',
      ctaLabel: 'View Subscribers',
    },
    watchTime: {
      title: 'Watch Time',
      description:
        'Watch Time measures total viewing duration and helps creators understand how long audiences stay engaged with their videos.',
      href: '/learn/how-the-youtube-algorithm-works',
      ctaLabel: 'Learn About Watch Time',
    },
    combinedNote:
      'Successful YouTube channels improve multiple performance metrics together. Views, Subscribers and Watch Time each provide different insights into audience behaviour and content performance.',
  },
  canada: {
    id: 'buying-youtube-views',
    title: 'Buying YouTube Views worldwide',
    description:
      "NovaLikes provides YouTube View packages for creators, businesses and organizations worldwide. Whether you're promoting a newly published video or increasing the visibility of existing content, you can compare available packages and choose the option that best fits your marketing objectives.",
    body: 'Every video has different promotional objectives. Smaller View packages may suit recently published videos, while larger campaigns often support videos with broader marketing goals or existing audience interest.',
    closingNote:
      'Choose the package that best matches your existing video performance rather than automatically selecting the largest available quantity.',
    cards: [
      {
        id: 'yt-v-ca-creators',
        title: 'Content Creators',
        description:
          'Increase the visibility of tutorials, entertainment videos, vlogs and educational content.',
        icon: 'clapperboard',
      },
      {
        id: 'yt-v-ca-businesses',
        title: 'Businesses',
        description:
          'Support product demonstrations, brand campaigns and promotional videos with additional visibility.',
        icon: 'briefcase',
      },
      {
        id: 'yt-v-ca-educators',
        title: 'Educators',
        description: 'Help educational videos and online lessons reach a broader audience.',
        icon: 'sparkles',
      },
      {
        id: 'yt-v-ca-agencies',
        title: 'Agencies',
        description:
          'Manage video promotion across multiple client campaigns and marketing projects.',
        icon: 'users',
      },
    ],
  },
  packageSizes: {
    id: 'popular-youtube-views-packages',
    title: 'Popular YouTube Views Packages',
    description:
      'Choose a View package that aligns with your promotional objectives, current reach and promotion plan. Selecting the right quantity helps maintain a balanced approach to video promotion.',
    rows: [
      {
        id: 'pkg-2500',
        quantity: '2,500 Views',
        recommendedFor:
          'A practical option for recently published videos looking for early visibility.',
      },
      {
        id: 'pkg-5k',
        quantity: '5,000 Views',
        recommendedFor:
          'Frequently selected for videos with ongoing promotion and audience engagement.',
      },
      {
        id: 'pkg-10k',
        quantity: '10,000 Views',
        recommendedFor:
          'Suitable for creators expanding the reach of important video content.',
      },
      {
        id: 'pkg-20k',
        quantity: '20,000 Views',
        recommendedFor:
          'Designed for larger campaigns focused on increasing video exposure.',
      },
      {
        id: 'pkg-custom',
        quantity: 'Custom Packages',
        recommendedFor:
          'Choose larger quantities when they align with your marketing objectives and overall promotion plan.',
      },
    ],
    bottomNote:
      "Select the package that reflects your video's existing performance instead of automatically choosing the highest available quantity.",
  },
  bestPractices: {
    id: 'best-practices-after-buying-youtube-views',
    title: 'Best Practices After Buying YouTube Views',
    description:
      'View packages work best when combined with valuable content, attractive thumbnails and a consistent publishing strategy. Continue improving your videos while reviewing YouTube Studio analytics to support long-term growth.',
    closingNote:
      'Long-term YouTube success depends on publishing valuable videos, understanding audience behaviour and continuously improving your content strategy.',
    items: [
      {
        id: 'yt-v-bp-thumbnails',
        title: 'Create Better Thumbnails',
        description:
          'Professional thumbnails encourage more viewers to click on your videos from search results and recommendations.',
        icon: 'sparkles',
      },
      {
        id: 'yt-v-bp-titles',
        title: 'Write Better Titles',
        description:
          "Clear, descriptive titles help viewers understand your video's topic while improving discoverability.",
        icon: 'megaphone',
      },
      {
        id: 'yt-v-bp-retention',
        title: 'Improve Audience Retention',
        description:
          'Keep viewers engaged with valuable content and well-structured videos that encourage longer watch sessions.',
        icon: 'clapperboard',
      },
      {
        id: 'yt-v-bp-analytics',
        title: 'Review YouTube Analytics',
        description:
          'Monitor traffic sources, click-through rate, audience retention and video performance to improve future uploads.',
        icon: 'briefcase',
      },
    ],
  },
  commonMistakes: {
    id: 'common-mistakes-when-buying-youtube-views',
    title: 'Common Mistakes When Buying YouTube Views',
    items: [
      {
        id: 'yt-v-mistake-oversized',
        title: 'Choosing an Oversized Package',
        description:
          "Select a package that matches your video's existing performance and promotional objectives instead of automatically selecting the largest quantity.",
        icon: 'megaphone',
      },
      {
        id: 'yt-v-mistake-instant',
        title: 'Expecting Instant Success',
        description:
          'Views can strengthen social proof, but they do not automatically generate subscribers, revenue or long-term channel growth.',
        icon: 'sparkles',
      },
      {
        id: 'yt-v-mistake-quality',
        title: 'Ignoring Video Quality',
        description:
          'Publishing valuable videos remains essential for attracting viewers and encouraging longer watch sessions.',
        icon: 'clapperboard',
      },
      {
        id: 'yt-v-mistake-analytics',
        title: 'Not Reviewing Analytics',
        description:
          'Regularly monitor YouTube Studio metrics such as audience retention, traffic sources and click-through rate to improve future content.',
        icon: 'briefcase',
      },
    ],
  },
  exploreMore: {
    id: 'explore-more-youtube-growth-services',
    title: 'Explore More YouTube Growth Services',
    cards: [
      {
        id: 'yt-v-explore-subscribers',
        title: 'YouTube Subscribers',
        description:
          'Build a stronger channel audience alongside your video promotion strategy.',
        href: '/buy-youtube-subscribers',
        ctaLabel: 'Explore Subscribers',
      },
      {
        id: 'yt-v-explore-watch-time',
        title: 'YouTube Watch Time',
        description:
          'Learn how Watch Time contributes to overall YouTube channel performance.',
        href: '/learn/how-the-youtube-algorithm-works',
        ctaLabel: 'Learn More',
      },
      {
        id: 'yt-v-explore-seo',
        title: 'YouTube SEO Guide',
        description:
          'Discover practical ways to improve video visibility through YouTube SEO best practices.',
        href: '/learn/youtube-seo-guide',
        ctaLabel: 'Read Guide',
      },
    ],
  },
};
