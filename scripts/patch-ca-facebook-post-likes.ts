/**
 * Apply supplied Canada Facebook Post Likes copy to content/markets/ca/services/buy-facebook-post-likes.json
 * Run: npx tsx scripts/patch-ca-facebook-post-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-facebook-post-likes.json');
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
  title: 'Buy Facebook Post Likes Canada | Likes for Posts | NovaLikes',
  description:
    'Buy Facebook Post Likes in Canada for public posts. Choose flexible like packages, submit your post URL, order without a password, and track your purchase.',
};

hero.eyebrow = 'FACEBOOK SERVICES FOR CANADA';
hero.title = 'Buy Facebook Post Likes in Canada and Strengthen Post Engagement';
hero.description =
  'Put more visible engagement behind the Facebook posts that matter most to your business, brand, or campaign. NovaLikes lets Canadian businesses, creators, brands, and Page managers buy Facebook Post Likes for eligible public posts without sharing Facebook login details. Choose the number of likes you want, submit the exact public post URL, and complete your order online. Use Post Likes around a product launch, business announcement, event, promotion, project showcase, or other content you want to support instead of treating every Facebook post the same.';
hero.primaryCta = { label: 'Choose Your Facebook Post Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'fb-post-trust-url', label: 'Public Post URL Only' },
  { id: 'fb-post-trust-password', label: 'No Password Required' },
  { id: 'fb-post-trust-checkout', label: 'Secure Checkout' },
  { id: 'fb-post-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Post Likes Package Around the Content';
pricing.description =
  'Different Facebook posts have different purposes. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Post Likes. A routine Page update may call for a smaller quantity, while an important launch, campaign, or evergreen business post may justify a larger package. Before choosing, consider the post\'s existing Like count, how important the post is, your Page size and the increase you actually want. Choose based on the post you\'re supporting rather than automatically selecting the largest package.';
pricing.primaryCtaLabel = 'Compare Facebook Post Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-fb-post-where-buy',
  'ca-fb-post-more-likes',
  'ca-fb-post-cheap',
  'ca-fb-post-real',
  'ca-fb-post-how-many',
  'ca-fb-post-password',
  'ca-fb-post-info',
  'ca-fb-post-page-url',
  'ca-fb-post-cost',
  'ca-fb-post-delivery-time',
  'ca-fb-post-followers',
  'ca-fb-post-page-likes',
  'ca-fb-post-reach',
  'ca-fb-post-comments-shares',
  'ca-fb-post-business',
  'ca-fb-post-older',
  'ca-fb-post-which-type',
  'ca-fb-post-wrong-url',
  'ca-fb-post-track',
];

related.title = 'Explore Other Facebook Services';
related.description = 'Choose the Facebook service that matches the metric you want to change.';

finalCta.title = 'Put More Likes Behind the Facebook Posts That Matter';
finalCta.description =
  'Choose the post you want to support, select a Facebook Post Likes package that fits the content, and submit the correct public post URL without sharing your Facebook login. Then keep building what the Like count cannot replace: useful content, genuine customer interaction, and a Facebook Page people can trust.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Facebook Post Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-facebook-post-likes-canada',
  title: 'Why Choose NovaLikes for Facebook Post Likes?',
  description: 'The service should be easy to understand before you place an order.',
  items: [
    {
      id: 'fb-post-wc-post',
      title: 'Post-Specific Ordering',
      description:
        'The likes apply to the eligible public Facebook post connected to the URL you submit.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-post-wc-packages',
      title: 'Flexible Like Quantities',
      description:
        'Choose from smaller or larger packages depending on the post and budget you\'re working with.',
      icon: 'users',
    },
    {
      id: 'fb-post-wc-password',
      title: 'No Facebook Password Required',
      description:
        'NovaLikes does not need your Facebook password, verification codes, Page admin login, or private account access.',
      icon: 'lock',
    },
    {
      id: 'fb-post-wc-pricing',
      title: 'Clear Pricing',
      description:
        'Review the Post Like quantity and current package price before completing checkout.',
      icon: 'credit-card',
    },
    {
      id: 'fb-post-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use NovaLikes order tracking afterward for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'fb-post-wc-support',
      title: 'Customer Support',
      description:
        'If your order needs attention, provide the relevant purchase details so support can identify the correct order.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-facebook-post-likes-without-login-canada',
  title: 'Buy Facebook Post Likes Without Sharing Your Login',
  description:
    'NovaLikes processes Post Likes orders using the public Facebook post URL you provide.',
  cards: [
    {
      id: 'fb-post-can-need',
      title: 'What You Need',
      description: 'The exact public Facebook post URL and your selected Post Likes package.',
      icon: 'users',
    },
    {
      id: 'fb-post-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your Facebook password, verification codes, personal profile login, Page admin access, Business Manager access or private messages.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the URL yourself and make sure it goes directly to the individual Facebook post receiving the likes. A general Facebook Page URL is not the correct target for a Post Likes order.',
};

config.doesBuyingHelp = {
  id: 'what-real-facebook-post-likes-mean-canada',
  title: 'Looking for "Real Facebook Post Likes"? Understand the Service First',
  description:
    '"Real Facebook Post Likes" is a common phrase people use when comparing engagement services. You may also see terms such as high-quality Facebook Post Likes, active Facebook Likes or organic Facebook Likes. Different providers may use those terms differently. Before purchasing, ask what metric changes, how many Likes are included, which post receives them and what information you need to submit.',
  helpTitle: 'What NovaLikes Facebook Post Likes Packages Do',
  helpItems: [
    'Increase the Like count shown on the eligible public Facebook post submitted with your order',
  ],
  limitTitle: 'They Do Not Automatically Guarantee',
  limitItems: [
    'Followers or Page Likes',
    'Comments, shares or organic reach',
    'Customers or sales',
  ],
  closingNote:
    'Knowing that before checkout helps you compare services more realistically. Use genuine Facebook insights to judge your real content performance.',
};

config.whatHappens = {
  id: 'what-happens-after-facebook-post-likes-order-canada',
  title: 'What Happens After You Order?',
  description:
    'After checkout, the selected Post Likes package and public Facebook post URL are associated with your order. The service is then processed for the submitted post.',
  steps: [
    {
      id: 'fb-post-th-1',
      title: 'Package and Post URL Are Connected',
      description:
        'The selected Post Likes package and public Facebook post URL are associated with your order.',
    },
    {
      id: 'fb-post-th-2',
      title: 'Likes Target That Post',
      description: 'The Post Likes are directed to the content connected to the URL in your order.',
    },
    {
      id: 'fb-post-th-3',
      title: 'Keep the Post Public',
      description:
        'Keep the submitted content publicly accessible where required while processing is active.',
    },
    {
      id: 'fb-post-th-4',
      title: 'Track and Contact Support If Needed',
      description:
        'Processing time can vary depending on the package quantity and current order conditions. Use NovaLikes order tracking for available updates.',
    },
  ],
  closingNote:
    'Do not delete the post mid-order. If you\'ve submitted incorrect information, contact support with your order details as soon as possible.',
};

config.serviceCompare = {
  id: 'facebook-post-likes-page-likes-followers-canada',
  title: 'Post Likes, Page Likes or Followers: Start With the Metric',
  description: 'Choose the service based on the exact number you want to change.',
  current: {
    title: 'Facebook Post Likes',
    description: 'Like count on one specific eligible public Facebook post',
    bestFor: 'Individual post engagement',
    ctaLabel: 'Facebook Post Likes',
  },
  likes: {
    title: 'Facebook Page Likes',
    description: 'Like count associated with an eligible public Facebook Page',
    bestFor: 'Page-level Like count',
    href: caHref('/buy-facebook-page-likes'),
    ctaLabel: 'Facebook Page Likes',
  },
  views: {
    title: 'Facebook Followers',
    description: 'Follower count displayed on an eligible public Facebook Page',
    bestFor: 'Page audience size',
    href: caHref('/buy-facebook-followers'),
    ctaLabel: 'Facebook Followers',
  },
  combinedNote:
    'Use Facebook Post Likes when one specific post is your priority. Choose Page Likes for the Page-level Like count, or Followers for visible Page audience size.',
  commentsHref: '',
};

config.beforeBuying = {
  id: 'before-you-buy-facebook-post-likes-canada',
  title: 'Before You Buy Facebook Post Likes',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'fb-post-bb-post',
      title: 'Confirm the Exact Post',
      description: 'Open the public Facebook post you want to use.',
      icon: 'users',
    },
    {
      id: 'fb-post-bb-url',
      title: 'Copy the Direct Post URL',
      description: 'Do not submit only your general Facebook Page URL.',
      icon: 'sparkles',
    },
    {
      id: 'fb-post-bb-quantity',
      title: 'Check the Post Like Quantity',
      description: 'Review the package size before adding it to your order.',
      icon: 'credit-card',
    },
    {
      id: 'fb-post-bb-price',
      title: 'Confirm the Current Price',
      description: 'Make sure the price matches the quantity you selected.',
      icon: 'shield-check',
    },
    {
      id: 'fb-post-bb-public',
      title: 'Keep the Post Publicly Accessible',
      description:
        'Avoid deleting or restricting the target content while processing depends on it.',
      icon: 'lock',
    },
    {
      id: 'fb-post-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require Facebook login details.',
      icon: 'headphones',
    },
    {
      id: 'fb-post-bb-service',
      title: 'Choose the Correct Facebook Service',
      description: 'Post Likes, Page Likes, and Followers are separate metrics.',
      icon: 'megaphone',
    },
    {
      id: 'fb-post-bb-policies',
      title: 'Review the Policies',
      description:
        'Read the applicable purchase, service, and refund information before checkout.',
      icon: 'shield-check',
    },
  ],
};

config.worldwide = {
  id: 'post-likes-reach-not-guaranteed-facebook-canada',
  title: 'Don\'t Treat Post Likes as a Guarantee of Facebook Reach',
  description:
    'A Facebook Post Like count and organic distribution are different things. Buying Post Likes should not be treated as a guaranteed way to increase organic post reach, generate more shares, attract comments, increase Facebook Followers or Page Likes, drive website traffic, generate leads, create bookings or produce sales.',
  eyebrow: 'Post Likes vs Reach',
  closingNote:
    'A NovaLikes Post Likes package changes the Like count on the selected eligible public post. Facebook\'s content distribution and genuine audience response remain separate outcomes. Post Likes and genuine engagement are different — use genuine Facebook performance data to make marketing decisions.',
  cards: [
    {
      id: 'fb-post-ww-reach',
      title: 'Organic Post Reach',
      description: 'Distribution is separate from visible Like count.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-post-ww-comments',
      title: 'Comments and Shares',
      description: 'Different types of Facebook interaction from Likes.',
      icon: 'heart',
    },
    {
      id: 'fb-post-ww-page',
      title: 'Page-Level Metrics',
      description: 'Followers and Page Likes apply to the Page, not one post.',
      icon: 'users',
    },
    {
      id: 'fb-post-ww-business',
      title: 'Business Results',
      description:
        'Leads, bookings and sales depend on content and the business behind it.',
      icon: 'briefcase',
    },
  ],
};

config.packageSizes = {
  id: 'which-facebook-posts-worth-supporting-likes-canada',
  title: 'Which Facebook Posts Are Worth Supporting With More Likes?',
  description:
    'Not every Facebook post needs additional likes. A better approach is to identify the content that has lasting value or supports an important business goal. Choose the post first. Then decide whether increasing its visible Like count supports what you\'re trying to achieve.',
  quantityColumnLabel: 'Post Type',
  recommendedColumnLabel: 'Why It May Fit',
  rows: [
    {
      id: 'fb-post-ps-launch',
      quantity: 'Product or Service Launches',
      recommendedFor:
        'If you\'re introducing something new, focus on the post that explains the offer most clearly.',
    },
    {
      id: 'fb-post-ps-announcement',
      quantity: 'Important Business Announcements',
      recommendedFor:
        'A new location, extended service area, change in opening hours, milestone, or major company update can remain useful after publication.',
    },
    {
      id: 'fb-post-ps-showcase',
      quantity: 'Project Showcases',
      recommendedFor:
        'Contractors, designers, agencies, photographers, and other service businesses can support posts that show strong examples of their work.',
    },
    {
      id: 'fb-post-ps-offers',
      quantity: 'Offers and Seasonal Campaigns',
      recommendedFor:
        'A promotion tied to a Canadian holiday, shopping period, local event, or seasonal service may have a clear campaign purpose.',
    },
    {
      id: 'fb-post-ps-events',
      quantity: 'Events',
      recommendedFor:
        'Posts announcing an event, opening, workshop, launch, or community activity may receive more attention from people checking the Page.',
    },
    {
      id: 'fb-post-ps-evergreen',
      quantity: 'Evergreen Content',
      recommendedFor:
        'Useful guides, FAQs, demonstrations, or company introductions may continue representing your business well over time.',
    },
  ],
  bottomNote: 'Compare Post Like package sizes and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-facebook-post-likes-canada',
  title: 'Affordable Facebook Post Likes Without Choosing Blindly',
  description:
    'If you\'re searching for cheap Facebook Post Likes in Canada, price will naturally be part of your decision. Compare more than the cost. Check:',
  closingNote:
    'An affordable Facebook Post Likes package should clearly explain what you\'re purchasing before checkout. NovaLikes provides multiple quantities so you can select an option based on the post and budget you\'re working with.',
  items: [
    {
      id: 'fb-post-bp-1',
      title: 'Post Likes Included',
      description: 'Check how many Post Likes are included in the package.',
      icon: 'users',
    },
    {
      id: 'fb-post-bp-2',
      title: 'Current Package Price',
      description: 'Review pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'fb-post-bp-3',
      title: 'Public Post Requirements',
      description: 'Know what direct Facebook post URL you need to submit.',
      icon: 'clapperboard',
    },
    {
      id: 'fb-post-bp-4',
      title: 'No Login Details',
      description: 'Your Facebook password should not be requested.',
      icon: 'lock',
    },
    {
      id: 'fb-post-bp-5',
      title: 'Order Tracking',
      description: 'Check whether order tracking is available.',
      icon: 'map-pin',
    },
    {
      id: 'fb-post-bp-6',
      title: 'Customer Support',
      description: 'Confirm support is available if you need help.',
      icon: 'headphones',
    },
    {
      id: 'fb-post-bp-7',
      title: 'Service Policies',
      description: 'Review refund and purchase policies before ordering.',
      icon: 'shield-check',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-facebook-post-likes-canada',
  title: 'Common Mistakes When Buying Facebook Post Likes',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-facebook-page-likes': {
      title: 'Facebook Page Likes',
      description:
        'Choose Facebook Page Likes when you want to increase the Page-level Like count rather than engagement on one individual post.',
      ctaLabel: 'Buy Facebook Page Likes',
    },
    'buy-facebook-followers': {
      title: 'Facebook Followers',
      description:
        'Choose Facebook Followers when your goal is to increase the follower count displayed on an eligible public Facebook Page.',
      ctaLabel: 'Buy Facebook Followers',
    },
  },
};

dummy.whyBuy = {
  id: 'build-stronger-visible-activity-post-likes-canada',
  title: 'Build Stronger Visible Activity Around Important Content',
  description:
    'A Facebook Post Like is one of several visible signals connected to a piece of content. When someone sees a post, they may also notice the Page publishing it, the image or video, caption, visible Likes, comments, shares and recent Page activity. A Post Likes package increases the visible Like count on the selected post, but the post itself still needs to communicate something useful. Use Post Likes around business moments that matter — new locations, product launches, seasonal services, limited campaigns, company milestones and community announcements.',
  items: [
    {
      id: 'fb-post-wb-location',
      title: 'A New Location',
      description:
        'A post announcing another store, office, clinic, restaurant, or service location can become an important reference point on the Page.',
    },
    {
      id: 'fb-post-wb-product',
      title: 'A New Product',
      description:
        'Use Post Likes around content that clearly presents what you\'re launching rather than a vague promotional update.',
    },
    {
      id: 'fb-post-wb-seasonal',
      title: 'Seasonal Services',
      description:
        'Home services, retail, travel, hospitality, beauty, fitness, and other businesses may have seasonal periods when certain posts matter more.',
    },
    {
      id: 'fb-post-wb-campaign',
      title: 'A Limited Campaign',
      description:
        'Focus on the post carrying the main message rather than spreading engagement across unrelated Page content.',
    },
    {
      id: 'fb-post-wb-milestone',
      title: 'A Company Milestone',
      description:
        'Awards, anniversaries, major projects, or company updates can remain visible proof of business activity.',
    },
  ],
  bottomNote:
    'Likes can support the presentation. Content gives people a reason to care about the post.',
};

dummy.howToBuy = {
  id: 'how-facebook-post-likes-order-works-canada',
  title: 'How Your Facebook Post Likes Order Works',
  description: 'The process starts with the post you want to support.',
  steps: [
    {
      id: 'fb-post-step-1',
      title: 'Choose the Post',
      description: 'Start with the exact eligible public Facebook post you want to support.',
    },
    {
      id: 'fb-post-step-2',
      title: 'Select the Likes Quantity',
      description: 'Compare the available packages and current pricing.',
    },
    {
      id: 'fb-post-step-3',
      title: 'Copy the Direct Post URL',
      description: 'Use the individual post link rather than the Facebook Page homepage.',
    },
    {
      id: 'fb-post-step-4',
      title: 'Submit Your Order Details',
      description: 'Paste the post URL into the required field.',
    },
    {
      id: 'fb-post-step-5',
      title: 'Review Before Checkout',
      description: 'Check the Post Like quantity, URL, and price before paying.',
    },
    {
      id: 'fb-post-step-6',
      title: 'Track Your Purchase',
      description: 'Use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore Other Facebook Services';
dummy.relatedIntro = 'Choose the Facebook service that matches the metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: How Can You Buy Facebook Post Likes in Canada?',
  text: 'You can buy Facebook Post Likes in Canada through NovaLikes by selecting an available Post Likes package, submitting the exact public Facebook post URL, and completing checkout online. Your Facebook password is not required. The likes apply to that specific post and do not automatically increase Facebook Followers or Page Likes.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-facebook-post-likes'] = {
  title: 'Buy Facebook Post Likes Canada | Likes for Posts | NovaLikes',
  description:
    'Buy Facebook Post Likes in Canada for public posts. Choose flexible like packages, submit your post URL, order without a password, and track your purchase.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caFbPostLikesFaqs = [
  {
    id: 'ca-fb-post-where-buy',
    question: 'Where can I buy Facebook Post Likes in Canada?',
    answer:
      'You can buy Facebook Post Likes in Canada through NovaLikes for eligible public posts. Choose an available Post Likes package, submit the exact public post URL, and complete checkout without sharing your Facebook password.',
  },
  {
    id: 'ca-fb-post-more-likes',
    question: 'How can I get more Likes on a Facebook post?',
    answer:
      'NovaLikes Post Likes packages can increase the visible Like count on an eligible public Facebook post. For organic engagement, continue publishing useful content, responding to genuine users, and reviewing your real Page performance.',
  },
  {
    id: 'ca-fb-post-cheap',
    question: 'Can I buy cheap Facebook Post Likes in Canada?',
    answer:
      'NovaLikes offers multiple Post Like quantities so you can compare package sizes and current prices. When comparing cheaper services, also consider post requirements, password access, tracking, support, and what the service actually includes.',
  },
  {
    id: 'ca-fb-post-real',
    question: 'What are real Facebook Post Likes?',
    answer:
      '"Real Facebook Post Likes" can mean different things depending on the provider. Review exactly what the service promises rather than relying only on the phrase. NovaLikes Post Likes packages are designed to increase the visible Like count on the submitted eligible post.',
  },
  {
    id: 'ca-fb-post-how-many',
    question: 'How many Facebook Post Likes should I buy?',
    answer:
      'There is no single correct number for every post. Consider the post\'s existing activity, Page size, content purpose, and the visible increase you want before choosing from the available packages.',
  },
  {
    id: 'ca-fb-post-password',
    question: 'Do I need my Facebook password?',
    answer:
      'No. NovaLikes does not require your Facebook password, verification codes, Page admin credentials, or private account access.',
  },
  {
    id: 'ca-fb-post-info',
    question: 'What information do I need to order?',
    answer:
      'You need the direct public Facebook post URL and the Post Likes package you want to purchase.',
  },
  {
    id: 'ca-fb-post-page-url',
    question: 'Can I use my Facebook Page URL?',
    answer:
      'No. A Post Likes order should use the direct URL of the individual eligible Facebook post, not only the general Page URL.',
  },
  {
    id: 'ca-fb-post-cost',
    question: 'How much do Facebook Post Likes cost?',
    answer:
      'Pricing depends on the quantity you select. NovaLikes displays current package sizes and prices before checkout.',
  },
  {
    id: 'ca-fb-post-delivery-time',
    question: 'How long does it take to get Facebook Post Likes?',
    answer:
      'Processing time can vary based on package quantity and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'ca-fb-post-followers',
    question: 'Will buying Post Likes increase my Facebook Followers?',
    answer:
      'Not automatically. Post Likes and Followers are separate Facebook metrics and separate NovaLikes services.',
  },
  {
    id: 'ca-fb-post-page-likes',
    question: 'Will Post Likes increase my Facebook Page Likes?',
    answer:
      'Not automatically. Facebook Page Likes are a separate Page-level service.',
  },
  {
    id: 'ca-fb-post-reach',
    question: 'Will buying Facebook Post Likes increase organic reach?',
    answer:
      'There is no guarantee. A Post Likes package changes the visible Like count on the selected post. Organic reach depends on separate factors.',
  },
  {
    id: 'ca-fb-post-comments-shares',
    question: 'Will more Post Likes create comments or shares?',
    answer:
      'Not automatically. Comments, shares, and Likes are different types of Facebook interaction.',
  },
  {
    id: 'ca-fb-post-business',
    question: 'Can Canadian businesses buy Facebook Post Likes?',
    answer:
      'Yes. Eligible public posts from Facebook Pages used by businesses, brands, creators, organizations, and other supported accounts can use NovaLikes Post Likes packages.',
  },
  {
    id: 'ca-fb-post-older',
    question: 'Can I use Post Likes for an older Facebook post?',
    answer:
      'If the post remains eligible and publicly accessible, it may be suitable for an order. Check the direct post URL and current service requirements before purchasing.',
  },
  {
    id: 'ca-fb-post-which-type',
    question: 'Which type of Facebook post should I choose?',
    answer:
      'Choose content that has a clear role for your Page, such as an important announcement, campaign, product post, project showcase, event, or evergreen piece of content.',
  },
  {
    id: 'ca-fb-post-wrong-url',
    question: 'What happens if I submit the wrong Facebook post URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Check the direct post URL carefully before checkout.',
  },
  {
    id: 'ca-fb-post-track',
    question: 'Can I track my Facebook Post Likes order?',
    answer:
      'Yes. Use NovaLikes order tracking after checkout for available status information.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-fb-post-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caFbPostLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada Facebook Post Likes content.');
