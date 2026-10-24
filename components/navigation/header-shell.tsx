'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type HeaderShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Buzzoid-style sticky header: full-bleed at rest, inset floating pill on scroll.
 */
export function HeaderShell({ children, className }: HeaderShellProps) {
  const [float, setFloat] = useState(false);

  useEffect(() => {
    const update = () => {
      setFloat(window.scrollY > 12);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header
      data-nl-header=""
      data-nl-header-state={float ? 'float' : 'rest'}
      className={cn('nl-site-header sticky top-0 z-50', className)}
    >
      <div className="nl-header-spacer">
        <div className="nl-header-bar" aria-hidden="true" />
        <div className="nl-header-row">{children}</div>
      </div>
    </header>
  );
}
