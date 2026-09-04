import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ServicePageView } from '@/components/sections/ServicePageView';
import { getServiceBySlug } from '@/data/services';
import { ensureCatalogHydrated } from '@/lib/catalog/package-overrides-store';
import {
  CORE_SERVICE_SLUGS,
  type CoreServiceSlug,
  isCoreServiceSlug,
} from '@/lib/i18n/config';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import { loadMarketMetadataBundle, loadMarketServiceBundle } from '@/lib/market/content/load';
import { isMarket, MARKETS, type Market } from '@/lib/market/config';
import { buildMarketMetadata, marketServiceMetadata } from '@/lib/market/metadata';
import { localizeMarketHref } from '@/lib/market/paths';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { marketServiceSchema } from '@/schemas/service';

type PageProps = {
  params: Promise<{ market: string; slug: string }>;
};

export function generateStaticParams() {
  return MARKETS.flatMap((market) => CORE_SERVICE_SLUGS.map((slug) => ({ market, slug })));
}

export const dynamicParams = false;
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: raw, slug } = await params;
  if (!isMarket(raw) || !isCoreServiceSlug(slug)) return {};
  const market = raw as Market;
  const meta = loadMarketMetadataBundle(market).services[slug];
  if (!meta) return {};
  return marketServiceMetadata(market, slug as CoreServiceSlug, meta.title, meta.description);
}

export default async function MarketServicePage({ params }: PageProps) {
  const { market: raw, slug } = await params;
  if (!isMarket(raw) || !isCoreServiceSlug(slug)) notFound();
  const market = raw as Market;

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  await ensureCatalogHydrated();

  const bundle = loadMarketServiceBundle(market, slug as CoreServiceSlug);
  const meta = loadMarketMetadataBundle(market).services[slug];
  const localizedUrl = localizeMarketHref(`/${slug}`, market);
  const homeHref = localizeMarketHref('/', market);
  const ui = ENGLISH_UI;
  const breadcrumbs = [
    { label: ui.breadcrumbs.home, href: homeHref },
    { label: ui.services[slug as CoreServiceSlug], href: localizedUrl },
  ];

  const graph = asJsonLdGraph([
    marketServiceSchema(service, market, {
      name: ui.services[slug as CoreServiceSlug],
      description: meta?.description,
      url: localizedUrl,
    }),
    breadcrumbSchema(breadcrumbs),
  ]);

  return (
    <>
      <JsonLdScript id={`service-jsonld-${service.id}-${market}`} data={graph} />
      <ServicePageView
        service={service}
        bundle={bundle}
        breadcrumbs={breadcrumbs}
        ui={ui}
        market={market}
      />
    </>
  );
}
