import { ReactNode } from "react";

interface SectionWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SectionWrapper({
  title,
  subtitle,
  children,
}: SectionWrapperProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-zinc-400 sm:text-base">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}