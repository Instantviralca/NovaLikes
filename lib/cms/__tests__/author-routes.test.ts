import { describe, expect, it } from 'vitest';

import {
  isAuthorCmsLoginPath,
  isAuthorCmsPath,
  safeAuthorNextPath,
} from '@/lib/cms/author-routes';
import { getAuthorSitemapRoutes } from '@/lib/seo/sitemap/routes';
import {
  getPublicDirectoryHrefs,
  getPublicDirectorySections,
} from '@/data/seo/public-directory';
import { CORE_SERVICE_SLUGS } from '@/lib/i18n/config';
import { MARKETS } from '@/lib/market/config';
import { localizeMarketHref } from '@/lib/market/paths';
import { AUTHORS } from '@/data/authors';

describe('author CMS vs public /authors boundary', () => {
  it('treats /author and /author/* as protected CMS paths', () => {
    expect(isAuthorCmsPath('/author')).toBe(true);
    expect(isAuthorCmsPath('/author/')).toBe(true);
    expect(isAuthorCmsPath('/author/login')).toBe(true);
    expect(isAuthorCmsPath('/author/articles')).toBe(true);
    expect(isAuthorCmsPath('/author/articles/new')).toBe(true);
  });

  it('does not treat public /authors profiles as CMS paths', () => {
    expect(isAuthorCmsPath('/authors')).toBe(false);
    expect(isAuthorCmsPath('/authors/')).toBe(false);
    expect(isAuthorCmsPath('/authors/najaf-khan')).toBe(false);
    expect(isAuthorCmsPath('/authors/any-slug')).toBe(false);
  });

  it('identifies CMS login paths only under /author/login', () => {
    expect(isAuthorCmsLoginPath('/author/login')).toBe(true);
    expect(isAuthorCmsLoginPath('/author/login/')).toBe(true);
    expect(isAuthorCmsLoginPath('/author')).toBe(false);
    expect(isAuthorCmsLoginPath('/authors')).toBe(false);
    expect(isAuthorCmsLoginPath('/authors/najaf-khan')).toBe(false);
  });

  it('rejects public /authors paths as post-login next destinations', () => {
    expect(safeAuthorNextPath('/authors')).toBe('/author');
    expect(safeAuthorNextPath('/authors/najaf-khan')).toBe('/author');
    expect(safeAuthorNextPath('/author/articles')).toBe('/author/articles');
    expect(safeAuthorNextPath('/author')).toBe('/author');
    expect(safeAuthorNextPath('https://evil.example/author')).toBe('/author');
    expect(safeAuthorNextPath('//evil.example')).toBe('/author');
    expect(safeAuthorNextPath(undefined)).toBe('/author');
  });

  it('keeps public author profiles in the taxonomy sitemap inventory', () => {
    const routes = getAuthorSitemapRoutes().map((route) => route.route);
    expect(routes).toContain('/authors');
    expect(routes).toContain('/authors/najaf-khan');
    for (const author of AUTHORS.filter((item) => item.active)) {
      expect(isAuthorCmsPath(`/authors/${author.slug}`)).toBe(false);
    }
  });
});

describe('market homepage crawlable discovery', () => {
  it('exposes exactly the four market homes from the HTML sitemap directory', () => {
    const sections = getPublicDirectorySections();
    const markets = sections.find((section) => section.id === 'markets');
    expect(markets).toBeTruthy();
    expect(markets?.links.map((link) => link.href)).toEqual(['/ca', '/au', '/us', '/uk']);
    const hrefs = getPublicDirectoryHrefs();
    for (const market of MARKETS) {
      expect(hrefs).toContain(`/${market}`);
    }
  });

  it('keeps market homepage → market service internal paths intact', () => {
    for (const market of MARKETS) {
      expect(localizeMarketHref('/', market)).toBe(`/${market}/`);
      for (const slug of CORE_SERVICE_SLUGS) {
        expect(localizeMarketHref(`/${slug}`, market)).toBe(`/${market}/${slug}`);
      }
      expect(CORE_SERVICE_SLUGS).toHaveLength(10);
    }
  });
});
