import { Download, Music2 } from 'lucide-react';

import { CameraSquare } from '@/components/marketing/service-v1/icons';
import { SiteV2Shell } from '@/components/site-v2/site-v2-shell';
import { platformName } from '@/components/tools/platform-mark';
import {
  CheckIcon,
  PkgCards,
  PlatformTile,
  ToolCard,
  ToolCrumbs,
} from '@/components/tools/site-v2/tool-v2-parts';
import { routes } from '@/config/routes';
import { TOOLS_HUB_COPY } from '@/data/tools/copy';
import { getHubServiceLinks } from '@/data/tools/related-services';
import { TOOLS, type ToolDefinition } from '@/data/tools/registry';
import type { ToolPlatform } from '@/lib/tools/types';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
import { ENGLISH_TOOL_CHROME } from '@/data/tools/chrome';
import type { ToolsBundle } from '@/lib/i18n/content/tools-english';

const ORDER: ToolPlatform[] = ['instagram', 'tiktok', 'facebook'];

const SERVICE_PILL: Record<string, string> = {
  'buy-instagram-followers': 'Instagram Followers Packages',
  'buy-tiktok-followers': 'TikTok Followers Packages',
  'buy-facebook-followers': 'Facebook Followers Packages',
};

type ToolsHubViewProps = {
  locale?: Locale;
  bundle?: ToolsBundle;
  homeLabel?: string;
  toolsLabel?: string;
};

export function ToolsHubView({
  locale = DEFAULT_LOCALE,
  bundle,
  homeLabel = 'Home',
  toolsLabel = 'Tools',
}: ToolsHubViewProps) {
  const chrome = bundle?.chrome ?? ENGLISH_TOOL_CHROME;
  const hub = bundle?.hub ?? {
    ...TOOLS_HUB_COPY,
    h1Accent: 'Tools',
    packagesHeading: 'Optional NovaLikes Packages',
  };
  const toolsHref = localizeHref(routes.tools, locale);
  const services = getHubServiceLinks().map((service) => ({
    ...service,
    url: localizeHref(service.url, locale),
  }));

  return (
    <SiteV2Shell>
      <section className="tool-hero">
        <span className="deco d1" aria-hidden="true">
          <CameraSquare className="ic" />
        </span>
        <span className="deco d2" aria-hidden="true">
          <Music2 className="ic" aria-hidden="true" />
        </span>
        <span className="deco d3" aria-hidden="true">
          <Download className="ic" aria-hidden="true" />
        </span>
        <div className="wrap">
          <div className="inner">
            <ToolCrumbs
              items={[
                { label: homeLabel, href: localizeHref(routes.home, locale) },
                { label: toolsLabel, href: toolsHref },
              ]}
              sourceSlug="tools"
            />
            <p className="kicker">{hub.eyebrow}</p>
            <h1 className="h1 lg">{hub.h1}</h1>
            <p className="lead">{hub.lead}</p>
            <ul className="hub-trust">
              {chrome.usps.map((item) => (
                <li key={item.title}>
                  <CheckIcon />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {ORDER.map((platform) => {
            const tools = TOOLS.filter((tool) => tool.platform === platform).map((tool) =>
              localizeHubTool(tool, locale, bundle),
            );
            if (!tools.length) return null;
            return (
              <section key={platform} className="plat-sec">
                <div className="plat-head">
                  <PlatformTile platform={platform} />
                  <h2 className="h2">{chrome.platformLabels[platform]}</h2>
                  <p>{chrome.platformIntros[platform]}</p>
                </div>
                <div className="tool-cards">
                  {tools.map((tool) => (
                    <ToolCard
                      key={tool.slug}
                      tool={tool}
                      chrome={chrome}
                      platformLabel={platformName(tool.platform)}
                      showBlurb
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="sec grey">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2">{hub.howHeading}</h2>
            </div>
          </div>
          <div className="steps-row">
            {chrome.hubHowTitles.map((title, index) => (
              <div key={title} className="step rv-up">
                <span className="n">{index + 1}</span>
                <h3>{title}</h3>
                <p>{hub.how[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {services.length ? (
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2 className="h2">{hub.packagesHeading}</h2>
                <p className="lead">{hub.servicesNote}</p>
              </div>
            </div>
            <PkgCards
              services={services}
              labelFor={(service) =>
                chrome.servicePills[service.slug] ?? SERVICE_PILL[service.slug] ?? service.name
              }
            />
          </div>
        </section>
      ) : null}
    </SiteV2Shell>
  );
}

function localizeHubTool(
  tool: ToolDefinition,
  locale: Locale,
  bundle?: ToolsBundle,
): ToolDefinition {
  const overlay = bundle?.registry[tool.slug];
  return {
    ...tool,
    name: overlay?.name ?? tool.name,
    shortDescription: overlay?.shortDescription ?? tool.shortDescription,
    placeholder: overlay?.placeholder ?? tool.placeholder,
    actionLabel: overlay?.actionLabel ?? tool.actionLabel,
    availabilityLabel: overlay?.availabilityLabel ?? tool.availabilityLabel,
    href: localizeHref(tool.href, locale),
  };
}
