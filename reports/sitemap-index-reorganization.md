# Sitemap index reorganization

**Date:** 2026-09-03  
**Project:** `C:\Users\HUSSNAIN.COM\Novalikes`  
**Scope:** Technical sitemap organization only (no URL / canonical / hreflang / metadata / content changes)

## Final verdict

**A. SITEMAP INDEX CLEANLY ORGANIZED**

---

## 1. Previous sitemap architecture

- Single flat Next.js sitemap via `app/sitemap.ts` (`MetadataRoute.Sitemap`)
- One large `/sitemap.xml` urlset containing the full indexable inventory (~290 URLs)
- Inventory built from `getIndexableRoutes()` / `buildSitemapEntries()` (allowlist + Learn + locale/market expansions)

## 2. New sitemap architecture

| URL | Role |
|-----|------|
| `/sitemap.xml` | Sitemap **index** (`app/sitemap.xml/route.ts`) |
| `/sitemaps/core.xml` | Global/static pages |
| `/sitemaps/services.xml` | Default English service pages |
| `/sitemaps/markets.xml` | CA / AU / US / UK |
| `/sitemaps/locales.xml` | es / de / fr / it / pt-br / ar |
| `/sitemaps/tools.xml` | Tool hub + tools |
| `/sitemaps/learn.xml` | Learn articles |
| `/sitemaps/taxonomy.xml` | Learn hub, categories, tags, authors, `/sitemap` |

**Classification layer:** `lib/seo/sitemap/groups.ts` (`classifySitemapPath` / `partitionSitemapEntries` / `buildSitemapGroups`)

**Source of truth unchanged:** `buildSitemapEntries()` / `getProductionSitemapEntries()` — no duplicated URL lists.

**XML:** `lib/seo/sitemap/serialize.ts` preserves `lastmod` and `xhtml:link` hreflang alternates.

## 3. Current total indexable URLs

**290** (`buildSitemapEntries().length`)

## 4–10. Child counts

| Child | Count |
|-------|------:|
| 4. `core.xml` | **10** |
| 5. `services.xml` | **10** |
| 6. `markets.xml` | **44** |
| 7. `locales.xml` | **174** |
| 8. `tools.xml` | **9** |
| 9. `learn.xml` | **26** |
| 10. `taxonomy.xml` | **17** |

### Core paths

`/`, `/about`, `/contact`, `/faq`, `/reviews`, `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`, `/cookie-policy`, `/disclaimer`

### Services paths

`/buy-instagram-followers`, `/buy-instagram-likes`, `/buy-instagram-views`, `/buy-instagram-comments`, `/buy-tiktok-followers`, `/buy-tiktok-likes`, `/buy-tiktok-views`, `/buy-facebook-followers`, `/buy-facebook-page-likes`, `/buy-facebook-post-likes`

### Tools paths

`/tools` + 8 tool pages (downloaders / viewers / follower counter)

### Taxonomy paths

`/learn`, `/sitemap`, category hubs, `/authors`, author page(s), tag pages

## 11. Sum of child URLs

**290** = 10 + 10 + 44 + 174 + 9 + 26 + 17

## 12. Missing URLs

**0** (`assertSitemapPartitionComplete().missing`)

## 13. Duplicate URLs across children

**0**

## 14. Market URLs = 44/44

**Yes** — exactly 4 markets × (1 home + 10 services); markets appear only in `markets.xml`

## 15. Localized URL issues

**0** — all locale rows under `/es|/de|/fr|/it|/pt-br|/ar` only; no markets mixed in

## 16. Accidental `/en/` URLs

**0**

## 17. Hreflang preservation

**Preserved** — child urlsets that carry alternates still emit `xmlns:xhtml` + `<xhtml:link rel="alternate" …>`; inventory rows with `alternates.languages` remain intact after partition (verified in tests + live `markets.xml` / `locales.xml` / `services.xml`)

## 18. Canonical validation

**Pass** — `validateSitemapCanonicals(entries)` → **0** errors

## 19. Orphan count

**0** — `findOrphanSitemapPages(entries)`

## 20. Robots sitemap target

```
Sitemap: https://novalikes.com/sitemap.xml
```

Only the main index is referenced (no child sitemap listing in robots).

## 21. XML validation

- Index: valid `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` with 7 unique `<sitemap>` entries
- Children: valid `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` (+ xhtml when needed)

## 22. HTTP status for each sitemap

(Verified against local Next server before clean rebuild)

