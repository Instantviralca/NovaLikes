import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowRight, Heart, Lock, MessageCircle, Play, ThumbsUp, Users } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { IllustratedToolHero } from '@/components/tools/illustrated-tool-hero';
import {
  HeroWash,
  PageDoodles,
  SnapArt,
  Squiggle,
  StepArrow,
} from '@/components/tools/instagram-profile-viewer/visuals';
import { Faq } from '@/components/sections/faq';
import { Heading } from '@/components/typography/heading';
import { routes } from '@/config/routes';
import { ILLUSTRATED_TOOL_LAYOUT, relatedToolArt } from '@/data/tools/illustrated-layout';
import type { ToolPageCopy } from '@/data/tools/copy';
import { getRelatedTools, type ToolDefinition } from '@/data/tools/registry';
import { getRelatedServicesForTool } from '@/data/tools/related-services';
import type { ToolSlug } from '@/lib/tools/types';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';
import type { ToolLayoutCopy } from '@/lib/i18n/content/tools-english';

const SERVICE_LABEL: Record<string, string> = {
  'buy-instagram-followers': 'Instagram Followers',
  'buy-instagram-likes': 'Instagram Likes',
  'buy-instagram-views': 'Instagram Views',
  'buy-instagram-comments': 'Instagram Comments',
  'buy-tiktok-followers': 'TikTok Followers',
  'buy-tiktok-likes': 'TikTok Likes',
  'buy-tiktok-views': 'TikTok Views',
  'buy-facebook-followers': 'Facebook Followers',
  'buy-facebook-page-likes': 'Facebook Page Likes',
  'buy-facebook-post-likes': 'Facebook Post Likes',
};

const SERVICE_ICON: Record<string, typeof Users> = {
  'buy-instagram-followers': Users,
  'buy-instagram-likes': Heart,
  'buy-instagram-views': Play,
  'buy-instagram-comments': MessageCircle,
  'buy-tiktok-followers': Users,
  'buy-tiktok-likes': Heart,
  'buy-tiktok-views': Play,
  'buy-facebook-followers': Users,
  'buy-facebook-page-likes': ThumbsUp,
  'buy-facebook-post-likes': ThumbsUp,
};

type Props = {
  tool: ToolDefinition;
  copy: ToolPageCopy;
  locale?: Locale;
  chrome?: ToolChrome;
  layoutCopy?: ToolLayoutCopy;
  relatedTools?: ToolDefinition[];
  homeLabel?: string;
  toolsLabel?: string;
  toolsHref?: string;
};

