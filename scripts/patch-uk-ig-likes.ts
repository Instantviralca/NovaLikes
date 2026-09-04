/**
 * Apply supplied United Kingdom Instagram Likes copy.
 * Run: npx tsx scripts/patch-uk-ig-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-instagram-likes.json');
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
  title: 'Buy Instagram Likes UK | Likes for Posts & Reels | NovaLikes',
  description:
    'Buy Instagram likes in the UK for public posts and Reels. Compare flexible packages, order without sharing your password and track your purchase online.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR THE UK';
hero.title = 'Buy Instagram Likes in the UK and Strengthen Post Engagement';
hero.description =
  "Put more visible engagement behind the Instagram posts and Reels that matter most. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to buy Instagram Likes without sharing account login details. Choose the number of Likes you want, submit the exact public post or Reel URL and complete your order online. Whether you're supporting a product launch, creator collaboration, campaign Reel, portfolio post or important business update, choose a Likes package around the content you're actually trying to strengthen.";
hero.primaryCta = { label: 'Choose Your Instagram Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-l-trust-public', label: 'Public Post or Reel URL Only' },
  { id: 'ig-l-trust-password', label: 'No Password Required' },
  { id: 'ig-l-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-l-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose an Instagram Likes Package That Fits Your Content';
pricing.description =
  'Different posts serve different purposes. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 3K, 5K and 10K Likes. A regular post may only need a smaller increase. A campaign Reel, important product launch or strong portfolio piece may justify something larger. Before choosing, consider the current Like count, how important the content is, your profile size, the purpose of the post and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-ig-l-where-buy',
  'uk-ig-l-get-more',
  'uk-ig-l-cheap',
  'uk-ig-l-real',
  'uk-ig-l-how-many',
  'uk-ig-l-reels',
  'uk-ig-l-password',
  'uk-ig-l-info',
  'uk-ig-l-cost',
  'uk-ig-l-delivery',
  'uk-ig-l-followers',
  'uk-ig-l-reel-views',
  'uk-ig-l-organic-reach',
  'uk-ig-l-viral',
  'uk-ig-l-business',
  'uk-ig-l-local',
  'uk-ig-l-older-post',
  'uk-ig-l-client',
  'uk-ig-l-wrong-url',
  'uk-ig-l-track',
];

related.title = 'Explore More Instagram Services';
related.description =
  'Choose Followers for your profile, Views for eligible Reels or videos, or Comments for visible conversation around selected content.';

finalCta.title = 'Put More Engagement Behind the Instagram Content That Matters';
finalCta.description =
  'Choose the post or Reel you want to support, select an Instagram Likes package that fits the content and submit the correct public URL without sharing your login details. Then keep strengthening what the Like count cannot replace: useful content, genuine audience interaction, real experience and an Instagram presence people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-likes-uk',
  title: 'Why Choose NovaLikes for Instagram Likes?',
  description: 'Buying Instagram Likes should be easy to understand before checkout.',
  items: [
    {
      id: 'ig-l-wc-targeting',
      title: 'Likes for Specific Posts and Reels',
      description: 'Your order applies to the eligible public content connected to the URL you submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-wc-packages',
      title: 'Flexible Like Quantities',
      description: 'Choose from smaller and larger packages depending on the individual post or Reel.',
      icon: 'users',
    },
    {
      id: 'ig-l-wc-password',
      title: 'No Instagram Password Required',
      description: 'NovaLikes does not need your Instagram password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'ig-l-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the Likes quantity and current package price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'ig-l-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'ig-l-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterwards for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'ig-l-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-instagram-likes-without-login-uk',
  title: 'Buy Instagram Likes Without Sharing Your Login',
  description:
    'An Instagram Likes order should not require control of your account. NovaLikes uses the public content information required for the service.',
  cards: [
    {
      id: 'ig-l-can-need',
      title: 'What You Need',
      description: 'The exact public URL of the Instagram post or Reel and your selected Likes package.',
      icon: 'users',
    },
    {
      id: 'ig-l-can-not-need',
      title: "What You Don't Need",
      description: 'Your Instagram password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the link yourself and make sure it points directly to the post or Reel you intend to support. A general Instagram profile URL is not the correct target for a Likes order.',
};

config.doesBuyingHelp = {
  id: 'real-instagram-likes-uk',
  title: 'Looking for “Real Instagram Likes”? Check the Service Behind the Label',
  description:
    '"Real Instagram Likes" is a common phrase people use when comparing engagement services. You may also see high-quality Instagram Likes, active Instagram Likes or organic Instagram Likes. Different providers may use these terms differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'How many Likes are included?',
    'Which post or Reel receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Instagram Likes Packages Do',
  limitItems: [
    'Increase the visible Like count on the eligible public content submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Followers, Views, reach, customers or sales. Clear expectations make services easier to compare realistically.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-likes-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Likes package and submitted Instagram content URL are connected to the purchase. The order is then processed for that specific post or Reel.',
  steps: [
    {
      id: 'ig-l-th-1',
      title: 'Keep the Content Public',
      description:
        'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'ig-l-th-2',
      title: 'Do Not Delete It During Processing',
      description: 'Removing the target post or Reel may interfere with an active order.',
    },
    {
      id: 'ig-l-th-3',
      title: 'Check the URL Carefully',
      description: 'Make sure your order points to the exact content you intended to use.',
    },
    {
      id: 'ig-l-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'likes-followers-views-comments-uk',
  title: 'Likes, Followers, Views or Comments: Choose by Goal',
  description: 'Different Instagram services affect different metrics.',
  current: {
    title: 'Instagram Likes',
    description: 'Like count displayed on an eligible public post or Reel',
    bestFor: 'Individual content',
    ctaLabel: 'Instagram Likes',
  },
  likes: {
    title: 'Instagram Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile audience size',
    href: ukHref('/buy-instagram-followers'),
    ctaLabel: 'Buy Instagram Followers',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count displayed on an eligible Reel or video',
    bestFor: 'Reels and videos',
    href: ukHref('/buy-instagram-views'),
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Likes for individual content. Choose Followers for profile audience size. Choose Views for Reels and videos. Choose Comments for visible conversation. One service does not automatically include the others.',
  commentsHref: ukHref('/buy-instagram-comments'),
};

config.beforeBuying = {
  id: 'before-you-buy-instagram-likes-uk',
  title: 'Before You Buy Instagram Likes in the UK',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'ig-l-bb-post',
      title: 'Confirm the Exact Post or Reel',
      description: 'Open the public content you want to support.',
      icon: 'users',
    },
    {
      id: 'ig-l-bb-url',
      title: 'Copy the Direct URL',
      description: 'Do not submit only your general Instagram profile link.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-bb-quantity',
      title: 'Check the Likes Quantity',
      description: "Make sure you're selecting the number of Likes you actually want.",
      icon: 'users',
    },
    {
      id: 'ig-l-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package quantity and price before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-l-bb-public',
      title: 'Keep the Content Public',
      description: 'Avoid deleting or restricting the submitted content while processing requires access.',
      icon: 'shield-check',
    },
    {
      id: 'ig-l-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Instagram password.',
      icon: 'lock',
    },
    {
      id: 'ig-l-bb-service',
      title: 'Choose the Correct Instagram Service',
      description: 'Likes, Followers, Views and Comments are separate metrics.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-bb-policies',
      title: 'Review the Policies',
      description: 'Read the applicable service and refund information before completing your purchase.',
      icon: 'headphones',
    },
  ],
};

config.worldwide = {
  id: 'instagram-content-growth-framework-uk',
  title: 'A Practical Instagram Content Growth Framework for UK Accounts',
  description:
    'Likes can support selected content, but a stronger Instagram strategy needs more than one metric.',
  eyebrow: 'Instagram Growth',
  closingNote:
    'Visible engagement can support presentation. Long-term growth comes from content, positioning and genuine audience behaviour.',
  cards: [
    {
      id: 'ig-l-ww-direction',
      title: 'Define Your Content Direction',
      description: 'Make the creator niche, business or brand easy to understand.',
      icon: 'megaphone',
    },
    {
      id: 'ig-l-ww-priority',
      title: 'Identify Priority Content',
      description: 'Know which posts and Reels actually deserve more attention.',
      icon: 'heart',
    },
    {
      id: 'ig-l-ww-formats',
      title: 'Test Different Formats',
      description: 'Use photos, carousels, Reels and Stories according to what suits the idea.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-l-ww-insights',
      title: 'Review Genuine Analytics',
      description: 'Use Instagram Insights to understand actual audience behaviour.',
      icon: 'users',
    },
  ],
};

config.packageSizes = {
  id: 'choose-likes-package-uk',
  title: 'Choose an Instagram Likes Package That Fits Your Content',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 3K, 5K and 10K Likes. Consider the current Like count, how important the content is, your profile size, the purpose of the post and the increase you actually want.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'ig-l-ps-count',
      quantity: 'The Current Like Count',
      recommendedFor: 'Start with the visible engagement already shown on the post or Reel.',
    },
    {
      id: 'ig-l-ps-content',
      quantity: 'How Important the Content Is',
      recommendedFor:
        'A priority campaign may deserve more support than a routine update.',
    },
    {
      id: 'ig-l-ps-profile',
      quantity: 'Your Profile Size',
      recommendedFor:
        'The same Like quantity can look different on a newer account and an established brand profile.',
    },
    {
      id: 'ig-l-ps-purpose',
      quantity: 'The Purpose of the Post',
      recommendedFor:
        'Product content, educational posts, creator collaborations and business announcements all play different roles.',
    },
    {
      id: 'ig-l-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose based on the individual post rather than automatically selecting the largest package.',
    },
  ],
  bottomNote: 'Compare Instagram Likes Packages',
};

config.bestPractices = {
  id: 'affordable-instagram-likes-uk',
  title: 'Looking for Affordable Instagram Likes in the UK?',
  description:
    "If you're searching for cheap Instagram Likes in the UK, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Instagram Likes service should make these details clear before checkout. NovaLikes lets you compare the available quantities and current prices before choosing.',
  items: [
    { id: 'ig-l-bp-1', title: 'Number of Likes Included', description: 'Review how many Likes are in the package.', icon: 'users' },
    { id: 'ig-l-bp-2', title: 'Current Package Price', description: 'Check pricing before checkout.', icon: 'credit-card' },
    {
      id: 'ig-l-bp-3',
      title: 'Public Post or Reel Requirements',
      description: 'Confirm what public content URL is required.',
      icon: 'heart',
    },
    {
      id: 'ig-l-bp-4',
      title: 'Password Requirements',
      description: 'Confirm whether your Instagram password is requested.',
      icon: 'lock',
    },
    { id: 'ig-l-bp-5', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'ig-l-bp-6', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    {
      id: 'ig-l-bp-7',
      title: 'Relevant Service Policies',
      description: 'Review applicable service policies before paying.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-bp-8',
      title: 'What the Provider Actually Changes',
      description: 'Understand what the package actually changes.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-likes-uk',
  title: 'Common Mistakes When Buying Instagram Likes',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-instagram-followers': {
      title: 'Instagram Followers',
      description:
        'Choose Followers when you want to increase the follower count displayed on your public Instagram profile.',
      ctaLabel: 'Buy Instagram Followers',
    },
    'buy-instagram-views': {
      title: 'Instagram Views',
      description:
        'Choose Views when you want to increase the displayed View count on an eligible public Reel or video.',
      ctaLabel: 'Buy Instagram Views',
    },
    'buy-instagram-comments': {
      title: 'Instagram Comments',
      description:
        'Choose Comments when you want more visible conversation around eligible public content.',
      ctaLabel: 'Buy Instagram Comments',
    },
  },
};

dummy.whyBuy = {
  id: 'posts-worth-supporting-instagram-likes-uk',
  title: 'Which Instagram Posts Are Worth Supporting With More Likes?',
  description:
    "You do not need to add Likes to every post. A more focused approach is to identify the content that already has a clear purpose.",
  items: [
    {
      id: 'ig-l-wb-launches',
      title: 'Product Launches',
      description: 'Support the post or Reel that introduces or demonstrates the product most clearly.',
    },
    {
      id: 'ig-l-wb-collabs',
      title: 'Creator Collaborations',
      description: 'Put more visible engagement behind content that best represents the partnership.',
    },
    {
      id: 'ig-l-wb-announcements',
      title: 'Business Announcements',
      description:
        'A new service, location, offer or company milestone may deserve more attention than a routine update.',
    },
    {
      id: 'ig-l-wb-portfolio',
      title: 'Portfolio Content',
      description:
        'Photographers, designers, agencies, builders and other service businesses can focus on work they genuinely want potential customers to see.',
    },
    {
      id: 'ig-l-wb-campaign',
      title: 'Campaign Reels',
      description: 'Use Likes around the creative carrying the main message of a wider campaign.',
    },
    {
      id: 'ig-l-wb-educational',
      title: 'Educational Posts',
      description:
        'Guides, explanations and useful carousels can continue representing your account after publication.',
    },
    {
      id: 'ig-l-wb-evergreen',
      title: 'Evergreen Content',
      description:
        'Strong content that remains relevant may make more sense to support than something with a very short lifespan.',
    },
  ],
  bottomNote: 'Choose the post first. Then decide whether additional Likes fit its purpose.',
};

dummy.howToBuy = {
  id: 'how-instagram-likes-order-works-uk',
  title: 'How Your Instagram Likes Order Works',
  description:
    'Choose your content, compare packages, submit the direct public URL, review your order, complete checkout without your password and track the status afterwards.',
  steps: [
    {
      id: 'ig-l-step-1',
      title: 'Choose the Content',
      description: 'Start with the exact public Instagram post or Reel you want to support.',
    },
    {
      id: 'ig-l-step-2',
      title: 'Select Your Likes Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'ig-l-step-3',
      title: 'Submit the Direct URL',
      description: 'Paste the correct public post or Reel link.',
    },
    {
      id: 'ig-l-step-4',
      title: 'Review Your Order',
      description: 'Check the content URL, Likes quantity and current package price.',
    },
    {
      id: 'ig-l-step-5',
      title: 'Complete Checkout',
      description: 'Place your order without providing your Instagram password.',
    },
    {
      id: 'ig-l-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Instagram Services';
dummy.relatedIntro =
  'Choose Followers for your profile, Views for eligible Reels or videos, or Comments for visible conversation around selected content.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Likes in the UK?',
  text: 'You can buy Instagram Likes in the UK through NovaLikes for eligible public posts and Reels. Choose an available Likes package, submit the exact public Instagram content URL and complete checkout without sharing your password. The Likes apply to that specific post or Reel. They do not automatically increase your Instagram Followers, Views or Comments.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Creators, Businesses and Brands',
    lead: 'Instagram content can play a different role depending on the account behind it.',
    paragraphs: [
      'A creator in London may use Instagram around fashion, food, beauty, fitness, entertainment or education. An ecommerce brand in Manchester may rely on posts and Reels around new products and creator partnerships. A local business in Birmingham, Leeds, Liverpool, Glasgow, Bristol or another UK market may use Instagram to show services, projects and recent activity. An agency may manage several client campaigns with completely different content priorities.',
      'That means your Likes strategy should fit the post.',
    ],
    footer: 'Likes can support presentation. The content behind the number still needs a reason to exist.',
    items: [
      { title: 'Creators', body: 'Support the content that best represents your niche, style or expertise.' },
      {
        title: 'Ecommerce Brands',
        body: 'Focus on launches, product content and promotional creative customers may explore.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Likes around posts showing genuine services, locations, projects and business activity.',
      },
      {
        title: 'Agencies',
        body: 'Choose Like quantities according to individual client posts instead of applying one package everywhere.',
      },
      {
        title: 'Established Brands',
        body: 'Put more visible engagement behind priority content while continuing genuine publishing, paid campaigns and community activity.',
      },
    ],
  },
  {
    id: 'uk-campaign-moments',
    title: 'Put More Engagement Behind Important UK Campaign Moments',
    lead: 'Some Instagram posts matter more because of the campaign around them.',
    footer:
      'Visible Likes can support how campaign content appears. The campaign itself still needs strong creative, accurate information and a clear offer.',
    items: [
      {
        title: 'Black Friday',
        body: 'UK retailers and ecommerce brands may have priority Instagram content around Black Friday promotions.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use posts and Reels alongside email, paid media and ecommerce campaigns.',
      },
      {
        title: 'Boxing Day',
        body: 'Boxing Day sales can create another major promotional period for retailers and online brands.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Gift guides, festive products, restaurant offers, events and seasonal content may become higher-priority posts.',
      },
      {
        title: 'January Sales',
        body: 'Retail and ecommerce brands may continue promotional activity into January.',
      },
      {
        title: 'Product Launches',
        body: 'Support the content that best introduces or demonstrates the product.',
      },
      {
        title: 'Creator Partnerships',
        body: 'Put Likes behind the strongest collaboration content rather than unrelated posts.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses expanding into another town, city or region can highlight the post carrying the main announcement.',
      },
    ],
  },
  {
    id: 'strong-first-glance',
    title: 'Make Strong Content Look More Active at First Glance',
    lead: 'A visible Like count is one of several things someone may notice when viewing Instagram content. They may also see:',
    bullets: [
      'the photo or Reel',
      'caption',
      'Comments',
      'View count',
      'creator or business profile',
      'overall account activity',
    ],
    paragraphs: [
      'A larger Like count can support how active the content appears. But it cannot improve weak content by itself.',
      'Strong visuals matter. Clear information matters. Good creative matters. Relevant messaging matters.',
    ],
    footer: 'Likes can support presentation. The post gives people a reason to pay attention.',
  },
  {
    id: 'clear-purpose',
    title: 'Build Likes Around Content With a Clear Purpose',
    lead: 'Before putting more visible engagement behind a post, ask what the content is meant to do.',
    footer: 'A post with a clear purpose gives the Like count more context.',
    items: [
      { title: 'Awareness', body: 'Is the post introducing the creator, business, product or campaign?' },
      { title: 'Education', body: 'Does it explain something useful?' },
      { title: 'Proof', body: 'Does it show genuine work, expertise or products?' },
      { title: 'Promotion', body: 'Is there a clear offer or launch?' },
      { title: 'Conversation', body: 'Does the content naturally encourage discussion?' },
      { title: 'Conversion', body: 'Does an interested viewer know what to do next?' },
    ],
  },
  {
    id: 'content-worth-engaging',
    title: 'Use Likes Alongside Instagram Content Worth Engaging With',
    lead: 'If long-term Instagram growth matters, continue improving the actual content.',
    footer:
      'Purchased Likes change one visible metric. Your genuine audience behaviour should guide what you publish next.',
    items: [
      { title: 'Create Reels With a Clear Idea', body: 'Teach, demonstrate, entertain, explain or tell a relevant story.' },
      { title: 'Build Useful Carousels', body: 'Use multi-slide posts when a topic benefits from more depth.' },
      { title: 'Use Clear Captions', body: 'Help people understand the context behind the content.' },
      {
        title: 'Keep Your Visual Identity Consistent',
        body: 'Make the post feel connected to the creator, business or brand behind it.',
      },
      { title: 'Respond to Genuine People', body: 'Real comments and questions deserve genuine replies.' },
      {
        title: 'Review Instagram Insights',
        body: 'Use your own account data to understand which content genuinely earns attention.',
      },
    ],
  },
  {
    id: 'organic-reach',
    title: 'Instagram Likes and Organic Reach Are Not the Same Thing',
    lead: 'A visible Like count and Instagram\'s organic distribution are separate outcomes. Buying Instagram Likes should not be treated as a guaranteed way to:',
    bullets: [
      'reach Explore',
      'make a Reel viral',
      'gain organic Followers',
      'increase Views',
      'generate Comments',
      'increase future reach',
      'drive website traffic',
      'secure brand partnerships',
      'generate customers',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes Instagram Likes packages are designed around the visible Like count on the selected eligible content.',
      'Organic reach and genuine audience response remain separate. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'likes-vs-views',
    title: 'Likes and Views Tell You Different Things',
    lead: 'Likes and Views are both content-level metrics, but they are not interchangeable.',
    footer:
      'When evaluating genuine performance, look beyond both public numbers. Consider how real viewers actually respond to the content.',
    items: [
      { title: 'Instagram Likes', body: 'Likes show visible interaction on an eligible post or Reel.' },
      { title: 'Instagram Views', body: 'Views relate to eligible video and Reel content.' },
      {
        title: 'Different Outcomes',
        body: 'A Reel can have many Views without the same number of Likes. A post can have Likes without being video content.',
      },
    ],
  },
  {
    id: 'measure-quality',
    title: 'Do Not Measure Content Quality by Likes Alone',
    lead: 'A visible Like count does not tell the complete story of how a post performed. For genuine performance, also consider:',
    footer: 'Purchased Likes change one visible number. Use genuine Instagram Insights and your own business data for wider decisions.',
    items: [
      { title: 'Saves', body: 'Are real users choosing to keep the content for later?' },
      { title: 'Shares', body: 'Are people sending it to others?' },
      { title: 'Genuine Comments', body: 'What are real viewers actually saying?' },
      { title: 'Profile Activity', body: 'Does the content encourage genuine users to explore your account?' },
      { title: 'Website Activity', body: 'For businesses, are people taking useful actions after seeing the content?' },
      { title: 'Enquiries or Sales', body: 'Did the campaign contribute to a real commercial outcome?' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Instagram Likes for UK Local Businesses',
    paragraphs: [
      'Instagram posts can help potential customers understand what a local business actually does.',
      'A restaurant may show a new dish. A builder may showcase a completed project. A salon may publish recent work. An estate agency may feature a property. A retailer may introduce new stock. A fitness studio may show a class or transformation. An interior designer may showcase a finished room. A tourism company may promote an experience. A professional service may explain a common customer question.',
      "If you're supporting this content with Likes, make sure the account behind it accurately represents the real business.",
    ],
    footer: 'Visible engagement can support presentation. Local trust comes from genuine business activity.',
  },
  {
    id: 'real-experience',
    title: 'Support Real Experience With Stronger Content Presentation',
    lead: 'Some of the strongest business and creator content comes from direct experience.',
    footer: 'Likes can strengthen the visible engagement around this content. Experience and expertise make the content worth exploring.',
    items: [
      { title: "Show Work You've Actually Done", body: 'Use real projects, portfolios and completed work.' },
      { title: 'Demonstrate Products You Actually Sell', body: 'Show how they look, work or fit into real situations.' },
      { title: 'Explain Processes You Understand', body: 'Use genuine expertise when answering useful questions.' },
      { title: 'Share Original Experience', body: 'Your own observations can add value that generic repeated advice cannot.' },
      { title: 'Answer Real Customer Questions', body: 'Turn common customer concerns into useful Instagram posts and Reels.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Likes Alongside Genuine Customer Proof',
    paragraphs: [
      'Likes can contribute to the visible activity around a post. They are not the same as customer evidence.',
      'For UK businesses, stronger trust can also come from verified customer reviews, authentic testimonials, case studies, completed projects, real customer comments, customer-created content, accurate company information and responsive customer service.',
      'If you have genuine proof, show it. Do not invent customer experiences simply to strengthen social proof.',
    ],
    footer: 'Likes can support presentation. Actual customer experience creates deeper credibility.',
  },
  {
    id: 'brand-partnerships',
    title: 'Put Instagram Likes in Context for Creator and Brand Partnerships',
    paragraphs: [
      'Creators may care about visible engagement when preparing for collaborations. But professional brands and agencies can look at much more than Like count.',
      'They may consider creator niche, content quality, genuine audience fit, authentic engagement, consistency, previous partnerships, communication, professionalism and campaign performance.',
      'If partnerships matter to you, strengthen the whole profile. Publish strong content. Make your niche clear. Keep genuine analytics available where appropriate.',
    ],
    footer: 'Treat Likes as one signal rather than proof of influence by themselves.',
  },
  {
    id: 'instagram-insights',
    title: 'Use Instagram Insights to Understand Genuine Post Performance',
    lead: 'Purchased Likes change one visible metric. Your Instagram Insights can provide more useful information about genuine audience behaviour. Depending on the data available to your account, review:',
    footer: 'Use real performance data to decide what you should create next. Do not rely only on a public Like count.',
    items: [
      { title: 'Reach', body: 'How many genuine accounts are discovering the content?' },
      { title: 'Genuine Interactions', body: 'What real actions are people choosing to take?' },
      { title: 'Saves and Shares', body: 'Which posts are useful or interesting enough for genuine users to keep or send?' },
      { title: 'Profile Activity', body: 'Does the content encourage people to explore your account?' },
      { title: 'Content Comparisons', body: 'Which topics and formats consistently perform better?' },
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical Instagram Content Growth Framework for UK Accounts',
    lead: 'Likes can support selected content, but a stronger Instagram strategy needs more than one metric.',
    items: [
      { title: 'Define Your Content Direction', body: 'Make the creator niche, business or brand easy to understand.' },
      { title: 'Identify Priority Content', body: 'Know which posts and Reels actually deserve more attention.' },
      { title: 'Test Different Formats', body: 'Use photos, carousels, Reels and Stories according to what suits the idea.' },
      { title: 'Review Genuine Analytics', body: 'Use Instagram Insights to understand actual audience behaviour.' },
      { title: 'Learn From Genuine Engagement', body: 'Real comments, shares and saves can reveal what people value.' },
      { title: 'Build the Profile Behind the Post', body: 'Make sure someone who visits your account finds more relevant content.' },
      {
        title: 'Connect Instagram to Wider Marketing',
        body: 'UK businesses may use Instagram alongside SEO, Google Ads, ecommerce, email, creator campaigns, local search and their website.',
      },
      {
        title: 'Keep Likes in Perspective',
        body: 'Visible engagement can support presentation. Long-term growth comes from content, positioning and genuine audience behaviour.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-likes'] = {
  title: 'Buy Instagram Likes UK | Likes for Posts & Reels | NovaLikes',
  description:
    'Buy Instagram likes in the UK for public posts and Reels. Compare flexible packages, order without sharing your password and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukIgLikesFaqs = [
  {
    id: 'uk-ig-l-where-buy',
    question: 'Where can I buy Instagram Likes in the UK?',
    answer:
      'You can buy Instagram Likes in the UK through NovaLikes for eligible public posts and Reels. Choose an available Likes package, submit the exact public content URL and complete checkout without sharing your password.',
  },
  {
    id: 'uk-ig-l-get-more',
    question: 'How can I get more Instagram Likes in the UK?',
    answer:
      'NovaLikes Likes packages can increase the visible Like count on eligible public posts and Reels. For organic engagement, continue improving your content and reviewing genuine audience behaviour through Instagram Insights.',
  },
  {
    id: 'uk-ig-l-cheap',
    question: 'Can I buy cheap Instagram Likes in the UK?',
    answer:
      'NovaLikes offers multiple Likes quantities so you can compare current package sizes and prices. When comparing lower-cost services, also review password requirements, tracking, support and what the package actually changes.',
  },
  {
    id: 'uk-ig-l-real',
    question: 'What are real Instagram Likes?',
    answer:
      '"Real Instagram Likes" may be defined differently by different providers. Review the actual service details rather than relying only on that phrase. NovaLikes Likes packages are designed to increase the visible Like count on eligible submitted content.',
  },
  {
    id: 'uk-ig-l-how-many',
    question: 'How many Instagram Likes should I buy?',
    answer:
      'There is no single ideal quantity for every post or Reel. Consider its existing engagement, profile size, content purpose and the visible increase you want before choosing.',
  },
  {
    id: 'uk-ig-l-reels',
    question: 'Can I buy Instagram Likes for Reels?',
    answer:
      'Yes. Eligible public Instagram Reels can use a Likes package when you submit the correct direct content URL.',
  },
  {
    id: 'uk-ig-l-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'uk-ig-l-info',
    question: 'What information do I need?',
    answer:
      'You need the direct public URL of the eligible Instagram post or Reel and the Likes package you want to purchase.',
  },
  {
    id: 'uk-ig-l-cost',
    question: 'How much does it cost to buy Instagram Likes in the UK?',
    answer: 'Pricing depends on the Likes quantity you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'uk-ig-l-delivery',
    question: 'How long does it take to get Instagram Likes?',
    answer:
      'Processing time can vary depending on package quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-ig-l-followers',
    question: 'Will buying Instagram Likes increase my Followers?',
    answer: 'Not automatically. Instagram Followers are a separate profile-level metric and service.',
  },
  {
    id: 'uk-ig-l-reel-views',
    question: 'Will buying Likes increase my Reel Views?',
    answer: 'Not automatically. Instagram Views are a separate content-level metric.',
  },
  {
    id: 'uk-ig-l-organic-reach',
    question: 'Will buying Instagram Likes increase organic reach?',
    answer:
      'There is no guarantee. A Likes package changes the visible Like count on the selected content. Organic distribution depends on separate factors.',
  },
  {
    id: 'uk-ig-l-viral',
    question: 'Will more Instagram Likes make my post viral?',
    answer:
      "There is no guarantee. Like count and Instagram's recommendation systems are separate things.",
  },
  {
    id: 'uk-ig-l-business',
    question: 'Can UK businesses buy Instagram Likes?',
    answer:
      'Eligible public Instagram posts and Reels used by UK businesses, creators, brands and agencies can use the relevant NovaLikes Likes packages.',
  },
  {
    id: 'uk-ig-l-local',
    question: 'Can local businesses use Instagram Likes packages?',
    answer:
      'Yes. Eligible public content from local-business profiles can use Likes packages. Use them around posts that accurately represent the real business.',
  },
  {
    id: 'uk-ig-l-older-post',
    question: 'Can I buy Likes for an older Instagram post?',
    answer:
      'If the post remains eligible and publicly accessible, it may be suitable for an order. Check the direct content URL and current service requirements first.',
  },
  {
    id: 'uk-ig-l-client',
    question: 'Can I order Instagram Likes for client content?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public post or Reel URL and review the order carefully.",
  },
  {
    id: 'uk-ig-l-wrong-url',
    question: 'What happens if I submit the wrong URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the exact content link before checkout.',
  },
  {
    id: 'uk-ig-l-track',
    question: 'Can I track my Instagram Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-ig-l-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukIgLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom Instagram Likes content from supplied copy.');
