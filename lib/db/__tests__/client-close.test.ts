import { beforeEach, describe, expect, it, vi } from 'vitest';

const end = vi.fn(async () => undefined);
const postgresMock = vi.fn(() => {
  const client = Object.assign(async () => [], { end });
  return client;
});

vi.mock('postgres', () => ({
  default: () => postgresMock(),
}));

vi.mock('drizzle-orm/postgres-js', () => ({
  drizzle: () => ({ mocked: true }),
}));

describe('closeDb', () => {
  beforeEach(() => {
    end.mockClear();
    postgresMock.mockClear();
    vi.resetModules();
    process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/novalikes_test';
  });

  it('ends the postgres client so cron scripts can exit', async () => {
    const { getDb, closeDb, resetDbSingletonForTests } = await import('@/lib/db/client');
    resetDbSingletonForTests();

    getDb();
    expect(postgresMock).toHaveBeenCalledTimes(1);

    await closeDb();
    expect(end).toHaveBeenCalledWith({ timeout: 5 });

    getDb();
    expect(postgresMock).toHaveBeenCalledTimes(2);
  });
});
