/**
 * Verify required production environment variables (no secret values printed).
 * Usage:
 *   npx tsx scripts/verify-production-env.ts
 *   IV_VERIFY_AS_PRODUCTION=1 npx tsx scripts/verify-production-env.ts
 * Exit 0 = ready, Exit 1 = missing/invalid.
 */

import { validateEnv } from '../lib/config/env';
import { loadAppEnvFiles } from './lib/load-env-file';

function main() {
  loadAppEnvFiles();

  const forceProduction = process.env.IV_VERIFY_AS_PRODUCTION === '1';
  const result = validateEnv({
    throwOnProductionErrors: false,
    forceProduction,
  });

  const errors = result.issues.filter((i) => i.level === 'error');
  const warnings = result.issues.filter((i) => i.level === 'warning');

  console.log('[env] Production environment verification');
  console.log(`[env] mode=${forceProduction ? 'production-rules' : 'current-runtime'}`);
  console.log(`[env] ok=${result.ok}`);

  for (const issue of errors) {
    console.error(`[env:error] ${issue.key}: ${issue.message}`);
  }
  for (const issue of warnings) {
    console.warn(`[env:warn] ${issue.key}: ${issue.message}`);
  }

  if (!result.ok) {
    console.error('[env] NOT READY — fix errors above before deploying.');
    process.exit(1);
  }

  console.log('[env] READY — critical production variables are present.');
  process.exit(0);
}

main();
