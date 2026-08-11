'use client';

import { useEffect, useRef, useState } from 'react';

import { ExtensionImage } from '@/components/marketing/extension-image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { extensionIllustrations, timelineSection } from '@/data/content/homepage-extensions';
import { cn } from '@/lib/utils';

export function TimelineSection({ className }: { className?: string }) {
  const { id, title, description, milestones } = timelineSection;
  const trackRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);
  const art = extensionIllustrations.timeline;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id={id} spacing="lg" className={cn('bg-hero-wash', className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="mx-auto mb-8 max-w-2xl space-y-2 text-center">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {title}
          </Heading>
          <MutedText>{description}</MutedText>
        </FadeUp>

        <FadeUp delay={0.05} className="mb-8">
          <ExtensionImage
            {...art}
            className="mx-auto max-w-3xl shadow-[var(--shadow-sm)]"
            sizes="(max-width: 1024px) 100vw, 768px"
          />
        </FadeUp>

        <ol
          ref={trackRef}
          className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          aria-label="NovaLikes milestones"
        >
          <li
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-7 right-6 left-6 hidden h-0.5 origin-left bg-gradient-to-r from-[#FFD0A8] to-[#FF6B00] lg:block',
              visible ? 'animate-iv-timeline-draw' : 'scale-x-0',
            )}
          />
          {milestones.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                'relative rounded-[20px] border border-[var(--border-subtle)] bg-white p-4 text-center shadow-[var(--shadow-sm)] transition-all duration-500',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
              )}
              style={{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }}
            >
              <span className="mx-auto mb-3 flex size-3 rounded-full bg-[#FF6B00] shadow-[0_0_0_6px_rgba(255,107,0,0.15)]" />
              <p className="text-sm font-bold text-[#FF6B00]">{item.year}</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
