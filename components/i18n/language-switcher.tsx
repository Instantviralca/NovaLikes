'use client';

import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { LocaleFlag } from '@/components/i18n/locale-flag';
import { LanguageMenuList } from '@/components/i18n/language-menu-list';
import { useActiveLocale } from '@/components/i18n/locale-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LOCALE_NATIVE_NAMES, LOCALE_SHORT_LABELS } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({
  className,
  side = 'top',
  align = 'start',
}: {
  className?: string;
  side?: 'top' | 'bottom';
  align?: 'start' | 'end';
}) {
  const [open, setOpen] = useState(false);
  const locale = useActiveLocale();
  const { ui } = useI18nChrome();
  const nativeName = LOCALE_NATIVE_NAMES[locale];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          dir="ltr"
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border-0 bg-[#F3F1EF] pl-1 pr-2 text-[13px] font-semibold tracking-wide text-[#3F3A36]',
            'transition-colors hover:bg-[#EBE8E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBA74]',
            'data-[state=open]:bg-[#EBE8E5]',
            className,
          )}
          aria-label={`${ui.language}: ${nativeName}`}
        >
          <LocaleFlag locale={locale} />
          <span>{LOCALE_SHORT_LABELS[locale]}</span>
          <ChevronsUpDown className="size-3.5 text-[#9A9590]" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={8}
        className="z-[70] min-w-0 w-auto rounded-[1.25rem] border-0 bg-[#F3F1EF] p-2 shadow-none"
      >
        <LanguageMenuList onNavigate={() => setOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
