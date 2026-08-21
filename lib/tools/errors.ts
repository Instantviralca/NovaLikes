import type { ToolErrorCode, ToolSlug } from '@/lib/tools/types';

const BASE: Record<ToolErrorCode, string> = {
  invalid_url: 'Enter a valid public URL.',
  unsupported_url: 'This URL is not supported by this tool. Try another public URL.',
  private_or_unavailable: 'This content is private or unavailable.',
  platform_blocked: 'The platform temporarily blocked this request. Try another public URL later.',
  media_not_exposed: 'The platform did not expose a public media file for this link.',
  not_found: 'We could not retrieve this video.',
  rate_limited: 'Too many requests. Please wait a minute and try again.',
  too_large: 'This file is larger than we can process safely.',
  timeout: 'The request timed out. Try again in a moment.',
  download_unavailable: 'This download link has expired. Retrieve the content again to get a new file.',
};

const BY_TOOL: Partial<Record<ToolSlug, Partial<Record<ToolErrorCode, string>>>> = {
  'tiktok-video-downloader': {
    invalid_url: 'Paste a public TikTok video URL, including common share links.',
    unsupported_url: 'This does not look like a public TikTok video URL.',
    private_or_unavailable: 'This TikTok video looks private, removed, or unavailable.',
    platform_blocked:
      'We couldn’t retrieve this public TikTok video right now. TikTok may be temporarily limiting requests. Please try again shortly.',
    media_not_exposed: 'TikTok did not expose a public video file for this link.',
    not_found: 'We couldn’t retrieve this public TikTok video. Try another public video URL.',
    timeout: 'TikTok took too long to respond. Please try again in a moment.',
  },
  'tiktok-profile-picture-downloader': {
    invalid_url: 'Enter a public TikTok username or profile URL.',
    unsupported_url: 'This is not a public TikTok profile. Video URLs belong on the video downloader.',
    private_or_unavailable: 'This TikTok profile looks private or unavailable.',
    platform_blocked:
      'TikTok did not expose a public profile photo for this account. Try another public username.',
    not_found: 'We couldn’t retrieve this public TikTok profile photo.',
  },
  'facebook-video-downloader': {
    invalid_url: 'Paste a public Facebook video URL. Reel links belong on the Reels downloader.',
    unsupported_url:
      'This looks like a Facebook Reel URL. Use the Facebook Reels Downloader for Reel links.',
    private_or_unavailable: 'This Facebook video looks private, removed, or unavailable to public requests.',
    platform_blocked:
      'Facebook did not expose a public video file for this link. Try another public video, or try again shortly.',
    media_not_exposed:
      'Facebook did not expose a public video file for this link. HD or SD is returned only when Facebook includes it.',
    not_found: 'We couldn’t retrieve this public Facebook video. It may have been removed.',
  },
  'facebook-reels-downloader': {
    invalid_url: 'Paste a public Facebook Reel URL. Standard video links belong on the video downloader.',
    unsupported_url:
      'This looks like a standard Facebook video URL. Use the Facebook Video Downloader for watch or /videos/ links.',
    private_or_unavailable: 'This Facebook Reel looks private, removed, or unavailable to public requests.',
    platform_blocked:
      'Facebook did not expose a public Reel file for this link. Try another public Reel, or try again shortly.',
    media_not_exposed: 'Facebook did not expose a public Reel file for this link.',
    not_found: 'We couldn’t retrieve this public Facebook Reel. It may have been removed.',
  },
  'instagram-profile-picture-viewer': {
    invalid_url: 'Enter a public Instagram username or profile URL.',
    unsupported_url: 'This is not a public Instagram profile. Story and post URLs are not profile lookups.',
    private_or_unavailable: 'This Instagram profile looks private or unavailable.',
    platform_blocked:
      'Instagram did not expose a public profile photo for this account. Try another public username.',
    not_found: 'We couldn’t retrieve this public Instagram profile photo.',
  },
  'instagram-profile-viewer': {
    invalid_url: 'Enter a public Instagram username or profile URL.',
    unsupported_url: 'This is not a public Instagram profile. Post, Reel, and Story URLs are not profile lookups.',
    private_or_unavailable: 'This Instagram profile looks private or unavailable.',
    platform_blocked:
      'Instagram did not expose public profile information for this account. Try another public username.',
    not_found: 'We couldn’t retrieve this public Instagram profile.',
  },
  'instagram-follower-counter': {
    invalid_url: 'Enter a public Instagram username or profile URL.',
    unsupported_url: 'This is not a public Instagram profile. Post and Reel URLs are not follower lookups.',
    private_or_unavailable: 'This Instagram profile looks private or unavailable.',
    platform_blocked:
      'Instagram did not expose a public follower count for this account. Try another public username.',
    not_found: 'We couldn’t retrieve a public follower count for this username.',
  },
  'instagram-video-downloader': {
    invalid_url: 'Paste a public Instagram Reel or video post URL.',
    unsupported_url: 'This URL is not a public Instagram Reel or video post.',
    private_or_unavailable: 'This Instagram post looks private, removed, or unavailable.',
    platform_blocked:
      'Instagram did not expose a public video file for this link. Only posts where Instagram makes the file available can be retrieved.',
    media_not_exposed:
      'This looks like a public Instagram page, but Instagram did not expose a video file. Availability depends on publicly exposed media.',
    not_found: 'We couldn’t retrieve a public Instagram video from this link.',
  },
};

export function toolErrorMessage(code: ToolErrorCode, override?: string, slug?: ToolSlug): string {
  if (override?.trim()) return override.trim();
  if (slug && BY_TOOL[slug]?.[code]) return BY_TOOL[slug]![code]!;
  return BASE[code];
}

export function publicToolError(code: ToolErrorCode, override?: string, slug?: ToolSlug) {
  return {
    code,
    message: toolErrorMessage(code, override, slug),
  };
}

export function isToolErrorCode(value: string): value is ToolErrorCode {
  return value in BASE;
}
