import { absoluteUrl } from '@/seo/canonical';
import { ORGANIZATION_ID, WEBSITE_ID, type JsonLd } from '@/schemas/organization';

/** ContactPage JSON-LD — no invented phone, address, or support hours. */
export function contactPageSchema(input: {
  title: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  };
}
