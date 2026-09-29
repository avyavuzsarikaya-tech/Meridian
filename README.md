# Meridian

Bağımsız, küresel haber sitesi. Tasarım (gri zemin dahil) Kimi'nin Meridian tasarımından alındı.

## Nasıl çalışır

- Haberler `content/articles/` klasöründe, her biri ayrı bir metin dosyası olarak durur.
- Siteye her değişiklikte (ve her saat başı) GitHub kendiliğinden yeni hâlini yayınlar.
- Her sayfa hazır HTML olarak üretilir; JavaScript çalıştırmayan okuyucular ve yapay zekâlar da bütün metni görür.
- Türkçe, İngilizce, Arapça, Fransızca ve İspanyolca yayınlar ayrı adreslerde açılır. Arapça sağdan sola okunur.
- Üstteki "Dil seçimi" kutusu aynı haberin başka dildeki sürümünü açar; çevirisi yoksa o dilin ön sayfasına gider.
- Haber sayfasındaki `A− / A / A+` düğmeleri metin boyutunu değiştirir; tercih aynı tarayıcıda hatırlanır.
- Ön sayfada tek manşet ve işaretlenen editör seçkisi görünür; diğer yazılar bölüm sayfalarında ve RSS'te bulunur. Boş bölümler menüde gösterilmez.
- Yazılarda GMT yayın zamanı yer alır. Önemli bir metin değişikliğinde güncellenme zamanı ve kısa açıklama girilir.
- Hakkında, ilkeler ve iletişim sayfaları her dilde bulunur. İletişim için şimdilik herkese açık GitHub kayıt bağlantısı kullanılır.

## Haber eklemek

1. Sitenin adresinin sonuna `/admin/` ekle ve aç.
2. "Sign In with Token" ile GitHub anahtarınla gir (ilk seferde ekrandaki bağlantı anahtarı oluşturur).
3. "Haberler" → "Yeni Haber". Durumu "Yayında" yapıp kaydedince birkaç dakika içinde sitede görünür.

## Cümle kaynakları

Haber metninde ilgili cümlenin sonuna `[^1]` yaz. Kaynaklar alanındaki ilk satır bu numarayla eşleşir. İkinci kaynak için `[^2]` yaz; aynı kaynağa birden fazla cümlede atıf yapabilirsin. Sayfada numara üst simge olarak görünür ve tıklanınca yazının sonundaki kaynakça satırına iner. Kaynakça başlığına tıklayınca kaynak sitesine gider. Kaynakları haberin dilinde ayrı ayrı ekle.

Örneği her dildeki ikinci deneme haberinde görebilirsin.

## Adresler

- `/` İngilizce ön sayfa; `/tr/`, `/ar/`, `/fr/`, `/es/` diğer dillerin ön sayfaları
- `/tr/<haber-adi>/` haber sayfası
- `/tr/section/<bolum>/` bölüm sayfası
- `/feed.xml`, `/tr/feed.xml` RSS; `/sitemap.xml`; `/llms.txt` yapay zekâlar için özet liste

Haberin adresi kendi dilinde olmalı. Yönetim panelindeki "Kalıcı bağlantı adı" alanına o dilde bir kısa ad gir. Bir haberin çevirilerini bağlamak için "Çeviri eşleştirme anahtarı" alanına hepsinde aynı değeri yaz. Adresi daha sonra değiştirirsen eski kısa adı "Eski adresler" listesine ekle; eski bağlantılar yeni adrese yönlenir.

## Yerelde derlemek

```
npm install
npm run build
```
