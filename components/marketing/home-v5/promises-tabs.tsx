'use client';

import { useState, type ReactNode } from 'react';

export type PromiseItem = {
  key: string;
  title: string;
  body: string;
  chip: string;
  /** Pre-rendered icons (server side). */
  icon: ReactNode;
  bigIcon: ReactNode;
};

/**
 * One `<details>` open at a time; the matching `.pv-state` visual switches with it.
 * All answers are in the server HTML. `head` is the server-rendered heading + intro.
 */
export function PromisesTabs({
  head,
  items,
  footer,
}: {
  head: ReactNode;
  items: PromiseItem[];
  /** Optional content after the accordion (e.g. refund policy link). */
  footer?: ReactNode;
}) {
  const [active, setActive] = useState(items[0]?.key);

  return (
    <div className="wrap prom-grid">
      <div className="prom-left">
        {head}
        <div className="prom-list">
          {items.map((item) => (
            <details
              key={item.key}
              // `name` groups the details natively (exclusive accordion); state keeps the visual in sync.
              {...{ name: 'promise' }}
              data-key={item.key}
              open={active === item.key}
              onToggle={(event) => {
                if (event.currentTarget.open) setActive(item.key);
              }}
            >
              <summary>
                <span className="pr-ic">{item.icon}</span>
                <h3>{item.title}</h3>
              </summary>
              <p>{item.body}</p>
            </details>
          ))}
        </div>
        {footer}
      </div>
      <div className="prom-vis" aria-hidden="true">
        <div className="pv-bg">
          <i />
          <i />
        </div>
        {items.map((item) => (
          <div
            key={item.key}
            className={active === item.key ? 'pv-state on' : 'pv-state'}
            data-key={item.key}
          >
            <span className="pv-circle">{item.bigIcon}</span>
            <span className="pv-chip">{item.chip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
