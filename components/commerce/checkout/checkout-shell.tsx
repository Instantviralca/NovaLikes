import type { ReactNode } from 'react';

type CheckoutShellProps = {
  children: ReactNode;
};

/**
 * Checkout-only wrapper — no site nav/footer.
 * Visual chrome (navy summary + form) lives in CheckoutPage.
 * URL stays `/checkout` on the same host.
 */
export function CheckoutShell({ children }: CheckoutShellProps) {
  return <div className="min-h-screen bg-white text-[var(--ink,#292F3B)]">{children}</div>;
}
