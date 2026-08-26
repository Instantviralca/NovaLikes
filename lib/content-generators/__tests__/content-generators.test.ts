/**
 * Content generators tests — Documents 16.02–16.06.
 */

import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { SCAFFOLD_CONTENT_PLAN_ENABLED } from '@/lib/content-plan/scaffold-test-guard';
import { getPlannedArticleBySlug } from '@/data/content-plan/articles';
import {
  buildCampaignAssets,
  buildImageManifest,
  createArticle,
  generateHashtags,
  generateImagePrompts,
  generateNewsletter,
  generatePreviewText,
  generateSeoAssets,
  generateSubjectLines,
  updateContentIndex,
  validateArticlePackage,
  validateImageAssets,
  validateNewsletter,
  validateSeoAssets,
  validateSocialAssets,
} from '@/lib/content-generators';

const tempDirs: string[] = [];

function tempCwd(): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'iv-content-gen-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  while (tempDirs.length) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

describe.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)('16.02 Article Package Generator', () => {
  it('creates a full package with assets and updates the content index', () => {
    const cwd = tempCwd();
    const result = createArticle(
      'instagram',
      'how-to-get-more-instagram-followers',
      { cwd, force: true },
    );

    expect(result.ok).toBe(true);
    expect(result.packageValidationOk).toBe(true);
    expect(result.assetsWritten.length).toBeGreaterThan(5);
    expect(
      existsSync(
        path.join(
          cwd,
          'content/instagram/how-to-get-more-instagram-followers/assets/seo/seo.json',
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(
          cwd,
          'content/instagram/how-to-get-more-instagram-followers/assets/images/image-manifest.json',
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(
          cwd,
          'content/instagram/how-to-get-more-instagram-followers/assets/social/social-assets.json',
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(
          cwd,
          'content/instagram/how-to-get-more-instagram-followers/assets/newsletter/newsletter.json',
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        path.join(
          cwd,
          'content/instagram/how-to-get-more-instagram-followers/assets/i18n/translations.json',
        ),
      ),
    ).toBe(true);

    const index = updateContentIndex({ cwd });
    expect(index.count).toBe(1);
    expect(existsSync(path.join(cwd, 'content/index.json'))).toBe(true);

    const validation = validateArticlePackage(
      'how-to-get-more-instagram-followers',
      { cwd, platformFolder: 'instagram' },
    );
    expect(validation.ok).toBe(true);
  });

  it('rejects unsupported platforms and duplicate folders', () => {
    const cwd = tempCwd();
    const bad = createArticle('myspace', 'how-to-get-more-instagram-followers', {
      cwd,
    });
    expect(bad.ok).toBe(false);
    expect(bad.issues.some((i) => i.code === 'unsupported_platform')).toBe(true);

    createArticle('instagram', 'how-to-get-more-instagram-followers', {
      cwd,
      force: true,
    });
    const dup = createArticle('instagram', 'how-to-get-more-instagram-followers', {
      cwd,
      force: false,
    });
    expect(dup.ok).toBe(false);
    expect(dup.issues.some((i) => i.code === 'duplicate_folder')).toBe(true);
  });
});

describe.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)('16.03 SEO Asset Generator', () => {
  it('generates draft-safe SEO assets and validates peers', () => {
    const brief = getPlannedArticleBySlug('how-to-get-more-instagram-followers')!;
    const { seo, schema, faq } = generateSeoAssets({
      brief,
      publishState: 'draft',
    });

    expect(seo.robots.index).toBe(false);
    expect(seo.sitemap.eligible).toBe(false);
    expect(seo.canonicalPath).toBe('/learn/how-to-get-more-instagram-followers');
    expect(schema.article['@type']).toBe('Article');
    expect(faq.items.length).toBeGreaterThan(0);

    const issues = validateSeoAssets(seo);
    expect(issues.filter((i) => i.severity === 'blocker')).toEqual([]);

    const peer = generateSeoAssets({
      brief: getPlannedArticleBySlug('how-the-instagram-algorithm-works')!,
      publishState: 'draft',
    }).seo;
    const dup = validateSeoAssets(
      { ...seo, metaTitle: peer.metaTitle },
      { peers: [peer] },
    );
    expect(dup.some((i) => i.code === 'duplicate_title')).toBe(true);
  });
});

describe.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)('16.04 Image Asset Generator', () => {
  it('builds manifests and prompts with accessibility fields', () => {
    const brief = getPlannedArticleBySlug('how-to-get-more-views-on-tiktok')!;
    const manifest = buildImageManifest(brief);
    expect(manifest.assets.some((a) => a.filename === 'featured-image.webp')).toBe(
      true,
    );
    expect(manifest.standards.featured).toEqual({ width: 1600, height: 900 });
    expect(generateImagePrompts(brief)).toContain('1600×900');
    expect(validateImageAssets(manifest).filter((i) => i.severity === 'blocker')).toEqual(
      [],
    );
  });
});

describe.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)('16.05 Social Media Asset Generator', () => {
  it('builds platform variants with UTM URLs and character limits', () => {
    const brief = getPlannedArticleBySlug('social-media-growth-strategy-for-beginners')!;
    const assets = buildCampaignAssets(brief);
    expect(generateHashtags(brief).length).toBeGreaterThan(0);
    expect(assets.variants.some((v) => v.platform === 'x')).toBe(true);
    expect(assets.variants.every((v) => v.destinationUrl.includes('utm_source='))).toBe(
      true,
    );
    const xTeaser = assets.variants.find((v) => v.platform === 'x' && v.kind === 'teaser')!;
    expect(xTeaser.characterCount).toBeLessThanOrEqual(xTeaser.characterLimit);
    expect(validateSocialAssets(assets).filter((i) => i.severity === 'blocker')).toEqual(
      [],
    );
  });
});

describe.skipIf(!SCAFFOLD_CONTENT_PLAN_ENABLED)('16.06 Newsletter Generator', () => {
  it('generates subject options, preview, CTA, and validates JSON shape', () => {
    const brief = getPlannedArticleBySlug('how-the-instagram-algorithm-works')!;
    const newsletter = generateNewsletter(brief);
    expect(generateSubjectLines(brief).length).toBeGreaterThanOrEqual(2);
    expect(generatePreviewText(brief).length).toBeGreaterThan(0);
    expect(newsletter.primaryCta.url).toContain('utm_source=newsletter');
    expect(newsletter.subjectLines.length).toBeGreaterThan(1);
    expect(validateNewsletter(newsletter).filter((i) => i.severity === 'blocker')).toEqual(
      [],
    );

    const cwd = tempCwd();
    createArticle('instagram', brief.slug, { cwd, force: true });
    const jsonPath = path.join(
      cwd,
      'content/instagram',
      brief.slug,
      'assets/newsletter/newsletter.json',
    );
    const parsed = JSON.parse(readFileSync(jsonPath, 'utf8'));
    expect(parsed.slug).toBe(brief.slug);
    expect(Array.isArray(parsed.subjectLines)).toBe(true);
  });
});
