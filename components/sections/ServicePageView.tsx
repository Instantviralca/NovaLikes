import type { Service } from '@/types/service';
import type { Locale } from '@/lib/i18n/config';
import type { LocalizedServiceBundle } from '@/lib/i18n/content/load';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { Market } from '@/lib/market/config';
import type { BreadcrumbItem } from '@/types';

type ServicePageViewProps = {
  service: Service;
  locale?: Locale;
  market?: Market;
  bundle?: LocalizedServiceBundle;
  breadcrumbs?: BreadcrumbItem[];
  ui?: UiDictionary;
};
/**
 * Service pages share the Buy Instagram Followers authority structure.
 * Followers keeps approved production copy; other services use dummy topical copy.
 * English default pages with SERVICE_V2_CONTENT use ServiceV2View.
 */
export async function ServicePageView({
  service,
  locale,
  market,
  bundle,
  breadcrumbs,
  ui,
}: ServicePageViewProps) {
  if (!market && (locale ?? 'en') === 'en') {
    const { getServiceV2Content } = await import('@/data/content/service-v2');
    const v2 = getServiceV2Content(service.slug);
    if (v2) {
      const { ServiceV2View } = await import(
        '@/components/marketing/service-v2/service-v2-view'
      );
      return (
        <ServiceV2View
          service={service}
          content={v2}
          breadcrumbs={breadcrumbs}
          locale={locale}
        />
      );
    }
  }

  // Locale pilot: /de, /es, /fr and /it service routes use ServiceV2View. Other locales keep today's view.
  if (!market && (locale === 'de' || locale === 'es' || locale === 'fr' || locale === 'it')) {
    const { getServiceV2LocaleContent } = await import('@/data/content/service-v2');
    const v2Locale = getServiceV2LocaleContent(locale, service.slug);
    if (v2Locale) {
      const { ServiceV2View } = await import(
        '@/components/marketing/service-v2/service-v2-view'
      );
      return (
        <ServiceV2View
          service={service}
          content={v2Locale}
          breadcrumbs={breadcrumbs}
          locale={locale}
        />
      );
    }
  }

  // UK / CA / AU: market-specific v2. `/us` never renders (middleware 308 → root).
  if (market) {
    const { getServiceV2MarketContent } = await import('@/data/content/service-v2');
    const v2Market = getServiceV2MarketContent(market, service.slug);
    if (v2Market) {
      const { ServiceV2View } = await import(
        '@/components/marketing/service-v2/service-v2-view'
      );
      return (
        <ServiceV2View
          service={service}
          content={v2Market}
          breadcrumbs={breadcrumbs}
          locale={locale}
          market={market}
        />
      );
    }
  }

  if (service.slug === 'buy-instagram-followers') {
    const { InstagramFollowersAuthorityView } =
      await import('@/components/sections/instagram-followers-authority-view');
    return (
      <InstagramFollowersAuthorityView
        service={service}
        bundle={bundle}
        breadcrumbs={breadcrumbs}
        ui={ui}
        locale={locale}
        market={market}
      />
    );
  }

  const { MirroredServiceAuthorityView } =
    await import('@/components/sections/mirrored-service-authority-view');
  return (
    <MirroredServiceAuthorityView
      service={service}
      bundle={bundle}
      breadcrumbs={breadcrumbs}
      ui={ui}
      locale={locale}
      market={market}
    />
  );
}
