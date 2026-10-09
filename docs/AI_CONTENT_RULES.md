# InstantViral — AI Content Rules (Learn Center)

**Status:** Permanent  
**Effective:** 2026-07-13  
**Authority:** These rules override conflicting future prompts for Learn article work.  
**Companion:** [`docs/CONTENT_ARCHITECTURE.md`](./CONTENT_ARCHITECTURE.md)  
**Phase 21:** ChatGPT-approved MDX bodies are locked — see Rule 13.

Do not generate, rewrite, or publish a Learn article that violates this document.

---

## Purpose

Govern every AI-assisted Learn Center article so InstantViral:

- Protects commercial service-page keyword ownership
- Builds topical authority without cannibalization
- Ships consistent SEO, linking, images, and quality bars

---

## RULE 1 — Commercial keywords belong ONLY to service pages

Commercial / transactional keywords are owned exclusively by service pages.

**Examples (never use as Learn primary keywords or H1 targets):**

- buy instagram followers
- buy instagram likes
- buy youtube views
- buy spotify plays
- any `buy {platform} {metric}` pattern

**Forbidden on Learn:**

- Primary keyword matching a service primary keyword
- H1 / SEO title that is effectively a service title (“Buy …”)
- Slugs starting with `buy-`

If a prompt asks for a Learn article on an exact commercial keyword, **refuse and retarget** to an informational or comparison keyword that supports that service.

---

## RULE 2 — Learn Center targets informational intent only

Learn articles may only use these shapes:

| Allowed type | Example angle |
|--------------|---------------|
| How to… | How to get more Instagram followers |
| Why… | Why Instagram engagement matters |
| What is… | What is Instagram social proof |
| Tips | TikTok growth tips for beginners |
| Guide | YouTube SEO guide |
| Best Practices | Instagram profile best practices |
| Comparison | Instagram followers vs likes |
| Mistakes | Instagram growth mistakes to avoid |
| Checklist | Instagram growth checklist |
| Case Study | How a local brand grew on Instagram *(no fake data)* |
| Statistics | Instagram engagement benchmarks *(cited only)* |
| Marketing Strategy | Instagram content strategy for small businesses |
| Algorithm Guide | How the Instagram algorithm works |
| Beginner Guide | Social media growth for beginners |
| Advanced Guide | Advanced Instagram Reels strategy |

Decision / “worth buying?” pieces are **informational**, not commercial. They educate on trade-offs and may soft-link to a service. They must **not** own `buy …` keywords.

---

## RULE 3 — Every article must support one commercial page

Every Learn article declares **one primary supporting service**.

```text
How to Get More Instagram Followers
        ↓ supports
/buy-instagram-followers
```

| Requirement | Detail |
|-------------|--------|
| Primary service | Exactly one approved service slug |
| Secondary services | Optional (common for comparison articles) |
| CTA | Soft, after education; never password-based ordering |
| Architecture | Follow the intent ladder in `CONTENT_ARCHITECTURE.md` |

If no live service exists yet (e.g. Spotify), mark the brief **Reserved** and do not invent 404 CTAs.

---

## RULE 4 — Required article fields

Every article **MUST** contain:

| Field | Required |
|-------|----------|
| SEO Title | Yes — unique; not a service clone |
| Meta Description | Yes — unique; no false guarantees |
| Slug | Yes — `/learn/{slug}`; no `buy-` prefix |
| Primary Keyword | Yes — unique across all live URLs |
| Secondary Keywords | Yes — 3–6; none may be another page’s primary |
| Reading Time | Yes — computed from body |
| Table of Contents | Yes — from H2/H3 |
| Internal Links | Yes — see Rule 5 |
| FAQ | Yes — ≥3 items; schema-eligible where accurate |
| Article Schema | Yes — via Learn SEO system |
| Image Instructions | Yes — see Rule 6 |
| Conclusion | Yes — educational close |

Also expected in the production package: key takeaways, related articles, related services, author (named author from the approved registry), category, changelog.

---

## RULE 5 — Internal links (minimums)

Never leave articles isolated.

**Minimum per article:**

| Link type | Minimum |
|-----------|---------|
| Learn articles | **2** |
| Service pages | **2** |
| Category | **1** (e.g. `/learn/instagram`) |

**Linking principles:**

- Commercial pages receive authority from articles
- Articles link upward to the primary service after teaching
- Comparison articles link to both sides + relevant services
- Prefer contextual in-body links over identical footer spam

---

## RULE 6 — Image instructions required

Every article must include image production instructions and assets for:

| Asset | Requirement |
|-------|-------------|
| Hero image | 1 — featured / LCP; WebP; width ≥ 1200px |
| Section illustrations | **3–5** — placed under matching H2s |
| Alt text | Descriptive; not keyword stuffing |
| Filename | Descriptive kebab-case |
| Placement | Immediately below corresponding section heading |

**Style:** Original InstantViral flat/SaaS illustrations (orange + dark gray + white). No stock photos. No copyrighted downloads.

**Implementation:** `next/image`, width/height set, hero `priority`, below-fold lazy, CLS-safe. Cursor should generate branded illustrations automatically when producing the article package.

---

## RULE 7 — Writing quality

| Do | Do not |
|----|--------|
| Professional, helpful, human | Keyword stuffing |
| Clear structure and concrete advice | AI filler / vague padding |
| Honest limitations | Exaggerated claims |
| Cite only real, attributable stats | Fake statistics or invented case studies |
| Conditional wording for paid support | Guaranteed ranking, fame, or revenue |

Author byline: a named author from the approved registry (`data/authors/registry.ts`), with a real public profile and no invented or embellished credentials.

---

## RULE 8 — Article length

| Type | Target length |
|------|----------------|
| Normal informational / comparison | **1,800–2,500** words |
| Pillar articles | **3,000–4,500** words |

