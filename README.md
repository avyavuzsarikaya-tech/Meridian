# Meridian

Bağımsız, küresel haber sitesi. Tasarım (gri zemin dahil) Kimi'nin Meridian tasarımından alındı.

## Nasıl çalışır

- Haberler `content/articles/` klasöründe, her biri ayrı bir metin dosyası olarak durur.
- Siteye her değişiklikte (ve her saat başı) GitHub kendiliğinden yeni hâlini yayınlar.
- Her sayfa hazır HTML olarak üretilir; JavaScript çalıştırmayan okuyucular ve yapay zekâlar da bütün metni görür.

## Haber eklemek

1. Sitenin adresinin sonuna `/admin/` ekle ve aç.
2. "Sign In with Token" ile GitHub anahtarınla gir (ilk seferde ekrandaki bağlantı anahtarı oluşturur).
3. "Haberler" → "Yeni Haber". Durumu "Yayında" yapıp kaydedince birkaç dakika içinde sitede görünür.

## Cümle kaynakları

Haber metninde ilgili cümlenin sonuna `[^1]` yaz. Kaynaklar alanındaki ilk satır bu numarayla eşleşir. İkinci kaynak için `[^2]` yaz; aynı kaynağa birden fazla cümlede atıf yapabilirsin. Sayfada numara üst simge olarak görünür ve tıklanınca yazının sonundaki kaynakça satırına iner. Kaynakça başlığına tıklayınca kaynak sitesine gider. Kaynakları haberin dilinde ayrı ayrı ekle.

## Adresler

- `/` İngilizce ön sayfa, `/tr/` Türkçe ön sayfa
- `/tr/<haber-adi>/` haber sayfası
- `/tr/section/<bolum>/` bölüm sayfası
- `/feed.xml`, `/tr/feed.xml` RSS; `/sitemap.xml`; `/llms.txt` yapay zekâlar için özet liste

## Yerelde derlemek

```
npm install
npm run build
```
