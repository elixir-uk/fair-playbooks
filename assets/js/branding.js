/* Institution profile set-up form – ported from src/pages/branding.astro.
   Reads/writes window.FairProfile (defined in profile.js). */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('brand-form');
  var status = document.getElementById('brand-status');
  var logoStatus = document.getElementById('brand-logo-status');
  var logoData = null;

  var logoInput = document.getElementById('brand-logo-file');
  if (logoInput) logoInput.addEventListener('change', function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      logoData = r.result;
      logoStatus.textContent = '✓ Logo loaded (' + Math.round(f.size / 1024) + ' KB) – Save to apply it across the site.';
      logoStatus.hidden = false;
    };
    r.readAsDataURL(f);
  });

  function fillForm(p) {
    if (!p) p = {};
    ['name', 'shortName', 'contactEmail', 'contactTeam', 'policiesUrl'].forEach(function (k) {
      var el = form.elements[k];
      if (el) el.value = p[k] || '';
    });
    document.querySelectorAll('.help-row').forEach(function (row) {
      var cat = row.getAttribute('data-cat');
      var entry = (p.help && p.help[cat]) || {};
      var c = row.querySelector('[data-field="contact"]');
      var u = row.querySelector('[data-field="url"]');
      if (c) c.value = entry.contact || '';
      if (u) u.value = entry.url || '';
    });
    var b = p.brand || {};
    if (form.elements['brandPrimary']) form.elements['brandPrimary'].value = b.primary || '';
    if (form.elements['brandAccent']) form.elements['brandAccent'].value = b.accent || '';
    logoData = b.logo || null;
    if (b.primary && document.getElementById('brandPrimaryPick')) try { document.getElementById('brandPrimaryPick').value = b.primary; } catch (e) {}
    if (b.accent && document.getElementById('brandAccentPick')) try { document.getElementById('brandAccentPick').value = b.accent; } catch (e) {}
    if (typeof renderCheck === 'function') renderCheck();
    if (logoStatus) {
      logoStatus.hidden = !b.logo;
      if (b.logo) logoStatus.textContent = '✓ Custom logo set for this institution.';
    }
  }

  function readForm() {
    var p = {
      name: form.elements['name'].value.trim(),
      shortName: form.elements['shortName'].value.trim(),
      contactEmail: form.elements['contactEmail'].value.trim(),
      contactTeam: form.elements['contactTeam'].value.trim(),
      policiesUrl: form.elements['policiesUrl'].value.trim(),
      help: {}
    };
    if (!p.shortName) p.shortName = p.name;
    document.querySelectorAll('.help-row').forEach(function (row) {
      var cat = row.getAttribute('data-cat');
      var contact = row.querySelector('[data-field="contact"]').value.trim();
      var url = row.querySelector('[data-field="url"]').value.trim();
      if (contact || url) p.help[cat] = { contact: contact, url: url };
    });
    var primary = form.elements['brandPrimary'].value.trim();
    var accent = form.elements['brandAccent'].value.trim();
    if (primary || accent || logoData) p.brand = { primary: primary, accent: accent, logo: logoData || '' };
    return p;
  }

  function flash(msg) { status.textContent = msg; status.hidden = false; }

  // ── Live accessibility check for the two brand colours ──
  var check = document.getElementById('brand-check');
  function sync(textId, pickId) {
    var t = form.elements[textId], k = document.getElementById(pickId);
    if (!t || !k) return;
    k.addEventListener('input', function () { t.value = k.value; renderCheck(); });
    t.addEventListener('input', function () { if (/^#?[0-9a-f]{6}$/i.test(t.value.trim())) k.value = '#' + t.value.trim().replace('#', ''); renderCheck(); });
  }
  function ratio(n) { return n.toFixed(1) + ':1'; }
  function renderCheck() {
    if (!check || !window.FairProfile.colours) return;
    var primary = form.elements['brandPrimary'].value.trim(), accent = form.elements['brandAccent'].value.trim();
    if (!primary && !accent) { check.innerHTML = ''; return; }
    var c = window.FairProfile.colours({ brand: { primary: primary, accent: accent } });
    var whiteOnDark = c.contrast('#ffffff', primary && /^#?[0-9a-f]{6}$/i.test(primary.replace('#','')) ? (primary[0] === '#' ? primary : '#' + primary) : c.dark);
    var rows = [];
    rows.push(c.darkAdjusted
      ? '<li class="warn"><b>Dark colour is too light</b> for white text (' + ratio(whiteOnDark) + ', needs 4.5:1). The site will use a darker shade, <span class="sw" style="background:' + c.dark + '"></span>' + c.dark + '. Choose a darker colour to keep yours exactly.</li>'
      : '<li class="ok"><b>Dark colour works</b> with white text (' + ratio(c.contrast('#ffffff', c.dark)) + ').</li>');
    rows.push('<li class="ok"><b>Accent as text</b> on light backgrounds uses <span class="sw" style="background:' + c.accentText + '"></span>' + c.accentText + ' (' + ratio(c.contrast(c.accentText, '#f1f4f6')) + ').' + (c.accentText.toLowerCase() !== c.accent.toLowerCase() ? ' Your accent is too light for text, so a darker shade is used automatically.' : '') + '</li>');
    rows.push('<li class="ok"><b>Text on the accent</b> is ' + (c.onAccent === '#ffffff' ? 'white' : (c.onAccent === '#000000' ? 'black' : 'your dark colour')) + ' (' + ratio(c.contrast(c.onAccent, c.accent)) + ').</li>');
    check.innerHTML = '<div class="brand-preview" style="background:' + c.dark + '"><span style="color:#fff">Heading on dark</span> <span class="pv-pill" style="background:' + c.accent + ';color:' + c.onAccent + '">Button</span> <span style="color:' + c.accentOnDark + '">Label</span></div><ul>' + rows.join('') + '</ul>';
  }
  sync('brandPrimary', 'brandPrimaryPick');
  sync('brandAccent', 'brandAccentPick');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var p = readForm();
    if (!p.name) { flash('Add at least an institution name.'); return; }
    window.FairProfile.set(p);
    flash('✓ Saved. Every activity now shows ' + p.name + '. Open a module to see the local-help boxes filled in.');
  });

  document.getElementById('brand-clear').addEventListener('click', function () {
    window.FairProfile.clear();
    fillForm(null);
    flash('Cleared. You\'re back to the canonical ELIXIR-UK kit.');
  });

  document.getElementById('brand-demo').addEventListener('click', function () {
    // Demo: Earlham Institute. Colours are taken from earlham.ac.uk (logo red
    // and wordmark charcoal). Team names are generic placeholders: replace
    // them with Earlham's real contacts before using this as a showcase.
    var demo = {
      name: 'Earlham Institute',
      shortName: 'Earlham',
      contactEmail: '',
      contactTeam: 'Earlham research data team',
      policiesUrl: 'https://www.earlham.ac.uk',
      help: {
        repository: { contact: 'Earlham research data team', url: '' },
        dmp: { contact: 'Research office: DMP advice', url: '' },
        ethics: { contact: 'Ethics and governance', url: '' },
        licensing: { contact: 'Library and scholarly communications', url: '' },
        it: { contact: 'Research computing', url: '' },
        training: { contact: 'Earlham training team', url: 'https://www.earlham.ac.uk' }
      },
      brand: { primary: '#4e515a', accent: '#c61f16', logo: '' }
    };
    fillForm(demo);
    window.FairProfile.set(demo);
    flash('✓ Loaded the Earlham Institute demo. Open any module: the local-help boxes and colours now show Earlham. Clear it when you are done.');
  });

  document.getElementById('brand-export').addEventListener('click', function () {
    var p = window.FairProfile.get() || readForm();
    var blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (p.shortName || 'institution') + '-fair-profile.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('brand-import').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var p = JSON.parse(reader.result);
        fillForm(p);
        window.FairProfile.set(p);
        flash('✓ Imported ' + (p.name || 'profile') + '. Applied across the kit.');
      } catch (err) { flash('That file was not a valid profile.'); }
    };
    reader.readAsText(file);
  });

  fillForm(window.FairProfile.get());
});
