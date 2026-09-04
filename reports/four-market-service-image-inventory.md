# Four-Market Service Page Image Inventory + Visual Reference Audit

**Project:** `C:\Users\HUSSNAIN.COM\Novalikes`  
**Audit type:** Read-only (no production edits, no generation, no commit/push/deploy)  
**Scope:** 40 geo service pages (`/ca|/au|/us|/uk` × 10 core services)  
**Homepages:** Not audited for new requirements; inspected only as style reference  
**Date:** 2026-09-02

---

# 1. Executive Summary

| Metric | Value |
|--------|------:|
| Pages audited | **40** |
| Meaningful image *placements* (painted) | **~498** |
| Unique physical files painted on these pages | **46** |
| Unique files referenced but not painted (dead Best Practices + delivery) | **11** |
| Average meaningful placements / page | **~12.5** |
| Average *unique* concepts / page | **~5 fixed roles + repetitive story pool** |
| Recommended new unique assets | **18** (all shared four-market) |
| Market-specific new assets recommended | **0** |
| Shared vs regional strategy | **Hybrid → heavily SHARED** |

**Key findings**

1. **CA / AU / US / UK share identical service image files.** Markets change copy and which story IDs appear; they do not change asset paths.
2. Every service has a consistent **5 painted roles**: Hero, Why Buy, Can You Buy, Does Buying Help, Final CTA — plus **0–N story side-images**.
3. **Best Practices `*-best-practices.webp` exist for all 10 services but are not rendered** (`visual` prop discarded as `_visual`).
4. **Does Buying Help on 9 mirrored services reuses the Why Buy file** — same asset twice on one page. Only Instagram Followers has a distinct `does-help` art.
5. **Story side-images are an Instagram/CA-centric pool of 7 files** applied by section ID across TikTok and Facebook pages → high placement count, low conceptual fit for non-IG services.
6. Dominant style: soft-3D product illustrations, warm cream/peach backgrounds, 3:2 masters (`1536×1024`), rounded frames, Next/Image for heroes & stories, plain `<img lazy>` for mid-page rasters.

---

# 2. 40-Page Image Inventory

**Counting rules:** Hero + WhyBuy + CanYouBuy + DoesBuyingHelp + Final CTA + story feature images.  
Excluded: Lucide icons, package icons, trust-strip glyphs, CSS chrome.  
Best Practices rasters: **not counted as painted** (dead wiring).

