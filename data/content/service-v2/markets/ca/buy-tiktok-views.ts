import type { ServiceV2Content } from '../../types';

/** Canada market (/ca/buy-tiktok-views) — v2 service page copy. Primary keyword: "buy tiktok views canada". Do not edit wording without the content owner. */
export const CA_BUY_TIKTOK_VIEWS_V2 = {
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
      primary: 'buy tiktok views canada',
      secondary: [
        'tiktok views canada',
        'buy canadian tiktok views',
        'tiktok views canada price',
        'buy views on tiktok canada',
        'cheap tiktok views canada (price intent, answered by the cost table; never use "cheap" as a quality claim)',
      ],
      questions: [
        'are the views from canada',
        'do bought views count for creator rewards',
        'how much do tiktok views cost in canada',
        'is it safe to buy tiktok views in canada',
        'high quality vs premium views',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'TikTok Views',
      tail: 'in Canada',
    },
    subtitle: 'A fresh upload stuck at a few hundred views can get swiped past, however good it is. Give it a stronger number from day one. High Quality or Premium views from {fromPrice}.',
    trust: [
      'No password needed',
      '24/7 WhatsApp support',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Views Packages for Canadian Accounts',
    intro: 'Pick a tier and a package. All prices are in US dollars.',
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
        body: 'Wraps up 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'Any time zone',
        body: 'WhatsApp, 24/7',
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
      lead: 'Why Canadian Accounts Pick NovaLikes for',
      highlight: 'TikTok Views',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Only the public link',
        body: 'Paste the public link to the video and that is it. No password, no login code, and nobody gets into your account.',
      },
      {
        icon: 'message-square',
        tone: 'sun',
        title: 'Support in every time zone',
        body: 'From Vancouver to St. John’s, our team answers on WhatsApp 24/7, so you are never waiting for an office to open.',
      },
      {
        icon: 'clock',
        tone: 'lilac',
        title: 'Timing you can plan around',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Place it after work and it is usually moving by breakfast.',
      },
      {
        icon: 'refresh-cw',
        tone: 'peach',
        title: 'Six months of refill cover',
        body: 'If views from your order drop in the six months after delivery, message us your order ID and we refill them at no charge.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'Two tiers to choose from',
        body: 'High Quality is our lowest price per view and Premium is our higher-tier option. Same timing and six-month refill on both.',
      },
    ],
    promo: {
      eyebrow: 'Unsure which size fits?',
      title: 'Ask us before you order',
      cta: 'Message us on WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'How to Order',
      highlight: 'TikTok Views in Canada',
    },
    pill: 'Around 2 minutes',
    intro: 'Five steps: pick High Quality or Premium, choose a size and paste the link to one public video.',
    items: [
      {
        ui: 'public',
        title: 'Leave the video public',
        body: 'Views need a public video on a public account. Keep it posted until the count finishes climbing.',
      },
      {
        ui: 'packages',
        title: 'Select a tier and size',
        body: 'Choose High Quality or Premium, then a quantity. You see the total before checkout.',
      },
      {
        ui: 'cart',
        title: 'Add it to your cart',
        body: 'Tap “Add to Cart” and move on to checkout.',
      },
      {
        ui: 'username',
        title: 'Copy the video address',
        body: 'Tap Share, then Copy link, and paste it at checkout with an email for your receipt.',
      },
      {
        ui: 'pay',
        title: 'Check out once',
        body: 'Pay by card, Apple Pay or Google Pay in US dollars. It is a one-time charge with no subscription.',
      },
    ],
    done: {
      title: 'All set!',
      count: 10000,
      unit: 'views',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Follow along on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private video',
      sub: 'Off until the views arrive',
    },
    chips: [
      '2K',
      '5K',
      '10K',
      '50K',
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
    id: 'choose-a-provider',
    title: {
      lead: 'Comparing',
      highlight: 'TikTok Views Sellers in Canada',
    },
    intro: 'Plenty of sites sell to Canadian accounts. Run any of them past these seven checks before you pay.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Video link only',
        riskySeller: 'Want your password',
      },
      {
        label: 'Timing',
        novalikes: 'Starts in 6–8 hours',
        riskySeller: 'Vague or missing',
      },
      {
        label: 'Drops',
        novalikes: 'Six-month refill',
        riskySeller: 'You’re on your own',
      },
      {
        label: 'Refunds',
        novalikes: '30-day money-back*',
        riskySeller: 'Nothing in writing',
      },
      {
        label: 'Support',
        novalikes: 'WhatsApp, 24/7',
        riskySeller: 'Slow email replies',
      },
      {
        label: 'Company',
        novalikes: 'Registered company, named on the site',
        riskySeller: 'No company details',
      },
      {
        label: 'Price',
        novalikes: 'In USD, shown upfront',
        riskySeller: 'Surprises at checkout',
      },
    ],
    note: '*Applies to eligible orders under our refund policy.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill and Money-Back Cover on Canadian TikTok Views Orders',
    intro: 'Both are written into our refund policy, so every order placed from Canada is covered.',
    cards: [
      {
        chip: '6 months',
        title: 'Six months of refills',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'Lost some views in the six months after delivery? Send your order ID by WhatsApp or email and we make up the difference for free. The video needs to stay posted and public while a refill is on its way.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of purchase. Our refund policy sets out what qualifies and how to request it.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost-ca',
    title: {
      lead: 'How Much Do',
      highlight: 'TikTok Views Cost in Canada?',
    },
    intro: 'Views start at {fromPrice}. High Quality has the lowest price per 1,000 and Premium costs a bit more. Each price is a one-time payment in US dollars for one video.',
    points: [
      'Prices are in US dollars. Your bank converts the charge to Canadian dollars, and many Canadian cards add a foreign transaction fee.',
      'Refills for six months are part of every package.',
      'One payment per order. No renewals.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 views',
    ],
    best: 'Best price per view',
    note: 'Prices are pulled from our live packages. The total at checkout is the total you pay.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-views-ca',
    title: {
      lead: 'Why Canadians Buy',
      highlight: 'TikTok Views',
    },
    intro: 'TikTok viewers swipe fast, and the view count is one of the few things they register before deciding to stay. Views help a new video look like it is already catching on. Pair it with content people enjoy; our guide on [how TikTok video views are counted](/learn/how-tiktok-video-views-are-counted) is a good place to start.',
    items: [
      {
        title: 'Uploads that don’t start cold',
        body: 'A fresh video with a solid count looks worth a few seconds of anyone’s time.',
      },
      {
        title: 'Promos that look proven',
        body: 'Product and promo videos are more convincing when the count shows people have watched them.',
      },
      {
        title: 'A portfolio that sells you',
        body: 'Creators pitching Canadian brands can point to videos with healthy view counts.',
      },
    ],
    diagram: [
      'Not starting cold',
      'Proven promo',
      'Strong portfolio',
    ],
  },
  help: {
    id: 'what-tiktok-views-can-do',
    title: {
      lead: 'Do TikTok Views',
      highlight: 'Actually Help?',
    },
    intro: 'A views package lifts the counter on one video. TikTok still rewards watch time and real reactions.',
    no: {
      title: 'What they won’t do',
      items: [
        'Watch time, likes or shares',
        'Your spot on the For You page',
        'Any Creator Rewards income',
      ],
    },
    yes: {
      title: 'What they will do',
      items: [
        'Views on the exact video you choose',
        'Whether the video looks like it is catching on',
        'How launches and promos first come across',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Illustration of tiktok views on a TikTok video',
    },
  },
  who: {
    id: 'who-buys-ca',
    title: {
      lead: 'Who Orders',
      highlight: 'TikTok Views in Canada',
    },
    cards: [
      {
        title: 'Local businesses',
        body: 'Restaurants, auto shops and salons add views to promo videos they share in their bio and in ads.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Niche creators',
        body: 'Creators add views to new series and formats while they find what their audience likes.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agencies',
        body: 'Agencies running Canadian campaigns add views to launch videos, often with gradual delivery.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'A Hamilton auto shop and a Regina creator follow the same steps: one public video link, your tier and size, and views typically under way within 6–8 hours. No login required.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'TikTok Views Compared With',
      highlight: 'Likes and Followers',
    },
    intro: 'Every service moves a different number. Pick the one visitors should see first, or read the [side-by-side guide](/learn/tiktok-followers-vs-likes-vs-views).',
    cols: [
      'Service',
      'What it moves',
      'What we need',
      'From',
    ],
    rows: [
      {
        slug: 'buy-tiktok-views',
        label: 'Views',
        changes: 'Views on a single video',
        needs: 'The public video link',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Followers',
        changes: 'How many people follow the account',
        needs: 'Your public username',
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Hearts on a single video',
        needs: 'The public video link',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'TikTok Views in Canada?',
    },
    lead: 'Safety comes down to your account, your payment and your data. Here is how we handle each, plus the one risk nobody can take away.',
    body: 'The honest caveat: TikTok’s rules ban fake engagement, and Creator Rewards only pays on views TikTok counts as qualified, so views are never a way to earn money. TikTok also removes inactive accounts, so some views may slip after delivery; Canadian orders carry a six-month refill for that. A strong opening few seconds keeps the numbers believable.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'All we take is the public link to the video, so nobody logs in or touches your settings. NovaLikes never asks for a password or login code, and anyone who does is not us.',
      },
      {
        ui: 'pay',
        title: 'Your payment',
        body: 'You check out securely by card, Apple Pay or Google Pay. It is a single payment in US dollars that never renews.',
      },
      {
        ui: 'privacy',
        title: 'Your details',
        body: 'Your link and email are used only to fill the order and send updates. See our [privacy policy](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'before-you-order',
    title: {
      lead: 'Before You Order',
      highlight: 'TikTok Views',
    },
    lead: 'Check these four things first and your order will run smoothly.',
    items: [
      {
        title: 'Video set to public',
        body: 'Private videos, or videos on private accounts, can’t receive views.',
      },
      {
        title: 'Video link, not profile link',
        body: 'The right address contains /video/.',
      },
      {
        title: 'Video kept online',
        body: 'Keep it posted until the refill window closes.',
      },
      {
        title: 'Tier chosen on purpose',
        body: 'High Quality costs less per view; Premium is the higher-tier option. Ask us if you can’t decide.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions Canadians ask about TikTok Views',
    title: 'TikTok Views FAQ for Canada',
    intro: 'Didn’t find it? Message us on WhatsApp at +44 7454 758272, any hour, any province.',
    cta: 'Chat with us on WhatsApp',
    market: {
      code: 'ca',
      idPrefix: 'ca-tt-v',
    },
    extra: [
      {
        id: 'ca-tt-v-v2-are-the-views-from-canada',
        question: 'Are the views from Canada?',
        answer: 'These packages are made for videos on Canadian accounts, but they are not sold as views from people located in Canada. If you need a specific country, message us on WhatsApp before ordering and we will tell you straight what is possible.',
      },
      {
        id: 'ca-tt-v-v2-do-bought-views-count-toward-creator-rew',
        question: 'Do bought views count toward Creator Rewards?',
        answer: 'Don’t buy views for that. Creator Rewards only pays on views TikTok counts as qualified, and its rules ban fake engagement, so bought views won’t earn money and can put the account at risk.',
      },
      {
        id: 'ca-tt-v-v2-can-i-pay-in-canadian-dollars',
        question: 'Can I pay in Canadian dollars?',
        answer: 'Prices are set and charged in US dollars. Your bank shows the charge in Canadian dollars, and many Canadian cards add a foreign transaction fee, so check with your card issuer if that matters to you.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Canadian Accounts',
    intro: 'TikTok Views change one number. Want to grow a different one? Pick a service below.',
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
    guidesTitle: 'Free guides',
    guides: [
      {
        label: 'How TikTok Video Views Are Counted',
        href: '/learn/how-tiktok-video-views-are-counted',
      },
      {
        label: 'Why Does My TikTok Have 0 Views?',
        href: '/learn/why-does-my-tiktok-have-0-views',
      },
      {
        label: 'How to Get More Views on TikTok',
        href: '/learn/how-to-get-more-views-on-tiktok',
      },
      {
        label: 'TikTok Followers vs Likes vs Views',
        href: '/learn/tiktok-followers-vs-likes-vs-views',
      },
    ],
  },
  sticky: {
    label: 'View Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
