import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { AdminLayout } from '@/components/admin';
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionTokenAsync,
} from '@/lib/admin/auth';
import { adminMetadata } from '@/seo/metadata';

export const metadata: Metadata = adminMetadata();

type AdminRootLayoutProps = {
  children: ReactNode;
};

/**
 * Admin route group — Document 12.01 / 14.07.
 * Middleware does Edge signature checks; this layout re-checks DB revoke so
 * revoked sessions cannot keep using HTML admin pages until cookie TTL.
 */
export default async function AdminRootLayout({ children }: AdminRootLayoutProps) {
  const headerList = await headers();
  const adminPath = headerList.get('x-admin-path') ?? '';
  const onLogin = adminPath === '/admin/login' || adminPath.startsWith('/admin/login/');

  if (!onLogin) {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    const session = await verifyAdminSessionTokenAsync(token);
    if (!session) {
      redirect('/admin/login');
    }
  }

  return <AdminLayout>{children}</AdminLayout>;
}
