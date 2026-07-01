"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { Section, Eyebrow, SectionTitle } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { PlatformIcon } from "./ui/PlatformIcon";
import { useT } from "./LanguageProvider";
import { PIPELINE_ICONS, PIPELINE_OUTPUTS, buildSceneJson } from "../lib/content";
import type { LucideIcon } from "lucide-react";

function PipelineCard({
  index,
  label,
  note,
  icon: Icon,
}: {
  index: number;
  label: string;
  note: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group relative w-full max-w-md overflow-hidden rounded-2xl bg-white/[0.03] px-5 py-4 ring-1 ring-inset ring-white/10 backdrop-blur transition-all duration-300 hover:bg-white/[0.06] hover:ring-white/20">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-white/15 to-white/5 text-white ring-1 ring-inset ring-white/15">
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-base font-semibold text-white">{label}</p>
          <p className="text-sm text-white/50">{note}</p>
        </div>
        <span className="font-mono text-xs text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/** Visual proof of the "JSON → video" step: code turns into a rendered frame. */
function TransformationVisual() {
  const { solution } = useT();
  const sceneJson = buildSceneJson(solution.sceneText, solution.sceneSubtitle);
  return (
    <div className="grid w-full max-w-md grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/10 backdrop-blur">
      {/* JSON side */}
      <div className="overflow-hidden rounded-xl bg-black/40 p-3 ring-1 ring-inset ring-white/10">
        <div className="mb-2 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        </div>
        <pre className="whitespace-pre-wrap font-mono text-[9px] leading-relaxed text-white/60">
          {sceneJson}
        </pre>
      </div>

      {/* Arrow */}
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="text-white/40"
      >
        →
      </motion.span>

      {/* Rendered frame side */}
      <div className="relative flex aspect-[9/16] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-violet-500/40 to-indigo-900/60 p-3 ring-1 ring-inset ring-white/15">
        <div className="text-center">
          <p className="text-sm font-bold leading-tight text-white">
            {solution.sceneText}
          </p>
          <p className="mt-1 text-[10px] font-medium text-white/70">
            {solution.sceneSubtitle}
          </p>
        </div>
        <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-black">
          <Play className="h-3 w-3 translate-x-px fill-current" />
        </span>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <ArrowDown aria-hidden className="my-2.5 h-5 w-5 text-white/25" strokeWidth={2} />
  );
}

export function Solution() {
  const { solution } = useT();
  // JSON is the 4th step (index 3) — indexing by position keeps this
  // locale-independent even when the label is translated.
  const JSON_STEP_INDEX = 3;

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{solution.eyebrow}</Eyebrow>
          <SectionTitle>{solution.title}</SectionTitle>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {solution.subtitle}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col items-center">
        {solution.pipeline.map((step, i) => (
          <div key={i} className="flex w-full flex-col items-center">
            <Reveal index={Math.min(i, 4)} className="flex w-full justify-center">
              <PipelineCard
                index={i}
                label={step.label}
                note={step.note}
                icon={PIPELINE_ICONS[i]}
              />
            </Reveal>
            <Connector />

            {/* After the JSON step, show the transformation into a video frame */}
            {i === JSON_STEP_INDEX && (
              <>
                <Reveal className="flex w-full justify-center">
                  <TransformationVisual />
                </Reveal>
                <Connector />
              </>
            )}
          </div>
        ))}

        {/* Fan-out to platforms */}
        <Reveal className="w-full">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PIPELINE_OUTPUTS.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white/10 to-white/[0.03] px-5 py-2.5 text-sm font-medium text-white ring-1 ring-inset ring-white/15 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
              >
                <PlatformIcon platform={platform} className="h-4 w-4 text-white/70" />
                {platform}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
