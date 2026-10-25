import type { ServiceV2Content } from '../../types';
import { CA_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { CA_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { CA_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { CA_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { CA_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { CA_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { CA_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { CA_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { CA_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { CA_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** Canada market service pages (/ca/<slug>) that use the v2 template. */
export const SERVICE_V2_CA_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': CA_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': CA_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': CA_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': CA_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': CA_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': CA_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': CA_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': CA_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': CA_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': CA_BUY_FACEBOOK_POST_LIKES_V2,
};
