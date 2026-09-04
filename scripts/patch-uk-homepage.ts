/**
 * Apply supplied United Kingdom homepage copy to content/markets/uk/homepage.json
 * Run: npx tsx scripts/patch-uk-homepage.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { homepageHub } from '../data/content/homepage-hub';

const UK_PREFIX = '/uk';
const OUT = path.join(process.cwd(), 'content/markets/uk');

function ukHref(href: string): string {
  if (href.startsWith('/buy-')) return `${UK_PREFIX}${href}`;
  return href;
}

function prefixHrefs<T>(value: T): T {
  if (typeof value === 'string') {
    if (value.startsWith('/buy-')) return `${UK_PREFIX}${value}` as T;
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
  eyebrow: 'INSTAGRAM GROWTH SERVICES FOR THE UK',
  title: 'Build a Stronger Instagram Presence in the UK',
  description:
    "Put more visible momentum behind the Instagram profile and content you're already building. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to choose Instagram Followers, Likes, Views and Comments from one place. Start with the metric you want to work on, compare the available packages and place your order using only the public profile or content details required for that service. No Instagram password is required. Whether you're growing a creator profile in London, preparing an ecommerce campaign in Manchester, strengthening a local business account or putting more attention behind an important Reel, start with the Instagram service that matches your actual goal.",
  primaryCta: { label: 'Explore Instagram Services', href: '#instagram-services' },
  secondaryCta: { label: 'Compare Packages', href: '#services-overview' },
  trustFeatures: [
    { id: 'password', line1: 'No Password', line2: 'Required', icon: 'shield' },
    { id: 'pricing', line1: 'Clear', line2: 'Pricing', icon: 'tag' },
    { id: 'payments', line1: 'Secure Card', line2: 'Payments', icon: 'shield' },
    { id: 'tracking', line1: 'Order', line2: 'Tracking', icon: 'truck' },
  ],
};

hub.platformSelector = {
  ...hub.platformSelector,
  eyebrow: 'Instagram Services',
  title: 'What Instagram Growth Services Does NovaLikes Offer in the UK?',
  description:
    'NovaLikes offers Instagram Followers, Likes, Views and Comments for eligible public profiles and content. Each service works on a different Instagram metric. Followers work at the profile level. Likes apply to eligible posts and Reels. Views apply to eligible Reels and video content. Comments add visible conversation around selected posts and Reels. Choose the service according to the exact part of your Instagram presence you want to strengthen.',
  platforms: hub.platformSelector.platforms.map((platform) => {
    if (platform.id !== 'instagram') return platform;
    return {
      ...platform,
      description:
        'Followers, Likes, Views and Comments for eligible Instagram profiles and content in the UK.',
      tags: [
        { label: 'Instagram Followers', href: ukHref('/buy-instagram-followers'), icon: 'user' as const },
        { label: 'Instagram Likes', href: ukHref('/buy-instagram-likes'), icon: 'heart' as const },
        { label: 'Instagram Views', href: ukHref('/buy-instagram-views'), icon: 'play' as const },
        { label: 'Instagram Comments', href: ukHref('/buy-instagram-comments'), icon: 'comment' as const },
      ],
    };
  }),
};

hub.servicesOverview = {
  ...hub.servicesOverview,
  eyebrow: 'Choose Your Goal',
  title: 'Start With the Instagram Result You Want',
  description:
    'Instagram growth is not one number. Your follower count, post Likes, Reel Views and Comments all represent different parts of the account. Choose the result first. Then choose the service.',
  trustNote: 'Your Goal → Start With the Right Service',
  features: [
    { id: 'followers', label: 'Increase the follower count around your profile → Instagram Followers', icon: 'users' },
    { id: 'likes', label: 'Add visible engagement to a post or Reel → Instagram Likes', icon: 'bolt' },
    { id: 'views', label: 'Increase the displayed View count on video content → Instagram Views', icon: 'headset' },
    { id: 'comments', label: 'Add visible conversation around content → Instagram Comments', icon: 'shield' },
  ],
};

hub.platformGroupTitles = {
  ...hub.platformGroupTitles,
  instagram: {
    id: 'instagram-services',
    title: 'Built Around the Way UK Creators and Businesses Use Instagram',
    description:
      'Instagram can play a very different role depending on the account behind it. A creator in London may use Instagram around fashion, fitness, food, entertainment, beauty or education. An ecommerce brand in Manchester may rely on Instagram around product launches, creator partnerships and seasonal promotions. A local business in Birmingham, Leeds, Glasgow, Liverpool, Bristol or another UK market may use its profile to show real projects, products, services and recent activity. An agency may manage multiple accounts with completely different campaign goals. An established brand may use Instagram alongside search, paid media, ecommerce, email and influencer marketing. That means there is no single growth package that makes sense for every account.',
  },
  tiktok: {
    id: 'tiktok-services',
    title: 'TikTok Growth Services',
    description:
      "Choose TikTok Followers, Likes or Views when you're working on a TikTok profile or individual videos. TikTok services are separate from Instagram and should be selected according to the metric you want to change.",
  },
  facebook: {
    id: 'facebook-services',
    title: 'Facebook Growth Services',
    description:
      "Choose Facebook Followers, Page Likes or Post Likes when you're working on an eligible public Facebook Page or individual post. Facebook Followers and Page Likes work at the Page level. Post Likes work on individual content.",
  },
};

const igServiceUpdates: Record<string, Partial<(typeof hub.services)[number]>> = {
  'ig-followers': {
    commercialLabel: 'INSTAGRAM FOLLOWERS',
    title: 'Build a Stronger Visible Audience Around Your Profile',
    intro:
      'Choose Instagram Followers when the follower count displayed on your public profile is the metric you want to work on. Follower packages can support the visible audience around a creator profile, local business, ecommerce brand or established company while you continue building the content behind it.',
    points: [
      { title: 'Creators', text: 'Strengthen the visible profile around a clear niche and content people have a reason to explore.' },
      { title: 'Personal Brands', text: 'Support the visible audience around an established or growing public profile.' },
      { title: 'Local Businesses', text: 'Build a stronger profile around genuine services, locations, projects and business activity.' },
      { title: 'Ecommerce Brands', text: 'Put attention behind launches, products and Reels that support your wider campaign.' },
      { title: 'Public Business Profiles', text: 'Support the visible audience around a company profile potential customers may check.' },
      { title: 'Campaign Preparation', text: 'Prepare a profile before a launch, collaboration or campaign sends new visitors toward it.' },
    ],
    cta: { label: 'Buy Instagram Followers', href: ukHref('/buy-instagram-followers') },
  },
  'ig-likes': {
    commercialLabel: 'INSTAGRAM LIKES',
    title: 'Put More Engagement Behind Important Posts and Reels',
    intro:
      'Choose Instagram Likes when one specific piece of content is your priority. Add more visible Likes around an eligible public post or Reel based on the content, existing engagement and increase you want.',
    points: [
      { title: 'Product Launches', text: 'Support the content that introduces or demonstrates the product most clearly.' },
      { title: 'Creator Collaborations', text: 'Focus on the post or Reel that best represents the partnership.' },
      { title: 'Portfolio Posts', text: "Highlight work you'd genuinely want a potential client or customer to see." },
      { title: 'Business Announcements', text: 'Add visible Likes around important company updates and milestones.' },
      { title: 'Campaign Content', text: 'Support the posts and Reels carrying your main campaign message.' },
      { title: 'Priority Reels', text: 'Put more engagement behind Reels that matter most to your strategy.' },
    ],
    cta: { label: 'Buy Instagram Likes', href: ukHref('/buy-instagram-likes') },
  },
  'ig-views': {
    commercialLabel: 'INSTAGRAM VIEWS',
    title: 'Put More Visible Attention Behind Your Reels',
    intro:
      "Choose Instagram Views when video visibility is the metric you're working on. Views apply to eligible public Instagram Reels and video content rather than your overall profile follower count.",
    points: [
      { title: 'Product Demonstrations', text: 'Put more visible Views behind videos that show your offer clearly.' },
      { title: 'Creator Reels', text: 'Support the Reels that represent your niche and content direction.' },
      { title: 'Business Videos', text: 'Give priority video content more visible attention.' },
      { title: 'Campaign Creative', text: 'Support video content carrying your main campaign message.' },
      { title: 'Portfolio Videos', text: 'Highlight video work you genuinely want potential customers to see.' },
      { title: 'Evergreen Video Content', text: 'Support tutorials, explainers and useful videos that continue representing the account.' },
    ],
    cta: { label: 'Buy Instagram Views', href: ukHref('/buy-instagram-views') },
  },
  'ig-comments': {
    commercialLabel: 'INSTAGRAM COMMENTS',
    title: 'Build More Visible Conversation Around Your Content',
    intro:
      'Comments create a different type of interaction from Followers, Likes and Views. Choose Instagram Comments when you want more visible conversation around an eligible public post or Reel.',
    points: [
      { title: 'Product Launches', text: 'Add visible conversation around important announcements and launch content.' },
      { title: 'Discussion Posts', text: 'Support content built around questions, topics or audience conversation.' },
      { title: 'Creator Collaborations', text: 'Focus on partnership content where visible discussion supports the post.' },
      { title: 'Announcements', text: 'Use Comments when visible conversation supports a priority update or milestone.' },
      { title: 'Campaign Posts', text: 'Support content where conversation helps the post carry its message.' },
      { title: 'Conversation Content', text: 'Use Comments on posts designed around discussion and audience interaction.' },
    ],
    cta: { label: 'Buy Instagram Comments', href: ukHref('/buy-instagram-comments') },
  },
};

hub.services = hub.services.map((service) => {
  const update = igServiceUpdates[service.id];
  if (update) return { ...service, ...update };
  return {
    ...service,
    href: ukHref(service.href),
    cta: { ...service.cta, href: ukHref(service.cta.href) },
  };
});

hub.why = {
  ...hub.why,
  title: 'Why Choose NovaLikes?',
  description: 'Ordering social media services should not leave you guessing about what you\'re buying.',
  points: [
    {
      title: 'No Password Required',
      body: 'NovaLikes only asks for the public profile, post, Reel, Page or video information required for the selected service. Your account password stays private.',
    },
    {
      title: 'Clear Package Options',
      body: 'See available quantities and prices before placing your order.',
    },
    {
      title: 'Service-Specific Ordering',
      body: 'Followers work around public profile details. Likes, Views and Comments work around eligible individual content.',
    },
    {
      title: 'Secure Card Payments',
      body: 'Complete your purchase through the available NovaLikes checkout.',
    },
    {
      title: 'Order Tracking',
      body: 'Use your order information afterwards to check available status updates.',
    },
    {
      title: 'Customer Support',
      body: 'Contact NovaLikes if you need help with a service or existing purchase.',
    },
    {
      title: '30-Day Money-Back Guarantee on Eligible Orders',
      body: 'Eligible purchases are covered according to the current NovaLikes refund terms.',
    },
  ],
};

hub.howItWorks = {
  ...hub.howItWorks,
  title: 'How NovaLikes Works',
  description: 'No Instagram password is required.',
  steps: [
    { title: 'Choose Your Instagram Service', body: 'Start with Followers, Likes, Views or Comments.' },
    { title: 'Pick a Package', body: 'Compare the available quantities and current prices.' },
    {
      title: 'Enter the Required Public Details',
      body: 'Depending on the service, provide the correct public Instagram username or direct post/Reel URL.',
    },
    { title: 'Review Your Order', body: 'Check the service, package, profile or content information and current price.' },
    { title: 'Complete Checkout', body: 'Place your order without sharing your Instagram password.' },
    { title: 'Track Your Purchase', body: 'Use NovaLikes order tracking afterwards for available status updates.' },
  ],
};

hub.guarantees = {
  ...hub.guarantees,
  title: "More Followers Do Not Automatically Mean More Reach",
  description:
    'Instagram metrics should be understood individually. A larger follower count does not automatically guarantee more Reel Views. More Likes do not automatically create Followers. More Views do not automatically produce wider organic distribution. More Comments do not automatically create sales. NovaLikes Instagram services should not be treated as guaranteed ways to reach Explore, make content viral, gain organic Followers, increase organic reach, secure creator partnerships, generate website traffic, create customer enquiries or increase sales. Each service works around the visible metric described by its package. Organic Instagram performance is a separate outcome. Clear expectations make it easier to choose the right service.',
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
    "A few checks can help prevent ordering mistakes. If you're comparing affordable Instagram growth services in the UK, check which Instagram metric changes, package quantity, current price, required public information, password requirements, order tracking, customer support, relevant policies and what the service actually promises.",
  items: [
    {
      question: 'Profile or Content?',
      answer:
        "Choose Followers when you're working on the overall profile. Choose Likes, Views or Comments when specific content is your priority.",
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
      answer: 'Confirm the current package price before checkout.',
    },
    {
      question: 'Public Content?',
      answer: 'Keep the submitted profile, post or Reel publicly accessible where required during processing.',
    },
    {
      question: 'Password?',
      answer: 'Keep it private. NovaLikes does not require your Instagram password.',
    },
    {
      question: 'Policies?',
      answer: 'Review the applicable service and refund information before completing your order.',
    },
  ],
};

hub.faq = {
  ...hub.faq,
  title: 'Frequently Asked Questions',
  description: 'Common questions about NovaLikes Instagram growth services in the UK.',
  items: [
    {
      question: 'What Instagram growth services does NovaLikes offer in the UK?',
      answer:
        'NovaLikes offers Instagram Followers, Likes, Views and Comments for eligible public profiles, posts and Reels. Choose the service based on the Instagram metric you want to work on.',
    },
    {
      question: 'Where can I buy Instagram Followers in the UK?',
      answer:
        'NovaLikes offers Instagram Followers packages for eligible public profiles. Choose an available package, submit the correct public username and complete checkout without sharing your password.',
    },
    {
      question: 'Can I buy Instagram Likes in the UK?',
      answer: 'Yes. NovaLikes offers Instagram Likes packages for eligible public posts and Reels.',
    },
    {
      question: 'Can I buy Instagram Views in the UK?',
      answer: 'Yes. NovaLikes offers Instagram Views for eligible public Reels and video content.',
    },
    {
      question: 'Can I buy Instagram Comments in the UK?',
      answer: 'Yes. NovaLikes offers Instagram Comments packages for eligible public posts and Reels.',
    },
    {
      question: 'Do I need to share my Instagram password?',
      answer: 'No. NovaLikes does not require your Instagram password or verification codes for Instagram services.',
    },
    {
      question: 'Which Instagram service should I choose?',
      answer:
        'Choose Followers for visible profile audience size, Likes for a specific post or Reel, Views for eligible video content and Comments for visible conversation around selected content.',
    },
    {
      question: 'Are Instagram Followers, Likes and Views the same thing?',
      answer:
        'No. They are separate Instagram metrics. Followers apply to the profile, while Likes and Views apply to individual eligible content.',
    },
    {
      question: 'Will buying Instagram Followers automatically increase my Likes?',
      answer: 'No. Instagram Followers and Likes are separate metrics and separate services.',
    },
    {
      question: 'Will buying Instagram Views make my Reel viral?',
      answer:
        'There is no guarantee. A Views package changes the visible View metric described by the service. Organic distribution is separate.',
    },
    {
      question: 'Will more Likes improve organic reach?',
      answer: 'There is no guarantee. Likes and organic content distribution are separate outcomes.',
    },
    {
      question: 'Can UK businesses use NovaLikes Instagram services?',
      answer:
        'Eligible public profiles and content used by UK businesses, creators, brands and agencies can use the relevant NovaLikes services.',
    },
    {
      question: 'Can local businesses use Instagram growth services?',
      answer:
        'Yes, where the profile or content meets the relevant service requirements. Keep your actual business information and content accurate alongside your Instagram strategy.',
    },
    {
      question: 'How do I choose the right package?',
      answer:
        'Start with your current profile or content metric, decide what increase you want and compare the available package options before ordering.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
    },
    {
      question: 'Does NovaLikes require access to my Instagram account?',
      answer: 'No. You only provide the public profile or content details required for the service you order.',
    },
    {
      question: 'Does NovaLikes offer a money-back guarantee?',
      answer:
        'NovaLikes offers a 30-day money-back guarantee on eligible orders according to its current refund terms.',
    },
    {
      question: 'Does NovaLikes also offer TikTok services?',
      answer: 'Yes. NovaLikes also offers TikTok Followers, Likes and Views.',
    },
    {
      question: 'Does NovaLikes offer Facebook services?',
      answer: 'Yes. Facebook Followers, Page Likes and Post Likes are also available.',
    },
  ],
};

hub.finalCta = {
  ...hub.finalCta,
  eyebrow: 'Instagram Growth for the UK',
  title: 'Ready to Build a Stronger Instagram Presence in the UK?',
  description:
    'Start with the metric that matters most to your profile or campaign. Build your visible profile audience with Followers. Put more engagement behind important posts and Reels with Likes. Give selected video content more visible Views. Or create more visible conversation with Comments. Choose your Instagram service, compare the available packages and place your order without sharing your password.',
  primaryCta: { label: 'Explore Instagram Services', href: '#instagram-services' },
  secondaryCta: { label: 'Compare Packages', href: '#services-overview' },
  trustItems: [
    { id: 'secure', label: 'No Password Required', icon: 'shield' },
    { id: 'delivery', label: 'Clear Pricing', icon: 'bolt' },
    { id: 'support', label: 'Secure Card Payments', icon: 'headset' },
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
    'Instagram is the primary growth focus, but your social presence may extend across more than one platform.',
  platforms: [
    {
      id: 'tiktok',
      title: 'TikTok Growth Services',
      description:
        "Choose TikTok Followers, Likes or Views when you're working on a TikTok profile or individual videos. TikTok services are separate from Instagram and should be selected according to the metric you want to change.",
      cta: { label: 'Explore TikTok Services', href: ukHref('/buy-tiktok-followers') },
    },
    {
      id: 'facebook',
      title: 'Facebook Growth Services',
      description:
        'Choose Facebook Followers, Page Likes or Post Likes when you\'re working on an eligible public Facebook Page or individual post. Facebook Followers and Page Likes work at the Page level. Post Likes work on individual content.',
      cta: { label: 'Explore Facebook Services', href: ukHref('/buy-facebook-followers') },
    },
  ],
};

hubOut.storySections = [
  {
    id: 'profile-growth-table',
    eyebrow: 'Choose the Right Metric',
    title: 'Profile Growth, Post Engagement, Reel Views or Conversation?',
    lead: 'The easiest way to choose a service is to separate profile-level growth from content-level engagement.',
    footer:
      'Followers do not automatically include Likes. Likes do not automatically add Views. Views do not automatically increase Followers. Comments are another separate interaction. Choose the metric first. Then choose the package.',
    items: [
      {
        title: 'Increase the follower count around your profile',
        body: 'Start with Instagram Followers.',
      },
      {
        title: 'Add visible engagement to a post or Reel',
        body: 'Start with Instagram Likes.',
      },
      {
        title: 'Increase the displayed View count on video content',
        body: 'Start with Instagram Views.',
      },
      {
        title: 'Add visible conversation around content',
        body: 'Start with Instagram Comments.',
      },
    ],
  },
  {
    id: 'audience-segments',
    eyebrow: 'UK Instagram',
    title: 'Built Around the Way UK Creators and Businesses Use Instagram',
    lead: 'Instagram growth should fit the account you\'re building. Not the other way around.',
    items: [
      {
        title: 'Creators',
        body: 'Strengthen the visible profile around a clear niche and content people have a reason to explore.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Put attention behind launches, products and Reels that support your wider campaign.',
      },
      {
        title: 'Local Businesses',
        body: 'Build a stronger profile around genuine services, locations, projects and business activity.',
      },
      {
        title: 'Agencies',
        body: 'Choose Followers, Likes, Views or Comments according to the actual objective of each client account.',
      },
      {
        title: 'Established Brands',
        body: 'Support selected visible metrics while continuing genuine publishing, paid campaigns and customer communication.',
      },
    ],
  },
  {
    id: 'first-impression',
    title: 'Build a Stronger First Impression',
    lead: 'Someone may discover your Instagram account through a Reel, Google search, creator collaboration, paid campaign, recommendation or another social platform. If they visit your profile, they may quickly notice:',
    bullets: [
      'profile image',
      'username',
      'bio',
      'follower count',
      'recent posts',
      'pinned content',
      'Reels',
      'highlights',
      'visible engagement',
      'overall consistency',
    ],
    paragraphs: [
      'A stronger visible profile can support that first impression. But the numbers are only part of what someone sees.',
      'NovaLikes can support the visible Instagram metric you choose. The profile behind that metric determines what visitors discover next.',
    ],
    items: [
      {
        title: 'For Creators',
        body: 'Make your niche, style and strongest content easy to understand.',
      },
      {
        title: 'For Businesses',
        body: 'Explain what you offer and make the next step clear.',
      },
      {
        title: 'For Ecommerce Brands',
        body: 'Keep product and campaign content easy to find.',
      },
      {
        title: 'For Local Businesses',
        body: 'Make your location, services and contact information accurate where relevant.',
      },
    ],
  },
  {
    id: 'priority-content',
    title: 'Put Instagram Growth Behind Content That Matters',
    lead: 'Not every post or Reel needs the same level of attention. Some content has a more important job.',
    footer: 'Choose the content first. Then decide whether Followers, Likes, Views or Comments fit the objective.',
    items: [
      {
        title: 'Product Launches',
        body: 'Support the post or Reel that introduces or demonstrates the product most clearly.',
      },
      {
        title: 'Creator Collaborations',
        body: 'Focus on the content that best represents the partnership.',
      },
      {
        title: 'Business Introductions',
        body: 'Make it easy for new visitors to understand the company behind the profile.',
      },
      {
        title: 'Portfolio Content',
        body: "Highlight work you'd genuinely want a potential client or customer to see.",
      },
      {
        title: 'Evergreen Reels',
        body: 'Tutorials, demonstrations and useful explainers can continue representing your account long after publication.',
      },
      {
        title: 'Major Announcements',
        body: 'A new service, location, event or company update may deserve more attention than a routine post.',
      },
    ],
  },
  {
    id: 'campaign-moments',
    title: 'Plan Instagram Around Important UK Campaign Moments',
    lead: 'Some times of year make particular content more important.',
    paragraphs: [
      'Visible Instagram metrics can support campaign presentation. The campaign itself still needs strong creative, accurate information and a clear offer.',
    ],
    items: [
      {
        title: 'Black Friday',
        body: 'UK ecommerce and retail brands may have priority product, promotional and campaign content around Black Friday.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use Instagram alongside email, paid advertising and ecommerce during Cyber Monday campaigns.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Gift guides, festive products, hospitality promotions, events and seasonal offers can become priority content.',
      },
      {
        title: 'Boxing Day',
        body: 'Retailers and ecommerce brands may have another major campaign period around Boxing Day sales.',
      },
      {
        title: 'January Sales',
        body: 'Many UK retailers continue promotional activity into January.',
      },
      {
        title: 'Product Launches',
        body: 'Put attention behind the strongest launch content rather than every post on the profile.',
      },
      {
        title: 'Creator Partnerships',
        body: 'A collaboration may introduce your profile to an audience seeing it for the first time.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses entering another city or region can use Instagram to introduce the location, team, services and recent activity.',
      },
    ],
  },
  {
    id: 'content-worth-following',
    title: 'Build Visible Growth Around Content Worth Following',
    lead: 'If long-term Instagram growth matters, keep working on what no package can replace. Your content.',
    footer:
      'Purchased metrics can change selected visible numbers. Your genuine audience behaviour should guide the long-term strategy.',
    items: [
      { title: 'Create Reels With a Purpose', body: 'Teach, demonstrate, entertain, compare, explain or tell a relevant story.' },
      { title: 'Build Useful Carousels', body: 'Use multiple slides when a subject benefits from more context.' },
      { title: 'Make Posts Easy to Understand', body: 'Strong visuals and clear messaging can make content more useful.' },
      { title: 'Develop Recognisable Themes', body: 'Give people a reason to understand what your account is about.' },
      { title: 'Use Captions for Context', body: 'Add useful information rather than repeating what is already obvious.' },
      {
        title: 'Respond to Genuine Users',
        body: 'Real questions, comments and messages deserve real responses from the creator or business behind the account.',
      },
      {
        title: 'Review Instagram Insights',
        body: 'Use genuine account data to understand what real viewers respond to.',
      },
    ],
  },
  {
    id: 'better-profile',
    title: 'Turn Instagram Growth Into a Better Profile Experience',
    lead: 'A stronger metric can attract attention. The rest of the account determines whether that attention becomes useful.',
    footer:
      'Visible growth can support the first impression. A stronger account supports what happens after it.',
    items: [
      { title: 'Keep Your Bio Clear', body: 'Someone should quickly understand who you are or what the business offers.' },
      { title: 'Pin Strong Content', body: 'Make your best posts and Reels easier to find.' },
      {
        title: 'Keep Your Content Direction Consistent',
        body: 'Help visitors understand what else they can expect from the account.',
      },
      {
        title: 'Keep Important Information Current',
        body: 'Do not send potential customers towards outdated offers, locations or websites.',
      },
      { title: 'Maintain Recent Activity', body: 'A profile with current content gives visible metrics more context.' },
      {
        title: 'Create a Useful Next Step',
        body: 'For commercial accounts, make it easy for interested users to shop, enquire, book or learn more.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Instagram Growth for UK Local Businesses',
    paragraphs: [
      'Instagram can support local businesses alongside Google Business Profile, local SEO, referrals, paid advertising and the company website.',
      'Someone may visit your Instagram profile because they want to see what the business actually looks like.',
      'A restaurant may show current dishes. A builder may publish completed projects. An interior designer may showcase finished spaces. A salon may show recent work. A retailer may introduce new stock. An estate agency may feature properties. A fitness studio may publish classes or training content. A tourism company may showcase experiences. A professional service may answer common customer questions.',
      "If you're putting visible growth behind a local-business account, make sure the genuine business information remains accurate. Show genuine work. Use relevant city or service-area context where it helps customers. Give interested visitors a clear next step.",
      'Followers, Likes, Views and Comments can support presentation. The business behind the account builds local trust.',
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Genuine Customer Proof Alongside Social Metrics',
    paragraphs: [
      'Instagram metrics and genuine customer evidence are different things.',
      'For UK businesses, deeper credibility may come from verified reviews, authentic testimonials, completed projects, case studies, real customer comments, customer-created content, accurate company information and responsive customer service.',
      'If you have genuine proof, show it. Do not invent customer reviews or experiences simply to make your account appear stronger.',
      'Visible Instagram metrics can support presentation. Actual customer experience provides stronger credibility.',
    ],
  },
  {
    id: 'metric-meanings',
    title: 'Understand What Each Instagram Metric Actually Tells You',
    lead: 'No single public Instagram number tells the complete story.',
    items: [
      { title: 'Followers', body: 'Follower count is a profile-level audience metric.' },
      { title: 'Likes', body: 'Likes show one visible engagement metric on individual posts and Reels.' },
      { title: 'Views', body: 'Views apply to eligible Reels and video content.' },
      { title: 'Comments', body: 'Comments create visible conversation around individual content.' },
      {
        title: 'Genuine Performance',
        body: 'Use real Instagram analytics to understand organic reach, audience behaviour, content performance and genuine engagement.',
      },
    ],
    footer:
      'Purchased metrics can support selected visible numbers. Your genuine Insights should guide your wider strategy.',
  },
  {
    id: 'wider-marketing',
    title: 'Use Instagram Alongside the Rest of Your Marketing',
    paragraphs: [
      'For many UK businesses and brands, Instagram is one part of a wider customer journey. That may also include Google Search, local SEO, Google Business Profile, paid search, paid social, email, ecommerce, creator partnerships, TikTok, Facebook and your website.',
      'If a campaign sends new people towards your Instagram profile, make sure the profile supports the same message they saw elsewhere. Keep your offer consistent. Keep links current. Use the same business information. Make the next step obvious.',
      'Instagram growth can support one part of the journey. The wider marketing system creates the business outcome.',
    ],
  },
  {
    id: 'business-outcomes',
    title: 'Measure Real Business Outcomes Beyond Visible Instagram Metrics',
    paragraphs: [
      "If you're using Instagram commercially, your most important result may not be a public number. It might be sales, bookings, enquiries, website visits, calls, quote requests, shop visits, qualified messages or repeat customers.",
      'Track those outcomes separately. Purchased Followers, Likes, Views or Comments can change visible metrics. They should not be reported as proof that Instagram created a commercial result unless your real business data supports that conclusion.',
    ],
  },
  {
    id: 'agency-reporting',
    title: 'For Agencies: Keep Purchased and Genuine Performance Separate',
    paragraphs: [
      'Agencies may use NovaLikes around specific client campaigns or presentation goals. Keep reporting transparent.',
      'Distinguish between purchased Followers, purchased Likes, purchased Views, purchased Comments, organic reach, genuine engagement, paid campaign performance, website activity and business outcomes.',
      'Clear reporting creates a more accurate picture than presenting every metric as organic growth.',
    ],
  },
  {
    id: 'affordable-growth',
    title: 'Affordable Instagram Growth Without Guesswork',
    paragraphs: [
      "If you're comparing affordable Instagram growth services in the UK, price will naturally be part of the decision. But the cheapest number should not be the only thing you compare.",
      'Check which Instagram metric changes, package quantity, current price, required public information, password requirements, order tracking, customer support, relevant policies and what the service actually promises.',
      'A clearer buying experience makes it easier to understand what you\'re paying for. NovaLikes lets you choose the metric and package before checkout.',
    ],
  },
  {
    id: 'account-you-have',
    title: 'Build Growth Around the Instagram Account You Actually Have',
    paragraphs: [
      'There is no universal package that makes sense for every account.',
      'A newer creator may prefer a smaller follower increase. An established creator may care more about an important Reel. An ecommerce brand may focus on Likes or Views around a product launch. A local business may want the overall profile to look more established before a campaign brings more visitors. An agency may use completely different services across different client accounts.',
      'Start with where the account is now. Decide which metric needs attention. Then choose the package that fits.',
      'Instagram growth should support the strategy. Not replace it.',
    ],
  },
];

hub.platformSelector.socialProof = {
  text: 'Compare Instagram follower, like, view and comment packages',
  href: '#services-overview',
};

hub.hero.visual = {
  ...hub.hero.visual,
  alt: 'NovaLikes Instagram growth illustration for UK creators and businesses',
};

writeFileSync(path.join(OUT, 'homepage.json'), `${JSON.stringify(hubOut, null, 2)}\n`, 'utf8');

const metaPath = path.join(OUT, 'metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  homepage: { title: string; description: string };
};
meta.homepage = {
  title: 'Instagram Growth Services UK | NovaLikes',
  description:
    'Grow your Instagram presence in the UK with followers, likes, views and comments. Clear packages, no password required and online order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom homepage with supplied copy.');
