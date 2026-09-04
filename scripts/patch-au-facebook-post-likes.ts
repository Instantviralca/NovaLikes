/**
 * Apply supplied Australia Facebook Post Likes copy.
 * Run: npx tsx scripts/patch-au-facebook-post-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AU = '/au';
const file = path.join(process.cwd(), 'content/markets/au/services/buy-facebook-post-likes.json');
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
  title: 'Buy Facebook Post Likes Australia | Likes for Posts | NovaLikes',
  description:
    'Buy Facebook Post Likes in Australia for public posts. Compare flexible packages, order without sharing your password and track your purchase online.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR AUSTRALIA';
hero.title = 'Buy Facebook Post Likes in Australia and Strengthen Post Engagement';
hero.description =
  'Put more visible engagement behind the Facebook posts that matter most. NovaLikes gives Australian businesses, brands, creators and Page managers a straightforward way to buy Facebook Post Likes for eligible public posts without sharing account login details. Choose the number of Likes you want, submit the exact public Facebook post URL and complete your order online. Whether you\'re supporting a product launch, business announcement, campaign post, project showcase, event or an important piece of evergreen content, choose your Post Likes package around the content you\'re actually trying to strengthen.';
hero.primaryCta = { label: 'Choose Your Facebook Post Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-post-trust-url', label: 'Public Facebook Post URL Only' },
  { id: 'fb-post-trust-password', label: 'No Password Required' },
  { id: 'fb-post-trust-pricing', label: 'Clear Pricing' },
  { id: 'fb-post-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Post Likes Package That Fits the Content';
pricing.description =
  'Different Facebook posts have different purposes. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Post Likes. A routine update may only need a smaller quantity. A campaign launch, major announcement or strong evergreen post may justify something larger. Before choosing, consider the current Like count, how important the post is, your Page size and the increase you actually want rather than automatically selecting the largest available package.';
pricing.primaryCtaLabel = 'Compare Facebook Post Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'au-fb-post-where-buy',
  'au-fb-post-get-more',
  'au-fb-post-cheap',
  'au-fb-post-real',
  'au-fb-post-how-many',
  'au-fb-post-password',
  'au-fb-post-admin',
  'au-fb-post-info',
  'au-fb-post-page-url',
  'au-fb-post-cost',
  'au-fb-post-delivery',
  'au-fb-post-followers',
  'au-fb-post-page-likes',
  'au-fb-post-reach',
  'au-fb-post-comments-shares',
  'au-fb-post-business',
  'au-fb-post-local',
  'au-fb-post-older',
  'au-fb-post-client',
  'au-fb-post-wrong-url',
  'au-fb-post-track',
];

related.title = 'Explore More Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Put More Likes Behind the Facebook Posts That Matter';
finalCta.description =
  'Choose the post you want to support, select a Facebook Post Likes package that fits the content and submit the correct public post URL without sharing your password or Page access. Then keep strengthening what the Like count cannot replace: useful content, genuine customer interaction, real business proof and a Facebook Page people can trust.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Post Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-post-likes-australia',
  title: 'Why Choose NovaLikes for Facebook Post Likes?',
  description: 'Buying Post Likes should be easy to understand before checkout.',
  items: [
    {
      id: 'fb-post-wc-post',
      title: 'Likes for Specific Posts',
      description: 'Your order applies to the eligible public Facebook post connected to the URL you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-post-wc-packages',
      title: 'Flexible Package Sizes',
      description: 'Choose from smaller and larger Post Like quantities depending on the individual post.',
      icon: 'users',
    },
    {
      id: 'fb-post-wc-password',
      title: 'No Facebook Password Required',
      description: 'NovaLikes does not need your Facebook password, verification codes or private Page access.',
      icon: 'lock',
    },
    {
      id: 'fb-post-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the Post Like quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'fb-post-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your order through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-post-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterward for available status information.',
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
  id: 'buy-facebook-post-likes-without-login-australia',
  title: 'Buy Facebook Post Likes Without Sharing Your Login',
  description:
    'A Post Likes order should not require control of your Facebook account or Page. NovaLikes uses the public post information required for the service.',
  cards: [
    {
      id: 'fb-post-can-need',
      title: 'What You Need',
      description: 'The exact public Facebook post URL and your selected Post Likes package.',
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
    'Before checkout, open the link yourself and make sure it goes directly to the individual post you want to support. A general Facebook Page URL is not the correct target for a Post Likes order.',
};

config.doesBuyingHelp = {
  id: 'real-facebook-post-likes-australia',
  title: 'Looking for “Real Facebook Post Likes”? Check the Actual Service',
  description:
    '"Real Facebook Post Likes" is a common phrase people may use when comparing engagement providers. You may also see terms such as high-quality Facebook Post Likes, active Facebook Likes or organic Facebook Likes. Different providers may use those labels differently.',
  helpTitle: 'Rather than relying only on the wording, ask',
  helpItems: [
    'What metric changes?',
    'How many Likes are included?',
    'Which post receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Facebook Post Likes Packages Do',
  limitItems: [
    'Increase the Like count displayed on the eligible public post submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, reach, Followers, Page Likes, comments, shares, customers or sales. Clear expectations make it easier to compare services realistically.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-post-likes-order-australia',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Post Likes package and submitted Facebook post URL are associated with the purchase. The order is then processed for that specific post.',
  steps: [
    {
      id: 'fb-post-th-1',
      title: 'Keep the Post Public',
      description: 'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'fb-post-th-2',
      title: "Don't Delete It Mid-Order",
      description: 'Removing the post may interfere with an active order.',
    },
    {
      id: 'fb-post-th-3',
      title: 'Check the URL Carefully',
      description: 'Make sure your purchase points to the exact post you intended to use.',
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
  id: 'facebook-post-likes-page-likes-followers-australia',
  title: 'Facebook Post Likes, Page Likes and Followers Are Different Metrics',
  description: 'Choose the service based on the exact metric you want to change.',
  current: {
    title: 'Facebook Post Likes',
    description: 'Like count displayed on one eligible public Facebook post',
    bestFor: 'Individual post engagement',
    ctaLabel: 'Facebook Post Likes',
  },
  likes: {
    title: 'Facebook Page Likes',
    description: 'Page-level Like count on an eligible public Facebook Page',
    bestFor: 'Page Like count',
    href: auHref('/buy-facebook-page-likes'),
    ctaLabel: 'Buy Facebook Page Likes',
  },
  views: {
    title: 'Facebook Followers',
    description: 'Follower count displayed on an eligible public Facebook Page',
    bestFor: 'Page follower count',
    href: auHref('/buy-facebook-followers'),
    ctaLabel: 'Buy Facebook Followers',
  },
  combinedNote:
    'Choose Post Likes for individual content. Choose Page Likes for the Page-level Like count. Choose Followers for Page audience size. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-post-likes-australia',
  title: 'Before You Buy Facebook Post Likes in Australia',
  description: 'Check these details before completing your order.',
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
      description: 'Do not submit only the general Facebook Page URL.',
      icon: 'sparkles',
    },
    {
      id: 'fb-post-bb-quantity',
      title: 'Check the Like Quantity',
      description: "Make sure you're selecting the number of Post Likes you actually want.",
      icon: 'credit-card',
    },
    {
      id: 'fb-post-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package quantity and current price before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-post-bb-public',
      title: 'Keep the Post Public',
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
      title: 'Keep Admin Access Private',
      description: 'You do not need to provide Page admin, Business Manager or Meta Business Suite access.',
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
      description: 'Read the applicable service and refund information before completing your purchase.',
      icon: 'clapperboard',
    },
  ],
};

config.worldwide = {
  id: 'dont-measure-post-by-likes-alone-australia',
  title: "Don't Measure a Facebook Post by Likes Alone",
  description:
    'A public Like count tells you one thing about a post. It does not tell you the complete story of how genuine users responded. When reviewing your own Facebook performance, also consider:',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased Post Likes change one visible metric. Use genuine Facebook insights and your own business data for wider decisions.',
  cards: [
    {
      id: 'fb-post-ww-comments',
      title: 'Genuine Comments',
      description: 'What are real users asking or saying?',
      icon: 'users',
    },
    {
      id: 'fb-post-ww-shares',
      title: 'Shares',
      description: 'Are people choosing to share the post with others?',
      icon: 'heart',
    },
    {
      id: 'fb-post-ww-clicks',
      title: 'Clicks',
      description: 'If the post links somewhere useful, are genuine users taking that next step?',
      icon: 'clapperboard',
    },
    {
      id: 'fb-post-ww-messages',
      title: 'Messages',
      description: 'Does the post lead to actual customer enquiries?',
      icon: 'briefcase',
    },
    {
      id: 'fb-post-ww-page',
      title: 'Page Activity',
      description: 'Are people exploring the Page behind the content?',
      icon: 'megaphone',
    },
    {
      id: 'fb-post-ww-outcomes',
      title: 'Business Results',
      description: 'Did the post contribute to the goal behind the campaign?',
      icon: 'map-pin',
    },
  ],
};

config.packageSizes = {
  id: 'choose-facebook-post-likes-package-australia',
  title: 'Choose a Post Likes Package That Fits the Content',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Post Likes. A routine update may only need a smaller quantity. A campaign launch, major announcement or strong evergreen post may justify something larger.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'fb-post-ps-count',
      quantity: 'The Current Like Count',
      recommendedFor: 'Start with the visible engagement already shown on the post.',
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
        'The same Post Like quantity can look different on a newer Page and an established brand presence.',
    },
    {
      id: 'fb-post-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on the specific post rather than automatically selecting the largest available package.',
    },
  ],
  bottomNote: 'Compare Facebook Post Likes Packages',
};

config.bestPractices = {
  id: 'affordable-facebook-post-likes-australia',
  title: 'Looking for Affordable Facebook Post Likes in Australia?',
  description:
    "If you're searching for cheap Facebook Post Likes in Australia, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Facebook Post Likes service should make these details clear before checkout. NovaLikes lets you compare the available quantities and current prices before choosing.',
  items: [
    { id: 'fb-post-bp-1', title: 'Post Like Quantity', description: 'Check how many Likes are included.', icon: 'users' },
    { id: 'fb-post-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'fb-post-bp-3', title: 'Public Post Requirements', description: 'Confirm what post URL is required.', icon: 'clapperboard' },
    { id: 'fb-post-bp-4', title: 'Password and Admin Policy', description: 'Check whether password or admin access is requested.', icon: 'lock' },
    { id: 'fb-post-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'fb-post-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    { id: 'fb-post-bp-7', title: 'Service Policies', description: 'Review what the package actually changes.', icon: 'sparkles' },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-post-likes-australia',
  title: 'Common Mistakes When Buying Facebook Post Likes',
  description: '',
  closingNote: '',
  items: [],
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
  id: 'which-facebook-posts-worth-likes-australia',
  title: 'Which Facebook Posts Are Worth Supporting With More Likes?',
  description:
    "You don't need to add Likes to every post. A stronger approach is to identify the content that has a clear purpose.",
  items: [
    {
      id: 'fb-post-wb-launch',
      title: 'Product Launches',
      description: 'Support the post that best introduces, explains or showcases the product.',
    },
    {
      id: 'fb-post-wb-announcement',
      title: 'Business Announcements',
      description: 'A new service, location, milestone or company update may deserve more attention than a routine post.',
    },
    {
      id: 'fb-post-wb-project',
      title: 'Project Showcases',
      description:
        'Builders, designers, agencies, photographers and other service businesses can focus on work they would genuinely want potential customers to see.',
    },
    {
      id: 'fb-post-wb-event',
      title: 'Event Posts',
      description: 'Use Post Likes around content promoting an event, opening, workshop or community activity.',
    },
    {
      id: 'fb-post-wb-campaign',
      title: 'Promotional Campaigns',
      description: 'Support the main campaign post instead of spreading engagement across unrelated content.',
    },
    {
      id: 'fb-post-wb-evergreen',
      title: 'Evergreen Content',
      description: 'Helpful guides, FAQs, introductions and strong business posts can continue representing the Page long after publication.',
    },
  ],
  bottomNote: "Choose the post first. Then decide whether adding more visible Likes supports what you're trying to achieve.",
};

dummy.howToBuy = {
  id: 'how-facebook-post-likes-order-works-australia',
  title: 'How Your Facebook Post Likes Order Works',
  description: 'The process starts with the post you want to support.',
  steps: [
    {
      id: 'fb-post-step-1',
      title: 'Choose the Post',
      description: 'Start with the exact public Facebook post you want to support.',
    },
    {
      id: 'fb-post-step-2',
      title: 'Select Your Post Likes Package',
      description: 'Compare the available quantities and current pricing.',
    },
    {
      id: 'fb-post-step-3',
      title: 'Submit the Direct Post URL',
      description: 'Paste the correct public Facebook post link into the required field.',
    },
    {
      id: 'fb-post-step-4',
      title: 'Review the Order',
      description: 'Check the post URL, Like quantity and current package price.',
    },
    {
      id: 'fb-post-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your Facebook password.',
    },
    {
      id: 'fb-post-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterward for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Facebook Post Likes in Australia?',
  text: 'You can buy Facebook Post Likes in Australia through NovaLikes for eligible public posts. Choose an available Post Likes package, submit the exact public Facebook post URL and complete checkout without sharing your password. The Likes apply to that specific post and do not automatically increase Facebook Followers or the Page Like count.',
};

dummy.storySections = [
  {
    id: 'built-for-australia',
    title: 'Built for Australian Businesses, Brands and Creators',
    lead: 'Facebook posts can play very different roles depending on the Page behind them.',
    paragraphs: [
      'An Australian retailer may use Facebook around a product launch or sale. A local service business may post completed work. A restaurant may share new menu items or events. A creator may publish partnership content. An ecommerce brand may use Facebook as part of a wider campaign. An agency may manage different posts for multiple clients.',
      'That means Post Likes should fit the actual content.',
    ],
    footer: 'Post Likes can support presentation. The content behind them still needs a purpose.',
    items: [
      { title: 'Local Businesses', body: 'Support posts that show real services, projects, locations or updates.' },
      { title: 'Ecommerce Brands', body: 'Focus on product launches, campaign posts and seasonal promotions.' },
      { title: 'Creators', body: 'Use Post Likes around collaboration content, announcements or important Page updates.' },
      { title: 'Agencies', body: 'Choose Like quantities based on individual client posts rather than using the same package everywhere.' },
      { title: 'Established Brands', body: 'Put more visible engagement behind priority content while continuing your wider Facebook strategy.' },
    ],
  },
  {
    id: 'campaign-content',
    title: 'Put More Engagement Behind Important Australian Campaign Content',
    lead: 'Some Facebook posts matter more because of the campaign around them.',
    footer:
      'Visible Likes can support how the content appears. The campaign itself still depends on the message, offer and customer experience behind it.',
    items: [
      { title: 'Product Releases', body: 'Support the post that introduces or explains the product most clearly.' },
      { title: 'Boxing Day Campaigns', body: "Australian retail and ecommerce brands may have higher-priority content around one of the country's major shopping periods." },
      { title: 'Summer Promotions', body: 'Travel, hospitality, events, fashion and other seasonal businesses may have important content during Australia\'s summer.' },
      { title: 'New Location Announcements', body: 'Businesses expanding into another suburb or city can support the post carrying the main announcement.' },
      { title: 'Creator Partnerships', body: 'Put Likes behind the strongest collaboration content rather than unrelated Page posts.' },
      { title: 'Events and Community Campaigns', body: 'Local events, openings, partnerships and community activity can create posts worth highlighting.' },
    ],
  },
  {
    id: 'strong-content',
    title: 'Make Strong Content Look More Active at First Glance',
    lead: 'A Facebook post Like count is one of several things people may notice.',
    bullets: [
      'the post image or video',
      'caption',
      'comments',
      'shares',
      'Page name',
      'business information',
      'recent Page activity',
    ],
    paragraphs: [
      'A larger Like count can make the post look more active. But it cannot change the quality of the content itself.',
      'Strong visuals, accurate information and a clear message still matter.',
    ],
    footer: 'Post Likes can support presentation. The post gives people a reason to pay attention.',
  },
  {
    id: 'real-activity',
    title: 'Build Post Engagement Around Real Business Activity',
    lead: 'Some of the strongest Facebook content comes from things the business genuinely does.',
    footer: 'This gives the Like count context. The post is backed by actual business activity rather than empty promotional language.',
    items: [
      { title: 'Completed Projects', body: 'Show real work rather than generic claims.' },
      { title: 'Products You Actually Sell', body: 'Use accurate information, photos and details.' },
      { title: 'Business Milestones', body: 'Share genuine expansions, anniversaries or achievements.' },
      { title: 'Events', body: 'Publish accurate dates, locations and event information.' },
      { title: 'Customer Questions', body: 'Turn common questions into useful posts.' },
      { title: 'Behind-the-Scenes Content', body: 'Show real processes, people or locations where appropriate.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Facebook Post Likes for Australian Local Businesses',
    paragraphs: [
      'For local businesses, Facebook posts can help customers understand what the business actually does. A restaurant may post a new dish. A builder may share a finished renovation. A salon may show recent work. A retailer may announce new stock. A real estate business may publish a property update. A tourism company may showcase an experience. A professional service may explain an important topic.',
      "If you're supporting this content with Post Likes, keep the Page behind it accurate and active.",
    ],
    footer: 'Visible engagement can support presentation. Local trust comes from the real business behind the post.',
  },
  {
    id: 'customer-proof',
    title: 'Use Post Likes Alongside Genuine Customer Proof',
    paragraphs: [
      'A Like count can contribute to how active a post appears. It is not the same as genuine customer evidence.',
      'For Australian businesses, stronger trust can also come from genuine reviews, Facebook Recommendations, authentic testimonials, real customer comments, completed projects, case studies, customer photos, accurate business details and responsive customer service.',
      'If you have genuine proof, use it. Post Likes can support one visible interaction metric. Real customer experience gives people stronger reasons to trust the business.',
    ],
  },
  {
    id: 'organic-reach',
    title: 'Post Likes and Organic Reach Are Not the Same Thing',
    lead: 'A higher Like count does not automatically mean Facebook will distribute the post to more people.',
    bullets: [
      'increase organic reach',
      'add Followers',
      'add Page Likes',
      'create comments',
      'generate shares',
      'increase website traffic',
      'create enquiries',
      'produce bookings',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes Facebook Post Likes packages are designed around the Like count displayed on the selected eligible public post.',
      'Organic distribution and genuine audience response are separate outcomes. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'clear-goal',
    title: 'Use Post Likes Around Content With a Clear Goal',
    lead: 'Before supporting a post, ask what job the content is supposed to do.',
    footer: 'A post with a clear purpose gives the visible engagement around it more context.',
    items: [
      { title: 'Awareness', body: 'Is the post introducing something important?' },
      { title: 'Education', body: 'Does it explain a useful topic?' },
      { title: 'Proof', body: 'Does it show real work, products or business activity?' },
      { title: 'Promotion', body: 'Is there a clear offer?' },
      { title: 'Conversation', body: 'Does the post invite genuine discussion?' },
      { title: 'Conversion', body: 'Does an interested user know what to do next?' },
    ],
  },
  {
    id: 'campaign-presentation',
    title: 'Post Likes Can Support Campaign Presentation Without Replacing the Campaign',
    lead: 'A post can look more active and still fail commercially if the campaign behind it is weak.',
    footer: 'Post Likes can support the visible presentation. They do not replace the work needed to make a campaign effective.',
    items: [
      { title: 'A Clear Offer', body: 'People should understand what is being promoted.' },
      { title: 'Accurate Details', body: 'Prices, dates, locations and conditions should be correct.' },
      { title: 'Strong Creative', body: 'The image or video should support the campaign message.' },
      { title: 'A Useful Next Step', body: 'Make it easy for interested users to learn more, contact you or buy.' },
      { title: 'Genuine Follow-Up', body: 'Real customer questions should be handled by the business itself.' },
    ],
  },
  {
    id: 'facebook-insights',
    title: 'Use Facebook Insights to Understand Real Post Performance',
    lead: 'Post Likes are only one visible metric. If insights are available for your Page, use them to understand how genuine users actually respond to your content.',
    footer:
      'Purchased Post Likes change one visible number. Your genuine Page data should guide your broader strategy.',
    items: [
      { title: 'Which Posts Earn Real Attention?', body: 'Compare actual performance across multiple posts.' },
      { title: 'Which Topics Generate Genuine Interaction?', body: 'Look at real comments, shares and other engagement.' },
      { title: 'Which Formats Work Better?', body: 'Images, videos, links and other post types may perform differently.' },
      { title: 'Are People Taking Useful Actions?', body: 'For businesses, genuine user behaviour may include website visits, messages or bookings.' },
      { title: 'What Should You Publish Next?', body: 'Use real performance data to shape future content instead of relying only on Like totals.' },
    ],
  },
  {
    id: 'content-framework',
    title: 'A Practical Facebook Content Framework for Australian Pages',
    lead: 'Post Likes can support selected content, but stronger Facebook marketing needs more than one metric.',
    footer:
      'Visible engagement can support individual content. Long-term growth comes from the Page and business behind it.',
    items: [
      { title: 'Build a Useful Content Mix', body: 'Combine updates, educational posts, proof, promotions and community content.' },
      { title: 'Focus on Priority Posts', body: "Don't treat every piece of content as equally important." },
      { title: 'Use Real Business Experience', body: 'Show genuine products, services, projects and knowledge.' },
      { title: 'Keep Page Information Current', body: 'Make sure visitors can verify the business behind the content.' },
      { title: 'Reply to Genuine Interaction', body: 'Real comments and messages deserve genuine responses.' },
      { title: 'Review Your Actual Performance', body: 'Use available Page insights and business data to understand what works.' },
      {
        title: 'Connect Facebook to Wider Marketing',
        body: 'Australian businesses may use Facebook alongside Instagram, Google, SEO, paid advertising, email and their website.',
      },
      {
        title: 'Keep Post Likes in Perspective',
        body: 'Visible engagement can support individual content. Long-term growth comes from the Page and business behind it.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/au/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-post-likes'] = {
  title: 'Buy Facebook Post Likes Australia | Likes for Posts | NovaLikes',
  description:
    'Buy Facebook Post Likes in Australia for public posts. Compare flexible packages, order without sharing your password and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/au/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const auFbPostLikesFaqs = [
  {
    id: 'au-fb-post-where-buy',
    question: 'Where can I buy Facebook Post Likes in Australia?',
    answer:
      'You can buy Facebook Post Likes in Australia through NovaLikes for eligible public posts. Choose a Post Likes package, submit the direct public Facebook post URL and complete checkout without sharing your password.',
  },
  {
    id: 'au-fb-post-get-more',
    question: 'How can I get more Likes on a Facebook post?',
    answer:
      'NovaLikes Post Likes packages can increase the visible Like count on an eligible public post. For organic engagement, continue publishing useful content, responding to genuine users and reviewing real Page performance.',
  },
  {
    id: 'au-fb-post-cheap',
    question: 'Can I buy cheap Facebook Post Likes in Australia?',
    answer:
      'NovaLikes offers multiple Post Like quantities so you can compare current package sizes and prices. When comparing cheaper services, also review password requirements, tracking, support and what the package actually changes.',
  },
  {
    id: 'au-fb-post-real',
    question: 'What are real Facebook Post Likes?',
    answer:
      '"Real Facebook Post Likes" can mean different things depending on the provider. Review the actual service details rather than relying only on the phrase. NovaLikes Post Likes packages are designed to increase the visible Like count on the eligible submitted post.',
  },
  {
    id: 'au-fb-post-how-many',
    question: 'How many Facebook Post Likes should I buy?',
    answer:
      'There is no single ideal quantity for every post. Consider its existing Like count, Page size, content purpose and the increase you actually want before selecting a package.',
  },
  {
    id: 'au-fb-post-password',
    question: 'Do I need my Facebook password?',
    answer: 'No. NovaLikes does not require your Facebook password, verification codes or private login access.',
  },
  {
    id: 'au-fb-post-admin',
    question: 'Do I need Page admin access to order Post Likes?',
    answer: 'No. You only need the correct public Facebook post URL for the eligible content.',
  },
  {
    id: 'au-fb-post-info',
    question: 'What information do I need?',
    answer: 'You need the direct public Facebook post URL and the Post Likes package you want to purchase.',
  },
  {
    id: 'au-fb-post-page-url',
    question: 'Can I use my Facebook Page URL?',
    answer:
      'No. A Post Likes order should use the direct URL of the individual eligible Facebook post rather than only the general Page URL.',
  },
  {
    id: 'au-fb-post-cost',
    question: 'How much does it cost to buy Facebook Post Likes in Australia?',
    answer:
      'Pricing depends on the Post Like quantity you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'au-fb-post-delivery',
    question: 'How long does it take to get Facebook Post Likes?',
    answer:
      'Processing time can vary depending on the selected quantity and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'au-fb-post-followers',
    question: 'Will buying Post Likes increase my Facebook Followers?',
    answer: 'Not automatically. Facebook Followers are a separate Page-level metric and service.',
  },
  {
    id: 'au-fb-post-page-likes',
    question: 'Will buying Post Likes increase my Facebook Page Likes?',
    answer: 'Not automatically. Facebook Page Likes are a separate Page-level metric.',
  },
  {
    id: 'au-fb-post-reach',
    question: 'Will buying Facebook Post Likes increase organic reach?',
    answer:
      'There is no guarantee. A Post Likes package changes the visible Like count on the selected post. Organic Facebook distribution depends on separate factors.',
  },
  {
    id: 'au-fb-post-comments-shares',
    question: 'Will Post Likes create comments or shares?',
    answer: 'Not automatically. Comments and shares are separate types of Facebook interaction.',
  },
  {
    id: 'au-fb-post-business',
    question: 'Can Australian businesses buy Facebook Post Likes?',
    answer:
      'Eligible public Facebook posts used by Australian businesses, brands, creators, agencies and other supported Pages can use NovaLikes Post Likes packages.',
  },
  {
    id: 'au-fb-post-local',
    question: 'Can local businesses use Facebook Post Likes?',
    answer:
      'Yes. Eligible public posts from local-business Pages can use Post Likes packages. Use them around content that accurately represents the business.',
  },
  {
    id: 'au-fb-post-older',
    question: 'Can I buy Likes for an older Facebook post?',
    answer:
      'If the post remains eligible and publicly accessible, it may be suitable for an order. Check the direct post URL and current service requirements before purchasing.',
  },
  {
    id: 'au-fb-post-client',
    question: 'Can I order Facebook Post Likes for a client?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public post URL and review the order details carefully.",
  },
  {
    id: 'au-fb-post-wrong-url',
    question: 'What happens if I submit the wrong post URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order information. Always check the exact post URL before checkout.',
  },
  {
    id: 'au-fb-post-track',
    question: 'Can I track my Facebook Post Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('au-fb-post-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...auFbPostLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Australia Facebook Post Likes content from supplied copy.');
