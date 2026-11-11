import type { ServiceV2Content } from '../../types';

/** UK market (/uk/buy-facebook-page-likes) — v2 service page copy. Primary keyword: "buy facebook page likes uk". Do not edit wording without the content owner. */
export const UK_BUY_FACEBOOK_PAGE_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-page-likes',
    platform: 'Facebook',
    name: 'Facebook Page Likes',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy facebook page likes uk',
      secondary: [
        'facebook page likes uk',
        'buy uk facebook page likes',
        'facebook page likes uk price',
        'buy facebook likes uk',
        'facebook likes for business page uk',
      ],
      questions: [
        'what is the difference between page likes and followers',
        'does my page still show likes',
        'how much do facebook page likes cost in the uk',
        'are the likes from the uk',
        'is it safe to buy facebook page likes uk',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Page Likes',
      tail: 'in the UK',
    },
    subtitle: 'If your Page still shows “likes” under its name, that number is one of the first things a visitor sees. Lift it from {fromPrice}, using just your Page link.',
    trust: [
      'No password needed',
      'UK-registered company',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Page Likes Packages for UK Accounts',
    intro: 'Choose a package. Prices are in US dollars.',
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
      highlight: 'Facebook Page Likes',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'A link, not admin access',
        body: 'Send the public link to your Page. We never need a password, an admin role or a login code.',
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
        body: 'If likes from your order drop within six months of delivery, send us the order ID and we top them back up free of charge.',
      },
      {
        icon: 'thumbs-up',
        tone: 'pink',
        title: 'For Pages that show likes',
        body: 'Page Likes suit older-style Pages that still show likes under the name. Newer Pages show followers, so check yours first.',
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
      highlight: 'Facebook Page Likes in the UK',
    },
    pill: 'Takes about 2 minutes',
    intro: 'Five steps, about two minutes. Check your Page shows likes, then paste its public link.',
    items: [
      {
        ui: 'public',
        title: 'Check what your Page shows',
        body: 'Open the Page in a private browser window. If you see “likes” under the name, Page Likes are right. If you only see followers, choose Facebook Followers.',
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
        title: 'Copy the Page link',
        body: 'Copy your public Page link, such as facebook.com/yourpage, and paste it at checkout. Page Likes work on Pages only, not personal profiles.',
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
      label: 'Unpublished Page',
      sub: 'Off, so visitors can find it',
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
    id: 'choose-a-provider',
    title: {
      lead: 'Choosing a UK',
      highlight: 'Facebook Page Likes Provider',
    },
    intro: 'Lots of sites target UK buyers. Before you pay any of them, check these seven points.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Page link only',
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
    title: 'Refill and Refund Cover on Facebook Page Likes Orders',
    intro: 'Both promises are part of our written refund policy, so they apply to every UK order.',
    cards: [
      {
        chip: '6 months',
        title: 'Six-month refill',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp',
        body: 'If likes from your order drop within six months of the delivery date, send your order ID on WhatsApp or by email and we refill the gap at no cost. Keep the same Page URL, and keep the Page public while a refill is delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy explains what qualifies and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-page-likes-cost-uk',
    title: {
      lead: 'What Do',
      highlight: 'Facebook Page Likes Cost in the UK?',
    },
    intro: 'Page Likes start at {fromPrice}, and each like costs less on the bigger packages. Every price is a one-time payment in US dollars for one Page.',
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
    id: 'why-buy-facebook-page-likes-uk',
    title: {
      lead: 'Why People in the UK Buy',
      highlight: 'Facebook Page Likes',
    },
    intro: 'Many long-standing UK businesses set up their Facebook Page years ago, and it still shows a like count. When that number is low, it can make an established business look small. It works best alongside good content, so read [Facebook followers vs Page likes vs post likes](/learn/facebook-followers-vs-page-likes-vs-post-likes) as well.',
    items: [
      {
        title: 'An older Page that looks current',
        body: 'A Page that has been running for years but shows 80 likes can look forgotten. Likes freshen that first impression.',
      },
      {
        title: 'Trust when people compare',
        body: 'People comparing two local businesses often notice which Page looks more popular.',
      },
      {
        title: 'A stronger base before ads',
        body: 'Pages running Facebook ads look more credible when the like count matches the ad spend.',
      },
    ],
    diagram: [
      'Looks current',
      'Wins the compare',
      'Ad ready',
    ],
  },
  help: {
    id: 'what-facebook-page-likes-can-do',
    title: {
      lead: 'What Facebook Page Likes',
      highlight: 'Can and Can’t Do',
    },
    intro: 'Page Likes change the like count shown on a classic-layout Page. Here is what they do and don’t affect.',
    no: {
      title: 'What stays the same',
      items: [
        'Reactions on individual posts',
        'Your organic reach by themselves',
        'Pages that only show followers (choose Followers instead)',
      ],
    },
    yes: {
      title: 'What changes',
      items: [
        'The like count shown under your Page name',
        'How popular the Page looks to new visitors',
        'The first impression when people compare businesses',
      ],
      image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp',
      altFallback: 'Illustration of facebook page likes on a Facebook page',
    },
  },
  who: {
    id: 'who-buys-uk',
    title: {
      lead: 'Who Buys',
      highlight: 'Facebook Page Likes in the UK',
    },
    cards: [
      {
        title: 'Established local businesses',
        body: 'Garden centres, pubs and family firms with older Pages add likes so the count matches their reputation.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp',
      },
      {
        title: 'Shops and salons',
        body: 'Retailers and salons lift their Page likes before a seasonal push, such as Christmas or a summer sale.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        title: 'Agencies',
        body: 'Agencies tidy up client Pages before a campaign or rebrand, often with gradual delivery.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-why-buy.webp',
      },
    ],
    statement: 'Whether it is a pub in Norwich or a garden centre in Surrey, it works the same way: your public Page link, a package that fits, and likes that usually start within 6–8 hours. No admin access needed.',
  },
  vs: {
    id: 'facebook-page-likes-vs-other-services',
    title: {
      lead: 'Facebook Page Likes vs',
      highlight: 'Followers and Post Likes',
    },
    intro: 'Each service moves a different number. Choose the one people should notice first, or read the [full comparison](/learn/facebook-followers-vs-page-likes-vs-post-likes).',
    cols: [
      'Service',
      'What it changes',
      'What you send us',
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
      lead: 'Is Buying',
      highlight: 'Facebook Page Likes Safe for UK Accounts?',
    },
    lead: 'Three things decide it: what happens to your account, how you pay and what we do with your details. Here is each one, plus the risk no provider can rule out.',
    body: 'Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta removes fake or inactive accounts from time to time. A small drop after delivery can happen, which is why every UK order includes a six-month refill. Gradual delivery and regular posting keep the Page looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We only need the public link to your Page, so nobody needs admin access. We never ask for a password or login code. Anyone claiming to be NovaLikes who asks for one is not us.',
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
      highlight: 'Facebook Page Likes',
    },
    lead: 'Run through these four points and the order goes through without a hitch.',
    items: [
      {
        title: 'Your Page shows likes',
        body: 'Check in a private window. If it only shows followers, Page Likes won’t be visible, so order Followers instead.',
      },
      {
        title: 'It is a Page, not a profile',
        body: 'Page Likes only work on Facebook Pages. Personal profiles need Facebook Followers.',
      },
      {
        title: 'The Page is published',
        body: 'An unpublished or restricted Page stops the order from starting.',
      },
      {
        title: 'The Page URL stays the same',
        body: 'Keep the same Page address during delivery and the six-month refill period.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions UK customers ask about Facebook Page Likes',
    title: 'UK Facebook Page Likes FAQ',
    intro: 'Still unsure? Message our team on WhatsApp at +44 7454 758272, any time.',
    cta: 'Message us on WhatsApp',
    market: {
      code: 'uk',
      idPrefix: 'uk-fb-pl',
    },
    extra: [
      {
        id: 'uk-fb-pl-v2-are-the-likes-from-the-uk',
        question: 'Are the likes from the UK?',
        answer: 'These packages are for UK Pages, but they are not sold as likes from people located in the UK. If you need a specific country, message us on WhatsApp before you order.',
      },
      {
        id: 'uk-fb-pl-v2-my-page-only-shows-followers-which-servi',
        question: 'My Page only shows followers. Which service do I need?',
        answer: 'Choose Facebook Followers. Newer Pages show followers instead of likes, so Page Likes wouldn’t appear on them.',
      },
      {
        id: 'uk-fb-pl-v2-can-i-pay-in-pounds',
        question: 'Can I pay in pounds?',
        answer: 'Prices are set and charged in US dollars. Your card provider shows the charge in pounds, and some UK cards add a small non-sterling fee.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Growth Services for UK Accounts',
    intro: 'Facebook Page Likes move one number. For a different one, pick another service.',
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
    guidesTitle: 'Free guides',
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
    label: 'See Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
