"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { experiences } from "@/data/experiences";
import {
  EXPERIENCE_CATEGORIES,
  Experience,
  ExperienceCategory,
} from "@/types/Experience";
import { escapeRegExp } from "@/lib/escapeRegExp";

interface UseExperiencesReturn {
  filteredExperiences: Experience[];
  totalCount: number;
  search: string;
  category: ExperienceCategory | "";
  destination: string;
  availableDestinations: string[];
  hasActiveFilters: boolean;
  setSearch: (value: string) => void;
  setCategory: (value: ExperienceCategory | "") => void;
  setDestination: (value: string) => void;
  clearFilters: () => void;
}

export function useExperiences(): UseExperiencesReturn {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const search = searchParams.get("search") ?? "";
  const rawCategory = searchParams.get("category") ?? "";
  const destination = searchParams.get("destination") ?? "";

  // Normaliza ?category=adventure -> "Adventure" para aceptar mayúsculas o minúsculas en la URL
  const category: ExperienceCategory | "" =
    EXPERIENCE_CATEGORIES.find(
      (item) => item.toLowerCase() === rawCategory.toLowerCase()
    ) ?? "";

  // Extrae la lista única de países disponibles en el dataset para el filtro de destino
  const availableDestinations = useMemo(() => {
    const countries = experiences.map((exp) => {
      const parts = exp.destination.split(",");
      return parts[parts.length - 1].trim();
    });

    return Array.from(new Set(countries)).sort((a, b) => a.localeCompare(b));
  }, []);

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const setSearch = (value: string) => updateQueryParam("search", value);
  const setCategory = (value: ExperienceCategory | "") =>
    updateQueryParam("category", value);
  const setDestination = (value: string) =>
    updateQueryParam("destination", value);

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const filteredExperiences = useMemo(() => {
    const trimmedSearch = search.trim();
    const titleRegex = trimmedSearch
      ? new RegExp(escapeRegExp(trimmedSearch), "i")
      : null;
    const normalizedDestination = destination.trim().toLowerCase();

    return experiences.filter((exp) => {
      const matchesTitle = titleRegex ? titleRegex.test(exp.title) : true;
      const matchesCategory = category ? exp.category === category : true;
      const matchesDestination = normalizedDestination
        ? exp.destination.toLowerCase().includes(normalizedDestination)
        : true;

      return matchesTitle && matchesCategory && matchesDestination;
    });
  }, [search, category, destination]);

  const hasActiveFilters = Boolean(search.trim() || category || destination);

  return {
    filteredExperiences,
    totalCount: experiences.length,
    search,
    category,
    destination,
    availableDestinations,
    hasActiveFilters,
    setSearch,
    setCategory,
    setDestination,
    clearFilters,
  };
}