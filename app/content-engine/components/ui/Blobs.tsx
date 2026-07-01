"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

/**
 * Floating decorative gradient blobs. Purely presentational + non-interactive.
 * Sits behind content (negative z-index handled by parent stacking context).
 */
export function Blobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="absolute -left-24 top-0 h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-[130px]"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