| Market | Route | Painted | Fixed roles | Story imgs | Visual status | New needed (unique assets, shared) |
|--------|-------|--------:|------------:|-----------:|---------------|-------------------------------------|
| ca | /ca/buy-instagram-followers | 11 | 5 | 6 | Strongest IG set; distinct does-help | Low |
| ca | /ca/buy-instagram-likes | 13 | 5 | 8 | Does=WhyBuy duplicate; IG story pool | Medium |
| ca | /ca/buy-instagram-views | 13 | 5 | 8 | Same pattern | Medium |
| ca | /ca/buy-instagram-comments | 10 | 5 | 5 | Fewer story images | Medium |
| ca | /ca/buy-tiktok-followers | 10 | 5 | 5 | TT hero OK; IG story pool WEAK | High |
| ca | /ca/buy-tiktok-likes | 11 | 5 | 6 | Same | High |
| ca | /ca/buy-tiktok-views | 13 | 5 | 8 | Same | High |
| ca | /ca/buy-facebook-followers | 12 | 5 | 7 | FB hero OK; IG story pool WEAK | High |
| ca | /ca/buy-facebook-page-likes | 12 | 5 | 7 | Same | High |
| ca | /ca/buy-facebook-post-likes | 12 | 5 | 7 | Same | High |
| au | /au/buy-instagram-followers | 10 | 5 | 5 | Same assets as CA | Low |
| au | /au/buy-instagram-likes | 10 | 5 | 5 | Same | Medium |
| au | /au/buy-instagram-views | 11 | 5 | 6 | Same | Medium |
| au | /au/buy-instagram-comments | 10 | 5 | 5 | Same | Medium |
| au | /au/buy-tiktok-followers | 13 | 5 | 8 | Same | High |
| au | /au/buy-tiktok-likes | 12 | 5 | 7 | Same | High |
| au | /au/buy-tiktok-views | 15 | 5 | 10 | Dense story reuse | High |
| au | /au/buy-facebook-followers | 13 | 5 | 8 | Same | High |
| au | /au/buy-facebook-page-likes | 14 | 5 | 9 | Same | High |
| au | /au/buy-facebook-post-likes | 10 | 5 | 5 | Same | High |
| us | /us/buy-instagram-followers | 11 | 5 | 6 | Same | Low |
| us | /us/buy-instagram-likes | 13 | 5 | 8 | Same | Medium |
| us | /us/buy-instagram-views | 12 | 5 | 7 | Same | Medium |
| us | /us/buy-instagram-comments | 10 | 5 | 5 | Same | Medium |
| us | /us/buy-tiktok-followers | 13 | 5 | 8 | Same | High |
| us | /us/buy-tiktok-likes | 13 | 5 | 8 | Same | High |
| us | /us/buy-tiktok-views | 14 | 5 | 9 | Same | High |
| us | /us/buy-facebook-followers | 13 | 5 | 8 | Same | High |
| us | /us/buy-facebook-page-likes | 14 | 5 | 9 | Same | High |
| us | /us/buy-facebook-post-likes | 14 | 5 | 9 | Same | High |
| uk | /uk/buy-instagram-followers | 11 | 5 | 6 | Same | Low |
| uk | /uk/buy-instagram-likes | 13 | 5 | 8 | Same | Medium |
| uk | /uk/buy-instagram-views | 13 | 5 | 8 | Same | Medium |
| uk | /uk/buy-instagram-comments | 10 | 5 | 5 | Same | Medium |
| uk | /uk/buy-tiktok-followers | 14 | 5 | 9 | Same | High |
| uk | /uk/buy-tiktok-likes | 15 | 5 | 10 | Same | High |
| uk | /uk/buy-tiktok-views | 19 | 5 | 14 | Highest story reuse | High |
| uk | /uk/buy-facebook-followers | 13 | 5 | 8 | Same | High |
| uk | /uk/buy-facebook-page-likes | 14 | 5 | 9 | Same | High |
| uk | /uk/buy-facebook-post-likes | 14 | 5 | 9 | Same | High |

**Totals:** 200 fixed + 298 story = **498 painted placements**.

**Image paths (fixed roles, shared across markets):**

| Role | Path pattern |
|------|----------------|
| Hero | `/assets/images/illustrations/{stem}/{stem}-hero.webp` |
| Why Buy | `/assets/images/illustrations/{stem}/{stem}-why-buy.webp` |
| Can You Buy | `{stem}-order-process.webp` (IG followers: `buying-process.webp`) |
| Does Buying Help | IG followers: `does-help.webp`; others: **same as why-buy** |
| Final CTA | `{stem}-package-cta.webp` |
| Story | Shared pool (Section 3) |

---

# 3. Existing Image File Inventory

## 3.1 Painted on geo service pages (46 unique files)

### Per-service WebP set (10 × ~4–5 files)

All service heroes / why-buy / order|buying-process / package-cta / (IG only) does-help:

| File | Dimensions | Ratio | Usage |
|------|------------|------:|-------|
| `…/{stem}/{stem}-hero.webp` ×10 | 1536×1024 | 3:2 | Hero (Next/Image, priority) |
| `…/{stem}/{stem}-why-buy.webp` ×10 | 1536×1024 | 3:2 | Why Buy; also Does Help on 9 services |
| `…/{stem}/{stem}-order-process.webp` ×9 | 1536×1024 | 3:2 | Can You Buy (mirrored) |
| `…/instagram-followers/instagram-followers-buying-process.webp` | 1536×1024 | 3:2 | Can You Buy + story `account-you-have` |
| `…/instagram-followers/instagram-followers-does-help.webp` | 1536×1024 | 3:2 | Does Buying Help (followers only) |
| `…/{stem}/{stem}-package-cta.webp` ×10 | 1536×1024 | 3:2 | Final CTA aside |

### Shared story pool

| File | Dimensions | Ratio | Used for section ID families |
|------|------------|------:|------------------------------|
| `homepage/instagram-followers-visual.webp` | 1440×960 | 3:2 | first-impression, built-for-*, profile-experience, better-page, … |
| `homepage/ca/ca-instagram-profile-audit.png` | 1536×1024 | 3:2 | reach-context, organic-reach, fyp-reach, likes-reach, … |
| `homepage/ca/ca-metrics-vs-customer-proof.png` | 1536×1024 | 3:2 | customer-proof, social-proof, real-experience, … |
| `homepage/ca/ca-local-business-trust.png` | 1536×1024 | 3:2 | local-businesses, more-business, business-results, … |
| `homepage/ca/ca-package-comparison.png` | 1536×1024 | 3:2 | affordable-growth, hq-premium |
| (+ why-buy / buying-process overlap already listed) | | | brand-partnerships / account-you-have |

