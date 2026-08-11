import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AdminLoginForm } from '@/components/admin/auth/admin-login-form';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { isAdminAuthConfigured } from '@/lib/admin/auth';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  const configured = isAdminAuthConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <Container size="sm" className="w-full max-w-md space-y-6 rounded-lg border bg-background p-6 shadow-xs">
        <div className="space-y-2">
          <Heading as="h1" size="h2">
            Admin sign in
          </Heading>
          <MutedText>Staff access for NovaLikes operations.</MutedText>
        </div>
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <AdminLoginForm configured={configured} />
        </Suspense>
      </Container>
    </div>
  );
}
