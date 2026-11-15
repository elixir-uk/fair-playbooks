/* ═══════════════════════════════════════════════════════════════════════
   Promo kit (/promo/): game-poster generator.
   ───────────────────────────────────────────────────────────────────────
   Draws one SVG per format with the fonts (assets/fonts) and logos embedded
   as data URIs, so the on-screen preview, the PNG download and the printed
   A4 flyer are identical. Colours and logo come from the institution
   profile (live CSS tokens). Characters come from PixelPeople.cast.

   Formats (px): slide 1920×1080 · square 1080×1080 · a4 1240×1754 (150 dpi)
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var BASE = window.__BASE__ || '/';
  var DATA = JSON.parse(document.getElementById('promo-data').textContent);
  var FORMATS = { slide: [1920, 1080], square: [1080, 1080], a4: [1240, 1754] };
  var form = document.getElementById('promo-form');
  var preview = document.getElementById('promo-preview');
  var status = document.getElementById('promo-status');
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // ─── Session picker ────────────────────────────────────────────────────
  var all = {};
  var select = document.getElementById('promo-session');
  [['Modules', DATA.modules], ['Journeys', DATA.journeys], ['Games', DATA.games]].forEach(function (g) {
    var og = document.createElement('optgroup'); og.label = g[0];
    g[1].forEach(function (it) {
      all[it.id] = it;
      var o = document.createElement('option'); o.value = it.id; o.textContent = it.kind + ' · ' + it.title; og.appendChild(o);
    });
    select.appendChild(og);
  });
  var q = new URLSearchParams(location.search);
  var want = q.get('module') || q.get('journey') || q.get('game');
  if (want && all[want]) select.value = want;

  // ─── Character picker (the shared cast) ────────────────────────────────
  var CAST = window.PixelPeople ? window.PixelPeople.cast : {};
  var castBox = document.getElementById('promo-cast');
  Object.keys(CAST).forEach(function (k) {
    var l = document.createElement('label');
    l.className = 'promo-person';
    l.innerHTML = '<input type="checkbox" name="cast" value="' + k + '" /><span class="choice-person" data-person="' + k + '"></span><span>' + esc(CAST[k].label) + '</span>';
    castBox.appendChild(l);
  });
  if (window.PixelPeople) window.PixelPeople.hydrate(castBox);
  castBox.addEventListener('change', function (e) {
    var on = castBox.querySelectorAll('input:checked');
    if (on.length > 3) e.target.checked = false;
    draw();
  });

  function fillFromSession() {
    var it = all[select.value]; if (!it) return;
    form.title.value = it.title;
    form.tagline.value = (it.tagline || '').replace(/\s+/g, ' ').slice(0, 160);
    var want = (it.audience || []).filter(function (a) { return CAST[a]; }).slice(0, 3);
    if (!want.length) want = ['researcher', 'rdm-peer', 'phd-student'];
    castBox.querySelectorAll('input').forEach(function (i) { i.checked = want.indexOf(i.value) >= 0; });
  }

  // ─── Assets: fonts and logos as data URIs (fetched once) ──────────────
  var assets = null;
  function toDataURL(url, type) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(url); return r.blob(); }).then(function (b) {
      return new Promise(function (ok) { var fr = new FileReader(); fr.onload = function () { ok(type ? fr.result.replace(/^data:[^;]*/, 'data:' + type) : fr.result); }; fr.readAsDataURL(b); });
    });
  }
  function loadAssets() {
    if (assets) return Promise.resolve(assets);
    var f = BASE + 'assets/fonts/';
    return Promise.all([
      toDataURL(f + 'lato-400.woff2', 'font/woff2'), toDataURL(f + 'lato-900.woff2', 'font/woff2'),
      toDataURL(f + 'press-start-2p.woff2', 'font/woff2'), toDataURL(BASE + 'assets/branding/elixir-uk-logo-negative.svg', 'image/svg+xml')
    ]).then(function (r) { assets = { lato: r[0], lato9: r[1], pixel: r[2], elixir: r[3] }; return assets; });
  }

  function tokens() {
    var cs = getComputedStyle(document.documentElement);
    var v = function (n, d) { var x = cs.getPropertyValue(n).trim(); return /^#[0-9a-f]{3,8}$/i.test(x) ? x : d; };
    return { ink: v('--ink', '#023452'), accent: v('--accent', '#f47d20'), onAccent: v('--on-accent', '#023452'), link: v('--link', '#026a91'), light: v('--light', '#9bcbdd'), accentOnDark: v('--accent-on-dark', '#f47d20'), pop: v('--pop', '#4dd9ef') };
  }

  // ─── Text helpers (Press Start 2P is monospaced: 1em per character) ───
  function wrap(text, maxChars, maxLines) {
    var words = String(text || '').split(/\s+/).filter(Boolean), lines = [], cur = '';
    words.forEach(function (w) {
      if ((cur + ' ' + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
    });
    if (cur) lines.push(cur);
    if (maxLines && lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'; }
    return lines;
  }
  function textBlock(lines, x, y, size, lh, attrs) {
    return lines.map(function (l, i) { return '<text x="' + x + '" y="' + (y + i * size * lh) + '" font-size="' + size + '" ' + attrs + '>' + esc(l) + '</text>'; }).join('');
  }
  function fit(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  function nest(svg, x, y, w, h) { return svg.replace('<svg ', '<svg x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" '); }
  function icon(name, x, y, size) { return window.PixelIcons ? nest(window.PixelIcons.svg(name), x, y, size, size) : ''; }

  // ─── The poster ────────────────────────────────────────────────────────
  function poster(fmt, d, A, T) {
    var W = FORMATS[fmt][0], H = FORMATS[fmt][1];
    var base = Math.min(W, H), m = Math.round(base * 0.075), g = Math.round(H * 0.055);
    var o = [];
    o.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" shape-rendering="crispEdges" ' +
      'style="--ink:' + T.light + ';--accent:' + T.accent + ';--link:' + T.link + ';--light:' + T.light + '">');
    o.push('<defs><style>' +
      '@font-face{font-family:PLato;font-weight:400;src:url(' + A.lato + ') format("woff2")}' +
      '@font-face{font-family:PLato;font-weight:900;src:url(' + A.lato9 + ') format("woff2")}' +
      '@font-face{font-family:PPixel;src:url(' + A.pixel + ') format("woff2")}' +
      '.px{font-family:PPixel,monospace}.lt{font-family:PLato,sans-serif}' +
      '</style></defs>');
    // sky and stars
    o.push('<rect width="' + W + '" height="' + H + '" fill="' + T.ink + '"/>');
    var px = Math.max(4, Math.round(base / 180)), seed = 7;
    var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (var i = 0; i < 46; i++) o.push('<rect x="' + Math.round(rnd() * W) + '" y="' + Math.round(rnd() * (H - g * 3)) + '" width="' + px + '" height="' + px + '" fill="' + T.light + '" opacity="' + (0.3 + rnd() * 0.6).toFixed(2) + '"/>');
    // ground with a gap bridged by missing blocks, floppies, and the FAIR flag
    var gy = H - g, gapA = Math.round(W * 0.58), gapB = Math.round(W * 0.76);
    [[0, gapA], [gapB, W]].forEach(function (seg) {
      o.push('<rect x="' + seg[0] + '" y="' + gy + '" width="' + (seg[1] - seg[0]) + '" height="' + g + '" fill="' + T.link + '"/>');
      o.push('<rect x="' + seg[0] + '" y="' + gy + '" width="' + (seg[1] - seg[0]) + '" height="' + Math.round(g * 0.18) + '" fill="' + T.light + '"/>');
    });
    var b = Math.round(g * 0.9);
    var gb = Math.min(b, Math.floor((gapB - gapA) / 4));            // blocks never overlap in narrow gaps
    for (var k = 0; k < 3; k++) o.push(icon('ghost', gapA + Math.round((gapB - gapA) / 3 * k + ((gapB - gapA) / 3 - gb) / 2), gy - gb - Math.round(g * 0.4), gb));
    o.push(icon('floppy', Math.round(W * 0.06), gy - b, b), icon('floppy', Math.round(W * 0.06) + b + 8, gy - b, b));
    o.push(icon('flag', W - m - Math.round(b * 1.6), gy - Math.round(b * 1.6), Math.round(b * 1.6)));

    // logos (top left) and credit (top right)
    var lh = Math.round(base * 0.065);
    o.push('<image href="' + A.elixir + '" x="' + m + '" y="' + m + '" height="' + lh + '" width="' + Math.round(lh * 1.6) + '" preserveAspectRatio="xMinYMid meet"/>');
    if (d.logo) {
      var lx = m + Math.round(lh * 1.6) + Math.round(m * 0.4);
      o.push('<rect x="' + lx + '" y="' + m + '" width="' + Math.round(lh * 2.4) + '" height="' + lh + '" fill="#fff"/>');
      o.push('<image href="' + esc(d.logo) + '" x="' + (lx + 8) + '" y="' + (m + 8) + '" width="' + (Math.round(lh * 2.4) - 16) + '" height="' + (lh - 16) + '" preserveAspectRatio="xMidYMid meet"/>');
    }
    var cr = Math.round(base * 0.016);
    o.push('<text class="lt" x="' + (W - m) + '" y="' + (m + Math.round(lh * 0.45)) + '" font-size="' + cr + '" text-anchor="end" fill="' + T.light + '">ELIXIR-UK RDM Club · FAIR-in-action Playbook</text>');
    o.push('<text class="lt" x="' + (W - m) + '" y="' + (m + Math.round(lh * 0.45) + Math.round(cr * 1.5)) + '" font-size="' + cr + '" text-anchor="end" fill="' + T.light + '" opacity=".75">commissioned by BioFAIR</text>');

    // Content is laid out top-down into columns; each column then scales
    // down (never up) so it always ends above the ground and its icons.
    var two = fmt === 'slide';
    var floor = gy - Math.round(b * 1.9);
    var L = [], R = [];
    var colW = two ? Math.round(W * 0.52) : W - m * 2;
    var top = m + lh + Math.round(base * 0.08);
    var y = top;
    var ps = Math.round(base * 0.022);
    var titleSize = Math.round(base * (fmt === 'a4' ? 0.085 : fmt === 'square' ? 0.07 : 0.085));
    y += Math.round(titleSize * 0.95);   // the title leads: no internal module label on posters
    var tl = wrap(d.title, Math.floor(colW / (titleSize * 0.56)), 3);
    L.push(textBlock(tl, m, y, titleSize, 1.05, 'class="lt" font-weight="900" fill="#fff"'));
    y += Math.round(titleSize * 1.05 * (tl.length - 1) + titleSize * 0.85);
    var tagSize = Math.round(base * 0.03);
    var tg = wrap(d.tagline, Math.floor(colW / (tagSize * 0.5)), fmt === 'square' ? 2 : 3);
    L.push(textBlock(tg, m, y, tagSize, 1.35, 'class="lt" fill="' + T.light + '"'));
    y += Math.round(tagSize * 1.35 * (tg.length - 1) + tagSize * 0.4 + base * 0.05);
    var leftEnd = y;

    // right column on slides, same column otherwise
    var C = two ? R : L;
    var cx = two ? Math.round(W * 0.6) : m;
    var cw = two ? W - cx - m : colW;
    var cy = two ? top : y;
    var cast = d.cast.slice(0, 3);
    var gap = 0.18;
    var cs = Math.min(Math.round(base * (fmt === 'a4' ? 0.19 : fmt === 'square' ? 0.15 : 0.19)), Math.floor(cw / (3 + 2 * gap)));
    if (cast.length) {
      var lab = Math.round(ps * 0.8);
      C.push('<text class="px" x="' + cx + '" y="' + (cy + lab) + '" font-size="' + lab + '" fill="' + T.light + '">PLAYER SELECT</text>');
      cy += lab + Math.round(lab * 0.9);
      var brand = Object.assign({}, window.PixelPeople.palette.brand, { orange: T.accent, navy: T.ink });
      cast.forEach(function (key, i) {
        var c = window.PixelPeople.cast[key]; if (!c) return;
        var x = cx + i * Math.round(cs * (1 + gap));
        C.push('<rect x="' + (x + 8) + '" y="' + (cy + 8) + '" width="' + cs + '" height="' + cs + '" fill="' + T.accent + '"/>');
        C.push(nest(window.PixelPeople.svg(c, { brand: brand }), x, cy, cs, cs));
        C.push('<rect x="' + x + '" y="' + cy + '" width="' + cs + '" height="' + cs + '" fill="none" stroke="#fff" stroke-width="4"/>');
        var nl = Math.round(ps * 0.62);
        C.push('<text class="px" x="' + x + '" y="' + (cy + cs + Math.round(nl * 2.2)) + '" font-size="' + nl + '" fill="#fff">' + esc(fit((c.short || c.label).toUpperCase(), Math.floor(cs / nl))) + '</text>');
      });
      cy += cs + Math.round(ps * 2.6);
    }

    // HUD: date / time / place
    var hs = Math.round(ps * 0.95), rowH = Math.round(hs * 2.2);
    var rows = [['DATE', d.date || 'TBC'], ['TIME', d.time || 'TBC'], ['PLACE', d.place || 'TBC']];
    var hh = rowH * rows.length + Math.round(hs * 1.1);
    C.push('<rect x="' + (cx + 10) + '" y="' + (cy + 10) + '" width="' + cw + '" height="' + hh + '" fill="' + T.accent + '"/>');
    C.push('<rect x="' + cx + '" y="' + cy + '" width="' + cw + '" height="' + hh + '" fill="' + T.ink + '" stroke="#fff" stroke-width="5"/>');
    rows.forEach(function (r, i) {
      var ry = cy + Math.round(hs * 1.85) + i * rowH;
      C.push('<text class="px" x="' + (cx + hs) + '" y="' + ry + '" font-size="' + hs + '" fill="' + T.light + '">' + r[0] + '</text>');
      C.push('<text class="px" x="' + (cx + hs * 7.5) + '" y="' + ry + '" font-size="' + hs + '" fill="#fff">' + esc(fit(r[1].toUpperCase(), Math.floor((cw - hs * 8.5) / hs))) + '</text>');
    });
    cy += hh + Math.round(ps * 2);

    // CTA: the start button and sign-up link, with the QR code beside them
    var bs = Math.round(ps * 1.05), bh = Math.round(bs * 3);
    var q = d.qr ? Math.round(bh * 2.6) : 0, qg = d.qr ? Math.round(bs * 1.2) : 0;
    if (d.qr) {
      C.push('<rect x="' + (cx + 8) + '" y="' + (cy + 8) + '" width="' + q + '" height="' + q + '" fill="' + T.accent + '"/>');
      C.push('<rect x="' + cx + '" y="' + cy + '" width="' + q + '" height="' + q + '" fill="#fff"/>');
      var pad = Math.round(q * 0.06);
      C.push('<image href="' + esc(d.qr) + '" x="' + (cx + pad) + '" y="' + (cy + pad) + '" width="' + (q - pad * 2) + '" height="' + (q - pad * 2) + '" preserveAspectRatio="xMidYMid meet"/>');
      C.push('<text class="px" x="' + (cx + q / 2) + '" y="' + (cy + q + Math.round(bs * 1.5)) + '" font-size="' + Math.round(bs * 0.55) + '" text-anchor="middle" fill="' + T.light + '">SCAN TO JOIN</text>');
    }
    var bx = cx + q + qg, bw = Math.min(cw - q - qg, Math.round(bs * 18));
    var by = d.qr ? cy + Math.round((q - bh) / 2) - (d.book ? Math.round(bs * 1.1) : 0) : cy;
    C.push('<rect x="' + (bx + 8) + '" y="' + (by + 8) + '" width="' + bw + '" height="' + bh + '" fill="#000" opacity=".35"/>');
    C.push('<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" fill="' + T.accent + '"/>');
    var bl = Math.min(bs, Math.floor(bw / 17));
    C.push('<text class="px" x="' + (bx + bw / 2) + '" y="' + (by + bh / 2 + bl / 2) + '" font-size="' + bl + '" text-anchor="middle" fill="' + T.onAccent + '">BOOK YOUR PLACE</text>');
    var after = by + bh;
    if (d.book) {
      var ls = Math.round(bs * 0.8);
      C.push('<text class="px" x="' + bx + '" y="' + (after + Math.round(ls * 2)) + '" font-size="' + ls + '" fill="#fff">' + esc(fit(d.book, Math.floor((cw - q - qg) / ls))) + '</text>');
      after += Math.round(ls * 2.2);
    }
    cy = Math.max(after, d.qr ? cy + q + Math.round(bs * 1.8) : 0);

    function place(parts, x0, y0, y1) {
      var k = y1 > floor ? (floor - y0) / (y1 - y0) : 1;
      return k < 1 ? '<g transform="translate(' + x0 + ' ' + y0 + ') scale(' + k.toFixed(4) + ') translate(' + (-x0) + ' ' + (-y0) + ')">' + parts.join('') + '</g>' : parts.join('');
    }
    if (two) { o.push(place(L, m, top, leftEnd)); o.push(place(R, cx, top, cy)); }
    else o.push(place(L, m, top, cy));
    o.push('</svg>');
    return o.join('');
  }

  // ─── Uploaded QR code (kept only in this page; never stored or sent) ──
  var qrData = null;
  var qrInput = document.getElementById('promo-qr'), qrClear = document.getElementById('promo-qr-clear');
  qrInput.addEventListener('change', function () {
    var f = qrInput.files && qrInput.files[0];
    if (!f) return;
    var fr = new FileReader();
    fr.onload = function () { qrData = fr.result; qrClear.hidden = false; draw(); };
    fr.readAsDataURL(f);
  });
  qrClear.addEventListener('click', function () { qrData = null; qrInput.value = ''; qrClear.hidden = true; draw(); });

  // ─── Draw, download, print, copy ───────────────────────────────────────
  var current = '', fmtNow = 'slide';
  function values() {
    var it = all[select.value] || {};
    var prof = window.FairProfile && window.FairProfile.get();
    return {
      kind: it.kind || '', title: form.title.value.trim() || it.title, tagline: form.tagline.value.trim(),
      date: form.date.value.trim(), time: form.time.value.trim(), place: form.place.value.trim(), book: form.book.value.trim(),
      cast: Array.prototype.map.call(castBox.querySelectorAll('input:checked'), function (i) { return i.value; }),
      logo: prof && prof.brand && prof.brand.logo,
      qr: qrData
    };
  }
  function draw() {
    fmtNow = (document.querySelector('input[name="format"]:checked') || {}).value || 'slide';
    loadAssets().then(function (A) {
      current = poster(fmtNow, values(), A, tokens());
      preview.innerHTML = current;
      preview.setAttribute('data-format', fmtNow);
      status.textContent = '';
    }).catch(function () { status.textContent = 'Could not load the poster fonts. Check your connection and reload.'; });
  }

  function downloadPNG() {
    if (!current) return;
    var W = FORMATS[fmtNow][0], H = FORMATS[fmtNow][1];
    var url = URL.createObjectURL(new Blob([current], { type: 'image/svg+xml' }));
    var img = new Image();
    img.onload = function () {
      // a short pause lets the embedded fonts finish decoding in every browser
      setTimeout(function () {
        var c = document.createElement('canvas'); c.width = W; c.height = H;
        c.getContext('2d').drawImage(img, 0, 0, W, H);
        URL.revokeObjectURL(url);
        c.toBlob(function (blob) {
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'fair-in-action-' + (select.value || 'session') + '-' + fmtNow + '.png';
          document.body.appendChild(a); a.click(); a.remove();
          status.textContent = 'Downloaded ' + a.download;
        }, 'image/png');
      }, 150);
    };
    img.onerror = function () { status.textContent = 'Sorry, this browser could not draw the PNG. Try Print A4, or another browser.'; };
    img.src = url;
  }

  function announcement() {
    var d = values();
    var when = [d.date, d.time].filter(Boolean).join(', ');
    return [d.title, d.tagline, [when, d.place].filter(Boolean).join(' · '), d.book ? 'Sign up: ' + d.book : '', 'Part of the FAIR-in-action Playbook from the ELIXIR-UK RDM Club.'].filter(Boolean).join('\n');
  }

  select.addEventListener('change', function () { fillFromSession(); draw(); });
  form.addEventListener('input', draw);
  document.querySelectorAll('input[name="format"]').forEach(function (r) { r.addEventListener('change', draw); });
  document.getElementById('promo-png').addEventListener('click', downloadPNG);
  // SVG: the same poster as an editable drawing (Figma, Illustrator, Inkscape, Canva).
  // Text stays as text; install Lato and Press Start 2P for it to look identical.
  document.getElementById('promo-svg').addEventListener('click', function () {
    if (!current) return;
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([current], { type: 'image/svg+xml' }));
    a.download = 'fair-in-action-' + (select.value || 'session') + '-' + fmtNow + '.svg';
    document.body.appendChild(a); a.click(); a.remove();
    status.textContent = 'Downloaded ' + a.download + '. Open it in Figma, Illustrator, Inkscape or Canva to edit.';
  });
  document.getElementById('promo-print').addEventListener('click', function () {
    var r = document.querySelector('input[name="format"][value="a4"]');
    if (!r.checked) { r.checked = true; draw(); setTimeout(function () { window.print(); }, 400); } else window.print();
  });
  document.getElementById('promo-copy').addEventListener('click', function () {
    var t = announcement();
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { status.textContent = 'Announcement text copied.'; }, function () { status.textContent = t; });
  });
  document.addEventListener('fair:profile-change', draw);

  fillFromSession();
  draw();
})();
