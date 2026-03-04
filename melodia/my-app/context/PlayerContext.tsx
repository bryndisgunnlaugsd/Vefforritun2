'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  collectionId: number;
  collectionName: string;
  trackTimeMillis?: number;
  primaryGenreName?: string;
}

interface PlayerContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}