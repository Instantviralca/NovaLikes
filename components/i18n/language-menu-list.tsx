'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { LocaleFlag } from '@/components/i18n/locale-flag';
import { useActiveLocale, useBarePathname } from '@/components/i18n/locale-link';
import {
  LOCALES,
  LOCALE_NATIVE_NAMES,
  LOCALE_SHORT_LABELS,
} from '@/lib/i18n/config';
import { localeCookieHeader } from '@/lib/i18n/locale-cookie';
import { localeSwitcherHref } from '@/lib/i18n/paths';
import { cn } from '@/lib/utils';

export function LanguageMenuList({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useActiveLocale();
  const bare = useBarePathname();
  const pathname = usePathname() || '/';
  const router = useRouter();

  return (
    <ul className="flex flex-col gap-0.5">
      {LOCALES.map((item) => {
        const href = localeSwitcherHref(bare, item);
        const active = item === locale;
        return (
          <li key={item}>
            <Link
              href={href}
              hrefLang={item === 'pt-br' ? 'pt-BR' : item}
              lang={item === 'pt-br' ? 'pt-BR' : item}
              aria-current={active ? 'page' : undefined}
              aria-label={LOCALE_NATIVE_NAMES[item]}
              onClick={(event) => {
                document.cookie = localeCookieHeader(item);
                onNavigate?.();
                if (href === bare && pathname === href) {
                  event.preventDefault();
                  router.refresh();
                }
              }}
              className={cn(
                'flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[13px] font-semibold tracking-wide text-[#1F2937] transition-colors',
                'hover:bg-black/[0.04]',
                active && 'bg-white/70 text-[#E85D04]',
              )}
            >
              <LocaleFlag locale={item} className="size-6" />
              <span>{LOCALE_SHORT_LABELS[item]}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
