/* ==========================================================================
   THE HUMBLER: Application Controller
   Orchestrates the Confession Threshold, Archival Excavation, Interactive
   Lineage Timeline & World Origin Atlas, Monograph Folio, and Drawers.
   ========================================================================== */

(function (global) {
  'use strict';

  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  const FEATURED_SPECIMEN_IDS = [
    'expectation-suffering',
    'imagined-anxiety',
    'wu-wei',
    'grief-lent-not-owned',
    'self-mastery',
    'perspectivism'
  ];

  const state = {
    view: 'landing', // 'landing' | 'result'
    vizMode: 'timeline', // 'timeline' | 'map'
    scriptMode: 'parallel', // 'parallel' | 'original' | 'translation'
    result: null,
    activeNodeIdx: 0,
    specimenOffset: 0,
    indexOpen: false,
    scholarOpen: false,
    claimExpanded: false,
    requestSeq: 0
  };

  /* DOM References */
  const el = {};

  function bindDom() {
    const ids = [
      'brandHomeBtn', 'brandHomeText', 'openIndexBtn', 'openScholarBtn', 'canonCount', 'scholarDot',
      'landingView', 'resultView', 'ideaForm', 'ideaInput', 'humbleBtn', 'modeIndicator', 'thresholdNotice',
      'specimensList', 'shuffleSpecimensBtn', 'excavationOverlay', 'excavationTitle', 'excavationSub',
      'backToThresholdBtn', 'timelineModeBtn', 'mapModeBtn', 'stageCaptionLeft', 'stageCaptionRight',
      'vizWrap', 'lineageSvg', 'mapZoomControls', 'mapZoomInBtn', 'mapZoomOutBtn', 'mapWitnessStrip',
      'folioRankLabel', 'folioPlaceTop', 'folioThreads',
      'verdictYears', 'verdictSubline', 'verdictDate', 'verdictThinker', 'verdictTradition',
      'userClaimDisplay', 'ancientThesisDisplay', 'scriptureTitleTop', 'originalScriptBlock',
      'originalScriptText', 'transliterationText', 'translationText', 'scriptureProvenance',
      'folioPlateTitle', 'folioCommentary', 'folioMarginaliaBlock', 'folioMarginalia',
      'relatedBlock', 'relatedLinks', 'broadNotice', 'broadOpenScholarBtn',
      'prevWitnessBtn', 'nextWitnessBtn', 'witnessCounter',
      'vizTooltip', 'ttMeta', 'ttTitle', 'ttDetail',
      'drawerBackdrop', 'indexDrawer', 'closeIndexBtn', 'indexSearchInput', 'indexList',
      'scholarDrawer', 'closeScholarBtn', 'scholarKeyForm', 'geminiKeyInput', 'clearKeyBtn', 'scholarStatusMsg'
    ];
    ids.forEach((id) => {
      el[id] = document.getElementById(id);
    });
  }

  /* ========================================================================
     SPECIMEN THOUGHTS (THRESHOLD: 6 ON DESKTOP 2-COL, 4 ON MOBILE)
     ======================================================================== */
  function getSpecimenBatch() {
    const all = global.HUMBLER_MATCHER.getAllChronological();
    if (state.specimenOffset === 0) {
      return FEATURED_SPECIMEN_IDS
        .map((id) => global.HUMBLER_MATCHER.getEntryById(id))
        .filter(Boolean);
    }
    const pool = all.filter((item) => !FEATURED_SPECIMEN_IDS.includes(item.id));
    if (!pool.length) return [];
    const start = ((state.specimenOffset - 1) * 6) % pool.length;
    const batch = [];
    for (let i = 0; i < 6 && i < pool.length; i++) {
      batch.push(pool[(start + i) % pool.length]);
    }
    return batch;
  }

  function renderSpecimens() {
    const batch = getSpecimenBatch();
    el.specimensList.innerHTML = '';

    batch.forEach((entry, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'specimen-item';
      btn.innerHTML = `<span class="specimen-num">${ROMAN[idx + 1] || idx + 1}</span><span class="specimen-quote">“${escapeHtml(entry.specimen)}”</span>`;
      btn.addEventListener('click', () => {
        el.ideaInput.value = entry.specimen;
        autoResizeTextarea();
        submitIdea(entry.specimen, entry.id);
      });
      el.specimensList.appendChild(btn);
    });
  }

  /* ========================================================================
     SUBMISSION & ARCHIVAL EXCAVATION
     ======================================================================== */
  function showExcavation(title, sub) {
    el.excavationTitle.textContent = title;
    el.excavationSub.textContent = sub;
    el.excavationOverlay.classList.remove('hidden');
  }

  function hideExcavation() {
    el.excavationOverlay.classList.add('hidden');
  }

  function showThresholdNotice(lead, message, actions) {
    el.thresholdNotice.innerHTML = '';
    const leadSpan = document.createElement('span');
    leadSpan.className = 'threshold-notice-lead';
    leadSpan.textContent = lead;
    el.thresholdNotice.appendChild(leadSpan);

    el.thresholdNotice.appendChild(document.createTextNode(message));

    if (Array.isArray(actions) && actions.length) {
      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'notice-actions-row';
      actions.forEach((act) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'inline-gold-btn';
        btn.textContent = act.label;
        btn.addEventListener('click', act.onClick);
        actionsWrap.appendChild(btn);
      });
      el.thresholdNotice.appendChild(actionsWrap);
    }
    el.thresholdNotice.classList.remove('hidden');
  }

  function clearThresholdNotice() {
    el.thresholdNotice.classList.add('hidden');
    el.thresholdNotice.innerHTML = '';
  }

  async function submitIdea(rawText, forceArchiveId, skipDelay) {
    const text = String(rawText || '').trim();
    clearThresholdNotice();

    if (!text) {
      showThresholdNotice(
        'Empty manuscript',
        'Inscribe a philosophical thought before consulting the archive.'
      );
      el.ideaInput.focus();
      return;
    }

    const reqId = ++state.requestSeq;
    const useLive = !forceArchiveId && global.HUMBLER_LIVE && global.HUMBLER_LIVE.isEnabled();

    const preCheck = !forceArchiveId ? global.HUMBLER_MATCHER.matchIdea(text) : null;
    if (preCheck && preCheck.reason === 'empty_or_symbols') {
      showThresholdNotice(
        'Unreadable inscription',
        'Use words rather than symbols alone so the archive can trace your idea.'
      );
      el.ideaInput.focus();
      return;
    }

    if (useLive) {
      showExcavation('Consulting Live Scholar…', 'Excavating oldest verifiable primary texts via Gemini');
      try {
        const liveResult = await global.HUMBLER_LIVE.excavate(text);
        if (reqId !== state.requestSeq) return;
        hideExcavation();
        openResult(liveResult);
        return;
      } catch (err) {
        if (reqId !== state.requestSeq) return;
        console.warn('Live Scholar fallback to verified archive:', err);
        showExcavation('Returning to Verified Archive…', 'Live Scholar unavailable; matching against the verified canon');
        await wait(320);
        if (reqId !== state.requestSeq) return;
      }
    } else if (!forceArchiveId && preCheck && preCheck.unmatched) {
      const totalRoots = (global.HUMBLER_CANON || []).length;
      const actions = [
        { label: 'Browse Index of Origins', onClick: openIndexDrawer },
        { label: 'Enable Live Scholar', onClick: openScholarDrawer }
      ];
      if (preCheck.entry && preCheck.score >= 5) {
        actions.unshift({
          label: `Closest plate: ${preCheck.entry.title}`,
          onClick: () => submitIdea(text, preCheck.entry.id)
        });
      }
      showThresholdNotice(
        'No archival echo',
        `The Humbler is built for philosophical epiphanies, and our ${totalRoots}-root verified canon found no close match for that phrase. Try rephrasing your philosophical insight:`,
        actions
      );
      return;
    } else if (!skipDelay) {
      showExcavation('Excavating the Archive…', 'Tracing 4,600 years of surviving scriptures');
      await wait(240);
      if (reqId !== state.requestSeq) return;
    }

    let result;
    if (forceArchiveId) {
      const entry = global.HUMBLER_MATCHER.getEntryById(forceArchiveId);
      const matched = global.HUMBLER_MATCHER.matchIdea(text);
      if (entry) {
        result = {
          source: 'archive',
          unmatched: false,
          userIdea: text,
          entry,
          yearsLate: global.HUMBLER_MATCHER.computeYearsLate(entry.origin.year),
          confidence: 'high',
          threads: matched.entry && matched.entry.id === entry.id ? matched.threads : [entry.domain.toLowerCase()],
          related: (matched.related || []).filter((r) => r.id !== entry.id).slice(0, 2)
        };
      } else {
        result = matched;
      }
    } else {
      result = preCheck || global.HUMBLER_MATCHER.matchIdea(text);
    }

    if (reqId !== state.requestSeq) return;
    hideExcavation();

    if (!result || !result.entry) {
      showThresholdNotice(
        'No archival echo',
        'No matching primary source was found in the local archive.',
        [
          { label: 'Browse Index of Origins', onClick: openIndexDrawer },
          { label: 'Enable Live Scholar', onClick: openScholarDrawer }
        ]
      );
      return;
    }

    openResult(result);
  }

  function openResult(result) {
    state.result = result;
    state.activeNodeIdx = 0;
    state.claimExpanded = false;
    state.view = 'result';

    document.body.classList.remove('is-landing');
    document.body.classList.add('is-result');
    el.landingView.classList.add('hidden');
    el.resultView.classList.remove('hidden');

    closeAllDrawers();
    renderResultPlate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function returnToThreshold() {
    state.view = 'landing';
    hideTooltip();
    document.body.classList.remove('is-result');
    document.body.classList.add('is-landing');
    el.resultView.classList.add('hidden');
    el.landingView.classList.remove('hidden');
    global.HUMBLER_VIZ.renderBackdropMap('#backdropSvg');
    el.ideaInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ========================================================================
     RENDER RESULT PLATE (VERDICT PLAQUE + VISUAL STAGE + MONOGRAPH FOLIO)
     ======================================================================== */
  function renderResultPlate() {
    if (!state.result) return;
    renderMonographFolio();
    renderVisualization();
  }

  function renderVisualization() {
    if (!state.result) return;
    const nodes = global.HUMBLER_VIZ.buildNodes(state.result.entry);

    el.timelineModeBtn.classList.toggle('is-active', state.vizMode === 'timeline');
    el.timelineModeBtn.setAttribute('aria-selected', String(state.vizMode === 'timeline'));
    el.mapModeBtn.classList.toggle('is-active', state.vizMode === 'map');
    el.mapModeBtn.setAttribute('aria-selected', String(state.vizMode === 'map'));
    el.vizWrap.classList.toggle('is-map', state.vizMode === 'map');

    const isMap = state.vizMode === 'map';
    if (el.mapZoomControls) {
      el.mapZoomControls.classList.toggle('hidden', !isMap);
    }
    if (el.mapWitnessStrip) {
      el.mapWitnessStrip.classList.toggle('hidden', !isMap);
      if (isMap) {
        renderMapWitnessStrip(nodes);
      }
    }

    const callbacks = {
      onSelect: (idx) => {
        if (idx === state.activeNodeIdx) return;
        state.activeNodeIdx = idx;
        hideTooltip();
        renderResultPlate();
      },
      onHover: (node, event) => showTooltip(node, event),
      onMove: (event) => positionTooltip(event),
      onLeave: () => hideTooltip()
    };

    if (state.vizMode === 'timeline') {
      el.stageCaptionLeft.textContent = 'Chronological Descent · Select any witness to inspect primary scripture';
      if (el.stageCaptionRight) {
        el.stageCaptionRight.textContent = `${nodes.length} recorded ${nodes.length === 1 ? 'witness' : 'witnesses'} before you`;
      }
      global.HUMBLER_VIZ.renderTimeline('#lineageSvg', state.result, state.activeNodeIdx, callbacks);
    } else {
      el.stageCaptionLeft.textContent = 'Geographic Origin & Cross-Cultural Echoes · Select any pin or witness';
      if (el.stageCaptionRight) {
        el.stageCaptionRight.textContent = `Natural Earth 50m · ${nodes[0].place}`;
      }
      global.HUMBLER_VIZ.renderWorldOriginMap('#lineageSvg', state.result, state.activeNodeIdx, callbacks);
    }
  }

  function renderMapWitnessStrip(nodes) {
    if (!el.mapWitnessStrip) return;
    el.mapWitnessStrip.innerHTML = '';

    nodes.forEach((node, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `map-witness-pill${idx === state.activeNodeIdx ? ' is-active' : ''}${idx === 0 ? ' is-origin' : ''}`;
      const shortThinker = node.thinker.replace(/\s*\([^)]*\)/g, '').trim();
      const shortYear = global.HUMBLER_MATCHER.formatYearShort(node.year);
      const shortPlace = (node.place || '').split(',')[0].trim();
      btn.innerHTML = `<span class="pill-roman">${escapeHtml(node.roman)}</span><span class="pill-name">${escapeHtml(shortThinker)}</span><span class="pill-year">${escapeHtml(shortYear)} &middot; ${escapeHtml(shortPlace)}</span>`;
      btn.addEventListener('click', () => {
        if (idx === state.activeNodeIdx) return;
        state.activeNodeIdx = idx;
        hideTooltip();
        renderResultPlate();
      });
      el.mapWitnessStrip.appendChild(btn);
    });
  }

  function renderMonographFolio() {
    const res = state.result;
    const nodes = global.HUMBLER_VIZ.buildNodes(res.entry);
    const node = nodes[state.activeNodeIdx] || nodes[0];
    const isOrigin = state.activeNodeIdx === 0;
    const yearsLate = global.HUMBLER_MATCHER.computeYearsLate(node.year);

    /* Running Head & Architectural Verdict Plaque */
    el.folioRankLabel.textContent = isOrigin
      ? `Oldest Recorded Origin · ${node.roman} of ${ROMAN[nodes.length] || nodes.length}`
      : `Independent Echo · ${node.roman} of ${ROMAN[nodes.length] || nodes.length}`;
    el.folioRankLabel.classList.toggle('is-echo', !isOrigin);

    if (el.folioPlaceTop) {
      el.folioPlaceTop.textContent = node.region ? `${node.place} · ${node.region}` : node.place;
    }

    if (el.folioThreads) {
      if (res.source === 'live') {
        el.folioThreads.textContent = `Live Scholar · ${res.threads.join(' · ')}`;
      } else if (res.threads && res.threads.length) {
        el.folioThreads.textContent = `Traced via: ${res.threads.join(' · ')}`;
      } else {
        el.folioThreads.textContent = res.entry.domain;
      }
    }

    el.verdictYears.textContent = `${yearsLate.toLocaleString()} years late`;
    if (el.verdictSubline) {
      el.verdictSubline.textContent = isOrigin
        ? `First attested in ${node.language} (${node.place}), long before you phrased it`
        : `Independent echo in ${node.place}, ${Math.abs(node.year - nodes[0].year).toLocaleString()} years after ${nodes[0].thinker.replace(/\s*\([^)]*\)/g, '')}`;
    }

    el.verdictDate.textContent = node.yearLabel;
    el.verdictThinker.textContent = node.thinker;
    if (el.verdictTradition) {
      el.verdictTradition.textContent = `${node.tradition} · ${node.place}`;
    }

    /* Comparison Ledger */
    el.userClaimDisplay.innerHTML = '';
    const MAX_CLAIM_LEN = 260;
    if (res.userIdea.length > MAX_CLAIM_LEN && !state.claimExpanded) {
      el.userClaimDisplay.appendChild(document.createTextNode(`“${res.userIdea.slice(0, MAX_CLAIM_LEN).trim()}…” `));
      const moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'inline-gold-btn claim-expand-btn';
      moreBtn.textContent = 'Read full claim';
      moreBtn.addEventListener('click', () => {
        state.claimExpanded = true;
        renderMonographFolio();
      });
      el.userClaimDisplay.appendChild(moreBtn);
    } else {
      el.userClaimDisplay.textContent = `“${res.userIdea}”`;
    }
    el.ancientThesisDisplay.textContent = res.entry.ancientThesis || res.entry.title;

    /* Primary Scripture Centerpiece */
    el.scriptureTitleTop.textContent = `${node.scripture} (${node.language})`;
    el.originalScriptText.textContent = node.originalScript || '';
    el.originalScriptText.dir = node.scriptDir || 'ltr';
    el.originalScriptText.className = `original-script-text ${node.scriptClass || 'script-latin'}`;

    const showTranslit =
      node.transliteration &&
      node.transliteration.replace(/\s+/g, ' ').trim() !== (node.originalScript || '').replace(/\s+/g, ' ').trim();
    el.transliterationText.textContent = showTranslit ? node.transliteration : '';
    el.transliterationText.classList.toggle('hidden', !showTranslit);

    el.translationText.textContent = `“${node.translation}”`;
    el.scriptureProvenance.textContent = node.provenance;
    applyScriptDisplayMode();

    /* Commentary & Unboxed Marginalia */
    el.folioPlateTitle.textContent = res.entry.title;
    el.folioCommentary.textContent = node.commentary;

    if (node.marginalia) {
      el.folioMarginalia.textContent = node.marginalia;
      el.folioMarginaliaBlock.classList.remove('hidden');
    } else {
      el.folioMarginaliaBlock.classList.add('hidden');
    }

    /* Secondary Resonances */
    if (res.related && res.related.length > 0) {
      el.relatedLinks.innerHTML = '';
      res.related.forEach((rel) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'related-link-btn';
        btn.textContent = `${rel.title} (${rel.origin.yearLabel})`;
        btn.addEventListener('click', () => {
          submitIdea(res.userIdea, rel.id);
        });
        el.relatedLinks.appendChild(btn);
      });
      el.relatedBlock.classList.remove('hidden');
    } else {
      el.relatedBlock.classList.add('hidden');
    }

    /* Broad Match Honest Notice */
    const showBroad = res.source === 'archive' && res.confidence === 'broad' && !global.HUMBLER_LIVE.isEnabled();
    el.broadNotice.classList.toggle('hidden', !showBroad);

    /* Book-Leaf Witness Stepper Footer */
    if (el.prevWitnessBtn && el.nextWitnessBtn && el.witnessCounter) {
      el.prevWitnessBtn.disabled = state.activeNodeIdx === 0;
      el.nextWitnessBtn.disabled = state.activeNodeIdx >= nodes.length - 1;
      el.witnessCounter.textContent = `${node.roman} of ${ROMAN[nodes.length] || nodes.length}`;
    }
  }

  function applyScriptDisplayMode() {
    document.querySelectorAll('.script-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.scriptMode === state.scriptMode);
    });

    if (state.scriptMode === 'parallel') {
      el.originalScriptBlock.classList.remove('hidden');
      el.translationText.classList.remove('hidden');
    } else if (state.scriptMode === 'original') {
      el.originalScriptBlock.classList.remove('hidden');
      el.translationText.classList.add('hidden');
    } else {
      el.originalScriptBlock.classList.add('hidden');
      el.translationText.classList.remove('hidden');
    }
  }

  /* ========================================================================
     TOOLTIP (TIMELINE & WORLD MAP MEDALLIONS)
     ======================================================================== */
  function showTooltip(node, event) {
    if (window.innerWidth < 768) return;
    el.ttMeta.textContent = `${node.isOrigin ? 'Oldest Origin' : 'Echo'} · ${node.yearLabel} · ${node.place}`;
    el.ttTitle.textContent = node.thinker;
    el.ttDetail.textContent = node.scripture;
    el.vizTooltip.classList.add('is-visible');
    positionTooltip(event);
  }

  function positionTooltip(event) {
    if (!event || window.innerWidth < 768) return;
    const pad = 16;
    const rect = el.vizTooltip.getBoundingClientRect();
    let left = event.clientX + 16;
    let top = event.clientY - rect.height - 12;

    if (left + rect.width > window.innerWidth - pad) {
      left = event.clientX - rect.width - 16;
    }
    if (top < pad) {
      top = event.clientY + 18;
    }
    el.vizTooltip.style.left = `${Math.max(pad, left)}px`;
    el.vizTooltip.style.top = `${Math.max(pad, top)}px`;
  }

  function hideTooltip() {
    el.vizTooltip.classList.remove('is-visible');
  }

  /* ========================================================================
     INDEX OF ORIGINS & LIVE SCHOLAR DRAWERS
     ======================================================================== */
  function renderIndexList(query) {
    const q = (query || '').trim().toLowerCase();
    const all = global.HUMBLER_MATCHER.getAllChronological();
    const filtered = q
      ? all.filter((item) => {
          const hay = [
            item.title,
            item.domain,
            item.origin.thinker,
            item.origin.scripture,
            item.origin.place,
            item.origin.yearLabel,
            item.specimen
          ]
            .join(' ')
            .toLowerCase();
          return hay.includes(q);
        })
      : all;

    el.indexList.innerHTML = '';
    if (!filtered.length) {
      el.indexList.innerHTML = '<p class="scholar-prose" style="padding-top:16px">No archival plates match that filter.</p>';
      return;
    }

    filtered.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'index-item';
      btn.innerHTML = `
        <div class="index-item-top">
          <span class="index-item-year">${escapeHtml(item.origin.yearLabel)}</span>
          <span class="index-item-domain">${escapeHtml(item.domain)}</span>
        </div>
        <div class="index-item-title">${escapeHtml(item.title)}</div>
        <div class="index-item-meta">${escapeHtml(item.origin.thinker)} &middot; ${escapeHtml(item.origin.scripture)}</div>
      `;
      btn.addEventListener('click', () => {
        el.ideaInput.value = item.specimen;
        autoResizeTextarea();
        submitIdea(item.specimen, item.id);
      });
      el.indexList.appendChild(btn);
    });
  }

  function openIndexDrawer() {
    closeAllDrawers();
    state.indexOpen = true;
    el.drawerBackdrop.classList.remove('hidden');
    el.indexDrawer.classList.add('is-open');
    renderIndexList(el.indexSearchInput.value);
    setTimeout(() => el.indexSearchInput.focus(), 120);
  }

  function openScholarDrawer() {
    closeAllDrawers();
    state.scholarOpen = true;
    el.drawerBackdrop.classList.remove('hidden');
    el.scholarDrawer.classList.add('is-open');
    el.geminiKeyInput.value = global.HUMBLER_LIVE.getApiKey();
    updateScholarStatusUI();
  }

  function closeAllDrawers() {
    state.indexOpen = false;
    state.scholarOpen = false;
    el.drawerBackdrop.classList.add('hidden');
    el.indexDrawer.classList.remove('is-open');
    el.scholarDrawer.classList.remove('is-open');
  }

  function updateScholarStatusUI() {
    const active = global.HUMBLER_LIVE && global.HUMBLER_LIVE.isEnabled();
    el.scholarDot.classList.toggle('hidden', !active);
    const totalRoots = (global.HUMBLER_CANON || []).length;
    if (el.modeIndicator) {
      el.modeIndicator.textContent = active
        ? 'Live Scholar Active (Gemini) · Verified Archive Fallback'
        : 'Verified Archival Canon · 2600 BCE – 397 CE';
    }
    el.scholarStatusMsg.textContent = active
      ? 'Live Scholar is active. Custom philosophical epiphanies will be excavated live via Gemini 2.5 Flash.'
      : `Currently running on the built-in ${totalRoots}-root verified primary archive.`;
  }

  /* ========================================================================
     UTILITIES & EVENT WIRING
     ======================================================================== */
  function autoResizeTextarea() {
    el.ideaInput.style.height = 'auto';
    el.ideaInput.style.height = `${Math.min(220, Math.max(76, el.ideaInput.scrollHeight))}px`;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function wireEvents() {
    el.brandHomeBtn.addEventListener('click', returnToThreshold);
    el.backToThresholdBtn.addEventListener('click', returnToThreshold);

    el.ideaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitIdea(el.ideaInput.value);
    });

    el.ideaInput.addEventListener('input', () => {
      autoResizeTextarea();
      clearThresholdNotice();
    });
    el.ideaInput.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' && !e.shiftKey) || ((e.metaKey || e.ctrlKey) && e.key === 'Enter')) {
        e.preventDefault();
        submitIdea(el.ideaInput.value);
      }
    });

    el.shuffleSpecimensBtn.addEventListener('click', () => {
      state.specimenOffset = (state.specimenOffset + 1) % 12;
      renderSpecimens();
    });

    /* Visualization switcher */
    el.timelineModeBtn.addEventListener('click', () => {
      if (state.vizMode === 'timeline') return;
      state.vizMode = 'timeline';
      hideTooltip();
      renderVisualization();
    });

    el.mapModeBtn.addEventListener('click', () => {
      if (state.vizMode === 'map') return;
      state.vizMode = 'map';
      hideTooltip();
      renderVisualization();
    });

    /* Map zoom buttons */
    if (el.mapZoomInBtn) {
      el.mapZoomInBtn.addEventListener('click', () => {
        global.HUMBLER_VIZ.zoomMapBy(1.35);
      });
    }
    if (el.mapZoomOutBtn) {
      el.mapZoomOutBtn.addEventListener('click', () => {
        global.HUMBLER_VIZ.zoomMapBy(0.74);
      });
    }

    /* Script display toggle */
    document.querySelectorAll('.script-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.scriptMode = btn.dataset.scriptMode;
        applyScriptDisplayMode();
      });
    });

    /* Book-leaf prev/next witness */
    if (el.prevWitnessBtn) {
      el.prevWitnessBtn.addEventListener('click', () => {
        if (state.activeNodeIdx > 0) {
          state.activeNodeIdx -= 1;
          renderResultPlate();
        }
      });
    }

    if (el.nextWitnessBtn) {
      el.nextWitnessBtn.addEventListener('click', () => {
        if (!state.result) return;
        const nodes = global.HUMBLER_VIZ.buildNodes(state.result.entry);
        if (state.activeNodeIdx < nodes.length - 1) {
          state.activeNodeIdx += 1;
          renderResultPlate();
        }
      });
    }

    /* Drawers */
    el.openIndexBtn.addEventListener('click', openIndexDrawer);
    el.closeIndexBtn.addEventListener('click', closeAllDrawers);
    el.openScholarBtn.addEventListener('click', openScholarDrawer);
    el.closeScholarBtn.addEventListener('click', closeAllDrawers);
    el.broadOpenScholarBtn.addEventListener('click', openScholarDrawer);
    el.drawerBackdrop.addEventListener('click', closeAllDrawers);

    el.indexSearchInput.addEventListener('input', (e) => {
      renderIndexList(e.target.value);
    });

    el.scholarKeyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      global.HUMBLER_LIVE.setApiKey(el.geminiKeyInput.value);
      updateScholarStatusUI();
    });

    el.clearKeyBtn.addEventListener('click', () => {
      el.geminiKeyInput.value = '';
      global.HUMBLER_LIVE.setApiKey('');
      updateScholarStatusUI();
    });

    /* Keyboard shortcuts */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.indexOpen || state.scholarOpen) {
          closeAllDrawers();
        }
      } else if (state.view === 'result' && !state.indexOpen && !state.scholarOpen) {
        const tag = document.activeElement && document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        const nodes = state.result ? global.HUMBLER_VIZ.buildNodes(state.result.entry) : [];
        if (e.key === 'ArrowLeft' && state.activeNodeIdx > 0) {
          state.activeNodeIdx -= 1;
          renderResultPlate();
        } else if (e.key === 'ArrowRight' && state.activeNodeIdx < nodes.length - 1) {
          state.activeNodeIdx += 1;
          renderResultPlate();
        }
      }
    });

    /* Responsive re-render on resize */
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state.view === 'landing') {
          global.HUMBLER_VIZ.renderBackdropMap('#backdropSvg');
        } else if (state.view === 'result' && state.result) {
          renderVisualization();
        }
      }, 150);
    });
  }

  function handleInitialQueryParams() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const vizParam = params.get('viz');
      if (vizParam === 'map' || vizParam === 'timeline') {
        state.vizMode = vizParam;
      }
      const q = params.get('q');
      const id = params.get('id');
      if (id) {
        const entry = global.HUMBLER_MATCHER.getEntryById(id);
        if (entry) {
          el.ideaInput.value = q || entry.specimen;
          submitIdea(q || entry.specimen, entry.id, true);
          return;
        }
      }
      if (q && q.trim()) {
        el.ideaInput.value = q.trim();
        submitIdea(q.trim(), null, true);
      }
    } catch (_) {
      /* ignore URLSearchParams errors */
    }
  }

  function init() {
    bindDom();
    const total = (global.HUMBLER_CANON || []).length;
    if (el.canonCount) {
      el.canonCount.textContent = String(total);
    }
    renderSpecimens();
    updateScholarStatusUI();
    wireEvents();
    global.HUMBLER_VIZ.renderBackdropMap('#backdropSvg');
    handleInitialQueryParams();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
