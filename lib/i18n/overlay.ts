/**
 * Deep-overlay translations onto frozen English objects.
 * String fields must be provided for core pages; missing keys fail validation.
 *
 * Optional `$replaceArrays`: on an overlay object, list child array keys that
 * should fully replace the English array (length + entries) instead of the
 * default index-aligned merge. Overlay-only extra entries are accepted when
 * they are complete relative to their own structure.
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

/** Meta key — never copied into merged output. */
export const OVERLAY_REPLACE_ARRAYS_KEY = '$replaceArrays';

export type OverlayIssue = {
  path: string;
  message: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function readReplaceArrayKeys(overlay: Record<string, unknown>): Set<string> {
  const raw = overlay[OVERLAY_REPLACE_ARRAYS_KEY];
  if (!Array.isArray(raw)) return new Set();
  return new Set(raw.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0));
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
    const replaceKeys = readReplaceArrayKeys(source);
    const result: Record<string, unknown> = { ...english };

    for (const [key, child] of Object.entries(english)) {
      if (SKIP_OVERLAY_KEYS.has(key) || key === OVERLAY_REPLACE_ARRAYS_KEY) {
        result[key] = child;
        continue;
      }

      const childPath = path ? `${path}.${key}` : key;

      if (Array.isArray(child) && replaceKeys.has(key)) {
        result[key] = walkReplacingArray(child, source[key], childPath, issues);
        continue;
      }

      result[key] = walk(child, source[key], childPath, issues);
    }

    return result;
  }

  return english;
}

/**
 * Replace-mode array merge: overlay length wins.
 * - Shared indexes deep-merge against the English entry (same as normal overlay).
 * - Extra overlay entries are validated against themselves (authoritative market rows).
 */
function walkReplacingArray(
  english: unknown[],
  overlay: unknown,
  path: string,
  issues: OverlayIssue[],
): unknown[] {
  if (!Array.isArray(overlay)) {
    issues.push({ path, message: 'Expected replacement array' });
    return english;
  }

  return overlay.map((item, index) => {
    const itemPath = `${path}[${index}]`;
    if (index < english.length) {
      return walk(english[index], item, itemPath, issues);
    }
    // Market-only row: overlay must be self-complete.
    return walk(item, item, itemPath, issues);
  });
}
