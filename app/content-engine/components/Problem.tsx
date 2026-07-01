"use client";

import { X } from "lucide-react";
import { Section, Eyebrow, SectionTitle } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { useT } from "./LanguageProvider";

export function Problem() {
  const { problem } = useT();
  return (
    <Section>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>{problem.eyebrow}</Eyebrow>
            <SectionTitle>{problem.headline}</SectionTitle>
          </Reveal>
          <div className="mt-6 space-y-4">
            {problem.body.map((p, i) => (
              <Reveal key={i} index={i + 1}>
                <p className="text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal index={1}>
          <ul className="grid gap-3 rounded-3xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/10 backdrop-blur sm:p-6">
            {problem.pains.map((pain) => (
              <li
                key={pain}
                className="flex items-center gap-4 rounded-2xl bg-white/[0.02] px-5 py-4 ring-1 ring-inset ring-white/[0.06] transition-colors duration-300 hover:bg-white/[0.05]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/10 ring-1 ring-inset ring-rose-500/20">
                  <X className="h-4 w-4 text-rose-400" />
                </span>
                <span className="text-base text-white/80">{pain}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
