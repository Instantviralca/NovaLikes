import * as React from 'react';

import { cn } from '@/lib/utils';

export type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

/** Tools-hub pill eyebrow — hug text width (no full-row stretch). */
export function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex w-fit max-w-full items-center self-start rounded-full bg-[#FFE4D1] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#E85D04]',
        className,
      )}
      {...props}
    />
  );
}
