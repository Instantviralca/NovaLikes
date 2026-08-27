/** Locale-specific spot checks for nav, hero H1, Spanish leakage sources */
const BASE = 'http://localhost:3000';

async function get(path) {
  const html = await (await fetch(BASE + path)).text();
  const text = html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  return { html, text };
}

const checks = [];

function h1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? m[1].replace(/<[^>]+>/g,'').trim() : null;
}

function eyebrowBeforeH1(html) {
  const chunk = html.slice(0, html.indexOf('<h1'));
  const m = chunk.match(/class="[^"]*uppercase[^"]*"[^>]*>([^<]+)</i) || chunk.match(/Eyebrow[^>]*>([^<]+)</i);
  return m?.[1]?.trim() ?? (chunk.match(/SERVICES|SERVIZI|HERRAMIENTAS|STRUMENTI|OUTILS|CENTRO DE AYUDA|UNSERE|NOTRE|NOSSA|قصتنا|HELP CENTER/i)?.[0] ?? null);
}

async function main() {
  const pages = [
    ['es', '/es', 'homepage'],
    ['es', '/es/comprar-likes-instagram', 'ig-likes'],
    ['es', '/es/comprar-vistas-instagram', 'ig-views'],
    ['es', '/es/comprar-likes-tiktok', 'tt-likes'],
    ['es', '/es/comprar-vistas-tiktok', 'tt-views'],
    ['es', '/es/comprar-likes-pagina-facebook', 'fb-page'],
    ['es', '/es/comprar-likes-publicacion-facebook', 'fb-post'],
    ['de', '/de/instagram-follower-kaufen', 'ig-followers'],
    ['de', '/de/facebook-seiten-likes-kaufen', 'fb-page'],
    ['de', '/de/tools', 'tools'],
    ['it', '/it/comprare-visualizzazioni-instagram', 'ig-views'],
    ['it', '/it/comprare-like-instagram', 'ig-likes'],
    ['fr', '/fr/acheter-vues-instagram', 'ig-views'],
    ['pt-br', '/pt-br/comprar-visualizacoes-instagram', 'ig-views'],
    ['ar', '/ar/buy-instagram-followers', 'ig-followers'],
    ['ar', '/ar/tools/instagram-profile-viewer', 'tool'],
    ['en', '/learn', 'learn'],
  ];

  for (const [loc, path, key] of pages) {
    const { html, text } = await get(path);
    checks.push({
      loc, key, path,
      h1: h1(html),
      eyebrow: eyebrowBeforeH1(html),
      dir: html.match(/dir="([^"]+)"/)?.[1],
      quickAnswer: html.includes('id="quick-answer"'),
      esViews: loc === 'es' ? (text.match(/\bviews\b/gi) ?? []).length : undefined,
      esLikesLoan: loc === 'es' ? (text.match(/\blikes\b/gi) ?? []).length : undefined,
    });
  }

  // Nav label spot checks from ES home HTML
  const es = await get('/es');
  const navLabels = [
    'Comprar Me gusta de Instagram', 'Comprar visualizaciones de Instagram',
    'Comprar Me gusta de TikTok', 'Me gusta de Página de Facebook',
  ];
  checks.push({ navEs: navLabels.map(l => ({ label: l, found: es.html.includes(l) })) });

  const de = await get('/de');
  checks.push({
    deNav: ['Instagram-Follower', 'Facebook-Seiten-Likes', 'Kostenlose Social-Media-Tools'].map(l => ({ label: l, found: de.html.includes(l) || de.text.includes(l) })),
  });

  console.log(JSON.stringify(checks, null, 2));
}

main();
