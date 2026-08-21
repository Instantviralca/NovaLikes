import { absoluteUrl } from '@/seo/canonical';
import type { JsonLd } from '@/schemas/organization';

export function webApplicationSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: input.name,
    url: absoluteUrl(input.path),
    description: input.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
  };
}

export function itemListSchema(
  items: Array<{ name: string; url: string }>,
  name?: string,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
