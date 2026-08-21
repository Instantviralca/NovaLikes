import { titles as englishTitles } from '@/seo/titles';
import { descriptions as englishDescriptions } from '@/seo/descriptions';
import { getServiceBySlug } from '@/data/services';
import {
  CORE_SERVICE_SLUGS,
  HREFLANG,
  HTML_LANG,
  OG_LOCALE,
  TOOL_SLUGS,
  type Locale,
} from '@/lib/i18n/config';
import { hreflangMap, localizeHref } from '@/lib/i18n/paths';
import { absoluteUrl, buildCanonicalUrl } from '@/lib/seo/metadata/canonical';
import { buildPageMetadata } from '@/lib/seo/metadata/build';
import type { Metadata } from 'next';

export type LocalizedMetaCopy = {
  title: string;
  description: string;
};

export type LocaleMetadataBundle = {
  homepage: LocalizedMetaCopy;
  faq: LocalizedMetaCopy;
  about: LocalizedMetaCopy;
  contact: LocalizedMetaCopy;
  reviews: LocalizedMetaCopy;
  privacyPolicy: LocalizedMetaCopy;
  refundPolicy: LocalizedMetaCopy;
  termsAndConditions: LocalizedMetaCopy;
  cookiePolicy: LocalizedMetaCopy;
  disclaimer: LocalizedMetaCopy;
  services: Record<string, LocalizedMetaCopy>;
  toolsHub: LocalizedMetaCopy;
  tools: Record<string, LocalizedMetaCopy>;
};

const englishServiceMeta = (): Record<string, LocalizedMetaCopy> => {
  const services: Record<string, LocalizedMetaCopy> = {};
  for (const slug of CORE_SERVICE_SLUGS) {
    const service = getServiceBySlug(slug);
    if (!service) continue;
    services[slug] = {
      title: englishTitles.service(service),
      description: englishDescriptions.service(service),
    };
  }
  return services;
};

const englishToolMeta = (): Record<string, LocalizedMetaCopy> => ({
  'instagram-profile-picture-viewer': {
    title: englishTitles.instagramProfilePictureViewer(),
    description: englishDescriptions.instagramProfilePictureViewer(),
  },
  'instagram-follower-counter': {
    title: englishTitles.instagramFollowerCounter(),
    description: englishDescriptions.instagramFollowerCounter(),
  },
  'instagram-profile-viewer': {
    title: englishTitles.instagramProfileViewer(),
    description: englishDescriptions.instagramProfileViewer(),
  },
  'instagram-video-downloader': {
    title: englishTitles.instagramVideoDownloader(),
    description: englishDescriptions.instagramVideoDownloader(),
  },
  'tiktok-video-downloader': {
    title: englishTitles.tiktokVideoDownloader(),
    description: englishDescriptions.tiktokVideoDownloader(),
  },
  'tiktok-profile-picture-downloader': {
    title: englishTitles.tiktokProfilePictureDownloader(),
    description: englishDescriptions.tiktokProfilePictureDownloader(),
  },
  'facebook-video-downloader': {
    title: englishTitles.facebookVideoDownloader(),
    description: englishDescriptions.facebookVideoDownloader(),
  },
  'facebook-reels-downloader': {
    title: englishTitles.facebookReelsDownloader(),
    description: englishDescriptions.facebookReelsDownloader(),
  },
});

export function getEnglishMetadataBundle(): LocaleMetadataBundle {
  const tools = englishToolMeta();
  for (const slug of TOOL_SLUGS) {
    if (!tools[slug]) throw new Error(`Missing English tool metadata for ${slug}`);
  }
  return {
    homepage: {
      title: englishTitles.home(),
      description: englishDescriptions.home(),
    },
    faq: {
      title: englishTitles.company('FAQ'),
      description: englishDescriptions.faq(),
    },
    about: {
      title: englishTitles.company('About'),
      description: englishDescriptions.about(),
    },
    contact: {
      title: englishTitles.company('Contact'),
      description: englishDescriptions.contact(),
    },
    reviews: {
      title: englishTitles.company('Reviews'),
      description: englishDescriptions.reviews(),
    },
    privacyPolicy: {
      title: englishTitles.legal('Privacy Policy'),
      description: englishDescriptions.privacyPolicy(),
    },
    refundPolicy: {
      title: englishTitles.legal('Refund Policy'),
      description: englishDescriptions.refundPolicy(),
    },
    termsAndConditions: {
      title: englishTitles.legal('Terms and Conditions'),
      description: englishDescriptions.termsAndConditions(),
    },
    cookiePolicy: {
      title: englishTitles.legal('Cookie Policy'),
      description: englishDescriptions.cookiePolicy(),
    },
    disclaimer: {
      title: englishTitles.legal('Disclaimer'),
      description: englishDescriptions.disclaimer(),
    },
    services: englishServiceMeta(),
    toolsHub: {
      title: englishTitles.toolsHub(),
      description: englishDescriptions.toolsHub(),
    },
    tools,
  };
}

export function buildLocaleMetadata(options: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const { locale, pathname, title, description } = options;
  const canonicalPath = localizeHref(pathname, locale);
  const languages: Record<string, string> = {};
  const hrefs = hreflangMap(pathname);
  for (const [code, path] of Object.entries(hrefs)) {
    languages[code] = absoluteUrl(path);
  }

  const metadata = buildPageMetadata({
    title,
    description,
    path: canonicalPath,
    type: 'website',
    robots: { index: true, follow: true },
  });

  return {
    ...metadata,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages,
    },
    openGraph: {
      ...(metadata.openGraph ?? {}),
      locale: OG_LOCALE[locale],
      url: buildCanonicalUrl(canonicalPath),
    },
    other: {
      language: HTML_LANG[locale],
      'content-language': HTML_LANG[locale],
    },
  };
}

export function hreflangLanguages(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const [code, path] of Object.entries(hreflangMap(pathname))) {
    languages[code] = absoluteUrl(path);
  }
  return languages;
}

export { HREFLANG };
