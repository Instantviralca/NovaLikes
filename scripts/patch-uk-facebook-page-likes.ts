/**
 * Apply supplied United Kingdom Facebook Page Likes copy.
 * Run: npx tsx scripts/patch-uk-facebook-page-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-facebook-page-likes.json');
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
  title: 'Buy Facebook Page Likes UK | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook Page Likes in the UK for public Pages. Compare flexible packages, order without sharing your password and track your Page Likes order online.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR THE UK';
hero.title = 'Buy Facebook Page Likes in the UK and Build a Stronger Page';
hero.description =
  "Strengthen the visible presence around the Facebook Page you're already building. NovaLikes gives businesses, brands, creators, organisations and Page managers across the United Kingdom a straightforward way to buy Facebook Page Likes without sharing account login details. Choose the number of Page Likes you want, submit the correct public Facebook Page URL and complete your order online. Whether you're building a new local-business Page, preparing for a campaign, expanding into another UK market or strengthening an established brand presence, choose a Page Likes package that fits where your Page is today.";
hero.primaryCta = { label: 'Choose Your Facebook Page Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-pl-trust-url', label: 'Public Facebook Page URL Only' },
  { id: 'fb-pl-trust-password', label: 'No Password Required' },
  { id: 'fb-pl-trust-pricing', label: 'Clear Pricing' },
  { id: 'fb-pl-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Facebook Page Likes Package That Fits Your Page';
pricing.description =
  'Different Facebook Pages need different quantities. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Page Likes. A newer local-business Page may prefer a smaller increase. An established brand, organisation or active business Page may choose something larger. Before ordering, consider your current Page Like count, how complete the Page is, what the Page represents, what you\'re building toward and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Facebook Page Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-fb-pl-where-buy',
  'uk-fb-pl-get-more',
  'uk-fb-pl-cheap',
  'uk-fb-pl-real',
  'uk-fb-pl-how-many',
  'uk-fb-pl-password',
  'uk-fb-pl-admin',
  'uk-fb-pl-meta',
  'uk-fb-pl-info',
  'uk-fb-pl-cost',
  'uk-fb-pl-delivery',
  'uk-fb-pl-vs-followers',
  'uk-fb-pl-followers',
  'uk-fb-pl-post-likes',
  'uk-fb-pl-reach',
  'uk-fb-pl-business',
  'uk-fb-pl-local',
  'uk-fb-pl-client',
  'uk-fb-pl-wrong-page',
  'uk-fb-pl-track',
];

related.title = 'Explore More Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Build a Facebook Page People Can Trust Beyond the Like Count';
finalCta.description =
  'Choose the Facebook Page Likes package that fits your Page, submit the correct public Page URL and place your order without sharing your password or Page admin access. Then keep strengthening what the Page Like count cannot replace: accurate business information, genuine customer proof, useful content and a Facebook Page people have a reason to trust.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Page Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-page-likes-uk',
  title: 'Why Choose NovaLikes for Facebook Page Likes?',
  description: 'Buying Facebook Page Likes should be easy to understand before checkout.',
  items: [
    {
      id: 'fb-pl-wc-packages',
      title: 'Multiple Page Like Quantities',
      description: 'Compare the available packages and choose the number of Page Likes that fits your Page.',
      icon: 'users',
    },
    {
      id: 'fb-pl-wc-url',
      title: 'Public Facebook Page URL Only',
      description: 'Provide the exact eligible public Facebook Page where you want the Page Likes applied.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-pl-wc-password',
      title: 'No Facebook Password Required',
      description: 'NovaLikes does not need your Facebook password or verification codes.',
      icon: 'lock',
    },
    {
      id: 'fb-pl-wc-admin',
      title: 'No Page Admin Access Required',
      description: 'You do not need to provide Page admin, Meta Business Suite or Business Manager access.',
      icon: 'shield-check',
    },
    {
      id: 'fb-pl-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the selected Page Like quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'fb-pl-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'sparkles',
    },
    {
      id: 'fb-pl-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes order tracking afterwards for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'fb-pl-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-facebook-page-likes-without-login-uk',
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
    'Before checkout, open the Page URL yourself. Make sure it leads directly to the Page where you want the Page Likes added. A link to an individual Facebook post is not the correct target for a Page Likes order.',
};

config.doesBuyingHelp = {
  id: 'real-facebook-page-likes-uk',
  title: 'Looking for “Real Facebook Page Likes”? Check the Service Behind the Label',
  description:
    '"Real Facebook Page Likes" is a common phrase people may use when comparing services. You may also see high-quality Facebook Page Likes, active Facebook Page Likes or organic Facebook Page Likes. Different providers may define these terms differently.',
  helpTitle: 'Instead of relying only on the wording, ask',
  helpItems: [
    'What metric changes?',
    'How many Page Likes are included?',
    'Which Page receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Facebook Page Likes Packages Do',
  limitItems: [
    'Increase the Page Like count on the eligible public Facebook Page submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Followers, Post Likes, reach, customers or sales. Clear expectations make comparison easier.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-page-likes-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Page Likes package and submitted Facebook Page URL are connected to the purchase. The order is then processed for the intended Page.',
  steps: [
    {
      id: 'fb-pl-th-1',
      title: 'Keep the Page Publicly Accessible',
      description: 'The submitted Page should remain accessible where required during processing.',
    },
    {
      id: 'fb-pl-th-2',
      title: 'Check the URL Carefully',
      description: "Make sure you've submitted the exact Facebook Page you intended to use.",
    },
    {
      id: 'fb-pl-th-3',
      title: 'Avoid Making the Page Unavailable',
      description: 'Deleting or restricting the submitted Page may interfere with an active order.',
    },
    {
      id: 'fb-pl-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on Page Like quantity and current order conditions. Use NovaLikes order tracking for available updates rather than assuming every package follows one fixed delivery time.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'facebook-page-likes-followers-post-likes-uk',
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
    href: ukHref('/buy-facebook-followers'),
    ctaLabel: 'Buy Facebook Followers',
  },
  views: {
    title: 'Facebook Post Likes',
    description: 'Like count displayed on one eligible public Facebook post',
    bestFor: 'Individual post likes',
    href: ukHref('/buy-facebook-post-likes'),
    ctaLabel: 'Buy Facebook Post Likes',
  },
  combinedNote:
    'Choose Page Likes for the Page-level Like count. Choose Followers for Page audience size. Choose Post Likes when you\'re focused on one specific Facebook post. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-page-likes-uk',
  title: 'Before You Buy Facebook Page Likes in the UK',
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
      description: 'You do not need to provide Page admin, Meta Business Suite or Business Manager access.',
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
      description: 'Read the applicable service and refund information before completing your purchase.',
      icon: 'clapperboard',
    },
  ],
};

config.worldwide = {
  id: 'facebook-insights-real-performance-uk',
  title: 'Use Facebook Insights to Understand Real Page Performance',
  description:
    'Page Like count is only one metric. If performance information is available for your Page, use it to understand how genuine users respond.',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased Page Likes change one visible metric. Your real Page data should guide wider decisions.',
  cards: [
    {
      id: 'fb-pl-ww-posts',
      title: 'Which Posts Perform Best?',
      description: 'Compare actual content performance over time.',
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
      title: 'Which Topics Matter?',
      description: 'Use real audience behaviour to shape future content.',
      icon: 'users',
    },
    {
      id: 'fb-pl-ww-actions',
      title: 'Are People Taking Useful Actions?',
      description: 'For businesses, genuine activity may contribute to website visits, messages, bookings or other commercial outcomes.',
      icon: 'briefcase',
    },
    {
      id: 'fb-pl-ww-next',
      title: 'What Should You Publish Next?',
      description: 'Use actual performance data to improve future content instead of relying only on Page Like totals.',
      icon: 'megaphone',
    },
  ],
};

config.packageSizes = {
  id: 'choose-facebook-page-likes-package-uk',
  title: 'Choose a Facebook Page Likes Package That Fits Your Page',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Page Likes. A newer local-business Page may prefer a smaller increase. An established brand, organisation or active business Page may choose something larger.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'fb-pl-ps-count',
      quantity: 'Your Current Page Like Count',
      recommendedFor: 'Start with the number already displayed on your Facebook Page.',
    },
    {
      id: 'fb-pl-ps-established',
      quantity: 'How Complete the Page Is',
      recommendedFor:
        'A Page with accurate information, recent posts and genuine activity gives more context behind the Like count.',
    },
    {
      id: 'fb-pl-ps-represents',
      quantity: 'What the Page Represents',
      recommendedFor:
        'A local business, ecommerce brand, creator, venue, charity and established company may all use Facebook differently.',
    },
    {
      id: 'fb-pl-ps-building',
      quantity: "What You're Building Toward",
      recommendedFor:
        'A launch, event, expansion, promotion or seasonal campaign may influence the quantity that makes sense.',
    },
    {
      id: 'fb-pl-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on your Page rather than automatically selecting the largest package.',
    },
  ],
  bottomNote: 'Compare Facebook Page Likes Packages',
};

config.bestPractices = {
  id: 'affordable-facebook-page-likes-uk',
  title: 'Looking for Affordable Facebook Page Likes in the UK?',
  description:
    "If you're searching for cheap Facebook Page Likes in the UK, price will naturally be part of the comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Facebook Page Likes service should make these details clear before checkout. NovaLikes lets you compare available quantities and current prices before choosing.',
  items: [
    { id: 'fb-pl-bp-1', title: 'Number of Page Likes Included', description: 'Check how many Page Likes are included.', icon: 'users' },
    { id: 'fb-pl-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'fb-pl-bp-3', title: 'Public Page Requirements', description: 'Confirm what Page URL is required.', icon: 'clapperboard' },
    { id: 'fb-pl-bp-4', title: 'Password Policy', description: 'Check whether your Facebook password is requested.', icon: 'lock' },
    { id: 'fb-pl-bp-5', title: 'Admin Access Policy', description: 'Check whether Page admin access is required.', icon: 'sparkles' },
    { id: 'fb-pl-bp-6', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'fb-pl-bp-7', title: 'Support and Policies', description: 'Review what the service actually changes.', icon: 'headphones' },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-page-likes-uk',
  title: 'Common Mistakes to Avoid When Buying Facebook Page Likes',
  description: '',
  closingNote: '',
  items: [
    {
      id: 'fb-pl-cm-post-url',
      title: 'Submitting a Facebook Post URL',
      description: 'Page Likes require the public Facebook Page URL rather than a link to an individual post.',
    },
    {
      id: 'fb-pl-cm-service',
      title: 'Choosing the Wrong Facebook Service',
      description: 'Page Likes, Followers and Post Likes are separate metrics.',
    },
    {
      id: 'fb-pl-cm-quantity',
      title: 'Selecting the Wrong Quantity',
      description: 'Review the Page Like package before checkout.',
    },
    {
      id: 'fb-pl-cm-unavailable',
      title: 'Making the Page Unavailable During Processing',
      description: 'Keep the submitted Page accessible where required during an active order.',
    },
    {
      id: 'fb-pl-cm-followers',
      title: 'Expecting Followers Automatically',
      description: 'A Page Likes order does not automatically add Facebook Followers.',
    },
    {
      id: 'fb-pl-cm-post-likes',
      title: 'Expecting Post Engagement Automatically',
      description: 'Page Likes do not automatically increase Likes on individual posts.',
    },
    {
      id: 'fb-pl-cm-reach',
      title: 'Treating Page Likes as Guaranteed Reach',
      description: 'A higher Page Like count does not guarantee additional organic distribution.',
    },
    {
      id: 'fb-pl-cm-page',
      title: 'Ignoring the Page Itself',
      description: 'A visible number cannot replace accurate information, useful content and genuine customer service.',
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
    'buy-facebook-post-likes': {
      title: 'Facebook Post Likes',
      description:
        'Choose Post Likes when you want more visible Likes on one specific eligible public Facebook post.',
      ctaLabel: 'Buy Facebook Post Likes',
    },
  },
};

dummy.whyBuy = {
  id: 'stronger-first-impression-facebook-page-likes-uk',
  title: 'Build a Stronger First Impression Around Your Facebook Page',
  description:
    'People may form an impression about a Facebook Page before reading much of its content. They can quickly notice the Page name, profile image, cover image, Page Like count, follower count, recent posts, photos and videos, About information, customer feedback, contact details and overall Page activity. A larger Page Like count can support how established the Page appears. But the rest of the Page still needs to support that impression.',
  items: [
    { id: 'fb-pl-wb-business', title: 'For Businesses', description: 'Make it easy to understand what you offer.' },
    { id: 'fb-pl-wb-local', title: 'For Local Companies', description: 'Keep locations, opening information and contact details current.' },
    { id: 'fb-pl-wb-brands', title: 'For Brands', description: 'Maintain consistent messaging and visual identity.' },
    {
      id: 'fb-pl-wb-orgs',
      title: 'For Creators and Organisations',
      description: 'Make the purpose of the Page clear.',
    },
  ],
  bottomNote: 'Page Likes can strengthen one visible Page signal. The Page behind that number creates the wider impression.',
};

dummy.howToBuy = {
  id: 'how-facebook-page-likes-order-works-uk',
  title: 'How Your Facebook Page Likes Order Works',
  description: 'Compare packages, submit your Page URL and track your order afterwards.',
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
      description: 'Use NovaLikes order tracking afterwards for available status information.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Facebook Page Likes in the UK?',
  text: 'You can buy Facebook Page Likes in the UK through NovaLikes for eligible public Facebook Pages. Choose an available Page Likes package, submit the correct public Facebook Page URL and complete checkout without sharing your Facebook password. Page Likes apply to the Page-level Like count. They do not automatically increase Facebook Followers or Likes on individual posts.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Businesses, Brands and Organisations',
    lead: 'Facebook Pages can serve very different purposes across the UK.',
    paragraphs: [
      'A local business in London may use Facebook for customer updates and community activity. An ecommerce brand in Manchester may use its Page around launches and seasonal promotions. A service business in Birmingham may showcase completed projects. A restaurant or venue in Glasgow may publish events and opening information. A retailer in Leeds or Liverpool may use Facebook alongside ecommerce and paid campaigns. An agency may manage several client Pages with different objectives.',
      'That means Page Like growth should fit the Page you\'re actually managing.',
    ],
    footer: 'Page Likes can support a visible metric. The business, creator or organisation behind them still matters.',
    items: [
      { title: 'Local Businesses', body: 'Build a stronger visible presence around a Page potential customers may check before getting in touch.' },
      { title: 'Ecommerce Brands', body: 'Support your Facebook Page around launches, offers and wider digital campaigns.' },
      { title: 'Service Businesses', body: 'Use your Page to show genuine work, explain services and answer customer questions.' },
      { title: 'Creators', body: 'Strengthen the Page-level Like count while continuing to publish relevant content.' },
      { title: 'Agencies', body: 'Choose quantities based on each client Page rather than applying the same package everywhere.' },
      { title: 'Established Brands', body: 'Support Page presentation while continuing genuine content, advertising and customer communication.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Facebook Page Likes for UK Local Businesses',
    lead: 'For local businesses, Facebook can work alongside your website, Google Business Profile, Instagram, local SEO, advertising and referrals.',
    bullets: [
      'recent business activity',
      'services',
      'products',
      'opening information',
      'projects',
      'events',
      'customer feedback',
      'contact details',
      'location information',
      'whether the business appears active',
    ],
    paragraphs: [
      'A restaurant may publish menu updates. A builder may showcase completed projects. A salon may show recent work. A retailer may introduce new stock. An estate agency may feature properties. A fitness studio may share classes or events. A professional service may answer common customer questions.',
    ],
    footer:
      'Page Likes can support how established the Facebook presence appears. Local trust comes from accurate information and the real business behind the Page.',
  },
  {
    id: 'campaign-moments',
    title: 'Put Page Likes Behind Important UK Business Moments',
    lead: 'Some periods can bring more attention to a Facebook Page.',
    footer:
      'Page Likes can support Page presentation around these moments. The campaign still needs useful content and accurate information.',
    items: [
      { title: 'Black Friday', body: 'UK retail and ecommerce brands may have higher-priority Facebook activity around Black Friday.' },
      { title: 'Cyber Monday', body: 'Online businesses may use Facebook alongside ecommerce, email and paid advertising during Cyber Monday campaigns.' },
      { title: 'Boxing Day', body: 'Retailers may have another major promotional period around Boxing Day sales.' },
      { title: 'Christmas Campaigns', body: 'Restaurants, retailers, venues and ecommerce brands may publish seasonal offers, events and festive information.' },
      { title: 'January Sales', body: 'Retail businesses may continue promotional activity into January.' },
      { title: 'New Business Launches', body: 'Build out your Page properly before sending more campaign traffic toward it.' },
      { title: 'New Location Openings', body: 'Businesses expanding into another town, city or region can update their Page and publish relevant launch content.' },
      { title: 'Events', body: 'Venues, local businesses and organisations may use Facebook heavily around events and community activity.' },
    ],
  },
  {
    id: 'page-worth-exploring',
    title: 'Build Page Likes Around a Facebook Presence Worth Exploring',
    lead: 'A higher Page Like count works best when someone who visits the Page finds something useful.',
    footer: 'Page Likes can support presentation. Good Page management makes that number more meaningful.',
    items: [
      { title: 'Complete Your Page Information', body: 'Make sure the Page accurately represents the business, brand or organisation.' },
      { title: 'Keep Contact Details Current', body: 'Do not send interested users towards outdated websites, phone numbers or locations.' },
      { title: 'Maintain Recent Activity', body: 'An active Page gives more context behind the Page Like count.' },
      { title: 'Use Strong Page Visuals', body: 'Your profile and cover images should clearly represent the Page.' },
      { title: 'Publish Useful Content', body: 'Give visitors updates, proof, offers, educational information and other relevant content.' },
      { title: 'Make the Next Step Clear', body: 'If the Page represents a business, help interested users understand how to contact, shop, book or learn more.' },
    ],
  },
  {
    id: 'social-proof',
    title: 'Page Likes Can Support Social Proof Without Creating Reputation by Themselves',
    lead: 'A visible Page Like count may contribute to how established a Facebook Page appears. But it should not be confused with genuine business reputation.',
    footer: 'Use Page Likes as one visible signal. Build reputation through the experience customers actually have with the business.',
    items: [
      { title: 'Genuine Customer Reviews', body: 'Real feedback from people who have used the business.' },
      { title: 'Facebook Recommendations', body: 'Real customer Recommendations can help potential customers learn more about other people\'s experiences.' },
      { title: 'Authentic Testimonials', body: 'Use genuine customer feedback rather than invented quotes.' },
      { title: 'Real Projects', body: "Show work you've actually completed." },
      { title: 'Responsive Customer Service', body: 'Answer genuine comments and messages usefully.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Page Likes Alongside Genuine Reviews and Recommendations',
    lead: 'If your business has real customer proof, use it.',
    footer: 'Page Likes can support visible popularity. Genuine customer evidence gives people stronger reasons to trust the business.',
    items: [
      { title: 'Genuine Reviews', body: 'Show feedback from customers who have actually used the business.' },
      { title: 'Facebook Recommendations', body: 'Real customer Recommendations can help potential customers learn more about other people\'s experiences.' },
      { title: 'Authentic Testimonials', body: 'Use genuine customer feedback rather than invented quotes.' },
      { title: 'Real Projects', body: "Show work you've actually completed." },
      { title: 'Customer Photos', body: 'Authentic customer-created content can add useful context.' },
      { title: 'Case Studies', body: 'Professional services can explain genuine work and outcomes accurately.' },
      { title: 'Consistent Business Information', body: 'Keep important details aligned across Facebook, your website and other official channels.' },
    ],
  },
  {
    id: 'page-likes-vs-followers',
    title: 'Page Likes and Facebook Followers Are Different Metrics',
    paragraphs: [
      'Facebook Page Likes apply to the Page-level Like count on an eligible public Facebook Page. Choose this service when that number is your priority.',
      'Facebook Followers are another Page-level metric. Choose Facebook Followers when the visible follower count is what you want to increase.',
      'Facebook Post Likes apply to one specific eligible public Facebook post. They do not change the overall Page Like count. Choose the service based on the exact metric you want to work on.',
    ],
  },
  {
    id: 'reach-not-same',
    title: "More Facebook Page Likes Don't Automatically Mean More Reach",
    lead: 'A higher Page Like count and organic Facebook distribution are different outcomes. Buying Facebook Page Likes should not be treated as a guaranteed way to:',
    bullets: [
      'increase Facebook Followers',
      'increase Post Likes',
      'generate Comments',
      'increase Shares',
      'improve organic post reach',
      'generate website traffic',
      'create customer enquiries',
      'increase bookings',
      'produce sales',
    ],
    paragraphs: [
      'NovaLikes Page Likes packages are designed around the Page-level Like count on the selected eligible public Page.',
      'How Facebook distributes content and how genuine users respond are separate outcomes. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'content-people-need',
    title: 'Use Page Likes Alongside Content People Actually Need',
    lead: 'Facebook Pages still need useful content. For UK businesses, that could include:',
    footer: 'Page Likes can support Page presentation. Content gives people a reason to stay after they arrive.',
    items: [
      { title: 'Business Updates', body: 'Share genuine company changes, announcements and useful information.' },
      { title: 'Educational Content', body: 'Answer questions customers regularly ask.' },
      { title: 'Product Content', body: "Show what you're selling and explain it accurately." },
      { title: 'Project Examples', body: 'Use real work to demonstrate experience.' },
      { title: 'Offers', body: 'Explain promotions clearly.' },
      { title: 'Local Content', body: 'Share genuinely useful information about your town, city or service area.' },
      { title: 'Events', body: 'Keep event details accurate and current.' },
    ],
  },
  {
    id: 'brands-agencies',
    title: 'Facebook Page Likes for UK Brands and Agencies',
    paragraphs: [
      'Brands and agencies may use Facebook as one part of a wider digital strategy. A campaign may involve Facebook, Instagram, TikTok, paid advertising, email, ecommerce, search, creator partnerships and the company website.',
      'Page Likes can support the visible presentation of the Facebook Page within that larger campaign. Professional reporting should still keep different metrics separate.',
      'Distinguish between purchased Page Likes, organic Followers, organic reach, genuine engagement, paid campaign results, website activity and business outcomes. Clear reporting gives a more accurate picture than presenting every visible number as organic growth.',
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical Facebook Page Growth Framework for UK Businesses',
    lead: 'Page Likes can support Page presentation, but stronger Facebook marketing requires more than one number.',
    footer: 'A visible Like count can support Page presentation. Long-term growth depends on everything behind it.',
    items: [
      { title: 'Complete the Page', body: 'Keep important business and organisation information accurate.' },
      { title: 'Publish Genuine Activity', body: 'Show what the business is actually doing.' },
      { title: 'Build a Useful Content Mix', body: 'Combine updates, educational content, proof, promotions and community content.' },
      { title: 'Respond to Genuine Customers', body: 'Treat real Comments and messages as genuine customer conversations.' },
      { title: 'Use Real Customer Proof', body: 'Reviews, Recommendations and real examples can strengthen trust.' },
      { title: 'Review Genuine Performance', body: 'Use actual Page insights and business data to understand what works.' },
      {
        title: 'Connect Facebook to Wider Marketing',
        body: 'UK businesses may use Facebook alongside Instagram, TikTok, Google, SEO, paid media, email and their website.',
      },
      {
        title: 'Keep Page Likes in Perspective',
        body: 'A visible Like count can support Page presentation. Long-term growth depends on everything behind it.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-page-likes'] = {
  title: 'Buy Facebook Page Likes UK | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook Page Likes in the UK for public Pages. Compare flexible packages, order without sharing your password and track your Page Likes order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukFbPageLikesFaqs = [
  {
    id: 'uk-fb-pl-where-buy',
    question: 'Where can I buy Facebook Page Likes in the UK?',
    answer:
      'You can buy Facebook Page Likes in the UK through NovaLikes for eligible public Facebook Pages. Choose a Page Likes package, submit the correct public Page URL and complete checkout without sharing your password.',
  },
  {
    id: 'uk-fb-pl-get-more',
    question: 'How can I get more Facebook Page Likes in the UK?',
    answer:
      'NovaLikes Page Likes packages can increase the Page Like count on an eligible public Facebook Page. For organic growth, continue publishing useful content, promoting the Page and interacting genuinely with your audience.',
  },
  {
    id: 'uk-fb-pl-cheap',
    question: 'Can I buy cheap Facebook Page Likes in the UK?',
    answer:
      'NovaLikes offers multiple Page Like quantities so you can compare current package sizes and prices. When comparing lower-cost services, also review password requirements, Page access, tracking and support.',
  },
  {
    id: 'uk-fb-pl-real',
    question: 'What are real Facebook Page Likes?',
    answer:
      '"Real Facebook Page Likes" may be defined differently by different providers. Review the actual service details instead of relying only on that phrase. NovaLikes Page Likes packages are designed to increase the Page Like count on the eligible submitted Page.',
  },
  {
    id: 'uk-fb-pl-how-many',
    question: 'How many Facebook Page Likes should I buy?',
    answer:
      'There is no single ideal quantity for every Page. Consider the existing Page Like count, Page activity, business size and the increase you actually want before selecting a package.',
  },
  {
    id: 'uk-fb-pl-password',
    question: 'Do I need my Facebook password?',
    answer: 'No. NovaLikes does not require your Facebook password or verification codes.',
  },
  {
    id: 'uk-fb-pl-admin',
    question: 'Do I need Facebook Page admin access?',
    answer: 'No. NovaLikes uses the public Facebook Page URL required for the service.',
  },
  {
    id: 'uk-fb-pl-meta',
    question: 'Do I need Meta Business Suite or Business Manager access?',
    answer: 'No. You do not need to provide NovaLikes with access to either.',
  },
  {
    id: 'uk-fb-pl-info',
    question: 'What information do I need?',
    answer: 'You need the correct public Facebook Page URL and the Page Likes package you want to purchase.',
  },
  {
    id: 'uk-fb-pl-cost',
    question: 'How much does it cost to buy Facebook Page Likes in the UK?',
    answer:
      'Pricing depends on the quantity you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'uk-fb-pl-delivery',
    question: 'How long does it take to get Facebook Page Likes?',
    answer:
      'Processing time can vary depending on the selected quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-fb-pl-vs-followers',
    question: 'Are Facebook Page Likes and Followers the same thing?',
    answer: 'No. Page Likes and Followers are separate Page-level metrics.',
  },
  {
    id: 'uk-fb-pl-followers',
    question: 'Will buying Facebook Page Likes increase my Followers?',
    answer: 'Not automatically. Facebook Followers are a separate service.',
  },
  {
    id: 'uk-fb-pl-post-likes',
    question: 'Will Page Likes increase Likes on my posts?',
    answer: 'Not automatically. Facebook Post Likes are a separate content-level metric.',
  },
  {
    id: 'uk-fb-pl-reach',
    question: 'Will buying Facebook Page Likes increase organic reach?',
    answer:
      'There is no guarantee. A Page Likes package changes the Page-level Like count. Organic Facebook distribution depends on separate factors.',
  },
  {
    id: 'uk-fb-pl-business',
    question: 'Can UK businesses buy Facebook Page Likes?',
    answer:
      'Eligible public Facebook Pages used by UK businesses, brands, creators, agencies and organisations can use the relevant NovaLikes Page Likes packages.',
  },
  {
    id: 'uk-fb-pl-local',
    question: 'Can local businesses use Facebook Page Likes?',
    answer:
      'Yes. Eligible public local-business Pages can use Page Likes packages. Keep the real business information and content accurate alongside your Page Like strategy.',
  },
  {
    id: 'uk-fb-pl-client',
    question: 'Can I order Facebook Page Likes for a client?',
    answer:
      "If you're authorised to purchase services for an eligible client Page, submit the correct public Facebook Page URL and review the order details carefully.",
  },
  {
    id: 'uk-fb-pl-wrong-page',
    question: 'What happens if I submit the wrong Facebook Page URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the exact Page URL before completing checkout.',
  },
  {
    id: 'uk-fb-pl-track',
    question: 'Can I track my Facebook Page Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-fb-pl-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukFbPageLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom Facebook Page Likes content from supplied copy.');
