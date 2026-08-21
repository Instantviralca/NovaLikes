import { resolveInstagramPublicProfile } from '@/lib/tools/extractors/instagram-public-profile';
import type { ExtractorResponse, NormalizedPublicProfileResult } from '@/lib/tools/types';

export async function extractInstagramFollowers(
  rawInput: string,
): Promise<ExtractorResponse<NormalizedPublicProfileResult>> {
  const resolved = await resolveInstagramPublicProfile(rawInput);
  if (!resolved.ok) return resolved;
  if (!resolved.profile.followersLabel) {
    return {
      ok: false,
      code: resolved.profile.profileImage ? 'platform_blocked' : 'not_found',
    };
  }

  return {
    ok: true,
    userAgent: resolved.userAgent,
    result: {
      kind: 'public_profile',
      platform: 'instagram',
      originalUrl: resolved.profile.profileUrl,
      username: resolved.profile.username,
      displayName: resolved.profile.displayName,
      profileUrl: resolved.profile.profileUrl,
      bio: resolved.profile.bio,
      followersLabel: resolved.profile.followersLabel,
      followingLabel: resolved.profile.followingLabel,
      postsLabel: resolved.profile.postsLabel,
      followers: resolved.profile.followers,
      following: resolved.profile.following,
      postCount: resolved.profile.postCount,
      fetchedAt: resolved.profile.fetchedAt,
      profileImage: resolved.profile.profileImage,
    },
  };
}
