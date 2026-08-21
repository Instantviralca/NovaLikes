/**
 * Internal Linking Engine tests — Document 14.05.
 */

import { describe, expect, it } from 'vitest';

import { APPROVED_SERVICE_SLUGS, isApprovedServiceSlug } from '@/data/linking';
import {
  buildBreadcrumb,
  findBrokenLinks,
  findOrphanPages,
  getHomepageRelatedServices,
  getRecommendedAnchors,
  getRelatedPolicies,
  getRelatedServices,
  isGenericAnchor,
  validateInternalLinks,
} from '@/lib/linking';
import { resolveRelatedServices } from '@/lib/content/linking';
import { getServiceBySlug } from '@/data/services';

describe('Internal Linking Engine', () => {
  it('only recommends approved active services', () => {
    const related = getRelatedServices('buy-instagram-followers', {
      surface: 'service',
      limit: 3,
    });
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((link) => isApprovedServiceSlug(link.slug))).toBe(true);
    expect(related.some((link) => link.slug === 'buy-instagram-followers')).toBe(
      false,
    );
    expect(related.some((link) => link.slug.includes('reels'))).toBe(false);
  });

  it('filters skipped services from content overrides', () => {
    const service = getServiceBySlug('buy-instagram-followers');
    expect(service).toBeDefined();
    const related = resolveRelatedServices(service!, [
      'buy-instagram-likes',
      'buy-instagram-reels-views',
      'buy-instagram-saves',
      'buy-instagram-views',
    ]);
    expect(related.map((item) => item.slug).slice(0, 2)).toEqual([
      'buy-instagram-likes',
      'buy-instagram-views',
    ]);
    expect(related.every((item) => isApprovedServiceSlug(item.slug))).toBe(true);
    expect(related.some((item) => item.slug === 'buy-instagram-reels-views')).toBe(
      false,
    );
    expect(related.length).toBeLessThanOrEqual(3);
  });

  it('caps homepage related services at 4', () => {
    const related = getHomepageRelatedServices();
    expect(related.length).toBeLessThanOrEqual(4);
    expect(related.every((link) => isApprovedServiceSlug(link.slug))).toBe(true);
  });

  it('builds service breadcrumbs Home → Service without empty Learn parents', () => {
    const crumbs = buildBreadcrumb('buy-facebook-page-likes');
    expect(crumbs.map((item) => item.label)).toEqual([
      'Home',
      'Buy Facebook Page Likes',
    ]);
    expect(crumbs[0]?.href).toBe('/');
    expect(crumbs[1]?.href).toBeUndefined();
    expect(JSON.stringify(crumbs)).not.toMatch(/\/learn\//);
  });

  it('builds FAQ and policy breadcrumbs', () => {
    expect(buildBreadcrumb('faq').map((item) => item.label)).toEqual([
      'Home',
      'FAQ',
    ]);
    expect(buildBreadcrumb('privacy-policy').map((item) => item.label)).toEqual([
      'Home',
      'Privacy Policy',
    ]);
  });

  it('returns contextual policy links without dumping every legal page on service context', () => {
    const servicePolicies = getRelatedPolicies('service');
    const labels = servicePolicies.map((link) => link.label);
    expect(labels).toContain('Refund Policy');
    expect(labels).toContain('FAQ');
    expect(labels).toContain('Contact Support');
    expect(labels).not.toContain('Cookie Policy');
  });

  it('rejects generic anchors and recommends descriptive ones', () => {
    expect(isGenericAnchor('Click here')).toBe(true);
    expect(isGenericAnchor('Learn more')).toBe(true);
    expect(isGenericAnchor('Buy Instagram Followers')).toBe(false);

    const anchors = getRecommendedAnchors('buy-instagram-followers', {
      includePolicies: true,
      includeServices: true,
    });
    expect(anchors.every((anchor) => !isGenericAnchor(anchor.label))).toBe(true);
    expect(anchors.some((anchor) => anchor.label === 'Track Your Order')).toBe(true);
  });

  it('reports validation without silent failures', () => {
    const report = validateInternalLinks();
    expect(report).toHaveProperty('issues');
    expect(Array.isArray(report.issues)).toBe(true);

    const broken = findBrokenLinks(report);
    // Active pages must not point at skipped services
    expect(
      broken.some(
        (issue) =>
          issue.kind === 'skipped_service' &&
          APPROVED_SERVICE_SLUGS.includes(
            issue.sourceSlug as (typeof APPROVED_SERVICE_SLUGS)[number],
          ),
      ),
    ).toBe(false);
  });

  it('detects orphan pages as a report (homepage exempt)', () => {
    const orphans = findOrphanPages();
    expect(orphans.every((page) => page.slug !== 'home')).toBe(true);
    expect(Array.isArray(orphans)).toBe(true);
  });

  it('never includes skipped services in the approved slug list', () => {
    expect(isApprovedServiceSlug('buy-tiktok-comments')).toBe(false);
    expect(isApprovedServiceSlug('buy-tiktok-shares')).toBe(false);
    expect(isApprovedServiceSlug('buy-instagram-reels-views')).toBe(false);
    expect(isApprovedServiceSlug('buy-facebook-video-views')).toBe(false);
    expect(isApprovedServiceSlug('buy-youtube-subscribers')).toBe(false);
    expect(isApprovedServiceSlug('buy-youtube-views')).toBe(false);
    expect(isApprovedServiceSlug('buy-youtube-watch-hours')).toBe(false);
    expect(APPROVED_SERVICE_SLUGS).toHaveLength(10);
  });
});
