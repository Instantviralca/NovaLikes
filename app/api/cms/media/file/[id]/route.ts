import { NextResponse } from 'next/server';

import { readLocalCmsMedia } from '@/lib/cms/storage';

export const runtime = 'nodejs';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  if (!/^media_[a-f0-9]+$/i.test(id)) {
    return new NextResponse('Not found', { status: 404 });
  }
  const file = await readLocalCmsMedia(id);
  if (!file) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(new Uint8Array(file.buffer), {
    headers: {
      'Content-Type': file.mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
