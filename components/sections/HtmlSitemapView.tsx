import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { routes } from '@/config/routes';
import {
  getPublicDirectorySections,
  type PublicDirectorySection,
} from '@/data/seo/public-directory';
import { LOCALIZED_LOCALES, LOCALE_NATIVE_NAMES } from '@/lib/i18n/config';
import { CORE_SERVICE_SLUGS, TOOL_SLUGS } from '@/lib/i18n/config';
import { loadUi, loadToolsBundle } from '@/lib/i18n/content/load';
import { localizeHref } from '@/lib/i18n/paths';

function SitemapSection({ section }: { section: PublicDirectorySection }) {
  return (
    <section aria-labelledby={`sitemap-${section.id}-heading`}>
      <Heading as="h2" size="h3" id={`sitemap-${section.id}-heading`}>
        {section.title}
      </Heading>
      <ul className="mt-4 space-y-2.5">
        {section.links.map((link) => (
          <li key={`${section.id}-${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--brand-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HtmlSitemapView() {
  const sections = getPublicDirectorySections();
  const languageSections = LOCALIZED_LOCALES.map((locale) => {
    const ui = loadUi(locale);
    return {
      id: `lang-${locale}`,
      title: LOCALE_NATIVE_NAMES[locale],
      links: [
        { href: localizeHref('/', locale), label: ui.nav.home },
        ...CORE_SERVICE_SLUGS.map((slug) => ({
          href: localizeHref(`/${slug}`, locale),
          label: ui.services[slug],
        })),
        { href: localizeHref('/faq', locale), label: ui.footer.faq },
        { href: localizeHref('/about', locale), label: ui.footer.aboutNovaLikes },
        { href: localizeHref('/contact', locale), label: ui.footer.contact },
        { href: localizeHref('/reviews', locale), label: ui.footer.reviews },
        { href: localizeHref('/tools', locale), label: ui.nav.tools },
        ...TOOL_SLUGS.map((slug) => ({
          href: localizeHref(`/tools/${slug}`, locale),
          label: loadToolsBundle(locale).registry[slug].name,
        })),
      ],
    } satisfies PublicDirectorySection;
  });

  return (
    <Section spacing="md" className="bg-transparent" aria-labelledby="sitemap-heading">
      <Container size="xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: routes.home },
            { label: 'Sitemap', href: routes.sitemap },
          ]}
        />
        <Heading as="h1" size="h1" id="sitemap-heading" className="mt-6">
          NovaLikes Sitemap
        </Heading>
        <Lead className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          Find the main pages, social media services, free tools, guides and policies available on
          NovaLikes.
        </Lead>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <SitemapSection key={section.id} section={section} />
          ))}
        </div>

        <Heading as="h2" size="h2" className="mt-14">
          Languages
        </Heading>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          Core commercial pages, free tools, About, Contact and Reviews are also available in
          Spanish, German, French, Italian, Brazilian Portuguese and Arabic. Legal and Learn pages
          remain in English.
        </p>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {languageSections.map((section) => (
            <SitemapSection key={section.id} section={section} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
