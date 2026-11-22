/* ==========================================================================
   THE HUMBLER: D3 / SVG Archival Visualization Engine
   1. Quiet Ancient-World Meridian Backdrop (Confession Threshold)
   2. Engraved Lineage Timeline (Vertical Chronological Spine on Mobile,
      Sweeping Horizontal Engraving on Desktop)
   3. Natural Earth 50m World Origin Atlas (Geodesic Echo Arcs + Zoom Controls)
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
  let activeMapZoom = null;
  let activeMapSvg = null;

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
      .scale(Math.max(w * 0.44, 420))
      .translate([w * 0.5, h * 0.52]);

    const path = d3.geoPath(projection);
    const g = svg.append('g').attr('class', 'backdrop-world');

    const graticule = d3.geoGraticule().step([20, 20]);
    g.append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(237, 230, 214, 0.03)')
      .attr('stroke-width', 0.7);

    g.selectAll('path.backdrop-land')
      .data(features)
      .join('path')
      .attr('class', 'backdrop-land')
      .attr('d', path)
      .attr('fill', 'rgba(30, 28, 24, 0.55)')
      .attr('stroke', 'rgba(196, 162, 98, 0.085)')
      .attr('stroke-width', 0.65);

    const cradleG = g.append('g').attr('class', 'backdrop-cradles');
    CRADLES.forEach((c) => {
      const pt = projection(c.coords);
      if (!pt) return;
      cradleG
        .append('circle')
        .attr('cx', pt[0])
        .attr('cy', pt[1])
        .attr('r', 2.2)
        .attr('fill', 'rgba(196, 162, 98, 0.32)');
      cradleG
        .append('circle')
        .attr('cx', pt[0])
        .attr('cy', pt[1])
        .attr('r', 6.5)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(196, 162, 98, 0.11)')
        .attr('stroke-width', 0.6);
    });
  }

  /* ========================================================================
     2. ENGRAVED LINEAGE TIMELINE (RESPONSIVE VERTICAL SPINE / HORIZONTAL ARC)
     ======================================================================== */
  function renderTimeline(svgSelector, result, activeIndex, callbacks) {
    const svgEl = document.querySelector(svgSelector);
    if (!svgEl || !global.d3) return;
    const d3 = global.d3;

    activeMapZoom = null;
    activeMapSvg = null;

    const nodes = buildNodes(result.entry);
    const nowYear = new Date().getFullYear();
    const containerW = Math.max(280, Math.round(svgEl.clientWidth || svgEl.parentElement.clientWidth || 350));
    const isMobile = containerW < 640;

    if (isMobile) {
      renderMobileVerticalTimeline(d3, svgEl, containerW, nodes, result, activeIndex, nowYear, callbacks);
    } else {
      renderDesktopHorizontalTimeline(d3, svgEl, containerW, nodes, result, activeIndex, nowYear, callbacks);
    }
  }

  /* ------------------------------------------------------------------------
     2A. MOBILE VERTICAL CHRONOLOGICAL SPINE (< 640px)
     Shows every witness with their medallion, full thinker name, year & place
     right inside the visual stage, with a sweeping Rückblick arc on the right.
     ------------------------------------------------------------------------ */
  function renderMobileVerticalTimeline(d3, svgEl, w, nodes, result, activeIndex, nowYear, callbacks) {
    const rowStep = 66;
    const topPad = 36;
    const bottomNodeY = topPad + nodes.length * rowStep + 4;
    const h = bottomNodeY + 34;

    svgEl.style.height = `${h}px`;
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const spineX = 32;
    const arcRightX = w - 16;

    const defs = svg.append('defs');
    const arcGrad = defs
      .append('linearGradient')
      .attr('id', 'humblerVertArcGrad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    arcGrad.append('stop').attr('offset', '0%').attr('stop-color', '#C24136').attr('stop-opacity', 0.9);
    arcGrad.append('stop').attr('offset', '60%').attr('stop-color', '#C4A262').attr('stop-opacity', 0.65);
    arcGrad.append('stop').attr('offset', '100%').attr('stop-color', '#9E9482').attr('stop-opacity', 0.35);

    const lastAncientY = topPad + (nodes.length - 1) * rowStep;

    /* Solid vertical spine through ancient witnesses */
    svg
      .append('line')
      .attr('x1', spineX)
      .attr('x2', spineX)
      .attr('y1', topPad)
      .attr('y2', lastAncientY)
      .attr('stroke', 'rgba(196, 162, 98, 0.35)')
      .attr('stroke-width', 1.4);

    /* Dashed millennia bridge from last ancient witness down to Today */
    svg
      .append('line')
      .attr('x1', spineX)
      .attr('x2', spineX)
      .attr('y1', lastAncientY + 16)
      .attr('y2', bottomNodeY - 14)
      .attr('stroke', 'rgba(196, 162, 98, 0.35)')
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '3 5');

    /* Right-side sweeping Rückblick Arc from Today up to Origin I */
    const midY = (topPad + bottomNodeY) / 2;
    const arcPath = `M ${arcRightX - 18} ${bottomNodeY} Q ${arcRightX + 10} ${midY} ${arcRightX - 18} ${topPad}`;
    svg
      .append('path')
      .attr('d', arcPath)
      .attr('fill', 'none')
      .attr('stroke', 'url(#humblerVertArcGrad)')
      .attr('stroke-width', 1.35);

    /* Ancient Witness Rows (Medallions I..IV + Thinker Name + Year & Place) */
    const pinsG = svg.append('g').attr('class', 'timeline-pins');

    nodes.forEach((node, idx) => {
      const y = topPad + idx * rowStep;
      const isSelected = idx === activeIndex;
      const isOrigin = idx === 0;
      const radius = isOrigin ? 15 : 13.5;

      const g = pinsG
        .append('g')
        .attr('class', `pin-group${isSelected ? ' is-active' : ''}${isOrigin ? ' is-origin' : ''}`)
        .attr('transform', `translate(${spineX}, ${y})`)
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', `${isOrigin ? 'Oldest Origin' : 'Echo'} ${node.roman}: ${node.thinker}, ${node.yearLabel}`)
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

      /* Full-row touch target (height 56px >= 44px, spans across the row) */
      const cardW = Math.max(220, w - spineX - 24);
      g.append('rect')
        .attr('x', -22)
        .attr('y', -28)
        .attr('width', cardW + 22)
        .attr('height', 56)
        .attr('rx', 6)
        .attr('fill', isSelected ? 'rgba(159, 43, 36, 0.16)' : 'rgba(23, 21, 18, 0.01)')
        .attr('stroke', isSelected ? 'rgba(196, 162, 98, 0.42)' : 'none')
        .attr('stroke-width', 1);

      /* Outer gold halo ring */
      g.append('circle')
        .attr('class', 'pin-halo-ring')
        .attr('r', radius + 4.5)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(196, 162, 98, 0.68)' : 'rgba(196, 162, 98, 0.18)')
        .attr('stroke-width', isSelected ? 1.2 : 0.7)
        .attr('opacity', isSelected || isOrigin ? 1 : 0);

      /* Medallion disc */
      g.append('circle')
        .attr('class', 'pin-disc')
        .attr('r', radius)
        .attr('fill', isSelected ? '#9F2B24' : isOrigin ? '#2B1614' : '#171512')
        .attr('stroke', isSelected ? '#C4A262' : isOrigin ? '#C24136' : 'rgba(196, 162, 98, 0.56)')
        .attr('stroke-width', isSelected ? 1.6 : 1.15);

      /* Roman numeral inside medallion (14px) */
      g.append('text')
        .attr('class', 'pin-num')
        .attr('y', 4.8)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected || isOrigin ? '#EDE6D6' : '#C4A262')
        .text(node.roman);

      /* Thinker Name (17.5px Instrument Serif) */
      const shortName = node.thinker.replace(/\s*\([^)]*\)/g, '').trim();
      const maxChars = Math.max(18, Math.floor((w - 110) / 8.2));
      const displayName = shortName.length > maxChars ? shortName.slice(0, maxChars - 1) + '…' : shortName;

      g.append('text')
        .attr('class', `viz-node-title${isSelected ? ' is-active' : ''}`)
        .attr('x', 28)
        .attr('y', -4)
        .attr('text-anchor', 'start')
        .text(displayName);

      /* Year + Place subtitle (14px Cormorant Garamond) */
      const shortPlace = (node.place || '').split(',')[0].trim();
      const roleTag = isOrigin ? 'Origin' : 'Echo';
      const subLine = `${formatYearShort(node.year)} · ${shortPlace} (${roleTag})`;

      g.append('text')
        .attr('class', `viz-year-label${isOrigin ? ' is-origin' : ''}`)
        .attr('x', 28)
        .attr('y', 16)
        .attr('text-anchor', 'start')
        .text(subLine);
    });

    /* Bottom Node: Today · Your Epiphany */
    const nowG = svg
      .append('g')
      .attr('class', 'now-node')
      .attr('transform', `translate(${spineX}, ${bottomNodeY})`);

    nowG
      .append('circle')
      .attr('r', 11)
      .attr('fill', '#11100E')
      .attr('stroke', 'rgba(237, 230, 214, 0.36)')
      .attr('stroke-width', 1.1)
      .attr('stroke-dasharray', '2.5 2.5');

    nowG
      .append('circle')
      .attr('r', 3.2)
      .attr('fill', '#9E9482');

    nowG
      .append('text')
      .attr('class', 'viz-node-title is-muted')
      .attr('x', 28)
      .attr('y', -3)
      .attr('text-anchor', 'start')
      .text(`Your epiphany · ${nowYear} CE`);

    nowG
      .append('text')
      .attr('class', 'viz-node-sub')
      .attr('x', 28)
      .attr('y', 15)
      .attr('text-anchor', 'start')
      .text(`${result.yearsLate.toLocaleString()} years after Origin I`);
  }

  /* ------------------------------------------------------------------------
     2B. DESKTOP HORIZONTAL CHRONOLOGICAL ENGRAVING (>= 640px)
     ------------------------------------------------------------------------ */
  function renderDesktopHorizontalTimeline(d3, svgEl, w, nodes, result, activeIndex, nowYear, callbacks) {
    svgEl.style.height = '';
    const h = Math.max(svgEl.clientHeight || 270, 260);

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const padLeft = Math.max(72, Math.min(104, w * 0.1));
    const padRight = Math.max(72, Math.min(104, w * 0.1));
    const axisY = Math.round(h * 0.58);
    const usableW = Math.max(260, w - padLeft - padRight);

    const ancientEndX = padLeft + usableW * (nodes.length === 1 ? 0.24 : 0.72);
    const nowX = w - padRight;

    const minYear = nodes[0].year;
    const maxAncientYear = nodes[nodes.length - 1].year;
    const yearRange = Math.max(1, maxAncientYear - minYear);

    const rawXs = nodes.map((n, i) => {
      if (nodes.length === 1) return padLeft + usableW * 0.18;
      const frac = yearRange <= 20 ? i / (nodes.length - 1) : (n.year - minYear) / yearRange;
      const evenFrac = i / (nodes.length - 1);
      const blended = frac * 0.58 + evenFrac * 0.42;
      return padLeft + blended * (ancientEndX - padLeft);
    });

    const minGap = Math.min(156, (ancientEndX - padLeft) / Math.max(1, nodes.length - 0.65));
    const xs = rawXs.slice();
    for (let i = 1; i < xs.length; i++) {
      if (xs[i] - xs[i - 1] < minGap) {
        xs[i] = xs[i - 1] + minGap;
      }
    }
    if (xs.length > 1 && xs[xs.length - 1] > ancientEndX) {
      const span = xs[xs.length - 1] - xs[0];
      const targetSpan = Math.max(90, ancientEndX - padLeft);
      const scale = targetSpan / Math.max(1, span);
      for (let i = 0; i < xs.length; i++) {
        xs[i] = padLeft + (xs[i] - xs[0]) * scale;
      }
    }

    const defs = svg.append('defs');
    const arcGrad = defs
      .append('linearGradient')
      .attr('id', 'humblerArcGrad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    arcGrad.append('stop').attr('offset', '0%').attr('stop-color', '#C24136').attr('stop-opacity', 0.92);
    arcGrad.append('stop').attr('offset', '58%').attr('stop-color', '#C4A262').attr('stop-opacity', 0.68);
    arcGrad.append('stop').attr('offset', '100%').attr('stop-color', '#9E9482').attr('stop-opacity', 0.35);

    /* Subtle baseline ticks */
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

    /* Main horizontal axis rule */
    svg
      .append('line')
      .attr('x1', padLeft - 20)
      .attr('x2', nowX + 18)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'rgba(237, 230, 214, 0.16)')
      .attr('stroke-width', 1);

    /* Dashed millennia bridge */
    svg
      .append('line')
      .attr('x1', xs[xs.length - 1] + 18)
      .attr('x2', nowX - 16)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'rgba(196, 162, 98, 0.3)')
      .attr('stroke-width', 1.1)
      .attr('stroke-dasharray', '3 5');

    /* Sweeping Rückblick Arc */
    const originX = xs[0];
    const arcHeight = Math.min(108, Math.max(76, (nowX - originX) * 0.15));
    const midX = (originX + nowX) / 2;
    const ctrlY = axisY - arcHeight * 1.45;
    const apexY = axisY - arcHeight * 0.74;

    const mainArcPath = `M ${nowX} ${axisY - 12} Q ${midX} ${ctrlY} ${originX} ${axisY - 18}`;
    svg
      .append('path')
      .attr('d', mainArcPath)
      .attr('fill', 'none')
      .attr('stroke', 'url(#humblerArcGrad)')
      .attr('stroke-width', 1.45);

    /* Secondary echo arcs */
    for (let i = 1; i < nodes.length; i++) {
      const ex = xs[i];
      const emid = (originX + ex) / 2;
      const eh = Math.min(48, Math.max(24, (ex - originX) * 0.14));
      svg
        .append('path')
        .attr('d', `M ${originX} ${axisY + 16} Q ${emid} ${axisY + eh * 1.45} ${ex} ${axisY + 14}`)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(196, 162, 98, 0.24)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2.5 3.5');
    }

    /* Engraved Span Caption at Apex (14px) */
    svg
      .append('text')
      .attr('x', midX)
      .attr('y', apexY - 10)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-arc-caption atlas-halo')
      .text(`←  ${result.yearsLate.toLocaleString()} years earlier  →`);

    /* "You · Today" Rightmost Humbled Node */
    const nowG = svg.append('g').attr('class', 'now-node').attr('transform', `translate(${nowX}, ${axisY})`);
    nowG
      .append('circle')
      .attr('r', 12)
      .attr('fill', '#11100E')
      .attr('stroke', 'rgba(237, 230, 214, 0.34)')
      .attr('stroke-width', 1.1)
      .attr('stroke-dasharray', '2.5 2.5');
    nowG.append('circle').attr('r', 3.2).attr('fill', '#9E9482');
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
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-node-sub')
      .text('Today');

    /* Ancient Medallions (Origin I + Echoes II..IV) */
    const pinsG = svg.append('g').attr('class', 'timeline-pins');
    nodes.forEach((node, idx) => {
      const x = xs[idx];
      const isSelected = idx === activeIndex;
      const isOrigin = idx === 0;
      const radius = isOrigin ? 16 : 14;

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

      /* Guaranteed 52x52px hit area for WCAG/mobile tap compliance */
      g.append('rect')
        .attr('x', -26)
        .attr('y', -26)
        .attr('width', 52)
        .attr('height', 52)
        .attr('fill', 'transparent');

      g.append('circle')
        .attr('class', 'pin-halo-ring')
        .attr('r', radius + 5.5)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(196, 162, 98, 0.65)' : 'rgba(196, 162, 98, 0.16)')
        .attr('stroke-width', isSelected ? 1.15 : 0.7)
        .attr('opacity', isSelected || isOrigin ? 1 : 0);

      g.append('circle')
        .attr('class', 'pin-disc')
        .attr('r', radius)
        .attr('fill', isSelected ? '#9F2B24' : isOrigin ? '#2B1614' : '#171512')
        .attr('stroke', isSelected ? '#C4A262' : isOrigin ? '#C24136' : 'rgba(196, 162, 98, 0.56)')
        .attr('stroke-width', isSelected ? 1.6 : 1.15);

      g.append('text')
        .attr('class', 'pin-num')
        .attr('y', 5)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected || isOrigin ? '#EDE6D6' : '#C4A262')
        .text(node.roman);

      g.append('text')
        .attr('class', `viz-year-label atlas-halo${isOrigin ? ' is-origin' : ''}`)
        .attr('y', -(radius + 12))
        .attr('text-anchor', 'middle')
        .text(formatYearShort(node.year));

      const shortName = node.thinker.replace(/\s*\([^)]*\)/g, '').trim();
      const displayName = shortName.length > 20 ? shortName.slice(0, 18) + '…' : shortName;
      const shortPlace = (node.place || '').split(',')[0];

      g.append('text')
        .attr('class', `viz-node-title atlas-halo${isSelected ? ' is-active' : ''}`)
        .attr('y', radius + 22)
        .attr('text-anchor', 'middle')
        .text(displayName);

      g.append('text')
        .attr('class', 'viz-node-sub atlas-halo')
        .attr('y', radius + 40)
        .attr('text-anchor', 'middle')
        .text(shortPlace);
    });
  }

  /* ========================================================================
     3. NATURAL EARTH 50m WORLD ORIGIN ATLAS (1:1 PIXEL VIEWBOX + 48px PINS)
     ======================================================================== */
  function renderWorldOriginMap(svgSelector, result, activeIndex, callbacks) {
    const svgEl = document.querySelector(svgSelector);
    if (!svgEl || !global.d3) return;
    const d3 = global.d3;

    svgEl.style.height = '';
    const w = Math.max(280, Math.round(svgEl.clientWidth || svgEl.parentElement.clientWidth || 350));
    const h = Math.max(260, Math.round(svgEl.clientHeight || 300));

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const nodes = buildNodes(result.entry);
    const features = decodeWorldFeatures();

    const lons = nodes.map((n) => n.coords[0]);
    const lats = nodes.map((n) => n.coords[1]);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const centerLon = (minLon + maxLon) / 2;
    const centerLat = (minLat + maxLat) / 2;
    const lonSpan = Math.max(46, (maxLon - minLon) * 1.55);
    const latSpan = Math.max(26, (maxLat - minLat) * 1.75);

    const baseProjection = d3.geoNaturalEarth1().scale(1).translate([0, 0]);
    const pNW = baseProjection([Math.max(-165, centerLon - lonSpan / 2), Math.min(72, centerLat + latSpan / 2)]);
    const pSE = baseProjection([Math.min(165, centerLon + lonSpan / 2), Math.max(-50, centerLat - latSpan / 2)]);
    const dx = Math.max(0.15, Math.abs(pSE[0] - pNW[0]));
    const dy = Math.max(0.15, Math.abs(pSE[1] - pNW[1]));
    const fitScale = Math.min((w * 0.78) / dx, (h * 0.74) / dy);
    const clampedScale = Math.max(150, Math.min(920, fitScale));

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

    /* Landmasses */
    rootG
      .selectAll('path.origin-land')
      .data(features)
      .join('path')
      .attr('class', 'origin-land')
      .attr('d', path)
      .attr('fill', '#1E1C18')
      .attr('stroke', '#3B362D')
      .attr('stroke-width', 0.65);

    /* Geodesic curved arcs from Oldest Origin to each Independent Echo */
    const originPt = projection(nodes[0].coords);
    const arcsG = rootG.append('g').attr('class', 'origin-arcs');

    for (let i = 1; i < nodes.length; i++) {
      const targetPt = projection(nodes[i].coords);
      if (!originPt || !targetPt) continue;
      const dist = Math.hypot(targetPt[0] - originPt[0], targetPt[1] - originPt[1]);
      if (dist < 14) continue;
      const mx = (originPt[0] + targetPt[0]) / 2;
      const my = (originPt[1] + targetPt[1]) / 2 - Math.min(64, dist * 0.22);

      arcsG
        .append('path')
        .attr('d', `M ${originPt[0]} ${originPt[1]} Q ${mx} ${my} ${targetPt[0]} ${targetPt[1]}`)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(196, 162, 98, 0.58)')
        .attr('stroke-width', 1.35)
        .attr('stroke-dasharray', '4 4');
    }

    /* Compute projected points + collision-avoidance (>= 52px separation so 48px targets never overlap) */
    const padEdge = 32;
    const projected = nodes.map((n) => {
      const p = projection(n.coords) || [w / 2, h / 2];
      const cx = Math.max(padEdge, Math.min(w - padEdge, p[0]));
      const cy = Math.max(padEdge, Math.min(h - padEdge, p[1]));
      return { x: cx, y: cy, nudgedDir: 0 };
    });

    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const d = Math.hypot(projected[j].x - projected[i].x, projected[j].y - projected[i].y);
          if (d < 54) {
            if (d < 6) {
              projected[i].x -= 28;
              projected[i].nudgedDir = -1;
              projected[j].x += 28;
              projected[j].nudgedDir = 1;
            } else {
              const ux = (projected[j].x - projected[i].x) / d;
              const uy = (projected[j].y - projected[i].y) / d;
              const push = (56 - d) / 2;
              projected[i].x = Math.max(padEdge, Math.min(w - padEdge, projected[i].x - ux * push));
              projected[i].y = Math.max(padEdge, Math.min(h - padEdge, projected[i].y - uy * push));
              projected[j].x = Math.max(padEdge, Math.min(w - padEdge, projected[j].x + ux * push));
              projected[j].y = Math.max(padEdge, Math.min(h - padEdge, projected[j].y + uy * push));
            }
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
      const r = isOrigin ? 14 : 12.5;

      const g = pinsG
        .append('g')
        .attr('class', `pin-group${isSelected ? ' is-active' : ''}${isOrigin ? ' is-origin' : ''}`)
        .attr('transform', `translate(${pt.x}, ${pt.y})`)
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', `${node.roman}: ${node.thinker}, ${node.place} (${node.yearLabel})`)
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

      /* Guaranteed 48x48px hit area in 1:1 SVG screen coordinates */
      g.append('rect')
        .attr('x', -24)
        .attr('y', -24)
        .attr('width', 48)
        .attr('height', 48)
        .attr('fill', 'transparent');

      g.append('circle')
        .attr('class', 'pin-halo-ring')
        .attr('r', r + 4.5)
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
        .attr('y', 4.6)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected || isOrigin ? '#EDE6D6' : '#C4A262')
        .text(node.roman);

      /* Smart label placement: if a nearby pin sits below this pin, place label ABOVE; if above, place BELOW */
      let placeAbove = idx % 2 === 1;
      for (let j = 0; j < projected.length; j++) {
        if (j === idx) continue;
        const dxNear = Math.abs(projected[j].x - pt.x);
        const dyNear = projected[j].y - pt.y;
        if (dxNear < 115 && Math.abs(dyNear) < 75) {
          placeAbove = dyNear >= 0;
          break;
        }
      }
      const labelOffsetY = placeAbove ? -(r + 11) : r + 19;
      const shortPlace = (node.place || '').split(',')[0];
      const anchor = pt.x < 75 ? 'start' : pt.x > w - 75 ? 'end' : 'middle';

      g.append('text')
        .attr('class', `map-pin-label atlas-halo${isSelected ? ' is-active' : ''}`)
        .attr('y', labelOffsetY)
        .attr('text-anchor', anchor)
        .text(shortPlace);
    });

    /* D3 Zoom & Pan — guarded against stealing pin clicks or single-finger scroll */
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([0.75, 5])
      .filter((event) => {
        if (event.target && event.target.closest && event.target.closest('.pin-group')) {
          return false;
        }
        if (event.type === 'touchstart' || event.type === 'touchmove') {
          return event.touches && event.touches.length >= 2;
        }
        return !event.ctrlKey || event.type === 'wheel';
      })
      .on('zoom', (event) => {
        rootG.attr('transform', event.transform);
      });

    svg.call(zoomBehavior);
    activeMapZoom = zoomBehavior;
    activeMapSvg = svg;
  }

  function zoomMapBy(factor) {
    if (!activeMapZoom || !activeMapSvg || !global.d3) return;
    activeMapSvg.transition().duration(240).call(activeMapZoom.scaleBy, factor);
  }

  global.HUMBLER_VIZ = {
    renderBackdropMap,
    renderTimeline,
    renderWorldOriginMap,
    zoomMapBy,
    buildNodes
  };
})(window);
