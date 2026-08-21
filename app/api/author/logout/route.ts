import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  AUTHOR_CSRF_COOKIE,
  AUTHOR_SESSION_COOKIE,
  getAuthorCsrfCookieOptions,
  getAuthorSessionCookieOptions,
  revokeAuthorSession,
} from '@/lib/cms/auth';

export const runtime = 'nodejs';

export async function POST() {
  const jar = await cookies();
  await revokeAuthorSession(jar.get(AUTHOR_SESSION_COOKIE)?.value);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTHOR_SESSION_COOKIE, '', { ...getAuthorSessionCookieOptions(0), maxAge: 0 });
  response.cookies.set(AUTHOR_CSRF_COOKIE, '', { ...getAuthorCsrfCookieOptions(0), maxAge: 0 });
  return response;
}
