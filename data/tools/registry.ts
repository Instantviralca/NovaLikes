import { routes } from '@/config/routes';
import type { ToolInputType, ToolKind, ToolPlatform, ToolSlug, ToolStatus } from '@/lib/tools/types';

export type ToolDefinition = {
  slug: ToolSlug;
  name: string;
  platform: ToolPlatform;
  kind: ToolKind;
  status: ToolStatus;
  inputType: ToolInputType;
  href: string;
  shortDescription: string;
  placeholder: string;
  actionLabel: string;
  availabilityLabel: string;
};

export const TOOLS: readonly ToolDefinition[] = [
  {
    slug: 'instagram-profile-viewer',
    name: 'Instagram Profile Viewer',
    platform: 'instagram',
    kind: 'public_profile',
    status: 'working',
    inputType: 'username_or_url',
    href: '/tools/instagram-profile-viewer',
    shortDescription: 'See the public photo, name, bio, and published counts for an Instagram profile.',
    placeholder: 'username or https://www.instagram.com/username/',
    actionLabel: 'View profile',
    availabilityLabel: 'Available',
  },
  {
    slug: 'instagram-profile-picture-viewer',
    name: 'Instagram Profile Picture Viewer',
    platform: 'instagram',
    kind: 'profile_image',
    status: 'working',
    inputType: 'username_or_url',
    href: '/tools/instagram-profile-picture-viewer',
    shortDescription: 'View the publicly published profile photo for an Instagram username.',
    placeholder: 'username or https://www.instagram.com/username/',
    actionLabel: 'View photo',
    availabilityLabel: 'Available',
  },
  {
    slug: 'instagram-follower-counter',
    name: 'Instagram Follower Counter',
    platform: 'instagram',
    kind: 'public_profile',
    status: 'working',
    inputType: 'username_or_url',
    href: '/tools/instagram-follower-counter',
    shortDescription: 'Read the follower count Instagram publishes on a public profile page.',
    placeholder: 'username or https://www.instagram.com/username/',
    actionLabel: 'Check count',
    availabilityLabel: 'Available',
  },
  {
    slug: 'instagram-video-downloader',
    name: 'Instagram Video & Reels Downloader',
    platform: 'instagram',
    kind: 'video',
    status: 'limited',
    inputType: 'url',
    href: '/tools/instagram-video-downloader',
    shortDescription: 'Checks a public Instagram Reel or video post. A file is returned only if Instagram exposes one.',
    placeholder: 'https://www.instagram.com/reel/...',
    actionLabel: 'Check video',
    availabilityLabel: 'Limited availability',
  },
  {
    slug: 'tiktok-video-downloader',
    name: 'TikTok Video Downloader',
    platform: 'tiktok',
    kind: 'video',
    status: 'working',
    inputType: 'url',
    href: '/tools/tiktok-video-downloader',
    shortDescription: 'Download a public TikTok video when the file is available on the public page.',
    placeholder: 'https://www.tiktok.com/@user/video/...',
    actionLabel: 'Retrieve video',
    availabilityLabel: 'Available',
  },
  {
    slug: 'tiktok-profile-picture-downloader',
    name: 'TikTok Profile Picture Downloader',
    platform: 'tiktok',
    kind: 'profile_image',
    status: 'working',
    inputType: 'username_or_url',
    href: '/tools/tiktok-profile-picture-downloader',
    shortDescription: 'View and download the public profile photo TikTok publishes for an account.',
    placeholder: 'username or https://www.tiktok.com/@username',
    actionLabel: 'View photo',
    availabilityLabel: 'Available',
  },
  {
    slug: 'facebook-video-downloader',
    name: 'Facebook Video Downloader',
    platform: 'facebook',
    kind: 'video',
    status: 'working',
    inputType: 'url',
    href: '/tools/facebook-video-downloader',
    shortDescription: 'Download a public Facebook video when Facebook exposes the media file.',
    placeholder: 'https://www.facebook.com/.../videos/...',
    actionLabel: 'Retrieve video',
    availabilityLabel: 'Available',
  },
  {
    slug: 'facebook-reels-downloader',
    name: 'Facebook Reels Downloader',
    platform: 'facebook',
    kind: 'video',
    status: 'working',
    inputType: 'url',
    href: '/tools/facebook-reels-downloader',
    shortDescription: 'Download a public Facebook Reel when the media file is publicly accessible.',
    placeholder: 'https://www.facebook.com/reel/...',
    actionLabel: 'Retrieve Reel',
    availabilityLabel: 'Available',
  },
] as const;

const BY_SLUG = new Map(TOOLS.map((tool) => [tool.slug, tool]));

const RELATED: Record<ToolSlug, ToolSlug[]> = {
  'tiktok-video-downloader': ['tiktok-profile-picture-downloader'],
  'tiktok-profile-picture-downloader': ['tiktok-video-downloader'],
  'facebook-video-downloader': ['facebook-reels-downloader'],
  'facebook-reels-downloader': ['facebook-video-downloader'],
  'instagram-profile-viewer': [
    'instagram-profile-picture-viewer',
    'instagram-follower-counter',
    'instagram-video-downloader',
  ],
  'instagram-profile-picture-viewer': [
    'instagram-profile-viewer',
    'instagram-follower-counter',
    'instagram-video-downloader',
  ],
  'instagram-follower-counter': [
    'instagram-profile-viewer',
    'instagram-profile-picture-viewer',
    'instagram-video-downloader',
  ],
  'instagram-video-downloader': [
    'instagram-profile-viewer',
    'instagram-profile-picture-viewer',
    'instagram-follower-counter',
  ],
};

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return BY_SLUG.get(slug as ToolSlug);
}

export function getToolsByPlatform(platform: ToolPlatform): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.platform === platform);
}

export function getRelatedTools(slug: ToolSlug): ToolDefinition[] {
  return (RELATED[slug] ?? [])
    .map((relatedSlug) => getToolBySlug(relatedSlug))
    .filter((tool): tool is ToolDefinition => Boolean(tool));
}

export function isToolSlug(value: string): value is ToolSlug {
  return BY_SLUG.has(value as ToolSlug);
}

export const TOOL_PLATFORM_LABEL: Record<ToolPlatform, string> = {
  instagram: 'Instagram Tools',
  tiktok: 'TikTok Tools',
  facebook: 'Facebook Tools',
};

export const TOOL_PLATFORM_INTRO: Record<ToolPlatform, string> = {
  instagram: 'Public profile photos, follower labels, combined snapshots, and video checks.',
  tiktok: 'Public TikTok videos and profile photos.',
  facebook: 'Public Facebook videos and Reels when a media file is exposed.',
};

export const TOOL_HUB_HREF = routes.tools;
