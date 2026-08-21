import { describe, expect, it } from 'vitest';

import { HOW_TO_DOWNLOAD_FACEBOOK_REEL_ARTICLE as article } from '@/data/learn/articles/how-to-download-facebook-reel';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #24 How to download a public Facebook Reel', () => {
  it('is published with the original Friday 16 October 2026 editorial date', () => {
    expect(article.slug).toBe('how-to-download-facebook-reel');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-16T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('facebook');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps utility-tool intent and does not add a service-package CTA', () => {
    expect(article.title).toBe('How to Download a Public Facebook Reel');
    expect(article.seo.title).toBe('How to Download a Public Facebook Reel');
    expect(article.seo.canonicalPath).toBe('/learn/how-to-download-facebook-reel');
    expect(article.seo.keywords?.[0]).toBe('download Facebook Reel');
    expect(article.relatedServices).toEqual([]);
    expect(article.relatedArticles).toEqual(['how-to-download-facebook-video']);

    const commercial = article.blocks.flatMap((block) =>
      block.type === 'paragraph'
        ? (block.inlineLinks ?? []).filter((link) => link.href.startsWith('/buy-'))
        : [],
    );
    expect(commercial).toEqual([]);
    expect(
      article.blocks.filter((block) => block.type === 'figure'),
    ).toHaveLength(3);
    expect(
      article.blocks.some((block) => block.type === 'service_cluster_cta'),
    ).toBe(false);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'internal_cta' &&
          block.heading === 'Download a Public Facebook Reel' &&
          block.label === 'Open Facebook Reels Downloader' &&
          block.href === '/tools/facebook-reels-downloader',
      ),
    ).toBe(true);
    expect(getLearnArticleClosingCta(article)).toEqual({
      heading: 'Download a Public Facebook Reel',
      text: 'Paste a supported public Facebook Reel link to check the available media options. HD or SD may be shown depending on what Facebook exposes for the source.',
      href: '/tools/facebook-reels-downloader',
      label: 'Open Facebook Reels Downloader',
    });
    expect(article.blocks.some((block) => block.type === 'comparison_table')).toBe(
      true,
    );
    expect(article.content).toContain(
      'all videos posted to Facebook are shared as Reels',
    );
    expect(article.content).toContain('No Facebook password should be required');
    expect(article.content).toContain('does not mean copyright-free');
    expect(article.content).toContain(
      'should not be used as a private-content bypass',
    );
    expect(article.content).not.toMatch(/every Reel in 4K/i);
    expect(article.content).not.toMatch(/copyright-free Facebook Reel/i);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) =>
              link.href === '/tools/facebook-video-downloader' &&
              link.label === 'Facebook Video Downloader',
          ),
      ),
    ).toBe(true);
    expect(
      article.blocks.filter(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/facebook-video-downloader',
          ),
      ),
    ).toHaveLength(1);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) =>
              link.href === '/learn/how-to-download-facebook-video' &&
              link.label === 'how to download a public Facebook video',
          ),
      ),
    ).toBe(true);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) =>
            link.href.startsWith('https://m.facebook.com'),
          ),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/how-to-download-facebook-reel',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/how-to-download-facebook-reel'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/how-to-download-facebook-reel/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
