/**
 * Page-specific Open Graph / Twitter images for commercial routes.
 * Fallback remains seoSiteConfig.defaultOpenGraphImage for unscoped pages.
 */

export const OPEN_GRAPH_IMAGE_WIDTH = 1200 as const;
export const OPEN_GRAPH_IMAGE_HEIGHT = 630 as const;

export type OpenGraphImageKey =
  | 'homepage'
  | 'buy-instagram-followers'
  | 'buy-instagram-likes'
  | 'buy-instagram-views'
  | 'buy-instagram-comments'
  | 'buy-tiktok-followers'
  | 'buy-tiktok-likes'
  | 'buy-tiktok-views'
  | 'buy-facebook-followers'
  | 'buy-facebook-page-likes'
  | 'buy-facebook-post-likes';

export type OpenGraphImageAsset = {
  /** Public path under /public */
  path: string;
  alt: string;
  width: typeof OPEN_GRAPH_IMAGE_WIDTH;
  height: typeof OPEN_GRAPH_IMAGE_HEIGHT;
};

const OG_DIR = '/assets/images/og' as const;

export const openGraphImagesBySlug = {
  homepage: {
    path: `${OG_DIR}/novalikes-social-media-growth-og.webp`,
    alt: 'NovaLikes social media growth services worldwide',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-followers': {
    path: `${OG_DIR}/buy-instagram-followers-global-og.webp`,
    alt: 'Buy Instagram Followers by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-likes': {
    path: `${OG_DIR}/buy-instagram-likes-global-og.webp`,
    alt: 'Buy Instagram Likes by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-views': {
    path: `${OG_DIR}/buy-instagram-views-global-og.webp`,
    alt: 'Buy Instagram Views by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-comments': {
    path: `${OG_DIR}/buy-instagram-comments-global-og.webp`,
    alt: 'Buy Instagram Comments by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-tiktok-followers': {
    path: `${OG_DIR}/buy-tiktok-followers-global-og.webp`,
    alt: 'Buy TikTok Followers by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-tiktok-likes': {
    path: `${OG_DIR}/buy-tiktok-likes-global-og.webp`,
    alt: 'Buy TikTok Likes by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-tiktok-views': {
    path: `${OG_DIR}/buy-tiktok-views-global-og.webp`,
    alt: 'Buy TikTok Views by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-facebook-followers': {
    path: `${OG_DIR}/buy-facebook-followers-global-og.webp`,
    alt: 'Buy Facebook Followers by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-facebook-page-likes': {
    path: `${OG_DIR}/buy-facebook-page-likes-global-og.webp`,
    alt: 'Buy Facebook Page Likes by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-facebook-post-likes': {
    path: `${OG_DIR}/buy-facebook-post-likes-global-og.webp`,
    alt: 'Buy Facebook Post Likes by NovaLikes',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
} as const satisfies Record<OpenGraphImageKey, OpenGraphImageAsset>;

export function getOpenGraphImageForSlug(
  slug: string,
): OpenGraphImageAsset | undefined {
  if (slug === 'homepage' || slug === '/') {
    return openGraphImagesBySlug.homepage;
  }
  const key = slug.startsWith('/') ? slug.slice(1) : slug;
  return openGraphImagesBySlug[key as OpenGraphImageKey];
}
