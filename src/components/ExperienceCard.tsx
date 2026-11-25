"use client";

import Link from "next/link";
import { Experience } from "@/types/Experience";
import { formatPrice } from "@/lib/formatPrice";

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
}: ExperienceCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/40">
      {/* Contenedor de imagen */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-800">
        <Link
          href={`/experiences/${experience.id}`}
          className="block h-full w-full"
        >
          <img
            src={experience.imageUrl}
            alt={experience.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
        </Link>

        {/* Badge de categoría */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-zinc-950/75 px-3 py-1 text-xs font-medium text-zinc-100 backdrop-blur-md">
          {experience.category}
        </span>

        {/* Botón de favorito (corazón) */}
        <button
          type="button"
          onClick={() => onToggleFavorite(experience.id)}
          aria-label={
            isFavorite
              ? `Quitar ${experience.title} de favoritos`
              : `Guardar ${experience.title} en favoritos`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all active:scale-90 ${
            isFavorite
              ? "border-rose-500/50 bg-rose-500/20 text-rose-500"
              : "border-white/15 bg-zinc-950/60 text-zinc-100 hover:bg-zinc-950/85 hover:text-rose-400"
          }`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      {/* Contenido de la tarjeta */}
      <Link
        href={`/experiences/${experience.id}`}
        className="flex flex-1 flex-col justify-between gap-3 p-4"
      >
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
            <span className="truncate">{experience.destination}</span>
            <span className="flex shrink-0 items-center gap-1 font-medium text-zinc-200">
              <svg
                className="h-3.5 w-3.5 text-amber-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {experience.rating.toFixed(1)}
            </span>
          </div>

          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-rose-400">
            {experience.title}
          </h3>

          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
            {experience.description}
          </p>
        </div>

        <div className="flex items-baseline justify-between border-t border-zinc-800/80 pt-3">
          <span className="text-xs text-zinc-400">Desde</span>
          <p className="text-sm font-bold text-zinc-100">
            {formatPrice(experience.price)}{" "}
            <span className="text-xs font-normal text-zinc-400">/ persona</span>
          </p>
        </div>
      </Link>
    </article>
  );
}