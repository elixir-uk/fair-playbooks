/* ═══════════════════════════════════════════════════════════════════════
   Certificates of attendance (/certificate/).
   One A4 landscape certificate per participant, in the pixel style: a star
   badge (the same for everyone), the institution's logo at the top if the
   profile has one, ELIXIR-UK and BioFAIR at the bottom. Colours follow the
   profile. Nothing is stored or sent: names live only in the form.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var BASE = window.__BASE__ || '/';
  var sessions = JSON.parse(document.getElementById('session-data').textContent);
  var form = document.getElementById('cert-form');
  var out = document.getElementById('certs');
  var select = document.getElementById('cert-session');

  sessions.forEach(function (s) {
    var o = document.createElement('option');
    o.value = s.id; o.textContent = s.kind + ' · ' + s.title; select.appendChild(o);
  });
  var want = new URLSearchParams(location.search).get('module');
  if (want && sessions.some(function (s) { return s.id === want; })) select.value = want;
  // "What they took part in" starts from the module's certificate wording and can be edited
  function current() { return sessions.filter(function (x) { return x.id === select.value; })[0] || sessions[0]; }
  function fillCovered() { var s = current(); form.covered.value = s ? (s.cert || s.title) : ''; }
  select.addEventListener('change', fillCovered);
  fillCovered();
  form.date.value = new Date().toISOString().slice(0, 10);
  var prof = window.FairProfile && window.FairProfile.get();
  if (prof && prof.name) form.place.value = prof.name;

  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function niceDate(v) {
    if (!v) return '';
    var d = new Date(v + 'T12:00:00');
    return isNaN(d) ? v : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function render() {
    var s = current();
    var names = form.names.value.split('\n').map(function (n) { return n.trim(); }).filter(Boolean);
    if (!names.length) names = [''];
    var logo = prof && prof.brand && prof.brand.logo;
    var place = form.place.value.trim(), when = niceDate(form.date.value), fac = form.facilitator.value.trim();
    out.innerHTML = names.map(function (name) {
      return '<article class="cert">' +
        '<div class="cert-frame">' +
          '<div class="cert-top">' +
            (logo ? '<img src="' + esc(logo) + '" alt="' + esc(place || 'Institution') + '" class="cert-inst" />' : '') +
            '<p class="cert-kicker">Certificate of attendance</p>' +
          '</div>' +
          '<div class="cert-body">' +
            '<span class="cert-badge"><span class="pixel-icon" data-pixel-icon="star"></span></span>' +
            '<div class="cert-text">' +
              '<p class="cert-level">Level complete</p>' +
              '<p class="cert-name">' + (name ? esc(name) : '<span class="cert-blank"></span>') + '</p>' +
              '<p class="cert-line">took part in</p>' +
              '<p class="cert-module">' + esc(form.covered.value.trim() || s.cert || s.title) + '</p>' +
              '<p class="cert-source">FAIR-in-action Playbook · ' + esc(s.kind) + '</p>' +
              '<p class="cert-line">' + [place ? 'at ' + esc(place) : '', when ? 'on ' + esc(when) : ''].filter(Boolean).join(' ') + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="cert-foot">' +
            '<span class="cert-sign">' + (fac ? esc(fac) : '<span class="cert-blank short"></span>') + '<small>Facilitator</small></span>' +
            '<span class="cert-partners">' +
              '<span class="cert-credit">FAIR-in-action Playbook<br />ELIXIR-UK RDM Club · commissioned by BioFAIR</span>' +
              '<img src="' + BASE + 'assets/branding/elixir-uk-logo.svg" alt="ELIXIR-UK" class="cert-logo" />' +
              '<img src="' + BASE + 'assets/branding/BioFAIR-logo.png" alt="BioFAIR" class="cert-logo" />' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    document.getElementById('cert-count').textContent = names.length + (names.length === 1 ? ' certificate' : ' certificates');
    if (window.PixelIcons) window.PixelIcons.hydrate(out);
  }

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  document.getElementById('cert-print').addEventListener('click', function () { window.print(); });
  render();
})();