export function IllustratedToolPage({
  tool,
  copy,
  locale = DEFAULT_LOCALE,
  chrome = ENGLISH_TOOL_CHROME,
  layoutCopy,
  relatedTools,
  homeLabel = 'Home',
  toolsLabel = 'Tools',
  toolsHref,
}: Props) {
  const layout = ILLUSTRATED_TOOL_LAYOUT[tool.slug as Exclude<ToolSlug, 'instagram-profile-viewer'>];
  const related = relatedTools ?? getRelatedTools(tool.slug);
  const services = getRelatedServicesForTool(tool.slug).map((service) => ({
    ...service,
    url: localizeHref(service.url, locale),
  }));
  const primaryService = services[0];
  const steps = copy.howToUse;
  const copyLayout = layoutCopy;
  const hubHref = toolsHref ?? localizeHref(routes.tools, locale);

  if (!layout) return null;

  if (!layout) return null;

  return (
    <div className="relative bg-[#FFFBFA]">
      <PageDoodles className="pointer-events-none absolute inset-0 h-full w-full" />
      <Section spacing="none" className="relative overflow-x-hidden bg-transparent pb-10 pt-4 md:pb-14 md:pt-6">
        <HeroWash className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container size="xl" className="relative">
          <Breadcrumb
            items={[
              { label: homeLabel, href: localizeHref(routes.home, locale) },
              { label: toolsLabel, href: hubHref },
              { label: tool.name },
            ]}
            sourceSlug={tool.slug}
          />
          <IllustratedToolHero
            tool={tool}
            copy={copy}
            accentWord={copyLayout?.accentWord ?? layout.accentWord}
            heroArt={layout.heroArt}
            chrome={chrome}
          />
        </Container>
      </Section>

      <Section spacing="none" className="relative bg-transparent py-14 md:py-20">
        <Container size="xl" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="max-w-xl">
            <Heading as="h2" size="h2" className="text-[1.75rem] leading-tight sm:text-[2.05rem]">
              {copyLayout?.editorialHeading ?? layout.editorialHeading}
            </Heading>
            <Squiggle className="mt-2 h-4 w-16" color="#E85D04" />
            <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)]">{copy.intro[0]}</p>
          </div>
          <SnapArt name={layout.editorialArt} className="justify-self-center mix-blend-multiply lg:max-w-lg" />
        </Container>
      </Section>

      <Section spacing="none" className="relative bg-transparent pb-6 md:pb-10">
        <Container size="xl">
          <div className="rounded-[2.25rem] bg-[#EEE8FA] px-6 py-12 sm:px-10 md:px-14 md:py-16">
            <Heading as="h2" size="h2" className="text-center text-[1.75rem] sm:text-[2.05rem]">
              {copyLayout?.seeHeading ?? layout.seeHeading}
            </Heading>
            <Squiggle className="mx-auto mt-2 h-4 w-16" />
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {(copyLayout?.seeItems ?? layout.seeItems).map((item, index) => (
                <div key={item.title} className="flex items-center gap-4">
                  <SnapArt name={layout.seeItems[index]?.art ?? 'see-photo'} className="size-28 shrink-0 mix-blend-multiply sm:size-32" />
                  <div>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">{item.title}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="relative bg-transparent py-14 md:py-20">
        <Container size="xl">
            <Heading as="h2" size="h2" className="text-center text-[1.75rem] sm:text-[2.05rem]">
              {chrome.howToUseIt}
            </Heading>
          <Squiggle className="mx-auto mt-2 h-4 w-16" color="#E85D04" />
          <ol className="mt-10 grid list-none gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-2">
            {steps.slice(0, 3).map((step, index) => (
              <Fragment key={step}>
                {index > 0 ? (
                  <li key={`arrow-${index}`} className="hidden items-center md:flex md:h-36" aria-hidden="true">
                    <StepArrow className="h-6 w-16" />
                  </li>
                ) : null}
                <li key={step} className="text-center">
                  <SnapArt
                    name={index === 0 ? 'step-search' : index === 1 ? 'step-scan' : 'step-done'}
                    className="mx-auto max-w-[16rem] mix-blend-multiply"
                  />
                  <p className="mt-4 text-sm font-semibold text-[var(--brand-primary)]">
                    {chrome.stepLabel.replace('{n}', String(index + 1))}
                  </p>
                  <p className="mt-1 font-semibold text-[var(--text-primary)]">{step}</p>
                </li>
              </Fragment>
            ))}
          </ol>
          <p className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-2xl bg-[#FFF6E8] px-4 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            <Lock className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" aria-hidden="true" />
            <span>
              <span className="font-semibold text-[var(--text-primary)]">
                {copyLayout?.privacyLead ?? layout.privacyLead}{' '}
              </span>
              {copy.notes[0]}
            </span>
          </p>
        </Container>
      </Section>

      {related.length ? (
        <Section spacing="none" className="relative bg-transparent pb-6">
          <Container size="xl">
            <Heading as="h2" size="h2" className="text-[1.75rem] sm:text-[2.05rem]">
              {copyLayout?.relatedHeading ?? layout.relatedHeading}
            </Heading>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="group block min-h-11 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <SnapArt
                      name={relatedToolArt(item.slug)}
                      className="mix-blend-multiply transition-transform duration-200 group-hover:-translate-y-1"
                    />
                    <p className="mt-4 text-lg font-semibold leading-snug text-[var(--text-primary)]">{item.name}</p>
                    {item.status !== 'working' ? (
                      <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{item.availabilityLabel}</p>
                    ) : null}
                    <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
                      {chrome.openTool}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link
                href={hubHref}
                className="font-medium text-[var(--brand-primary)] underline-offset-2 hover:underline"
              >
                {chrome.allFreeTools}
              </Link>
            </p>
          </Container>
        </Section>
      ) : null}

      {services.length ? (
        <Section spacing="none" className="relative bg-transparent py-8 md:py-12">
          <Container size="xl">
            <div className="overflow-hidden rounded-[2.25rem] bg-[#FFF1E4] px-6 py-12 sm:px-10 md:px-14 md:py-14">
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
                <SnapArt name="cta-growth" className="max-w-md justify-self-center mix-blend-multiply lg:max-w-none" />
                <div>
                  <Heading as="h2" size="h2" className="text-[1.75rem] sm:text-[2.05rem]">
                    {copyLayout?.ctaHeading ?? layout.ctaHeading}
                  </Heading>
                  <p className="mt-3 max-w-md text-[var(--text-secondary)]">{chrome.toolIsFreeNote}</p>
                  <ul className="mt-6 flex flex-wrap gap-6">
                    {services.map((service) => {
                      const Icon = SERVICE_ICON[service.slug] ?? Users;
                      return (
                        <li key={service.slug}>
                          <Link
                            href={service.url}
                            className="inline-flex min-h-11 flex-col items-center gap-2 text-sm font-semibold text-[var(--text-primary)]"
                          >
                            <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-[var(--brand-primary)]">
                              <Icon className="size-5" aria-hidden="true" />
                            </span>
                            {chrome.serviceLabels[service.slug] ?? SERVICE_LABEL[service.slug] ?? service.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {primaryService ? (
                    <Link
                      href={primaryService.url}
                      className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] underline-offset-4 hover:underline"
                    >
                      {chrome.exploreServices}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="none" className="relative bg-transparent py-14 md:py-16">
        <Container size="lg">
          <Faq title={chrome.faqTitle} items={copy.faqs} enhanced={false} />
        </Container>
      </Section>
    </div>
  );
}
