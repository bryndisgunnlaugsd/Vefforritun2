import type { Metadata } from 'next';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';
import Sidebar from '@/components/Sidebar/Sidebar';
import PlayerBar from '@/components/PlayerBar/PlayerBar';

export const metadata: Metadata = {
  title: 'Melodia',
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
          <Sidebar />
          <main style={{ paddingLeft: '224px', backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '150px' }}>
            {children}
          </main>
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}