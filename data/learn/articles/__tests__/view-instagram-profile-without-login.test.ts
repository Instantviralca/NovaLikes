import { describe, expect, it } from 'vitest';

import { VIEW_INSTAGRAM_PROFILE_WITHOUT_LOGIN_ARTICLE as article } from '@/data/learn/articles/view-instagram-profile-without-login';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { getIndexableArticles } from '@/lib/learn/article-seo';
import { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';
import { calculateReadingTime } from '@/lib/learn/article';

describe('Article #26 How to view a public Instagram profile without logging in', () => {
  it('is published with the original Wednesday 21 October 2026 editorial date', () => {
    expect(article.slug).toBe('view-instagram-profile-without-login');
    expect(article.status).toBe('published');
    expect(article.scheduledAt).toBe('2026-10-21T08:00:00.000Z');
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
      'How to View a Public Instagram Profile Without Logging In',
    );
    expect(article.seo.title).toBe(
      'View a Public Instagram Profile Without Logging In',
    );
    expect(article.seo.canonicalPath).toBe(
      '/learn/view-instagram-profile-without-login',
    );
    expect(article.seo.keywords?.[0]).toBe(
      'view Instagram profile without login',
    );
    expect(article.relatedServices).toEqual([]);
    expect(article.relatedArticles).toEqual([
      'public-vs-private-instagram-account',
      'view-instagram-profile-picture-full-size',
      'check-instagram-follower-count-without-login',
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
          block.heading === 'View a Public Instagram Profile' &&
          block.label === 'Open Instagram Profile Viewer' &&
          block.href === '/tools/instagram-profile-viewer',
      ),
    ).toBe(true);
    expect(getLearnArticleClosingCta(article)).toEqual({
      heading: 'View a Public Instagram Profile',
      text: 'Enter an Instagram username to check the public profile information currently available for that account. No Instagram password is required.',
      href: '/tools/instagram-profile-viewer',
      label: 'Open Instagram Profile Viewer',
    });
    expect(article.blocks.some((block) => block.type === 'comparison_table')).toBe(
      true,
    );
    expect(article.content).toContain(
      'public to everyone on or off Instagram',
    );
    expect(article.content).toContain(
      'No Instagram password should be required',
    );
    expect(article.content).toContain(
      'not a private-account unlocker',
    );
    expect(article.content).toContain(
      'Private, hidden or login-gated profiles can return an error',
    );
    expect(article.content).toContain(
      'does not list posts, Stories or Highlights',
    );
    expect(article.content).not.toMatch(/100% anonymous and untraceable browsing/i);
    expect(
      article.blocks.some(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some((link) =>
            link.href.startsWith('https://m.facebook.com'),
          ),
      ),
    ).toBe(false);
    expect(
      article.blocks.filter(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/instagram-profile-picture-viewer',
          ),
      ),
    ).toHaveLength(1);
    expect(
      article.blocks.filter(
        (block) =>
          block.type === 'paragraph' &&
          block.inlineLinks?.some(
            (link) => link.href === '/tools/instagram-follower-counter',
          ),
      ),
    ).toHaveLength(1);
  });

  it('adds the English Learn URL to the sitemap and never a locale-prefixed URL', () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(
      'https://novalikes.com/learn/view-instagram-profile-without-login',
    );
    expect(
      urls.some((url) =>
        url.includes('/es/learn/view-instagram-profile-without-login'),
      ),
    ).toBe(false);
  });

  it('has a local featured image and a matching reading time', () => {
    expect(article.featuredImage?.src).toBe(
      '/assets/images/learn/view-instagram-profile-without-login/featured.png',
    );
    expect(article.readingTime).toBe(calculateReadingTime(article.blocks));
  });
});
