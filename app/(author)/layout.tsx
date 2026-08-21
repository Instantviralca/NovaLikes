import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { AuthorShell } from '@/components/author/author-shell';
import { requireAdminFromCookies } from '@/lib/admin/auth';
import { AUTHOR_SESSION_COOKIE, resolveAuthorFromToken } from '@/lib/cms/auth';

export const metadata: Metadata = {
  title: 'Author Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

async function enforceAuthorSession() {
  const pathname = (await headers()).get('x-nl-pathname') || '';
  if (pathname === '/author/login' || pathname.startsWith('/author/login/')) {
    return;
  }
  const jar = await cookies();
  const author = await resolveAuthorFromToken(jar.get(AUTHOR_SESSION_COOKIE)?.value);
  if (author) return;
  if (await requireAdminFromCookies(jar)) return;
  redirect('/author/login');
}

export default async function AuthorRootLayout({ children }: { children: ReactNode }) {
  await enforceAuthorSession();
  return <AuthorShell>{children}</AuthorShell>;
}
