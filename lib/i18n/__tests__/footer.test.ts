import { describe, expect, it } from 'vitest';

import { routes } from '@/config/routes';
import { LOCALIZED_LOCALES } from '@/lib/i18n/config';
import { loadUi } from '@/lib/i18n/content/load';
import { ENGLISH_UI } from '@/lib/i18n/content/ui-english';
import { getLocalizedFooterColumns } from '@/lib/i18n/footer';
import { localizeHref } from '@/lib/i18n/paths';
import { getFooterColumns } from '@/data/footer';
import { CORE_SERVICE_SLUGS } from '@/lib/i18n/config';

const LEGAL_HREFS = [
  routes.privacyPolicy,
  routes.refundPolicy,
  routes.termsAndConditions,
  routes.cookiePolicy,
  routes.disclaimer,
  routes.sitemap,
] as const;

const ENGLISH_FOOTER_PHRASES = [
  'Popular Services',
  'All Rights Reserved',
  'Made with care',
  'Secure card payments',
  'Payment Methods',
  'No Password Required',
  'Clear Package Pricing',
  'Track Order',
  'Contact Support',
  'Privacy Policy',
  'Refund Policy',
  'Terms & Conditions',
  'Cookie Policy',
  'Buy Instagram',
  'Buy TikTok',
  'Buy Facebook',
  'Free Tools',
  'About NovaLikes',
];

describe('localized footer', () => {
  it('keeps the English footer labels unchanged', () => {
    const english = getLocalizedFooterColumns('en', ENGLISH_UI);
    const source = getFooterColumns();
    expect(english.map((column) => column.title)).toEqual(source.map((column) => column.title));
    expect(english.flatMap((column) => column.links.map((link) => `${link.href}|${link.label}`))).toEqual(
      source.flatMap((column) => column.links.map((link) => `${link.href}|${link.label}`)),
    );
  });

  it('requires footerServices keys for every locale', () => {
    for (const locale of LOCALIZED_LOCALES) {
      const ui = loadUi(locale);
      for (const slug of CORE_SERVICE_SLUGS) {
        expect(ui.footerServices[slug]?.trim().length, `${locale} missing ${slug}`).toBeGreaterThan(1);
        expect(ui.footerServices[slug]).not.toBe(ENGLISH_UI.footerServices[slug]);
      }
    }
  });

  it('uses same-locale permalinks for localized destinations including legal URLs', () => {
    for (const locale of LOCALIZED_LOCALES) {
      const ui = loadUi(locale);
      const columns = getLocalizedFooterColumns(locale, ui);
      const links = columns.flatMap((column) => column.links);

      expect(links.every((link) => link.label.trim().length > 0)).toBe(true);
      expect(links.some((link) => link.href.startsWith('/tools/'))).toBe(false);

      for (const slug of CORE_SERVICE_SLUGS) {
        expect(links.some((link) => link.href === localizeHref(`/${slug}`, locale))).toBe(true);
      }
      expect(links.some((link) => link.href === localizeHref('/tools', locale))).toBe(true);
      expect(links.some((link) => link.href === localizeHref('/about', locale))).toBe(true);
      expect(links.some((link) => link.href === localizeHref('/contact', locale))).toBe(true);
      expect(links.some((link) => link.href === localizeHref('/reviews', locale))).toBe(true);
      expect(links.some((link) => link.href === localizeHref('/faq', locale))).toBe(true);

      for (const href of LEGAL_HREFS) {
        if (href === routes.sitemap) {
          expect(links.some((link) => link.href === href)).toBe(true);
          continue;
        }
        expect(links.some((link) => link.href === localizeHref(href, locale))).toBe(true);
      }
      expect(links.some((link) => link.href === routes.learn)).toBe(false);
      expect(links.some((link) => link.href.startsWith(`${routes.learn}/`))).toBe(false);
      expect(links.some((link) => link.href === routes.trackOrder)).toBe(true);
    }
  });

  it('does not silently keep English footer UI copy', () => {
    for (const locale of LOCALIZED_LOCALES) {
      const ui = loadUi(locale);
      const columns = getLocalizedFooterColumns(locale, ui);
      const blob = [
        ui.language,
        ui.footer.brandSummary,
        ui.footer.paymentCopy,
        ui.footer.madeWithCare,
        ui.footer.allRightsReserved,
        ...columns.flatMap((column) => [column.title, ...column.links.map((link) => link.label)]),
      ].join(' | ');

      for (const phrase of ENGLISH_FOOTER_PHRASES) {
        expect(blob, `${locale} leaked “${phrase}”`).not.toContain(phrase);
      }
      expect(ui.language).not.toBe('Language');
    }
  });

  it('uses the expected native About/Contact/Reviews/FAQ permalinks', () => {
    expect(localizeHref('/privacy-policy', 'es')).toBe('/es/politica-de-privacidad');
    expect(localizeHref('/refund-policy', 'es')).toBe('/es/politica-de-reembolso');
    expect(localizeHref('/terms-and-conditions', 'es')).toBe('/es/terminos-y-condiciones');
    expect(localizeHref('/cookie-policy', 'es')).toBe('/es/politica-de-cookies');
    expect(localizeHref('/disclaimer', 'es')).toBe('/es/aviso-legal');
    expect(localizeHref('/about', 'es')).toBe('/es/acerca-de');
    expect(localizeHref('/contact', 'es')).toBe('/es/contacto');
    expect(localizeHref('/reviews', 'es')).toBe('/es/resenas');
    expect(localizeHref('/faq', 'es')).toBe('/es/preguntas-frecuentes');
    expect(localizeHref('/tools', 'es')).toBe('/es/herramientas');

    expect(localizeHref('/privacy-policy', 'de')).toBe('/de/datenschutz');
    expect(localizeHref('/about', 'de')).toBe('/de/ueber-uns');
    expect(localizeHref('/privacy-policy', 'fr')).toBe('/fr/politique-de-confidentialite');
    expect(localizeHref('/privacy-policy', 'it')).toBe('/it/informativa-sulla-privacy');
    expect(localizeHref('/privacy-policy', 'pt-br')).toBe('/pt-br/politica-de-privacidade');
    expect(localizeHref('/privacy-policy', 'ar')).toBe('/ar/سياسة-الخصوصية');
    expect(localizeHref('/contact', 'de')).toBe('/de/kontakt');
    expect(localizeHref('/reviews', 'de')).toBe('/de/bewertungen');
    expect(localizeHref('/faq', 'de')).toBe('/de/haeufige-fragen');

    expect(localizeHref('/about', 'fr')).toBe('/fr/a-propos');
    expect(localizeHref('/contact', 'fr')).toBe('/fr/contact');
    expect(localizeHref('/reviews', 'fr')).toBe('/fr/avis');

    expect(localizeHref('/about', 'it')).toBe('/it/chi-siamo');
    expect(localizeHref('/contact', 'it')).toBe('/it/contatti');
    expect(localizeHref('/reviews', 'it')).toBe('/it/recensioni');

    expect(localizeHref('/about', 'pt-br')).toBe('/pt-br/sobre');
    expect(localizeHref('/contact', 'pt-br')).toBe('/pt-br/contato');
    expect(localizeHref('/reviews', 'pt-br')).toBe('/pt-br/avaliacoes');

    expect(localizeHref('/about', 'ar')).toBe('/ar/من-نحن');
    expect(localizeHref('/contact', 'ar')).toBe('/ar/اتصل-بنا');
    expect(localizeHref('/reviews', 'ar')).toBe('/ar/التقييمات');
  });
});
