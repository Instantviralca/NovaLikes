/**
 * Spanish-only DISPLAY text helpers.
 * Never mutates catalog IDs, prices, quantities, slugs, or routes.
 */

import type { Locale } from '@/lib/i18n/config';
import packageDisplayNames from '@/lib/i18n/package-display-names.json';

type PhrasePair = readonly [en: string, localized: string];

const PACKAGE_PHRASES_ES = packageDisplayNames.es as unknown as PhrasePair[];
const PACKAGE_PHRASES_FR = packageDisplayNames.fr as unknown as PhrasePair[];
const PACKAGE_PHRASES_DE = packageDisplayNames.de as unknown as PhrasePair[];
const PACKAGE_PHRASES_IT = packageDisplayNames.it as unknown as PhrasePair[];
const PACKAGE_PHRASES_PT_BR = packageDisplayNames['pt-br'] as unknown as PhrasePair[];
const PACKAGE_PHRASES_AR = packageDisplayNames.ar as unknown as PhrasePair[];

const PACKAGE_PHRASES_BY_LOCALE: Partial<Record<Locale, readonly PhrasePair[]>> = {
  es: PACKAGE_PHRASES_ES,
  fr: PACKAGE_PHRASES_FR,
  de: PACKAGE_PHRASES_DE,
  it: PACKAGE_PHRASES_IT,
  'pt-br': PACKAGE_PHRASES_PT_BR,
  ar: PACKAGE_PHRASES_AR,
};

function applyPackagePhrases(englishName: string, phrases: readonly PhrasePair[]): string {
  let out = englishName;
  for (const [en, localized] of phrases) {
    if (out.includes(en)) {
      out = out.split(en).join(localized);
    }
  }
  return out;
}

/** Decorative UI phrases (dashboards, chips, mock cards). Longer first. */
const DECORATIVE_PHRASES: readonly [en: string, es: string][] = [
  ['Facebook Post Likes', 'Me gusta de publicaciones de Facebook'],
  ['Facebook Page Likes', 'Me gusta de Página de Facebook'],
  ['Instagram Views Packages', 'Paquetes de visualizaciones de Instagram'],
  ['Instagram Likes Packages', 'Paquetes de Me gusta de Instagram'],
  ['Instagram Comments Packages', 'Paquetes de comentarios de Instagram'],
  ['Page Likes Order In Progress', 'Pedido de Me gusta de Página en curso'],
  ['Post Likes Order In Progress', 'Pedido de Me gusta de publicaciones en curso'],
  ['Page Likes Order Status', 'Estado del pedido de Me gusta de Página'],
  ['Selected Post Likes Package', 'Paquete de Me gusta de publicaciones seleccionado'],
  ['Likes Package Selected', 'Paquete de Me gusta seleccionado'],
  ['Views Package Selected', 'Paquete de visualizaciones seleccionado'],
  ['View TikTok Views', 'Ver visualizaciones de TikTok'],
  ['View TikTok Likes', 'Ver Me gusta de TikTok'],
  ['View TikTok Followers', 'Ver seguidores de TikTok'],
  ['View Likes Packages', 'Ver paquetes de Me gusta'],
  ['View Views Packages', 'Ver paquetes de visualizaciones'],
  ['View Followers Packages', 'Ver paquetes de seguidores'],
  ['View Comments Packages', 'Ver paquetes de comentarios'],
  ['Post Likes Package', 'Paquete de Me gusta de publicaciones'],
  ['Page Likes Package', 'Paquete de Me gusta de Página'],
  ['Page likes package', 'Paquete de Me gusta de Página'],
  ['Likes package ready', 'Paquete de Me gusta listo'],
  ['Views delivering', 'Visualizaciones entregándose'],
  ['Likes Delivering', 'Me gusta entregándose'],
  ['Views Delivering', 'Visualizaciones entregándose'],
  ['Page likes rising', 'Me gusta de Página en aumento'],
  ['Page likes · Insights', 'Me gusta de Página · Insights'],
  ['Likes Increasing', 'Me gusta aumentando'],
  ['TikTok Views', 'Visualizaciones de TikTok'],
  ['TikTok Likes', 'Me gusta de TikTok'],
  ['Instagram Views', 'Visualizaciones de Instagram'],
  ['Instagram Likes', 'Me gusta de Instagram'],
  ['Video Views', 'Visualizaciones de vídeo'],
  ['Post Likes', 'Me gusta de publicaciones'],
  ['Page Likes', 'Me gusta de Página'],
  ['Page likes', 'Me gusta de Página'],
  ['Views order', 'Pedido de visualizaciones'],
  ['Instagram Followers', 'Seguidores de Instagram'],
  ['TikTok Followers', 'Seguidores de TikTok'],
  ['Facebook Followers', 'Seguidores de Facebook'],
  ['Followers', 'Seguidores'],
];

/**
 * Localize English catalog package DISPLAY names for es/de/fr UI.
 * Leaves IDs/prices/quantities untouched — call only at render.
 */
export function localizePackageDisplayName(englishName: string, locale: Locale): string {
  if (!englishName) return englishName;
  const phrases = PACKAGE_PHRASES_BY_LOCALE[locale];
  if (!phrases) return englishName;
  return applyPackagePhrases(englishName, phrases);
}

/**
 * Localize hardcoded English decorative metric copy for Spanish UI only.
 */
export function localizeDecorativeText(text: string, locale: Locale): string {
  if (locale !== 'es' || !text) return text;
  let out = text;
  for (const [en, es] of DECORATIVE_PHRASES) {
    if (out.includes(en)) {
      out = out.split(en).join(es);
    }
  }
  // Remaining metric words — never touch NovaLikes (letter before "Likes")
  out = out.replace(/(?<![A-Za-z])Likes(?![A-Za-z])/g, 'Me gusta');
  out = out.replace(/(?<![A-Za-z])Views(?![A-Za-z])/g, 'Visualizaciones');
  return out;
}

/** FAQ related-link label map keyed by English service slug. */
export const ES_FAQ_SERVICE_LABELS: Record<string, string> = {
  'buy-instagram-followers': 'Seguidores de Instagram',
  'buy-instagram-likes': 'Me gusta de Instagram',
  'buy-instagram-views': 'Visualizaciones de Instagram',
  'buy-instagram-comments': 'Comentarios de Instagram',
  'buy-tiktok-followers': 'Seguidores de TikTok',
  'buy-tiktok-likes': 'Me gusta de TikTok',
  'buy-tiktok-views': 'Visualizaciones de TikTok',
  'buy-facebook-followers': 'Seguidores de Facebook',
  'buy-facebook-page-likes': 'Me gusta de Página de Facebook',
  'buy-facebook-post-likes': 'Me gusta de publicaciones de Facebook',
};

export const ES_FAQ_UTILITY_LABELS: Record<string, string> = {
  'Refund Policy': 'Política de reembolso',
  'Track Order': 'Seguir pedido',
  Contact: 'Contacto',
};
