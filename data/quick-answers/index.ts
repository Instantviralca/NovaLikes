/**
 * English Quick Answer copy — one unique block per page (40–80 words).
 * Localized overlays: lib/i18n/content/quick-answers-locales.ts
 */

import type { CoreServiceSlug } from '@/lib/i18n/config';
import type { ToolSlug } from '@/lib/tools/types';

export type QuickAnswerPageId =
  | CoreServiceSlug
  | ToolSlug
  | 'about'
  | 'contact';

export const QUICK_ANSWER_PAGE_IDS = [
  'about',
  'contact',
  'buy-instagram-followers',
  'buy-instagram-likes',
  'buy-instagram-views',
  'buy-instagram-comments',
  'buy-tiktok-followers',
  'buy-tiktok-likes',
  'buy-tiktok-views',
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
  'instagram-profile-viewer',
  'instagram-profile-picture-viewer',
  'instagram-follower-counter',
  'instagram-video-downloader',
  'tiktok-video-downloader',
  'tiktok-profile-picture-downloader',
  'facebook-video-downloader',
  'facebook-reels-downloader',
] as const satisfies readonly QuickAnswerPageId[];

export const ENGLISH_QUICK_ANSWERS: Record<QuickAnswerPageId, string> = {
  about:
    'NovaLikes is an online platform for Instagram, TikTok, and Facebook growth packages plus free public lookup tools. The site lists package options, explains what each service changes on a profile or post, and processes orders without requiring social media passwords for supported checkout flows.',
  contact:
    'Contact NovaLikes for help with orders, payments, refunds, and service questions through the published contact form or support email on this page. Include your order reference when asking about a purchase. NovaLikes does not request social media passwords through support messages.',
  'buy-instagram-followers':
    'NovaLikes sells Instagram follower packages for public profiles. You pick a quantity, enter the public username or profile URL at checkout, and pay without sharing your Instagram password. The order applies to the profile follower count—not to likes, views, or comments on individual posts.',
  'buy-instagram-likes':
    'NovaLikes sells Instagram like packages for supported public posts and Reels. You choose a package, submit the public post or Reel URL, and checkout without your Instagram password. Likes apply to that specific post’s like count—they do not add profile followers or video view totals.',
  'buy-instagram-views':
    'NovaLikes sells Instagram view packages for supported public Reels and video posts. You select a package, provide the public content URL, and checkout without your Instagram password. Views apply to that Reel or video only—not to profile followers, post likes, or comments on other content.',
  'buy-instagram-comments':
    'NovaLikes sells Instagram comment packages for supported public posts and Reels. You choose a package, enter the public post or Reel URL, and checkout without your Instagram password. Comments apply to that post—they do not increase followers, likes, or views elsewhere on the profile.',
  'buy-tiktok-followers':
    'NovaLikes sells TikTok follower packages for public accounts. You select a quantity, enter the public TikTok username at checkout, and pay without sharing your TikTok password. Followers apply to the account’s follower count—not to likes or views on individual videos.',
  'buy-tiktok-likes':
    'NovaLikes sells TikTok like packages for supported public videos. You pick a package, paste the public TikTok video URL, and checkout without your TikTok password. Likes apply to that video’s like count—they do not add profile followers or change the video view count.',
  'buy-tiktok-views':
    'NovaLikes sells TikTok view packages for supported public watch-page videos. You choose a package, paste the public TikTok video URL, and checkout without your password. The order changes that video’s published view count—not TikTok profile followers or the video’s like count.',
  'buy-facebook-followers':
    'NovaLikes sells Facebook follower packages for public Pages. You select a quantity, submit the public Facebook Page URL, and checkout without your Facebook password. Followers increase the Page-level follower count—they are not Page Likes and not likes on an individual post.',
  'buy-facebook-page-likes':
    'NovaLikes sells Facebook Page Like packages for public Pages. You choose a quantity, enter the public Page URL, and pay without your Facebook password. Page Likes apply to the Page-level Page Like metric—they do not add Page followers or likes on a single post.',
  'buy-facebook-post-likes':
    'NovaLikes sells Facebook Post Like packages for one public post at a time. You pick a package, paste the public post URL, and checkout without your Facebook password. Post likes apply only to that post—they do not change Page followers or the Page Like total.',
  'instagram-profile-viewer':
    'This NovaLikes tool shows public Instagram profile details—photo, name, bio, and published counts—for a username or profile URL you enter. It reads data Instagram already exposes on public profiles. It does not bypass private accounts and never asks for your Instagram password.',
  'instagram-profile-picture-viewer':
    'This tool displays the profile photo Instagram publishes for a public username or profile URL. You can view or download that image when Instagram exposes it on the public page. Private or login-only accounts are not supported, and no Instagram password is required.',
  'instagram-follower-counter':
    'This tool reads the follower label Instagram shows on a public profile— including abbreviations such as 104M when that is how Instagram publishes the count. It does not estimate hidden totals, access private accounts, or require an Instagram login.',
  'instagram-video-downloader':
    'This tool checks a public Instagram Reel or video URL and returns a downloadable file only when Instagram exposes one on the public page. Private posts, Stories, and login-only media are not supported. No Instagram password is required.',
  'tiktok-video-downloader':
    'This tool retrieves a public TikTok video file when TikTok exposes downloadable media for that URL. Paste a public video link; private or restricted videos are not supported. The tool runs on NovaLikes servers and does not ask for your TikTok password.',
  'tiktok-profile-picture-downloader':
    'This tool shows and lets you save the profile photo TikTok publishes for a public username or profile URL. It only works when the account photo is publicly visible. Private accounts are not supported and no TikTok login is required.',
  'facebook-video-downloader':
    'This NovaLikes tool finds downloadable media for a public Facebook video URL when Facebook exposes the file on the public page. Private videos, inaccessible groups, and login-only posts are not supported. No Facebook password or account login is required to use this page.',
  'facebook-reels-downloader':
    'This tool checks a public Facebook Reel URL and returns downloadable media when Facebook exposes it on the public page. Private Reels and login-only content are not supported. You do not need to sign in to Facebook to use this page.',
};

export function getEnglishQuickAnswer(pageId: QuickAnswerPageId): string {
  return ENGLISH_QUICK_ANSWERS[pageId];
}

export function isQuickAnswerPageId(value: string): value is QuickAnswerPageId {
  return (QUICK_ANSWER_PAGE_IDS as readonly string[]).includes(value);
}
