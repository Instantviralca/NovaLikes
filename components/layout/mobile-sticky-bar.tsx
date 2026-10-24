'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

import { clearStickyBarOffset, setStickyBarOffset } from '@/lib/ui/sticky-bar-offset';
import { cn } from '@/lib/utils';

/** Fixed mobile bottom bar that lifts the WhatsApp float via --nl-sticky-bar-h. */
export function MobileStickyBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const publish = () => setStickyBarOffset(el.getBoundingClientRect().height);
    publish();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(publish) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      clearStickyBarOffset();
    };
  }, []);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
