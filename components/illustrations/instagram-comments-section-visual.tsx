import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';

export function InstagramCommentsSectionVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src="/assets/images/illustrations/instagram-comments/instagram-comments-why-buy.webp"
      alt="Instagram post showing comments and conversation activity"
      className={className}
    />
  );
}
