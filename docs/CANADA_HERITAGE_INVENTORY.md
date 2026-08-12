# Canada Heritage Inventory (Live) — Classification Only

**Date:** 2026-08-12  
**Rule:** Do not rewrite marketing copy yet. Geographic positioning TBD.  
**Auto-action taken:** Removed unused `*-canada-og.webp` assets (orphaned by metadata registry).

| Item | Location | Classification | Notes |
|------|----------|----------------|-------|
| Eyebrow “INSTAGRAM VIDEO GROWTH SERVICES FOR CANADA” | `data/content/instagram.ts` | **REWRITE** (later) | Live customer-facing |
| Eyebrow “INSTAGRAM COMMENT SERVICE FOR CANADA” | `data/content/instagram.ts` | **REWRITE** (later) | Live customer-facing |
| Eyebrow “FACEBOOK PAGE LIKE PACKAGES FOR CANADIAN BUSINESSES…” | `data/content/facebook.ts` | **REWRITE** (later) | Live customer-facing |
| `canada:` config sections | `data/content/*-page-config.ts` (FB/TikTok/YouTube) | **KEEP** for now | Structural keys; body mostly worldwide — review later |
| `YouTubeViewsCanada` component | `components/marketing/youtube-views/authority-sections.tsx` | **UNKNOWN** | Naming heritage; content may be generic |
| `YouTubeSubscribersCanada` | `components/marketing/youtube-subscribers/authority-sections.tsx` | **UNKNOWN** | Naming heritage |
| `TikTokViewsCanada` | `components/marketing/tiktok-views/authority-sections.tsx` | **UNKNOWN** | Naming heritage |
| `TikTokLikesCanada` | `components/marketing/tiktok-likes/authority-sections.tsx` | **UNKNOWN** | Naming heritage |
| `FacebookPostLikesCanada` | `components/marketing/facebook-post-likes/authority-sections.tsx` | **UNKNOWN** | Naming heritage |
| `FacebookPageLikesCanada` | `components/marketing/facebook-page-likes/authority-sections.tsx` | **UNKNOWN** | Naming heritage |
| `FacebookFollowersCanada` | `components/marketing/facebook-followers/authority-sections.tsx` | **UNKNOWN** | Naming heritage |
| Authority views importing `*Canada` | `components/sections/*-authority-view.tsx` | **UNKNOWN** | Wiring only |
| Icon map key `'canadian support'` | `components/sections/service/features.tsx` | **REWRITE** (later) | Feature icon matching |
| CAD currency option | `data/pricing/currencies.ts` | **KEEP** | Valid currency, not brand |
| Funnel geo label `CA: 'Canada'` | `lib/analytics/funnel-events.ts` | **KEEP** | Analytics geo label |
| `BRAND.canada` color in OG generator | `scripts/generate-og-images.mjs` | **REWRITE** (later) | Generator token name only |
| `*-canada-og.webp` (12 files) | `public/assets/images/og/` | **REMOVE** | **Done** — orphaned vs registry |
| Docs `09.*_Canada_Production.md` | `docs/09_Service_Page/` | **UNKNOWN** | Docs only — archive/delete decision later |

No marketing copy was rewritten in this pass.
