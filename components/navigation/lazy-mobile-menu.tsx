'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { MobileDrawer } from '@/components/navigation/mobile-drawer';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';
import type { AccountNavState } from '@/lib/customers/nav';

export function LazyMobileMenu({ accountNav }: { accountNav?: AccountNavState }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative z-[60]"
        aria-label={`Open ${site.name} menu`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>
      <MobileDrawer open={open} onOpenChange={setOpen} accountNav={accountNav ?? null} />
    </>
  );
}
