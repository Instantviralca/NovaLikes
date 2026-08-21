'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, type ReactNode } from 'react';

import { cmsFetch } from '@/components/author/cms-fetch';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/author', label: 'Dashboard', match: 'exact' as const },
  { href: '/author/articles', label: 'All Articles' },
  { href: '/author/articles/new', label: 'New Article' },
  { href: '/author/scheduled', label: 'Calendar' },
  { href: '/author/articles?status=planned', label: 'Planned' },
  { href: '/author/articles?status=draft', label: 'Drafts' },
  { href: '/author/articles?status=trash', label: 'Trash' },
  { href: '/author/media', label: 'Media' },
  { href: '/author/profile', label: 'Profile' },
];

function navIsActive(pathname: string, search: string, href: string, match?: 'exact') {
  const url = new URL(href, 'http://local.invalid');
  const path = url.pathname;
  const status = url.searchParams.get('status');
  const currentStatus = new URLSearchParams(search).get('status');

  if (match === 'exact') return pathname === path;
  if (status) return pathname === '/author/articles' && currentStatus === status;
  if (path === '/author/articles/new') return pathname === '/author/articles/new';
  if (path === '/author/articles') {
    if (pathname === '/author/articles/new') return false;
    if (pathname === '/author/articles') return !currentStatus;
    return pathname.startsWith('/author/articles/');
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Author">
      {NAV.map((item) => {
        const active = navIsActive(pathname, search, item.href, item.match);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium',
              active ? 'bg-[#E85D04] text-white' : 'text-[#5C564F] hover:bg-[#FFF1E6] hover:text-[#E85D04]',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AuthorShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === '/author/login' || pathname.startsWith('/author/login/')) {
    return <>{children}</>;
  }

  async function logout() {
    await cmsFetch('/api/author/logout', { method: 'POST' });
    router.replace('/author/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FFF8F3] text-[#1A1A1A]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-[#F0E4D8] bg-white lg:block">
          <div className="border-b border-[#F0E4D8] px-4 py-4 text-sm font-semibold text-[#E85D04]">
            NovaLikes
          </div>
          <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A837C]">
            Articles
          </p>
          <Suspense fallback={<nav className="flex flex-col gap-1 p-3" aria-label="Author" />}>
            <NavLinks />
          </Suspense>
          <div className="px-3">
            <Button type="button" variant="outline" className="w-full" onClick={logout}>
              Logout
            </Button>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[#F0E4D8] bg-white px-4 py-3 lg:px-6">
            <button
              type="button"
              className="rounded-md px-2 py-1 text-sm lg:hidden"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
            <p className="text-sm font-medium text-[#5C564F]">Author Dashboard</p>
            <Button type="button" variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="border-b px-4 py-4 text-sm font-semibold">NovaLikes</div>
          <Suspense fallback={<nav className="flex flex-col gap-1 p-3" aria-label="Author" />}>
            <NavLinks onNavigate={() => setOpen(false)} />
          </Suspense>
          <div className="px-3 pb-4">
            <Button type="button" variant="outline" className="w-full" onClick={logout}>
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
