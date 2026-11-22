/* ==========================================================================
   HISTORICAL WORLD ATLAS — Figure Registry (22 Plates)
   Starts on Napoléon (Plate I — Dark Archival Benchmark), followed by the
   6 specifically requested figures and 15 curated world-historical lives.
   ========================================================================== */

(function (global) {
  'use strict';

  const F = global.ATLAS_FIGURES || {};

  global.ATLAS_REGISTRY = [
    // Plate I — Benchmark
    F.napoleon,

    // Requested Core Figures
    F.alexander,
    F.chandragupta,
    F.rajaraja,
    F.euler,
    F.ramanujan,
    F.oppenheimer,

    // Antiquity
    F.cyrus,
    F.aristotle,
    F.caesar,

    // Medieval & Renaissance
    F.genghis,
    F.ibnbattuta,
    F.leonardo,
    F.akbar,
    F.galileo,

    // Enlightenment & Empire
    F.newton,
    F.darwin,

    // Modern World
    F.lincoln,
    F.curie,
    F.gandhi,
    F.einstein,
    F.turing
  ].filter(Boolean);
})(window);
