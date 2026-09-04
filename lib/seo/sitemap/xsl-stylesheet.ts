/**
 * Browser-only XSL for sitemap index + urlset presentation.
 * Does not change sitemap semantics for crawlers.
 */

export const SITEMAP_STYLESHEET_PATH = '/sitemap.xsl';

export const SITEMAP_STYLESHEET_HREF = SITEMAP_STYLESHEET_PATH;

export const SITEMAP_XSL_HEADERS = {
  'Content-Type': 'text/xsl; charset=utf-8',
  'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
} as const;

export const SITEMAP_XSL = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"
    doctype-system="about:legacy-compat" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          <xsl:choose>
            <xsl:when test="s:sitemapindex">NovaLikes XML Sitemap Index</xsl:when>
            <xsl:otherwise>NovaLikes XML Sitemap</xsl:otherwise>
          </xsl:choose>
        </title>
        <style type="text/css">
          :root {
            --bg: #FFFBFA;
            --card: #ffffff;
            --text: #1c1917;
            --muted: #78716c;
            --border: #e7e0da;
            --accent: #e85d04;
            --accent-soft: #fff4ed;
            --zebra: #faf7f5;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 24px 16px 48px;
            background: var(--bg);
            color: var(--text);
            font: 14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
          }
          .wrap {
            max-width: 1200px;
            margin: 0 auto;
          }
          header {
            margin-bottom: 20px;
            padding-bottom: 14px;
            border-bottom: 2px solid var(--accent);
          }
          .brand {
            color: var(--accent);
            font-weight: 700;
            letter-spacing: 0.02em;
            font-size: 12px;
            text-transform: uppercase;
          }
          h1 {
            margin: 6px 0 8px;
            font-size: 24px;
            font-weight: 700;
            line-height: 1.25;
          }
          .lead {
            margin: 0;
            color: var(--muted);
            max-width: 60ch;
          }
          .meta {
            margin: 12px 0 0;
            color: var(--muted);
            font-size: 13px;
          }
          .meta strong { color: var(--text); font-weight: 600; }
          .panel {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            overflow: hidden;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 10px 12px;
            text-align: left;
            vertical-align: top;
            border-bottom: 1px solid var(--border);
          }
          th {
            background: var(--accent-soft);
            color: var(--text);
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            white-space: nowrap;
          }
          tbody tr:nth-child(even) { background: var(--zebra); }
          tbody tr:hover { background: var(--accent-soft); }
          tbody tr:last-child td { border-bottom: 0; }
          a {
            color: var(--accent);
            text-decoration: none;
            word-break: break-all;
          }
          a:hover { text-decoration: underline; }
          .name {
            font-weight: 600;
            color: var(--text);
            display: block;
            margin-bottom: 2px;
          }
          .type, .alts {
            display: inline-block;
            margin-top: 2px;
            padding: 1px 8px;
            border-radius: 999px;
            background: var(--accent-soft);
            color: var(--accent);
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
          }
          .muted { color: var(--muted); }
          .num { font-variant-numeric: tabular-nums; white-space: nowrap; }
          @media (max-width: 720px) {
            body { padding: 16px 10px 32px; }
            h1 { font-size: 20px; }
            th, td { padding: 8px 10px; }
            .hide-sm { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <xsl:choose>
            <xsl:when test="s:sitemapindex">
              <xsl:call-template name="render-index" />
            </xsl:when>
            <xsl:when test="s:urlset">
              <xsl:call-template name="render-urlset" />
            </xsl:when>
            <xsl:otherwise>
              <header>
                <div class="brand">NovaLikes</div>
                <h1>XML Sitemap</h1>
                <p class="lead">Unrecognized sitemap document.</p>
              </header>
            </xsl:otherwise>
          </xsl:choose>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="render-index">
    <header>
      <div class="brand">NovaLikes</div>
      <h1>NovaLikes XML Sitemap Index</h1>
      <p class="lead">This sitemap index contains the XML sitemaps available for NovaLikes.</p>
      <p class="meta"><strong><xsl:value-of select="count(s:sitemapindex/s:sitemap)" /></strong> child sitemaps</p>
    </header>
    <div class="panel">
      <table>
        <thead>
          <tr>
            <th>Sitemap</th>
            <th>Type</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="s:sitemapindex/s:sitemap">
            <xsl:variable name="loc" select="s:loc" />
            <xsl:variable name="file" select="substring-after($loc, '/sitemaps/')" />
            <xsl:variable name="label">
              <xsl:call-template name="title-case">
                <xsl:with-param name="value" select="substring-before(concat($file, '.xml'), '.xml')" />
              </xsl:call-template>
            </xsl:variable>
            <tr>
              <td>
                <span class="name"><xsl:value-of select="$label" /></span>
                <a href="{$loc}"><xsl:value-of select="$loc" /></a>
              </td>
              <td><span class="type"><xsl:value-of select="$label" /></span></td>
              <td class="num muted">
                <xsl:choose>
                  <xsl:when test="s:lastmod"><xsl:value-of select="s:lastmod" /></xsl:when>
                  <xsl:otherwise>—</xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <xsl:template name="render-urlset">
    <xsl:variable name="has-changefreq" select="boolean(s:urlset/s:url/s:changefreq)" />
    <xsl:variable name="has-priority" select="boolean(s:urlset/s:url/s:priority)" />
    <xsl:variable name="has-lastmod" select="boolean(s:urlset/s:url/s:lastmod)" />
    <xsl:variable name="has-alts" select="boolean(s:urlset/s:url/xhtml:link)" />
    <header>
      <div class="brand">NovaLikes</div>
      <h1>NovaLikes XML Sitemap</h1>
      <p class="lead">This XML sitemap lists indexable URLs for search engines. The table below is a human-readable view.</p>
      <p class="meta"><strong><xsl:value-of select="count(s:urlset/s:url)" /></strong> URLs</p>
    </header>
    <div class="panel">
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <xsl:if test="$has-lastmod"><th>Last Modified</th></xsl:if>
            <xsl:if test="$has-changefreq"><th class="hide-sm">Change Frequency</th></xsl:if>
            <xsl:if test="$has-priority"><th>Priority</th></xsl:if>
            <xsl:if test="$has-alts"><th>Alternates</th></xsl:if>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="s:urlset/s:url">
            <tr>
              <td>
                <a href="{s:loc}"><xsl:value-of select="s:loc" /></a>
              </td>
              <xsl:if test="$has-lastmod">
                <td class="num muted">
                  <xsl:choose>
                    <xsl:when test="s:lastmod"><xsl:value-of select="s:lastmod" /></xsl:when>
                    <xsl:otherwise>—</xsl:otherwise>
                  </xsl:choose>
                </td>
              </xsl:if>
              <xsl:if test="$has-changefreq">
                <td class="hide-sm muted">
                  <xsl:choose>
                    <xsl:when test="s:changefreq"><xsl:value-of select="s:changefreq" /></xsl:when>
                    <xsl:otherwise>—</xsl:otherwise>
                  </xsl:choose>
                </td>
              </xsl:if>
              <xsl:if test="$has-priority">
                <td class="num muted">
                  <xsl:choose>
                    <xsl:when test="s:priority"><xsl:value-of select="s:priority" /></xsl:when>
                    <xsl:otherwise>—</xsl:otherwise>
                  </xsl:choose>
                </td>
              </xsl:if>
              <xsl:if test="$has-alts">
                <td>
                  <xsl:variable name="alt-count" select="count(xhtml:link)" />
                  <xsl:choose>
                    <xsl:when test="$alt-count &gt; 0">
                      <span class="alts">Alternates: <xsl:value-of select="$alt-count" /></span>
                    </xsl:when>
                    <xsl:otherwise><span class="muted">—</span></xsl:otherwise>
                  </xsl:choose>
                </td>
              </xsl:if>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <xsl:template name="title-case">
    <xsl:param name="value" />
    <xsl:choose>
      <xsl:when test="string-length($value) = 0" />
      <xsl:otherwise>
        <xsl:value-of select="translate(substring($value, 1, 1), 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')" />
        <xsl:value-of select="substring($value, 2)" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
`;
