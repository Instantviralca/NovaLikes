import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleNotFound, ArticlePage } from '@/components/learn/article';
import { getLearnArticleRecordBySlug, getLearnCategoryById } from '@/data/learn';
import {
  canAccessArticlePreview,
  getDraftArticleMetadata,
  prepareArticleForRender,
} from '@/lib/learn/article';
import { hasCmsPreviewAccess } from '@/lib/cms/auth';
import { getCmsLearnRecordBySlug, cmsUserToPublicAuthor } from '@/lib/cms/learn-bridge';
import { learnArticlePath } from '@/config/routes';
import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';

type PreviewPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
};

/**
 * Authorized article preview — Document 15.02.
 * Always noindex. Never in sitemap.
 */
export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  return getDraftArticleMetadata(slug);
}

function asPreviewProjection(record: LearnArticleRecord): PublicLearnArticle {
  const category = getLearnCategoryById(record.category);
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt,
    content: record.content,
    blocks: [...record.blocks],
    category: record.category,
    categoryName: category?.name ?? record.category,
    tags: [...record.tags],
    authorId: record.authorId,
    featuredImage: record.featuredImage,
    readingTime: record.readingTime,
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt,
    showModifiedDate: record.showModifiedDate,
    seo: { ...record.seo, noindex: true },
    relatedServices: [...record.relatedServices],
    relatedArticles: [...record.relatedArticles],
    featured: record.featured,
    href: learnArticlePath(record.slug),
    keyTakeaways: [...(record.keyTakeaways ?? [])],
    faqs: [...(record.faqs ?? [])],
    serviceCta: record.serviceCta,
    status: 'published',
  };
}

export default async function LearnArticlePreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!canAccessArticlePreview(token) && !(await hasCmsPreviewAccess())) {
    notFound();
  }

  const record = getLearnArticleRecordBySlug(slug) ?? (await getCmsLearnRecordBySlug(slug));
  if (!record) {
    return <ArticleNotFound reason="missing" />;
  }

  const projection = asPreviewProjection(record);
  const author = await cmsUserToPublicAuthor(record.authorId);
  const prepared = prepareArticleForRender({ ...projection, author });

  return <ArticlePage article={prepared.article} preview />;
}
