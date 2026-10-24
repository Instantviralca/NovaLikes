import { Container } from '@/components/layout/container';
import { HomeV4SectionHead } from '@/components/marketing/home-v4/section-head';
import { HOME_V4 } from '@/data/content/home-v4';

export function HomeV4Intro() {
  const { intro } = HOME_V4;

  return (
    <section id={intro.id} className="bg-white pb-6 pt-14 md:pt-18 lg:pt-20" aria-labelledby="v4-intro-title">
      <Container size="xl">
        <HomeV4SectionHead eyebrow={intro.eyebrow} title={intro.title} titleId="v4-intro-title" />
        <p className="v4-body mx-auto mt-5 max-w-[720px] text-center text-base sm:text-lg">{intro.body}</p>
      </Container>
    </section>
  );
}
