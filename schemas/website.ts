import { absoluteUrl } from '@/seo/canonical';
import { site } from '@/config/site';
import { ORGANIZATION_ID, WEBSITE_ID, type JsonLd } from '@/schemas/organization';

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.name,
    url: absoluteUrl('/'),
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function webPageSchema(input: {
  title: string;
  description: string;
  path: string;
  /** Optional absolute URL override — must match metadata canonical. */
  url?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.title,
    description: input.description,
    url: input.url ?? absoluteUrl(input.path),
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function aboutPageSchema(input: {
  title: string;
  description: string;
  path: string;
  url?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: input.title,
    description: input.description,
    url: input.url ?? absoluteUrl(input.path),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  };
}

export function collectionPageSchema(input: {
  title: string;
  description: string;
  path: string;
  url?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.title,
    description: input.description,
    url: input.url ?? absoluteUrl(input.path),
    isPartOf: { '@id': WEBSITE_ID },
  };
}
