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
        'rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
        className,
      )}
    >
      {accountNav.label}
    </Link>
  );
}
