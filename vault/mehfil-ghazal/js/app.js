/**
 * Mehfil — Mobile-First Night Ghazal Sanctuary & Synced Listen Party
 *
 * Features:
 *  - Original-singer ghazals + live original-only YouTube search
 *  - Five moods (Bireh, Naraazgi, Izhaar, Tanhai, Maikada)
 *  - 24-hour zero-repetition Radio (single stream, pause/resume, stop/start)
 *  - Sleep Timer (countdown, fade-out, end of ghazal)
 *  - Real-time Synced Listen Party (share live Radio or live Playlist via SSE)
 */
(function () {
  const INITIAL_VISIBLE = 14;
  const SHOW_MORE_STEP = 14;
  const DRIFT_THRESHOLD_SEC = 2.8;
  const LEDGER_WINDOW_MS = 24 * 60 * 60 * 1000;
  const LOCAL_LEDGER_KEY = 'mehfil_local_ledger_v1';
  const SVG_PLAY = '<svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor" aria-hidden="true"><path d="M2.5 1.6L10.2 6 2.5 10.4V1.6z"/></svg>';
  const SVG_ACTIVE = '<svg viewBox="0 0 12 12" width="8" height="8" fill="currentColor" aria-hidden="true"><path d="M6 1.5L10.5 6 6 10.5 1.5 6 6 1.5z"/></svg>';

  function readLocalLedger() {
    try {
      const raw = localStorage.getItem(LOCAL_LEDGER_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      const cutoff = Date.now() - LEDGER_WINDOW_MS;
      return arr.filter((x) => x && x.played_at_ms >= cutoff);
    } catch (_) {
      return [];
    }
  }

  function writeLocalLedger(items) {
    try {
      const cutoff = Date.now() - LEDGER_WINDOW_MS;
      const pruned = (items || []).filter((x) => x && x.played_at_ms >= cutoff).slice(0, 500);
      localStorage.setItem(LOCAL_LEDGER_KEY, JSON.stringify(pruned));
    } catch (_) {}
  }

  function recordLocalPlay(track, source = 'radio') {
    if (!track || !track.video_id) return;
    const now = Date.now();
    const list = readLocalLedger();
    list.unshift({
      video_id: track.video_id,
      canonical_key: track.canonical_key || '',
      title: track.title || '',
      artist: track.artist || '',
      mood: track.mood || '',
      source,
      played_at_ms: now,
    });
    writeLocalLedger(list);
  }

  function clearLocalLedger() {
    try {
      localStorage.removeItem(LOCAL_LEDGER_KEY);
    } catch (_) {}
  }

  function getLocalExcludePayload() {
    const list = readLocalLedger();
    const vids = [...new Set(list.map((x) => x.video_id).filter(Boolean))];
    const keys = [...new Set(list.map((x) => x.canonical_key).filter(Boolean))];
    return { exclude_video_ids: vids, exclude_keys: keys };
  }

  function getOrCreateClientId() {
    try {
      let cid = localStorage.getItem('mehfil_client_id');
      if (!cid) {
        cid = 'c_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
        localStorage.setItem('mehfil_client_id', cid);
      }
      return cid;
    } catch (_) {
      return 'c_' + Math.random().toString(36).slice(2, 12);
    }
  }

  function getSavedName() {
    try {
      return localStorage.getItem('mehfil_user_name') || '';
    } catch (_) {
      return '';
    }
  }

  function saveUserName(name) {
    try {
      if (name) localStorage.setItem('mehfil_user_name', name);
    } catch (_) {}
  }

  function saveHostToken(code, token) {
    try {
      if (code && token) localStorage.setItem(`mehfil_host_${code.toUpperCase()}`, token);
    } catch (_) {}
  }

  function getSavedHostToken(code) {
    try {
      return localStorage.getItem(`mehfil_host_${code.toUpperCase()}`) || '';
    } catch (_) {
      return '';
    }
  }

  const state = {
    clientId: getOrCreateClientId(),
    userName: getSavedName(),

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

    // Browsing
    selectedMood: null,
    visibleCount: INITIAL_VISIBLE,
    showingHomeHero: false,
    searchQuery: '',
    searchLoading: false,
    searchRejected: false,
    searchResults: null,

    // Playback & Radio
    currentTrack: null,
    playbackList: [],
    playbackIndex: -1,
    sessionPlayedStack: [],
    wasExplicitlyStopped: false,
    lastRadioConfig: { mode: 'all', mood: '' },

    // Full-Screen Lyrical Player
    fullPlayerOpen: false,
    fullPlayerTab: 'cinema', // 'cinema' | 'full'
    showEnglish: true,
    lyricsCache: new Map(),
    lyricsData: null,
    lyricsActiveIdx: -2,
    lyricsUserScrolled: false,
    lyricsFadeTimer: null,
    cinemaActiveLayer: 'A', // 'A' | 'B' for smooth dual-layer cross-dissolve

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

    // Listen Party (Synced Multi-Listener Room)
    party: {
      inRoom: false,
      code: '',
      role: '', // 'host' | 'guest'
      hostToken: '',
      hostName: 'Host',
      mode: 'radio',
      mood: '',
      version: 0,
      listenerCount: 0,
      listeners: [],
      queue: [],
      guestUnlockedAudio: false,
      lastSnapshot: null,
      eventSource: null,
      heartbeatTimer: null,
      applyingRemote: false,
    },

    // Sheets & UI
    drawerOpen: false,
    drawerTab: 'queue',
    aboutOpen: false,
    partySheetOpen: false,
    sleepOpen: false,
    mobileSearchOpen: false,
    isSeeking: false,
  };

  const dom = {};
  let player = null;
  let sleepTimer = null;

  // =========================================================================
  // Utilities
  // =========================================================================

  function cleanTitleDisplay(title) {
    let s = String(title || '')
      .replace(/\s*\((?:ghazal|ghazal performance|ptv|live|audio|video|hd|4k|full)[^)]*\)\s*/ig, ' ')
      .replace(/\s*-\s*$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const words = s.split(' ');
    const upperWords = words.filter((w) => {
      const a = w.replace(/[^A-Za-z]/g, '');
      return a.length >= 3 && a === a.toUpperCase();
    }).length;
    const allLower = s.length >= 6 && s === s.toLowerCase();
    if (allLower || upperWords >= 2) {
      s = s.toLowerCase().replace(/(^|[\s\-–—(])([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    }
    return s;
  }

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

  const API_BASE = window.location.pathname.startsWith('/vault/mehfil-ghazal')
    ? '/vault/mehfil-ghazal'
    : '';

  function resolveApiUrl(url) {
    return url.startsWith('/api/') ? `${API_BASE}${url}` : url;
  }

  async function apiGet(url) {
    const resp = await fetch(resolveApiUrl(url), { headers: { Accept: 'application/json' } });
    const data = await resp.json().catch(() => ({}));
    return { ok: resp.ok, status: resp.status, data };
  }

  async function apiPost(url, payload = {}) {
    const resp = await fetch(resolveApiUrl(url), {
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

  function isGuestInParty() {
    return state.party.inRoom && state.party.role === 'guest';
  }

  function isHostInParty() {
    return state.party.inRoom && state.party.role === 'host';
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
    const serverLedger = (statusObj && statusObj.ledger) || [];
    const localLedger = readLocalLedger().map((item) => ({
      ...item,
      cooldown_remaining_ms: Math.max(0, item.played_at_ms + LEDGER_WINDOW_MS - Date.now()),
    }));
    // Use server ledger when populated (local SQLite mode), otherwise per-user browser ledger (public Worker mode)
    const merged = serverLedger.length > 0 ? serverLedger : localLedger;
    const uniqueKeys = new Set(merged.map((item) => item.canonical_key).filter(Boolean));

    state.radioStatus = {
      ...(statusObj || {}),
      protected_unique_ghazals: uniqueKeys.size,
      ledger: merged,
    };
    state.ledger = merged;
    state.protectedKeys = uniqueKeys;
    const count = uniqueKeys.size;
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
      showWhisper('Could not reach the Mehfil server. Make sure server.py is running.');
      return;
    }
    state.moods = res.data.moods || [];
    indexTracks(res.data.tracks || []);
    syncLedger(res.data.radio_status);

    renderMoodRibbon();
    renderRepertoire();

    // Auto-join room if opened via shared ?room=CODE link
    const params = new URLSearchParams(window.location.search);
    const roomCode = (params.get('room') || '').trim().toUpperCase();
    if (roomCode) {
      await connectToRoom(roomCode, { fromUrl: true });
    }
  }

  // =========================================================================
  // Synced Listen Party Engine (Host + Guest + SSE + Drift Correction)
  // =========================================================================

  function buildShareUrl(code) {
    const url = new URL(window.location.href);
    url.search = `?room=${encodeURIComponent(code)}`;
    url.hash = '';
    return url.toString();
  }

  function setUrlRoomParam(code) {
    try {
      const url = new URL(window.location.href);
      if (code) url.searchParams.set('room', code);
      else url.searchParams.delete('room');
      window.history.replaceState({}, '', url.toString());
    } catch (_) {}
  }

  function closePartyConnection() {
    if (state.party.eventSource) {
      try {
        state.party.eventSource.close();
      } catch (_) {}
      state.party.eventSource = null;
    }
    if (state.party.heartbeatTimer) {
      clearInterval(state.party.heartbeatTimer);
      state.party.heartbeatTimer = null;
    }
  }

  function openPartyStream(code, role) {
    closePartyConnection();
    const name = state.userName || (role === 'host' ? 'Host' : 'Listener');
    const url = resolveApiUrl(`/api/party/${encodeURIComponent(code)}/events?client_id=${encodeURIComponent(
      state.clientId
    )}&name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}`);

    try {
      const es = new EventSource(url);
      es.addEventListener('state', (evt) => {
        try {
          const snap = JSON.parse(evt.data);
          handlePartySnapshot(snap);
        } catch (_) {}
      });
      state.party.eventSource = es;
    } catch (_) {}

    // Heartbeat + fallback resync every 6s (keeps presence live & recovers after mobile sleep)
    state.party.heartbeatTimer = setInterval(async () => {
      if (!state.party.inRoom || !state.party.code) return;
      const hb = await apiPost(`/api/party/${encodeURIComponent(state.party.code)}/heartbeat`, {
        client_id: state.clientId,
        name: state.userName || (state.party.role === 'host' ? 'Host' : 'Listener'),
        role: state.party.role,
      });
      if (hb.ok && hb.data.state) {
        handlePartySnapshot(hb.data.state);
      }
    }, 6000);
  }

  async function hostBroadcastUpdate(patch) {
    if (!isHostInParty()) return;
    const res = await apiPost(`/api/party/${encodeURIComponent(state.party.code)}/update`, {
      host_token: state.party.hostToken,
      ...patch,
    });
    if (res.ok && res.data.state) {
      state.party.version = Math.max(state.party.version, res.data.state.version || 0);
      state.party.lastSnapshot = res.data.state;
      state.party.queue = res.data.state.queue || [];
      state.party.listenerCount = res.data.state.listener_count || 1;
      state.party.listeners = res.data.state.listeners || [];
      renderPartyUI();
    }
  }

  async function createParty(shareType) {
    const inputName = (dom.partyNameInput.value || '').trim();
    if (inputName) {
      state.userName = inputName;
      saveUserName(inputName);
    }
    const hostName = state.userName || 'Host';

    let mode = shareType === 'playlist' ? 'playlist' : 'radio';
    let mood = state.selectedMood || state.radio.mood || '';
    let queueIds = [];
    let currentVid = state.currentTrack && !state.wasExplicitlyStopped ? state.currentTrack.video_id : '';
    let radioSid = '';

    if (mode === 'radio') {
      if (state.radio.active && state.radio.sessionId) {
        mode = state.radio.mode === 'mood' ? 'mood_radio' : 'radio';
        mood = state.radio.mood || '';
        radioSid = state.radio.sessionId;
        queueIds = state.radio.queue.map((t) => t.video_id);
      } else {
        mode = mood ? 'mood_radio' : 'radio';
      }
    } else {
      // Live playlist mode: seed with currently displayed mood/selection tracks
      const list = getDisplayedTracks();
      if (!currentVid && list.length > 0) {
        currentVid = list[0].video_id;
      }
      queueIds = list
        .map((t) => t.video_id)
        .filter((vid) => vid !== currentVid)
        .slice(0, 25);
    }

    const res = await apiPost('/api/party/create', {
      host_name: hostName,
      client_id: state.clientId,
      mode,
      mood,
      current_video_id: currentVid,
      is_playing: Boolean(currentVid && (player.state === 'playing' || player.state === 'loading')),
      position_sec: currentVid ? player.currentTime || 0 : 0,
      radio_session_id: radioSid,
      queue_video_ids: queueIds,
      ...getLocalExcludePayload(),
    });

    if (!res.ok || !res.data.code) {
      showWhisper('Could not start the room right now.');
      return;
    }

    const { code, host_token, state: snap } = res.data;
    saveHostToken(code, host_token);

    state.party.inRoom = true;
    state.party.code = code;
    state.party.role = 'host';
    state.party.hostToken = host_token;
    state.party.hostName = snap.host_name;
    state.party.mode = snap.mode;
    state.party.mood = snap.mood;
    state.party.version = snap.version;
    state.party.queue = snap.queue || [];
    state.party.listenerCount = snap.listener_count || 1;
    state.party.listeners = snap.listeners || [];
    state.party.lastSnapshot = snap;

    if (snap.radio_session_id) {
      state.radio.active = snap.mode !== 'playlist';
      state.radio.sessionId = snap.radio_session_id;
      state.radio.mode = snap.mode === 'mood_radio' ? 'mood' : 'all';
      state.radio.mood = snap.mood || '';
      state.radio.queue = snap.queue || [];
      updateRadioIndicators();
    }

    // If backend picked an initial radio track for us, start playing it locally too
    if (snap.current_track && (!state.currentTrack || state.currentTrack.video_id !== snap.current_track.video_id || state.wasExplicitlyStopped)) {
      recordLocalPlay(snap.current_track, 'radio');
      loadTrackIntoPlayer(snap.current_track, { startSeconds: snap.computed_position_sec || 0 });
    }

    setUrlRoomParam(code);
    openPartyStream(code, 'host');
    renderPartyUI();
    renderRepertoire();
    if (state.drawerOpen) renderDrawerBody();
    showWhisper(`Room ${code} is live. Share the link to listen together.`, { gentle: true, autoFadeMs: 5000 });
  }

  async function connectToRoom(codeInput, { fromUrl = false } = {}) {
    const code = (codeInput || '').trim().toUpperCase();
    if (!code) {
      showWhisper('Enter a room code to join.', { autoFadeMs: 3500 });
      return;
    }

    const inputName = (dom.partyNameInput.value || '').trim();
    if (inputName) {
      state.userName = inputName;
      saveUserName(inputName);
    }

    const savedToken = getSavedHostToken(code);
    const role = savedToken ? 'host' : 'guest';
    const name = state.userName || (role === 'host' ? 'Host' : 'Listener');

    const res = await apiPost(`/api/party/${encodeURIComponent(code)}/join`, {
      client_id: state.clientId,
      name,
      role,
    });

    if (!res.ok || !res.data.state) {
      showWhisper(`Room “${code}” was not found.`, { autoFadeMs: 4500 });
      if (fromUrl) setUrlRoomParam('');
      return;
    }

    const snap = res.data.state;
    state.party.inRoom = true;
    state.party.code = code;
    state.party.role = role;
    state.party.hostToken = savedToken;
    state.party.hostName = snap.host_name || 'Host';
    state.party.mode = snap.mode;
    state.party.mood = snap.mood;
    state.party.version = 0; // force initial apply
    state.party.queue = snap.queue || [];
    state.party.listenerCount = snap.listener_count || 1;
    state.party.listeners = snap.listeners || [];
    state.party.lastSnapshot = snap;
    // If joined via direct button tap, user gesture already unlocked audio; if via URL load, show one-tap sync banner!
    state.party.guestUnlockedAudio = !fromUrl || role === 'host';

    setUrlRoomParam(code);
    openPartyStream(code, role);
    handlePartySnapshot(snap, { forceSync: true });
    renderPartyUI();
    renderRepertoire();
    if (!fromUrl) setPartySheetOpen(false);
  }

  function handlePartySnapshot(snap, { forceSync = false } = {}) {
    if (!snap || !state.party.inRoom || snap.code !== state.party.code) return;

    const receivedAt = Date.now();
    state.party.listenerCount = snap.listener_count || 1;
    state.party.listeners = snap.listeners || [];
    state.party.queue = snap.queue || [];
    state.party.mode = snap.mode;
    state.party.mood = snap.mood;
    state.party.hostName = snap.host_name || 'Host';
    state.party.lastSnapshot = { ...snap, _receivedAt: receivedAt };

    if (snap.queue && state.radio.active) {
      state.radio.queue = snap.queue;
    }

    // Host only updates listener roster & queue from incoming broadcasts
    if (isHostInParty()) {
      state.party.version = Math.max(state.party.version, snap.version || 0);
      renderPartyUI();
      if (state.drawerOpen) renderDrawerBody();
      return;
    }

    // Guest sync logic
    const isNewer = (snap.version || 0) > state.party.version;
    if (isNewer) state.party.version = snap.version;

    // Update guest banner if waiting for user tap to unlock mobile audio
    if (!state.party.guestUnlockedAudio) {
      if (snap.current_track) {
        state.currentTrack = snap.current_track;
        state.wasExplicitlyStopped = Boolean(snap.is_stopped);
        renderHearth();
        updateConsoleMeta();
      }
      renderPartyUI();
      return;
    }

    applyGuestSync(snap, { forceSync: forceSync || isNewer });
    renderPartyUI();
    if (state.drawerOpen) renderDrawerBody();
  }

  function applyGuestSync(snap, { forceSync = false } = {}) {
    if (!snap) return;
    state.party.applyingRemote = true;
    try {
      const tr = snap.current_track;
      const elapsedSinceRecv = snap._receivedAt ? Math.max(0, (Date.now() - snap._receivedAt) / 1000) : 0;
      const targetPos = snap.is_playing && !snap.is_stopped
        ? (snap.computed_position_sec || 0) + elapsedSinceRecv
        : (snap.computed_position_sec || 0);

      if (snap.is_stopped || !tr) {
        if (!state.wasExplicitlyStopped) {
          player.stop();
          state.wasExplicitlyStopped = true;
          renderHearth();
          updateConsoleMeta();
          highlightActiveRows();
        }
        return;
      }

      const trackChanged = !state.currentTrack || state.currentTrack.video_id !== tr.video_id || state.wasExplicitlyStopped;
      state.currentTrack = tr;
      state.wasExplicitlyStopped = false;
      state.trackById.set(tr.video_id, tr);

      if (trackChanged) {
        if (snap.is_playing) {
          player.loadAndPlay(tr.video_id, tr.duration_sec || 0, targetPos);
        } else {
          player.cueAt(tr.video_id, targetPos, tr.duration_sec || 0);
        }
      } else if (snap.is_playing) {
        if (player.state !== 'playing' && player.state !== 'loading') {
          player.seekTo(targetPos);
          player.play();
        } else {
          const drift = Math.abs((player.currentTime || 0) - targetPos);
          if (forceSync ? drift >= 1.5 : drift >= DRIFT_THRESHOLD_SEC) {
            player.seekTo(targetPos);
          }
        }
      } else {
        // Host paused
        if (player.state === 'playing' || player.state === 'loading') {
          player.pause();
        }
        if (Math.abs((player.currentTime || 0) - targetPos) >= 1.8) {
          player.seekTo(targetPos);
        }
      }

      renderHearth();
      updateConsoleMeta();
      highlightActiveRows();
    } finally {
      state.party.applyingRemote = false;
    }
  }

  async function guestTapToSync() {
    state.party.guestUnlockedAudio = true;
    // Unlock audio synchronously inside the user tap gesture (required on iOS Safari)
    if (state.party.lastSnapshot) {
      applyGuestSync(state.party.lastSnapshot, { forceSync: true });
    }
    renderPartyUI();
    showWhisper(`Synced with room ${state.party.code}.`, { gentle: true, autoFadeMs: 4000 });

    // Then pull latest server timestamp to eliminate any drift since initial page load
    if (state.party.code) {
      const fresh = await apiGet(`/api/party/${encodeURIComponent(state.party.code)}`);
      if (fresh.ok && fresh.data.state) {
        state.party.lastSnapshot = { ...fresh.data.state, _receivedAt: Date.now() };
        applyGuestSync(state.party.lastSnapshot, { forceSync: true });
        renderPartyUI();
      }
    }
  }

  async function leaveParty() {
    const code = state.party.code;
    closePartyConnection();
    if (code) {
      apiPost(`/api/party/${encodeURIComponent(code)}/leave`, { client_id: state.clientId });
    }
    state.party = {
      inRoom: false,
      code: '',
      role: '',
      hostToken: '',
      hostName: 'Host',
      mode: 'radio',
      mood: '',
      version: 0,
      listenerCount: 0,
      listeners: [],
      queue: [],
      guestUnlockedAudio: false,
      lastSnapshot: null,
      eventSource: null,
      heartbeatTimer: null,
      applyingRemote: false,
    };
    setUrlRoomParam('');
    renderPartyUI();
    renderRepertoire();
    setPartySheetOpen(false);
    showWhisper('Left the synced room.', { gentle: true, autoFadeMs: 3500 });
  }

  async function sharePartyInvite(preferCopyOnly = false) {
    if (!state.party.code) return;
    const shareUrl = buildShareUrl(state.party.code);
    const shareText = `Join my Mehfil ghazal room (${state.party.code})`;

    if (!preferCopyOnly && navigator.share) {
      try {
        await navigator.share({ title: 'Mehfil — Listen together', text: shareText, url: shareUrl });
        return;
      } catch (_) {}
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showWhisper(`Invite link copied (${state.party.code}).`, { gentle: true, autoFadeMs: 4000 });
    } catch (_) {
      showWhisper(`Share code ${state.party.code} or URL: ${shareUrl}`, { gentle: true, autoFadeMs: 7000 });
    }
  }

  function renderPartyUI() {
    const inRoom = state.party.inRoom;
    const count = state.party.listenerCount || 1;
    const code = state.party.code;

    // Header & Console indicators
    dom.partyHeaderDot.classList.toggle('hidden', !inRoom);
    dom.consolePartyDot.classList.toggle('hidden', !inRoom);
    dom.partyHeaderLabel.textContent = inRoom ? `${code} · ${count}` : 'Together';
    dom.consolePartyLabel.textContent = inRoom ? `${code} (${count})` : 'Together';
    dom.consolePartyBtn.classList.toggle('is-active', inRoom);

    // Guest one-tap audio unlock banner
    const needsGuestTap = isGuestInParty() && !state.party.guestUnlockedAudio;
    dom.guestJoinBanner.classList.toggle('hidden', !needsGuestTap);

    // Hearth live status strip (hidden while awaiting guest's initial one-tap join)
    if (inRoom && !needsGuestTap) {
      dom.partyStatusLine.classList.remove('hidden');
      const roleWord = isHostInParty() ? 'Hosting' : 'Synced';
      dom.partyStatusText.textContent = `${roleWord} · ${code} · ${count} listening`;
      dom.partyQuickResyncBtn.classList.toggle('hidden', !isGuestInParty());
    } else {
      dom.partyStatusLine.classList.add('hidden');
    }

    if (needsGuestTap) {
      const snap = state.party.lastSnapshot;
      dom.guestJoinKicker.textContent = `Room ${code} · Hosted by ${state.party.hostName} · ${count} here`;
      dom.guestJoinTitle.textContent = snap && snap.current_track
        ? `${cleanTitleDisplay(snap.current_track.title)} — ${snap.current_track.artist}`
        : 'Listening together';
    }

    // Party sheet views
    dom.partySetupView.classList.toggle('hidden', inRoom);
    dom.partyActiveView.classList.toggle('hidden', !inRoom);
    if (inRoom) {
      dom.partyRoleBadge.textContent = isHostInParty()
        ? `Hosting · ${state.party.mode === 'playlist' ? 'Live Playlist' : 'Live Radio'}`
        : `Listening with ${state.party.hostName}`;
      dom.partyCodeDisplay.textContent = code;
      dom.partyListenersSummary.textContent = `${count} ${count === 1 ? 'person' : 'people'} in this room`;
      if (dom.partyShareUrlReadout) {
        dom.partyShareUrlReadout.textContent = buildShareUrl(code).replace(/^https?:\/\//, '');
      }
      dom.partyHostHint.classList.toggle('hidden', !isHostInParty());
      dom.partyGuestActions.classList.toggle('hidden', !isGuestInParty());

      const list = state.party.listeners.length
        ? state.party.listeners
        : [{ name: state.party.hostName, role: 'host' }];
      dom.partyRosterList.innerHTML = list
        .map(
          (m) => `
        <div class="roster-row">
          <span>${esc(m.name)}</span>
          <span class="roster-role">${m.role === 'host' ? 'Host' : 'Listening'}</span>
        </div>`
        )
        .join('');
    }
  }

  // =========================================================================
  // Hearth & Stage Rendering
  // =========================================================================

  function renderHearth() {
    const tr = state.currentTrack;
    if (!tr || state.wasExplicitlyStopped || state.showingHomeHero) {
      dom.hearthWelcome.classList.remove('hidden');
      dom.hearthPlaying.classList.add('hidden');
      return;
    }

    dom.hearthWelcome.classList.add('hidden');
    dom.hearthPlaying.classList.remove('hidden');

    if (state.party.inRoom) {
      const m = moodById(state.party.mood || tr.mood);
      dom.hearthModeLine.textContent =
        state.party.mode === 'playlist'
          ? `Live Playlist · ${state.party.code}`
          : m
          ? `${m.name} Radio · ${state.party.code}`
          : `Live Radio · ${state.party.code}`;
    } else if (state.radio.active) {
      const m = moodById(state.radio.mood);
      dom.hearthModeLine.textContent =
        state.radio.mode === 'mood' && m ? `${m.name} Radio` : 'Radio';
    } else {
      const m = moodById(tr.mood);
      dom.hearthModeLine.textContent = m ? `${m.name} · ${moodShortWord(m)}` : 'Now Playing';
    }

    const displayTitle = cleanTitleDisplay(tr.title);
    dom.hearthTitle.textContent = displayTitle;
    dom.hearthCredit.textContent = tr.poet ? `${tr.artist}  ·  ${tr.poet}` : tr.artist;
  }

  // =========================================================================
  // Full-Screen Lyrical Player & Live Synced Lyrics
  // =========================================================================

  function buildFallbackLyrics(track) {
    if (!track) return { video_id: '', mode: 'empty', couplets: [] };
    if (track.matla) {
      return {
        video_id: track.video_id,
        mode: 'matla',
        couplets: [
          {
            start: 0,
            end: track.duration_sec || 0,
            lines: [track.matla],
            en: track.matla_translation || '',
          },
        ],
      };
    }
    return { video_id: track.video_id, mode: 'empty', couplets: [] };
  }

  const LYRICS_CACHE_VER = '91b113f3';

  async function loadLyricsForTrack(track) {
    if (!track || !track.video_id) {
      state.lyricsData = null;
      state.lyricsActiveIdx = -2;
      renderFullPlayerStage();
      return;
    }
    const vid = track.video_id;
    state.lyricsActiveIdx = -2;
    state.lyricsUserScrolled = false;

    if (state.lyricsCache.has(vid)) {
      state.lyricsData = state.lyricsCache.get(vid);
      state.fullPlayerTab = state.lyricsData.mode === 'untimed' ? 'full' : 'cinema';
      renderFullPlayerStage();
      syncLyricsToTime(player ? player.currentTime : 0, { immediate: true });
      return;
    }

    // Immediate graceful display while JSON loads
    state.lyricsData = buildFallbackLyrics(track);
    renderFullPlayerStage();

    try {
      const resp = await fetch(`./lyrics/${encodeURIComponent(vid)}.json?v=${LYRICS_CACHE_VER}`, { cache: 'default' });
      if (resp.ok) {
        const data = await resp.json();
        if (data && Array.isArray(data.couplets) && data.couplets.length > 0) {
          state.lyricsCache.set(vid, data);
          if (state.currentTrack && state.currentTrack.video_id === vid) {
            state.lyricsData = data;
            state.fullPlayerTab = data.mode === 'untimed' ? 'full' : 'cinema';
            state.lyricsActiveIdx = -2;
            renderFullPlayerStage();
            syncLyricsToTime(player ? player.currentTime : 0, { immediate: true });
          }
          return;
        }
      }
    } catch (_) {
      // Static lyrics file not yet present for this recording; fallback stays active
    }
    const fb = buildFallbackLyrics(track);
    state.lyricsCache.set(vid, fb);
  }

  function setFullPlayerOpen(open, { tab } = {}) {
    const nextOpen = Boolean(open);
    if (nextOpen && (!state.currentTrack || state.wasExplicitlyStopped)) {
      startRadio(state.lastRadioConfig);
    }
    state.fullPlayerOpen = nextOpen;

    if (nextOpen) {
      setDrawerOpen(false);
      setAboutSheetOpen(false);
      setPartySheetOpen(false);
      toggleSleepPopover(false);
      setMobileSearchOpen(false);
      if (tab) {
        state.fullPlayerTab = tab;
      } else if (state.lyricsData && state.lyricsData.mode === 'untimed') {
        state.fullPlayerTab = 'full';
      } else {
        state.fullPlayerTab = 'cinema';
      }
      dom.fullPlayer.classList.remove('hidden');
      requestAnimationFrame(() => dom.fullPlayer.classList.add('is-open'));
      renderFullPlayerStage();
      syncLyricsToTime(player ? player.currentTime : 0, { immediate: true });
    } else {
      dom.fullPlayer.classList.remove('is-open');
      setTimeout(() => {
        if (!state.fullPlayerOpen) dom.fullPlayer.classList.add('hidden');
      }, 220);
    }
  }

  function setFullPlayerTab(tab) {
    state.fullPlayerTab = tab;
    state.lyricsUserScrolled = false;
    renderFullPlayerStage();
    syncLyricsToTime(player ? player.currentTime : 0, { immediate: true });
  }

  const SVG_INSTRUMENTAL_NOTE = `
    <div class="fp-instrumental" aria-label="Instrumental">
      <svg class="fp-music-note-svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </div>`;

  function buildCinemaCoupletHtml(lines, engText, quoted = true) {
    const urduHtml = (lines || []).map((l) => esc(l)).join('<br/>');
    const showEng = state.showEnglish && Boolean(engText);
    return `
      <p class="fp-cinema-urdu font-display">${quoted ? `“${urduHtml}”` : urduHtml}</p>
      ${showEng ? `<div class="fp-gold-rule" aria-hidden="true"></div><p class="fp-cinema-eng">${esc(engText)}</p>` : ''}
    `;
  }

  function transitionCinemaStage(html, counterText, { immediate = false } = {}) {
    if (!dom.fpCinemaLayerA || !dom.fpCinemaLayerB) return;
    clearTimeout(state.lyricsFadeTimer);

    const currentLayer = state.cinemaActiveLayer === 'A' ? dom.fpCinemaLayerA : dom.fpCinemaLayerB;
    const nextLayer = state.cinemaActiveLayer === 'A' ? dom.fpCinemaLayerB : dom.fpCinemaLayerA;

    if (immediate) {
      currentLayer.classList.add('no-transition');
      nextLayer.classList.add('no-transition');
      currentLayer.classList.remove('is-shown', 'is-leaving');
      nextLayer.classList.remove('is-leaving');
      nextLayer.innerHTML = html;
      nextLayer.classList.add('is-shown');
      void nextLayer.offsetHeight;
      currentLayer.classList.remove('no-transition');
      nextLayer.classList.remove('no-transition');
      state.cinemaActiveLayer = state.cinemaActiveLayer === 'A' ? 'B' : 'A';
    } else {
      // Prepare incoming layer quietly below center without transition
      nextLayer.classList.add('no-transition');
      nextLayer.classList.remove('is-shown', 'is-leaving');
      nextLayer.innerHTML = html;
      void nextLayer.offsetHeight;
      nextLayer.classList.remove('no-transition');

      // Dissolve outgoing layer slowly upward
      currentLayer.classList.remove('is-shown');
      currentLayer.classList.add('is-leaving');

      // After a calm 180ms breath, float the new layer slowly into the lamplight
      state.lyricsFadeTimer = setTimeout(() => {
        nextLayer.classList.add('is-shown');
        state.cinemaActiveLayer = state.cinemaActiveLayer === 'A' ? 'B' : 'A';
      }, 180);
    }

    if (dom.fpCinemaCounter) {
      dom.fpCinemaCounter.textContent = counterText || '';
      dom.fpCinemaCounter.classList.toggle('is-quiet', !counterText);
    }
  }

  function renderFullPlayerStage() {
    if (!dom.fullPlayer) return;
    const data = state.lyricsData || buildFallbackLyrics(state.currentTrack);
    const mode = data.mode || 'empty';
    const isSynced = mode === 'synced';
    const isUntimed = mode === 'untimed';
    const tab = state.fullPlayerTab;

    // Top kicker
    if (isSynced) {
      dom.fpModeKicker.textContent = state.party.inRoom ? `Live · ${state.party.code}` : 'Live lyrics';
    } else if (isUntimed) {
      dom.fpModeKicker.textContent = 'Couplets · untimed';
    } else {
      dom.fpModeKicker.textContent = state.radio.active ? 'Radio' : 'Now playing';
    }

    // Top right view toggle (Full / Stage for synced tracks)
    dom.fpViewToggleBtn.classList.toggle('hidden', !isSynced);
    dom.fpViewToggleBtn.textContent = tab === 'full' ? 'Stage' : 'Full';

    // Stage panels
    dom.fpCinemaStage.classList.toggle('hidden', tab !== 'cinema');
    dom.fpFullStage.classList.toggle('hidden', tab !== 'full');

    // English button state
    dom.fpEnglishBtn.classList.toggle('is-on', state.showEnglish);
    dom.fpEnglishBtn.setAttribute('aria-pressed', String(state.showEnglish));

    // Populate Full Scrollable Couplets list
    if (tab === 'full') {
      const couplets = data.couplets || [];
      if (!couplets.length) {
        dom.fpFullList.innerHTML = `<p class="empty-whisper">Lyrics are not available for this recording yet.</p>`;
      } else {
        dom.fpFullList.innerHTML = couplets
          .map((c, i) => {
            const linesHtml = (c.lines || []).map((l) => esc(l)).join('<br/>');
            const engHtml =
              state.showEnglish && c.en ? `<p class="fp-sher-eng">${esc(c.en)}</p>` : '';
            const cls = isSynced ? 'fp-sher-item' : 'fp-sher-item is-untimed';
            return `
              <button type="button" class="${cls}" data-sher-idx="${i}" ${isSynced ? '' : 'tabindex="-1"'}>
                <p class="fp-sher-urdu">${linesHtml}</p>
                ${engHtml}
              </button>`;
          })
          .join('');

        if (isSynced) {
          dom.fpFullList.querySelectorAll('[data-sher-idx]').forEach((btn) => {
            btn.addEventListener('click', () => {
              const idx = Number(btn.dataset.sherIdx);
              const c = couplets[idx];
              if (!c || typeof c.start !== 'number') return;
              if (isGuestInParty()) {
                showWhisper(`Synced with ${state.party.hostName}.`, { gentle: true, autoFadeMs: 2500 });
                return;
              }
              state.lyricsUserScrolled = false;
              dom.fpBackToLiveBtn.classList.add('hidden');
              player.seekTo(c.start);
              if (isHostInParty()) {
                hostBroadcastUpdate({ position_sec: c.start, is_playing: player.state === 'playing' });
              }
              syncLyricsToTime(c.start, { immediate: true });
            });
          });
        }
      }
      dom.fpBackToLiveBtn.classList.add('hidden');
    }

    // Immediate Cinema render for matla / empty (non-synced tracks)
    if (tab === 'cinema' && !isSynced) {
      const first = (data.couplets || [])[0];
      if (first) {
        const html = buildCinemaCoupletHtml(first.lines, first.en || '', true);
        const poetLabel = state.currentTrack && state.currentTrack.poet ? state.currentTrack.poet : '';
        transitionCinemaStage(html, poetLabel, { immediate: true });
      } else {
        const title = state.currentTrack ? cleanTitleDisplay(state.currentTrack.title) : 'Mehfil';
        transitionCinemaStage(buildCinemaCoupletHtml([title], '', false), '', { immediate: true });
      }
    }
  }

  function syncLyricsToTime(curSec, { immediate = false } = {}) {
    if (!state.fullPlayerOpen || !state.lyricsData) return;
    const data = state.lyricsData;
    if (data.mode !== 'synced' || !Array.isArray(data.couplets) || !data.couplets.length) return;

    const couplets = data.couplets;
    // Lead-in anticipation (~0.50s) matches the 180ms breath + slow 900ms dissolve
    // so each line reaches full readability right as the vocalist begins singing.
    const t = curSec + 0.5;
    let activeIdx = -1;
    for (let i = 0; i < couplets.length; i++) {
      const c = couplets[i];
      const nextStart = i + 1 < couplets.length ? couplets[i + 1].start : Infinity;
      const effectiveEnd = nextStart - c.end <= 3.0 ? nextStart : c.end + 0.8;
      if (t >= c.start && t < effectiveEnd) {
        activeIdx = i;
        break;
      }
    }

    if (activeIdx === state.lyricsActiveIdx && !immediate) return;
    state.lyricsActiveIdx = activeIdx;

    // 1. Slow, zero-jump dual-layer cross-dissolve on Option B Cinema Stage
    if (activeIdx < 0) {
      transitionCinemaStage(SVG_INSTRUMENTAL_NOTE, '', { immediate });
    } else {
      const c = couplets[activeIdx];
      const html = buildCinemaCoupletHtml(c.lines, c.en || '', true);
      transitionCinemaStage(html, `${activeIdx + 1} of ${couplets.length}`, { immediate });
    }

    // 2. Update Full Scrollable List highlight & smooth auto-center
    if (state.fullPlayerTab === 'full') {
      const items = dom.fpFullList.querySelectorAll('[data-sher-idx]');
      items.forEach((el) => {
        const isAct = Number(el.dataset.sherIdx) === activeIdx;
        el.classList.toggle('is-active', isAct);
        if (isAct) el.setAttribute('aria-current', 'true');
        else el.removeAttribute('aria-current');
      });
      if (activeIdx >= 0 && !state.lyricsUserScrolled) {
        const activeEl = dom.fpFullList.querySelector(`[data-sher-idx="${activeIdx}"]`);
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'center' });
        }
      }
    }
  }

  // =========================================================================
  // Moods Ribbon & Ghazal List
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
        state.visibleCount = INITIAL_VISIBLE;
        renderMoodRibbon();
        renderRepertoire();
      });
    });

    const activeMood = state.selectedMood && !state.searchQuery ? moodById(state.selectedMood) : null;
    if (activeMood) {
      dom.moodContextTitle.textContent = activeMood.name;
      dom.moodContextScript.textContent = activeMood.script;
      dom.moodContextDesc.textContent = activeMood.description;
      dom.moodRadioBtnLabel.textContent = `${activeMood.name} Radio`;
      dom.moodContextBar.classList.remove('hidden');
    } else {
      dom.moodContextBar.classList.add('hidden');
    }
  }

  function getAllTracksForCurrentView() {
    if (state.searchResults !== null) return state.searchResults;
    if (state.selectedMood) {
      const primary = state.tracks.filter((t) => t.mood === state.selectedMood);
      const secondary = state.tracks.filter(
        (t) => t.mood !== state.selectedMood && t.secondary_mood === state.selectedMood
      );
      return [...primary, ...secondary];
    }
    const byMood = {};
    let maxLen = 0;
    for (const m of state.moods) {
      byMood[m.id] = state.tracks.filter((t) => t.mood === m.id);
      if (byMood[m.id].length > maxLen) maxLen = byMood[m.id].length;
    }
    const woven = [];
    const seenIds = new Set();
    for (let round = 0; round < maxLen; round++) {
      for (const m of state.moods) {
        const item = (byMood[m.id] || [])[round];
        if (item && !seenIds.has(item.video_id)) {
          seenIds.add(item.video_id);
          woven.push(item);
        }
      }
    }
    for (const t of state.tracks) {
      if (!seenIds.has(t.video_id)) {
        seenIds.add(t.video_id);
        woven.push(t);
      }
    }
    return woven;
  }

  function getDisplayedTracks() {
    const all = getAllTracksForCurrentView();
    if (state.searchResults !== null) return all;
    return all.slice(0, state.visibleCount);
  }

  function renderRepertoire() {
    const allTracks = getAllTracksForCurrentView();
    const tracks = state.searchResults !== null ? allTracks : allTracks.slice(0, state.visibleCount);

    if (state.searchResults !== null) {
      dom.repertoireHead.classList.remove('hidden');
      dom.repertoireHeading.textContent = state.searchLoading
        ? `Searching for “${state.searchQuery}”…`
        : `“${state.searchQuery}”`;
      dom.clearFilterBtn.textContent = 'Back';
      dom.clearFilterBtn.classList.remove('hidden');
      dom.showMoreWrap.classList.add('hidden');
    } else if (state.selectedMood) {
      // Mood context bar above already displays mood title, script, description, and All moods
      dom.repertoireHead.classList.add('hidden');
      const hasMore = allTracks.length > tracks.length;
      dom.showMoreWrap.classList.toggle('hidden', !hasMore);
      if (hasMore) dom.showMoreBtn.textContent = 'Show more';
    } else {
      dom.repertoireHead.classList.remove('hidden');
      dom.repertoireHeading.textContent = 'Start listening';
      dom.clearFilterBtn.classList.add('hidden');
      const hasMore = allTracks.length > tracks.length;
      dom.showMoreWrap.classList.toggle('hidden', !hasMore);
      if (hasMore) dom.showMoreBtn.textContent = 'Show more';
    }

    if (state.searchLoading) {
      dom.ghazalList.innerHTML = `<p class="empty-whisper">Searching YouTube for original recordings…</p>`;
      return;
    }

    if (!tracks.length) {
      dom.ghazalList.innerHTML = state.searchRejected
        ? `<p class="empty-whisper">Try Jagjit Singh, Mehdi Hassan, Ghulam Ali, Begum Akhtar, or pick a mood.</p>`
        : `<p class="empty-whisper">Nothing found locally. Tap YouTube to search original recordings.</p>`;
      return;
    }

    const activeId =
      state.currentTrack && !state.wasExplicitlyStopped ? state.currentTrack.video_id : '';
    const showPartyAdd = isHostInParty();

    dom.ghazalList.innerHTML = tracks
      .map((t) => {
        const isPlaying = t.video_id === activeId;
        const metaParts = [t.artist];
        if (t.poet) metaParts.push(t.poet);
        return `
          <div class="ghazal-row ${isPlaying ? 'is-playing' : ''}" data-vid="${esc(t.video_id)}" tabindex="0" role="button" aria-label="Play ${esc(t.title)} by ${esc(t.artist)}">
            <div class="ghazal-left">
              <span class="ghazal-marker" aria-hidden="true">${isPlaying ? SVG_ACTIVE : SVG_PLAY}</span>
              <div class="ghazal-info">
                <div class="ghazal-title">${esc(cleanTitleDisplay(t.title))}</div>
                <div class="ghazal-meta">${esc(metaParts.join('  ·  '))}</div>
              </div>
            </div>
            <div class="ghazal-right">
              ${
                showPartyAdd
                  ? `<button type="button" class="row-add-queue-btn" data-party-add="${esc(t.video_id)}" title="Add to live room queue" aria-label="Add ${esc(t.title)} to shared room queue">+</button>`
                  : ''
              }
              <button type="button" class="row-radio-link" data-seed-vid="${esc(t.video_id)}" title="Start radio from this ghazal">
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
        if (e.target.closest('[data-seed-vid]') || e.target.closest('[data-party-add]')) return;
        row.blur();
        playIt();
      });
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
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

    dom.ghazalList.querySelectorAll('[data-party-add]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        btn.blur();
        const vid = btn.dataset.partyAdd;
        const res = await apiPost(`/api/party/${encodeURIComponent(state.party.code)}/queue/add`, {
          host_token: state.party.hostToken,
          video_id: vid,
        });
        if (res.ok && res.data.state) {
          state.party.queue = res.data.state.queue || [];
          const tr = state.trackById.get(vid);
          showWhisper(`Added “${tr ? tr.title : 'ghazal'}” to room queue.`, { gentle: true, autoFadeMs: 3000 });
          if (state.drawerOpen) renderDrawerBody();
        }
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
      if (marker) marker.innerHTML = playing ? SVG_ACTIVE : SVG_PLAY;
    });
  }

  // =========================================================================
  // Sheets (Queue Drawer, Listen Together Sheet, Sleep Sheet)
  // =========================================================================

  function setDrawerOpen(open) {
    if (open) {
      setAboutSheetOpen(false);
      setPartySheetOpen(false);
      toggleSleepPopover(false);
    }
    state.drawerOpen = Boolean(open);
    dom.eveningDrawer.classList.toggle('is-open', state.drawerOpen);
    dom.eveningBackdrop.classList.toggle('hidden', !state.drawerOpen);
    if (state.drawerOpen) {
      refreshLedger();
      renderDrawerBody();
    }
  }

  function setAboutSheetOpen(open) {
    if (open) {
      setDrawerOpen(false);
      setPartySheetOpen(false);
      toggleSleepPopover(false);
    }
    state.aboutOpen = Boolean(open);
    if (dom.aboutSheet) dom.aboutSheet.classList.toggle('hidden', !state.aboutOpen);
    if (dom.aboutBackdrop) dom.aboutBackdrop.classList.toggle('hidden', !state.aboutOpen);
    if (dom.aboutHeaderBtn) dom.aboutHeaderBtn.setAttribute('aria-expanded', String(state.aboutOpen));
  }

  function setPartySheetOpen(open) {
    if (open) {
      setDrawerOpen(false);
      setAboutSheetOpen(false);
      toggleSleepPopover(false);
      if (state.userName && !dom.partyNameInput.value) {
        dom.partyNameInput.value = state.userName;
      }
      renderPartyUI();
    }
    state.partySheetOpen = Boolean(open);
    dom.partySheet.classList.toggle('hidden', !state.partySheetOpen);
    dom.partyBackdrop.classList.toggle('hidden', !state.partySheetOpen);
  }

  function toggleSleepPopover(forceOpen) {
    const open = forceOpen !== undefined ? forceOpen : !state.sleepOpen;
    if (open) {
      setDrawerOpen(false);
      setAboutSheetOpen(false);
      setPartySheetOpen(false);
    }
    state.sleepOpen = Boolean(open);
    dom.sleepPopover.classList.toggle('hidden', !state.sleepOpen);
    dom.sleepBackdrop.classList.toggle('hidden', !state.sleepOpen);
    dom.sleepBtn.setAttribute('aria-expanded', String(state.sleepOpen));
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
      const activeQueue = state.party.inRoom ? state.party.queue : state.radio.queue;
      if ((state.party.inRoom || state.radio.active) && activeQueue.length > 0) {
        const m = moodById(state.party.inRoom ? state.party.mood : state.radio.mood);
        const modeDesc = state.party.inRoom
          ? `Room ${state.party.code}. Synced queue for ${state.party.listenerCount} listening.`
          : `${state.radio.mode === 'mood' && m ? `${m.name} Radio` : 'Radio'}. All unplayed in the last 24 hours.`;
        dom.drawerBody.innerHTML = `
          <p class="drawer-lead">${esc(modeDesc)}</p>
          ${activeQueue
            .map(
              (q) => `
            <button type="button" class="drawer-row drawer-row-btn" data-q-vid="${esc(q.video_id)}">
              <div>
                <span class="drawer-row-title">${esc(cleanTitleDisplay(q.title))}</span>
                <span class="drawer-row-sub">${esc(q.artist)}${q.poet ? ' · ' + esc(q.poet) : ''}</span>
              </div>
              <span class="drawer-row-right">${formatDuration(q.duration_sec)}</span>
            </button>`
            )
            .join('')}
        `;
        dom.drawerBody.querySelectorAll('[data-q-vid]').forEach((btn) => {
          btn.addEventListener('click', () => {
            if (isGuestInParty()) {
              showWhisper(`Synced with ${state.party.hostName}. Leave room to pick solo.`, { gentle: true, autoFadeMs: 3500 });
              return;
            }
            startRadio({ mode: 'seed', seedVideoId: btn.dataset.qVid });
          });
        });
      } else {
        dom.drawerBody.innerHTML = `
          <p class="empty-whisper">Queue is empty. Start radio for a repeat-free night.</p>
          <div class="drawer-foot-action">
            <button id="drawerStartRadioBtn" type="button" class="btn-subtle-gold">${SVG_PLAY}<span>Start Radio</span></button>
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
          <p class="drawer-lead">Won’t repeat in Radio for 24 hours, even if you pause, stop, or come back later today.</p>
          ${state.ledger
            .map(
              (item) => `
            <div class="drawer-row">
              <div>
                <span class="drawer-row-title">${esc(cleanTitleDisplay(item.title || item.canonical_key))}</span>
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
          clearLocalLedger();
          const res = await apiPost('/api/radio/ledger/reset');
          if (res.ok) {
            syncLedger(res.data.radio_status);
            showWhisper('Today’s history cleared.', { gentle: true, autoFadeMs: 4000 });
          } else {
            syncLedger({ ledger: [] });
          }
        });
      }
      return;
    }

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

  function loadTrackIntoPlayer(track, { pushHistory = true, startSeconds = 0 } = {}) {
    if (!track) return;
    if (pushHistory && state.currentTrack && state.currentTrack.video_id !== track.video_id) {
      state.sessionPlayedStack.push(state.currentTrack);
      if (state.sessionPlayedStack.length > 40) state.sessionPlayedStack.shift();
    }
    state.currentTrack = track;
    state.wasExplicitlyStopped = false;
    state.showingHomeHero = false;
    state.trackById.set(track.video_id, track);

    player.loadAndPlay(track.video_id, track.duration_sec || 0, startSeconds);
    updateMediaSessionMetadata(track);
    loadLyricsForTrack(track);
    renderHearth();
    updateConsoleMeta();
    highlightActiveRows();
    if (state.drawerOpen) renderDrawerBody();
  }

  function updateMediaSessionMetadata(track) {
    if (!track || !('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: cleanTitleDisplay(track.title || ''),
        artist: track.artist || 'Mehfil',
        album: track.poet ? `Poet: ${track.poet}` : 'Mehfil',
      });
    } catch (_) {}
  }

  function initMediaSessionHandlers() {
    if (!('mediaSession' in navigator)) return;
    const handlers = [
      ['play', () => { if (player.state !== 'playing') togglePlayPause(); }],
      ['pause', () => { if (player.state === 'playing') togglePlayPause(); }],
      ['previoustrack', () => handlePrevious()],
      ['nexttrack', () => handleNext()],
    ];
    for (const [action, fn] of handlers) {
      try {
        navigator.mediaSession.setActionHandler(action, fn);
      } catch (_) {}
    }
  }

  async function playManualTrack(track, listContext = []) {
    if (!track) return;
    if (isGuestInParty()) {
      showWhisper(`Synced with ${state.party.hostName}. Leave room to play solo.`, { gentle: true, autoFadeMs: 4000 });
      return;
    }
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

    if (isHostInParty()) {
      const nextIds = state.playbackList
        .slice(state.playbackIndex + 1, state.playbackIndex + 20)
        .map((t) => t.video_id);
      await hostBroadcastUpdate({
        mode: 'playlist',
        mood: state.selectedMood || track.mood || '',
        radio_session_id: '',
        current_video_id: track.video_id,
        is_playing: true,
        is_stopped: false,
        position_sec: 0,
        queue_video_ids: nextIds,
      });
    }

    recordLocalPlay(track, 'manual');
    const res = await apiPost('/api/play', { video_id: track.video_id, client_id: state.clientId });
    if (res.ok) {
      state.protectedKeys.add(track.canonical_key);
      refreshLedger();
    }
  }

  async function startRadio({ mode = 'all', mood = '', seedVideoId = '' } = {}) {
    if (isGuestInParty()) {
      showWhisper(`Synced with ${state.party.hostName}. Leave room to start your own radio.`, { gentle: true, autoFadeMs: 4000 });
      return;
    }
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
      client_id: state.clientId,
      ...getLocalExcludePayload(),
    });
    if (reqId !== state.radioRequestSeq) return;

    if (!res.ok || !res.data.current_track) {
      showWhisper(res.data.error || 'Could not start radio right now.');
      return;
    }

    const d = res.data;
    recordLocalPlay(d.current_track, mode === 'mood' ? 'mood_radio' : 'radio');
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

    if (d.notice) showWhisper(d.notice, { gentle: true });

    updateRadioIndicators();
    renderMoodRibbon();
    loadTrackIntoPlayer(d.current_track);

    if (isHostInParty()) {
      await hostBroadcastUpdate({
        mode: d.mode === 'mood' ? 'mood_radio' : 'radio',
        mood: d.mood || '',
        radio_session_id: d.session_id,
        current_video_id: d.current_track.video_id,
        is_playing: true,
        is_stopped: false,
        position_sec: 0,
        queue_video_ids: (d.queue || []).map((q) => q.video_id),
      });
    }

    await refreshLedger();
  }

  async function advanceRadioNext() {
    if (isHostInParty()) {
      const res = await apiPost(`/api/party/${encodeURIComponent(state.party.code)}/next`, {
        host_token: state.party.hostToken,
      });
      if (res.ok && res.data.state && res.data.state.current_track) {
        const snap = res.data.state;
        state.party.version = snap.version;
        state.party.queue = snap.queue || [];
        if (snap.radio_session_id) {
          state.radio.sessionId = snap.radio_session_id;
          state.radio.queue = snap.queue || [];
        }
        recordLocalPlay(snap.current_track, 'radio');
        loadTrackIntoPlayer(snap.current_track);
        await refreshLedger();
        return;
      }
    }

    if (!state.radio.active || !state.radio.sessionId) return;
    const reqId = ++state.radioRequestSeq;

    const res = await apiPost('/api/radio/next', {
      session_id: state.radio.sessionId,
      mode: state.radio.mode,
      mood: state.radio.mood,
      last_artist: state.currentTrack ? state.currentTrack.artist : '',
      queue_video_ids: state.radio.queue.map((q) => q.video_id),
      client_id: state.clientId,
      ...getLocalExcludePayload(),
    });
    if (reqId !== state.radioRequestSeq) return;

    if (!res.ok || !res.data.current_track) {
      showWhisper('Could not fetch the next ghazal.');
      return;
    }

    const d = res.data;
    recordLocalPlay(d.current_track, state.radio.mode === 'mood' ? 'mood_radio' : 'radio');
    state.radio.sessionId = d.session_id;
    state.radio.queue = d.queue || [];
    state.radio.exhausted = Boolean(d.exhausted);
    state.radio.notice = d.notice || '';

    if (d.notice) showWhisper(d.notice, { gentle: true });

    loadTrackIntoPlayer(d.current_track);
    await refreshLedger();
  }

  async function stopPlayback() {
    if (isGuestInParty()) {
      showWhisper(`Synced with ${state.party.hostName}. Leave room to stop locally.`, { gentle: true, autoFadeMs: 3500 });
      return;
    }
    const oldSid = state.radio.sessionId;
    const wasRadio = state.radio.active;

    state.radioRequestSeq++;
    player.stop();
    state.wasExplicitlyStopped = true;

    if (isHostInParty()) {
      await hostBroadcastUpdate({ is_playing: false, is_stopped: true, position_sec: 0 });
    }

    if (wasRadio) {
      state.radio.active = false;
      state.radio.sessionId = '';
      state.radio.queue = [];
      updateRadioIndicators();
      renderMoodRibbon();
      if (oldSid) await apiPost('/api/radio/stop', { session_id: oldSid });
      showWhisper(
        'Stopped. Start radio again anytime — nothing you heard today will repeat.',
        { gentle: true, autoFadeMs: 6000 }
      );
    }

    renderHearth();
    updateConsoleMeta();
    highlightActiveRows();
    await refreshLedger();
  }

  function togglePlayPause() {
    if (isGuestInParty()) {
      if (!state.party.guestUnlockedAudio) {
        guestTapToSync();
      } else {
        showWhisper(`Synced with ${state.party.hostName}. Tap Re-sync if audio drifted.`, { gentle: true, autoFadeMs: 3500 });
      }
      return;
    }

    if (player.state === 'playing' || player.state === 'loading') {
      player.pause();
      if (isHostInParty()) {
        hostBroadcastUpdate({ is_playing: false, is_stopped: false, position_sec: player.currentTime || 0 });
      }
      return;
    }
    if (player.state === 'paused' && state.currentTrack && !state.wasExplicitlyStopped) {
      player.play();
      if (isHostInParty()) {
        hostBroadcastUpdate({ is_playing: true, is_stopped: false, position_sec: player.currentTime || 0 });
      }
      return;
    }
    if (state.wasExplicitlyStopped || !state.currentTrack) {
      startRadio(state.lastRadioConfig);
      return;
    }
    player.play();
    if (isHostInParty()) {
      hostBroadcastUpdate({ is_playing: true, is_stopped: false, position_sec: player.currentTime || 0 });
    }
  }

  function handleNext() {
    if (isGuestInParty()) {
      showWhisper(`Synced with ${state.party.hostName}. Only the host can skip.`, { gentle: true, autoFadeMs: 3500 });
      return;
    }
    if (isHostInParty()) {
      advanceRadioNext();
      return;
    }
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
    if (isGuestInParty()) return;
    if (state.currentTrack && player.currentTime > 4) {
      player.seekTo(0);
      if (isHostInParty()) hostBroadcastUpdate({ position_sec: 0, is_playing: player.state === 'playing' });
      return;
    }
    if (state.sessionPlayedStack.length > 0) {
      const prev = state.sessionPlayedStack.pop();
      loadTrackIntoPlayer(prev, { pushHistory: false });
      if (isHostInParty()) {
        hostBroadcastUpdate({
          current_video_id: prev.video_id,
          is_playing: true,
          is_stopped: false,
          position_sec: 0,
        });
      }
      return;
    }
    if (state.currentTrack) {
      player.seekTo(0);
      if (isHostInParty()) hostBroadcastUpdate({ position_sec: 0 });
    }
  }

  async function handleTrackEnded() {
    if (sleepTimer.shouldInterceptTrackEnd()) return;
    if (isGuestInParty()) return; // Wait for host's advance broadcast

    if (isHostInParty()) {
      await advanceRadioNext();
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
    if (isGuestInParty()) return;
    state.unplayableRetries++;
    if (state.unplayableRetries > 4) {
      showWhisper('Several recordings could not be played. Check your connection and try again.');
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
      if (isHostInParty()) {
        hostBroadcastUpdate({
          current_video_id: res.data.current_track.video_id,
          is_playing: true,
          position_sec: 0,
          queue_video_ids: state.radio.queue.map((q) => q.video_id),
        });
      }
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
    const isIdle = !tr || state.wasExplicitlyStopped;
    if (dom.consoleFooter) dom.consoleFooter.classList.toggle('is-idle', isIdle);
    if (dom.consoleExpandChevron) dom.consoleExpandChevron.classList.toggle('hidden', isIdle);
    if (isIdle) {
      dom.consoleTitle.textContent = 'Nothing playing';
      dom.consoleArtist.textContent = 'Pick a mood or start radio';
      dom.seekSlider.value = '0';
      dom.seekSlider.style.setProperty('--progress', '0%');
      if (dom.fpTrackTitle) dom.fpTrackTitle.textContent = 'Nothing playing';
      if (dom.fpTrackArtist) dom.fpTrackArtist.textContent = 'Pick a mood or start radio';
      if (dom.fpSeekSlider) {
        dom.fpSeekSlider.value = '0';
        dom.fpSeekSlider.style.setProperty('--progress', '0%');
      }
      return;
    }
    const cleanTitle = cleanTitleDisplay(tr.title);
    const artistLine = tr.poet ? `${tr.artist}  ·  ${tr.poet}` : tr.artist;
    dom.consoleTitle.textContent = cleanTitle;
    dom.consoleArtist.textContent = artistLine;
    if (dom.fpTrackTitle) dom.fpTrackTitle.textContent = cleanTitle;
    if (dom.fpTrackArtist) dom.fpTrackArtist.textContent = artistLine;
  }

  function updateTransportButtons(playerState) {
    const isPlaying = playerState === 'playing' || playerState === 'loading';
    dom.iconPlay.classList.toggle('hidden', isPlaying);
    dom.iconPause.classList.toggle('hidden', !isPlaying);
    dom.playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    if (dom.fpIconPlay && dom.fpIconPause && dom.fpPlayPauseBtn) {
      dom.fpIconPlay.classList.toggle('hidden', isPlaying);
      dom.fpIconPause.classList.toggle('hidden', !isPlaying);
      dom.fpPlayPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    }
  }

  function updateProgressUI(curSec, durSec) {
    const curStr = formatDuration(curSec);
    const total = durSec || (state.currentTrack ? state.currentTrack.duration_sec : 0) || 0;
    const durStr = formatDuration(total);
    dom.timeCurrent.textContent = curStr;
    dom.timeDuration.textContent = durStr;
    dom.mobileTimeCompact.textContent = `${curStr} / ${durStr}`;
    if (dom.fpTimeCurrent) dom.fpTimeCurrent.textContent = curStr;
    if (dom.fpTimeDuration) dom.fpTimeDuration.textContent = durStr;
    if (!state.isSeeking && total > 0) {
      const pct = Math.max(0, Math.min(100, (curSec / total) * 100));
      const valStr = String(Math.round(pct * 10));
      const pctStr = `${pct.toFixed(2)}%`;
      dom.seekSlider.value = valStr;
      dom.seekSlider.style.setProperty('--progress', pctStr);
      if (dom.fpSeekSlider) {
        dom.fpSeekSlider.value = valStr;
        dom.fpSeekSlider.style.setProperty('--progress', pctStr);
      }
    } else if (!state.isSeeking) {
      dom.seekSlider.value = '0';
      dom.seekSlider.style.setProperty('--progress', '0%');
      if (dom.fpSeekSlider) {
        dom.fpSeekSlider.value = '0';
        dom.fpSeekSlider.style.setProperty('--progress', '0%');
      }
    }
    syncLyricsToTime(curSec);
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
        if (isHostInParty()) {
          hostBroadcastUpdate({ is_playing: false, position_sec: player.currentTime || 0 });
        }
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
      dom.sleepBtnLabel.textContent = 'End of track';
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

  // =========================================================================
  // Ghazal-Only Search (Desktop + Mobile Expandable Bar)
  // =========================================================================

  let searchDebounce = null;

  function setMobileSearchOpen(open) {
    state.mobileSearchOpen = Boolean(open);
    dom.mobileSearchBar.classList.toggle('hidden', !state.mobileSearchOpen);
    dom.mobileSearchToggleBtn.setAttribute('aria-expanded', String(state.mobileSearchOpen));
    if (state.mobileSearchOpen) {
      dom.mobileSearchInput.value = state.searchQuery;
      setTimeout(() => dom.mobileSearchInput.focus(), 40);
    }
  }

  function clearSearchSilently() {
    clearTimeout(searchDebounce);
    dom.searchInput.value = '';
    dom.mobileSearchInput.value = '';
    dom.searchClearBtn.classList.add('hidden');
    dom.searchYtBtn.classList.add('hidden');
    state.searchQuery = '';
    state.searchResults = null;
    state.searchLoading = false;
    state.searchRejected = false;
    document.body.classList.remove('is-searching');
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
    dom.searchYtBtn.classList.remove('hidden');
    state.searchQuery = q;
    state.searchLoading = discoverYouTube;
    state.searchRejected = false;
    document.body.classList.add('is-searching');
    if (discoverYouTube) {
      state.searchResults = [];
      renderRepertoire();
    }

    const url = `/api/search?q=${encodeURIComponent(q)}&discover=${discoverYouTube ? '1' : '0'}`;
    const res = await apiGet(url);
    state.searchLoading = false;

    if (res.data && res.data.rejected) {
      state.searchRejected = true;
      state.searchResults = [];
      showWhisper(res.data.message || 'Only original ghazals here. No remakes, covers, or remixes.');
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
      'mobileSearchToggleBtn', 'mobileSearchBar', 'mobileSearchForm', 'mobileSearchInput',
      'mobileSearchYtBtn', 'mobileSearchCloseBtn',
      'partyHeaderBtn', 'partyHeaderDot', 'partyHeaderLabel',
      'eveningDrawerBtn', 'aboutHeaderBtn', 'heardCountDot', 'mainRoom',
      'whisperNotice', 'whisperText', 'dismissWhisperBtn',
      'guestJoinBanner', 'guestJoinKicker', 'guestJoinTitle', 'guestTapSyncBtn',
      'partyStatusLine', 'partyStatusText', 'partyQuickShareBtn', 'partyQuickResyncBtn', 'partyQuickLeaveBtn',
      'hearthWelcome', 'beginRadioBtn', 'heroListenTogetherBtn',
      'hearthPlaying', 'hearthModeLine', 'hearthTitle', 'hearthCredit',
      'hearthLyricsBtn', 'hearthSharePartyBtn',
      'stageContainer',
      'fullPlayer', 'fpMinimizeBtn', 'fpModeKicker', 'fpViewToggleBtn',
      'fpCinemaStage', 'fpCinemaViewport', 'fpCinemaLayerA', 'fpCinemaLayerB', 'fpCinemaCounter',
      'fpFullStage', 'fpFullList', 'fpBackToLiveBtn',
      'fpTrackTitle', 'fpTrackArtist', 'fpTimeCurrent', 'fpSeekSlider', 'fpTimeDuration',
      'fpPrevBtn', 'fpPlayPauseBtn', 'fpIconPlay', 'fpIconPause', 'fpNextBtn',
      'fpEnglishBtn', 'fpSleepBtn', 'fpTogetherBtn', 'fpQueueBtn',
      'moodRibbon', 'moodContextBar', 'moodContextTitle', 'moodContextScript',
      'moodContextDesc', 'moodRadioBtn', 'moodRadioBtnLabel', 'moodClearBtn',
      'repertoireHead', 'repertoireHeading', 'clearFilterBtn', 'ghazalList', 'showMoreWrap', 'showMoreBtn',
      'eveningBackdrop', 'eveningDrawer', 'closeEveningBtn', 'drawerBody',
      'aboutBackdrop', 'aboutSheet', 'closeAboutSheetBtn',
      'partyBackdrop', 'partySheet', 'closePartySheetBtn',
      'partySetupView', 'partyNameInput', 'createRadioPartyBtn', 'createPlaylistPartyBtn',
      'joinPartyForm', 'partyCodeInput',
      'partyActiveView', 'partyRoleBadge', 'partyCodeDisplay', 'partyListenersSummary', 'partyShareUrlReadout',
      'partyShareLinkBtn', 'partyCopyLinkBtn', 'partyHostHint', 'partyGuestActions',
      'partyManualResyncBtn', 'partyRosterList', 'partyLeaveBtn',
      'sleepBackdrop', 'sleepPopover', 'closeSleepPopoverBtn',
      'sleepActivePanel', 'sleepActiveModeLabel', 'sleepCountdownDisplay',
      'sleepExtendBtn', 'sleepCancelBtn', 'sleepCustomForm', 'sleepCustomInput', 'sleepFadeCheckbox',
      'consoleFooter', 'consoleTrackBtn', 'consoleExpandChevron', 'consoleTitle', 'consoleArtist',
      'prevBtn', 'playPauseBtn', 'iconPlay', 'iconPause', 'stopBtn', 'nextBtn',
      'timeCurrent', 'seekSlider', 'timeDuration', 'mobileTimeCompact',
      'consoleRadioBtn', 'radioGlowDot', 'consoleRadioLabel',
      'sleepBtn', 'sleepBtnLabel',
      'consolePartyBtn', 'consolePartyDot', 'consolePartyLabel',
      'muteBtn', 'iconVolOn', 'iconVolMuted', 'volumeSlider',
    ];
    for (const id of ids) {
      dom[id] = document.getElementById(id);
    }

    // Home reset (returns to main Mehfil home page without interrupting playing music)
    dom.brandHomeBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      clearSearchSilently();
      setMobileSearchOpen(false);
      setDrawerOpen(false);
      setAboutSheetOpen(false);
      setPartySheetOpen(false);
      toggleSleepPopover(false);
      if (state.fullPlayerOpen) setFullPlayerOpen(false);
      state.selectedMood = null;
      state.visibleCount = INITIAL_VISIBLE;
      state.showingHomeHero = true;
      hideWhisper();
      renderHearth();
      renderMoodRibbon();
      renderRepertoire();
      dom.mainRoom.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Primary Hearth CTAs
    dom.beginRadioBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      startRadio({ mode: 'all' });
    });
    dom.heroListenTogetherBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setPartySheetOpen(true);
    });
    dom.hearthSharePartyBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setPartySheetOpen(true);
    });
    dom.hearthLyricsBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setFullPlayerOpen(true);
    });
    dom.moodRadioBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      if (state.selectedMood) startRadio({ mode: 'mood', mood: state.selectedMood });
    });
    const clearAllFilters = (e) => {
      e.currentTarget.blur();
      clearSearchSilently();
      state.selectedMood = null;
      state.visibleCount = INITIAL_VISIBLE;
      hideWhisper();
      renderMoodRibbon();
      renderRepertoire();
    };
    dom.clearFilterBtn.addEventListener('click', clearAllFilters);
    dom.moodClearBtn.addEventListener('click', clearAllFilters);
    dom.showMoreBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      state.visibleCount += SHOW_MORE_STEP;
      renderRepertoire();
    });
    dom.dismissWhisperBtn.addEventListener('click', hideWhisper);

    // Desktop Search
    dom.searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      const val = dom.searchInput.value.trim();
      dom.mobileSearchInput.value = dom.searchInput.value;
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

    // Mobile Search Bar
    dom.mobileSearchToggleBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setMobileSearchOpen(!state.mobileSearchOpen);
    });
    dom.mobileSearchCloseBtn.addEventListener('click', () => {
      setMobileSearchOpen(false);
      if (!dom.mobileSearchInput.value.trim()) {
        clearSearchSilently();
        renderMoodRibbon();
        renderRepertoire();
      }
    });
    dom.mobileSearchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      dom.searchInput.value = dom.mobileSearchInput.value;
      const val = dom.mobileSearchInput.value.trim();
      if (!val) {
        clearSearchSilently();
        hideWhisper();
        renderMoodRibbon();
        renderRepertoire();
        return;
      }
      searchDebounce = setTimeout(() => runSearch(val, false), 220);
    });
    dom.mobileSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearTimeout(searchDebounce);
      dom.mobileSearchInput.blur();
      runSearch(dom.mobileSearchInput.value, true);
    });

    // Listen Together bindings
    dom.partyHeaderBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setPartySheetOpen(true);
    });
    dom.consolePartyBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setPartySheetOpen(true);
    });
    dom.closePartySheetBtn.addEventListener('click', () => setPartySheetOpen(false));
    dom.partyBackdrop.addEventListener('click', () => setPartySheetOpen(false));
    dom.createRadioPartyBtn.addEventListener('click', () => createParty('radio'));
    dom.createPlaylistPartyBtn.addEventListener('click', () => createParty('playlist'));
    dom.joinPartyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      connectToRoom(dom.partyCodeInput.value, { fromUrl: false });
    });
    dom.guestTapSyncBtn.addEventListener('click', () => guestTapToSync());
    dom.partyShareLinkBtn.addEventListener('click', () => sharePartyInvite(false));
    dom.partyCopyLinkBtn.addEventListener('click', () => sharePartyInvite(true));
    dom.partyQuickShareBtn.addEventListener('click', () => sharePartyInvite(false));
    dom.partyQuickResyncBtn.addEventListener('click', () => guestTapToSync());
    dom.partyManualResyncBtn.addEventListener('click', () => {
      guestTapToSync();
      setPartySheetOpen(false);
    });
    dom.partyQuickLeaveBtn.addEventListener('click', () => leaveParty());
    dom.partyLeaveBtn.addEventListener('click', () => leaveParty());

    // About Sheet
    if (dom.aboutHeaderBtn) {
      dom.aboutHeaderBtn.addEventListener('click', (e) => {
        e.currentTarget.blur();
        setAboutSheetOpen(!state.aboutOpen);
      });
    }
    if (dom.closeAboutSheetBtn) {
      dom.closeAboutSheetBtn.addEventListener('click', () => setAboutSheetOpen(false));
    }
    if (dom.aboutBackdrop) {
      dom.aboutBackdrop.addEventListener('click', () => setAboutSheetOpen(false));
    }

    // Queue Drawer
    dom.eveningDrawerBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setDrawerOpen(!state.drawerOpen);
    });
    dom.consoleTrackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.currentTarget.blur();
      setFullPlayerOpen(true);
    });
    // Clicking anywhere on the bottom player box (outside buttons/sliders/links) expands the lyrical player
    dom.consoleFooter.addEventListener('click', (e) => {
      if (e.target.closest('button, input, a, .scrubber')) return;
      setFullPlayerOpen(true);
    });

    // Full-Screen Lyrical Player bindings
    dom.fpMinimizeBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setFullPlayerOpen(false);
    });
    dom.fpViewToggleBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setFullPlayerTab(state.fullPlayerTab === 'full' ? 'cinema' : 'full');
    });
    dom.fpEnglishBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      state.showEnglish = !state.showEnglish;
      renderFullPlayerStage();
      syncLyricsToTime(player ? player.currentTime : 0, { immediate: true });
    });
    dom.fpSleepBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.currentTarget.blur();
      toggleSleepPopover(true);
    });
    dom.fpTogetherBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setPartySheetOpen(true);
    });
    dom.fpQueueBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      setDrawerTab('queue');
      setDrawerOpen(true);
    });
    dom.fpPrevBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      handlePrevious();
    });
    dom.fpPlayPauseBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      togglePlayPause();
    });
    dom.fpNextBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      handleNext();
    });
    dom.fpFullStage.addEventListener('wheel', () => {
      if (state.lyricsData && state.lyricsData.mode === 'synced') {
        state.lyricsUserScrolled = true;
        dom.fpBackToLiveBtn.classList.remove('hidden');
      }
    }, { passive: true });
    dom.fpFullStage.addEventListener('touchmove', () => {
      if (state.lyricsData && state.lyricsData.mode === 'synced') {
        state.lyricsUserScrolled = true;
        dom.fpBackToLiveBtn.classList.remove('hidden');
      }
    }, { passive: true });
    dom.fpBackToLiveBtn.addEventListener('click', () => {
      state.lyricsUserScrolled = false;
      dom.fpBackToLiveBtn.classList.add('hidden');
      syncLyricsToTime(player ? player.currentTime : 0, { immediate: true });
    });
    dom.fpSeekSlider.addEventListener('pointerdown', () => {
      state.isSeeking = true;
    });
    dom.fpSeekSlider.addEventListener('input', () => {
      const total = player.duration || (state.currentTrack ? state.currentTrack.duration_sec : 0) || 0;
      const pct = Number(dom.fpSeekSlider.value) / 10;
      dom.fpSeekSlider.style.setProperty('--progress', `${pct.toFixed(2)}%`);
      const preview = formatDuration((Number(dom.fpSeekSlider.value) / 1000) * total);
      dom.fpTimeCurrent.textContent = preview;
      dom.timeCurrent.textContent = preview;
      dom.mobileTimeCompact.textContent = `${preview} / ${formatDuration(total)}`;
    });
    dom.fpSeekSlider.addEventListener('change', () => {
      const total = player.duration || (state.currentTrack ? state.currentTrack.duration_sec : 0) || 0;
      const targetSec = (Number(dom.fpSeekSlider.value) / 1000) * total;
      state.isSeeking = false;
      dom.fpSeekSlider.blur();
      if (isGuestInParty()) {
        showWhisper(`Synced with ${state.party.hostName}.`, { gentle: true, autoFadeMs: 2500 });
        return;
      }
      player.seekTo(targetSec);
      syncLyricsToTime(targetSec, { immediate: true });
      if (isHostInParty()) {
        hostBroadcastUpdate({ position_sec: targetSec, is_playing: player.state === 'playing' });
      }
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
      const pct = Number(dom.seekSlider.value) / 10;
      dom.seekSlider.style.setProperty('--progress', `${pct.toFixed(2)}%`);
      const preview = formatDuration((Number(dom.seekSlider.value) / 1000) * total);
      dom.timeCurrent.textContent = preview;
      dom.mobileTimeCompact.textContent = `${preview} / ${formatDuration(total)}`;
    });
    dom.seekSlider.addEventListener('change', () => {
      const total = player.duration || (state.currentTrack ? state.currentTrack.duration_sec : 0) || 0;
      const targetSec = (Number(dom.seekSlider.value) / 1000) * total;
      state.isSeeking = false;
      if (isGuestInParty()) {
        showWhisper(`Synced with ${state.party.hostName}.`, { gentle: true, autoFadeMs: 2500 });
        return;
      }
      player.seekTo(targetSec);
      dom.seekSlider.blur();
      if (isHostInParty()) {
        hostBroadcastUpdate({ position_sec: targetSec, is_playing: player.state === 'playing' });
      }
    });
    window.addEventListener('pointerup', () => {
      state.isSeeking = false;
    });

    // Volume
    const toggleMuteUI = () => {
      const muted = player.toggleMute();
      dom.iconVolOn.classList.toggle('hidden', muted);
      dom.iconVolMuted.classList.toggle('hidden', !muted);
    };
    dom.volumeSlider.addEventListener('input', () => {
      const vol = Number(dom.volumeSlider.value);
      player.setVolume(vol);
      sleepTimer.notifyUserVolumeChanged(vol);
      dom.iconVolOn.classList.toggle('hidden', player.muted || vol === 0);
      dom.iconVolMuted.classList.toggle('hidden', !(player.muted || vol === 0));
    });
    dom.volumeSlider.addEventListener('change', () => {
      dom.volumeSlider.blur();
    });
    dom.muteBtn.addEventListener('click', (e) => {
      e.currentTarget.blur();
      toggleMuteUI();
    });

    // Sleep Timer
    dom.sleepBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.currentTarget.blur();
      toggleSleepPopover();
    });
    dom.closeSleepPopoverBtn.addEventListener('click', () => toggleSleepPopover(false));
    dom.sleepBackdrop.addEventListener('click', () => toggleSleepPopover(false));

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
        showWhisper('Choose between 1 and 240 minutes.', { autoFadeMs: 3500 });
        return;
      }
      sleepTimer.startMinutes(mins, { fadeOut: dom.sleepFadeCheckbox.checked });
      dom.sleepCustomInput.value = '';
      toggleSleepPopover(false);
    });
    dom.sleepExtendBtn.addEventListener('click', () => sleepTimer.extendMinutes(10));
    dom.sleepCancelBtn.addEventListener('click', () => sleepTimer.cancel());

    // Keyboard shortcuts
    const isTypingTarget = (el) => {
      if (!el) return false;
      if (el.isContentEditable) return true;
      const tag = el.tagName || '';
      if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
      if (tag === 'INPUT') {
        const type = (el.type || 'text').toLowerCase();
        return !['range', 'checkbox', 'radio', 'button', 'submit'].includes(type);
      }
      return false;
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.sleepOpen || state.partySheetOpen || state.drawerOpen || state.aboutOpen || state.mobileSearchOpen) {
          toggleSleepPopover(false);
          setPartySheetOpen(false);
          setDrawerOpen(false);
          setAboutSheetOpen(false);
          setMobileSearchOpen(false);
        } else if (state.fullPlayerOpen) {
          setFullPlayerOpen(false);
        }
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      if (e.code === 'Space' || e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlayPause();
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
        return;
      }

      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        setFullPlayerOpen(!state.fullPlayerOpen);
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMuteUI();
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileSearchOpen(true);
        } else if (dom.searchInput) {
          dom.searchInput.focus();
          dom.searchInput.select();
        }
      }
    });

    // Cleanly announce leaving on tab close
    window.addEventListener('beforeunload', () => {
      if (state.party.inRoom && state.party.code && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify({ client_id: state.clientId })], { type: 'application/json' });
        navigator.sendBeacon(resolveApiUrl(`/api/party/${encodeURIComponent(state.party.code)}/leave`), blob);
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
    initMediaSessionHandlers();
    bootstrap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
