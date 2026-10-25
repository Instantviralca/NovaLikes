import type { ServiceV2Content } from '../../types';
import { AU_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { AU_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { AU_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { AU_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { AU_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { AU_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { AU_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { AU_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { AU_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { AU_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** Australia market service pages (/au/<slug>) that use the v2 template. */
export const SERVICE_V2_AU_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': AU_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': AU_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': AU_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': AU_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': AU_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': AU_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': AU_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': AU_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': AU_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': AU_BUY_FACEBOOK_POST_LIKES_V2,
};
