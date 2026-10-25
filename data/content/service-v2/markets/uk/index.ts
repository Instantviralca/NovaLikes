import type { ServiceV2Content } from '../../types';
import { UK_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { UK_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { UK_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { UK_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { UK_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { UK_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { UK_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { UK_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { UK_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { UK_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** UK market service pages (/uk/<slug>) that use the v2 template. */
export const SERVICE_V2_UK_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': UK_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': UK_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': UK_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': UK_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': UK_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': UK_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': UK_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': UK_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': UK_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': UK_BUY_FACEBOOK_POST_LIKES_V2,
};
