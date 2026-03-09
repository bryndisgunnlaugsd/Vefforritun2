'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import './PlayerBar.css';

const MAX_SECONDS = 12;

export default function PlayerBar() {
  const { currentSong, toggleFavorite, isFavorite } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentSong?.previewUrl) {
      audioRef.current.src = currentSong.previewUrl;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTime(0);
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;

    if (time >= MAX_SECONDS) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      return;
    }

    setCurrentTime(time);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.currentTime >= MAX_SECONDS) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const val = Math.min(Number(e.target.value), MAX_SECONDS);
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.min(Math.max(0, audioRef.current.currentTime + seconds), MAX_SECONDS);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="player-bar">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player-bar-inner">

        <div className="player-left">
          {currentSong ? (
            <>
              <img
                src={currentSong.artworkUrl100}
                alt={currentSong.trackName}
                className="player-artwork"
              />
              <div className="player-info">
                <span className="player-track-name">{currentSong.trackName}</span>
                <span className="player-artist-name">{currentSong.artistName}</span>
              </div>
              <button
                className="player-favorite-button"
                onClick={() => toggleFavorite(currentSong)}
              >
                {isFavorite(currentSong.trackId) ? '❤️' : '🤍'}
              </button>
            </>
          ) : (
            <span className="player-empty">No song playing</span>
          )}
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button className="player-skip-button" onClick={() => skip(-5)}>⏮</button>
            <button className="player-play-button" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="player-skip-button" onClick={() => skip(5)}>⏭</button>
          </div>
          <div className="player-progress">
            <span className="player-time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={MAX_SECONDS}
              value={currentTime}
              onChange={handleSeek}
              className="player-seek"
            />
            <span className="player-time">{formatTime(MAX_SECONDS)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}