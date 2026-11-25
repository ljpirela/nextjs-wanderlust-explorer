"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Explorar", href: "/experiences" },
  { label: "Favoritos", href: "/favorites" },
  { label: "Perfil", href: "/profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-zinc-100 transition-colors hover:text-rose-400"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm shadow-rose-500/30">
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
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </span>
          <span>
            Wanderlust<span className="text-rose-500">.</span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-rose-500/15 text-rose-400 ring-1 ring-inset ring-rose-500/30"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                }`}
              >
                <span>{link.label}</span>
                {link.href === "/favorites" && favoritesCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-xs font-semibold text-white">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}