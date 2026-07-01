"use client";

import { useState, useRef, useCallback } from "react";
import Hero from "./components/Hero";
import PowerStore from "./components/PowerStore";
import LoadoutBuilder from "./components/LoadoutBuilder";
import QuestBoard from "./components/QuestBoard";
import Workshop from "./components/Workshop";
import Philosophy from "./components/Philosophy";
import FinalCTA from "./components/FinalCTA";
import { Power } from "./components/PowerCard";

export default function PortfolioPage() {
  const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
  const storeRef = useRef<HTMLDivElement>(null);
  const loadoutRef = useRef<HTMLDivElement>(null);

  const scrollToStore = useCallback(() => {
    storeRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToLoadout = useCallback(() => {
    loadoutRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const togglePower = useCallback((power: Power) => {
    setSelectedPowers((prev) => {
      const exists = prev.find((p) => p.id === power.id);
      return exists ? prev.filter((p) => p.id !== power.id) : [...prev, power];
    });
  }, []);

  const removePower = useCallback((id: string) => {
    setSelectedPowers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearPowers = useCallback(() => {
    setSelectedPowers([]);
  }, []);

  return (
    <main className="bg-[#050508] min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#050508]/80 backdrop-blur-md border-b border-zinc-800/50">
        <a
          href="/"
          className="text-white font-bold text-sm font-mono tracking-tight"
        >
          ET
          <span className="text-indigo-400 ml-1">⚡</span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-zinc-500">
          <a href="#store" className="hover:text-zinc-300 transition-colors">
            Store
          </a>
          <a href="#loadout" className="hover:text-zinc-300 transition-colors">
            Loadout
          </a>
          <a href="#quests" className="hover:text-zinc-300 transition-colors">
            Quests
          </a>
        </div>

        <div className="flex items-center gap-3">
          {selectedPowers.length > 0 && (
            <button
              onClick={scrollToLoadout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-mono hover:bg-indigo-600/30 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {selectedPowers.length} EQUIPPED
            </button>
          )}
          <a
            href="mailto:hola@estebantoro.com"
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <Hero onEnter={scrollToStore} />

      {/* Power Store */}
      <div ref={storeRef}>
        <PowerStore selectedPowers={selectedPowers} onToggle={togglePower} />
      </div>

      {/* Loadout Builder */}
      <div ref={loadoutRef}>
        <LoadoutBuilder
          selectedPowers={selectedPowers}
          onRemove={removePower}
          onClear={clearPowers}
        />
      </div>

      {/* Quest Board */}
      <QuestBoard />

      {/* Workshop */}
      <Workshop />

      {/* Philosophy */}
      <Philosophy />

      {/* Final CTA */}
      <FinalCTA onBuildLoadout={scrollToLoadout} />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800/50 bg-[#050508]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-xs font-mono">
          <span>
            © 2024 Esteban Toro · Software Engineer · AI Builder · Systems
            Designer
          </span>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-zinc-400 transition-colors">
              Home
            </a>
            <a
              href="/products"
              className="hover:text-zinc-400 transition-colors"
            >
              Products
            </a>
            <a
              href="mailto:hola@estebantoro.com"
              className="hover:text-zinc-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
