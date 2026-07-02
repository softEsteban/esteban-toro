"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Menu, X } from "lucide-react";
import { cn } from "../../content-engine/lib/cn";
import { useLanguage } from "../../content-engine/components/LanguageProvider";
import { getGuide } from "../lib/guide-content";
import { BlockRenderer } from "./BlockRenderer";
import { DownloadPDF } from "./DownloadPDF";

// Scroll-spy: returns the id of the chapter closest to the top of the viewport.
function useActiveChapter(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top that is currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function GuideShell() {
  const { locale } = useLanguage();
  const guide = getGuide(locale);
  const ids = React.useMemo(
    () => guide.chapters.map((c) => c.id),
    [guide.chapters],
  );
  const active = useActiveChapter(ids);
  const [navOpen, setNavOpen] = React.useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {guide.chapters.map((c) => {
        const isActive = active === c.id;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={() => setNavOpen(false)}
            className={cn(
              "group relative flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200",
              isActive
                ? "bg-white/[0.06] text-white"
                : "text-white/45 hover:bg-white/[0.03] hover:text-white/80",
            )}
          >
            <span
              className={cn(
                "mt-px font-mono text-xs tabular-nums",
                isActive ? "text-violet-300" : "text-white/30",
              )}
            >
              {String(c.number).padStart(2, "0")}
            </span>
            <span className="leading-snug">{c.title}</span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-10 px-6 sm:px-8 lg:gap-16">
      {/* ── Sidebar (desktop) ─────────────────────────────────────────── */}
      {/* `self-start` stops the flex row from stretching the aside to the full
          content height, which is what lets `sticky` actually pin it. */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col self-start py-10 lg:flex xl:w-72">
        <Link
          href="/content-engine"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {guide.ui.backToLanding}
        </Link>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
          {guide.ui.contents}
        </p>
        <div className="guide-scroll -mr-2 flex-1 overflow-y-auto pr-2">
          {nav}
        </div>

        <div className="mt-6 border-t border-white/[0.08] pt-6">
          <DownloadPDF guide={guide} />
        </div>
      </aside>

      {/* ── Mobile nav trigger + drawer ───────────────────────────────── */}
      <div className="fixed left-4 top-4 z-40 lg:hidden">
        <button
          onClick={() => setNavOpen(true)}
          aria-label={guide.ui.contents}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/70 ring-1 ring-inset ring-white/15 backdrop-blur-md"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setNavOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col bg-[#0a0a0f] p-6 ring-1 ring-white/10 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                  {guide.ui.contents}
                </span>
                <button
                  onClick={() => setNavOpen(false)}
                  aria-label="Close"
                  className="text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="guide-scroll flex-1 overflow-y-auto">{nav}</div>
              <div className="mt-6 border-t border-white/[0.08] pt-6">
                <DownloadPDF guide={guide} />
              </div>
              <Link
                href="/content-engine"
                className="mt-4 inline-flex items-center gap-2 text-sm text-white/45"
              >
                <ArrowLeft className="h-4 w-4" />
                {guide.ui.backToLanding}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main className="min-w-0 flex-1 py-16 sm:py-20 lg:py-24">
        {/* Hero */}
        <header className="mb-16 border-b border-white/[0.08] pb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300/80">
            {guide.meta.kicker}
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {guide.meta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            {guide.meta.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/40">
            <span>{guide.meta.author}</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {guide.meta.readingTime}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" />
            <span>{guide.meta.version}</span>
          </div>
          <div className="mt-8 space-y-3">
            {guide.ui.intro.map((para, i) => (
              <p key={i} className="max-w-2xl text-[17px] leading-relaxed text-white/70">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-8 max-w-xs lg:hidden">
            <DownloadPDF guide={guide} />
          </div>
        </header>

        {/* Chapters */}
        <div>
          {guide.chapters.map((chapter) => (
            <section
              key={chapter.id}
              id={chapter.id}
              className="scroll-mt-24 border-b border-white/[0.06] py-14 first:pt-0 last:border-0"
            >
              <div className="mb-8 flex items-baseline gap-4">
                <span className="font-mono text-sm text-violet-300/70">
                  {guide.ui.chapter} {String(chapter.number).padStart(2, "0")}
                </span>
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {chapter.title}
              </h2>
              <p className="mt-3 text-lg italic text-white/45">
                {chapter.tagline}
              </p>
              <div className="mt-8">
                <BlockRenderer blocks={chapter.blocks} />
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-white/[0.08] pt-10 text-sm text-white/35">
          {guide.meta.title} · {guide.meta.author}
        </footer>
      </main>
    </div>
  );
}
