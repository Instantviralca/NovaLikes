import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ServicePageView } from '@/components/sections/ServicePageView';
import { CORE_SERVICE_SLUGS, type CoreServiceSlug, isCoreServiceSlug, isLocalizedLocale } from '@/lib/i18n/config';
import { loadMetadataBundle, loadServiceBundle, loadUi } from '@/lib/i18n/content/load';
import { buildLocaleMetadata } from '@/lib/i18n/metadata';
import { localizeHref } from '@/lib/i18n/paths';
import { getServiceBySlug } from '@/data/services';
import { ensureCatalogHydrated } from '@/lib/catalog/package-overrides-store';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { serviceSchema } from '@/schemas/service';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return CORE_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale) || !isCoreServiceSlug(slug)) return {};
  const meta = loadMetadataBundle(locale).services[slug];
  if (!meta) return {};
  return buildLocaleMetadata({
    locale,
    pathname: `/${slug}`,
    title: meta.title,
    description: meta.description,
  });
}

export default async function LocalizedServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale) || !isCoreServiceSlug(slug)) notFound();

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  await ensureCatalogHydrated();

  const ui = loadUi(locale);
  const bundle = loadServiceBundle(locale, slug as CoreServiceSlug);
  const meta = loadMetadataBundle(locale).services[slug];
  const localizedUrl = localizeHref(`/${slug}`, locale);
  const homeHref = localizeHref('/', locale);
  const breadcrumbs = [
    { label: ui.breadcrumbs.home, href: homeHref },
    { label: ui.services[slug as CoreServiceSlug], href: localizedUrl },
  ];

  const graph = asJsonLdGraph([
    serviceSchema(service, {
      name: ui.services[slug as CoreServiceSlug],
      description: meta?.description,
      url: localizedUrl,
    }),
    breadcrumbSchema(breadcrumbs),
  ]);

  return (
    <>
      <JsonLdScript id={`service-jsonld-${service.id}`} data={graph} />
      <ServicePageView
        service={service}
        locale={locale}
        bundle={bundle}
        breadcrumbs={breadcrumbs}
        ui={ui}
      />
    </>
  );
}
