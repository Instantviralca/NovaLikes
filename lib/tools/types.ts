export type ToolPlatform = 'instagram' | 'tiktok' | 'facebook';

export type ToolSlug =
  | 'tiktok-video-downloader'
  | 'tiktok-profile-picture-downloader'
  | 'instagram-video-downloader'
  | 'instagram-profile-picture-viewer'
  | 'instagram-profile-viewer'
  | 'instagram-follower-counter'
  | 'facebook-video-downloader'
  | 'facebook-reels-downloader';

export type ToolInputType = 'url' | 'username_or_url';

export type ToolStatus = 'working' | 'limited' | 'blocked';

export type ToolKind = 'video' | 'profile_image' | 'public_profile';

export type ToolErrorCode =
  | 'invalid_url'
  | 'unsupported_url'
  | 'private_or_unavailable'
  | 'platform_blocked'
  | 'media_not_exposed'
  | 'not_found'
  | 'rate_limited'
  | 'too_large'
  | 'timeout'
  | 'download_unavailable';

export type NormalizedMedia = {
  url: string;
  quality?: string;
  format?: string;
  width?: number;
  height?: number;
  contentType?: string;
  filename?: string;
};

export type NormalizedVideoResult = {
  kind: 'video';
  platform: ToolPlatform;
  originalUrl: string;
  title?: string;
  author?: string;
  thumbnail?: string;
  duration?: number;
  media: NormalizedMedia[];
};

export type NormalizedProfileResult = {
  kind: 'profile_image';
  platform: ToolPlatform;
  originalUrl: string;
  username: string;
  displayName?: string;
  profileUrl: string;
  bio?: string;
  profileImage: NormalizedMedia;
};

export type NormalizedPublicProfileResult = {
  kind: 'public_profile';
  platform: ToolPlatform;
  originalUrl: string;
  username: string;
  displayName?: string;
  profileUrl: string;
  bio?: string;
  followersLabel?: string;
  followingLabel?: string;
  postsLabel?: string;
  followers?: number;
  following?: number;
  postCount?: number;
  likes?: number;
  verified?: boolean;
  fetchedAt?: string;
  profileImage?: NormalizedMedia;
};

export type NormalizedToolResult =
  | NormalizedVideoResult
  | NormalizedProfileResult
  | NormalizedPublicProfileResult;

export type PublicMedia = {
  quality?: string;
  format?: string;
  width?: number;
  height?: number;
  contentType?: string;
  filename?: string;
  downloadPath: string;
};

export type PublicVideoResult = {
  kind: 'video';
  platform: ToolPlatform;
  originalUrl: string;
  title?: string;
  author?: string;
  duration?: number;
  thumbnailDownloadPath?: string;
  media: PublicMedia[];
};

export type PublicProfileResult = {
  kind: 'profile_image';
  platform: ToolPlatform;
  originalUrl: string;
  username: string;
  displayName?: string;
  profileUrl: string;
  bio?: string;
  image: PublicMedia;
};

export type PublicProfileStatsResult = {
  kind: 'public_profile';
  platform: ToolPlatform;
  originalUrl: string;
  username: string;
  displayName?: string;
  profileUrl: string;
  bio?: string;
  followersLabel?: string;
  followingLabel?: string;
  postsLabel?: string;
  followers?: number;
  following?: number;
  postCount?: number;
  likes?: number;
  verified?: boolean;
  fetchedAt?: string;
  image?: PublicMedia;
};

export type PublicToolResult = PublicVideoResult | PublicProfileResult | PublicProfileStatsResult;

export type ToolExtractSuccess = {
  ok: true;
  result: PublicToolResult;
};

export type ToolExtractFailure = {
  ok: false;
  error: {
    code: ToolErrorCode;
    message: string;
  };
};

export type ToolExtractResponse = ToolExtractSuccess | ToolExtractFailure;

export type ExtractorSuccess<T extends NormalizedToolResult = NormalizedToolResult> = {
  ok: true;
  result: T;
  cookies?: string;
  userAgent?: string;
};

export type ExtractorFailure = {
  ok: false;
  code: ToolErrorCode;
  message?: string;
};

export type ExtractorResponse<T extends NormalizedToolResult = NormalizedToolResult> =
  | ExtractorSuccess<T>
  | ExtractorFailure;
