# InstantViral Docs — Archive / Deletion Candidates

**Date:** 2026-08-12  
**Policy:** Listed only — not bulk-deleted in this cleanup pass.  
**Already rewritten:** `docs/PRODUCTION_DEPLOYMENT_GUIDE.md` → NovaLikes-only.

## High priority to archive or delete

| Path | Reason |
|------|--------|
| `docs/InstantViral-Website-Links.xls` | Full InstantViral URL inventory + deleted Learn articles |
| `docs/SEO_AUDIT_REPORT.md` | InstantViral SEO audit (`instantviral.ca`) |
| `docs/SEO_IMPLEMENTATION_REPORT.md` | InstantViral SEO implementation |
| `docs/AI_CONTENT_RULES.md` | InstantViral editorial rules |
| `docs/CONTENT_ARCHITECTURE.md` | InstantViral Learn ownership |
| `docs/17_Content_Library/Article_01/` | InstantViral SEO JSON + author frontmatter |
| `docs/17_Content_Library/_templates/Article_01_Production_Template/04_SEO.json` | InstantViral canonicals |
| `data/instantviral-next.code-workspace` | Workspace filename heritage |

## Broader InstantViral-titled architecture docs

Most files under `docs/01_*` … `docs/18_*`, `docs/13_Company/*`, `docs/14_*`, `docs/15_*` still use InstantViral v2 titles/examples. Treat as **historical specs** until rewritten for NovaLikes.

**Recommended next step:** move the high-priority set into `docs/_archive/instantviral/` in a dedicated PR after product owner confirmation.

## Tests fixed this pass

- `lib/seo/sitemap/__tests__/sitemap-robots.test.ts` — removed expectations for deleted Learn article slugs
