/**
 * Content repository tests — Document 16.01.
 */

import { mkdtempSync, rmSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { describe, expect, it, afterEach } from 'vitest';

import { SCAFFOLD_CONTENT_PLAN_ENABLED } from '@/lib/content-plan/scaffold-test-guard';
import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import { getContentDesignSystemSummary } from '@/lib/content-design';
import {
  buildContentIndex,
  createArticlePackage,
  listMissingFiles,
  scaffoldAllPlannedPackages,
  validateRepository,
} from '@/lib/content-repository';
import { ARTICLE_PACKAGE_FILES } from '@/types/content-design-system';

const tempDirs: string[] = [];

function makeTempCwd(): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'iv-content-repo-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  while (tempDirs.length) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

describe('Content Design System summary', () => {
  it('exposes design system structure and callouts', () => {
    const summary = getContentDesignSystemSummary();
    expect(summary.structure[0]).toBe('SEO Metadata');
    expect(summary.callouts).toContain('Pro Tip');
    expect(summary.faq.minQuestions).toBe(8);
  });
});

describe.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)('Content Design System + Repository Generator', () => {
  it('creates a complete article package from a planned brief', () => {
    const cwd = makeTempCwd();
    const slug = 'how-to-get-more-instagram-followers';
    const result = createArticlePackage(slug, { cwd });

    expect(result.ok).toBe(true);
    expect(result.created).toHaveLength(ARTICLE_PACKAGE_FILES.length);
    expect(listMissingFiles(slug, { cwd })).toEqual([]);
    expect(
      existsSync(
        path.join(cwd, 'content', 'instagram', slug, '03_Article.mdx'),
      ),
    ).toBe(true);
  });

  it('lists missing files for incomplete packages', () => {
    const cwd = makeTempCwd();
    const slug = 'how-to-get-more-tiktok-followers';
    const dir = path.join(cwd, 'content', 'tiktok', slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, '00_README.md'), '# partial\n');

    const missing = listMissingFiles(slug, { cwd });
    expect(missing.length).toBe(ARTICLE_PACKAGE_FILES.length - 1);
    expect(missing).toContain('03_Article.mdx');
  });

  it('detects duplicate slugs and invalid SEO metadata', () => {
    const cwd = makeTempCwd();
    const slug = 'social-media-metrics-that-matter';
    createArticlePackage(slug, { cwd });

    // Duplicate under another platform folder
    const dup = path.join(cwd, 'content', 'instagram', slug);
    mkdirSync(dup, { recursive: true });
    for (const file of ARTICLE_PACKAGE_FILES) {
      writeFileSync(path.join(dup, file), file.endsWith('.json') ? '{}' : '# x\n');
    }

    const report = validateRepository({ cwd });
    expect(report.issues.some((i) => i.code === 'duplicate_slug')).toBe(true);
  });

  it('scaffolds all 50 planned packages and builds an index', () => {
    const cwd = makeTempCwd();
    const results = scaffoldAllPlannedPackages({ cwd, force: true });

    expect(results).toHaveLength(50);
    expect(results.every((r) => r.ok)).toBe(true);

    const index = buildContentIndex({ cwd });
    expect(index).toHaveLength(50);
    expect(index.every((e) => e.missingFiles.length === 0)).toBe(true);
    expect(index.every((e) => e.hasArticleBody === false)).toBe(true);

    const validation = validateRepository({ cwd });
    expect(
      validation.issues.filter(
        (i) => i.severity === 'blocker' || i.severity === 'error',
      ),
    ).toEqual([]);
  });

  it('maps all planned platforms into repository folders', () => {
    const platforms = new Set(PLANNED_ARTICLES.map((a) => a.platform));
    expect(platforms.has('instagram')).toBe(true);
    expect(platforms.has('general')).toBe(true);
  });
});