## 3.2 Present but not painted on geo pages

| File | Dimensions | Notes |
|------|------------|-------|
| `…/{stem}/{stem}-best-practices.webp` ×10 | 1024×1024 (1:1) | Passed into BestPractices, discarded |
| `instagram-followers-delivery-requirements.webp` | 1536×1024 | Non-geo RequirementGuide only |
| `sections/shared-order.png`, `shared-practices.png` | — | Fallbacks; not hit by these 10 slugs |

## 3.3 Homepage-only visuals (style reference, not service-page inventory)

`homepage/*-visual.webp` for likes/views/comments/tiktok/facebook — used on homepages / collage; **not** the service hero path (except `instagram-followers-visual.webp` also used as story art).

---

# 4. Service-Type Summary

| Service | Existing painted roles | Shared across 4 markets? | Story pool fit | Ideal painted roles | New unique assets (shared) |
|---------|------------------------|--------------------------|----------------|--------------------:|---------------------------:|
| Instagram Followers | Hero, Why, Process, Does(distinct), CTA + stories | Yes | GOOD | 6–7 | 0–1 |
| Instagram Likes | Hero, Why, Process, Does(=Why), CTA + stories | Yes | ACCEPTABLE | 6–7 | 1 (distinct Does) |
| Instagram Views | same | Yes | ACCEPTABLE | 6–7 | 1 |
| Instagram Comments | same | Yes | ACCEPTABLE | 6–7 | 1 |
| TikTok Followers | same | Yes | WEAK (IG pool) | 6–7 | 1 Does + story set share |
| TikTok Likes | same | Yes | WEAK | 6–7 | 1 + story set share |
| TikTok Views | same | Yes | WEAK / over-dense | 6–7 | 1 + story set share |
| Facebook Followers | same | Yes | WEAK | 6–7 | 1 + story set share |
| Facebook Page Likes | same | Yes | WEAK | 6–7 | 1 + story set share |
| Facebook Post Likes | same | Yes | WEAK | 6–7 | 1 + story set share |

**Ideal count per page (roles, not story spam):** Hero + Why + CanYouBuy + Distinct Does + CTA + 2–3 high-fit story images = **6–8**.

---

# 5. Hero Image Audit

| Service | Hero? | Same CA/AU/US/UK? | Inherited English path? | Path | Concept | Match |
|---------|-------|-------------------|-------------------------|------|---------|-------|
| IG Followers | Yes | Yes | Yes | `instagram-followers-hero.webp` | Profile / audience growth | GOOD |
| IG Likes | Yes | Yes | Yes | `instagram-likes-hero.webp` | Hearts / post engagement | GOOD |
| IG Views | Yes | Yes | Yes | `instagram-views-hero.webp` | Reel / view attention | GOOD |
| IG Comments | Yes | Yes | Yes | `instagram-comments-hero.webp` | Conversation bubbles | GOOD |
| TT Followers | Yes | Yes | Yes | `tiktok-followers-hero.webp` | TT profile audience | GOOD |
| TT Likes | Yes | Yes | Yes | `tiktok-likes-hero.webp` | Video likes | GOOD |
| TT Views | Yes | Yes | Yes | `tiktok-views-hero.webp` | Video views | GOOD |
| FB Followers | Yes | Yes | Yes | `facebook-followers-hero.webp` | Page audience | GOOD |
| FB Page Likes | Yes | Yes | Yes | `facebook-page-likes-hero.webp` | Page Like metric | GOOD |
| FB Post Likes | Yes | Yes | Yes | `facebook-post-likes-hero.webp` | Single-post likes | GOOD |

**Implementation:** `ServiceHero` → `BrandedHero` → `HeroVisualStack` with `next/image`, `priority`, `object-contain`, content `width`/`height` often declared as 1200×900 while master files are 1536×1024.

---

# 6. Mid-Page Image Audit

## 6.1 Fixed authority sections (all markets)

