"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { LOCALES, type Locale } from "../lib/i18n";
import { cn } from "../lib/cn";

const LABEL: Record<Locale, string> = { en: "EN", es: "ES" };

/** Sticky segmented EN/ES control, fixed to the top-right of the viewport. */
export function LanguageSwitch() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <div
        role="radiogroup"
        aria-label="Language"
        className="flex items-center gap-1 rounded-full bg-black/40 p-1 ring-1 ring-inset ring-white/15 backdrop-blur-md"
      >
        <Languages className="ml-2 mr-0.5 h-3.5 w-3.5 text-white/40" aria-hidden />
        {LOCALES.map((code) => {
          const active = locale === code;
          return (
            <button
              key={code}
              role="radio"
              aria-checked={active}
              onClick={() => setLocale(code)}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200",
                active ? "text-black" : "text-white/60 hover:text-white",
              )}
            >
              {active && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{LABEL[code]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
