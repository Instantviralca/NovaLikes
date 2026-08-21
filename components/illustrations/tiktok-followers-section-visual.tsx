import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';

export function TikTokFollowersSectionVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src="/assets/images/illustrations/tiktok-followers/tiktok-followers-why-buy.webp"
      alt="TikTok profile showing follower count and audience activity"
      className={className}
    />
  );
}
