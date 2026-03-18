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
  previewUrl?: string;
}

interface PlayerContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  favorites: Song[];
  toggleFavorite: (song: Song) => void;
  isFavorite: (trackId: number) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [favorites, setFavorites] = useState<Song[]>([]);

  const toggleFavorite = (song: Song) => {
    setFavorites((prev) =>
      prev.some((f) => f.trackId === song.trackId)
        ? prev.filter((f) => f.trackId !== song.trackId)
        : [...prev, song]
    );
  };

  const isFavorite = (trackId: number) =>
    favorites.some((f) => f.trackId === trackId);

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong, favorites, toggleFavorite, isFavorite }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}