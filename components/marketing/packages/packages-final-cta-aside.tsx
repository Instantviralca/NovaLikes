'use client';

import { RasterSectionVisual } from '@/components/illustrations/raster-section-visual';
import type { InstagramDashboardVariant } from '@/components/illustrations/dashboards';
import { getUniqueServiceImage } from '@/lib/market/unique-service-images';
import type { Market } from '@/lib/market/config';
import { cn } from '@/lib/utils';

const CTA_SRC: Record<InstagramDashboardVariant, string> = {
  followers:
    '/assets/images/illustrations/instagram-followers/instagram-followers-package-cta.webp',
  likes: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
  views: '/assets/images/illustrations/instagram-views/instagram-views-package-cta.webp',
  comments:
    '/assets/images/illustrations/instagram-comments/instagram-comments-package-cta.webp',
};

type PackagesFinalCtaAsideProps = {
  className?: string;
  instagramVariant?: InstagramDashboardVariant;
  tiktokFollowers?: boolean;
  tiktokLikes?: boolean;
  tiktokViews?: boolean;
  facebookFollowers?: boolean;
  facebookPageLikes?: boolean;
  facebookPostLikes?: boolean;
  market?: Market;
  serviceSlug?: string;
};

function resolveSrc(props: PackagesFinalCtaAsideProps): string {
  if (props.tiktokFollowers)
    return '/assets/images/illustrations/tiktok-followers/tiktok-followers-package-cta.webp';
  if (props.tiktokLikes)
    return '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp';
  if (props.tiktokViews)
    return '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp';
  if (props.facebookFollowers)
    return '/assets/images/illustrations/facebook-followers/facebook-followers-package-cta.webp';
  if (props.facebookPageLikes)
    return '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp';
  if (props.facebookPostLikes)
    return '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp';
  return CTA_SRC[props.instagramVariant ?? 'followers'];
}

function resolveAlt(props: PackagesFinalCtaAsideProps): string {
  if (props.tiktokFollowers)
    return 'TikTok follower packages ready for selection and checkout';
  if (props.tiktokLikes)
    return 'TikTok likes packages ready for selection and checkout';
  if (props.tiktokViews)
    return 'TikTok views packages ready for selection and checkout';
  if (props.facebookFollowers)
    return 'Facebook follower packages ready for selection and checkout';
  if (props.facebookPageLikes)
    return 'Facebook Page Like packages ready for selection and checkout';
  if (props.facebookPostLikes)
    return 'Facebook Post Like packages ready for selection and checkout';
  switch (props.instagramVariant ?? 'followers') {
    case 'likes':
      return 'Instagram likes packages ready for selection and checkout';
    case 'views':
      return 'Instagram views packages ready for selection and checkout';
    case 'comments':
      return 'Instagram comment packages ready for selection and checkout';
    default:
      return 'Instagram follower packages ready for selection and checkout';
  }
}

/** Final CTA visual — unique per market service page when market+slug provided. */
export function PackagesFinalCtaAside({
  className,
  instagramVariant = 'followers',
  tiktokFollowers = false,
  tiktokLikes = false,
  tiktokViews = false,
  facebookFollowers = false,
  facebookPageLikes = false,
  facebookPostLikes = false,
  market,
  serviceSlug,
}: PackagesFinalCtaAsideProps) {
  const unique =
    market && serviceSlug ? getUniqueServiceImage(market, serviceSlug, 'final-cta') : null;
  const src =
    unique?.src ??
    resolveSrc({
      instagramVariant,
      tiktokFollowers,
      tiktokLikes,
      tiktokViews,
      facebookFollowers,
      facebookPageLikes,
      facebookPostLikes,
    });
  const alt =
    unique?.alt ??
    resolveAlt({
      instagramVariant,
      tiktokFollowers,
      tiktokLikes,
      tiktokViews,
      facebookFollowers,
      facebookPageLikes,
      facebookPostLikes,
    });

  return (
    <div className={cn('w-full', className)}>
      <RasterSectionVisual src={src} alt={alt} className="max-w-none" />
    </div>
  );
}
