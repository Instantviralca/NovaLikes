/**
 * Learn articles registry — Document 15.01.
 * Published Learn Center articles only — no placeholders.
 *
 * Add new manually written articles here when editorial approves them.
 * Each entry should be a LearnArticleRecord (≈1000–2000 words).
 *
 * To publish a new article:
 * 1. Create data/learn/articles/<slug>.ts exporting *_ARTICLE
 * 2. Import it below and add it to LEARN_ARTICLES
 * 3. Add images under public/assets/images/learn/<slug>/
 */

import { TIKTOK_FOLLOWERS_VS_LIKES_VS_VIEWS_ARTICLE } from '@/data/learn/articles/tiktok-followers-vs-likes-vs-views';
import { TIKTOK_VIEWS_BUT_NO_FOLLOWERS_ARTICLE } from '@/data/learn/articles/tiktok-views-but-no-followers';
import { INSTAGRAM_FOLLOWERS_VS_LIKES_VS_VIEWS_VS_COMMENTS_ARTICLE } from '@/data/learn/articles/instagram-followers-vs-likes-vs-views-vs-comments';
import { TIKTOK_SEO_ARTICLE } from '@/data/learn/articles/tiktok-seo';
import { HOW_INSTAGRAM_ALGORITHM_WORKS_ARTICLE } from '@/data/learn/articles/how-instagram-algorithm-works';
import { FACEBOOK_FOLLOWERS_VS_PAGE_LIKES_VS_POST_LIKES_ARTICLE } from '@/data/learn/articles/facebook-followers-vs-page-likes-vs-post-likes';
import { BUYING_TIKTOK_FOLLOWERS_FYP_ACCOUNT_SAFETY_ARTICLE } from '@/data/learn/articles/buying-tiktok-followers-fyp-account-safety';
import { WHY_INSTAGRAM_FOLLOWERS_DROP_ARTICLE } from '@/data/learn/articles/why-instagram-followers-drop';
import { HOW_FACEBOOK_PAGE_REACH_WORKS_ARTICLE } from '@/data/learn/articles/how-facebook-page-reach-works';
import { HOW_TIKTOK_VIDEO_VIEWS_ARE_COUNTED_ARTICLE } from '@/data/learn/articles/how-tiktok-video-views-are-counted';
import { HOW_INSTAGRAM_REELS_VIEWS_ARE_COUNTED_ARTICLE } from '@/data/learn/articles/how-instagram-reels-views-are-counted';
import { HOW_TO_GET_MORE_FACEBOOK_PAGE_FOLLOWERS_ARTICLE } from '@/data/learn/articles/how-to-get-more-facebook-page-followers';
import { PUBLIC_VS_PRIVATE_TIKTOK_ACCOUNT_ARTICLE } from '@/data/learn/articles/public-vs-private-tiktok-account';
import { PUBLIC_VS_PRIVATE_INSTAGRAM_ACCOUNT_ARTICLE } from '@/data/learn/articles/public-vs-private-instagram-account';
import { HOW_TO_GET_MORE_LIKES_ON_FACEBOOK_POST_ARTICLE } from '@/data/learn/articles/how-to-get-more-likes-on-facebook-post';
import { HOW_TO_GET_1000_TIKTOK_FOLLOWERS_ARTICLE } from '@/data/learn/articles/how-to-get-1000-tiktok-followers';
import { HOW_TO_GROW_INSTAGRAM_FOLLOWERS_ORGANICALLY_ARTICLE } from '@/data/learn/articles/how-to-grow-instagram-followers-organically';
import { WHY_FACEBOOK_PAGE_FOLLOWERS_DROP_ARTICLE } from '@/data/learn/articles/why-facebook-page-followers-drop';
import { HOW_MANY_FOLLOWERS_TO_GO_LIVE_ON_TIKTOK_ARTICLE } from '@/data/learn/articles/how-many-followers-to-go-live-on-tiktok';
import { VIEW_INSTAGRAM_PROFILE_PICTURE_FULL_SIZE_ARTICLE } from '@/data/learn/articles/view-instagram-profile-picture-full-size';
import { HOW_TO_DOWNLOAD_FACEBOOK_VIDEO_ARTICLE } from '@/data/learn/articles/how-to-download-facebook-video';
import { WHY_TIKTOK_FOLLOWERS_DROP_ARTICLE } from '@/data/learn/articles/why-tiktok-followers-drop';
import { CHECK_INSTAGRAM_FOLLOWER_COUNT_WITHOUT_LOGIN_ARTICLE } from '@/data/learn/articles/check-instagram-follower-count-without-login';
import { HOW_TO_DOWNLOAD_FACEBOOK_REEL_ARTICLE } from '@/data/learn/articles/how-to-download-facebook-reel';
import { TIKTOK_LIKES_VS_VIEWS_ARTICLE } from '@/data/learn/articles/tiktok-likes-vs-views';
import { VIEW_INSTAGRAM_PROFILE_WITHOUT_LOGIN_ARTICLE } from '@/data/learn/articles/view-instagram-profile-without-login';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import type { LearnArticleRecord } from '@/types/learn';

