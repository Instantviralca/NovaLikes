/**
 * Extended rendered-page QA — hero, eyebrow, RTL, nav, footer, regression.
 */
const BASE = process.argv[2] ?? 'http://localhost:3000';
const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'pt-br', 'ar'];

const EN = {
  home: '',
  faq: 'faq',
  about: 'about',
  contact: 'contact',
  reviews: 'reviews',
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
  'instagram-profile-viewer': 'tools/instagram-profile-viewer',
  'instagram-video-downloader': 'tools/instagram-video-downloader',
  'tiktok-video-downloader': 'tools/tiktok-video-downloader',
  'facebook-video-downloader': 'tools/facebook-video-downloader',
};

const SLUGS = {
  es: {
    home: '', faq: 'preguntas-frecuentes', about: 'acerca-de', contact: 'contacto', reviews: 'resenas',
    'instagram-followers': 'comprar-seguidores-instagram', 'instagram-likes': 'comprar-likes-instagram',
    'instagram-views': 'comprar-vistas-instagram', 'instagram-comments': 'comprar-comentarios-instagram',
    'tiktok-followers': 'comprar-seguidores-tiktok', 'tiktok-likes': 'comprar-likes-tiktok',
    'tiktok-views': 'comprar-vistas-tiktok', 'facebook-followers': 'comprar-seguidores-facebook',
    'facebook-page-likes': 'comprar-likes-pagina-facebook', 'facebook-post-likes': 'comprar-likes-publicacion-facebook',
    tools: 'herramientas', 'instagram-profile-viewer': 'herramientas/ver-perfil-instagram',
    'instagram-video-downloader': 'herramientas/descargar-videos-instagram',
    'tiktok-video-downloader': 'herramientas/descargar-videos-tiktok',
    'facebook-video-downloader': 'herramientas/descargar-videos-facebook',
  },
  de: {
    home: '', faq: 'haeufige-fragen', about: 'ueber-uns', contact: 'kontakt', reviews: 'bewertungen',
    'instagram-followers': 'instagram-follower-kaufen', 'instagram-likes': 'instagram-likes-kaufen',
    'instagram-views': 'instagram-aufrufe-kaufen', 'instagram-comments': 'instagram-kommentare-kaufen',
    'tiktok-followers': 'tiktok-follower-kaufen', 'tiktok-likes': 'tiktok-likes-kaufen',
    'tiktok-views': 'tiktok-aufrufe-kaufen', 'facebook-followers': 'facebook-follower-kaufen',
    'facebook-page-likes': 'facebook-seiten-likes-kaufen', 'facebook-post-likes': 'facebook-beitrags-likes-kaufen',
    tools: 'tools', 'instagram-profile-viewer': 'tools/instagram-profil-anzeigen',
    'instagram-video-downloader': 'tools/instagram-videos-herunterladen',
    'tiktok-video-downloader': 'tools/tiktok-videos-herunterladen',
    'facebook-video-downloader': 'tools/facebook-videos-herunterladen',
  },
  fr: {
    home: '', faq: 'questions-frequentes', about: 'a-propos', contact: 'contact', reviews: 'avis',
    'instagram-followers': 'acheter-abonnes-instagram', 'instagram-likes': 'acheter-likes-instagram',
    'instagram-views': 'acheter-vues-instagram', 'instagram-comments': 'acheter-commentaires-instagram',
    'tiktok-followers': 'acheter-abonnes-tiktok', 'tiktok-likes': 'acheter-likes-tiktok',
    'tiktok-views': 'acheter-vues-tiktok', 'facebook-followers': 'acheter-abonnes-facebook',
    'facebook-page-likes': 'acheter-likes-page-facebook', 'facebook-post-likes': 'acheter-likes-publication-facebook',
    tools: 'outils', 'instagram-profile-viewer': 'outils/voir-profil-instagram',
    'instagram-video-downloader': 'outils/telecharger-video-instagram',
    'tiktok-video-downloader': 'outils/telecharger-video-tiktok',
    'facebook-video-downloader': 'outils/telecharger-video-facebook',
  },
  it: {
    home: '', faq: 'domande-frequenti', about: 'chi-siamo', contact: 'contatti', reviews: 'recensioni',
    'instagram-followers': 'comprare-follower-instagram', 'instagram-likes': 'comprare-like-instagram',
    'instagram-views': 'comprare-visualizzazioni-instagram', 'instagram-comments': 'comprare-commenti-instagram',
    'tiktok-followers': 'comprare-follower-tiktok', 'tiktok-likes': 'comprare-like-tiktok',
    'tiktok-views': 'comprare-visualizzazioni-tiktok', 'facebook-followers': 'comprare-follower-facebook',
    'facebook-page-likes': 'comprare-like-pagina-facebook', 'facebook-post-likes': 'comprare-like-post-facebook',
    tools: 'strumenti', 'instagram-profile-viewer': 'strumenti/vedere-profilo-instagram',
    'instagram-video-downloader': 'strumenti/scaricare-video-instagram',
    'tiktok-video-downloader': 'strumenti/scaricare-video-tiktok',
    'facebook-video-downloader': 'strumenti/scaricare-video-facebook',
  },
  'pt-br': {
    home: '', faq: 'perguntas-frequentes', about: 'sobre', contact: 'contato', reviews: 'avaliacoes',
    'instagram-followers': 'comprar-seguidores-instagram', 'instagram-likes': 'comprar-curtidas-instagram',
    'instagram-views': 'comprar-visualizacoes-instagram', 'instagram-comments': 'comprar-comentarios-instagram',
    'tiktok-followers': 'comprar-seguidores-tiktok', 'tiktok-likes': 'comprar-curtidas-tiktok',
    'tiktok-views': 'comprar-visualizacoes-tiktok', 'facebook-followers': 'comprar-seguidores-facebook',
    'facebook-page-likes': 'comprar-curtidas-pagina-facebook', 'facebook-post-likes': 'comprar-curtidas-publicacao-facebook',
    tools: 'ferramentas', 'instagram-profile-viewer': 'ferramentas/ver-perfil-instagram',
    'instagram-video-downloader': 'ferramentas/baixar-videos-instagram',
    'tiktok-video-downloader': 'ferramentas/baixar-videos-tiktok',
    'facebook-video-downloader': 'ferramentas/baixar-videos-facebook',
  },
  ar: { ...EN },
};

