import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type PageTransitionProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function PageTransition({ className, ...props }: PageTransitionProps) {
  return <div className={cn('nl-fade-up', className)} {...props} />;
}
