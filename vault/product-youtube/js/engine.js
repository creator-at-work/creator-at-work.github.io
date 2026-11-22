/* ==========================================================================
   THE PRODUCT YOUTUBE — Client-Side Closed-Catalogue & Marathon Engine
   Runs 100% locally in the browser over ./data/catalog.json (zero backend).
   Mirrors boundaries.py, db.py, and marathon.py with exact parity.
   ========================================================================== */
(() => {
  "use strict";

  const STOPWORDS = new Set([
    "the", "and", "for", "with", "that", "this", "from", "your", "you", "are",
    "how", "why", "what", "when", "where", "who", "into", "about", "over",
    "more", "most", "best", "top", "new", "make", "making", "build", "building",
    "create", "creating", "great", "good", "better", "real", "full", "guide",
    "talk", "talks", "podcast", "episode", "interview", "video", "watch", "learn",
    "product", "products", "management", "manager", "managers", "pm", "pms",
    "team", "teams", "company", "companies", "business", "work", "using", "use",
    "will", "can", "should", "need", "want", "like", "just", "all", "one", "two",
    "our", "their", "they", "them", "been", "have", "has", "had", "was", "were",
    "not", "but", "out", "off", "get", "getting", "things", "thing", "ways", "way",
    "session", "keynote", "conference", "youtube", "subscribe", "channel", "link",
    "links", "timestamps", "chapters", "follow", "twitter", "linkedin", "http",
    "https", "www", "com", "org", "lenny", "lennys",
  ]);

  const TOPIC_SYNONYMS = {
    pmf: ["product market fit", "product-market fit", "0 to 1", "mvp", "startup"],
    "product-market": ["product market fit", "pmf", "0 to 1", "validation"],
    plg: ["product led growth", "product-led", "self-serve", "growth", "freemium", "onboarding"],
    jtbd: ["jobs to be done", "discovery", "customer interviews", "user research"],
    csat: ["customer satisfaction", "nps", "ces", "customer experience", "net promoter", "metrics", "churn"],
    nps: ["net promoter", "csat", "customer satisfaction", "customer experience", "retention"],
    pricing: ["monetization", "packaging", "willingness to pay", "saas pricing", "tiers", "paywall", "revenue"],
    monetization: ["pricing", "packaging", "willingness to pay", "revenue", "subscription"],
    discovery: ["customer interviews", "continuous discovery", "opportunity solution", "user research", "validation", "assumptions", "experiments"],
    strategy: ["vision", "positioning", "roadmap", "moat", "dhm", "product model", "product sense", "empowered"],
    design: ["craft", "ux", "ui", "figma", "design systems", "usability", "simplicity", "interaction", "taste"],
    craft: ["design", "ux", "simplicity", "quality", "linear", "figma", "details", "taste"],
    growth: ["retention", "activation", "onboarding", "loops", "plg", "viral", "churn", "acquisition", "funnel"],
    retention: ["churn", "activation", "onboarding", "growth", "cohorts", "habit", "engagement"],
    ai: ["llm", "evals", "eval", "agents", "generative", "prompt", "ai product", "ai pm", "copilot"],
    metrics: ["kpi", "okr", "north star", "analytics", "experimentation", "a/b testing", "cohort", "data", "csat", "nps"],
    roadmap: ["prioritization", "execution", "planning", "backlog", "shipping", "strategy", "prd", "spec"],
    execution: ["shipping", "prioritization", "roadmap", "prd", "spec", "velocity", "shape up", "delivery"],
    leadership: ["vp", "cpo", "hiring", "org", "culture", "career", "executive", "coaching", "storytelling", "influence"],
    "0": ["zero to one", "0 to 1", "mvp", "pmf", "startup", "early stage", "founder"],
    onboarding: ["activation", "retention", "first-time", "growth", "ux", "plg"],
    positioning: ["messaging", "strategy", "category", "differentiation", "competitive", "gtm"],
    research: ["discovery", "user research", "usability", "interviews", "qualitative", "testing"],
  };

  const KNOWN_SPEAKERS = [
    "marty cagan", "shreyas doshi", "teresa torres", "gibson biddle", "elena verna",
    "brian balfour", "april dunford", "melissa perri", "dan olsen", "julie zhuo",
    "karri saarinen", "rahul vohra", "madhavan ramanujam", "michael seibel",
    "claire hughes johnson", "ryan singer", "bob moesta", "clay christensen",
    "dylan field", "garry tan", "paul graham", "john cutler", "casey winters",
    "ravi mehta", "jackie bavaro", "ken norton", "nikita bier", "gustaf alstromer",
    "kevin hale", "dalton caldwell", "wes kao", "nan yu", "tomer cohen",
    "gokul rajaram", "andrew bosworth", "ben horowitz", "marc andreessen",
    "patrick collison", "john collison", "stewart butterfield", "ivan zhao",
    "paul adams", "des traynor", "noah weiss", "molly graham", "hamel husain",
    "aman khan", "marily nika", "chip huyen", "claire vo",
  ];

  const ACT_LABELS = {
    1: ["Act I", "First Principles"],
    2: ["Act II", "Core Craft"],
    3: ["Act III", "Field Practice"],
    4: ["Act IV", "Trade-offs & Mastery"],
  };

  function formatMMSS(seconds) {
    const s = Math.max(0, Math.floor(seconds || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function tokenize(text, extraStop) {
    const words = (text || "").toLowerCase().match(/[a-z0-9][a-z0-9+-]{1,}/g) || [];
    return words.filter((w) => !STOPWORDS.has(w) && !(extraStop && extraStop.has(w)) && !/^\d+$/.test(w));
  }

  class ProductEngine {
    constructor(bundle) {
      this.videos = (bundle.videos || []).map((v) => {
        const descNoUrls = (v.description || "").replace(/https?:\/\/\S+|www\.\S+/gi, " ");
        const haystack = `${v.title} ${v.channel_name} ${descNoUrls} ${(v.topics || []).join(" ")} ${(v.concepts || []).join(" ")}`.toLowerCase();
        return { ...v, _haystack: haystack };
      });
      this.stats = bundle.stats || {};
      this.boundaries = bundle.boundaries || {};
      this.blockRegexes = (bundle.hard_block_patterns || []).map((p) => {
        try {
          return new RegExp(p, "i");
        } catch {
          return null;
        }
      }).filter(Boolean);
    }

    isBlockedQuery(q) {
      const low = (q || "").trim().toLowerCase();
      if (!low) return false;
      return this.blockRegexes.some((rx) => rx.test(low));
    }

    getStats() {
      return this.stats;
    }

    getBoundaries() {
      return this.boundaries;
    }

    queryVideos({ q = "", topic = "All", creator = "", sort = "likes", limit = 48, offset = 0 } = {}) {
      const cleanQ = (q || "").trim();
      if (cleanQ && this.isBlockedQuery(cleanQ)) {
        return { items: [], total: 0, blocked_query: true };
      }

      let list = this.videos.filter((v) => (v.duration_seconds || 0) >= 120 && (v.slop_score || 0) < 0.45);

      if (topic && topic.toLowerCase() !== "all") {
        list = list.filter((v) => v.primary_topic === topic || (v.topics || []).includes(topic));
      }

      if (creator) {
        const cLow = creator.toLowerCase();
        list = list.filter((v) => (v.channel_name || "").toLowerCase().includes(cLow));
      }

      if (cleanQ) {
        const terms = (cleanQ.toLowerCase().match(/[a-z0-9+-]+/g) || []).filter((t) => t.length >= 2).slice(0, 6);
        if (terms.length) {
          const termRxs = terms.map((t) => new RegExp(`(^|[^a-z0-9])${escapeRegex(t)}`));
          list = list.filter((v) => termRxs.every((rx) => rx.test(v._haystack)));
        }
      }

      if (sort === "least_dislikes") {
        list = list.filter((v) => (v.likes || 0) >= 50);
        list.sort((a, b) =>
          (a.dislikes - b.dislikes) ||
          (a.dislike_rate - b.dislike_rate) ||
          (b.likes - a.likes)
        );
      } else if (sort === "recency") {
        list.sort((a, b) =>
          String(b.published_at || "").localeCompare(String(a.published_at || "")) ||
          (b.views - a.views)
        );
      } else if (sort === "views") {
        list.sort((a, b) => (b.views - a.views) || (b.likes - a.likes));
      } else {
        list.sort((a, b) => (b.likes - a.likes) || (b.views - a.views));
      }

      const total = list.length;
      const items = list.slice(offset, offset + limit).map(({ _haystack, ...rest }) => rest);
      return { items, total };
    }

    extractSpeakers(v) {
      const blob = `${v.title || ""} ${v.channel_name || ""}`.toLowerCase();
      const found = new Set();
      for (const sp of KNOWN_SPEAKERS) {
        if (blob.includes(sp)) found.add(sp);
      }
      const m = (v.title || "").match(/\|\s*([A-Z][a-z]+ [A-Z][a-z]+)/);
      if (m) found.add(m[1].toLowerCase());
      return found;
    }

    classifyAct(v) {
      const title = (v.title || "").toLowerCase();
      const desc = (v.description || "").slice(0, 400).toLowerCase();
      const blob = `${title} ${desc}`;
      if (["mistake", "trap", "theater", "myth", "anti-pattern", "wrong", "pitfall", "fail", "hard truth", " vs ", "trade-off", "tradeoff", "future of", "stop doing", "don't"].some((k) => title.includes(k))) return 4;
      if (["case study", "inside ", "how figma", "how linear", "how stripe", "how airbnb", "how netflix", "how superhuman", "how notion", "story of", "lessons from", "teardown", "behind the"].some((k) => title.includes(k))) return 3;
      if (["how to", "framework", "playbook", "step-by-step", "habits", "system", "process", "template", "guide to", "masterclass", "tactics", "methods"].some((k) => title.includes(k))) return 2;
      if (["what is", "introduction", "fundamentals", "first principles", "nature of", "101", "basics", "explained", "overview", "why "].some((k) => title.includes(k))) return 1;
      if (["case study", "at stripe", "at figma", "at airbnb", "at netflix", "at uber", "at meta"].some((k) => blob.includes(k))) return 3;
      if (["mistakes", "pitfalls", "failures", "avoid"].some((k) => blob.includes(k))) return 4;
      return (v.duration_seconds || 0) <= 1200 ? 1 : 2;
    }

    scoreRelevance(v, topic) {
      const qLow = (topic || "").trim().toLowerCase();
      if (!qLow) return 0.5;
      const allWords = (qLow.match(/[a-z0-9+-]+/g) || []).filter((w) => w.length >= 2);
      const qWords = allWords.filter((w) => !["the", "and", "for", "to", "of", "in", "on", "with", "product", "products"].includes(w));

      const expanded = new Set();
      for (const w of allWords) {
        if (TOPIC_SYNONYMS[w]) TOPIC_SYNONYMS[w].forEach((s) => expanded.add(s));
      }
      for (const [k, syns] of Object.entries(TOPIC_SYNONYMS)) {
        if (qLow.includes(k)) syns.forEach((s) => expanded.add(s));
      }

      const title = (v.title || "").toLowerCase();
      const desc = (v.description || "").slice(0, 1200).toLowerCase();
      const topicsStr = (v.topics || []).join(" ").toLowerCase();
      const conceptsStr = (v.concepts || []).join(" ").toLowerCase();
      const channel = (v.channel_name || "").toLowerCase();

      let score = 0;
      if (qLow.length >= 4 && title.includes(qLow)) score += 0.62;
      else if (qLow.length >= 4 && (conceptsStr.includes(qLow) || topicsStr.includes(qLow))) score += 0.45;
      else if (qLow.length >= 4 && desc.includes(qLow)) score += 0.25;

      const core = qWords.length ? qWords : allWords;
      if (core.length) {
        const tHits = core.filter((w) => title.includes(w)).length;
        const mHits = core.filter((w) => topicsStr.includes(w) || conceptsStr.includes(w) || channel.includes(w)).length;
        const dHits = core.filter((w) => desc.includes(w)).length;
        score += 0.48 * (tHits / core.length) + 0.26 * (mHits / core.length) + 0.16 * (dHits / core.length);
      }

      if (expanded.size) {
        let synTitle = 0;
        let synRest = 0;
        for (const s of expanded) {
          if (title.includes(s)) synTitle += 1;
          else if (desc.includes(s) || conceptsStr.includes(s) || topicsStr.includes(s)) synRest += 1;
        }
        score += Math.min(0.28, synTitle * 0.14) + Math.min(0.18, synRest * 0.045);
      }

      return Math.min(1, Math.round(score * 10000) / 10000);
    }

    buildTfidfVectors(videos, queryStop) {
      const rawMap = new Map();
      const df = new Map();
      for (const v of videos) {
        const counts = new Map();
        const add = (k, w) => counts.set(k, (counts.get(k) || 0) + w);
        const tToks = tokenize(v.title, queryStop);
        const dToks = tokenize((v.description || "").slice(0, 1100), queryStop);
        const cToks = tokenize((v.concepts || []).join(" "), queryStop);
        tToks.forEach((w) => add(w, 3.0));
        for (let i = 0; i < tToks.length - 1; i++) add(`${tToks[i]}_${tToks[i + 1]}`, 4.0);
        cToks.forEach((w) => add(w, 2.5));
        dToks.slice(0, 80).forEach((w) => add(w, 0.6));
        rawMap.set(v.video_id, counts);
        for (const term of counts.keys()) df.set(term, (df.get(term) || 0) + 1);
      }

      const n = Math.max(1, videos.length);
      const vecs = new Map();
      for (const [vid, counts] of rawMap.entries()) {
        const vec = new Map();
        let normSq = 0;
        for (const [term, tf] of counts.entries()) {
          const idf = Math.log((n + 1) / ((df.get(term) || 0) + 1)) + 1;
          const val = (1 + Math.log(tf)) * idf;
          vec.set(term, val);
          normSq += val * val;
        }
        const norm = Math.sqrt(normSq) || 1;
        const unit = new Map();
        for (const [k, val] of vec.entries()) unit.set(k, val / norm);
        vecs.set(vid, unit);
      }
      return vecs;
    }

    cosineSim(v1, v2) {
      if (!v1 || !v2) return 0;
      const [small, big] = v1.size <= v2.size ? [v1, v2] : [v2, v1];
      let sum = 0;
      for (const [k, val] of small.entries()) {
        const other = big.get(k);
        if (other) sum += val * other;
      }
      return sum;
    }

    buildMarathon({ topic = "Product Strategy", minutes = 90, pacing = "balanced", exclude_ids = [] } = {}) {
      const cleanTopic = (topic || "Product Strategy").trim();
      const mins = Math.max(15, Math.min(360, Number(minutes) || 90));
      const targetSec = mins * 60;
      const excludeSet = new Set(exclude_ids || []);

      if (this.isBlockedQuery(cleanTopic)) {
        return {
          topic: cleanTopic,
          target_minutes: mins,
          target_seconds: targetSec,
          pacing,
          total_seconds: 0,
          total_formatted: "0:00",
          fit_percent: 0,
          unique_creators: 0,
          avg_approval: 0,
          items: [],
          message: "This topic falls outside the Product Catalogue boundaries.",
        };
      }

      const graceSec = Math.min(300, Math.max(120, Math.floor(targetSec * 0.05)));
      const maxTotalSec = targetSec + graceSec;

      let maxSingleSec, minSingleSec;
      if (pacing === "concise") {
        maxSingleSec = Math.min(maxTotalSec, Math.max(1200, Math.floor(targetSec * 0.45)));
        minSingleSec = 240;
      } else if (pacing === "deep") {
        maxSingleSec = Math.min(maxTotalSec, Math.max(3000, Math.floor(targetSec * 0.78)));
        minSingleSec = mins >= 45 ? 720 : 300;
      } else {
        maxSingleSec = Math.min(maxTotalSec, Math.max(1800, Math.floor(targetSec * 0.62)));
        minSingleSec = mins >= 60 ? 420 : 240;
      }

      let pool = [];
      for (const v of this.videos) {
        if (excludeSet.has(v.video_id)) continue;
        const dur = v.duration_seconds || 0;
        if (dur < 180 || (v.slop_score || 0) >= 0.36) continue;
        const votes = (v.likes || 0) + (v.dislikes || 0);
        if (votes >= 30 && (v.approval_rate || 1) < 0.88) continue;
        const rel = this.scoreRelevance(v, cleanTopic);
        if (rel < 0.16) continue;
        if (dur > maxSingleSec || dur < minSingleSec) continue;

        pool.push({
          ...v,
          _rel: rel,
          _act: this.classifyAct(v),
          _speakers: this.extractSpeakers(v),
          _merit: 0.64 * rel + 0.36 * (v.signal_score || 0.5),
        });
      }

      const strongHits = pool.filter((p) => p._rel >= 0.30);
      if (strongHits.length >= 10) pool = strongHits;

      if (pool.length < 4) {
        const existingIds = new Set(pool.map((p) => p.video_id));
        for (const v of this.videos) {
          if (excludeSet.has(v.video_id) || existingIds.has(v.video_id)) continue;
          const dur = v.duration_seconds || 0;
          const rel = this.scoreRelevance(v, cleanTopic);
          if (dur >= 180 && dur <= maxTotalSec && (v.slop_score || 0) < 0.42 && rel >= 0.15) {
            pool.push({
              ...v,
              _rel: rel,
              _act: this.classifyAct(v),
              _speakers: this.extractSpeakers(v),
              _merit: 0.62 * rel + 0.38 * (v.signal_score || 0.5),
            });
          }
        }
      }

      pool.sort((a, b) => (b._merit - a._merit) || ((b.signal_score || 0) - (a.signal_score || 0)) || ((b.likes || 0) - (a.likes || 0)));
      const shortlist = pool.slice(0, 56);

      if (!shortlist.length) {
        return {
          topic: cleanTopic,
          target_minutes: mins,
          target_seconds: targetSec,
          pacing,
          total_seconds: 0,
          total_formatted: "0:00",
          fit_percent: 0,
          unique_creators: 0,
          avg_approval: 0,
          items: [],
          message: "No vetted product videos matched this topic and time window.",
        };
      }

      const queryStop = new Set(cleanTopic.toLowerCase().match(/[a-z0-9+-]+/g) || []);
      const tfidf = this.buildTfidfVectors(shortlist, queryStop);
      const simCache = new Map();
      for (let i = 0; i < shortlist.length; i++) {
        for (let j = i + 1; j < shortlist.length; j++) {
          const vi = shortlist[i].video_id;
          const vj = shortlist[j].video_id;
          const s = this.cosineSim(tfidf.get(vi), tfidf.get(vj));
          simCache.set(`${vi}|${vj}`, s);
          simCache.set(`${vj}|${vi}`, s);
        }
      }
      const pairSim = (a, b) => simCache.get(`${a.video_id}|${b.video_id}`) || 0;

      const idealCount =
        pacing === "concise" ? Math.max(2, Math.min(8, Math.round(mins / 16)))
        : pacing === "deep" ? Math.max(1, Math.min(5, Math.round(mins / 42)))
        : Math.max(2, Math.min(7, Math.round(mins / 24)));

      const evaluate = (selected) => {
        if (!selected.length) return -999;
        const totalDur = selected.reduce((acc, v) => acc + v.duration_seconds, 0);
        if (totalDur > maxTotalSec) return -999;

        const avgMerit = selected.reduce((a, v) => a + v._merit, 0) / selected.length;
        const weightedMerit = selected.reduce((a, v) => a + v._merit * Math.sqrt(v.duration_seconds / 600), 0) / Math.max(1, Math.sqrt(targetSec / 600));
        const ratio = totalDur / targetSec;
        const timeFit = ratio <= 1
          ? Math.max(0, 1 - Math.pow((1 - ratio) / 0.35, 1.6))
          : Math.max(0, 1 - Math.pow((ratio - 1) / 0.10, 1.8));

        const allConcepts = new Set();
        selected.forEach((v) => (v.concepts || []).forEach((c) => allConcepts.add(c)));
        const conceptScore = Math.min(1, allConcepts.size / Math.max(4, idealCount * 2.5));

        const acts = new Set(selected.map((v) => v._act));
        const actScore = acts.size / Math.min(4, selected.length);

        const creators = new Set(selected.map((v) => (v.channel_name || "").trim().toLowerCase()));
        const creatorScore = creators.size / selected.length;
        const countProx = Math.max(0, 1 - Math.abs(selected.length - idealCount) / Math.max(2.5, idealCount));

        let maxOv = 0, avgOv = 0, pairs = 0;
        for (let i = 0; i < selected.length; i++) {
          for (let j = i + 1; j < selected.length; j++) {
            const s = pairSim(selected[i], selected[j]);
            if (s > maxOv) maxOv = s;
            avgOv += s;
            pairs++;
          }
        }
        if (pairs) avgOv /= pairs;

        return (
          3.2 * avgMerit +
          1.4 * Math.min(1.5, weightedMerit) +
          2.6 * timeFit +
          1.1 * conceptScore +
          0.85 * actScore +
          0.75 * creatorScore +
          0.65 * countProx -
          2.2 * maxOv -
          1.2 * avgOv
        );
      };

      const canAdd = (state, cand, overlapCap, allowRepeatCreator) => {
        const curDur = state.reduce((a, v) => a + v.duration_seconds, 0);
        if (curDur + cand.duration_seconds > maxTotalSec) return false;
        const candCh = (cand.channel_name || "").trim().toLowerCase();
        for (const ex of state) {
          if (ex.video_id === cand.video_id) return false;
          if (!allowRepeatCreator && (ex.channel_name || "").trim().toLowerCase() === candCh) return false;
          for (const sp of cand._speakers) {
            if (ex._speakers.has(sp)) return false;
          }
          if (pairSim(ex, cand) > overlapCap) return false;
        }
        return true;
      };

      const runBeam = (overlapCap, allowRepeatCreator) => {
        let beam = [[0, []]];
        let bestState = [];
        let bestScore = -999;
        const maxSteps = Math.min(9, idealCount + 3);
        const topCands = shortlist.slice(0, 42);

        for (let step = 0; step < maxSteps; step++) {
          const nextBeam = [];
          const seen = new Set();
          let expanded = false;

          for (const [, st] of beam) {
            for (const cand of topCands) {
              if (!canAdd(st, cand, overlapCap, allowRepeatCreator)) continue;
              const nextSt = st.concat([cand]);
              const key = nextSt.map((v) => v.video_id).sort().join(",");
              if (seen.has(key)) continue;
              seen.add(key);
              const sc = evaluate(nextSt);
              nextBeam.push([sc, nextSt]);
              expanded = true;
              if (sc > bestScore) {
                bestScore = sc;
                bestState = nextSt;
              }
            }
          }
          if (!expanded) break;
          nextBeam.sort((a, b) => b[0] - a[0]);
          beam = nextBeam.slice(0, 38);
        }
        return bestState;
      };

      let chosen = runBeam(0.40, false);
      let totalDur = chosen.reduce((a, v) => a + v.duration_seconds, 0);
      if (totalDur < targetSec * 0.72) {
        const alt = runBeam(0.52, false);
        if (evaluate(alt) > evaluate(chosen)) {
          chosen = alt;
          totalDur = chosen.reduce((a, v) => a + v.duration_seconds, 0);
        }
      }
      if (totalDur < targetSec * 0.60 && shortlist.length >= 2) {
        const alt2 = runBeam(0.55, true);
        if (evaluate(alt2) > evaluate(chosen)) {
          chosen = alt2;
          totalDur = chosen.reduce((a, v) => a + v.duration_seconds, 0);
        }
      }

      chosen.sort((a, b) => (a._act - b._act) || (b._rel - a._rel) || ((b.signal_score || 0) - (a.signal_score || 0)));

      let cumulative = 0;
      const items = chosen.map((v, idx) => {
        const otherConcepts = new Set();
        chosen.forEach((o, j) => {
          if (j !== idx) (o.concepts || []).forEach((c) => otherConcepts.add(c));
        });
        let uniqueAngles = (v.concepts || []).filter((c) => !otherConcepts.has(c));
        if (!uniqueAngles.length) {
          uniqueAngles = [v.primary_topic || "Product"];
        }
        const [actNum, actName] = ACT_LABELS[v._act] || ["Act I", "Craft"];
        const startSec = cumulative;
        const endSec = cumulative + v.duration_seconds;
        cumulative = endSec;
        const { _haystack, _rel, _act, _speakers, _merit, ...clean } = v;
        return {
          ...clean,
          slot_index: idx + 1,
          act_numeral: actNum,
          act_name: actName,
          start_seconds: startSec,
          end_seconds: endSec,
          start_stamp: formatMMSS(startSec),
          end_stamp: formatMMSS(endSec),
          unique_angles: uniqueAngles.slice(0, 3),
        };
      });

      const uniqueCreators = new Set(items.map((it) => (it.channel_name || "").trim().toLowerCase())).size;
      const approvals = items.filter((it) => (it.likes || 0) + (it.dislikes || 0) >= 10).map((it) => it.approval_rate || 0);
      const avgApproval = approvals.length
        ? Math.round((approvals.reduce((a, b) => a + b, 0) / approvals.length) * 1000) / 10
        : 99.0;
      const fitPercent = targetSec > 0 ? Math.round(Math.min(100, (cumulative / targetSec) * 100) * 10) / 10 : 0;

      return {
        topic: cleanTopic,
        target_minutes: mins,
        target_seconds: targetSec,
        pacing,
        total_seconds: cumulative,
        total_formatted: formatMMSS(cumulative),
        fit_percent: fitPercent,
        unique_creators: uniqueCreators,
        avg_approval: avgApproval,
        items,
      };
    }
  }

  window.ProductEngine = ProductEngine;
})();
