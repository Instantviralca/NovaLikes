/**
 * Author System tests — Document 15.03.
 * Fixtures live only in tests — production AUTHORS stays empty.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthorRecord, PublicAuthor } from '@/types/author';
import type { LearnArticleRecord } from '@/types/learn';

const { mockAuthors, mockArticles } = vi.hoisted(() => {
  const authors: AuthorRecord[] = [];
  const articles: LearnArticleRecord[] = [];
  return { mockAuthors: authors, mockArticles: articles };
});

vi.mock('@/data/authors/registry', () => ({
  get AUTHORS() {
    return mockAuthors;
  },
}));

vi.mock('@/data/learn/articles', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/learn/articles')>();
  return {
    ...actual,
    get LEARN_ARTICLES() {
      return mockArticles;
    },
  };
});

import { AuthorAvatar } from '@/components/authors/AuthorAvatar';
import { AuthorCard } from '@/components/authors/AuthorCard';
import { AuthorHero } from '@/components/authors/AuthorHero';
import { AuthorPageView } from '@/components/authors/AuthorPageView';
import { AuthorSocialLinks } from '@/components/authors/AuthorSocialLinks';
import { AuthorsIndexView } from '@/components/authors/AuthorsIndexView';
import {
  getActiveAuthors,
  getAllAuthorSlugsForStaticParams,
  getAuthorArticles,
  getAuthorBySlug,
  getAuthorMetadata,
  getAuthorPageJsonLd,
  getAuthorSchema,
  getAuthorsForCategory,
  publicAuthorHasPrivateLeak,
  toPublicAuthor,
  validateAuthor,
} from '@/lib/authors';

function makeAuthor(overrides: Partial<AuthorRecord> = {}): AuthorRecord {
  return {
    id: 'author-active',
    slug: 'jordan-lee',
    name: 'Jordan Lee',
    role: 'Content Strategist',
    bio: 'Jordan writes NovaLikes Learn guides on social growth and measurement.',
    expertise: ['Instagram', 'Content strategy'],
    joinedAt: '2024-01-15T00:00:00.000Z',
    active: true,
    featured: true,
    seo: {
      title: 'Jordan Lee | NovaLikes Authors',
      description: 'Jordan Lee writes NovaLikes Learn guides.',
      canonicalPath: '/authors/jordan-lee',
    },
    email: 'private@example.com',
    internalNotes: 'Do not expose',
    ...overrides,
  };
}

function makeArticle(
  overrides: Partial<LearnArticleRecord> = {},
): LearnArticleRecord {
  return {
    id: 'art-1',
    slug: 'instagram-growth-basics',
    title: 'Instagram Growth Basics',
    excerpt: 'A practical overview of Instagram growth.',
    content: 'Body text for reading time estimation and search.',
    blocks: [
      {
        id: 'p-1',
        type: 'paragraph',
        text: 'Body text for reading time estimation and search.',
        order: 1,
      },
    ],
    category: 'instagram',
    tags: ['instagram'],
    authorId: 'author-active',
    readingTime: 4,
    publishedAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-06-01T00:00:00.000Z',
    showModifiedDate: false,
    seo: {
      title: 'Instagram Growth Basics',
      description: 'A practical overview of Instagram growth.',
      canonicalPath: '/learn/instagram-growth-basics',
    },
    relatedServices: [],
    relatedArticles: [],
    featured: false,
    published: true,
    status: 'published',
    editorialApproved: true,
    ...overrides,
  };
}

function resetFixtures() {
  mockAuthors.length = 0;
  mockArticles.length = 0;
}

describe('Author System — Document 15.03', () => {
  beforeEach(() => {
    resetFixtures();
  });

  it('renders an active author profile', () => {
    mockAuthors.push(makeAuthor());
    const author = getAuthorBySlug('jordan-lee');
    expect(author).toBeDefined();
    expect(author?.name).toBe('Jordan Lee');

    const html = renderToStaticMarkup(
      createElement(AuthorPageView, {
        author: author!,
        articles: [],
        relatedCategories: [],
      }),
    );

    expect(html).toContain('Jordan Lee');
    expect(html).toContain('Content Strategist');
    expect(html).toContain('author-articles-heading');
  });

  it('hides inactive authors from public getters and static params', () => {
    mockAuthors.push(
      makeAuthor({ id: 'hidden', slug: 'hidden-author', active: false }),
      makeAuthor(),
    );

    expect(getAuthorBySlug('hidden-author')).toBeUndefined();
    expect(getActiveAuthors().map((a) => a.slug)).toEqual(['jordan-lee']);
    expect(getAllAuthorSlugsForStaticParams()).toEqual([{ slug: 'jordan-lee' }]);
  });

  it('filters to published articles only', () => {
    mockAuthors.push(makeAuthor());
    mockArticles.push(
      makeArticle({ id: 'pub', slug: 'published-piece' }),
      makeArticle({
        id: 'draft',
        slug: 'draft-piece',
        published: false,
        status: 'draft',
        title: 'Draft Piece',
      }),
    );

    const articles = getAuthorArticles('author-active');
    expect(articles).toHaveLength(1);
    expect(articles[0]?.slug).toBe('published-piece');
  });

  it('generates unique author metadata with canonical and social cards', () => {
    mockAuthors.push(makeAuthor());
    const metadata = getAuthorMetadata('jordan-lee');

    expect(metadata).not.toBeNull();
    expect(metadata?.alternates?.canonical).toContain('/authors/jordan-lee');
    expect(metadata?.openGraph).toBeDefined();
    expect(metadata?.twitter).toBeDefined();
    expect(getAuthorMetadata('missing')).toBeNull();
  });

  it('builds Person schema without private email or notes', () => {
    mockAuthors.push(makeAuthor({ website: 'https://example.com/jordan' }));
    const author = getAuthorBySlug('jordan-lee')!;
    const person = getAuthorSchema(author);
    const pageLd = getAuthorPageJsonLd(author);
    const serialized = JSON.stringify(pageLd);

    expect(person['@type']).toBe('Person');
    expect(person.name).toBe('Jordan Lee');
    expect(person).not.toHaveProperty('email');
    expect(serialized).not.toContain('private@example.com');
    expect(serialized).not.toContain('Do not expose');
    expect(person.worksFor).toEqual({ '@id': 'https://novalikes.com/#organization' });
    expect(serialized).toContain('BreadcrumbList');
  });

  it('handles missing avatar without inventing imagery', () => {
    const publicAuthor = toPublicAuthor(makeAuthor({ avatar: undefined }), 0);
    const html = renderToStaticMarkup(
      createElement(AuthorAvatar, { author: publicAuthor, size: 'md' }),
    );

    expect(html).toContain('J');
    expect(html).not.toContain('<img');
  });

  it('omits social links when none are configured', () => {
    const html = renderToStaticMarkup(
      createElement(AuthorSocialLinks, {
        links: undefined,
        website: undefined,
      }),
    );
    expect(html).toBe('');

    const withLinks = renderToStaticMarkup(
      createElement(AuthorSocialLinks, {
        website: 'https://example.com',
        links: { linkedin: 'https://linkedin.com/in/example' },
      }),
    );
    expect(withLinks).toContain('Website');
    expect(withLinks).toContain('LinkedIn');
  });

  it('keeps author card responsive layout classes', () => {
    const author = toPublicAuthor(makeAuthor(), 2);
    const html = renderToStaticMarkup(createElement(AuthorCard, { author }));
    const hero = renderToStaticMarkup(createElement(AuthorHero, { author }));

    expect(html).toContain('flex');
    expect(html).toContain('/authors/jordan-lee');
    expect(hero).toContain('sm:flex-row');
    expect(hero).toContain('text-3xl');
  });

  it('strips private fields from PublicAuthor projection', () => {
    const publicAuthor = toPublicAuthor(makeAuthor(), 1);
    expect(publicAuthorHasPrivateLeak(publicAuthor)).toBe(false);
    expect(publicAuthor).not.toHaveProperty('email');
    expect(publicAuthor).not.toHaveProperty('internalNotes');
    expect(publicAuthor.articleCount).toBe(1);
    expect(publicAuthor.profilePath).toBe('/authors/jordan-lee');
  });

  it('validates author records', () => {
    const valid = validateAuthor(makeAuthor());
    expect(valid.valid).toBe(true);

    const invalid = validateAuthor(
      makeAuthor({ slug: 'Bad Slug', seo: { title: '', description: '', canonicalPath: '/x' } }),
    );
    expect(invalid.valid).toBe(false);
    expect(invalid.issues.some((i) => i.field === 'slug')).toBe(true);
  });

  it('links category pages to authors via published articles', () => {
    mockAuthors.push(makeAuthor());
    mockArticles.push(makeArticle());
    const authors = getAuthorsForCategory('instagram');
    expect(authors).toHaveLength(1);
    expect(authors[0]?.slug).toBe('jordan-lee');
  });

  it('shows empty authors index when registry is empty', () => {
    const html = renderToStaticMarkup(
      createElement(AuthorsIndexView, { authors: [] as PublicAuthor[] }),
    );
    expect(html).toContain('data-authors-empty="true"');
    expect(html).not.toContain('Jordan Lee');
  });
});
