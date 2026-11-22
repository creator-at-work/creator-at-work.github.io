/**
 * Mehfil Sleep Timer Engine
 *
 * Supports:
 *  - Timed countdown (minutes) with gentle volume fade-out over the final 15s
 *  - "End of current ghazal" mode that cleanly intercepts track completion
 *    and prevents Radio from auto-advancing
 *  - Safe volume capture & restoration (even if cancelled or extended mid-fade)
 *
 * Exported both onto window.MehfilSleepTimer (browser) and module.exports (Node tests).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MehfilSleepTimer = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  class SleepTimer {
    constructor(options = {}) {
      this.nowFn = options.nowFn || (() => Date.now());
      this.setIntervalFn = options.setIntervalFn || ((fn, ms) => setInterval(fn, ms));
      this.clearIntervalFn = options.clearIntervalFn || ((id) => clearInterval(id));
      this.getVolume = options.getVolume || (() => 80);
      this.setVolume = options.setVolume || (() => {});
      this.onTick = options.onTick || (() => {});
      this.onExpire = options.onExpire || (() => {});
      this.onStateChange = options.onStateChange || (() => {});
      this.defaultFadeMs = options.fadeDurationMs != null ? options.fadeDurationMs : 15000;

      this.mode = 'off'; // 'off' | 'countdown' | 'end_of_track'
      this.endTimeMs = 0;
      this.totalDurationMs = 0;
      this.fadeOut = true;
      this.fadeMs = this.defaultFadeMs;
      this.isFading = false;
      this.savedVolume = null;
      this._timerId = null;
    }

    isActive() {
      return this.mode !== 'off';
    }

    getRemainingMs() {
      if (this.mode !== 'countdown') return 0;
      return Math.max(0, this.endTimeMs - this.nowFn());
    }

    getState() {
      return {
        mode: this.mode,
        active: this.isActive(),
        remainingMs: this.getRemainingMs(),
        totalDurationMs: this.totalDurationMs,
        fadeOut: this.fadeOut,
        isFading: this.isFading,
        savedVolume: this.savedVolume,
      };
    }

    _stopInterval() {
      if (this._timerId !== null) {
        this.clearIntervalFn(this._timerId);
        this._timerId = null;
      }
    }

    _restoreVolumeIfSaved() {
      if (this.savedVolume !== null) {
        const vol = this.savedVolume;
        this.savedVolume = null;
        this.isFading = false;
        this.setVolume(vol);
      }
    }

    startMinutes(minutes, opts = {}) {
      const mins = Number(minutes);
      if (!Number.isFinite(mins) || mins <= 0 || mins > 240) {
        throw new Error('Sleep timer minutes must be between 1 and 240.');
      }
      // If restarting while already fading, restore baseline volume first
      this._restoreVolumeIfSaved();
      this._stopInterval();

      const durationMs = Math.round(mins * 60 * 1000);
      this.mode = 'countdown';
      this.totalDurationMs = durationMs;
      this.endTimeMs = this.nowFn() + durationMs;
      this.fadeOut = opts.fadeOut !== undefined ? Boolean(opts.fadeOut) : true;
      // Never let fade exceed half the total duration on short test timers
      this.fadeMs = Math.min(this.defaultFadeMs, Math.floor(durationMs * 0.5));
      this.isFading = false;
      this.savedVolume = null;

      this._timerId = this.setIntervalFn(() => this.tick(), 250);
      this.onStateChange(this.getState());
      this.onTick(this.getState());
    }

    startEndOfTrack() {
      this._restoreVolumeIfSaved();
      this._stopInterval();
      this.mode = 'end_of_track';
      this.totalDurationMs = 0;
      this.endTimeMs = 0;
      this.isFading = false;
      this.savedVolume = null;
      this.onStateChange(this.getState());
    }

    extendMinutes(extraMinutes) {
      const mins = Number(extraMinutes);
      if (this.mode !== 'countdown' || !Number.isFinite(mins) || mins <= 0) return;
      const addedMs = Math.round(mins * 60 * 1000);
      this.endTimeMs = Math.max(this.endTimeMs, this.nowFn()) + addedMs;
      this.totalDurationMs += addedMs;

      if (this.isFading && this.getRemainingMs() > this.fadeMs) {
        this._restoreVolumeIfSaved();
      }
      this.onStateChange(this.getState());
      this.onTick(this.getState());
    }

    cancel() {
      if (!this.isActive() && this.savedVolume === null) return;
      this._stopInterval();
      this._restoreVolumeIfSaved();
      this.mode = 'off';
      this.endTimeMs = 0;
      this.totalDurationMs = 0;
      this.isFading = false;
      this.onStateChange(this.getState());
    }

    notifyUserVolumeChanged(newVol) {
      // If user moves slider before fade starts, keep preference; if during fade, adopt it as new baseline
      if (this.isFading) {
        this.savedVolume = newVol;
      }
    }

    tick() {
      if (this.mode !== 'countdown') return;
      const remaining = this.getRemainingMs();

      if (remaining <= 0) {
        const restoreVol = this.savedVolume;
        this._stopInterval();
        this.mode = 'off';
        this.endTimeMs = 0;
        this.totalDurationMs = 0;
        this.isFading = false;
        this.savedVolume = null;

        // Expire (pause playback) first, then restore volume for next session
        this.onExpire({ reason: 'countdown', restoreVolume: restoreVol });
        if (restoreVol !== null) {
          this.setVolume(restoreVol);
        }
        this.onStateChange(this.getState());
        return;
      }

      if (this.fadeOut && this.fadeMs > 0 && remaining <= this.fadeMs) {
        if (!this.isFading) {
          this.isFading = true;
          this.savedVolume = this.getVolume();
        }
        const ratio = Math.max(0, Math.min(1, remaining / this.fadeMs));
        // Gentle quadratic ease-out feel
        const targetVol = Math.round((this.savedVolume || 0) * ratio);
        this.setVolume(targetVol);
      }

      this.onTick(this.getState());
    }

    /**
     * Call this when the current ghazal finishes playing (YT.PlayerState.ENDED).
     * Returns true if the sleep timer intercepted the end-of-track and halted playback
     * (so Radio MUST NOT advance to the next ghazal).
     */
    shouldInterceptTrackEnd() {
      if (this.mode !== 'end_of_track') return false;
      this.mode = 'off';
      this.isFading = false;
      this.savedVolume = null;
      this.onExpire({ reason: 'end_of_track', restoreVolume: null });
      this.onStateChange(this.getState());
      return true;
    }
  }

  function formatCountdown(ms) {
    const totalSec = Math.max(0, Math.ceil(ms / 1000));
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) return `${hrs}:${pad(mins)}:${pad(secs)}`;
    return `${pad(mins)}:${pad(secs)}`;
  }

  return { SleepTimer, formatCountdown };
});
