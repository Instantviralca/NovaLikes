/**
 * Apply supplied Australia TikTok Likes copy.
 * Run: npx tsx scripts/patch-au-tiktok-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AU = '/au';
const file = path.join(process.cwd(), 'content/markets/au/services/buy-tiktok-likes.json');
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
  title: 'Buy TikTok Likes Australia | Likes for Videos | NovaLikes',
  description:
    'Buy TikTok likes in Australia for public videos. Compare flexible packages, order without sharing your password and track your TikTok likes order online.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR AUSTRALIA';
hero.title = 'Buy TikTok Likes in Australia and Strengthen Video Engagement';
hero.description =
  'Put more visible engagement behind the TikTok videos that matter most. NovaLikes gives Australian creators, businesses, brands and agencies a simple way to buy TikTok Likes for eligible public videos without sharing account login details. Choose the number of Likes you want, submit the exact public TikTok video link and complete your order online. Whether you\'re supporting a product launch, creator collaboration, campaign video, business showcase or an important piece of evergreen content, choose a Likes package around the video you\'re actually trying to strengthen.';
hero.primaryCta = { label: 'Choose Your TikTok Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-l-trust-public', label: 'Public Video Link Only' },
  { id: 'tt-l-trust-password', label: 'No Password Required' },
  { id: 'tt-l-trust-pricing', label: 'Clear Pricing' },
  { id: 'tt-l-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a TikTok Likes Package That Fits the Video';
pricing.description =
  'Different TikTok videos have different purposes. NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Likes. A regular video may only need a smaller increase. A launch video, campaign asset or strong portfolio piece may justify a larger package. Before choosing, consider the current Like count, the importance of the video, your account size and the increase you actually want rather than automatically selecting the largest available option.';
pricing.primaryCtaLabel = 'Compare TikTok Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'au-tt-l-where-buy',
  'au-tt-l-get-more',
  'au-tt-l-cheap',
  'au-tt-l-real',
  'au-tt-l-how-many',
  'au-tt-l-password',
  'au-tt-l-info',
  'au-tt-l-cost',
  'au-tt-l-delivery',
  'au-tt-l-views',
  'au-tt-l-followers',
  'au-tt-l-fyp',
  'au-tt-l-viral',
  'au-tt-l-risk',
  'au-tt-l-business',
  'au-tt-l-local',
  'au-tt-l-client',
  'au-tt-l-wrong-url',
  'au-tt-l-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Put More Likes Behind the TikTok Videos That Matter';
finalCta.description =
  'Choose the video you want to support, select a TikTok Likes package that fits the content and submit the correct public video link without sharing your login details. Then keep strengthening what a Like count cannot replace: videos worth watching, a clear niche, genuine audience interaction and a TikTok presence people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-likes-australia',
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
      description: 'Choose from smaller and larger packages depending on the video.',
      icon: 'users',
    },
    {
      id: 'tt-l-wc-password',
      title: 'No TikTok Password Required',
      description: 'NovaLikes does not need your password, verification codes or private account access.',
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
      description: 'Complete your order through the available NovaLikes checkout.',
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
  id: 'buy-tiktok-likes-without-login-australia',
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
    'Before checkout, open the link yourself and make sure it leads directly to the video you intend to use. A general TikTok profile URL is not the correct target for a video Likes order.',
};

config.doesBuyingHelp = {
  id: 'real-tiktok-likes-australia',
  title: 'Looking for “Real TikTok Likes”? Read the Service Details First',
  description:
    '"Real TikTok Likes" is a common phrase used when comparing engagement providers. You may also see terms such as high-quality TikTok Likes, active TikTok Likes or organic TikTok Likes. Different providers may define those terms differently.',
  helpTitle: 'Before buying, ask',
  helpItems: [
    'What metric changes?',
    'How many Likes are included?',
    'Which video receives them?',
    'What information do I need to provide?',
    'What does the provider actually guarantee?',
  ],
  limitTitle: 'What NovaLikes TikTok Likes Packages Do',
  limitItems: [
    'Increase the Like count displayed on the eligible public video submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Views, Followers, reach, customers or sales. Clear service expectations are more useful than an undefined marketing label.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-likes-order-australia',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Likes package and submitted TikTok video URL are connected to the purchase. The order is then processed for the intended video.',
  steps: [
    {
      id: 'tt-l-th-1',
      title: 'Keep the Video Public',
      description: 'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'tt-l-th-2',
      title: "Don't Delete It Mid-Order",
      description: 'Removing the target video can interfere with an active order.',
    },
    {
      id: 'tt-l-th-3',
      title: 'Check the Link Carefully',
      description: 'Make sure the order points to the exact TikTok video you intended to support.',
    },
    {
      id: 'tt-l-th-4',
      title: 'Follow Your Order',
      description:
        'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'tiktok-likes-views-followers-australia',
  title: 'TikTok Likes, Views or Followers: Choose by Goal',
  description: 'Different TikTok services affect different metrics.',
  current: {
    title: 'TikTok Likes',
    description: 'Like count displayed on an eligible public video',
    bestFor: 'Visible video engagement',
    ctaLabel: 'TikTok Likes',
  },
  likes: {
    title: 'TikTok Views',
    description: 'View count displayed on an eligible public video',
    bestFor: 'Video view count',
    href: auHref('/buy-tiktok-views'),
    ctaLabel: 'Buy TikTok Views',
  },
  views: {
    title: 'TikTok Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile follower count',
    href: auHref('/buy-tiktok-followers'),
    ctaLabel: 'Buy TikTok Followers',
  },
  combinedNote:
    'Choose Likes for visible video engagement on one specific video. Choose Views for video count. Choose Followers for your profile. Choose the service based on the exact number you want to work on.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-likes-australia',
  title: 'Before You Buy TikTok Likes in Australia',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'tt-l-bb-video',
      title: 'Confirm the Exact Video',
      description: 'Open the public TikTok video you want to use.',
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
      title: 'Confirm the Current Price',
      description: 'Review the package price before checkout.',
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
      description: 'NovaLikes does not require TikTok login details.',
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
  id: 'dont-measure-video-quality-by-likes-australia',
  title: "Don't Measure Video Quality by Likes Alone",
  description:
    'A larger Like count does not automatically mean a video is better. Strong TikTok content may also generate:',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    "If you're building TikTok for long-term growth, use genuine account performance to decide what content to create next. Purchased Likes can support presentation. They should not become the only measure of success.",
  cards: [
    {
      id: 'tt-l-ww-watch',
      title: 'Longer Viewing',
      description: 'Are genuine viewers staying with the content?',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-ww-repeat',
      title: 'Repeat Viewing',
      description: 'Do people return to the video?',
      icon: 'heart',
    },
    {
      id: 'tt-l-ww-comments',
      title: 'Real Comments',
      description: 'Are people discussing the topic?',
      icon: 'users',
    },
    {
      id: 'tt-l-ww-shares',
      title: 'Shares',
      description: 'Are genuine viewers sending the video to others?',
      icon: 'briefcase',
    },
    {
      id: 'tt-l-ww-profile',
      title: 'Profile Visits',
      description: 'Are viewers exploring your TikTok account afterward?',
      icon: 'megaphone',
    },
    {
      id: 'tt-l-ww-outcomes',
      title: 'Business Outcomes',
      description: 'Are you seeing enquiries, organic Followers or website activity?',
      icon: 'map-pin',
    },
  ],
};

config.packageSizes = {
  id: 'choose-tiktok-likes-package-australia',
  title: 'Choose a TikTok Likes Package That Fits the Video',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K Likes. A regular video may only need a smaller increase. A launch video, campaign asset or strong portfolio piece may justify a larger package.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'tt-l-ps-count',
      quantity: 'The Current Like Count',
      recommendedFor: 'Look at the visible engagement already shown on the video.',
    },
    {
      id: 'tt-l-ps-importance',
      quantity: 'The Importance of the Video',
      recommendedFor: 'A priority campaign video may deserve more support than routine content.',
    },
    {
      id: 'tt-l-ps-account',
      quantity: 'Your Account Size',
      recommendedFor:
        'The same Like count can look different on a newer creator account and an established brand profile.',
    },
    {
      id: 'tt-l-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose a package based on the video rather than automatically selecting the largest available option.',
    },
  ],
  bottomNote: 'Compare TikTok Likes Packages',
};

config.bestPractices = {
  id: 'affordable-tiktok-likes-australia',
  title: 'Looking for Affordable TikTok Likes in Australia?',
  description:
    "If you're searching for cheap TikTok Likes in Australia, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable TikTok Likes package should make these details easy to understand before checkout. NovaLikes lets you compare the available quantities and current pricing before choosing.',
  items: [
    { id: 'tt-l-bp-1', title: 'Number of Likes Included', description: 'Check how many Likes are in the package.', icon: 'users' },
    { id: 'tt-l-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'tt-l-bp-3', title: 'Video Requirements', description: 'Confirm what public video link is required.', icon: 'clapperboard' },
    { id: 'tt-l-bp-4', title: 'Password Policy', description: 'Check whether your TikTok password is requested.', icon: 'lock' },
    { id: 'tt-l-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'tt-l-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    { id: 'tt-l-bp-7', title: 'Service Policies', description: 'Review what the provider actually promises.', icon: 'sparkles' },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-likes-australia',
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
        'Choose Followers when your goal is to increase the follower count displayed on your public TikTok profile.',
      ctaLabel: 'Buy TikTok Followers',
    },
    'buy-tiktok-views': {
      title: 'TikTok Views',
      description:
        'Choose Views when the visible View count on an eligible public TikTok video is your priority.',
      ctaLabel: 'Buy TikTok Views',
    },
  },
};

dummy.whyBuy = {
  id: 'which-tiktok-videos-worth-likes-australia',
  title: 'Which TikTok Videos Are Worth Supporting With More Likes?',
  description:
    "You don't need to add Likes to every TikTok video. A better approach is to focus on content that already has a clear role.",
  items: [
    {
      id: 'tt-l-wb-launch',
      title: 'Product Launch Videos',
      description: "Support the video that best introduces or demonstrates what you're launching.",
    },
    {
      id: 'tt-l-wb-collab',
      title: 'Creator Collaborations',
      description: 'Put engagement behind the content that represents the partnership most clearly.',
    },
    {
      id: 'tt-l-wb-showcase',
      title: 'Business Showcases',
      description: 'Use Likes around videos showing genuine products, services, projects or locations.',
    },
    {
      id: 'tt-l-wb-campaign',
      title: 'Campaign Videos',
      description: 'Focus on the content carrying the main message of an active promotion.',
    },
    {
      id: 'tt-l-wb-educational',
      title: 'Educational Content',
      description: 'Tutorials, tips and explainers can continue representing the account long after publication.',
    },
    {
      id: 'tt-l-wb-portfolio',
      title: 'Portfolio Content',
      description:
        'Creators, agencies and service businesses can support videos they would genuinely want a potential client or partner to see.',
    },
  ],
  bottomNote: 'Choose the video first. Then choose the Like quantity.',
};

dummy.howToBuy = {
  id: 'how-tiktok-likes-order-works-australia',
  title: 'How Your TikTok Likes Order Works',
  description: 'The process starts with the video you want to support.',
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
  heading: 'Quick Answer: Where Can I Buy TikTok Likes in Australia?',
  text: 'You can buy TikTok Likes in Australia through NovaLikes for eligible public videos. Choose an available Likes package, submit the exact public TikTok video URL and complete checkout without sharing your password. The Likes apply to that video\'s Like count and do not automatically increase your TikTok Followers or Views.',
};

dummy.storySections = [
  {
    id: 'built-for-australia',
    title: 'Built for Australian Creators, Businesses and Brands',
    lead: 'TikTok is used differently depending on the account behind it.',
    paragraphs: [
      'An Australian creator may be building a niche around fashion, fitness, gaming, beauty, food or education. An ecommerce brand may use TikTok to demonstrate products and support new releases. A local business in Sydney, Melbourne, Brisbane, Perth, Adelaide or another Australian market may use video to show its services, location or recent work. An agency may manage different TikTok campaigns for multiple clients.',
      'That means your Like strategy should fit the content.',
    ],
    footer: 'Likes can support presentation. The content behind them still needs a purpose.',
    items: [
      { title: 'Creators', body: 'Support the videos that best represent your niche, style or expertise.' },
      { title: 'Ecommerce Brands', body: 'Focus on product demonstrations, launches and promotional content.' },
      { title: 'Local Businesses', body: 'Use TikTok Likes around videos showing genuine work, services and business activity.' },
      { title: 'Agencies', body: 'Choose Likes based on individual client videos rather than using one fixed quantity for every campaign.' },
      { title: 'Established Brands', body: 'Put additional visible engagement around priority videos while continuing your broader social strategy.' },
    ],
  },
  {
    id: 'strong-content',
    title: 'Make Strong Content Look More Active at First Glance',
    lead: 'Like count is one of several visible signals people may notice when watching a TikTok video.',
    bullets: ['Views', 'Comments', 'Shares', 'creator profile', 'caption', 'content quality', 'overall account activity'],
    paragraphs: [
      'A higher Like count can support the visible engagement around a video. But it does not change what the video itself contains.',
      'Strong creative, a clear idea and relevant content still matter.',
    ],
    footer: 'Likes can support how active the video appears. The content gives viewers a reason to keep watching.',
  },
  {
    id: 'campaign-moments',
    title: 'Use TikTok Likes Around Important Australian Campaign Moments',
    lead: 'Some videos matter more because of the campaign around them.',
    footer:
      'Likes can support the visible presentation. The real campaign still depends on the creative, offer and customer experience behind it.',
    items: [
      { title: 'Product Drops', body: 'Support the video that demonstrates or introduces the product most clearly.' },
      { title: 'Boxing Day Campaigns', body: "Australian retail and ecommerce brands may have priority TikTok content around one of the country's major shopping periods." },
      { title: 'Summer Promotions', body: 'Travel, hospitality, fashion, fitness and outdoor brands may publish particularly important content during the Australian summer.' },
      { title: 'New Location Launches', body: 'Local businesses expanding into another suburb or city can use TikTok videos to introduce the new location.' },
      { title: 'Creator Partnerships', body: 'Support the strongest collaboration video rather than spreading Likes across unrelated content.' },
      { title: 'Events and Launches', body: 'Put attention behind the video carrying the main event or campaign message.' },
    ],
  },
  {
    id: 'likes-reach',
    title: 'Likes and TikTok Reach Are Different Signals',
    lead: 'A visible Like count and TikTok\'s distribution of a video are not the same thing.',
    bullets: [
      'reach the For You Page',
      'make a video viral',
      'increase organic Views',
      'gain Followers',
      'increase Comments',
      'rank in TikTok Search',
      'generate customers',
      'secure brand partnerships',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes TikTok Likes packages are designed around the Like count displayed on the selected eligible video.',
      'Organic distribution and genuine audience response are separate outcomes. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'likes-views-context',
    title: 'Put Likes in Context With Views',
    lead: 'Likes and Views measure different things. A video may have many Views but relatively fewer Likes. Another may have a smaller View count but a stronger Like ratio. Neither number tells the entire story on its own.',
    footer: 'A purchased Likes package changes the visible Like metric. Use genuine TikTok analytics to understand actual viewer behaviour.',
    items: [
      { title: 'Views', body: 'How much genuine video exposure is the content getting?' },
      { title: 'Likes', body: 'Are real viewers choosing to visibly react?' },
      { title: 'Comments', body: 'Are people discussing the topic?' },
      { title: 'Shares', body: 'Are genuine viewers sending the video to others?' },
      { title: 'Watch Behaviour', body: 'Are people staying with the video?' },
    ],
  },
  {
    id: 'content-engagement',
    title: 'Build TikTok Content People Actually Want to Engage With',
    lead: 'If Likes matter to your strategy, continue working on the videos themselves.',
    footer: 'Purchased Likes change one visible metric. The real content strategy comes from what genuine viewers respond to.',
    items: [
      { title: 'Make the Opening Clear', body: 'Give viewers a reason to understand the topic quickly.' },
      { title: 'Show the Value Early', body: "Don't hide the main point too deep into the video." },
      { title: 'Use Strong Visuals', body: 'Clear framing and readable text can make videos easier to follow.' },
      { title: 'Build Repeatable Formats', body: 'Turn genuinely successful ideas into a series.' },
      { title: 'Make the Content Relevant', body: 'Videos should connect to the niche, creator identity or business behind the account.' },
      { title: 'Learn From Real Engagement', body: 'Genuine comments and audience questions can provide ideas for future content.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'TikTok Likes for Australian Local Businesses',
    paragraphs: [
      'TikTok can give local businesses a visual way to show what they actually do. A restaurant may show a dish being prepared. A builder may show a project transformation. A salon may show a finished result. A retailer may demonstrate a product. A real estate business may showcase a property. A tourism company may show an experience or destination. A local service business may explain its process.',
      "If you're supporting these videos with Likes, make sure the content accurately represents the business.",
    ],
    footer: 'Visible engagement can strengthen presentation. The actual business behind the video builds trust.',
  },
  {
    id: 'real-experience',
    title: 'Support Real Experience With Better Video Content',
    lead: 'TikTok works particularly well when businesses and creators show things they genuinely know or do.',
    footer: 'Likes can support the visible engagement around this content. Actual experience makes the video worth watching.',
    items: [
      { title: "Work You've Completed", body: 'Show real projects and outcomes.' },
      { title: 'Products You Sell', body: 'Demonstrate real features or use cases.' },
      { title: 'Processes You Understand', body: 'Explain how something works using genuine expertise.' },
      { title: 'Questions Customers Ask', body: 'Turn recurring customer questions into useful TikTok videos.' },
      { title: 'Your Own Perspective', body: 'Original experience often creates stronger content than repeating generic advice.' },
    ],
  },
  {
    id: 'brand-partnerships',
    title: 'Put TikTok Likes in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about Like counts when building a profile for future collaborations. But serious brands and agencies can evaluate much more than one engagement metric.',
      'They may look at creator niche, content quality, genuine audience fit, real engagement, Views, consistency, previous campaign work, professionalism and communication.',
      'If partnerships are part of your goal, make the entire profile stronger. Use quality content. Keep your niche clear. Use genuine analytics where relevant. And treat Likes as one signal rather than proof of influence by themselves.',
    ],
  },
  {
    id: 'platform-rules',
    title: "Understand TikTok's Rules Around Artificial Engagement",
    paragraphs: [
      'TikTok prohibits fake or artificially increased engagement, including services that sell Likes or Followers. That means no third-party Likes provider should promise that buying Likes is officially supported by TikTok or completely free of platform-policy risk.',
      'If you decide to use a Likes service, keep your TikTok password private, understand exactly which metric you\'re purchasing, don\'t treat Likes as guaranteed FYP distribution, don\'t confuse purchased Likes with organic engagement, continue building genuine content and review TikTok\'s current platform rules yourself.',
    ],
    footer: 'Clear expectations are better than a “100% safe” claim.',
  },
  {
    id: 'engagement-framework',
    title: 'A Practical TikTok Engagement Framework for Australian Accounts',
    lead: 'Likes can support selected videos, but stronger TikTok growth requires more than one metric.',
    footer:
      'Visible engagement can support presentation. Long-term growth depends on content and genuine audience behaviour.',
    items: [
      { title: 'Define Your Content Direction', body: 'Make your niche or brand easy to understand.' },
      { title: 'Identify Priority Videos', body: 'Know which content best represents the account or campaign.' },
      { title: 'Test Different Video Formats', body: 'Try demonstrations, explainers, transformations, reactions, tutorials and other relevant formats.' },
      { title: 'Review Genuine Analytics', body: 'Use actual TikTok performance data to understand what real viewers respond to.' },
      { title: 'Learn From Real Comments', body: 'Genuine audience questions can reveal stronger content opportunities.' },
      { title: 'Build the Profile Behind the Video', body: 'Make sure someone who visits your TikTok account finds more relevant content.' },
      {
        title: 'Connect TikTok to Wider Marketing',
        body: 'Australian businesses can use TikTok alongside Instagram, SEO, ecommerce, paid advertising, email and their website.',
      },
      {
        title: 'Keep Likes in Perspective',
        body: 'Visible engagement can support presentation. Long-term growth depends on content and genuine audience behaviour.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/au/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-likes'] = {
  title: 'Buy TikTok Likes Australia | Likes for Videos | NovaLikes',
  description:
    'Buy TikTok likes in Australia for public videos. Compare flexible packages, order without sharing your password and track your TikTok likes order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/au/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const auTtLikesFaqs = [
  {
    id: 'au-tt-l-where-buy',
    question: 'Where can I buy TikTok Likes in Australia?',
    answer:
      'You can buy TikTok Likes in Australia through NovaLikes for eligible public videos. Choose an available Likes package, submit the direct TikTok video link and complete checkout without sharing your password.',
  },
  {
    id: 'au-tt-l-get-more',
    question: 'How can I get more TikTok Likes in Australia?',
    answer:
      'NovaLikes Likes packages can increase the Like count displayed on eligible public TikTok videos. For organic engagement, continue improving your content, testing video formats and reviewing genuine audience behaviour through TikTok analytics.',
  },
  {
    id: 'au-tt-l-cheap',
    question: 'Can I buy cheap TikTok Likes in Australia?',
    answer:
      'NovaLikes offers multiple Likes package sizes so you can compare available quantities and pricing. When comparing cheaper options, also review password requirements, tracking, support and what the package actually includes.',
  },
  {
    id: 'au-tt-l-real',
    question: 'What are real TikTok Likes?',
    answer:
      '"Real TikTok Likes" can mean different things depending on the provider. Review the actual service details rather than relying only on the phrase. NovaLikes Likes packages are designed to increase the visible Like count on eligible submitted videos.',
  },
  {
    id: 'au-tt-l-how-many',
    question: 'How many TikTok Likes should I buy?',
    answer:
      "There is no single ideal number for every video. Consider the video's existing Like count, Views, account size, campaign purpose and the visible increase you want.",
  },
  {
    id: 'au-tt-l-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access.',
  },
  {
    id: 'au-tt-l-info',
    question: 'What information do I need?',
    answer: 'You need the direct public TikTok video link and the Likes package you want to purchase.',
  },
  {
    id: 'au-tt-l-cost',
    question: 'How much does it cost to buy TikTok Likes in Australia?',
    answer:
      'Pricing depends on the Like quantity you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'au-tt-l-delivery',
    question: 'How long does it take to get TikTok Likes?',
    answer:
      'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'au-tt-l-views',
    question: 'Will buying TikTok Likes increase my Views?',
    answer: 'Not automatically. Likes and Views are separate TikTok metrics and separate NovaLikes services.',
  },
  {
    id: 'au-tt-l-followers',
    question: 'Will buying TikTok Likes increase my Followers?',
    answer: 'Not automatically. TikTok Followers is a separate profile-level service.',
  },
  {
    id: 'au-tt-l-fyp',
    question: 'Will buying Likes help my video reach the For You Page?',
    answer: 'There is no guarantee. TikTok Likes and FYP distribution are different things.',
  },
  {
    id: 'au-tt-l-viral',
    question: 'Will more Likes make my TikTok video go viral?',
    answer:
      'There is no guarantee. A Likes package changes the visible Like count. Viral distribution depends on separate platform and audience factors.',
  },
  {
    id: 'au-tt-l-risk',
    question: 'Is buying TikTok Likes completely risk-free?',
    answer:
      'No third-party engagement service should promise zero platform-policy risk. TikTok prohibits fake and artificially increased engagement.',
  },
  {
    id: 'au-tt-l-business',
    question: 'Can Australian businesses buy TikTok Likes?',
    answer:
      'Eligible public TikTok videos used by Australian businesses, creators, brands, agencies and other supported accounts can use NovaLikes Likes packages.',
  },
  {
    id: 'au-tt-l-local',
    question: 'Can local businesses use TikTok Likes packages?',
    answer:
      'Yes, provided the content is an eligible public TikTok video. Use Likes around content that accurately represents the business.',
  },
  {
    id: 'au-tt-l-client',
    question: 'Can I order TikTok Likes for client videos?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public TikTok video link and review the order details carefully.",
  },
  {
    id: 'au-tt-l-wrong-url',
    question: 'What happens if I submit the wrong video link?',
    answer:
      'Contact NovaLikes support as soon as possible with the relevant order information. Check the video link carefully before completing checkout.',
  },
  {
    id: 'au-tt-l-track',
    question: 'Can I track my TikTok Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('au-tt-l-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...auTtLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Australia TikTok Likes content from supplied copy.');
