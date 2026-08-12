import { site } from '@/config/site';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';

/** Title formulas from Document 05 / 09.11. */
export const titles = {
  home: () => `Grow on Instagram, TikTok, Facebook & YouTube | ${site.name}`,

  service: (service: Service) => {
    if (service.slug === 'buy-instagram-followers') {
      return `Instagram Followers Packages & Pricing | ${site.name}`;
    }
    if (service.slug === 'buy-instagram-likes') {
      return `Buy Instagram Likes | ${site.name}`;
    }
    if (service.slug === 'buy-instagram-views') {
      return `Buy Instagram Views | ${site.name}`;
    }
    if (service.slug === 'buy-instagram-comments') {
      return `Buy Instagram Comments | ${site.name}`;
    }
    if (service.slug === 'buy-tiktok-followers') {
      return `Buy TikTok Followers | ${site.name}`;
    }
    if (service.slug === 'buy-tiktok-likes') {
      return `Buy TikTok Likes | ${site.name}`;
    }
    if (service.slug === 'buy-tiktok-views') {
      return `Buy TikTok Views | ${site.name}`;
    }
    if (service.slug === 'buy-facebook-followers') {
      return `Buy Facebook Followers | Packages & Pricing`;
    }
    if (service.slug === 'buy-facebook-page-likes') {
      return `Buy Facebook Page Likes | ${site.name}`;
    }
    if (service.slug === 'buy-facebook-post-likes') {
      return `Buy Facebook Post Likes | ${site.name}`;
    }
    if (service.slug === 'buy-youtube-subscribers') {
      return `Buy YouTube Subscribers | Packages & Pricing`;
    }
    if (service.slug === 'buy-youtube-views') {
      return `Buy YouTube Views | Packages & Pricing`;
    }
    return `${service.name} | ${site.name}`;
  },

  learnIndex: () => `Learn | ${site.name}`,

  learnArticle: (article: LearnArticle) => `${article.title} | Learn | ${site.name}`,

  company: (pageName: string) => {
    if (pageName === 'About') {
      return 'About NovaLikes | Social Media Growth Since 2018';
    }
    if (pageName === 'Contact') {
      return 'Contact NovaLikes | Customer Support';
    }
    if (pageName === 'FAQ') {
      return 'NovaLikes FAQ | Orders, Delivery, Payments & Support';
    }
    return `${pageName} | ${site.name}`;
  },

  legal: (pageName: string) => {
    if (pageName === 'Privacy Policy') {
      return 'Privacy Policy | NovaLikes';
    }
    if (pageName === 'Terms & Conditions') {
      return 'Terms & Conditions | NovaLikes';
    }
    if (pageName === 'Refund Policy') {
      return 'Refund Policy | NovaLikes';
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
} as const;
