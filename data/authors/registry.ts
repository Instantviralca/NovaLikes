/**
 * Centralized Author registry — Document 15.03.
 * Only approved author profiles. Do not invent individual people or credentials.
 */

import { NOVALIKES_EDITORIAL_TEAM } from '@/data/authors/novalikes-editorial-team';
import type { AuthorRecord } from '@/types/author';

/** Production registry — NovaLikes Editorial Team. */
export const AUTHORS: readonly AuthorRecord[] = [NOVALIKES_EDITORIAL_TEAM];
