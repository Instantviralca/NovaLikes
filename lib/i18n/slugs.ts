/**
 * Central typed permalink dictionary.
 *
 * English commercial slugs never change. Every other locale uses one
 * native-language slug per page. Routing, links, canonicals, hreflang,
 * sitemap, breadcrumbs, and the language switcher must all consume this map.
 */

import {
  CORE_SERVICE_SLUGS,
  DEFAULT_LOCALE,
  LOCALIZED_LOCALES,
  type Locale,
  type LocalizedLocale,
} from './config';

export const SERVICE_PAGE_KEYS = [
  'instagram-followers',
  'instagram-likes',
  'instagram-views',
  'instagram-comments',
  'tiktok-followers',
  'tiktok-likes',
  'tiktok-views',
  'facebook-followers',
  'facebook-page-likes',
  'facebook-post-likes',
] as const;

export const TOOL_PAGE_KEYS = [
  'tools',
  'instagram-profile-picture-viewer',
  'instagram-follower-counter',
  'instagram-profile-viewer',
  'instagram-video-downloader',
  'tiktok-video-downloader',
  'tiktok-profile-picture-downloader',
  'facebook-video-downloader',
  'facebook-reels-downloader',
] as const;

export const COMPANY_PAGE_KEYS = ['about', 'contact', 'reviews'] as const;

export const LEGAL_PAGE_KEYS = [
  'privacy-policy',
  'refund-policy',
  'terms-and-conditions',
  'cookie-policy',
  'disclaimer',
] as const;

