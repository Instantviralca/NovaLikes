import type { ServiceV2Content } from '../../types';

/** UK market (/uk/buy-facebook-followers) — v2 service page copy. Primary keyword: "buy facebook followers uk". Do not edit wording without the content owner. */
export const UK_BUY_FACEBOOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-facebook-followers',
    platform: 'Facebook',
    name: 'Facebook Followers',
    unit: 'followers',
    unitSingular: 'follower',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'buy facebook followers uk',
      secondary: [
        'facebook followers uk',
        'buy facebook page followers uk',
        'buy uk facebook followers',
        'facebook followers uk price',
        'grow facebook page uk',
      ],
      questions: [
        'are the followers from the uk',
        'can i buy followers for a personal facebook profile',
        'how much do facebook followers cost in the uk',
        'do you need admin access to my facebook page',
        'is it safe to buy facebook followers uk',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Followers',
      tail: 'in the UK',
    },
    subtitle: 'Plenty of UK customers still check a business’s Facebook Page before they ring, book or visit. Make sure the follower count reflects a business people trust. From {fromPrice}, with just the Page link.',
    trust: [
      'No password needed',
      'UK-registered company',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Followers Packages for UK Accounts',
    intro: 'Choose a package. Prices are in US dollars.',
    summaryName: '{quantity} Facebook Followers',
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
      highlight: 'Facebook Followers',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'A link, not admin access',
        body: 'Send the public link to your Page or profile. We never need a password, an admin role or a login code.',
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
        body: 'If followers from your order drop within six months of delivery, send us the order ID and we top them back up free of charge.',
      },
      {
        icon: 'users',
        tone: 'pink',
        title: 'Pages and public profiles',
        body: 'Works for Facebook Pages, and for personal profiles with “Who can follow me” set to Public. No admin role needed.',
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
      highlight: 'Facebook Followers in the UK',
    },
    pill: 'Takes about 2 minutes',
    intro: 'Five steps and about two minutes. We only need the public link to your Page or profile.',
    items: [
      {
        ui: 'public',
        title: 'Let people follow you',
        body: 'Keep the Page published. For a personal profile, set “Who can follow me” to Public under Followers and public content in Settings.',
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
        title: 'Copy your Page link',
        body: 'Copy the link to your Page or profile, such as facebook.com/yourpage, and paste it at checkout with an email for updates.',
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
      highlight: 'Facebook Followers Provider',
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
    title: 'Refill and Refund Cover on Facebook Followers Orders',
    intro: 'Both promises are part of our written refund policy, so they apply to every UK order.',
    cards: [
      {
        chip: '6 months',
        title: 'Six-month refill',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'If followers from your order drop within six months of the delivery date, send your order ID on WhatsApp or by email and we refill the gap at no cost. Keep the same Page URL, and keep the Page public while a refill is delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy explains what qualifies and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost-uk',
    title: {
      lead: 'What Do',
      highlight: 'Facebook Followers Cost in the UK?',
    },
    intro: 'Followers start at {fromPrice}, and the price per thousand falls as the package grows. Every price is a one-time payment in US dollars for one Page or profile.',
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
    id: 'why-buy-facebook-followers-uk',
    title: {
      lead: 'Why People in the UK Buy',
      highlight: 'Facebook Followers',
    },
    intro: 'In the UK, Facebook is still where many people look up local businesses, check opening times and read the latest posts. A Page with a healthy follower count looks active and trustworthy at a glance. It works best alongside good content, so read [how Facebook Page reach works](/learn/how-facebook-page-reach-works) as well.',
    items: [
      {
        title: 'A Page that looks open for business',
        body: 'A Page with 60 followers can look closed down, even when the business is thriving.',
      },
      {
        title: 'Local trust before the first call',
        body: 'Tradespeople, clinics and salons are often checked on Facebook before anyone gets in touch.',
      },
      {
        title: 'A head start for new Pages',
        body: 'New businesses, rebrands and second locations don’t have to start their Page from zero.',
      },
    ],
    diagram: [
      'Open for business',
      'Local trust',
      'New Page start',
    ],
  },
  help: {
    id: 'what-facebook-followers-can-do',
    title: {
      lead: 'What Facebook Followers',
      highlight: 'Can and Can’t Do',
    },
    intro: 'Followers change the count on your Page or profile. They don’t change who sees your posts on their own. Here is the honest split.',
    no: {
      title: 'What stays the same',
      items: [
        'Reactions or comments on your posts',
        'Your organic reach by themselves',
        'Enquiries without useful posts and clear contact details',
      ],
    },
    yes: {
      title: 'What changes',
      items: [
        'The follower count on your Page or profile',
        'How established the Page looks to new visitors',
        'The first impression before someone calls or books',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Illustration of facebook followers on a Facebook page',
    },
  },
  who: {
    id: 'who-buys-uk',
    title: {
      lead: 'Who Buys',
      highlight: 'Facebook Followers in the UK',
    },
    cards: [
      {
        title: 'Tradespeople',
        body: 'Plumbers, electricians and builders add followers so their Page looks as reliable as their reviews.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Local services',
        body: 'Clinics, dog groomers and driving instructors grow their Page before they launch an offer or open new slots.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Community groups and charities',
        body: 'Clubs, events and charity shops add followers so their Page looks active to new members and volunteers.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'Whether it is a plumber in Plymouth or a dog groomer in York, it works the same way: one public link, a package that fits, and followers that usually start within 6–8 hours. No admin access, no password.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Facebook Followers vs',
      highlight: 'Page Likes and Post Likes',
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
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'The follower count on a Page or profile',
        needs: 'A link to the Page or profile',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'The like count on a classic-layout Page',
        needs: 'A link to the Page',
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
      highlight: 'Facebook Followers Safe for UK Accounts?',
    },
    lead: 'Three things decide it: what happens to your account, how you pay and what we do with your details. Here is each one, plus the risk no provider can rule out.',
    body: 'Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta removes fake or inactive accounts from time to time. Some drop after delivery can happen, which is why every UK order includes a six-month refill. Gradual delivery and posting regularly keep your Page looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We only need the public link to your Page or profile, so nobody needs admin access. We never ask for a password or login code. Anyone claiming to be NovaLikes who asks for one is not us.',
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
      highlight: 'Facebook Followers',
    },
    lead: 'Run through these four points and the order goes through without a hitch.',
    items: [
      {
        title: 'Following is open',
        body: 'The Page must be published, or the profile must allow followers from the public.',
      },
      {
        title: 'The link is right',
        body: 'Copy the link to the Page or profile itself, such as facebook.com/yourpage, not a post.',
      },
      {
        title: 'The Page URL stays the same',
        body: 'Keep the same Page address during delivery and the six-month refill period, or we can’t find it to refill.',
      },
      {
        title: 'The size suits the Page',
        body: 'Choose a package that looks natural next to your current followers and how often you post.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions UK customers ask about Facebook Followers',
    title: 'UK Facebook Followers FAQ',
    intro: 'Still unsure? Message our team on WhatsApp at +44 7454 758272, any time.',
    cta: 'Message us on WhatsApp',
    market: {
      code: 'uk',
      idPrefix: 'uk-fb-f',
    },
    extra: [
      {
        id: 'uk-fb-f-v2-are-the-followers-from-the-uk',
        question: 'Are the followers from the UK?',
        answer: 'These packages are for UK Pages and profiles, but they are not sold as followers located in the UK. If you need a specific country, ask us on WhatsApp before ordering.',
      },
      {
        id: 'uk-fb-f-v2-do-you-need-admin-access-to-my-page',
        question: 'Do you need admin access to my Page?',
        answer: 'No. We only need the public link. Never give anyone admin access or your Facebook password to get followers.',
      },
      {
        id: 'uk-fb-f-v2-can-i-pay-in-pounds',
        question: 'Can I pay in pounds?',
        answer: 'Prices are set and charged in US dollars. Your card provider shows the charge in pounds, and some UK cards add a small non-sterling fee.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Growth Services for UK Accounts',
    intro: 'Facebook Followers move one number. For a different one, pick another service.',
    services: [
      {
        slug: 'buy-facebook-page-likes',
        title: 'Buy Facebook Page Likes',
        line: 'For Pages with a like count',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
