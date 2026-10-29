'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { MobileDrawer } from '@/components/navigation/mobile-drawer';
import { Button } from '@/components/ui/button';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import type { AccountNavState } from '@/lib/customers/nav';

export function LazyMobileMenu({ accountNav }: { accountNav?: AccountNavState }) {
  const { ui } = useI18nChrome();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative z-[60]"
        aria-label={ui.headerAria.openMenu}
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
