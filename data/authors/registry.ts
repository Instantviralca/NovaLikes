/**
 * Centralized Author registry — Document 15.03.
 * Only approved author profiles. Do not invent individual people or credentials.
 */

import { NAJAF_KHAN } from '@/data/authors/novalikes-editorial-team';
import type { AuthorRecord } from '@/types/author';

/** Production registry — approved public authors. */
export const AUTHORS: readonly AuthorRecord[] = [NAJAF_KHAN];
