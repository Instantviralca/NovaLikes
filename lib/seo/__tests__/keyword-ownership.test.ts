import { describe, expect, it } from 'vitest';

import { getHomepageContent } from '@/data/content/homepage';
import { getServiceContentBySlug } from '@/data/content/services';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { getAllServices, getServiceBySlug } from '@/data/services';
import { descriptions } from '@/seo/descriptions';
import { getMetadataByRoute } from '@/lib/seo/metadata';
import { productSchema, serviceSchema } from '@/schemas/service';

const LEARN_COMMERCIAL_TARGET =
  /\b(?:buy|purchase|checkout|packages?|pricing)\b|\border (?:followers|likes|views|subscribers|comments)\b/i;

describe('SEO keyword ownership', () => {
  it('positions the homepage as Buy Instagram Followers authority', () => {
    const home = getHomepageContent();
    const metadata = getMetadataByRoute('/');
    const homeDescription = descriptions.home();

    expect(home.hero.title).toBe('Buy Instagram Followers');
    expect(home.hero.primaryKeyword).toBe('buy instagram followers');
    expect(home.hero.primaryCta?.href).toBe('/buy-instagram-followers');
    expect(metadata?.title).toContain('Buy Instagram Followers');
    expect(homeDescription.length).toBeGreaterThanOrEqual(140);
    expect(homeDescription.length).toBeLessThanOrEqual(160);
    expect(homeDescription.toLowerCase()).toContain('buy instagram followers');
    expect(metadata?.keywords?.join(' ').toLowerCase()).toContain('buy instagram followers');
  });

  it('gives Instagram Followers Packages one consistent service-page owner', () => {
    const service = getServiceBySlug('buy-instagram-followers')!;
    const content = getServiceContentBySlug(service.slug)!;
    const metadata = getMetadataByRoute(service.url)!;
    const seo = content.seo;

    expect(seo).toBeDefined();
    if (!seo) throw new Error('Missing Instagram Followers SEO content');

    expect(service.primaryKeyword).toBe('instagram followers packages');
    expect(service.name).toBe('Instagram Followers Packages');
    expect(content.hero.title).toBe('Instagram Followers Packages');
    expect(content.hero.primaryKeyword).toBe('instagram followers packages');
    expect(seo.title).toBe('Instagram Followers Packages & Pricing | NovaLikes');
    expect(seo.description.toLowerCase()).toContain(service.primaryKeyword);
    expect(metadata.title).toBe(seo.title);
    expect(metadata.openGraphTitle).toBe(seo.title);
    expect(metadata.twitterTitle).toBe(seo.title);
    expect(service.breadcrumb.at(-1)?.label).toBe('Instagram Followers Packages');
    expect(serviceSchema(service).name).toBe('Instagram Followers Packages');
    expect(productSchema(service).name).toBe('Instagram Followers Packages');
  });

  it('keeps Facebook Page Likes distinct from Facebook Post Likes', () => {
    const service = getServiceBySlug('buy-facebook-page-likes')!;
    const content = getServiceContentBySlug(service.slug)!;
    const metadata = getMetadataByRoute(service.url)!;
    const serialized = JSON.stringify(content);
    const seo = content.seo;

    expect(seo).toBeDefined();
    if (!seo) throw new Error('Missing Facebook Page Likes SEO content');

    expect(content.hero.title).toBe('Buy Facebook Page Likes');
    expect(content.hero.primaryKeyword).toBe('buy Facebook page likes');
    expect(seo.title).toContain('Buy Facebook Page Likes');
    expect(seo.description).toContain('Buy Facebook Page Likes');
    expect(serialized).not.toMatch(/\bFacebook Likes\b/i);
    expect(metadata.openGraphTitle).toBe(seo.title);
    expect(metadata.twitterTitle).toBe(seo.title);
    expect(serviceSchema(service).name).toBe('Buy Facebook Page Likes');
    expect(productSchema(service).name).toBe('Buy Facebook Page Likes');
  });

  it('aligns every service title, H1, description, social title and schema name', () => {
    for (const service of getAllServices()) {
      const content = getServiceContentBySlug(service.slug);
      const metadata = getMetadataByRoute(service.url);

      if (!content || !content.seo || !metadata) {
        throw new Error(`Missing SEO data for ${service.slug}`);
      }

      const primary = service.primaryKeyword.toLowerCase();
      expect(content.seo.title.toLowerCase(), service.slug).toContain(primary);
      expect(content.seo.description.toLowerCase(), service.slug).toContain(primary);
      expect(content.hero.title.toLowerCase(), service.slug).toContain(primary);
      expect(content.hero.primaryKeyword?.toLowerCase() ?? '', service.slug).toContain(primary);
      expect(metadata.openGraphTitle, service.slug).toBe(content.seo.title);
      expect(metadata.twitterTitle, service.slug).toBe(content.seo.title);
      expect(serviceSchema(service).name, service.slug).toBe(service.name);
      expect(productSchema(service).name, service.slug).toBe(service.name);
    }
  });

  it('keeps Learn SEO fields informational and service links in CTA data', () => {
    for (const article of LEARN_ARTICLES) {
      const seoTargetingFields = [
        article.title,
        article.seo.title,
        article.seo.description,
        article.seo.keywords?.[0] ?? '',
      ];

      for (const field of seoTargetingFields) {
        expect(field, article.slug).not.toMatch(LEARN_COMMERCIAL_TARGET);
      }
      expect(article.relatedServices.length, article.slug).toBeGreaterThan(0);
    }
  });

  it('keeps the Instagram follower article cluster on unique primary keywords', () => {
    const primaryBySlug = new Map(
      LEARN_ARTICLES.map((article) => [article.slug, article.seo.keywords?.[0]]),
    );

    expect(primaryBySlug.get('how-to-grow-instagram-followers-organically')).toBe(
      'How to Grow Instagram Followers Organically',
    );
    expect(primaryBySlug.get('how-to-get-more-instagram-followers-without-ads')).toBe(
      'How to Get More Instagram Followers Without Ads',
    );
    expect(primaryBySlug.get('complete-instagram-growth-guide')).toBe(
      'Complete Instagram Growth Guide',
    );
    expect(
      new Set([
        primaryBySlug.get('how-to-grow-instagram-followers-organically'),
        primaryBySlug.get('how-to-get-more-instagram-followers-without-ads'),
        primaryBySlug.get('complete-instagram-growth-guide'),
      ]).size,
    ).toBe(3);
  });

  it('keeps homepage FAQs focused on buying Instagram followers', () => {
    const homeFaqIds = getHomepageContent().faq.faqIds;

    expect(homeFaqIds).toEqual([
      'faq-home-buy-followers',
      'faq-home-how-buy-followers',
      'faq-home-password',
      'faq-home-where-buy',
      'faq-home-likes-views',
      'faq-home-engagement-guarantee',
      'faq-home-check-before',
      'faq-home-track-order',
    ]);
  });
});
