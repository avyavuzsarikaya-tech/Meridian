// Siteyi derler: her sayfayı hazır HTML olarak dist/ klasörüne yazar.
// Böylece JavaScript çalıştırmayan okuyucular (ve yapay zekâlar) da her şeyi görür.
import fs from 'node:fs';
import path from 'node:path';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BASE, REPO, SITE_NAME, SITE_URL, absUrl } from '../src/config';
import { loadArticles, isLive, type Article } from '../src/content';
import { LANGS, SECTIONS, T, sectionName, type Lang } from '../src/i18n';
import { Document, Footer, Masthead, NavBar, Ticker, TopBar } from '../src/components/Chrome';
import { Home } from '../src/pages/Home';
import { ArticlePage } from '../src/pages/ArticlePage';
import { SectionPage } from '../src/pages/SectionPage';

const OUT = path.resolve('dist');
const now = new Date();

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// public/ → dist/
fs.cpSync(path.resolve('public'), OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.copyFileSync(path.resolve('src/site.js'), path.join(OUT, 'assets/site.js'));

const { articles, warnings } = loadArticles();
warnings.forEach((w) => console.warn('uyarı:', w));

const live = articles.filter((a) => isLive(a, now));
const byLang = (lang: Lang) => live.filter((a) => a.lang === lang);

function write(rel: string, html: string) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function page(rel: string, el: ReactElement) {
  write(rel, '<!doctype html>' + renderToStaticMarkup(el));
}

function homePath(lang: Lang) {
  return lang === 'tr' ? '/tr/' : '/';
}

function breaking(lang: Lang) {
  const twoDays = 48 * 3600_000;
  return byLang(lang)
    .filter((a) => a.status === 'published' && a.breaking && now.getTime() - a.publishedAt.getTime() < twoDays)
    .slice(0, 5);
}

function Shell({
  lang,
  pagePath,
  alt,
  compact,
  activeSection,
  children,
  ...meta
}: {
  lang: Lang;
  pagePath: string;
  alt: { en: string; tr: string };
  compact?: boolean;
  activeSection?: string;
  title: string;
  description: string;
  image?: string;
  jsonLd?: object;
  noindex?: boolean;
  grain?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Document lang={lang} path={pagePath} {...meta}>
      <TopBar lang={lang} now={now} altPath={alt} />
      <Masthead lang={lang} compact={compact} />
      <Ticker lang={lang} items={breaking(lang)} />
      <NavBar lang={lang} active={activeSection} />
      <main>{children}</main>
      <Footer lang={lang} />
    </Document>
  );
}

const publisher = { '@type': 'NewsMediaOrganization', name: SITE_NAME, url: absUrl('/') };

// ---------- ön sayfalar ----------
for (const lang of LANGS) {
  const t = T[lang];
  const list = byLang(lang);
  const p = homePath(lang);
  page(
    p === '/' ? 'index.html' : 'tr/index.html',
    <Shell
      lang={lang}
      pagePath={p}
      alt={{ en: '/', tr: '/tr/' }}
      grain
      title={`${SITE_NAME} — ${t.tagline}`}
      description={t.about}
      jsonLd={{ '@context': 'https://schema.org', ...publisher, inLanguage: lang }}
    >
      <Home lang={lang} list={list} />
    </Shell>,
  );
}
// /en/ → /
write('en/index.html', redirect('/'));

// ---------- haber sayfaları ----------
// Arşivdekiler de dahil: bağlantılar kırılmasın.
for (const a of live) {
  const related = byLang(a.lang)
    .filter((r) => r !== a && r.section === a.section && r.status === 'published')
    .slice(0, 3);
  page(
    a.path.slice(1) + 'index.html',
    <Shell
      lang={a.lang}
      pagePath={a.path}
      alt={{ en: a.lang === 'en' ? a.path : '/', tr: a.lang === 'tr' ? a.path : '/tr/' }}
      compact
      activeSection={a.section}
      title={`${a.title} | ${SITE_NAME}`}
      description={a.spot || a.bodyText.slice(0, 160)}
      image={a.cover}
      jsonLd={articleLd(a)}
    >
      <ArticlePage a={a} related={related} />
    </Shell>,
  );
}

// ---------- bölüm sayfaları ----------
for (const lang of LANGS) {
  for (const s of SECTIONS) {
    const p = `/${lang}/section/${s.slug}/`;
    const list = byLang(lang).filter((a) => a.section === s.slug);
    page(
      p.slice(1) + 'index.html',
      <Shell
        lang={lang}
        pagePath={p}
        alt={{ en: `/en/section/${s.slug}/`, tr: `/tr/section/${s.slug}/` }}
        compact
        activeSection={s.slug}
        title={`${s[lang]} | ${SITE_NAME}`}
        description={`${SITE_NAME}: ${s[lang]}`}
      >
        <SectionPage lang={lang} section={s.slug} list={list} />
      </Shell>,
    );
  }
}

// ---------- 404 ----------
page(
  '404.html',
  <Shell lang="en" pagePath="/404.html" alt={{ en: '/', tr: '/tr/' }} compact title={`${T.en.notFound} | ${SITE_NAME}`} description={T.en.notFoundBody} noindex>
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-serif-display text-4xl font-bold">{T.en.notFound}</h1>
      <p className="mt-4 text-[hsl(var(--body))]">{T.en.notFoundBody}</p>
      <p className="mt-8">
        <a className="kicker border border-[hsl(var(--ink))] px-5 py-2 hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]" href={BASE}>
          {T.en.backHome}
        </a>
      </p>
    </section>
  </Shell>,
);

// ---------- RSS ----------
for (const lang of LANGS) {
  const items = byLang(lang)
    .filter((a) => a.status === 'published')
    .slice(0, 30)
    .map(
      (a) => `    <item>
      <title>${xml(a.title)}</title>
      <link>${xml(absUrl(a.path))}</link>
      <guid isPermaLink="true">${xml(absUrl(a.path))}</guid>
      <pubDate>${a.publishedAt.toUTCString()}</pubDate>
      <category>${xml(sectionName(a.section, lang))}</category>
      <description>${xml(a.spot)}</description>
    </item>`,
    )
    .join('\n');
  write(
    lang === 'tr' ? 'tr/feed.xml' : 'feed.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}${lang === 'tr' ? ' (Türkçe)' : ''}</title>
    <link>${xml(absUrl(homePath(lang)))}</link>
    <description>${xml(T[lang].about)}</description>
    <language>${lang}</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`,
  );
}

// ---------- sitemap, robots, llms.txt ----------
const urls = [
  '/',
  '/tr/',
  ...live.map((a) => a.path),
  ...LANGS.flatMap((l) => SECTIONS.map((s) => `/${l}/section/${s.slug}/`)),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${xml(absUrl(u))}</loc></url>`).join('\n')}
</urlset>
`,
);

// Tüm okuyuculara ve yapay zekâ tarayıcılarına açık
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: ${BASE}admin/\n\nSitemap: ${absUrl('/sitemap.xml')}\n`);

