import { describe, expect, it } from 'vitest';

import { mainNavigation } from '@/data/navigation';
import { getFooterColumns } from '@/data/footer';
import { TOOL_PAGE_COPY, TOOLS_HUB_COPY } from '@/data/tools/copy';
import { TOOLS } from '@/data/tools/registry';
import { getHubServiceLinks, getRelatedServicesForTool } from '@/data/tools/related-services';
import { ROBOTS_DISALLOW } from '@/lib/seo/sitemap/robots';

describe('tools phase 5 launch polish', () => {
  it('gives the hub a broader H1 than any individual tool page', () => {
    const toolH1s = Object.values(TOOL_PAGE_COPY).map((copy) => copy.h1);
    expect(TOOLS_HUB_COPY.h1).toMatch(/instagram/i);
    expect(TOOLS_HUB_COPY.h1).toMatch(/tiktok/i);
    expect(TOOLS_HUB_COPY.h1).toMatch(/facebook/i);
    expect(toolH1s).not.toContain(TOOLS_HUB_COPY.h1);
    expect(TOOLS_HUB_COPY.h1.toLowerCase()).not.toContain('video downloader');
  });

  it('keeps helper text and avoids overselling claims', () => {
    const blob = JSON.stringify({ hub: TOOLS_HUB_COPY, pages: TOOL_PAGE_COPY, tools: TOOLS }).toLowerCase();
    expect(blob).not.toContain('guaranteed');
    expect(blob).not.toContain('unlimited');
    expect(blob).not.toContain('100%');
    expect(blob).not.toContain('all reels');
    expect(blob).not.toContain('private download');
    expect(blob).not.toMatch(/\$\d/);
    for (const copy of Object.values(TOOL_PAGE_COPY)) {
      expect(copy.helperText.length).toBeGreaterThan(12);
      expect(copy.howToUse).toHaveLength(3);
      expect(copy.faqs.length).toBeGreaterThanOrEqual(3);
      expect(copy.faqs.length).toBeLessThanOrEqual(5);
      expect(copy.intro.length).toBeGreaterThan(0);
      expect(copy.how.length).toBeGreaterThan(0);
      expect(copy.inputLabel.length).toBeGreaterThan(8);
    }
  });

  it('links only existing approved service routes after the tools', () => {
    for (const tool of TOOLS) {
      const services = getRelatedServicesForTool(tool.slug);
      expect(services.length).toBeGreaterThan(0);
      for (const service of services) {
        expect(service.url).toMatch(/^\/buy-/);
        expect(service.platform).toBe(tool.platform);
      }
    }
    expect(getHubServiceLinks().map((service) => service.url)).toEqual([
      '/buy-instagram-followers',
      '/buy-tiktok-followers',
      '/buy-facebook-followers',
    ]);
  });

  it('keeps main nav and footer on /tools rather than every tool URL', () => {
    expect(mainNavigation.find((item) => item.id === 'nav-tools')).toMatchObject({
      href: '/tools',
      label: 'Tools',
    });
    const footer = getFooterColumns()
      .flatMap((column) => column.links)
      .map((link) => link.href);
    expect(footer).toContain('/tools');
    expect(footer.some((href) => href.startsWith('/tools/'))).toBe(false);
  });

  it('keeps API routes out of robots indexing', () => {
    expect(ROBOTS_DISALLOW).toContain('/api/');
  });
});
