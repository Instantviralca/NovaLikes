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
      eyebrow: 'BUY TIKTOK FOLLOWERS',
      title: 'Buy TikTok Followers',
      description:
        'Buy TikTok followers by choosing the package and quantity that fits your account. NovaLikes lets you compare available follower packages and prices before ordering. Select the number of TikTok followers you want, provide the correct public TikTok username, and complete your order online. Your TikTok password is not required, and you can use order tracking after checkout to check available status information.',
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
        label: 'Choose a TikTok Followers Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: '#how-it-works',
      },
      trustLabels: [
        { id: 'tt-f-trust-public', label: 'Public Username Only' },
        { id: 'tt-f-trust-password', label: 'No Password Required' },
        { id: 'tt-f-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-f-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
        alt: 'TikTok followers growth service dashboard illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'TikTok Followers Packages & Pricing',
      description:
        'Compare the available TikTok followers packages, quantities, and prices before ordering. Choose the number of followers you want for your public TikTok profile, review the current package price, and add your selected option to the cart when you are ready.',
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
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy TikTok followers',
      faqIds: [
        'faq-tt-followers-need',
        'faq-tt-followers-package',
        'faq-tt-followers-password',
        'faq-tt-followers-how-long',
        'faq-tt-followers-track',
        'faq-tt-followers-wrong-username',
        'faq-tt-followers-other-metrics',
        'faq-tt-followers-public',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-followers',
      title: 'Explore Other TikTok Services',
      description:
        'Followers are only one TikTok metric. If you want to increase the like count or view count on a specific video instead, compare the other TikTok services below.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: ['buy-tiktok-likes', 'buy-tiktok-views'],
    },
    finalCta: {
      id: 'tt-followers-final-cta',
      title: 'Choose Your TikTok Followers Package',
      description:
        'Compare the available follower quantities and prices, choose the package that fits the TikTok profile you want to use, and place your order with the correct public username.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View TikTok Followers Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
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
      eyebrow: 'BUY TIKTOK LIKES',
      title: 'Buy TikTok Likes',
      description:
        'Buy TikTok likes by choosing the package and quantity that fits your video. NovaLikes lets you compare available TikTok likes packages and prices before ordering. Select the number of likes you want, provide the correct public TikTok video link, and complete your order online. Your TikTok password is not required, and you can use order tracking after checkout to check available status information.',
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
        label: 'Choose a TikTok Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: '#how-it-works',
      },
      trustLabels: [
        { id: 'tt-l-trust-url', label: 'Public Video Link Only' },
        { id: 'tt-l-trust-password', label: 'No Password Required' },
        { id: 'tt-l-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-l-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
        alt: 'TikTok video likes engagement dashboard illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'TikTok Likes Packages & Pricing',
      description:
        'Compare the available TikTok likes packages, quantities, and prices before ordering. Choose the number of likes you want for your public TikTok video, review the current package price, and add your selected option to the cart when you are ready.',
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
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy TikTok likes',
      faqIds: [
        'faq-tt-likes-need',
        'faq-tt-likes-package',
        'faq-tt-likes-password',
        'faq-tt-likes-how-long',
        'faq-tt-likes-track',
        'faq-tt-likes-wrong-url',
        'faq-tt-likes-other-metrics',
        'faq-tt-likes-public',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-likes',
      title: 'Explore Other TikTok Services',
      description:
        'Likes are only one TikTok metric. If you want to increase the follower count on your profile or the view count on a specific video instead, compare the other TikTok services below.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: ['buy-tiktok-followers', 'buy-tiktok-views'],
    },
    finalCta: {
      id: 'tt-likes-final-cta',
      title: 'Choose Your TikTok Likes Package',
      description:
        'Compare the available likes quantities and prices, choose the package that fits the TikTok video you want to use, and place your order with the correct public video link.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View TikTok Likes Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
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
      eyebrow: 'BUY TIKTOK VIEWS',
      title: 'Buy TikTok Views',
      description:
        'Buy TikTok views by choosing the package and quantity that fits your video. NovaLikes lets you compare available TikTok views packages and prices before ordering. Select the number of views you want, provide the correct public TikTok video link, and complete your order online. Your TikTok password is not required, and you can use order tracking after checkout to check available status information.',
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
        label: 'Choose a TikTok Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: '#how-it-works',
      },
      trustLabels: [
        { id: 'tt-v-trust-url', label: 'Public Video Link Only' },
        { id: 'tt-v-trust-password', label: 'No Password Required' },
        { id: 'tt-v-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-v-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
        alt: 'TikTok video views and reach analytics illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'TikTok Views Packages & Pricing',
      description:
        'Compare the available TikTok views packages, quantities, and prices before ordering. Choose the number of views you want for your public TikTok video, review the available package option and current price, and add your selected package to the cart when you are ready.',
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
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy TikTok views',
      faqIds: [
        'faq-tt-views-need',
        'faq-tt-views-package',
        'faq-tt-views-password',
        'faq-tt-views-how-long',
        'faq-tt-views-track',
        'faq-tt-views-wrong-url',
        'faq-tt-views-other-metrics',
        'faq-tt-views-public',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-views',
      title: 'Explore Other TikTok Services',
      description:
        'Views are only one TikTok metric. If you want to increase the follower count on your profile or the like count on a specific video instead, compare the other TikTok services below.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: ['buy-tiktok-followers', 'buy-tiktok-likes'],
    },
    finalCta: {
      id: 'tt-views-final-cta',
      title: 'Choose Your TikTok Views Package',
      description:
        'Compare the available views quantities, package options, and prices, choose the package that fits the TikTok video you want to use, and place your order with the correct public video link.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View TikTok Views Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
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
