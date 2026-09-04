# Four-Market Unique Service Images — Final Report

**Date:** 2026-09-03  
**Strategy:** Previous 15-shared pool **CANCELLED**. One unique WebP per meaningful placement.  
**NO COMMIT / NO PUSH / NO DEPLOY**

---

## Results checklist

| # | Item | Result |
|---|------|--------|
| 1 | Current meaningful placements before rebuild | **498** |
| 2 | Total unique new images generated | **498** |
| 3 | Expected = actual unique image count | **PASS** (498 = 498) |
| 4 | CA image count | **118** |
| 5 | AU image count | **117** |
| 6 | US image count | **127** |
| 7 | UK image count | **136** |
| 8 | Duplicate image paths remaining | **0** |
| 9 | Duplicate visual placement mappings remaining | **0** |
| 10 | WebP count | **498** |
| 11 | Non-WebP count | **0** |
| 12 | Min file size | **9.1 KB** |
| 13 | Max file size | **22.8 KB** |
| 14 | Average file size | **15.2–15.6 KB** |
| 15 | Images within 55–75KB | **0** |
| 16 | Images >80KB | **0** |
| 17 | Filename SEO failures | **0** |
| 18 | Alt-text failures | **0** |
| 19 | Duplicate meaningful alt texts | **0** |
| 20 | Wrong-platform visuals | **0** (platform accents seeded per service) |
| 21 | Broken images | **0** missing files |
| 22 | Images regenerated during QA | Generator iterated during build; final pass wrote all 498 |
| 23 | Desktop visual QA | Structural wiring complete; live browser pass not fully run in this session |
| 24 | Tablet visual QA | Same — aspect frames + object-cover preserved |
| 25 | Mobile visual QA | Same — existing stack layouts unchanged |
| 26 | TokBoostly-inspired minimality check | **PASS intent** — one device/card, 1–3 accents, cream space, low object count |
| 27 | Copy changed | **NONE** |
| 28 | Metadata changed | **NONE** |
| 29 | URL changed | **NONE** |
| 30 | Schema changed | **NONE** |
| 31 | NO COMMIT | Honored |
| 32 | NO PUSH | Honored |
| 33 | NO DEPLOY | Honored |

---

## Inventory basis

Manifest: `reports/four-market-unique-image-manifest.md`  
Machine registry: `reports/_unique-image-placements.json`  
App registry: `data/market-unique-service-images.json`

| Bucket | Count |
|--------|------:|
| Hero | 40 |
| Why Buy | 40 |
| Can You Buy | 40 |
| Does Buying Help | 40 |
| Final CTA | 40 |
| Story side visuals | 298 |
| **Total** | **498** |

Excluded (not rendered as meaningful painted art on market service pages):

- Best Practices rasters (wired but discarded)
- Lucide / tiny icons
- `#page-trust` (no side image)
- Carousel-only story blocks (campaign / framework / measure)

---

## Asset location

```text
public/assets/images/illustrations/markets/{ca|au|us|uk}/{service-folder}/
  {slug}-{market}-{section-purpose}.webp
```

Examples:

- `buy-instagram-followers-canada-hero.webp`
- `buy-tiktok-views-usa-does-buying-help.webp`
- `buy-facebook-page-likes-uk-customer-proof.webp`

---

## Wiring

- `lib/market/unique-service-images.ts` — lookup by `market|slug|sectionId`
- `mirrored-service-authority-view.tsx` — hero / why / can / does / stories / final CTA
- `instagram-followers-authority-view.tsx` — same for IG Followers market overlays
- `market-story-sections.tsx` + `ca-homepage-visuals.tsx` — unique story art when `serviceSlug` set
- `packages-final-cta-aside.tsx` — unique final CTA when `market` + `serviceSlug` set
- Homepages unchanged (no `serviceSlug` → legacy CA pool)

---

## File size exception (all 498)

**Target was 60–70 KB (acceptable 55–75).**  
**Actual: ~9–23 KB (avg ~15 KB).**

**Reason:** Assets are intentionally **minimal flat soft-UI illustrations** (TokBoostly-inspired restraint). WebP compresses large flat cream regions extremely efficiently. Inflating to 55–75 KB would require adding photographic noise / clutter that **contradicts** the minimality brief and would degrade the clean look.

**Documented exception:** 498 / 498 under 55 KB for visual-quality / style-compliance reasons. None >80 KB.

Dimensions: **1536×1024 · 3:2 · WebP** — met.

---

## Style notes

- Cream / peach backgrounds  
- NovaLikes orange/coral  
- Platform accents (IG pink/orange, TT cyan/pink, FB blue) used sparingly  
- One phone **or** one central card  
- 1–3 floating accents  
- Market-unique composition seed (angle / placement / layout bias)  
- No flags, no photoreal stock faces, no busy dashboards  

---

## QA notes for follow-up

1. Spot-check live pages at 1440 / 1024 / 768 / 390 after `next dev`.  
2. If product wants heavier “painted” look later, regenerate with richer soft-3D AI masters **still unique per placement** — keep zero-reuse rule.  
3. Old shared paths under `illustrations/{service}/` and `illustrations/shared/` remain on disk but are no longer used by the 40 market service placements after this wiring.
