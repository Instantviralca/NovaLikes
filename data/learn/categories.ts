/**
 * Learn category registry — Documents 15.01 + 15.04.
 * Single source of truth. News is inactive (future) until approved.
 */

import type { LearnCategory } from '@/types/learn';

const CREATED = '2024-01-01T00:00:00.000Z';
const UPDATED = '2024-01-01T00:00:00.000Z';

export const LEARN_CATEGORIES: readonly LearnCategory[] = [
  {
    id: 'instagram',
    slug: 'instagram',
    name: 'Instagram',
    description: 'Guides and strategies for growing on Instagram.',
    platformId: 'instagram',
    active: true,
    status: 'active',
    featured: true,
    order: 1,
    createdAt: CREATED,
    updatedAt: UPDATED,
    icon: 'instagram',
    seo: {
      title: 'Instagram Guides | Learn | NovaLikes',
      description:
        'Learn Instagram growth strategies, content tips, and engagement best practices.',
      canonicalPath: '/learn/instagram',
      keywords: ['instagram', 'instagram growth', 'instagram guides'],
    },
  },
  {
    id: 'tiktok',
    slug: 'tiktok',
    name: 'TikTok',
    description: 'Guides and strategies for growing on TikTok.',
    platformId: 'tiktok',
    active: true,
    status: 'active',
    featured: true,
    order: 2,
    createdAt: CREATED,
    updatedAt: UPDATED,
    icon: 'tiktok',
    seo: {
      title: 'TikTok Guides | Learn | NovaLikes',
      description:
        'Learn TikTok growth strategies, short-form tips, and audience building.',
      canonicalPath: '/learn/tiktok',
      keywords: ['tiktok', 'tiktok growth', 'tiktok guides'],
    },
  },
  {
    id: 'facebook',
    slug: 'facebook',
    name: 'Facebook',
    description: 'Guides and strategies for growing on Facebook.',
    platformId: 'facebook',
    active: true,
    status: 'active',
    featured: false,
    order: 3,
    createdAt: CREATED,
    updatedAt: UPDATED,
    icon: 'facebook',
    seo: {
      title: 'Facebook Guides | Learn | NovaLikes',
      description:
        'Learn Facebook page growth, engagement, and content strategies.',
      canonicalPath: '/learn/facebook',
      keywords: ['facebook', 'facebook growth', 'facebook guides'],
    },
  },
  {
    id: 'youtube',
    slug: 'youtube',
    name: 'YouTube',
    description: 'Legacy Learn category — not offered on NovaLikes.',
    platformId: 'youtube',
    active: false,
    status: 'future',
    featured: false,
    order: 4,
    createdAt: CREATED,
    updatedAt: UPDATED,
    icon: 'youtube',
    seo: {
      title: 'YouTube Guides | Learn | NovaLikes',
      description:
        'Learn YouTube channel growth, watch-time tips, and content planning.',
      canonicalPath: '/learn/youtube',
      keywords: ['youtube', 'youtube growth', 'youtube guides'],
    },
  },
  {
    id: 'social-media-marketing',
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    description: 'Cross-platform marketing strategy and growth frameworks.',
    active: true,
    status: 'active',
    featured: false,
    order: 5,
    createdAt: CREATED,
    updatedAt: UPDATED,
    icon: 'marketing',
    seo: {
      title: 'Social Media Marketing | Learn | NovaLikes',
      description:
        'Learn social media marketing fundamentals across major platforms.',
      canonicalPath: '/learn/social-media-marketing',
      keywords: ['social media marketing', 'marketing strategy'],
    },
  },
  {
    id: 'guides',
    slug: 'guides',
    name: 'Guides',
    description: 'Step-by-step NovaLikes learning guides.',
    active: true,
    status: 'active',
    featured: false,
    order: 6,
    createdAt: CREATED,
    updatedAt: UPDATED,
    icon: 'guides',
    seo: {
      title: 'Guides | Learn | NovaLikes',
      description: 'Practical how-to guides for social growth and NovaLikes.',
      canonicalPath: '/learn/guides',
      keywords: ['guides', 'how to', 'social growth'],
    },
  },
  {
    id: 'news',
    slug: 'news',
    name: 'News',
    description: 'Product and industry updates. Coming soon.',
    active: false,
    status: 'future',
    featured: false,
    order: 7,
    createdAt: CREATED,
    updatedAt: UPDATED,
    icon: 'news',
    seo: {
      title: 'News | Learn | NovaLikes',
      description: 'NovaLikes news and social platform updates.',
      canonicalPath: '/learn/news',
      keywords: ['news', 'updates'],
    },
  },
];

export function getLearnCategoryBySlug(slug: string): LearnCategory | undefined {
  return LEARN_CATEGORIES.find((category) => category.slug === slug);
}

export function getLearnCategoryById(id: string): LearnCategory | undefined {
  return LEARN_CATEGORIES.find((category) => category.id === id);
}

export function getActiveLearnCategories(): LearnCategory[] {
  return LEARN_CATEGORIES.filter((category) => category.active).sort(
    (a, b) => a.order - b.order,
  );
}

export function getLearnCategorySlugs(includeInactive = false): string[] {
  return LEARN_CATEGORIES.filter(
    (category) => includeInactive || category.active,
  ).map((category) => category.slug);
}

export function isLearnCategorySlug(slug: string): boolean {
  return LEARN_CATEGORIES.some((category) => category.slug === slug);
}
