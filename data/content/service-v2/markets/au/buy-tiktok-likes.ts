import type { ServiceV2Content } from '../../types';

/** Australia market (/au/buy-tiktok-likes) — v2 service page copy. Primary keyword: "buy tiktok likes australia". Do not edit wording without the content owner. */
export const AU_BUY_TIKTOK_LIKES_V2 = {
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
      primary: 'buy tiktok likes australia',
      secondary: [
        'tiktok likes australia',
        'buy australian tiktok likes',
        'tiktok likes australia price',
        'buy likes on a tiktok video australia',
        'buy tiktok hearts australia',
      ],
      questions: [
        'are the likes from australia',
        'how much do tiktok likes cost in australia',
        'do likes help a tiktok go viral',
        'is it safe to buy tiktok likes in australia',
        'can i split likes between videos',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'TikTok Likes',
      tail: 'in Australia',
    },
    subtitle: 'The heart count sits beside your video the whole time it plays. Make sure your launch, collab or best clip has one that fits. From {fromPrice}, with the video link.',
    trust: [
      'No password needed',
      'Help on WhatsApp 24/7',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'TikTok Likes Packages for Australian Accounts',
    intro: 'Pick a package. Prices are listed in US dollars.',
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
        body: 'Complete 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'Help any hour',
        body: 'WhatsApp, 24/7',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Why Australian Accounts Go With NovaLikes for',
      highlight: 'TikTok Likes',
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
        body: 'Should likes from your order drop in the six months after delivery, send through your order ID and we replace them free.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: 'One video per order',
        body: 'Choose the video that counts. Each order covers one public video, which keeps delivery and refills easy to follow.',
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
      highlight: 'TikTok Likes in Australia',
    },
    pill: 'Roughly 2 minutes',
    intro: 'Five steps, a couple of minutes. We only need the link to one public TikTok video.',
    items: [
      {
        ui: 'public',
        title: 'Keep the video public',
        body: 'It needs to be public, on a public account, until the likes are in. Don’t delete it mid-order.',
      },
      {
        ui: 'packages',
        title: 'Pick your amount',
        body: 'Go with a quantity from the packages above. The price is shown before you commit.',
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
      count: 500,
      unit: 'likes',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Keep an eye on it from the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private video',
      sub: 'Off while the likes land',
    },
    chips: [
      '200',
      '500',
      '1K',
      '2K',
    ],
    chipOn: 1,
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
      highlight: 'Australian TikTok Likes Provider',
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
    title: 'Refill and Money-Back Cover for TikTok Likes in Australia',
    intro: 'Both sit in our written refund policy, so they apply to every Australian order.',
    cards: [
      {
        chip: '6 months',
        title: 'Half a year of refills',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'Should likes from your order drop within six months of delivery, send the order ID on WhatsApp or by email and we replace what was lost, free. Leave the video up and public while a refill comes through.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of buying. The refund policy covers what is eligible and how to put in a request.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost-au',
    title: {
      lead: 'What Do',
      highlight: 'TikTok Likes Cost in Australia?',
    },
    intro: 'Likes start at {fromPrice}, and the cost per like drops as the package grows. Each price is a one-time payment in US dollars for one video.',
    points: [
      'Prices are in US dollars. Your bank converts the charge to Australian dollars, and some Australian cards add an international transaction fee.',
      'Every package includes six months of refills.',
      'You pay once for each order. Nothing rolls over.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 likes',
    ],
    best: 'Best price per like',
    note: 'These figures come straight from our live packages. The amount at checkout is the amount you pay.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-likes-au',
    title: {
      lead: 'Why Aussies Buy',
      highlight: 'TikTok Likes',
    },
    intro: 'A TikTok with heaps of views but hardly any hearts can make viewers wonder what they are missing. Likes keep the numbers in step so the video looks as good as people found it. It does its best work next to good content, so have a look at [TikTok likes vs views](/learn/tiktok-likes-vs-views) too.',
    items: [
      {
        title: 'Clips that look loved',
        body: 'A healthy heart count tells viewers others enjoyed the video too.',
      },
      {
        title: 'Pinned videos that pull their weight',
        body: 'Your three pinned videos are the first thing visitors see. Likes help them look like your best.',
      },
      {
        title: 'Better shares off TikTok',
        body: 'A TikTok sent by text, email or Instagram looks more worth opening with a decent like count.',
      },
    ],
    diagram: [
      'Looks loved',
      'Pinned videos',
      'Better shares',
    ],
  },
  help: {
    id: 'what-tiktok-likes-can-do',
    title: {
      lead: 'What You Can Expect From',
      highlight: 'TikTok Likes',
    },
    intro: 'Likes move the heart count on one video. TikTok still decides reach from how real viewers watch.',
    no: {
      title: 'Not what it does',
      items: [
        'Views or followers',
        'Your place on the For You page',
        'Shares, saves or genuine comments',
      ],
    },
    yes: {
      title: 'What it does',
      items: [
        'The like count on the video you pick',
        'Whether the clip looks well liked',
        'How pinned and shared videos come across',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Illustration of tiktok likes on a TikTok video',
    },
  },
  who: {
    id: 'who-buys-au',
    title: {
      lead: 'Who Grabs',
      highlight: 'TikTok Likes in Australia',
    },
    cards: [
      {
        title: 'Product brands',
        body: 'Skincare, activewear and snack brands add likes to product videos before running them as ads.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Creators',
        body: 'Creators add likes to collab clips and the videos pinned to the top of their profile.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Pubs, clubs and events',
        body: 'Pubs, comedy nights and festivals add likes to line-up and atmosphere videos before the big night.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'From a comedy night in Geelong to an activewear brand in Sydney, it runs the same way: one public video link, the package you want, and likes usually rolling within 6–8 hours. No login needed.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'TikTok Likes Side by Side With',
      highlight: 'Views and Followers',
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
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'The heart count on one video',
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
        slug: 'buy-tiktok-views',
        label: 'Views',
        changes: 'The view count on one video',
        needs: 'A link to that video',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'TikTok Likes in Australia?',
    },
    lead: 'It really comes down to three things: your account, your money and your details. Here is how each is handled, and the one risk that no seller can make disappear.',
    body: 'The one thing no seller can take away: TikTok’s Community Guidelines don’t allow fake engagement, and TikTok prunes inactive or inauthentic accounts. A few likes can drop after delivery, which the six-month refill on Australian orders covers. Keeping hearts in line with the view count looks most natural.',
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
      highlight: 'TikTok Likes',
    },
    lead: 'Tick off these four and your order should go through without a hitch.',
    items: [
      {
        title: 'Video is public',
        body: 'Likes can’t reach a private video, or a video on a private account.',
      },
      {
        title: 'It’s the video link',
        body: 'Copy it from the Share menu. It contains /video/.',
      },
      {
        title: 'Video stays up',
        body: 'Don’t delete it before the six-month refill period ends.',
      },
      {
        title: 'Likes in proportion',
        body: 'A like count way above the views looks off. Size it sensibly, or add views.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'What Australians ask about TikTok Likes',
    title: 'TikTok Likes FAQ for Australia',
    intro: 'Got another question? WhatsApp us on +44 7454 758272, any time of day or night.',
    cta: 'Ask on WhatsApp',
    market: {
      code: 'au',
      idPrefix: 'au-tt-l',
    },
    extra: [
      {
        id: 'au-tt-l-v2-are-the-likes-from-australia',
        question: 'Are the likes from Australia?',
        answer: 'These packages are built for videos on Australian accounts, but they are not sold as likes from people located in Australia. If you need a particular country, flick us a message on WhatsApp before ordering and we will be upfront about what is possible.',
      },
      {
        id: 'au-tt-l-v2-can-i-pay-in-australian-dollars',
        question: 'Can I pay in Australian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the amount to Australian dollars, and some Australian cards add an international transaction fee, so check with your bank if that matters.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Australian Accounts',
    intro: 'TikTok Likes shift one number. To work on a different one, choose another service.',
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
        label: 'How to Get More Views on TikTok',
        href: '/learn/how-to-get-more-views-on-tiktok',
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
