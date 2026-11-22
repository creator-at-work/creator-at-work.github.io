/* ==========================================================================
   ATLAS OF LIVES — Interactive Historical Globe & Monograph Engine (22 Lives)
   Supports regional, continental, and global life trajectories with smooth
   camera choreography, era-specific world empires, and left-hand Folio Index.
   ========================================================================== */

(function (global) {
  'use strict';

  const ROMAN = [
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    'XXI', 'XXII', 'XXIII', 'XXIV'
  ];

  const ERA_ORDER = [
    'Antiquity',
    'Medieval & Renaissance',
    'Enlightenment & Empire',
    'Modern World'
  ];

  const state = {
    figure: null,
    figureIdx: 0,
    selectedIdx: null,
    subStageIdx: null,
    hoverIdx: null,
    lang: 'en',
    isTracing: false,
    traceTimer: null,
    worldFeatures: null,
    currentTransform: null,
    worldMode: false,
    indexOpen: false
  };

  let svg, rootG, insetLayer, baseProjection, basePath, zoomBehavior;
  let mapWidth = 1280;
  let mapHeight = 800;
  let defaultTransform = null;
  let defaultK = 4.5;

  let landLayer, waterLayer, worldRealmsLayer, worldPlacesLayer;
  let routeBaseEls = [];
  let routeActiveEls = [];
  let pinsLayer, compassG;
  let stageGlobePos = new Map();
  let insetBox = null;

  /* ========================================================================
     TOPOJSON -> GEOJSON DECODER (Natural Earth 50m, 240 territories)
     ======================================================================== */
  function decodeWorldFeatures() {
    if (state.worldFeatures) return state.worldFeatures;
    const topo = global.ATLAS_WORLD_TOPO;
    if (!topo || !topo.arcs || !topo.objects || !topo.objects.countries) {
      return [];
    }

    const sx = topo.transform ? topo.transform.scale[0] : 1;
    const sy = topo.transform ? topo.transform.scale[1] : 1;
    const tx = topo.transform ? topo.transform.translate[0] : 0;
    const ty = topo.transform ? topo.transform.translate[1] : 0;

    const decodedArcs = topo.arcs.map((arc) => {
      let x = 0;
      let y = 0;
      const pts = new Array(arc.length);
      for (let i = 0; i < arc.length; i++) {
        x += arc[i][0];
        y += arc[i][1];
        pts[i] = [x * sx + tx, y * sy + ty];
      }
      return pts;
    });

    function stitchRing(arcIndices) {
      const coords = [];
      for (let i = 0; i < arcIndices.length; i++) {
        const idx = arcIndices[i];
        const raw = idx >= 0 ? decodedArcs[idx] : decodedArcs[~idx].slice().reverse();
        const start = i === 0 ? 0 : 1;
        for (let j = start; j < raw.length; j++) {
          coords.push(raw[j]);
        }
      }
      return coords;
    }

    const features = [];
    topo.objects.countries.geometries.forEach((geom) => {
      let geometry = null;
      if (geom.type === 'Polygon') {
        geometry = { type: 'Polygon', coordinates: geom.arcs.map(stitchRing) };
      } else if (geom.type === 'MultiPolygon') {
        geometry = {
          type: 'MultiPolygon',
          coordinates: geom.arcs.map((poly) => poly.map(stitchRing))
        };
      }
      if (geometry) {
        features.push({
          type: 'Feature',
          properties: geom.properties || {},
          geometry
        });
      }
    });

    state.worldFeatures = features;
    return features;
  }

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function distanceFromOriginKm(coords) {
    if (typeof d3 === 'undefined' || !state.figure) return 0;
    return Math.round(d3.geoDistance(state.figure.originCoords, coords) * 6371);
  }

  function getEffectiveStage(idx) {
    const base = state.figure.stages[idx];
    if (!base.subStages || state.subStageIdx === null || idx !== state.selectedIdx) {
      return base;
    }
    const sub = base.subStages[state.subStageIdx];
    if (!sub || sub.isDefault) return base;
    return Object.assign({}, base, sub);
  }

  function getActiveYearNumber() {
    if (!state.figure) return 0;
    const idx = state.selectedIdx !== null ? state.selectedIdx : state.hoverIdx;
    if (idx === null) return 0;
    const st = getEffectiveStage(idx);
    const s = String(st.year);
    const num = parseInt(s.replace(/[^\d]/g, ''), 10) || 0;
    return /BCE/i.test(s) ? -num : num;
  }

  function getActiveTerritorySet() {
    const fig = state.figure;
    if (!fig || !fig.territorySets) return null;
    const idx = state.selectedIdx !== null ? state.selectedIdx : state.hoverIdx;
    const key = idx !== null ? fig.stages[idx].eraKey : fig.defaultEraKey;
    return fig.territorySets[key] || fig.territorySets[fig.defaultEraKey] || null;
  }

  function getCountryRole(name, tSet) {
    if (!name || !tSet) return null;
    if (tSet.empire && tSet.empire.includes(name)) return { role: 'empire', label: tSet.empireLabel || 'Sphere of Rule / Origin' };
    if (tSet.dependent && tSet.dependent.includes(name)) return { role: 'dependent', label: tSet.dependentLabel || 'Allied / Dependent Region' };
    if (tSet.ally && tSet.ally.includes(name)) return { role: 'ally', label: tSet.allyLabel || 'Connected Power' };
    if (tSet.rival && tSet.rival.includes(name)) return { role: 'rival', label: tSet.rivalLabel || 'Rival Power / Theater' };
    return null;
  }

  function getWorldRealm(countryName) {
    if (!countryName || !state.figure || !state.figure.worldRealms) return null;
    return state.figure.worldRealms.find((r) => r.countries.includes(countryName)) || null;
  }

  function curvedArcPath(p1, p2, bend) {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dist = Math.hypot(dx, dy) || 1;
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2;
    const nx = -dy / dist;
    const ny = dx / dist;
    const offset = dist * (bend !== undefined ? bend : 0.14);
    const cx = mx + nx * offset;
    const cy = my + ny * offset;
    return `M ${p1[0].toFixed(2)} ${p1[1].toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }

  function isTouchOnly() {
    return Boolean(global.matchMedia && global.matchMedia('(hover: none), (pointer: coarse)').matches);
  }

  function isMobileLayout() {
    return (global.innerWidth || mapWidth || 1024) <= 768;
  }

  /* ========================================================================
     LEFT-HAND ARCHIVAL INDEX OF LIVES & HEADER
     ======================================================================== */
  function setIndexOpen(open) {
    state.indexOpen = open;
    const drawer = document.getElementById('indexDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.toggle('open', open);
    if (backdrop) backdrop.classList.toggle('open', open);
  }

  function renderIndexDrawer() {
    const figures = global.ATLAS_REGISTRY || [];
    const navRow = document.getElementById('figureNavRow');
    const listEl = document.getElementById('indexList');
    if (!navRow || !listEl) return;

    if (figures.length <= 1) {
      navRow.classList.add('hidden');
      return;
    }

    navRow.classList.remove('hidden');
    const totalRoman = ROMAN[figures.length] || String(figures.length);
    const curRoman = ROMAN[state.figureIdx + 1] || String(state.figureIdx + 1);
    document.getElementById('plateCounter').textContent = `Plate ${curRoman} of ${totalRoman}`;

    const groups = new Map();
    ERA_ORDER.forEach((era) => groups.set(era, []));

    figures.forEach((fig, idx) => {
      const era = fig.era || 'Enlightenment & Empire';
      if (!groups.has(era)) groups.set(era, []);
      groups.get(era).push({ fig, idx });
    });

    let html = '';
    groups.forEach((items, era) => {
      if (!items.length) return;
      html += `<div class="index-era-heading">${era}</div>`;
      items.forEach(({ fig, idx }) => {
        const isCurrent = idx === state.figureIdx;
        html += `
          <button type="button" class="index-item ${isCurrent ? 'is-current' : ''}" data-figure-idx="${idx}">
            <span class="index-item-roman">${ROMAN[idx + 1] || idx + 1}</span>
            <span class="index-item-main">
              <span class="index-item-name">${fig.title}</span>
              <span class="index-item-sub">${fig.subtitle || ''}</span>
            </span>
            <span class="index-item-years">${fig.years}</span>
          </button>
        `;
      });
    });

    listEl.innerHTML = html;
  }

  function renderFigureHeader() {
    const fig = state.figure;
    if (!fig) return;

    document.title = `${fig.title} (${fig.years.replace(/\s*—\s*/, '–')}) — Atlas of Lives`;
    document.getElementById('figureTitle').textContent = fig.title;
    document.getElementById('figureYears').textContent = fig.years;
    document.getElementById('figureSubtitle').textContent = fig.subtitle || '';
    document.getElementById('worldViewBtn').textContent = fig.worldLabel || 'World Globe';

    const creditsEl = document.getElementById('sourceCredits');
    if (creditsEl) {
      const links = (fig.sources || [])
        .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a>`)
        .join('<span aria-hidden="true">&middot;</span>');
      const eraHint = fig.worldEraLabel || `the world of ${fig.years.replace(/\s*—\s*/, '–')}`;
      creditsEl.innerHTML = `<span class="credits-hint">Scroll or drag to explore ${eraHint}</span>${links ? '<span aria-hidden="true">&middot;</span>' + links : ''}`;
    }

    renderIndexDrawer();
  }

  /* ========================================================================
     INTERACTIVE FULL-WORLD HISTORICAL GLOBE (DEFAULT FRAMED TO LIFE THEATER)
     ======================================================================== */
  function computeDefaultTransform(fig) {
    const vb = fig.viewBounds || { lon: [-14.5, 43.0], lat: [25.5, 59.5] };
    const lonSpan = vb.lon[1] - vb.lon[0];
    const isPortraitMobile = mapWidth < 640;

    if (lonSpan >= 300) {
      if (isPortraitMobile) {
        // Fit full-globe trajectories (e.g. Darwin) cleanly inside mobile safe area
        const padTop = 132;
        const padBottom = 110;
        const availH = Math.max(220, mapHeight - padTop - padBottom);
        const targetY = padTop + availH / 2;
        const globeCenterY = mapHeight / 2;
        defaultK = 1.05;
        return d3.zoomIdentity.translate(mapWidth * (1 - defaultK) / 2, targetY - globeCenterY * defaultK).scale(defaultK);
      }
      defaultK = 1.0;
      return d3.zoomIdentity;
    }

    let boundsLon = [vb.lon[0], vb.lon[1]];
    let boundsLat = [vb.lat[0], vb.lat[1]];

    // On portrait mobile, frame tightly around the actual stage pins (+ balanced margin)
    // so vertical/regional trajectories fill the screen instead of sitting in a small strip.
    if (isPortraitMobile && fig.stages && fig.stages.length) {
      const insetNum = fig.inset ? fig.inset.stageNumber : null;
      const pts = fig.stages
        .filter((s) => !s.isInset && s.number !== insetNum && s.coords)
        .map((s) => s.coords);
      if (pts.length >= 2) {
        const minLon = d3.min(pts, (c) => c[0]);
        const maxLon = d3.max(pts, (c) => c[0]);
        const minLat = d3.min(pts, (c) => c[1]);
        const maxLat = d3.max(pts, (c) => c[1]);
        const spanLon = Math.max(2.6, maxLon - minLon);
        const spanLat = Math.max(2.2, maxLat - minLat);
        const padLon = Math.max(1.2, spanLon * 0.22);
        const padLat = Math.max(1.0, spanLat * 0.24);
        boundsLon = [Math.max(vb.lon[0], minLon - padLon), Math.min(vb.lon[1], maxLon + padLon)];
        boundsLat = [Math.max(vb.lat[0], minLat - padLat), Math.min(vb.lat[1], maxLat + padLat)];
      }
    }

    const samplePts = [
      [boundsLon[0], boundsLat[0]],
      [boundsLon[1], boundsLat[0]],
      [boundsLon[0], boundsLat[1]],
      [boundsLon[1], boundsLat[1]],
      [(boundsLon[0] + boundsLon[1]) / 2, boundsLat[0]],
      [(boundsLon[0] + boundsLon[1]) / 2, boundsLat[1]]
    ].map((c) => baseProjection(c)).filter(Boolean);

    const minX = d3.min(samplePts, (p) => p[0]);
    const maxX = d3.max(samplePts, (p) => p[0]);
    const minY = d3.min(samplePts, (p) => p[1]);
    const maxY = d3.max(samplePts, (p) => p[1]);

    const padX = mapWidth >= 900 ? 74 : isPortraitMobile ? 22 : 34;
    const padTop = mapWidth >= 768 ? 84 : 134;
    const padBottom = mapWidth >= 768 ? 86 : 112;
    const availW = Math.max(220, mapWidth - padX * 2);
    const availH = Math.max(220, mapHeight - padTop - padBottom);

    const k = Math.max(1.0, Math.min(availW / Math.max(1, maxX - minX), availH / Math.max(1, maxY - minY)));
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const targetX = mapWidth / 2;
    const targetY = padTop + availH / 2;

    defaultK = k;
    return d3.zoomIdentity.translate(targetX - cx * k, targetY - cy * k).scale(k);
  }

  function buildBaseAtlas() {
    const svgEl = document.getElementById('atlasSvg');
    if (!svgEl || typeof d3 === 'undefined' || !state.figure) return;

    mapWidth = svgEl.clientWidth || window.innerWidth;
    mapHeight = svgEl.clientHeight || window.innerHeight;

    const fig = state.figure;
    const features = decodeWorldFeatures();

    svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${mapWidth} ${mapHeight}`);

    // Full-world Natural Earth projection
    baseProjection = d3.geoNaturalEarth1();
    const globePadX = mapWidth >= 900 ? 28 : 12;
    const globePadTop = mapWidth >= 640 ? 52 : 96;
    const globePadBottom = 64;
    baseProjection.fitExtent(
      [[globePadX, globePadTop], [mapWidth - globePadX, mapHeight - globePadBottom]],
      { type: 'Sphere' }
    );
    basePath = d3.geoPath(baseProjection);

    defaultTransform = computeDefaultTransform(fig);

    // Ocean backdrop
    svg.append('rect')
      .attr('class', 'map-sea')
      .attr('width', mapWidth)
      .attr('height', mapHeight)
      .on('click', () => {
        if (state.indexOpen) setIndexOpen(false);
        if (state.selectedIdx !== null) closeChapter(false);
      });

    rootG = svg.append('g');

    // Subtle 10° hairline graticule
    rootG.append('path')
      .datum(d3.geoGraticule().step([10, 10])())
      .attr('class', 'map-grat')
      .attr('d', basePath)
      .attr('fill', 'none')
      .attr('stroke-width', 0.65 / defaultK)
      .style('pointer-events', 'none');

    // All 240 Natural Earth 50m world countries
    landLayer = rootG.append('g');
    landLayer.selectAll('path')
      .data(features)
      .join('path')
      .attr('class', 'map-land')
      .attr('d', basePath)
      .attr('stroke-width', 0.7 / defaultK)
      .on('mouseenter', function (event, d) {
        if (isTouchOnly()) return;
        const name = d.properties && d.properties.name;
        if (!name) return;
        const exploringWorld = isExploringWorld(state.currentTransform || defaultTransform);
        if (!exploringWorld) return;

        const tSet = getActiveTerritorySet();
        const roleInfo = getCountryRole(name, tSet);
        const realm = getWorldRealm(name);
        const activeYr = getActiveYearNumber();

        if (roleInfo) {
          const histName = (fig.historicalNames && fig.historicalNames[name]) || name;
          showTooltip(roleInfo.label, histName, '', event.clientX, event.clientY);
        } else if (realm) {
          const post = realm.postYear && activeYr >= realm.postYear.year ? realm.postYear : null;
          showTooltip(
            fig.worldEraLabel || `World · ${fig.years}`,
            post ? post.name : realm.name,
            post ? post.desc : realm.desc,
            event.clientX,
            event.clientY
          );
        }
      })
      .on('mousemove', function (event, d) {
        if (!isExploringWorld(state.currentTransform || defaultTransform)) return;
        const name = d.properties && d.properties.name;
        if (getCountryRole(name, getActiveTerritorySet()) || getWorldRealm(name)) {
          moveTooltip(event.clientX, event.clientY);
        }
      })
      .on('mouseleave', hideTooltip)
      .on('click', () => {
        if (state.indexOpen) setIndexOpen(false);
        if (state.selectedIdx !== null) closeChapter(false);
      });

    // Ocean labels (default global oceans + any figure-specific regional sea labels)
    waterLayer = rootG.append('g').style('pointer-events', 'none');
    const waterLabels = fig.waterLabels || [
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ];
    waterLabels.forEach((wl) => {
      const pt = baseProjection(wl.coords);
      if (!pt) return;
      waterLayer.append('text')
        .attr('class', 'map-water-label')
        .attr('data-world-only', wl.worldOnly ? 'true' : 'false')
        .attr('data-regional-only', wl.regionalOnly ? 'true' : 'false')
        .attr('x', pt[0])
        .attr('y', pt[1])
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Instrument Serif, Georgia, serif')
        .attr('font-style', 'italic')
        .attr('letter-spacing', '0.28em')
        .text(wl.name);
    });

    // Contemporaneous World Empire labels
    worldRealmsLayer = rootG.append('g').attr('class', 'world-era-layer').style('pointer-events', 'none');
    drawWorldRealmLabels();

    // Historic world cities & places of that era
    worldPlacesLayer = rootG.append('g').attr('class', 'world-era-layer');
    drawWorldPlaces();

    // Project ALL numbered stages onto globe coordinates
    stageGlobePos.clear();
    fig.stages.forEach((st) => {
      const pt = baseProjection(st.coords);
      if (pt) stageGlobePos.set(st.number, { x: pt[0], y: pt[1] });
    });

    // Curved chronological trajectory arcs across the real globe (1 -> 2 -> ... -> N)
    const routeLayer = rootG.append('g').style('pointer-events', 'none');
    routeBaseEls = [];
    routeActiveEls = [];

    for (let i = 0; i < fig.stages.length - 1; i++) {
      const fromSt = fig.stages[i];
      const toSt = fig.stages[i + 1];
      const p1 = stageGlobePos.get(fromSt.number);
      const p2 = stageGlobePos.get(toSt.number);
      if (!p1 || !p2) continue;

      const isVoyage = Boolean(toSt.inset || toSt.seaLeg);
      const d = curvedArcPath([p1.x, p1.y], [p2.x, p2.y], toSt.routeCurve !== undefined ? toSt.routeCurve : 0.14);

      const baseSeg = routeLayer.append('path')
        .attr('d', d)
        .attr('fill', 'none')
        .attr('stroke', cssVar('--ink-3'))
        .attr('stroke-opacity', isVoyage ? 0.45 : 0.56)
        .attr('stroke-linecap', 'round')
        .attr('data-voyage', isVoyage ? 'true' : 'false');

      const activeSeg = routeLayer.append('path')
        .attr('d', d)
        .attr('fill', 'none')
        .attr('stroke', cssVar('--accent'))
        .attr('stroke-linecap', 'round')
        .attr('opacity', 0);

      const len = activeSeg.node().getTotalLength ? activeSeg.node().getTotalLength() : 100;
      routeBaseEls.push({ el: baseSeg, isVoyage });
      routeActiveEls.push({ toIdx: i + 1, el: activeSeg, len });
    }

    // All numbered obsidian-and-gold medallions on the real globe
    pinsLayer = rootG.append('g');
    fig.stages.forEach((st, idx) => {
      const pos = stageGlobePos.get(st.number);
      if (pos) drawStageMarker(pinsLayer, st, idx, pos, false);
    });

    // Optional lower-left inset (e.g. Saint Helena for Napoleon, Princeton for Turing)
    insetBox = null;
    insetLayer = svg.append('g').attr('class', 'inset-layer');
    if (fig.inset) {
      const iw = fig.inset.w || 186;
      const ih = fig.inset.h || 174;
      const isCompact = mapWidth < 640;
      const iScale = isCompact ? 0.72 : 1;
      const ix = isCompact ? 12 : 36;
      const iy = isCompact ? mapHeight - Math.round(ih * iScale) - 104 : mapHeight - ih - 76;
      insetBox = { x: ix, y: iy, w: iw * iScale, h: ih * iScale };

      const insetHolder = insetLayer.append('g')
        .attr('transform', isCompact ? `translate(${ix}, ${iy}) scale(${iScale})` : `translate(${ix}, ${iy})`);

      drawInsetCartouche(insetHolder, fig.inset, { x: 0, y: 0, w: iw, h: ih });
      const stIdx = fig.stages.findIndex((s) => s.number === fig.inset.stageNumber);
      if (stIdx >= 0) {
        const insetPos = {
          x: fig.inset.markerOffset[0],
          y: fig.inset.markerOffset[1]
        };
        drawStageMarker(insetHolder, fig.stages[stIdx], stIdx, insetPos, true);
      }
    }

    // Minimal 0.7px archival compass rose (hidden on narrow phones when an inset is shown)
    const showCompass = !(mapWidth < 520 && insetBox);
    const compassY = insetBox ? insetBox.y - 34 : (mapWidth < 768 ? mapHeight - 118 : mapHeight - 96);
    compassG = svg.append('g')
      .attr('transform', `translate(${mapWidth < 640 ? 30 : 52}, ${compassY})`)
      .style('pointer-events', 'none')
      .attr('opacity', showCompass ? 0.48 : 0);
    compassG.append('circle').attr('r', 13.5).attr('fill', 'none').attr('stroke', cssVar('--ink-3')).attr('stroke-width', 0.7);
    compassG.append('line').attr('x1', 0).attr('y1', -17).attr('x2', 0).attr('y2', 17).attr('stroke', cssVar('--ink-3')).attr('stroke-width', 0.7);
    compassG.append('line').attr('x1', -17).attr('y1', 0).attr('x2', 17).attr('y2', 0).attr('stroke', cssVar('--ink-3')).attr('stroke-width', 0.7);
    compassG.append('polygon').attr('points', '0,-13.5 2.6,-2.6 0,-4.6 -2.6,-2.6').attr('fill', cssVar('--accent'));
    compassG.append('text')
      .attr('x', 0)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Cormorant Garamond, Georgia, serif')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('fill', cssVar('--ink-3'))
      .text('N');

    // Interactive D3 Zoom & Pan — dynamic maxZoom handles both global (Darwin) & tight regional (Newton) maps!
    const maxScale = Math.max(12, defaultK * 2.8);
    zoomBehavior = d3.zoom()
      .scaleExtent([0.92, maxScale])
      .filter((event) => {
        if (event.type === 'wheel') return true;
        if (event.target && event.target.closest && event.target.closest('.pin-group')) {
          return false;
        }
        return !event.ctrlKey && !event.button;
      })
      .on('zoom', (event) => {
        rootG.attr('transform', event.transform);
        state.currentTransform = event.transform;
        syncZoomLayers(event.transform);
      });

    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, defaultTransform);
    state.currentTransform = defaultTransform;
    syncZoomLayers(defaultTransform);
    updateMapHighlights(false);
  }

  /**
   * Detect whether user has zoomed out / panned into the wider historical world.
   * For already-global figures (defaultK <= 1.25), explicit worldMode toggle or zoom-out activates full era overlay.
   */
  function isExploringWorld(t) {
    if (!t || !defaultTransform) return false;
    if (state.worldMode && defaultK <= 1.35) return true;
    if (defaultK > 1.35 && t.k < defaultK * 0.68) return true;
    const centerGlobeX = (mapWidth / 2 - t.x) / t.k;
    const centerGlobeY = (mapHeight / 2 - t.y) / t.k;
    const defCenterX = (mapWidth / 2 - defaultTransform.x) / defaultK;
    const defCenterY = (mapHeight / 2 - defaultTransform.y) / defaultK;
    const panDist = Math.hypot(centerGlobeX - defCenterX, centerGlobeY - defCenterY);
    return panDist > Math.max(110, 420 / defaultK);
  }

  function isRealInsetStageVisible(t) {
    if (!t || !state.figure || !state.figure.inset) return false;
    const pos = stageGlobePos.get(state.figure.inset.stageNumber);
    if (!pos) return false;
    const sx = pos.x * t.k + t.x;
    const sy = pos.y * t.k + t.y;
    return sx > 40 && sx < mapWidth - 40 && sy > 50 && sy < mapHeight - 70;
  }

  function drawWorldRealmLabels() {
    if (!worldRealmsLayer || !state.figure) return;
    worldRealmsLayer.selectAll('*').remove();

    const fig = state.figure;
    const activeYr = getActiveYearNumber();
    const labelColor = cssVar('--ink-2');
    const k = (state.currentTransform && state.currentTransform.k) || defaultK || 1;

    const labels = [
      ...(fig.extraRealmLabels || []),
      ...(fig.worldRealms || [])
        .filter((r) => r.label && r.labelCoords)
        .map((r) => {
          const post = r.postYear && activeYr >= r.postYear.year ? r.postYear : null;
          return {
            text: post ? post.label : r.label,
            coords: r.labelCoords
          };
        })
    ];

    labels.forEach((lbl) => {
      const pt = baseProjection(lbl.coords);
      if (!pt) return;
      worldRealmsLayer.append('text')
        .attr('class', 'realm-label atlas-halo')
        .attr('x', pt[0])
        .attr('y', pt[1])
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Cormorant Garamond, Georgia, serif')
        .attr('font-size', `${10.5 / Math.pow(k, 0.72)}px`)
        .attr('font-weight', '600')
        .attr('letter-spacing', '0.22em')
        .attr('fill', labelColor)
        .style('stroke-width', `${3.6 / k}px`)
        .text(lbl.text);
    });
  }

  function drawWorldPlaces() {
    if (!worldPlacesLayer || !state.figure) return;
    worldPlacesLayer.selectAll('*').remove();

    (state.figure.worldPlaces || []).forEach((pl) => {
      const pt = baseProjection(pl.coords);
      if (!pt) return;

      const g = worldPlacesLayer.append('g')
        .attr('class', 'world-place-group')
        .attr('transform', `translate(${pt[0].toFixed(2)}, ${pt[1].toFixed(2)})`)
        .style('cursor', 'pointer')
        .on('mouseenter', (event) => {
          if (isTouchOnly() || !isExploringWorld(state.currentTransform)) return;
          showTooltip(`${pl.year} · Historical World`, pl.name, pl.detail, event.clientX, event.clientY);
        })
        .on('mousemove', (event) => moveTooltip(event.clientX, event.clientY))
        .on('mouseleave', hideTooltip);

      const inner = g.append('g').attr('class', 'world-place-inner');
      inner.append('circle').attr('r', 10).attr('fill', 'transparent');
      inner.append('circle')
        .attr('r', 3.1)
        .attr('fill', cssVar('--paper'))
        .attr('stroke', cssVar('--ink-2'))
        .attr('stroke-width', 1.2);

      const dx = pl.alignEnd ? -8 : 8;
      inner.append('text')
        .attr('class', 'atlas-halo')
        .attr('x', dx)
        .attr('y', 4)
        .attr('text-anchor', pl.alignEnd ? 'end' : 'start')
        .attr('font-family', 'Instrument Serif, Georgia, serif')
        .attr('font-size', '14px')
        .attr('fill', cssVar('--ink-2'))
        .text(pl.name);
    });
  }

  function drawInsetCartouche(parent, cfg, box) {
    const { x, y, w, h } = box;
    const g = parent.append('g');

    g.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h).attr('class', 'inset-bg');
    g.append('rect').attr('x', x + 3).attr('y', y + 3).attr('width', w - 6).attr('height', h - 6).attr('class', 'inset-inner-rule');
    g.append('rect').attr('x', x + 3.5).attr('y', y + 3.5).attr('width', w - 7).attr('height', 33).attr('fill', cssVar('--paper'));
    g.append('line').attr('x1', x + 3.5).attr('y1', y + 36.5).attr('x2', x + w - 3.5).attr('y2', y + 36.5).attr('stroke', cssVar('--rule')).attr('stroke-width', 0.7);

    g.append('text').attr('x', x + w / 2).attr('y', y + 17).attr('text-anchor', 'middle').attr('class', 'inset-label').text(cfg.title);
    g.append('text').attr('x', x + w / 2).attr('y', y + 30).attr('text-anchor', 'middle').attr('class', 'inset-coords').text(cfg.coordsText);

    g.append('line').attr('x1', x + 4).attr('y1', y + 96).attr('x2', x + w - 4).attr('y2', y + 96).attr('class', 'map-grat').attr('stroke-width', 0.6);
    g.append('line').attr('x1', x + w * 0.5).attr('y1', y + 37).attr('x2', x + w * 0.5).attr('y2', y + h - 4).attr('class', 'map-grat').attr('stroke-width', 0.6);

    if (cfg.islandPolygon && cfg.islandPolygon.length) {
      const pts = cfg.islandPolygon.map(([rx, ry]) => `${(x + rx).toFixed(1)},${(y + ry).toFixed(1)}`).join(' ');
      g.append('polygon').attr('points', pts).attr('fill', cssVar('--land')).attr('stroke', cssVar('--land-stroke')).attr('stroke-width', 0.85);
    }

    if (cfg.caption) {
      g.append('text').attr('x', x + w / 2).attr('y', y + h - 10).attr('text-anchor', 'middle').attr('class', 'inset-coords').text(cfg.caption);
    }
  }

  function drawStageMarker(parent, st, idx, pos, isInset) {
    const g = parent.append('g')
      .attr('class', 'pin-group')
      .attr('data-stage-idx', String(idx))
      .attr('data-in-inset', isInset ? 'true' : 'false')
      .attr('transform', `translate(${pos.x.toFixed(2)}, ${pos.y.toFixed(2)})`)
      .attr('role', 'button')
      .attr('tabindex', '0')
      .attr('aria-label', `${st.number}. ${st.location}, ${st.date}`)
      .on('click', (event) => {
        event.stopPropagation();
        if (event.currentTarget && event.currentTarget.blur) event.currentTarget.blur();
        if (state.indexOpen) setIndexOpen(false);
        stopTrace();
        openChapter(idx, false);
      })
      .on('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          stopTrace();
          openChapter(idx, false);
        }
      })
      .on('mouseenter', (event) => {
        if (isTouchOnly()) return;
        state.hoverIdx = idx;
        updateMapHighlights(false);
        const ageLabel = st.age ? ` · ${st.age}` : '';
        showTooltip(`${st.number} · ${st.date}${ageLabel}`, st.title, '', event.clientX, event.clientY);
      })
      .on('mousemove', (event) => {
        if (!isTouchOnly()) moveTooltip(event.clientX, event.clientY);
      })
      .on('mouseleave', () => {
        if (isTouchOnly()) return;
        state.hoverIdx = null;
        updateMapHighlights(false);
        hideTooltip();
      });

    const inner = g.append('g').attr('class', isInset ? 'inset-pin-inner' : 'pin-inner');

    inner.append('circle').attr('r', mapWidth < 640 ? 25 : 19).attr('fill', 'transparent');

    inner.append('circle')
      .attr('class', 'pin-halo-ring')
      .attr('r', 15.2)
      .attr('fill', 'none')
      .attr('stroke', cssVar('--brass'))
      .attr('stroke-width', 0.9)
      .attr('stroke-dasharray', '2 2')
      .attr('opacity', 0);

    inner.append('circle')
      .attr('class', 'pin-disc')
      .attr('r', 10.8)
      .attr('fill', '#1A1714')
      .attr('stroke', cssVar('--brass'))
      .attr('stroke-width', 1.2);

    inner.append('circle')
      .attr('class', 'pin-inner-ring')
      .attr('r', 8.5)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(196, 162, 98, 0.36)')
      .attr('stroke-width', 0.55)
      .attr('opacity', 0.85);

    inner.append('text')
      .attr('class', 'pin-num')
      .attr('x', 0)
      .attr('y', 0.5)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-family', 'Cormorant Garamond, Georgia, serif')
      .attr('font-size', '12.5px')
      .attr('font-weight', '600')
      .attr('fill', cssVar('--ink'))
      .text(String(st.number));

    const posArr = isInset && st.insetLabelPos ? st.insetLabelPos : (st.labelPos || [15, 4]);
    const useEnd = isInset ? Boolean(st.insetAlignEnd) : Boolean(st.alignEnd);
    const useMid = !isInset && Boolean(st.alignMiddle);
    const anchor = useEnd ? 'end' : useMid ? 'middle' : 'start';

    const isSmall = mapWidth < 640;
    const placeFontPx = isSmall && !isInset ? 15 : 18;
    const yearFontPx = isSmall && !isInset ? 10.5 : 11.5;

    inner.append('text')
      .attr('class', 'pin-label atlas-halo')
      .attr('x', posArr[0])
      .attr('y', posArr[1])
      .attr('text-anchor', anchor)
      .attr('font-family', 'Instrument Serif, Georgia, serif')
      .attr('font-size', `${placeFontPx}px`)
      .attr('fill', cssVar('--ink'))
      .text(st.shortPlace);

    inner.append('text')
      .attr('class', 'pin-years atlas-halo')
      .attr('x', posArr[0])
      .attr('y', posArr[1] + (isSmall && !isInset ? 11 : 12))
      .attr('text-anchor', anchor)
      .attr('font-family', 'Cormorant Garamond, Georgia, serif')
      .attr('font-style', 'italic')
      .attr('font-size', `${yearFontPx}px`)
      .attr('fill', cssVar('--ink-3'))
      .text(st.age ? `${st.year} · ${st.age}` : st.year);
  }

  function syncZoomLayers(t) {
    if (!t || !rootG) return;
    const k = t.k;
    const exploring = isExploringWorld(t);
    const insetTargetVisible = isRealInsetStageVisible(t);

    const lifeBtn = document.getElementById('lifeViewBtn');
    const worldBtn = document.getElementById('worldViewBtn');
    if (lifeBtn && worldBtn) {
      lifeBtn.classList.toggle('is-active', !exploring);
      worldBtn.classList.toggle('is-active', exploring);
    }

    rootG.select('.map-grat').attr('stroke-width', 0.65 / k);
    if (landLayer) {
      landLayer.selectAll('path')
        .attr('stroke-width', (k < 2.0 ? 0.65 : 0.72) / k)
        .classed('is-explorable', exploring);
    }

    // Relative counter-scaling: crisp 1.0x on desktop, balanced 0.80x on compact phones
    const isCompact = mapWidth < 640;
    const relK = k / Math.max(1, defaultK);
    const baseSize = relK < 0.6
      ? 0.56 + 0.34 * Math.max(0, relK / 0.6)
      : Math.min(1.08, 0.9 + 0.1 * Math.min(1.8, relK));
    const sizeFactor = isCompact ? baseSize * 0.82 : baseSize;

    if (pinsLayer) {
      pinsLayer.selectAll('.pin-inner').attr('transform', `scale(${sizeFactor / k})`);

      // On compact mobile screens, resolve overlapping label boxes in screen space so no text collides;
      // medallions (1, 2, 3...) always remain visible and tappable, and zooming/tapping reveals every label.
      const total = state.figure ? state.figure.stages.length : 10;
      const keepIdx = new Set([0, Math.floor(total / 2), total - 1]);
      const placedBoxes = [];

      const pinNodes = [];
      pinsLayer.selectAll('.pin-group').each(function () {
        const idx = Number(d3.select(this).attr('data-stage-idx'));
        const isSel = idx === state.selectedIdx || idx === state.hoverIdx;
        const priority = isSel ? 0 : (idx === 0 || idx === total - 1 ? 1 : 2);
        pinNodes.push({ el: this, idx, isSel, priority });
      });
      pinNodes.sort((a, b) => a.priority - b.priority || a.idx - b.idx);

      pinNodes.forEach(({ el, idx, isSel }) => {
        const g = d3.select(el);
        let showLabel = relK >= 0.55 || keepIdx.has(idx) || isSel;

        if (showLabel && isCompact && state.figure && state.figure.stages[idx]) {
          const st = state.figure.stages[idx];
          const pos = stageGlobePos.get(st.number);
          if (pos) {
            const sx = pos.x * k + t.x;
            const sy = pos.y * k + t.y;
            const lp = st.labelPos || [15, 4];
            const estW = Math.max(58, (st.shortPlace.length * 7.2 + 12)) * sizeFactor;
            const estH = 26 * sizeFactor;

            // Auto-flip horizontal anchor if a right/left edge pin label would clip off-screen on narrow phones
            let effEnd = Boolean(st.alignEnd);
            let effMid = Boolean(st.alignMiddle);
            let effX = lp[0];
            if (!effEnd && !effMid && sx + lp[0] * sizeFactor + estW > mapWidth - 8) {
              effEnd = true;
              effX = -Math.abs(lp[0] || 15);
            } else if (effEnd && sx + lp[0] * sizeFactor - estW < 8) {
              effEnd = false;
              effX = Math.abs(lp[0] || 15);
            }
            const effAnchor = effEnd ? 'end' : effMid ? 'middle' : 'start';
            g.select('.pin-label').attr('x', effX).attr('text-anchor', effAnchor);
            g.select('.pin-years').attr('x', effX).attr('text-anchor', effAnchor);

            const lx = sx + effX * sizeFactor;
            const ly = sy + (lp[1] - 10) * sizeFactor;
            const x1 = effEnd ? lx - estW : effMid ? lx - estW / 2 : lx;
            const box = { x1, y1: ly, x2: x1 + estW, y2: ly + estH };

            const collides = !isSel && placedBoxes.some(
              (b) => !(box.x2 < b.x1 - 4 || box.x1 > b.x2 + 4 || box.y2 < b.y1 - 2 || box.y1 > b.y2 + 2)
            );
            if (collides) {
              showLabel = false;
            } else {
              placedBoxes.push(box);
            }
          }
        }

        g.select('.pin-label').attr('opacity', showLabel ? 1 : 0);
        g.select('.pin-years').attr('opacity', showLabel ? 1 : 0);
      });
    }

    routeBaseEls.forEach(({ el, isVoyage }) => {
      el.attr('stroke-width', (isVoyage ? 1.2 : 1.35) / k)
        .attr('stroke-dasharray', isVoyage ? `${3 / k} ${5 / k}` : `${4.5 / k} ${4.5 / k}`);
    });
    routeActiveEls.forEach(({ el }) => {
      el.attr('stroke-width', 2.15 / k);
    });

    if (waterLayer) {
      waterLayer.selectAll('text').each(function () {
        const el = d3.select(this);
        const worldOnly = el.attr('data-world-only') === 'true';
        const regOnly = el.attr('data-regional-only') === 'true';
        const vis = worldOnly ? exploring : regOnly ? !exploring : true;
        el.attr('opacity', vis ? 1 : 0).attr('font-size', `${12 / k}px`);
      });
    }

    if (worldRealmsLayer) {
      worldRealmsLayer.style('opacity', exploring ? 1 : 0);
      worldRealmsLayer.selectAll('.realm-label')
        .attr('font-size', `${10.5 / Math.pow(k, 0.72)}px`)
        .style('stroke-width', `${3.6 / k}px`);
    }
    if (worldPlacesLayer) {
      worldPlacesLayer.style('opacity', exploring ? 1 : 0)
        .style('pointer-events', exploring ? 'auto' : 'none');
      worldPlacesLayer.selectAll('.world-place-inner')
        .attr('transform', `scale(${0.92 / k})`);
    }

    if (insetLayer) {
      const showInset = Boolean(state.figure && state.figure.inset) && !insetTargetVisible && !exploring;
      insetLayer.style('opacity', showInset ? 1 : 0)
        .style('pointer-events', showInset ? 'auto' : 'none');
    }

    updateLandShading(exploring);
  }

  function updateLandShading(exploringWorld) {
    if (!landLayer || !state.figure) return;

    const tSet = getActiveTerritorySet();
    const landFill = cssVar('--land');
    const landStroke = cssVar('--land-stroke');

    const roleFills = {
      empire: cssVar('--terr-empire'),
      dependent: cssVar('--terr-dependent'),
      ally: cssVar('--terr-ally'),
      rival: cssVar('--terr-rival')
    };
    const roleStrokes = {
      empire: cssVar('--terr-empire-stroke'),
      dependent: cssVar('--terr-dependent-stroke'),
      ally: cssVar('--terr-ally-stroke'),
      rival: cssVar('--terr-rival-stroke')
    };

    landLayer.selectAll('path')
      .attr('fill', (d) => {
        const name = d.properties && d.properties.name;
        const info = getCountryRole(name, tSet);

        if (!exploringWorld) {
          if (info && (info.role === 'empire' || info.role === 'dependent')) {
            return info.role === 'empire' ? cssVar('--life-empire') : cssVar('--life-dependent');
          }
          return landFill;
        }

        if (info) return roleFills[info.role];
        const realm = getWorldRealm(name);
        return realm ? cssVar(realm.cssVar) : landFill;
      })
      .attr('stroke', (d) => {
        const name = d.properties && d.properties.name;
        const info = getCountryRole(name, tSet);
        if (!exploringWorld) {
          return info && info.role === 'empire' ? cssVar('--life-empire-stroke') : landStroke;
        }
        return info ? roleStrokes[info.role] : landStroke;
      });
  }

  function updateMapHighlights(animateRoute) {
    if (!svg || !state.figure) return;

    const accent = cssVar('--accent');
    const accentSeal = cssVar('--accent-seal');
    const ink = cssVar('--ink');
    const brass = cssVar('--brass');
    const targetIdx = state.selectedIdx !== null ? state.selectedIdx : state.hoverIdx;

    const exploring = isExploringWorld(state.currentTransform || defaultTransform);
    updateLandShading(exploring);
    drawWorldRealmLabels();

    routeActiveEls.forEach((seg) => {
      const lit = targetIdx !== null && seg.toIdx <= targetIdx;
      if (lit) {
        seg.el.attr('opacity', 0.9);
        if (animateRoute && seg.toIdx === targetIdx) {
          seg.el
            .interrupt()
            .attr('stroke-dasharray', `${seg.len} ${seg.len}`)
            .attr('stroke-dashoffset', seg.len)
            .transition()
            .duration(660)
            .ease(d3.easeCubicOut)
            .attr('stroke-dashoffset', 0)
            .on('end', () => seg.el.attr('stroke-dasharray', null));
        } else {
          seg.el.interrupt().attr('stroke-dasharray', null).attr('stroke-dashoffset', 0);
        }
      } else {
        seg.el.interrupt().attr('opacity', 0);
      }
    });

    svg.selectAll('.pin-group').each(function () {
      const g = d3.select(this);
      const idx = Number(g.attr('data-stage-idx'));
      const isSel = idx === state.selectedIdx;
      const isHi = idx === targetIdx;
      const isPast = state.selectedIdx !== null && idx < state.selectedIdx;

      g.select('.pin-disc')
        .attr('r', isSel ? 12.2 : isHi ? 11.6 : 10.8)
        .attr('fill', isSel ? accentSeal : isPast ? '#2A1816' : '#1A1714')
        .attr('stroke', isSel ? brass : isHi || isPast ? accent : brass)
        .attr('stroke-width', isSel || isHi ? 1.5 : 1.15);

      g.select('.pin-inner-ring')
        .attr('stroke', isSel ? 'rgba(237, 230, 214, 0.45)' : 'rgba(196, 162, 98, 0.36)')
        .attr('opacity', isSel ? 1 : 0.82);

      g.select('.pin-num')
        .attr('fill', isSel ? '#FAF5EA' : isHi ? brass : isPast ? '#E5B8A8' : ink);

      const isSmall = mapWidth < 640;
      g.select('.pin-label')
        .attr('fill', isSel ? brass : isHi ? '#F5EEE0' : ink)
        .attr('font-size', isSmall ? (isSel ? '16px' : '15px') : (isSel ? '19.5px' : '18px'));

      g.select('.pin-halo-ring')
        .attr('opacity', isSel ? 0.85 : isHi ? 0.45 : 0);
    });
  }

  /* ========================================================================
     CAMERA CHOREOGRAPHY
     ======================================================================== */
  function flyCameraToChapter(idx) {
    if (!svg || !zoomBehavior || !state.figure) return;
    const st = state.figure.stages[idx];
    const pos = stageGlobePos.get(st.number);
    if (!pos) return;

    const mobileSheet = mapWidth <= 768;
    let targetX;
    let targetY;
    if (mobileSheet) {
      // Frame the active numbered pin squarely in the unobstructed top ~28% map peek above the bottom sheet
      targetX = mapWidth * 0.5;
      targetY = Math.max(76, Math.min(148, mapHeight * 0.145));
    } else {
      const drawerW = mapWidth >= 1024 ? 486 : 440;
      const visibleW = Math.max(260, mapWidth - drawerW);
      targetX = visibleW * 0.52;
      targetY = mapHeight * 0.47;
    }

    const mult = mobileSheet ? Math.max(1.25, (st.focusMultiplier || 1.32) * 0.96) : (st.focusMultiplier || 1.32);
    const k = st.focusZoom ? st.focusZoom : Math.min(Math.max(12, defaultK * 2.5), defaultK * mult);
    const tx = targetX - pos.x * k;
    const ty = targetY - pos.y * k;

    svg.transition()
      .duration(720)
      .ease(d3.easeCubicInOut)
      .call(zoomBehavior.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
  }

  function flyToLifeFrame() {
    state.worldMode = false;
    if (!svg || !zoomBehavior || !defaultTransform) return;
    svg.transition()
      .duration(720)
      .ease(d3.easeCubicInOut)
      .call(zoomBehavior.transform, defaultTransform)
      .on('end', () => syncZoomLayers(defaultTransform));
  }

  function flyToWorldGlobe() {
    state.worldMode = true;
    if (state.selectedIdx !== null) {
      closeChapter(true);
    }
    if (!svg || !zoomBehavior) return;
    svg.transition()
      .duration(820)
      .ease(d3.easeCubicInOut)
      .call(zoomBehavior.transform, d3.zoomIdentity)
      .on('end', () => syncZoomLayers(d3.zoomIdentity));
  }

  /* ========================================================================
     TOOLTIPS & TRACE PLAYBACK
     ======================================================================== */
  function showTooltip(meta, title, detail, cx, cy) {
    const tt = document.getElementById('mapTooltip');
    document.getElementById('ttMeta').textContent = meta;
    document.getElementById('ttTitle').textContent = title;
    const dEl = document.getElementById('ttDetail');
    dEl.textContent = detail || '';
    dEl.style.display = detail ? '' : 'none';
    tt.style.opacity = '1';
    moveTooltip(cx, cy);
  }

  function moveTooltip(cx, cy) {
    const tt = document.getElementById('mapTooltip');
    tt.style.left = `${Math.min(window.innerWidth - 280, cx + 18)}px`;
    tt.style.top = `${Math.max(16, cy - 58)}px`;
  }

  function hideTooltip() {
    document.getElementById('mapTooltip').style.opacity = '0';
  }

  function stopTrace() {
    state.isTracing = false;
    if (state.traceTimer) {
      clearTimeout(state.traceTimer);
      state.traceTimer = null;
    }
    updateTraceUI();
  }

  function scheduleNextTrace() {
    if (!state.isTracing || !state.figure) return;
    if (state.traceTimer) clearTimeout(state.traceTimer);
    state.traceTimer = setTimeout(() => {
      if (!state.isTracing) return;
      const nextIdx = state.selectedIdx === null ? 0 : state.selectedIdx + 1;
      if (nextIdx < state.figure.stages.length) {
        openChapter(nextIdx, true);
      } else {
        stopTrace();
      }
    }, 7000);
  }

  function updateTraceUI() {
    document.getElementById('traceIcon').textContent = state.isTracing ? '❚❚' : '▶';
    document.getElementById('traceLabel').textContent = state.isTracing ? 'Pause' : 'Trace Life';
  }

  /* ========================================================================
     BOTTOM TIMELINE & ARCHIVAL MONOGRAPH SHEET
     ======================================================================== */
  function renderScrubber() {
    const nav = document.getElementById('yearScrubber');
    if (!nav || !state.figure) return;

    nav.innerHTML = state.figure.stages
      .map(
        (st, idx) => `
          <button
            type="button"
            data-open-idx="${idx}"
            data-hover-idx="${idx}"
            title="${st.shortPlace} · ${st.year}${st.age ? ' (' + st.age + ')' : ''}"
            class="scrubber-year ${state.selectedIdx === idx ? 'active' : ''}"
          >
            <span class="scrubber-num">${st.number}.</span>
            <span>${st.year}</span>
          </button>
        `
      )
      .join('');

    if (state.selectedIdx !== null) {
      const activeBtn = nav.querySelector('.scrubber-year.active');
      if (activeBtn && activeBtn.scrollIntoView) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  function renderDrawer() {
    const sheet = document.getElementById('chapterDrawer');

    if (state.selectedIdx === null || !state.figure) {
      sheet.classList.remove('open');
      document.body.classList.remove('sheet-open');
      return;
    }

    const baseStage = state.figure.stages[state.selectedIdx];
    const ch = getEffectiveStage(state.selectedIdx);
    const total = state.figure.stages.length;

    sheet.classList.add('open');
    document.body.classList.add('sheet-open');

    const bodyEl = document.getElementById('drawerBody');
    bodyEl.classList.remove('sheet-swap');
    void bodyEl.offsetWidth;
    bodyEl.classList.add('sheet-swap');
    bodyEl.scrollTop = 0;

    const km = distanceFromOriginKm(baseStage.coords);
    const isBirth = /^birth$/i.test(String(ch.age || '').trim());
    const ageLabel = isBirth ? 'Age 0 (Birth)' : (ch.age || '');
    const distText = km === 0
      ? (isBirth ? 'Birthplace' : `Origin (${state.figure.originName})`)
      : `${km.toLocaleString()} km from ${state.figure.originName}`;

    document.getElementById('drawerChapter').textContent = `Stage ${baseStage.roman || ROMAN[baseStage.number] || baseStage.number}`;
    document.getElementById('drawerLocationTop').textContent = ch.location;

    document.getElementById('drawerYear').textContent = ch.year;
    document.getElementById('drawerDate').textContent = ch.date;
    document.getElementById('drawerAgeDist').innerHTML = ageLabel
      ? `<span class="sheet-age-accent">${ageLabel}</span> &middot; ${distText}`
      : distText;

    document.getElementById('drawerTitle').textContent = ch.title;
    document.getElementById('drawerProse').textContent = ch.prose;

    const subNav = document.getElementById('subStageNav');
    if (baseStage.subStages && baseStage.subStages.length > 1) {
      subNav.classList.remove('hidden');
      subNav.innerHTML =
        `<span class="sub-stage-label">${baseStage.subTabsLabel || 'Chapters:'}</span>` +
        baseStage.subStages
          .map((sub, sIdx) => {
            const isAct = state.subStageIdx === sIdx;
            return `<button type="button" data-sub-idx="${sIdx}" class="sub-stage-btn ${isAct ? 'active' : ''}">${sub.label}</button>`;
          })
          .join('');
    } else {
      subNav.classList.add('hidden');
    }

    const metricEl = document.getElementById('metricBlock');
    if (ch.metric) {
      metricEl.classList.remove('hidden');
      document.getElementById('metricLabel').textContent = ch.metric.label;
      document.getElementById('metricSummary').textContent = ch.metric.summary;
      document.getElementById('metricRows').innerHTML = ch.metric.rows
        .map(
          (r) => `
            <div class="copper-metric-row">
              <span class="copper-metric-date">${r.date}</span>
              <div class="copper-metric-track">
                <div class="copper-metric-bar" style="width: ${r.width}; background-color: ${r.color};"></div>
              </div>
              <span class="copper-metric-val">${r.value}</span>
            </div>
          `
        )
        .join('');
    } else {
      metricEl.classList.add('hidden');
    }

    const factBlock = document.getElementById('factBlock');
    if (ch.fact) {
      factBlock.classList.remove('hidden');
      document.getElementById('drawerFact').textContent = ch.fact;
    } else {
      factBlock.classList.add('hidden');
    }

    // Literary epigraph quote + optional original language toggle (supports quote.orig/origLang or quote.fr)
    const q = ch.quote;
    const origText = q.orig || q.fr || '';
    const origLabel = q.origLang || (q.fr ? 'Français' : '');
    const useOrig = state.lang === 'orig' && Boolean(origText);
    document.getElementById('drawerQuote').textContent = `“${useOrig ? origText : q.en}”`;
    document.getElementById('drawerProvenance').textContent = `— ${q.provenance}`;

    const langEl = document.getElementById('drawerLangToggle');
    if (origText) {
      langEl.classList.remove('hidden');
      langEl.innerHTML = `
        <button type="button" data-lang="en" class="lang-btn ${!useOrig ? 'active' : ''}">English</button>
        <span class="lang-sep">/</span>
        <button type="button" data-lang="orig" class="lang-btn ${useOrig ? 'active' : ''}">${origLabel}</button>
      `;
    } else {
      langEl.classList.add('hidden');
    }

    const prevBtn = document.getElementById('drawerPrevBtn');
    const nextBtn = document.getElementById('drawerNextBtn');
    const prevCh = state.selectedIdx > 0 ? state.figure.stages[state.selectedIdx - 1] : null;
    const nextCh = state.selectedIdx < total - 1 ? state.figure.stages[state.selectedIdx + 1] : null;

    prevBtn.disabled = !prevCh;
    prevBtn.textContent = prevCh ? `← ${prevCh.number}. ${prevCh.shortPlace}` : '← Origin';
    document.getElementById('drawerCounter').textContent = `${baseStage.roman || ROMAN[baseStage.number] || baseStage.number} of ${ROMAN[total] || total}`;
    nextBtn.disabled = !nextCh;
    nextBtn.textContent = nextCh ? `${nextCh.number}. ${nextCh.shortPlace} →` : `Finis (${baseStage.year})`;
  }

  function openChapter(idx, fromTrace) {
    if (!state.figure || idx < 0 || idx >= state.figure.stages.length) return;
    if (!fromTrace) stopTrace();
    hideTooltip();
    state.worldMode = false;

    state.selectedIdx = idx;
    const st = state.figure.stages[idx];
    if (st.subStages) {
      const defIdx = st.subStages.findIndex((s) => s.isDefault);
      state.subStageIdx = defIdx >= 0 ? defIdx : 0;
    } else {
      state.subStageIdx = null;
    }
    state.lang = 'en';

    renderDrawer();
    renderScrubber();
    requestAnimationFrame(() => {
      updateMapHighlights(true);
      flyCameraToChapter(idx);
    });
    if (fromTrace && state.isTracing) {
      scheduleNextTrace();
    }
  }

  function closeChapter(skipCameraReset) {
    stopTrace();
    state.selectedIdx = null;
    state.subStageIdx = null;
    state.lang = 'en';
    renderDrawer();
    renderScrubber();
    requestAnimationFrame(() => {
      updateMapHighlights(false);
      if (!skipCameraReset) flyToLifeFrame();
    });
  }

  /* ========================================================================
     LOAD FIGURE & INIT
     ======================================================================== */
  function loadFigureByIndex(idx) {
    const figures = global.ATLAS_REGISTRY || [];
    if (!figures.length) return;
    const safeIdx = ((idx % figures.length) + figures.length) % figures.length;
    const figure = figures[safeIdx];

    stopTrace();
    setIndexOpen(false);
    hideTooltip();

    state.figureIdx = safeIdx;
    state.figure = figure;
    state.selectedIdx = null;
    state.subStageIdx = null;
    state.hoverIdx = null;
    state.lang = 'en';
    state.worldMode = false;

    if (global.history && global.history.replaceState) {
      global.history.replaceState(null, '', `#${figure.id}`);
    }

    renderFigureHeader();
    renderScrubber();
    renderDrawer();
    buildBaseAtlas();
  }

  function init() {
    document.getElementById('closeDrawerBtn').addEventListener('click', () => closeChapter(false));
    document.getElementById('openIndexBtn').addEventListener('click', () => setIndexOpen(!state.indexOpen));
    document.getElementById('closeIndexBtn').addEventListener('click', () => setIndexOpen(false));
    const backdropEl = document.getElementById('drawerBackdrop');
    if (backdropEl) backdropEl.addEventListener('click', () => setIndexOpen(false));
    document.getElementById('prevFigureBtn').addEventListener('click', () => loadFigureByIndex(state.figureIdx - 1));
    document.getElementById('nextFigureBtn').addEventListener('click', () => loadFigureByIndex(state.figureIdx + 1));

    // Native mobile touch gestures: swipe-down to dismiss sheet, swipe left/right to turn stages, swipe-left to close index
    (function bindMobileGestures() {
      const sheet = document.getElementById('chapterDrawer');
      const sheetBody = document.getElementById('drawerBody');
      if (sheet) {
        let sx = 0;
        let sy = 0;
        let tracking = false;
        let startedAtTop = false;
        let startedOnHeader = false;

        sheet.addEventListener('touchstart', (e) => {
          if (!isMobileLayout() || !sheet.classList.contains('open') || e.touches.length !== 1) return;
          const t = e.touches[0];
          sx = t.clientX;
          sy = t.clientY;
          tracking = true;
          startedAtTop = !sheetBody || sheetBody.scrollTop <= 2;
          startedOnHeader = Boolean(e.target.closest('.sheet-grabber, .sheet-top'));
        }, { passive: true });

        sheet.addEventListener('touchend', (e) => {
          if (!tracking || !e.changedTouches.length) return;
          tracking = false;
          const t = e.changedTouches[0];
          const dx = t.clientX - sx;
          const dy = t.clientY - sy;

          // Swipe down to dismiss bottom sheet
          if ((startedOnHeader || startedAtTop) && dy > 68 && Math.abs(dy) > Math.abs(dx) * 1.35) {
            closeChapter(false);
            return;
          }

          // Horizontal folio page turn between stages
          if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6 && state.figure && state.selectedIdx !== null) {
            if (dx < 0 && state.selectedIdx < state.figure.stages.length - 1) {
              openChapter(state.selectedIdx + 1, false);
            } else if (dx > 0 && state.selectedIdx > 0) {
              openChapter(state.selectedIdx - 1, false);
            }
          }
        }, { passive: true });
      }

      const idxDrawer = document.getElementById('indexDrawer');
      if (idxDrawer) {
        let ix = 0;
        let iy = 0;
        idxDrawer.addEventListener('touchstart', (e) => {
          if (e.touches.length !== 1) return;
          ix = e.touches[0].clientX;
          iy = e.touches[0].clientY;
        }, { passive: true });
        idxDrawer.addEventListener('touchend', (e) => {
          if (!state.indexOpen || !e.changedTouches.length) return;
          const dx = e.changedTouches[0].clientX - ix;
          const dy = e.changedTouches[0].clientY - iy;
          if (dx < -64 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            setIndexOpen(false);
          }
        }, { passive: true });
      }
    })();

    document.getElementById('lifeViewBtn').addEventListener('click', () => {
      if (state.selectedIdx !== null) closeChapter(false);
      else flyToLifeFrame();
    });
    document.getElementById('worldViewBtn').addEventListener('click', flyToWorldGlobe);

    document.getElementById('drawerPrevBtn').addEventListener('click', () => {
      if (state.selectedIdx !== null && state.selectedIdx > 0) openChapter(state.selectedIdx - 1, false);
    });
    document.getElementById('drawerNextBtn').addEventListener('click', () => {
      if (state.figure && state.selectedIdx !== null && state.selectedIdx < state.figure.stages.length - 1) {
        openChapter(state.selectedIdx + 1, false);
      }
    });

    document.getElementById('zoomInBtn').addEventListener('click', () => {
      if (svg && zoomBehavior) svg.transition().duration(320).call(zoomBehavior.scaleBy, 1.45);
    });
    document.getElementById('zoomOutBtn').addEventListener('click', () => {
      if (svg && zoomBehavior) svg.transition().duration(320).call(zoomBehavior.scaleBy, 0.68);
    });

    document.getElementById('traceBtn').addEventListener('click', () => {
      if (!state.figure) return;
      if (state.isTracing) {
        stopTrace();
      } else {
        state.isTracing = true;
        updateTraceUI();
        const startIdx =
          state.selectedIdx === null || state.selectedIdx >= state.figure.stages.length - 1
            ? 0
            : state.selectedIdx + 1;
        openChapter(startIdx, true);
      }
    });

    document.addEventListener('click', (e) => {
      const figBtn = e.target.closest('[data-figure-idx]');
      if (figBtn) {
        loadFigureByIndex(Number(figBtn.getAttribute('data-figure-idx')));
        return;
      }
      const openBtn = e.target.closest('[data-open-idx]');
      if (openBtn) {
        if (state.indexOpen) setIndexOpen(false);
        openChapter(Number(openBtn.getAttribute('data-open-idx')), false);
        return;
      }
      const subBtn = e.target.closest('[data-sub-idx]');
      if (subBtn && state.selectedIdx !== null) {
        state.subStageIdx = Number(subBtn.getAttribute('data-sub-idx'));
        state.lang = 'en';
        renderDrawer();
        return;
      }
      const langBtn = e.target.closest('[data-lang]');
      if (langBtn) {
        state.lang = langBtn.getAttribute('data-lang');
        renderDrawer();
      }
    });

    const scrubber = document.getElementById('yearScrubber');
    scrubber.addEventListener('mouseover', (e) => {
      const btn = e.target.closest('[data-hover-idx]');
      if (btn && state.selectedIdx === null) {
        state.hoverIdx = Number(btn.getAttribute('data-hover-idx'));
        updateMapHighlights(false);
      }
    });
    scrubber.addEventListener('mouseleave', () => {
      if (state.selectedIdx === null) {
        state.hoverIdx = null;
        updateMapHighlights(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!state.figure) return;
      if (e.key === 'Escape') {
        if (state.indexOpen) setIndexOpen(false);
        else if (state.selectedIdx !== null) closeChapter(false);
      } else if (e.key === 'ArrowRight') {
        if (state.selectedIdx === null) openChapter(0, false);
        else if (state.selectedIdx < state.figure.stages.length - 1) openChapter(state.selectedIdx + 1, false);
      } else if (e.key === 'ArrowLeft') {
        if (state.selectedIdx !== null && state.selectedIdx > 0) openChapter(state.selectedIdx - 1, false);
      } else if (e.key === ' ' && document.activeElement.tagName !== 'BUTTON') {
        e.preventDefault();
        document.getElementById('traceBtn').click();
      }
    });

    let resizeTimer = null;
    let lastWinW = global.innerWidth;
    let lastWinH = global.innerHeight;
    window.addEventListener('resize', () => {
      const w = global.innerWidth;
      const h = global.innerHeight;
      // Ignore small mobile browser URL-bar show/hide height shifts when width is unchanged
      if (w === lastWinW && Math.abs(h - lastWinH) < 95) return;
      lastWinW = w;
      lastWinH = h;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!state.figure) return;
        buildBaseAtlas();
        if (state.selectedIdx !== null) flyCameraToChapter(state.selectedIdx);
      }, 140);
    });

    const figures = global.ATLAS_REGISTRY || [];
    if (figures.length > 0) {
      const hashId = (global.location.hash || '').replace(/^#/, '');
      const startIdx = Math.max(0, figures.findIndex((f) => f.id === hashId));
      loadFigureByIndex(startIdx);
    }
  }

  init();
})(window);
