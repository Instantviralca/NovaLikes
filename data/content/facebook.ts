import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';
const HOW_IT_WORKS_ANCHOR = '#how-it-works';

/**
 * Buy Facebook Followers — Document 09.31 production content.
 * Other Facebook services remain factory placeholders until their production docs land.
 */
function buildBuyFacebookFollowersContent(): ServiceContent {
  return {
    slug: 'buy-facebook-followers',
    platformId: 'facebook',
    seo: {
      title: 'Buy Facebook Followers | Packages & Pricing',
      description:
        'Buy Facebook Followers with clear package options, public page URL checkout, gradual delivery details and order tracking. No password required.',
    },
    hero: {
      eyebrow: 'BUY FACEBOOK FOLLOWERS',
      title: 'Buy Facebook Followers',
      description:
        'Buy Facebook followers by choosing the package and quantity that fits your page. NovaLikes lets you compare available Facebook follower packages and prices before ordering. Select the number of followers you want, provide the correct public Facebook Page URL, and complete your order online. Your Facebook password is not required, and you can use order tracking after checkout to check available status information.',
      purpose: 'Convert for Facebook follower packages worldwide',
      primaryKeyword: 'buy Facebook followers',
      supportingKeywords: [
        'Buy Facebook Followers',
        'Buy Followers On Facebook',
        'Buying Facebook Followers',
        'Facebook Followers Buy',
        'Buy Facebook Page Followers',
        'Buy Facebook Business Page Followers',
      ],
      suggestedWordCount: 110,
      primaryCta: {
        label: 'Choose a Facebook Followers Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: HOW_IT_WORKS_ANCHOR,
      },
      trustLabels: [
        { id: 'fb-f-trust-url', label: 'Public Facebook Page URL Only' },
        { id: 'fb-f-trust-password', label: 'No Password Required' },
        { id: 'fb-f-trust-checkout', label: 'Secure Checkout' },
        { id: 'fb-f-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
        alt: 'Facebook Business Page followers and Meta Business Suite dashboard illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Facebook Followers Packages & Pricing',
      description:
        'Compare the available Facebook follower packages, quantities, and prices before ordering. Choose the number of followers you want for your public Facebook Page, review the current package price, and add your selected package to the cart when you are ready.',
      purpose: 'Present real NovaLikes.com Facebook followers packages',
      primaryKeyword: 'Facebook follower packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Continue With This Package',
      emptyMessage: 'Facebook Followers packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-facebook-followers',
      title: 'Why Do People Buy Facebook Followers?',
      description:
        'People buy Facebook followers to strengthen the visible audience on their Facebook page, improve credibility for new visitors and support long-term community building. A larger follower count can make a page appear more established, but it does not guarantee engagement, sales or organic reach.',
      purpose: 'Explain informed use of Facebook followers packages',
      primaryKeyword: 'buy Facebook followers',
      supportingKeywords: [
        'buy followers on Facebook',
        'buying Facebook followers',
        'Facebook followers buy',
      ],
      suggestedWordCount: 180,
      items: [
        {
          id: 'fb-f-community',
          title: 'Build Community',
          description:
            'A larger follower base can make your Facebook page look more established while encouraging new visitors to explore your content, products or services.',
        },
        {
          id: 'fb-f-first-impression',
          title: 'Stronger First Impression',
          description:
            'When people discover a Facebook page, one of the first things they notice is the size of its audience. A healthy follower count can help build confidence in your brand.',
        },
        {
          id: 'fb-f-business-pages',
          title: 'Support Business Pages',
          description:
            'Businesses often use follower packages alongside regular posting, advertising and customer engagement to strengthen their online presence.',
        },
        {
          id: 'fb-f-flexible',
          title: 'Flexible Package Sizes',
          description:
            'Choose a package that matches your existing page size and current marketing goals instead of selecting more followers than your page naturally supports.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-facebook-followers',
      title: 'Why Choose Facebook Followers From NovaLikes?',
      description: '',
      purpose: 'Unused on lean authority layout — trust lives in hero and Can You Buy',
      primaryKeyword: 'buy Facebook followers',
      suggestedWordCount: 0,
      items: [],
    },
    features: {
      id: 'facebook-followers-delivery',
      title: 'Facebook Followers Delivery',
      description:
        'Delivery begins after your order has been reviewed and confirmed. Processing time depends on the selected package and current demand. You can review available progress updates through the order tracking page until delivery is complete.',
      purpose: 'Explain Facebook followers delivery stages',
      primaryKeyword: 'Facebook followers delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-f-del-review',
          title: 'Order Review',
          description: 'Your page URL and selected package are verified.',
        },
        {
          id: 'fb-f-del-begins',
          title: 'Delivery Begins',
          description: 'Followers begin according to the delivery estimate.',
        },
        {
          id: 'fb-f-del-progress',
          title: 'Followers Increasing',
          description: 'Review your order status through the tracking page.',
        },
        {
          id: 'fb-f-del-complete',
          title: 'Order Complete',
          description: 'The selected follower package has been delivered.',
        },
      ],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy Facebook Followers',
      description:
        "Buying Facebook followers is a simple process. Choose a follower package, enter your public Facebook Page URL, review the order details and complete secure checkout. You don't need to provide your Facebook password, and you can follow your order status after purchase.",
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'how to buy Facebook followers',
      supportingKeywords: [
        'buy followers on Facebook',
        'buying Facebook followers',
        'can you buy followers on Facebook',
      ],
      suggestedWordCount: 140,
      steps: [
        {
          id: 'fb-f-step-1',
          title: 'Choose a Followers Package',
          description:
            'Compare available package sizes and select the quantity that best fits your Facebook page, audience size and growth objectives.',
        },
        {
          id: 'fb-f-step-2',
          title: 'Enter Your Public Facebook Page URL',
          description:
            'Copy the public link to your Facebook page and paste it into the order form so the followers are assigned to the correct page.',
        },
        {
          id: 'fb-f-step-3',
          title: 'Review Your Order',
          description:
            'Confirm your selected package, page URL, pricing and delivery information before completing payment.',
        },
        {
          id: 'fb-f-step-4',
          title: 'Complete Secure Checkout',
          description:
            'Finish your purchase through secure checkout without sharing your Facebook login credentials.',
        },
        {
          id: 'fb-f-step-5',
          title: 'Track Your Order',
          description:
            'After checkout, follow the available order updates so you can monitor the progress of your purchase.',
        },
      ],
      cta: {
        label: 'Select Your Followers Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'page-link-and-delivery',
      title: 'What Do You Need to Place an Order?',
      description:
        'Ordering Facebook followers only requires a few public details. You do not need to provide your Facebook password, private account access or verification codes.',
      purpose: 'Explain page URL and order requirements',
      primaryKeyword: 'Facebook followers packages',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-f-req-url',
          title: 'Public Facebook Page URL',
          description:
            'Provide the public URL of the Facebook page that should receive the selected follower package.',
        },
        {
          id: 'fb-f-req-package',
          title: 'Selected Package',
          description:
            'Choose the follower quantity that best fits your page and current marketing objectives.',
        },
        {
          id: 'fb-f-req-public',
          title: 'Public Page Access',
          description:
            'The selected Facebook page should remain publicly accessible while your order is being processed.',
        },
        {
          id: 'fb-f-req-email',
          title: 'Email Address',
          description:
            'Use a valid email address so you can receive order confirmations, updates and customer support if needed.',
        },
      ],
    },
    reviews: {
      id: 'fb-followers-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Unused on lean authority layout — no customer reviews section',
      testimonialIds: [],
    },
    faq: {
      id: 'fb-followers-faq',
      title: 'Frequently Asked Questions About Buying Facebook Followers',
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy Facebook followers',
      faqIds: [
        'faq-fb-followers-need',
        'faq-fb-followers-package',
        'faq-fb-followers-password',
        'faq-fb-followers-how-long',
        'faq-fb-followers-track',
        'faq-fb-followers-wrong-url',
        'faq-fb-followers-other-metrics',
        'faq-fb-followers-public',
      ],
    },
    relatedServices: {
      id: 'related-facebook-services-followers',
      title: 'Explore More Facebook Growth Services',
      description:
        'Growing a Facebook presence often involves more than one service. Explore our Facebook solutions designed to support different marketing objectives.',
      purpose: 'Internal links to sibling Facebook offers (no skipped services)',
      serviceSlugs: ['buy-facebook-page-likes', 'buy-facebook-post-likes'],
    },
    finalCta: {
      id: 'fb-followers-final-cta',
      title: 'Choose Your Facebook Followers Package',
      description:
        'Compare the available follower quantities and prices, choose the package that fits the Facebook Page you want to use, and place your order with the correct public Facebook Page URL.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View Facebook Followers Packages',
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
 * Buy Facebook Page Likes — lean authority content (Sections 1–5 live).
 */
function buildBuyFacebookPageLikesContent(): ServiceContent {
  return {
    slug: 'buy-facebook-page-likes',
    platformId: 'facebook',
    seo: {
      title: 'Buy Facebook Page Likes | NovaLikes',
      description:
        'Buy Facebook Page Likes with transparent packages for businesses and creators. Public Page URL only, secure checkout and order tracking. No password required.',
    },
    hero: {
      eyebrow: 'BUY FACEBOOK PAGE LIKES',
      title: 'Buy Facebook Page Likes',
      description:
        'Buy Facebook Page Likes by choosing the package and quantity that fits your Page. NovaLikes lets you compare available Page Like packages and prices before ordering. Select the number of Page Likes you want, provide the correct public Facebook Page URL, and complete your order online. Your Facebook password is not required, and you can use order tracking after checkout to check available status information.',
      purpose: 'Convert for Facebook page likes packages worldwide',
      primaryKeyword: 'buy Facebook page likes',
      supportingKeywords: [
        'Buy Facebook Page Likes',
        'Buy Facebook Business Page Likes',
        'Buy Likes for Facebook Page',
        'Facebook Page Likes Buy',
        'Can You Buy Facebook Page Likes',
      ],
      suggestedWordCount: 110,
      primaryCta: {
        label: 'Choose a Facebook Page Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: HOW_IT_WORKS_ANCHOR,
      },
      trustLabels: [
        { id: 'fb-pl-trust-url', label: 'Public Facebook Page URL Only' },
        { id: 'fb-pl-trust-password', label: 'No Password Required' },
        { id: 'fb-pl-trust-checkout', label: 'Secure Checkout' },
        { id: 'fb-pl-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
        alt: 'Facebook Business Page likes and Meta Business Suite analytics illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Facebook Page Likes Packages & Pricing',
      description:
        'Compare the available Facebook Page Like packages, quantities, and prices before ordering. Choose the number of Page Likes you want for your public Facebook Page, review the current package price, and add your selected package to the cart when you are ready.',
      purpose: 'Present real NovaLikes.com Facebook page likes packages',
      primaryKeyword: 'Facebook page likes packages',
      suggestedWordCount: 45,
      packageIds: [],
      primaryCtaLabel: 'Continue With Package',
      emptyMessage: 'Facebook Page Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-facebook-page-likes',
      title: 'Why Do People Buy Facebook Page Likes?',
      description:
        'People buy Facebook Page Likes for different marketing motivations — from launching a new business page to supporting brand campaigns. The common goal is stronger visible social proof when visitors first discover the page.',
      purpose: 'Explain motivations for buying Facebook page likes',
      primaryKeyword: 'buy Facebook page likes',
      supportingKeywords: [
        'buy likes for Facebook page',
        'buy Facebook business page likes',
        'Facebook page likes buy',
      ],
      suggestedWordCount: 180,
      items: [
        {
          id: 'fb-pl-new-business',
          title: 'Launch a New Business Page',
          description:
            'New restaurants, agencies, retail stores and service businesses often want their Facebook page to look more established from day one.',
        },
        {
          id: 'fb-pl-launch',
          title: 'Support a Product or Brand Launch',
          description:
            'Teams running launches and awareness campaigns use Page Like packages to strengthen the page that promotes the offer.',
        },
        {
          id: 'fb-pl-brand-image',
          title: 'Strengthen Brand Image',
          description:
            'Brands buy Page Likes when they want the public Page Like count to better match how established their business already feels offline.',
        },
        {
          id: 'fb-pl-social-proof',
          title: 'Add Visible Social Proof',
          description:
            'Creators and organizations use Page Likes as one more public signal that visitors may notice before reading posts or contacting the page.',
        },
        {
          id: 'fb-pl-campaigns',
          title: 'Support Marketing Campaigns',
          description:
            'Page Like packages are often ordered alongside Facebook ads, content calendars and community engagement rather than as a standalone growth plan.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-facebook-page-likes',
      title: 'Why Choose NovaLikes for Facebook Page Likes?',
      description: '',
      purpose: 'Unused on lean authority layout — trust lives in Why Choose section',
      primaryKeyword: 'buy Facebook page likes',
      suggestedWordCount: 0,
      items: [],
    },
    features: {
      id: 'facebook-page-likes-delivery',
      title: 'Features',
      description: '',
      purpose: 'Unused on lean authority layout',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy Facebook Page Likes',
      description:
        'Buying Facebook Page Likes is a straightforward process. Select the Page Like package that matches your goals, enter your public Facebook Page URL, review your order details and complete secure checkout. You never need to provide your Facebook password, and you can follow available order updates after your purchase.',
      purpose: 'Explain the five-step Facebook Page Likes ordering process',
      primaryKeyword: 'how to buy Facebook page likes',
      supportingKeywords: [
        'Buy Page Likes on Facebook',
        'Buying Page Likes on Facebook',
        'Buy Facebook Business Page Likes',
      ],
      suggestedWordCount: 140,
      steps: [
        {
          id: 'fb-pl-step-1',
          title: 'Choose a Page Likes Package',
          description:
            'Compare available Page Like packages and select the quantity that best fits your Facebook page, marketing campaign and current audience size.',
        },
        {
          id: 'fb-pl-step-2',
          title: 'Enter Your Public Facebook Page URL',
          description:
            'Paste the public URL of the Facebook page that should receive the selected Page Likes package. This helps ensure your order is assigned to the correct page.',
        },
        {
          id: 'fb-pl-step-3',
          title: 'Review Your Order',
          description:
            'Confirm your selected package, page URL, pricing and order details before completing checkout.',
        },
        {
          id: 'fb-pl-step-4',
          title: 'Complete Secure Checkout',
          description:
            'Finish your purchase using our protected checkout process without sharing your Facebook login credentials.',
        },
        {
          id: 'fb-pl-step-5',
          title: 'Track Your Order',
          description:
            'After checkout, monitor your available order updates so you can follow the delivery progress from start to finish.',
        },
      ],
      cta: {
        label: 'Choose Your Page Likes Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'page-link-and-delivery',
      title: 'What Do You Need to Place an Order?',
      description:
        'Ordering Facebook Page Likes only requires a few public details. Private account information, passwords and account verification codes are never requested.',
      purpose: 'Explain page URL and order requirements',
      primaryKeyword: 'Facebook page likes packages',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-pl-req-url',
          title: 'Public Facebook Page URL',
          description:
            'Provide the public URL of the Facebook page receiving the selected Page Likes package.',
        },
        {
          id: 'fb-pl-req-package',
          title: 'Selected Package',
          description:
            'Choose the quantity that best matches your business goals and current Facebook page size.',
        },
        {
          id: 'fb-pl-req-public',
          title: 'Public Page Access',
          description:
            'Keep your Facebook page publicly accessible while your order is being processed.',
        },
        {
          id: 'fb-pl-req-email',
          title: 'Valid Email Address',
          description:
            'Use a working email address to receive order confirmations, progress updates and customer support if needed.',
        },
      ],
    },
    reviews: {
      id: 'fb-page-likes-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Unused on lean authority layout — no customer reviews section',
      testimonialIds: [],
    },
    faq: {
      id: 'fb-page-likes-faq',
      title: 'Frequently Asked Questions About Buying Facebook Page Likes',
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy Facebook page likes',
      faqIds: [
        'faq-fb-page-likes-need',
        'faq-fb-page-likes-package',
        'faq-fb-page-likes-password',
        'faq-fb-page-likes-how-long',
        'faq-fb-page-likes-track',
        'faq-fb-page-likes-wrong-url',
        'faq-fb-page-likes-other-metrics',
        'faq-fb-page-likes-public',
      ],
    },
    relatedServices: {
      id: 'related-facebook-services-page-likes',
      title: 'Explore More Facebook Growth Services',
      description:
        'Facebook Page Likes are only one part of building a stronger Facebook presence. Explore our additional Facebook services designed to support different growth objectives.',
      purpose: 'Internal links to sibling Facebook offers',
      serviceSlugs: ['buy-facebook-followers', 'buy-facebook-post-likes'],
    },
    finalCta: {
      id: 'fb-page-likes-final-cta',
      title: 'Choose Your Facebook Page Likes Package',
      description:
        'Compare the available Page Like quantities and prices, choose the package that fits the Facebook Page you want to use, and place your order with the correct public Facebook Page URL.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View Facebook Page Likes Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
      },
    },
  };
}

function buildBuyFacebookPostLikesContent(): ServiceContent {
  return {
    slug: 'buy-facebook-post-likes',
    platformId: 'facebook',
    seo: {
      title: 'Buy Facebook Post Likes | NovaLikes',
      description:
        'Buy Facebook Post Likes with transparent packages for businesses, creators and brands. Public Facebook post URL only, secure checkout and order tracking. No password required.',
    },
    hero: {
      eyebrow: 'BUY FACEBOOK POST LIKES',
      title: 'Buy Facebook Post Likes',
      description:
        'Buy Facebook Post Likes by choosing the package and quantity you want for a specific eligible public Facebook post. Compare the available Post Like packages and prices, select the number of likes you want, provide the correct public Facebook post URL, and complete your order online. Your Facebook password is not required, and you can use order tracking after checkout to check available status information.',
      purpose: 'Convert for Facebook post likes packages worldwide',
      primaryKeyword: 'buy Facebook Post Likes',
      supportingKeywords: [
        'Buy Facebook Post Likes',
        'Buy Likes for Facebook Post',
        'Buy Facebook Likes for Post',
        'Buy Likes on Facebook Post',
        'Can You Buy Facebook Post Likes',
      ],
      suggestedWordCount: 110,
      primaryCta: {
        label: 'Choose a Facebook Post Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: HOW_IT_WORKS_ANCHOR,
      },
      trustLabels: [
        { id: 'fb-post-trust-url', label: 'Public Facebook Post URL Only' },
        { id: 'fb-post-trust-password', label: 'No Password Required' },
        { id: 'fb-post-trust-checkout', label: 'Secure Checkout' },
        { id: 'fb-post-trust-track', label: 'Order Tracking' },
      ],
      visual: {
        src: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
        alt: 'Facebook post preview with rising post likes and engagement analytics illustration',
        width: 1200,
        height: 900,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Facebook Post Likes Packages & Pricing',
      description:
        'Compare the available Facebook Post Like packages, quantities, and prices before ordering. Choose the number of Post Likes you want for a specific eligible public Facebook post, review the current package price, and add your selected package to the cart when you are ready.',
      purpose: 'Present real NovaLikes.com Facebook post likes packages',
      primaryKeyword: 'Facebook Post Likes',
      suggestedWordCount: 45,
      packageIds: [],
      primaryCtaLabel: 'Continue With This Package',
      emptyMessage: 'Facebook Post Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-facebook-post-likes',
      title: 'Why Do People Buy Facebook Post Likes?',
      description:
        'People buy Facebook Post Likes to strengthen social proof on individual posts and create a stronger first impression for new viewers. Higher Like counts can make posts appear more active and encourage additional interactions, but they do not guarantee increased reach, sales or organic performance.',
      purpose: 'Explain motivations for buying Facebook post likes',
      primaryKeyword: 'Increase Facebook Post Likes',
      supportingKeywords: [
        'Buy Facebook Post Likes',
        'Buy Likes for Facebook Post',
        'Buy Facebook Post Engagement',
      ],
      suggestedWordCount: 180,
      items: [
        {
          id: 'fb-post-product-launch',
          title: 'Product Launches',
          description:
            'Businesses often use Post Like packages to strengthen engagement around product launches and promotional announcements.',
        },
        {
          id: 'fb-post-social-proof',
          title: 'Build Social Proof',
          description:
            'Public interaction can help a Facebook post appear more active when people first discover it.',
        },
        {
          id: 'fb-post-campaign',
          title: 'Campaign Support',
          description:
            'Marketing campaigns often use Post Likes alongside paid advertising and regular publishing.',
        },
        {
          id: 'fb-post-flexible',
          title: 'Flexible Packages',
          description:
            'Choose the quantity that matches your campaign instead of selecting more engagement signals than your content naturally supports.',
        },
      ],
    },
    whyNovaLikes: {
      id: 'why-choose-novalikes-facebook-post-likes',
      title: 'Why Choose NovaLikes for Facebook Post Likes?',
      description: '',
      purpose: 'Unused on lean authority layout — trust lives in Why Choose section',
      primaryKeyword: 'buy Facebook Post Likes',
      suggestedWordCount: 0,
      items: [],
    },
    features: {
      id: 'facebook-post-likes-delivery',
      title: 'Features',
      description: '',
      purpose: 'Unused on lean authority layout',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy Facebook Post Likes',
      description:
        'Buying Facebook Post Likes is a simple process. Select the package that fits your campaign, copy the public URL of your Facebook post, review your order details and complete secure checkout. You do not need to provide your Facebook password, and you can track your order after confirmation.',
      purpose: 'Explain the five-step Facebook Post Likes ordering process',
      primaryKeyword: 'how to buy Facebook Post Likes',
      supportingKeywords: [
        'Buy Facebook Post Likes',
        'Buy Likes for Facebook Post',
        'Buy Facebook Likes for Post',
      ],
      suggestedWordCount: 140,
      steps: [
        {
          id: 'fb-post-step-1',
          title: 'Choose Your Package',
          description:
            'Compare available Post Like packages and choose the quantity that best matches your content, campaign goals and existing engagement.',
        },
        {
          id: 'fb-post-step-2',
          title: 'Paste Your Public Facebook Post URL',
          description:
            'Copy the public URL of the Facebook post that should receive the selected Like package. Make sure the post remains publicly accessible during processing.',
        },
        {
          id: 'fb-post-step-3',
          title: 'Review Your Order',
          description:
            'Verify your selected package, Facebook post URL and pricing before completing checkout.',
        },
        {
          id: 'fb-post-step-4',
          title: 'Complete Secure Checkout',
          description:
            'Finish your purchase using secure checkout without sharing your Facebook login credentials.',
        },
        {
          id: 'fb-post-step-5',
          title: 'Track Delivery',
          description:
            'Follow your available order updates to monitor the progress of your Facebook Post Like package from confirmation through completion.',
        },
      ],
      cta: {
        label: 'Choose Your Post Likes Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'post-link-and-delivery',
      title: 'What Do You Need to Place an Order?',
      description:
        'Ordering Facebook Post Likes only requires a few public details. Private account information, passwords and verification codes are never requested during checkout.',
      purpose: 'Explain post URL and order requirements',
      primaryKeyword: 'Facebook Post Likes packages',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-post-req-url',
          title: 'Public Facebook Post URL',
          description:
            'Provide the public URL of the Facebook post receiving the selected Like package.',
        },
        {
          id: 'fb-post-req-package',
          title: 'Selected Package',
          description:
            'Choose the quantity that best matches your campaign objectives and current engagement level.',
        },
        {
          id: 'fb-post-req-public',
          title: 'Public Post Access',
          description:
            'Keep the selected Facebook post publicly available while your order is being processed.',
        },
        {
          id: 'fb-post-req-email',
          title: 'Valid Email Address',
          description:
            'Use a working email address to receive order confirmations, delivery updates and customer support if required.',
        },
      ],
    },
    reviews: {
      id: 'fb-post-likes-reviews',
      title: 'What Customers Say About NovaLikes',
      description: 'Customer reviews for this NovaLikes service.',
      purpose: 'Unused on lean authority layout — no customer reviews section',
      testimonialIds: [],
    },
    faq: {
      id: 'fb-post-likes-faq',
      title: 'Frequently Asked Questions About Buying Facebook Post Likes',
      description: '',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'buy Facebook Post Likes',
      faqIds: [
        'faq-fb-post-likes-need',
        'faq-fb-post-likes-package',
        'faq-fb-post-likes-password',
        'faq-fb-post-likes-how-long',
        'faq-fb-post-likes-track',
        'faq-fb-post-likes-wrong-url',
        'faq-fb-post-likes-other-metrics',
        'faq-fb-post-likes-public',
      ],
    },
    relatedServices: {
      id: 'related-facebook-services-post-likes',
      title: 'Explore More Facebook Growth Services',
      description:
        'Facebook Post Likes are only one part of building a stronger Facebook presence. Explore our additional Facebook services designed to support different growth objectives.',
      purpose: 'Internal links to sibling Facebook offers',
      serviceSlugs: ['buy-facebook-followers', 'buy-facebook-page-likes'],
    },
    finalCta: {
      id: 'fb-post-likes-final-cta',
      title: 'Choose Your Facebook Post Likes Package',
      description:
        'Compare the available Post Like quantities and prices, choose the package that fits the Facebook post you want to use, and place your order with the correct public Facebook post URL.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View Facebook Post Likes Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
      },
    },
  };
}

/** Facebook service page content — keyed by buy-* slug. */
export const facebookContent: Record<string, ServiceContent> = {
  'buy-facebook-followers': buildBuyFacebookFollowersContent(),
  'buy-facebook-page-likes': buildBuyFacebookPageLikesContent(),
  'buy-facebook-post-likes': buildBuyFacebookPostLikesContent(),
};

export function getFacebookContent(slug: string): ServiceContent | undefined {
  return facebookContent[slug];
}
