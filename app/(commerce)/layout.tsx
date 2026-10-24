import type { ReactNode } from 'react';

/**
 * Commerce route group — leaf layouts own chrome:
 * - `(storefront)` → full site nav/footer (cart, order-success)
 * - `(checkout-flow)` → checkout-only shell (no site nav)
 */
export default function CommerceLayout({ children }: { children: ReactNode }) {
  return children;
}
