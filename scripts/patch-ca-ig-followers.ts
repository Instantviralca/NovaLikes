/**
 * Apply supplied Canada docx copy to buy-instagram-followers overlay.
 * Run: npx tsx scripts/patch-ca-ig-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '../data/content/instagram-followers-page-config';

const file = path.join(process.cwd(), 'content/markets/ca/services/buy-instagram-followers.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const benefits = content.benefits as Record<string, unknown>;
const howItWorks = content.howItWorks as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;
const followersAuthority = structuredClone(INSTAGRAM_FOLLOWERS_PAGE_CONFIG) as Record<string, unknown>;

content.seo = {
  title: 'Buy Instagram Followers in Canada | NovaLikes',
  description:
    'Buy Instagram followers in Canada with flexible packages, no password required, secure checkout, and order tracking. Choose the right follower package for your profile.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR CANADA';
hero.title = 'Buy Instagram Followers in Canada for a Stronger Profile';
hero.description =
  'Give your Instagram profile a stronger start with follower packages made for creators, businesses and brands in Canada. NovaLikes makes it simple to choose the number of followers you want, enter your public Instagram username and place your order online without sharing your password. Start with a smaller package or choose a larger option based on your current profile and goals.';
hero.primaryCta = { label: 'Choose Your Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-f-trust-password', label: 'No Password Required' },
  { id: 'ig-f-trust-public', label: 'Public Username Only' },
  { id: 'ig-f-trust-checkout', label: 'Secure Checkout' },
  { id: 'ig-f-trust-tracking', label: 'Order Tracking' },
];

pricing.title = 'Instagram Followers Packages for Every Stage';
pricing.description =
  'Not every account needs the same number of followers. Whether you\'re building a new creator profile, preparing a business account for a launch or strengthening an established brand presence, choose the package that fits where your account is today. Available package sizes include 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K followers. See the current price for each package before you order.';
pricing.primaryCtaLabel = 'Choose Your Followers Package';

benefits.title = 'Built for Creators, Businesses and Brands';
benefits.description =
  'A follower count is one of the details people notice when they first open an Instagram profile. For creators, a stronger visible audience can help a newer profile feel more established alongside an active feed. For businesses, follower packages can support the presentation of an Instagram account while customers explore your products, services, posts and Reels. For brands and agencies, they can be used as part of a wider social media campaign while content, advertising and audience engagement continue separately. Whatever you\'re building, NovaLikes lets you choose a package based on the size of the account rather than forcing every profile into the same option.';
benefits.items = [
  {
    id: 'ig-f-social-proof',
    title: 'For Creators',
    description:
      'A stronger visible audience can help a newer profile feel more established alongside an active feed.',
  },
  {
    id: 'ig-f-launch',
    title: 'For Businesses',
    description:
      'Follower packages can support the presentation of an Instagram account while customers explore your products, services, posts and Reels.',
  },
  {
    id: 'ig-f-community',
    title: 'For Brands and Agencies',
    description:
      'Packages can be used as part of a wider social media campaign while content, advertising and audience engagement continue separately.',
  },
  {
    id: 'ig-f-flexible',
    title: 'Choose the Right Package Size',
    description:
      'NovaLikes lets you choose a package based on the size of the account rather than forcing every profile into the same option.',
  },
  {
    id: 'ig-f-alongside',
    title: 'Profile Size, Not Content',
    description:
      'Whatever you\'re building, choose a package based on the size of the account rather than forcing every profile into the same option.',
  },
];

followersAuthority.whyChoose = {
  id: 'why-choose-novalikes-instagram-followers-canada',
  title: 'Why Choose NovaLikes?',
  description:
    'Buying Instagram followers should be simple. You should know what you\'re ordering, how much it costs and what information is required before you pay.',
  items: [
    {
      id: 'ig-f-wc-password',
      title: 'No Password Required',
      description:
        'You never need to share your Instagram password, verification codes, or private login details. NovaLikes uses the public username you provide with your order.',
      icon: 'lock',
    },
    {
      id: 'ig-f-wc-packages',
      title: 'Flexible Package Sizes',
      description:
        'Choose from smaller and larger follower quantities depending on your profile and budget.',
      icon: 'users',
    },
    {
      id: 'ig-f-wc-pricing',
      title: 'Clear Pricing',
      description:
        'Package quantities and current prices are shown before checkout so you can compare your options first.',
      icon: 'credit-card',
    },
    {
      id: 'ig-f-wc-tracking',
      title: 'Order Tracking',
      description:
        'Once your purchase is placed, use your order information to check available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'ig-f-wc-support',
      title: 'Customer Support',
      description:
        'If you have a question before ordering or need help afterward, NovaLikes support is available to assist with your order.',
      icon: 'headphones',
    },
  ],
};

followersAuthority.canYouBuy = {
  id: 'get-instagram-followers-without-login-canada',
  title: 'Get More Instagram Followers Without Sharing Your Login',
  description:
    'You don\'t need to hand over your Instagram account to get followers from NovaLikes. Ordering requires only the public profile information requested at checkout.',
  cards: [
    {
      id: 'ig-f-can-need',
      title: 'You Need',
      description: 'Your correct public Instagram username.',
      icon: 'users',
    },
    {
      id: 'ig-f-can-not-need',
      title: 'You Don\'t Need',
      description:
        'Your Instagram password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Always double-check the username before completing your order so the correct profile is used.',
};

howItWorks.title = 'How to Buy Instagram Followers';
howItWorks.description = 'Ordering takes four simple steps.';
howItWorks.steps = [
  {
    id: 'ig-f-step-1',
    title: 'Pick Your Package',
    description: 'Choose the follower quantity that fits your profile and budget.',
  },
  {
    id: 'ig-f-step-2',
    title: 'Enter Your Instagram Username',
    description: 'Provide the correct public username for the profile receiving the order.',
  },
  {
    id: 'ig-f-step-3',
    title: 'Complete Checkout',
    description: 'Review your package, account details and price before placing the order.',
  },
  {
    id: 'ig-f-step-4',
    title: 'Track Your Order',
    description: 'Use NovaLikes order tracking to check available updates after checkout.',
  },
];
(howItWorks.cta as Record<string, string>).label = 'Get Instagram Followers';

followersAuthority.whatHappens = {
  id: 'what-happens-after-instagram-followers-order-canada',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected package is processed for the public Instagram profile you submitted.',
  steps: [
    {
      id: 'ig-f-th-1',
      title: 'Order Connected to Your Username',
      description:
        'Your package and username are connected to the order and processing begins for the submitted profile.',
    },
    {
      id: 'ig-f-th-2',
      title: 'Track Available Updates',
      description:
        'Use the NovaLikes tracking option to follow available status updates after checkout.',
    },
    {
      id: 'ig-f-th-3',
      title: 'Keep Your Profile Accessible',
      description:
        'Keep the submitted profile accessible while the order is active and avoid changing the username until processing is complete.',
    },
    {
      id: 'ig-f-th-4',
      title: 'Contact Support If Needed',
      description: 'If you need help, contact support with your order information.',
    },
  ],
  closingNote:
    'Keep the submitted profile accessible while the order is active and avoid changing the username until processing is complete.',
};

followersAuthority.bestPractices = {
  id: 'affordable-instagram-followers-canada',
  title: 'Looking for Affordable Instagram Followers?',
  description:
    'Price matters, but it shouldn\'t be the only thing you compare. People searching for cheap Instagram followers often find services that look similar at first glance. Before choosing one, check what you\'re actually getting.',
  closingNote:
    'An affordable Instagram followers package should make the important details easy to understand before you pay. NovaLikes lets you compare package sizes and prices first, then choose the option that works for your profile and budget.',
  items: [
    {
      id: 'ig-f-bp-1',
      title: 'Clear Follower Quantities',
      description: 'Check what follower quantity is included before checkout.',
      icon: 'users',
    },
    {
      id: 'ig-f-bp-2',
      title: 'Upfront Pricing',
      description: 'Compare current prices before you pay.',
      icon: 'credit-card',
    },
    {
      id: 'ig-f-bp-3',
      title: 'No Password Requirement',
      description: 'You should only need public profile details.',
      icon: 'lock',
    },
    {
      id: 'ig-f-bp-4',
      title: 'Secure Checkout',
      description: 'Complete payment through a protected checkout process.',
      icon: 'shield-check',
    },
    {
      id: 'ig-f-bp-5',
      title: 'Order Tracking',
      description: 'Use your order information for available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'ig-f-bp-6',
      title: 'Accessible Support',
      description: 'Customer support should be available if you need help.',
      icon: 'headphones',
    },
    {
      id: 'ig-f-bp-7',
      title: 'Clear Service Policies',
      description: 'Service and refund policies should be easy to find before you pay.',
      icon: 'sparkles',
    },
  ],
};

followersAuthority.doesBuyingHelp = {
  id: 'what-real-instagram-followers-mean-canada',
  title: 'What Does "Real Instagram Followers" Mean?',
  description:
    '"Real Instagram followers" is a common phrase used when people compare follower services, but the meaning can vary between providers. Instead of relying on one label, look at what the service actually includes, how the order works, what information is required and what the provider promises.',
  helpTitle: 'What NovaLikes Follower Packages Do',
  helpItems: [
    'Increase the follower count shown on the selected Instagram profile',
  ],
  limitTitle: 'What They Do Not Guarantee',
  limitItems: [
    'Additional likes, views or comments',
    'Organic audience growth',
    'Guaranteed engagement, reach or sales',
  ],
  closingNote:
    'Followers are separate from likes, views, comments and organic audience growth, so purchasing a follower package does not automatically guarantee additional engagement, reach or sales.',
};

followersAuthority.serviceCompare = {
  id: 'followers-likes-views-which-need-canada',
  title: 'Followers, Likes or Views: Which Do You Need?',
  description:
    'Choose the service based on the Instagram metric you want to change.',
  current: {
    title: 'Instagram Followers',
    description: 'Increasing the follower count displayed on your profile',
    bestFor: 'Profile follower count',
    ctaLabel: 'Instagram Followers',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Increasing likes shown on a specific post or Reel',
    bestFor: 'Eligible posts and Reels',
    href: '/ca/buy-instagram-likes',
    ctaLabel: 'Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'Increasing views shown on an eligible Reel or video',
    bestFor: 'Eligible Reels and video content',
    href: '/ca/buy-instagram-views',
    ctaLabel: 'Instagram Views',
  },
  combinedNote:
    'If you\'re working on your overall profile follower count, choose Instagram Followers. If your goal is a particular piece of content, explore Instagram Likes, Views or Comments instead.',
  commentsHref: '/ca/buy-instagram-comments',
};

followersAuthority.beforeBuying = {
  id: 'before-you-place-your-order-canada',
  title: 'Before You Place Your Order',
  description:
    'A few quick checks can help your order go smoothly.',
  framingNote: '',
  items: [
    {
      id: 'ig-f-bb-username',
      title: 'Confirm Your Username',
      description: 'Make sure you\'ve entered the exact public Instagram username you want to use.',
      icon: 'users',
    },
    {
      id: 'ig-f-bb-package',
      title: 'Check Your Package',
      description: 'Review the number of followers included before checkout.',
      icon: 'sparkles',
    },
    {
      id: 'ig-f-bb-price',
      title: 'Review the Price',
      description: 'Confirm the current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'ig-f-bb-public',
      title: 'Keep Your Profile Accessible',
      description:
        'Keep the submitted profile publicly accessible where required while the order is being processed.',
      icon: 'shield-check',
    },
    {
      id: 'ig-f-bb-username-change',
      title: 'Avoid Username Changes',
      description:
        'Changing the submitted username during an active order may interfere with processing.',
      icon: 'lock',
    },
    {
      id: 'ig-f-bb-policies',
      title: 'Review the Policies',
      description: 'Check the relevant Terms and Refund Policy before completing your purchase.',
      icon: 'headphones',
    },
  ],
};

followersAuthority.packageSizes = {
  id: 'how-many-followers-should-you-choose-canada',
  title: 'How Many Followers Should You Choose?',
  description:
    'Start with a quantity that makes sense next to your current follower count and the profile you\'re building. A newer account may prefer a smaller package such as 100, 250, or 500 followers. Profiles that already have an established audience may choose 1K or a larger package. There isn\'t one perfect number for every Instagram account. The right package gives you the increase you want without buying more followers than you need.',
  rows: [
    { id: 'ig-f-ps-100', quantity: '100', recommendedFor: 'Newer profiles and first orders' },
    { id: 'ig-f-ps-250', quantity: '250', recommendedFor: 'Small accounts building momentum' },
    { id: 'ig-f-ps-500', quantity: '500', recommendedFor: 'Growing creator or business profiles' },
    { id: 'ig-f-ps-1k', quantity: '1K', recommendedFor: 'Established accounts wanting a visible boost' },
    { id: 'ig-f-ps-25k', quantity: '2.5K', recommendedFor: 'Profiles with an existing audience' },
    { id: 'ig-f-ps-5k', quantity: '5K', recommendedFor: 'Profiles with an existing audience' },
    { id: 'ig-f-ps-10k', quantity: '10K', recommendedFor: 'Larger profiles with an established audience' },
    { id: 'ig-f-ps-15k', quantity: '15K', recommendedFor: 'Larger profiles with an established audience' },
  ],
  bottomNote: 'See the current price for each package before you order.',
};

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-ig-f-where-buy',
  'ca-ig-f-no-password',
  'ca-ig-f-cheap',
  'ca-ig-f-real',
  'ca-ig-f-how-many',
  'ca-ig-f-password-required',
  'ca-ig-f-cost',
  'ca-ig-f-delivery-time',
  'ca-ig-f-likes-views',
  'ca-ig-f-business-creators',
];

related.title = 'Explore More Instagram Services';
related.description = 'Building a profile often involves more than one metric.';

followersAuthority.relatedPackages = {
  copyBySlug: {
    'buy-instagram-likes': {
      title: 'Instagram Likes',
      description: 'For eligible posts and Reels.',
      ctaLabel: 'View Instagram Likes',
    },
    'buy-instagram-views': {
      title: 'Instagram Views',
      description: 'For eligible Reels and video content.',
      ctaLabel: 'View Instagram Views',
    },
    'buy-instagram-comments': {
      title: 'Instagram Comments',
      description: 'For eligible posts and Reels.',
      ctaLabel: 'View Instagram Comments',
    },
  },
};

followersAuthority.whyBuyNote = '';

finalCta.title = 'Ready to Grow Your Instagram Presence?';
finalCta.description =
  'Choose the follower package that fits your profile, enter your public Instagram username and place your order without sharing your password.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Followers Package';

data.followersAuthority = followersAuthority;

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-followers'] = {
  title: 'Buy Instagram Followers in Canada | NovaLikes',
  description:
    'Buy Instagram followers in Canada with flexible packages, no password required, secure checkout, and order tracking. Choose the right follower package for your profile.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

// Patch service FAQs
const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;
const caIgFaqs = [
  {
    id: 'ca-ig-f-where-buy',
    question: 'Where can I buy Instagram followers in Canada?',
    answer:
      'You can buy Instagram followers online through NovaLikes. Choose an available follower package, enter the public username of the Instagram profile receiving the order and complete checkout without sharing your password.',
  },
  {
    id: 'ca-ig-f-no-password',
    question: 'How can I get Instagram followers without a password?',
    answer:
      'NovaLikes does not require your Instagram password. You only provide the public Instagram username requested during checkout.',
  },
  {
    id: 'ca-ig-f-cheap',
    question: 'Can I buy cheap Instagram followers in Canada?',
    answer:
      'NovaLikes offers different package sizes and prices, allowing you to choose based on your budget. When comparing cheaper options, consider the follower quantity, password requirements, checkout process, tracking, support and service policies as well as price.',
  },
  {
    id: 'ca-ig-f-real',
    question: 'What are real Instagram followers?',
    answer:
      'The term "real Instagram followers" can mean different things across providers. Review the actual service details rather than relying only on the label. NovaLikes follower packages are designed to increase the follower count shown on the selected profile.',
  },
  {
    id: 'ca-ig-f-how-many',
    question: 'How many Instagram followers should I buy?',
    answer:
      'Choose a quantity based on your current follower count and the increase you want. Smaller profiles may prefer 100, 250 or 500 followers, while established accounts may choose 1K or larger packages.',
  },
  {
    id: 'ca-ig-f-password-required',
    question: 'Do I need to give NovaLikes my Instagram password?',
    answer:
      'No. Your Instagram password, verification codes and private account access are not required.',
  },
  {
    id: 'ca-ig-f-cost',
    question: 'How much does it cost to buy Instagram followers?',
    answer:
      'Pricing depends on the number of followers you select. NovaLikes displays the current price for each available package before checkout.',
  },
  {
    id: 'ca-ig-f-delivery-time',
    question: 'How long does it take to get Instagram followers?',
    answer:
      'Processing time can vary depending on package size and current order conditions. Use your order tracking information for available status updates.',
  },
  {
    id: 'ca-ig-f-likes-views',
    question: 'Will followers also increase my likes and views?',
    answer:
      'Not automatically. Followers, likes, views and comments are separate Instagram metrics and separate services.',
  },
  {
    id: 'ca-ig-f-business-creators',
    question: 'Can businesses and creators buy Instagram followers?',
    answer:
      'Yes. Eligible public Instagram profiles for creators, businesses, brands and other users can order follower packages using their public username.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('faq-ig-followers-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caIgFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada Instagram Followers content from supplied docx copy.');
