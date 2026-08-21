import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type StaggerChildrenProps = HTMLAttributes<HTMLDivElement> & {
  stagger?: number;
  children?: ReactNode;
};

export function StaggerChildren({
  className,
  stagger = 0.08,
  children,
  style,
  ...props
}: StaggerChildrenProps) {
  return (
    <div
      className={cn('nl-stagger', className)}
      style={{ ...style, '--nl-stagger': `${stagger}s` } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

type StaggerItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function StaggerItem({ className, ...props }: StaggerItemProps) {
  return <div className={cn('nl-fade-up', className)} {...props} />;
}
