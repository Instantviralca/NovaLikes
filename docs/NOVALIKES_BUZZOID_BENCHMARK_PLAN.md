# NovaLikes — Buzzoid Benchmark Architecture & Pricing Plan

**Status:** PLANNING ONLY — no implementation in this deliverable  
**Date:** 2026-08-12  
**Primary benchmark:** https://buzzoid.com/ (live structure checked 2026-08-12)  
**Companion:** [`docs/BUZZOID_PACKAGE_BENCHMARK.md`](./BUZZOID_PACKAGE_BENCHMARK.md)

**Non-goals for this document**

- Do not rebuild pages, rewrite the whole site, change checkout, or modify SEO files yet.
- Do not copy Buzzoid copy, branding, images, reviews, claims, or proprietary design.
- Buzzoid = structure / hierarchy / package logic inspiration only.

---

## 1. Current NovaLikes architecture

### 1.1 Classification matrix

| System | Verdict | Rationale |
|--------|---------|-----------|
| Service registry (`data/services.ts`, `APPROVED_SERVICE_SLUGS`) | **KEEP** | 12 approved commercial URLs already correct |
| Pricing engine (`novalikes-products.ts` → `packages.ts` → admin overrides) | **KEEP** | Clean sell-side catalog; supports qty/price/tier |
| Cart + soft handoff | **KEEP** | Production-shaped |
| Checkout + remote-payment path | **KEEP** | Live path; do not rebuild for benchmark |
| Stripe provider (disabled) | **ADAPT** | Keep available; enable only if product requires |
| Order tracking | **KEEP** | Public track UI + API ready |
| Admin (orders/pricing/coupons/settings) | **KEEP** / **ADAPT** | Core ops solid; analytics/email can deepen later |
| Metadata registry + sitemap/robots | **KEEP** / **ADAPT** | Architecture good; retune ownership after homepage hub shift |
| JSON-LD schemas | **KEEP** / **ADAPT** | Organization/Service/FAQ/Product graph reusable |
| Navigation mega-menu + footer data | **KEEP** / **ADAPT** | Registry-driven; expand footer to all 12 if needed |
| Homepage composition | **REBUILD** (composition) / **ADAPT** (components) | Today behaves like IG Followers commercial authority — must become multi-platform hub |
| Per-service authority views (11 dedicated) | **ADAPT** | Keep pattern; normalize section order to shared template |
| IG Comments (generic fallback) | **REBUILD** | Bring to packages/authority parity |
| Legacy unused marketing exports (stats, platform-grid, old trust-bar barrels, etc.) | **REMOVE** (later cleanup) | Dead weight after homepage rebuild |
| Provider COGS / margin fields | **REBUILD** (new data) | **NONE FOUND** today — required before final undercut pricing |

### 1.2 Reusable InstantViral-derived systems (KEEP)

- App Router groups: `(marketing)`, `(commerce)`, `(legal)`, `(learn)`, `(admin)`
- Dynamic service route `app/(marketing)/[slug]`
- Commerce: cart cookie/hash, prepare-checkout, place-order, coupons
- Payments manager + remote-payment webhook
- Reviews / FAQ data systems
- OG image registry (`*-global-og.webp`)
- Brand tokens / shadcn UI / Framer motion utilities

### 1.3 Current homepage reality (gap vs target)

Live `HomePageView` is an **Instagram Followers–centric commercial page** (title/H1 authority), not a broad multi-platform hub.

**Target:** Homepage = discovery + brand + service hub.  
**Target:** Each `/buy-*` URL = transactional keyword authority.

---

## 2. Buzzoid architecture (live)

### 2.1 Observed site map (implement selectively)

