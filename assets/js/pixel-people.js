/* ═══════════════════════════════════════════════════════════════════════
   Pixel people: our own pixel-art portraits, built from parts.
   ───────────────────────────────────────────────────────────────────────
   Original artwork for the FAIR-in-action Playbook, CC BY 4.0 like the
   rest of the kit. Works in the browser (window.PixelPeople) and in Node
   (module.exports), so the site, the promo kit and build scripts share it.

   HOW IT WORKS
   - Every portrait is a 32×32 pixel grid.
   - A part is a list of filled runs: run(y, x0, x1, material). Most parts
     are symmetric, so runs are mirrored around the centre (x ↔ 31 − x);
     pass mirror=false for one-sided details.
   - Parts are stacked in LAYER_ORDER. A part with outline:true gets an ink
     line on its own edge pixels automatically, so new shapes never need
     hand-drawn outlines.
   - Materials (one letter) map to colours at render time, so the same
     parts work for every skin tone, hair colour and institution palette.

   To add a hairstyle: copy one in HAIR, change the runs, add its name to
   HAIR_STYLES. To change colours: edit PALETTE. That's it.

   API
     PixelPeople.svg(config)      → SVG string
     PixelPeople.random(seed)     → a config (deterministic for a seed)
     PixelPeople.options          → the choices for each config field
   ═══════════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  var N = 32;

  // ─── Colours ───────────────────────────────────────────────────────────
  var PALETTE = {
    ink: '#0b1f2e',
    white: '#ffffff',
    lens: '#dff3f8',
    // Six skin tones, light to deep; shade and blush are derived.
    skin: ['#f7d7bd', '#eab894', '#cf9466', '#ad7048', '#8a5636', '#6a4027'],  // deepest kept readable against the ink outline
    hair: { black: '#1d1f26', darkbrown: '#4a2c1c', brown: '#7d4f2c', ginger: '#c8662a', blonde: '#e3b45a', grey: '#a9adb3' },
    // Tops, wraps and backgrounds come from the ELIXIR-UK palette (+ template cyan and cream).
    brand: { navy: '#023452', orange: '#f47d20', blue: '#037eab', light: '#9bcbdd', cyan: '#4dd9ef', cream: '#fff4e2', slate: '#5a6b78' }
  };

  function mix(a, b, t) {
    var p = function (h) { return [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16); }); };
    var A = p(a), B = p(b);
    return '#' + A.map(function (v, i) { return ('0' + Math.round(v + (B[i] - v) * t).toString(16)).slice(-2); }).join('');
  }

  // ─── Part builder ──────────────────────────────────────────────────────
  // Returns { cells: {index: material}, outline: bool }
  function part(outline, draw) {
    var cells = {};
    function run(y, x0, x1, m, mirror) {
      m = m || 'm';
      for (var x = x0; x <= x1; x++) {
        cells[y * N + x] = m;
        if (mirror !== false) cells[y * N + (N - 1 - x)] = m;
      }
    }
    function block(y0, y1, x0, x1, m, mirror) { for (var y = y0; y <= y1; y++) run(y, x0, x1, m, mirror); }
    function cut(y, x0, x1, mirror) {
      for (var x = x0; x <= x1; x++) { delete cells[y * N + x]; if (mirror !== false) delete cells[y * N + (N - 1 - x)]; }
    }
    draw(run, block, cut);
    return { cells: cells, outline: outline };
  }

  // ─── Base body ─────────────────────────────────────────────────────────
  var HEAD = part(true, function (run, block) {
    run(7, 11, 15, 's'); block(8, 17, 10, 15, 's'); run(18, 11, 15, 's'); run(19, 12, 15, 's'); run(20, 13, 15, 's');
    block(12, 15, 8, 9, 's');                                   // ears
  });
  var NECK = part(true, function (run, block) {
    block(19, 24, 13, 15, 's'); run(21, 14, 15, 'S');           // shadow under the chin
  });
  var BODY = part(true, function (run, block) {
    run(24, 8, 15, 't'); run(25, 6, 15, 't'); run(26, 4, 15, 't'); block(27, 31, 3, 15, 't');
    block(28, 31, 8, 8, 'k');                                   // arm creases
  });

  // ─── Tops (drawn over BODY) ────────────────────────────────────────────
  var TOPS = {
    tee: [part(false, function (run) { run(25, 12, 15, 'T'); })],
    shirt: [part(true, function (run, block) {
      run(23, 11, 12, 'w'); run(24, 11, 13, 'w'); run(25, 12, 14, 'w'); run(26, 13, 14, 'w');
      block(27, 31, 15, 15, 'w');                               // placket
    }), part(false, function (run) { run(28, 15, 15, 'k', false); run(30, 15, 15, 'k', false); })],
    hoodie: [part(true, function (run, block) { block(22, 25, 10, 15, 'T'); }),
             part(false, function (run, block) { block(26, 29, 13, 13, 'w'); })],
    labcoat: [part(true, function (run, block) {             // white coat, same silhouette as BODY
      run(24, 8, 15, 'w'); run(25, 6, 15, 'w'); run(26, 4, 15, 'w'); block(27, 31, 3, 15, 'w');
    }), part(false, function (run, block) {
      run(24, 14, 15, 't'); run(25, 14, 15, 't'); run(26, 15, 15, 't'); run(27, 15, 15, 't');   // shirt V
      run(24, 13, 13, 'k'); run(25, 13, 13, 'k'); run(26, 14, 14, 'k'); run(27, 14, 14, 'k'); run(28, 15, 15, 'k');  // lapels
      block(28, 31, 8, 8, 'k');                                 // arm creases
    })],
    jacket: [part(true, function (run, block) {
      run(24, 8, 12, 't'); run(25, 6, 12, 't'); run(26, 4, 13, 't'); block(27, 31, 3, 13, 't');
    }), part(false, function (run, block) { block(25, 31, 14, 15, 'w'); })]
  };

  // ─── Hair ──────────────────────────────────────────────────────────────
  // Each style can have: back (behind body), mid (over shoulders, behind
  // head) and front (over the head). Material h = hair, H = hair shade.
  var HAIR = {
    bald: {},
    crop: {
      front: part(true, function (run) {
        run(5, 12, 15, 'h'); run(6, 10, 15, 'h'); run(7, 9, 15, 'h'); run(8, 9, 15, 'h');
        run(9, 9, 11, 'h'); run(10, 9, 10, 'h');
      })
    },
    sidepart: {
      front: part(true, function (run) {
        run(5, 11, 20, 'h', false); run(6, 9, 22, 'h', false); run(7, 9, 22, 'h', false);
        run(8, 9, 15, 'h', false); run(8, 20, 22, 'h', false); run(9, 9, 13, 'h', false); run(9, 21, 22, 'h', false);
        run(10, 9, 11, 'h', false); run(10, 22, 22, 'h', false);
      })
    },
    long: {
      mid: part(true, function (run, block) { run(6, 9, 15, 'h'); block(7, 27, 7, 15, 'h'); }),
      front: part(true, function (run) {
        run(5, 12, 15, 'h'); run(6, 10, 15, 'h'); run(7, 9, 14, 'h'); run(8, 9, 12, 'h'); run(9, 9, 10, 'h');
        run(7, 16, 16, 'H', false);                               // parting
      })
    },
    bob: {
      mid: part(true, function (run, block) { run(6, 9, 15, 'h'); block(7, 20, 8, 15, 'h'); }),
      front: part(true, function (run) { run(5, 12, 15, 'h'); run(6, 10, 15, 'h'); run(7, 9, 15, 'h'); run(8, 9, 15, 'h'); run(9, 9, 10, 'h'); })
    },
    bun: {
      back: part(true, function (run, block) { run(1, 14, 15, 'h'); block(2, 4, 13, 15, 'h'); run(5, 14, 15, 'h'); }),
      front: part(true, function (run) { run(5, 12, 15, 'h'); run(6, 10, 15, 'h'); run(7, 9, 15, 'h'); run(8, 9, 12, 'h'); run(9, 9, 10, 'h'); })
    },
    curls: {
      back: part(true, function (run, block) {
        run(1, 11, 15, 'h'); run(2, 9, 15, 'h'); run(3, 7, 15, 'h'); block(4, 15, 6, 15, 'h'); run(16, 7, 15, 'h'); run(17, 8, 15, 'h');
        run(2, 13, 13, 'H'); run(4, 9, 9, 'H'); run(6, 12, 12, 'H'); run(8, 7, 7, 'H'); run(11, 9, 9, 'H'); run(14, 7, 7, 'H');
      }),
      front: part(true, function (run) {
        run(6, 10, 15, 'h'); run(7, 9, 15, 'h'); run(8, 9, 15, 'h'); run(9, 10, 10, 'h'); run(9, 12, 12, 'h'); run(9, 14, 14, 'h');
      })
    },
    locs: {
      mid: part(true, function (run, block) {
        run(5, 10, 15, 'h'); block(6, 26, 7, 15, 'h');
        for (var y = 8; y <= 26; y += 2) { run(y, 8, 8, 'H'); run(y + 1, 10, 10, 'H'); run(y, 12, 12, 'H'); }
      }),
      front: part(true, function (run) { run(5, 12, 15, 'h'); run(6, 10, 15, 'h'); run(7, 9, 15, 'h'); run(8, 9, 11, 'h'); run(8, 14, 14, 'h'); })
    }
  };

  // Head wrap (hijab): a hood with the face opening cut out; it frames the
  // face with an automatic ink edge and covers ears and hair.
  var HIJAB = part(true, function (run, block, cut) {
    run(3, 12, 15, 'c'); run(4, 10, 15, 'c'); run(5, 9, 15, 'c'); block(6, 21, 8, 15, 'c'); run(22, 7, 15, 'c'); block(23, 27, 6, 15, 'c');
    cut(8, 12, 15); for (var y = 9; y <= 17; y++) cut(y, 11, 15); cut(18, 12, 15); cut(19, 13, 15);
    run(24, 9, 9, 'C'); run(26, 11, 11, 'C');                    // folds
  });

  var BEARD = part(true, function (run) {
    run(14, 10, 10, 'h'); run(15, 10, 11, 'h'); run(16, 10, 12, 'h'); run(17, 10, 15, 'h'); run(18, 11, 15, 'h'); run(19, 12, 15, 'h'); run(20, 13, 15, 'h');
  });

  // ─── Faces ─────────────────────────────────────────────────────────────
  function features(mouth) {
    return part(false, function (run, block) {
      run(10, 13, 14, 'k');                                      // brows
      block(12, 13, 13, 13, 'k');                                // eyes
      run(15, 15, 15, 'S');                                      // nose
      run(15, 12, 12, 'p');                                      // cheeks
      if (mouth === 'open') { run(16, 13, 13, 'k'); run(16, 14, 15, 'w'); run(17, 14, 15, 'k'); }
      else if (mouth === 'calm') { run(17, 14, 15, 'k'); }
      else { run(16, 13, 13, 'k'); run(17, 14, 15, 'k'); }
    });
  }

  // ─── Extras ────────────────────────────────────────────────────────────
  var GLASSES = part(false, function (run, block) {
    run(11, 11, 14, 'k'); run(14, 11, 14, 'k'); block(12, 13, 11, 11, 'k'); block(12, 13, 14, 14, 'k');
    block(12, 13, 12, 13, 'g'); run(12, 15, 15, 'k'); run(12, 10, 10, 'k');
  });
  var EXTRAS = {
    none: [],
    lanyard: [part(false, function (run) { run(25, 12, 12, 'a'); run(26, 12, 12, 'a'); run(27, 13, 13, 'a'); run(28, 14, 14, 'a'); }),
              part(true, function (run, block) { block(28, 31, 13, 15, 'w'); })],
    headphones: [part(true, function (run, block) {
      run(3, 12, 15, 'a'); run(4, 10, 11, 'a'); run(5, 9, 9, 'a'); block(6, 10, 8, 8, 'a'); block(11, 16, 6, 8, 'a');
    })],
    headband: [part(true, function (run) { run(7, 10, 15, 'a'); run(8, 9, 15, 'a'); })]
  };

  // ─── Options and composition ───────────────────────────────────────────
  var HAIR_STYLES = Object.keys(HAIR);
  var options = {
    skin: [0, 1, 2, 3, 4, 5],
    hair: HAIR_STYLES,
    hairColour: Object.keys(PALETTE.hair),
    top: Object.keys(TOPS),
    colour: ['navy', 'orange', 'blue', 'light', 'slate'],
    bg: ['orange', 'blue', 'light', 'cyan', 'cream'],
    mouth: ['smile', 'open', 'calm'],
    extra: Object.keys(EXTRAS),
    wrap: ['none', 'hijab'],
    beard: [false, true],
    glasses: [false, true]
  };

  function layersFor(c) {
    var hair = c.wrap === 'hijab' ? {} : (HAIR[c.hair] || {});
    var L = [];
    if (hair.back) L.push(hair.back);
    L.push(BODY);
    (TOPS[c.top] || TOPS.tee).forEach(function (p) { L.push(p); });
    if (hair.mid) L.push(hair.mid);
    L.push(NECK, HEAD);
    if (c.beard) L.push(BEARD);
    if (c.glasses) L.push(GLASSES);
    L.push(features(c.mouth));
    if (hair.front) L.push(hair.front);
    if (c.wrap === 'hijab') L.push(HIJAB);
    (EXTRAS[c.extra] || []).forEach(function (p) { L.push(p); });
    return L;
  }

  function colours(c, brand) {
    brand = brand || PALETTE.brand;
    var skin = PALETTE.skin[c.skin] || PALETTE.skin[1];
    var hair = PALETTE.hair[c.hairColour] || PALETTE.hair.black;
    var top = brand[c.colour] || brand.navy;
    var wrap = brand[c.wrapColour] || brand.slate;
    return {
      s: skin, S: mix(skin, PALETTE.ink, 0.18), p: mix(skin, '#e0605a', 0.35),
      h: hair, H: mix(hair, PALETTE.ink, 0.35),
      t: top, T: mix(top, PALETTE.ink, 0.3),
      w: PALETTE.white, g: PALETTE.lens, k: PALETTE.ink,
      c: wrap, C: mix(wrap, PALETTE.ink, 0.3),
      a: brand[c.accent] || brand.orange
    };
  }

  // Render to a grid of colours (null = background)
  function grid(c, brand) {
    var col = colours(c, brand), g = new Array(N * N).fill(null);
    layersFor(c).forEach(function (p) {
      var has = function (x, y) { return x < 0 || y < 0 || x >= N || y >= N || (y * N + x) in p.cells; };
      Object.keys(p.cells).forEach(function (k) {
        var i = +k, x = i % N, y = (i - x) / N, m = p.cells[k];
        var edge = p.outline && !(has(x - 1, y) && has(x + 1, y) && has(x, y - 1) && has(x, y + 1));
        g[i] = edge ? col.k : (col[m] || col.k);
      });
    });
    return g;
  }

  function svg(c, opts) {
    opts = opts || {};
    var brand = opts.brand || PALETTE.brand;
    var g = grid(c, brand), out = [];
    var bg = brand[c.bg] || brand.light;
    out.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + N + ' ' + N + '" shape-rendering="crispEdges"' +
      (opts.size ? ' width="' + opts.size + '" height="' + opts.size + '"' : '') +
      ' role="img" aria-label="' + (opts.label || 'Pixel-art portrait') + '">');
    out.push('<rect width="' + N + '" height="' + N + '" fill="' + bg + '"/>');
    for (var y = 0; y < N; y++) {
      for (var x = 0; x < N;) {
        var v = g[y * N + x], w = 1;
        while (x + w < N && g[y * N + x + w] === v) w++;
        if (v) out.push('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="1" fill="' + v + '"/>');
        x += w;
      }
    }
    out.push('</svg>');
    return out.join('');
  }

  // Deterministic random config (mulberry32)
  function random(seed) {
    var s = (seed >>> 0) || 1;
    var r = function () { s |= 0; s = s + 0x6D2B79F5 | 0; var t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    var pick = function (a) { return a[Math.floor(r() * a.length)]; };
    var c = {
      skin: pick(options.skin), hair: pick(HAIR_STYLES), hairColour: pick(options.hairColour), top: pick(options.top),
      colour: pick(options.colour), bg: pick(options.bg), mouth: pick(options.mouth), extra: r() < 0.35 ? pick(options.extra) : 'none',
      wrap: r() < 0.15 ? 'hijab' : 'none', wrapColour: pick(options.colour), beard: r() < 0.2, glasses: r() < 0.35, accent: 'orange'
    };
    if (c.colour === c.bg) c.bg = c.bg === 'orange' ? 'light' : 'orange';
    return c;
  }

  // ─── The cast: one character per recommender audience ─────────────────
  // Keys match the audience values used in module front matter and on
  // /recommend/. The promo kit reuses the same people.
  var CAST = {
    'phd-student':    { label: 'PhD student', short: 'PhD student',        skin: 2, hair: 'bun',      hairColour: 'black', top: 'hoodie',  colour: 'blue',   bg: 'orange', mouth: 'open',  extra: 'headphones', accent: 'orange' },
    'postdoc':        { label: 'Postdoc', short: 'Postdoc',            skin: 0, hair: 'sidepart', hairColour: 'ginger', top: 'tee',    colour: 'navy',   bg: 'light',  mouth: 'smile', glasses: true },
    'pi':             { label: 'PI or group leader', short: 'PI', skin: 4, hair: 'crop',     hairColour: 'grey',  top: 'jacket',  colour: 'navy',   bg: 'cyan',   mouth: 'smile', beard: true },
    'decision-maker': { label: 'Decision-maker', short: 'Leader',     skin: 1, hair: 'bob',      hairColour: 'grey',  top: 'shirt',   colour: 'slate',  bg: 'cream',  mouth: 'calm',  glasses: true },
    'rdm-peer':       { label: 'RDM professional', short: 'RDM pro',   skin: 3, hair: 'bald', wrap: 'hijab', wrapColour: 'navy', top: 'tee', colour: 'orange', bg: 'blue', mouth: 'open', extra: 'lanyard', accent: 'cyan' },
    'researcher':     { label: 'Researcher', short: 'Researcher',         skin: 5, hair: 'locs',     hairColour: 'black', top: 'labcoat', colour: 'blue',   bg: 'orange', mouth: 'smile' }
  };

  // ─── Browser: fill <span data-person="phd-student"></span> ─────────────
  // Decorative by default (aria-hidden); the surrounding text names the
  // audience. Uses the live brand colours, so an institution profile
  // recolours the portraits: its accent replaces orange, its dark colour navy.
  function liveBrand() {
    var cs = root.getComputedStyle && root.getComputedStyle(root.document.documentElement);
    var b = Object.assign({}, PALETTE.brand);
    if (!cs) return b;
    var accent = cs.getPropertyValue('--accent').trim(), ink = cs.getPropertyValue('--ink').trim();
    if (/^#[0-9a-f]{6}$/i.test(accent)) b.orange = accent;
    if (/^#[0-9a-f]{6}$/i.test(ink)) b.navy = ink;
    return b;
  }
  function hydrate(scope) {
    var brand = liveBrand();
    (scope || root.document).querySelectorAll('[data-person]').forEach(function (el) {
      var c = CAST[el.getAttribute('data-person')];
      if (!c) return;
      el.innerHTML = svg(c, { brand: brand, label: c.label });
      el.firstChild.setAttribute('aria-hidden', 'true');
    });
  }

  var api = { svg: svg, random: random, options: options, palette: PALETTE, cast: CAST, size: N, hydrate: hydrate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else {
    root.PixelPeople = api;
    var go = function () { hydrate(); };
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', go); else go();
    root.document.addEventListener('fair:profile-change', go);
  }
})(typeof window !== 'undefined' ? window : this);
