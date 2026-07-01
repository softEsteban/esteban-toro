"use client";

import { Section, Eyebrow, SectionTitle } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { useT } from "./LanguageProvider";
import { TEMPLATE_LAYOUTS } from "../lib/content";

const bar = "rounded-full bg-white/25";
const softBar = "rounded-full bg-white/12";

/** Abstract 9:16 wireframe preview per template layout. */
function TemplatePreview({ layout }: { layout: string }) {
  const frame =
    "relative flex aspect-[9/16] w-full flex-col overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 ring-1 ring-inset ring-white/10";

  switch (layout) {
    case "hook":
      return (
        <div className={frame}>
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <div className={`h-2.5 w-4/5 ${bar}`} />
            <div className={`h-2.5 w-3/5 ${bar}`} />
          </div>
          <div className="mx-auto h-6 w-6 rounded-full bg-white/40" />
        </div>
      );
    case "list":
      return (
        <div className={`${frame} justify-center gap-2`}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-white/40" />
              <div className={`h-2 flex-1 ${softBar}`} />
            </div>
          ))}
        </div>
      );
    case "talkinghead":
      return (
        <div className={frame}>
          <div className="mx-auto mt-2 h-10 w-10 rounded-full bg-white/30" />
          <div className="flex-1" />
          <div className="space-y-1.5">
            <div className={`mx-auto h-2 w-11/12 ${bar}`} />
            <div className={`mx-auto h-2 w-3/4 ${bar}`} />
          </div>
        </div>
      );
    case "code":
      return (
        <div className={`${frame} justify-center gap-1.5`}>
          {[5, 4, 3, 4, 2].map((w, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
              <div
                className={`h-1.5 ${softBar}`}
                style={{ width: `${w * 14}%` }}
              />
            </div>
          ))}
        </div>
      );
    case "beforeafter":
      return (
        <div className={`${frame} gap-2 p-2`}>
          <div className="flex flex-1 items-center justify-center rounded-lg bg-rose-400/15 ring-1 ring-inset ring-rose-300/20">
            <span className="text-[10px] font-semibold text-rose-200">
              BEFORE
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg bg-emerald-400/15 ring-1 ring-inset ring-emerald-300/20">
            <span className="text-[10px] font-semibold text-emerald-200">
              AFTER
            </span>
          </div>
        </div>
      );
    case "statement":
    default:
      return (
        <div className={`${frame} items-center justify-center gap-2`}>
          <div className={`h-3 w-4/5 ${bar}`} />
          <div className={`h-3 w-2/3 ${bar}`} />
          <div className={`h-3 w-1/2 ${bar}`} />
        </div>
      );
  }
}

export function TemplateGallery() {
  const { templates } = useT();
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{templates.eyebrow}</Eyebrow>
          <SectionTitle>{templates.title}</SectionTitle>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {templates.subtitle}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {templates.items.map((item, i) => (
          <Reveal key={i} index={i % 6}>
            <div className="group rounded-2xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/20">
              <TemplatePreview layout={TEMPLATE_LAYOUTS[i]} />
              <div className="px-1 pb-1 pt-3">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="mt-0.5 text-xs text-white/45">{item.tag}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
