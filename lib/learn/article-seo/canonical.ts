/**
 * Article canonical URLs — Document 15.07.
 */

import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';
import {
  buildCanonicalUrl,
  normalizeCanonicalPath,
} from '@/lib/seo/metadata/canonical';
import type { ArticleSeoIssue } from '@/types/learn-article-seo';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Build self-referencing canonical for a Learn article slug.
 * Always https://novalikes.com/learn/{slug} with lowercase slug.
 */
export function buildArticleCanonical(slug: string): string {
  const clean = slug.trim().toLowerCase();
  const path = normalizeCanonicalPath(`/learn/${clean}`);
  return buildCanonicalUrl(path);
}

export function validateArticleCanonical(
  slug: string,
  canonicalPathOrUrl?: string,
): ArticleSeoIssue[] {
  const issues: ArticleSeoIssue[] = [];
  const expected = buildArticleCanonical(slug);

  if (!slug.trim() || !SLUG_PATTERN.test(slug.trim().toLowerCase())) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_slug',
      field: 'slug',
      message: 'Article slug must be lowercase kebab-case.',
      slug,
    });
  }

  if (!canonicalPathOrUrl) {
    issues.push({
      severity: 'blocker',
      code: 'missing_canonical',
      field: 'canonicalPath',
      message: 'Canonical is required.',
      slug,
    });
    return issues;
  }

  const raw = canonicalPathOrUrl.trim();
  if (/[?#]/.test(raw)) {
    issues.push({
      severity: 'blocker',
      code: 'canonical_has_query_or_fragment',
      field: 'canonicalPath',
      message: 'Canonical must not include query parameters or fragments.',
      slug,
    });
  }

  const resolved = raw.startsWith('http')
    ? raw.replace(/\/$/, '')
    : buildCanonicalUrl(raw);

  if (!resolved.startsWith('https://')) {
    issues.push({
      severity: 'blocker',
      code: 'canonical_not_https',
      field: 'canonicalPath',
      message: 'Canonical must use HTTPS.',
      slug,
    });
  }

  if (!resolved.startsWith(SEO_PRODUCTION_DOMAIN)) {
    issues.push({
      severity: 'blocker',
      code: 'canonical_wrong_host',
      field: 'canonicalPath',
      message: `Canonical host must be ${SEO_PRODUCTION_DOMAIN}.`,
      slug,
    });
  }

  if (resolved !== expected) {
    const pathOnly = resolved.replace(SEO_PRODUCTION_DOMAIN, '');
    if (
      pathOnly === '/learn' ||
      pathOnly.startsWith('/learn/') === false ||
      pathOnly === '/'
    ) {
      issues.push({
        severity: 'blocker',
        code: 'canonical_not_self',
        field: 'canonicalPath',
        message:
          'Canonical must be self-referencing to /learn/{slug}, not Learn home, category, or unrelated routes.',
        slug,
      });
    } else if (pathOnly !== `/learn/${slug.trim().toLowerCase()}`) {
      issues.push({
        severity: 'blocker',
        code: 'canonical_mismatch',
        field: 'canonicalPath',
        message: `Canonical must equal ${expected}.`,
        slug,
      });
    }
  }

  return issues;
}
