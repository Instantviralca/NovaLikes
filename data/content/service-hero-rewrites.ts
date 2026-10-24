/**
 * English service-page heroes — v2 (October 2026).
 * Pattern: eyebrow → H1 (keyword + benefit, keyword in gradient) → subtitle (why this service matters, then how/price)
 *          → 2 CTAs → one note line → 4 feature cards under the hero.
 * English /buy-* pages only. Locale (/de/ …) and market (/uk/ …) pages keep their current hero.
 * All copy is final. Do not edit wording in code.
 *
 * {fromPrice}: lowest active package price for that service, from the pricing registry,
 *              formatted exactly like the service-page price block. Never hard-code.
 * Facts used here (6–8h start, 4–6h finish, 6-month refill, 24/7 WhatsApp, USD) must stay
 * identical to the rest of the site. They live once in HERO_SHARED_FEATURES.
 * SEO <title>, meta description, canonical, hreflang, JSON-LD and image alt are NOT changed.
 */

export type HeroFeature = { icon: string; title: string; body: string };

export type HeroRewrite = {
  eyebrow: string;
  title: { lead: string; highlight: string; tail: string };
  subtitle: string;
  primaryCta: string;   // href = existing #pricing-packages anchor
  secondaryCta: string; // href = existing #how-it-works anchor
  /** First feature card. Unique per service. Cards 2–4 come from HERO_SHARED_FEATURES. */
  feature: HeroFeature;
  /** Floating card on the hero image. Quantity + price come from the registry's popular package. */
  floatingUnit: string;
};

/** Short line under the two buttons. Same on all 10 pages. */
export const HERO_NOTE = 'Prices in USD · Gradual delivery available on request';

/** Cards 2–4 of the feature row. Same facts on every page, written once. */
export const HERO_SHARED_FEATURES: [HeroFeature, HeroFeature, HeroFeature] = [
  { icon: 'Clock', title: 'Starts in 6–8 hours', body: 'Most orders begin within 6–8 hours and finish 4–6 hours later.' },
  { icon: 'RefreshCw', title: '6-month refill', body: 'If your count drops within 6 months of delivery, we refill it.' },
  { icon: 'MessageCircle', title: '24/7 WhatsApp support', body: 'Message us any time, before or after you order.' },
];

/** Floating "safe" card on the hero image. Same on all 10 pages. */
export const HERO_SAFE_CARD = { icon: 'ShieldCheck', label: 'No password', value: 'Never needed' };

