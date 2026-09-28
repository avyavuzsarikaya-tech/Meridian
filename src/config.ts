// Sitenin nerede yayınlandığı derleme sırasında ortam değişkenlerinden gelir.
// GitHub Actions bunları otomatik doldurur; yerelde boş bırakılabilir.

function withSlash(p: string) {
  if (!p.startsWith('/')) p = '/' + p;
  return p.endsWith('/') ? p : p + '/';
}

/** Sitenin kök yolu: GitHub Pages proje sitesinde "/meridian/", kendi alan adında "/". */
export const BASE = withSlash(process.env.BASE_PATH ?? '/');

/** Mutlak adres (ör. https://kullanici.github.io/meridian). Sitemap, RSS ve paylaşım etiketleri için. */
export const SITE_URL = (process.env.SITE_URL ?? '').replace(/\/+$/, '');

/** GitHub deposu "sahip/ad" — yönetim paneli buna bağlanır. */
export const REPO = process.env.GITHUB_REPOSITORY ?? 'KULLANICI/meridian';

export const SITE_NAME = 'Meridian';

/** Site içi yol → yayın yolu. "/tr/" → "/meridian/tr/" */
export function url(p = '/'): string {
  if (/^[a-z]+:\/\//i.test(p) || p.startsWith('mailto:') || p.startsWith('#')) return p;
  return BASE + p.replace(/^\/+/, '');
}

/** Site içi yol → tam adres (SITE_URL yoksa site içi yol). */
export function absUrl(p = '/'): string {
  const rel = url(p);
  if (/^[a-z]+:\/\//i.test(rel)) return rel;
  if (!SITE_URL) return rel;
  const origin = new URL(SITE_URL).origin;
  return origin + rel;
}
