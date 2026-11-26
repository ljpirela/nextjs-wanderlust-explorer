"use client";

import Link from "next/link";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SectionWrapper } from "@/components/SectionWrapper";

export default function FavoritesPage() {
  const { favoriteIds, favoritesCount, isFavorite, toggleFavorite } =
    useFavorites();

  const favoriteExperiences = experiences.filter((exp) =>
    favoriteIds.includes(exp.id)
  );

  return (
    <main>
      <SectionWrapper
        title="Tus experiencias favoritas"
        subtitle={
          favoritesCount === 0
            ? "Aún no has guardado ninguna experiencia."
            : `Tienes ${favoritesCount} ${
                favoritesCount === 1
                  ? "experiencia guardada"
                  : "experiencias guardadas"
              } en tu lista.`
        }
      >
        {favoriteExperiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
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
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">
              Tu lista de favoritos está vacía
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-zinc-400">
              Toca el ícono de corazón en cualquier tarjeta del explorador para
              guardar las actividades que más te interesen.
            </p>
            <Link
              href="/experiences"
              className="mt-6 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
            >
              Explorar experiencias
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteExperiences.map((experience) => (
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
    </main>
  );
}