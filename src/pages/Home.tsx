import { url } from '../config';
import { T, sectionName, type Lang } from '../i18n';
import type { Article } from '../content';
import { Byline, Cover } from '../components/Chrome';

/** Ön sayfa: tek manşet ve editörün işaretlediği seçki. */
export function arrangeFront(list: Article[]) {
  const onFront = list.filter((a) => a.status === 'published');
  const lead = onFront.find((a) => a.headline) ?? onFront[0];
  const rest = onFront.filter((a) => a !== lead);
  const picks = rest.filter((a) => a.editorsPick).slice(0, 3);
  return { lead, picks };
}

export function Home({ lang, list }: { lang: Lang; list: Article[] }) {
  const t = T[lang];
  const { lead, picks } = arrangeFront(list);

  if (!lead) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="font-serif-display text-2xl italic text-[hsl(var(--body))]">{t.empty}</p>
      </section>
    );
  }

  return (
    <>
      <section className="front-page mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6 sm:pt-11 sm:pb-16">
        <div className="front-heading kicker"><span>{t.latest}</span><span>MERIDIAN</span></div>
        <div className={`front-grid ${picks.length ? 'has-picks' : ''}`}>
          <article className="lead-story group">
            <a href={url(lead.path)} className="block">
              <span className="kicker story-section">{sectionName(lead.section, lang)}</span>
              {lead.cover ? (
                <div className="mt-4 overflow-hidden">
                  <Cover a={lead} priority className="news-img aspect-[3/2] w-full object-cover" />
                </div>
              ) : null}
              <h2 className="mt-4 max-w-3xl font-serif-display font-bold leading-[1.04] text-balance">
                <span className="headline-link">{lead.title}</span>
              </h2>
            </a>
            {lead.spot && (
              <p className="lead-deck mt-4 max-w-2xl font-serif-display leading-relaxed text-[hsl(var(--body))]">{lead.spot}</p>
            )}
            <div className="mt-6">
              <Byline a={lead} lang={lang} />
            </div>
          </article>

          {picks.length > 0 && (
            <aside className="editor-picks">
              <p className="kicker">{t.editorsPicks}</p>
              <ol className="mt-3 divide-y divide-[hsl(var(--rule))]">
                {picks.map((a, i) => (
                  <li key={a.path} className="group py-5 first:pt-3">
                    <a href={url(a.path)} className="flex gap-5">
                      <span className="pick-number font-serif-display leading-none" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="kicker mb-2 text-[hsl(var(--muted))]">{sectionName(a.section, lang)}</p>
                        <h3 className="font-serif-display text-2xl font-semibold leading-tight text-balance">
                          <span className="headline-link">{a.title}</span>
                        </h3>
                        <div className="mt-2"><Byline a={a} lang={lang} /></div>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </section>

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
        {!a.cover && <p className="kicker mb-2 text-[hsl(var(--ink))]">{sectionName(a.section, lang)}</p>}
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
