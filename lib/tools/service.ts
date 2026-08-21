import { publicToolError } from '@/lib/tools/errors';
import { getCached, setCached, TOOL_CACHE_TTL } from '@/lib/tools/cache';
import { shouldNegativeCache, toFailureCategory } from '@/lib/tools/categories';
import { recordToolDiagnostic } from '@/lib/tools/diagnostics';
import { extractFacebookMedia } from '@/lib/tools/extractors/facebook';
import { extractInstagramFollowers } from '@/lib/tools/extractors/instagram-followers';
import { extractInstagramProfile } from '@/lib/tools/extractors/instagram-profile';
import { extractInstagramProfileViewer } from '@/lib/tools/extractors/instagram-profile-viewer';
import { extractInstagramVideo } from '@/lib/tools/extractors/instagram-video';
import { extractTikTokProfilePicture } from '@/lib/tools/extractors/tiktok-profile-picture';
import { extractTikTokVideo } from '@/lib/tools/extractors/tiktok';
import { downloadPathForToken, sanitizeFilename, signMediaToken } from '@/lib/tools/media-token';
import type {
  ExtractorResponse,
  NormalizedProfileResult,
  NormalizedPublicProfileResult,
  NormalizedToolResult,
  NormalizedVideoResult,
  PublicProfileResult,
  PublicProfileStatsResult,
  PublicToolResult,
  PublicVideoResult,
  ToolExtractResponse,
  ToolSlug,
} from '@/lib/tools/types';

function toPublicVideo(
  result: NormalizedVideoResult,
  cookies?: string,
  userAgent?: string,
): PublicVideoResult {
  const referer =
    result.platform === 'tiktok'
      ? 'https://www.tiktok.com/'
      : result.platform === 'instagram'
        ? 'https://www.instagram.com/'
        : 'https://www.facebook.com/';

  const media = result.media.map((item, index) => {
    const filename = sanitizeFilename(
      item.filename ?? `${result.platform}-video-${index + 1}.mp4`,
      `${result.platform}-video.mp4`,
    );
    const token = signMediaToken({
      url: item.url,
      platform: result.platform,
      filename,
      mime: item.contentType ?? 'video/mp4',
      cookies,
      ua: userAgent,
      referer,
    });
    return {
      quality: item.quality,
      format: item.format,
      width: item.width,
      height: item.height,
      contentType: item.contentType,
      filename,
      downloadPath: downloadPathForToken(token),
    };
  });

  let thumbnailDownloadPath: string | undefined;
  if (result.thumbnail) {
    const token = signMediaToken({
      url: result.thumbnail,
      platform: result.platform,
      filename: sanitizeFilename(`${result.platform}-thumb.jpg`, 'thumbnail.jpg'),
      mime: 'image/jpeg',
      cookies,
      ua: userAgent,
      referer,
    });
    thumbnailDownloadPath = downloadPathForToken(token, true);
  }

  return {
    kind: 'video',
    platform: result.platform,
    originalUrl: result.originalUrl,
    title: result.title,
    author: result.author,
    duration: result.duration,
    thumbnailDownloadPath,
    media,
  };
}

function toPublicProfile(
  result: NormalizedProfileResult,
  userAgent?: string,
): PublicProfileResult {
  const filename = sanitizeFilename(
    result.profileImage.filename ?? `${result.username}-profile.jpg`,
    'profile.jpg',
  );
  const token = signMediaToken({
    url: result.profileImage.url,
    platform: result.platform,
    filename,
    mime: result.profileImage.contentType ?? 'image/jpeg',
    ua: userAgent,
    referer:
      result.platform === 'tiktok'
        ? 'https://www.tiktok.com/'
        : result.platform === 'facebook'
          ? 'https://www.facebook.com/'
          : 'https://www.instagram.com/',
  });
  return {
    kind: 'profile_image',
    platform: result.platform,
    originalUrl: result.originalUrl,
    username: result.username,
    displayName: result.displayName,
    profileUrl: result.profileUrl,
    bio: result.bio,
    image: {
      format: result.profileImage.format,
      contentType: result.profileImage.contentType,
      filename,
      downloadPath: downloadPathForToken(token, true),
    },
  };
}

