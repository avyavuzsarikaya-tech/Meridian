export type Lang = 'en' | 'tr';
export const LANGS: Lang[] = ['en', 'tr'];

export const SECTIONS: { slug: string; en: string; tr: string }[] = [
  { slug: 'world', en: 'World', tr: 'Dünya' },
  { slug: 'politics', en: 'Politics', tr: 'Siyaset' },
  { slug: 'business', en: 'Business', tr: 'Ekonomi' },
  { slug: 'science', en: 'Science', tr: 'Bilim' },
  { slug: 'technology', en: 'Technology', tr: 'Teknoloji' },
  { slug: 'health', en: 'Health', tr: 'Sağlık' },
  { slug: 'culture', en: 'Culture', tr: 'Kültür' },
];

export function sectionName(slug: string, lang: Lang): string {
  const s = SECTIONS.find((x) => x.slug === slug);
  return s ? s[lang] : slug;
}

export const T = {
  en: {
    tagline: 'The world, in full.',
    masthead: 'Independent · Global · Since 2026',
    edition: 'Global Edition',
    editorsPicks: "Editor's Picks",
    latest: 'The Latest',
    latestNote: 'Newest first',
    around: 'Around the Globe',
    breaking: 'Breaking',
    minRead: 'min read',
    min: 'min',
    sources: 'Sources',
    tags: 'Tags',
    moreFrom: 'More from',
    empty: 'The first edition is being prepared.',
    emptySection: 'No stories in this section yet.',
    about: 'An independent global newsroom. Every story lists the sources it is built on.',
    sections: 'Sections',
    newsroom: 'Meridian Newsroom',
    updated: 'Updated',
    notFound: 'Page not found',
    notFoundBody: 'The page you are looking for does not exist or has moved.',
    backHome: 'Back to the front page',
    home: 'Front page',
    feed: 'RSS',
  },
  tr: {
    tagline: 'Dünya, bütünüyle.',
    masthead: "Bağımsız · Küresel · 2026'dan beri",
    edition: 'Türkçe Baskı',
    editorsPicks: 'Editörün Seçtikleri',
    latest: 'Son Haberler',
    latestNote: 'Yeniden eskiye',
    around: 'Dünyadan',
    breaking: 'Son Dakika',
    minRead: 'dk okuma',
    min: 'dk',
    sources: 'Kaynaklar',
    tags: 'Etiketler',
    moreFrom: 'Bu bölümden',
    empty: 'İlk sayı hazırlanıyor.',
    emptySection: 'Bu bölümde henüz haber yok.',
    about: 'Bağımsız, küresel bir haber masası. Her haberin dayandığı kaynaklar yazının altında listelenir.',
    sections: 'Bölümler',
    newsroom: 'Meridian Haber Masası',
    updated: 'Güncellendi',
    notFound: 'Sayfa bulunamadı',
    notFoundBody: 'Aradığınız sayfa yok ya da taşındı.',
    backHome: 'Ön sayfaya dön',
    home: 'Ön sayfa',
    feed: 'RSS',
  },
} as const;

const LOCALE: Record<Lang, string> = { en: 'en-GB', tr: 'tr-TR' };

export function fmtLongDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(LOCALE[lang], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function fmtDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function fmtShortDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function fmtClock(d: Date) {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
}

/** Haber zamanı: tarih + saat (GMT). */
export function fmtStamp(d: Date, lang: Lang) {
  return `${fmtDate(d, lang)}, ${fmtClock(d)} GMT`;
}
