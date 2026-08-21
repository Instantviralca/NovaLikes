import { describe, expect, it } from 'vitest';

import { LOCALIZED_LOCALES, LOCALES } from '@/lib/i18n/config';
import { CORE_PATHS } from '@/lib/i18n/core-paths';
import { localizeHrefsDeep } from '@/lib/i18n/localize-hrefs';
import { hreflangMap, localeCaseRedirectTarget, localizeHref } from '@/lib/i18n/paths';
import {
  ENGLISH_SLUGS,
  LOCALIZED_SLUGS,
  PAGE_KEYS,
  decodePathname,
  getLegacyLocalizedRedirects,
  localizedPath,
} from '@/lib/i18n/slugs';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { validateSitemapUrl } from '@/lib/seo/sitemap/validate-url';

describe('localized permalink dictionary', () => {
  it('keeps English commercial URLs unchanged', () => {
    expect(localizeHref('/', 'en')).toBe('/');
    expect(localizeHref('/faq', 'en')).toBe('/faq');
    expect(localizeHref('/buy-instagram-followers', 'en')).toBe('/buy-instagram-followers');
    expect(localizeHref('/buy-instagram-likes', 'en')).toBe('/buy-instagram-likes');
    expect(localizeHref('/buy-instagram-views', 'en')).toBe('/buy-instagram-views');
    expect(localizeHref('/buy-instagram-comments', 'en')).toBe('/buy-instagram-comments');
    expect(localizeHref('/buy-tiktok-followers', 'en')).toBe('/buy-tiktok-followers');
    expect(localizeHref('/buy-tiktok-likes', 'en')).toBe('/buy-tiktok-likes');
    expect(localizeHref('/buy-tiktok-views', 'en')).toBe('/buy-tiktok-views');
    expect(localizeHref('/buy-facebook-followers', 'en')).toBe('/buy-facebook-followers');
    expect(localizeHref('/buy-facebook-page-likes', 'en')).toBe('/buy-facebook-page-likes');
    expect(localizeHref('/buy-facebook-post-likes', 'en')).toBe('/buy-facebook-post-likes');
  });

  it('uses the specified native permalinks for every locale', () => {
    expect(localizedPath('es', 'instagram-followers')).toBe('/es/comprar-seguidores-instagram');
    expect(localizedPath('es', 'instagram-likes')).toBe('/es/comprar-likes-instagram');
    expect(localizedPath('es', 'instagram-views')).toBe('/es/comprar-vistas-instagram');
    expect(localizedPath('es', 'instagram-comments')).toBe('/es/comprar-comentarios-instagram');
    expect(localizedPath('es', 'tiktok-followers')).toBe('/es/comprar-seguidores-tiktok');
    expect(localizedPath('es', 'tiktok-likes')).toBe('/es/comprar-likes-tiktok');
    expect(localizedPath('es', 'tiktok-views')).toBe('/es/comprar-vistas-tiktok');
    expect(localizedPath('es', 'facebook-followers')).toBe('/es/comprar-seguidores-facebook');
    expect(localizedPath('es', 'facebook-page-likes')).toBe('/es/comprar-likes-pagina-facebook');
    expect(localizedPath('es', 'facebook-post-likes')).toBe('/es/comprar-likes-publicacion-facebook');
    expect(localizedPath('es', 'faq')).toBe('/es/preguntas-frecuentes');

    expect(localizedPath('de', 'instagram-followers')).toBe('/de/instagram-follower-kaufen');
    expect(localizedPath('de', 'faq')).toBe('/de/haeufige-fragen');

    expect(localizedPath('fr', 'instagram-followers')).toBe('/fr/acheter-abonnes-instagram');
    expect(localizedPath('fr', 'faq')).toBe('/fr/questions-frequentes');

    expect(localizedPath('it', 'instagram-followers')).toBe('/it/comprare-follower-instagram');
    expect(localizedPath('it', 'faq')).toBe('/it/domande-frequenti');

    expect(localizedPath('pt-br', 'instagram-followers')).toBe('/pt-br/comprar-seguidores-instagram');
    expect(localizedPath('pt-br', 'instagram-likes')).toBe('/pt-br/comprar-curtidas-instagram');
    expect(localizedPath('pt-br', 'faq')).toBe('/pt-br/perguntas-frequentes');

    expect(localizedPath('ar', 'instagram-followers')).toBe('/ar/شراء-متابعين-انستغرام');
    expect(localizedPath('ar', 'faq')).toBe('/ar/الأسئلة-الشائعة');

    expect(localizedPath('es', 'about')).toBe('/es/acerca-de');
    expect(localizedPath('es', 'contact')).toBe('/es/contacto');
    expect(localizedPath('es', 'reviews')).toBe('/es/resenas');
    expect(localizedPath('de', 'about')).toBe('/de/ueber-uns');
    expect(localizedPath('de', 'contact')).toBe('/de/kontakt');
    expect(localizedPath('de', 'reviews')).toBe('/de/bewertungen');
    expect(localizedPath('fr', 'about')).toBe('/fr/a-propos');
    expect(localizedPath('fr', 'contact')).toBe('/fr/contact');
    expect(localizedPath('fr', 'reviews')).toBe('/fr/avis');
    expect(localizedPath('it', 'about')).toBe('/it/chi-siamo');
    expect(localizedPath('it', 'contact')).toBe('/it/contatti');
    expect(localizedPath('it', 'reviews')).toBe('/it/recensioni');
    expect(localizedPath('pt-br', 'about')).toBe('/pt-br/sobre');
    expect(localizedPath('pt-br', 'contact')).toBe('/pt-br/contato');
    expect(localizedPath('pt-br', 'reviews')).toBe('/pt-br/avaliacoes');
    expect(localizedPath('ar', 'about')).toBe('/ar/من-نحن');
    expect(localizedPath('ar', 'contact')).toBe('/ar/اتصل-بنا');
    expect(localizedPath('ar', 'reviews')).toBe('/ar/التقييمات');
  });

  it('maps language-switcher destinations by page key, not prefix swap', () => {
    expect(localizeHref('/buy-instagram-followers', 'es')).toBe('/es/comprar-seguidores-instagram');
    expect(localizeHref('/es/comprar-seguidores-instagram', 'de')).toBe(
      '/de/instagram-follower-kaufen',
    );
    expect(localizeHref('/de/instagram-follower-kaufen', 'fr')).toBe(
      '/fr/acheter-abonnes-instagram',
    );
    expect(localizeHref('/fr/acheter-abonnes-instagram', 'it')).toBe(
      '/it/comprare-follower-instagram',
    );
    expect(localizeHref('/it/comprare-follower-instagram', 'pt-br')).toBe(
      '/pt-br/comprar-seguidores-instagram',
    );
    expect(localizeHref('/pt-br/comprar-seguidores-instagram', 'ar')).toBe(
      '/ar/شراء-متابعين-انستغرام',
    );
    expect(localizeHref('/ar/شراء-متابعين-انستغرام', 'en')).toBe('/buy-instagram-followers');
    expect(localizeHref('/es/preguntas-frecuentes', 'de')).toBe('/de/haeufige-fragen');
    expect(localizeHref('/de/haeufige-fragen', 'en')).toBe('/faq');
    expect(localizeHref('/tools/tiktok-video-downloader', 'es')).toBe(
      '/es/herramientas/descargar-videos-tiktok',
    );
    expect(localizeHref('/es/herramientas/descargar-videos-tiktok', 'de')).toBe(
      '/de/tools/tiktok-videos-herunterladen',
    );
    expect(localizeHref('/de/tools/tiktok-videos-herunterladen', 'en')).toBe(
      '/tools/tiktok-video-downloader',
    );
    expect(localizeHref('/tools', 'ar')).toBe('/ar/أدوات');
    expect(localizeHref('/ar/أدوات/تنزيل-فيديو-تيك-توك', 'fr')).toBe(
      '/fr/outils/telecharger-video-tiktok',
    );
    expect(localizeHref('/about', 'es')).toBe('/es/acerca-de');
    expect(localizeHref('/es/acerca-de', 'de')).toBe('/de/ueber-uns');
    expect(localizeHref('/de/ueber-uns', 'ar')).toBe('/ar/من-نحن');
    expect(localizeHref('/ar/من-نحن', 'en')).toBe('/about');
    expect(localizeHref('/contact', 'es')).toBe('/es/contacto');
    expect(localizeHref('/es/contacto', 'de')).toBe('/de/kontakt');
    expect(localizeHref('/de/kontakt', 'fr')).toBe('/fr/contact');
    expect(localizeHref('/fr/contact', 'it')).toBe('/it/contatti');
    expect(localizeHref('/it/contatti', 'pt-br')).toBe('/pt-br/contato');
    expect(localizeHref('/pt-br/contato', 'ar')).toBe('/ar/اتصل-بنا');
    expect(localizeHref('/reviews', 'es')).toBe('/es/resenas');
    expect(localizeHref('/es/resenas', 'de')).toBe('/de/bewertungen');
    expect(localizeHref('/de/bewertungen', 'fr')).toBe('/fr/avis');
    expect(localizeHref('/fr/avis', 'it')).toBe('/it/recensioni');
    expect(localizeHref('/it/recensioni', 'pt-br')).toBe('/pt-br/avaliacoes');
    expect(localizeHref('/pt-br/avaliacoes', 'ar')).toBe('/ar/التقييمات');
    expect(localizeHref('/ar/التقييمات', 'en')).toBe('/reviews');
    expect(localizeHref('/privacy-policy', 'es')).toBe('/es/politica-de-privacidad');
    expect(localizeHref('/es/politica-de-privacidad', 'de')).toBe('/de/datenschutz');
    expect(localizeHref('/de/datenschutz', 'fr')).toBe('/fr/politique-de-confidentialite');
    expect(localizeHref('/fr/politique-de-confidentialite', 'it')).toBe('/it/informativa-sulla-privacy');
    expect(localizeHref('/it/informativa-sulla-privacy', 'pt-br')).toBe('/pt-br/politica-de-privacidade');
    expect(localizeHref('/pt-br/politica-de-privacidade', 'ar')).toBe('/ar/سياسة-الخصوصية');
    expect(localizeHref('/ar/سياسة-الخصوصية', 'en')).toBe('/privacy-policy');
    expect(localizeHref('/refund-policy', 'es')).toBe('/es/politica-de-reembolso');
    expect(localizeHref('/es/politica-de-reembolso', 'de')).toBe('/de/rueckerstattungsrichtlinie');
    expect(localizeHref('/terms-and-conditions', 'fr')).toBe('/fr/conditions-generales');
    expect(localizeHref('/cookie-policy', 'it')).toBe('/it/politica-sui-cookie');
    expect(localizeHref('/disclaimer', 'pt-br')).toBe('/pt-br/aviso-legal');
    expect(localizeHref('/ar/إخلاء-المسؤولية', 'en')).toBe('/disclaimer');
  });

  it('permanently redirects every old locale + English-slug URL', () => {
    const redirects = getLegacyLocalizedRedirects();
    const expected = LOCALIZED_LOCALES.reduce((count, locale) => {
      let n = 0;
      for (const key of PAGE_KEYS) {
        if (key === 'home') continue;
        if (ENGLISH_SLUGS[key] === LOCALIZED_SLUGS[locale][key]) continue;
        n += 1;
      }
      return count + n;
    }, 0);
    expect(redirects).toHaveLength(expected);
    expect(redirects.every((item) => item.permanent)).toBe(true);

    const bySource = new Map(redirects.map((item) => [item.source, item.destination]));
    expect(bySource.get('/es/buy-instagram-followers')).toBe('/es/comprar-seguidores-instagram');
    expect(bySource.get('/de/buy-instagram-followers')).toBe('/de/instagram-follower-kaufen');
    expect(bySource.get('/fr/buy-instagram-followers')).toBe('/fr/acheter-abonnes-instagram');
    expect(bySource.get('/it/buy-instagram-followers')).toBe('/it/comprare-follower-instagram');
    expect(bySource.get('/pt-br/buy-instagram-followers')).toBe(
      '/pt-br/comprar-seguidores-instagram',
    );
    expect(decodePathname(bySource.get('/ar/buy-instagram-followers') ?? '')).toBe(
      '/ar/شراء-متابعين-انستغرام',
    );
    expect(bySource.get('/es/faq')).toBe('/es/preguntas-frecuentes');
    expect(bySource.get('/es/about')).toBe('/es/acerca-de');
    expect(bySource.get('/es/contact')).toBe('/es/contacto');
    expect(bySource.get('/es/reviews')).toBe('/es/resenas');
    expect(bySource.get('/es/privacy-policy')).toBe('/es/politica-de-privacidad');
    expect(bySource.get('/de/privacy-policy')).toBe('/de/datenschutz');
    expect(decodePathname(bySource.get('/ar/privacy-policy') ?? '')).toBe(
      '/ar/سياسة-الخصوصية',
    );
    expect(bySource.get('/de/about')).toBe('/de/ueber-uns');
    expect(bySource.get('/fr/about')).toBe('/fr/a-propos');
    expect(bySource.has('/fr/contact')).toBe(false);
    expect(bySource.has('/es')).toBe(false);
    expect(bySource.has('/buy-instagram-followers')).toBe(false);
  });

  it('rewrites localized internal links to translated permalinks', () => {
    const tree = localizeHrefsDeep(
      {
        likes: '/buy-instagram-likes',
        views: '/buy-instagram-views',
        faq: '/faq',
        markdown: 'See [FAQ](/faq) and [Likes](/buy-instagram-likes)',
      },
      'es',
    );
    expect(tree.likes).toBe('/es/comprar-likes-instagram');
    expect(tree.views).toBe('/es/comprar-vistas-instagram');
    expect(tree.faq).toBe('/es/preguntas-frecuentes');
    expect(tree.markdown).toContain('/es/preguntas-frecuentes');
    expect(tree.markdown).toContain('/es/comprar-likes-instagram');
    expect(JSON.stringify(tree)).not.toContain('/es/buy-');
    expect(localizeHrefsDeep({ href: '/faq' }, 'de').href).toBe('/de/haeufige-fragen');
    expect(localizeHrefsDeep({ href: '/faq' }, 'fr').href).toBe('/fr/questions-frequentes');
  });

  it('sends uppercase locale prefixes to the final slug in one hop', () => {
    expect(localeCaseRedirectTarget('/ES/buy-instagram-followers')).toBe(
      '/es/comprar-seguidores-instagram',
    );
    expect(localeCaseRedirectTarget('/DE/faq')).toBe('/de/haeufige-fragen');
  });
});

