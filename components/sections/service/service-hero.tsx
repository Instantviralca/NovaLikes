import { BrandedHero } from '@/components/design-system/branded-hero';
import { formatMoney } from '@/lib/pricing/format';
import { findPackage } from '@/lib/pricing';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { localizePackageDisplayName } from '@/lib/i18n/es-visible-display';
import type { CtaProps } from '@/types/components';
import type { HeroTrustLabel, HeroVisualContent } from '@/types/content';
import type { BreadcrumbItem } from '@/types/shared';
import type {
  FacebookDashboardVariant,
  InstagramDashboardVariant,
  TikTokDashboardVariant,
} from '@/components/illustrations/dashboards';
import type { PlatformId } from '@/types/platform';

export type ServiceHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  trustLabels?: HeroTrustLabel[];
  visual?: HeroVisualContent;
  platform?: PlatformId;
  /** Optional real package id for hero preview card. */
  previewPackageId?: string;
  locale?: Locale;
  instagramVariant?: InstagramDashboardVariant;
  tiktokVariant?: TikTokDashboardVariant;
  facebookVariant?: FacebookDashboardVariant;
  className?: string;
};

export function ServiceHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  trustLabels,
  visual,
  platform,
  previewPackageId,
  locale = DEFAULT_LOCALE,
  instagramVariant,
  tiktokVariant,
  facebookVariant,
  className,
}: ServiceHeroProps) {
  const previewPkg = previewPackageId ? findPackage(previewPackageId) : undefined;
  const packagePreview =
    previewPkg && previewPkg.active
      ? {
          title: localizePackageDisplayName(previewPkg.quantityLabel, locale),
          priceLabel: formatMoney(previewPkg.price, previewPkg.currency),
        }
      : null;

  return (
    <BrandedHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      trustLabels={trustLabels}
      visual={visual}
      platform={platform}
      packagePreview={packagePreview}
      instagramVariant={instagramVariant}
      tiktokVariant={tiktokVariant}
      facebookVariant={facebookVariant}
      className={className}
      priorityImage
    />
  );
}