write(
  'llms.txt',
  `# ${SITE_NAME}

> ${T.en.about}

Every article page is plain HTML. Sources are listed at the end of each article.

${LANGS.map(
  (lang) => `## ${lang === 'tr' ? 'Türkçe' : 'English'}

${byLang(lang)
  .filter((a) => a.status === 'published')
  .slice(0, 50)
  .map((a) => `- [${a.title}](${absUrl(a.path)}): ${a.spot}`)
  .join('\n') || '- (no stories yet)'}
`,
).join('\n')}`,
);

// ---------- yönetim paneli ayarı ----------
const adminCfgPath = path.join(OUT, 'admin/config.yml');
if (fs.existsSync(adminCfgPath)) {
  const cfg = fs
    .readFileSync(adminCfgPath, 'utf8')
    .replace(/__REPO__/g, REPO)
    .replace(/__SITE_URL__/g, SITE_URL || '')
    .replace(/__BASE__/g, BASE);
  fs.writeFileSync(adminCfgPath, cfg);
}
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log(
  `Derlendi: ${live.length} yayında haber (${articles.length - live.length} taslak/ileri tarihli), kök: ${BASE}${SITE_URL ? ', adres: ' + SITE_URL : ''}`,
);

// ---------- yardımcılar ----------
function articleLd(a: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: a.title,
    description: a.spot,
    inLanguage: a.lang,
    datePublished: a.publishedAt.toISOString(),
    dateModified: (a.updatedAt ?? a.publishedAt).toISOString(),
    articleSection: sectionName(a.section, a.lang),
    author: { '@type': a.author ? 'Person' : 'Organization', name: a.author || T[a.lang].newsroom },
    image: a.cover ? [absUrl(a.cover)] : undefined,
    keywords: a.tags.length ? a.tags.join(', ') : undefined,
    citation: a.sources.length ? a.sources.map((s) => (s.url ? { '@type': 'CreativeWork', name: s.title, url: s.url } : s.title)) : undefined,
    mainEntityOfPage: absUrl(a.path),
    publisher,
  };
}

function redirect(to: string) {
  const u = BASE + to.replace(/^\//, '');
  return `<!doctype html><meta charset="utf-8"><title>Meridian</title><link rel="canonical" href="${u}"><meta http-equiv="refresh" content="0; url=${u}"><a href="${u}">Meridian</a>`;
}

function xml(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
