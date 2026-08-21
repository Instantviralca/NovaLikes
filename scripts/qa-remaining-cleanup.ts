/**
 * Remove disposable remaining-QA CMS rows. Keeps the main local author.
 * Local file-store / QA only.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

function loadEnvFile(filename: string) {
  const fullPath = path.join(process.cwd(), filename);
  if (!existsSync(fullPath)) return;
  for (const raw of readFileSync(fullPath, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

async function main() {
  const { assertCmsDevOnlyCommand } = await import('@/lib/cms/dev-only');
  assertCmsDevOnlyCommand('qa remaining cleanup');
  const { mutateCmsArticle } = await import('@/lib/cms/articles');
  const { cmsListArticles, cmsListUsers, cmsDeleteUser, cmsListMedia, cmsDeleteMedia } = await import(
    '@/lib/cms/store'
  );

  const keepEmail = (process.env.CMS_QA_EMAIL || 'author@novalikes.com').trim().toLowerCase();
  let articlesRemoved = 0;
  let publishedLeft = 0;
  for (const article of await cmsListArticles({ status: 'all' })) {
    if (!/remaining-qa-|author-dashboard-qa-/.test(article.slug)) continue;
    if (article.status === 'published') {
      await mutateCmsArticle(article.id, { type: 'unpublish' }, 'system:qa-cleanup');
    }
    if (article.status !== 'trash') {
      await mutateCmsArticle(article.id, { type: 'trash' }, 'system:qa-cleanup');
    }
    await mutateCmsArticle(article.id, { type: 'delete_permanent' }, 'system:qa-cleanup');
    articlesRemoved += 1;
  }
  for (const article of await cmsListArticles({ status: 'all' })) {
    if (article.status === 'published' && /remaining-qa-|author-dashboard-qa-/.test(article.slug)) {
      publishedLeft += 1;
    }
  }

  let authorsRemoved = 0;
  for (const user of await cmsListUsers()) {
    if (user.email === keepEmail) continue;
    if (!/qa-disposable-/i.test(user.email)) continue;
    await cmsDeleteUser(user.id);
    authorsRemoved += 1;
  }

  let mediaRemoved = 0;
  for (const media of await cmsListMedia()) {
    if (!/qa-|remaining-qa/i.test(media.filename) && !/qa-|remaining-qa/i.test(media.alt)) continue;
    await cmsDeleteMedia(media.id);
    mediaRemoved += 1;
  }

  console.log(
    `[qa-cleanup] articles=${articlesRemoved} disposableAuthors=${authorsRemoved} media=${mediaRemoved} leftoverPublishedQa=${publishedLeft}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
