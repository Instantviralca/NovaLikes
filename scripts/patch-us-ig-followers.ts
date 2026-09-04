/**
 * Apply supplied United States Instagram Followers copy.
 * Run: npx tsx scripts/patch-us-ig-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '../data/content/instagram-followers-page-config';

const US = '/us';
const file = path.join(process.cwd(), 'content/markets/us/services/buy-instagram-followers.json');
const data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
const content = data.content as Record<string, unknown>;
const hero = content.hero as Record<string, unknown>;
const pricing = content.pricing as Record<string, unknown>;
const benefits = content.benefits as Record<string, unknown>;
const howItWorks = content.howItWorks as Record<string, unknown>;
const faq = content.faq as Record<string, unknown>;
const related = content.relatedServices as Record<string, unknown>;
const finalCta = content.finalCta as Record<string, unknown>;
const followersAuthority = structuredClone(INSTAGRAM_FOLLOWERS_PAGE_CONFIG) as Record<string, unknown>;

content.seo = {
  title: 'Buy Instagram Followers USA | Grow Your Profile | NovaLikes',
  description:
    'Buy Instagram followers in the USA with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR THE USA';
hero.title = 'Buy Instagram Followers in the USA and Build a Stronger Profile';
hero.description =
  "Build a stronger visible audience around the Instagram profile you're already growing. NovaLikes gives creators, businesses, brands and agencies across the United States a straightforward way to buy Instagram followers without sharing account login details. Choose the follower quantity that fits your profile, enter your public Instagram username and complete your order online. Whether you're launching a creator account, growing an ecommerce brand, building a local business presence or preparing Instagram for a larger campaign, choose the follower increase that makes sense for where your account is today.";
hero.primaryCta = { label: 'Choose Your Instagram Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-f-trust-public', label: 'Public Username Only' },
  { id: 'ig-f-trust-password', label: 'No Password Required' },
  { id: 'ig-f-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-f-trust-tracking', label: 'Order Tracking' },
];

pricing.title = 'Choose an Instagram Followers Package That Fits Your Profile';
pricing.description =
  'Every account starts from a different place. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Followers. A newer creator may prefer a smaller increase. An established business, brand or active public profile may choose something larger. Before ordering, consider your current follower count, how developed the profile is, what you\'re building toward and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Followers Packages';

benefits.title = 'Built for US Creators, Businesses and Brands';
benefits.description =
  "Instagram plays a different role depending on the account behind it. A creator in New York may be building a portfolio around fashion, food, fitness or entertainment. An ecommerce brand in Los Angeles may use Instagram around product launches and creator partnerships. A local business in Miami, Chicago, Houston, Dallas or another US market may use Instagram to show projects, services and recent activity. An agency may manage multiple client accounts with completely different audiences. An established brand may use Instagram alongside paid media, search, email, ecommerce and influencer campaigns. That means follower growth should fit the account. The goal is not simply to increase a number. It is to build a profile where that follower count fits the presence you're creating.";
benefits.items = [
  {
    id: 'ig-f-us-creators',
    title: 'Creators',
    description:
      'Strengthen the visible audience around your niche while continuing to develop your content and personal brand.',
  },
  {
    id: 'ig-f-us-ecom',
    title: 'Ecommerce Brands',
    description:
      'Support the profile around product launches, seasonal promotions and content people may explore before visiting your store.',
  },
  {
    id: 'ig-f-us-local',
    title: 'Local Businesses',
    description:
      'Build a stronger profile around real services, locations, projects and customer-facing activity.',
  },
  {
    id: 'ig-f-us-agencies',
    title: 'Agencies',
    description:
      'Choose follower quantities based on individual client profiles rather than applying one package to every account.',
  },
  {
    id: 'ig-f-us-brands',
    title: 'Established Brands',
    description:
      'Support profile presentation while continuing genuine content, advertising and audience activity.',
  },
];

followersAuthority.whyChoose = {
  id: 'why-choose-novalikes-instagram-followers-usa',
  title: 'Why Choose NovaLikes for Instagram Followers?',
  description: 'Buying Instagram followers should be straightforward from package selection to order tracking.',
  items: [
    {
      id: 'ig-f-wc-password',
      title: 'No Instagram Password Required',
      description:
        'NovaLikes does not need your Instagram password, verification codes or private login access.',
      icon: 'lock',
    },
    {
      id: 'ig-f-wc-username',
      title: 'Public Username Only',
      description: 'Provide the correct public Instagram username for the profile receiving the order.',
      icon: 'users',
    },
    {
      id: 'ig-f-wc-packages',
      title: 'Flexible Follower Quantities',
      description:
        'Choose the package size that fits your account instead of paying for one fixed option.',
      icon: 'users',
    },
    {
      id: 'ig-f-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review the available quantities and current prices before checkout.',
      icon: 'credit-card',
    },
    {
      id: 'ig-f-wc-checkout',
      title: 'Secure Checkout',
      description: 'Complete your purchase through the available NovaLikes checkout.',
      icon: 'shield-check',
    },
    {
      id: 'ig-f-wc-tracking',
      title: 'Order Tracking',
      description: 'Use your order information afterward to check available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'ig-f-wc-support',
      title: 'Customer Support',
      description:
        'If something needs checking, contact NovaLikes with the relevant order details.',
      icon: 'headphones',
    },
  ],
};

followersAuthority.canYouBuy = {
  id: 'buy-instagram-followers-without-login-usa',
  title: 'Buy Instagram Followers Without Sharing Your Login',
  description:
    'You should not need to hand over control of your Instagram account to place a follower order. NovaLikes uses the public profile information required for the service.',
  cards: [
    {
      id: 'ig-f-can-need',
      title: 'What You Need',
      description: 'Your correct public Instagram username and your selected follower package.',
      icon: 'users',
    },
    {
      id: 'ig-f-can-not-need',
      title: "What You Don't Need",
      description:
        'Your Instagram password, verification codes, private messages or account login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    'Before checkout, search the username yourself and confirm that it belongs to the exact profile you want to use.',
};

howItWorks.title = 'How Your Instagram Followers Order Works';
howItWorks.description =
  'Compare available follower quantities and current prices, enter your public Instagram username, review the details, complete checkout without your password, and use NovaLikes order tracking afterward.';
howItWorks.steps = [
  {
    id: 'ig-f-step-1',
    title: 'Choose Your Package',
    description: 'Compare the available follower quantities and current prices.',
  },
  {
    id: 'ig-f-step-2',
    title: 'Enter Your Instagram Username',
    description: 'Provide the exact public username of the profile receiving the followers.',
  },
  {
    id: 'ig-f-step-3',
    title: 'Review the Details',
    description: 'Check your follower quantity, username and current package price before paying.',
  },
  {
    id: 'ig-f-step-4',
    title: 'Complete Checkout',
    description: 'Place your order without sharing your Instagram password.',
  },
  {
    id: 'ig-f-step-5',
    title: 'Track Your Order',
    description: 'Use NovaLikes order tracking afterward for available status updates.',
  },
];
(howItWorks.cta as Record<string, string>).label = 'Get Instagram Followers';

followersAuthority.whatHappens = {
  id: 'what-happens-after-instagram-followers-order-usa',
  title: 'What Happens After You Place an Order?',
  description:
    'After checkout, your selected follower package and submitted Instagram username are connected to the purchase. The order is then processed for the intended public profile.',
  steps: [
    {
      id: 'ig-f-th-1',
      title: 'Keep the Profile Accessible',
      description:
        'The submitted Instagram account should remain publicly accessible where required during processing.',
    },
    {
      id: 'ig-f-th-2',
      title: 'Avoid Changing Your Username',
      description: 'Changing the username during an active order may interfere with processing.',
    },
    {
      id: 'ig-f-th-3',
      title: 'Check the Account Before Paying',
      description: 'Make sure the username belongs to the profile you actually want to use.',
    },
    {
      id: 'ig-f-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available updates instead of assuming every package follows one fixed delivery time.',
    },
  ],
  closingNote: '',
};

followersAuthority.bestPractices = {
  id: 'affordable-instagram-followers-usa',
  title: 'Looking for Affordable Instagram Followers in the USA?',
  description:
    "If you're searching for cheap Instagram followers in the USA, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Instagram followers package should make these basics clear before checkout. NovaLikes lets you compare available follower quantities and prices before choosing.',
  items: [
    { id: 'ig-f-bp-1', title: 'Follower Quantity', description: 'Check how many followers are included.', icon: 'users' },
    { id: 'ig-f-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    {
      id: 'ig-f-bp-3',
      title: 'Required Public Profile Details',
      description: 'Confirm whether your password is requested.',
      icon: 'lock',
    },
    { id: 'ig-f-bp-4', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'ig-f-bp-5', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    {
      id: 'ig-f-bp-6',
      title: 'Relevant Service Policies',
      description: 'Review applicable service policies before paying.',
      icon: 'sparkles',
    },
    {
      id: 'ig-f-bp-7',
      title: 'What the Provider Actually Promises',
      description: 'Understand what the package actually changes.',
      icon: 'shield-check',
    },
  ],
};

followersAuthority.doesBuyingHelp = {
  id: 'real-instagram-followers-usa',
  title: 'Looking for “Real Instagram Followers”? Check the Service Behind the Label',
  description:
    '"Real Instagram followers" is a common phrase people use when comparing follower services. You may also see high-quality Instagram followers, active Instagram followers or organic Instagram followers. Different providers may use these terms differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'How many followers are included?',
    'Which profile receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Follower Packages Do',
  limitItems: [
    'Increase the follower count displayed on the eligible public profile submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, reach, customers or sales. Clear expectations are more useful than an undefined marketing term.',
};

followersAuthority.serviceCompare = {
  id: 'followers-likes-views-comments-usa',
  title: 'Followers, Likes, Views or Comments: Choose by Goal',
  description: 'Different Instagram services affect different metrics.',
  current: {
    title: 'Instagram Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile audience size',
    ctaLabel: 'Instagram Followers',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Like count displayed on an eligible post or Reel',
    bestFor: 'Individual content',
    href: `${US}/buy-instagram-likes`,
    ctaLabel: 'Buy Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count displayed on an eligible Reel or video',
    bestFor: 'Reels and videos',
    href: `${US}/buy-instagram-views`,
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Followers for profile audience size. Use Likes for individual content. Choose Views for Reels and videos. Choose Comments for visible conversation. One service does not automatically include the others.',
  commentsHref: `${US}/buy-instagram-comments`,
};

followersAuthority.beforeBuying = {
  id: 'before-you-buy-instagram-followers-usa',
  title: 'Before You Buy Instagram Followers in the USA',
  description: 'Check these details before completing your order.',
  framingNote: '',
  items: [
    {
      id: 'ig-f-bb-username',
      title: 'Confirm Your Username',
      description: "Make sure you're submitting the exact public Instagram profile.",
      icon: 'users',
    },
    {
      id: 'ig-f-bb-package',
      title: 'Check the Package Size',
      description: 'Review how many Followers are included.',
      icon: 'sparkles',
    },
    {
      id: 'ig-f-bb-price',
      title: 'Confirm the Current Price',
      description: 'Make sure the selected quantity and price match what you intended to purchase.',
      icon: 'credit-card',
    },
    {
      id: 'ig-f-bb-public',
      title: 'Keep the Profile Publicly Accessible',
      description: 'Avoid making the submitted account unavailable while processing requires access.',
      icon: 'shield-check',
    },
    {
      id: 'ig-f-bb-username-change',
      title: 'Avoid Username Changes',
      description: 'Changing your Instagram username during an active order may interfere with processing.',
      icon: 'lock',
    },
    {
      id: 'ig-f-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Instagram password or verification codes.',
      icon: 'lock',
    },
    {
      id: 'ig-f-bb-service',
      title: 'Choose the Correct Service',
      description: 'Followers, Likes, Views and Comments are separate Instagram metrics.',
      icon: 'users',
    },
    {
      id: 'ig-f-bb-policies',
      title: 'Review the Policies',
      description: 'Read the relevant service and refund information before completing checkout.',
      icon: 'headphones',
    },
  ],
};

followersAuthority.packageSizes = {
  id: 'follower-package-sizes-usa',
  title: 'Choose an Instagram Followers Package That Fits Your Profile',
  description:
    'NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Followers. Consider your current follower count, how developed the profile is, what you\'re building toward and the increase you actually want before choosing.',
  rows: [
    { id: 'ig-f-ps-100', quantity: '100', recommendedFor: 'Newer profiles and modest increases' },
    { id: 'ig-f-ps-250', quantity: '250', recommendedFor: 'Small accounts building momentum' },
    { id: 'ig-f-ps-500', quantity: '500', recommendedFor: 'Growing creator or business profiles' },
    { id: 'ig-f-ps-1k', quantity: '1K', recommendedFor: 'Established accounts wanting a visible boost' },
    { id: 'ig-f-ps-25k', quantity: '2.5K', recommendedFor: 'Profiles with an existing audience' },
    { id: 'ig-f-ps-5k', quantity: '5K', recommendedFor: 'Established creators, businesses or brands' },
    { id: 'ig-f-ps-10k', quantity: '10K', recommendedFor: 'Larger profiles with an established presence' },
    { id: 'ig-f-ps-15k', quantity: '15K', recommendedFor: 'Larger profiles with an established presence' },
  ],
  bottomNote: 'Compare Instagram Followers Packages',
};

faq.title = 'Frequently Asked Questions';
faq.description = '';
faq.faqIds = [
  'us-ig-f-where-buy',
  'us-ig-f-get-more',
  'us-ig-f-cheap',
  'us-ig-f-real',
  'us-ig-f-how-many',
  'us-ig-f-password',
  'us-ig-f-info',
  'us-ig-f-cost',
  'us-ig-f-delivery',
  'us-ig-f-likes',
  'us-ig-f-reel-views',
  'us-ig-f-organic-reach',
  'us-ig-f-explore',
  'us-ig-f-business',
  'us-ig-f-local',
  'us-ig-f-client',
  'us-ig-f-wrong-username',
  'us-ig-f-track',
];

related.title = 'Explore More Instagram Services';
related.description =
  'Choose Likes for individual content, Views for eligible Reels or videos, or Comments for visible conversation around selected content.';

followersAuthority.relatedPackages = {
  copyBySlug: {
    'buy-instagram-likes': {
      title: 'Instagram Likes',
      description: 'Choose Likes when you want more visible engagement on an eligible public post or Reel.',
      ctaLabel: 'Buy Instagram Likes',
    },
    'buy-instagram-views': {
      title: 'Instagram Views',
      description:
        'Choose Views when you want to increase the displayed view count on an eligible public Reel or video.',
      ctaLabel: 'Buy Instagram Views',
    },
    'buy-instagram-comments': {
      title: 'Instagram Comments',
      description: 'Choose Comments when you want more visible conversation around eligible public content.',
      ctaLabel: 'Buy Instagram Comments',
    },
  },
};

followersAuthority.whyBuyNote = '';

finalCta.title = 'Build the Instagram Presence Behind the Follower Count';
finalCta.description =
  'Choose the Instagram Followers package that fits your profile, submit your public username and place your order without sharing your login details. Then keep strengthening what makes the number matter: clear positioning, useful content, genuine audience interaction and a profile people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Followers Package';

followersAuthority.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Followers in the USA?',
  text: 'You can buy Instagram followers in the USA through NovaLikes by choosing an available follower package, entering the correct public Instagram username and completing checkout online. Your Instagram password is not required. The service increases the follower count displayed on the selected public profile and is separate from Instagram Likes, Views and Comments.',
};

followersAuthority.storySections = [
  {
    id: 'first-impression',
    title: 'Build a Stronger First Impression Around Your Instagram Profile',
    lead: 'A visitor can make a quick judgment about an Instagram account. They may notice:',
    bullets: [
      'profile image',
      'username',
      'bio',
      'follower count',
      'recent posts',
      'Reels',
      'pinned content',
      'highlights',
      'visible engagement',
      'overall consistency',
    ],
    paragraphs: [
      'A larger follower count can support how established the account appears at first glance. But the rest of the profile still matters.',
      'For creators, make your niche clear. For businesses, make it easy to understand what you sell or provide. For brands, keep your content and visual identity consistent. For local businesses, keep service, location and contact information accurate where relevant.',
    ],
    footer:
      'Followers can strengthen one visible profile signal. The account behind the number creates the wider impression.',
  },
  {
    id: 'clear-identity',
    title: 'Build Follower Growth Around a Clear Instagram Identity',
    lead: 'A stronger Instagram profile usually makes its purpose easy to understand. A visitor should quickly know why the account exists and what they can expect from it.',
    footer: 'Follower growth can support the visible audience. Clear positioning gives people a reason to explore further.',
    items: [
      { title: 'Make Your Niche Clear', body: 'Creators should make their subject or expertise easy to recognise.' },
      { title: 'Explain the Business', body: 'Business profiles should communicate what they offer and who they serve.' },
      {
        title: 'Keep Your Visual Direction Consistent',
        body: 'A recognisable visual style can make the profile easier to understand.',
      },
      {
        title: 'Use Pinned Content',
        body: 'Highlight important posts or Reels that introduce the account or showcase your strongest work.',
      },
      {
        title: 'Keep Recent Content Relevant',
        body: 'A larger follower count has more context when the account itself looks active and focused.',
      },
    ],
  },
  {
    id: 'us-campaign-moments',
    title: 'Use Instagram Followers Around Important US Campaign Moments',
    lead: 'Some periods bring more attention to your Instagram profile than others.',
    footer:
      'Followers can support the visible profile around these moments. The campaign still needs strong content and a clear reason for people to care.',
    items: [
      {
        title: 'New Brand Launches',
        body: 'Build out your bio, profile content and initial Reels before sending more campaign traffic toward the account.',
      },
      {
        title: 'Product Drops',
        body: 'Make sure product content is easy to find when people begin exploring your profile.',
      },
      {
        title: 'Black Friday and Cyber Monday',
        body: "US ecommerce and retail brands may have high-priority Instagram campaigns around two of the country's biggest online shopping periods.",
      },
      {
        title: 'Holiday Campaigns',
        body: 'Brands may put more attention behind Instagram during Thanksgiving, Christmas, New Year and other seasonal marketing periods.',
      },
      {
        title: 'Back-to-School Campaigns',
        body: 'Retail, education, fashion, technology and family-focused businesses may have relevant content around the back-to-school season.',
      },
      {
        title: 'Creator Collaborations',
        body: 'A collaboration may introduce your profile to a new audience that wants to understand who you are.',
      },
      {
        title: 'New Location Launches',
        body: 'Businesses expanding into another city or state can use Instagram to introduce the location and show current activity.',
      },
    ],
  },
  {
    id: 'better-profile',
    title: 'Turn Follower Growth Into a Better Instagram Profile',
    lead: 'A stronger follower count works best when someone who visits the account finds a profile worth exploring.',
    footer: 'Follower growth can support the visible profile. Good profile management makes that audience number more meaningful.',
    items: [
      { title: 'Keep Your Bio Focused', body: 'A visitor should quickly understand who you are or what your business offers.' },
      { title: 'Pin Your Strongest Content', body: 'Use pinned posts and Reels to make important content easier to find.' },
      {
        title: 'Build Recognisable Content Themes',
        body: "Give people a clear reason to understand what they'll see if they continue following the account.",
      },
      { title: 'Keep Recent Activity Strong', body: 'An active profile gives the follower number more context.' },
      {
        title: 'Connect Business Profiles to a Next Step',
        body: "If you're using Instagram commercially, make it easy for interested visitors to shop, enquire, visit your website or learn more.",
      },
    ],
  },
  {
    id: 'content-worth-following',
    title: 'Build Followers Around Content People Actually Want to Follow',
    lead: 'Follower count should not become a replacement for publishing. If long-term Instagram growth matters to you, keep developing the content itself.',
    footer:
      'Purchased followers change one visible profile metric. Your genuine audience behaviour should guide your long-term content strategy.',
    items: [
      { title: 'Create Useful Reels', body: 'Demonstrate, explain, entertain, teach or tell a story relevant to your audience.' },
      {
        title: 'Build Strong Carousels and Posts',
        body: 'Use them to educate, introduce products, show work or share useful information.',
      },
      { title: 'Keep Your Positioning Consistent', body: 'Give people a recognisable reason to follow.' },
      { title: 'Use Captions for Context', body: 'Help viewers understand the idea behind the content.' },
      { title: 'Respond to Genuine People', body: 'Real comments, questions and messages deserve genuine responses.' },
      { title: 'Review Instagram Insights', body: 'Use your own account data to understand which content genuinely earns attention.' },
    ],
  },
  {
    id: 'reach-context',
    title: "More Instagram Followers Don't Automatically Mean More Reach",
    lead: 'Follower count and organic Instagram distribution are different things. A larger visible follower count does not automatically guarantee:',
    bullets: [
      'more Reel Views',
      'additional Likes',
      'more Comments',
      'Explore placement',
      'viral content',
      'organic Followers',
      'website traffic',
      'customer enquiries',
      'sales',
      'brand partnerships',
    ],
    paragraphs: [
      'NovaLikes Instagram Followers packages are designed around the follower count displayed on the selected eligible public profile.',
      'How Instagram distributes your content and how genuine users respond are separate outcomes. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'brand-partnerships',
    title: 'Put Your Follower Count in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about follower count when building a profile they want to show brands or agencies. But serious partnership decisions can involve much more than one number.',
      'Brands may also evaluate creator niche, content quality, genuine audience fit, authentic engagement, consistency, previous collaborations, communication, professionalism and campaign performance.',
      'If collaborations are part of your goal, strengthen the entire profile. Publish quality work. Make your niche clear. Keep genuine analytics available where appropriate.',
    ],
    footer: 'Treat follower count as one part of the picture rather than proof of influence by itself.',
  },
  {
    id: 'local-businesses',
    title: 'Instagram Followers for US Local Businesses',
    paragraphs: [
      'For local businesses, Instagram can work alongside your website, Google Business Profile, paid ads, referrals and other marketing channels.',
      'A potential customer may open your profile because they want to see recent projects, services, products, team activity, locations, before-and-after work, current promotions, customer interactions or business personality.',
      'A contractor may showcase completed work. A salon may show recent treatments. A restaurant may highlight dishes and events. A real estate business may feature properties. A retailer may show new products. A fitness studio may publish classes or training content. A professional service may answer common customer questions.',
      'A larger follower count can support how established the profile appears. Local trust comes from the real business behind it.',
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Followers Alongside Genuine Customer Proof',
    paragraphs: [
      'Follower count can contribute to visible social proof. It is not the same as genuine customer evidence.',
      'For US businesses, stronger trust can also come from verified reviews, authentic testimonials, real client results, completed projects, case studies, genuine customer comments, customer-generated content, accurate company information and responsive customer service.',
      "If you have genuine proof, use it. Don't invent reviews or testimonials to make an Instagram profile look stronger.",
    ],
    footer: 'Followers can support presentation. Actual customer experience creates deeper credibility.',
  },
  {
    id: 'more-business',
    title: "More Followers Don't Automatically Mean More Business",
    paragraphs: [
      'A larger follower count can make a profile look more established. It does not automatically create commercial results.',
      'For a business, actual success might mean ecommerce sales, bookings, leads, website visits, store visits, calls, quote requests or genuine direct messages.',
      'Those outcomes depend on more than follower count. Your offer, content, audience, website and customer experience all matter.',
      "If you're using Instagram commercially, measure the business outcome you actually care about. Don't treat follower count as the final result.",
    ],
  },
  {
    id: 'measure-growth',
    title: 'Measure Instagram Growth Beyond Follower Count',
    lead: 'Follower count tells you one thing about an Instagram profile. It does not tell you whether your overall strategy is working.',
    items: [
      { title: 'Which Content Earns Real Attention?', body: 'Compare your posts and Reels over time.' },
      { title: 'Are Genuine Users Visiting the Profile?', body: 'Look at real profile activity where available.' },
      {
        title: 'What Creates Real Interaction?',
        body: 'Pay attention to authentic comments, shares, saves and messages.',
      },
      {
        title: 'Which Content Drives Organic Followers?',
        body: 'Use genuine follower activity to understand which content convinces real viewers to stay.',
      },
      {
        title: 'Is Instagram Supporting Your Business?',
        body: 'For commercial accounts, measure genuine outcomes such as leads, visits, bookings or sales separately.',
      },
    ],
    footer: 'Purchased followers change one visible metric. Your real account analytics should guide your longer-term decisions.',
  },
  {
    id: 'growth-framework',
    title: 'A Practical Instagram Growth Framework for US Accounts',
    lead: 'Follower count works best as one part of a wider Instagram strategy.',
    items: [
      { title: 'Define Your Positioning', body: 'Make the creator niche, business or brand easy to understand.' },
      { title: 'Build a Strong Content Base', body: 'Give new visitors several useful posts and Reels to explore.' },
      { title: 'Keep Your Profile Current', body: 'Review your bio, links, pinned content and highlights regularly.' },
      { title: 'Publish With a Purpose', body: "Know why you're creating each piece of content." },
      { title: 'Use Genuine Insights', body: 'Let real account performance guide future content decisions.' },
      { title: 'Respond to Your Audience', body: 'Treat genuine comments and messages as real conversations.' },
      {
        title: 'Connect Instagram to Wider Marketing',
        body: 'US businesses may use Instagram alongside SEO, paid search, ecommerce, email, creator campaigns, local search and their website.',
      },
      {
        title: 'Keep Followers in Perspective',
        body: 'Visible audience size can support profile presentation. Long-term growth still depends on content, positioning and genuine audience behaviour.',
      },
    ],
  },
];

data.followersAuthority = followersAuthority;

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/us/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-followers'] = {
  title: 'Buy Instagram Followers USA | Grow Your Profile | NovaLikes',
  description:
    'Buy Instagram followers in the USA with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/us/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;
const usIgFaqs = [
  {
    id: 'us-ig-f-where-buy',
    question: 'Where can I buy Instagram followers in the USA?',
    answer:
      'You can buy Instagram followers in the USA through NovaLikes. Choose an available follower package, submit the correct public Instagram username and complete checkout without sharing your password.',
  },
  {
    id: 'us-ig-f-get-more',
    question: 'How can I get more Instagram followers in the USA?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public Instagram profile. For organic growth, continue publishing relevant content, improving your profile and reviewing genuine audience behaviour through Instagram Insights.',
  },
  {
    id: 'us-ig-f-cheap',
    question: 'Can I buy cheap Instagram followers in the USA?',
    answer:
      'NovaLikes offers multiple follower quantities so you can compare current package sizes and pricing. When comparing cheaper services, also review password requirements, tracking, support and what the package actually provides.',
  },
  {
    id: 'us-ig-f-real',
    question: 'What are real Instagram followers?',
    answer:
      '"Real Instagram followers" may be defined differently by different providers. Review the actual service details rather than relying only on that phrase. NovaLikes follower packages are designed to increase the follower count displayed on the eligible submitted profile.',
  },
  {
    id: 'us-ig-f-how-many',
    question: 'How many Instagram followers should I buy?',
    answer:
      'There is no single ideal quantity for every profile. Consider your existing follower count, account activity, content base and the increase you actually want before selecting a package.',
  },
  {
    id: 'us-ig-f-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'us-ig-f-info',
    question: 'What information do I need?',
    answer: 'You need the correct public Instagram username and the follower package you want to purchase.',
  },
  {
    id: 'us-ig-f-cost',
    question: 'How much does it cost to buy Instagram followers in the USA?',
    answer: 'Pricing depends on the follower quantity you choose. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'us-ig-f-delivery',
    question: 'How long does it take to get Instagram followers?',
    answer:
      'Processing time can vary depending on the package size and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'us-ig-f-likes',
    question: 'Will buying Instagram followers increase my Likes?',
    answer: 'Not automatically. Followers and Likes are separate Instagram metrics and separate services.',
  },
  {
    id: 'us-ig-f-reel-views',
    question: 'Will buying Instagram followers increase my Reel Views?',
    answer: 'Not automatically. Instagram Views are a separate content-level metric.',
  },
  {
    id: 'us-ig-f-organic-reach',
    question: 'Will buying followers increase organic reach?',
    answer:
      'There is no guarantee. A follower package changes the visible follower count on the selected public profile. Organic distribution depends on separate factors.',
  },
  {
    id: 'us-ig-f-explore',
    question: 'Will buying followers help me reach Explore?',
    answer:
      'There is no guarantee. Follower count and Instagram\'s recommendation systems are separate things.',
  },
  {
    id: 'us-ig-f-business',
    question: 'Can US businesses buy Instagram followers?',
    answer:
      'Eligible public Instagram profiles used by US businesses, creators, brands, agencies and other supported account types can use NovaLikes follower packages.',
  },
  {
    id: 'us-ig-f-local',
    question: 'Can local businesses use Instagram follower packages?',
    answer:
      'Yes. Eligible public profiles used by local businesses can use follower packages. Keep the real business information and content accurate alongside your follower strategy.',
  },
  {
    id: 'us-ig-f-client',
    question: 'Can I order Instagram followers for a client?',
    answer:
      "If you're authorised to purchase services for an eligible client profile, submit the correct public Instagram username and review the order details carefully.",
  },
  {
    id: 'us-ig-f-wrong-username',
    question: 'What happens if I submit the wrong username?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always check the public username before completing checkout.',
  },
  {
    id: 'us-ig-f-track',
    question: 'Can I track my Instagram followers order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const withoutOld = faqs.filter((item) => !item.id.startsWith('us-ig-f-'));
writeFileSync(faqFile, `${JSON.stringify([...withoutOld, ...usIgFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United States Instagram Followers content from supplied copy.');
