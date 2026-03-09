'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlayer } from '@/context/PlayerContext';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const { currentSong } = usePlayer();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img
          src="/melodiaa.svg"
          alt="Melodia"
          style={{ width: '180px', display: 'block', height: 'auto' }}
        />
      </div>
      <nav className="sidebar-nav">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link href="/favorites" className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}>
          Favorites
        </Link>
      </nav>

      {currentSong && (
        <div className="sidebar-now-playing">
          <p className="sidebar-now-playing-label">Now Playing</p>
          <div className="sidebar-now-playing-card">
            <img
              src={currentSong.artworkUrl100}
              alt={currentSong.trackName}
              className="sidebar-now-playing-art"
              style={{ width: '40px', height: '40px', display: 'block' }}
            />
            <div className="sidebar-now-playing-info">
              <span className="sidebar-now-playing-title">{currentSong.trackName}</span>
              <span className="sidebar-now-playing-artist">{currentSong.artistName}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}