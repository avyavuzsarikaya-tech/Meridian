import type { ReactNode } from 'react';
import { url, absUrl, SITE_NAME } from '../config';
import { LANGS, LANGUAGE_NAMES, SECTIONS, T, feedPath, homePath, fmtLongDate, fmtShortDate, fmtClock, type Lang } from '../i18n';
import type { Article } from '../content';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap';

export function Document({
  lang,
  title,
  description,
  path,
  image,
  jsonLd,
  alternates,
  noindex,
  grain,
  children,
}: {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object;
  alternates?: { lang: Lang; path: string }[];
  noindex?: boolean;
  /** Kept for compatibility with the existing page renderer. */
  grain?: boolean;
  children: ReactNode;
}) {
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {noindex ? <meta name="robots" content="noindex" /> : null}
        <link rel="canonical" href={absUrl(path)} />
        {alternates?.map((a) => (
          <link key={a.lang} rel="alternate" hrefLang={a.lang} href={absUrl(a.path)} />
        ))}
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} (${lang.toUpperCase()})`} href={url(feedPath(lang))} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absUrl(path)} />
        {image ? <meta property="og:image" content={absUrl(image)} /> : null}
        <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
        <link rel="icon" href={url('/favicon.svg')} type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        <link rel="stylesheet" href={`${url('/assets/site.css')}?v=20260929-editorial`} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {jsonLd ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        ) : null}
      </head>
      <body>
        {children}
        <script src={`${url('/assets/site.js')}?v=20260929-editorial`} defer />
      </body>
    </html>
  );
}

export function TopBar({ lang, now, altPath }: { lang: Lang; now: Date; altPath: Record<Lang, string> }) {
  return (
    <div className="relative z-50 border-b hairline-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-3 font-mono-data text-[11px] uppercase tracking-wider text-[hsl(var(--muted))]">
          <span className="sm:hidden">{fmtShortDate(now, lang)} · GMT</span>
          <span className="hidden sm:inline">{fmtLongDate(now, lang)} · GMT</span>
        </div>
        <nav aria-label={T[lang].languageSelection}>
          <details className="relative group">
            <summary aria-label={T[lang].languageSelection} className="btn flex cursor-pointer list-none items-center gap-2 px-3 py-1.5 [&::-webkit-details-marker]:hidden">
              <span dir="ltr">{lang.toUpperCase()} <span aria-hidden="true">▾</span></span>
            </summary>
            <div className="absolute top-full z-50 mt-1 min-w-full border border-[hsl(var(--muted))] bg-[hsl(var(--paper))] p-1 shadow-lg" style={{ insetInlineEnd: 0 }}>
              {LANGS.map((edition) => (
                <a key={edition} href={url(altPath[edition])} hrefLang={edition} lang={edition}
                  aria-current={lang === edition ? 'page' : undefined}
                  className={`block whitespace-nowrap px-3 py-2 text-sm transition-colors ${lang === edition ? 'border-s-[3px] border-[hsl(var(--accent))] text-[hsl(var(--ink))]' : 'border-s-[3px] border-transparent text-[hsl(var(--body))] hover:bg-[hsl(var(--rule))]'}`}
                >{LANGUAGE_NAMES[edition]}</a>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </div>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-lockup ${className}`} lang="en" dir="ltr">
      <svg className="brand-mark" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 3v38M3 22h38M22 3c-7 6-10 12-10 19s3 13 10 19M22 3c7 6 10 12 10 19s-3 13-10 19" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <span className="brand-wordmark">MERIDIAN</span>
    </span>
  );
}

