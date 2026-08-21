import { describe, expect, it } from 'vitest';

import { TOOL_PAGE_COPY } from '@/data/tools/copy';
import { TOOLS, getRelatedTools, getToolBySlug, isToolSlug } from '@/data/tools/registry';
import { toolErrorMessage } from '@/lib/tools/errors';
import { parseFacebookInput, facebookLooksUnavailable } from '@/lib/tools/extractors/facebook';
import { normalizeInstagramUsername } from '@/lib/tools/extractors/instagram-profile';
import { parseInstagramMediaInput, instagramLooksUnavailable } from '@/lib/tools/extractors/instagram-video';
import { parseTikTokInput } from '@/lib/tools/extractors/tiktok';
import { consumeExtractLimit, resetToolRateLimits, EXTRACT_LIMIT } from '@/lib/tools/rate-limit';
import { signMediaToken, verifyMediaToken } from '@/lib/tools/media-token';
import { normalizeExternalInput } from '@/lib/tools/normalize';
import { downloadButtonLabel, videoQualityLabel } from '@/lib/tools/quality-label';
import { assertAllowedMediaHost, assertAllowedPageHost, parseHttpUrl } from '@/lib/tools/ssrf';
import { TOOL_MEDIA_SUFFIXES, TOOL_PAGE_HOSTS } from '@/lib/tools/platforms';

describe('URL normalization', () => {
  it('adds https for known hosts and leaves usernames alone', () => {
    expect(normalizeExternalInput(' vm.tiktok.com/ZMh3g9J5W/ ')).toBe(
      'https://vm.tiktok.com/ZMh3g9J5W/',
    );
    expect(normalizeExternalInput('www.instagram.com/nasa/')).toBe(
      'https://www.instagram.com/nasa/',
    );
    expect(normalizeExternalInput('nasa')).toBe('nasa');
    expect(normalizeExternalInput('"https://www.tiktok.com/@a/video/1"')).toBe(
      'https://www.tiktok.com/@a/video/1',
    );
  });
});

describe('supported and invalid platform URLs', () => {
  it('accepts common TikTok video and share formats and rejects photos, YouTube, and X', () => {
    expect(
      parseTikTokInput('https://www.tiktok.com/@scout2015/video/6718335390845095173?is_from_webapp=1')
        ?.kind,
    ).toBe('video');
    expect(parseTikTokInput('https://m.tiktok.com/v/6718335390845095173.html')?.kind).toBe('video');
    expect(parseTikTokInput('https://vm.tiktok.com/ZMh3g9J5W/')?.kind).toBe('short');
    expect(parseTikTokInput('https://www.tiktok.com/t/ZTabcdefg/')?.kind).toBe('short');
    expect(parseTikTokInput('https://www.tiktok.com/@user/photo/12345678901')).toBeNull();
    expect(parseTikTokInput('https://www.youtube.com/watch?v=abc')).toBeNull();
    expect(parseTikTokInput('https://x.com/someone/status/1')).toBeNull();
  });

  it('normalizes Instagram usernames and media URLs', () => {
    expect(normalizeInstagramUsername('@nasa')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/nasa/?hl=en')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/nasa/reels/')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/reel/CsQF6lOJq0x/')).toBeNull();
    expect(parseInstagramMediaInput('https://www.instagram.com/reel/CsQF6lOJq0x/?igsh=1')?.shortcode).toBe(
      'CsQF6lOJq0x',
    );
    expect(parseInstagramMediaInput('https://twitter.com/x')).toBeNull();
    expect(instagramLooksUnavailable("Sorry, this page isn't available.")).toBe(true);
  });

  it('classifies Facebook video vs reel URLs without accepting l.php', () => {
    expect(
      parseFacebookInput('https://www.facebook.com/facebook/videos/10153231379946729/', 'video')
        ?.kind,
    ).toBe('video');
    expect(parseFacebookInput('https://www.facebook.com/reel/1112984017044245', 'reel')?.kind).toBe(
      'reel',
    );
    expect(
      parseFacebookInput('https://www.facebook.com/facebook/videos/10153231379946729/', 'reel')
        ?.kind,
    ).toBe('video');
    expect(parseFacebookInput('https://fb.watch/abcDE/', 'reel')?.kind).toBe('either');
    expect(parseFacebookInput('https://www.facebook.com/l.php?u=https://example.com')).toBeNull();
    expect(facebookLooksUnavailable('This content isn\'t available right now')).toBe(true);
  });
});

describe('SSRF rejection', () => {
  it('rejects localhost, private IPs, and dangerous protocols', () => {
    expect(parseHttpUrl('http://localhost/video')).toBeNull();
    expect(parseHttpUrl('http://127.0.0.1/video')).toBeNull();
    expect(parseHttpUrl('file:///etc/passwd')).toBeNull();
    expect(parseHttpUrl('javascript:alert(1)')).toBeNull();
    expect(assertAllowedPageHost('youtube.com', TOOL_PAGE_HOSTS.tiktok)).toBe(false);
    expect(assertAllowedMediaHost('rapidapi.com', TOOL_MEDIA_SUFFIXES.tiktok)).toBe(false);
  });
});

