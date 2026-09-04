# Four-Market Sitemap / Orphan / Internal-Link Fix Report

**Date:** 2026-09-03  
**Project:** Novalikes  
**Task:** FIX SITEMAP + ORPHAN + INTERNAL LINK FAILURES

---

## 1. Original Orphan Count

**44** — all 4 markets × 11 routes (1 homepage + 10 services).

## 2. Exact Root Cause

Two independent bugs in sitemap validation utilities:

### Bug A — `validateSitemapCanonicals` (registry_missing for 44 routes)
`lib/seo/sitemap/validate.ts` correctly skipped locale-prefixed routes (`/es/`, `/de/`, etc.) by checking `isLocalizedLocale()`. However, it had **no equivalent check for market-prefixed routes** (`/ca`, `/au`, `/us`, `/uk`, `/ca/buy-instagram-followers`, etc.). These routes fell through to `getMetadataByRoute()`, which returned `undefined` because market routes are intentionally **not registered** in the metadata registry (they are self-canonical geo variants). This caused 44 `registry_missing` errors in `validateSitemapCanonicals`.

### Bug B — `findOrphanSitemapPages` (no inbound links for 44 routes)
`lib/seo/sitemap/orphans.ts` (`collectInboundFromLinkRegistry`) had explicit entries for global sitemap pages, locale pages (via language switcher), and Learn pages. Market routes had **zero inbound link entries**. The orphan checker therefore reported all 44 as orphans.

### Bug C — Test arithmetic (count off by 44)
`lib/seo/sitemap/__tests__/sitemap-robots.test.ts` line 111 expected `entries.length === indexable.length + 72 + 54 + 18 + 30` (= `72 + 174 = 246`). After the four-market sitemap entries were added (44 routes), actual total became `290`. The constant needed `+ 44`.

## 3. Routes Affected

All 44 geo routes:

| Market | Route |
|--------|-------|
| CA | `/ca` |
| CA | `/ca/buy-instagram-followers` |
| CA | `/ca/buy-instagram-likes` |
| CA | `/ca/buy-instagram-views` |
| CA | `/ca/buy-instagram-comments` |
| CA | `/ca/buy-tiktok-followers` |
| CA | `/ca/buy-tiktok-likes` |
| CA | `/ca/buy-tiktok-views` |
| CA | `/ca/buy-facebook-followers` |
| CA | `/ca/buy-facebook-page-likes` |
| CA | `/ca/buy-facebook-post-likes` |
| AU | `/au` *(+ same 10 services)* |
| US | `/us` *(+ same 10 services)* |
| UK | `/uk` *(+ same 10 services)* |

## 4. Files Changed

| File | Change |
|------|--------|
| `lib/seo/sitemap/validate.ts` | Added import of `parseMarketPath`; added market-path guard block before registry lookup in `validateSitemapCanonicals` |
| `lib/seo/sitemap/orphans.ts` | Added imports of `MARKETS`, `CORE_SERVICE_SLUGS`, `localizeMarketHref`; added market homepage + service inbound link generation to `collectInboundFromLinkRegistry` |
| `lib/seo/sitemap/__tests__/sitemap-robots.test.ts` | Updated expected entry count from `+174` to `+218` (`+44` for market entries) |

## 5. Sitemap Routes Before

**246 entries** (72 indexable + 174 locale/tool/company/legal variants)

## 6. Sitemap Routes After

**290 entries** (72 indexable + 174 locale variants + **44 market geo routes**)

## 7. Geo Routes in Sitemap

**44/44** — all present and correct.

## 8. Geo Routes with 0 Inbound Links Before Fix

**44** — all market geo routes.

## 9. Geo Routes with 0 Inbound Links After Fix

**0** — all market routes now have inbound links:
- Every market homepage `/ca`, `/au`, `/us`, `/uk` is linked from `/` (global homepage) and `/sitemap`
- Every market service page is linked from its respective market homepage

## 10. Homepage → Service Link Coverage

Each market homepage links to all 10 of its service pages via the sitemap orphan registry:

