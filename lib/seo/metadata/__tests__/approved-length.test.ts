/**
 * Approved static metadata length and exact-string checks.
 * Do not rewrite or silently truncate these strings.
 */

import { describe, expect, it } from 'vitest';

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { TOOLS } from '@/data/tools/registry';
import { getMetadataByRoute } from '@/lib/seo/metadata';
import { organizationSchema } from '@/schemas/organization';
import { serviceSchema } from '@/schemas/service';
import { websiteSchema } from '@/schemas/website';
import { META_DESCRIPTION_MAX, descriptions } from '@/seo/descriptions';
import { META_TITLE_MAX, titles } from '@/seo/titles';

const APPROVED_STATIC: Array<{ route: string; title: string; description: string }> = [
  { route: '/', title: titles.home(), description: descriptions.home() },
  { route: '/about', title: titles.company('About'), description: descriptions.about() },
  { route: '/contact', title: titles.company('Contact'), description: descriptions.contact() },
  { route: '/reviews', title: titles.company('Reviews'), description: descriptions.reviews() },
  { route: '/faq', title: titles.company('FAQ'), description: descriptions.faq() },
  { route: '/tools', title: titles.toolsHub(), description: descriptions.toolsHub() },
  { route: '/learn', title: titles.learnIndex(), description: descriptions.learnIndex() },
  { route: '/sitemap', title: titles.sitemap(), description: descriptions.sitemap() },
  {
    route: '/privacy-policy',
    title: titles.legal('Privacy Policy'),
    description: descriptions.privacyPolicy(),
  },
  {
    route: '/refund-policy',
    title: titles.legal('Refund Policy'),
    description: descriptions.refundPolicy(),
  },
  {
    route: '/terms-and-conditions',
    title: titles.legal('Terms and Conditions'),
    description: descriptions.termsAndConditions(),
  },
  {
    route: '/cookie-policy',
    title: titles.legal('Cookie Policy'),
    description: descriptions.cookiePolicy(),
  },
  {
    route: '/disclaimer',
    title: titles.legal('Disclaimer'),
    description: descriptions.disclaimer(),
  },
];

describe('Approved static SEO metadata', () => {
  it('keeps every approved title at or under 58 characters without rewriting', () => {
    const over: string[] = [];

    for (const entry of APPROVED_STATIC) {
      if (entry.title.length > META_TITLE_MAX) over.push(`${entry.route}: ${entry.title}`);
    }

    for (const slug of APPROVED_SERVICE_SLUGS) {
      const service = getServiceBySlug(slug);
      if (!service) continue;
      const title = titles.service(service);
      if (title.length > META_TITLE_MAX) over.push(`/${slug}: ${title}`);
    }

    expect(titles.instagramProfilePictureViewer().length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(titles.instagramFollowerCounter().length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(titles.instagramProfileViewer().length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(titles.instagramVideoDownloader().length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(titles.tiktokVideoDownloader().length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(titles.tiktokProfilePictureDownloader().length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(titles.facebookVideoDownloader().length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(titles.facebookReelsDownloader().length).toBeLessThanOrEqual(META_TITLE_MAX);

    expect(over).toEqual([]);
  });

  it('keeps every approved description at or under 150 characters without rewriting', () => {
    const over: string[] = [];

    for (const entry of APPROVED_STATIC) {
      if (entry.description.length > META_DESCRIPTION_MAX) {
        over.push(`${entry.route}: ${entry.description.length}`);
      }
    }

    for (const slug of APPROVED_SERVICE_SLUGS) {
      const service = getServiceBySlug(slug);
      if (!service) continue;
      const description = descriptions.service(service);
      if (description.length > META_DESCRIPTION_MAX) {
        over.push(`/${slug}: ${description.length}`);
      }
    }

    const toolDescriptions = [
      descriptions.instagramProfilePictureViewer(),
      descriptions.instagramFollowerCounter(),
      descriptions.instagramProfileViewer(),
      descriptions.instagramVideoDownloader(),
      descriptions.tiktokVideoDownloader(),
      descriptions.tiktokProfilePictureDownloader(),
      descriptions.facebookVideoDownloader(),
      descriptions.facebookReelsDownloader(),
    ];
    for (const description of toolDescriptions) {
      if (description.length > META_DESCRIPTION_MAX) over.push(description);
    }

    expect(over).toEqual([]);
  });

  it('stores the approved strings exactly in the metadata registry', () => {
    for (const entry of APPROVED_STATIC) {
      const meta = getMetadataByRoute(entry.route);
      expect(meta?.title, entry.route).toBe(entry.title);
      expect(meta?.description, entry.route).toBe(entry.description);
    }

    for (const slug of APPROVED_SERVICE_SLUGS) {
      const service = getServiceBySlug(slug)!;
      const meta = getMetadataByRoute(`/${slug}`);
      expect(meta?.title, slug).toBe(titles.service(service));
      expect(meta?.description, slug).toBe(descriptions.service(service));
    }

    for (const tool of TOOLS) {
      const meta = getMetadataByRoute(tool.href);
      expect(meta?.title, tool.slug).toBeDefined();
      expect(meta?.title.length, tool.slug).toBeLessThanOrEqual(META_TITLE_MAX);
      expect(meta?.description.length, tool.slug).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    }
  });

  it('does not invent Organization social profiles, SearchAction, or service ratings', () => {
    const org = JSON.stringify(organizationSchema()).toLowerCase();
    const website = JSON.stringify(websiteSchema()).toLowerCase();

    expect(organizationSchema()['@id']).toBe('https://novalikes.com/#organization');
    expect(websiteSchema()).toMatchObject({
      '@type': 'WebSite',
      '@id': 'https://novalikes.com/#website',
    });
    expect(websiteSchema()).not.toHaveProperty('potentialAction');
    expect(website).not.toContain('searchaction');
    expect(org).not.toContain('aggregaterating');
    expect(org).not.toContain('"telephone"');
    expect(org).not.toContain('address');

    for (const slug of APPROVED_SERVICE_SLUGS) {
      const service = getServiceBySlug(slug)!;
      const schema = serviceSchema(service);
      expect(schema['@type']).toBe('Service');
      expect(schema).not.toHaveProperty('aggregateRating');
      expect(schema).not.toHaveProperty('areaServed');
      expect(schema.provider).toEqual({ '@id': 'https://novalikes.com/#organization' });
    }
  });
});
