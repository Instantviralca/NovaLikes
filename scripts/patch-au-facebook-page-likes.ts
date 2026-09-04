/**
 * Apply supplied Australia Facebook Page Likes copy.
 * Run: npx tsx scripts/patch-au-facebook-page-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AU = '/au';
const file = path.join(process.cwd(), 'content/markets/au/services/buy-facebook-page-likes.json');
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
  title: 'Buy Facebook Page Likes Australia | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook Page Likes in Australia for public Pages. Compare flexible packages, order without sharing your password and track your Page Likes order online.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR AUSTRALIA';
hero.title = 'Buy Facebook Page Likes in Australia and Build a Stronger Page';
hero.description =
  "Strengthen the visible presence around the Facebook Page you're already building. NovaLikes gives Australian businesses, brands, creators, organisations and Page managers a straightforward way to buy Facebook Page Likes without sharing account login details. Choose the number of Page Likes you want, submit the correct public Facebook Page URL and complete your order online. Whether you're building a newer business Page, preparing for a campaign, launching a brand or strengthening an established Facebook presence, choose a Page Likes package that fits where your Page is today.";
hero.primaryCta = { label: 'Choose Your Facebook Page Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-pl-trust-url', label: 'Public Facebook Page URL Only' },
  { id: 'fb-pl-trust-password', label: 'No Password Required' },
  { id: 'fb-pl-trust-pricing', label: 'Clear Pricing' },
  { id: 'fb-pl-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Facebook Page Likes Package That Fits Your Page';
pricing.description =
  'Different Facebook Pages need different quantities. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Page Likes. A newer business Page may prefer a smaller increase. An established brand or Page supporting a larger campaign may choose something different. Before ordering, consider your current Page Like count, how established the Page looks, what the Page represents, what you\'re building toward and the increase you actually want rather than automatically selecting the biggest available package.';
pricing.primaryCtaLabel = 'Compare Facebook Page Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'au-fb-pl-where-buy',
  'au-fb-pl-get-more',
  'au-fb-pl-cheap',
  'au-fb-pl-real',
  'au-fb-pl-how-many',
  'au-fb-pl-password',
  'au-fb-pl-admin',
  'au-fb-pl-meta',
  'au-fb-pl-info',
  'au-fb-pl-cost',
  'au-fb-pl-delivery',
  'au-fb-pl-vs-followers',
  'au-fb-pl-followers',
  'au-fb-pl-post-likes',
  'au-fb-pl-reach',
  'au-fb-pl-business',
  'au-fb-pl-local',
  'au-fb-pl-older',
  'au-fb-pl-client',
  'au-fb-pl-wrong-page',
  'au-fb-pl-track',
];

related.title = 'Explore More Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Build a Facebook Page People Can Trust Beyond the Like Count';
finalCta.description =
  'Choose the Facebook Page Likes package that fits your Page, submit the correct public Page URL and place your order without sharing your password or admin access. Then keep strengthening what the Page Like number cannot replace: accurate business information, genuine customer proof, useful content and a Page that gives people a reason to engage with the business behind it.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Page Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-page-likes-australia',
  title: 'Why Choose NovaLikes for Facebook Page Likes?',
  description: 'Buying Facebook Page Likes should be easy to understand before checkout.',
  items: [
    {
      id: 'fb-pl-wc-packages',
      title: 'Multiple Page Like Quantities',
      description: 'Compare the available quantities and choose the package that fits your Page.',
      icon: 'users',
    },
    {
      id: 'fb-pl-wc-url',
      title: 'Public Facebook Page URL Only',
      description: 'Provide the exact eligible public Page where you want the Page Likes added.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-pl-wc-password',
      title: 'No Facebook Password Required',
      description: 'NovaLikes does not need your Facebook password, verification codes or Page admin credentials.',
      icon: 'lock',
    },
    {
      id: 'fb-pl-wc-pricing',
      title: 'Clear Pricing Before Checkout',
      description: 'Review the selected Page Like quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'fb-pl-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your order through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-pl-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes order tracking afterward for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'fb-pl-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with your relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-facebook-page-likes-without-login-australia',
  title: 'Buy Facebook Page Likes Without Sharing Admin Access',
  description:
    'A Page Likes order should not require you to hand over control of your Facebook Page. NovaLikes uses the public Page URL required for the service.',
  cards: [
    {
      id: 'fb-pl-can-need',
      title: 'What You Need',
      description: 'The correct public Facebook Page URL and your selected Page Likes package.',
      icon: 'users',
    },
    {
      id: 'fb-pl-can-not-need',
      title: "What You Don't Need",
      description:
        'Your Facebook password, verification codes, Page admin login, Meta Business Suite access, Business Manager access or private messages.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the Page URL yourself. Make sure it goes directly to the Page where you want the Page Likes applied. A link to an individual Facebook post is not the correct target for this service.',
};

config.doesBuyingHelp = {
  id: 'real-facebook-page-likes-australia',
  title: 'Looking for “Real Facebook Page Likes”? Check the Actual Service',
  description:
    '"Real Facebook Page Likes" is a common phrase people may use while comparing services. You may also see terms such as high-quality Facebook Page Likes, active Facebook Page Likes or organic Facebook Page Likes. Different providers may use these labels differently.',
  helpTitle: 'Rather than relying only on the wording, ask',
  helpItems: [
    'What metric changes?',
    'How many Page Likes are included?',
    'Which Page receives them?',
    'What information is required?',
    'Does the provider guarantee anything beyond the Page Like count?',
  ],
  limitTitle: 'What NovaLikes Facebook Page Likes Packages Do',
  limitItems: [
    'Increase the Page Like count on the eligible public Facebook Page submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Followers, Post Likes, reach, customers or sales. Clear service expectations make it easier to compare providers realistically.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-page-likes-order-australia',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Page Likes package and submitted Facebook Page URL are associated with your purchase. The order is then processed for the intended Page.',
  steps: [
    {
      id: 'fb-pl-th-1',
      title: 'Keep the Page Publicly Accessible',
      description: 'The submitted Page should remain available where required during processing.',
    },
    {
      id: 'fb-pl-th-2',
      title: 'Check the URL Carefully',
      description: "Make sure you've submitted the correct Facebook Page before completing checkout.",
    },
    {
      id: 'fb-pl-th-3',
      title: 'Avoid Making the Page Unavailable',
      description: 'Deleting or restricting access to the submitted Page can interfere with processing.',
    },
    {
      id: 'fb-pl-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on the Page Like quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'facebook-page-likes-followers-post-likes-australia',
  title: 'Page Likes, Followers or Post Likes: Choose by Goal',
  description: 'Different Facebook services affect different metrics.',
  current: {
    title: 'Facebook Page Likes',
    description: 'Page-level Like count on an eligible public Facebook Page',
    bestFor: 'Page Like count',
    ctaLabel: 'Facebook Page Likes',
  },
  likes: {
    title: 'Facebook Followers',
    description: 'Follower count displayed on an eligible public Facebook Page',
    bestFor: 'Page follower count',
    href: auHref('/buy-facebook-followers'),
    ctaLabel: 'Buy Facebook Followers',
  },
  views: {
    title: 'Facebook Post Likes',
    description: 'Like count on one eligible public Facebook post',
    bestFor: 'Individual post likes',
    href: auHref('/buy-facebook-post-likes'),
    ctaLabel: 'Buy Facebook Post Likes',
  },
  combinedNote:
    'Choose Page Likes for the Page-level Like count. Choose Followers for Page audience size. Choose Post Likes for a specific post. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-page-likes-australia',
  title: 'Before You Buy Facebook Page Likes in Australia',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'fb-pl-bb-page',
      title: 'Confirm the Exact Facebook Page',
      description: 'Open the Page where you want the Page Likes added.',
      icon: 'users',
    },
    {
      id: 'fb-pl-bb-url',
      title: 'Copy the Correct Public Page URL',
      description: 'Do not submit the URL of an individual Facebook post.',
      icon: 'sparkles',
    },
    {
      id: 'fb-pl-bb-quantity',
      title: 'Check the Page Like Quantity',
      description: "Make sure you're ordering the number you actually want.",
      icon: 'credit-card',
    },
    {
      id: 'fb-pl-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package quantity and current price before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-pl-bb-public',
      title: 'Keep the Page Accessible',
      description: 'Avoid deleting or making the submitted Page unavailable while processing requires access.',
      icon: 'lock',
    },
    {
      id: 'fb-pl-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Facebook password.',
      icon: 'headphones',
    },
    {
      id: 'fb-pl-bb-admin',
      title: 'Keep Admin Access Private',
      description: 'You do not need to provide Page admin, Business Manager or Meta Business Suite access.',
      icon: 'megaphone',
    },
    {
      id: 'fb-pl-bb-service',
      title: 'Choose the Correct Facebook Service',
      description: 'Page Likes, Followers and Post Likes are separate metrics.',
      icon: 'heart',
    },
    {
      id: 'fb-pl-bb-policies',
      title: 'Review the Policies',
      description: 'Read the relevant purchase and refund information before completing your order.',
      icon: 'clapperboard',
    },
  ],
};

config.worldwide = {
  id: 'facebook-insights-real-performance-australia',
  title: 'Use Facebook Insights to Understand Real Page Performance',
  description:
    'Page Like count is only one metric. If performance insights are available for your Facebook Page, use them to understand how genuine users actually interact with your content.',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased Page Likes change one visible metric. Use genuine data to make wider marketing decisions.',
  cards: [
    {
      id: 'fb-pl-ww-posts',
      title: 'Which Posts Perform Best?',
      description: 'Compare real content performance over time.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-pl-ww-engagement',
      title: 'What Earns Genuine Engagement?',
      description: 'Look at authentic comments, reactions and other interactions.',
      icon: 'heart',
    },
    {
      id: 'fb-pl-ww-topics',
      title: 'Which Topics Matter to Your Audience?',
      description: 'Use real audience response to guide future content.',
      icon: 'users',
    },
    {
      id: 'fb-pl-ww-actions',
      title: 'Are People Taking Useful Actions?',
      description: 'For businesses, Page activity may contribute to website visits, enquiries or bookings.',
      icon: 'briefcase',
    },
    {
      id: 'fb-pl-ww-next',
      title: 'What Should You Publish Next?',
      description: 'Actual Page performance can provide better content direction than relying on a public Like count alone.',
      icon: 'megaphone',
    },
  ],
};

config.packageSizes = {
  id: 'choose-facebook-page-likes-package-australia',
  title: 'Choose a Facebook Page Likes Package That Fits Your Page',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Page Likes. A newer business Page may prefer a smaller increase. An established brand or Page supporting a larger campaign may choose something different.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'fb-pl-ps-count',
      quantity: 'Your Current Page Like Count',
      recommendedFor: 'Start with the number already shown on your Facebook Page.',
    },
    {
      id: 'fb-pl-ps-established',
      quantity: 'How Established the Page Looks',
      recommendedFor:
        'A complete Page with recent content, accurate business details and genuine activity provides more context behind the Like count.',
    },
    {
      id: 'fb-pl-ps-represents',
      quantity: 'What the Page Represents',
      recommendedFor:
        'A local business, ecommerce brand, creator Page and community organisation can all use Facebook differently.',
    },
    {
      id: 'fb-pl-ps-building',
      quantity: "What You're Building Toward",
      recommendedFor:
        'A launch, event, business expansion or promotional campaign may influence the quantity that makes sense.',
    },
    {
      id: 'fb-pl-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on your Page rather than automatically selecting the biggest available package.',
    },
  ],
  bottomNote: 'Compare Facebook Page Likes Packages',
};

config.bestPractices = {
  id: 'affordable-facebook-page-likes-australia',
  title: 'Looking for Affordable Facebook Page Likes in Australia?',
  description:
    "If you're searching for cheap Facebook Page Likes in Australia, price will naturally be part of your decision. But don't compare only the lowest number.",
  closingNote:
    'An affordable Facebook Page Likes service should make those basics clear before checkout. NovaLikes lets you compare the available quantities and current pricing before choosing.',
  items: [
    { id: 'fb-pl-bp-1', title: 'Number of Page Likes Included', description: 'Check how many Page Likes are in the package.', icon: 'users' },
    { id: 'fb-pl-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'fb-pl-bp-3', title: 'Public Page Requirements', description: 'Confirm what Page URL is required.', icon: 'clapperboard' },
    { id: 'fb-pl-bp-4', title: 'Password and Admin Policy', description: 'Check whether your password or admin access is requested.', icon: 'lock' },
    { id: 'fb-pl-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'fb-pl-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    { id: 'fb-pl-bp-7', title: 'Service Policies', description: 'Review what the package actually changes.', icon: 'sparkles' },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-page-likes-australia',
  title: 'Common Mistakes When Buying Facebook Page Likes',
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
    'buy-facebook-post-likes': {
      title: 'Facebook Post Likes',
      description:
        'Choose Post Likes when you want more visible Likes on one specific eligible public Facebook post.',
      ctaLabel: 'Buy Facebook Post Likes',
    },
  },
};

dummy.whyBuy = {
  id: 'stronger-first-impression-facebook-page-likes-australia',
  title: 'Build a Stronger First Impression Around Your Facebook Page',
  description:
    'People can form an opinion about a Facebook Page before reading much of its content. They may notice the Page name, profile image, cover image, Page Like count, follower count, recent posts, photos and videos, About information, reviews or Recommendations, contact details and overall Page activity. A larger Page Like count can support how established the Page appears at first glance. But the rest of the Page still needs to support that impression.',
  items: [
    { id: 'fb-pl-wb-business', title: 'For Businesses', description: 'Make it easy to understand what you offer.' },
    { id: 'fb-pl-wb-local', title: 'For Local Companies', description: 'Keep location and contact information current.' },
    { id: 'fb-pl-wb-brands', title: 'For Brands', description: 'Maintain consistent visuals and messaging.' },
    {
      id: 'fb-pl-wb-orgs',
      title: 'For Creators and Organisations',
      description: 'Make the purpose of the Page clear.',
    },
  ],
  bottomNote: 'Page Likes can strengthen one visible signal. The Page behind that number creates the wider impression.',
};

dummy.howToBuy = {
  id: 'how-facebook-page-likes-order-works-australia',
  title: 'How Your Facebook Page Likes Order Works',
  description: 'Compare packages, submit your Page URL and track your order afterward.',
  steps: [
    {
      id: 'fb-pl-step-1',
      title: 'Choose Your Page Likes Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'fb-pl-step-2',
      title: 'Enter the Facebook Page URL',
      description: 'Provide the exact public Page where you want the Page Likes added.',
    },
    {
      id: 'fb-pl-step-3',
      title: 'Review Your Order',
      description: 'Check the Page URL, Like quantity and current package price.',
    },
    {
      id: 'fb-pl-step-4',
      title: 'Complete Checkout',
      description: 'Place your order without providing your Facebook password or Page admin access.',
    },
    {
      id: 'fb-pl-step-5',
      title: 'Track Your Purchase',
      description: 'Use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Facebook Page Likes in Australia?',
  text: 'You can buy Facebook Page Likes in Australia through NovaLikes by choosing an available Page Likes package, submitting the correct public Facebook Page URL and completing checkout online. Your Facebook password is not required. Page Likes apply to the Page-level Like count and do not automatically add Facebook Followers or Likes to individual posts.',
};

dummy.storySections = [
  {
    id: 'built-for-australia',
    title: 'Built for Australian Businesses, Brands and Organisations',
    lead: 'Facebook Pages can serve different purposes across Australia.',
    paragraphs: [
      'A local business may use Facebook for customer updates and community visibility. An ecommerce company may use its Page around new product releases and promotions. A service business may showcase recent work. A restaurant or venue may publish opening information, events and seasonal updates. A creator may use Facebook alongside Instagram and TikTok. An organisation may use its Page to communicate with its community.',
      'That means Page Like growth should fit the Page you\'re actually managing.',
    ],
    footer: 'Page Likes can strengthen a visible Page metric. The business or organisation behind them still matters.',
    items: [
      { title: 'Local Businesses', body: 'Build a stronger visible Page presence around the business customers may research before making contact.' },
      { title: 'Ecommerce Brands', body: 'Support your Facebook Page alongside product launches, promotions and broader campaigns.' },
      { title: 'Service Businesses', body: 'Use the Page to show projects, answer questions and keep potential customers informed.' },
      { title: 'Creators', body: 'Strengthen the Page-level Like count while continuing to publish relevant content.' },
      { title: 'Agencies', body: 'Choose quantities according to each individual client Page rather than applying one fixed package across every campaign.' },
      { title: 'Established Brands', body: 'Support Page presentation while continuing genuine publishing, paid advertising and customer communication.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Facebook Page Likes for Australian Local Businesses',
    lead: 'For a local business, Facebook may be one of several places a potential customer checks before deciding whether to contact you.',
    bullets: ['Google', 'your website', 'Instagram', 'advertising', 'referrals', 'local community groups', 'another Facebook post'],
    paragraphs: [
      'Once they reach your Page, they may look at its activity and business information.',
      'A restaurant in Melbourne might show recent menu updates. A builder in Brisbane may publish completed projects. A salon in Sydney may showcase recent work. A retailer in Perth may announce new products. A tourism company may publish experiences and seasonal offers. A professional service may answer common customer questions.',
    ],
    footer: 'Page Likes can support how established that Facebook presence appears. Local trust comes from accurate information, genuine work and the real business behind the Page.',
  },
  {
    id: 'campaign-moments',
    title: 'Use Page Likes Around Important Australian Business Moments',
    lead: 'Some periods bring more attention to a Facebook Page than others.',
    footer:
      'Page Likes can support visible Page presentation during those moments. The real campaign still depends on the offer, content and customer experience behind it.',
    items: [
      { title: 'Launching a New Business', body: 'Build out your Page information and initial content before putting more attention behind it.' },
      { title: 'Opening a New Location', body: 'Businesses expanding into another suburb or Australian city can update the Page and publish relevant launch content.' },
      { title: 'Rebranding', body: 'A refreshed Page can support a wider change in company identity or positioning.' },
      { title: 'Product Launches', body: 'Make sure customers arriving on the Page can easily find information about the new product.' },
      { title: 'Boxing Day and Holiday Campaigns', body: 'Australian retailers and ecommerce brands may have higher-priority Facebook activity during major shopping periods.' },
      { title: 'Seasonal Promotions', body: 'Tourism, hospitality, home services, retail and other businesses may have periods where Page activity becomes particularly important.' },
      { title: 'Events', body: 'Venues, local businesses and organisations may use Facebook around event announcements and community activity.' },
    ],
  },
  {
    id: 'page-worth-exploring',
    title: 'Build Page Likes Around a Facebook Presence Worth Exploring',
    lead: 'A higher Page Like count is most useful when the Page itself gives visitors a reason to stay.',
    footer: 'Page Likes can support presentation. Good Page management makes the number more meaningful.',
    items: [
      { title: 'Complete Your Page Information', body: 'Make sure the Page accurately represents the business, brand or organisation.' },
      { title: 'Keep Your Website and Contact Details Current', body: "Don't send interested users toward outdated information." },
      { title: 'Maintain Recent Activity', body: 'A Page that has not been updated for a long time can create uncertainty.' },
      { title: 'Use Strong Page Visuals', body: 'Profile and cover images should clearly represent the organisation behind the Page.' },
      { title: 'Publish Useful Content', body: 'Give people information, updates, proof, offers or something relevant to engage with.' },
      { title: 'Make the Next Step Clear', body: 'If the Page represents a business, help interested visitors understand how to contact, shop, book or learn more.' },
    ],
  },
  {
    id: 'social-proof',
    title: 'Page Likes Can Support Social Proof Without Creating Reputation by Themselves',
    lead: 'A visible Page Like count can contribute to how established a Facebook Page appears. But it should not be confused with reputation.',
    footer: 'Use Page Likes as one visible signal. Build real reputation through the experience customers actually have with the business.',
    items: [
      { title: 'Real Customer Recommendations', body: 'Genuine feedback from people who have used the business.' },
      { title: 'Verified Reviews', body: 'Authentic review content where available.' },
      { title: 'Completed Projects', body: 'Show real work when relevant to your business.' },
      { title: 'Accurate Business Information', body: 'Keep company details consistent across official channels.' },
      { title: 'Responsive Customer Service', body: 'Answer genuine comments and messages usefully.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Facebook Page Likes Alongside Genuine Customer Proof',
    lead: 'If your business has genuine customer proof, show it.',
    footer: 'Page Likes can support visible popularity. Real customer evidence gives visitors stronger reasons to trust the business.',
    items: [
      { title: 'Real Reviews', body: 'Use feedback from customers who have actually used the business.' },
      { title: 'Facebook Recommendations', body: 'Genuine customer experiences can provide useful context for potential customers.' },
      { title: 'Real Projects', body: 'Show completed work when relevant to your business.' },
      { title: 'Customer Photos', body: 'Authentic customer-created content can add another layer of proof.' },
      { title: 'Case Studies', body: 'For professional services, explain real work and results accurately.' },
      { title: 'Genuine Business Information', body: 'Keep company details consistent across Facebook, your website and other official channels.' },
    ],
  },
  {
    id: 'page-likes-vs-followers',
    title: 'Page Likes and Facebook Followers Are Different Metrics',
    paragraphs: [
      'Facebook Page Likes apply to the Like count associated with an eligible public Facebook Page. Choose this service when that Page-level Like metric is what you want to change.',
      'Facebook Followers are another Page-level metric. Choose Facebook Followers when the follower count is your priority instead.',
      'Facebook Post Likes apply to one specific eligible public Facebook post. They do not change the overall Page Like count. Choosing the correct service helps ensure your order targets the metric you actually want.',
    ],
  },
  {
    id: 'reach-not-same',
    title: "More Facebook Page Likes Don't Automatically Mean More Reach",
    lead: 'A higher Page Like count and organic Facebook reach are different things.',
    bullets: [
      'increase Facebook Followers',
      'increase Post Likes',
      'generate comments',
      'increase shares',
      'improve organic post reach',
      'generate website traffic',
      'create customer enquiries',
      'increase bookings',
      'generate sales',
    ],
    paragraphs: [
      'NovaLikes Page Likes packages are designed around the Page Like count on the selected eligible public Facebook Page.',
      'How Facebook distributes content and how genuine users respond are separate outcomes. Use the service for the Page metric it actually changes.',
    ],
  },
  {
    id: 'content-people-need',
    title: 'Use Page Likes Alongside Content People Actually Need',
    lead: 'Facebook Pages still need content. For an Australian business, that could include:',
    footer: 'Page Likes can support the Page-level presentation. Content gives people a reason to pay attention after they arrive.',
    items: [
      { title: 'Business Updates', body: 'Share genuine changes, announcements and relevant company information.' },
      { title: 'Educational Content', body: 'Answer questions customers regularly ask.' },
      { title: 'Product Content', body: "Show what you're selling and explain it accurately." },
      { title: 'Project Examples', body: 'Use real work to demonstrate experience.' },
      { title: 'Offers', body: 'Explain promotions clearly, including important conditions where relevant.' },
      { title: 'Local Content', body: 'Share genuinely relevant information about your location, community or service area.' },
      { title: 'Events', body: 'Keep event information accurate and current.' },
    ],
  },
  {
    id: 'brands-agencies',
    title: 'Facebook Page Likes for Brands and Agencies',
    paragraphs: [
      'Brands and agencies may use Facebook Pages as part of a wider digital presence. A campaign could involve Facebook, Instagram, paid advertising, email, ecommerce, search, creator partnerships and a company website.',
      'Page Likes can support the visible presentation of the Facebook Page within that wider campaign. But professional reporting should keep metrics in context.',
      'If you\'re managing a client Page, distinguish between purchased Page Like activity, organic followers, organic reach, paid advertising performance, genuine customer engagement and business results. Clear reporting is more useful than presenting every visible metric as organic growth.',
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical Facebook Page Growth Framework for Australian Businesses',
    lead: 'Page Likes can support Page presentation, but a stronger Facebook presence needs more than one number.',
    footer: 'A visible Like count can support the Page. Long-term business growth depends on everything behind it.',
    items: [
      { title: 'Complete the Page', body: 'Make sure your business or organisation information is accurate.' },
      { title: 'Publish Genuine Activity', body: 'Show what the business is actually doing.' },
      { title: 'Create a Useful Content Mix', body: 'Combine updates, educational content, proof, promotions and other relevant posts.' },
      { title: 'Respond to Genuine Customers', body: 'Treat authentic comments and messages as real customer conversations.' },
      { title: 'Use Genuine Customer Proof', body: 'Reviews, Recommendations and real examples can strengthen trust.' },
      { title: 'Review Your Real Performance', body: 'Use available Facebook insights and business data to understand what is actually working.' },
      {
        title: 'Connect Facebook to Wider Marketing',
        body: 'Australian businesses may use Facebook alongside Google, Instagram, TikTok, SEO, paid media, email and their website.',
      },
      {
        title: 'Keep Page Likes in Perspective',
        body: 'A visible Like count can support the Page. Long-term business growth depends on everything behind it.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/au/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-page-likes'] = {
  title: 'Buy Facebook Page Likes Australia | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook Page Likes in Australia for public Pages. Compare flexible packages, order without sharing your password and track your Page Likes order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/au/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const auFbPageLikesFaqs = [
  {
    id: 'au-fb-pl-where-buy',
    question: 'Where can I buy Facebook Page Likes in Australia?',
    answer:
      'You can buy Facebook Page Likes in Australia through NovaLikes for eligible public Facebook Pages. Choose a Page Likes package, submit the correct public Page URL and complete checkout without sharing your Facebook password.',
  },
  {
    id: 'au-fb-pl-get-more',
    question: 'How can I get more Facebook Page Likes in Australia?',
    answer:
      'NovaLikes Page Likes packages can increase the Page Like count on an eligible public Facebook Page. For organic growth, continue publishing useful content, promoting the Page and engaging genuinely with your audience.',
  },
  {
    id: 'au-fb-pl-cheap',
    question: 'Can I buy cheap Facebook Page Likes in Australia?',
    answer:
      'NovaLikes offers multiple Page Like quantities so you can compare available package sizes and current prices. When comparing cheaper services, also consider password requirements, Page access, tracking, support and what the service actually changes.',
  },
  {
    id: 'au-fb-pl-real',
    question: 'What are real Facebook Page Likes?',
    answer:
      '"Real Facebook Page Likes" may be defined differently by different providers. Review the actual service details rather than relying only on that phrase. NovaLikes Page Likes packages are designed to increase the Page Like count on the eligible submitted Page.',
  },
  {
    id: 'au-fb-pl-how-many',
    question: 'How many Facebook Page Likes should I buy?',
    answer:
      'There is no single ideal quantity for every Page. Consider your current Page Like count, Page activity, business size and the increase you actually want before selecting a package.',
  },
  {
    id: 'au-fb-pl-password',
    question: 'Do I need my Facebook password?',
    answer: 'No. NovaLikes does not require your Facebook password or verification codes.',
  },
  {
    id: 'au-fb-pl-admin',
    question: 'Do I need to provide Page admin access?',
    answer: 'No. NovaLikes uses the public Facebook Page URL required for the service.',
  },
  {
    id: 'au-fb-pl-meta',
    question: 'Do I need Meta Business Suite access to order?',
    answer: 'No. You do not need to provide NovaLikes with access to Meta Business Suite or Business Manager.',
  },
  {
    id: 'au-fb-pl-info',
    question: 'What information do I need?',
    answer: 'You need the correct public Facebook Page URL and the Page Likes package you want to purchase.',
  },
  {
    id: 'au-fb-pl-cost',
    question: 'How much does it cost to buy Facebook Page Likes in Australia?',
    answer:
      'Pricing depends on the quantity you select. NovaLikes displays current Page Like package quantities and prices before checkout.',
  },
  {
    id: 'au-fb-pl-delivery',
    question: 'How long does it take to get Facebook Page Likes?',
    answer:
      'Processing time can vary depending on the selected quantity and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'au-fb-pl-vs-followers',
    question: 'Are Facebook Page Likes and Followers the same thing?',
    answer: 'No. Page Likes and Followers are separate Page-level metrics.',
  },
  {
    id: 'au-fb-pl-followers',
    question: 'Will buying Facebook Page Likes increase my Followers?',
    answer: 'Not automatically. Facebook Followers is a separate NovaLikes service.',
  },
  {
    id: 'au-fb-pl-post-likes',
    question: 'Will Page Likes increase Likes on my Facebook posts?',
    answer: 'Not automatically. Facebook Post Likes are a separate content-level metric.',
  },
  {
    id: 'au-fb-pl-reach',
    question: 'Will buying Facebook Page Likes increase organic reach?',
    answer:
      'There is no guarantee. A Page Likes package changes the Page-level Like count. Organic Facebook distribution depends on separate factors.',
  },
  {
    id: 'au-fb-pl-business',
    question: 'Can Australian businesses buy Facebook Page Likes?',
    answer:
      'Eligible public Facebook Pages used by Australian businesses, brands, creators, agencies, organisations and other supported Page types can use NovaLikes Page Likes packages.',
  },
  {
    id: 'au-fb-pl-local',
    question: 'Can local businesses use Facebook Page Likes packages?',
    answer:
      'Yes. Eligible public local-business Pages can use Page Likes packages. Keep your real business information and Page content accurate alongside your Page Like strategy.',
  },
  {
    id: 'au-fb-pl-older',
    question: 'Can I buy Page Likes for an older Facebook Page?',
    answer:
      'If the Page remains eligible and publicly accessible, it may be suitable for an order. Check the Page URL and current service requirements before purchasing.',
  },
  {
    id: 'au-fb-pl-client',
    question: 'Can I order Facebook Page Likes for a client?',
    answer:
      "If you're authorised to purchase services for an eligible client Page, submit the correct public Facebook Page URL and review the order details carefully.",
  },
  {
    id: 'au-fb-pl-wrong-page',
    question: 'What happens if I submit the wrong Facebook Page?',
    answer:
      'Contact NovaLikes support as soon as possible with your order information. Always check the Page URL carefully before checkout.',
  },
  {
    id: 'au-fb-pl-track',
    question: 'Can I track my Facebook Page Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('au-fb-pl-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...auFbPageLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Australia Facebook Page Likes content from supplied copy.');
