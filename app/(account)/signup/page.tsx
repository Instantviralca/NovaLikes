import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { SignupForm } from '@/components/account/signup-form';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { getCustomerFromCookies } from '@/lib/customers/session';

export const metadata: Metadata = {
  title: 'Create account',
  robots: { index: false, follow: false },
};

export default async function SignupPage() {
  const customer = await getCustomerFromCookies();
  if (customer) {
    redirect('/dashboard');
  }
  return (
    <Section>
      <Container size="sm" className="py-4">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <SignupForm />
        </Suspense>
      </Container>
    </Section>
  );
}
