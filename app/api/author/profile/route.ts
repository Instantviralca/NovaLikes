import { NextResponse } from 'next/server';

import { requireCmsActor } from '@/lib/cms/auth';
import { hashPassword, isStrongPassword } from '@/lib/cms/passwords';
import { cmsGetUserByEmail, cmsGetUserById, cmsUpdateUser } from '@/lib/cms/store';
import { stripPasswordHash } from '@/lib/cms/types';

export const runtime = 'nodejs';

export async function PATCH(request: Request) {
  const actor = await requireCmsActor(request);
  if (!actor || actor.kind !== 'author') {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  const body = (await request.json()) as {
    name?: string;
    bio?: string;
    profileImage?: string | null;
    email?: string;
    password?: string;
  };
  const current = await cmsGetUserById(actor.id);
  if (!current) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });

  if (body.email && body.email.trim().toLowerCase() !== current.email) {
    const taken = await cmsGetUserByEmail(body.email);
    if (taken) return NextResponse.json({ ok: false, error: 'Email already in use.' }, { status: 400 });
  }
  if (body.password && !isStrongPassword(body.password)) {
    return NextResponse.json({ ok: false, error: 'Password must be at least 12 characters.' }, { status: 400 });
  }

  const updated = await cmsUpdateUser(actor.id, {
    name: body.name?.trim() || current.name,
    bio: body.bio === undefined ? current.bio : body.bio,
    profileImage: body.profileImage === undefined ? current.profileImage : body.profileImage,
    email: body.email?.trim().toLowerCase() || current.email,
    passwordHash: body.password ? await hashPassword(body.password) : current.passwordHash,
  });
  return NextResponse.json({ ok: true, user: updated ? stripPasswordHash(updated) : null });
}
