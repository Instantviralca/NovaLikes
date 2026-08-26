/**
 * Vitest setup — mock Next.js server-only guard for unit tests in Node.
 */
import { vi } from 'vitest';

vi.mock('server-only', () => ({}));
