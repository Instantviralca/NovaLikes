/**
 * Author System config — Document 15.03.
 */

export const AUTHOR_PATH_PREFIX = '/authors' as const;

export const AUTHOR_INDEX_SEO = {
  title: 'Authors | NovaLikes Learn',
  description:
    'Meet NovaLikes Learn contributors. Profiles appear here when authors are published.',
  canonicalPath: AUTHOR_PATH_PREFIX,
} as const;
