import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ADMIN_CSRF_COOKIE, requireAdminFromCookies, verifyCsrfToken } from '@/lib/admin/auth';
import { disableAuthorAccess } from '@/lib/cms/auth';
import { hashPassword, isStrongPassword } from '@/lib/cms/passwords';
import { cmsDeleteUser, cmsGetUserByEmail, cmsGetUserById, cmsUpdateUser, cmsWriteAudit } from '@/lib/cms/store';
import { stripPasswordHash } from '@/lib/cms/types';

export const runtime = 'nodejs';

type Context = { params: Promise<{ id: string }> };

async function requireAdmin(request: Request) {
  const jar = await cookies();
  if (!(await requireAdminFromCookies(jar))) return false;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (!verifyCsrfToken(jar.get(ADMIN_CSRF_COOKIE)?.value, request.headers.get('x-csrf-token') ?? undefined)) {
      return false;
    }
  }
  return true;
}

export async function PATCH(request: Request, context: Context) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  const { id } = await context.params;
  const current = await cmsGetUserById(id);
  if (!current) return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    bio?: string | null;
    profileImage?: string | null;
    status?: 'active' | 'disabled';
    password?: string;
  };
  if (body.email && body.email.trim().toLowerCase() !== current.email) {
    const taken = await cmsGetUserByEmail(body.email);
    if (taken && taken.id !== id) {
      return NextResponse.json({ ok: false, error: 'Email already in use.' }, { status: 400 });
    }
  }
  if (body.password && !isStrongPassword(body.password)) {
    return NextResponse.json({ ok: false, error: 'Password must be at least 12 characters.' }, { status: 400 });
  }
  const updated = await cmsUpdateUser(id, {
    name: body.name?.trim() || current.name,
    email: body.email?.trim().toLowerCase() || current.email,
    bio: body.bio === undefined ? current.bio : body.bio,
    profileImage: body.profileImage === undefined ? current.profileImage : body.profileImage,
    status: body.status ?? current.status,
    passwordHash: body.password ? await hashPassword(body.password) : current.passwordHash,
  });
  if (body.status === 'disabled') await disableAuthorAccess(id);
  await cmsWriteAudit({ actorId: 'admin', action: 'author_updated' });
  return NextResponse.json({ ok: true, author: updated ? stripPasswordHash(updated) : null });
}

export async function DELETE(request: Request, context: Context) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  const { id } = await context.params;
  const current = await cmsGetUserById(id);
  if (!current) return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  await disableAuthorAccess(id);
  const ok = await cmsDeleteUser(id);
  await cmsWriteAudit({ actorId: 'admin', action: 'author_deleted' });
  return NextResponse.json({ ok });
}
