/**
 * Apply supplied United Kingdom TikTok Views copy.
 * Run: npx tsx scripts/patch-uk-tiktok-views.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-tiktok-views.json');
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
  title: 'Buy TikTok Views UK | Views for Videos | NovaLikes',
  description:
    'Buy TikTok views in the UK for public videos. Compare flexible view packages, order without sharing your password and track your TikTok Views order online.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR THE UK';
hero.title = 'Buy TikTok Views in the UK and Put More Attention Behind Your Videos';
hero.description =
  "Give the TikTok videos that matter most a stronger visible View count. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to buy TikTok Views for eligible public videos without sharing account login details. Choose the Views quantity and available package option that fits your content, submit the exact public TikTok video link and complete your order online. Whether you're supporting a product launch, creator collaboration, campaign video, local-business showcase or evergreen content, choose your Views around the individual video you're actually trying to strengthen.";
hero.primaryCta = { label: 'Choose Your TikTok Views Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-v-trust-public', label: 'Public Video Link Only' },
  { id: 'tt-v-trust-password', label: 'No Password Required' },
  { id: 'tt-v-trust-pricing', label: 'Clear Pricing' },
  { id: 'tt-v-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a TikTok Views Package That Fits Your Video';
pricing.description =
  'Different videos need different levels of support. NovaLikes currently offers multiple TikTok Views quantities, including 1K, 2K, 5K, 10K and 50K Views. High Quality and Premium package options are also available. Before choosing, consider the current View count, how important the video is, your account size, the purpose of the video, the increase you actually want and the package option.';
pricing.primaryCtaLabel = 'Compare TikTok Views Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-tt-v-where-buy',
  'uk-tt-v-get-more',
  'uk-tt-v-cheap',
  'uk-tt-v-packages',
  'uk-tt-v-real',
  'uk-tt-v-how-many',
  'uk-tt-v-hq-premium',
  'uk-tt-v-password',
  'uk-tt-v-info',
  'uk-tt-v-cost',
  'uk-tt-v-delivery',
  'uk-tt-v-likes',
  'uk-tt-v-followers',
  'uk-tt-v-fyp',
  'uk-tt-v-viral',
  'uk-tt-v-unique',
  'uk-tt-v-qualified',
  'uk-tt-v-creator-rewards',
  'uk-tt-v-platform-rules',
  'uk-tt-v-risk-free',
  'uk-tt-v-business',
  'uk-tt-v-local',
  'uk-tt-v-older-video',
  'uk-tt-v-client',
  'uk-tt-v-wrong-url',
  'uk-tt-v-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Put More Views Behind the TikTok Videos Worth Watching';
finalCta.description =
  'Choose the video you want to support, compare the available TikTok Views packages and submit the correct public video link without sharing your account login. Then keep strengthening what the View count cannot replace: strong video content, genuine viewer behaviour, real experience and a TikTok profile people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Views Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-views-uk',
  title: 'Why Choose NovaLikes for TikTok Views?',
  description: 'Buying TikTok Views should be easy to understand before checkout.',
  items: [
    {
      id: 'tt-v-wc-quantities',
      title: 'Multiple View Quantities',
      description: 'Compare the available packages and choose the number of Views that fits your video.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-v-wc-hq-premium',
      title: 'High Quality and Premium Options',
      description: 'Review the available package types before selecting the option you want.',
      icon: 'users',
    },
    {
      id: 'tt-v-wc-video',
      title: 'Views for a Specific Video',
      description: 'Your order applies to the eligible public TikTok video connected to the link you submit.',
      icon: 'sparkles',
    },
    {
      id: 'tt-v-wc-password',
      title: 'No TikTok Password Required',
      description: 'NovaLikes does not need your TikTok password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'tt-v-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the Views quantity, package type and current price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'tt-v-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'tt-v-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterwards for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'tt-v-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-tiktok-views-without-login-uk',
  title: 'Buy TikTok Views Without Sharing Your Login',
  description:
    'A TikTok Views order should not require control of your account. NovaLikes uses the public video information required for the service.',
  cards: [
    {
      id: 'tt-v-can-need',
      title: 'What You Need',
      description: 'The exact public TikTok video link and your selected Views package.',
      icon: 'users',
    },
    {
      id: 'tt-v-can-not-need',
      title: "What You Don't Need",
      description:
        'Your TikTok password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the link yourself. Make sure it leads directly to the exact TikTok video where you want the Views added. A TikTok profile URL is not the same as a direct video URL.',
};

config.doesBuyingHelp = {
  id: 'real-tiktok-views-uk',
  title: 'Looking for “Real TikTok Views”? Check What the Service Actually Provides',
  description:
    '"Real TikTok Views" is a common phrase used when comparing video engagement services. You may also see high-quality TikTok Views, premium TikTok Views or organic TikTok Views. Different providers may define those labels differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'Which video receives the Views?',
    'How many Views are included?',
    'Which package option am I selecting?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes TikTok Views Packages Do',
  limitItems: [
    'Increase the displayed View count on the eligible public video submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic reach, unique genuine viewers, Followers, Likes, For You feed distribution, customers or sales. Clear expectations make services easier to compare.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-views-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Views package and submitted TikTok video link are connected to the purchase. The order is then processed for that specific video.',
  steps: [
    {
      id: 'tt-v-th-1',
      title: 'Keep the Video Public',
      description: 'The submitted video should remain publicly accessible where required.',
    },
    {
      id: 'tt-v-th-2',
      title: 'Do Not Delete It During Processing',
      description: 'Removing the target video may interfere with an active order.',
    },
    {
      id: 'tt-v-th-3',
      title: 'Check the Link Carefully',
      description: 'Make sure your purchase points to the exact video you intended to use.',
    },
    {
      id: 'tt-v-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on the Views quantity, package option and current order conditions. Use NovaLikes order tracking for available status information rather than assuming every package follows one fixed delivery time.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'tiktok-views-likes-followers-uk',
  title: 'Views, Likes or Followers: Choose by Goal',
  description: 'Different TikTok services affect different metrics.',
  current: {
    title: 'TikTok Views',
    description: 'View count displayed on an eligible public TikTok video',
    bestFor: 'Video visibility',
    ctaLabel: 'TikTok Views',
  },
  likes: {
    title: 'TikTok Likes',
    description: 'Like count displayed on an eligible public TikTok video',
    bestFor: 'Video engagement',
    href: ukHref('/buy-tiktok-likes'),
    ctaLabel: 'Buy TikTok Likes',
  },
  views: {
    title: 'TikTok Followers',
    description: 'Follower count displayed on your public TikTok profile',
    bestFor: 'Profile audience size',
    href: ukHref('/buy-tiktok-followers'),
    ctaLabel: 'Buy TikTok Followers',
  },
  combinedNote:
    'Choose Views for video visibility. Choose Likes for video engagement. Choose Followers for profile audience size. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-views-uk',
  title: 'Before You Buy TikTok Views in the UK',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'tt-v-bb-video',
      title: 'Confirm the Exact Video',
      description: 'Open the public TikTok video you want to support.',
      icon: 'users',
    },
    {
      id: 'tt-v-bb-url',
      title: 'Copy the Direct Video Link',
      description: 'Do not submit only the general TikTok profile URL.',
      icon: 'sparkles',
    },
    {
      id: 'tt-v-bb-package',
      title: 'Choose the Package Option',
      description: 'Compare High Quality and Premium options where available.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-v-bb-quantity',
      title: 'Check the Views Quantity',
      description: "Make sure you're selecting the number of Views you actually want.",
      icon: 'credit-card',
    },
    {
      id: 'tt-v-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the quantity, package option and price before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'tt-v-bb-public',
      title: 'Keep the Video Public',
      description: 'Avoid deleting or restricting the submitted video while processing requires access.',
      icon: 'lock',
    },
    {
      id: 'tt-v-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your TikTok password.',
      icon: 'headphones',
    },
    {
      id: 'tt-v-bb-metric',
      title: 'Choose the Correct TikTok Service',
      description: 'Views, Likes and Followers are separate metrics.',
      icon: 'megaphone',
    },
    {
      id: 'tt-v-bb-platform',
      title: 'Understand Platform Risk',
      description: "Review TikTok's current platform rules if third-party engagement risk matters to you.",
      icon: 'shield-check',
    },
    {
      id: 'tt-v-bb-policies',
      title: 'Review NovaLikes Policies',
      description: 'Read the applicable service and refund information before completing checkout.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'view-count-not-watch-behaviour-uk',
  title: 'A Higher View Count Is Not the Same as Better Watch Behaviour',
  description:
    'A public View count tells you one thing about a TikTok video. It does not tell you everything about how genuine viewers interacted with the content.',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased Views change one visible metric. Use your genuine TikTok analytics to understand actual audience behaviour.',
  cards: [
    {
      id: 'tt-v-ww-watch',
      title: 'Watch Behaviour',
      description: 'Are genuine viewers staying with the video?',
      icon: 'clapperboard',
    },
    {
      id: 'tt-v-ww-completion',
      title: 'Completion',
      description: 'Are real viewers reaching the important part of the content?',
      icon: 'heart',
    },
    {
      id: 'tt-v-ww-rewatch',
      title: 'Rewatching',
      description: 'Does the video give people a reason to watch again?',
      icon: 'users',
    },
    {
      id: 'tt-v-ww-shares',
      title: 'Shares',
      description: 'Are genuine users choosing to send the content to others?',
      icon: 'briefcase',
    },
    {
      id: 'tt-v-ww-profile',
      title: 'Profile Activity',
      description: 'Does the video encourage genuine viewers to explore your profile?',
      icon: 'megaphone',
    },
  ],
};

config.packageSizes = {
  id: 'choose-tiktok-views-package-uk',
  title: 'Choose a TikTok Views Package That Fits Your Video',
  description:
    'NovaLikes currently offers multiple TikTok Views quantities, including 1K, 2K, 5K, 10K and 50K Views. High Quality and Premium package options are also available.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'tt-v-ps-count',
      quantity: 'The Current View Count',
      recommendedFor: 'Start with the number already displayed on the video.',
    },
    {
      id: 'tt-v-ps-importance',
      quantity: 'How Important the Video Is',
      recommendedFor: 'A product launch, collaboration or major campaign video may deserve more support than a routine upload.',
    },
    {
      id: 'tt-v-ps-account',
      quantity: 'Your Account Size',
      recommendedFor:
        'The same View quantity can look different on a newer creator profile and an established business account.',
    },
    {
      id: 'tt-v-ps-purpose',
      quantity: 'The Purpose of the Video',
      recommendedFor:
        'A product demonstration, tutorial, campaign video and local-business showcase may each serve different goals.',
    },
    {
      id: 'tt-v-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose around the individual video instead of automatically selecting the largest available package.',
    },
    {
      id: 'tt-v-ps-option',
      quantity: 'The Package Option',
      recommendedFor:
        'Compare the currently available High Quality and Premium options, quantity and price before checkout.',
    },
  ],
  bottomNote: 'Compare TikTok Views Packages',
};

config.bestPractices = {
  id: 'affordable-tiktok-views-uk',
  title: 'Looking for Affordable TikTok Views in the UK?',
  description:
    "If you're searching for cheap TikTok Views in the UK, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable TikTok Views service should make these details clear before checkout. NovaLikes lets you compare the currently available quantities, package options and prices before choosing.',
  items: [
    { id: 'tt-v-bp-1', title: 'Views Quantity', description: 'Check how many Views are included.', icon: 'users' },
    { id: 'tt-v-bp-2', title: 'High Quality or Premium Option', description: 'Compare available package types.', icon: 'clapperboard' },
    { id: 'tt-v-bp-3', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'tt-v-bp-4', title: 'Public Video Requirements', description: 'Confirm what public video link is required.', icon: 'sparkles' },
    { id: 'tt-v-bp-5', title: 'Password Policy', description: 'Check whether your TikTok password is requested.', icon: 'lock' },
    { id: 'tt-v-bp-6', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'tt-v-bp-7', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    { id: 'tt-v-bp-8', title: 'Relevant Service Policies', description: 'Review applicable service policies before paying.', icon: 'shield-check' },
    { id: 'tt-v-bp-9', title: 'What the Provider Actually Changes', description: 'Understand what the package actually changes.', icon: 'sparkles' },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-views-uk',
  title: 'Common Mistakes to Avoid When Buying TikTok Views',
  description: '',
  closingNote: '',
  items: [
    {
      id: 'tt-v-cm-profile',
      title: 'Submitting a Profile Link Instead of a Video Link',
      description: 'A TikTok Views order should use the direct public URL of the individual video.',
    },
    {
      id: 'tt-v-cm-service',
      title: 'Choosing the Wrong TikTok Service',
      description: 'Views, Likes and Followers are separate metrics.',
    },
    {
      id: 'tt-v-cm-quantity',
      title: 'Selecting the Wrong Quantity',
      description: 'Review the selected Views package before checkout.',
    },
    {
      id: 'tt-v-cm-option',
      title: 'Ignoring the Package Option',
      description: 'Check whether you are selecting High Quality or Premium where those options are available.',
    },
    {
      id: 'tt-v-cm-delete',
      title: 'Deleting the Video During Processing',
      description: 'Keep the submitted video accessible while an active order requires it.',
    },
    {
      id: 'tt-v-cm-other-metrics',
      title: 'Expecting Likes or Followers Automatically',
      description: 'A Views package does not automatically include other TikTok metrics.',
    },
    {
      id: 'tt-v-cm-fyp',
      title: 'Treating Views as Guaranteed FYP Reach',
      description: 'A visible View count and recommendation through the For You feed are different outcomes.',
    },
    {
      id: 'tt-v-cm-content',
      title: 'Treating Views as a Replacement for Content',
      description: 'Purchased Views change one metric. Your content strategy still depends on what you publish.',
    },
  ],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-tiktok-followers': {
      title: 'TikTok Followers',
      description:
        'Choose Followers when you want to increase the follower count displayed on your public TikTok profile.',
      ctaLabel: 'Buy TikTok Followers',
    },
    'buy-tiktok-likes': {
      title: 'TikTok Likes',
      description:
        'Choose Likes when you want more visible engagement on an eligible public TikTok video.',
      ctaLabel: 'Buy TikTok Likes',
    },
  },
};

dummy.whyBuy = {
  id: 'which-tiktok-videos-worth-views-uk',
  title: 'Which TikTok Videos Are Worth Putting More Views Behind?',
  description:
    'You do not need to add Views to every video you publish. A more focused approach is to identify content that already has a clear purpose.',
  items: [
    {
      id: 'tt-v-wb-demo',
      title: 'Product Demonstrations',
      description: 'Support the video that clearly shows how a product looks, works or solves a problem.',
    },
    {
      id: 'tt-v-wb-collab',
      title: 'Creator Collaborations',
      description: 'Put additional visible attention behind the content that best represents the partnership.',
    },
    {
      id: 'tt-v-wb-showcase',
      title: 'Business Showcases',
      description: 'Use Views around videos showing genuine services, projects, products or locations.',
    },
    {
      id: 'tt-v-wb-campaign',
      title: 'Campaign Videos',
      description: 'Focus on the video carrying the main message of a wider campaign.',
    },
    {
      id: 'tt-v-wb-educational',
      title: 'Educational Videos',
      description: 'Tutorials, explainers and useful tips may continue representing the account after publication.',
    },
    {
      id: 'tt-v-wb-portfolio',
      title: 'Portfolio Content',
      description:
        'Creators and service businesses can support videos showing work they genuinely want potential customers or partners to see.',
    },
    {
      id: 'tt-v-wb-evergreen',
      title: 'Evergreen Videos',
      description:
        'Strong content that remains relevant can make more sense to support than a short-lived trend.',
    },
  ],
  bottomNote: 'Choose the video first. Then decide whether additional Views fit its role.',
};

dummy.howToBuy = {
  id: 'how-tiktok-views-order-works-uk',
  title: 'How Your TikTok Views Order Works',
  description: 'Choose your video, compare packages, submit the link, review your order and track the status afterwards.',
  steps: [
    {
      id: 'tt-v-step-1',
      title: 'Choose the Video',
      description: 'Start with the exact public TikTok video you want to support.',
    },
    {
      id: 'tt-v-step-2',
      title: 'Select Your Views Package',
      description: 'Compare the available quantities, package options and current prices.',
    },
    {
      id: 'tt-v-step-3',
      title: 'Submit the Direct Video Link',
      description: 'Paste the correct public TikTok video URL.',
    },
    {
      id: 'tt-v-step-4',
      title: 'Review Your Order',
      description: 'Check the video, Views quantity, package option and current price.',
    },
    {
      id: 'tt-v-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your TikTok password.',
    },
    {
      id: 'tt-v-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy TikTok Views in the UK?',
  text: 'You can buy TikTok Views in the UK through NovaLikes for eligible public videos. Choose an available Views package, submit the direct public TikTok video URL and complete checkout without sharing your password. The service increases the View count displayed on that specific video. It does not automatically increase your TikTok Followers or Likes.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Creators, Businesses and Brands',
    lead: 'TikTok video can serve very different purposes depending on the account behind it.',
    paragraphs: [
      'A creator in London may publish videos around fashion, beauty, entertainment, food, fitness or education. An ecommerce brand in Manchester may use TikTok for product demonstrations and launches. A local business in Birmingham, Leeds, Glasgow, Liverpool, Bristol or another UK market may use video to show genuine services and recent activity. An agency may manage several client campaigns with different video goals. An established brand may use TikTok alongside Instagram, ecommerce, paid media, search, email and creator partnerships.',
      'That means your TikTok Views strategy should fit the content.',
    ],
    footer: 'Views can support presentation. The video behind the number still needs a reason to be watched.',
    items: [
      { title: 'Creators', body: 'Support videos that best represent your niche, personality or expertise.' },
      { title: 'Ecommerce Brands', body: 'Focus on product demonstrations, launches and priority campaign videos.' },
      { title: 'Local Businesses', body: 'Use Views around content showing real services, locations, projects and products.' },
      { title: 'Agencies', body: 'Choose View quantities according to individual client videos rather than applying one fixed package everywhere.' },
      { title: 'Established Brands', body: 'Put more visible attention behind priority content while continuing genuine publishing and paid campaigns.' },
    ],
  },
  {
    id: 'uk-campaign-moments',
    title: 'Put More Views Behind Important UK Campaign Moments',
    lead: 'Some TikTok videos matter more because of the campaign around them.',
    footer:
      'Visible Views can support campaign presentation. The campaign itself still needs strong creative, accurate information and a useful offer.',
    items: [
      { title: 'Black Friday', body: 'UK retailers and ecommerce brands may have high-priority TikTok content around Black Friday promotions.' },
      { title: 'Cyber Monday', body: 'Online businesses may use TikTok alongside email, paid media and ecommerce campaigns during Cyber Monday.' },
      { title: 'Boxing Day', body: 'Retailers and ecommerce brands may have another important campaign period around Boxing Day sales.' },
      { title: 'Christmas Campaigns', body: 'Gift ideas, festive products, hospitality offers, events and seasonal content can become priority videos.' },
      { title: 'January Sales', body: 'Retail and ecommerce businesses may continue promotional activity into January.' },
      { title: 'Product Launches', body: 'Support the video that best introduces or demonstrates the new product.' },
      { title: 'Creator Partnerships', body: 'Put Views behind the strongest collaboration video rather than unrelated content.' },
      { title: 'New Location Openings', body: 'Businesses expanding into another town, city or region can use TikTok to introduce the location, service or team.' },
    ],
  },
  {
    id: 'visible-momentum',
    title: 'Give Strong TikTok Videos More Visible Momentum',
    lead: 'View count is one of the public metrics someone may notice when they encounter a TikTok video. They may also see:',
    bullets: ['Likes', 'Comments', 'Shares', 'caption', 'creator profile', 'video quality', 'overall account activity'],
    paragraphs: [
      'A higher visible View count can support how active the video appears. But it cannot improve weak content by itself.',
      'The opening matters. The subject matters. The visuals matter. The message matters.',
    ],
    footer: 'Views can support presentation. The video still needs to give genuine viewers a reason to keep watching.',
  },
  {
    id: 'watch-behaviour',
    title: 'A Higher View Count Is Not the Same as Better Watch Behaviour',
    lead: 'A public View count tells you one thing about a TikTok video. It does not tell you everything about how genuine viewers interacted with the content. When reviewing your actual video performance, also consider:',
    footer: 'Purchased Views change one visible metric. Use your genuine TikTok analytics to understand actual audience behaviour.',
    items: [
      { title: 'Watch Behaviour', body: 'Are genuine viewers staying with the video?' },
      { title: 'Completion', body: 'Are real viewers reaching the important part of the content?' },
      { title: 'Rewatching', body: 'Does the video give people a reason to watch again?' },
      { title: 'Shares', body: 'Are genuine users choosing to send the content to others?' },
      { title: 'Comments', body: 'What are real viewers actually asking or saying?' },
      { title: 'Profile Activity', body: 'Does the video encourage genuine viewers to explore your profile?' },
    ],
  },
  {
    id: 'fyp-reach',
    title: 'Views and For You Feed Reach Are Different Things',
    lead: 'A visible TikTok View count and recommendation through the For You feed are not the same outcome. A higher View count should not automatically be treated as a guarantee of:',
    bullets: [
      'For You feed placement',
      'viral distribution',
      'organic Followers',
      'additional Likes',
      'more Comments',
      'higher TikTok Search visibility',
      'brand partnerships',
      'website traffic',
      'customers',
      'sales',
    ],
    paragraphs: [
      'NovaLikes TikTok Views packages are designed around the View count displayed on the selected eligible public video.',
      'TikTok controls content recommendation separately. Use Views for the metric they actually change.',
    ],
  },
  {
    id: 'build-videos',
    title: 'Build TikTok Videos for People, Not Just View Counts',
    lead: 'If TikTok matters to your long-term strategy, continue improving the actual content.',
    footer: 'Views can support the visible number. Content determines whether real viewers want to keep watching.',
    items: [
      { title: 'Make the Opening Clear', body: 'Give viewers a reason to understand the subject quickly.' },
      { title: 'Show the Main Value Early', body: 'Do not hide the strongest part of the video behind a long introduction.' },
      { title: 'Keep the Video Focused', body: 'One clear idea can be easier to follow than several unrelated messages.' },
      { title: 'Show Rather Than Only Tell', body: "Use TikTok's visual format to demonstrate products, processes, projects, transformations or ideas." },
      { title: 'Keep On-Screen Text Readable', body: 'Text should support the video rather than overwhelm it.' },
      { title: 'Develop Repeatable Formats', body: 'If genuine viewers respond well to a format, build more around it.' },
      { title: 'Learn From Real Performance', body: 'Use actual TikTok analytics to understand which videos hold genuine attention.' },
    ],
  },
  {
    id: 'unique-viewers',
    title: 'Views Are Not the Same as Unique Viewers',
    paragraphs: [
      'A public View count should not automatically be interpreted as the exact number of unique people who saw the video. View activity and unique audience size are different concepts.',
      'That distinction matters when you\'re evaluating your TikTok performance. If your goal is to understand real audience size or genuine campaign exposure, review the analytics available through your own TikTok account rather than treating the public View counter as a complete audience report.',
      'Use purchased Views for the visible View metric they provide. Use genuine analytics for wider audience analysis.',
    ],
  },
  {
    id: 'monetisation-views',
    title: 'Public TikTok Views and Qualified Monetisation Views Are Not the Same Metric',
    lead: 'If TikTok monetisation is part of your goal, do not assume every public View is treated identically inside a monetisation programme. TikTok can apply separate eligibility and qualification rules to specialised metrics used for creator rewards. That means a public video View count should not automatically be treated as:',
    bullets: [
      'a qualified rewards View',
      'monetisable activity',
      'guaranteed Creator Rewards eligibility',
      'guaranteed earnings',
    ],
    paragraphs: [
      'Third-party purchased Views should not be promoted as a way to qualify for or increase TikTok monetisation earnings.',
      'If a particular creator programme matters to you, review its current official eligibility and qualified-view requirements.',
    ],
  },
  {
    id: 'views-not-likes',
    title: "More TikTok Views Don't Automatically Mean More Likes",
    paragraphs: [
      'Views and Likes are separate actions. Someone can watch a TikTok video without tapping Like. A viewer may instead continue scrolling, comment, share, visit your profile, follow or take no further action.',
      'That means a higher View count should not automatically be expected to produce a matching increase in Likes. If Likes are the metric you specifically want to change, choose the TikTok Likes service instead.',
    ],
  },
  {
    id: 'profile-experience',
    title: 'Turn Video Views Into a Better TikTok Profile Experience',
    lead: 'A TikTok video may be someone\'s first interaction with your account. If they become interested, they may visit your profile next. Make that visit useful.',
    footer: 'Views can support the video. The profile behind it determines what happens next.',
    items: [
      { title: 'Keep Your Bio Focused', body: 'Explain who you are or what the account is about.' },
      { title: 'Pin Strong Videos', body: 'Help visitors find your best or most useful content quickly.' },
      { title: 'Keep Your Niche Recognisable', body: 'Make it easy to understand what someone can expect from the account.' },
      { title: 'Maintain Recent Activity', body: 'A profile with current videos gives the View count more context.' },
      {
        title: 'Give Business Visitors a Next Step',
        body: 'If TikTok supports a business, make it easy for interested viewers to learn more, shop, enquire or visit your website.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'TikTok Views for UK Local Businesses',
    paragraphs: [
      'TikTok can help local businesses show potential customers what they actually do.',
      'A restaurant may show food preparation. A builder may publish a project transformation. A salon may show a finished treatment. A retailer may demonstrate new stock. An estate agency may showcase a property. A fitness studio may publish training content. A tourism business may show an experience. An interior designer may showcase a completed space. A local service company may explain its process.',
      "If you're supporting these videos with Views, make sure the content accurately represents the real business.",
    ],
    footer: 'Visible activity can support presentation. Local trust comes from genuine business activity.',
  },
  {
    id: 'real-experience',
    title: 'Support Real Experience With Better TikTok Videos',
    lead: 'Some of the strongest TikTok content comes from things you genuinely know, sell or do.',
    footer: 'Views can support visible activity around this content. Experience gives the video substance.',
    items: [
      { title: 'Show Real Work', body: 'Use actual projects and completed results instead of generic claims.' },
      { title: 'Demonstrate Real Products', body: 'Show how products look, work or fit into real situations.' },
      { title: 'Explain Processes You Understand', body: 'Use genuine expertise to answer useful questions.' },
      { title: 'Share Practical Knowledge', body: 'Turn repeated customer questions into helpful videos.' },
      { title: 'Show Behind the Scenes', body: 'Real people, locations and processes can make content more useful.' },
      { title: 'Share Original Experience', body: 'Your own perspective can add value that generic content cannot.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use TikTok Views Alongside Genuine Customer Proof',
    paragraphs: [
      'A larger View count can contribute to how active a video appears. It is not the same as genuine customer evidence.',
      'For UK businesses, deeper trust can also come from verified reviews, authentic testimonials, completed projects, case studies, real customer comments, customer-created content, accurate company information and responsive customer service.',
      'If your business has genuine proof, use it.',
    ],
    footer: 'Views can support presentation. Actual customer experience provides stronger credibility.',
  },
  {
    id: 'brand-partnerships',
    title: 'Put TikTok Views in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about View counts when preparing for collaborations. But professional brands and agencies can evaluate much more than one public number.',
      'They may consider creator niche, video quality, genuine audience fit, watch behaviour, authentic engagement, consistency, previous partnerships, professionalism, communication and campaign results.',
      'If partnerships matter to you, build the whole profile. Publish strong videos. Keep genuine analytics available where appropriate.',
    ],
    footer: 'Treat Views as one signal rather than proof of influence by themselves.',
  },
  {
    id: 'business-results',
    title: "More TikTok Views Don't Automatically Mean More Business",
    paragraphs: [
      'A stronger View count can make a video appear more active. It does not automatically create commercial results.',
      'For a UK business, useful outcomes might include online sales, website visits, customer enquiries, bookings, shop visits, calls, genuine messages or product interest.',
      'Those outcomes depend on more than one public View number. The video, offer, audience, website and customer experience all matter.',
      'Measure real business results separately from purchased TikTok Views.',
    ],
  },
  {
    id: 'platform-rules',
    title: 'TikTok Platform Rules and Third-Party Views',
    paragraphs: [
      'Third-party engagement services should not be treated as official TikTok growth programmes. TikTok maintains rules around fake and artificially inflated engagement, so no third-party Views service should be described as TikTok-approved, completely risk-free or guaranteed safe.',
      'Platform rules and enforcement can change. If account compliance or platform risk matters to you, review TikTok\'s current rules before ordering third-party engagement services.',
      'Use NovaLikes for the visible View metric described by the service and keep that separate from organic TikTok performance.',
    ],
  },
  {
    id: 'hq-premium',
    title: 'High Quality or Premium TikTok Views: Compare the Current Options',
    paragraphs: [
      'NovaLikes currently provides High Quality and Premium TikTok Views options. Before selecting one, compare Views quantity, package option, current price, available savings and public video requirements.',
      'Do not choose based only on the package label. Review the actual quantity, price and service option currently displayed before checkout.',
    ],
  },
  {
    id: 'tiktok-analytics',
    title: 'Use TikTok Analytics to Understand Genuine Video Performance',
    lead: 'Purchased Views change one visible metric. Your genuine TikTok analytics can provide more useful information about real audience behaviour. Review:',
    footer: 'Use actual performance data when deciding what to publish next. Do not rely only on the public View count.',
    items: [
      { title: 'Genuine Video Performance', body: 'Which videos naturally attract the most attention?' },
      { title: 'Watch Behaviour', body: 'How are genuine users consuming your videos?' },
      { title: 'Real Comments', body: 'What questions and reactions appear organically?' },
      { title: 'Shares', body: 'Which videos are people choosing to send to others?' },
      { title: 'Profile Activity', body: 'Which content encourages genuine viewers to explore your account?' },
      { title: 'Organic Followers', body: 'Which videos persuade real users to stay?' },
    ],
  },
  {
    id: 'video-growth-framework',
    title: 'A Practical TikTok Video Growth Framework for UK Accounts',
    lead: 'Views can support selected videos, but a stronger TikTok strategy requires more than one metric.',
    footer:
      'Visible Views can support presentation. Long-term growth still depends on the content and genuine audience behind them.',
    items: [
      { title: 'Define Your Video Direction', body: 'Make your niche, business or brand easy to understand.' },
      { title: 'Identify Priority Videos', body: 'Know which content actually deserves additional attention.' },
      { title: 'Improve Your Openings', body: 'Test different ways to communicate the idea quickly.' },
      { title: 'Develop Repeatable Formats', body: 'Turn genuinely successful concepts into recurring video series.' },
      { title: 'Review Real Analytics', body: 'Use TikTok performance data to understand genuine viewer behaviour.' },
      { title: 'Learn From Genuine Comments', body: 'Real audience questions can reveal useful future content ideas.' },
      { title: 'Build the Profile Behind the Video', body: 'Make sure someone who visits your account finds more relevant content.' },
      {
        title: 'Connect TikTok to Wider Marketing',
        body: 'UK businesses may use TikTok alongside Instagram, ecommerce, SEO, Google Ads, paid social, email and their website.',
      },
      {
        title: 'Keep Views in Perspective',
        body: 'Visible Views can support presentation. Long-term growth still depends on the content and genuine audience behind them.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-views'] = {
  title: 'Buy TikTok Views UK | Views for Videos | NovaLikes',
  description:
    'Buy TikTok views in the UK for public videos. Compare flexible view packages, order without sharing your password and track your TikTok Views order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukTtViewsFaqs = [
  {
    id: 'uk-tt-v-where-buy',
    question: 'Where can I buy TikTok Views in the UK?',
    answer:
      'You can buy TikTok Views in the UK through NovaLikes for eligible public TikTok videos. Choose an available Views package, submit the direct public video link and complete checkout without sharing your password.',
  },
  {
    id: 'uk-tt-v-get-more',
    question: 'How can I get more TikTok Views in the UK?',
    answer:
      'NovaLikes Views packages can increase the View count displayed on an eligible public TikTok video. For organic growth, continue improving your videos and reviewing genuine audience behaviour through TikTok analytics.',
  },
  {
    id: 'uk-tt-v-cheap',
    question: 'Can I buy cheap TikTok Views in the UK?',
    answer:
      'NovaLikes offers multiple View quantities and package options so you can compare current prices. When comparing lower-cost services, also review package type, password requirements, tracking, support and what the service actually changes.',
  },
  {
    id: 'uk-tt-v-packages',
    question: 'What TikTok Views packages does NovaLikes offer?',
    answer:
      'NovaLikes currently shows multiple quantities including 1K, 2K, 5K, 10K and 50K Views, with High Quality and Premium options available. Review the current package selector before ordering.',
  },
  {
    id: 'uk-tt-v-real',
    question: 'What are real TikTok Views?',
    answer:
      '"Real TikTok Views" can mean different things depending on the provider. Review the actual service details instead of relying only on that phrase. NovaLikes Views packages are designed to increase the displayed View count on eligible submitted videos.',
  },
  {
    id: 'uk-tt-v-how-many',
    question: 'How many TikTok Views should I buy?',
    answer:
      'There is no single ideal quantity for every video. Consider the current View count, profile size, campaign purpose and the visible increase you actually want.',
  },
  {
    id: 'uk-tt-v-hq-premium',
    question: 'What is the difference between High Quality and Premium TikTok Views?',
    answer:
      'NovaLikes currently provides High Quality and Premium package options. Compare the current quantity, package details and pricing shown before selecting one rather than assuming the package label alone tells you everything.',
  },
  {
    id: 'uk-tt-v-password',
    question: 'Do I need my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access.',
  },
  {
    id: 'uk-tt-v-info',
    question: 'What information do I need?',
    answer: 'You need the direct public TikTok video link and the Views package you want to purchase.',
  },
  {
    id: 'uk-tt-v-cost',
    question: 'How much does it cost to buy TikTok Views in the UK?',
    answer:
      'Pricing depends on the Views quantity and package option you select. NovaLikes displays the current prices before checkout.',
  },
  {
    id: 'uk-tt-v-delivery',
    question: 'How long does it take to get TikTok Views?',
    answer:
      'Processing time can vary depending on the selected quantity, package option and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-tt-v-likes',
    question: 'Will buying TikTok Views increase my Likes?',
    answer: 'Not automatically. TikTok Likes are a separate video-level metric and service.',
  },
  {
    id: 'uk-tt-v-followers',
    question: 'Will buying TikTok Views increase my Followers?',
    answer: 'Not automatically. TikTok Followers are a separate profile-level metric.',
  },
  {
    id: 'uk-tt-v-fyp',
    question: 'Will buying TikTok Views help me reach the For You feed?',
    answer: "There is no guarantee. A public View count and TikTok's recommendation systems are separate outcomes.",
  },
  {
    id: 'uk-tt-v-viral',
    question: 'Will buying TikTok Views make my video viral?',
    answer:
      'There is no guarantee. A Views package changes the displayed View count on the selected video rather than guaranteeing organic distribution.',
  },
  {
    id: 'uk-tt-v-unique',
    question: 'Are TikTok Views the same as unique viewers?',
    answer:
      'Not necessarily. A public View count should not automatically be treated as the exact number of unique people who watched a video.',
  },
  {
    id: 'uk-tt-v-qualified',
    question: 'Are public TikTok Views the same as qualified Creator Rewards Views?',
    answer:
      'No. Creator Rewards can use separate qualification requirements. A public View count should not automatically be treated as qualified monetisation activity.',
  },
  {
    id: 'uk-tt-v-creator-rewards',
    question: 'Will purchased TikTok Views qualify me for Creator Rewards?',
    answer:
      "Do not assume third-party purchased Views will qualify an account or video for Creator Rewards. Review TikTok's current official programme requirements.",
  },
  {
    id: 'uk-tt-v-platform-rules',
    question: 'Does TikTok allow artificial engagement?',
    answer:
      'TikTok maintains policies against fake and artificially inflated engagement. Review the current platform rules before using third-party engagement services.',
  },
  {
    id: 'uk-tt-v-risk-free',
    question: 'Is buying TikTok Views risk-free?',
    answer:
      'No third-party TikTok engagement service should be described as completely risk-free or officially TikTok-approved.',
  },
  {
    id: 'uk-tt-v-business',
    question: 'Can UK businesses buy TikTok Views?',
    answer:
      'Eligible public TikTok videos used by UK businesses, creators, brands and agencies can use the relevant NovaLikes TikTok Views packages.',
  },
  {
    id: 'uk-tt-v-local',
    question: 'Can local businesses use TikTok Views?',
    answer:
      'Yes. Eligible public videos from local-business profiles can use Views packages. Use them around content that accurately represents the real business.',
  },
  {
    id: 'uk-tt-v-older-video',
    question: 'Can I buy Views for an older TikTok video?',
    answer:
      'If the video remains eligible and publicly accessible, it may be suitable for an order. Check the direct video URL and current service requirements first.',
  },
  {
    id: 'uk-tt-v-client',
    question: 'Can I order TikTok Views for a client?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public TikTok video link and review the order details carefully.",
  },
  {
    id: 'uk-tt-v-wrong-url',
    question: 'What happens if I submit the wrong video link?',
    answer:
      'Contact NovaLikes support as soon as possible with your order information. Always verify the exact public video link before checkout.',
  },
  {
    id: 'uk-tt-v-track',
    question: 'Can I track my TikTok Views order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-tt-v-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukTtViewsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom TikTok Views content from supplied copy.');
