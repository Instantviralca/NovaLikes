import { getAdminSessionSecret, isProductionRuntime } from '@/lib/config/env';

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

export const CRAWLER_UA =
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';

export function browserUserAgent() {
  return BROWSER_UA;
}

export function toolsSigningSecret(): string {
  const dedicated = process.env.TOOLS_MEDIA_SECRET?.trim();
  if (dedicated) return dedicated;
  const session = getAdminSessionSecret();
  if (session) return session;
  if (isProductionRuntime()) {
    throw new Error(
      'TOOLS_MEDIA_SECRET or IV_ADMIN_SESSION_SECRET is required in production.',
    );
  }
  return 'novalikes-local-tools-media-secret';
}

export const TOOL_TIMEOUTS = {
  pageMs: 12_000,
  mediaMs: 25_000,
} as const;

export const TOOL_LIMITS = {
  pageBytes: 3_000_000,
  mediaBytes: 80_000_000,
  maxRedirects: 4,
} as const;
