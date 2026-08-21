import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ADMIN_CSRF_COOKIE, requireAdminFromCookies, verifyCsrfToken } from '@/lib/admin/auth';
import { disableAuthorAccess } from '@/lib/cms/auth';
import { createCmsId } from '@/lib/cms/ids';
import { hashPassword, isStrongPassword } from '@/lib/cms/passwords';
import { cmsGetUserByEmail, cmsInsertUser, cmsListUsers, cmsWriteAudit } from '@/lib/cms/store';
import { stripPasswordHash, type CmsUserRole } from '@/lib/cms/types';

export const runtime = 'nodejs';

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

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  const users = await cmsListUsers();
  return NextResponse.json({ ok: true, authors: users.map(stripPasswordHash) });
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
    bio?: string;
    role?: string;
  };
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? '';
  if (!name || !email) return NextResponse.json({ ok: false, error: 'Name and email are required.' }, { status: 400 });
  if (!isStrongPassword(password)) {
    return NextResponse.json({ ok: false, error: 'Password must be at least 12 characters.' }, { status: 400 });
  }
  if (await cmsGetUserByEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Email already in use.' }, { status: 400 });
  }
  const now = new Date().toISOString();
  const role: CmsUserRole = body.role === 'admin' ? 'admin' : 'author';
  try {
    const user = await cmsInsertUser({
      id: createCmsId('usr'),
      name,
      email,
      passwordHash: await hashPassword(password),
      profileImage: null,
      bio: body.bio?.trim() || null,
      role,
      status: 'active',
      createdAt: now,
      updatedAt: now,
      lastLoginAt: null,
    });
    await cmsWriteAudit({ actorId: 'admin', action: 'author_created' });
    void disableAuthorAccess;
    return NextResponse.json({ ok: true, author: stripPasswordHash(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not create author.';
    if (/already in use/i.test(message)) {
      return NextResponse.json({ ok: false, error: 'Email already in use.' }, { status: 400 });
    }
    throw error;
  }
}
