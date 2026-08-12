import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';

/**
 * Buy YouTube Subscribers — full authority layout (Sections 1–18).
 */
function buildBuyYouTubeSubscribersContent(): ServiceContent {
  return {
    slug: 'buy-youtube-subscribers',
    platformId: 'youtube',
    seo: {
      title: 'Buy YouTube Subscribers | NovaLikes',
      description:
        'Buy YouTube subscribers worldwide using your public channel URL. Compare transparent packages, complete secure checkout with no password required, and monitor available order updates.',
    },
    hero: {
      eyebrow: 'YOUTUBE SUBSCRIBER PACKAGES FOR CREATORS, BRANDS & BUSINESSES',
      title: 'Buy YouTube Subscribers',
      description:
        'Grow your YouTube channel with subscriber packages designed for creators, brands and businesses worldwide. Compare transparent package options, choose the quantity that matches your channel goals and place your order using only your public YouTube channel URL. No password is required, secure checkout is included and you can monitor available order updates after confirmation.',
      purpose: 'Convert for YouTube subscriber packages worldwide',
      primaryKeyword: 'buy YouTube subscribers',
      supportingKeywords: [
        'Buy YouTube Subscribers',
        'YouTube Subscribers Packages',
        'Real YouTube Subscribers',
        'Increase YouTube Subscribers',
        'YouTube Growth',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose Subscribers Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#channel-link-and-delivery',
      },
      trustLabels: [
        { id: 'yt-s-trust-url', label: 'Public Channel URL Only' },
        { id: 'yt-s-trust-password', label: 'No Password Required' },
        { id: 'yt-s-trust-checkout', label: 'Secure Checkout' },
        { id: 'yt-s-trust-track', label: 'Order Tracking' },
        { id: 'yt-s-trust-ca', label: 'Customer Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/buy-youtube-subscribers-hero-v2.webp',
        alt: 'YouTube Creator Studio subscribers growth dashboard illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your YouTube Subscribers Package',
      description:
        "Whether you're launching a new YouTube channel or growing an established audience, compare subscriber packages and select the quantity that best matches your publishing strategy and channel goals. Every package includes secure checkout, transparent ordering and available delivery tracking.",
      purpose: 'Present real NovaLikes.com YouTube subscribers packages',
      primaryKeyword: 'YouTube subscribers packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Continue With This Package',
      emptyMessage: 'YouTube Subscribers packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-youtube-subscribers',
      title: 'Why Do People Buy YouTube Subscribers?',
      description:
        'People buy YouTube subscribers to grow the visible audience of a YouTube channel, strengthen first impressions for new visitors and support long-term channel growth. A higher subscriber count can reinforce audience confidence, but it does not guarantee additional video views, watch time or YouTube recommendations.',
      purpose: 'Explain informed use of YouTube subscribers packages',
      primaryKeyword: 'buy YouTube subscribers',
      suggestedWordCount: 180,
      items: [
        {
          id: 'yt-s-build-credibility',
          title: 'Build Channel Credibility',
          description:
            'A larger subscriber count can create a stronger first impression for viewers discovering your YouTube channel.',
        },
        {
          id: 'yt-s-support-new',
          title: 'Support New Channels',
          description:
            'Creators launching new channels often use subscriber packages alongside regular publishing and audience-building strategies.',
        },
        {
          id: 'yt-s-brand-presence',
          title: 'Strengthen Brand Presence',
          description:
            'Businesses and personal brands may use subscriber packages to present a more established YouTube presence while continuing to publish valuable content.',
        },
        {
          id: 'yt-s-flexible-packages',
          title: 'Flexible Package Sizes',
          description:
            'Choose a package that reflects your current audience size and channel objectives instead of automatically selecting the largest quantity.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-youtube-subscribers',
      title: 'Why Choose NovaLikes for YouTube Subscribers?',
      description:
        'NovaLikes provides a straightforward ordering experience with transparent subscriber packages, secure checkout and support throughout your purchase.',
      purpose: 'Reserved for future authority batch (rendered via page-config)',
      primaryKeyword: 'YouTube growth service',
      suggestedWordCount: 150,
      items: [],
    },
    features: {
      id: 'youtube-subscriber-delivery',
      title: 'YouTube Subscriber Delivery',
      description:
        'Delivery begins after the order has been confirmed and follows the timing displayed for the selected package.',
      purpose: 'Reserved for future authority batch',
      primaryKeyword: 'YouTube subscriber delivery',
      suggestedWordCount: 120,
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy YouTube Subscribers',
      description:
        'Buying YouTube subscribers is a straightforward process. Choose the subscriber package that fits your channel goals, enter your public YouTube channel URL, review your order details and complete secure checkout. You never need to provide your YouTube password, and available delivery updates can be tracked after your order is confirmed.',
      purpose: 'Explain the five-step YouTube subscribers ordering process',
      primaryKeyword: 'how to buy YouTube subscribers',
      supportingKeywords: [
        'Buy YouTube Subscribers',
        'Buy Subscribers for YouTube',
        'Buy YouTube Channel Subscribers',
      ],
      suggestedWordCount: 140,
      steps: [
        {
          id: 'yt-s-step-1',
          title: 'Choose a Subscriber Package',
          description:
            'Compare available subscriber packages and select the quantity that best matches your current audience, publishing schedule and channel growth objectives.',
        },
        {
          id: 'yt-s-step-2',
          title: 'Enter Your Public YouTube Channel URL',
          description:
            'Copy the public URL of your YouTube channel and paste it into the order form. This allows the selected subscriber package to be assigned to the correct channel.',
        },
        {
          id: 'yt-s-step-3',
          title: 'Review Your Order',
          description:
            'Confirm your selected package, channel URL and pricing before proceeding to secure checkout.',
        },
        {
          id: 'yt-s-step-4',
          title: 'Complete Secure Checkout',
          description:
            'Finish your purchase through secure checkout without providing your YouTube login credentials or account password.',
        },
        {
          id: 'yt-s-step-5',
          title: 'Track Your Order',
          description:
            'Monitor available delivery updates after confirmation and follow the progress of your subscriber package until completion.',
        },
      ],
      cta: {
        label: 'Choose Your Subscriber Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'channel-link-and-delivery',
      title: 'What Do You Need to Place an Order?',
      description:
        'Ordering YouTube subscribers only requires a few public details. Private account information, passwords and verification codes are never requested during checkout.',
      purpose: 'Explain channel URL and order requirements',
      primaryKeyword: 'YouTube subscribers packages',
      suggestedWordCount: 140,
      items: [
        {
          id: 'yt-s-req-url',
          title: 'Public YouTube Channel URL',
          description:
            'Provide the public URL of the YouTube channel receiving the selected subscriber package.',
        },
        {
          id: 'yt-s-req-package',
          title: 'Selected Package',
          description:
            'Choose the subscriber quantity that best fits your current audience and channel objectives.',
        },
        {
          id: 'yt-s-req-public',
          title: 'Public Channel Access',
          description:
            'Keep your YouTube channel publicly accessible while your subscriber order is being processed.',
        },
        {
          id: 'yt-s-req-email',
          title: 'Valid Email Address',
          description:
            'Use a working email address to receive order confirmations, delivery updates and customer support when required.',
        },
      ],
    },
    reviews: {
      id: 'yt-subscribers-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Unused on lean authority view — reserved for a future batch',
      testimonialIds: [],
    },
    faq: {
      id: 'yt-subscribers-faq',
      title: 'Frequently Asked Questions About Buying YouTube Subscribers',
      description:
        'Answers to common questions about buying YouTube subscribers, channel requirements, packages, delivery and tracking.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy YouTube subscribers',
      faqIds: [
        'faq-yt-subscribers-can-you-buy',
        'faq-yt-subscribers-password',
        'faq-yt-subscribers-does-help',
        'faq-yt-subscribers-new-channel',
        'faq-yt-subscribers-existing-channel',
        'faq-yt-subscribers-how-many',
        'faq-yt-subscribers-increase-views',
        'faq-yt-subscribers-vs-views',
        'faq-yt-subscribers-another-order',
        'faq-yt-subscribers-track',
        'faq-yt-subscribers-what-required',
        'faq-yt-subscribers-choose-package',
      ],
    },
    relatedServices: {
      id: 'related-youtube-services-subscribers',
      title: 'Explore More YouTube Growth Services',
      description:
        'Support the visibility of individual videos with YouTube View packages alongside subscriber growth.',
      purpose: 'Internal links to sibling YouTube offers (no skipped services)',
      serviceSlugs: ['buy-youtube-views'],
    },
    finalCta: {
      id: 'yt-subscribers-final-cta',
      title: 'Choose the YouTube Subscriber Package That Fits Your Channel',
      description:
        'Compare available YouTube Subscriber packages, review delivery information and complete your purchase using only your public YouTube channel URL. Choose the package that best supports your channel goals and long-term publishing strategy.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose Your Package',
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
 * Buy YouTube Views — full authority layout (Sections 1–18).
 * Rebuild follows YouTube Subscribers winning architecture; video-views intent only.
 */
function buildBuyYouTubeViewsContent(): ServiceContent {
  return {
    slug: 'buy-youtube-views',
    platformId: 'youtube',
    seo: {
      title: 'Buy YouTube Views | NovaLikes',
      description:
        'Buy YouTube views worldwide using your public video URL. Compare transparent packages, complete secure checkout with no password required, and monitor available order updates.',
    },
    hero: {
      eyebrow: 'YOUTUBE VIDEO VIEW PACKAGES FOR CREATORS, BRANDS & BUSINESSES',
      title: 'Buy YouTube Views',
      description:
        'Increase the visibility of your YouTube videos with view packages designed for creators, businesses and brands worldwide. Compare transparent package options, choose the quantity that matches your promotion plan and place your order using only your public YouTube video URL. No password is required, secure checkout is included and you can monitor available order updates after confirmation.',
      purpose: 'Convert for YouTube views packages worldwide',
      primaryKeyword: 'buy YouTube views',
      supportingKeywords: [
        'Buy YouTube Views',
        'Buy YouTube Video Views',
        'Buy Views for YouTube',
        'Buy Real YouTube Views',
        'Buy YouTube Views Online',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#video-link-and-delivery',
      },
      trustLabels: [
        { id: 'yt-v-trust-url', label: 'Public Video URL Only' },
        { id: 'yt-v-trust-password', label: 'No Password Required' },
        { id: 'yt-v-trust-checkout', label: 'Secure Checkout' },
        { id: 'yt-v-trust-track', label: 'Order Tracking' },
        { id: 'yt-v-trust-ca', label: 'Customer Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/buy-youtube-views-hero-v2.webp',
        alt: 'YouTube Studio video analytics dashboard with views, CTR and traffic sources',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your YouTube Views Package',
      description:
        "Whether you're promoting a newly published video or increasing content visibility for existing uploads, compare available view packages and choose the quantity that best supports your promotional objectives. Every package includes secure checkout, transparent ordering and available delivery tracking.",
      purpose: 'Present real NovaLikes.com YouTube views packages',
      primaryKeyword: 'YouTube views packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Continue With This Package',
      emptyMessage: 'YouTube Views packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-youtube-views',
      title: 'Why Do People Buy YouTube Views?',
      description:
        'People buy YouTube views to increase the public view count on individual videos, strengthen social proof and encourage more people to watch their content. Higher view counts can improve first impressions for new viewers, but they do not guarantee higher audience retention, watch time, subscriber growth or YouTube recommendations.',
      purpose: 'Explain informed use of YouTube views packages',
      primaryKeyword: 'buy YouTube views',
      suggestedWordCount: 180,
      items: [
        {
          id: 'yt-v-increase-visibility',
          title: 'Increase Video Visibility',
          description:
            'Stronger viewing activity can help videos appear more active when new viewers discover your content.',
        },
        {
          id: 'yt-v-social-proof',
          title: 'Strengthen Social Proof',
          description:
            'Clear audience reach signals can encourage additional viewers to press play and explore your content.',
        },
        {
          id: 'yt-v-support-launches',
          title: 'Support New Video Launches',
          description:
            'Creators often use view packages alongside regular publishing and promotional strategies for newly released videos.',
        },
        {
          id: 'yt-v-flexible-packages',
          title: 'Flexible Package Sizes',
          description:
            'Choose a package that matches your current video goals instead of automatically selecting the highest quantity.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-youtube-views',
      title: 'Why Choose NovaLikes for YouTube Views?',
      description:
        'NovaLikes provides transparent YouTube View packages with secure checkout, straightforward ordering and customer support throughout your purchase.',
      purpose: 'Reserved for authority page-config (Why Choose)',
      primaryKeyword: 'YouTube promotion service',
      suggestedWordCount: 150,
      items: [],
    },
    features: {
      id: 'youtube-views-delivery',
      title: 'YouTube Views Delivery',
      description:
        'Delivery begins after your order has been reviewed and confirmed. Processing time varies depending on the selected package and current demand.',
      purpose: 'Reserved for future authority batch',
      primaryKeyword: 'YouTube views delivery',
      suggestedWordCount: 120,
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy YouTube Views',
      description:
        'Buying YouTube views is a straightforward process. Choose the view package that fits your campaign, enter the public URL of the YouTube video you want to promote, review your order details and complete secure checkout. You never need to provide your YouTube password, and available delivery updates can be tracked after confirmation.',
      purpose: 'Explain the five-step YouTube views ordering process',
      primaryKeyword: 'how to buy YouTube views',
      supportingKeywords: [
        'Buy YouTube Views',
        'Buy YouTube Video Views',
        'Buy Views for YouTube',
      ],
      suggestedWordCount: 140,
      steps: [
        {
          id: 'yt-v-step-1',
          title: 'Choose a Views Package',
          description:
            'Compare the available YouTube View packages and select the quantity that best matches your video, campaign objectives and current audience size.',
        },
        {
          id: 'yt-v-step-2',
          title: 'Enter Your Public YouTube Video URL',
          description:
            'Copy the public URL of the YouTube video receiving the selected View package and paste it into the order form.',
        },
        {
          id: 'yt-v-step-3',
          title: 'Review Your Order',
          description:
            'Confirm the selected package, video URL and pricing before proceeding to checkout.',
        },
        {
          id: 'yt-v-step-4',
          title: 'Complete Secure Checkout',
          description:
            'Finish your purchase through secure checkout without sharing your YouTube password, login credentials or verification codes.',
        },
        {
          id: 'yt-v-step-5',
          title: 'Track Your Order',
          description:
            'Monitor available delivery updates after confirmation and follow the progress of your YouTube View package until completion.',
        },
      ],
      cta: {
        label: 'Choose Your Views Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What Do You Need to Place an Order?',
      description:
        'Ordering YouTube Views only requires a few public details. Private account information, passwords and verification codes are never requested during checkout.',
      purpose: 'Explain video URL and order requirements',
      primaryKeyword: 'YouTube View Packages',
      suggestedWordCount: 140,
      items: [
        {
          id: 'yt-v-req-url',
          title: 'Public YouTube Video URL',
          description:
            'Provide the public URL of the YouTube video receiving the selected View package.',
        },
        {
          id: 'yt-v-req-package',
          title: 'Selected Views Package',
          description:
            'Choose the view quantity that best fits your promotional objectives and existing video performance.',
        },
        {
          id: 'yt-v-req-public',
          title: 'Public Video Access',
          description:
            'Keep the selected YouTube video publicly accessible while your order is being processed.',
        },
        {
          id: 'yt-v-req-email',
          title: 'Valid Email Address',
          description:
            'Use a working email address to receive order confirmation, delivery updates and customer support when required.',
        },
      ],
    },
    reviews: {
      id: 'yt-views-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Unused on lean authority view — reserved for a future batch',
      testimonialIds: [],
    },
    faq: {
      id: 'yt-views-faq',
      title: 'Frequently Asked Questions About Buying YouTube Views',
      description:
        'Answers to common questions about buying YouTube views, video requirements, packages, delivery and tracking.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy YouTube views',
      faqIds: [
        'faq-yt-views-can-you-buy',
        'faq-yt-views-password',
        'faq-yt-views-does-help',
        'faq-yt-views-existing-video',
        'faq-yt-views-multiple-videos',
        'faq-yt-views-how-many',
        'faq-yt-views-increase-subscribers',
        'faq-yt-views-vs-watch-time',
        'faq-yt-views-another-order',
        'faq-yt-views-track',
        'faq-yt-views-what-required',
      ],
    },
    relatedServices: {
      id: 'related-youtube-services-views',
      title: 'Explore More YouTube Growth Services',
      description:
        'Build a stronger channel audience alongside your video promotion strategy with YouTube subscriber packages.',
      purpose: 'Internal links to sibling YouTube offers (authority Explore More uses page-config)',
      serviceSlugs: ['buy-youtube-subscribers'],
    },
    finalCta: {
      id: 'yt-views-final-cta',
      title: 'Choose the YouTube Views Package That Fits Your Campaign',
      description:
        'Compare available YouTube View packages, review delivery information and complete your purchase using only your public YouTube video URL. Choose the package that best supports your growth strategy, video promotion plan and long-term content growth.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose Your Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
      },
    },
  };
}

/** YouTube service page content — keyed by buy-* slug. */
export const youtubeContent: Record<string, ServiceContent> = {
  'buy-youtube-subscribers': buildBuyYouTubeSubscribersContent(),
  'buy-youtube-views': buildBuyYouTubeViewsContent(),
};

export function getYouTubeContent(slug: string): ServiceContent | undefined {
  return youtubeContent[slug];
}
