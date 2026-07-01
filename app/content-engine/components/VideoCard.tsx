"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "../lib/cn";
import { PlatformIcon } from "./ui/PlatformIcon";

/** Animated equalizer bars — sells the "this is a video" idea. */
function Waveform() {
  const bars = [0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.3];
  return (
    <div className="flex h-5 items-end gap-1">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-white/70"
          style={{ height: `${h * 100}%` }}
          animate={{ scaleY: [0.4, 1, 0.5, 0.9, 0.4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

/**
 * A realistic 9:16 vertical video mockup. Presentational only — used to help
 * visitors picture the output of the guide.
 */
export function VideoCard({
  platform,
  hook,
  tag,
  accent,
  className,
}: {
  platform: string;
  hook: string;
  tag: string;
  accent: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative aspect-[9/16] w-full overflow-hidden rounded-[1.5rem] ring-1 ring-inset ring-white/15",
        "shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1.5",
        className,
      )}
      style={{ backgroundImage: accent }}
    >
      {/* Sheen + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-white/10" />

      {/* Top bar: platform + duration */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur">
          <PlatformIcon platform={platform} className="h-3.5 w-3.5" />
          {platform}
        </span>
        <span className="rounded-full bg-black/30 px-2 py-1 font-mono text-[10px] text-white/80 ring-1 ring-inset ring-white/15 backdrop-blur">
          {tag}
        </span>
      </div>

      {/* Center play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/40 backdrop-blur-md"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg">
            <Play className="h-5 w-5 translate-x-0.5 fill-current" />
          </span>
        </motion.span>
      </div>

      {/* Bottom: hook caption, waveform, progress */}
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-4">
        <p className="text-pretty text-[15px] font-semibold leading-snug text-white drop-shadow">
          {hook}
        </p>
        <Waveform />
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-white"
            animate={{ width: ["12%", "92%", "12%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
