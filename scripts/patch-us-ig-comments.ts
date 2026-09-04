/**
 * Apply supplied United States Instagram Comments copy.
 * Run: npx tsx scripts/patch-us-ig-comments.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const US = '/us';
const file = path.join(process.cwd(), 'content/markets/us/services/buy-instagram-comments.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const dummy = data.dummy as Record<string, unknown>;
const config = dummy.config as Record<string, unknown>;

const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;

function usHref(href: string): string {
  if (href.startsWith('/buy-')) return `${US}${href}`;
  return href;
}

content.seo = {
  title: 'Buy Instagram Comments USA | Posts & Reels | NovaLikes',
  description:
    'Buy Instagram comments in the USA for public posts and Reels. Compare comment packages, order without sharing your password and track your purchase online.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR THE USA';
hero.title = 'Buy Instagram Comments in the USA and Build More Visible Conversation';
hero.description =
  "Add more visible interaction around the Instagram posts and Reels that matter most. NovaLikes gives creators, businesses, brands and agencies across the United States a straightforward way to buy Instagram Comments for eligible public content without sharing account login details. Choose the comment option and quantity that fits your post, submit the exact public URL and complete your order online. Whether you're supporting a product launch, creator collaboration, campaign post, business announcement or content designed to start a discussion, choose a comment package that fits the conversation around that content.";
hero.primaryCta = { label: 'Choose Your Instagram Comments Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-c-trust-public-url', label: 'Public Post or Reel URL Only' },
  { id: 'ig-c-trust-password', label: 'No Password Required' },
  { id: 'ig-c-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-c-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Comment Package That Fits the Content';
pricing.description =
  'Comments work differently from Likes or Views because they add visible conversation beneath an individual post or Reel. NovaLikes currently offers comment quantities including 5, 10, 25, 50, 75 and 100 Comments. A smaller package may fit a focused post. A larger campaign, collaboration or product launch may call for something different. Before choosing, consider existing comment activity, the purpose of the content, your profile size and the quantity you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Comments Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'us-ig-c-where-buy',
  'us-ig-c-get-more',
  'us-ig-c-cheap',
  'us-ig-c-real',
  'us-ig-c-how-many',
  'us-ig-c-reels',
  'us-ig-c-password',
  'us-ig-c-info',
  'us-ig-c-cost',
  'us-ig-c-delivery',
  'us-ig-c-followers',
  'us-ig-c-likes-views',
  'us-ig-c-organic-reach',
  'us-ig-c-business',
  'us-ig-c-local',
  'us-ig-c-client',
  'us-ig-c-wrong-url',
  'us-ig-c-track',
];

related.title = 'Explore More Instagram Services';
related.description =
  'Choose Followers for your profile, Likes for eligible posts or Reels, or Views for eligible Reels and videos.';

finalCta.title = 'Build Conversation Around Instagram Content Worth Discussing';
finalCta.description =
  'Choose the post or Reel you want to support, select the Instagram Comments package that fits the content and submit the correct public URL without sharing your login details. Then keep strengthening what a comment count cannot replace: relevant content, genuine audience interaction and conversations people actually want to join.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Comments Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-comments-usa',
  title: 'Why Choose NovaLikes for Instagram Comments?',
  description: 'Buying Instagram Comments should be easy to understand before checkout.',
  items: [
    {
      id: 'ig-c-wc-options',
      title: 'Multiple Comment Options',
      description: 'Compare the currently available package types before selecting one.',
      icon: 'users',
    },
    {
      id: 'ig-c-wc-quantities',
      title: 'Flexible Quantities',
      description: 'Choose from smaller and larger comment quantities depending on the content.',
      icon: 'heart',
    },
    {
      id: 'ig-c-wc-password',
      title: 'No Instagram Password Required',
      description: 'NovaLikes does not need your Instagram password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'ig-c-wc-content',
      title: 'Content-Specific Ordering',
      description: 'Comments apply to the eligible public post or Reel connected to the URL you submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the comment package, quantity and current price before paying.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'ig-c-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterward for available status information.',
      icon: 'map-pin',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-instagram-comments-without-login-usa',
  title: 'Buy Instagram Comments Without Sharing Your Login',
  description:
    'A Comments order should not require control of your Instagram account. NovaLikes uses the public content information required for the service.',
  cards: [
    {
      id: 'ig-c-can-need',
      title: 'What You Need',
      description:
        'The exact public URL of the Instagram post or Reel and your selected comment package and quantity.',
      icon: 'users',
    },
    {
      id: 'ig-c-can-not-need',
      title: "What You Don't Need",
      description:
        'Your Instagram password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, open the URL yourself and confirm that it leads directly to the content you want to use. A general profile link is not the correct target for an Instagram Comments order.',
};

config.doesBuyingHelp = {
  id: 'real-instagram-comments-usa',
  title: 'Looking for “Real Instagram Comments”? Check the Package Details First',
  description:
    '"Real Instagram Comments" is a common phrase used when comparing engagement services. You may also see high-quality Instagram Comments, premium Instagram Comments or natural Instagram Comments. Different providers may use those labels differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What type of comments am I buying?',
    'How many are included?',
    'Which post or Reel receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Instagram Comments Packages Do',
  limitItems: ['Add comments to the eligible public content submitted with the order'],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Followers, Likes, Views, reach, customers or sales. Clear expectations make comparison easier.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-comments-order-usa',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected comment package, quantity and submitted Instagram content URL are connected to the purchase. The order is then processed for the intended post or Reel.',
  steps: [
    {
      id: 'ig-c-th-1',
      title: 'Keep the Content Public',
      description: 'The submitted content should remain publicly accessible where required.',
    },
    {
      id: 'ig-c-th-2',
      title: "Don't Delete It Mid-Order",
      description: 'Removing the target post or Reel can interfere with an active order.',
    },
    {
      id: 'ig-c-th-3',
      title: 'Check the URL Carefully',
      description: 'Make sure the order points to the exact content you intended to use.',
    },
    {
      id: 'ig-c-th-4',
      title: 'Follow the Order Status',
      description:
        'Processing time can vary depending on package type, quantity and current order conditions. Use NovaLikes order tracking for available status information.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'comments-likes-views-followers-usa',
  title: 'Comments, Likes, Views or Followers: Choose by Goal',
  description: 'Different Instagram services affect different metrics.',
  current: {
    title: 'Instagram Comments',
    description: 'Comments displayed on an eligible public post or Reel',
    bestFor: 'Conversation',
    ctaLabel: 'Instagram Comments',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Like count displayed on an eligible public post or Reel',
    bestFor: 'Visible engagement',
    href: usHref('/buy-instagram-likes'),
    ctaLabel: 'Buy Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count displayed on an eligible Reel or video',
    bestFor: 'Video content',
    href: usHref('/buy-instagram-views'),
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Comments for conversation. Choose Likes for visible engagement. Choose Views for video content. Choose Followers for profile audience size. One service does not automatically include the others.',
  commentsHref: usHref('/buy-instagram-followers'),
};

config.beforeBuying = {
  id: 'before-you-buy-instagram-comments-usa',
  title: 'Before You Buy Instagram Comments in the USA',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'ig-c-bb-content',
      title: 'Confirm the Exact Post or Reel',
      description: 'Open the public content you want to support.',
      icon: 'users',
    },
    {
      id: 'ig-c-bb-url',
      title: 'Copy the Direct Public URL',
      description: 'Do not submit only the general Instagram profile link.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-bb-options',
      title: 'Choose the Right Comment Package',
      description: 'Compare the available comment options before selecting one.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-bb-quantity',
      title: 'Check the Quantity',
      description: "Make sure you're ordering the number of Comments you actually want.",
      icon: 'shield-check',
    },
    {
      id: 'ig-c-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package total before checkout.',
      icon: 'lock',
    },
    {
      id: 'ig-c-bb-public',
      title: 'Keep the Content Public',
      description: 'Avoid deleting or restricting the submitted content while processing requires access.',
      icon: 'headphones',
    },
    {
      id: 'ig-c-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Instagram password.',
      icon: 'megaphone',
    },
    {
      id: 'ig-c-bb-metric',
      title: 'Choose the Correct Instagram Service',
      description: 'Comments, Likes, Views and Followers are separate metrics.',
      icon: 'users',
    },
    {
      id: 'ig-c-bb-policies',
      title: 'Review the Policies',
      description: 'Read the applicable service and refund information before completing checkout.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'instagram-comment-strategy-usa',
  title: 'A Practical Instagram Comment Strategy for US Accounts',
  description:
    'Comments can support selected content, but stronger community growth requires more than one visible metric.',
  eyebrow: 'Comment Strategy',
  closingNote:
    'Visible discussion can support a post. Long-term community growth comes from useful content and genuine interaction.',
  cards: [
    {
      id: 'ig-c-ww-subject',
      title: 'Publish Content With a Clear Subject',
      description: 'Give people something specific to react to.',
      icon: 'users',
    },
    {
      id: 'ig-c-ww-captions',
      title: 'Use Captions for Context',
      description: 'Explain the topic, product, story or question clearly.',
      icon: 'heart',
    },
    {
      id: 'ig-c-ww-priority',
      title: 'Focus on Priority Posts',
      description: "Don't apply the same comment strategy to every piece of content.",
      icon: 'briefcase',
    },
    {
      id: 'ig-c-ww-reply',
      title: 'Reply to Genuine People',
      description: 'Real conversations deserve real responses.',
      icon: 'clapperboard',
    },
  ],
};

config.packageSizes = {
  id: 'choose-comment-package-usa',
  title: 'Choose a Comment Package That Fits the Content',
  description:
    'Comments work differently from Likes or Views because they add visible conversation beneath an individual post or Reel. NovaLikes currently offers comment quantities including 5, 10, 25, 50, 75 and 100 Comments.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'ig-c-ps-activity',
      quantity: 'Existing Comment Activity',
      recommendedFor: 'Look at the conversation already visible beneath the post.',
    },
    {
      id: 'ig-c-ps-purpose',
      quantity: 'The Purpose of the Content',
      recommendedFor:
        'A launch, question-based post or collaboration may naturally suit more discussion than a simple image update.',
    },
    {
      id: 'ig-c-ps-profile',
      quantity: 'Your Profile Size',
      recommendedFor:
        'The same number of comments can look different on a newer account and an established brand profile.',
    },
    {
      id: 'ig-c-ps-quantity',
      quantity: 'The Quantity You Actually Want',
      recommendedFor:
        'Choose based on the individual piece of content instead of automatically selecting the largest option.',
    },
  ],
  bottomNote: 'Compare Instagram Comments Packages',
};

config.bestPractices = {
  id: 'affordable-instagram-comments-usa',
  title: 'Looking for Affordable Instagram Comments in the USA?',
  description:
    "If you're searching for cheap Instagram Comments in the USA, price will naturally be part of the comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Instagram Comments service should make those details clear before checkout. NovaLikes lets you compare the available options, quantities and pricing before choosing.',
  items: [
    {
      id: 'ig-c-bp-1',
      title: 'Comment Package Type',
      description: 'Review what comment package types are offered.',
      icon: 'users',
    },
    {
      id: 'ig-c-bp-2',
      title: 'Number of Comments Included',
      description: 'Check how many Comments are included.',
      icon: 'heart',
    },
    {
      id: 'ig-c-bp-3',
      title: 'Current Price',
      description: 'Compare pricing before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-bp-4',
      title: 'Supported Post or Reel Requirements',
      description: 'Confirm what public content URL is required.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-bp-5',
      title: 'Password Policy',
      description: 'Check whether your Instagram password is requested.',
      icon: 'lock',
    },
    { id: 'ig-c-bp-6', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    {
      id: 'ig-c-bp-7',
      title: 'What the Provider Actually Changes',
      description: 'Understand what the package actually changes.',
      icon: 'headphones',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-comments-usa',
  title: 'Common Mistakes When Buying Instagram Comments',
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
    'buy-instagram-likes': {
      title: 'Instagram Likes',
      description:
        'Choose Likes when you want more visible engagement on an eligible public post or Reel.',
      ctaLabel: 'Buy Instagram Likes',
    },
    'buy-instagram-views': {
      title: 'Instagram Views',
      description:
        'Choose Views when you want to increase the displayed View count on an eligible public Reel or video.',
      ctaLabel: 'Buy Instagram Views',
    },
  },
};

dummy.whyBuy = {
  id: 'which-posts-best-suited-instagram-comments-usa',
  title: 'Which Instagram Posts Are Best Suited to More Comments?',
  description:
    'Not every Instagram post needs additional conversation. Start with content that gives people something clear to react to.',
  items: [
    {
      id: 'ig-c-wb-launch',
      title: 'Product Launches',
      description: 'A launch post can naturally create questions and discussion around the product.',
    },
    {
      id: 'ig-c-wb-collab',
      title: 'Creator Collaborations',
      description: 'Partnership content often gives viewers more to talk about than routine posts.',
    },
    {
      id: 'ig-c-wb-opinion',
      title: 'Opinion and Discussion Posts',
      description: 'Questions, comparisons and opinion-based content naturally fit a comment-focused format.',
    },
    {
      id: 'ig-c-wb-announcement',
      title: 'Business Announcements',
      description: 'A new service, location, event or company update may create genuine questions.',
    },
    {
      id: 'ig-c-wb-educational',
      title: 'Educational Content',
      description: 'Useful posts and Reels can naturally invite follow-up discussion.',
    },
    {
      id: 'ig-c-wb-portfolio',
      title: 'Portfolio Content',
      description: 'Creators and service businesses can support content that represents their strongest work.',
    },
  ],
  bottomNote: 'Choose the post first. Then decide whether a comment-focused package actually fits it.',
};

dummy.howToBuy = {
  id: 'how-instagram-comments-order-works-usa',
  title: 'How Your Instagram Comments Order Works',
  description: 'Choose your content, compare package options, submit the URL and complete checkout without your password.',
  steps: [
    {
      id: 'ig-c-step-1',
      title: 'Choose the Content',
      description: 'Start with the exact public Instagram post or Reel you want to support.',
    },
    {
      id: 'ig-c-step-2',
      title: 'Select a Comment Option',
      description: 'Compare the available comment package types and current pricing.',
    },
    {
      id: 'ig-c-step-3',
      title: 'Choose the Quantity',
      description: 'Select the number of comments that fits the individual post.',
    },
    {
      id: 'ig-c-step-4',
      title: 'Submit the Direct URL',
      description: 'Paste the correct public post or Reel link.',
    },
    {
      id: 'ig-c-step-5',
      title: 'Review the Order',
      description: 'Check the package, quantity, content URL and current price.',
    },
    {
      id: 'ig-c-step-6',
      title: 'Complete Checkout',
      description: 'Place the order without sharing your Instagram password.',
    },
    {
      id: 'ig-c-step-7',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterward for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Instagram Services';
dummy.relatedIntro =
  'Choose Followers for your profile, Likes for eligible posts or Reels, or Views for eligible Reels and videos.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Comments in the USA?',
  text: 'You can buy Instagram Comments in the USA through NovaLikes for eligible public posts and Reels. Choose an available comment package and quantity, submit the exact public Instagram content URL and complete checkout without sharing your password. Comments apply to the selected content and do not automatically increase your Instagram Followers, Likes or Views.',
};

dummy.storySections = [
  {
    id: 'built-for-us',
    title: 'Built for US Creators, Businesses and Brands',
    lead: 'Instagram Comments can support different types of content depending on the account behind them.',
    paragraphs: [
      'A creator in Los Angeles may use Comments around collaboration or opinion content. An ecommerce brand in New York may use them around product drops and launches. A local business in Miami, Houston, Chicago, Dallas or another US market may publish content that naturally creates questions about services, locations or availability. An agency may manage engagement-focused campaigns for several clients.',
      'That means your comment strategy should fit the post.',
    ],
    footer: 'Comments can support visible interaction. The post behind them still needs context.',
    items: [
      {
        title: 'Creators',
        body: 'Use Comments around content that naturally invites reactions, questions or discussion.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Focus on launches, new collections and posts where customer interest may create conversation.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Instagram content to show real services, projects, locations and updates people may ask about.',
      },
      {
        title: 'Agencies',
        body: 'Choose package types and quantities according to the individual client campaign.',
      },
      {
        title: 'Established Brands',
        body: 'Support priority content while maintaining a consistent brand voice and genuine customer communication.',
      },
    ],
  },
  {
    id: 'build-conversation',
    title: 'Build Conversation Around Content That Gives People Something to Say',
    lead: 'Comments work best when the post itself gives viewers a reason to react. That starts with the content.',
    footer: 'Purchased Comments can add visible conversation. The content gives that conversation meaning.',
    items: [
      {
        title: 'Ask Better Questions',
        body: 'Give people a clear subject to respond to rather than adding a generic “Thoughts?” at the end.',
      },
      { title: 'Explain the Context', body: 'Use the caption to make the topic, product or idea easier to understand.' },
      {
        title: 'Use Relevant Creative',
        body: "The image, carousel or Reel should match the conversation you're trying to support.",
      },
      { title: 'Keep the Post Specific', body: 'A clear subject creates stronger context than vague promotional content.' },
      {
        title: 'Connect the Post to the Profile',
        body: 'If someone visits your account afterward, the profile should reinforce the same niche, creator identity or business.',
      },
    ],
  },
  {
    id: 'us-campaign-moments',
    title: 'Put More Conversation Behind Important US Campaign Content',
    lead: 'Some posts naturally matter more because of the campaign around them.',
    footer:
      'Comments can support visible interaction. The actual campaign still depends on accurate information and a strong offer.',
    items: [
      {
        title: 'Black Friday and Cyber Monday',
        body: 'US ecommerce and retail brands may have launch posts, deal announcements and product content where visible discussion fits the campaign.',
      },
      {
        title: 'Product Drops',
        body: 'Support posts where viewers may naturally ask about features, sizes, colors or availability.',
      },
      {
        title: 'Holiday Campaigns',
        body: 'Thanksgiving, Christmas and New Year promotions can create content that invites questions and reactions.',
      },
      {
        title: 'Back-to-School Campaigns',
        body: 'Retail, education, fashion and technology brands may have seasonal content where discussion makes sense.',
      },
      {
        title: 'Creator Partnerships',
        body: 'Collaboration posts can naturally generate questions or reactions around the people and brands involved.',
      },
      {
        title: 'New Location Announcements',
        body: 'Businesses opening in another city or state may receive questions about services, hours or availability.',
      },
    ],
  },
  {
    id: 'make-comments-fit',
    title: 'Make the Comments Fit the Post',
    lead: 'A comment section should make sense next to the content above it. For example:',
    paragraphs: [
      'A restaurant Reel may attract comments about the dish or location. A renovation post may lead to questions about the project. A beauty Reel may create questions about the treatment or product. A product launch may invite questions about sizing, color, price or availability. A creator collaboration may generate reactions to the partnership. An educational post may create follow-up questions.',
    ],
    footer: 'More comments are not automatically better if they feel disconnected from the content. Relevance matters.',
  },
  {
    id: 'reply-genuine',
    title: 'Reply to Genuine Instagram Comments Yourself',
    lead: 'Purchased Comments and genuine audience interaction are not the same thing. When real people leave genuine questions or feedback, your own responses matter.',
    paragraphs: [
      'For US businesses, that may mean answering questions about pricing, service areas, opening hours, shipping, availability, appointments, products, locations and bookings. For creators, it may mean responding to genuine questions, reactions or discussion around the content.',
    ],
    footer: 'Use your own knowledge when answering real people. That keeps your public communication accurate and useful.',
  },
  {
    id: 'trust-management',
    title: 'Build Trust Through Better Comment Management',
    lead: 'The comment section becomes part of the public experience around your account. Treat it accordingly.',
    footer: 'Visible activity can support presentation. Trust comes from accurate communication.',
    items: [
      {
        title: 'Answer Genuine Questions Accurately',
        body: "Don't guess when someone asks about a real product, service or business policy.",
      },
      {
        title: "Don't Invent Customer Experiences",
        body: 'Fabricated testimonials or customer stories create trust problems.',
      },
      { title: 'Moderate Spam', body: 'Remove irrelevant spam where appropriate.' },
      {
        title: 'Handle Complaints Properly',
        body: 'If a real customer raises a problem, handle it through your normal customer-service process.',
      },
      {
        title: 'Keep Your Tone Consistent',
        body: 'Your own replies should sound like the creator or business behind the profile.',
      },
    ],
  },
  {
    id: 'real-experience',
    title: 'Use Comments Around Real Experience and Expertise',
    lead: 'Some of the strongest Instagram content comes from things you genuinely know or do.',
    footer: 'Comments work better when the underlying content has something worth responding to.',
    items: [
      { title: "Projects You've Completed", body: 'Show real work and give viewers something specific to discuss.' },
      {
        title: 'Products You Actually Sell',
        body: 'Use accurate information when answering real questions.',
      },
      {
        title: 'Processes You Understand',
        body: 'Explain how something works when it reflects genuine expertise.',
      },
      {
        title: 'Customer Questions',
        body: 'Turn recurring questions into posts or Reels, then answer genuine follow-up comments.',
      },
      {
        title: 'Your Own Perspective',
        body: 'Original experience can create stronger discussion than generic repeated advice.',
      },
    ],
  },
  {
    id: 'social-proof',
    title: 'Comments Can Support Social Proof Without Replacing Customer Proof',
    paragraphs: [
      'Visible conversation can contribute to how active a post appears. But Comments are not the same as genuine customer evidence.',
      'For businesses, stronger trust may also come from verified reviews, authentic testimonials, real customer comments, customer-created content, completed projects, case studies, accurate business information and responsive customer service.',
      'If your business has genuine proof, show it.',
    ],
    footer: 'Comments can support presentation. Real customer experiences provide stronger credibility.',
  },
  {
    id: 'organic-reach',
    title: 'Instagram Comments and Organic Reach Are Not the Same Thing',
    lead: 'More Comments do not automatically mean Instagram will distribute the post more widely. Buying Instagram Comments should not be treated as a guaranteed way to:',
    bullets: [
      'reach Explore',
      'make a Reel viral',
      'gain organic Followers',
      'increase Likes',
      'add Views',
      'increase organic reach',
      'generate website traffic',
      'secure brand partnerships',
      'create customers',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes Instagram Comments packages are designed around the comments displayed on the selected eligible content.',
      'Organic distribution and genuine audience behavior remain separate outcomes.',
    ],
  },
  {
    id: 'measure-performance',
    title: "Don't Measure a Post by Comment Count Alone",
    lead: 'A visible comment section does not tell you the full story of how genuine users responded. When reviewing your own Instagram performance, also consider:',
    footer: 'Purchased Comments affect one visible metric. Use genuine Instagram Insights and business data for wider decisions.',
    items: [
      { title: 'Genuine Comments', body: 'What are real users actually asking or saying?' },
      { title: 'Shares', body: 'Are people choosing to send the content to others?' },
      { title: 'Saves', body: 'Is the post useful enough for people to return to?' },
      { title: 'Profile Activity', body: 'Does the content encourage genuine users to explore your account?' },
      { title: 'Messages', body: 'Are potential customers or followers contacting you afterward?' },
      {
        title: 'Business Outcomes',
        body: 'Did the content contribute to a lead, booking, sale or another real goal?',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Instagram Comments for US Local Businesses',
    paragraphs: [
      'Comments can work particularly well around local-business content that naturally generates questions.',
      'A restaurant may post a new menu item. A contractor may show a completed project. A salon may showcase a treatment. An interior designer may publish a finished space. A retailer may announce a product release. A real estate business may feature a listing. A local event may create questions about timing or location.',
      "If you're supporting this content with Comments, keep the business information accurate and your genuine replies useful.",
    ],
    footer: 'Visible conversation can strengthen presentation. Local trust comes from the real business behind the post.',
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/us/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-comments'] = {
  title: 'Buy Instagram Comments USA | Posts & Reels | NovaLikes',
  description:
    'Buy Instagram comments in the USA for public posts and Reels. Compare comment packages, order without sharing your password and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/us/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const usIgCommentsFaqs = [
  {
    id: 'us-ig-c-where-buy',
    question: 'Where can I buy Instagram Comments in the USA?',
    answer:
      'You can buy Instagram Comments in the USA through NovaLikes for eligible public posts and Reels. Choose an available comment package, submit the direct public content URL and complete checkout without sharing your password.',
  },
  {
    id: 'us-ig-c-get-more',
    question: 'How can I get more Instagram Comments in the USA?',
    answer:
      'NovaLikes comment packages can add visible Comments to eligible public posts and Reels. For organic conversation, publish content that gives people something relevant to discuss and reply to genuine users yourself.',
  },
  {
    id: 'us-ig-c-cheap',
    question: 'Can I buy cheap Instagram Comments in the USA?',
    answer:
      'NovaLikes offers multiple comment options and quantities so you can compare current pricing. When considering cheaper services, also review package type, password requirements, tracking and support.',
  },
  {
    id: 'us-ig-c-real',
    question: 'What are real Instagram Comments?',
    answer:
      '"Real Instagram Comments" may mean different things depending on the provider. Review the actual package details and what the service promises rather than relying only on that phrase.',
  },
  {
    id: 'us-ig-c-how-many',
    question: 'How many Instagram Comments should I buy?',
    answer:
      'There is no single ideal quantity for every post. Consider the existing conversation, profile size, content purpose and amount of visible interaction you want before choosing.',
  },
  {
    id: 'us-ig-c-reels',
    question: 'Can I buy Instagram Comments for Reels?',
    answer:
      'Yes. Eligible public Instagram Reels can use a Comments package when you submit the correct direct content URL.',
  },
  {
    id: 'us-ig-c-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'us-ig-c-info',
    question: 'What information do I need?',
    answer:
      'You need the direct public URL of the eligible Instagram post or Reel and the comment package and quantity you want.',
  },
  {
    id: 'us-ig-c-cost',
    question: 'How much does it cost to buy Instagram Comments in the USA?',
    answer:
      'Pricing depends on the comment package and quantity you select. NovaLikes displays current options and prices before checkout.',
  },
  {
    id: 'us-ig-c-delivery',
    question: 'How long does it take to get Instagram Comments?',
    answer:
      'Processing time can vary depending on package type, quantity and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'us-ig-c-followers',
    question: 'Will buying Instagram Comments increase my Followers?',
    answer: 'Not automatically. Followers are a separate profile-level metric and service.',
  },
  {
    id: 'us-ig-c-likes-views',
    question: 'Will buying Comments increase my Likes or Views?',
    answer: 'Not automatically. Instagram Likes and Views are separate content-level metrics.',
  },
  {
    id: 'us-ig-c-organic-reach',
    question: 'Will buying Instagram Comments increase organic reach?',
    answer:
      'There is no guarantee. A Comments package changes the visible comment activity on the selected content. Organic distribution depends on separate factors.',
  },
  {
    id: 'us-ig-c-business',
    question: 'Can US businesses buy Instagram Comments?',
    answer:
      'Eligible public posts and Reels used by US businesses, creators, brands, agencies and other supported accounts can use NovaLikes Comments packages.',
  },
  {
    id: 'us-ig-c-local',
    question: 'Can local businesses use Instagram Comments packages?',
    answer:
      'Yes. Eligible public local-business content can use comment packages, particularly when the post naturally supports questions or discussion.',
  },
  {
    id: 'us-ig-c-client',
    question: 'Can I order Instagram Comments for client content?',
    answer:
      "If you're authorized to purchase services for eligible client content, submit the correct public post or Reel URL and review the order carefully.",
  },
  {
    id: 'us-ig-c-wrong-url',
    question: 'What happens if I submit the wrong URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the content link before checkout.',
  },
  {
    id: 'us-ig-c-track',
    question: 'Can I track my Instagram Comments order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('us-ig-c-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...usIgCommentsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United States Instagram Comments content from supplied copy.');
