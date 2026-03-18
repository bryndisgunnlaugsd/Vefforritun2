'use client';

import { useState, useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import Link from 'next/link';
import './page.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setCurrentSong, toggleFavorite, isFavorite } = usePlayer();

  useEffect(() => {
    if (!query.trim()) {
      setSongs([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=12`
        );
        const data = await response.json();
        setSongs(data.results || []);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-page">
      <h1 className="search-title">Discover Music</h1>

      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs, artists..."
          className="search-input"
        />
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      {!loading && songs.length > 0 && (
        <div className="songs-grid">
          {songs.map((song: any) => (
            <div key={song.trackId} className="song-card">
              <Link href={`/album/${song.collectionId}`}>
                <img src={song.artworkUrl100.replace('100x100', '300x300')} alt={song.trackName} />
              </Link>
              <div className="song-card-info">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p className="song-card-title">{song.trackName}</p>
                  <button
                    className="favorite-button"
                    onClick={() => toggleFavorite(song)}
                  >
                    {isFavorite(song.trackId) ? '🩷' : '🤍'}
                  </button>
                </div>
                <Link href={`/album/${song.collectionId}`} className="song-card-artist">
                  {song.artistName}
                </Link>
                <div className="song-card-bottom">
                  <button
                    className="play-button"
                    onClick={() => setCurrentSong(song)}
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}