describe('translated permalink SEO surfaces', () => {
  it('emits reciprocal hreflang with translated slugs', () => {
    const map = hreflangMap('/buy-instagram-followers');
    expect(map.en).toBe('/buy-instagram-followers');
    expect(map.es).toBe('/es/comprar-seguidores-instagram');
    expect(map.de).toBe('/de/instagram-follower-kaufen');
    expect(map.fr).toBe('/fr/acheter-abonnes-instagram');
    expect(map.it).toBe('/it/comprare-follower-instagram');
    expect(map['pt-BR']).toBe('/pt-br/comprar-seguidores-instagram');
    expect(map.ar).toBe('/ar/شراء-متابعين-انستغرام');
    expect(map['x-default']).toBe('/buy-instagram-followers');

    for (const locale of LOCALES) {
      const href = localizeHref('/buy-instagram-followers', locale);
      expect(hreflangMap(href).es).toBe('/es/comprar-seguidores-instagram');
      expect(hreflangMap(href)['x-default']).toBe('/buy-instagram-followers');
    }
  });

  it('puts only final localized URLs in the sitemap', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);

    for (const locale of LOCALIZED_LOCALES) {
      for (const key of PAGE_KEYS) {
        if (key === 'home') continue;
        expect(urls).toContain(absoluteUrl(localizedPath(locale, key)));
        if (ENGLISH_SLUGS[key] !== LOCALIZED_SLUGS[locale][key]) {
          expect(urls).not.toContain(absoluteUrl(`/${locale}/${ENGLISH_SLUGS[key]}`));
        }
      }
    }

    expect(urls).toContain(absoluteUrl('/es/comprar-seguidores-instagram'));
    expect(urls).not.toContain(absoluteUrl('/es/buy-instagram-followers'));
    expect(validateSitemapUrl(absoluteUrl('/ar/شراء-متابعين-انستغرام')).valid).toBe(true);
  });

  it('does not create a second transliterated Arabic URL set', () => {
    const arabicSlugs = Object.values(LOCALIZED_SLUGS.ar).filter(Boolean);
    expect(arabicSlugs.every((slug) => /[\u0600-\u06FF]/.test(slug))).toBe(true);
    expect(arabicSlugs.some((slug) => slug.includes('instagram') || slug.includes('shira'))).toBe(
      false,
    );
  });

  it('covers all 12 core page groups across 6 locales', () => {
    expect(CORE_PATHS).toHaveLength(12);
    expect(LOCALIZED_LOCALES).toHaveLength(6);
  });
});
