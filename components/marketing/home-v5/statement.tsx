import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { LitParagraph } from '@/components/marketing/home-v5/lit-paragraph';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';

export function HomeV5Statement({ content = HOME_V5 }: { content?: HomeV5Content }) {
  const { statement } = content;
  return (
    <section id={statement.id} className="statement">
      <div className="wrap narrow center">
        <SplitTitle title={statement.title} className="h2 rv-up" pen />
        <LitParagraph text={statement.body} />
      </div>
    </section>
  );
}
