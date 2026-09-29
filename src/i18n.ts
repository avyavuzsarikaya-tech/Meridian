export type Lang = 'en' | 'tr' | 'ar' | 'fr' | 'es';
export const LANGS: Lang[] = ['en', 'tr', 'ar', 'fr', 'es'];
export const LANGUAGE_NAMES: Record<Lang, string> = { en: 'English', tr: 'Türkçe', ar: 'العربية', fr: 'Français', es: 'Español' };
export function homePath(lang: Lang) { return lang === 'en' ? '/' : `/${lang}/`; }
export function feedPath(lang: Lang) { return lang === 'en' ? '/feed.xml' : `/${lang}/feed.xml`; }

export const SECTIONS: ({ slug: string } & Record<Lang, string>)[] = [
  { slug: 'world', en: 'World', tr: 'Dünya', ar: 'العالم', fr: 'Monde', es: 'Mundo' },
  { slug: 'politics', en: 'Politics', tr: 'Siyaset', ar: 'سياسة', fr: 'Politique', es: 'Política' },
  { slug: 'business', en: 'Business', tr: 'Ekonomi', ar: 'اقتصاد', fr: 'Économie', es: 'Economía' },
  { slug: 'science', en: 'Science', tr: 'Bilim', ar: 'علوم', fr: 'Sciences', es: 'Ciencia' },
  { slug: 'technology', en: 'Technology', tr: 'Teknoloji', ar: 'تقنية', fr: 'Technologie', es: 'Tecnología' },
  { slug: 'health', en: 'Health', tr: 'Sağlık', ar: 'صحة', fr: 'Santé', es: 'Salud' },
  { slug: 'culture', en: 'Culture', tr: 'Kültür', ar: 'ثقافة', fr: 'Culture', es: 'Cultura' },
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
    listen: 'Listen to this article',
    aiNarration: 'AI narration',
    audioDownload: 'Download audio',
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
    home: 'Home',
    feed: 'RSS',
    readingSize: 'Text size',
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
    listen: 'Haberi dinle',
    aiNarration: 'Yapay zekâ seslendirmesi',
    audioDownload: 'Ses dosyasını indir',
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
    home: 'Ana Sayfa',
    feed: 'RSS',
    readingSize: 'Yazı boyutu',
  },
  ar: {
    tagline: 'العالم بكل تفاصيله.', masthead: 'مستقل · عالمي · منذ ٢٠٢٦', edition: 'النسخة العربية',
    editorsPicks: 'اختيارات المحرر', latest: 'الأحدث', latestNote: 'الأحدث أولاً', around: 'حول العالم', breaking: 'عاجل',
    minRead: 'دقيقة قراءة', min: 'دقيقة', sources: 'المصادر', listen: 'استمع إلى المقال', aiNarration: 'قراءة بصوت الذكاء الاصطناعي',
    audioDownload: 'تنزيل الملف الصوتي', tags: 'وسوم', moreFrom: 'المزيد من', empty: 'العدد الأول قيد الإعداد.',
    emptySection: 'لا توجد مقالات في هذا القسم بعد.', about: 'غرفة أخبار عالمية مستقلة. تُذكر مصادر كل مقال في نهايته.',
    sections: 'الأقسام', newsroom: 'غرفة أخبار ميريديان', updated: 'تحديث', notFound: 'الصفحة غير موجودة',
    notFoundBody: 'الصفحة التي تبحث عنها غير موجودة أو نُقلت.', backHome: 'العودة إلى الصفحة الرئيسية', home: 'الرئيسية', feed: 'RSS',
    readingSize: 'حجم النص',
  },
  fr: {
    tagline: 'Le monde, dans toute sa complexité.', masthead: 'Indépendant · International · Depuis 2026', edition: 'Édition française',
    editorsPicks: 'Choix de la rédaction', latest: 'À la une', latestNote: 'Du plus récent au plus ancien', around: 'Dans le monde', breaking: 'Urgent',
    minRead: 'min de lecture', min: 'min', sources: 'Sources', listen: 'Écouter cet article', aiNarration: 'Lecture par IA',
    audioDownload: 'Télécharger le fichier audio', tags: 'Mots-clés', moreFrom: 'Dans la rubrique', empty: 'La première édition se prépare.',
    emptySection: 'Aucun article dans cette rubrique pour le moment.', about: 'Une rédaction mondiale indépendante. Les sources de chaque article figurent à la fin du texte.',
    sections: 'Rubriques', newsroom: 'Rédaction Meridian', updated: 'Mis à jour', notFound: 'Page introuvable',
    notFoundBody: 'La page demandée est introuvable ou a été déplacée.', backHome: 'Retour à l’accueil', home: 'Accueil', feed: 'RSS',
    readingSize: 'Taille du texte',
  },
  es: {
    tagline: 'El mundo, en toda su amplitud.', masthead: 'Independiente · Global · Desde 2026', edition: 'Edición en español',
    editorsPicks: 'Selección del editor', latest: 'Lo último', latestNote: 'Más recientes primero', around: 'Por el mundo', breaking: 'Última hora',
    minRead: 'min de lectura', min: 'min', sources: 'Fuentes', listen: 'Escuchar este artículo', aiNarration: 'Narración con IA',
    audioDownload: 'Descargar audio', tags: 'Etiquetas', moreFrom: 'Más de', empty: 'Estamos preparando la primera edición.',
    emptySection: 'Todavía no hay artículos en esta sección.', about: 'Una redacción global independiente. Las fuentes de cada artículo figuran al final del texto.',
    sections: 'Secciones', newsroom: 'Redacción Meridian', updated: 'Actualizado', notFound: 'Página no encontrada',
    notFoundBody: 'La página que buscas no existe o ha cambiado de dirección.', backHome: 'Volver a portada', home: 'Inicio', feed: 'RSS',
    readingSize: 'Tamaño del texto',
  },
} as const;

const LOCALE: Record<Lang, string> = { en: 'en-GB', tr: 'tr-TR', ar: 'ar', fr: 'fr-FR', es: 'es-ES' };

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