| Section role | Typical layout | Component | Asset | Match |
|--------------|----------------|-----------|-------|-------|
| Why Buy | Text left / image right | `InstagramFollowersWhyBuy` + service visual | `{stem}-why-buy.webp` | GOOD |
| Can You Buy | Image left / text right (often) | `InstagramFollowersCanYouBuy` | order/buying-process | GOOD |
| Does Buying Help | Text left / image right | `InstagramFollowersDoesBuyingHelp` | does-help **or reused why-buy** | IG Followers GOOD; others **WEAK** (duplicate) |
| Best Practices | Cards only | `InstagramFollowersBestPractices` | none painted | N/A (dead asset) |
| Final CTA | Dark band + aside image | `PackagesFinalCtaAside` | package-cta | ACCEPTABLE–GOOD |

## 6.2 Story feature images (`CaStoryFeatureImage`)

| Layout | Aspect (CSS frame) | Object-fit | Match by platform |
|--------|-------------------|------------|-------------------|
| Split text/image (image L or R by ID) | `aspect-[4/3]` frame | `object-cover` | IG: ACCEPTABLE–GOOD; TT/FB: **WEAK / WRONG CONCEPT** when IG mock UI appears |

Wide-text splits (`local-businesses`, `business-results`, …) use ~62/38 columns.

Carousel / framework sections (`*campaign*`, `*framework*`, `measure-*`) are **card carousels without side images**.

---

# 7. Visual Style Reference

## Dominant language

1. **Illustration style:** Soft 3D / clay-like marketing renders (not flat iconography, not photography).  
2. **Palette:** Warm cream `#FFF9F5` / peach accents, soft coral/orange brand alignment, muted stone neutrals.  
3. **Background:** Soft gradients / studio wash inside the art; page uses `#FFFBFA` / `#FFF9F4`.  
4. **3D vs flat:** Soft-3D product scenes.  
5. **Lighting:** Diffused, low-contrast, friendly.  
6. **Shadows:** Soft drop under devices/cards (`shadow-[0_12px_32px_-20px_…]` on mid-page frames).  
7. **Objects:** Phones, profile cards, metric chips, checklist cards, storefront/map motifs (CA PNGs).  
8. **Devices:** Rounded phone/tablet mockups, slight perspective.  
9. **Social icons:** Stylized platform glyphs inside scenes (not official logo dumps alone).  
10. **Composition:** Hero subject large, supporting UI cards orbiting; mid-page single focal scene.  
11. **Corner radius:** Hero ~`1.5rem`; mid-page ~`1.25rem`; story frames `rounded-2xl`.  
12. **Aspect:** Masters **3:2**; story CSS often crops to **4:3**.  
13. **Embedded text:** Low–moderate (labels/chips, not paragraphs).  
14. **Platform logos:** Present as stylized UI, not trademark-heavy wordmarks.  
15. **People/avatars:** Occasional avatar circles / silhouette customers; not photoreal faces.  
16. **Screenshots:** Illustrated UI mockups, not raw product screenshots.

## Best reference files for future generation

| # | Path | Why |
|---|------|-----|
| 1 | `instagram-followers/instagram-followers-hero.webp` | Cleanest profile-audience hero; lighting + device treatment |
| 2 | `instagram-likes/instagram-likes-hero.webp` | Clear metric differentiation (hearts vs followers) |
| 3 | `instagram-views/instagram-views-hero.webp` | Video/Reel attention language |
| 4 | `instagram-comments/instagram-comments-hero.webp` | Conversation concept without clutter |
| 5 | `tiktok-followers/tiktok-followers-hero.webp` | Non-IG platform hero reference |
| 6 | `facebook-page-likes/facebook-page-likes-hero.webp` | Page-level Facebook language |
| 7 | `instagram-followers/instagram-followers-does-help.webp` | Best mid-page “help vs limits” conceptual split |
| 8 | `instagram-followers/instagram-followers-buying-process.webp` | Order/process storytelling |
| 9 | `homepage/ca/ca-local-business-trust.png` | Multi-signal trust composition (store + profile) |
| 10 | `homepage/ca/ca-metrics-vs-customer-proof.png` | Two-panel comparison composition |

Preserve: warm wash, soft-3D, low text density, single focal metaphor, 3:2 master, rounded device chrome.

---

# 8. Repetitive / Wrong Images

