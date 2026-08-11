'use client';

import { useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { AdminTopbar } from '@/components/admin/layout/admin-topbar';
import { AdminSidebar } from '@/components/admin/navigation/admin-sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type AdminLayoutProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Admin shell — Document 12.01.
 * Desktop sidebar · Tablet collapsible · Mobile drawer.
 * Auth enforced by middleware + /admin/login.
 */
export function AdminLayout({ children, className }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className={cn('min-h-screen bg-muted/30 text-foreground', className)}>
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r bg-background lg:block">
          <div className="border-b px-4 py-4 text-sm font-semibold">NovaLikes Admin</div>
          <AdminSidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar
            onOpenNav={() => setMobileOpen(true)}
            onLogout={handleLogout}
          />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="border-b px-4 py-4 text-sm font-semibold">NovaLikes Admin</div>
          <AdminSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
