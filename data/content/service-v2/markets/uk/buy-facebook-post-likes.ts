import type { ServiceV2Content } from '../../types';

/** UK market (/uk/buy-facebook-post-likes) — v2 service page copy. Primary keyword: "buy facebook post likes uk". Do not edit wording without the content owner. */
export const UK_BUY_FACEBOOK_POST_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-post-likes',
    platform: 'Facebook',
    name: 'Facebook Post Likes',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy facebook post likes uk',
      secondary: [
        'facebook post likes uk',
        'buy likes on facebook post uk',
        'buy facebook reactions uk',
        'facebook post likes uk price',
        'buy uk facebook post likes',
      ],
      questions: [
        'can i choose love or other reactions',
        'does the post need to be public',
        'how much do facebook post likes cost in the uk',
        'are the likes from the uk',
        'is it safe to buy facebook post likes uk',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Post Likes',
      tail: 'in the UK',
    },
    subtitle: 'An event, an offer or big news deserves more than a couple of reactions. Give one public post the response it should have. From {fromPrice}, with Love and other reactions on request.',
    trust: [
      'No password needed',
      'UK-registered company',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Post Likes Packages for UK Accounts',
    intro: 'Choose a package. Prices are in US dollars.',
    summaryName: '{quantity} Facebook Post Likes',
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
      highlight: 'Facebook Post Likes',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'A link, not admin access',
        body: 'Send the public link to your post. We never need a password, an admin role or a login code.',
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
        title: 'Like, Love and more',
        body: 'Orders arrive as Likes unless you ask otherwise. Want Love or another reaction? Add it in the checkout note before the order starts.',
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
      highlight: 'Facebook Post Likes in the UK',
    },
    pill: 'Takes about 2 minutes',
    intro: 'Five steps and about two minutes. All we need is the link to one public post.',
    items: [
      {
        ui: 'public',
        title: 'Make the post Public',
        body: 'Look for the globe icon beside the post date. Posts shared with Friends or a custom list can’t receive an order.',
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
        title: 'Copy the post link',
        body: 'Open the post, tap Share, choose Copy link and paste it at checkout. Add the reaction you want in the note if it isn’t Like.',
      },
      {
        ui: 'pay',
        title: 'Pay once',
        body: 'Pay by card, Apple Pay or Google Pay. The price is in US dollars, and there is no subscription.',
      },
    ],
    done: {
      title: 'Done!',
      count: 500,
      unit: 'likes',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Check progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Friends-only post',
      sub: 'Off, so the post is Public',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'facebook.com/…/posts/…',
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
      highlight: 'Facebook Post Likes Provider',
    },
    intro: 'Lots of sites target UK buyers. Before you pay any of them, check these seven points.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Post link only',
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
    title: 'Refill and Refund Cover on Facebook Post Likes Orders',
    intro: 'Both promises are part of our written refund policy, so they apply to every UK order.',
    cards: [
      {
        chip: '6 months',
        title: 'Six-month refill',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'If likes from your order drop within six months of the delivery date, send your order ID on WhatsApp or by email and we refill the gap at no cost. Keep the post up and public while a refill is delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy explains what qualifies and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost-uk',
    title: {
      lead: 'What Do',
      highlight: 'Facebook Post Likes Cost in the UK?',
    },
    intro: 'Post Likes start at {fromPrice}, and each like costs less as the package grows. Every price is a one-time payment in US dollars for one post.',
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
    id: 'why-buy-facebook-post-likes-uk',
    title: {
      lead: 'Why People in the UK Buy',
      highlight: 'Facebook Post Likes',
    },
    intro: 'On Facebook, reactions are the quickest sign that a post matters to people. Low numbers on an important update can make it look like nobody cared, even when it was popular in person. It works best alongside good content, so read [how Facebook Page reach works](/learn/how-facebook-page-reach-works) as well.',
    items: [
      {
        title: 'Events that look well attended',
        body: 'Quiz nights, open days and fundraisers look more inviting when the announcement has plenty of reactions.',
      },
      {
        title: 'Offers people notice',
        body: 'Sale and promotion posts with a healthy count look worth stopping for.',
      },
      {
        title: 'Big news that looks celebrated',
        body: 'Openings, anniversaries and awards deserve a response that matches the occasion.',
      },
    ],
    diagram: [
      'Busy event',
      'Noticed offer',
      'Celebrated news',
    ],
  },
  help: {
    id: 'what-facebook-post-likes-can-do',
    title: {
      lead: 'What Facebook Post Likes',
      highlight: 'Can and Can’t Do',
    },
    intro: 'Post Likes change the reactions on one public post. Here is exactly what that does and doesn’t affect.',
    no: {
      title: 'What stays the same',
      items: [
        'Your Page followers or Page likes',
        'Comments or shares on the post',
        'How many people Facebook shows your future posts to',
      ],
    },
    yes: {
      title: 'What changes',
      items: [
        'The reaction count on the post you pick',
        'How popular that post looks to visitors',
        'The first impression of events, offers and news',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Illustration of facebook post likes on a Facebook post',
    },
  },
  who: {
    id: 'who-buys-uk',
    title: {
      lead: 'Who Buys',
      highlight: 'Facebook Post Likes in the UK',
    },
    cards: [
      {
        title: 'Pubs and venues',
        body: 'Pubs, clubs and venues add reactions to quiz nights, live music and match-day posts.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Schools, clubs and charities',
        body: 'Sports clubs, PTAs and charities add reactions to fundraisers and open-day announcements.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Local businesses',
        body: 'Shops and services add reactions to offers and opening news, sometimes as Love instead of Like.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'Whether it is a quiz night in Derby or a fundraiser in Aberdeen, it works the same way: one public post link, the package and reaction you choose, and likes that usually start within 6–8 hours. No login needed.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Facebook Post Likes vs',
      highlight: 'Followers and Page Likes',
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
        slug: 'buy-facebook-post-likes',
        label: 'Post Likes',
        changes: 'Reactions on one public post',
        needs: 'A link to the public post',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'The follower count on a Page or profile',
        needs: 'A link to the Page or profile',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'The like count on a classic-layout Page',
        needs: 'A link to the Page',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is Buying',
      highlight: 'Facebook Post Likes Safe for UK Accounts?',
    },
    lead: 'Three things decide it: what happens to your account, how you pay and what we do with your details. Here is each one, plus the risk no provider can rule out.',
    body: 'Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta removes fake or inactive accounts from time to time. A small drop after delivery can happen, which is why every UK order includes a six-month refill. Keeping reactions in proportion to the post keeps it looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We only need the public link to your post, so nobody needs admin access. We never ask for a password or login code. Anyone claiming to be NovaLikes who asks for one is not us.',
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
      highlight: 'Facebook Post Likes',
    },
    lead: 'Run through these four points and the order goes through without a hitch.',
    items: [
      {
        title: 'The post is Public',
        body: 'Check for the globe icon. Friends-only or custom-audience posts can’t receive an order.',
      },
      {
        title: 'The link is the post itself',
        body: 'Copy it from the post’s Share menu, not your Page link.',
      },
      {
        title: 'You chose the reaction',
        body: 'Likes are the default. For Love or another reaction, add it to the checkout note before the order starts.',
      },
      {
        title: 'The post stays up',
        body: 'Don’t delete the post during delivery or the six-month refill period.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions UK customers ask about Facebook Post Likes',
    title: 'UK Facebook Post Likes FAQ',
    intro: 'Still unsure? Message our team on WhatsApp at +44 7454 758272, any time.',
    cta: 'Message us on WhatsApp',
    market: {
      code: 'uk',
      idPrefix: 'uk-fb-post',
    },
    extra: [
      {
        id: 'uk-fb-post-v2-are-the-likes-from-the-uk',
        question: 'Are the likes from the UK?',
        answer: 'These packages are for posts on UK Pages and profiles. They are not sold as reactions from people located in the UK. If you need a particular country, message us on WhatsApp before ordering.',
      },
      {
        id: 'uk-fb-post-v2-can-i-pay-in-pounds',
        question: 'Can I pay in pounds?',
        answer: 'Prices are set and charged in US dollars. Your card provider shows the charge in pounds, and some UK cards add a small non-sterling fee.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Growth Services for UK Accounts',
    intro: 'Facebook Post Likes move one number. For a different one, pick another service.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Buy Facebook Followers',
        line: 'For Pages and public profiles',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-page-likes',
        title: 'Buy Facebook Page Likes',
        line: 'For Pages with a like count',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
