/**
 * Clear CMS author login rate-limit rows.
 * Local development / QA only — refuses to run in production.
 *
 *   npm run author:reset-login-rate-limit
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

async function main() {
  loadEnvFile('.env');
  loadEnvFile('.env.local');
  const { assertCmsDevOnlyCommand } = await import('@/lib/cms/dev-only');
  assertCmsDevOnlyCommand('author:reset-login-rate-limit');
  const { cmsClearLoginAttempts } = await import('@/lib/cms/store');
  const cleared = await cmsClearLoginAttempts();
  console.log(`[author:reset-login-rate-limit] cleared ${cleared} attempt(s). Production limiter unchanged.`);
}

main().catch((error) => {
  console.error('[author:reset-login-rate-limit]', error instanceof Error ? error.message : error);
  process.exit(1);
});
