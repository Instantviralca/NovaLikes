/**
 * Apply supplied United Kingdom Instagram Views copy.
 * Run: npx tsx scripts/patch-uk-ig-views.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-instagram-views.json');
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
  title: 'Buy Instagram Views UK | Reels & Videos | NovaLikes',
  description:
    'Buy Instagram views in the UK for public Reels and videos. Compare flexible packages, order without sharing your password and track your purchase online.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR THE UK';
hero.title = 'Buy Instagram Views in the UK and Give Your Reels More Visible Reach';
hero.description =
  "Put more visible attention behind the Instagram Reels and videos that matter most. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to buy Instagram Views for eligible public video content without sharing account login details. Choose the number of Views you want, submit the exact public Reel or video URL and complete your order online. Whether you're supporting a product launch, creator collaboration, campaign Reel, business showcase or evergreen video, choose a Views package around the content you're actually trying to strengthen.";
hero.primaryCta = { label: 'Choose Your Instagram Views Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-v-trust-public', label: 'Public Reel or Video URL Only' },
  { id: 'ig-v-trust-password', label: 'No Password Required' },
  { id: 'ig-v-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-v-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose an Instagram Views Package That Fits Your Video';
pricing.description =
  'Different videos have different purposes. NovaLikes currently offers 100, 500, 1K, 2K, 3K, 5K, 10K and 25K Views. A regular Reel may only need a smaller increase. A product launch, campaign video or important evergreen Reel may justify something larger. Before choosing, consider the current View count, how important the content is, your profile size, the purpose of the video and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Views Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-ig-v-where-buy',
  'uk-ig-v-get-more',
  'uk-ig-v-cheap',
  'uk-ig-v-real',
  'uk-ig-v-how-many',
  'uk-ig-v-reels',
  'uk-ig-v-password',
  'uk-ig-v-info',
  'uk-ig-v-cost',
  'uk-ig-v-delivery',
  'uk-ig-v-followers',
  'uk-ig-v-likes',
  'uk-ig-v-organic-reach',
  'uk-ig-v-viral',
  'uk-ig-v-business',
  'uk-ig-v-local',
  'uk-ig-v-older-reel',
  'uk-ig-v-client',
  'uk-ig-v-wrong-url',
  'uk-ig-v-track',
];

related.title = 'Explore More Instagram Services';
related.description =
  'Choose Followers for your profile, Likes for visible engagement on a post or Reel, or Comments for conversation around eligible content.';

finalCta.title = 'Put More Views Behind the Instagram Reels Worth Watching';
finalCta.description =
  'Choose the Reel or video you want to support, select an Instagram Views package that fits the content and submit the correct public URL without sharing your login details. Then keep strengthening what the View count cannot replace: strong creative, useful video content, genuine viewer behaviour and an Instagram profile people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Views Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-views-uk',
  title: 'Why Choose NovaLikes for Instagram Views?',
  description: 'Buying Instagram Views should be easy to understand before checkout.',
  items: [
    {
      id: 'ig-v-wc-video',
      title: 'Views for Specific Reels and Videos',
      description: 'Your order applies to the eligible public video content connected to the URL you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-v-wc-packages',
      title: 'Flexible View Quantities',
      description: 'Choose from smaller and larger packages depending on the individual video.',
      icon: 'users',
    },
    {
      id: 'ig-v-wc-password',
      title: 'No Instagram Password Required',
      description: 'NovaLikes does not need your Instagram password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'ig-v-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the selected Views quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'ig-v-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'ig-v-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterwards for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'ig-v-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with your relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-instagram-views-without-login-uk',
  title: 'Buy Instagram Views Without Sharing Your Login',
  description:
    'An Instagram Views order should not require control of your account. NovaLikes uses the public video information required for the service.',
  cards: [
    {
      id: 'ig-v-can-need',
      title: 'What You Need',
      description: 'The exact public Instagram Reel or video URL and your selected Views package.',
      icon: 'users',
    },
    {
      id: 'ig-v-can-not-need',
      title: "What You Don't Need",
      description: 'Your Instagram password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the link yourself and make sure it points directly to the video you want to support. A general Instagram profile URL is not the correct target for a Views order.',
};

config.doesBuyingHelp = {
  id: 'real-instagram-views-uk',
  title: 'Looking for “Real Instagram Views”? Check What the Service Actually Provides',
  description:
    '"Real Instagram Views" is a common phrase used when comparing video engagement services. You may also see high-quality Instagram Views, active Instagram Views or organic Instagram Views. Different providers may define these labels differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'Which Reel or video receives the Views?',
    'How many Views are included?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Instagram Views Packages Do',
  limitItems: [
    'Increase the displayed View count on the eligible public content submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic reach, unique genuine viewers, Followers, Likes, Comments, customers or sales. Clear expectations make comparison easier.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-views-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Views package and submitted Instagram content URL are connected to the purchase. The order is then processed for that specific Reel or video.',
  steps: [
    {
      id: 'ig-v-th-1',
      title: 'Keep the Content Public',
      description: 'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'ig-v-th-2',
      title: 'Do Not Delete It During Processing',
      description: 'Removing the target Reel or video may interfere with an active order.',
    },
    {
      id: 'ig-v-th-3',
      title: 'Check the URL Carefully',
      description: 'Make sure your order points to the exact content you intended to use.',
    },
    {
      id: 'ig-v-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'views-likes-followers-comments-uk',
  title: 'Views, Likes, Followers or Comments: Choose by Goal',
  description: 'Different Instagram services affect different metrics.',
  current: {
    title: 'Instagram Views',
    description: 'View count displayed on an eligible public Reel or video',
    bestFor: 'Video content',
    ctaLabel: 'Instagram Views',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Like count displayed on an eligible public post or Reel',
    bestFor: 'Visible engagement',
    href: ukHref('/buy-instagram-likes'),
    ctaLabel: 'Buy Instagram Likes',
  },
  views: {
    title: 'Instagram Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile audience size',
    href: ukHref('/buy-instagram-followers'),
    ctaLabel: 'Buy Instagram Followers',
  },
  combinedNote:
    'Choose Views for video content. Choose Likes for visible engagement. Choose Followers for profile audience size. Choose Comments for visible conversation. One service does not automatically include the others.',
  commentsHref: ukHref('/buy-instagram-comments'),
};

config.beforeBuying = {
  id: 'before-you-buy-instagram-views-uk',
  title: 'Before You Buy Instagram Views in the UK',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'ig-v-bb-open',
      title: 'Confirm the Exact Reel or Video',
      description: 'Open the public content you want to support.',
      icon: 'users',
    },
    {
      id: 'ig-v-bb-url',
      title: 'Copy the Direct URL',
      description: 'Do not submit only the general Instagram profile link.',
      icon: 'sparkles',
    },
    {
      id: 'ig-v-bb-quantity',
      title: 'Check the Views Quantity',
      description: "Make sure you're selecting the number of Views you actually want.",
      icon: 'credit-card',
    },
    {
      id: 'ig-v-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package quantity and price before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'ig-v-bb-available',
      title: 'Keep the Content Public',
      description: 'Avoid deleting or restricting the submitted video while processing requires access.',
      icon: 'lock',
    },
    {
      id: 'ig-v-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Instagram password.',
      icon: 'lock',
    },
    {
      id: 'ig-v-bb-service',
      title: 'Choose the Correct Instagram Service',
      description: 'Views, Likes, Followers and Comments are separate metrics.',
      icon: 'users',
    },
    {
      id: 'ig-v-bb-policies',
      title: 'Review the Policies',
      description: 'Read the applicable service and refund information before completing your purchase.',
      icon: 'headphones',
    },
  ],
};

config.worldwide = {
  id: 'instagram-reel-growth-framework-uk',
  title: 'A Practical Instagram Reel Growth Framework for UK Accounts',
  description:
    'Views can support selected videos, but a stronger Instagram strategy needs more than one number.',
  eyebrow: 'Reel Strategy',
  closingNote:
    'Visible Views can support presentation. Long-term growth comes from content, positioning and genuine audience behaviour.',
  cards: [
    {
      id: 'ig-v-ww-direction',
      title: 'Define Your Video Direction',
      description: 'Make your creator niche, business or brand easy to understand.',
      icon: 'megaphone',
    },
    {
      id: 'ig-v-ww-priority',
      title: 'Identify Priority Reels',
      description: 'Know which videos actually deserve more attention.',
      icon: 'heart',
    },
    {
      id: 'ig-v-ww-openings',
      title: 'Improve Your Openings',
      description: 'Test different ways to communicate the idea quickly.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-v-ww-insights',
      title: 'Review Genuine Analytics',
      description: 'Use Instagram Insights to understand real viewer behaviour.',
      icon: 'users',
    },
  ],
};

config.packageSizes = {
  id: 'choose-views-package-uk',
  title: 'Choose an Instagram Views Package That Fits Your Video',
  description:
    'NovaLikes currently offers 100, 500, 1K, 2K, 3K, 5K, 10K and 25K Views. Consider the current View count, how important the content is, your profile size, the purpose of the video and the increase you actually want.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'ig-v-ps-count',
      quantity: 'The Current View Count',
      recommendedFor: 'Start with the number already displayed on the Reel or video.',
    },
    {
      id: 'ig-v-ps-content',
      quantity: 'How Important the Content Is',
      recommendedFor: 'A priority campaign video may deserve more support than a routine upload.',
    },
    {
      id: 'ig-v-ps-account',
      quantity: 'Your Profile Size',
      recommendedFor:
        'The same View quantity can look different on a newer creator account and an established brand profile.',
    },
    {
      id: 'ig-v-ps-purpose',
      quantity: 'The Purpose of the Video',
      recommendedFor:
        'A tutorial, product demonstration, campaign Reel and portfolio video all serve different goals.',
    },
    {
      id: 'ig-v-ps-goal',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose according to the individual video rather than automatically selecting the largest package.',
    },
  ],
  bottomNote: 'Compare Instagram Views Packages',
};

config.bestPractices = {
  id: 'affordable-instagram-views-uk',
  title: 'Looking for Affordable Instagram Views in the UK?',
  description:
    "If you're searching for cheap Instagram Views in the UK, price will naturally be part of the comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Instagram Views service should make these details clear before checkout. NovaLikes lets you compare the available quantities and current prices before choosing.',
  items: [
    { id: 'ig-v-bp-1', title: 'Number of Views Included', description: 'Review how many Views are in the package.', icon: 'users' },
    { id: 'ig-v-bp-2', title: 'Current Package Price', description: 'Check pricing before checkout.', icon: 'credit-card' },
    {
      id: 'ig-v-bp-3',
      title: 'Supported Reel or Video Requirements',
      description: 'Confirm what public content URL is required.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-v-bp-4',
      title: 'Password Requirements',
      description: 'Confirm whether your Instagram password is requested.',
      icon: 'lock',
    },
    { id: 'ig-v-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'ig-v-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    {
      id: 'ig-v-bp-7',
      title: 'Relevant Service Policies',
      description: 'Review applicable service policies before paying.',
      icon: 'sparkles',
    },
    {
      id: 'ig-v-bp-8',
      title: 'What the Provider Actually Changes',
      description: 'Understand what the package actually changes.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-views-uk',
  title: 'Common Mistakes When Buying Instagram Views',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-instagram-followers': {
      title: 'Instagram Followers',
      description:
        'Choose Followers when you want to increase the follower count displayed on your public Instagram profile.',
      ctaLabel: 'Buy Instagram Followers',
    },
    'buy-instagram-likes': {
      title: 'Instagram Likes',
      description: 'Choose Likes when you want more visible engagement on an eligible public post or Reel.',
      ctaLabel: 'Buy Instagram Likes',
    },
    'buy-instagram-comments': {
      title: 'Instagram Comments',
      description: 'Choose Comments when you want more visible conversation around eligible public content.',
      ctaLabel: 'Buy Instagram Comments',
    },
  },
};

dummy.whyBuy = {
  id: 'reels-worth-views-uk',
  title: 'Which Instagram Reels Are Worth Putting More Views Behind?',
  description:
    'You do not need to add Views to every Reel. A more focused approach is to identify video content that already has a clear purpose.',
  items: [
    {
      id: 'ig-v-wb-demo',
      title: 'Product Demonstrations',
      description:
        'Support the Reel that clearly shows what the product does, how it looks or why it matters.',
    },
    {
      id: 'ig-v-wb-collab',
      title: 'Creator Collaborations',
      description: 'Put more visible attention behind the content that best represents the partnership.',
    },
    {
      id: 'ig-v-wb-showcase',
      title: 'Business Showcases',
      description: 'Use Views around videos showing genuine services, projects, products or locations.',
    },
    {
      id: 'ig-v-wb-campaign',
      title: 'Campaign Reels',
      description: 'Focus on the video carrying the main message of a wider marketing campaign.',
    },
    {
      id: 'ig-v-wb-education',
      title: 'Educational Content',
      description:
        'Tutorials, explainers and practical advice can continue representing your account after publication.',
    },
    {
      id: 'ig-v-wb-portfolio',
      title: 'Portfolio Videos',
      description:
        'Designers, builders, photographers, agencies and other service businesses can showcase work they genuinely want potential customers to see.',
    },
    {
      id: 'ig-v-wb-evergreen',
      title: 'Evergreen Reels',
      description:
        'Strong videos that remain relevant may make more sense to support than short-lived content.',
    },
  ],
  bottomNote: 'Choose the video first. Then decide whether additional Views fit its purpose.',
};

dummy.howToBuy = {
  id: 'how-instagram-views-order-works-uk',
  title: 'How Your Instagram Views Order Works',
  description:
    'Choose the Reel or video, compare packages, submit the direct URL, review your order, complete checkout without your password and track the status afterwards.',
  steps: [
    {
      id: 'ig-v-step-1',
      title: 'Choose the Reel or Video',
      description: 'Start with the exact public Instagram content you want to support.',
    },
    {
      id: 'ig-v-step-2',
      title: 'Select Your Views Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'ig-v-step-3',
      title: 'Submit the Direct URL',
      description: 'Paste the correct public Reel or video link.',
    },
    {
      id: 'ig-v-step-4',
      title: 'Review Your Order',
      description: 'Check the content URL, Views quantity and current package price.',
    },
    {
      id: 'ig-v-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without providing your Instagram password.',
    },
    {
      id: 'ig-v-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Instagram Services';
dummy.relatedIntro =
  'Choose Followers for your profile, Likes for visible engagement on a post or Reel, or Comments for conversation around eligible content.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Views in the UK?',
  text: 'You can buy Instagram Views in the UK through NovaLikes for eligible public Reels and videos. Choose an available Views package, submit the direct public Instagram video URL and complete checkout without sharing your password. The Views apply to that specific Reel or video. They do not automatically increase your Instagram Followers, Likes or Comments.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Creators, Businesses and Brands',
    lead: 'Instagram video can serve very different purposes depending on the account behind it.',
    paragraphs: [
      'A creator in London may publish Reels around fashion, food, entertainment, beauty, fitness or education. An ecommerce brand in Manchester may use video to demonstrate products and support launches. A local business in Birmingham, Leeds, Glasgow, Liverpool, Bristol or another UK market may use Reels to show real projects, services and recent activity. An agency may manage several client accounts with different video goals.',
      'That means your Views strategy should fit the content.',
    ],
    footer: 'Views can support presentation. The video behind the number still needs a reason to be watched.',
    items: [
      { title: 'Creators', body: 'Support Reels that best represent your niche, personality or expertise.' },
      {
        title: 'Ecommerce Brands',
        body: 'Focus on demonstrations, launches and priority campaign videos.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Views around content showing genuine services, locations, projects and products.',
      },
      {
        title: 'Agencies',
        body: 'Choose View quantities according to individual client videos rather than applying one fixed package everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Put more visible attention behind priority Reels while continuing genuine publishing and paid campaigns.',
      },
    ],
  },
  {
    id: 'uk-campaign-moments',
    title: 'Put More Views Behind Important UK Campaign Moments',
    lead: 'Some Reels matter more because of the campaign around them.',
    footer:
      'Visible Views can support campaign presentation. The campaign itself still depends on strong creative, accurate information and a useful offer.',
    items: [
      {
        title: 'Black Friday',
        body: 'UK retailers and ecommerce brands may have priority video content around Black Friday promotions.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use Reels alongside email, paid media and ecommerce campaigns.',
      },
      {
        title: 'Boxing Day',
        body: 'Retailers may have another important promotional period around Boxing Day sales.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Gift guides, seasonal products, hospitality offers, events and festive campaigns can create priority video content.',
      },
      {
        title: 'January Sales',
        body: 'Retail and ecommerce businesses may continue promotional activity into January.',
      },
      { title: 'Product Launches', body: 'Support the video that best demonstrates or introduces the new product.' },
      {
        title: 'Creator Partnerships',
        body: 'Put Views behind the strongest collaboration Reel rather than unrelated content.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses expanding into another city or region can use video to introduce the location, team or service.',
      },
    ],
  },
  {
    id: 'visible-momentum',
    title: 'Give Strong Video Content More Visible Momentum',
    lead: 'View count is one of several things someone may notice when watching an Instagram Reel. They may also see:',
    bullets: [
      'the video itself',
      'Likes',
      'Comments',
      'caption',
      'creator or business profile',
      'overall account activity',
    ],
    paragraphs: [
      'A higher visible View count can support how active the Reel appears. But it cannot improve weak video content by itself.',
      'The opening matters. The message matters. Visual quality matters. The subject matters.',
    ],
    footer: 'Views can support presentation. The video still needs to give genuine viewers a reason to keep watching.',
  },
  {
    id: 'watch-behaviour',
    title: 'A Higher View Count Is Not the Same as Better Watch Behaviour',
    lead: 'A visible View count tells you one thing about a Reel. It does not tell you everything about how genuine viewers responded. When reviewing real video performance, also consider:',
    footer: 'Purchased Views change one visible metric. Use genuine Instagram Insights to understand real audience behaviour.',
    items: [
      { title: 'Watch Behaviour', body: 'Are real viewers staying long enough to understand the content?' },
      { title: 'Shares', body: 'Are people choosing to send the Reel to others?' },
      { title: 'Saves', body: 'Is the video useful enough for people to return to?' },
      { title: 'Genuine Comments', body: 'What are real viewers actually saying?' },
      { title: 'Profile Activity', body: 'Does the video encourage people to explore the account?' },
      { title: 'Genuine Followers', body: 'Does the content organically convince people to stay?' },
    ],
  },
  {
    id: 'organic-reach',
    title: 'Views and Organic Reach Are Not the Same Thing',
    lead: 'A higher visible View count and Instagram\'s organic distribution are separate outcomes. Buying Instagram Views should not be treated as a guaranteed way to:',
    bullets: [
      'reach Explore',
      'make a Reel viral',
      'gain organic Followers',
      'increase Likes',
      'create Comments',
      'increase future reach',
      'drive website traffic',
      'secure brand partnerships',
      'generate enquiries',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes Instagram Views packages are designed around the visible View count on the selected eligible Reel or video.',
      'Organic reach and genuine audience response remain separate. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'reels-worth-watching',
    title: 'Build Reels People Actually Want to Watch',
    lead: 'If video matters to your long-term Instagram strategy, continue improving the actual content.',
    footer:
      'Views can support the public number. Content determines whether real people want to watch.',
    items: [
      { title: 'Make the Opening Clear', body: 'Help viewers understand what the Reel is about quickly.' },
      { title: 'Show the Main Value Early', body: "Do not hide the most important part behind a long introduction." },
      { title: 'Keep the Video Focused', body: 'One clear idea is often easier to follow than several unrelated messages.' },
      { title: 'Show Rather Than Only Tell', body: 'Use the visual format to demonstrate the product, project, result or idea.' },
      { title: 'Keep On-Screen Text Readable', body: 'Text should support the video rather than overwhelm it.' },
      {
        title: 'Develop Repeatable Formats',
        body: 'If genuine viewers respond well to a tutorial, demonstration or transformation format, build more around it.',
      },
      {
        title: 'Review Real Performance',
        body: 'Use genuine analytics to understand which content actually holds attention.',
      },
    ],
  },
  {
    id: 'profile-experience',
    title: 'Turn Reel Views Into a Better Profile Experience',
    lead: "A Reel may be someone's first interaction with your account. If they become interested, they may visit your profile next. Make that visit useful.",
    footer: 'Views can support the video. The profile behind it determines what happens next.',
    items: [
      { title: 'Keep Your Bio Clear', body: 'Explain who you are or what your business offers.' },
      { title: 'Pin Strong Content', body: 'Make your best posts and Reels easy to find.' },
      {
        title: 'Keep Your Content Direction Recognisable',
        body: 'Give visitors a reason to understand what else they can expect from your account.',
      },
      { title: 'Maintain Recent Activity', body: 'A profile with current content gives your View count more context.' },
      {
        title: 'Give Business Visitors a Next Step',
        body: 'If Instagram supports a business, make it easy for interested people to enquire, book, shop or visit your website.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Instagram Views for UK Local Businesses',
    paragraphs: [
      'Reels can help local businesses show potential customers what they actually do.',
      'A restaurant may show food preparation. A builder may publish a project transformation. An interior designer may showcase a completed space. A salon may show a finished treatment. A retailer may demonstrate a new product. An estate agency may publish a property walkthrough. A fitness studio may show classes or training. A tourism business may showcase an experience. A professional service may explain a common customer question.',
      "If you're supporting this content with Views, make sure the account accurately represents the real business.",
    ],
    footer: 'Visible activity can support presentation. Local trust comes from genuine business activity.',
  },
  {
    id: 'real-experience',
    title: 'Support Real Experience With Better Video Content',
    lead: 'Some of the strongest Instagram videos come from things you genuinely know, sell or do.',
    footer: 'Views can support visible activity around these videos. Real experience makes them worth watching.',
    items: [
      { title: 'Show Real Projects', body: 'Use completed work rather than generic claims.' },
      { title: 'Demonstrate Real Products', body: 'Show how products look, work or fit into real situations.' },
      { title: 'Explain Processes You Understand', body: 'Use genuine expertise to answer useful questions.' },
      { title: 'Share Practical Knowledge', body: 'Turn recurring customer questions into helpful Reels.' },
      { title: 'Show Behind the Scenes', body: 'Real teams, locations and processes can make video content more credible.' },
      { title: 'Share Original Experience', body: 'Your own perspective can add something generic content cannot.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Views Alongside Genuine Customer Proof',
    paragraphs: [
      'A View count can contribute to how active video content appears. It is not the same as genuine customer proof.',
      'For UK businesses, deeper trust can also come from verified reviews, authentic testimonials, completed projects, case studies, real customer comments, customer-created content, accurate company information and responsive customer service.',
      'If your business has genuine proof, use it.',
    ],
    footer: 'Views can support content presentation. Actual customer experience gives people stronger reasons to trust the business.',
  },
  {
    id: 'brand-partnerships',
    title: 'Put Instagram Views in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about View counts when preparing for brand collaborations. But professional brands and agencies may consider much more than one public number.',
      'They may evaluate creator niche, content quality, genuine audience fit, watch behaviour, authentic engagement, consistency, previous partnerships, communication, professionalism and campaign results.',
      'If partnerships matter to you, strengthen the whole account. Publish strong Reels. Keep genuine analytics available where relevant.',
    ],
    footer: 'Treat Views as one signal rather than proof of influence by themselves.',
  },
  {
    id: 'instagram-insights',
    title: 'Use Instagram Insights to Understand Real Video Performance',
    lead: 'Purchased Views change one visible metric. Your genuine Instagram analytics can tell you much more about how actual viewers respond. Where available, review:',
    footer: 'Use real performance data to decide what you should create next. Do not rely only on the public View number.',
    items: [
      { title: 'Reach', body: 'How many genuine accounts are discovering the Reel?' },
      { title: 'Watch Behaviour', body: 'How are real users consuming the video?' },
      { title: 'Shares', body: 'Which videos are useful or interesting enough to send to others?' },
      { title: 'Saves', body: 'Which content do genuine users want to revisit?' },
      { title: 'Profile Activity', body: 'Does the Reel encourage people to explore your account?' },
      { title: 'Organic Followers', body: 'Which content convinces genuine viewers to follow?' },
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical Instagram Reel Growth Framework for UK Accounts',
    lead: 'Views can support selected videos, but a stronger Instagram strategy needs more than one number.',
    items: [
      { title: 'Define Your Video Direction', body: 'Make your creator niche, business or brand easy to understand.' },
      { title: 'Identify Priority Reels', body: 'Know which videos actually deserve more attention.' },
      { title: 'Improve Your Openings', body: 'Test different ways to communicate the idea quickly.' },
      { title: 'Develop Repeatable Formats', body: 'Turn genuinely successful content ideas into recurring video series.' },
      { title: 'Review Genuine Analytics', body: 'Use Instagram Insights to understand real viewer behaviour.' },
      { title: 'Learn From Real Comments', body: 'Genuine questions and reactions can reveal useful content ideas.' },
      { title: 'Build the Profile Behind the Reel', body: 'Make sure someone who visits the account finds more relevant content.' },
      {
        title: 'Connect Instagram to Wider Marketing',
        body: 'UK businesses may use Instagram alongside SEO, Google Ads, ecommerce, email, creator campaigns, local search and their website.',
      },
      {
        title: 'Keep Views in Perspective',
        body: 'Visible Views can support presentation. Long-term growth comes from content, positioning and genuine audience behaviour.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-views'] = {
  title: 'Buy Instagram Views UK | Reels & Videos | NovaLikes',
  description:
    'Buy Instagram views in the UK for public Reels and videos. Compare flexible packages, order without sharing your password and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukIgViewsFaqs = [
  {
    id: 'uk-ig-v-where-buy',
    question: 'Where can I buy Instagram Views in the UK?',
    answer:
      'You can buy Instagram Views in the UK through NovaLikes for eligible public Reels and videos. Choose an available Views package, submit the direct public content URL and complete checkout without sharing your password.',
  },
  {
    id: 'uk-ig-v-get-more',
    question: 'How can I get more Instagram Views in the UK?',
    answer:
      'NovaLikes Views packages can increase the visible View count on eligible public Reels and videos. For organic growth, continue improving your video content and reviewing genuine audience behaviour through Instagram Insights.',
  },
  {
    id: 'uk-ig-v-cheap',
    question: 'Can I buy cheap Instagram Views in the UK?',
    answer:
      'NovaLikes offers multiple View quantities so you can compare current package sizes and prices. When comparing lower-cost services, also review password requirements, tracking, support and what the package actually changes.',
  },
  {
    id: 'uk-ig-v-real',
    question: 'What are real Instagram Views?',
    answer:
      '"Real Instagram Views" may be defined differently by different providers. Review the actual service details rather than relying only on that phrase. NovaLikes Views packages are designed to increase the displayed View count on eligible submitted content.',
  },
  {
    id: 'uk-ig-v-how-many',
    question: 'How many Instagram Views should I buy?',
    answer:
      'There is no single ideal quantity for every Reel. Consider its existing View count, profile size, campaign purpose and the visible increase you want before choosing.',
  },
  {
    id: 'uk-ig-v-reels',
    question: 'Can I buy Instagram Views for Reels?',
    answer:
      'Yes. Eligible public Instagram Reels can use a Views package when you submit the correct direct content URL.',
  },
  {
    id: 'uk-ig-v-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'uk-ig-v-info',
    question: 'What information do I need?',
    answer:
      'You need the direct public URL of the eligible Instagram Reel or video and the Views package you want to purchase.',
  },
  {
    id: 'uk-ig-v-cost',
    question: 'How much does it cost to buy Instagram Views in the UK?',
    answer:
      'Pricing depends on the Views quantity you select. NovaLikes displays the current package quantities and prices before checkout.',
  },
  {
    id: 'uk-ig-v-delivery',
    question: 'How long does it take to get Instagram Views?',
    answer:
      'Processing time can vary depending on package quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-ig-v-followers',
    question: 'Will buying Instagram Views increase my Followers?',
    answer: 'Not automatically. Instagram Followers are a separate profile-level metric and service.',
  },
  {
    id: 'uk-ig-v-likes',
    question: 'Will buying Views increase my Likes?',
    answer: 'Not automatically. Instagram Likes are a separate content-level metric.',
  },
  {
    id: 'uk-ig-v-organic-reach',
    question: 'Will buying Instagram Views increase organic reach?',
    answer:
      'There is no guarantee. A Views package changes the displayed View count on the selected content. Organic distribution depends on separate factors.',
  },
  {
    id: 'uk-ig-v-viral',
    question: 'Will buying Instagram Views make my Reel viral?',
    answer:
      'There is no guarantee. A higher visible View count and viral distribution are separate outcomes.',
  },
  {
    id: 'uk-ig-v-business',
    question: 'Can UK businesses buy Instagram Views?',
    answer:
      'Eligible public Instagram Reels and videos used by UK businesses, creators, brands and agencies can use the relevant NovaLikes Views packages.',
  },
  {
    id: 'uk-ig-v-local',
    question: 'Can local businesses use Instagram Views packages?',
    answer:
      'Yes. Eligible public video content from local-business accounts can use Views packages. Use them around content that accurately represents the real business.',
  },
  {
    id: 'uk-ig-v-older-reel',
    question: 'Can I buy Views for an older Instagram Reel?',
    answer:
      'If the Reel remains eligible and publicly accessible, it may be suitable for an order. Check the direct content URL and current service requirements first.',
  },
  {
    id: 'uk-ig-v-client',
    question: 'Can I order Instagram Views for client content?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public Reel or video URL and review the order details carefully.",
  },
  {
    id: 'uk-ig-v-wrong-url',
    question: 'What happens if I submit the wrong video URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the direct content link before checkout.',
  },
  {
    id: 'uk-ig-v-track',
    question: 'Can I track my Instagram Views order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-ig-v-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukIgViewsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom Instagram Views content from supplied copy.');
