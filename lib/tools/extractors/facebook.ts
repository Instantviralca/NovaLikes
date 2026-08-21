import { browserUserAgent } from '@/lib/tools/config';
import { SafeFetchError, safeFetch } from '@/lib/tools/fetch';
import { metaContent, unescapeJsonishUrl } from '@/lib/tools/html';
import { normalizeExternalInput } from '@/lib/tools/normalize';
import { TOOL_MEDIA_SUFFIXES, TOOL_PAGE_HOSTS } from '@/lib/tools/platforms';
import { assertAllowedMediaHost, assertAllowedPageHost, parseHttpUrl } from '@/lib/tools/ssrf';
import type { ExtractorResponse, NormalizedMedia, NormalizedVideoResult } from '@/lib/tools/types';

export type FacebookMediaKind = 'video' | 'reel' | 'either';

function isFacebookHost(hostname: string): boolean {
  return assertAllowedPageHost(hostname, TOOL_PAGE_HOSTS.facebook);
}

export function facebookLooksUnavailable(html: string): boolean {
  return /content isn'?t available|this video is no longer available|reel isn'?t available|page isn'?t available/i.test(
    html,
  );
}

export function parseFacebookInput(
  raw: string,
  expected?: Exclude<FacebookMediaKind, 'either'>,
): { url: URL; kind: FacebookMediaKind } | null {
  const parsed = parseHttpUrl(normalizeExternalInput(raw));
  if (!parsed || !isFacebookHost(parsed.hostname)) return null;

  const path = parsed.url.pathname;
  const host = parsed.hostname;
  const videoParam = parsed.url.searchParams.get('v');

  if (host === 'fb.watch' || host === 'www.fb.watch') {
    const code = path.replace(/\/+$/, '').split('/').filter(Boolean)[0];
    if (!code) return null;
    return { url: parsed.url, kind: 'either' };
  }

  let kind: FacebookMediaKind | null = null;
  if (/\/reel\/\d+/i.test(path) || /\/reels\/\d+/i.test(path) || /\/share\/r\//i.test(path)) {
    kind = 'reel';
  } else if (
    /\/videos\/\d+/i.test(path) ||
    /\/watch\/?$/i.test(path) ||
    /\/share\/v\//i.test(path) ||
    /\/video\.php$/i.test(path) ||
    (videoParam && /^\d{5,}$/.test(videoParam))
  ) {
    kind = 'video';
  }

  if (!kind) return null;
  if (expected && kind !== expected) {
    return { url: parsed.url, kind };
  }
  return { url: parsed.url, kind };
}

function allowedMediaUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  const url = unescapeJsonishUrl(raw);
  if (url.includes('rsrc.php')) return null;
  const parsed = parseHttpUrl(url);
  if (!parsed) return null;
  if (!assertAllowedMediaHost(parsed.hostname, TOOL_MEDIA_SUFFIXES.facebook)) return null;
  if (!/\.mp4(\?|$)/i.test(parsed.url.pathname) && !parsed.url.pathname.includes('/v/')) {
    if (!parsed.hostname.includes('fbcdn.net')) return null;
  }
  return parsed.url.toString();
}

export function collectFacebookMedia(html: string): NormalizedMedia[] {
  const media: NormalizedMedia[] = [];
  const seen = new Set<string>();
  const push = (url: string | null, quality?: string) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    media.push({
      url,
      quality,
      format: 'mp4',
      contentType: 'video/mp4',
      filename: 'facebook-video.mp4',
    });
  };

  const hd = html.match(/hd_src(?:_no_ratelimit)?["']?\s*[:=]\s*["']([^"']+)/);
  const sd = html.match(/sd_src(?:_no_ratelimit)?["']?\s*[:=]\s*["']([^"']+)/);
  push(allowedMediaUrl(hd?.[1]), 'hd');
  push(allowedMediaUrl(sd?.[1]), 'sd');

  for (const match of html.matchAll(/"browser_native_(hd|sd)_url"\s*:\s*"([^"]+)"/g)) {
    push(allowedMediaUrl(match[2]), match[1] === 'hd' ? 'hd' : 'sd');
  }
  for (const match of html.matchAll(/"playable_url(?:_quality_hd)?"\s*:\s*"([^"]+)"/g)) {
    push(allowedMediaUrl(match[1]));
  }

  return media;
}

export async function extractFacebookMedia(
  rawInput: string,
  expected: 'video' | 'reel',
): Promise<ExtractorResponse<NormalizedVideoResult>> {
  const parsed = parseFacebookInput(rawInput, expected);
  if (!parsed) {
    return { ok: false, code: 'invalid_url' };
  }
  if (parsed.kind !== expected && parsed.kind !== 'either') {
    return { ok: false, code: 'unsupported_url' };
  }

  const pluginUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(parsed.url.toString())}&show_text=false`;

  try {
    const plugin = await safeFetch({
      url: pluginUrl,
      purpose: 'page',
      allowedHosts: TOOL_PAGE_HOSTS.facebook,
      userAgent: browserUserAgent(),
      referer: 'https://www.facebook.com/',
    });
    let media = collectFacebookMedia(plugin.body.toString('utf8'));
    let sourceHtml = plugin.body.toString('utf8');
    let originalUrl = parsed.url.toString();

    if (!media.length) {
      if (facebookLooksUnavailable(sourceHtml)) {
        return { ok: false, code: 'private_or_unavailable' };
      }
      try {
        const page = await safeFetch({
          url: parsed.url.toString(),
          purpose: 'page',
          allowedHosts: TOOL_PAGE_HOSTS.facebook,
          userAgent: browserUserAgent(),
          referer: 'https://www.facebook.com/',
        });
        sourceHtml = page.body.toString('utf8');
        originalUrl = page.url;
        media = collectFacebookMedia(sourceHtml);
      } catch (error) {
        if (error instanceof SafeFetchError && error.code === 'too_large') {
          return { ok: false, code: 'too_large' };
        }
        throw error;
      }
    }

    if (!media.length) {
      if (facebookLooksUnavailable(sourceHtml) || /log in|login/i.test(sourceHtml.slice(0, 8000))) {
        return { ok: false, code: 'private_or_unavailable' };
      }
      return { ok: false, code: 'media_not_exposed' };
    }

    const title = metaContent(sourceHtml, 'og:title');
    const thumbnail = allowedMediaUrl(metaContent(sourceHtml, 'og:image')) ?? undefined;

    return {
      ok: true,
      userAgent: browserUserAgent(),
      result: {
        kind: 'video',
        platform: 'facebook',
        originalUrl,
        title,
        thumbnail,
        media,
      },
    };
  } catch (error) {
    if (error instanceof SafeFetchError) {
      return { ok: false, code: error.code };
    }
    return { ok: false, code: 'not_found' };
  }
}
