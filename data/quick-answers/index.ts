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
    'NovaLikes sells Instagram likes for public photo posts, carousels and Reels, from $2.99 for 100 likes ($9.99 for 1,000). Each order covers one post: paste its link and pay in USD with no password. Most orders start within 6–8 hours and are complete 4–6 hours later, with gradual delivery on request. Likes raise the heart count on that post only and include a 6-month refill.',
  'buy-instagram-views':
    'NovaLikes sells Instagram views for public Reels and video posts, from $1.99 for 100 views ($4.99 for 1,000). Paste the Reel link, pay in USD and keep your password. Most orders start within 6–8 hours and finish 4–6 hours later; gradual delivery is available on request. Views come from realistic accounts and raise the view count only — they do not create reach, likes or followers. Every order includes a 6-month refill.',
  'buy-instagram-comments':
    'NovaLikes sells Instagram comments for public posts and Reels in two types: High Quality short positive comments (from $13.47 for 10) and Premium comments written around your post (from $9.99 for 5). You can send your own wording or request another language in the checkout note, and no password is needed. Most orders start within 6–8 hours and include a 6-month refill.',
  'buy-tiktok-followers':
    'NovaLikes sells TikTok followers for public accounts, from $2.99 for 100 followers ($14.99 for 1,000). You enter your username, pay in USD and never share your password. Most orders start within 6–8 hours and finish 4–6 hours later, with gradual delivery on request and a 6-month refill. Followers raise the profile count only — they do not push videos onto the For You page.',
  'buy-tiktok-likes':
    'NovaLikes sells TikTok likes for public videos, from $2.99 for 100 likes ($14.99 for 1,000). Copy the video link from TikTok’s Share button, pay in USD and keep your password private. Most orders start within 6–8 hours and finish 4–6 hours later, with gradual delivery on request and a 6-month refill. Likes raise the heart count only; keep them below the video’s views so the numbers look natural.',
  'buy-tiktok-views':
    'NovaLikes sells TikTok views for public videos in two options: High Quality from $1.99 for 1,000 views and Premium from $3.99 for 1,000. Paste the video link, pay in USD and keep your password. Most orders start within 6–8 hours and finish 4–6 hours later, with gradual delivery on request and a 6-month refill. Bought views raise the public count only — they are not Creator Rewards qualified views.',
  'buy-facebook-followers':
    'NovaLikes sells Facebook followers for public Pages and for personal profiles with public followers turned on, from $4.99 for 100 ($26.99 for 1,000). Paste the Page or profile link, pay in USD and never share your password. Most orders start within 6–8 hours and finish 4–6 hours later, with gradual delivery on request and a 6-month refill. Followers raise the follower count only — not post reactions or reach.',
  'buy-facebook-page-likes':
    'NovaLikes sells Facebook Page Likes for public Pages from $2.99 for 100 ($14.99 for 1,000), paid in USD with no password. Check your Page first: newer Facebook Pages show followers rather than likes, and Meta now reports follows instead of Page Likes, so Facebook Followers may suit you better. Most orders start within 6–8 hours, finish 4–6 hours later and include a 6-month refill.',
  'buy-facebook-post-likes':
    'NovaLikes sells Facebook Post Likes for public posts from Pages and personal profiles, from $2.99 for 100 ($14.99 for 1,000). Paste the post link, pay in USD and keep your password private. Likes arrive as the standard Like reaction, with Love or others on request. Most orders start within 6–8 hours and include a 6-month refill. Post Likes change one post’s reactions — not followers or Page Likes.',
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
