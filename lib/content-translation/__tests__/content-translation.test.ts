/**
 * Translation-Ready System tests — Document 16.07.
 */

import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { getPlannedArticleBySlug } from '@/data/content-plan/articles';
import { createArticle } from '@/lib/content-generators';
import {
  buildLocaleIndex,
  buildLocaleMap,
  createTranslationPackage,
  detectOutdatedTranslations,
  validateTranslation,
  writeTranslationFiles,
} from '@/lib/content-translation';
import type { TranslationPackage } from '@/types/content-translation';

const tempDirs: string[] = [];

function tempCwd(): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'iv-i18n-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  while (tempDirs.length) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

describe('16.07 Translation Ready System', () => {
  it('creates a translation package with locale map and canonical fields', () => {
    const brief = getPlannedArticleBySlug('how-to-get-more-instagram-followers')!;
    const pkg = createTranslationPackage(brief);
    const localeMap = buildLocaleMap(brief);

    expect(pkg.canonicalLocale).toBe('en');
    expect(pkg.locales['en']?.fields.title).toBe(brief.workingTitle);
    expect(pkg.locales['fr']?.status).toBe('Not Started');
    expect(localeMap.hreflang.some((h) => h.locale === 'en' && h.enabled)).toBe(
      true,
    );
    expect(localeMap.hreflang.every((h) => h.locale === 'en' || !h.enabled)).toBe(
      true,
    );

    const issues = validateTranslation(pkg, localeMap);
    expect(issues.filter((i) => i.severity === 'blocker')).toEqual([]);
  });

  it('detects outdated translations when the source fingerprint changes', () => {
    const brief = getPlannedArticleBySlug('how-to-get-more-views-on-tiktok')!;
    const base = createTranslationPackage(brief);
    const stale: TranslationPackage = {
      ...base,
      locales: {
        ...base.locales,
        'fr': {
          locale: 'fr',
          status: 'Reviewed',
          fields: {
            title: 'Titre',
            metaTitle: 'Meta',
            metaDescription: 'Description longue assez pour passer.',
            slug: 'comment-obtenir-plus-de-vues-sur-tiktok',
          },
          sourceFingerprint: 'old-fingerprint',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      },
    };

    const refreshed = createTranslationPackage(brief, { existing: stale });
    expect(refreshed.locales['fr']?.status).toBe('Needs Update');
    expect(detectOutdatedTranslations(refreshed)).toContain('fr');
    expect(
      validateTranslation(refreshed, buildLocaleMap(brief)).some(
        (i) => i.code === 'outdated_translation_status',
      ),
    ).toBe(true);
  });

  it('writes translations.json / locale-map.json and builds a locale index', () => {
    const cwd = tempCwd();
    const brief = getPlannedArticleBySlug('how-the-instagram-algorithm-works')!;
    createArticle('instagram', brief.slug, { cwd, force: true });
    const packageDir = path.join(cwd, 'content/instagram', brief.slug);
    const written = writeTranslationFiles(packageDir, brief);

    expect(existsSync(path.join(packageDir, 'assets/i18n/translations.json'))).toBe(
      true,
    );
    expect(existsSync(path.join(packageDir, 'assets/i18n/locale-map.json'))).toBe(true);
    expect(written.pkg.slug).toBe(brief.slug);

    const index = buildLocaleIndex({ cwd });
    expect(index.count).toBe(1);
    expect(existsSync(path.join(cwd, 'content/locale-index.json'))).toBe(true);
    const parsed = JSON.parse(
      readFileSync(path.join(cwd, 'content/locale-index.json'), 'utf8'),
    );
    expect(parsed.entries[0].slug).toBe(brief.slug);
  });
});
