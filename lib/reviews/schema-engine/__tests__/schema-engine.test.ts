import { beforeEach, describe, expect, it } from 'vitest';

import {
  buildAggregateRatingSchema,
  buildReviewSchema,
  buildReviewSchemaBundle,
  calculateAggregateRating,
  canGenerateAggregateRating,
  canGenerateReviewSchema,
  clearSchemaEngineLogs,
  getPublicReviewAuthor,
  getSchemaEligibleReviews,
  sanitizeReviewForSchema,
  validateRatingValue,
  validateReviewedEntity,
} from '@/lib/reviews/schema-engine';
import { makeReview } from '@/lib/reviews/schema-engine/__tests__/fixtures';
import type { Review } from '@/types/reviews';

const serviceEntity = {
  kind: 'service' as const,
  serviceSlug: 'buy-instagram-followers',
  name: 'Buy Instagram Followers',
  url: 'https://novalikes.com/buy-instagram-followers',
};

describe('Review & Aggregate Rating Schema Engine (14.03)', () => {
  beforeEach(() => {
    clearSchemaEngineLogs();
  });

  it('accepts a valid service review for schema', () => {
    const review = makeReview();
    const { eligible } = getSchemaEligibleReviews([review], {
      entity: serviceEntity,
      visibleReviewIds: [review.id],
      reviewSectionVisible: true,
    });

    expect(eligible).toHaveLength(1);
    expect(canGenerateReviewSchema([review], { entity: serviceEntity })).toBe(true);

    const node = buildReviewSchema(review, serviceEntity);
    expect(node).toMatchObject({
      '@type': 'Review',
      author: { name: 'Alex Rivera' },
      reviewBody: review.reviewText,
    });
    expect(JSON.stringify(node)).not.toContain('orderIdReference');
    expect(JSON.stringify(node)).not.toContain('moderationNotes');
  });

  it('rejects a hidden review', () => {
    const review = makeReview({ status: 'hidden' });
    const { eligible, excluded } = getSchemaEligibleReviews([review], {
      entity: serviceEntity,
    });
    expect(eligible).toHaveLength(0);
    expect(excluded[0]?.reasons).toContain('not_approved');
    expect(canGenerateReviewSchema([review], { entity: serviceEntity })).toBe(false);
  });

  it('rejects a review missing consent', () => {
    const review = makeReview({ consentConfirmed: false });
    const { excluded } = getSchemaEligibleReviews([review], { entity: serviceEntity });
    expect(excluded[0]?.reasons).toContain('missing_consent');
    expect(getPublicReviewAuthor(review)).toBeNull();
  });

  it('rejects a review with missing rating', () => {
    const review = makeReview({
      rating: undefined as unknown as Review['rating'],
    });
    const { excluded } = getSchemaEligibleReviews([review], { entity: serviceEntity });
    expect(excluded[0]?.reasons).toContain('missing_rating');
  });

  it('rejects an out-of-range rating', () => {
    expect(validateRatingValue(0)).toBe(false);
    expect(validateRatingValue(6)).toBe(false);
    expect(validateRatingValue(4.5)).toBe(true);

    const review = makeReview({ rating: 9 as Review['rating'] });
    const { excluded } = getSchemaEligibleReviews([review], { entity: serviceEntity });
    expect(excluded[0]?.reasons).toContain('invalid_rating');
  });

  it('does not mix reviews from different services into a service aggregate', () => {
    const ig = makeReview({
      id: 'ig-1',
      serviceSlug: 'buy-instagram-followers',
      rating: 5,
    });
    const tt = makeReview({
      id: 'tt-1',
      serviceSlug: 'buy-tiktok-followers',
      platform: 'tiktok',
      rating: 1,
    });

    const { eligible } = getSchemaEligibleReviews([ig, tt], {
      entity: serviceEntity,
    });
    expect(eligible.map((item) => item.id)).toEqual(['ig-1']);

    const aggregate = calculateAggregateRating([ig, tt], { entity: serviceEntity });
    expect(aggregate).toEqual({
      ratingValue: 5,
      reviewCount: 1,
      bestRating: 5,
      worstRating: 1,
    });
  });

  it('calculates aggregate rating from eligible reviews only', () => {
    const reviews = [
      makeReview({ id: 'a', rating: 5 }),
      makeReview({ id: 'b', rating: 4 }),
      makeReview({ id: 'c', rating: 5, status: 'rejected' }),
    ];
    const aggregate = calculateAggregateRating(reviews, { entity: serviceEntity });
    expect(aggregate?.reviewCount).toBe(2);
    expect(aggregate?.ratingValue).toBe(4.5);
    expect(aggregate?.bestRating).toBe(5);
    expect(aggregate?.worstRating).toBe(1);
  });

  it('returns no schema for an empty review set', () => {
    const bundle = buildReviewSchemaBundle([], {
      entity: serviceEntity,
      reviewSectionVisible: true,
    });
    expect(bundle.generated).toBe(false);
    expect(bundle.reviews).toHaveLength(0);
    expect(bundle.aggregate).toBeNull();
    expect(canGenerateAggregateRating([], { entity: serviceEntity })).toBe(false);
  });

  it('outputs no schema when the review section is hidden', () => {
    const review = makeReview();
    const bundle = buildReviewSchemaBundle([review], {
      entity: serviceEntity,
      visibleReviewIds: [review.id],
      reviewSectionVisible: false,
    });
    expect(bundle.generated).toBe(false);
    expect(bundle.skippedReasons).toContain('section_hidden');
    expect(buildAggregateRatingSchema([review], {
      entity: serviceEntity,
      reviewSectionVisible: false,
    })).toBeNull();
  });

  it('rejects placeholder reviews', () => {
    const review = makeReview({
      customerName: 'John Doe',
      reviewText: 'Lorem ipsum dolor sit amet',
      title: 'Sample Review',
    });
    const { eligible, excluded } = getSchemaEligibleReviews([review], {
      entity: serviceEntity,
    });
    expect(eligible).toHaveLength(0);
    expect(excluded[0]?.reasons).toContain('placeholder_detected');
  });

  it('protects author privacy and sanitizes schema payload', () => {
    const review = makeReview({
      customerName: 'Casey <script>alert(1)</script> Ng',
      reviewText: 'Great service <b>bold</b> and safe.',
      orderIdReference: 'INTERNAL-ORDER-999',
      moderationNotes: ['private note'],
      consentConfirmed: true,
    });

    const sanitized = sanitizeReviewForSchema(review);
    expect(sanitized?.author).toBe('Casey  Ng');
    expect(sanitized?.reviewBody).toBe('Great service bold and safe.');
    expect(sanitized?.author).not.toContain('script');

    const node = buildReviewSchema(review, serviceEntity);
    const serialized = JSON.stringify(node);
    expect(serialized).not.toContain('INTERNAL-ORDER-999');
    expect(serialized).not.toContain('private note');
    expect(serialized).not.toContain('<script>');
  });

  it('handles decimal aggregate rating policy', () => {
    const reviews = [
      makeReview({ id: 'd1', rating: 5 }),
      makeReview({ id: 'd2', rating: 4 }),
      makeReview({ id: 'd3', rating: 4 }),
    ];
    const aggregate = calculateAggregateRating(reviews, { entity: serviceEntity });
    expect(aggregate?.ratingValue).toBe(4.3);
    expect(validateReviewedEntity(serviceEntity)).toBe(true);
  });

  it('requires visible review ids to match page content when provided', () => {
    const visible = makeReview({ id: 'visible' });
    const hiddenFromPage = makeReview({ id: 'not-rendered' });
    const { eligible } = getSchemaEligibleReviews([visible, hiddenFromPage], {
      entity: serviceEntity,
      visibleReviewIds: ['visible'],
    });
    expect(eligible.map((item) => item.id)).toEqual(['visible']);
  });
});
