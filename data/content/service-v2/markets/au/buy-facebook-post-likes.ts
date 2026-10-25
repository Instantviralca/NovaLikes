import type { ServiceV2Content } from '../../types';

/** Australia market (/au/buy-facebook-post-likes) — v2 service page copy. Primary keyword: "buy facebook post likes australia". Do not edit wording without the content owner. */
export const AU_BUY_FACEBOOK_POST_LIKES_V2 = {
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
      primary: 'buy facebook post likes australia',
      secondary: [
        'facebook post likes australia',
        'buy likes on facebook post australia',
        'buy facebook reactions australia',
        'facebook post likes australia price',
        'buy australian facebook post likes',
      ],
      questions: [
        'can i choose love or other reactions',
        'does the post need to be public',
        'how much do facebook post likes cost in australia',
        'are the likes from australia',
        'is it safe to buy facebook post likes in australia',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Post Likes',
      tail: 'in Australia',
    },
    subtitle: 'An event, a sale or some big news deserves more than a couple of reactions. Give one public post the response it should have. From {fromPrice}, with Love and other reactions on request.',
    trust: [
      'No password needed',
      'Help on WhatsApp 24/7',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Post Likes Packages for Australian Accounts',
    intro: 'Pick a package. Prices are listed in US dollars.',
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
      highlight: 'Facebook Post Likes',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Link only, no admin role',
        body: 'The public link to your post is enough. You never hand over a password, an admin role or a login code.',
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
        title: 'Like, Love and the rest',
        body: 'Orders arrive as Likes unless you say otherwise. Want Love or another reaction? Pop it in the checkout note before we start.',
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
      highlight: 'Facebook Post Likes in Australia',
    },
    pill: 'Roughly 2 minutes',
    intro: 'Five steps, a couple of minutes. All we need is the link to one public post.',
    items: [
      {
        ui: 'public',
        title: 'Set the post to Public',
        body: 'Look for the little globe next to the post date. Friends-only or custom-audience posts can’t receive an order.',
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
        title: 'Copy the post link',
        body: 'Open the post, tap Share, choose Copy link and paste it at checkout. Add your reaction in the note if it isn’t Like.',
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
      lead: 'What to Check in an',
      highlight: 'Australian Facebook Post Likes Provider',
    },
    intro: 'There is no shortage of sites selling to Aussie accounts. Hold any of them up against these seven points before paying.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Post link only',
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
    title: 'Refill and Money-Back Cover for Facebook Post Likes in Australia',
    intro: 'Both sit in our written refund policy, so they apply to every Australian order.',
    cards: [
      {
        chip: '6 months',
        title: 'Half a year of refills',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'Should likes from your order drop within six months of delivery, send the order ID on WhatsApp or by email and we replace what was lost, free. Leave the post up and public while a refill comes through.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of buying. The refund policy covers what is eligible and how to put in a request.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost-au',
    title: {
      lead: 'What Do',
      highlight: 'Facebook Post Likes Cost in Australia?',
    },
    intro: 'Post Likes start at {fromPrice}, and each like costs less as the package grows. Each price is a one-time payment in US dollars for one post.',
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
    id: 'why-buy-facebook-post-likes-au',
    title: {
      lead: 'Why Aussies Buy',
      highlight: 'Facebook Post Likes',
    },
    intro: 'Reactions are the quickest signal on Facebook that a post matters. Low numbers on an important update can make it look ignored, even when people loved it in person. It does its best work next to good content, so have a look at [how to get more likes on a Facebook post](/learn/how-to-get-more-likes-on-facebook-post) too.',
    items: [
      {
        title: 'Events that look well attended',
        body: 'Trivia nights, open days and sausage-sizzle fundraisers look more inviting with plenty of reactions.',
      },
      {
        title: 'Sales people stop for',
        body: 'Promo posts with a healthy count look worth a second look.',
      },
      {
        title: 'Big news that feels celebrated',
        body: 'Openings, anniversaries and awards deserve a response that matches the moment.',
      },
    ],
    diagram: [
      'Busy event',
      'Noticed sale',
      'Celebrated news',
    ],
  },
  help: {
    id: 'what-facebook-post-likes-can-do',
    title: {
      lead: 'What You Can Expect From',
      highlight: 'Facebook Post Likes',
    },
    intro: 'Post Likes move the reactions on one public post. Here is where the effect stops.',
    no: {
      title: 'Not what it does',
      items: [
        'Page followers or Page likes',
        'Comments or shares',
        'How widely Facebook shows your later posts',
      ],
    },
    yes: {
      title: 'What it does',
      items: [
        'The reaction count on the post you pick',
        'Whether the post looks popular',
        'How events, sales and news first come across',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Illustration of facebook post likes on a Facebook post',
    },
  },
  who: {
    id: 'who-buys-au',
    title: {
      lead: 'Who Grabs',
      highlight: 'Facebook Post Likes in Australia',
    },
    cards: [
      {
        title: 'Pubs and venues',
        body: 'Pubs, RSLs and live music venues add reactions to trivia, gig and game-day posts.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Schools, clubs and charities',
        body: 'Sporting clubs, P&Cs and charities add reactions to fundraisers and open-day posts.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Local businesses',
        body: 'Shops and services add reactions to sales and opening news, sometimes as Love instead of Like.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'From a trivia night in Wagga Wagga to a fundraiser in Launceston, it runs the same way: one public post link, the package and reaction you want, and likes usually rolling within 6–8 hours. No login needed.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Facebook Post Likes Side by Side With',
      highlight: 'Followers and Page Likes',
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
        slug: 'buy-facebook-post-likes',
        label: 'Post Likes',
        changes: 'Reactions on one public post',
        needs: 'A link to that post',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'The follower total on a Page or profile',
        needs: 'A link to the Page or profile',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'The like total on a classic Page',
        needs: 'A link to the Page',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Facebook Post Likes in Australia?',
    },
    lead: 'It really comes down to three things: your account, your money and your details. Here is how each is handled, and the one risk that no seller can make disappear.',
    body: 'The one thing no seller can take away: Facebook’s Community Standards don’t allow inauthentic behaviour, and Meta prunes fake or inactive accounts from time to time. A few reactions may drop after delivery, which the six-month refill on Australian orders covers. Keeping reactions in line with the post’s reach looks most natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We go off the public link to your post, so nobody needs an admin role. NovaLikes will never ask for a password or login code; if someone using our name does, it isn’t us.',
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
      highlight: 'Facebook Post Likes',
    },
    lead: 'Tick off these four and your order should go through without a hitch.',
    items: [
      {
        title: 'Post is Public',
        body: 'Check for the globe icon. Other audiences block delivery.',
      },
      {
        title: 'It’s the post link',
        body: 'Copy it from the post’s Share menu, not your Page link.',
      },
      {
        title: 'Reaction chosen',
        body: 'Like is the default. Ask for Love or another reaction in the note before we start.',
      },
      {
        title: 'Post stays up',
        body: 'Don’t delete it before the six-month refill period ends.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'What Australians ask about Facebook Post Likes',
    title: 'Facebook Post Likes FAQ for Australia',
    intro: 'Got another question? WhatsApp us on +44 7454 758272, any time of day or night.',
    cta: 'Ask on WhatsApp',
    market: {
      code: 'au',
      idPrefix: 'au-fb-post',
    },
    extra: [
      {
        id: 'au-fb-post-v2-are-the-likes-from-australia',
        question: 'Are the likes from Australia?',
        answer: 'These packages are built for posts on Australian Pages and profiles, but they are not sold as likes from people located in Australia. If you need a particular country, flick us a message on WhatsApp before ordering and we will be upfront about what is possible.',
      },
      {
        id: 'au-fb-post-v2-can-i-pay-in-australian-dollars',
        question: 'Can I pay in Australian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the amount to Australian dollars, and some Australian cards add an international transaction fee, so check with your bank if that matters.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Australian Accounts',
    intro: 'Facebook Post Likes shift one number. To work on a different one, choose another service.',
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
        label: 'How to Get More Likes on a Facebook Post',
        href: '/learn/how-to-get-more-likes-on-facebook-post',
      },
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
