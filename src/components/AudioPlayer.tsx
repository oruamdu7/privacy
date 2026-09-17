import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { voicePlayer } from '../utils/audioSynth';

interface AudioPlayerProps {
  avatarUrl: string;
  totalDuration?: number;
  audioUrl?: string;
}

export default function AudioPlayer({ avatarUrl, totalDuration = 24, audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    voicePlayer.setAudioUrl(audioUrl);
  }, [audioUrl]);

  // Waveform bars pattern matching the print:
  // 4 tall bars, 4 small dots, 4 tall bars, 3 dots
  const waveformBars = [
    { height: 14 },
    { height: 20 },
    { height: 18 },
    { height: 12 },
    { height: 5 },
    { height: 5 },
    { height: 5 },
    { height: 5 },
    { height: 14 },
    { height: 22 },
    { height: 18 },
    { height: 12 },
    { height: 5 },
    { height: 5 },
    { height: 5 },
  ];

  const togglePlay = () => {
    if (isPlaying) {
      voicePlayer.pause();
      setIsPlaying(false);
    } else {
      voicePlayer.play((time, playing) => {
        setCurrentTime(time);
        setIsPlaying(playing);
      });
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const newTime = percentage * totalDuration;
    setCurrentTime(newTime);
    voicePlayer.seek(newTime);
  };

  useEffect(() => {
    return () => {
      voicePlayer.stop();
    };
  }, []);

  const progressPercentage = Math.min(100, (currentTime / totalDuration) * 100);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="px-4 py-2">
      <div
        id="voice-note-card"
        className="w-full bg-white border border-neutral-200/90 rounded-2xl p-3.5 shadow-xs flex items-center gap-3 transition-all hover:border-neutral-300"
      >
        {/* Small avatar thumbnail on the left */}
        <div
          id="audio-avatar-thumbnail"
          className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-neutral-200 bg-neutral-100"
        >
          <img
            src={avatarUrl}
            alt="Foto da nota de voz"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Big Orange Play/Pause Button */}
        <button
          id="audio-play-button"
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar áudio' : 'Ouvir áudio'}
          className="w-12 h-12 rounded-full bg-[#ff5436] hover:bg-[#f0482b] text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-white text-white" />
          ) : (
            <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
          )}
        </button>

        {/* Waveform and Progress Bar Area */}
        <div className="flex-1 flex flex-col justify-center min-w-0 pr-1">
          {/* Top row: Waveform bars & Timer */}
          <div className="flex items-center justify-between gap-2 h-7 mb-1.5">
            {/* Coral/Orange waveform bars */}
            <div className="flex items-center gap-[3px] overflow-hidden">
              {waveformBars.map((bar, index) => {
                const barProgress = (index / waveformBars.length) * 100;
                const isPassed = progressPercentage >= barProgress;

                return (
                  <span
                    key={index}
                    className={`rounded-full transition-all duration-150 inline-block ${
                      bar.height <= 5 ? 'w-1.5 h-1.5' : 'w-1.5'
                    } ${
                      isPassed
                        ? 'bg-[#ff5436]'
                        : 'bg-[#ff957d]'
                    } ${isPlaying && isPassed ? 'opacity-100 scale-y-110' : 'opacity-90'}`}
                    style={{
                      height: bar.height <= 5 ? '6px' : `${bar.height}px`,
                    }}
                  />
                );
              })}
            </div>

            {/* Time Stamp */}
            <span
              id="audio-timestamp"
              className="text-neutral-500 font-medium text-[13px] tracking-tight shrink-0 tabular-nums"
            >
              {formatTime(currentTime)}
            </span>
          </div>

          {/* Bottom row: Scrubbing progress bar */}
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="relative w-full h-4 flex items-center cursor-pointer group py-1"
          >
            {/* Background track */}
            <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
              {/* Active fill */}
              <div
                className="h-full bg-[#ff5436] rounded-full transition-all duration-75"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Orange round thumb */}
            <div
              className="absolute w-3.5 h-3.5 bg-[#ff5436] rounded-full shadow-xs -translate-x-1/2 group-hover:scale-125 transition-transform pointer-events-none"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
