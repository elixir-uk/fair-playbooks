/* ═══════════════════════════════════════════════════════════════════════
   Game toast: a small pixel-style notification ("Cheat activated", …).
   ───────────────────────────────────────────────────────────────────────
   window.GameToast.show(title, text). Announced politely to screen readers,
   gone after about four seconds. Nothing is stored.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var region;
  function show(title, text) {
    if (!region) {
      region = document.createElement('div');
      region.className = 'game-toasts'; region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    var t = document.createElement('div');
    t.className = 'game-toast';
    t.innerHTML = '<span class="pixel-icon" data-pixel-icon="star"></span><span><strong></strong><span class="game-toast-text"></span></span>';
    t.querySelector('strong').textContent = title;
    t.querySelector('.game-toast-text').textContent = text || '';
    region.appendChild(t);
    if (window.PixelIcons) window.PixelIcons.hydrate(t);
    setTimeout(function () { t.classList.add('is-leaving'); }, 3800);
    setTimeout(function () { t.remove(); }, 4300);
  }
  window.GameToast = { show: show };
})();
