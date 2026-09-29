import type { ReactNode } from 'react';
import { url, absUrl, SITE_NAME } from '../config';
import { SECTIONS, T, fmtLongDate, fmtClock, type Lang } from '../i18n';
import type { Article } from '../content';

const FONTS =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Rubik:wght@400;500;600;700&display=swap';

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
  /** Noktalı kâğıt dokusu yalnız ön sayfada; okuma sayfalarında düz zemin. */
  grain?: boolean;
  children: ReactNode;
}) {
  return (
    <html lang={lang}>
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
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} (${lang.toUpperCase()})`} href={url(lang === 'tr' ? '/tr/feed.xml' : '/feed.xml')} />
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
        <link rel="stylesheet" href={url('/assets/site.css')} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {jsonLd ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        ) : null}
      </head>
      <body className={grain ? 'grain' : undefined}>
        {children}
        <script src={url('/assets/site.js')} defer />
      </body>
    </html>
  );
}

export function TopBar({ lang, now, altPath }: { lang: Lang; now: Date; altPath: { en: string; tr: string } }) {
  return (
    <div className="border-b hairline-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-3 font-mono-data text-[11px] uppercase tracking-wider text-[hsl(var(--muted))]">
          <span className="hidden sm:inline" data-date={lang}>{fmtLongDate(now, lang)}</span>
          <span className="hidden h-3 w-px bg-[hsl(var(--rule))] sm:inline-block" />
          <span data-clock>{fmtClock(now)} GMT</span>
        </div>
        <nav aria-label="Edition" className="flex items-center gap-1">
          <a
            href={url(altPath.en)}
            hrefLang="en"
            lang="en"
            className={`kicker px-2.5 py-1 transition-colors ${lang === 'en' ? 'bg-[hsl(var(--ink))] text-[hsl(var(--cream))]' : 'text-[hsl(var(--body))] hover:text-[hsl(var(--accent))]'}`}
          >
            English
          </a>
          <a
            href={url(altPath.tr)}
            hrefLang="tr"
            lang="tr"
            className={`kicker px-2.5 py-1 transition-colors ${lang === 'tr' ? 'bg-[hsl(var(--ink))] text-[hsl(var(--cream))]' : 'text-[hsl(var(--body))] hover:text-[hsl(var(--accent))]'}`}
          >
            Türkçe
          </a>
        </nav>
      </div>
    </div>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={className} lang="en">
      Meri<span className="text-[hsl(var(--accent))]">d</span>ian
    </span>
  );
}

export function Masthead({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = T[lang];
  const home = lang === 'tr' ? '/tr/' : '/';
  return (
    <header className="relative overflow-hidden">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="hsl(220 9% 14% / 0.12)" strokeWidth="1">
          <ellipse cx="600" cy="240" rx="620" ry="300" />
          <ellipse cx="600" cy="240" rx="460" ry="300" />
          <ellipse cx="600" cy="240" rx="300" ry="300" />
          <ellipse cx="600" cy="240" rx="140" ry="300" />
        </g>
        <g fill="none" stroke="hsl(16 100% 48% / 0.35)" strokeWidth="1">
          <ellipse className="meridian-arc" cx="600" cy="240" rx="540" ry="300" />
          <ellipse className="meridian-arc" cx="600" cy="240" rx="220" ry="300" style={{ animationDelay: '-7s' }} />
        </g>
        <circle cx="600" cy="40" r="3.5" fill="hsl(16 100% 48%)" />
      </svg>

      <div className={`relative mx-auto max-w-7xl px-4 text-center sm:px-6 ${compact ? 'pb-4 pt-6 sm:pt-8' : 'pb-6 pt-10 sm:pt-14'}`}>
        {!compact && <p className="kicker mb-3 text-[hsl(var(--muted))]">{t.masthead}</p>}
        <a href={url(home)} className="inline-block" aria-label={`Meridian — ${t.home}`}>
          <span
            className="block font-serif-display font-black uppercase leading-none tracking-tight text-[hsl(var(--ink))]"
            style={{ fontSize: compact ? 'clamp(2.4rem, 6vw, 4.25rem)' : 'clamp(3.2rem, 11vw, 9rem)' }}
          >
            <Logo />
          </span>
        </a>
        {!compact && (
          <p className="mt-3 font-serif-display text-lg italic text-[hsl(var(--body))] sm:text-xl">{t.tagline}</p>
        )}
      </div>
    </header>
  );
}

export function Ticker({ lang, items }: { lang: Lang; items: Article[] }) {
  if (items.length === 0) return null;
  const t = T[lang];
  return (
    <div className="border-y hairline-t hairline-b bg-[hsl(var(--ink))] text-[hsl(var(--cream))]" data-ticker>
      <div className="mx-auto flex max-w-7xl items-stretch px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-2 border-r border-[hsl(var(--cream)/0.2)] py-2.5 pr-4">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
          <span className="kicker text-[hsl(var(--cream))]">{t.breaking}</span>
        </div>
        <ul className="ticker-list relative min-h-10 flex-1 overflow-hidden pl-4">
          {items.map((a, i) => (
            <li key={a.path} className="ticker-item" data-active={i === 0 ? 'true' : undefined}>
              <a href={url(a.path)} className="flex h-10 items-center truncate font-mono-data text-[12px] tracking-wide hover:text-[hsl(var(--accent))]">
                <span className="truncate">{a.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function NavBar({ lang, active }: { lang: Lang; active?: string }) {
  const t = T[lang];
  return (
    <nav className="site-nav sticky top-0 z-40 border-b hairline-b bg-[hsl(var(--paper)/0.94)] backdrop-blur-sm" aria-label={lang === 'tr' ? 'Ana gezinme' : 'Primary navigation'}>
      <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6">
        <a
          href={url(lang === 'tr' ? '/tr/' : '/')}
          className="kicker shrink-0 border-r border-[hsl(var(--rule))] py-1 pl-0 pr-4 text-[hsl(var(--ink))] transition-colors hover:text-[hsl(var(--accent))]"
        >
          {t.home}
        </a>
        <div className="flex items-center gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {SECTIONS.map((s) => (
            <a
              key={s.slug}
              href={url(`/${lang}/section/${s.slug}/`)}
              aria-current={active === s.slug ? 'page' : undefined}
              className={`kicker whitespace-nowrap px-3 py-1 transition-colors ${
                active === s.slug
                  ? 'bg-[hsl(var(--ink))] text-[hsl(var(--cream))]'
                  : 'text-[hsl(var(--body))] hover:text-[hsl(var(--accent))]'
              }`}
            >
              {s[lang]}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const t = T[lang];
  const year = new Date().getUTCFullYear();
  return (
    <footer className="mt-10 border-t-2 ink-rule">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <a href={url(lang === 'tr' ? '/tr/' : '/')} className="font-serif-display text-4xl font-black uppercase tracking-tight">
            <Logo />
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[hsl(var(--body))]">{t.about}</p>
        </div>
        <div>
          <p className="kicker mb-4 text-[hsl(var(--muted))]">{t.sections}</p>
          <ul className="grid grid-cols-2 gap-y-2">
            {SECTIONS.map((s) => (
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
          <span className="flex items-center gap-4">
            <a href={url(lang === 'tr' ? '/tr/feed.xml' : '/feed.xml')} className="hover:text-[hsl(var(--accent))]">{t.feed}</a>
            <span lang="en">0° Longitude · Everywhere</span>
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
          <time dateTime={a.publishedAt.toISOString()}>{stampShort(a, lang)}</time>
        </>
      ) : null}{' '}
      · {a.readMinutes} {t.minRead}
    </p>
  );
}

function stampShort(a: Article, lang: Lang) {
  return `${a.publishedAt.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })}, ${fmtClock(a.publishedAt)} GMT`;
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
