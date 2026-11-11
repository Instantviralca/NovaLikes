/**
 * UK market homepage (/uk) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to /uk/<slug>.
 * SEO title/description for /uk are NOT in this file and stay unchanged (content/markets/uk/metadata.json).
 */

export const HOME_V5_UK = {
  hero: {
    eyebrow: 'Growth services for UK accounts',
    title: {
      lead: 'Buy',
      highlight: 'Instagram & TikTok',
      tail: 'Followers, Likes and Views in the UK',
    },
    subtitle: 'For UK creators, shops and brands. Choose a platform and a service, add a public username or link, and you are done. No password, a UK-registered company behind every order, and a six-month refill as standard.',
    tabs: {
      instagram: {
        label: 'Instagram',
        cards: [
          {
            slug: 'buy-instagram-followers',
            title: 'Followers',
            line: 'Grow your profile',
            icon: 'user-plus',
          },
          {
            slug: 'buy-instagram-likes',
            title: 'Likes',
            line: 'For posts and Reels',
            icon: 'heart',
          },
          {
            slug: 'buy-instagram-views',
            title: 'Views',
            line: 'For Reels and videos',
            icon: 'eye',
          },
          {
            slug: 'buy-instagram-comments',
            title: 'Comments',
            line: 'Start the conversation',
            icon: 'message-circle',
          },
        ],
      },
      tiktok: {
        label: 'TikTok',
        cards: [
          {
            slug: 'buy-tiktok-followers',
            title: 'Followers',
            line: 'Grow your profile',
            icon: 'user-plus',
          },
          {
            slug: 'buy-tiktok-likes',
            title: 'Likes',
            line: 'For one video',
            icon: 'heart',
          },
          {
            slug: 'buy-tiktok-views',
            title: 'Views',
            line: 'For one video',
            icon: 'eye',
          },
        ],
      },
      facebook: {
        label: 'Facebook',
        cards: [
          {
            slug: 'buy-facebook-followers',
            title: 'Followers',
            line: 'For Pages and profiles',
            icon: 'user-plus',
          },
          {
            slug: 'buy-facebook-page-likes',
            title: 'Page Likes',
            line: 'For Pages with a like count',
            icon: 'thumbs-up',
          },
          {
            slug: 'buy-facebook-post-likes',
            title: 'Post Likes',
            line: 'For one public post',
            icon: 'heart',
          },
        ],
      },
    },
    cardPrice: 'From {fromPrice}',
    trust: [
      'No password needed',
      'UK-registered company',
      'Starts in 6–8 hours',
      '6-month refill',
      '24/7 UK WhatsApp',
    ],
  },
  marquee: [
    'No password, ever',
    'UK-registered company',
    'Orders start in 6–8 hours',
    '6-month refill on every order',
    'UK WhatsApp support, 24/7',
    'Prices shown in USD',
    'Gradual delivery on request',
    'Track every order online',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'NovaLikes for',
      highlight: 'UK Accounts',
    },
    body: 'NovaLikes sells followers, likes, views and comments for Instagram and TikTok, plus Facebook Page services, to accounts across England, Scotland, Wales and Northern Ireland. You choose a package, paste a public username or link and pay once in US dollars. We never ask for your password, most orders start within 6–8 hours of payment and finish 4–6 hours after that, and every order includes a six-month refill.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'First Impressions Count',
        highlight: 'Online Too',
      },
      body: 'A customer who walks past your shop sees the window, the queue and the staff. Online, they see your follower count and the likes under your posts, often before they read a single caption.',
      callout: 'If the numbers look far smaller than the business really is, good content can get scrolled past. A package helps the profile catch up.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'Give Launches and Offers a',
        highlight: 'Proper Start',
      },
      body: 'A new shop, a Christmas campaign or a fresh Reel doesn’t have to begin at zero. What happens after that still depends on the post: Instagram and TikTok decide what to recommend from how people actually watch and react.',
      callout: 'Use a package behind content you are already proud of. It works best as a boost, not a replacement.',
      visual: 'growth',
    },
  ],
  services: [
    {
      slug: 'buy-instagram-followers',
      platform: 'instagram',
      metric: 'followers',
      title: {
        lead: 'Buy',
        highlight: 'Instagram Followers',
      },
      intro: 'Grow the follower count on a public Instagram profile, the number UK visitors check as soon as they land on your page.',
      bullets: [
        "Your public username, never your password",
        "Set your profile back to private once delivery ends",
        "Ask for gradual delivery for a steadier rise",
        "Follow progress using your order ID"
      ],
      cta: 'Buy Instagram Followers',
      why: {
        q: 'Why do Instagram followers matter?',
        a: 'Your follower count sits right at the top of your profile. New visitors, from a local customer to a brand looking for a collab, use it with your posts to decide whether the account is established. A tiny count next to great content can make a growing business look brand new.',
      },
      how: {
        q: 'What do I need to order Instagram followers?',
        a: 'Just your public Instagram username. Keep the account public and the username unchanged until delivery, and any refill, is finished, and choose a size that looks natural next to your current followers.',
      },
    },
    {
      slug: 'buy-instagram-likes',
      platform: 'instagram',
      metric: 'likes',
      title: {
        lead: 'Buy',
        highlight: 'Instagram Likes',
      },
      intro: 'Add likes to a public photo, carousel or Reel, whether it is a new product, a weekend offer or your best post.',
      bullets: [
        "Works on photos, carousels and Reels",
        "One post per order, just paste its link",
        "Ideal for launches, offers and pinned posts",
        "Choose a size that suits the post’s reach"
      ],
      cta: 'Buy Instagram Likes',
      why: {
        q: 'Why do Instagram likes matter?',
        a: 'Likes are the first reaction people see under a post. A healthy count suggests other people enjoyed it, so new viewers are more likely to stop and look. Likes apply to that one post only.',
      },
      how: {
        q: 'What do I need to order Instagram likes?',
        a: 'The public link to one post or Reel. Each order covers that post, so for several posts place one order per link.',
      },
    },
    {
      slug: 'buy-instagram-views',
      platform: 'instagram',
      metric: 'views',
      title: {
        lead: 'Buy',
        highlight: 'Instagram Views',
      },
      intro: 'Lift the view count on a public Reel or video, so a new upload looks worth watching the moment you share it.',
      bullets: [
        "For Reels and video posts",
        "One Reel link, no password",
        "Larger packages lower the price per 1,000",
        "Add likes so the numbers look natural"
      ],
      cta: 'Buy Instagram Views',
      why: {
        q: 'Why do Instagram views matter?',
        a: 'People glance at the view count before deciding whether to watch a Reel. A new Reel sitting at a handful of views can look ignored, even when it is good. Views change the count on that Reel only; likes, comments and follows still come from the content.',
      },
      how: {
        q: 'What do I need to order Instagram views?',
        a: 'The public link to the Reel or video. Keep it public until delivery is complete, and ask for gradual delivery if you want a steadier rise.',
      },
    },
    {
      slug: 'buy-instagram-comments',
      platform: 'instagram',
      metric: 'comments',
      title: {
        lead: 'Buy',
        highlight: 'Instagram Comments',
      },
      intro: 'Add comments to a public post or Reel, so a launch or giveaway looks talked about and others feel happy to join in.',
      bullets: [
        "Two tiers: High Quality or Premium",
        "Write your own, one comment per line",
        "British spelling or another language on request",
        "Just the post link, no login"
      ],
      cta: 'Buy Instagram Comments',
      why: {
        q: 'Why do Instagram comments matter?',
        a: 'Comments show that people stopped to say something. A few relevant ones invite others to reply, while an empty section can make even a popular post feel quiet. You can send your own wording, including British spelling.',
      },
      how: {
        q: 'What do I need to order Instagram comments?',
        a: 'The public link to the post or Reel. Pick High Quality or Premium on the service page, and add your own comments in the checkout note if you want them.',
      },
    },
    {
      slug: 'buy-tiktok-followers',
      platform: 'tiktok',
      metric: 'followers',
      title: {
        lead: 'Buy',
        highlight: 'TikTok Followers',
      },
      intro: 'Grow the follower count on a public TikTok account, the number people check after one of your videos catches their eye.',
      bullets: [
        "Your username minus the @, no password",
        "Go back to private once delivery ends",
        "Gradual delivery if you prefer",
        "Won’t unlock Creator Rewards"
      ],
      cta: 'Buy TikTok Followers',
      why: {
        q: 'Why do TikTok followers matter?',
        a: 'Most people find you through a single video, then tap through to your profile. The follower count is one of the first things they see. A profile with very few followers next to strong videos can look new or inactive.',
      },
      how: {
        q: 'What do I need to order TikTok followers?',
        a: 'Your public TikTok username. Keep the account public and the username the same until delivery, and any refill, is complete.',
      },
    },
    {
      slug: 'buy-tiktok-likes',
      platform: 'tiktok',
      metric: 'likes',
      title: {
        lead: 'Buy',
        highlight: 'TikTok Likes',
      },
      intro: 'Add likes to one public TikTok video, such as a product video, a collab or the clip you have pinned.',
      bullets: [
        "One public video for each order",
        "Just the video link, no login",
        "Keep likes in proportion to views",
        "Suits pinned clips, launches and collabs"
      ],
      cta: 'Buy TikTok Likes',
      why: {
        q: 'Why do TikTok likes matter?',
        a: 'The heart count sits beside every video while it plays. A video you pin or share outside TikTok looks stronger when the likes keep pace with the views. Likes apply to that one video only.',
      },
      how: {
        q: 'What do I need to order TikTok likes?',
        a: 'The public video link. The likes go to that video only, so for several videos place one order per link.',
      },
    },
    {
      slug: 'buy-tiktok-views',
      platform: 'tiktok',
      metric: 'views',
      title: {
        lead: 'Buy',
        highlight: 'TikTok Views',
      },
      intro: 'Raise the view count on a public TikTok video, so a fresh upload doesn’t sit near zero while people decide whether to watch.',
      bullets: [
        "Pick High Quality or Premium views",
        "One video link, no login",
        "High Quality costs the least per 1,000",
        "Views don’t earn Creator Rewards money"
      ],
      cta: 'Buy TikTok Views',
      why: {
        q: 'Why do TikTok views matter?',
        a: 'TikTok shows view counts across your profile grid. A row of low numbers can make an account look quiet to someone deciding whether to follow. Views don’t put a video on the For You feed; TikTok decides that from how people watch.',
      },
      how: {
        q: 'What do I need to order TikTok views?',
        a: 'The public video link. Choose High Quality or Premium on the service page, and keep the video public until delivery is complete.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: 'Why UK Customers Choose',
      highlight: 'NovaLikes',
    },
    intro: 'There are lots of growth sites aimed at the UK. Here is what makes us different.',
    items: [
      {
        title: 'A UK company, not an anonymous website',
        icon: 'building',
        body: 'NovaLikes is run by THE HOUSE OF VEYNOR LTD, registered in England and Wales (company no. 17561169) at Office 2236, 85 Dunstall Hill, Wolverhampton. The team has handled social media orders for 7–8 years, first as ViralMe and now as NovaLikes.',
      },
      {
        title: 'Honest about what each service does',
        icon: 'badge-check',
        body: 'Every service page explains what a package changes and what it doesn’t, and we will tell you if a different service fits better. Our packages are for UK accounts; we don’t sell them as followers or likes located in the UK.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Four Promises on Every',
      highlight: 'UK Order',
    },
    intro: 'Whether you order Instagram, TikTok or Facebook, these apply every time.',
    items: [
      {
        key: 'password',
        title: 'No password, ever',
        body: 'We only ever need a public username or link. If anyone asks for your login, on any site, don’t give it to them.',
        icon: 'shield',
        chip: 'Public link only',
      },
      {
        key: 'speed',
        title: 'Starts in 6–8 hours',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Order in the evening and it is usually under way by morning. Prefer a slower pace? Ask for gradual delivery.',
        icon: 'clock',
        chip: '6–8 hours',
      },
      {
        key: 'refill',
        title: 'Six-month refill',
        body: 'If the count drops within six months of delivery, send your order ID on WhatsApp and we top it back up. Keep the profile or post public while the refill runs.',
        icon: 'refresh-cw',
        chip: '6 months',
      },
      {
        key: 'support',
        title: '24/7 UK WhatsApp',
        body: 'Message +44 7454 758272 before or after you order, day or night. You can also follow any order on the Track Order page or in your free customer dashboard.',
        icon: 'message-circle',
        chip: '24/7',
      },
    ],
  },
  faq: {
    id: 'before-you-buy',
    title: {
      lead: 'Before',
      highlight: 'You Buy',
    },
    intro: 'What UK customers usually ask before their first order.',
    items: [
      {
        question: 'Are the followers and likes from the UK?',
        answer: 'Our packages are for UK accounts, but they are not sold as followers, likes or views from people located in the UK. If you need a particular country, message us on WhatsApp before you order and we will tell you honestly what is possible.',
      },
      {
        question: 'Can I pay in pounds?',
        answer: 'Prices are shown and charged in US dollars. Your card provider converts the charge to pounds, and some UK cards add a small non-sterling fee. You can pay by card, Apple Pay or Google Pay.',
      },
      {
        question: 'Do you need my password?',
        answer: 'No. Followers need your public username, and likes, views and comments need the public post or video link. Never share your password with any growth service.',
      },
      {
        question: 'How quickly will my order start?',
        answer: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Ask for gradual delivery in the checkout note or on WhatsApp if you want a slower pace.',
      },
      {
        question: 'What if the numbers drop?',
        answer: 'Every order includes a six-month refill from the delivery date. Send your order ID to +44 7454 758272 on WhatsApp and we top it back up.',
      },
      {
        question: 'Is it legal to buy followers in the UK?',
        answer: 'We are not lawyers, so this isn’t legal advice. Buying engagement goes against Instagram’s and TikTok’s rules, which are platform rules rather than UK law, and the platforms can remove activity they see as inauthentic. If you run a business, UK consumer law bans fake reviews and misleading endorsements, so never present a bought number as customer reviews.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Ready to',
      highlight: 'Get Started?',
    },
    body: 'Pick a platform below. Each service page shows the packages, the price in US dollars and exactly what we need from you.',
    tools: {
      title: 'Free tools',
      links: [
        {
          label: 'Instagram Follower Counter',
          href: '/tools/instagram-follower-counter',
        },
        {
          label: 'Instagram Profile Viewer',
          href: '/tools/instagram-profile-viewer',
        },
        {
          label: 'Instagram Profile Picture Viewer',
          href: '/tools/instagram-profile-picture-viewer',
        },
        {
          label: 'TikTok Video Downloader',
          href: '/tools/tiktok-video-downloader',
        },
        {
          label: 'Facebook Video Downloader',
          href: '/tools/facebook-video-downloader',
        },
      ],
    },
    guides: {
      title: 'Free guides',
      links: [
        {
          label: 'How to Grow Instagram Followers Organically',
          href: '/learn/how-to-grow-instagram-followers-organically',
        },
        {
          label: 'How the Instagram Algorithm Works',
          href: '/learn/how-instagram-algorithm-works',
        },
        {
          label: 'How to Get More Views on TikTok',
          href: '/learn/how-to-get-more-views-on-tiktok',
        },
        {
          label: 'How to Get Your First 1,000 TikTok Followers',
          href: '/learn/how-to-get-1000-tiktok-followers',
        },
      ],
      cta: {
        label: 'All guides',
        href: '/learn',
      },
    },
  },
  stickyCta: {
    label: 'Choose a Service',
    href: '#homepage-hero',
  },
} as const;
