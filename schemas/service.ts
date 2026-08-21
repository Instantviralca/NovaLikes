import { absoluteUrl } from '@/seo/canonical';
import { organizationRef } from '@/schemas/organization';
import { descriptions } from '@/seo/descriptions';
import type { Service } from '@/types/service';
import type { JsonLd } from '@/schemas/organization';

/** Service schema — factual fields only. No Product, Offer, or AggregateRating. */
export function serviceSchema(
  service: Service,
  overrides?: { name?: string; description?: string; url?: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: overrides?.name ?? service.name,
    description: overrides?.description ?? descriptions.service(service),
    url: absoluteUrl(overrides?.url ?? service.url),
    provider: organizationRef(),
  };
}

/** Kept for tests/admin preview. Not emitted on public service pages. */
export function productSchema(service: Service): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.url),
    brand: {
      '@type': 'Brand',
      name: 'NovaLikes',
    },
    category: service.platform,
  };
}