| Area | Buzzoid URL / pattern | NovaLikes recommendation |
|------|----------------------|---------------------------|
| Homepage | `/` multi-service hub with per-service mini-sections | **Implement** (original NL version) |
| IG Followers | `/buy-instagram-followers/` | **Keep** NL slug (no trailing slash) |
| IG Likes | `/buy-instagram-likes/` | **Keep** |
| IG Views | `/buy-instagram-views/` | **Keep** |
| IG Comments | `/buy-instagram-comments/` | **Keep** |
| TikTok Followers/Likes/Views | `/buy-tiktok-*` | **Keep** |
| YouTube Views/Subscribers | `/buy-youtube-*` | **Keep** |
| YouTube Likes | `/buy-youtube-likes/` | **Phase 2** — not in NL 12 |
| About | `/about-us/` | **Keep** `/about` |
| Contact | `/contact-us/` | **Keep** `/contact` |
| FAQ | `/faq/` + help center | **Keep** `/faq` |
| Reviews | `/reviews/` | **Keep** `/reviews` |
| Blog | `/blog/` | **Defer** — NL Learn Center covers educational intent |
| Team | present in Buzzoid brand story | **Optional Phase 2** |
| Account | guest + account checkout | **ADAPT** guest-first; account optional later |
| Cart / Checkout | soft cart → checkout | **KEEP** existing NL commerce |
| Legal | privacy/terms/etc. | **KEEP** NL legal set |
| Tools | free utilities / AI Growth upsell | **Phase 2 only** |
| Facebook services | not core on Buzzoid | **KEEP** NL Facebook trio; external benchmark later |

### 2.2 Homepage architecture observed (structure only)

1. Header / platform service nav  
2. Hero (multi-platform commercial)  
3. Platform rating chips / social proof strip  
4. Live delivery ticker (optional — NL should not fake activity)  
5. “Seen on” media logos (**do not copy**)  
6. Value proposition blocks  
7. Services overview  
8–16. Per-service mini-sections (IG→TikTok→YouTube) each with bullets + CTA to dedicated URL  
17. Why Buzzoid / trust  
18. Purchase FAQ (“password?”, “which service?”)  
19. Final CTA  
20. Footer  

NovaLikes will mirror **logic**, insert **Facebook** mini-sections, and use **original** copy/visuals.

### 2.3 Conversion flow observed

Package tier → quantity → price → add to cart → username/URL → guest/account → pay → delivery messaging.

NovaLikes already supports package → configure → cart → checkout via remote-payment. **Do not rebuild checkout** for Phase 1; only improve package selector UX if needed.

---

## 3. Gap analysis

| Topic | Buzzoid | NovaLikes now | Gap action |
|-------|---------|---------------|------------|
| Homepage role | Multi-platform hub | IG Followers landing | **REBUILD homepage IA** |
| Service mini-sections on home | Yes (IG/TT/YT) | Partial / IG-heavy | **Add all 12 concise sections** |
| Facebook | Absent | 3 services live | **KEEP**; separate competitor benchmark |
| YouTube Likes | Live | Absent | Phase 2 candidate |
| Package tiers | HQ / Active / VIP (+ auto likes) | Mostly single ladder; comments/views have HQ/Premium | **ADAPT** selectively — don’t invent unsupported VIP claims |
| Entry package sizes | Often smaller (e.g. YT views from 100) | Some ladders start higher | **ADD PACKAGE** where margin allows |
| Automatic recurring likes | Yes | No | Phase 2 — only if ops can fulfill |
| Soft cart | Yes | Yes | KEEP |
| Tools/blog | Heavy | Learn empty + no tools | Phase 2 |
| Reviews/media logos | Heavy social proof | NL reviews only | KEEP NL-only proof; never import Buzzoid numbers |
| Pricing vs Buzzoid | Premium mid-market | Many SKUs already **cheaper than 15% rule** | **REVIEW** — don’t race to bottom |

---

## 4. Final NovaLikes sitemap (Phase 1)

### Marketing

- `/` — broad commercial hub  
- `/services` — optional index (KEEP if useful)  
- `/buy-instagram-followers`  
- `/buy-instagram-likes`  
- `/buy-instagram-views`  
- `/buy-instagram-comments`  
- `/buy-tiktok-followers`  
- `/buy-tiktok-likes`  
- `/buy-tiktok-views`  
- `/buy-facebook-followers`  
- `/buy-facebook-page-likes`  
- `/buy-facebook-post-likes`  
- `/buy-youtube-subscribers`  
- `/buy-youtube-views`  
- `/about` `/reviews` `/contact` `/faq` `/track-order`

