import type { ServiceV2Content } from './types';

/** Instagram Likes — v2 service page copy. Primary keyword: "buy instagram likes". Do not edit wording without the content owner. */
export const BUY_INSTAGRAM_LIKES_V2 = {
  meta: {
    slug: 'buy-instagram-likes',
    platform: 'Instagram',
    name: 'Instagram Likes',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy instagram likes',
      secondary: [
        'instagram likes packages',
        'buy likes on instagram posts',
        'buy instagram reel likes',
        'instagram likes price',
        'cheap instagram likes (price intent, answered by the cost table; never use "cheap" as a quality claim)',
      ],
      questions: [
        'is it safe to buy instagram likes',
        'how much do instagram likes cost',
        'can you buy likes on instagram reels',
        'do bought instagram likes drop',
        'does buying instagram likes help',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Likes',
      tail: 'for Posts and Reels That Stand Out',
    },
    subtitle: 'Help your best photos, carousels and Reels look as popular as they deserve. Likes add social proof to any public post, from {fromPrice}, with no login needed.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Likes Packages & Pricing',
    intro: 'Pick a package. Prices in USD.',
    summaryName: '{quantity} Instagram Likes',
    save: 'You save',
    cta: 'Add to Cart',
    oneTime: 'One-time purchase. No subscription.',
    secure: 'Secure checkout',
    methods: [
      'Card',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'No password',
        body: 'Link only',
      },
      {
        icon: 'clock',
        title: 'Starts in 6–8h',
        body: 'Finishes 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'Here to help',
        body: '24/7 on WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Why Choose NovaLikes for',
      highlight: 'Instagram Likes?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Just a link, never your password',
        body: 'We only need the public link to the post or Reel. No login code and no access to your account.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Clear start and finish times',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after they start. Prefer a slower pace? Ask for gradual delivery.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: '6-month refill',
        body: 'If likes from your order drop within 6 months of delivery, send us your order ID and we top them up at no extra cost.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-day money-back guarantee',
        body: 'Eligible orders are covered for 30 days from the purchase date. Our refund policy spells out what counts.',
      },
      {
        icon: 'image',
        tone: 'pink',
        title: 'Posts, carousels and Reels',
        body: 'Order likes for any public photo, carousel or Reel. Each order covers one post, so your best content gets exactly the push you choose.',
      },
    ],
    promo: {
      eyebrow: 'Not sure which package?',
      title: 'Ask us before you buy',
      cta: 'Chat on WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'How to Buy',
      highlight: 'Instagram Likes',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps and about two minutes. All we need is the link to one public post or Reel.',
    items: [
      {
        ui: 'public',
        title: 'Keep the post public',
        body: 'The post or Reel must be public, on a public account, until delivery is complete. Don’t delete or archive it during the order.',
      },
      {
        ui: 'packages',
        title: 'Pick a package',
        body: 'Choose a quantity from the packages above. Each one shows the price before you commit.',
      },
      {
        ui: 'cart',
        title: 'Add to cart',
        body: 'Click “Add to Cart”, then continue to checkout.',
      },
      {
        ui: 'username',
        title: 'Paste the post link',
        body: 'Open the post or Reel, tap the three dots or Share, choose Copy link and paste it at checkout. Add your email for the receipt and order updates.',
      },
      {
        ui: 'pay',
        title: 'Pay securely',
        body: 'Pay once by card, Apple Pay or Google Pay, in US dollars. There is no subscription.',
      },
    ],
    done: {
      title: 'That’s it!',
      count: 2500,
      unit: 'likes',
      body: 'Most orders start within 6–8 hours and finish 4–6 hours later. Follow progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private account',
      sub: 'Off, so we can reach the post',
    },
    chips: [
      '500',
      '1K',
      '2.5K',
      '5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'instagram.com/p/…',
    },
    safeChips: [
      'Link only',
      'Secure checkout',
    ],
    privacyTags: [
      'link',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'How to Spot a Risky',
      highlight: 'Instagram Likes Seller',
    },
    intro: 'Whoever you buy from, check these seven things first.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Post link only',
        riskySeller: 'Ask for your password',
      },
      {
        label: 'Timing',
        novalikes: 'Starts in 6–8 hours',
        riskySeller: 'No timeframe given',
      },
      {
        label: 'Drops',
        novalikes: '6-month refill',
        riskySeller: 'No refill',
      },
      {
        label: 'Refunds',
        novalikes: '30-day money-back*',
        riskySeller: 'No written policy',
      },
      {
        label: 'Support',
        novalikes: '24/7 WhatsApp',
        riskySeller: 'Hard to reach',
      },
      {
        label: 'Price',
        novalikes: 'Shown in USD upfront',
        riskySeller: 'Changes at checkout',
      },
      {
        label: 'Tracking',
        novalikes: 'Track Order page',
        riskySeller: 'No way to check',
      },
    ],
    note: '*On eligible orders, as set out in our refund policy.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill and Money-Back Promises for Instagram Likes',
    intro: 'Both are written into our refund policy, not just this page.',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'If likes from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the post or Reel up and public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'Instagram Likes Cost?',
    },
    intro: 'Likes start at {fromPrice} for 50, and the price per like drops as the package grows. Every price is a one-time payment in US dollars, for one post or Reel.',
    points: [
      'The 6-month refill is included. There is nothing extra to add.',
      'No subscription and no renewal. You pay once per order.',
      'Pay by card, Apple Pay or Google Pay.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 likes',
    ],
    best: 'Lowest per like',
    note: 'Prices come from our live packages. The price you see at checkout is the price you pay.',
  },
  whyBuy: {
    id: 'why-buy-instagram-likes',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'Instagram Likes?',
    },
    intro: 'A like count is the quickest signal people read on a post. When it looks low, good content gets scrolled past. A likes package lifts that number on the posts you care about most, so they get a fairer first look. It works best next to good content, so see [how the Instagram algorithm works](/learn/how-instagram-algorithm-works) too.',
    items: [
      {
        title: 'Posts that look worth stopping for',
        body: 'People notice the like count before they read the caption. A healthy number makes a photo or Reel look worth a second look.',
      },
      {
        title: 'Support for launches and offers',
        body: 'Product drops, menu changes and promos get a stronger start when the post doesn’t sit at a handful of likes.',
      },
      {
        title: 'A consistent-looking grid',
        body: 'Older posts with a few likes next to newer ones with hundreds can make a profile look uneven. Likes help even it out.',
      },
    ],
    diagram: [
      'Stops the scroll',
      'Launch support',
      'Even grid',
    ],
  },
  help: {
    id: 'does-buying-instagram-likes-help',
    title: {
      lead: 'Does Buying Instagram Likes',
      highlight: 'Help?',
    },
    intro: 'Likes change the number under one post. They don’t change how Instagram ranks it on their own. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'Your follower count, views or comments',
        'Explore or Reels placement by themselves',
        'Sales or messages without a strong post behind them',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The like count on the post or Reel you choose',
        'How popular the post looks to new viewers',
        'The first impression of launches and promos',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Illustration of instagram likes on a Instagram post',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'Instagram Likes',
    },
    cards: [
      {
        title: 'Creators',
        body: 'Creators add likes to their strongest Reels and carousels, the posts they want new visitors to see first, while they keep posting.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Small businesses',
        body: 'Shops, salons and cafés use likes on offer posts, new menus and product photos, so promotions don’t look ignored.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Brands & agencies',
        body: 'Brands and agencies add likes to campaign posts and collaborations, often with gradual delivery so the count rises steadily.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'Whatever the post, the order works the same way: one public link, a package you choose, and a count that usually starts moving within 6–8 hours. Nobody ever needs your login.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Instagram Likes vs',
      highlight: 'Followers, Views and Comments',
    },
    intro: 'Each service changes a different number. Pick the one that matches what you want people to see, or read the [full comparison guide](/learn/instagram-followers-vs-likes-vs-views-vs-comments).',
    cols: [
      'Service',
      'What it changes',
      'What you give us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'The like count on one post or Reel',
        needs: 'A link to the public post',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'The follower count on your profile',
        needs: 'Your public @username',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Views',
        changes: 'The view count on one Reel or video',
        needs: 'A link to the public Reel',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Comments',
        changes: 'Comments on one public post',
        needs: 'A link to the public post',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Instagram Likes?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'Instagram’s Community Guidelines ask people not to collect likes, followers or shares artificially, and Instagram regularly removes accounts it sees as inactive or inauthentic. That is why a small drop can happen after delivery, and why every order includes a 6-month refill. Choosing a size that fits the post and asking for gradual delivery keep things looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Account safety',
        body: 'We only need the public link to the post or Reel, so nobody logs in to your account or changes anything in it. We never ask for a password or login code. If someone claiming to be NovaLikes does, it is not us.',
      },
      {
        ui: 'pay',
        title: 'Payment security',
        body: 'You pay once through a secure checkout by card, Apple Pay or Google Pay, in US dollars. There is no subscription and nothing renews.',
      },
      {
        ui: 'privacy',
        title: 'Privacy',
        body: 'Your link and email are used to process the order and send updates, as set out in our [privacy policy](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Before You Buy',
      highlight: 'Instagram Likes',
    },
    lead: 'Check these four things once and your order runs smoothly.',
    items: [
      {
        title: 'The post is public',
        body: 'The post or Reel has to be on a public account until delivery is complete. A private account stops the order from starting or finishing.',
      },
      {
        title: 'The link points to the post',
        body: 'Copy the link from the post itself, not your profile. Links look like instagram.com/p/… or instagram.com/reel/….',
      },
      {
        title: 'The post stays up',
        body: 'Don’t delete or archive the post during delivery or the 6-month refill period, or we can’t refill it.',
      },
      {
        title: 'Like counts are visible',
        body: 'If you hid like counts on the post, the likes still arrive but visitors won’t see the number. Unhide it to get the full benefit.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying Instagram Likes?',
    title: 'Instagram Likes FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-ig-likes-v2-how-many-instagram-likes-should-i-buy',
        question: 'How many Instagram likes should I buy?',
        answer: 'Pick a number that fits the post and your account. A few hundred likes suits most posts on smaller accounts, while bigger accounts and campaign posts can take a few thousand. If you are unsure, start smaller. You can always order again.',
      },
      {
        id: 'faq-ig-likes-v2-can-i-split-one-likes-package-across-sev',
        question: 'Can I split one likes package across several posts?',
        answer: 'No. Each order covers one post or Reel, so the delivery and the refill stay easy to track. For several posts, place a separate order for each one.',
      },
      {
        id: 'faq-ig-likes-v2-can-i-get-a-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-ig-likes-v2-which-payment-methods-can-i-use',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Explore Other Instagram Services',
    intro: 'Instagram Likes change one number. To grow a different one, pick a service below.',
    services: [
      {
        slug: 'buy-instagram-followers',
        title: 'Buy Instagram Followers',
        line: 'Grow your profile',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Buy Instagram Views',
        line: 'More eyes on your Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Buy Instagram Comments',
        line: 'Start the conversation on a post',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
    ],
    cardPrice: 'From {fromPrice}',
    guidesTitle: 'Guides',
    guides: [
      {
        label: 'How the Instagram Algorithm Works',
        href: '/learn/how-instagram-algorithm-works',
      },
      {
        label: 'Instagram Followers vs Likes vs Views vs Comments',
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
      },
      {
        label: 'How to Grow Instagram Followers Organically',
        href: '/learn/how-to-grow-instagram-followers-organically',
      },
      {
        label: 'Public vs Private Instagram Accounts',
        href: '/learn/public-vs-private-instagram-account',
      },
    ],
  },
  sticky: {
    label: 'Choose a Package',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
