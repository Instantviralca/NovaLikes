import type { ReactNode } from 'react';

/** Orange last word — tools-hub heading style. Does not change the words. */
export function accentLastWord(title: string): ReactNode {
  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) return title;
  const last = parts.pop() as string;
  return (
    <>
      {parts.join(' ')}{' '}
      <span className="text-[var(--brand-primary)]">{last}</span>
    </>
  );
}

export const HERO_HEADING_CLASS =
  'max-w-xl !text-[2rem] !leading-[1.12] tracking-tight sm:!text-[2.55rem]';
