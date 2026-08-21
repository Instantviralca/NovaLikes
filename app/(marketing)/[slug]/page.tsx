import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ServicePageView } from '@/components/sections/ServicePageView';
import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { ensureCatalogHydrated } from '@/lib/catalog/package-overrides-store';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { buildBreadcrumb } from '@/lib/linking';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { serviceSchema } from '@/schemas/service';
import { serviceMetadata } from '@/seo/metadata';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

/** Only approved production services — Document 14.07. */
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return APPROVED_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata(slug);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (
    !service ||
    !APPROVED_SERVICE_SLUGS.includes(slug as (typeof APPROVED_SERVICE_SLUGS)[number])
  ) {
    notFound();
  }

  await ensureCatalogHydrated();

  const graph = asJsonLdGraph([
    serviceSchema(service),
    breadcrumbSchema(buildBreadcrumb(service.slug)),
  ]);

  return (
    <>
      <JsonLdScript id={`service-jsonld-${service.id}`} data={graph} />
      <ServicePageView service={service} />
    </>
  );
}
