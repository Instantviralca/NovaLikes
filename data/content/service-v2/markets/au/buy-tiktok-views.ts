import type { ServiceV2Content } from '../../types';

/** Australia market (/au/buy-tiktok-views) — v2 service page copy. Primary keyword: "buy tiktok views australia". Do not edit wording without the content owner. */
export const AU_BUY_TIKTOK_VIEWS_V2 = {
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
      primary: 'buy tiktok views australia',
      secondary: [
        'tiktok views australia',
        'buy australian tiktok views',
        'tiktok views australia price',
        'buy views on tiktok australia',
        'cheap tiktok views australia (price intent, answered by the cost table; never use "cheap" as a quality claim)',
      ],
      questions: [
        'are the views from australia',
        'do bought views count for creator rewards',
        'how much do tiktok views cost in australia',
        'is it safe to buy tiktok views in australia',
        'high quality vs premium views',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'TikTok Views',
      tail: 'in Australia',
    },
    subtitle: 'A new upload sitting on a few hundred views can get flicked past, no matter how good it is. Give it a stronger number from the start. High Quality or Premium views from {fromPrice}.',
    trust: [
      'No password needed',
      'Help on WhatsApp 24/7',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Views Packages for Australian Accounts',
    intro: 'Pick a tier, then a package. Prices are listed in US dollars.',
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
        body: 'Complete 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'Help any hour',
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
      lead: 'Why Australian Accounts Go With NovaLikes for',
      highlight: 'TikTok Views',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'We work from the link',
        body: 'The public link to the video is enough. You never hand over a password or a login code, and your account stays yours.',
      },
      {
        icon: 'message-square',
        tone: 'sun',
        title: 'Help from Perth to Brisbane',
        body: 'Whatever the time on your clock, our team is on WhatsApp 24/7, so a question at midnight still gets an answer.',
      },
      {
        icon: 'clock',
        tone: 'lilac',
        title: 'A start time you can count on',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Order at lunchtime and it is usually rolling by dinner.',
      },
      {
        icon: 'refresh-cw',
        tone: 'peach',
        title: 'Refills for half a year',
        body: 'Should views from your order drop in the six months after delivery, send through your order ID and we replace them free.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'Pick High Quality or Premium',
        body: 'High Quality is our lowest price per view and Premium is our higher-tier option. Both get the same timing and six-month refill.',
      },
    ],
    promo: {
      eyebrow: 'Can’t decide on a size?',
      title: 'Have a chat with us first',
      cta: 'Open WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'How to Order',
      highlight: 'TikTok Views in Australia',
    },
    pill: 'Roughly 2 minutes',
    intro: 'Five steps: choose High Quality or Premium, pick an amount and paste the link to one public video.',
    items: [
      {
        ui: 'public',
        title: 'Keep the video public',
        body: 'It needs to be public, on a public account, until the views are delivered.',
      },
      {
        ui: 'packages',
        title: 'Pick your tier and amount',
        body: 'Go with High Quality or Premium, then a quantity. The price is shown before you commit.',
      },
      {
        ui: 'cart',
        title: 'Pop it in your cart',
        body: 'Hit “Add to Cart”, then head through to checkout.',
      },
      {
        ui: 'username',
        title: 'Copy the video link',
        body: 'Tap Share on the video, choose Copy link and paste it at checkout with your email.',
      },
      {
        ui: 'pay',
        title: 'Pay in one go',
        body: 'Card, Apple Pay or Google Pay all work. The price is in US dollars and there is no subscription.',
      },
    ],
    done: {
      title: 'Sorted!',
      count: 10000,
      unit: 'views',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Keep an eye on it from the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private video',
      sub: 'Off while the views land',
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
      lead: 'What to Check in an',
      highlight: 'Australian TikTok Views Provider',
    },
    intro: 'There is no shortage of sites selling to Aussie accounts. Hold any of them up against these seven points before paying.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Video link only',
        riskySeller: 'Ask you to log in',
      },
      {
        label: 'Start time',
        novalikes: 'Within 6–8 hours',
        riskySeller: 'No start time given',
      },
      {
        label: 'If numbers drop',
        novalikes: 'Six-month refill',
        riskySeller: 'Bad luck',
      },
      {
        label: 'Refunds',
        novalikes: '30-day money-back*',
        riskySeller: 'No policy anywhere',
      },
      {
        label: 'Getting help',
        novalikes: 'WhatsApp, 24/7',
        riskySeller: 'Contact form only',
      },
      {
        label: 'Who you deal with',
        novalikes: 'A registered company named on the site',
        riskySeller: 'Anonymous',
      },
      {
        label: 'Pricing',
        novalikes: 'In USD, listed upfront',
        riskySeller: 'Extras added at checkout',
      },
    ],
    note: '*For eligible orders, as described in our refund policy.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill and Money-Back Cover for TikTok Views in Australia',
    intro: 'Both sit in our written refund policy, so they apply to every Australian order.',
    cards: [
      {
        chip: '6 months',
        title: 'Half a year of refills',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'Should views from your order drop within six months of delivery, send the order ID on WhatsApp or by email and we replace what was lost, free. Leave the video up and public while a refill comes through.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of buying. The refund policy covers what is eligible and how to put in a request.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost-au',
    title: {
      lead: 'What Do',
      highlight: 'TikTok Views Cost in Australia?',
    },
    intro: 'Views start at {fromPrice}. High Quality has the lowest price per 1,000 and Premium costs a little more. Each price is a one-time payment in US dollars for one video.',
    points: [
      'Prices are in US dollars. Your bank converts the charge to Australian dollars, and some Australian cards add an international transaction fee.',
      'Every package includes six months of refills.',
      'You pay once for each order. Nothing rolls over.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 views',
    ],
    best: 'Best price per view',
    note: 'These figures come straight from our live packages. The amount at checkout is the amount you pay.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-views-au',
    title: {
      lead: 'Why Aussies Buy',
      highlight: 'TikTok Views',
    },
    intro: 'People flick through TikTok quickly, and the view count is one of the few things they clock before deciding to stay. Views help a new video look like it is already taking off. It does its best work next to good content, so have a look at [how TikTok video views are counted](/learn/how-tiktok-video-views-are-counted) too.',
    items: [
      {
        title: 'Uploads that don’t start from scratch',
        body: 'A new video with a solid count looks worth a few seconds of anyone’s time.',
      },
      {
        title: 'Promos that look proven',
        body: 'Product and promo videos are more convincing when the count shows people have watched.',
      },
      {
        title: 'A portfolio that pitches for you',
        body: 'Creators approaching Australian brands can point to videos with healthy view counts.',
      },
    ],
    diagram: [
      'Not from scratch',
      'Proven promo',
      'Pitch portfolio',
    ],
  },
  help: {
    id: 'what-tiktok-views-can-do',
    title: {
      lead: 'What You Can Expect From',
      highlight: 'TikTok Views',
    },
    intro: 'Views move the counter on one video. TikTok still rewards watch time and real reactions.',
    no: {
      title: 'Not what it does',
      items: [
        'Watch time, likes or shares',
        'Your place on the For You page',
        'Any Creator Rewards income',
      ],
    },
    yes: {
      title: 'What it does',
      items: [
        'The view count on the video you pick',
        'Whether the video looks like it is catching on',
        'How launches and promos first come across',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Illustration of tiktok views on a TikTok video',
    },
  },
  who: {
    id: 'who-buys-au',
    title: {
      lead: 'Who Grabs',
      highlight: 'TikTok Views in Australia',
    },
    cards: [
      {
        title: 'Local businesses',
        body: 'Food trucks, salons and mechanics add views to promo videos they share in their bio and ads.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Creators finding a niche',
        body: 'Creators add views to new series and formats while they work out what their audience likes.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agencies',
        body: 'Agencies running Australian campaigns add views to launch videos, often with gradual delivery.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'From a mechanic in Townsville to a creator in Cairns, it runs the same way: one public video link, the tier and amount you want, and views usually rolling within 6–8 hours. No login needed.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'TikTok Views Side by Side With',
      highlight: 'Likes and Followers',
    },
    intro: 'Each service shifts a different number. Choose the one people should notice first, or read the [comparison guide](/learn/tiktok-followers-vs-likes-vs-views).',
    cols: [
      'Service',
      'What it shifts',
      'What you give us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-tiktok-views',
        label: 'Views',
        changes: 'The view count on one video',
        needs: 'A link to that video',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Followers',
        changes: 'The follower total on your account',
        needs: 'Your public handle',
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'The heart count on one video',
        needs: 'A link to that video',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'TikTok Views in Australia?',
    },
    lead: 'It really comes down to three things: your account, your money and your details. Here is how each is handled, and the one risk that no seller can make disappear.',
    body: 'The one thing no seller can take away: TikTok’s Community Guidelines don’t allow fake engagement, and Creator Rewards only pays on views TikTok counts as qualified, so views are never a way to make money. TikTok also prunes inactive accounts, so some views may drop after delivery, which the six-month refill on Australian orders covers. A strong first few seconds keeps the numbers looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We go off the public link to the video, so nobody logs in or changes a thing. NovaLikes will never ask for a password or login code; if someone using our name does, it isn’t us.',
      },
      {
        ui: 'pay',
        title: 'Your payment',
        body: 'Checkout is secure and accepts card, Apple Pay or Google Pay. It is one payment in US dollars that never repeats.',
      },
      {
        ui: 'privacy',
        title: 'Your details',
        body: 'Your link and email are only used to run the order and keep you posted. Our [privacy policy](/privacy-policy) has the detail.',
      },
    ],
  },
  before: {
    id: 'before-you-order',
    title: {
      lead: 'Quick Checks Before You Order',
      highlight: 'TikTok Views',
    },
    lead: 'Tick off these four and your order should go through without a hitch.',
    items: [
      {
        title: 'Video is public',
        body: 'Views can’t reach a private video, or a video on a private account.',
      },
      {
        title: 'It’s the video link',
        body: 'Copy it from the Share menu, not your profile.',
      },
      {
        title: 'Video stays up',
        body: 'Keep it posted until the six-month refill period ends.',
      },
      {
        title: 'Tier picked on purpose',
        body: 'High Quality costs less per view; Premium is the higher-tier option. Not sure? Ask on WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'What Australians ask about TikTok Views',
    title: 'TikTok Views FAQ for Australia',
    intro: 'Got another question? WhatsApp us on +44 7454 758272, any time of day or night.',
    cta: 'Ask on WhatsApp',
    market: {
      code: 'au',
      idPrefix: 'au-tt-v',
    },
    extra: [
      {
        id: 'au-tt-v-v2-are-the-views-from-australia',
        question: 'Are the views from Australia?',
        answer: 'These packages are built for videos on Australian accounts, but they are not sold as views from people located in Australia. If you need a particular country, flick us a message on WhatsApp before ordering and we will be upfront about what is possible.',
      },
      {
        id: 'au-tt-v-v2-do-bought-views-count-towards-creator-re',
        question: 'Do bought views count towards Creator Rewards?',
        answer: 'Don’t buy views for that. Creator Rewards only pays on views TikTok counts as qualified, and its rules ban fake engagement, so bought views won’t earn money and can put the account at risk.',
      },
      {
        id: 'au-tt-v-v2-can-i-pay-in-australian-dollars',
        question: 'Can I pay in Australian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the amount to Australian dollars, and some Australian cards add an international transaction fee, so check with your bank if that matters.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Australian Accounts',
    intro: 'TikTok Views shift one number. To work on a different one, choose another service.',
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
    label: 'See the Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
