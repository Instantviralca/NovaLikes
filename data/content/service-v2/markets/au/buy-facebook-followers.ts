import type { ServiceV2Content } from '../../types';

/** Australia market (/au/buy-facebook-followers) — v2 service page copy. Primary keyword: "buy facebook followers australia". Do not edit wording without the content owner. */
export const AU_BUY_FACEBOOK_FOLLOWERS_V2 = {
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
      primary: 'buy facebook followers australia',
      secondary: [
        'facebook followers australia',
        'buy facebook page followers australia',
        'buy australian facebook followers',
        'facebook followers australia price',
        'grow facebook page australia',
      ],
      questions: [
        'are the followers from australia',
        'can i buy followers for a personal profile',
        'how much do facebook followers cost in australia',
        'do you need admin access',
        'is it safe to buy facebook followers in australia',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Followers',
      tail: 'in Australia',
    },
    subtitle: 'Heaps of Australians still check a business’s Facebook Page before they ring, book or pop in. Make sure yours looks like one people trust. From {fromPrice}, with just the Page link.',
    trust: [
      'No password needed',
      'Help on WhatsApp 24/7',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Followers Packages for Australian Accounts',
    intro: 'Pick a package. Prices are listed in US dollars.',
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
      highlight: 'Facebook Followers',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Link only, no admin role',
        body: 'The public link to your Page or profile is enough. You never hand over a password, an admin role or a login code.',
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
        title: 'Pages and public profiles',
        body: 'Works on Facebook Pages, and on personal profiles with “Who can follow me” set to Public. No admin role needed.',
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
      highlight: 'Facebook Followers in Australia',
    },
    pill: 'Roughly 2 minutes',
    intro: 'Five steps, about two minutes. We only need the public link to your Page or profile.',
    items: [
      {
        ui: 'public',
        title: 'Turn on public following',
        body: 'Keep the Page published. On a personal profile, set “Who can follow me” to Public under Followers and public content in Settings.',
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
        title: 'Copy your Page link',
        body: 'Copy the link to the Page or profile, like facebook.com/yourpage, and paste it at checkout with your email.',
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
      label: 'Unpublished Page',
      sub: 'Off, so people can find it',
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
      lead: 'What to Check in an',
      highlight: 'Australian Facebook Followers Provider',
    },
    intro: 'There is no shortage of sites selling to Aussie accounts. Hold any of them up against these seven points before paying.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Page link only',
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
    title: 'Refill and Money-Back Cover for Facebook Followers in Australia',
    intro: 'Both sit in our written refund policy, so they apply to every Australian order.',
    cards: [
      {
        chip: '6 months',
        title: 'Half a year of refills',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'Should followers from your order drop within six months of delivery, send the order ID on WhatsApp or by email and we replace what was lost, free. Leave the Page address as it is, and the Page public, while a refill comes through.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of buying. The refund policy covers what is eligible and how to put in a request.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost-au',
    title: {
      lead: 'What Do',
      highlight: 'Facebook Followers Cost in Australia?',
    },
    intro: 'Followers start at {fromPrice}, and the price per thousand drops as the package grows. Each price is a one-time payment in US dollars for one Page or profile.',
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
    id: 'why-buy-facebook-followers-au',
    title: {
      lead: 'Why Aussies Buy',
      highlight: 'Facebook Followers',
    },
    intro: 'In country towns and capital cities alike, Facebook is still where plenty of Australians check opening hours, read updates and size up a local business. A healthy follower count makes your Page look active straight away. It does its best work next to good content, so have a look at [how Facebook Page reach works](/learn/how-facebook-page-reach-works) too.',
    items: [
      {
        title: 'A Page that looks open for business',
        body: 'A Page on 60 followers can look shut, even if the business is flat out.',
      },
      {
        title: 'Trust before the phone rings',
        body: 'Tradies, clinics and salons often get checked on Facebook before anyone calls.',
      },
      {
        title: 'New Pages that don’t start empty',
        body: 'New businesses, second locations and rebrands get a head start instead of opening at zero.',
      },
    ],
    diagram: [
      'Open for business',
      'Trust first',
      'Not empty',
    ],
  },
  help: {
    id: 'what-facebook-followers-can-do',
    title: {
      lead: 'What You Can Expect From',
      highlight: 'Facebook Followers',
    },
    intro: 'Followers move the total on your Page or profile. Who sees your posts is still up to Facebook.',
    no: {
      title: 'Not what it does',
      items: [
        'Reactions or comments on posts',
        'How far your posts travel',
        'Enquiries, unless the Page gives people a reason',
      ],
    },
    yes: {
      title: 'What it does',
      items: [
        'The follower total on your Page or profile',
        'Whether newcomers see an active, trusted Page',
        'Your first impression before someone calls',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Illustration of facebook followers on a Facebook page',
    },
  },
  who: {
    id: 'who-buys-au',
    title: {
      lead: 'Who Grabs',
      highlight: 'Facebook Followers in Australia',
    },
    cards: [
      {
        title: 'Tradies',
        body: 'Sparkies, plumbers and builders add followers so their Page looks as reliable as their reviews.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Local services',
        body: 'Physios, dog groomers and driving instructors grow their Page before opening new bookings or running a promo.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Clubs and community groups',
        body: 'Footy clubs, Men’s Sheds and charities add followers so their Page looks active to new members.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'From a sparky in Wollongong to a dog groomer in Ballarat, it runs the same way: one public link, a package that fits, and followers usually landing within 6–8 hours. No admin role, no password.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Facebook Followers Side by Side With',
      highlight: 'Page Likes and Post Likes',
    },
    intro: 'Each service shifts a different number. Choose the one people should notice first, or read the [comparison guide](/learn/facebook-followers-vs-page-likes-vs-post-likes).',
    cols: [
      'Service',
      'What it shifts',
      'What you give us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'The follower total on a Page or profile',
        needs: 'A link to the Page or profile',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'The like total on a classic Page',
        needs: 'A link to the Page',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Post Likes',
        changes: 'Reactions on one public post',
        needs: 'A link to that post',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Facebook Followers in Australia?',
    },
    lead: 'It really comes down to three things: your account, your money and your details. Here is how each is handled, and the one risk that no seller can make disappear.',
    body: 'The one thing no seller can take away: Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta prunes fake or inactive accounts from time to time. A few followers may drop after delivery, which the six-month refill on Australian orders covers. Gradual delivery and regular posting keep your Page looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We go off the public link to your Page or profile, so nobody needs an admin role. NovaLikes will never ask for a password or login code; if someone using our name does, it isn’t us.',
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
      highlight: 'Facebook Followers',
    },
    lead: 'Tick off these four and your order should go through without a hitch.',
    items: [
      {
        title: 'Public following is on',
        body: 'Unpublished Pages, or profiles that block public followers, can’t receive an order.',
      },
      {
        title: 'It’s the Page link',
        body: 'Copy the link to the Page or profile, not a post.',
      },
      {
        title: 'Page address stays put',
        body: 'Changing the URL before the six-month refill period ends means we can’t find it.',
      },
      {
        title: 'A sensible jump',
        body: 'Choose a package that sits naturally with your followers and how often you post.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'What Australians ask about Facebook Followers',
    title: 'Facebook Followers FAQ for Australia',
    intro: 'Got another question? WhatsApp us on +44 7454 758272, any time of day or night.',
    cta: 'Ask on WhatsApp',
    market: {
      code: 'au',
      idPrefix: 'au-fb-f',
    },
    extra: [
      {
        id: 'au-fb-f-v2-are-the-followers-from-australia',
        question: 'Are the followers from Australia?',
        answer: 'These packages are built for Australian Pages and profiles, but they are not sold as followers from people located in Australia. If you need a particular country, flick us a message on WhatsApp before ordering and we will be upfront about what is possible.',
      },
      {
        id: 'au-fb-f-v2-do-you-need-admin-access-to-my-page',
        question: 'Do you need admin access to my Page?',
        answer: 'No. We only need the public link. Never give anyone admin access or your Facebook password to get followers.',
      },
      {
        id: 'au-fb-f-v2-can-i-pay-in-australian-dollars',
        question: 'Can I pay in Australian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the amount to Australian dollars, and some Australian cards add an international transaction fee, so check with your bank if that matters.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Australian Accounts',
    intro: 'Facebook Followers shift one number. To work on a different one, choose another service.',
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
    label: 'See the Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
