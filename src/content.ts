import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { url } from './config';
import { SECTIONS, type Lang } from './i18n';

export type Source = { title: string; url?: string };

export type Article = {
  file: string;
  slug: string;
  lang: Lang;
  title: string;
  spot: string;
  section: string;
  cover?: string;
  audio?: string;
  imageAlt?: string;
  imageCaption?: string;
  author?: string;
  location?: string;
  readMinutes: number;
  headline: boolean;
  editorsPick: boolean;
  breaking: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  sources: Source[];
  bodyHtml: string;
  bodyText: string;
  /** site içi yol, ör. "/en/nairobi-accord/" */
  path: string;
};

const CONTENT_DIR = path.resolve(process.env.CONTENT_DIR ?? 'content/articles');

// Gövdedeki "/images/..." yollarını yayın köküne göre düzelt.
const md = new Marked({
  renderer: {
    image({ href, title, text }) {
      const src = href.startsWith('/') ? url(href) : href;
      const t = title ? ` title="${escapeAttr(title)}"` : '';
      return `<img src="${escapeAttr(src)}" alt="${escapeAttr(text)}"${t} loading="lazy" decoding="async">`;
    },
    link({ href, title, tokens }) {
      const inner = this.parser.parseInline(tokens);
      const external = /^https?:\/\//i.test(href);
      const h = href.startsWith('/') ? url(href) : href;
      const t = title ? ` title="${escapeAttr(title)}"` : '';
      const ext = external ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${escapeAttr(h)}"${t}${ext}>${inner}</a>`;
    },
  },
});

function escapeAttr(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function slugify(s: string) {
  return s
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[âà]/g, 'a')
    .replace(/[îì]/g, 'i')
    .replace(/[ûù]/g, 'u')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function toDate(v: unknown): Date | undefined {
  if (!v) return undefined;
  const d = v instanceof Date ? v : new Date(String(v));
  return isNaN(d.getTime()) ? undefined : d;
}

function toBool(v: unknown) {
  return v === true || v === 'true' || v === 'yes' || v === 1;
}

function toSources(v: unknown): Source[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((s) => {
      if (typeof s === 'string') return { title: s };
      if (s && typeof s === 'object') {
        const o = s as Record<string, unknown>;
        const title = String(o.title ?? o.name ?? o.url ?? '').trim();
        const u = o.url ? String(o.url).trim() : undefined;
        return title ? { title, url: u || undefined } : null;
      }
      return null;
    })
    .filter((x): x is Source => !!x);
}

function toTags(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === 'string') return v.split(',').map((x) => x.trim()).filter(Boolean);
  return [];
}

export type LoadResult = { articles: Article[]; warnings: string[] };

export function loadArticles(): LoadResult {
  const warnings: string[] = [];
  if (!fs.existsSync(CONTENT_DIR)) return { articles: [], warnings };
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const out: Article[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const title = String(data.title ?? '').trim();
    if (!title) {
      warnings.push(`${file}: başlık yok, atlandı`);
      continue;
    }
    const lang: Lang = data.language === 'tr' ? 'tr' : 'en';
    const section = SECTIONS.some((s) => s.slug === data.section) ? String(data.section) : 'world';
    // Adres: elle girilmişse o; yoksa dosya adı (baştaki tarih atılır). Başlık sonradan
    // değişse de adres değişmesin diye başlıktan türetilmez.
    const fromFile = file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const slug = slugify(String(data.slug || '')) || slugify(fromFile) || slugify(title);
    const publishedAt = toDate(data.publishedAt) ?? fs.statSync(path.join(CONTENT_DIR, file)).mtime;
    const bodyText = content.trim();
    const words = bodyText.split(/\s+/).filter(Boolean).length;
    const status = (['draft', 'published', 'archived'] as const).includes(data.status)
      ? (data.status as Article['status'])
      : 'draft';

    out.push({
      file,
      slug,
      lang,
      title,
      spot: String(data.spot ?? '').trim(),
      section,
      cover: data.cover ? String(data.cover) : undefined,
      audio: data.audio ? String(data.audio) : undefined,
      imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
      imageCaption: data.imageCaption ? String(data.imageCaption) : undefined,
      author: data.author ? String(data.author) : undefined,
      location: data.location ? String(data.location) : undefined,
      readMinutes: Number(data.readMinutes) > 0 ? Number(data.readMinutes) : Math.max(1, Math.round(words / 220)),
      headline: toBool(data.headline),
      editorsPick: toBool(data.editorsPick),
      breaking: toBool(data.breaking),
      status,
      publishedAt,
      updatedAt: toDate(data.updatedAt),
      tags: toTags(data.tags),
      sources: toSources(data.sources),
      bodyHtml: md.parse(bodyText) as string,
      bodyText,
      path: `/${lang}/${slug}/`,
    });
  }

  // Aynı dilde aynı adres iki kez kullanılmasın
  const seen = new Map<string, string>();
  for (const a of out) {
    const prev = seen.get(a.path);
    if (prev) {
      warnings.push(`${a.file}: "${a.path}" adresi ${prev} ile çakışıyor, sonuna dosya adı eklendi`);
      a.slug = `${a.slug}-${slugify(a.file.replace(/\.md$/, ''))}`;
      a.path = `/${a.lang}/${a.slug}/`;
    }
    seen.set(a.path, a.file);
  }

  out.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return { articles: out, warnings };
}

/** Yayında sayılır mı? Taslaklar hiç çıkmaz; ileri tarihli haber saati gelince çıkar. */
export function isLive(a: Article, now: Date) {
  return a.status !== 'draft' && a.publishedAt.getTime() <= now.getTime();
}
