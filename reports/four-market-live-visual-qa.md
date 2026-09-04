# Four-market live visual QA — 40 service pages

**Audited:** 2026-09-03  
**Base:** `http://localhost:3000`  
**Scope:** CA / AU / US / UK × 10 services = **40 routes**  
**Mode:** AUDIT ONLY (no regenerations, no copy/SEO/URL/schema/pricing changes, no commit/push/deploy)

## Method

1. Live SSR fetch of all **40** routes (HTTP 200).
2. Registry integrity for **478** visible unique placements (excludes `likes-vs-views`, `real-experience`, `profile-experience`).
3. Disk + live asset HTTP checks; binary duplicate hash scan; path/platform/metric/filename checks.
4. Spot HTML wiring on sample routes (wrong-platform leak, shared-pool leak).
5. Layout/CSS review for responsive frames (hero, story splits, `RasterSectionVisual`).
6. **Limitation:** no Playwright/Puppeteer — per-viewport pixel screenshots (1440/1280/1024/768/390) were **not** captured. Viewport risk assessed via CSS + SSR HTML, not pixel diffs.

## Scores

| Metric | Value |
|--------|------:|
| Pages checked | **40/40** |
| Visible unique placements | **478** |
| Live unique market image mentions (sum) | **478** |
| Expected images missing from HTML | **0** |
| Excluded section image leaks | **0** |
| Exact binary duplicate paths | **0** |
| P0 | **0** |
| P1 | **0** |
| P2 | **2 categories** (see below) |

## Issue classification

### P0 — none
No broken images, wrong platform folders on-page, missing assets, or severe path failures.

### P1 — none
No proven wrong-section wiring, wrong-platform assets, or broken live assets from automated live checks.

### P2 — polish

1. **Alt-text template mismatch (accessibility polish)**  
   - ~**107** alts use a generic “clean … interface / soft audience activity” template.  
   - ~**48** story-section alts say “first impression” even when the section is e.g. `built-for-*`, `visible-momentum`, `clear-niche`.  
   - Platform + metric words are present; **section-specific description is weak**.  
   - **Fix type:** alt-text only (registry JSON) — not image regeneration.

2. **Mild story crop risk on wide-text sections (CSS)**  
   - `CaStoryFeatureImage` defaults to `aspect-[4/3]` + `object-cover` (matches 1536×1152 assets).  
   - Wide-text sections (`local-businesses`, `more-business`, `business-results`, `real-business-content`, `useful-next-step`, `content-people-need`) also pass `aspect-[5/4] min-h-[18rem] lg:min-h-[22rem]` (~**63** placements).  
   - Aspect conflict + min-height can cause **light edge crop**, especially at mid widths.  
   - **Fix type:** CSS-only (prefer `aspect-[4/3]` or `object-contain`) — do not regenerate.

## Checklist answers (requested report)

1. **40/40 pages checked:** YES  
2. **Total image placements checked:** **478** unique visible (+ confirmed present in live HTML)  
3. **P0 count:** **0**  
4. **P1 count:** **0**  
5. **P2 count:** **2 categories** (~107 alt polish items + ~63 CSS crop-risk placements; not 170 separate failures)  
6. **Broken images:** **NONE**  
7. **Wrong-platform images:** **NONE** (live spot + path audit)  
8. **Wrong-section images:** **NONE proven** (all expected filenames present in SSR; concepts generated content-aware; pixel concept QA limited without screenshots)  
9. **Repetitive visuals:** **No exact binary duplicates**; compositions are unique files. Residual style family similarity is expected (NovaLikes cream/clay look), not path reuse.  
10. **Bad crops:** **No severe crops**. Mild risk only on wide-text story frames (P2 CSS). Hero uses `object-contain`. Side `RasterSectionVisual` uses `h-auto w-full` (no forced crop).  
11. **Mobile issues:** **None detected in CSS/HTML review**. Stack grids use `min-w-0`, sticky image column desktop-only. Pixel mobile QA not screenshot-verified.  
12. **Images needing regeneration:** **NONE**  
13. **Images needing CSS adjustment only:** Wide-text story figure aspect (`aspect-[5/4]` / min-height) — optional polish  
14. **Alt-text issues:** **YES (P2)** — template / first-impression mismatches (~48–107)  
15. **Filename issues:** **NONE** (market + service folder + section token match)  
16. **Duplicate image paths:** **NONE** among 478 visible placements  
17. **Overall verdict:** **PASS WITH MINOR POLISH**  
18. **Production copy changed:** **NONE**  
19. **SEO changed:** **NONE**  
20. **NO COMMIT**  
21. **NO PUSH**  
22. **NO DEPLOY**

## Note (out of unique inventory)

Some pages still render **shared** process/best-practice art under non-`markets/` paths (example on UK Instagram Comments: `instagram-comments-best-practices.webp`). These are outside the 478 unique registry set and were not scored as unique-placement failures.

## Machine-readable

`reports/four-market-live-visual-qa.json`
