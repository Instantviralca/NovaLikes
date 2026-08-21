import { getLearnCategoryById } from '@/data/learn/categories';
import { createCmsId } from '@/lib/cms/ids';
import { isReservedLearnSlug, isValidArticleSlug, slugifyTitle } from '@/lib/cms/slug';
import {
  cmsDeleteArticlePermanent,
  cmsGetArticleById,
  cmsGetArticleBySlug,
  cmsInsertArticle,
  cmsInsertRedirect,
  cmsListDueScheduled,
  cmsReplaceArticle,
  cmsWriteAudit,
} from '@/lib/cms/store';
import { blocksToPlainText, tiptapJsonToBlocks } from '@/lib/cms/tiptap-to-blocks';
import type {
  CmsArticleInput,
  CmsArticleRecord,
  CmsArticleStatus,
  CmsPublishAction,
} from '@/lib/cms/types';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';
import type { LearnCategoryId } from '@/types/learn';
import type { ArticleContentBlock, ArticleFaqItem } from '@/types/learn-article-blocks';

const CATEGORIES: LearnCategoryId[] = [
  'instagram',
  'tiktok',
  'facebook',
  'youtube',
  'social-media-marketing',
  'guides',
  'news',
];

function asCategory(value: string | undefined): LearnCategoryId {
  if (value && CATEGORIES.includes(value as LearnCategoryId)) return value as LearnCategoryId;
  return 'guides';
}

function normalizeIntendedDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = value.trim().match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

export function hasPublishableBody(article: CmsArticleRecord): boolean {
  const text = blocksToPlainText(article.blocks).trim();
  if (text.length >= 40) return true;
  const html = article.contentHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return html.length >= 40;
}

function normalizeFaqs(value: unknown): ArticleFaqItem[] {
  if (!Array.isArray(value)) return [];
  const items: ArticleFaqItem[] = [];
  value.forEach((item, index) => {
    if (!item || typeof item !== 'object') return;
    const row = item as { id?: string; question?: string; answer?: string; schemaEligible?: boolean };
    if (!row.question?.trim() || !row.answer?.trim()) return;
    items.push({
      id: row.id?.trim() || `faq-${index + 1}`,
      question: row.question.trim(),
      answer: row.answer.trim(),
      schemaEligible: row.schemaEligible === true,
    });
  });
  return items;
}

export function applyArticleInput(
  current: CmsArticleRecord,
  input: CmsArticleInput,
  actorId: string,
): CmsArticleRecord {
  const contentJson = input.contentJson === undefined ? current.contentJson : input.contentJson;
  const contentHtml = input.contentHtml ?? current.contentHtml;
  const blocks =
    contentJson != null ? tiptapJsonToBlocks(contentJson) : (current.blocks as ArticleContentBlock[]);
  return {
    ...current,
    title: input.title.trim() || current.title,
    excerpt: input.excerpt ?? current.excerpt,
    contentHtml,
    contentJson,
    blocks,
    featuredImageUrl: input.featuredImageUrl === undefined ? current.featuredImageUrl : input.featuredImageUrl,
    featuredImageAlt: input.featuredImageAlt === undefined ? current.featuredImageAlt : input.featuredImageAlt,
    featuredImageWidth:
      input.featuredImageWidth === undefined ? current.featuredImageWidth : input.featuredImageWidth,
    featuredImageHeight:
      input.featuredImageHeight === undefined ? current.featuredImageHeight : input.featuredImageHeight,
    category: asCategory(input.category ?? current.category),
    tags: input.tags ?? current.tags,
    seoTitle: input.seoTitle === undefined ? current.seoTitle : input.seoTitle,
    seoDescription: input.seoDescription === undefined ? current.seoDescription : input.seoDescription,
    canonicalPath: input.canonicalPath === undefined ? current.canonicalPath : input.canonicalPath,
    authorId: input.authorId === undefined ? current.authorId : input.authorId,
    faqs: input.faqs ? normalizeFaqs(input.faqs) : current.faqs,
    keyTakeaways: input.keyTakeaways ?? current.keyTakeaways,
    relatedServices: input.relatedServices ?? current.relatedServices,
    relatedArticles: input.relatedArticles ?? current.relatedArticles,
    intendedPublishOn:
      input.intendedPublishOn === undefined
        ? current.intendedPublishOn
        : normalizeIntendedDate(input.intendedPublishOn),
    updatedBy: actorId,
    updatedAt: new Date().toISOString(),
  };
}

