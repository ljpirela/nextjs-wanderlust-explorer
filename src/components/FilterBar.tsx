"use client";

import {
  EXPERIENCE_CATEGORIES,
  ExperienceCategory,
} from "@/types/Experience";

interface FilterBarProps {
  selectedCategory: ExperienceCategory | "";
  selectedDestination: string;
  availableDestinations: string[];
  hasActiveFilters: boolean;
  onCategoryChange: (category: ExperienceCategory | "") => void;
  onDestinationChange: (destination: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  selectedCategory,
  selectedDestination,
  availableDestinations,
  hasActiveFilters,
  onCategoryChange,
  onDestinationChange,
  onClearFilters,
}: FilterBarProps) {
  const isCustomDestination =
    Boolean(selectedDestination) &&
    !availableDestinations.some(
      (dest) => dest.toLowerCase() === selectedDestination.toLowerCase()
    );

  // Coincide el valor del select aunque la URL llegue en minúsculas (ej. ?destination=croatia)
  const matchedDestination =
    availableDestinations.find(
      (dest) => dest.toLowerCase() === selectedDestination.toLowerCase()
    ) ?? selectedDestination;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Filtro por categoría */}
      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={`rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
            selectedCategory === ""
              ? "bg-rose-500 text-white shadow-sm shadow-rose-500/30"
              : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100"
          }`}
        >
          Todas
        </button>

        {EXPERIENCE_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(isSelected ? "" : category)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                isSelected
                  ? "bg-rose-500 text-white shadow-sm shadow-rose-500/30"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Filtro por destino + botón limpiar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[210px] flex-1 sm:flex-none">
          <label htmlFor="destination-filter" className="sr-only">
            Filtrar por destino
          </label>
          <select
            id="destination-filter"
            value={matchedDestination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="w-full appearance-none rounded-full border border-zinc-800 bg-zinc-900 py-2.5 pl-4 pr-10 text-sm text-zinc-200 transition-colors focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/25"
          >
            <option value="">Todos los destinos</option>
            {isCustomDestination && (
              <option value={selectedDestination}>{selectedDestination}</option>
            )}
            {availableDestinations.map((dest) => (
              <option key={dest} value={dest}>
                {dest}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-zinc-400">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-full border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-300"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}