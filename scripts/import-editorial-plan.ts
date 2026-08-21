/**
 * Import NovaLikes editorial calendar into CMS as Planned records.
 * Existing CMS/Learn articles are reused, never overwritten.
 */
import { isDatabaseConfigured, isProductionRuntime } from '@/lib/config/env';
import { loadAppEnvFiles } from './lib/load-env-file';

async function main() {
  loadAppEnvFiles();

  if (isProductionRuntime() && !isDatabaseConfigured()) {
    console.error('[author:import-editorial-plan] DATABASE_URL is required in production.');
    process.exit(1);
  }

  const { seedEditorialPlan } = await import('@/lib/cms/seed-editorial-plan');
  const result = await seedEditorialPlan('system:editorial-plan');
  console.log(
    `[author:import-editorial-plan] created=${result.created} reusedCms=${result.reusedCms} linkedRegistry=${result.linkedRegistry}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
