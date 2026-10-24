import Link from 'next/link';

import type { AccountNavState } from '@/lib/customers/nav';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';

type AccountNavLinkProps = {
  accountNav: AccountNavState;
  className?: string;
};

export function AccountNavLink({ accountNav, className }: AccountNavLinkProps) {
  if (!accountNav) return null;
  return (
    <Link
      href={accountNav.href}
      prefetch={prefetchForHref(accountNav.href)}
      className={cn(
        'inline-flex h-10 items-center rounded-xl px-3 text-sm font-semibold text-[var(--nl-ink)] transition-colors hover:text-[var(--nl-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {accountNav.label}
    </Link>
  );
}
