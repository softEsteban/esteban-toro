"use client";

import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { Section, Eyebrow, SectionTitle } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { VideoCard } from "./VideoCard";
import { useT } from "./LanguageProvider";
import { OUTPUT_META } from "../lib/content";

export function OutputShowcase() {
  const { output } = useT();
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{output.eyebrow}</Eyebrow>
          <SectionTitle>{output.title}</SectionTitle>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {output.subtitle}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr]">
        {/* The single idea */}
        <Reveal className="flex justify-center lg:block">
          <div className="relative w-full max-w-xs rounded-3xl bg-white/[0.04] p-6 ring-1 ring-inset ring-white/10 backdrop-blur">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-amber-300/30 to-amber-500/10 text-amber-200 ring-1 ring-inset ring-amber-300/20">
              <Lightbulb className="h-5 w-5" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              {output.ideaLabel}
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug text-white">
              {output.ideaQuote}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 ring-1 ring-inset ring-white/10">
              <Sparkles className="h-3.5 w-3.5" />
              {output.ideaBadge}
            </div>

            {/* Connector arrow (desktop) */}
            <div className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 lg:block">
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/15 backdrop-blur"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </div>
          </div>
        </Reveal>

        {/* The batch of outputs */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {OUTPUT_META.map((clip, i) => (
            <Reveal key={clip.platform} index={i}>
              <VideoCard {...clip} hook={output.hooks[i]} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
