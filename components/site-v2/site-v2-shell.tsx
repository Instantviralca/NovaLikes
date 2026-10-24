import type { ReactNode } from 'react';

import {
  nlBody,
  nlDisplay,
  preloadHomeDisplayFont,
} from '@/components/marketing/home-v5/fonts';
import { cn } from '@/lib/utils';

import './site-v2.css';

type SiteV2ShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared site-v2 root: next/font variable classes + `.site-v2` scope.
 * Call from Learn / Tools page roots (same pattern as service-v2).
 */
export function SiteV2Shell({ children, className }: SiteV2ShellProps) {
  preloadHomeDisplayFont();
  return (
    <div className={cn('site-v2', nlDisplay.variable, nlBody.variable, className)}>
      {children}
    </div>
  );
}
