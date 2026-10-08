/* Jatin Bhatt. Small, dependency-free behaviour. */
(function () {
  'use strict';
  var root = document.documentElement;
  var BREATH = 10000; // ms: 4s in, 6s out
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var t0 = performance.now();
  var visitStart = Date.now();
  try {
    var saved = parseInt(sessionStorage.getItem('jb-t0'), 10);
    if (saved && saved <= visitStart) visitStart = saved; else sessionStorage.setItem('jb-t0', String(visitStart));
  } catch (e) {}

  /* ---------- Stillness / Signal ---------- */
  var toggle = document.getElementById('modeToggle');
  function setMode(m, save) {
    var flip = flipFirst();
    root.dataset.mode = m;
    flipPlay(flip);
    toggles.forEach(function (t) { t.setAttribute('aria-pressed', m === 'signal' ? 'true' : 'false'); });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = m === 'signal' ? '#121110' : '#F3EDE2';
    if (save) { try { localStorage.setItem('jb-mode', m); } catch (e) {} }
    drawHours(true);
    if (m !== 'signal' && visible && !raf && !reduce.matches) raf = requestAnimationFrame(loop);
  }
  function flip() { setMode(root.dataset.mode === 'signal' ? 'stillness' : 'signal', true); }
  var toggles = [toggle].concat(Array.prototype.slice.call(document.querySelectorAll('[data-mode-toggle]')));
  toggles.forEach(function (t) {
    t.addEventListener('click', flip);
    t.setAttribute('aria-pressed', root.dataset.mode === 'signal' ? 'true' : 'false');
  });

  /* ---------- mobile menu ---------- */
  var menu = document.getElementById('mnav'), menuBtn = document.getElementById('menuBtn');
  function closeMenu() { if (menu && menu.open) { menu.classList.remove('in'); menu.close(); } }
  if (menu && menuBtn && menu.showModal) {
    menuBtn.addEventListener('click', function () {
      menu.showModal(); root.classList.add('menu-open'); menuBtn.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () { menu.classList.add('in'); });
    });
    menu.addEventListener('close', function () { root.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false'); menu.classList.remove('in'); menuBtn.focus(); });
    menu.querySelector('[data-close-menu]').addEventListener('click', closeMenu);
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { var h = e.target.closest('a').getAttribute('href'); if (h && h.charAt(0) === '#') closeMenu(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) closeMenu(); });
  }

  /* ---------- shelf: FLIP the books when they regroup ---------- */
  function flipFirst() {
    if (reduce.matches) return null;
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-shelf] .book'));
    if (!items.length) return null;
    return items.map(function (el) {
      var sh = el.parentNode;
      return { el: el, sh: sh, x: el.getBoundingClientRect().left + sh.scrollLeft, y: el.getBoundingClientRect().top };
    });
  }
  function flipPlay(first) {
    if (!first) return;
    first.forEach(function (f) {
      var r = f.el.getBoundingClientRect();
      var dx = f.x - (r.left + f.sh.scrollLeft), dy = f.y - r.top;
      if (!dx && !dy) return;
      f.el.style.transition = 'none';
      f.el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        first.forEach(function (f, i) {
          f.el.style.transition = 'transform .9s cubic-bezier(.2,.8,.2,1) ' + (i % 6) * 25 + 'ms';
          f.el.style.transform = '';
        });
      });
    });
  }

  /* ---------- shelf: caption on hover, focus or tap ---------- */
  function esc(t) { return t.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  document.querySelectorAll('[data-shelf]').forEach(function (sh) {
    var cap = sh.parentNode.querySelector('.shelf-cap');
    if (!cap) return;
    var def = cap.getAttribute('data-default');
    function show(b) {
      sh.querySelectorAll('.spine.on').forEach(function (o) { if (o !== b) o.classList.remove('on'); });
      var t = b.getAttribute('data-title'), a = b.getAttribute('data-author');
      var recent = b.classList.contains('recent') ? 'Most recent: ' : '';
      cap.innerHTML = recent + '<cite>' + esc(t) + '</cite>' + (a ? ' <span class="cap-a"><span class="cap-dot" aria-hidden="true">·</span> ' + esc(a) + '</span>' : '') +
        ' <span class="cap-th">' + esc(b.getAttribute('data-thread')) + '</span>';
    }
    sh.addEventListener('mouseover', function (e) { var b = e.target.closest('.spine'); if (b) show(b); });
    sh.addEventListener('focusin', function (e) { var b = e.target.closest('.spine'); if (b) show(b); });
    sh.addEventListener('click', function (e) { var b = e.target.closest('.spine'); if (b) { b.classList.add('on'); show(b); } });
    sh.addEventListener('mouseleave', function () { if (!sh.querySelector('.spine.on') && !sh.contains(document.activeElement)) cap.innerHTML = def; });
  });

  /* ---------- header state + active section ---------- */
  var top = document.querySelector('.top');
  var firstSec = document.querySelector('main > section + .wave + section, main > section:nth-of-type(2)');
  var onScroll = function () {
    top.classList.toggle('scrolled', window.scrollY > 8);
    if (firstSec && firstSec.getBoundingClientRect().top > window.innerHeight * 0.5) {
      document.querySelectorAll('.toc a.active').forEach(function (l) { l.classList.remove('active'); });
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var links = {};
  document.querySelectorAll('.toc a').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h.charAt(0) === '#' && document.getElementById(h.slice(1))) links[h.slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var a = links[e.target.id]; if (!a) return;
        if (e.isIntersecting) { Object.values(links).forEach(function (l) { l.classList.remove('active'); }); a.classList.add('active'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var el = document.getElementById(id); if (el) secObs.observe(el); });

    /* reveal */
    var rev = document.querySelectorAll('.sec-head, .step, .entry, .rules li, .practice-grid > *, .ledger, .learning, .contact > *, .owner, .feature, .mini, .strip > *, .all-work');
    var revObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rev.forEach(function (el, i) {
      el.classList.add('reveal');
      if (el.classList.contains('entry')) el.style.transitionDelay = ((i % 3) * 90) + 'ms';
      if (location.hash && el.id === location.hash.slice(1)) el.classList.add('in');
      revObs.observe(el);
    });
  }

  /* ---------- 1,750 dots ---------- */
  var cv = document.getElementById('hoursField');
  var ctx = cv && cv.getContext('2d');
  var dots = [], cols, rows, W, H, visible = false, raf = 0;
  function layout() {
    if (!cv) return;
    var w = cv.clientWidth || 600;
    cols = w < 420 ? 35 : 50; rows = Math.ceil(1750 / cols);
    var gap = w / cols;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = w; H = Math.round(gap * rows);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    for (var i = 0; i < 1750; i++) {
      var c = i % cols, r = Math.floor(i / cols);
      // a little hand-placed wobble: perfection is predictable
      var jx = (Math.sin(i * 12.9898) * 43758.5453) % 1 * gap * 0.12;
      var jy = (Math.sin(i * 78.233) * 12345.678) % 1 * gap * 0.12;
      dots.push({ x: gap * (c + 0.5) + jx, y: gap * (r + 0.5) + jy, d: (c / cols) * 0.6 + (r / rows) * 0.4 });
    }
    drawHours(true);
  }
  function colour(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  var inkC, accC;
  function drawHours(force, now) {
    if (!ctx || !dots.length) return;
    if (force) { inkC = colour('--ink'); accC = colour('--accent'); }
    var t = ((now || performance.now()) - t0) / BREATH; // breaths elapsed
    var sig = root.dataset.mode === 'signal';
    var still = reduce.matches;
    ctx.clearRect(0, 0, W, H);
    var gap = W / cols;
    for (var i = 0; i < dots.length; i++) {
      var p = dots[i], a, rad;
      if (still || sig) { a = sig ? 0.5 : 0.55; rad = gap * 0.2; }
      else {
        // a slow wave crosses the field once per breath
        var ph = (t - p.d) % 1; if (ph < 0) ph += 1;
        var b = ph < 0.4 ? Math.sin((ph / 0.4) * Math.PI / 2) : Math.cos(((ph - 0.4) / 0.6) * Math.PI / 2);
        a = 0.22 + 0.7 * b * b; rad = gap * (0.14 + 0.12 * b);
      }
      ctx.globalAlpha = a;
      var hundred = sig && i % 100 === 99; // signal: every hundredth hour, so the field can be counted
      if (hundred) { ctx.globalAlpha = 1; rad = gap * 0.3; }
      ctx.fillStyle = hundred ? accC : inkC;
      ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function loop(now) {
    drawHours(false, now);
    raf = visible && !reduce.matches && root.dataset.mode !== 'signal' ? requestAnimationFrame(loop) : 0;
  }
  if (cv) {
    layout();
    window.addEventListener('resize', function () { clearTimeout(layout._t); layout._t = setTimeout(layout, 150); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible && !raf && !reduce.matches) raf = requestAnimationFrame(loop);
      }).observe(cv);
    }
  }

  /* ---------- footer: India time + session in breaths ---------- */
  var ist = document.getElementById('istTime');
  var br = document.getElementById('breaths');
  var fmt;
  try { fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }); } catch (e) {}
  function tick() {
    if (fmt && ist) ist.textContent = 'It is ' + fmt.format(new Date()).replace(' ', '\u00a0') + ' in India.';
    var n = Math.floor((Date.now() - visitStart) / BREATH);
    if (br) br.textContent = n;
    var s = document.getElementById('session');
    if (s) s.firstChild.nodeValue = 'You have been here for ';
    if (s && s.lastChild) s.lastChild.nodeValue = n === 1 ? ' breath.' : ' breaths.';
  }
  tick(); setInterval(tick, 1000);

  /* ---------- copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Copied'; b.classList.add('done'); setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('done'); }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(done, function () { location.href = 'mailto:' + v; });
      else location.href = 'mailto:' + v;
    });
  });

  /* ---------- B: three breaths ---------- */
  var dlg = document.getElementById('breathe');
  var word = dlg.querySelector('.bz-word');
  var count = document.getElementById('bzN');
  var timers = [];
  function clearT() { timers.forEach(clearTimeout); timers = []; }
  function openBreathe() {
    if (dlg.open) return;
    dlg.className = 'breathe';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var i = 0;
    function cycle() {
      count.textContent = i + 1;
      word.textContent = 'Breathe in';
      dlg.classList.remove('out'); void dlg.offsetWidth; dlg.classList.add('in');
      timers.push(setTimeout(function () {
        word.textContent = 'Breathe out';
        dlg.classList.remove('in'); dlg.classList.add('out');
      }, 4000));
      timers.push(setTimeout(function () {
        i++;
        if (i < 3) cycle();
        else { dlg.classList.add('done'); timers.push(setTimeout(closeBreathe, 4200)); }
      }, 10000));
    }
    timers.push(setTimeout(cycle, 400));
  }
  function closeBreathe() { clearT(); if (dlg.open) { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); } }
  dlg.addEventListener('close', clearT);
  var bb = document.getElementById('breathBtn'); if (bb) bb.addEventListener('click', openBreathe);
  dlg.querySelector('.bz-close').addEventListener('click', closeBreathe);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeBreathe(); });

  /* ---------- typing "ads" ---------- */
  var adbox = document.getElementById('adbox');
  function showAd() {
    adbox.hidden = false; adbox.classList.remove('struck');
    timers.push(setTimeout(function () { adbox.classList.add('struck'); }, reduce.matches ? 0 : 1400));
    clearTimeout(showAd._t); showAd._t = setTimeout(function () { adbox.hidden = true; }, 9000);
  }
  adbox.querySelector('.ad-x').addEventListener('click', function () { adbox.hidden = true; });

  /* ---------- keys ---------- */
  var buf = '';
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    var k = (e.key || '').toLowerCase();
    buf = (buf + k).slice(-3);
    if (buf === 'ads') { showAd(); buf = ''; return; }
    if (dlg.open) return;
    if (menu && menu.open) { if (k === 's') flip(); return; }
    if (k === 's') flip();
    else if (k === 'b') openBreathe();
  });

  reduce.addEventListener && reduce.addEventListener('change', function () { drawHours(true); });

  /* ---------- for the curious ---------- */
  try {
    console.log('%cHello. You opened the console, so you are the kind of person I like working with.\n%cPress S for signal, B to breathe, or type "ads".\nhello@jatinbhatt.me',
      'font: italic 16px Georgia, serif; color: #A93E19', 'font: 12px monospace; color: #6B6358');
  } catch (e) {}
})();
