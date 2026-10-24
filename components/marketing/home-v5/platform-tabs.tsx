'use client';

import {
  Children,
  isValidElement,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

type TabMeta = {
  key: string;
  label: string;
  icon: ReactNode;
  panelClass: string;
};

type PanelProps = {
  tabKey: string;
  panelClass: string;
  children: ReactNode;
};

/** Server-rendered panel body; kept as a pass-through so panels stay in the HTML. */
export function PlatformTabPanel({ children }: PanelProps) {
  return <>{children}</>;
}

/**
 * WAI-ARIA tabs (arrow keys). All panels are in the server HTML; inactive ones use `hidden`.
 * Tabs metadata is serializable; panel bodies are React children (server → client safe).
 */
export function PlatformTabs({
  tabs,
  label,
  children,
}: {
  tabs: TabMeta[];
  label: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const panels = Children.toArray(children).filter(isValidElement) as ReactElement<PanelProps>[];

  const select = (index: number, focus = false) => {
    setActive(index);
    if (focus) refs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const d = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    event.preventDefault();
    select((index + d + tabs.length) % tabs.length, true);
  };

  return (
    <div className="tabpanel">
      <div className="tabbar" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => {
          const on = index === active;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.key}`}
              aria-controls={`panel-${tab.key}`}
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              className="tab"
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => {
        const panel = panels[index];
        return (
          <div
            key={tab.key}
            role="tabpanel"
            id={`panel-${tab.key}`}
            aria-labelledby={`tab-${tab.key}`}
            className={`panel ${tab.panelClass}`}
            hidden={index !== active}
          >
            {panel?.props.children}
          </div>
        );
      })}
    </div>
  );
}
