/**
 * Deep-overlay translations onto frozen English objects.
 * String fields must be provided for core pages; missing keys fail validation.
 */

const SKIP_OVERLAY_KEYS = new Set([
  'src',
  'href',
  'id',
  'slug',
  'icon',
  'tone',
  'platform',
  'platformId',
  'width',
  'height',
  'packageIds',
  'faqIds',
  'testimonialIds',
  'serviceSlugs',
  'relatedServiceSlugs',
  'purpose',
  'primaryKeyword',
  'supportingKeywords',
  'suggestedWordCount',
  'keywords',
  'category',
  'order',
  'active',
  'homepageFilter',
  'anchor',
  'kind',
  'status',
  'inputType',
  'art',
  'heroArt',
  'editorialArt',
  'type',
  'path',
]);

export type OverlayIssue = {
  path: string;
  message: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function overlayEnglish<T>(english: T, overlay: unknown, basePath = ''): T {
  return overlayEnglishWithIssues(english, overlay, basePath).value;
}

export function overlayEnglishWithIssues<T>(
  english: T,
  overlay: unknown,
  basePath = '',
): { value: T; issues: OverlayIssue[] } {
  const issues: OverlayIssue[] = [];
  const value = walk(english, overlay, basePath, issues) as T;
  return { value, issues };
}

function walk(
  english: unknown,
  overlay: unknown,
  path: string,
  issues: OverlayIssue[],
): unknown {
  if (typeof english === 'string') {
    if (!english.trim()) return english;
    if (typeof overlay === 'string' && overlay.trim()) return overlay;
    issues.push({ path, message: 'Missing translated string' });
    return english;
  }

  if (typeof english === 'number' || typeof english === 'boolean' || english == null) {
    return english;
  }

  if (Array.isArray(english)) {
    if (english.length === 0) return english;
    if (!Array.isArray(overlay)) {
      issues.push({ path, message: 'Expected translated array' });
      return english;
    }
    return english.map((item, index) => walk(item, overlay[index], `${path}[${index}]`, issues));
  }

  if (isPlainObject(english)) {
    const source = overlay && isPlainObject(overlay) ? overlay : {};
    const result: Record<string, unknown> = { ...english };
    for (const [key, child] of Object.entries(english)) {
      if (SKIP_OVERLAY_KEYS.has(key)) {
        result[key] = child;
        continue;
      }
      result[key] = walk(child, source[key], path ? `${path}.${key}` : key, issues);
    }
    return result;
  }

  return english;
}
