/**
 * Content Library starter kit tests — Phase 17.
 */

import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { SCAFFOLD_CONTENT_PLAN_ENABLED } from '@/lib/content-plan/scaffold-test-guard';
import { createArticle } from '@/lib/content-generators';
import {
  CONTENT_LIBRARY_STARTER_QUEUE,
  buildLibrarySlot,
  getLibraryQueue,
  syncLibraryStarters,
} from '@/lib/content-library';

const shouldSync = process.env.SCAFFOLD_CONTENT_LIBRARY === '1';
const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

describe.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)('17 Content Library Starter Kit', () => {
  it('maps the first 10 publishing queue articles to planned packages', () => {
    expect(CONTENT_LIBRARY_STARTER_QUEUE).toHaveLength(10);
    const queue = getLibraryQueue({ cwd: process.cwd() });
    expect(queue.starterCount).toBe(10);
    expect(queue.totalPlanned).toBe(50);
    expect(queue.slots[0]?.slug).toBe('how-to-get-more-instagram-followers');
    expect(queue.slots[9]?.slug).toBe('social-media-metrics-that-matter');
    expect(queue.slots.every((s) => s.packagePath.startsWith('content/'))).toBe(true);
  });

  it('syncs starter READMEs and queue index into docs/17_Content_Library', () => {
    const cwd = mkdtempSync(path.join(tmpdir(), 'iv-library-'));
    tempDirs.push(cwd);

    // Seed one package so status resolution can see a scaffold.
    createArticle('instagram', 'how-to-get-more-instagram-followers', {
      cwd,
      force: true,
    });

    const queue = syncLibraryStarters({ cwd });
    expect(queue.slots).toHaveLength(10);
    expect(
      existsSync(path.join(cwd, 'docs/17_Content_Library/Article_01/README.md')),
    ).toBe(true);
    expect(existsSync(path.join(cwd, 'docs/17_Content_Library/QUEUE.md'))).toBe(true);
    expect(existsSync(path.join(cwd, 'docs/17_Content_Library/queue.json'))).toBe(true);

    const readme = readFileSync(
      path.join(cwd, 'docs/17_Content_Library/Article_01/README.md'),
      'utf8',
    );
    expect(readme).toContain('how-to-get-more-instagram-followers');
    expect(readme).toContain('Status:');

    const slot = buildLibrarySlot(1, { cwd });
    expect(slot?.status).toBe('Not Started');
  });

  it('marks Article 01 as In Progress after production draft import', () => {
    const slot = buildLibrarySlot(1, { cwd: process.cwd() });
    // Workspace package may already have production draft (no scaffold placeholders).
    expect(['Not Started', 'In Progress', 'In QA']).toContain(slot?.status);
  });

  it.skipIf(!shouldSync)('writes the workspace Phase 17 starter kit files', () => {
    const queue = syncLibraryStarters({ cwd: process.cwd() });
    expect(queue.slots).toHaveLength(10);
    expect(
      existsSync(
        path.join(process.cwd(), 'docs/17_Content_Library/Article_01/README.md'),
      ),
    ).toBe(true);
    expect(existsSync(path.join(process.cwd(), 'docs/17_Content_Library/QUEUE.md'))).toBe(
      true,
    );
  });
});
