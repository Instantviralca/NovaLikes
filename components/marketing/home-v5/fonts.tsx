import { Bricolage_Grotesque, Nunito } from 'next/font/google';
import { preload } from 'react-dom';

/** Homepage-only fonts (variable files). Applied ONLY on the `.home-v5` root. */
export const nlDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nl-display',
  preload: true,
  adjustFontFallback: true,
});

export const nlBody = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nl-body',
  preload: false,
  adjustFontFallback: true,
});

/**
 * Next 15 does not always emit `<link rel=preload as=font>` for google variable fonts
 * that are applied only via CSS variables. Call during the homepage RSC render so the
 * single latin Bricolage woff2 is preloaded (Nunito stays unpreloaded).
 */
export function preloadHomeDisplayFont() {
  // Content-hash of the latin subset from next/font (stable for this family/subset).
  preload('/_next/static/media/9d5a263311222317-s.p.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  });
}
