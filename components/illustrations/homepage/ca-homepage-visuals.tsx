import Image from 'next/image';

import { caStoryFeatureImage } from '@/lib/market/homepage-design';
import { getUniqueStoryImage } from '@/lib/market/unique-service-images';
import type { Market } from '@/lib/market/config';
import type { PlatformId } from '@/types/platform';
import { cn } from '@/lib/utils';

/**
 * Clean feature image for geo story sections.
 * Market service pages use unique per-placement assets when `serviceSlug` is set.
 */
export function CaStoryFeatureImage({
  sectionId,
  className,
  priority = false,
  variant = 'default',
  platform,
  market,
  serviceSlug,
}: {
  sectionId: string;
  className?: string;
  priority?: boolean;
  variant?: 'default' | 'banner';
  platform?: PlatformId;
  market?: Market;
  serviceSlug?: string;
}) {
  const image =
    market && serviceSlug
      ? getUniqueStoryImage(market, serviceSlug, sectionId, platform)
      : caStoryFeatureImage(sectionId, platform);
  if (!image) return null;

  return (
    <figure
      className={cn(
        'relative mx-auto w-full overflow-hidden rounded-2xl bg-[#FFF9F5] ring-1 ring-[#EDE8E3]',
        variant === 'banner' ? 'aspect-[21/9] max-h-[15rem]' : 'aspect-[4/3]',
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 42vw"
        priority={priority}
      />
    </figure>
  );
}

/** Four-up collage for the metric-selection services overview (real service art). */
export function CaMetricServicesCollage({ className }: { className?: string }) {
  const tiles = [
    {
      src: '/assets/images/illustrations/homepage/instagram-followers-visual.webp',
      alt: 'Instagram followers service',
    },
    {
      src: '/assets/images/illustrations/homepage/instagram-likes-visual.webp',
      alt: 'Instagram likes service',
    },
    {
      src: '/assets/images/illustrations/homepage/instagram-views-visual.webp',
      alt: 'Instagram views service',
    },
    {
      src: '/assets/images/illustrations/homepage/instagram-comments-visual.webp',
      alt: 'Instagram comments service',
    },
  ] as const;

  return (
    <div className={cn('grid grid-cols-2 gap-2', className)}>
      {tiles.map((tile) => (
        <figure
          key={tile.src}
          className="relative aspect-square overflow-hidden rounded-xl bg-[#FFF9F5] ring-1 ring-[#EDE8E3]"
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            className="object-cover object-center"
            sizes="160px"
          />
        </figure>
      ))}
    </div>
  );
}
