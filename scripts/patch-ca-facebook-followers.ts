/**
 * Apply supplied Canada Facebook Followers copy to content/markets/ca/services/buy-facebook-followers.json
 * Run: npx tsx scripts/patch-ca-facebook-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-facebook-followers.json');
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
  title: 'Buy Facebook Followers Canada | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook followers in Canada for public Pages. Compare flexible follower packages, order without sharing your password, and track your purchase online.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR CANADA';
hero.title = 'Buy Facebook Followers in Canada and Build a Stronger Page Presence';
hero.description =
  'Give your Facebook Page a stronger visible audience with follower packages built for businesses, brands, creators, and public Pages in Canada. NovaLikes lets you choose the number of Facebook followers that fits your Page, submit the correct public Facebook Page URL, and complete your order without sharing your Facebook password. Whether you\'re building a new business Page, preparing for a campaign, supporting an established brand, or strengthening your overall Facebook presence, you can choose a package that matches the Page you\'re working with.';
hero.primaryCta = { label: 'Choose Your Facebook Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-f-trust-url', label: 'Public Facebook Page URL Only' },
  { id: 'fb-f-trust-password', label: 'No Password Required' },
  { id: 'fb-f-trust-checkout', label: 'Secure Checkout' },
  { id: 'fb-f-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Facebook Followers Package That Fits Your Page';
pricing.description =
  'Not every Facebook Page needs the same follower increase. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K followers. A newer local business Page may prefer a smaller package, while an established brand or active Page may want a larger increase. Before choosing, look at your current follower count, how established the Page is, what you\'re preparing for and the increase you actually want. Choose a quantity that makes sense for your current Page instead of automatically selecting the largest option.';
pricing.primaryCtaLabel = 'Compare Facebook Followers Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-fb-f-where-buy',
  'ca-fb-f-more-followers',
  'ca-fb-f-cheap',
  'ca-fb-f-real',
  'ca-fb-f-how-many',
  'ca-fb-f-password',
  'ca-fb-f-page-info',
  'ca-fb-f-cost',
  'ca-fb-f-delivery-time',
  'ca-fb-f-vs-page-likes',
  'ca-fb-f-page-likes-auto',
  'ca-fb-f-reach',
  'ca-fb-f-post-likes',
  'ca-fb-f-business',
  'ca-fb-f-local',
  'ca-fb-f-client',
  'ca-fb-f-wrong-url',
  'ca-fb-f-track',
];

related.title = 'Explore More Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Build a Facebook Page That Looks Active Beyond the Follower Number';
finalCta.description =
  'Choose a follower package that fits your Page, submit the correct public Facebook Page URL, and place your order without sharing your login details. Then keep building the things that make a Page worth following: accurate information, useful content, genuine customer communication, and consistent activity.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Followers Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-followers-canada',
  title: 'Why Choose NovaLikes for Facebook Followers?',
  description: 'Buying Facebook followers should be simple enough to understand before checkout.',
  items: [
    {
      id: 'fb-f-wc-url',
      title: 'Public Page URL Only',
      description:
        'Provide the exact public Facebook Page URL where you want the followers added.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-f-wc-password',
      title: 'No Facebook Password Required',
      description:
        'NovaLikes does not need your Facebook password, verification codes, or private login credentials.',
      icon: 'lock',
    },
    {
      id: 'fb-f-wc-packages',
      title: 'Multiple Follower Quantities',
      description:
        'Choose a smaller or larger package depending on the Page you\'re working with.',
      icon: 'users',
    },
    {
      id: 'fb-f-wc-pricing',
      title: 'Clear Pricing',
      description:
        'Review the package quantity and current price before completing your purchase.',
      icon: 'credit-card',
    },
    {
      id: 'fb-f-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use NovaLikes order tracking afterward for available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'fb-f-wc-support',
      title: 'Customer Support',
      description:
        'If you need help with an existing purchase, provide the relevant order information so support can review it.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'grow-facebook-page-without-login-canada',
  title: 'Grow Your Page Without Sharing Facebook Login Details',
  description:
    'NovaLikes does not require access to your Facebook account.',
  cards: [
    {
      id: 'fb-f-can-need',
      title: 'What You Need',
      description: 'The correct public Facebook Page URL and your selected follower package.',
      icon: 'users',
    },
    {
      id: 'fb-f-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your Facebook password, verification codes, private messages, Page admin login or Business Manager login.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the Page URL yourself and confirm that it leads to the exact Page receiving the order. Do not submit an individual Facebook post URL when ordering Page followers.',
};

config.doesBuyingHelp = {
  id: 'what-real-facebook-followers-mean-canada',
  title: 'Looking for "Real Facebook Followers"? Check What the Service Actually Promises',
  description:
    '"Real Facebook followers" is a common search phrase, but words such as "real," "active," "organic," or "high quality" may be used differently by different providers. Instead of relying only on a label, ask what metric will change, which Page will receive the followers, how many are included and what information is required.',
  helpTitle: 'What NovaLikes Facebook Followers Packages Do',
  helpItems: [
    'Increase the follower count displayed on the eligible public Facebook Page submitted with the order',
  ],
  limitTitle: 'A Follower Package Does Not Automatically Guarantee',
  limitItems: [
    'Page Likes or Post Likes',
    'Genuine engagement or organic reach',
    'Reviews, messages, leads, customers or sales',
  ],
  closingNote:
    'Knowing exactly what the service does makes it easier to compare options responsibly. Purchased followers cannot answer genuine customer questions — keep customer communication accurate and timely.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-followers-order-canada',
  title: 'What Happens After You Order?',
  description:
    'Once checkout is complete, the follower package and submitted Facebook Page URL are associated with your order. The service is then processed for the intended Page.',
  steps: [
    {
      id: 'fb-f-th-1',
      title: 'Package and Page Are Connected',
      description:
        'The follower package and submitted Facebook Page URL are associated with your order.',
    },
    {
      id: 'fb-f-th-2',
      title: 'Order Targets That Page',
      description: 'The service is processed for the intended Page.',
    },
    {
      id: 'fb-f-th-3',
      title: 'Keep the Page Accessible',
      description:
        'The submitted Facebook Page should remain publicly accessible where required.',
    },
    {
      id: 'fb-f-th-4',
      title: 'Follow Order Status',
      description:
        'Processing time can vary based on quantity and current conditions. Use NovaLikes order tracking for available updates.',
    },
  ],
  closingNote:
    'Avoid changing the target, deleting or disabling the Page while an active order depends on it.',
};

config.serviceCompare = {
  id: 'facebook-followers-page-likes-post-likes-canada',
  title: 'Followers, Page Likes or Post Likes: Choose the Right Facebook Metric',
  description: 'Choose based on the metric you actually want to change.',
  current: {
    title: 'Facebook Followers',
    description: 'Follower count displayed on an eligible public Facebook Page',
    bestFor: 'Page audience size',
    ctaLabel: 'Facebook Followers',
  },
  likes: {
    title: 'Facebook Page Likes',
    description: 'Like count associated with the Facebook Page',
    bestFor: 'Page Like count',
    href: caHref('/buy-facebook-page-likes'),
    ctaLabel: 'Facebook Page Likes',
  },
  views: {
    title: 'Facebook Post Likes',
    description: 'Like count on a specific eligible public Facebook post',
    bestFor: 'Individual post likes',
    href: caHref('/buy-facebook-post-likes'),
    ctaLabel: 'Facebook Post Likes',
  },
  combinedNote:
    'Use Facebook Followers when the Page\'s follower count is your focus. Choose Page Likes for the Page Like metric, or Post Likes when you want likes applied to a particular public post.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-followers-canada',
  title: 'Before You Buy Facebook Followers',
  description: 'Review these details before checkout.',
  framingNote: '',
  items: [
    {
      id: 'fb-f-bb-page',
      title: 'Confirm the Facebook Page',
      description: 'Open the exact public Page you want to use.',
      icon: 'users',
    },
    {
      id: 'fb-f-bb-url',
      title: 'Copy the Page URL',
      description: 'Do not submit an individual post link when ordering followers.',
      icon: 'sparkles',
    },
    {
      id: 'fb-f-bb-quantity',
      title: 'Check the Follower Quantity',
      description:
        'Make sure your selected package contains the number of followers you intend to purchase.',
      icon: 'credit-card',
    },
    {
      id: 'fb-f-bb-price',
      title: 'Review the Current Price',
      description: 'Check the package price before completing checkout.',
      icon: 'shield-check',
    },
    {
      id: 'fb-f-bb-public',
      title: 'Keep the Page Publicly Accessible',
      description:
        'Avoid deleting or disabling the submitted Page while processing depends on it.',
      icon: 'lock',
    },
    {
      id: 'fb-f-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require Facebook login credentials.',
      icon: 'headphones',
    },
    {
      id: 'fb-f-bb-service',
      title: 'Choose the Correct Facebook Service',
      description: 'Followers, Page Likes, and Post Likes are different metrics.',
      icon: 'megaphone',
    },
    {
      id: 'fb-f-bb-policies',
      title: 'Review the Policies',
      description:
        'Read the applicable service and refund information before placing your order.',
      icon: 'shield-check',
    },
  ],
};

config.worldwide = {
  id: 'followers-reach-not-same-facebook-canada',
  title: 'More Followers Do Not Guarantee More Reach',
  description:
    'A Facebook follower count and the organic reach of individual posts are not the same thing. Having more followers does not guarantee that every follower will see every post. It also does not guarantee more Page Likes, Post Likes, comments, shares, organic reach, website traffic, leads, customers or sales.',
  eyebrow: 'Followers vs Reach',
  closingNote:
    'A followers package is designed around the Page follower metric. Your organic content performance still depends on Facebook\'s systems, audience behaviour, content quality, and how you manage the Page.',
  cards: [
    {
      id: 'fb-f-ww-reach',
      title: 'Organic Post Reach',
      description: 'Post reach is separate from visible follower count.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-f-ww-likes',
      title: 'Page and Post Likes',
      description: 'Followers and Page Likes are different Page-level metrics.',
      icon: 'heart',
    },
    {
      id: 'fb-f-ww-engagement',
      title: 'Genuine Engagement',
      description: 'Comments and shares depend on content and audience behaviour.',
      icon: 'users',
    },
    {
      id: 'fb-f-ww-business',
      title: 'Business Results',
      description:
        'Follower count alone does not guarantee enquiries, sales or partnerships.',
      icon: 'briefcase',
    },
  ],
};

config.packageSizes = {
  id: 'choose-facebook-followers-package-fits-page-canada',
  title: 'Choose a Facebook Followers Package That Fits Your Page',
  description:
    'Not every Facebook Page needs the same follower increase. Before choosing, look at four things that help you decide on a sensible quantity.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'fb-f-ps-count',
      quantity: 'Your Current Follower Count',
      recommendedFor:
        'Start with the audience size already displayed on the Page.',
    },
    {
      id: 'fb-f-ps-established',
      quantity: 'How Established the Page Is',
      recommendedFor:
        'A Page with years of content, reviews, business information, and regular activity has a different context from a newly created Page.',
    },
    {
      id: 'fb-f-ps-preparing',
      quantity: 'What You\'re Preparing For',
      recommendedFor:
        'A new location, product launch, campaign, event, or business announcement may change how much attention you\'re putting into the Page.',
    },
    {
      id: 'fb-f-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose a quantity that makes sense for your current Page instead of automatically selecting the largest option.',
    },
  ],
  bottomNote: 'Compare follower package sizes and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-facebook-followers-canada',
  title: 'Affordable Facebook Followers Without Choosing on Price Alone',
  description:
    'If you\'re comparing cheap Facebook followers in Canada, price will naturally be part of the decision. Before choosing a provider, also check:',
  closingNote:
    'An affordable Facebook followers package should make these basics clear before checkout. NovaLikes lets you compare follower quantities and current prices before placing your order.',
  items: [
    {
      id: 'fb-f-bp-1',
      title: 'Followers Included',
      description: 'Check how many followers are included in the package.',
      icon: 'users',
    },
    {
      id: 'fb-f-bp-2',
      title: 'Current Package Pricing',
      description: 'Review pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'fb-f-bp-3',
      title: 'Page vs Profile Service',
      description: 'Confirm the service is for a Page and what URL you need.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-f-bp-4',
      title: 'No Password Requirement',
      description: 'Your Facebook password should not be requested.',
      icon: 'lock',
    },
    {
      id: 'fb-f-bp-5',
      title: 'Order Tracking',
      description: 'Check whether order tracking is available.',
      icon: 'map-pin',
    },
    {
      id: 'fb-f-bp-6',
      title: 'Customer Support',
      description: 'Confirm support is available if you need help.',
      icon: 'headphones',
    },
    {
      id: 'fb-f-bp-7',
      title: 'Service Policies',
      description: 'Review relevant service policies before ordering.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-followers-canada',
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
        'Choose Facebook Page Likes when the Page Like count is the metric you want to increase.',
      ctaLabel: 'Buy Facebook Page Likes',
    },
    'buy-facebook-post-likes': {
      title: 'Facebook Post Likes',
      description:
        'Choose Facebook Post Likes when you want to increase the visible like count on a specific eligible public post.',
      ctaLabel: 'Buy Facebook Post Likes',
    },
  },
};

dummy.whyBuy = {
  id: 'build-stronger-first-impression-facebook-canada',
  title: 'Build a Stronger First Impression Around Your Facebook Page',
  description:
    'When someone opens a Facebook Page, the follower count is only one part of what they see. They may also notice the Page name, profile and cover images, business description, recent posts, reviews, contact information and how actively the Page is managed. A larger follower count can support the visible size of the Page, but the strongest first impression happens when the rest of the Page supports that number. Turn follower growth into a better Page experience by keeping business information current, using clear cover and profile images, publishing recent content and giving visitors a next step.',
  items: [
    {
      id: 'fb-f-wb-launch',
      title: 'Launching a New Business Page',
      description:
        'A newer company may want to build the visible size of the Page while publishing its first set of useful posts.',
    },
    {
      id: 'fb-f-wb-location',
      title: 'Opening a New Location',
      description:
        'Local businesses can update Page information, publish location-specific content, and support the Page as part of the launch.',
    },
    {
      id: 'fb-f-wb-product',
      title: 'Introducing a New Product or Service',
      description:
        'A Page may receive more visitors when a business is promoting something new.',
    },
    {
      id: 'fb-f-wb-seasonal',
      title: 'Running a Seasonal Campaign',
      description:
        'Canadian businesses may use Facebook around holidays, sales periods, community events, or seasonal services.',
    },
    {
      id: 'fb-f-wb-brand',
      title: 'Building a Brand Presence',
      description:
        'Established businesses may continue developing their Page alongside a website, Instagram, email marketing, and other channels.',
    },
  ],
  bottomNote:
    'Follower count can strengthen the presentation. The Page itself still needs substance behind it.',
};

dummy.howToBuy = {
  id: 'how-facebook-followers-order-works-canada',
  title: 'How Your Facebook Followers Order Works',
  description: 'The process centres around the public Page you want to use.',
  steps: [
    {
      id: 'fb-f-step-1',
      title: 'Choose Your Package',
      description: 'Compare the available follower quantities and current prices.',
    },
    {
      id: 'fb-f-step-2',
      title: 'Copy the Facebook Page URL',
      description: 'Open the exact public Page where you want the followers added.',
    },
    {
      id: 'fb-f-step-3',
      title: 'Submit the Page Details',
      description: 'Enter the public Page URL requested during checkout.',
    },
    {
      id: 'fb-f-step-4',
      title: 'Review the Order',
      description: 'Check the Page, follower quantity, and current price before paying.',
    },
    {
      id: 'fb-f-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without providing your Facebook password.',
    },
    {
      id: 'fb-f-step-6',
      title: 'Track the Purchase',
      description: 'Use NovaLikes order tracking for available status updates afterward.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can You Buy Facebook Followers in Canada?',
  text: 'You can buy Facebook followers in Canada through NovaLikes by choosing an available follower package, submitting the correct public Facebook Page URL, and completing checkout online. Your Facebook password is not required. Followers increase the Page-level follower count and are separate from Facebook Page Likes and Post Likes.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-followers'] = {
  title: 'Buy Facebook Followers Canada | Grow Your Page | NovaLikes',
  description:
    'Buy Facebook followers in Canada for public Pages. Compare flexible follower packages, order without sharing your password, and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caFbFollowersFaqs = [
  {
    id: 'ca-fb-f-where-buy',
    question: 'Where can I buy Facebook followers in Canada?',
    answer:
      'You can buy Facebook followers in Canada through NovaLikes for eligible public Facebook Pages. Select a follower package, provide the correct public Page URL, and complete checkout without sharing your Facebook password.',
  },
  {
    id: 'ca-fb-f-more-followers',
    question: 'How can I get more Facebook followers?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public Facebook Page. For organic growth, continue publishing useful content, keeping Page information current, and interacting with genuine users.',
  },
  {
    id: 'ca-fb-f-cheap',
    question: 'Can I buy cheap Facebook followers in Canada?',
    answer:
      'NovaLikes offers multiple follower package sizes so you can compare current quantities and prices. When comparing lower-cost services, also consider Page requirements, password access, tracking, support, and what the package actually includes.',
  },
  {
    id: 'ca-fb-f-real',
    question: 'What are real Facebook followers?',
    answer:
      '"Real Facebook followers" can mean different things depending on the provider. Review the actual package details rather than relying only on the label. NovaLikes follower packages are designed to increase the follower count displayed on the submitted eligible Facebook Page.',
  },
  {
    id: 'ca-fb-f-how-many',
    question: 'How many Facebook followers should I buy?',
    answer:
      'There is no single ideal number for every Page. Consider your existing follower count, Page activity, business stage, and the visible increase you want before selecting a package.',
  },
  {
    id: 'ca-fb-f-password',
    question: 'Do I need my Facebook password?',
    answer:
      'No. NovaLikes does not require your Facebook password, verification codes, or private account access for a followers order.',
  },
  {
    id: 'ca-fb-f-page-info',
    question: 'What Facebook Page information do I need?',
    answer:
      'You need the correct public Facebook Page URL requested during checkout.',
  },
  {
    id: 'ca-fb-f-cost',
    question: 'How much does it cost to buy Facebook followers?',
    answer:
      'Pricing depends on the follower quantity you select. NovaLikes displays the current package prices before checkout.',
  },
  {
    id: 'ca-fb-f-delivery-time',
    question: 'How long does it take to get Facebook followers?',
    answer:
      'Processing time can vary depending on follower quantity and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'ca-fb-f-vs-page-likes',
    question: 'Are Facebook followers and Page Likes the same?',
    answer:
      'No. Followers and Page Likes are separate Page-level metrics. NovaLikes offers separate Facebook Followers and Facebook Page Likes services.',
  },
  {
    id: 'ca-fb-f-page-likes-auto',
    question: 'Will buying followers increase my Facebook Page Likes?',
    answer:
      'Not automatically. Facebook Followers and Page Likes are different metrics and separate services.',
  },
  {
    id: 'ca-fb-f-reach',
    question: 'Will buying Facebook followers increase my post reach?',
    answer:
      'There is no guarantee. A follower package changes the Page follower count. Organic post reach depends on other factors and should be evaluated separately.',
  },
  {
    id: 'ca-fb-f-post-likes',
    question: 'Will more followers increase my Facebook Post Likes?',
    answer:
      'Not automatically. Facebook Post Likes is a separate service focused on individual posts.',
  },
  {
    id: 'ca-fb-f-business',
    question: 'Can Canadian businesses buy Facebook followers?',
    answer:
      'Yes. Eligible public Facebook Pages used by businesses, brands, creators, and other supported Page types can use NovaLikes follower packages.',
  },
  {
    id: 'ca-fb-f-local',
    question: 'Can local businesses use Facebook follower packages?',
    answer:
      'Yes, if the business has an eligible public Facebook Page. Keep the Page information accurate and choose the follower quantity based on the Page you\'re working with.',
  },
  {
    id: 'ca-fb-f-client',
    question: 'Can I order Facebook followers for a client Page?',
    answer:
      'If you are authorized to manage or purchase services for the eligible public Page, use the correct Page URL when placing the order.',
  },
  {
    id: 'ca-fb-f-wrong-url',
    question: 'What happens if I submit the wrong Facebook Page URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always check the Page URL carefully before checkout.',
  },
  {
    id: 'ca-fb-f-track',
    question: 'Can I track my Facebook Followers order?',
    answer:
      'Yes. Use NovaLikes order tracking after checkout for available status information.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-fb-f-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caFbFollowersFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada Facebook Followers content.');
