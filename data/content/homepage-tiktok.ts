/**
 * Root English homepage — TikTok-first additions (October 2026).
 * Used ONLY by the root English homepage (/). Locale (/de/, …) and market (/uk/, …)
 * homepages must keep their current order and content.
 */

import type { PlatformId } from '@/types/platform';

/** Order of platform service groups on the root English homepage. */
export const ROOT_HOMEPAGE_PLATFORM_ORDER: PlatformId[] = ['tiktok', 'instagram', 'facebook'];

export type HomepageGuideLink = { title: string; description: string; href: string };

/** "Free TikTok Guides" section — render right after the TikTok service group. */
export const ROOT_HOMEPAGE_TIKTOK_GUIDES = {
  id: 'tiktok-guides',
  eyebrow: 'Free TikTok Guides',
  title: 'Learn How TikTok Growth Works',
  description:
    'Practical guides on views, followers and the For You feed. Read them before you order, or any time your videos stall.',
  items: [
    {
      title: 'Why Does My TikTok Have 0 Views?',
      description: 'The common reasons a video gets stuck at 0, and what to check first.',
      href: '/learn/why-does-my-tiktok-have-0-views',
    },
    {
      title: 'TikTok Shadowban: How to Check and Fix It',
      description: 'How to tell a real restriction from a slow video, using Account status.',
      href: '/learn/tiktok-shadowban',
    },
    {
      title: 'How to Get More Views on TikTok',
      description: 'Hooks, search words and watch time: what actually moves your views.',
      href: '/learn/how-to-get-more-views-on-tiktok',
    },
    {
      title: 'How to Get Your First 1,000 TikTok Followers',
      description: 'A step-by-step plan for new and small accounts.',
      href: '/learn/how-to-get-1000-tiktok-followers',
    },
    {
      title: 'TikTok Likes vs Views',
      description: 'What a good like-to-view ratio looks like and how to work out yours.',
      href: '/learn/tiktok-likes-vs-views',
    },
    {
      title: 'TikTok SEO',
      description: 'How to use search words in captions, on-screen text and speech so people find your videos.',
      href: '/learn/tiktok-seo',
    },
  ] satisfies HomepageGuideLink[],
  cta: { label: 'All TikTok Guides', href: '/learn/tiktok' },
} as const;

/** Root English homepage metadata (route "/"). */
export const ROOT_HOMEPAGE_METADATA = {
  title: 'Buy TikTok Followers, Likes & Views | NovaLikes',
  description:
    'Buy TikTok followers, likes and views with clear packages, no password and order tracking. Instagram and Facebook services are also available.',
} as const;
