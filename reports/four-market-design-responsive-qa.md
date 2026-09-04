# Four-market design + responsive QA — final report

**Date:** 2026-09-03  
**Scope:** 40 geo service pages (CA / AU / US / UK × 10 services)  
**Constraint:** CSS/layout only — no content, SEO, metadata, schema, URL, package, or image regeneration changes.

## Verdict: READY WITH MINOR POLISH

---

### 1. Pages checked
**40/40** live SSR (`http://localhost:3001/{market}/{slug}`) — all HTTP 200; packages + FAQ + how-to sections present.

### 2. Viewports checked
| Viewport | Coverage |
|----------|----------|
| 1440 / 1280 (desktop) | All 40 via live HTML + shared desktop layout CSS |
| 1024 / 768 / 390 | All 10 unique service types via responsive CSS audit + targeted grid/spacing fixes applied to shared components |

No Playwright/Puppeteer in repo — pixel screenshots were not taken. Validation = live SSR structural audit + component CSS review + sample-page class verification.

### 3. P0 found / fixed
**Found:** 0 on healthy server (port 3001).  
*(Stale process on :3000 returned many 500s — environment noise, not a page defect.)*

**Fixed:** N/A

### 4. P1 found / fixed
| Issue | Fix |
|-------|-----|
| How-to-buy forced one desktop row for 6–7 steps (cramped) | Wrap at 6 (`lg:grid-cols-3`) / 7 (`lg:grid-cols-3 xl:grid-cols-4`); ≤5 stay single-row |
| Wide-text story `aspect-[5/4]` + large `min-h` vs 4:3 assets (crop) | Drop override; keep `aspect-[4/3]` |
| Story image forced `min-h` could force crop | Removed default min-heights |
| Desktop section padding at floor (72px) | Bumped geo authority / homepage / FAQ / related to `lg:py-20` (80px) |
| Package option tiers `lg:grid-cols-5` cramped at 1024 | `lg:grid-cols-3 xl:grid-cols-5` |
| Story item grids with 5 cols same issue | `lg:grid-cols-3 xl:grid-cols-5` |
| Wide-text split ~62/38 starved image | Rebalanced to ~57/43 (`1.35fr / 1fr`) |
| Heading→lead spacing tight (`mt-3`) | `mt-4` (16px) |
| Shared `HowItWorks` 6+ steps | Same wrap pattern |

### 5. P2 found (not blocking)
- Prior image-QA alt template polish (~107 generic / some mismatched story alts) — content/alt only; out of scope for layout pass
- No automated pixel screenshot diff across 5×40 viewports
- Regional copy length still varies section height by design (intentional)

### 6. Files changed
- `components/marketing/instagram-followers/authority-sections.tsx`
- `components/marketing/market-story-sections.tsx`
- `components/illustrations/homepage/ca-homepage-visuals.tsx`
- `components/marketing/packages/package-option-tiers.tsx`
- `components/sections/service/faq.tsx`
- `components/sections/service/related-services.tsx`
- `components/marketing/how-it-works.tsx`
- `lib/market/homepage-design.ts`
- `scripts/audit-design-responsive-qa.js` (audit helper)
- `reports/four-market-design-responsive-qa.json` (audit output)

### 7. Spacing fixes
- Section vertical padding: `lg:py-[4.5rem]` → `lg:py-20` on geo service rhythm tokens + FAQ/related
- Story heading→lead: `mt-3` → `mt-4`
- How-to-buy desktop gap: `lg:gap-5`

### 8. Responsive fixes
- How-to-buy multi-step wrap at lg/xl
- Package compare + story 5-up grids defer 5 columns to `xl`
- HowItWorks grid wrap for 6–7 steps

### 9. Image crop / alignment fixes
- Removed wide-text `aspect-[5/4]` / oversized min-heights
- Kept `object-cover object-center` at true 4:3 frame
- Hero raster path unchanged (`object-contain`)
- **Images regenerated: NONE**

### 10. Card / grid fixes
- How-to-buy, package option tiers, story 5-col item grids, HowItWorks

### 11. Mobile overflow issues
- **None found** in SSR structural scan (no extreme width utilities / broken img src)
- Shared stacks already column-first below `lg`

### 12. Remaining visual issues
- P2 alt polish only
- Optional future: Playwright visual regression for exact 390/768/1024 pixel confirmation

### 13–18. Guardrails
| Item | Status |
|------|--------|
| 13. Content changed | **NONE** |
| 14. Images regenerated | **NONE** |
| 15. SEO changed | **NONE** |
| 16. Metadata changed | **NONE** |
| 17. URLs changed | **NONE** |
| 18. Schema changed | **NONE** |

### 19. Lint
**PASS** (exit 0) — pre-existing unused-var warnings only; none introduced as errors.

### 20. Test
**Pre-existing failures only** (not caused by this CSS pass):
- `sitemap-robots.test.ts` (3) — orphan/canonical/count allowlist mismatch (44 orphans; 290 vs 246)
- `enterprise-linking.test.ts` (1) — same orphan count
- `client-close.test.ts` (1) — DB timeout

**568 passed** / 5 failed / 36 skipped.

### 21. Typecheck (`npx tsc --noEmit`)
**FAIL — pre-existing** (scripts + `lib/market/content/load.ts` readonly assigns, etc.). **No errors in files touched by this task.**

### 22. Build (`npm run build`)
**FAIL — pre-existing** — same `lib/market/content/load.ts:105` readonly `why` assignment. Compile step succeeded; typecheck step failed. **Not introduced by design QA CSS.**

### 23. Overall verdict
**READY WITH MINOR POLISH**

### 24–26
**NO COMMIT · NO PUSH · NO DEPLOY**
