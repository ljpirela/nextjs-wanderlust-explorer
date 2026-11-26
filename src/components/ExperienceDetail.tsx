"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";
import { formatPrice } from "@/lib/formatPrice";

export function ExperienceDetail() {
  const params = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const experience = experiences.find((item) => item.id === params.id);

  // Sincroniza el título de la pestaña del navegador con la experiencia actual
  useEffect(() => {
    if (experience) {
      document.title = `${experience.title} | Wanderlust Explorer`;
    } else {
      document.title = "Experiencia no encontrada | Wanderlust Explorer";
    }

    return () => {
      document.title = "Wanderlust Explorer — Descubre experiencias únicas";
    };
  }, [experience]);

  if (!experience) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
          404
        </span>
        <h1 className="mt-4 text-3xl font-bold text-zinc-100">
          Experiencia no encontrada
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          No pudimos localizar una experiencia con el identificador{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-rose-400">
            {params.id}
          </code>
          .
        </p>
        <Link
          href="/experiences"
          className="mt-6 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
        >
          Volver al explorador
        </Link>
      </div>
    );
  }

  const saved = isFavorite(experience.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Enlace de regreso */}
      <Link
        href="/experiences"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
      >
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
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span>Volver al explorador</span>
      </Link>

      {/* Imagen principal */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
        <div className="aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
          <Link
            href={`/experiences?category=${encodeURIComponent(experience.category)}`}
            className="rounded-full border border-white/15 bg-zinc-950/75 px-3.5 py-1 text-xs font-semibold text-zinc-100 backdrop-blur-md transition-colors hover:border-rose-500/50 hover:text-rose-300"
          >
            {experience.category}
          </Link>
        </div>
      </div>

      {/* Contenido + Tarjeta de acción */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span>{experience.destination}</span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-zinc-100">
                <svg
                  className="h-4 w-4 text-amber-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {experience.rating.toFixed(1)}
              </span>
              <span aria-hidden="true">•</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500">
                ID: {experience.id}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
              {experience.title}
            </h1>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6">
            <h2 className="text-base font-semibold text-zinc-100">
              Sobre esta experiencia
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {experience.description}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-zinc-800 pt-5 sm:grid-cols-3">
              <div>
                <p className="text-xs text-zinc-500">Categoría</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">
                  {experience.category}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Ubicación</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">
                  {experience.destination}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Valoración</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">
                  {experience.rating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna lateral de precio y favorito */}
        <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl shadow-black/30">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Tarifa por participante
          </p>
          <p className="mt-2 text-3xl font-extrabold text-zinc-100">
            {formatPrice(experience.price)}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Cancelación flexible y confirmación inmediata.
          </p>

          <button
            type="button"
            onClick={() => toggleFavorite(experience.id)}
            aria-pressed={saved}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all active:scale-95 ${
              saved
                ? "border border-rose-500/40 bg-rose-500/15 text-rose-400 hover:bg-rose-500/25"
                : "bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:bg-rose-400"
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>{saved ? "Guardada en favoritos" : "Guardar en favoritos"}</span>
          </button>

          <Link
            href="/favorites"
            className="mt-3 block w-full rounded-full border border-zinc-700 px-5 py-2.5 text-center text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            Ir a mis favoritos
          </Link>
        </aside>
      </div>
    </div>
  );
}