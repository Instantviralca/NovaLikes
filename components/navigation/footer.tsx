import Link from 'next/link';
import { Facebook, Heart, Instagram, Linkedin, Music2, Package, ThumbsUp, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';

import { FooterLanguageSwitcher } from '@/components/i18n/footer-language-switcher';
import { Logo } from '@/components/common/logo';
import { CameraSquare } from '@/components/marketing/home-v5/icons';
import { nlBody, nlDisplay } from '@/components/marketing/home-v5/fonts';
import { site } from '@/config/site';
import { routes } from '@/config/routes';
import { TOOLS } from '@/data/tools/registry';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';
import { loadToolsBundle } from '@/lib/i18n/content/load';
import { getAccountNavState } from '@/lib/customers/nav';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';

import '@/components/navigation/footer-v2.css';

const IG_SLUGS = [
  'buy-instagram-followers',
  'buy-instagram-likes',
  'buy-instagram-views',
  'buy-instagram-comments',
] as const;

const TT_SLUGS = ['buy-tiktok-followers', 'buy-tiktok-likes', 'buy-tiktok-views'] as const;

const FB_SLUGS = [
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
] as const;

type FooterSocial = {
  label: string;
  href: string;
  icon: ReactNode;
};

function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .56.04.82.12V9.01a6.27 6.27 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.2 8.2 0 0 0 4.76 1.52V6.84a4.86 4.86 0 0 1-1-.15Z" />
    </svg>
  );
}

