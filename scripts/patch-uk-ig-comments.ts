/**
 * Apply supplied United Kingdom Instagram Comments copy.
 * Run: npx tsx scripts/patch-uk-ig-comments.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-instagram-comments.json');
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
  title: 'Buy Instagram Comments UK | Comments for Posts & Reels | NovaLikes',
  description:
    'Buy Instagram comments in the UK for public posts and Reels. Compare comment packages, order without sharing your password and track your purchase online.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR THE UK';
hero.title = 'Buy Instagram Comments in the UK and Build More Visible Conversation';
hero.description =
  "Put more visible conversation around the Instagram posts and Reels that matter most. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to buy Instagram Comments for eligible public content without sharing account login details. Choose the comment option and quantity that fits your post, submit the exact public post or Reel URL and complete your order online. Whether you're supporting a product launch, creator collaboration, campaign post, business announcement or content designed to encourage discussion, choose a comment package that fits the conversation around that content.";
hero.primaryCta = { label: 'Choose Your Instagram Comments Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-c-trust-public-url', label: 'Public Post or Reel URL Only' },
  { id: 'ig-c-trust-password', label: 'No Password Required' },
  { id: 'ig-c-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-c-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose an Instagram Comments Package That Fits the Content';
pricing.description =
  'Comments work differently from Likes and Views because they create visible conversation beneath individual content. NovaLikes currently offers comment quantities including 5, 10, 25, 50, 75 and 100 Comments. Different High Quality and Premium package options may be available depending on the quantity selected. A smaller package may suit a focused post. A larger launch, collaboration or campaign may call for something different. Before choosing, consider existing comment activity, the purpose of the content, your profile size and the quantity you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Comments Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'uk-ig-c-where-buy',
  'uk-ig-c-get-more',
  'uk-ig-c-cheap',
  'uk-ig-c-real',
  'uk-ig-c-how-many',
  'uk-ig-c-reels',
  'uk-ig-c-package-options',
  'uk-ig-c-password',
  'uk-ig-c-info',
  'uk-ig-c-cost',
  'uk-ig-c-delivery',
  'uk-ig-c-followers',
  'uk-ig-c-likes-views',
  'uk-ig-c-organic-reach',
  'uk-ig-c-business',
  'uk-ig-c-local',
  'uk-ig-c-client',
  'uk-ig-c-wrong-url',
  'uk-ig-c-track',
];

related.title = 'Explore More Instagram Services';
related.description =
  'Choose Followers for your profile, Likes for eligible posts or Reels, or Views for eligible Reels and videos.';

finalCta.title = 'Build Conversation Around Instagram Content Worth Discussing';
finalCta.description =
  'Choose the post or Reel you want to support, select the Instagram Comments package that fits the content and submit the correct public URL without sharing your login details. Then keep strengthening what a comment count cannot replace: relevant content, genuine audience interaction, accurate replies and conversations people actually want to join.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Comments Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-comments-uk',
  title: 'Why Choose NovaLikes for Instagram Comments?',
  description: 'Buying Instagram Comments should be easy to understand before checkout.',
  items: [
    {
      id: 'ig-c-wc-options',
      title: 'Multiple Comment Options',
      description: 'Compare the currently available package types before choosing.',
      icon: 'users',
    },
    {
      id: 'ig-c-wc-quantities',
      title: 'Flexible Quantities',
      description: 'Select from smaller and larger comment quantities according to the individual post or Reel.',
      icon: 'heart',
    },
    {
      id: 'ig-c-wc-content',
      title: 'Comments for Specific Content',
      description: 'Your order applies to the eligible public content connected to the URL you submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-wc-password',
      title: 'No Instagram Password Required',
      description: 'NovaLikes does not need your Instagram password, verification codes or private account access.',
      icon: 'lock',
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
      description: 'Complete your order through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'ig-c-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes tracking afterwards for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'ig-c-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with your relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-instagram-comments-without-login-uk',
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
    'Before checkout, open the link yourself and confirm that it leads directly to the content you want to use. A general Instagram profile URL is not the correct target for a Comments order.',
};

config.doesBuyingHelp = {
  id: 'real-instagram-comments-uk',
  title: 'Looking for “Real Instagram Comments”? Check the Package Details First',
  description:
    '"Real Instagram Comments" is a common phrase used when comparing engagement services. You may also see high-quality Instagram Comments, premium Instagram Comments or natural Instagram Comments. Different providers may define those labels differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What type of comments am I ordering?',
    'How many Comments are included?',
    'Which post or Reel receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Instagram Comments Packages Do',
  limitItems: ['Add Comments to the eligible public content submitted with the order'],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Followers, Likes, Views, reach, customers or sales. Clear expectations make comparison easier.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-comments-order-uk',
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
      title: 'Do Not Delete It During Processing',
      description: 'Removing the target post or Reel may interfere with an active order.',
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
  id: 'comments-likes-views-followers-uk',
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
    href: ukHref('/buy-instagram-likes'),
    ctaLabel: 'Buy Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count displayed on an eligible Reel or video',
    bestFor: 'Video content',
    href: ukHref('/buy-instagram-views'),
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Comments for conversation. Choose Likes for visible engagement. Choose Views for video content. Choose Followers for profile audience size. One service does not automatically include the others.',
  commentsHref: ukHref('/buy-instagram-followers'),
};

config.beforeBuying = {
  id: 'before-you-buy-instagram-comments-uk',
  title: 'Before You Buy Instagram Comments in the UK',
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
      description: 'Compare the available High Quality, Premium or other current package options before selecting one.',
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
      description: 'Confirm the package and total before checkout.',
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
  id: 'instagram-comment-strategy-uk',
  title: 'A Practical Instagram Comment Strategy for UK Accounts',
  description:
    'Comments can support selected content, but stronger community growth requires more than one visible number.',
  eyebrow: 'Comment Strategy',
  closingNote:
    'Visible conversation can support a post. Long-term community growth comes from useful content and genuine interaction.',
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
      description: 'Explain the topic, product, story or question properly.',
      icon: 'heart',
    },
    {
      id: 'ig-c-ww-priority',
      title: 'Focus on Priority Posts',
      description: 'Do not apply the same comment strategy to every piece of content.',
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
  id: 'choose-comment-package-uk',
  title: 'Choose an Instagram Comments Package That Fits the Content',
  description:
    'Comments work differently from Likes and Views because they create visible conversation beneath individual content. NovaLikes currently offers comment quantities including 5, 10, 25, 50, 75 and 100 Comments.',
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
        'A product launch, question-based Reel or collaboration may naturally suit more discussion than a simple image update.',
    },
    {
      id: 'ig-c-ps-profile',
      quantity: 'Your Profile Size',
      recommendedFor:
        'The same number of Comments can look different on a newer profile and an established brand account.',
    },
    {
      id: 'ig-c-ps-conversation',
      quantity: 'The Type of Conversation',
      recommendedFor:
        'Think about whether the post naturally gives people something relevant to discuss.',
    },
    {
      id: 'ig-c-ps-quantity',
      quantity: 'The Quantity You Actually Want',
      recommendedFor:
        'Choose around the individual piece of content rather than automatically selecting the largest package.',
    },
  ],
  bottomNote: 'Compare Instagram Comments Packages',
};

config.bestPractices = {
  id: 'affordable-instagram-comments-uk',
  title: 'Looking for Affordable Instagram Comments in the UK?',
  description:
    "If you're searching for cheap Instagram Comments in the UK, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Instagram Comments service should make those details clear before checkout. NovaLikes lets you compare the available options, quantities and current prices before choosing.',
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
      title: 'Customer Support',
      description: 'Support should be available if you need help.',
      icon: 'headphones',
    },
    {
      id: 'ig-c-bp-8',
      title: 'Relevant Service Policies',
      description: 'Review applicable service policies before paying.',
      icon: 'shield-check',
    },
    {
      id: 'ig-c-bp-9',
      title: 'What the Provider Actually Changes',
      description: 'Understand what the package actually changes.',
      icon: 'sparkles',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-comments-uk',
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
  id: 'which-posts-best-suited-instagram-comments-uk',
  title: 'Which Instagram Posts Are Best Suited to More Comments?',
  description:
    'Not every post needs additional conversation. Start with content that already gives people something clear to react to.',
  items: [
    {
      id: 'ig-c-wb-launch',
      title: 'Product Launches',
      description: 'A new product can naturally create questions around features, colours, availability or use.',
    },
    {
      id: 'ig-c-wb-collab',
      title: 'Creator Collaborations',
      description: 'Partnership content can generate discussion around the creator, brand or campaign.',
    },
    {
      id: 'ig-c-wb-opinion',
      title: 'Opinion and Discussion Posts',
      description: 'Questions, comparisons and opinion-led content naturally fit a comment-focused format.',
    },
    {
      id: 'ig-c-wb-announcement',
      title: 'Business Announcements',
      description: 'A new service, location, event or company update may create genuine questions.',
    },
    {
      id: 'ig-c-wb-educational',
      title: 'Educational Content',
      description: 'Useful posts and Reels can naturally lead to follow-up discussion.',
    },
    {
      id: 'ig-c-wb-portfolio',
      title: 'Portfolio Content',
      description: 'Creators and service businesses can support content representing work they genuinely want potential clients to see.',
    },
    {
      id: 'ig-c-wb-community',
      title: 'Community Content',
      description: 'Local events, industry topics and relevant community updates may naturally invite conversation.',
    },
  ],
  bottomNote: 'Choose the post first. Then decide whether a Comments package makes sense around it.',
};

dummy.howToBuy = {
  id: 'how-instagram-comments-order-works-uk',
  title: 'How Your Instagram Comments Order Works',
  description:
    'Choose your content, compare package options, select quantity, submit the URL, review your order and complete checkout without your password.',
  steps: [
    {
      id: 'ig-c-step-1',
      title: 'Choose the Content',
      description: 'Start with the exact public Instagram post or Reel you want to support.',
    },
    {
      id: 'ig-c-step-2',
      title: 'Select a Comment Option',
      description: 'Compare the available comment package types and current prices.',
    },
    {
      id: 'ig-c-step-3',
      title: 'Choose the Quantity',
      description: 'Select the number of Comments that fits the individual post.',
    },
    {
      id: 'ig-c-step-4',
      title: 'Submit the Direct URL',
      description: 'Paste the correct public post or Reel link.',
    },
    {
      id: 'ig-c-step-5',
      title: 'Review Your Order',
      description: 'Check the package, quantity, content URL and current price.',
    },
    {
      id: 'ig-c-step-6',
      title: 'Complete Checkout',
      description: 'Place your order without sharing your Instagram password.',
    },
    {
      id: 'ig-c-step-7',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking afterwards for available updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Instagram Services';
dummy.relatedIntro =
  'Choose Followers for your profile, Likes for eligible posts or Reels, or Views for eligible Reels and videos.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Comments in the UK?',
  text: 'You can buy Instagram Comments in the UK through NovaLikes for eligible public Instagram posts and Reels. Choose an available comment package and quantity, submit the direct public content URL and complete checkout without sharing your Instagram password. Comments apply to the selected post or Reel. They do not automatically increase your Instagram Followers, Likes or Views.',
};

dummy.storySections = [
  {
    id: 'built-for-uk',
    title: 'Built for UK Creators, Businesses and Brands',
    lead: 'Instagram Comments can play different roles depending on the account behind the content.',
    paragraphs: [
      'A creator in London may use Comments around collaboration, opinion or lifestyle content. An ecommerce brand in Manchester may use them around product drops and launches. A local business in Birmingham, Leeds, Liverpool, Glasgow, Bristol or another UK market may publish content that naturally creates questions about services, locations or availability. An agency may manage engagement-focused campaigns for several clients.',
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
        body: 'Focus on launches, collections and product content where conversation makes sense.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Instagram to show genuine services, projects, locations and updates that customers may want to ask about.',
      },
      {
        title: 'Agencies',
        body: 'Choose comment options and quantities according to each client\'s actual campaign.',
      },
      {
        title: 'Established Brands',
        body: 'Support priority content while maintaining consistent brand communication and genuine community management.',
      },
    ],
  },
  {
    id: 'uk-campaign-moments',
    title: 'Put More Conversation Behind Important UK Campaign Moments',
    lead: 'Some Instagram content becomes more important at particular times of year.',
    footer:
      'Comments can support visible conversation. The campaign itself still depends on accurate information and a useful offer.',
    items: [
      {
        title: 'Black Friday',
        body: 'UK ecommerce and retail brands may have launch posts, offers and product content where visible conversation fits naturally.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use Instagram alongside email, paid media and ecommerce campaigns.',
      },
      {
        title: 'Boxing Day',
        body: 'Retailers and ecommerce brands may have another major sales period where product questions and campaign discussion can increase.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Gift guides, seasonal products, restaurant offers, events and festive content may create useful discussion.',
      },
      {
        title: 'January Sales',
        body: 'Retail brands may continue promotional activity into January.',
      },
      {
        title: 'Product Launches',
        body: 'Support content where viewers may naturally ask about specifications, colours, availability or delivery.',
      },
      {
        title: 'Creator Partnerships',
        body: 'Collaboration posts can create questions and reactions around the people and brands involved.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses expanding into another town or city may publish content that leads to questions about opening dates, services or availability.',
      },
    ],
  },
  {
    id: 'build-conversation',
    title: 'Build Conversation Around Content That Gives People Something to Discuss',
    lead: 'Comments work best when the post itself has a clear subject. That starts with the content.',
    footer: 'Purchased Comments can add visible conversation. The content gives that conversation meaning.',
    items: [
      {
        title: 'Ask Better Questions',
        body: 'Give viewers something specific to respond to rather than using a generic call for comments.',
      },
      { title: 'Explain the Context', body: 'Use the caption to make the topic, product, project or idea easier to understand.' },
      {
        title: 'Use Relevant Creative',
        body: "The image, carousel or Reel should support the conversation you're trying to build.",
      },
      { title: 'Keep the Topic Focused', body: 'One clear subject creates stronger context than vague promotional content.' },
      {
        title: 'Connect the Post to the Profile',
        body: 'If someone explores your account afterwards, the profile should reinforce the same niche, business or brand.',
      },
    ],
  },
  {
    id: 'make-comments-fit',
    title: 'Make the Comments Fit the Post',
    lead: 'Comment relevance matters. A comment section should make sense next to the content above it.',
    paragraphs: [
      'A restaurant Reel may attract discussion about the food, menu or location. A renovation post may naturally lead to questions about the project. A beauty Reel may create questions about the treatment or product. A clothing launch may invite discussion around fit, sizing or colours. An estate agency post may create questions about a property. A creator collaboration may generate reactions to the partnership. An educational post may invite useful follow-up questions.',
    ],
    footer: 'More Comments are not automatically better if the conversation feels disconnected from the content. Context matters.',
  },
  {
    id: 'reply-genuine',
    title: 'Reply to Genuine Instagram Comments Yourself',
    lead: 'Purchased Comments and genuine audience interaction are different things. When real people leave genuine questions or feedback, your own replies matter.',
    paragraphs: [
      'For UK businesses, that may mean answering questions about prices, service areas, opening hours, delivery, availability, appointments, products, locations and bookings. For creators, it may mean responding to genuine questions or reactions around the content.',
    ],
    footer: 'Use your own knowledge when answering real people. That keeps your public communication accurate and useful.',
  },
  {
    id: 'trust-management',
    title: 'Build Trust Through Better Comment Management',
    lead: 'The comment section becomes part of the public experience around your account. Treat it accordingly.',
    footer: 'Visible conversation can support presentation. Trust comes from accurate communication.',
    items: [
      {
        title: 'Answer Genuine Questions Accurately',
        body: 'Do not guess when someone asks about a real product, service or company policy.',
      },
      {
        title: 'Do Not Invent Customer Experiences',
        body: 'Fabricated testimonials or customer stories can weaken trust.',
      },
      { title: 'Moderate Irrelevant Spam', body: 'Keep the conversation useful where appropriate.' },
      {
        title: 'Handle Complaints Properly',
        body: 'If a real customer raises an issue, deal with it through your genuine customer-service process.',
      },
      {
        title: 'Keep Your Tone Consistent',
        body: 'Your own replies should sound like the creator or business behind the account.',
      },
    ],
  },
  {
    id: 'real-experience',
    title: 'Use Comments Around Real Experience and Expertise',
    lead: 'Some of the strongest Instagram content comes from things you genuinely know or do.',
    footer: 'Comments work better when the underlying content has something worth responding to.',
    items: [
      { title: "Projects You've Completed", body: 'Show real work and give people something specific to discuss.' },
      {
        title: 'Products You Actually Sell',
        body: 'Use accurate product information when responding to genuine questions.',
      },
      {
        title: 'Processes You Understand',
        body: 'Explain how something works when it reflects genuine expertise.',
      },
      {
        title: 'Customer Questions',
        body: 'Turn recurring questions into posts and Reels, then answer genuine follow-up comments.',
      },
      {
        title: 'Your Own Perspective',
        body: 'Original experience can create more useful conversation than generic repeated advice.',
      },
    ],
  },
  {
    id: 'social-proof',
    title: 'Comments Can Support Social Proof Without Replacing Customer Proof',
    paragraphs: [
      'Visible conversation can contribute to how active a post appears. But Comments are not the same as genuine customer evidence.',
      'For UK businesses, stronger trust may also come from verified reviews, authentic testimonials, real customer comments, customer-created content, completed projects, case studies, accurate company information and responsive customer service.',
      'If your business has genuine proof, use it.',
    ],
    footer: 'Comments can support presentation. Actual customer experiences provide stronger credibility.',
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
      'NovaLikes Instagram Comments packages are designed around comments displayed on the selected eligible content.',
      'Organic distribution and genuine audience behaviour remain separate outcomes.',
    ],
  },
  {
    id: 'measure-performance',
    title: 'Do Not Measure a Post by Comment Count Alone',
    lead: 'A visible comment section does not tell you the full story of how genuine users responded. When reviewing actual Instagram performance, also consider:',
    footer: 'Purchased Comments affect one visible metric. Use genuine Instagram Insights and business data for wider decisions.',
    items: [
      { title: 'Genuine Comments', body: 'What are real users actually asking or saying?' },
      { title: 'Shares', body: 'Are people choosing to send the content to others?' },
      { title: 'Saves', body: 'Is the post useful enough for users to return to?' },
      { title: 'Profile Activity', body: 'Does the content encourage genuine viewers to explore the account?' },
      { title: 'Messages', body: 'Are real potential customers or followers contacting you?' },
      {
        title: 'Business Outcomes',
        body: 'Did the post contribute to an enquiry, booking, sale or another genuine objective?',
      },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Instagram Comments for UK Local Businesses',
    paragraphs: [
      'Comments can work particularly well around local-business content that naturally generates questions.',
      'A restaurant may post a new menu item. A builder may show a completed project. A salon may showcase a treatment. An interior designer may publish a finished space. A retailer may announce new stock. An estate agency may feature a property. A local event may create questions around timing or location. A professional service may answer a common customer concern.',
      "If you're supporting this content with Comments, keep the business information accurate and your genuine replies useful.",
    ],
    footer: 'Visible conversation can strengthen presentation. Local trust comes from the real business behind the post.',
  },
  {
    id: 'instagram-insights',
    title: 'Use Instagram Insights to Understand Genuine Conversation',
    lead: 'Purchased Comments change one visible metric. Your genuine account analytics and actual audience responses can tell you much more. Look at:',
    footer: 'Use genuine audience behaviour to improve future content. Do not rely only on the public comment count.',
    items: [
      { title: 'Genuine Comment Themes', body: 'What questions or topics appear repeatedly?' },
      { title: 'Shares and Saves', body: 'Which posts are useful enough for real users to keep or send to others?' },
      { title: 'Profile Activity', body: 'Does the content encourage genuine viewers to explore the account?' },
      { title: 'Organic Engagement', body: 'Which content creates authentic Likes, Comments and other interactions?' },
      { title: 'Customer Questions', body: 'For businesses, real questions can reveal information customers need before buying.' },
    ],
  },
  {
    id: 'comment-strategy',
    title: 'A Practical Instagram Comment Strategy for UK Accounts',
    lead: 'Comments can support selected content, but stronger community growth requires more than one visible number.',
    items: [
      { title: 'Publish Content With a Clear Subject', body: 'Give people something specific to react to.' },
      { title: 'Use Captions for Context', body: 'Explain the topic, product, story or question properly.' },
      { title: 'Focus on Priority Posts', body: 'Do not apply the same comment strategy to every piece of content.' },
      { title: 'Reply to Genuine People', body: 'Real conversations deserve real responses.' },
      { title: 'Learn From Real Questions', body: 'Repeated audience questions can reveal useful future content ideas.' },
      { title: 'Review Genuine Analytics', body: 'Use your actual account performance to understand organic interaction.' },
      { title: 'Moderate Where Necessary', body: 'Keep irrelevant activity from weakening the public conversation.' },
      {
        title: 'Connect Instagram to Wider Marketing',
        body: 'UK businesses may use Instagram alongside SEO, Google Ads, ecommerce, local search, email and their website.',
      },
      {
        title: 'Keep Comments in Perspective',
        body: 'Visible conversation can support a post. Long-term community growth comes from useful content and genuine interaction.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-comments'] = {
  title: 'Buy Instagram Comments UK | Comments for Posts & Reels | NovaLikes',
  description:
    'Buy Instagram comments in the UK for public posts and Reels. Compare comment packages, order without sharing your password and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const ukIgCommentsFaqs = [
  {
    id: 'uk-ig-c-where-buy',
    question: 'Where can I buy Instagram Comments in the UK?',
    answer:
      'You can buy Instagram Comments in the UK through NovaLikes for eligible public posts and Reels. Choose an available comment package, submit the direct public content URL and complete checkout without sharing your password.',
  },
  {
    id: 'uk-ig-c-get-more',
    question: 'How can I get more Instagram Comments in the UK?',
    answer:
      'NovaLikes Comments packages can add visible Comments to eligible public posts and Reels. For organic conversation, continue publishing content that gives genuine users something relevant to discuss and respond to real comments yourself.',
  },
  {
    id: 'uk-ig-c-cheap',
    question: 'Can I buy cheap Instagram Comments in the UK?',
    answer:
      'NovaLikes offers multiple comment options and quantities so you can compare current prices. When comparing lower-cost services, also review package type, password requirements, tracking and support.',
  },
  {
    id: 'uk-ig-c-real',
    question: 'What are real Instagram Comments?',
    answer:
      '"Real Instagram Comments" can mean different things depending on the provider. Review the actual package details and service promises instead of relying only on that phrase.',
  },
  {
    id: 'uk-ig-c-how-many',
    question: 'How many Instagram Comments should I buy?',
    answer:
      'There is no single ideal quantity for every post. Consider the existing conversation, profile size, content purpose and amount of visible interaction you want before choosing.',
  },
  {
    id: 'uk-ig-c-reels',
    question: 'Can I buy Instagram Comments for Reels?',
    answer:
      'Yes. Eligible public Instagram Reels can use a Comments package when you submit the correct direct content URL.',
  },
  {
    id: 'uk-ig-c-package-options',
    question: 'What comment package options does NovaLikes offer?',
    answer:
      'NovaLikes currently shows multiple comment package options, including High Quality and Premium choices, with different quantities and prices. Review the current selector before ordering.',
  },
  {
    id: 'uk-ig-c-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'uk-ig-c-info',
    question: 'What information do I need?',
    answer:
      'You need the direct public URL of the eligible Instagram post or Reel and the comment package and quantity you want.',
  },
  {
    id: 'uk-ig-c-cost',
    question: 'How much does it cost to buy Instagram Comments in the UK?',
    answer:
      'Pricing depends on the package type and quantity selected. NovaLikes displays the current options and prices before checkout.',
  },
  {
    id: 'uk-ig-c-delivery',
    question: 'How long does it take to get Instagram Comments?',
    answer:
      'Processing time can vary depending on package type, quantity and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-ig-c-followers',
    question: 'Will buying Instagram Comments increase my Followers?',
    answer: 'Not automatically. Instagram Followers are a separate profile-level metric and service.',
  },
  {
    id: 'uk-ig-c-likes-views',
    question: 'Will buying Comments increase my Likes or Views?',
    answer: 'Not automatically. Instagram Likes and Views are separate content-level metrics.',
  },
  {
    id: 'uk-ig-c-organic-reach',
    question: 'Will buying Instagram Comments increase organic reach?',
    answer:
      'There is no guarantee. A Comments package changes the visible comments on the selected content. Organic distribution depends on separate factors.',
  },
  {
    id: 'uk-ig-c-business',
    question: 'Can UK businesses buy Instagram Comments?',
    answer:
      'Eligible public posts and Reels used by UK businesses, creators, brands and agencies can use the relevant NovaLikes Comments packages.',
  },
  {
    id: 'uk-ig-c-local',
    question: 'Can local businesses use Instagram Comments packages?',
    answer:
      'Yes. Eligible public local-business content can use comment packages, particularly when the post naturally supports questions or discussion.',
  },
  {
    id: 'uk-ig-c-client',
    question: 'Can I order Instagram Comments for client content?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public post or Reel URL and review the order details carefully.",
  },
  {
    id: 'uk-ig-c-wrong-url',
    question: 'What happens if I submit the wrong URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order information. Always verify the direct content link before checkout.',
  },
  {
    id: 'uk-ig-c-track',
    question: 'Can I track my Instagram Comments order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('uk-ig-c-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...ukIgCommentsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom Instagram Comments content from supplied copy.');
