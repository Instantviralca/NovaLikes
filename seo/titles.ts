import { site } from '@/config/site';
import { truncateAtWordBoundary } from '@/seo/truncate';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';

export const META_TITLE_MAX = 58;

function clampMetaTitle(title: string): string {
  const cleaned = title.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= META_TITLE_MAX) return cleaned;
  const sliced = cleaned.slice(0, META_TITLE_MAX);
  const lastSpace = sliced.lastIndexOf(' ');
  return lastSpace >= 20 ? sliced.slice(0, lastSpace).trimEnd() : sliced.trimEnd();
}

function articleFallbackTitle(articleTitle: string): string {
  const suffix = ` | ${site.name}`;
  const full = `${articleTitle}${suffix}`;
  if (full.length <= META_TITLE_MAX) return full;
  const budget = META_TITLE_MAX - suffix.length;
  if (budget < 1) return truncateAtWordBoundary(site.name, META_TITLE_MAX);
  return `${truncateAtWordBoundary(articleTitle, budget)}${suffix}`;
}

/** CMS SEO title when present; otherwise `{title} | NovaLikes`, clamped to 58. */
export function resolveArticleMetaTitle(
  seoTitle: string | undefined | null,
  articleTitle: string,
): string {
  const cms = seoTitle?.trim();
  if (cms) return clampMetaTitle(cms);
  return articleFallbackTitle(articleTitle);
}

/** Approved production meta titles. Do not rewrite. */
export const titles = {
  home: () => 'Buy Followers, Likes & Views for Social Media | NovaLikes',

  service: (service: Service) => {
    if (service.slug === 'buy-instagram-followers') {
      return 'Buy Instagram Followers – No Password Needed | NovaLikes';
    }
    if (service.slug === 'buy-instagram-likes') {
      return 'Buy Instagram Likes for Posts & Reels | NovaLikes';
    }
    if (service.slug === 'buy-instagram-views') {
      return 'Buy Instagram Views for Reels & Videos | NovaLikes';
    }
    if (service.slug === 'buy-instagram-comments') {
      return 'Buy Instagram Comments for Posts & Reels | NovaLikes';
    }
    if (service.slug === 'buy-tiktok-followers') {
      return 'Buy TikTok Followers – No Password Needed | NovaLikes';
    }
    if (service.slug === 'buy-tiktok-likes') {
      return 'Buy TikTok Likes for Videos | NovaLikes';
    }
    if (service.slug === 'buy-tiktok-views') {
      return 'Buy TikTok Views for Videos | NovaLikes';
    }
    if (service.slug === 'buy-facebook-followers') {
      return 'Buy Facebook Followers – Page Packages | NovaLikes';
    }
    if (service.slug === 'buy-facebook-page-likes') {
      return 'Buy Facebook Page Likes – Packages & Prices | NovaLikes';
    }
    if (service.slug === 'buy-facebook-post-likes') {
      return 'Buy Facebook Post Likes – Packages & Prices | NovaLikes';
    }
    return `${service.name} | ${site.name}`;
  },

  learnIndex: () => 'Social Media Guides, Tips & Resources | NovaLikes',

  learnArticle: (article: LearnArticle) => articleFallbackTitle(article.title),

  company: (pageName: string) => {
    if (pageName === 'About') {
      return 'About NovaLikes | Instagram, TikTok & Facebook Services';
    }
    if (pageName === 'Contact') {
      return 'Contact NovaLikes | Order & Service Support';
    }
    if (pageName === 'FAQ') {
      return 'NovaLikes FAQ | Orders, Payments, Refunds & Support';
    }
    if (pageName === 'Reviews') {
      return 'NovaLikes Reviews | Customer Feedback & Experiences';
    }
    return `${pageName} | ${site.name}`;
  },

  legal: (pageName: string) => {
    if (pageName === 'Privacy Policy') {
      return 'Privacy Policy | NovaLikes';
    }
    if (pageName === 'Terms & Conditions' || pageName === 'Terms and Conditions') {
      return 'Terms and Conditions | NovaLikes';
    }
    if (pageName === 'Refund Policy') {
      return 'Refund Policy | 30-Day Money-Back Guarantee | NovaLikes';
    }
    if (pageName === 'Cookie Policy') {
      return 'Cookie Policy | NovaLikes';
    }
    if (pageName === 'Disclaimer') {
      return 'Disclaimer | NovaLikes';
    }
    return `${pageName} | ${site.name}`;
  },

  fallback: () => site.name,

  toolsHub: () => 'Free Social Media Tools | Instagram, TikTok & Facebook',

  tiktokVideoDownloader: () => 'Free TikTok Video Downloader – MP4 | NovaLikes',
  tiktokProfilePictureDownloader: () =>
    'TikTok Profile Picture Downloader – Full Size | NovaLikes',
  instagramVideoDownloader: () => 'Instagram Video Downloader – Public Videos | NovaLikes',
  instagramProfilePictureViewer: () =>
    'Instagram Profile Picture Viewer – Full Size | NovaLikes',
  instagramProfileViewer: () => 'Instagram Profile Viewer – Public Profiles | NovaLikes',
  instagramFollowerCounter: () => 'Instagram Follower Count Checker – Free | NovaLikes',
  facebookVideoDownloader: () => 'Facebook Video Downloader – Free HD & SD | NovaLikes',
  facebookReelsDownloader: () => 'Facebook Reels Downloader – Free HD & SD | NovaLikes',

  tool: (name: string) => `${name} | ${site.name}`,

  cart: () => 'Your Cart | NovaLikes',
  checkout: () => 'Secure Checkout | NovaLikes',
  trackOrder: () => 'Track Your Order | NovaLikes',
  sitemap: () => 'Sitemap | NovaLikes',
} as const;
