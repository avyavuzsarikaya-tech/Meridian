import { T, type Lang } from '../i18n';

export type InfoKind = 'about' | 'principles' | 'contact';

const COPY: Record<Lang, Record<InfoKind, string[]>> = {
  en: {
    about: ['Meridian publishes articles in five languages. Each article has a permanent address, a publication time in GMT and, when applicable, its sources. Browse by section or follow the RSS feed.'],
    principles: ['We identify the sources behind factual claims and list them with the article. A substantial change to a published text should carry an update time and a short note explaining the change.', 'The front page is selected by editors. Publication order alone does not determine what appears there.'],
    contact: ['To suggest a correction or send feedback, open a public issue in the Meridian repository. Do not include private information in a public issue.'],
  },
  tr: {
    about: ['Meridian beş dilde yazılar yayımlar. Her yazının kalıcı adresi, GMT yayın zamanı ve varsa kaynakları bulunur. Yazılara bölümlerden veya RSS üzerinden ulaşabilirsiniz.'],
    principles: ['Olgusal iddiaların dayandığı kaynakları belirtir ve yazının altında listeleriz. Yayımlanmış bir metinde önemli değişiklik yapıldığında güncelleme zamanı ve değişikliği açıklayan kısa bir not eklenir.', 'Ön sayfa editör seçimiyle hazırlanır. Yalnızca yayın sırası, hangi yazının öne çıkacağını belirlemez.'],
    contact: ['Düzeltme önerisi veya geri bildirim için Meridian deposunda herkese açık bir kayıt açabilirsiniz. Herkese açık kayda özel bilgi yazmayın.'],
  },
  ar: {
    about: ['تنشر ميريديان مقالات بخمس لغات. لكل مقال رابط دائم ووقت نشر بتوقيت غرينتش، وتُذكر مصادره إن وُجدت. يمكن تصفح الأقسام أو متابعة خلاصة RSS.'],
    principles: ['نذكر المصادر التي تستند إليها الادعاءات ونضعها في نهاية المقال. وإذا طرأ تغيير مهم على نص منشور، نضيف وقت التحديث وملاحظة قصيرة تشرح التغيير.', 'تُختار مواد الصفحة الرئيسية تحريرياً، ولا يحدد ترتيب النشر وحده ما يظهر فيها.'],
    contact: ['لاقتراح تصحيح أو إرسال ملاحظة، افتح بلاغاً عاماً في مستودع ميريديان. لا تضع معلومات خاصة في بلاغ عام.'],
  },
  fr: {
    about: ['Meridian publie des articles en cinq langues. Chaque article dispose d’une adresse permanente, d’une date de publication en GMT et, le cas échéant, de ses sources. Vous pouvez parcourir les rubriques ou suivre le flux RSS.'],
    principles: ['Nous indiquons les sources des affirmations factuelles et les listons à la fin de l’article. Une modification importante d’un texte publié s’accompagne d’une date de mise à jour et d’une courte note explicative.', 'La une résulte d’un choix éditorial. L’ordre de publication ne détermine pas à lui seul les articles mis en avant.'],
    contact: ['Pour proposer une correction ou transmettre une remarque, ouvrez un ticket public dans le dépôt Meridian. N’y indiquez aucune information privée.'],
  },
  es: {
    about: ['Meridian publica artículos en cinco idiomas. Cada artículo tiene una dirección permanente, una fecha de publicación en GMT y, cuando corresponde, sus fuentes. Puedes explorar las secciones o seguir el canal RSS.'],
    principles: ['Indicamos las fuentes de las afirmaciones factuales y las enumeramos al final del artículo. Una modificación importante de un texto publicado incluye la fecha de actualización y una breve nota que explica el cambio.', 'La portada responde a una selección editorial. El orden de publicación no determina por sí solo qué artículos se destacan.'],
    contact: ['Para sugerir una corrección o enviar comentarios, abre una incidencia pública en el repositorio de Meridian. No incluyas información privada en ella.'],
  },
};

export function InfoPage({ lang, kind }: { lang: Lang; kind: InfoKind }) {
  const t = T[lang];
  const title = kind === 'about' ? t.aboutPage : t[kind];
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-serif-display text-4xl font-bold">{title}</h1>
      <div className="article-body mt-8 space-y-5">
        {COPY[lang][kind].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {kind === 'contact' && (
          <p><a href="https://github.com/avyavuzsarikaya-tech/Meridian/issues/new" target="_blank" rel="noopener noreferrer"
            className="underline underline-offset-4">{title} · GitHub</a></p>
        )}
      </div>
    </article>
  );
}
