/**
 * Najaf Khan — Learn Center author (Social Media Growth Expert at NovaLikes).
 * Public profile only. No invented credentials.
 */

import type { AuthorRecord } from '@/types/author';

const AVATAR = '/assets/images/authors/najaf-khan.png';

export const NAJAF_KHAN: AuthorRecord = {
  id: 'author-novalikes-editorial',
  slug: 'najaf-khan',
  name: 'Najaf Khan',
  role: 'Social Media Growth Expert at NovaLikes',
  bio: 'Najaf Khan is a Social Media Growth Expert at NovaLikes and an SEO specialist who has handled Instagram, TikTok and Facebook growth services for 7–8 years. He works with DMRUSH LIMITED, the company that operates NovaLikes, and has worked with major brands and several public figures on growing their social media presence; client names are kept confidential out of respect for their privacy. He writes the Learn Center guides on content, growth and how platform metrics actually work.',
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
    'SEO',
  ],
  joinedAt: '2023-06-01T00:00:00.000Z',
  active: true,
  featured: true,
  seo: {
    title: 'Najaf Khan | NovaLikes Authors',
    description:
      'Najaf Khan is a Social Media Growth Expert at NovaLikes with 7–8 years of experience in social media growth services, including work with major brands and public figures.',
    canonicalPath: '/authors/najaf-khan',
    ogImage: AVATAR,
  },
};

/** @deprecated Use NAJAF_KHAN. Kept so existing article authorId imports still resolve. */
export const NOVALIKES_EDITORIAL_TEAM = NAJAF_KHAN;
