import type { ServiceV2Content } from '../../types';

/** Canada market (/ca/buy-facebook-post-likes) — v2 service page copy. Primary keyword: "buy facebook post likes canada". Do not edit wording without the content owner. */
export const CA_BUY_FACEBOOK_POST_LIKES_V2 = {
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
      primary: 'buy facebook post likes canada',
      secondary: [
        'facebook post likes canada',
        'buy likes on facebook post canada',
        'buy facebook reactions canada',
        'facebook post likes canada price',
        'buy canadian facebook post likes',
      ],
      questions: [
        'can i choose love or other reactions',
        'does the post need to be public',
        'how much do facebook post likes cost in canada',
        'are the likes from canada',
        'is it safe to buy facebook post likes in canada',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Post Likes',
      tail: 'in Canada',
    },
    subtitle: 'An event, a sale or big news deserves more than a couple of reactions. Give one public post the response it should get. From {fromPrice}, with Love and other reactions on request.',
    trust: [
      'No password needed',
      '24/7 WhatsApp support',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Post Likes Packages for Canadian Accounts',
    intro: 'Pick a package. All prices are in US dollars.',
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
      highlight: 'Facebook Post Likes',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'The link, never admin rights',
        body: 'Paste the public link to your post and that is it. No password, no admin role, no login code.',
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
        icon: 'heart',
        tone: 'pink',
        title: 'Like, Love and more',
        body: 'Orders come in as Likes by default. Prefer Love or another reaction? Add it to the checkout note before the order starts.',
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
      highlight: 'Facebook Post Likes in Canada',
    },
    pill: 'Around 2 minutes',
    intro: 'Five steps in about two minutes. All we need is the link to one public post.',
    items: [
      {
        ui: 'public',
        title: 'Check the audience is Public',
        body: 'The globe icon next to the date means Public. Friends-only or custom audiences block the order.',
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
        title: 'Copy the post address',
        body: 'Use Share, then Copy link, and paste it at checkout. Put any reaction other than Like in the note.',
      },
      {
        ui: 'pay',
        title: 'Check out once',
        body: 'Pay by card, Apple Pay or Google Pay in US dollars. It is a one-time charge with no subscription.',
      },
    ],
    done: {
      title: 'All set!',
      count: 500,
      unit: 'likes',
      body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Follow along on the Track Order page with your order ID.',
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
      lead: 'Comparing',
      highlight: 'Facebook Post Likes Sellers in Canada',
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
    title: 'Refill and Money-Back Cover on Canadian Facebook Post Likes Orders',
    intro: 'Both are written into our refund policy, so every order placed from Canada is covered.',
    cards: [
      {
        chip: '6 months',
        title: 'Six months of refills',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'Lost some likes in the six months after delivery? Send your order ID by WhatsApp or email and we make up the difference for free. The post needs to stay posted and public while a refill is on its way.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of purchase. Our refund policy sets out what qualifies and how to request it.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost-ca',
    title: {
      lead: 'How Much Do',
      highlight: 'Facebook Post Likes Cost in Canada?',
    },
    intro: 'Post Likes start at {fromPrice}, and each like costs less as the package grows. Each price is a one-time payment in US dollars for one post.',
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
    id: 'why-buy-facebook-post-likes-ca',
    title: {
      lead: 'Why Canadians Buy',
      highlight: 'Facebook Post Likes',
    },
    intro: 'Reactions are the quickest sign on Facebook that a post matters. Low numbers on an important update can make it look ignored, even when people loved it in person. Pair it with content people enjoy; our guide on [how to get more likes on a Facebook post](/learn/how-to-get-more-likes-on-facebook-post) is a good place to start.',
    items: [
      {
        title: 'Events that look well attended',
        body: 'Trivia nights, open houses and fundraisers look more inviting with plenty of reactions.',
      },
      {
        title: 'Sales people stop for',
        body: 'Promotion posts with a healthy count look worth a closer look.',
      },
      {
        title: 'Milestones that feel celebrated',
        body: 'Grand openings, anniversaries and awards deserve a response that matches.',
      },
    ],
    diagram: [
      'Busy event',
      'Noticed sale',
      'Celebrated milestone',
    ],
  },
  help: {
    id: 'what-facebook-post-likes-can-do',
    title: {
      lead: 'Do Facebook Post Likes',
      highlight: 'Actually Help?',
    },
    intro: 'Post Likes raise the reactions on one public post. Here is where their effect ends.',
    no: {
      title: 'What they won’t do',
      items: [
        'Page followers or Page likes',
        'Comments or shares',
        'How widely Facebook shows later posts',
      ],
    },
    yes: {
      title: 'What they will do',
      items: [
        'Reactions on the exact post you choose',
        'Whether the post reads as popular',
        'How events, sales and news first come across',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Illustration of facebook post likes on a Facebook post',
    },
  },
  who: {
    id: 'who-buys-ca',
    title: {
      lead: 'Who Orders',
      highlight: 'Facebook Post Likes in Canada',
    },
    cards: [
      {
        title: 'Pubs and venues',
        body: 'Pubs, music venues and curling clubs add reactions to trivia nights, live shows and game-night posts.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Schools, clubs and charities',
        body: 'Sports clubs, parent councils and charities add reactions to fundraisers and open-house posts.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Local businesses',
        body: 'Shops and services add reactions to sales and grand-opening news, sometimes as Love instead of Like.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'A Kingston trivia night and a Lethbridge fundraiser are handled the same way: one public post link, your size and reaction, and likes typically under way within 6–8 hours. No login required.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Facebook Post Likes Compared With',
      highlight: 'Followers and Page Likes',
    },
    intro: 'Every service moves a different number. Pick the one visitors should see first, or read the [side-by-side guide](/learn/facebook-followers-vs-page-likes-vs-post-likes).',
    cols: [
      'Service',
      'What it moves',
      'What we need',
      'From',
    ],
    rows: [
      {
        slug: 'buy-facebook-post-likes',
        label: 'Post Likes',
        changes: 'Reactions on a single public post',
        needs: 'The public post link',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'Followers of a Page or public profile',
        needs: 'The Page or profile link',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'Likes on an older-style Page',
        needs: 'The Page link',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Facebook Post Likes in Canada?',
    },
    lead: 'Safety comes down to your account, your payment and your data. Here is how we handle each, plus the one risk nobody can take away.',
    body: 'The honest caveat: Facebook’s Community Standards forbid inauthentic behaviour, and Meta removes fake or inactive accounts from time to time. A few reactions may drop after delivery, so Canadian orders carry a six-month refill. Keeping reactions in line with the post’s reach looks most natural.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'All we take is the public link to your post, so nobody needs admin rights. NovaLikes never asks for a password or login code, and anyone who does is not us.',
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
      highlight: 'Facebook Post Likes',
    },
    lead: 'Check these four things first and your order will run smoothly.',
    items: [
      {
        title: 'Audience set to Public',
        body: 'Look for the globe icon. Other audiences block delivery.',
      },
      {
        title: 'Post link, not Page link',
        body: 'Copy the address from the post’s Share menu.',
      },
      {
        title: 'Reaction requested',
        body: 'Like is the default. Ask for Love or another reaction in the note before we start.',
      },
      {
        title: 'Post kept online',
        body: 'Deleting it before the refill window closes leaves nothing to top up.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions Canadians ask about Facebook Post Likes',
    title: 'Facebook Post Likes FAQ for Canada',
    intro: 'Didn’t find it? Message us on WhatsApp at +44 7454 758272, any hour, any province.',
    cta: 'Chat with us on WhatsApp',
    market: {
      code: 'ca',
      idPrefix: 'ca-fb-post',
    },
    extra: [
      {
        id: 'ca-fb-post-v2-are-the-likes-from-canada',
        question: 'Are the likes from Canada?',
        answer: 'These packages are made for posts on Canadian Pages and profiles, but they are not sold as likes from people located in Canada. If you need a specific country, message us on WhatsApp before ordering and we will tell you straight what is possible.',
      },
      {
        id: 'ca-fb-post-v2-can-i-pay-in-canadian-dollars',
        question: 'Can I pay in Canadian dollars?',
        answer: 'Prices are set and charged in US dollars. Your bank shows the charge in Canadian dollars, and many Canadian cards add a foreign transaction fee, so check with your card issuer if that matters to you.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Canadian Accounts',
    intro: 'Facebook Post Likes change one number. Want to grow a different one? Pick a service below.',
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
    label: 'View Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
