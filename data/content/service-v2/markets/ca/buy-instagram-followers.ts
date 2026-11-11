import type { ServiceV2Content } from '../../types';

/** Canada market (/ca/buy-instagram-followers) — v2 service page copy. Primary keyword: "buy instagram followers canada". Do not edit wording without the content owner. */
export const CA_BUY_INSTAGRAM_FOLLOWERS_V2 = {
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
      primary: 'buy instagram followers canada',
      secondary: [
        'instagram followers canada',
        'buy canadian instagram followers',
        'instagram followers canada price',
        'get more instagram followers canada',
        'cheap instagram followers canada (price intent, answered by the cost table; never use "cheap" as a quality claim)',
      ],
      questions: [
        'are the followers canadian',
        'how much do instagram followers cost in canada',
        'can canadian businesses buy instagram followers',
        'is it safe to buy instagram followers in canada',
        'do bought followers drop',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Followers',
      tail: 'in Canada',
    },
    subtitle: 'For Canadian creators, small businesses and brands whose Instagram should look as solid as their work. Packages from {fromPrice}, and all we need is your username.',
    trust: [
      'No password needed',
      '24/7 WhatsApp support',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Followers Packages for Canadian Accounts',
    intro: 'Pick a package. All prices are in US dollars.',
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
        body: 'Wraps up 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'Any time zone',
        body: 'WhatsApp, 24/7',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Why Canadian Accounts Pick NovaLikes for',
      highlight: 'Instagram Followers',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Just the username',
        body: 'Type your public username and that is it. No password, no login code, and nobody gets into your account.',
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
        body: 'If followers from your order drop in the six months after delivery, message us your order ID and we refill them at no charge.',
      },
      {
        icon: 'users',
        tone: 'pink',
        title: 'A size for every account',
        body: 'Start small for a brand-new local page or go bigger for an established brand, so the jump looks natural next to your current count.',
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
      highlight: 'Instagram Followers in Canada',
    },
    pill: 'Around 2 minutes',
    intro: 'About two minutes from start to finish. The one detail we need is your public Instagram username.',
    items: [
      {
        ui: 'public',
        title: 'Open up the profile',
        body: 'Switch the account to public in your privacy settings before ordering. Once the followers are in, you can lock it again.',
      },
      {
        ui: 'packages',
        title: 'Select a size',
        body: 'Choose a quantity from the packages above. You see the total before checkout.',
      },
      {
        ui: 'cart',
        title: 'Add it to your cart',
        body: 'Tap “Add to Cart” and move on to checkout.',
      },
      {
        ui: 'username',
        title: 'Add your @username',
        body: 'Copy the handle straight from your profile so the spelling is exact, and leave an email for your receipt.',
      },
      {
        ui: 'pay',
        title: 'Check out once',
        body: 'Pay by card, Apple Pay or Google Pay in US dollars. It is a one-time charge with no subscription.',
      },
    ],
    done: {
      title: 'All set!',
      count: 1000,
      unit: 'followers',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Follow along on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private account',
      sub: 'Off until delivery wraps up',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2K',
    ],
    chipOn: 2,
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
      lead: 'Comparing',
      highlight: 'Instagram Followers Sellers in Canada',
    },
    intro: 'Plenty of sites sell to Canadian accounts. Run any of them past these seven checks before you pay.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Username only',
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
    title: 'Refill and Money-Back Cover on Canadian Instagram Followers Orders',
    intro: 'Both are written into our refund policy, so every order placed from Canada is covered.',
    cards: [
      {
        chip: '6 months',
        title: 'Six months of refills',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-buying-process.webp',
        body: 'Lost some followers in the six months after delivery? Send your order ID by WhatsApp or email and we make up the difference for free. Your username needs to stay the same, and the profile public, while a refill is on its way.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of purchase. Our refund policy sets out what qualifies and how to request it.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-followers-cost-ca',
    title: {
      lead: 'How Much Do',
      highlight: 'Instagram Followers Cost in Canada?',
    },
    intro: 'Followers start at {fromPrice}, and the price per thousand goes down as the package gets bigger. Each price is a one-time payment in US dollars for one profile.',
    points: [
      'Prices are in US dollars. Your bank converts the charge to Canadian dollars, and many Canadian cards add a foreign transaction fee.',
      'Refills for six months are part of every package.',
      'One payment per order. No renewals.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 followers',
    ],
    best: 'Best price per follower',
    note: 'Prices are pulled from our live packages. The total at checkout is the total you pay.',
  },
  whyBuy: {
    id: 'why-buy-instagram-followers-ca',
    title: {
      lead: 'Why Canadians Buy',
      highlight: 'Instagram Followers',
    },
    intro: 'Whether someone finds you through a hashtag, a map listing or a friend’s story, they size up your profile in seconds. A follower count that fits the quality of your posts makes that first look count. Pair it with content people enjoy; our guide on [how to grow Instagram followers organically](/learn/how-to-grow-instagram-followers-organically) is a good place to start.',
    items: [
      {
        title: 'A profile that matches your reputation',
        body: 'A café with a lineup out the door but 120 followers online sends mixed signals. Followers bring the two closer together.',
      },
      {
        title: 'Launch day without the empty look',
        body: 'New shops, product lines and rebrands make a better first impression when the account isn’t starting from scratch.',
      },
      {
        title: 'Partnerships that go further',
        body: 'Local brands, venues and fellow creators often check your follower count before answering a collab pitch.',
      },
    ],
    diagram: [
      'Fits your reputation',
      'Launch ready',
      'Collab friendly',
    ],
  },
  help: {
    id: 'what-instagram-followers-can-do',
    title: {
      lead: 'Do Instagram Followers',
      highlight: 'Actually Help?',
    },
    intro: 'A follower package moves one figure on your profile and nothing else. Knowing that up front saves disappointment later.',
    no: {
      title: 'What they won’t do',
      items: [
        'Engagement on individual posts',
        'Where Instagram places your content',
        'Revenue, unless the content and offer back it up',
      ],
    },
    yes: {
      title: 'What they will do',
      items: [
        'Your follower total, top of the profile',
        'Whether newcomers see an account worth following',
        'How you come across to potential partners',
      ],
      image: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      altFallback: 'Illustration of instagram followers on a Instagram profile',
    },
  },
  who: {
    id: 'who-buys-ca',
    title: {
      lead: 'Who Orders',
      highlight: 'Instagram Followers in Canada',
    },
    cards: [
      {
        title: 'Local shops and cafés',
        body: 'Coffee shops, boutiques and bakeries add followers so their Instagram looks as busy as their counter on a Saturday.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      },
      {
        title: 'Canadian creators',
        body: 'Food, travel and outdoor creators use followers to look established while they keep building a niche.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        title: 'Brands and agencies',
        body: 'Agencies launching new brand accounts in Canada add followers, usually spread out with gradual delivery.',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      },
    ],
    statement: 'A Halifax bakery and a Toronto clothing label go through the exact same steps: share the username, pick a size, and expect followers to begin arriving within 6–8 hours. Your password stays with you.',
  },
  vs: {
    id: 'instagram-followers-vs-other-services',
    title: {
      lead: 'Followers Compared With',
      highlight: 'Likes, Views and Comments',
    },
    intro: 'Every service moves a different number. Pick the one visitors should see first, or read the [side-by-side guide](/learn/instagram-followers-vs-likes-vs-views-vs-comments).',
    cols: [
      'Service',
      'What it moves',
      'What we need',
      'From',
    ],
    rows: [
      {
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'How many people follow the profile',
        needs: 'Your public @username',
        current: true,
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Likes on a single post or Reel',
        needs: 'The public post link',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Views',
        changes: 'Views on a single Reel or video',
        needs: 'The public Reel link',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Comments',
        changes: 'Comments under a single post',
        needs: 'The public post link',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Instagram Followers in Canada?',
    },
    lead: 'Safety comes down to your account, your payment and your data. Here is how we handle each, plus the one risk nobody can take away.',
    body: 'Here is the risk we can’t remove: Instagram’s rules discourage artificial follower growth, and the platform sweeps out accounts it considers inactive or fake. So a few followers may fall away after delivery. That is exactly what the six-month refill on Canadian orders is for. Ordering a size in line with your current count, and spreading it out with gradual delivery, keeps the curve believable.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'All we take is your public username, so nobody logs in or touches your settings. NovaLikes never asks for a password or login code, and anyone who does is not us.',
      },
      {
        ui: 'pay',
        title: 'Your payment',
        body: 'You check out securely by card, Apple Pay or Google Pay. It is a single payment in US dollars that never renews.',
      },
      {
        ui: 'privacy',
        title: 'Your details',
        body: 'Your username and email are used only to fill the order and send updates. See our [privacy policy](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'before-you-order',
    title: {
      lead: 'Before You Order',
      highlight: 'Instagram Followers',
    },
    lead: 'Check these four things first and your order will run smoothly.',
    items: [
      {
        title: 'Privacy is off',
        body: 'We can’t deliver to a locked account, so leave it public until the last follower lands.',
      },
      {
        title: 'The handle is exact',
        body: 'One wrong character sends the order to someone else. Paste it rather than typing it.',
      },
      {
        title: 'No rebrand mid-order',
        body: 'Hold off on changing your handle until the order and its six-month refill window are over.',
      },
      {
        title: 'Growth that adds up',
        body: 'A jump that fits your posting history and engagement looks far more natural than a giant leap.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions Canadians ask about Instagram Followers',
    title: 'Instagram Followers FAQ for Canada',
    intro: 'Didn’t find it? Message us on WhatsApp at +44 7454 758272, any hour, any province.',
    cta: 'Chat with us on WhatsApp',
    market: {
      code: 'ca',
      idPrefix: 'ca-ig-f',
    },
    extra: [
      {
        id: 'ca-ig-f-v2-are-the-followers-from-canada',
        question: 'Are the followers from Canada?',
        answer: 'These packages are made for Canadian accounts, but they are not sold as followers from people located in Canada. If you need a specific country, message us on WhatsApp before ordering and we will tell you straight what is possible.',
      },
      {
        id: 'ca-ig-f-v2-can-i-pay-in-canadian-dollars',
        question: 'Can I pay in Canadian dollars?',
        answer: 'Prices are set and charged in US dollars. Your bank shows the charge in Canadian dollars, and many Canadian cards add a foreign transaction fee, so check with your card issuer if that matters to you.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Canadian Accounts',
    intro: 'Instagram Followers change one number. Want to grow a different one? Pick a service below.',
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
    label: 'View Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
