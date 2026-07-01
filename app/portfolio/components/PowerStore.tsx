"use client";

import { motion } from "framer-motion";
import PowerCard, { Power } from "./PowerCard";

export const POWERS: Power[] = [
  {
    id: "lead-radar",
    icon: "📡",
    name: "Lead Radar",
    description:
      "Find and qualify potential customers automatically. Continuous signal across channels.",
    powerLevel: 78,
    rarity: "Rare",
    category: "GROWTH · ACQUISITION",
  },
  {
    id: "ai-workforce",
    icon: "🤖",
    name: "AI Workforce",
    description:
      "Deploy AI agents that work 24/7. Handle tasks, respond, and execute without rest.",
    powerLevel: 92,
    rarity: "Legendary",
    category: "AUTOMATION · AI",
  },
  {
    id: "process-clone",
    icon: "⚙️",
    name: "Process Clone",
    description:
      "Turn repetitive work into automated systems. Do it once, benefit indefinitely.",
    powerLevel: 85,
    rarity: "Epic",
    category: "AUTOMATION · OPS",
  },
  {
    id: "business-xray",
    icon: "🔍",
    name: "Business X-Ray",
    description:
      "Discover bottlenecks and hidden opportunities buried in your workflows and data.",
    powerLevel: 71,
    rarity: "Rare",
    category: "INTELLIGENCE · STRATEGY",
  },
  {
    id: "data-oracle",
    icon: "📊",
    name: "Data Oracle",
    description:
      "Transform scattered data into decisions. Clarity from chaos, instantly.",
    powerLevel: 88,
    rarity: "Epic",
    category: "DATA · ANALYTICS",
  },
  {
    id: "product-forge",
    icon: "🛠️",
    name: "Product Forge",
    description:
      "Build custom software products and platforms tailored to your exact business model.",
    powerLevel: 95,
    rarity: "Legendary",
    category: "ENGINEERING · SAAS",
  },
  {
    id: "growth-engine",
    icon: "🚀",
    name: "Growth Engine",
    description:
      "Create systems that generate opportunities on autopilot while you focus elsewhere.",
    powerLevel: 80,
    rarity: "Epic",
    category: "GROWTH · SYSTEMS",
  },
  {
    id: "knowledge-vault",
    icon: "🧠",
    name: "Knowledge Vault",
    description:
      "Centralize information and workflows. Your team's brain, always accessible.",
    powerLevel: 65,
    rarity: "Common",
    category: "KNOWLEDGE · INTERNAL TOOLS",
  },
];

interface PowerStoreProps {
  selectedPowers: Power[];
  onToggle: (power: Power) => void;
}

export default function PowerStore({ selectedPowers, onToggle }: PowerStoreProps) {
  const selectedIds = new Set(selectedPowers.map((p) => p.id));

  return (
    <section id="store" className="py-24 px-6 bg-[#050508]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-3">
            ◈ The Aisle
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Digital Power Store
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Each power is a capability you can add to your business. Click to
            add to your loadout.
          </p>

          {/* Rarity legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {(["Common", "Rare", "Epic", "Legendary"] as const).map((r) => (
              <span
                key={r}
                className={`text-xs font-mono px-3 py-1 rounded-full border ${
                  r === "Common"
                    ? "border-zinc-600/50 text-zinc-400 bg-zinc-900/50"
                    : r === "Rare"
                    ? "border-blue-500/40 text-blue-300 bg-blue-950/40"
                    : r === "Epic"
                    ? "border-violet-500/40 text-violet-300 bg-violet-950/40"
                    : "border-amber-400/40 text-amber-300 bg-amber-950/40"
                }`}
              >
                {r === "Legendary" && "★ "}
                {r === "Epic" && "◆ "}
                {r === "Rare" && "◇ "}
                {r === "Common" && "○ "}
                {r}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {POWERS.map((power, i) => (
            <PowerCard
              key={power.id}
              power={power}
              selected={selectedIds.has(power.id)}
              onToggle={onToggle}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
