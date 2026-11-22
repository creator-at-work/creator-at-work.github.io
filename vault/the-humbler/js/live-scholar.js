/* ==========================================================================
   THE HUMBLER: Live Scholar (Optional Gemini API Dynamic Excavation)
   When the user configures a Gemini API key in their browser, any arbitrary
   idea is dynamically mapped to its oldest verifiable ancient primary source
   and rendered on the exact same lineage timeline, world map, and folio.
   ========================================================================== */

(function (global) {
  'use strict';

  const STORAGE_KEY = 'the_humbler_gemini_key_v1';
  const MODEL_ID = 'gemini-2.5-flash';

  function getApiKey() {
    try {
      return (localStorage.getItem(STORAGE_KEY) || '').trim();
    } catch (_) {
      return '';
    }
  }

  function setApiKey(key) {
    try {
      const cleaned = (key || '').trim();
      if (cleaned) localStorage.setItem(STORAGE_KEY, cleaned);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      /* ignore storage restrictions */
    }
  }

  function isEnabled() {
    return Boolean(getApiKey());
  }

  function inferScriptClass(language) {
    const l = (language || '').toLowerCase();
    if (l.includes('chinese') || l.includes('mandarin') || l.includes('japanese')) return 'script-cjk';
    if (l.includes('sanskrit') || l.includes('prakrit') || l.includes('hindi')) return 'script-deva';
    if (l.includes('greek')) return 'script-greek';
    if (l.includes('hebrew') || l.includes('aramaic') || l.includes('arabic')) return 'script-hebrew';
    return 'script-latin';
  }

  function inferScriptDir(language) {
    const l = (language || '').toLowerCase();
    if (l.includes('hebrew') || l.includes('aramaic') || l.includes('arabic')) return 'rtl';
    return 'ltr';
  }

  function normalizeNode(node) {
    const lang = node.language || 'Ancient Text';
    const lon = Array.isArray(node.coords) && Number.isFinite(Number(node.coords[0])) ? Number(node.coords[0]) : 35.0;
    const lat = Array.isArray(node.coords) && Number.isFinite(Number(node.coords[1])) ? Number(node.coords[1]) : 32.0;
    const maxAllowedYear = new Date().getFullYear() - 50;
    const rawYr = Number.isFinite(Number(node.year)) ? Math.round(Number(node.year)) : -400;
    const yr = Math.max(-3500, Math.min(maxAllowedYear, rawYr === 0 ? -1 : rawYr));
    return {
      year: yr,
      yearLabel: node.yearLabel || (yr < 0 ? `c. ${Math.abs(yr)} BCE` : `c. ${yr} CE`),
      thinker: node.thinker || 'Ancient Sage',
      tradition: node.tradition || 'Ancient Philosophy',
      place: node.place || 'Ancient World',
      region: node.region || '',
      coords: [Math.max(-170, Math.min(170, lon)), Math.max(-55, Math.min(72, lat))],
      scripture: node.scripture || 'Primary Source',
      language: lang,
      scriptDir: node.scriptDir === 'rtl' ? 'rtl' : inferScriptDir(lang),
      scriptClass: inferScriptClass(lang),
      originalScript: node.originalScript || node.transliteration || node.translation || '',
      transliteration: node.transliteration || node.originalScript || '',
      translation: node.translation || '',
      provenance: node.provenance || node.scripture || '',
      commentary: node.commentary || '',
      marginalia: node.marginalia || ''
    };
  }

  async function excavate(userIdea) {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('No Gemini API key configured.');
    }

    const systemInstruction = [
      'You are the Chief Archivist of "The Humbler," a scholarly museum tool that traces modern "original" insights on life, philosophy, spirituality, and human nature back to the OLDEST verifiable ancient primary source.',
      'STRICT SCHOLARLY RULES:',
      '1. Never invent or hallucinate quotations. Never use apocryphal internet quotes. Every quotation MUST come from a real, verifiable ancient primary text (Sumerian, Egyptian, Vedic/Upanishadic, Pali Canon, Jain, Daoist, Confucian, Pre-Socratic, Classical Greek, Hebrew Wisdom, Avestan, Stoic, Epicurean, Roman, or Late Antique).',
      '2. Always trace to the genuinely OLDEST known surviving occurrence for "origin", and put 2 to 3 chronologically later independent echoes from different traditions in "echoes" (each echo year MUST be >= origin.year).',
      '3. Provide the authentic text in its actual original script (Devanagari, Classical Chinese, Polytonic Greek, Biblical Hebrew, Latin, Pali, or scholarly romanization for Middle Egyptian/Sumerian/Akkadian), plus transliteration and accurate English translation.',
      '4. Write commentary with dry editorial wit and scholarly reverence (3 sentences). Never use clichés or LLM filler.',
      '5. Provide accurate [longitude, latitude] coordinates for the historical place of each source.',
      'Return ONLY valid JSON matching the exact schema requested.'
    ].join('\n');

    const userPrompt = `Excavate the oldest recorded ancient primary source for this user's "original" insight:\n\n"${userIdea}"\n\nReturn a JSON object with this exact shape:
{
  "title": "Short literary plate title (4-8 words)",
  "domain": "Two-word thematic domain, e.g. Relationships & Suffering",
  "ancientThesis": "Term: One crisp sentence distilling the ancient formulation.",
  "threads": ["concept 1", "concept 2", "concept 3"],
  "origin": {
    "year": -500,
    "yearLabel": "c. 5th Century BCE",
    "thinker": "Exact ancient thinker or sage",
    "tradition": "Tradition & canon",
    "place": "Historical city/region",
    "region": "Broader ancient civilization",
    "coords": [lon, lat],
    "scripture": "Exact scripture & chapter/verse",
    "language": "Original language",
    "originalScript": "Actual passage in original script",
    "transliteration": "Scholarly transliteration",
    "translation": "Faithful English translation",
    "provenance": "Exact manuscript/chapter/verse provenance & dating",
    "commentary": "3-sentence human-paced editorial commentary connecting the user's phrasing to this ancient text.",
    "marginalia": "One genuinely fascinating verified historical/textual detail (1-2 sentences)."
  },
  "echoes": [
    {
      "year": -200,
      "yearLabel": "c. 200 BCE",
      "thinker": "...",
      "tradition": "...",
      "place": "...",
      "region": "...",
      "coords": [lon, lat],
      "scripture": "...",
      "language": "...",
      "originalScript": "...",
      "transliteration": "...",
      "translation": "...",
      "provenance": "...",
      "commentary": "...",
      "marginalia": "..."
    }
  ]
}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      let detail = `HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.error && errJson.error.message) {
          detail = errJson.error.message;
        }
      } catch (_) {
        /* ignore */
      }
      throw new Error(detail);
    }

    const data = await response.json();
    const rawText =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;

    if (!rawText) {
      throw new Error('Empty response from Gemini Live Scholar.');
    }

    const parsed = JSON.parse(rawText);
    const origin = normalizeNode(parsed.origin || {});
    const echoes = (Array.isArray(parsed.echoes) ? parsed.echoes : [])
      .map(normalizeNode)
      .filter((e) => e.year >= origin.year)
      .sort((a, b) => a.year - b.year)
      .slice(0, 3);

    const entry = {
      id: 'live-' + Date.now(),
      domain: parsed.domain || 'Philosophical Inquiry',
      title: parsed.title || 'Ancient Precedent',
      ancientThesis: parsed.ancientThesis || '',
      origin,
      echoes
    };

    const yearsLate = global.HUMBLER_MATCHER.computeYearsLate(origin.year);
    const archiveMatch = global.HUMBLER_MATCHER.matchIdea(userIdea);
    const relatedList = [];
    if (archiveMatch && !archiveMatch.unmatched && archiveMatch.entry) {
      relatedList.push(archiveMatch.entry);
      (archiveMatch.related || []).forEach((r) => relatedList.push(r));
    }

    return {
      source: 'live',
      unmatched: false,
      userIdea: userIdea.trim(),
      entry,
      yearsLate,
      confidence: 'high',
      threads: Array.isArray(parsed.threads) && parsed.threads.length ? parsed.threads.slice(0, 3) : (archiveMatch.threads || []),
      related: relatedList.slice(0, 2)
    };
  }

  global.HUMBLER_LIVE = {
    getApiKey,
    setApiKey,
    isEnabled,
    excavate
  };
})(window);
