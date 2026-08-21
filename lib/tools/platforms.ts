import type { ToolPlatform, ToolSlug } from '@/lib/tools/types';

const TIKTOK_PAGE_HOSTS = [
  'tiktok.com',
  'www.tiktok.com',
  'm.tiktok.com',
  'vm.tiktok.com',
  'vt.tiktok.com',
] as const;

const INSTAGRAM_PAGE_HOSTS = ['instagram.com', 'www.instagram.com'] as const;

const FACEBOOK_PAGE_HOSTS = [
  'facebook.com',
  'www.facebook.com',
  'm.facebook.com',
  'web.facebook.com',
  'fb.watch',
  'www.fb.watch',
] as const;

const TIKTOK_MEDIA_SUFFIXES = ['tiktok.com', 'tiktokcdn.com', 'tiktokcdn-us.com', 'tiktokcdn-eu.com'] as const;

const INSTAGRAM_MEDIA_SUFFIXES = ['cdninstagram.com', 'fbcdn.net'] as const;

const FACEBOOK_MEDIA_SUFFIXES = ['fbcdn.net'] as const;

export const TOOL_PAGE_HOSTS: Record<ToolPlatform, readonly string[]> = {
  tiktok: TIKTOK_PAGE_HOSTS,
  instagram: INSTAGRAM_PAGE_HOSTS,
  facebook: FACEBOOK_PAGE_HOSTS,
};

export const TOOL_MEDIA_SUFFIXES: Record<ToolPlatform, readonly string[]> = {
  tiktok: TIKTOK_MEDIA_SUFFIXES,
  instagram: INSTAGRAM_MEDIA_SUFFIXES,
  facebook: FACEBOOK_MEDIA_SUFFIXES,
};

export function platformForTool(slug: ToolSlug): ToolPlatform {
  if (slug.startsWith('tiktok-')) return 'tiktok';
  if (slug.startsWith('facebook-')) return 'facebook';
  return 'instagram';
}

export function isExactHost(hostname: string, allowed: readonly string[]): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return allowed.includes(host);
}

export function hostMatchesSuffix(hostname: string, suffixes: readonly string[]): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return suffixes.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
}
