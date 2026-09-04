/**
 * Apply supplied Canada Instagram Comments copy to content/markets/ca/services/buy-instagram-comments.json
 * Run: npx tsx scripts/patch-ca-ig-comments.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CA_PREFIX = '/ca';
const file = path.join(process.cwd(), 'content/markets/ca/services/buy-instagram-comments.json');
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
  title: 'Buy Instagram Comments Canada | Comments for Posts & Reels',
  description:
    'Buy Instagram comments in Canada for public posts and Reels. Compare comment options, order without a password, and track your purchase with NovaLikes.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR CANADA';
hero.title = 'Buy Instagram Comments in Canada for More Visible Interaction';
hero.description =
  'Add more visible conversation to the Instagram posts and Reels that matter most. NovaLikes lets creators, businesses, brands, and agencies in Canada buy Instagram comments for eligible public content without sharing Instagram login details. Choose the comment option and quantity that fits your post, submit the exact public URL, and complete your order online. Whether you\'re supporting a launch, campaign, product post, creator collaboration, or important Reel, you can choose a package based on the content and the level of visible interaction you want around it.';
hero.primaryCta = { label: 'Choose Your Comments Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-c-trust-public-url', label: 'Public Post or Reel URL Only' },
  { id: 'ig-c-trust-password', label: 'No Password Required' },
  { id: 'ig-c-trust-checkout', label: 'Secure Checkout' },
  { id: 'ig-c-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose the Comment Package That Fits Your Content';
pricing.description =
  'Comments are different from likes or views because they create visible conversation beneath a specific piece of content. NovaLikes offers multiple comment package options and quantities, allowing you to choose based on the post or Reel you\'re working with rather than using the same amount everywhere. Available quantities can include 5, 10, 25, 50, 75 and 100 comments. Compare the available package types, quantities, and current pricing before you order. A smaller package may suit a regular post, while a larger option may make more sense for content connected to a campaign, launch, or important announcement.';
pricing.primaryCtaLabel = 'View Comments Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'ca-ig-c-where-buy',
  'ca-ig-c-more-comments',
  'ca-ig-c-cheap',
  'ca-ig-c-real',
  'ca-ig-c-package-types',
  'ca-ig-c-reel',
  'ca-ig-c-password',
  'ca-ig-c-how-many',
  'ca-ig-c-cost',
  'ca-ig-c-delivery-time',
  'ca-ig-c-followers',
  'ca-ig-c-likes-views',
  'ca-ig-c-business',
  'ca-ig-c-older-post',
  'ca-ig-c-wrong-url',
  'ca-ig-c-track',
];

related.title = 'Explore Other Ways to Support Your Instagram Presence';
related.description = 'Choose the service that matches the Instagram metric you want to change.';

finalCta.title = 'Put More Conversation Around the Content That Matters';
finalCta.description =
  'Choose the Instagram Comments package that fits your post or Reel, submit the correct public content URL, and place your order without sharing your Instagram login.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Comments Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-comments-canada',
  title: 'Why Choose NovaLikes for Instagram Comments?',
  description:
    'A comments order should be easy to understand before you pay for it.',
  items: [
    {
      id: 'ig-c-wc-options',
      title: 'Different Comment Options',
      description:
        'Compare the currently available comment package types and choose the option that fits your content.',
      icon: 'users',
    },
    {
      id: 'ig-c-wc-quantities',
      title: 'Flexible Quantities',
      description:
        'Select a smaller or larger number of comments depending on the post or Reel you\'re working with.',
      icon: 'heart',
    },
    {
      id: 'ig-c-wc-password',
      title: 'No Instagram Password',
      description:
        'NovaLikes does not require your password, verification codes, or private account access.',
      icon: 'lock',
    },
    {
      id: 'ig-c-wc-content',
      title: 'Content-Level Ordering',
      description:
        'Comments are ordered for the exact public post or Reel URL you submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-wc-pricing',
      title: 'Clear Package Pricing',
      description:
        'Review the package type, quantity, and current price before completing checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-wc-tracking',
      title: 'Order Tracking',
      description:
        'Use the available NovaLikes tracking option for status information after placing your order.',
      icon: 'map-pin',
    },
    {
      id: 'ig-c-wc-support',
      title: 'Support When You Need It',
      description:
        'If you need help with a purchase, provide your order details so NovaLikes support can review the relevant information.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'get-instagram-comments-without-login-canada',
  title: 'Buy Instagram Comments Without Sharing Your Account Login',
  description:
    'NovaLikes does not need control of your Instagram account to process a comments order. You provide the public URL of the post or Reel receiving the comments.',
  cards: [
    {
      id: 'ig-c-can-need',
      title: 'What You Need',
      description:
        'The exact public Instagram post or Reel URL and your selected comment package and quantity.',
      icon: 'users',
    },
    {
      id: 'ig-c-can-not-need',
      title: 'What You Don\'t Need',
      description:
        'Your Instagram password, verification codes, private message access or private account credentials.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the URL yourself and make sure it leads directly to the intended content. A profile URL and an individual post URL are not the same thing.',
};

config.doesBuyingHelp = {
  id: 'what-real-instagram-comments-mean-canada',
  title: 'Looking for "Real Instagram Comments"? Start With What the Service Actually Includes',
  description:
    '"Real Instagram comments" is a common search phrase, but the word "real" is not always defined the same way by every provider. The same applies to phrases such as high-quality Instagram comments, premium Instagram comments, and natural Instagram comments. Rather than relying only on a marketing term, review the actual package offered.',
  helpTitle: 'What NovaLikes Comment Packages Do',
  helpItems: [
    'Add comments to the eligible public content submitted with your order',
  ],
  limitTitle: 'They Do Not Automatically Guarantee',
  limitItems: [
    'Additional followers',
    'Likes',
    'Views',
    'Organic reach',
    'Customers, sales or partnerships',
  ],
  closingNote:
    'Understanding that distinction helps you evaluate the service based on what you\'re actually buying.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-comments-order-canada',
  title: 'What Happens After Checkout?',
  description:
    'Once your purchase is submitted, the package type, comment quantity, and Instagram URL are connected to your order. The selected comments are processed for the content linked in that order.',
  steps: [
    {
      id: 'ig-c-th-1',
      title: 'Order Details Are Connected',
      description:
        'Your comment package, quantity and content URL are associated with the order.',
    },
    {
      id: 'ig-c-th-2',
      title: 'Comments Process for That Content',
      description:
        'The selected comments are processed for the post or Reel linked in your order.',
    },
    {
      id: 'ig-c-th-3',
      title: 'Keep the Content Public',
      description:
        'Keep the submitted post or Reel accessible where required while processing is active.',
    },
    {
      id: 'ig-c-th-4',
      title: 'Track and Contact Support If Needed',
      description:
        'Use order tracking for updates. If you submitted incorrect information, contact support with your order details as soon as possible.',
    },
  ],
  closingNote:
    'Do not delete the content or submit the wrong URL while an active order depends on that post or Reel.',
};

config.serviceCompare = {
  id: 'instagram-comments-likes-views-followers-canada',
  title: 'Comments Are Different From Likes, Views, and Followers',
  description: 'Instagram engagement is made up of several different metrics.',
  current: {
    title: 'Instagram Comments',
    description: 'Comments displayed on an eligible post or Reel',
    bestFor: 'Visible conversation on specific content',
    ctaLabel: 'Instagram Comments',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Like count on a specific post or Reel',
    bestFor: 'Visible like count on content',
    href: caHref('/buy-instagram-likes'),
    ctaLabel: 'Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count on an eligible Reel or video',
    bestFor: 'Video view count on Reels',
    href: caHref('/buy-instagram-views'),
    ctaLabel: 'Instagram Views',
  },
  combinedNote:
    'Choose Comments for visible conversation on a specific post or Reel. Choose Likes for like count, Views for video count, or Instagram Followers for profile audience size.',
  commentsHref: caHref('/buy-instagram-followers'),
};

config.beforeBuying = {
  id: 'before-you-order-instagram-comments-canada',
  title: 'Before You Order Instagram Comments',
  description: 'A quick review can prevent avoidable problems.',
  framingNote:
    'Use the exact content link, compare comment options, and review the package before payment.',
  items: [
    {
      id: 'ig-c-bb-content',
      title: 'Check the Content',
      description: 'Make sure you\'re using the exact post or Reel you want to support.',
      icon: 'users',
    },
    {
      id: 'ig-c-bb-url',
      title: 'Copy the Direct URL',
      description:
        'Submit the public content link rather than your general Instagram profile.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-bb-options',
      title: 'Compare Comment Options',
      description: 'Review the available package type before making your choice.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-bb-quantity',
      title: 'Check the Quantity',
      description: 'Confirm how many comments you\'re ordering.',
      icon: 'shield-check',
    },
    {
      id: 'ig-c-bb-price',
      title: 'Review the Price',
      description:
        'Make sure the package price matches the option you intended to select.',
      icon: 'lock',
    },
    {
      id: 'ig-c-bb-public',
      title: 'Keep the Content Public',
      description:
        'Avoid removing or restricting the submitted content while an active order requires it.',
      icon: 'headphones',
    },
    {
      id: 'ig-c-bb-password',
      title: 'Keep Your Login Private',
      description: 'NovaLikes does not require your Instagram password.',
      icon: 'megaphone',
    },
  ],
};

config.worldwide = {
  id: 'dont-measure-post-by-comments-alone-canada',
  title: 'Don\'t Measure a Post by Comment Count Alone',
  description:
    'A post with more comments is not automatically a successful post. When reviewing your own Instagram content, consider the bigger picture.',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Use comment count for what it represents, and use your own analytics and business data for broader decisions.',
  cards: [
    {
      id: 'ig-c-ww-audience',
      title: 'Did the Post Reach the Right Audience?',
      description:
        'Consider whether the content reached the people you actually wanted to see it.',
      icon: 'users',
    },
    {
      id: 'ig-c-ww-saves',
      title: 'Did People Save or Share It?',
      description: 'Saves and shares can signal stronger interest than one visible number.',
      icon: 'heart',
    },
    {
      id: 'ig-c-ww-profile',
      title: 'Did Viewers Visit the Profile?',
      description:
        'Profile visits can show whether the content led people to explore more of your account.',
      icon: 'briefcase',
    },
    {
      id: 'ig-c-ww-questions',
      title: 'Did Genuine Customers Ask Questions?',
      description:
        'Real audience questions can tell you more about organic performance than comment count alone.',
      icon: 'clapperboard',
    },
  ],
};

config.packageSizes = {
  id: 'which-posts-best-suited-instagram-comments-canada',
  title: 'Which Instagram Posts Are Best Suited to More Comments?',
  description:
    'Not every post needs more conversation around it. If you\'re deciding where to use an Instagram Comments package, start with content that already has a clear reason for people to respond. Choose the content first. Then decide how much visible conversation you want around it.',
  quantityColumnLabel: 'Content Type',
  recommendedColumnLabel: 'Why It May Fit',
  rows: [
    {
      id: 'ig-c-ps-launch',
      quantity: 'Product Launches',
      recommendedFor:
        'A launch post can naturally invite questions, reactions, and discussion around the product or offer.',
    },
    {
      id: 'ig-c-ps-announcement',
      quantity: 'Service Announcements',
      recommendedFor:
        'Businesses can use comments on posts introducing a new service, promotion, location, or important update.',
    },
    {
      id: 'ig-c-ps-collab',
      quantity: 'Creator Collaborations',
      recommendedFor:
        'A partnership or collaboration post often has more context around it than an everyday update and may be worth highlighting.',
    },
    {
      id: 'ig-c-ps-opinion',
      quantity: 'Questions and Opinion Posts',
      recommendedFor:
        'Content that asks viewers to choose, compare, or share an opinion naturally fits a conversation-focused format.',
    },
    {
      id: 'ig-c-ps-portfolio',
      quantity: 'Portfolio Content',
      recommendedFor:
        'Creators and service businesses may want more visible interaction around work that best represents what they do.',
    },
    {
      id: 'ig-c-ps-reel',
      quantity: 'Reels With a Clear Topic',
      recommendedFor:
        'A Reel with a strong subject gives the comments underneath it more context than content with no clear message.',
    },
  ],
  bottomNote: 'Compare comment package types, quantities and current prices in the pricing section above.',
};

config.bestPractices = {
  id: 'affordable-instagram-comments-canada',
  title: 'Affordable Instagram Comments: Compare More Than the Price',
  description:
    'People searching for cheap Instagram comments in Canada are often comparing providers based on cost. Price matters, particularly if you only need a small comment quantity. But it should not be the only comparison. Before ordering, check:',
  closingNote:
    'An affordable Instagram Comments service should make those details clear enough for you to understand the purchase before checkout. NovaLikes lets you compare the currently available options instead of hiding the package details until later.',
  items: [
    {
      id: 'ig-c-bp-1',
      title: 'Available Comment Types',
      description: 'Review what comment package types are offered.',
      icon: 'users',
    },
    {
      id: 'ig-c-bp-2',
      title: 'Number of Comments Included',
      description: 'Check how many comments are included in the package.',
      icon: 'heart',
    },
    {
      id: 'ig-c-bp-3',
      title: 'Current Package Price',
      description: 'Compare pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-bp-4',
      title: 'Supported Content',
      description: 'Confirm the service supports the post or Reel you want to use.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-bp-5',
      title: 'URL Requirements',
      description: 'Know what public content URL you need to submit.',
      icon: 'lock',
    },
    {
      id: 'ig-c-bp-6',
      title: 'No Password Requirement',
      description: 'Your Instagram password should not be requested.',
      icon: 'shield-check',
    },
    {
      id: 'ig-c-bp-7',
      title: 'Tracking, Support and Policies',
      description:
        'Check order tracking, customer support and service or refund policies.',
      icon: 'headphones',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-comments-canada',
  title: 'Common Mistakes When Buying Instagram Comments',
  description: '',
  closingNote: '',
  items: [],
};

config.relatedPackages = {
  copyBySlug: {
    'buy-instagram-likes': {
      title: 'Instagram Likes',
      description:
        'Choose Likes when you want more visible likes on a specific eligible post or Reel.',
      ctaLabel: 'Buy Instagram Likes',
    },
    'buy-instagram-views': {
      title: 'Instagram Views',
      description:
        'Choose Views when you want to increase the displayed view count on an eligible Reel or video.',
      ctaLabel: 'Buy Instagram Views',
    },
    'buy-instagram-followers': {
      title: 'Instagram Followers',
      description:
        'Choose Followers when your goal is to increase the follower count displayed on your overall Instagram profile.',
      ctaLabel: 'Buy Instagram Followers',
    },
  },
};

dummy.whyBuy = {
  id: 'build-conversation-around-content-canada',
  title: 'Build Conversation Around Content That Deserves Attention',
  description:
    'Comments can make a post feel different from content that only displays a like or view count. They add another visible layer beneath the creative itself. But the strongest Instagram content gives that conversation somewhere to go. If you\'re using comments as part of a broader content strategy, make sure the post itself has a clear subject, a caption that provides context, visuals that match the message, a reason for someone to respond, accurate product or service information, and a profile that supports what the post is saying. One of the most important parts of visible engagement is context. A comment section should make sense next to the content people are viewing. Comments can contribute to how active the content appears at first glance, but that first impression is strongest when the post, caption, profile, and visible conversation all make sense together. Purchased comments can add comments to the selected content. Your own genuine community conversations still depend on how you publish, reply, and interact with real people. When real customers, followers, or viewers leave genuine comments, your own responses matter. For businesses, keep business information accurate, avoid unsupported claims, watch for spam, handle customer issues properly, and keep your tone consistent.',
  items: [
    {
      id: 'ig-c-wb-product',
      title: 'New Product Releases',
      description:
        'Give viewers enough information in the post and caption to understand what has launched.',
    },
    {
      id: 'ig-c-wb-seasonal',
      title: 'Seasonal Campaigns',
      description:
        'Promotions tied to holidays, events, or seasonal buying periods can naturally create discussion.',
    },
    {
      id: 'ig-c-wb-local',
      title: 'Local Business Content',
      description:
        'Posts about a new location, service area, menu item, project, or event can benefit from having a clear topic.',
    },
    {
      id: 'ig-c-wb-partnership',
      title: 'Creator Partnerships',
      description:
        'Collaboration content may be seen by people unfamiliar with one or both creators. Keep the profile and post context strong.',
    },
    {
      id: 'ig-c-wb-community',
      title: 'Community-Focused Posts',
      description:
        'Questions, comparisons, polls, opinions, and audience prompts naturally lend themselves to comments.',
    },
  ],
  bottomNote:
    'The comment count is only one signal. The topic and relevance of the content remain important.',
};

dummy.howToBuy = {
  id: 'how-instagram-comments-order-works-canada',
  title: 'How an Instagram Comments Order Works',
  description: 'The process starts with the content, not your login.',
  steps: [
    {
      id: 'ig-c-step-1',
      title: 'Select Your Comment Option',
      description:
        'Compare the available package types and decide which option fits the post or Reel.',
    },
    {
      id: 'ig-c-step-2',
      title: 'Choose the Quantity',
      description:
        'Select how many comments you want for the individual piece of content.',
    },
    {
      id: 'ig-c-step-3',
      title: 'Submit the Correct URL',
      description:
        'Paste the direct public link to the Instagram post or Reel receiving the order.',
    },
    {
      id: 'ig-c-step-4',
      title: 'Review Before Checkout',
      description:
        'Double-check the package, comment quantity, URL, and price.',
    },
    {
      id: 'ig-c-step-5',
      title: 'Track Your Purchase',
      description:
        'After placing your order, use NovaLikes order tracking for available status information.',
    },
  ],
};

dummy.relatedHeading = 'Explore Other Ways to Support Your Instagram Presence';
dummy.relatedIntro = 'Choose the service that matches the Instagram metric you want to change.';

dummy.quickAnswer = {
  heading: 'Quick Answer: How Can You Buy Instagram Comments in Canada?',
  text: 'You can buy Instagram comments in Canada through NovaLikes by choosing an available comment package, selecting the quantity you want, and submitting the exact public Instagram post or Reel URL. Your Instagram password is not required. The comments apply to the selected content rather than changing your followers, likes, or views.',
};

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/ca/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-comments'] = {
  title: 'Buy Instagram Comments Canada | Comments for Posts & Reels',
  description:
    'Buy Instagram comments in Canada for public posts and Reels. Compare comment options, order without a password, and track your purchase with NovaLikes.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/ca/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{
  id: string;
  question: string;
  answer: string;
}>;

const caIgCommentsFaqs = [
  {
    id: 'ca-ig-c-where-buy',
    question: 'Where can I buy Instagram comments in Canada?',
    answer:
      'You can buy Instagram comments in Canada through NovaLikes for eligible public posts and Reels. Choose an available comment option and quantity, submit the direct public content URL, and complete checkout without sharing your Instagram password.',
  },
  {
    id: 'ca-ig-c-more-comments',
    question: 'How can I get more comments on an Instagram post?',
    answer:
      'NovaLikes comment packages can add comments to an eligible public Instagram post or Reel. For genuine organic conversation, also publish content that gives your audience something relevant to discuss and respond to real comments yourself.',
  },
  {
    id: 'ca-ig-c-cheap',
    question: 'Can I buy cheap Instagram comments in Canada?',
    answer:
      'NovaLikes offers different comment quantities and package options, including smaller quantities for users who do not need a large order. Compare the price with the package type, quantity, password requirements, tracking, support, and service details.',
  },
  {
    id: 'ca-ig-c-real',
    question: 'What are real Instagram comments?',
    answer:
      '"Real Instagram comments" can mean different things depending on the provider. Check the actual package description and what the service promises rather than relying only on the label.',
  },
  {
    id: 'ca-ig-c-package-types',
    question: 'What is the difference between high-quality and premium Instagram comments?',
    answer:
      'NovaLikes currently provides multiple Instagram comment package options. Review the current package details and pricing shown on the service page before ordering so you understand which option you\'re selecting.',
  },
  {
    id: 'ca-ig-c-reel',
    question: 'Can I buy Instagram comments for a Reel?',
    answer:
      'Yes. Eligible public Instagram posts and Reels can be used for a comments order when you submit the correct direct content URL.',
  },
  {
    id: 'ca-ig-c-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes, or private account access for an Instagram Comments order.',
  },
  {
    id: 'ca-ig-c-how-many',
    question: 'How many Instagram comments should I buy?',
    answer:
      'There is no single quantity that fits every post. Consider the content, existing activity, purpose of the post, and the level of visible conversation you want before choosing from the available packages.',
  },
  {
    id: 'ca-ig-c-cost',
    question: 'How much does it cost to buy Instagram comments?',
    answer:
      'The cost depends on the comment package type and quantity you choose. Check the current pricing displayed by NovaLikes before completing checkout.',
  },
  {
    id: 'ca-ig-c-delivery-time',
    question: 'How long does an Instagram Comments order take?',
    answer:
      'Processing time can vary depending on the selected package, quantity, and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'ca-ig-c-followers',
    question: 'Will buying comments increase my Instagram followers?',
    answer:
      'Not automatically. Comments and followers are separate metrics. An Instagram Comments package applies to the submitted content rather than your overall follower count.',
  },
  {
    id: 'ca-ig-c-likes-views',
    question: 'Will comments also increase my Instagram likes or views?',
    answer:
      'Not automatically. Instagram Likes and Instagram Views are separate services designed for those specific metrics.',
  },
  {
    id: 'ca-ig-c-business',
    question: 'Can businesses in Canada buy Instagram comments?',
    answer:
      'Eligible public posts and Reels from Canadian business, creator, brand, and other supported accounts can use Instagram Comments packages.',
  },
  {
    id: 'ca-ig-c-older-post',
    question: 'Can I add comments to an older Instagram post?',
    answer:
      'If the post or Reel remains eligible and publicly accessible, it may be suitable for an order. Check the content URL and current service requirements before purchasing.',
  },
  {
    id: 'ca-ig-c-wrong-url',
    question: 'What happens if I submit the wrong post URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the direct content URL before completing checkout.',
  },
  {
    id: 'ca-ig-c-track',
    question: 'Can I track my Instagram Comments order?',
    answer:
      'Yes. Use NovaLikes order tracking after checkout to check available status information for your purchase.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('ca-ig-c-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...caIgCommentsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Canada Instagram Comments content.');
