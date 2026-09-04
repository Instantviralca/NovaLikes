/**
 * Apply supplied United Kingdom TikTok Likes copy.
 * Run: npx tsx scripts/patch-uk-tiktok-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-tiktok-likes.json');
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
  title: 'Buy TikTok Likes UK | Likes for Videos | NovaLikes',
  description:
    'Buy TikTok likes in the UK for public videos. Compare flexible packages, order without sharing your password and track your TikTok Likes order online.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR THE UK';
hero.title = 'Buy TikTok Likes in the UK and Strengthen Video Engagement';
hero.description =
  "Put more visible engagement behind the TikTok videos that matter most. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to buy TikTok Likes for eligible public videos without sharing account login details. Choose the Likes quantity that fits your content, submit the exact public TikTok video link and complete your order online. Whether you're supporting a product launch, creator collaboration, campaign video, business showcase or evergreen piece of content, choose your TikTok Likes package around the individual video you're actually trying to strengthen.";
hero.primaryCta = { label: 'Choose Your TikTok Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-l-trust-public', label: 'Public Video Link Only' },
  { id: 'tt-l-trust-password', label: 'No Password Required' },
  { id: 'tt-l-trust-pricing', label: 'Clear Pricing' },
  { id: 'tt-l-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a TikTok Likes Package That Fits the Video';
pricing.description =
  'Different TikTok videos serve different purposes. A routine upload may need a smaller increase. A major product launch, collaboration or priority campaign video may call for something larger. Before ordering, consider the current Like count, the current View count, how important the video is, your account size and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare TikTok Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-tt-l-where-buy',
  'uk-tt-l-get-more',
  'uk-tt-l-cheap',
  'uk-tt-l-real',
  'uk-tt-l-how-many',
  'uk-tt-l-password',
  'uk-tt-l-info',
  'uk-tt-l-cost',
  'uk-tt-l-delivery',
  'uk-tt-l-views',
  'uk-tt-l-followers',
  'uk-tt-l-fyp',
  'uk-tt-l-viral',
  'uk-tt-l-platform-rules',
  'uk-tt-l-risk-free',
  'uk-tt-l-business',
  'uk-tt-l-local',
  'uk-tt-l-older-video',
  'uk-tt-l-client',
  'uk-tt-l-wrong-url',
  'uk-tt-l-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Put More Likes Behind the TikTok Videos That Matter';
finalCta.description =
  'Choose the video you want to support, select the TikTok Likes package that fits your content and submit the correct public video link without sharing your account login. Then keep strengthening what the Like count cannot replace: videos worth watching, genuine audience behaviour, real experience and a TikTok profile people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-likes-uk',
  title: 'Why Choose NovaLikes for TikTok Likes?',
  description: 'Buying TikTok Likes should be easy to understand before checkout.',
  items: [
    {
      id: 'tt-l-wc-video',
      title: 'Likes for Individual Videos',
      description: 'Your order applies to the eligible public TikTok video connected to the URL you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-wc-packages',
      title: 'Flexible Package Options',
      description: 'Compare the currently available Likes quantities and prices before choosing.',
      icon: 'users',
    },
    {
      id: 'tt-l-wc-password',
      title: 'No TikTok Password Required',
      description: 'NovaLikes does not need your TikTok password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'tt-l-wc-link',
      title: 'Direct Public Video Link',
      description: 'Provide the exact TikTok video where you want the Likes applied.',
      icon: 'sparkles',
    },
    {
      id: 'tt-l-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the selected package quantity and current price before paying.',
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
      description: 'Use NovaLikes tracking afterwards for available status information.',
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
  id: 'buy-tiktok-likes-without-login-uk',
  title: 'Buy TikTok Likes Without Sharing Your Login',
  description:
    'A TikTok Likes order should not require control of your account. NovaLikes uses the public video information needed for the service.',
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
    'Before checkout, open the video link yourself and make sure it leads to the exact content you intend to support. A general TikTok profile URL is not the correct target for a video Likes order.',
};

config.doesBuyingHelp = {
  id: 'real-tiktok-likes-uk',
  title: 'Looking for “Real TikTok Likes”? Check the Service Behind the Label',
  description:
    '"Real TikTok Likes" is a common phrase used when comparing engagement services. You may also see high-quality TikTok Likes, active TikTok Likes or organic TikTok Likes. Different providers may define these terms differently.',
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
    'They should not automatically be treated as guaranteed organic engagement, Views, Followers, reach, customers or sales. Clear expectations make services easier to compare.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-likes-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Likes package and submitted TikTok video link are connected to the purchase. The order is then processed for that specific video.',
  steps: [
    {
      id: 'tt-l-th-1',
      title: 'Keep the Video Public',
      description: 'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'tt-l-th-2',
      title: 'Do Not Delete It During Processing',
      description: 'Removing the target video may interfere with an active order.',
    },
    {
      id: 'tt-l-th-3',
      title: 'Check the Link Carefully',
      description: 'Make sure your order points to the exact video you intended to use.',
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
  id: 'tiktok-likes-views-followers-uk',
  title: 'Likes, Views or Followers: Choose by Goal',
  description: 'Different TikTok services affect different metrics.',
  current: {
    title: 'TikTok Likes',
    description: 'Like count displayed on an eligible public TikTok video',
    bestFor: 'Video engagement',
    ctaLabel: 'TikTok Likes',
  },
  likes: {
    title: 'TikTok Views',
    description: 'View count displayed on an eligible public TikTok video',
    bestFor: 'Video visibility',
    href: ukHref('/buy-tiktok-views'),
    ctaLabel: 'Buy TikTok Views',
  },
  views: {
    title: 'TikTok Followers',
    description: 'Follower count displayed on your public TikTok profile',
    bestFor: 'Profile audience size',
    href: ukHref('/buy-tiktok-followers'),
    ctaLabel: 'Buy TikTok Followers',
  },
  combinedNote:
    'Choose Likes for video engagement. Choose Views for video visibility. Choose Followers for profile audience size. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-likes-uk',
  title: 'Before You Buy TikTok Likes in the UK',
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
      description: 'Do not submit only the general TikTok profile URL.',
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
      description: 'Confirm the selected package quantity and price before checkout.',
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
      id: 'tt-l-bb-platform',
      title: 'Understand Platform Risk',
      description: "Review TikTok's current rules if third-party engagement risk matters to you.",
      icon: 'shield-check',
    },
    {
      id: 'tt-l-bb-policies',
      title: 'Review NovaLikes Policies',
      description: 'Read the applicable service and refund information before completing checkout.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'tiktok-engagement-framework-uk',
  title: 'A Practical TikTok Engagement Framework for UK Accounts',
  description:
    'Likes can support selected videos, but stronger TikTok growth requires more than one metric.',
  eyebrow: 'TikTok Growth',
  closingNote:
    'Visible engagement can support presentation. Long-term growth comes from the content and genuine audience behind it.',
  cards: [
    {
      id: 'tt-l-ww-direction',
      title: 'Define Your Content Direction',
      description: 'Make your niche, brand or business easy to understand.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-ww-priority',
      title: 'Identify Priority Videos',
      description: 'Know which content actually deserves extra attention.',
      icon: 'heart',
    },
    {
      id: 'tt-l-ww-analytics',
      title: 'Review Genuine Analytics',
      description: 'Use real TikTok performance data to understand audience behaviour.',
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
  id: 'choose-tiktok-likes-package-uk',
  title: 'Choose a TikTok Likes Package That Fits the Video',
  description:
    'Consider the current Like count, the current View count, how important the video is, your account size and the increase you actually want before choosing.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'tt-l-ps-count',
      quantity: 'The Current Like Count',
      recommendedFor: 'Start with the visible engagement already shown on the video.',
    },
    {
      id: 'tt-l-ps-views',
      quantity: 'The Current View Count',
      recommendedFor:
        'Likes and Views are different metrics, but viewing them together can help you understand how the public numbers currently look.',
    },
    {
      id: 'tt-l-ps-importance',
      quantity: 'How Important the Video Is',
      recommendedFor: 'A priority launch or evergreen video may deserve more support than a routine upload.',
    },
    {
      id: 'tt-l-ps-account',
      quantity: 'Your Account Size',
      recommendedFor:
        'The same Likes quantity can look different on a newer creator profile and an established brand account.',
    },
    {
      id: 'tt-l-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on the individual video rather than automatically selecting the largest package available.',
    },
  ],
  bottomNote: 'Compare TikTok Likes Packages',
};

config.bestPractices = {
  id: 'affordable-tiktok-likes-uk',
  title: 'Looking for Affordable TikTok Likes in the UK?',
  description:
    "If you're searching for cheap TikTok Likes in the UK, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable TikTok Likes service should make these details clear before checkout. NovaLikes lets you compare the currently available quantities and prices before choosing.',
  items: [
    { id: 'tt-l-bp-1', title: 'Likes Quantity', description: 'Check how many Likes are in the package.', icon: 'users' },
    { id: 'tt-l-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'tt-l-bp-3', title: 'Public Video Requirements', description: 'Confirm what public video link is required.', icon: 'clapperboard' },
    { id: 'tt-l-bp-4', title: 'Password Policy', description: 'Check whether your TikTok password is requested.', icon: 'lock' },
    { id: 'tt-l-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'tt-l-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    {
      id: 'tt-l-bp-7',
      title: 'Relevant Service Policies',
      description: 'Review applicable service policies before paying.',
      icon: 'sparkles',
    },
    {
      id: 'tt-l-bp-8',
      title: 'What the Provider Actually Changes',
      description: 'Understand what the package actually changes.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-likes-uk',
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
  id: 'which-tiktok-videos-worth-likes-uk',
  title: 'Which TikTok Videos Are Worth Supporting With More Likes?',
  description:
    'You do not need to add Likes to every TikTok video. A more focused approach is to identify content that already has a clear purpose.',
  items: [
    {
      id: 'tt-l-wb-demo',
      title: 'Product Demonstrations',
      description: 'Support the video that clearly shows what a product does, how it works or why someone may care about it.',
    },
    {
      id: 'tt-l-wb-collab',
      title: 'Creator Collaborations',
      description: 'Put more visible engagement behind the video that best represents the partnership.',
    },
    {
      id: 'tt-l-wb-showcase',
      title: 'Business Showcases',
      description: 'Use Likes around videos showing genuine services, products, projects or locations.',
    },
    {
      id: 'tt-l-wb-campaign',
      title: 'Campaign Videos',
      description: 'Focus on content carrying the main message of a wider promotion.',
    },
    {
      id: 'tt-l-wb-educational',
      title: 'Educational Videos',
      description: 'Tutorials, explainers and practical tips can continue representing the account after publication.',
    },
    {
      id: 'tt-l-wb-portfolio',
      title: 'Portfolio Content',
      description:
        'Creators and service businesses can support videos showcasing work they genuinely want potential customers or partners to see.',
    },
    {
      id: 'tt-l-wb-evergreen',
      title: 'Evergreen Videos',
      description:
        'Strong content that remains relevant may make more sense to support than something with a very short lifespan.',
    },
  ],
  bottomNote: 'Choose the video first. Then decide whether additional Likes fit its role.',
};

dummy.howToBuy = {
  id: 'how-tiktok-likes-order-works-uk',
  title: 'How Your TikTok Likes Order Works',
  description: 'Choose your video, compare packages, submit the link, review your order and track the status afterwards.',
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
      title: 'Submit the Direct Video Link',
      description: 'Paste the correct public TikTok video URL.',
    },
    {
      id: 'tt-l-step-4',
      title: 'Review Your Order',
      description: 'Check the video, Likes quantity and current package price.',
    },
    {
      id: 'tt-l-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your TikTok password.',
    },
    {
      id: 'tt-l-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy TikTok Likes in the UK?',
  text: 'You can buy TikTok Likes in the UK through NovaLikes for eligible public TikTok videos. Choose an available Likes package, submit the exact direct public video URL and complete checkout without sharing your TikTok password. The Likes apply to that specific video. They do not automatically increase your TikTok Followers or Views.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Creators, Businesses and Brands',
    lead: 'TikTok content can play a different role depending on the account behind it.',
    paragraphs: [
      'A creator in London may publish videos around fashion, beauty, entertainment, food, fitness or education. An ecommerce brand in Manchester may use TikTok around product demonstrations and launches. A local business in Birmingham, Leeds, Glasgow, Liverpool, Bristol or another UK market may use video to show genuine work and recent activity. An agency may manage multiple client campaigns with different engagement goals.',
      'That means your TikTok Likes strategy should fit the content.',
    ],
    footer: 'Likes can support presentation. The content behind them still needs a purpose.',
    items: [
      { title: 'Creators', body: 'Support videos that best represent your niche, personality or expertise.' },
      { title: 'Ecommerce Brands', body: 'Focus on product demonstrations, launches and priority campaign videos.' },
      {
        title: 'Local Businesses',
        body: 'Use Likes around videos showing real services, locations, products and completed work.',
      },
      {
        title: 'Agencies',
        body: 'Choose Like quantities according to the individual client video rather than applying the same approach everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Put more visible engagement behind priority videos while continuing genuine publishing and paid campaigns.',
      },
    ],
  },
  {
    id: 'uk-campaign-moments',
    title: 'Put More Engagement Behind Important UK Campaign Moments',
    lead: 'Some TikTok videos matter more because of the campaign around them.',
    footer:
      'Visible Likes can support campaign presentation. The campaign itself still needs strong creative, accurate information and a useful offer.',
    items: [
      {
        title: 'Black Friday',
        body: 'UK retailers and ecommerce brands may have priority TikTok content around Black Friday promotions.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use TikTok alongside paid media, email and ecommerce campaigns.',
      },
      {
        title: 'Boxing Day',
        body: 'Retailers and ecommerce brands may have another major campaign period around Boxing Day sales.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Gift ideas, seasonal products, hospitality offers, events and festive content can become higher-priority videos.',
      },
      {
        title: 'January Sales',
        body: 'Retail businesses may continue promotional activity into January.',
      },
      { title: 'Product Launches', body: 'Support the video that best introduces or demonstrates the product.' },
      {
        title: 'Creator Partnerships',
        body: 'Put Likes behind the strongest collaboration content rather than unrelated videos.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses expanding into another town or city can use TikTok to introduce the location, team or service.',
      },
    ],
  },
  {
    id: 'strong-content',
    title: 'Make Strong TikTok Content Look More Active at First Glance',
    lead: 'Like count is one of several public signals people may notice on a TikTok video. They may also see:',
    bullets: ['View count', 'Comments', 'Shares', 'caption', 'creator profile', 'video quality', 'overall account activity'],
    paragraphs: [
      'A stronger visible Like count can support how active the video appears. But Likes cannot improve weak content by themselves.',
      'The opening matters. The idea matters. The video quality matters. The subject matters.',
    ],
    footer: 'Likes can support presentation. The content still needs to give genuine viewers a reason to care.',
  },
  {
    id: 'likes-vs-views',
    title: 'Likes and Views Are Different TikTok Metrics',
    lead: 'TikTok Likes and TikTok Views work at the video level, but they represent different public numbers.',
    footer:
      'Choose Likes when visible engagement is the metric you want to work on. Choose Views when video visibility is the priority.',
    items: [
      { title: 'TikTok Likes', body: 'Likes show visible interaction on an eligible video.' },
      { title: 'TikTok Views', body: 'Views show the displayed View count on an eligible video.' },
      {
        title: 'Different Outcomes',
        body: 'A high View count does not automatically mean a high Like count. A higher Like count does not automatically increase Views.',
      },
    ],
  },
  {
    id: 'likes-reach',
    title: 'Likes and For You Feed Reach Are Different Things',
    lead: 'A visible Like count and TikTok\'s recommendation systems are separate outcomes. Buying TikTok Likes should not be treated as a guaranteed way to:',
    bullets: [
      'reach the For You feed',
      'make a video viral',
      'increase organic Views',
      'gain organic Followers',
      'create genuine Comments',
      'increase Shares',
      'rank in TikTok Search',
      'generate customers',
      'secure brand partnerships',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes TikTok Likes packages are designed around the Like count displayed on the selected eligible public video.',
      'TikTok controls content recommendation separately. Use Likes for the metric they actually change.',
    ],
  },
  {
    id: 'measure-quality',
    title: 'Do Not Measure TikTok Video Quality by Likes Alone',
    lead: 'A larger Like count does not tell you everything about video performance. When reviewing genuine TikTok results, also consider:',
    footer: 'Purchased Likes change one visible engagement metric. Use genuine TikTok analytics to understand actual audience behaviour.',
    items: [
      { title: 'Watch Behaviour', body: 'Are real viewers staying with the video?' },
      { title: 'Views', body: 'How much genuine exposure is the content receiving?' },
      { title: 'Shares', body: 'Are real users choosing to send the video to others?' },
      { title: 'Genuine Comments', body: 'What are people actually asking or saying?' },
      { title: 'Profile Activity', body: 'Does the video encourage genuine viewers to explore your account?' },
      { title: 'Organic Followers', body: 'Does the content convince real users to follow?' },
    ],
  },
  {
    id: 'content-engagement',
    title: 'Build TikTok Videos People Actually Want to Engage With',
    lead: 'If long-term TikTok growth matters, continue improving the content itself.',
    footer: 'Likes can support visible engagement. Content quality determines whether genuine users actually want to interact.',
    items: [
      { title: 'Make the Opening Clear', body: 'Help viewers understand the subject quickly.' },
      { title: 'Show the Value Early', body: 'Do not hide the main point behind a long introduction.' },
      { title: 'Keep the Video Focused', body: 'One strong idea is usually easier to follow than several unrelated messages.' },
      { title: 'Show Rather Than Only Tell', body: 'Use TikTok\'s visual format to demonstrate products, processes, results or ideas.' },
      { title: 'Use On-Screen Text Carefully', body: 'Text should support the video rather than overwhelm it.' },
      {
        title: 'Develop Repeatable Formats',
        body: 'If genuine viewers respond well to a format, build more around it.',
      },
      {
        title: 'Learn From Real Comments',
        body: 'Authentic questions and reactions can reveal stronger content ideas.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'TikTok Likes for UK Local Businesses',
    paragraphs: [
      'TikTok can help local businesses show potential customers what they actually do.',
      'A restaurant may show food preparation. A builder may publish a project transformation. A salon may show a completed treatment. A retailer may demonstrate new stock. An estate agency may showcase a property. A fitness studio may publish training content. A tourism business may show an experience. A local service company may explain its process.',
      "If you're supporting these videos with Likes, make sure the account accurately represents the real business.",
    ],
    footer: 'Visible engagement can support presentation. Local trust comes from genuine business activity.',
  },
  {
    id: 'real-experience',
    title: 'Support Real Experience With Better TikTok Content',
    lead: 'Some of the strongest videos come from things you genuinely know, sell or do.',
    footer: 'Likes can support visible engagement around this content. Real experience makes the video worth watching.',
    items: [
      { title: "Show Work You've Actually Completed", body: 'Use real projects instead of generic claims.' },
      { title: 'Demonstrate Real Products', body: 'Show how products work or fit into real situations.' },
      { title: 'Explain Processes You Understand', body: 'Use genuine expertise when answering useful questions.' },
      { title: 'Share Practical Knowledge', body: 'Turn recurring customer questions into helpful videos.' },
      { title: 'Show Behind the Scenes', body: 'Real teams, locations and processes can make your content more credible.' },
      {
        title: 'Share Your Own Perspective',
        body: 'Original experience can give viewers something generic content cannot.',
      },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use TikTok Likes Alongside Genuine Customer Proof',
    paragraphs: [
      'A visible Like count can contribute to how active a video appears. It is not the same as genuine customer evidence.',
      'For UK businesses, deeper trust can also come from verified reviews, authentic testimonials, completed projects, case studies, real customer comments, customer-created content, accurate company information and responsive customer service.',
      'If you have genuine proof, use it.',
    ],
    footer: 'Likes can support content presentation. Actual customer experience provides stronger credibility.',
  },
  {
    id: 'brand-partnerships',
    title: 'Put TikTok Likes in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about visible Likes when preparing for brand collaborations. Professional brands and agencies can evaluate much more than one number.',
      'They may consider creator niche, video quality, genuine audience fit, authentic engagement, Views, watch behaviour, consistency, previous collaborations, professionalism and campaign performance.',
      'If partnerships matter to you, strengthen the entire profile. Publish strong videos. Make your niche clear. Keep genuine analytics available where appropriate.',
    ],
    footer: 'Treat Likes as one signal rather than proof of influence by themselves.',
  },
  {
    id: 'business-results',
    title: "More TikTok Likes Don't Automatically Mean More Business",
    paragraphs: [
      'A stronger Like count can make a video look more active. It does not automatically create commercial results.',
      'For a UK business, useful outcomes might include online sales, website visits, customer enquiries, bookings, shop visits, calls, genuine messages or product interest.',
      'Those outcomes depend on more than one visible engagement metric. The content, offer, audience, website and real customer experience all matter.',
      'Measure business results separately from purchased TikTok Likes.',
    ],
  },
  {
    id: 'organic-engagement',
    title: 'Understand Purchased Likes and Organic Engagement as Different Outcomes',
    paragraphs: [
      'Purchased Likes increase the visible Like count on the selected eligible video. Organic TikTok engagement is different. Genuine Likes, Comments, Shares and other interactions come from real users choosing to interact with the content.',
      'Keep those outcomes separate when reviewing TikTok performance. Use genuine TikTok analytics to understand real video performance, organic audience behaviour, genuine engagement, profile activity and organic follower growth.',
      'Purchased Likes should not automatically be presented as organic engagement.',
    ],
  },
  {
    id: 'platform-rules',
    title: 'TikTok Platform Rules and Artificial Engagement',
    paragraphs: [
      'TikTok prohibits fake engagement and services designed to artificially increase engagement metrics. That includes services facilitating the sale of followers, Likes, Comments or Views.',
      'For that reason, no third-party TikTok Likes service should be described as TikTok-approved, guaranteed safe or risk-free. TikTok may take action against inauthentic engagement under its platform rules.',
      "If platform risk matters to you, review TikTok's current policies before ordering third-party engagement services.",
      'NovaLikes should be evaluated for the visible metric and buying process it actually provides rather than as an official TikTok growth programme.',
    ],
  },
  {
    id: 'tiktok-analytics',
    title: 'Use TikTok Analytics to Understand Genuine Video Performance',
    lead: 'Purchased Likes change one visible metric. Your genuine TikTok analytics can tell you more about how real viewers respond. Review:',
    footer: 'Use genuine performance data when planning what to publish next. Do not rely only on a public Like count.',
    items: [
      { title: 'Genuine Views', body: 'Which videos are receiving real attention?' },
      { title: 'Watch Behaviour', body: 'How are genuine users consuming your videos?' },
      { title: 'Real Comments', body: 'What questions or reactions appear naturally?' },
      { title: 'Shares', body: 'Which videos are people choosing to send to others?' },
      { title: 'Profile Activity', body: 'Which content encourages genuine viewers to explore your account?' },
      { title: 'Organic Followers', body: 'Which videos convince real users to stay?' },
    ],
  },
  {
    id: 'engagement-framework',
    title: 'A Practical TikTok Engagement Framework for UK Accounts',
    lead: 'Likes can support selected videos, but stronger TikTok growth requires more than one metric.',
    items: [
      { title: 'Define Your Content Direction', body: 'Make your niche, brand or business easy to understand.' },
      { title: 'Identify Priority Videos', body: 'Know which content actually deserves extra attention.' },
      { title: 'Test Different Formats', body: 'Try demonstrations, tutorials, explainers, transformations and other relevant formats.' },
      { title: 'Improve Your Openings', body: 'Give viewers a reason to understand the content quickly.' },
      { title: 'Review Genuine Analytics', body: 'Use real TikTok performance data to understand audience behaviour.' },
      { title: 'Learn From Genuine Comments', body: 'Real questions can reveal useful future content ideas.' },
      { title: 'Build the Profile Behind the Video', body: 'Make sure someone who visits your account finds more relevant content.' },
      {
        title: 'Connect TikTok to Wider Marketing',
        body: 'UK businesses may use TikTok alongside Instagram, ecommerce, SEO, Google Ads, email, paid social and their website.',
      },
      {
        title: 'Keep Likes in Perspective',
        body: 'Visible engagement can support presentation. Long-term growth comes from the content and genuine audience behind it.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-likes'] = {
  title: 'Buy TikTok Likes UK | Likes for Videos | NovaLikes',
  description:
    'Buy TikTok likes in the UK for public videos. Compare flexible packages, order without sharing your password and track your TikTok Likes order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukTtLikesFaqs = [
  {
    id: 'uk-tt-l-where-buy',
    question: 'Where can I buy TikTok Likes in the UK?',
    answer:
      'You can buy TikTok Likes in the UK through NovaLikes for eligible public TikTok videos. Choose an available Likes package, submit the direct public video link and complete checkout without sharing your password.',
  },
  {
    id: 'uk-tt-l-get-more',
    question: 'How can I get more TikTok Likes in the UK?',
    answer:
      'NovaLikes Likes packages can increase the visible Like count on an eligible public TikTok video. For organic engagement, continue improving your videos and reviewing genuine audience behaviour through TikTok analytics.',
  },
  {
    id: 'uk-tt-l-cheap',
    question: 'Can I buy cheap TikTok Likes in the UK?',
    answer:
      'NovaLikes offers multiple package options so you can compare current quantities and prices. When comparing lower-cost services, also review password requirements, tracking, platform rules and support.',
  },
  {
    id: 'uk-tt-l-real',
    question: 'What are real TikTok Likes?',
    answer:
      '"Real TikTok Likes" can mean different things depending on the provider. Review the actual service details rather than relying only on that phrase. NovaLikes Likes packages are designed to increase the visible Like count on eligible submitted videos.',
  },
  {
    id: 'uk-tt-l-how-many',
    question: 'How many TikTok Likes should I buy?',
    answer:
      'There is no single ideal quantity for every video. Consider the current Likes, View count, profile size, content purpose and the increase you actually want.',
  },
  {
    id: 'uk-tt-l-password',
    question: 'Do I need my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access.',
  },
  {
    id: 'uk-tt-l-info',
    question: 'What information do I need?',
    answer: 'You need the direct public TikTok video link and the Likes package you want to purchase.',
  },
  {
    id: 'uk-tt-l-cost',
    question: 'How much does it cost to buy TikTok Likes in the UK?',
    answer:
      'Pricing depends on the Likes package you select. NovaLikes displays the available quantities and current prices before checkout.',
  },
  {
    id: 'uk-tt-l-delivery',
    question: 'How long does it take to get TikTok Likes?',
    answer:
      'Processing time can vary depending on package quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-tt-l-views',
    question: 'Will buying TikTok Likes increase my Views?',
    answer: 'Not automatically. TikTok Views are a separate video-level metric and service.',
  },
  {
    id: 'uk-tt-l-followers',
    question: 'Will buying TikTok Likes increase my Followers?',
    answer: 'Not automatically. TikTok Followers are a separate profile-level metric.',
  },
  {
    id: 'uk-tt-l-fyp',
    question: 'Will buying TikTok Likes help me reach the For You feed?',
    answer: "There is no guarantee. Like count and TikTok's recommendation systems are separate outcomes.",
  },
  {
    id: 'uk-tt-l-viral',
    question: 'Will buying TikTok Likes make my video viral?',
    answer:
      'There is no guarantee. A Likes package changes the visible Like count on the selected video, not its organic distribution.',
  },
  {
    id: 'uk-tt-l-platform-rules',
    question: 'Does TikTok allow artificial engagement?',
    answer:
      'TikTok prohibits fake engagement and services that artificially increase engagement metrics.',
  },
  {
    id: 'uk-tt-l-risk-free',
    question: 'Is buying TikTok Likes risk-free?',
    answer:
      'No third-party TikTok engagement service should be described as completely risk-free or TikTok-approved. Review TikTok\'s current platform rules before ordering.',
  },
  {
    id: 'uk-tt-l-business',
    question: 'Can UK businesses buy TikTok Likes?',
    answer:
      'Eligible public TikTok videos used by UK businesses, creators, brands and agencies can use the relevant NovaLikes TikTok Likes packages.',
  },
  {
    id: 'uk-tt-l-local',
    question: 'Can local businesses use TikTok Likes?',
    answer:
      'Yes. Eligible public videos from local-business profiles can use TikTok Likes packages. Use them around content that accurately represents the real business.',
  },
  {
    id: 'uk-tt-l-older-video',
    question: 'Can I buy Likes for an older TikTok video?',
    answer:
      'If the video remains eligible and publicly accessible, it may be suitable for an order. Check the direct video URL and current service requirements first.',
  },
  {
    id: 'uk-tt-l-client',
    question: 'Can I order TikTok Likes for a client?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public video URL and review the order carefully.",
  },
  {
    id: 'uk-tt-l-wrong-url',
    question: 'What happens if I submit the wrong video link?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the exact public video link before checkout.',
  },
  {
    id: 'uk-tt-l-track',
    question: 'Can I track my TikTok Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-tt-l-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukTtLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom TikTok Likes content from supplied copy.');
