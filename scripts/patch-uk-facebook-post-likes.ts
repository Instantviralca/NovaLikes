/**
 * Apply supplied United Kingdom Facebook Post Likes copy.
 * Run: npx tsx scripts/patch-uk-facebook-post-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-facebook-post-likes.json');
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
  title: 'Buy Facebook Post Likes UK | Likes for Posts | NovaLikes',
  description:
    'Buy Facebook Post Likes in the UK for public posts. Compare flexible packages, order without sharing your password and track your Post Likes order online.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR THE UK';
hero.title = 'Buy Facebook Post Likes in the UK and Strengthen Post Engagement';
hero.description =
  "Put more visible engagement behind the Facebook posts that matter most. NovaLikes gives businesses, brands, creators and Page managers across the United Kingdom a straightforward way to buy Facebook Post Likes for eligible public posts without sharing account login details. Choose the number of Likes you want, submit the exact public Facebook post URL and complete your order online. Whether you're supporting a product launch, business announcement, seasonal campaign, event, project showcase or important evergreen post, choose your Post Likes package around the content you're actually trying to strengthen.";
hero.primaryCta = { label: 'Choose Your Facebook Post Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-post-trust-url', label: 'Public Facebook Post URL Only' },
  { id: 'fb-post-trust-password', label: 'No Password Required' },
  { id: 'fb-post-trust-pricing', label: 'Clear Pricing' },
  { id: 'fb-post-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Facebook Post Likes Package That Fits the Content';
pricing.description =
  'Different Facebook posts serve different purposes. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Post Likes. A routine business update may only need a smaller increase. A major launch, campaign post or strong evergreen piece of content may call for something larger. Before choosing, consider the current Like count, how important the post is, your Page size, the purpose of the content and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Facebook Post Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-fb-post-where-buy',
  'uk-fb-post-get-more',
  'uk-fb-post-cheap',
  'uk-fb-post-real',
  'uk-fb-post-how-many',
  'uk-fb-post-password',
  'uk-fb-post-admin',
  'uk-fb-post-info',
  'uk-fb-post-page-url',
  'uk-fb-post-cost',
  'uk-fb-post-delivery',
  'uk-fb-post-followers',
  'uk-fb-post-page-likes',
  'uk-fb-post-reach',
  'uk-fb-post-comments-shares',
  'uk-fb-post-business',
  'uk-fb-post-local',
  'uk-fb-post-older',
  'uk-fb-post-client',
  'uk-fb-post-wrong-url',
  'uk-fb-post-track',
];

related.title = 'Explore More Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Put More Likes Behind the Facebook Posts That Matter';
finalCta.description =
  'Choose the Facebook post you want to support, select a Post Likes package that fits the content and submit the correct public post URL without sharing your password or Page access. Then keep strengthening what the Like count cannot replace: useful content, genuine customer interaction, real business proof and a Facebook presence people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Post Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-post-likes-uk',
  title: 'Why Choose NovaLikes for Facebook Post Likes?',
  description: 'Buying Facebook Post Likes should be easy to understand before checkout.',
  items: [
    {
      id: 'fb-post-wc-post',
      title: 'Likes for a Specific Facebook Post',
      description: 'Your order applies to the eligible public post connected to the URL you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-post-wc-packages',
      title: 'Flexible Post Like Quantities',
      description: 'Choose from smaller and larger packages depending on the individual post.',
      icon: 'users',
    },
    {
      id: 'fb-post-wc-password',
      title: 'No Facebook Password Required',
      description: 'NovaLikes does not need your Facebook password or verification codes.',
      icon: 'lock',
    },
    {
      id: 'fb-post-wc-admin',
      title: 'No Page Admin Access Required',
      description: 'You do not need to provide Page admin, Meta Business Suite or Business Manager access.',
      icon: 'sparkles',
    },
    {
      id: 'fb-post-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the selected Post Likes quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'fb-post-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-post-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes order tracking afterwards for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'fb-post-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-facebook-post-likes-without-login-uk',
  title: 'Buy Facebook Post Likes Without Sharing Your Login',
  description:
    'A Post Likes order should not require control of your Facebook account or Page. NovaLikes uses the public post information required for the service.',
  cards: [
    {
      id: 'fb-post-can-need',
      title: 'What You Need',
      description: 'The exact public URL of the Facebook post and your selected Post Likes package.',
      icon: 'users',
    },
    {
      id: 'fb-post-can-not-need',
      title: "What You Don't Need",
      description:
        'Your Facebook password, verification codes, Page admin login, Meta Business Suite access, Business Manager access or private messages.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the link yourself. Make sure it points directly to the individual Facebook post you want to support. A general Facebook Page URL is not the correct target for a Post Likes order.',
};

config.doesBuyingHelp = {
  id: 'real-facebook-post-likes-uk',
  title: 'Looking for “Real Facebook Post Likes”? Check the Actual Service',
  description:
    '"Real Facebook Post Likes" is a common phrase people may use when comparing engagement services. You may also see terms such as high-quality Facebook Post Likes, active Facebook Post Likes or organic Facebook Post Likes. Different providers may define those labels differently.',
  helpTitle: 'Instead of relying only on the wording, ask',
  helpItems: [
    'What metric changes?',
    'How many Likes are included?',
    'Which post receives the Likes?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Facebook Post Likes Packages Do',
  limitItems: [
    'Increase the Like count displayed on the eligible public Facebook post submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Followers, Page Likes, Comments, Shares, reach, customers or sales. Clear expectations are more useful than undefined marketing terminology.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-post-likes-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Post Likes package and submitted Facebook post URL are connected to the purchase. The order is then processed for that specific post.',
  steps: [
    {
      id: 'fb-post-th-1',
      title: 'Keep the Post Public',
      description: 'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'fb-post-th-2',
      title: 'Do Not Delete It During Processing',
      description: 'Removing the target post may interfere with an active order.',
    },
    {
      id: 'fb-post-th-3',
      title: 'Check the URL Carefully',
      description: 'Make sure the order points to the exact post you intended to use.',
    },
    {
      id: 'fb-post-th-4',
      title: 'Follow the Order Status',
      description:
        'Processing time can vary depending on quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'facebook-post-likes-page-likes-followers-uk',
  title: 'Post Likes, Page Likes or Followers: Choose by Goal',
  description: 'Choose the service that matches the exact metric you want to change.',
  current: {
    title: 'Facebook Post Likes',
    description: 'Like count on one eligible public Facebook post',
    bestFor: 'Individual post engagement',
    ctaLabel: 'Facebook Post Likes',
  },
  likes: {
    title: 'Facebook Page Likes',
    description: 'Page-level Like count on an eligible public Facebook Page',
    bestFor: 'Page Like count',
    href: ukHref('/buy-facebook-page-likes'),
    ctaLabel: 'Buy Facebook Page Likes',
  },
  views: {
    title: 'Facebook Followers',
    description: 'Follower count displayed on an eligible public Facebook Page',
    bestFor: 'Page audience size',
    href: ukHref('/buy-facebook-followers'),
    ctaLabel: 'Buy Facebook Followers',
  },
  combinedNote:
    'Choose Post Likes for individual content. Choose Page Likes for the Page-level Like count. Choose Followers for Page audience size. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-post-likes-uk',
  title: 'Before You Buy Facebook Post Likes in the UK',
  description: 'Check these details before completing your purchase.',
  framingNote: '',
  items: [
    {
      id: 'fb-post-bb-post',
      title: 'Confirm the Exact Post',
      description: 'Open the specific public Facebook post you want to use.',
      icon: 'users',
    },
    {
      id: 'fb-post-bb-url',
      title: 'Copy the Direct Post URL',
      description: 'Do not submit only the general Page URL.',
      icon: 'sparkles',
    },
    {
      id: 'fb-post-bb-quantity',
      title: 'Check the Post Likes Quantity',
      description: "Make sure you're ordering the number you actually want.",
      icon: 'credit-card',
    },
    {
      id: 'fb-post-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the selected package quantity and current price before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-post-bb-public',
      title: 'Keep the Post Accessible',
      description: 'Avoid deleting or restricting the submitted content while processing requires access.',
      icon: 'lock',
    },
    {
      id: 'fb-post-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Facebook password.',
      icon: 'headphones',
    },
    {
      id: 'fb-post-bb-admin',
      title: 'Keep Page Access Private',
      description: 'You do not need to provide Page admin, Meta Business Suite or Business Manager access.',
      icon: 'megaphone',
    },
    {
      id: 'fb-post-bb-service',
      title: 'Choose the Correct Facebook Service',
      description: 'Post Likes, Page Likes and Followers are separate metrics.',
      icon: 'heart',
    },
    {
      id: 'fb-post-bb-policies',
      title: 'Review the Policies',
      description: 'Read the relevant service and refund information before completing checkout.',
      icon: 'clapperboard',
    },
  ],
};

config.worldwide = {
  id: 'dont-measure-post-by-likes-alone-uk',
  title: 'Do Not Measure Facebook Content by Likes Alone',
  description:
    'A visible Like count gives you one piece of information. It does not tell you whether the entire post or campaign performed well. When reviewing genuine performance, also consider:',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased Post Likes change one visible number. Use genuine Facebook performance data and your own business results for wider decisions.',
  cards: [
    {
      id: 'fb-post-ww-comments',
      title: 'Real Comments',
      description: 'What are genuine users asking or saying?',
      icon: 'users',
    },
    {
      id: 'fb-post-ww-shares',
      title: 'Shares',
      description: 'Are people choosing to share the post?',
      icon: 'heart',
    },
    {
      id: 'fb-post-ww-clicks',
      title: 'Link Activity',
      description: 'Are genuine users taking the next step?',
      icon: 'clapperboard',
    },
    {
      id: 'fb-post-ww-messages',
      title: 'Messages',
      description: 'Does the content create customer enquiries?',
      icon: 'briefcase',
    },
    {
      id: 'fb-post-ww-page',
      title: 'Page Activity',
      description: 'Are people exploring the Page behind the post?',
      icon: 'megaphone',
    },
    {
      id: 'fb-post-ww-outcomes',
      title: 'Business Results',
      description: 'Did the campaign contribute to bookings, leads, sales or another real objective?',
      icon: 'map-pin',
    },
  ],
};

config.packageSizes = {
  id: 'choose-facebook-post-likes-package-uk',
  title: 'Choose a Facebook Post Likes Package That Fits the Content',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Post Likes. A routine business update may only need a smaller increase. A major launch, campaign post or strong evergreen piece of content may call for something larger.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'fb-post-ps-count',
      quantity: 'The Current Like Count',
      recommendedFor: 'Start with the engagement already displayed on the post.',
    },
    {
      id: 'fb-post-ps-importance',
      quantity: 'How Important the Post Is',
      recommendedFor: 'A priority campaign post may deserve more support than an everyday update.',
    },
    {
      id: 'fb-post-ps-page',
      quantity: 'Your Page Size',
      recommendedFor:
        'The same number of Post Likes can look different on a newer local-business Page and an established brand Page.',
    },
    {
      id: 'fb-post-ps-purpose',
      quantity: 'The Purpose of the Content',
      recommendedFor: 'A product launch, educational post, event announcement and project showcase all play different roles.',
    },
    {
      id: 'fb-post-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on the individual post rather than automatically selecting the largest package.',
    },
  ],
  bottomNote: 'Compare Facebook Post Likes Packages',
};

config.bestPractices = {
  id: 'affordable-facebook-post-likes-uk',
  title: 'Looking for Affordable Facebook Post Likes in the UK?',
  description:
    "If you're searching for cheap Facebook Post Likes in the UK, price will naturally be part of the comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Facebook Post Likes service should make these details clear before checkout. NovaLikes lets you compare available quantities and current pricing before choosing.',
  items: [
    { id: 'fb-post-bp-1', title: 'Number of Post Likes Included', description: 'Check how many Post Likes are included.', icon: 'users' },
    { id: 'fb-post-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'fb-post-bp-3', title: 'Public Post Requirements', description: 'Confirm what post URL is required.', icon: 'clapperboard' },
    { id: 'fb-post-bp-4', title: 'Password Policy', description: 'Check whether your Facebook password is requested.', icon: 'lock' },
    { id: 'fb-post-bp-5', title: 'Admin Access Policy', description: 'Check whether Page admin access is required.', icon: 'sparkles' },
    { id: 'fb-post-bp-6', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'fb-post-bp-7', title: 'Support and Policies', description: 'Review what the package actually changes.', icon: 'headphones' },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-post-likes-uk',
  title: 'Common Mistakes to Avoid When Buying Facebook Post Likes',
  description: '',
  closingNote: '',
  items: [
    {
      id: 'fb-post-cm-page-url',
      title: 'Submitting the General Page URL',
      description: 'A Post Likes order needs the direct URL of the individual Facebook post.',
    },
    {
      id: 'fb-post-cm-service',
      title: 'Choosing the Wrong Facebook Service',
      description: 'Post Likes, Page Likes and Followers change different metrics.',
    },
    {
      id: 'fb-post-cm-quantity',
      title: 'Selecting the Wrong Quantity',
      description: 'Review the package before checkout.',
    },
    {
      id: 'fb-post-cm-delete',
      title: 'Deleting the Post During an Active Order',
      description: 'Keep the submitted content publicly accessible while processing requires it.',
    },
    {
      id: 'fb-post-cm-metrics',
      title: 'Expecting Other Metrics Automatically',
      description: 'Post Likes do not automatically add Followers, Page Likes, Comments or Shares.',
    },
    {
      id: 'fb-post-cm-reach',
      title: 'Treating Likes as Guaranteed Reach',
      description: 'A higher Like count does not guarantee additional organic distribution.',
    },
    {
      id: 'fb-post-cm-content',
      title: 'Ignoring the Actual Content',
      description: 'Visible engagement cannot replace accurate, useful and relevant publishing.',
    },
  ],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-facebook-followers': {
      title: 'Facebook Followers',
      description:
        'Choose Followers when you want to increase the follower count displayed on an eligible public Facebook Page.',
      ctaLabel: 'Buy Facebook Followers',
    },
    'buy-facebook-page-likes': {
      title: 'Facebook Page Likes',
      description:
        'Choose Page Likes when you want to increase the Page-level Like count on an eligible public Facebook Page.',
      ctaLabel: 'Buy Facebook Page Likes',
    },
  },
};

dummy.whyBuy = {
  id: 'which-facebook-posts-worth-likes-uk',
  title: 'Which Facebook Posts Are Worth Supporting With More Likes?',
  description:
    'You do not need to add Likes to everything you publish. A more focused approach is to identify posts that already have a clear purpose.',
  items: [
    {
      id: 'fb-post-wb-launch',
      title: 'Product Launches',
      description: 'Support the Facebook post that introduces or demonstrates the product most clearly.',
    },
    {
      id: 'fb-post-wb-announcement',
      title: 'Business Announcements',
      description: 'A new service, location, company milestone or important update may deserve more attention than a routine post.',
    },
    {
      id: 'fb-post-wb-project',
      title: 'Project Showcases',
      description:
        'Builders, designers, photographers, agencies and other service businesses can focus on work they genuinely want potential customers to see.',
    },
    {
      id: 'fb-post-wb-event',
      title: 'Event Posts',
      description: 'Use Post Likes around content promoting an opening, exhibition, workshop, community event or other important date.',
    },
    {
      id: 'fb-post-wb-campaign',
      title: 'Promotional Campaigns',
      description: 'Support the main campaign post instead of spreading Likes across unrelated content.',
    },
    {
      id: 'fb-post-wb-educational',
      title: 'Educational Posts',
      description: 'Useful guides, explanations and customer FAQs may continue representing the Page long after publication.',
    },
    {
      id: 'fb-post-wb-evergreen',
      title: 'Evergreen Content',
      description: 'Strong posts that remain relevant over time can make more sense to support than short-lived updates.',
    },
  ],
  bottomNote: 'Choose the post first. Then decide whether additional visible Likes fit its role.',
};

dummy.howToBuy = {
  id: 'how-facebook-post-likes-order-works-uk',
  title: 'How Your Facebook Post Likes Order Works',
  description: 'The process starts with the post you want to support.',
  steps: [
    {
      id: 'fb-post-step-1',
      title: 'Choose the Facebook Post',
      description: 'Start with the exact public post you want to support.',
    },
    {
      id: 'fb-post-step-2',
      title: 'Select Your Post Likes Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'fb-post-step-3',
      title: 'Submit the Direct Post URL',
      description: 'Paste the correct public Facebook post link.',
    },
    {
      id: 'fb-post-step-4',
      title: 'Review Your Order',
      description: 'Check the post URL, Likes quantity and current package price.',
    },
    {
      id: 'fb-post-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your Facebook password or Page access.',
    },
    {
      id: 'fb-post-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Facebook Post Likes in the UK?',
  text: 'You can buy Facebook Post Likes in the UK through NovaLikes for an eligible public Facebook post. Choose an available Post Likes package, submit the direct URL of the individual post and complete checkout without sharing your Facebook password or Page admin access. The Likes apply to that specific post. They do not automatically increase your Facebook Followers or Page Like count.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Businesses, Brands and Creators',
    lead: 'Facebook posts can serve different purposes depending on the Page behind them.',
    paragraphs: [
      'An ecommerce brand in Manchester may use Facebook around launches and promotions. A restaurant in London may publish menu updates and events. A builder in Birmingham may share completed projects. A retailer in Leeds may introduce new stock. An estate agency in Liverpool may feature properties. A business in Glasgow or Bristol may publish local updates, offers or customer information. An agency may manage campaigns across several client Pages.',
      'That means your Post Likes strategy should fit the content.',
    ],
    footer: 'Post Likes can strengthen one visible engagement metric. The content behind that number still needs a purpose.',
    items: [
      { title: 'Local Businesses', body: 'Support posts showing genuine services, products, projects, events or business activity.' },
      { title: 'Ecommerce Brands', body: 'Focus on launches, offers and priority campaign content.' },
      { title: 'Service Businesses', body: 'Use Post Likes around project showcases, educational content and important announcements.' },
      { title: 'Creators', body: 'Put more visible engagement behind priority posts rather than every update.' },
      { title: 'Agencies', body: 'Choose Post Like quantities according to each client\'s individual content and campaign.' },
      { title: 'Established Brands', body: 'Support high-priority posts while continuing genuine publishing, paid media and customer communication.' },
    ],
  },
  {
    id: 'campaign-content',
    title: 'Put More Engagement Behind Important UK Campaign Moments',
    lead: 'Some Facebook posts matter more because of the campaign around them.',
    footer:
      'Visible Likes can support campaign presentation. The campaign itself still needs strong creative, accurate information and a clear offer.',
    items: [
      { title: 'Black Friday', body: 'UK retailers and ecommerce brands may have high-priority promotional posts around Black Friday.' },
      { title: 'Cyber Monday', body: 'Online businesses may use Facebook alongside ecommerce, email and paid advertising during Cyber Monday campaigns.' },
      { title: 'Boxing Day', body: 'Retailers may have another major promotional period around Boxing Day sales.' },
      { title: 'Christmas Campaigns', body: 'Gift guides, seasonal products, hospitality offers, opening hours and events can become important Facebook content.' },
      { title: 'January Sales', body: 'Retail and ecommerce businesses may continue promotional activity into January.' },
      { title: 'Product Launches', body: 'Support the post that best introduces or explains the new product.' },
      { title: 'New Location Openings', body: 'Businesses expanding into another town, city or region can highlight the main launch post.' },
      { title: 'Events', body: 'Venues, organisations and local businesses can use Facebook around exhibitions, workshops, openings and community events.' },
    ],
  },
  {
    id: 'strong-content',
    title: 'Make Strong Facebook Content Look More Active at First Glance',
    lead: 'A Like count is one of several things someone may notice on a Facebook post. They may also see:',
    bullets: [
      'the image or video',
      'caption',
      'Comments',
      'Shares',
      'Page name',
      'Page information',
      'recent Page activity',
    ],
    paragraphs: [
      'A stronger Like count can support how active the post appears. But the number cannot improve weak content by itself.',
      'Strong creative matters. Useful information matters. Accurate claims matter. A clear next step matters.',
    ],
    footer: 'Post Likes can support presentation. The content gives people a reason to pay attention.',
  },
  {
    id: 'real-activity',
    title: 'Build Post Engagement Around Real Business Activity',
    lead: 'Some of the strongest Facebook content comes from things the business genuinely does.',
    footer: 'A Post Like count has more context when the content is backed by actual business activity.',
    items: [
      { title: 'Completed Projects', body: "Show work you've actually completed." },
      { title: 'Products You Actually Sell', body: 'Use accurate photos, product information and availability.' },
      { title: 'Business Milestones', body: 'Share real openings, anniversaries, expansions or achievements.' },
      { title: 'Events', body: 'Publish accurate dates, locations and event details.' },
      { title: 'Customer Questions', body: 'Turn common questions into useful posts.' },
      { title: 'Behind-the-Scenes Content', body: 'Show genuine teams, locations and processes where appropriate.' },
      { title: 'Professional Knowledge', body: 'Use real experience to explain topics customers genuinely need to understand.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Facebook Post Likes for UK Local Businesses',
    paragraphs: [
      'For local businesses, Facebook posts can help potential customers understand what the company actually does.',
      'A restaurant may publish a new menu item. A builder may show a completed renovation. A salon may showcase recent work. A retailer may announce new stock. An estate agency may share a property. An interior designer may show a finished space. A tourism business may promote an experience. A professional service may answer a common customer question.',
      "If you're supporting this content with Likes, make sure the Facebook Page behind it remains accurate and useful.",
    ],
    footer: 'Visible engagement can support presentation. Local trust comes from the genuine business behind the post.',
  },
  {
    id: 'useful-next-step',
    title: 'Give People Somewhere Useful to Go After the Post',
    lead: 'A Facebook post can attract attention. What happens next depends on the Page and campaign behind it.',
    footer: 'Post Likes can support visible interaction. The next step determines whether that attention becomes useful.',
    items: [
      { title: 'Keep Your Page Information Current', body: 'Make sure website, telephone and business details are accurate.' },
      { title: 'Make the Offer Clear', body: 'If the post promotes something, explain what it is.' },
      { title: 'Use the Right Destination', body: 'Send interested customers towards the correct service, product, booking or information page.' },
      { title: 'Respond to Genuine Questions', body: 'Real customer comments deserve accurate replies.' },
      { title: 'Keep Related Content Available', body: 'Someone who explores the Page should find more than one useful post.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Post Likes Alongside Genuine Customer Proof',
    paragraphs: [
      'A Like count can contribute to how active a post appears. It is not the same as real customer evidence.',
      'For UK businesses, stronger trust may also come from verified customer reviews, Facebook Recommendations, authentic testimonials, completed projects, case studies, real customer comments, customer photos, accurate business information and responsive customer service.',
      'If your business has genuine proof, show it. Do not invent customer experiences simply to strengthen social proof.',
    ],
    footer: 'Post Likes can support presentation. Real customer experience creates deeper credibility.',
  },
  {
    id: 'genuine-engagement',
    title: 'Post Likes and Genuine Engagement Are Different Things',
    paragraphs: [
      'Purchased Post Likes increase the visible Like count on the selected eligible Facebook post. Genuine engagement is different.',
      'Real users may independently leave Comments, share the post, click a link, follow the Page, Like the Page, send a message, visit your website, make an enquiry or purchase something.',
      'Those actions should not be assumed as part of a Post Likes package. Keep the distinction clear when reviewing performance.',
    ],
  },
  {
    id: 'organic-reach',
    title: "More Facebook Post Likes Don't Automatically Mean More Reach",
    lead: 'Post Likes and organic Facebook distribution are separate outcomes. Buying Facebook Post Likes should not be treated as a guaranteed way to:',
    bullets: [
      'increase organic reach',
      'gain Facebook Followers',
      'increase Page Likes',
      'create Comments',
      'generate Shares',
      'increase website traffic',
      'produce enquiries',
      'increase bookings',
      'create leads',
      'generate sales',
    ],
    paragraphs: [
      'NovaLikes Facebook Post Likes packages are designed around the Like count displayed on the selected eligible public post.',
      'How Facebook distributes the content and how genuine users respond remain separate outcomes. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'facebook-insights',
    title: 'Use Facebook Insights to Understand Real Post Performance',
    lead: 'If performance information is available for your Page, use it.',
    footer: 'Purchased Post Likes affect one visible metric. Your genuine analytics should guide your wider Facebook strategy.',
    items: [
      { title: 'Compare Different Posts', body: 'Identify which topics and formats genuinely perform better.' },
      { title: 'Review Genuine Engagement', body: 'Look beyond the public Like number.' },
      { title: 'Test Images and Video', body: 'Different creative formats may create different audience responses.' },
      { title: 'Compare Campaign Content', body: 'Understand which posts contribute to genuine business activity.' },
      { title: 'Improve Future Publishing', body: 'Use actual performance information when deciding what to publish next.' },
    ],
  },
  {
    id: 'brand-campaigns',
    title: 'Facebook Post Likes for UK Brands and Agencies',
    paragraphs: [
      'Brands and agencies may use Facebook as one part of a larger campaign. That campaign might include Facebook, Instagram, TikTok, paid social, Google Ads, email, ecommerce, SEO, creator partnerships and the company website.',
      'If Post Likes are part of that campaign, keep reporting clear.',
      'Distinguish between purchased Post Likes, genuine engagement, organic reach, paid reach, Page growth, website activity and business outcomes. Transparent reporting gives a more accurate picture than presenting every visible number as organic performance.',
    ],
  },
  {
    id: 'metrics-distinction',
    title: 'Post Likes, Page Likes and Followers Are Different Metrics',
    paragraphs: [
      'Facebook Post Likes apply to one specific eligible public Facebook post. Choose this service when the Like count on individual content is your priority.',
      'Facebook Page Likes apply to the Page-level Like count. They do not automatically add Likes to individual posts.',
      'Facebook Followers apply to the Page-level follower count. They are another separate Facebook metric. One Facebook service does not automatically include the others.',
    ],
  },
  {
    id: 'content-framework',
    title: 'A Practical Facebook Post Growth Framework for UK Businesses',
    lead: 'Post Likes can support selected content, but stronger Facebook marketing requires more than one metric.',
    footer:
      'Visible engagement can support individual content. The wider Page and business determine what happens afterwards.',
    items: [
      { title: 'Start With the Purpose', body: 'Know what the post is meant to achieve.' },
      { title: 'Choose Priority Content', body: 'Not every post needs the same level of attention.' },
      { title: 'Use Real Business Experience', body: 'Publish genuine products, services, projects and expertise.' },
      { title: 'Improve the Creative', body: 'Use images or videos that clearly communicate the idea.' },
      { title: 'Write Useful Copy', body: 'Explain what the reader actually needs to know.' },
      { title: 'Give People a Next Step', body: 'Make it clear how interested users can learn more.' },
      { title: 'Respond to Genuine Interaction', body: 'Treat real Comments and messages as actual customer conversations.' },
      { title: 'Review Real Performance', body: 'Use genuine Facebook data and business results to understand what works.' },
      {
        title: 'Connect Facebook to Wider Marketing',
        body: 'UK businesses may use Facebook alongside Instagram, TikTok, Google, SEO, paid media, email and their website.',
      },
      {
        title: 'Keep Post Likes in Perspective',
        body: 'Visible engagement can support individual content. The wider Page and business determine what happens afterwards.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-post-likes'] = {
  title: 'Buy Facebook Post Likes UK | Likes for Posts | NovaLikes',
  description:
    'Buy Facebook Post Likes in the UK for public posts. Compare flexible packages, order without sharing your password and track your Post Likes order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukFbPostLikesFaqs = [
  {
    id: 'uk-fb-post-where-buy',
    question: 'Where can I buy Facebook Post Likes in the UK?',
    answer:
      'You can buy Facebook Post Likes in the UK through NovaLikes for eligible public Facebook posts. Choose an available Post Likes package, submit the direct public post URL and complete checkout without sharing your password.',
  },
  {
    id: 'uk-fb-post-get-more',
    question: 'How can I get more Likes on a Facebook post?',
    answer:
      'NovaLikes Post Likes packages can increase the visible Like count on an eligible public Facebook post. For genuine engagement, continue publishing relevant content and interacting with real users.',
  },
  {
    id: 'uk-fb-post-cheap',
    question: 'Can I buy cheap Facebook Post Likes in the UK?',
    answer:
      'NovaLikes offers multiple Post Like quantities so you can compare current package sizes and prices. When comparing lower-cost services, also review password requirements, tracking, support and what the service actually changes.',
  },
  {
    id: 'uk-fb-post-real',
    question: 'What are real Facebook Post Likes?',
    answer:
      '"Real Facebook Post Likes" may mean different things depending on the provider. Review the actual service details rather than relying only on that phrase. NovaLikes Post Likes packages are designed to increase the Like count displayed on the eligible submitted post.',
  },
  {
    id: 'uk-fb-post-how-many',
    question: 'How many Facebook Post Likes should I buy?',
    answer:
      'There is no single ideal quantity for every post. Consider the existing engagement, Page size, content purpose and increase you actually want.',
  },
  {
    id: 'uk-fb-post-password',
    question: 'Do I need my Facebook password?',
    answer: 'No. NovaLikes does not require your Facebook password or verification codes.',
  },
  {
    id: 'uk-fb-post-admin',
    question: 'Do I need Facebook Page admin access?',
    answer: 'No. You only need the correct public Facebook post URL for an eligible Post Likes order.',
  },
  {
    id: 'uk-fb-post-info',
    question: 'What information do I need?',
    answer: 'You need the direct public Facebook post URL and the Post Likes package you want to purchase.',
  },
  {
    id: 'uk-fb-post-page-url',
    question: 'Can I submit my Facebook Page URL?',
    answer:
      'No. A Post Likes order should use the direct URL of the individual public post rather than only the general Page URL.',
  },
  {
    id: 'uk-fb-post-cost',
    question: 'How much does it cost to buy Facebook Post Likes in the UK?',
    answer:
      'Pricing depends on the Post Like quantity you choose. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'uk-fb-post-delivery',
    question: 'How long does it take to get Facebook Post Likes?',
    answer:
      'Processing time can vary depending on the selected quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-fb-post-followers',
    question: 'Will buying Post Likes increase my Facebook Followers?',
    answer: 'Not automatically. Facebook Followers are a separate Page-level metric and service.',
  },
  {
    id: 'uk-fb-post-page-likes',
    question: 'Will buying Post Likes increase my Facebook Page Likes?',
    answer: 'Not automatically. Facebook Page Likes are a separate Page-level metric.',
  },
  {
    id: 'uk-fb-post-reach',
    question: 'Will buying Facebook Post Likes increase organic reach?',
    answer:
      'There is no guarantee. A Post Likes package changes the Like count displayed on the selected post. Organic Facebook distribution depends on separate factors.',
  },
  {
    id: 'uk-fb-post-comments-shares',
    question: 'Will Facebook Post Likes create Comments or Shares?',
    answer: 'Not automatically. Comments and Shares are separate forms of Facebook interaction.',
  },
  {
    id: 'uk-fb-post-business',
    question: 'Can UK businesses buy Facebook Post Likes?',
    answer:
      'Eligible public Facebook posts used by UK businesses, brands, creators, agencies and other supported Page types can use NovaLikes Post Likes packages.',
  },
  {
    id: 'uk-fb-post-local',
    question: 'Can local businesses use Facebook Post Likes?',
    answer:
      'Yes. Eligible public posts from local-business Pages can use Post Likes packages. Use them around content that accurately represents the real business.',
  },
  {
    id: 'uk-fb-post-older',
    question: 'Can I buy Likes for an older Facebook post?',
    answer:
      'If the post remains eligible and publicly accessible, it may be suitable for an order. Check the direct post URL and current service requirements before purchasing.',
  },
  {
    id: 'uk-fb-post-client',
    question: 'Can I order Facebook Post Likes for a client?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public post URL and review the order details carefully.",
  },
  {
    id: 'uk-fb-post-wrong-url',
    question: 'What happens if I submit the wrong post URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the direct post URL before checkout.',
  },
  {
    id: 'uk-fb-post-track',
    question: 'Can I track my Facebook Post Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-fb-post-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukFbPostLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom Facebook Post Likes content from supplied copy.');