export const LEARN_ARTICLES: readonly LearnArticleRecord[] = [
  TIKTOK_FOLLOWERS_VS_LIKES_VS_VIEWS_ARTICLE,
  TIKTOK_VIEWS_BUT_NO_FOLLOWERS_ARTICLE,
  INSTAGRAM_FOLLOWERS_VS_LIKES_VS_VIEWS_VS_COMMENTS_ARTICLE,
  TIKTOK_SEO_ARTICLE,
  HOW_INSTAGRAM_ALGORITHM_WORKS_ARTICLE,
  FACEBOOK_FOLLOWERS_VS_PAGE_LIKES_VS_POST_LIKES_ARTICLE,
  BUYING_TIKTOK_FOLLOWERS_FYP_ACCOUNT_SAFETY_ARTICLE,
  WHY_INSTAGRAM_FOLLOWERS_DROP_ARTICLE,
  HOW_FACEBOOK_PAGE_REACH_WORKS_ARTICLE,
  HOW_TIKTOK_VIDEO_VIEWS_ARE_COUNTED_ARTICLE,
  HOW_INSTAGRAM_REELS_VIEWS_ARE_COUNTED_ARTICLE,
  HOW_TO_GET_MORE_FACEBOOK_PAGE_FOLLOWERS_ARTICLE,
  PUBLIC_VS_PRIVATE_TIKTOK_ACCOUNT_ARTICLE,
  PUBLIC_VS_PRIVATE_INSTAGRAM_ACCOUNT_ARTICLE,
  HOW_TO_GET_MORE_LIKES_ON_FACEBOOK_POST_ARTICLE,
  HOW_TO_GET_1000_TIKTOK_FOLLOWERS_ARTICLE,
  HOW_TO_GROW_INSTAGRAM_FOLLOWERS_ORGANICALLY_ARTICLE,
  WHY_FACEBOOK_PAGE_FOLLOWERS_DROP_ARTICLE,
  HOW_MANY_FOLLOWERS_TO_GO_LIVE_ON_TIKTOK_ARTICLE,
  VIEW_INSTAGRAM_PROFILE_PICTURE_FULL_SIZE_ARTICLE,
  HOW_TO_DOWNLOAD_FACEBOOK_VIDEO_ARTICLE,
  WHY_TIKTOK_FOLLOWERS_DROP_ARTICLE,
  CHECK_INSTAGRAM_FOLLOWER_COUNT_WITHOUT_LOGIN_ARTICLE,
  HOW_TO_DOWNLOAD_FACEBOOK_REEL_ARTICLE,
  TIKTOK_LIKES_VS_VIEWS_ARTICLE,
  VIEW_INSTAGRAM_PROFILE_WITHOUT_LOGIN_ARTICLE,
];

export function getAllLearnArticleRecords(): LearnArticleRecord[] {
  return [...LEARN_ARTICLES];
}

/** Live public articles only (`published` | `updated`). */
export function getPublishedLearnArticleRecords(): LearnArticleRecord[] {
  return LEARN_ARTICLES.filter(isPublicLiveArticle);
}

export function getLearnArticleRecordBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find((article) => article.slug === slug);
}

export function getPublishedLearnArticleBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find(
    (article) => article.slug === slug && isPublicLiveArticle(article),
  );
}

export function getDraftLearnArticleBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find(
    (article) => article.slug === slug && article.status === 'draft',
  );
}

export function getFeaturedLearnArticles(): LearnArticleRecord[] {
  return getPublishedLearnArticleRecords().filter((article) => article.featured);
}

export function getLearnArticlesByCategory(
  categoryId: string,
): LearnArticleRecord[] {
  return getPublishedLearnArticleRecords().filter(
    (article) => article.category === categoryId,
  );
}

export function getPublishedLearnArticleSlugs(): string[] {
  return getPublishedLearnArticleRecords().map((article) => article.slug);
}
