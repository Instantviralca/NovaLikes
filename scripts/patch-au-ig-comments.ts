/**
 * Apply supplied Australia Instagram Comments copy.
 * Run: npx tsx scripts/patch-au-ig-comments.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AU = '/au';
const file = path.join(process.cwd(), 'content/markets/au/services/buy-instagram-comments.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const dummy = data.dummy as Record<string, unknown>;
const config = dummy.config as Record<string, unknown>;

const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;

function auHref(href: string): string {
  if (href.startsWith('/buy-')) return `${AU}${href}`;
  return href;
}

content.seo = {
  title: 'Buy Instagram Comments Australia | Posts & Reels | NovaLikes',
  description:
    'Buy Instagram comments in Australia for public posts and Reels. Compare comment packages, order without sharing your password and track your purchase online.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR AUSTRALIA';
hero.title = 'Buy Instagram Comments in Australia and Build More Visible Conversation';
hero.description =
  'Add more visible interaction around the Instagram posts and Reels that matter most. NovaLikes gives Australian creators, businesses, brands and agencies a simple way to buy Instagram comments for eligible public content without sharing account login details. Choose the comment option and quantity that fits your post, submit the exact public URL and complete your order online. Whether you\'re supporting a product launch, campaign post, creator collaboration, business announcement or content built around discussion, choose a comment package that makes sense for the conversation you\'re trying to create around that post.';
hero.primaryCta = { label: 'Choose Your Instagram Comments Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-c-trust-public-url', label: 'Public Post or Reel URL Only' },
  { id: 'ig-c-trust-password', label: 'No Password Required' },
  { id: 'ig-c-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-c-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose Your Instagram Comments Package';
pricing.description =
  'Comments work differently from Likes or Views because they create visible conversation beneath a specific post or Reel. NovaLikes currently offers multiple comment package options with quantities including 5, 10, 25, 50, 75 and 100 Comments. Choose based on the type of post you\'re supporting. A small discussion-focused post may only need a modest quantity. A launch, campaign or important piece of creator content may call for more. Before ordering, consider the existing comment activity, the purpose of the content, your profile size and the quantity you actually want rather than automatically selecting the largest available package.';
pricing.primaryCtaLabel = 'Compare Instagram Comments Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'au-ig-c-where-buy',
  'au-ig-c-get-more',
  'au-ig-c-cheap',
  'au-ig-c-real',
  'au-ig-c-how-many',
  'au-ig-c-reels',
  'au-ig-c-password',
  'au-ig-c-info',
  'au-ig-c-cost',
  'au-ig-c-delivery',
  'au-ig-c-followers',
  'au-ig-c-likes-views',
  'au-ig-c-organic-reach',
  'au-ig-c-business',
  'au-ig-c-local',
  'au-ig-c-older-post',
  'au-ig-c-client',
  'au-ig-c-wrong-url',
  'au-ig-c-track',
];

related.title = 'Explore More Instagram Services';
related.description =
  'Choose Followers for your profile, Likes for eligible posts or Reels, or Views for eligible Reels and videos.';

finalCta.title = 'Build Conversation Around Instagram Content Worth Discussing';
finalCta.description =
  'Choose the post or Reel you want to support, select the Instagram Comments package that fits the content and submit the correct public URL without sharing your login details. Then keep building what a comment count cannot replace: relevant content, genuine customer communication and conversations people actually want to join.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Comments Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-comments-australia',
  title: 'Why Choose NovaLikes for Instagram Comments?',
  description: 'Buying comments should be easy to understand before checkout.',
  items: [
    {
      id: 'ig-c-wc-options',
      title: 'Multiple Comment Options',
      description: 'Compare the currently available package types before choosing.',
      icon: 'users',
    },
    {
      id: 'ig-c-wc-quantities',
      title: 'Flexible Comment Quantities',
      description: 'Choose from smaller and larger comment quantities based on the post or Reel you\'re supporting.',
      icon: 'heart',
    },
    {
      id: 'ig-c-wc-password',
      title: 'No Instagram Password Required',
      description: 'NovaLikes does not need your password, verification codes or private account access.',
      icon: 'lock',
    },
    {
      id: 'ig-c-wc-content',
      title: 'Content-Specific Ordering',
      description: 'Comments are added to the eligible public post or Reel connected to the URL you submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the comment option, quantity and current price before completing checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes order tracking afterward for available status information.',
      icon: 'map-pin',
    },
    {
      id: 'ig-c-wc-support',
      title: 'Customer Support',
      description: 'If something needs checking, contact support with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

config.whyBuyNote = '';
config.orderNotice = '';

config.canYouBuy = {
  id: 'buy-instagram-comments-without-login-australia',
  title: 'Buy Instagram Comments Without Sharing Your Login',
  description:
    'A comments order should not require control of your Instagram account. NovaLikes uses the public content information requested during checkout.',
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
    'Before placing your order, open the URL yourself and make sure it leads directly to the content you want to use. A general Instagram profile link is not the same as a post or Reel URL.',
};

config.doesBuyingHelp = {
  id: 'real-instagram-comments-australia',
  title: 'Looking for “Real Instagram Comments”? Read the Package Details First',
  description:
    '"Real Instagram Comments" is a common phrase people use when comparing engagement services. You may also see terms such as high-quality Instagram Comments, premium Instagram Comments or natural Instagram Comments. Different providers may use those labels differently.',
  helpTitle: 'Before ordering, ask',
  helpItems: [
    'What type of comments am I purchasing?',
    'How many comments are included?',
    'Which post or Reel receives them?',
    'What information do I need to submit?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Instagram Comments Packages Do',
  limitItems: [
    'Add comments to eligible public content submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, Followers, Likes, Views, reach, customers or sales. Clear expectations are more useful than an undefined marketing label.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-comments-order-australia',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected comment package, quantity and submitted Instagram content URL are connected to the purchase. The order is then processed for the intended post or Reel.',
  steps: [
    {
      id: 'ig-c-th-1',
      title: 'Keep the Content Public',
      description:
        'The submitted post or Reel should remain publicly accessible where required.',
    },
    {
      id: 'ig-c-th-2',
      title: "Don't Delete It Mid-Order",
      description: 'Removing the target content can interfere with processing.',
    },
    {
      id: 'ig-c-th-3',
      title: 'Check the URL Carefully',
      description: 'Make sure the order points to the exact content you intended to use.',
    },
    {
      id: 'ig-c-th-4',
      title: 'Track the Order',
      description:
        'Processing time can vary depending on the package, comment quantity and current order conditions. Use NovaLikes order tracking for available updates rather than assuming every order follows one fixed timeline.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'comments-likes-views-followers-australia',
  title: 'Comments, Likes, Views or Followers: Choose by Goal',
  description: 'Different Instagram services affect different metrics.',
  current: {
    title: 'Instagram Comments',
    description: 'Comments displayed on an eligible public post or Reel',
    bestFor: 'Visible conversation on specific content',
    ctaLabel: 'Instagram Comments',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Like count displayed on an eligible public post or Reel',
    bestFor: 'Visible like count on content',
    href: auHref('/buy-instagram-likes'),
    ctaLabel: 'Buy Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count displayed on an eligible Reel or video',
    bestFor: 'Video view count on Reels',
    href: auHref('/buy-instagram-views'),
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Comments for visible discussion around a specific post or Reel. Choose Likes for like count, Views for video count, or Instagram Followers for profile audience size. One service does not automatically include the others.',
  commentsHref: auHref('/buy-instagram-followers'),
};

config.beforeBuying = {
  id: 'before-you-buy-instagram-comments-australia',
  title: 'Before You Buy Instagram Comments in Australia',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'ig-c-bb-content',
      title: 'Confirm the Exact Post or Reel',
      description: 'Open the content you want to use.',
      icon: 'users',
    },
    {
      id: 'ig-c-bb-url',
      title: 'Copy the Direct Public URL',
      description: 'Do not submit only your general Instagram profile link.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-bb-options',
      title: 'Choose the Right Comment Package',
      description: 'Compare the available package options before selecting one.',
      icon: 'credit-card',
    },
    {
      id: 'ig-c-bb-quantity',
      title: 'Check the Quantity',
      description: 'Make sure you\'re ordering the number of comments you actually want.',
      icon: 'shield-check',
    },
    {
      id: 'ig-c-bb-price',
      title: 'Review the Price',
      description: 'Confirm the current package total before checkout.',
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
      description: 'NovaLikes does not require your Instagram login details.',
      icon: 'megaphone',
    },
    {
      id: 'ig-c-bb-metric',
      title: 'Choose the Correct Metric',
      description: 'Comments, Likes, Views and Followers are separate services.',
      icon: 'users',
    },
    {
      id: 'ig-c-bb-policies',
      title: 'Review the Policies',
      description: 'Read the relevant service and refund information before ordering.',
      icon: 'heart',
    },
  ],
};

config.worldwide = {
  id: 'dont-measure-post-by-comments-alone-australia',
  title: "Don't Measure a Post by Comment Count Alone",
  description:
    'A post can have visible comments without telling you the full story of how genuine viewers responded. When evaluating your own Instagram performance, also look at:',
  eyebrow: 'Look Beyond One Metric',
  closingNote:
    'Purchased comments affect one visible metric. Use your genuine Instagram Insights and business data for broader decisions.',
  cards: [
    {
      id: 'ig-c-ww-genuine',
      title: 'Genuine Comments',
      description: 'What are real users actually asking or saying?',
      icon: 'users',
    },
    {
      id: 'ig-c-ww-shares',
      title: 'Shares',
      description: 'Are people choosing to send the content to someone else?',
      icon: 'heart',
    },
    {
      id: 'ig-c-ww-saves',
      title: 'Saves',
      description: 'Is the post useful enough for genuine viewers to return to?',
      icon: 'briefcase',
    },
    {
      id: 'ig-c-ww-profile',
      title: 'Profile Activity',
      description: 'Does the content encourage people to explore your profile?',
      icon: 'clapperboard',
    },
    {
      id: 'ig-c-ww-messages',
      title: 'Direct Messages',
      description: 'Are real customers or followers contacting you afterward?',
      icon: 'megaphone',
    },
    {
      id: 'ig-c-ww-outcomes',
      title: 'Business Outcomes',
      description:
        'Did the content contribute to an enquiry, booking, purchase or another real goal?',
      icon: 'map-pin',
    },
  ],
};

config.packageSizes = {
  id: 'choose-comment-package-australia',
  title: 'Choose a Comment Package That Fits the Content',
  description:
    'Comments work differently from Likes or Views because they create visible conversation beneath a specific post or Reel. NovaLikes currently offers multiple comment package options with quantities including 5, 10, 25, 50, 75 and 100 Comments.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'ig-c-ps-activity',
      quantity: 'The Existing Comment Activity',
      recommendedFor: 'Look at the conversation already happening beneath the post.',
    },
    {
      id: 'ig-c-ps-purpose',
      quantity: 'The Purpose of the Content',
      recommendedFor:
        'A product launch, question-based post or collaboration naturally has more reason for discussion than a simple visual update.',
    },
    {
      id: 'ig-c-ps-profile',
      quantity: 'Your Profile Size',
      recommendedFor:
        'The same number of comments can look very different on a newer creator account and an established brand profile.',
    },
    {
      id: 'ig-c-ps-quantity',
      quantity: 'The Quantity You Actually Want',
      recommendedFor:
        'Choose based on the post rather than automatically selecting the largest available package.',
    },
  ],
  bottomNote: 'Compare Instagram Comments Packages',
};

config.bestPractices = {
  id: 'affordable-instagram-comments-australia',
  title: 'Looking for Affordable Instagram Comments in Australia?',
  description:
    "If you're searching for cheap Instagram Comments in Australia, price will naturally be part of the decision. But compare more than the lowest number.",
  closingNote:
    'An affordable Instagram Comments package should make the important details clear before checkout. NovaLikes lets you compare the available comment options, quantities and pricing before you choose.',
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
      title: 'Supported Posts or Reels',
      description: 'Confirm the service supports the content you want to use.',
      icon: 'sparkles',
    },
    {
      id: 'ig-c-bp-5',
      title: 'Password Policy',
      description: 'Check whether your password is requested.',
      icon: 'lock',
    },
    {
      id: 'ig-c-bp-6',
      title: 'Order Tracking',
      description: 'Check whether status updates are available after checkout.',
      icon: 'map-pin',
    },
    {
      id: 'ig-c-bp-7',
      title: 'Customer Support and Policies',
      description: 'Review support availability and relevant service policies.',
      icon: 'headphones',
    },
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-comments-australia',
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
        'Choose Followers when your goal is to increase the follower count displayed on your public Instagram profile.',
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
        'Choose Views when you want to increase the displayed view count on an eligible public Reel or video.',
      ctaLabel: 'Buy Instagram Views',
    },
  },
};

dummy.whyBuy = {
  id: 'which-posts-best-suited-instagram-comments-australia',
  title: 'Which Posts Are Best Suited to More Comments?',
  description:
    'Not every Instagram post needs additional conversation. Start with content that gives people something clear to react to. The more relevant the content is to conversation, the more natural the comment section can feel.',
  items: [
    {
      id: 'ig-c-wb-launch',
      title: 'Product Launches',
      description:
        'A launch post can naturally create questions, reactions and discussion around the product.',
    },
    {
      id: 'ig-c-wb-collab',
      title: 'Creator Collaborations',
      description:
        'Collaboration content often gives viewers more to talk about than an everyday post.',
    },
    {
      id: 'ig-c-wb-opinion',
      title: 'Opinion Posts',
      description:
        'Questions, comparisons and opinion-based content naturally fit a comment-focused format.',
    },
    {
      id: 'ig-c-wb-announcement',
      title: 'Business Announcements',
      description:
        'A new location, service, event or important company update can be stronger when there is visible conversation around it.',
    },
    {
      id: 'ig-c-wb-educational',
      title: 'Educational Posts',
      description: 'Useful posts and Reels may attract questions about the topic or process.',
    },
    {
      id: 'ig-c-wb-portfolio',
      title: 'Portfolio Content',
      description:
        'Creators and service businesses can support work that represents their skills, projects or style particularly well.',
    },
  ],
  bottomNote: '',
};

dummy.howToBuy = {
  id: 'how-instagram-comments-order-works-australia',
  title: 'How Your Instagram Comments Order Works',
  description: 'The process starts with the content, not your login.',
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
      description: 'Select the number of comments that fits the individual piece of content.',
    },
    {
      id: 'ig-c-step-4',
      title: 'Submit the Direct URL',
      description: 'Paste the correct public post or Reel link.',
    },
    {
      id: 'ig-c-step-5',
      title: 'Review Before Checkout',
      description: 'Check the package, quantity, URL and current price before paying.',
    },
    {
      id: 'ig-c-step-6',
      title: 'Track Your Order',
      description: 'Use NovaLikes order tracking afterward for available status updates.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Instagram Services';
dummy.relatedIntro =
  'Choose Followers for your profile, Likes for eligible posts or Reels, or Views for eligible Reels and videos.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Comments in Australia?',
  text: 'You can buy Instagram comments in Australia through NovaLikes for eligible public posts and Reels. Choose an available comment package and quantity, submit the exact public Instagram content URL and complete checkout without sharing your password. Comments apply to the selected content and do not automatically increase Followers, Likes or Views.',
};

dummy.storySections = [
  {
    id: 'built-for-australia',
    title: 'Built for Australian Creators, Businesses and Brands',
    lead: 'Instagram comments can serve different purposes depending on the account.',
    paragraphs: [
      'An Australian creator may want more visible interaction around a collaboration or opinion-based Reel. An ecommerce brand may use comments around product launches, drops or promotional content. A local business in Sydney, Melbourne, Brisbane, Perth or another Australian market may use Instagram to show work, announce events or answer customer questions. An agency may manage comment-focused engagement around selected client campaigns.',
      'That means comment strategy should match the type of content being published.',
    ],
    footer: 'Comments can strengthen visible interaction. The post behind them still needs context.',
    items: [
      {
        title: 'Creators',
        body: 'Use comments around content that invites reactions, questions or genuine discussion.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Focus on product launches, new collections and campaign content where conversation makes sense.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Instagram posts to show real projects, services, locations and updates that people can ask about.',
      },
      {
        title: 'Agencies',
        body: 'Choose package sizes and comment-focused content based on the individual client and campaign.',
      },
      {
        title: 'Established Brands',
        body: 'Support priority content while maintaining brand tone and consistent communication.',
      },
    ],
  },
  {
    id: 'build-conversation',
    title: 'Build Conversation Around Content That Gives People Something to Say',
    lead: 'Comments work best when the content itself creates a reason for conversation.',
    footer:
      'Purchased comments can add visible conversation. The post itself gives that conversation meaning.',
    items: [
      {
        title: 'Ask Better Questions',
        body: 'Instead of asking something generic like “Thoughts?”, give people a clear subject to respond to.',
      },
      {
        title: 'Explain the Context',
        body: 'A caption should help viewers understand why the post matters.',
      },
      {
        title: 'Use Relevant Creative',
        body: 'The image, carousel or Reel should match the topic being discussed.',
      },
      {
        title: 'Make the Post Specific',
        body: 'A clear subject creates stronger context than vague promotional content.',
      },
      {
        title: 'Keep the Profile Connected',
        body: 'If someone visits your profile after seeing the post, your bio and recent content should reinforce the same brand or niche.',
      },
    ],
  },
  {
    id: 'campaign-moments',
    title: 'Use Comments Around Australian Campaigns That Invite Discussion',
    lead: 'Comments can be particularly useful around content where people would naturally have questions or reactions.',
    footer:
      'Comments can support the visible interaction around these campaigns. The real offer, information and customer experience still determine whether the campaign succeeds.',
    items: [
      {
        title: 'Product Drops',
        body: 'Australian ecommerce brands may use comments around new products, collections or limited releases.',
      },
      {
        title: 'Boxing Day Campaigns',
        body: 'Retail and ecommerce businesses often have major campaign activity around Boxing Day and the wider holiday period.',
      },
      {
        title: 'Summer Launches',
        body: 'Travel, hospitality, fitness, fashion and outdoor brands may have particularly relevant summer content.',
      },
      {
        title: 'New Location Announcements',
        body: 'A business opening in a new suburb or city may receive questions about hours, services or availability.',
      },
      {
        title: 'Creator Partnerships',
        body: 'Collaboration posts can create discussion around the people or brands involved.',
      },
      {
        title: 'Events and Community Content',
        body: 'Local events, activations and partnerships can naturally invite conversation.',
      },
    ],
  },
  {
    id: 'make-comments-fit',
    title: 'Make the Comments Fit the Post',
    lead: 'A comment section should make sense next to the content above it.',
    paragraphs: [
      'For example, a restaurant Reel might naturally attract comments about the dish or venue. A renovation post may attract questions about the project or result. A beauty Reel may lead to questions about the treatment or product. A product launch may create comments about colours, sizes, availability or features. A creator collaboration may generate reactions to the partnership. A tutorial may attract questions about the process.',
    ],
    footer:
      'The more relevant the conversation feels to the content, the stronger the overall presentation becomes. More comments are not automatically better if the discussion feels disconnected from the post.',
  },
  {
    id: 'reply-genuine',
    title: 'Reply to Genuine Instagram Comments Yourself',
    lead: 'Purchased comments and genuine community interaction are not the same thing.',
    paragraphs: [
      'When real followers, customers or viewers leave genuine comments, your own responses matter. For an Australian business, that may mean answering questions about pricing, service areas, opening hours, delivery, availability, appointments, locations, products or bookings. For a creator, it may mean responding to genuine questions, feedback or discussion around the content.',
    ],
    footer: 'Use your own expertise when answering real people. That keeps your public communication accurate and useful.',
  },
  {
    id: 'trust-management',
    title: 'Build Trust Through Accurate Comment Management',
    lead: 'For businesses, the comment section becomes part of the public-facing brand experience. Treat it accordingly.',
    footer: 'Visible activity can support presentation. Trust comes from accurate communication.',
    items: [
      {
        title: 'Answer Genuine Questions Accurately',
        body: "Don't guess when someone asks about a product, price or service.",
      },
      {
        title: "Don't Invent Customer Experiences",
        body: 'Fake testimonials or fabricated customer stories create trust problems rather than solving them.',
      },
      {
        title: 'Watch for Spam',
        body: 'Unrelated spam can appear on public Instagram content. Moderate it where appropriate.',
      },
      {
        title: 'Handle Complaints Properly',
        body: 'If a real customer raises a genuine problem, move it through your normal customer-service process.',
      },
      {
        title: 'Keep Your Tone Consistent',
        body: 'Your own responses should sound like the business or creator behind the profile.',
      },
    ],
  },
  {
    id: 'real-experience',
    title: 'Use Comments Alongside Real Experience and Expertise',
    lead: 'Some of the strongest Instagram content comes from things you actually know, do or sell.',
    footer:
      'Comments work best when the underlying content contains something worth responding to.',
    items: [
      {
        title: "Projects You've Completed",
        body: 'Show real work and give people something specific to discuss.',
      },
      {
        title: 'Products You Actually Sell',
        body: 'Use accurate information when viewers ask about features, stock or pricing.',
      },
      {
        title: 'Processes You Understand',
        body: 'Explain how something works when it reflects genuine expertise.',
      },
      {
        title: 'Questions Customers Actually Ask',
        body: 'Turn repeated questions into posts or Reels, then answer genuine follow-up comments.',
      },
      {
        title: 'Your Own Perspective',
        body: 'Original observations can create better conversation than generic reposted advice.',
      },
    ],
  },
  {
    id: 'social-proof',
    title: 'Comments Can Support Social Proof Without Replacing Real Customer Proof',
    paragraphs: [
      'Visible conversation may contribute to how active a post looks. But comments are not the same thing as genuine customer evidence.',
      'For businesses, stronger trust can also come from verified reviews, real testimonials, authentic customer photos, genuine tagged content, case studies, project examples, real customer comments and accurate business information.',
    ],
    footer:
      'If your business has genuine proof, use it. A comment count can support presentation. Actual customer experience builds deeper credibility.',
  },
  {
    id: 'organic-reach',
    title: 'Instagram Comments and Organic Reach Are Not the Same Thing',
    lead: 'More comments on a post do not guarantee stronger Instagram distribution.',
    bullets: [
      'reach Explore',
      'make a Reel viral',
      'increase organic Followers',
      'increase Likes',
      'add Views',
      'improve organic reach',
      'generate website traffic',
      'attract customers',
      'secure partnerships',
      'increase sales',
    ],
    paragraphs: [
      'NovaLikes Instagram Comments packages are designed around comments displayed on the selected eligible content.',
      'Organic reach and genuine audience behaviour remain separate outcomes.',
    ],
  },
  {
    id: 'local-businesses',
    title: 'Instagram Comments for Australian Local Businesses',
    paragraphs: [
      'Comments can be especially useful around local-business content that naturally creates questions. A restaurant may publish a new menu item. A builder may show a finished project. A salon may showcase a treatment. An interior designer may post a completed space. A retailer may announce new stock. A real estate business may publish a property Reel. A local event may create discussion about dates, tickets or location.',
      "If you're supporting this content with comments, keep your business information accurate and make genuine replies useful.",
    ],
    footer: 'Visible conversation can strengthen presentation. The real business behind the post builds trust.',
  },
  {
    id: 'comment-strategy',
    title: 'A Practical Comment Strategy for Australian Accounts',
    lead: 'If comments are part of your wider Instagram strategy, use them alongside better community management.',
    footer:
      'Visible conversation can support a post. Long-term community growth comes from content and genuine interaction.',
    items: [
      {
        title: 'Publish Content With a Clear Subject',
        body: 'People need something specific to respond to.',
      },
      {
        title: 'Use Captions to Create Context',
        body: 'Explain the story, product, question or topic clearly.',
      },
      {
        title: 'Choose Priority Posts',
        body: "Don't use the same comment strategy on every piece of content.",
      },
      {
        title: 'Reply to Genuine People',
        body: 'Real conversations deserve real responses.',
      },
      {
        title: 'Review Genuine Insights',
        body: 'Use your actual account analytics to understand organic interaction.',
      },
      {
        title: 'Learn From Real Questions',
        body: 'Repeated genuine comments can reveal useful content opportunities.',
      },
      {
        title: 'Moderate Where Necessary',
        body: 'Keep spam and irrelevant activity from weakening the comment section.',
      },
      {
        title: 'Keep Comments in Perspective',
        body: 'Visible conversation can support a post. Long-term community growth comes from content and genuine interaction.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/au/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-comments'] = {
  title: 'Buy Instagram Comments Australia | Posts & Reels | NovaLikes',
  description:
    'Buy Instagram comments in Australia for public posts and Reels. Compare comment packages, order without sharing your password and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/au/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const auIgCommentsFaqs = [
  {
    id: 'au-ig-c-where-buy',
    question: 'Where can I buy Instagram Comments in Australia?',
    answer:
      'You can buy Instagram Comments in Australia through NovaLikes for eligible public posts and Reels. Choose an available comment package and quantity, submit the direct public content URL and complete checkout without sharing your Instagram password.',
  },
  {
    id: 'au-ig-c-get-more',
    question: 'How can I get more comments on Instagram?',
    answer:
      'NovaLikes comment packages can add visible comments to eligible public posts and Reels. For genuine organic discussion, publish content that gives people something relevant to respond to and reply to real users yourself.',
  },
  {
    id: 'au-ig-c-cheap',
    question: 'Can I buy cheap Instagram Comments in Australia?',
    answer:
      'NovaLikes offers multiple comment options and quantities so you can compare current package pricing. When considering lower-cost services, also review the comment type, content requirements, password policy, tracking and support.',
  },
  {
    id: 'au-ig-c-real',
    question: 'What are real Instagram Comments?',
    answer:
      '"Real Instagram Comments" can mean different things depending on the provider. Review the actual package description and what the service promises rather than relying only on the phrase.',
  },
  {
    id: 'au-ig-c-how-many',
    question: 'How many Instagram Comments should I buy?',
    answer:
      'There is no single ideal quantity for every post. Consider the content, existing interaction, account size and the level of visible conversation you want before choosing a package.',
  },
  {
    id: 'au-ig-c-reels',
    question: 'Can I buy Instagram Comments for Reels?',
    answer:
      'Yes. Eligible public Instagram Reels can use a Comments package when you submit the correct direct content URL.',
  },
  {
    id: 'au-ig-c-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'au-ig-c-info',
    question: 'What information do I need to order?',
    answer:
      'You need the direct public URL of the eligible Instagram post or Reel and the comment package and quantity you want.',
  },
  {
    id: 'au-ig-c-cost',
    question: 'How much does it cost to buy Instagram Comments in Australia?',
    answer:
      'Pricing depends on the comment package type and quantity you select. NovaLikes displays current package options and pricing before checkout.',
  },
  {
    id: 'au-ig-c-delivery',
    question: 'How long does it take to get Instagram Comments?',
    answer:
      'Processing time can vary depending on the package, quantity and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'au-ig-c-followers',
    question: 'Will buying comments increase my Followers?',
    answer:
      'Not automatically. Comments and Followers are separate Instagram metrics and separate NovaLikes services.',
  },
  {
    id: 'au-ig-c-likes-views',
    question: 'Will buying comments increase my Likes or Views?',
    answer: 'Not automatically. Instagram Likes and Views are separate content-level services.',
  },
  {
    id: 'au-ig-c-organic-reach',
    question: 'Will buying Instagram Comments increase organic reach?',
    answer:
      'There is no guarantee. A Comments package adds comments to the selected content. Organic distribution depends on separate factors.',
  },
  {
    id: 'au-ig-c-business',
    question: 'Can Australian businesses buy Instagram Comments?',
    answer:
      'Eligible public posts and Reels from Australian businesses, creators, brands, agencies and other supported accounts can use NovaLikes Comments packages.',
  },
  {
    id: 'au-ig-c-local',
    question: 'Can local businesses use Instagram Comments packages?',
    answer:
      'Yes. Local-business content can use an eligible Comments package, particularly where the post or Reel naturally supports discussion or questions.',
  },
  {
    id: 'au-ig-c-older-post',
    question: 'Can I use Instagram Comments on an older post?',
    answer:
      'If the post or Reel remains eligible and publicly accessible, it may be suitable for an order. Check the direct URL and current service requirements first.',
  },
  {
    id: 'au-ig-c-client',
    question: 'Can I order Instagram Comments for a client?',
    answer:
      "If you're authorised to purchase services for eligible client content, submit the correct public post or Reel URL and review the order details carefully.",
  },
  {
    id: 'au-ig-c-wrong-url',
    question: 'What happens if I submit the wrong URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the direct content URL before checkout.',
  },
  {
    id: 'au-ig-c-track',
    question: 'Can I track my Instagram Comments order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('au-ig-c-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...auIgCommentsFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Australia Instagram Comments content from supplied copy.');
