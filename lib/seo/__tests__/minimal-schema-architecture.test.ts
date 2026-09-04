/**
 * Minimal schema architecture regression — Organization + WebSite shared;
 * no FAQPage / Product / Offer / Review / AggregateRating on public builders.
 */

import { describe, expect, it } from 'vitest';

import { getPublishedLearnArticleSlugs } from '@/data/learn';
import { getServiceBySlug } from '@/data/services';
import { buildArticleFaqSchema, buildArticlePageJsonLd } from '@/lib/learn/article-seo';
import { getPublishedArticleBySlug } from '@/lib/learn/article';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { contactPageSchema } from '@/schemas/contact-page';
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  organizationSchema,
} from '@/schemas/organization';
import { marketServiceSchema, serviceSchema } from '@/schemas/service';
import { webApplicationSchema } from '@/schemas/web-application';
import { aboutPageSchema, webPageSchema, websiteSchema } from '@/schemas/website';

function collectTypes(node: unknown, acc: string[] = []): string[] {
  if (node == null) return acc;
  if (Array.isArray(node)) {
    for (const item of node) collectTypes(item, acc);
    return acc;
  }
  if (typeof node === 'object') {
    const record = node as Record<string, unknown>;
    if (typeof record['@type'] === 'string') acc.push(record['@type']);
    if (Array.isArray(record['@type'])) {
      for (const t of record['@type']) if (typeof t === 'string') acc.push(t);
    }
    for (const [key, value] of Object.entries(record)) {
      if (key === '@type' || key === '@context') continue;
      collectTypes(value, acc);
    }
  }
  return acc;
}

describe('Minimal schema architecture', () => {
  it('keeps a single logical Organization and WebSite entity identity', () => {
    const org = organizationSchema();
    const site = websiteSchema();
    expect(org['@type']).toBe('Organization');
    expect(org['@id']).toBe(ORGANIZATION_ID);
    expect(site['@type']).toBe('WebSite');
    expect(site['@id']).toBe(WEBSITE_ID);
    expect(site.publisher).toEqual({ '@id': ORGANIZATION_ID });
  });

  it('service schema references Organization by @id and never nests a full Organization', () => {
    const serviceRecord = getServiceBySlug('buy-instagram-followers');
    expect(serviceRecord).toBeTruthy();
    const service = serviceSchema(serviceRecord!);
    const types = collectTypes(service);
    expect(types.filter((t) => t === 'Service')).toHaveLength(1);
    expect(types.filter((t) => t === 'Organization')).toHaveLength(0);
    expect(service.provider).toEqual({ '@id': ORGANIZATION_ID });

    const market = marketServiceSchema(serviceRecord!, 'ca', {
      url: '/ca/buy-instagram-followers',
    });
    expect(collectTypes(market).filter((t) => t === 'Organization')).toHaveLength(0);
    expect(market.provider).toEqual({ '@id': ORGANIZATION_ID });
    expect(market.areaServed).toMatchObject({ '@type': 'Country', name: 'Canada' });
  });

  it('does not emit FAQPage from article FAQ builder', () => {
    expect(
      buildArticleFaqSchema([
        {
          id: '1',
          question: 'Q?',
          answer: 'A.',
          schemaEligible: true,
        },
      ]),
    ).toBeNull();
  });

  it('article page JSON-LD stays BlogPosting/Article + Breadcrumb without FAQPage or nested WebPage type', () => {
    const slug = getPublishedLearnArticleSlugs()[0];
    expect(slug).toBeTruthy();
    const article = getPublishedArticleBySlug(slug!);
    expect(article).toBeTruthy();
    const graph = buildArticlePageJsonLd(article!);
    const types = collectTypes(graph);
    expect(types.some((t) => t === 'BlogPosting' || t === 'Article')).toBe(true);
    expect(types).toContain('BreadcrumbList');
    expect(types).not.toContain('FAQPage');
    expect(types).not.toContain('WebPage');
    expect(types).not.toContain('Product');
    expect(types).not.toContain('Offer');
    expect(types).not.toContain('Review');
    expect(types).not.toContain('AggregateRating');
  });

  it('public general pages use WebPage; legacy AboutPage/ContactPage builders remain unused by routes', () => {
    const page = webPageSchema({
      title: 'About',
      description: 'About NovaLikes',
      path: '/about',
    });
    expect(page['@type']).toBe('WebPage');
    expect(page.isPartOf).toEqual({ '@id': WEBSITE_ID });

    expect(aboutPageSchema({ title: 'A', description: 'B', path: '/about' })['@type']).toBe(
      'AboutPage',
    );
    expect(contactPageSchema({ title: 'C', description: 'D', path: '/contact' })['@type']).toBe(
      'ContactPage',
    );
  });

  it('tool and breadcrumb builders stay single-entity', () => {
    const tool = webApplicationSchema({
      name: 'Instagram Profile Viewer',
      description: 'Free tool',
      path: '/tools/instagram-profile-viewer',
    });
    expect(tool['@type']).toBe('WebApplication');
    const crumbs = breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'Tools', href: '/tools' },
    ]);
    expect(crumbs?.['@type']).toBe('BreadcrumbList');
    expect(collectTypes(crumbs).filter((t) => t === 'BreadcrumbList')).toHaveLength(1);
  });
});
