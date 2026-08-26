/**
 * Opt-in guard for Document 16 scaffold/content-plan tests.
 * Production Learn content lives in data/learn/articles.ts (26 live articles).
 * Set SCAFFOLD_CONTENT_PLAN=1 when PLANNED_ARTICLES is populated for generator QA.
 */

import { PLANNED_ARTICLES } from '@/data/content-plan/articles';

export const SCAFFOLD_CONTENT_PLAN_ENABLED =
  process.env.SCAFFOLD_CONTENT_PLAN === '1' && PLANNED_ARTICLES.length > 0;
