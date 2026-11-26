import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust Explorer — Descubre experiencias únicas",
  description:
    "Explora, busca y guarda experiencias inolvidables alrededor del mundo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 antialiased`}
      >
        <FavoritesProvider>
          <Suspense
            fallback={
              <div className="h-[65px] border-b border-zinc-800/80 bg-zinc-950/85" />
            }
          >
            <Navbar />
          </Suspense>
          <div className="flex-1">{children}</div>
          <footer className="mt-16 border-t border-zinc-800/80 bg-zinc-950 py-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
              <p>© 2026 Wanderlust Labs. Todos los derechos reservados.</p>
              <p>Construido con Next.js, React y Tailwind CSS.</p>
            </div>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}