export async function createCmsArticle(
  input: CmsArticleInput,
  actorId: string,
): Promise<{ ok: true; article: CmsArticleRecord } | { ok: false; error: string }> {
  const title = input.title?.trim();
  if (!title) return { ok: false, error: 'Title is required.' };
  const slug = (input.slug?.trim() || slugifyTitle(title)).toLowerCase();
  if (!isValidArticleSlug(slug)) return { ok: false, error: 'Slug must be lowercase kebab-case.' };
  if (isReservedLearnSlug(slug) || (await cmsGetArticleBySlug(slug))) {
    return { ok: false, error: 'That slug is already used.' };
  }
  const now = new Date().toISOString();
  const contentJson = input.contentJson ?? null;
  const blocks = contentJson ? tiptapJsonToBlocks(contentJson) : [];
  const status = input.status === 'planned' ? 'planned' : 'draft';
  const article: CmsArticleRecord = {
    id: createCmsId('art'),
    slug,
    title,
    excerpt: input.excerpt?.trim() || '',
    contentHtml: input.contentHtml || '',
    contentJson,
    blocks,
    featuredImageUrl: input.featuredImageUrl ?? null,
    featuredImageAlt: input.featuredImageAlt ?? null,
    featuredImageWidth: input.featuredImageWidth ?? null,
    featuredImageHeight: input.featuredImageHeight ?? null,
    category: asCategory(input.category),
    tags: input.tags ?? [],
    seoTitle: input.seoTitle ?? null,
    seoDescription: input.seoDescription ?? null,
    canonicalPath: input.canonicalPath ?? null,
    authorId: input.authorId ?? actorId,
    createdBy: actorId,
    updatedBy: actorId,
    status,
    intendedPublishOn: normalizeIntendedDate(input.intendedPublishOn) ,
    publishAt: null,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    faqs: normalizeFaqs(input.faqs),
    keyTakeaways: input.keyTakeaways ?? [],
    relatedServices: input.relatedServices ?? [],
    relatedArticles: input.relatedArticles ?? [],
  };
  await cmsInsertArticle(article);
  await cmsWriteAudit({ actorId, action: 'article_created', articleId: article.id });
  return { ok: true, article };
}

export async function updateCmsArticle(
  id: string,
  input: CmsArticleInput,
  actorId: string,
  warnPublishedSlug = true,
): Promise<
  { ok: true; article: CmsArticleRecord } | { ok: false; error: string; status?: number }
> {
  const current = await cmsGetArticleById(id);
  if (!current) return { ok: false, error: 'Article not found.', status: 404 };
  const next = applyArticleInput(current, input, actorId);
  if (input.slug && input.slug.trim().toLowerCase() !== current.slug) {
    const slug = input.slug.trim().toLowerCase();
    if (!isValidArticleSlug(slug)) return { ok: false, error: 'Slug must be lowercase kebab-case.' };
    const taken = await cmsGetArticleBySlug(slug);
    if ((taken && taken.id !== current.id) || isReservedLearnSlug(slug)) {
      return { ok: false, error: 'That slug is already used.' };
    }
    if (current.status === 'published' && warnPublishedSlug) {
      return {
        ok: false,
        error:
          'Changing a published slug requires confirmation. NovaLikes will add a 301 from the old /learn URL.',
        status: 409,
      };
    }
    if (current.status === 'published') {
      await cmsInsertRedirect(current.slug, slug, current.id);
    }
    next.slug = slug;
  }
  const saved = await cmsReplaceArticle(next);
  await cmsWriteAudit({ actorId, action: 'article_updated', articleId: saved.id });
  return { ok: true, article: saved };
}

