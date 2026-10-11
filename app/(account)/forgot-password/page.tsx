import type { Metadata } from 'next';

import { ForgotPasswordForm } from '@/components/account/forgot-password-form';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Reset password',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <Section>
      <Container size="sm" className="py-4">
        <ForgotPasswordForm />
      </Container>
    </Section>
  );
}
