import { CRAWLER_UA, browserUserAgent } from '@/lib/tools/config';
import { SafeFetchError, safeFetch } from '@/lib/tools/fetch';
import { metaContent, unescapeJsonishUrl } from '@/lib/tools/html';
import { normalizeExternalInput } from '@/lib/tools/normalize';
import { TOOL_MEDIA_SUFFIXES, TOOL_PAGE_HOSTS } from '@/lib/tools/platforms';
import { assertAllowedMediaHost, assertAllowedPageHost, parseHttpUrl } from '@/lib/tools/ssrf';
import type { ExtractorResponse, NormalizedMedia, NormalizedVideoResult } from '@/lib/tools/types';

const SHORTCODE_RE = /^[A-Za-z0-9_-]{5,20}$/;

export function parseInstagramMediaInput(raw: string): { url: URL; shortcode: string } | null {
  const parsed = parseHttpUrl(normalizeExternalInput(raw));
  if (!parsed) return null;
  if (!assertAllowedPageHost(parsed.hostname, TOOL_PAGE_HOSTS.instagram)) {
    return null;
  }
  const match = parsed.url.pathname.match(/^\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/i);
  if (!match?.[2] || !SHORTCODE_RE.test(match[2])) return null;
  return { url: parsed.url, shortcode: match[2] };
}

function allowedMediaUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  const url = unescapeJsonishUrl(raw);
  const parsed = parseHttpUrl(url);
  if (!parsed) return null;
  if (!assertAllowedMediaHost(parsed.hostname, TOOL_MEDIA_SUFFIXES.instagram)) return null;
  return parsed.url.toString();
}

export function instagramLooksUnavailable(html: string): boolean {
  return /sorry, this page isn'?t available|this page isn'?t available|content isn'?t available|login to continue/i.test(
    html,
  );
}

export function instagramLooksBlocked(html: string): boolean {
  if (!html.trim()) return true;
  return (
    html.length < 12_000 &&
    !/og:title|og:image|og:video/i.test(html)
  );
}

export function classifyInstagramVideoFailure(html: string): 'private_or_unavailable' | 'platform_blocked' | 'media_not_exposed' {
  if (instagramLooksUnavailable(html)) return 'private_or_unavailable';
  if (instagramLooksBlocked(html)) return 'platform_blocked';
  if (metaContent(html, 'og:title') || metaContent(html, 'og:image')) return 'media_not_exposed';
  return 'platform_blocked';
}

function collectFromHtml(html: string): NormalizedMedia[] {
  const media: NormalizedMedia[] = [];
  const seen = new Set<string>();
  const push = (url: string | null) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    media.push({
      url,
      format: 'mp4',
      contentType: 'video/mp4',
      filename: 'instagram-video.mp4',
    });
  };

  push(allowedMediaUrl(metaContent(html, 'og:video')));
  push(allowedMediaUrl(metaContent(html, 'og:video:secure_url')));

  for (const match of html.matchAll(/"video_url"\s*:\s*"([^"]+)"/g)) {
    push(allowedMediaUrl(match[1]));
  }

  return media;
}

export async function extractInstagramVideo(
  rawInput: string,
): Promise<ExtractorResponse<NormalizedVideoResult>> {
  const parsed = parseInstagramMediaInput(rawInput);
  if (!parsed) {
    return { ok: false, code: 'invalid_url' };
  }

  const pathKind = parsed.url.pathname.match(/^\/(p|reel|reels|tv)\//i)?.[1]?.toLowerCase() ?? 'reel';
  const pagePath = pathKind === 'reels' ? 'reel' : pathKind;
  const pageUrl = `https://www.instagram.com/${pagePath}/${parsed.shortcode}/`;
  const candidates = [
    { url: pageUrl, ua: CRAWLER_UA },
    { url: `https://www.instagram.com/p/${parsed.shortcode}/embed/captioned/`, ua: browserUserAgent() },
  ];

  try {
    let lastHtml = '';
    let sawPublicPage = false;
    for (const candidate of candidates) {
      const page = await safeFetch({
        url: candidate.url,
        purpose: 'page',
        allowedHosts: TOOL_PAGE_HOSTS.instagram,
        userAgent: candidate.ua,
        referer: 'https://www.instagram.com/',
      });
      const html = page.body.toString('utf8');
      lastHtml = html;
      const media = collectFromHtml(html);
      if (media.length) {
        const title = metaContent(html, 'og:title');
        const thumbnail = allowedMediaUrl(metaContent(html, 'og:image')) ?? undefined;
        return {
          ok: true,
          userAgent: candidate.ua,
          result: {
            kind: 'video',
            platform: 'instagram',
            originalUrl: pageUrl,
            title,
            thumbnail,
            media,
          },
        };
      }
      if (instagramLooksUnavailable(html)) {
        return { ok: false, code: 'private_or_unavailable' };
      }
      if (metaContent(html, 'og:title') || metaContent(html, 'og:image')) {
        sawPublicPage = true;
      }
    }

    if (sawPublicPage) {
      return { ok: false, code: 'media_not_exposed' };
    }
    return { ok: false, code: classifyInstagramVideoFailure(lastHtml) };
  } catch (error) {
    if (error instanceof SafeFetchError) {
      return { ok: false, code: error.code };
    }
    return { ok: false, code: 'platform_blocked' };
  }
}
