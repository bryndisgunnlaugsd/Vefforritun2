'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">Melodia</div>
        <nav className="sidebar-nav">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link href="/favorites" className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}>
            Favorites
          </Link>
        </nav>
      </aside>

      {/* Mobile header */}
      <header className="mobile-header">
        <div className="mobile-header-inner">
          <span className="mobile-logo">Melodia</span>
          <nav className="mobile-nav">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/favorites" className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}>
              Favorites
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}