function toPublicProfileStats(
  result: NormalizedPublicProfileResult,
  userAgent?: string,
): PublicProfileStatsResult {
  let image: PublicProfileStatsResult['image'];
  if (result.profileImage) {
    const filename = sanitizeFilename(
      result.profileImage.filename ?? `${result.username}-profile.jpg`,
      'profile.jpg',
    );
    const token = signMediaToken({
      url: result.profileImage.url,
      platform: result.platform,
      filename,
      mime: result.profileImage.contentType ?? 'image/jpeg',
      ua: userAgent,
      referer:
        result.platform === 'tiktok'
          ? 'https://www.tiktok.com/'
          : result.platform === 'facebook'
            ? 'https://www.facebook.com/'
            : 'https://www.instagram.com/',
    });
    image = {
      format: result.profileImage.format,
      contentType: result.profileImage.contentType,
      filename,
      downloadPath: downloadPathForToken(token, true),
    };
  }

  return {
    kind: 'public_profile',
    platform: result.platform,
    originalUrl: result.originalUrl,
    username: result.username,
    displayName: result.displayName,
    profileUrl: result.profileUrl,
    bio: result.bio,
    followersLabel: result.followersLabel,
    followingLabel: result.followingLabel,
    postsLabel: result.postsLabel,
    followers: result.followers,
    following: result.following,
    postCount: result.postCount,
    likes: result.likes,
    verified: result.verified,
    fetchedAt: result.fetchedAt,
    image,
  };
}

function fromExtractor(
  extracted: ExtractorResponse<NormalizedToolResult>,
  slug: ToolSlug,
): ToolExtractResponse {
  if (!extracted.ok) {
    return { ok: false, error: publicToolError(extracted.code, extracted.message, slug) };
  }
  const result = extracted.result;
  const publicResult: PublicToolResult =
    result.kind === 'video'
      ? toPublicVideo(result, extracted.cookies, extracted.userAgent)
      : result.kind === 'public_profile'
        ? toPublicProfileStats(result, extracted.userAgent)
        : toPublicProfile(result, extracted.userAgent);
  return { ok: true, result: publicResult };
}

function cacheKey(slug: ToolSlug, input: string): string {
  return `extract:${slug}:${input.trim().toLowerCase().slice(0, 300)}`;
}

function mediaCount(result: PublicToolResult): number | undefined {
  if (result.kind === 'video') return result.media.length;
  if (result.kind === 'profile_image') return 1;
  return result.image ? 1 : 0;
}

function successTtl(slug: ToolSlug): number {
  return slug.includes('profile') || slug.includes('follower')
    ? TOOL_CACHE_TTL.profileSuccessMs
    : TOOL_CACHE_TTL.videoSuccessMs;
}

async function extractForSlug(slug: ToolSlug, value: string): Promise<ExtractorResponse<NormalizedToolResult>> {
  switch (slug) {
    case 'tiktok-video-downloader':
      return extractTikTokVideo(value);
    case 'tiktok-profile-picture-downloader':
      return extractTikTokProfilePicture(value);
    case 'instagram-video-downloader':
      return extractInstagramVideo(value);
    case 'instagram-profile-picture-viewer':
      return extractInstagramProfile(value);
    case 'instagram-profile-viewer':
      return extractInstagramProfileViewer(value);
    case 'instagram-follower-counter':
      return extractInstagramFollowers(value);
    case 'facebook-video-downloader':
      return extractFacebookMedia(value, 'video');
    case 'facebook-reels-downloader':
      return extractFacebookMedia(value, 'reel');
    default:
      return { ok: false, code: 'unsupported_url' };
  }
}

export async function runToolExtraction(
  slug: ToolSlug,
  input: string,
): Promise<ToolExtractResponse> {
  const started = Date.now();
  const value = input.trim();
  if (!value) {
    recordToolDiagnostic({
      tool: slug,
      ok: false,
      category: 'invalid_input',
      durationMs: Date.now() - started,
      cached: false,
    });
    return { ok: false, error: publicToolError('invalid_url', undefined, slug) };
  }

  const key = cacheKey(slug, value);
  const cached = getCached<ExtractorResponse<NormalizedToolResult>>(key);
  if (cached) {
    const response = fromExtractor(cached, slug);
    recordToolDiagnostic({
      tool: slug,
      ok: response.ok,
      category: response.ok ? 'success' : toFailureCategory(response.error.code),
      durationMs: Date.now() - started,
      cached: true,
      mediaCount: response.ok ? mediaCount(response.result) : undefined,
    });
    return response;
  }

  const extracted = await extractForSlug(slug, value);
  if (extracted.ok) {
    setCached(key, extracted, successTtl(slug));
  } else if (shouldNegativeCache(extracted.code)) {
    setCached(key, extracted, TOOL_CACHE_TTL.negativeMs);
  }

  const response = fromExtractor(extracted, slug);
  recordToolDiagnostic({
    tool: slug,
    ok: response.ok,
    category: response.ok ? 'success' : toFailureCategory(response.error.code),
    durationMs: Date.now() - started,
    cached: false,
    mediaCount: response.ok ? mediaCount(response.result) : undefined,
  });
  return response;
}
