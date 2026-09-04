/**
 * Apply supplied Canada Instagram Views copy to content/markets/ca/services/buy-instagram-views.json
 * Run: npx tsx scripts/patch-ca-ig-views.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-instagram-views.json');
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
  title: 'Buy Instagram Views Canada | Views for Reels & Videos',
  description:
    'Buy Instagram views in Canada for public Reels and videos. Choose flexible view packages, order without sharing your password, and track your order online.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR CANADA';
hero.title = 'Buy Instagram Views in Canada for Reels & Videos';
hero.description =
  'Put more visible attention behind the Instagram videos that matter to you. NovaLikes lets Canadian creators, businesses and brands buy Instagram views for eligible public Reels and videos without sharing Instagram login details. Choose the number of views you want, paste the exact public content URL, and place your order online. Use a smaller package for an individual Reel or scale up when you\'re supporting a launch, campaign, portfolio piece, or video you want to feature more prominently on your profile.';
hero.primaryCta = { label: 'Choose Your Views Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-v-trust-public', label: 'Public Video URL Only' },
  { id: 'ig-v-trust-password', label: 'No Password Required' },
  { id: 'ig-v-trust-checkout', label: 'Secure Checkout' },
  { id: 'ig-v-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose the View Count That Fits Your Video';
pricing.description =
  'Different videos have different roles. A quick update may not need the same package as a product launch, branded Reel or important piece of creator content. NovaLikes currently offers 100, 500, 1K, 2K, 3K, 5K, 10K and 25K views. Instead of automatically choosing the largest option, look at the Reel you\'re working with and decide how much visible activity you want to add.';
pricing.primaryCtaLabel = 'Compare Views Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-ig-v-where-buy',
  'ca-ig-v-more-reel-views',
  'ca-ig-v-cheap',
  'ca-ig-v-real',
  'ca-ig-v-reels',
  'ca-ig-v-password',
  'ca-ig-v-how-many',
  'ca-ig-v-cost',
  'ca-ig-v-delivery-time',
  'ca-ig-v-followers',
  'ca-ig-v-likes',
  'ca-ig-v-business',
  'ca-ig-v-older-reel',
  'ca-ig-v-track',
];

related.title = 'Explore Instagram Services Around Your Goal';
related.description = 'Choose the service that matches the Instagram metric you want to change.';

finalCta.title = 'Put More Views Behind the Videos That Matter';
finalCta.description =
  'Choose the Reel or video you want to support, select a view quantity that fits the content, and place your order using the direct public URL.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Views Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-views-canada',
  title: 'Why Use NovaLikes for Instagram Views?',
  description:
    'The ordering experience should be clear before you spend anything.',
  items: [
    {
      id: 'ig-v-wc-video',
      title: 'Designed for Individual Videos',
      description:
        'Instagram Views are delivered to the eligible public Reel or video URL included with your order.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-v-wc-packages',
      title: 'Multiple View Quantities',
      description:
        'Choose a modest increase or a larger package depending on the video you\'re working with.',
      icon: 'users',
    },
    {
      id: 'ig-v-wc-password',
      title: 'No Account Login Needed',
      description: 'Your Instagram password and verification codes stay private.',
      icon: 'lock',
    },
    {
      id: 'ig-v-wc-pricing',
      title: 'Pricing Before You Order',
      description:
        'See the available quantity and current price before completing your purchase.',
      icon: 'credit-card',
    },
    {
      id: 'ig-v-wc-tracking',
      title: 'Track the Order Afterwards',
      description:
        'Use NovaLikes order tracking for available status updates after checkout.',
      icon: 'map-pin',
    },
    {
      id: 'ig-v-wc-support',
      title: 'Help When Something Needs Checking',
      description:
        'If you have a question about an order, NovaLikes support can review it using the relevant order information.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'get-instagram-views-without-login-canada',
  title: 'Order Instagram Views With a Public Video URL Only',
  description:
    'You do not need to share your Instagram password or account login access to place a Views order. NovaLikes uses the direct public URL of the Reel or video you submit.',
  cards: [
    {
      id: 'ig-v-can-need',
      title: 'What You Need',
      description: 'The exact public URL of the Instagram Reel or video.',
      icon: 'users',
    },
    {
      id: 'ig-v-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your Instagram password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Open the link once before submitting it to make sure it points to the exact content you want to use.',
};

config.doesBuyingHelp = {
  id: 'what-real-instagram-views-mean-canada',
  title: '"Real Instagram Views" Can Mean Different Things',
  description:
    'People often search for real Instagram views, high-quality views or similar terms when comparing providers. Those labels are not always used consistently. A better approach is to understand exactly what the service changes and what it does not promise.',
  helpTitle: 'What NovaLikes Instagram Views Packages Do',
  helpItems: [
    'Increase the view count displayed on an eligible public Reel or video submitted with the order',
  ],
  limitTitle: 'A Views Package Does Not Automatically Include',
  limitItems: [
    'Instagram followers',
    'Likes',
    'Comments',
    'Guaranteed organic reach',
    'Guaranteed watch time, customers, sales or brand partnerships',
  ],
  closingNote:
    'If one of those is your actual goal, evaluate it separately rather than assuming a larger view count guarantees the result.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-views-order-canada',
  title: 'What Happens Once Your Order Is Placed?',
  description:
    'Your order is tied to the Views package you selected and the Instagram content URL you submitted. NovaLikes uses those details to process the order for the intended Reel or video.',
  steps: [
    {
      id: 'ig-v-th-1',
      title: 'Package and URL Are Connected',
      description:
        'The selected Views package and submitted content URL are associated with your order.',
    },
    {
      id: 'ig-v-th-2',
      title: 'Processing Targets That Video',
      description: 'The order is processed for the Reel or video connected to your submitted URL.',
    },
    {
      id: 'ig-v-th-3',
      title: 'Processing Time Can Vary',
      description:
        'Processing time can vary by package size and current order conditions.',
    },
    {
      id: 'ig-v-th-4',
      title: 'Track Available Updates',
      description:
        'Use the order tracking option for available updates rather than assuming one fixed timeline.',
    },
  ],
  closingNote:
    'Keep the submitted content publicly accessible where required while processing is active. Avoid deleting the Reel, restricting access to it or replacing the submitted link while an order depends on that content.',
};

config.serviceCompare = {
  id: 'instagram-views-likes-followers-which-need-canada',
  title: 'Instagram Views vs Likes vs Followers',
  description: 'The right service depends on what you\'re trying to change.',
  current: {
    title: 'Instagram Views',
    description: 'Visible view count on an eligible Reel or video',
    bestFor: 'Video attention on a specific Reel',
    ctaLabel: 'Instagram Views',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Like count on an eligible post or Reel',
    bestFor: 'Visible post engagement',
    href: caHref('/buy-instagram-likes'),
    ctaLabel: 'Instagram Likes',
  },
  views: {
    title: 'Instagram Followers',
    description: 'Follower count on your public profile',
    bestFor: 'Overall profile audience size',
    href: caHref('/buy-instagram-followers'),
    ctaLabel: 'Instagram Followers',
  },
  combinedNote:
    'Use Instagram Views when video attention is the priority. Choose Likes for visible post engagement, Followers for your overall profile, or Instagram Comments when visible conversation is the goal.',
  commentsHref: caHref('/buy-instagram-comments'),
};

config.beforeBuying = {
  id: 'before-you-place-instagram-views-order-canada',
  title: 'Before You Place a Views Order',
  description: 'Check these details first.',
  framingNote:
    'Use the exact content link, keep the video publicly accessible, and review the package before payment.',
  items: [
    {
      id: 'ig-v-bb-open',
      title: 'Open the Reel or Video',
      description: 'Make sure you\'re working with the exact content you want to use.',
      icon: 'users',
    },
    {
      id: 'ig-v-bb-url',
      title: 'Copy the Direct Public URL',
      description:
        'Don\'t submit your general profile link when the service requires an individual video.',
      icon: 'sparkles',
    },
    {
      id: 'ig-v-bb-quantity',
      title: 'Check the View Quantity',
      description: 'Review the package before adding it to your order.',
      icon: 'credit-card',
    },
    {
      id: 'ig-v-bb-price',
      title: 'Confirm the Price',
      description:
        'Make sure the current package price matches the option you intended to choose.',
      icon: 'shield-check',
    },
    {
      id: 'ig-v-bb-available',
      title: 'Keep the Content Available',
      description:
        'Do not remove or restrict the submitted video while an active order requires access to it.',
      icon: 'lock',
    },
    {
      id: 'ig-v-bb-password',
      title: 'Keep Your Password Private',
      description: 'Your Instagram password and verification codes are not required.',
      icon: 'headphones',
    },
    {
      id: 'ig-v-bb-policies',
      title: 'Review Relevant Policies',
      description: 'Read the applicable service terms and refund information before checkout.',
      icon: 'megaphone',
    },
  ],
};

config.worldwide = {
  id: 'instagram-views-performance-metrics-canada',
  title: 'Don\'t Let View Count Be Your Only Performance Metric',
  description:
    'Purchased views and organic video performance should not be treated as the same thing. When evaluating how your own content is performing, use the analytics available to your Instagram account.',
  eyebrow: 'Measure What Matters',
  closingNote:
    'Purchased views can change a visible metric. Use your genuine Instagram performance data to make content decisions.',
  cards: [
    {
      id: 'ig-v-ww-reach',
      title: 'Reach',
      description:
        'How many accounts your content reaches organically can tell you something different from the displayed view number.',
      icon: 'users',
    },
    {
      id: 'ig-v-ww-interactions',
      title: 'Interactions',
      description:
        'Likes, comments, saves and shares can provide more context about how people respond to the content.',
      icon: 'heart',
    },
    {
      id: 'ig-v-ww-profile',
      title: 'Profile Activity',
      description:
        'If viewers move from a Reel to your profile, profile activity can help you understand what happens beyond the video itself.',
      icon: 'briefcase',
    },
    {
      id: 'ig-v-ww-patterns',
      title: 'Your Own Content Patterns',
      description:
        'Compare topics, hooks, formats and publishing decisions across multiple Reels rather than judging your entire strategy by one post.',
      icon: 'clapperboard',
    },
  ],
};

config.packageSizes = {
  id: 'which-reel-should-you-put-views-behind-canada',
  title: 'Which Reel Should You Put More Views Behind?',
  description:
    'You don\'t have to treat every video on your Instagram profile equally. If you\'re deciding where to use an Instagram Views package, start with content that has a clear purpose. Choose the content first. Then choose the views package.',
  quantityColumnLabel: 'Content Type',
  recommendedColumnLabel: 'Why It May Fit',
  rows: [
    {
      id: 'ig-v-ps-brand',
      quantity: 'A Strong Introduction to Your Brand',
      recommendedFor:
        'A Reel that quickly explains who you are or what your business does can remain useful when new visitors explore your profile.',
    },
    {
      id: 'ig-v-ps-launch',
      quantity: 'A Product or Service Launch',
      recommendedFor:
        'Use the video that communicates the launch most clearly rather than spreading attention across unrelated content.',
    },
    {
      id: 'ig-v-ps-portfolio',
      quantity: 'Your Best Portfolio Work',
      recommendedFor:
        'Creators, designers, photographers and service businesses may have individual Reels that represent the quality of their work better than the rest of the feed.',
    },
    {
      id: 'ig-v-ps-campaign',
      quantity: 'A Campaign You Want People to Notice',
      recommendedFor:
        'If one Reel is the centre of a promotion or campaign, it may make more sense to focus there.',
    },
    {
      id: 'ig-v-ps-evergreen',
      quantity: 'Evergreen Video Content',
      recommendedFor:
        'A useful tutorial, demonstration, or brand story can continue representing your account after its original publishing date.',
    },
  ],
  bottomNote: 'Compare view package sizes and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-instagram-views-canada',
  title: 'Looking for Affordable Instagram Views?',
  description:
    'Lower-priced packages can make sense when you only want to add a modest number of views to one piece of content. But when comparing cheap Instagram views in Canada, don\'t look at price in isolation. Before ordering, check:',
  closingNote:
    'An affordable Instagram Views service should make these basics clear before checkout. NovaLikes lets you compare package sizes first and decide based on the video and budget you\'re working with.',
  items: [
    {
      id: 'ig-v-bp-1',
      title: 'Number of Views Included',
      description: 'Check how many views are included in the package.',
      icon: 'users',
    },
    {
      id: 'ig-v-bp-2',
      title: 'Supported Content Type',
      description: 'Confirm whether the service supports the Reel or video you want to use.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-v-bp-3',
      title: 'Required Submission Details',
      description: 'Know what public video URL you need to submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-v-bp-4',
      title: 'No Login Access Required',
      description: 'Your Instagram password should not be required.',
      icon: 'lock',
    },
    {
      id: 'ig-v-bp-5',
      title: 'Upfront Package Pricing',
      description: 'Package pricing should be shown before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-v-bp-6',
      title: 'Order Tracking',
      description: 'Check whether order tracking exists after purchase.',
      icon: 'map-pin',
    },
    {
      id: 'ig-v-bp-7',
      title: 'Support and Policies',
      description: 'Support and policies should be easy to find before you pay.',
      icon: 'headphones',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-views-canada',
  title: 'Common Mistakes When Buying Instagram Views',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-instagram-likes': {
      title: 'Instagram Likes',
      description:
        'Use Likes when you want to increase visible engagement on a specific public post or Reel.',
      ctaLabel: 'Buy Instagram Likes',
    },
    'buy-instagram-followers': {
      title: 'Instagram Followers',
      description:
        'Use Followers when your goal is to increase the follower count displayed on your public profile.',
      ctaLabel: 'Buy Instagram Followers',
    },
    'buy-instagram-comments': {
      title: 'Instagram Comments',
      description: 'Use Comments when you want visible conversation on eligible Instagram content.',
      ctaLabel: 'Buy Instagram Comments',
    },
  },
};

dummy.whyBuy = {
  id: 'give-important-video-content-stronger-start-canada',
  title: 'Give Important Video Content a Stronger Visible Start',
  description:
    'View count is one of the most obvious numbers attached to Instagram video content. When someone lands on a Reel, they may also notice the account behind it, the quality of the video, caption, likes, comments and other visible activity. An Instagram Views package lets you work specifically on the displayed view count of the video you choose. That can make it useful when you\'re preparing a new product Reel, service demonstration, event announcement, creator collaboration, portfolio video, promotional campaign, brand introduction or educational Reel. Views are one part of the presentation. The content still needs to give genuine viewers a reason to keep watching, visit your profile or interact. A larger number beside a Reel cannot fix a video that gives people nothing useful to watch. Make the opening easy to understand, show something worth staying for, use captions to add context, keep your profile connected to the video, and continue publishing. Purchased views change the visible view count. Your real content strategy still depends on what you create and how people genuinely respond to it.',
  items: [
    {
      id: 'ig-v-wb-launch',
      title: 'A Local Launch',
      description:
        'A Reel introducing a new product, service or opening.',
    },
    {
      id: 'ig-v-wb-seasonal',
      title: 'A Seasonal Promotion',
      description: 'Video content connected to a limited campaign or offer.',
    },
    {
      id: 'ig-v-wb-partnership',
      title: 'A Creator Partnership',
      description:
        'A collaboration that you want to feature prominently in your content library.',
    },
    {
      id: 'ig-v-wb-ecommerce',
      title: 'An Ecommerce Release',
      description: 'A demonstration, product reveal or short promotional video.',
    },
    {
      id: 'ig-v-wb-event',
      title: 'An Event or Announcement',
      description:
        'A Reel that communicates information you want profile visitors to notice.',
    },
  ],
  bottomNote:
    'In each case, a Views package can increase the visible view count on that selected video. It does not guarantee that Instagram will distribute the content further, and it does not guarantee sales, followers or organic engagement. Use the service for the metric it actually changes.',
};

dummy.howToBuy = {
  id: 'how-to-buy-instagram-views-canada',
  title: 'How to Buy Instagram Views',
  description: 'You only need to make a few decisions before ordering.',
  steps: [
    {
      id: 'ig-v-step-1',
      title: 'Pick the Video First',
      description: 'Open the exact Instagram Reel or video you want to use.',
    },
    {
      id: 'ig-v-step-2',
      title: 'Choose Your View Quantity',
      description: 'Compare the available packages and select the number of views that fits the content.',
    },
    {
      id: 'ig-v-step-3',
      title: 'Paste the Public Video URL',
      description: 'Use the direct Reel or video link rather than a general Instagram profile URL.',
    },
    {
      id: 'ig-v-step-4',
      title: 'Review and Checkout',
      description:
        'Confirm the video, package quantity and current price before completing the purchase.',
    },
    {
      id: 'ig-v-step-5',
      title: 'Follow the Order',
      description:
        'Use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore Instagram Services Around Your Goal';
dummy.relatedIntro = 'Choose the service that matches the Instagram metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: How Can You Buy Instagram Views in Canada?',
  text: 'Choose an Instagram Views package on NovaLikes, provide the public URL of the Reel or video you want to use, and complete checkout online. Your Instagram password is not required. The purchased views apply to that specific video rather than your profile follower count, likes or comments.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-views'] = {
  title: 'Buy Instagram Views Canada | Views for Reels & Videos',
  description:
    'Buy Instagram views in Canada for public Reels and videos. Choose flexible view packages, order without sharing your password, and track your order online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caIgViewsFaqs = [
  {
    id: 'ca-ig-v-where-buy',
    question: 'Where can I buy Instagram views in Canada?',
    answer:
      'You can buy Instagram views in Canada through NovaLikes for eligible public Reels and videos. Choose a views package, submit the exact public content URL and complete checkout without providing your Instagram password.',
  },
  {
    id: 'ca-ig-v-more-reel-views',
    question: 'How do I get more views on an Instagram Reel?',
    answer:
      'If you want to increase the visible view count on an eligible public Reel, you can choose an Instagram Views package from NovaLikes. For organic growth, continue improving the Reel itself, publishing consistently and reviewing your genuine Instagram performance data.',
  },
  {
    id: 'ca-ig-v-cheap',
    question: 'Can I buy cheap Instagram views in Canada?',
    answer:
      'NovaLikes offers multiple view quantities, including smaller packages for users who do not need a large order. Compare the current price, quantity, account requirements, tracking and service details rather than choosing on price alone.',
  },
  {
    id: 'ca-ig-v-real',
    question: 'What are real Instagram views?',
    answer:
      'The term "real Instagram views" is used differently across providers. Review what a service actually promises instead of relying on the label. NovaLikes Views packages are designed to increase the visible view count on eligible submitted content.',
  },
  {
    id: 'ca-ig-v-reels',
    question: 'Can I buy views for Instagram Reels?',
    answer:
      'Yes. Eligible public Instagram Reels can be used for an Instagram Views order by submitting the correct direct public URL.',
  },
  {
    id: 'ca-ig-v-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification code or private login access for an Instagram Views order.',
  },
  {
    id: 'ca-ig-v-how-many',
    question: 'How many Instagram views should I buy?',
    answer:
      'Choose based on the individual video, its current visible view count and the increase you want. NovaLikes offers packages ranging from smaller quantities to larger view options, so there is no need to use the same package for every Reel.',
  },
  {
    id: 'ca-ig-v-cost',
    question: 'How much do Instagram views cost?',
    answer:
      'The price depends on the number of views you choose. Check the current NovaLikes package pricing before checkout.',
  },
  {
    id: 'ca-ig-v-delivery-time',
    question: 'How long does it take to get Instagram views?',
    answer:
      'Processing time can vary based on the package size and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'ca-ig-v-followers',
    question: 'Will buying Instagram views increase my followers?',
    answer:
      'Not automatically. Views and followers are separate Instagram metrics. A Views package applies to the submitted Reel or video rather than your overall follower count.',
  },
  {
    id: 'ca-ig-v-likes',
    question: 'Will buying views also add likes?',
    answer:
      'No automatic increase in likes should be expected. Instagram Likes are a separate service for eligible posts and Reels.',
  },
  {
    id: 'ca-ig-v-business',
    question: 'Can Canadian businesses use Instagram Views packages?',
    answer:
      'Yes. Eligible public Reels and videos from business, creator, brand and other supported Instagram profiles can use a Views package.',
  },
  {
    id: 'ca-ig-v-older-reel',
    question: 'Can I use views on an older Reel?',
    answer:
      'If the content remains eligible and publicly accessible, it may be suitable for an order. Check the direct URL and service requirements before purchasing.',
  },
  {
    id: 'ca-ig-v-track',
    question: 'Can I track my order?',
    answer:
      'Yes. NovaLikes provides an order tracking option that can be used for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-ig-v-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caIgViewsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada Instagram Views content.');