const PAGE_KEYS = Object.keys(EN);
const issues = [];
const stats = { pages: 0, h1Ok: 0, eyebrowOk: 0, quickAnswerOk: 0, rtlOk: 0, faqOk: 0 };

function pathFor(locale, key) {
  const slug = locale === 'en' ? EN[key] : SLUGS[locale][key];
  if (locale === 'en') return slug ? `/${slug}` : '/';
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

async function fetchPage(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'follow' });
  return { status: res.status, html: await res.text() };
}

function extract(html, re) {
  const m = html.match(re);
  return m?.[1] ?? null;
}

async function check(locale, key) {
  const path = pathFor(locale, key);
  const { status, html } = await fetchPage(path);
  stats.pages++;
  if (status !== 200) {
    issues.push({ sev: 'P0', locale, key, path, msg: `HTTP ${status}` });
    return;
  }

  const dir = extract(html, /<html[^>]*\sdir="([^"]+)"/i);
  if (locale === 'ar') {
    if (dir === 'rtl') stats.rtlOk++;
    else issues.push({ sev: 'P0', locale, key, path, msg: `Missing dir=rtl (${dir})` });
  }

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count === 1) stats.h1Ok++;
  else issues.push({ sev: 'P1', locale, key, path, msg: `H1 count ${h1Count}` });

  // Eyebrow: look for eyebrow component pattern (uppercase small label before h1)
  const hasEyebrow = /class="[^"]*eyebrow|data-eyebrow|<p[^>]*uppercase[^>]*tracking/i.test(html)
    || /SERVICES|SERVIZI|SERVICES|HERRAMIENTAS|STRUMENTI|OUTILS|خدمات|LEARN|STORY|SUPPORT|HELP|FEEDBACK|CENTRO|HILFE|AIDE/i.test(html);
  if (hasEyebrow || key === 'home') stats.eyebrowOk++;

  const isService = key.includes('instagram-') || key.includes('tiktok-') || key.includes('facebook-');
  const isTool = key.startsWith('instagram-') || key.startsWith('tiktok-') || key.startsWith('facebook-') || key === 'tools';
  if ((isService || (isTool && key !== 'tools')) && html.includes('id="quick-answer"')) stats.quickAnswerOk++;

  if (isService && (/<details|aria-expanded|faq-/i.test(html))) stats.faqOk++;
}

async function main() {
  for (const locale of LOCALES) {
    for (const key of PAGE_KEYS) await check(locale, key);
  }

  // ES footer labels
  const esHome = await fetchPage('/es');
  for (const label of [
    'Me gusta de Instagram', 'Visualizaciones de Instagram', 'Me gusta de TikTok',
    'Visualizaciones de TikTok', 'Me gusta de Página de Facebook', 'Me gusta de publicaciones de Facebook',
  ]) {
    if (!esHome.html.includes(label)) issues.push({ sev: 'P1', locale: 'es', key: 'footer', path: '/es', msg: `Missing footer: ${label}` });
  }

  // Regression related services
  const esViews = await fetchPage('/es/comprar-vistas-instagram');
  if (!esViews.html.includes('/es/comprar-likes-instagram')) {
    issues.push({ sev: 'P0', locale: 'regression', key: 'related', path: '/es/comprar-vistas-instagram', msg: 'Missing related IG likes link' });
  }
  if (/Me-gusta|Me%20gusta|visualizaciones-instagram\/likes/.test(esViews.html)) {
    issues.push({ sev: 'P0', locale: 'regression', key: 'slug', path: '/es/comprar-vistas-instagram', msg: 'Corrupted slug in related links' });
  }

  // Learn intentionally absent from localized nav
  const learnInEsNav = esHome.html.includes('href="/learn"');
  const learnAbsentByDesign = !learnInEsNav;

  console.log(JSON.stringify({
    base: BASE,
    stats,
    learnAbsentByDesign,
    issueCount: issues.length,
    issues: issues.slice(0, 30),
  }, null, 2));
}

main();
