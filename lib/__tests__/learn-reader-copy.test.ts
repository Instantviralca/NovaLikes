import { describe, expect, it } from 'vitest';

import {
  getPublishedLearnArticleBySlug,
  getPublishedLearnArticleSlugs,
} from '@/data/learn/articles';
import { EXPECTED_LIVE_LEARN_ARTICLE_COUNT } from '@/lib/__tests__/fixtures/learn-corpus';

/**
 * Every live Learn article must read as reader copy, with no internal
 * writing notes such as "NovaLikes should" or "Do not promise".
 */
const READER_COPY_SLUGS = getPublishedLearnArticleSlugs();

const INTERNAL_NOTE_PATTERNS: RegExp[] = [
  /NovaLikes should/i,
  /\bthe customer\b/i,
  /\bupsell/i,
  /correct (safety )?language/i,
  /should not be (presented|marketed|described|rewritten|represented)/i,
  /should be understood as a\b.{0,40}\b(service|metric)/i,
  /\bDo not (invent|promise|claim|advertise|market|add|introduce|imply|position|describe)\b/,
  /\b(the|a|this) tool should\b/i,
  /SEO copy|tool documentation|the article should|this article should/i,
  /user-facing/i,
  /Correct behaviou?r:/i,
];

describe('Learn reader copy', () => {
  it('covers every live Learn article', () => {
    expect(READER_COPY_SLUGS).toHaveLength(EXPECTED_LIVE_LEARN_ARTICLE_COUNT);
  });

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