| Issue | Detail |
|-------|--------|
| Why Buy = Does Buying Help | 9 services paint the same file twice |
| IG story pool on TT/FB | Audit/local/proof/profile art reads Instagram even on TikTok/Facebook routes |
| Same 5 story files × dozens of section IDs | High placement count, low variety |
| Best Practices assets unused | 10 files orphaned on geo |
| CA folder naming | `homepage/ca/*.png` used for all markets → “Canada” in path only, not regional art |
| Metric confusion risk | Reusing followers-profile art on likes/views/comments story aliases can blur service distinction |

**Must stay visually distinct**

| Service | Required visual signal |
|---------|------------------------|
| IG Followers | Profile audience size |
| IG Likes | Hearts on a post/Reel |
| IG Views | View/play attention on video |
| IG Comments | Visible conversation |
| TT Followers | TikTok profile audience |
| TT Likes | TikTok video likes |
| TT Views | TikTok watch/views |
| FB Followers | Facebook Page audience |
| FB Page Likes | Page Like count |
| FB Post Likes | Single-post likes |

---

# 9. New Image Recommendations

Do **not** recommend an image for every section. Only where it improves comprehension / rhythm / differentiation.

| Priority | Market(s) | Service | Route(s) | Section | Concept | Layout | Aspect | Shared/Specific |
|----------|-----------|---------|----------|---------|---------|--------|--------|-----------------|
| P1 | All four | IG Likes | `/*/buy-instagram-likes` | Does Buying Help | Likes help vs limits (distinct from Why Buy) | Text L / image R | 3:2 | SHARED |
| P1 | All four | IG Views | `/*/buy-instagram-views` | Does Buying Help | Views help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | IG Comments | `/*/buy-instagram-comments` | Does Buying Help | Comments help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | TT Followers | `/*/buy-tiktok-followers` | Does Buying Help | TT followers help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | TT Likes | `/*/buy-tiktok-likes` | Does Buying Help | TT likes help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | TT Views | `/*/buy-tiktok-views` | Does Buying Help | TT views help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | FB Followers | `/*/buy-facebook-followers` | Does Buying Help | FB followers help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | FB Page Likes | `/*/buy-facebook-page-likes` | Does Buying Help | Page Likes help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | FB Post Likes | `/*/buy-facebook-post-likes` | Does Buying Help | Post Likes help vs limits | Text L / image R | 3:2 | SHARED |
| P1 | All four | TikTok * | all TT routes | Story: profile / reach / proof families | TikTok-native profile, FYP/reach, proof | Split L/R | 3:2 | SHARED FOUR-MARKET |
| P1 | All four | Facebook * | all FB routes | Story: page / reach / proof families | Facebook-native page, distribution, proof | Split L/R | 3:2 | SHARED FOUR-MARKET |
| P2 | All four | All 10 | Best Practices | Checklist / package-quality scene (or wire existing) | Optional split or drop | 1:1 or 3:2 | SHARED |
| P3 | — | — | Local-business stories | Flags/maps regional | **Not recommended** — keep shared local-trust concept | — | — | Prefer SHARED |

---

# 10. Shared Asset Strategy

**Recommendation: C — Hybrid, almost entirely SHARED.**

Generate **once per service/concept** and reuse on CA/AU/US/UK.

| Asset class | Strategy |
|-------------|----------|
| Heroes | Already shared — keep |
| Why / Process / CTA | Already shared — keep |
| Does Buying Help | **New shared set (9)** — do not regionalize |
| Story pool | **New shared TikTok set + Facebook set**; keep IG CA PNGs for IG |
| Local business | Shared (no flags) |
| Campaign carousels | No new art required (card UI) |

---

# 11. Market-Specific Image Requirements

**None recommended for this inventory.**

Regional copy already carries CA/AU/US/UK context. Do not produce four near-identical images with different flags.

---

# 12. Technical Image Specs

