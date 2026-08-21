import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';

export function InstagramLikesSectionVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src="/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp"
      alt="Instagram post with likes and engagement activity"
      className={className}
    />
  );
}
