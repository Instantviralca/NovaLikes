/**
 * Sitemap URL validation — Document 14.08.
 */

import { SEO_PRODUCTION_DOMAIN, seoSiteConfig } from '@/config/seo';
import type { SitemapUrlValidation } from '@/types/sitemap';

const REJECTED_HOST_FRAGMENTS = [
  'localhost',
  '127.0.0.1',
  'vercel.app',
  'vercel.dev',
  'netlify.app',
  'preview',
  'ngrok',
];

/**
 * Validate an absolute sitemap URL against production rules.
 */
export function validateSitemapUrl(url: string): SitemapUrlValidation {
  const trimmed = url.trim();

  if (!trimmed) {
    return { url: trimmed, valid: false, reason: 'Empty URL' };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { url: trimmed, valid: false, reason: 'Invalid URL syntax' };
  }

  if (parsed.protocol !== 'https:') {
    return { url: trimmed, valid: false, reason: 'Sitemap URLs must use HTTPS' };
  }

  const expectedHost = new URL(SEO_PRODUCTION_DOMAIN).host;
  if (parsed.host !== expectedHost) {
    return {
      url: trimmed,
      valid: false,
      reason: `Hostname must be ${expectedHost}, received ${parsed.host}`,
    };
  }

  const hostLower = parsed.host.toLowerCase();
  if (REJECTED_HOST_FRAGMENTS.some((fragment) => hostLower.includes(fragment))) {
    return {
      url: trimmed,
      valid: false,
      reason: 'Preview, localhost, or alternate hosts are not allowed',
    };
  }

  if (parsed.search) {
    return {
      url: trimmed,
      valid: false,
      reason: 'Query-string variants are not allowed in the sitemap',
    };
  }

  if (parsed.hash) {
    return {
      url: trimmed,
      valid: false,
      reason: 'Fragment variants are not allowed in the sitemap',
    };
  }

  const path = parsed.pathname;
  if (path !== '/' && path.endsWith('/')) {
    return {
      url: trimmed,
      valid: false,
      reason: 'Trailing-slash variants are not allowed (except homepage)',
    };
  }

  let decodedPath = path;
  try {
    decodedPath = decodeURI(path);
  } catch {
    decodedPath = path;
  }

  // ASCII letters in the visible path must be lowercase. Unicode slugs (Arabic)
  // and percent-encoding hex are allowed.
  if (/[A-Z]/.test(decodedPath)) {
    return {
      url: trimmed,
      valid: false,
      reason: 'Sitemap paths must be lowercase',
    };
  }

  // Ensure origin matches configured production domain
  if (seoSiteConfig.productionDomain.replace(/\/$/, '') !== SEO_PRODUCTION_DOMAIN) {
    return {
      url: trimmed,
      valid: false,
      reason: 'Configured production domain mismatch',
    };
  }

  return { url: trimmed, valid: true };
}
