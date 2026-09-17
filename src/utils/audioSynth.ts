/**
 * Web Audio API synthesizer for playful, authentic audio playback
 * Now upgraded to support real HTML5 MP3/WAV audio files naturally!
 */
class VoiceNotePlayer {
  private audio: HTMLAudioElement | null = null;
  private currentUrl: string | null = null;
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private startTime = 0;
  private pauseOffset = 0;
  private intervalId: number | null = null;
  private duration = 29; // Default voice note duration matching user's audio
  private onProgressCallback: ((time: number, isPlaying: boolean) => void) | null = null;
  private useSynthFallback = false;
  private fallbackAttempts = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, gainValue = 0.15) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio context policy guard
    }
  }

  public setAudioUrl(url: string | undefined) {
    this.useSynthFallback = false;
    this.fallbackAttempts = 0;

    if (!url) {
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      this.currentUrl = null;
      this.duration = 29;
      return;
    }

    if (this.currentUrl === url) return;

    this.currentUrl = url;
    if (this.audio) {
      this.audio.pause();
    }

    this.audio = new Audio(url);
    this.audio.addEventListener('error', () => {
      if (this.audio && this.currentUrl) {
        if (this.fallbackAttempts < 1) {
          this.fallbackAttempts += 1;
          if (this.currentUrl.endsWith('.ogg')) {
            const fallback = this.currentUrl.replace('.ogg', '.mp3');
            this.currentUrl = fallback;
            this.audio.src = fallback;
            this.audio.load();
          } else if (this.currentUrl.endsWith('.mp3')) {
            const fallback = this.currentUrl.replace('.mp3', '.ogg');
            this.currentUrl = fallback;
            this.audio.src = fallback;
            this.audio.load();
          }
        } else {
          // Both failed, use synthesizer fallback so it never remains broken/silent
          this.useSynthFallback = true;
        }
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio) {
        this.duration = this.audio.duration || 29;
        if (this.onProgressCallback) {
          this.onProgressCallback(this.audio.currentTime, this.isPlaying);
        }
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio && this.isPlaying) {
        if (this.onProgressCallback) {
          this.onProgressCallback(this.audio.currentTime, true);
        }
      }
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      if (this.onProgressCallback) {
        this.onProgressCallback(this.duration, false);
      }
    });
  }

  public play(onProgress: (time: number, isPlaying: boolean) => void) {
    this.onProgressCallback = onProgress;
    this.isPlaying = true;

    // Mode A: Play real audio file (if fallback is not activated)
    if (this.audio && !this.useSynthFallback) {
      this.audio.play().catch(() => {
        // autolock fallback trigger
        this.playSynth();
      });
      onProgress(this.audio.currentTime, true);
      return;
    }

    this.playSynth();
  }

  private playSynth() {
    this.initContext();
    this.startTime = Date.now() - this.pauseOffset * 1000;

    if (this.ctx) {
      const now = this.ctx.currentTime;
      this.playTone(330, now, 0.2, 0.12);
      this.playTone(440, now + 0.15, 0.25, 0.15);
      this.playTone(554, now + 0.35, 0.35, 0.12);
    }

    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = window.setInterval(() => {
      const elapsed = (Date.now() - this.startTime) / 1000;
      if (elapsed >= this.duration) {
        this.stop();
        if (this.onProgressCallback) {
          this.onProgressCallback(this.duration, false);
        }
      } else {
        this.pauseOffset = elapsed;
        if (this.onProgressCallback) {
          this.onProgressCallback(elapsed, true);
        }
      }
    }, 100);

    if (this.onProgressCallback) {
      this.onProgressCallback(this.pauseOffset, true);
    }
  }

  public pause() {
    this.isPlaying = false;

    if (this.audio) {
      this.audio.pause();
      if (this.onProgressCallback) {
        this.onProgressCallback(this.audio.currentTime, false);
      }
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.onProgressCallback) {
      this.onProgressCallback(this.pauseOffset, false);
    }
  }

  public stop() {
    this.isPlaying = false;

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      return;
    }

    this.pauseOffset = 0;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public seek(seconds: number) {
    if (this.audio) {
      this.audio.currentTime = seconds;
      if (this.onProgressCallback) {
        this.onProgressCallback(seconds, this.isPlaying);
      }
      return;
    }

    this.pauseOffset = Math.max(0, Math.min(seconds, this.duration));
    this.startTime = Date.now() - this.pauseOffset * 1000;
    if (this.onProgressCallback) {
      this.onProgressCallback(this.pauseOffset, this.isPlaying);
    }
  }

  public getDuration() {
    return this.duration;
  }
}

export const voicePlayer = new VoiceNotePlayer();
