import type { Service } from '@/types/service';
import type { Locale } from '@/lib/i18n/config';
import type { LocalizedServiceBundle } from '@/lib/i18n/content/load';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { BreadcrumbItem } from '@/types';

type ServicePageViewProps = {
  service: Service;
  locale?: Locale;
  bundle?: LocalizedServiceBundle;
  breadcrumbs?: BreadcrumbItem[];
  ui?: UiDictionary;
};

/**
 * Service pages share the Buy Instagram Followers authority structure.
 * Followers keeps approved production copy; other services use dummy topical copy.
 */
export async function ServicePageView({
  service,
  locale,
  bundle,
  breadcrumbs,
  ui,
}: ServicePageViewProps) {
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
    />
  );
}
