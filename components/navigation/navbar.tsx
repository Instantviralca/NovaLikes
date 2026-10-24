import Link from 'next/link';

import { Logo } from '@/components/common/logo';
import { AccountNavLink } from '@/components/navigation/account-nav-link';
import { CartNavButton } from '@/components/navigation/cart-nav-button';
import { HeaderShell } from '@/components/navigation/header-shell';
import { LazyMobileMenu } from '@/components/navigation/lazy-mobile-menu';
import { ServicesNavMenu } from '@/components/navigation/services-nav-menu';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { primaryCta } from '@/data/navigation';
import { routes } from '@/config/routes';
import { getAccountNavState } from '@/lib/customers/nav';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import { prefetchForHref } from '@/lib/linking/prefetch';

type NavbarProps = {
  className?: string;
  locale?: Locale;
  market?: Market | null;
  ui?: UiDictionary;
};

export async function Navbar({
  className,
  locale = DEFAULT_LOCALE,
  market = null,
  ui = ENGLISH_UI as UiDictionary,
}: NavbarProps) {
  const accountNavState = await getAccountNavState();
  const accountNav =
    accountNavState && accountNavState.href === '/login'
      ? { ...accountNavState, label: ui.nav.logIn }
      : accountNavState;
  const resolveHref = (path: string) => resolvePublicHref(path, { locale, market });

  const learnHref = resolveHref(routes.learn);
  const helpHref = resolveHref(routes.faq);
  const ctaHref = resolveHref(primaryCta.href);
  const ctaLabel = ui.nav.getStarted;
  const servicesLabel = ui.nav.services;
  const learnLabel = ui.nav.learn;
  const helpLabel = ui.nav.help;

  return (
    <HeaderShell className={className}>
      <Container className="relative flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Logo href={resolveHref('/')} />

          <nav
            aria-label={ui.nav.primaryNav}
            className="hidden h-full items-center gap-0.5 md:flex"
          >
            <ServicesNavMenu label={servicesLabel} />
            {locale === DEFAULT_LOCALE ? (
              <Link
                href={learnHref}
                prefetch={prefetchForHref(learnHref)}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--nl-ink)] transition-colors hover:text-[var(--nl-orange)]"
              >
                {learnLabel}
              </Link>
            ) : null}
            <Link
              href={helpHref}
              prefetch={prefetchForHref(helpHref)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--nl-ink)] transition-colors hover:text-[var(--nl-orange)]"
            >
              {helpLabel}
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <AccountNavLink accountNav={accountNav} />
          <CartNavButton />
        </div>

        <div className="flex min-w-0 items-center gap-1.5 md:hidden">
          <AccountNavLink accountNav={accountNav} className="hidden sm:inline-flex" />
          <CartNavButton />
          <Button asChild size="sm" className="max-w-[9.5rem] px-3">
            <Link href={ctaHref} prefetch={prefetchForHref(ctaHref)}>
              {ctaLabel}
            </Link>
          </Button>
          <LazyMobileMenu accountNav={accountNav} />
        </div>
      </Container>
    </HeaderShell>
  );
}
