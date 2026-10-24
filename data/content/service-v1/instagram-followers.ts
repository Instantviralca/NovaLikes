/**
 * Instagram Followers service page v1 — all visible copy (Buzzoid-style layout).
 * Generated from the reference prototype. Do not edit wording here without the content owner.
 *
 * - `{fromPrice}`, `{quantity}`, `{amount}` are filled at render time from the pricing registry.
 * - Package tiles, prices and badges come from the registry (vm.pricing.packages), never from this file.
 * - FAQ items come from the existing faq ids of buy-instagram-followers (data/content/faq.ts).
 * - Icons are lucide-react names (see CURSOR_PROMPT.md for the mapping).
 */
export const IG_FOLLOWERS_V1 = {
  hero: {
    eyebrow: 'Instagram followers',
    title: {
      lead: 'Buy',
      highlight: 'Instagram Followers',
      tail: 'to Build Profile Credibility',
    },
    subtitle: 'Brands, collaborators and new visitors check your follower count before they follow. Build a profile that looks trusted, from {fromPrice}, without sharing your Instagram password.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
      '30-day money-back on eligible orders',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Followers Packages & Pricing',
    intro: 'Pick how many followers you want. The price shown is the price you pay, in US dollars.',
    unit: 'Followers',
    summaryName: '{quantity} Instagram Followers',
    save: 'You save {amount}',
    cta: 'Add to Cart',
    oneTime: 'One-time purchase. No subscription.',
    secure: 'Secure card checkout · Prices in USD',
    features: [
      {
        icon: 'shield',
        title: 'No password needed',
        body: 'We only ask for your public username.',
      },
      {
        icon: 'clock',
        title: 'Starts in 6–8 hours',
        body: 'Finishes 4–6 hours after it starts.',
      },
      {
        icon: 'message-square',
        title: '24/7 WhatsApp help',
        body: 'Message us any time, day or night.',
      },
    ],
  },
  marquee: [
    'Public username only',
    'Never your password',
    'Starts in 6–8 hours',
    'Gradual delivery on request',
    '6-month refill',
    '30-day money-back on eligible orders',
    '24/7 WhatsApp support',
    'Track every order',
  ],
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Why Choose NovaLikes for',
      highlight: 'Instagram Followers?',
    },
    intro: 'Five things you can check before you pay, and hold us to after you order.',
    items: [
      {
        icon: 'shield',
        title: 'Your username, never your password',
        body: 'We need the public @username of the profile and nothing else. No password, no login code, no access to your account.',
      },
      {
        icon: 'clock',
        title: 'Clear start and finish times',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after they start. Prefer a slower pace? Ask for gradual delivery.',
      },
      {
        icon: 'refresh-cw',
        title: '6-month refill',
        body: 'If followers from your order drop within 6 months of delivery, send us your order ID and we top them up at no extra cost.',
      },
      {
        icon: 'badge-check',
        title: '30-day money-back guarantee',
        body: 'Eligible orders are covered for 30 days from the purchase date. Our refund policy spells out what counts.',
      },
      {
        icon: 'message-square',
        title: 'Help on WhatsApp, 24/7',
        body: 'Questions before or after you order? Message +44 7454 758272 with your order ID, day or night.',
      },
    ],
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'How to Buy',
      highlight: 'Instagram Followers',
    },
    intro: 'Five short steps, and you never type a password anywhere.',
    items: [
      {
        ui: 'public',
        title: 'Make your profile public',
        body: 'Followers can only be delivered to a public profile. You can switch back to private once the order is complete.',
      },
      {
        ui: 'packages',
        title: 'Pick a package',
        body: 'Choose a quantity from the packages above. Each tile shows the price before you commit.',
      },
      {
        ui: 'username',
        title: 'Add your username',
        body: 'Type the public @username that should receive the followers. Check the spelling, because we deliver to exactly what you enter.',
      },
      {
        ui: 'pay',
        title: 'Pay securely',
        body: 'Check out by card in US dollars. It is a one-time payment, with nothing recurring.',
      },
      {
        ui: 'deliver',
        title: 'Watch the count grow',
        body: 'Most orders start within 6–8 hours and finish 4–6 hours after that. Gradual delivery is available if you ask.',
      },
    ],
    done: {
      title: 'That’s it.',
      body: 'Follow your order on the Track Order page with your order ID.',
      link: {
        label: 'Track an order',
        href: '/track-order',
      },
    },
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'How to Spot a',
      highlight: 'Risky Follower Seller',
    },
    intro: 'Whoever you buy from, check these seven things first. Here is how NovaLikes answers each one.',
    cols: [
      'What to check',
      'NovaLikes',
      'Red flag',
    ],
    rows: [
      {
        label: 'Login details',
        novalikes: 'Public username only',
        redFlag: 'Asks for your password or a login code',
      },
      {
        label: 'Timing',
        novalikes: 'Starts in 6–8 hours, finishes 4–6 hours later',
        redFlag: 'No timeframe at all, or only “instant”',
      },
      {
        label: 'Drops',
        novalikes: '6-month refill from the delivery date',
        redFlag: 'No refill, or no way to claim one',
      },
      {
        label: 'Refunds',
        novalikes: '30-day money-back on eligible orders, in a written policy',
        redFlag: 'No refund policy you can read',
      },
      {
        label: 'Support',
        novalikes: '24/7 WhatsApp with your order ID',
        redFlag: 'No contact details, or email only',
      },
      {
        label: 'Price',
        novalikes: 'Shown in USD before checkout',
        redFlag: 'Price changes at checkout',
      },
      {
        label: 'Tracking',
        novalikes: 'Track Order page with your order ID',
        redFlag: 'No way to check progress',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Our Promises on Every',
      highlight: 'Followers Order',
    },
    intro: 'These are written into our policies, not just this page.',
    items: [
      {
        key: 'refill',
        icon: 'refresh-cw',
        title: '6-month refill',
        chip: '6-month refill',
        body: 'If followers from your order drop within 6 months of delivery, message us on WhatsApp or email with your order ID and we refill them. Keep the same username and a public profile during that time.',
      },
      {
        key: 'money',
        icon: 'badge-check',
        title: '30-day money-back guarantee',
        chip: '30 days',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
      {
        key: 'password',
        icon: 'shield',
        title: 'Never your password',
        chip: 'Username only',
        body: 'We will never ask for your Instagram password or a login code, before or after you order. If anyone claiming to be us does, it is not us.',
      },
      {
        key: 'pace',
        icon: 'gauge',
        title: 'Gradual delivery on request',
        chip: 'Your pace',
        body: 'Prefer the followers to arrive slowly? Add a note at checkout or tell us on WhatsApp and we will spread the delivery out.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  whyBuy: {
    id: 'why-buy-instagram-followers',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'Instagram Followers?',
    },
    intro: 'Most people who order are not starting from nothing. They have content they believe in and a follower count that undersells it.',
    image: {
      src: '/assets/images/illustrations/instagram-followers/instagram-followers-why-buy.webp',
      w: 1536,
      h: 1024,
      altFallback: 'Illustration of new followers joining an Instagram profile',
    },
    items: [
      {
        title: 'A stronger first impression',
        body: 'Visitors glance at the follower count before they read a single caption. A fuller profile gets a fairer first look.',
      },
      {
        title: 'A head start for a new account',
        body: 'A new brand, side project or creator account doesn’t have to sit at a few dozen followers while you build it up.',
      },
      {
        title: 'Support for a launch or pitch',
        body: 'Teams add followers before a product launch, a campaign or a brand pitch, alongside the posts that do the real work.',
      },
    ],
    note: 'A package changes the visible follower count. It does not add likes, views or comments, and it can’t promise reach or sales.',
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'Instagram Followers',
    },
    tabs: [
      {
        key: 'creators',
        label: 'Creators',
        icon: 'star',
        body: 'Creators use followers to give a growing account the profile it deserves while they keep posting Reels and Stories.',
        points: [
          'New accounts that need a starting audience',
          'Creators pitching their first brand deals',
          'Relaunching an older account with a new focus',
        ],
      },
      {
        key: 'business',
        label: 'Small businesses',
        icon: 'building',
        body: 'Local shops, salons, cafés and service businesses often find customers through Instagram before they find a website.',
        points: [
          'A profile that looks active when customers check it',
          'Support for an opening, menu or product launch',
          'Pairs well with regular posts about your work',
        ],
      },
      {
        key: 'brands',
        label: 'Brands & agencies',
        icon: 'layers',
        body: 'Brands and agencies add followers to new or regional accounts so they match the main brand’s presence.',
        points: [
          'New country or product-line accounts',
          'Campaign accounts with a short timeline',
          'Gradual delivery for a steadier look',
        ],
      },
    ],
    image: {
      src: '/assets/images/illustrations/instagram-followers/instagram-followers-best-practices.webp',
      w: 1024,
      h: 1024,
    },
  },
  help: {
    id: 'does-buying-instagram-followers-help',
    title: {
      lead: 'Does Buying Instagram Followers',
      highlight: 'Help?',
    },
    intro: 'It helps with one thing: the number people see on your profile. Here is the honest split.',
    image: {
      src: '/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp',
      w: 1536,
      h: 1024,
      altFallback: 'Illustration of an Instagram profile with a growing follower count',
    },
    yes: {
      title: 'What it changes',
      items: [
        'The follower count shown on your profile',
        'The first impression for new visitors',
        'How established a new account looks',
      ],
    },
    no: {
      title: 'What it doesn’t change',
      items: [
        'Likes, views or comments on your posts',
        'Your reach, Explore or Reels recommendations',
        'Sales, sign-ups or messages on their own',
      ],
    },
    rules: 'Instagram’s Community Guidelines ask people not to collect followers, likes or shares artificially. Keep posting your own content, and decide whether a package fits how you use your account.',
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Before You',
      highlight: 'Order',
    },
    intro: 'Run through this list once. It prevents almost every delivery problem we see.',
    image: {
      src: '/assets/images/illustrations/instagram-followers/instagram-followers-delivery-requirements.webp',
      w: 1536,
      h: 1024,
      alt: 'Instagram follower order requirements — public username only, no password required',
    },
    items: [
      {
        title: 'Your profile is public',
        body: 'Keep it public until delivery is complete. A private profile stops the order from starting or finishing.',
      },
      {
        title: 'The username is spelled right',
        body: 'We deliver to exactly what you type. Copy it from your profile to be safe.',
      },
      {
        title: 'You won’t change the username',
        body: 'Keep the same username during delivery and the 6-month refill period, or we can’t find the profile.',
      },
      {
        title: 'One order per profile at a time',
        body: 'Wait for one order to finish before starting another for the same profile, so the count and the refill stay easy to check.',
      },
      {
        title: 'You know the pace you want',
        body: 'Want followers to arrive slowly? Ask for gradual delivery at checkout or on WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    title: {
      lead: 'Instagram Followers',
      highlight: 'FAQ',
    },
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
  },
  more: {
    id: 'related-instagram-services',
    title: {
      lead: 'Explore Other',
      highlight: 'Instagram Services',
    },
    intro: 'Followers grow the profile. To lift one post or Reel instead, pick a service below.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Instagram Likes',
        line: 'For posts, carousels and Reels',
        icon: 'heart',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Instagram Views',
        line: 'For Reels and videos',
        icon: 'eye',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Instagram Comments',
        line: 'For one public post',
        icon: 'message-circle',
      },
    ],
    cardPrice: 'From {fromPrice}',
    guidesTitle: 'Guides for Growing on Instagram',
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
  finalCta: {
    id: 'ig-followers-final-cta',
    title: {
      lead: 'Choose Your',
      highlight: 'Instagram Followers',
      tail: 'Package',
    },
    body: 'Pick a quantity, add your public username and check out in USD. No password, a 6-month refill, and help on WhatsApp whenever you need it.',
    primary: {
      label: 'View Instagram Followers Packages',
      href: '#pricing-packages',
    },
    secondary: {
      label: 'Track an Order',
      href: '/track-order',
    },
    image: {
      src: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      w: 1536,
      h: 1024,
      alt: 'Instagram profile dashboard showing available follower packages',
    },
  },
  sticky: {
    label: 'Choose a Package',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} as const;

export type IgFollowersV1 = typeof IG_FOLLOWERS_V1;
