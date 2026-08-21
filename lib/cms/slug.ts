import { LEARN_ARTICLES } from '@/data/learn/articles';
import { isLearnCategorySlug } from '@/data/learn/categories';
import { LEARN_TAGS } from '@/data/learn/tags';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export function isValidArticleSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug) && slug.length >= 3 && slug.length <= 80;
}

export function isReservedLearnSlug(slug: string): boolean {
  if (isLearnCategorySlug(slug)) return true;
  if (LEARN_TAGS.some((tag) => tag.slug === slug)) return true;
  if (['preview', 'tag', 'authors', 'search'].includes(slug)) return true;
  return LEARN_ARTICLES.some((article) => article.slug === slug);
}
