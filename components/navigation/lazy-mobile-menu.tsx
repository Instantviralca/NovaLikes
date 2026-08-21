'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { MobileDrawer } from '@/components/navigation/mobile-drawer';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';

export function LazyMobileMenu() {
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
      <MobileDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
