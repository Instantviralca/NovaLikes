import type { ServiceV2Content } from './types';

/** TikTok Likes — v2 service page copy. Primary keyword: "buy tiktok likes". Do not edit wording without the content owner. */
export const BUY_TIKTOK_LIKES_V2 = {
  meta: {
    slug: 'buy-tiktok-likes',
    platform: 'TikTok',
    name: 'TikTok Likes',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy tiktok likes',
      secondary: [
        'tiktok likes packages',
        'buy likes on tiktok videos',
        'tiktok likes price',
        'tiktok hearts',
        'buy tiktok video likes',
      ],
      questions: [
        'is it safe to buy tiktok likes',
        'how much do tiktok likes cost',
        'do bought likes help you get on the for you page',
        'should i buy tiktok likes or views',
        'do tiktok likes drop',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'TikTok Likes',
      tail: 'to Give Your Videos More Social Proof',
    },
    subtitle: 'Likes are the first thing viewers notice under a video. Give the clips you care about most a stronger count, from {fromPrice}, with just the video link and no login.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Likes Packages & Pricing',
    intro: 'Pick a package. Prices in USD.',
    summaryName: '{quantity} TikTok Likes',
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
      highlight: 'TikTok Likes?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Just a link, never your password',
        body: 'We only need the public link to the video. No login code and no access to your account.',
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
        icon: 'heart',
        tone: 'pink',
        title: 'Any public video',
        body: 'Order likes for any public TikTok video, from 100 up to 50,000. Each order covers one video.',
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
      highlight: 'TikTok Likes',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps and about two minutes. All we need is the link to one public TikTok video.',
    items: [
      {
        ui: 'public',
        title: 'Keep the video public',
        body: 'The video must be public, on a public account, until delivery is complete. Don’t delete it during the order.',
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
        title: 'Paste the video link',
        body: 'Open the video in TikTok, tap Share, choose Copy link and paste it at checkout. Add your email for the receipt and updates.',
      },
      {
        ui: 'pay',
        title: 'Pay securely',
        body: 'Pay once by card, Apple Pay or Google Pay, in US dollars. There is no subscription.',
      },
    ],
    done: {
      title: 'That’s it!',
      count: 200,
      unit: 'likes',
      body: 'Most orders start within 6–8 hours and finish 4–6 hours later. Follow progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private video',
      sub: 'Off, so we can reach the video',
    },
    chips: [
      '200',
      '500',
      '1K',
      '5K',
    ],
    chipOn: 0,
    input: {
      prefix: '',
      placeholder: 'tiktok.com/@…/video/…',
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
      highlight: 'TikTok Likes Seller',
    },
    intro: 'Whoever you buy from, check these seven things first.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Video link only',
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
    title: 'Refill and Money-Back Promises for TikTok Likes',
    intro: 'Both are written into our refund policy, not just this page.',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'If likes from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the video up and public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'TikTok Likes Cost?',
    },
    intro: 'Likes start at {fromPrice} for 100, and the price per like drops as the package grows. Every price is a one-time payment in US dollars, for one video.',
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
    id: 'why-buy-tiktok-likes',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'TikTok Likes?',
    },
    intro: 'The heart count is the first number viewers see on a TikTok. When it looks low, people swipe faster. A likes package raises that count on the videos you care about most, so they look worth watching. It works best next to good content, so see [TikTok likes vs views](/learn/tiktok-likes-vs-views) too.',
    items: [
      {
        title: 'Videos that look worth watching',
        body: 'Viewers notice the heart count in the first second. A stronger number makes them more likely to stay.',
      },
      {
        title: 'A push for your best clips',
        body: 'Put likes on the videos you want new visitors to see, like launches, tutorials or your strongest hooks.',
      },
      {
        title: 'Balance views and likes',
        body: 'A video with good views but few likes can look off. Likes bring the numbers back in proportion.',
      },
    ],
    diagram: [
      'Worth watching',
      'Best clips',
      'Balanced numbers',
    ],
  },
  help: {
    id: 'does-buying-tiktok-likes-help',
    title: {
      lead: 'Does Buying TikTok Likes',
      highlight: 'Help?',
    },
    intro: 'Likes change the heart count on one video. TikTok still decides reach from watch time and shares. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'Watch time, rewatches or shares',
        'For You page placement by themselves',
        'Your follower count or comments',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The like count on the video you choose',
        'How popular the video looks to new viewers',
        'The balance between views and likes',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Illustration of tiktok likes on a TikTok video',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'TikTok Likes',
    },
    cards: [
      {
        title: 'Creators',
        body: 'Creators add likes to their strongest videos so new viewers who land on them see a count that matches the content.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Small businesses',
        body: 'Businesses use likes on product videos and offers they share in bios, ads and messages.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Brands & agencies',
        body: 'Brands and agencies add likes to campaign videos and creator collaborations, often with gradual delivery.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'Whatever the video, the order works the same way: one public link, a package you choose, and a count that usually starts moving within 6–8 hours. Nobody ever needs your login.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'TikTok Likes vs',
      highlight: 'Followers and Views',
    },
    intro: 'Each service changes a different number. Pick the one that matches what you want people to see, or read the [full comparison guide](/learn/tiktok-followers-vs-likes-vs-views).',
    cols: [
      'Service',
      'What it changes',
      'What you give us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'The like count on one video',
        needs: 'A link to the public video',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Followers',
        changes: 'The follower count on your profile',
        needs: 'Your public username',
      },
      {
        slug: 'buy-tiktok-views',
        label: 'Views',
        changes: 'The view count on one video',
        needs: 'A link to the public video',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'TikTok Likes?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'TikTok’s Community Guidelines don’t allow fake engagement, and TikTok regularly removes accounts it sees as inactive or inauthentic. That is why a small drop can happen after delivery, and why every order includes a 6-month refill. Keeping likes in proportion to the video’s views keeps things looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Account safety',
        body: 'We only need the public link to the video, so nobody logs in to your account or changes anything in it. We never ask for a password or login code. If someone claiming to be NovaLikes does, it is not us.',
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
      highlight: 'TikTok Likes',
    },
    lead: 'Check these four things once and your order runs smoothly.',
    items: [
      {
        title: 'The video is public',
        body: 'The video has to be public, on a public account, until delivery is complete, or the order can’t start or finish.',
      },
      {
        title: 'The link points to the video',
        body: 'Copy the link from the video itself. It looks like tiktok.com/@name/video/…, not your profile link.',
      },
      {
        title: 'The video stays up',
        body: 'Don’t delete the video during delivery or the 6-month refill period, or we can’t refill it.',
      },
      {
        title: 'Likes fit the views',
        body: 'Thousands of likes on a video with a few hundred views looks odd. Pair likes with views, or pick a size that fits.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying TikTok Likes?',
    title: 'TikTok Likes FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-tt-likes-v2-is-it-safe-to-buy-tiktok-likes',
        question: 'Is it safe to buy TikTok likes?',
        answer: 'You only share the public video link, so nobody gets into your account, and you pay through a secure checkout. TikTok’s rules don’t allow fake engagement and it removes inactive accounts, so no seller can promise zero risk. That is why every order includes a 6-month refill.',
      },
      {
        id: 'faq-tt-likes-v2-how-many-tiktok-likes-should-i-buy',
        question: 'How many TikTok likes should I buy?',
        answer: 'Match the likes to the video’s views. As a rough guide, likes are usually a small share of views on TikTok, so a video with a few thousand views fits a few hundred likes. Start smaller if you are unsure.',
      },
      {
        id: 'faq-tt-likes-v2-can-i-split-one-likes-package-across-sev',
        question: 'Can I split one likes package across several videos?',
        answer: 'No. Each order covers one video, so delivery and the refill stay easy to track. Place a separate order for each video.',
      },
      {
        id: 'faq-tt-likes-v2-can-i-get-a-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-tt-likes-v2-which-payment-methods-can-i-use',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Explore More NovaLikes Services',
    intro: 'TikTok Likes change one number. To grow a different one, pick a service below.',
    services: [
      {
        slug: 'buy-tiktok-views',
        title: 'Buy TikTok Views',
        line: 'A stronger start for one video',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Buy TikTok Followers',
        line: 'Grow your TikTok profile',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
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
        label: 'TikTok Likes vs Views',
        href: '/learn/tiktok-likes-vs-views',
      },
      {
        label: 'How to Get More Views on TikTok',
        href: '/learn/how-to-get-more-views-on-tiktok',
      },
      {
        label: 'TikTok Followers vs Likes vs Views',
        href: '/learn/tiktok-followers-vs-likes-vs-views',
      },
      {
        label: 'TikTok SEO',
        href: '/learn/tiktok-seo',
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
