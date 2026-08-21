import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';

const BASE = '/assets/images/illustrations/instagram-followers';

export function InstagramFollowersWhyVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src={`${BASE}/instagram-followers-why-buy.webp`}
      alt="Instagram profile showing follower count growth and audience visibility"
      className={className}
    />
  );
}

export function InstagramFollowersOrderVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src={`${BASE}/instagram-followers-buying-process.webp`}
      alt="Instagram follower ordering process from package selection to profile details"
      className={className}
    />
  );
}

export function InstagramFollowersDeliveryVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src={`${BASE}/instagram-followers-delivery-requirements.webp`}
      alt="Instagram follower order requirements — public username only, no password required"
      className={className}
    />
  );
}

export function InstagramFollowersHelpVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src={`${BASE}/instagram-followers-does-help.webp`}
      alt="Instagram profile metrics showing follower count alongside engagement activity"
      className={className}
    />
  );
}

export function InstagramFollowersPracticesVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src={`${BASE}/instagram-followers-best-practices.webp`}
      alt="Instagram profile planning with content, follower and engagement indicators"
      className={className}
    />
  );
}

export function InstagramFollowersCtaVisual({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src={`${BASE}/instagram-followers-package-cta.webp`}
      alt="Instagram follower packages ready for selection and checkout"
      className={className}
    />
  );
}

export function InstagramFollowersHeroPhoto({ className }: { className?: string }) {
  return (
    <RasterSectionVisual
      src={`${BASE}/instagram-followers-hero.webp`}
      alt="Instagram profile dashboard showing available follower packages"
      className={className}
    />
  );
}
