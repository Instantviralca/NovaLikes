import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';
const HOW_IT_WORKS_ANCHOR = '#how-it-works';

/**
 * Buy Instagram Followers — Document 09.11 production content.
 * Other Instagram services remain factory placeholders until their production docs land.
 */
function buildBuyInstagramFollowersContent(): ServiceContent {
  return {
    slug: 'buy-instagram-followers',
    platformId: 'instagram',
    seo: {
      title: 'Instagram Followers Packages & Pricing | NovaLikes',
      description:
        'Compare Instagram follower packages, pricing, delivery details and available plan sizes. Choose an option that matches your account and growth goals.',
    },
    hero: {
      eyebrow: 'BUY INSTAGRAM FOLLOWERS',
      title: 'Buy Instagram Followers',
      description:
        'Buy Instagram followers for your public profile by choosing the package size that fits your account. NovaLikes offers Instagram follower packages for creators, businesses, brands, and other public accounts. Compare the available quantities and prices, enter your public Instagram username, and complete your order online. No Instagram password is required.',
      purpose: 'Convert visitors comparing Instagram follower packages',
      primaryKeyword: 'instagram followers packages',
      supportingKeywords: [
        'Instagram Followers Pricing',
        'Instagram Followers Plans',
        'Instagram Followers Delivery',
        'Instagram Followers Order',
      ],
      suggestedWordCount: 60,
      primaryCta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Details',
        href: '#how-it-works',
      },
      trustLabels: [
        { id: 'ig-f-trust-password', label: 'No Password Required' },
        { id: 'ig-f-trust-public', label: 'Public Username Only' },
        { id: 'ig-f-trust-checkout', label: 'Secure Checkout' },
        { id: 'ig-f-trust-support', label: 'Customer Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
        alt: 'Instagram profile dashboard showing available follower packages',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Instagram Followers Packages & Pricing',
      description:
        'Choose the number of Instagram followers you want and see the price for each package before ordering. Select a quantity below to review the package details and continue when you find the option that fits your account.',
      purpose: 'Present real NovaLikes.com follower packages',
      primaryKeyword: 'Instagram Followers Pricing',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Continue with This Package',
      emptyMessage: 'Instagram follower packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-followers',
      title: 'Why Do People Buy Instagram Followers?',
      description:
        'People buy Instagram followers for different reasons. Some want a larger follower count on a new profile, while others use follower packages alongside regular posting, campaigns, or brand activity. The service changes the visible follower count on your profile, but it does not guarantee engagement, reach, sales, or organic growth.',
      purpose: 'Explain informed use of Instagram followers packages',
      primaryKeyword: 'instagram followers packages',
      suggestedWordCount: 180,
      items: [
        {
          id: 'ig-f-social-proof',
          title: 'Build an Initial Audience',
          description:
            'Newer profiles may use a follower package to start with a larger visible audience while they continue publishing their own content.',
        },
        {
          id: 'ig-f-launch',
          title: 'Support a Product or Brand Launch',
          description:
            'Creators and businesses may add followers while introducing a new account, product, service, or campaign on Instagram.',
        },
        {
          id: 'ig-f-community',
          title: 'Increase Your Visible Follower Count',
          description:
            'Follower packages increase the number of followers displayed on your profile without changing the likes, views, or comments on individual posts.',
        },
        {
          id: 'ig-f-flexible',
          title: 'Choose a Quantity That Fits Your Profile',
          description:
            'Different package sizes let you choose the number of followers based on your current account size and what you want to order.',
        },
        {
          id: 'ig-f-alongside',
          title: 'Use Followers Alongside Regular Content',
          description:
            'Buying followers can change the visible size of an account, while posts, Reels, Stories, and audience interaction still depend on what you publish and how you manage the profile.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes',
      title: 'Why Order From NovaLikes',
      description:
        'NovaLikes keeps Instagram follower ordering straightforward: public username only, clear package details, secure checkout and available order tracking.',
      purpose: 'Unused on lean authority layout — trust lives in Why Choose section',
      primaryKeyword: 'instagram followers packages',
      suggestedWordCount: 40,
      items: [
        {
          id: 'ig-f-wn-username',
          title: 'Public Username Only',
          description:
            'Orders use your public Instagram username — no password or private account access.',
        },
        {
          id: 'ig-f-wn-checkout',
          title: 'Secure Checkout',
          description: 'Complete payment through a protected checkout process.',
        },
        {
          id: 'ig-f-wn-tracking',
          title: 'Order Tracking',
          description: 'Monitor available delivery updates with your order ID and email.',
        },
        {
          id: 'ig-f-wn-support',
          title: 'Customer Support',
          description: 'Get help with package selection, checkout questions and order updates.',
        },
      ],
    },
    // Retained for factory compatibility; Delivery and Safety uses deliveryAndSafety.
    features: {
      id: 'buy-instagram-followers-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on packages conversion layout',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy Instagram Followers',
      description:
        'Ordering Instagram followers through NovaLikes takes four steps. Choose your package, provide the public username for the Instagram profile, complete checkout, and use your order details to follow its status.',
      purpose: 'Explain ordering process',
      primaryKeyword: 'instagram followers packages',
      suggestedWordCount: 80,
      steps: [
        {
          id: 'ig-f-step-1',
          title: 'Choose Your Follower Package',
          description:
            'Compare the available Instagram follower quantities and prices, then select the package you want for your profile.',
        },
        {
          id: 'ig-f-step-2',
          title: 'Enter Your Instagram Username',
          description:
            'Provide the correct public username for the Instagram account that should receive the followers. You do not need to provide your password.',
        },
        {
          id: 'ig-f-step-3',
          title: 'Complete Your Order',
          description:
            'Review the selected follower quantity and price, then continue through checkout to place your order.',
        },
        {
          id: 'ig-f-step-4',
          title: 'Track Your Order',
          description:
            'After checkout, use the available order tracking option to check the status of your Instagram followers order.',
        },
      ],
      cta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'delivery-and-safety',
      title: 'What Do You Need to Place an Order?',
      description:
        'Ordering Instagram followers only requires a few public details. You do not need to provide your Instagram password, private account access or verification codes.',
      purpose: 'Explain username and order requirements',
      primaryKeyword: 'Instagram Followers Delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'ig-f-req-username',
          title: 'Public Instagram Username',
          description:
            'Provide the public username of the Instagram profile that should receive the selected follower package.',
        },
        {
          id: 'ig-f-req-package',
          title: 'Selected Package',
          description:
            'Choose the follower quantity that best fits your account and current growth objectives.',
        },
        {
          id: 'ig-f-req-public',
          title: 'Public Profile Access',
          description:
            'The selected Instagram profile should remain publicly accessible while your order is being processed.',
        },
        {
          id: 'ig-f-req-email',
          title: 'Email Address',
          description:
            'Use a valid email address so you can receive order confirmations, updates and customer support if needed.',
        },
      ],
    },
    reviews: {
      id: 'ig-followers-reviews',
      title: 'Recent Customer Experiences',
      description:
        'Read feedback from customers who used our Instagram package service and completed their orders through NovaLikes.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-followers-faq',
      title: 'Frequently Asked Questions About Buying Instagram Followers',
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'instagram followers packages',
      faqIds: [
        'faq-ig-followers-password',
        'faq-ig-followers-delivery-speed',
        'faq-ig-followers-gradual-delivery',
        'faq-ig-followers-refill',
        'faq-ig-followers-private',
        'faq-ig-followers-track',
        'faq-ig-followers-business',
        'faq-ig-followers-money-back',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services',
      title: 'Explore Other Instagram Services',
      description:
        'Followers are only one part of an Instagram profile. If you want to work on a specific post, Reel, or video instead, compare the other Instagram services below.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: ['buy-instagram-likes', 'buy-instagram-views', 'buy-instagram-comments'],
    },
    finalCta: {
      id: 'ig-followers-final-cta',
      title: 'Choose Your Instagram Followers Package',
      description:
        'Compare the available follower quantities and prices, choose the package that fits your profile, and place your order with your public Instagram username.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View Instagram Followers Packages',
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
 * Instagram Likes Packages — conversion layout (mirrors Followers packages page).
 */
function buildBuyInstagramLikesContent(): ServiceContent {
  return {
    slug: 'buy-instagram-likes',
    platformId: 'instagram',
    seo: {
      title: 'Buy Instagram Likes | NovaLikes',
      description:
        'Buy Instagram likes through NovaLikes with clear package options, delivery details, secure checkout, order tracking and a public post URL only.',
    },
    hero: {
      eyebrow: 'BUY INSTAGRAM LIKES',
      title: 'Buy Instagram Likes',
      description:
        'Buy Instagram likes for a public post or Reel by choosing the package size that fits what you need. NovaLikes offers several like quantities with clear pricing, so you can compare the available options before ordering. Select your package, provide the public Instagram post or Reel URL, and complete your order online. No Instagram password is required, and you can track your order after checkout.',
      purpose: 'Convert visitors looking to buy Instagram likes',
      primaryKeyword: 'buy instagram likes',
      supportingKeywords: [
        'Buy Instagram Likes',
        'Buy Real Instagram Likes',
        'Instagram Likes',
        'Instagram Likes Pricing',
        'Instagram Likes Delivery',
        'Instagram Likes Order Tracking',
        'Instagram Likes Packages',
      ],
      suggestedWordCount: 70,
      primaryCta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: HOW_IT_WORKS_ANCHOR,
      },
      trustLabels: [
        { id: 'ig-l-trust-public', label: 'Public Post URL Only' },
        { id: 'ig-l-trust-password', label: 'No Password Required' },
        { id: 'ig-l-trust-checkout', label: 'Secure Checkout' },
        { id: 'ig-l-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
        alt: 'Instagram post engagement dashboard showing likes packages and delivery tracking',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Instagram Likes Packages & Pricing',
      description:
        'Choose the number of Instagram likes you want and compare the available package prices before ordering. Select a quantity below to review the package details and continue with the option that fits the post or Reel you want to use.',
      purpose: 'Present real NovaLikes.com likes packages',
      primaryKeyword: 'Instagram Likes Pricing',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Instagram Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-likes',
      title: 'Support the Content You Are Already Publishing',
      description: '',
      purpose: 'Unused on packages conversion layout',
      primaryKeyword: 'buy instagram likes',
      suggestedWordCount: 40,
      items: [],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-likes',
      title: 'Why Order From NovaLikes',
      description: '',
      purpose: 'Unused on packages conversion layout',
      primaryKeyword: 'buy instagram likes',
      suggestedWordCount: 40,
      items: [],
    },
    features: {
      id: 'buy-instagram-likes-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on packages conversion layout',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How Instagram Likes Ordering Works',
      description:
        'Choose a package, enter your public post URL, complete checkout and track available updates.',
      purpose: 'Explain ordering process',
      primaryKeyword: 'buy instagram likes',
      suggestedWordCount: 80,
      steps: [
        {
          id: 'ig-l-step-1',
          title: 'Choose a Package',
          description: 'Compare quantities, prices and package details in the pricing grid.',
        },
        {
          id: 'ig-l-step-2',
          title: 'Enter Public Post URL',
          description: 'Provide the public Instagram post or Reel URL receiving the likes.',
        },
        {
          id: 'ig-l-step-3',
          title: 'Review Your Order',
          description: 'Confirm package, price and delivery details before payment.',
        },
        {
          id: 'ig-l-step-4',
          title: 'Complete Checkout',
          description: 'Finish payment and receive your order confirmation by email.',
        },
        {
          id: 'ig-l-step-5',
          title: 'Track Progress',
          description: 'Use your order ID and email on the Track Order page.',
        },
      ],
      cta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'delivery-and-safety',
      title: 'Instagram Likes Delivery',
      description:
        'Delivery timing depends on the selected package. Gradual delivery applies where stated before checkout.',
      purpose: 'Delivery clarification',
      primaryKeyword: 'Instagram Likes Delivery',
      suggestedWordCount: 60,
      items: [],
    },
    reviews: {
      id: 'ig-likes-reviews',
      title: 'Customer Reviews',
      description: 'Feedback from customers who completed an order on our platform.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-likes-faq',
      title: 'Frequently Asked Questions About Buying Instagram Likes',
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy instagram likes',
      faqIds: [
        'faq-ig-likes-links',
        'faq-ig-likes-reel',
        'faq-ig-likes-password',
        'faq-ig-likes-delivery-speed',
        'faq-ig-likes-track',
        'faq-ig-likes-gradual-delivery',
        'faq-ig-likes-refill',
        'faq-ig-likes-money-back',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services-likes',
      title: 'Explore More Services',
      description: 'Add audience growth, views or comments when your campaign needs more support.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: ['buy-instagram-followers', 'buy-instagram-views', 'buy-instagram-comments'],
      cta: {
        label: 'Explore More Services',
        href: '/buy-instagram-followers',
      },
    },
    finalCta: {
      id: 'ig-likes-final-cta',
      title: 'Choose Your Instagram Likes Package',
      description:
        'Compare the available like quantities and prices, choose the package that fits the post or Reel you want to use, and place your order with the correct public Instagram URL.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View Instagram Likes Packages',
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
 * Buy Instagram Views — Document 09.13 production content.
 */
function buildBuyInstagramViewsContent(): ServiceContent {
  return {
    slug: 'buy-instagram-views',
    platformId: 'instagram',
    seo: {
      title: 'Buy Instagram Views | NovaLikes',
      description:
        'Buy Instagram views worldwide with clear Reel and video package options, delivery estimates, secure checkout, order tracking and no password required.',
    },
    hero: {
      eyebrow: 'BUY INSTAGRAM VIEWS',
      title: 'Buy Instagram Views',
      description:
        'Buy Instagram views for a public Reel or video by choosing the package size that fits the content you want to use. NovaLikes offers several view quantities with clear pricing, so you can compare the available options before ordering. Select your package, provide the public Instagram content URL, and complete your order online. No Instagram password is required, and you can track your order after checkout.',
      purpose: 'Convert for Instagram views packages worldwide',
      primaryKeyword: 'buy Instagram views',
      supportingKeywords: [
        'Instagram views',
        'Buy Instagram video views',
        'Buy Instagram Reel views',
        'Instagram views',
        'Instagram views packages',
        'Instagram video promotion',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: HOW_IT_WORKS_ANCHOR,
      },
      trustLabels: [
        { id: 'ig-v-trust-public', label: 'Public Content URL Only' },
        { id: 'ig-v-trust-password', label: 'No Password Required' },
        { id: 'ig-v-trust-checkout', label: 'Secure Checkout' },
        { id: 'ig-v-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
        alt: 'Instagram views growth service dashboard illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Instagram Views Packages & Pricing',
      description:
        'Choose the number of Instagram views you want and compare the available package prices before ordering. Select a quantity below to review the package details and continue with the option that fits the Reel or video you want to use.',
      purpose: 'Present real NovaLikes.com views packages',
      primaryKeyword: 'Instagram views packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-views',
      title: 'Support the Videos and Reels You Want More People to See',
      description: '',
      purpose: 'Unused on packages ecommerce layout',
      primaryKeyword: 'buy Instagram views',
      suggestedWordCount: 40,
      items: [],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-views',
      title: 'A Clearer Way to Buy Instagram Views',
      description: '',
      purpose: 'Unused on packages ecommerce layout',
      primaryKeyword: 'Instagram video promotion',
      suggestedWordCount: 40,
      items: [],
    },
    features: {
      id: 'buy-instagram-views-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on packages ecommerce layout',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How Ordering Works',
      description: '',
      purpose: 'Unused on packages ecommerce layout',
      primaryKeyword: 'buy Instagram views',
      suggestedWordCount: 40,
      steps: [],
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What We Need to Process Your Order',
      description: '',
      purpose: 'Unused on packages ecommerce layout',
      primaryKeyword: 'Instagram views delivery',
      suggestedWordCount: 40,
      items: [],
    },
    reviews: {
      id: 'ig-views-reviews',
      title: 'Customer Reviews',
      description:
        'See what customers say about package selection, checkout, delivery updates, and support.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-views-faq',
      title: 'Frequently Asked Questions About Buying Instagram Views',
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy Instagram views',
      faqIds: [
        'faq-ig-views-need',
        'faq-ig-views-package',
        'faq-ig-views-password',
        'faq-ig-views-how-long',
        'faq-ig-views-track',
        'faq-ig-views-wrong-url',
        'faq-ig-views-other-metrics',
        'faq-ig-views-public',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services-views',
      title: 'Explore More Services',
      description: 'Add audience growth, reactions or comments when your campaign needs more support.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: ['buy-instagram-followers', 'buy-instagram-likes', 'buy-instagram-comments'],
      cta: {
        label: 'Explore More Services',
        href: '/buy-instagram-followers',
      },
    },
    finalCta: {
      id: 'ig-views-final-cta',
      title: 'Choose Your Instagram Views Package',
      description:
        'Compare the available view quantities and prices, choose the package that fits the Reel or video you want to use, and place your order with the correct public Instagram URL.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View Instagram Views Packages',
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
 * Buy Instagram Comments — Document 09.14 production content.
 */
function buildBuyInstagramCommentsContent(): ServiceContent {
  return {
    slug: 'buy-instagram-comments',
    platformId: 'instagram',
    seo: {
      title: 'Buy Instagram Comments | NovaLikes',
      description:
        'Buy Instagram comments worldwide with clear package options, a public post URL, secure checkout, delivery details and order tracking through NovaLikes.',
    },
    hero: {
      eyebrow: 'BUY INSTAGRAM COMMENTS',
      title: 'Buy Instagram Comments',
      description:
        'Buy Instagram comments for a public post or Reel by choosing the package and quantity that fits the content you want to use. NovaLikes lets you compare available comment options and prices before ordering. Select your package, provide the correct public Instagram post URL, and complete your order online. Your Instagram password is not required, and you can use order tracking after checkout to check available status information.',
      purpose: 'Convert visitors searching for Instagram comments packages',
      primaryKeyword: 'buy Instagram comments',
      supportingKeywords: [
        'Instagram comments packages',
        'Increase Instagram comments',
        'Instagram comment service',
        'More Instagram engagement',
        'Buy Instagram comments',
      ],
      suggestedWordCount: 90,
      primaryCta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: HOW_IT_WORKS_ANCHOR,
      },
      trustLabels: [
        { id: 'ig-c-trust-public-url', label: 'Public Post URL Only' },
        { id: 'ig-c-trust-password', label: 'No Password Required' },
        { id: 'ig-c-trust-checkout', label: 'Secure Checkout' },
        { id: 'ig-c-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
        alt: 'Instagram comments conversation and community engagement dashboard',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Instagram Comments Packages & Pricing',
      description:
        'Compare the available Instagram comments packages, quantities, and prices before ordering. Choose between the available comment options, select the number of comments you want for your post or Reel, and review the package details before adding it to your cart.',
      purpose: 'Present real NovaLikes.com comments packages',
      primaryKeyword: 'Instagram comments packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Instagram Comments packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-comments',
      title: 'Support the Conversation Around Important Content',
      description:
        'Comments create conversations. Active discussion under a post helps new visitors see credibility, not a quiet grid. Visible engagement also makes it easier for more people to join in.\n\nCreators, businesses, and brands use comments packages when a launch, announcement, or educational post needs a stronger first impression—without replacing real replies, captions, or community management.',
      purpose: 'Explain how comments support credibility and conversation',
      primaryKeyword: 'Instagram comments',
      suggestedWordCount: 160,
      items: [
        {
          id: 'ig-c-benefit-conversation',
          title: 'Comments create conversations',
          description:
            'A thread gives people something to read, ask about, and respond to—so the post feels like a discussion, not a monologue.',
        },
        {
          id: 'ig-c-benefit-credibility',
          title: 'Discussions improve credibility',
          description:
            'Prospects skim comments for tone and proof. Clear, on-topic replies signal that the content matters to a real community.',
        },
        {
          id: 'ig-c-benefit-interaction',
          title: 'Engagement invites more interaction',
          description:
            'When a post already shows activity, viewers are more likely to leave their own question, emoji, or opinion.',
        },
        {
          id: 'ig-c-benefit-audiences',
          title: 'Built for creators, businesses, and brands',
          description:
            'Use comments on campaigns, product drops, education posts, and announcements where visible conversation supports trust.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-comments',
      title: 'A Clearer Way to Buy Instagram Comments',
      description:
        'Every package is built for conversation-focused engagement: public posts only, transparent delivery details, and checkout that never asks for your Instagram password.',
      purpose: 'Differentiate comments purchasing experience',
      primaryKeyword: 'Instagram comment service',
      suggestedWordCount: 140,
      items: [
        {
          id: 'ig-c-why-relevant',
          title: 'Relevant Comments',
          description:
            'Choose packages and options that fit the post you are promoting, so discussion stays useful rather than random noise.',
        },
        {
          id: 'ig-c-why-natural',
          title: 'Natural Delivery',
          description:
            'Gradual delivery options help comments arrive at a pace that looks more natural beside normal activity.',
        },
        {
          id: 'ig-c-why-password',
          title: 'No Password Required',
          description:
            'We never request Instagram login access. Orders use public information only.',
        },
        {
          id: 'ig-c-why-public',
          title: 'Public Post Only',
          description:
            'Paste the public URL for the post or Reel that should receive comments. Keep it accessible while delivery runs.',
        },
        {
          id: 'ig-c-why-checkout',
          title: 'Secure Checkout',
          description:
            'Review package details, confirm pricing, and pay through NovaLikes’s secure checkout flow.',
        },
        {
          id: 'ig-c-why-support',
          title: 'Professional Support',
          description:
            'Need help with a package, URL, or order status? Support is available for comments-service questions.',
        },
      ],
      cta: {
        label: 'Choose Instagram Comments Package',
        href: PRICING_ANCHOR,
      },
    },
    features: {
      id: 'buy-instagram-comments-features',
      title: 'Features',
      description: '',
      purpose: 'Unused — delivery requirements live in deliveryAndSafety',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy Instagram Comments',
      description:
        'Five clear steps from package selection to delivery—built for desktop and mobile checkout.',
      purpose: 'Explain the comments ordering process',
      primaryKeyword: 'buy Instagram comments',
      suggestedWordCount: 120,
      steps: [
        {
          id: 'ig-c-step-1',
          title: 'Choose Package',
          description:
            'Compare comment quantities, pricing, and delivery estimates for the post you want more discussion on.',
        },
        {
          id: 'ig-c-step-2',
          title: 'Paste Public Post URL',
          description:
            'Add the public Instagram post or Reel link. No username password or private access is required.',
        },
        {
          id: 'ig-c-step-3',
          title: 'Complete Checkout',
          description:
            'Enter your email, choose a payment method, accept the terms, and place the order securely.',
        },
        {
          id: 'ig-c-step-4',
          title: 'Order Processing',
          description:
            'We verify the public URL and prepare fulfillment based on the package you selected.',
        },
        {
          id: 'ig-c-step-5',
          title: 'Delivery Starts',
          description:
            'Comments begin landing according to the package estimate. Track progress anytime after purchase.',
        },
      ],
      cta: {
        label: 'Choose Packages',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'comment-type-and-link',
      title: 'What We Need to Process Your Order',
      description:
        'Comments orders stay simple: a public Instagram post, the correct URL, a public account, and a valid email for tracking. NovaLikes never asks for your Instagram password.',
      purpose: 'Explain comments order requirements',
      primaryKeyword: 'Instagram comments',
      suggestedWordCount: 100,
      items: [
        {
          id: 'ig-c-req-public-post',
          title: 'Public post',
          description: 'The post or Reel must stay publicly viewable while comments are delivered.',
        },
        {
          id: 'ig-c-req-correct-url',
          title: 'Correct URL',
          description:
            'Paste the exact public link for the content that should receive the conversation.',
        },
        {
          id: 'ig-c-req-public-account',
          title: 'Public account',
          description:
            'Private profiles block delivery. Keep the account public for the duration of the order.',
        },
        {
          id: 'ig-c-req-email',
          title: 'Valid email',
          description:
            'Use a reachable checkout email so you can receive confirmation and track updates.',
        },
      ],
    },
    reviews: {
      id: 'ig-comments-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-comments-faq',
      title: 'Frequently Asked Questions About Buying Instagram Comments',
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy Instagram comments',
      faqIds: [
        'faq-ig-comments-need',
        'faq-ig-comments-package',
        'faq-ig-comments-password',
        'faq-ig-comments-how-long',
        'faq-ig-comments-track',
        'faq-ig-comments-wrong-url',
        'faq-ig-comments-other-metrics',
        'faq-ig-comments-public',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services-comments',
      title: 'Related Instagram services that pair with comments',
      description:
        'Comments start the conversation. Pair likes for first reactions, views for Reel stay-time, or followers when you need a larger audience reading future threads.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: ['buy-instagram-followers', 'buy-instagram-likes', 'buy-instagram-views'],
      cta: {
        label: 'Back to NovaLikes homepage',
        href: '/',
      },
    },
    finalCta: {
      id: 'ig-comments-final-cta',
      title: 'Choose Your Instagram Comments Package',
      description:
        'Compare the available comment options, quantities, and prices, choose the package that fits the post or Reel you want to use, and place your order with the correct public Instagram URL.',
      purpose: 'Drive conversion to comments packages',
      primaryCta: {
        label: 'View Instagram Comments Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
      },
    },
  };
}

/** Instagram service page content — keyed by buy-* slug. */
export const instagramContent: Record<string, ServiceContent> = {
  'buy-instagram-followers': buildBuyInstagramFollowersContent(),
  'buy-instagram-likes': buildBuyInstagramLikesContent(),
  'buy-instagram-views': buildBuyInstagramViewsContent(),
  'buy-instagram-comments': buildBuyInstagramCommentsContent(),
};

export function getInstagramContent(slug: string): ServiceContent | undefined {
  return instagramContent[slug];
}
