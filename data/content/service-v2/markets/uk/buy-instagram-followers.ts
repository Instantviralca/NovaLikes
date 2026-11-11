import type { ServiceV2Content } from '../../types';

/** UK market (/uk/buy-instagram-followers) — v2 service page copy. Primary keyword: "buy instagram followers uk". Do not edit wording without the content owner. */
export const UK_BUY_INSTAGRAM_FOLLOWERS_V2 = {
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
      primary: 'buy instagram followers uk',
      secondary: [
        'instagram followers uk',
        'buy uk instagram followers',
        'instagram followers uk price',
        'buy instagram followers uk cheap (price intent, answered by the cost table; never use "cheap" as a quality claim)',
        'get more instagram followers uk',
      ],
      questions: [
        'is it legal to buy instagram followers in the uk',
        'are the followers from the uk',
        'how much do instagram followers cost in the uk',
        'can uk businesses buy instagram followers',
        'is it safe to buy instagram followers uk',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Followers',
      tail: 'in the UK',
    },
    subtitle: 'For UK creators, shops and brands who want a profile that looks as established as the business behind it. Packages from {fromPrice}, ordered with just your username.',
    trust: [
      'No password needed',
      'UK-registered company',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Followers Packages for UK Accounts',
    intro: 'Choose a package. Prices are in US dollars.',
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
      highlight: 'Instagram Followers',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Your @username and nothing else',
        body: 'Send your public username. We never need your password or a login code, and nobody signs in to your account.',
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
        body: 'If followers from your order drop within six months of delivery, send us the order ID and we top them back up free of charge.',
      },
      {
        icon: 'users',
        tone: 'pink',
        title: 'Sized for UK accounts',
        body: 'Small packages for a new local business, larger ones for an established brand, so the jump looks right next to your current count.',
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
      highlight: 'Instagram Followers in the UK',
    },
    pill: 'Takes about 2 minutes',
    intro: 'Five quick steps, about two minutes, and the only detail we need is your public Instagram username.',
    items: [
      {
        ui: 'public',
        title: 'Make sure the profile is public',
        body: 'Switch the account to public before you order and leave it that way until delivery finishes. You can make it private again afterwards.',
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
        title: 'Type your username',
        body: 'Enter your @username exactly as it appears on your profile, plus an email address for the receipt and order updates.',
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
      unit: 'followers',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Check progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private account',
      sub: 'Off until delivery is done',
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
      lead: 'Choosing a UK',
      highlight: 'Instagram Followers Provider',
    },
    intro: 'Lots of sites target UK buyers. Before you pay any of them, check these seven points.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Username only',
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
    title: 'Refill and Refund Cover on Instagram Followers Orders',
    intro: 'Both promises are part of our written refund policy, so they apply to every UK order.',
    cards: [
      {
        chip: '6 months',
        title: 'Six-month refill',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
        body: 'If followers from your order drop within six months of the delivery date, send your order ID on WhatsApp or by email and we refill the gap at no cost. Keep the same username, and keep the profile public while a refill is delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy explains what qualifies and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost-uk',
    title: {
      lead: 'What Do',
      highlight: 'Instagram Followers Cost in the UK?',
    },
    intro: 'Followers start at {fromPrice}, and each extra thousand costs less as the package grows. Every price is a one-time payment in US dollars for one profile.',
    points: [
      'Prices are in US dollars. Your card provider converts the charge to pounds, and some UK cards add a small non-sterling fee.',
      'The six-month refill is included in every price.',
      'You pay once per order. Nothing renews.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 followers',
    ],
    best: 'Best price per follower',
    note: 'These prices come from our live packages. What you see at checkout is what you pay.',
  },
  whyBuy: {
    id: 'why-buy-instagram-followers-uk',
    title: {
      lead: 'Why People in the UK Buy',
      highlight: 'Instagram Followers',
    },
    intro: 'When someone in the UK finds your profile, from a Google search, a shop window sticker or a friend’s story, the follower count is one of the first things they judge. A count that matches the quality of your posts helps new visitors take you seriously. It works best alongside good content, so read [how to grow Instagram followers organically](/learn/how-to-grow-instagram-followers-organically) as well.',
    items: [
      {
        title: 'A profile that matches the business',
        body: 'A café with a busy shop floor but 90 followers online sends mixed signals. Followers bring the profile closer to how the business looks in real life.',
      },
      {
        title: 'A head start for launches',
        body: 'New shops, rebrands and product lines get a stronger first impression when the account doesn’t open at zero.',
      },
      {
        title: 'Easier collaborations',
        body: 'Local brands, venues and other creators often check follower counts before they reply to a collab or partnership message.',
      },
    ],
    diagram: [
      'Matches the business',
      'Launch head start',
      'Collab ready',
    ],
  },
  help: {
    id: 'what-instagram-followers-can-do',
    title: {
      lead: 'What Instagram Followers',
      highlight: 'Can and Can’t Do',
    },
    intro: 'Followers change one number on your profile. Here is exactly what they do and don’t move, so you can decide with clear expectations.',
    no: {
      title: 'What stays the same',
      items: [
        'Likes, views or comments on your posts',
        'Your reach or Explore placement on their own',
        'Sales or enquiries without good content and a clear offer',
      ],
    },
    yes: {
      title: 'What changes',
      items: [
        'The follower count at the top of your profile',
        'How established the account looks to new visitors',
        'The first impression for launches and collabs',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Illustration of instagram followers on a Instagram profile',
    },
  },
  who: {
    id: 'who-buys-uk',
    title: {
      lead: 'Who Buys',
      highlight: 'Instagram Followers in the UK',
    },
    cards: [
      {
        title: 'Independent shops and cafés',
        body: 'High-street shops, cafés, salons and barbers add followers so their Instagram looks as busy as the shop floor.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      },
      {
        title: 'UK creators',
        body: 'Creators building a niche in fashion, food, fitness or comedy use followers to look established while they keep posting.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        title: 'Brands and agencies',
        body: 'Agencies running UK launches order followers for new brand accounts, often with gradual delivery for a steadier rise.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      },
    ],
    statement: 'Whether you run a barbershop in Leeds or a brand account in London, the order is the same: your username, a package that fits, and followers that usually start arriving within 6–8 hours. We never ask for your password.',
  },
  vs: {
    id: 'instagram-followers-vs-other-services',
    title: {
      lead: 'Followers vs',
      highlight: 'Likes, Views and Comments',
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
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'The follower count on your profile',
        needs: 'Your public @username',
        current: true,
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'The like count on one post or Reel',
        needs: 'A link to the public post',
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
      highlight: 'Instagram Followers Safe for UK Accounts?',
    },
    lead: 'Three things decide it: what happens to your account, how you pay and what we do with your details. Here is each one, plus the risk no provider can rule out.',
    body: 'Instagram’s Community Guidelines discourage collecting followers artificially, and Instagram regularly removes accounts it thinks are inactive or fake. That is why some drop after delivery can happen, and why every UK order comes with a six-month refill. Picking a size that suits your current count, and asking for gradual delivery, keeps growth looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We only need your public username, so nobody signs in to your account or changes anything. We never ask for a password or login code. Anyone claiming to be NovaLikes who asks for one is not us.',
      },
      {
        ui: 'pay',
        title: 'Your payment',
        body: 'Checkout is secure and takes card, Apple Pay or Google Pay. You pay once in US dollars, and nothing renews.',
      },
      {
        ui: 'privacy',
        title: 'Your details',
        body: 'We use your username and email only to run the order and send updates. Our [privacy policy](/privacy-policy) has the details.',
      },
    ],
  },
  before: {
    id: 'before-you-order',
    title: {
      lead: 'Checklist Before You Order',
      highlight: 'Instagram Followers',
    },
    lead: 'Run through these four points and the order goes through without a hitch.',
    items: [
      {
        title: 'The profile is public',
        body: 'A private account stops the order from starting. Keep it public until delivery is complete.',
      },
      {
        title: 'The username is correct',
        body: 'Check the spelling and any dots or underscores. Followers go to the exact username you enter.',
      },
      {
        title: 'The username stays the same',
        body: 'Don’t change your @username during delivery or the six-month refill period, or we can’t find the profile to refill it.',
      },
      {
        title: 'The size looks natural',
        body: 'Choose a package that makes sense next to your current followers and the likes your posts get. You can always add more later.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions UK customers ask about Instagram Followers',
    title: 'UK Instagram Followers FAQ',
    intro: 'Still unsure? Message our team on WhatsApp at +44 7454 758272, any time.',
    cta: 'Message us on WhatsApp',
    market: {
      code: 'uk',
      idPrefix: 'uk-ig-f',
    },
    extra: [
      {
        id: 'uk-ig-f-v2-are-the-followers-from-the-uk',
        question: 'Are the followers from the UK?',
        answer: 'These packages are for UK accounts, but they are not sold as followers located in the UK. If you need followers from a particular country, message us on WhatsApp before you order and we will tell you honestly what is possible.',
      },
      {
        id: 'uk-ig-f-v2-is-it-legal-to-buy-instagram-followers-i',
        question: 'Is it legal to buy Instagram followers in the UK?',
        answer: 'We are not lawyers, so this is not legal advice. Buying followers goes against Instagram’s Community Guidelines, which is a platform rule rather than a UK law. If you run a business, UK consumer law bans fake reviews and misleading endorsements, so never present a bought number as customer reviews or testimonials.',
      },
      {
        id: 'uk-ig-f-v2-can-i-pay-in-pounds',
        question: 'Can I pay in pounds?',
        answer: 'Prices are shown and charged in US dollars. Your card provider converts the charge to pounds on your statement, and some UK cards add a small non-sterling transaction fee.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Growth Services for UK Accounts',
    intro: 'Instagram Followers move one number. For a different one, pick another service.',
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
    label: 'See Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
