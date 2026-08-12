import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';

/**
 * Buy TikTok Followers — Document 09.21 production content.
 * Other TikTok services remain factory placeholders until their production docs land.
 */
function buildBuyTikTokFollowersContent(): ServiceContent {
  return {
    slug: 'buy-tiktok-followers',
    platformId: 'tiktok',
    seo: {
      title: 'Buy TikTok Followers | NovaLikes',
      description:
        'Buy TikTok followers worldwide using real package options from NovaLikes.com, with no password required, clear delivery details, 24/7 support, and eligible refill coverage.',
    },
    hero: {
      eyebrow:
        'TRUSTED TIKTOK FOLLOWER SERVICE FOR CREATORS, BRANDS & BUSINESSES',
      title: 'Buy TikTok Followers',
      description:
        'Buy TikTok followers worldwide with packages for creators, businesses, and brands. Choose a quantity that fits your goals, enter your public TikTok username, and complete checkout when you are ready.',
      purpose: 'Convert for TikTok follower packages worldwide',
      primaryKeyword: 'buy TikTok followers',
      supportingKeywords: [
        'Buy TikTok Followers',
        'Buying TikTok Followers',
        'Buy Followers on TikTok',
        'TikTok follower packages',
        'Buy Real TikTok Followers',
      ],
      suggestedWordCount: 70,
      primaryCta: {
        label: 'Choose TikTok Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#username-and-delivery',
      },
      trustLabels: [
        { id: 'tt-f-trust-2018', label: 'Trusted Since 2018' },
        { id: 'tt-f-trust-password', label: 'No Password Required' },
        { id: 'tt-f-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-f-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/buy-tiktok-followers-hero-v2.webp',
        alt: 'TikTok followers growth service dashboard illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your TikTok Followers Package',
      description:
        'Compare package sizes before you buy followers on TikTok. Start with a smaller test order, choose 500 or 1,000 followers for steady growth, or select larger options such as 10,000 followers for bigger campaigns.',
      purpose: 'Present real NovaLikes.com TikTok follower packages',
      primaryKeyword: 'TikTok follower packages',
      suggestedWordCount: 45,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'TikTok Followers packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-tiktok-followers',
      title: 'Why Do People Buy TikTok Followers?',
      description:
        'People buy TikTok followers to increase the visible follower count on their profile, strengthen first impressions, and support creator or business branding. Follower packages do not guarantee engagement or viral reach. Worldwide, creators and brands often use packages alongside consistent posting to present a more established profile.',
      purpose: 'Explain informed use of TikTok follower packages',
      primaryKeyword: 'buy TikTok followers',
      suggestedWordCount: 90,
      items: [
        {
          id: 'tt-f-social-proof',
          title: 'Stronger First Impressions',
          description:
            'A larger visible audience can make your profile look more established when someone discovers your content.',
        },
        {
          id: 'tt-f-creator-friendly',
          title: 'Creator and Business Branding',
          description:
            'Creators, local businesses, and brands use follower packages to support campaigns while continuing to publish original videos.',
        },
        {
          id: 'tt-f-flexible',
          title: 'Quantity Options That Fit Your Goals',
          description:
            'Choose smaller packages to test the process, or larger sizes when your profile and posting activity are already established.',
        },
        {
          id: 'tt-f-content-first',
          title: 'Works Best With Content',
          description:
            'Buying followers on TikTok supports profile presentation; long-term growth still depends on quality videos and regular posting.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-novalikes-tiktok-followers-legacy',
      title: 'Why NovaLikes?',
      description: '',
      purpose: 'Unused on lean authority layout — trust lives in hero, packages, and FAQ',
      primaryKeyword: 'TikTok growth service',
      suggestedWordCount: 0,
      items: [],
    },
    features: {
      id: 'buy-tiktok-followers-features',
      title: 'Features',
      description: '',
      purpose: 'Unused — requirements handled by What We Need section',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy TikTok Followers',
      description:
        'How to buy TikTok followers is straightforward: choose a package, enter your public TikTok username, review your order, complete checkout, and track delivery. You do not need to share your password to buy followers on TikTok.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'how to buy TikTok followers',
      suggestedWordCount: 60,
      steps: [
        {
          id: 'tt-f-step-1',
          title: 'Choose a Package',
          description: 'Select the follower quantity that matches your profile and goals.',
        },
        {
          id: 'tt-f-step-2',
          title: 'Enter Your Username',
          description: 'Provide the public TikTok username where followers should be delivered.',
        },
        {
          id: 'tt-f-step-3',
          title: 'Review Your Order',
          description: 'Confirm the package size and account details before payment.',
        },
        {
          id: 'tt-f-step-4',
          title: 'Complete Checkout',
          description: 'Finish purchasing through checkout when your order details look correct.',
        },
        {
          id: 'tt-f-step-5',
          title: 'Track Delivery',
          description: 'Monitor progress with your order information until delivery finishes.',
        },
      ],
      cta: {
        label: 'Select a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'username-and-delivery',
      title: 'What We Need From You',
      description:
        'To process a TikTok follower order, we only need your public TikTok username, your selected package, a public profile, and a valid email for confirmation. No password or private login access is required.',
      purpose: 'Explain username and delivery requirements',
      primaryKeyword: 'TikTok followers delivery',
      suggestedWordCount: 55,
      items: [
        {
          id: 'tt-f-req-username',
          title: 'Public TikTok Username',
          description:
            "Enter the exact public username where you'd like your followers delivered.",
        },
        {
          id: 'tt-f-req-package',
          title: 'Selected Package',
          description:
            'Choose the follower package that matches your growth goals before completing checkout.',
        },
        {
          id: 'tt-f-req-public',
          title: 'Public Profile',
          description:
            'Your TikTok profile should remain public until delivery has finished successfully.',
        },
        {
          id: 'tt-f-req-email',
          title: 'Valid Email Address',
          description:
            'Use a valid email address so you can receive your order confirmation and tracking information.',
        },
      ],
    },
    reviews: {
      id: 'tt-followers-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Omitted on lean commercial layout to avoid homepage duplication',
      testimonialIds: [],
    },
    faq: {
      id: 'tt-followers-faq',
      title: 'Frequently Asked Questions About Buying TikTok Followers',
      description:
        'Direct answers to common questions about whether you can buy TikTok followers, how buying followers on TikTok works, and which package size to choose.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy TikTok followers',
      faqIds: [
        'faq-tt-followers-can-buy',
        'faq-tt-followers-how-buy',
        'faq-tt-followers-does-work',
        'faq-tt-followers-are-real',
        'faq-tt-followers-safe',
        'faq-tt-followers-banned',
        'faq-tt-followers-delivery-begin',
        'faq-tt-followers-password',
        'faq-tt-followers-another-order',
        'faq-tt-followers-which-package',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-followers',
      title: 'Explore More TikTok Growth Services',
      description:
        'If you also want more video engagement or reach, compare TikTok Likes and TikTok Views packages alongside followers.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: ['buy-tiktok-likes', 'buy-tiktok-views'],
    },
    finalCta: {
      id: 'tt-followers-final-cta',
      title: 'Choose the TikTok Followers Package That Fits Your Goals',
      description:
        'Compare package sizes, review delivery details, and place your order when you are ready. Pick the quantity that best matches your current growth strategy.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose Your Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}

/**
 * Buy TikTok Likes — Document 09.22 production content.
 */
function buildBuyTikTokLikesContent(): ServiceContent {
  return {
    slug: 'buy-tiktok-likes',
    platformId: 'tiktok',
    seo: {
      title: 'Buy TikTok Likes | NovaLikes',
      description:
        'Buy TikTok likes with real packages for creators and businesses. Public video URL only, secure checkout, gradual delivery options, and order tracking.',
    },
    hero: {
      eyebrow: 'TIKTOK LIKE PACKAGES FOR CREATORS, BRANDS & BUSINESSES',
      title: 'Buy TikTok Likes worldwide',
      description:
        'Buy TikTok likes for public videos with clear package pricing, secure checkout and visible order updates. Choose the quantity that fits your content, paste your public TikTok video link and review the delivery information before completing your order. No password or private account access is required.',
      purpose: 'Convert for TikTok likes packages worldwide',
      primaryKeyword: 'buy TikTok likes',
      supportingKeywords: [
        'Buy TikTok Likes',
        'TikTok Likes Packages',
        'Buy Real TikTok Likes',
        'TikTok Engagement',
      ],
      suggestedWordCount: 90,
      primaryCta: {
        label: 'Choose a Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Details',
        href: '#video-link-and-delivery',
      },
      trustLabels: [
        { id: 'tt-l-trust-url', label: 'Public Video Link Only' },
        { id: 'tt-l-trust-password', label: 'No Password Required' },
        { id: 'tt-l-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-l-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/buy-tiktok-likes-hero-v2.webp',
        alt: 'TikTok video likes engagement dashboard illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your TikTok Likes Package',
      description:
        'Compare available package sizes and select the number of likes that matches your video and campaign goals. Each option displays its price and order details before checkout, allowing you to confirm the quantity and public video link before payment.',
      purpose: 'Present real NovaLikes.com TikTok likes packages',
      primaryKeyword: 'TikTok likes packages',
      suggestedWordCount: 55,
      packageIds: [],
      primaryCtaLabel: 'Continue With This Package',
      emptyMessage: 'TikTok Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-tiktok-likes',
      title: 'Why Do People Buy TikTok Likes?',
      description:
        'People buy TikTok likes to strengthen the visible engagement on a public video, improve its first impression and support creator or business campaigns. Likes can make active content appear more established, but they do not guarantee additional views, followers, sales or algorithmic promotion.',
      purpose: 'Explain informed use of TikTok likes packages',
      primaryKeyword: 'buy TikTok likes',
      suggestedWordCount: 180,
      items: [
        {
          id: 'tt-l-first-impressions',
          title: 'Stronger First Impressions',
          description:
            'A visible reaction count can make a video appear more active when new viewers discover it through a profile, shared link or TikTok feed.',
        },
        {
          id: 'tt-l-campaign-support',
          title: 'Campaign Support',
          description:
            'Creators and businesses may use like packages alongside product launches, promotions and other short-form video campaigns.',
        },
        {
          id: 'tt-l-flexible-quantities',
          title: 'Flexible Quantities',
          description:
            'Smaller options can support individual posts, while larger packages may better suit videos from established and consistently active accounts.',
        },
        {
          id: 'tt-l-alongside-content',
          title: 'Works Alongside Content',
          description:
            'Purchased likes work best as support for original videos, clear captions, consistent posting and ongoing audience engagement.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-tiktok-likes',
      title: 'Why Choose TikTok Likes From NovaLikes?',
      description: '',
      purpose: 'Unused on lean authority layout — trust lives in hero, FAQ, and checklist sections',
      primaryKeyword: 'buy real TikTok likes',
      suggestedWordCount: 0,
      items: [],
    },
    features: {
      id: 'buy-tiktok-likes-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on 09.22 — Video Link and Delivery Requirements is separate',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy TikTok Likes',
      description:
        'To buy TikTok likes, choose a package, paste the public link to the video you want to promote, review the order details and complete secure checkout. No TikTok password is required, and you can follow the available order updates after payment.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'how to buy TikTok likes',
      supportingKeywords: [
        'how to buy likes on TikTok',
        'how do you buy likes on TikTok',
        'how to buy likes on a TikTok video',
        'buying TikTok likes',
      ],
      suggestedWordCount: 90,
      steps: [
        {
          id: 'tt-l-step-1',
          title: 'Choose a Package',
          description:
            'Select the number of likes that best matches the current size, activity and purpose of your video.',
        },
        {
          id: 'tt-l-step-2',
          title: 'Paste Your Public Video Link',
          description:
            'Copy the public TikTok video URL and paste it into the order field so the likes are delivered to the correct post.',
        },
        {
          id: 'tt-l-step-3',
          title: 'Review Your Order',
          description:
            'Confirm the selected quantity, video link, price and any delivery information before continuing.',
        },
        {
          id: 'tt-l-step-4',
          title: 'Complete Secure Checkout',
          description:
            'Finish your order through secure checkout without sharing your TikTok password or private login details.',
        },
        {
          id: 'tt-l-step-5',
          title: 'Track Delivery',
          description:
            'Use your order details to view available status updates as the package moves through processing and delivery.',
        },
      ],
      cta: {
        label: 'Select a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What Do You Need to Place an Order?',
      description:
        'A TikTok likes order only requires a few public details. You do not need to provide your account password, verification code or private profile access.',
      purpose: 'Explain video URL and processing requirements',
      primaryKeyword: 'TikTok likes packages',
      suggestedWordCount: 120,
      items: [
        {
          id: 'tt-l-req-url',
          title: 'Public TikTok Video URL',
          description:
            'Paste the exact public link to the TikTok video that should receive the selected likes.',
        },
        {
          id: 'tt-l-req-package',
          title: 'Selected Package',
          description:
            'Choose the quantity that fits your video, account activity and current campaign.',
        },
        {
          id: 'tt-l-req-public',
          title: 'Public Video Access',
          description:
            'The selected video must remain publicly viewable while the order is being processed.',
        },
        {
          id: 'tt-l-req-email',
          title: 'Valid Email Address',
          description:
            'Use a working email address to receive your order confirmation, tracking details and support updates.',
        },
      ],
    },
    reviews: {
      id: 'tt-likes-reviews',
      title: 'What Customers Say About NovaLikes',
      description:
        'Customer reviews for this NovaLikes service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'tt-likes-faq',
      title: 'Frequently Asked Questions About Buying TikTok Likes',
      description:
        'These are the most common questions customers ask before purchasing TikTok likes.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy TikTok likes',
      faqIds: [
        'faq-tt-likes-can-buy',
        'faq-tt-likes-how-buy',
        'faq-tt-likes-does-help',
        'faq-tt-likes-any-video',
        'faq-tt-likes-password',
        'faq-tt-likes-repeat',
        'faq-tt-likes-instant',
        'faq-tt-likes-safe',
        'faq-tt-likes-where',
        'faq-tt-likes-which-package',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-likes',
      title: 'Related TikTok Services',
      description:
        'Explore additional TikTok services to support different parts of your content strategy.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: ['buy-tiktok-followers', 'buy-tiktok-views'],
    },
    finalCta: {
      id: 'tt-likes-final-cta',
      title: 'Choose the TikTok Likes Package That Fits Your Goals',
      description:
        'Compare available package sizes, review pricing and delivery information, and complete your order using your public TikTok video link. Choose the package that best matches your content and campaign objectives.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose Your Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}

/**
 * Buy TikTok Views — lean authority content (mirrors Likes pattern).
 * Packages resolved from NovaLikes catalog (Buzzoid-synced HQ + Premium tiers).
 */
function buildBuyTikTokViewsContent(): ServiceContent {
  return {
    slug: 'buy-tiktok-views',
    platformId: 'tiktok',
    seo: {
      title: 'Buy TikTok Views | NovaLikes',
      description:
        'Buy TikTok views with clear package pricing for public videos. Public video URL only, secure checkout and order tracking for creators and businesses.',
    },
    hero: {
      eyebrow: 'TIKTOK VIEW PACKAGES FOR CREATORS, BRANDS & BUSINESSES',
      title: 'Buy TikTok Views worldwide',
      description:
        'Buy TikTok views for public videos with clear package pricing, secure checkout and visible order updates. Choose the quantity that fits your campaign, paste the public TikTok video link and review delivery details before completing your order. No password or private account access is required.',
      purpose: 'Convert for TikTok views packages worldwide',
      primaryKeyword: 'buy TikTok views',
      supportingKeywords: [
        'Buy TikTok Views',
        'Buy Views on TikTok',
        'Buy Views for TikTok',
        'TikTok Views Packages',
        'Buying TikTok Views',
      ],
      suggestedWordCount: 90,
      primaryCta: {
        label: 'Choose a Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Details',
        href: '#video-link-and-delivery',
      },
      trustLabels: [
        { id: 'tt-v-trust-url', label: 'Public Video Link Only' },
        { id: 'tt-v-trust-password', label: 'No Password Required' },
        { id: 'tt-v-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-v-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/buy-tiktok-views-hero-v2.webp',
        alt: 'TikTok video views and reach analytics illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your TikTok Views Package',
      description:
        'Compare available package sizes and select the number of views that matches your video, audience and campaign goals. Each option displays its price and order details before checkout so you can confirm the quantity and public video link before payment.',
      purpose: 'Present real NovaLikes.com TikTok views packages',
      primaryKeyword: 'TikTok views packages',
      suggestedWordCount: 55,
      packageIds: [],
      primaryCtaLabel: 'Continue With This Package',
      emptyMessage: 'TikTok Views packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-tiktok-views',
      title: 'Why Do People Buy TikTok Views?',
      description:
        'People buy TikTok views to increase the visible watch count on a public video, strengthen its first impression and support creator or business campaigns. A higher view count can make active content appear more established, but it does not guarantee likes, followers, sales or algorithmic promotion.',
      purpose: 'Explain informed use of TikTok views packages',
      primaryKeyword: 'buy TikTok views',
      suggestedWordCount: 180,
      items: [
        {
          id: 'tt-v-first-impressions',
          title: 'Stronger First Impressions',
          description:
            'A visible watch count can make a video appear more active when viewers discover it through a profile, shared link or TikTok feed.',
        },
        {
          id: 'tt-v-campaign-visibility',
          title: 'Campaign Visibility',
          description:
            'Creators and businesses may use view packages alongside launches, promotions and other short-form video campaigns.',
        },
        {
          id: 'tt-v-flexible-quantities',
          title: 'Flexible Quantities',
          description:
            'Smaller packages can support individual posts, while larger options may better suit established and consistently active accounts.',
        },
        {
          id: 'tt-v-alongside-content',
          title: 'Works Alongside Content',
          description:
            'Purchased views work best when they support original videos, clear hooks, consistent posting and genuine audience interaction.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-tiktok-views',
      title: 'Why Choose TikTok Views From NovaLikes?',
      description: '',
      purpose: 'Unused on lean authority layout — trust lives in hero, FAQ, and checklist sections',
      primaryKeyword: 'buy TikTok views',
      suggestedWordCount: 0,
      items: [],
    },
    features: {
      id: 'buy-tiktok-views-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on lean authority layout — requirements section is separate',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy TikTok Views',
      description:
        'To buy TikTok views, choose a package, paste the public link to the video you want to promote, review the order information and complete secure checkout. No TikTok password is required, and available status updates can be followed after payment.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'how to buy TikTok views',
      supportingKeywords: [
        'how to buy views on TikTok',
        'buy views for TikTok',
        'buying TikTok views',
        'TikTok views buy',
      ],
      suggestedWordCount: 90,
      steps: [
        {
          id: 'tt-v-step-1',
          title: 'Choose a Package',
          description:
            'Select the view quantity that matches the video and campaign goal.',
        },
        {
          id: 'tt-v-step-2',
          title: 'Paste the Public Video Link',
          description:
            'Copy the exact TikTok URL so the views are delivered to the correct post.',
        },
        {
          id: 'tt-v-step-3',
          title: 'Review the Order',
          description:
            'Confirm the quantity, link, price and delivery information.',
        },
        {
          id: 'tt-v-step-4',
          title: 'Complete Secure Checkout',
          description: 'Finish payment without sharing login credentials.',
        },
        {
          id: 'tt-v-step-5',
          title: 'Track Delivery',
          description:
            'Use your order details to check available progress updates.',
        },
      ],
      cta: {
        label: 'Select a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What Do You Need to Place an Order?',
      description:
        'A TikTok views order only requires a few public details. You do not need to provide your password, verification code or private account access.',
      purpose: 'Explain video URL and processing requirements',
      primaryKeyword: 'TikTok views packages',
      suggestedWordCount: 120,
      items: [
        {
          id: 'tt-v-req-url',
          title: 'Public TikTok Video URL',
          description:
            'Paste the exact public link to the video that should receive the selected views.',
        },
        {
          id: 'tt-v-req-package',
          title: 'Selected Package',
          description:
            'Choose the quantity that fits your video, account activity and current campaign.',
        },
        {
          id: 'tt-v-req-public',
          title: 'Public Video Access',
          description:
            'The selected video must remain publicly viewable while the order is being processed.',
        },
        {
          id: 'tt-v-req-email',
          title: 'Valid Email Address',
          description:
            'Use a working email address to receive confirmation, tracking details and support updates.',
        },
      ],
    },
    reviews: {
      id: 'tt-views-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Unused on lean authority layout — no customer reviews section',
      testimonialIds: [],
    },
    faq: {
      id: 'tt-views-faq',
      title: 'Frequently Asked Questions About Buying TikTok Views',
      description:
        'Below are answers to the most common questions customers ask before purchasing TikTok view packages.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy TikTok views',
      faqIds: [
        'faq-tt-views-can-buy',
        'faq-tt-views-how-buy',
        'faq-tt-views-does-work',
        'faq-tt-views-can-people-see',
        'faq-tt-views-are-real',
        'faq-tt-views-worth-it',
        'faq-tt-views-should-buy',
        'faq-tt-views-what-happens',
        'faq-tt-views-password',
        'faq-tt-views-which-package',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-views',
      title: 'Related TikTok Services',
      description:
        'Video views are one part of building a stronger TikTok presence. Explore additional TikTok services to support different growth objectives.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: ['buy-tiktok-followers', 'buy-tiktok-likes'],
    },
    finalCta: {
      id: 'tt-views-final-cta',
      title: 'Choose the TikTok Views Package That Fits Your Goals',
      description:
        'Compare available view packages, review pricing and delivery information, and complete your order using only your public TikTok video link. Select the package that best supports your content strategy and campaign objectives.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose Your Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}


/** TikTok service page content — keyed by buy-* slug. */
export const tiktokContent: Record<string, ServiceContent> = {
  'buy-tiktok-followers': buildBuyTikTokFollowersContent(),
  'buy-tiktok-likes': buildBuyTikTokLikesContent(),
  'buy-tiktok-views': buildBuyTikTokViewsContent(),
};

export function getTikTokContent(slug: string): ServiceContent | undefined {
  return tiktokContent[slug];
}
