'use client';

import { useEffect, useRef } from 'react';

/**
 * Server HTML shows the final count (data-count). On the client, counts up 0 → target once
 * when the element enters the viewport (threshold 0.6, 1400ms ease-out cubic).
 * Reduced motion keeps the final number.
 */
export function V1StepCounter({ count = 2000 }: { count?: number }) {
  const ref = useRef<HTMLElement>(null);
  const label = count.toLocaleString('en-US');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const target = Number(el.dataset.count ?? String(count));
    el.textContent = '0';

    if (typeof IntersectionObserver === 'undefined') {
      el.textContent = target.toLocaleString('en-US');
      return;
    }

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries[0]?.isIntersecting) return;
        done = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / 1400);
          const e = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(target * e).toLocaleString('en-US');
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [count]);

  return (
    <b ref={ref} data-count={String(count)}>
      {label}
    </b>
  );
}
