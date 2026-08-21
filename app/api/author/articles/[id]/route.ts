import { NextResponse } from 'next/server';

import { mutateCmsArticle, updateCmsArticle } from '@/lib/cms/articles';
import { requireCmsActor } from '@/lib/cms/auth';
import { revalidateLearnArticle } from '@/lib/cms/revalidate-learn';
import { cmsGetArticleById } from '@/lib/cms/store';
import type { CmsPublishAction } from '@/lib/cms/types';

export const runtime = 'nodejs';

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Context) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const { id } = await context.params;
  const article = await cmsGetArticleById(id);
  if (!article) return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true, article });
}

export async function PATCH(request: Request, context: Context) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const { id } = await context.params;
  const body = (await request.json()) as Record<string, unknown>;
  const confirmSlugChange = body.confirmSlugChange === true;
  const result = await updateCmsArticle(
    id,
    {
      title: String(body.title ?? ''),
      slug: typeof body.slug === 'string' ? body.slug : undefined,
      excerpt: typeof body.excerpt === 'string' ? body.excerpt : undefined,
      contentHtml: typeof body.contentHtml === 'string' ? body.contentHtml : undefined,
      contentJson:
        body.contentJson && typeof body.contentJson === 'object'
          ? (body.contentJson as Record<string, unknown>)
          : undefined,
      featuredImageUrl:
        body.featuredImageUrl === null
          ? null
          : typeof body.featuredImageUrl === 'string'
            ? body.featuredImageUrl
            : undefined,
      featuredImageAlt: typeof body.featuredImageAlt === 'string' ? body.featuredImageAlt : undefined,
      category: typeof body.category === 'string' ? body.category : undefined,
      tags: Array.isArray(body.tags) ? body.tags.map(String) : undefined,
      seoTitle: typeof body.seoTitle === 'string' ? body.seoTitle : undefined,
      seoDescription: typeof body.seoDescription === 'string' ? body.seoDescription : undefined,
      canonicalPath: typeof body.canonicalPath === 'string' ? body.canonicalPath : undefined,
      intendedPublishOn: typeof body.intendedPublishOn === 'string' ? body.intendedPublishOn : body.intendedPublishOn === null ? null : undefined,
      authorId: actor.kind === 'admin' && typeof body.authorId === 'string' ? body.authorId : undefined,
      faqs: Array.isArray(body.faqs) ? (body.faqs as never) : undefined,
      keyTakeaways: Array.isArray(body.keyTakeaways) ? body.keyTakeaways.map(String) : undefined,
    },
    actor.id,
    !confirmSlugChange,
  );
  if (!result.ok) return NextResponse.json(result, { status: result.status ?? 400 });
  revalidateLearnArticle(result.article.slug);
  return NextResponse.json(result);
}

export async function POST(request: Request, context: Context) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const { id } = await context.params;
  const existing = await cmsGetArticleById(id);
  const body = (await request.json()) as { action?: string; publishAt?: string; confirm?: boolean };
  const actionType = body.action;
  let action: CmsPublishAction | null = null;
  if (actionType === 'draft') action = { type: 'draft' };
  if (actionType === 'publish') action = { type: 'publish' };
  if (actionType === 'schedule' && body.publishAt) action = { type: 'schedule', publishAt: body.publishAt };
  if (actionType === 'unpublish') action = { type: 'unpublish' };
  if (actionType === 'trash') action = { type: 'trash' };
  if (actionType === 'restore') action = { type: 'restore' };
  if (actionType === 'cancel_schedule') action = { type: 'cancel_schedule' };
  if (actionType === 'delete_permanent') {
    if (body.confirm !== true) {
      return NextResponse.json({ ok: false, error: 'Permanent delete requires confirmation.' }, { status: 400 });
    }
    action = { type: 'delete_permanent' };
  }
  if (!action) return NextResponse.json({ ok: false, error: 'Unknown action.' }, { status: 400 });
  const result = await mutateCmsArticle(id, action, actor.id);
  if (!result.ok) return NextResponse.json(result, { status: result.status ?? 400 });
  revalidateLearnArticle(result.article?.slug ?? existing?.slug);
  return NextResponse.json(result);
}
