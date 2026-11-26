import { Suspense } from "react";
import { ExperienceDetail } from "@/components/ExperienceDetail";

function DetailFallback() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 h-5 w-40 animate-pulse rounded bg-zinc-800" />
      <div className="aspect-[16/9] w-full animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900 sm:aspect-[21/9]" />
    </div>
  );
}

export default function ExperienceDetailPage() {
  return (
    <main>
      <Suspense fallback={<DetailFallback />}>
        <ExperienceDetail />
      </Suspense>
    </main>
  );
}