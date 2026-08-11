/**
 * Link QA (internal + external) — Document 15.09.
 */

import { validateArticleLinks } from '@/lib/learn/article/template';
import type { QAIssue } from '@/types/learn-qa';
import type { QAArticleSource } from '@/lib/learn/qa/text';

export function validateLinks(article: QAArticleSource): QAIssue[] {
  const issues: QAIssue[] = [];

  const hasInternal =
    article.relatedServices.length > 0 ||
    Boolean(article.serviceCta) ||
    article.blocks.some(
      (block) =>
        block.type === 'internal_cta' ||
        block.type === 'related_service_card' ||
        (block.type === 'paragraph' && /\]\(\//.test(block.text)),
    );

  if (!hasInternal) {
    issues.push({
      severity: 'blocker',
      area: 'links',
      code: 'missing_internal_links',
      field: 'relatedServices',
      message: 'Article must include at least one internal link or related service.',
    });
  }

  for (const issue of validateArticleLinks(article)) {
    const severity =
      issue.code === 'invalid_link' || issue.code === 'invalid_service'
        ? 'blocker'
        : 'error';
    issues.push({
      severity,
      area: 'links',
      code: issue.code,
      field: issue.field,
      message: issue.detail ?? 'Link validation failed.',
    });
  }

  for (const block of article.blocks) {
    if (block.type === 'internal_cta') {
      if (!block.href.trim()) {
        issues.push({
          severity: 'blocker',
          area: 'links',
          code: 'empty_href',
          field: block.id,
          message: 'Internal CTA href is empty.',
        });
      } else if (block.href.startsWith('http://')) {
        issues.push({
          severity: 'blocker',
          area: 'links',
          code: 'insecure_external_link',
          field: block.id,
          message: 'External links must use HTTPS — http:// is blocked.',
        });
      } else if (
        block.href.startsWith('https://') &&
        !block.href.startsWith('https://novalikes.com')
      ) {
        // External https is allowed; flag missing descriptive label only.
        if (block.label.trim().length < 3) {
          issues.push({
            severity: 'warning',
            area: 'links',
            code: 'weak_external_anchor',
            field: block.id,
            message: 'External link label should be descriptive.',
          });
        }
      }
    }

    if (
      (block.type === 'image' || block.type === 'figure') &&
      block.image.sourceUrl?.startsWith('http://')
    ) {
      issues.push({
        severity: 'blocker',
        area: 'links',
        code: 'insecure_image_source',
        field: block.id,
        message: 'Image sourceUrl must not use insecure http://.',
      });
    }
  }

  return issues;
}
