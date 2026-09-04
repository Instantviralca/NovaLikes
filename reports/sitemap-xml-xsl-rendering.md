# Sitemap XML rendering + XSL

**Date:** 2026-09-03  
**Project:** `C:\Users\HUSSNAIN.COM\Novalikes`

## 1. Root cause of ugly/raw browser rendering

Child sitemaps were already valid XML with `application/xml; charset=utf-8`. There was **no `xml-stylesheet` PI**. Modern Chrome no longer shows a collapsible XML tree; without XSL it paints **element text nodes as a concatenated stream** (`https://novalikes.com` + dates + `weekly` + `1.0` …).

## 2. Content-Type before

`application/xml; charset=utf-8` (already correct). Missing stylesheet was the presentation bug.

## 3. Content-Type after

- Sitemap XML: `application/xml; charset=utf-8`
- `/sitemap.xsl`: `text/xsl; charset=utf-8`

## 4. XSL created

- Route: `app/sitemap.xsl/route.ts` → `GET /sitemap.xsl`
- Source: `lib/seo/sitemap/xsl-stylesheet.ts` (one stylesheet for **sitemapindex** and **urlset**, namespaced `s:` / `xhtml:`)
- Each XML document starts with:

```
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
```

## 5–12. Styled endpoints (HTTP 200 + XSL PI + valid XML)

| Endpoint | Styled (index/urlset tables via XSL) |
|----------|--------------------------------------|
| `/sitemap.xml` | Yes — “NovaLikes XML Sitemap Index”, 7 child rows |
| `/sitemaps/core.xml` | Yes — 10 URL rows |
| `/sitemaps/services.xml` | Yes |
| `/sitemaps/markets.xml` | Yes — 44 rows + Alternates: N |
| `/sitemaps/locales.xml` | Yes |
| `/sitemaps/tools.xml` | Yes |
| `/sitemaps/learn.xml` | Yes |
| `/sitemaps/taxonomy.xml` | Yes |

## 13. Sitemap URL counts unchanged

**290** union (10+10+44+174+9+26+17)

## 14. Hreflang unchanged

`xmlns:xhtml` + `<xhtml:link>` still in XML; UI shows **Alternates: N** only

## 15. Duplicate URLs

**0**

## 16. Orphans

**0**

## 17. XML validation

Pass — declaration first byte, sitemapindex/urlset namespaces, escaped locs, no `/en/`

## 18. Browser visual result

XSL transform produces HTML tables (header, zebra rows, orange accent `#e85d04`, max-width 1200px). Live preview: [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)

## 19. Lint

Pass (`npm run lint`, exit 0)

## 20. Typecheck

Pass (`npx tsc --noEmit`, exit 0)

## 21. Tests

Pass — **594 passed** | 36 skipped (includes `sitemap-xsl.test.ts`)

## 22. Build

Pass (`npm run build`, exit 0) — emits `/sitemap.xml`, `/sitemap.xsl`, `/sitemaps/[group]`

## 23. Content changed: NONE

## 24. SEO URLs changed: NONE

## 25. NO COMMIT

## 26. NO PUSH

## 27. NO DEPLOY
