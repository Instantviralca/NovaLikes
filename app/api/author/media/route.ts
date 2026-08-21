import { NextResponse } from 'next/server';

import { requireCmsActor } from '@/lib/cms/auth';
import { storeCmsMediaFile, validateMediaUpload } from '@/lib/cms/storage';
import { cmsListMedia } from '@/lib/cms/store';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const q = new URL(request.url).searchParams.get('q') ?? undefined;
  const media = await cmsListMedia(q);
  return NextResponse.json({ ok: true, media });
}

export async function POST(request: Request) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });

  const form = await request.formData();
  const file = form.get('file');
  const alt = String(form.get('alt') ?? '');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'File is required.' }, { status: 400 });
  }
  const invalid = validateMediaUpload({ type: file.type, size: file.size });
  if (invalid) return NextResponse.json({ ok: false, error: invalid }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  const media = await storeCmsMediaFile({
    buffer,
    mime: file.type,
    filename: file.name || 'upload',
    alt,
    uploadedBy: actor.id,
  });
  return NextResponse.json({ ok: true, media });
}
