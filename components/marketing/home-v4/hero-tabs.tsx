'use client';

import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Camera, ChevronRight, Music2, Users, type LucideIcon } from 'lucide-react';

import type { PlatformKey } from '@/data/content/home-v4';

export type PlatformTabCard = {
  slug: string;
  title: string;
  line: string;
  /** Already resolved on the server; null hides the price line. */
  priceLabel: string | null;
  href: string;
};

export type PlatformTabData = {
  key: PlatformKey;
  label: string;
  cards: PlatformTabCard[];
};

const TAB_ICONS: Record<PlatformKey, LucideIcon> = {
  instagram: Camera,
  tiktok: Music2,
  facebook: Users,
};

/** Tabs for Instagram / TikTok / Facebook. All panels render in server HTML; the client only toggles visibility. */
export function PlatformTabPanel({
  tabs,
  defaultKey = 'instagram',
}: {
  tabs: PlatformTabData[];
  defaultKey?: PlatformKey;
}) {
  const [active, setActive] = useState<PlatformKey>(defaultKey);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (key: PlatformKey, focus = false) => {
    setActive(key);
    if (focus) tabRefs.current[key]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(tabs[next].key, true);
  };

  return (
    <div className="v4-hero-panel mx-auto w-full max-w-5xl">
      <div className="flex justify-center">
        <div role="tablist" aria-label="Platform" className="v4-tablist">
          {tabs.map((tab, index) => {
            const Icon = TAB_ICONS[tab.key];
            const selected = tab.key === active;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[tab.key] = el;
                }}
                type="button"
                role="tab"
                id={`home-tab-${tab.key}`}
                aria-selected={selected}
                aria-controls={`home-panel-${tab.key}`}
                tabIndex={selected ? 0 : -1}
                className="v4-tab"
                onClick={() => select(tab.key)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <Icon className="size-4" aria-hidden />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => {
        const Icon = TAB_ICONS[tab.key];
        return (
          <div
            key={tab.key}
            role="tabpanel"
            id={`home-panel-${tab.key}`}
            aria-labelledby={`home-tab-${tab.key}`}
            hidden={tab.key !== active}
            className="v4-tabpanel mt-5"
          >
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {tab.cards.map((card) => (
                <li key={card.slug}>
                  <Link href={card.href} className="v4-card v4-card-link v4-platform-card h-full">
                    <span className="v4-icon-tile">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-bold text-[var(--nl-ink)]">{card.title}</span>
                      <span className="block text-sm text-[var(--nl-muted)]">{card.line}</span>
                      {card.priceLabel ? (
                        <span className="mt-0.5 block text-sm font-bold text-[var(--nl-orange)]">
                          {card.priceLabel}
                        </span>
                      ) : null}
                    </span>
                    <ChevronRight className="size-5 shrink-0 text-[var(--nl-muted)]" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
