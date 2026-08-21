/**
 * Apply production SQL migrations against DATABASE_URL.
 * Usage: npm run db:migrate:sql
 */

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

import postgres from 'postgres';

import { loadAppEnvFiles } from './lib/load-env-file';

async function main() {
  loadAppEnvFiles();

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error('[migrate] DATABASE_URL is required.');
    process.exit(1);
  }

  const drizzleDir = path.join(process.cwd(), 'drizzle');
  const files = readdirSync(drizzleDir)
    .filter((name) => name.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.error('[migrate] No SQL files found in drizzle/.');
    process.exit(1);
  }

  const sql = postgres(url, { max: 1, prepare: false });
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    for (const file of files) {
      const id = file;
      const existing = await sql<{ id: string }[]>`
        SELECT id FROM schema_migrations WHERE id = ${id} LIMIT 1
      `;
      if (existing.length > 0) {
        console.log(`[migrate] skip ${id} (already applied)`);
        continue;
      }

      const fullPath = path.join(drizzleDir, file);
      const body = readFileSync(fullPath, 'utf8');
      console.log(`[migrate] applying ${id}…`);
      await sql.unsafe(body);
      await sql`INSERT INTO schema_migrations (id) VALUES (${id})`;
      console.log(`[migrate] applied ${id}`);
    }

    console.log('[migrate] complete');
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error('[migrate] failed', error instanceof Error ? error.message : error);
  process.exit(1);
});
