import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';

export function FacebookFollowersSectionVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src="/assets/images/illustrations/facebook-followers/facebook-followers-why-buy.webp"
      alt="Facebook Page showing follower count and community activity"
      className={className}
    />
  );
}
