/* ==========================================================================
   HISTORICAL WORLD ATLAS — Figure Registry (15 Plates)
   Arranged strictly in chronological historic timeline (384 BCE — 1912 CE).
   ========================================================================== */

(function (global) {
  'use strict';

  const F = global.ATLAS_FIGURES || {};

  global.ATLAS_REGISTRY = [
    // Antiquity
    F.aristotle,     // I   · 384 — 322 BCE
    F.chanakya,      // II  · c. 375 — 283 BCE
    F.alexander,     // III · 356 — 323 BCE
    F.chandragupta,  // IV  · c. 340 — 297 BCE

    // Medieval & Renaissance
    F.rajaraja,      // V   · c. 947 — 1014
    F.gutenberg,     // VI  · c. 1400 — 1468
    F.galileo,       // VII · 1564 — 1642

    // Enlightenment & Empire
    F.newton,        // VIII · 1643 — 1727
    F.euler,         // IX   · 1707 — 1783
    F.napoleon,      // X    · 1769 — 1821
    F.darwin,        // XI   · 1809 — 1882
    F.marx,          // XII  · 1818 — 1883

    // Modern World
    F.ramanujan,     // XIII · 1887 — 1920
    F.oppenheimer,   // XIV  · 1904 — 1967
    F.turing         // XV   · 1912 — 1954
  ].filter(Boolean);
})(window);
