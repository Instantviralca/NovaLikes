/**
 * Article Package Generator — Document 16.02.
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

import { getPlannedArticleBySlug } from '@/data/content-plan/articles';
import { writeGeneratedAssets } from '@/lib/content-generators/write-assets';
import { generatePackageFiles } from '@/lib/content-repository/generate-files';
import {
  buildContentIndex,
  createArticlePackage,
  listMissingFiles,
  type CreateArticlePackageResult,
} from '@/lib/content-repository/package';
import {
  isValidArticleSlug,
  platformToFolder,
} from '@/lib/content-repository/paths';
import type { ArticleBrief, ContentPlanPlatform } from '@/types/content-plan';
import type { ContentRepositoryPlatformFolder } from '@/types/content-design-system';
import { ARTICLE_PACKAGE_FILES } from '@/types/content-design-system';
import type { ContentRepositoryIssue } from '@/types/content-design-system';

const SUPPORTED_CLI_PLATFORMS = [
  'instagram',
  'tiktok',
  'facebook',
  'marketing',
  'general',
] as const;

export type CreateArticleCliPlatform = (typeof SUPPORTED_CLI_PLATFORMS)[number];

function normalizePlatform(
  platform: string,
): ContentRepositoryPlatformFolder | null {
  if (platform === 'general' || platform === 'marketing') return 'marketing';
  if (
    platform === 'instagram' ||
    platform === 'tiktok' ||
    platform === 'facebook'
  ) {
    return platform;
  }
  return null;
}

function planPlatformFromFolder(
  folder: ContentRepositoryPlatformFolder,
): ContentPlanPlatform {
  return folder === 'marketing' ? 'general' : folder;
}

export function createTemplateFiles(
  brief: ArticleBrief,
): Record<(typeof ARTICLE_PACKAGE_FILES)[number], string> {
  return generatePackageFiles(brief);
}

export function validateArticlePackage(
  slug: string,
  options: {
    cwd?: string;
    platformFolder?: ContentRepositoryPlatformFolder;
  } = {},
): { ok: boolean; issues: ContentRepositoryIssue[] } {
  const cwd = options.cwd ?? process.cwd();
  const brief = getPlannedArticleBySlug(slug);
  const folder =
    options.platformFolder ??
    (brief ? platformToFolder(brief.platform) : undefined);
  const issues: ContentRepositoryIssue[] = [];

  if (!isValidArticleSlug(slug)) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_slug',
      slug,
      message: 'Slug must be lowercase hyphen-separated.',
    });
    return { ok: false, issues };
  }
  if (!folder) {
    issues.push({
      severity: 'blocker',
      code: 'unsupported_platform',
      slug,
      message: 'Supported platform folder could not be resolved.',
    });
    return { ok: false, issues };
  }

  const absDir = path.join(cwd, 'content', folder, slug);
  if (!existsSync(absDir)) {
    issues.push({
      severity: 'blocker',
      code: 'missing_package',
      slug,
      path: `content/${folder}/${slug}`,
      message: 'Article package folder does not exist.',
    });
    return { ok: false, issues };
  }

  for (const missing of listMissingFiles(slug, { cwd, platformFolder: folder })) {
    issues.push({
      severity: 'error',
      code: 'missing_file',
      slug,
      path: `content/${folder}/${slug}/${missing}`,
      message: `Missing template file "${missing}".`,
    });
  }

  const mdxPath = path.join(absDir, '03_Article.mdx');
  if (existsSync(mdxPath)) {
    const raw = readFileSync(mdxPath, 'utf8');
    if (!/^---[\s\S]*?---/.test(raw)) {
      issues.push({
        severity: 'error',
        code: 'missing_frontmatter',
        slug,
        path: `content/${folder}/${slug}/03_Article.mdx`,
        message: 'Article MDX is missing required frontmatter.',
      });
    } else if (!/slug:\s*\S+/.test(raw) || !/title:\s*.+/.test(raw)) {
      issues.push({
        severity: 'error',
        code: 'invalid_frontmatter',
        slug,
        path: `content/${folder}/${slug}/03_Article.mdx`,
        message: 'Frontmatter must include slug and title.',
      });
    }
  }

  for (const jsonFile of ['04_SEO.json', '05_FAQ.json', '06_JSON-LD.json'] as const) {
    const filePath = path.join(absDir, jsonFile);
    if (!existsSync(filePath)) continue;
    try {
      JSON.parse(readFileSync(filePath, 'utf8'));
    } catch {
      issues.push({
        severity: 'blocker',
        code: 'invalid_json',
        slug,
        path: `content/${folder}/${slug}/${jsonFile}`,
        message: `${jsonFile} is not valid JSON.`,
      });
    }
  }

  const ok = !issues.some(
    (i) => i.severity === 'blocker' || i.severity === 'error',
  );
  return { ok, issues };
}

export function updateContentIndex(
  options: { cwd?: string } = {},
): { path: string; count: number } {
  const cwd = options.cwd ?? process.cwd();
  const index = buildContentIndex({ cwd });
  const outPath = path.join(cwd, 'content', 'index.json');
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(
    outPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        count: index.length,
        articles: index,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );
  return { path: outPath, count: index.length };
}

export type CreateArticleCommandResult = CreateArticlePackageResult & {
  platformFolder: ContentRepositoryPlatformFolder | null;
  assetsWritten: string[];
  packageValidationOk: boolean;
  indexPath?: string;
};

/**
 * Production entry: create-article <platform> <slug>
 */
