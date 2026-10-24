'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Stacked service cards: the card underneath shrinks and darkens (`--p`) as the next one slides over it.
 * Disabled at <= 640px and with prefers-reduced-motion (cards stay static and fully visible).
 * Scroll work starts after idle / first scroll so it does not compete with LCP.
 */
export function ServiceStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(':scope > .stack-item'));
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wideMq = window.matchMedia('(min-width: 641px)');

    const clear = () => {
      for (const item of items) item.firstElementChild?.removeAttribute('style');
    };

    let ticking = false;
    let wasOn = false;
    const frame = () => {
      ticking = false;
      const on = !reduceMq.matches && wideMq.matches;
      if (!on) {
        if (wasOn) clear();
        wasOn = false;
        return;
      }
      wasOn = true;
      for (let j = 0; j < items.length - 1; j++) {
        const card = items[j].firstElementChild as HTMLElement | null;
        if (!card) continue;
        const a = items[j].getBoundingClientRect();
        const b = items[j + 1].getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, 1 - (b.top - a.top) / Math.max(1, a.height)));
        card.style.setProperty('--p', prog.toFixed(3));
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };

    let attached = false;
    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      reduceMq.addEventListener('change', onScroll);
      frame();
    };

    // Attach on first scroll only (no timer): nothing runs during load, and the stack effect is
    // skipped entirely at <= 640px (see `frame`).
    const onFirstScroll = () => attach();
    window.addEventListener('scroll', onFirstScroll, { passive: true, once: true });

    return () => {
      window.removeEventListener('scroll', onFirstScroll);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduceMq.removeEventListener('change', onScroll);
      clear();
    };
  }, []);

  return (
    <ol ref={ref} className="stack">
      {children}
    </ol>
  );
}
