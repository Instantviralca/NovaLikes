import type { ServiceV2Content } from '../../types';

/** Australia market (/au/buy-instagram-followers) — v2 service page copy. Primary keyword: "buy instagram followers australia". Do not edit wording without the content owner. */
export const AU_BUY_INSTAGRAM_FOLLOWERS_V2 = {
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
      primary: 'buy instagram followers australia',
      secondary: [
        'instagram followers australia',
        'buy australian instagram followers',
        'instagram followers australia price',
        'get more instagram followers australia',
        'cheap instagram followers australia (price intent, answered by the cost table; never use "cheap" as a quality claim)',
      ],
      questions: [
        'are the followers australian',
        'how much do instagram followers cost in australia',
        'can australian businesses buy instagram followers',
        'is it safe to buy instagram followers in australia',
        'why do instagram followers drop',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Followers',
      tail: 'in Australia',
    },
    subtitle: 'For Aussie creators, small businesses and brands who want their Instagram to look as legit as the work behind it. Packages from {fromPrice}, and your handle is all we need.',
    trust: [
      'No password needed',
      'Help on WhatsApp 24/7',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Followers Packages for Australian Accounts',
    intro: 'Pick a package. Prices are listed in US dollars.',
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
      highlight: 'Instagram Followers',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'We work from your handle',
        body: 'Your public username is enough. You never hand over a password or a login code, and your account stays yours.',
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
        body: 'Should followers from your order drop in the six months after delivery, send through your order ID and we replace them free.',
      },
      {
        icon: 'users',
        tone: 'pink',
        title: 'Packages to suit your size',
        body: 'Smaller packages for a brand-new local page, larger ones for an established brand, so the bump sits naturally with your current count.',
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
      highlight: 'Instagram Followers in Australia',
    },
    pill: 'Roughly 2 minutes',
    intro: 'Five easy steps, about two minutes, and the only thing we need is your public Instagram handle.',
    items: [
      {
        ui: 'public',
        title: 'Switch the account to public',
        body: 'Followers can’t be delivered to a private profile. Leave it public until we’re done, then change it back if you want.',
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
        title: 'Pop in your handle',
        body: 'Enter your @username exactly as it shows on Instagram, plus an email so we can send the receipt and updates.',
      },
      {
        ui: 'pay',
        title: 'Pay in one go',
        body: 'Card, Apple Pay or Google Pay all work. The price is in US dollars and there is no subscription.',
      },
    ],
    done: {
      title: 'Sorted!',
      count: 1000,
      unit: 'followers',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Keep an eye on it from the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private account',
      sub: 'Off while we deliver',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
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
    id: 'choose-a-provider',
    title: {
      lead: 'What to Check in an',
      highlight: 'Australian Instagram Followers Provider',
    },
    intro: 'There is no shortage of sites selling to Aussie accounts. Hold any of them up against these seven points before paying.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Handle only',
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
    title: 'Refill and Money-Back Cover for Instagram Followers in Australia',
    intro: 'Both sit in our written refund policy, so they apply to every Australian order.',
    cards: [
      {
        chip: '6 months',
        title: 'Half a year of refills',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
        body: 'Should followers from your order drop within six months of delivery, send the order ID on WhatsApp or by email and we replace what was lost, free. Leave the username as it is, and the profile public, while a refill comes through.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of buying. The refund policy covers what is eligible and how to put in a request.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost-au',
    title: {
      lead: 'What Do',
      highlight: 'Instagram Followers Cost in Australia?',
    },
    intro: 'Followers start at {fromPrice}, and the price per thousand drops as you move up the packages. Each price is a one-time payment in US dollars for one profile.',
    points: [
      'Prices are in US dollars. Your bank converts the charge to Australian dollars, and some Australian cards add an international transaction fee.',
      'Every package includes six months of refills.',
      'You pay once for each order. Nothing rolls over.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 followers',
    ],
    best: 'Best price per follower',
    note: 'These figures come straight from our live packages. The amount at checkout is the amount you pay.',
  },
  whyBuy: {
    id: 'why-buy-instagram-followers-au',
    title: {
      lead: 'Why Aussies Buy',
      highlight: 'Instagram Followers',
    },
    intro: 'Whether people find you through a hashtag, Google Maps or a mate’s story, they size up your profile in a couple of seconds. A follower count that suits your content helps them take you seriously. It does its best work next to good content, so have a look at [how to grow Instagram followers organically](/learn/how-to-grow-instagram-followers-organically) too.',
    items: [
      {
        title: 'A profile that matches the real thing',
        body: 'A café packed every morning but sitting on 80 followers online doesn’t add up. Followers help the profile catch up with reality.',
      },
      {
        title: 'A launch that doesn’t start at zero',
        body: 'New shops, product ranges and rebrands land better when the account already looks lived in.',
      },
      {
        title: 'Collabs that get a reply',
        body: 'Local brands, venues and other creators often check follower numbers before answering a collab DM.',
      },
    ],
    diagram: [
      'Matches reality',
      'Launch ready',
      'Collab ready',
    ],
  },
  help: {
    id: 'what-instagram-followers-can-do',
    title: {
      lead: 'What You Can Expect From',
      highlight: 'Instagram Followers',
    },
    intro: 'A follower package changes one figure on your profile. Here is the honest version of what that means.',
    no: {
      title: 'Not what it does',
      items: [
        'Likes, views or comments on your posts',
        'How Instagram distributes your content',
        'Sales, unless the posts and the offer stack up',
      ],
    },
    yes: {
      title: 'What it does',
      items: [
        'The follower number at the top of your profile',
        'Whether new visitors see an account that looks established',
        'Your first impression with brands and customers',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Illustration of instagram followers on a Instagram profile',
    },
  },
  who: {
    id: 'who-buys-au',
    title: {
      lead: 'Who Grabs',
      highlight: 'Instagram Followers in Australia',
    },
    cards: [
      {
        title: 'Cafés and small shops',
        body: 'Cafés, florists and surf shops add followers so their Instagram looks as busy as the shopfront on a Saturday.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      },
      {
        title: 'Aussie creators',
        body: 'Travel, fitness and food creators use followers to look established while they keep building an audience.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        title: 'Brands and agencies',
        body: 'Agencies launching brand accounts in Australia add followers, usually spread out with gradual delivery.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      },
    ],
    statement: 'From a surf shop on the Gold Coast to a fashion label in Melbourne, the process is the same: give us the handle, choose a package and followers usually start landing within 6–8 hours. We never need your password.',
  },
  vs: {
    id: 'instagram-followers-vs-other-services',
    title: {
      lead: 'Followers Side by Side With',
      highlight: 'Likes, Views and Comments',
    },
    intro: 'Each service shifts a different number. Choose the one people should notice first, or read the [comparison guide](/learn/instagram-followers-vs-likes-vs-views-vs-comments).',
    cols: [
      'Service',
      'What it shifts',
      'What you give us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'The follower total on your profile',
        needs: 'Your public handle',
        current: true,
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Likes under one post or Reel',
        needs: 'A link to that post',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Views',
        changes: 'The view count on one Reel',
        needs: 'A link to that Reel',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Comments',
        changes: 'Comments under one post',
        needs: 'A link to that post',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Instagram Followers in Australia?',
    },
    lead: 'It really comes down to three things: your account, your money and your details. Here is how each is handled, and the one risk that no seller can make disappear.',
    body: 'The one thing no seller can take away: Instagram’s Community Guidelines discourage artificial follower growth, and Instagram regularly prunes accounts it considers inactive or fake. So a few followers can drop off after delivery, and that is what the six-month refill on Australian orders covers. Ordering a size that suits your account, and asking for gradual delivery, keeps it looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We go off your public username, so nobody logs in or changes a thing. NovaLikes will never ask for a password or login code; if someone using our name does, it isn’t us.',
      },
      {
        ui: 'pay',
        title: 'Your payment',
        body: 'Checkout is secure and accepts card, Apple Pay or Google Pay. It is one payment in US dollars that never repeats.',
      },
      {
        ui: 'privacy',
        title: 'Your details',
        body: 'Your username and email are only used to run the order and keep you posted. Our [privacy policy](/privacy-policy) has the detail.',
      },
    ],
  },
  before: {
    id: 'before-you-order',
    title: {
      lead: 'Quick Checks Before You Order',
      highlight: 'Instagram Followers',
    },
    lead: 'Tick off these four and your order should go through without a hitch.',
    items: [
      {
        title: 'Profile set to public',
        body: 'We can’t deliver to a private account. Leave it public until the last follower arrives.',
      },
      {
        title: 'Handle spelled right',
        body: 'Double-check every dot and underscore. Followers go wherever the handle points.',
      },
      {
        title: 'Hang on to the handle',
        body: 'Don’t change your @username until delivery and the six-month refill period are over.',
      },
      {
        title: 'A sensible jump',
        body: 'Choose a package that fits your current numbers and engagement. You can always top up later.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'What Australians ask about Instagram Followers',
    title: 'Instagram Followers FAQ for Australia',
    intro: 'Got another question? WhatsApp us on +44 7454 758272, any time of day or night.',
    cta: 'Ask on WhatsApp',
    market: {
      code: 'au',
      idPrefix: 'au-ig-f',
    },
    extra: [
      {
        id: 'au-ig-f-v2-are-the-followers-from-australia',
        question: 'Are the followers from Australia?',
        answer: 'These packages are built for Australian accounts, but they are not sold as followers from people located in Australia. If you need a particular country, flick us a message on WhatsApp before ordering and we will be upfront about what is possible.',
      },
      {
        id: 'au-ig-f-v2-can-i-pay-in-australian-dollars',
        question: 'Can I pay in Australian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the amount to Australian dollars, and some Australian cards add an international transaction fee, so check with your bank if that matters.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Australian Accounts',
    intro: 'Instagram Followers shift one number. To work on a different one, choose another service.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Buy Instagram Likes',
        line: 'For posts, carousels and Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Buy Instagram Views',
        line: 'More eyes on your Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Buy Instagram Comments',
        line: 'Start the conversation on a post',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
    ],
    cardPrice: 'From {fromPrice}',
    guidesTitle: 'Free guides',
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
    label: 'See the Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
