import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  ADMIN_SESSION_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import { getAdminSessionSecret, isProductionRuntime } from '@/lib/config/env';
import { verifyPassword } from '@/lib/cms/passwords';
import {
  cmsCountRecentFailures,
  cmsCreateSession,
  cmsGetSessionByHash,
  cmsGetUserByEmail,
  cmsGetUserById,
  cmsRecordLoginAttempt,
  cmsRevokeSession,
  cmsRevokeUserSessions,
  cmsUpdateUser,
  cmsWriteAudit,
} from '@/lib/cms/store';
import type { CmsUserPublic, CmsUserRecord } from '@/lib/cms/types';
import { stripPasswordHash } from '@/lib/cms/types';

export const AUTHOR_SESSION_COOKIE = 'nl_author_session';
export const AUTHOR_CSRF_COOKIE = 'nl_author_csrf';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const LOGIN_WINDOW_MS = 1000 * 60 * 15;
const MAX_FAILURES = 5;

export type CmsActor = {
  id: string;
  name: string;
  email: string | null;
  role: 'admin' | 'author';
  kind: 'admin' | 'author';
};

export type AuthorSessionPayload = {
  role: 'author';
  uid: string;
  sid: string;
  exp: number;
};

function getSessionSecret(): string {
  const secret = getAdminSessionSecret();
  if (secret) return secret;
  if (isProductionRuntime()) {
    throw new Error('IV_ADMIN_SESSION_SECRET (or SESSION_SECRET) is required in production.');
  }
  return 'dev-only-insecure-author-secret';
}

function sign(value: string): string {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

export function hashAuthorToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function hashAuthorIp(ip: string): string {
  return createHash('sha256').update(`author-ip:${ip}`).digest('hex').slice(0, 32);
}

export function getAuthorSessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export function getAuthorCsrfCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export function verifyAuthorSessionSignature(
  token: string | undefined | null,
): AuthorSessionPayload | null {
  if (!token || !token.includes('.')) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  const expected = sign(body);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as AuthorSessionPayload;
    if (payload.role !== 'author' || !payload.uid || !payload.sid) return null;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createAuthorSession(user: CmsUserRecord): Promise<{
  token: string;
  csrfToken: string;
}> {
  const sid = randomBytes(16).toString('hex');
  const payload: AuthorSessionPayload = {
    role: 'author',
    uid: user.id,
    sid,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const token = `${body}.${sign(body)}`;
  const csrfToken = randomBytes(24).toString('base64url');
  await cmsCreateSession({
    id: sid,
    userId: user.id,
    tokenHash: hashAuthorToken(token),
    expiresAt: new Date(payload.exp).toISOString(),
    revokedAt: null,
  });
  return { token, csrfToken };
}

export async function authenticateAuthor(
  email: string,
  password: string,
  ip: string,
): Promise<{ ok: true; user: CmsUserPublic; token: string; csrfToken: string } | { ok: false; error: string; status: number }> {
  const since = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();
  const failures = await cmsCountRecentFailures(hashAuthorIp(ip), since);
  if (failures >= MAX_FAILURES) {
    return { ok: false, error: 'Too many login attempts. Try again later.', status: 429 };
  }

  const user = await cmsGetUserByEmail(email);
  const passwordOk = user ? await verifyPassword(password, user.passwordHash) : false;
  if (!user || !passwordOk) {
    await cmsRecordLoginAttempt(hashAuthorIp(ip), false);
    return { ok: false, error: 'Invalid credentials.', status: 401 };
  }
  if (user.status !== 'active') {
    await cmsRecordLoginAttempt(hashAuthorIp(ip), false);
    return { ok: false, error: 'This author account is disabled.', status: 403 };
  }
  if (user.role !== 'author' && user.role !== 'admin') {
    return { ok: false, error: 'Invalid credentials.', status: 401 };
  }

  await cmsRecordLoginAttempt(hashAuthorIp(ip), true);
  await cmsUpdateUser(user.id, { lastLoginAt: new Date().toISOString() });
  const session = await createAuthorSession(user);
  await cmsWriteAudit({ actorId: user.id, action: 'author_login' });
  return { ok: true, user: stripPasswordHash(user), token: session.token, csrfToken: session.csrfToken };
}

export async function resolveAuthorFromToken(
  token: string | undefined | null,
): Promise<CmsUserRecord | null> {
  const payload = verifyAuthorSessionSignature(token);
  if (!payload || !token) return null;
  const session = await cmsGetSessionByHash(hashAuthorToken(token));
  if (!session || session.revokedAt) return null;
  if (new Date(session.expiresAt).getTime() < Date.now()) return null;
  const user = await cmsGetUserById(payload.uid);
  if (!user || user.status !== 'active') return null;
  return user;
}

export async function revokeAuthorSession(token: string | undefined | null): Promise<void> {
  if (!token) return;
  await cmsRevokeSession(hashAuthorToken(token));
}

export async function disableAuthorAccess(userId: string): Promise<void> {
  await cmsRevokeUserSessions(userId);
}

export async function requireCmsActor(request: Request): Promise<CmsActor | null> {
  const jar = await cookies();
  const authorToken = jar.get(AUTHOR_SESSION_COOKIE)?.value;
  const author = await resolveAuthorFromToken(authorToken);
  if (author) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const csrfCookie = jar.get(AUTHOR_CSRF_COOKIE)?.value;
      const csrfHeader = request.headers.get('x-csrf-token') ?? undefined;
      if (!verifyCsrfToken(csrfCookie, csrfHeader)) return null;
    }
    return {
      id: author.id,
      name: author.name,
      email: author.email,
      role: author.role,
      kind: 'author',
    };
  }

  const adminOk = await requireAdminFromCookies(jar);
  if (!adminOk) return null;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const csrfCookie = jar.get(ADMIN_CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get('x-csrf-token') ?? undefined;
    if (!verifyCsrfToken(csrfCookie, csrfHeader)) return null;
  }
  return {
    id: 'admin',
    name: 'Admin',
    email: null,
    role: 'admin',
    kind: 'admin',
  };
}

export async function hasCmsPreviewAccess(): Promise<boolean> {
  const jar = await cookies();
  if (await requireAdminFromCookies(jar)) return true;
  const author = await resolveAuthorFromToken(jar.get(AUTHOR_SESSION_COOKIE)?.value);
  return Boolean(author);
}

export { ADMIN_SESSION_COOKIE };
