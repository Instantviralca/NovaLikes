'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { HOME_TT } from '@/data/content/home-tiktok-v2';
import { clearStickyBarOffset, setStickyBarOffset } from '@/lib/ui/sticky-bar-offset';

/** Mobile sticky CTA — scroll-based (no IntersectionObserver). */
export function HomeTikTokStickyCta() {
  const { stickyCta } = HOME_TT;
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let attached = false;
    const onScroll = () => {
      const y = window.scrollY || 0;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      const nearBottom = doc > 0 && y > doc - 220;
      setVisible(y > 320 && !nearBottom);
    };
    const attach = () => {
      if (attached) return;
      attached = true;
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(attach, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(attach, 200);
    }
    return () => {
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (!visible) {
      clearStickyBarOffset();
      return;
    }
    const el = barRef.current;
    if (!el) return;
    const publish = () => setStickyBarOffset(el.getBoundingClientRect().height);
    publish();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(publish) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      clearStickyBarOffset();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={barRef} className="tt-sticky lg:hidden" role="region" aria-label={stickyCta.label}>
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-semibold text-[var(--nl-ink)]">TikTok packages</p>
        <Link href={stickyCta.href} className="tt-btn-primary shrink-0 px-4">
          {stickyCta.label}
        </Link>
      </div>
    </div>
  );
}
