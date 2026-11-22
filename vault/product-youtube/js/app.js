(() => {
  "use strict";

  const state = {
    view: "feed",
    stats: null,
    feed: {
      topic: "All",
      creator: "",
      sort: "likes",
      items: [],
      total: 0,
      offset: 0,
      limit: 36,
    },
    search: {
      query: "",
      sort: "likes",
      items: [],
      total: 0,
      hasSearched: false,
    },
    marathon: {
      topic: "Product Strategy",
      minutes: 90,
      pacing: "balanced",
      excludeIds: [],
      program: null,
      playingIdx: 0,
    },
    currentModalVideo: null,
    ytApiReady: false,
    ytPlayer: null,
    pendingMarathonPlay: false,
    engine: null,
    hasLocalApi: false,
  };

  // ==================== YOUTUBE IFRAME API HOOK ====================
  window.onYouTubeIframeAPIReady = () => {
    state.ytApiReady = true;
    if (state.pendingMarathonPlay && state.marathon.program) {
      state.pendingMarathonPlay = false;
      mountOrLoadMarathonVideo(state.marathon.playingIdx);
    }
  };
  if (window.YT && window.YT.Player) {
    state.ytApiReady = true;
  }

  // ==================== FORMATTERS ====================
  function fmtCompact(n) {
    const num = Number(n) || 0;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(num >= 10_000_000 ? 0 : 1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(num >= 100_000 ? 0 : 1)}k`;
    return num.toLocaleString();
  }

  function fmtDuration(sec) {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
    return `${m}:${String(r).padStart(2, "0")}`;
  }

  function fmtHumanTime(totalSec) {
    const mins = Math.round((Number(totalSec) || 0) / 60);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  function fmtDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }

  function fmtFullDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  }

  function fmtApproval(video) {
    const votes = (video.likes || 0) + (video.dislikes || 0);
    if (votes < 5) return "";
    return `${((video.approval_rate || 0) * 100).toFixed(1)}%`;
  }

  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  let toastTimer = null;
  function showToast(msg, duration = 3000) {
    const el = document.getElementById("statusToast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add("hidden"), duration);
  }

  // ==================== DATA LAYER (STATIC-FIRST + OPTIONAL LOCAL API) ====================
  async function loadCatalogEngine() {
    const res = await fetch("./data/catalog.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`Catalog load failed (${res.status})`);
    const bundle = await res.json();
    state.engine = new window.ProductEngine(bundle);
    return state.engine;
  }

  async function apiGet(url) {
    // Route directly to in-browser ProductEngine when loaded (zero backend needed on Cloudflare Pages!)
    if (state.engine) {
      const parsed = new URL(url, window.location.origin);
      const p = parsed.pathname;
      const qs = parsed.searchParams;
      if (p === "/api/stats") return state.engine.getStats();
      if (p === "/api/boundaries") return state.engine.getBoundaries();
      if (p === "/api/videos" || p === "/api/search") {
        return state.engine.queryVideos({
          q: qs.get("q") || "",
          topic: qs.get("topic") || "All",
          creator: qs.get("creator") || "",
          sort: qs.get("sort") || "likes",
          limit: Number(qs.get("limit") || 48),
          offset: Number(qs.get("offset") || 0),
        });
      }
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async function apiPost(url, body) {
    if (state.engine && url === "/api/marathon") {
      return state.engine.buildMarathon(body);
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  // ==================== NAVIGATION ====================
  function setView(viewName) {
    state.view = viewName;
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.view === viewName);
    });
    document.querySelectorAll(".view").forEach((sec) => {
      sec.classList.toggle("is-active", sec.id === `view-${viewName}`);
    });
    if (window.location.hash !== `#${viewName}`) {
      history.replaceState(null, "", `#${viewName}`);
    }
    if (viewName === "search") {
      if (!state.search.hasSearched) {
        runSearch("");
      }
      setTimeout(() => document.getElementById("searchInput").focus(), 30);
    }
    if (viewName === "marathon") {
      updateTopicMatchHint(document.getElementById("marathonTopic").value);
      if (!state.marathon.program) {
        composeMarathon(true);
      }
    }
  }

  // Jump from Search or Video Modal straight into a Marathon on that topic
  function launchMarathonForTopic(topic, minutes = 60) {
    const clean = (topic || "Product Strategy").trim();
    document.getElementById("marathonTopic").value = clean;
    updateMinutesUI(minutes);
    setView("marathon");
    composeMarathon(true);
  }

  // ==================== STATS & TOPICS ====================
  async function loadStats() {
    try {
      const stats = await apiGet("/api/stats");
      state.stats = stats;
      document.getElementById("catalogLedger").textContent = `${stats.total_videos} videos`;
      renderTopicRail(stats);
    } catch {
      document.getElementById("catalogLedger").textContent = "Offline";
    }
  }

  function renderTopicRail(stats) {
    const rail = document.getElementById("topicRail");
    const topics = [{ name: "All", count: stats.total_videos }, ...(stats.topics || [])];
    rail.innerHTML = topics
      .map(
        (t) => `
      <button type="button" class="topic-btn ${state.feed.topic === t.name ? "is-active" : ""}" data-topic="${esc(t.name)}">
        ${esc(t.name)}<span class="topic-count">${t.count}</span>
      </button>`
      )
      .join("");

    rail.querySelectorAll(".topic-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.currentTarget.blur();
        state.feed.topic = btn.dataset.topic;
        state.feed.offset = 0;
        renderTopicRail(state.stats);
        loadFeed(false);
      });
    });
  }

  // ==================== VIDEO CARD ====================
  function renderVideoCard(v, activeSort) {
    const dateStr = fmtDate(v.published_at);
    const approval = fmtApproval(v);
    const dislikeText = approval
      ? `${fmtCompact(v.dislikes)} dislikes (${approval})`
      : `${fmtCompact(v.dislikes)} dislikes`;

    return `
      <article class="video-card" data-vid="${esc(v.video_id)}">
        <div class="thumb-wrap">
          <img class="thumb-img" src="${esc(v.thumbnail_url)}" alt="${esc(v.title)}" loading="lazy" />
          <span class="duration-badge">${fmtDuration(v.duration_seconds)}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${esc(v.title)}</h3>
          <div class="card-byline">
            <button type="button" class="card-creator" data-creator="${esc(v.channel_name)}">${esc(v.channel_name)}</button>
            <span class="card-date ${activeSort === "recency" ? "is-active-metric" : ""}">${esc(dateStr)}</span>
          </div>
          <div class="card-metrics">
            <span class="metric-item ${activeSort === "likes" ? "is-active-metric" : ""}">${fmtCompact(v.likes)} likes</span>
            <span class="metric-item ${activeSort === "views" ? "is-active-metric" : ""}">${fmtCompact(v.views)} views</span>
            <span class="metric-item ${activeSort === "least_dislikes" ? "is-active-metric" : ""}">${dislikeText}</span>
          </div>
        </div>
      </article>
    `;
  }

  function bindCardEvents(container, itemsById) {
    container.querySelectorAll(".video-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".card-creator")) return;
        const video = itemsById.get(card.dataset.vid);
        if (video) openCinemaModal(video);
      });
    });

    container.querySelectorAll(".card-creator").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.currentTarget.blur();
        filterByCreator(btn.dataset.creator);
      });
    });
  }

  function filterByCreator(creatorName) {
    state.feed.creator = creatorName;
    state.feed.topic = "All";
    state.feed.offset = 0;
    document.getElementById("activeCreatorName").textContent = creatorName;
    document.getElementById("activeCreatorFilter").classList.remove("hidden");
    setView("feed");
    if (state.stats) renderTopicRail(state.stats);
    loadFeed(false);
  }

  // ==================== VIEW 1: FEED ====================
  async function loadFeed(append = false) {
    const grid = document.getElementById("feedGrid");
    if (!append) {
      grid.innerHTML = `<div class="empty-state"><p class="empty-copy">Loading…</p></div>`;
    }

    const params = new URLSearchParams({
      topic: state.feed.topic,
      sort: state.feed.sort,
      limit: String(state.feed.limit),
      offset: String(state.feed.offset),
    });
    if (state.feed.creator) params.set("creator", state.feed.creator);

    try {
      const data = await apiGet(`/api/videos?${params.toString()}`);
      state.feed.total = data.total;
      state.feed.items = append ? state.feed.items.concat(data.items) : data.items;

      const map = new Map(state.feed.items.map((v) => [v.video_id, v]));
      if (!state.feed.items.length) {
        grid.innerHTML = `
          <div class="empty-state">
            <h3 class="empty-title">No videos match this filter</h3>
            <p class="empty-copy">Try another topic or clear the active creator filter.</p>
          </div>`;
      } else {
        grid.innerHTML = state.feed.items.map((v) => renderVideoCard(v, state.feed.sort)).join("");
        bindCardEvents(grid, map);
      }

      document
        .getElementById("feedFooter")
        .classList.toggle("hidden", state.feed.items.length >= state.feed.total);
    } catch (err) {
      grid.innerHTML = `<div class="empty-state"><p class="empty-copy">Could not load feed (${esc(err.message)}).</p></div>`;
    }
  }

  // ==================== VIEW 2: SEARCH (CLOSED CATALOGUE + MARATHON HANDOFF) ====================
  async function runSearch(query) {
    const q = query.trim();
    state.search.query = q;
    state.search.hasSearched = true;

    const grid = document.getElementById("searchGrid");
    const handoffBar = document.getElementById("searchMarathonBar");
    const handoffCta = document.getElementById("searchMarathonCta");
    const countLabel = document.getElementById("searchCountLabel");

    try {
      const params = new URLSearchParams({
        q,
        sort: state.search.sort,
        limit: "60",
      });
      const data = await apiGet(`/api/search?${params.toString()}`);
      state.search.items = data.items || [];
      state.search.total = data.total || 0;

      const map = new Map(state.search.items.map((v) => [v.video_id, v]));
      if (!state.search.items.length) {
        handoffBar.classList.add("hidden");
        grid.innerHTML = `
          <div class="empty-state">
            <h3 class="empty-title">No results in the Product Catalogue</h3>
            <p class="empty-copy">
              “${esc(q)}” is outside the vetted product index. Search never pulls from open YouTube.
            </p>
            <div style="margin-top:14px">
              <button type="button" class="outline-btn" data-inline-boundaries>View Boundaries</button>
            </div>
          </div>`;
        const btn = grid.querySelector("[data-inline-boundaries]");
        if (btn) btn.addEventListener("click", openBoundariesModal);
      } else {
        grid.innerHTML = state.search.items.map((v) => renderVideoCard(v, state.search.sort)).join("");
        bindCardEvents(grid, map);

        handoffBar.classList.remove("hidden");
        countLabel.textContent = q
          ? `${state.search.total} ${state.search.total === 1 ? "result" : "results"} for “${q}”`
          : `${state.search.total} vetted product videos`;

        if (q && state.search.total >= 1) {
          document.getElementById("handoffTopicName").textContent = q;
          handoffCta.classList.remove("hidden");
        } else {
          handoffCta.classList.add("hidden");
        }
      }
    } catch (err) {
      grid.innerHTML = `<div class="empty-state"><p class="empty-copy">Search failed (${esc(err.message)}).</p></div>`;
    }
  }

  // ==================== VIEW 3: MARATHON BUILDER ====================
  let hintTimer = null;
  function updateTopicMatchHint(val) {
    const hint = document.getElementById("topicMatchHint");
    const q = (val || "").trim();
    clearTimeout(hintTimer);
    if (!q) {
      hint.textContent = "";
      return;
    }
    hintTimer = setTimeout(async () => {
      try {
        const res = await apiGet(`/api/search?q=${encodeURIComponent(q)}&limit=1`);
        hint.textContent = res.total > 0 ? `${res.total} matching videos` : "0 catalogue matches";
      } catch {
        hint.textContent = "";
      }
    }, 180);
  }

  function updateMinutesUI(mins) {
    const slider = document.getElementById("marathonMinutes");
    const readout = document.getElementById("timeReadout");
    slider.value = String(mins);
    readout.textContent = fmtHumanTime(mins * 60);
    document.querySelectorAll(".mp-time-picks .time-chip").forEach((b) =>
      b.classList.toggle("is-active", Number(b.dataset.mins) === Number(mins))
    );
  }

  async function composeMarathon(resetExcludes = false) {
    if (resetExcludes) {
      state.marathon.excludeIds = [];
    }

    const topicInput = document.getElementById("marathonTopic");
    const minsInput = document.getElementById("marathonMinutes");
    const btn = document.getElementById("composeBtn");
    const container = document.getElementById("marathonProgram");

    state.marathon.topic = topicInput.value.trim() || "Product Strategy";
    state.marathon.minutes = Number(minsInput.value) || 90;
    updateTopicMatchHint(state.marathon.topic);

    btn.disabled = true;
    btn.textContent = "Building…";
    container.classList.remove("hidden");
    container.innerHTML = `<div class="empty-state"><p class="empty-copy">Selecting non-overlapping videos across distinct creators…</p></div>`;

    try {
      const program = await apiPost("/api/marathon", {
        topic: state.marathon.topic,
        minutes: state.marathon.minutes,
        pacing: state.marathon.pacing,
        exclude_ids: state.marathon.excludeIds,
      });
      state.marathon.program = program;
      renderMarathonProgram(program);
    } catch (err) {
      container.innerHTML = `<div class="empty-state"><p class="empty-copy">Could not build marathon (${esc(err.message)}).</p></div>`;
    } finally {
      btn.disabled = false;
      btn.textContent = "Build Marathon";
    }
  }

  function renderMarathonProgram(p) {
    const container = document.getElementById("marathonProgram");
    if (!p.items || !p.items.length) {
      container.innerHTML = `
        <div class="empty-state">
          <h3 class="empty-title">No marathon found for “${esc(p.topic)}”</h3>
          <p class="empty-copy">${esc(p.message || "Try another product topic in the catalogue or adjust your time window.")}</p>
        </div>`;
      return;
    }

    const totalSec = Math.max(1, p.total_seconds);
    const timelineHtml = p.items
      .map((it, idx) => {
        const pct = Math.max(6, (it.duration_seconds / totalSec) * 100);
        return `<button type="button" class="timeline-seg" style="width:${pct.toFixed(2)}%" data-play-idx="${idx}" title="${String(idx + 1).padStart(2, "0")}. ${esc(it.title)} (${fmtDuration(it.duration_seconds)})"></button>`;
      })
      .join("");

    const rowsHtml = p.items
      .map((it, idx) => {
        const num = String(idx + 1).padStart(2, "0");
        const tags = (it.unique_angles || []).slice(0, 3).join(" · ");
        const approval = fmtApproval(it);
        return `
          <div class="program-row" data-idx="${idx}">
            <div class="row-slot">
              <span class="row-num">${num}</span>
              <span class="row-stamp">${esc(it.start_stamp)}–${esc(it.end_stamp)}</span>
            </div>

            <div class="row-thumb" data-play-idx="${idx}">
              <img src="${esc(it.thumbnail_url)}" alt="${esc(it.title)}" loading="lazy" />
              <span class="duration-badge">${fmtDuration(it.duration_seconds)}</span>
            </div>

            <div class="row-main">
              <h3 class="row-title" data-play-idx="${idx}">${esc(it.title)}</h3>
              <div class="row-meta">
                <span>${esc(it.channel_name)}</span>
                <span class="mono-meta">${fmtCompact(it.likes)} likes · ${fmtCompact(it.views)} views · ${fmtCompact(it.dislikes)} dislikes${approval ? ` (${approval})` : ""}</span>
              </div>
              ${tags ? `<div class="row-tags">${esc(tags)}</div>` : ""}
            </div>

            <div class="row-actions">
              <button type="button" class="outline-btn" data-swap-id="${esc(it.video_id)}">Swap</button>
              <button type="button" class="primary-btn" data-play-idx="${idx}">Play</button>
            </div>
          </div>
        `;
      })
      .join("");

    container.innerHTML = `
      <div class="program-head">
        <div>
          <h2 class="program-title">${esc(p.topic)}</h2>
          <div class="program-summary">
            ${p.items.length} videos &middot; ${p.unique_creators} creators &middot; ${esc(p.total_formatted)} / ${fmtHumanTime(p.target_seconds)} (${p.fit_percent}% fit) &middot; ${p.avg_approval}% liked
          </div>
        </div>
        <div class="program-head-actions">
          <button type="button" id="resetSwapsBtn" class="text-btn ${state.marathon.excludeIds.length ? "" : "hidden"}">Reset swaps</button>
          <button type="button" id="startScreeningBtn" class="primary-btn">Play Marathon</button>
        </div>
      </div>

      <div class="timeline-strip" aria-label="Marathon timeline">${timelineHtml}</div>
      <div class="program-list">${rowsHtml}</div>
    `;

    container.querySelector("#startScreeningBtn").addEventListener("click", () => {
      openMarathonPlayer(0);
    });

    const resetBtn = container.querySelector("#resetSwapsBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => composeMarathon(true));
    }

    container.querySelectorAll("[data-play-idx]").forEach((el) => {
      el.addEventListener("click", () => {
        openMarathonPlayer(Number(el.dataset.playIdx) || 0);
      });
    });

    container.querySelectorAll("[data-swap-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const vid = btn.dataset.swapId;
        if (vid && !state.marathon.excludeIds.includes(vid)) {
          state.marathon.excludeIds.push(vid);
        }
        composeMarathon(false);
      });
    });
  }

  // ==================== SINGLE VIDEO MODAL ====================
  function openCinemaModal(v) {
    state.currentModalVideo = v;
    const modal = document.getElementById("cinemaModal");
    document.getElementById("cinemaTopic").textContent = (v.primary_topic || "Product").toUpperCase();
    document.getElementById("cinemaDate").textContent = fmtFullDate(v.published_at) || fmtDate(v.published_at);
    document.getElementById("cinemaTitle").textContent = v.title;
    document.getElementById("cinemaCreatorBtn").textContent = v.channel_name;
    document.getElementById("cinemaDuration").textContent = fmtDuration(v.duration_seconds);
    document.getElementById("cinemaYtLink").href = `https://www.youtube.com/watch?v=${encodeURIComponent(v.video_id)}`;

    const approvalPct = Math.round((v.approval_rate || 0) * 1000) / 10;
    document.getElementById("cinemaMetrics").innerHTML = `
      <span><strong>${(v.likes || 0).toLocaleString()}</strong> likes</span>
      <span><strong>${(v.views || 0).toLocaleString()}</strong> views</span>
      <span><strong>${(v.dislikes || 0).toLocaleString()}</strong> dislikes</span>
      <span><strong>${fmtApproval(v) || "—"}</strong> approval</span>
    `;
    document.getElementById("cinemaApprovalFill").style.width = `${Math.max(4, Math.min(100, approvalPct || 95))}%`;
    document.getElementById("cinemaDescription").textContent = (v.description || "").trim() || "No description available.";

    document.getElementById("cinemaIframe").src =
      `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.video_id)}?autoplay=1&rel=0`;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeCinemaModal() {
    document.getElementById("cinemaIframe").src = "";
    document.getElementById("cinemaModal").classList.add("hidden");
    document.body.style.overflow = "";
  }

  // ==================== MARATHON AUTOPLAY PLAYER (YOUTUBE IFRAME API) ====================
  function openMarathonPlayer(idx) {
    const p = state.marathon.program;
    if (!p || !p.items || !p.items.length) return;
    state.marathon.playingIdx = Math.max(0, Math.min(idx, p.items.length - 1));
    document.getElementById("mplayerComplete").classList.add("hidden");
    document.getElementById("marathonPlayerModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    renderMarathonPlayerMeta();
    mountOrLoadMarathonVideo(state.marathon.playingIdx);
  }

  function renderMarathonPlayerMeta() {
    const p = state.marathon.program;
    const idx = state.marathon.playingIdx;
    const item = p.items[idx];

    document.getElementById("mplayerKicker").textContent = p.topic.toUpperCase();
    document.getElementById("mplayerProgress").textContent = `${idx + 1} / ${p.items.length} · ${item.start_stamp}–${item.end_stamp}`;
    document.getElementById("mplayerTitle").textContent = item.title;
    document.getElementById("mplayerMeta").textContent = `${item.channel_name} · ${fmtDuration(item.duration_seconds)} · ${fmtCompact(item.likes)} likes · ${fmtCompact(item.dislikes)} dislikes`;
    document.getElementById("mplayerTotalTime").textContent = p.total_formatted;

    document.getElementById("mplayerPrev").disabled = idx <= 0;
    document.getElementById("mplayerNext").disabled = idx >= p.items.length - 1;

    const listEl = document.getElementById("mplayerList");
    listEl.innerHTML = p.items
      .map(
        (it, i) => `
      <li class="queue-item ${i === idx ? "is-playing" : ""}" data-q-idx="${i}">
        <span class="queue-num">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <div class="queue-title">${esc(it.title)}</div>
          <div class="queue-sub">${esc(it.channel_name)} &middot; ${fmtDuration(it.duration_seconds)}</div>
        </div>
      </li>`
      )
      .join("");

    listEl.querySelectorAll(".queue-item").forEach((li) => {
      li.addEventListener("click", () => {
        const nextIdx = Number(li.dataset.qIdx) || 0;
        playMarathonIndex(nextIdx);
      });
    });

    const activeRow = listEl.querySelector(".queue-item.is-playing");
    if (activeRow) activeRow.scrollIntoView({ block: "nearest" });
  }

  function playMarathonIndex(idx) {
    const p = state.marathon.program;
    if (!p || !p.items || idx < 0 || idx >= p.items.length) return;
    state.marathon.playingIdx = idx;
    document.getElementById("mplayerComplete").classList.add("hidden");
    renderMarathonPlayerMeta();
    mountOrLoadMarathonVideo(idx);
  }

  function handleMarathonVideoEnded() {
    const p = state.marathon.program;
    if (!p || !p.items) return;
    const autoNext = document.getElementById("autoplayNextToggle").checked;
    if (!autoNext) return;

    if (state.marathon.playingIdx < p.items.length - 1) {
      const nextIdx = state.marathon.playingIdx + 1;
      const nextTitle = p.items[nextIdx].title;
      showToast(`Autoplaying ${nextIdx + 1}/${p.items.length}: ${nextTitle}`, 3200);
      playMarathonIndex(nextIdx);
    } else {
      // Finished the final video in the marathon!
      document.getElementById("completeTitle").textContent = p.topic;
      document.getElementById("completeStats").textContent =
        `${p.items.length} videos · ${p.unique_creators} creators · ${p.total_formatted} watched`;
      document.getElementById("mplayerComplete").classList.remove("hidden");
    }
  }

  function mountOrLoadMarathonVideo(idx) {
    const p = state.marathon.program;
    if (!p || !p.items[idx]) return;
    const vid = p.items[idx].video_id;

    if (!state.ytApiReady || !window.YT || !window.YT.Player) {
      state.pendingMarathonPlay = true;
      return;
    }

    if (state.ytPlayer && typeof state.ytPlayer.loadVideoById === "function") {
      state.ytPlayer.loadVideoById({ videoId: vid });
      return;
    }

    // Create fresh YouTube IFrame API player bound to ENDED event for guaranteed autoplay progression
    state.ytPlayer = new window.YT.Player("mplayerHost", {
      videoId: vid,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (ev) => {
          try {
            ev.target.playVideo();
          } catch {}
        },
        onStateChange: (ev) => {
          // YT.PlayerState.ENDED === 0
          if (ev.data === 0) {
            handleMarathonVideoEnded();
          }
        },
        onError: () => {
          // If an individual video blocks embedding, automatically advance to the next video
          const prog = state.marathon.program;
          if (prog && state.marathon.playingIdx < prog.items.length - 1) {
            showToast("Video unavailable for embed — skipping to next video…", 2800);
            setTimeout(() => playMarathonIndex(state.marathon.playingIdx + 1), 1600);
          }
        },
      },
    });
  }

  function closeMarathonPlayer() {
    if (state.ytPlayer && typeof state.ytPlayer.stopVideo === "function") {
      try {
        state.ytPlayer.stopVideo();
      } catch {}
    }
    document.getElementById("marathonPlayerModal").classList.add("hidden");
    document.getElementById("mplayerComplete").classList.add("hidden");
    document.body.style.overflow = "";
  }

  // ==================== CATALOGUE BOUNDARIES MODAL ====================
  async function openBoundariesModal() {
    const modal = document.getElementById("boundariesModal");
    const body = document.getElementById("boundariesBody");
    body.innerHTML = `<p class="empty-copy">Loading…</p>`;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    try {
      const ch = await apiGet("/api/boundaries");
      body.innerHTML = `
        <h2 id="boundariesTitle" class="charter-title">${esc(ch.title)}</h2>
        <p class="charter-principle">${esc(ch.principle)}</p>

        <div class="charter-section">
          <div class="mp-label">Included Pillars (${ch.catalog_videos} videos · ${ch.catalog_creators} creators)</div>
          <div class="charter-pillars">
            ${(ch.pillars || []).map((p) => `<div>&middot; ${esc(p)}</div>`).join("")}
          </div>
        </div>

        <div class="charter-section">
          <div class="mp-label">Admission Rules (${ch.verified_channels_count} verified channels)</div>
          <ul class="charter-list">
            ${(ch.admission_rules || []).map((r) => `<li>${esc(r)}</li>`).join("")}
          </ul>
        </div>

        <div class="charter-section">
          <div class="mp-label">Explicit Exclusions</div>
          <ul class="charter-list">
            ${(ch.explicit_exclusions || []).map((r) => `<li>${esc(r)}</li>`).join("")}
          </ul>
        </div>
      `;
    } catch (err) {
      body.innerHTML = `<p class="empty-copy">Failed to load boundaries (${esc(err.message)}).</p>`;
    }
  }

  function closeBoundariesModal() {
    document.getElementById("boundariesModal").classList.add("hidden");
    document.body.style.overflow = "";
  }

  // ==================== SYNC VETTED ====================
  async function triggerSync() {
    const btn = document.getElementById("syncBtn");
    const label = document.getElementById("syncLabel");
    if (btn.classList.contains("is-syncing")) return;
    btn.classList.add("is-syncing");
    label.textContent = "Syncing…";

    try {
      const res = await apiPost("/api/sync", {});
      showToast(`Synced ${res.synced} vetted videos (${res.rejected_out_of_bounds || 0} blocked).`);
      await loadCatalogEngine();
      await loadStats();
      if (state.view === "feed") loadFeed(false);
    } catch {
      showToast("Sync interrupted.");
    } finally {
      btn.classList.remove("is-syncing");
      label.textContent = "Sync";
    }
  }

  // ==================== EVENTS ====================
  function bindEvents() {
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.currentTarget.blur();
        setView(btn.dataset.view);
      });
    });

    document.getElementById("brandHome").addEventListener("click", () => setView("feed"));
    document.getElementById("openBoundariesBtn").addEventListener("click", (e) => {
      e.currentTarget.blur();
      openBoundariesModal();
    });
    document.querySelectorAll("[data-close-boundaries]").forEach((el) => {
      el.addEventListener("click", closeBoundariesModal);
    });
    document.getElementById("syncBtn").addEventListener("click", (e) => {
      e.currentTarget.blur();
      triggerSync();
    });

    // Feed sort & filters
    document.querySelectorAll("[data-feed-sort]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.currentTarget.blur();
        state.feed.sort = btn.dataset.feedSort;
        state.feed.offset = 0;
        document.querySelectorAll("[data-feed-sort]").forEach((b) =>
          b.classList.toggle("is-active", b.dataset.feedSort === state.feed.sort)
        );
        loadFeed(false);
      });
    });

    document.getElementById("clearCreatorBtn").addEventListener("click", () => {
      state.feed.creator = "";
      state.feed.offset = 0;
      document.getElementById("activeCreatorFilter").classList.add("hidden");
      loadFeed(false);
    });

    document.getElementById("loadMoreBtn").addEventListener("click", () => {
      state.feed.offset += state.feed.limit;
      loadFeed(true);
    });

    // Search form + live debounced search + direct Marathon handoff
    const searchInput = document.getElementById("searchInput");
    let searchDebounce = null;
    searchInput.addEventListener("input", () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => runSearch(searchInput.value), 180);
    });

    document.getElementById("searchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      clearTimeout(searchDebounce);
      runSearch(searchInput.value);
    });

    document.querySelectorAll(".quick-terms .quick-term").forEach((btn) => {
      btn.addEventListener("click", () => {
        searchInput.value = btn.dataset.q;
        runSearch(btn.dataset.q);
      });
    });

    document.querySelectorAll("[data-search-sort]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.currentTarget.blur();
        state.search.sort = btn.dataset.searchSort;
        document.querySelectorAll("[data-search-sort]").forEach((b) =>
          b.classList.toggle("is-active", b.dataset.searchSort === state.search.sort)
        );
        runSearch(searchInput.value);
      });
    });

    // Direct Search -> Create Marathon buttons (30m / 45m / 60m / 90m / 2h)
    document.querySelectorAll("[data-handoff-mins]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const topic = state.search.query || searchInput.value.trim();
        const mins = Number(btn.dataset.handoffMins) || 60;
        if (topic) launchMarathonForTopic(topic, mins);
      });
    });

    // Marathon composer
    const mTopicInput = document.getElementById("marathonTopic");
    mTopicInput.addEventListener("input", () => updateTopicMatchHint(mTopicInput.value));

    const slider = document.getElementById("marathonMinutes");
    slider.addEventListener("input", () => updateMinutesUI(Number(slider.value)));

    document.querySelectorAll(".mp-time-picks .time-chip").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.currentTarget.blur();
        updateMinutesUI(Number(btn.dataset.mins));
      });
    });

    document.querySelectorAll(".mp-presets .quick-term").forEach((btn) => {
      btn.addEventListener("click", () => {
        mTopicInput.value = btn.dataset.mtopic;
        composeMarathon(true);
      });
    });

    document.querySelectorAll("[data-pacing]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.currentTarget.blur();
        state.marathon.pacing = btn.dataset.pacing;
        document.querySelectorAll("[data-pacing]").forEach((b) =>
          b.classList.toggle("is-active", b.dataset.pacing === state.marathon.pacing)
        );
      });
    });

    document.getElementById("marathonForm").addEventListener("submit", (e) => {
      e.preventDefault();
      composeMarathon(true);
    });

    // Single video modal
    document.querySelectorAll("[data-close-cinema]").forEach((el) => {
      el.addEventListener("click", closeCinemaModal);
    });

    document.getElementById("cinemaCreatorBtn").addEventListener("click", () => {
      if (state.currentModalVideo) {
        const ch = state.currentModalVideo.channel_name;
        closeCinemaModal();
        filterByCreator(ch);
      }
    });

    document.getElementById("cinemaBuildMarathonBtn").addEventListener("click", () => {
      if (state.currentModalVideo) {
        const topic = state.currentModalVideo.primary_topic || "Product Strategy";
        closeCinemaModal();
        launchMarathonForTopic(topic, 60);
      }
    });

    // Marathon player modal
    document.querySelectorAll("[data-close-mplayer]").forEach((el) => {
      el.addEventListener("click", closeMarathonPlayer);
    });

    document.getElementById("mplayerPrev").addEventListener("click", () => {
      if (state.marathon.playingIdx > 0) {
        playMarathonIndex(state.marathon.playingIdx - 1);
      }
    });

    document.getElementById("mplayerNext").addEventListener("click", () => {
      const p = state.marathon.program;
      if (p && state.marathon.playingIdx < p.items.length - 1) {
        playMarathonIndex(state.marathon.playingIdx + 1);
      }
    });

    document.getElementById("replayMarathonBtn").addEventListener("click", () => {
      playMarathonIndex(0);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!document.getElementById("cinemaModal").classList.contains("hidden")) closeCinemaModal();
        if (!document.getElementById("marathonPlayerModal").classList.contains("hidden")) closeMarathonPlayer();
        if (!document.getElementById("boundariesModal").classList.contains("hidden")) closeBoundariesModal();
      }
    });
  }

  // ==================== BOOT ====================
  async function init() {
    bindEvents();

    // Show live Sync button only when running against the local Python backend
    const isLocalHost = ["127.0.0.1", "localhost"].includes(window.location.hostname);
    state.hasLocalApi = isLocalHost;
    document.getElementById("syncBtn").classList.toggle("hidden", !isLocalHost);

    try {
      await loadCatalogEngine();
    } catch (err) {
      console.warn("Static catalog unavailable, falling back to local API:", err);
    }

    const initialHash = window.location.hash.replace("#", "");
    if (["feed", "search", "marathon"].includes(initialHash)) {
      setView(initialHash);
    }
    await loadStats();
    await loadFeed(false);
  }

  init();
})();
