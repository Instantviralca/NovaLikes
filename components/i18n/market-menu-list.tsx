'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MarketFlag } from '@/components/i18n/market-flag';
import { useActiveMarket } from '@/components/i18n/locale-link';
import {
  GLOBAL_ENGLISH_LABEL,
  MARKETS,
  MARKET_NATIVE_NAMES,
  MARKET_SHORT_LABELS,
  type Market,
} from '@/lib/market/config';
import { marketSwitcherHref } from '@/lib/market/paths';
import { cn } from '@/lib/utils';

export function MarketMenuList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() || '/';
  const activeMarket = useActiveMarket();

  const items: Array<{ id: Market | 'global'; label: string; short: string }> = [
    { id: 'global', label: GLOBAL_ENGLISH_LABEL, short: 'EN' },
    ...MARKETS.map((market) => ({
      id: market,
      label: MARKET_NATIVE_NAMES[market],
      short: MARKET_SHORT_LABELS[market],
    })),
  ];

  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => {
        const href = marketSwitcherHref(pathname, item.id === 'global' ? null : item.id);
        const active = item.id === 'global' ? activeMarket === null : activeMarket === item.id;
        return (
          <li key={item.id}>
            <Link
              href={href}
              hrefLang={item.id === 'global' ? 'en' : item.id === 'uk' ? 'en-GB' : `en-${item.short}`}
              aria-current={active ? 'page' : undefined}
              aria-label={item.label}
              onClick={() => onNavigate?.()}
              className={cn(
                'flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[13px] font-semibold tracking-wide text-[#1F2937] transition-colors',
                'hover:bg-black/[0.04]',
                active && 'bg-white/70 text-[#E85D04]',
              )}
            >
              <MarketFlag market={item.id} className="size-6" />
              <span>{item.short}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