### Commerce

- `/cart` `/checkout` `/order-success`

### Legal

- `/privacy-policy` `/terms-and-conditions` `/refund-policy` `/cookie-policy` `/disclaimer`

### Learn (scaffold only)

- `/learn` (+ dynamic when articles exist)

### Admin (private)

- `/admin/*`

**Explicitly not Phase 1:** YouTube Likes URL, Buzzoid-like free tools, blog clone, fake delivery tickers, media logo walls.

---

## 5. Homepage section plan (original NovaLikes)

**SEO role:** Broad multi-platform commercial hub — **not** a duplicate IG Followers landing page.

| # | Section | Purpose | Notes |
|---|---------|---------|-------|
| 1 | Header / nav | Platform mega-menus + CTA | KEEP/ADAPT existing nav |
| 2 | Hero | Brand + multi-platform growth positioning | One H1 that is hub-intent, not single-SKU |
| 3 | Platform selector | IG / TikTok / Facebook / YouTube | Jump links or cards |
| 4 | Trust / value prop | Simple “what we sell / how ordering works” | Only supportable claims |
| 5 | Services overview | Compact grid of 12 services | Links to dedicated URLs |
| 6–9 | IG mini-sections | Followers / Likes / Views / Comments | Short benefit + CTA only |
| 10–12 | TikTok mini-sections | Followers / Likes / Views | Same brevity rule |
| 13–15 | Facebook mini-sections | Followers / Page Likes / Post Likes | Unique to NL vs Buzzoid |
| 16–17 | YouTube mini-sections | Subscribers / Views | CTA to dedicated pages |
| 18 | Why NovaLikes | Differentiation (trust, clarity, education) | Original copy |
| 19 | How it works | 3–5 steps | No password; public URL |
| 20 | Guarantees / trust | Only real NL policies | No invented refill/VIP claims |
| 21 | Before you buy | Commercial Qs (which service, password, delivery, required info, after checkout) | Original answers |
| 22 | Reviews | NL-approved reviews only | No Buzzoid stats/media |
| 23 | FAQ | Hub FAQs | Link deeper FAQs on service pages |
| 24 | Final CTA | Start with platform/service | |
| 25 | Footer | Full service + company + legal | ADAPT footer links |

**Cannibalization guard:** Mini-sections stay shallow (intro + 3–5 bullets + CTA). Depth lives on `/buy-*`.

---

## 6. Service-page template plan

Reusable architecture for each of the 12 URLs (substantially deeper than homepage mini-section):

1. Hero (service H1 + primary CTA to packages)  
2. Package selector (qty / tier if real)  
3. Trust strip (no password, support, secure checkout — only if true)  
4. What this service is  
5. Why this metric matters  
6. Why customers buy it  
7. Package / tier explanation (if multi-tier)  
8. How ordering works  
9. Delivery expectations  
10. Quality / safety / account requirements (public profile, etc.)  
11. Who it’s for  
12. Related services comparison (internal links)  
13. Common buying questions  
14. FAQ (service-specific)  
15. Related services  
16. Final CTA  

**Omit** empty vanity sections. IG Comments should be rebuilt onto this template.

---

## 7. Service keyword ownership model

