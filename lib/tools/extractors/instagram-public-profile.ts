import { CRAWLER_UA } from '@/lib/tools/config';
import { getCached, setCached, TOOL_CACHE_TTL } from '@/lib/tools/cache';
import { SafeFetchError, safeFetch } from '@/lib/tools/fetch';
import { metaContent } from '@/lib/tools/html';
import { normalizeExternalInput } from '@/lib/tools/normalize';
import { TOOL_MEDIA_SUFFIXES, TOOL_PAGE_HOSTS } from '@/lib/tools/platforms';
import { assertAllowedMediaHost, assertAllowedPageHost, parseHttpUrl } from '@/lib/tools/ssrf';
import type { ExtractorFailure, NormalizedMedia } from '@/lib/tools/types';

const RESERVED = new Set([
  'p',
  'reel',
  'reels',
  'stories',
  'tv',
  'accounts',
  'about',
  'legal',
  'developer',
  'directory',
  'explore',
  'lite',
  'web',
  'api',
  'graphql',
]);

const USERNAME_RE = /^[A-Za-z0-9._]{1,30}$/;
const PROFILE_TAIL = new Set(['reels', 'tagged', 'followers', 'following', 'feed', 'saved']);
const OG_STATS_RE =
  /([\d.\u00a0\u202f,]+(?:[KMBkmb])?)\s+Followers(?:\s*,\s*([\d.\u00a0\u202f,]+(?:[KMBkmb])?)\s+Following)?(?:\s*,\s*([\d.\u00a0\u202f,]+(?:[KMBkmb])?)\s+Posts)?/i;

export type InstagramPublicProfile = {
  username: string;
  displayName?: string;
  profileUrl: string;
  profileImage?: NormalizedMedia;
  bio?: string;
  followersLabel?: string;
  followingLabel?: string;
  postsLabel?: string;
  followers?: number;
  following?: number;
  postCount?: number;
  fetchedAt: string;
};

export type InstagramPublicProfileResponse =
  | { ok: true; userAgent: string; profile: InstagramPublicProfile }
  | ExtractorFailure;

export function normalizeInstagramUsername(raw: string): string | null {
  const trimmed = normalizeExternalInput(raw);
  if (!trimmed) return null;

  if (!/^https?:\/\//i.test(trimmed)) {
    const username = trimmed.replace(/^@/, '');
    if (!USERNAME_RE.test(username) || RESERVED.has(username.toLowerCase())) return null;
    return username;
  }

  const parsed = parseHttpUrl(trimmed);
  if (!parsed) return null;
  if (!assertAllowedPageHost(parsed.hostname, TOOL_PAGE_HOSTS.instagram)) {
    return null;
  }
  const parts = parsed.url.pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length > 2) return null;
  if (parts.length === 2 && !PROFILE_TAIL.has(parts[1]!.toLowerCase())) return null;
  const username = parts[0] ?? '';
  if (!USERNAME_RE.test(username) || RESERVED.has(username.toLowerCase())) return null;
  return username;
}

export function parseExactCount(raw: string): number | undefined {
  const normalized = raw.replace(/[\u00a0\u202f]/g, '').trim();
  if (/^[\d,]+$/.test(normalized)) {
    const value = Number(normalized.replace(/,/g, ''));
    return Number.isFinite(value) ? value : undefined;
  }
  if (/^\d{1,3}(\.\d{3})+$/.test(normalized)) {
    const value = Number(normalized.replace(/\./g, ''));
    return Number.isFinite(value) ? value : undefined;
  }
  return undefined;
}

export function parseInstagramOgStats(description: string | undefined): {
  followersLabel?: string;
  followingLabel?: string;
  postsLabel?: string;
  followers?: number;
  following?: number;
  postCount?: number;
} {
  if (!description) return {};
  const match = description.match(OG_STATS_RE);
  if (!match) return {};
  return {
    followersLabel: match[1],
    followingLabel: match[2],
    postsLabel: match[3],
    followers: parseExactCount(match[1] ?? ''),
    following: parseExactCount(match[2] ?? ''),
    postCount: parseExactCount(match[3] ?? ''),
  };
}

export function parseInstagramDisplayName(title: string | undefined): {
  displayName?: string;
  username?: string;
} {
  if (!title) return {};
  const match = title.match(/^(.*?)\s*\(@([A-Za-z0-9._]+)\)/);
  if (match) {
    return {
      displayName: match[1]?.trim() || undefined,
      username: match[2],
    };
  }
  return { displayName: title.trim() || undefined };
}

export function parseInstagramBio(description: string | undefined): string | undefined {
  if (!description) return undefined;
  const match = description.match(/on Instagram:\s*"([\s\S]*?)"\s*$/);
  const bio = match?.[1]?.trim();
  return bio || undefined;
}

function profileImageFromUrl(url: string, username: string): NormalizedMedia | undefined {
  const parsedImage = parseHttpUrl(url);
  if (!parsedImage || !assertAllowedMediaHost(parsedImage.hostname, TOOL_MEDIA_SUFFIXES.instagram)) {
    return undefined;
  }
  return {
    url,
    format: url.includes('.png') ? 'png' : 'jpg',
    contentType: url.includes('.png') ? 'image/png' : 'image/jpeg',
    filename: `${username}-profile.jpg`,
  };
}

async function fetchInstagramPublicProfile(username: string): Promise<InstagramPublicProfileResponse> {
  const profileUrl = `https://www.instagram.com/${username}/`;
  try {
    const page = await safeFetch({
      url: profileUrl,
      purpose: 'page',
      allowedHosts: TOOL_PAGE_HOSTS.instagram,
      userAgent: CRAWLER_UA,
      referer: 'https://www.instagram.com/',
    });
    const html = page.body.toString('utf8');
    const image = metaContent(html, 'og:image');
    const title = metaContent(html, 'og:title');
    const ogDescription = metaContent(html, 'og:description');
    const description = metaContent(html, 'description');
    const names = parseInstagramDisplayName(title);
    const statsFromOg = parseInstagramOgStats(ogDescription);
    const stats = statsFromOg.followersLabel ? statsFromOg : parseInstagramOgStats(description);
    const profileImage = image ? profileImageFromUrl(image, username) : undefined;

    if (!profileImage && !stats.followersLabel && !names.displayName) {
      return { ok: false, code: 'not_found' };
    }

    return {
      ok: true,
      userAgent: CRAWLER_UA,
      profile: {
        username: names.username || username,
        displayName: names.displayName,
        profileUrl,
        profileImage,
        bio: parseInstagramBio(description),
        fetchedAt: new Date().toISOString(),
        ...stats,
      },
    };
  } catch (error) {
    if (error instanceof SafeFetchError) {
      return { ok: false, code: error.code };
    }
    return { ok: false, code: 'not_found' };
  }
}

export async function resolveInstagramPublicProfile(
  rawInput: string,
): Promise<InstagramPublicProfileResponse> {
  const username = normalizeInstagramUsername(rawInput);
  if (!username) {
    return { ok: false, code: 'invalid_url' };
  }

  const cacheKey = `ig-public-profile:${username.toLowerCase()}`;
  const cached = getCached<InstagramPublicProfileResponse>(cacheKey);
  if (cached) return cached;

  const resolved = await fetchInstagramPublicProfile(username);
  if (resolved.ok) {
    setCached(cacheKey, resolved, TOOL_CACHE_TTL.profileSuccessMs);
  }
  return resolved;
}
