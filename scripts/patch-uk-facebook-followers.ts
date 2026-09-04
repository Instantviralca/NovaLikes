/**
 * Apply supplied United Kingdom Facebook Followers copy.
 * Run: npx tsx scripts/patch-uk-facebook-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-facebook-followers.json');
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
  title: 'Buy Facebook Followers UK | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook followers in the UK for public Pages. Compare flexible packages, order without sharing your password and track your Facebook Followers order online.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR THE UK';
hero.title = 'Buy Facebook Followers in the UK and Build a Stronger Page Presence';
hero.description =
  "Build a stronger visible audience around the Facebook Page you're already growing. NovaLikes gives businesses, brands, creators, organisations and Page managers across the United Kingdom a straightforward way to buy Facebook Followers without sharing account login details. Choose the follower quantity that fits your Page, submit the correct public Facebook Page URL and complete your order online. Whether you're building a newer local-business Page, preparing for a campaign, expanding into another UK market or strengthening an established brand presence, choose a follower package that fits where your Page is today.";
hero.primaryCta = { label: 'Choose Your Facebook Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-f-trust-url', label: 'Public Facebook Page URL Only' },
  { id: 'fb-f-trust-password', label: 'No Password Required' },
  { id: 'fb-f-trust-pricing', label: 'Clear Pricing' },
  { id: 'fb-f-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Facebook Followers Package That Fits Your Page';
pricing.description =
  'Different Facebook Pages need different follower quantities. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Followers. A newer local-business Page may prefer a smaller increase. An established company, brand or active community Page may choose something larger. Before ordering, consider your current follower count, how complete the Page is, what you\'re building toward and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Facebook Followers Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-fb-f-where-buy',
  'uk-fb-f-get-more',
  'uk-fb-f-cheap',
  'uk-fb-f-real',
  'uk-fb-f-how-many',
  'uk-fb-f-password',
  'uk-fb-f-admin',
  'uk-fb-f-info',
  'uk-fb-f-cost',
  'uk-fb-f-delivery',
  'uk-fb-f-vs-page-likes',
  'uk-fb-f-page-likes',
  'uk-fb-f-post-likes',
  'uk-fb-f-reach',
  'uk-fb-f-business',
  'uk-fb-f-local',
  'uk-fb-f-client',
  'uk-fb-f-wrong-url',
  'uk-fb-f-track',
];

related.title = 'Explore More Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Build the Facebook Page Behind the Follower Count';
finalCta.description =
  'Choose the Facebook Followers package that fits your Page, submit the correct public Page URL and place your order without sharing your password or Page admin access. Then keep strengthening what the follower number cannot replace: accurate business information, useful content, genuine customer interaction and a Facebook Page people have a reason to trust.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Followers Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-followers-uk',
  title: 'Why Choose NovaLikes for Facebook Followers?',
  description: 'Buying Facebook Followers should be easy to understand before checkout.',
  items: [
    {
      id: 'fb-f-wc-packages',
      title: 'Multiple Follower Quantities',
      description: 'Compare the available packages and choose the number of Followers that fits your Page.',
      icon: 'users',
    },
    {
      id: 'fb-f-wc-url',
      title: 'Public Facebook Page URL Only',
      description: 'Provide the correct eligible public Facebook Page URL where you want the Followers added.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-f-wc-password',
      title: 'No Facebook Password Required',
      description: 'NovaLikes does not need your Facebook password, verification codes or Page login.',
      icon: 'lock',
    },
    {
      id: 'fb-f-wc-admin',
      title: 'No Page Admin Access Required',
      description: 'You do not need to provide Meta Business Suite or Business Manager access.',
      icon: 'shield-check',
    },
    {
      id: 'fb-f-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the selected follower quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'fb-f-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'sparkles',
    },
    {
      id: 'fb-f-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterwards for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'fb-f-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'grow-facebook-page-without-login-uk',
  title: 'Buy Facebook Followers Without Sharing Your Admin Access',
  description:
    'A Facebook Followers order should not require control of your Page. NovaLikes uses the public Page information needed for the service.',
  cards: [
    {
      id: 'fb-f-can-need',
      title: 'What You Need',
      description: 'The correct public Facebook Page URL and your selected follower package.',
      icon: 'users',
    },
    {
      id: 'fb-f-can-not-need',
      title: "What You Don't Need",
      description:
        'Your Facebook password, verification codes, Page admin login, Meta Business Suite access, Business Manager access or private messages.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the link yourself. Make sure it leads directly to the exact Page where you want the Followers added. An individual Facebook post URL is not the correct target for a Followers order.',
};

config.doesBuyingHelp = {
  id: 'real-facebook-followers-uk',
  title: 'Looking for “Real Facebook Followers”? Check the Service Behind the Label',
  description:
    '"Real Facebook Followers" is a common phrase people may use when comparing follower services. You may also see high-quality Facebook Followers, active Facebook Followers or organic Facebook Followers. Different providers may define these terms differently.',
  helpTitle: 'Instead of relying only on the label, ask',
  helpItems: [
    'What metric changes?',
    'How many Followers are included?',
    'Which Page receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Facebook Followers Packages Do',
  limitItems: [
    'Increase the follower count displayed on the eligible public Page submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Page Likes, Post Likes, reach, customers or sales. Clear expectations make services easier to compare.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-followers-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected follower package and submitted Facebook Page URL are connected to the purchase. The order is then processed for the intended Page.',
  steps: [
    {
      id: 'fb-f-th-1',
      title: 'Keep the Page Publicly Accessible',
      description: 'The submitted Page should remain accessible where required during processing.',
    },
    {
      id: 'fb-f-th-2',
      title: 'Check the URL Carefully',
      description: "Make sure you've submitted the exact Page you intended to use.",
    },
    {
      id: 'fb-f-th-3',
      title: 'Avoid Making the Page Unavailable',
      description: 'Deleting or restricting the submitted Page may interfere with an active order.',
    },
    {
      id: 'fb-f-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on follower quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'facebook-followers-page-likes-post-likes-uk',
  title: 'Followers, Page Likes or Post Likes: Choose by Goal',
  description: 'Different Facebook services affect different metrics.',
  current: {
    title: 'Facebook Followers',
    description: 'Follower count displayed on an eligible public Facebook Page',
    bestFor: 'Page audience size',
    ctaLabel: 'Facebook Followers',
  },
  likes: {
    title: 'Facebook Page Likes',
    description: 'Page-level Like count on an eligible public Facebook Page',
    bestFor: 'Page Like count',
    href: ukHref('/buy-facebook-page-likes'),
    ctaLabel: 'Buy Facebook Page Likes',
  },
  views: {
    title: 'Facebook Post Likes',
    description: 'Like count displayed on one eligible public Facebook post',
    bestFor: 'Individual post likes',
    href: ukHref('/buy-facebook-post-likes'),
    ctaLabel: 'Buy Facebook Post Likes',
  },
  combinedNote:
    'Choose Followers for Page audience size. Choose Page Likes for the Page-level Like metric. Choose Post Likes for individual content. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-followers-uk',
  title: 'Before You Buy Facebook Followers in the UK',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'fb-f-bb-page',
      title: 'Confirm the Exact Page',
      description: 'Open the Facebook Page you want to use.',
      icon: 'users',
    },
    {
      id: 'fb-f-bb-url',
      title: 'Copy the Correct Public Page URL',
      description: 'Make sure it points to the intended Page rather than an individual post.',
      icon: 'sparkles',
    },
    {
      id: 'fb-f-bb-quantity',
      title: 'Check the Follower Quantity',
      description: 'Confirm how many Followers are included in your selected package.',
      icon: 'credit-card',
    },
    {
      id: 'fb-f-bb-price',
      title: 'Review the Current Price',
      description: 'Check the package quantity and price before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-f-bb-public',
      title: 'Keep the Page Accessible',
      description: 'Avoid making the submitted Page unavailable while processing requires access.',
      icon: 'lock',
    },
    {
      id: 'fb-f-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Facebook password.',
      icon: 'headphones',
    },
    {
      id: 'fb-f-bb-admin',
      title: 'Keep Admin Access Private',
      description: 'You do not need to provide Page admin, Meta Business Suite or Business Manager access.',
      icon: 'megaphone',
    },
    {
      id: 'fb-f-bb-service',
      title: 'Choose the Correct Facebook Service',
      description: 'Followers, Page Likes and Post Likes are separate metrics.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-f-bb-policies',
      title: 'Review the Policies',
      description: 'Read the applicable service and refund information before completing checkout.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'measure-facebook-growth-beyond-followers-uk',
  title: 'Measure Facebook Growth Beyond Follower Count',
  description:
    'Follower count tells you one thing about your Page. It does not tell you whether your wider Facebook strategy is working. Where performance information is available, review:',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased Followers change one visible Page metric. Use genuine Facebook data and your own business results for wider decisions.',
  cards: [
    {
      id: 'fb-f-ww-content',
      title: 'Content Performance',
      description: 'Which posts genuinely attract attention?',
      icon: 'clapperboard',
    },
    {
      id: 'fb-f-ww-engagement',
      title: 'Genuine Engagement',
      description: 'What are real users commenting on or sharing?',
      icon: 'heart',
    },
    {
      id: 'fb-f-ww-activity',
      title: 'Page Activity',
      description: 'Are people exploring and interacting with the Page?',
      icon: 'users',
    },
    {
      id: 'fb-f-ww-messages',
      title: 'Messages',
      description: 'Are genuine customers contacting the business?',
      icon: 'briefcase',
    },
    {
      id: 'fb-f-ww-business',
      title: 'Website and Business Actions',
      description: 'Is Facebook contributing to enquiries, bookings, purchases or another useful outcome?',
      icon: 'megaphone',
    },
  ],
};

config.packageSizes = {
  id: 'choose-facebook-followers-package-uk',
  title: 'Choose a Facebook Followers Package That Fits Your Page',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Followers. A newer local-business Page may prefer a smaller increase. An established company, brand or active community Page may choose something larger.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'fb-f-ps-count',
      quantity: 'Your Current Follower Count',
      recommendedFor: 'Start with the audience size already displayed on your Page.',
    },
    {
      id: 'fb-f-ps-established',
      quantity: 'How Complete the Page Is',
      recommendedFor:
        'A Page with accurate information, recent posts and genuine business activity gives more context behind the follower number.',
    },
    {
      id: 'fb-f-ps-building',
      quantity: "What You're Building Toward",
      recommendedFor:
        'A launch, event, expansion, promotion or seasonal campaign may influence the quantity that makes sense.',
    },
    {
      id: 'fb-f-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on your Page rather than automatically selecting the largest available package.',
    },
  ],
  bottomNote: 'Compare Facebook Followers Packages',
};

config.bestPractices = {
  id: 'affordable-facebook-followers-uk',
  title: 'Looking for Affordable Facebook Followers in the UK?',
  description:
    "If you're searching for cheap Facebook Followers in the UK, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Facebook Followers service should make these details clear before checkout. NovaLikes lets you compare available quantities and current prices before choosing.',
  items: [
    { id: 'fb-f-bp-1', title: 'Follower Quantity', description: 'Check how many Followers are included.', icon: 'users' },
    { id: 'fb-f-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    { id: 'fb-f-bp-3', title: 'Public Page Requirements', description: 'Confirm what Page URL is required.', icon: 'clapperboard' },
    { id: 'fb-f-bp-4', title: 'Password Policy', description: 'Check whether your Facebook password is requested.', icon: 'lock' },
    { id: 'fb-f-bp-5', title: 'Admin Access Policy', description: 'Check whether Page admin access is required.', icon: 'sparkles' },
    { id: 'fb-f-bp-6', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'fb-f-bp-7', title: 'Support and Policies', description: 'Review what the service actually changes.', icon: 'headphones' },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-followers-uk',
  title: 'Common Mistakes When Buying Facebook Followers',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-facebook-page-likes': {
      title: 'Facebook Page Likes',
      description:
        'Choose Page Likes when you want to increase the Page-level Like count on an eligible public Facebook Page.',
      ctaLabel: 'Buy Facebook Page Likes',
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
  id: 'stronger-first-impression-facebook-uk',
  title: 'Build a Stronger First Impression Around Your Facebook Page',
  description:
    'When someone opens a Facebook Page, follower count is only one of the things they may notice. They can also see the Page name, profile image, cover image, About information, recent posts, photos and videos, follower count, Page Likes, customer interactions, business details and overall Page activity. A larger follower count can support how established the Page appears. But the rest of the Page still needs to support that impression.',
  items: [
    {
      id: 'fb-f-wb-business',
      title: 'For Businesses',
      description: 'Make it clear what you offer and who you serve.',
    },
    {
      id: 'fb-f-wb-local',
      title: 'For Local Companies',
      description: 'Keep opening information, contact details and location information current.',
    },
    {
      id: 'fb-f-wb-brands',
      title: 'For Brands',
      description: 'Maintain consistent messaging across Facebook, your website and other social channels.',
    },
    {
      id: 'fb-f-wb-creators',
      title: 'For Creators and Organisations',
      description: 'Make the purpose of the Page easy to understand.',
    },
  ],
  bottomNote:
    'Followers can strengthen one visible Page metric. The Page behind the number creates the wider impression.',
};

dummy.howToBuy = {
  id: 'how-facebook-followers-order-works-uk',
  title: 'How Your Facebook Followers Order Works',
  description: 'Compare packages, submit your Page URL and track the order afterwards.',
  steps: [
    {
      id: 'fb-f-step-1',
      title: 'Choose Your Followers Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'fb-f-step-2',
      title: 'Enter the Facebook Page URL',
      description: 'Provide the exact public Page receiving the Followers.',
    },
    {
      id: 'fb-f-step-3',
      title: 'Review Your Order',
      description: 'Check the Page URL, follower quantity and current package price.',
    },
    {
      id: 'fb-f-step-4',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your Facebook password or Page admin access.',
    },
    {
      id: 'fb-f-step-5',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Facebook Followers in the UK?',
  text: 'You can buy Facebook Followers in the UK through NovaLikes for eligible public Facebook Pages. Choose an available follower package, submit the correct public Facebook Page URL and complete checkout without sharing your password. Followers increase the follower count displayed on the selected Page. They do not automatically increase Facebook Page Likes or Likes on individual posts.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Businesses, Brands and Creators',
    lead: 'Facebook Pages can serve different purposes across the UK.',
    paragraphs: [
      'A local business in London may use Facebook for customer updates and community visibility. An ecommerce brand in Manchester may use its Page around product launches and promotions. A service company in Birmingham may publish completed projects and useful advice. A restaurant in Glasgow may share events, menus and opening updates. A retailer in Leeds or Liverpool may use Facebook alongside ecommerce and paid advertising. An agency may manage several client Pages with completely different objectives. An established brand may use Facebook alongside Instagram, ecommerce, paid media, search, email and creator partnerships.',
      'That means your Facebook Followers strategy should fit the content.',
    ],
    footer: 'Followers can support audience size. The business, brand or creator behind the Page still matters.',
    items: [
      {
        title: 'Local Businesses',
        body: 'Build a stronger visible audience around a Page potential customers may check before making contact.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Support your Page alongside product launches, promotions and wider digital campaigns.',
      },
      {
        title: 'Service Businesses',
        body: 'Use Facebook to show real work, explain services and answer customer questions.',
      },
      {
        title: 'Creators',
        body: 'Strengthen visible Page audience size while continuing to publish useful or entertaining content.',
      },
      {
        title: 'Agencies',
        body: 'Choose follower quantities according to individual client Pages instead of applying the same package everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Support Page presentation while continuing genuine content, advertising and customer communication.',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Facebook Followers for UK Local Businesses',
    lead: 'For local businesses, Facebook can work alongside your website, Google Business Profile, Instagram, local SEO, advertising and referrals.',
    bullets: [
      'recent activity',
      'services',
      'opening information',
      'products',
      'projects',
      'events',
      'customer comments',
      'contact details',
      'location information',
      'whether the business still appears active',
    ],
    paragraphs: [
      'A restaurant may post current menu items. A builder may showcase completed work. A salon may publish recent treatments. A retailer may demonstrate new stock. An estate agency may share properties. A professional service may answer common customer questions.',
    ],
    footer:
      'A stronger follower count can support Page presentation. Local trust comes from accurate information and the genuine business behind the Page.',
  },
  {
    id: 'campaign-moments',
    title: 'Use Facebook Followers Around Important UK Campaign Moments',
    lead: 'Some periods can bring more attention to a Facebook Page.',
    footer:
      'Followers can support visible Page audience size around these moments. The campaign still needs useful content and accurate information.',
    items: [
      {
        title: 'Black Friday',
        body: 'UK retail and ecommerce brands may have higher-priority Facebook activity around Black Friday promotions.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use Facebook alongside ecommerce, email and paid media during Cyber Monday.',
      },
      {
        title: 'Boxing Day',
        body: 'Retailers may have another major promotional period around Boxing Day sales.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Restaurants, retailers, venues and ecommerce brands may publish seasonal offers, events and holiday information.',
      },
      {
        title: 'January Sales',
        body: 'Retail and ecommerce businesses may continue promotional activity into January.',
      },
      {
        title: 'New Business Launches',
        body: 'Build out your Page properly before sending more marketing traffic toward it.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses expanding into another town, city or region can update the Page and publish relevant launch content.',
      },
      { title: 'Events', body: 'Venues, local businesses and organisations may use Facebook heavily around events and community activity.' },
    ],
  },
  {
    id: 'better-page',
    title: 'Turn Follower Growth Into a Better Facebook Page',
    lead: 'A larger follower count works best when someone who visits the Page finds something useful.',
    footer: 'Followers can support Page presentation. Good Page management makes the follower count more useful.',
    items: [
      { title: 'Complete Your About Information', body: 'Make it easy to understand what the Page represents.' },
      { title: 'Keep Contact Details Current', body: 'Outdated websites, phone numbers or business information can create unnecessary friction.' },
      { title: 'Publish Recent Content', body: 'An active Page gives visitors more context behind the follower number.' },
      { title: 'Use Strong Page Visuals', body: 'Profile and cover images should clearly represent the business or organisation.' },
      { title: 'Highlight Important Updates', body: 'Make launches, events, offers and important company information easy to find.' },
      {
        title: 'Give Business Visitors a Next Step',
        body: 'If the Page represents a business, help interested users understand how to contact, shop, book or visit your website.',
      },
    ],
  },
  {
    id: 'page-trust',
    title: 'Build Followers Around a Facebook Page People Can Trust',
    lead: 'Follower count alone does not create credibility. If Facebook is part of your customer journey, strengthen the Page itself.',
    footer: 'Followers can contribute to visible social proof. The genuine business behind the Page creates trust.',
    items: [
      { title: 'Show Genuine Business Activity', body: 'Use real projects, products, events, team updates and company activity.' },
      { title: 'Keep Information Accurate', body: 'Make sure contact and business details reflect the actual organisation.' },
      { title: 'Publish Useful Content', body: 'Answer questions, explain services and share relevant information.' },
      { title: 'Respond to Real Customers', body: 'Genuine Comments and messages deserve genuine replies.' },
      { title: 'Keep Branding Consistent', body: 'Your Facebook Page should align with your website and other official channels.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Followers Alongside Genuine Customer Proof',
    paragraphs: [
      'Follower count can support Page presentation. It is not the same as genuine customer evidence.',
      'For UK businesses, stronger credibility can also come from verified customer reviews, genuine Facebook Recommendations, authentic testimonials, real customer comments, completed projects, case studies, customer photos, accurate business information and responsive customer service.',
      'If your business has genuine proof, use it. Do not invent testimonials or customer experiences simply to make a Page look stronger.',
    ],
    footer: 'Followers support one visible metric. Real customer experience provides stronger credibility.',
  },
  {
    id: 'followers-vs-likes',
    title: 'Followers, Page Likes and Post Likes Are Different Metrics',
    paragraphs: [
      'Facebook Followers apply to the follower count displayed on an eligible public Facebook Page. Choose this service when visible Page audience size is your priority.',
      'Facebook Page Likes are a separate Page-level metric. Choose Facebook Page Likes when that specific Like count is what you want to change.',
      'Facebook Post Likes apply to one individual eligible public Facebook post. A Facebook Followers package does not automatically add Page Likes or Likes to individual posts.',
    ],
  },
  {
    id: 'reach-not-same',
    title: "More Facebook Followers Don't Automatically Mean More Reach",
    lead: 'Follower count and organic Facebook distribution are different things. A larger follower number does not automatically guarantee:',
    bullets: [
      'higher post reach',
      'more Page Likes',
      'more Post Likes',
      'additional Comments',
      'more Shares',
      'website traffic',
      'customer enquiries',
      'bookings',
      'leads',
      'sales',
    ],
    paragraphs: [
      'NovaLikes Facebook Followers packages are designed around the follower count displayed on the selected eligible public Page.',
      'How Facebook distributes your content and how genuine users respond are separate outcomes. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'facebook-insights',
    title: 'Use Facebook Insights to Improve Your Real Content Strategy',
    lead: 'If Facebook or Meta performance data is available for your Page, use it.',
    footer: 'Follower packages change a visible number. Your real analytics should guide your strategy.',
    items: [
      { title: 'Compare Different Posts', body: 'Look for genuine patterns across topics and formats.' },
      { title: 'Test Images and Video', body: 'Different formats may generate different audience responses.' },
      { title: 'Learn From Genuine Engagement', body: 'Real comments and reactions can show what your audience actually values.' },
      { title: 'Review Follower Activity', body: 'Understand organic follower trends separately from purchased metrics.' },
      { title: 'Improve What You Publish Next', body: 'Use actual performance information when planning future content.' },
    ],
  },
  {
    id: 'brand-credibility',
    title: 'Put Facebook Followers in Context for Business Credibility',
    paragraphs: [
      'Follower count may contribute to the first impression of a Page. But customers and potential partners may look at much more.',
      'They can also notice Page completeness, recent activity, reviews, Recommendations, content quality, customer responses, business history, website presence and wider reputation.',
      'A Page with more Followers but outdated information can still create a poor impression. Build the whole Page. Do not rely on one number to do all the work.',
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical Facebook Page Growth Framework for UK Businesses',
    lead: 'Followers can support Page presentation, but stronger Facebook marketing requires more than one number.',
    footer:
      'Visible Followers can support presentation. Long-term growth still depends on the content and genuine audience behind them.',
    items: [
      { title: 'Complete the Page', body: 'Keep important business information accurate.' },
      { title: 'Build a Useful Content Mix', body: 'Share updates, educational content, proof, promotions and community content.' },
      { title: 'Publish Real Business Activity', body: 'Show what the company is genuinely doing.' },
      { title: 'Respond to Genuine People', body: 'Treat real Comments and messages as customer conversations.' },
      { title: 'Use Genuine Customer Proof', body: 'Show real reviews, Recommendations, projects and experiences.' },
      { title: 'Review Genuine Performance', body: 'Use actual Page insights and business data to understand what works.' },
      {
        title: 'Connect Facebook to Wider Marketing',
        body: 'UK businesses may use Facebook alongside Instagram, TikTok, Google, SEO, paid media, email and their website.',
      },
      {
        title: 'Keep Followers in Perspective',
        body: 'Visible audience size can support Page presentation. Long-term business growth depends on everything behind it.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-followers'] = {
  title: 'Buy Facebook Followers UK | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook followers in the UK for public Pages. Compare flexible packages, order without sharing your password and track your Facebook Followers order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukFbFollowersFaqs = [
  {
    id: 'uk-fb-f-where-buy',
    question: 'Where can I buy Facebook Followers in the UK?',
    answer:
      'You can buy Facebook Followers in the UK through NovaLikes for eligible public Facebook Pages. Choose a follower package, submit the correct public Page URL and complete checkout without sharing your password.',
  },
  {
    id: 'uk-fb-f-get-more',
    question: 'How can I get more Facebook Followers in the UK?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public Page. For organic growth, continue publishing useful content, promoting the Page and engaging genuinely with your audience.',
  },
  {
    id: 'uk-fb-f-cheap',
    question: 'Can I buy cheap Facebook Followers in the UK?',
    answer:
      'NovaLikes offers multiple follower quantities so you can compare current package sizes and prices. When comparing lower-cost services, also review password requirements, tracking, support and what the service actually changes.',
  },
  {
    id: 'uk-fb-f-real',
    question: 'What are real Facebook Followers?',
    answer:
      '"Real Facebook Followers" can mean different things depending on the provider. Review the actual service details instead of relying only on that phrase. NovaLikes follower packages are designed to increase the follower count displayed on the eligible submitted Page.',
  },
  {
    id: 'uk-fb-f-how-many',
    question: 'How many Facebook Followers should I buy?',
    answer:
      'There is no single ideal quantity for every Page. Consider your current follower count, Page activity, business size and the increase you actually want before selecting a package.',
  },
  {
    id: 'uk-fb-f-password',
    question: 'Do I need my Facebook password?',
    answer:
      'No. NovaLikes does not require your Facebook password, verification codes or private account access.',
  },
  {
    id: 'uk-fb-f-admin',
    question: 'Do I need Page admin access?',
    answer: 'No. NovaLikes uses the public Facebook Page URL required for the service.',
  },
  {
    id: 'uk-fb-f-info',
    question: 'What information do I need?',
    answer: 'You need the correct public Facebook Page URL and the follower package you want to purchase.',
  },
  {
    id: 'uk-fb-f-cost',
    question: 'How much does it cost to buy Facebook Followers in the UK?',
    answer:
      'Pricing depends on the quantity you select. NovaLikes displays the current package quantities and prices before checkout.',
  },
  {
    id: 'uk-fb-f-delivery',
    question: 'How long does it take to get Facebook Followers?',
    answer:
      'Processing time can vary depending on the follower quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-fb-f-vs-page-likes',
    question: 'Are Facebook Followers and Page Likes the same thing?',
    answer: 'No. Followers and Page Likes are separate Page-level metrics.',
  },
  {
    id: 'uk-fb-f-page-likes',
    question: 'Will buying Facebook Followers increase my Page Likes?',
    answer: 'Not automatically. Facebook Page Likes are a separate service.',
  },
  {
    id: 'uk-fb-f-post-likes',
    question: 'Will buying Followers increase Likes on my posts?',
    answer: 'Not automatically. Facebook Post Likes are a separate post-level metric.',
  },
  {
    id: 'uk-fb-f-reach',
    question: 'Will buying Facebook Followers increase organic reach?',
    answer:
      'There is no guarantee. A follower package changes the visible follower count on the selected Page. Organic Facebook distribution depends on separate factors.',
  },
  {
    id: 'uk-fb-f-business',
    question: 'Can UK businesses buy Facebook Followers?',
    answer:
      'Eligible public Pages used by UK businesses, brands, creators, agencies and organisations can use the relevant NovaLikes follower packages.',
  },
  {
    id: 'uk-fb-f-local',
    question: 'Can local businesses use Facebook Followers?',
    answer:
      'Yes. Eligible public local-business Pages can use follower packages. Keep your real business information and Page content accurate alongside your follower strategy.',
  },
  {
    id: 'uk-fb-f-client',
    question: 'Can I order Facebook Followers for a client?',
    answer:
      "If you're authorised to purchase services for an eligible client Page, submit the correct public Facebook Page URL and review the order details carefully.",
  },
  {
    id: 'uk-fb-f-wrong-url',
    question: 'What happens if I submit the wrong Page URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the exact Page URL before checkout.',
  },
  {
    id: 'uk-fb-f-track',
    question: 'Can I track my Facebook Followers order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-fb-f-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukFbFollowersFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom Facebook Followers content from supplied copy.');
