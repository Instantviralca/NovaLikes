import type { ServiceV2Content } from './types';

/** Facebook Post Likes — v2 service page copy. Primary keyword: "buy facebook post likes". Do not edit wording without the content owner. */
export const BUY_FACEBOOK_POST_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-post-likes',
    platform: 'Facebook',
    name: 'Facebook Post Likes',
    unit: 'post likes',
    unitSingular: 'post like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy facebook post likes',
      secondary: [
        'buy likes on facebook post',
        'facebook post likes packages',
        'facebook reactions',
        'buy facebook love reactions',
        'facebook post likes price',
      ],
      questions: [
        'is it safe to buy facebook post likes',
        'how much do facebook post likes cost',
        'can i get love reactions instead of likes',
        'can i buy likes for a personal profile post',
        'do facebook post likes help reach',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Post Likes',
      tail: 'to Add Social Proof to Your Posts',
    },
    subtitle: 'Offers, announcements and promotions get more attention when they already have reactions. Add likes to any public post from {fromPrice}, with Love or other reactions on request.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Post Likes Packages & Pricing',
    intro: 'Pick a package. Prices in USD.',
    summaryName: '{quantity} Facebook Post Likes',
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
      highlight: 'Facebook Post Likes?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Just a link, no admin access',
        body: 'We only need the public link to your post. No password, no admin role and no access to your account.',
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
        body: 'If post likes from your order drop within 6 months of delivery, send us your order ID and we top them up at no extra cost.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-day money-back guarantee',
        body: 'Eligible orders are covered for 30 days from the purchase date. Our refund policy spells out what counts.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: 'Love or other reactions',
        body: 'Orders arrive as Likes by default. Want Love or another reaction? Write it in the checkout note or tell us on WhatsApp before the order starts.',
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
      highlight: 'Facebook Post Likes',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps and about two minutes. All we need is the link to one public Facebook post.',
    items: [
      {
        ui: 'public',
        title: 'Set the post to Public',
        body: 'Look for the globe icon next to the post date. Posts shared with Friends or a custom list can’t receive an order.',
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
        body: 'Open the post, tap Share and choose Copy link, then paste it at checkout. Add the reaction you want in the note, if not Like.',
      },
      {
        ui: 'pay',
        title: 'Pay securely',
        body: 'Pay once by card, Apple Pay or Google Pay, in US dollars. There is no subscription.',
      },
    ],
    done: {
      title: 'That’s it!',
      count: 1000,
      unit: 'post likes',
      body: 'Most orders start within 6–8 hours and finish 4–6 hours later. Follow progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Friends-only post',
      sub: 'Off, so the audience is Public',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'facebook.com/…/posts/…',
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
      highlight: 'Facebook Post Likes Seller',
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
    title: 'Refill and Money-Back Promises for Facebook Post Likes',
    intro: 'Both are written into our refund policy, not just this page.',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'If post likes from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the post up and public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'Facebook Post Likes Cost?',
    },
    intro: 'Packages start at {fromPrice} for 100 post likes, and the price per like drops as the package grows. Every price is a one-time payment in US dollars, for one post.',
    points: [
      'The 6-month refill is included. There is nothing extra to add.',
      'No subscription and no renewal. You pay once per order.',
      'Pay by card, Apple Pay or Google Pay.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 post likes',
    ],
    best: 'Lowest per post like',
    note: 'Prices come from our live packages. The price you see at checkout is the price you pay.',
  },
  whyBuy: {
    id: 'why-buy-facebook-post-likes',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'Facebook Post Likes?',
    },
    intro: 'People scroll past posts that look ignored. A post with reactions already on it gets a second look, and that is often all an offer or announcement needs. A post likes package lifts the reaction count on the posts that matter to you. It works best next to good content, so see [how to get more likes on a Facebook post](/learn/how-to-get-more-likes-on-facebook-post) too.',
    items: [
      {
        title: 'Offers that get noticed',
        body: 'Promotions and announcements with reactions look worth stopping for in a busy feed.',
      },
      {
        title: 'Social proof for events and launches',
        body: 'Event posts and launches look popular from the start, which makes people more willing to join in.',
      },
      {
        title: 'A Page that looks active',
        body: 'Recent posts with a handful of reactions can make a Page look quiet. Likes keep it looking alive.',
      },
    ],
    diagram: [
      'Noticed offers',
      'Event buzz',
      'Active Page',
    ],
  },
  help: {
    id: 'does-buying-facebook-post-likes-help',
    title: {
      lead: 'Does Buying Facebook Post Likes',
      highlight: 'Help?',
    },
    intro: 'Post likes change the reactions under one post. Facebook still weighs comments, shares and time spent more. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'Comments, shares or time spent',
        'Post reach by themselves',
        'Your Page followers or likes',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The reaction count on the post you choose',
        'How popular the post looks in the feed',
        'The first impression of offers and events',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Illustration of facebook post likes on a Facebook post',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'Facebook Post Likes',
    },
    cards: [
      {
        title: 'Small businesses',
        body: 'Shops, restaurants and local services add likes to offers, new menus and opening posts so they stand out in the feed.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Events & organisers',
        body: 'Event organisers use likes on event announcements and line-ups so the post looks busy from the first day.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Creators & brands',
        body: 'Creators and brands add likes, or Love reactions, to launch posts and collaborations, often with gradual delivery.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'Whatever the post, the order works the same way: one public link, a package and reaction you choose, and a count that usually starts moving within 6–8 hours. Nobody ever needs your password.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Facebook Post Likes vs',
      highlight: 'Followers and Page Likes',
    },
    intro: 'Each service changes a different number. Pick the one that matches what you want people to see, or read the [full comparison guide](/learn/facebook-followers-vs-page-likes-vs-post-likes).',
    cols: [
      'Service',
      'What it changes',
      'What you give us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-facebook-post-likes',
        label: 'Post Likes',
        changes: 'Reactions on one public post',
        needs: 'A link to the public post',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'The follower count on a Page or profile',
        needs: 'A link to the Page or profile',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'The like count on a classic-layout Page',
        needs: 'A link to the Page',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Facebook Post Likes?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta regularly removes fake or inactive accounts. That is why a small drop can happen after delivery, and why every order includes a 6-month refill. Keeping reactions in proportion to the post keeps things looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Account safety',
        body: 'We only need the public link to your post, so nobody logs in or needs admin access. We never ask for a password or login code. If someone claiming to be NovaLikes does, it is not us.',
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
      highlight: 'Facebook Post Likes',
    },
    lead: 'Check these four things once and your order runs smoothly.',
    items: [
      {
        title: 'The post is Public',
        body: 'Check for the globe icon next to the date. Friends-only or custom-audience posts can’t receive an order.',
      },
      {
        title: 'The link points to the post',
        body: 'Copy the link to the post itself, using Share and then Copy link, not your Page or profile link.',
      },
      {
        title: 'You chose the reaction',
        body: 'Likes are the default. For Love or another reaction, add it in the checkout note before the order starts.',
      },
      {
        title: 'The post stays up',
        body: 'Don’t delete the post or change its audience during delivery or the 6-month refill period.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying Facebook Post Likes?',
    title: 'Facebook Post Likes FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-fb-post-likes-v2-is-it-safe-to-buy-facebook-post-likes',
        question: 'Is it safe to buy Facebook post likes?',
        answer: 'You only share the public post link, so nobody gets into your account, and you pay through a secure checkout. Facebook’s rules don’t allow inauthentic behaviour and Meta removes fake accounts, so no seller can promise zero risk. That is why every order includes a 6-month refill.',
      },
      {
        id: 'faq-fb-post-likes-v2-can-i-split-one-package-across-several-p',
        question: 'Can I split one package across several posts?',
        answer: 'No. Each order covers one post, so delivery and the refill stay easy to track. Place a separate order for each post.',
      },
      {
        id: 'faq-fb-post-likes-v2-can-i-get-a-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-fb-post-likes-v2-which-payment-methods-can-i-use',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Explore More NovaLikes Services',
    intro: 'Facebook Post Likes change one number. To grow a different one, pick a service below.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Buy Facebook Followers',
        line: 'For Pages and public profiles',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-page-likes',
        title: 'Buy Facebook Page Likes',
        line: 'For Pages with a like count',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Buy Instagram Likes',
        line: 'For posts, carousels and Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
    ],
    cardPrice: 'From {fromPrice}',
    guidesTitle: 'Guides',
    guides: [
      {
        label: 'How to Get More Likes on a Facebook Post',
        href: '/learn/how-to-get-more-likes-on-facebook-post',
      },
      {
        label: 'Facebook Followers vs Page Likes vs Post Likes',
        href: '/learn/facebook-followers-vs-page-likes-vs-post-likes',
      },
      {
        label: 'How Facebook Page Reach Works',
        href: '/learn/how-facebook-page-reach-works',
      },
      {
        label: 'How to Get More Facebook Page Followers',
        href: '/learn/how-to-get-more-facebook-page-followers',
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
