import type { ServiceV2Content } from '../../types';

/** Australia market (/au/buy-instagram-likes) — v2 service page copy. Primary keyword: "buy instagram likes australia". Do not edit wording without the content owner. */
export const AU_BUY_INSTAGRAM_LIKES_V2 = {
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
      primary: 'buy instagram likes australia',
      secondary: [
        'instagram likes australia',
        'buy australian instagram likes',
        'buy likes on instagram australia',
        'instagram reel likes australia',
        'instagram likes australia price',
      ],
      questions: [
        'are the likes from australia',
        'how much do instagram likes cost in australia',
        'can i buy likes for a reel',
        'is it safe to buy instagram likes in australia',
        'do bought likes drop off',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Likes',
      tail: 'in Australia',
    },
    subtitle: 'Give a new range, an EOFY sale post or your best Reel the like count it deserves. Packages from {fromPrice}, ordered with nothing but the post link.',
    trust: [
      'No password needed',
      'Help on WhatsApp 24/7',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Likes Packages for Australian Accounts',
    intro: 'Pick a package. Prices are listed in US dollars.',
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
      highlight: 'Instagram Likes',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'We work from the link',
        body: 'The public link to the post or Reel is enough. You never hand over a password or a login code, and your account stays yours.',
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
        icon: 'image',
        tone: 'pink',
        title: 'Photos, carousels and Reels',
        body: 'Any public post is fair game. Each order covers one post, so the likes go exactly where you want them.',
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
      highlight: 'Instagram Likes in Australia',
    },
    pill: 'Roughly 2 minutes',
    intro: 'Two minutes, five steps. All we need is the link to one public post or Reel.',
    items: [
      {
        ui: 'public',
        title: 'Keep the post public',
        body: 'The post has to sit on a public account until the likes are done. Don’t archive or delete it mid-order.',
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
        title: 'Copy the post’s link',
        body: 'Tap the three dots or the share button, choose Copy link and paste it at checkout with your email.',
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
      label: 'Private account',
      sub: 'Off while the likes land',
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
      lead: 'What to Check in an',
      highlight: 'Australian Instagram Likes Provider',
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
    title: 'Refill and Money-Back Cover for Instagram Likes in Australia',
    intro: 'Both sit in our written refund policy, so they apply to every Australian order.',
    cards: [
      {
        chip: '6 months',
        title: 'Half a year of refills',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'Should likes from your order drop within six months of delivery, send the order ID on WhatsApp or by email and we replace what was lost, free. Leave the post or Reel up and public while a refill comes through.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of buying. The refund policy covers what is eligible and how to put in a request.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost-au',
    title: {
      lead: 'What Do',
      highlight: 'Instagram Likes Cost in Australia?',
    },
    intro: 'Likes start at {fromPrice}, and each like works out at a lower price on the bigger packages. Each price is a one-time payment in US dollars for one post or Reel.',
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
    id: 'why-buy-instagram-likes-au',
    title: {
      lead: 'Why Aussies Buy',
      highlight: 'Instagram Likes',
    },
    intro: 'People scroll fast, and the like count is part of that snap decision about whether a post is worth a look. Likes give the posts that matter to your business a fair go. It does its best work next to good content, so have a look at [how the Instagram algorithm works](/learn/how-instagram-algorithm-works) too.',
    items: [
      {
        title: 'Sale posts that get seen',
        body: 'An end-of-financial-year sale post with nine likes looks like nobody noticed. A healthier number fixes the first impression.',
      },
      {
        title: 'A feed that looks consistent',
        body: 'If older posts sit on hundreds of likes and new ones on a handful, the profile looks patchy. Likes smooth it out.',
      },
      {
        title: 'Posts worth sending to a mate',
        body: 'People are more likely to share a post that already looks popular.',
      },
    ],
    diagram: [
      'Sale seen',
      'Consistent feed',
      'Share-worthy',
    ],
  },
  help: {
    id: 'what-instagram-likes-can-do',
    title: {
      lead: 'What You Can Expect From',
      highlight: 'Instagram Likes',
    },
    intro: 'Likes move the count under one post. Here is where the effect starts and stops.',
    no: {
      title: 'Not what it does',
      items: [
        'Your followers, views or comments',
        'Where Instagram places the post',
        'Foot traffic, unless the post and offer are strong',
      ],
    },
    yes: {
      title: 'What it does',
      items: [
        'The like count on the post or Reel you pick',
        'Whether that post looks popular at a glance',
        'How sale and launch posts first come across',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Illustration of instagram likes on a Instagram post',
    },
  },
  who: {
    id: 'who-buys-au',
    title: {
      lead: 'Who Grabs',
      highlight: 'Instagram Likes in Australia',
    },
    cards: [
      {
        title: 'Cafés and restaurants',
        body: 'From Fremantle brunch spots to Brisbane burger joints, owners add likes to new menu and special posts.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Online stores',
        body: 'Shopify and marketplace sellers add likes to launch and restock posts before sharing them around.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Creators and agencies',
        body: 'Creators and agencies add likes to collab and campaign posts, often spread with gradual delivery.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'From a Fremantle café to a Sydney swimwear brand, it runs the same way: one public post link, the package you want, and likes usually rolling within 6–8 hours. No login, ever.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Likes Side by Side With',
      highlight: 'Followers, Views and Comments',
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
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Likes under one post or Reel',
        needs: 'A link to that post',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'The follower total on your profile',
        needs: 'Your public handle',
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
      highlight: 'Instagram Likes in Australia?',
    },
    lead: 'It really comes down to three things: your account, your money and your details. Here is how each is handled, and the one risk that no seller can make disappear.',
    body: 'The one thing no seller can take away: Instagram’s Community Guidelines discourage artificially collected likes, and Instagram prunes inactive or fake accounts from time to time. A few likes can drop after delivery, which the six-month refill on Australian orders takes care of. A number that fits the post keeps things looking natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'We go off the public link to the post or Reel, so nobody logs in or changes a thing. NovaLikes will never ask for a password or login code; if someone using our name does, it isn’t us.',
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
      highlight: 'Instagram Likes',
    },
    lead: 'Tick off these four and your order should go through without a hitch.',
    items: [
      {
        title: 'Account is public',
        body: 'Likes can’t land on a post from a private account. Keep it public until the order wraps.',
      },
      {
        title: 'It’s the post link',
        body: 'Copy it from the post, not your profile. It contains /p/ or /reel/.',
      },
      {
        title: 'Post stays up',
        body: 'Archive or delete it before the six-month refill period ends and we can’t top it up.',
      },
      {
        title: 'Like count is showing',
        body: 'Hidden like counts still get the likes, but nobody sees them. Turn the count back on.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'What Australians ask about Instagram Likes',
    title: 'Instagram Likes FAQ for Australia',
    intro: 'Got another question? WhatsApp us on +44 7454 758272, any time of day or night.',
    cta: 'Ask on WhatsApp',
    market: {
      code: 'au',
      idPrefix: 'au-ig-l',
    },
    extra: [
      {
        id: 'au-ig-l-v2-are-the-likes-from-australia',
        question: 'Are the likes from Australia?',
        answer: 'These packages are built for posts on Australian accounts, but they are not sold as likes from people located in Australia. If you need a particular country, flick us a message on WhatsApp before ordering and we will be upfront about what is possible.',
      },
      {
        id: 'au-ig-l-v2-can-i-pay-in-australian-dollars',
        question: 'Can I pay in Australian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the amount to Australian dollars, and some Australian cards add an international transaction fee, so check with your bank if that matters.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Australian Accounts',
    intro: 'Instagram Likes shift one number. To work on a different one, choose another service.',
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
    label: 'See the Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
