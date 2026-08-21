/**
 * Shared public directory for XML/HTML sitemaps and llms.txt.
 * Indexable public URLs only — no admin, commerce, preview, or unsupported platforms.
 */

import { learnArticlePath, routes } from '@/config/routes';
import { getIndexableArticles } from '@/lib/learn/article-seo';

export type PublicDirectoryLink = {
  href: string;
  label: string;
  description?: string;
};

export type PublicDirectorySection = {
  id: string;
  title: string;
  links: PublicDirectoryLink[];
};

const MAIN_PAGES: readonly PublicDirectoryLink[] = [
  { href: routes.home, label: 'Home' },
  { href: routes.about, label: 'About NovaLikes' },
  { href: routes.contact, label: 'Contact' },
  { href: routes.reviews, label: 'Customer Reviews' },
  { href: routes.faq, label: 'FAQ' },
];

const INSTAGRAM_SERVICES: readonly PublicDirectoryLink[] = [
  { href: '/buy-instagram-followers', label: 'Buy Instagram Followers' },
  { href: '/buy-instagram-likes', label: 'Buy Instagram Likes' },
  { href: '/buy-instagram-views', label: 'Buy Instagram Views' },
  { href: '/buy-instagram-comments', label: 'Buy Instagram Comments' },
];

const TIKTOK_SERVICES: readonly PublicDirectoryLink[] = [
  { href: '/buy-tiktok-followers', label: 'Buy TikTok Followers' },
  { href: '/buy-tiktok-likes', label: 'Buy TikTok Likes' },
  { href: '/buy-tiktok-views', label: 'Buy TikTok Views' },
];

const FACEBOOK_SERVICES: readonly PublicDirectoryLink[] = [
  { href: '/buy-facebook-followers', label: 'Buy Facebook Followers' },
  { href: '/buy-facebook-page-likes', label: 'Buy Facebook Page Likes' },
  { href: '/buy-facebook-post-likes', label: 'Buy Facebook Post Likes' },
];

const FREE_TOOLS: readonly PublicDirectoryLink[] = [
  { href: routes.tools, label: 'Main Tools Page' },
  {
    href: '/tools/instagram-profile-picture-viewer',
    label: 'Instagram Profile Picture Viewer',
  },
  {
    href: '/tools/instagram-follower-counter',
    label: 'Instagram Follower Count Checker',
  },
  { href: '/tools/instagram-profile-viewer', label: 'Instagram Profile Viewer' },
  {
    href: '/tools/instagram-video-downloader',
    label: 'Instagram Video Downloader',
  },
  { href: '/tools/tiktok-video-downloader', label: 'TikTok Video Downloader' },
  {
    href: '/tools/tiktok-profile-picture-downloader',
    label: 'TikTok Profile Picture Downloader',
  },
  {
    href: '/tools/facebook-video-downloader',
    label: 'Facebook Video Downloader',
  },
  {
    href: '/tools/facebook-reels-downloader',
    label: 'Facebook Reels Downloader',
  },
];

const POLICIES: readonly PublicDirectoryLink[] = [
  { href: routes.privacyPolicy, label: 'Privacy Policy' },
  { href: routes.refundPolicy, label: 'Refund Policy' },
  { href: routes.termsAndConditions, label: 'Terms and Conditions' },
  { href: routes.cookiePolicy, label: 'Cookie Policy' },
  { href: routes.disclaimer, label: 'Disclaimer' },
];

export function getPublishedLearnDirectoryLinks(): PublicDirectoryLink[] {
  return getIndexableArticles().map((article) => ({
    href: learnArticlePath(article.slug),
    label: article.title,
  }));
}

export function getPublicDirectorySections(): PublicDirectorySection[] {
  const publishedArticles = getPublishedLearnDirectoryLinks();
  const guides: PublicDirectoryLink[] = [
    { href: routes.learn, label: 'Social Media Guides & Resources' },
    ...publishedArticles,
  ];

  return [
    { id: 'main', title: 'Main Pages', links: [...MAIN_PAGES] },
    { id: 'instagram', title: 'Instagram Services', links: [...INSTAGRAM_SERVICES] },
    { id: 'tiktok', title: 'TikTok Services', links: [...TIKTOK_SERVICES] },
    { id: 'facebook', title: 'Facebook Services', links: [...FACEBOOK_SERVICES] },
    { id: 'tools', title: 'Free Social Media Tools', links: [...FREE_TOOLS] },
    { id: 'guides', title: 'Guides & Resources', links: guides },
    { id: 'policies', title: 'Policies', links: [...POLICIES] },
  ];
}

export function getPublicDirectoryHrefs(): string[] {
  return getPublicDirectorySections().flatMap((section) =>
    section.links.map((link) => link.href),
  );
}
