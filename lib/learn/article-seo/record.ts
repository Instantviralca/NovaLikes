/**
 * Map Learn articles to ArticleSeoRecord — Document 15.07.
 */

import { learnArticlePath } from '@/config/routes';
import { getLearnCategoryById } from '@/data/learn/categories';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getEditorialRobots } from '@/lib/learn/editorial/effects';
import { clampMetaDescription } from '@/seo/descriptions';
import { resolveArticleMetaTitle } from '@/seo/titles';
import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';
import type { ArticleSeoRecord } from '@/types/learn-article-seo';

type ArticleSeoSource = LearnArticleRecord | PublicLearnArticle;

function isRecord(article: ArticleSeoSource): article is LearnArticleRecord {
  return 'published' in article && typeof article.published === 'boolean';
}

export function toArticleSeoRecord(article: ArticleSeoSource): ArticleSeoRecord {
  const published = isRecord(article)
    ? isPublicLiveArticle(article)
    : article.status === 'published';
  const active = published;
  const canonicalPath =
    article.seo.canonicalPath ?? learnArticlePath(article.slug);
  const noindex = Boolean(article.seo?.noindex);
  const category = getLearnCategoryById(article.category);
  const robots = getEditorialRobots(
    isRecord(article) ? article.status : 'published',
    noindex,
    isRecord(article) ? article.editorialApproved === true : true,
  );
  const metaTitle = resolveArticleMetaTitle(article.seo.title, article.title);
  const metaDescription = clampMetaDescription(
    article.seo.description?.trim() || article.excerpt || article.title,
  );

  return {
    title: article.title,
    metaTitle,
    metaDescription,
    canonicalPath,
    openGraphTitle: metaTitle,
    openGraphDescription: metaDescription,
    openGraphImage: article.seo.ogImage ?? article.featuredImage?.src,
    twitterTitle: metaTitle,
    twitterDescription: metaDescription,
    twitterImage: article.seo.ogImage ?? article.featuredImage?.src,
    robots: {
      index: robots.index && active && !noindex,
      follow: robots.follow && active && !noindex,
    },
    primaryKeyword: article.seo.keywords?.[0],
    secondaryKeywords: [...(article.seo.keywords?.slice(1) ?? [])],
    articleSection: category?.name,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    showModifiedDate: article.showModifiedDate,
    featuredImage: article.featuredImage,
    authorId: article.authorId,
    schemaType: 'BlogPosting',
    faqIds: article.faqs?.map((faq) => faq.id) ?? [],
    active,
    published,
    noindex: noindex || !published,
    slug: article.slug,
    articleId: article.id,
    categoryId: article.category,
    tags: [...article.tags],
    excerpt: article.excerpt,
    href:
      'href' in article && article.href
        ? article.href
        : learnArticlePath(article.slug),
    scheduledFor: isRecord(article) ? article.scheduledAt : undefined,
  };
}

export function resolveArticleSection(
  seo: ArticleSeoRecord,
  categoryName?: string,
): string | undefined {
  return seo.articleSection ?? categoryName;
}
