import { url } from '../config';
import { T, sectionName, fmtStamp, type Lang } from '../i18n';
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
          <a href={url(`/${lang}/section/${a.section}/`)} className="kicker text-[hsl(var(--accent))] hover:underline">
            {sectionName(a.section, lang)}
          </a>
          <h1 className="mt-3 font-serif-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {a.title}
          </h1>
          {a.spot && (
            <p className="mt-5 font-serif-display text-xl leading-relaxed text-[hsl(var(--body))]">{a.spot}</p>
          )}
          <div className="mt-6 flex flex-col gap-1 border-y border-[hsl(var(--rule))] py-3 font-mono-data text-[11px] uppercase tracking-wider text-[hsl(var(--muted))] sm:flex-row sm:items-center sm:justify-between">
            <span><BylineName a={a} lang={lang} /></span>
            <span>
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
          <section className="mx-auto mt-8 max-w-3xl border-y border-[hsl(var(--rule))] py-5" aria-label={t.listen}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-serif-display text-xl font-semibold">{t.listen}</h2>
              <span className="kicker text-[hsl(var(--muted))]">{t.aiNarration}</span>
            </div>
            <audio controls preload="none" className="w-full" aria-label={t.listen}>
              <source src={url(a.audio)} />
              <a href={url(a.audio)}>{t.audioDownload}</a>
            </audio>
          </section>
        )}

        <div className="article-body mx-auto mt-8 max-w-3xl" dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />

        {a.sources.length > 0 && (
          <section className="mx-auto mt-12 max-w-3xl border-t-2 ink-rule pt-5" aria-labelledby="sources">
            <h2 id="sources" className="kicker text-[hsl(var(--accent))]">
              {t.sources}
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[hsl(var(--body))] marker:font-mono-data marker:text-[12px] marker:text-[hsl(var(--muted))]">
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
              {t.moreFrom}: {sectionName(a.section, lang)}
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
