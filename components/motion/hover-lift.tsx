import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type HoverLiftProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function HoverLift({ className, ...props }: HoverLiftProps) {
  return <div className={cn('nl-hover-lift', className)} {...props} />;
}
