const BASE = 'http://127.0.0.1:3012';
const locales = ['es', 'de', 'fr', 'it', 'pt-br', 'ar'];
const cores = [
  '/',
  '/faq',
  '/buy-instagram-followers',
  '/buy-instagram-likes',
  '/buy-instagram-views',
  '/buy-instagram-comments',
  '/buy-tiktok-followers',
  '/buy-tiktok-likes',
  '/buy-tiktok-views',
  '/buy-facebook-followers',
  '/buy-facebook-page-likes',
  '/buy-facebook-post-likes',
];

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

async function main() {
  const report = {
    ok: 0,
    fail: [],
    titles: 0,
    descs: 0,
    canonicalOk: 0,
    langOk: 0,
    rtlOk: 0,
    notFoundOk: 0,
    englishTitle: '',
    spanishH1: '',
    arabicDir: '',
  };

  for (const p of cores) {
    const r = await fetch(BASE + p);
    const html = await r.text();
    if (r.status !== 200) report.fail.push(`en ${p} ${r.status}`);
    else report.ok += 1;
    if (p === '/') report.englishTitle = pick(html, /<title>([^<]+)<\/title>/i);
    const lang = pick(html, /<html[^>]*lang="([^"]+)"/i);
    if (lang === 'en') report.langOk += 1;
    else report.fail.push(`en lang ${p} ${lang}`);
    const can = pick(html, /<link rel="canonical" href="([^"]+)"/i);
    if (can.startsWith('https://novalikes.com') && !can.includes('/es/')) report.canonicalOk += 1;
  }

  for (const loc of locales) {
    for (const p of cores) {
      const path = p === '/' ? `/${loc}` : `/${loc}${p}`;
      const r = await fetch(BASE + path);
      const html = await r.text();
      if (r.status !== 200) {
        report.fail.push(`${path} status ${r.status}`);
        continue;
      }
      report.ok += 1;
      const title = pick(html, /<title>([^<]+)<\/title>/i);
      const desc = pick(html, /<meta name="description" content="([^"]+)"/i);
      if (title) report.titles += 1;
      if (desc) report.descs += 1;
      const can = pick(html, /<link rel="canonical" href="([^"]+)"/i);
      const expected = `https://novalikes.com${path}`;
      if (can === expected) report.canonicalOk += 1;
      else report.fail.push(`canonical ${path} => ${can}`);
      const lang = pick(html, /<html[^>]*lang="([^"]+)"/i);
      const want = loc === 'pt-br' ? 'pt-BR' : loc;
      if (lang === want) report.langOk += 1;
      else report.fail.push(`lang ${path} ${lang}`);
      if (loc === 'ar') {
        if (html.includes('dir="rtl"')) report.rtlOk += 1;
        else report.fail.push(`rtl missing ${path}`);
      }
      if (p === '/' && loc === 'es') {
        report.spanishH1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, '');
      }
      if (p === '/' && loc === 'ar') {
        report.arabicDir = html.includes('dir="rtl"') ? 'rtl' : 'missing';
      }
      if (p === '/' && html.includes('Grow Your Social Media Presence with NovaLikes')) {
        report.fail.push(`english leak home ${path}`);
      }
      if (!html.includes('hreflang="x-default"')) report.fail.push(`no x-default ${path}`);
    }
  }

  for (const bad of ['/xx', '/en', '/eng', '/spanish', '/i18n/es']) {
    const r = await fetch(BASE + bad, { redirect: 'manual' });
    if (r.status === 404 || r.status === 308 || r.status === 301) report.notFoundOk += 1;
    else report.fail.push(`bad ${bad} ${r.status}`);
  }

  const esCase = await fetch(BASE + '/ES', { redirect: 'manual' });
  if (esCase.status === 308 || esCase.status === 301) report.notFoundOk += 1;
  else report.fail.push(`/ES ${esCase.status}`);

  const sm = await fetch(BASE + '/sitemap.xml');
  const smx = await sm.text();
  const localizedUrls = (smx.match(/https:\/\/novalikes.com\/(es|de|fr|it|pt-br|ar)(\/[^<]*)?</g) || []).length;

  console.log(
    JSON.stringify(
      {
        ok: report.ok,
        failCount: report.fail.length,
        failSample: report.fail.slice(0, 25),
        titles: report.titles,
        descs: report.descs,
        canonicalOk: report.canonicalOk,
        langOk: report.langOk,
        rtlOk: report.rtlOk,
        notFoundOk: report.notFoundOk,
        englishTitle: report.englishTitle,
        spanishH1: report.spanishH1,
        arabicDir: report.arabicDir,
        sitemapStatus: sm.status,
        sitemapLocalizedApprox: localizedUrls,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
