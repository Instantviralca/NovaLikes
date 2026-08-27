/**
 * Read-only rendered-page QA against local production server.
 * Usage: node scripts/browser-qa.mjs [baseUrl]
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
    home: '',
    faq: 'preguntas-frecuentes',
    about: 'acerca-de',
    contact: 'contacto',
    reviews: 'resenas',
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
    'instagram-profile-viewer': 'herramientas/ver-perfil-instagram',
    'instagram-video-downloader': 'herramientas/descargar-videos-instagram',
    'tiktok-video-downloader': 'herramientas/descargar-videos-tiktok',
    'facebook-video-downloader': 'herramientas/descargar-videos-facebook',
  },
  de: {
    home: '',
    faq: 'haeufige-fragen',
    about: 'ueber-uns',
    contact: 'kontakt',
    reviews: 'bewertungen',
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
    'instagram-profile-viewer': 'tools/instagram-profil-anzeigen',
    'instagram-video-downloader': 'tools/instagram-videos-herunterladen',
    'tiktok-video-downloader': 'tools/tiktok-videos-herunterladen',
    'facebook-video-downloader': 'tools/facebook-videos-herunterladen',
  },
  fr: {
    home: '',
    faq: 'questions-frequentes',
    about: 'a-propos',
    contact: 'contact',
    reviews: 'avis',
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
    'instagram-profile-viewer': 'outils/voir-profil-instagram',
    'instagram-video-downloader': 'outils/telecharger-video-instagram',
    'tiktok-video-downloader': 'outils/telecharger-video-tiktok',
    'facebook-video-downloader': 'outils/telecharger-video-facebook',
  },
  it: {
    home: '',
    faq: 'domande-frequenti',
    about: 'chi-siamo',
    contact: 'contatti',
    reviews: 'recensioni',
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
    'instagram-profile-viewer': 'strumenti/vedere-profilo-instagram',
    'instagram-video-downloader': 'strumenti/scaricare-video-instagram',
    'tiktok-video-downloader': 'strumenti/scaricare-video-tiktok',
    'facebook-video-downloader': 'strumenti/scaricare-video-facebook',
  },
  'pt-br': {
    home: '',
    faq: 'perguntas-frequentes',
    about: 'sobre',
    contact: 'contato',
    reviews: 'avaliacoes',
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
    'instagram-profile-viewer': 'ferramentas/ver-perfil-instagram',
    'instagram-video-downloader': 'ferramentas/baixar-videos-instagram',
    'tiktok-video-downloader': 'ferramentas/baixar-videos-tiktok',
    'facebook-video-downloader': 'ferramentas/baixar-videos-facebook',
  },
  ar: { ...EN },
};

const PAGE_KEYS = Object.keys(EN);
const SERVICE_KEYS = [
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
];
const QA_KEYS = PAGE_KEYS;

function pathFor(locale, key) {
  const slug = locale === 'en' ? EN[key] : SLUGS[locale][key];
  if (locale === 'en') return slug ? `/${slug}` : '/';
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countH1(html) {
  return (html.match(/<h1[\s>]/gi) ?? []).length;
}

function extract(html, re) {
  const m = html.match(re);
  return m?.[1] ?? null;
}

async function fetchPage(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { redirect: 'follow' });
  const html = await res.text();
  return { url, status: res.status, html, finalUrl: res.url };
}

const issues = [];
const checked = [];
let ok = 0;

async function checkPage(locale, key) {
  const path = pathFor(locale, key);
  let page;
  try {
    page = await fetchPage(path);
  } catch (e) {
    issues.push({ severity: 'P0', locale, key, path, msg: `Fetch failed: ${e.message}` });
    return;
  }

  checked.push({ locale, key, path, status: page.status });

  if (page.status !== 200) {
    issues.push({ severity: 'P0', locale, key, path, msg: `HTTP ${page.status}` });
    return;
  }

  const { html } = page;
  const lang = extract(html, /<html[^>]*\slang="([^"]+)"/i);
  const dir = extract(html, /<html[^>]*\sdir="([^"]+)"/i);

  if (locale === 'ar' && dir !== 'rtl') {
    issues.push({ severity: 'P0', locale, key, path, msg: `Expected dir=rtl, got ${dir}` });
  } else if (locale !== 'ar' && dir === 'rtl') {
    issues.push({ severity: 'P1', locale, key, path, msg: 'Unexpected dir=rtl' });
  }

  const h1s = countH1(html);
  if (h1s !== 1) {
    issues.push({ severity: 'P1', locale, key, path, msg: `Expected 1 H1, found ${h1s}` });
  }

  const isService = SERVICE_KEYS.includes(key);
  const isTool =
    key.startsWith('instagram-') ||
    key.startsWith('tiktok-') ||
    key.startsWith('facebook-') ||
    key === 'tools';

  if (isService || (isTool && key !== 'tools')) {
    if (!html.includes('id="quick-answer"')) {
      issues.push({ severity: 'P1', locale, key, path, msg: 'Missing Quick Answer section' });
    }
  }

  if (isService) {
    if (!/preguntas frecuentes|faq|domande frequenti|questions fréquentes|haeufige fragen|perguntas frequentes|الأسئلة/i.test(html)) {
      // FAQ section title varies; also check accordion/disclosure patterns
      if (!/<details|accordion|faq-/i.test(html)) {
        issues.push({ severity: 'P1', locale, key, path, msg: 'FAQ section not detected in HTML' });
      }
    }
  }

  if (locale === 'es') {
    const text = stripHtml(html);
    if (/\bviews\b/i.test(text)) {
      issues.push({ severity: 'P1', locale, key, path, msg: 'Visible English "views" in rendered text' });
    }
    // "likes" in URL slugs is OK; flag standalone English word in UI chunks
    if (/\bLikes de\b|\blikes de\b|\bComprar likes\b/i.test(text)) {
      issues.push({ severity: 'P1', locale, key, path, msg: 'Visible English "likes" label in rendered text' });
    }
  }

  ok++;
}

async function regressionChecks() {
  const cases = [
    {
      path: '/es/comprar-vistas-instagram',
      mustInclude: ['/es/comprar-likes-instagram', '/es/comprar-seguidores-instagram'],
      mustExclude: ['Me-gusta', 'Me%20gusta', 'visualizaciones-instagram/likes'],
    },
    {
      path: '/it/comprare-visualizzazioni-instagram',
      mustInclude: ['/it/comprare-like-instagram', '/it/comprare-follower-instagram'],
      mustExclude: ['visualizzazioni-instagram/likes'],
    },
    {
      path: '/es/comprar-likes-pagina-facebook',
      mustInclude: ['Me gusta de Página', 'Me gusta de publicaciones', 'seguidores'],
      mustExclude: [],
    },
  ];

  for (const c of cases) {
    const page = await fetchPage(c.path);
    if (page.status !== 200) {
      issues.push({ severity: 'P0', locale: 'regression', key: c.path, path: c.path, msg: `HTTP ${page.status}` });
      continue;
    }
    for (const s of c.mustInclude) {
      if (!page.html.includes(s)) {
        issues.push({ severity: 'P0', locale: 'regression', key: c.path, path: c.path, msg: `Missing expected content/link: ${s}` });
      }
    }
    for (const s of c.mustExclude) {
      if (page.html.includes(s)) {
        issues.push({ severity: 'P0', locale: 'regression', key: c.path, path: c.path, msg: `Corrupted slug/link: ${s}` });
      }
    }
    // FAQ items for views pages
    if (c.path.includes('vistas') || c.path.includes('visualizzazioni')) {
      if (!page.html.includes('faq-ig-views') && !page.html.includes('faq-tt-views')) {
        // FAQ content may render question text not ids - check for multiple FAQ entries
        const faqCount = (page.html.match(/<details|<button[^>]*aria-expanded/gi) ?? []).length;
        if (faqCount < 3) {
          issues.push({ severity: 'P1', locale: 'regression', key: c.path, path: c.path, msg: `FAQ accordion sparse (${faqCount} items)` });
        }
      }
    }
  }
}

async function footerNavChecks() {
  const page = await fetchPage('/es');
  const html = page.html;
  const expected = [
    'Me gusta de Instagram',
    'Visualizaciones de Instagram',
    'Me gusta de TikTok',
    'Visualizaciones de TikTok',
    'Me gusta de Página de Facebook',
    'Me gusta de publicaciones de Facebook',
  ];
  for (const label of expected) {
    if (!html.includes(label)) {
      issues.push({ severity: 'P1', locale: 'es', key: 'footer', path: '/es', msg: `Footer missing label: ${label}` });
    }
  }
  const hrefChecks = [
    ['Me gusta de Instagram', '/es/comprar-likes-instagram'],
    ['Visualizaciones de Instagram', '/es/comprar-vistas-instagram'],
  ];
  for (const [label, href] of hrefChecks) {
    const re = new RegExp(`href="${href.replace(/\//g, '\\/')}"[^>]*>${label}|>${label}<`, 'i');
    if (!re.test(html) && !html.includes(`href="${href}"`)) {
      issues.push({ severity: 'P1', locale: 'es', key: 'footer', path: '/es', msg: `Footer link ${href} not found near ${label}` });
    }
  }
  if (!html.includes('href="/learn"') && !html.includes("href='/learn'")) {
    issues.push({ severity: 'P2', locale: 'es', key: 'nav', path: '/es', msg: 'Learn link to /learn not found' });
  }
}

async function main() {
  console.log(`Browser QA against ${BASE}\n`);
  for (const locale of LOCALES) {
    for (const key of QA_KEYS) {
      await checkPage(locale, key);
    }
  }
  await regressionChecks();
  await footerNavChecks();

  console.log(JSON.stringify({
    base: BASE,
    pagesChecked: checked.length,
    pagesOk: ok,
    issueCount: issues.length,
    issues,
    sampleChecked: checked.slice(0, 5),
  }, null, 2));
  process.exit(issues.some((i) => i.severity === 'P0') ? 1 : 0);
}

main();
