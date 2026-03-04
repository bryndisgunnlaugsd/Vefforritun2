import type { Metadata } from 'next';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';
import Sidebar from '@/components/Sidebar/Sidebar';
import PlayerBar from '@/components/PlayerBar/PlayerBar';

export const metadata: Metadata = {
  title: 'Melodia',
  description: 'Music browser app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>

          {/* Sidebar shows on every page */}
          <Sidebar />

          {/* "children" is whatever page we are on */}
          {/* padding-left pushes content so it doesn't hide behind the sidebar */}
          <main style={{ paddingLeft: '224px' }}>
            {children}
          </main>

          {/* PlayerBar shows on every page, fixed to the bottom */}
          <PlayerBar />

        </PlayerProvider>
      </body>
    </html>
  );
}