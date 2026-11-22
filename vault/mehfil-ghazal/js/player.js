/**
 * Mehfil YouTube IFrame Player Controller
 *
 * Manages reliable YouTube playback inside the persistent archival stage frame,
 * handles Pause vs Stop cleanly, tracks progress/seeking, volume/mute, and
 * surfaces playback/embed errors for seamless auto-recovery.
 */
window.MehfilPlayer = (function () {
  class YouTubeAudioController {
    constructor(options = {}) {
      this.hostId = options.hostId || 'ytPlayerHost';
      this.onStateChange = options.onStateChange || (() => {});
      this.onProgress = options.onProgress || (() => {});
      this.onTrackEnded = options.onTrackEnded || (() => {});
      this.onTrackError = options.onTrackError || (() => {});

      this.player = null;
      this.apiReady = false;
      this.playerReady = false;
      this.pendingVideoId = null;
      this.pendingStartSec = 0;
      this.pendingAutoplay = true;
      this.currentVideoId = null;

      this.state = 'idle'; // 'idle' | 'loading' | 'playing' | 'paused' | 'stopped' | 'ended'
      this.volume = 82;
      this.muted = false;
      this.duration = 0;
      this.currentTime = 0;
      this._progressTimer = null;
      this._lastErrorForVid = null;

      this._initAPI();
    }

    _initAPI() {
      if (window.YT && window.YT.Player) {
        this.apiReady = true;
        this._mountPlayer();
        return;
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        this.apiReady = true;
        this._mountPlayer();
      };

      if (!document.getElementById('yt-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        document.head.appendChild(tag);
      }
    }

    _mountPlayer() {
      if (this.player || !document.getElementById(this.hostId)) return;

      const playerVars = {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        iv_load_policy: 3,
        fs: 1,
      };
      if (window.location.protocol.startsWith('http')) {
        playerVars.origin = window.location.origin;
      }

      this.player = new window.YT.Player(this.hostId, {
        width: '100%',
        height: '100%',
        playerVars,
        events: {
          onReady: () => {
            this.playerReady = true;
            this._applyVolume();
            if (this.pendingVideoId) {
              const vid = this.pendingVideoId;
              const startSec = this.pendingStartSec || 0;
              const auto = this.pendingAutoplay !== false;
              this.pendingVideoId = null;
              this.pendingStartSec = 0;
              if (auto) {
                this.loadAndPlay(vid, this.duration, startSec);
              } else {
                this.cueAt(vid, startSec, this.duration);
              }
            }
          },
          onStateChange: (evt) => this._handleYTState(evt.data),
          onError: (evt) => this._handleYTError(evt.data),
        },
      });
    }

    _handleYTState(ytState) {
      const YTState = window.YT ? window.YT.PlayerState : {};
      if (ytState === YTState.PLAYING) {
        this.state = 'playing';
        this._lastErrorForVid = null;
        this._startProgressLoop();
        this._emitProgress();
        this.onStateChange(this.state);
      } else if (ytState === YTState.PAUSED) {
        if (this.state !== 'stopped') {
          this.state = 'paused';
          this._stopProgressLoop();
          this._emitProgress();
          this.onStateChange(this.state);
        }
      } else if (ytState === YTState.BUFFERING) {
        this.state = 'loading';
        this.onStateChange(this.state);
      } else if (ytState === YTState.ENDED) {
        this.state = 'ended';
        this._stopProgressLoop();
        this._emitProgress();
        this.onStateChange(this.state);
        this.onTrackEnded(this.currentVideoId);
      } else if (ytState === YTState.CUED) {
        this._emitProgress();
      }
    }

    _handleYTError(code) {
      this._stopProgressLoop();
      const vid = this.currentVideoId;
      if (!vid || this._lastErrorForVid === vid) return;
      this._lastErrorForVid = vid;
      this.state = 'idle';
      this.onStateChange(this.state);
      this.onTrackError(vid, code);
    }

    _startProgressLoop() {
      this._stopProgressLoop();
      this._progressTimer = setInterval(() => this._emitProgress(), 350);
    }

    _stopProgressLoop() {
      if (this._progressTimer) {
        clearInterval(this._progressTimer);
        this._progressTimer = null;
      }
    }

    _emitProgress() {
      if (!this.player || !this.playerReady) return;
      try {
        const cur = Number(this.player.getCurrentTime?.() || 0);
        const dur = Number(this.player.getDuration?.() || 0);
        this.currentTime = Number.isFinite(cur) ? cur : 0;
        if (Number.isFinite(dur) && dur > 0) this.duration = dur;
      } catch (_) {}
      this.onProgress(this.currentTime, this.duration);
    }

    _applyVolume() {
      if (!this.player || !this.playerReady) return;
      try {
        if (this.muted) {
          this.player.mute();
        } else {
          this.player.unMute();
          this.player.setVolume(Math.max(0, Math.min(100, Math.round(this.volume))));
        }
      } catch (_) {}
    }

    loadAndPlay(videoId, expectedDurationSec = 0, startSeconds = 0) {
      if (!videoId) return;
      const start = Math.max(0, Number(startSeconds) || 0);
      this.currentVideoId = videoId;
      this._lastErrorForVid = null;
      this.currentTime = start;
      this.duration = expectedDurationSec || 0;
      this.state = 'loading';
      this.onProgress(start, this.duration);
      this.onStateChange(this.state);

      if (!this.playerReady || !this.player) {
        this.pendingVideoId = videoId;
        this.pendingStartSec = start;
        this.pendingAutoplay = true;
        return;
      }

      this._applyVolume();
      try {
        this.player.loadVideoById({ videoId, startSeconds: start });
      } catch (_) {
        this.pendingVideoId = videoId;
        this.pendingStartSec = start;
        this.pendingAutoplay = true;
      }
    }

    cueAt(videoId, startSeconds = 0, expectedDurationSec = 0) {
      if (!videoId) return;
      const start = Math.max(0, Number(startSeconds) || 0);
      this.currentVideoId = videoId;
      this._lastErrorForVid = null;
      this.currentTime = start;
      this.duration = expectedDurationSec || 0;
      this.state = 'paused';
      this.onProgress(start, this.duration);
      this.onStateChange(this.state);

      if (!this.playerReady || !this.player) {
        this.pendingVideoId = videoId;
        this.pendingStartSec = start;
        this.pendingAutoplay = false;
        return;
      }

      this._applyVolume();
      try {
        this.player.cueVideoById({ videoId, startSeconds: start });
      } catch (_) {}
    }

    play() {
      if (!this.currentVideoId) return false;
      if (!this.playerReady || !this.player) {
        this.pendingVideoId = this.currentVideoId;
        return true;
      }
      this._applyVolume();
      try {
        this.player.playVideo();
        return true;
      } catch (_) {
        return false;
      }
    }

    pause() {
      this._stopProgressLoop();
      if (this.playerReady && this.player) {
        try {
          this.player.pauseVideo();
        } catch (_) {}
      }
      if (this.currentVideoId && this.state !== 'stopped' && this.state !== 'idle') {
        this.state = 'paused';
        this.onStateChange(this.state);
      }
    }

    stop() {
      this._stopProgressLoop();
      this.pendingVideoId = null;
      this.state = 'stopped';
      this.currentTime = 0;
      if (this.playerReady && this.player) {
        try {
          this.player.stopVideo();
        } catch (_) {}
      }
      this.onProgress(0, this.duration);
      this.onStateChange(this.state);
    }

    seekTo(seconds) {
      if (!this.playerReady || !this.player || !this.currentVideoId) return;
      const clamped = Math.max(0, Math.min(this.duration || seconds, seconds));
      this.currentTime = clamped;
      try {
        this.player.seekTo(clamped, true);
      } catch (_) {}
      this.onProgress(this.currentTime, this.duration);
    }

    getVolume() {
      return this.volume;
    }

    setVolume(vol) {
      const clamped = Math.max(0, Math.min(100, Math.round(Number(vol) || 0)));
      this.volume = clamped;
      if (clamped > 0 && this.muted) this.muted = false;
      this._applyVolume();
    }

    toggleMute() {
      this.muted = !this.muted;
      this._applyVolume();
      return this.muted;
    }
  }

  return { YouTubeAudioController };
})();
