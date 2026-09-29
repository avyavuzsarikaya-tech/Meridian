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

  // HTML'deki yerel oynatıcı JS kapalıyken görünür; JS açıkken özel kontroller çalışır.
  document.querySelectorAll('[data-audio-section]').forEach(function (section) {
    var player = section.querySelector('[data-article-audio]');
    var controls = section.querySelector('[data-audio-controls]');
    if (!player || !controls) return;
    var playButton = controls.querySelector('[data-audio-play]');
    var playIcon = playButton.querySelector('[aria-hidden]');
    var seek = controls.querySelector('[data-audio-seek]');
    var time = controls.querySelector('[data-audio-time]');
    var rateButtons = controls.querySelectorAll('[data-rate]');
    player.removeAttribute('controls');

    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) return '--:--';
      var total = Math.floor(seconds);
      return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');
    }
    function updateTime() {
      var duration = player.duration;
      var known = Number.isFinite(duration) && duration > 0;
      var position = known ? Math.min(player.currentTime, duration) : 0;
      seek.value = known ? String(Math.round(position / duration * 1000)) : '0';
      seek.style.setProperty('--progress', (Number(seek.value) / 10) + '%');
      time.textContent = formatTime(player.currentTime) + ' / ' + (known ? formatTime(duration) : '--:--');
    }
    function updatePlay() {
      var playing = !player.paused && !player.ended;
      playIcon.textContent = playing ? '‖' : '▶';
      playButton.setAttribute('aria-label', playButton.getAttribute(playing ? 'data-label-pause' : 'data-label-play'));
    }
    playButton.addEventListener('click', function () {
      if (player.paused || player.ended) {
        var request = player.play();
        if (request && request.catch) request.catch(updatePlay);
      } else {
        player.pause();
      }
    });
    seek.addEventListener('input', function () {
      if (Number.isFinite(player.duration) && player.duration > 0) {
        player.currentTime = player.duration * Number(seek.value) / 1000;
        updateTime();
      }
    });
    rateButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        player.playbackRate = Number(button.getAttribute('data-rate'));
        rateButtons.forEach(function (choice) {
          choice.setAttribute('aria-pressed', choice === button ? 'true' : 'false');
        });
      });
    });
    player.addEventListener('loadedmetadata', updateTime);
    player.addEventListener('durationchange', updateTime);
    player.addEventListener('timeupdate', updateTime);
    player.addEventListener('play', updatePlay);
    player.addEventListener('pause', updatePlay);
    player.addEventListener('ended', function () { updatePlay(); updateTime(); });
    updateTime();
    updatePlay();
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
