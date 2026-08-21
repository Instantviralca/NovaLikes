import { describe, expect, it } from 'vitest';

import { getHomepageContent } from '@/data/content/homepage';
import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getServiceContentBySlug } from '@/data/content/services';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { getServiceBySlug } from '@/data/services';
import { descriptions } from '@/seo/descriptions';
import { titles } from '@/seo/titles';
import { getMetadataByRoute } from '@/lib/seo/metadata';
import { productSchema, serviceSchema } from '@/schemas/service';

const LEARN_COMMERCIAL_TARGET =
  /\b(?:buy|purchase|checkout|packages?|pricing)\b|\border (?:followers|likes|views|subscribers|comments)\b/i;

describe('SEO keyword ownership', () => {
  it('uses the approved homepage metadata without YouTube targeting', () => {
    const metadata = getMetadataByRoute('/');
    const homeDescription = descriptions.home();
    const title = metadata?.title ?? '';
    const keywords = metadata?.keywords?.join(' ').toLowerCase() ?? '';

    expect(title).toBe('Buy Followers, Likes & Views for Social Media | NovaLikes');
    expect(title.length).toBeLessThanOrEqual(58);
    expect(title).toContain('NovaLikes');
    expect(title).not.toContain('YouTube');
    expect(title.toLowerCase()).not.toContain('buy instagram followers');
    expect(homeDescription).toBe(
      'Buy followers, likes, views and comments for Instagram, TikTok and Facebook. Compare available packages, order online and track your NovaLikes order.',
    );
    expect(homeDescription.length).toBeLessThanOrEqual(150);
    expect(homeDescription.toLowerCase()).toMatch(/instagram/);
    expect(homeDescription.toLowerCase()).toMatch(/tiktok/);
    expect(homeDescription.toLowerCase()).toMatch(/facebook/);
    expect(homeDescription.toLowerCase()).not.toMatch(/youtube/);
    expect(homeDescription.toLowerCase()).not.toContain('buy instagram followers');
    expect(keywords).not.toContain('buy instagram followers');
    expect(metadata?.canonicalPath).toBe('/');
  });

  it('gives Instagram Followers Packages one consistent service-page owner', () => {
    const service = getServiceBySlug('buy-instagram-followers')!;
    const content = getServiceContentBySlug(service.slug)!;
    const metadata = getMetadataByRoute(service.url)!;

    expect(service.primaryKeyword).toBe('instagram followers packages');
    expect(service.name).toBe('Instagram Followers Packages');
    expect(content.hero.title).toBe('Buy Instagram Followers');
    expect(metadata.title).toBe(titles.service(service));
    expect(metadata.description).toBe(descriptions.service(service));
    expect(metadata.openGraphTitle).toBe(titles.service(service));
    expect(metadata.twitterTitle).toBe(titles.service(service));
    expect(service.breadcrumb.at(-1)?.label).toBe('Instagram Followers Packages');
    expect(serviceSchema(service).name).toBe('Instagram Followers Packages');
    expect(productSchema(service).name).toBe('Instagram Followers Packages');
  });

  it('keeps Facebook Page Likes distinct from Facebook Post Likes', () => {
    const service = getServiceBySlug('buy-facebook-page-likes')!;
    const content = getServiceContentBySlug(service.slug)!;
    const metadata = getMetadataByRoute(service.url)!;
    const serialized = JSON.stringify(content);

    expect(content.hero.title).toBe('Buy Facebook Page Likes');
    expect(serialized).not.toMatch(/\bFacebook Likes\b/i);
    expect(metadata.title).toBe(titles.service(service));
    expect(metadata.description).toBe(descriptions.service(service));
    expect(metadata.openGraphTitle).toBe(titles.service(service));
    expect(metadata.twitterTitle).toBe(titles.service(service));
    expect(serviceSchema(service).name).toBe('Buy Facebook Page Likes');
    expect(productSchema(service).name).toBe('Buy Facebook Page Likes');
  });

  it('uses approved metadata independently of visible H1 copy', () => {
    for (const slug of APPROVED_SERVICE_SLUGS) {
      const service = getServiceBySlug(slug);
      const content = getServiceContentBySlug(slug);
      const metadata = getMetadataByRoute(`/${slug}`);

      if (!service || !content || !metadata) {
        throw new Error(`Missing SEO data for ${slug}`);
      }

      expect(content.hero.title.length, service.slug).toBeGreaterThan(0);
      expect(metadata.title, service.slug).toBe(titles.service(service));
      expect(metadata.description, service.slug).toBe(descriptions.service(service));
      expect(metadata.openGraphTitle, service.slug).toBe(titles.service(service));
      expect(metadata.twitterTitle, service.slug).toBe(titles.service(service));
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
      const hasToolCta = article.blocks.some(
        (block) =>
          block.type === 'internal_cta' && block.href.startsWith('/tools/'),
      );
      expect(
        article.relatedServices.length > 0 || hasToolCta,
        article.slug,
      ).toBe(true);
    }
  });

  it('does not expose unpublished Learn article metadata', () => {
    expect(LEARN_ARTICLES.filter((article) => article.status === 'draft')).toHaveLength(0);
    expect(LEARN_ARTICLES.every((article) => article.seo?.noindex !== true || article.status !== 'published')).toBe(
      true,
    );
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
