/**
 * Apply supplied Canada TikTok Likes copy to content/markets/ca/services/buy-tiktok-likes.json
 * Run: npx tsx scripts/patch-ca-tiktok-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-tiktok-likes.json');
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
  title: 'Buy TikTok Likes Canada | Likes for Your Videos | NovaLikes',
  description:
    'Buy TikTok likes in Canada for public videos. Choose flexible like packages, submit your video link, order without a password, and track your purchase online.',
};

hero.eyebrow = 'TIKTOK SERVICES FOR CANADA';
hero.title = 'Buy TikTok Likes in Canada and Strengthen Video Engagement';
hero.description =
  'Put more visible engagement behind the TikTok videos you want people to notice. NovaLikes lets Canadian creators, businesses, and brands buy TikTok likes for eligible public videos without sharing account login details. Choose the number of likes you want, submit the exact public TikTok video link, and complete your order online. Use a smaller package for an everyday video or choose a larger quantity when you\'re supporting an important launch, collaboration, campaign, product video, or piece of content that represents your profile well.';
hero.primaryCta = { label: 'Choose Your TikTok Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'tt-l-trust-public', label: 'Public Video Link Only' },
  { id: 'tt-l-trust-password', label: 'No Password Required' },
  { id: 'tt-l-trust-checkout', label: 'Secure Checkout' },
  { id: 'tt-l-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose the Likes Package That Fits Your Video';
pricing.description =
  'Every TikTok video has a different purpose and level of existing activity. NovaLikes currently offers 100, 250, 500, 1K, 3K, 5K, 10K and 15K likes. Instead of treating every video the same, choose the quantity based on the content you\'re supporting. A newer video may need only a modest increase, while a launch, collaboration, or established account may call for something larger. Review the current package prices before ordering and choose based on the video rather than automatically selecting the biggest option.';
pricing.primaryCtaLabel = 'Compare TikTok Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-tt-l-where-buy',
  'ca-tt-l-more-likes',
  'ca-tt-l-cheap',
  'ca-tt-l-real',
  'ca-tt-l-how-many',
  'ca-tt-l-any-video',
  'ca-tt-l-password',
  'ca-tt-l-cost',
  'ca-tt-l-delivery-time',
  'ca-tt-l-views',
  'ca-tt-l-followers',
  'ca-tt-l-fyp',
  'ca-tt-l-safe',
  'ca-tt-l-business',
  'ca-tt-l-older-video',
  'ca-tt-l-track',
];

related.title = 'Explore More TikTok Services';
related.description = 'Choose the TikTok service that matches the metric you want to change.';

finalCta.title = 'Put More Engagement Behind Your Best TikTok Videos';
finalCta.description =
  'Choose the video you want to support, select a TikTok Likes package that fits the content, and place your order using its public link without sharing your password. Then keep working on what matters beyond the number: videos people genuinely want to watch and interact with.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your TikTok Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-tiktok-likes-canada',
  title: 'Why Choose NovaLikes for TikTok Likes?',
  description:
    'A TikTok Likes order should be clear from the moment you choose a package.',
  items: [
    {
      id: 'tt-l-wc-video',
      title: 'Video-Specific Ordering',
      description:
        'Likes are applied to the eligible public TikTok video connected to the link you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-wc-packages',
      title: 'Flexible Package Sizes',
      description:
        'Choose the number of likes based on the individual video and budget you\'re working with.',
      icon: 'users',
    },
    {
      id: 'tt-l-wc-password',
      title: 'No TikTok Password',
      description:
        'NovaLikes does not require your account password, verification codes, or private login access.',
      icon: 'lock',
    },
    {
      id: 'tt-l-wc-pricing',
      title: 'Clear Pricing',
      description:
        'Check the likes quantity and current price before completing checkout.',
      icon: 'credit-card',
    },
    {
      id: 'tt-l-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use NovaLikes order tracking afterward for available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'tt-l-wc-support',
      title: 'Customer Support',
      description:
        'If you need help with an order, contact support with the relevant purchase information.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'get-tiktok-likes-without-login-canada',
  title: 'Get TikTok Likes Without Giving Up Your Account Login',
  description:
    'NovaLikes does not need control of your TikTok account to process a Likes order.',
  cards: [
    {
      id: 'tt-l-can-need',
      title: 'What You Need',
      description: 'The exact public TikTok video link and your selected likes quantity.',
      icon: 'users',
    },
    {
      id: 'tt-l-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your TikTok password, verification codes, access to private messages or account login credentials.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before placing the order, open the submitted link yourself and confirm that it leads directly to the correct video. Your TikTok profile URL is not the same as an individual video link.',
};

config.doesBuyingHelp = {
  id: 'what-real-tiktok-likes-mean-canada',
  title: 'What Do Providers Mean by "Real TikTok Likes"?',
  description:
    '"Real TikTok likes" is a common search phrase, but providers may use terms such as "real," "active," "organic," or "high-quality" differently. A buyer should look beyond the wording and ask what the service actually changes.',
  helpTitle: 'What NovaLikes TikTok Likes Packages Do',
  helpItems: [
    'Increase the visible like count on the eligible public TikTok video submitted with the order',
  ],
  limitTitle: 'They Should Not Be Confused With Guaranteed',
  limitItems: [
    'Organic engagement',
    'Additional video views',
    'Followers or comments',
    'For You Page reach, customers, sales or sponsorships',
  ],
  closingNote:
    'No third-party engagement service should promise zero platform-policy risk. TikTok publicly prohibits fake and artificially increased engagement. Understand what metric you\'re purchasing and continue building genuine content alongside any visible engagement package.',
};

config.whatHappens = {
  id: 'what-happens-after-tiktok-likes-order-canada',
  title: 'What Happens After You Place the Order?',
  description:
    'Once checkout is complete, your selected likes package and TikTok video link are connected to the purchase. The order is then processed for the video you submitted.',
  steps: [
    {
      id: 'tt-l-th-1',
      title: 'Package and Video Are Connected',
      description:
        'Your likes quantity and TikTok video link are associated with the purchase.',
    },
    {
      id: 'tt-l-th-2',
      title: 'Order Targets That Video',
      description: 'The likes are processed for the video connected to your submitted link.',
    },
    {
      id: 'tt-l-th-3',
      title: 'Keep the Video Public',
      description:
        'The selected video should remain publicly accessible where required.',
    },
    {
      id: 'tt-l-th-4',
      title: 'Track and Contact Support If Needed',
      description:
        'Use tracking for updates. If something needs attention, contact NovaLikes support with your order information.',
    },
  ],
  closingNote:
    'Do not delete the video or submit the wrong link while an active order depends on that content.',
};

config.serviceCompare = {
  id: 'tiktok-likes-views-followers-canada',
  title: 'TikTok Likes, Views or Followers: Choose by Goal',
  description: 'These are separate services and should not be treated as interchangeable.',
  current: {
    title: 'TikTok Likes',
    description: 'Increase the visible like count on a specific eligible video',
    bestFor: 'Video-level engagement',
    ctaLabel: 'TikTok Likes',
  },
  likes: {
    title: 'TikTok Views',
    description: 'Increase the displayed view count on an eligible TikTok video',
    bestFor: 'Video view count',
    href: caHref('/buy-tiktok-views'),
    ctaLabel: 'TikTok Views',
  },
  views: {
    title: 'TikTok Followers',
    description: 'Increase the follower count displayed on your public profile',
    bestFor: 'Profile follower count',
    href: caHref('/buy-tiktok-followers'),
    ctaLabel: 'TikTok Followers',
  },
  combinedNote:
    'Choose TikTok Likes when the like count on an individual video is your priority. Choose TikTok Views for visible video views, or TikTok Followers for profile-level follower count.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-tiktok-likes-canada',
  title: 'Before You Buy TikTok Likes',
  description: 'Review these details before checkout.',
  framingNote: '',
  items: [
    {
      id: 'tt-l-bb-video',
      title: 'Confirm the Video',
      description: 'Open the exact TikTok video you want to use.',
      icon: 'users',
    },
    {
      id: 'tt-l-bb-url',
      title: 'Copy the Direct Link',
      description: 'Submit the video URL rather than your general TikTok profile.',
      icon: 'sparkles',
    },
    {
      id: 'tt-l-bb-quantity',
      title: 'Check the Likes Quantity',
      description: 'Review the package size before ordering.',
      icon: 'credit-card',
    },
    {
      id: 'tt-l-bb-price',
      title: 'Confirm the Current Price',
      description:
        'Make sure the selected quantity and price match your intention.',
      icon: 'shield-check',
    },
    {
      id: 'tt-l-bb-available',
      title: 'Keep the Video Accessible',
      description:
        'Don\'t remove or restrict the submitted content while the order is being processed.',
      icon: 'lock',
    },
    {
      id: 'tt-l-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your TikTok login details.',
      icon: 'headphones',
    },
    {
      id: 'tt-l-bb-metric',
      title: 'Know the Difference Between Likes and Views',
      description: 'Choose the service based on the metric you actually want.',
      icon: 'megaphone',
    },
    {
      id: 'tt-l-bb-policies',
      title: 'Review the Policies',
      description:
        'Read the relevant purchase, service, and refund information before checkout.',
      icon: 'shield-check',
    },
  ],
};

config.worldwide = {
  id: 'likes-tiktok-reach-different-signals-canada',
  title: 'Likes and TikTok Reach Are Different Signals',
  description:
    'A visible like count and TikTok distribution should not be treated as the same thing. TikTok decides which videos to recommend using multiple signals and its own recommendation systems. Buying TikTok likes should therefore not be treated as a guaranteed way to reach the For You Page, make a video viral, increase organic views, generate followers, improve search visibility, produce sales or unlock monetization.',
  eyebrow: 'Engagement vs Distribution',
  closingNote:
    'A Likes package changes the visible like metric on the selected video. Your organic distribution still depends on TikTok\'s systems and genuine user behaviour.',
  cards: [
    {
      id: 'tt-l-ww-fyp',
      title: 'For You Page Reach',
      description: 'FYP distribution is separate from visible like count.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-ww-views',
      title: 'Organic Video Views',
      description: 'Likes and views are different TikTok metrics.',
      icon: 'heart',
    },
    {
      id: 'tt-l-ww-followers',
      title: 'Profile Followers',
      description: 'Followers apply to the account rather than one video.',
      icon: 'users',
    },
    {
      id: 'tt-l-ww-sales',
      title: 'Business Results',
      description:
        'Purchased likes should not be treated as guaranteed sales or monetization.',
      icon: 'briefcase',
    },
  ],
};

config.packageSizes = {
  id: 'which-tiktok-videos-worth-supporting-likes-canada',
  title: 'Which TikTok Videos Are Worth Supporting With More Likes?',
  description:
    'You don\'t need additional likes on everything you publish. A more focused strategy is to identify the videos that already have a reason to stand out. Start with the content. Then choose the package.',
  quantityColumnLabel: 'Video Type',
  recommendedColumnLabel: 'Why It May Fit',
  rows: [
    {
      id: 'tt-l-ps-demo',
      quantity: 'Product Demonstrations',
      recommendedFor:
        'If one video clearly shows what your product does, it may be more valuable than a general promotional clip.',
    },
    {
      id: 'tt-l-ps-collab',
      quantity: 'Creator Collaborations',
      recommendedFor:
        'Collaboration content can represent your work to potential new viewers, creators, or brands.',
    },
    {
      id: 'tt-l-ps-announcement',
      quantity: 'Important Announcements',
      recommendedFor:
        'A business launch, new service, event, offer, or milestone can have more long-term value than an everyday post.',
    },
    {
      id: 'tt-l-ps-educational',
      quantity: 'Educational Videos',
      recommendedFor:
        'Tutorials, explainers, and useful tips can continue representing your expertise after the original publishing date.',
    },
    {
      id: 'tt-l-ps-portfolio',
      quantity: 'Portfolio Content',
      recommendedFor:
        'Creators and service businesses can focus on videos that best demonstrate what they do.',
    },
    {
      id: 'tt-l-ps-organic',
      quantity: 'Videos Already Performing Well Organically',
      recommendedFor:
        'If a video is already receiving genuine interest, it may be more useful to support than content that does not connect with your audience at all.',
    },
  ],
  bottomNote: 'Compare likes package sizes and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-tiktok-likes-canada',
  title: 'Affordable TikTok Likes Without Choosing on Price Alone',
  description:
    'If you\'re comparing cheap TikTok likes in Canada, lower-cost packages may be useful when you only need a modest increase. But check more than the price. Before ordering, look at:',
  closingNote:
    'An affordable TikTok Likes package should be easy to understand before you complete checkout. NovaLikes gives you multiple quantities so you can choose based on the individual video and budget.',
  items: [
    {
      id: 'tt-l-bp-1',
      title: 'Likes Included',
      description: 'Check how many likes are included in the package.',
      icon: 'users',
    },
    {
      id: 'tt-l-bp-2',
      title: 'Supported Content',
      description: 'Confirm the service supports the video you want to use.',
      icon: 'clapperboard',
    },
    {
      id: 'tt-l-bp-3',
      title: 'Video Link Requirements',
      description: 'Know what public TikTok video URL you need to submit.',
      icon: 'sparkles',
    },
    {
      id: 'tt-l-bp-4',
      title: 'No Password Requirement',
      description: 'Your TikTok password should not be requested.',
      icon: 'lock',
    },
    {
      id: 'tt-l-bp-5',
      title: 'Current Package Price',
      description: 'Review pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'tt-l-bp-6',
      title: 'Order Tracking',
      description: 'Check whether order tracking is available.',
      icon: 'map-pin',
    },
    {
      id: 'tt-l-bp-7',
      title: 'Support and Policies',
      description: 'Review support options and relevant service policies.',
      icon: 'headphones',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-tiktok-likes-canada',
  title: 'Common Mistakes When Buying TikTok Likes',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-tiktok-views': {
      title: 'TikTok Views',
      description:
        'Choose Views when your goal is to increase the visible view count on an eligible TikTok video.',
      ctaLabel: 'Buy TikTok Views',
    },
    'buy-tiktok-followers': {
      title: 'TikTok Followers',
      description:
        'Choose Followers when you want to increase the follower count displayed on your public TikTok profile.',
      ctaLabel: 'Buy TikTok Followers',
    },
  },
};

dummy.whyBuy = {
  id: 'make-strong-content-look-active-canada',
  title: 'Make Strong Content Look More Active at First Glance',
  description:
    'Likes are one of the most visible interaction signals attached to a TikTok video. When someone sees your content, they may also notice the video topic, visible view count, like count, comments, creator profile, caption and overall content quality. Increasing the like count can strengthen one part of that presentation. But likes work best when the video itself gives viewers something worth watching. Before focusing on like count, know what you want the video to achieve — awareness, product demonstration, expertise, business promotion or creator profile building. Canadian creators and businesses may have specific videos that matter more than others, such as product releases, local launches, seasonal campaigns, creator partnerships, ecommerce promotions and portfolio pieces. Using likes selectively gives the metric a purpose instead of spreading it randomly across every post.',
  items: [
    {
      id: 'tt-l-wb-product',
      title: 'A New Product Release',
      description: 'Support the video that best demonstrates or introduces the product.',
    },
    {
      id: 'tt-l-wb-local',
      title: 'A Local Business Launch',
      description:
        'Use content that clearly explains what has opened, changed, or become available.',
    },
    {
      id: 'tt-l-wb-seasonal',
      title: 'A Seasonal Campaign',
      description: 'Choose the TikTok that carries the main campaign message.',
    },
    {
      id: 'tt-l-wb-partnership',
      title: 'A Creator Partnership',
      description:
        'Focus on the collaboration content most likely to represent the partnership afterward.',
    },
    {
      id: 'tt-l-wb-ecommerce',
      title: 'An Ecommerce Promotion',
      description: 'Use a video that shows the product rather than simply announcing a discount.',
    },
  ],
  bottomNote:
    'Think of TikTok Likes as a visible engagement metric around the content, not a substitute for good content.',
};

dummy.howToBuy = {
  id: 'how-tiktok-likes-order-works-canada',
  title: 'How Your TikTok Likes Order Works',
  description: 'The process is centred around the specific video you choose.',
  steps: [
    {
      id: 'tt-l-step-1',
      title: 'Select a Likes Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'tt-l-step-2',
      title: 'Copy the TikTok Video Link',
      description:
        'Open the exact public video where you want the likes applied and copy its direct URL.',
    },
    {
      id: 'tt-l-step-3',
      title: 'Submit the Video',
      description: 'Paste the link into the required order field.',
    },
    {
      id: 'tt-l-step-4',
      title: 'Check Everything Before Payment',
      description: 'Review the video link, likes quantity, and package price.',
    },
    {
      id: 'tt-l-step-5',
      title: 'Complete and Track Your Order',
      description:
        'Finish checkout and use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More TikTok Services';
dummy.relatedIntro = 'Choose the TikTok service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: How Can You Buy TikTok Likes in Canada?',
  text: 'You can buy TikTok likes in Canada through NovaLikes by selecting an available likes package, submitting the exact public TikTok video link, and completing checkout online. Your TikTok password is not required. The likes apply to the selected video\'s like count and do not automatically add followers or views.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-tiktok-likes'] = {
  title: 'Buy TikTok Likes Canada | Likes for Your Videos | NovaLikes',
  description:
    'Buy TikTok likes in Canada for public videos. Choose flexible like packages, submit your video link, order without a password, and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caTtLikesFaqs = [
  {
    id: 'ca-tt-l-where-buy',
    question: 'Where can I buy TikTok likes in Canada?',
    answer:
      'You can buy TikTok likes in Canada through NovaLikes for eligible public videos. Select an available likes package, provide the exact public TikTok video link, and complete checkout without sharing your TikTok password.',
  },
  {
    id: 'ca-tt-l-more-likes',
    question: 'How can I get more likes on TikTok?',
    answer:
      'NovaLikes TikTok Likes packages can increase the visible like count on an eligible public video. For organic engagement, continue improving your videos, testing content formats, and reviewing genuine audience behaviour through TikTok analytics.',
  },
  {
    id: 'ca-tt-l-cheap',
    question: 'Can I buy cheap TikTok likes in Canada?',
    answer:
      'NovaLikes offers multiple likes quantities, allowing you to choose a package that fits your budget. When comparing cheaper options, also consider video requirements, password access, tracking, support, and what the package actually includes.',
  },
  {
    id: 'ca-tt-l-real',
    question: 'What are real TikTok likes?',
    answer:
      '"Real TikTok likes" can mean different things depending on the provider. Check exactly what a service promises rather than relying only on that label. NovaLikes Likes packages are designed to increase the visible like count on the submitted eligible video.',
  },
  {
    id: 'ca-tt-l-how-many',
    question: 'How many TikTok likes should I buy?',
    answer:
      'There is no single correct number. Consider your video\'s current activity, profile size, content purpose, and the visible increase you want before choosing from the available packages.',
  },
  {
    id: 'ca-tt-l-any-video',
    question: 'Can I buy likes for any TikTok video?',
    answer:
      'The video needs to meet the current service requirements and be publicly accessible. Submit the direct link to the exact video you want to use.',
  },
  {
    id: 'ca-tt-l-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password, verification codes, or private account access.',
  },
  {
    id: 'ca-tt-l-cost',
    question: 'How much does it cost to buy TikTok likes?',
    answer:
      'The price depends on the number of likes you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'ca-tt-l-delivery-time',
    question: 'How long does a TikTok Likes order take?',
    answer:
      'Processing time can vary based on package size and current order conditions. Use NovaLikes order tracking for available updates.',
  },
  {
    id: 'ca-tt-l-views',
    question: 'Will buying TikTok likes increase my views?',
    answer:
      'Not automatically. Likes and views are separate TikTok metrics. TikTok Views is a separate NovaLikes service.',
  },
  {
    id: 'ca-tt-l-followers',
    question: 'Will buying likes give me more followers?',
    answer:
      'Not automatically. TikTok Followers is a separate profile-level metric and service.',
  },
  {
    id: 'ca-tt-l-fyp',
    question: 'Will buying TikTok likes get my video on the FYP?',
    answer:
      'There is no guarantee. TikTok\'s recommendation systems use multiple signals. A purchased Likes package should not be treated as a guaranteed way to reach the For You Page.',
  },
  {
    id: 'ca-tt-l-safe',
    question: 'Is buying TikTok likes completely safe?',
    answer:
      'No third-party engagement service should promise zero platform-policy risk. TikTok publicly prohibits fake and artificially increased engagement, including selling followers or likes.',
  },
  {
    id: 'ca-tt-l-business',
    question: 'Can Canadian businesses buy TikTok likes?',
    answer:
      'Eligible public videos from creators, businesses, brands, and other supported TikTok accounts can use NovaLikes Likes packages.',
  },
  {
    id: 'ca-tt-l-older-video',
    question: 'Can I use TikTok likes on an older video?',
    answer:
      'If the video remains eligible and publicly accessible, it may be suitable for an order. Check the direct video link and current service requirements first.',
  },
  {
    id: 'ca-tt-l-track',
    question: 'Can I track my TikTok Likes order?',
    answer:
      'Yes. Use NovaLikes order tracking after checkout for available status information.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-tt-l-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caTtLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada TikTok Likes content.');