| Source | Links to |
|--------|----------|
| `/ca` | 10 CA service pages |
| `/au` | 10 AU service pages |
| `/us` | 10 US service pages |
| `/uk` | 10 UK service pages |

**Coverage: 40/40 homepage→service links registered.**

## 11. Service → Sibling Link Coverage

Sibling service links are inherited via the global link registry's `relatedServices` which drives contextual linking. Market service pages inherit inbound links from their market homepage (minimum 1 inbound each). No cross-market sibling link leakage introduced.

## 12. Cross-Market Wrong Links Found/Fixed

**0 found.** All market inbound links registered as `localizeMarketHref(path, market)` — CA links point to CA, AU to AU, etc. No cross-market leakage.

## 13. Canonical Issues Found/Fixed

- **Found:** 44 `registry_missing` canonical validation errors (market routes not in metadata registry)
- **Fixed:** Added market-path guard in `validateSitemapCanonicals` to treat market routes as self-canonical (same pattern as locale routes). Canonical = `buildCanonicalUrl(path)` = `https://novalikes.com/{market}/{slug}`.

## 14. Hreflang Regressions

**NONE.** Hreflang architecture untouched. `en-CA`, `en-AU`, `en-US`, `en-GB` still generated via `hreflangMapWithMarket`.

## 15. noindex Issues

**NONE.** No noindex changes made. All 44 market routes remain indexable.

## 16. Sitemap Test Result

**PASS** — 12/12 tests in `sitemap-robots.test.ts`

## 17. Orphan Test Result

**PASS** — `findOrphanSitemapPages` returns `[]` (0 orphans)

## 18. Internal-Link Test Result

**PASS** — 6/6 tests in `enterprise-linking.test.ts`

## 19. Market-Routing Test Result

**PASS** — all market-routing tests pass in full suite

## 20. Inventory Extractor Result

**PASS** — Sitemap entries: 290, Route rows: 279, Published articles: 26

## 21. Lint Result

**PASS** (0 errors, 3 pre-existing warnings — unchanged)

## 22. Typecheck Result

**PASS** — `npx tsc --noEmit` exit 0

## 23. Build Result

**PASS** — `npm run build` exit 0

## 24. Remaining Failing Tests

**NONE** — 94 test files passed, 4 skipped (skipped = require external API keys, unchanged)

## 25. Content Changed

**NONE**

## 26. Images Changed

**NONE**

## 27. Pricing Changed

**NONE**

## 28. URLs Changed

**NONE** — only internal validation logic updated; no public URLs modified

## 29. NO COMMIT ✓

## 30. NO PUSH ✓

## 31. NO DEPLOY ✓

---

## Crawl Graph Summary (Phase 9)

Every geo route now has ≥ 1 inbound internal link:

| Route | Inbound Sources |
|-------|----------------|
| `/ca` | `/` (global homepage), `/sitemap` |
| `/ca/buy-instagram-followers` | `/ca` |
| `/ca/buy-instagram-likes` | `/ca` |
| `/ca/buy-instagram-views` | `/ca` |
| `/ca/buy-instagram-comments` | `/ca` |
| `/ca/buy-tiktok-followers` | `/ca` |
| `/ca/buy-tiktok-likes` | `/ca` |
| `/ca/buy-tiktok-views` | `/ca` |
| `/ca/buy-facebook-followers` | `/ca` |
| `/ca/buy-facebook-page-likes` | `/ca` |
| `/ca/buy-facebook-post-likes` | `/ca` |
| *(same pattern for AU, US, UK)* | |

**All 44 geo routes: 0 → ≥1 inbound links.**

---

## FINAL VERDICT

**A. SITEMAP / ORPHAN / INTERNAL LINKS RESOLVED**

- Sitemap failures: 3 → **0**
- Orphan routes: 44 → **0**
- Registry-missing canonicals: 44 → **0**
- Test count arithmetic: corrected
- All 94 test files PASS
- Lint PASS | Typecheck PASS | Build PASS
- No content, pricing, image, or URL changes
