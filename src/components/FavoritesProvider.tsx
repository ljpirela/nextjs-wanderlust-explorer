"use client";

import { createContext, useState, ReactNode } from "react";

export interface FavoritesContextValue {
  favoriteIds: string[];
  favoritesCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoritesCount: favoriteIds.length,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}