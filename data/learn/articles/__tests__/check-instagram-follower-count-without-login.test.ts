import { describe, expect, it } from 'vitest';

import { CHECK_INSTAGRAM_FOLLOWER_COUNT_WITHOUT_LOGIN_ARTICLE as article } from '@/data/learn/articles/check-instagram-follower-count-without-login';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #23 How to check an Instagram follower count without logging in', () => {
  it('is published with the original Wednesday 14 October 2026 editorial date', () => {
    expect(article.slug).toBe('check-instagram-follower-count-without-login');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-14T08:00:00.000Z');
    expect(article.published).toBe(true);
    expect(article.category).toBe('instagram');
    expect(article.editorialApproved).toBe(true);
    expect(isPublicLiveArticle(article)).toBe(true);
    expect(getPublishedLearnArticleBySlug(article.slug)?.slug).toBe(article.slug);
    expect(getIndexableArticles().some((item) => item.slug === article.slug)).toBe(
      true,
    );
  });

  it('keeps utility-tool intent and does not add a service-package CTA', () => {
    expect(article.title).toBe(
      'How to Check an Instagram Follower Count Without Logging In',
    );
    expect(article.seo.title).toBe(
      'Check Instagram Follower Count Without Logging In',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/check-instagram-follower-count-without-login',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'check Instagram follower count without login',
    );
    expect(article.relatedServices).toEqual([]);
    expect(article.relatedArticles).toEqual([
      'instagram-followers-vs-likes-vs-views-vs-comments',
      'why-instagram-followers-drop',
      'public-vs-private-instagram-account',
      'view-instagram-profile-without-login',
    ]);

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
          block.heading === 'Check an Instagram Follower Count' &&
          block.label === 'Open Instagram Follower Counter' &&
          block.href === '/tools/instagram-follower-counter',
      ),
    ).toBe(true);
    expect(getLearnArticleClosingCta(article)).toEqual({
      heading: 'Check an Instagram Follower Count',
      text: 'Enter an Instagram username to check the follower count currently available from its public profile information. No Instagram password is required.',
      href: '/tools/instagram-follower-counter',
      label: 'Open Instagram Follower Counter',
    });
    expect(article.blocks.some((block) => block.type === 'comparison_table')).toBe(
      true,
    );
    expect(article.content).toContain(
      'always public. This applies to both public and private accounts',
    );
    expect(article.content).toContain('No Instagram password is required');
    expect(article.content).toContain(
      'should not invent additional precision',
    );
    expect(article.content).toContain(
      'Private, hidden or login-gated profiles can return an error',
    );
    expect(article.content).toContain(
      'should never market the Follower Counter as a way to see private followers, unlock a hidden follower list',
    );
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/instagram-profile-viewer',
          ),
      ),
    ).toBe(true);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/instagram-profile-picture-viewer',
          ),
      ),
    ).toBe(false);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/check-instagram-follower-count-without-login',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/check-instagram-follower-count-without-login'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/check-instagram-follower-count-without-login/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
