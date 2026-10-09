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
    expect(csp?.value).toContain('https://js.mollie.com');
    expect(csp?.value).not.toContain('report-uri');
    expect(csp?.value).not.toContain('report-to');
    expect(global?.headers.some((h) => h.key === 'Content-Security-Policy')).toBe(false);
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

  it('code-splits service page views by platform authority layouts', () => {
    const view = readFileSync(
      join(process.cwd(), 'components/sections/ServicePageView.tsx'),
      'utf8',
    );
    expect(view).toContain("instagram-followers-authority-view");
    expect(view).toContain("mirrored-service-authority-view");
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

  it('Organization sameAs includes only verified official social profiles', () => {
    expect(site.socialLinks.instagram).toBe('https://www.instagram.com/novalikesco/');
    expect(site.socialLinks.facebook).toBe('https://www.facebook.com/novalikes/');
    expect(site.socialLinks.linkedin).toBe('https://www.linkedin.com/company/nova-likes/');
    expect(site.socialLinks.tiktok).toBe('https://www.tiktok.com/@novalikes2');
    expect(site.socialLinks.youtube).toBe('');

    const org = organizationSchema();
    expect(org['@type']).toBe('Organization');
    expect(org['@id']).toBe('https://novalikes.com/#organization');
    // Official NovaLikes profiles confirmed by the site owner (Oct 2026).
    expect(org.sameAs).toEqual([
      'https://www.instagram.com/novalikesco/',
      'https://www.facebook.com/novalikes/',
      'https://www.linkedin.com/company/nova-likes/',
      'https://www.tiktok.com/@novalikes2',
      'https://x.com/novalikes21',
      'https://ca.pinterest.com/novalikes01/',
      'https://www.threads.com/@novalikes01',
      'https://www.crunchbase.com/organization/nova-likes',
      'https://www.producthunt.com/@novalikes',
      'https://medium.com/@novalikes01',
      'https://substack.com/@novalikes',
      'https://www.reddit.com/user/novalikes12/',
      'https://www.quora.com/profile/Novalikes',
      'https://www.tumblr.com/novalikess',
    ]);
    for (const url of org.sameAs as string[]) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toBe('#');
    }
    expect(JSON.stringify(org)).not.toContain('"#"');
    expect(JSON.stringify(org)).not.toContain('aggregaterating');
  });
});
