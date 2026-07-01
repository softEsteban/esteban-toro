"use client";

import { Section, Eyebrow, SectionTitle } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { useT } from "./LanguageProvider";

export function GuideContents() {
  const { guide } = useT();
  return (
    <Section id="inside">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{guide.eyebrow}</Eyebrow>
          <SectionTitle>{guide.title}</SectionTitle>
        </Reveal>
      </div>

      <ol className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
        {guide.chapters.map((chapter, i) => (
          <Reveal key={i} index={i % 2} as="li">
            <div className="group flex h-full items-start gap-5 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-inset ring-white/10 backdrop-blur transition-all duration-300 hover:bg-white/[0.06] hover:ring-white/20">
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text font-mono text-3xl font-bold leading-none text-transparent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold leading-snug text-white">
                  {chapter.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                  {chapter.summary}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
