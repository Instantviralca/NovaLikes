import type { SnapArtName } from '@/components/tools/instagram-profile-viewer/visuals';
import type { ToolSlug } from '@/lib/tools/types';

export type IllustratedSeeItem = {
  title: string;
  text: string;
  art: SnapArtName;
};

export type IllustratedToolLayout = {
  accentWord: string;
  editorialHeading: string;
  seeHeading: string;
  seeItems: IllustratedSeeItem[];
  heroArt: SnapArtName;
  editorialArt: SnapArtName;
  relatedHeading: string;
  ctaHeading: string;
  privacyLead: string;
};

const IG_SEE_PHOTO: IllustratedSeeItem = {
  title: 'Profile Photo',
  text: 'The public avatar, shown large enough to inspect.',
  art: 'see-photo',
};

export const ILLUSTRATED_TOOL_LAYOUT: Record<Exclude<ToolSlug, 'instagram-profile-viewer'>, IllustratedToolLayout> = {
  'instagram-profile-picture-viewer': {
    accentWord: 'Viewer',
    editorialHeading: 'See a public Instagram photo at a usable size',
    seeHeading: 'What Can You See?',
    seeItems: [
      IG_SEE_PHOTO,
      { title: 'Username lookup', text: 'Works with a handle, @username, or a public profile URL.', art: 'see-bio' },
      { title: 'Full-size view', text: 'Open the same public image in a new tab when Instagram exposes it.', art: 'related-picture' },
      { title: 'Download file', text: 'Save the published photo through NovaLikes — not a private feed.', art: 'step-done' },
    ],
    heroArt: 'related-picture',
    editorialArt: 'see-photo',
    relatedHeading: 'More Instagram Tools',
    ctaHeading: 'Looking to Grow Your Instagram Presence?',
    privacyLead: 'Public profiles only.',
  },
  'instagram-follower-counter': {
    accentWord: 'Counter',
    editorialHeading: 'A public follower label, not a private census',
    seeHeading: 'What Can You See?',
    seeItems: [
      { title: 'Followers', text: 'The published label, including abbreviations such as 104M.', art: 'see-followers' },
      { title: 'As Instagram prints it', text: 'Large counts stay abbreviated when Instagram writes them that way.', art: 'related-counter' },
      { title: 'Public photo', text: 'Included when Instagram exposes the avatar on the public page.', art: 'see-photo' },
      { title: 'Public account only', text: 'Private profiles are not counted through this tool.', art: 'see-posts' },
    ],
    heroArt: 'related-counter',
    editorialArt: 'see-followers',
    relatedHeading: 'More Instagram Tools',
    ctaHeading: 'Looking to Grow Your Instagram Presence?',
    privacyLead: 'Public profiles only.',
  },
  'instagram-video-downloader': {
    accentWord: 'Downloader',
    editorialHeading: 'A public-page check, not a promised download',
    seeHeading: 'What Can You Get?',
    seeItems: [
      { title: 'Public Reel or video URL', text: 'Paste a public Instagram post or Reel address.', art: 'related-video' },
      { title: 'File when exposed', text: 'A download appears only if Instagram includes a public file.', art: 'step-scan' },
      { title: 'Clear limits', text: 'Many public posts currently do not expose a file. That is Limited availability.', art: 'see-posts' },
      { title: 'No private media', text: 'Stories, Highlights, and private posts are out of scope.', art: 'step-done' },
    ],
    heroArt: 'related-video',
    editorialArt: 'related-video',
    relatedHeading: 'More Instagram Tools',
    ctaHeading: 'Looking to Grow Your Instagram Presence?',
    privacyLead: 'Public posts only.',
  },
  'tiktok-video-downloader': {
    accentWord: 'Downloader',
    editorialHeading: 'Retrieve a public TikTok file when TikTok exposes it',
    seeHeading: 'What Can You Get?',
    seeItems: [
      { title: 'Public watch URL', text: 'Paste a public TikTok video link.', art: 'related-video' },
      { title: 'Server-side check', text: 'NovaLikes requests the public page and looks for a media file.', art: 'step-scan' },
      { title: 'Download when available', text: 'If TikTok exposes the file, you can save it here.', art: 'step-done' },
      { title: 'Public videos only', text: 'Private or restricted videos are not retrieved.', art: 'see-posts' },
    ],
    heroArt: 'related-video',
    editorialArt: 'related-video',
    relatedHeading: 'More TikTok Tools',
    ctaHeading: 'Looking to Grow Your TikTok Presence?',
    privacyLead: 'Public videos only.',
  },
  'tiktok-profile-picture-downloader': {
    accentWord: 'Downloader',
    editorialHeading: 'View the public TikTok photo an account already publishes',
    seeHeading: 'What Can You See?',
    seeItems: [
      { title: 'Profile photo', text: 'The avatar TikTok publishes on a public account.', art: 'see-photo' },
      { title: 'Username or URL', text: 'Enter a handle or a public TikTok profile link.', art: 'see-bio' },
      { title: 'Download', text: 'Save the public image when TikTok exposes it.', art: 'related-picture' },
      { title: 'Public accounts only', text: 'Private profile photos are not available.', art: 'step-done' },
    ],
    heroArt: 'related-picture',
    editorialArt: 'see-photo',
    relatedHeading: 'More TikTok Tools',
    ctaHeading: 'Looking to Grow Your TikTok Presence?',
    privacyLead: 'Public profiles only.',
  },
  'facebook-video-downloader': {
    accentWord: 'Downloader',
    editorialHeading: 'Download a public Facebook video when a file is exposed',
    seeHeading: 'What Can You Get?',
    seeItems: [
      { title: 'Public video URL', text: 'Paste a public Facebook video address.', art: 'related-video' },
      { title: 'Public file check', text: 'NovaLikes looks for a media file Facebook already exposes.', art: 'step-scan' },
      { title: 'Download', text: 'Save the file when Facebook includes one on the public page.', art: 'step-done' },
      { title: 'Public videos only', text: 'Friends-only or login-walled videos are not retrieved.', art: 'see-posts' },
    ],
    heroArt: 'related-video',
    editorialArt: 'related-video',
    relatedHeading: 'More Facebook Tools',
    ctaHeading: 'Looking to Grow Your Facebook Presence?',
    privacyLead: 'Public videos only.',
  },
  'facebook-reels-downloader': {
    accentWord: 'Downloader',
    editorialHeading: 'Download a public Facebook Reel when the media is accessible',
    seeHeading: 'What Can You Get?',
    seeItems: [
      { title: 'Public Reel URL', text: 'Paste a public Facebook Reel address.', art: 'related-video' },
      { title: 'Public file check', text: 'NovaLikes looks for a media file on the public Reel page.', art: 'step-scan' },
      { title: 'Download', text: 'Save the Reel file when Facebook exposes it.', art: 'step-done' },
      { title: 'Public Reels only', text: 'Private or restricted Reels are not retrieved.', art: 'see-posts' },
    ],
    heroArt: 'related-video',
    editorialArt: 'related-video',
    relatedHeading: 'More Facebook Tools',
    ctaHeading: 'Looking to Grow Your Facebook Presence?',
    privacyLead: 'Public Reels only.',
  },
};

export function relatedToolArt(slug: string): SnapArtName {
  if (slug === 'instagram-profile-viewer') return 'hero-portrait';
  if (slug.includes('follower')) return 'related-counter';
  if (slug.includes('picture')) return 'related-picture';
  if (slug.includes('video') || slug.includes('reel')) return 'related-video';
  return 'related-picture';
}
