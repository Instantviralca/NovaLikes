/**
 * Site v2 (Buzzoid layout): NEW visible strings for Learn, Tools, Cart, Checkout and Order success.
 * Everything else on these pages keeps its current copy (article data, tool copy, ENGLISH_UI cart/checkout strings).
 *
 * Cart / checkout / order-success strings are shown on locale pages too:
 * add them to ENGLISH_UI (lib/i18n/content/ui-english.ts) under the existing `cart`, `checkout` and `orderSuccess`
 * groups, with English fallback for other locales, and list the untranslated keys in the report.
 */
export const SITE_V2_COPY = {
  learn: {
    allTab: 'All guides',
    searchPlaceholder: 'Search guides',
    searchLabel: 'Search guides',
    tabsLabel: 'Guide categories',
    indexIntro: 'Practical guides to growing on Instagram, TikTok and Facebook, from the team behind NovaLikes.',
    latest: 'Latest',
    readGuide: 'Read the guide',
    newestFirst: 'Newest first',
    popularTopics: 'Popular topics',
    minRead: '{minutes} min read',
    growBox: {
      title: 'Grow with NovaLikes',
      body: 'Followers, likes and views for Instagram, TikTok and Facebook. No password, a 6-month refill and 24/7 WhatsApp help.',
      cta: 'See all services',
      href: '/services',
    },
    sidebar: {
      onThisPage: 'On this page',
      moreIn: 'More in {category}',
      cta: {
        instagram: {
          title: 'Grow on Instagram with NovaLikes',
          body: 'Followers, likes, views and comments for public Instagram accounts. No password needed.',
          primary: { label: 'Buy Instagram Followers', href: '/buy-instagram-followers' },
          secondary: { label: 'Buy Instagram Likes', href: '/buy-instagram-likes' },
        },
        tiktok: {
          title: 'Grow on TikTok with NovaLikes',
          body: 'Followers, likes and views for public TikTok accounts and videos. No password needed.',
          primary: { label: 'Buy TikTok Followers', href: '/buy-tiktok-followers' },
          secondary: { label: 'Buy TikTok Views', href: '/buy-tiktok-views' },
        },
        facebook: {
          title: 'Grow on Facebook with NovaLikes',
          body: 'Followers, Page likes and post likes for public Pages and posts. No password or admin access needed.',
          primary: { label: 'Buy Facebook Followers', href: '/buy-facebook-followers' },
          secondary: { label: 'Buy Facebook Post Likes', href: '/buy-facebook-post-likes' },
        },
        default: {
          title: 'Grow with NovaLikes',
          body: 'Followers, likes and views for Instagram, TikTok and Facebook. No password needed.',
          primary: { label: 'See all services', href: '/services' },
          secondary: { label: 'Track an order', href: '/track-order' },
        },
      },
    },
    share: { whatsapp: 'Share on WhatsApp', facebook: 'Share on Facebook', x: 'Share on X', copy: 'Copy link', copied: 'Link copied' },
  },
  cart: {
    addedToast: 'Added to your cart',
    viewCart: 'View cart',
    itemsCount: '{count} items · One-time purchase',
    itemCount: '1 item · One-time purchase',
    addAnotherService: 'Add another service',
    drawerFine: 'Secure checkout · No password needed',
    pageFine: 'Secure checkout · Prices in USD',
    itemsHeading: '{count} items',
    itemHeading: '1 item',
    trust: ['No password needed', 'Most orders start within 6–8 hours', '6-month refill on every order', '24/7 WhatsApp support'],
  },
  checkout: {
    total: 'Total',
    oneTime: 'One-time payment. No subscription.',
    orderSummaryToggle: 'Order summary',
    steps: ['Cart', 'Details & payment', 'Done'],
    backToCart: 'Back to cart',
    yourDetails: 'Your details',
    updatesHint: 'Order updates go here',
    optional: '(optional)',
    payment: 'Payment',
    encrypted: 'Encrypted',
    haveCoupon: 'Have a coupon code?',
    placeOrderWithTotal: 'Place Order · {total}',
    trust: ['No password needed', 'Most orders start within 6–8 hours', '6-month refill on every order', '24/7 WhatsApp support'],
    legal: { terms: 'Terms', privacy: 'Privacy', refund: 'Refund policy', contact: 'Contact' },
  },
  orderSuccess: {
    next: [
      'We send a confirmation to your email.',
      'Most orders start within 6–8 hours and finish 4–6 hours later.',
      'Follow progress any time on the Track Order page.',
    ],
  },
} as const;
