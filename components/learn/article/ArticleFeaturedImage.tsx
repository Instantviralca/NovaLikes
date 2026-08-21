import Image from 'next/image';

import type { LearnFeaturedImage } from '@/types/learn';

type ArticleFeaturedImageProps = {
  image: LearnFeaturedImage;
  /** Priority only when this is the LCP image. */
  priority?: boolean;
};

/**
 * Featured article image — Document 15.02.
 * Prefers 1600×900 local assets via next/image. No external hotlinking.
 */
export function ArticleFeaturedImage({
  image,
  priority = true,
}: ArticleFeaturedImageProps) {
  const alt = image.decorative ? '' : image.alt;

  return (
    <figure className="overflow-hidden rounded-2xl border border-[#F0E4D8] bg-[#FFF8F3]">
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        priority={priority}
        className="h-auto w-full object-contain"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {image.caption || image.credit ? (
        <figcaption className="border-t border-[#F0E4D8] px-4 py-3 text-sm text-[#78716C]">
          {image.caption}
          {image.credit ? (
            <span className="mt-1 block text-xs">Credit: {image.credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
