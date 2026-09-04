/**
 * Apply supplied Australia TikTok Followers copy.
 * Run: npx tsx scripts/patch-au-tiktok-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AU = '/au';
const file = path.join(process.cwd(), 'content/markets/au/services/buy-tiktok-followers.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const dummy = data.dummy as Record<string, unknown>;
const config = dummy.config as Record<string, unknown>;

const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;

function auHref(href: string): string {
  if (href.startsWith('/buy-')) return `${AU}${href}`;
  return href;
}

content.seo = {
  title: 'Buy TikTok Followers Australia | Grow Your Profile | NovaLikes',
  description:
    'Buy TikTok followers in Australia with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR AUSTRALIA';
hero.title = 'Buy TikTok Followers in Australia and Build a Stronger Profile';
hero.description =
  "Build a stronger visible audience around the TikTok profile you're already growing. NovaLikes gives Australian creators, businesses, brands and agencies a simple way to buy TikTok followers without sharing account login details. Choose a follower package that fits your profile, enter your public TikTok username and complete your order online. Whether you're starting a creator account, building a business presence, preparing for a launch or strengthening an established profile, choose a follower increase that makes sense for where your account is today.";
hero.primaryCta = { label: 'Choose Your TikTok Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-f-trust-public', label: 'Public Username Only' },
  { id: 'tt-f-trust-password', label: 'No Password Required' },
  { id: 'tt-f-trust-pricing', label: 'Clear Pricing' },
  { id: 'tt-f-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a TikTok Followers Package That Fits Your Account';
pricing.description =
  'Different TikTok profiles need different follower quantities. NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Followers. A newer creator may want to start smaller. An established brand or active business profile may choose a larger increase. Before deciding, consider your current follower count, how active the account is, what you\'re building and the increase you actually want instead of automatically selecting the biggest package available.';
pricing.primaryCtaLabel = 'Compare TikTok Followers Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'au-tt-f-where-buy',
  'au-tt-f-get-more',
  'au-tt-f-cheap',
  'au-tt-f-real',
  'au-tt-f-how-many',
  'au-tt-f-password',
  'au-tt-f-info',
  'au-tt-f-cost',
  'au-tt-f-delivery',
  'au-tt-f-views',
  'au-tt-f-likes',
  'au-tt-f-fyp',
  'au-tt-f-monetisation',
  'au-tt-f-risk',
  'au-tt-f-business',
  'au-tt-f-local',
  'au-tt-f-client',
  'au-tt-f-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Build the TikTok Profile Behind the Follower Count';
finalCta.description =
  'Choose the TikTok follower package that fits your account, submit your public username and place your order without sharing your login details. Then keep strengthening what makes the number matter: a clear niche, videos worth watching, genuine audience interaction and a profile people have a reason to follow.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Followers Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-followers-australia',
  title: 'Why Choose NovaLikes for TikTok Followers?',
  description: 'Buying TikTok followers should be straightforward from package selection through order tracking.',
  items: [
    {
      id: 'tt-f-wc-password',
      title: 'No TikTok Password Required',
      description:
        'NovaLikes does not need your TikTok password, verification codes or private login access.',
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
      title: 'Flexible Package Sizes',
      description:
        'Choose the follower quantity that fits your account instead of paying for one fixed option.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the available package quantity and current price before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'tt-f-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes order tracking afterward for available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'tt-f-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order information.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'grow-tiktok-without-login-australia',
  title: 'Grow Your TikTok Profile Without Sharing Your Login',
  description:
    'You should not need to hand over control of your TikTok account to place a follower order. NovaLikes uses the public profile information requested during checkout.',
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
    'Before ordering, search the username yourself and confirm that it belongs to the exact account you want to use.',
};

config.doesBuyingHelp = {
  id: 'real-tiktok-followers-australia',
  title: 'Looking for “Real TikTok Followers”? Check the Service Behind the Label',
  description:
    '"Real TikTok followers" is a common phrase used when comparing follower providers. You may also see terms such as high-quality TikTok followers, active TikTok followers or organic TikTok followers. Different providers may use these terms differently.',
  helpTitle: 'Before ordering, ask',
  helpItems: [
    'What metric changes?',
    'How many Followers are included?',
    'Which profile receives them?',
    'What information do I provide?',
    'What does the service actually guarantee?',
  ],
  limitTitle: 'What NovaLikes TikTok Follower Packages Do',
  limitItems: [
    'Increase the follower count displayed on the eligible public profile submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Views, Likes, FYP distribution, customers or sales. Clear service expectations are more useful than an undefined marketing label.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-followers-order-australia',
  title: 'What Happens After You Place an Order?',
  description:
    'After checkout, your selected follower package and public TikTok username are connected to the purchase. The order is then processed for the intended profile.',
  steps: [
    {
      id: 'tt-f-th-1',
      title: 'Keep the Profile Accessible',
      description:
        'The submitted TikTok profile should remain publicly accessible where required during processing.',
    },
    {
      id: 'tt-f-th-2',
      title: 'Avoid Changing Your Username',
      description: 'Changing the submitted username while an order is active may interfere with processing.',
    },
    {
      id: 'tt-f-th-3',
      title: 'Check the Account Before Paying',
      description: 'Make sure the username belongs to the profile you actually want to use.',
    },
    {
      id: 'tt-f-th-4',
      title: 'Follow the Order Status',
      description:
        'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available updates instead of assuming every package follows one fixed timeline.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'tiktok-followers-likes-views-australia',
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
    href: auHref('/buy-tiktok-likes'),
    ctaLabel: 'Buy TikTok Likes',
  },
  views: {
    title: 'TikTok Views',
    description: 'View count displayed on an eligible public video',
    bestFor: 'Video view count',
    href: auHref('/buy-tiktok-views'),
    ctaLabel: 'Buy TikTok Views',
  },
  combinedNote:
    'Choose Followers for visible profile audience size. Choose Likes for individual videos. Choose Views for video count. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-followers-australia',
  title: 'Before You Buy TikTok Followers in Australia',
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
      description: 'Review how many Followers are included in the selected package.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-bb-price',
      title: 'Confirm the Price',
      description: 'Make sure the package and current price match what you intended to purchase.',
      icon: 'credit-card',
    },
    {
      id: 'tt-f-bb-public',
      title: 'Keep the Profile Accessible',
      description: 'Keep the submitted TikTok account publicly accessible where required.',
      icon: 'shield-check',
    },
    {
      id: 'tt-f-bb-username-change',
      title: 'Avoid Username Changes',
      description: 'Changing your username during an active order may interfere with processing.',
      icon: 'lock',
    },
    {
      id: 'tt-f-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your TikTok login details.',
      icon: 'headphones',
    },
    {
      id: 'tt-f-bb-metric',
      title: 'Choose the Right TikTok Service',
      description: 'Followers, Likes and Views are separate metrics.',
      icon: 'megaphone',
    },
    {
      id: 'tt-f-bb-policies',
      title: 'Review the Policies',
      description: 'Read the applicable service and refund information before checkout.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'measure-tiktok-growth-beyond-followers-australia',
  title: 'Measure TikTok Growth Beyond Your Follower Count',
  description:
    'Follower count tells you one thing about a TikTok profile. It does not tell you whether your content strategy is working. Use genuine TikTok performance data to look at:',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased followers change one visible metric. Your real analytics should guide your long-term TikTok decisions.',
  cards: [
    {
      id: 'tt-f-ww-views',
      title: 'Video Views',
      description: 'Which videos actually attract organic attention?',
      icon: 'clapperboard',
    },
    {
      id: 'tt-f-ww-watch',
      title: 'Watch Behaviour',
      description: 'Are genuine viewers staying with your content?',
      icon: 'heart',
    },
    {
      id: 'tt-f-ww-shares',
      title: 'Shares and Comments',
      description: 'Which topics encourage real interaction?',
      icon: 'users',
    },
    {
      id: 'tt-f-ww-profile',
      title: 'Profile Activity',
      description: 'Are people moving from individual videos to your profile?',
      icon: 'briefcase',
    },
    {
      id: 'tt-f-ww-organic',
      title: 'Organic Follower Growth',
      description: 'Which content genuinely convinces people to follow?',
      icon: 'megaphone',
    },
    {
      id: 'tt-f-ww-business',
      title: 'Business Results',
      description:
        "If you're a business, is TikTok contributing to enquiries, sales or another useful outcome?",
      icon: 'map-pin',
    },
  ],
};

config.packageSizes = {
  id: 'choose-tiktok-followers-package-australia',
  title: 'Choose a TikTok Followers Package That Fits Your Account',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Followers. A newer creator may want to start smaller. An established brand or active business profile may choose a larger increase.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'tt-f-ps-count',
      quantity: 'Your Current Follower Count',
      recommendedFor: 'Start with the audience size already displayed on your TikTok profile.',
    },
    {
      id: 'tt-f-ps-active',
      quantity: 'How Active the Account Is',
      recommendedFor:
        'A profile with recent videos, a clear niche and consistent activity gives more context behind the follower number.',
    },
    {
      id: 'tt-f-ps-building',
      quantity: "What You're Building",
      recommendedFor:
        'A creator account, local business, ecommerce brand and agency-managed profile can all have different goals.',
    },
    {
      id: 'tt-f-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on your account instead of automatically selecting the biggest package available.',
    },
  ],
  bottomNote: 'Compare TikTok Followers Packages',
};

config.bestPractices = {
  id: 'affordable-tiktok-followers-australia',
  title: 'Looking for Affordable TikTok Followers in Australia?',
  description:
    "If you're searching for cheap TikTok followers in Australia, price will naturally be part of your decision. Look beyond the cheapest package.",
  closingNote:
    'An affordable TikTok followers package should make these basics easy to understand before checkout. NovaLikes lets you compare available quantities and pricing before choosing.',
  items: [
    {
      id: 'tt-f-bp-1',
      title: 'Follower Quantity',
      description: 'Check how many followers are included in the package.',
      icon: 'users',
    },
    {
      id: 'tt-f-bp-2',
      title: 'Current Package Price',
      description: 'Review pricing before checkout.',
      icon: 'credit-card',
    },
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
    {
      id: 'tt-f-bp-5',
      title: 'Order Tracking',
      description: 'Check whether status updates are available after checkout.',
      icon: 'map-pin',
    },
    {
      id: 'tt-f-bp-6',
      title: 'Customer Support',
      description: 'Support should be available if you need help.',
      icon: 'headphones',
    },
    {
      id: 'tt-f-bp-7',
      title: 'Purchase Policies',
      description: 'Review what the provider actually promises before paying.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-followers-australia',
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
  id: 'stronger-first-impression-tiktok-australia',
  title: 'Build a Stronger First Impression Around Your TikTok Profile',
  description:
    'When someone discovers one of your videos and opens your profile, they may quickly look at your follower count, profile image, username, bio, pinned videos, recent content, total activity, content niche and overall consistency. A larger follower count can strengthen one part of that first impression. But the account behind the number still needs to make sense.',
  items: [
    {
      id: 'tt-f-wb-creators',
      title: 'For Creators',
      description: 'Make your niche obvious.',
    },
    {
      id: 'tt-f-wb-businesses',
      title: 'For Businesses',
      description: 'Make it easy to understand what you sell or provide.',
    },
    {
      id: 'tt-f-wb-brands',
      title: 'For Brands',
      description: 'Keep your videos and profile positioning consistent.',
    },
    {
      id: 'tt-f-wb-agencies',
      title: 'For Agencies',
      description:
        'Make sure the account has enough quality content to support the profile you\'re building.',
    },
  ],
  bottomNote:
    'Follower growth can strengthen visible audience size. Your profile gives that number context.',
};

dummy.howToBuy = {
  id: 'how-tiktok-followers-order-works-australia',
  title: 'How Your TikTok Followers Order Works',
  description: 'Compare packages, enter your username, review the details and track your order afterward.',
  steps: [
    {
      id: 'tt-f-step-1',
      title: 'Choose Your Package',
      description: 'Compare the available follower quantities and current pricing.',
    },
    {
      id: 'tt-f-step-2',
      title: 'Enter Your TikTok Username',
      description: 'Provide the exact public username of the profile receiving the followers.',
    },
    {
      id: 'tt-f-step-3',
      title: 'Review Your Details',
      description: 'Check the account, follower quantity and package price before paying.',
    },
    {
      id: 'tt-f-step-4',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your TikTok password.',
    },
    {
      id: 'tt-f-step-5',
      title: 'Track the Order',
      description: 'Use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy TikTok Followers in Australia?',
  text: 'You can buy TikTok followers in Australia through NovaLikes by choosing an available follower package, entering the correct public TikTok username and completing checkout online. Your TikTok password is not required. The service increases the follower count displayed on the selected profile and is separate from TikTok Likes and Views.',
};

dummy.storySections = [
  {
    id: 'built-for-australia',
    title: 'Built for Australian Creators, Businesses and Brands',
    lead: 'TikTok plays a different role depending on who is using it.',
    paragraphs: [
      'An Australian creator may be building an audience around fashion, fitness, gaming, food, education or another niche. An ecommerce business may use TikTok to demonstrate products and support new releases. A local business in Sydney, Melbourne, Brisbane, Perth, Adelaide or another Australian market may use short-form video to show its services, location or work. A brand may use TikTok as part of a wider launch involving Instagram, paid media, email and its website. An agency may manage several client accounts with completely different objectives.',
      'That means follower growth should fit the account.',
    ],
    footer: 'The follower count is one part of the profile. What people find after they arrive still matters.',
    items: [
      {
        title: 'Creators',
        body: 'Strengthen the visible audience around a profile while continuing to develop your niche and content library.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Use TikTok alongside product videos, launches, demonstrations and campaign content.',
      },
      {
        title: 'Local Businesses',
        body: 'Build a profile that helps potential customers understand the business behind the videos.',
      },
      {
        title: 'Agencies',
        body: 'Choose follower quantities based on individual client accounts instead of applying one package to every campaign.',
      },
      {
        title: 'Established Brands',
        body: 'Support profile presentation while continuing genuine content, advertising and audience activity.',
      },
    ],
  },
  {
    id: 'clear-niche',
    title: 'Build Follower Growth Around a Clear TikTok Niche',
    lead: 'A strong TikTok profile usually gives people a reason to understand what they\'ll get by following it.',
    footer:
      'Follower packages can support audience size. A clear niche makes the profile easier to understand.',
    items: [
      {
        title: 'Make Your Subject Clear',
        body: 'A viewer should quickly understand whether your account is about food, beauty, business, fashion, gaming, property, fitness, education or another topic.',
      },
      {
        title: 'Develop Repeatable Formats',
        body: 'If tutorials, reactions, demonstrations, comparisons or behind-the-scenes videos genuinely work for your audience, build more around them.',
      },
      {
        title: 'Use Pinned Videos Strategically',
        body: 'Pin content that introduces the profile, demonstrates strong work or explains something important.',
      },
      {
        title: 'Keep Recent Content Relevant',
        body: 'A larger follower number has less context when the account contains very little useful content.',
      },
      {
        title: 'Give People a Reason to Return',
        body: 'Your genuine content should communicate what someone can expect if they follow the profile.',
      },
    ],
  },
  {
    id: 'stronger-presence',
    title: 'Turn Follower Growth Into a Stronger TikTok Presence',
    lead: 'A follower count works best when the rest of the profile gives people something useful to explore.',
    footer:
      'Followers can strengthen the visible size of your TikTok profile. Good profile management makes that audience number more meaningful.',
    items: [
      { title: 'Keep Your Bio Focused', body: 'Use the limited profile space to explain who you are or what the account is about.' },
      { title: 'Pin Your Strongest Videos', body: 'Help new profile visitors find your best or most useful content quickly.' },
      {
        title: 'Publish Consistently With Purpose',
        body: 'Consistency does not mean posting random videos every day. Build content around a clear reason.',
      },
      {
        title: 'Keep Your Visual Identity Recognisable',
        body: 'For brands and businesses, videos should still feel connected to the company behind them.',
      },
      {
        title: 'Give Viewers a Next Step',
        body: 'A business account may want genuine viewers to explore a product, website or other useful destination.',
      },
    ],
  },
  {
    id: 'campaign-moments',
    title: 'Use TikTok Follower Growth Around Important Australian Campaigns',
    lead: 'Some periods bring more attention to a TikTok profile than others.',
    footer:
      'Follower growth can support the presentation around these moments. The real campaign still needs quality content, accurate information and a clear offer.',
    items: [
      {
        title: 'New Brand Launches',
        body: 'Build a useful base of videos before sending more campaign attention toward a new profile.',
      },
      {
        title: 'Product Releases',
        body: 'Make sure your product demonstrations and launch content are already live when people begin exploring the account.',
      },
      {
        title: 'Boxing Day and Holiday Campaigns',
        body: 'Australian ecommerce and retail brands may have higher-priority TikTok activity around major shopping periods.',
      },
      {
        title: 'Summer Campaigns',
        body: 'Travel, hospitality, fashion, fitness and outdoor businesses may have particularly relevant content during Australia\'s summer season.',
      },
      {
        title: 'Creator Collaborations',
        body: 'A partnership can introduce new viewers to both profiles involved.',
      },
      {
        title: 'Local Business Launches',
        body: 'New venues, locations or services may use TikTok alongside other local marketing channels.',
      },
    ],
  },
  {
    id: 'fyp-reach',
    title: 'Followers and For You Page Reach Are Different Things',
    lead: 'A TikTok follower count is a profile-level metric. For You Page distribution happens at the video level. That distinction matters.',
    bullets: [
      'reach the For You Page',
      'make a video viral',
      'increase organic Views',
      'create more Likes',
      'improve every future video\'s reach',
      'rank in TikTok Search',
      'generate customers',
      'produce sales',
    ],
    paragraphs: [
      'NovaLikes follower packages are designed to increase the follower count displayed on the selected profile.',
      'TikTok decides how content is recommended using separate signals and its own systems. Use Followers for the metric they actually change.',
    ],
  },
  {
    id: 'videos-worth-watching',
    title: 'Build Followers Around Videos People Would Actually Want to Watch',
    lead: 'Follower count should not become a replacement for content.',
    footer:
      'Purchased Followers change one visible profile metric. Real viewer behaviour should guide the content strategy.',
    items: [
      { title: 'Get to the Point Quickly', body: 'Short-form viewers should understand what the video is about without waiting too long.' },
      { title: 'Make the Content Useful or Interesting', body: 'Demonstrate, teach, entertain, explain, compare or show something relevant.' },
      { title: 'Develop Stronger Openings', body: 'Test different ways to introduce your subject.' },
      { title: 'Build Series', body: 'If genuine viewers respond well to one topic, develop related videos rather than relying only on one-off ideas.' },
      { title: 'Learn From Genuine Comments', body: 'Real audience questions can reveal what people want to see next.' },
      { title: 'Review TikTok Analytics', body: 'Use genuine account performance to understand which videos actually earn attention.' },
    ],
  },
  {
    id: 'brand-partnerships',
    title: 'Put Your Follower Count in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about their follower count when preparing for partnerships. But serious brands and agencies can evaluate much more than one number.',
      'They may also look at creator niche, content quality, genuine audience fit, real engagement, consistency, previous collaborations, professionalism, communication and campaign results.',
      'If partnerships are one of your goals, make the entire profile stronger. Use your best content. Keep your positioning clear. Use genuine analytics where relevant. And treat follower count as one signal rather than proof of influence by itself.',
    ],
  },
  {
    id: 'local-businesses',
    title: 'TikTok Followers for Australian Local Businesses',
    paragraphs: [
      'TikTok can also work as a discovery and content channel for local businesses. A restaurant might show dishes or behind-the-scenes activity. A builder may publish project transformations. A salon might showcase completed work. A real estate business may feature properties. A retailer might demonstrate new stock. A tourism company may show destinations or experiences. A local service business may explain its process.',
      "If you're building followers around this type of account, make sure the profile and videos accurately represent the actual business.",
    ],
    footer: 'Visible audience size can support presentation. Local trust comes from the business behind the content.',
  },
  {
    id: 'business-results',
    title: "More TikTok Followers Don't Automatically Mean More Business",
    lead: 'A larger follower number can contribute to how established a TikTok profile looks. It does not automatically create commercial results.',
    footer:
      "If you're using TikTok commercially, measure the business result you actually care about rather than treating follower count as the final goal.",
    items: [
      { title: 'Website Visits', body: 'Are people moving from TikTok to your site?' },
      { title: 'Enquiries and Messages', body: 'Are genuine viewers contacting the business?' },
      { title: 'Store Visits and Bookings', body: 'Does the profile support real-world customer action?' },
      { title: 'Product Sales', body: 'Is TikTok contributing to purchases or product interest?' },
      { title: 'Brand Awareness', body: 'Is the account helping people understand what the business does?' },
    ],
  },
  {
    id: 'monetisation',
    title: "Don't Treat Purchased Followers as a Shortcut to Monetisation",
    lead: 'TikTok features and monetisation programs can have eligibility requirements that go beyond a visible follower number. Those requirements can change over time.',
    bullets: [
      'qualify an account for monetisation',
      'unlock TikTok features',
      'satisfy Creator Rewards requirements',
      'improve account standing',
      'create qualified views',
      'guarantee LIVE access',
    ],
    paragraphs: [
      "If monetisation or feature eligibility matters to you, check TikTok's current official requirements.",
      'Use a NovaLikes follower package for the visible follower metric described by the service.',
    ],
  },
  {
    id: 'platform-rules',
    title: "Understand TikTok's Rules Around Artificial Engagement",
    paragraphs: [
      'TikTok has rules against fake or artificially increased engagement, including services that sell followers or Likes. That means no third-party follower provider should promise that purchasing followers is officially supported by TikTok or completely free of platform-policy risk.',
      'If you decide to use a follower service, keep your TikTok password private, understand exactly which metric you\'re purchasing, don\'t treat followers as guaranteed FYP reach, don\'t confuse purchased followers with organic audience growth, continue building genuine content and review TikTok\'s current platform rules yourself.',
    ],
    footer: 'Clear expectations are more useful than a “100% safe” claim.',
  },
  {
    id: 'growth-framework',
    title: 'A Practical TikTok Growth Framework for Australian Accounts',
    lead: 'Follower count works best as one part of a broader profile strategy.',
    footer:
      'Visible audience size can support the profile. Long-term growth still depends on content and genuine audience behaviour.',
    items: [
      { title: 'Define Your Niche', body: 'Make it clear what type of content the account is built around.' },
      { title: 'Build a Content Base', body: 'Give new visitors several useful videos to explore.' },
      { title: 'Develop Repeatable Formats', body: 'Turn genuine successful ideas into content series.' },
      { title: 'Keep Testing', body: 'Experiment with hooks, subjects and video structures.' },
      { title: 'Review Genuine Analytics', body: 'Use actual performance data to understand what real viewers respond to.' },
      { title: 'Reply to Your Audience', body: 'Real comments and questions can improve both content and community.' },
      {
        title: 'Connect TikTok to Wider Marketing',
        body: 'For Australian businesses, TikTok may work alongside Instagram, SEO, paid media, ecommerce, email and your website.',
      },
      {
        title: 'Keep Followers in Perspective',
        body: 'Visible audience size can support the profile. Long-term growth still depends on content and genuine audience behaviour.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/au/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-followers'] = {
  title: 'Buy TikTok Followers Australia | Grow Your Profile | NovaLikes',
  description:
    'Buy TikTok followers in Australia with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/au/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const auTtFollowersFaqs = [
  {
    id: 'au-tt-f-where-buy',
    question: 'Where can I buy TikTok followers in Australia?',
    answer:
      'You can buy TikTok followers in Australia through NovaLikes. Choose an available follower package, enter the correct public TikTok username and complete checkout without sharing your password.',
  },
  {
    id: 'au-tt-f-get-more',
    question: 'How can I get more TikTok followers in Australia?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public TikTok profile. For organic growth, continue publishing relevant videos, developing a clear niche and reviewing genuine audience behaviour through TikTok analytics.',
  },
  {
    id: 'au-tt-f-cheap',
    question: 'Can I buy cheap TikTok followers in Australia?',
    answer:
      'NovaLikes offers multiple follower package sizes so you can compare quantities and current prices. When comparing cheaper options, also consider password requirements, tracking, support and what the service actually promises.',
  },
  {
    id: 'au-tt-f-real',
    question: 'What are real TikTok followers?',
    answer:
      '"Real TikTok followers" can mean different things depending on the provider. Review the exact service details rather than relying only on that phrase. NovaLikes follower packages are designed to increase the follower count displayed on the submitted eligible profile.',
  },
  {
    id: 'au-tt-f-how-many',
    question: 'How many TikTok followers should I buy?',
    answer:
      'There is no single ideal number for every profile. Consider your existing follower count, account activity, niche and the increase you actually want before selecting a package.',
  },
  {
    id: 'au-tt-f-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access.',
  },
  {
    id: 'au-tt-f-info',
    question: 'What information do I need?',
    answer:
      'You need the correct public TikTok username and the follower package you want to purchase.',
  },
  {
    id: 'au-tt-f-cost',
    question: 'How much does it cost to buy TikTok followers in Australia?',
    answer:
      'Pricing depends on the follower quantity you select. NovaLikes displays the current package pricing before checkout.',
  },
  {
    id: 'au-tt-f-delivery',
    question: 'How long does it take to get TikTok followers?',
    answer:
      'Processing time can vary depending on the package size and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'au-tt-f-views',
    question: 'Will buying TikTok followers increase my Views?',
    answer: 'Not automatically. Followers and Views are separate TikTok metrics and separate NovaLikes services.',
  },
  {
    id: 'au-tt-f-likes',
    question: 'Will buying TikTok followers increase my Likes?',
    answer: 'Not automatically. TikTok Likes is a separate content-level service.',
  },
  {
    id: 'au-tt-f-fyp',
    question: 'Will buying followers help me reach the For You Page?',
    answer: 'There is no guarantee. TikTok follower count and FYP distribution are different things.',
  },
  {
    id: 'au-tt-f-monetisation',
    question: 'Will purchased followers qualify me for TikTok monetisation?',
    answer:
      "Do not assume purchased followers qualify an account for TikTok monetisation or specific platform features. Check TikTok's current official eligibility requirements.",
  },
  {
    id: 'au-tt-f-risk',
    question: 'Is buying TikTok followers completely risk-free?',
    answer:
      'No third-party engagement provider should promise zero platform-policy risk. TikTok prohibits fake and artificially increased engagement, including selling followers or Likes.',
  },
  {
    id: 'au-tt-f-business',
    question: 'Can Australian businesses buy TikTok followers?',
    answer:
      'Eligible public profiles used by Australian businesses, creators, brands, agencies and other supported accounts can use NovaLikes follower packages.',
  },
  {
    id: 'au-tt-f-local',
    question: 'Can local businesses use TikTok follower packages?',
    answer:
      'Yes, provided the business uses an eligible public TikTok account. Keep the profile and business information accurate alongside your follower strategy.',
  },
  {
    id: 'au-tt-f-client',
    question: 'Can I order TikTok followers for a client?',
    answer:
      "If you're authorised to purchase services for an eligible client account, submit the correct public TikTok username and review the order details carefully.",
  },
  {
    id: 'au-tt-f-track',
    question: 'Can I track my TikTok followers order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('au-tt-f-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...auTtFollowersFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Australia TikTok Followers content from supplied copy.');
