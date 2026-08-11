import { routes, learnCategoryPath } from '@/config/routes';
import { getActiveLearnCategories } from '@/data/learn';
import type { FooterColumn } from '@/types';

function learnCategoryFooterLinks() {
  const labels: Record<string, string> = {
    instagram: 'Creator Guides',
    facebook: 'Facebook Guide',
    tiktok: 'TikTok Guide',
    youtube: 'YouTube Guide',
    'social-media-marketing': 'Social Media Marketing',
    guides: 'Guides',
  };

  return getActiveLearnCategories()
    .filter((category) => category.slug !== 'news')
    .map((category) => ({
      label: labels[category.slug] ?? category.name,
      href: learnCategoryPath(category.slug),
    }));
}

/**
 * Global footer columns — Explore NovaLikes structure (sitewide).
 * Resources keeps Learn category crawl paths for internal linking SEO.
 */
export function getFooterColumns(): FooterColumn[] {
  const learnLinks = learnCategoryFooterLinks();
  const instagramGuides = learnLinks.find((link) => link.href === '/learn/instagram');
  const otherLearnLinks = learnLinks.filter((link) => link.href !== '/learn/instagram');

  return [
    {
      id: 'services',
      title: 'Popular Services',
      links: [
        { label: 'Buy Instagram Followers', href: '/buy-instagram-followers' },
        { label: 'Buy Instagram Views', href: '/buy-instagram-views' },
        { label: 'Buy TikTok Followers', href: '/buy-tiktok-followers' },
        { label: 'Buy TikTok Likes', href: '/buy-tiktok-likes' },
        { label: 'Buy YouTube Subscribers', href: '/buy-youtube-subscribers' },
        { label: 'Buy YouTube Views', href: '/buy-youtube-views' },
        { label: 'Buy Facebook Followers', href: '/buy-facebook-followers' },
        { label: 'Buy Facebook Page Likes', href: '/buy-facebook-page-likes' },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        {
          label: 'How to Place an Order',
          href: '/#how-to-buy-instagram-followers',
        },
        { label: 'Learn Center', href: routes.learn },
        ...(instagramGuides
          ? [instagramGuides]
          : [{ label: 'Creator Guides', href: '/learn/instagram' }]),
        ...otherLearnLinks,
        { label: 'FAQ', href: routes.faq },
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
      ],
    },
  ];
}

export const footerMeta = {
  title: 'Explore NovaLikes',
  paymentCopy: 'Secure checkout · Common card and digital payment options at checkout',
  socialLinks: [
    { label: 'Creator Guides', href: '/learn/instagram' },
    { label: 'Reviews', href: routes.reviews },
    { label: 'Contact', href: routes.contact },
  ],
} as const;
