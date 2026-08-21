/**
 * NovaLikes.com commercial product catalog.
 *
 * Package quantities + prices aligned to live BoostLikes AU catalogs
 * (boostlikes.com.au, checked 2026-08-13). Displayed competitor amounts applied
 * as catalog major units (USD store currency unchanged).
 *
 * Not listed on BoostLikes AU price pages (kept prior catalog):
 * - Instagram Comments (HQ / Premium)
 * - TikTok Views (HQ / Premium)
 */

import type { PlatformId } from '@/types/platform';
import type { ServiceCategory } from '@/types/service';

export type NovaLikesCommentType = 'High Quality' | 'Premium';

export type NovaLikesProduct = {
  id: string;
  platform: PlatformId;
  /** Maps 1:1 to ServiceCategory for services that have NovaLikes packages. */
  type: ServiceCategory;
  name: string;
  count: number;
  /** Major currency units (USD). */
  price: number;
  popular: boolean;
  /** Optional comments tier — High Quality or Premium. */
  commentType?: NovaLikesCommentType;
  /** Package feature bullets when defined in catalog. */
  features?: string[];
  /** Optional compare-at price in major units (USD). */
  compareAtPrice?: number;
};

const HQ_COMMENT_FEATURES = [
  'Relevant comments for your post',
  'Order tracking after checkout',
  'No password required',
  'Customer support',
] as const;

const PREMIUM_COMMENT_FEATURES = [
  'Highly relevant comments',
  'Comments for eligible public posts and Reels',
  'Orders are processed after checkout',
  '30-day refill protection',
  'No password required',
  'Customer support',
] as const;

const HQ_TIKTOK_VIEWS_FEATURES = [
  'View packages for public videos',
  'Clear package quantities',
  'Orders are processed after checkout',
  'No password required',
  'Order tracking available',
  'Customer support',
] as const;

const PREMIUM_TIKTOK_VIEWS_FEATURES = [
  'View packages for eligible public videos',
  'Separate from likes and followers',
  'Orders are processed after checkout',
  'No password required',
  'Order tracking available',
  'Customer support',
] as const;

/**
 * BoostLikes AU–aligned PRODUCTS array.
 * Source pages:
 * - https://boostlikes.com.au/instagram-services-prices/
 * - https://boostlikes.com.au/buy-tiktok-followers-likes/
 * - https://boostlikes.com.au/buy-facebook-likes-followers-australia/
 * - https://boostlikes.com.au/buy-youtube-subscribers-views/
 */
