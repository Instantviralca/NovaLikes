import Link from 'next/link';
import type { ReactNode } from 'react';

import { Logo } from '@/components/common/logo';
import { getSiteOrigin } from '@/lib/config/hosts';

type CheckoutShellProps = {
  children: ReactNode;
};

/**
 * Minimal chrome for checkout.novalikes.com — logo + secure checkout framing.
 */
export function CheckoutShell({ children }: CheckoutShellProps) {
  const siteOrigin = getSiteOrigin();

  return (
    <div className="flex min-h-screen flex-col bg-hero-wash text-foreground">
      <header className="border-b border-[var(--border-subtle)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Logo href={siteOrigin} />
          <Link
            href={siteOrigin}
            className="text-sm font-medium text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline"
          >
            Back to NovaLikes
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[var(--border-subtle)] bg-white/80 py-4 text-center text-xs text-[var(--text-secondary)]">
        Secure checkout · Encrypted card payment
      </footer>
    </div>
  );
}
