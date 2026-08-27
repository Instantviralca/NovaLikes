/**
 * Spanish-only DISPLAY text helpers.
 * Never mutates catalog IDs, prices, quantities, slugs, or routes.
 */

import type { Locale } from '@/lib/i18n/config';

/** Longer English product/service phrases first. */
const PACKAGE_PHRASES: readonly [en: string, es: string][] = [
  ['Facebook Page Likes', 'Me gusta de Página de Facebook'],
  ['Facebook Post Likes', 'Me gusta de publicaciones de Facebook'],
  ['High Quality Instagram Comments', 'comentarios de Instagram de alta calidad'],
  ['Premium Instagram Comments', 'comentarios Premium de Instagram'],
  ['High Quality TikTok Views', 'visualizaciones de TikTok de alta calidad'],
  ['Premium TikTok Views', 'visualizaciones Premium de TikTok'],
  ['Instagram Likes', 'Me gusta de Instagram'],
  ['Instagram Views', 'visualizaciones de Instagram'],
  ['Instagram Followers', 'seguidores de Instagram'],
  ['Instagram Comments', 'comentarios de Instagram'],
  ['TikTok Likes', 'Me gusta de TikTok'],
  ['TikTok Views', 'visualizaciones de TikTok'],
  ['TikTok Followers', 'seguidores de TikTok'],
  ['Facebook Followers', 'seguidores de Facebook'],
  ['YouTube Views', 'visualizaciones de YouTube'],
  ['YouTube Subscribers', 'suscriptores de YouTube'],
];

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
 * Localize English catalog package DISPLAY names for Spanish UI only.
 * Leaves IDs/prices/quantities untouched — call only at render.
 */
export function localizePackageDisplayName(englishName: string, locale: Locale): string {
  if (locale !== 'es' || !englishName) return englishName;
  let out = englishName;
  for (const [en, es] of PACKAGE_PHRASES) {
    if (out.includes(en)) {
      out = out.split(en).join(es);
    }
  }
  return out;
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
