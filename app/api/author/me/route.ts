import { NextResponse } from 'next/server';

import { requireCmsActor } from '@/lib/cms/auth';
import { cmsGetUserById } from '@/lib/cms/store';
import { stripPasswordHash } from '@/lib/cms/types';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const actor = await requireCmsActor(request);
  if (!actor) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  if (actor.kind === 'admin') {
    return NextResponse.json({
      ok: true,
      user: {
        id: 'admin',
        name: 'Admin',
        email: null,
        role: 'admin',
        status: 'active',
        profileImage: null,
        bio: null,
      },
    });
  }
  const user = await cmsGetUserById(actor.id);
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  return NextResponse.json({ ok: true, user: stripPasswordHash(user) });
}
