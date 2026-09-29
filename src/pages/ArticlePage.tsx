import { url } from '../config';
import { T, homePath, sectionName, fmtStamp, type Lang } from '../i18n';
import type { Article } from '../content';
import { BylineName, Cover } from '../components/Chrome';
import { Card } from './Home';

export function ArticlePage({ a, related }: { a: Article; related: Article[] }) {
  const lang: Lang = a.lang;
  const t = T[lang];


  return (
    <>
      <article className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 sm:pt-12">
        <header className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <a href={url(homePath(lang))} className="btn inline-flex items-center gap-2 px-3 py-2">
              <span className="back-arrow" aria-hidden="true">{lang === 'ar' ? '→' : '←'}</span>{t.backHome}
            </a>
            <a href={url(`/${lang}/section/${a.section}/`)} className="kicker text-[hsl(var(--accent))] hover:underline">
              {sectionName(a.section, lang)}
            </a>
          </div>
          <h1 className="mt-3 font-serif-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {a.title}
          </h1>
          {a.spot && (
            <p className="mt-5 font-serif-display text-xl leading-relaxed text-[hsl(var(--body))]">{a.spot}</p>
          )}
          <div className="mt-6 flex flex-col gap-1 border-y border-[hsl(var(--rule))] py-3 font-mono-data text-[11px] uppercase tracking-wider text-[hsl(var(--muted))] sm:flex-row sm:items-center sm:justify-between">
            <span><BylineName a={a} lang={lang} /></span>
            <span>
              {t.published}{' '}
              <time dateTime={a.publishedAt.toISOString()}>{fmtStamp(a.publishedAt, lang)}</time>
              {a.updatedAt && a.updatedAt > a.publishedAt ? (
                <>
                  {' · '}
                  {t.updated}{' '}
                  <time dateTime={a.updatedAt.toISOString()}>{fmtStamp(a.updatedAt, lang)}</time>
                </>
              ) : null}
              {' · '}
              {a.readMinutes} {t.minRead}
            </span>
          </div>
        </header>

        {a.cover && (
          <figure className="mx-auto mt-8 max-w-5xl">
            <Cover a={a} priority className="w-full object-cover" />
            {a.imageCaption && (
              <figcaption className="mt-2 font-mono-data text-[11px] tracking-wide text-[hsl(var(--muted))]">
                {a.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {a.audio && (
          <section data-audio-section className="mx-auto mt-8 max-w-3xl border-y border-[hsl(var(--rule))] py-5" aria-label={t.listen}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-serif-display text-xl font-semibold">{t.listen}</h2>
              <span className="kicker text-[hsl(var(--muted))]">{t.aiNarration}</span>
            </div>
            <audio data-article-audio controls preload="metadata" className="w-full" aria-label={t.listen}>
              <source src={url(a.audio)} />
              <a href={url(a.audio)}>{t.audioDownload}</a>
            </audio>
            <div data-audio-controls dir="ltr" className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn-primary" data-audio-play data-label-play={t.play} data-label-pause={t.pause} aria-label={t.play}>
                <span aria-hidden="true">▶</span>
              </button>
              <input data-audio-seek type="range" min="0" max="1000" step="1" defaultValue="0" aria-label={t.seek} />
              <span data-audio-time className="whitespace-nowrap font-mono-data text-[11px] text-[hsl(var(--muted))]">00:00 / --:--</span>
              <div role="group" aria-label={t.speed} className="inline-flex items-center gap-1">
                {([['1', '1×'], ['1.25', '1.25×'], ['1.5', '1.5×']] as const).map(([rate, label]) => (
                  <button key={rate} type="button" className="btn px-2 py-1.5" data-rate={rate} aria-pressed={rate === '1'}>{label}</button>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto mt-8 flex max-w-3xl items-center gap-2 font-mono-data text-[11px] uppercase tracking-wider" style={{ justifyContent: lang === 'ar' ? 'flex-start' : 'flex-end' }} role="group" aria-label={t.readingSize}>
          <span className="me-2 text-[hsl(var(--muted))]">{t.readingSize}</span>
          <div className="reading-size-group inline-flex">
            {([['small', 'A−'], ['normal', 'A'], ['large', 'A+']] as const).map(([size, label]) => (
              <button key={size} type="button" data-size-choice={size} aria-label={`${t.readingSize}: ${label}`} aria-pressed={size === 'normal'}
                className="btn reading-size-button px-2.5 py-1.5"
              ><span lang="en" dir="ltr">{label}</span></button>
            ))}
          </div>
        </div>
        <div className="article-body mx-auto mt-5 max-w-3xl" dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />

        {a.updateNote && a.updatedAt && a.updatedAt > a.publishedAt && (
          <p className="mx-auto mt-8 max-w-3xl border-t border-[hsl(var(--rule))] pt-4 text-sm text-[hsl(var(--body))]">
            <span className="font-semibold">{t.updateNote}:</span> {a.updateNote}
          </p>
        )}

        {a.sources.length > 0 && (
          <section className="mx-auto mt-12 max-w-3xl border-t-2 ink-rule pt-5" aria-labelledby="sources">
            <h2 id="sources" className="kicker text-[hsl(var(--accent))]">
              {t.sources}
            </h2>
            <ol className="source-list mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[hsl(var(--body))] marker:font-mono-data marker:text-[12px] marker:text-[hsl(var(--muted))]">
              {a.sources.map((s, i) => (
                <li key={i} id={`source-${i + 1}`} className="scroll-mt-6 target:bg-[hsl(var(--cream))]">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[hsl(var(--rule))] underline-offset-4 hover:decoration-[hsl(var(--accent))]">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                  {s.url ? (
                    <span className="ml-2 break-all font-mono-data text-[11px] text-[hsl(var(--muted))]">
                      {hostOf(s.url)}
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        )}

        {a.tags.length > 0 && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center gap-2">
            <span className="kicker mr-1 text-[hsl(var(--muted))]">{t.tags}</span>
            {a.tags.map((tag) => (
              <span key={tag} className="kicker border border-[hsl(var(--rule))] px-2 py-1 text-[hsl(var(--body))]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex items-center gap-4">
            <h2 className="font-serif-display text-2xl font-bold tracking-tight">
              {t.moreFrom}{lang === 'fr' ? '\u00a0:' : ':'} {sectionName(a.section, lang)}
            </h2>
            <div className="h-px flex-1 bg-[hsl(var(--rule))]" />
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {related.map((r) => (
              <Card key={r.path} a={r} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function hostOf(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}
