import type { ToolErrorCode, ToolPlatform, ToolSlug } from '@/lib/tools/types';

export type ToolChrome = {
  howToUseIt: string;
  stepLabel: string;
  openTool: string;
  allFreeTools: string;
  toolIsFreeNote: string;
  exploreServices: string;
  faqTitle: string;
  viewFullSize: string;
  downloadImage: string;
  downloadVideo: string;
  downloadFileN: string;
  downloadQuality: string;
  viewOnInstagram: string;
  viewFullSizeProfilePicture: string;
  currentFollowerCount: string;
  abbreviatedCountNote: string;
  followers: string;
  following: string;
  posts: string;
  availableQuality: string;
  availableQualities: string;
  profilePhotoAlt: string;
  videoThumbnailAlt: string;
  thumbnailForTitle: string;
  viewProfile: string;
  hubHowTitles: [string, string, string];
  usps: Array<{ title: string; text: string }>;
  servicePills: Record<string, string>;
  platformLabels: Record<ToolPlatform, string>;
  platformIntros: Record<ToolPlatform, string>;
  cardBlurbs: Record<ToolSlug, string>;
  serviceLabels: Record<string, string>;
  networkErrors: {
    profileImage: string;
    profileViewer: string;
    followerCount: string;
    video: string;
  };
  errors: {
    base: Record<ToolErrorCode, string>;
    byTool: Record<ToolSlug, Partial<Record<ToolErrorCode, string>>>;
  };
};

export const ENGLISH_TOOL_CHROME: ToolChrome = {
  howToUseIt: 'How to Use It',
  stepLabel: 'Step {n}',
  openTool: 'Open tool',
  allFreeTools: 'All free tools',
  toolIsFreeNote: 'This tool is free. Package pages are separate if you also want to grow a public account.',
  exploreServices: 'Explore Services',
  faqTitle: 'Frequently Asked Questions',
  viewFullSize: 'View Full Size',
  downloadImage: 'Download Image',
  downloadVideo: 'Download video',
  downloadFileN: 'Download file {n}',
  downloadQuality: 'Download {quality}',
  viewOnInstagram: 'View on Instagram',
  viewFullSizeProfilePicture: 'View Full Size Profile Picture',
  currentFollowerCount: 'Current publicly available follower count',
  abbreviatedCountNote: 'Shown as Instagram publishes it, not as an exact count.',
  followers: 'Followers',
  following: 'Following',
  posts: 'Posts',
  availableQuality: 'Available quality: ',
  availableQualities: 'Available qualities: ',
  profilePhotoAlt: '{username} profile photo',
  videoThumbnailAlt: 'Video thumbnail',
  thumbnailForTitle: 'Thumbnail for {title}',
  viewProfile: 'View Profile',
  hubHowTitles: ['Enter a username or URL', 'We check the public data', 'See the available result'],
  usps: [
    { title: 'Free to use', text: 'No charge for any helper' },
    { title: 'No login', text: 'Anonymous & secure' },
    { title: 'Public data only', text: 'We respect privacy' },
  ],
  servicePills: {
    'buy-instagram-followers': 'Instagram Followers Packages',
    'buy-tiktok-followers': 'TikTok Followers Packages',
    'buy-facebook-followers': 'Facebook Followers Packages',
  },
  platformLabels: {
    instagram: 'Instagram Tools',
    tiktok: 'TikTok Tools',
    facebook: 'Facebook Tools',
  },
  platformIntros: {
    instagram: 'Public profile photos, follower labels, combined snapshots, and video checks.',
    tiktok: 'Public TikTok videos and profile photos.',
    facebook: 'Public Facebook videos and Reels when a media file is exposed.',
  },
  cardBlurbs: {
    'instagram-profile-viewer': 'See the public photo, name, bio, and published counts together.',
    'instagram-profile-picture-viewer': 'View the public profile photo for an Instagram username.',
    'instagram-follower-counter': 'Read the follower count published on a public profile page.',
    'instagram-video-downloader':
      'Check a public Reel or video. A file appears only if Instagram exposes one.',
    'tiktok-video-downloader': 'Download a public TikTok video when the file is on the public page.',
    'tiktok-profile-picture-downloader':
      'View and download the public photo TikTok publishes for an account.',
    'facebook-video-downloader': 'Download a public Facebook video when Facebook exposes the file.',
    'facebook-reels-downloader':
      'Download a public Facebook Reel when the media file is accessible.',
  },
  serviceLabels: {
    'buy-instagram-followers': 'Instagram Followers',
    'buy-instagram-likes': 'Instagram Likes',
    'buy-instagram-views': 'Instagram Views',
    'buy-instagram-comments': 'Instagram Comments',
    'buy-tiktok-followers': 'TikTok Followers',
    'buy-tiktok-likes': 'TikTok Likes',
    'buy-tiktok-views': 'TikTok Views',
    'buy-facebook-followers': 'Facebook Followers',
    'buy-facebook-page-likes': 'Facebook Page Likes',
    'buy-facebook-post-likes': 'Facebook Post Likes',
  },
  networkErrors: {
    profileImage: 'We couldn’t retrieve this public profile photo right now. Please try again.',
    profileViewer: 'We couldn’t retrieve this public Instagram profile right now. Please try again.',
    followerCount: 'We couldn’t retrieve this public follower count right now. Please try again.',
    video: 'We couldn’t retrieve this public video right now. Please try again.',
  },
  errors: {
    base: {
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
    },
    byTool: {
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
        unsupported_url:
          'This is not a public Instagram profile. Post, Reel, and Story URLs are not profile lookups.',
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
    },
  },
};

export function formatToolChrome(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

export function localizedToolError(
  chrome: ToolChrome,
  slug: ToolSlug,
  code: string,
  fallbackNetwork: string,
): string {
  const fromTool = chrome.errors.byTool[slug]?.[code as ToolErrorCode];
  if (fromTool) return fromTool;
  const fromBase = chrome.errors.base[code as ToolErrorCode];
  if (fromBase) return fromBase;
  return fallbackNetwork;
}
