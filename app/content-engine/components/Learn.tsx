"use client";

import { Section, Eyebrow, SectionTitle } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { useT } from "./LanguageProvider";
import { LEARN_ICONS } from "../lib/content";

export function Learn() {
  const { learn } = useT();
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{learn.eyebrow}</Eyebrow>
          <SectionTitle>{learn.title}</SectionTitle>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {learn.topics.map((topic, i) => {
          const Icon = LEARN_ICONS[i];
          return (
            <Reveal key={i} index={i % 4}>
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white/[0.03] p-6 ring-1 ring-inset ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/20 hover:shadow-[0_30px_60px_-30px_rgba(139,92,246,0.4)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-white/15 to-white/5 text-white ring-1 ring-inset ring-white/15">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {topic.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