| URL | Owns (transactional cluster) | Homepage may mention | Must not own |
|-----|------------------------------|----------------------|--------------|
| `/` | Multi-platform growth provider; brand + discovery | All 12 phrases as hub links | Exact “buy {service}” primary ranking intent |
| `/buy-instagram-followers` | Buy Instagram followers | Link only | Likes/views/comments clusters |
| `/buy-instagram-likes` | Buy Instagram likes | Link only | Followers cluster |
| `/buy-instagram-views` | Buy Instagram views | Link only | |
| `/buy-instagram-comments` | Buy Instagram comments | Link only | |
| `/buy-tiktok-followers` | Buy TikTok followers | Link only | |
| `/buy-tiktok-likes` | Buy TikTok likes | Link only | |
| `/buy-tiktok-views` | Buy TikTok views | Link only | |
| `/buy-facebook-followers` | Buy Facebook followers | Link only | |
| `/buy-facebook-page-likes` | Buy Facebook page likes | Link only | |
| `/buy-facebook-post-likes` | Buy Facebook post likes | Link only | |
| `/buy-youtube-subscribers` | Buy YouTube subscribers | Link only | |
| `/buy-youtube-views` | Buy YouTube views | Link only | |
| `/learn/*` (future) | Informational | Soft links to commercial | Hard sell H1s |

Do **not** create metadata in this phase.

---

## 8. Buzzoid package benchmark summary

Full detail: [`docs/BUZZOID_PACKAGE_BENCHMARK.md`](./BUZZOID_PACKAGE_BENCHMARK.md)

**Highlights**

- IG Followers: 3 tiers (HQ / Active / VIP); HQ entry **$3.49 / 100** (official FAQ).  
- IG Likes: dense ladder from **50 @ $1.47** (verified Jun 2026).  
- IG Views: 500–50K; entry ~$2.  
- TikTok / YouTube: live quantity ladders captured; many mid prices need **LIVE_REVERIFY**.  
- YouTube Likes exists on Buzzoid — **not** in NL Phase 1.  
- Facebook: **COMPETITOR BENCHMARK REQUIRED**.

---

## 9. NovaLikes proposed package / pricing table

**Pricing rule reminder:** For *directly comparable* Buzzoid packages, target ~**10–15% lower** (`×0.90`–`×0.85`), with natural retail endings — **unless** that destroys margin.

**Critical finding:** Many NovaLikes prices are **already below** Buzzoid’s 15% floor (e.g. IG Followers 100: NL **$1.99** vs Buzzoid **$3.49**). Blind further undercutting is **not recommended**. Prefer:

1. Align **quantities/tiers** where useful  
2. Re-price toward the 10–15% band **only after COGS**  
3. Flag **MARGIN VERIFICATION REQUIRED** everywhere (no provider cost in repo)

### 9.1 Instagram Followers (vs Buzzoid HQ where known)

| Buzzoid qty | Buzzoid tier | Buzzoid $ | 10% lower | 15% lower | Recommended NL $ | Existing NL qty | Existing NL $ | Action |
|-------------|--------------|-----------|-----------|-----------|------------------|-----------------|---------------|--------|
| 100 | HQ | 3.49 | 3.14 | 2.97 | **2.99** (or keep 1.99 after margin review) | 100 | 1.99 | **REVIEW** — already ≪ 15% band |
| 250 | HQ | LIVE_REVERIFY | — | — | TBD | 250 | 3.99 | **REVIEW** |
| 500 | HQ | ~8.97 | 8.07 | 7.62 | **7.99** | 500 | 4.99 | **REVIEW** — NL much lower |
| 1,000 | HQ | ~12.97 | 11.67 | 11.02 | **10.99** | 1,000 | 9.99 | **CHANGE PRICE** (slight up) or **KEEP** after margin |
| 2,000 | HQ | LIVE_REVERIFY (~25.99 promo?) | — | — | TBD | — | — | **ADD PACKAGE** (qty gap) |
| 2,500 | — | — | — | — | — | 2,500 | 25.99 | **KEEP** qty (NL-specific) |
| 5,000 | HQ | ~44.97 | 40.47 | 38.22 | **39.99** | 5,000 | 43.99 | **CHANGE PRICE** toward band |
| 10,000 | HQ | ~74.97 | 67.47 | 63.72 | **64.99** | 10,000 | 75.99 | **CHANGE PRICE** |
| 20K–200K | HQ | LIVE_REVERIFY | — | — | TBD | 25,000 | 159.99 | **REVIEW** / optional **ADD** 20K |
| Active/VIP tiers | Active/VIP | LIVE_REVERIFY | — | — | — | — | — | **REVIEW** — only if fulfillment quality exists |

