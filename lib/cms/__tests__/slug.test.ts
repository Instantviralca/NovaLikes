import { describe, expect, it } from 'vitest';

import { isReservedLearnSlug, isValidArticleSlug, slugifyTitle } from '@/lib/cms/slug';

describe('cms slugs', () => {
  it('slugifies titles', () => {
    expect(slugifyTitle('Hello World!')).toBe('hello-world');
  });

  it('validates kebab slugs', () => {
    expect(isValidArticleSlug('buy-instagram-followers-guide')).toBe(true);
    expect(isValidArticleSlug('Hello')).toBe(false);
    expect(isValidArticleSlug('ab')).toBe(false);
  });

  it('reserves existing Learn category and registry slugs', () => {
    expect(isReservedLearnSlug('instagram')).toBe(true);
    expect(isReservedLearnSlug('preview')).toBe(true);
  });
});
