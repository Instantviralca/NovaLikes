import Image from 'next/image';

import type { LearnFeaturedImage } from '@/types/learn';

type ArticleFeaturedImageProps = {
  image: LearnFeaturedImage;
  /** Priority only when this is the LCP image. */
  priority?: boolean;
};

/**
 * Featured article image — Document 15.02, site-v2 `.hero-img` (16:9, radius 22).
 * Prefers 1600×900 local assets via next/image. No external hotlinking.
 */
export function ArticleFeaturedImage({
  image,
  priority = true,
}: ArticleFeaturedImageProps) {
  const alt = image.decorative ? '' : image.alt;

  return (
    <figure className="hero-img">
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 720px"
      />
      {image.caption || image.credit ? (
        <figcaption>
          {image.caption}
          {image.credit ? <span>Credit: {image.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
