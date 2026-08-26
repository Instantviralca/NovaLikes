/**
 * Content QA Pipeline tests — Document 16.08.
 * Opt-in bulk run: SCAFFOLD_CONTENT_QA=1
 */

import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { SCAFFOLD_CONTENT_PLAN_ENABLED } from '@/lib/content-plan/scaffold-test-guard';
import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import { createArticle } from '@/lib/content-generators';
import {
  generateQAReport,
  runContentQA,
  validateArticle,
  validateLinks,
  validateMetadata,
  validatePackage,
  validateSchema,
} from '@/lib/content-qa';
import { platformToFolder } from '@/lib/content-repository/paths';

const tempDirs: string[] = [];
const shouldRunBulk = process.env.SCAFFOLD_CONTENT_QA === '1';

function tempCwd(): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'iv-content-qa-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  while (tempDirs.length) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

describe('16.08 Content QA Pipeline', () => {
  it.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)(
    'runs staged QA and blocks publish on scaffold placeholders',
    () => {
    const cwd = tempCwd();
    const briefSlug = 'how-to-get-more-instagram-followers';
    createArticle('instagram', briefSlug, { cwd, force: true });
    const packageDir = path.join(cwd, 'content/instagram', briefSlug);

    expect(validatePackage(packageDir).filter((i) => i.severity === 'blocker')).toEqual(
      [],
    );
    expect(validateMetadata(packageDir).some((i) => i.severity === 'blocker')).toBe(false);
    expect(validateSchema(packageDir).some((i) => i.code === 'missing_schema')).toBe(
      false,
    );
    expect(validateLinks(packageDir).length).toBeGreaterThanOrEqual(0);
    expect(
      validateArticle(packageDir).some((i) => i.code === 'placeholder_or_todo'),
    ).toBe(true);

    const report = runContentQA(packageDir, { writeReports: true });
    expect(report.publishEligible).toBe(false);
    expect(report.status).toBe('blocked_from_publish');
    expect(existsSync(path.join(packageDir, 'qa-report.json'))).toBe(true);
    expect(existsSync(path.join(packageDir, 'qa-summary.md'))).toBe(true);

    const summary = readFileSync(path.join(packageDir, 'qa-summary.md'), 'utf8');
    expect(summary).toContain('Publish eligible: **no**');

    const regenerated = generateQAReport(report, packageDir);
    expect(existsSync(regenerated.jsonPath)).toBe(true);
    },
  );

  it.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)(
    'marks a cleaned package publish-eligible when blockers are removed',
    () => {
    const cwd = tempCwd();
    const briefSlug = 'how-the-instagram-algorithm-works';
    createArticle('instagram', briefSlug, { cwd, force: true });
    const packageDir = path.join(cwd, 'content/instagram', briefSlug);

    writeFileSync(
      path.join(packageDir, '03_Article.mdx'),
      `---
slug: ${briefSlug}
title: "How the Instagram Algorithm Works"
status: ready
---

# How the Instagram Algorithm Works

## How ranking signals work

Practical explanation of feed ranking without hype.

## What creators should prioritize

Focus on saves, replies, and consistent series.

## Key takeaways

Stay honest about what the algorithm can and cannot do.
`,
      'utf8',
    );

    writeFileSync(
      path.join(packageDir, '13_Editor_Notes.md'),
      '# Editor Notes\n\nApproved: yes\n',
      'utf8',
    );

    const report = runContentQA(packageDir, { writeReports: true });
    expect(report.issues.some((i) => i.code === 'placeholder_or_todo')).toBe(false);
    expect(report.publishEligible).toBe(true);
    expect(['passed', 'requires_review']).toContain(report.status);
    },
  );

  it.skipIf(!shouldRunBulk)(
    'writes QA reports for all planned packages',
    () => {
      let ran = 0;
      for (const brief of PLANNED_ARTICLES) {
        const folder = platformToFolder(brief.platform);
        const abs = path.join(process.cwd(), 'content', folder, brief.slug);
        if (!existsSync(abs)) continue;
        const report = runContentQA(abs, { writeReports: true });
        expect(report.slug).toBe(brief.slug);
        // Scaffold packages are intentionally not publish-eligible.
        expect(report.publishEligible).toBe(false);
        ran += 1;
      }
      expect(ran).toBe(50);
    },
    60_000,
  );

  it('documents opt-in when idle', () => {
    if (shouldRunBulk) return;
    expect(shouldRunBulk).toBe(false);
  });
});
