import type { ServiceV2Content } from '../../types';

/** Canada market (/ca/buy-instagram-likes) — v2 service page copy. Primary keyword: "buy instagram likes canada". Do not edit wording without the content owner. */
export const CA_BUY_INSTAGRAM_LIKES_V2 = {
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
      primary: 'buy instagram likes canada',
      secondary: [
        'instagram likes canada',
        'buy canadian instagram likes',
        'buy likes on instagram canada',
        'instagram reel likes canada',
        'instagram likes canada price',
      ],
      questions: [
        'are the likes from canada',
        'how much do instagram likes cost in canada',
        'can i buy likes for a reel',
        'is it safe to buy instagram likes in canada',
        'do bought likes disappear',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Likes',
      tail: 'in Canada',
    },
    subtitle: 'Give a product drop, a patio-season special or your favourite Reel the like count it has earned. Packages from {fromPrice}, using just the post link.',
    trust: [
      'No password needed',
      '24/7 WhatsApp support',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Likes Packages for Canadian Accounts',
    intro: 'Pick a package. All prices are in US dollars.',
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
      highlight: 'Instagram Likes',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Only the public link',
        body: 'Paste the public link to the post or Reel and that is it. No password, no login code, and nobody gets into your account.',
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
        body: 'If likes from your order drop in the six months after delivery, message us your order ID and we refill them at no charge.',
      },
      {
        icon: 'image',
        tone: 'pink',
        title: 'Any public post',
        body: 'Photos, carousels and Reels all work. Each order covers one post, so the boost lands exactly where you want it.',
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
      highlight: 'Instagram Likes in Canada',
    },
    pill: 'Around 2 minutes',
    intro: 'Five steps and roughly two minutes. All we need is the link to one public post or Reel.',
    items: [
      {
        ui: 'public',
        title: 'Leave the post visible',
        body: 'Likes need a public account to land on. Keep the post up, unarchived, until delivery wraps up.',
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
        title: 'Copy the address of the post',
        body: 'From the post’s menu, choose Copy link. Paste it at checkout and add an email for updates.',
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
      unit: 'likes',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Follow along on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Private account',
      sub: 'Off until the likes arrive',
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
      lead: 'Comparing',
      highlight: 'Instagram Likes Sellers in Canada',
    },
    intro: 'Plenty of sites sell to Canadian accounts. Run any of them past these seven checks before you pay.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Post link only',
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
    title: 'Refill and Money-Back Cover on Canadian Instagram Likes Orders',
    intro: 'Both are written into our refund policy, so every order placed from Canada is covered.',
    cards: [
      {
        chip: '6 months',
        title: 'Six months of refills',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'Lost some likes in the six months after delivery? Send your order ID by WhatsApp or email and we make up the difference for free. The post or Reel needs to stay posted and public while a refill is on its way.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of purchase. Our refund policy sets out what qualifies and how to request it.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost-ca',
    title: {
      lead: 'How Much Do',
      highlight: 'Instagram Likes Cost in Canada?',
    },
    intro: 'Likes start at {fromPrice}, and every like costs less per unit as the package grows. Each price is a one-time payment in US dollars for one post or Reel.',
    points: [
      'Prices are in US dollars. Your bank converts the charge to Canadian dollars, and many Canadian cards add a foreign transaction fee.',
      'Refills for six months are part of every package.',
      'One payment per order. No renewals.',
    ],
    cols: [
      'Package',
      'Price',
      'Per 1,000 likes',
    ],
    best: 'Best price per like',
    note: 'Prices are pulled from our live packages. The total at checkout is the total you pay.',
  },
  whyBuy: {
    id: 'why-buy-instagram-likes-ca',
    title: {
      lead: 'Why Canadians Buy',
      highlight: 'Instagram Likes',
    },
    intro: 'A post’s like count is part of the split-second decision people make while scrolling. Likes help your most important posts get a fair shot at that first look. Pair it with content people enjoy; our guide on [how the Instagram algorithm works](/learn/how-instagram-algorithm-works) is a good place to start.',
    items: [
      {
        title: 'Promos that get noticed',
        body: 'A Boxing Day sale post with a dozen likes can look like nobody saw it. A healthier number changes that.',
      },
      {
        title: 'An even-looking feed',
        body: 'When older posts have hundreds of likes and new ones have a handful, the profile looks off. Likes balance it out.',
      },
      {
        title: 'Posts people want to pass on',
        body: 'Viewers are more likely to share a post with friends when it already looks popular.',
      },
    ],
    diagram: [
      'Promo noticed',
      'Even feed',
      'Easy to share',
    ],
  },
  help: {
    id: 'what-instagram-likes-can-do',
    title: {
      lead: 'Do Instagram Likes',
      highlight: 'Actually Help?',
    },
    intro: 'A likes package moves the number under one post. It is useful, but it isn’t magic, so here is where it stops.',
    no: {
      title: 'What they won’t do',
      items: [
        'Your follower total, views or comments',
        'Where Instagram surfaces the post',
        'Customers walking in, unless the offer is strong too',
      ],
    },
    yes: {
      title: 'What they will do',
      items: [
        'Likes on the exact post or Reel you choose',
        'Whether that post reads as popular at a glance',
        'How your sales and launch posts first come across',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Illustration of instagram likes on a Instagram post',
    },
  },
  who: {
    id: 'who-buys-ca',
    title: {
      lead: 'Who Orders',
      highlight: 'Instagram Likes in Canada',
    },
    cards: [
      {
        title: 'Restaurants and food trucks',
        body: 'From Montreal brunch spots to Calgary food trucks, owners add likes to new menu and special posts.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Online sellers',
        body: 'Etsy and Shopify sellers boost likes on launch and restock posts before sharing them in stories.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Creators and agencies',
        body: 'Creators and agencies add likes to sponsored and collab posts, often with gradual delivery.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'A Quebec City poutine spot and a Vancouver jewellery brand order the same way: one public post link, a size that fits, and likes typically under way within 6–8 hours. Nobody needs your login.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Likes Compared With',
      highlight: 'Followers, Views and Comments',
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
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Likes on a single post or Reel',
        needs: 'The public post link',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'How many people follow the profile',
        needs: 'Your public @username',
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
      highlight: 'Instagram Likes in Canada?',
    },
    lead: 'Safety comes down to your account, your payment and your data. Here is how we handle each, plus the one risk nobody can take away.',
    body: 'The honest caveat: Instagram’s rules frown on artificially collected likes, and it removes accounts it sees as inactive or fake every so often. A few likes may disappear after delivery, which is why Canadian orders carry a six-month refill. Choosing a number that suits the post keeps it believable.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'All we take is the public link to the post or Reel, so nobody logs in or touches your settings. NovaLikes never asks for a password or login code, and anyone who does is not us.',
      },
      {
        ui: 'pay',
        title: 'Your payment',
        body: 'You check out securely by card, Apple Pay or Google Pay. It is a single payment in US dollars that never renews.',
      },
      {
        ui: 'privacy',
        title: 'Your details',
        body: 'Your link and email are used only to fill the order and send updates. See our [privacy policy](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'before-you-order',
    title: {
      lead: 'Before You Order',
      highlight: 'Instagram Likes',
    },
    lead: 'Check these four things first and your order will run smoothly.',
    items: [
      {
        title: 'Account set to public',
        body: 'A locked account blocks delivery. Unlock it until the order is finished.',
      },
      {
        title: 'Link copied from the post',
        body: 'Profile links don’t work. The right one contains /p/ or /reel/.',
      },
      {
        title: 'Post kept online',
        body: 'If it is archived or deleted before the refill window closes, we have nothing to top up.',
      },
      {
        title: 'Count shown publicly',
        body: 'Hidden like counts still receive likes, but visitors can’t see them, which defeats the purpose.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions Canadians ask about Instagram Likes',
    title: 'Instagram Likes FAQ for Canada',
    intro: 'Didn’t find it? Message us on WhatsApp at +44 7454 758272, any hour, any province.',
    cta: 'Chat with us on WhatsApp',
    market: {
      code: 'ca',
      idPrefix: 'ca-ig-l',
    },
    extra: [
      {
        id: 'ca-ig-l-v2-are-the-likes-from-canada',
        question: 'Are the likes from Canada?',
        answer: 'These packages are made for posts on Canadian accounts, but they are not sold as likes from people located in Canada. If you need a specific country, message us on WhatsApp before ordering and we will tell you straight what is possible.',
      },
      {
        id: 'ca-ig-l-v2-can-i-pay-in-canadian-dollars',
        question: 'Can I pay in Canadian dollars?',
        answer: 'Prices are set and charged in US dollars. Your bank shows the charge in Canadian dollars, and many Canadian cards add a foreign transaction fee, so check with your card issuer if that matters to you.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Canadian Accounts',
    intro: 'Instagram Likes change one number. Want to grow a different one? Pick a service below.',
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
    label: 'View Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
