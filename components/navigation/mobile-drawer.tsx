'use client';

import Link from 'next/link';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { site } from '@/config/site';
import {
  getMainNavigation,
  getMegaMenuServices,
  isMegaMenuItem,
  primaryCta,
} from '@/data/navigation';
import { LOCALE_DIR, isCoreServiceSlug } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
import { prefetchForHref } from '@/lib/linking/prefetch';

type MobileDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const { locale, ui } = useI18nChrome();
  const items = getMainNavigation(locale);
  const side = LOCALE_DIR[locale] === 'rtl' ? 'left' : 'right';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className="w-full max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{site.name}</SheetTitle>
        </SheetHeader>

        <nav aria-label={ui.nav.mobileNav} className="mt-6 space-y-4">
          {items.map((item) => {
            if (!isMegaMenuItem(item)) {
              const href = localizeHref(item.href, locale);
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
              return (
                <Link
                  key={item.id}
                  href={href}
                  prefetch={prefetchForHref(href)}
                  className="block text-sm text-foreground"
                  onClick={() => onOpenChange(false)}
                >
                  {label}
                </Link>
              );
            }

            const services = getMegaMenuServices(item.platformId);
            const platformHref = localizeHref(item.href, locale);
            const platformLabel =
              item.platformId === 'instagram'
                ? ui.nav.instagram
                : item.platformId === 'tiktok'
                  ? ui.nav.tiktok
                  : ui.nav.facebook;

            return (
              <div key={item.id} className="space-y-2">
                <Link
                  href={platformHref}
                  prefetch={prefetchForHref(platformHref)}
                  className="block text-sm font-medium text-foreground"
                  onClick={() => onOpenChange(false)}
                >
                  {platformLabel}
                </Link>
                <ul className="space-y-2 border-s border-border ps-3">
                  {services.map((service) => {
                    const href = localizeHref(service.url, locale);
                    const label = isCoreServiceSlug(service.slug)
                      ? ui.services[service.slug]
                      : service.navigationLabel;
                    return (
                      <li key={service.id}>
                        <Link
                          href={href}
                          prefetch={prefetchForHref(href)}
                          className="block text-sm text-muted-foreground"
                          onClick={() => onOpenChange(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <Button asChild className="w-full">
            <Link
              href={localizeHref(primaryCta.href, locale)}
              prefetch={prefetchForHref(localizeHref(primaryCta.href, locale))}
              onClick={() => onOpenChange(false)}
            >
              {ui.nav.getStarted}
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