export function Masthead({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = T[lang];
  const home = homePath(lang);
  return (
    <header className="masthead">
      <div className={`mx-auto max-w-7xl px-4 text-center sm:px-6 ${compact ? 'py-5 sm:py-6' : 'py-7 sm:py-9'}`}>
        <a href={url(home)} className="inline-block" aria-label={`Meridian — ${t.home}`}>
          <span
            className="block font-serif-display leading-none text-[hsl(var(--ink))]"
            style={{ fontSize: compact ? 'clamp(2.15rem, 5vw, 3.2rem)' : 'clamp(2.5rem, 7.5vw, 5.6rem)' }}
          >
            <Logo />
          </span>
        </a>
      </div>
    </header>
  );
}

export function NavBar({ lang, active, sections }: { lang: Lang; active?: string; sections: typeof SECTIONS }) {
  const t = T[lang];
  return (
    <nav className="site-nav relative z-40 border-y border-[hsl(var(--ink))] bg-[hsl(var(--paper))]" aria-label={t.sections}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:justify-start">
        <a
          href={url(homePath(lang))}
          className="nav-link kicker shrink-0 py-3 pe-5 text-[hsl(var(--ink))]"
        >
          {t.home}
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {sections.map((s) => (
            <a
              key={s.slug}
              href={url(`/${lang}/section/${s.slug}/`)}
              aria-current={active === s.slug ? 'page' : undefined}
              className="nav-link kicker whitespace-nowrap py-3 text-[hsl(var(--ink))]"
            >
              {s[lang]}
            </a>
          ))}
        </div>
        <details className="relative py-2 md:hidden">
          <summary className="kicker cursor-pointer list-none border border-[hsl(var(--rule))] px-3 py-2 text-[hsl(var(--ink))] [&::-webkit-details-marker]:hidden">
            {t.sections} ▾
          </summary>
          <div className="absolute top-full z-50 min-w-44 border border-[hsl(var(--rule))] bg-[hsl(var(--paper))] p-2 shadow-lg" style={{ insetInlineEnd: 0 }}>
            {sections.map((s) => (
              <a key={s.slug} href={url(`/${lang}/section/${s.slug}/`)} aria-current={active === s.slug ? 'page' : undefined}
                className="block px-3 py-2 text-sm text-[hsl(var(--body))] hover:bg-[hsl(var(--rule))]">{s[lang]}</a>
            ))}
            <div className="my-1 border-t border-[hsl(var(--rule))]" />
            {(['about', 'principles', 'contact'] as const).map((page) => (
              <a key={page} href={url(`/${lang}/${page}/`)} className="block px-3 py-2 text-sm text-[hsl(var(--body))] hover:bg-[hsl(var(--rule))]">{page === 'about' ? t.aboutPage : t[page]}</a>
            ))}
          </div>
        </details>
      </div>
    </nav>
  );
}

export function Footer({ lang, sections }: { lang: Lang; sections: typeof SECTIONS }) {
  const t = T[lang];
  const year = new Date().getUTCFullYear();
  return (
    <footer className="mt-12 border-t border-[hsl(var(--ink))]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <a href={url(homePath(lang))} className="footer-brand font-serif-display text-3xl">
            <Logo />
          </a>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-[hsl(var(--body))]">{t.about}</p>
        </div>
        <div>
          <p className="kicker mb-4 text-[hsl(var(--muted))]">{t.sections}</p>
          <ul className="grid grid-cols-2 gap-y-2">
            {sections.map((s) => (
              <li key={s.slug}>
                <a href={url(`/${lang}/section/${s.slug}/`)} className="text-sm text-[hsl(var(--body))] transition-colors hover:text-[hsl(var(--accent))]">
                  {s[lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t hairline-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 font-mono-data text-[11px] uppercase tracking-wider text-[hsl(var(--muted))] sm:flex-row sm:px-6">
          <span lang="en">© {year} Meridian</span>
          <span className="flex flex-wrap items-center justify-center gap-4">
            {(['about', 'principles', 'contact'] as const).map((page) => (
              <a key={page} href={url(`/${lang}/${page}/`)} className="hover:text-[hsl(var(--accent))]">{page === 'about' ? t.aboutPage : t[page]}</a>
            ))}
            <a href={url(feedPath(lang))} className="hover:text-[hsl(var(--accent))]">{t.feed}</a>
            <span className="normal-case">{t.footerMotto}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function BylineName({ a, lang }: { a: Article; lang: Lang }) {
  const author = a.author || T[lang].newsroom;
  return (
    <>
      {author.trim().toLowerCase() === 'meridian'
        ? <span lang="en" className="normal-case">MERIDIAN</span>
        : author}
      {a.location ? ` · ${a.location}` : null}
    </>
  );
}

export function Byline({ a, lang, withTime = true }: { a: Article; lang: Lang; withTime?: boolean }) {
  const t = T[lang];
  return (
    <p className="font-mono-data text-[11px] uppercase tracking-wider text-[hsl(var(--muted))]">
      <BylineName a={a} lang={lang} />
      {withTime ? (
        <>
          {' — '}
          <time className="normal-case" dateTime={a.publishedAt.toISOString()}>{stampShort(a, lang)}</time>
        </>
      ) : null}{' '}
      · {a.readMinutes} {t.minRead}
    </p>
  );
}

function stampShort(a: Article, lang: Lang) {
  return `${fmtShortDate(a.publishedAt, lang)}, ${fmtClock(a.publishedAt)} GMT`;
}

export function Cover({ a, className, priority = false }: { a: Article; className: string; priority?: boolean }) {
  if (!a.cover) return null;
  return (
    <img
      src={url(a.cover)}
      alt={a.imageAlt ?? ''}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
