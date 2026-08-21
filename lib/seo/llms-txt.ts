/**
 * Production llms.txt body — public pages only, no unsupported platforms.
 */

import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';
import { getPublishedLearnDirectoryLinks } from '@/data/seo/public-directory';

function abs(path: string): string {
  if (path === '/') return `${SEO_PRODUCTION_DOMAIN}/`;
  return `${SEO_PRODUCTION_DOMAIN}${path}`;
}

export function buildLlmsTxt(): string {
  const publishedArticles = getPublishedLearnDirectoryLinks();
  const articleLines =
    publishedArticles.length > 0
      ? [
          '',
          ...publishedArticles.map(
            (article) => `- [${article.label}](${abs(article.href)})`,
          ),
        ]
      : [];

  return `# NovaLikes

> NovaLikes provides social media services and free public tools for Instagram, TikTok and Facebook. Visitors can compare available service packages, place orders online, track orders, use free tools, and read social media guides and website policies.

NovaLikes operates at ${SEO_PRODUCTION_DOMAIN}.

The public website is available in English (default, unprefixed URLs) plus Spanish (/es), German (/de), French (/fr), Italian (/it), Brazilian Portuguese (/pt-br) and Arabic (/ar) for the homepage, FAQ, and core Instagram, TikTok and Facebook service pages.

Services are offered for public Instagram, TikTok and Facebook profiles or content according to the requirements shown on each service page.

NovaLikes does not require customers to share their social media passwords for the supported ordering flows described on the site.

Eligible orders are covered by the NovaLikes 30-Day Money-Back Guarantee according to the Refund Policy.

## Main Pages

- [Home](${abs('/')}): Main NovaLikes website and overview of available services.
- [About NovaLikes](${abs('/about')}): Information about NovaLikes and how the service works.
- [Contact](${abs('/contact')}): Help with orders, payments, tracking and service questions.
- [Reviews](${abs('/reviews')}): Customer feedback displayed by NovaLikes.
- [FAQ](${abs('/faq')}): Frequently asked questions about services, orders, payments, refunds and support.

## Instagram Services

- [Buy Instagram Followers](${abs('/buy-instagram-followers')}): Instagram follower packages for public profiles.
- [Buy Instagram Likes](${abs('/buy-instagram-likes')}): Instagram like packages for supported public posts or Reels.
- [Buy Instagram Views](${abs('/buy-instagram-views')}): Instagram view packages for supported public video content.
- [Buy Instagram Comments](${abs('/buy-instagram-comments')}): Instagram comment packages for supported public posts or Reels.

## TikTok Services

- [Buy TikTok Followers](${abs('/buy-tiktok-followers')}): TikTok follower packages for public profiles.
- [Buy TikTok Likes](${abs('/buy-tiktok-likes')}): TikTok like packages for supported public videos.
- [Buy TikTok Views](${abs('/buy-tiktok-views')}): TikTok view packages for supported public videos.

## Facebook Services

- [Buy Facebook Followers](${abs('/buy-facebook-followers')}): Facebook follower packages for public Pages.
- [Buy Facebook Page Likes](${abs('/buy-facebook-page-likes')}): Facebook Page Like packages for public Pages.
- [Buy Facebook Post Likes](${abs('/buy-facebook-post-likes')}): Facebook Post Like packages for public posts.

## Free Tools

- [Free Social Media Tools](${abs('/tools')}): Hub for NovaLikes public Instagram, TikTok and Facebook tools.
- [Instagram Profile Picture Viewer](${abs('/tools/instagram-profile-picture-viewer')}): View publicly available Instagram profile pictures.
- [Instagram Follower Count Checker](${abs('/tools/instagram-follower-counter')}): Check follower counts made publicly available by Instagram.
- [Instagram Profile Viewer](${abs('/tools/instagram-profile-viewer')}): View supported publicly available Instagram profile information.
- [Instagram Video Downloader](${abs('/tools/instagram-video-downloader')}): Check supported public Instagram links for downloadable video media.
- [TikTok Video Downloader](${abs('/tools/tiktok-video-downloader')}): Find available download options for supported public TikTok videos.
- [TikTok Profile Picture Downloader](${abs('/tools/tiktok-profile-picture-downloader')}): View and download publicly available TikTok profile pictures.
- [Facebook Video Downloader](${abs('/tools/facebook-video-downloader')}): Find available media for supported public Facebook videos.
- [Facebook Reels Downloader](${abs('/tools/facebook-reels-downloader')}): Find downloadable media for supported public Facebook Reels.

## Guides

- [Social Media Guides & Resources](${abs('/learn')}): NovaLikes guides and resources for Instagram, TikTok and Facebook.${articleLines.join('\n')}

## Policies

- [Privacy Policy](${abs('/privacy-policy')}): Information about data handling and privacy.
- [Refund Policy](${abs('/refund-policy')}): NovaLikes refund terms and 30-Day Money-Back Guarantee eligibility.
- [Terms and Conditions](${abs('/terms-and-conditions')}): Terms governing use of the site and services.
- [Cookie Policy](${abs('/cookie-policy')}): Information about cookies and browser storage.
- [Disclaimer](${abs('/disclaimer')}): Limitations relating to services, tools and third-party platforms.

## Optional

- [XML Sitemap](${abs('/sitemap.xml')}): Machine-readable list of indexable NovaLikes URLs.
- [HTML Sitemap](${abs('/sitemap')}): Human-readable directory of public NovaLikes pages.
`;
}