**Margin:** **MARGIN VERIFICATION REQUIRED** for all rows.

### 9.2 Instagram Likes (vs verified Jun 2026 HQ ladder)

| Buzzoid qty | Buzzoid $ | 10% | 15% | Recommended NL $ | Existing NL | Existing $ | Action |
|-------------|-----------|-----|-----|------------------|-------------|------------|--------|
| 50 | 1.47 | 1.32 | 1.25 | **1.29** | — | — | **ADD PACKAGE** |
| 100 | 2.97 | 2.67 | 2.52 | **2.49** | 100 | 1.49 | **REVIEW** (NL already lower) |
| 250 | 4.99 | 4.49 | 4.24 | **4.49** | 250 | 2.50 | **REVIEW** |
| 500 | 6.99 | 6.29 | 5.94 | **5.99** | 500 | 4.25 | **REVIEW** |
| 1,000 | 12.99 | 11.69 | 11.04 | **10.99** | 1,000 | 7.49 | **REVIEW** |
| 2,500 | LIVE_REVERIFY | — | — | TBD | 2,500 | 22.99 | **KEEP** pending verify |
| 5,000 | LIVE_REVERIFY | — | — | TBD | 5,000 | 39.99 | **KEEP** |
| 10,000 | LIVE_REVERIFY | — | — | TBD | 10,000 | 59.99 | **KEEP** |
| Auto monthly | exists on Buzzoid | — | — | — | — | — | **REVIEW** Phase 2 |

### 9.3 Instagram Views

| Topic | Plan |
|-------|------|
| Buzzoid start | 500 |
| NL start | 100 |
| Action | **KEEP** NL 100 entry (better funnel); align mid ladder after **LIVE_REVERIFY**; **MARGIN VERIFICATION REQUIRED** |

### 9.4 Instagram Comments

| Topic | Plan |
|-------|------|
| Buzzoid | Small 5–50 AI/relevant comments |
| NL | HQ + Premium with high absolute prices |
| Action | **REVIEW** commercially (not blind 10–15%); rebuild page template; **MARGIN VERIFICATION REQUIRED** |

### 9.5 TikTok Followers / Likes / Views

| Service | Structural gap | Pricing action |
|---------|----------------|----------------|
| Followers | Buzzoid denser low ladder (100–10K); NL has 100–15K | **ADAPT** quantities; prices **REVIEW** after live scrape |
| Likes | Buzzoid 100–10K; NL only 4 SKUs | **ADD PACKAGE** mid ladder |
| Views | NL HQ/Premium + 50K max stronger than Buzzoid marketing max | **KEEP** tier model; **LIVE_REVERIFY** Buzzoid prices |

All: **MARGIN VERIFICATION REQUIRED**.

### 9.6 YouTube Subscribers / Views

| Service | Gap | Action |
|---------|-----|--------|
| Subscribers | Buzzoid up to 10K; NL 100–5K | Optional **ADD** 10K after margin |
| Views | Buzzoid from 100; NL from 2500 | **ADD PACKAGE** 100/500/1K entry SKUs after margin |

### 9.7 Facebook (no Buzzoid mapping)

| Service | Action |
|---------|--------|
| All three FB services | **COMPETITOR BENCHMARK REQUIRED** — keep current packages until alternate competitor audit |

---

## 10. Margin-risk flags

| Flag | Detail |
|------|--------|
| **NO COGS IN REPO** | `data/pricing/*` has sell price only — no provider cost |
| **Already under Buzzoid floor** | Many NL SKUs (esp. IG followers/likes) already &lt; Buzzoid×0.85 — further cuts risk loss |
| **Comments premium pricing** | High absolute NL prices may be correct if COGS high — do not auto-match Buzzoid small packs |
| **VIP/Active tiers** | Do not sell higher tiers without confirmed fulfillment quality |
| **Automatic likes** | Recurring liability — margin + ops risk if added early |
| **LARGE BULK** | 50K–200K Buzzoid sizes — only add if supplier capacity + payment risk OK |

