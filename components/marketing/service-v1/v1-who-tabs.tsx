'use client';

import Image from 'next/image';
import { useState } from 'react';

import { SvcV1Icon } from '@/components/marketing/service-v1/icons';
import type { IgFollowersV1 } from '@/data/content/service-v1/instagram-followers';

type WhoTab = IgFollowersV1['who']['tabs'][number];

type V1WhoTabsProps = {
  tabs: readonly WhoTab[];
  image: IgFollowersV1['who']['image'];
};

/**
 * ARIA tabs for Who Orders. All 3 panels stay in the HTML; inactive use `hidden`.
 */
export function V1WhoTabs({ tabs, image }: V1WhoTabsProps) {
  const [active, setActive] = useState<WhoTab['key']>(tabs[0]?.key ?? 'creators');

  const select = (key: WhoTab['key']) => setActive(key);

  return (
    <>
      <div className="who-tabs" role="tablist" aria-label="Who orders">
        {tabs.map((tab, index) => {
          const selected = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`wt-${tab.key}`}
              aria-controls={`wp-${tab.key}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className="wtab"
              onClick={() => select(tab.key)}
              onKeyDown={(event) => {
                const d =
                  event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
                if (!d) return;
                event.preventDefault();
                const next = tabs[(index + d + tabs.length) % tabs.length];
                if (!next) return;
                select(next.key);
                requestAnimationFrame(() => {
                  document.getElementById(`wt-${next.key}`)?.focus();
                });
              }}
            >
              <SvcV1Icon name={tab.icon} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="who-card">
        {tabs.map((tab) => {
          const selected = tab.key === active;
          return (
            <div
              key={tab.key}
              role="tabpanel"
              id={`wp-${tab.key}`}
              aria-labelledby={`wt-${tab.key}`}
              className="who-panel"
              hidden={!selected}
            >
              <div>
                <h3>{tab.label}</h3>
                <p>{tab.body}</p>
                <ul className="ticks">
                  {tab.points.map((point) => (
                    <li key={point}>
                      <SvcV1Icon name="check" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
        <div className="who-vis" aria-hidden="true">
          <Image
            src={image.src}
            alt=""
            width={image.w}
            height={image.h}
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
      </div>
    </>
  );
}
