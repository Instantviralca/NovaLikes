import { NextResponse } from 'next/server';

import {
  AUTHOR_CSRF_COOKIE,
  AUTHOR_SESSION_COOKIE,
  authenticateAuthor,
  getAuthorCsrfCookieOptions,
  getAuthorSessionCookieOptions,
} from '@/lib/cms/auth';

export const runtime = 'nodejs';

function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: Request) {
  let email = '';
  let password = '';
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = (body.email ?? '').trim().toLowerCase();
    password = body.password ?? '';
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid credentials.' }, { status: 401 });
  }

  let result;
  try {
    result = await authenticateAuthor(email, password, clientIp(request));
  } catch (error) {
    console.error('[author/login]', error);
    return NextResponse.json(
      { ok: false, error: 'Sign-in is unavailable right now. Please try again later.' },
      { status: 500 },
    );
  }
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  const response = NextResponse.json({ ok: true, user: result.user });
  response.cookies.set(AUTHOR_SESSION_COOKIE, result.token, getAuthorSessionCookieOptions());
  response.cookies.set(AUTHOR_CSRF_COOKIE, result.csrfToken, getAuthorCsrfCookieOptions());
  return response;
}
