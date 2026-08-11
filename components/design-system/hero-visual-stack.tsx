import Image from 'next/image';

import {
  PlatformDashboard,
  type FacebookDashboardVariant,
  type InstagramDashboardVariant,
  type TikTokDashboardVariant,
  type YouTubeDashboardVariant,
} from '@/components/illustrations/dashboards';
import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';

type HeroVisualStackProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  platform?: PlatformId;
  priority?: boolean;
  className?: string;
  badges?: Array<{ id: string; label: string }>;
  packagePreview?: { title: string; priceLabel: string } | null;
  instagramVariant?: InstagramDashboardVariant;
  tiktokVariant?: TikTokDashboardVariant;
  youtubeVariant?: YouTubeDashboardVariant;
  facebookVariant?: FacebookDashboardVariant;
};

function isRasterHeroSrc(src: string): boolean {
  return /\.(webp|png|jpe?g|avif)(\?.*)?$/i.test(src);
}

/**
 * Layered hero visual — prefers static raster art when provided, else platform dashboard.
 */
export function HeroVisualStack({
  src,
  alt,
  width,
  height,
  platform = 'instagram',
  priority = false,
  className,
  packagePreview,
  instagramVariant,
  tiktokVariant,
  youtubeVariant,
  facebookVariant,
}: HeroVisualStackProps) {
  if (isRasterHeroSrc(src)) {
    return (
      <div className={cn('relative mx-auto w-full overflow-hidden rounded-[1.5rem]', className)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="h-auto w-full object-contain object-center"
        />
      </div>
    );
  }

  const isCompactInstagram =
    instagramVariant === 'likes' ||
    instagramVariant === 'views' ||
    instagramVariant === 'comments';
  const isTikTokPhoneHero =
    platform === 'tiktok' &&
    (tiktokVariant === 'followers' ||
      tiktokVariant === 'likes' ||
      tiktokVariant === 'views');
  const isYouTubeHero =
    platform === 'youtube' &&
    (youtubeVariant === 'subscribers' || youtubeVariant === 'views');
  const isFacebookHero =
    platform === 'facebook' &&
    (facebookVariant === 'followers' || facebookVariant === 'page-likes' || facebookVariant === 'post-likes');

  return (
    <div
      className={cn(
        'relative mx-auto flex w-full items-center justify-center overflow-visible',
        isCompactInstagram
          ? instagramVariant === 'comments'
            ? 'min-h-[20rem] px-2 py-3 sm:min-h-[22.5rem] sm:px-4 sm:py-4 lg:min-h-[24rem]'
            : 'min-h-[18rem] px-4 py-4 sm:min-h-[20.5rem] sm:px-6 sm:py-5 lg:min-h-[22rem] lg:px-8'
          : isTikTokPhoneHero
            ? 'min-h-[18.5rem] px-3 py-2 sm:min-h-[21rem] sm:px-4 sm:py-3 lg:min-h-[22.5rem] lg:px-5'
            : isYouTubeHero || isFacebookHero
              ? 'min-h-[20rem] px-3 py-2 sm:min-h-[22.5rem] sm:px-4 sm:py-3 lg:min-h-[24rem] lg:px-5'
              : 'min-h-[22rem] sm:min-h-[24rem]',
        className,
      )}
    >
      <span className="sr-only">{alt}</span>
      <PlatformDashboard
        platform={platform}
        packagePreview={packagePreview}
        instagramVariant={instagramVariant}
        tiktokVariant={tiktokVariant}
        youtubeVariant={youtubeVariant}
        facebookVariant={facebookVariant}
      />
    </div>
  );
}
