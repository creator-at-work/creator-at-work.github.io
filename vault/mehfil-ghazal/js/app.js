/**
 * Mehfil — Night Ghazals by Lamplight
 *
 * Serene, uncluttered single-room listening experience powered by:
 *  - 79 verified embeddable ghazals + strict ghazal-only YouTube discovery
 *  - Five poetic moods (Bireh, Naraazgi, Izhaar, Tanhai, Maikada)
 *  - Persistent 24-hour zero-repetition Radio (single stream, pause/resume, stop/start)
 *  - Gentle Sleep Timer with fade-out & "After this ghazal ends" mode
 */
(function () {
  const INITIAL_VISIBLE = 14;

  const state = {
    moods: [],
    tracks: [],
    trackById: new Map(),
    ledger: [],
    protectedKeys: new Set(),
    radioStatus: {
      total_catalog_tracks: 0,
      protected_unique_ghazals: 0,
      eligible_remaining: 0,
    },

    // Room browsing state
    selectedMood: null, // null = All / Evening selection, or 'bireh' | 'naraazgi' | 'izhaar' | 'tanhai' | 'maikada'
    showAllTracks: false,
    searchQuery: '',
    searchLoading: false,
    searchResults: null, // null when not searching; array when searching

    // Playback & Radio state
    currentTrack: null,
    playbackList: [],
    playbackIndex: -1,
    sessionPlayedStack: [],
    wasExplicitlyStopped: false,
    lastRadioConfig: { mode: 'all', mood: '' },
    videoVisible: false,

    radio: {
      active: false,
      sessionId: '',
      mode: 'all',
      mood: '',
      seedVideoId: '',
      queue: [],
      exhausted: false,
      notice: '',
    },
    radioRequestSeq: 0,
    unplayableRetries: 0,

    // Tonight's Evening Drawer state
    drawerOpen: false,
    drawerTab: 'queue', // 'queue' | 'heard' | 'note'
    isSeeking: false,
  };

  const dom = {};
  let player = null;
  let sleepTimer = null;

  // =========================================================================
  // Helpers
  // =========================================================================

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDuration(sec) {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  function formatCooldown(ms) {
    const totalMin = Math.max(1, Math.ceil((Number(ms) || 0) / 60000));
    const hrs = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  }

  function moodById(id) {
    return state.moods.find((m) => m.id === id) || null;
  }

  function moodShortWord(moodObj) {
    if (!moodObj || !moodObj.subtitle) return '';
    return moodObj.subtitle.split('&')[0].trim();
  }

  async function apiGet(url) {
    if (window.MEHFIL_STATIC_ENGINE) {
      return window.MEHFIL_STATIC_ENGINE.get(url);
    }
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await resp.json().catch(() => ({}));
    return { ok: resp.ok, status: resp.status, data };
  }

  async function apiPost(url, payload = {}) {
    if (window.MEHFIL_STATIC_ENGINE) {
      return window.MEHFIL_STATIC_ENGINE.post(url, payload);
    }
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await resp.json().catch(() => ({}));
    return { ok: resp.ok, status: resp.status, data };
  }

  let whisperTimeout = null;
  function showWhisper(text, { gentle = false, autoFadeMs = 0 } = {}) {
    clearTimeout(whisperTimeout);
    dom.whisperText.textContent = text;
    dom.whisperNotice.classList.toggle('is-gentle-stop', Boolean(gentle));
    dom.whisperNotice.classList.remove('hidden');
    if (autoFadeMs > 0) {
      whisperTimeout = setTimeout(hideWhisper, autoFadeMs);
    }
  }

  function hideWhisper() {
    clearTimeout(whisperTimeout);
    dom.whisperNotice.classList.add('hidden');
  }

  // =========================================================================
  // Data Sync
  // =========================================================================

  function indexTracks(tracks) {
    state.tracks = tracks;
    state.trackById.clear();
    for (const t of tracks) {
      state.trackById.set(t.video_id, t);
    }
  }

  function syncLedger(statusObj) {
    if (!statusObj) return;
    state.radioStatus = statusObj;
    state.ledger = statusObj.ledger || [];
    state.protectedKeys = new Set(state.ledger.map((item) => item.canonical_key));
    const count = statusObj.protected_unique_ghazals || 0;
    if (count > 0) {
      dom.heardCountDot.textContent = String(count);
      dom.heardCountDot.classList.remove('hidden');
    } else {
      dom.heardCountDot.classList.add('hidden');
    }
    if (state.drawerOpen) renderDrawerBody();
  }

  async function refreshLedger() {
    const res = await apiGet('/api/radio/ledger');
    if (res.ok) syncLedger(res.data);
  }

  async function bootstrap() {
    const res = await apiGet('/api/bootstrap');
    if (!res.ok) {
      showWhisper('The mehfil room could not be reached. Please make sure server.py is running.');
      return;
    }
    state.moods = res.data.moods || [];
    indexTracks(res.data.tracks || []);
    syncLedger(res.data.radio_status);

    renderMoodRibbon();
    renderRepertoire();
  }

  // =========================================================================
  // Hearth & Stage Rendering
  // =========================================================================

  function renderHearth() {
    const tr = state.currentTrack;
    if (!tr || state.wasExplicitlyStopped) {
      dom.hearthWelcome.classList.remove('hidden');
      dom.hearthPlaying.classList.add('hidden');
      if (state.videoVisible) setStageVisible(false);
      return;
    }

    dom.hearthWelcome.classList.add('hidden');
    dom.hearthPlaying.classList.remove('hidden');

    if (state.radio.active) {
      const m = moodById(state.radio.mood);
      dom.hearthModeLine.textContent =
        state.radio.mode === 'mood' && m ? `${m.name} Radio` : 'Evening Radio';
    } else {
      const m = moodById(tr.mood);
      dom.hearthModeLine.textContent = m ? `${m.name} · ${moodShortWord(m)}` : 'Now Playing';
    }

    if (tr.matla) {
      dom.hearthMatla.textContent = `“${tr.matla}”`;
      dom.hearthTranslation.textContent = tr.matla_translation || '';
      dom.hearthTranslation.classList.toggle('hidden', !tr.matla_translation);
    } else {
      dom.hearthMatla.textContent = tr.title;
      dom.hearthTranslation.textContent = '';
      dom.hearthTranslation.classList.add('hidden');
    }

    const creditParts = [`<strong>${esc(tr.title)}</strong>`, esc(tr.artist)];
    if (tr.poet) creditParts.push(esc(tr.poet));
    dom.hearthTitleLine.innerHTML = creditParts.join(' &nbsp;&middot;&nbsp; ');
  }

  function setStageVisible(visible) {
    state.videoVisible = Boolean(visible);
    dom.stageContainer.classList.toggle('is-visible', state.videoVisible);
    dom.stageContainer.classList.toggle('is-ambient', !state.videoVisible);
    dom.toggleVideoBtn.textContent = state.videoVisible ? 'Hide video' : 'Watch video';
  }

  // =========================================================================
  // Moods Ribbon & Airy Ghazal List
  // =========================================================================

  function renderMoodRibbon() {
    dom.moodRibbon.innerHTML = state.moods
      .map((m) => {
        const isSel = state.selectedMood === m.id && !state.searchQuery;
        const isRadioMood = state.radio.active && state.radio.mode === 'mood' && state.radio.mood === m.id;
        return `
          <button type="button" class="mood-item ${isSel ? 'is-selected' : ''}" data-mood-id="${esc(m.id)}">
            ${isRadioMood ? '<span class="mood-item-radio-dot" aria-hidden="true"></span>' : ''}
            <span class="mood-item-name">${esc(m.name)}</span>
            <span class="mood-item-sub">${esc(moodShortWord(m))}</span>
          </button>`;
      })
      .join('');

    dom.moodRibbon.querySelectorAll('[data-mood-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.currentTarget.blur();
        const mid = btn.dataset.moodId;
        clearSearchSilently();
        state.selectedMood = state.selectedMood === mid ? null : mid;
        state.showAllTracks = false;
        renderMoodRibbon();
        renderRepertoire();
      });
    });

    // Update mood context bar softly
    const activeMood = state.selectedMood && !state.searchQuery ? moodById(state.selectedMood) : null;
    if (activeMood) {
      dom.moodContextTitle.textContent = activeMood.name;
      dom.moodContextScript.textContent = activeMood.script;
      dom.moodContextDesc.textContent = activeMood.description;
      dom.moodRadioBtnLabel.textContent = `Play ${activeMood.name} Radio`;
      dom.moodContextBar.classList.remove('hidden');
    } else {
      dom.moodContextBar.classList.add('hidden');
    }
  }

  function getDisplayedTracks() {
    if (state.searchResults !== null) {
      return state.searchResults;
    }
    if (state.selectedMood) {
      const primary = state.tracks.filter((t) => t.mood === state.selectedMood);
      const secondary = state.tracks.filter(
        (t) => t.mood !== state.selectedMood && t.secondary_mood === state.selectedMood
      );
      return [...primary, ...secondary];
    }
    // Curated balanced evening selection across moods before expanding all
    if (!state.showAllTracks) {
      const byMood = {};
      for (const m of state.moods) {
        byMood[m.id] = state.tracks.filter((t) => t.mood === m.id);
      }
      const woven = [];
      let round = 0;
      while (woven.length < INITIAL_VISIBLE && round < 10) {
        for (const m of state.moods) {
          const item = (byMood[m.id] || [])[round];
          if (item) woven.push(item);
          if (woven.length >= INITIAL_VISIBLE) break;
        }
        round++;
      }
      return woven;
    }
    return state.tracks;
  }

  function renderRepertoire() {
    const tracks = getDisplayedTracks();

    if (state.searchResults !== null) {
      dom.repertoireHeading.textContent = state.searchLoading
        ? `Searching for “${state.searchQuery}”…`
        : `“${state.searchQuery}”`;
      dom.clearFilterBtn.textContent = 'Back';
      dom.clearFilterBtn.classList.remove('hidden');
      dom.showMoreWrap.classList.add('hidden');
    } else if (state.selectedMood) {
      const m = moodById(state.selectedMood);
      dom.repertoireHeading.textContent = m ? m.name : 'Ghazals';
      dom.clearFilterBtn.textContent = 'All moods';
      dom.clearFilterBtn.classList.remove('hidden');
      dom.showMoreWrap.classList.add('hidden');
    } else {
      dom.repertoireHeading.textContent = state.showAllTracks
        ? `All ghazals (${state.tracks.length})`
        : 'Start listening';
      dom.clearFilterBtn.classList.add('hidden');
      const hasMore = !state.showAllTracks && state.tracks.length > INITIAL_VISIBLE;
      dom.showMoreWrap.classList.toggle('hidden', !hasMore);
      if (hasMore) {
        dom.showMoreBtn.textContent = `Show all ${state.tracks.length} ghazals`;
      }
    }

    if (state.searchLoading) {
      dom.ghazalList.innerHTML = `<p class="empty-whisper">Searching YouTube for original recordings…</p>`;
      return;
    }

    if (!tracks.length) {
      dom.ghazalList.innerHTML = `<p class="empty-whisper">Nothing found locally. Press Enter or click “More on YouTube” to search original recordings.</p>`;
      return;
    }

    const activeId =
      state.currentTrack && !state.wasExplicitlyStopped ? state.currentTrack.video_id : '';

    dom.ghazalList.innerHTML = tracks
      .map((t) => {
        const isPlaying = t.video_id === activeId;
        const metaParts = [t.artist];
        if (t.poet) metaParts.push(t.poet);
        return `
          <div class="ghazal-row ${isPlaying ? 'is-playing' : ''}" data-vid="${esc(t.video_id)}" tabindex="0" role="button" aria-label="Play ${esc(t.title)} by ${esc(t.artist)}">
            <div class="ghazal-left">
              <span class="ghazal-marker" aria-hidden="true">${isPlaying ? '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" style="display:inline-block;vertical-align:middle"><polygon points="4,0.4 7.6,4 4,7.6 0.4,4" fill="currentColor"/></svg>' : '<svg width="8" height="9" viewBox="0 0 9 10" fill="none" style="display:inline-block;vertical-align:middle"><polygon points="1,0.5 8.5,5 1,9.5" fill="currentColor"/></svg>'}</span>
              <div class="ghazal-info">
                <div class="ghazal-title">${esc(t.title)}</div>
                <div class="ghazal-meta">${esc(metaParts.join('  ·  '))}</div>
              </div>
            </div>
            <div class="ghazal-right">
              <button type="button" class="row-radio-link" data-seed-vid="${esc(t.video_id)}" title="Begin repeat-free radio from this ghazal">
                Radio
              </button>
              <span class="ghazal-dur">${formatDuration(t.duration_sec)}</span>
            </div>
          </div>`;
      })
      .join('');

    const byId = new Map(tracks.map((t) => [t.video_id, t]));
    dom.ghazalList.querySelectorAll('.ghazal-row').forEach((row) => {
      const playIt = () => {
        const tr = byId.get(row.dataset.vid) || state.trackById.get(row.dataset.vid);
        if (tr) playManualTrack(tr, tracks);
      };
      row.addEventListener('click', (e) => {
        if (e.target.closest('[data-seed-vid]')) return;
        row.blur();
        playIt();
      });
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playIt();
        }
      });
    });

    dom.ghazalList.querySelectorAll('[data-seed-vid]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.blur();
        startRadio({ mode: 'seed', seedVideoId: btn.dataset.seedVid });
      });
    });
  }

  function highlightActiveRows() {
    const activeId =
      state.currentTrack && !state.wasExplicitlyStopped ? state.currentTrack.video_id : '';
    dom.ghazalList.querySelectorAll('.ghazal-row').forEach((row) => {
      const playing = row.dataset.vid === activeId;
      row.classList.toggle('is-playing', playing);
      const marker = row.querySelector('.ghazal-marker');
      if (marker) marker.innerHTML = playing ? '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" style="display:inline-block;vertical-align:middle"><polygon points="4,0.4 7.6,4 4,7.6 0.4,4" fill="currentColor"/></svg>' : '<svg width="8" height="9" viewBox="0 0 9 10" fill="none" style="display:inline-block;vertical-align:middle"><polygon points="1,0.5 8.5,5 1,9.5" fill="currentColor"/></svg>';
    });
  }

  // =========================================================================
  // Tonight's Evening Drawer (Tucked away until requested)
  // =========================================================================

  function setDrawerOpen(open) {
    state.drawerOpen = Boolean(open);
    dom.eveningDrawer.classList.toggle('is-open', state.drawerOpen);
    dom.eveningBackdrop.classList.toggle('hidden', !state.drawerOpen);
    if (state.drawerOpen) {
      refreshLedger();
      renderDrawerBody();
    }
  }

  function setDrawerTab(tab) {
    state.drawerTab = tab;
    document.querySelectorAll('[data-drawer-tab]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.drawerTab === tab);
    });
    renderDrawerBody();
  }

  function renderDrawerBody() {
    if (state.drawerTab === 'queue') {
      if (state.radio.active && state.radio.queue.length > 0) {
        const m = moodById(state.radio.mood);
        const modeDesc =
          state.radio.mode === 'mood' && m ? `${m.name} Radio` : 'Radio';
        dom.drawerBody.innerHTML = `
          <p class="drawer-lead">${esc(modeDesc)} — all unplayed in the last 24 hours.</p>
          ${state.radio.queue
            .map(
              (q) => `
            <button type="button" class="drawer-row drawer-row-btn" data-q-vid="${esc(q.video_id)}">
              <div>
                <span class="drawer-row-title">${esc(q.title)}</span>
                <span class="drawer-row-sub">${esc(q.artist)}${q.poet ? ' · ' + esc(q.poet) : ''}</span>
              </div>
              <span class="drawer-row-right">${formatDuration(q.duration_sec)}</span>
            </button>`
            )
            .join('')}
        `;
        dom.drawerBody.querySelectorAll('[data-q-vid]').forEach((btn) => {
          btn.addEventListener('click', () => {
            startRadio({ mode: 'seed', seedVideoId: btn.dataset.qVid });
          });
        });
      } else {
        dom.drawerBody.innerHTML = `
          <p class="empty-whisper">Radio is off. Start it anytime for a repeat-free queue.</p>
          <div class="drawer-foot-action">
            <button id="drawerStartRadioBtn" type="button" class="btn-subtle-gold"><svg width="8" height="9" viewBox="0 0 9 10" fill="none" style="display:inline-block;vertical-align:-1px;margin-right:4px"><polygon points="1,0.5 8.5,5 1,9.5" fill="currentColor"/></svg>Start Radio</button>
          </div>
        `;
        document.getElementById('drawerStartRadioBtn')?.addEventListener('click', () => {
          startRadio({ mode: 'all' });
        });
      }
      return;
    }

    if (state.drawerTab === 'heard') {
      if (!state.ledger.length) {
        dom.drawerBody.innerHTML = `
          <p class="empty-whisper">Nothing played yet today. Anything you hear stays out of Radio for 24 hours.</p>
        `;
      } else {
        dom.drawerBody.innerHTML = `
          <p class="drawer-lead">Won’t repeat in Radio for 24 hours — even if you pause, stop, or come back later today.</p>
          ${state.ledger
            .map(
              (item) => `
            <div class="drawer-row">
              <div>
                <span class="drawer-row-title">${esc(item.title || item.canonical_key)}</span>
                <span class="drawer-row-sub">${esc(item.artist || '')}</span>
              </div>
              <span class="drawer-row-right">${formatCooldown(item.cooldown_remaining_ms)}</span>
            </div>`
            )
            .join('')}
          <div class="drawer-foot-action">
            <button id="resetMemoryBtn" type="button" class="quiet-link">Reset today’s history</button>
          </div>
        `;
        document.getElementById('resetMemoryBtn')?.addEventListener('click', async () => {
          const res = await apiPost('/api/radio/ledger/reset');
          if (res.ok) {
            syncLedger(res.data.radio_status);
            showWhisper('Today’s history cleared.', { gentle: true, autoFadeMs: 4000 });
          }
        });
      }
      return;
    }

    // 'note' tab
    const tr = state.currentTrack;
    if (!tr) {
      dom.drawerBody.innerHTML = `<p class="empty-whisper">Play a ghazal to see details here.</p>`;
      return;
    }
    const m = moodById(tr.mood);
    dom.drawerBody.innerHTML = `
      ${tr.matla ? `<p class="drawer-note-couplet">“${esc(tr.matla)}”</p>` : ''}
      ${tr.matla_translation ? `<p class="drawer-note-trans">${esc(tr.matla_translation)}</p>` : ''}
      <div class="drawer-row">
        <span class="drawer-row-sub">Vocalist</span>
        <span class="drawer-row-title">${esc(tr.artist)}</span>
      </div>
      <div class="drawer-row">
        <span class="drawer-row-sub">Poet</span>
        <span class="drawer-row-title">${esc(tr.poet || 'Classical / Traditional')}</span>
      </div>
      <div class="drawer-row">
        <span class="drawer-row-sub">Mood</span>
        <span class="drawer-row-title">${esc(m ? m.name : tr.mood)}</span>
      </div>
      ${
        tr.year_or_era
          ? `<div class="drawer-row"><span class="drawer-row-sub">Era</span><span class="drawer-row-title">${esc(tr.year_or_era)}</span></div>`
          : ''
      }
      ${
        tr.archival_note
          ? `<p class="drawer-note-prose">${esc(tr.archival_note)}</p>`
          : ''
      }
    `;
  }

  // =========================================================================
  // Playback & Zero-Repetition Radio
  // =========================================================================

  function loadTrackIntoPlayer(track, { pushHistory = true } = {}) {
    if (!track) return;
    if (pushHistory && state.currentTrack && state.currentTrack.video_id !== track.video_id) {
      state.sessionPlayedStack.push(state.currentTrack);
      if (state.sessionPlayedStack.length > 40) state.sessionPlayedStack.shift();
    }
    state.currentTrack = track;
    state.wasExplicitlyStopped = false;
    state.trackById.set(track.video_id, track);

    player.loadAndPlay(track.video_id, track.duration_sec || 0);
    renderHearth();
    updateConsoleMeta();
    highlightActiveRows();
    if (state.drawerOpen) renderDrawerBody();
  }

  async function playManualTrack(track, listContext = []) {
    if (!track) return;
    hideWhisper();

    if (state.radio.active) {
      const oldSid = state.radio.sessionId;
      state.radio.active = false;
      state.radio.sessionId = '';
      state.radio.queue = [];
      updateRadioIndicators();
      if (oldSid) apiPost('/api/radio/stop', { session_id: oldSid });
    }

    state.playbackList = listContext.length ? listContext : state.tracks;
    state.playbackIndex = state.playbackList.findIndex((t) => t.video_id === track.video_id);
    state.unplayableRetries = 0;

    loadTrackIntoPlayer(track);

    const res = await apiPost('/api/play', { video_id: track.video_id });
    if (res.ok) {
      state.protectedKeys.add(track.canonical_key);
      refreshLedger();
    }
  }

  async function startRadio({ mode = 'all', mood = '', seedVideoId = '' } = {}) {
    hideWhisper();
    const reqId = ++state.radioRequestSeq;
    state.unplayableRetries = 0;

    state.lastRadioConfig = {
      mode: mode === 'seed' ? 'all' : mode,
      mood: mode === 'mood' ? mood : '',
    };

    const res = await apiPost('/api/radio/start', {
      mode,
      mood,
      seed_video_id: seedVideoId,
    });
    if (reqId !== state.radioRequestSeq) return;

    if (!res.ok || !res.data.current_track) {
      showWhisper(res.data.error || 'Could not begin evening radio right now.');
      return;
    }

    const d = res.data;
    state.radio = {
      active: true,
      sessionId: d.session_id,
      mode: d.mode,
      mood: d.mood || '',
      seedVideoId: d.seed_video_id || '',
      queue: d.queue || [],
      exhausted: Boolean(d.exhausted),
      notice: d.notice || '',
    };

    if (d.notice) {
      showWhisper(d.notice, { gentle: true });
    }

    updateRadioIndicators();
    renderMoodRibbon();
    loadTrackIntoPlayer(d.current_track);
    await refreshLedger();
  }

  async function advanceRadioNext() {
    if (!state.radio.active || !state.radio.sessionId) return;
    const reqId = ++state.radioRequestSeq;

    const res = await apiPost('/api/radio/next', {
      session_id: state.radio.sessionId,
    });
    if (reqId !== state.radioRequestSeq) return;

    if (!res.ok || !res.data.current_track) {
      showWhisper('Could not fetch the next ghazal.');
      return;
    }

    const d = res.data;
    state.radio.sessionId = d.session_id;
    state.radio.queue = d.queue || [];
    state.radio.exhausted = Boolean(d.exhausted);
    state.radio.notice = d.notice || '';

    if (d.notice) {
      showWhisper(d.notice, { gentle: true });
    }

    loadTrackIntoPlayer(d.current_track);
    await refreshLedger();
  }

  async function stopPlayback() {
    const oldSid = state.radio.sessionId;
    const wasRadio = state.radio.active;

    state.radioRequestSeq++;
    player.stop();
    state.wasExplicitlyStopped = true;

    if (wasRadio) {
      state.radio.active = false;
      state.radio.sessionId = '';
      state.radio.queue = [];
      updateRadioIndicators();
      renderMoodRibbon();
      if (oldSid) {
        await apiPost('/api/radio/stop', { session_id: oldSid });
      }
      showWhisper(
        'Stopped. Start radio again anytime — nothing you heard today will repeat.',
        { gentle: true, autoFadeMs: 6500 }
      );
    }

    renderHearth();
    updateConsoleMeta();
    highlightActiveRows();
    await refreshLedger();
  }

  function togglePlayPause() {
    if (player.state === 'playing' || player.state === 'loading') {
      player.pause();
      return;
    }
    if (player.state === 'paused' && state.currentTrack && !state.wasExplicitlyStopped) {
      player.play();
      return;
    }
    if (state.wasExplicitlyStopped || !state.currentTrack) {
      startRadio(state.lastRadioConfig);
      return;
    }
    player.play();
  }

  function handleNext() {
    if (state.radio.active) {
      advanceRadioNext();
      return;
    }
    if (state.playbackList.length > 0 && state.playbackIndex >= 0) {
      const nextIdx = (state.playbackIndex + 1) % state.playbackList.length;
      playManualTrack(state.playbackList[nextIdx], state.playbackList);
      return;
    }
    startRadio(state.lastRadioConfig);
  }

  function handlePrevious() {
    if (state.currentTrack && player.currentTime > 4) {
      player.seekTo(0);
      return;
    }
    if (state.sessionPlayedStack.length > 0) {
      const prev = state.sessionPlayedStack.pop();
      loadTrackIntoPlayer(prev, { pushHistory: false });
      return;
    }
    if (state.currentTrack) player.seekTo(0);
  }

  async function handleTrackEnded() {
    // Sleep timer "After this ghazal ends" cleanly intercepts and halts radio auto-advance
    if (sleepTimer.shouldInterceptTrackEnd()) {
      return;
    }
    if (state.radio.active) {
      await advanceRadioNext();
    } else if (state.playbackList.length > 0 && state.playbackIndex >= 0) {
      const nextIdx = state.playbackIndex + 1;
      if (nextIdx < state.playbackList.length) {
        await playManualTrack(state.playbackList[nextIdx], state.playbackList);
      }
    }
  }

  async function handleTrackError(videoId) {
    state.unplayableRetries++;
    if (state.unplayableRetries > 4) {
      showWhisper('Several recordings could not be played. Please check your connection and try again.');
      return;
    }

    const res = await apiPost('/api/tracks/unplayable', {
      video_id: videoId,
      session_id: state.radio.active ? state.radio.sessionId : '',
    });

    state.tracks = state.tracks.filter((t) => t.video_id !== videoId);
    state.trackById.delete(videoId);

    if (state.radio.active && res.ok && res.data.current_track) {
      state.radio.queue = res.data.queue || [];
      loadTrackIntoPlayer(res.data.current_track);
      refreshLedger();
    } else if (!state.radio.active && state.playbackList.length > 1) {
      state.playbackList = state.playbackList.filter((t) => t.video_id !== videoId);
      if (state.playbackList.length > 0) {
        const nextIdx = Math.min(state.playbackIndex, state.playbackList.length - 1);
        playManualTrack(state.playbackList[Math.max(0, nextIdx)], state.playbackList);
      }
    }
  }

  // =========================================================================
  // Console & Sleep Timer UI
  // =========================================================================

  function updateRadioIndicators() {
    dom.radioGlowDot.classList.toggle('hidden', !state.radio.active);
    dom.consoleRadioBtn.classList.toggle('is-active', state.radio.active);
    if (state.radio.active) {
      const m = moodById(state.radio.mood);
      dom.consoleRadioLabel.textContent =
        state.radio.mode === 'mood' && m ? m.name : 'Radio';
    } else {
      dom.consoleRadioLabel.textContent = 'Radio';
    }
  }

  function updateConsoleMeta() {
    const tr = state.currentTrack;
    if (!tr || state.wasExplicitlyStopped) {
      dom.consoleTitle.textContent = 'Nothing playing';
      dom.consoleArtist.textContent = 'Pick a mood or start radio';
      return;
    }
    dom.consoleTitle.textContent = tr.title;
    dom.consoleArtist.textContent = tr.poet ? `${tr.artist}  ·  ${tr.poet}` : tr.artist;
  }

  function updateTransportButtons(playerState) {
    const isPlaying = playerState === 'playing' || playerState === 'loading';
    dom.iconPlay.classList.toggle('hidden', isPlaying);
    dom.iconPause.classList.toggle('hidden', !isPlaying);
    dom.playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  }

  function updateProgressUI(curSec, durSec) {
    dom.timeCurrent.textContent = formatDuration(curSec);
    const total = durSec || (state.currentTrack ? state.currentTrack.duration_sec : 0) || 0;
    dom.timeDuration.textContent = formatDuration(total);
    if (!state.isSeeking && total > 0) {
      dom.seekSlider.value = String(Math.max(0, Math.min(1000, Math.round((curSec / total) * 1000))));
    } else if (!state.isSeeking) {
      dom.seekSlider.value = '0';
    }
  }

  function initSleepTimer() {
    sleepTimer = new window.MehfilSleepTimer.SleepTimer({
      getVolume: () => player.getVolume(),
      setVolume: (vol) => {
        player.setVolume(vol);
        dom.volumeSlider.value = String(vol);
      },
      onTick: (st) => renderSleepUI(st),
      onStateChange: (st) => renderSleepUI(st),
      onExpire: ({ reason }) => {
        player.pause();
        const msg =
          reason === 'end_of_track'
            ? 'Ghazal finished. Playback paused.'
            : 'Sleep timer done. Playback paused.';
        showWhisper(msg, { gentle: true });
      },
    });
  }

  function renderSleepUI(st) {
    const fmt = window.MehfilSleepTimer.formatCountdown;
    if (!st.active) {
      dom.sleepBtn.classList.remove('is-active');
      dom.sleepBtnLabel.textContent = 'Sleep';
      dom.sleepActivePanel.classList.add('hidden');
      return;
    }

    dom.sleepBtn.classList.add('is-active');
    dom.sleepActivePanel.classList.remove('hidden');

    if (st.mode === 'end_of_track') {
      dom.sleepBtnLabel.textContent = 'After ghazal';
      dom.sleepActiveModeLabel.textContent = 'Set for';
      dom.sleepCountdownDisplay.textContent = 'End of ghazal';
      dom.sleepExtendBtn.classList.add('hidden');
    } else {
      const label = fmt(st.remainingMs);
      dom.sleepBtnLabel.textContent = label;
      dom.sleepActiveModeLabel.textContent = st.isFading ? 'Fading softly' : 'Remaining';
      dom.sleepCountdownDisplay.textContent = label;
      dom.sleepExtendBtn.classList.remove('hidden');
    }
  }

  function toggleSleepPopover(forceOpen) {
    const open = forceOpen !== undefined ? forceOpen : dom.sleepPopover.classList.contains('hidden');
    dom.sleepPopover.classList.toggle('hidden', !open);
    dom.sleepBtn.setAttribute('aria-expanded', String(open));
  }

  // =========================================================================
  // Ghazal-Only Search
  // =========================================================================

  let searchDebounce = null;

  function clearSearchSilently() {
    clearTimeout(searchDebounce);
    dom.searchInput.value = '';
    dom.searchClearBtn.classList.add('hidden');
    dom.searchYtBtn.classList.add('hidden');
    state.searchQuery = '';
    state.searchResults = null;
    state.searchLoading = false;
  }

  async function runSearch(query, discoverYouTube = false) {
    const q = (query || '').trim();
    if (!q) {
      clearSearchSilently();
      hideWhisper();
      renderMoodRibbon();
      renderRepertoire();
      return;
    }

    dom.searchClearBtn.classList.remove('hidden');
    if (!window.MEHFIL_STATIC_ENGINE) {
      dom.searchYtBtn.classList.remove('hidden');
    }
    state.searchQuery = q;
    state.searchLoading = discoverYouTube;
    if (discoverYouTube) {
      state.searchResults = [];
      renderRepertoire();
    }

    const url = `/api/search?q=${encodeURIComponent(q)}&discover=${discoverYouTube ? '1' : '0'}`;
    const res = await apiGet(url);
    state.searchLoading = false;

    if (res.data && res.data.rejected) {
      state.searchResults = [];
      showWhisper(res.data.message || 'Only original ghazals here — no remakes, covers, or remixes.');
      renderMoodRibbon();
      renderRepertoire();
      return;
    }

    hideWhisper();
    const local = res.data.local_tracks || [];
    const yt = res.data.youtube_tracks || [];
    for (const t of yt) {
      state.trackById.set(t.video_id, t);
      if (!state.tracks.some((x) => x.video_id === t.video_id)) {
        state.tracks.push(t);
      }
    }
    state.searchResults = [...local, ...yt];
    renderMoodRibbon();
    renderRepertoire();
  }

  // =========================================================================
  // Bind DOM & Initialize
  // =========================================================================

  function bindDOM() {
    const ids = [
      'brandHomeBtn', 'searchForm', 'searchInput', 'searchClearBtn', 'searchYtBtn',
      'eveningDrawerBtn', 'heardCountDot', 'mainRoom',
      'whisperNotice', 'whisperText', 'dismissWhisperBtn',
      'hearthWelcome', 'beginRadioBtn', 'hearthPlaying', 'hearthModeLine',
      'hearthMatla', 'hearthTranslation', 'hearthTitleLine', 'toggleVideoBtn', 'hearthNextBtn',
      'stageContainer',
      'moodRibbon', 'moodContextBar', 'moodContextTitle', 'moodContextScript',
      'moodContextDesc', 'moodRadioBtn', 'moodRadioBtnLabel',
      'repertoireHeading', 'clearFilterBtn', 'ghazalList', 'showMoreWrap', 'showMoreBtn',
      'eveningBackdrop', 'eveningDrawer', 'closeEveningBtn', 'drawerBody',
      'consoleTrackBtn', 'consoleTitle', 'consoleArtist',
      'prevBtn', 'playPauseBtn', 'iconPlay', 'iconPause', 'stopBtn', 'nextBtn',
      'timeCurrent', 'seekSlider', 'timeDuration',
      'consoleRadioBtn', 'radioGlowDot', 'consoleRadioLabel',
      'sleepBtn', 'sleepBtnLabel', 'sleepPopover', 'closeSleepPopoverBtn',
      'sleepActivePanel', 'sleepActiveModeLabel', 'sleepCountdownDisplay',
      'sleepExtendBtn', 'sleepCancelBtn', 'sleepCustomForm', 'sleepCustomInput', 'sleepFadeCheckbox',
      'muteBtn', 'iconVolOn', 'iconVolMuted', 'volumeSlider',
    ];
    for (const id of ids) {
      dom[id] = document.getElementById(id);
    }

    // Home reset
    dom.brandHomeBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      clearSearchSilently();
      state.selectedMood = null;
      state.showAllTracks = false;
      hideWhisper();
      renderMoodRibbon();
      renderRepertoire();
      dom.mainRoom.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Primary Hearth CTAs
    dom.beginRadioBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      startRadio({ mode: 'all' });
    });

    dom.hearthNextBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      handleNext();
    });

    dom.toggleVideoBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setStageVisible(!state.videoVisible);
    });

    dom.moodRadioBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      if (state.selectedMood) {
        startRadio({ mode: 'mood', mood: state.selectedMood });
      }
    });

    dom.clearFilterBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      clearSearchSilently();
      state.selectedMood = null;
      state.showAllTracks = false;
      hideWhisper();
      renderMoodRibbon();
      renderRepertoire();
    });

    dom.showMoreBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      state.showAllTracks = true;
      renderRepertoire();
    });

    dom.dismissWhisperBtn.addEventListener('click', hideWhisper);

    // Search
    dom.searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      const val = dom.searchInput.value.trim();
      if (!val) {
        clearSearchSilently();
        hideWhisper();
        renderMoodRibbon();
        renderRepertoire();
        return;
      }
      dom.searchClearBtn.classList.remove('hidden');
      dom.searchYtBtn.classList.remove('hidden');
      searchDebounce = setTimeout(() => runSearch(val, false), 220);
    });

    dom.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearTimeout(searchDebounce);
      runSearch(dom.searchInput.value, true);
    });

    dom.searchClearBtn.addEventListener('click', () => {
      clearSearchSilently();
      hideWhisper();
      renderMoodRibbon();
      renderRepertoire();
    });

    // Tonight's Evening Drawer
    dom.eveningDrawerBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setDrawerOpen(!state.drawerOpen);
    });
    dom.consoleTrackBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setDrawerTab(state.currentTrack ? 'note' : 'queue');
      setDrawerOpen(true);
    });
    dom.closeEveningBtn.addEventListener('click', () => setDrawerOpen(false));
    dom.eveningBackdrop.addEventListener('click', () => setDrawerOpen(false));

    document.querySelectorAll('[data-drawer-tab]').forEach((btn) => {
      btn.addEventListener('click', () => setDrawerTab(btn.dataset.drawerTab));
    });

    // Transport
    dom.playPauseBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      togglePlayPause();
    });
    dom.stopBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      stopPlayback();
    });
    dom.nextBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      handleNext();
    });
    dom.prevBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      handlePrevious();
    });
    dom.consoleRadioBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      if (state.radio.active) {
        setDrawerTab('queue');
        setDrawerOpen(true);
      } else {
        startRadio(state.lastRadioConfig);
      }
    });

    // Scrubber
    dom.seekSlider.addEventListener('pointerdown', () => {
      state.isSeeking = true;
    });
    dom.seekSlider.addEventListener('input', () => {
      const total = player.duration || (state.currentTrack ? state.currentTrack.duration_sec : 0) || 0;
      dom.timeCurrent.textContent = formatDuration((Number(dom.seekSlider.value) / 1000) * total);
    });
    dom.seekSlider.addEventListener('change', () => {
      const total = player.duration || (state.currentTrack ? state.currentTrack.duration_sec : 0) || 0;
      state.isSeeking = false;
      player.seekTo((Number(dom.seekSlider.value) / 1000) * total);
    });
    window.addEventListener('pointerup', () => {
      state.isSeeking = false;
    });

    // Volume
    dom.volumeSlider.addEventListener('input', () => {
      const vol = Number(dom.volumeSlider.value);
      player.setVolume(vol);
      sleepTimer.notifyUserVolumeChanged(vol);
      dom.iconVolOn.classList.toggle('hidden', player.muted || vol === 0);
      dom.iconVolMuted.classList.toggle('hidden', !(player.muted || vol === 0));
    });
    dom.muteBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      const muted = player.toggleMute();
      dom.iconVolOn.classList.toggle('hidden', muted);
      dom.iconVolMuted.classList.toggle('hidden', !muted);
    });

    // Sleep Timer
    dom.sleepBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.currentTarget.blur();
      toggleSleepPopover();
    });
    dom.closeSleepPopoverBtn.addEventListener('click', () => toggleSleepPopover(false));

    document.querySelectorAll('[data-sleep-min]').forEach((btn) => {
      btn.addEventListener('click', () => {
        sleepTimer.startMinutes(Number(btn.dataset.sleepMin), {
          fadeOut: dom.sleepFadeCheckbox.checked,
        });
        toggleSleepPopover(false);
      });
    });

    document.querySelector('[data-sleep-mode="end_of_track"]')?.addEventListener('click', () => {
      sleepTimer.startEndOfTrack();
      toggleSleepPopover(false);
    });

    dom.sleepCustomForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mins = Number(dom.sleepCustomInput.value);
      if (!Number.isFinite(mins) || mins < 1 || mins > 240) {
        showWhisper('Choose a sleep duration between 1 and 240 minutes.', { autoFadeMs: 4000 });
        return;
      }
      sleepTimer.startMinutes(mins, { fadeOut: dom.sleepFadeCheckbox.checked });
      dom.sleepCustomInput.value = '';
      toggleSleepPopover(false);
    });

    dom.sleepExtendBtn.addEventListener('click', () => sleepTimer.extendMinutes(10));
    dom.sleepCancelBtn.addEventListener('click', () => sleepTimer.cancel());

    document.addEventListener('click', (e) => {
      if (
        !dom.sleepPopover.classList.contains('hidden') &&
        !dom.sleepPopover.contains(e.target) &&
        !dom.sleepBtn.contains(e.target)
      ) {
        toggleSleepPopover(false);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) || '';
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === 'Escape') {
        toggleSleepPopover(false);
        if (state.drawerOpen) setDrawerOpen(false);
        return;
      }
      if (e.code === 'Space' && !inInput) {
        e.preventDefault();
        togglePlayPause();
      }
    });
  }

  function init() {
    bindDOM();
    player = new window.MehfilPlayer.YouTubeAudioController({
      hostId: 'ytPlayerHost',
      onStateChange: (st) => updateTransportButtons(st),
      onProgress: (cur, dur) => updateProgressUI(cur, dur),
      onTrackEnded: () => handleTrackEnded(),
      onTrackError: (vid) => handleTrackError(vid),
    });
    initSleepTimer();
    bootstrap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
