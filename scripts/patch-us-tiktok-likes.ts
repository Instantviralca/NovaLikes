/**
 * Apply supplied United States TikTok Likes copy.
 * Run: npx tsx scripts/patch-us-tiktok-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const US = '/us';
const file = path.join(process.cwd(), 'content/markets/us/services/buy-tiktok-likes.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const dummy = data.dummy as Record<string, unknown>;
const config = dummy.config as Record<string, unknown>;

const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;

function usHref(href: string): string {
  if (href.startsWith('/buy-')) return `${US}${href}`;
  return href;
}

content.seo = {
  title: 'Buy TikTok Likes USA | Likes for Videos | NovaLikes',
  description:
    'Buy TikTok likes in the USA for public videos. Compare flexible packages, order without sharing your password and track your TikTok likes order online.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR THE USA';
hero.title = 'Buy TikTok Likes in the USA and Strengthen Video Engagement';
hero.description =
  "Put more visible engagement behind the TikTok videos that matter most. NovaLikes gives creators, businesses, brands and agencies across the United States a straightforward way to buy TikTok Likes for eligible public videos without sharing account login details. Choose the number of Likes you want, submit the exact public TikTok video link and complete your order online. Whether you're supporting a product launch, creator collaboration, campaign video, business showcase or an important piece of evergreen content, choose your Likes package around the video you're actually trying to strengthen.";
hero.primaryCta = { label: 'Choose Your TikTok Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-l-trust-public', label: 'Public Video Link Only' },
  { id: 'tt-l-trust-password', label: 'No Password Required' },
  { id: 'tt-l-trust-pricing', label: 'Clear Pricing' },
  { id: 'tt-l-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a TikTok Likes Package That Fits the Video';
pricing.description =
  'Different TikTok videos have different purposes. NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Likes. A regular video may only need a smaller increase. A launch video, collaboration or priority campaign asset may justify something larger. Before choosing, consider the current Like count, the importance of the content, your account size and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare TikTok Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'us-tt-l-where-buy',
  'us-tt-l-get-more',
  'us-tt-l-cheap',
  'us-tt-l-real',
  'us-tt-l-how-many',
  'us-tt-l-password',
  'us-tt-l-info',
  'us-tt-l-cost',
  'us-tt-l-delivery',
  'us-tt-l-views',
  'us-tt-l-followers',
  'us-tt-l-fyp',
  'us-tt-l-viral',
  'us-tt-l-business',
  'us-tt-l-local',
  'us-tt-l-client',
  'us-tt-l-wrong-url',
  'us-tt-l-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Put More Likes Behind the TikTok Videos That Matter';
finalCta.description =
  'Choose the video you want to support, select a TikTok Likes package that fits the content and submit the correct public video link without sharing your login details. Then keep strengthening what the Like count cannot replace: videos worth watching, genuine audience interaction and a TikTok presence people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-likes-usa',
  title: 'Why Choose NovaLikes for TikTok Likes?',
  description: 'Buying TikTok Likes should be easy to understand before checkout.',
  items: [
    {
      id: 'tt-l-wc-video',
      title: 'Likes for Individual Videos',
      description: 'Your order applies to the eligible public TikTok video connected to the link you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-wc-packages',
      title: 'Flexible Like Quantities',
      description: 'Choose from smaller and larger packages depending on the individual video.',
      icon: 'users',
    },
    {
      id: 'tt-l-wc-password',
      title: 'No TikTok Password Required',
      description: 'NovaLikes does not need your TikTok password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'tt-l-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the Likes quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'tt-l-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'tt-l-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterward for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'tt-l-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-tiktok-likes-without-login-usa',
  title: 'Buy TikTok Likes Without Sharing Your Login',
  description:
    'A Likes order should not require control of your TikTok account. NovaLikes uses the public video information required for the service.',
  cards: [
    {
      id: 'tt-l-can-need',
      title: 'What You Need',
      description: 'The exact public TikTok video link and your selected Likes package.',
      icon: 'users',
    },
    {
      id: 'tt-l-can-not-need',
      title: "What You Don't Need",
      description:
        'Your TikTok password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the link yourself and make sure it leads directly to the video you intend to support. A general TikTok profile link is not the correct target for a video Likes order.',
};

config.doesBuyingHelp = {
  id: 'real-tiktok-likes-usa',
  title: 'Looking for “Real TikTok Likes”? Check the Service Behind the Label',
  description:
    '"Real TikTok Likes" is a common phrase used when comparing engagement providers. You may also see high-quality TikTok Likes, active TikTok Likes or organic TikTok Likes. Different providers may use those terms differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'How many Likes are included?',
    'Which video receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes TikTok Likes Packages Do',
  limitItems: [
    'Increase the visible Like count on the eligible public video submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Views, Followers, reach, customers or sales. Clear expectations make services easier to compare realistically.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-likes-order-usa',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Likes package and submitted TikTok video URL are connected to the purchase. The order is then processed for that specific video.',
  steps: [
    {
      id: 'tt-l-th-1',
      title: 'Keep the Video Public',
      description: 'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'tt-l-th-2',
      title: "Don't Delete It Mid-Order",
      description: 'Removing the target video may interfere with an active order.',
    },
    {
      id: 'tt-l-th-3',
      title: 'Check the Link Carefully',
      description: 'Make sure your purchase points to the exact video you intended to use.',
    },
    {
      id: 'tt-l-th-4',
      title: 'Follow the Order Status',
      description:
        'Processing time can vary depending on quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'tiktok-likes-views-followers-usa',
  title: 'Likes, Views or Followers: Choose by Goal',
  description: 'Different TikTok services affect different metrics.',
  current: {
    title: 'TikTok Likes',
    description: 'Like count displayed on an eligible public video',
    bestFor: 'Video engagement',
    ctaLabel: 'TikTok Likes',
  },
  likes: {
    title: 'TikTok Views',
    description: 'View count displayed on an eligible public video',
    bestFor: 'Video visibility',
    href: usHref('/buy-tiktok-views'),
    ctaLabel: 'Buy TikTok Views',
  },
  views: {
    title: 'TikTok Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile audience size',
    href: usHref('/buy-tiktok-followers'),
    ctaLabel: 'Buy TikTok Followers',
  },
  combinedNote:
    'Choose Likes for video engagement. Choose Views for video visibility. Choose Followers for profile audience size. One service does not automatically include the others. Choose based on the exact metric you want to work on.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-likes-usa',
  title: 'Before You Buy TikTok Likes in the USA',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'tt-l-bb-video',
      title: 'Confirm the Exact Video',
      description: 'Open the public TikTok video you want to support.',
      icon: 'users',
    },
    {
      id: 'tt-l-bb-url',
      title: 'Copy the Direct Video Link',
      description: 'Do not submit only your general TikTok profile URL.',
      icon: 'sparkles',
    },
    {
      id: 'tt-l-bb-quantity',
      title: 'Check the Likes Quantity',
      description: "Make sure you're selecting the number of Likes you actually want.",
      icon: 'credit-card',
    },
    {
      id: 'tt-l-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package quantity and current price before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'tt-l-bb-public',
      title: 'Keep the Video Public',
      description: 'Avoid deleting or restricting the submitted content while processing requires access.',
      icon: 'lock',
    },
    {
      id: 'tt-l-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your TikTok password.',
      icon: 'headphones',
    },
    {
      id: 'tt-l-bb-metric',
      title: 'Choose the Correct TikTok Service',
      description: 'Likes, Views and Followers are separate metrics.',
      icon: 'megaphone',
    },
    {
      id: 'tt-l-bb-policies',
      title: 'Review the Policies',
      description: 'Read the applicable service and refund information before completing checkout.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'tiktok-engagement-framework-usa',
  title: 'A Practical TikTok Engagement Framework for US Accounts',
  description:
    'Likes can support selected videos, but stronger TikTok growth requires more than one number.',
  eyebrow: 'TikTok Growth',
  closingNote:
    'Visible engagement can support presentation. Long-term growth comes from content and genuine audience behavior.',
  cards: [
    {
      id: 'tt-l-ww-direction',
      title: 'Define Your Content Direction',
      description: 'Make your niche or business easy to understand.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-ww-priority',
      title: 'Identify Priority Videos',
      description: 'Know which content actually deserves more attention.',
      icon: 'heart',
    },
    {
      id: 'tt-l-ww-analytics',
      title: 'Review Genuine Analytics',
      description: 'Use real TikTok performance data to understand actual viewer behavior.',
      icon: 'users',
    },
    {
      id: 'tt-l-ww-profile',
      title: 'Build the Profile Behind the Video',
      description: 'Make sure someone who visits your account finds more relevant content.',
      icon: 'megaphone',
    },
  ],
};

config.packageSizes = {
  id: 'choose-tiktok-likes-package-usa',
  title: 'Choose a TikTok Likes Package That Fits the Video',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Likes. Consider the current Like count, the importance of the content, your account size and the increase you actually want.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'tt-l-ps-count',
      quantity: 'The Current Like Count',
      recommendedFor: 'Start with the visible engagement already shown on the video.',
    },
    {
      id: 'tt-l-ps-importance',
      quantity: 'The Importance of the Content',
      recommendedFor: 'A priority launch or evergreen video may deserve more support than a routine upload.',
    },
    {
      id: 'tt-l-ps-account',
      quantity: 'Your Account Size',
      recommendedFor:
        'The same Like quantity can look different on a newer creator profile and an established brand account.',
    },
    {
      id: 'tt-l-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on the individual video rather than automatically selecting the largest package.',
    },
  ],
  bottomNote: 'Compare TikTok Likes Packages',
};

config.bestPractices = {
  id: 'affordable-tiktok-likes-usa',
  title: 'Looking for Affordable TikTok Likes in the USA?',
  description:
    "If you're searching for cheap TikTok Likes in the USA, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable TikTok Likes service should make these details clear before checkout. NovaLikes lets you compare the available quantities and current prices before choosing.',
  items: [
    { id: 'tt-l-bp-1', title: 'Number of Likes Included', description: 'Check how many Likes are in the package.', icon: 'users' },
    { id: 'tt-l-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'tt-l-bp-3', title: 'Public Video Requirements', description: 'Confirm what public video link is required.', icon: 'clapperboard' },
    { id: 'tt-l-bp-4', title: 'Password Policy', description: 'Check whether your TikTok password is requested.', icon: 'lock' },
    { id: 'tt-l-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'tt-l-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    {
      id: 'tt-l-bp-7',
      title: 'What the Provider Actually Changes',
      description: 'Understand what the package actually changes.',
      icon: 'sparkles',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-likes-usa',
  title: 'Common Mistakes When Buying TikTok Likes',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-tiktok-followers': {
      title: 'TikTok Followers',
      description:
        'Choose Followers when you want to increase the follower count displayed on your public TikTok profile.',
      ctaLabel: 'Buy TikTok Followers',
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
  id: 'which-tiktok-videos-worth-likes-usa',
  title: 'Which TikTok Videos Are Worth Supporting With More Likes?',
  description:
    "You don't need to add Likes to every video. A more focused approach is to support content that already has a clear purpose.",
  items: [
    {
      id: 'tt-l-wb-demo',
      title: 'Product Demonstrations',
      description: 'Use Likes around a video that clearly shows what the product does or why it matters.',
    },
    {
      id: 'tt-l-wb-collab',
      title: 'Creator Collaborations',
      description: 'Support the content that best represents the partnership.',
    },
    {
      id: 'tt-l-wb-showcase',
      title: 'Business Showcases',
      description: 'Put engagement behind videos showing genuine services, projects, locations or products.',
    },
    {
      id: 'tt-l-wb-campaign',
      title: 'Campaign Videos',
      description: 'Focus on the creative carrying the main campaign message.',
    },
    {
      id: 'tt-l-wb-educational',
      title: 'Educational Content',
      description: 'Tutorials, explainers and useful tips can continue representing the account after publication.',
    },
    {
      id: 'tt-l-wb-evergreen',
      title: 'Evergreen Videos',
      description:
        'Strong content that remains relevant may make more sense to support than something with a very short lifespan.',
    },
  ],
  bottomNote: 'Choose the video first. Then decide how many Likes make sense around it.',
};

dummy.howToBuy = {
  id: 'how-tiktok-likes-order-works-usa',
  title: 'How Your TikTok Likes Order Works',
  description: 'Choose your video, compare packages, submit the link and track the status afterward.',
  steps: [
    {
      id: 'tt-l-step-1',
      title: 'Choose the Video',
      description: 'Start with the exact public TikTok video you want to support.',
    },
    {
      id: 'tt-l-step-2',
      title: 'Select Your Likes Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'tt-l-step-3',
      title: 'Submit the Video Link',
      description: 'Paste the direct public TikTok video URL into the required field.',
    },
    {
      id: 'tt-l-step-4',
      title: 'Review Your Order',
      description: 'Check the video link, Likes quantity and current package price.',
    },
    {
      id: 'tt-l-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without providing your TikTok password.',
    },
    {
      id: 'tt-l-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterward for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy TikTok Likes in the USA?',
  text: 'You can buy TikTok Likes in the USA through NovaLikes for eligible public videos. Choose an available Likes package, submit the exact public TikTok video URL and complete checkout without sharing your password. The Likes apply to that video\'s Like count and do not automatically increase your TikTok Followers or Views.',
};

dummy.storySections = [
  {
    id: 'built-for-us',
    title: 'Built for US Creators, Businesses and Brands',
    lead: 'TikTok Likes can serve different purposes depending on the account behind the content.',
    paragraphs: [
      'A creator in Los Angeles may use TikTok around beauty, entertainment, fashion or fitness. An ecommerce brand in New York may use video around product launches and creator partnerships. A local business in Miami, Houston, Dallas, Chicago or another US market may use TikTok to show genuine work and recent activity. An agency may manage several client campaigns with different engagement goals.',
      'That means your Likes strategy should fit the video.',
    ],
    footer: 'Likes can support presentation. The content behind them still needs a purpose.',
    items: [
      { title: 'Creators', body: 'Support the videos that best represent your niche, personality or expertise.' },
      { title: 'Ecommerce Brands', body: 'Focus on product demonstrations, launches and priority campaign content.' },
      {
        title: 'Local Businesses',
        body: 'Use Likes around videos showing real services, projects, locations and business activity.',
      },
      {
        title: 'Agencies',
        body: 'Choose Like quantities based on individual client videos instead of applying one fixed package everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Put more visible engagement behind selected content while continuing your wider TikTok strategy.',
      },
    ],
  },
  {
    id: 'us-campaign-moments',
    title: 'Put More Engagement Behind Important US Campaign Content',
    lead: 'Some TikTok videos matter more because of the campaign around them.',
    footer:
      'Visible Likes can support campaign presentation. The real campaign still depends on the creative, offer and customer experience behind it.',
    items: [
      {
        title: 'Black Friday and Cyber Monday',
        body: 'US ecommerce and retail brands may have priority TikTok videos around major shopping periods.',
      },
      { title: 'Product Launches', body: 'Support the video that best introduces or demonstrates the product.' },
      {
        title: 'Holiday Campaigns',
        body: 'Thanksgiving, Christmas and New Year can create important content windows for many businesses.',
      },
      {
        title: 'Back-to-School Campaigns',
        body: 'Fashion, retail, technology, education and family-focused brands may have seasonal TikTok content worth supporting.',
      },
      {
        title: 'Creator Partnerships',
        body: 'Put Likes behind the strongest collaboration video rather than unrelated uploads.',
      },
      {
        title: 'New Location Launches',
        body: 'Businesses expanding into another city or state can use TikTok to introduce the location, service or team.',
      },
    ],
  },
  {
    id: 'strong-content',
    title: 'Make Strong TikTok Content Look More Active at First Glance',
    lead: 'Like count is one of several visible signals people may notice when watching a TikTok video. They can also see:',
    bullets: ['Views', 'Comments', 'Shares', 'creator profile', 'caption', 'video quality', 'overall account activity'],
    paragraphs: [
      'A stronger visible Like count can support how active the video appears. But Likes cannot improve weak content by themselves.',
      'Strong creative, a clear idea and relevant subject matter still matter.',
    ],
    footer: 'Likes can support presentation. The video still needs to give viewers a reason to care.',
  },
  {
    id: 'likes-reach',
    title: 'Likes and TikTok Reach Are Different Things',
    lead: 'A visible Like count and TikTok\'s distribution of a video are separate outcomes. Buying TikTok Likes should not be treated as a guaranteed way to:',
    bullets: [
      'reach the For You Page',
      'make a video viral',
      'increase organic Views',
      'gain Followers',
      'increase Comments',
      'rank in TikTok Search',
      'generate customers',
      'secure partnerships',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes TikTok Likes packages are designed around the Like count displayed on the selected eligible public video.',
      "TikTok controls how content is recommended through its own systems. Use Likes for the metric they actually change.",
    ],
  },
  {
    id: 'likes-views-context',
    title: 'Put TikTok Likes in Context With Views',
    lead: 'Likes and Views measure different things. A video may have many Views but fewer Likes. Another video may have fewer Views but stronger genuine interaction. Neither number tells the entire story by itself. When reviewing genuine content performance, consider:',
    footer: 'Purchased Likes change the visible Like metric. Use genuine TikTok analytics to understand real audience behavior.',
    items: [
      { title: 'Views', body: 'How much real exposure is the video receiving?' },
      { title: 'Likes', body: 'Are genuine viewers choosing to react?' },
      { title: 'Comments', body: 'Are people discussing the content?' },
      { title: 'Shares', body: 'Are real viewers sending it to others?' },
      { title: 'Watch Behaviour', body: 'Are viewers staying with the video?' },
    ],
  },
  {
    id: 'measure-quality',
    title: "Don't Measure Video Quality by Likes Alone",
    lead: 'A higher Like count does not automatically mean a better TikTok video. Strong content may also create:',
    footer:
      "If you're building TikTok for long-term growth, use real account performance to decide what content to create next. Purchased Likes can support presentation. They should not become the only measure of success.",
    items: [
      { title: 'Longer Viewing', body: 'Are genuine viewers staying with the content?' },
      { title: 'Repeat Viewing', body: 'Do people return to the video?' },
      { title: 'Genuine Comments', body: 'Are people discussing the topic?' },
      { title: 'Shares', body: 'Are genuine viewers sending the video to others?' },
      { title: 'Profile Visits', body: 'Are viewers exploring your TikTok account afterward?' },
      { title: 'Business Outcomes', body: 'Are you seeing enquiries, organic Followers or website activity?' },
    ],
  },
  {
    id: 'content-engagement',
    title: 'Build Videos People Actually Want to Engage With',
    lead: 'If engagement matters to your TikTok strategy, continue improving the videos themselves.',
    footer: 'Purchased Likes change one visible metric. Your genuine audience tells you what content actually works.',
    items: [
      { title: 'Make the Opening Clear', body: 'Give viewers a reason to understand the subject quickly.' },
      { title: 'Show the Value Early', body: "Don't hide the main idea behind a long introduction." },
      { title: 'Keep the Video Focused', body: 'One strong idea can be easier to follow than several unrelated messages.' },
      { title: 'Use Strong Visuals', body: "Show what you're talking about instead of relying only on explanation." },
      {
        title: 'Develop Repeatable Formats',
        body: 'If a genuine audience responds well to a certain format, create more around it.',
      },
      {
        title: 'Learn From Real Engagement',
        body: 'Authentic comments and audience questions can reveal stronger content ideas.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'TikTok Likes for US Local Businesses',
    paragraphs: [
      'TikTok can help local businesses show what they actually do.',
      'A restaurant may show a dish being prepared. A contractor may publish a project transformation. A salon may show a finished result. A retailer may demonstrate a product. A real estate business may showcase a property. A fitness studio may publish training content. A tourism business may show an experience. A local service company may explain its process.',
      "If you're supporting these videos with Likes, make sure the content accurately represents the real business.",
    ],
    footer: 'Visible engagement can support presentation. Local trust comes from genuine business activity.',
  },
  {
    id: 'real-experience',
    title: 'Support Real Experience With Better TikTok Content',
    lead: 'Some of the strongest business and creator videos come from real experience.',
    footer: 'Likes can support visible engagement around this content. The actual experience makes the video worth watching.',
    items: [
      { title: "Show Work You've Actually Completed", body: 'Use real projects and examples.' },
      { title: 'Demonstrate Products You Sell', body: 'Show how they work or fit into real situations.' },
      { title: 'Explain Processes You Understand', body: 'Use genuine expertise to answer relevant questions.' },
      { title: 'Share Practical Knowledge', body: 'Turn common customer questions into useful videos.' },
      { title: 'Show Behind the Scenes', body: 'Real teams, locations and processes can make content more credible.' },
      {
        title: 'Share Your Own Perspective',
        body: 'Original experience often creates stronger content than generic repeated advice.',
      },
    ],
  },
  {
    id: 'brand-partnerships',
    title: 'Put TikTok Likes in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about visible engagement when preparing for brand opportunities. But brands and agencies may evaluate much more than Like count.',
      'They can look at creator niche, content quality, genuine audience fit, real engagement, Views, consistency, previous collaborations, professionalism, communication and campaign performance.',
      'If partnerships matter to you, strengthen the whole profile. Use strong content. Keep genuine analytics available where appropriate.',
    ],
    footer: 'Treat Likes as one signal rather than proof of influence by themselves.',
  },
  {
    id: 'business-results',
    title: "More TikTok Likes Don't Automatically Mean More Business",
    paragraphs: [
      'A larger Like count can make a video look more active. It does not automatically generate commercial results.',
      'For a US business, success might mean website visits, product sales, leads, bookings, store visits, calls or genuine direct messages.',
      'Those outcomes depend on more than one engagement number. Your offer, video, audience, website and customer experience all matter.',
      'Measure business results separately from visible TikTok metrics.',
    ],
  },
  {
    id: 'organic-engagement',
    title: 'Understand the Difference Between Purchased Likes and Organic Engagement',
    paragraphs: [
      'Purchased Likes increase the visible Like count on the selected eligible video. Organic engagement is different. Organic Likes, Comments, Shares and other actions come from genuine users choosing to interact with the content.',
      'Keep these outcomes separate when evaluating your TikTok strategy. Use genuine account analytics to understand organic video performance, real audience behavior, genuine engagement, profile activity and organic follower growth.',
      "And review TikTok's current platform rules before using any third-party engagement service.",
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/us/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-likes'] = {
  title: 'Buy TikTok Likes USA | Likes for Videos | NovaLikes',
  description:
    'Buy TikTok likes in the USA for public videos. Compare flexible packages, order without sharing your password and track your TikTok likes order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/us/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const usTtLikesFaqs = [
  {
    id: 'us-tt-l-where-buy',
    question: 'Where can I buy TikTok Likes in the USA?',
    answer:
      'You can buy TikTok Likes in the USA through NovaLikes for eligible public videos. Choose an available Likes package, submit the direct public TikTok video link and complete checkout without sharing your password.',
  },
  {
    id: 'us-tt-l-get-more',
    question: 'How can I get more TikTok Likes in the USA?',
    answer:
      'NovaLikes Likes packages can increase the visible Like count on eligible public TikTok videos. For organic engagement, continue improving your videos and reviewing genuine audience behavior through TikTok analytics.',
  },
  {
    id: 'us-tt-l-cheap',
    question: 'Can I buy cheap TikTok Likes in the USA?',
    answer:
      'NovaLikes offers multiple Likes quantities so you can compare current package sizes and prices. When comparing cheaper services, also review password requirements, tracking, support and what the package actually changes.',
  },
  {
    id: 'us-tt-l-real',
    question: 'What are real TikTok Likes?',
    answer:
      '"Real TikTok Likes" can mean different things depending on the provider. Review the actual service details rather than relying only on the phrase. NovaLikes Likes packages are designed to increase the visible Like count on the eligible submitted video.',
  },
  {
    id: 'us-tt-l-how-many',
    question: 'How many TikTok Likes should I buy?',
    answer:
      'There is no single ideal quantity for every video. Consider its existing Likes, View count, account size, campaign purpose and the visible increase you want.',
  },
  {
    id: 'us-tt-l-password',
    question: 'Do I need my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access.',
  },
  {
    id: 'us-tt-l-info',
    question: 'What information do I need?',
    answer: 'You need the direct public TikTok video link and the Likes package you want to purchase.',
  },
  {
    id: 'us-tt-l-cost',
    question: 'How much does it cost to buy TikTok Likes in the USA?',
    answer:
      'Pricing depends on the Like quantity you select. NovaLikes displays the current package quantities and prices before checkout.',
  },
  {
    id: 'us-tt-l-delivery',
    question: 'How long does it take to get TikTok Likes?',
    answer:
      'Processing time can vary depending on the selected quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'us-tt-l-views',
    question: 'Will buying TikTok Likes increase my Views?',
    answer: 'Not automatically. TikTok Views are a separate video-level metric and service.',
  },
  {
    id: 'us-tt-l-followers',
    question: 'Will buying TikTok Likes increase my Followers?',
    answer: 'Not automatically. TikTok Followers are a separate profile-level metric.',
  },
  {
    id: 'us-tt-l-fyp',
    question: 'Will buying TikTok Likes help me reach the For You Page?',
    answer: "There is no guarantee. A visible Like count and TikTok's recommendation systems are separate things.",
  },
  {
    id: 'us-tt-l-viral',
    question: 'Will buying TikTok Likes make my video viral?',
    answer:
      'There is no guarantee. A Likes package changes the visible Like count on the selected video, not its organic distribution.',
  },
  {
    id: 'us-tt-l-business',
    question: 'Can US businesses buy TikTok Likes?',
    answer:
      'Eligible public TikTok videos used by US businesses, creators, brands, agencies and other supported accounts can use NovaLikes Likes packages.',
  },
  {
    id: 'us-tt-l-local',
    question: 'Can local businesses use TikTok Likes packages?',
    answer:
      'Yes. Eligible public videos from local-business accounts can use Likes packages. Use them around content that accurately represents the business.',
  },
  {
    id: 'us-tt-l-client',
    question: 'Can I order TikTok Likes for client videos?',
    answer:
      "If you're authorized to purchase services for eligible client content, submit the correct public video link and review the order details carefully.",
  },
  {
    id: 'us-tt-l-wrong-url',
    question: 'What happens if I submit the wrong video link?',
    answer:
      'Contact NovaLikes support as soon as possible with your order information. Always verify the exact video URL before checkout.',
  },
  {
    id: 'us-tt-l-track',
    question: 'Can I track my TikTok Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('us-tt-l-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...usTtLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United States TikTok Likes content from supplied copy.');
