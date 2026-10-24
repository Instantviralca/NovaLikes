'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { HOME_V4 } from '@/data/content/home-v4';
import { clearStickyBarOffset, setStickyBarOffset } from '@/lib/ui/sticky-bar-offset';

/** Mobile sticky CTA: scroll-based (no IntersectionObserver). Uses HOME_V4.stickyCta only. */
export function HomeV4StickyCta() {
  const { stickyCta } = HOME_V4;
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
    <div ref={barRef} className="v4-sticky lg:hidden" role="region" aria-label={stickyCta.label}>
      <div className="mx-auto flex max-w-xl items-center justify-center">
        <Link href={stickyCta.href} className="v4-btn-primary w-full">
          {stickyCta.label}
        </Link>
      </div>
    </div>
  );
}
