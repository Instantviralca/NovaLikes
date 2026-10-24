import { HOME_V5 } from '@/data/content/home-v5';
import { LitParagraph } from '@/components/marketing/home-v5/lit-paragraph';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';

export function HomeV5Statement() {
  const { statement } = HOME_V5;
  return (
    <section id={statement.id} className="statement">
      <div className="wrap narrow center">
        <SplitTitle title={statement.title} className="h2 rv-up" pen />
        <LitParagraph text={statement.body} />
      </div>
    </section>
  );
}