export const SERVICE_HERO_REWRITES: Record<string, HeroRewrite> = {
  'buy-tiktok-followers': {
    eyebrow: 'TikTok followers',
    title: { lead: 'Buy', highlight: 'TikTok Followers', tail: 'for a Stronger First Impression' },
    subtitle:
      'Make your profile look established the moment someone lands on it. A bigger follower count adds social proof to every video you post. Username only, from {fromPrice}.',
    primaryCta: 'Buy TikTok Followers',
    secondaryCta: 'How It Works',
    feature: { icon: 'AtSign', title: 'Username only', body: 'Share your public username. We never ask for your login.' },
    floatingUnit: 'followers',
  },
  'buy-tiktok-likes': {
    eyebrow: 'TikTok likes',
    title: { lead: 'Buy', highlight: 'TikTok Likes', tail: 'to Give Your Videos More Social Proof' },
    subtitle:
      'Likes are the first thing viewers notice under a video. Give the clips you care about most a stronger count, from {fromPrice}, with just the video link and no login.',
    primaryCta: 'Buy TikTok Likes',
    secondaryCta: 'How It Works',
    feature: { icon: 'Link', title: 'Video link only', body: 'Paste the link to any public TikTok video.' },
    floatingUnit: 'likes',
  },
  'buy-tiktok-views': {
    eyebrow: 'TikTok views',
    title: { lead: 'Buy', highlight: 'TikTok Views', tail: 'for a Stronger Start on New Videos' },
    subtitle:
      'A low view count can make a good video look ignored. Give launches, promos and new uploads a stronger start, from {fromPrice}, with High Quality or Premium views.',
    primaryCta: 'Buy TikTok Views',
    secondaryCta: 'How It Works',
    feature: { icon: 'Layers', title: 'Two quality tiers', body: 'Pick High Quality or Premium views for each video.' },
    floatingUnit: 'views',
  },
  'buy-instagram-followers': {
    eyebrow: 'Instagram followers',
    title: { lead: 'Buy', highlight: 'Instagram Followers', tail: 'to Build Profile Credibility' },
    subtitle:
      'Brands, collaborators and new visitors check your follower count before they follow. Build a profile that looks trusted, from {fromPrice}, without sharing your Instagram password.',
    primaryCta: 'Buy Instagram Followers',
    secondaryCta: 'How It Works',
    feature: { icon: 'Lock', title: 'Your login stays private', body: 'We only need your public Instagram username.' },
    floatingUnit: 'followers',
  },
  'buy-instagram-likes': {
    eyebrow: 'Instagram likes',
    title: { lead: 'Buy', highlight: 'Instagram Likes', tail: 'for Posts and Reels That Stand Out' },
    subtitle:
      'Help your best photos, carousels and Reels look as popular as they deserve. Likes add social proof to any public post, from {fromPrice}, with no login needed.',
    primaryCta: 'Buy Instagram Likes',
    secondaryCta: 'How It Works',
    feature: { icon: 'Image', title: 'Posts, Reels & carousels', body: 'Works on every public post format.' },
    floatingUnit: 'likes',
  },
  'buy-instagram-views': {
    eyebrow: 'Instagram views',
    title: { lead: 'Buy', highlight: 'Instagram Views', tail: 'to Give Your Reels a Stronger Start' },
    subtitle:
      'Reels with a healthy view count look worth watching. Lift new Reels, product videos and tutorials from {fromPrice}, and ask for gradual delivery if you want a steadier pace.',
    primaryCta: 'Buy Instagram Views',
    secondaryCta: 'How It Works',
    feature: { icon: 'PlayCircle', title: 'Reels & videos', body: 'Works on public Reels and video posts.' },
    floatingUnit: 'views',
  },
  'buy-instagram-comments': {
    eyebrow: 'Instagram comments',
    title: { lead: 'Buy', highlight: 'Instagram Comments', tail: 'to Start the Conversation' },
    subtitle:
      'A post with comments feels active and invites others to join in. Get High Quality comments, or Premium ones written around your post, from {fromPrice}. You can also send your own wording.',
    primaryCta: 'Buy Instagram Comments',
    secondaryCta: 'How It Works',
    feature: { icon: 'PenLine', title: 'Custom wording', body: 'Send your own comments or a language in the checkout note.' },
    floatingUnit: 'comments',
  },
  'buy-facebook-followers': {
    eyebrow: 'Facebook followers',
    title: { lead: 'Buy', highlight: 'Facebook Followers', tail: 'to Grow Your Page or Profile' },
    subtitle:
      'Followers show people your updates are worth following, on a business Page or a public profile. Grow yours from {fromPrice}, with no password or admin access.',
    primaryCta: 'Buy Facebook Followers',
    secondaryCta: 'How It Works',
    feature: { icon: 'Users', title: 'Pages & profiles', body: 'Works for Pages and for profiles with public followers on.' },
    floatingUnit: 'followers',
  },
  'buy-facebook-page-likes': {
    eyebrow: 'Facebook Page likes',
    title: { lead: 'Buy', highlight: 'Facebook Page Likes', tail: 'to Build Trust in Your Page' },
    subtitle:
      'On older Facebook Pages, the like count is often the first thing visitors use to judge trust. Build yours from {fromPrice}. Newer Pages show followers instead, so check yours first.',
    primaryCta: 'Buy Facebook Page Likes',
    secondaryCta: 'How It Works',
    feature: { icon: 'Flag', title: 'For Pages with a like count', body: 'Newer Pages show followers instead. Check yours first.' },
    floatingUnit: 'Page likes',
  },
  'buy-facebook-post-likes': {
    eyebrow: 'Facebook post likes',
    title: { lead: 'Buy', highlight: 'Facebook Post Likes', tail: 'to Add Social Proof to Your Posts' },
    subtitle:
      'Offers, announcements and promotions get more attention when they already have reactions. Add likes to any public post from {fromPrice}, with Love or other reactions on request.',
    primaryCta: 'Buy Facebook Post Likes',
    secondaryCta: 'How It Works',
    feature: { icon: 'SmilePlus', title: 'Reactions on request', body: 'Likes by default. Love or other reactions on request.' },
    floatingUnit: 'post likes',
  },
};

/**
 * Gradient word for existing H1s that are NOT rewritten (text unchanged, markup only).
 * Key = route. The highlight must be an exact substring of the current H1.
 */
export const H1_HIGHLIGHTS: Record<string, string> = {
  '/about': 'NovaLikes',
  '/contact': 'NovaLikes',
  '/faq': 'Questions',
  '/reviews': 'Reviews',
  '/tools': 'Tools',
  '/track-order': 'Order',
  '/terms-and-conditions': 'Conditions',
  '/refund-policy': 'Policy',
  '/privacy-policy': 'Policy',
  '/cookie-policy': 'Policy',
  '/disclaimer': 'Disclaimer',
};
