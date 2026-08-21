import Link from 'next/link';
import {
  Briefcase,
  Flame,
  Headphones,
  ShieldCheck,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { FooterLanguageSwitcher } from '@/components/i18n/footer-language-switcher';
import { Logo } from '@/components/common/logo';
import { Container } from '@/components/layout/container';
import { site } from '@/config/site';
import { footerMeta } from '@/data/footer';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';
import { getLocalizedFooterColumns } from '@/lib/i18n/footer';
import { localizeHref } from '@/lib/i18n/paths';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';

const COLUMN_ICONS: Record<string, LucideIcon> = {
  services: Flame,
  resources: Briefcase,
  company: User,
  support: Headphones,
  legal: ShieldCheck,
};

const PAYMENT_MARKS = ['Visa', 'Mastercard', 'Amex', 'Discover', 'Apple Pay'] as const;

type FooterProps = {
  className?: string;
  locale?: Locale;
  ui?: UiDictionary;
};

export function Footer({
  className,
  locale = DEFAULT_LOCALE,
  ui = ENGLISH_UI as UiDictionary,
}: FooterProps) {
  const columns = getLocalizedFooterColumns(locale, ui);

  const socials = [
    { label: 'Instagram', href: site.socialLinks.instagram },
    { label: 'Facebook', href: site.socialLinks.facebook },
    { label: 'LinkedIn', href: site.socialLinks.linkedin },
    { label: 'TikTok', href: site.socialLinks.tiktok },
  ].filter((item) => item.href);

  const trustChips = [
    { label: ui.footer.noPassword, icon: ShieldCheck },
    { label: ui.footer.clearPricing, icon: Zap },
    { label: ui.footer.orderTracking, icon: Headphones },
  ] as const;

  return (
    <footer
      className={cn(
        'mt-auto overflow-x-clip border-t border-[var(--border-subtle)] bg-white',
        className,
      )}
      role="contentinfo"
    >
      <Container size="xl" className="py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="max-w-sm min-w-0 sm:col-span-2 xl:col-span-1">
            <span dir="ltr" className="inline-flex">
              <Logo href={localizeHref('/', locale)} />
            </span>
            <p className="mt-4 text-sm leading-relaxed text-[#6B6560]">{ui.footer.brandSummary}</p>
            <ul className="mt-4 space-y-2">
              {trustChips.map((item) => (
                <li
                  key={item.label}
                  className="flex min-w-0 items-center gap-2 text-sm font-medium text-[#44403C]"
                >
                  <item.icon className="size-4 text-[#E85D04]" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={ui.footer.ariaLabel} className="contents">
            {columns.map((column) => {
              const Icon = COLUMN_ICONS[column.id] ?? Flame;
              return (
                <div key={column.id} className="min-w-0">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-[#1C1917]">
                    <Icon className="size-3.5 text-[#E85D04]" aria-hidden="true" />
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={`${column.id}-${link.href}-${link.label}`}>
                        <Link
                          href={link.href}
                          prefetch={prefetchForHref(link.href)}
                          className="break-words text-sm text-[#6B6560] underline-offset-4 transition-colors hover:text-[#E85D04] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8A837C] uppercase">
              {ui.footer.paymentMethods}
            </p>
            <p className="mt-1 text-sm text-[#6B6560]">{ui.footer.paymentCopy}</p>
            <ul className="mt-3 flex flex-wrap gap-2" dir="ltr">
              {PAYMENT_MARKS.map((mark) => (
                <li
                  key={mark}
                  className="rounded-md bg-[#FAFAF9] px-2 py-1 text-[11px] font-semibold text-[#44403C] ring-1 ring-black/[0.06]"
                >
                  {mark}
                </li>
              ))}
            </ul>
          </div>

          {socials.length > 0 ? (
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#E85D04] uppercase">
                {ui.footer.followUs}
              </p>
              <ul className="mt-2 flex flex-wrap gap-3 text-sm" dir="ltr">
                {socials.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#E85D04] underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div aria-hidden="true">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#E85D04] uppercase">
                {ui.footer.followUs}
              </p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#F58529,#DD2A7B)] text-[10px] font-bold text-white">
                  IG
                </span>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#111111] text-[10px] font-bold text-white">
                  TT
                </span>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#1877F2] text-[10px] font-bold text-white">
                  FB
                </span>
              </div>
            </div>
          )}

          <ul className="flex items-center gap-3 text-sm font-semibold text-[#E85D04]">
            {footerMeta.socialLinks.map((link, index) => (
              <li key={link.href} className="flex items-center gap-3">
                {index > 0 ? <span className="h-4 w-px bg-[#E7E0DA]" aria-hidden="true" /> : null}
                <Link href={localizeHref(link.href, locale)} className="hover:underline">
                  {link.label === 'Reviews' ? ui.footer.reviews : ui.footer.contact}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <FooterLanguageSwitcher heading={ui.language} />
      </Container>

      <div className="bg-[#FFF6EE] px-4 py-4">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs tracking-wide text-[#6B6560]">
          <span>
            © 2026 {site.name}. {ui.footer.allRightsReserved}
          </span>
          <span className="hidden h-3 w-px bg-[#E8D5C4] sm:block" aria-hidden="true" />
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1">
            <span>
              {ui.footer.madeWithCare} <span aria-hidden="true">🤍</span> by{' '}
              <a
                href="https://localseowiser.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#4A4540] underline decoration-[#E8D5C4] underline-offset-2 transition-colors hover:text-[#E85D04] hover:decoration-[#E85D04]"
              >
                LocalSeoWiser
              </a>
            </span>
          </span>
        </p>
      </div>
    </footer>
  );
}