**Policy:** Never set price below fulfillment + payment fees to undercut Buzzoid.

---

## 11. Components we can reuse (KEEP)

- Service registry + approved slug SSG  
- Pricing package mapper + admin overrides  
- Cart / checkout / order-success / remote-payment  
- Track order  
- Admin orders/pricing/coupons  
- Metadata registry, sitemap, robots, OG assets  
- Schema helpers  
- Nav/footer data layer  
- Shared service sections (hero, FAQ, process, related services, commerce blocks)  
- Reviews + FAQ data systems  
- Design system primitives (buttons, cards, typography tokens)

---

## 12. Components requiring adaptation (ADAPT)

- Homepage composition (hub IA)  
- Platform selector / services overview prominence  
- Footer popular-services list (cover all 12)  
- Package selector UX (tier chips closer to Buzzoid hierarchy **without** cloning visuals)  
- Service-page section order normalization  
- SEO titles/descriptions ownership after homepage hub shift (later phase — not now)  
- Canada-heritage naming leftovers (separate cleanup track)

---

## 13. Components requiring rebuild (REBUILD)

- Homepage as multi-platform commercial hub (new section plan in §5)  
- Instagram Comments dedicated authority/packages view  
- Optional shared `ServiceAuthorityTemplate` to reduce 11 near-duplicate views  
- Provider cost / margin fields in pricing admin (new capability)

---

## 14. Phase 1 implementation order (after approval)

1. **Approve this plan** (no code yet).  
2. **Live price re-verify** — human screenshots of Buzzoid carts for all comparable SKUs → update `BUZZOID_PACKAGE_BENCHMARK.md`.  
3. **COGS worksheet** — import provider costs; compute margin for every SKU.  
4. **Finalize package map** — quantities/tiers/actions from §9 with margins.  
5. **Homepage hub rebuild** — section plan §5; original copy; keep commerce untouched.  
6. **Service template normalization** — apply §6; rebuild IG Comments.  
7. **Package catalog update** — `novalikes-products.ts` only after steps 2–4.  
8. **Internal linking pass** — homepage ↔ services ↔ related services.  
9. **SEO metadata retune** — only after IA stable (separate ticket).  
10. **QA** — keyword ownership, no cannibalization, checkout regression.

---

## 15. Phase 2 tools / content opportunities

Recommend only if genuine search/user value:

| Opportunity | Why | Priority |
|-------------|-----|----------|
| Instagram / TikTok / YouTube profile counters | High informational + assist commercial | High |
| Engagement rate calculator | Pre-purchase education | Medium |
| Hashtag / caption helpers | Traffic + Learn synergy | Medium |
| Video/thumbnail downloaders | High search demand; legal/ToS risk — careful | Low–Medium |
| YouTube Likes service page | Buzzoid has it; expand catalog later | Medium |
| Automatic likes subscription | Buzzoid conversion feature; ops-heavy | Low until ops ready |
| Learn article program | Informational SEO moat | High (content), not tools |

**Do not build tools in Phase 1.**

---

## 16. Content & design rules (binding)

- **Content:** Original NovaLikes copy only. No Buzzoid paragraphs, FAQs, stats, testimonials, or media logos.  
- **Design:** Own color/type/illustration/motion language. Benchmark conversion hierarchy only.  
- **Claims:** Only supportable NovaLikes policies (refill, delivery, geo, VIP) — never invent to match Buzzoid.

---

## 17. Approval checklist

Please approve before any implementation:

- [ ] Homepage becomes multi-platform hub (not IG Followers landing)  
- [ ] Keep all 12 existing services (including Facebook)  
- [ ] YouTube Likes / tools / auto-likes deferred to Phase 2  
- [ ] Pricing changes only after live Buzzoid re-verify + COGS  
- [ ] No checkout rebuild in Phase 1  
- [ ] No SEO file edits until IA approved  

---

*End of plan. No application code was modified for this deliverable.*
