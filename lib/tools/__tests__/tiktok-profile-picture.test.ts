import { describe, expect, it } from 'vitest';

import { isToolSlug, TOOLS } from '@/data/tools/registry';
import { normalizeTikTokUsername } from '@/lib/tools/extractors/tiktok-profile-picture';
import { TOOL_PAGE_COPY } from '@/data/tools/copy';

describe('TikTok profile picture tool', () => {
  it('normalizes username, @username, and profile URLs', () => {
    expect(normalizeTikTokUsername('nba')).toBe('nba');
    expect(normalizeTikTokUsername('@khaby.lame')).toBe('khaby.lame');
    expect(normalizeTikTokUsername('https://www.tiktok.com/@natgeo')).toBe('natgeo');
    expect(normalizeTikTokUsername('https://www.tiktok.com/@nba/video/123')).toBeNull();
    expect(normalizeTikTokUsername('https://www.youtube.com/@nba')).toBeNull();
    expect(normalizeTikTokUsername('not a user!!')).toBeNull();
  });

  it('is published while Facebook thumbnail and MP3 tools are not', () => {
    expect(isToolSlug('tiktok-profile-picture-downloader')).toBe(true);
    expect(isToolSlug('facebook-video-thumbnail-downloader')).toBe(false);
    expect(isToolSlug('tiktok-mp3-downloader')).toBe(false);
    expect(TOOLS).toHaveLength(8);
    expect(TOOL_PAGE_COPY['tiktok-profile-picture-downloader'].h1).toBe(
      'TikTok Profile Picture Downloader',
    );
  });
});
