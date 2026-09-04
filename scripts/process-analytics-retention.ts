/**
 * Optional analytics retention cleanup.
 * Deletes raw analytics_events older than ANALYTICS_EVENT_RETENTION_DAYS (default 180).
 * Does NOT run automatically — invoke manually when ready.
 *
 * Usage: npx tsx scripts/process-analytics-retention.ts
 */

import postgres from 'postgres';

import { loadAppEnvFiles } from './lib/load-env-file';

async function main() {
  loadAppEnvFiles();

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error('[analytics-retention] DATABASE_URL is required.');
    process.exit(1);
  }

  const daysRaw = process.env.ANALYTICS_EVENT_RETENTION_DAYS?.trim();
  const days = daysRaw ? Number(daysRaw) : 180;
  if (!Number.isFinite(days) || days < 30) {
    console.error('[analytics-retention] ANALYTICS_EVENT_RETENTION_DAYS must be >= 30.');
    process.exit(1);
  }

  const sql = postgres(url, { max: 1, prepare: false });
  try {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const deleted = await sql`
      DELETE FROM analytics_events
      WHERE COALESCE(occurred_at, created_at) < ${cutoff}
      RETURNING id
    `;
    console.log(
      `[analytics-retention] Deleted ${deleted.length} events older than ${days} days (before ${cutoff.toISOString()}).`,
    );
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error('[analytics-retention] failed', error);
  process.exit(1);
});
