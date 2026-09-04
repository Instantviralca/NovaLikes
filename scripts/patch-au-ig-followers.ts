/**
 * Apply supplied Australia Instagram Followers copy.
 * Run: npx tsx scripts/patch-au-ig-followers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { INSTAGRAM_FOLLOWERS_PAGE_CONFIG } from '../data/content/instagram-followers-page-config';

const AU = '/au';
const file = path.join(process.cwd(), 'content/markets/au/services/buy-instagram-followers.json');
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
  title: 'Buy Instagram Followers Australia | NovaLikes',
  description:
    'Buy Instagram followers in Australia with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};

hero.eyebrow = 'INSTAGRAM SERVICES FOR AUSTRALIA';
hero.title = 'Buy Instagram Followers in Australia and Build a Stronger Profile';
hero.description =
  "Build a stronger visible audience around the Instagram profile you're already creating. NovaLikes gives Australian creators, businesses, brands and agencies a simple way to buy Instagram followers without sharing account login details. Choose a follower package that fits your profile, enter your public Instagram username and complete your order online. Whether you're launching a new creator account, growing an ecommerce brand, building a local business presence or preparing Instagram for a wider campaign, choose the follower increase that makes sense for where your profile is today.";
hero.primaryCta = { label: 'Choose Your Instagram Followers Package', href: '#pricing-packages' };
hero.trustLabels = [
  { id: 'ig-f-trust-public', label: 'Public Username Only' },
  { id: 'ig-f-trust-password', label: 'No Password Required' },
  { id: 'ig-f-trust-pricing', label: 'Clear Pricing' },
  { id: 'ig-f-trust-tracking', label: 'Order Tracking' },
];

pricing.title = 'Choose a Follower Package That Fits Your Profile';
pricing.description =
  'Every Instagram account is at a different stage. NovaLikes offers follower packages including 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Followers. A newer profile may only want a modest increase. An established creator, business or brand may prefer a larger package that better fits its existing presence. Before choosing, consider your current follower count, how established the account looks, what you\'re building toward and the increase you actually want.';
pricing.primaryCtaLabel = 'Compare Instagram Followers Packages';

benefits.title = 'Built Around Australian Creators, Businesses and Brands';
benefits.description =
  "Instagram is used differently depending on the account behind it. An Australian creator may be building a portfolio for future collaborations. An ecommerce brand may be preparing for a new product drop. A local business in Sydney, Melbourne, Brisbane, Perth or another Australian market may use Instagram to show recent work and help potential customers understand the business before making contact. An agency may manage several client accounts with completely different audiences and campaign goals. That means follower growth should fit the account rather than follow one fixed formula. The goal is not simply a larger number. It's a profile where the follower count makes sense alongside the presence you're building.";
benefits.items = [
  {
    id: 'ig-f-au-creators',
    title: 'Creators',
    description:
      "Build a clearer profile around your niche, strongest content and the audience you're trying to attract.",
  },
  {
    id: 'ig-f-au-ecom',
    title: 'Ecommerce Brands',
    description:
      'Support the profile around product launches, seasonal campaigns and content people may explore before visiting your store.',
  },
  {
    id: 'ig-f-au-local',
    title: 'Local Businesses',
    description:
      'Use Instagram alongside your website, Google presence and other channels to show customers who you are and what you do.',
  },
  {
    id: 'ig-f-au-agencies',
    title: 'Agencies',
    description:
      'Choose follower quantities based on the individual client profile instead of using one package across every campaign.',
  },
  {
    id: 'ig-f-au-brands',
    title: 'Established Brands',
    description:
      'Strengthen profile presentation while continuing your own content, advertising and customer engagement activity.',
  },
];

followersAuthority.whyChoose = {
  id: 'why-choose-novalikes-instagram-followers-australia',
  title: 'Why Choose NovaLikes for Instagram Followers?',
  description: 'Buying followers should be straightforward from package selection through checkout.',
  items: [
    {
      id: 'ig-f-wc-password',
      title: 'No Instagram Password Required',
      description:
        'NovaLikes does not need your Instagram password, verification codes or private login details.',
      icon: 'lock',
    },
    {
      id: 'ig-f-wc-packages',
      title: 'Flexible Package Sizes',
      description:
        'Choose the follower quantity that fits your profile rather than paying for one fixed option.',
      icon: 'users',
    },
    {
      id: 'ig-f-wc-pricing',
      title: 'Clear Pricing Before Checkout',
      description: 'Review available quantities and current prices before placing your order.',
      icon: 'credit-card',
    },
    {
      id: 'ig-f-wc-username',
      title: 'Public Username Only',
      description: 'Provide the correct public Instagram username for the profile receiving the followers.',
      icon: 'users',
    },
    {
      id: 'ig-f-wc-tracking',
      title: 'Order Tracking',
      description: 'Use your order details afterward to check available status updates.',
      icon: 'map-pin',
    },
    {
      id: 'ig-f-wc-support',
      title: 'Customer Support',
      description:
        'If you need help choosing a package or checking an existing order, contact NovaLikes with the relevant details.',
      icon: 'headphones',
    },
    {
      id: 'ig-f-wc-refund',
      title: 'Money-Back Protection on Eligible Orders',
      description: 'Eligible purchases are covered according to the current NovaLikes refund terms.',
      icon: 'shield-check',
    },
  ],
};

followersAuthority.canYouBuy = {
  id: 'grow-instagram-without-login-australia',
  title: 'Grow Your Instagram Presence Without Sharing Your Login',
  description:
    "You shouldn't need to hand over control of your Instagram account to place a follower order. NovaLikes uses the public profile information required for the service.",
  cards: [
    {
      id: 'ig-f-can-need',
      title: 'What You Need',
      description: 'Your correct public Instagram username.',
      icon: 'users',
    },
    {
      id: 'ig-f-can-not-need',
      title: "What You Don't Need",
      description: 'Your Instagram password, verification codes, private messages or login access.',
      icon: 'lock',
    },
  ],
  closingNote:
    "Before checkout, search the username yourself and make sure you're submitting the correct public profile. A small typing mistake can point to a completely different Instagram account.",
};

howItWorks.title = 'How Your Instagram Followers Order Works';
howItWorks.description =
  'Compare the available follower quantities and current prices, enter your public Instagram username, review the details, complete checkout without your password, and use NovaLikes order tracking afterward.';
howItWorks.steps = [
  {
    id: 'ig-f-step-1',
    title: 'Choose Your Package',
    description: 'Compare the available follower quantities and current prices.',
  },
  {
    id: 'ig-f-step-2',
    title: 'Enter Your Instagram Username',
    description: 'Provide the correct public username for the profile receiving the order.',
  },
  {
    id: 'ig-f-step-3',
    title: 'Review the Details',
    description: 'Check your follower quantity, username and package price before paying.',
  },
  {
    id: 'ig-f-step-4',
    title: 'Complete Checkout',
    description: 'Place your order without providing your Instagram password.',
  },
  {
    id: 'ig-f-step-5',
    title: 'Track the Order',
    description: 'Use NovaLikes order tracking for available status updates afterward.',
  },
];
(howItWorks.cta as Record<string, string>).label = 'Get Instagram Followers';

followersAuthority.whatHappens = {
  id: 'what-happens-after-instagram-followers-order-australia',
  title: 'What Happens After You Place an Order?',
  description:
    'After checkout, your follower package and submitted Instagram username are associated with the purchase. The order is then processed for the intended public profile.',
  steps: [
    {
      id: 'ig-f-th-1',
      title: 'Keep the Profile Accessible',
      description:
        'The submitted account should remain publicly accessible where required during processing.',
    },
    {
      id: 'ig-f-th-2',
      title: 'Avoid Username Changes',
      description:
        'Changing the username while an active order depends on it may interfere with processing.',
    },
    {
      id: 'ig-f-th-3',
      title: 'Check the Profile Before Paying',
      description: 'Make sure the username belongs to the account you actually intend to use.',
    },
    {
      id: 'ig-f-th-4',
      title: 'Follow the Order Status',
      description:
        'Processing time can vary depending on package size and current order conditions. Use NovaLikes tracking for available updates rather than assuming every follower package follows the same timeline.',
    },
  ],
  closingNote: '',
};

followersAuthority.bestPractices = {
  id: 'affordable-instagram-followers-australia',
  title: 'Looking for Affordable Instagram Followers in Australia?',
  description:
    "Price is naturally part of the decision when comparing follower services. If you're searching for cheap Instagram followers in Australia, look beyond the lowest number on the pricing table.",
  closingNote:
    'An affordable Instagram followers package should make those basics clear before you complete checkout. NovaLikes lets you compare the available quantities and pricing first so you can choose based on your profile and budget.',
  items: [
    { id: 'ig-f-bp-1', title: 'Follower Quantity', description: 'Check how many followers are included.', icon: 'users' },
    { id: 'ig-f-bp-2', title: 'Current Package Price', description: 'Review pricing before checkout.', icon: 'credit-card' },
    {
      id: 'ig-f-bp-3',
      title: 'Required Account Information',
      description: 'Confirm whether your password is requested.',
      icon: 'lock',
    },
    { id: 'ig-f-bp-4', title: 'Order Tracking', description: 'Check whether status updates are available.', icon: 'map-pin' },
    { id: 'ig-f-bp-5', title: 'Customer Support', description: 'Support should be available if you need help.', icon: 'headphones' },
    { id: 'ig-f-bp-6', title: 'Refund Terms', description: 'Review refund terms before paying.', icon: 'sparkles' },
    {
      id: 'ig-f-bp-7',
      title: 'What the Service Promises',
      description: 'Understand what the package actually changes.',
      icon: 'shield-check',
    },
  ],
};

followersAuthority.doesBuyingHelp = {
  id: 'real-instagram-followers-australia',
  title: "Looking for “Real Instagram Followers”? Know What You're Comparing",
  description:
    '"Real Instagram followers" is a common phrase used across follower services. You may also see terms such as high-quality Instagram followers, active Instagram followers or organic Instagram followers. Different providers may use these labels differently.',
  helpTitle: 'Questions to Ask',
  helpItems: [
    'What does the package actually change?',
    'How many followers are included?',
    'Which profile receives them?',
    'What information do I need to provide?',
    'Does the service guarantee anything beyond follower count?',
  ],
  limitTitle: 'What NovaLikes Follower Packages Do',
  limitItems: [
    'Increase the follower count displayed on the eligible public Instagram profile submitted with your order',
  ],
  closingNote:
    'They should not automatically be treated as guaranteed organic engagement, reach, customers or sales. Clear expectations are more useful than an undefined label.',
};

followersAuthority.serviceCompare = {
  id: 'followers-likes-views-comments-australia',
  title: 'Instagram Followers, Likes, Views or Comments: Start With Your Goal',
  description: 'Different Instagram services affect different metrics.',
  current: {
    title: 'Instagram Followers',
    description: 'Follower count displayed on your public profile',
    bestFor: 'Profile follower count',
    ctaLabel: 'Instagram Followers',
  },
  likes: {
    title: 'Instagram Likes',
    description: 'Like count on an eligible public post or Reel',
    bestFor: 'Eligible posts and Reels',
    href: `${AU}/buy-instagram-likes`,
    ctaLabel: 'Buy Instagram Likes',
  },
  views: {
    title: 'Instagram Views',
    description: 'View count on eligible public Reels or videos',
    bestFor: 'Eligible Reels and video content',
    href: `${AU}/buy-instagram-views`,
    ctaLabel: 'Buy Instagram Views',
  },
  combinedNote:
    'Choose Followers for your profile. Use Likes for individual content. Choose Views for video. Choose Comments for conversation. One service does not automatically include the others.',
  commentsHref: `${AU}/buy-instagram-comments`,
};

followersAuthority.beforeBuying = {
  id: 'before-you-buy-instagram-followers-australia',
  title: 'Before You Buy Instagram Followers in Australia',
  description: 'Run through these checks before placing your order.',
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
      description: 'Review how many followers are included.',
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
      description: 'Avoid making the submitted profile unavailable while processing requires access.',
      icon: 'shield-check',
    },
    {
      id: 'ig-f-bb-username-change',
      title: 'Avoid Username Changes',
      description: 'Changing your username during an active order may interfere with processing.',
      icon: 'lock',
    },
    {
      id: 'ig-f-bb-password',
      title: 'Keep Your Password Private',
      description: 'NovaLikes does not require your Instagram password.',
      icon: 'lock',
    },
    {
      id: 'ig-f-bb-service',
      title: 'Choose the Correct Service',
      description: 'Followers, Likes, Views and Comments are separate metrics.',
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
  id: 'follower-package-sizes-australia',
  title: 'Choose a Follower Package That Fits Your Profile',
  description:
    'NovaLikes offers follower packages including 100, 250, 500, 1K, 2.5K, 5K, 10K and 15K Followers. Consider your current follower count, how established the account looks, what you\'re building toward and the increase you actually want before choosing.',
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
  'au-ig-f-where-buy',
  'au-ig-f-get-more',
  'au-ig-f-cheap',
  'au-ig-f-real',
  'au-ig-f-how-many',
  'au-ig-f-password',
  'au-ig-f-info',
  'au-ig-f-cost',
  'au-ig-f-delivery',
  'au-ig-f-likes',
  'au-ig-f-reel-views',
  'au-ig-f-explore',
  'au-ig-f-business',
  'au-ig-f-local',
  'au-ig-f-client',
  'au-ig-f-track',
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
      description: 'Choose Views when the displayed view count on an eligible Reel or video is your priority.',
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
  'Choose the Instagram follower package that fits your profile, submit your public username and place your order without sharing your login details. Then keep strengthening what makes the number matter: clear positioning, useful content, genuine customer proof and a profile people have a reason to explore.';
(finalCta.primaryCta as Record<string, string>).label = 'Choose Your Instagram Followers Package';

followersAuthority.quickAnswer = {
  heading: 'Quick Answer: Where Can I Buy Instagram Followers in Australia?',
  text: 'You can buy Instagram followers in Australia through NovaLikes by choosing an available follower package, entering the correct public Instagram username and completing checkout online. Your Instagram password is not required. The service increases the follower count displayed on the selected profile and is separate from Instagram Likes, Views and Comments.',
};

followersAuthority.storySections = [
  {
    id: 'first-impression',
    title: 'Build a Stronger First Impression Around Your Instagram Profile',
    lead: 'When someone lands on an Instagram profile, follower count is one of several things they may notice.',
    bullets: [
      'your profile photo',
      'bio',
      'recent posts',
      'Reels',
      'pinned content',
      'highlights',
      'follower and following counts',
      'visible engagement',
      'overall visual consistency',
    ],
    paragraphs: [
      'A larger follower count can support how established the profile appears at first glance. But the rest of the account still needs to support that impression.',
      'For creators, make your niche easy to understand. For businesses, make it clear what you offer and where customers should go next. For brands, keep your content, visuals and messaging consistent.',
    ],
    footer:
      'Followers can strengthen one visible profile signal. The account behind that number still matters.',
  },
  {
    id: 'business-moments',
    title: 'Use Follower Growth Around the Right Business Moments',
    lead: 'Some periods bring more attention to your Instagram profile than others. That can make profile presentation more important.',
    footer:
      'Followers can support the visible size of the account. The campaign still needs strong content and a clear offer behind it.',
    items: [
      {
        title: 'Launching a New Brand',
        body: 'Build out the bio, visual identity and initial content before putting more attention behind the account.',
      },
      {
        title: 'Releasing a New Product',
        body: 'Make sure visitors can quickly find the product content that brought them to the profile.',
      },
      {
        title: 'Opening a New Location',
        body: 'Local businesses can update profile information and publish relevant location-based content before promoting the account.',
      },
      {
        title: 'Preparing a Seasonal Campaign',
        body: 'Australian businesses may have important campaigns around Christmas, Boxing Day, Black Friday, summer trading periods, events or industry-specific seasons.',
      },
      {
        title: 'Working With Creators',
        body: 'Collaboration content may bring new visitors who want to understand the brand or creator behind the campaign.',
      },
      {
        title: 'Expanding an Existing Business',
        body: 'If more marketing activity is sending people toward Instagram, make sure the profile is ready for that extra attention.',
      },
    ],
  },
  {
    id: 'better-profile',
    title: 'Turn Follower Growth Into a Better Instagram Profile',
    lead: 'A stronger follower count works best when someone who visits the account finds a profile worth exploring.',
    footer:
      'Follower growth can support the visible profile. Good profile management gives that growth context.',
    items: [
      { title: 'Make Your Bio Clear', body: 'A visitor should quickly understand who you are, what you create or what your business offers.' },
      { title: 'Keep Your Strongest Content Visible', body: 'Use pinned posts and Reels where appropriate to introduce the account.' },
      {
        title: 'Build Recognisable Content Themes',
        body: 'If your account jumps between unrelated subjects, new visitors may struggle to understand why they should follow.',
      },
      {
        title: 'Keep Recent Activity Strong',
        body: 'An active profile gives people more context behind the follower number.',
      },
      {
        title: 'Connect Business Profiles to a Next Step',
        body: "If you're using Instagram commercially, make it clear where interested customers can learn more, shop, enquire or contact you.",
      },
    ],
  },
  {
    id: 'content-worth-following',
    title: 'Build Followers Around Content People Would Actually Want to Follow',
    lead: 'Buying followers should not become a replacement for publishing. If long-term Instagram growth matters to you, continue building the part a follower package cannot create. The content.',
    footer:
      'Purchased followers can change the visible follower count. Your own audience behaviour should guide the content strategy.',
    items: [
      { title: 'Useful Reels', body: 'Create videos that demonstrate, explain, entertain or answer something relevant to your audience.' },
      { title: 'Strong Posts and Carousels', body: 'Use them to educate, show work, introduce products or tell a story.' },
      { title: 'Consistent Positioning', body: "Give people a recognizable reason to understand what they'll get by following you." },
      { title: 'Genuine Replies', body: 'When real people ask questions or leave meaningful comments, respond yourself.' },
      { title: 'Instagram Insights', body: 'Use your genuine account data to understand which content actually earns organic attention.' },
    ],
  },
  {
    id: 'reach-context',
    title: "More Followers Don't Automatically Mean More Reach",
    lead: 'Follower count and organic Instagram distribution are not the same thing.',
    bullets: [
      'more Reel views',
      'additional Likes',
      'more Comments',
      'Explore placement',
      'viral content',
      'organic followers',
      'website traffic',
      'customers',
      'enquiries',
      'sales',
      'brand partnerships',
    ],
    paragraphs: [
      'NovaLikes Instagram Followers packages are designed around the follower count displayed on the selected public profile.',
      'How Instagram distributes your content and how genuine people respond to it are separate outcomes. Use the service for the metric it actually changes.',
    ],
  },
  {
    id: 'brand-partnerships',
    title: 'Put Your Follower Count in Context for Brand Partnerships',
    paragraphs: [
      'Creators may care about follower count when building a profile they plan to show potential partners. But a professional brand or agency may evaluate much more than one audience number.',
      'That can include content quality, creator niche, audience relevance, genuine engagement, past collaborations, consistency, communication, campaign performance and professionalism.',
      'If partnerships are part of your goal, make the whole profile stronger. Use clear positioning. Publish strong examples of your work. Keep genuine analytics available where relevant.',
    ],
    footer: 'Treat follower count as one part of the picture rather than proof of influence by itself.',
  },
  {
    id: 'local-businesses',
    title: 'Instagram Followers for Australian Local Businesses',
    paragraphs: [
      'For local businesses, Instagram can work alongside your website, Google Business Profile and other marketing channels.',
      'A potential customer may visit Instagram because they want to see recent projects, products, team activity, before-and-after work, business personality, current promotions, customer interactions, location information or examples of what you offer.',
      'A larger follower number can make the account appear more established. But local trust comes from the real business behind the profile.',
      'Keep contact information accurate. Show genuine work. Use relevant Australian location context where it actually helps customers. And make the next step easy to find.',
    ],
  },
  {
    id: 'customer-proof',
    title: 'Use Follower Growth Alongside Real Customer Proof',
    paragraphs: [
      'Followers can contribute to visible social proof. They are not the same as genuine customer proof.',
      'For a business, stronger trust may also come from verified customer reviews, authentic testimonials, real project examples, client case studies, genuine tagged content, customer comments, accurate business details and professional website content.',
      "Don't invent reviews or testimonials to make an Instagram profile look stronger. If your business has genuine proof, use it.",
    ],
    footer: 'Follower count can support the presentation. Actual customer experience is what builds deeper trust.',
  },
  {
    id: 'measure-growth',
    title: 'Measure Instagram Growth Beyond Follower Count',
    lead: "Follower count tells you one thing about an Instagram profile. It doesn't tell you whether your overall strategy is working.",
    items: [
      {
        title: 'Which Content Earns Real Attention?',
        body: 'Compare posts and Reels over time.',
      },
      {
        title: 'Are Genuine People Visiting the Profile?',
        body: 'Profile activity can add context behind individual content performance.',
      },
      {
        title: 'What Creates Real Interaction?',
        body: 'Pay attention to genuine comments, shares, saves and messages where available.',
      },
      {
        title: 'Is the Audience Relevant?',
        body: 'For businesses and creators, the right audience can matter more than simply having the largest possible number.',
      },
      {
        title: 'Is Instagram Supporting Your Real Goal?',
        body: 'For a business, the outcome may be enquiries, website activity or sales. For a creator, it could be genuine audience growth or partnership opportunities.',
      },
    ],
    footer: 'Purchased followers change one visible metric. Use genuine data to make long-term growth decisions.',
  },
  {
    id: 'growth-framework',
    title: 'A Practical Instagram Growth Framework for Australian Accounts',
    lead: 'Follower count works best as one part of a complete profile strategy.',
    items: [
      { title: 'Define Your Position', body: 'Make your niche, brand or business easy to understand.' },
      { title: 'Build a Strong Content Base', body: 'Give visitors multiple useful posts and Reels to explore.' },
      { title: 'Keep Your Profile Current', body: 'Review your bio, links, pinned content and highlights regularly.' },
      { title: 'Publish With a Purpose', body: "Don't post only to maintain frequency. Know what each piece of content is trying to achieve." },
      { title: 'Use Genuine Insights', body: 'Let real account performance guide future content.' },
      { title: 'Respond to Your Audience', body: 'Treat genuine comments and messages as real conversations.' },
      {
        title: 'Connect Instagram to Wider Marketing',
        body: 'For businesses, Instagram may work alongside SEO, paid advertising, email, ecommerce, local search and your website.',
      },
      {
        title: 'Keep Followers in Perspective',
        body: "Visible audience size can support the account's presentation. Long-term growth still depends on content, positioning and genuine audience behaviour.",
      },
    ],
  },
];

data.followersAuthority = followersAuthority;

writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

const metaPath = path.join(process.cwd(), 'content/markets/au/metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  services: Record<string, { title: string; description: string }>;
};
meta.services['buy-instagram-followers'] = {
  title: 'Buy Instagram Followers Australia | NovaLikes',
  description:
    'Buy Instagram followers in Australia with flexible packages for public profiles. No password required, clear pricing, secure checkout and order tracking.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

const faqFile = path.join(process.cwd(), 'content/markets/au/service-faqs.json');
const faqs = JSON.parse(readFileSync(faqFile, 'utf8')) as Array<{ id: string; question: string; answer: string }>;
const auIgFaqs = [
  {
    id: 'au-ig-f-where-buy',
    question: 'Where can I buy Instagram followers in Australia?',
    answer:
      'You can buy Instagram followers in Australia through NovaLikes. Choose an available follower package, submit the correct public Instagram username and complete checkout without sharing your Instagram password.',
  },
  {
    id: 'au-ig-f-get-more',
    question: 'How can I get more Instagram followers in Australia?',
    answer:
      'NovaLikes follower packages can increase the follower count displayed on an eligible public Instagram profile. For organic growth, continue publishing useful content, improving your profile and reviewing genuine audience behaviour through Instagram Insights.',
  },
  {
    id: 'au-ig-f-cheap',
    question: 'Can I buy cheap Instagram followers in Australia?',
    answer:
      'NovaLikes offers multiple follower package sizes, allowing you to compare quantities and current pricing. When comparing cheaper options, also consider password requirements, tracking, support and what the service actually provides.',
  },
  {
    id: 'au-ig-f-real',
    question: 'What are real Instagram followers?',
    answer:
      '"Real Instagram followers" may be defined differently by different providers. Review the actual service details rather than relying only on the label. NovaLikes follower packages are designed to increase the follower count displayed on the eligible submitted profile.',
  },
  {
    id: 'au-ig-f-how-many',
    question: 'How many Instagram followers should I buy?',
    answer:
      'There is no single ideal quantity for every profile. Consider your current follower count, account activity, profile size and the increase you actually want before choosing a package.',
  },
  {
    id: 'au-ig-f-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password, verification codes or private account access.',
  },
  {
    id: 'au-ig-f-info',
    question: 'What information do I need?',
    answer: 'You need the correct public Instagram username for the profile receiving the follower order.',
  },
  {
    id: 'au-ig-f-cost',
    question: 'How much does it cost to buy Instagram followers in Australia?',
    answer: 'Pricing depends on the follower quantity you choose. NovaLikes displays the current package prices before checkout.',
  },
  {
    id: 'au-ig-f-delivery',
    question: 'How long does it take to get Instagram followers?',
    answer:
      'Processing time can vary depending on package size and current order conditions. Use NovaLikes order tracking for available status updates.',
  },
  {
    id: 'au-ig-f-likes',
    question: 'Will buying followers increase my Instagram Likes?',
    answer: 'Not automatically. Followers and Likes are separate Instagram metrics and separate NovaLikes services.',
  },
  {
    id: 'au-ig-f-reel-views',
    question: 'Will buying followers increase my Reel views?',
    answer:
      'Not automatically. Instagram Views is a separate service focused on eligible video and Reel view counts.',
  },
  {
    id: 'au-ig-f-explore',
    question: 'Will buying followers help my content reach Explore?',
    answer:
      'There is no guarantee. A follower package changes the visible follower count. Instagram content distribution depends on separate factors.',
  },
  {
    id: 'au-ig-f-business',
    question: 'Can Australian businesses buy Instagram followers?',
    answer:
      'Eligible public Instagram profiles used by Australian businesses, creators, brands, agencies and other supported account types can use NovaLikes follower packages.',
  },
  {
    id: 'au-ig-f-local',
    question: 'Can local businesses use Instagram follower packages?',
    answer:
      'Yes, provided the business uses an eligible public Instagram profile. Keep the business information and profile content accurate alongside your follower strategy.',
  },
  {
    id: 'au-ig-f-client',
    question: 'Can I order Instagram followers for a client?',
    answer:
      "If you're authorised to purchase services for the eligible client profile, use the correct public Instagram username when placing the order.",
  },
  {
    id: 'au-ig-f-track',
    question: 'Can I track my Instagram followers order?',
    answer: 'Yes. NovaLikes provides order tracking for available status information after checkout.',
  },
];

const withoutOld = faqs.filter((item) => !item.id.startsWith('au-ig-f-'));
writeFileSync(faqFile, `${JSON.stringify([...withoutOld, ...auIgFaqs], null, 2)}\n`, 'utf8');

console.log('Patched Australia Instagram Followers content from supplied copy.');
