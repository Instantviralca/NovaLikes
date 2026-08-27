/**
 * Homepage multi-platform commercial hub — Phase 1A.
 * Original NovaLikes copy. Not an Instagram Followers landing page.
 * Dedicated /buy-* pages remain transactional authorities.
 */

import type { PlatformId } from '@/types/platform';

export type HubCta = { label: string; href: string };

export type HubServiceMini = {
  id: string;
  platform: PlatformId;
  slug: string;
  href: string;
  name: string;
  commercialLabel: string;
  title: string;
  intro: string;
  cardBlurb: string;
  points: { title: string; text: string }[];
  cta: HubCta;
  image: { src: string; alt: string };
  tone: 'rose' | 'slate' | 'blue' | 'red' | 'amber' | 'violet' | 'cyan' | 'orange';
};

export const homepageHub = {
  hero: {
    eyebrow: 'INSTAGRAM • TIKTOK • FACEBOOK',
    title: 'Grow Your Social Presence with NovaLikes',
    description:
      'Buy followers, likes, views, and comments for Instagram, TikTok, and Facebook. NovaLikes gives you clear package options for each service, so you can choose what fits your account and order without sharing your password. Select a service, pick a package, enter the required public profile or content details, and complete your order online.',
    primaryCta: { label: 'Explore Services', href: '#services-overview' },
    secondaryCta: { label: 'How It Works', href: '#how-it-works' },
    trustFeatures: [
      { id: 'password', line1: 'No Password', line2: 'Required', icon: 'shield' as const },
      { id: 'pricing', line1: 'Clear', line2: 'Pricing', icon: 'tag' as const },
      { id: 'tracking', line1: 'Order', line2: 'Tracking', icon: 'truck' as const },
    ],
    visual: {
      src: '/assets/images/homepage/hero-social-growth.webp',
      alt: 'NovaLikes social media growth illustration showing Instagram, TikTok, and Facebook engagement',
      width: 1024,
      height: 682,
    },
  },

  platformSelector: {
    id: 'platform-selector',
    eyebrow: 'Pick Your Platform',
    title: 'Choose Your Platform',
    description:
      'Start with the platform you want to grow. Each one has its own services and package options, so you can go straight to what you need.',
    trustItems: [
      { id: 'packages', label: 'Clear Package Options', icon: 'shield' as const },
      { id: 'password', label: 'No Password Required', icon: 'shield' as const },
      { id: 'refund', label: '30-Day Money-Back Guarantee on Eligible Orders', icon: 'shield' as const },
    ],
    socialProof: {
      text: 'Compare NovaLikes services for Instagram, TikTok and Facebook',
      href: '#services-overview',
    },
    platforms: [
      {
        id: 'instagram' as const,
        name: 'Instagram',
        description: 'Followers, likes, views, and comments for Instagram profiles and content.',
        href: '#instagram-services',
        ctaLabel: 'View Instagram',
        badge: 'Instagram Services',
        metric: { value: 'Profile', label: 'Followers' },
        tags: [
          { label: 'Profile Growth', href: '/buy-instagram-followers', icon: 'user' as const },
          { label: 'Post Engagement', href: '/buy-instagram-likes', icon: 'heart' as const },
          { label: 'Reels Views', href: '/buy-instagram-views', icon: 'play' as const },
          { label: 'Comments', href: '/buy-instagram-comments', icon: 'comment' as const },
        ],
      },
      {
        id: 'tiktok' as const,
        name: 'TikTok',
        description: 'Followers, likes, and views for TikTok accounts and videos.',
        href: '#tiktok-services',
        ctaLabel: 'View TikTok',
        metric: { value: 'Video', label: 'Views' },
        tags: [
          { label: 'Account Growth', href: '/buy-tiktok-followers', icon: 'trend' as const },
          { label: 'Video Likes', href: '/buy-tiktok-likes', icon: 'heart' as const },
          { label: 'Video Views', href: '/buy-tiktok-views', icon: 'eye' as const },
          { label: 'More Engagement', href: '#tiktok-services', icon: 'spark' as const },
        ],
      },
      {
        id: 'facebook' as const,
        name: 'Facebook',
        description: 'Followers, Page likes, and post likes for public Facebook Pages and posts.',
        href: '#facebook-services',
        ctaLabel: 'View Facebook',
        metric: { value: 'Page', label: 'Likes' },
        tags: [
          { label: 'Page Growth', href: '/buy-facebook-page-likes', icon: 'users' as const },
          { label: 'Post Likes', href: '/buy-facebook-post-likes', icon: 'thumb' as const },
          { label: 'Profile Followers', href: '/buy-facebook-followers', icon: 'user' as const },
          { label: 'More Reach', href: '#facebook-services', icon: 'reach' as const },
        ],
      },
    ],
  },

  servicesOverview: {
    id: 'services-overview',
    eyebrow: 'All Services',
    title: 'All NovaLikes Services',
    description:
      'Choose the service that matches what you want to grow. NovaLikes offers followers, likes, views, comments, Page likes, and post likes across Instagram, TikTok, and Facebook. Open any service to compare package sizes and prices.',
    trustNote: 'Compare Services and Package Options',
    features: [
      { id: 'users', label: 'Platform-Specific Services', icon: 'users' as const },
      { id: 'delivery', label: 'Clear Package Pricing', icon: 'bolt' as const },
      { id: 'support', label: 'Customer Support', icon: 'headset' as const },
      { id: 'payments', label: 'Secure Card Payments', icon: 'shield' as const },
    ],
  },

  platformGroupTitles: {
    instagram: {
      id: 'instagram-services',
      title: 'Instagram Growth',
      description:
        'Choose from followers, likes, views, and comments based on what you want to improve on Instagram.',
    },
    tiktok: {
      id: 'tiktok-services',
      title: 'TikTok Growth',
      description:
        'Choose followers, likes, or views depending on what you want to add to your TikTok account or videos.',
    },
    facebook: {
      id: 'facebook-services',
      title: 'Facebook Growth',
      description:
        'Choose followers, Page likes, or post likes based on the part of your Facebook presence you want to work on.',
    },
  },

  why: {
    id: 'why-novalikes',
    title: 'Why Choose NovaLikes?',
    description:
      'Ordering social media services should not leave you guessing about the price, what information you need, or where your order stands. NovaLikes keeps these details clear from the start.',
    points: [
      {
        title: 'Clear Package Options',
        body: 'See the available quantities and prices before you place an order, so you know exactly which package you are choosing.',
      },
      {
        title: 'No Password Required',
        body: 'We only ask for the public profile, Page, post, or video details needed for the service you order. Your account password stays private.',
      },
      {
        title: 'Order Tracking',
        body: 'Use your order details to check the status of your purchase after checkout instead of wondering what is happening with it.',
      },
      {
        title: 'Help When You Need It',
        body: 'If you have a question about a service or an existing order, you can contact NovaLikes for support.',
      },
    ],
  },

  howItWorks: {
    id: 'how-it-works',
    title: 'How NovaLikes Works',
    description:
      'Placing an order takes a few simple steps. You choose what you need, enter the required public details, and complete your purchase.',
    steps: [
      {
        title: 'Choose a Service',
        body: 'Select Instagram, TikTok, or Facebook, then choose the followers, likes, views, comments, Page likes, or post likes you need.',
      },
      {
        title: 'Pick a Package',
        body: 'Compare the available quantities and prices, then select the package you want to order.',
      },
      {
        title: 'Enter the Required Details',
        body: 'Provide the public username, profile, Page, post, or video link requested for that service. No password is required.',
      },
      {
        title: 'Complete Your Order',
        body: 'Continue through checkout and place your order. You can use the order tracking option afterward to check its status.',
      },
    ],
  },

  guarantees: {
    id: 'guarantees',
    title: 'Know What to Expect Before You Order',
    description:
      'Before placing an order, you should know what information is required, how pricing works, and where to find help if you need it. NovaLikes keeps these details available before checkout.',
    items: [
      {
        title: 'Your Password Stays Private',
        body: 'You do not need to share your social media password. Orders use the public profile or content details required for the selected service.',
      },
      {
        title: 'Prices Are Shown Before Checkout',
        body: 'Package quantities and prices are displayed before you order, so you can review your choice before continuing.',
      },
      {
        title: 'Policies Are Available to Read',
        body: 'You can review the applicable refund, privacy, and service terms before placing your order.',
      },
      {
        title: 'Support Is Available',
        body: 'Have a question before ordering or need help with an existing purchase? Contact NovaLikes and include the relevant order details when applicable.',
      },
    ],
  },

  beforeYouBuy: {
    id: 'before-you-buy',
    title: 'Before You Place an Order',
    description:
      'A quick check before ordering can help avoid delays or delivery issues. Make sure you have selected the right service and entered the correct public details for the account or content you want to use.',
    items: [
      {
        question: 'Choose the Right Service',
        answer:
          'Check whether you need followers, likes, views, comments, Page likes, or post likes before selecting a package.',
      },
      {
        question: 'Check Your Profile or Content',
        answer:
          'Make sure the profile, Page, post, Reel, or video you are ordering for is publicly accessible where the selected service requires it.',
      },
      {
        question: 'Enter the Correct Details',
        answer:
          'Double check the username or URL before checkout. The information you provide tells us where the order should be delivered.',
      },
      {
        question: 'Review Your Package',
        answer:
          'Check the service, quantity, and price before completing your purchase.',
      },
    ],
  },

  faq: {
    id: 'homepage-faq',
    title: 'Frequently Asked Questions',
    description:
      'Here are answers to common questions about choosing a NovaLikes service and placing an order.',
    items: [
      {
        question: 'What social media services can I order from NovaLikes?',
        answer:
          'NovaLikes offers followers, likes, views, comments, Page likes, and post likes across Instagram, TikTok, and Facebook. The available options depend on the platform you choose.',
      },
      {
        question: 'Do I need to give NovaLikes my social media password?',
        answer:
          'No. You only provide the public username, profile, Page, post, or video details required for the service you order.',
      },
      {
        question: 'How do I choose the right package?',
        answer:
          'Start by choosing the platform and service you need. You can then compare the available quantities and prices on that service page before selecting a package.',
      },
      {
        question: 'What information do I need to place an order?',
        answer:
          'It depends on the service. You may be asked for a public username, profile URL, Page URL, post link, Reel, or video URL so the order can be sent to the correct place.',
      },
      {
        question: 'Can I check my order after checkout?',
        answer:
          'Yes. NovaLikes provides an order tracking option that you can use to check the status of your purchase.',
      },
      {
        question: 'Can I contact NovaLikes if I have a question about my order?',
        answer:
          'Yes. You can contact NovaLikes for help with a service or an existing order. Include your order details when contacting support about a purchase.',
      },
    ],
  },

  reviews: {
    id: 'homepage-reviews',
    title: 'What Customers Say About NovaLikes',
    description:
      'Read feedback from customers who have used NovaLikes for social media services. Their experiences can help you get a better idea of the ordering process before placing your own order.',
    cta: { label: 'Read More Reviews', href: '/reviews' },
  },

  finalCta: {
    id: 'home-final-cta',
    eyebrow: 'Grow Faster with NovaLikes',
    title: 'Ready to Grow Your Social Presence?',
    description:
      "Choose the platform and service that fits what you're looking for. Compare available packages, review the details, and place your order when you're ready.",
    primaryCta: { label: 'Explore Services', href: '#services-overview' },
    secondaryCta: { label: 'Track an Order', href: '/track-order' },
    trustItems: [
      { id: 'secure', label: 'No Password Required', icon: 'shield' as const },
      { id: 'delivery', label: 'Clear Package Pricing', icon: 'bolt' as const },
      { id: 'support', label: 'Order Tracking', icon: 'headset' as const },
    ],
  },

  services: [
    {
      id: 'ig-followers',
      platform: 'instagram',
      slug: 'buy-instagram-followers',
      href: '/buy-instagram-followers',
      name: 'Instagram Followers',
      cardBlurb: 'Follower packages for your public Instagram profile.',
      commercialLabel: 'BUY INSTAGRAM FOLLOWERS',
      title: 'Instagram Followers Packages',
      intro:
        'Buy Instagram followers when you want to add more followers to your profile without sharing your password. Choose from the available package sizes, enter your public Instagram username, and place your order online.',
      points: [
        {
          title: 'Profile Follower Count',
          text: 'Followers are added to the public Instagram profile provided with the order.',
        },
        {
          title: 'For Different Account Sizes',
          text: 'Choose a follower quantity that makes sense for the profile you are working on.',
        },
        {
          title: 'Focused on Your Profile',
          text: 'This service is for your follower count, not the likes, views, or comments on individual posts.',
        },
        {
          title: 'Other Instagram Services',
          text: 'Likes, views, and comments are available separately when you want to work on individual content.',
        },
      ],
      cta: { label: 'View Instagram Followers', href: '/buy-instagram-followers' },
      image: {
        src: '/assets/images/illustrations/homepage/instagram-followers-visual.webp',
        alt: 'Instagram profile with follower and audience indicators',
      },
      tone: 'rose',
    },
    {
      id: 'ig-likes',
      platform: 'instagram',
      slug: 'buy-instagram-likes',
      href: '/buy-instagram-likes',
      name: 'Instagram Likes',
      cardBlurb: 'Like packages for eligible Instagram posts and Reels.',
      commercialLabel: 'BUY INSTAGRAM LIKES',
      title: 'Instagram Likes Packages',
      intro:
        'Buy Instagram likes for a post or Reel when you want more visible engagement on that piece of content. Choose a package, provide the public post or Reel URL, and place your order without giving NovaLikes access to your Instagram account.',
      points: [
        {
          title: 'For Posts and Reels',
          text: 'Choose the public Instagram post or Reel where you want the likes delivered.',
        },
        {
          title: 'Content Specific',
          text: 'Likes apply to the selected content rather than the follower count of your profile.',
        },
        {
          title: 'Choose the Right Post',
          text: 'Check that you are submitting the exact public post or Reel you want to use.',
        },
        {
          title: 'Likes, Views or Comments',
          text: 'Choose views for video watch count or comments when you want a different type of interaction.',
        },
      ],
      cta: { label: 'View Instagram Likes', href: '/buy-instagram-likes' },
      image: {
        src: '/assets/images/illustrations/homepage/instagram-likes-visual.webp',
        alt: 'Instagram post with likes and engagement indicators',
      },
      tone: 'violet',
    },
    {
      id: 'ig-views',
      platform: 'instagram',
      slug: 'buy-instagram-views',
      href: '/buy-instagram-views',
      name: 'Instagram Views',
      cardBlurb: 'View packages for eligible Instagram Reels and videos.',
      commercialLabel: 'BUY INSTAGRAM VIEWS',
      title: 'Instagram Views Packages',
      intro:
        'Buy Instagram views for a Reel or video when you want to increase its visible view count. Select the number of views you need, add the public link to your content, and complete your order without sharing your Instagram password.',
      points: [
        {
          title: 'Made for Video Content',
          text: 'Use this service for an eligible public Instagram Reel or video.',
        },
        {
          title: 'Focused on Views',
          text: 'This service is for the view count on your content rather than followers, likes, or comments.',
        },
        {
          title: 'Choose the Right Video',
          text: 'Submit the exact public Reel or video you want the views delivered to.',
        },
        {
          title: 'Order by Content',
          text: 'Choose a quantity based on the individual Reel or video you are working on.',
        },
      ],
      cta: { label: 'View Instagram Views', href: '/buy-instagram-views' },
      image: {
        src: '/assets/images/illustrations/homepage/instagram-views-visual.webp',
        alt: 'Instagram Reel with video view indicators',
      },
      tone: 'orange',
    },
    {
      id: 'ig-comments',
      platform: 'instagram',
      slug: 'buy-instagram-comments',
      href: '/buy-instagram-comments',
      name: 'Instagram Comments',
      cardBlurb: 'Comment packages for eligible Instagram posts and Reels.',
      commercialLabel: 'BUY INSTAGRAM COMMENTS',
      title: 'Instagram Comments Packages',
      intro:
        'Buy Instagram comments for a public post or Reel when you want more visible conversation around your content. Choose the available comment option that suits your post, provide the public content link, and place your order without sharing your Instagram password.',
      points: [
        {
          title: 'For Posts and Reels',
          text: 'Choose the public Instagram content where you want comments added.',
        },
        {
          title: 'Comment Activity',
          text: 'Comments add a different type of visible interaction from likes or views.',
        },
        {
          title: 'Content Specific',
          text: 'The order applies to the selected post or Reel rather than your overall follower count.',
        },
        {
          title: 'Check Your Content',
          text: 'Make sure the submitted post or Reel is the exact one you want to use for the order.',
        },
      ],
      cta: { label: 'View Instagram Comments', href: '/buy-instagram-comments' },
      image: {
        src: '/assets/images/illustrations/homepage/instagram-comments-visual.webp',
        alt: 'Instagram post with comments and conversation bubbles',
      },
      tone: 'amber',
    },
    {
      id: 'tt-followers',
      platform: 'tiktok',
      slug: 'buy-tiktok-followers',
      href: '/buy-tiktok-followers',
      name: 'TikTok Followers',
      cardBlurb: 'Follower packages for your public TikTok profile.',
      commercialLabel: 'BUY TIKTOK FOLLOWERS',
      title: 'TikTok Followers Packages',
      intro:
        'Buy TikTok followers when you want to increase the follower count shown on your profile. Choose a package that fits your account, provide your public TikTok username, and place your order without sharing your password.',
      points: [
        {
          title: 'Profile Follower Count',
          text: 'This service is for followers shown on the TikTok profile submitted with the order.',
        },
        {
          title: 'Account Focused',
          text: 'Followers apply to the account rather than the likes or views on a specific video.',
        },
        {
          title: 'Choose for Your Account',
          text: 'Select a follower quantity that fits the TikTok profile you are working on.',
        },
        {
          title: 'Video Services Are Separate',
          text: 'TikTok Likes and Views are available when you want to work on individual videos.',
        },
      ],
      cta: { label: 'View TikTok Followers', href: '/buy-tiktok-followers' },
      image: {
        src: '/assets/images/illustrations/homepage/tiktok-followers-visual.webp',
        alt: 'TikTok creator profile with follower indicators',
      },
      tone: 'slate',
    },
    {
      id: 'tt-likes',
      platform: 'tiktok',
      slug: 'buy-tiktok-likes',
      href: '/buy-tiktok-likes',
      name: 'TikTok Likes',
      cardBlurb: 'Like packages for eligible public TikTok videos.',
      commercialLabel: 'BUY TIKTOK LIKES',
      title: 'TikTok Likes Packages',
      intro:
        'Buy TikTok likes for a public video when you want to add more likes to that specific post. Pick the package size you need, enter the video link, and complete your order without giving NovaLikes your TikTok password.',
      points: [
        {
          title: 'For Individual Videos',
          text: 'Choose the public TikTok video where you want the likes delivered.',
        },
        {
          title: 'Video Specific',
          text: 'Likes apply to the selected video rather than the follower count of your TikTok profile.',
        },
        {
          title: 'Check the Video',
          text: 'Make sure you submit the exact public TikTok video you want to use.',
        },
        {
          title: 'Likes or Views',
          text: 'Choose TikTok Views instead when the view count is the metric you want to work on.',
        },
      ],
      cta: { label: 'View TikTok Likes', href: '/buy-tiktok-likes' },
      image: {
        src: '/assets/images/illustrations/homepage/tiktok-likes-visual.webp',
        alt: 'TikTok video with likes and interaction indicators',
      },
      tone: 'cyan',
    },
    {
      id: 'tt-views',
      platform: 'tiktok',
      slug: 'buy-tiktok-views',
      href: '/buy-tiktok-views',
      name: 'TikTok Views',
      cardBlurb: 'View packages for eligible public TikTok videos.',
      commercialLabel: 'BUY TIKTOK VIEWS',
      title: 'TikTok Views Packages',
      intro:
        'Buy TikTok views for a public video when you want to increase the number of views shown on that post. Choose the view package you need, provide the video URL, and place your order without sharing your TikTok password.',
      points: [
        {
          title: 'For TikTok Videos',
          text: 'Choose the public TikTok video where you want the views delivered.',
        },
        {
          title: 'Focused on View Count',
          text: 'This service works on video views rather than profile followers or video likes.',
        },
        {
          title: 'Use the Right Video',
          text: 'Check the TikTok video before submitting it with your order.',
        },
        {
          title: 'Choose by Video',
          text: 'Select the quantity based on the individual video you are working on.',
        },
      ],
      cta: { label: 'View TikTok Views', href: '/buy-tiktok-views' },
      image: {
        src: '/assets/images/illustrations/homepage/tiktok-views-visual.webp',
        alt: 'TikTok video with view and playback indicators',
      },
      tone: 'slate',
    },
    {
      id: 'fb-followers',
      platform: 'facebook',
      slug: 'buy-facebook-followers',
      href: '/buy-facebook-followers',
      name: 'Facebook Followers',
      cardBlurb: 'Follower packages for eligible public Facebook Pages.',
      commercialLabel: 'BUY FACEBOOK FOLLOWERS',
      title: 'Facebook Followers Packages',
      intro:
        'Buy Facebook followers when you want to add more followers to an eligible public Facebook Page. Choose from the available package sizes, provide the public Facebook Page details required for your order, and complete your purchase without sharing your Facebook password.',
      points: [
        {
          title: 'Follower Focused',
          text: 'Use this service when followers are the Facebook metric you want to work on.',
        },
        {
          title: 'Different from Page Likes',
          text: 'Facebook Followers and Facebook Page Likes are separate services with different purposes.',
        },
        {
          title: 'For Your Facebook Page',
          text: 'The followers apply to the eligible public Facebook Page submitted with the order.',
        },
        {
          title: 'Post Likes Are Separate',
          text: 'Choose Facebook Post Likes when you want likes on an individual post instead.',
        },
      ],
      cta: { label: 'View Facebook Followers', href: '/buy-facebook-followers' },
      image: {
        src: '/assets/images/illustrations/homepage/facebook-followers-visual.webp',
        alt: 'Facebook Page with follower and community indicators',
      },
      tone: 'blue',
    },
    {
      id: 'fb-page-likes',
      platform: 'facebook',
      slug: 'buy-facebook-page-likes',
      href: '/buy-facebook-page-likes',
      name: 'Facebook Page Likes',
      cardBlurb: 'Page Like packages for eligible public Facebook Pages.',
      commercialLabel: 'BUY FACEBOOK PAGE LIKES',
      title: 'Facebook Page Likes Packages',
      intro:
        'Buy Facebook Page likes when you want to increase the number of likes shown on your business, brand, or public Page. Choose a package, provide the public Facebook Page link, and place your order without sharing your account password.',
      points: [
        {
          title: 'For Facebook Pages',
          text: 'Use this service for an eligible public business, brand, or other Facebook Page.',
        },
        {
          title: 'Page Level Metric',
          text: 'Page likes apply to the Page itself rather than an individual Facebook post.',
        },
        {
          title: 'Different from Followers',
          text: 'Choose Facebook Followers instead when follower count is the metric you want.',
        },
        {
          title: 'Check the Page',
          text: 'Make sure the public Facebook Page submitted with the order is the correct one.',
        },
      ],
      cta: { label: 'View Facebook Page Likes', href: '/buy-facebook-page-likes' },
      image: {
        src: '/assets/images/illustrations/homepage/facebook-page-likes-visual.webp',
        alt: 'Facebook Page with Page Like indicators',
      },
      tone: 'blue',
    },
    {
      id: 'fb-post-likes',
      platform: 'facebook',
      slug: 'buy-facebook-post-likes',
      href: '/buy-facebook-post-likes',
      name: 'Facebook Post Likes',
      cardBlurb: 'Post Like packages for eligible public Facebook posts.',
      commercialLabel: 'BUY FACEBOOK POST LIKES',
      title: 'Facebook Post Likes Packages',
      intro:
        'Buy Facebook post likes for a public post when you want to increase the number of likes shown on that specific piece of content. Choose a package, provide the public post URL, and complete your order without sharing your Facebook password.',
      points: [
        {
          title: 'For Individual Posts',
          text: 'Choose the public Facebook post where you want the likes added.',
        },
        {
          title: 'Post Level Metric',
          text: 'This service applies to a specific post rather than the overall Facebook Page.',
        },
        {
          title: 'Different from Page Likes',
          text: 'Facebook Page Likes are for the Page itself, while this service is for individual content.',
        },
        {
          title: 'Choose the Right Post',
          text: 'Check the public post before submitting it with your order.',
        },
      ],
      cta: { label: 'View Facebook Post Likes', href: '/buy-facebook-post-likes' },
      image: {
        src: '/assets/images/illustrations/homepage/facebook-post-likes-visual.webp',
        alt: 'Facebook post with Like and reaction indicators',
      },
      tone: 'blue',
    },
  ] as const satisfies readonly HubServiceMini[],
} as const;

export type HomepageHub = typeof homepageHub;
