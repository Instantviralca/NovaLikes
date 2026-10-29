import type { ServiceV2Content } from '../../types';
import { FR_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { FR_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { FR_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { FR_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { FR_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { FR_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { FR_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { FR_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { FR_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { FR_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** French (/fr) service pages that use the v2 template. Keyed by the ENGLISH core slug; the route keeps its French slug. */
export const SERVICE_V2_FR_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': FR_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': FR_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': FR_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': FR_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': FR_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': FR_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': FR_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': FR_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': FR_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': FR_BUY_FACEBOOK_POST_LIKES_V2,
};