export const NOVALIKES_PRODUCTS: NovaLikesProduct[] = [
  // Instagram Followers — BoostLikes AU
  { id: 'ig-f-100', platform: 'instagram', type: 'followers', name: '100 Instagram Followers', count: 100, price: 2.99, popular: false },
  { id: 'ig-f-250', platform: 'instagram', type: 'followers', name: '250 Instagram Followers', count: 250, price: 4.99, popular: false },
  { id: 'ig-f-500', platform: 'instagram', type: 'followers', name: '500 Instagram Followers', count: 500, price: 7.99, popular: false },
  { id: 'ig-f-1000', platform: 'instagram', type: 'followers', name: '1000 Instagram Followers', count: 1000, price: 13.99, popular: true },
  { id: 'ig-f-2500', platform: 'instagram', type: 'followers', name: '2500 Instagram Followers', count: 2500, price: 25.99, popular: false },
  { id: 'ig-f-5000', platform: 'instagram', type: 'followers', name: '5000 Instagram Followers', count: 5000, price: 39.99, popular: false },
  { id: 'ig-f-10000', platform: 'instagram', type: 'followers', name: '10000 Instagram Followers', count: 10000, price: 74.99, popular: false },
  { id: 'ig-f-15000', platform: 'instagram', type: 'followers', name: '15000 Instagram Followers', count: 15000, price: 109.99, popular: false },

  // Instagram Likes — BoostLikes AU
  { id: 'ig-l-100', platform: 'instagram', type: 'likes', name: '100 Instagram Likes', count: 100, price: 2.99, popular: false },
  { id: 'ig-l-250', platform: 'instagram', type: 'likes', name: '250 Instagram Likes', count: 250, price: 3.99, popular: false },
  { id: 'ig-l-500', platform: 'instagram', type: 'likes', name: '500 Instagram Likes', count: 500, price: 5.99, popular: false },
  { id: 'ig-l-1000', platform: 'instagram', type: 'likes', name: '1000 Instagram Likes', count: 1000, price: 9.99, popular: true },
  { id: 'ig-l-2500', platform: 'instagram', type: 'likes', name: '2500 Instagram Likes', count: 2500, price: 19.99, popular: false },
  { id: 'ig-l-3000', platform: 'instagram', type: 'likes', name: '3000 Instagram Likes', count: 3000, price: 24.99, popular: false },
  { id: 'ig-l-5000', platform: 'instagram', type: 'likes', name: '5000 Instagram Likes', count: 5000, price: 39.99, popular: false },
  { id: 'ig-l-10000', platform: 'instagram', type: 'likes', name: '10000 Instagram Likes', count: 10000, price: 59.99, popular: false },

  // Instagram Views — BoostLikes AU (already matching)
  { id: 'ig-v-100', platform: 'instagram', type: 'views', name: '100 Instagram Views', count: 100, price: 1.99, popular: false },
  { id: 'ig-v-500', platform: 'instagram', type: 'views', name: '500 Instagram Views', count: 500, price: 3.99, popular: false },
  { id: 'ig-v-1000', platform: 'instagram', type: 'views', name: '1000 Instagram Views', count: 1000, price: 4.99, popular: true },
  { id: 'ig-v-2000', platform: 'instagram', type: 'views', name: '2000 Instagram Views', count: 2000, price: 6.99, popular: false },
  { id: 'ig-v-3000', platform: 'instagram', type: 'views', name: '3000 Instagram Views', count: 3000, price: 9.99, popular: false },
  { id: 'ig-v-5000', platform: 'instagram', type: 'views', name: '5000 Instagram Views', count: 5000, price: 14.99, popular: false },
  { id: 'ig-v-10000', platform: 'instagram', type: 'views', name: '10000 Instagram Views', count: 10000, price: 24.99, popular: false },
  { id: 'ig-v-25000', platform: 'instagram', type: 'views', name: '25000 Instagram Views', count: 25000, price: 44.99, popular: false },

  // Instagram Comments — not on BoostLikes AU IG price page; keep prior catalog
  {
    id: 'ig-c-10',
    platform: 'instagram',
    type: 'comments',
    name: '10 High Quality Instagram Comments',
    count: 10,
    price: 13.47,
    compareAtPrice: 14.97,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-25',
    platform: 'instagram',
    type: 'comments',
    name: '25 High Quality Instagram Comments',
    count: 25,
    price: 29.99,
    compareAtPrice: 40.53,
    popular: true,
    commentType: 'High Quality',
    features: [...HQ_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-50',
    platform: 'instagram',
    type: 'comments',
    name: '50 High Quality Instagram Comments',
    count: 50,
    price: 54.47,
    compareAtPrice: 93.91,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-75',
    platform: 'instagram',
    type: 'comments',
    name: '75 High Quality Instagram Comments',
    count: 75,
    price: 74.99,
    compareAtPrice: 178.55,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-100',
    platform: 'instagram',
    type: 'comments',
    name: '100 High Quality Instagram Comments',
    count: 100,
    price: 99.47,
    compareAtPrice: 397.88,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-p-5',
    platform: 'instagram',
    type: 'comments',
    name: '5 Premium Instagram Comments',
    count: 5,
    price: 9.99,
    compareAtPrice: 11.1,
    popular: false,
    commentType: 'Premium',
    features: [...PREMIUM_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-p-10',
    platform: 'instagram',
    type: 'comments',
    name: '10 Premium Instagram Comments',
    count: 10,
    price: 19.47,
    compareAtPrice: 28.63,
    popular: true,
    commentType: 'Premium',
    features: [...PREMIUM_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-p-25',
    platform: 'instagram',
    type: 'comments',
    name: '25 Premium Instagram Comments',
    count: 25,
    price: 47.99,
    compareAtPrice: 104.33,
    popular: false,
    commentType: 'Premium',
    features: [...PREMIUM_COMMENT_FEATURES],
  },
  {
    id: 'ig-c-p-50',
    platform: 'instagram',
    type: 'comments',
    name: '50 Premium Instagram Comments',
    count: 50,
    price: 95.47,
    compareAtPrice: 381.88,
    popular: false,
    commentType: 'Premium',
    features: [...PREMIUM_COMMENT_FEATURES],
  },

  // TikTok Followers — BoostLikes AU
  { id: 'tt-f-100', platform: 'tiktok', type: 'followers', name: '100 TikTok Followers', count: 100, price: 2.99, popular: false },
  { id: 'tt-f-250', platform: 'tiktok', type: 'followers', name: '250 TikTok Followers', count: 250, price: 4.99, popular: false },
  { id: 'tt-f-500', platform: 'tiktok', type: 'followers', name: '500 TikTok Followers', count: 500, price: 8.99, popular: false },
  { id: 'tt-f-1000', platform: 'tiktok', type: 'followers', name: '1000 TikTok Followers', count: 1000, price: 14.99, popular: true },
  { id: 'tt-f-3000', platform: 'tiktok', type: 'followers', name: '3000 TikTok Followers', count: 3000, price: 34.99, popular: false },
  { id: 'tt-f-5000', platform: 'tiktok', type: 'followers', name: '5000 TikTok Followers', count: 5000, price: 59.99, popular: false },
  { id: 'tt-f-10000', platform: 'tiktok', type: 'followers', name: '10000 TikTok Followers', count: 10000, price: 119.99, popular: false },
  { id: 'tt-f-15000', platform: 'tiktok', type: 'followers', name: '15000 TikTok Followers', count: 15000, price: 169.99, popular: false },

  // TikTok Likes — BoostLikes AU (no bundled views)
  { id: 'tt-l-100', platform: 'tiktok', type: 'likes', name: '100 TikTok Likes', count: 100, price: 2.99, popular: false },
  { id: 'tt-l-250', platform: 'tiktok', type: 'likes', name: '250 TikTok Likes', count: 250, price: 4.99, popular: false },
  { id: 'tt-l-500', platform: 'tiktok', type: 'likes', name: '500 TikTok Likes', count: 500, price: 8.99, popular: false },
  { id: 'tt-l-1000', platform: 'tiktok', type: 'likes', name: '1000 TikTok Likes', count: 1000, price: 14.99, popular: true },
  { id: 'tt-l-3000', platform: 'tiktok', type: 'likes', name: '3000 TikTok Likes', count: 3000, price: 34.99, popular: false },
  { id: 'tt-l-5000', platform: 'tiktok', type: 'likes', name: '5000 TikTok Likes', count: 5000, price: 59.99, popular: false },
  { id: 'tt-l-10000', platform: 'tiktok', type: 'likes', name: '10000 TikTok Likes', count: 10000, price: 119.99, popular: false },
  { id: 'tt-l-15000', platform: 'tiktok', type: 'likes', name: '15000 TikTok Likes', count: 15000, price: 169.99, popular: false },

  // TikTok Views — not listed on BoostLikes AU TikTok page; keep prior HQ/Premium catalog
  {
    id: 'tt-v-hq-1000',
    platform: 'tiktok',
    type: 'views',
    name: '1000 High Quality TikTok Views',
    count: 1000,
    price: 1.99,
    compareAtPrice: 2.49,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-hq-2000',
    platform: 'tiktok',
    type: 'views',
    name: '2000 High Quality TikTok Views',
    count: 2000,
    price: 2.99,
    compareAtPrice: 3.99,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-hq-5000',
    platform: 'tiktok',
    type: 'views',
    name: '5000 High Quality TikTok Views',
    count: 5000,
    price: 5.49,
    compareAtPrice: 7.49,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-hq-10000',
    platform: 'tiktok',
    type: 'views',
    name: '10000 High Quality TikTok Views',
    count: 10000,
    price: 9.99,
    compareAtPrice: 14.99,
    popular: false,
    commentType: 'High Quality',
    features: [...HQ_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-hq-50000',
    platform: 'tiktok',
    type: 'views',
    name: '50000 High Quality TikTok Views',
    count: 50000,
    price: 34.99,
    compareAtPrice: 69.99,
    popular: true,
    commentType: 'High Quality',
    features: [...HQ_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-prem-1000',
    platform: 'tiktok',
    type: 'views',
    name: '1000 Premium TikTok Views',
    count: 1000,
    price: 3.99,
    compareAtPrice: 4.99,
    popular: false,
    commentType: 'Premium',
    features: [...PREMIUM_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-prem-2000',
    platform: 'tiktok',
    type: 'views',
    name: '2000 Premium TikTok Views',
    count: 2000,
    price: 5.99,
    compareAtPrice: 9.98,
    popular: false,
    commentType: 'Premium',
    features: [...PREMIUM_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-prem-5000',
    platform: 'tiktok',
    type: 'views',
    name: '5000 Premium TikTok Views',
    count: 5000,
    price: 10.99,
    compareAtPrice: 24.95,
    popular: false,
    commentType: 'Premium',
    features: [...PREMIUM_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-prem-10000',
    platform: 'tiktok',
    type: 'views',
    name: '10000 Premium TikTok Views',
    count: 10000,
    price: 19.99,
    compareAtPrice: 49.9,
    popular: true,
    commentType: 'Premium',
    features: [...PREMIUM_TIKTOK_VIEWS_FEATURES],
  },
  {
    id: 'tt-v-prem-50000',
    platform: 'tiktok',
    type: 'views',
    name: '50000 Premium TikTok Views',
    count: 50000,
    price: 69.98,
    compareAtPrice: 249.5,
    popular: false,
    commentType: 'Premium',
    features: [...PREMIUM_TIKTOK_VIEWS_FEATURES],
  },

  // YouTube Subscribers — BoostLikes AU
  { id: 'yt-s-100', platform: 'youtube', type: 'subscribers', name: '100 YouTube Subscribers', count: 100, price: 9.99, popular: false },
  { id: 'yt-s-200', platform: 'youtube', type: 'subscribers', name: '200 YouTube Subscribers', count: 200, price: 17.99, popular: false },
  { id: 'yt-s-500', platform: 'youtube', type: 'subscribers', name: '500 YouTube Subscribers', count: 500, price: 40.99, popular: true },
  { id: 'yt-s-1000', platform: 'youtube', type: 'subscribers', name: '1000 YouTube Subscribers', count: 1000, price: 75.99, popular: false },
  { id: 'yt-s-2000', platform: 'youtube', type: 'subscribers', name: '2000 YouTube Subscribers', count: 2000, price: 110.99, popular: false },
  { id: 'yt-s-3000', platform: 'youtube', type: 'subscribers', name: '3000 YouTube Subscribers', count: 3000, price: 139.99, popular: false },
  { id: 'yt-s-5000', platform: 'youtube', type: 'subscribers', name: '5000 YouTube Subscribers', count: 5000, price: 199.99, popular: false },

  // YouTube Views — BoostLikes AU
  { id: 'yt-v-2500', platform: 'youtube', type: 'views', name: '2500 YouTube Views', count: 2500, price: 13.99, popular: false },
  { id: 'yt-v-5000', platform: 'youtube', type: 'views', name: '5000 YouTube Views', count: 5000, price: 26.99, popular: true },
  { id: 'yt-v-10000', platform: 'youtube', type: 'views', name: '10000 YouTube Views', count: 10000, price: 48.99, popular: false },
  { id: 'yt-v-20000', platform: 'youtube', type: 'views', name: '20000 YouTube Views', count: 20000, price: 79.99, popular: false },

  // Facebook Page Likes — BoostLikes AU
  { id: 'fb-pl-100', platform: 'facebook', type: 'page-likes', name: '100 Facebook Page Likes', count: 100, price: 2.99, popular: false },
  { id: 'fb-pl-250', platform: 'facebook', type: 'page-likes', name: '250 Facebook Page Likes', count: 250, price: 4.99, popular: false },
  { id: 'fb-pl-500', platform: 'facebook', type: 'page-likes', name: '500 Facebook Page Likes', count: 500, price: 8.99, popular: false },
  { id: 'fb-pl-1000', platform: 'facebook', type: 'page-likes', name: '1000 Facebook Page Likes', count: 1000, price: 14.99, popular: true },
  { id: 'fb-pl-2500', platform: 'facebook', type: 'page-likes', name: '2500 Facebook Page Likes', count: 2500, price: 26.99, popular: false },
  { id: 'fb-pl-5000', platform: 'facebook', type: 'page-likes', name: '5000 Facebook Page Likes', count: 5000, price: 39.99, popular: false },
  { id: 'fb-pl-10000', platform: 'facebook', type: 'page-likes', name: '10000 Facebook Page Likes', count: 10000, price: 69.99, popular: false },
  { id: 'fb-pl-15000', platform: 'facebook', type: 'page-likes', name: '15000 Facebook Page Likes', count: 15000, price: 99.99, popular: false },

  // Facebook Followers — BoostLikes AU
  { id: 'fb-f-100', platform: 'facebook', type: 'followers', name: '100 Facebook Followers', count: 100, price: 4.99, popular: false },
  { id: 'fb-f-250', platform: 'facebook', type: 'followers', name: '250 Facebook Followers', count: 250, price: 9.99, popular: false },
  { id: 'fb-f-500', platform: 'facebook', type: 'followers', name: '500 Facebook Followers', count: 500, price: 16.99, popular: false },
  { id: 'fb-f-1000', platform: 'facebook', type: 'followers', name: '1000 Facebook Followers', count: 1000, price: 26.99, popular: true },
  { id: 'fb-f-2500', platform: 'facebook', type: 'followers', name: '2500 Facebook Followers', count: 2500, price: 49.99, popular: false },
  { id: 'fb-f-5000', platform: 'facebook', type: 'followers', name: '5000 Facebook Followers', count: 5000, price: 84.99, popular: false },
  { id: 'fb-f-10000', platform: 'facebook', type: 'followers', name: '10000 Facebook Followers', count: 10000, price: 149.99, popular: false },
  { id: 'fb-f-15000', platform: 'facebook', type: 'followers', name: '15000 Facebook Followers', count: 15000, price: 199.99, popular: false },

  // Facebook Post Likes — BoostLikes AU
  { id: 'fb-post-100', platform: 'facebook', type: 'post-likes', name: '100 Facebook Post Likes', count: 100, price: 2.99, popular: false },
  { id: 'fb-post-250', platform: 'facebook', type: 'post-likes', name: '250 Facebook Post Likes', count: 250, price: 4.99, popular: false },
  { id: 'fb-post-500', platform: 'facebook', type: 'post-likes', name: '500 Facebook Post Likes', count: 500, price: 8.99, popular: false },
  { id: 'fb-post-1000', platform: 'facebook', type: 'post-likes', name: '1000 Facebook Post Likes', count: 1000, price: 14.99, popular: true },
  { id: 'fb-post-2500', platform: 'facebook', type: 'post-likes', name: '2500 Facebook Post Likes', count: 2500, price: 26.99, popular: false },
  { id: 'fb-post-5000', platform: 'facebook', type: 'post-likes', name: '5000 Facebook Post Likes', count: 5000, price: 39.99, popular: false },
  { id: 'fb-post-10000', platform: 'facebook', type: 'post-likes', name: '10000 Facebook Post Likes', count: 10000, price: 69.99, popular: false },
  { id: 'fb-post-15000', platform: 'facebook', type: 'post-likes', name: '15000 Facebook Post Likes', count: 15000, price: 99.99, popular: false },
];

export function getNovaLikesProductsByPlatformType(
  platform: PlatformId,
  type: ServiceCategory,
): NovaLikesProduct[] {
  return NOVALIKES_PRODUCTS.filter(
    (product) => product.platform === platform && product.type === type,
  );
}

export function getNovaLikesProductById(id: string): NovaLikesProduct | undefined {
  return NOVALIKES_PRODUCTS.find((product) => product.id === id);
}
