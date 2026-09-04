/**
 * Apply supplied United Kingdom Instagram Followers copy.
 * Run: npx tsx scripts/patch-uk-ig-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '../data/content/instagram-followers-page-config';

const UK = '/uk';
const file = path.join(process.cwd(), 'content/markets/uk/services/buy-instagram-followers.json');
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
  title: 'Buy Instagram Followers UK | Grow Your Profile | NovaLikes',
  description:
    'Buy Instagram followers in the UK with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR THE UK';
hero.title = 'Buy Instagram Followers in the UK and Build a Stronger Profile';
hero.description =
  "Build a stronger visible audience around the Instagram profile you're already growing. NovaLikes gives creators, businesses, brands and agencies across the United Kingdom a straightforward way to buy Instagram followers without sharing account login details. Choose the follower quantity that fits your profile, enter your public Instagram username and complete your order online. Whether you're building a creator account, growing an ecommerce brand, strengthening a local business profile or preparing Instagram for a larger campaign, choose the follower increase that makes sense for where your account is today.";
hero.primaryCta = { label: 'Choose Your Instagram Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-f-trust-public', label: 'Public Username Only' },
  { id: 'ig-f-trust-password', label: 'No Password Required' },
  { id: 'ig-f-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-f-trust-tracking', label: 'Order Tracking' },
];

pricing.title = 'Choose an Instagram Followers Package That Fits Your Profile';
pricing.description =
  'Every Instagram account starts from a different place. NovaLikes currently offers 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Followers. A newer creator may prefer a smaller increase. An established business, brand or active public profile may choose something larger. Before ordering, consider your current follower count, how developed the profile is, what you\'re building toward and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Followers Packages';

benefits.title = 'Built for UK Creators, Businesses and Brands';
benefits.description =
  "Instagram can play a different role depending on the profile behind it. A creator in London may be building a profile around fashion, food, fitness, entertainment, travel or education. An ecommerce brand in Manchester may use Instagram around product launches and creator partnerships. A local business in Birmingham, Leeds, Glasgow, Liverpool, Bristol or another UK market may use Instagram to show real work, services and recent activity. An agency may manage multiple client accounts with completely different audiences. An established brand may use Instagram alongside paid media, search, ecommerce, email and influencer campaigns. That means follower growth should fit the profile. Follower growth should support the account you're building. Not replace it.";
benefits.items = [
  {
    id: 'ig-f-uk-creators',
    title: 'Creators',
    description:
      'Strengthen the visible audience around your niche while continuing to develop your content and personal brand.',
  },
  {
    id: 'ig-f-uk-ecom',
    title: 'Ecommerce Brands',
    description:
      'Support the profile around launches, seasonal promotions and content customers may explore before visiting your store.',
  },
  {
    id: 'ig-f-uk-local',
    title: 'Local Businesses',
    description:
      'Build a stronger Instagram presence around real services, locations, projects and customer-facing activity.',
  },
  {
    id: 'ig-f-uk-agencies',
    title: 'Agencies',
    description:
      'Choose follower quantities according to the individual client\'s profile and campaign.',
  },
  {
    id: 'ig-f-uk-brands',
    title: 'Established Brands',
    description:
      'Support visible profile presentation while continuing genuine content, advertising and customer communication.',
  },
];

followersAuthority.whyChoose = {
  id: 'why-choose-novalikes-instagram-followers-uk',
  title: 'Why Choose NovaLikes for Instagram Followers?',
  description: 'Buying Instagram followers should be easy to understand before checkout.',
  items: [
    {
      id: 'ig-f-wc-password',
      title: 'No Instagram Password Required',
      description:
        'NovaLikes does not need your Instagram password, verification codes or private account access.',
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
        'Choose from smaller and larger packages instead of paying for one fixed quantity.',
      icon: 'users',
    },
    {
      id: 'ig-f-wc-pricing',
      title: 'Clear Pricing',
      description: 'Review available follower quantities and current prices before completing your order.',
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
      description: 'Use your order information afterwards to check available status updates.',
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
  id: 'buy-instagram-followers-without-login-uk',
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
    'Before checkout, search the username yourself and make sure it belongs to the exact profile you want to use.',
};

howItWorks.title = 'How Your Instagram Followers Order Works';
howItWorks.description =
  'Compare available follower quantities and current prices, enter your public Instagram username, review your order, complete checkout without your password, and use NovaLikes order tracking afterwards.';
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
    title: 'Review Your Order',
    description: 'Check the follower quantity, username and current package price.',
  },
  {
    id: 'ig-f-step-4',
    title: 'Complete Checkout',
    description: 'Place your order without sharing your Instagram password.',
  },
  {
    id: 'ig-f-step-5',
    title: 'Track Your Purchase',
    description: 'Use NovaLikes order tracking afterwards for available status information.',
  },
];
(howItWorks.cta as Record<string, string>).label = 'Get Instagram Followers';

followersAuthority.whatHappens = {
  id: 'what-happens-after-instagram-followers-order-uk',
  title: 'What Happens After You Order?',
  description:
    'After checkout, your selected follower package and submitted Instagram username are connected to the purchase. The order is then processed for the intended public profile.',
  steps: [
    {
      id: 'ig-f-th-1',
      title: 'Keep the Profile Accessible',
      description:
        'The submitted account should remain publicly accessible where required during processing.',
    },
    {
      id: 'ig-f-th-2',
      title: 'Avoid Changing Your Username',
      description: 'Changing the username during an active order may interfere with processing.',
    },
    {
      id: 'ig-f-th-3',
      title: 'Check the Account Before Paying',
      description: 'Make sure the username belongs to the exact profile you intended to use.',
    },
    {
      id: 'ig-f-th-4',
      title: 'Follow Your Order Status',
      description:
        'Processing time can vary depending on follower quantity and current order conditions. Use NovaLikes order tracking for available updates rather than assuming every package follows one fixed delivery time.',
    },
  ],
  closingNote: '',
};

followersAuthority.bestPractices = {
  id: 'affordable-instagram-followers-uk',
  title: 'Looking for Affordable Instagram Followers in the UK?',
  description:
    "If you're searching for cheap Instagram followers in the UK, price will naturally be part of your comparison. Look beyond the lowest package price.",
  closingNote:
    'An affordable Instagram Followers service should make these basics clear before checkout. NovaLikes lets you compare the available follower quantities and current prices before choosing.',
  items: [
    { id: 'ig-f-bp-1', title: 'Follower Quantity', description: 'Check how many followers are included.', icon: 'users' },
    { id: 'ig-f-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    {
      id: 'ig-f-bp-3',
      title: 'Required Public Profile Information',
      description: 'Confirm whether your Instagram password is requested.',
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
  id: 'real-instagram-followers-uk',
  title: 'Looking for “Real Instagram Followers”? Check the Service Behind the Label',
  description:
    '"Real Instagram followers" is a common phrase people may use when comparing follower services. You may also see high-quality Instagram followers, active Instagram followers or organic Instagram followers. Different providers may define these terms differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What metric changes?',
    'How many Followers are included?',
    'Which profile receives them?',
    'What information do I need to provide?',
    'What does the provider actually promise?',
  ],
  limitTitle: 'What NovaLikes Follower Packages Do',
  limitItems: [
    'Increase the follower count displayed on the eligible public profile submitted with the order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, reach, customers or sales. Clear expectations are more useful than undefined marketing terminology.',
};

followersAuthority.serviceCompare = {
  id: 'followers-likes-views-comments-uk',
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
    href: `${UK}/buy-instagram-likes`,
    ctaLabel: 'Buy Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count displayed on an eligible Reel or video',
    bestFor: 'Reels and videos',
    href: `${UK}/buy-instagram-views`,
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Followers for profile audience size. Use Likes for individual content. Choose Views for Reels and videos. Choose Comments for visible conversation. One service does not automatically include the others.',
  commentsHref: `${UK}/buy-instagram-comments`,
};

followersAuthority.beforeBuying = {
  id: 'before-you-buy-instagram-followers-uk',
  title: 'Before You Buy Instagram Followers in the UK',
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
      description: 'Make sure the quantity and price match what you intend to purchase.',
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
      description: 'Changing the Instagram username during an active order may interfere with processing.',
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
      description: 'Read the relevant service and refund information before checkout.',
      icon: 'headphones',
    },
  ],
};

followersAuthority.packageSizes = {
  id: 'follower-package-sizes-uk',
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
  'uk-ig-f-where-buy',
  'uk-ig-f-get-more',
  'uk-ig-f-cheap',
  'uk-ig-f-real',
  'uk-ig-f-how-many',
  'uk-ig-f-password',
  'uk-ig-f-info',
  'uk-ig-f-cost',
  'uk-ig-f-delivery',
  'uk-ig-f-likes',
  'uk-ig-f-reel-views',
  'uk-ig-f-organic-reach',
  'uk-ig-f-explore',
  'uk-ig-f-business',
  'uk-ig-f-local',
  'uk-ig-f-client',
  'uk-ig-f-wrong-username',
  'uk-ig-f-track',
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
        'Choose Views when you want to increase the displayed View count on an eligible public Reel or video.',
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
  'Choose the Instagram Followers package that fits your profile, submit the correct public username and place your order without sharing your login details. Then keep strengthening what makes the number matter: clear positioning, useful content, genuine audience interaction and an Instagram profile people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Followers Package';

followersAuthority.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Followers in the UK?',
  text: 'You can buy Instagram followers in the UK through NovaLikes by choosing an available follower package, entering the correct public Instagram username and completing checkout online. Your Instagram password is not required. The service increases the follower count displayed on the selected public profile and is separate from Instagram Likes, Views and Comments.',
};

followersAuthority.storySections = [
  {
    id: 'first-impression',
    title: 'Build a Stronger First Impression Around Your Instagram Profile',
    lead: 'Someone discovering your account may decide quickly whether they want to explore further. They can see:',
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
      'overall profile consistency',
    ],
    paragraphs: [
      'A larger follower count can support how established the profile appears at first glance. But the rest of the account still matters.',
      'For creators, make your niche, style and strongest work easy to understand. For businesses, explain what you offer and where interested customers should go next. For brands, keep messaging, visuals and campaign content consistent. For local businesses, make your location, service and contact information accurate where relevant.',
    ],
    footer:
      'Followers can strengthen one visible profile signal. The account behind that number creates the wider impression.',
  },
  {
    id: 'clear-identity',
    title: 'Build Your Follower Count Around a Clear Instagram Identity',
    lead: 'A stronger profile usually makes its purpose easy to understand. A visitor should quickly know what the account is about and what they can expect if they follow.',
    footer: 'Follower growth can support visible audience size. Clear positioning gives people a reason to explore.',
    items: [
      { title: 'Make Your Niche Clear', body: 'Creators should make the main subject of the account easy to recognise.' },
      { title: 'Explain the Business Clearly', body: 'Business profiles should communicate what they offer and who they serve.' },
      {
        title: 'Keep Your Visual Direction Consistent',
        body: 'A recognisable style can make the profile easier to understand.',
      },
      {
        title: 'Use Pinned Content Properly',
        body: 'Pin posts and Reels that introduce the account, showcase strong work or explain something important.',
      },
      {
        title: 'Keep Recent Content Relevant',
        body: 'A larger follower count has more context when the account itself looks current and focused.',
      },
    ],
  },
  {
    id: 'uk-campaign-moments',
    title: 'Use Instagram Followers Around Important UK Campaign Moments',
    lead: 'Some periods can bring more attention to your Instagram profile.',
    footer:
      'Followers can support profile presentation around these moments. The campaign itself still needs strong creative, accurate information and a useful offer.',
    items: [
      {
        title: 'Black Friday',
        body: 'UK ecommerce and retail brands may have high-priority Instagram campaigns around Black Friday.',
      },
      {
        title: 'Cyber Monday',
        body: 'Online businesses may use Instagram alongside email, paid ads and ecommerce during Cyber Monday campaigns.',
      },
      {
        title: 'Boxing Day',
        body: 'Retailers and ecommerce brands may have major promotional activity around Boxing Day sales.',
      },
      {
        title: 'Christmas Campaigns',
        body: 'Gift guides, seasonal products, events and festive promotions can bring more visitors toward business profiles.',
      },
      {
        title: 'January Sales',
        body: 'Many UK retailers and ecommerce businesses continue seasonal campaigns into January.',
      },
      {
        title: 'Product Launches',
        body: 'Build the profile and supporting content before directing more campaign traffic toward it.',
      },
      {
        title: 'Creator Collaborations',
        body: 'Partnership content may introduce the account to an audience seeing it for the first time.',
      },
      {
        title: 'New Location Openings',
        body: 'Businesses expanding into another city or region can use Instagram to introduce the new location, team or service.',
      },
    ],
  },
  {
    id: 'better-profile',
    title: 'Turn Follower Growth Into a Better Instagram Profile',
    lead: 'A larger follower count works best when someone who visits the account finds a profile worth exploring.',
    footer: 'Follower growth can support the visible profile. Good account management makes that audience number more useful.',
    items: [
      { title: 'Keep Your Bio Focused', body: 'A visitor should quickly understand who you are or what your business offers.' },
      { title: 'Pin Your Strongest Content', body: 'Use pinned posts and Reels to make important content easier to find.' },
      {
        title: 'Build Recognisable Content Themes',
        body: "Give people a clear idea of what they'll see if they continue following the account.",
      },
      { title: 'Keep Your Information Current', body: "Don't send potential customers towards outdated products, offers or contact information." },
      { title: 'Maintain Recent Activity', body: 'An active profile gives the follower number more context.' },
      {
        title: 'Give Business Visitors a Next Step',
        body: "If you're using Instagram commercially, make it easy for interested visitors to shop, enquire, book or visit your website.",
      },
    ],
  },
  {
    id: 'content-worth-following',
    title: 'Build Followers Around Content People Actually Want to Follow',
    lead: 'Follower count should not replace publishing. If long-term Instagram growth matters, continue developing the content itself.',
    footer:
      'Purchased followers change one visible profile metric. Your genuine audience behaviour should guide your longer-term content strategy.',
    items: [
      { title: 'Create Useful Reels', body: 'Demonstrate, explain, entertain, educate or tell a story relevant to the audience you want.' },
      {
        title: 'Build Strong Carousels',
        body: 'Use posts to teach, compare, introduce products, show work or share practical information.',
      },
      { title: 'Keep Your Positioning Consistent', body: 'Give viewers a recognisable reason to follow.' },
      { title: 'Use Captions for Context', body: 'Add useful information rather than filling space.' },
      { title: 'Respond to Genuine People', body: 'Real comments, questions and messages deserve genuine replies.' },
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
      'Creators may care about follower count when preparing for collaborations. But professional brands and agencies may evaluate much more than one public number.',
      'They can also consider creator niche, content quality, genuine audience fit, authentic engagement, consistency, previous collaborations, communication, professionalism and campaign performance.',
      'If partnerships are part of your goal, strengthen the whole profile. Publish good work. Make your niche clear. Keep genuine analytics available where appropriate.',
    ],
    footer: 'Treat follower count as one part of the picture rather than proof of influence by itself.',
  },
  {
    id: 'local-businesses',
    title: 'Instagram Followers for UK Local Businesses',
    paragraphs: [
      'For local businesses, Instagram can work alongside your website, Google Business Profile, local SEO, paid advertising and referrals.',
      'Potential customers may visit your profile because they want to see what the company actually does. A restaurant may show current dishes. A builder may publish completed projects. An interior designer may showcase finished spaces. A salon may show recent work. A retailer may introduce new stock. An estate agency may feature properties. A fitness studio may publish classes or training content. A tourism business may showcase experiences. A professional service may answer common customer questions.',
      "If you're growing followers around a local-business account, make sure the real business information remains accurate. Show genuine work. Use relevant city and service-area context where useful. Give interested customers a clear next step.",
    ],
    footer: 'Visible follower count can support presentation. Local trust comes from the real business behind the profile.',
  },
  {
    id: 'customer-proof',
    title: 'Use Followers Alongside Genuine Customer Proof',
    paragraphs: [
      'Follower count can contribute to visible social proof. It is not the same as genuine customer evidence.',
      'For UK businesses, stronger trust can also come from verified customer reviews, authentic testimonials, completed projects, case studies, real customer comments, customer-created content, accurate business information and responsive customer service.',
      'If you have genuine proof, show it. Do not invent testimonials simply to make an Instagram profile look stronger.',
    ],
    footer: 'Followers can support presentation. Actual customer experience creates deeper credibility.',
  },
  {
    id: 'more-business',
    title: "More Followers Don't Automatically Mean More Business",
    paragraphs: [
      'A larger follower count can support how established a profile appears. It does not automatically create commercial outcomes.',
      'For a UK business, success might mean online sales, bookings, leads, website visits, shop visits, calls, quote requests or genuine direct messages.',
      'Those outcomes depend on more than follower count. Your offer, content, audience, website and customer experience all matter.',
      "If you're using Instagram commercially, measure the business result you actually care about. Do not treat follower count as the final outcome.",
    ],
  },
  {
    id: 'measure-growth',
    title: 'Measure Instagram Growth Beyond Follower Count',
    lead: 'Follower count tells you one thing about your Instagram presence. It does not tell you whether the wider strategy is working.',
    items: [
      { title: 'Which Content Earns Real Attention?', body: 'Compare genuine performance across posts and Reels.' },
      { title: 'Are People Exploring Your Profile?', body: 'Review actual profile activity where available.' },
      {
        title: 'What Creates Genuine Interaction?',
        body: 'Look at authentic comments, shares, saves and messages.',
      },
      {
        title: 'Which Content Creates Organic Followers?',
        body: 'Learn which genuine content encourages real viewers to stay.',
      },
      {
        title: 'Is Instagram Supporting Your Business?',
        body: 'For commercial accounts, measure real enquiries, bookings, traffic or sales separately.',
      },
    ],
    footer: 'Purchased followers change one visible metric. Your genuine account analytics should guide your longer-term decisions.',
  },
  {
    id: 'growth-framework',
    title: 'A Practical Instagram Growth Framework for UK Accounts',
    lead: 'Follower count works best as one part of a wider Instagram strategy.',
    items: [
      { title: 'Define Your Positioning', body: 'Make your creator niche, business or brand easy to understand.' },
      { title: 'Build a Strong Content Base', body: 'Give new visitors several useful posts and Reels to explore.' },
      { title: 'Keep the Profile Current', body: 'Review your bio, links, pinned content and highlights regularly.' },
      { title: 'Publish With a Purpose', body: "Know why you're creating each piece of content." },
      { title: 'Use Genuine Insights', body: 'Let actual account performance guide future content decisions.' },
      { title: 'Respond to Your Audience', body: 'Treat real comments and messages as genuine conversations.' },
      {
        title: 'Connect Instagram to Wider Marketing',
        body: 'UK businesses may use Instagram alongside SEO, Google Ads, ecommerce, email, creator partnerships, local search and their website.',
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

const metaPath = path.join(process.cwd(), 'content/markets/uk/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-followers'] = {
  title: 'Buy Instagram Followers UK | Grow Your Profile | NovaLikes',
  description:
    'Buy Instagram followers in the UK with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/uk/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;
const ukIgFaqs = [
  {
    id: 'uk-ig-f-where-buy',
    question: 'Where can I buy Instagram Followers in the UK?',
    answer:
      'You can buy Instagram Followers in the UK through NovaLikes. Choose an available follower package, submit the correct public Instagram username and complete checkout without sharing your password.',
  },
  {
    id: 'uk-ig-f-get-more',
    question: 'How can I get more Instagram Followers in the UK?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public Instagram profile. For organic growth, continue publishing relevant content, improving the account and reviewing genuine audience behaviour through Instagram Insights.',
  },
  {
    id: 'uk-ig-f-cheap',
    question: 'Can I buy cheap Instagram Followers in the UK?',
    answer:
      'NovaLikes offers multiple follower quantities so you can compare available package sizes and current prices. When comparing lower-cost services, also review password requirements, tracking, support and what the service actually changes.',
  },
  {
    id: 'uk-ig-f-real',
    question: 'What are real Instagram Followers?',
    answer:
      '"Real Instagram Followers" can mean different things depending on the provider. Review the actual service details rather than relying only on that phrase. NovaLikes follower packages are designed to increase the follower count displayed on the eligible submitted profile.',
  },
  {
    id: 'uk-ig-f-how-many',
    question: 'How many Instagram Followers should I buy?',
    answer:
      'There is no single ideal quantity for every profile. Consider your existing follower count, account activity, content base and the increase you actually want before selecting a package.',
  },
  {
    id: 'uk-ig-f-password',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'uk-ig-f-info',
    question: 'What information do I need?',
    answer: 'You need the correct public Instagram username and the follower package you want to purchase.',
  },
  {
    id: 'uk-ig-f-cost',
    question: 'How much does it cost to buy Instagram Followers in the UK?',
    answer: 'Pricing depends on the follower quantity you select. NovaLikes displays current package quantities and prices before checkout.',
  },
  {
    id: 'uk-ig-f-delivery',
    question: 'How long does it take to get Instagram Followers?',
    answer:
      'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available status information.',
  },
  {
    id: 'uk-ig-f-likes',
    question: 'Will buying Instagram Followers increase my Likes?',
    answer: 'Not automatically. Instagram Likes are a separate content-level metric and service.',
  },
  {
    id: 'uk-ig-f-reel-views',
    question: 'Will buying Followers increase my Reel Views?',
    answer: 'Not automatically. Instagram Views are a separate content-level metric.',
  },
  {
    id: 'uk-ig-f-organic-reach',
    question: 'Will buying Instagram Followers increase organic reach?',
    answer:
      'There is no guarantee. A follower package changes the visible follower count on the selected public profile. Organic Instagram distribution depends on separate factors.',
  },
  {
    id: 'uk-ig-f-explore',
    question: 'Will buying Followers help me reach Explore?',
    answer:
      "There is no guarantee. Follower count and Instagram's content recommendation systems are separate outcomes.",
  },
  {
    id: 'uk-ig-f-business',
    question: 'Can UK businesses buy Instagram Followers?',
    answer:
      'Eligible public Instagram profiles used by UK businesses, creators, brands, agencies and other supported account types can use NovaLikes follower packages.',
  },
  {
    id: 'uk-ig-f-local',
    question: 'Can local businesses use Instagram Followers packages?',
    answer:
      'Yes. Eligible public profiles used by local businesses can use follower packages. Keep the real business information and content accurate alongside your Instagram strategy.',
  },
  {
    id: 'uk-ig-f-client',
    question: 'Can I order Instagram Followers for a client?',
    answer:
      "If you're authorised to purchase services for an eligible client profile, submit the correct public Instagram username and review the order details carefully.",
  },
  {
    id: 'uk-ig-f-wrong-username',
    question: 'What happens if I submit the wrong username?',
    answer:
      'Contact NovaLikes support as soon as possible with your order details. Always verify the public username before completing checkout.',
  },
  {
    id: 'uk-ig-f-track',
    question: 'Can I track my Instagram Followers order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const withoutOld = faqs.filter((item) => !item.id.startsWith('uk-ig-f-'));
writeFileSync(faqFile, `${JSON.stringify([...withoutOld, ...ukIgFaqs], null, 2)}\n`, 'utf8');

console.log('Patched United Kingdom Instagram Followers content from supplied copy.');
