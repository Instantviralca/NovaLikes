import type { ServiceV2Content } from '../../types';

/** UK market (/uk/buy-tiktok-likes) — v2 service page copy. Primary keyword: "buy tiktok likes uk". Do not edit wording without the content owner. */
export const UK_BUY_TIKTOK_LIKES_V2 = {
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
      primary: 'buy tiktok likes uk',
      secondary: [
        'tiktok likes uk',
        'buy uk tiktok likes',
        'tiktok likes uk price',
        'buy likes on tiktok video uk',
        'buy tiktok hearts uk',
      ],
      questions: [
        'are the likes from the uk',
        'how much do tiktok likes cost in the uk',
        'do tiktok likes help a video go viral',
        'is it safe to buy tiktok likes uk',
        'can i split likes across videos',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'TikTok Likes',
      tail: 'in the UK',
    },
    subtitle: 'The heart count sits right beside your video while it plays. Make sure your launch, collab or best clip has one that fits. From {fromPrice}, ordered with the video link.',
    trust: [
      'No password needed',
      'UK-registered company',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Likes Packages for UK Accounts',
    intro: 'Choose a package. Prices are in US dollars.',
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
        body: 'Done 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'UK support',
        body: 'WhatsApp, 24/7',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Why UK Accounts Choose NovaLikes for',
      highlight: 'TikTok Likes',
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
        body: 'NovaLikes is run by DMRUSH LIMITED, registered in Scotland (company no. SC876437), with a UK WhatsApp number you can message any time.',
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
        body: 'If likes from your order drop within six months of delivery, send us the order ID and we top them back up free of charge.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: 'One video per order',
        body: 'Choose the video that matters most. Each order covers one public video, so delivery and the refill are easy to follow.',
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
      highlight: 'TikTok Likes in the UK',
    },
    pill: 'Takes about 2 minutes',
    intro: 'About two minutes and five steps. We only need the link to one public TikTok video.',
    items: [
      {
        ui: 'public',
        title: 'Check the video is public',
        body: 'The video has to be public, on a public account, until the likes finish arriving. Don’t delete it during the order.',
      },
      {
        ui: 'packages',
        title: 'Choose the size',
        body: 'Pick a quantity from the packages above. The full price shows before you go any further.',
      },
      {
        ui: 'cart',
        title: 'Add it to your basket',
        body: 'Press “Add to Cart”, then head to checkout.',
      },
      {
        ui: 'username',
        title: 'Copy the video link',
        body: 'In TikTok, tap Share on the video, choose Copy link and paste it at checkout with your email for updates.',
      },
      {
        ui: 'pay',
        title: 'Pay once',
        body: 'Pay by card, Apple Pay or Google Pay. The price is in US dollars, and there is no subscription.',
      },
    ],
    done: {
      title: 'Done!',
      count: 1000,
      unit: 'likes',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Check progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private video',
      sub: 'Off until the likes land',
    },
    chips: [
      '200',
      '500',
      '1K',
      '2K',
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
      highlight: 'TikTok Likes Provider',
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
    title: 'Refill and Refund Cover on TikTok Likes Orders',
    intro: 'Both promises are part of our written refund policy, so they apply to every UK order.',
    cards: [
      {
        chip: '6 months',
        title: 'Six-month refill',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'If likes from your order drop within six months of the delivery date, send your order ID on WhatsApp or by email and we refill the gap at no cost. Keep the video up and public while a refill is delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy explains what qualifies and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost-uk',
    title: {
      lead: 'What Do',
      highlight: 'TikTok Likes Cost in the UK?',
    },
    intro: 'Likes start at {fromPrice}, and each like costs less as the package gets bigger. Every price is a one-time payment in US dollars for one video.',
    points: [
      'Prices are in US dollars. Your card provider converts the charge to pounds, and some UK cards add a small non-sterling fee.',
      'The six-month refill is included in every price.',
      'You pay once per order. Nothing renews.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 likes',
    ],
    best: 'Best price per like',
    note: 'These prices come from our live packages. What you see at checkout is what you pay.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-likes-uk',
    title: {
      lead: 'Why People in the UK Buy',
      highlight: 'TikTok Likes',
    },
    intro: 'A TikTok with plenty of views but very few hearts can make viewers wonder what they are missing. Likes keep the numbers in step, so the video looks as good as people found it. It works best alongside good content, so read [TikTok likes vs views](/learn/tiktok-likes-vs-views) as well.',
    items: [
      {
        title: 'Videos that look enjoyed',
        body: 'A healthy heart count tells viewers other people liked what they are watching.',
      },
      {
        title: 'Stronger pinned videos',
        body: 'The three videos pinned to your profile do a lot of work. Likes help them look like your best.',
      },
      {
        title: 'Better links outside TikTok',
        body: 'When you share a TikTok on WhatsApp, Instagram or in an email, a solid like count makes it look worth opening.',
      },
    ],
    diagram: [
      'Looks enjoyed',
      'Pinned videos',
      'Shared links',
    ],
  },
  help: {
    id: 'what-tiktok-likes-can-do',
    title: {
      lead: 'What TikTok Likes',
      highlight: 'Can and Can’t Do',
    },
    intro: 'Likes change the heart count on one video. TikTok still decides reach from how real viewers watch. Here is the honest split.',
    no: {
      title: 'What stays the same',
      items: [
        'Views or followers on their own',
        'For You page placement by themselves',
        'Shares, saves or real comments',
      ],
    },
    yes: {
      title: 'What changes',
      items: [
        'The like count on the video you pick',
        'How enjoyed the video looks to new viewers',
        'How strong pinned and shared videos look',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Illustration of tiktok likes on a TikTok video',
    },
  },
  who: {
    id: 'who-buys-uk',
    title: {
      lead: 'Who Buys',
      highlight: 'TikTok Likes in the UK',
    },
    cards: [
      {
        title: 'Product sellers',
        body: 'TikTok Shop and online sellers add likes to product videos before running them in ads or sharing them with stockists.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Creators',
        body: 'Creators add likes to collab videos and the clips they pin, so the profile leads with videos that look loved.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Venues and events',
        body: 'Bars, comedy clubs and festivals add likes to line-up and atmosphere videos in the run-up to a date.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'Whether it is a comedy club in Glasgow or a candle brand in Kent, it works the same way: one public video link, the package you choose, and likes that usually start within 6–8 hours. No login needed.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'TikTok Likes vs',
      highlight: 'Views and Followers',
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
      lead: 'Is Buying',
      highlight: 'TikTok Likes Safe for UK Accounts?',
    },
    lead: 'Three things decide it: what happens to your account, how you pay and what we do with your details. Here is each one, plus the risk no provider can rule out.',
    body: 'TikTok’s Community Guidelines don’t allow fake engagement, and TikTok removes accounts it sees as inactive or inauthentic. A small drop after delivery can happen, which is why every UK order includes a six-month refill. Keeping likes in proportion to the video’s views keeps it looking natural.',
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
      highlight: 'TikTok Likes',
    },
    lead: 'Run through these four points and the order goes through without a hitch.',
    items: [
      {
        title: 'The video is public',
        body: 'Likes can’t reach a private video or a video on a private account.',
      },
      {
        title: 'The link is to the video',
        body: 'Copy it from the video’s Share menu. It looks like tiktok.com/@name/video/…, not your profile link.',
      },
      {
        title: 'The video stays up',
        body: 'Don’t delete the video during delivery or the six-month refill period, or we can’t refill it.',
      },
      {
        title: 'Likes fit the views',
        body: 'Thousands of likes on a video with a few hundred views looks odd. Pick a size that fits, or add views too.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions UK customers ask about TikTok Likes',
    title: 'UK TikTok Likes FAQ',
    intro: 'Still unsure? Message our team on WhatsApp at +44 7454 758272, any time.',
    cta: 'Message us on WhatsApp',
    market: {
      code: 'uk',
      idPrefix: 'uk-tt-l',
    },
    extra: [
      {
        id: 'uk-tt-l-v2-are-the-likes-from-the-uk',
        question: 'Are the likes from the UK?',
        answer: 'These packages are for videos on UK accounts. They are not sold as likes from people located in the UK. If you need a particular country, message us on WhatsApp before you order.',
      },
      {
        id: 'uk-tt-l-v2-can-i-pay-in-pounds',
        question: 'Can I pay in pounds?',
        answer: 'Prices are set and charged in US dollars. Your card provider shows the charge in pounds, and some UK cards add a small non-sterling fee.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Growth Services for UK Accounts',
    intro: 'TikTok Likes move one number. For a different one, pick another service.',
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
    guidesTitle: 'Free guides',
    guides: [
      {
        label: 'TikTok Likes vs Views',
        href: '/learn/tiktok-likes-vs-views',
      },
      {
        label: 'TikTok Followers vs Likes vs Views',
        href: '/learn/tiktok-followers-vs-likes-vs-views',
      },
      {
        label: 'How TikTok Video Views Are Counted',
        href: '/learn/how-tiktok-video-views-are-counted',
      },
      {
        label: 'Why Do TikTok Followers Drop?',
        href: '/learn/why-tiktok-followers-drop',
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
