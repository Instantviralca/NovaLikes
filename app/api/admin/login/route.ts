import { NextResponse } from 'next/server';

import {
  ADMIN_CSRF_COOKIE,
  ADMIN_SESSION_COOKIE,
  assertLoginAllowed,
  createAdminSessionToken,
  getAdminCsrfCookieOptions,
  getAdminSessionCookieOptions,
  isAdminAuthConfigured,
  recordLoginAttempt,
  verifyAdminPassword,
} from '@/lib/admin/auth';

export const runtime = 'nodejs';

function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function loginErrorHint(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (lower.includes('session_secret') || lower.includes('admin_session_secret')) {
    return 'Set IV_ADMIN_SESSION_SECRET in Vercel and redeploy.';
  }

  if (
    lower.includes('relation') ||
    lower.includes('does not exist') ||
    lower.includes('admin_sessions') ||
    lower.includes('admin_login_attempts') ||
    lower.includes('schema')
  ) {
    return 'Database tables missing. Run SQL migrations (drizzle/0001_init.sql) on your Neon DB, then retry.';
  }

  if (
    lower.includes('database') ||
    lower.includes('postgres') ||
    lower.includes('connect') ||
    lower.includes('econnrefused') ||
    lower.includes('timeout') ||
    lower.includes('ssl') ||
    lower.includes('password authentication')
  ) {
    return 'DATABASE_URL connection failed. Check the Neon connection string in Vercel.';
  }

  // Safe short detail for operators (no secrets in typical Drizzle/Postgres messages).
  const short = message.replace(/\s+/g, ' ').trim().slice(0, 160);
  return short
    ? `Login server error: ${short}`
    : 'Server error during login. Check Vercel logs.';
}

export async function POST(request: Request) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { ok: false, error: 'Admin authentication is unavailable.' },
        { status: 503 },
      );
    }

    const ip = clientIp(request);
    const rate = await assertLoginAllowed(ip);
    if (!rate.ok) {
      return NextResponse.json({ ok: false, error: rate.error }, { status: 429 });
    }

    let password = '';
    try {
      const body = (await request.json()) as { password?: string };
      password = (body.password ?? '').trim();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid credentials.' }, { status: 401 });
    }

    if (!verifyAdminPassword(password)) {
      try {
        await recordLoginAttempt(ip, false);
      } catch (error) {
        console.error('[admin/login] record failure attempt:', error);
      }
      return NextResponse.json({ ok: false, error: 'Invalid credentials.' }, { status: 401 });
    }

    try {
      await recordLoginAttempt(ip, true);
    } catch (error) {
      console.error('[admin/login] record success attempt:', error);
    }

    const session = await createAdminSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      session.token,
      getAdminSessionCookieOptions(),
    );
    response.cookies.set(ADMIN_CSRF_COOKIE, session.csrfToken, getAdminCsrfCookieOptions());
    return response;
  } catch (error) {
    console.error('[admin/login]', error);
    return NextResponse.json({ ok: false, error: loginErrorHint(error) }, { status: 500 });
  }
}
