import { describe, expect, it } from 'vitest';

import {
  normalizeInstagramUsername,
  parseExactCount,
  parseInstagramBio,
  parseInstagramDisplayName,
  parseInstagramOgStats,
} from '@/lib/tools/extractors/instagram-public-profile';
import { getCached, resetToolCache, setCached } from '@/lib/tools/cache';
import { toolErrorMessage } from '@/lib/tools/errors';

describe('Instagram public profile parsing', () => {
  it('normalizes username, @username, URLs, and tails', () => {
    expect(normalizeInstagramUsername('nasa')).toBe('nasa');
    expect(normalizeInstagramUsername('@nasa')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/nasa/?hl=en')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.instagram.com/nasa/reels/')).toBe('nasa');
    expect(normalizeInstagramUsername('https://www.tiktok.com/@nasa')).toBeNull();
    expect(normalizeInstagramUsername('https://www.instagram.com/reel/CsQF6lOJq0x/')).toBeNull();
    expect(normalizeInstagramUsername('not a user!!')).toBeNull();
  });

  it('parses public OG follower labels without inventing exact large counts', () => {
    const nasa = parseInstagramOgStats(
      '104M Followers, 96 Following, 4,882 Posts - See Instagram photos and videos from NASA (@nasa)',
    );
    expect(nasa.followersLabel).toBe('104M');
    expect(nasa.followers).toBeUndefined();
    expect(nasa.following).toBe(96);
    expect(nasa.postCount).toBe(4882);

    const small = parseInstagramOgStats('2,385 Followers, 1,487 Following, 9 Posts - See Instagram photos');
    expect(small.followersLabel).toBe('2,385');
    expect(small.followers).toBe(2385);

    const github = parseInstagramOgStats('872K Followers, 54 Following, 1,311 Posts - See Instagram photos');
    expect(github.followersLabel).toBe('872K');
    expect(github.followers).toBeUndefined();
    expect(parseExactCount('104M')).toBeUndefined();
    expect(parseExactCount('872K')).toBeUndefined();
    expect(parseExactCount('2,385')).toBe(2385);
    expect(parseExactCount('2.385')).toBe(2385);
    expect(parseInstagramOgStats('no stats here')).toEqual({});
    const followersOnly = parseInstagramOgStats('14M Followers - Spotify (@spotify) on Instagram');
    expect(followersOnly.followersLabel).toBe('14M');
    expect(followersOnly.followingLabel).toBeUndefined();
  });

  it('parses biography only when Instagram publishes one', () => {
    expect(
      parseInstagramBio(
        '104M Followers, 96 Following, 4,882 Posts - NASA (@nasa) on Instagram: "Making the seemingly impossible, possible. ✨"',
      ),
    ).toBe('Making the seemingly impossible, possible. ✨');
    expect(parseInstagramBio('104M Followers, 96 Following, 4,882 Posts')).toBeUndefined();
    expect(parseInstagramDisplayName('Essa Alansari🤍 (@esa) • Instagram photos and videos')).toEqual({
      displayName: 'Essa Alansari🤍',
      username: 'esa',
    });
  });
});

describe('short-lived tools cache', () => {
  it('returns values inside the TTL and misses afterward', () => {
    resetToolCache();
    setCached('ig-public-profile:nasa', { ok: true }, 20);
    expect(getCached<{ ok: boolean }>('ig-public-profile:nasa')?.ok).toBe(true);
    resetToolCache();
    expect(getCached('ig-public-profile:nasa')).toBeUndefined();
  });
});

describe('Instagram follower counter errors', () => {
  it('keeps follower errors public and specific', () => {
    expect(toolErrorMessage('not_found', undefined, 'instagram-follower-counter')).toContain(
      'public follower count',
    );
    expect(toolErrorMessage('invalid_url', undefined, 'instagram-follower-counter')).toContain(
      'username',
    );
  });
});