| Topic | Current project behavior | Recommended for next assets |
|-------|--------------------------|----------------------------|
| Format | WebP (service), PNG (CA story pool) | **WebP** primary; PNG only if transparency needed |
| Master size | **1536×1024** (3:2); some 1440×960; best-practices 1024×1024 | Hero/mid: **1600×1067 or 1536×1024 (3:2)** |
| Content JSON dims | Often `width: 1200, height: 900` | Keep 3:2; align declared dims to master |
| Desktop render | Hero ~42vw contain; story ~520px cover 4:3 frame; mid max-w ~30rem | Design for ~600–800px display width |
| Mobile | Full width, stacked | Same masters; responsive via sizes |
| Next/Image | Heroes + story feature images | Continue |
| Mid-page | `<img loading="lazy">` via `RasterSectionVisual` | OK; optional migrate to Next/Image later |
| Priority | Hero `priority` + `fetchPriority=high` | Keep for hero only |
| object-fit | Hero `contain`; story `cover`; mid `cover` | Keep |
| Compression | Next image optimizer `q=75` typical | Export WebP quality ~80–85 |
| Folder convention | `public/assets/images/illustrations/{service-stem}/` | Continue; story pool under `homepage/` or `shared/` |
| Radius | 1.25–1.5rem frames | Preserve in art (leave safe margins) |

**Suggested generation specs**

- Hero: 1536×1024, 3:2, WebP  
- Mid-page (Why / Does / Process): 1536×1024, 3:2, WebP  
- Story feature: 1536×1024, 3:2, WebP (CSS may crop to 4:3)  
- Optional Best Practices: 1024×1024 if keeping square set

---

# 13. Final Generation List

**Do not write generation prompts here.** Numbered assets only.

---

### IMAGE 01
- **Service:** Instagram Likes  
- **Market(s):** CA, AU, US, UK  
- **Route(s):** `/*/buy-instagram-likes`  
- **Section:** Does Buying Help  
- **Purpose:** Stop reusing Why Buy art; explain help vs limits  
- **Recommended concept:** Post/Reel with hearts + “limits” panel (no reach/sales promises)  
- **Reference existing image:** `instagram-followers-does-help.webp`  
- **Reference image path:** `/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2  
- **Recommended dimensions:** 1536×1024  
- **Shared or market-specific:** SHARED  

### IMAGE 02
- **Service:** Instagram Views  
- **Market(s):** All four  
- **Route(s):** `/*/buy-instagram-views`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct views help/limits visual  
- **Recommended concept:** Reel view counter + non-guarantees panel  
- **Reference:** `instagram-followers-does-help.webp` + `instagram-views-hero.webp`  
- **Reference paths:**  
  `/assets/images/illustrations/instagram-followers/instagram-followers-does-help.webp`  
  `/assets/images/illustrations/instagram-views/instagram-views-hero.webp`  
- **Aspect ratio:** 3:2 · **Dimensions:** 1536×1024 · **SHARED**

### IMAGE 03
- **Service:** Instagram Comments  
- **Market(s):** All four  
- **Route(s):** `/*/buy-instagram-comments`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct comments help/limits  
- **Recommended concept:** Comment thread + limits (not followers/likes)  
- **Reference:** `instagram-comments-hero.webp`, `instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 04
- **Service:** TikTok Followers  
- **Market(s):** All four  
- **Route(s):** `/*/buy-tiktok-followers`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct TT followers help/limits  
- **Recommended concept:** TikTok profile follower count vs non-guarantees  
- **Reference:** `tiktok-followers-hero.webp`, `instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 05
- **Service:** TikTok Likes  
- **Market(s):** All four  
- **Route(s):** `/*/buy-tiktok-likes`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct TT likes help/limits  
- **Reference:** `tiktok-likes-hero.webp`, `instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 06
- **Service:** TikTok Views  
- **Market(s):** All four  
- **Route(s):** `/*/buy-tiktok-views`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct TT views help/limits  
- **Reference:** `tiktok-views-hero.webp`, `instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 07
- **Service:** Facebook Followers  
- **Market(s):** All four  
- **Route(s):** `/*/buy-facebook-followers`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct FB Page followers help/limits  
- **Reference:** `facebook-followers-hero.webp`, `instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 08
- **Service:** Facebook Page Likes  
- **Market(s):** All four  
- **Route(s):** `/*/buy-facebook-page-likes`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct Page Like help/limits (not Followers / Post Likes)  
- **Reference:** `facebook-page-likes-hero.webp`, `instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 09
- **Service:** Facebook Post Likes  
- **Market(s):** All four  
- **Route(s):** `/*/buy-facebook-post-likes`  
- **Section:** Does Buying Help  
- **Purpose:** Distinct single-post likes help/limits  
- **Reference:** `facebook-post-likes-hero.webp`, `instagram-followers-does-help.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 10
- **Service:** TikTok (all TT services)  
- **Market(s):** All four  
- **Route(s):** all `/…/buy-tiktok-*`  
- **Section:** Story IDs in profile / first-impression / built-for-* family  
- **Purpose:** Replace IG profile visual on TikTok pages  
- **Recommended concept:** TikTok profile first-impression scene  
- **Reference:** `tiktok-followers-hero.webp`, `homepage/instagram-followers-visual.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 11
- **Service:** TikTok (all TT services)  
- **Market(s):** All four  
- **Route(s):** all TT  
- **Section:** Story IDs in reach / FYP / organic-reach family  
- **Purpose:** Platform-accurate reach metaphor  
- **Recommended concept:** FYP / distribution vs follower count  
- **Reference:** `ca-instagram-profile-audit.png` (composition), `tiktok-views-hero.webp` (platform)  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 12
- **Service:** TikTok (all TT services)  
- **Market(s):** All four  
- **Route(s):** all TT  
- **Section:** Story IDs in proof / real-experience / customer-proof family  
- **Purpose:** Non-IG proof visual  
- **Recommended concept:** TT metrics vs genuine audience signals  
- **Reference:** `ca-metrics-vs-customer-proof.png`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 13
- **Service:** Facebook (all FB services)  
- **Market(s):** All four  
- **Route(s):** all `/…/buy-facebook-*`  
- **Section:** Story profile / page-worth / built-for-* family  
- **Purpose:** Replace IG profile art on Facebook pages  
- **Recommended concept:** Facebook Page first impression  
- **Reference:** `facebook-followers-hero.webp`, `instagram-followers-visual.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 14
- **Service:** Facebook (all FB services)  
- **Market(s):** All four  
- **Route(s):** all FB  
- **Section:** Reach / distribution story family  
- **Purpose:** Page distribution vs Page metrics  
- **Recommended concept:** Feed/distribution vs Page Like/Follower counts  
- **Reference:** `ca-instagram-profile-audit.png`, `facebook-page-likes-hero.webp`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 15
- **Service:** Facebook (all FB services)  
- **Market(s):** All four  
- **Route(s):** all FB  
- **Section:** Proof / trust / customer-proof family  
- **Purpose:** FB-native proof composition  
- **Recommended concept:** Page metrics vs reviews/messages/proof  
- **Reference:** `ca-metrics-vs-customer-proof.png`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 16
- **Service:** Facebook / Local business stories (optional shared upgrade)  
- **Market(s):** All four  
- **Route(s):** FB + any `local-businesses` / `business-results`  
- **Section:** Local / business story family  
- **Purpose:** Less IG-specific local trust scene (optional if IMAGE 13–15 insufficient)  
- **Recommended concept:** Local business + social Page presence (platform-neutral or FB)  
- **Reference:** `ca-local-business-trust.png`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

