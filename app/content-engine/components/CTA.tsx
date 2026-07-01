"use client";

import { Blobs } from "./ui/Blobs";
import { Reveal } from "./ui/Reveal";
import { EmailForm } from "./EmailForm";
import { Badge } from "./ui/Badge";
import { Sparkles } from "lucide-react";
import { useT } from "./LanguageProvider";

export function CTA() {
  const { finalCta } = useT();
  return (
    <section id="get-the-guide" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 ring-1 ring-inset ring-white/15 backdrop-blur-xl sm:p-14">
          <Blobs className="-z-0 opacity-70" />
          <div className="relative z-10 text-center">
            <Reveal>
              <div className="flex justify-center">
                <Badge>
                  <Sparkles className="h-3 w-3" />
                  {finalCta.badge}
                </Badge>
              </div>
              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                {finalCta.headline}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
                {finalCta.body}
              </p>
            </Reveal>

            <Reveal index={1}>
              <div className="mx-auto mt-9 max-w-xl">
                <EmailForm size="lg" buttonLabel={finalCta.cta} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
