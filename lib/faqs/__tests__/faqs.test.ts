/**
 * Shared FAQ system tests — Document 14.04.
 */

import { describe, expect, it } from 'vitest';

import { paymentProviders } from '@/config/payments';
import { normalizeFaqItems } from '@/data/faqs/normalize';
import {
  detectDuplicateFaqs,
  getApprovedFaqs,
  getFeaturedFaqs,
  getInvalidFaqLinks,
  getSchemaEligibleFaqs,
  hasConditionalRefundOrRefillWording,
  answerMentionsPaymentProvider,
  sanitizeFaqForPublic,
  searchFaqs,
  selectHomepageFaqs,
  selectMainFaqPageFaqs,
  selectServiceFaqs,
  enrichFaqAnswer,
  PAYMENT_METHODS_FAQ_ID,
  isUnsupportedYoutubePurchaseFaq,
} from '@/lib/faqs';
import { buildFaqPageSchemaFromVisible } from '@/lib/faqs/schema';
import type { FaqRecord } from '@/types/faq';

const NOW = '2026-01-01T00:00:00.000Z';

function makeFaq(overrides: Partial<FaqRecord> & Pick<FaqRecord, 'id' | 'question' | 'answer'>): FaqRecord {
  return {
    category: 'general',
    keywords: [],
    serviceSlugs: [],
    pageLocations: ['faq_page'],
    relatedLinks: [],
    order: 1,
    status: 'approved',
    featured: false,
    schemaEligible: true,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  };
}

const fixtureCatalogue: FaqRecord[] = [
  makeFaq({
    id: 'approved-general',
    question: 'How does ordering work?',
    answer: 'Choose a service and complete checkout.',
    category: 'ordering',
    featured: true,
    pageLocations: ['homepage', 'faq_page'],
    keywords: ['order', 'checkout'],
  }),
  makeFaq({
    id: 'hidden-general',
    question: 'Hidden question?',
    answer: 'Should not appear.',
    status: 'hidden',
    featured: true,
    pageLocations: ['homepage', 'faq_page'],
  }),
  makeFaq({
    id: 'draft-general',
    question: 'Draft question?',
    answer: 'Draft only.',
    status: 'draft',
  }),
  makeFaq({
    id: 'ig-followers-1',
    question: 'Do I need my Instagram password for followers?',
    answer: 'No. NovaLikes does not ask for your Instagram password.',
    category: 'instagram',
    platform: 'instagram',
    serviceSlugs: ['buy-instagram-followers'],
    pageLocations: ['service_page'],
  }),
  makeFaq({
    id: 'ig-platform',
    question: 'Is gradual delivery available on Instagram?',
    answer: 'Gradual delivery may be available on eligible packages.',
    category: 'instagram',
    platform: 'instagram',
    pageLocations: ['service_page', 'platform_group'],
  }),
  makeFaq({
    id: 'tt-followers-1',
    question: 'Do I need my TikTok password?',
    answer: 'No. Passwords are not required.',
    category: 'tiktok',
    platform: 'tiktok',
    serviceSlugs: ['buy-tiktok-followers'],
    pageLocations: ['service_page'],
  }),
  makeFaq({
    id: 'refund-conditional',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by a 30-Day Money-Back Guarantee, subject to the Refund Policy.',
    category: 'refunds',
    pageLocations: ['faq_page', 'homepage'],
    featured: true,
    relatedLinks: [
      {
        id: 'refund-link',
        label: 'Refund Policy',
        href: '/refund-policy',
      },
    ],
  }),
  makeFaq({
    id: 'refill-conditional',
    question: 'Do you offer a refill guarantee?',
    answer: 'Eligible services include refill coverage. Terms can vary by service.',
    category: 'refunds',
    featured: true,
    pageLocations: ['homepage'],
  }),
  makeFaq({
    id: 'schema-off',
    question: 'Schema off question?',
    answer: 'Visible but not schema eligible.',
    schemaEligible: false,
    featured: true,
    pageLocations: ['homepage', 'faq_page'],
  }),
  makeFaq({
    id: 'payment-methods',
    question: 'Which payment methods are available?',
    answer: 'Payment methods depend on configuration.',
    category: 'payments',
    pageLocations: ['faq_page'],
  }),
  makeFaq({
    id: 'track-order',
    question: 'How can I track my order?',
    answer: 'Use the Track Order page with your order ID and email.',
    category: 'tracking',
    featured: true,
    pageLocations: ['homepage', 'faq_page'],
  }),
  makeFaq({
    id: 'delivery',
    question: 'How long does delivery take?',
    answer: 'Delivery timelines vary by service and package.',
    category: 'delivery',
    featured: true,
    pageLocations: ['homepage', 'faq_page'],
  }),
  makeFaq({
    id: 'bad-link',
    question: 'Where is the secret page?',
    answer: 'See related links.',
    relatedLinks: [
      {
        id: 'bad',
        label: 'Secret',
        href: '/not-a-real-page',
      },
    ],
  }),
];

