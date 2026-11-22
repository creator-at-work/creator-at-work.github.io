/* ==========================================================================
   THE HUMBLER — Mobile-Native D3 / SVG Archival Visualization Engine
   1. Quiet Ancient-World Meridian Backdrop (Confession Threshold)
   2. Engraved Lineage Timeline Plate:
      - Desktop (>= 640px): Horizontal Rückblick Chronological Engraving
      - Mobile  (<  640px): Vertical Archival Descent Spine (44px+ touch rows,
        zero crushed labels, crisp native font scale)
   3. Natural Earth 50m World Origin Atlas:
      - Edge-clamped labels, co-located city separation, touch-safe 2-finger
        zoom/pan (never traps single-finger vertical page scroll) + zoom buttons
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

  function isTouchOnlyDevice() {
    return Boolean(window.matchMedia && window.matchMedia('(hover: none)').matches);
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
    const isPhone = w < 640;
    const projection = d3
      .geoNaturalEarth1()
      .center(isPhone ? [46, 30] : [52, 28])
      .scale(isPhone ? Math.max(w * 0.95, 340) : Math.max(w * 0.44, 480))
      .translate([w * 0.5, h * 0.48]);

    const path = d3.geoPath(projection);
    const g = svg.append('g').attr('class', 'backdrop-world');

    const graticule = d3.geoGraticule().step([20, 20]);
    g.append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(237, 230, 214, 0.032)')
      .attr('stroke-width', 0.7);

    g.selectAll('path.backdrop-land')
      .data(features)
      .join('path')
      .attr('class', 'backdrop-land')
      .attr('d', path)
      .attr('fill', 'rgba(30, 28, 24, 0.58)')
      .attr('stroke', 'rgba(196, 162, 98, 0.09)')
      .attr('stroke-width', 0.65);

    const cradleG = g.append('g').attr('class', 'backdrop-cradles');
    CRADLES.forEach((c) => {
      const pt = projection(c.coords);
      if (!pt) return;
      cradleG
        .append('circle')
        .attr('cx', pt[0])
        .attr('cy', pt[1])
        .attr('r', 2)
        .attr('fill', 'rgba(196, 162, 98, 0.34)');
      cradleG
        .append('circle')
        .attr('cx', pt[0])
        .attr('cy', pt[1])
        .attr('r', 6)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(196, 162, 98, 0.12)')
        .attr('stroke-width', 0.6);
    });
  }

  /* ========================================================================
     2A. MOBILE-FIRST SCULPTED HORIZONTAL CHRONOLOGY ARC (< 640px, 114px tall)
     Zero clutter, crisp engraved medallions (I..IV + You) with short years
     and sweeping crimson-to-gold Rückblick arc so Verdict + Visual + Scripture
     all sit together serenely on Screen 1.
     ======================================================================== */
  function renderMobileCompactTimeline(svgEl, result, activeIndex, callbacks) {
    const d3 = global.d3;
    const nodes = buildNodes(result.entry);

    const w = Math.max(svgEl.clientWidth || window.innerWidth - 36 || 339, 280);
    const h = 114;

    const wrap = svgEl.parentElement;
    if (wrap) {
      wrap.style.height = `${h}px`;
    }

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const padX = 28;
    const axisY = 64;
    const totalStops = nodes.length + 1; /* ancient nodes + "Now" */
    const step = (w - padX * 2) / Math.max(1, totalStops - 1);

    const xs = nodes.map((_, i) => padX + i * step);
    const nowX = w - padX;
    const originX = xs[0];

    const defs = svg.append('defs');
    const arcGrad = defs
      .append('linearGradient')
      .attr('id', 'humblerMobArcGrad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    arcGrad.append('stop').attr('offset', '0%').attr('stop-color', '#C24136').attr('stop-opacity', 0.92);
    arcGrad.append('stop').attr('offset', '60%').attr('stop-color', '#C4A262').attr('stop-opacity', 0.62);
    arcGrad.append('stop').attr('offset', '100%').attr('stop-color', '#8D8372').attr('stop-opacity', 0.28);

    /* Subtle hairline axis connecting ancient medallions */
    if (nodes.length > 1) {
      svg
        .append('line')
        .attr('x1', originX)
        .attr('x2', xs[xs.length - 1])
        .attr('y1', axisY)
        .attr('y2', axisY)
        .attr('stroke', 'rgba(196, 162, 98, 0.34)')
        .attr('stroke-width', 1.1);
    }

    /* Dashed millennia gulf to "Now" */
    svg
      .append('line')
      .attr('x1', xs[xs.length - 1] + 14)
      .attr('x2', nowX - 11)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'rgba(196, 162, 98, 0.32)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2.5 4');

    /* Sweeping Rückblick arc from Now back to Origin I */
    const midX = (originX + nowX) / 2;
    const arcPath = `M ${nowX} ${axisY - 11} Q ${midX} 6 ${originX} ${axisY - 15}`;
    const mainArc = svg
      .append('path')
      .attr('d', arcPath)
      .attr('fill', 'none')
      .attr('stroke', 'url(#humblerMobArcGrad)')
      .attr('stroke-width', 1.3);

    const len = mainArc.node().getTotalLength();
    mainArc
      .attr('stroke-dasharray', `${len} ${len}`)
      .attr('stroke-dashoffset', len)
      .transition()
      .duration(720)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

    /* Compact engraved span caption above arc apex */
    svg
      .append('text')
      .attr('x', midX)
      .attr('y', 22)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-arc-caption-mobile atlas-halo')
      .text(`← ${result.yearsLate.toLocaleString()} yrs`);

    /* Rightmost hollow "Now" node */
    const nowG = svg.append('g').attr('transform', `translate(${nowX}, ${axisY})`);
    nowG
      .append('circle')
      .attr('r', 9)
      .attr('fill', '#11100E')
      .attr('stroke', 'rgba(237, 230, 214, 0.34)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2 2');
    nowG.append('circle').attr('r', 2.4).attr('fill', '#8D8372');
    nowG
      .append('text')
      .attr('y', 29)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-mob-year is-muted')
      .text('You');

    /* Engraved Ancient Medallions (44px+ invisible touch targets!) */
    const pinsG = svg.append('g').attr('class', 'timeline-pins-mobile');
    nodes.forEach((node, idx) => {
      const x = xs[idx];
      const isSelected = idx === activeIndex;
      const isOrigin = idx === 0;
      const r = isOrigin ? 14 : 12.5;

      const g = pinsG
        .append('g')
        .attr('class', `pin-group${isSelected ? ' is-active' : ''}${isOrigin ? ' is-origin' : ''}`)
        .attr('transform', `translate(${x}, ${axisY})`)
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', `${isOrigin ? 'Oldest Origin' : 'Echo'}: ${node.thinker}, ${node.yearLabel}`)
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

      /* Generous 48x64 invisible touch target */
      g.append('rect').attr('x', -24).attr('y', -28).attr('width', 48).attr('height', 64).attr('fill', 'transparent');

      g.append('circle')
        .attr('class', 'pin-halo-ring')
        .attr('r', r + 4.5)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(196, 162, 98, 0.72)' : 'rgba(196, 162, 98, 0.16)')
        .attr('stroke-width', isSelected ? 1.15 : 0.7)
        .attr('opacity', isSelected || isOrigin ? 1 : 0);

      g.append('circle')
        .attr('class', 'pin-disc')
        .attr('r', r)
        .attr('fill', isSelected ? '#9F2B24' : isOrigin ? '#2B1614' : '#171512')
        .attr('stroke', isSelected ? '#C4A262' : isOrigin ? '#C24136' : 'rgba(196, 162, 98, 0.56)')
        .attr('stroke-width', isSelected ? 1.5 : 1.1);

      g.append('text')
        .attr('class', 'pin-num')
        .attr('y', 4)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected || isOrigin ? '#EDE6D6' : '#C4A262')
        .text(node.roman);

      const compactYr = node.year < 0 ? `${Math.abs(node.year)} BC` : `${node.year} AD`;
      g.append('text')
        .attr('y', 29)
        .attr('text-anchor', 'middle')
        .attr('class', `viz-mob-year${isSelected ? ' is-active' : ''}`)
        .text(compactYr);
    });
  }

  /* ========================================================================
     2B. DESKTOP / TABLET HORIZONTAL LINEAGE TIMELINE PLATE (>= 640px)
     ======================================================================== */
  function renderTimeline(svgSelector, result, activeIndex, callbacks) {
    const svgEl = document.querySelector(svgSelector);
    if (!svgEl || !global.d3) return;
    const d3 = global.d3;

    const rawW = svgEl.clientWidth || window.innerWidth || 920;
    if (rawW < 640) {
      renderMobileCompactTimeline(svgEl, result, activeIndex, callbacks);
      return;
    }

    const wrap = svgEl.parentElement;
    if (wrap) {
      wrap.style.height = '';
    }

    const w = Math.max(rawW, 640);
    const h = Math.max(svgEl.clientHeight || 230, 220);

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    const nodes = buildNodes(result.entry);
    const nowYear = new Date().getFullYear();

    const padLeft = Math.max(76, Math.min(110, w * 0.1));
    const padRight = Math.max(76, Math.min(110, w * 0.1));
    const axisY = h * 0.6;
    const usableW = Math.max(320, w - padLeft - padRight);

    const ancientEndX = padLeft + usableW * (nodes.length === 1 ? 0.24 : 0.72);
    const nowX = w - padRight;

    const minYear = nodes[0].year;
    const maxAncientYear = nodes[nodes.length - 1].year;
    const yearRange = Math.max(1, maxAncientYear - minYear);

    const rawXs = nodes.map((n, i) => {
      if (nodes.length === 1) return padLeft + usableW * 0.18;
      const frac = yearRange <= 20 ? i / (nodes.length - 1) : (n.year - minYear) / yearRange;
      const evenFrac = i / (nodes.length - 1);
      const blended = frac * 0.62 + evenFrac * 0.38;
      return padLeft + blended * (ancientEndX - padLeft);
    });

    const minGap = Math.min(148, (ancientEndX - padLeft) / Math.max(1, nodes.length - 0.6));
    const xs = rawXs.slice();
    for (let i = 1; i < xs.length; i++) {
      if (xs[i] - xs[i - 1] < minGap) {
        xs[i] = xs[i - 1] + minGap;
      }
    }
    if (xs.length > 1 && xs[xs.length - 1] > ancientEndX) {
      const span = xs[xs.length - 1] - xs[0];
      const targetSpan = Math.max(80, ancientEndX - padLeft);
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
    arcGrad.append('stop').attr('offset', '100%').attr('stop-color', '#8D8372').attr('stop-opacity', 0.35);

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

    svg
      .append('line')
      .attr('x1', padLeft - 20)
      .attr('x2', nowX + 18)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'rgba(237, 230, 214, 0.16)')
      .attr('stroke-width', 1);

    svg
      .append('line')
      .attr('x1', xs[xs.length - 1] + 18)
      .attr('x2', nowX - 16)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'rgba(196, 162, 98, 0.28)')
      .attr('stroke-width', 1.1)
      .attr('stroke-dasharray', '3 5');

    const originX = xs[0];
    const arcHeight = Math.min(120, Math.max(82, (nowX - originX) * 0.16));
    const midX = (originX + nowX) / 2;
    const ctrlY = axisY - arcHeight * 1.48;
    const apexY = axisY - arcHeight * 0.74;

    const mainArc = svg
      .append('path')
      .attr('d', `M ${nowX} ${axisY - 12} Q ${midX} ${ctrlY} ${originX} ${axisY - 18}`)
      .attr('fill', 'none')
      .attr('stroke', 'url(#humblerArcGrad)')
      .attr('stroke-width', 1.45);

    const totalLen = mainArc.node().getTotalLength();
    mainArc
      .attr('stroke-dasharray', `${totalLen} ${totalLen}`)
      .attr('stroke-dashoffset', totalLen)
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

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

    svg
      .append('text')
      .attr('x', midX)
      .attr('y', apexY - 12)
      .attr('text-anchor', 'middle')
      .attr('class', 'viz-arc-caption atlas-halo')
      .text(`←  ${result.yearsLate.toLocaleString()} years earlier  →`);

    const nowG = svg.append('g').attr('class', 'now-node').attr('transform', `translate(${nowX}, ${axisY})`);
    nowG
      .append('circle')
      .attr('r', 12)
      .attr('fill', '#11100E')
      .attr('stroke', 'rgba(237, 230, 214, 0.34)')
      .attr('stroke-width', 1.1)
      .attr('stroke-dasharray', '2.5 2.5');
    nowG.append('circle').attr('r', 3.2).attr('fill', '#8D8372');
    nowG.append('text').attr('y', -22).attr('text-anchor', 'middle').attr('class', 'viz-year-label is-muted').text(`${nowYear} CE`);
    nowG.append('text').attr('y', 30).attr('text-anchor', 'middle').attr('class', 'viz-node-title is-muted').text('Your Insight');
    nowG.append('text').attr('y', 46).attr('text-anchor', 'middle').attr('class', 'viz-node-sub').text('Today');

    const touchOnly = isTouchOnlyDevice();
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
          if (!touchOnly && callbacks && callbacks.onHover) callbacks.onHover(node, event);
        })
        .on('mousemove', function (event) {
          if (!touchOnly && callbacks && callbacks.onMove) callbacks.onMove(event);
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

      /* Generous invisible tap target */
      g.append('circle').attr('r', 26).attr('fill', 'transparent');

      g.append('circle')
        .attr('class', 'pin-halo-ring')
        .attr('r', radius + 6)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(196, 162, 98, 0.62)' : 'rgba(196, 162, 98, 0.16)')
        .attr('stroke-width', isSelected ? 1.15 : 0.7)
        .attr('opacity', isSelected || isOrigin ? 1 : 0);

      g.append('circle')
        .attr('class', 'pin-disc')
        .attr('r', radius)
        .attr('fill', isSelected ? '#9F2B24' : isOrigin ? '#2B1614' : '#171512')
        .attr('stroke', isSelected ? '#C4A262' : isOrigin ? '#C24136' : 'rgba(196, 162, 98, 0.56)')
        .attr('stroke-width', isSelected ? 1.6 : 1.15);

      g.append('circle')
        .attr('class', 'pin-inner-ring')
        .attr('r', radius - 3.5)
        .attr('fill', 'none')
        .attr('stroke', isSelected ? 'rgba(237, 230, 214, 0.34)' : 'rgba(196, 162, 98, 0.2)')
        .attr('stroke-width', 0.6);

      g.append('text')
        .attr('class', 'pin-num')
        .attr('y', 4.5)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected || isOrigin ? '#EDE6D6' : '#C4A262')
        .text(node.roman);

      g.append('text')
        .attr('class', `viz-year-label atlas-halo${isOrigin ? ' is-origin' : ''}`)
        .attr('y', -(radius + 13))
        .attr('text-anchor', 'middle')
        .text(formatYearShort(node.year));

      if (isOrigin) {
        g.append('text')
          .attr('class', 'viz-origin-kicker atlas-halo')
          .attr('y', -(radius + 29))
          .attr('text-anchor', 'middle')
          .text('OLDEST ORIGIN');
      }

      const shortName = node.thinker.replace(/\s*\([^)]*\)/g, '').trim();
      const displayName = shortName.length > 20 ? shortName.slice(0, 19) + '…' : shortName;
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
     3. NATURAL EARTH 50m WORLD ORIGIN ATLAS (TOUCH-SAFE + EDGE-CLAMPED)
     ======================================================================== */
  function renderWorldOriginMap(svgSelector, result, activeIndex, callbacks) {
    const svgEl = document.querySelector(svgSelector);
    if (!svgEl || !global.d3) return;
    const d3 = global.d3;

    const wrap = svgEl.parentElement;
    if (wrap) {
      wrap.style.height = '';
    }

    const rawW = svgEl.clientWidth || window.innerWidth - 32 || 920;
    const isPhone = rawW < 640;
    const w = Math.max(rawW, 300);
    const h = Math.max(svgEl.clientHeight || (isPhone ? 290 : 380), 270);

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
    const lonSpan = Math.max(isPhone ? 52 : 44, (maxLon - minLon) * 1.58);
    const latSpan = Math.max(26, (maxLat - minLat) * 1.75);

    const baseProjection = d3.geoNaturalEarth1().scale(1).translate([0, 0]);
    const pNW = baseProjection([Math.max(-165, centerLon - lonSpan / 2), Math.min(72, centerLat + latSpan / 2)]);
    const pSE = baseProjection([Math.min(165, centerLon + lonSpan / 2), Math.max(-50, centerLat - latSpan / 2)]);
    const dx = Math.max(0.15, Math.abs(pSE[0] - pNW[0]));
    const dy = Math.max(0.15, Math.abs(pSE[1] - pNW[1]));
    const fitScale = Math.min((w * 0.78) / dx, (h * 0.74) / dy);
    const clampedScale = Math.max(isPhone ? 120 : 220, Math.min(1050, fitScale));

    const projection = d3
      .geoNaturalEarth1()
      .center([centerLon, centerLat])
      .scale(clampedScale)
      .translate([w * 0.5, h * 0.52]);

    const path = d3.geoPath(projection);
    const rootG = svg.append('g').attr('class', 'origin-map-root');

    const graticule = d3.geoGraticule().step([15, 15]);
    rootG
      .append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(237, 230, 214, 0.048)')
      .attr('stroke-width', 0.65);

    rootG
      .selectAll('path.origin-land')
      .data(features)
      .join('path')
      .attr('class', 'origin-land')
      .attr('d', path)
      .attr('fill', '#1E1C18')
      .attr('stroke', '#3B362D')
      .attr('stroke-width', 0.65);

    if (!isPhone) {
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
    }

    const originPt = projection(nodes[0].coords);
    const arcsG = rootG.append('g').attr('class', 'origin-arcs');

    for (let i = 1; i < nodes.length; i++) {
      const targetPt = projection(nodes[i].coords);
      if (!originPt || !targetPt) continue;
      const dist = Math.hypot(targetPt[0] - originPt[0], targetPt[1] - originPt[1]);
      if (dist < 14) continue;
      const mx = (originPt[0] + targetPt[0]) / 2;
      const my = (originPt[1] + targetPt[1]) / 2 - Math.min(64, dist * 0.22);

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

    /* Projected points + symmetric separation for co-located cities */
    const projected = nodes.map((n) => {
      const p = projection(n.coords) || [w / 2, h / 2];
      return { x: p[0], y: p[1], nudgedDir: 0 };
    });
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const d = Math.hypot(projected[j].x - projected[i].x, projected[j].y - projected[i].y);
        if (d < 44) {
          if (d < 6) {
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

    const touchOnly = isTouchOnlyDevice();
    const placedLabels = [];
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
          if (!touchOnly && callbacks && callbacks.onHover) callbacks.onHover(node, event);
        })
        .on('mousemove', function (event) {
          if (!touchOnly && callbacks && callbacks.onMove) callbacks.onMove(event);
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

      /* Invisible 24px touch hit target */
      g.append('circle').attr('r', 24).attr('fill', 'transparent');

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

      /* Smart collision-avoidance placement for map city labels */
      const shortPlace = (node.place || '').split(',')[0];
      const labelText = isPhone ? shortPlace : `${shortPlace} · ${formatYearShort(node.year)}`;
      const estW = labelText.length * 6.4;
      const estH = 14;

      const candidates = [
        { dx: 0, dy: r + 17, anchor: 'middle' },
        { dx: 0, dy: -(r + 12), anchor: 'middle' },
        { dx: -(r + 8), dy: 4, anchor: 'end' },
        { dx: r + 8, dy: 4, anchor: 'start' }
      ];
      if (pt.nudgedDir === -1) candidates.reverse();

      function boxFor(cand) {
        const cx = pt.x + cand.dx;
        const cy = pt.y + cand.dy - 4;
        const x1 = cand.anchor === 'start' ? cx : cand.anchor === 'end' ? cx - estW : cx - estW / 2;
        return { x1, x2: x1 + estW, y1: cy - estH / 2, y2: cy + estH / 2 };
      }

      let bestCand = candidates[0];
      let bestPenalty = Infinity;

      candidates.forEach((cand) => {
        const box = boxFor(cand);
        let penalty = 0;
        if (box.x1 < 8) penalty += (8 - box.x1) * 12;
        if (box.x2 > w - 8) penalty += (box.x2 - (w - 8)) * 12;
        if (box.y1 < 10) penalty += (10 - box.y1) * 12;
        if (box.y2 > h - 10) penalty += (box.y2 - (h - 10)) * 12;

        /* Penalize colliding with any other pin disc */
        projected.forEach((other, oIdx) => {
          if (oIdx === idx) return;
          const pad = 18;
          if (other.x + pad > box.x1 && other.x - pad < box.x2 && other.y + pad > box.y1 && other.y - pad < box.y2) {
            penalty += 500;
          }
        });

        /* Penalize overlapping any previously placed label */
        placedLabels.forEach((prev) => {
          if (prev.x2 + 4 > box.x1 && prev.x1 - 4 < box.x2 && prev.y2 + 3 > box.y1 && prev.y1 - 3 < box.y2) {
            penalty += 350;
          }
        });

        if (penalty < bestPenalty) {
          bestPenalty = penalty;
          bestCand = cand;
        }
      });

      const finalBox = boxFor(bestCand);
      let finalDx = bestCand.dx;
      if (finalBox.x1 < 8) finalDx += 8 - finalBox.x1;
      else if (finalBox.x2 > w - 8) finalDx -= finalBox.x2 - (w - 8);
      placedLabels.push(boxFor({ dx: finalDx, dy: bestCand.dy, anchor: bestCand.anchor }));

      g.append('text')
        .attr('class', `map-pin-label atlas-halo${isSelected ? ' is-active' : ''}`)
        .attr('x', finalDx)
        .attr('y', bestCand.dy)
        .attr('text-anchor', bestCand.anchor)
        .text(labelText);
    });

    /* D3 Zoom: exclude pin clicks AND require 2 fingers on touch so vertical page scroll never traps! */
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([0.75, 4.5])
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
    if (!activeMapZoom || !activeMapSvg) return;
    activeMapSvg.transition().duration(260).call(activeMapZoom.scaleBy, factor);
  }

  global.HUMBLER_VIZ = {
    renderBackdropMap,
    renderTimeline,
    renderWorldOriginMap,
    zoomMapBy,
    buildNodes
  };
})(window);
