import type { ServiceV2Content } from './types';
import { BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** English default service pages that use the v2 template. */
export const SERVICE_V2_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': BUY_FACEBOOK_POST_LIKES_V2,
};

export function getServiceV2Content(slug: string): ServiceV2Content | undefined {
  return SERVICE_V2_CONTENT[slug];
}

export { SERVICE_V2_UK_CONTENT } from './markets/uk';
export { SERVICE_V2_CA_CONTENT } from './markets/ca';
export { SERVICE_V2_AU_CONTENT } from './markets/au';
export { getServiceV2MarketContent } from './markets';
export { SERVICE_V2_DE_CONTENT, getServiceV2LocaleContent } from './locales/de';
export { SERVICE_V2_ES_CONTENT } from './locales/es';
export { SERVICE_V2_FR_CONTENT } from './locales/fr';
export { SERVICE_V2_IT_CONTENT } from './locales/it';
