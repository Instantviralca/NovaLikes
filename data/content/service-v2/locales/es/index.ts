import type { ServiceV2Content } from '../../types';
import { ES_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { ES_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { ES_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { ES_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { ES_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { ES_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { ES_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { ES_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { ES_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { ES_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** Spanish (/es) service pages that use the v2 template. Keyed by the ENGLISH core slug; the route keeps its Spanish slug. */
export const SERVICE_V2_ES_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': ES_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': ES_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': ES_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': ES_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': ES_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': ES_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': ES_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': ES_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': ES_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': ES_BUY_FACEBOOK_POST_LIKES_V2,
};
