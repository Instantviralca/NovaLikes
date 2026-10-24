import type { ServiceV2Content } from './types';

/** Instagram Comments — v2 service page copy. Primary keyword: "buy instagram comments". Do not edit wording without the content owner. */
export const BUY_INSTAGRAM_COMMENTS_V2 = {
  meta: {
    slug: 'buy-instagram-comments',
    platform: 'Instagram',
    name: 'Instagram Comments',
    unit: 'comments',
    unitSingular: 'comment',
    inputKind: 'link',
    perUnit: 1,
    tiers: true,
    keywords: {
      primary: 'buy instagram comments',
      secondary: [
        'buy custom instagram comments',
        'instagram comments packages',
        'buy comments on instagram reels',
        'premium instagram comments',
        'instagram comments price',
      ],
      questions: [
        'is it safe to buy instagram comments',
        'how much do instagram comments cost',
        'can i write my own instagram comments',
        'why do bought comments disappear',
        'high quality vs premium comments',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Buy',
      highlight: 'Instagram Comments',
      tail: 'to Start the Conversation',
    },
    subtitle: 'A post with comments feels active and invites others to join in. Get High Quality comments, or Premium ones written around your post, from {fromPrice}. You can also send your own wording.',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Instagram Comments Packages & Pricing',
    intro: 'Pick a tier and a package. Prices in USD.',
    summaryName: '{quantity} {tier} Instagram Comments',
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
        body: 'Finishes 4–6h later',
      },
      {
        icon: 'message-square',
        title: 'Here to help',
        body: '24/7 on WhatsApp',
      },
    ],
    tiers: [
      {
        label: 'High Quality',
        note: 'Short, positive comments that suit most posts.',
      },
      {
        label: 'Premium',
        note: 'Comments written around your post, from more realistic-looking accounts.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Why Choose NovaLikes for',
      highlight: 'Instagram Comments?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Just a link, never your password',
        body: 'We only need the public link to the post or Reel. No login code and no access to your account.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Clear start and finish times',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after they start. Prefer a slower pace? Ask for gradual delivery.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: '6-month refill',
        body: 'If comments from your order drop within 6 months of delivery, send us your order ID and we top them up at no extra cost.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: '30-day money-back guarantee',
        body: 'Eligible orders are covered for 30 days from the purchase date. Our refund policy spells out what counts.',
      },
      {
        icon: 'pen',
        tone: 'pink',
        title: 'Your own wording, or ours',
        body: 'Send your own comments in the checkout note, one per line, or let our team write them. English by default, other languages on request.',
      },
    ],
    promo: {
      eyebrow: 'Not sure which package?',
      title: 'Ask us before you buy',
      cta: 'Chat on WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'How to Buy',
      highlight: 'Instagram Comments',
    },
    pill: 'About 2 minutes',
    intro: 'Ordering takes five short steps. Choose High Quality or Premium, paste the link to one public post or Reel, and send your own wording if you want to.',
    items: [
      {
        ui: 'public',
        title: 'Keep comments open',
        body: 'The post must be on a public account with comments turned on for everyone. Limits like “followers only” stop the order from starting.',
      },
      {
        ui: 'packages',
        title: 'Pick a tier and package',
        body: 'Choose High Quality or Premium, then a quantity. Each package shows the price before you commit.',
      },
      {
        ui: 'cart',
        title: 'Add to cart',
        body: 'Click “Add to Cart”, then continue to checkout.',
      },
      {
        ui: 'username',
        title: 'Paste the link and wording',
        body: 'Copy the link to the post or Reel and paste it at checkout. Add your own comments in the note, one per line, or leave it to us.',
      },
      {
        ui: 'pay',
        title: 'Pay securely',
        body: 'Pay once by card, Apple Pay or Google Pay, in US dollars. There is no subscription.',
      },
    ],
    done: {
      title: 'That’s it!',
      count: 25,
      unit: 'comments',
      body: 'Most orders start within 6–8 hours and finish 4–6 hours later. Follow progress on the Track Order page with your order ID.',
    },
  },
  ui: {
    toggle: {
      label: 'Comments turned off',
      sub: 'Off, so we can comment',
    },
    chips: [
      '10',
      '25',
      '50',
      '100',
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
    id: 'spot-a-risky-seller',
    title: {
      lead: 'How to Spot a Risky',
      highlight: 'Instagram Comments Seller',
    },
    intro: 'Whoever you buy from, check these seven things first.',
    us: 'NovaLikes',
    them: 'Risky sellers',
    rows: [
      {
        label: 'Login details',
        novalikes: 'Post link only',
        riskySeller: 'Ask for your password',
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
        novalikes: '24/7 WhatsApp',
        riskySeller: 'Hard to reach',
      },
      {
        label: 'Price',
        novalikes: 'Shown in USD upfront',
        riskySeller: 'Changes at checkout',
      },
      {
        label: 'Tracking',
        novalikes: 'Track Order page',
        riskySeller: 'No way to check',
      },
    ],
    note: '*On eligible orders, as set out in our refund policy.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill and Money-Back Promises for Instagram Comments',
    intro: 'Both are written into our refund policy, not just this page.',
    cards: [
      {
        chip: '6 months',
        title: '6-month refill',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp',
        body: 'If comments from your order drop within 6 months of the delivery date, message us on WhatsApp or email with your order ID and we refill the shortfall at no extra cost. Keep the post or Reel up and public while a refill is being delivered.',
      },
      {
        chip: '30 days',
        title: '30-day money-back guarantee',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-package-cta.webp',
        body: 'Eligible orders can be refunded within 30 days of the purchase date. The refund policy lists what is eligible and how to ask.',
      },
    ],
    link: {
      label: 'Read the refund policy',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-comments-cost',
    title: {
      lead: 'How Much Do',
      highlight: 'Instagram Comments Cost?',
    },
    intro: 'Packages start at {fromPrice}. High Quality comments cost less per comment, while Premium comments cost more because each one is written around your post. Every price is a one-time payment in US dollars, for one post or Reel.',
    points: [
      'The 6-month refill is included. There is nothing extra to add.',
      'No subscription and no renewal. You pay once per order.',
      'Pay by card, Apple Pay or Google Pay.',
    ],
    cols: [
      'Package',
      'Price',
      'Per comment',
    ],
    best: 'Lowest per comment',
    note: 'Prices come from our live packages. The price you see at checkout is the price you pay.',
  },
  whyBuy: {
    id: 'why-buy-instagram-comments',
    title: {
      lead: 'Why Do People Buy',
      highlight: 'Instagram Comments?',
    },
    intro: 'An empty comment section makes even a good post look quiet. A few relevant comments show people the post is being talked about, and they make it easier for the next person to join in. It works best next to good content, so see [how the Instagram algorithm works](/learn/how-instagram-algorithm-works) too.',
    items: [
      {
        title: 'Posts that feel active',
        body: 'Comments are the clearest sign that people care about a post. A few good ones change how the whole post reads.',
      },
      {
        title: 'An easier first reply',
        body: 'People hesitate to be the first to comment. Once a conversation has started, real visitors are more likely to add to it.',
      },
      {
        title: 'The message you want seen',
        body: 'With your own wording, comments can highlight a product detail, a question or a reaction you want visitors to notice.',
      },
    ],
    diagram: [
      'Active post',
      'First reply',
      'Your message',
    ],
  },
  help: {
    id: 'does-buying-instagram-comments-help',
    title: {
      lead: 'Does Buying Instagram Comments',
      highlight: 'Help?',
    },
    intro: 'Comments change what people see under one post. They don’t bring followers or reach on their own. Here is the honest split.',
    no: {
      title: 'What it doesn’t change',
      items: [
        'Your follower count, likes or views',
        'Explore or Reels placement by themselves',
        'Real replies that keep the conversation going',
      ],
    },
    yes: {
      title: 'What it changes',
      items: [
        'The comment section on the post you choose',
        'How active the post looks to new visitors',
        'Which points get noticed, if you send your own wording',
      ],
      image: '/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp',
      altFallback: 'Illustration of instagram comments on a Instagram post',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Who Orders',
      highlight: 'Instagram Comments',
    },
    cards: [
      {
        title: 'Creators',
        body: 'Creators add comments to Reels and carousels that deserve more conversation, often with their own wording to match the post.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-best-practices.webp',
      },
      {
        title: 'Small businesses',
        body: 'Businesses use comments on product and offer posts, so questions and reactions show up where customers look.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
      {
        title: 'Brands & agencies',
        body: 'Brands and agencies pick Premium comments for campaign posts, where comments need to read naturally next to the content.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-why-buy.webp',
      },
    ],
    statement: 'Whatever the post, the order works the same way: one public link, the tier you choose, your wording if you want it, and comments that usually start within 6–8 hours. Nobody ever needs your login.',
  },
  vs: {
    id: 'instagram-comments-vs-other-services',
    title: {
      lead: 'Instagram Comments vs',
      highlight: 'Likes, Views and Followers',
    },
    intro: 'Each service changes a different number. Pick the one that matches what you want people to see, or read the [full comparison guide](/learn/instagram-followers-vs-likes-vs-views-vs-comments).',
    cols: [
      'Service',
      'What it changes',
      'What you give us',
      'From',
    ],
    rows: [
      {
        slug: 'buy-instagram-comments',
        label: 'Comments',
        changes: 'Comments on one public post',
        needs: 'A link to the public post',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Followers',
        changes: 'The follower count on your profile',
        needs: 'Your public @username',
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
    ],
    currentLabel: 'This page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Is It Safe to Buy',
      highlight: 'Instagram Comments?',
    },
    lead: 'It comes down to three things: your account, your payment and your privacy. Here is how each one works at NovaLikes, and the one risk no seller can remove.',
    body: 'Instagram’s Community Guidelines ask people not to boost engagement artificially, and Instagram’s filters can hide comments or remove accounts it sees as inauthentic. That is why some comments can disappear after delivery, and why every order includes a 6-month refill. Premium comments or your own wording, in proportion to the post, read most naturally.',
    cards: [
      {
        ui: 'nopass',
        title: 'Account safety',
        body: 'We only need the public link to the post or Reel, so nobody logs in to your account or changes anything in it. We never ask for a password or login code. If someone claiming to be NovaLikes does, it is not us.',
      },
      {
        ui: 'pay',
        title: 'Payment security',
        body: 'You pay once through a secure checkout by card, Apple Pay or Google Pay, in US dollars. There is no subscription and nothing renews.',
      },
      {
        ui: 'privacy',
        title: 'Privacy',
        body: 'Your link and email are used to process the order and send updates, as set out in our [privacy policy](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Before You Buy',
      highlight: 'Instagram Comments',
    },
    lead: 'Check these four things once and your order runs smoothly.',
    items: [
      {
        title: 'Comments are open to everyone',
        body: 'Check that comments are on and not limited to followers or people you follow. Limits stop the order from starting.',
      },
      {
        title: 'The link points to the post',
        body: 'Copy the link from the post or Reel itself, not your profile. It looks like instagram.com/p/… or instagram.com/reel/….',
      },
      {
        title: 'Your wording is ready',
        body: 'Want your own comments? Add them in the checkout note, one per line, before the order starts. Otherwise our team writes them.',
      },
      {
        title: 'The post stays up',
        body: 'Don’t delete or archive the post during delivery or the 6-month refill period, or we can’t refill missing comments.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Have questions about buying Instagram Comments?',
    title: 'Instagram Comments FAQ',
    intro: 'Can’t find your answer? Message us on WhatsApp at +44 7454 758272, 24/7.',
    cta: 'Ask us on WhatsApp',
    extra: [
      {
        id: 'faq-ig-comments-v2-is-it-safe-to-buy-instagram-comments',
        question: 'Is it safe to buy Instagram comments?',
        answer: 'You only share the public link to the post, so nobody gets into your account, and you pay through a secure checkout. Instagram’s rules discourage artificial engagement and its filters can hide comments, so no seller can promise zero risk. Choosing Premium or your own wording, in proportion to the post, keeps comments looking natural.',
      },
      {
        id: 'faq-ig-comments-v2-how-many-instagram-comments-should-i-buy',
        question: 'How many Instagram comments should I buy?',
        answer: 'Match the number to the post. Ten to twenty-five comments suits most posts on smaller accounts. A post with only a few likes and dozens of comments can look odd, so keep them in proportion.',
      },
      {
        id: 'faq-ig-comments-v2-can-i-get-a-refund',
        question: 'Can I get a refund?',
        answer: 'Eligible orders are covered by our 30-Day Money-Back Guarantee, counted from the purchase date. The refund policy explains which orders are eligible and how to send a request.',
      },
      {
        id: 'faq-ig-comments-v2-which-payment-methods-can-i-use',
        question: 'Which payment methods can I use?',
        answer: 'You can pay by card, Apple Pay or Google Pay, in US dollars. It is a one-time payment, and nothing renews.',
      },
    ],
    fixExisting: {
      "faq-ig-comments-password": 'High Quality comments start at $13.99 for 10, and 25 comments cost $29.99. Premium comments start at $9.99 for 5, and 10 Premium comments cost $19.99. All prices are in US dollars and are listed in the pricing table above.',
    },
  },
  more: {
    id: 'related-services',
    title: 'Explore Other Instagram Services',
    intro: 'Instagram Comments change one number. To grow a different one, pick a service below.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Buy Instagram Likes',
        line: 'For posts, carousels and Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
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
    ],
    cardPrice: 'From {fromPrice}',
    guidesTitle: 'Guides',
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
    label: 'Choose a Package',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
