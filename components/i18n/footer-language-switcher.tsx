'use client';

import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { cn } from '@/lib/utils';

export function FooterLanguageSwitcher({
  heading,
  className,
  triggerClassName = 'lang',
}: {
  heading: string;
  className?: string;
  triggerClassName?: string;
}) {
  return (
    <nav aria-label={heading} className={cn(className)}>
      <LanguageSwitcher className={triggerClassName} />
    </nav>
  );
}
