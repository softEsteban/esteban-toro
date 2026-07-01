"use client";

import { Section, Eyebrow, SectionTitle } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { useT } from "./LanguageProvider";
import { PERSONA_ICONS } from "../lib/content";

export function Audience() {
  const { audience } = useT();
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{audience.eyebrow}</Eyebrow>
          <SectionTitle>{audience.title}</SectionTitle>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {audience.subtitle}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {audience.personas.map((persona, i) => {
          const Icon = PERSONA_ICONS[i];
          return (
            <Reveal key={i} index={i % 7}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-white/[0.03] px-4 py-6 text-center ring-1 ring-inset ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-white/15 to-white/5 text-white ring-1 ring-inset ring-white/15 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/80">
                  {persona}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