function HelpIcon({ kind }: { kind: 'wa' | 'faq' }) {
  if (kind === 'wa') {
    return (
      <svg
        className="ic"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    );
  }
  return (
    <svg
      className="ic"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

type FooterLink = { label: string; href: string };

type FooterProps = {
  className?: string;
  locale?: Locale;
  market?: Market | null;
  ui?: UiDictionary;
};

export async function Footer({
  className,
  locale = DEFAULT_LOCALE,
  market = null,
  ui = ENGLISH_UI as UiDictionary,
}: FooterProps) {
  const homeHref = resolvePublicHref('/', { locale, market });
  const hrefOf = (path: string) => resolvePublicHref(path, { locale, market });
  const accountNav = await getAccountNavState();
  const showLogin = Boolean(accountNav && accountNav.href === '/login');
  const toolsBundle = loadToolsBundle(locale);

  const socials: FooterSocial[] = [
    {
      label: 'Instagram',
      href: site.socialLinks.instagram,
      icon: <Instagram className="ic" strokeWidth={2.2} aria-hidden="true" />,
    },
    {
      label: 'Facebook',
      href: site.socialLinks.facebook,
      icon: <Facebook className="ic" strokeWidth={2.2} aria-hidden="true" />,
    },
    {
      label: 'TikTok',
      href: site.socialLinks.tiktok,
      icon: <TikTokGlyph className="ic" />,
    },
    {
      label: 'LinkedIn',
      href: site.socialLinks.linkedin,
      icon: <Linkedin className="ic" strokeWidth={2.2} aria-hidden="true" />,
    },
  ].filter((item) => item.href);

  const serviceLinks = (slugs: readonly string[]): FooterLink[] =>
    slugs.map((slug) => ({
      href: hrefOf(`/${slug}`),
      label: ui.footerServices[slug as keyof typeof ui.footerServices],
    }));

  const orderLinks: FooterLink[] = [
    { href: hrefOf(routes.trackOrder), label: ui.footer.trackOrder },
    ...(showLogin ? [{ href: hrefOf('/login'), label: ui.nav.logIn }] : []),
    { href: hrefOf(routes.contact), label: ui.footer.contactSupport },
  ];

  const toolLinks: FooterLink[] = TOOLS.map((tool) => {
    const overlay = toolsBundle.registry[tool.slug];
    return {
      href: hrefOf(tool.href),
      label: overlay?.name ?? tool.name,
    };
  });

  const companyLinks: FooterLink[] = [
    { href: hrefOf(routes.about), label: ui.footer.aboutNovaLikes },
    { href: hrefOf(routes.reviews), label: ui.footer.reviews },
    ...(locale === DEFAULT_LOCALE
      ? [{ href: hrefOf(routes.learn), label: ui.footer.blog }]
      : []),
    { href: hrefOf(routes.tools), label: ui.footer.freeTools },
    { href: hrefOf(routes.sitemap), label: ui.footer.sitemap },
  ];

  const legalLinks: FooterLink[] = [
    { href: hrefOf(routes.termsAndConditions), label: ui.footer.termsAndConditions },
    { href: hrefOf(routes.privacyPolicy), label: ui.footer.privacyPolicy },
    { href: hrefOf(routes.refundPolicy), label: ui.footer.refundPolicy },
    { href: hrefOf(routes.cookiePolicy), label: ui.footer.cookiePolicy },
    { href: hrefOf(routes.disclaimer), label: ui.footer.disclaimer },
  ];

  const columns: Array<{
    key: string;
    title: string;
    tileClass: string;
    icon: ReactNode;
    links: FooterLink[];
    tools?: boolean;
  }> = [
    {
      key: 'ig',
      title: 'Instagram',
      tileClass: 'ig',
      icon: <CameraSquare className="ic" />,
      links: serviceLinks(IG_SLUGS),
    },
    {
      key: 'tt',
      title: 'TikTok',
      tileClass: 'tt',
      icon: <Music2 className="ic" aria-hidden="true" />,
      links: serviceLinks(TT_SLUGS),
    },
    {
      key: 'fb',
      title: 'Facebook',
      tileClass: 'fb',
      icon: <ThumbsUp className="ic" aria-hidden="true" />,
      links: serviceLinks(FB_SLUGS),
    },
    {
      key: 'order',
      title: ui.footer.yourOrder,
      tileClass: 'or',
      icon: <Package className="ic" aria-hidden="true" />,
      links: orderLinks,
    },
    {
      key: 'tools',
      title: ui.footer.freeTools,
      tileClass: 'tl',
      icon: <Wrench className="ic" aria-hidden="true" />,
      links: toolLinks,
      tools: true,
    },
    {
      key: 'nl',
      title: 'NovaLikes',
      tileClass: 'nl',
      icon: <Heart className="ic" fill="currentColor" aria-hidden="true" />,
      links: companyLinks,
    },
  ];

  return (
    <footer
      className={cn('nl-footer mt-auto', nlDisplay.variable, nlBody.variable, className)}
      role="contentinfo"
    >
      <div className="in">
        <div className="grid">
          <div className="brand">
            <span dir="ltr" className="logo-wrap">
              <Logo href={homeHref} />
            </span>
            <p className="tag">{ui.footer.tagline}</p>
            {socials.length > 0 ? (
              <ul className="soc">
                {socials.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <FooterLanguageSwitcher heading={ui.language} />
            <div className="help">
              <b>{ui.footer.helpSupport}</b>
              <ul>
                <li className="wa">
                  <a
                    href={`https://wa.me/${site.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HelpIcon kind="wa" />
                    {ui.footer.whatsapp247}
                  </a>
                </li>
                <li>
                  <Link href={hrefOf(routes.faq)} prefetch={prefetchForHref(hrefOf(routes.faq))}>
                    <HelpIcon kind="faq" />
                    {ui.footer.faq}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <nav aria-label={ui.footer.ariaLabel} className="contents">
            {columns.map((column) => (
              <div key={column.key} className={cn('col', column.tools && 'tools')}>
                <h3>
                  <span className={cn('pt', column.tileClass)} aria-hidden="true">
                    {column.icon}
                  </span>
                  {column.title}
                </h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={`${column.key}-${link.href}-${link.label}`}>
                      <Link href={link.href} prefetch={prefetchForHref(link.href)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="bar">
          <ul className="legal">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} prefetch={prefetchForHref(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pay">
            <span>{ui.footer.paymentMethods}</span>
            <span className="chip">{ui.footer.payCard}</span>
            <span className="chip">Apple Pay</span>
            <span className="chip">Google Pay</span>
          </div>
        </div>
      </div>

      <div className="copy">
        <p>
          © 2026 {site.name}. {ui.footer.allRightsReserved} {site.name} is operated by{' '}
          {site.company.legalName} · Company No. {site.company.companyNumber} ·{' '}
          {site.company.addressDisplay} · WhatsApp{' '}
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.company.phoneDisplay}
          </a>{' '}
          · {ui.footer.madeWithCare} <span aria-hidden="true">🤍</span> by{' '}
          <a href="https://localseowiser.com" target="_blank" rel="noopener noreferrer">
            LocalSeoWiser
          </a>
        </p>
      </div>
    </footer>
  );
}