export function createArticle(
  platformInput: string,
  slug: string,
  options: { cwd?: string; force?: boolean } = {},
): CreateArticleCommandResult {
  const cwd = options.cwd ?? process.cwd();
  const folder = normalizePlatform(platformInput);
  const empty: CreateArticleCommandResult = {
    ok: false,
    slug,
    relativePath: '',
    created: [],
    skipped: [],
    issues: [],
    platformFolder: folder,
    assetsWritten: [],
    packageValidationOk: false,
  };

  if (!folder) {
    return {
      ...empty,
      issues: [
        {
          severity: 'blocker',
          code: 'unsupported_platform',
          slug,
          message: `Unsupported platform "${platformInput}". Use instagram|tiktok|facebook|youtube|marketing.`,
        },
      ],
    };
  }

  const brief = getPlannedArticleBySlug(slug);
  if (brief && platformToFolder(brief.platform) !== folder) {
    return {
      ...empty,
      issues: [
        {
          severity: 'blocker',
          code: 'platform_mismatch',
          slug,
          message: `Slug "${slug}" belongs to platform folder "${platformToFolder(brief.platform)}", not "${folder}".`,
        },
      ],
    };
  }

  const absDir = path.join(cwd, 'content', folder, slug);
  if (existsSync(absDir) && !options.force) {
    // Still allow regeneration of assets when package exists? Spec says no duplicate folder.
    return {
      ...empty,
      relativePath: `content/${folder}/${slug}`,
      issues: [
        {
          severity: 'blocker',
          code: 'duplicate_folder',
          slug,
          path: `content/${folder}/${slug}`,
          message: 'Package folder already exists. Re-run with force to overwrite.',
        },
      ],
    };
  }

  const packageResult = createArticlePackage(slug, {
    cwd,
    force: options.force,
    brief: brief ?? undefined,
  });

  if (!packageResult.ok) {
    // Allow creating packages for planned briefs only — if no brief, synthesize minimal? Spec says from generator - require brief.
    return {
      ...packageResult,
      platformFolder: folder,
      assetsWritten: [],
      packageValidationOk: false,
    };
  }

  // If someone passes platform/slug with brief, ensure folder matches createArticlePackage output
  const expectedFolder = brief
    ? platformToFolder(brief.platform)
    : folder;
  if (expectedFolder !== folder && brief) {
    return {
      ...packageResult,
      ok: false,
      platformFolder: folder,
      assetsWritten: [],
      packageValidationOk: false,
      issues: [
        ...packageResult.issues,
        {
          severity: 'blocker',
          code: 'platform_mismatch',
          slug,
          message: 'Platform argument does not match content-plan brief.',
        },
      ],
    };
  }

  const resolvedBrief =
    brief ??
    ({
      // Should not happen when ok — createArticlePackage requires brief
      slug,
      platform: planPlatformFromFolder(folder),
    } as ArticleBrief);

  const assetResult = writeGeneratedAssets(
    path.join(cwd, packageResult.relativePath),
    getPlannedArticleBySlug(slug) ?? resolvedBrief,
    { publishState: 'draft' },
  );

  const validation = validateArticlePackage(slug, {
    cwd,
    platformFolder: folder,
  });
  const index = updateContentIndex({ cwd });

  return {
    ...packageResult,
    ok: packageResult.ok && validation.ok,
    platformFolder: folder,
    assetsWritten: assetResult.written,
    packageValidationOk: validation.ok,
    indexPath: index.path,
    issues: [
      ...packageResult.issues,
      ...validation.issues,
      ...assetResult.issues.map((i) => ({
        severity: i.severity,
        code: i.code,
        slug,
        message: i.message,
      })),
    ],
  };
}

export { createArticlePackage, SUPPORTED_CLI_PLATFORMS };
