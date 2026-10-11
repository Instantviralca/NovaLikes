'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { accountFetch } from '@/lib/customers/client-fetch';
import { ACCOUNT_UI } from '@/lib/customers/messages';
import { cn } from '@/lib/utils';

const NAV: Array<{ href: string; label: string; exact?: boolean }> = [
  { href: '/dashboard', label: ACCOUNT_UI.sidebar.dashboard, exact: true },
  { href: '/dashboard/orders', label: ACCOUNT_UI.sidebar.orders },
  { href: '/dashboard/settings', label: ACCOUNT_UI.sidebar.settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await accountFetch('/api/account/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-8 pb-28 sm:py-8 md:flex-row md:gap-10">
      <aside className="md:w-52 md:shrink-0">
        <nav
          aria-label="Account"
          className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible"
        >
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-[var(--brand)] text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            type="button"
            variant="ghost"
            className="justify-start px-3 text-sm text-muted-foreground"
            onClick={() => void signOut()}
          >
            {ACCOUNT_UI.sidebar.signOut}
          </Button>
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