| Path | Status | Content-Type | URL count |
|------|--------|--------------|----------:|
| `/sitemap.xml` | 200 | `application/xml; charset=utf-8` | index (7 children) |
| `/sitemaps/core.xml` | 200 | `application/xml; charset=utf-8` | 10 |
| `/sitemaps/services.xml` | 200 | `application/xml; charset=utf-8` | 10 |
| `/sitemaps/markets.xml` | 200 | `application/xml; charset=utf-8` | 44 |
| `/sitemaps/locales.xml` | 200 | `application/xml; charset=utf-8` | 174 |
| `/sitemaps/tools.xml` | 200 | `application/xml; charset=utf-8` | 9 |
| `/sitemaps/learn.xml` | 200 | `application/xml; charset=utf-8` | 26 |
| `/sitemaps/taxonomy.xml` | 200 | `application/xml; charset=utf-8` | 17 |

No 404 sitemap URLs.

## 23. Files changed (sitemap reorganization)

### Added
- `app/sitemap.xml/route.ts`
- `app/sitemaps/[group]/route.ts`
- `lib/seo/sitemap/groups.ts`
- `lib/seo/sitemap/serialize.ts`
- `lib/seo/sitemap/production-entries.ts`
- `lib/seo/sitemap/__tests__/sitemap-index.test.ts`
- `reports/sitemap-index-reorganization.md`

### Modified / removed
- `app/sitemap.ts` — **deleted** (replaced by index route)
- `lib/seo/sitemap/index.ts` — re-exports groups/serialize/production helpers
- `lib/seo/sitemap/build.ts` — inventory pipeline retained / used by groups
- `lib/seo/sitemap/validate.ts`, `orphans.ts` — supporting validators
- `lib/seo/sitemap/__tests__/sitemap-robots.test.ts` — count/architecture assertions
- `lib/__tests__/launch-checklist.test.ts` — route presence for index + children
- `lib/cms/revalidate-learn.ts` — revalidate child learn/taxonomy sitemaps
- `data/seo/sitemap-routes.ts` — allowlist touch only as needed by inventory

## 24. Lint

**Pass** (`npm run lint`) — exit 0; existing unused-var warnings only (pre-existing, unrelated)

## 25. Typecheck

**Pass** (`npx tsc --noEmit`) — exit 0

## 26. Tests

**Pass** (`npm test`)

- Test Files: **95 passed** | 4 skipped
- Tests: **590 passed** | 36 skipped
- Includes `sitemap-index.test.ts` (10) + `sitemap-robots.test.ts` (12)

## 27. Build

**Pass** (`npm run build`) — exit 0

- Clean rebuild after stopping conflicting `next` processes and clearing `.next`
- Emits static `/sitemap.xml` and SSG `/sitemaps/{core,services,markets,locales,tools,learn,taxonomy}.xml`

## 28. Inventory extractor

**Pass** (`npx tsx scripts/extract-website-inventory.ts`)

- Sitemap entries: **290**
- Published articles: **26**
- Wrote `docs/site-content-stats.json` and related inventory docs

## 29. Content changed

**NONE** (this task)

## 30. Metadata changed

**NONE** (this task)

## 31. URLs changed

**NONE** — same indexable inventory, reorganized into child sitemaps only

## 32. NO COMMIT

Confirmed — no git commit created for this task

## 33. NO PUSH

Confirmed

## 34. NO DEPLOY

Confirmed

---

## Validation checklist (from brief)

| # | Check | Result |
|---|-------|--------|
| 1 | `/sitemap.xml` = sitemap index | Pass |
| 2 | Child sitemaps return 200 | Pass |
| 3 | Correct XML Content-Type | Pass |
| 4 | Valid XML | Pass |
| 5 | No duplicate index entries | Pass (7 unique) |
| 6 | No duplicate URLs across children | Pass |
| 7 | No missing indexable URLs | Pass |
| 8 | No non-indexable URLs | Pass (existing inventory filters) |
| 9 | No accidental `/en/` | Pass |
| 10 | 44/44 market URLs in markets.xml | Pass |
| 11 | Localized URLs in locales.xml | Pass |
| 12 | Tools only in tools.xml | Pass |
| 13 | Learn articles only in learn.xml | Pass |
| 14 | Canonical validation | Pass |
| 15 | Orphans = 0 | Pass |
| 16 | Hreflang unchanged | Pass |
| 17 | Robots → main index only | Pass |
| 18 | No 404 sitemap URLs | Pass |
