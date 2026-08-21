import { browserUserAgent } from '@/lib/tools/config';
import { SafeFetchError, safeFetch } from '@/lib/tools/fetch';
import { asRecord, unescapeJsonishUrl } from '@/lib/tools/html';
import { normalizeExternalInput } from '@/lib/tools/normalize';
import { TOOL_PAGE_HOSTS } from '@/lib/tools/platforms';
import { parseHttpUrl, assertAllowedPageHost } from '@/lib/tools/ssrf';
import type {
  ExtractorResponse,
  NormalizedMedia,
  NormalizedVideoResult,
} from '@/lib/tools/types';

const VIDEO_ID_RE = /^[0-9]{5,32}$/;

function tiktokVideoIdFromPath(pathname: string): string | null {
  const match =
    pathname.match(/\/video\/(\d+)/) ||
    pathname.match(/\/v\/(\d+)/) ||
    pathname.match(/^\/(\d+)\.html$/);
  return match?.[1] && VIDEO_ID_RE.test(match[1]) ? match[1] : null;
}

export function parseTikTokInput(raw: string): { url: URL; kind: 'video' | 'short' } | null {
  const parsed = parseHttpUrl(normalizeExternalInput(raw));
  if (!parsed) return null;
  if (!assertAllowedPageHost(parsed.hostname, TOOL_PAGE_HOSTS.tiktok)) {
    return null;
  }
  const host = parsed.hostname;
  const path = parsed.url.pathname;
  if (/\/photo\//i.test(path)) return null;
  if (host === 'vm.tiktok.com' || host === 'vt.tiktok.com') {
    const code = path.replace(/\/+$/, '').split('/').filter(Boolean)[0];
    if (!code || code.length < 4 || code.length > 32) return null;
    return { url: parsed.url, kind: 'short' };
  }
  if (path.startsWith('/t/')) {
    const code = path.slice(3).replace(/\/+$/, '').split('/')[0] ?? '';
    if (!code || code.length < 4 || code.length > 32) return null;
    return { url: parsed.url, kind: 'short' };
  }
  if (tiktokVideoIdFromPath(path)) {
    return { url: parsed.url, kind: 'video' };
  }
  return null;
}

function readItemStruct(data: unknown): Record<string, unknown> | null {
  const root = asRecord(data);
  const scope = asRecord(root?.__DEFAULT_SCOPE__);
  const detail = asRecord(scope?.['webapp.video-detail']);
  const itemInfo = asRecord(detail?.itemInfo);
  return asRecord(itemInfo?.itemStruct);
}

function qualityFromGear(gear: string | undefined): string | undefined {
  if (!gear) return undefined;
  const match = gear.match(/(\d{3,4})/);
  return match ? `${match[1]}p` : gear;
}

function collectMedia(item: Record<string, unknown>): NormalizedMedia[] {
  const video = asRecord(item.video);
  if (!video) return [];
  const media: NormalizedMedia[] = [];
  const seen = new Set<string>();

  const bitrateInfo = Array.isArray(video.bitrateInfo) ? video.bitrateInfo : [];
  for (const entry of bitrateInfo) {
    const record = asRecord(entry);
    if (!record) continue;
    const playAddr = asRecord(record.PlayAddr) ?? asRecord(record.playAddr);
    const list = playAddr?.UrlList ?? playAddr?.urlList;
    const first = Array.isArray(list) ? list.find((itemUrl) => typeof itemUrl === 'string') : undefined;
    if (typeof first !== 'string' || !first.startsWith('http')) continue;
    const url = unescapeJsonishUrl(first);
    if (seen.has(url)) continue;
    seen.add(url);
    const gear = firstStringLike(record.GearName, record.gearName, record.quality);
    media.push({
      url,
      quality: qualityFromGear(typeof gear === 'string' ? gear : undefined),
      format: 'mp4',
      width: asNumber(playAddr?.Width ?? playAddr?.width ?? record.width),
      height: asNumber(playAddr?.Height ?? playAddr?.height ?? record.height),
      contentType: 'video/mp4',
      filename: 'tiktok-video.mp4',
    });
  }

  const playAddr = typeof video.playAddr === 'string' ? unescapeJsonishUrl(video.playAddr) : '';
  if (playAddr.startsWith('http') && !seen.has(playAddr)) {
    media.unshift({
      url: playAddr,
      format: 'mp4',
      width: asNumber(video.width),
      height: asNumber(video.height),
      contentType: 'video/mp4',
      filename: 'tiktok-video.mp4',
    });
  }

  return uniqueVideoMedia(media);
}

function uniqueVideoMedia(media: NormalizedMedia[]): NormalizedMedia[] {
  const sorted = [...media].sort((a, b) => (b.height ?? 0) - (a.height ?? 0));
  const seenQuality = new Set<string>();
  const result: NormalizedMedia[] = [];
  for (const item of sorted) {
    const key = item.quality || `${item.width ?? 'u'}x${item.height ?? 'u'}`;
    if (seenQuality.has(key)) continue;
    seenQuality.add(key);
    result.push(item);
  }
  return result.length ? result : media;
}

function firstStringLike(...values: unknown[]): unknown {
  return values.find((value) => typeof value === 'string' && value.trim());
}

function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;
}

