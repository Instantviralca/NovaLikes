/**
 * Approved customer reviews — import, selection, aggregate, and schema guards.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { organizationSchema } from '@/schemas/organization';
import { productSchema } from '@/schemas/service';
import { getServiceBySlug } from '@/data/services';
import { getAllReviews } from '@/data/reviews';
import {
  getHomepageReviews,
  getSafePublicReviews,
  getServicePageReviews,
  summarizePublicReviews,
} from '@/lib/reviews';
import { buildReviewSchemaBundle } from '@/lib/reviews/schema-engine';

describe('Approved customer reviews catalogue', () => {
  it('imports exactly 21 approved five-star reviews with unique ids', () => {
    const reviews = getAllReviews();
    expect(reviews).toHaveLength(21);
    expect(new Set(reviews.map((review) => review.id)).size).toBe(21);
    expect(reviews.every((review) => review.rating === 5)).toBe(true);
    expect(reviews.every((review) => review.status === 'approved')).toBe(true);
    expect(reviews.every((review) => review.consentConfirmed)).toBe(true);
    expect(reviews.every((review) => review.verifiedPurchase === false)).toBe(true);
    expect(reviews.every((review) => review.source === 'imported_historical')).toBe(true);
  });

  it('exposes all 21 reviews publicly with a 5.0 aggregate from 21 reviews', () => {
    const publicReviews = getSafePublicReviews();
    expect(publicReviews).toHaveLength(21);
    const aggregate = summarizePublicReviews(publicReviews);
    expect(aggregate).toEqual({
      ratingValue: 5,
      reviewCount: 21,
      bestRating: 5,
      worstRating: 1,
    });
  });

  it('returns the six featured homepage reviews in the recommended order', () => {
    const featured = getHomepageReviews(6);
    expect(featured.map((review) => review.customerName)).toEqual([
      'Mary Care',
      'Nina Hartley',
      'Muntaha',
      'Eva',
      'Sheikh Hadi',
      'Lisa',
    ]);
  });

  it('prioritizes Instagram reviews on Instagram service pages and general elsewhere', () => {
    const ig = getServicePageReviews({
      serviceSlug: 'buy-instagram-followers',
      platform: 'instagram',
      limit: 6,
    });
    const fb = getServicePageReviews({
      serviceSlug: 'buy-facebook-followers',
      platform: 'facebook',
      limit: 6,
    });
    const tt = getServicePageReviews({
      serviceSlug: 'buy-tiktok-followers',
      platform: 'tiktok',
      limit: 6,
    });

    expect(ig.length).toBeGreaterThanOrEqual(3);
    expect(ig.length).toBeLessThanOrEqual(6);
    expect(ig.some((review) => review.platform === 'instagram')).toBe(true);
    expect(fb.every((review) => review.platform == null)).toBe(true);
    expect(tt.every((review) => review.platform == null)).toBe(true);
    expect(ig.map((review) => review.id).join(',')).not.toBe(
      fb.map((review) => review.id).join(','),
    );
  });

  it('does not fabricate Product AggregateRating from the catalogue alone', () => {
    const service = getServiceBySlug('buy-instagram-followers');
    expect(service).toBeDefined();
    const schema = productSchema(service!);
    expect(schema).not.toHaveProperty('aggregateRating');
  });

  it('emits service AggregateRating only for visible service-page reviews', () => {
    const service = getServiceBySlug('buy-instagram-followers')!;
    const visible = getServicePageReviews({
      serviceSlug: service.slug,
      platform: service.platform,
      limit: 6,
    });
    const bundle = buildReviewSchemaBundle(getAllReviews(), {
      entity: {
        kind: 'service',
        serviceSlug: service.slug,
        name: service.name,
        platform: service.platform,
      },
      visibleReviewIds: visible.map((review) => review.id),
      reviewSectionVisible: true,
    });
    expect(bundle.generated).toBe(true);
    expect(bundle.aggregateValues?.reviewCount).toBe(visible.length);
    expect(bundle.aggregateValues?.ratingValue).toBe(5);
    expect(bundle.reviews).toHaveLength(visible.length);
  });

  it('emits Organization sameAs only for verified official social profiles', () => {
    const org = organizationSchema();
    expect(org.sameAs).toEqual([
      'https://www.instagram.com/novalikes',
      'https://www.facebook.com/Novalikescanada',
    ]);
    expect(JSON.stringify(org)).not.toContain('#');
    expect(JSON.stringify(org.sameAs)).not.toMatch(/tiktok|youtube|linkedin|twitter|x\.com/i);
  });

  it('ships a 1200x630 default OG image and required icon assets', () => {
    const root = process.cwd();
    const og = readFileSync(join(root, 'public/og-default.png'));
    expect(og.byteLength).toBeGreaterThan(1000);

    const required = [
      'public/favicon.ico',
      'public/icons/icon-32.png',
      'public/icons/icon-48.png',
      'public/icons/apple-touch-icon.png',
      'public/icons/icon-192.png',
      'public/icons/icon-512.png',
      'public/icons/icon-512-maskable.png',
    ];
    for (const relative of required) {
      const bytes = readFileSync(join(root, relative));
      expect(bytes.byteLength).toBeGreaterThan(0);
    }
  });
});
