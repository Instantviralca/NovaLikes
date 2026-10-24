import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SiteV2Shell } from '@/components/site-v2/site-v2-shell';
import { InstagramProfileViewerHero } from '@/components/tools/instagram-profile-viewer/hero';
import { SnapArt, type SnapArtName } from '@/components/tools/instagram-profile-viewer/visuals';
import { ToolFaqV2 } from '@/components/tools/site-v2/tool-faq-v2';
import {
  buildToolTabs,
  PkgCards,
  SeeIcon,
  ToolCard,
} from '@/components/tools/site-v2/tool-v2-parts';
import { routes } from '@/config/routes';
import type { ToolPageCopy } from '@/data/tools/copy';
import { getRelatedTools, type ToolDefinition } from '@/data/tools/registry';
import { getRelatedServicesForTool } from '@/data/tools/related-services';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';
import type { ToolsBundle } from '@/lib/i18n/content/tools-english';

const SERVICE_LABEL: Record<string, string> = {
  'buy-instagram-followers': 'Instagram Followers',
  'buy-instagram-likes': 'Instagram Likes',
  'buy-instagram-views': 'Instagram Views',
};

const SEE_ART: SnapArtName[] = ['see-photo', 'see-bio', 'see-followers', 'see-posts'];

type Props = {
  tool: ToolDefinition;
  copy: ToolPageCopy;
  locale?: Locale;
  chrome?: ToolChrome;
  profileViewer?: ToolsBundle['profileViewer'];
  relatedTools?: ToolDefinition[];
  homeLabel?: string;
  toolsLabel?: string;
  toolsHref?: string;
};

export function InstagramProfileViewerPage({
  tool,
  copy,
  locale = DEFAULT_LOCALE,
  chrome = ENGLISH_TOOL_CHROME,
  profileViewer,
  relatedTools,
  homeLabel = 'Home',
  toolsLabel = 'Tools',
  toolsHref,
}: Props) {
  const related = relatedTools ?? getRelatedTools(tool.slug);
  const services = getRelatedServicesForTool(tool.slug).map((service) => ({
    ...service,
    url: localizeHref(service.url, locale),
  }));
  const primaryService = services[0];
  const pv = profileViewer;
  const hubHref = toolsHref ?? localizeHref(routes.tools, locale);

  const crumbs = [
    { label: homeLabel, href: localizeHref(routes.home, locale) },
    { label: toolsLabel, href: hubHref },
    { label: tool.name },
  ];
  const tabs = buildToolTabs(tool, related);

  const seeItems = pv?.seeItems ?? [
    {
      title: 'Profile Photo',
      text: 'The public avatar, shown large enough to inspect.',
    },
    {
      title: 'Bio & Username',
      text: 'Display name, @username, and biography when they are public.',
    },
    {
      title: 'Followers',
      text: 'The published label, including abbreviations such as 104M.',
    },
    {
      title: 'Following & Posts',
      text: 'Included when Instagram prints those counts on the public profile.',
    },
  ];
  const howSteps = pv?.howSteps ?? [
    'Enter a username or profile URL',
    'NovaLikes checks the public profile',
    'View the available profile details',
  ];

  return (
    <SiteV2Shell>
      <InstagramProfileViewerHero
        tool={tool}
        copy={{
          h1: copy.h1,
          lead: copy.lead,
          inputLabel: copy.inputLabel,
          helperText: copy.helperText,
          processingLabel: copy.processingLabel,
          resetLabel: copy.resetLabel,
        }}
        crumbs={crumbs}
        tabs={tabs}
        chrome={chrome}
      />

      <section className="sec">
        <div className="wrap split">
          <div className="body">
            <h2 className="h2">
              {pv?.editorialHeading ?? 'A Clearer Look at a Public Instagram Profile'}
            </h2>
            <p>
              {pv?.editorialBody ??
                'Instagram keeps the public identity block small. This viewer brings that block into one view: the profile photo, display name, username, biography, and the Followers, Following, and Posts labels Instagram already prints. Large audiences stay abbreviated when Instagram writes 104M or 872K. Private profiles, Stories, and Highlights stay out of reach.'}
            </p>
          </div>
          <div className="art" aria-hidden="true">
            <SnapArt name="editorial-card" className="mix-blend-multiply" />
          </div>
        </div>
      </section>

      <section className="sec grey">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">{pv?.seeHeading ?? 'What Can You See?'}</h2>
          </div>
          <div className={seeItems.length === 4 ? 'feat-cards four' : 'feat-cards'}>
            {seeItems.map((item, index) => (
              <div key={item.title} className="fcard rv-up">
                <span className="fi">
                  <SeeIcon art={SEE_ART[index] ?? 'see-photo'} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2">{pv?.howHeading ?? chrome.howToUseIt}</h2>
          </div>
          <div className="steps-row">
            {howSteps.map((step, index) => (
              <div key={step} className="step rv-up">
                <span className="n">
                  <span className="sr">{chrome.stepLabel.replace('{n}', String(index + 1))} </span>
                  <span aria-hidden="true">{index + 1}</span>
                </span>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <p className="step-note">
            <strong>{pv?.privacyLead ?? 'Public profiles only.'}</strong>{' '}
            {pv?.privacyBody ??
              'NovaLikes does not bypass Instagram privacy settings. Private profile content, Stories and Highlights are not available through this tool.'}
          </p>
        </div>
      </section>

      {related.length ? (
        <section className="sec grey">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{pv?.relatedHeading ?? 'More Instagram Tools'}</h2>
              <Link href={hubHref} className="tlink">
                {chrome.allFreeTools}
                <ArrowRight className="ic rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
            <div className="tool-cards three">
              {related.map((item) => (
                <ToolCard key={item.slug} tool={item} chrome={chrome} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {services.length ? (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2 className="h2">
                  {pv?.ctaHeading ?? 'Looking to Grow Your Instagram Presence?'}
                </h2>
                <p className="lead">
                  {pv?.ctaNote ??
                    'This viewer is free. Package pages are separate if you also want to grow a public account.'}
                </p>
              </div>
              {primaryService ? (
                <Link href={primaryService.url} className="tlink">
                  {chrome.exploreServices}
                  <ArrowRight className="ic rtl:rotate-180" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
            <PkgCards
              services={services}
              labelFor={(service) =>
                chrome.serviceLabels[service.slug] ??
                SERVICE_LABEL[service.slug] ??
                service.name
              }
            />
          </div>
        </section>
      ) : null}

      {copy.faqs.length ? (
        <section className="sec grey">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              {chrome.faqTitle}
            </h2>
            <ToolFaqV2 items={copy.faqs} />
          </div>
        </section>
      ) : null}
    </SiteV2Shell>
  );
}
