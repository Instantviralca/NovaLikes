/**
 * Organization schema — Document 14.06.
 * Never emits placeholder "#" social URLs or unverified profiles.
 */

import { absoluteUrl } from '@/seo/canonical';
import { brand } from '@/config/brand';
import { site } from '@/config/site';

export type JsonLd = Record<string, unknown>;

export const ORGANIZATION_ID = 'https://novalikes.com/#organization';
export const WEBSITE_ID = 'https://novalikes.com/#website';

function officialSameAs(): string[] {
  return Object.values(site.socialLinks).filter((url) => {
    if (typeof url !== 'string') return false;
    const value = url.trim();
    return value.length > 0 && value !== '#' && /^https?:\/\//i.test(value);
  });
}

export function organizationSchema(): JsonLd {
  const sameAs = officialSameAs();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: brand.name,
    alternateName: brand.legalName,
    description: brand.mission,
    slogan: brand.tagline,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/assets/logos/logo.svg'),
    email: site.supportEmail,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.supportEmail,
      url: absoluteUrl('/contact'),
    },
    knowsAbout: [
      'Instagram growth services',
      'TikTok growth services',
      'Facebook growth services',
      'Social media lookup tools',
      'Social media education',
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function organizationRef(): JsonLd {
  return { '@id': ORGANIZATION_ID };
}
