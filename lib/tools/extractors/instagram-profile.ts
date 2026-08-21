import { resolveInstagramPublicProfile } from '@/lib/tools/extractors/instagram-public-profile';
import type { ExtractorResponse, NormalizedProfileResult } from '@/lib/tools/types';

export { normalizeInstagramUsername } from '@/lib/tools/extractors/instagram-public-profile';

export async function extractInstagramProfile(
  rawInput: string,
): Promise<ExtractorResponse<NormalizedProfileResult>> {
  const resolved = await resolveInstagramPublicProfile(rawInput);
  if (!resolved.ok) return resolved;
  if (!resolved.profile.profileImage) {
    return { ok: false, code: 'platform_blocked' };
  }

  return {
    ok: true,
    userAgent: resolved.userAgent,
    result: {
      kind: 'profile_image',
      platform: 'instagram',
      originalUrl: resolved.profile.profileUrl,
      username: resolved.profile.username,
      displayName: resolved.profile.displayName,
      profileUrl: resolved.profile.profileUrl,
      bio: resolved.profile.bio,
      profileImage: resolved.profile.profileImage,
    },
  };
}
