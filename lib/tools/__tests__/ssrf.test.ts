import { describe, expect, it } from 'vitest';

import { isPrivateIPv4, isPrivateIPv6, isPrivateIp, parseHttpUrl } from '@/lib/tools/ssrf';
import { parseTikTokInput } from '@/lib/tools/extractors/tiktok';
import { parseInstagramMediaInput } from '@/lib/tools/extractors/instagram-video';
import { normalizeInstagramUsername } from '@/lib/tools/extractors/instagram-profile';
import { parseFacebookInput } from '@/lib/tools/extractors/facebook';
import { assertAllowedPageHost, assertAllowedMediaHost } from '@/lib/tools/ssrf';
import { TOOL_MEDIA_SUFFIXES, TOOL_PAGE_HOSTS } from '@/lib/tools/platforms';

describe('tools SSRF and URL validation', () => {
  it('rejects localhost, private IPs, and dangerous protocols', () => {
    expect(parseHttpUrl('http://localhost/video')).toBeNull();
    expect(parseHttpUrl('http://127.0.0.1/video')).toBeNull();
    expect(parseHttpUrl('http://192.168.1.10/video')).toBeNull();
    expect(parseHttpUrl('http://10.0.0.5/video')).toBeNull();
    expect(parseHttpUrl('file:///etc/passwd')).toBeNull();
    expect(parseHttpUrl('ftp://tiktok.com/video')).toBeNull();
    expect(parseHttpUrl('javascript:alert(1)')).toBeNull();
    expect(parseHttpUrl('data:text/html,hi')).toBeNull();
    expect(parseHttpUrl('https://user:pass@tiktok.com/video')).toBeNull();
  });

  it('flags private addresses', () => {
    expect(isPrivateIPv4('127.0.0.1')).toBe(true);
    expect(isPrivateIPv4('169.254.1.1')).toBe(true);
    expect(isPrivateIPv4('172.16.0.1')).toBe(true);
    expect(isPrivateIPv4('8.8.8.8')).toBe(false);
    expect(isPrivateIPv6('::1')).toBe(true);
    expect(isPrivateIp('::ffff:127.0.0.1')).toBe(true);
  });

  it('accepts only platform page hosts', () => {
    expect(assertAllowedPageHost('www.tiktok.com', TOOL_PAGE_HOSTS.tiktok)).toBe(true);
    expect(assertAllowedPageHost('evil.example', TOOL_PAGE_HOSTS.tiktok)).toBe(false);
    expect(assertAllowedPageHost('tiktok.com.evil.com', TOOL_PAGE_HOSTS.tiktok)).toBe(false);
    expect(assertAllowedPageHost('www.instagram.com', TOOL_PAGE_HOSTS.instagram)).toBe(true);
    expect(assertAllowedPageHost('www.facebook.com', TOOL_PAGE_HOSTS.facebook)).toBe(true);
    expect(assertAllowedPageHost('youtube.com', TOOL_PAGE_HOSTS.tiktok)).toBe(false);
    expect(assertAllowedPageHost('x.com', TOOL_PAGE_HOSTS.facebook)).toBe(false);
  });

  it('accepts only platform media hosts for the download proxy', () => {
    expect(assertAllowedMediaHost('v16-webapp-prime.tiktok.com', TOOL_MEDIA_SUFFIXES.tiktok)).toBe(
      true,
    );
    expect(assertAllowedMediaHost('scontent.cdninstagram.com', TOOL_MEDIA_SUFFIXES.instagram)).toBe(
      true,
    );
    expect(assertAllowedMediaHost('video.xx.fbcdn.net', TOOL_MEDIA_SUFFIXES.facebook)).toBe(true);
    expect(assertAllowedMediaHost('rapidapi.com', TOOL_MEDIA_SUFFIXES.tiktok)).toBe(false);
    expect(assertAllowedMediaHost('example.com', TOOL_MEDIA_SUFFIXES.facebook)).toBe(false);
  });
});

describe('platform parsers', () => {
  it('parses TikTok video and short URLs and rejects others', () => {
    expect(
      parseTikTokInput('https://www.tiktok.com/@scout2015/video/6718335390845095173')?.kind,
    ).toBe('video');
    expect(parseTikTokInput('https://vm.tiktok.com/ZMh3g9J5W/')?.kind).toBe('short');
    expect(parseTikTokInput('https://www.youtube.com/watch?v=abc')).toBeNull();
    expect(parseTikTokInput('https://x.com/someone/status/1')).toBeNull();
  });

  it('parses Instagram media and profile inputs', () => {
    expect(parseInstagramMediaInput('https://www.instagram.com/reel/CsQF6lOJq0x/')?.shortcode).toBe(
      'CsQF6lOJq0x',
    );
    expect(normalizeInstagramUsername('nasa')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/nasa/')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/reel/abc/')).toBeNull();
    expect(parseInstagramMediaInput('https://twitter.com/x')).toBeNull();
  });

  it('parses Facebook video vs reel URLs', () => {
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
    expect(parseFacebookInput('https://www.facebook.com/l.php?u=https://example.com')).toBeNull();
    expect(parseFacebookInput('https://fb.watch/abcDEFghi/', 'video')?.kind).toBe('either');
    expect(parseFacebookInput('https://fb.watch/abcDEFghi/', 'reel')?.kind).toBe('either');
  });
});
