/**
 * Robots.txt rules — Document 14.08.
 */

import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';
import type { RobotsValidationReport, SitemapIssue } from '@/types/sitemap';

export type RobotsRuleSet = {
  userAgent: string;
  allow: string[];
  disallow: string[];
};

/** Required disallow paths for production robots.txt. */
export const ROBOTS_DISALLOW = [
  '/cart',
  '/checkout',
  '/order-success',
  '/admin/',
  '/author/',
  '/api/',
  '/preview/',
  '/draft/',
  '/search',
  '/track-order/result',
  '/learn/preview/',
] as const;

/**
 * Central robots directives — Document 14.08.
 * Does not block public CSS, JS, images, fonts, or rendering assets.
 */
export function getRobotsRules(): RobotsRuleSet[] {
  return [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: [...ROBOTS_DISALLOW],
    },
  ];
}

export function getSitemapUrl(): string {
  return `${SEO_PRODUCTION_DOMAIN}/sitemap.xml`;
}

export function validateRobotsRules(
  rules: RobotsRuleSet[] = getRobotsRules(),
  sitemapUrl: string = getSitemapUrl(),
): RobotsValidationReport {
  const issues: SitemapIssue[] = [];
  const primary = rules[0];

  if (!primary) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: 'No robots rules defined',
    });
    return {
      valid: false,
      issues,
      sitemapUrl,
      disallow: [],
    };
  }

  if (sitemapUrl !== `${SEO_PRODUCTION_DOMAIN}/sitemap.xml`) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: `Robots sitemap URL must be ${SEO_PRODUCTION_DOMAIN}/sitemap.xml`,
    });
  }

  for (const required of ROBOTS_DISALLOW) {
    if (!primary.disallow.includes(required)) {
      issues.push({
        kind: 'robots_misconfigured',
        detail: `Missing required disallow rule: ${required}`,
      });
    }
  }

  const blockedAssets = primary.disallow.filter((rule) =>
    ['/_next/', '/assets/', '/fonts/', '.css', '.js', '.png', '.jpg', '.webp'].some(
      (asset) => rule.includes(asset),
    ),
  );
  if (blockedAssets.length > 0) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: `Public rendering assets appear blocked: ${blockedAssets.join(', ')}`,
    });
  }

  if (!primary.allow.includes('/')) {
    issues.push({
      kind: 'robots_misconfigured',
      detail: 'Public root allow rule "/" is required',
    });
  }

  return {
    valid: issues.length === 0,
    issues,
    sitemapUrl,
    disallow: [...primary.disallow],
  };
}
