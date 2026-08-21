'use client';

import { LanguageSwitcher } from '@/components/i18n/language-switcher';

export function FooterLanguageSwitcher({ heading }: { heading: string }) {
  return (
    <nav aria-label={heading} className="mt-8 border-t border-[var(--border-subtle)] pt-6">
      <LanguageSwitcher />
    </nav>
  );
}