export function applyPublishAction(
  article: CmsArticleRecord,
  action: CmsPublishAction,
  actorId: string,
  now = new Date(),
): { ok: true; article: CmsArticleRecord; audit: string } | { ok: false; error: string } {
  const iso = now.toISOString();
  const next = { ...article, updatedBy: actorId, updatedAt: iso };

  switch (action.type) {
    case 'draft':
      next.status = 'draft';
      next.publishAt = null;
      return { ok: true, article: next, audit: 'article_updated' };
    case 'publish':
      if (!hasPublishableBody(article)) {
        return { ok: false, error: 'Add article content before publishing.' };
      }
      next.status = 'published';
      next.publishAt = iso;
      next.publishedAt = next.publishedAt ?? iso;
      next.deletedAt = null;
      return { ok: true, article: next, audit: 'published' };
    case 'schedule': {
      if (!hasPublishableBody(article)) {
        return { ok: false, error: 'Add article content before scheduling auto-publish.' };
      }
      const when = new Date(action.publishAt);
      if (Number.isNaN(when.getTime()) || when.getTime() <= now.getTime()) {
        return { ok: false, error: 'Schedule time must be in the future (UTC).' };
      }
      next.status = 'scheduled';
      next.publishAt = when.toISOString();
      next.deletedAt = null;
      return {
        ok: true,
        article: next,
        audit: article.status === 'scheduled' ? 'schedule_changed' : 'scheduled',
      };
    }
    case 'unpublish':
      if (article.status !== 'published') return { ok: false, error: 'Only published articles can be unpublished.' };
      next.status = 'draft';
      return { ok: true, article: next, audit: 'unpublished' };
    case 'cancel_schedule':
      if (article.status !== 'scheduled') return { ok: false, error: 'Article is not scheduled.' };
      next.status = 'draft';
      next.publishAt = null;
      return { ok: true, article: next, audit: 'schedule_changed' };
    case 'trash':
      next.status = 'trash';
      next.deletedAt = iso;
      return { ok: true, article: next, audit: 'moved_to_trash' };
    case 'restore':
      if (article.status !== 'trash') return { ok: false, error: 'Only trash items can be restored.' };
      next.status = 'draft';
      next.deletedAt = null;
      return { ok: true, article: next, audit: 'restored' };
    case 'delete_permanent':
      return { ok: true, article: next, audit: 'permanently_deleted' };
    default:
      return { ok: false, error: 'Unknown action.' };
  }
}

export async function mutateCmsArticle(
  id: string,
  action: CmsPublishAction,
  actorId: string,
): Promise<{ ok: true; article: CmsArticleRecord | null } | { ok: false; error: string; status?: number }> {
  const current = await cmsGetArticleById(id);
  if (!current) return { ok: false, error: 'Article not found.', status: 404 };
  const result = applyPublishAction(current, action, actorId);
  if (!result.ok) return result;
  if (action.type === 'delete_permanent') {
    if (current.status !== 'trash') return { ok: false, error: 'Permanently delete is only allowed from trash.' };
    await cmsDeleteArticlePermanent(current.id);
    await cmsWriteAudit({ actorId, action: result.audit, articleId: current.id });
    return { ok: true, article: null };
  }
  const saved = await cmsReplaceArticle(result.article);
  await cmsWriteAudit({ actorId, action: result.audit, articleId: saved.id });
  return { ok: true, article: saved };
}

export async function publishDueScheduledArticles(now = new Date()): Promise<string[]> {
  const due = await cmsListDueScheduled(now);
  const publishedIds: string[] = [];
  for (const article of due) {
    if (article.status !== 'scheduled') continue;
    if (!article.publishAt) continue;
    if (!hasPublishableBody(article)) continue;
    const result = applyPublishAction(article, { type: 'publish' }, 'system:scheduler', now);
    if (!result.ok) continue;
    await cmsReplaceArticle(result.article);
    await cmsWriteAudit({
      actorId: 'system:scheduler',
      action: 'published',
      articleId: article.id,
    });
    publishedIds.push(article.id);
  }
  return publishedIds;
}

export function isPublicCmsArticle(article: CmsArticleRecord, now = new Date()): boolean {
  if (article.status !== 'published' || article.deletedAt) return false;
  if (article.publishAt && new Date(article.publishAt).getTime() > now.getTime()) return false;
  return true;
}

export function cmsReadingTime(article: CmsArticleRecord): number {
  const text = article.excerpt + '\n' + blocksToPlainText(article.blocks);
  return Math.max(1, estimateReadingTimeMinutes(text));
}

export function categoryExists(id: string): boolean {
  return Boolean(getLearnCategoryById(id as LearnCategoryId));
}

export type { CmsArticleStatus };
