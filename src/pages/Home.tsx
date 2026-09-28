import { url } from '../config';
import { T, sectionName, fmtClock, type Lang } from '../i18n';
import type { Article } from '../content';
import { Byline, Cover } from '../components/Chrome';

/** Ön sayfa: manşet, editör seçkisi, görselli haberler, son haberler. */
export function arrangeFront(list: Article[]) {
  const onFront = list.filter((a) => a.status === 'published');
  const lead = onFront.find((a) => a.headline) ?? onFront[0];
  const rest = onFront.filter((a) => a !== lead);
  const picks = [...rest.filter((a) => a.editorsPick), ...rest.filter((a) => !a.editorsPick)].slice(0, 3);
  const afterPicks = rest.filter((a) => !picks.includes(a));
  const world = afterPicks.filter((a) => a.cover).slice(0, 3);
  const latest = afterPicks.filter((a) => !world.includes(a)).slice(0, 9);
  return { lead, picks, world, latest };
}

export function Home({ lang, list }: { lang: Lang; list: Article[] }) {
  const t = T[lang];
  const { lead, picks, world, latest } = arrangeFront(list);

  if (!lead) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="font-serif-display text-2xl italic text-[hsl(var(--body))]">{t.empty}</p>
      </section>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className={`grid gap-10 ${picks.length ? 'lg:grid-cols-3' : ''}`}>
          <article className="group lg:col-span-2">
            <a href={url(lead.path)} className="block">
              {lead.cover ? (
                <div className="relative overflow-hidden">
                  <Cover a={lead} priority className="news-img aspect-[3/2] w-full object-cover" />
                  <span className="kicker absolute left-0 top-0 bg-[hsl(var(--accent))] px-3 py-1.5 text-[hsl(var(--cream))]">
                    {sectionName(lead.section, lang)}
                  </span>
                </div>
              ) : (
                <span className="kicker inline-block bg-[hsl(var(--accent))] px-3 py-1.5 text-[hsl(var(--cream))]">
                  {sectionName(lead.section, lang)}
                </span>
              )}
              <h2 className="mt-5 max-w-3xl font-serif-display text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                <span className="headline-link">{lead.title}</span>
              </h2>
            </a>
            {lead.spot && (
              <p className="mt-4 max-w-2xl font-serif-display text-lg leading-relaxed text-[hsl(var(--body))]">{lead.spot}</p>
            )}
            <div className="mt-4">
              <Byline a={lead} lang={lang} />
            </div>
          </article>

          {picks.length > 0 && (
            <aside className="border-t-2 ink-rule lg:border-l lg:border-t-2 lg:pl-8 lg:pt-0">
              <p className="kicker pt-4 text-[hsl(var(--accent))] lg:pt-4">{t.editorsPicks}</p>
              <ol className="mt-2 divide-y divide-[hsl(var(--rule))]">
                {picks.map((a, i) => (
                  <li key={a.path} className="group py-5">
                    <a href={url(a.path)} className="flex gap-4">
                      <span className="font-serif-display text-3xl font-bold leading-none text-[hsl(var(--rule))] transition-colors group-hover:text-[hsl(var(--accent))]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="kicker mb-1.5 text-[hsl(var(--muted))]">{sectionName(a.section, lang)}</p>
                        <h3 className="font-serif-display text-xl font-semibold leading-snug text-balance">
                          <span className="headline-link">{a.title}</span>
                        </h3>
                        <p className="mt-2 font-mono-data text-[11px] uppercase tracking-wider text-[hsl(var(--muted))]">
                          {a.location ? `${a.location} — ` : ''}
                          {fmtClock(a.publishedAt)} GMT · {a.readMinutes} {t.min}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </section>

      {latest.length > 0 && (
        <section className="border-y hairline-t hairline-b bg-[hsl(var(--cream))]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <div className="reveal flex items-baseline justify-between">
              <h2 className="font-serif-display text-2xl font-bold tracking-tight">{t.latest}</h2>
              <span className="kicker text-[hsl(var(--muted))]">{t.latestNote}</span>
            </div>
            <ol className="mt-6 grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((a, i) => (
                <li key={a.path} className="reveal group border-t border-[hsl(var(--rule))] py-4" style={{ transitionDelay: `${i * 60}ms` }}>
                  <a href={url(a.path)} className="flex gap-4">
                    <time dateTime={a.publishedAt.toISOString()} className="font-mono-data text-[12px] font-semibold text-[hsl(var(--accent))]">
                      {fmtClock(a.publishedAt)}
                    </time>
                    <div>
                      <p className="font-serif-display text-[15px] font-medium leading-snug">
                        <span className="headline-link">{a.title}</span>
                      </p>
                      <p className="kicker mt-1 text-[hsl(var(--muted))]">{sectionName(a.section, lang)}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {world.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="reveal flex items-center gap-4">
            <h2 className="font-serif-display text-2xl font-bold tracking-tight">{t.around}</h2>
            <div className="h-px flex-1 bg-[hsl(var(--rule))]" />
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {world.map((a, i) => (
              <Card key={a.path} a={a} lang={lang} delay={i * 100} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export function Card({ a, lang, delay = 0 }: { a: Article; lang: Lang; delay?: number }) {
  return (
    <article className="reveal group" style={{ transitionDelay: `${delay}ms` }}>
      <a href={url(a.path)} className="block">
        {a.cover && (
          <div className="relative mb-4 overflow-hidden">
            <Cover a={a} className="news-img aspect-square w-full object-cover" />
            <span className="kicker absolute bottom-0 left-0 bg-[hsl(var(--paper))] px-3 py-1.5 text-[hsl(var(--ink))]">
              {sectionName(a.section, lang)}
            </span>
          </div>
        )}
        {!a.cover && <p className="kicker mb-2 text-[hsl(var(--accent))]">{sectionName(a.section, lang)}</p>}
        <h3 className="font-serif-display text-2xl font-semibold leading-snug text-balance">
          <span className="headline-link">{a.title}</span>
        </h3>
      </a>
      {a.spot && <p className="mt-2 text-[15px] leading-relaxed text-[hsl(var(--body))]">{a.spot}</p>}
      <div className="mt-3">
        <Byline a={a} lang={lang} />
      </div>
    </article>
  );
}
