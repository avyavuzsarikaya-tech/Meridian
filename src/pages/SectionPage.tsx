import { T, sectionName, type Lang } from '../i18n';
import type { Article } from '../content';
import { Card } from './Home';

export function SectionPage({ lang, section, list }: { lang: Lang; section: string; list: Article[] }) {
  const t = T[lang];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex items-center gap-4">
        <h1 className="font-serif-display text-4xl font-bold tracking-tight">{sectionName(section, lang)}</h1>
        <div className="h-px flex-1 bg-[hsl(var(--rule))]" />
      </div>
      {list.length === 0 ? (
        <p className="py-16 font-serif-display text-xl italic text-[hsl(var(--body))]">{t.emptySection}</p>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {list.map((a, i) => (
            <Card key={a.path} a={a} lang={lang} delay={(i % 3) * 100} />
          ))}
        </div>
      )}
    </section>
  );
}
