/**
 * Najaf Khan — Learn Center author.
 * Public profile only. No invented credentials.
 */

import type { AuthorRecord } from '@/types/author';

const AVATAR = '/assets/images/authors/najaf-khan.png';

export const NAJAF_KHAN: AuthorRecord = {
  id: 'author-novalikes-editorial',
  slug: 'najaf-khan',
  name: 'Najaf Khan',
  role: 'Founder and Social Media Growth Strategist',
  bio: 'Najaf Khan is the founder of NovaLikes and a social media growth strategist who helps creators, brands, and businesses grow on Instagram, TikTok, and Facebook. He shares practical insights on content, growth, and scaling so people can build real visibility and long-term results.',
  avatar: AVATAR,
  website: 'https://vocal.media/authors/najaf-khan-4n16on01ig',
  socialLinks: {
    instagram: 'https://www.instagram.com/najaf_khan286/',
  },
  expertise: [
    'Social media growth',
    'Instagram growth',
    'TikTok growth',
    'Facebook growth',
  ],
  joinedAt: '2023-06-01T00:00:00.000Z',
  active: true,
  featured: true,
  seo: {
    title: 'Najaf Khan | NovaLikes Authors',
    description:
      'Najaf Khan is the founder of NovaLikes and a social media growth strategist who publishes practical Learn Center guides.',
    canonicalPath: '/authors/najaf-khan',
    ogImage: AVATAR,
  },
};

/** @deprecated Use NAJAF_KHAN. Kept so existing article authorId imports still resolve. */
export const NOVALIKES_EDITORIAL_TEAM = NAJAF_KHAN;
