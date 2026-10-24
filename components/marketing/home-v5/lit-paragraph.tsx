'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Word-by-word highlight while the paragraph scrolls through the viewport.
 * Before hydration (and with prefers-reduced-motion) it renders as plain, fully dark text.
 */
export function LitParagraph({ text }: { text: string }) {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Do not mutate the DOM during load: wait for the first scroll / touch so hydration and the
    // first paint (the H1 LCP) are never competing with the word-splitting re-render.
    const start = () => setEnabled(true);
    const opts = { passive: true, once: true } as const;
    window.addEventListener('scroll', start, opts);
    window.addEventListener('touchstart', start, opts);
    window.addEventListener('keydown', start, opts);
    return () => {
      window.removeEventListener('scroll', start);
      window.removeEventListener('touchstart', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('.w'));
    if (!words.length) return;

    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55)));
      const n = Math.round(p * words.length);
      for (let i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  return (
    <p ref={ref} className={enabled ? 'lit js' : 'lit'} data-lit>
      {enabled
        ? text.split(/(\s+)/).map((part, i) =>
            /^\s+$/.test(part) || part === '' ? (
              part
            ) : (
              <span key={i} className="w">
                {part}
              </span>
            ),
          )
        : text}
    </p>
  );
}
