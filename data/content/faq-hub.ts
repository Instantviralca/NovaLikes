import type { FAQItem } from '@/types/content';

/**
 * FAQ hub production entries — Document 13.03.
 * Shared pool entries used by /faq. Service pages keep their own FAQ ids.
 */
export const faqHubItems: FAQItem[] = [
  // General
  {
    id: 'faq-hub-what-is-novalikes',
    category: 'general',
    order: 1,
    active: true,
    keywords: ['novalikes', 'about', 'platform', 'services'],
    question: 'What is NovaLikes?',
    answer:
      'NovaLikes is a social media growth service platform offering package-based services for selected Instagram, TikTok, Facebook, and YouTube metrics. Customers choose a service, select one of the real packages available through NovaLikes.ca, provide the required public username or URL, complete checkout, and track the order using their order ID and email address.',
  },
  {
    id: 'faq-hub-platforms',
    category: 'general',
    order: 2,
    active: true,
    keywords: ['platforms', 'instagram', 'tiktok', 'facebook', 'youtube'],
    question: 'Which platforms do you support?',
    answer:
      'NovaLikes currently supports selected services for Instagram, TikTok, Facebook, and YouTube. The available production pages include Instagram Followers, Likes, Views, and Comments; TikTok Followers, Likes, and Views; Facebook Followers, Page Likes, and Post Likes; and YouTube Subscribers and Views.',
  },
  {
    id: 'faq-hub-account-required',
    category: 'general',
    order: 3,
    active: true,
    keywords: ['account', 'login', 'register', 'signup'],
    question: 'Do I need to create an account?',
    answer:
      'A customer account is not required for Version 1. Customers can place an order using their email address and track it using the order ID and the same email address.',
  },
  {
    id: 'faq-hub-password',
    category: 'general',
    order: 4,
    active: true,
    keywords: ['password', 'login', 'security', 'credentials'],
    question: 'Do you need my social media password?',
    answer:
      'No. NovaLikes does not request Instagram, TikTok, Facebook, YouTube, or Google account passwords. Orders use public information such as a username, page URL, post link, channel URL, or video URL.',
  },

  // Ordering & Packages
  {
    id: 'faq-hub-real-packages',
    category: 'ordering',
    order: 1,
    active: true,
    keywords: ['prices', 'packages', 'real', 'novalikes.com'],
    question: 'Are the prices and packages real?',
    answer:
      'Yes. The website should display only the real package data already maintained or imported from NovaLikes.ca. The frontend must not create dummy prices, quantities, delivery times, badges, discounts, or package features.',
  },
  {
    id: 'faq-hub-choose-package',
    category: 'ordering',
    order: 2,
    active: true,
    keywords: ['choose', 'package', 'quantity', 'budget'],
    question: 'How do I choose the right package?',
    answer:
      'Review the package quantity, price, delivery estimate, included features, refill eligibility, and service requirements shown on the relevant service page. Choose the package that best fits your current goal and budget.',
  },
  {
    id: 'faq-hub-change-order',
    category: 'ordering',
    order: 3,
    active: true,
    keywords: ['change', 'edit', 'modify', 'after payment'],
    question: 'Can I change my order after payment?',
    answer:
      'Customers cannot directly edit an order after payment. Contact support as soon as possible with the order ID. Changes may not be possible once processing has started.',
  },
  {
    id: 'faq-hub-multiple-orders',
    category: 'ordering',
    order: 4,
    active: true,
    keywords: ['multiple', 'repeat', 'overlapping'],
    question: 'Can I place more than one order?',
    answer:
      'Yes, but review the progress of any existing order for the same username, page, post, channel, or video before placing another order. Overlapping orders may affect processing.',
  },

  // Delivery & Processing
  {
    id: 'faq-hub-order-begin',
    category: 'delivery',
    order: 1,
    active: true,
    keywords: ['start', 'begin', 'processing', 'estimate'],
    question: 'When will my order begin?',
    answer:
      'Start times depend on the selected service and package. The current estimate should be displayed with the real package data before checkout.',
  },
  {
    id: 'faq-hub-delivery-time',
    category: 'delivery',
    order: 2,
    active: true,
    keywords: ['delivery', 'how long', 'timeframe'],
    question: 'How long will delivery take?',
    answer:
      'Delivery times vary by platform, service, package size, and current processing conditions. Use the package-specific estimate shown before checkout rather than a universal delivery promise.',
  },
  {
    id: 'faq-hub-gradual-delivery',
    category: 'delivery',
    order: 3,
    active: true,
    keywords: ['gradual', 'drip', 'delivery method'],
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery may be available on eligible packages. The relevant package should state whether gradual processing applies.',
  },
  {
    id: 'faq-hub-public-destination',
    category: 'delivery',
    order: 4,
    active: true,
    keywords: ['public', 'private', 'privacy', 'url'],
    question: 'Why must my profile, page, post, or video remain public?',
    answer:
      'The public destination may need to remain accessible so the order can be processed correctly. Changing privacy settings, deleting content, or changing the username or URL may delay or prevent completion.',
  },
  {
    id: 'faq-hub-order-statuses',
    category: 'delivery',
    order: 5,
    active: true,
    keywords: ['status', 'pending', 'processing', 'completed', 'partial', 'cancelled', 'refunded'],
    question: 'What do the order statuses mean?',
    answer:
      'Pending: the order has been received and is waiting for review. Processing: manual fulfilment has started. Completed: the order has been fully completed. Partial: part of the order was completed. Cancelled: the order will not be fulfilled. Refunded: the applicable payment has been refunded.',
  },

  // Payments & Checkout
  {
    id: 'faq-hub-payment-methods',
    category: 'payments',
    order: 1,
    active: true,
    keywords: ['payment', 'pay', 'checkout', 'methods'],
    question: 'Which payment methods do you accept?',
    // Base answer — enabled providers are appended at runtime from config/payments.ts
    answer:
      'Only payment methods currently enabled in checkout configuration are available. The list below updates automatically when providers are turned on or off.',
  },
  {
    id: 'faq-hub-checkout-secure',
    category: 'payments',
    order: 2,
    active: true,
    keywords: ['secure', 'https', 'security', 'checkout'],
    question: 'Is checkout secure?',
    answer:
      'Checkout should use HTTPS, server-side payment verification, protected credentials, and the security requirements defined by the selected payment provider. Never expose secret keys in the browser.',
  },
  {
    id: 'faq-hub-coupon',
    category: 'payments',
    order: 3,
    active: true,
    keywords: ['coupon', 'discount', 'promo', 'code'],
    question: 'Can I use a coupon code?',
    answer:
      'Yes, when an active coupon is available and the order meets its requirements. Coupon validity, minimum order amount, expiry, and usage limits should be checked during checkout.',
  },
  {
    id: 'faq-hub-confirmation',
    category: 'payments',
    order: 4,
    active: true,
    keywords: ['confirmation', 'email', 'receipt'],
    question: 'Will I receive an order confirmation?',
    answer:
      'Yes. After a successful order, the customer should receive an order confirmation containing the order ID, service summary, current status, and tracking link.',
  },

  // Refunds & Refill
  {
    id: 'faq-hub-refunds',
    category: 'refunds',
    order: 1,
    active: true,
    keywords: ['refund', 'money back', 'policy'],
    relatedServiceSlugs: [],
    question: 'Do you offer refunds?',
    answer:
      'Eligible purchases may be covered under the Refund Policy and the conditions shown for the selected service and package. Refunds are not automatic for every situation, so customers should review the policy before ordering.',
  },
  {
    id: 'faq-hub-money-back',
    category: 'refunds',
    order: 2,
    active: true,
    keywords: ['30-day', 'money-back', 'guarantee', 'eligible'],
    question: 'What does the 30-day money-back guarantee mean?',
    answer:
      'The guarantee applies only to eligible purchases and remains subject to the Refund Policy, service conditions, customer actions, and order status. The website must not present it as an unconditional promise.',
  },
  {
    id: 'faq-hub-refill',
    category: 'refunds',
    order: 3,
    active: true,
    keywords: ['refill', 'drop', 'protection', 'eligible'],
    question: 'What is refill protection?',
    answer:
      'Eligible packages may include refill coverage for qualifying decreases during the stated refill period. The exact period, limits, and conditions must come from the real package data or service terms.',
  },
  {
    id: 'faq-hub-refund-help',
    category: 'refunds',
    order: 4,
    active: true,
    keywords: ['request', 'refill', 'refund', 'support'],
    question: 'How do I request help with a refill or refund?',
    answer:
      'Contact support with the order ID, checkout email, and a clear explanation. The team will review the order against the applicable package and policy terms.',
  },

  // Order Tracking
  {
    id: 'faq-hub-track-order',
    category: 'tracking',
    order: 1,
    active: true,
    keywords: ['track', 'tracking', 'order id', 'status'],
    question: 'How do I track my order?',
    answer:
      'Visit the Track Order page and enter the order ID and email address used during checkout. Both values must match the stored order.',
  },
  {
    id: 'faq-hub-tracking-info',
    category: 'tracking',
    order: 2,
    active: true,
    keywords: ['tracking page', 'timeline', 'status'],
    question: 'What information appears on the tracking page?',
    answer:
      'The tracking page may show the order ID, service, package, quantity, public destination information where appropriate, current status, order date, last update, and customer-safe timeline.',
  },
  {
    id: 'faq-hub-cannot-find-order',
    category: 'tracking',
    order: 3,
    active: true,
    keywords: ['missing', 'not found', 'typo'],
    question: 'I cannot find my order. What should I do?',
    answer:
      'Check the order ID and email address for typing mistakes. If the problem continues, contact support without repeatedly submitting the form.',
  },
  {
    id: 'faq-hub-tracking-public',
    category: 'tracking',
    order: 4,
    active: true,
    keywords: ['privacy', 'public', 'secure', 'notes'],
    question: 'Is my tracking information public?',
    answer:
      'No. The system requires both the order ID and matching email address. It must not expose internal notes, payment details, admin information, or sensitive customer data.',
  },

  // Instagram
  {
    id: 'faq-hub-ig-services',
    category: 'instagram',
    order: 1,
    active: true,
    keywords: ['instagram', 'followers', 'likes', 'views', 'comments'],
    relatedServiceSlugs: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ],
    question: 'Which Instagram services are available?',
    answer: 'Instagram Followers, Likes, Views, and Comments.',
  },
  {
    id: 'faq-hub-ig-requirements',
    category: 'instagram',
    order: 2,
    active: true,
    keywords: ['instagram', 'username', 'url', 'reel', 'post'],
    relatedServiceSlugs: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
    ],
    question: 'What information is required for Instagram orders?',
    answer:
      'Followers use a public username. Likes, Views, and Comments use the relevant public post, Reel, or video URL. Custom comment fields should appear only when supported by the selected real package.',
  },

  // TikTok
  {
    id: 'faq-hub-tt-services',
    category: 'tiktok',
    order: 1,
    active: true,
    keywords: ['tiktok', 'followers', 'likes', 'views'],
    relatedServiceSlugs: ['buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views'],
    question: 'Which TikTok services are available?',
    answer: 'TikTok Followers, Likes, and Views.',
  },
  {
    id: 'faq-hub-tt-requirements',
    category: 'tiktok',
    order: 2,
    active: true,
    keywords: ['tiktok', 'username', 'video url'],
    relatedServiceSlugs: ['buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views'],
    question: 'What information is required for TikTok orders?',
    answer:
      'Followers use a public username. Likes and Views use the public TikTok video URL.',
  },

  // Facebook
  {
    id: 'faq-hub-fb-services',
    category: 'facebook',
    order: 1,
    active: true,
    keywords: ['facebook', 'followers', 'page likes', 'post likes'],
    relatedServiceSlugs: [
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ],
    question: 'Which Facebook services are available?',
    answer: 'Facebook Followers, Page Likes, and Post Likes.',
  },
  {
    id: 'faq-hub-fb-requirements',
    category: 'facebook',
    order: 2,
    active: true,
    keywords: ['facebook', 'page', 'profile', 'post url'],
    relatedServiceSlugs: [
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ],
    question: 'What information is required for Facebook orders?',
    answer:
      'Followers use the eligible public page or profile URL. Page Likes use the public Facebook Page URL. Post Likes use the public post URL.',
  },

  // YouTube
  {
    id: 'faq-hub-yt-services',
    category: 'youtube',
    order: 1,
    active: true,
    keywords: ['youtube', 'subscribers', 'views'],
    relatedServiceSlugs: ['buy-youtube-subscribers', 'buy-youtube-views'],
    question: 'Which YouTube services are available?',
    answer: 'YouTube Subscribers and Views.',
  },
  {
    id: 'faq-hub-yt-requirements',
    category: 'youtube',
    order: 2,
    active: true,
    keywords: ['youtube', 'channel', 'video url'],
    relatedServiceSlugs: ['buy-youtube-subscribers', 'buy-youtube-views'],
    question: 'What information is required for YouTube orders?',
    answer:
      'Subscribers use the public YouTube channel URL. Views use the public YouTube video URL.',
  },
  {
    id: 'faq-hub-yt-monetization',
    category: 'youtube',
    order: 3,
    active: true,
    keywords: [
      'monetization',
      'partner program',
      'watch hours',
      'rankings',
      'revenue',
      'verification',
    ],
    relatedServiceSlugs: ['buy-youtube-subscribers', 'buy-youtube-views'],
    question: 'Do YouTube services guarantee monetization?',
    answer:
      'No. Purchased subscribers or views do not guarantee YouTube Partner Program approval, monetization, qualifying watch hours, rankings, organic engagement, revenue, or verification.',
  },
];
