import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SiteV2Shell } from '@/components/site-v2/site-v2-shell';
import { IllustratedToolHero } from '@/components/tools/illustrated-tool-hero';
import { SnapArt } from '@/components/tools/instagram-profile-viewer/visuals';
import { ToolFaqV2 } from '@/components/tools/site-v2/tool-faq-v2';
import {
  buildToolTabs,
  CheckList,
  PkgCards,
  SeeIcon,
  ToolCard,
} from '@/components/tools/site-v2/tool-v2-parts';
import { routes } from '@/config/routes';
import { ILLUSTRATED_TOOL_LAYOUT } from '@/data/tools/illustrated-layout';
import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';
import type { ToolPageCopy } from '@/data/tools/copy';
import { getRelatedTools, type ToolDefinition } from '@/data/tools/registry';
import { getRelatedServicesForTool } from '@/data/tools/related-services';
import type { ToolSlug } from '@/lib/tools/types';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
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
  const layout =
    ILLUSTRATED_TOOL_LAYOUT[tool.slug as Exclude<ToolSlug, 'instagram-profile-viewer'>];
  const related = relatedTools ?? getRelatedTools(tool.slug);
  const services = getRelatedServicesForTool(tool.slug).map((service) => ({
    ...service,
    url: localizeHref(service.url, locale),
  }));
  const primaryService = services[0];
  const steps = copy.howToUse.slice(0, 3);
  const copyLayout = layoutCopy;
  const hubHref = toolsHref ?? localizeHref(routes.tools, locale);

  if (!layout) return null;

  const crumbs = [
    { label: homeLabel, href: localizeHref(routes.home, locale) },
    { label: toolsLabel, href: hubHref },
    { label: tool.name },
  ];
  const tabs = buildToolTabs(tool, related);
  const editorialHeading = copyLayout?.editorialHeading ?? layout.editorialHeading;
  const seeHeading = copyLayout?.seeHeading ?? layout.seeHeading;
  const seeItems = copyLayout?.seeItems ?? layout.seeItems;
  const noteList = copy.notes.slice(1);
  const hasInfo = copy.how.length > 0 || copy.supported.length > 0 || noteList.length > 0;

  return (
    <SiteV2Shell>
      <IllustratedToolHero tool={tool} copy={copy} crumbs={crumbs} tabs={tabs} chrome={chrome} />

      {editorialHeading || copy.intro.length ? (
        <section className="sec">
          <div className="wrap split">
            <div className="body">
              <h2 className="h2">{editorialHeading}</h2>
              {copy.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="art" aria-hidden="true">
              <SnapArt name={layout.editorialArt} className="mix-blend-multiply" />
            </div>
          </div>
        </section>
      ) : null}

      {seeItems.length ? (
        <section className="sec grey">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{seeHeading}</h2>
            </div>
            <div className={seeItems.length === 4 ? 'feat-cards four' : 'feat-cards'}>
              {seeItems.map((item, index) => (
                <div key={item.title} className="fcard rv-up">
                  <span className="fi">
                    <SeeIcon art={layout.seeItems[index]?.art ?? 'see-photo'} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {hasInfo ? (
        <section className="sec" data-section="tool-details">
          <div className="wrap">
            <div className="info-cards">
              {copy.how.length ? (
                <div className="icard rv-up">
                  <h2>{copy.howHeading}</h2>
                  {copy.how.map((paragraph, index) => (
                    <p key={paragraph} style={index > 0 ? { marginTop: 10 } : undefined}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
              {copy.supported.length ? (
                <div className="icard rv-up">
                  <h2>{copy.supportedHeading}</h2>
                  {copy.supportedIntro ? (
                    <p style={{ marginBottom: 10 }}>{copy.supportedIntro}</p>
                  ) : null}
                  <CheckList items={copy.supported} />
                </div>
              ) : null}
              {noteList.length ? (
                <div className="icard no rv-up">
                  <h2>{copy.notesHeading}</h2>
                  <CheckList items={noteList} variant="x" />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {steps.length ? (
        <section className="sec grey">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{chrome.howToUseIt}</h2>
            </div>
            <div className="steps-row">
              {steps.map((step, index) => (
                <div key={step} className="step rv-up">
                  <span className="n">
                    <span className="sr">{chrome.stepLabel.replace('{n}', String(index + 1))} </span>
                    <span aria-hidden="true">{index + 1}</span>
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            {copy.notes[0] ? (
              <p className="step-note">
                <strong>{copyLayout?.privacyLead ?? layout.privacyLead}</strong> {copy.notes[0]}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{copyLayout?.relatedHeading ?? layout.relatedHeading}</h2>
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
        <section className="sec grey">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2 className="h2">{copyLayout?.ctaHeading ?? layout.ctaHeading}</h2>
                <p className="lead">{chrome.toolIsFreeNote}</p>
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
        <section className="sec">
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
