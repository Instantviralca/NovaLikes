import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';

export function TikTokViewsSectionVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src="/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp"
      alt="TikTok video showing views and audience activity"
      className={className}
    />
  );
}
