import { site } from '@/config/site';
import { truncateAtWordBoundary } from '@/seo/truncate';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';

export const META_DESCRIPTION_MAX = 150;
const DESCRIPTION_MAX = META_DESCRIPTION_MAX;

export function clampMetaDescription(text: string, max = DESCRIPTION_MAX): string {
  return truncateAtWordBoundary(text, max, '…');
}

/** Approved production meta descriptions. Do not rewrite or auto-truncate. */
export const descriptions = {
  home: () =>
    'Buy followers, likes, views and comments for Instagram, TikTok and Facebook. Compare available packages, order online and track your NovaLikes order.',

  service: (service: Service) => {
    if (service.slug === 'buy-instagram-followers') {
      return 'Compare Instagram follower packages and prices. Order for a public profile without a password. Eligible orders have a 30-Day Money-Back Guarantee.';
    }
    if (service.slug === 'buy-instagram-likes') {
      return 'Compare Instagram like packages for public posts and Reels. Add the required content link, choose a package and complete your order online.';
    }
    if (service.slug === 'buy-instagram-views') {
      return 'Compare Instagram view packages for eligible Reels and videos. Add the required public content link, choose a package and order online.';
    }
    if (service.slug === 'buy-instagram-comments') {
      return 'Compare Instagram comment packages for eligible posts and Reels. Add the public content link, choose a package and place your order online.';
    }
    if (service.slug === 'buy-tiktok-followers') {
      return 'Compare TikTok follower packages and prices. Order for a public profile without a password. Eligible orders have a 30-Day Money-Back Guarantee.';
    }
    if (service.slug === 'buy-tiktok-likes') {
      return 'Compare TikTok like packages and prices for a public video. Add the required video link, choose a package and complete your order online.';
    }
    if (service.slug === 'buy-tiktok-views') {
      return 'Compare TikTok view packages and prices for a public video. Add the required video link, choose a package and complete your order online.';
    }
    if (service.slug === 'buy-facebook-followers') {
      return 'Compare Facebook follower packages and prices for a public Page. Submit the correct Page URL, choose a package and complete your order online.';
    }
    if (service.slug === 'buy-facebook-page-likes') {
      return 'Compare Facebook Page Like packages and prices. Submit your public Page URL, choose a package and complete your order online.';
    }
    if (service.slug === 'buy-facebook-post-likes') {
      return 'Compare Facebook Post Like packages and prices. Submit the public post URL, choose a package and complete your order online.';
    }
    return `${service.name} from ${site.name}. Compare packages, review delivery details, and order securely with public profile or content details only.`;
  },

  learnIndex: () =>
    'Explore NovaLikes guides, tips and resources for Instagram, TikTok and Facebook, including platform features, tools and social media help.',

  learnArticle: (article: LearnArticle) =>
    clampMetaDescription(`${article.title} — NovaLikes Learn guide.`),

  about: () =>
    'Learn how NovaLikes works, what social media services we offer, and how we support Instagram, TikTok and Facebook orders from start to finish.',

  reviews: () =>
    'Read customer feedback about NovaLikes Instagram, TikTok and Facebook services, ordering, support and overall service experience.',

  contact: () =>
    'Contact NovaLikes for help with an order, payment, tracking or service question for Instagram, TikTok and Facebook.',

  faq: () =>
    'Find answers about NovaLikes orders, payments, refunds, tracking, account requirements and Instagram, TikTok and Facebook services.',

  privacyPolicy: () =>
    'Learn how NovaLikes collects, uses, stores and handles information when you use our website, paid services, free tools and support.',

  refundPolicy: () =>
    'Read the NovaLikes 30-Day Money-Back Guarantee, refund eligibility, exclusions, cancellations, refill terms and request process.',

  termsAndConditions: () =>
    'Read the terms that govern NovaLikes services, orders, payments, free tools, customer responsibilities, refunds and website use.',

  cookiePolicy: () =>
    'Learn how NovaLikes uses cookies and browser storage for cart functionality, admin sessions, preferences and other site features.',

  disclaimer: () =>
    'Read important limitations about NovaLikes services, third-party platforms, free tools, social media metrics and downloaded content.',

  toolsHub: () =>
    'Use free NovaLikes tools for Instagram, TikTok and Facebook, including video downloaders, profile viewers and public profile checks.',

  tiktokVideoDownloader: () =>
    'Paste a public TikTok video URL to find available MP4 download options. No TikTok login or app is required. Availability can vary by video.',

  tiktokProfilePictureDownloader: () =>
    'View and download a publicly available TikTok profile picture in full size. Enter a username, @handle or public profile URL. No TikTok login needed.',

  instagramVideoDownloader: () =>
    'Paste a public Instagram post or Reel URL to check for downloadable video media when Instagram exposes it. No Instagram login required.',

  instagramProfilePictureViewer: () =>
    'View and download the publicly available Instagram profile picture in full size. Enter a username or public profile URL. No Instagram login needed.',

  instagramProfileViewer: () =>
    'View publicly available Instagram profile details including photo, bio, followers, following and post count. No Instagram login required.',

  instagramFollowerCounter: () =>
    'Check the follower count Instagram makes publicly available for a profile. Enter a username or public profile URL. No Instagram login required.',

  facebookVideoDownloader: () =>
    'Paste a public Facebook video URL to find available HD or SD download options. No Facebook login or app is required for supported public videos.',

  facebookReelsDownloader: () =>
    'Paste a public Facebook Reel URL to find available HD or SD download options. No Facebook login or app is required for supported public Reels.',

  cart: () =>
    'Review the NovaLikes services and packages currently in your cart before continuing to checkout.',

  checkout: () =>
    'Review your order details and complete your NovaLikes purchase using the secure card payment option available at checkout.',

  trackOrder: () =>
    'Check the available status information for your NovaLikes order using the order details provided after checkout.',

  sitemap: () =>
    'Browse NovaLikes pages for social media services, free tools, support, guides and website policies.',
} as const;
