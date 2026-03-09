'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { usePlayer } from '@/context/PlayerContext';
import './page.css';

function formatDuration(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function AlbumPage() {
  const params = useParams();
  const id = params.id as string;

  const { setCurrentSong, currentSong } = usePlayer();

  const [album, setAlbum] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || [];
        const collection = results.find((r: any) => r.wrapperType === 'collection');
        const songs = results.filter((r: any) => r.wrapperType === 'track');
        setAlbum(collection);
        setTracks(songs);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!album) return <p className="loading-text">Album not found</p>;

  return (
    <div className="album-page">

      {/* Album header */}
      <div className="album-header">
        <img
          src={album.artworkUrl100.replace('100x100', '300x300')}
          alt={album.collectionName}
          className="album-artwork"
        />
        <div className="album-info">
          <p className="album-title">{album.collectionName}</p>
          <p className="album-artist">{album.artistName}</p>
          <p className="album-genre">{album.primaryGenreName}</p>
        </div>
      </div>

      {/* Track list header */}
      <div className="track-list-header">
        <span>#</span>
        <span>Title</span>
      </div>

      {/* Tracks */}
      <div className="track-list">
        {tracks.map((track, index) => (
          <div
            key={track.trackId}
            className="track-row"
            onClick={() => setCurrentSong(track)}
          >
            <span className="track-number">{index + 1}</span>
            <span className={`track-name ${currentSong?.trackId === track.trackId ? 'playing' : ''}`}>
              {track.trackName}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}