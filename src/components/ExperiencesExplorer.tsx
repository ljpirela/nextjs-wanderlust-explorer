"use client";

import { useExperiences } from "@/hooks/useExperiences";
import { useFavorites } from "@/hooks/useFavorites";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SectionWrapper } from "@/components/SectionWrapper";

export function ExperiencesExplorer() {
  const {
    filteredExperiences,
    totalCount,
    search,
    category,
    destination,
    availableDestinations,
    hasActiveFilters,
    setSearch,
    setCategory,
    setDestination,
    clearFilters,
  } = useExperiences();

  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <SectionWrapper
      title="Explorar experiencias"
      subtitle={`Mostrando ${filteredExperiences.length} de ${totalCount} experiencias disponibles`}
    >
      {/* Panel de búsqueda y filtros */}
      <div className="mb-8 space-y-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 sm:p-5">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          selectedCategory={category}
          selectedDestination={destination}
          availableDestinations={availableDestinations}
          hasActiveFilters={hasActiveFilters}
          onCategoryChange={setCategory}
          onDestinationChange={setDestination}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Cuadrícula de tarjetas o estado vacío */}
      {filteredExperiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="m8 8 6 6" />
              <path d="m14 8-6 6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100">
            No se encontraron resultados
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-zinc-400">
            No hay experiencias que coincidan con tu búsqueda o filtros actuales.
            Prueba con otro término o restablece los filtros.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
            >
              Limpiar todos los filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isFavorite={isFavorite(experience.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}