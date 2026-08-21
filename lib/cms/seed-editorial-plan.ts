import { LEARN_ARTICLES } from '@/data/learn/articles';
import { NOVALIKES_EDITORIAL_PLAN } from '@/lib/cms/editorial-plan';
import { createCmsId } from '@/lib/cms/ids';
import { assertCmsProductionDatabase, isCmsDatabaseReady } from '@/lib/cms/ready';
import { isReservedLearnSlug } from '@/lib/cms/slug';
import { cmsGetArticleBySlug, cmsInsertArticle, cmsListArticles, cmsReplaceArticle } from '@/lib/cms/store';
import type { CmsArticleRecord, CmsArticleStatus } from '@/lib/cms/types';
import { learnArticlePath } from '@/config/routes';
import { isProductionRuntime } from '@/lib/config/env';

export type EditorialCalendarRow = {
  slug: string;
  title: string;
  intendedPublishOn: string;
  status: CmsArticleStatus | 'learn-published';
  cmsId: string | null;
  liveHref: string | null;
  source: 'cms' | 'learn-registry';
};

export async function seedEditorialPlan(actorId: string): Promise<{
  created: number;
  reusedCms: number;
  linkedRegistry: number;
}> {
  assertCmsProductionDatabase();
  if (isProductionRuntime() && !isCmsDatabaseReady()) {
    throw new Error('author:import-editorial-plan requires PostgreSQL (DATABASE_URL) in production.');
  }

  let created = 0;
  let reusedCms = 0;
  let linkedRegistry = 0;

  for (const item of NOVALIKES_EDITORIAL_PLAN) {
    const existing = await cmsGetArticleBySlug(item.slug);
    if (existing) {
      reusedCms += 1;
      if (!existing.intendedPublishOn && existing.status === 'planned') {
        await cmsReplaceArticle({
          ...existing,
          intendedPublishOn: item.date,
          updatedAt: new Date().toISOString(),
        });
      }
      continue;
    }
    if (isReservedLearnSlug(item.slug) || LEARN_ARTICLES.some((article) => article.slug === item.slug)) {
      linkedRegistry += 1;
      continue;
    }
    const now = new Date().toISOString();
    const record: CmsArticleRecord = {
      id: createCmsId('art'),
      slug: item.slug,
      title: item.title,
      excerpt: '',
      contentHtml: '',
      contentJson: null,
      blocks: [],
      featuredImageUrl: null,
      featuredImageAlt: null,
      featuredImageWidth: null,
      featuredImageHeight: null,
      category: item.category,
      tags: [],
      seoTitle: null,
      seoDescription: null,
      canonicalPath: null,
      authorId: actorId,
      createdBy: actorId,
      updatedBy: actorId,
      status: 'planned',
      intendedPublishOn: item.date,
      publishAt: null,
      publishedAt: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      faqs: [],
      keyTakeaways: [],
      relatedServices: [],
      relatedArticles: [],
    };
    await cmsInsertArticle(record);
    created += 1;
  }

  return { created, reusedCms, linkedRegistry };
}

export async function getEditorialCalendarRows(): Promise<EditorialCalendarRow[]> {
  const cms = await cmsListArticles({ status: 'all' });
  const bySlug = new Map(cms.map((article) => [article.slug, article]));
  const registry = new Map(LEARN_ARTICLES.map((article) => [article.slug, article]));

  return [...NOVALIKES_EDITORIAL_PLAN]
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug))
    .map((item) => {
      const cmsArticle = bySlug.get(item.slug);
      if (cmsArticle && cmsArticle.status !== 'trash') {
        return {
          slug: cmsArticle.slug,
          title: cmsArticle.title,
          intendedPublishOn: cmsArticle.intendedPublishOn || item.date,
          status: cmsArticle.status,
          cmsId: cmsArticle.id,
          liveHref: cmsArticle.status === 'published' ? learnArticlePath(cmsArticle.slug) : null,
          source: 'cms' as const,
        };
      }
      const live = registry.get(item.slug);
      if (live) {
        return {
          slug: live.slug,
          title: live.title,
          intendedPublishOn: item.date,
          status: 'learn-published' as const,
          cmsId: null,
          liveHref: learnArticlePath(live.slug),
          source: 'learn-registry' as const,
        };
      }
      return {
        slug: item.slug,
        title: item.title,
        intendedPublishOn: item.date,
        status: 'planned' as const,
        cmsId: null,
        liveHref: null,
        source: 'cms' as const,
      };
    });
}
