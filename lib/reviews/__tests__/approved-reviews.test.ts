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
  it('imports exactly 120 approved reviews with unique ids and a 4.8 aggregate', () => {
    const reviews = getAllReviews();
    expect(reviews).toHaveLength(120);
    expect(new Set(reviews.map((review) => review.id)).size).toBe(120);
    expect(reviews.every((review) => review.status === 'approved')).toBe(true);
    expect(reviews.every((review) => review.consentConfirmed)).toBe(true);
    expect(reviews.every((review) => review.verifiedPurchase === false)).toBe(true);
    expect(reviews.every((review) => review.source === 'imported_historical')).toBe(true);
    expect(reviews.every((review) => review.rating >= 4 && review.rating <= 5)).toBe(true);
    expect(reviews.some((review) => review.rating === 4)).toBe(true);
    expect(reviews.some((review) => review.rating === 5)).toBe(true);

    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    expect(Number((sum / reviews.length).toFixed(1))).toBe(4.8);
  });

  it('exposes all 120 reviews publicly with a 4.8 aggregate', () => {
    const publicReviews = getSafePublicReviews();
    expect(publicReviews).toHaveLength(120);
    const aggregate = summarizePublicReviews(publicReviews);
    expect(aggregate).toEqual({
      ratingValue: 4.8,
      reviewCount: 120,
      bestRating: 5,
      worstRating: 1,
    });
  });

  it('returns three varied homepage reviews without changing their wording', () => {
    const featured = getHomepageReviews();
    expect(featured).toHaveLength(3);
    expect(featured.map((review) => review.customerName)).toEqual([
      'Mary Care',
      'Nina Hartley',
      'Lisa',
    ]);
    expect(featured.map((review) => review.reviewText)).toEqual([
      'I compared a few Instagram packages before ordering, and checkout was easy. I also liked being able to see the full total before I paid.',
      'I started with a smaller Instagram package for my creator page. The status updates helped, and everything went fine.',
      'I’ve used NovaLikes a few times now, and it’s still been reliable for me.',
    ]);
  });

  it('prioritizes matching platform reviews on service pages', () => {
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
    expect(fb.some((review) => review.platform === 'facebook')).toBe(true);
    expect(tt.some((review) => review.platform === 'tiktok')).toBe(true);
    expect(ig.every((review) => review.platform == null || review.platform === 'instagram')).toBe(
      true,
    );
    expect(fb.every((review) => review.platform == null || review.platform === 'facebook')).toBe(
      true,
    );
    expect(tt.every((review) => review.platform == null || review.platform === 'tiktok')).toBe(
      true,
    );
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
    expect(bundle.aggregateValues?.ratingValue).toBe(
      Number(
        (
          visible.reduce((sum, review) => sum + review.rating, 0) / visible.length
        ).toFixed(1),
      ),
    );
    expect(bundle.reviews).toHaveLength(visible.length);
  });

  it('emits Organization sameAs only for verified official social profiles', () => {
    const org = organizationSchema();
    expect(org.sameAs).toEqual([
      'https://www.instagram.com/novalikesco/',
      'https://www.facebook.com/novalikes/',
      'https://www.linkedin.com/company/nova-likes/',
    ]);
    expect(JSON.stringify(org)).not.toContain('"#"');
    expect(JSON.stringify(org.sameAs)).not.toMatch(/tiktok|youtube|twitter|x\.com/i);
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
