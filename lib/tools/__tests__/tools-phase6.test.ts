import { describe, expect, it } from 'vitest';

import { TOOL_PAGE_COPY } from '@/data/tools/copy';
import { TOOLS, getRelatedTools, isToolSlug } from '@/data/tools/registry';
import { normalizeInstagramUsername } from '@/lib/tools/extractors/instagram-public-profile';
import { extractInstagramProfileViewer } from '@/lib/tools/extractors/instagram-profile-viewer';
import { extractInstagramProfile } from '@/lib/tools/extractors/instagram-profile';
import { extractInstagramFollowers } from '@/lib/tools/extractors/instagram-followers';

describe('Instagram Profile Viewer', () => {
  it('is published as a seventh tool with distinct copy', () => {
    expect(isToolSlug('instagram-profile-viewer')).toBe(true);
    expect(isToolSlug('tiktok-mp3-downloader')).toBe(false);
    expect(TOOLS).toHaveLength(8);
    expect(TOOL_PAGE_COPY['instagram-profile-viewer'].lead.split(/\s+/).length).toBeLessThan(60);
    expect(TOOL_PAGE_COPY['instagram-profile-viewer'].faqs).toHaveLength(4);
    expect(TOOL_PAGE_COPY['instagram-profile-picture-viewer'].h1).not.toBe(
      TOOL_PAGE_COPY['instagram-profile-viewer'].h1,
    );
    expect(TOOL_PAGE_COPY['instagram-follower-counter'].h1).not.toBe(
      TOOL_PAGE_COPY['instagram-profile-viewer'].h1,
    );
    const blob = JSON.stringify(TOOL_PAGE_COPY).toLowerCase();
    expect(blob).not.toContain('without watermark');
    expect(blob).not.toContain('watermark-free');
    expect(blob).not.toContain('anonymous tracking');
    expect(blob).not.toContain('private profile access');
  });

  it('shares the same username normalizer as the other Instagram profile tools', () => {
    expect(normalizeInstagramUsername('@nasa')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/esa/?hl=en')).toBe('esa');
    expect(normalizeInstagramUsername('https://www.tiktok.com/@nasa')).toBeNull();
    expect(getRelatedTools('instagram-profile-viewer').map((tool) => tool.slug)).toEqual([
      'instagram-profile-picture-viewer',
      'instagram-follower-counter',
      'instagram-video-downloader',
    ]);
  });

  it('reuses the shared public-profile resolver rather than a separate fetch path', () => {
    expect(extractInstagramProfileViewer.toString()).not.toContain('safeFetch');
    expect(extractInstagramProfile.toString()).not.toContain('safeFetch');
    expect(extractInstagramFollowers.toString()).not.toContain('safeFetch');
  });
});
