// Sayfadaki küçük hareketler. JavaScript kapalıysa site yine eksiksiz okunur.
(function () {
  // GMT saat
  var clock = document.querySelector('[data-clock]');
  var dateEl = document.querySelector('[data-date]');
  function tick() {
    var d = new Date();
    if (clock) clock.textContent = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' }) + ' GMT';
    if (dateEl) {
      var locales = { en: 'en-GB', tr: 'tr-TR', ar: 'ar', fr: 'fr-FR', es: 'es-ES' };
      var lang = locales[dateEl.getAttribute('data-date')] || 'en-GB';
      dateEl.textContent = d.toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    }
  }
  tick();
  setInterval(tick, 1000);

  // Okuma boyutu tüm haber sayfalarında hatırlanır.
  var sizeButtons = document.querySelectorAll('[data-size-choice]');
  var sizes = { small: true, normal: true, large: true };
  function setReadingSize(size) {
    if (!sizes[size]) size = 'normal';
    document.documentElement.setAttribute('data-article-size', size);
    sizeButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-size-choice') === size ? 'true' : 'false');
    });
  }
  var savedSize = 'normal';
  try { savedSize = localStorage.getItem('meridian-reading-size') || 'normal'; } catch (e) { /* depolama kapalı olabilir */ }
  setReadingSize(savedSize);
  sizeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var size = button.getAttribute('data-size-choice');
      setReadingSize(size);
      try { localStorage.setItem('meridian-reading-size', size); } catch (e) { /* tercihi bu sayfada uygula */ }
    });
  });

  // Son dakika bandı
  var items = document.querySelectorAll('[data-ticker] .ticker-item');
  if (items.length > 1) {
    var i = 0;
    setInterval(function () {
      var cur = items[i];
      i = (i + 1) % items.length;
      var next = items[i];
      cur.removeAttribute('data-active');
      cur.setAttribute('data-leaving', 'true');
      next.removeAttribute('data-leaving');
      next.setAttribute('data-active', 'true');
      setTimeout(function () { cur.removeAttribute('data-leaving'); }, 900);
    }, 4200);
  }

  // Menü: aşağı kaydırınca gizle, yukarı kaydırınca göster
  var nav = document.querySelector('.site-nav');
  var lastY = 0;
  if (nav) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      nav.classList.toggle('nav-hidden', y > 160 && y > lastY);
      lastY = y;
    }, { passive: true });
  }

  // Kaydırınca beliren bloklar
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (t) { t.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(function (t) { io.observe(t); });
})();
