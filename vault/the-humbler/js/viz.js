/* ==========================================================================
   THE HUMBLER — D3 / SVG Archival Visualization Engine
   1. Quiet Ancient-World Meridian Backdrop (Confession Threshold)
   2. Engraved Lineage Timeline Plate (Origin -> Echoes -> You, 2026)
   3. Natural Earth 50m World Origin Atlas (Geodesic Echo Arcs + D3 Zoom)
   Strictly adheres to anti-AI-slop & SVG interaction craft:
   - Never re-appends SVG nodes on hover
   - Guards D3 zoom filter against stealing medallion clicks
   - Suppresses pointer focus rings cleanly while preserving keyboard focus
   ========================================================================== */

(function (global) {
  'use strict';

  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  const CRADLES = [
    { name: 'Memphis', coords: [31.25, 29.85] },
    { name: 'Shuruppak', coords: [45.50, 31.78] },
    { name: 'Jerusalem', coords: [35.23, 31.78] },
    { name: 'Athens', coords: [23.73, 37.98] },
    { name: 'Ephesus', coords: [27.34, 37.94] },
    { name: 'Rome', coords: [12.49, 41.89] },
    { name: 'Varanasi', coords: [83.02, 25.38] },
    { name: 'Mithila', coords: [85.92, 26.73] },
    { name: 'Qufu', coords: [116.99, 35.59] },
    { name: 'Luoyi', coords: [112.45, 34.62] }
  ];

  let cachedWorldFeatures = null;

  /* ========================================================================
     TOPOJSON -> GEOJSON DECODER (Natural Earth 50m, local zero-lag)
     ======================================================================== */
  function decodeWorldFeatures() {
    if (cachedWorldFeatures) return cachedWorldFeatures;
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
          id: geom.id,
          properties: geom.properties || {},
          geometry
        });
      }
    });

    cachedWorldFeatures = features;
    return features;
  }

  function formatYearShort(year) {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return `${year} CE`;
  }

  function buildNodes(entry) {
    const nodes = [
      Object.assign({ index: 0, isOrigin: true, roman: ROMAN[1] }, entry.origin)
    ];
    (entry.echoes || []).forEach((e, i) => {
      nodes.push(
        Object.assign({ index: i + 1, isOrigin: false, roman: ROMAN[i + 2] || String(i + 2) }, e)
      );
    });
    return nodes;
  }

  /* ========================================================================
     1. QUIET ANCIENT-WORLD BACKDROP (CONFESSION THRESHOLD)
     ======================================================================== */
  function renderBackdropMap(svgSelector) {
    const svgEl = document.querySelector(svgSelector);
    if (!svgEl || !global.d3) return;
    const d3 = global.d3;

    const w = svgEl.clientWidth || window.innerWidth || 1280;
    const h = svgEl.clientHeight || window.innerHeight || 800;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const features = decodeWorldFeatures();
    const projection = d3
      .geoNaturalEarth1()
      .center([52, 28])
      .scale(Math.max(w * 0.44, 480))
      .translate([w * 0.5, h * 0.52]);

    const path = d3.geoPath(projection);
    const g = svg.append('g').attr('class', 'backdrop-world');

    /* Faint archival graticule */
    const graticule = d3.geoGraticule().step([20, 20]);
    g.append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(237, 230, 214, 0.032)')
      .attr('stroke-width', 0.7);

    /* Subtle smoked-vellum continents */
    g.selectAll('path.backdrop-land')
      .data(features)
      .join('path')
      .attr('class', 'backdrop-land')
      .attr('d', path)
      .attr('fill', 'rgba(30, 28, 24, 0.58)')
      .attr('stroke', 'rgba(196, 162, 98, 0.09)')
      .attr('stroke-width', 0.65);

    /* Quiet stipples marking ancient cradles of thought */
    const cradleG = g.append('g').attr('class', 'backdrop-cradles');
    CRADLES.forEach((c) => {
      const pt = projection(c.coords);
      if (!pt) return;
      cradleG
        .append('circle')
        .attr('cx', pt[0])
        .attr('cy', pt[1])
        .attr('r', 2.2)
        .attr('fill', 'rgba(196, 162, 98, 0.34)');
      cradleG
        .append('circle')
        .attr('cx', pt[0])
        .attr('cy', pt[1])
        .attr('r', 6.5)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(196, 162, 98, 0.12)')
        .attr('stroke-width', 0.6);
    });
  }

  /* ========================================================================
     2. ENGRAVED LINEAGE TIMELINE PLATE (ORIGIN -> ECHOES -> YOU, NOW)
     ======================================================================== */
  function renderTimeline(svgSelector, result, activeIndex, callbacks) {
    const svgEl = document.querySelector(svgSelector);
    if (!svgEl || !global.d3) return;
    const d3 = global.d3;

    const w = Math.max(svgEl.clientWidth || 920, 420);
    const h = Math.max(svgEl.clientHeight || 310, 270);

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const nodes = buildNodes(result.entry);
    const nowYear = new Date().getFullYear();

    const padLeft = Math.max(66, Math.min(108, w * 0.1));
    const padRight = Math.max(66, Math.min(108, w * 0.1));
    const axisY = h * 0.6;
    const usableW = Math.max(240, w - padLeft - padRight);

    /* Reserve right 24% of the span for the millennia gulf to "You · Today" */
    const ancientEndX = padLeft + usableW * (nodes.length === 1 ? 0.22 : 0.72);
    const nowX = w - padRight;

    /* Compute calibrated x positions for ancient nodes (proportional + guaranteed clearance) */
    const minYear = nodes[0].year;
    const maxAncientYear = nodes[nodes.length - 1].year;
    const yearRange = Math.max(1, maxAncientYear - minYear);

    const rawXs = nodes.map((n, i) => {
      if (nodes.length === 1) return padLeft + usableW * 0.18;
      const frac = yearRange <= 20 ? i / (nodes.length - 1) : (n.year - minYear) / yearRange;
      /* Blend proportional chronological spacing (65%) with even spacing (35%) for optical grace */
      const evenFrac = i / (nodes.length - 1);
      const blended = frac * 0.62 + evenFrac * 0.38;
      return padLeft + blended * (ancientEndX - padLeft);
    });

    /* Enforce minimum screen-space clearance so medallions and labels never collide */
    const minGap = Math.min(148, (ancientEndX - padLeft) / Math.max(1, nodes.length - 0.6));
    const xs = rawXs.slice();
    for (let i = 1; i < xs.length; i++) {
      if (xs[i] - xs[i - 1] < minGap) {
        xs[i] = xs[i - 1] + minGap;
      }
    }
    if (xs.length > 1 && xs[xs.length - 1] > ancientEndX) {
      const overflow = xs[xs.length - 1] - ancientEndX;
      const span = xs[xs.length - 1] - xs[0];
      const targetSpan = Math.max(80, ancientEndX - padLeft);
      const scale = targetSpan / Math.max(1, span);
      for (let i = 0; i < xs.length; i++) {
        xs[i] = padLeft + (xs[i] - xs[0]) * scale;
      }
      void overflow;
    }

    const defs = svg.append('defs');

    /* Subtle crimson-to-gold gradient for the sweeping Rückblick arc */
    const arcGrad = defs
      .append('linearGradient')
      .attr('id', 'humblerArcGrad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    arcGrad.append('stop').attr('offset', '0%').attr('stop-color', '#C24136').attr('stop-opacity', 0.92);
    arcGrad.append('stop').attr('offset', '58%').attr('stop-color', '#C4A262').attr('stop-opacity', 0.68);
    arcGrad.append('stop').attr('offset', '100%').attr('stop-color', '#8D8372').attr('stop-opacity', 0.35);

    /* Subtle baseline hairline ticks */
    const tickG = svg.append('g').attr('class', 'timeline-ticks');
    const tickCount = Math.floor(usableW / 24);
    for (let i = 0; i <= tickCount; i++) {
      const tx = padLeft + (i / tickCount) * usableW;
      const major = i % 5 === 0;
      tickG
        .append('line')
        .attr('x1', tx)
        .attr('x2', tx)
        .attr('y1', axisY - (major ? 5 : 2.5))
        .attr('y2', axisY + (major ? 5 : 2.5))
        .attr('stroke', major ? 'rgba(237, 230, 214, 0.12)' : 'rgba(237, 230, 214, 0.055)')
        .attr('stroke-width', 0.8);
    }

    /* Main horizontal archival rule */
    svg
      .append('line')
      .attr('x1', padLeft - 20)
      .attr('x2', nowX + 18)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'rgba(237, 230, 214, 0.16)')
      .attr('stroke-width', 1);

    /* Dashed millennia bridge between last ancient echo and Today */
    svg
      .append('line')
      .attr('x1', xs[xs.length - 1] + 18)
      .attr('x2', nowX - 16)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'rgba(196, 162, 98, 0.28)')
      .attr('stroke-width', 1.1)
      .attr('stroke-dasharray', '3 5');

    /* Sweeping Rückblick Arc from "You · Today" all the way back to Oldest Origin (Medallion I) */
    const originX = xs[0];
    const arcHeight = Math.min(120, Math.max(82, (nowX - originX) * 0.16));
    const midX = (originX + nowX) / 2;
    const ctrlY = axisY - arcHeight * 1.48;
    const apexY = axisY - arcHeight * 0.74;

    const mainArcPath = `M ${nowX} ${axisY - 12} Q ${midX} ${ctrlY} ${originX} ${axisY - 18}`;
    const mainArc = svg
      .append('path')
      .attr('d', mainArcPath)
      .attr('fill', 'none')
      .attr('stroke', 'url(#humblerArcGrad)')
      .attr('stroke-width', 1.45);

    /* Subtle draw-in animation on first render */
    const totalLen = mainArc.node().getTotalLength();
    mainArc
      .attr('stroke-dasharray', `${totalLen} ${totalLen}`)
      .attr('stroke-dashoffset', totalLen)
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

    /* Subtle secondary arcs from Origin to each Echo */
    for (let i = 1; i < nodes.length; i++) {
      const ex = xs[i];
      const emid = (originX + ex) / 2;
      const eh = Math.min(54, Math.max(26, (ex - originX) * 0.14));
      svg
        .append('path')
        .attr('d', `M ${originX} ${axisY + 16} Q ${emid} ${axisY + eh * 1.5} ${ex} ${axisY + 14}`)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(196, 162, 98, 0.24)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2.5 3.5');
    }

    /* Engraved Span Caption at Apex of the Rückblick Arc */
    const spanText = `←  ${result.yearsLate.toLocaleString()} years earlier  →`;
    svg
      .append('text')
      .attr('x', midX)
      .attr('y', apexY - 12)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-arc-caption atlas-halo')
      .text(spanText);

    /* "You · Today" Rightmost Humbled Node */
    const nowG = svg.append('g').attr('class', 'now-node').attr('transform', `translate(${nowX}, ${axisY})`);
    nowG
      .append('circle')
      .attr('r', 12)
      .attr('fill', '#11100E')
      .attr('stroke', 'rgba(237, 230, 214, 0.34)')
      .attr('stroke-width', 1.1)
      .attr('stroke-dasharray', '2.5 2.5');
    nowG
      .append('circle')
      .attr('r', 3.2)
      .attr('fill', '#8D8372');
    nowG
      .append('text')
      .attr('y', -22)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-year-label is-muted')
      .text(`${nowYear} CE`);
    nowG
      .append('text')
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-node-title is-muted')
      .text('Your Insight');
    nowG
      .append('text')
      .attr('y', 46)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-node-sub')
      .text('Today');

    /* Ancient Medallions (Origin I + Echoes II..IV) */
    const pinsG = svg.append('g').attr('class', 'timeline-pins');
    nodes.forEach((node, idx) => {
      const x = xs[idx];
      const isSelected = idx === activeIndex;
      const isOrigin = idx === 0;
      const radius = isOrigin ? 16 : 13.5;

      const g = pinsG
        .append('g')
        .attr('class', `pin-group${isSelected ? ' is-active' : ''}${isOrigin ? ' is-origin' : ''}`)
        .attr('transform', `translate(${x}, ${axisY})`)
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', `${isOrigin ? 'Oldest Origin' : 'Echo'}: ${node.thinker}, ${node.yearLabel}`)
        .on('mouseenter', function (event) {
          if (callbacks && callbacks.onHover) callbacks.onHover(node, event);
        })
        .on('mousemove', function (event) {
          if (callbacks && callbacks.onMove) callbacks.onMove(event);
        })
        .on('mouseleave', function () {
          if (callbacks && callbacks.onLeave) callbacks.onLeave();
        })
        .on('click', function (event) {
          event.stopPropagation();
          if (event.currentTarget && event.currentTarget.blur) event.currentTarget.blur();
          if (callbacks && callbacks.onSelect) callbacks.onSelect(idx);
        })
        .on('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (callbacks && callbacks.onSelect) callbacks.onSelect(idx);
          }
        });

      /* Outer gold halo ring (visible on active or origin) */
      g.append('circle')
        .attr('class', 'pin-halo-ring')
        .attr('r', radius + 6)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(196, 162, 98, 0.62)' : 'rgba(196, 162, 98, 0.16)')
        .attr('stroke-width', isSelected ? 1.15 : 0.7)
        .attr('opacity', isSelected || isOrigin ? 1 : 0);

      /* Main medallion seal disc */
      g.append('circle')
        .attr('class', 'pin-disc')
        .attr('r', radius)
        .attr('fill', isSelected ? '#9F2B24' : isOrigin ? '#2B1614' : '#171512')
        .attr('stroke', isSelected ? '#C4A262' : isOrigin ? '#C24136' : 'rgba(196, 162, 98, 0.56)')
        .attr('stroke-width', isSelected ? 1.6 : 1.15);

      /* Inner engraved ring */
      g.append('circle')
        .attr('class', 'pin-inner-ring')
        .attr('r', radius - 3.5)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(237, 230, 214, 0.34)' : 'rgba(196, 162, 98, 0.2)')
        .attr('stroke-width', 0.6);

      /* Roman numeral inside medallion */
      g.append('text')
        .attr('class', 'pin-num')
        .attr('y', 4.5)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected ? '#EDE6D6' : isOrigin ? '#EDE6D6' : '#C4A262')
        .text(node.roman);

      /* Year above medallion */
      g.append('text')
        .attr('class', `viz-year-label atlas-halo${isOrigin ? ' is-origin' : ''}`)
        .attr('y', -(radius + 13))
        .attr('text-anchor', 'middle')
        .text(formatYearShort(node.year));

      /* First-recorded small kicker above Origin */
      if (isOrigin) {
        g.append('text')
          .attr('class', 'viz-origin-kicker atlas-halo')
          .attr('y', -(radius + 29))
          .attr('text-anchor', 'middle')
          .text('OLDEST ORIGIN');
      }

      /* Thinker name + short place below medallion */
      const shortName = node.thinker.replace(/\s*\([^)]*\)/g, '').trim();
      const displayName = shortName.length > 22 ? shortName.slice(0, 20) + '…' : shortName;
      const shortPlace = (node.place || '').split(',')[0];

      g.append('text')
        .attr('class', `viz-node-title atlas-halo${isSelected ? ' is-active' : ''}`)
        .attr('y', radius + 22)
        .attr('text-anchor', 'middle')
        .text(displayName);

      g.append('text')
        .attr('class', 'viz-node-sub atlas-halo')
        .attr('y', radius + 38)
        .attr('text-anchor', 'middle')
        .text(shortPlace);
    });
  }

  /* ========================================================================
     3. NATURAL EARTH 50m WORLD ORIGIN ATLAS (INTERACTIVE GEODESIC MAP)
     ======================================================================== */
  function renderWorldOriginMap(svgSelector, result, activeIndex, callbacks) {
    const svgEl = document.querySelector(svgSelector);
    if (!svgEl || !global.d3) return;
    const d3 = global.d3;

    const w = Math.max(svgEl.clientWidth || 920, 560);
    const h = Math.max(svgEl.clientHeight || 360, 320);

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const nodes = buildNodes(result.entry);
    const features = decodeWorldFeatures();

    /* Compute geographic framing centered on Origin + Echoes with generous ancient-world margins */
    const lons = nodes.map((n) => n.coords[0]);
    const lats = nodes.map((n) => n.coords[1]);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const centerLon = (minLon + maxLon) / 2;
    const centerLat = (minLat + maxLat) / 2;
    const lonSpan = Math.max(44, (maxLon - minLon) * 1.48);
    const latSpan = Math.max(24, (maxLat - minLat) * 1.65);

    const baseProjection = d3
      .geoNaturalEarth1()
      .scale(1)
      .translate([0, 0]);

    const pNW = baseProjection([Math.max(-165, centerLon - lonSpan / 2), Math.min(72, centerLat + latSpan / 2)]);
    const pSE = baseProjection([Math.min(165, centerLon + lonSpan / 2), Math.max(-50, centerLat - latSpan / 2)]);
    const dx = Math.max(0.15, Math.abs(pSE[0] - pNW[0]));
    const dy = Math.max(0.15, Math.abs(pSE[1] - pNW[1]));
    const fitScale = Math.min((w * 0.82) / dx, (h * 0.78) / dy);
    const clampedScale = Math.max(220, Math.min(1050, fitScale));

    const projection = d3
      .geoNaturalEarth1()
      .center([centerLon, centerLat])
      .scale(clampedScale)
      .translate([w * 0.5, h * 0.52]);

    const path = d3.geoPath(projection);
    const rootG = svg.append('g').attr('class', 'origin-map-root');

    /* Graticule */
    const graticule = d3.geoGraticule().step([15, 15]);
    rootG
      .append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(237, 230, 214, 0.048)')
      .attr('stroke-width', 0.65);

    /* Landmasses (Natural Earth 50m) */
    rootG
      .selectAll('path.origin-land')
      .data(features)
      .join('path')
      .attr('class', 'origin-land')
      .attr('d', path)
      .attr('fill', '#1E1C18')
      .attr('stroke', '#3B362D')
      .attr('stroke-width', 0.65);

    /* Subtle sea captions */
    const waters = [
      { label: 'MEDITERRANEAN SEA', coords: [18, 34.8] },
      { label: 'ARABIAN SEA', coords: [64, 15.5] },
      { label: 'BAY OF BENGAL', coords: [88, 14] },
      { label: 'EAST CHINA SEA', coords: [125, 29] }
    ];
    waters.forEach((wt) => {
      const pt = projection(wt.coords);
      if (!pt) return;
      rootG
        .append('text')
        .attr('x', pt[0])
        .attr('y', pt[1])
        .attr('text-anchor', 'middle')
        .attr('class', 'map-water-caption')
        .text(wt.label);
    });

    /* Geodesic curved arcs from Oldest Origin to each Independent Echo */
    const originPt = projection(nodes[0].coords);
    const arcsG = rootG.append('g').attr('class', 'origin-arcs');

    for (let i = 1; i < nodes.length; i++) {
      const targetPt = projection(nodes[i].coords);
      if (!originPt || !targetPt) continue;
      const dist = Math.hypot(targetPt[0] - originPt[0], targetPt[1] - originPt[1]);
      if (dist < 14) continue;
      const mx = (originPt[0] + targetPt[0]) / 2;
      const my = (originPt[1] + targetPt[1]) / 2 - Math.min(72, dist * 0.22);

      const arc = arcsG
        .append('path')
        .attr('d', `M ${originPt[0]} ${originPt[1]} Q ${mx} ${my} ${targetPt[0]} ${targetPt[1]}`)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(196, 162, 98, 0.58)')
        .attr('stroke-width', 1.35)
        .attr('stroke-dasharray', '4 4');

      const len = arc.node().getTotalLength();
      arc
        .attr('stroke-dasharray', `${len} ${len}`)
        .attr('stroke-dashoffset', len)
        .transition()
        .duration(780)
        .delay(i * 120)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0)
        .on('end', function () {
          d3.select(this).attr('stroke-dasharray', '4 4');
        });
    }

    /* Compute projected points + symmetric collision-avoidance for co-located cities (e.g. Rome & Rome) */
    const projected = nodes.map((n) => {
      const p = projection(n.coords) || [w / 2, h / 2];
      return { x: p[0], y: p[1], ox: p[0], oy: p[1], nudgedDir: 0 };
    });
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const d = Math.hypot(projected[j].x - projected[i].x, projected[j].y - projected[i].y);
        if (d < 44) {
          if (d < 6) {
            /* Co-located city: part symmetrically left/right with clear vertical offset */
            projected[i].x -= 26;
            projected[i].nudgedDir = -1;
            projected[j].x += 26;
            projected[j].nudgedDir = 1;
          } else {
            const ux = (projected[j].x - projected[i].x) / d;
            const uy = (projected[j].y - projected[i].y) / d;
            const push = (46 - d) / 2;
            projected[i].x -= ux * push;
            projected[i].y -= uy * push;
            projected[j].x += ux * push;
            projected[j].y += uy * push;
          }
        }
      }
    }

    /* Engraved Medallion Pins */
    const pinsG = rootG.append('g').attr('class', 'origin-pins');
    nodes.forEach((node, idx) => {
      const pt = projected[idx];
      const isSelected = idx === activeIndex;
      const isOrigin = idx === 0;
      const r = isOrigin ? 13 : 11;

      const g = pinsG
        .append('g')
        .attr('class', `pin-group${isSelected ? ' is-active' : ''}${isOrigin ? ' is-origin' : ''}`)
        .attr('transform', `translate(${pt.x}, ${pt.y})`)
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', `${node.thinker}, ${node.place} (${node.yearLabel})`)
        .on('mouseenter', function (event) {
          if (callbacks && callbacks.onHover) callbacks.onHover(node, event);
        })
        .on('mousemove', function (event) {
          if (callbacks && callbacks.onMove) callbacks.onMove(event);
        })
        .on('mouseleave', function () {
          if (callbacks && callbacks.onLeave) callbacks.onLeave();
        })
        .on('click', function (event) {
          event.stopPropagation();
          if (event.currentTarget && event.currentTarget.blur) event.currentTarget.blur();
          if (callbacks && callbacks.onSelect) callbacks.onSelect(idx);
        })
        .on('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (callbacks && callbacks.onSelect) callbacks.onSelect(idx);
          }
        });

      g.append('circle')
        .attr('class', 'pin-halo-ring')
        .attr('r', r + 5)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(196, 162, 98, 0.72)' : 'rgba(194, 65, 54, 0.32)')
        .attr('stroke-width', isSelected ? 1.15 : 0.75)
        .attr('opacity', isSelected || isOrigin ? 1 : 0);

      g.append('circle')
        .attr('class', 'pin-disc')
        .attr('r', r)
        .attr('fill', isSelected ? '#9F2B24' : isOrigin ? '#2B1614' : '#171512')
        .attr('stroke', isSelected ? '#C4A262' : isOrigin ? '#C24136' : 'rgba(196, 162, 98, 0.62)')
        .attr('stroke-width', isSelected ? 1.5 : 1.1);

      g.append('text')
        .attr('class', 'pin-num')
        .attr('y', 4)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected || isOrigin ? '#EDE6D6' : '#C4A262')
        .text(node.roman);

      const labelOffsetY =
        pt.nudgedDir === -1
          ? -(r + 12)
          : pt.nudgedDir === 1
          ? r + 18
          : idx % 2 === 1 && nodes.length >= 2
          ? -(r + 11)
          : r + 17;
      const shortPlace = (node.place || '').split(',')[0];

      g.append('text')
        .attr('class', `map-pin-label atlas-halo${isSelected ? ' is-active' : ''}`)
        .attr('y', labelOffsetY)
        .attr('text-anchor', 'middle')
        .text(`${shortPlace} · ${formatYearShort(node.year)}`);
    });

    /* D3 Zoom & Pan — strictly guarded against stealing pin clicks */
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([0.7, 5])
      .filter((event) => {
        if (event.target && event.target.closest && event.target.closest('.pin-group')) {
          return false;
        }
        return !event.ctrlKey || event.type === 'wheel';
      })
      .on('zoom', (event) => {
        rootG.attr('transform', event.transform);
      });

    svg.call(zoomBehavior);
  }

  global.HUMBLER_VIZ = {
    renderBackdropMap,
    renderTimeline,
    renderWorldOriginMap,
    buildNodes
  };
})(window);
