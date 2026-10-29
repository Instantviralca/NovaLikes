import type { ServiceV2Content } from '../../types';
import { IT_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { IT_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { IT_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { IT_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { IT_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { IT_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { IT_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { IT_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { IT_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { IT_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** Italian (/it) service pages that use the v2 template. Keyed by the ENGLISH core slug; the route keeps its Italian slug. */
export const SERVICE_V2_IT_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': IT_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': IT_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': IT_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': IT_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': IT_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': IT_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': IT_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': IT_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': IT_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': IT_BUY_FACEBOOK_POST_LIKES_V2,
};
