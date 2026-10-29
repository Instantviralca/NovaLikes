import { ArrowRight, Plus } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { loadUi } from '@/lib/i18n/content/load';

const WHATSAPP_URL = 'https://wa.me/447454758272';

export function HomeV5Faq({
  content = HOME_V5,
  locale = DEFAULT_LOCALE,
}: {
  content?: HomeV5Content;
  locale?: Locale;
}) {
  const { faq } = content;
  const faqWhatsapp = loadUi(locale).homeV5Ui.faqWhatsapp;
  return (
    <section id={faq.id} className="faq">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <SplitTitle title={faq.title} className="h2 left" pen />
          <p className="body">{faq.intro}</p>
          <a className="btn" href={WHATSAPP_URL}>
            <span>{faqWhatsapp}</span>
            <span className="btn-tile">
              <ArrowRight className="ic" aria-hidden="true" />
            </span>
          </a>
        </div>
        <div className="faq-list">
          {faq.items.map((item) => (
            <details key={item.question}>
              <summary>
                <h3>{item.question}</h3>
                <Plus className="pl" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
