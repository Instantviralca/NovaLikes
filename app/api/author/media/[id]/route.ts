import { NextResponse } from 'next/server';

import { requireCmsActor } from '@/lib/cms/auth';
import { removeCmsMedia } from '@/lib/cms/storage';
import { cmsGetMediaById, cmsListArticles, cmsUpdateMedia } from '@/lib/cms/store';

export const runtime = 'nodejs';

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const { id } = await context.params;
  const body = (await request.json()) as { alt?: string };
  const media = await cmsUpdateMedia(id, { alt: String(body.alt ?? '') });
  if (!media) return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true, media });
}

export async function DELETE(request: Request, context: Context) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const { id } = await context.params;
  const existing = await cmsGetMediaById(id);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  const url = new URL(request.url);
  const confirmed = url.searchParams.get('confirm') === '1';
  const articles = await cmsListArticles({ status: 'all' });
  const referenced = articles.filter((article) => {
    const blob = `${article.featuredImageUrl ?? ''}\n${article.contentHtml}\n${JSON.stringify(article.contentJson ?? {})}\n${JSON.stringify(article.blocks ?? [])}`;
    return blob.includes(existing.url) || blob.includes(existing.id);
  });
  if (referenced.length > 0 && !confirmed) {
    return NextResponse.json(
      {
        ok: false,
        error: `This image is used by ${referenced.length} article(s). Confirm to delete anyway.`,
        referenced: referenced.length,
      },
      { status: 409 },
    );
  }
  await removeCmsMedia(id);
  return NextResponse.json({ ok: true });
}
