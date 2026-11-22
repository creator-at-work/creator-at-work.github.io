/**
 * Mehfil Static Client-Side Engine
 *
 * Mirrors server.py + radio_engine.py + ghazal_guard.py + db.py for static
 * hosting (GitHub Pages) using ./data/catalog.json and localStorage for the
 * persistent 24-hour zero-repetition Radio ledger.
 */
(function () {
  const COOLDOWN_MS = 24 * 60 * 60 * 1000;
  const DEFAULT_QUEUE_SIZE = 7;
  const STORAGE_HISTORY = 'mehfil_v1_history';
  const STORAGE_UNPLAYABLE = 'mehfil_v1_unplayable';

  const MOOD_ORDER = ['bireh', 'naraazgi', 'izhaar', 'tanhai', 'maikada'];
  const MOOD_DEFINITIONS = {
    bireh: {
      id: 'bireh',
      name: 'Bireh',
      script: 'برہ · विरह',
      subtitle: 'Separation & Longing',
      description: 'Distance, waiting, and the ache of someone not there.',
      neighbors: ['tanhai', 'naraazgi'],
    },
    naraazgi: {
      id: 'naraazgi',
      name: 'Naraazgi',
      script: 'ناراضگی · नाराज़गी',
      subtitle: 'Complaint & Distance',
      description: 'Shikwa, quiet resentment, and things left unsaid.',
      neighbors: ['bireh', 'tanhai'],
    },
    izhaar: {
      id: 'izhaar',
      name: 'Izhaar',
      script: 'اظہار · इज़हार',
      subtitle: 'Confession & Love',
      description: 'First glances, quiet devotion, and admitting how you feel.',
      neighbors: ['maikada', 'bireh'],
    },
    tanhai: {
      id: 'tanhai',
      name: 'Tanhai',
      script: 'تنہائی · तन्हाई',
      subtitle: 'Solitude & Night',
      description: 'Late hours, stillness, and sitting alone with your thoughts.',
      neighbors: ['bireh', 'naraazgi'],
    },
    maikada: {
      id: 'maikada',
      name: 'Maikada',
      script: 'میکدہ · मयकदा',
      subtitle: 'Wine & Mehfil',
      description: 'Saqi, jaam, sharp wit, and late-night gatherings.',
      neighbors: ['izhaar', 'tanhai'],
    },
  };

  const REJECTED_QUERY_PATTERNS = [
    /\b(rap|hip[\s-]?hop|edm|techno|dubstep|rock|metal|k[\s-]?pop|pop song|jazz|reggae)\b/i,
    /\b(dj|remix|mashup|cover|remake|reprise|recreated|lofi|lo-fi|slowed|reverb|karaoke|unplugged)\b/i,
    /\b(item song|party|workout|gym|club|dance|bhangra|garba|dandiya|phonk|nightcore|jukebox)\b/i,
    /\b(podcast|news|cricket|ipl|football|nba|gaming|vlog|comedy|standup|prank|trailer)\b/i,
    /\b(tutorial|coding|python|javascript|react|math|physics|recipe|cooking|stock|crypto)\b/i,
    /\b(taylor swift|eminem|drake|badshah|honey singh|neha kakkar|tony kakkar|mc stan)\b/i,
    /\b(diljit|karan aujla|sidhu moose|ap dhillon|justin bieber|billie eilish|bts|blackpink)\b/i,
    /\b(coldplay|ed sheeran|weeknd|ariana grande|kanye|kendrick|metallica|linkin park)\b/i,
    /\b(arijit singh|jubin nautiyal|shreya ghoshal|atif aslam|b praak|darshan raval|indian idol)\b/i,
    /\b(bhajan|aarti|chalisa|mantra|kirtan|bollywood dance|bhojpuri|haryanvi|punjabi hits)\b/i,
  ];

  const REMAKE_HINT_RE = /\b(cover|remake|remix|reprise|lofi|lo-fi|unplugged|arijit|jubin)\b/i;

  let catalogPromise = null;
  let allTracks = [];
  let trackById = new Map();
  const sessions = new Map();

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage quota / private-mode errors
    }
  }

  function getUnplayableSet() {
    const arr = readJSON(STORAGE_UNPLAYABLE, []);
    return new Set(Array.isArray(arr) ? arr : []);
  }

  function markUnplayable(videoId) {
    const set = getUnplayableSet();
    set.add(videoId);
    writeJSON(STORAGE_UNPLAYABLE, Array.from(set));
    const tr = trackById.get(videoId);
    if (tr) tr.embeddable = 0;
  }

  function getHistory() {
    const arr = readJSON(STORAGE_HISTORY, []);
    return Array.isArray(arr) ? arr : [];
  }

  function saveHistory(items) {
    // Keep up to 600 recent entries
    const trimmed = items.slice(-600);
    writeJSON(STORAGE_HISTORY, trimmed);
  }

  function recordPlay(track, source, sessionId, ts) {
    const hist = getHistory();
    hist.push({
      id: `${ts}-${Math.random().toString(36).slice(2, 8)}`,
      video_id: track.video_id,
      canonical_key: track.canonical_key,
      history_mood: track.mood || '',
      source: source || 'radio',
      session_id: sessionId || '',
      played_at_ms: ts,
    });
    saveHistory(hist);
  }

  function clearHistory() {
    writeJSON(STORAGE_HISTORY, []);
  }

  function getRecentPlayedSets(ts) {
    const cutoff = ts - COOLDOWN_MS;
    const recentVids = new Set();
    const recentKeys = new Set();
    for (const h of getHistory()) {
      if ((h.played_at_ms || 0) >= cutoff) {
        if (h.video_id) recentVids.add(h.video_id);
        if (h.canonical_key) recentKeys.add(h.canonical_key);
      }
    }
    return { recentVids, recentKeys };
  }

  function getLedger(ts, limit = 120) {
    const cutoff = ts - COOLDOWN_MS;
    const hist = getHistory()
      .filter((h) => (h.played_at_ms || 0) >= cutoff)
      .sort((a, b) => (b.played_at_ms || 0) - (a.played_at_ms || 0))
      .slice(0, limit);

    return hist.map((h) => {
      const tr = trackById.get(h.video_id) || {};
      return {
        ...h,
        title: tr.title || h.canonical_key || '',
        artist: tr.artist || '',
        poet: tr.poet || '',
        mood: tr.mood || h.history_mood || '',
        duration_sec: tr.duration_sec || 0,
        cooldown_remaining_ms: Math.max(0, (h.played_at_ms || 0) + COOLDOWN_MS - ts),
      };
    });
  }

  async function ensureCatalog() {
    if (catalogPromise) return catalogPromise;
    catalogPromise = (async () => {
      const resp = await fetch('./data/catalog.json', { cache: 'no-cache' });
      if (!resp.ok) throw new Error('Could not load ghazal catalog');
      const raw = await resp.json();
      const unplayable = getUnplayableSet();
      allTracks = (Array.isArray(raw) ? raw : []).map((t) => ({
        ...t,
        embeddable: unplayable.has(t.video_id) ? 0 : t.embeddable !== 0 ? 1 : 0,
      }));
      trackById = new Map(allTracks.map((t) => [t.video_id, t]));
      return allTracks;
    })();
    return catalogPromise;
  }

  function playableTracks() {
    return allTracks.filter((t) => t.embeddable !== 0);
  }

  function getMoodCounts() {
    const counts = {};
    for (const mid of MOOD_ORDER) counts[mid] = 0;
    for (const t of playableTracks()) {
      if (t.mood && counts[t.mood] !== undefined) counts[t.mood]++;
    }
    return counts;
  }

  function listUstadsAndPoets() {
    const uMap = new Map();
    const pMap = new Map();
    for (const t of playableTracks()) {
      if (t.artist) uMap.set(t.artist, (uMap.get(t.artist) || 0) + 1);
      if (t.poet) pMap.set(t.poet, (pMap.get(t.poet) || 0) + 1);
    }
    const ustads = Array.from(uMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    const poets = Array.from(pMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    return { ustads, poets };
  }

  function validateSearchQuery(query) {
    const q = (query || '').trim();
    if (!q) return { ok: false, reason: 'Type a ghazal, singer, poet, or mood.' };
    if (q.length > 120) {
      return { ok: false, reason: 'Keep your search short — a ghazal, singer, or poet.' };
    }
    for (const pat of REJECTED_QUERY_PATTERNS) {
      if (pat.test(q)) {
        if (REMAKE_HINT_RE.test(q)) {
          return {
            ok: false,
            reason:
              'Only original ghazal recordings here — no remakes, covers, or remixes. Try Jagjit Singh, Mehdi Hassan, Ghulam Ali, Begum Akhtar, or Farida Khanum.',
          };
        }
        return {
          ok: false,
          reason:
            'Only ghazals here. Try Jagjit Singh, Mehdi Hassan, Ghulam Ali, Ghalib, Faiz, or a mood like Bireh.',
        };
      }
    }
    return { ok: true, reason: '' };
  }

  function filterTracks({ mood = '', artist = '', poet = '', query = '', includeSecondary = true } = {}) {
    let list = playableTracks();
    if (mood) {
      list = list.filter(
        (t) => t.mood === mood || (includeSecondary && t.secondary_mood === mood)
      );
    }
    if (artist) {
      const aLow = artist.toLowerCase();
      list = list.filter((t) => (t.artist || '').toLowerCase().includes(aLow));
    }
    if (poet) {
      const pLow = poet.toLowerCase();
      list = list.filter((t) => (t.poet || '').toLowerCase().includes(pLow));
    }
    if (query) {
      const qLow = query.toLowerCase();
      const tokens = qLow.split(/\s+/).filter(Boolean);
      list = list.filter((t) => {
        const hay = [
          t.title,
          t.artist,
          t.poet,
          t.matla,
          t.matla_translation,
          t.mood,
          t.secondary_mood,
          t.archival_note,
        ]
          .join(' ')
          .toLowerCase();
        return tokens.every((tok) => hay.includes(tok));
      });
    }
    return list;
  }

  // ---- Radio Engine ----

  function candidatePools(mode, mood, seedTrack) {
    const tracks = playableTracks();
    if (!tracks.length) return [];

    if (mode === 'mood' && MOOD_DEFINITIONS[mood]) {
      const primary = tracks.filter((t) => t.mood === mood);
      const secondary = tracks.filter((t) => t.mood !== mood && t.secondary_mood === mood);
      const neighbors = MOOD_DEFINITIONS[mood].neighbors || [];
      const neighborTracks = tracks.filter(
        (t) => neighbors.includes(t.mood) && t.mood !== mood && t.secondary_mood !== mood
      );
      const rest = tracks.filter(
        (t) => t.mood !== mood && t.secondary_mood !== mood && !neighbors.includes(t.mood)
      );
      return [
        ['mood_primary', primary],
        ['mood_secondary', secondary],
        ['mood_neighbor_expanded', neighborTracks],
        ['library_expanded', rest],
      ];
    }

    if (mode === 'seed' && seedTrack) {
      const smood = seedTrack.mood || '';
      const neighbors = (MOOD_DEFINITIONS[smood] && MOOD_DEFINITIONS[smood].neighbors) || [];
      const sameMood = tracks.filter(
        (t) => t.mood === smood || t.secondary_mood === smood
      );
      const sameSet = new Set(sameMood.map((t) => t.video_id));
      const nearMood = tracks.filter(
        (t) => neighbors.includes(t.mood) && !sameSet.has(t.video_id)
      );
      const nearSet = new Set(nearMood.map((t) => t.video_id));
      const others = tracks.filter(
        (t) => !sameSet.has(t.video_id) && !nearSet.has(t.video_id)
      );
      return [
        ['seed_affinity', sameMood],
        ['seed_neighbor', nearMood],
        ['seed_all', others],
      ];
    }

    return [['all_ghazals', tracks]];
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickFromCandidates(candidates, exclVids, exclKeys, lastArtist) {
    const eligible = candidates.filter(
      (t) => !exclVids.has(t.video_id) && !exclKeys.has(t.canonical_key)
    );
    if (!eligible.length) return null;
    if (lastArtist) {
      const diff = eligible.filter(
        (t) => (t.artist || '').toLowerCase() !== lastArtist.toLowerCase()
      );
      if (diff.length) return pickRandom(diff);
    }
    return pickRandom(eligible);
  }

  function selectNextTrack({ mode, mood, seedTrack, exclVids, exclKeys, queuedVids, queuedKeys, lastArtist }) {
    const allExclVids = new Set([...exclVids, ...queuedVids]);
    const allExclKeys = new Set([...exclKeys, ...queuedKeys]);

    for (const [tier, pool] of candidatePools(mode, mood, seedTrack)) {
      const chosen = pickFromCandidates(pool, allExclVids, allExclKeys, lastArtist);
      if (chosen) return { track: chosen, tier };
    }

    // Strict LRU fallback if entire catalog was played within 24h
    const tracks = playableTracks().filter(
      (t) => !queuedVids.has(t.video_id) && !queuedKeys.has(t.canonical_key)
    );
    if (!tracks.length) return { track: null, tier: 'empty' };

    const lastPlayedByKey = new Map();
    for (const h of getHistory()) {
      const prev = lastPlayedByKey.get(h.canonical_key) || 0;
      if ((h.played_at_ms || 0) > prev) lastPlayedByKey.set(h.canonical_key, h.played_at_ms || 0);
    }
    tracks.sort(
      (a, b) =>
        (lastPlayedByKey.get(a.canonical_key) || 0) -
        (lastPlayedByKey.get(b.canonical_key) || 0)
    );
    return { track: tracks[0], tier: 'full_library_lru' };
  }

  function refillQueue(session, targetSize, ts, extraVids, extraKeys) {
    const { recentVids, recentKeys } = getRecentPlayedSets(ts);
    const exclVids = new Set([...recentVids, ...extraVids]);
    const exclKeys = new Set([...recentKeys, ...extraKeys]);
    const queuedVids = new Set();
    const queuedKeys = new Set();
    const queueTracks = [];

    for (const vid of session.queue || []) {
      const tr = trackById.get(vid);
      if (!tr || tr.embeddable === 0) continue;
      if (exclVids.has(tr.video_id) || exclKeys.has(tr.canonical_key)) continue;
      if (queuedVids.has(tr.video_id) || queuedKeys.has(tr.canonical_key)) continue;
      queueTracks.push(tr);
      queuedVids.add(tr.video_id);
      queuedKeys.add(tr.canonical_key);
    }

    let lastArtist = queueTracks.length
      ? queueTracks[queueTracks.length - 1].artist
      : session.last_artist || '';
    const seedTrack = session.seed_video_id ? trackById.get(session.seed_video_id) : null;
    let lastTier = 'queued';

    while (queueTracks.length < targetSize) {
      const { track, tier } = selectNextTrack({
        mode: session.mode,
        mood: session.mood,
        seedTrack,
        exclVids,
        exclKeys,
        queuedVids,
        queuedKeys,
        lastArtist,
      });
      if (!track) break;
      queueTracks.push(track);
      queuedVids.add(track.video_id);
      queuedKeys.add(track.canonical_key);
      lastArtist = track.artist || '';
      lastTier = tier;
    }

    session.queue = queueTracks.map((t) => t.video_id);
    return { queueTracks, refillTier: lastTier };
  }

  function getStatus(ts = Date.now()) {
    const ledger = getLedger(ts, 120);
    const { recentVids, recentKeys } = getRecentPlayedSets(ts);
    const total = playableTracks().length;
    return {
      cooldown_hours: COOLDOWN_MS / 3600000,
      total_catalog_tracks: total,
      protected_unique_ghazals: recentKeys.size,
      protected_video_ids: recentVids.size,
      eligible_remaining: Math.max(0, total - recentKeys.size),
      ledger,
    };
  }

  function startRadio({ mode = 'all', mood = '', seed_video_id = '' } = {}) {
    const ts = Date.now();
    const cleanMode = ['all', 'mood', 'seed'].includes(mode) ? mode : 'all';
    const seedTrack = seed_video_id ? trackById.get(seed_video_id) : null;
    const { recentVids, recentKeys } = getRecentPlayedSets(ts);

    let currentTrack = null;
    let tier = 'all_ghazals';

    if (cleanMode === 'seed' && seedTrack && seedTrack.embeddable !== 0) {
      currentTrack = seedTrack;
      tier = 'seed_requested';
    } else {
      const picked = selectNextTrack({
        mode: cleanMode,
        mood,
        seedTrack,
        exclVids: recentVids,
        exclKeys: recentKeys,
        queuedVids: new Set(),
        queuedKeys: new Set(),
        lastArtist: '',
      });
      currentTrack = picked.track;
      tier = picked.tier;
    }

    if (!currentTrack) {
      return {
        status: 404,
        data: { error: 'No playable ghazals available.', current_track: null, queue: [] },
      };
    }

    let exhausted = false;
    let notice = '';
    if (tier === 'mood_neighbor_expanded' || tier === 'library_expanded') {
      exhausted = true;
      const mname = (MOOD_DEFINITIONS[mood] && MOOD_DEFINITIONS[mood].name) || mood;
      notice = `All ghazals in ${mname} have been played within the last 24 hours. Continuing with unplayed ghazals from kindred moods to preserve zero repetition.`;
    } else if (tier === 'full_library_lru') {
      exhausted = true;
      notice =
        'Every ghazal in this sanctuary has been played within the last 24 hours. Serving your least-recently-heard ghazal first.';
    }

    const sessionId = `s-${ts}-${Math.random().toString(36).slice(2, 8)}`;
    const sourceTag =
      cleanMode === 'mood' ? 'mood_radio' : cleanMode === 'seed' ? 'seed_radio' : 'radio';
    recordPlay(currentTrack, sourceTag, sessionId, ts);

    const session = {
      session_id: sessionId,
      mode: cleanMode,
      mood: cleanMode === 'mood' ? mood : seedTrack ? seedTrack.mood || '' : '',
      seed_video_id: seed_video_id || '',
      queue: [],
      last_artist: currentTrack.artist || '',
      exhausted,
      is_active: true,
    };

    const { queueTracks, refillTier } = refillQueue(
      session,
      DEFAULT_QUEUE_SIZE,
      ts,
      new Set([currentTrack.video_id]),
      new Set([currentTrack.canonical_key])
    );
    if (!notice && refillTier === 'full_library_lru') {
      notice = 'Approaching full 24-hour catalog rotation; oldest-heard ghazals queued next.';
    }

    sessions.set(sessionId, session);

    return {
      status: 200,
      data: {
        session_id: sessionId,
        mode: cleanMode,
        mood: session.mood,
        seed_video_id: session.seed_video_id,
        current_track: currentTrack,
        queue: queueTracks,
        exhausted,
        notice,
        cooldown_hours: COOLDOWN_MS / 3600000,
        protected_count: recentKeys.size + 1,
      },
    };
  }

  function nextTrack({ session_id = '' } = {}) {
    const ts = Date.now();
    const session = sessions.get(session_id);
    if (!session) return startRadio({ mode: 'all' });

    const { recentVids, recentKeys } = getRecentPlayedSets(ts);
    let chosen = null;
    const remaining = [...(session.queue || [])];
    while (remaining.length) {
      const vid = remaining.shift();
      const tr = trackById.get(vid);
      if (!tr || tr.embeddable === 0) continue;
      if (recentVids.has(tr.video_id) || recentKeys.has(tr.canonical_key)) continue;
      chosen = tr;
      break;
    }
    session.queue = remaining;

    let tier = 'queued';
    let notice = '';
    let exhausted = false;

    if (!chosen) {
      const seedTrack = session.seed_video_id ? trackById.get(session.seed_video_id) : null;
      const picked = selectNextTrack({
        mode: session.mode,
        mood: session.mood,
        seedTrack,
        exclVids: recentVids,
        exclKeys: recentKeys,
        queuedVids: new Set(),
        queuedKeys: new Set(),
        lastArtist: session.last_artist || '',
      });
      chosen = picked.track;
      tier = picked.tier;
    }

    if (!chosen) {
      return {
        status: 404,
        data: { error: 'No playable ghazals available.', session_id, current_track: null, queue: [] },
      };
    }

    if (tier === 'queued' && session.mode === 'mood') {
      if (chosen.mood !== session.mood && chosen.secondary_mood !== session.mood) {
        tier = 'mood_neighbor_expanded';
      }
    }

    if (tier === 'mood_neighbor_expanded' || tier === 'library_expanded') {
      exhausted = true;
      const mname = (MOOD_DEFINITIONS[session.mood] && MOOD_DEFINITIONS[session.mood].name) || session.mood;
      notice = `All ghazals in ${mname} have been played within the last 24 hours. Continuing with unplayed ghazals from kindred moods.`;
    } else if (tier === 'full_library_lru') {
      exhausted = true;
      notice =
        'Every ghazal in this sanctuary has been played within the last 24 hours. Serving your least-recently-heard ghazal next.';
    }

    const sourceTag =
      session.mode === 'mood' ? 'mood_radio' : session.mode === 'seed' ? 'seed_radio' : 'radio';
    recordPlay(chosen, sourceTag, session_id, ts);

    session.last_artist = chosen.artist || '';
    session.exhausted = exhausted;
    session.is_active = true;

    const { queueTracks } = refillQueue(
      session,
      DEFAULT_QUEUE_SIZE,
      ts,
      new Set([chosen.video_id]),
      new Set([chosen.canonical_key])
    );

    return {
      status: 200,
      data: {
        session_id,
        mode: session.mode,
        mood: session.mood,
        current_track: chosen,
        queue: queueTracks,
        exhausted,
        notice,
        protected_count: recentKeys.size + 1,
      },
    };
  }

  function stopRadio({ session_id = '' } = {}) {
    const session = sessions.get(session_id);
    if (session) session.is_active = false;
    const { recentKeys } = getRecentPlayedSets(Date.now());
    return {
      status: 200,
      data: { stopped: true, session_id, protected_count: recentKeys.size },
    };
  }

  function recordManualPlay({ video_id = '' } = {}) {
    const ts = Date.now();
    const tr = trackById.get(video_id);
    if (!tr) return { status: 200, data: { recorded: false } };
    recordPlay(tr, 'manual', '', ts);
    const { recentKeys } = getRecentPlayedSets(ts);
    return {
      status: 200,
      data: { recorded: true, video_id, protected_count: recentKeys.size },
    };
  }

  function handleUnplayable({ video_id = '', session_id = '' } = {}) {
    if (!video_id) return { status: 400, data: { error: 'video_id required' } };
    markUnplayable(video_id);
    if (session_id) {
      const session = sessions.get(session_id);
      if (session && session.is_active) {
        session.queue = (session.queue || []).filter((v) => v !== video_id);
        return nextTrack({ session_id });
      }
    }
    return { status: 200, data: { marked_unplayable: video_id } };
  }

  async function get(url) {
    await ensureCatalog();
    const parsed = new URL(url, window.location.origin);
    const path = parsed.pathname;
    const qs = parsed.searchParams;

    if (path === '/api/bootstrap') {
      const counts = getMoodCounts();
      const moods = MOOD_ORDER.map((mid) => ({
        ...MOOD_DEFINITIONS[mid],
        count: counts[mid] || 0,
      }));
      const directory = listUstadsAndPoets();
      return {
        ok: true,
        status: 200,
        data: {
          moods,
          tracks: playableTracks(),
          ustads: directory.ustads,
          poets: directory.poets,
          radio_status: getStatus(),
          static_mode: true,
        },
      };
    }

    if (path === '/api/radio/ledger') {
      return { ok: true, status: 200, data: getStatus() };
    }

    if (path === '/api/tracks') {
      const tracks = filterTracks({
        mood: (qs.get('mood') || '').trim().toLowerCase(),
        artist: (qs.get('artist') || '').trim(),
        poet: (qs.get('poet') || '').trim(),
        query: (qs.get('q') || '').trim(),
        includeSecondary: qs.get('strict_mood') !== '1',
      });
      return { ok: true, status: 200, data: { tracks, count: tracks.length } };
    }

    if (path === '/api/search') {
      const q = (qs.get('q') || '').trim();
      const check = validateSearchQuery(q);
      if (!check.ok) {
        return {
          ok: false,
          status: 400,
          data: {
            rejected: true,
            message: check.reason,
            local_tracks: [],
            youtube_tracks: [],
          },
        };
      }
      const localTracks = filterTracks({ query: q });
      return {
        ok: true,
        status: 200,
        data: {
          rejected: false,
          query: q,
          local_tracks: localTracks,
          youtube_tracks: [],
        },
      };
    }

    return { ok: false, status: 404, data: { error: 'Not found' } };
  }

  async function post(url, payload = {}) {
    await ensureCatalog();
    const parsed = new URL(url, window.location.origin);
    const path = parsed.pathname;

    if (path === '/api/radio/start') {
      const res = startRadio(payload);
      return { ok: res.status === 200, status: res.status, data: res.data };
    }
    if (path === '/api/radio/next') {
      const res = nextTrack(payload);
      return { ok: res.status === 200, status: res.status, data: res.data };
    }
    if (path === '/api/radio/stop') {
      const res = stopRadio(payload);
      return { ok: res.status === 200, status: res.status, data: res.data };
    }
    if (path === '/api/play') {
      const res = recordManualPlay(payload);
      return { ok: res.status === 200, status: res.status, data: res.data };
    }
    if (path === '/api/tracks/unplayable') {
      const res = handleUnplayable(payload);
      return { ok: res.status === 200, status: res.status, data: res.data };
    }
    if (path === '/api/radio/ledger/reset') {
      clearHistory();
      return {
        ok: true,
        status: 200,
        data: { cleared: true, radio_status: getStatus() },
      };
    }

    return { ok: false, status: 404, data: { error: 'Not found' } };
  }

  window.MEHFIL_STATIC_ENGINE = { get, post };
})();
