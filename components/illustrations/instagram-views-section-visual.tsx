import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';

export function InstagramViewsSectionVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src="/assets/images/illustrations/instagram-views/instagram-views-why-buy.webp"
      alt="Instagram Reel showing video views and audience activity"
      className={className}
    />
  );
}
