import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { site } from '@/config/site';
import { footerMeta, getFooterColumns } from '@/data/footer';
import { cn } from '@/lib/utils';

/**
 * Global site footer — Explore NovaLikes column layout (sitewide).
 */
export function Footer({ className }: { className?: string }) {
  const columns = getFooterColumns();

  return (
    <footer
      className={cn('mt-auto border-t border-[var(--border-subtle)] bg-white', className)}
      role="contentinfo"
    >
      <Container size="xl" className="py-10 sm:py-12">
        <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
          {footerMeta.title}
        </h2>

        <nav aria-label="Footer" className="mt-8">
          <ul className="grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {columns.map((column) => (
              <li key={column.id} className="min-w-0">
                <h3 className="text-sm font-semibold tracking-wide text-[var(--text-primary)]">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.id}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--brand-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--text-secondary)] uppercase">
              Payment Methods
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{footerMeta.paymentCopy}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--text-secondary)] uppercase">
              Social
            </p>
            <ul className="mt-2 flex flex-wrap gap-3 text-sm">
              {footerMeta.socialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-[var(--border-subtle)] px-4 py-5 text-center">
        <p className="text-xs tracking-wide text-[var(--text-secondary)]">
          © 2026 {site.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
