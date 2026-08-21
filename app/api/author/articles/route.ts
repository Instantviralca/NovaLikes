import { NextResponse } from 'next/server';

import { createCmsArticle } from '@/lib/cms/articles';
import { requireCmsActor } from '@/lib/cms/auth';
import { cmsGetUserById, cmsListArticles } from '@/lib/cms/store';
import { isCmsArticleStatus } from '@/lib/cms/types';
import type { CmsArticleStatus } from '@/lib/cms/types';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });

  const url = new URL(request.url);
  const statusParam = url.searchParams.get('status') ?? 'all';
  const status =
    statusParam === 'all' || isCmsArticleStatus(statusParam) ? statusParam : 'all';
  const q = url.searchParams.get('q') ?? undefined;
  const category = url.searchParams.get('category') ?? undefined;
  const authorId = url.searchParams.get('authorId') ?? undefined;

  const articles = await cmsListArticles({
    status: status as CmsArticleStatus | 'all',
    q,
    category,
    authorId,
  });
  const authors = await Promise.all(
    [...new Set(articles.map((item) => item.authorId).filter(Boolean) as string[])].map((id) =>
      cmsGetUserById(id),
    ),
  );
  const authorNames = Object.fromEntries(
    authors.filter(Boolean).map((user) => [user!.id, user!.name]),
  );

  return NextResponse.json({
    ok: true,
    articles: articles.map((article) => ({
      ...article,
      authorName: article.authorId ? authorNames[article.authorId] ?? 'Unknown' : 'Admin',
    })),
  });
}

export async function POST(request: Request) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const body = (await request.json()) as Record<string, unknown>;
  const result = await createCmsArticle(
    {
      title: String(body.title ?? ''),
      slug: typeof body.slug === 'string' ? body.slug : undefined,
      excerpt: typeof body.excerpt === 'string' ? body.excerpt : undefined,
      contentHtml: typeof body.contentHtml === 'string' ? body.contentHtml : undefined,
      contentJson:
        body.contentJson && typeof body.contentJson === 'object'
          ? (body.contentJson as Record<string, unknown>)
          : null,
      featuredImageUrl: typeof body.featuredImageUrl === 'string' ? body.featuredImageUrl : null,
      featuredImageAlt: typeof body.featuredImageAlt === 'string' ? body.featuredImageAlt : null,
      category: typeof body.category === 'string' ? body.category : undefined,
      tags: Array.isArray(body.tags) ? body.tags.map(String) : undefined,
      seoTitle: typeof body.seoTitle === 'string' ? body.seoTitle : null,
      seoDescription: typeof body.seoDescription === 'string' ? body.seoDescription : null,
      canonicalPath: typeof body.canonicalPath === 'string' ? body.canonicalPath : null,
      intendedPublishOn: typeof body.intendedPublishOn === 'string' ? body.intendedPublishOn : null,
      status: body.status === 'planned' ? 'planned' : undefined,
      authorId: actor.kind === 'author' ? actor.id : typeof body.authorId === 'string' ? body.authorId : actor.id,
      faqs: Array.isArray(body.faqs) ? (body.faqs as never) : undefined,
      keyTakeaways: Array.isArray(body.keyTakeaways) ? body.keyTakeaways.map(String) : undefined,
    },
    actor.id,
  );
  if (!result.ok) return NextResponse.json(result, { status: 400 });
  return NextResponse.json(result);
}
