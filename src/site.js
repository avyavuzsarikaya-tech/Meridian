// Sayfadaki küçük hareketler. JavaScript kapalıysa site yine eksiksiz okunur.
(function () {
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

  // Bir ses dosyası sonradan silinirse bozuk oynatıcıyı kaldır.
  document.querySelectorAll('audio[data-article-audio]').forEach(function (player) {
    player.addEventListener('error', function () { player.closest('[data-audio-section]')?.remove(); }, true);
  });

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