export function tiktokLooksBlocked(html: string): boolean {
  if (!html.trim()) return true;
  if (html.length < 20_000 && !html.includes('__UNIVERSAL_DATA_FOR_REHYDRATION__')) return true;
  return /captcha|_waf|verify\/|unusual traffic|access denied|please wait/i.test(html.slice(0, 12_000));
}

function thumbnailFromItem(item: Record<string, unknown>): string | undefined {
  const video = asRecord(item.video);
  const cover = firstStringLike(video?.cover, video?.originCover, video?.dynamicCover);
  return typeof cover === 'string' && cover.startsWith('http') ? unescapeJsonishUrl(cover) : undefined;
}

export async function extractTikTokVideo(rawInput: string): Promise<ExtractorResponse<NormalizedVideoResult>> {
  const parsed = parseTikTokInput(rawInput);
  if (!parsed) {
    return { ok: false, code: 'invalid_url' };
  }

  try {
    const page = await safeFetch({
      url: parsed.url.toString(),
      purpose: 'page',
      allowedHosts: TOOL_PAGE_HOSTS.tiktok,
      userAgent: browserUserAgent(),
      referer: 'https://www.tiktok.com/',
    });

    const html = page.body.toString('utf8');
    if (tiktokLooksBlocked(html)) {
      return { ok: false, code: 'platform_blocked' };
    }
    const script = html.match(
      /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/,
    );
    if (!script?.[1]) {
      return { ok: false, code: 'platform_blocked' };
    }

    let data: unknown;
    try {
      data = JSON.parse(script[1]);
    } catch {
      return { ok: false, code: 'platform_blocked' };
    }

    const item = readItemStruct(data);
    const scope = asRecord(asRecord(data)?.__DEFAULT_SCOPE__);
    const detail = asRecord(scope?.['webapp.video-detail']);
    const statusCode = asNumber(detail?.statusCode);
    if (statusCode && statusCode !== 0) {
      return { ok: false, code: 'private_or_unavailable' };
    }
    if (!item) {
      if (/login|log in|signup/i.test(html.slice(0, 8000))) {
        return { ok: false, code: 'private_or_unavailable' };
      }
      return { ok: false, code: 'not_found' };
    }

    const media = collectMedia(item);
    if (!media.length) {
      return { ok: false, code: 'media_not_exposed' };
    }

    const author = asRecord(item.author);
    const title = typeof item.desc === 'string' && item.desc.trim() ? item.desc.trim() : undefined;
    const authorName =
      (typeof author?.uniqueId === 'string' && author.uniqueId) ||
      (typeof author?.nickname === 'string' && author.nickname) ||
      undefined;
    const video = asRecord(item.video);

    return {
      ok: true,
      cookies: page.cookies,
      userAgent: browserUserAgent(),
      result: {
        kind: 'video',
        platform: 'tiktok',
        originalUrl: page.url,
        title,
        author: authorName,
        thumbnail: thumbnailFromItem(item),
        duration: asNumber(video?.duration),
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
