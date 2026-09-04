/**
 * Apply supplied Canada TikTok Views copy to content/markets/ca/services/buy-tiktok-views.json
 * Run: npx tsx scripts/patch-ca-tiktok-views.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-tiktok-views.json');
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
  title: 'Buy TikTok Views Canada | Views for Your Videos | NovaLikes',
  description:
    'Buy TikTok views in Canada for public videos. Compare flexible view packages, order with a video link and track your purchase without sharing your password.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR CANADA';
hero.title = 'Buy TikTok Views in Canada and Put More Attention Behind Your Videos';
hero.description =
  'Give the TikTok videos that matter most a stronger visible view count. NovaLikes lets Canadian creators, businesses and brands buy TikTok views for eligible public videos without sharing account login details. Choose the number and package option that fits your content, submit the exact public video link and complete your order online. Whether you\'re working on a product demo, creator campaign, business launch, educational video or one of your strongest TikToks, you can choose views around the content you actually want to support.';
hero.primaryCta = { label: 'Choose Your TikTok Views Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-v-trust-public', label: 'Public Video Link Only' },
  { id: 'tt-v-trust-password', label: 'No Password Required' },
  { id: 'tt-v-trust-checkout', label: 'Secure Checkout' },
  { id: 'tt-v-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose Views Based on the Video, Not Just the Number';
pricing.description =
  'Every TikTok has a different purpose. A quick everyday post doesn\'t necessarily need the same view package as a product launch, collaboration or campaign video. NovaLikes offers multiple TikTok Views quantities and package options, including High Quality and Premium choices, so you can compare the available pricing before ordering. When deciding, consider the video\'s existing view count, the importance of the content, your profile size and your budget. Choose the package that fits what you\'re trying to accomplish rather than automatically selecting the largest available quantity.';
pricing.primaryCtaLabel = 'Compare TikTok Views Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-tt-v-where-buy',
  'ca-tt-v-more-views',
  'ca-tt-v-cheap',
  'ca-tt-v-real',
  'ca-tt-v-hq-premium',
  'ca-tt-v-how-many',
  'ca-tt-v-password',
  'ca-tt-v-cost',
  'ca-tt-v-delivery-time',
  'ca-tt-v-fyp',
  'ca-tt-v-followers',
  'ca-tt-v-likes',
  'ca-tt-v-creator-rewards',
  'ca-tt-v-business',
  'ca-tt-v-older-video',
  'ca-tt-v-safe',
  'ca-tt-v-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Put More Views Behind the TikToks Worth Watching';
finalCta.description =
  'Choose the video you want to support, compare the available TikTok Views packages and submit its direct public link without sharing your password. Then keep building what no view package can replace: content people genuinely choose to watch.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Views Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-views-canada',
  title: 'Why Choose NovaLikes for TikTok Views?',
  description: 'The ordering experience should make sense before you pay.',
  items: [
    {
      id: 'tt-v-wc-video',
      title: 'Views for Specific TikTok Videos',
      description:
        'The order applies to the eligible public video connected to the URL you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-v-wc-packages',
      title: 'Multiple Package Options',
      description:
        'Compare the available view quantities and package types before deciding.',
      icon: 'users',
    },
    {
      id: 'tt-v-wc-password',
      title: 'No TikTok Password Required',
      description:
        'Your password, verification codes and private login information are not needed.',
      icon: 'lock',
    },
    {
      id: 'tt-v-wc-pricing',
      title: 'Pricing Before Checkout',
      description:
        'Review the selected package and current price before placing the order.',
      icon: 'credit-card',
    },
    {
      id: 'tt-v-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use NovaLikes order tracking afterward for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'tt-v-wc-support',
      title: 'Support for Existing Orders',
      description:
        'If something needs checking, provide your order information so support can identify the relevant purchase.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-tiktok-views-without-login-canada',
  title: 'How to Buy TikTok Views Without Sharing Your Login',
  description:
    'NovaLikes processes TikTok Views orders using the public video information requested during checkout.',
  cards: [
    {
      id: 'tt-v-can-need',
      title: 'What You Need',
      description: 'The direct URL of the eligible public TikTok video and your selected Views package.',
      icon: 'users',
    },
    {
      id: 'tt-v-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your TikTok password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Open the URL before ordering and make sure it leads to the exact video you want to use. A TikTok profile link is not the same as an individual video link.',
};

config.doesBuyingHelp = {
  id: 'what-real-tiktok-views-mean-canada',
  title: 'Looking for "Real TikTok Views"? Read Beyond the Label',
  description:
    '"Real TikTok views" is a common phrase used when people compare video-view services. You\'ll also see terms such as high-quality TikTok views, premium TikTok views or organic TikTok views. Providers may not define those words in exactly the same way. Instead of judging a service by one marketing label, look at what the package actually promises.',
  helpTitle: 'What NovaLikes TikTok Views Packages Do',
  helpItems: [
    'Increase the displayed view count on the eligible public video submitted with the order',
  ],
  limitTitle: 'Do Not Automatically Assume a Views Package Includes or Guarantees',
  limitItems: [
    'Unique genuine viewers or organic watch time',
    'Followers, likes or comments',
    'FYP distribution or Creator Rewards qualification',
    'Sales or customers',
  ],
  closingNote:
    'Public view counts and qualified monetization views can follow different rules. No third-party TikTok Views provider should promise that buying views is completely risk-free or officially supported by TikTok. Understand the platform risk, keep your password private and continue building genuine content.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-views-order-canada',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your TikTok video link and selected Views package are associated with the purchase. The order is then processed for the submitted video.',
  steps: [
    {
      id: 'tt-v-th-1',
      title: 'Video Link and Package Are Connected',
      description:
        'Your TikTok video link and selected Views package are associated with the purchase.',
    },
    {
      id: 'tt-v-th-2',
      title: 'Order Targets That Video',
      description: 'The order is processed for the submitted video.',
    },
    {
      id: 'tt-v-th-3',
      title: 'Keep the Video Accessible',
      description:
        'The selected TikTok should remain publicly accessible where required while processing is active.',
    },
    {
      id: 'tt-v-th-4',
      title: 'Follow Order Status',
      description:
        'Processing time can vary depending on quantity, package option and current order conditions. Use NovaLikes tracking for available updates.',
    },
  ],
  closingNote:
    'Avoid deleting the video, changing the target or submitting the wrong link while an active order depends on that content.',
};

config.serviceCompare = {
  id: 'tiktok-views-likes-followers-canada',
  title: 'TikTok Views, Likes or Followers: Start With Your Goal',
  description: 'These services solve different needs.',
  current: {
    title: 'TikTok Views',
    description: 'View count displayed on an eligible public video',
    bestFor: 'Video view count',
    ctaLabel: 'TikTok Views',
  },
  likes: {
    title: 'TikTok Likes',
    description: 'Like count displayed on an eligible public video',
    bestFor: 'Video like count',
    href: caHref('/buy-tiktok-likes'),
    ctaLabel: 'TikTok Likes',
  },
  views: {
    title: 'TikTok Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile follower count',
    href: caHref('/buy-tiktok-followers'),
    ctaLabel: 'TikTok Followers',
  },
  combinedNote:
    'Choose Views for video view count, Likes for video engagement, or Followers for profile audience size. These are separate services and should not be treated as interchangeable.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-views-canada',
  title: 'Before You Buy TikTok Views',
  description: 'Run through this checklist before checkout.',
  framingNote: '',
  items: [
    {
      id: 'tt-v-bb-video',
      title: 'Confirm the Video',
      description: 'Open the exact public TikTok you want to use.',
      icon: 'users',
    },
    {
      id: 'tt-v-bb-url',
      title: 'Copy the Direct URL',
      description:
        'Do not submit your general profile link when an individual video URL is required.',
      icon: 'sparkles',
    },
    {
      id: 'tt-v-bb-package',
      title: 'Choose the Package Option',
      description:
        'Review the currently available High Quality or Premium option where applicable.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-v-bb-quantity',
      title: 'Check the Quantity',
      description: 'Make sure you\'re ordering the number of views you intended.',
      icon: 'credit-card',
    },
    {
      id: 'tt-v-bb-price',
      title: 'Review the Current Price',
      description: 'Check the package total before completing checkout.',
      icon: 'shield-check',
    },
    {
      id: 'tt-v-bb-public',
      title: 'Keep the Video Public',
      description:
        'Avoid deleting or restricting the submitted video while processing depends on public access.',
      icon: 'lock',
    },
    {
      id: 'tt-v-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require TikTok login credentials.',
      icon: 'headphones',
    },
    {
      id: 'tt-v-bb-metric',
      title: 'Know What Views Do',
      description: 'TikTok Views do not automatically include followers or likes.',
      icon: 'megaphone',
    },
    {
      id: 'tt-v-bb-policies',
      title: 'Review the Policies',
      description:
        'Check the applicable service, refund and purchase information before ordering.',
      icon: 'shield-check',
    },
  ],
};

config.worldwide = {
  id: 'views-fyp-reach-not-same-canada',
  title: 'Views and For You Page Reach Are Not the Same Thing',
  description:
    'A visible TikTok view count and organic For You Page distribution are different things. TikTok\'s recommendation system considers multiple signals when deciding what content people may want to see. A purchased Views package should therefore not be treated as a guarantee that TikTok will push a video to the For You Page, make it viral, generate organic viewers, add followers, create likes or comments, rank the video in TikTok Search or produce sales.',
  eyebrow: 'Views vs Distribution',
  closingNote:
    'NovaLikes TikTok Views packages are designed around the displayed view metric on the selected eligible video. Organic distribution remains a separate outcome. A higher view count is not the same as better watch behaviour — use your genuine TikTok analytics to guide content decisions.',
  cards: [
    {
      id: 'tt-v-ww-fyp',
      title: 'For You Page Reach',
      description: 'FYP distribution is separate from visible view count.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-v-ww-watch',
      title: 'Watch Behaviour',
      description:
        'Genuine viewer retention and engagement tell a different story than the public number.',
      icon: 'heart',
    },
    {
      id: 'tt-v-ww-followers',
      title: 'Profile Followers',
      description: 'Followers apply to the account rather than one video.',
      icon: 'users',
    },
    {
      id: 'tt-v-ww-business',
      title: 'Business Results',
      description:
        'Visible views do not automatically create enquiries, sales or partnerships.',
      icon: 'briefcase',
    },
  ],
};

config.packageSizes = {
  id: 'which-tiktok-videos-worth-views-canada',
  title: 'Which TikTok Videos Are Worth Putting More Views Behind?',
  description:
    'Buying views on every video isn\'t necessarily a useful strategy. Start with the content that has a clear role on your profile. Put the video first. Then decide whether a Views package fits what you\'re trying to achieve.',
  quantityColumnLabel: 'Video Type',
  recommendedColumnLabel: 'Why It May Fit',
  rows: [
    {
      id: 'tt-v-ps-brand',
      quantity: 'Videos That Introduce Your Brand',
      recommendedFor:
        'A strong introduction can help profile visitors quickly understand who you are and what you do.',
    },
    {
      id: 'tt-v-ps-demo',
      quantity: 'Product Demonstrations',
      recommendedFor:
        'Showing a product in use can often communicate more than a simple promotional image or caption.',
    },
    {
      id: 'tt-v-ps-service',
      quantity: 'Service Explainers',
      recommendedFor:
        'For service businesses, a short video explaining a process, transformation or result can remain useful long after it is published.',
    },
    {
      id: 'tt-v-ps-collab',
      quantity: 'Creator Collaborations',
      recommendedFor:
        'Partnership content may continue representing both creators after the campaign itself ends.',
    },
    {
      id: 'tt-v-ps-educational',
      quantity: 'Educational Content',
      recommendedFor:
        'Tutorials, answers and practical tips can provide long-term value if the information remains relevant.',
    },
    {
      id: 'tt-v-ps-organic',
      quantity: 'Your Strongest Organic Videos',
      recommendedFor:
        'If genuine viewers are already responding well to a particular format or topic, that can be more meaningful than supporting random content.',
    },
  ],
  bottomNote: 'Compare TikTok Views package options and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-tiktok-views-canada',
  title: 'Affordable TikTok Views Without Guessing What You\'re Buying',
  description:
    'If you\'re searching for cheap TikTok views in Canada, price is likely part of the comparison. But also check what sits behind the price. Before ordering, review:',
  closingNote:
    'An affordable TikTok Views package should let you understand these basics before checkout. NovaLikes displays the available package options so you can compare them against the individual video and budget you\'re working with.',
  items: [
    {
      id: 'tt-v-bp-1',
      title: 'Views Quantity',
      description: 'Check how many views are included in the package.',
      icon: 'users',
    },
    {
      id: 'tt-v-bp-2',
      title: 'Available Package Type',
      description: 'Compare High Quality and Premium options where shown.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-v-bp-3',
      title: 'Current Price',
      description: 'Review pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'tt-v-bp-4',
      title: 'Video Requirements',
      description: 'Know what public TikTok video URL you need to submit.',
      icon: 'sparkles',
    },
    {
      id: 'tt-v-bp-5',
      title: 'No Login Credentials',
      description: 'Your TikTok password should not be requested.',
      icon: 'lock',
    },
    {
      id: 'tt-v-bp-6',
      title: 'Order Tracking',
      description: 'Check whether order tracking is available.',
      icon: 'map-pin',
    },
    {
      id: 'tt-v-bp-7',
      title: 'Support and Policies',
      description: 'Review customer support and relevant policies.',
      icon: 'headphones',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-views-canada',
  title: 'Common Mistakes When Buying TikTok Views',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-tiktok-likes': {
      title: 'TikTok Likes',
      description:
        'Choose TikTok Likes when you want to increase the visible like count on an eligible public video.',
      ctaLabel: 'Buy TikTok Likes',
    },
    'buy-tiktok-followers': {
      title: 'TikTok Followers',
      description:
        'Choose TikTok Followers when you want to increase the follower count displayed on your public TikTok profile.',
      ctaLabel: 'Buy TikTok Followers',
    },
  },
};

dummy.whyBuy = {
  id: 'build-visible-momentum-tiktok-views-canada',
  title: 'Build Visible Momentum Around Your Best TikTok Content',
  description:
    'View count is one of the most noticeable numbers attached to a TikTok video. It can show how much visible viewing activity the video has accumulated, but the number only tells part of the story. When someone actually watches, the content still has to do the work — giving genuine viewers a reason to keep watching, visit the profile, explore another video, leave a comment, share the content or follow the account. Purchased views can increase the displayed view metric; they cannot make an unclear video more useful. Turn video views into a better profile experience by keeping your bio clear, pinning the right videos and maintaining a recognizable content direction. Canadian businesses and creators may have specific videos that matter more than others.',
  items: [
    {
      id: 'tt-v-wb-launch',
      title: 'A New Product Launch',
      description:
        'Support the video that demonstrates the product most clearly rather than spreading attention across unrelated TikToks.',
    },
    {
      id: 'tt-v-wb-announcement',
      title: 'A Business Announcement',
      description:
        'A new service, opening, location, event or important change can have a clear reason for additional visibility.',
    },
    {
      id: 'tt-v-wb-seasonal',
      title: 'Seasonal Campaign Content',
      description:
        'A strong campaign TikTok can remain the centrepiece while other posts support the same message.',
    },
    {
      id: 'tt-v-wb-ecommerce',
      title: 'An Ecommerce Promotion',
      description:
        'Use a video that actually shows the product, use case or benefit rather than relying only on promotional text.',
    },
    {
      id: 'tt-v-wb-partnership',
      title: 'Creator Partnerships',
      description:
        'Focus on collaboration content that accurately represents the creator or brand relationship.',
    },
  ],
  bottomNote:
    'Use views around content you would be comfortable showing people even without the number beside it.',
};

dummy.howToBuy = {
  id: 'how-tiktok-views-order-works-canada',
  title: 'How Your TikTok Views Order Works',
  description: 'The process is centred around the specific video you choose.',
  steps: [
    {
      id: 'tt-v-step-1',
      title: 'Choose the Video',
      description: 'Start with the public TikTok you want to support.',
    },
    {
      id: 'tt-v-step-2',
      title: 'Pick a Views Package',
      description:
        'Compare the available quantities, package options and current prices.',
    },
    {
      id: 'tt-v-step-3',
      title: 'Submit the Direct Video Link',
      description: 'Paste the exact public URL into the required order field.',
    },
    {
      id: 'tt-v-step-4',
      title: 'Review Your Order',
      description:
        'Check the video link, selected quantity, package option and price.',
    },
    {
      id: 'tt-v-step-5',
      title: 'Complete Checkout',
      description: 'Place the order without providing your TikTok password.',
    },
    {
      id: 'tt-v-step-6',
      title: 'Track the Order',
      description:
        'Use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: How Can You Buy TikTok Views in Canada?',
  text: 'You can buy TikTok views in Canada through NovaLikes by selecting an available Views package, providing the exact public TikTok video URL and completing checkout online. Your TikTok password is not required. The order applies to that video\'s visible view count rather than automatically adding followers or likes.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-views'] = {
  title: 'Buy TikTok Views Canada | Views for Your Videos | NovaLikes',
  description:
    'Buy TikTok views in Canada for public videos. Compare flexible view packages, order with a video link and track your purchase without sharing your password.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caTtViewsFaqs = [
  {
    id: 'ca-tt-v-where-buy',
    question: 'Where can I buy TikTok views in Canada?',
    answer:
      'You can buy TikTok views in Canada through NovaLikes for eligible public videos. Choose an available Views package, submit the exact public TikTok video link and complete checkout without sharing your password.',
  },
  {
    id: 'ca-tt-v-more-views',
    question: 'How can I get more views on TikTok?',
    answer:
      'NovaLikes TikTok Views packages can increase the displayed view count on an eligible public video. For organic growth, focus on video quality, stronger openings, useful content and genuine performance data from your TikTok account.',
  },
  {
    id: 'ca-tt-v-cheap',
    question: 'Can I buy cheap TikTok views in Canada?',
    answer:
      'NovaLikes provides multiple TikTok Views package options and quantities. When comparing lower-cost choices, consider the package details, quantity, video requirements, password policy, tracking and support alongside price.',
  },
  {
    id: 'ca-tt-v-real',
    question: 'What are real TikTok views?',
    answer:
      '"Real TikTok views" can mean different things across providers. Review exactly what a package promises rather than relying only on that phrase. NovaLikes Views packages are designed to increase the displayed view count on eligible submitted videos.',
  },
  {
    id: 'ca-tt-v-hq-premium',
    question: 'Does NovaLikes offer High Quality and Premium TikTok Views?',
    answer:
      'The current NovaLikes TikTok Views page provides High Quality and Premium package options. Compare the displayed quantities, package details and prices before selecting one.',
  },
  {
    id: 'ca-tt-v-how-many',
    question: 'How many TikTok views should I buy?',
    answer:
      'There is no single correct quantity for every video. Consider the video\'s existing view count, its importance to your campaign, your profile size and the increase you actually want.',
  },
  {
    id: 'ca-tt-v-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes or private account access for a Views order.',
  },
  {
    id: 'ca-tt-v-cost',
    question: 'How much does it cost to buy TikTok views?',
    answer:
      'Pricing depends on the view quantity and package option you select. Check the current prices shown on NovaLikes before completing checkout.',
  },
  {
    id: 'ca-tt-v-delivery-time',
    question: 'How long does it take to get TikTok views?',
    answer:
      'Processing time can vary depending on the selected quantity, package option and current order conditions. Use NovaLikes order tracking for available updates.',
  },
  {
    id: 'ca-tt-v-fyp',
    question: 'Will buying TikTok views get my video on the For You Page?',
    answer:
      'There is no guarantee. TikTok\'s recommendation system uses multiple signals. A purchased view count should not be treated as a guaranteed FYP strategy.',
  },
  {
    id: 'ca-tt-v-followers',
    question: 'Will buying views increase my TikTok followers?',
    answer:
      'Not automatically. Views and followers are separate TikTok metrics and separate NovaLikes services.',
  },
  {
    id: 'ca-tt-v-likes',
    question: 'Will buying TikTok views add likes?',
    answer:
      'Not automatically. TikTok Likes is a separate service focused on the like count of an eligible video.',
  },
  {
    id: 'ca-tt-v-creator-rewards',
    question: 'Do purchased TikTok views count toward Creator Rewards?',
    answer:
      'Do not assume purchased views qualify for Creator Rewards. Public view counts and qualified monetization views can follow different rules and eligibility requirements.',
  },
  {
    id: 'ca-tt-v-business',
    question: 'Can Canadian businesses buy TikTok views?',
    answer:
      'Eligible public videos from Canadian businesses, creators, brands and other supported TikTok accounts can use NovaLikes Views packages.',
  },
  {
    id: 'ca-tt-v-older-video',
    question: 'Can I buy views for an older TikTok?',
    answer:
      'If the video remains eligible and publicly accessible, it may be suitable for an order. Check the direct URL and current package requirements first.',
  },
  {
    id: 'ca-tt-v-safe',
    question: 'Is buying TikTok views completely safe?',
    answer:
      'No third-party engagement provider should promise zero platform-policy risk. TikTok\'s current rules prohibit artificially increasing engagement and engagement manipulation.',
  },
  {
    id: 'ca-tt-v-track',
    question: 'Can I track my TikTok Views order?',
    answer:
      'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-tt-v-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caTtViewsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada TikTok Views content.');
