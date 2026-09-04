/**
 * Apply supplied United Kingdom TikTok Followers copy.
 * Run: npx tsx scripts/patch-uk-tiktok-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-tiktok-followers.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const dummy = data.dummy as Record<string, unknown>;
const config = dummy.config as Record<string, unknown>;

const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;

function ukHref(href: string): string {
  if (href.startsWith('/buy-')) return `${UK}${href}`;
  return href;
}

content.seo = {
  title: 'Buy TikTok Followers UK | Grow Your Profile | NovaLikes',
  description:
    'Buy TikTok followers in the UK with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR THE UK';
hero.title = 'Buy TikTok Followers in the UK and Build a Stronger Profile';
hero.description =
  "Build a stronger visible audience around the TikTok profile you're already developing. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to buy TikTok Followers without sharing account login details. Choose the follower quantity that fits your profile, enter your public TikTok username and complete your order online. Whether you're building a creator account, growing an ecommerce brand, preparing for a campaign or strengthening an established business profile, choose a follower package that makes sense for where your TikTok presence is today.";
hero.primaryCta = { label: 'Choose Your TikTok Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-f-trust-public', label: 'Public Username Only' },
  { id: 'tt-f-trust-password', label: 'No Password Required' },
  { id: 'tt-f-trust-pricing', label: 'Clear Pricing' },
  { id: 'tt-f-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a TikTok Followers Package That Fits Your Profile';
pricing.description =
  'Different TikTok accounts need different follower quantities. NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Followers. A newer creator may prefer a smaller increase. An established brand, business or active public profile may choose something larger. Before ordering, consider your current follower count, how active the account is, what you\'re building toward and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare TikTok Followers Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-tt-f-where-buy',
  'uk-tt-f-get-more',
  'uk-tt-f-cheap',
  'uk-tt-f-real',
  'uk-tt-f-how-many',
  'uk-tt-f-password',
  'uk-tt-f-info',
  'uk-tt-f-cost',
  'uk-tt-f-delivery',
  'uk-tt-f-views',
  'uk-tt-f-likes',
  'uk-tt-f-fyp',
  'uk-tt-f-viral',
  'uk-tt-f-monetisation',
  'uk-tt-f-platform-rules',
  'uk-tt-f-risk-free',
  'uk-tt-f-business',
  'uk-tt-f-local',
  'uk-tt-f-client',
  'uk-tt-f-wrong-username',
  'uk-tt-f-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Build the TikTok Profile Behind the Follower Count';
finalCta.description =
  'Choose the TikTok Followers package that fits your profile, submit the correct public username and place your order without sharing your login details. Then keep strengthening what makes the number matter: a clear niche, videos worth watching, genuine audience interaction and a TikTok profile people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Followers Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-followers-uk',
  title: 'Why Choose NovaLikes for TikTok Followers?',
  description: 'Buying TikTok Followers should be easy to understand before checkout.',
  items: [
    {
      id: 'tt-f-wc-password',
      title: 'No TikTok Password Required',
      description:
        'NovaLikes does not need your TikTok password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'tt-f-wc-username',
      title: 'Public Username Only',
      description: 'Provide the correct public TikTok username for the profile receiving the order.',
      icon: 'users',
    },
    {
      id: 'tt-f-wc-packages',
      title: 'Flexible Follower Quantities',
      description: 'Choose a package that fits your profile instead of paying for one fixed option.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the selected follower quantity and current package price before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'tt-f-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'tt-f-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterwards for available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'tt-f-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with your relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-tiktok-followers-without-login-uk',
  title: 'Buy TikTok Followers Without Sharing Your Login',
  description:
    'You should not need to hand over control of your TikTok account to place a follower order. NovaLikes uses the public profile information required for the service.',
  cards: [
    {
      id: 'tt-f-can-need',
      title: 'What You Need',
      description: 'Your correct public TikTok username and your selected follower package.',
      icon: 'users',
    },
    {
      id: 'tt-f-can-not-need',
      title: "What You Don't Need",
      description:
        'Your TikTok password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, search the username yourself and make sure it belongs to the exact account you want to use.',
};

config.doesBuyingHelp = {
  id: 'real-tiktok-followers-uk',
  title: 'Looking for “Real TikTok Followers”? Check the Service Behind the Label',
  description:
    '"Real TikTok Followers" is a common phrase people use when comparing follower services. You may also see high-quality TikTok Followers, active TikTok Followers or organic TikTok Followers. Different providers may define those terms differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'How many Followers are included?',
    'Which profile receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes TikTok Followers Packages Do',
  limitItems: [
    'Increase the follower count displayed on the eligible public profile submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Views, Likes, For You feed reach, customers or sales. Clear expectations make comparison easier.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-followers-order-uk',
  title: 'What Happens After You Place an Order?',
  description:
    'After checkout, your selected follower package and submitted TikTok username are connected to the purchase. The order is then processed for the intended public profile.',
  steps: [
    {
      id: 'tt-f-th-1',
      title: 'Keep the Profile Accessible',
      description:
        'The submitted account should remain publicly accessible where required during processing.',
    },
    {
      id: 'tt-f-th-2',
      title: 'Avoid Changing Your Username',
      description: 'Changing the username during an active order may interfere with processing.',
    },
    {
      id: 'tt-f-th-3',
      title: 'Check the Account Before Paying',
      description: 'Make sure the username belongs to the exact profile you intended to use.',
    },
    {
      id: 'tt-f-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on follower quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'tiktok-followers-likes-views-uk',
  title: 'Followers, Likes or Views: Choose by Goal',
  description: 'Different TikTok services affect different metrics.',
  current: {
    title: 'TikTok Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile audience size',
    ctaLabel: 'TikTok Followers',
  },
  likes: {
    title: 'TikTok Likes',
    description: 'Like count displayed on an eligible public video',
    bestFor: 'Individual video engagement',
    href: ukHref('/buy-tiktok-likes'),
    ctaLabel: 'Buy TikTok Likes',
  },
  views: {
    title: 'TikTok Views',
    description: 'View count displayed on an eligible public video',
    bestFor: 'Video visibility',
    href: ukHref('/buy-tiktok-views'),
    ctaLabel: 'Buy TikTok Views',
  },
  combinedNote:
    'Choose Followers for profile audience size. Choose Likes for individual video engagement. Choose Views for video visibility. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-followers-uk',
  title: 'Before You Buy TikTok Followers in the UK',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'tt-f-bb-username',
      title: 'Confirm Your Username',
      description: "Make sure you're submitting the exact public TikTok profile.",
      icon: 'users',
    },
    {
      id: 'tt-f-bb-package',
      title: 'Check the Follower Quantity',
      description: 'Review how many Followers are included in the package.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-bb-price',
      title: 'Confirm the Current Price',
      description: 'Make sure the selected quantity and price match what you intend to purchase.',
      icon: 'credit-card',
    },
    {
      id: 'tt-f-bb-public',
      title: 'Keep the Profile Accessible',
      description: 'Avoid making the submitted profile unavailable while processing requires access.',
      icon: 'shield-check',
    },
    {
      id: 'tt-f-bb-username-change',
      title: 'Avoid Username Changes',
      description: 'Changing your TikTok username during an active order may interfere with processing.',
      icon: 'lock',
    },
    {
      id: 'tt-f-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your TikTok password or verification codes.',
      icon: 'headphones',
    },
    {
      id: 'tt-f-bb-metric',
      title: 'Choose the Correct TikTok Service',
      description: 'Followers, Likes and Views are separate metrics.',
      icon: 'megaphone',
    },
    {
      id: 'tt-f-bb-platform',
      title: 'Understand Platform Rules',
      description: "Review TikTok's current Community Guidelines if third-party engagement risk matters to you.",
      icon: 'shield-check',
    },
    {
      id: 'tt-f-bb-policies',
      title: 'Review NovaLikes Policies',
      description: 'Read the relevant service and refund information before checkout.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'measure-tiktok-growth-beyond-followers-uk',
  title: 'Measure TikTok Growth Beyond Follower Count',
  description:
    'Follower count tells you one thing about your profile. It does not tell you whether your wider TikTok strategy is working.',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased Followers change one visible metric. Your genuine account data should guide your longer-term strategy.',
  cards: [
    {
      id: 'tt-f-ww-views',
      title: 'Which Videos Earn Real Views?',
      description: 'Compare actual performance across multiple videos.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-f-ww-watch',
      title: 'What Holds Attention?',
      description: 'Look at genuine viewer behaviour where available.',
      icon: 'heart',
    },
    {
      id: 'tt-f-ww-shares',
      title: 'What Creates Real Interaction?',
      description: 'Pay attention to authentic Comments and Shares.',
      icon: 'users',
    },
    {
      id: 'tt-f-ww-organic',
      title: 'Which Videos Create Organic Followers?',
      description: 'Learn what genuinely encourages viewers to stay.',
      icon: 'megaphone',
    },
  ],
};

config.packageSizes = {
  id: 'choose-tiktok-followers-package-uk',
  title: 'Choose a TikTok Followers Package That Fits Your Profile',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Followers. Consider your current follower count, how active the account is, what you\'re building toward and the increase you actually want.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'tt-f-ps-count',
      quantity: 'Your Current Follower Count',
      recommendedFor: 'Start with the audience size already displayed on your profile.',
    },
    {
      id: 'tt-f-ps-active',
      quantity: 'How Active the Account Is',
      recommendedFor:
        'A profile with recent videos, a clear niche and consistent activity gives the follower number more context.',
    },
    {
      id: 'tt-f-ps-building',
      quantity: "What You're Building Toward",
      recommendedFor:
        'A launch, collaboration, seasonal campaign or new content direction may affect the quantity that makes sense.',
    },
    {
      id: 'tt-f-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on your profile rather than automatically selecting the largest available package.',
    },
  ],
  bottomNote: 'Compare TikTok Followers Packages',
};

config.bestPractices = {
  id: 'affordable-tiktok-followers-uk',
  title: 'Looking for Affordable TikTok Followers in the UK?',
  description:
    "If you're searching for cheap TikTok Followers in the UK, price will naturally be part of the comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable TikTok Followers service should make these details clear before checkout. NovaLikes lets you compare the available follower quantities and current prices before choosing.',
  items: [
    { id: 'tt-f-bp-1', title: 'Follower Quantity', description: 'Check how many followers are included.', icon: 'users' },
    { id: 'tt-f-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    {
      id: 'tt-f-bp-3',
      title: 'Public Profile Requirements',
      description: 'Know what public username information you need to provide.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-bp-4',
      title: 'Password Policy',
      description: 'Confirm whether your TikTok password is requested.',
      icon: 'lock',
    },
    { id: 'tt-f-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'tt-f-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    {
      id: 'tt-f-bp-7',
      title: 'Relevant Service Policies',
      description: 'Review applicable service policies before paying.',
      icon: 'shield-check',
    },
    {
      id: 'tt-f-bp-8',
      title: 'What the Provider Actually Promises',
      description: 'Review what the provider actually promises before paying.',
      icon: 'sparkles',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-followers-uk',
  title: 'Common Mistakes When Buying TikTok Followers',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-tiktok-likes': {
      title: 'TikTok Likes',
      description:
        'Choose Likes when you want more visible engagement on an eligible public TikTok video.',
      ctaLabel: 'Buy TikTok Likes',
    },
    'buy-tiktok-views': {
      title: 'TikTok Views',
      description:
        'Choose Views when you want to increase the displayed View count on an eligible public TikTok video.',
      ctaLabel: 'Buy TikTok Views',
    },
  },
};

dummy.whyBuy = {
  id: 'stronger-first-impression-tiktok-uk',
  title: 'Build a Stronger First Impression Around Your TikTok Profile',
  description:
    'Someone may discover one of your videos before they ever visit your profile. If they tap through, they may quickly notice profile image, username, bio, follower count, pinned videos, recent uploads, content niche and overall consistency.',
  items: [
    { id: 'tt-f-wb-creators', title: 'For Creators', description: 'Make your niche and content style easy to understand.' },
    { id: 'tt-f-wb-businesses', title: 'For Businesses', description: 'Explain clearly what you sell or provide.' },
    { id: 'tt-f-wb-brands', title: 'For Brands', description: 'Keep your messaging and video direction consistent.' },
    {
      id: 'tt-f-wb-local',
      title: 'For Local Businesses',
      description: 'Make sure viewers can understand the real company behind the profile.',
    },
  ],
  bottomNote: 'Followers can strengthen one visible TikTok metric. Your videos give that number context.',
};

dummy.howToBuy = {
  id: 'how-tiktok-followers-order-works-uk',
  title: 'How Your TikTok Followers Order Works',
  description: 'Compare packages, enter your username, review your order and track the status afterwards.',
  steps: [
    {
      id: 'tt-f-step-1',
      title: 'Choose Your Package',
      description: 'Compare the available follower quantities and current prices.',
    },
    {
      id: 'tt-f-step-2',
      title: 'Enter Your TikTok Username',
      description: 'Provide the exact public username of the profile receiving the Followers.',
    },
    {
      id: 'tt-f-step-3',
      title: 'Review Your Order',
      description: 'Check the username, follower quantity and current package price.',
    },
    {
      id: 'tt-f-step-4',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your TikTok password.',
    },
    {
      id: 'tt-f-step-5',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy TikTok Followers in the UK?',
  text: 'You can buy TikTok Followers in the UK through NovaLikes by selecting an available follower package, entering the correct public TikTok username and completing checkout online. Your TikTok password is not required. Followers apply to the follower count displayed on the selected public profile and are separate from TikTok Likes and Views.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Creators, Businesses and Brands',
    lead: 'TikTok can play a different role depending on the account behind it.',
    paragraphs: [
      'A creator in London may be building content around fashion, beauty, food, entertainment, fitness or education. An ecommerce brand in Manchester may use TikTok around product demonstrations and launches. A local business in Birmingham, Leeds, Glasgow, Liverpool, Bristol or another UK market may use short-form video to show services, products and recent activity. An agency may manage several client accounts with different audiences. An established brand may use TikTok alongside Instagram, ecommerce, search, paid media, email and creator partnerships.',
      'That means follower growth should fit the actual account.',
    ],
    footer: 'The follower count can support the account. The content behind it determines whether people want to stay.',
    items: [
      {
        title: 'Creators',
        body: 'Strengthen the visible audience around a clear niche while continuing to publish videos people have a reason to follow.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Use TikTok around product launches, demonstrations, customer questions and seasonal campaigns.',
      },
      {
        title: 'Local Businesses',
        body: 'Build a stronger profile around genuine services, locations, projects and business activity.',
      },
      {
        title: 'Agencies',
        body: "Choose follower quantities according to each client's profile rather than applying one package everywhere.",
      },
      {
        title: 'Established Brands',
        body: 'Support visible profile presentation while continuing genuine publishing and paid campaigns.',
      },
    ],
  },
  {
    id: 'clear-niche',
    title: 'Build Your Follower Count Around a Clear TikTok Niche',
    lead: 'A stronger TikTok profile usually gives viewers a clear reason to follow. That starts with positioning.',
    footer: 'Follower packages can support visible audience size. A clear niche makes the account easier to understand.',
    items: [
      {
        title: 'Make Your Topic Easy to Recognise',
        body: 'A viewer should quickly understand whether your account is about food, fashion, business, property, fitness, education or another subject.',
      },
      {
        title: 'Develop Repeatable Video Formats',
        body: 'If tutorials, demonstrations, reactions or behind-the-scenes videos genuinely work for your audience, build more around them.',
      },
      {
        title: 'Use Pinned Videos Properly',
        body: 'Pin content that introduces the account, explains what you do or showcases your strongest work.',
      },
      {
        title: 'Keep Recent Content Relevant',
        body: 'A larger follower number has more context when the account contains useful and consistent videos.',
      },
      {
        title: 'Give People a Reason to Return',
        body: 'Your genuine content should show what viewers can expect if they follow.',
      },
    ],
  },
  {
    id: 'uk-campaign-moments',
    title: 'Use TikTok Followers Around Important UK Campaign Moments',
    lead: 'Some periods can bring more attention to your TikTok profile.',
    footer:
      'Follower growth can support profile presentation around these moments. The campaign itself still needs strong videos and a useful reason for people to stay.',
    items: [
      {
        title: 'Black Friday',
        body: 'UK ecommerce and retail brands may have higher-priority TikTok activity around Black Friday campaigns.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use TikTok alongside paid media, email and ecommerce during Cyber Monday.',
      },
      {
        title: 'Boxing Day',
        body: 'Retail and ecommerce brands may have another major promotional period around Boxing Day sales.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Gift ideas, festive products, hospitality content, events and seasonal offers can create important TikTok campaigns.',
      },
      {
        title: 'January Sales',
        body: 'Retail businesses may continue promotional activity into January.',
      },
      {
        title: 'Product Launches',
        body: 'Make sure your strongest product videos are already live before more visitors begin exploring the account.',
      },
      {
        title: 'Creator Collaborations',
        body: 'Partnership content may introduce your profile to an audience seeing it for the first time.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses expanding into another town, city or region can use TikTok to introduce the location, service or team.',
      },
    ],
  },
  {
    id: 'fyp-reach',
    title: 'Followers and For You Page Reach Are Different Things',
    lead: 'TikTok Followers are a profile-level metric. For You feed distribution happens at the content level. A larger follower count should not automatically be treated as a guarantee of:',
    bullets: [
      'For You feed placement',
      'viral videos',
      'more organic Views',
      'additional Likes',
      'more Comments',
      'stronger TikTok Search visibility',
      'customers',
      'leads',
      'sales',
    ],
    paragraphs: [
      'NovaLikes TikTok Followers packages are designed around the follower count displayed on the selected public profile.',
      'TikTok content distribution is a separate outcome. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'videos-worth-watching',
    title: 'Build Followers Around Videos Worth Watching',
    lead: 'Follower count should not become a substitute for content. If long-term TikTok growth matters, continue developing the videos themselves.',
    footer:
      'Purchased Followers change one visible metric. Real viewer behaviour should guide your content strategy.',
    items: [
      { title: 'Get to the Point Quickly', body: 'Help viewers understand the subject early.' },
      {
        title: 'Give the Video a Clear Purpose',
        body: 'Teach, demonstrate, entertain, compare, explain or show something relevant.',
      },
      { title: 'Test Better Openings', body: 'Try different ways to introduce similar topics.' },
      { title: 'Develop Video Series', body: 'Turn genuinely successful subjects into repeatable formats.' },
      { title: 'Learn From Genuine Comments', body: 'Real audience questions can reveal what people want to see next.' },
      {
        title: 'Review TikTok Analytics',
        body: 'Use genuine account performance to understand which videos actually earn attention.',
      },
    ],
  },
  {
    id: 'better-profile',
    title: 'Turn Follower Growth Into a Better TikTok Profile',
    lead: 'If someone discovers a video and visits your profile, make that visit useful.',
    footer: 'Followers can support visible audience size. The profile behind that number determines what happens next.',
    items: [
      { title: 'Keep Your Bio Focused', body: 'Explain who you are or what the profile is about.' },
      { title: 'Pin Strong Videos', body: 'Make your most useful or representative content easier to find.' },
      { title: 'Keep Your Niche Recognisable', body: "Give visitors a reason to understand what they'll get from following." },
      { title: 'Maintain Recent Activity', body: 'A profile with relevant current videos gives more context behind the follower count.' },
      {
        title: 'Give Business Visitors a Next Step',
        body: 'If TikTok supports a business, make it easy for interested viewers to learn more, shop, enquire or visit your website.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'TikTok Followers for UK Local Businesses',
    paragraphs: [
      'TikTok can also support local-business awareness and discovery.',
      'A restaurant may show food preparation or new dishes. A builder may publish project transformations. A salon may showcase completed work. A retailer may demonstrate new products. An estate agency may feature properties. A fitness studio may show classes or training. A tourism business may showcase experiences. A local service provider may answer common customer questions.',
      "If you're growing followers around this type of account, make sure the videos accurately represent the real business.",
    ],
    footer: 'Visible audience size can support presentation. Local trust comes from genuine business activity.',
  },
  {
    id: 'business-proof',
    title: 'Use Followers Alongside Real Business Proof',
    paragraphs: [
      'Follower count can contribute to the visible presence of a business account. It is not the same as genuine customer proof.',
      'UK businesses can build deeper trust with verified customer reviews, authentic testimonials, completed projects, case studies, real customer comments, genuine customer-created content, accurate company information and responsive customer service.',
      'If you have real proof, show it.',
    ],
    footer: 'Followers can support the profile. Customer experience gives people stronger reasons to trust the business behind it.',
  },
  {
    id: 'brand-partnerships',
    title: 'Put Your Follower Count in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about follower count when preparing for collaborations. But professional brands and agencies can evaluate much more than one public number.',
      'They may look at creator niche, content quality, genuine audience fit, authentic engagement, video performance, consistency, previous partnerships, professionalism, communication and campaign results.',
      'If partnerships are part of your goal, strengthen the whole profile. Publish strong videos. Make your niche clear. Keep genuine analytics available where appropriate.',
    ],
    footer: 'Treat follower count as one part of the picture rather than proof of influence by itself.',
  },
  {
    id: 'business-results',
    title: "More TikTok Followers Don't Automatically Mean More Business",
    paragraphs: [
      'A larger follower count can contribute to how established a profile appears. It does not automatically create commercial outcomes.',
      'For a UK business, success might mean online sales, customer enquiries, bookings, website traffic, shop visits, calls, genuine messages or product interest.',
      'Those results depend on more than follower count. Your videos, offer, audience, website and customer experience all matter.',
      'If TikTok has a commercial role in your marketing, measure the actual business outcome separately.',
    ],
  },
  {
    id: 'monetisation',
    title: "Don't Treat Followers as a Shortcut to TikTok Features or Monetisation",
    lead: 'A visible follower count should not be treated as an automatic shortcut to TikTok features or monetisation programmes. Eligibility may depend on multiple requirements beyond one public metric. Do not assume a follower order will automatically:',
    bullets: [
      'qualify an account for monetisation',
      'unlock TikTok features',
      'create eligible video performance',
      'guarantee LIVE access',
      'improve account standing',
      'produce revenue',
    ],
    paragraphs: [
      'If a particular TikTok feature or programme matters to you, check its current official eligibility requirements.',
      'Use NovaLikes Followers for the visible follower metric described by the service.',
    ],
  },
  {
    id: 'organic-growth',
    title: 'Understand Purchased Followers and Organic Growth as Different Outcomes',
    paragraphs: [
      'Buying TikTok Followers changes the visible follower count on the selected eligible profile. Organic TikTok growth is different. Organic Followers come from genuine users choosing to follow because of your videos, profile or brand.',
      'Keep those outcomes separate when evaluating performance. Use your genuine TikTok analytics to understand real video performance, organic follower activity, audience behaviour, genuine Comments, Shares and profile activity.',
      'Purchased Followers should not automatically be presented as organic audience growth.',
    ],
  },
  {
    id: 'platform-rules',
    title: 'TikTok Platform Rules and Third-Party Engagement Services',
    paragraphs: [
      "TikTok's current Community Guidelines prohibit fake engagement and the trade or marketing of services designed to artificially increase engagement.",
      'That means third-party follower services should not be described as TikTok-approved, risk-free or guaranteed safe. TikTok may remove inauthentically inflated metrics and can take enforcement action under its platform rules.',
      "If platform compliance or account risk is important to you, review TikTok's current Community Guidelines before ordering any third-party engagement service.",
      'NovaLikes should be evaluated for the metric and buying process it actually provides, not as an official TikTok growth programme.',
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical TikTok Growth Framework for UK Accounts',
    lead: 'Follower count works best as one part of a wider TikTok strategy.',
    footer:
      'Visible audience size can support profile presentation. Long-term growth still depends on the content and genuine audience behind it.',
    items: [
      { title: 'Define Your Niche', body: 'Make your content direction easy to understand.' },
      { title: 'Build a Strong Video Base', body: 'Give new profile visitors multiple relevant videos to explore.' },
      { title: 'Develop Repeatable Formats', body: 'Turn good content ideas into recurring video series.' },
      { title: 'Keep Testing', body: 'Experiment with openings, topics, pacing and presentation.' },
      { title: 'Review Genuine Analytics', body: 'Use actual TikTok performance to understand viewer behaviour.' },
      { title: 'Reply to Real People', body: 'Genuine comments and questions can improve both community and future content.' },
      {
        title: 'Connect TikTok to Wider Marketing',
        body: 'UK businesses may use TikTok alongside Instagram, ecommerce, SEO, Google Ads, paid social, email and their website.',
      },
      {
        title: 'Keep Followers in Perspective',
        body: 'Visible audience size can support profile presentation. Long-term growth still depends on the content and genuine audience behind it.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-followers'] = {
  title: 'Buy TikTok Followers UK | Grow Your Profile | NovaLikes',
  description:
    'Buy TikTok followers in the UK with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukTtFollowersFaqs = [
  {
    id: 'uk-tt-f-where-buy',
    question: 'Where can I buy TikTok Followers in the UK?',
    answer:
      'You can buy TikTok Followers in the UK through NovaLikes. Choose an available follower package, submit the correct public TikTok username and complete checkout without sharing your password.',
  },
  {
    id: 'uk-tt-f-get-more',
    question: 'How can I get more TikTok Followers in the UK?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public TikTok profile. For organic growth, continue publishing relevant videos and reviewing genuine audience behaviour through TikTok analytics.',
  },
  {
    id: 'uk-tt-f-cheap',
    question: 'Can I buy cheap TikTok Followers in the UK?',
    answer:
      'NovaLikes offers multiple follower quantities so you can compare current package sizes and prices. When comparing lower-cost services, also review password requirements, tracking, support, platform rules and what the package actually changes.',
  },
  {
    id: 'uk-tt-f-real',
    question: 'What are real TikTok Followers?',
    answer:
      '"Real TikTok Followers" can mean different things depending on the provider. Review the actual service details rather than relying only on that phrase. NovaLikes follower packages are designed to increase the visible follower count on the eligible submitted profile.',
  },
  {
    id: 'uk-tt-f-how-many',
    question: 'How many TikTok Followers should I buy?',
    answer:
      'There is no single ideal quantity for every account. Consider your current follower count, profile activity, content base and the increase you actually want before selecting a package.',
  },
  {
    id: 'uk-tt-f-password',
    question: 'Do I need my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access.',
  },
  {
    id: 'uk-tt-f-info',
    question: 'What information do I need?',
    answer: 'You need the correct public TikTok username and the follower package you want to purchase.',
  },
  {
    id: 'uk-tt-f-cost',
    question: 'How much does it cost to buy TikTok Followers in the UK?',
    answer:
      'Pricing depends on the follower quantity you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'uk-tt-f-delivery',
    question: 'How long does it take to get TikTok Followers?',
    answer:
      'Processing time can vary depending on the selected follower quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-tt-f-views',
    question: 'Will buying TikTok Followers increase my Views?',
    answer: 'Not automatically. TikTok Views are a separate video-level metric and service.',
  },
  {
    id: 'uk-tt-f-likes',
    question: 'Will buying Followers increase my Likes?',
    answer: 'Not automatically. TikTok Likes are a separate content-level metric.',
  },
  {
    id: 'uk-tt-f-fyp',
    question: 'Will buying TikTok Followers help me reach the For You feed?',
    answer: "There is no guarantee. Follower count and TikTok's content recommendation systems are separate.",
  },
  {
    id: 'uk-tt-f-viral',
    question: 'Will buying TikTok Followers make my videos viral?',
    answer:
      'There is no guarantee. A follower package changes the visible follower count, not the organic distribution of individual videos.',
  },
  {
    id: 'uk-tt-f-monetisation',
    question: 'Will purchased Followers qualify me for TikTok monetisation?',
    answer:
      'Do not assume purchased Followers will qualify an account for monetisation or other TikTok features. Review the current official eligibility requirements for the specific programme.',
  },
  {
    id: 'uk-tt-f-platform-rules',
    question: 'Does TikTok allow fake or artificial engagement?',
    answer:
      "TikTok's Community Guidelines prohibit fake engagement and services designed to artificially boost engagement. Review TikTok's current rules before using third-party engagement services.",
  },
  {
    id: 'uk-tt-f-risk-free',
    question: 'Is buying TikTok Followers risk-free?',
    answer:
      'No third-party follower service should be described as completely risk-free or TikTok-approved. Platform policies and enforcement can change, so review the current TikTok rules before ordering.',
  },
  {
    id: 'uk-tt-f-business',
    question: 'Can UK businesses buy TikTok Followers?',
    answer:
      'Eligible public TikTok profiles used by UK businesses, creators, brands and agencies can use the relevant NovaLikes follower packages.',
  },
  {
    id: 'uk-tt-f-local',
    question: 'Can local businesses use TikTok Followers packages?',
    answer:
      'Yes. Eligible public profiles used by local businesses can use follower packages. Keep the real business information and content accurate alongside your TikTok strategy.',
  },
  {
    id: 'uk-tt-f-client',
    question: 'Can I order TikTok Followers for a client?',
    answer:
      "If you're authorised to purchase services for an eligible client profile, submit the correct public TikTok username and review the order details carefully.",
  },
  {
    id: 'uk-tt-f-wrong-username',
    question: 'What happens if I submit the wrong username?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the public username before completing checkout.',
  },
  {
    id: 'uk-tt-f-track',
    question: 'Can I track my TikTok Followers order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-tt-f-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukTtFollowersFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom TikTok Followers content from supplied copy.');