Pillars are cluster cornerstone guides (e.g. major “How to get more …” pages). Do not ship thin stubs as “published.”

---

## RULE 9 — Closing structure

Every article should finish with, in order:

1. **Summary** (or conclusion that restates takeaways)
2. **FAQ**
3. **Related Articles**
4. **CTA** to the relevant service (soft on educational pages; clear package compare language)

---

## RULE 10 — Pre-generation gate (mandatory)

Before writing any article, confirm:

| Check | Pass criteria |
|-------|----------------|
| Primary keyword | Unique; not commercial `buy …` |
| Slug | Unique; architecture-compliant |
| Intent | Informational or comparison only |
| Internal links | Plan meets Rule 5 minimums |
| Service page | Primary support service exists / approved |
| Category | Valid Learn category |
| Cannibalization | No clash with live services or Learn URLs |

**If a conflict exists:** do **not** generate the article. Suggest a better topic / keyword / slug instead.

---

## RULE 11 — Content quality score (pre-publish)

Score the draft before publishing. **Minimum to publish: 90/100.**

| Area | Max points | Pass signals |
|------|------------|--------------|
| SEO | 15 | Unique title, meta, primary KW, slug, intent match |
| Readability | 15 | Clear H2s, human tone, length in range |
| Internal links | 15 | ≥2 Learn, ≥2 services, ≥1 category |
| E-E-A-T | 10 | Honest claims, editorial author, transparent limits |
| Keyword intent | 10 | Informational/comparison only; supports one service |
| Cannibalization | 10 | No shared primary KW / H1 with another URL |
| Image coverage | 10 | Hero + 3–5 sections; alt, filenames, placement |
| Schema / FAQ | 15 | FAQ present; Article (+ FAQ where eligible) schema ready |

**If score &lt; 90:** list concrete improvements. Do not mark publish-ready until fixed.

### Score output format

```text
Quality Score: NN/100
- SEO: x/15
- Readability: x/15
- Internal links: x/15
- E-E-A-T: x/10
- Keyword intent: x/10
- Cannibalization: x/10
- Image coverage: x/10
- Schema / FAQ: x/15
Verdict: PASS | FAIL
Improvements: …
```

---

## RULE 12 — Permanent storage and enforcement

1. This file is the permanent AI rulebook for Learn articles.  
2. It works **with** [`docs/CONTENT_ARCHITECTURE.md`](./CONTENT_ARCHITECTURE.md); architecture defines clusters/maps; this file defines production gates.  
3. No future Learn article should violate these rules.  
4. If a user prompt conflicts with Rules 1–11, **follow these rules** and explain the conflict — **except** where Rule 13 (Phase 21) locks ChatGPT MDX as source of truth.  
5. Changes require an explicit changelog entry below.

---

## RULE 13 — Phase 21: ChatGPT MDX body lock

When an article is provided as approved ChatGPT MDX:

- The **article body is locked**. Do not rewrite, expand, summarize, paraphrase, shorten, or regenerate editorial content.
- Do not invent FAQs, stats, quotes, sections, headings, titles, slugs, or primary keywords.
- Technical integration only (save MDX, metadata, schema, reading time, TOC, related links **as listed**, register, sitemap, build checks).
- If FAQ, SEO, image instructions, or internal links are **missing**, **stop and report** — wait for a new MDX version.

---

## RULE 14 — AI Image Production Instructions (strict)

If the MDX contains an **AI Image Production Instructions** section:

- Generate images **strictly from those instructions**
- Do **not** redesign the prompts, change the art style, or replace them with stock photos
- Use InstantViral branded illustrations matching the provided filenames, alt text, and placement
- Prefer WebP + `next/image` with width/height and CLS-safe attributes

---

## RULE 15 — editorialApproved public gate

1. Learn articles are **not public** unless `editorialApproved: true` **and** status is `published` or `updated`.
2. Unapproved Instagram drafts must keep `status: 'draft'`, `published: false`, `editorialApproved: false`, and `seo.noindex: true`.
3. Drafts are excluded from sitemap, RSS (when enabled), Learn homepage/category listings, and internal search.
4. Preserve draft source files for future rewriting. Do **not** expand or rewrite them automatically.
5. Service pages are never modified by Learn draft gating.

### Changelog

| Date | Change |
|------|--------|
| 2026-07-13 | Initial permanent AI Content Rules created. |
| 2026-07-13 | Phase 21 MDX body lock (Rule 13) + strict image-instruction rule (Rule 14). |
| 2026-07-13 | Rule 15 — `editorialApproved` public gate; Instagram drafts unpublished. |

---

## One-page operator checklist

Copy into every article brief before generation:

- [ ] Rule 1 — primary KW is not commercial `buy …`
- [ ] Rule 2 — allowed informational/comparison type
- [ ] Rule 3 — one primary supporting service declared
- [ ] Rule 4 — all required fields planned
- [ ] Rule 5 — ≥2 Learn, ≥2 services, ≥1 category links planned
- [ ] Rule 6 / 14 — hero + section illustrations from MDX instructions only
- [ ] Rule 7 — quality bar acknowledged (no fluff / fake stats)
- [ ] Rule 8 — length target set (1.8–2.5k or 3–4.5k pillar) — *skipped when Rule 13 MDX lock applies*
- [ ] Rule 9 — Summary → FAQ → Related → CTA close planned
- [ ] Rule 10 — cannibalization gate passed
- [ ] Rule 11 — quality score ≥ 90 before publish — *editorial score deferred when Rule 13 applies; technical integration only*
- [ ] Rule 13 — ChatGPT MDX body unchanged
- [ ] Rule 15 — `editorialApproved: true` only after explicit editorial approval

**End of AI Content Rules.**
