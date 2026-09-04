# Four-market homepage design + responsive QA

**Date:** 2026-09-03  
**Scope:** `/ca/` · `/au/` · `/us/` · `/uk/` only  
**Constraint:** CSS / layout only — no content, SEO, metadata, schema, URL, package, or image regeneration changes.

## Section inventory (preserved)

| Market | Shared shell | Story sections | Notes |
|--------|--------------|----------------|-------|
| CA | hero → platform → services → IG service minis → stories → why → how → guarantees → beforeYouBuy → faq → crossPlatform → finalCta | **12/12** | `instagramOnly`, `hideReviews` |
| AU | same | **12/12** | 6 how-it-works steps; 7 why points |
| US | same | **12/12** | story order differs slightly vs CA/AU |
| UK | same | **15/15** | +`wider-marketing`, `business-outcomes`, `agency-reporting` |

**Missing/removed content found:** NONE (live SSR confirmed all required section IDs + every story `id`).

## Verdict: READY WITH MINOR POLISH

---

### 1. Homepages checked
**4/4** live SSR (`http://localhost:3010/{market}`) — all HTTP 200.

### 2. Viewports checked
| Viewport | Method |
|----------|--------|
| 1440 / 1280 | Live HTML + shared desktop layout CSS |
| 1024 / 768 / 390 | Responsive CSS audit + targeted breakpoint fixes on shared homepage components |

No Playwright in repo — pixel screenshots not captured. Structural live audit + component CSS review.

### 3. P0 found / fixed
**Found:** 0  
**Fixed:** N/A

### 4. P1 found / fixed

| Issue | Fix |
|-------|-----|
| Long CA H1 risking 3–4 desktop lines | Homepage hero: calmer clamp + `max-w-[…ch]` + slightly wider text column — **no copy change** |
| Hero using full body section padding (`lg:py-20`) → tall hero / excess space | Hero → `py-10 md:py-12 lg:py-14` |
| Trust chips `divide-x` awkward when wrapping on mobile | Gap wrap on mobile; divide only from `sm` |
| Service mini images `scale-[1.14]` crop | Removed scale; keep `object-cover object-center` |
| IG service cards `lg:grid-cols-4` cramped at 1024 | `lg:grid-cols-2 xl:grid-cols-4` |
| Feature trust strip same | `xl:grid-cols-4` (2-up until xl) |
| How-it-works 6 steps forced into 4-col + decorative strip only showed 4 icons | Adaptive grid (`lg:grid-cols-3` for 6); hide 4-dot flow when steps > 4 |
| Why NovaLikes 7 cards in 2-col only | `lg:grid-cols-3` when points > 4 |
| Service mini blocks using full `lg:py-20` × many sections → excessive whitespace | Related spacing `py-10 md:py-12 lg:py-14` |

### 5. P2 remaining
- Optional Playwright visual regression across 5×4 viewports
- Regional copy length still varies section height (intentional)
- Unused `ClipboardList` import warning in `homepage-story-sections.tsx` (pre-existing / trivial)

### 6. Files changed
- `components/marketing/homepage-hero.tsx`
- `components/marketing/homepage-hub-sections.tsx`
- `components/marketing/homepage-services-overview.tsx`
- `components/marketing/homepage-story-sections.tsx`
- `scripts/audit-homepage-design-qa.js`
- `reports/four-market-homepage-design-responsive-qa.json`
- `reports/four-market-homepage-design-responsive-qa.md`

### 7. Hero fixes
Tighter vertical padding; H1 clamp + ch-based max-width; column balance; mobile trust-chip wrap.

### 8. Section-spacing fixes
Hero + service mini related padding reduced; body sections keep `lg:py-20` geo rhythm.

### 9. Card / grid fixes
IG 4-up deferred to `xl`; how-it-works adaptive; why 3-up on large; feature strip deferred to `xl`.

### 10. Image / crop fixes
Removed service-mini `scale-[1.14]`. Hero visual still `object-contain`. **Images regenerated: NONE.**

### 11. Text / image split fixes
Hero grid `1.12fr / 0.95fr`. Story splits reuse prior geo story CSS (4:3, ~55/45 / wide ~57/43).

### 12. Mobile fixes
Trust chips wrap without divide-x collision; stacks remain column-first below `lg`.

### 13. Horizontal overflow count
**0** extreme-width utility signals across 4 live pages.

### 14. Missing / removed content
**NONE** — CA/AU/US 12 stories, UK 15 stories all present.

### 15. Cross-market consistency
**PASS** — shared enhanced homepage system (`isCanadaHomepageDesign` → all four markets). Same max-width containers, card language, CTA style, FAQ `max-w-3xl`. UK longer story list preserved.

### 16–21. Guardrails
| Item | Status |
|------|--------|
| 16. Content changed | **NONE** |
| 17. Images regenerated | **NONE** |
| 18. SEO changed | **NONE** |
| 19. Metadata changed | **NONE** |
| 20. URL changed | **NONE** |
| 21. Schema changed | **NONE** |

### 22. Lint
**PASS** (exit 0) — pre-existing unused-var warnings only.

### 23. Tests
**Pre-existing failures** (sitemap orphans ×44 / entry count 290 vs 246; linking orphan check). Not caused by homepage CSS. Homepage design changes do not touch sitemap/linking logic.

### 24. Typecheck (`npx tsc --noEmit`)
**FAIL — pre-existing** (`lib/market/content/load.ts` + scripts).  
Homepage files: **no remaining errors** after fixing steps-length narrowing.

### 25. Build (`npm run build`)
**FAIL — pre-existing** — same `load.ts:105` readonly assign. Compile succeeded; typecheck step failed.

### 26. Overall verdict
**READY WITH MINOR POLISH**

### 27–29
**NO COMMIT · NO PUSH · NO DEPLOY**
