import * as React from "react";
import { cn } from "../../lib/cn";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5",
        "text-xs font-semibold uppercase tracking-[0.18em]",
        "bg-white/5 text-white/80 ring-1 ring-inset ring-white/15 backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
