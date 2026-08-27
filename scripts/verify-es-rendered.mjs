const BASE = 'http://localhost:3000';

async function text(path) {
  const html = await (await fetch(BASE + path)).text();
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return { html, visible };
}

function h1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;
}

const pages = [
  '/es',
  '/es/comprar-likes-instagram',
  '/es/comprar-vistas-instagram',
  '/es/comprar-likes-tiktok',
  '/es/comprar-vistas-tiktok',
  '/es/comprar-likes-pagina-facebook',
  '/es/comprar-likes-publicacion-facebook',
  '/es/preguntas-frecuentes',
];

const report = [];
for (const path of pages) {
  const { html, visible } = await text(path);
  const likesHits = [...visible.matchAll(/(?<![A-Za-z])Likes(?![A-Za-z])/g)].map((m) =>
    visible.slice(Math.max(0, m.index - 30), m.index + 40),
  );
  const viewsHits = [...visible.matchAll(/(?<![A-Za-z])Views(?![A-Za-z])/g)].map((m) =>
    visible.slice(Math.max(0, m.index - 30), m.index + 40),
  );
  const techLikes = (html.match(/buy-[a-z-]*likes|faq-[a-z-]*likes/gi) ?? []).length;
  const techViews = (html.match(/buy-[a-z-]*views|faq-[a-z-]*views/gi) ?? []).length;
  report.push({
    path,
    visibleLikes: likesHits.length,
    visibleViews: viewsHits.length,
    likesSamples: likesHits.slice(0, 3),
    viewsSamples: viewsHits.slice(0, 3),
    techLikes,
    techViews,
    packageSample: visible.includes('Me gusta de Instagram') || visible.includes('visualizaciones de Instagram'),
    quickAnswerLikesLoan: /paquetes de likes|Los likes|a likes/i.test(visible),
  });
}

const tools = [
  ['/tools/instagram-profile-viewer', 'en'],
  ['/es/herramientas/ver-perfil-instagram', 'es'],
  ['/fr/outils/voir-profil-instagram', 'fr'],
  ['/ar/tools/instagram-profile-viewer', 'ar'],
];
const toolH1 = [];
for (const [path] of tools) {
  const { html } = await text(path);
  toolH1.push({ path, h1: h1(html) });
}

console.log(JSON.stringify({ report, toolH1 }, null, 2));
