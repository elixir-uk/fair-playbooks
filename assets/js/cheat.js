/* ═══════════════════════════════════════════════════════════════════════
   Easter egg: the classic cheat code turns the site 8-bit for a moment.
   ───────────────────────────────────────────────────────────────────────
   Type  ↑ ↑ ↓ ↓ ← → ← → B A  anywhere (not while typing in a form field).
   For 15 seconds: every font becomes the pixel font, a faint scanline
   overlay appears, and the little researcher runs across the header.
   Nothing is stored.
   Reduced motion: no running, no scanlines; just the font switch.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var CODE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  var pos = 0, timer = null;

  function activate() {
    var html = document.documentElement;
    html.classList.add('eightbit');
    var scene = document.querySelector('body > header, header');
    var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (scene && !calm && !scene.querySelector('.cheat-runner')) {
      var r = document.createElement('span');
      r.className = 'cheat-runner pixel-icon'; r.setAttribute('data-pixel-icon', 'runner');
      scene.appendChild(r);
      if (window.PixelIcons) window.PixelIcons.hydrate(scene);
    }
    if (window.GameToast) window.GameToast.show('Cheat activated', '8-bit mode for 15 seconds');
    clearTimeout(timer);
    timer = setTimeout(function () {
      html.classList.remove('eightbit');
      var r = document.querySelector('.cheat-runner'); if (r) r.remove();
    }, 15000);
  }

  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
    var k = (e.key || '').toLowerCase();
    if (k === CODE[pos]) { pos += 1; if (pos === CODE.length) { pos = 0; activate(); } }
    else pos = (k === CODE[0]) ? 1 : 0;
  });

  window.FairCheat = { activate: activate };   // for testing: FairCheat.activate()
})();
