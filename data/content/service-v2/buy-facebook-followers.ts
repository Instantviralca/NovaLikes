import type { ServiceV2Content } from './types';

/** Facebook Followers — v2 service page copy. Primary keyword: "buy facebook followers". Do not edit wording without the content owner. */
export const BUY_FACEBOOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-facebook-followers',
    platform: 'Facebook',
    name: 'Facebook Followers',
    unit: 'followers',
    unitSingular: 'follower',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy facebook followers',
      secondary: [
        'buy facebook page followers',
        'facebook followers packages',
        'facebook profile followers',
        'facebook followers price',
        'grow facebook page followers',
      ],
      questions: [
        'is it safe to buy facebook followers',
        'how much do facebook followers cost',
        'facebook followers vs page likes',
        'can i buy followers for a personal facebook profile',
        'do facebook followers drop',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Followers',
      tail: 'to Grow Your Page or Profile',
    },
    subtitle: 'Followers show people your updates are worth following, on a business Page or a public profile. Grow yours from {fromPrice}, with no password or admin access.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Followers Packages & Pricing',
    intro: 'Pick a package. Prices in USD.',
    summaryName: '{quantity} Facebook Followers',
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
      highlight: 'Facebook Followers?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Just a link, no admin access',
        body: 'We only need the public link to your Page or profile. No password, no admin role and no access to your account.',
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
        icon: 'users',
        tone: 'pink',
        title: 'Pages and profiles',
        body: 'Works for Facebook Pages and for personal profiles with “Who can follow me” set to Public. No admin access needed.',
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
      highlight: 'Facebook Followers',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps and about two minutes. All we need is the link to your public Page or profile.',
    items: [
      {
        ui: 'public',
        title: 'Make following public',
        body: 'Keep the Page published. For a personal profile, set “Who can follow me” to Public in Settings, under Followers and public content.',
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
        body: 'Copy the link to your Page or profile, like facebook.com/yourpage, and paste it at checkout. Add your email for the receipt and updates.',
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
      unit: 'followers',
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
      highlight: 'Facebook Followers Seller',
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
    title: 'Refill and Money-Back Promises for Facebook Followers',
    intro: 'Both are written into our refund policy, not just this page. Some drop over time is normal on Facebook, and [this guide explains why Facebook Page followers drop](/learn/why-facebook-page-followers-drop).',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'If followers from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the same Page URL, and keep it public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'Facebook Followers Cost?',
    },
    intro: 'Packages start at {fromPrice} for 100 followers, and the price per follower drops as the package grows. Every price is a one-time payment in US dollars.',
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
    id: 'why-buy-facebook-followers',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'Facebook Followers?',
    },
    intro: 'On the newer Facebook Page layout, the follower count sits right under the Page name. It is often the first thing people use to judge whether a business or creator is established. A followers package makes that number match the work you put into the Page. It works best next to good content, so see [how to get more Facebook Page followers](/learn/how-to-get-more-facebook-page-followers) too.',
    items: [
      {
        title: 'A Page that looks established',
        body: 'Visitors judge a Page in seconds. A healthy follower count makes a business or creator look trusted.',
      },
      {
        title: 'A head start for a new Page',
        body: 'New business Pages and creator profiles don’t have to sit at a handful of followers while they start posting.',
      },
      {
        title: 'Credibility for partners',
        body: 'Suppliers, venues and brands often check your Page before they reply. A stronger count helps that first look.',
      },
    ],
    diagram: [
      'Established Page',
      'Head start',
      'Partner trust',
    ],
  },
  help: {
    id: 'does-buying-facebook-followers-help',
    title: {
      lead: 'Does Buying Facebook Followers',
      highlight: 'Help?',
    },
    intro: 'Followers change the number on your Page or profile. Facebook still decides post reach from how people interact. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'Reactions, comments or shares on your posts',
        'Post reach by themselves',
        'Messages, calls or sales on their own',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The follower count on your Page or profile',
        'How established the Page looks to new visitors',
        'The first impression for partners and customers',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Illustration of facebook followers on a Facebook page',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'Facebook Followers',
    },
    cards: [
      {
        title: 'Small businesses',
        body: 'Shops, restaurants and local services use followers so their Facebook Page looks as active as the business itself.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Creators & public figures',
        body: 'Creators and public figures with professional mode on use followers to give their profile a stronger first impression.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Brands & agencies',
        body: 'Brands and agencies add followers to new or regional Pages, often with gradual delivery for a steadier look.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'Whatever the Page, the order works the same way: one public link, a package you choose, and a count that usually starts moving within 6–8 hours. Nobody ever needs your password or admin access.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Facebook Followers vs',
      highlight: 'Page Likes and Post Likes',
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
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'The follower count on a Page or profile',
        needs: 'A link to the Page or profile',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'The like count on a classic-layout Page',
        needs: 'A link to the Page',
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
      highlight: 'Facebook Followers?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta regularly removes fake or inactive accounts. That is why some drop can happen after delivery, and why every order includes a 6-month refill. Gradual delivery and regular posting keep your Page’s growth looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Account safety',
        body: 'We only need the public link to your Page or profile, so nobody logs in or needs admin access. We never ask for a password or login code. If someone claiming to be NovaLikes does, it is not us.',
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
      highlight: 'Facebook Followers',
    },
    lead: 'Check these four things once and your order runs smoothly.',
    items: [
      {
        title: 'Following is public',
        body: 'Keep the Page published, or the profile’s “Who can follow me” setting on Public, until delivery is complete.',
      },
      {
        title: 'The link points to the Page',
        body: 'Copy the link to the Page or profile itself, like facebook.com/yourpage, not a post or photo.',
      },
      {
        title: 'The URL stays the same',
        body: 'Don’t change the Page username or URL during delivery or the 6-month refill period, or we can’t find it.',
      },
      {
        title: 'Your Page shows followers',
        body: 'If your Page still shows likes instead of followers, [Facebook Page Likes](/buy-facebook-page-likes) may fit better. Check the number under the Page name.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying Facebook Followers?',
    title: 'Facebook Followers FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-fb-followers-v2-is-it-safe-to-buy-facebook-followers',
        question: 'Is it safe to buy Facebook followers?',
        answer: 'You only share the public link to your Page or profile, so nobody gets into your account or needs admin access, and you pay through a secure checkout. Facebook’s rules don’t allow inauthentic behaviour and Meta removes fake accounts, so no seller can promise zero risk. That is why every order includes a 6-month refill.',
      },
      {
        id: 'faq-fb-followers-v2-how-many-facebook-followers-should-i-buy',
        question: 'How many Facebook followers should I buy?',
        answer: 'Pick a size that looks natural next to your current count and how often you post. A few hundred to 1,000 is a sensible first order for most Pages. You can add more later.',
      },
      {
        id: 'faq-fb-followers-v2-can-i-get-a-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-fb-followers-v2-which-payment-methods-can-i-use',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Explore More NovaLikes Services',
    intro: 'Facebook Followers change one number. To grow a different one, pick a service below.',
    services: [
      {
        slug: 'buy-facebook-page-likes',
        title: 'Buy Facebook Page Likes',
        line: 'For Pages with a like count',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
        label: 'How to Get More Facebook Page Followers',
        href: '/learn/how-to-get-more-facebook-page-followers',
      },
      {
        label: 'Facebook Followers vs Page Likes vs Post Likes',
        href: '/learn/facebook-followers-vs-page-likes-vs-post-likes',
      },
      {
        label: 'Why Do Facebook Page Followers Drop?',
        href: '/learn/why-facebook-page-followers-drop',
      },
      {
        label: 'How Facebook Page Reach Works',
        href: '/learn/how-facebook-page-reach-works',
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
