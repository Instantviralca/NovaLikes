/**
 * Launch checklist verification suite — smoke assertions for critical surfaces.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { routes } from '@/config/routes';

const root = process.cwd();

function pageExists(...parts: string[]) {
  return existsSync(path.join(root, ...parts));
}

describe('Launch checklist surfaces', () => {
  it('has homepage, FAQ, contact, learn, cart, checkout, track, order-success', () => {
    expect(pageExists('app/(marketing)/page.tsx')).toBe(true);
    expect(pageExists('app/(marketing)/faq/page.tsx')).toBe(true);
    expect(pageExists('app/(marketing)/contact/page.tsx')).toBe(true);
    expect(pageExists('app/(learn)/learn/page.tsx')).toBe(true);
    expect(pageExists('app/(commerce)/cart/page.tsx')).toBe(true);
    expect(pageExists('app/(commerce)/checkout/page.tsx')).toBe(true);
    expect(pageExists('app/(commerce)/order-success/page.tsx')).toBe(true);
    expect(pageExists('app/(marketing)/track-order/page.tsx')).toBe(true);
    expect(routes.orderSuccess).toBe('/order-success');
  });

  it('registers all 10 approved service pages via dynamic slug route', () => {
    expect(APPROVED_SERVICE_SLUGS).toHaveLength(10);
    expect(pageExists('app/(marketing)/[slug]/page.tsx')).toBe(true);
    for (const slug of APPROVED_SERVICE_SLUGS) {
      expect(getServiceBySlug(slug)).toBeTruthy();
    }
  });

  it('has admin dashboard + login and API routes for auth/checkout/contact/track', () => {
    expect(pageExists('app/(admin)/admin/dashboard/page.tsx')).toBe(true);
    expect(pageExists('app/(admin)/admin/login/page.tsx')).toBe(true);
    expect(pageExists('middleware.ts')).toBe(true);
    expect(pageExists('app/api/admin/login/route.ts')).toBe(true);
    expect(pageExists('app/api/checkout/place-order/route.ts')).toBe(true);
    expect(pageExists('app/api/contact/route.ts')).toBe(true);
    expect(pageExists('app/api/orders/track/route.ts')).toBe(true);
    expect(pageExists('app/api/webhooks/stripe/route.ts')).toBe(true);
    expect(pageExists('instrumentation.ts')).toBe(true);
    expect(pageExists('drizzle/0001_init.sql')).toBe(true);
    expect(pageExists('app/sitemap.ts')).toBe(true);
    expect(pageExists('app/robots.ts')).toBe(true);
  });

  it('enables responsive + image optimization basics in next config', () => {
    const config = readFileSync(path.join(root, 'next.config.ts'), 'utf8');
    expect(config).toContain('images');
    expect(config).toContain('compress');
    expect(config).toContain('headers');
  });
});
