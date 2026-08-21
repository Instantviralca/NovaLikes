import { CONSTANTS } from '@/config/constants';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import type { PlatformId, Service, ServiceCategory } from '@/types';

type ServiceInput = {
  id: string;
  platform: PlatformId;
  shortName: string;
  slug: string;
  /** Optional display name override (defaults to `Buy {Platform} {shortName}`). */
  name?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: ServiceCategory;
  icon: string;
  showInNavigation?: boolean;
  showInFooter?: boolean;
  featured?: boolean;
  comingSoon?: boolean;
};

const PLATFORM_META: Record<PlatformId, { name: string; slug: string; color: string }> = {
  instagram: { name: 'Instagram', slug: 'instagram', color: '#E1306C' },
  tiktok: { name: 'TikTok', slug: 'tiktok', color: '#000000' },
  youtube: { name: 'YouTube', slug: 'youtube', color: '#FF0000' },
  facebook: { name: 'Facebook', slug: 'facebook', color: '#1877F2' },
};

function buildService(input: ServiceInput): Service {
  const platform = PLATFORM_META[input.platform];
  const name = input.name ?? `Buy ${platform.name} ${input.shortName}`;
  const url = `/${input.slug}`;

  return {
    id: input.id,
    platform: input.platform,
    platformSlug: platform.slug,
    name,
    shortName: input.shortName,
    slug: input.slug,
    url,
    primaryKeyword: input.primaryKeyword,
    secondaryKeywords: input.secondaryKeywords,
    category: input.category,
    pageType: 'service',
    icon: input.icon,
    themeColor: platform.color,
    description: `Order ${platform.name} ${input.shortName.toLowerCase()} securely with public profile or content details only — no password required.`,
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: platform.name },
      { label: name, href: url },
    ],
    navigationLabel: name,
    showInNavigation: input.showInNavigation ?? true,
    showInFooter: input.showInFooter ?? false,
    featured: input.featured ?? false,
    comingSoon: input.comingSoon ?? false,
  };
}

const SERVICE_INPUTS: ServiceInput[] = [
  // Instagram
  {
    id: 'ig-followers',
    platform: 'instagram',
    shortName: 'Followers',
    slug: 'buy-instagram-followers',
    name: 'Instagram Followers Packages',
    primaryKeyword: 'instagram followers packages',
    secondaryKeywords: [
      'instagram followers',
      'instagram followers pricing',
      'instagram followers plans',
      'ig followers',
    ],
    category: 'followers',
    icon: 'users',
    showInFooter: true,
    featured: true,
  },
  {
    id: 'ig-likes',
    platform: 'instagram',
    shortName: 'Likes',
    slug: 'buy-instagram-likes',
    primaryKeyword: 'buy instagram likes',
    secondaryKeywords: ['instagram likes', 'ig likes'],
    category: 'likes',
    icon: 'heart',
    showInFooter: true,
  },
  {
    id: 'ig-views',
    platform: 'instagram',
    shortName: 'Views',
    slug: 'buy-instagram-views',
    primaryKeyword: 'buy instagram views',
    secondaryKeywords: ['instagram views', 'ig views'],
    category: 'views',
    icon: 'eye',
    showInFooter: true,
  },
  {
    id: 'ig-comments',
    platform: 'instagram',
    shortName: 'Comments',
    slug: 'buy-instagram-comments',
    primaryKeyword: 'buy instagram comments',
    secondaryKeywords: ['instagram comments'],
    category: 'comments',
    icon: 'message-circle',
    showInFooter: true,
  },
  // TikTok
  {
    id: 'tt-followers',
    platform: 'tiktok',
    shortName: 'Followers',
    slug: 'buy-tiktok-followers',
    primaryKeyword: 'buy tiktok followers',
    secondaryKeywords: ['tiktok followers'],
    category: 'followers',
    icon: 'users',
    showInFooter: true,
    featured: true,
  },
  {
    id: 'tt-likes',
    platform: 'tiktok',
    shortName: 'Likes',
    slug: 'buy-tiktok-likes',
    primaryKeyword: 'buy tiktok likes',
    secondaryKeywords: ['tiktok likes'],
    category: 'likes',
    icon: 'heart',
    showInFooter: true,
  },
  {
    id: 'tt-views',
    platform: 'tiktok',
    shortName: 'Views',
    slug: 'buy-tiktok-views',
    primaryKeyword: 'buy tiktok views',
    secondaryKeywords: ['tiktok views'],
    category: 'views',
    icon: 'eye',
    showInFooter: true,
  },
  // YouTube — retained for historical order/admin lookup only (not offered)
  {
    id: 'yt-subscribers',
    platform: 'youtube',
    shortName: 'Subscribers',
    slug: 'buy-youtube-subscribers',
    primaryKeyword: 'buy youtube subscribers',
    secondaryKeywords: ['youtube subscribers'],
    category: 'subscribers',
    icon: 'users',
    showInNavigation: false,
    showInFooter: false,
    featured: false,
    comingSoon: true,
  },
  {
    id: 'yt-views',
    platform: 'youtube',
    shortName: 'Views',
    slug: 'buy-youtube-views',
    primaryKeyword: 'buy youtube views',
    secondaryKeywords: ['youtube views'],
    category: 'views',
    icon: 'eye',
    showInNavigation: false,
    showInFooter: false,
    featured: false,
    comingSoon: true,
  },
  // Facebook
  {
    id: 'fb-followers',
    platform: 'facebook',
    shortName: 'Followers',
    slug: 'buy-facebook-followers',
    primaryKeyword: 'buy facebook followers',
    secondaryKeywords: ['facebook followers'],
    category: 'followers',
    icon: 'users',
    showInFooter: true,
    featured: true,
  },
  {
    id: 'fb-page-likes',
    platform: 'facebook',
    shortName: 'Page Likes',
    slug: 'buy-facebook-page-likes',
    primaryKeyword: 'buy facebook page likes',
    secondaryKeywords: ['facebook page likes'],
    category: 'page-likes',
    icon: 'thumbs-up',
    showInFooter: true,
  },
  {
    id: 'fb-post-likes',
    platform: 'facebook',
    shortName: 'Post Likes',
    slug: 'buy-facebook-post-likes',
    primaryKeyword: 'buy facebook post likes',
    secondaryKeywords: ['facebook post likes'],
    category: 'post-likes',
    icon: 'heart',
    showInFooter: true,
  },
];

export const services: Service[] = SERVICE_INPUTS.map(buildService);

export function getAllServices(): Service[] {
  return services;
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured);
}

export function getPlatformServices(platform: PlatformId): Service[] {
  return services.filter((service) => service.platform === platform);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getNavigationServices(): Service[] {
  return services.filter((service) => service.showInNavigation && !service.comingSoon);
}

export function getFooterServices(): Service[] {
  return services.filter((service) => service.showInFooter && !service.comingSoon);
}

export function getRelatedServices(
  service: Service,
  limit: number = CONSTANTS.maxRelatedServices,
): Service[] {
  return getPlatformServices(service.platform)
    .filter(
      (item) => item.id !== service.id && isApprovedServiceSlug(item.slug) && !item.comingSoon,
    )
    .slice(0, Math.min(limit, 3));
}

export function getServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}
