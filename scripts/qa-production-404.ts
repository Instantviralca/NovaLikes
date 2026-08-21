/**
 * Local production 404 check for unpublished CMS Learn slugs.
 * Usage: QA_PROD_BASE=http://localhost:3002 npx tsx scripts/qa-production-404.ts
 */
const BASE = process.env.QA_PROD_BASE || 'http://localhost:3002';
const slugs = [
  process.env.QA_MISSING_SLUG || 'definitely-not-a-cms-learn-slug-qa-404',
  process.env.QA_DRAFT_SLUG || '',
  process.env.QA_TRASH_SLUG || '',
].filter(Boolean);

async function check(slug: string, sitemap: string) {
  const response = await fetch(`${BASE}/learn/${slug}`);
  const html = await response.text();
  const result = {
    slug,
    status: response.status,
    notFound: /Page not found/i.test(html),
    titleLeak: /Remaining QA Persistence Article/i.test(html),
    schema: /BlogPosting|"@type":"Article"/.test(html),
    noindex: /noindex/i.test(html),
    inSitemap: sitemap.includes(`/learn/${slug}`),
    robots: response.headers.get('x-robots-tag'),
  };
  const pass =
    (result.status === 404 || result.notFound) &&
    !result.titleLeak &&
    !result.schema &&
    !result.inSitemap;
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${JSON.stringify(result)}`);
  return pass;
}

async function main() {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  let ok = true;
  for (const slug of slugs) {
    if (!(await check(slug, sitemap))) ok = false;
  }
  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
