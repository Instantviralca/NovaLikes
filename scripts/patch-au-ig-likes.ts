/**
 * Apply supplied Australia Instagram Likes copy.
 * Run: npx tsx scripts/patch-au-ig-likes.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AU = '/au';
const file = path.join(process.cwd(), 'content/markets/au/services/buy-instagram-likes.json');
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
  title: 'Buy Instagram Likes Australia | Posts & Reels | NovaLikes',
  description:
    'Buy Instagram likes in Australia for public posts and Reels. Compare flexible packages, order without sharing your password and track your purchase online.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR AUSTRALIA';
hero.title = 'Buy Instagram Likes in Australia and Put More Engagement Behind Your Content';
hero.description =
  'Give the Instagram posts and Reels that matter most a stronger visible Like count. NovaLikes gives Australian creators, businesses, brands and agencies a straightforward way to buy Instagram Likes without sharing account login details. Choose the number of Likes you want, submit the exact public post or Reel URL and complete your order online. Whether you\'re supporting a product launch, creator collaboration, campaign Reel, portfolio post or an important piece of business content, choose a Likes package around the content you\'re actually trying to strengthen.';
hero.primaryCta = { label: 'Choose Your Instagram Likes Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-l-trust-public', label: 'Public Post or Reel URL Only' },
  { id: 'ig-l-trust-password', label: 'No Password Required' },
  { id: 'ig-l-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-l-trust-track', label: 'Order Tracking' },
];

pricing.title = 'Choose a Likes Package That Fits the Post or Reel';
pricing.description =
  'Every piece of Instagram content has a different purpose. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 3K, 5K and 10K Likes. A regular post may only need a smaller increase, while a product launch, campaign Reel or important portfolio piece may call for something larger. Before choosing, consider the existing Like count, the importance of the content, your profile size and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Likes Packages';

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'au-ig-l-where-buy',
  'au-ig-l-get-more',
  'au-ig-l-cheap',
  'au-ig-l-real',
  'au-ig-l-how-many',
  'au-ig-l-reels',
  'au-ig-l-password',
  'au-ig-l-info',
  'au-ig-l-cost',
  'au-ig-l-delivery',
  'au-ig-l-followers',
  'au-ig-l-reel-views',
  'au-ig-l-organic-reach',
  'au-ig-l-business',
  'au-ig-l-older-post',
  'au-ig-l-client',
  'au-ig-l-wrong-url',
  'au-ig-l-track',
];

related.title = 'Explore More Instagram Services';
related.description =
  'Choose Followers for your profile, Views for eligible Reels or videos, or Comments for visible conversation around selected content.';

finalCta.title = 'Put More Engagement Behind the Instagram Content That Matters';
finalCta.description =
  'Choose the post or Reel you want to support, select an Instagram Likes package that fits the content and submit the correct public URL without sharing your login details. Then keep strengthening what the Like count cannot replace: useful content, genuine audience interaction and an Instagram presence worth exploring.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Likes Package';

config.whyChoose = {
  id: 'why-choose-novalikes-instagram-likes-australia',
  title: 'Why Choose NovaLikes for Instagram Likes?',
  description: 'Buying Instagram Likes should be clear from package selection to order tracking.',
  items: [
    {
      id: 'ig-l-wc-targeting',
      title: 'Likes for Specific Posts and Reels',
      description: 'Your order applies to the eligible public content connected to the URL you submit.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-wc-packages',
      title: 'Flexible Like Packages',
      description: 'Choose a smaller or larger quantity depending on the individual post or Reel.',
      icon: 'users',
    },
    {
      id: 'ig-l-wc-password',
      title: 'No Instagram Password Required',
      description: 'NovaLikes does not need your password, verification codes or private login access.',
      icon: 'lock',
    },
    {
      id: 'ig-l-wc-pricing',
      title: 'Clear Pricing Before Checkout',
      description: 'Review the Likes quantity and current price before completing your purchase.',
      icon: 'credit-card',
    },
    {
      id: 'ig-l-wc-tracking',
      title: 'Order Tracking',
      description: 'Use NovaLikes order tracking afterward for available status updates.',
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
  id: 'buy-instagram-likes-without-login-australia',
  title: 'Buy Instagram Likes Without Sharing Your Login',
  description:
    'A Likes order should not require control of your Instagram account. NovaLikes uses the public content information requested during checkout.',
  cards: [
    {
      id: 'ig-l-can-need',
      title: 'What You Need',
      description: 'The direct public URL of the Instagram post or Reel and your selected Likes package.',
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
    'Before placing the order, open the URL yourself and make sure it goes directly to the content you want to use. A profile link is not the same as a post or Reel URL.',
};

config.doesBuyingHelp = {
  id: 'real-instagram-likes-australia',
  title: 'Looking for “Real Instagram Likes”? Check the Actual Service',
  description:
    '"Real Instagram Likes" is a common phrase people use when comparing Instagram engagement providers. You may also see terms such as high-quality Instagram Likes, active Instagram Likes or organic Instagram Likes. Providers may define those terms differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'How many Likes are included?',
    'Which post or Reel receives them?',
    'What information is required?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Instagram Likes Packages Do',
  limitItems: [
    'Increase the Like count displayed on the eligible public content submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, followers, views, reach, customers or sales. Clear service expectations are more useful than an undefined marketing phrase.',
};

config.whatHappens = {
  id: 'what-happens-after-instagram-likes-order-australia',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected Likes package and submitted Instagram URL are connected to the purchase. The order is then processed for the intended post or Reel.',
  steps: [
    {
      id: 'ig-l-th-1',
      title: 'Keep the Content Available',
      description:
        'The submitted post or Reel should remain publicly accessible where required while processing is active.',
    },
    {
      id: 'ig-l-th-2',
      title: "Don't Delete It Mid-Order",
      description: 'Removing the target content can interfere with an active order.',
    },
    {
      id: 'ig-l-th-3',
      title: 'Check the Link Carefully',
      description: 'Make sure the URL points to the content you intended to use before paying.',
    },
    {
      id: 'ig-l-th-4',
      title: 'Follow Your Order',
      description:
        'Processing time can vary depending on package quantity and current order conditions. Use NovaLikes order tracking for available status information rather than assuming every package follows one fixed timeline.',
    },
  ],
  closingNote: '',
};

config.serviceCompare = {
  id: 'likes-followers-views-comments-australia',
  title: 'Likes, Followers, Views or Comments: Choose by Goal',
  description: 'Different Instagram services affect different metrics.',
  current: {
    title: 'Instagram Likes',
    description: 'Like count displayed on an eligible public post or Reel',
    bestFor: 'Individual post or Reel engagement',
    ctaLabel: 'Instagram Likes',
  },
  likes: {
    title: 'Instagram Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile follower count',
    href: auHref('/buy-instagram-followers'),
    ctaLabel: 'Buy Instagram Followers',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count displayed on eligible Reels or videos',
    bestFor: 'Eligible Reels and video content',
    href: auHref('/buy-instagram-views'),
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Likes for individual content. Choose Followers for your profile. Choose Views for Reels and video. Choose Comments for conversation. Choose the metric you actually want to change.',
  commentsHref: auHref('/buy-instagram-comments'),
};

config.beforeBuying = {
  id: 'before-you-buy-instagram-likes-australia',
  title: 'Before You Buy Instagram Likes in Australia',
  description: 'Review these details before completing checkout.',
  framingNote: '',
  items: [
    {
      id: 'ig-l-bb-post',
      title: 'Confirm the Exact Post or Reel',
      description: 'Open the content you want to use.',
      icon: 'users',
    },
    {
      id: 'ig-l-bb-url',
      title: 'Copy the Direct URL',
      description: 'Do not submit only the general Instagram profile link.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-bb-quantity',
      title: 'Check the Likes Quantity',
      description: 'Make sure the selected package contains the number you intend to purchase.',
      icon: 'users',
    },
    {
      id: 'ig-l-bb-price',
      title: 'Review the Current Price',
      description: 'Confirm the package price before paying.',
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
      description: 'NovaLikes does not require Instagram login details.',
      icon: 'lock',
    },
    {
      id: 'ig-l-bb-service',
      title: 'Choose the Correct Service',
      description: 'Likes, Followers, Views and Comments are separate Instagram metrics.',
      icon: 'sparkles',
    },
    {
      id: 'ig-l-bb-policies',
      title: 'Review the Policies',
      description: 'Read the applicable service and refund information before placing your order.',
      icon: 'headphones',
    },
  ],
};

config.worldwide = {
  id: 'instagram-content-growth-framework-australia',
  title: 'A Practical Instagram Content Growth Framework for Australian Accounts',
  description:
    'Likes can support individual content, but stronger Instagram growth requires more than one number.',
  eyebrow: 'Instagram Growth',
  closingNote:
    'Visible engagement can support presentation. Long-term growth comes from the account and content behind it.',
  cards: [
    {
      id: 'ig-l-ww-direction',
      title: 'Define Your Content Direction',
      description: 'Make the account easy to understand.',
      icon: 'megaphone',
    },
    {
      id: 'ig-l-ww-priority',
      title: 'Identify Your Priority Posts',
      description: 'Know which content best represents the creator, business or campaign.',
      icon: 'heart',
    },
    {
      id: 'ig-l-ww-purpose',
      title: 'Publish Consistently With Purpose',
      description: 'Frequency means less if the content itself has no clear role.',
      icon: 'clapperboard',
    },
    {
      id: 'ig-l-ww-insights',
      title: 'Review Genuine Insights',
      description: 'Use actual account data to identify what real viewers respond to.',
      icon: 'users',
    },
  ],
};

config.packageSizes = {
  id: 'choose-likes-package-australia',
  title: 'Choose a Likes Package That Fits the Post or Reel',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 3K, 5K and 10K Likes. Consider the existing Like count, the importance of the content, your profile size and the increase you actually want.',
  quantityColumnLabel: 'Consideration',
  recommendedColumnLabel: 'What to Review',
  rows: [
    {
      id: 'ig-l-ps-count',
      quantity: 'The Existing Like Count',
      recommendedFor: 'Look at how much visible engagement the post or Reel already has.',
    },
    {
      id: 'ig-l-ps-content',
      quantity: 'The Importance of the Content',
      recommendedFor:
        'A major launch or evergreen piece of content may be more valuable to support than an everyday update.',
    },
    {
      id: 'ig-l-ps-profile',
      quantity: 'Your Profile Size',
      recommendedFor:
        'The same Like quantity can look different in the context of a newer profile and an established brand account.',
    },
    {
      id: 'ig-l-ps-increase',
      quantity: 'The Increase You Actually Want',
      recommendedFor:
        'Choose the package based on the content rather than automatically selecting the largest available option.',
    },
  ],
  bottomNote: 'Compare Instagram Likes Packages',
};

config.bestPractices = {
  id: 'affordable-instagram-likes-australia',
  title: 'Looking for Affordable Instagram Likes in Australia?',
  description:
    "If you're comparing cheap Instagram Likes in Australia, price will naturally be part of the decision. But check more than the lowest package price.",
  closingNote:
    'An affordable Instagram Likes package should make these details clear before checkout. NovaLikes lets you compare available quantities and prices so you can choose based on both your content and budget.',
  items: [
    { id: 'ig-l-bp-1', title: 'Number of Likes Included', description: 'Review how many Likes are in the package.', icon: 'users' },
    { id: 'ig-l-bp-2', title: 'Current Package Price', description: 'Check pricing before checkout.', icon: 'credit-card' },
    {
      id: 'ig-l-bp-3',
      title: 'Eligible Content Requirements',
      description: 'Confirm what public post or Reel URL is required.',
      icon: 'heart',
    },
    {
      id: 'ig-l-bp-4',
      title: 'Password Requirements',
      description: 'Confirm whether your password is requested.',
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
  ],
};

config.commonMistakes = {
  id: 'common-mistakes-instagram-likes-australia',
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
        'Choose Views when you want to increase the displayed view count on an eligible public Reel or video.',
      ctaLabel: 'Buy Instagram Views',
    },
    'buy-instagram-comments': {
      title: 'Instagram Comments',
      description:
        "Choose Comments when visible conversation around an eligible post or Reel is the metric you're working on.",
      ctaLabel: 'Buy Instagram Comments',
    },
  },
};

dummy.whyBuy = {
  id: 'content-worth-noticing-instagram-likes-australia',
  title: 'Put More Engagement Behind the Content Worth Noticing',
  description:
    "You don't need to add Likes to every post. A more focused approach is to identify the Instagram content that already has a clear job.",
  items: [
    {
      id: 'ig-l-wb-launches',
      title: 'Product Launches',
      description: "Support a post or Reel that clearly introduces or demonstrates what you're launching.",
    },
    {
      id: 'ig-l-wb-collabs',
      title: 'Creator Collaborations',
      description: 'Put attention behind content that best represents the partnership and the creators involved.',
    },
    {
      id: 'ig-l-wb-announcements',
      title: 'Business Announcements',
      description:
        'A new service, location, event or company update may have more long-term value than a routine post.',
    },
    {
      id: 'ig-l-wb-portfolio',
      title: 'Portfolio Content',
      description:
        'Creators, designers, photographers, agencies and service businesses can focus on work they would genuinely want a potential customer or partner to see.',
    },
    {
      id: 'ig-l-wb-campaign',
      title: 'Campaign Reels',
      description: 'Use Likes around content carrying the main message of an active campaign.',
    },
    {
      id: 'ig-l-wb-evergreen',
      title: 'Evergreen Posts',
      description:
        'Educational carousels, tutorials, demonstrations and strong brand content can continue representing the account long after publication.',
    },
  ],
  bottomNote: 'Choose the content first. Then decide how much visible engagement makes sense around it.',
};

dummy.howToBuy = {
  id: 'how-instagram-likes-order-works-australia',
  title: 'How Your Instagram Likes Order Works',
  description:
    'Compare packages, submit the direct public post or Reel URL, review the details, complete checkout without your password and track the order afterward.',
  steps: [
    {
      id: 'ig-l-step-1',
      title: 'Choose Your Content',
      description: 'Start with the exact public Instagram post or Reel you want to support.',
    },
    {
      id: 'ig-l-step-2',
      title: 'Pick a Likes Package',
      description: 'Compare the available quantities and current prices.',
    },
    {
      id: 'ig-l-step-3',
      title: 'Submit the Direct URL',
      description: 'Paste the correct public post or Reel link into the required order field.',
    },
    {
      id: 'ig-l-step-4',
      title: 'Review Before Checkout',
      description: 'Check the content URL, Likes quantity and package price.',
    },
    {
      id: 'ig-l-step-5',
      title: 'Complete Your Order',
      description: 'Place the order without providing your Instagram password.',
    },
    {
      id: 'ig-l-step-6',
      title: 'Track the Status',
      description: 'Use NovaLikes order tracking for available updates afterward.',
    },
  ],
};

dummy.relatedHeading = 'Explore More Instagram Services';
dummy.relatedIntro =
  'Choose Followers for your profile, Views for eligible Reels or videos, or Comments for visible conversation around selected content.';

dummy.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Likes in Australia?',
  text: 'You can buy Instagram Likes in Australia through NovaLikes for eligible public posts and Reels. Choose a Likes package, submit the exact public Instagram content URL and complete checkout without sharing your password. The Likes apply to that specific post or Reel rather than increasing your profile follower count or video views.',
};

dummy.storySections = [
  {
    id: 'built-for-australia',
    title: 'Built for Australian Creators, Businesses and Brands',
    lead: 'Instagram plays a different role depending on the account behind it.',
    paragraphs: [
      'An Australian creator may be building a portfolio and preparing for future collaborations. An ecommerce brand may use Instagram around new collections, product drops and seasonal promotions. A local business in Sydney, Melbourne, Brisbane, Perth, Adelaide or another Australian market may use posts and Reels to show real work, services and recent activity. An agency may need to support different pieces of client content at different stages of a campaign.',
      'That means Likes should be used around the content that matters to the account rather than applied randomly across the feed.',
    ],
    footer: 'Likes can support the presentation. The content behind them still needs a purpose.',
    items: [
      {
        title: 'Creators',
        body: 'Support the posts and Reels that best demonstrate your niche, style or work.',
      },
      {
        title: 'Ecommerce Brands',
        body: 'Focus on product content, launches and campaign creative that customers are likely to explore.',
      },
      {
        title: 'Local Businesses',
        body: 'Use Instagram content to show projects, products, locations, services and genuine business activity.',
      },
      {
        title: 'Agencies',
        body: 'Choose Like quantities based on the specific client content and campaign rather than using one fixed approach.',
      },
      {
        title: 'Established Brands',
        body: 'Put additional visible engagement around priority posts while continuing your own content and marketing strategy.',
      },
    ],
  },
  {
    id: 'campaign-moments',
    title: 'Use Instagram Likes Around Important Australian Campaign Moments',
    lead: 'Some posts naturally matter more than others.',
    footer:
      'Likes can support how that campaign content appears. The actual offer, creative and customer experience still determine whether the campaign works.',
    items: [
      {
        title: 'New Product Drops',
        body: 'Support the content that demonstrates or introduces the product most clearly.',
      },
      {
        title: 'Boxing Day and Holiday Campaigns',
        body: 'Retail and ecommerce brands may have specific campaign posts tied to major Australian shopping periods.',
      },
      {
        title: 'Summer Campaigns',
        body: 'Hospitality, tourism, fashion, fitness, outdoor and other seasonal businesses may have content that becomes more important during particular times of year.',
      },
      {
        title: 'New Location Announcements',
        body: 'A business opening or expanding into another suburb or city can use Instagram content to explain what has changed.',
      },
      {
        title: 'Creator Partnerships',
        body: 'Support the content that best represents the collaboration rather than spreading Likes across unrelated posts.',
      },
      {
        title: 'Events and Launches',
        body: 'Put attention behind the main post or Reel carrying the event or launch message.',
      },
    ],
  },
  {
    id: 'better-content-experience',
    title: 'Make the Like Count Part of a Better Content Experience',
    lead: 'A visible Like count can influence how active a post appears at first glance. But people also notice what the post itself contains.',
    footer: 'Likes can support presentation. Good content gives people a reason to stay.',
    items: [
      { title: 'Use Strong Creative', body: 'Choose photos, carousels and Reels that communicate the idea clearly.' },
      {
        title: 'Give the Caption a Purpose',
        body: 'Explain the product, story, offer or idea instead of filling space with generic copy.',
      },
      {
        title: 'Keep the Post Relevant to the Profile',
        body: 'Strong engagement on unrelated content does little to help someone understand the account.',
      },
      {
        title: 'Make the Next Step Clear',
        body: 'For a business, interested viewers may need a website, product link, profile information or contact option.',
      },
      {
        title: 'Keep Publishing',
        body: 'One post with a larger Like count should not become the entire content strategy.',
      },
    ],
  },
  {
    id: 'support-content',
    title: 'Use Likes to Support Content, Not Replace It',
    lead: 'Instagram growth is broader than a visible Like number.',
    footer:
      'Purchased Likes increase one visible metric. Your own audience data should guide what you publish next.',
    items: [
      { title: 'Content Themes', body: 'Develop recognizable subjects around the niche, creator identity or business.' },
      {
        title: 'Reels',
        body: 'Use video when movement, explanation, demonstration or storytelling makes the idea stronger.',
      },
      { title: 'Carousels', body: 'Use multi-slide posts when information needs more room.' },
      { title: 'Captions', body: 'Add useful context and give genuine viewers a reason to understand or respond.' },
      {
        title: 'Genuine Comments and Messages',
        body: 'Real people deserve real replies from the creator or business behind the account.',
      },
      {
        title: 'Instagram Insights',
        body: 'Use genuine performance data to understand what actually earns reach, interactions and profile activity.',
      },
    ],
  },
  {
    id: 'organic-reach',
    title: 'Instagram Likes and Organic Reach Are Not the Same Thing',
    lead: 'A Like count and Instagram\'s organic distribution of content are different outcomes.',
    bullets: [
      'reach Explore',
      'make a Reel viral',
      'increase organic views',
      'add followers',
      'create comments',
      'attract customers',
      'increase website traffic',
      'secure brand partnerships',
      'generate sales',
    ],
    paragraphs: [
      'NovaLikes Instagram Likes packages are designed around the visible Like count on the selected eligible content.',
      'Organic reach and genuine audience response should be evaluated separately.',
    ],
  },
  {
    id: 'content-performance',
    title: "Likes Don't Tell You Everything About Content Performance",
    lead: 'A post can have a visible Like count without telling you the complete story of how genuine users responded.',
    footer: 'A purchased Like number is one visible metric. Use genuine analytics to judge organic performance.',
    items: [
      { title: 'Reach', body: 'How many genuine accounts are seeing the content?' },
      { title: 'Saves', body: 'Is the content useful enough for people to return to?' },
      { title: 'Shares', body: 'Are real viewers choosing to send it to someone else?' },
      { title: 'Genuine Comments', body: 'What are people actually saying or asking?' },
      { title: 'Profile Activity', body: 'Does the content encourage viewers to explore the profile?' },
      {
        title: 'Business Outcomes',
        body: 'If the post supports a business, does it contribute to enquiries, product interest, bookings or another meaningful goal?',
      },
    ],
  },
  {
    id: 'brand-partnerships',
    title: 'Put Instagram Likes in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about visible engagement when building a profile for future partnerships. But brands and agencies can look at much more than a Like count.',
      'They may consider content quality, creator niche, genuine audience fit, real engagement, consistency, previous collaborations, professionalism, campaign results and communication.',
      'If brand partnerships are part of your goal, use your strongest content and genuine performance data alongside visible metrics.',
    ],
    footer: 'A larger Like number can support presentation. It does not prove genuine influence by itself.',
  },
  {
    id: 'local-businesses',
    title: 'Instagram Likes for Australian Local Businesses',
    paragraphs: [
      'For local businesses, Instagram content often acts as visual proof of what the company actually does.',
      'A restaurant may show dishes. A builder may show completed work. An interior designer may show a finished space. A salon may show recent treatments or styles. A retailer may feature new stock. A real estate business may showcase properties. A service company may demonstrate its process.',
      "If you're supporting local-business content with Likes, make sure the post shows something genuine and relevant to potential customers. Keep your profile information accurate and make it easy for interested visitors to understand where you operate and how to contact you.",
    ],
    footer: 'Visible engagement can strengthen presentation. The real business behind the post builds trust.',
  },
  {
    id: 'real-experience',
    title: 'Support Real Experience With Stronger Content Presentation',
    lead: 'For businesses and creators, some of the best content comes from direct experience.',
    footer: 'Likes can strengthen the visible engagement around this content. The experience and expertise inside the content are what make it worth viewing.',
    items: [
      {
        title: "Work You've Actually Completed",
        body: 'Projects and genuine portfolio examples demonstrate experience more effectively than generic claims.',
      },
      {
        title: 'Products You Actually Sell',
        body: 'Show how they look, work or fit into real situations.',
      },
      {
        title: 'Processes You Understand',
        body: 'Explain how something is done when you have genuine expertise.',
      },
      {
        title: 'Customer Questions You Hear Regularly',
        body: 'Turn real questions into useful posts and Reels.',
      },
      {
        title: 'Your Own Perspective',
        body: 'Original observations and experience make content more useful than repeating generic advice.',
      },
    ],
  },
];

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/au/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-likes'] = {
  title: 'Buy Instagram Likes Australia | Posts & Reels | NovaLikes',
  description:
    'Buy Instagram likes in Australia for public posts and Reels. Compare flexible packages, order without sharing your password and track your purchase online.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/au/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;

const auIgLikesFaqs = [
  {
    id: 'au-ig-l-where-buy',
    question: 'Where can I buy Instagram Likes in Australia?',
    answer:
      'You can buy Instagram Likes in Australia through NovaLikes for eligible public posts and Reels. Choose an available Likes package, submit the direct public content URL and complete checkout without sharing your Instagram password.',
  },
  {
    id: 'au-ig-l-get-more',
    question: 'How can I get more Instagram Likes in Australia?',
    answer:
      'NovaLikes Likes packages can increase the visible Like count on eligible public content. For organic engagement, continue improving your posts and Reels, responding to genuine users and reviewing real performance through Instagram Insights.',
  },
  {
    id: 'au-ig-l-cheap',
    question: 'Can I buy cheap Instagram Likes in Australia?',
    answer:
      'NovaLikes offers multiple Likes package sizes so you can compare available quantities and current pricing. When considering lower-cost services, also review password requirements, order tracking, support and what the package actually includes.',
  },
  {
    id: 'au-ig-l-real',
    question: 'What are real Instagram Likes?',
    answer:
      '"Real Instagram Likes" can mean different things depending on the provider. Review the actual package details rather than relying only on that phrase. NovaLikes Likes packages are designed to increase the visible Like count on eligible submitted content.',
  },
  {
    id: 'au-ig-l-how-many',
    question: 'How many Instagram Likes should I buy?',
    answer:
      'There is no single ideal quantity for every post or Reel. Consider its existing engagement, profile size, content purpose and the increase you want before choosing a package.',
  },
  {
    id: 'au-ig-l-reels',
    question: 'Can I buy Instagram Likes for Reels?',
    answer:
      'Yes. Eligible public Instagram Reels can use a Likes package when you submit the correct direct content URL.',
  },
  {
    id: 'au-ig-l-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private login access.',
  },
  {
    id: 'au-ig-l-info',
    question: 'What information do I need to order?',
    answer:
      'You need the direct public URL of the eligible Instagram post or Reel and the Likes package you want to purchase.',
  },
  {
    id: 'au-ig-l-cost',
    question: 'How much does it cost to buy Instagram Likes in Australia?',
    answer: 'Pricing depends on the number of Likes you choose. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'au-ig-l-delivery',
    question: 'How long does it take to get Instagram Likes?',
    answer:
      'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'au-ig-l-followers',
    question: 'Will buying Instagram Likes increase my Followers?',
    answer: 'Not automatically. Instagram Likes and Followers are separate metrics and separate NovaLikes services.',
  },
  {
    id: 'au-ig-l-reel-views',
    question: 'Will buying Likes increase my Reel Views?',
    answer: 'Not automatically. Instagram Views is a separate metric and service.',
  },
  {
    id: 'au-ig-l-organic-reach',
    question: 'Will buying Instagram Likes increase organic reach?',
    answer:
      'There is no guarantee. A Likes package changes the visible Like count on the selected content. Organic distribution depends on separate factors.',
  },
  {
    id: 'au-ig-l-business',
    question: 'Can Australian businesses buy Instagram Likes?',
    answer:
      'Eligible public posts and Reels used by Australian businesses, creators, brands, agencies and other supported accounts can use NovaLikes Likes packages.',
  },
  {
    id: 'au-ig-l-older-post',
    question: 'Can I use Instagram Likes on an older post?',
    answer:
      'If the content remains eligible and publicly accessible, it may be suitable for an order. Check the direct URL and current service requirements first.',
  },
  {
    id: 'au-ig-l-client',
    question: 'Can I order Instagram Likes for client content?',
    answer:
      "If you're authorised to purchase services for the eligible client content, submit the exact public post or Reel URL and review the order details carefully.",
  },
  {
    id: 'au-ig-l-wrong-url',
    question: 'What happens if I submit the wrong Instagram URL?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the direct content URL before checkout.',
  },
  {
    id: 'au-ig-l-track',
    question: 'Can I track my Instagram Likes order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const filtered = faqs.filter((item) => !item.id.startsWith('au-ig-l-'));
writeFileSync(faqFile, `${JSON.stringify([...filtered, ...auIgLikesFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Australia Instagram Likes content from supplied copy.');
