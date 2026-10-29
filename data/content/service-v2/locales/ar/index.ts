import type { ServiceV2Content } from '../../types';
import { AR_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { AR_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { AR_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { AR_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { AR_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { AR_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { AR_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { AR_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { AR_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { AR_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** Arabic (/ar) service pages that use the v2 template. Keyed by the ENGLISH core slug; the route keeps its Arabic route slug. */
export const SERVICE_V2_AR_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': AR_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': AR_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': AR_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': AR_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': AR_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': AR_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': AR_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': AR_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': AR_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': AR_BUY_FACEBOOK_POST_LIKES_V2,
};
