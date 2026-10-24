import type { ServiceV2Content } from './types';

/** TikTok Views — v2 service page copy. Primary keyword: "buy tiktok views". Do not edit wording without the content owner. */
export const BUY_TIKTOK_VIEWS_V2 = {
  meta: {
    slug: 'buy-tiktok-views',
    platform: 'TikTok',
    name: 'TikTok Views',
    unit: 'views',
    unitSingular: 'view',
    inputKind: 'link',
    perUnit: 1000,
    tiers: true,
    keywords: {
      primary: 'buy tiktok views',
      secondary: [
        'tiktok views packages',
        'buy views on tiktok',
        'tiktok video views',
        'tiktok views price',
        'premium tiktok views',
      ],
      questions: [
        'is it safe to buy tiktok views',
        'how much do tiktok views cost',
        'do bought views count for creator rewards',
        'do bought views help you get on the for you page',
        'how are tiktok views counted',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'TikTok Views',
      tail: 'for a Stronger Start on New Videos',
    },
    subtitle: 'A low view count can make a good video look ignored. Give launches, promos and new uploads a stronger start, from {fromPrice}, with High Quality or Premium views.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Views Packages & Pricing',
    intro: 'Pick a tier and a package. Prices in USD.',
    summaryName: '{quantity} {tier} TikTok Views',
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
    tiers: [
      {
        label: 'High Quality',
        note: 'Our lowest price per view.',
      },
      {
        label: 'Premium',
        note: 'Our higher-tier views option.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Why Choose NovaLikes for',
      highlight: 'TikTok Views?',
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
        body: 'If views from your order drop within 6 months of delivery, send us your order ID and we top them up at no extra cost.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-day money-back guarantee',
        body: 'Eligible orders are covered for 30 days from the purchase date. Our refund policy spells out what counts.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'Two quality tiers',
        body: 'High Quality is our lowest price per view. Premium is our higher-tier option. Both get the same delivery times and 6-month refill.',
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
      highlight: 'TikTok Views',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps and about two minutes. Pick High Quality or Premium, then paste the link to one public TikTok video.',
    items: [
      {
        ui: 'public',
        title: 'Keep the video public',
        body: 'The video must be public, on a public account, until delivery is complete. Don’t delete it during the order.',
      },
      {
        ui: 'packages',
        title: 'Pick a tier and package',
        body: 'Choose High Quality or Premium, then a quantity. Each package shows the price before you commit.',
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
      count: 50000,
      unit: 'views',
      body: 'Most orders start within 6–8 hours and finish 4–6 hours later. Follow progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private video',
      sub: 'Off, so we can reach the video',
    },
    chips: [
      '5K',
      '10K',
      '50K',
      '100K',
    ],
    chipOn: 2,
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
      highlight: 'TikTok Views Seller',
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
    title: 'Refill and Money-Back Promises for TikTok Views',
    intro: 'Both are written into our refund policy, not just this page.',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'If views from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the video up and public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'TikTok Views Cost?',
    },
    intro: 'High Quality views start at {fromPrice} for 1,000, and Premium views cost a little more per view. On both tiers, the price per 1,000 views drops on bigger packages. Every price is a one-time payment in US dollars.',
    points: [
      'The 6-month refill is included. There is nothing extra to add.',
      'No subscription and no renewal. You pay once per order.',
      'Pay by card, Apple Pay or Google Pay.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 views',
    ],
    best: 'Lowest per view',
    note: 'Prices come from our live packages. The price you see at checkout is the price you pay.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-views',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'TikTok Views?',
    },
    intro: 'A new TikTok with a few dozen views can look like nobody watched it. A views package raises the number on the video, so the next viewer is more curious to see what the fuss is about. It works best next to good content, so see [how TikTok video views are counted](/learn/how-tiktok-video-views-are-counted) too.',
    items: [
      {
        title: 'A stronger start for new uploads',
        body: 'Fresh videos don’t have to sit at a handful of views while they find an audience.',
      },
      {
        title: 'Launches and promos that look busy',
        body: 'Product videos and announcements look established from day one.',
      },
      {
        title: 'Proof for partners and clients',
        body: 'A healthy view count helps when you share videos with brands, collaborators or clients.',
      },
    ],
    diagram: [
      'Strong start',
      'Busy launch',
      'Social proof',
    ],
  },
  help: {
    id: 'does-buying-tiktok-views-help',
    title: {
      lead: 'Does Buying TikTok Views',
      highlight: 'Help?',
    },
    intro: 'Views change the number on one video. TikTok still widens reach based on how viewers react. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'Watch time, rewatches or shares',
        'For You page placement by themselves',
        'Creator Rewards earnings',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The view count on the video you choose',
        'How worth-watching the video looks to new viewers',
        'The first impression of launches and promos',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Illustration of tiktok views on a TikTok video',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'TikTok Views',
    },
    cards: [
      {
        title: 'Creators',
        body: 'Creators add views to new uploads so a strong video doesn’t look ignored while it finds its audience.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Small businesses',
        body: 'Businesses use views on product demos, offers and behind-the-scenes clips they share in bios and ads.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Brands & agencies',
        body: 'Brands and agencies pick Premium views for campaign videos and creator collaborations, often with gradual delivery.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'Whatever the video, the order works the same way: one public link, the tier and package you choose, and a count that usually starts moving within 6–8 hours. Nobody ever needs your login.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'TikTok Views vs',
      highlight: 'Likes and Followers',
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
        slug: 'buy-tiktok-views',
        label: 'Views',
        changes: 'The view count on one video',
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
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'The like count on one video',
        needs: 'A link to the public video',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'TikTok Views?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'TikTok’s Community Guidelines don’t allow fake engagement, and TikTok excludes paid views from Creator Rewards, so never buy views to earn money. TikTok also removes inactive accounts, which is why a small drop can happen after delivery and why every order includes a 6-month refill. Pairing views with a strong hook keeps the numbers looking natural.',
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
      highlight: 'TikTok Views',
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
        title: 'You picked the right tier',
        body: 'High Quality is the lower price per view. Premium is our higher-tier option. Not sure? Ask us on WhatsApp before you order.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying TikTok Views?',
    title: 'TikTok Views FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-tt-views-v2-is-it-safe-to-buy-tiktok-views',
        question: 'Is it safe to buy TikTok views?',
        answer: 'You only share the public video link, so nobody gets into your account, and you pay through a secure checkout. TikTok’s rules don’t allow fake engagement, so no seller can promise zero risk, and paid views never count for Creator Rewards. Every order includes a 6-month refill.',
      },
      {
        id: 'faq-tt-views-v2-how-many-tiktok-views-should-i-buy',
        question: 'How many TikTok views should I buy?',
        answer: 'Pick a size that fits your account. A few thousand views suits most videos on smaller accounts, while campaigns and bigger accounts often use 10,000 to 50,000. Start smaller if you are unsure.',
      },
      {
        id: 'faq-tt-views-v2-can-i-get-a-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-tt-views-v2-which-payment-methods-can-i-use',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Explore More NovaLikes Services',
    intro: 'TikTok Views change one number. To grow a different one, pick a service below.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Buy TikTok Likes',
        line: 'More hearts on one video',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Buy TikTok Followers',
        line: 'Grow your TikTok profile',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Buy Instagram Views',
        line: 'More eyes on your Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
    ],
    cardPrice: 'From {fromPrice}',
    guidesTitle: 'Guides',
    guides: [
      {
        label: 'How TikTok Video Views Are Counted',
        href: '/learn/how-tiktok-video-views-are-counted',
      },
      {
        label: 'How to Get More Views on TikTok',
        href: '/learn/how-to-get-more-views-on-tiktok',
      },
      {
        label: 'Why Does My TikTok Have 0 Views?',
        href: '/learn/why-does-my-tiktok-have-0-views',
      },
      {
        label: 'TikTok Views but No Followers',
        href: '/learn/tiktok-views-but-no-followers',
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