### IMAGE 17
- **Service:** All 10 (optional P2)  
- **Market(s):** All four  
- **Route(s):** Best Practices sections  
- **Section:** Best Practices / Affordable packages  
- **Purpose:** Either generate one shared checklist quality scene **or** wire existing `*-best-practices.webp`  
- **Recommended concept:** Package quality checklist (quantities, pricing, no-password, tracking)  
- **Reference:** existing `*-best-practices.webp` (1:1) or `ca-package-comparison.png`  
- **Aspect ratio:** 3:2 preferred (or keep 1:1 if wiring existing)  
- **SHARED**

### IMAGE 18
- **Service:** Instagram Followers (optional polish)  
- **Market(s):** All four  
- **Route(s):** `/*/buy-instagram-followers`  
- **Section:** Measure-growth / growth-framework (currently carousel-only)  
- **Purpose:** Optional single supporting visual if carousel feels text-heavy — **P3 only**  
- **Recommended concept:** Insights dashboard beyond follower total  
- **Reference:** `ca-instagram-profile-audit.png`  
- **Aspect ratio:** 3:2 · **1536×1024** · **SHARED**

---

## Generation count summary

| Bucket | Count |
|--------|------:|
| P1 Does Buying Help (distinct) | 9 |
| P1 TikTok story set | 3 |
| P1 Facebook story set | 3 |
| P2 Best Practices (optional) | 1 |
| P3 Optional extras | 2 |
| **Core recommended now (01–15)** | **15** |
| **With optional 16–18** | **18** |
| Market-specific | **0** |

---

*End of audit. No production files modified. No commit / push / deploy.*
