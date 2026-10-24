import { Clock, Lock, MessageCircle, RefreshCw, Search, Shield, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeV4SectionHead } from '@/components/marketing/home-v4/section-head';
import { HOME_V4 } from '@/data/content/home-v4';

const ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  clock: Clock,
  'refresh-cw': RefreshCw,
  'message-circle': MessageCircle,
  lock: Lock,
  search: Search,
};

export function HomeV4Promises() {
  const { promises: copy } = HOME_V4;

  return (
    <section id={copy.id} className="v4-dark py-14 md:py-18 lg:py-20" aria-labelledby="v4-promises-title">
      <Container size="xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="space-y-8">
            <HomeV4SectionHead
              align="start"
              eyebrow={copy.eyebrow}
              title={copy.title}
              subtitle={copy.subtitle}
              titleId="v4-promises-title"
              className="max-w-xl [&_.v4-body]:text-[#d1d5db]"
            />
            <ul className="space-y-3">
              {copy.items.map((item, index) => {
                const Icon = ICONS[item.icon] ?? Shield;
                return (
                  <li key={item.title} className="v4-promise-item" data-open={index === 0 ? 'true' : undefined}>
                    <span className="v4-promise-tile">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#d1d5db]">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Decorative composition: desktop only, hidden on mobile. Labels mirror the promise titles above. */}
          <div className="v4-promise-panel hidden lg:block" aria-hidden="true">
            <div className="v4-float-card v4-float left-8 top-12">
              <span className="v4-icon-tile">
                <Shield className="size-5" />
              </span>
              No password
            </div>
            <div className="v4-float-card v4-float v4-float-delay right-8 top-[44%]">
              <span className="v4-icon-tile">
                <Clock className="size-5" />
              </span>
              6–8 hours
            </div>
            <div className="v4-float-card v4-float bottom-12 left-14">
              <span className="v4-icon-tile">
                <RefreshCw className="size-5" />
              </span>
              6-month refill
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
