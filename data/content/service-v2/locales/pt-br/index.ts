import type { ServiceV2Content } from '../../types';
import { PT_BR_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { PT_BR_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { PT_BR_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { PT_BR_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { PT_BR_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { PT_BR_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { PT_BR_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { PT_BR_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { PT_BR_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { PT_BR_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** Brazilian Portuguese (/pt-br) service pages that use the v2 template. Keyed by the ENGLISH core slug; the route keeps its Portuguese slug. */
export const SERVICE_V2_PT_BR_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': PT_BR_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': PT_BR_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': PT_BR_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': PT_BR_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': PT_BR_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': PT_BR_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': PT_BR_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': PT_BR_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': PT_BR_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': PT_BR_BUY_FACEBOOK_POST_LIKES_V2,
};
