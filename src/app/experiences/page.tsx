import { Suspense } from "react";
import { ExperiencesExplorer } from "@/components/ExperiencesExplorer";

function ExplorerFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 h-8 w-64 animate-pulse rounded-lg bg-zinc-800" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}

export default function ExperiencesPage() {
  return (
    <main>
      <Suspense fallback={<ExplorerFallback />}>
        <ExperiencesExplorer />
      </Suspense>
    </main>
  );
}