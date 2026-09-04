/**
 * Apply supplied Canada Facebook Page Likes copy to content/markets/ca/services/buy-facebook-page-likes.json
 * Run: npx tsx scripts/patch-ca-facebook-page-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-facebook-page-likes.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const dummy = data.dummy as Record<string, unknown>;
const config = dummy.config as Record<string, unknown>;

const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;

function caHref(href: string): string {
  if (href.startsWith('/buy-')) return `${CA_PREFIX}${href}`;
  return href;
}

content.seo = {
  title: 'Buy Facebook Page Likes Canada | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook Page Likes in Canada for public Pages. Compare flexible packages, order without sharing your password, and track your purchase with NovaLikes.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR CANADA';
hero.title = 'Buy Facebook Page Likes in Canada and Strengthen Your Page Presence';
hero.description =
  'Build a stronger visible presence around your Facebook Page with Page Like packages for businesses, brands, creators, organizations, and public Pages in Canada. NovaLikes lets you choose the number of Facebook Page Likes you want, submit the exact public Page URL, and complete your order without sharing your Facebook password. Whether you\'re preparing a new business Page, supporting a launch, developing an established brand, or improving the presentation of a Page people may discover through your website, ads, search, or other social channels, you can choose a package that fits where your Page is today.';
hero.primaryCta = { label: 'Choose Your Facebook Page Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-pl-trust-url', label: 'Public Facebook Page URL Only' },
  { id: 'fb-pl-trust-password', label: 'No Password Required' },
  { id: 'fb-pl-trust-checkout', label: 'Secure Checkout' },
  { id: 'fb-pl-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Page Likes Package That Matches Your Page';
pricing.description =
  'Different Facebook Pages are at different stages. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Page Likes. A newer local business Page may prefer a smaller increase, while an established brand or organization may choose a larger package. Before deciding, consider your current Page Like count, how established the Page looks, what you\'re building toward and the increase you actually want. Choose the amount that fits the Page instead of assuming the largest package is automatically the best option.';
pricing.primaryCtaLabel = 'Compare Facebook Page Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-fb-pl-where-buy',
  'ca-fb-pl-more-likes',
  'ca-fb-pl-cheap',
  'ca-fb-pl-real',
  'ca-fb-pl-how-many',
  'ca-fb-pl-vs-followers',
  'ca-fb-pl-password',
  'ca-fb-pl-info',
  'ca-fb-pl-cost',
  'ca-fb-pl-delivery-time',
  'ca-fb-pl-followers-auto',
  'ca-fb-pl-post-likes',
  'ca-fb-pl-reach',
  'ca-fb-pl-business',
  'ca-fb-pl-local',
  'ca-fb-pl-client',
  'ca-fb-pl-wrong-page',
  'ca-fb-pl-track',
];

related.title = 'Explore Other Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Build a Facebook Page People Can Trust Beyond the Like Count';
finalCta.description =
  'Choose the Page Likes package that fits your Facebook presence, submit the correct public Page URL, and place your order without sharing your login details. Then keep strengthening the things a number cannot replace: accurate business information, useful content, genuine customer proof, and consistent Page management.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Page Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-page-likes-canada',
  title: 'Why Choose NovaLikes for Facebook Page Likes?',
  description: 'The service should be easy to understand before you pay.',
  items: [
    {
      id: 'fb-pl-wc-page',
      title: 'Page-Level Likes',
      description:
        'The order applies to the eligible public Facebook Page submitted with your purchase rather than an individual post.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-pl-wc-packages',
      title: 'Flexible Package Sizes',
      description:
        'Choose from smaller or larger Page Like quantities based on the Page you\'re working with.',
      icon: 'users',
    },
    {
      id: 'fb-pl-wc-password',
      title: 'No Facebook Password Required',
      description:
        'Your password, verification codes, Page admin login, and private account access are not needed.',
      icon: 'lock',
    },
    {
      id: 'fb-pl-wc-pricing',
      title: 'Clear Pricing Before Checkout',
      description:
        'Review the selected Page Like quantity and current price before completing your purchase.',
      icon: 'credit-card',
    },
    {
      id: 'fb-pl-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use NovaLikes order tracking afterward for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'fb-pl-wc-support',
      title: 'Customer Support',
      description:
        'If an order needs attention, provide the relevant purchase details so support can review it.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'grow-facebook-page-likes-without-login-canada',
  title: 'Grow Your Page Without Sharing Facebook Login Access',
  description:
    'NovaLikes processes Facebook Page Likes orders using the public Page information requested during checkout.',
  cards: [
    {
      id: 'fb-pl-can-need',
      title: 'What You Need',
      description: 'The exact public Facebook Page URL and your selected Page Likes package.',
      icon: 'users',
    },
    {
      id: 'fb-pl-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your Facebook password, verification codes, personal profile login, Page admin credentials, Business Manager access or private messages.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before placing your order, open the submitted link and make sure it leads to the exact public Facebook Page where you want the Page Likes added.',
};

config.doesBuyingHelp = {
  id: 'what-real-facebook-page-likes-mean-canada',
  title: 'What Should "Real Facebook Page Likes" Mean to a Buyer?',
  description:
    '"Real Facebook Page Likes" is a phrase commonly used when people compare Page growth services. You may also see terms such as high-quality, active or organic Facebook Page Likes. These descriptions may not mean exactly the same thing from one provider to another. Instead of making a decision based only on the label, check what Page metric is being changed, how many Page Likes are included, what information is required and what the provider actually promises.',
  helpTitle: 'What NovaLikes Facebook Page Likes Packages Do',
  helpItems: [
    'Increase the Page Like count on the eligible public Facebook Page submitted with the order',
  ],
  limitTitle: 'They Should Not Automatically Be Treated as a Guarantee of',
  limitItems: [
    'Followers or Post Likes',
    'Organic engagement or reach',
    'Reviews, customers or sales',
  ],
  closingNote:
    'Clear expectations are more useful than an undefined marketing term. Page Likes can support campaign presentation, but the campaign still needs a clear offer, relevant content and accurate business information.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-page-likes-order-canada',
  title: 'What Happens After You Place an Order?',
  description:
    'Once checkout is complete, your selected Page Likes package and Facebook Page URL are connected to the purchase. The order is then processed for the Page you submitted.',
  steps: [
    {
      id: 'fb-pl-th-1',
      title: 'Package and Page Are Connected',
      description:
        'Your selected Page Likes package and Facebook Page URL are connected to the purchase.',
    },
    {
      id: 'fb-pl-th-2',
      title: 'Order Targets That Page',
      description: 'The service uses the Page connected to the link included with the order.',
    },
    {
      id: 'fb-pl-th-3',
      title: 'Keep the Page Accessible',
      description:
        'The submitted Facebook Page should remain publicly accessible where required during processing.',
    },
    {
      id: 'fb-pl-th-4',
      title: 'Track the Order',
      description:
        'Processing time can vary depending on the package size and current order conditions. Use NovaLikes order tracking for available updates.',
    },
  ],
  closingNote:
    'Avoid changing the target or deleting the Page while an active order depends on it. Verify the Page before checkout instead of discovering afterward that the wrong URL was submitted.',
};

config.serviceCompare = {
  id: 'facebook-page-likes-followers-post-likes-canada',
  title: 'Page Likes, Followers or Post Likes: Choose by Goal',
  description: 'One Facebook service does not automatically include the others.',
  current: {
    title: 'Facebook Page Likes',
    description: 'Like count displayed on an eligible public Facebook Page',
    bestFor: 'Page Like metric',
    ctaLabel: 'Facebook Page Likes',
  },
  likes: {
    title: 'Facebook Followers',
    description: 'Follower count shown on an eligible public Facebook Page',
    bestFor: 'Page audience size',
    href: caHref('/buy-facebook-followers'),
    ctaLabel: 'Facebook Followers',
  },
  views: {
    title: 'Facebook Post Likes',
    description: 'Likes on one specific eligible public Facebook post',
    bestFor: 'Individual post likes',
    href: caHref('/buy-facebook-post-likes'),
    ctaLabel: 'Facebook Post Likes',
  },
  combinedNote:
    'Choose Page Likes for the Page Like metric, Followers for page audience size, or Post Likes for individual content.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-page-likes-canada',
  title: 'Before You Buy Facebook Page Likes',
  description: 'Review these details before checkout.',
  framingNote: '',
  items: [
    {
      id: 'fb-pl-bb-page',
      title: 'Confirm the Facebook Page',
      description: 'Open the exact public Page you want to use.',
      icon: 'users',
    },
    {
      id: 'fb-pl-bb-url',
      title: 'Copy the Correct Page URL',
      description: 'Do not submit an individual Facebook post link.',
      icon: 'sparkles',
    },
    {
      id: 'fb-pl-bb-quantity',
      title: 'Check the Page Like Quantity',
      description: 'Make sure the package contains the number you intended to purchase.',
      icon: 'credit-card',
    },
    {
      id: 'fb-pl-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package total before checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-pl-bb-public',
      title: 'Keep the Page Available',
      description:
        'Avoid deleting or disabling the Page while an active order depends on it.',
      icon: 'lock',
    },
    {
      id: 'fb-pl-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Facebook password or Page admin credentials.',
      icon: 'headphones',
    },
    {
      id: 'fb-pl-bb-service',
      title: 'Make Sure You Need Page Likes',
      description: 'Followers and Post Likes are separate Facebook services.',
      icon: 'megaphone',
    },
    {
      id: 'fb-pl-bb-policies',
      title: 'Review the Policies',
      description:
        'Read the relevant service, purchase, and refund information before ordering.',
      icon: 'shield-check',
    },
  ],
};

config.worldwide = {
  id: 'page-likes-reach-not-same-facebook-canada',
  title: 'More Page Likes Don\'t Automatically Mean More Reach',
  description:
    'Page Likes and organic post distribution are different things. Buying Facebook Page Likes should not be treated as a guarantee of more followers, increased post reach, more Post Likes, additional comments, shares, website traffic, leads, bookings, customers or sales.',
  eyebrow: 'Page Likes vs Reach',
  closingNote:
    'A Page Likes package is focused on the Page Like metric. How Facebook distributes individual posts and how genuine users react to them are separate outcomes. Use your genuine Page insights to guide marketing decisions.',
  cards: [
    {
      id: 'fb-pl-ww-reach',
      title: 'Organic Post Reach',
      description: 'Post distribution is separate from visible Page Like count.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-pl-ww-followers',
      title: 'Page Followers',
      description: 'Followers and Page Likes are separate Page-level metrics.',
      icon: 'users',
    },
    {
      id: 'fb-pl-ww-post-likes',
      title: 'Post Likes',
      description: 'Post-level likes apply to individual content, not the Page metric.',
      icon: 'heart',
    },
    {
      id: 'fb-pl-ww-business',
      title: 'Business Results',
      description:
        'Page Like count alone does not guarantee enquiries, bookings or sales.',
      icon: 'briefcase',
    },
  ],
};

config.packageSizes = {
  id: 'choose-page-likes-package-matches-page-canada',
  title: 'Choose a Page Likes Package That Matches Your Page',
  description:
    'Different Facebook Pages are at different stages. Before deciding, consider four things that help you choose a sensible Page Like quantity.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'fb-pl-ps-count',
      quantity: 'Your Current Page Like Count',
      recommendedFor:
        'Start with the number already visible on your Page.',
    },
    {
      id: 'fb-pl-ps-established',
      quantity: 'How Established the Page Looks',
      recommendedFor:
        'A Page with complete business information, recent content, reviews, and regular activity has different context from one that was created recently.',
    },
    {
      id: 'fb-pl-ps-building',
      quantity: 'What You\'re Building Toward',
      recommendedFor:
        'A launch, new location, seasonal promotion, rebrand, event, or wider campaign may give you a reason to put more attention behind your Facebook presence.',
    },
    {
      id: 'fb-pl-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose the amount that fits the Page instead of assuming the largest package is automatically the best option.',
    },
  ],
  bottomNote: 'Compare Page Like package sizes and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-facebook-page-likes-canada',
  title: 'Affordable Facebook Page Likes Without Choosing on Price Alone',
  description:
    'If you\'re searching for cheap Facebook Page Likes in Canada, price may be one of the first things you compare. Also look at:',
  closingNote:
    'An affordable Facebook Page Likes package should make the basics clear before checkout. NovaLikes gives you multiple quantities so you can compare options based on both your Page and budget.',
  items: [
    {
      id: 'fb-pl-bp-1',
      title: 'Page Like Quantity',
      description: 'Check how many Page Likes are included in the package.',
      icon: 'users',
    },
    {
      id: 'fb-pl-bp-2',
      title: 'Current Package Price',
      description: 'Review pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'fb-pl-bp-3',
      title: 'Public Page Requirements',
      description: 'Know what Facebook Page URL you need to submit.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-pl-bp-4',
      title: 'No Login Credentials',
      description: 'Your Facebook password should not be requested.',
      icon: 'lock',
    },
    {
      id: 'fb-pl-bp-5',
      title: 'Order Tracking',
      description: 'Check whether order tracking is available.',
      icon: 'map-pin',
    },
    {
      id: 'fb-pl-bp-6',
      title: 'Customer Support',
      description: 'Confirm support is available if you need help.',
      icon: 'headphones',
    },
    {
      id: 'fb-pl-bp-7',
      title: 'Service Policies',
      description: 'Review refund and purchase policies before ordering.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-page-likes-canada',
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
        'Choose Facebook Followers when the follower count on your public Page is the metric you want to increase.',
      ctaLabel: 'Buy Facebook Followers',
    },
    'buy-facebook-post-likes': {
      title: 'Facebook Post Likes',
      description:
        'Choose Facebook Post Likes when you want to increase the visible Like count on an eligible individual Facebook post.',
      ctaLabel: 'Buy Facebook Post Likes',
    },
  },
};

dummy.whyBuy = {
  id: 'build-stronger-first-impression-page-likes-canada',
  title: 'Build a Stronger First Impression Around Your Facebook Page',
  description:
    'When someone opens your Facebook Page, they don\'t see the Page Like count in isolation. They may also look at your Page name, profile and cover images, About information, recent posts, reviews, website and followers. A larger Page Like count can support the visible size of your Facebook presence, but the number becomes more meaningful when the rest of the Page looks complete and actively managed. Give your business Page more context behind the number by completing About information, checking contact details, keeping branding consistent and publishing current content.',
  items: [
    {
      id: 'fb-pl-wb-launch',
      title: 'Launching a New Business',
      description:
        'A new company may be building its Facebook presence alongside its website, Google Business Profile, Instagram, and other channels.',
    },
    {
      id: 'fb-pl-wb-location',
      title: 'Opening Another Location',
      description:
        'Update Page information and publish relevant content before promoting the new location.',
    },
    {
      id: 'fb-pl-wb-rebrand',
      title: 'Rebranding an Existing Business',
      description:
        'A rebrand can bring more visitors to your Page while people verify the new name, branding, or offer.',
    },
    {
      id: 'fb-pl-wb-product',
      title: 'Launching a Product or Service',
      description:
        'Make sure supporting posts and Page information clearly explain what\'s new.',
    },
    {
      id: 'fb-pl-wb-seasonal',
      title: 'Running a Canadian Seasonal Campaign',
      description:
        'Retail, ecommerce, hospitality, home services, and other businesses may have specific periods when social activity becomes more important.',
    },
  ],
  bottomNote:
    'Page Likes can strengthen one visible signal. The rest of the Page should support that impression.',
};

dummy.howToBuy = {
  id: 'how-facebook-page-likes-order-works-canada',
  title: 'How Your Facebook Page Likes Order Works',
  description: 'The process starts with the Page and quantity you want.',
  steps: [
    {
      id: 'fb-pl-step-1',
      title: 'Choose Your Package',
      description: 'Compare the available Page Like quantities and current prices.',
    },
    {
      id: 'fb-pl-step-2',
      title: 'Open the Correct Facebook Page',
      description: 'Go to the exact public Page receiving the order.',
    },
    {
      id: 'fb-pl-step-3',
      title: 'Copy the Page URL',
      description: 'Submit the Page link requested during checkout.',
    },
    {
      id: 'fb-pl-step-4',
      title: 'Review Your Details',
      description: 'Check the Page, Like quantity, and package price carefully.',
    },
    {
      id: 'fb-pl-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without providing your Facebook password.',
    },
    {
      id: 'fb-pl-step-6',
      title: 'Track the Purchase',
      description: 'Use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore Other Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can You Buy Facebook Page Likes in Canada?',
  text: 'You can buy Facebook Page Likes in Canada through NovaLikes by choosing an available Page Likes package, submitting the correct public Facebook Page URL, and completing checkout online. Your Facebook password is not required. Page Likes apply to the Page-level Like count and are separate from Facebook Followers and likes on individual posts.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-page-likes'] = {
  title: 'Buy Facebook Page Likes Canada | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook Page Likes in Canada for public Pages. Compare flexible packages, order without sharing your password, and track your purchase with NovaLikes.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caFbPageLikesFaqs = [
  {
    id: 'ca-fb-pl-where-buy',
    question: 'Where can I buy Facebook Page Likes in Canada?',
    answer:
      'You can buy Facebook Page Likes in Canada through NovaLikes for eligible public Facebook Pages. Choose a Page Likes package, submit the correct public Page URL, and complete checkout without sharing your Facebook password.',
  },
  {
    id: 'ca-fb-pl-more-likes',
    question: 'How can I get more Likes on my Facebook Page?',
    answer:
      'NovaLikes Page Likes packages can increase the Page Like count displayed on an eligible public Facebook Page. For organic growth, continue publishing useful content, keeping Page information current, promoting the Page through your own marketing channels, and engaging with genuine customers.',
  },
  {
    id: 'ca-fb-pl-cheap',
    question: 'Can I buy cheap Facebook Page Likes in Canada?',
    answer:
      'NovaLikes offers multiple Page Like quantities so you can compare current package sizes and prices. When comparing cheaper services, also consider Page requirements, password access, tracking, support, and what the package actually includes.',
  },
  {
    id: 'ca-fb-pl-real',
    question: 'What are real Facebook Page Likes?',
    answer:
      '"Real Facebook Page Likes" can mean different things depending on the provider. Review the actual service details instead of relying only on the phrase. NovaLikes Page Likes packages are designed to increase the Page Like count on the submitted eligible Facebook Page.',
  },
  {
    id: 'ca-fb-pl-how-many',
    question: 'How many Facebook Page Likes should I buy?',
    answer:
      'There is no single ideal quantity for every Page. Consider your existing Page Like count, how established the Page is, your current campaign or business goals, and the increase you actually want.',
  },
  {
    id: 'ca-fb-pl-vs-followers',
    question: 'Are Facebook Page Likes and Followers the same thing?',
    answer:
      'No. Facebook allows people to like or follow Pages, and the Page Like count and follower count should be treated as separate metrics. Choose the NovaLikes service that matches the number you want to increase.',
  },
  {
    id: 'ca-fb-pl-password',
    question: 'Do I need my Facebook password?',
    answer:
      'No. NovaLikes does not require your Facebook password, verification codes, Page admin credentials, or private login access.',
  },
  {
    id: 'ca-fb-pl-info',
    question: 'What information do I need?',
    answer:
      'You need the correct public Facebook Page URL and the Page Likes package you want to order.',
  },
  {
    id: 'ca-fb-pl-cost',
    question: 'How much do Facebook Page Likes cost?',
    answer:
      'Pricing depends on the Page Like quantity you choose. NovaLikes displays current package sizes and prices before checkout.',
  },
  {
    id: 'ca-fb-pl-delivery-time',
    question: 'How long does it take to get Facebook Page Likes?',
    answer:
      'Processing time can vary depending on the Page Like quantity and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'ca-fb-pl-followers-auto',
    question: 'Will buying Page Likes increase my Facebook Followers?',
    answer:
      'Not automatically. Facebook Page Likes and Facebook Followers are separate metrics and separate NovaLikes services.',
  },
  {
    id: 'ca-fb-pl-post-likes',
    question: 'Will buying Facebook Page Likes increase Post Likes?',
    answer:
      'Not automatically. Facebook Post Likes apply to individual posts and are offered separately.',
  },
  {
    id: 'ca-fb-pl-reach',
    question: 'Will more Facebook Page Likes increase my organic reach?',
    answer:
      'There is no guarantee. Page Likes change a Page-level metric. Organic reach and content distribution depend on separate factors.',
  },
  {
    id: 'ca-fb-pl-business',
    question: 'Can Canadian businesses buy Facebook Page Likes?',
    answer:
      'Yes. Eligible public Facebook Pages used by businesses, brands, creators, organizations, and other supported Page types can use NovaLikes Page Likes packages.',
  },
  {
    id: 'ca-fb-pl-local',
    question: 'Can local businesses use Facebook Page Likes packages?',
    answer:
      'Yes, provided the business has an eligible public Facebook Page. Keep the Page\'s local and business information accurate alongside the service.',
  },
  {
    id: 'ca-fb-pl-client',
    question: 'Can I order Page Likes for a client\'s Facebook Page?',
    answer:
      'If you\'re authorized to purchase services for an eligible public client Page, submit the correct Page URL and review the order details carefully before checkout.',
  },
  {
    id: 'ca-fb-pl-wrong-page',
    question: 'What happens if I submit the wrong Page?',
    answer:
      'Contact NovaLikes support as soon as possible with the relevant order information. Check the Facebook Page URL carefully before placing your order.',
  },
  {
    id: 'ca-fb-pl-track',
    question: 'Can I track my Facebook Page Likes order?',
    answer:
      'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-fb-pl-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caFbPageLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada Facebook Page Likes content.');
