/**
 * Apply supplied Australia homepage copy to content/markets/au/homepage.json
 * Run: npx tsx scripts/patch-au-homepage.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { homepageHub } from '../data/content/homepage-hub';

const AU_PREFIX = '/au';
const OUT = path.join(process.cwd(), 'content/markets/au');

function auHref(href: string): string {
  if (href.startsWith('/buy-')) return `${AU_PREFIX}${href}`;
  return href;
}

function prefixHrefs<T>(value: T): T {
  if (typeof value === 'string') {
    if (value.startsWith('/buy-')) return `${AU_PREFIX}${value}` as T;
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => prefixHrefs(item)) as T;
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = prefixHrefs(child);
    }
    return result as T;
  }
  return value;
}

const hub = prefixHrefs(structuredClone(homepageHub));

hub.hero = {
  ...hub.hero,
  eyebrow: 'INSTAGRAM GROWTH FOR AUSTRALIA',
  title: 'Build a Stronger Instagram Presence in Australia',
  description:
    "Put more visible momentum behind the Instagram profile, posts and Reels you're already building. NovaLikes gives Australian creators, businesses, brands and agencies a straightforward way to choose Instagram Followers, Likes, Views and Comments from one place. Pick the metric you want to work on, compare the available packages and place your order using only the public profile or content details required for that service. No Instagram password is required. Whether you're preparing for a product launch, growing a creator profile, supporting a local business or putting more attention behind an important Reel, start with the Instagram metric that actually matches your goal.",
  primaryCta: { label: 'Explore Instagram Services', href: '#instagram-services' },
  secondaryCta: { label: 'Compare Packages', href: '#services-overview' },
  trustFeatures: [
    { id: 'password', line1: 'No Password', line2: 'Required', icon: 'shield' },
    { id: 'pricing', line1: 'Clear', line2: 'Pricing', icon: 'tag' },
    { id: 'payments', line1: 'Secure', line2: 'Checkout', icon: 'shield' },
    { id: 'tracking', line1: 'Order', line2: 'Tracking', icon: 'truck' },
  ],
};

hub.platformSelector = {
  ...hub.platformSelector,
  eyebrow: 'Instagram Services',
  title: 'What Instagram Growth Services Does NovaLikes Offer in Australia?',
  description:
    'NovaLikes offers Instagram Followers, Likes, Views and Comments for eligible public profiles and content in Australia. Followers work at the profile level. Likes apply to specific posts and Reels. Views are designed for eligible Reels and video content. Comments add visible conversation around selected posts and Reels. Choose the service based on the exact Instagram metric you want to work on.',
  platforms: hub.platformSelector.platforms.map((platform) => {
    if (platform.id !== 'instagram') return platform;
    return {
      ...platform,
      description:
        'Followers, Likes, Views and Comments for eligible Instagram profiles and content in Australia.',
      tags: [
        { label: 'Instagram Followers', href: auHref('/buy-instagram-followers'), icon: 'user' as const },
        { label: 'Instagram Likes', href: auHref('/buy-instagram-likes'), icon: 'heart' as const },
        { label: 'Instagram Views', href: auHref('/buy-instagram-views'), icon: 'play' as const },
        { label: 'Instagram Comments', href: auHref('/buy-instagram-comments'), icon: 'comment' as const },
      ],
    };
  }),
};

hub.servicesOverview = {
  ...hub.servicesOverview,
  eyebrow: 'Choose Your Goal',
  title: 'Choose the Instagram Service That Matches Your Goal',
  description:
    "Instagram growth isn't one number. Your follower count, post engagement, Reel views and visible conversation each represent a different part of your presence. Start with the one that matters most right now.",
  trustNote: 'Your Goal → Start With the Right Service',
  features: [
    { id: 'followers', label: 'Increase visible profile audience → Instagram Followers', icon: 'users' },
    { id: 'likes', label: 'Add Likes to a specific post or Reel → Instagram Likes', icon: 'bolt' },
    { id: 'views', label: 'Increase displayed Views on video → Instagram Views', icon: 'headset' },
    { id: 'comments', label: 'Add visible conversation → Instagram Comments', icon: 'shield' },
  ],
};

hub.platformGroupTitles = {
  ...hub.platformGroupTitles,
  instagram: {
    id: 'instagram-services',
    title: 'Built Around Australian Creators, Businesses and Brands',
    description:
      "Instagram plays a different role depending on what you're building. An Australian creator may be developing a profile around fashion, fitness, food, travel, education or another niche. An ecommerce brand may rely on Instagram around product drops and seasonal promotions. A local business may use its profile to show genuine projects, services and recent activity before a potential customer makes contact. An agency may manage multiple accounts with completely different campaign goals. A larger brand may use Instagram alongside paid media, email, ecommerce, search and creator partnerships. That means there is no single Instagram growth package that makes sense for every account.",
  },
  tiktok: {
    id: 'tiktok-services',
    title: 'TikTok Growth Services',
    description:
      "Choose TikTok Followers, Likes or Views when you're working on your TikTok profile or individual videos.",
  },
  facebook: {
    id: 'facebook-services',
    title: 'Facebook Growth Services',
    description:
      "Choose Facebook Followers, Page Likes or Post Likes when you're working on an eligible public Facebook Page or post.",
  },
};

const igServiceUpdates: Record<string, Partial<(typeof hub.services)[number]>> = {
  'ig-followers': {
    commercialLabel: 'INSTAGRAM FOLLOWERS',
    title: 'Build a Stronger Profile Audience',
    intro:
      'Choose Instagram Followers when you want to increase the follower count displayed on your public profile. Follower packages can support the visible audience around a newer creator account, established brand or business profile while you continue developing the content behind it.',
    points: [
      { title: 'Creator Profiles', text: 'Strengthen the profile around a clear niche and your best work.' },
      { title: 'Business Accounts', text: 'Build a stronger profile around real services, projects and customer-facing activity.' },
      { title: 'Personal Brands', text: 'Support the visible audience around an established or growing public profile.' },
      { title: 'Campaign Preparation', text: 'Prepare a profile before a launch, collaboration or campaign sends new visitors toward it.' },
    ],
    cta: { label: 'Buy Instagram Followers', href: auHref('/buy-instagram-followers') },
  },
  'ig-likes': {
    commercialLabel: 'INSTAGRAM LIKES',
    title: 'Put More Engagement Behind Important Posts & Reels',
    intro:
      'Choose Instagram Likes when a particular piece of content is your priority. Add more visible Likes around an eligible public post or Reel based on the content, existing engagement and increase you want.',
    points: [
      { title: 'Product Launches', text: 'Put more engagement behind launch posts and priority Reels.' },
      { title: 'Creator Collaborations', text: 'Support the content that best represents the partnership.' },
      { title: 'Portfolio Posts', text: 'Highlight work you want potential customers, clients or partners to see.' },
      { title: 'Campaign Content', text: 'Add visible Likes around announcements, updates and priority creative.' },
    ],
    cta: { label: 'Buy Instagram Likes', href: auHref('/buy-instagram-likes') },
  },
  'ig-views': {
    commercialLabel: 'INSTAGRAM VIEWS',
    title: 'Give Your Best Reels More Visible Attention',
    intro:
      "Choose Instagram Views when video is the metric you're working on. Views apply to eligible public Instagram Reels and video content rather than your overall follower count.",
    points: [
      { title: 'Product Demonstrations', text: 'Put more visible Views behind videos that show your offer clearly.' },
      { title: 'Creator Reels', text: 'Support the Reels that represent your niche and content direction.' },
      { title: 'Campaign Videos', text: 'Give priority video content more visible attention during a campaign.' },
      { title: 'Evergreen Video Content', text: 'Support tutorials, explainers and useful videos that continue representing the account.' },
    ],
    cta: { label: 'Buy Instagram Views', href: auHref('/buy-instagram-views') },
  },
  'ig-comments': {
    commercialLabel: 'INSTAGRAM COMMENTS',
    title: 'Build More Visible Conversation Around Your Content',
    intro:
      'Comments create a different type of visible interaction from Followers, Likes or Views. Choose Instagram Comments when you want more conversation around an eligible public post or Reel.',
    points: [
      { title: 'Launches', text: 'Add visible conversation around important announcements and launch content.' },
      { title: 'Collaboration Posts', text: 'Support discussion-focused content built around a partnership.' },
      { title: 'Product Posts', text: 'Create more visible interaction around posts that introduce or explain an offer.' },
      { title: 'Campaign Content', text: 'Use Comments when visible conversation supports the post or Reel you are prioritising.' },
    ],
    cta: { label: 'Buy Instagram Comments', href: auHref('/buy-instagram-comments') },
  },
};

hub.services = hub.services.map((service) => {
  const update = igServiceUpdates[service.id];
  if (update) return { ...service, ...update };
  return {
    ...service,
    href: auHref(service.href),
    cta: { ...service.cta, href: auHref(service.cta.href) },
  };
});

hub.why = {
  ...hub.why,
  title: 'Why Choose NovaLikes for Instagram Growth?',
  description: 'Ordering Instagram services should be straightforward.',
  points: [
    {
      title: 'No Instagram Password Required',
      body: 'NovaLikes does not require your Instagram password or verification codes.',
    },
    {
      title: 'Clear Package Options',
      body: 'Compare available quantities and current pricing before placing your order.',
    },
    {
      title: 'Service-Specific Ordering',
      body: 'Followers use the public profile details required for the follower service. Likes, Views and Comments use the eligible public content required for those services.',
    },
    {
      title: 'Secure Card Payments',
      body: 'Complete checkout through the available NovaLikes payment process.',
    },
    {
      title: 'Order Tracking',
      body: 'Use your NovaLikes order information afterward for available status updates.',
    },
    {
      title: 'Customer Support',
      body: 'Contact support with the relevant order details if something needs checking.',
    },
    {
      title: '30-Day Money-Back Guarantee on Eligible Orders',
      body: 'Eligible purchases are covered according to the current NovaLikes refund terms.',
    },
  ],
};

hub.howItWorks = {
  ...hub.howItWorks,
  title: 'How NovaLikes Instagram Orders Work',
  description: 'No Instagram password is required.',
  steps: [
    { title: 'Choose Your Instagram Service', body: 'Start with Followers, Likes, Views or Comments.' },
    { title: 'Pick a Package', body: 'Compare the available quantities and current prices.' },
    {
      title: 'Provide the Required Public Details',
      body: "Depending on the service, you'll submit your public Instagram username or the direct URL of an eligible post or Reel.",
    },
    { title: 'Review Your Order', body: 'Check the service, package, account or content details and current price.' },
    { title: 'Complete Checkout', body: 'Place your order without sharing your Instagram password.' },
    { title: 'Track the Status', body: 'Use NovaLikes order tracking afterward for available updates.' },
  ],
};

hub.guarantees = {
  ...hub.guarantees,
  title: "More Instagram Followers Don't Automatically Mean More Reach",
  description:
    'Instagram metrics should be understood individually. A larger follower count does not automatically guarantee more Reel views. More Likes do not automatically create Followers. More Views do not guarantee viral distribution. More Comments do not automatically create sales. NovaLikes Instagram services should not be treated as guaranteed ways to reach Explore, make a Reel viral, gain organic Followers, increase organic reach, secure brand partnerships, generate customers, create enquiries or increase sales. Each NovaLikes service is designed around the visible metric described by the package. Organic Instagram performance remains separate.',
  items: [
    {
      title: 'Not Guaranteed: Explore or Viral Distribution',
      body: 'Purchased metrics should not be treated as guarantees of Explore placement or viral Reels.',
    },
    {
      title: 'Not Guaranteed: Organic Follower or Reach Growth',
      body: 'More Likes do not automatically create Followers. More Views do not automatically increase organic reach.',
    },
    {
      title: 'Not Guaranteed: Business Results',
      body: 'Services should not be treated as guarantees of customers, enquiries, sales or brand partnerships.',
    },
    {
      title: 'Buy for the Metric the Service Provides',
      body: 'Clear expectations make it easier to choose the right service and compare packages realistically.',
    },
  ],
};

hub.beforeYouBuy = {
  ...hub.beforeYouBuy,
  title: "Know What You're Ordering Before You Pay",
  description:
    "A few checks can prevent avoidable ordering mistakes. If you're comparing affordable Instagram growth services in Australia, check which Instagram metric changes, package quantity, current pricing, required public information, password requirements, order tracking, customer support, service policies and what the provider actually promises.",
  items: [
    {
      question: 'Profile or Content?',
      answer:
        "Use Followers when you're working on the overall profile. Use Likes, Views or Comments when individual content is the priority.",
    },
    {
      question: 'Correct Username or URL?',
      answer: 'Double-check the public details before submitting them.',
    },
    {
      question: 'Correct Package?',
      answer: "Review the quantity you've selected.",
    },
    {
      question: 'Current Price?',
      answer: 'Check the package total before checkout.',
    },
    {
      question: 'Public Content?',
      answer: 'Keep the profile, post or Reel publicly accessible where required during processing.',
    },
    {
      question: 'Password?',
      answer: 'Keep it private. NovaLikes does not need your Instagram password.',
    },
    {
      question: 'Policies?',
      answer: 'Review the applicable service and refund information before checkout.',
    },
  ],
};

hub.faq = {
  ...hub.faq,
  title: 'Frequently Asked Questions',
  description: 'Common questions about NovaLikes Instagram growth services in Australia.',
  items: [
    {
      question: 'What Instagram growth services does NovaLikes offer in Australia?',
      answer:
        'NovaLikes offers Instagram Followers, Likes, Views and Comments for eligible public profiles, posts and Reels. Choose the service based on the metric you want to work on.',
    },
    {
      question: 'Where can I buy Instagram followers in Australia?',
      answer:
        'You can use the NovaLikes Instagram Followers service for an eligible public Instagram profile. Choose an available package, submit the required public username and order without sharing your Instagram password.',
    },
    {
      question: 'Can I buy Instagram Likes in Australia?',
      answer: 'Yes. NovaLikes offers Instagram Likes packages for eligible public posts and Reels.',
    },
    {
      question: 'Can I buy Instagram Views for Reels?',
      answer: 'Yes. Instagram Views packages are available for eligible public Reels and video content.',
    },
    {
      question: 'Can I buy Instagram Comments?',
      answer: 'Yes. NovaLikes offers Instagram Comments packages for eligible public posts and Reels.',
    },
    {
      question: 'Do I need to share my Instagram password?',
      answer: 'No. NovaLikes does not require your Instagram password or verification codes for its Instagram services.',
    },
    {
      question: 'Which Instagram service should I choose?',
      answer:
        'Choose Followers for visible profile audience size, Likes for engagement on a specific post or Reel, Views for eligible video view count and Comments for visible conversation around content.',
    },
    {
      question: 'Are Instagram Followers, Likes and Views the same thing?',
      answer:
        'No. They are separate Instagram metrics. Followers apply to the profile, while Likes and Views apply to eligible individual content.',
    },
    {
      question: 'Will buying Instagram Followers automatically increase my Likes?',
      answer: 'No. Followers and Likes are separate metrics and separate services.',
    },
    {
      question: 'Will buying Instagram Views make my Reel viral?',
      answer:
        'There is no guarantee. An Instagram Views package changes the visible View metric described by the service. Organic distribution depends on separate factors.',
    },
    {
      question: 'Can Australian businesses use NovaLikes Instagram services?',
      answer:
        'Eligible public Instagram profiles and content used by Australian businesses, creators, brands and agencies can use the relevant NovaLikes services.',
    },
    {
      question: 'Can local businesses use Instagram growth services?',
      answer:
        'Yes, where the profile or content meets the relevant service requirements. Keep your business information and content accurate alongside your Instagram strategy.',
    },
    {
      question: 'How do I choose the right package?',
      answer:
        'Start with your current profile or content metric, decide what increase you want and compare the available packages before ordering.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
    },
    {
      question: 'Does NovaLikes offer a money-back guarantee?',
      answer:
        'NovaLikes offers a 30-day money-back guarantee on eligible orders according to the current Refund Policy.',
    },
    {
      question: 'Does NovaLikes also offer TikTok and Facebook services?',
      answer:
        'Yes. NovaLikes also offers TikTok Followers, Likes and Views, plus Facebook Followers, Page Likes and Post Likes.',
    },
  ],
};

hub.finalCta = {
  ...hub.finalCta,
  eyebrow: 'Instagram Growth for Australia',
  title: 'Ready to Build a Stronger Instagram Presence?',
  description:
    'Start with the metric that matters most to your profile or campaign. Build your visible profile audience with Followers. Put more engagement behind important posts and Reels with Likes. Give your strongest video content more visible Views. Or create more visible conversation with Comments. Choose your Instagram service, compare the available packages and place your order without sharing your password.',
  primaryCta: { label: 'Explore Instagram Services', href: '#instagram-services' },
  secondaryCta: { label: 'Compare Packages', href: '#services-overview' },
  trustItems: [
    { id: 'secure', label: 'No Password Required', icon: 'shield' },
    { id: 'delivery', label: 'Clear Pricing', icon: 'bolt' },
    { id: 'support', label: 'Secure Checkout', icon: 'headset' },
    { id: 'tracking', label: 'Order Tracking', icon: 'shield' },
  ],
};

const hubOut = hub as typeof hub & {
  instagramOnly?: boolean;
  hideReviews?: boolean;
  crossPlatform?: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    platforms: Array<{
      id: 'tiktok' | 'facebook';
      title: string;
      description: string;
      cta: { label: string; href: string };
    }>;
  };
  storySections?: Array<{
    id: string;
    eyebrow?: string;
    title: string;
    lead?: string;
    paragraphs?: string[];
    bullets?: string[];
    items?: { title: string; body: string }[];
    footer?: string;
  }>;
};

hubOut.instagramOnly = true;
hubOut.hideReviews = true;
hubOut.crossPlatform = {
  id: 'cross-platform',
  eyebrow: 'More Platforms',
  title: 'Instagram First. TikTok and Facebook When Your Campaign Needs Them.',
  description:
    'Instagram is the primary growth focus at NovaLikes, but your social presence may extend across more than one platform. Use each platform according to where your audience and content actually live.',
  platforms: [
    {
      id: 'tiktok',
      title: 'TikTok Growth Services',
      description:
        "Choose TikTok Followers, Likes or Views when you're working on your TikTok profile or individual videos.",
      cta: { label: 'Explore TikTok Services', href: auHref('/buy-tiktok-followers') },
    },
    {
      id: 'facebook',
      title: 'Facebook Growth Services',
      description:
        "Choose Facebook Followers, Page Likes or Post Likes when you're working on an eligible public Facebook Page or post.",
      cta: { label: 'Explore Facebook Services', href: auHref('/buy-facebook-followers') },
    },
  ],
};

hubOut.storySections = [
  {
    id: 'profile-growth-table',
    eyebrow: 'Choose the Right Metric',
    title: 'Profile Growth, Post Engagement or Reel Views?',
    lead: 'Start With the Metric You Actually Want to Change',
    footer:
      'Followers do not automatically include Likes. Likes do not automatically add Views. Views do not automatically increase Followers. Comments are another separate form of interaction. Choose the metric first. Then choose the package.',
    items: [
      {
        title: 'Increase the visible audience around your profile',
        body: 'Start with Instagram Followers.',
      },
      {
        title: 'Add Likes to a specific post or Reel',
        body: 'Start with Instagram Likes.',
      },
      {
        title: 'Increase the displayed Views on video content',
        body: 'Start with Instagram Views.',
      },
      {
        title: 'Add visible conversation around a post or Reel',
        body: 'Start with Instagram Comments.',
      },
    ],
  },
  {
    id: 'audience-segments',
    eyebrow: 'Australian Instagram',
    title: 'Built Around Australian Creators, Businesses and Brands',
    lead: 'Your Instagram strategy should fit the account. Not the other way around.',
    items: [
      {
        title: 'Creators',
        body: 'Strengthen the profile around a clear niche and your best work.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Put attention behind products, launches and Reels that customers may explore before visiting your store.',
      },
      {
        title: 'Local Businesses',
        body: 'Build a stronger profile around real services, projects, locations and customer-facing activity.',
      },
      {
        title: 'Agencies',
        body: "Choose Followers, Likes, Views or Comments according to each client's actual campaign.",
      },
      {
        title: 'Established Brands',
        body: 'Support visible Instagram metrics while continuing genuine content, paid campaigns and audience activity.',
      },
    ],
  },
  {
    id: 'first-impression',
    title: 'Build a Stronger First Impression When People Visit Your Profile',
    lead: 'Someone who discovers your Instagram account may form an impression quickly.',
    bullets: [
      'profile image',
      'username',
      'bio',
      'follower count',
      'recent posts',
      'pinned content',
      'Reels',
      'Likes',
      'Comments',
      'overall visual consistency',
    ],
    paragraphs: [
      'Visible metrics can support how established the account appears. But the rest of the profile still needs to make sense.',
      'NovaLikes can support the visible Instagram metric you choose. The profile behind that number determines what someone sees next.',
    ],
    items: [
      {
        title: 'For Creators',
        body: 'Make your niche and content style easy to understand.',
      },
      {
        title: 'For Businesses',
        body: 'Explain clearly what you offer and where interested customers should go next.',
      },
      {
        title: 'For Brands',
        body: 'Keep your visuals, messaging and campaign content consistent.',
      },
      {
        title: 'For Local Businesses',
        body: 'Make sure location, service and contact information are accurate where relevant.',
      },
    ],
  },
  {
    id: 'priority-content',
    title: 'Use Instagram Growth Around the Content That Matters Most',
    lead: 'Not every Instagram post or Reel needs the same level of support. Some content has a more important role.',
    footer: 'Choose the content first. Then decide whether Followers, Likes, Views or Comments make sense around it.',
    items: [
      {
        title: 'A Product Launch',
        body: 'Support the post or Reel that demonstrates the product clearly.',
      },
      {
        title: 'A Creator Collaboration',
        body: 'Focus on the content that best represents the partnership.',
      },
      {
        title: 'A Business Introduction',
        body: 'Use strong profile content to help new visitors understand the business quickly.',
      },
      {
        title: 'A Portfolio Piece',
        body: "Highlight work you'd genuinely want a potential customer, client or partner to see.",
      },
      {
        title: 'An Evergreen Reel',
        body: 'A tutorial, demonstration or useful explainer may continue representing the account long after publication.',
      },
      {
        title: 'An Important Announcement',
        body: 'A new service, location, event or business update may deserve more attention than an everyday post.',
      },
    ],
  },
  {
    id: 'campaign-moments',
    title: 'Put Instagram Growth Behind Australian Campaign Moments',
    lead: 'Timing can make certain Instagram content more important.',
    paragraphs: [
      'Visible Instagram metrics can support the presentation around those moments. The campaign still needs strong creative, accurate information and a clear offer behind it.',
    ],
    items: [
      {
        title: 'Product Drops',
        body: 'Put attention behind your strongest launch content rather than every post in the feed.',
      },
      {
        title: 'Boxing Day Campaigns',
        body: "Retail and ecommerce brands may have high-priority content around one of Australia's major shopping periods.",
      },
      {
        title: 'Summer Campaigns',
        body: 'Travel, hospitality, fashion, fitness, events and outdoor brands may have stronger campaign activity through the Australian summer.',
      },
      {
        title: 'New Location Launches',
        body: 'Businesses expanding into Sydney, Melbourne, Brisbane, Perth, Adelaide or another market can use Instagram to introduce the location and recent activity.',
      },
      {
        title: 'Creator Partnerships',
        body: 'Collaboration campaigns may bring new visitors who want to explore the profile behind the post.',
      },
      {
        title: 'Events',
        body: 'Venues, organisations and local businesses can use Instagram around launches, events and community activity.',
      },
    ],
  },
  {
    id: 'better-profile',
    title: 'Turn Visible Growth Into a Better Instagram Profile',
    lead: 'A stronger-looking metric can get attention. What happens after that depends on the rest of the account.',
    footer:
      'Visible growth can support the first impression. A better profile supports what happens next.',
    items: [
      { title: 'Make Your Bio Clear', body: 'People should understand who you are and what the profile is about.' },
      { title: 'Pin Useful Content', body: 'Use pinned posts and Reels to help new visitors find your strongest work.' },
      {
        title: 'Keep Your Content Direction Recognisable',
        body: "Give people a reason to understand what they'll get if they continue exploring.",
      },
      {
        title: 'Keep Your Information Current',
        body: "Don't send potential customers toward outdated offers, products or contact information.",
      },
      { title: 'Maintain Recent Activity', body: 'A profile with relevant current content gives more context behind its visible metrics.' },
      {
        title: 'Give Business Visitors a Next Step',
        body: "If you're using Instagram commercially, make it clear how interested users can learn more, enquire or shop.",
      },
    ],
  },
  {
    id: 'content-worth-following',
    title: 'Build Instagram Content Worth Following',
    lead: 'If long-term Instagram growth matters, keep working on the part no package can replace. The content.',
    footer:
      'Purchased metrics can change what is visibly displayed. Your genuine audience behaviour should guide your long-term content decisions.',
    items: [
      { title: 'Develop Clear Content Themes', body: 'Build around subjects connected to the audience you genuinely want.' },
      {
        title: 'Use Reels With a Purpose',
        body: 'Create demonstrations, explanations, stories, transformations, comparisons or other videos that suit your account.',
      },
      { title: 'Make Posts Useful', body: 'Carousels and images can educate, prove, introduce or explain something relevant.' },
      { title: 'Give Captions a Job', body: 'Use them to add context rather than filling space.' },
      {
        title: 'Respond to Genuine People',
        body: 'Real questions, comments and messages deserve real responses from the person or business behind the account.',
      },
      {
        title: 'Learn From Instagram Insights',
        body: 'Use genuine account performance to understand what real viewers actually respond to.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Instagram Growth for Australian Local Businesses',
    paragraphs: [
      'For local businesses, Instagram can work alongside your website, Google presence, referrals and other marketing channels.',
      'Someone may visit your profile because they want to see what the business actually looks like.',
      'A restaurant may show recent dishes. A builder may showcase completed projects. An interior designer may show finished spaces. A salon may publish recent work. A retailer may feature new products. A real estate business may show properties. A tourism company may showcase experiences. A professional service may answer common customer questions.',
      "If you're putting more visible growth behind a local-business profile, keep the business information accurate. Show real work. Use relevant location context where it genuinely helps customers. Make the next step easy.",
      'Followers, Likes, Views and Comments can support presentation. The real business behind the account builds trust.',
    ],
  },
  {
    id: 'customer-proof',
    title: 'Support Visible Metrics With Genuine Customer Proof',
    paragraphs: [
      'Social metrics and customer proof are not the same thing.',
      'For Australian businesses, real trust can also come from genuine customer reviews, authentic testimonials, completed projects, case studies, real customer comments, tagged customer content, business history, accurate contact information and responsive customer service.',
      "If your business has genuine proof, show it. Don't invent testimonials simply to make the account appear stronger.",
      'Visible Instagram metrics can support presentation. Real customer experiences provide deeper credibility.',
    ],
  },
  {
    id: 'metric-meanings',
    title: 'Understand What Each Instagram Metric Actually Tells You',
    lead: 'No single Instagram number tells the complete story.',
    items: [
      { title: 'Followers', body: 'Follower count is a profile-level audience metric.' },
      { title: 'Likes', body: 'Likes apply visible engagement to individual posts and Reels.' },
      { title: 'Views', body: 'Views are relevant to eligible Reels and video content.' },
      { title: 'Comments', body: 'Comments create visible conversation around individual content.' },
      {
        title: 'Genuine Performance',
        body: 'Use your real account analytics to understand organic reach, audience behaviour, content performance and other genuine activity.',
      },
    ],
    footer:
      'Purchased metrics can support selected visible numbers. Your genuine Insights should guide your real growth strategy.',
  },
  {
    id: 'affordable-growth',
    title: 'Affordable Instagram Growth Without Guesswork',
    paragraphs: [
      "If you're comparing affordable Instagram growth services in Australia, price naturally matters. But don't choose based only on the cheapest number.",
      'Check which Instagram metric changes, package quantity, current pricing, required public information, password requirements, order tracking, customer support, service policies and what the provider actually promises.',
      'A clearer buying experience makes it easier to compare packages realistically. NovaLikes lets you choose the metric and package before you pay.',
    ],
  },
  {
    id: 'account-you-have',
    title: 'Build Growth Around the Account You Actually Have',
    paragraphs: [
      'There is no universal Instagram package every creator or business should use.',
      'A newer account may want a smaller follower increase. An established creator may care more about an important Reel. An ecommerce brand may focus on Likes or Views around a product launch. A local business may want the overall profile to look more established before a campaign sends new visitors toward it.',
      'Look at where the account is today. Decide which metric needs attention. Then choose the package that fits.',
      'Growth should support your strategy, not replace it.',
    ],
  },
];

hub.platformSelector.socialProof = {
  text: 'Compare Instagram follower, like, view and comment packages',
  href: '#services-overview',
};

hub.hero.visual = {
  ...hub.hero.visual,
  alt: 'NovaLikes Instagram growth illustration for Australian creators and businesses',
};

writeFileSync(path.join(OUT, 'homepage.json'), `${JSON.stringify(hubOut, null, 2)}\n`, 'utf8');

const metaPath = path.join(OUT, 'metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  homepage: { title: string; description: string };
};
meta.homepage = {
  title: 'Instagram Growth Services Australia | NovaLikes',
  description:
    'Grow your Instagram presence in Australia with followers, likes, views and comments. Clear packages, no password required and online order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

console.log('Patched Australia homepage with supplied copy.');
