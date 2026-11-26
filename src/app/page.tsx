import Link from "next/link";
import { EXPERIENCE_CATEGORIES } from "@/types/Experience";
import { SectionWrapper } from "@/components/SectionWrapper";

const FEATURED_DESTINATIONS = [
  {
    name: "Croatia",
    label: "Croacia",
    subtitle: "Vela, islas dálmatas y cascadas",
    imageUrl: "https://picsum.photos/seed/wanderlust-001/800/600",
  },
  {
    name: "Japan",
    label: "Japón",
    subtitle: "Ceremonias del té, izakayas y onsen",
    imageUrl: "https://picsum.photos/seed/wanderlust-022/800/600",
  },
  {
    name: "Italy",
    label: "Italia",
    subtitle: "Historia romana, pasta artesanal y termas",
    imageUrl: "https://picsum.photos/seed/wanderlust-021/800/600",
  },
  {
    name: "Colombia",
    label: "Colombia",
    subtitle: "Café de altura, arte urbano y naturaleza",
    imageUrl: "https://picsum.photos/seed/wanderlust-024/800/600",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800/80">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,63,94,0.18),_transparent_60%)]"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-medium text-rose-300">
            100 experiencias curadas alrededor del mundo
          </span>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl">
            Experiencias por las que{" "}
            <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
              vale la pena viajar
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Desde rutas de vela por el Adriático hasta tours gastronómicos nocturnos en Bangkok.
            Filtra por categoría o destino, comparte tu búsqueda por URL y guarda tus favoritas.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:bg-rose-400 active:scale-95"
            >
              <span>Explorar experiencias</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/experiences?search=vela&category=Adventure&destination=Croatia"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Ver vela en Croacia
            </Link>
          </div>

          {/* Accesos directos por categoría */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {EXPERIENCE_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/experiences?category=${encodeURIComponent(category)}`}
                className="rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-rose-500/50 hover:text-rose-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destinos destacados */}
      <SectionWrapper
        title="Actividades dondequiera que vayas"
        subtitle="Aterriza directo en una vista prefiltrada por destino."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_DESTINATIONS.map((dest) => (
            <Link
              key={dest.name}
              href={`/experiences?destination=${encodeURIComponent(dest.name)}`}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-rose-400">
                  {dest.label}
                </h3>
                <p className="mt-0.5 text-xs text-zinc-300">{dest.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
