import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { LoginForm } from '@/components/account/login-form';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { getCustomerFromCookies } from '@/lib/customers/session';
import { safeAccountNext } from '@/lib/customers/safe-next';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const customer = await getCustomerFromCookies();
  if (customer) {
    redirect(safeAccountNext(params.next));
  }
  return (
    <Section>
      <Container size="sm" className="py-4">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <LoginForm nextPath={params.next} />
        </Suspense>
      </Container>
    </Section>
  );
}
