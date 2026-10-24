import type { ServiceV2Content } from './types';

/** Facebook Page Likes — v2 service page copy. Primary keyword: "buy facebook page likes". Do not edit wording without the content owner. */
export const BUY_FACEBOOK_PAGE_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-page-likes',
    platform: 'Facebook',
    name: 'Facebook Page Likes',
    unit: 'Page likes',
    unitSingular: 'Page like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy facebook page likes',
      secondary: [
        'facebook page likes packages',
        'buy likes for facebook page',
        'facebook page likes price',
        'facebook fan page likes',
        'increase facebook page likes',
      ],
      questions: [
        'is it safe to buy facebook page likes',
        'how much do facebook page likes cost',
        'should i buy page likes or followers',
        'has facebook removed page likes',
        'do facebook page likes drop',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Page Likes',
      tail: 'to Build Trust in Your Page',
    },
    subtitle: 'On older Facebook Pages, the like count is often the first thing visitors use to judge trust. Build yours from {fromPrice}. Newer Pages show followers instead, so check yours first.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Page Likes Packages & Pricing',
    intro: 'Pick a package. Prices in USD.',
    summaryName: '{quantity} Facebook Page Likes',
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
      highlight: 'Facebook Page Likes?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Just a link, no admin access',
        body: 'We only need the public link to your Page. No password, no admin role and no access to your account.',
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
        body: 'If Page likes from your order drop within 6 months of delivery, send us your order ID and we top them up at no extra cost.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-day money-back guarantee',
        body: 'Eligible orders are covered for 30 days from the purchase date. Our refund policy spells out what counts.',
      },
      {
        icon: 'thumbs-up',
        tone: 'pink',
        title: 'For Pages with a like count',
        body: 'Page Likes suit Pages that still show likes under the Page name. Newer Pages show followers instead, so check yours first.',
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
      highlight: 'Facebook Page Likes',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps and about two minutes. First, check that your Page shows likes. Then all we need is the Page link.',
    items: [
      {
        ui: 'public',
        title: 'Check your Page shows likes',
        body: 'Open your Page in a private window. If it shows “likes” under the name, Page Likes fit. If it only shows followers, choose Facebook Followers.',
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
        title: 'Paste your Page link',
        body: 'Copy your public Page link, like facebook.com/yourpage, and paste it at checkout. Page Likes work on Pages only, not personal profiles.',
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
      unit: 'Page likes',
      body: 'Most orders start within 6–8 hours and finish 4–6 hours later. Follow progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Unpublished Page',
      sub: 'Off, so visitors can reach it',
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
      placeholder: 'facebook.com/yourpage',
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
      highlight: 'Facebook Page Likes Seller',
    },
    intro: 'Whoever you buy from, check these seven things first.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Page link only',
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
    title: 'Refill and Money-Back Promises for Facebook Page Likes',
    intro: 'Both are written into our refund policy, not just this page. Some drop over time is normal on Facebook, and [this guide explains why Facebook Page numbers drop](/learn/why-facebook-page-followers-drop).',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp',
        body: 'If Page likes from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the same Page URL, and keep it public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-page-likes-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'Facebook Page Likes Cost?',
    },
    intro: 'Packages start at {fromPrice} for 100 Page likes, and the price per like drops as the package grows. Every price is a one-time payment in US dollars.',
    points: [
      'The 6-month refill is included. There is nothing extra to add.',
      'No subscription and no renewal. You pay once per order.',
      'Pay by card, Apple Pay or Google Pay.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 Page likes',
    ],
    best: 'Lowest per Page like',
    note: 'Prices come from our live packages. The price you see at checkout is the price you pay.',
  },
  whyBuy: {
    id: 'why-buy-facebook-page-likes',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'Facebook Page Likes?',
    },
    intro: 'On Pages that still use the classic layout, the like count is the first number visitors see. A Page with a few dozen likes can make a real business look new or inactive. A Page likes package brings that number in line with the business behind it. It works best next to good content, so see [how Facebook Page reach works](/learn/how-facebook-page-reach-works) too.',
    items: [
      {
        title: 'A Page visitors trust',
        body: 'People judge a Page by the number under its name. A healthy like count makes a business look established.',
      },
      {
        title: 'Support for an opening or rebrand',
        body: 'New locations, rebrands and relaunched Pages don’t have to start from zero.',
      },
      {
        title: 'A stronger first impression for ads',
        body: 'People who tap through from an ad land on your Page. A healthy count makes that visit more convincing.',
      },
    ],
    diagram: [
      'Trusted Page',
      'Opening support',
      'Ad landings',
    ],
  },
  help: {
    id: 'does-buying-facebook-page-likes-help',
    title: {
      lead: 'Does Buying Facebook Page Likes',
      highlight: 'Help?',
    },
    intro: 'Page likes change the number on Pages that still show it. They don’t change post reach on their own. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'The follower count on newer Pages',
        'Reach, reactions or comments on your posts',
        'Messages, calls or sales on their own',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The like count on a classic-layout Page',
        'How established the Page looks to visitors',
        'The first impression from ads and searches',
      ],
      image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp',
      altFallback: 'Illustration of facebook page likes on a Facebook page',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'Facebook Page Likes',
    },
    cards: [
      {
        title: 'Local businesses',
        body: 'Restaurants, salons and local services with classic Pages use likes so the Page looks as trusted as the business.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp',
      },
      {
        title: 'Organisations & groups',
        body: 'Clubs, charities and community groups use likes to give a long-running Page a stronger first impression.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        title: 'Brands & agencies',
        body: 'Agencies add likes to client Pages before a campaign or rebrand, often with gradual delivery.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-why-buy.webp',
      },
    ],
    statement: 'Whatever the Page, the order works the same way: one public link, a package you choose, and a count that usually starts moving within 6–8 hours. Nobody ever needs your password or admin access.',
  },
  vs: {
    id: 'facebook-page-likes-vs-other-services',
    title: {
      lead: 'Facebook Page Likes vs',
      highlight: 'Followers and Post Likes',
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
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'The like count on a classic-layout Page',
        needs: 'A link to the Page',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'The follower count on a Page or profile',
        needs: 'A link to the Page or profile',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Post Likes',
        changes: 'Reactions on one public post',
        needs: 'A link to the public post',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Facebook Page Likes?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta regularly removes fake or inactive accounts. That is why a small drop can happen after delivery, and why every order includes a 6-month refill. Gradual delivery and regular posting keep your Page looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Account safety',
        body: 'We only need the public link to your Page, so nobody logs in or needs admin access. We never ask for a password or login code. If someone claiming to be NovaLikes does, it is not us.',
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
      highlight: 'Facebook Page Likes',
    },
    lead: 'Check these four things once and your order runs smoothly.',
    items: [
      {
        title: 'Your Page shows likes',
        body: 'Open the Page in a private window. If it only shows followers, [Facebook Followers](/buy-facebook-followers) is the right service instead.',
      },
      {
        title: 'The Page is published',
        body: 'Keep the Page public and published until delivery is complete, or the order can’t start or finish.',
      },
      {
        title: 'The link points to the Page',
        body: 'Copy the Page link itself, like facebook.com/yourpage. Page likes don’t work on personal profiles or single posts.',
      },
      {
        title: 'The URL stays the same',
        body: 'Don’t change the Page username or URL during delivery or the 6-month refill period.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying Facebook Page Likes?',
    title: 'Facebook Page Likes FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-fb-page-likes-v2-is-it-safe-to-buy-facebook-page-likes',
        question: 'Is it safe to buy Facebook Page likes?',
        answer: 'You only share the public Page link, so nobody gets into your account or needs admin access, and you pay through a secure checkout. Facebook’s rules don’t allow inauthentic behaviour and Meta removes fake accounts, so no seller can promise zero risk. That is why every order includes a 6-month refill.',
      },
      {
        id: 'faq-fb-page-likes-v2-can-i-get-a-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-fb-page-likes-v2-which-payment-methods-can-i-use',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Explore More NovaLikes Services',
    intro: 'Facebook Page Likes change one number. To grow a different one, pick a service below.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Buy Facebook Followers',
        line: 'For Pages and public profiles',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Buy Facebook Post Likes',
        line: 'Reactions on one public post',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Buy Instagram Followers',
        line: 'Grow your profile',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
    ],
    cardPrice: 'From {fromPrice}',
    guidesTitle: 'Guides',
    guides: [
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
      {
        label: 'Why Do Facebook Page Followers Drop?',
        href: '/learn/why-facebook-page-followers-drop',
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
