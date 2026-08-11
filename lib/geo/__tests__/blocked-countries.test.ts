import { describe, expect, it } from 'vitest';

import {
  isBlockedCountryCode,
  shouldBlockRequest,
} from '@/lib/geo/blocked-countries';

function headersWithCountry(code: string | null): Headers {
  const headers = new Headers();
  if (code) headers.set('x-vercel-ip-country', code);
  return headers;
}

describe('geo blocked countries', () => {
  it('blocks no countries', () => {
    expect(isBlockedCountryCode('PK')).toBe(false);
    expect(isBlockedCountryCode('IN')).toBe(false);
    expect(isBlockedCountryCode('CA')).toBe(false);
  });

  it('allows public paths for all countries', () => {
    expect(
      shouldBlockRequest({
        pathname: '/',
        headers: headersWithCountry('PK'),
      }),
    ).toBe(false);
  });
});
