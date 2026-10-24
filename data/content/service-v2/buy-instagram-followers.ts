import type { ServiceV2Content } from './types';

/** Instagram Followers — v2 service page copy. Primary keyword: "buy instagram followers". Do not edit wording without the content owner. */
export const BUY_INSTAGRAM_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-instagram-followers',
    platform: 'Instagram',
    name: 'Instagram Followers',
    unit: 'followers',
    unitSingular: 'follower',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy instagram followers',
      secondary: [
        'instagram followers packages',
        'instagram followers price',
        'buy followers on instagram',
        'grow instagram followers',
        'instagram followers no password',
      ],
      questions: [
        'is it safe to buy instagram followers',
        'how much do instagram followers cost',
        'can my account get banned for buying followers',
        'why did my instagram follower count drop',
        'does buying instagram followers help',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Followers',
      tail: 'to Build Profile Credibility',
    },
    subtitle: 'Brands, collaborators and new visitors check your follower count before they follow. Build a profile that looks trusted, from {fromPrice}, without sharing your Instagram password.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Followers Packages & Pricing',
    intro: 'Pick a package. Prices in USD.',
    summaryName: '{quantity} Instagram Followers',
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
        body: 'Username only',
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
      highlight: 'Instagram Followers?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Your username, never your password',
        body: 'We only need the public @username of the profile. No login code and no access to your account.',
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
        body: 'If followers from your order drop within 6 months of delivery, send us your order ID and we top them up at no extra cost.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-day money-back guarantee',
        body: 'Eligible orders are covered for 30 days from the purchase date. Our refund policy spells out what counts.',
      },
      {
        icon: 'message-square',
        tone: 'pink',
        title: 'Help on WhatsApp, 24/7',
        body: 'Questions before or after you order? Message +44 7454 758272 with your order ID, day or night.',
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
      highlight: 'Instagram Followers',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps and about two minutes. Most orders start within 6–8 hours of payment.',
    items: [
      {
        ui: 'public',
        title: 'Make your profile public',
        body: 'Followers can only be delivered to a public profile. You can switch back to private once the order is complete.',
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
        title: 'Add your username',
        body: 'Type the public @username that should receive the followers, plus your email for the receipt and order updates.',
      },
      {
        ui: 'pay',
        title: 'Pay securely',
        body: 'Pay once by card, Apple Pay or Google Pay, in US dollars. There is no subscription.',
      },
    ],
    done: {
      title: 'That’s it!',
      count: 2000,
      unit: 'followers',
      body: 'Most orders start within 6–8 hours and finish 4–6 hours later. Follow progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private account',
      sub: 'Off, so we can reach you',
    },
    chips: [
      '1K',
      '2K',
      '5K',
      '10K',
    ],
    chipOn: 1,
    input: {
      prefix: '@',
      placeholder: 'yourusername',
    },
    safeChips: [
      'Username only',
      'Secure checkout',
    ],
    privacyTags: [
      '@username',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'How to Spot a Risky',
      highlight: 'Instagram Follower Seller',
    },
    intro: 'Whoever you buy from, check these seven things first.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Username only',
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
    title: 'Refill and Money-Back Promises',
    intro: 'Both are written into our refund policy, not just this page. Some drop over time is normal on Instagram, and [this guide explains why followers drop](/learn/why-instagram-followers-drop).',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
        body: 'If followers from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the same username, and keep the profile public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-delivery-requirements.webp',
        alt: 'Instagram follower order requirements — public username only, no password required',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'Instagram Followers Cost?',
    },
    intro: 'Packages start at {fromPrice} for 100 followers. The bigger the package, the less you pay per follower, and every price is a one-time payment in US dollars.',
    points: [
      'The 6-month refill is included. There is nothing extra to add.',
      'No subscription and no renewal. You pay once per order.',
      'Pay by card, Apple Pay or Google Pay.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 followers',
    ],
    best: 'Lowest per follower',
    note: 'Prices come from our live packages. The price you see at checkout is the price you pay.',
  },
  whyBuy: {
    id: 'why-buy-instagram-followers',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'Instagram Followers?',
    },
    intro: 'Most people who order are not starting from nothing. They have content they believe in and a follower count that undersells it. A package changes the number visitors see first, so good posts get a fairer look. It works best next to steady posting, so see [how to grow Instagram followers organically](/learn/how-to-grow-instagram-followers-organically) too.',
    items: [
      {
        title: 'A stronger first impression',
        body: 'Visitors glance at the follower count before they read a single caption. A fuller profile gets a fairer first look.',
      },
      {
        title: 'A head start for a new account',
        body: 'A new brand, side project or creator account doesn’t have to sit at a few dozen followers while you build it up.',
      },
      {
        title: 'Support for a launch or pitch',
        body: 'Teams add followers before a product launch, a campaign or a brand pitch, alongside the posts that do the real work.',
      },
    ],
    diagram: [
      'First impression',
      'Head start',
      'Launch support',
    ],
  },
  help: {
    id: 'does-buying-instagram-followers-help',
    title: {
      lead: 'Does Buying Instagram Followers',
      highlight: 'Help?',
    },
    intro: 'It helps with one thing: the number people see on your profile. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'Likes, views or comments on your posts',
        'Your reach, Explore or Reels recommendations',
        'Sales, sign-ups or messages on their own',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The follower count shown on your profile',
        'The first impression for new visitors',
        'How established a new account looks',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Illustration of an Instagram profile with a growing follower count',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'Instagram Followers',
    },
    cards: [
      {
        title: 'Creators',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
        body: 'Creators use followers to give a growing account the profile it deserves while they keep posting Reels and Stories. Common reasons: a new account, a first brand pitch, or relaunching an older account with a new focus.',
      },
      {
        title: 'Small businesses',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
        body: 'Local shops, salons, cafés and service businesses often meet customers on Instagram before they visit a website. A profile that looks active helps when people check you out before an opening or launch.',
      },
      {
        title: 'Brands & agencies',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
        body: 'Brands and agencies add followers to new country, product-line or campaign accounts so they match the main brand’s presence, often with gradual delivery for a steadier look.',
      },
    ],
    statement: 'Whatever the reason, the order works the same way: your public username, a package you choose, and a count that usually starts moving within 6–8 hours. Nobody ever needs your login.',
  },
  vs: {
    id: 'followers-vs-likes-vs-views',
    title: {
      lead: 'Instagram Followers vs',
      highlight: 'Likes, Views and Comments',
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
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'The follower count on your profile',
        needs: 'Your public @username',
        current: true,
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'The like count on one post or Reel',
        needs: 'A link to the public post',
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
      highlight: 'Instagram Followers?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'Instagram’s Community Guidelines ask people not to collect followers, likes or shares artificially, and Instagram regularly removes accounts it sees as inactive or inauthentic. That is why some drop can happen after delivery, and why every order includes a 6-month refill. Gradual delivery and regular posting keep growth looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Account safety',
        body: 'We only need your public username, so nobody logs in to your account or changes anything in it. We never ask for a login code. If someone claiming to be NovaLikes does, it is not us.',
      },
      {
        ui: 'pay',
        title: 'Payment security',
        body: 'You pay once through a secure checkout by card, Apple Pay or Google Pay, in US dollars. There is no subscription and nothing renews.',
      },
      {
        ui: 'privacy',
        title: 'Privacy',
        body: 'Your username and email are used to process the order and send updates, as set out in our [privacy policy](/privacy-policy). You can make the profile private again once delivery is done.',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Before You Buy',
      highlight: 'Instagram Followers',
    },
    lead: 'Check these four things once and your order runs smoothly.',
    items: [
      {
        title: 'Your profile is public',
        body: 'Keep it public until delivery is complete. A private profile stops the order from starting or finishing. Not sure what changes? Read [public vs private Instagram accounts](/learn/public-vs-private-instagram-account).',
      },
      {
        title: 'The username is spelled right',
        body: 'We deliver to exactly what you type. Copy it straight from your profile to be safe.',
      },
      {
        title: 'The username stays the same',
        body: 'Keep the same username during delivery and the 6-month refill period, or we can’t find the profile.',
      },
      {
        title: 'You know the pace you want',
        body: 'Want followers to arrive slowly? Ask for gradual delivery at checkout or on WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying Instagram followers?',
    title: 'Instagram Followers FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-ig-followers-v2-safe',
        question: 'Is it safe to buy Instagram followers?',
        answer: 'With NovaLikes you only share your public username, so nobody gets into your account, and you pay through a secure checkout. The one risk no seller can remove is Instagram itself: its guidelines discourage artificial followers, and it regularly removes accounts it sees as inactive or inauthentic. That is why every order includes a 6-month refill.',
      },
      {
        id: 'faq-ig-followers-v2-cost',
        question: 'How much do Instagram followers cost?',
        answer: 'Packages start at {fromPrice} for 100 followers, and the price per follower drops as the package gets bigger. Every price is in US dollars and is a one-time payment with no subscription.',
      },
      {
        id: 'faq-ig-followers-v2-ban',
        question: 'Can my account get banned for buying followers?',
        answer: 'We never log in to your account, so nothing changes inside it on our side. Instagram can still remove followers it sees as inauthentic, and its rules discourage artificial growth, so there is always some risk. Choosing a size that fits your profile, gradual delivery and regular posting are the sensible way to use a package.',
      },
      {
        id: 'faq-ig-followers-v2-drop',
        question: 'Why did my follower count drop, and what does the refill cover?',
        answer: 'Instagram regularly removes accounts it considers inactive or inauthentic, so some drop is normal. If followers from your order drop within 6 months of delivery, message us with your order ID and we refill the shortfall. Keep the same username, and keep the profile public while the refill is delivered.',
      },
      {
        id: 'faq-ig-followers-v2-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-ig-followers-v2-howmany',
        question: 'How many Instagram followers should I buy?',
        answer: 'Pick a size that looks natural next to your current count and how often you post. A smaller package is a sensible first order, and you can add more later. Not sure? Message us on WhatsApp and we will help you choose.',
      },
      {
        id: 'faq-ig-followers-v2-payment',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
    fixExisting: {
      "faq-ig-followers-private": 'Yes. Enter your order ID and email on the Track Order page to see the latest status of your order. You can also message us on WhatsApp with your order ID.',
      "faq-ig-followers-track": 'Message us on WhatsApp or by email as soon as possible with your order ID and the correct username, and we will check what can be done. The sooner you tell us the better, because once delivery starts, followers go to the username that was entered.',
    },
  },
  more: {
    id: 'related-instagram-services',
    title: 'Explore Other Instagram Services',
    intro: 'Followers grow the profile. To lift one post or Reel instead, pick a service below.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Buy Instagram Likes',
        line: 'For posts, carousels and Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Buy Instagram Comments',
        line: 'Start the conversation on a post',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
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
        label: 'How to Grow Instagram Followers Organically',
        href: '/learn/how-to-grow-instagram-followers-organically',
      },
      {
        label: 'Why Do Instagram Followers Drop?',
        href: '/learn/why-instagram-followers-drop',
      },
      {
        label: 'Public vs Private Instagram Accounts',
        href: '/learn/public-vs-private-instagram-account',
      },
      {
        label: 'How the Instagram Algorithm Works',
        href: '/learn/how-instagram-algorithm-works',
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
