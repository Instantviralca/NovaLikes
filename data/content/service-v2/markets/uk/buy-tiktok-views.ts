import type { ServiceV2Content } from '../../types';

/** UK market (/uk/buy-tiktok-views) — v2 service page copy. Primary keyword: "buy tiktok views uk". Do not edit wording without the content owner. */
export const UK_BUY_TIKTOK_VIEWS_V2 = {
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
      primary: 'buy tiktok views uk',
      secondary: [
        'tiktok views uk',
        'buy uk tiktok views',
        'tiktok views uk price',
        'buy views on tiktok video uk',
        'cheap tiktok views uk (price intent, answered by the cost table; never use "cheap" as a quality claim)',
      ],
      questions: [
        'are the views from the uk',
        'do bought views count for creator rewards',
        'how much do tiktok views cost in the uk',
        'is it safe to buy tiktok views uk',
        'high quality vs premium views',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'TikTok Views',
      tail: 'in the UK',
    },
    subtitle: 'A new upload sitting at a few hundred views can get swiped past, however good it is. Give it a stronger number from the start. High Quality or Premium views from {fromPrice}.',
    trust: [
      'No password needed',
      'UK-registered company',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Views Packages for UK Accounts',
    intro: 'Choose a tier, then a package. Prices are in US dollars.',
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
        body: 'Done 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'UK support',
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
      lead: 'Why UK Accounts Choose NovaLikes for',
      highlight: 'TikTok Views',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'A link is all we ask for',
        body: 'Send the public link to the video. We never need your password or a login code, and nobody signs in to your account.',
      },
      {
        icon: 'building',
        tone: 'sun',
        title: 'A UK company behind every order',
        body: 'NovaLikes is run by THE HOUSE OF VEYNOR LTD, registered in England and Wales (company no. 17561169), with a UK WhatsApp number you can message any time.',
      },
      {
        icon: 'clock',
        tone: 'lilac',
        title: 'Starts while you get on with your day',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Order in the evening and it is usually under way by morning.',
      },
      {
        icon: 'refresh-cw',
        tone: 'peach',
        title: 'Refill for six months',
        body: 'If views from your order drop within six months of delivery, send us the order ID and we top them back up free of charge.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'High Quality or Premium',
        body: 'High Quality is our lowest price per view, Premium is our higher-tier option. Both have the same timing and six-month refill.',
      },
    ],
    promo: {
      eyebrow: 'Not sure what size to pick?',
      title: 'Message our UK team first',
      cta: 'WhatsApp us',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'How to Order',
      highlight: 'TikTok Views in the UK',
    },
    pill: 'Takes about 2 minutes',
    intro: 'Five steps: choose High Quality or Premium, pick a size and paste the link to one public video.',
    items: [
      {
        ui: 'public',
        title: 'Check the video is public',
        body: 'The video has to be public, on a public account, until the views finish arriving.',
      },
      {
        ui: 'packages',
        title: 'Choose the tier and size',
        body: 'Pick High Quality or Premium, then a quantity. The full price shows before you go any further.',
      },
      {
        ui: 'cart',
        title: 'Add it to your basket',
        body: 'Press “Add to Cart”, then head to checkout.',
      },
      {
        ui: 'username',
        title: 'Copy the video link',
        body: 'Tap Share on the video, choose Copy link and paste it at checkout, with an email for your receipt.',
      },
      {
        ui: 'pay',
        title: 'Pay once',
        body: 'Pay by card, Apple Pay or Google Pay. The price is in US dollars, and there is no subscription.',
      },
    ],
    done: {
      title: 'Done!',
      count: 10000,
      unit: 'views',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Check progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private video',
      sub: 'Off until the views land',
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
      lead: 'Choosing a UK',
      highlight: 'TikTok Views Provider',
    },
    intro: 'Lots of sites target UK buyers. Before you pay any of them, check these seven points.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Video link only',
        riskySeller: 'Ask for your password',
      },
      {
        label: 'Who runs it',
        novalikes: 'UK-registered company',
        riskySeller: 'No company details',
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
        novalikes: '24/7 on a UK WhatsApp number',
        riskySeller: 'Email form only',
      },
      {
        label: 'Price',
        novalikes: 'Shown upfront in USD',
        riskySeller: 'Changes at checkout',
      },
    ],
    note: '*On eligible orders, as set out in our refund policy.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill and Refund Cover on TikTok Views Orders',
    intro: 'Both promises are part of our written refund policy, so they apply to every UK order.',
    cards: [
      {
        chip: '6 months',
        title: 'Six-month refill',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'If views from your order drop within six months of the delivery date, send your order ID on WhatsApp or by email and we refill the gap at no cost. Keep the video up and public while a refill is delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy explains what qualifies and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost-uk',
    title: {
      lead: 'What Do',
      highlight: 'TikTok Views Cost in the UK?',
    },
    intro: 'Views start at {fromPrice}. High Quality has the lowest price per 1,000, and Premium costs a little more. Every price is a one-time payment in US dollars for one video.',
    points: [
      'Prices are in US dollars. Your card provider converts the charge to pounds, and some UK cards add a small non-sterling fee.',
      'The six-month refill is included in every price.',
      'You pay once per order. Nothing renews.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 views',
    ],
    best: 'Best price per view',
    note: 'These prices come from our live packages. What you see at checkout is what you pay.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-views-uk',
    title: {
      lead: 'Why People in the UK Buy',
      highlight: 'TikTok Views',
    },
    intro: 'TikTok viewers in the UK swipe quickly, and the view count is one of the few things they take in before deciding to stay. Views help a new video look like it is already being watched. It works best alongside good content, so read [how TikTok video views are counted](/learn/how-tiktok-video-views-are-counted) as well.',
    items: [
      {
        title: 'New uploads that don’t sit at zero',
        body: 'A fresh video with a solid count looks worth a few seconds of anyone’s time.',
      },
      {
        title: 'Ads and promos that look proven',
        body: 'Product and promo videos look more convincing when the count shows people have watched them.',
      },
      {
        title: 'A stronger portfolio',
        body: 'Creators pitching to UK brands can point to videos with healthy view counts.',
      },
    ],
    diagram: [
      'Not at zero',
      'Proven promo',
      'Pitch ready',
    ],
  },
  help: {
    id: 'what-tiktok-views-can-do',
    title: {
      lead: 'What TikTok Views',
      highlight: 'Can and Can’t Do',
    },
    intro: 'Views change the count on one video. TikTok still picks what to push from watch time and real reactions. Here is the honest split.',
    no: {
      title: 'What stays the same',
      items: [
        'Watch time, likes or shares on their own',
        'For You page placement by themselves',
        'Creator Rewards earnings',
      ],
    },
    yes: {
      title: 'What changes',
      items: [
        'The view count on the video you pick',
        'How watched the video looks to new viewers',
        'The first impression of launches and promos',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Illustration of tiktok views on a TikTok video',
    },
  },
  who: {
    id: 'who-buys-uk',
    title: {
      lead: 'Who Buys',
      highlight: 'TikTok Views in the UK',
    },
    cards: [
      {
        title: 'Local businesses',
        body: 'Takeaways, salons and garages add views to promo videos they share in their bio, in ads and on WhatsApp.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Creators building a niche',
        body: 'Creators add views to new formats and series openers while they find what their audience likes.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agencies',
        body: 'Agencies running UK campaigns add views to launch videos, often with gradual delivery for a steadier climb.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'Whether it is a garage in Swansea or a creator in Nottingham, it works the same way: one public video link, the tier and size you choose, and views that usually start within 6–8 hours. No login needed.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'TikTok Views vs',
      highlight: 'Likes and Followers',
    },
    intro: 'Each service moves a different number. Choose the one people should notice first, or read the [full comparison](/learn/tiktok-followers-vs-likes-vs-views).',
    cols: [
      'Service',
      'What it changes',
      'What you send us',
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
      lead: 'Is Buying',
      highlight: 'TikTok Views Safe for UK Accounts?',
    },
    lead: 'Three things decide it: what happens to your account, how you pay and what we do with your details. Here is each one, plus the risk no provider can rule out.',
    body: 'TikTok’s Community Guidelines don’t allow fake engagement, and Creator Rewards only pays on views TikTok counts as qualified, so never buy views to earn money. TikTok also removes inactive accounts, so a small drop can happen after delivery, which is why every UK order includes a six-month refill. A strong hook in the first seconds keeps the numbers looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We only need the public link to the video, so nobody signs in to your account or changes anything. We never ask for a password or login code. Anyone claiming to be NovaLikes who asks for one is not us.',
      },
      {
        ui: 'pay',
        title: 'Your payment',
        body: 'Checkout is secure and takes card, Apple Pay or Google Pay. You pay once in US dollars, and nothing renews.',
      },
      {
        ui: 'privacy',
        title: 'Your details',
        body: 'We use your link and email only to run the order and send updates. Our [privacy policy](/privacy-policy) has the details.',
      },
    ],
  },
  before: {
    id: 'before-you-order',
    title: {
      lead: 'Checklist Before You Order',
      highlight: 'TikTok Views',
    },
    lead: 'Run through these four points and the order goes through without a hitch.',
    items: [
      {
        title: 'The video is public',
        body: 'Views can’t reach a private video or one on a private account.',
      },
      {
        title: 'The link is to the video',
        body: 'Copy it from the video’s Share menu, not your profile.',
      },
      {
        title: 'The video stays up',
        body: 'Keep the video live during delivery and the six-month refill period.',
      },
      {
        title: 'You picked a tier',
        body: 'High Quality is the lower price per view, Premium is our higher-tier option. Unsure? Ask on WhatsApp first.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions UK customers ask about TikTok Views',
    title: 'UK TikTok Views FAQ',
    intro: 'Still unsure? Message our team on WhatsApp at +44 7454 758272, any time.',
    cta: 'Message us on WhatsApp',
    market: {
      code: 'uk',
      idPrefix: 'uk-tt-v',
    },
    extra: [
      {
        id: 'uk-tt-v-v2-are-the-views-from-the-uk',
        question: 'Are the views from the UK?',
        answer: 'These packages are for videos on UK accounts. They are not sold as views from people located in the UK. If you need a specific country, message us on WhatsApp before you order.',
      },
      {
        id: 'uk-tt-v-v2-do-bought-views-count-towards-creator-re',
        question: 'Do bought views count towards Creator Rewards?',
        answer: 'Don’t buy views for that. Creator Rewards only pays on views TikTok counts as qualified, and its rules ban fake engagement, so bought views won’t earn money and can put the account at risk.',
      },
      {
        id: 'uk-tt-v-v2-can-i-pay-in-pounds',
        question: 'Can I pay in pounds?',
        answer: 'Prices are set and charged in US dollars. Your card provider shows the charge in pounds, and some UK cards add a small non-sterling fee.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Growth Services for UK Accounts',
    intro: 'TikTok Views move one number. For a different one, pick another service.',
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
        label: 'TikTok Followers vs Likes vs Views',
        href: '/learn/tiktok-followers-vs-likes-vs-views',
      },
      {
        label: 'How to Get More Views on TikTok',
        href: '/learn/how-to-get-more-views-on-tiktok',
      },
    ],
  },
  sticky: {
    label: 'See Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
