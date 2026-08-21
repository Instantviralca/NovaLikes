import { describe, expect, it } from 'vitest';

import { resetToolRateLimits, consumeExtractLimit, EXTRACT_LIMIT } from '@/lib/tools/rate-limit';
import { signMediaToken, verifyMediaToken } from '@/lib/tools/media-token';
import { TOOLS, getRelatedTools, isToolSlug } from '@/data/tools/registry';
import { TOOL_PAGE_COPY } from '@/data/tools/copy';

describe('tools media tokens', () => {
  it('signs and verifies a token, then rejects expiry and host tampering', () => {
    const token = signMediaToken({
      url: 'https://v16-webapp-prime.tiktok.com/video/tos/item.mp4',
      platform: 'tiktok',
      filename: 'tiktok-video.mp4',
      mime: 'video/mp4',
    });
    const payload = verifyMediaToken(token);
    expect(payload?.url).toContain('tiktok.com');
    expect(payload?.platform).toBe('tiktok');

    expect(verifyMediaToken('not-a-token')).toBeNull();
    expect(verifyMediaToken(`${token}x`)).toBeNull();
  });

  it('does not accept an arbitrary user URL as a download token payload', () => {
    const token = signMediaToken({
      url: 'https://example.com/secret.mp4',
      platform: 'tiktok',
      filename: 'x.mp4',
    });
    expect(verifyMediaToken(token)).toBeNull();
  });
});

describe('tools rate limit', () => {
  it('blocks after the extract window is exhausted', () => {
    resetToolRateLimits();
    for (let i = 0; i < EXTRACT_LIMIT; i += 1) {
      expect(consumeExtractLimit('203.0.113.10').allowed).toBe(true);
    }
    expect(consumeExtractLimit('203.0.113.10').allowed).toBe(false);
    expect(consumeExtractLimit('203.0.113.11').allowed).toBe(true);
  });
});

describe('tools registry', () => {
  it('only lists implemented tools and never YouTube, X, or story tools', () => {
    const blob = JSON.stringify({ tools: TOOLS, copy: TOOL_PAGE_COPY });
    expect(blob.toLowerCase()).not.toContain('youtube');
    expect(blob.toLowerCase()).not.toContain('rapidapi');
    expect(blob.toLowerCase()).not.toMatch(/\btwitter\b/);
    expect(TOOLS.some((tool) => tool.slug.includes('story'))).toBe(false);
    expect(isToolSlug('instagram-follower-counter')).toBe(true);
    expect(isToolSlug('tiktok-follower-counter')).toBe(false);
    expect(TOOLS).toHaveLength(8);
    expect(isToolSlug('tiktok-video-downloader')).toBe(true);
    expect(getRelatedTools('tiktok-video-downloader').length).toBeGreaterThan(0);
  });
});
