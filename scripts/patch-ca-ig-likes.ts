/**
 * Apply supplied Canada Instagram Likes copy to content/markets/ca/services/buy-instagram-likes.json
 * Run: npx tsx scripts/patch-ca-ig-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-instagram-likes.json');
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
  title: 'Buy Instagram Likes Canada | Likes for Posts & Reels',
  description:
    'Buy Instagram likes in Canada for public posts and Reels. Choose flexible like packages, order without a password, and track your purchase with NovaLikes.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR CANADA';
hero.title = 'Buy Instagram Likes in Canada for Posts & Reels';
hero.description =
  'Give your best Instagram content a stronger visible start with like packages for public posts and Reels. NovaLikes makes it simple for Canadian creators, businesses, brands, and agencies to buy Instagram likes without sharing account login details. Choose the number of likes that fits your content, paste the exact public post or Reel URL, and complete your order online. Whether you\'re supporting a new Reel, product launch, campaign post, announcement, or content you want to put more attention behind, you can choose a package based on the post you\'re working with.';
hero.primaryCta = { label: 'Choose Your Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-l-trust-public', label: 'Public Post or Reel URL Only' },
  { id: 'ig-l-trust-password', label: 'No Password Required' },
  { id: 'ig-l-trust-checkout', label: 'Secure Checkout' },
  { id: 'ig-l-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose Your Instagram Likes Package';
pricing.description =
  'Every post performs differently, so not every piece of content needs the same number of likes. NovaLikes offers multiple package sizes so you can choose based on the post or Reel you\'re working with. Available quantities include 100, 250, 500, 1K, 2.5K, 3K, 5K and 10K likes. Compare the current prices before checkout and choose a package that fits your content and budget.';
pricing.primaryCtaLabel = 'Choose Your Likes Package';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-ig-l-where-buy',
  'ca-ig-l-no-password',
  'ca-ig-l-cheap',
  'ca-ig-l-real',
  'ca-ig-l-how-many',
  'ca-ig-l-reel',
  'ca-ig-l-password-required',
  'ca-ig-l-cost',
  'ca-ig-l-delivery-time',
  'ca-ig-l-followers',
  'ca-ig-l-reel-views',
  'ca-ig-l-business-creators',
  'ca-ig-l-older-post',
  'ca-ig-l-track',
];

related.title = 'Explore More Instagram Services';
related.description = 'Likes are only one part of your Instagram presence.';

finalCta.title = 'Ready to Put More Likes Behind Your Best Content?';
finalCta.description =
  'Choose the Instagram Likes package that fits your post or Reel, paste the correct public content URL, and place your order without sharing your Instagram password.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-likes-canada',
  title: 'Why Choose NovaLikes for Instagram Likes?',
  description:
    'Buying Instagram likes should be straightforward. You should know what you\'re ordering, which content will receive it, and what information is required before you pay.',
  items: [
    {
      id: 'ig-l-wc-password',
      title: 'No Instagram Password Required',
      description:
        'Your Instagram password, verification codes, and private login details are not needed.',
      icon: 'lock',
    },
    {
      id: 'ig-l-wc-packages',
      title: 'Flexible Like Packages',
      description:
        'Choose from smaller and larger quantities depending on the post or Reel you\'re working with.',
      icon: 'users',
    },
    {
      id: 'ig-l-wc-pricing',
      title: 'Clear Pricing',
      description:
        'Review the likes quantity and current package price before completing your purchase.',
      icon: 'credit-card',
    },
    {
      id: 'ig-l-wc-targeting',
      title: 'Post-Level Targeting',
      description:
        'Likes are applied to the specific public post or Reel URL you submit rather than your entire Instagram account.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use your NovaLikes order information to check available status updates after checkout.',
      icon: 'map-pin',
    },
    {
      id: 'ig-l-wc-support',
      title: 'Customer Support',
      description:
        'If you need help before ordering or with an existing purchase, NovaLikes support is available to review your order.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'get-instagram-likes-without-login-canada',
  title: 'Get Instagram Likes Without Sharing Your Login',
  description:
    'You don\'t need to give NovaLikes control of your Instagram account to place a likes order. The service works with the public URL of the post or Reel receiving the likes.',
  cards: [
    {
      id: 'ig-l-can-need',
      title: 'What You Need',
      description: 'The exact public URL of the Instagram post or Reel.',
      icon: 'users',
    },
    {
      id: 'ig-l-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your Instagram password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Always open the link once before submitting it to make sure it points to the exact content you want to use.',
};

config.doesBuyingHelp = {
  id: 'what-real-instagram-likes-mean-canada',
  title: 'What Should "Real Instagram Likes" Mean to a Buyer?',
  description:
    '"Real Instagram likes" is a common phrase used by people searching for engagement services, but providers may use the term differently. Don\'t make a purchase decision based on that label alone. Instead, understand exactly what the service does.',
  helpTitle: 'What NovaLikes Instagram Likes Packages Do',
  helpItems: [
    'Increase the visible like count on the eligible public post or Reel submitted with your order',
  ],
  limitTitle: 'A Likes Package Does Not Automatically Guarantee',
  limitItems: [
    'Additional followers',
    'More video views',
    'Comments',
    'Organic reach',
    'Sales, customers or partnerships',
  ],
  closingNote:
    'Those outcomes depend on other factors, including the content itself, audience fit, profile quality, and your broader marketing activity. Clear expectations matter more than an unsupported marketing label.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-likes-order-canada',
  title: 'What Happens After You Order?',
  description:
    'Once checkout is complete, your likes package is connected to the public Instagram post or Reel URL you provided.',
  steps: [
    {
      id: 'ig-l-th-1',
      title: 'Your Details Are Checked',
      description:
        'The selected package and submitted content URL are associated with your order.',
    },
    {
      id: 'ig-l-th-2',
      title: 'The Order Targets That Specific Content',
      description:
        'The likes are processed for the post or Reel connected to your submitted URL.',
    },
    {
      id: 'ig-l-th-3',
      title: 'Processing Begins',
      description:
        'Processing time can vary depending on package size and current order conditions.',
    },
    {
      id: 'ig-l-th-4',
      title: 'You Can Follow Your Order',
      description:
        'Use the available tracking option to check status information. If you need assistance, contact support with your order details.',
    },
  ],
  closingNote:
    'Keep the selected content publicly accessible while the order is active and avoid deleting or restricting it until processing is complete.',
};

config.serviceCompare = {
  id: 'instagram-likes-followers-views-which-need-canada',
  title: 'Instagram Likes, Followers or Views: Which Do You Need?',
  description: 'Choose the service based on the Instagram metric you want to change.',
  current: {
    title: 'Instagram Likes',
    description: 'Increase the like count on a specific post or Reel',
    bestFor: 'Post or Reel engagement',
    ctaLabel: 'Instagram Likes',
  },
  likes: {
    title: 'Instagram Followers',
    description: 'Increase the follower count displayed on your profile',
    bestFor: 'Profile follower count',
    href: caHref('/buy-instagram-followers'),
    ctaLabel: 'Instagram Followers',
  },
  views: {
    title: 'Instagram Views',
    description: 'Increase views on an eligible Reel or video',
    bestFor: 'Eligible Reels and video content',
    href: caHref('/buy-instagram-views'),
    ctaLabel: 'Instagram Views',
  },
  combinedNote:
    'If the goal is engagement on one specific post or Reel, choose Instagram Likes. If you\'re working on your overall profile presence instead, Instagram Followers may be the better fit. For video play count, choose Instagram Views.',
  commentsHref: caHref('/buy-instagram-comments'),
};

config.beforeBuying = {
  id: 'before-you-buy-instagram-likes-canada',
  title: 'Before You Buy Instagram Likes',
  description: 'Use this quick checklist before placing your order.',
  framingNote:
    'Choosing the right post or Reel matters. Use the exact content link, keep the content publicly accessible, match the package to the post, and review everything before payment.',
  items: [
    {
      id: 'ig-l-bb-post',
      title: 'Confirm the Post or Reel',
      description: 'Make sure the URL opens the exact content you want to use.',
      icon: 'users',
    },
    {
      id: 'ig-l-bb-quantity',
      title: 'Choose the Right Likes Quantity',
      description:
        'Review the package size rather than automatically choosing the largest option.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-bb-price',
      title: 'Check the Current Price',
      description:
        'Make sure the package and price match what you intended to purchase.',
      icon: 'credit-card',
    },
    {
      id: 'ig-l-bb-available',
      title: 'Keep the Content Available',
      description:
        'Do not remove or restrict the submitted post or Reel while the order is being processed.',
      icon: 'shield-check',
    },
    {
      id: 'ig-l-bb-password',
      title: 'Don\'t Share Your Password',
      description: 'NovaLikes does not require Instagram login credentials for a likes order.',
      icon: 'lock',
    },
    {
      id: 'ig-l-bb-policies',
      title: 'Review the Policies',
      description:
        'Check the relevant Terms, Refund Policy, and service details before paying.',
      icon: 'headphones',
    },
  ],
};

config.worldwide = {
  id: 'instagram-likes-wider-growth-strategy-canada',
  title: 'Use Likes as Part of a Wider Instagram Growth Strategy',
  description:
    'Instagram growth isn\'t built around one metric. A well-presented account usually combines several signals.',
  eyebrow: 'Instagram Growth Strategy',
  closingNote:
    'These metrics can complement each other, but they are not interchangeable. Choose the service based on the metric you\'re actually trying to improve.',
  cards: [
    {
      id: 'ig-l-ww-likes',
      title: 'Likes Show Engagement on Individual Content',
      description:
        'Likes are useful when the specific post or Reel is your priority.',
      icon: 'heart',
    },
    {
      id: 'ig-l-ww-followers',
      title: 'Followers Show Profile Audience Size',
      description:
        'Follower count applies to your overall Instagram profile rather than one individual post.',
      icon: 'users',
    },
    {
      id: 'ig-l-ww-views',
      title: 'Views Measure Video Consumption',
      description:
        'Views are relevant when you\'re working with eligible Reels or video content.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-l-ww-comments',
      title: 'Comments Add Conversation',
      description:
        'Comments create a different type of visible interaction beneath a post or Reel.',
      icon: 'megaphone',
    },
  ],
};

config.packageSizes = {
  id: 'how-many-instagram-likes-should-you-choose-canada',
  title: 'How Many Instagram Likes Should You Choose?',
  description:
    'Start with the content itself. A smaller post or newer account may only need a modest increase, while a stronger campaign post or established profile may call for a larger package. There is no single ideal number for every post. Choose a quantity that fits the content you\'re promoting and the visible engagement you want to add.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'ig-l-ps-count',
      quantity: 'Your Existing Like Count',
      recommendedFor:
        'Look at how many likes similar posts on your account normally receive.',
    },
    {
      id: 'ig-l-ps-content',
      quantity: 'The Importance of the Content',
      recommendedFor:
        'A regular update may need a different approach from a product launch, collaboration, announcement, or flagship Reel.',
    },
    {
      id: 'ig-l-ps-audience',
      quantity: 'Your Current Audience Size',
      recommendedFor:
        'Think about the size and activity of the profile publishing the content.',
    },
    {
      id: 'ig-l-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'You don\'t need to select the largest package just because it\'s available.',
    },
  ],
  bottomNote: 'Compare package sizes and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-instagram-likes-canada',
  title: 'Affordable Instagram Likes Without Guesswork',
  description:
    'If you\'re searching for cheap Instagram likes in Canada, price will naturally be part of the decision. But a low price should not be the only thing you compare. Before ordering from any Instagram likes service, check:',
  closingNote:
    'An affordable Instagram likes package should make the buying process clear before checkout. NovaLikes lets you compare the available quantities and current pricing so you can choose the package that makes sense for the content you\'re working on.',
  items: [
    {
      id: 'ig-l-bp-1',
      title: 'How Many Likes Are Included',
      description: 'Check how many likes are included before checkout.',
      icon: 'users',
    },
    {
      id: 'ig-l-bp-2',
      title: 'Posts or Reels Support',
      description: 'Confirm whether the package works with posts or Reels.',
      icon: 'heart',
    },
    {
      id: 'ig-l-bp-3',
      title: 'Required URL Details',
      description: 'Know what public post or Reel URL you need to submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-bp-4',
      title: 'No Password Requirement',
      description: 'Your Instagram password should not be required.',
      icon: 'lock',
    },
    {
      id: 'ig-l-bp-5',
      title: 'Clear Package Pricing',
      description: 'Package quantities and prices should be visible before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-l-bp-6',
      title: 'Order Tracking',
      description: 'Check whether order tracking is available after purchase.',
      icon: 'map-pin',
    },
    {
      id: 'ig-l-bp-7',
      title: 'Support and Service Policies',
      description: 'Support and service policies should be easy to find.',
      icon: 'headphones',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-likes-canada',
  title: 'Common Mistakes When Buying Instagram Likes',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-instagram-followers': {
      title: 'Instagram Followers',
      description: 'Increase the follower count displayed on your public Instagram profile.',
      ctaLabel: 'Buy Instagram Followers',
    },
    'buy-instagram-views': {
      title: 'Instagram Views',
      description: 'Increase the visible view count on eligible public Reels and videos.',
      ctaLabel: 'Buy Instagram Views',
    },
    'buy-instagram-comments': {
      title: 'Instagram Comments',
      description: 'Add comments to eligible public Instagram posts and Reels.',
      ctaLabel: 'Buy Instagram Comments',
    },
  },
};

dummy.whyBuy = {
  id: 'build-stronger-engagement-instagram-likes-canada',
  title: 'Build Stronger Engagement Around Your Best Content',
  description:
    'Likes are one of the first visible engagement signals people notice underneath an Instagram post or Reel. For Canadian creators and businesses, that visible activity can be especially relevant when putting extra attention behind content such as product launches, new collections, creator collaborations, business announcements, promotional Reels, portfolio content, campaign posts, and important brand updates. An Instagram likes package increases the visible like count on the selected piece of content. The content itself still matters. Strong creative, a useful caption, clear positioning, consistent posting, and genuine audience interaction all contribute to how people respond after discovering your post. Think of likes as one engagement signal within a larger Instagram content strategy.',
  items: [
    {
      id: 'ig-l-wb-launches',
      title: 'Product and Service Launches',
      description:
        'If you\'re launching something new, focus attention on the post or Reel that explains the offer most clearly.',
    },
    {
      id: 'ig-l-wb-collabs',
      title: 'Creator Collaborations',
      description:
        'A collaboration post may be more valuable to support than an everyday update because it can represent your work to potential future partners.',
    },
    {
      id: 'ig-l-wb-announcements',
      title: 'Business Announcements',
      description:
        'New locations, services, offers, events, or milestones can be stronger candidates for additional visible engagement.',
    },
    {
      id: 'ig-l-wb-evergreen',
      title: 'Evergreen Content',
      description:
        'Older content that still represents your brand well can remain useful long after its original publishing date.',
    },
    {
      id: 'ig-l-wb-reels',
      title: 'Reels With Strong Creative',
      description:
        'If a Reel already has a strong opening, useful information, or polished creative, additional visible likes can support the overall presentation of that content.',
    },
  ],
  bottomNote:
    'Choose the content intentionally instead of treating every Instagram post the same.',
};

dummy.howToBuy = {
  id: 'how-to-buy-instagram-likes-canada',
  title: 'How to Buy Instagram Likes',
  description: 'Ordering Instagram likes through NovaLikes takes four simple steps.',
  steps: [
    {
      id: 'ig-l-step-1',
      title: 'Choose Your Likes Package',
      description: 'Compare the available quantities and select the number of likes you want.',
    },
    {
      id: 'ig-l-step-2',
      title: 'Paste the Post or Reel URL',
      description:
        'Provide the exact public Instagram URL for the content receiving the order.',
    },
    {
      id: 'ig-l-step-3',
      title: 'Review and Complete Checkout',
      description:
        'Check the likes quantity, content URL, and current package price before placing the order.',
    },
    {
      id: 'ig-l-step-4',
      title: 'Track Your Order',
      description:
        'After checkout, use NovaLikes order tracking to view available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Instagram Services';
dummy.relatedIntro = 'Likes are only one part of your Instagram presence.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Likes in Canada?',
  text: 'You can buy Instagram likes in Canada through NovaLikes for eligible public posts and Reels. Select a likes package, submit the exact public Instagram content URL, and complete checkout without sharing your Instagram password. The likes are applied to the selected content rather than your overall profile follower count.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-likes'] = {
  title: 'Buy Instagram Likes Canada | Likes for Posts & Reels',
  description:
    'Buy Instagram likes in Canada for public posts and Reels. Choose flexible like packages, order without a password, and track your purchase with NovaLikes.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caIgLikesFaqs = [
  {
    id: 'ca-ig-l-where-buy',
    question: 'Where can I buy Instagram likes in Canada?',
    answer:
      'You can buy Instagram likes in Canada through NovaLikes for eligible public posts and Reels. Choose a likes package, provide the exact public content URL, and complete checkout without sharing your Instagram password.',
  },
  {
    id: 'ca-ig-l-no-password',
    question: 'How can I get Instagram likes without giving my password?',
    answer:
      'NovaLikes does not require your Instagram password. You only need to provide the public URL of the post or Reel where you want the likes added.',
  },
  {
    id: 'ca-ig-l-cheap',
    question: 'Can I buy cheap Instagram likes in Canada?',
    answer:
      'NovaLikes offers multiple Instagram likes package sizes, allowing you to compare quantities and current prices before ordering. When comparing cheaper services, also consider password requirements, order tracking, support, and what the package actually includes.',
  },
  {
    id: 'ca-ig-l-real',
    question: 'What are real Instagram likes?',
    answer:
      '"Real Instagram likes" can mean different things depending on the provider. Instead of relying only on the term, review exactly what the service promises. NovaLikes Instagram Likes packages are designed to increase the visible like count on the selected eligible public content.',
  },
  {
    id: 'ca-ig-l-how-many',
    question: 'How many Instagram likes should I buy?',
    answer:
      'Choose based on the post\'s current engagement, your profile size, and the increase you want. A regular post may need a smaller package, while an important campaign or established account may justify a larger quantity.',
  },
  {
    id: 'ca-ig-l-reel',
    question: 'Can I buy likes for an Instagram Reel?',
    answer:
      'Yes. NovaLikes supports eligible public Instagram posts and Reels. Provide the exact public Reel URL when placing your order.',
  },
  {
    id: 'ca-ig-l-password-required',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. Your Instagram password, verification codes, and private login access are not required for an Instagram Likes order.',
  },
  {
    id: 'ca-ig-l-cost',
    question: 'How much does it cost to buy Instagram likes?',
    answer:
      'The price depends on the number of likes you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'ca-ig-l-delivery-time',
    question: 'How long does an Instagram Likes order take?',
    answer:
      'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available status updates rather than assuming one fixed processing time.',
  },
  {
    id: 'ca-ig-l-followers',
    question: 'Will buying Instagram likes increase my followers?',
    answer:
      'Not automatically. Instagram likes apply to the specific content submitted with your order. Followers are a separate profile-level metric and a separate NovaLikes service.',
  },
  {
    id: 'ca-ig-l-reel-views',
    question: 'Will Instagram likes increase my Reel views?',
    answer:
      'Not automatically. Likes and views are different Instagram metrics. If your main goal is the visible view count on an eligible Reel or video, choose Instagram Views instead.',
  },
  {
    id: 'ca-ig-l-business-creators',
    question: 'Can Canadian businesses and creators buy Instagram likes?',
    answer:
      'Yes. Eligible public posts and Reels from creator, business, brand, and other Instagram profiles can use NovaLikes Instagram Likes packages.',
  },
  {
    id: 'ca-ig-l-older-post',
    question: 'Can I use Instagram likes for an older post?',
    answer:
      'If the Instagram post or Reel remains eligible and publicly accessible, it may be used for a likes order. Make sure the exact public URL is submitted.',
  },
  {
    id: 'ca-ig-l-track',
    question: 'Can I track my Instagram Likes order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to view available status information for your purchase.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-ig-l-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caIgLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada Instagram Likes content.');
