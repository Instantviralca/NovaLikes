/**
 * Categories & Tags System tests — Document 15.04.
 * Article fixtures live only in tests — production LEARN_ARTICLES stays empty.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { LearnArticleRecord } from '@/types/learn';

const { mockArticles } = vi.hoisted(() => {
  const articles: LearnArticleRecord[] = [];
  return { mockArticles: articles };
});

vi.mock('@/data/learn/articles', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/learn/articles')>();
  return {
    ...actual,
    get LEARN_ARTICLES() {
      return mockArticles;
    },
  };
});

import {
  CategoryCard,
  CategoryGrid,
  EmptyCategoryState,
  TagBadge,
  TagList,
} from '@/components/learn/taxonomy';
import {
  detectDuplicateCategories,
  detectDuplicateTags,
  getArticlesByCategory,
  getArticlesByTag,
  getCategories,
  getCategoryBySlug,
  getCategoryBreadcrumbs,
  getCategoryCollectionSchema,
  getCategoryMetadata,
  getCategoryRelatedServices,
  getDiscoverableTags,
  getPopularTags,
  getTags,
  getTagBySlug,
  getTagMetadata,
  validateCategory,
  validateLearnTaxonomy,
  validateTag,
} from '@/lib/learn/taxonomy';
import { LEARN_CATEGORIES } from '@/data/learn/categories';
import { LEARN_TAGS } from '@/data/learn/tags';
import type { LearnCategory, LearnTag } from '@/types/learn';

function makeArticle(
  overrides: Partial<LearnArticleRecord> = {},
): LearnArticleRecord {
  return {
    id: 'art-1',
    slug: 'instagram-followers-guide',
    title: 'Instagram Followers Guide',
    excerpt: 'How to grow Instagram followers responsibly.',
    content: 'Body text for the Instagram followers guide.',
    blocks: [
      {
        id: 'p-1',
        type: 'paragraph',
        text: 'Body text for the Instagram followers guide.',
        order: 1,
      },
    ],
    category: 'instagram',
    tags: ['followers', 'engagement'],
    authorId: 'author-active',
    readingTime: 5,
    publishedAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-06-01T00:00:00.000Z',
    showModifiedDate: false,
    seo: {
      title: 'Instagram Followers Guide',
      description: 'How to grow Instagram followers responsibly.',
      canonicalPath: '/learn/instagram-followers-guide',
    },
    relatedServices: [],
    relatedArticles: [],
    featured: true,
    published: true,
    status: 'published',
    editorialApproved: true,
    ...overrides,
  };
}

describe('Categories & Tags System — Document 15.04', () => {
  beforeEach(() => {
    mockArticles.length = 0;
  });

  it('renders active categories from the shared registry', () => {
    const categories = getCategories();
    expect(categories.every((category) => category.active)).toBe(true);
    expect(categories.some((category) => category.slug === 'news')).toBe(false);
    expect(categories.some((category) => category.slug === 'instagram')).toBe(
      true,
    );

    const html = renderToStaticMarkup(
      createElement(CategoryGrid, { categories }),
    );
    expect(html).toContain('Instagram');
    expect(html).toContain('/learn/instagram');
    expect(html).not.toContain('>News<');
  });

  it('renders tags from the shared registry', () => {
    const tags = getTags();
    expect(tags.length).toBeGreaterThanOrEqual(13);
    expect(getTagBySlug('followers')?.name).toBe('Followers');

    const html = renderToStaticMarkup(
      createElement(TagList, { tags: tags.slice(0, 3) }),
    );
    expect(html).toContain('data-tag-badge');
    expect(html).toContain('/learn/tag/');
  });

  it('detects duplicate category slugs', () => {
    expect(detectDuplicateCategories()).toEqual([]);

    const withDup: LearnCategory[] = [
      LEARN_CATEGORIES[0]!,
      { ...LEARN_CATEGORIES[0]!, id: 'instagram-dup' as LearnCategory['id'] },
    ];
    expect(detectDuplicateCategories(withDup)).toEqual(['instagram']);
  });

  it('detects duplicate tag slugs', () => {
    expect(detectDuplicateTags()).toEqual([]);

    const withDup: LearnTag[] = [
      LEARN_TAGS[0]!,
      { ...LEARN_TAGS[0]!, id: 'tag-dup' },
    ];
    expect(detectDuplicateTags(withDup)).toEqual([LEARN_TAGS[0]!.slug]);
  });

  it('renders empty category state', () => {
    const html = renderToStaticMarkup(
      createElement(EmptyCategoryState, { categoryName: 'Instagram' }),
    );
    expect(html).toContain('data-empty-category="true"');
    expect(html).toContain('Instagram');
  });

  it('filters to published articles only for category and tag', () => {
    mockArticles.push(
      makeArticle({ id: 'pub', slug: 'published-guide' }),
      makeArticle({
        id: 'draft',
        slug: 'draft-guide',
        published: false,
        status: 'draft',
        title: 'Draft Guide',
      }),
    );

    const byCategory = getArticlesByCategory('instagram');
    const byTag = getArticlesByTag('followers');

    expect(byCategory).toHaveLength(1);
    expect(byCategory[0]?.slug).toBe('published-guide');
    expect(byTag).toHaveLength(1);
    expect(byTag[0]?.slug).toBe('published-guide');
  });

  it('generates unique category metadata with canonical and social cards', () => {
    const metadata = getCategoryMetadata('instagram');
    expect(metadata.alternates?.canonical).toContain('/learn/instagram');
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();

    const inactive = getCategoryMetadata('news');
    expect(inactive.robots).toMatchObject({ index: false, follow: false });
  });

  it('builds category breadcrumbs and CollectionPage schema', () => {
    const category = getCategoryBySlug('instagram')!;
    const crumbs = getCategoryBreadcrumbs(category);
    const schema = getCategoryCollectionSchema(category);

    expect(crumbs.map((c) => c.label)).toEqual(['Home', 'Learn', 'Instagram']);
    expect(schema['@type']).toBe('CollectionPage');
    expect(String(schema.url)).toContain('/learn/instagram');
  });

  it('generates category related service links from the linking engine', () => {
    const links = getCategoryRelatedServices('instagram');
    expect(Array.isArray(links)).toBe(true);
    for (const link of links) {
      expect(link.href).toBeTruthy();
      expect(link.label).toBeTruthy();
    }
  });

  it('keeps category cards responsive', () => {
    const category = getCategoryBySlug('instagram')!;
    const html = renderToStaticMarkup(
      createElement(CategoryCard, { category }),
    );
    const badge = renderToStaticMarkup(
      createElement(TagBadge, {
        tag: { name: 'Followers', href: '/learn/tag/followers' },
      }),
    );

    expect(html).toContain('flex');
    expect(html).toContain('flex-col');
    expect(badge).toContain('focus-visible:ring-2');
  });

  it('validates category and tag records', () => {
    expect(validateCategory(LEARN_CATEGORIES[0]!).valid).toBe(true);
    expect(validateTag(LEARN_TAGS[0]!).valid).toBe(true);

    const badCategory = validateCategory({
      ...LEARN_CATEGORIES[0]!,
      slug: 'Bad Slug',
      description: '',
    });
    expect(badCategory.valid).toBe(false);
  });

  it('produces a taxonomy validation report without silent failures', () => {
    const report = validateLearnTaxonomy();
    expect(report.duplicateCategorySlugs).toEqual([]);
    expect(report.duplicateTagSlugs).toEqual([]);
    expect(report.activeCategoryCount).toBe(5);
    expect(report.activeTagCount).toBe(13);
    expect(report.issues.some((i) => i.code === 'empty_category')).toBe(true);
    expect(report.valid).toBe(true);
  });

  it('hides inactive categories from public getters', () => {
    expect(getCategoryBySlug('news')).toBeUndefined();
    expect(getCategoryBySlug('youtube')).toBeUndefined();
    expect(getCategories().map((c) => c.slug)).not.toContain('news');
    expect(getCategories().map((c) => c.slug)).not.toContain('youtube');
  });

  it('noindexes empty tag archives and indexes them once a published article exists', () => {
    expect(getDiscoverableTags()).toEqual([]);
    expect(getPopularTags()).toEqual([]);
    expect(getTagMetadata('algorithm').robots).toMatchObject({
      index: false,
      follow: true,
    });

    mockArticles.push(makeArticle({ tags: ['algorithm'] }));

    expect(getDiscoverableTags().map((tag) => tag.slug)).toEqual(['algorithm']);
    expect(getPopularTags().map((tag) => tag.slug)).toEqual(['algorithm']);
    expect(getTagMetadata('algorithm').robots).toMatchObject({
      index: true,
      follow: true,
    });
    expect(getTagMetadata('followers').robots).toMatchObject({
      index: false,
      follow: true,
    });
  });
});
