import * as React from "react";
import { cn } from "../../lib/cn";

/** Consistent vertical rhythm + max-width for every page section. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
