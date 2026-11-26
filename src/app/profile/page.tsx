"use client";

import Link from "next/link";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";
import { SectionWrapper } from "@/components/SectionWrapper";

const MOCK_USER = {
  name: "Alex Morales",
  handle: "@alex.wanderlust",
  role: "Viajero Explorador",
  location: "Caracas, Venezuela",
  memberSince: "Noviembre 2026",
  bio: "Apasionado por descubrir gastronomía local, deportes al aire libre y arquitectura histórica alrededor del mundo.",
};

export default function ProfilePage() {
  const { favoriteIds, favoritesCount } = useFavorites();

  const savedExperiences = experiences.filter((exp) =>
    favoriteIds.includes(exp.id)
  );

  const uniqueDestinations = new Set(
    savedExperiences.map((exp) => exp.destination)
  ).size;

  return (
    <main>
      <SectionWrapper
        title="Perfil de viajero"
        subtitle="Resumen de tu cuenta y experiencias guardadas en esta sesión."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Tarjeta principal del perfil */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 lg:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-2xl font-bold text-white shadow-lg shadow-rose-500/20">
                AM
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-zinc-100">
                    {MOCK_USER.name}
                  </h3>
                  <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-300">
                    {MOCK_USER.role}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">{MOCK_USER.handle}</p>
                <p className="text-xs text-zinc-500">
                  {MOCK_USER.location} • Miembro desde {MOCK_USER.memberSince}
                </p>
              </div>
            </div>

            <p className="mt-6 border-t border-zinc-800 pt-5 text-sm leading-relaxed text-zinc-300">
              {MOCK_USER.bio}
            </p>
          </div>

          {/* Resumen de favoritos */}
          <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Resumen de actividad
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <p className="text-xs text-zinc-400">Favoritos</p>
                  <p className="mt-1 text-3xl font-extrabold text-rose-400">
                    {favoritesCount}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <p className="text-xs text-zinc-400">Destinos</p>
                  <p className="mt-1 text-3xl font-extrabold text-zinc-100">
                    {uniqueDestinations}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/favorites"
                className="w-full rounded-full bg-rose-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-rose-400"
              >
                Ver mis favoritos ({favoritesCount})
              </Link>
              <Link
                href="/experiences"
                className="w-full rounded-full border border-zinc-700 px-5 py-2.5 text-center text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
              >
                Seguir explorando
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
