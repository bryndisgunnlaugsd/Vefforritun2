'use client';

import { usePlayer } from '@/context/PlayerContext';
import Image from 'next/image';
import './PlayerBar.css';

export default function PlayerBar() {
  const { currentSong } = usePlayer();

  return (
    <div className="player-bar">
      <div className="player-bar-inner">

        {/* If a song is playing, show its info. Otherwise show a placeholder */}
        {currentSong ? (
          <>
            {/* Album cover */}
            <Image
              src={currentSong.artworkUrl100}
              alt={currentSong.trackName}
              width={48}
              height={48}
              className="player-artwork"
            />

            {/* Song title and artist */}
            <div className="player-info">
              <span className="player-track-name">{currentSong.trackName}</span>
              <span className="player-artist-name">{currentSong.artistName}</span>
            </div>
          </>
        ) : (
          <span className="player-empty">No song playing</span>
        )}

      </div>
    </div>
  );
}