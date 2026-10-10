import { describe, expect, it } from 'vitest';

import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';

/**
 * Learn articles that have been cleaned of internal writing notes.
 * Add a slug here once its copy has been rewritten for readers.
 */
const READER_COPY_SLUGS = [
  'tiktok-likes-vs-views',
  'view-instagram-profile-without-login',
  'check-instagram-follower-count-without-login',
  'how-to-download-facebook-video',
  'how-to-download-facebook-reel',
  'view-instagram-profile-picture-full-size',
  'how-many-followers-to-go-live-on-tiktok',
  'how-facebook-page-reach-works',
  'why-tiktok-followers-drop',
];

const INTERNAL_NOTE_PATTERNS: RegExp[] = [
  /NovaLikes should/i,
  /\bthe customer\b/i,
  /\bupsell/i,
  /correct (safety )?language/i,
  /should not be (presented|marketed|described|rewritten)/i,
  /\bDo not (invent|promise|claim|advertise|market|add|introduce|imply|position|describe)\b/,
  /\b(the|a|this) tool should\b/i,
  /SEO copy|tool documentation|the article should|this article should/i,
  /user-facing/i,
  /Correct behaviou?r:/i,
];

describe('Learn reader copy', () => {
  it.each(READER_COPY_SLUGS)('%s has no internal writing notes', (slug) => {
    const article = getPublishedLearnArticleBySlug(slug);
    expect(article, slug).toBeTruthy();
    const text = [
      article!.content,
      article!.excerpt,
      ...(article!.keyTakeaways ?? []),
      ...(article!.faqs ?? []).map((faq) => `${faq.question} ${faq.answer}`),
    ].join('\n');
    for (const pattern of INTERNAL_NOTE_PATTERNS) {
      expect(text.match(pattern)?.[0] ?? null, `${slug} ${pattern}`).toBeNull();
    }
  });
});