describe('rate limiting and signed downloads', () => {
  it('blocks after the extract window is exhausted', () => {
    resetToolRateLimits();
    for (let i = 0; i < EXTRACT_LIMIT; i += 1) {
      expect(consumeExtractLimit('203.0.113.20').allowed).toBe(true);
    }
    expect(consumeExtractLimit('203.0.113.20').allowed).toBe(false);
  });

  it('verifies signed tokens and rejects arbitrary hosts', () => {
    const token = signMediaToken({
      url: 'https://v16-webapp-prime.tiktok.com/video/tos/item.mp4',
      platform: 'tiktok',
      filename: 'tiktok-video.mp4',
    });
    expect(verifyMediaToken(token)?.platform).toBe('tiktok');
    expect(
      verifyMediaToken(
        signMediaToken({
          url: 'https://example.com/secret.mp4',
          platform: 'tiktok',
          filename: 'x.mp4',
        }),
      ),
    ).toBeNull();
  });
});

describe('error normalization and quality labels', () => {
  it('returns tool-specific public errors without stack traces', () => {
    const tiktok = toolErrorMessage('platform_blocked', undefined, 'tiktok-video-downloader');
    expect(tiktok).toContain('TikTok may be temporarily limiting');
    expect(tiktok.toLowerCase()).not.toContain('stack');
    expect(tiktok.toLowerCase()).not.toContain('exception');
    expect(toolErrorMessage('platform_blocked', undefined, 'instagram-video-downloader')).toContain(
      'did not expose a public video file',
    );
    expect(toolErrorMessage('download_unavailable')).toContain('expired');
  });

  it('does not invent HD/SD when quality is unknown', () => {
    expect(videoQualityLabel(undefined)).toBeUndefined();
    expect(videoQualityLabel('hd')).toBe('HD');
    expect(videoQualityLabel('720p')).toBe('720p');
    expect(downloadButtonLabel(undefined, 0)).toBe('Download video');
    expect(downloadButtonLabel('sd', 1)).toBe('Download SD');
  });
});

describe('tools registry and Instagram limited state', () => {
  it('keeps Instagram video honest and omits YouTube, X, stories, and follower tools', () => {
    const igVideo = getToolBySlug('instagram-video-downloader');
    expect(igVideo?.status).toBe('limited');
    expect(igVideo?.availabilityLabel.toLowerCase()).not.toContain('available now');
    const blob = JSON.stringify({ tools: TOOLS, copy: TOOL_PAGE_COPY }).toLowerCase();
    expect(blob).not.toContain('youtube');
    expect(blob).not.toContain('rapidapi');
    expect(blob).not.toMatch(/\btwitter\b/);
    expect(blob).not.toContain('always works');
    expect(blob).not.toContain('download any instagram');
    expect(blob).not.toContain('unlimited');
    expect(TOOLS.some((tool) => tool.slug.includes('story'))).toBe(false);
    expect(getToolBySlug('instagram-follower-counter')?.status).toBe('working');
    expect(isToolSlug('tiktok-follower-counter')).toBe(false);
    expect(getRelatedTools('facebook-video-downloader')[0]?.slug).toBe(
      'facebook-reels-downloader',
    );
    expect(getRelatedTools('instagram-profile-picture-viewer')[0]?.slug).toBe(
      'instagram-profile-viewer',
    );
  });
});

describe('tools SEO metadata', () => {
  it('gives each tools route a unique indexable title, description, and canonical', async () => {
    const { getMetadataByRoute } = await import('@/lib/seo/metadata');
    const paths = [
      '/tools',
      '/tools/tiktok-video-downloader',
      '/tools/tiktok-profile-picture-downloader',
      '/tools/instagram-video-downloader',
      '/tools/instagram-profile-viewer',
      '/tools/instagram-profile-picture-viewer',
      '/tools/instagram-follower-counter',
      '/tools/facebook-video-downloader',
      '/tools/facebook-reels-downloader',
    ];
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const canonicals = new Set<string>();
    for (const path of paths) {
      const entry = getMetadataByRoute(path);
      expect(entry?.indexable).toBe(true);
      expect(entry?.robots.index).toBe(true);
      expect(entry?.canonicalPath).toBe(path);
      expect(entry?.openGraphTitle).toBe(entry?.title);
      expect(entry?.openGraphDescription).toBe(entry?.description);
      titles.add(entry!.title);
      descriptions.add(entry!.description);
      canonicals.add(entry!.canonicalPath);
    }
    expect(titles.size).toBe(paths.length);
    expect(descriptions.size).toBe(paths.length);
    expect(canonicals.size).toBe(paths.length);
    expect(getMetadataByRoute('/tools/instagram-video-downloader')?.description.toLowerCase()).toContain(
      'when instagram exposes it',
    );
    const { SITEMAP_PRODUCTION_ROUTE_SET } = await import('@/data/seo/sitemap-routes');
    for (const path of paths) {
      expect(SITEMAP_PRODUCTION_ROUTE_SET.has(path)).toBe(true);
    }
  });
});
