import { CRAWLER_UA } from '@/lib/tools/config';
import { SafeFetchError, safeFetch } from '@/lib/tools/fetch';
import { metaContent } from '@/lib/tools/html';
import { normalizeExternalInput } from '@/lib/tools/normalize';
import { TOOL_MEDIA_SUFFIXES, TOOL_PAGE_HOSTS } from '@/lib/tools/platforms';
import { assertAllowedMediaHost, assertAllowedPageHost, parseHttpUrl } from '@/lib/tools/ssrf';
import type { ExtractorResponse, NormalizedMedia, NormalizedProfileResult } from '@/lib/tools/types';

const RESERVED = new Set([
  'video',
  'photo',
  'live',
  'explore',
  'discover',
  'foryou',
  'following',
  'friends',
  'inbox',
  'messages',
  'search',
  'login',
  'signup',
  'embed',
  't',
  'v',
]);

const USERNAME_RE = /^[A-Za-z0-9._]{2,24}$/;

export function normalizeTikTokUsername(raw: string): string | null {
  const trimmed = normalizeExternalInput(raw);
  if (!trimmed) return null;

  if (!/^https?:\/\//i.test(trimmed)) {
    const username = trimmed.replace(/^@/, '');
    if (!USERNAME_RE.test(username) || RESERVED.has(username.toLowerCase())) return null;
    return username;
  }

  const parsed = parseHttpUrl(trimmed);
  if (!parsed || !assertAllowedPageHost(parsed.hostname, TOOL_PAGE_HOSTS.tiktok)) {
    return null;
  }
  const match = parsed.url.pathname.match(/^\/@([A-Za-z0-9._]{2,24})\/?$/);
  const username = match?.[1];
  if (!username || RESERVED.has(username.toLowerCase())) return null;
  return username;
}

function displayNameFromTitle(title: string | undefined, username: string): string | undefined {
  if (!title) return undefined;
  const match = title.match(/^(.*?)\s+on TikTok$/i);
  const name = (match?.[1] ?? title).trim();
  if (!name || name.toLowerCase() === username.toLowerCase()) return undefined;
  return name;
}

function profileImageFromUrl(url: string, username: string): NormalizedMedia | undefined {
  const parsed = parseHttpUrl(url);
  if (!parsed || !assertAllowedMediaHost(parsed.hostname, TOOL_MEDIA_SUFFIXES.tiktok)) {
    return undefined;
  }
  return {
    url: parsed.url.toString(),
    format: 'jpg',
    contentType: 'image/jpeg',
    filename: `${username}-profile.jpg`,
  };
}

export async function extractTikTokProfilePicture(
  rawInput: string,
): Promise<ExtractorResponse<NormalizedProfileResult>> {
  const username = normalizeTikTokUsername(rawInput);
  if (!username) {
    return { ok: false, code: 'invalid_url' };
  }

  const profileUrl = `https://www.tiktok.com/@${username}`;
  try {
    const page = await safeFetch({
      url: profileUrl,
      purpose: 'page',
      allowedHosts: TOOL_PAGE_HOSTS.tiktok,
      userAgent: CRAWLER_UA,
      referer: 'https://www.tiktok.com/',
    });
    const html = page.body.toString('utf8');
    const image = metaContent(html, 'og:image');
    const title = metaContent(html, 'og:title');
    const profileImage = image ? profileImageFromUrl(image, username) : undefined;

    if (!profileImage) {
      if (html.length < 20_000 && !html.includes('__UNIVERSAL_DATA_FOR_REHYDRATION__')) {
        return { ok: false, code: 'platform_blocked' };
      }
      return { ok: false, code: 'not_found' };
    }

    return {
      ok: true,
      userAgent: CRAWLER_UA,
      result: {
        kind: 'profile_image',
        platform: 'tiktok',
        originalUrl: profileUrl,
        username,
        displayName: displayNameFromTitle(title, username),
        profileUrl,
        profileImage,
      },
    };
  } catch (error) {
    if (error instanceof SafeFetchError) {
      return { ok: false, code: error.code };
    }
    return { ok: false, code: 'not_found' };
  }
}
