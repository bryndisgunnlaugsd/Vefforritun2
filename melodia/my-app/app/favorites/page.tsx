'use client';

import { usePlayer } from '@/context/PlayerContext';
import './page.css';

export default function FavoritesPage() {
  const { favorites, setCurrentSong } = usePlayer();

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="favorites-empty">You have no favorites yet. Heart a song on the home page!</p>
      ) : (
        <div className="songs-grid">
          {favorites.map((song) => (
            <div key={song.trackId} className="song-card">
              <img src={song.artworkUrl100} alt={song.trackName} />
              <div className="song-card-info">
                <p className="song-card-title">{song.trackName}</p>
                <p className="song-card-artist">{song.artistName}</p>
                <button
                  className="play-button"
                  onClick={() => setCurrentSong(song)}
                >
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}