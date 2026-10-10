/**
 * Learn corpus expectations shared by tests.
 *
 * The 26 launch articles are dated 22 Aug 2026. Articles added later keep
 * their real publication date and are listed here. When you add a new Learn
 * article, add its slug to POST_LAUNCH_LEARN_SLUGS — every count-based test
 * reads from this file, so no other test needs a number changed.
 */
export const LAUNCH_LEARN_ARTICLE_COUNT = 26;

export const POST_LAUNCH_LEARN_SLUGS = [
  'why-does-my-tiktok-have-0-views',
  'how-to-reset-tiktok-fyp',
  'how-many-followers-to-make-money-on-tiktok',
  'how-to-get-more-views-on-tiktok',
] as const;

export const EXPECTED_LIVE_LEARN_ARTICLE_COUNT =
  LAUNCH_LEARN_ARTICLE_COUNT + POST_LAUNCH_LEARN_SLUGS.length;

/**
 * Launch articles that received a meaningful content revision after launch.
 * Each keeps its 22 Aug 2026 publishedAt, sets showModifiedDate: true and uses
 * the revision date below as updatedAt (schema dateModified, OG modifiedTime
 * and sitemap lastmod). Add a slug here only after a real content revision.
 */
export const REVISED_LAUNCH_LEARN_ARTICLES: Readonly<Record<string, string>> = {
  'tiktok-likes-vs-views': '2026-10-10T20:00:00.000Z',
  'view-instagram-profile-without-login': '2026-10-10T20:00:00.000Z',
  'check-instagram-follower-count-without-login': '2026-10-10T20:00:00.000Z',
  'how-to-download-facebook-video': '2026-10-10T20:00:00.000Z',
  'how-to-download-facebook-reel': '2026-10-10T20:00:00.000Z',
  'view-instagram-profile-picture-full-size': '2026-10-10T20:00:00.000Z',
  'how-many-followers-to-go-live-on-tiktok': '2026-10-10T20:00:00.000Z',
  'why-tiktok-followers-drop': '2026-10-10T20:00:00.000Z',
};
