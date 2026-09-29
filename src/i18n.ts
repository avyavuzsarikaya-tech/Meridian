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
    edition: 'Global Edition',
    editorsPicks: "Editor's Picks",
    latest: 'The Latest',
    latestNote: 'Newest first',
    around: 'Around the Globe',
    aboutPage: 'About', principles: 'Principles', contact: 'Contact', published: 'Published', updateNote: 'Update note',
    minRead: 'min read',
    min: 'min',
    sources: 'Sources',
    listen: 'Listen to this article',
    play: 'Play', pause: 'Pause', seek: 'Audio position', speed: 'Playback speed',
    aiNarration: 'AI narration',
    audioDownload: 'Download audio',
    tags: 'Tags',
    moreFrom: 'More from',
    empty: 'The first edition is being prepared.',
    emptySection: 'No stories in this section yet.',
    about: 'Articles in five languages, with sources and updates alongside the text.',
    sections: 'Sections',
    newsroom: 'Meridian Newsroom',
    updated: 'Updated',
    notFound: 'Page not found',
    notFoundBody: 'The page you are looking for does not exist or has moved.',
    backHome: 'Back to the front page',
    home: 'Home',
    feed: 'RSS',
    readingSize: 'Text size',
    languageSelection: 'Choose language',
    footerMotto: '0° Longitude · Everywhere',
  },
  tr: {
    edition: 'Türkçe Baskı',
    editorsPicks: 'Editörün Seçtikleri',
    latest: 'Son Haberler',
    latestNote: 'Yeniden eskiye',
    around: 'Dünyadan',
    aboutPage: 'Hakkında', principles: 'İlkeler', contact: 'İletişim', published: 'Yayın', updateNote: 'Güncelleme notu',
    minRead: 'dk okuma',
    min: 'dk',
    sources: 'Kaynaklar',
    listen: 'Haberi dinle',
    play: 'Oynat', pause: 'Duraklat', seek: 'Ses konumu', speed: 'Oynatma hızı',
    aiNarration: 'Yapay zekâ seslendirmesi',
    audioDownload: 'Ses dosyasını indir',
    tags: 'Etiketler',
    moreFrom: 'Bu bölümden',
    empty: 'İlk sayı hazırlanıyor.',
    emptySection: 'Bu bölümde henüz haber yok.',
    about: 'Beş dilde yazılar; kaynaklar ve güncellemeler metinle birlikte.',
    sections: 'Bölümler',
    newsroom: 'Meridian Haber Masası',
    updated: 'Güncellendi',
    notFound: 'Sayfa bulunamadı',
    notFoundBody: 'Aradığınız sayfa yok ya da taşındı.',
    backHome: 'Ön sayfaya dön',
    home: 'Ana Sayfa',
    feed: 'RSS',
    readingSize: 'Yazı boyutu',
    languageSelection: 'Dil seçimi',
    footerMotto: '0° Boylam · Her yerde',
  },
  ar: {
    edition: 'النسخة العربية',
    editorsPicks: 'اختيارات المحرر', latest: 'الأحدث', latestNote: 'الأحدث أولاً', around: 'حول العالم',
    aboutPage: 'من نحن', principles: 'المبادئ', contact: 'اتصل بنا', published: 'نُشر', updateNote: 'ملاحظة التحديث',
    minRead: 'دقيقة قراءة', min: 'دقيقة', sources: 'المصادر', listen: 'استمع إلى المقال', aiNarration: 'قراءة بصوت الذكاء الاصطناعي',
    play: 'تشغيل', pause: 'إيقاف مؤقت', seek: 'موضع الصوت', speed: 'سرعة التشغيل',
    audioDownload: 'تنزيل الملف الصوتي', tags: 'وسوم', moreFrom: 'المزيد من', empty: 'العدد الأول قيد الإعداد.',
    emptySection: 'لا توجد مقالات في هذا القسم بعد.', about: 'مقالات بخمس لغات، مع المصادر والتحديثات إلى جانب النص.',
    sections: 'الأقسام', newsroom: 'غرفة أخبار ميريديان', updated: 'تحديث', notFound: 'الصفحة غير موجودة',
    notFoundBody: 'الصفحة التي تبحث عنها غير موجودة أو نُقلت.', backHome: 'العودة إلى الصفحة الرئيسية', home: 'الرئيسية', feed: 'RSS',
    readingSize: 'حجم النص',
    languageSelection: 'اختيار اللغة',
    footerMotto: 'خط الطول ٠° · في كل مكان',
  },
  fr: {
    edition: 'Édition française',
    editorsPicks: 'Choix de la rédaction', latest: 'À la une', latestNote: 'Du plus récent au plus ancien', around: 'Dans le monde',
    aboutPage: 'À propos', principles: 'Principes', contact: 'Contact', published: 'Publié le', updateNote: 'Note de mise à jour',
    minRead: 'min de lecture', min: 'min', sources: 'Sources', listen: 'Écouter cet article', aiNarration: 'Lecture par IA',
    play: 'Lire', pause: 'Pause', seek: 'Position audio', speed: 'Vitesse de lecture',
    audioDownload: 'Télécharger le fichier audio', tags: 'Mots-clés', moreFrom: 'Dans la rubrique', empty: 'La première édition se prépare.',
    emptySection: 'Aucun article dans cette rubrique pour le moment.', about: 'Des articles en cinq langues, avec leurs sources et mises à jour.',
    sections: 'Rubriques', newsroom: 'Rédaction Meridian', updated: 'Mis à jour', notFound: 'Page introuvable',
    notFoundBody: 'La page demandée est introuvable ou a été déplacée.', backHome: 'Retour à l’accueil', home: 'Accueil', feed: 'RSS',
    readingSize: 'Taille du texte',
    languageSelection: 'Choix de la langue',
    footerMotto: '0° de longitude · Partout',
  },
  es: {
    edition: 'Edición en español',
    editorsPicks: 'Selección del editor', latest: 'Lo último', latestNote: 'Más recientes primero', around: 'Por el mundo',
    aboutPage: 'Acerca de', principles: 'Principios', contact: 'Contacto', published: 'Publicado', updateNote: 'Nota de actualización',
    minRead: 'min de lectura', min: 'min', sources: 'Fuentes', listen: 'Escuchar este artículo', aiNarration: 'Narración con IA',
    play: 'Reproducir', pause: 'Pausar', seek: 'Posición del audio', speed: 'Velocidad de reproducción',
    audioDownload: 'Descargar audio', tags: 'Etiquetas', moreFrom: 'Más de', empty: 'Estamos preparando la primera edición.',
    emptySection: 'Todavía no hay artículos en esta sección.', about: 'Artículos en cinco idiomas, con fuentes y actualizaciones junto al texto.',
    sections: 'Secciones', newsroom: 'Redacción Meridian', updated: 'Actualizado', notFound: 'Página no encontrada',
    notFoundBody: 'La página que buscas no existe o ha cambiado de dirección.', backHome: 'Volver a portada', home: 'Inicio', feed: 'RSS',
    readingSize: 'Tamaño del texto',
    languageSelection: 'Selección de idioma',
    footerMotto: '0° de longitud · En todas partes',
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
  if (lang === 'es') {
    const months = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.'];
    return `${d.getUTCDate()} ${months[d.getUTCMonth()]}`;
  }
  return d.toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function fmtClock(d: Date) {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
}

/** Haber zamanı: tarih + saat (GMT). */
export function fmtStamp(d: Date, lang: Lang) {
  return `${fmtDate(d, lang)}, ${fmtClock(d)} GMT`;
}
