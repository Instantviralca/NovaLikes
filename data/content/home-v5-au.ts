/**
 * Australia market homepage (/au) — same layout and shape as HOME_V5. All copy is final. Do not edit wording in code.
 * {fromPrice}: lowest active package price from the registry. Service links resolve to /au/<slug>.
 */

export const HOME_V5_AU = {
  hero: {
    eyebrow: 'Growth services for Australian accounts',
    title: {
      lead: 'Buy',
      highlight: 'Instagram & TikTok',
      tail: 'Followers, Likes and Views in Australia',
    },
    subtitle: 'Made for Aussie creators, small businesses and brands. Choose a platform and a service, drop in a public handle or link, and check out. No password, help on WhatsApp around the clock, and six months of refills on every order.',
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
      'Rolling within 6–8 hours',
      '6-month refill',
      'WhatsApp help 24/7',
      'Prices in USD',
    ],
  },
  marquee: [
    'Your password stays yours',
    'Orders rolling within 6–8 hours',
    'Six months of refills',
    'WhatsApp help, day or night',
    'Prices listed in USD',
    'Gradual delivery if you ask',
    'Australian spelling on request',
    'Order tracking online',
  ],
  statement: {
    id: 'services',
    title: {
      lead: 'NovaLikes for',
      highlight: 'Australian Accounts',
    },
    body: 'NovaLikes supplies followers, likes, views and comments for Instagram and TikTok, plus Facebook Page services, to accounts from Perth to the Gold Coast. Choose a package, paste a public handle or link and pay once in US dollars. Your password is never needed; most orders start within 6–8 hours of payment and finish 4–6 hours after that, with six months of refills included.',
  },
  stories: [
    {
      id: 'profile-numbers',
      title: {
        lead: 'People Judge the Numbers',
        highlight: 'First',
      },
      body: 'Long before anyone reads a caption, they clock your follower count and the likes under your posts. That snap judgement decides whether they keep scrolling or stop for a proper look.',
      callout: 'If the numbers don’t do your content justice, good posts get flicked past. A package helps even things up.',
      visual: 'profile',
    },
    {
      id: 'stronger-start',
      title: {
        lead: 'A Better Start for',
        highlight: 'Launches and Sales',
      },
      body: 'A new store, an EOFY sale or a fresh Reel doesn’t have to sit at zero on day one. After that, Instagram and TikTok still choose what to recommend from how real people watch and engage.',
      callout: 'Back content you already rate. A package gives it a head start; it can’t replace it.',
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
      intro: 'More followers on a public Instagram account, so the profile looks as established as the business behind it.',
      bullets: [
        "Your public handle and nothing else",
        "Flip back to private once delivery’s done",
        "Gradual delivery keeps the climb steady",
        "Track it with your order ID"
      ],
      cta: 'Buy Instagram Followers',
      why: {
        q: 'Why do Instagram followers matter?',
        a: 'Think of the follower count as the headcount at your door. Brands deciding on a collab, customers comparing two cafés and creators sizing up a partner all notice it within seconds. When it sits far below the quality of your posts, people assume you are newer or smaller than you are.',
      },
      how: {
        q: 'What do I need to order Instagram followers?',
        a: 'Nothing beyond your handle. Leave the profile public and keep the same @username until we have finished, refills included. Pick an amount that sits comfortably with the following you already have.',
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
      intro: 'Extra likes on a public photo, carousel or Reel, handy for new stock drops and EOFY sale posts.',
      bullets: [
        "Photos, carousels and Reels all work",
        "One post per order, just the link",
        "Handy for launches, sales and pinned posts",
        "Match the size to the post’s reach"
      ],
      cta: 'Buy Instagram Likes',
      why: {
        q: 'Why do Instagram likes matter?',
        a: 'People decide whether to stop on a post in about a second, and the like count is part of that call. A post that already looks enjoyed earns a longer look. The likes stay on the post you choose and nowhere else.',
      },
      how: {
        q: 'What do I need to order Instagram likes?',
        a: 'A link to the post or Reel. Each order is tied to one link, so a second post means a second order.',
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
      intro: 'Extra views on a public Reel or video, giving new uploads a fair go when you start sharing them.',
      bullets: [
        "Reels and video posts both work",
        "Reel link only, never a password",
        "Bigger packs bring the price per 1,000 down",
        "Add likes so the numbers sit naturally"
      ],
      cta: 'Buy Instagram Views',
      why: {
        q: 'Why do Instagram views matter?',
        a: 'On Reels, the view count is often the first thing someone reads. Sitting on double digits can make even a cracking Reel look skipped. A views order changes that number only; whether people like, comment or follow is still down to the Reel.',
      },
      how: {
        q: 'What do I need to order Instagram views?',
        a: 'A link to the Reel or video, left public until the order is done. If you would rather the count climbed slowly, mention gradual delivery.',
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
      intro: 'Comments on a public post or Reel, in our words or yours, so the conversation has already started when people arrive.',
      bullets: [
        "High Quality and Premium comment tiers",
        "Supply your own lines, one per comment",
        "Australian spelling on request",
        "Post link only, never a login"
      ],
      cta: 'Buy Instagram Comments',
      why: {
        q: 'Why do Instagram comments matter?',
        a: 'Nobody likes posting the first comment. When a few are already there, your own followers find it easier to have their say, and the post feels alive rather than ignored. Send your own wording if you want particular points made.',
      },
      how: {
        q: 'What do I need to order Instagram comments?',
        a: 'A link to the post or Reel, with comments switched on for everyone. Choose a tier on the service page and pop any wording in the checkout note.',
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
      intro: 'More followers on a public TikTok account, for when a video lands and people come looking.',
      bullets: [
        "Your public handle and nothing else",
        "Flip back to private after delivery",
        "Gradual delivery if you ask",
        "Won’t get you into Creator Rewards"
      ],
      cta: 'Buy TikTok Followers',
      why: {
        q: 'Why do TikTok followers matter?',
        a: 'A video can travel far beyond the people who follow you. Viewers who like it then check your profile, and the follower count helps them decide whether you are worth sticking with. A count that trails your views can make a solid account look like a one-hit wonder.',
      },
      how: {
        q: 'What do I need to order TikTok followers?',
        a: 'Only your TikTok handle, typed without the @. Stay public and hold on to the same handle until the order and any refills are complete.',
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
      intro: 'Extra hearts on one public TikTok video, whether it is a product clip, a collab or a pinned favourite.',
      bullets: [
        "One video for each order",
        "Video link only, never a login",
        "Keep likes in line with views",
        "Handy for pinned clips, launches and collabs"
      ],
      cta: 'Buy TikTok Likes',
      why: {
        q: 'Why do TikTok likes matter?',
        a: 'Hearts show up beside the video for the whole time it plays. When a pinned or shared video has plenty of views but very few hearts, viewers notice the gap. Likes fix that for the one video you pick.',
      },
      how: {
        q: 'What do I need to order TikTok likes?',
        a: 'A link to the video. Each order covers a single video, so order once per link.',
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
      intro: 'Extra views on one public TikTok video, so a fresh upload isn’t stuck near zero while people make up their minds.',
      bullets: [
        "High Quality and Premium view tiers",
        "Video link only, never a login",
        "High Quality gives the lowest per-1,000 price",
        "Bought views don’t earn Creator Rewards"
      ],
      cta: 'Buy TikTok Views',
      why: {
        q: 'Why do TikTok views matter?',
        a: 'Your profile grid shows a view count on every video. A run of small numbers can make the account look quiet to a potential follower. Views won’t land a video on the For You page by themselves; TikTok still decides that from real watching.',
      },
      how: {
        q: 'What do I need to order TikTok views?',
        a: 'A link to the video, kept public until delivery ends. Choose High Quality or Premium on the service page.',
      },
    },
  ],
  why: {
    id: 'why-novalikes',
    title: {
      lead: 'Why Aussies Go With',
      highlight: 'NovaLikes',
    },
    intro: 'There is no shortage of sites selling to Australian accounts. Here is what sets us apart.',
    items: [
      {
        title: 'Someone to talk to, any hour',
        icon: 'message-circle',
        body: 'AWST or AEDT, our team is on WhatsApp 24/7. NovaLikes is operated by THE HOUSE OF VEYNOR LTD (company no. 17561169), and the team has looked after social media orders for 7–8 years, first under the ViralMe name.',
      },
      {
        title: 'Upfront about what you get',
        icon: 'badge-check',
        body: 'Every service page says what a package changes and what it won’t, and we will steer you to a better option when there is one. Our packages are for Australian accounts; we don’t sell them as followers or likes located in Australia.',
      },
    ],
  },
  promises: {
    id: 'our-promises',
    title: {
      lead: 'Included With Every',
      highlight: 'Australian Order',
    },
    intro: 'Instagram, TikTok or Facebook, you get these four every time.',
    items: [
      {
        key: 'password',
        title: 'No password, ever',
        body: 'We only ever need a public handle or link. If anyone asks for your login, on any site, don’t hand it over.',
        icon: 'shield',
        chip: 'Public link only',
      },
      {
        key: 'speed',
        title: 'Rolling within 6–8 hours',
        body: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Order at lunchtime and it is usually rolling by dinner. Prefer slower? Ask for gradual delivery.',
        icon: 'clock',
        chip: '6–8 hours',
      },
      {
        key: 'refill',
        title: 'Six months of refills',
        body: 'If the count drops in the six months after delivery, send your order ID on WhatsApp and we top it back up. Keep the profile or post public while the refill comes through.',
        icon: 'refresh-cw',
        chip: '6 months',
      },
      {
        key: 'support',
        title: 'WhatsApp, day or night',
        body: 'Message +44 7454 758272 before or after ordering, whatever the time. You can also follow any order on the Track Order page or in your free dashboard.',
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
    intro: 'What Australians usually ask before their first order.',
    items: [
      {
        question: 'Are the followers and likes Australian?',
        answer: 'Our packages are for Australian accounts, but they are not sold as followers, likes or views from people located in Australia. If you need a particular country, message us on WhatsApp first and we will be upfront about what is possible.',
      },
      {
        question: 'Can I pay in Australian dollars?',
        answer: 'Prices are listed and charged in US dollars. Your bank converts the amount to Australian dollars, and some Australian cards add an international transaction fee. Card, Apple Pay and Google Pay all work.',
      },
      {
        question: 'Do you need my password?',
        answer: 'Never. Followers need your public handle, and likes, views and comments need the public post or video link. Don’t give your password to any growth service.',
      },
      {
        question: 'How soon does an order start?',
        answer: 'Most orders start within 6–8 hours of payment and finish 4–6 hours after that. Ask for gradual delivery in the checkout note or on WhatsApp if you would like it slower.',
      },
      {
        question: 'What happens if the numbers drop?',
        answer: 'Every order comes with six months of refills from the delivery date. Send your order ID to +44 7454 758272 on WhatsApp and we top it back up.',
      },
      {
        question: 'Is buying followers allowed?',
        answer: 'Instagram’s and TikTok’s rules don’t allow buying engagement, and both platforms can remove activity they treat as inauthentic. We never ask for your password, but no seller controls how a platform treats an account, so read the platform rules before ordering.',
      },
    ],
  },
  getStarted: {
    id: 'get-started',
    title: {
      lead: 'Choose a Platform and',
      highlight: 'Get Started',
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
