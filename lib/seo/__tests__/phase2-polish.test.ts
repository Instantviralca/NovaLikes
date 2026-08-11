/**
 * Phase 2 technical SEO helpers — CSP Report-Only, icons, OG fallback.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import nextConfig from '@/next.config';
import { organizationSchema } from '@/schemas/organization';
import { site } from '@/config/site';

describe('Phase 2 technical SEO polish', () => {
  it('configures Content-Security-Policy-Report-Only without report-uri invention', async () => {
    const headers = await nextConfig.headers?.();
    expect(headers).toBeDefined();
    const global = headers!.find((entry) => entry.source === '/(.*)');
    const csp = global?.headers.find(
      (header) => header.key === 'Content-Security-Policy-Report-Only',
    );
    expect(csp?.value).toContain("default-src 'self'");
    expect(csp?.value).toContain('https://js.stripe.com');
    expect(csp?.value).not.toContain('report-uri');
    expect(csp?.value).not.toContain('report-to');
  });

  it('declares square PWA and favicon assets in the web app manifest', async () => {
    const { default: manifest } = await import('@/app/manifest');
    const data = typeof manifest === 'function' ? manifest() : manifest;
    const icons = data.icons ?? [];
    const srcs = icons.map((icon) => icon.src);
    expect(srcs).toEqual(
      expect.arrayContaining([
        '/icons/icon-192.png',
        '/icons/icon-512.png',
        '/icons/icon-512-maskable.png',
      ]),
    );
  });

  it('code-splits service illustrations via per-platform next/dynamic loaders', () => {
    const load = readFileSync(
      join(process.cwd(), 'components/sections/service-page-dynamic/load.ts'),
      'utf8',
    );
    const facebook = readFileSync(
      join(process.cwd(), 'components/sections/service-page-dynamic/facebook.ts'),
      'utf8',
    );
    const view = readFileSync(
      join(process.cwd(), 'components/sections/ServicePageView.tsx'),
      'utf8',
    );
    expect(load).toContain("import('@/components/sections/service-page-dynamic/facebook')");
    expect(load).toContain("import('@/components/sections/service-page-dynamic/tiktok')");
    expect(facebook).toContain("import dynamic from 'next/dynamic'");
    expect(view).toContain('loadServicePageVisuals');
    expect(view.includes("from '@/components/sections/service-page-dynamic'")).toBe(
      false,
    );
  });

  it('keeps the branded Open Graph fallback at 1200x630', () => {
    const png = readFileSync(join(process.cwd(), 'public/og-default.png'));
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    expect(width).toBe(1200);
    expect(height).toBe(630);
  });

  it('Organization sameAs includes only verified Instagram and Facebook profiles', () => {
    expect(site.socialLinks.instagram).toBe('https://www.instagram.com/novalikes');
    expect(site.socialLinks.facebook).toBe('https://www.facebook.com/Novalikescanada');
    expect(site.socialLinks.tiktok).toBe('');
    expect(site.socialLinks.youtube).toBe('');

    const org = organizationSchema();
    expect(org['@type']).toBe('Organization');
    expect(org.sameAs).toEqual([
      'https://www.instagram.com/novalikes',
      'https://www.facebook.com/Novalikescanada',
    ]);
    for (const url of org.sameAs as string[]) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toBe('#');
    }
    expect(JSON.stringify(org)).not.toContain('"#"');
  });
});
