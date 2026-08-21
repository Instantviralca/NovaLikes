import { routes } from '@/config/routes';
import type { FooterColumn } from '@/types';

/**
 * Global footer columns — Explore NovaLikes structure (sitewide).
 * Learn Center article destinations are omitted while that corpus is empty.
 */
export function getFooterColumns(): FooterColumn[] {
  return [
    {
      id: 'services',
      title: 'Popular Services',
      links: [
        { label: 'Buy Instagram Followers', href: '/buy-instagram-followers' },
        { label: 'Buy Instagram Likes', href: '/buy-instagram-likes' },
        { label: 'Buy Instagram Views', href: '/buy-instagram-views' },
        { label: 'Buy Instagram Comments', href: '/buy-instagram-comments' },
        { label: 'Buy TikTok Followers', href: '/buy-tiktok-followers' },
        { label: 'Buy TikTok Likes', href: '/buy-tiktok-likes' },
        { label: 'Buy TikTok Views', href: '/buy-tiktok-views' },
        { label: 'Buy Facebook Followers', href: '/buy-facebook-followers' },
        { label: 'Buy Facebook Page Likes', href: '/buy-facebook-page-likes' },
        { label: 'Buy Facebook Post Likes', href: '/buy-facebook-post-likes' },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        { label: 'Free Tools', href: routes.tools },
        { label: 'FAQ', href: routes.faq },
        { label: 'Blog', href: routes.learn },
      ],
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { label: 'About NovaLikes', href: routes.about },
        { label: 'Reviews', href: routes.reviews },
        { label: 'Contact', href: routes.contact },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      links: [
        { label: 'Track Order', href: routes.trackOrder },
        { label: 'Contact Support', href: routes.contact },
        { label: 'FAQ', href: routes.faq },
      ],
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: routes.privacyPolicy },
        { label: 'Refund Policy', href: routes.refundPolicy },
        { label: 'Terms & Conditions', href: routes.termsAndConditions },
        { label: 'Cookie Policy', href: routes.cookiePolicy },
        { label: 'Disclaimer', href: routes.disclaimer },
        { label: 'Sitemap', href: routes.sitemap },
      ],
    },
  ];
}

export const footerMeta = {
  title: 'Explore NovaLikes',
  paymentCopy: 'Secure card payments',
  socialLinks: [
    { label: 'Reviews', href: routes.reviews },
    { label: 'Contact', href: routes.contact },
  ],
} as const;
