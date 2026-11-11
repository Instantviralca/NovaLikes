/**
 * Canada market homepage (/ca) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to /ca/<slug>.
 */

export const HOME_V5_CA = {
  hero: {
    eyebrow: 'Growth services for Canadian accounts',
    title: {
      lead: 'Buy',
      highlight: 'Instagram & TikTok',
      tail: 'Followers, Likes and Views in Canada',
    },
    subtitle: 'Built for creators, small businesses and brands from coast to coast. Pick a platform and a service, add a public username or link, and check out. No password, support on WhatsApp in every time zone, and a six-month refill on every order.',
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
    cardPrice: 'Starting at {fromPrice}',
    trust: [
      'No password needed',
      'Starts in 6–8 hours',
      '6-month refill',
      'WhatsApp support 24/7',
      'Prices in USD',
    ],
  },
  marquee: [
    'Never a password',
    'Orders start in 6–8 hours',
    'Six-month refill included',
    'WhatsApp help in every time zone',
    'Prices listed in USD',
    'Comments in English or French',
    'Gradual delivery on request',
    'Track your order online',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'NovaLikes for',
      highlight: 'Canadian Accounts',
    },
    body: 'NovaLikes offers followers, likes, views and comments for Instagram and TikTok, plus Facebook Page services, to accounts from British Columbia to Newfoundland. Pick a package, paste a public username or link and pay once in US dollars. We never ask for your password, most orders start within 6–8 hours of payment and finish 4–6 hours after that, and every order comes with six months of refills.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'Your Profile Is Your',
        highlight: 'Storefront',
      },
      body: 'Before anyone visits, books or buys, they scroll your profile. The follower count and the likes under your posts shape that first impression, usually before a caption gets read.',
      callout: 'When the numbers lag far behind the quality of your work, people move on too fast. A package helps close that gap.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'Launch Without the',
        highlight: 'Empty Look',
      },
      body: 'A new location, a holiday campaign or a fresh Reel doesn’t need to open at zero. Beyond that first impression, Instagram and TikTok still decide what to recommend from how real people watch and react.',
      callout: 'Put a package behind content you already believe in. It is a head start, not a substitute.',
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
      intro: 'Raise the follower count on a public Instagram profile, the first number visitors size up when they land on your page.',
      bullets: [
        "Only your public @username",
        "Go back to private after delivery",
        "Gradual delivery for steadier growth",
        "Check progress with your order ID"
      ],
      cta: 'Buy Instagram Followers',
      why: {
        q: 'Why do Instagram followers matter?',
        a: 'Your follower count sits at the top of your profile. Customers, collaborators and brands glance at it, along with your posts, to judge whether the account is established. A very low number next to strong content can make a growing business look like it just started.',
      },
      how: {
        q: 'What do I need to order Instagram followers?',
        a: 'Only your public Instagram username. Leave the account public and the handle unchanged until delivery and any refill are done, and pick a size that fits your current following.',
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
      intro: 'Add likes to a public photo, carousel or Reel, from a product drop to a patio-season special.',
      bullets: [
        "Works on photos, carousels and Reels",
        "One post per order, link only",
        "Good for launches, sales and pinned posts",
        "Size it to the post’s usual reach"
      ],
      cta: 'Buy Instagram Likes',
      why: {
        q: 'Why do Instagram likes matter?',
        a: 'Likes are the first reaction under a post. A healthy number signals that other people enjoyed it, which makes new viewers more likely to stop. Likes apply to that one post only.',
      },
      how: {
        q: 'What do I need to order Instagram likes?',
        a: 'The public link to one post or Reel. Each order covers that post, so place a separate order for each link.',
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
      intro: 'Boost the view count on a public Reel or video, so a new upload looks worth watching from the first share.',
      bullets: [
        "Works on Reels and video posts",
        "Just the Reel link, never a password",
        "Price per 1,000 drops on bigger packages",
        "Pair with likes for natural-looking numbers"
      ],
      cta: 'Buy Instagram Views',
      why: {
        q: 'Why do Instagram views matter?',
        a: 'People check the view count before deciding to watch a Reel. A new Reel with a handful of views can look overlooked, however good it is. Views only change that Reel’s count; likes, comments and follows still come from the content itself.',
      },
      how: {
        q: 'What do I need to order Instagram views?',
        a: 'The public link to the Reel or video. Keep it public until delivery finishes, and ask for gradual delivery if you want a slower climb.',
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
      intro: 'Add comments to a public post or Reel, in English, French or your own words, so it looks like a real conversation.',
      bullets: [
        "Two comment tiers to choose from",
        "English, French or your own words",
        "Your own comments, one per line",
        "Just the post link, never a login"
      ],
      cta: 'Buy Instagram Comments',
      why: {
        q: 'Why do Instagram comments matter?',
        a: 'Comments show people took the time to respond. A few relevant ones encourage others to join, while an empty section can make even a popular post feel quiet. You can supply your own comments or ask for them in French.',
      },
      how: {
        q: 'What do I need to order Instagram comments?',
        a: 'The public link to the post or Reel. Choose High Quality or Premium on the service page and add your wording or language in the checkout note.',
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
      intro: 'Raise the follower count on a public TikTok account, the number people check after one of your videos lands on their feed.',
      bullets: [
        "Only your public username",
        "Switch back to private after delivery",
        "Gradual delivery if you ask",
        "No path into Creator Rewards"
      ],
      cta: 'Buy TikTok Followers',
      why: {
        q: 'Why do TikTok followers matter?',
        a: 'Most viewers discover you through one video and then visit your profile. The follower count is one of the first things they see there. A very small number next to strong videos can make the account look new or inactive.',
      },
      how: {
        q: 'What do I need to order TikTok followers?',
        a: 'Your public TikTok username. Keep the account public and the handle unchanged until delivery and any refill are complete.',
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
      intro: 'Add likes to one public TikTok video, such as a product clip, a collab or a pinned favourite.',
      bullets: [
        "Each order covers one video",
        "Just the video link, never a login",
        "Keep likes in step with views",
        "Good for pinned clips, launches and collabs"
      ],
      cta: 'Buy TikTok Likes',
      why: {
        q: 'Why do TikTok likes matter?',
        a: 'The heart count sits beside every video as it plays. A video you pin or share elsewhere looks stronger when its likes keep pace with its views. Likes apply to that video only.',
      },
      how: {
        q: 'What do I need to order TikTok likes?',
        a: 'The public video link. Likes go to that video only, so place one order per link for several videos.',
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
      intro: 'Lift the view count on a public TikTok video, so a new upload doesn’t start cold while viewers decide whether to stay.',
      bullets: [
        "Two view tiers to choose from",
        "Just the video link, never a login",
        "High Quality is the lowest price per 1,000",
        "Views don’t pay out Creator Rewards"
      ],
      cta: 'Buy TikTok Views',
      why: {
        q: 'Why do TikTok views matter?',
        a: 'View counts appear across your TikTok profile grid. A row of low numbers can make an account seem quiet to someone deciding whether to follow. Views don’t place a video on the For You feed; TikTok decides that from how people watch.',
      },
      how: {
        q: 'What do I need to order TikTok views?',
        a: 'The public video link. Pick High Quality or Premium on the service page and keep the video public until delivery is done.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: 'Why Canadians Choose',
      highlight: 'NovaLikes',
    },
    intro: 'Lots of sites sell to Canadian accounts. Here is what you get with us.',
    items: [
      {
        title: 'Support that keeps your hours',
        icon: 'message-circle',
        body: 'Pacific, Mountain, Central, Eastern or Atlantic, our team answers WhatsApp 24/7. NovaLikes is operated by THE HOUSE OF VEYNOR LTD (company no. 17561169), and the team has handled social media orders for 7–8 years, first as ViralMe.',
      },
      {
        title: 'Clear about what you are buying',
        icon: 'badge-check',
        body: 'Each service page spells out what a package changes and what it won’t, and we will point you to a better fit when there is one. Our packages are for Canadian accounts; we don’t sell them as followers or likes located in Canada.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'What Every Canadian',
      highlight: 'Order Includes',
    },
    intro: 'Instagram, TikTok or Facebook, these four come with every order.',
    items: [
      {
        key: 'password',
        title: 'No password, ever',
        body: 'A public username or link is all we ever need. If anyone asks for your login, on any site, keep it to yourself.',
        icon: 'shield',
        chip: 'Public link only',
      },
      {
        key: 'speed',
        title: 'Starts in 6–8 hours',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Order after work and it is usually moving by breakfast. Want it slower? Ask for gradual delivery.',
        icon: 'clock',
        chip: '6–8 hours',
      },
      {
        key: 'refill',
        title: 'Six months of refills',
        body: 'If the count drops in the six months after delivery, send your order ID on WhatsApp and we top it up. Keep the profile or post public while the refill runs.',
        icon: 'refresh-cw',
        chip: '6 months',
      },
      {
        key: 'support',
        title: 'WhatsApp, any hour',
        body: 'Message +44 7454 758272 before or after ordering, whatever your time zone. You can also follow any order on the Track Order page or in your free dashboard.',
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
    intro: 'What Canadians usually ask before their first order.',
    items: [
      {
        question: 'Are the followers and likes Canadian?',
        answer: 'Our packages are for Canadian accounts, but they are not sold as followers, likes or views from people located in Canada. If you need a particular country, message us on WhatsApp first and we will tell you straight what is possible.',
      },
      {
        question: 'Can I pay in Canadian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the charge to Canadian dollars, and many Canadian cards add a foreign transaction fee. You can pay by card, Apple Pay or Google Pay.',
      },
      {
        question: 'Can I get comments in French?',
        answer: 'Yes. Write “French” in the checkout note, or send your own comments in French, one per line, and we will post them as written.',
      },
      {
        question: 'Do you need my password?',
        answer: 'No. Followers need your public username, and likes, views and comments need the public post or video link. Never give your password to any growth service.',
      },
      {
        question: 'How fast does an order start?',
        answer: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Ask for gradual delivery in the checkout note or on WhatsApp if you would rather it went slower.',
      },
      {
        question: 'What if the numbers drop?',
        answer: 'Every order includes six months of refills from the delivery date. Send your order ID to +44 7454 758272 on WhatsApp and we top it back up.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Pick a Platform and',
      highlight: 'Get Going',
    },
    body: 'Choose a platform below. Each service page lists the packages, the price in US dollars and exactly what we need from you.',
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
