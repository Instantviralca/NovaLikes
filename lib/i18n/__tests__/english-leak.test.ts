import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { LOCALIZED_LOCALES } from '@/lib/i18n/config';

const ENGLISH_SENTENCE =
  /\b(The |This |Your |People buy |Buy Instagram |How to buy |Why do people |No third-party service can guarantee)\b/;

const ALLOW = /NovaLikes|Instagram|TikTok|Facebook|USD|Reel|Reels|Page|Learn/;

function collectStrings(value: unknown, acc: string[]): void {
  if (typeof value === 'string') {
    acc.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, acc);
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (['href', 'src', 'id', 'slug', 'primaryKeyword', 'supportingKeywords', 'purpose'].includes(key)) {
        continue;
      }
      collectStrings(child, acc);
    }
  }
}

describe('English sentence leakage on translated catalogs', () => {
  it('flags leftover English commercial sentences', () => {
    const leaks: string[] = [];
    for (const locale of LOCALIZED_LOCALES) {
      const files = [
        'homepage.json',
        'faq-items.json',
        'faq-page.json',
        'ui.json',
        'about.json',
        'contact.json',
        'reviews.json',
        'services/buy-instagram-followers.json',
      ];
      for (const file of files) {
        const raw = JSON.parse(
          readFileSync(path.join(process.cwd(), 'content', 'locales', locale, file), 'utf8'),
        ) as unknown;
        const strings: string[] = [];
        collectStrings(raw, strings);
        for (const text of strings) {
          if (text.length < 40) continue;
          if (!ENGLISH_SENTENCE.test(text)) continue;
          if (ALLOW.test(text) && !/\b(The |People buy |How to buy )\b/.test(text)) continue;
          leaks.push(`${locale}/${file}: ${text.slice(0, 90)}`);
        }
      }
    }
    expect(leaks.slice(0, 12), leaks.slice(0, 12).join('\n')).toEqual([]);
  });
});
