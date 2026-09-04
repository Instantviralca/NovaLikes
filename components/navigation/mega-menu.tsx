'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

import { getMegaMenuServices } from '@/data/navigation';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { useResolvePublicHref } from '@/components/i18n/locale-link';
import { isCoreServiceSlug } from '@/lib/i18n/config';
import { prefetchForHref } from '@/lib/linking/prefetch';
import type { NavMegaMenuItem } from '@/types';
import { cn } from '@/lib/utils';

type MegaMenuProps = {
  item: NavMegaMenuItem;
  className?: string;
};

export function MegaMenu({ item, className }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const services = getMegaMenuServices(item.platformId);
  const router = useRouter();
  const { ui } = useI18nChrome();
  const resolveHref = useResolvePublicHref();

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const updateCoords = () => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const panelWidth = 240;
    const rtl = document.documentElement.dir === 'rtl';
    const rawLeft = rtl ? rect.right - panelWidth : rect.left;
    const left = Math.max(8, Math.min(rawLeft, window.innerWidth - panelWidth - 8));
    setCoords({ top: rect.bottom, left });
  };

  const prefetchMenu = () => {
    try {
      router.prefetch(item.href);
      for (const service of services) {
        router.prefetch(resolveHref(service.url));
      }
    } catch {
      // Prefetch must never block the menu from opening.
    }
  };

  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    updateCoords();
    setOpen(true);
    prefetchMenu();
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (wrapRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest('[data-mega-panel]')) return;
      close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const panel =
    open && mounted
      ? createPortal(
          <div
            data-mega-panel
            className="min-w-56 pt-2"
            style={{ position: 'fixed', top: coords.top, left: coords.left, zIndex: 80 }}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
              <ul className="space-y-1">
                {services.map((service) => {
                  const href = resolveHref(service.url);
                  const label = isCoreServiceSlug(service.slug)
                    ? ui.services[service.slug]
                    : service.navigationLabel;
                  return (
                    <li key={service.id}>
                      <Link
                        href={href}
                        prefetch={prefetchForHref(href)}
                        className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      ref={wrapRef}
      className={cn('relative flex h-full items-center', className)}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <Link
        href={item.href}
        prefetch={prefetchForHref(item.href)}
        className="inline-flex h-full items-center gap-1 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={(event) => {
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && open) {
            return;
          }
          event.preventDefault();
          if (open) {
            setOpen(false);
            return;
          }
          openMenu();
        }}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      </Link>
      {panel}
    </div>
  );
}
