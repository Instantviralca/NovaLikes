import Link from 'next/link';

import { Logo } from '@/components/common/logo';
import { CartNavButton } from '@/components/navigation/cart-nav-button';
import { LazyMobileMenu } from '@/components/navigation/lazy-mobile-menu';
import { MegaMenu } from '@/components/navigation/mega-menu';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import {
  getMainNavigation,
  isMegaMenuItem,
  primaryCta,
} from '@/data/navigation';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';

type NavbarProps = {
  className?: string;
  locale?: Locale;
  market?: Market | null;
  ui?: UiDictionary;
};

export function Navbar({
  className,
  locale = DEFAULT_LOCALE,
  market = null,
  ui = ENGLISH_UI as UiDictionary,
}: NavbarProps) {
  const resolveHref = (path: string) => resolvePublicHref(path, { locale, market });

  const items = getMainNavigation(locale).map((item) => {
    if (isMegaMenuItem(item)) {
      return {
        ...item,
        href: resolveHref(item.href),
        label:
          item.platformId === 'instagram'
            ? ui.nav.instagram
            : item.platformId === 'tiktok'
              ? ui.nav.tiktok
              : ui.nav.facebook,
      };
    }
    const href = resolveHref(item.href);
    const label =
      item.id === 'nav-home'
        ? ui.nav.home
        : item.id === 'nav-learn'
          ? ui.nav.learn
          : item.id === 'nav-tools'
            ? ui.nav.tools
            : item.id === 'nav-reviews'
              ? ui.nav.reviews
              : item.id === 'nav-about'
                ? ui.nav.about
                : item.id === 'nav-contact'
                  ? ui.nav.contact
                  : item.label;
    return { ...item, href, label };
  });

  const ctaHref = resolveHref(primaryCta.href);
  const ctaLabel = ui.nav.getStarted;

  return (
    <header className={cn('sticky top-0 z-50', className)}>
      <div
        className="pointer-events-none absolute inset-0 border-b border-border bg-background/90 backdrop-blur-sm"
        aria-hidden="true"
      />
      <Container className="relative flex h-14 items-center justify-between gap-4">
        <Logo href={resolveHref('/')} />

        <nav aria-label={ui.nav.primaryNav} className="hidden h-full min-w-0 items-center gap-1 xl:flex">
          {items.map((item) => {
            if (isMegaMenuItem(item)) {
              return <MegaMenu key={item.id} item={item} />;
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch={prefetchForHref(item.href)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}

          <CartNavButton className="ml-1" />
          <Button asChild size="sm" className="ml-1">
            <Link href={ctaHref} prefetch={prefetchForHref(ctaHref)}>
              {ctaLabel}
            </Link>
          </Button>
        </nav>

        <div className="flex min-w-0 items-center gap-1 xl:hidden">
          <CartNavButton />
          <Button asChild size="sm" variant="outline" className="max-w-[9.5rem] px-3">
            <Link href={ctaHref} prefetch={prefetchForHref(ctaHref)}>
              {ctaLabel}
            </Link>
          </Button>
          <LazyMobileMenu />
        </div>
      </Container>
    </header>
  );
}
