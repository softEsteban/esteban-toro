"use client";

import { motion } from "framer-motion";
import { Sparkles, Play, LayoutTemplate, FileJson } from "lucide-react";
import { useT } from "./LanguageProvider";

/** Small glass chip that floats beside the book to hint at the output. */
function FloatChip({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute z-20 hidden rounded-2xl bg-white/10 p-3 ring-1 ring-inset ring-white/20 backdrop-blur-md sm:block ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Realistic 3D ebook mockup built entirely with CSS 3D transforms.
 * Gently floats + tilts. No image asset required.
 */
export function Ebook3D() {
  const { hero } = useT();

  return (
    <div
      className="relative flex items-center justify-center py-8"
      style={{ perspective: "1600px" }}
    >
      {/* Floating output hints */}
      <FloatChip className="-left-2 top-6 lg:left-2" delay={0.5}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <Play className="h-4 w-4 translate-x-px fill-current" />
          </span>
          <div>
            <p className="text-xs font-semibold text-white">{hero.reelRendered}</p>
            <p className="text-[10px] text-white/60">{hero.reelMeta}</p>
          </div>
        </div>
      </FloatChip>

      <FloatChip className="-right-2 top-20 lg:right-0" delay={0.75}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/25 text-fuchsia-200 ring-1 ring-inset ring-fuchsia-300/30">
            <LayoutTemplate className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-white">{hero.templatesCount}</p>
            <p className="text-[10px] text-white/60">{hero.dragRemix}</p>
          </div>
        </div>
      </FloatChip>

      <FloatChip className="-right-1 bottom-10 lg:right-6" delay={1}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-200 ring-1 ring-inset ring-cyan-300/30">
            <FileJson className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-white">{hero.ideaToJson}</p>
            <p className="text-[10px] text-white/60">{hero.claudeCode}</p>
          </div>
        </div>
      </FloatChip>

      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, rotateY: -40, y: 30 }}
        animate={{ opacity: 1, rotateY: -22, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d" }}
          animate={{ y: [0, -16, 0], rotateX: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Book cover */}
          <div
            className="relative h-[26rem] w-[19rem] overflow-hidden rounded-r-md rounded-l-sm sm:h-[30rem] sm:w-[22rem]"
            style={{
              transformStyle: "preserve-3d",
              backgroundImage:
                "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #0f172a 100%)",
              boxShadow:
                "0 50px 90px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06) inset",
            }}
          >
            {/* Sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0" />
            {/* Glow accents */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />

            {/* Content */}
            <div className="relative flex h-full flex-col justify-between p-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 ring-1 ring-inset ring-white/20">
                  <Sparkles className="h-3 w-3" />
                  {hero.coverBadge}
                </span>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                  {hero.coverKicker}
                </p>
                <h3 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-[2.75rem]">
                  AI
                  <br />
                  Content
                  <br />
                  Engine
                </h3>
                <div className="mt-5 h-px w-24 bg-gradient-to-r from-white/60 to-transparent" />
                <p className="mt-5 max-w-[15rem] text-sm leading-relaxed text-white/60">
                  {hero.coverSubtitle}
                </p>
              </div>

              <p className="text-sm font-medium text-white/70">
                {hero.coverAuthor}
              </p>
            </div>

            {/* Right-edge page stack */}
            <div
              className="absolute right-0 top-0 h-full w-3"
              style={{
                transform: "translateX(100%) rotateY(90deg)",
                transformOrigin: "left center",
                backgroundImage:
                  "repeating-linear-gradient(to right, #e5e7eb, #e5e7eb 1px, #cbd5e1 1px, #cbd5e1 2px)",
              }}
            />
          </div>

          {/* Spine */}
          <div
            className="absolute left-0 top-0 h-full w-6 rounded-l-sm"
            style={{
              transform: "translateX(-100%) rotateY(-90deg)",
              transformOrigin: "right center",
              backgroundImage:
                "linear-gradient(to right, #0b0620, #2e1065)",
            }}
          />
        </motion.div>

        {/* Floor reflection / shadow */}
        <div className="mx-auto mt-6 h-8 w-[16rem] rounded-[100%] bg-black/60 blur-2xl" />
      </motion.div>
    </div>
  );
}
