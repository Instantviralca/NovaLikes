import { resolveInstagramPublicProfile } from '@/lib/tools/extractors/instagram-public-profile';
import type { ExtractorResponse, NormalizedPublicProfileResult } from '@/lib/tools/types';

export async function extractInstagramProfileViewer(
  rawInput: string,
): Promise<ExtractorResponse<NormalizedPublicProfileResult>> {
  const resolved = await resolveInstagramPublicProfile(rawInput);
  if (!resolved.ok) return resolved;

  const profile = resolved.profile;
  if (!profile.profileImage && !profile.followersLabel && !profile.displayName) {
    return { ok: false, code: 'not_found' };
  }

  return {
    ok: true,
    userAgent: resolved.userAgent,
    result: {
      kind: 'public_profile',
      platform: 'instagram',
      originalUrl: profile.profileUrl,
      username: profile.username,
      displayName: profile.displayName,
      profileUrl: profile.profileUrl,
      bio: profile.bio,
      followersLabel: profile.followersLabel,
      followingLabel: profile.followingLabel,
      postsLabel: profile.postsLabel,
      followers: profile.followers,
      following: profile.following,
      postCount: profile.postCount,
      fetchedAt: profile.fetchedAt,
      profileImage: profile.profileImage,
    },
  };
}
