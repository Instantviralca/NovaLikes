import type { ServiceV2Content } from '../../types';
import { DE_BUY_INSTAGRAM_FOLLOWERS_V2 } from './buy-instagram-followers';
import { DE_BUY_INSTAGRAM_LIKES_V2 } from './buy-instagram-likes';
import { DE_BUY_INSTAGRAM_VIEWS_V2 } from './buy-instagram-views';
import { DE_BUY_INSTAGRAM_COMMENTS_V2 } from './buy-instagram-comments';
import { DE_BUY_TIKTOK_FOLLOWERS_V2 } from './buy-tiktok-followers';
import { DE_BUY_TIKTOK_LIKES_V2 } from './buy-tiktok-likes';
import { DE_BUY_TIKTOK_VIEWS_V2 } from './buy-tiktok-views';
import { DE_BUY_FACEBOOK_FOLLOWERS_V2 } from './buy-facebook-followers';
import { DE_BUY_FACEBOOK_PAGE_LIKES_V2 } from './buy-facebook-page-likes';
import { DE_BUY_FACEBOOK_POST_LIKES_V2 } from './buy-facebook-post-likes';

/** German (/de) service pages that use the v2 template. Keyed by the ENGLISH core slug; the route keeps its German slug. */
export const SERVICE_V2_DE_CONTENT: Record<string, ServiceV2Content> = {
  'buy-instagram-followers': DE_BUY_INSTAGRAM_FOLLOWERS_V2,
  'buy-instagram-likes': DE_BUY_INSTAGRAM_LIKES_V2,
  'buy-instagram-views': DE_BUY_INSTAGRAM_VIEWS_V2,
  'buy-instagram-comments': DE_BUY_INSTAGRAM_COMMENTS_V2,
  'buy-tiktok-followers': DE_BUY_TIKTOK_FOLLOWERS_V2,
  'buy-tiktok-likes': DE_BUY_TIKTOK_LIKES_V2,
  'buy-tiktok-views': DE_BUY_TIKTOK_VIEWS_V2,
  'buy-facebook-followers': DE_BUY_FACEBOOK_FOLLOWERS_V2,
  'buy-facebook-page-likes': DE_BUY_FACEBOOK_PAGE_LIKES_V2,
  'buy-facebook-post-likes': DE_BUY_FACEBOOK_POST_LIKES_V2,
};

/** German v2 copy for a core English slug. Other locales stay on their current views. */
export function getServiceV2LocaleContent(
  locale: string,
  coreSlug: string,
): ServiceV2Content | undefined {
  if (locale === 'de') return SERVICE_V2_DE_CONTENT[coreSlug];
  return undefined;
}
