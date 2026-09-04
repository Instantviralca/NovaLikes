'use client';

import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { LocaleFlag } from '@/components/i18n/locale-flag';
import { LanguageMenuList } from '@/components/i18n/language-menu-list';
import { MarketFlag } from '@/components/i18n/market-flag';
import { MarketMenuList } from '@/components/i18n/market-menu-list';
import { useActiveLocale, useActiveMarket } from '@/components/i18n/locale-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LOCALE_NATIVE_NAMES, LOCALE_SHORT_LABELS } from '@/lib/i18n/config';
import { MARKET_SHORT_LABELS } from '@/lib/market/config';
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
  const activeMarket = useActiveMarket();
  const { ui } = useI18nChrome();
  const nativeName = activeMarket
    ? MARKET_SHORT_LABELS[activeMarket]
    : LOCALE_NATIVE_NAMES[locale];
  const triggerLabel = activeMarket ? MARKET_SHORT_LABELS[activeMarket] : LOCALE_SHORT_LABELS[locale];

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
          {activeMarket ? (
            <MarketFlag market={activeMarket} />
          ) : (
            <LocaleFlag locale={locale} />
          )}
          <span>{triggerLabel}</span>
          <ChevronsUpDown className="size-3.5 text-[#9A9590]" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={8}
        className="z-[70] min-w-0 w-auto rounded-[1.25rem] border-0 bg-[#F3F1EF] p-2 shadow-none"
      >
        <p className="px-1.5 pb-1 text-[10px] font-semibold tracking-[0.12em] text-[#9A9590] uppercase">
          Regions
        </p>
        <MarketMenuList onNavigate={() => setOpen(false)} />
        <div className="my-1.5 h-px bg-black/[0.06]" role="separator" />
        <p className="px-1.5 pb-1 text-[10px] font-semibold tracking-[0.12em] text-[#9A9590] uppercase">
          {ui.language}
        </p>
        <LanguageMenuList onNavigate={() => setOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
