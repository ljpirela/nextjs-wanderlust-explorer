"use client";

import { useContext } from "react";
import {
  FavoritesContext,
  FavoritesContextValue,
} from "@/components/FavoritesProvider";

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites debe utilizarse dentro de un FavoritesProvider"
    );
  }

  return context;
}