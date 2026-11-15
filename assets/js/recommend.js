/* ═══════════════════════════════════════════════════════════════════════
   Recommender scorer – ported verbatim from src/pages/recommend.astro.
   moduleData comes from the #module-data JSON emitted by Liquid; each entry
   already carries its baseurl-aware `url`, so links work under any baseurl.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var moduleData = [], gameData = [];
  try { moduleData = JSON.parse(document.getElementById('module-data').textContent); } catch (e) { moduleData = []; }
  try { gameData = JSON.parse(document.getElementById('game-data').textContent); } catch (e) { gameData = []; }
  // Ready modules are sessions to run; outlines and modules in progress are reading.
  var runnable = moduleData.filter(function (m) { return !m.status || m.status === 'ready'; });
  var reading = moduleData.filter(function (m) { return m.status && m.status !== 'ready'; });

  // Tag axes and per-axis scoring weights.
  // Scenario weighted highest because it's the strongest signal of relevance.
  const AXIS_WEIGHTS = { audience: 2, scenario: 3, dataType: 1, intent: 2 };

  const answers = { audience: [], scenario: [], dataType: [], intent: [], time: [] };
  let currentStep = 1;
  const totalSteps = 5;

  function show(step) {
    document.querySelectorAll('.step').forEach((s) => { s.hidden = parseInt(s.dataset.step) !== step; });
    document.querySelector('.results').hidden = true;
    document.querySelectorAll('#progress-dots span').forEach((dot) => {
      const dotStep = parseInt(dot.dataset.step);
      dot.removeAttribute('data-active');
      dot.removeAttribute('data-done');
      if (dotStep < step) dot.setAttribute('data-done', 'true');
      else if (dotStep === step) dot.setAttribute('data-active', 'true');
    });
  }

  function advance() {
    if (currentStep < totalSteps) { currentStep++; show(currentStep); }
    else { computeAndShowResults(); }
  }

  document.querySelectorAll('.step').forEach((step) => {
    const axis = step.dataset.axis;
    const choicesEl = step.querySelector('.choices');
    const isMulti = choicesEl && choicesEl.dataset.multi !== undefined;
    const maxChoices = isMulti ? parseInt(choicesEl.dataset.multi) : 1;
    const nextBtn = step.querySelector('.next');

    step.querySelectorAll('.choice').forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        if (isMulti) {
          const selected = step.querySelectorAll('.choice[data-selected="true"]');
          if (btn.dataset.selected === 'true') { btn.removeAttribute('data-selected'); }
          else if (selected.length < maxChoices) { btn.setAttribute('data-selected', 'true'); }
          const currentSelected = Array.from(step.querySelectorAll('.choice[data-selected="true"]')).map((b) => b.dataset.value);
          answers[axis] = currentSelected;
          if (nextBtn) nextBtn.disabled = currentSelected.length === 0;
        } else {
          step.querySelectorAll('.choice').forEach((b) => b.removeAttribute('data-selected'));
          btn.setAttribute('data-selected', 'true');
          answers[axis] = [value];
          setTimeout(advance, 200);
        }
      });
    });

    if (nextBtn) nextBtn.addEventListener('click', advance);
  });

  function scoreModule(mod) {
    let score = 0;
    const matched = { audience: [], scenario: [], dataType: [], intent: [] };
    for (const axis of Object.keys(AXIS_WEIGHTS)) {
      const userTags = answers[axis] || [];
      const modTags = mod[axis] || [];
      const overlap = userTags.filter((t) => modTags.includes(t));
      matched[axis] = overlap;
      score += overlap.length * AXIS_WEIGHTS[axis];
    }
    return { score, matched };
  }

  function matchBand(score) {
    if (score >= 7) return { label: 'Strong match', tone: 'strong' };
    if (score >= 4) return { label: 'Good fit', tone: 'good' };
    if (score >= 1) return { label: 'Worth considering', tone: 'soft' };
    return { label: 'Weak match', tone: 'weak' };
  }

  const AXIS_PHRASES = {
    audience: { lead: "who you're supporting", conjunction: 'matches' },
    scenario: { lead: 'the scenario', conjunction: 'fits' },
    dataType: { lead: 'the data type', conjunction: 'covers' },
    intent: { lead: 'the format you need', conjunction: 'delivers' },
  };
  // Labels come from _data/choices.yml (set in recommend.html)
  const VALUE_LABELS = window.__CHOICE_LABELS__ || {};

  function reasoningSentence(matched) {
    const parts = [];
    for (const axis of ['scenario', 'audience', 'intent', 'dataType']) {
      const overlap = matched[axis];
      if (overlap && overlap.length > 0) {
        const labels = overlap.map((v) => VALUE_LABELS[v] || v).join(' + ');
        parts.push('<strong>' + AXIS_PHRASES[axis].conjunction + '</strong> ' + AXIS_PHRASES[axis].lead + ' (' + labels + ')');
      }
    }
    if (parts.length === 0) return 'Indirect match based on related tags.';
    return parts.join(' · ');
  }

  // Game-style stats and the resources you take into the room ("loot")
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const two = (n) => ('0' + n).slice(-2);
  function questHud(mod, minutes) {
    return '<p class="quest-hud">' +
      (mod.steps ? '<span>Steps <b>' + two(mod.steps) + '</b></span>' : '') +
      '<span>Time <b>' + minutes + '</b> min</span>' +
      (mod.sources && mod.sources.length ? '<span>Loot <b>' + two(mod.sources.length) + '</b></span>' : '') + '</p>';
  }
  function loot(mod) {
    if (!mod.sources || !mod.sources.length) return '';
    return '<ul class="quest-loot" aria-label="Resources this module is built from">' +
      mod.sources.map((n) => '<li><span class="pixel-icon" data-pixel-icon="floppy"></span>' + esc(n) + '</li>').join('') + '</ul>';
  }

  function renderPrimary(item, preferShort) {
    const mod = item.mod, score = item.score, matched = item.matched;
    const band = matchBand(score);
    const hasShort = mod.short !== undefined && mod.short !== null;
    const useShort = preferShort && hasShort;
    const minutes = useShort ? mod.short : mod.long;
    const versionLabel = useShort ? 'Quick recap' : (preferShort && !hasShort ? 'Full module only, no shorter version' : 'Full module');
    return '' +
      '<div class="primary-card">' +
      '<div class="primary-tag"><span class="pixel-icon" data-pixel-icon="star"></span>Main quest · ' + band.label + '</div>' +
      '<h3 class="primary-title">' + mod.title + '</h3>' +
      '<p class="primary-summary">' + mod.summary + '</p>' +
      '<div class="primary-reason">' + reasoningSentence(matched) + '</div>' +
      questHud(mod, minutes) + loot(mod) +
      '<div class="primary-foot">' +
      '<span class="primary-time">' + versionLabel + ' · ' + minutes + ' min</span>' +
      '<a href="' + mod.url + '#' + (useShort ? 'short' : 'long') + '" class="btn btn-primary">Start this quest →</a>' +
      '</div></div>';
  }

  function renderSecondary(item, preferShort) {
    const mod = item.mod, score = item.score, matched = item.matched;
    const band = matchBand(score);
    const hasShort = mod.short !== undefined && mod.short !== null;
    const useShort = preferShort && hasShort;
    const minutes = useShort ? mod.short : mod.long;
    const versionLabel = useShort ? 'recap' : 'full';
    return '' +
      '<a class="secondary-card" href="' + mod.url + '#' + (useShort ? 'short' : 'long') + '">' +
      '<div class="secondary-band" data-tone="' + band.tone + '">' + band.label + '</div>' +
      '<div class="secondary-body">' +
      '<div class="secondary-meta"><span class="secondary-time">' + versionLabel + ' ' + minutes + 'm</span></div>' +
      '<strong class="secondary-title">' + mod.title + '</strong>' +
      '<div class="secondary-reason">' + reasoningSentence(matched) + '</div>' +
      '</div>' +
      '<div class="secondary-arrow">→</div>' +
      '</a>';
  }

  function renderGame(item) {
    const g = item.item;
    return '' +
      '<a class="secondary-card" href="' + g.url + '">' +
      '<div class="secondary-band" data-tone="good">Game</div>' +
      '<div class="secondary-body">' +
      '<div class="secondary-meta"><span class="secondary-time">' + esc(g.time || '') + (g.dropIn ? ' · works as a drop-in stand' : '') + '</span></div>' +
      '<strong class="secondary-title">' + esc(g.title) + '</strong>' +
      '<div class="secondary-reason">' + reasoningSentence(item.matched) + '</div>' +
      '</div><div class="secondary-arrow">→</div></a>';
  }
  function renderReading(item) {
    const mod = item.item;
    return '' +
      '<a class="secondary-card" href="' + mod.url + '">' +
      '<div class="secondary-band" data-tone="weak">' + esc(mod.statusLabel || 'Reading') + '</div>' +
      '<div class="secondary-body">' +
      '<strong class="secondary-title">' + esc(mod.title) + '</strong>' +
      '<div class="secondary-reason">' + reasoningSentence(item.matched) + '</div>' +
      '</div><div class="secondary-arrow">→</div></a>';
  }
  function ranked(list) {
    return list.map(function (x) { return Object.assign({ item: x, mod: x }, scoreModule(x)); })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; });
  }
  function fill(headerId, listId, items, render) {
    const header = document.getElementById(headerId), list = document.getElementById(listId);
    header.hidden = items.length === 0;
    list.innerHTML = items.map(render).join('');
  }

  function computeAndShowResults() {
    document.querySelectorAll('.step').forEach((s) => (s.hidden = true));
    document.querySelectorAll('#progress-dots span').forEach((dot) => {
      dot.removeAttribute('data-active');
      dot.setAttribute('data-done', 'true');
    });

    const matched = ranked(runnable);
    const games = ranked(gameData).slice(0, 2);
    const reads = ranked(reading).slice(0, 3);
    fill('game-header', 'game-results', games, renderGame);
    fill('reading-header', 'reading-results', reads, renderReading);
    // When a game fits better than any ready module, show the games first.
    (function () {
      const res = document.querySelector('.results'), gh = document.getElementById('game-header'), gl = document.getElementById('game-results');
      const anchor = document.getElementById('primary-result');
      const gamesFirst = games.length && (!matched.length || games[0].score > matched[0].score);
      if (gamesFirst) { res.insertBefore(gh, anchor); res.insertBefore(gl, anchor); }
      else { const sh = document.getElementById('secondary-results'); sh.after(gh); gh.after(gl); }
    })();
    const preferShort = answers.time[0] === 'quick';

    const primary = document.getElementById('primary-result');
    const secondary = document.getElementById('secondary-results');
    const secondaryHeader = document.getElementById('secondary-header');
    const summary = document.getElementById('results-summary');
    primary.innerHTML = '';
    secondary.innerHTML = '';

    if (matched.length === 0) {
      document.querySelector('.results-title').textContent = 'Nothing matched strongly';
      primary.innerHTML = '<div class="primary-card"><div class="primary-reason">No ready-to-run module matches your answers closely' + (games.length || reads.length ? ', but the game and reading below do' : '') + '. You can also change the scenario or audience, or browse <a href="' + (window.__BASE__ || '/') + 'modules/">all modules</a>.</div></div>';
      document.getElementById('secondary-header').hidden = true;
      summary.innerHTML = '';
      document.querySelector('.results').hidden = false;
      return;
    }

    document.querySelector('.results-title').textContent = 'Your quest';
    primary.innerHTML = renderPrimary(matched[0], preferShort);

    const supporting = matched.slice(1, 5);
    if (supporting.length > 0) {
      secondaryHeader.hidden = false;
      secondary.innerHTML = supporting.map((s) => renderSecondary(s, preferShort)).join('');
    } else {
      secondaryHeader.hidden = true;
    }

    summary.innerHTML = '<span class="results-summary-mono">// ' + matched.length + ' match' + (matched.length === 1 ? '' : 'es') + '</span>';
    document.querySelector('.results').hidden = false;
    if (window.PixelIcons) window.PixelIcons.hydrate(document.querySelector('.results'));
  }

  document.querySelector('.restart').addEventListener('click', () => {
    Object.keys(answers).forEach((k) => (answers[k] = []));
    document.querySelectorAll('.choice[data-selected="true"]').forEach((b) => b.removeAttribute('data-selected'));
    document.querySelectorAll('.next').forEach((b) => (b.disabled = true));
    currentStep = 1;
    show(1);
  });

  show(1);
})();
