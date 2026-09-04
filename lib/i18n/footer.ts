import { getFooterColumns } from '@/data/footer';
import { routes } from '@/config/routes';
import { DEFAULT_LOCALE, isCoreServiceSlug, type Locale } from '@/lib/i18n/config';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import type { FooterColumn } from '@/types';

const COLUMN_TITLE: Record<string, keyof UiDictionary['footer']> = {
  services: 'popularServices',
  resources: 'resources',
  company: 'company',
  support: 'support',
  legal: 'legal',
};

export function footerLabelForLink(
  columnId: string,
  href: string,
  ui: UiDictionary,
): string {
  const path = href.split('?')[0] ?? href;
  const slug = path.replace(/^\//, '');
  if (isCoreServiceSlug(slug)) return ui.footerServices[slug];

  if (path === routes.tools) return ui.footer.freeTools;
  if (path === routes.faq) return ui.footer.faq;
  if (path === routes.learn) return ui.footer.blog;
  if (path === routes.about) return ui.footer.aboutNovaLikes;
  if (path === routes.reviews) return ui.footer.reviews;
  if (path === routes.contact) {
    return columnId === 'support' ? ui.footer.contactSupport : ui.footer.contact;
  }
  if (path === routes.trackOrder) return ui.footer.trackOrder;
  if (path === routes.privacyPolicy) return ui.footer.privacyPolicy;
  if (path === routes.refundPolicy) return ui.footer.refundPolicy;
  if (path === routes.termsAndConditions) return ui.footer.termsAndConditions;
  if (path === routes.cookiePolicy) return ui.footer.cookiePolicy;
  if (path === routes.disclaimer) return ui.footer.disclaimer;
  if (path === routes.sitemap) return ui.footer.sitemap;
  return '';
}

export function getLocalizedFooterColumns(
  locale: Locale,
  ui: UiDictionary,
  market: Market | null = null,
): FooterColumn[] {
  return getFooterColumns().map((column) => {
    const titleKey = COLUMN_TITLE[column.id];
    return {
      ...column,
      title: titleKey ? ui.footer[titleKey] : column.title,
      links: column.links
        .filter(
          (link) =>
            locale === DEFAULT_LOCALE ||
            (link.href !== routes.learn && !link.href.startsWith(`${routes.learn}/`)),
        )
        .map((link) => ({
          ...link,
          href: resolvePublicHref(link.href, { locale, market }),
          label: footerLabelForLink(column.id, link.href, ui),
        })),
    };
  });
}
