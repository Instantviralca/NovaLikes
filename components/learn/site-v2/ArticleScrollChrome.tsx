'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Reading progress bar + TOC scroll highlight.
 * Port of `_tmp_site_v2/reference/site-v2.js`:
 * - sets the width of the 3px gradient `.progress` bar from the position inside `[data-learn-article]`;
 * - toggles `.on` on the `.toc a` link whose heading is the last one above 140px from the viewport top.
 */
export function ArticleScrollChrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const bar = barRef.current;
    const article = document.querySelector<HTMLElement>('[data-learn-article]');
    // Prototype scopes to the sidebar TOC only (`.art-side .toc a`) so mobile + desktop
    // lists don't double-count the same headings.
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.art-side .toc a'),
    );
    const heads = links.map((link) => {
      const hash = link.getAttribute('href') ?? '';
      return hash.startsWith('#') && hash.length > 1
        ? document.getElementById(decodeURIComponent(hash.slice(1)))
        : null;
    });

    let ticking = false;

    const frame = () => {
      ticking = false;

      if (bar && article) {
        const rect = article.getBoundingClientRect();
        const total = article.offsetHeight - window.innerHeight;
        const pct = Math.min(100, Math.max(0, (-rect.top / Math.max(1, total)) * 100));
        bar.style.width = `${pct}%`;
      }

      if (links.length > 0) {
        let current = 0;
        heads.forEach((head, index) => {
          if (head && head.getBoundingClientRect().top < 140) current = index;
        });
        links.forEach((link, index) => {
          link.classList.toggle('on', index === current);
        });
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(frame);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mounted]);

  // Portal to <body>: the page content sits in a `z-10` stacking context below the sticky
  // z-50 site header, which would hide the bar. The `.site-v2` wrapper keeps the CSS tokens.
  if (!mounted) return null;
  return createPortal(
    <div className="site-v2" style={{ background: 'transparent' }}>
      <div ref={barRef} className="progress" aria-hidden="true" />
    </div>,
    document.body,
  );
}
