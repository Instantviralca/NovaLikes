import type { ServiceV2Content } from '../../types';

/** Canada market (/ca/buy-facebook-followers) — v2 service page copy. Primary keyword: "buy facebook followers canada". Do not edit wording without the content owner. */
export const CA_BUY_FACEBOOK_FOLLOWERS_V2 = {
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
      primary: 'buy facebook followers canada',
      secondary: [
        'facebook followers canada',
        'buy facebook page followers canada',
        'buy canadian facebook followers',
        'facebook followers canada price',
        'grow facebook page canada',
      ],
      questions: [
        'are the followers from canada',
        'can i buy followers for a personal profile',
        'how much do facebook followers cost in canada',
        'do you need admin access',
        'is it safe to buy facebook followers in canada',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Facebook Followers',
      tail: 'in Canada',
    },
    subtitle: 'Lots of Canadians still look up a business on Facebook before they call, book or drop by. Make sure your Page looks like one people trust. From {fromPrice}, with just the Page link.',
    trust: [
      'No password needed',
      '24/7 WhatsApp support',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Facebook Followers Packages for Canadian Accounts',
    intro: 'Pick a package. All prices are in US dollars.',
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
      highlight: 'Facebook Followers',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'The link, never admin rights',
        body: 'Paste the public link to your Page or profile and that is it. No password, no admin role, no login code.',
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
        title: 'Pages and public profiles',
        body: 'Works for Facebook Pages and for personal profiles with “Who can follow me” set to Public. No admin role needed.',
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
      highlight: 'Facebook Followers in Canada',
    },
    pill: 'Around 2 minutes',
    intro: 'About two minutes, five steps. We only need the public link to your Page or profile.',
    items: [
      {
        ui: 'public',
        title: 'Make following possible',
        body: 'Your Page must be published. On a personal profile, open Settings, then Followers and public content, and allow Public followers.',
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
        title: 'Copy the Page address',
        body: 'Copy the link to the Page or profile itself and paste it at checkout with an email for updates.',
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
      lead: 'Comparing',
      highlight: 'Facebook Followers Sellers in Canada',
    },
    intro: 'Plenty of sites sell to Canadian accounts. Run any of them past these seven checks before you pay.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Page link only',
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
    title: 'Refill and Money-Back Cover on Canadian Facebook Followers Orders',
    intro: 'Both are written into our refund policy, so every order placed from Canada is covered.',
    cards: [
      {
        chip: '6 months',
        title: 'Six months of refills',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-order-process.webp',
        body: 'Lost some followers in the six months after delivery? Send your order ID by WhatsApp or email and we make up the difference for free. Your Page address needs to stay the same, and the Page public, while a refill is on its way.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of purchase. Our refund policy sets out what qualifies and how to request it.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-followers-cost-ca',
    title: {
      lead: 'How Much Do',
      highlight: 'Facebook Followers Cost in Canada?',
    },
    intro: 'Followers start at {fromPrice}, and the price per thousand comes down as the package grows. Each price is a one-time payment in US dollars for one Page or profile.',
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
    id: 'why-buy-facebook-followers-ca',
    title: {
      lead: 'Why Canadians Buy',
      highlight: 'Facebook Followers',
    },
    intro: 'In smaller towns and big cities alike, Facebook is still where many Canadians check hours, read updates and size up a local business. A healthy follower count makes your Page look active at a glance. Pair it with content people enjoy; our guide on [how Facebook Page reach works](/learn/how-facebook-page-reach-works) is a good place to start.',
    items: [
      {
        title: 'A Page that looks open',
        body: 'A Page with 70 followers can look abandoned, even if the business is busy every day.',
      },
      {
        title: 'Trust before the first call',
        body: 'Contractors, clinics and salons often get checked on Facebook before anyone reaches out.',
      },
      {
        title: 'New Pages that don’t start empty',
        body: 'New businesses, second locations and rebrands get a head start instead of opening at zero.',
      },
    ],
    diagram: [
      'Looks open',
      'Trusted first',
      'New Page start',
    ],
  },
  help: {
    id: 'what-facebook-followers-can-do',
    title: {
      lead: 'Do Facebook Followers',
      highlight: 'Actually Help?',
    },
    intro: 'A follower package moves the total on your Page or profile. Who sees your posts is still Facebook’s call.',
    no: {
      title: 'What they won’t do',
      items: [
        'Reactions or comments on posts',
        'How far your posts travel',
        'Enquiries, unless the Page gives people a reason to call',
      ],
    },
    yes: {
      title: 'What they will do',
      items: [
        'Your follower total on Facebook',
        'Whether newcomers see an active, trusted Page',
        'How you come across before someone calls',
      ],
      image: '/assets/images/illustrations/facebook-followers/facebook-followers-does-help.webp',
      altFallback: 'Illustration of facebook followers on a Facebook page',
    },
  },
  who: {
    id: 'who-buys-ca',
    title: {
      lead: 'Who Orders',
      highlight: 'Facebook Followers in Canada',
    },
    cards: [
      {
        title: 'Contractors and trades',
        body: 'Roofers, landscapers and renovators add followers so their Page looks as dependable as their work.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-best-practices.webp',
      },
      {
        title: 'Local services',
        body: 'Physio clinics, pet groomers and tutors grow their Page before opening new spots or running a promo.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        title: 'Community organizations',
        body: 'Minor hockey associations, farmers’ markets and charities add followers to look active to new members.',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp',
      },
    ],
    statement: 'A Moncton landscaper and a Burlington pet groomer take the same steps: share the public link, choose a size, and expect followers to begin arriving within 6–8 hours. No admin rights, no password.',
  },
  vs: {
    id: 'facebook-followers-vs-other-services',
    title: {
      lead: 'Facebook Followers Compared With',
      highlight: 'Page Likes and Post Likes',
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
        slug: 'buy-facebook-followers',
        label: 'Followers',
        changes: 'Followers of a Page or public profile',
        needs: 'The Page or profile link',
        current: true,
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Page Likes',
        changes: 'Likes on an older-style Page',
        needs: 'The Page link',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Post Likes',
        changes: 'Reactions on a single public post',
        needs: 'The public post link',
      },
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Facebook Followers in Canada?',
    },
    lead: 'Safety comes down to your account, your payment and your data. Here is how we handle each, plus the one risk nobody can take away.',
    body: 'The honest caveat: Facebook’s Community Standards forbid inauthentic behaviour, and Meta removes fake or inactive accounts from time to time. A few followers may drop after delivery, so Canadian orders carry a six-month refill. Gradual delivery and steady posting keep the Page believable.',
    cards: [
      {
        ui: 'nopass',
        title: 'Your account',
        body: 'All we take is the public link to your Page or profile, so nobody needs admin rights. NovaLikes never asks for a password or login code, and anyone who does is not us.',
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
      highlight: 'Facebook Followers',
    },
    lead: 'Check these four things first and your order will run smoothly.',
    items: [
      {
        title: 'Following allowed',
        body: 'Unpublished Pages, or profiles that block public followers, can’t receive an order.',
      },
      {
        title: 'Page link, not a post',
        body: 'The right address points to the Page or profile, like facebook.com/yourpage.',
      },
      {
        title: 'Same Page address',
        body: 'Changing the URL before the refill window closes means we can’t find it.',
      },
      {
        title: 'A believable jump',
        body: 'Match the package to your current followers and how often you post.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Questions Canadians ask about Facebook Followers',
    title: 'Facebook Followers FAQ for Canada',
    intro: 'Didn’t find it? Message us on WhatsApp at +44 7454 758272, any hour, any province.',
    cta: 'Chat with us on WhatsApp',
    market: {
      code: 'ca',
      idPrefix: 'ca-fb-f',
    },
    extra: [
      {
        id: 'ca-fb-f-v2-are-the-followers-from-canada',
        question: 'Are the followers from Canada?',
        answer: 'These packages are made for Canadian Pages and profiles, but they are not sold as followers from people located in Canada. If you need a specific country, message us on WhatsApp before ordering and we will tell you straight what is possible.',
      },
      {
        id: 'ca-fb-f-v2-do-you-need-admin-access-to-my-page',
        question: 'Do you need admin access to my Page?',
        answer: 'No. We only need the public link. Never give anyone admin access or your Facebook password to get followers.',
      },
      {
        id: 'ca-fb-f-v2-can-i-pay-in-canadian-dollars',
        question: 'Can I pay in Canadian dollars?',
        answer: 'Prices are set and charged in US dollars. Your bank shows the charge in Canadian dollars, and many Canadian cards add a foreign transaction fee, so check with your card issuer if that matters to you.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'More Services for Canadian Accounts',
    intro: 'Facebook Followers change one number. Want to grow a different one? Pick a service below.',
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
    label: 'View Packages',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
