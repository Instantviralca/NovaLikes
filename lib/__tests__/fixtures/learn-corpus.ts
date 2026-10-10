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
