/**
 * Apply supplied Canada homepage copy to content/markets/ca/homepage.json
 * Run: npx tsx scripts/patch-ca-homepage.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { homepageHub } from '../data/content/homepage-hub';

const CA_PREFIX = '/ca';
const OUT = path.join(process.cwd(), 'content/markets/ca');

function caHref(href: string): string {
  if (href.startsWith('/buy-')) return `${CA_PREFIX}${href}`;
  return href;
}

function prefixHrefs<T>(value: T): T {
  if (typeof value === 'string') {
    if (value.startsWith('/buy-')) return `${CA_PREFIX}${value}` as T;
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => prefixHrefs(item)) as T;
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = prefixHrefs(child);
    }
    return result as T;
  }
  return value;
}

const hub = prefixHrefs(structuredClone(homepageHub));

hub.hero = {
  ...hub.hero,
  eyebrow: 'INSTAGRAM GROWTH FOR CANADA',
  title: 'Grow Your Instagram Presence in Canada With Followers, Likes, Views & Comments',
  description:
    'Build a stronger Instagram presence around the profile, posts and Reels that matter most. NovaLikes gives Canadian creators, businesses, brands and agencies a straightforward way to grow the Instagram metrics that matter to them. Increase your profile follower count, add more Likes to important posts, put more Views behind Reels, or build visible conversation with Comments. Choose your service, compare the available packages and place your order using only the public profile or content details required. Your Instagram password stays private.',
  primaryCta: { label: 'Explore Instagram Services', href: '#instagram-services' },
  secondaryCta: { label: 'Compare Packages', href: '#services-overview' },
  trustFeatures: [
    { id: 'password', line1: 'No Password', line2: 'Required', icon: 'shield' },
    { id: 'pricing', line1: 'Clear', line2: 'Pricing', icon: 'tag' },
    { id: 'payments', line1: 'Secure Card', line2: 'Payments', icon: 'shield' },
    { id: 'tracking', line1: 'Order', line2: 'Tracking', icon: 'truck' },
  ],
};

hub.platformSelector = {
  ...hub.platformSelector,
  eyebrow: 'Instagram Services',
  title: 'Start With the Instagram Result You Want',
  description:
    "You don't need every Instagram metric at once. Start with the part of your presence you're actually trying to strengthen.",
  platforms: hub.platformSelector.platforms.map((platform) => {
    if (platform.id !== 'instagram') return platform;
    return {
      ...platform,
      description:
        'Followers, Likes, Views and Comments for Instagram profiles and content in Canada.',
      tags: [
        { label: 'Instagram Followers', href: caHref('/buy-instagram-followers'), icon: 'user' as const },
        { label: 'Instagram Likes', href: caHref('/buy-instagram-likes'), icon: 'heart' as const },
        { label: 'Instagram Views', href: caHref('/buy-instagram-views'), icon: 'play' as const },
        { label: 'Instagram Comments', href: caHref('/buy-instagram-comments'), icon: 'comment' as const },
      ],
    };
  }),
};

hub.servicesOverview = {
  ...hub.servicesOverview,
  eyebrow: 'Choose the Right Metric',
  title: 'Profile Growth or Content Engagement? Choose the Right Metric',
  description:
    'Instagram Followers, Likes, Views and Comments do different jobs. Choose based on what you want to change. Followers do not automatically include Likes. Likes do not automatically add Views. Views do not automatically add Followers. Comments are another separate content metric. That makes it easier to choose a package without paying for the wrong type of service.',
  trustNote: 'Your Goal → Start With the Right Service',
  features: [
    { id: 'followers', label: 'Profile audience → Instagram Followers', icon: 'users' },
    { id: 'likes', label: 'Post engagement → Instagram Likes', icon: 'bolt' },
    { id: 'views', label: 'Video view count → Instagram Views', icon: 'headset' },
    { id: 'comments', label: 'Visible conversation → Instagram Comments', icon: 'shield' },
  ],
};

hub.platformGroupTitles = {
  instagram: {
    id: 'instagram-services',
    title: 'Instagram Growth in Canada',
    description:
      'Built around the way Canadian creators and businesses use Instagram. A creator preparing for a brand collaboration may care most about the overall presentation of the profile. An ecommerce business launching a new collection may put more attention behind a product Reel. A local Canadian business may want its profile to look established when potential customers arrive from search, ads, referrals or its website. An agency managing client campaigns may need different services for different assets rather than one generic package. NovaLikes lets you start with the metric that fits the campaign.',
  },
  tiktok: {
    id: 'tiktok-services',
    title: 'TikTok Services for Canada',
    description:
      'Use TikTok Followers, Likes or Views when you\'re working on a public TikTok profile or video. Choose each platform based on where the audience and content actually live.',
  },
  facebook: {
    id: 'facebook-services',
    title: 'Facebook Services for Canada',
    description:
      'Use Facebook Followers, Page Likes or Post Likes when you\'re working on an eligible public Facebook Page or post.',
  },
};

const igServiceUpdates: Record<string, Partial<(typeof hub.services)[number]>> = {
  'ig-followers': {
    commercialLabel: 'INSTAGRAM FOLLOWERS',
    title: 'Build a Stronger Profile Audience',
    intro:
      'Increase the follower count displayed on your public Instagram profile. A Followers package can make sense when you\'re building a newer creator account, preparing a business profile for a campaign, or strengthening the visible audience around an established brand.',
    points: [
      {
        title: 'Profile Follower Count',
        text: 'Increase the follower count displayed on your public Instagram profile.',
      },
      {
        title: 'For Creators and Businesses',
        text: 'Useful when building a newer creator account, preparing a business profile for a campaign, or strengthening an established brand presence.',
      },
      {
        title: 'Stronger First Impressions',
        text: 'The follower number is one thing people may notice — but bio, profile image, posts, Reels and consistency matter too.',
      },
      {
        title: 'Choose the Right Metric',
        text: 'If your goal is post engagement rather than profile audience, explore Instagram Likes, Views or Comments instead.',
      },
    ],
    cta: { label: 'Buy Instagram Followers', href: caHref('/buy-instagram-followers') },
  },
  'ig-likes': {
    commercialLabel: 'INSTAGRAM LIKES',
    title: 'Put More Engagement Behind Your Best Content',
    intro:
      'Add Likes to an eligible public Instagram post or Reel. Use Likes when the content itself is the priority, whether that\'s a launch post, collaboration, campaign creative, portfolio piece or important brand update.',
    points: [
      {
        title: 'For Posts and Reels',
        text: 'Add Likes to an eligible public Instagram post or Reel.',
      },
      {
        title: 'Content-First Growth',
        text: 'Use Likes when the content itself is the priority — launch posts, collaborations, campaign creative or brand updates.',
      },
      {
        title: 'Priority Content',
        text: 'Identify your priority content first — a Reel introducing your business, product demonstration, collaboration or campaign launch.',
      },
      {
        title: 'Separate From Followers',
        text: 'Likes do not automatically add Followers. Choose the metric that supports the content you care about most.',
      },
    ],
    cta: { label: 'Buy Instagram Likes', href: caHref('/buy-instagram-likes') },
  },
  'ig-views': {
    commercialLabel: 'INSTAGRAM VIEWS',
    title: 'Give Important Reels More Visible Attention',
    intro:
      'Increase the displayed view count on eligible Instagram Reels and video content. Choose Views when you\'re working on video rather than your overall profile follower count.',
    points: [
      {
        title: 'For Reels and Videos',
        text: 'Increase the displayed view count on eligible Instagram Reels and video content.',
      },
      {
        title: 'Video-Focused',
        text: 'Choose Views when you\'re working on video rather than your overall profile follower count.',
      },
      {
        title: 'Support Priority Reels',
        text: 'Give your best Reels more visible attention — demonstrations, stories, comparisons or evergreen content.',
      },
      {
        title: 'Separate Metric',
        text: 'Views do not automatically add Followers. Comments and Likes are separate services too.',
      },
    ],
    cta: { label: 'Buy Instagram Views', href: caHref('/buy-instagram-views') },
  },
  'ig-comments': {
    commercialLabel: 'INSTAGRAM COMMENTS',
    title: 'Build More Visible Conversation Around a Post',
    intro:
      'Add comments to eligible public Instagram posts and Reels. Comments give content a different type of visible interaction from Likes or Views and can be useful around posts built for discussion, announcements, collaborations and campaigns.',
    points: [
      {
        title: 'Visible Conversation',
        text: 'Comments give content a different type of visible interaction from Likes or Views.',
      },
      {
        title: 'For Discussion Posts',
        text: 'Useful around posts built for discussion, announcements, collaborations and campaigns.',
      },
      {
        title: 'Content Specific',
        text: 'Choose Comments when visible conversation makes sense for the post rather than profile follower count.',
      },
      {
        title: 'Focused Growth',
        text: 'This keeps your Instagram growth focused instead of spreading packages across content with no clear purpose.',
      },
    ],
    cta: { label: 'Buy Instagram Comments', href: caHref('/buy-instagram-comments') },
  },
};

hub.services = hub.services.map((service) => {
  const update = igServiceUpdates[service.id];
  if (update) return { ...service, ...update };
  return {
    ...service,
    href: caHref(service.href),
    cta: { ...service.cta, href: caHref(service.cta.href) },
  };
});

hub.why = {
  ...hub.why,
  title: 'Why Canadian Customers Choose NovaLikes',
  description:
    'Instagram growth looks different depending on what you\'re building. NovaLikes keeps the ordering process straightforward for Canadian creators, businesses, brands and agencies.',
  points: [
    {
      title: 'No Instagram Password Required',
      body: 'NovaLikes does not need your Instagram password or verification codes to process Instagram service orders.',
    },
    {
      title: 'Clear Package Options',
      body: 'See the available quantities and prices before you place your order.',
    },
    {
      title: 'Secure Card Payments & Order Tracking',
      body: 'Complete checkout online using the payment options currently available through NovaLikes. Use NovaLikes order tracking for available status updates after checkout.',
    },
    {
      title: 'Customer Support & 30-Day Money-Back Guarantee',
      body: 'If something needs checking, contact support with your relevant order information. Eligible orders are covered according to the current NovaLikes refund terms.',
    },
  ],
};

hub.howItWorks = {
  ...hub.howItWorks,
  title: 'From Profile Growth to Reel Engagement in a Few Steps',
  description: 'No Instagram password is required.',
  steps: [
    {
      title: 'Choose Your Goal',
      body: 'Start with Followers, Likes, Views or Comments.',
    },
    {
      title: 'Pick a Package',
      body: 'Compare the available quantities and current pricing.',
    },
    {
      title: 'Add the Required Public Details',
      body: 'Followers use the public profile information requested during checkout. Likes, Views and Comments use the eligible public post or Reel details required for those services.',
    },
    {
      title: 'Review, Pay and Track Your Order',
      body: 'Check the service, quantity and submitted details before completing checkout. Use your NovaLikes order information for available status updates.',
    },
  ],
};

hub.guarantees = {
  ...hub.guarantees,
  title: 'More Followers Don\'t Automatically Mean More Reach',
  description:
    'A bigger follower count and organic Instagram distribution are different things. NovaLikes services are designed around the specific visible metric described by each package.',
  items: [
    {
      title: 'Not Guaranteed: Viral Reels or Explore Placement',
      body: 'Purchased metrics should not be treated as guarantees of viral Reels or Explore placement.',
    },
    {
      title: 'Not Guaranteed: Organic Follower Growth',
      body: 'More Likes do not automatically create more Followers. More Reel Views do not automatically create sales.',
    },
    {
      title: 'Not Guaranteed: Business Results',
      body: 'Services should not be treated as guarantees of brand partnerships, website traffic, customers, leads or sales.',
    },
    {
      title: 'Buy for the Outcome the Service Provides',
      body: 'This distinction helps you buy for the outcome the service actually provides instead of expecting one metric to control everything else.',
    },
  ],
};

hub.beforeYouBuy = {
  ...hub.beforeYouBuy,
  title: 'Affordable Instagram Growth Without Guesswork',
  description:
    'Looking for affordable Instagram growth shouldn\'t mean buying the first cheap package you find. NovaLikes keeps these basics visible so you can compare the available services and choose based on your account, content and budget.',
  items: [
    {
      question: 'Which metric changes?',
      answer:
        'Check what you\'re actually getting — Followers, Likes, Views or Comments — and how many are included.',
    },
    {
      question: 'What information is required?',
      answer:
        'Confirm whether the provider asks for your Instagram password, and what public profile or content details are needed.',
    },
    {
      question: 'Can you see pricing before checkout?',
      answer:
        'Package quantities and prices should be visible before you pay, with secure checkout and order tracking available.',
    },
    {
      question: 'Are policies and support available?',
      answer:
        'Service and refund policies should be easy to find, and customer support should be available if you need help.',
    },
  ],
};

hub.faq = {
  ...hub.faq,
  title: 'Frequently Asked Questions',
  description: 'Common questions about NovaLikes Instagram growth services in Canada.',
  items: [
    {
      question: 'What Instagram growth services does NovaLikes offer in Canada?',
      answer:
        'NovaLikes offers Instagram Followers, Likes, Views and Comments for eligible public profiles, posts and Reels. Choose the service based on the metric you want to work on.',
    },
    {
      question: 'Where can I buy Instagram followers in Canada?',
      answer:
        'You can use the NovaLikes Instagram Followers service to choose a follower package for an eligible public Instagram profile. Submit the required public username and order without sharing your Instagram password.',
    },
    {
      question: 'Which Instagram service should I choose?',
      answer:
        'Choose Followers for profile audience size, Likes for visible engagement on a post or Reel, Views for eligible video view count and Comments for visible conversation around content.',
    },
    {
      question: 'Do I need to share my Instagram password?',
      answer:
        'No. NovaLikes does not require your Instagram password or verification codes for these Instagram services.',
    },
    {
      question: 'Can I track my Instagram order?',
      answer:
        'Yes. NovaLikes provides an order tracking option for available status information after checkout.',
    },
    {
      question: 'Does NovaLikes have a money-back guarantee?',
      answer:
        'Eligible orders are covered by the NovaLikes 30-day money-back guarantee according to the current Refund Policy.',
    },
  ],
};

hub.finalCta = {
  ...hub.finalCta,
  eyebrow: 'Instagram Growth for Canada',
  title: 'Ready to Strengthen Your Instagram Presence?',
  description:
    'Start with the metric that matters most to your profile or campaign. Build your visible audience with Followers. Put more engagement behind important posts with Likes. Give your best Reels more visible Views. Or add more conversation around selected content with Comments. Choose your Instagram service, compare the available packages and place your order without sharing your password.',
  primaryCta: { label: 'Explore Instagram Services', href: '#instagram-services' },
  secondaryCta: { label: 'Compare Packages', href: '#services-overview' },
  trustItems: [
    { id: 'secure', label: 'No Password Required', icon: 'shield' },
    { id: 'delivery', label: 'Clear Pricing', icon: 'bolt' },
    { id: 'support', label: 'Secure Card Payments', icon: 'headset' },
    { id: 'tracking', label: 'Order Tracking', icon: 'shield' },
  ],
};

const hubOut = hub as typeof hub & {
  instagramOnly?: boolean;
  hideReviews?: boolean;
  crossPlatform?: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    platforms: Array<{
      id: 'tiktok' | 'facebook';
      title: string;
      description: string;
      cta: { label: string; href: string };
    }>;
  };
};

hubOut.instagramOnly = true;
hubOut.hideReviews = true;
hubOut.crossPlatform = {
  id: 'cross-platform',
  eyebrow: 'More Platforms',
  title: 'Instagram First. TikTok and Facebook When Your Campaign Needs Them.',
  description:
    'NovaLikes is built around Instagram growth for Canada, but you can also use TikTok and Facebook services when your audience or campaign lives on those platforms. Choose each platform based on where the content and audience actually are.',
  platforms: [
    {
      id: 'tiktok',
      title: 'TikTok Services for Canada',
      description:
        'Use TikTok Followers, Likes or Views when you\'re working on a public TikTok profile or video.',
      cta: { label: 'View TikTok Services', href: caHref('/buy-tiktok-followers') },
    },
    {
      id: 'facebook',
      title: 'Facebook Services for Canada',
      description:
        'Use Facebook Followers, Page Likes or Post Likes when you\'re working on an eligible public Facebook Page or post.',
      cta: { label: 'View Facebook Services', href: caHref('/buy-facebook-followers') },
    },
  ],
};

hub.platformSelector.socialProof = {
  text: 'Compare Instagram follower, like, view and comment packages',
  href: '#services-overview',
};

hub.hero.visual = {
  ...hub.hero.visual,
  alt: 'NovaLikes Instagram growth illustration for Canadian creators and businesses',
};

writeFileSync(path.join(OUT, 'homepage.json'), `${JSON.stringify(hubOut, null, 2)}\n`, 'utf8');

const metaPath = path.join(OUT, 'metadata.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
  homepage: { title: string; description: string };
};
meta.homepage = {
  title: 'Instagram Growth Services Canada | Followers, Likes & Views',
  description:
    'Grow your Instagram presence in Canada with follower, like, view and comment packages. Clear pricing, no password required and order tracking with NovaLikes.',
};
writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

console.log('Patched Canada homepage with supplied copy.');
