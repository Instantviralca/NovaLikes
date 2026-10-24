'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Heart,
  MessageCircle,
  ThumbsUp,
  UserPlus,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { useResolvePublicHref } from '@/components/i18n/locale-link';
import { PlatformIcon } from '@/components/marketing/platform-selector/platform-icon';
import { getPlatformNavItems } from '@/data/navigation';
import { isCoreServiceSlug } from '@/lib/i18n/config';
import { prefetchForHref } from '@/lib/linking/prefetch';
import type { PlatformId, Service, ServiceCategory } from '@/types';
import { cn } from '@/lib/utils';

type ServicesNavMenuProps = {
  label: string;
  className?: string;
};

const SERVICE_BLURB: Record<ServiceCategory, string> = {
  followers: 'Grow your audience',
  likes: 'Give your content a boost',
  views: 'Get more eyes on your videos',
  comments: 'Start the conversation',
  subscribers: 'Grow your channel',
  'page-likes': 'Build trust in your Page',
  'post-likes': 'Add social proof to posts',
};

const SERVICE_ICON: Record<ServiceCategory, LucideIcon> = {
  followers: UserPlus,
  likes: Heart,
  views: Eye,
  comments: MessageCircle,
  subscribers: Users,
  'page-likes': ThumbsUp,
  'post-likes': Heart,
};

/**
 * Buzzoid-style Services menu: platform list (left) + service flyout (right).
 */
export function ServicesNavMenu({ label, className }: ServicesNavMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [activePlatformId, setActivePlatformId] = useState<PlatformId>('instagram');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const router = useRouter();
  const { ui } = useI18nChrome();
  const resolveHref = useResolvePublicHref();
  const platforms = getPlatformNavItems().filter((p) => p.services.length > 0);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open || platforms.length === 0) return;
    if (!platforms.some((p) => p.platform.id === activePlatformId)) {
      setActivePlatformId(platforms[0]!.platform.id);
    }
  }, [open, platforms, activePlatformId]);

  const updateCoords = () => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rtl = document.documentElement.dir === 'rtl';
    const left = rtl
      ? Math.max(12, rect.right - 200)
      : Math.min(rect.left, window.innerWidth - 520);
    setCoords({ top: rect.bottom + 10, left: Math.max(12, left) });
  };

  const prefetchMenu = () => {
    try {
      for (const platform of platforms) {
        router.prefetch(resolveHref(platform.href));
        for (const service of platform.services) {
          router.prefetch(resolveHref(service.url));
        }
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
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (wrapRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest('[data-services-panel]')) return;
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

  const platformLabel = (id: PlatformId) =>
    id === 'instagram' ? ui.nav.instagram : id === 'tiktok' ? ui.nav.tiktok : ui.nav.facebook;

  const active = platforms.find((p) => p.platform.id === activePlatformId) ?? platforms[0];

  const serviceTitle = (service: Service) =>
    isCoreServiceSlug(service.slug) ? service.shortName : service.navigationLabel;

  const panel =
    open && mounted && active
      ? createPortal(
          <div
            data-services-panel
            id={menuId}
            className="flex items-start gap-2"
            style={{ position: 'fixed', top: coords.top, left: coords.left, zIndex: 80 }}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            {/* Platform rail */}
            <div className="w-[11.5rem] rounded-2xl border border-[var(--nl-border)] bg-[#F7F7F8] p-1.5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.4)]">
              <ul role="list" className="space-y-0.5">
                {platforms.map((platform) => {
                  const id = platform.platform.id;
                  const selected = id === active.platform.id;
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-sm font-semibold text-[var(--nl-ink)] transition-colors',
                          selected ? 'bg-white shadow-sm' : 'hover:bg-white/70',
                        )}
                        onMouseEnter={() => setActivePlatformId(id)}
                        onFocus={() => setActivePlatformId(id)}
                        aria-expanded={selected}
                        aria-controls={`${menuId}-services`}
                      >
                        <PlatformIcon
                          platformId={id}
                          iconKey={platform.platform.icon}
                          className="!size-7 !rounded-md !bg-transparent"
                        />
                        <span className="min-w-0 flex-1 truncate">{platformLabel(id)}</span>
                        <ChevronRight className="size-4 shrink-0 text-[var(--nl-muted)]" aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Service flyout */}
            <div
              id={`${menuId}-services`}
              className="min-w-[16.5rem] rounded-2xl border border-[var(--nl-border)] bg-white p-1.5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.4)]"
            >
              <ul role="list" className="space-y-0.5">
                {active.services.map((service) => {
                  const href = resolveHref(service.url);
                  const Icon = SERVICE_ICON[service.category] ?? UserPlus;
                  return (
                    <li key={service.id}>
                      <Link
                        href={href}
                        prefetch={prefetchForHref(href)}
                        className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F3F4F6]"
                        onClick={() => setOpen(false)}
                      >
                        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center text-[var(--nl-ink)]">
                          <Icon className="size-[1.15rem]" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold leading-tight text-[var(--nl-ink)]">
                            {serviceTitle(service)}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-[var(--nl-muted)]">
                            {SERVICE_BLURB[service.category]}
                          </span>
                        </span>
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
      <button
        type="button"
        className="inline-flex h-full items-center gap-1 rounded-md px-3 text-sm font-medium text-[var(--nl-ink)] transition-colors hover:text-[var(--nl-orange)]"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? menuId : undefined}
        onClick={() => {
          if (open) {
            setOpen(false);
            return;
          }
          openMenu();
        }}
      >
        {label}
        <ChevronDown
          className={cn('h-3.5 w-3.5 opacity-60 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      {panel}
    </div>
  );
}
