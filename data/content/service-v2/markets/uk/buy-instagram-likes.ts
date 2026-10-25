import type { ServiceV2Content } from '../../types';

/** UK market (/uk/buy-instagram-likes) — v2 service page copy. Primary keyword: "buy instagram likes uk". Do not edit wording without the content owner. */
export const UK_BUY_INSTAGRAM_LIKES_V2 = {
  meta: {
    slug: 'buy-instagram-likes',
    platform: 'Instagram',
    name: 'Instagram Likes',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy instagram likes uk',
      secondary: [
        'instagram likes uk',
        'buy uk instagram likes',
        'buy likes on instagram uk',
        'instagram reel likes uk',
        'cheap instagram likes uk (price intent, answered by the cost table; never use "cheap" as a quality claim)',
      ],
      questions: [
        'are the likes from uk accounts',
        'how much do instagram likes cost in the uk',
        'can i buy likes for an instagram reel',
        'is it safe to buy instagram likes uk',
        'do bought instagram likes go away',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Likes',
      tail: 'in the UK',
    },
    subtitle: 'Give a new collection, a weekend offer or your best Reel a like count that matches the effort behind it. Packages from {fromPrice}, ordered with the post link.',
    trust: [
      'No password needed',
      'UK-registered company',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Likes Packages for UK Accounts',
    intro: 'Choose a package. Prices are in US dollars.',
    summaryName: '{quantity} Instagram Likes',
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
      highlight: 'Instagram Likes',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'A link is all we ask for',
        body: 'Send the public link to the post or Reel. We never need your password or a login code, and nobody signs in to your account.',
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
        icon: 'image',
        tone: 'pink',
        title: 'Photos, carousels and Reels',
        body: 'Any public post works, from a single product shot to a carousel or a Reel. One order covers one post.',
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
      highlight: 'Instagram Likes in the UK',
    },
    pill: 'Takes about 2 minutes',
    intro: 'It takes about two minutes and five steps. The only thing we need is the link to one public post or Reel.',
    items: [
      {
        ui: 'public',
        title: 'Check the post is public',
        body: 'The post has to sit on a public account until the likes finish arriving. Don’t archive or delete it while the order runs.',
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
        body: 'Tap the three dots or the share icon on the post, choose Copy link and paste it at checkout, with an email for your receipt.',
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
      label: 'Private account',
      sub: 'Off until the likes land',
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
      placeholder: 'instagram.com/p/…',
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
      highlight: 'Instagram Likes Provider',
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
    title: 'Refill and Refund Cover on Instagram Likes Orders',
    intro: 'Both promises are part of our written refund policy, so they apply to every UK order.',
    cards: [
      {
        chip: '6 months',
        title: 'Six-month refill',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'If likes from your order drop within six months of the delivery date, send your order ID on WhatsApp or by email and we refill the gap at no cost. Keep the post or Reel up and public while a refill is delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy explains what qualifies and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost-uk',
    title: {
      lead: 'What Do',
      highlight: 'Instagram Likes Cost in the UK?',
    },
    intro: 'Likes start at {fromPrice}, and the cost of each like falls as the package grows. Each price is a one-time payment in US dollars for one post or Reel.',
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
    id: 'why-buy-instagram-likes-uk',
    title: {
      lead: 'Why People in the UK Buy',
      highlight: 'Instagram Likes',
    },
    intro: 'Most people scrolling in the UK decide in a second whether a post is worth a look, and the like count is part of that judgement. Likes help the posts that matter most to your business or brand get a fair first glance. It works best alongside good content, so read [how the Instagram algorithm works](/learn/how-instagram-algorithm-works) as well.',
    items: [
      {
        title: 'Offers that don’t look ignored',
        body: 'A Black Friday post or a new menu with a handful of likes can look like nobody noticed. A healthier count fixes that first impression.',
      },
      {
        title: 'A grid that looks consistent',
        body: 'If last month’s posts got hundreds of likes and this week’s got twelve, the profile looks uneven. Likes smooth out the gaps.',
      },
      {
        title: 'Posts worth sharing on',
        body: 'People are more willing to send a post to a friend when it already looks popular.',
      },
    ],
    diagram: [
      'Offer noticed',
      'Consistent grid',
      'Shareable post',
    ],
  },
  help: {
    id: 'what-instagram-likes-can-do',
    title: {
      lead: 'What Instagram Likes',
      highlight: 'Can and Can’t Do',
    },
    intro: 'Likes change the count under one post. Here is the plain truth about what they move and what they leave alone.',
    no: {
      title: 'What stays the same',
      items: [
        'Your followers, views or comments',
        'Explore or Reels placement on their own',
        'Footfall or sales without a strong post and offer',
      ],
    },
    yes: {
      title: 'What changes',
      items: [
        'The like count on the post or Reel you pick',
        'How popular that post looks to new visitors',
        'The first impression of offers and launches',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Illustration of instagram likes on a Instagram post',
    },
  },
  who: {
    id: 'who-buys-uk',
    title: {
      lead: 'Who Buys',
      highlight: 'Instagram Likes in the UK',
    },
    cards: [
      {
        title: 'Restaurants and takeaways',
        body: 'Food spots from Glasgow to Brighton add likes to new menu and special-offer posts so they look busy from the first hour.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Online sellers',
        body: 'Etsy and Shopify sellers boost likes on product launches and restock posts before sharing them in stories and ads.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Creators and agencies',
        body: 'Creators and agencies add likes to collab and campaign posts, often spread out with gradual delivery.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'From a chip shop in Cardiff to a skincare brand in Manchester, it works the same way: one public post link, the package you choose, and likes that usually start within 6–8 hours. No login, ever.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Likes vs',
      highlight: 'Followers, Views and Comments',
    },
    intro: 'Each service moves a different number. Choose the one people should notice first, or read the [full comparison](/learn/instagram-followers-vs-likes-vs-views-vs-comments).',
    cols: [
      'Service',
      'What it changes',
      'What you send us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'The like count on one post or Reel',
        needs: 'A link to the public post',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'The follower count on your profile',
        needs: 'Your public @username',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Views',
        changes: 'The view count on one Reel or video',
        needs: 'A link to the public Reel',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Comments',
        changes: 'Comments on one public post',
        needs: 'A link to the public post',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is Buying',
      highlight: 'Instagram Likes Safe for UK Accounts?',
    },
    lead: 'Three things decide it: what happens to your account, how you pay and what we do with your details. Here is each one, plus the risk no provider can rule out.',
    body: 'Instagram’s Community Guidelines discourage collecting likes artificially, and Instagram removes accounts it judges inactive or fake from time to time. A small drop after delivery can happen, which is why every UK order includes a six-month refill. A size that suits the post, plus gradual delivery if you want it, keeps the count looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We only need the public link to the post or Reel, so nobody signs in to your account or changes anything. We never ask for a password or login code. Anyone claiming to be NovaLikes who asks for one is not us.',
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
      highlight: 'Instagram Likes',
    },
    lead: 'Run through these four points and the order goes through without a hitch.',
    items: [
      {
        title: 'The account is public',
        body: 'Likes can’t reach a post on a private account. Keep it public until the order finishes.',
      },
      {
        title: 'You copied the post link',
        body: 'Use the link from the post itself, which looks like instagram.com/p/… or instagram.com/reel/…, not your profile link.',
      },
      {
        title: 'The post stays live',
        body: 'Archiving or deleting the post during delivery or the six-month refill period means we can’t top it up.',
      },
      {
        title: 'Like counts are showing',
        body: 'If you hid the like count on the post, the likes still arrive but visitors won’t see them. Turn the count back on to get the benefit.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions UK customers ask about Instagram Likes',
    title: 'UK Instagram Likes FAQ',
    intro: 'Still unsure? Message our team on WhatsApp at +44 7454 758272, any time.',
    cta: 'Message us on WhatsApp',
    market: {
      code: 'uk',
      idPrefix: 'uk-ig-l',
    },
    extra: [
      {
        id: 'uk-ig-l-v2-are-the-likes-from-uk-accounts',
        question: 'Are the likes from UK accounts?',
        answer: 'These packages are for posts on UK accounts. They are not sold as likes from people located in the UK. If you need a particular country, ask us on WhatsApp first and we will tell you honestly what we can do.',
      },
      {
        id: 'uk-ig-l-v2-can-i-pay-in-pounds',
        question: 'Can I pay in pounds?',
        answer: 'Prices are set and charged in US dollars. Your card provider shows the charge in pounds, and some UK cards add a small non-sterling fee.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Growth Services for UK Accounts',
    intro: 'Instagram Likes move one number. For a different one, pick another service.',
    services: [
      {
        slug: 'buy-instagram-followers',
        title: 'Buy Instagram Followers',
        line: 'Grow your profile',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
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
        label: 'How the Instagram Algorithm Works',
        href: '/learn/how-instagram-algorithm-works',
      },
      {
        label: 'Instagram Followers vs Likes vs Views vs Comments',
        href: '/learn/instagram-followers-vs-likes-vs-views-vs-comments',
      },
      {
        label: 'How to Grow Instagram Followers Organically',
        href: '/learn/how-to-grow-instagram-followers-organically',
      },
      {
        label: 'Public vs Private Instagram Accounts',
        href: '/learn/public-vs-private-instagram-account',
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
