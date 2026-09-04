/**
 * Apply supplied Canada TikTok Followers copy to content/markets/ca/services/buy-tiktok-followers.json
 * Run: npx tsx scripts/patch-ca-tiktok-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-tiktok-followers.json');
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
  title: 'Buy TikTok Followers Canada | Grow Your Profile | NovaLikes',
  description:
    'Buy TikTok followers in Canada with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR CANADA';
hero.title = 'Buy TikTok Followers in Canada and Build a Stronger Profile';
hero.description =
  'Give your TikTok profile a stronger visible audience with follower packages designed for creators, businesses, brands and growing accounts in Canada. NovaLikes lets you choose the number of TikTok followers that fits your profile, provide your public username and complete your order without sharing your password. Start with a smaller package or choose a larger quantity based on the account you\'re building. Your follower count is only one part of TikTok growth, so use it alongside consistent videos, a clear niche and content that gives genuine viewers a reason to follow.';
hero.primaryCta = { label: 'Choose Your TikTok Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-f-trust-public', label: 'Public Username Only' },
  { id: 'tt-f-trust-password', label: 'No Password Required' },
  { id: 'tt-f-trust-checkout', label: 'Secure Checkout' },
  { id: 'tt-f-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a TikTok Followers Package That Fits Your Account';
pricing.description =
  'TikTok accounts grow at different stages, so one follower quantity does not make sense for everyone. NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K followers. A newer creator may prefer a smaller increase, while an established brand or active TikTok profile may choose a larger package. Compare the available quantities and current prices before ordering rather than automatically choosing the biggest option.';
pricing.primaryCtaLabel = 'Compare TikTok Followers Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-tt-f-where-buy',
  'ca-tt-f-more-followers',
  'ca-tt-f-cheap',
  'ca-tt-f-real',
  'ca-tt-f-how-many',
  'ca-tt-f-password',
  'ca-tt-f-cost',
  'ca-tt-f-delivery-time',
  'ca-tt-f-fyp',
  'ca-tt-f-views',
  'ca-tt-f-likes',
  'ca-tt-f-business',
  'ca-tt-f-agencies',
  'ca-tt-f-creator-rewards',
  'ca-tt-f-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Build the TikTok Profile You Want People to Discover';
finalCta.description =
  'Choose a TikTok followers package that fits your account, enter your public username and place your order without sharing your login details. Then keep building the part no follower package can replace: content people genuinely want to watch.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Followers Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-followers-canada',
  title: 'Why Choose NovaLikes for TikTok Followers?',
  description: 'The buying process should be clear before you place an order.',
  items: [
    {
      id: 'tt-f-wc-username',
      title: 'Public Username Only',
      description:
        'Provide the correct public TikTok username for the profile receiving the followers.',
      icon: 'users',
    },
    {
      id: 'tt-f-wc-password',
      title: 'No Password Required',
      description:
        'Your TikTok password, verification codes and private login information are not needed.',
      icon: 'lock',
    },
    {
      id: 'tt-f-wc-packages',
      title: 'Multiple Package Sizes',
      description:
        'Choose from smaller and larger follower quantities based on the profile you\'re working with.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-wc-pricing',
      title: 'Clear Pricing',
      description:
        'Review the follower quantity and current package price before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'tt-f-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use NovaLikes order tracking afterward for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'tt-f-wc-support',
      title: 'Customer Support',
      description:
        'If you need help with an order, provide the relevant purchase information so support can review it.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'grow-tiktok-without-account-access-canada',
  title: 'Grow Your TikTok Presence Without Sharing Account Access',
  description:
    'You do not need to hand over control of your TikTok account to place a follower order. NovaLikes uses the public profile information requested during checkout.',
  cards: [
    {
      id: 'tt-f-can-need',
      title: 'What You Need',
      description: 'Your correct public TikTok username.',
      icon: 'users',
    },
    {
      id: 'tt-f-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your TikTok password, verification codes, private messages or login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Always check the username carefully before paying. One wrong character can point to a completely different TikTok profile.',
};

config.doesBuyingHelp = {
  id: 'what-real-tiktok-followers-mean-canada',
  title: 'What Does "Real TikTok Followers" Mean?',
  description:
    '"Real TikTok followers" is a phrase you\'ll often see when comparing follower services. The problem is that providers may use words like "real," "active," "organic," or "high quality" differently. Rather than relying on a marketing label, check what the service actually promises.',
  helpTitle: 'What NovaLikes TikTok Follower Packages Do',
  helpItems: [
    'Increase the follower count displayed on the public profile submitted with the order',
  ],
  limitTitle: 'They Do Not Automatically Guarantee',
  limitItems: [
    'Real audience interaction',
    'Video views',
    'Likes or comments',
    'FYP distribution',
    'Sales, monetization or organic followers',
  ],
  closingNote:
    'Do not treat purchased followers as a shortcut to Creator Rewards or other TikTok eligibility requirements. Use TikTok\'s official eligibility information when deciding whether your account qualifies for a feature or monetization program.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-followers-order-canada',
  title: 'What Happens After You Place an Order?',
  description:
    'Once your TikTok followers order is placed, NovaLikes uses the package and public username attached to the purchase to process it for the intended profile.',
  steps: [
    {
      id: 'tt-f-th-1',
      title: 'Your Order Details Are Connected',
      description:
        'The selected follower quantity and TikTok username are associated with the purchase.',
    },
    {
      id: 'tt-f-th-2',
      title: 'The Submitted Profile Is Used',
      description:
        'The followers apply to the profile connected to the username you provided.',
    },
    {
      id: 'tt-f-th-3',
      title: 'Processing Begins',
      description:
        'Timing can vary depending on package size and current order conditions.',
    },
    {
      id: 'tt-f-th-4',
      title: 'You Can Check the Order',
      description: 'Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote:
    'Keep the submitted TikTok profile publicly accessible where required and avoid changing the username while an active order depends on it.',
};

config.serviceCompare = {
  id: 'tiktok-followers-likes-views-canada',
  title: 'TikTok Followers, Likes or Views: Choose the Right Metric',
  description: 'These services work on different parts of TikTok.',
  current: {
    title: 'TikTok Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile audience size',
    ctaLabel: 'TikTok Followers',
  },
  likes: {
    title: 'TikTok Likes',
    description: 'Like count on an eligible public TikTok video',
    bestFor: 'Individual video engagement',
    href: caHref('/buy-tiktok-likes'),
    ctaLabel: 'TikTok Likes',
  },
  views: {
    title: 'TikTok Views',
    description: 'View count on an eligible public TikTok video',
    bestFor: 'Video view count',
    href: caHref('/buy-tiktok-views'),
    ctaLabel: 'TikTok Views',
  },
  combinedNote:
    'Choose Followers for the profile. Use TikTok Likes when you\'re focused on the like count of a specific video. Use TikTok Views when your goal is the visible view number on an eligible TikTok video. One service does not automatically include the others.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-followers-canada',
  title: 'Before You Buy TikTok Followers',
  description: 'Run through these checks first.',
  framingNote: '',
  items: [
    {
      id: 'tt-f-bb-username',
      title: 'Confirm the Username',
      description: 'Make sure it belongs to the exact profile you want to use.',
      icon: 'users',
    },
    {
      id: 'tt-f-bb-package',
      title: 'Check the Package Size',
      description: 'Review how many followers are included.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-bb-price',
      title: 'Review the Current Price',
      description:
        'Make sure the selected quantity and price match your intended order.',
      icon: 'credit-card',
    },
    {
      id: 'tt-f-bb-public',
      title: 'Keep the Profile Accessible',
      description:
        'Keep the submitted TikTok account publicly accessible where required during processing.',
      icon: 'shield-check',
    },
    {
      id: 'tt-f-bb-username-change',
      title: 'Avoid Username Changes',
      description:
        'Changing the username while an order is active may interfere with processing.',
      icon: 'lock',
    },
    {
      id: 'tt-f-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your TikTok password.',
      icon: 'headphones',
    },
    {
      id: 'tt-f-bb-metric',
      title: 'Know Which Metric You\'re Buying',
      description: 'Followers do not automatically include TikTok Likes or Views.',
      icon: 'megaphone',
    },
  ],
};

config.worldwide = {
  id: 'tiktok-followers-fyp-not-same-canada',
  title: 'Followers and For You Page Reach Are Not the Same Thing',
  description:
    'A TikTok follower count is a profile-level metric. For You Page distribution happens at the content level and depends on TikTok\'s recommendation systems and user behaviour. Buying TikTok followers should not be treated as a guaranteed way to reach the For You Page, make videos viral, increase organic views, improve TikTok Search rankings, generate more likes, qualify for monetization programs or produce sales.',
  eyebrow: 'Profile vs Content Metrics',
  closingNote:
    'Use a follower package for the metric it actually changes: the visible follower count on the selected profile. For organic video performance, rely on your own content, audience response and TikTok analytics.',
  cards: [
    {
      id: 'tt-f-ww-fyp',
      title: 'For You Page Reach',
      description:
        'FYP distribution is separate from profile follower count.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-f-ww-viral',
      title: 'Viral Videos',
      description:
        'A follower package does not guarantee that individual videos will go viral.',
      icon: 'heart',
    },
    {
      id: 'tt-f-ww-views',
      title: 'Organic Video Views',
      description:
        'Profile followers and video view counts are different TikTok metrics.',
      icon: 'users',
    },
    {
      id: 'tt-f-ww-monetization',
      title: 'Monetization and Sales',
      description:
        'Purchased followers should not be treated as a shortcut to Creator Rewards or revenue.',
      icon: 'briefcase',
    },
  ],
};

config.packageSizes = {
  id: 'how-many-tiktok-followers-should-you-choose-canada',
  title: 'How Many TikTok Followers Should You Choose?',
  description:
    'Start with your current profile rather than a random number. Before selecting a follower package, consider four things. There is no universal "best" TikTok follower number.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'tt-f-ps-count',
      quantity: 'Your Current Follower Count',
      recommendedFor:
        'A profile with 200 followers is in a very different position from one that already has several thousand.',
    },
    {
      id: 'tt-f-ps-active',
      quantity: 'How Active the Account Looks',
      recommendedFor:
        'A TikTok profile with recent videos, a clear identity and consistent activity gives visitors more context than an account with very little content.',
    },
    {
      id: 'tt-f-ps-building',
      quantity: 'What You\'re Building',
      recommendedFor:
        'A personal creator account, ecommerce brand, local business and established media profile may all have different goals.',
    },
    {
      id: 'tt-f-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose the follower quantity that makes sense for the account today rather than buying more simply because a larger package is available.',
    },
  ],
  bottomNote: 'Compare follower package sizes and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-tiktok-followers-canada',
  title: 'Affordable TikTok Followers Without Losing Sight of the Basics',
  description:
    'If you\'re looking for cheap TikTok followers in Canada, the lowest price may naturally get your attention. Before deciding, compare more than the cost. Check:',
  closingNote:
    'An affordable TikTok followers package should be easy to understand before you pay. NovaLikes provides multiple quantities so you can choose an option based on both your account and budget.',
  items: [
    {
      id: 'tt-f-bp-1',
      title: 'Followers Included',
      description: 'Check how many followers are included in the package.',
      icon: 'users',
    },
    {
      id: 'tt-f-bp-2',
      title: 'Current Package Price',
      description: 'Review pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'tt-f-bp-3',
      title: 'No Password Requirement',
      description: 'Your TikTok password should not be required.',
      icon: 'lock',
    },
    {
      id: 'tt-f-bp-4',
      title: 'Profile Information Required',
      description: 'Know what public username details you need to provide.',
      icon: 'sparkles',
    },
    {
      id: 'tt-f-bp-5',
      title: 'Order Tracking',
      description: 'Check whether order tracking is available.',
      icon: 'map-pin',
    },
    {
      id: 'tt-f-bp-6',
      title: 'Customer Support',
      description: 'Confirm support is available if you need help.',
      icon: 'headphones',
    },
    {
      id: 'tt-f-bp-7',
      title: 'Service Policies',
      description: 'Service policies should be clearly accessible.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-followers-canada',
  title: 'Common Mistakes When Buying TikTok Followers',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-tiktok-likes': {
      title: 'TikTok Likes',
      description:
        'Choose TikTok Likes when your priority is visible engagement on an eligible public video.',
      ctaLabel: 'Buy TikTok Likes',
    },
    'buy-tiktok-views': {
      title: 'TikTok Views',
      description:
        'Choose TikTok Views when you want to increase the displayed view count on an eligible TikTok video.',
      ctaLabel: 'Buy TikTok Views',
    },
  },
};

dummy.whyBuy = {
  id: 'why-creators-brands-build-tiktok-followers-canada',
  title: 'Why Creators and Brands Build Their TikTok Follower Count',
  description:
    'Follower count is one of the first profile-level signals visible when someone opens a TikTok account. For a new creator, it can be part of making the profile appear more established while more content is being published. For a business, it can support the presentation of an account used for product demos, behind-the-scenes videos, educational content or promotions. For brands and agencies, follower packages may be used alongside launches, creator campaigns and wider social media activity. What followers do not do is replace the content itself. TikTok moves quickly. When someone lands on your profile, they should be able to understand what the account is about without watching ten random videos first. Keep your niche clear, use a clear profile identity, pin useful videos, keep recent content relevant and give people a reason to follow. Follower count can support the visible size of the profile. Content gives that audience number context.',
  items: [
    {
      id: 'tt-f-wb-new',
      title: 'Starting a New Creator Profile',
      description:
        'A newer creator may want to build a stronger-looking profile while developing a consistent content library.',
    },
    {
      id: 'tt-f-wb-business',
      title: 'Launching a Business on TikTok',
      description:
        'Businesses can prepare the profile, publish several useful videos and then choose a follower quantity that fits the account.',
    },
    {
      id: 'tt-f-wb-product',
      title: 'Introducing a Product',
      description:
        'A product launch may bring more profile visitors from individual videos, ads or other marketing channels.',
    },
    {
      id: 'tt-f-wb-brand',
      title: 'Building a Personal Brand',
      description:
        'Consultants, educators, coaches and professionals may use TikTok to establish a visible presence around their expertise.',
    },
    {
      id: 'tt-f-wb-campaign',
      title: 'Supporting a Wider Campaign',
      description:
        'TikTok may be only one part of a campaign that also includes Instagram, Facebook, a website or email marketing.',
    },
  ],
  bottomNote:
    'In each case, follower count should support the profile presentation rather than replace the underlying strategy.',
};

dummy.howToBuy = {
  id: 'how-to-buy-tiktok-followers-canada',
  title: 'How to Buy TikTok Followers',
  description: 'The process starts with your profile and the follower quantity you want.',
  steps: [
    {
      id: 'tt-f-step-1',
      title: 'Pick Your Package',
      description:
        'Compare the available follower quantities and choose the option that fits your account.',
    },
    {
      id: 'tt-f-step-2',
      title: 'Enter Your Public TikTok Username',
      description:
        'Provide the exact username of the profile where the followers should be added.',
    },
    {
      id: 'tt-f-step-3',
      title: 'Review the Details',
      description:
        'Check the username, follower quantity and current price before completing checkout.',
    },
    {
      id: 'tt-f-step-4',
      title: 'Place Your Order',
      description: 'Complete your purchase through the NovaLikes checkout.',
    },
    {
      id: 'tt-f-step-5',
      title: 'Check Your Status',
      description: 'Use order tracking afterward for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy TikTok Followers in Canada?',
  text: 'You can buy TikTok followers in Canada through NovaLikes by selecting a follower package, entering the correct public TikTok username and completing checkout online. Your TikTok password is not required. The service increases the follower count on the submitted profile and is separate from TikTok Likes and Views.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-followers'] = {
  title: 'Buy TikTok Followers Canada | Grow Your Profile | NovaLikes',
  description:
    'Buy TikTok followers in Canada with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caTtFollowersFaqs = [
  {
    id: 'ca-tt-f-where-buy',
    question: 'Where can I buy TikTok followers in Canada?',
    answer:
      'You can buy TikTok followers in Canada through NovaLikes. Select an available follower package, provide the correct public TikTok username and complete checkout online without sharing your password.',
  },
  {
    id: 'ca-tt-f-more-followers',
    question: 'How can I get more TikTok followers?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public TikTok profile. For organic growth, continue publishing relevant videos, improving your content and using your genuine TikTok analytics to understand audience response.',
  },
  {
    id: 'ca-tt-f-cheap',
    question: 'Can I buy cheap TikTok followers in Canada?',
    answer:
      'NovaLikes offers multiple follower package sizes so you can compare quantities and current prices. When considering cheaper options, also review password requirements, tracking, support and what the service actually includes.',
  },
  {
    id: 'ca-tt-f-real',
    question: 'What are real TikTok followers?',
    answer:
      '"Real TikTok followers" is a phrase used differently across follower providers. Review the exact service details instead of relying only on that label. NovaLikes follower packages are designed to increase the follower count displayed on the submitted public profile.',
  },
  {
    id: 'ca-tt-f-how-many',
    question: 'How many TikTok followers should I buy?',
    answer:
      'Choose based on your current follower count, profile activity and the increase you actually want. Newer profiles may prefer smaller packages, while established accounts may choose larger quantities.',
  },
  {
    id: 'ca-tt-f-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access.',
  },
  {
    id: 'ca-tt-f-cost',
    question: 'How much does it cost to buy TikTok followers?',
    answer:
      'Pricing depends on the follower quantity you select. NovaLikes displays current package pricing before checkout.',
  },
  {
    id: 'ca-tt-f-delivery-time',
    question: 'How long does it take to get TikTok followers?',
    answer:
      'Processing time can vary depending on the package size and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'ca-tt-f-fyp',
    question: 'Will buying TikTok followers help me get on the FYP?',
    answer:
      'There is no guarantee. Follower count and For You Page distribution are different things. A follower package changes the visible follower metric and should not be treated as a guaranteed FYP strategy.',
  },
  {
    id: 'ca-tt-f-views',
    question: 'Will buying followers increase my TikTok views?',
    answer:
      'Not automatically. TikTok followers and video views are separate metrics. If you want to increase the displayed view count on an eligible video, TikTok Views is a separate service.',
  },
  {
    id: 'ca-tt-f-likes',
    question: 'Will followers increase my TikTok likes?',
    answer:
      'Not automatically. TikTok Likes apply to individual videos and are separate from profile followers.',
  },
  {
    id: 'ca-tt-f-business',
    question: 'Can Canadian businesses buy TikTok followers?',
    answer:
      'Yes. Eligible public TikTok profiles used by creators, businesses, brands and other supported accounts can use NovaLikes follower packages.',
  },
  {
    id: 'ca-tt-f-agencies',
    question: 'Can agencies order followers for client TikTok accounts?',
    answer:
      'A follower package can be ordered for an eligible public profile when you have the correct account information and authorization to manage the service for that client.',
  },
  {
    id: 'ca-tt-f-creator-rewards',
    question: 'Can buying followers qualify me for TikTok Creator Rewards?',
    answer:
      'Do not treat purchased followers as a shortcut to Creator Rewards or other TikTok eligibility requirements. Program qualification can involve platform rules and additional requirements beyond a visible follower number.',
  },
  {
    id: 'ca-tt-f-track',
    question: 'Can I track my TikTok followers order?',
    answer:
      'Yes. Use NovaLikes order tracking after checkout for available status information.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-tt-f-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caTtFollowersFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada TikTok Followers content.');
