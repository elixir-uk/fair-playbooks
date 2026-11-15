/* ═══════════════════════════════════════════════════════════════════════
   Pixel icons: small 16×16 sprites for the site (dice, floppy, flag…).
   ───────────────────────────────────────────────────────────────────────
   Original artwork, CC BY 4.0 like the rest of the kit. Each icon is drawn
   as 16 rows of 16 characters, so you can edit one by eye:

     .  transparent      k  ink (--ink)        w  white
     a  accent (--accent) b  blue (--link)      l  light blue (--light)
     s  skin

   Colours are CSS variables, so icons follow the institution profile.

   Use in HTML:  <span class="pixel-icon" data-pixel-icon="dice"></span>
   The span is filled on page load. Decorative (aria-hidden): put the
   meaning in the surrounding text.
   In Node:      require('./pixel-icons.js').svg('dice')
   ═══════════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  var ICONS = {
    dice: [
      '................',
      '..kkkkkkkkkkkk..',
      '.kwwwwwwwwwwwwka',
      '.kwkkwwwwwwkkwka',
      '.kwkkwwwwwwkkwka',
      '.kwwwwwwwwwwwwka',
      '.kwwwwwwwwwwwwka',
      '.kwwwwwkkwwwwwka',
      '.kwwwwwkkwwwwwka',
      '.kwwwwwwwwwwwwka',
      '.kwwwwwwwwwwwwka',
      '.kwkkwwwwwwkkwka',
      '.kwkkwwwwwwkkwka',
      '.kwwwwwwwwwwwwka',
      '..kkkkkkkkkkkkaa',
      '...aaaaaaaaaaaa.'
    ],
    floppy: [
      '................',
      '.kkkkkkkkkkkkk..',
      '.kbbkllllllkbbk.',
      '.kbbkllkkllkbbk.',
      '.kbbkllkkllkbbk.',
      '.kbbkkkkkkkkbbk.',
      '.kbbbbbbbbbbbbk.',
      '.kbbbbbbbbbbbbk.',
      '.kbbkkkkkkkkbbk.',
      '.kbkwwwwwwwwkbk.',
      '.kbkwaaaaaawkbk.',
      '.kbkwwwwwwwwkbk.',
      '.kbkwaaaaaawkbk.',
      '.kbkwwwwwwwwkbk.',
      '.kkkkkkkkkkkkkk.',
      '................'
    ],
    printer: [
      '................',
      '....kkkkkkkk....',
      '....kwwwwwwk....',
      '....kwwwwwwk....',
      '.kkkkkkkkkkkkkk.',
      '.kbbbbbbbbbbbbk.',
      '.kbbbbbbbbbabbk.',
      '.kbbbbbbbbbbbbk.',
      '.kkkkkkkkkkkkkk.',
      '...kwwwwwwwwk...',
      '...kwkkkkkkwk...',
      '...kwwwwwwwwk...',
      '...kwkkkkwwwk...',
      '...kwwwwwwwwk...',
      '...kkkkkkkkkk...',
      '................'
    ],
    flag: [
      '................',
      '..kkk...........',
      '...kkkkkkkkkkk..',
      '...kaaaaaaaaak..',
      '...kaaawwwaaak..',
      '...kaaaaaaaaak..',
      '...kaaaaaaaaak..',
      '...kaaaaaaaaak..',
      '...kkkkkkkkkkk..',
      '...k............',
      '...k............',
      '...k............',
      '...k............',
      '...k............',
      '.kkkkk..........',
      '................'
    ],
    // Side rooms: a separate session that branches off the main path.
    sideroom: [
      '................',
      '........kkkkkk..',
      '........kkkkkk..',
      '..........kkkk..',
      '.........kk.kk..',
      '........kk..kk..',
      '.......kk...kk..',
      '......kk....kk..',
      '.....kk.........',
      '....kk..........',
      '...kk...........',
      '..kk............',
      '.kk.............',
      '................',
      '................',
      '................'
    ],
    // Loot: the workshop pack (slides, guide, PDF).
    chest: [
      '................',
      '................',
      '..kkkkkkkkkkkk..',
      '.kaaaaaaaaaaaak.',
      '.kaaaaaaaaaaaak.',
      '.kkkkkkkkkkkkkk.',
      '.kaaaaakkaaaaak.',
      '.kaaaakwwkaaaak.',
      '.kaaaakwwkaaaak.',
      '.kaaaaakkaaaaak.',
      '.kaaaaaaaaaaaak.',
      '.kaaaaaaaaaaaak.',
      '.kkkkkkkkkkkkkk.',
      '................',
      '................',
      '................'
    ],
    // Achievements and "cleared" levels.
    star: [
      '................',
      '.......kk.......',
      '......kaak......',
      '......kaak......',
      '.kkkkkaaaakkkkk.',
      '..kaaaaaaaaaak..',
      '...kaaaaaaaak...',
      '....kaaaaaak....',
      '....kaaaaaak....',
      '...kaaakkaaak...',
      '...kaak..kaak...',
      '..kaak....kaak..',
      '..kkk......kkk..',
      '................',
      '................',
      '................'
    ],
    // The little researcher who runs across the header (cheat code).
    runner: [
      '................',
      '......kkkk......',
      '.....kkkkkk.....',
      '.....kssssk.....',
      '.....kskssk.....',
      '......kssk......',
      '.....kbbbbk.....',
      '...kkbbbbbbkk...',
      '..kk.kbbbbk.kk..',
      '.....kbbbbk.....',
      '.....kkkkkk.....',
      '....kbk..kbk....',
      '...kbk....kbk...',
      '..kkk......kkk..',
      '................',
      '................'
    ],
    // The missing block from the poster: a dashed outline with a question
    // mark. Marks "fill in your local details" slots.
    ghost: [
      '................',
      '.kkk..kkkk..kkk.',
      '.k............k.',
      '.k............k.',
      '.......kk.......',
      '......k..k......',
      '.k.......k....k.',
      '.k......k.....k.',
      '.k......k.....k.',
      '.k............k.',
      '........k.......',
      '................',
      '.k............k.',
      '.k............k.',
      '.kkk..kkkk..kkk.',
      '................'
    ]
  };

  var FILL = {
    k: 'var(--ink, #023452)', w: '#ffffff', a: 'var(--accent, #f47d20)',
    b: 'var(--link, #026a91)', l: 'var(--light, #9bcbdd)', s: '#eab894'
  };

  // fill: override every colour with one value (e.g. 'currentColor', or a
  // hex for CSS mask images).
  function svg(name, fill) {
    var rows = ICONS[name];
    if (!rows) return '';
    var out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true" focusable="false">'];
    rows.forEach(function (row, y) {
      for (var x = 0; x < 16;) {
        var ch = row[x], w = 1;
        while (x + w < 16 && row[x + w] === ch) w++;
        if (ch !== '.') out.push('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="1" fill="' + (fill || FILL[ch]) + '"/>');
        x += w;
      }
    });
    out.push('</svg>');
    return out.join('');
  }

  // ─── Header scene ──────────────────────────────────────────────────────
  // A strip of game level along the bottom of the site header, telling the
  // playbook's story like the poster: resources (floppies) on the left
  // platform, a gap bridged by dashed "missing middle" blocks, and the FAIR
  // flag on the far platform. 240 × 24 art pixels drawn at 3 screen px each
  // (720 × 72), anchored right; CSS continues the ground to the left edge and
  // the header crops the left side on narrow screens, so the flag stays.
  function scene() {
    var W = 240, H = 24, o = [];
    var icon = function (name, x, y, size, fill) {
      return '<svg x="' + x + '" y="' + y + '" width="' + size + '" height="' + size + '" viewBox="0 0 16 16">' +
        svg(name, fill).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</svg>';
    };
    o.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="720" height="72" shape-rendering="crispEdges" aria-hidden="true" focusable="false">');
    // stars (fixed positions so every page matches)
    [[14, 3], [37, 7], [58, 2], [83, 9], [104, 4], [131, 1], [152, 8], [176, 3], [199, 6], [221, 2], [9, 11], [121, 10]].forEach(function (p, i) {
      o.push('<rect x="' + p[0] + '" y="' + p[1] + '" width="1" height="1" fill="var(--light, #9bcbdd)" opacity="' + (i % 3 ? 0.5 : 0.9) + '"/>');
    });
    // platforms: light top edge, brick body
    function ground(x0, x1) {
      o.push('<rect x="' + x0 + '" y="18" width="' + (x1 - x0) + '" height="6" fill="var(--link, #026a91)"/>');
      o.push('<rect x="' + x0 + '" y="18" width="' + (x1 - x0) + '" height="1" fill="var(--light, #9bcbdd)"/>');
      for (var x = x0 + 3; x < x1; x += 8) o.push('<rect x="' + x + '" y="20" width="1" height="2" fill="var(--ink, #023452)" opacity="0.6"/>');
      o.push('<rect x="' + x0 + '" y="22" width="' + (x1 - x0) + '" height="1" fill="var(--ink, #023452)" opacity="0.6"/>');
    }
    ground(0, 96); ground(168, W);
    // resources on the left platform
    [20, 34, 48, 62].forEach(function (x, i) { o.push(icon('floppy', x, i % 2 ? 9 : 10, 8)); });
    // the missing middle: dashed blocks across the gap
    [104, 116, 128, 140, 152].forEach(function (x, i) { o.push(icon('ghost', x, i % 2 ? 11 : 12, 8, 'var(--light, #9bcbdd)')); });
    // …and one resource falling through the crack
    o.push(icon('floppy', 124, 19, 8));
    // the goal
    o.push(icon('flag', 214, 2, 16));
    o.push('</svg>');
    return o.join('');
  }

  function hydrate(scope) {
    (scope || root.document).querySelectorAll('[data-pixel-icon]').forEach(function (el) {
      if (!el.firstChild) el.innerHTML = svg(el.getAttribute('data-pixel-icon'));
    });
    (scope || root.document).querySelectorAll('[data-pixel-scene]').forEach(function (el) {
      if (!el.firstChild) el.innerHTML = scene();
    });
  }

  var api = { svg: svg, scene: scene, names: Object.keys(ICONS), icons: ICONS, hydrate: hydrate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else {
    root.PixelIcons = api;
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', function () { hydrate(); });
    else hydrate();
  }
})(typeof window !== 'undefined' ? window : this);
