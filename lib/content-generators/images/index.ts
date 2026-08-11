/**
 * Image Asset Generator — Document 16.04.
 */

import type { ArticleBrief } from '@/types/content-plan';
import type {
  AssetValidationIssue,
  ImageManifest,
  ImageManifestAsset,
} from '@/types/content-assets';

const STANDARDS = {
  featured: { width: 1600, height: 900 },
  openGraph: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 675 },
} as const;

function defaultAlt(brief: ArticleBrief): string {
  return `Illustrated cover for “${brief.workingTitle}” on NovaLikes Learn`;
}

export function buildImageManifest(brief: ArticleBrief): ImageManifest {
  const base = `content/${brief.platform === 'general' ? 'marketing' : brief.platform}/${brief.slug}/assets/images`;
  const assets: ImageManifestAsset[] = [
    {
      id: 'featured',
      filename: 'featured-image.webp',
      role: 'featured',
      width: STANDARDS.featured.width,
      height: STANDARDS.featured.height,
      format: 'webp',
      alt: defaultAlt(brief),
      required: true,
      status: 'planned',
      localPath: `${base}/featured-image.webp`,
    },
    {
      id: 'og',
      filename: 'og-image.webp',
      role: 'og',
      width: STANDARDS.openGraph.width,
      height: STANDARDS.openGraph.height,
      format: 'webp',
      alt: defaultAlt(brief),
      required: true,
      status: 'planned',
      localPath: `${base}/og-image.webp`,
    },
    {
      id: 'twitter',
      filename: 'twitter-image.webp',
      role: 'twitter',
      width: STANDARDS.twitter.width,
      height: STANDARDS.twitter.height,
      format: 'webp',
      alt: defaultAlt(brief),
      required: true,
      status: 'planned',
      localPath: `${base}/twitter-image.webp`,
    },
    {
      id: 'diagram-01',
      filename: 'diagram-01.svg',
      role: 'diagram',
      width: 1200,
      height: 800,
      format: 'svg',
      alt: `Optional process diagram for ${brief.workingTitle}`,
      required: false,
      status: 'planned',
      localPath: `${base}/diagram-01.svg`,
    },
  ];

  return { slug: brief.slug, assets, standards: STANDARDS };
}

export function generateImageBrief(brief: ArticleBrief): string {
  const manifest = buildImageManifest(brief);
  return `# Image Brief — ${brief.workingTitle}

## Branding
- NovaLikes Learn visual language
- Clear title-safe area
- No unauthorized stock hotlinks

## Required assets
${manifest.assets
  .filter((a) => a.required)
  .map(
    (a) =>
      `- **${a.filename}** (${a.width}×${a.height}, ${a.format}) — alt: ${a.alt}`,
  )
  .join('\n')}

## Optional assets
${manifest.assets
  .filter((a) => !a.required)
  .map((a) => `- ${a.filename} — ${a.alt}`)
  .join('\n')}

## Accessibility
- Alt text required for every informative image
- Captions when diagrams need explanation
- Descriptive filenames only

## Notes from plan
${brief.imageRequirements.notes}
`;
}

export function generateImagePrompts(brief: ArticleBrief): string {
  return `# Image Prompts — ${brief.workingTitle}

Use these prompts for design or AI generation. Do not invent NovaLikes logos that violate brand guidelines.

## Featured image (1600×900)
Editorial Learn cover about “${brief.workingTitle}”. Clean composition, title-safe center, NovaLikes brand colors, no fake UI screenshots of private data, no clickbait faces.

## Social / OG image (1200×630)
Crop-friendly social share graphic for “${brief.workingTitle}”. High contrast headline area, minimal text, platform: ${brief.platform}.

## Twitter/X image (1200×675)
Same concept as OG with slightly taller crop for X.

## Infographic (optional)
Simple ${brief.platform} growth process: ${brief.proposedH2s.slice(0, 4).join(' → ')}. Flat vector, accessible labels.

## Comparison graphic (optional)
Honest comparison layout for concepts in: ${brief.keyTakeaways[0] ?? brief.workingTitle}. No fabricated statistics.

## Timeline (optional)
Timeline of practical steps answering: ${brief.coreQuestion}
`;
}

export function validateImageAssets(
  manifest: ImageManifest,
  options: { existingFilenames?: string[] } = {},
): AssetValidationIssue[] {
  const issues: AssetValidationIssue[] = [];
  const names = new Set<string>();

  for (const asset of manifest.assets) {
    if (names.has(asset.filename)) {
      issues.push({
        severity: 'blocker',
        code: 'duplicate_filename',
        field: asset.filename,
        message: `Duplicate image filename "${asset.filename}".`,
      });
    }
    names.add(asset.filename);

    if (!asset.alt.trim()) {
      issues.push({
        severity: 'blocker',
        code: 'missing_alt',
        field: asset.filename,
        message: `Alt text required for "${asset.filename}".`,
      });
    }

    const expected =
      asset.role === 'featured'
        ? STANDARDS.featured
        : asset.role === 'og'
          ? STANDARDS.openGraph
          : asset.role === 'twitter'
            ? STANDARDS.twitter
            : null;
    if (expected && (asset.width !== expected.width || asset.height !== expected.height)) {
      issues.push({
        severity: 'error',
        code: 'dimension_mismatch',
        field: asset.filename,
        message: `${asset.filename} must be ${expected.width}×${expected.height}.`,
      });
    }

    if (asset.required && asset.status === 'missing') {
      issues.push({
        severity: 'error',
        code: 'missing_required_asset',
        field: asset.filename,
        message: `Required image asset missing: ${asset.filename}.`,
      });
    }
  }

  const existing = new Set(options.existingFilenames ?? []);
  for (const asset of manifest.assets.filter((a) => a.required)) {
    if (existing.size > 0 && !existing.has(asset.filename)) {
      issues.push({
        severity: 'warning',
        code: 'file_not_on_disk',
        field: asset.filename,
        message: `Planned file not found on disk yet: ${asset.filename}.`,
      });
    }
  }

  return issues;
}
