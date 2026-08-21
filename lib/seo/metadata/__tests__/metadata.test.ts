/**
 * SEO Metadata & Canonical Engine tests — Document 14.07.
 */

import { describe, expect, it } from 'vitest';

import { routes } from '@/config/routes';
import { seoSiteConfig } from '@/config/seo';
import {
  buildCanonicalUrl,
  buildPageMetadata,
  buildPageMetadataForRoute,
  findDuplicateCanonicals,
  findDuplicateDescriptions,
  findDuplicateTitles,
  findMissingMetadata,
  getMetadataByRoute,
  isSkippedServiceRoute,
  privateTrackOrderResultMetadata,
  validateMetadataRegistry,
  validateMetadataSchemaConsistency,
  validateSocialImage,
} from '@/lib/seo/metadata';
import { adminMetadata, cartMetadata, checkoutMetadata, homeMetadata, serviceMetadata } from '@/seo/metadata';
import { absoluteUrl } from '@/seo/canonical';

describe('SEO Metadata & Canonical Engine', () => {
  it('builds homepage metadata with unique title and self-canonical', () => {
    const meta = homeMetadata();
    const entry = getMetadataByRoute('/');
    expect(entry).toBeDefined();
    expect(meta.alternates?.canonical).toBe(buildCanonicalUrl('/'));
    expect(meta.alternates?.canonical).toBe('https://novalikes.com');
    expect(String((meta.title as { absolute?: string })?.absolute ?? '')).toContain(
      'NovaLikes',
    );
    expect(meta.robots).toMatchObject({ index: true });
    expect(meta.alternates?.languages?.['x-default']).toBe('https://novalikes.com');
    expect(meta.alternates?.languages?.es).toBe('https://novalikes.com/es');
  });

  it('builds approved service metadata and rejects skipped services', () => {
    const ig = serviceMetadata('buy-instagram-followers');
    expect(ig.alternates?.canonical).toBe(
      'https://novalikes.com/buy-instagram-followers',
    );
    expect(ig.alternates?.languages?.['x-default']).toBe(
      'https://novalikes.com/buy-instagram-followers',
    );
    expect(ig.alternates?.languages?.de).toBe(
      'https://novalikes.com/de/instagram-follower-kaufen',
    );
    expect(ig.robots).toMatchObject({ index: true });

    const skipped = serviceMetadata('buy-instagram-reels-views');
    expect(skipped.robots).toMatchObject({ index: false });
    expect(isSkippedServiceRoute('/buy-instagram-reels-views')).toBe(true);
    expect(getMetadataByRoute('/buy-instagram-reels-views')).toBeUndefined();
  });

  it('uses self-referencing canonicals without query or fragment', () => {
    expect(buildCanonicalUrl('/faq?utm_source=x')).toBe('https://novalikes.com/faq');
    expect(buildCanonicalUrl('/about#team')).toBe('https://novalikes.com/about');
    expect(buildCanonicalUrl('/buy-tiktok-views/')).toBe(
      'https://novalikes.com/buy-tiktok-views',
    );
  });

  it('detects duplicate titles, descriptions, and canonicals', () => {
    const fixture = [
      {
        ...getMetadataByRoute('/')!,
        id: 'a',
        route: '/a',
        canonicalPath: '/a',
        title: 'Same Title',
        description: 'Unique A',
      },
      {
        ...getMetadataByRoute('/')!,
        id: 'b',
        route: '/b',
        canonicalPath: '/b',
        title: 'Same Title',
        description: 'Unique B',
      },
      {
        ...getMetadataByRoute('/')!,
        id: 'c',
        route: '/c',
        canonicalPath: '/c',
        title: 'Title C',
        description: 'Same Description',
      },
      {
        ...getMetadataByRoute('/')!,
        id: 'd',
        route: '/d',
        canonicalPath: '/c',
        title: 'Title D',
        description: 'Same Description',
      },
    ];

    expect(findDuplicateTitles(fixture).length).toBeGreaterThan(0);
    expect(findDuplicateDescriptions(fixture).length).toBeGreaterThan(0);
    expect(findDuplicateCanonicals(fixture).length).toBeGreaterThan(0);
  });

  it('reports missing metadata fields', () => {
    const incomplete = [
      {
        ...getMetadataByRoute('/faq')!,
        id: 'missing-test',
        route: '/missing-test',
        canonicalPath: '',
        title: '',
        description: '',
        openGraphImage: '',
        indexable: true,
        active: true,
      },
    ];
    const missing = findMissingMetadata(incomplete);
    expect(missing.some((issue) => issue.kind === 'missing_title')).toBe(true);
    expect(missing.some((issue) => issue.kind === 'missing_description')).toBe(true);
    expect(missing.some((issue) => issue.kind === 'missing_canonical')).toBe(true);
  });

  it('applies noindex to cart, checkout, and admin', () => {
    expect(cartMetadata().robots).toMatchObject({ index: false, follow: true });
    expect(checkoutMetadata().robots).toMatchObject({ index: false, follow: false });
    expect(adminMetadata().robots).toMatchObject({ index: false, follow: false });
  });

  it('keeps private Track Order results noindex without PII', () => {
    const meta = privateTrackOrderResultMetadata();
    expect(meta.robots).toMatchObject({ index: false });
    const description = String(meta.description ?? '');
    expect(description).not.toMatch(/@/);
    expect(description.toLowerCase()).not.toContain('email');
    expect(description.toLowerCase()).not.toContain('order-');
  });

  it('validates social images exist', () => {
    const ok = validateSocialImage(seoSiteConfig.defaultOpenGraphImage);
    expect(ok.exists).toBe(true);
    const missing = validateSocialImage('/og-does-not-exist.png');
    expect(missing.exists).toBe(false);
  });

  it('keeps metadata and schema canonicals consistent', () => {
    const route = '/buy-facebook-post-likes';
    const canonical = buildCanonicalUrl(route);
    const issues = validateMetadataSchemaConsistency(route, absoluteUrl(route));
    expect(issues.filter((issue) => issue.kind === 'schema_url_mismatch')).toHaveLength(0);
    expect(canonical).toBe(absoluteUrl(route));
  });

  it('does not publish metadata for removed YouTube service pages', () => {
    expect(getMetadataByRoute('/buy-youtube-views')).toBeUndefined();
    expect(getMetadataByRoute('/buy-youtube-subscribers')).toBeUndefined();
    expect(isSkippedServiceRoute('/buy-youtube-views')).toBe(true);
    expect(isSkippedServiceRoute('/buy-youtube-subscribers')).toBe(true);
  });

  it('registry validation has no duplicate titles among indexable pages', () => {
    const report = validateMetadataRegistry();
    expect(report.duplicateTitleCount).toBe(0);
    expect(report.duplicateCanonicalCount).toBe(0);
    expect(
      report.issues.filter((issue) => issue.kind === 'skipped_service'),
    ).toHaveLength(0);
  });

  it('buildPageMetadata sets metadataBase to production domain', () => {
    const meta = buildPageMetadata({
      title: 'Test',
      description: 'Test description for metadata engine coverage.',
      path: routes.about,
    });
    expect(meta.metadataBase?.toString()).toContain('novalikes.com');
  });

  it('track order form metadata is noindex follow while result route is noindex', () => {
    const form = buildPageMetadataForRoute(routes.trackOrder);
    const result = buildPageMetadataForRoute('/track-order/result');
    expect(form.robots).toMatchObject({ index: false, follow: true });
    expect(result.robots).toMatchObject({ index: false });
  });
});