export const PAGE_KEYS = [
  'home',
  'faq',
  ...COMPANY_PAGE_KEYS,
  ...LEGAL_PAGE_KEYS,
  ...SERVICE_PAGE_KEYS,
  ...TOOL_PAGE_KEYS,
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

export const ENGLISH_SLUGS: Record<PageKey, string> = {
  home: '',
  faq: 'faq',
  about: 'about',
  contact: 'contact',
  reviews: 'reviews',
  'privacy-policy': 'privacy-policy',
  'refund-policy': 'refund-policy',
  'terms-and-conditions': 'terms-and-conditions',
  'cookie-policy': 'cookie-policy',
  disclaimer: 'disclaimer',
  'instagram-followers': 'buy-instagram-followers',
  'instagram-likes': 'buy-instagram-likes',
  'instagram-views': 'buy-instagram-views',
  'instagram-comments': 'buy-instagram-comments',
  'tiktok-followers': 'buy-tiktok-followers',
  'tiktok-likes': 'buy-tiktok-likes',
  'tiktok-views': 'buy-tiktok-views',
  'facebook-followers': 'buy-facebook-followers',
  'facebook-page-likes': 'buy-facebook-page-likes',
  'facebook-post-likes': 'buy-facebook-post-likes',
  tools: 'tools',
  'instagram-profile-picture-viewer': 'tools/instagram-profile-picture-viewer',
  'instagram-follower-counter': 'tools/instagram-follower-counter',
  'instagram-profile-viewer': 'tools/instagram-profile-viewer',
  'instagram-video-downloader': 'tools/instagram-video-downloader',
  'tiktok-video-downloader': 'tools/tiktok-video-downloader',
  'tiktok-profile-picture-downloader': 'tools/tiktok-profile-picture-downloader',
  'facebook-video-downloader': 'tools/facebook-video-downloader',
  'facebook-reels-downloader': 'tools/facebook-reels-downloader',
};

export const LOCALIZED_SLUGS: Record<LocalizedLocale, Record<PageKey, string>> = {
  es: {
    home: '',
    faq: 'preguntas-frecuentes',
    about: 'acerca-de',
    contact: 'contacto',
    reviews: 'resenas',
    'privacy-policy': 'politica-de-privacidad',
    'refund-policy': 'politica-de-reembolso',
    'terms-and-conditions': 'terminos-y-condiciones',
    'cookie-policy': 'politica-de-cookies',
    disclaimer: 'aviso-legal',
    'instagram-followers': 'comprar-seguidores-instagram',
    'instagram-likes': 'comprar-likes-instagram',
    'instagram-views': 'comprar-vistas-instagram',
    'instagram-comments': 'comprar-comentarios-instagram',
    'tiktok-followers': 'comprar-seguidores-tiktok',
    'tiktok-likes': 'comprar-likes-tiktok',
    'tiktok-views': 'comprar-vistas-tiktok',
    'facebook-followers': 'comprar-seguidores-facebook',
    'facebook-page-likes': 'comprar-likes-pagina-facebook',
    'facebook-post-likes': 'comprar-likes-publicacion-facebook',
    tools: 'herramientas',
    'instagram-profile-picture-viewer': 'herramientas/ver-foto-perfil-instagram',
    'instagram-follower-counter': 'herramientas/contador-seguidores-instagram',
    'instagram-profile-viewer': 'herramientas/ver-perfil-instagram',
    'instagram-video-downloader': 'herramientas/descargar-videos-instagram',
    'tiktok-video-downloader': 'herramientas/descargar-videos-tiktok',
    'tiktok-profile-picture-downloader': 'herramientas/descargar-foto-perfil-tiktok',
    'facebook-video-downloader': 'herramientas/descargar-videos-facebook',
    'facebook-reels-downloader': 'herramientas/descargar-reels-facebook',
  },
  de: {
    home: '',
    faq: 'haeufige-fragen',
    about: 'ueber-uns',
    contact: 'kontakt',
    reviews: 'bewertungen',
    'privacy-policy': 'datenschutz',
    'refund-policy': 'rueckerstattungsrichtlinie',
    'terms-and-conditions': 'allgemeine-geschaeftsbedingungen',
    'cookie-policy': 'cookie-richtlinie',
    disclaimer: 'haftungsausschluss',
    'instagram-followers': 'instagram-follower-kaufen',
    'instagram-likes': 'instagram-likes-kaufen',
    'instagram-views': 'instagram-aufrufe-kaufen',
    'instagram-comments': 'instagram-kommentare-kaufen',
    'tiktok-followers': 'tiktok-follower-kaufen',
    'tiktok-likes': 'tiktok-likes-kaufen',
    'tiktok-views': 'tiktok-aufrufe-kaufen',
    'facebook-followers': 'facebook-follower-kaufen',
    'facebook-page-likes': 'facebook-seiten-likes-kaufen',
    'facebook-post-likes': 'facebook-beitrags-likes-kaufen',
    tools: 'tools',
    'instagram-profile-picture-viewer': 'tools/instagram-profilbild-anzeigen',
    'instagram-follower-counter': 'tools/instagram-follower-zaehler',
    'instagram-profile-viewer': 'tools/instagram-profil-anzeigen',
    'instagram-video-downloader': 'tools/instagram-videos-herunterladen',
    'tiktok-video-downloader': 'tools/tiktok-videos-herunterladen',
    'tiktok-profile-picture-downloader': 'tools/tiktok-profilbild-herunterladen',
    'facebook-video-downloader': 'tools/facebook-videos-herunterladen',
    'facebook-reels-downloader': 'tools/facebook-reels-herunterladen',
  },
  fr: {
    home: '',
    faq: 'questions-frequentes',
    about: 'a-propos',
    contact: 'contact',
    reviews: 'avis',
    'privacy-policy': 'politique-de-confidentialite',
    'refund-policy': 'politique-de-remboursement',
    'terms-and-conditions': 'conditions-generales',
    'cookie-policy': 'politique-de-cookies',
    disclaimer: 'mentions-legales',
    'instagram-followers': 'acheter-abonnes-instagram',
    'instagram-likes': 'acheter-likes-instagram',
    'instagram-views': 'acheter-vues-instagram',
    'instagram-comments': 'acheter-commentaires-instagram',
    'tiktok-followers': 'acheter-abonnes-tiktok',
    'tiktok-likes': 'acheter-likes-tiktok',
    'tiktok-views': 'acheter-vues-tiktok',
    'facebook-followers': 'acheter-abonnes-facebook',
    'facebook-page-likes': 'acheter-likes-page-facebook',
    'facebook-post-likes': 'acheter-likes-publication-facebook',
    tools: 'outils',
    'instagram-profile-picture-viewer': 'outils/voir-photo-profil-instagram',
    'instagram-follower-counter': 'outils/compteur-abonnes-instagram',
    'instagram-profile-viewer': 'outils/voir-profil-instagram',
    'instagram-video-downloader': 'outils/telecharger-video-instagram',
    'tiktok-video-downloader': 'outils/telecharger-video-tiktok',
    'tiktok-profile-picture-downloader': 'outils/telecharger-photo-profil-tiktok',
    'facebook-video-downloader': 'outils/telecharger-video-facebook',
    'facebook-reels-downloader': 'outils/telecharger-reels-facebook',
  },
  it: {
    home: '',
    faq: 'domande-frequenti',
    about: 'chi-siamo',
    contact: 'contatti',
    reviews: 'recensioni',
    'privacy-policy': 'informativa-sulla-privacy',
    'refund-policy': 'politica-di-rimborso',
    'terms-and-conditions': 'termini-e-condizioni',
    'cookie-policy': 'politica-sui-cookie',
    disclaimer: 'esclusione-di-responsabilita',
    'instagram-followers': 'comprare-follower-instagram',
    'instagram-likes': 'comprare-like-instagram',
    'instagram-views': 'comprare-visualizzazioni-instagram',
    'instagram-comments': 'comprare-commenti-instagram',
    'tiktok-followers': 'comprare-follower-tiktok',
    'tiktok-likes': 'comprare-like-tiktok',
    'tiktok-views': 'comprare-visualizzazioni-tiktok',
    'facebook-followers': 'comprare-follower-facebook',
    'facebook-page-likes': 'comprare-like-pagina-facebook',
    'facebook-post-likes': 'comprare-like-post-facebook',
    tools: 'strumenti',
    'instagram-profile-picture-viewer': 'strumenti/vedere-foto-profilo-instagram',
    'instagram-follower-counter': 'strumenti/contatore-follower-instagram',
    'instagram-profile-viewer': 'strumenti/vedere-profilo-instagram',
    'instagram-video-downloader': 'strumenti/scaricare-video-instagram',
    'tiktok-video-downloader': 'strumenti/scaricare-video-tiktok',
    'tiktok-profile-picture-downloader': 'strumenti/scaricare-foto-profilo-tiktok',
    'facebook-video-downloader': 'strumenti/scaricare-video-facebook',
    'facebook-reels-downloader': 'strumenti/scaricare-reels-facebook',
  },
  'pt-br': {
    home: '',
    faq: 'perguntas-frequentes',
    about: 'sobre',
    contact: 'contato',
    reviews: 'avaliacoes',
    'privacy-policy': 'politica-de-privacidade',
    'refund-policy': 'politica-de-reembolso',
    'terms-and-conditions': 'termos-e-condicoes',
    'cookie-policy': 'politica-de-cookies',
    disclaimer: 'aviso-legal',
    'instagram-followers': 'comprar-seguidores-instagram',
    'instagram-likes': 'comprar-curtidas-instagram',
    'instagram-views': 'comprar-visualizacoes-instagram',
    'instagram-comments': 'comprar-comentarios-instagram',
    'tiktok-followers': 'comprar-seguidores-tiktok',
    'tiktok-likes': 'comprar-curtidas-tiktok',
    'tiktok-views': 'comprar-visualizacoes-tiktok',
    'facebook-followers': 'comprar-seguidores-facebook',
    'facebook-page-likes': 'comprar-curtidas-pagina-facebook',
    'facebook-post-likes': 'comprar-curtidas-publicacao-facebook',
    tools: 'ferramentas',
    'instagram-profile-picture-viewer': 'ferramentas/ver-foto-perfil-instagram',
    'instagram-follower-counter': 'ferramentas/contador-seguidores-instagram',
    'instagram-profile-viewer': 'ferramentas/ver-perfil-instagram',
    'instagram-video-downloader': 'ferramentas/baixar-videos-instagram',
    'tiktok-video-downloader': 'ferramentas/baixar-videos-tiktok',
    'tiktok-profile-picture-downloader': 'ferramentas/baixar-foto-perfil-tiktok',
    'facebook-video-downloader': 'ferramentas/baixar-videos-facebook',
    'facebook-reels-downloader': 'ferramentas/baixar-reels-facebook',
  },
  ar: {
    home: '',
    faq: 'الأسئلة-الشائعة',
    about: 'من-نحن',
    contact: 'اتصل-بنا',
    reviews: 'التقييمات',
    'privacy-policy': 'سياسة-الخصوصية',
    'refund-policy': 'سياسة-الاسترداد',
    'terms-and-conditions': 'الشروط-والأحكام',
    'cookie-policy': 'سياسة-ملفات-الارتباط',
    disclaimer: 'إخلاء-المسؤولية',
    'instagram-followers': 'شراء-متابعين-انستغرام',
    'instagram-likes': 'شراء-إعجابات-انستغرام',
    'instagram-views': 'شراء-مشاهدات-انستغرام',
    'instagram-comments': 'شراء-تعليقات-انستغرام',
    'tiktok-followers': 'شراء-متابعين-تيك-توك',
    'tiktok-likes': 'شراء-إعجابات-تيك-توك',
    'tiktok-views': 'شراء-مشاهدات-تيك-توك',
    'facebook-followers': 'شراء-متابعين-فيسبوك',
    'facebook-page-likes': 'شراء-إعجابات-صفحة-فيسبوك',
    'facebook-post-likes': 'شراء-إعجابات-منشور-فيسبوك',
    tools: 'أدوات',
    'instagram-profile-picture-viewer': 'أدوات/عرض-صورة-الملف-انستغرام',
    'instagram-follower-counter': 'أدوات/عداد-متابعين-انستغرام',
    'instagram-profile-viewer': 'أدوات/عرض-ملف-انستغرام',
    'instagram-video-downloader': 'أدوات/تنزيل-فيديو-انستغرام',
    'tiktok-video-downloader': 'أدوات/تنزيل-فيديو-تيك-توك',
    'tiktok-profile-picture-downloader': 'أدوات/تنزيل-صورة-تيك-توك',
    'facebook-video-downloader': 'أدوات/تنزيل-فيديو-فيسبوك',
    'facebook-reels-downloader': 'أدوات/تنزيل-ريلز-فيسبوك',
  },
};

const ENGLISH_SLUG_TO_KEY = new Map<string, PageKey>();
const LOCALIZED_SLUG_TO_KEY = {} as Record<LocalizedLocale, Map<string, PageKey>>;

for (const key of PAGE_KEYS) {
  if (key === 'home') continue;
  ENGLISH_SLUG_TO_KEY.set(ENGLISH_SLUGS[key], key);
}

for (const locale of LOCALIZED_LOCALES) {
  const map = new Map<string, PageKey>();
  for (const key of PAGE_KEYS) {
    if (key === 'home') continue;
    map.set(LOCALIZED_SLUGS[locale][key], key);
  }
  LOCALIZED_SLUG_TO_KEY[locale] = map;
}

function assertRouteDictionary(): void {
  const englishServices = SERVICE_PAGE_KEYS.map((key) => ENGLISH_SLUGS[key]);
  if (englishServices.join(',') !== CORE_SERVICE_SLUGS.join(',')) {
    throw new Error('Route dictionary English service slugs drifted from CORE_SERVICE_SLUGS');
  }

  for (const locale of LOCALIZED_LOCALES) {
    const seen = new Set<string>();
    for (const key of PAGE_KEYS) {
      const slug = LOCALIZED_SLUGS[locale][key];
      if (key !== 'home' && !slug) {
        throw new Error(`Missing ${locale} permalink for ${key}`);
      }
      const token = slug || '__home__';
      if (seen.has(token)) {
        throw new Error(`Duplicate ${locale} permalink "${slug}"`);
      }
      seen.add(token);
      if (/[A-Z]/.test(slug)) {
        throw new Error(`Uppercase ASCII in ${locale} permalink "${slug}"`);
      }
    }
  }
}

assertRouteDictionary();

/** Decode a pathname once. Already-decoded Unicode paths are unchanged. */
export function decodePathname(path: string): string {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
}

export function englishPathFromPageKey(key: PageKey): string {
  const slug = ENGLISH_SLUGS[key];
  return slug ? `/${slug}` : '/';
}

export function pageKeyFromEnglishPath(pathname: string): PageKey | null {
  const normalized = pathname === '' ? '/' : pathname;
  if (normalized === '/') return 'home';
  const slug = decodePathname(normalized).replace(/^\//, '');
  return ENGLISH_SLUG_TO_KEY.get(slug) ?? null;
}

export function resolveSlugToPageKey(locale: LocalizedLocale, restPath: string): PageKey | null {
  const slug = decodePathname(restPath).replace(/^\//, '');
  if (!slug) return 'home';
  return LOCALIZED_SLUG_TO_KEY[locale].get(slug) ?? ENGLISH_SLUG_TO_KEY.get(slug) ?? null;
}

export function localizedPath(locale: Locale, key: PageKey): string {
  if (locale === DEFAULT_LOCALE) return englishPathFromPageKey(key);
  const slug = LOCALIZED_SLUGS[locale][key];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export type LegacyLocalizedRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

/**
 * Permanent redirects from the first-pass locale + English-slug URLs
 * to the final native permalinks. Query strings are preserved by Next.js.
 */
export function getLegacyLocalizedRedirects(): LegacyLocalizedRedirect[] {
  const redirects: LegacyLocalizedRedirect[] = [];
  for (const locale of LOCALIZED_LOCALES) {
    for (const key of PAGE_KEYS) {
      if (key === 'home') continue;
      const english = ENGLISH_SLUGS[key];
      const localized = LOCALIZED_SLUGS[locale][key];
      if (!english || !localized || english === localized) continue;
      redirects.push({
        source: `/${locale}/${english}`,
        destination: encodeURI(`/${locale}/${localized}`),
        permanent: true,
      });
    }
  }
  return redirects;
}
