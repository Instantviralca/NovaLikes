'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  AUTHOR_CSRF_COOKIE,
  AUTHOR_SESSION_COOKIE,
  authenticateAuthor,
  getAuthorCsrfCookieOptions,
  getAuthorSessionCookieOptions,
} from '@/lib/cms/auth';

export type AuthorLoginState = {
  error?: string;
};

function safeNextPath(value: unknown): string {
  if (typeof value !== 'string') return '/author';
  const path = value.trim();
  if (!path.startsWith('/author')) return '/author';
  if (path.startsWith('//') || path.includes('\\') || path.includes('://')) return '/author';
  return path;
}

export async function loginAuthorAction(formData: FormData): Promise<void> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const nextPath = safeNextPath(formData.get('next'));

  const headerStore = await headers();
  const ip =
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    'unknown';

  const result = await authenticateAuthor(email, password, ip);
  if (!result.ok) {
    const login = new URL('/author/login', 'http://local.invalid');
    login.searchParams.set('error', result.error);
    if (nextPath !== '/author') login.searchParams.set('next', nextPath);
    redirect(`${login.pathname}${login.search}`);
  }

  const jar = await cookies();
  jar.set(AUTHOR_SESSION_COOKIE, result.token, getAuthorSessionCookieOptions());
  jar.set(AUTHOR_CSRF_COOKIE, result.csrfToken, getAuthorCsrfCookieOptions());
  redirect(nextPath);
}
