import { describe, expect, it } from 'vitest';

import { TOOLS } from '@/data/tools/registry';
import { getCached, resetToolCache, setCached, TOOL_CACHE_TTL } from '@/lib/tools/cache';
import { toFailureCategory } from '@/lib/tools/categories';
import { getToolHealthSummary, recordToolDiagnostic, resetToolDiagnostics } from '@/lib/tools/diagnostics';
import { collectFacebookMedia, facebookLooksUnavailable } from '@/lib/tools/extractors/facebook';
import { classifyInstagramVideoFailure } from '@/lib/tools/extractors/instagram-video';
import { tiktokLooksBlocked } from '@/lib/tools/extractors/tiktok';
import { signMediaToken, verifyMediaToken } from '@/lib/tools/media-token';
import {
  DOWNLOAD_LIMIT,
  EXTRACT_LIMIT,
  consumeDownloadLimit,
  consumeExtractLimit,
  resetToolRateLimits,
} from '@/lib/tools/rate-limit';

describe('normalized error categories', () => {
  it('maps public codes to stable internal categories', () => {
    expect(toFailureCategory('invalid_url')).toBe('invalid_input');
    expect(toFailureCategory('private_or_unavailable')).toBe('private_or_restricted');
    expect(toFailureCategory('download_unavailable')).toBe('expired_token');
    expect(toFailureCategory('media_not_exposed')).toBe('media_not_exposed');
    expect(toFailureCategory('platform_blocked')).toBe('platform_blocked');
  });
});

describe('TikTok challenge detection', () => {
  it('treats empty and challenge pages as blocked before JSON parsing', () => {
    expect(tiktokLooksBlocked('')).toBe(true);
    expect(tiktokLooksBlocked('<html>please wait</html>')).toBe(true);
    expect(
      tiktokLooksBlocked(
        `<html>${'x'.repeat(30_000)}<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__">{}</script></html>`,
      ),
    ).toBe(false);
  });
});

describe('Facebook HD/SD collection', () => {
  it('keeps HD when SD is missing and SD when HD is missing', () => {
    const hdOnly = collectFacebookMedia(
      `hd_src:"https://video.xx.fbcdn.net/v/item-hd.mp4"`,
    );
    expect(hdOnly.map((item) => item.quality)).toEqual(['hd']);
    const sdOnly = collectFacebookMedia(
      `sd_src:"https://video.xx.fbcdn.net/v/item-sd.mp4"`,
    );
    expect(sdOnly.map((item) => item.quality)).toEqual(['sd']);
    expect(facebookLooksUnavailable("This content isn't available")).toBe(true);
    expect(facebookLooksUnavailable('<html>public player</html>')).toBe(false);
  });
});

describe('Instagram no-video-exposed classification', () => {
  it('distinguishes removed pages from public pages without a video file', () => {
    expect(classifyInstagramVideoFailure("Sorry, this page isn't available.")).toBe(
      'private_or_unavailable',
    );
    expect(
      classifyInstagramVideoFailure(
        '<html><meta property="og:title" content="Video by nasa" /><meta property="og:image" content="https://example.com/x.jpg" /></html>',
      ),
    ).toBe('media_not_exposed');
    expect(classifyInstagramVideoFailure('<html></html>')).toBe('platform_blocked');
  });
});

describe('signed download tokens', () => {
  it('rejects expired and tampered tokens', () => {
    const expired = signMediaToken({
      url: 'https://v16-webapp-prime.tiktok.com/video/tos/item.mp4',
      platform: 'tiktok',
      filename: 'tiktok-video.mp4',
      exp: Math.floor(Date.now() / 1000) - 30,
    });
    expect(verifyMediaToken(expired)).toBeNull();

    const valid = signMediaToken({
      url: 'https://v16-webapp-prime.tiktok.com/video/tos/item.mp4',
      platform: 'tiktok',
      filename: 'tiktok-video.mp4',
    });
    expect(verifyMediaToken(valid)).not.toBeNull();
    expect(verifyMediaToken(`${valid.slice(0, -2)}aa`)).toBeNull();

    const [encoded, signature] = valid.split('.');
    const json = JSON.parse(Buffer.from(encoded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    json.url = 'https://example.com/stolen.mp4';
    const rewritten = `${Buffer.from(JSON.stringify(json)).toString('base64url')}.${signature}`;
    expect(verifyMediaToken(rewritten)).toBeNull();
  });
});

describe('rate limit response', () => {
  it('allows a normal burst then returns not allowed', () => {
    resetToolRateLimits();
    for (let i = 0; i < EXTRACT_LIMIT; i += 1) {
      expect(consumeExtractLimit('198.51.100.9').allowed).toBe(true);
    }
    expect(consumeExtractLimit('198.51.100.9').allowed).toBe(false);
    resetToolRateLimits();
    for (let i = 0; i < DOWNLOAD_LIMIT; i += 1) {
      expect(consumeDownloadLimit('198.51.100.9').allowed).toBe(true);
    }
    expect(consumeDownloadLimit('198.51.100.9').allowed).toBe(false);
  });
});

describe('cache and diagnostics', () => {
  it('records non-sensitive extract outcomes and supports short TTL cache', () => {
    resetToolCache();
    resetToolDiagnostics();
    setCached('extract:tiktok-video-downloader:demo', { ok: true }, TOOL_CACHE_TTL.negativeMs);
    expect(getCached('extract:tiktok-video-downloader:demo')).toEqual({ ok: true });

    recordToolDiagnostic({
      tool: 'tiktok-video-downloader',
      ok: true,
      category: 'success',
      durationMs: 120,
      cached: false,
      mediaCount: 2,
    });
    recordToolDiagnostic({
      tool: 'instagram-video-downloader',
      ok: false,
      category: 'media_not_exposed',
      durationMs: 80,
      cached: false,
    });
    const summary = getToolHealthSummary();
    expect(summary.total).toBe(2);
    expect(summary.success).toBe(1);
    expect(summary.failed).toBe(1);
    expect(JSON.stringify(summary)).not.toContain('token=');
  });
});

describe('registry consistency', () => {
  it('still publishes exactly the six existing tools', () => {
    expect(TOOLS).toHaveLength(8);
    expect(TOOLS.map((tool) => tool.slug)).toEqual([
      'instagram-profile-viewer',
      'instagram-profile-picture-viewer',
      'instagram-follower-counter',
      'instagram-video-downloader',
      'tiktok-video-downloader',
      'tiktok-profile-picture-downloader',
      'facebook-video-downloader',
      'facebook-reels-downloader',
    ]);
  });
});