describe('Shared FAQ system', () => {
  it('renders only approved FAQs publicly', () => {
    const approved = getApprovedFaqs(fixtureCatalogue);
    expect(approved.every((faq) => faq.id !== 'hidden-general')).toBe(true);
    expect(approved.every((faq) => faq.id !== 'draft-general')).toBe(true);
    expect(approved.some((faq) => faq.id === 'approved-general')).toBe(true);
  });

  it('excludes hidden FAQs from sanitizeFaqForPublic', () => {
    const hidden = fixtureCatalogue.find((faq) => faq.id === 'hidden-general')!;
    expect(sanitizeFaqForPublic(hidden)).toBeNull();
  });

  it('selects exact service FAQs before platform and general fallbacks', () => {
    const selected = selectServiceFaqs({
      serviceSlug: 'buy-instagram-followers',
      platform: 'instagram',
      source: fixtureCatalogue,
      limit: 10,
    });
    expect(selected[0]?.id).toBe('ig-followers-1');
    expect(selected.some((faq) => faq.id === 'ig-platform')).toBe(true);
    expect(selected.some((faq) => faq.id === 'tt-followers-1')).toBe(false);
    expect(selected.some((faq) => faq.id === 'approved-general')).toBe(true);
  });

  it('uses platform fallback without leaking other platforms', () => {
    const selected = selectServiceFaqs({
      serviceSlug: 'buy-instagram-likes',
      platform: 'instagram',
      source: fixtureCatalogue,
    });
    expect(selected.some((faq) => faq.platform === 'tiktok')).toBe(false);
    expect(selected.some((faq) => faq.id === 'ig-platform')).toBe(true);
  });

  it('selects 6–8 homepage featured FAQs', () => {
    const homepage = selectHomepageFaqs({ source: fixtureCatalogue, min: 6, max: 8 });
    expect(homepage.length).toBeGreaterThanOrEqual(6);
    expect(homepage.length).toBeLessThanOrEqual(8);
    expect(homepage.every((faq) => faq.id !== 'hidden-general')).toBe(true);
  });

  it('getFeaturedFaqs respects approved + featured', () => {
    const featured = getFeaturedFaqs({ source: fixtureCatalogue, min: 1, max: 8 });
    expect(featured.every((faq) => faq.featured)).toBe(true);
  });

  it('search matches across fields and supports empty results', () => {
    const approved = getApprovedFaqs(fixtureCatalogue);
    const hits = searchFaqs(approved, '  Instagram PASSWORD  ');
    expect(hits.some((faq) => faq.id === 'ig-followers-1')).toBe(true);

    const empty = searchFaqs(approved, 'zzzz-no-match');
    expect(empty).toHaveLength(0);
  });

  it('schema eligibility uses only visible + schemaEligible FAQs', () => {
    const visible = getApprovedFaqs(fixtureCatalogue).filter((faq) =>
      ['approved-general', 'schema-off'].includes(faq.id),
    );
    const eligible = getSchemaEligibleFaqs(visible);
    expect(eligible.map((faq) => faq.id)).toEqual(['approved-general']);

    const schema = buildFaqPageSchemaFromVisible(visible);
    expect(schema).not.toBeNull();
    const entity = (schema as { mainEntity: Array<{ name: string }> }).mainEntity;
    expect(entity).toHaveLength(1);
    expect(entity[0]?.name).toBe('How does ordering work?');
  });

  it('detects duplicate ids, exact questions, and conflicting answers', () => {
    const reports = detectDuplicateFaqs([
      makeFaq({
        id: 'dup-a',
        question: 'Do I need a password?',
        answer: 'No.',
      }),
      makeFaq({
        id: 'dup-b',
        question: 'Do I need a password?',
        answer: 'Yes.',
      }),
      makeFaq({
        id: 'dup-a',
        question: 'Another',
        answer: 'X',
      }),
    ]);
    expect(reports.some((report) => report.kind === 'duplicate_id')).toBe(true);
    expect(reports.some((report) => report.kind === 'exact_question')).toBe(true);
    expect(reports.some((report) => report.kind === 'conflicting_answer')).toBe(true);
  });

  it('detects service questions duplicated as general FAQs', () => {
    const reports = detectDuplicateFaqs([
      makeFaq({
        id: 'svc',
        question: 'How can I track my order?',
        answer: 'Track page.',
        serviceSlugs: ['buy-instagram-followers'],
        category: 'instagram',
      }),
      makeFaq({
        id: 'gen',
        question: 'How can I track my order?',
        answer: 'Track page.',
        category: 'tracking',
      }),
    ]);
    expect(reports.some((report) => report.kind === 'service_as_general_duplicate')).toBe(
      true,
    );
  });

  it('reports invalid related links without deleting them', () => {
    const invalid = getInvalidFaqLinks(fixtureCatalogue);
    expect(invalid.some((result) => result.href === '/not-a-real-page')).toBe(true);
    expect(fixtureCatalogue.some((faq) => faq.id === 'bad-link')).toBe(true);
  });

  it('keeps refund and refill wording conditional', () => {
    const refund = fixtureCatalogue.find((faq) => faq.id === 'refund-conditional')!;
    const refill = fixtureCatalogue.find((faq) => faq.id === 'refill-conditional')!;
    expect(hasConditionalRefundOrRefillWording(refund.answer)).toBe(true);
    expect(hasConditionalRefundOrRefillWording(refill.answer)).toBe(true);
  });

  it('payment enrichment lists only enabled providers', () => {
    const base = 'Payment methods depend on configuration.';
    const enriched = enrichFaqAnswer(base, PAYMENT_METHODS_FAQ_ID);
    const enabledNames = paymentProviders
      .filter((provider) => provider.enabled)
      .map((provider) => provider.displayName);
    const disabledNames = paymentProviders
      .filter((provider) => !provider.enabled)
      .map((provider) => provider.displayName);

    for (const name of enabledNames) {
      expect(answerMentionsPaymentProvider(enriched, name)).toBe(true);
    }
    for (const name of disabledNames) {
      expect(answerMentionsPaymentProvider(enriched, name)).toBe(false);
    }
  });

  it('normalizes legacy FAQ items into the shared model', () => {
    const normalized = normalizeFaqItems([
      {
        id: 'faq-ig-followers-password',
        question: 'Do I need to share my Instagram password?',
        answer: 'No.',
        active: true,
      },
      {
        id: 'faq-hub-password',
        category: 'general',
        order: 1,
        active: false,
        question: 'Do you need my password?',
        answer: 'No.',
      },
    ]);
    expect(normalized[0]?.platform).toBe('instagram');
    expect(normalized[0]?.serviceSlugs).toContain('buy-instagram-followers');
    expect(normalized[0]?.status).toBe('approved');
    expect(normalized[1]?.status).toBe('hidden');
    expect(normalized[1]?.pageLocations).toContain('faq_page');
  });

  it('keeps YouTube purchase FAQs out of public FAQ rendering and schema', () => {
    const youtubeFaq = makeFaq({
      id: 'faq-yt-subscribers-can-you-buy',
      question: 'Can you buy YouTube subscribers?',
      answer: 'Yes. You can purchase subscriber packages.',
      category: 'youtube',
      platform: 'youtube',
      serviceSlugs: ['buy-youtube-subscribers'],
      pageLocations: ['faq_page', 'service_page'],
    });
    const catalogue = [...fixtureCatalogue, youtubeFaq];

    expect(isUnsupportedYoutubePurchaseFaq(youtubeFaq)).toBe(true);
    expect(sanitizeFaqForPublic(youtubeFaq)).toBeNull();
    expect(
      selectMainFaqPageFaqs(catalogue).some((faq) => faq.id.startsWith('faq-yt-')),
    ).toBe(false);
    expect(
      getApprovedFaqs(catalogue).some((faq) => /youtube/i.test(faq.question)),
    ).toBe(false);

    const visible = selectMainFaqPageFaqs(catalogue);
    const schema = buildFaqPageSchemaFromVisible(visible);
    const blob = JSON.stringify(schema);
    expect(blob.toLowerCase()).not.toContain('youtube subscribers');
    expect(blob.toLowerCase()).not.toContain('buy youtube');
  });
});
