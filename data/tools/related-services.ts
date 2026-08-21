import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import type { ToolPlatform, ToolSlug } from '@/lib/tools/types';
import type { Service } from '@/types';

const BY_TOOL: Record<ToolSlug, readonly string[]> = {
  'tiktok-video-downloader': ['buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views'],
  'tiktok-profile-picture-downloader': ['buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views'],
  'instagram-video-downloader': ['buy-instagram-views', 'buy-instagram-followers', 'buy-instagram-likes'],
  'instagram-profile-picture-viewer': [
    'buy-instagram-followers',
    'buy-instagram-likes',
    'buy-instagram-views',
  ],
  'instagram-profile-viewer': ['buy-instagram-followers', 'buy-instagram-likes', 'buy-instagram-views'],
  'instagram-follower-counter': ['buy-instagram-followers', 'buy-instagram-likes', 'buy-instagram-comments'],
  'facebook-video-downloader': ['buy-facebook-followers', 'buy-facebook-post-likes', 'buy-facebook-page-likes'],
  'facebook-reels-downloader': ['buy-facebook-followers', 'buy-facebook-page-likes', 'buy-facebook-post-likes'],
};

const HUB_SERVICES = [
  'buy-instagram-followers',
  'buy-tiktok-followers',
  'buy-facebook-followers',
] as const;

function resolveServices(slugs: readonly string[]): Service[] {
  const services: Service[] = [];
  for (const slug of slugs) {
    if (!isApprovedServiceSlug(slug)) continue;
    const service = getServiceBySlug(slug);
    if (service && !service.comingSoon) services.push(service);
  }
  return services;
}

export function getRelatedServicesForTool(slug: ToolSlug): Service[] {
  return resolveServices(BY_TOOL[slug]).slice(0, 3);
}

export function getHubServiceLinks(): Service[] {
  return resolveServices(HUB_SERVICES);
}

export function relatedServicesHeading(platform: ToolPlatform): string {
  if (platform === 'tiktok') return 'TikTok packages on NovaLikes';
  if (platform === 'facebook') return 'Facebook packages on NovaLikes';
  return 'Instagram packages on NovaLikes';
}
