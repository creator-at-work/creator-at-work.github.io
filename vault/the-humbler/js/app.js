/* ==========================================================================
   THE HUMBLER — Mobile-First Application Controller
   Serene threshold (3 specimens), Verdict + Sculpted Lineage Arc + Actual
   Primary Scripture immediately above the fold on mobile, and clean drawers.
   ========================================================================== */

(function (global) {
  'use strict';

  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  const FEATURED_SPECIMEN_IDS = [
    'expectation-suffering',
    'imagined-anxiety',
    'wu-wei'
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

  const el = {};

  function bindDom() {
    const ids = [
      'brandHomeBtn', 'backToThresholdBtn', 'bottomNewBtn',
      'openIndexBtn', 'openScholarBtn', 'canonCount', 'scholarDot',
      'landingView', 'resultView', 'ideaForm', 'ideaInput', 'humbleBtn', 'modeIndicator', 'thresholdNotice',
      'specimensList', 'shuffleSpecimensBtn', 'excavationOverlay', 'excavationTitle', 'excavationSub',
      'timelineModeBtn', 'mapModeBtn', 'stageCaptionLeft',
      'vizWrap', 'lineageSvg', 'mapZoomControls', 'mapZoomInBtn', 'mapZoomOutBtn',
      'folioRankLabel', 'verdictYears', 'verdictThinker', 'folioPlaceTop',
      'originalScriptBlock', 'originalScriptText', 'transliterationText', 'translationText', 'scriptureProvenance',
      'userClaimDisplay', 'folioPlateTitle', 'folioCommentary', 'folioMarginaliaBlock', 'folioMarginalia',
      'relatedBlock', 'relatedLinks', 'broadNotice', 'broadOpenScholarBtn',
      'vizTooltip', 'ttMeta', 'ttTitle', 'ttDetail',
      'drawerBackdrop', 'indexDrawer', 'indexDrawerHeading', 'closeIndexBtn', 'indexSearchInput', 'indexList',
      'scholarDrawer', 'closeScholarBtn', 'scholarKeyForm', 'geminiKeyInput', 'clearKeyBtn', 'scholarStatusMsg'
    ];
    ids.forEach((id) => {
      el[id] = document.getElementById(id);
    });
  }

  /* ========================================================================
     3 QUIET SPECIMENS (THRESHOLD)
     ======================================================================== */
  function getSpecimenBatch() {
    const all = global.HUMBLER_MATCHER.getAllChronological();
    if (state.specimenOffset === 0) {
      return FEATURED_SPECIMEN_IDS
        .map((id) => global.HUMBLER_MATCHER.getEntryById(id))
        .filter(Boolean);
    }
    const pool = all.filter((item) => !FEATURED_SPECIMEN_IDS.includes(item.id));
    const start = ((state.specimenOffset - 1) * 3) % Math.max(1, pool.length);
    const batch = [];
    for (let i = 0; i < 3 && i < pool.length; i++) {
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
      btn.innerHTML = `<span class="specimen-num">${ROMAN[idx + 1] || idx + 1}</span><span>“${escapeHtml(entry.specimen)}”</span>`;
      btn.addEventListener('click', () => {
        el.ideaInput.value = entry.specimen;
        autoResizeTextarea();
        submitIdea(entry.specimen, entry.id);
      });
      el.specimensList.appendChild(btn);
    });
  }

  /* ========================================================================
     INLINE ARCHIVAL NOTICE & SUBMISSION
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
      el.thresholdNotice.appendChild(document.createTextNode(' '));
      actions.forEach((act, idx) => {
        if (idx > 0) {
          const sep = document.createElement('span');
          sep.className = 'related-sep';
          sep.textContent = '·';
          el.thresholdNotice.appendChild(sep);
        }
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'inline-gold-btn';
        btn.textContent = act.label;
        btn.addEventListener('click', act.onClick);
        el.thresholdNotice.appendChild(btn);
      });
    }
    el.thresholdNotice.classList.remove('hidden');
  }

  function clearThresholdNotice() {
    el.thresholdNotice.classList.add('hidden');
    el.thresholdNotice.innerHTML = '';
  }

  async function submitIdea(rawText, forceArchiveId) {
    const text = String(rawText || '').trim();
    clearThresholdNotice();

    if (!text) {
      showThresholdNotice(
        'Empty manuscript',
        'Write a philosophical epiphany before consulting the archive.'
      );
      el.ideaInput.focus();
      return;
    }

    const reqId = ++state.requestSeq;
    const useLive = !forceArchiveId && global.HUMBLER_LIVE && global.HUMBLER_LIVE.isEnabled();
    const preCheck = !forceArchiveId ? global.HUMBLER_MATCHER.matchIdea(text) : null;

    if (preCheck && preCheck.reason === 'empty_or_symbols') {
      showThresholdNotice(
        'Unreadable',
        'Use words rather than symbols alone so the archive can trace your idea.'
      );
      el.ideaInput.focus();
      return;
    }

    if (useLive) {
      showExcavation('Consulting Live Scholar…', 'Excavating oldest primary texts via Gemini');
      try {
        const liveResult = await global.HUMBLER_LIVE.excavate(text);
        if (reqId !== state.requestSeq) return;
        hideExcavation();
        openResult(liveResult);
        return;
      } catch (err) {
        if (reqId !== state.requestSeq) return;
        console.warn('Live Scholar fallback to verified archive:', err);
        showExcavation('Returning to Archive…', 'Matching against the verified canon');
        await wait(360);
        if (reqId !== state.requestSeq) return;
      }
    } else if (!forceArchiveId && preCheck && preCheck.unmatched) {
      const totalRoots = (global.HUMBLER_CANON || []).length;
      const actions = [
        { label: 'Browse Index', onClick: openIndexDrawer },
        { label: 'Live Scholar', onClick: openScholarDrawer }
      ];
      if (preCheck.entry && preCheck.score >= 5) {
        actions.unshift({
          label: `Closest plate (${preCheck.entry.title})`,
          onClick: () => submitIdea(text, preCheck.entry.id)
        });
      }
      showThresholdNotice(
        'No clear echo',
        `Built for philosophical epiphanies—our ${totalRoots}-root canon found no close match. Try rephrasing, or:`,
        actions
      );
      return;
    } else {
      showExcavation('Excavating…', 'Tracing 4,600 years of surviving texts');
      await wait(300);
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
        'No clear echo',
        'No matching primary source was found in the local archive.',
        [
          { label: 'Browse Index', onClick: openIndexDrawer },
          { label: 'Live Scholar', onClick: openScholarDrawer }
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
    el.brandHomeBtn.classList.add('hidden');
    el.backToThresholdBtn.classList.remove('hidden');
    el.landingView.classList.add('hidden');
    el.resultView.classList.remove('hidden');

    closeAllDrawers();
    renderResultPlate();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function returnToThreshold() {
    state.view = 'landing';
    hideTooltip();
    document.body.classList.remove('is-result');
    document.body.classList.add('is-landing');
    el.backToThresholdBtn.classList.add('hidden');
    el.brandHomeBtn.classList.remove('hidden');
    el.resultView.classList.add('hidden');
    el.landingView.classList.remove('hidden');
    global.HUMBLER_VIZ.renderBackdropMap('#backdropSvg');
    if (window.innerWidth >= 640) {
      el.ideaInput.focus();
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ========================================================================
     RENDER HUMBLING PLATE
     ======================================================================== */
  function renderResultPlate() {
    if (!state.result) return;
    renderVisualization();
    renderMonographFolio();
  }

  function renderVisualization() {
    if (!state.result) return;
    const nodes = global.HUMBLER_VIZ.buildNodes(state.result.entry);

    el.timelineModeBtn.classList.toggle('is-active', state.vizMode === 'timeline');
    el.timelineModeBtn.setAttribute('aria-selected', String(state.vizMode === 'timeline'));
    el.mapModeBtn.classList.toggle('is-active', state.vizMode === 'map');
    el.mapModeBtn.setAttribute('aria-selected', String(state.vizMode === 'map'));
    el.vizWrap.classList.toggle('is-map', state.vizMode === 'map');
    el.mapZoomControls.classList.toggle('hidden', state.vizMode !== 'map');

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
      el.stageCaptionLeft.textContent = `${nodes.length} ${nodes.length === 1 ? 'witness' : 'witnesses'} before you · Tap to switch`;
      global.HUMBLER_VIZ.renderTimeline('#lineageSvg', state.result, state.activeNodeIdx, callbacks);
    } else {
      el.stageCaptionLeft.textContent = 'Geographic origin · Tap pins or zoom';
      global.HUMBLER_VIZ.renderWorldOriginMap('#lineageSvg', state.result, state.activeNodeIdx, callbacks);
    }
  }

  function renderMonographFolio() {
    const res = state.result;
    const nodes = global.HUMBLER_VIZ.buildNodes(res.entry);
    const node = nodes[state.activeNodeIdx] || nodes[0];
    const isOrigin = state.activeNodeIdx === 0;
    const yearsLate = global.HUMBLER_MATCHER.computeYearsLate(node.year);

    /* 1. Immediate Verdict Hero */
    el.folioRankLabel.textContent = isOrigin
      ? `Oldest Origin · ${node.yearLabel}`
      : `Echo ${node.roman} of ${ROMAN[nodes.length] || nodes.length} · ${node.yearLabel}`;
    el.folioRankLabel.classList.toggle('is-echo', !isOrigin);

    el.verdictYears.textContent = `${yearsLate.toLocaleString()} years late.`;
    el.verdictThinker.textContent = node.thinker;
    el.folioPlaceTop.textContent = node.region ? `${node.place}, ${node.region}` : node.place;

    /* 2. Primary Scripture in Original Form */
    el.originalScriptText.textContent = node.originalScript || '';
    el.originalScriptText.dir = node.scriptDir || 'ltr';
    el.originalScriptText.className = `original-script-text ${node.scriptClass || 'script-latin'}`;

    const showTranslit =
      node.transliteration &&
      node.transliteration.replace(/\s+/g, ' ').trim() !== (node.originalScript || '').replace(/\s+/g, ' ').trim();
    el.transliterationText.textContent = showTranslit ? node.transliteration : '';
    el.transliterationText.classList.toggle('hidden', !showTranslit);

    el.translationText.textContent = `“${node.translation}”`;
    el.scriptureProvenance.textContent = `${node.scripture} · ${node.language}`;
    applyScriptDisplayMode();

    /* 3. Quiet Reading Depth Below the Fold */
    el.userClaimDisplay.innerHTML = '';
    const MAX_CLAIM_LEN = 220;
    if (res.userIdea.length > MAX_CLAIM_LEN && !state.claimExpanded) {
      el.userClaimDisplay.appendChild(document.createTextNode(`“${res.userIdea.slice(0, MAX_CLAIM_LEN).trim()}…”`));
      const moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'inline-gold-btn claim-expand-btn';
      moreBtn.textContent = 'Read all';
      moreBtn.addEventListener('click', () => {
        state.claimExpanded = true;
        renderMonographFolio();
      });
      el.userClaimDisplay.appendChild(moreBtn);
    } else {
      el.userClaimDisplay.textContent = `“${res.userIdea}”`;
    }

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
      res.related.forEach((rel, idx) => {
        if (idx > 0) {
          const sep = document.createElement('span');
          sep.className = 'related-sep';
          sep.textContent = '·';
          el.relatedLinks.appendChild(sep);
        }
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

    const showBroad = res.source === 'archive' && res.confidence === 'broad' && !global.HUMBLER_LIVE.isEnabled();
    el.broadNotice.classList.toggle('hidden', !showBroad);
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
     TOOLTIP (DESKTOP ONLY)
     ======================================================================== */
  function showTooltip(node, event) {
    el.ttMeta.textContent = `${node.isOrigin ? 'Oldest Origin' : 'Echo'} · ${node.yearLabel} · ${node.place}`;
    el.ttTitle.textContent = node.thinker;
    el.ttDetail.textContent = node.scripture;
    el.vizTooltip.classList.add('is-visible');
    positionTooltip(event);
  }

  function positionTooltip(event) {
    if (!event) return;
    const pad = 16;
    const rect = el.vizTooltip.getBoundingClientRect();
    let left = event.clientX + 16;
    let top = event.clientY - rect.height - 12;
    if (left + rect.width > window.innerWidth - pad) left = event.clientX - rect.width - 16;
    if (top < pad) top = event.clientY + 18;
    el.vizTooltip.style.left = `${Math.max(pad, left)}px`;
    el.vizTooltip.style.top = `${Math.max(pad, top)}px`;
  }

  function hideTooltip() {
    el.vizTooltip.classList.remove('is-visible');
  }

  /* ========================================================================
     DRAWERS
     ======================================================================== */
  function renderIndexList(query) {
    const q = (query || '').trim().toLowerCase();
    const all = global.HUMBLER_MATCHER.getAllChronological();
    const filtered = q
      ? all.filter((item) => {
          const hay = [
            item.title, item.domain, item.origin.thinker,
            item.origin.scripture, item.origin.place, item.origin.yearLabel, item.specimen
          ].join(' ').toLowerCase();
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
    document.body.classList.add('drawer-open');
    el.drawerBackdrop.classList.remove('hidden');
    el.indexDrawer.classList.add('is-open');
    renderIndexList(el.indexSearchInput.value);
    if (window.innerWidth >= 640) {
      setTimeout(() => el.indexSearchInput.focus(), 120);
    }
  }

  function openScholarDrawer() {
    closeAllDrawers();
    state.scholarOpen = true;
    document.body.classList.add('drawer-open');
    el.drawerBackdrop.classList.remove('hidden');
    el.scholarDrawer.classList.add('is-open');
    el.geminiKeyInput.value = global.HUMBLER_LIVE.getApiKey();
    updateScholarStatusUI();
  }

  function closeAllDrawers() {
    state.indexOpen = false;
    state.scholarOpen = false;
    document.body.classList.remove('drawer-open');
    el.drawerBackdrop.classList.add('hidden');
    el.indexDrawer.classList.remove('is-open');
    el.scholarDrawer.classList.remove('is-open');
  }

  function updateScholarStatusUI() {
    const active = global.HUMBLER_LIVE && global.HUMBLER_LIVE.isEnabled();
    const totalRoots = (global.HUMBLER_CANON || []).length;
    el.scholarDot.classList.toggle('hidden', !active);
    el.modeIndicator.textContent = active
      ? 'Live Scholar active · Gemini'
      : `${totalRoots} verified ancient roots · 2600 BCE–397 CE`;
    el.scholarStatusMsg.textContent = active
      ? 'Live Scholar is active. Custom philosophical epiphanies will be excavated via Gemini 2.5 Flash.'
      : `Using the built-in ${totalRoots}-root verified primary archive.`;
  }

  /* ========================================================================
     UTILITIES & EVENTS
     ======================================================================== */
  function autoResizeTextarea() {
    el.ideaInput.style.height = 'auto';
    el.ideaInput.style.height = `${Math.min(200, Math.max(76, el.ideaInput.scrollHeight))}px`;
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
    el.bottomNewBtn.addEventListener('click', returnToThreshold);

    el.ideaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitIdea(el.ideaInput.value);
    });

    el.ideaInput.addEventListener('input', () => {
      autoResizeTextarea();
      clearThresholdNotice();
      if (el.specimensList && el.specimensList.parentElement) {
        el.specimensList.parentElement.classList.toggle('is-dimmed', el.ideaInput.value.trim().length > 0);
      }
    });

    el.ideaInput.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' && !e.shiftKey) || ((e.metaKey || e.ctrlKey) && e.key === 'Enter')) {
        e.preventDefault();
        submitIdea(el.ideaInput.value);
      }
    });

    el.shuffleSpecimensBtn.addEventListener('click', () => {
      const total = (global.HUMBLER_CANON || []).length;
      const pages = Math.max(1, Math.ceil((total - FEATURED_SPECIMEN_IDS.length) / 3) + 1);
      state.specimenOffset = (state.specimenOffset + 1) % pages;
      renderSpecimens();
    });

    el.mapZoomInBtn.addEventListener('click', () => global.HUMBLER_VIZ.zoomMapBy(1.38));
    el.mapZoomOutBtn.addEventListener('click', () => global.HUMBLER_VIZ.zoomMapBy(0.72));

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

    document.querySelectorAll('.script-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.scriptMode = btn.dataset.scriptMode;
        applyScriptDisplayMode();
      });
    });

    el.openIndexBtn.addEventListener('click', openIndexDrawer);
    el.closeIndexBtn.addEventListener('click', closeAllDrawers);
    el.openScholarBtn.addEventListener('click', openScholarDrawer);
    el.closeScholarBtn.addEventListener('click', closeAllDrawers);
    el.broadOpenScholarBtn.addEventListener('click', openScholarDrawer);
    el.drawerBackdrop.addEventListener('click', closeAllDrawers);

    el.indexSearchInput.addEventListener('input', (e) => renderIndexList(e.target.value));

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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && (state.indexOpen || state.scholarOpen)) {
        closeAllDrawers();
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

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state.view === 'landing') {
          global.HUMBLER_VIZ.renderBackdropMap('#backdropSvg');
        } else if (state.view === 'result' && state.result) {
          renderVisualization();
        }
      }, 160);
    });
  }

  function init() {
    bindDom();
    const total = (global.HUMBLER_CANON || []).length;
    el.canonCount.textContent = String(total);
    if (el.indexDrawerHeading) el.indexDrawerHeading.textContent = `${total} Ancient Roots`;
    renderSpecimens();
    updateScholarStatusUI();
    wireEvents();
    global.HUMBLER_VIZ.renderBackdropMap('#backdropSvg');

    try {
      const params = new URLSearchParams(window.location.search);
      const q = (params.get('q') || '').trim();
      const viz = params.get('viz');
      if (viz === 'map' || viz === 'timeline') state.vizMode = viz;
      if (q) {
        el.ideaInput.value = q;
        autoResizeTextarea();
        const direct = global.HUMBLER_MATCHER.matchIdea(q);
        if (direct && !direct.unmatched && direct.entry) {
          openResult(direct);
        }
      }
    } catch (_) {
      /* ignore */
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
