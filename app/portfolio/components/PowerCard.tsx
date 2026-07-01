"use client";

import { motion } from "framer-motion";

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface Power {
  id: string;
  icon: string;
  name: string;
  description: string;
  powerLevel: number;
  rarity: Rarity;
  category: string;
}

const rarityConfig: Record<
  Rarity,
  { label: string; border: string; glow: string; badge: string; text: string }
> = {
  Common: {
    label: "COMMON",
    border: "border-zinc-600/50",
    glow: "hover:shadow-zinc-700/30",
    badge: "bg-zinc-700 text-zinc-300",
    text: "text-zinc-300",
  },
  Rare: {
    label: "RARE",
    border: "border-blue-500/40",
    glow: "hover:shadow-blue-500/20",
    badge: "bg-blue-900/60 text-blue-300",
    text: "text-blue-300",
  },
  Epic: {
    label: "EPIC",
    border: "border-violet-500/50",
    glow: "hover:shadow-violet-500/25",
    badge: "bg-violet-900/60 text-violet-300",
    text: "text-violet-300",
  },
  Legendary: {
    label: "LEGENDARY",
    border: "border-amber-400/50",
    glow: "hover:shadow-amber-400/20",
    badge: "bg-amber-900/60 text-amber-300",
    text: "text-amber-300",
  },
};

interface PowerCardProps {
  power: Power;
  selected: boolean;
  onToggle: (power: Power) => void;
  index: number;
}

export default function PowerCard({
  power,
  selected,
  onToggle,
  index,
}: PowerCardProps) {
  const cfg = rarityConfig[power.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onToggle(power)}
      className={`
        relative group cursor-pointer rounded-2xl border bg-[#0d0d14] p-5
        transition-all duration-300 overflow-hidden select-none
        ${cfg.border}
        ${cfg.glow}
        hover:shadow-xl
        ${selected ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#050508]" : ""}
      `}
      role="button"
      aria-pressed={selected}
      aria-label={`Toggle ${power.name} power`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onToggle(power)}
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-transparent" />
      </div>

      {/* Selected overlay */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-indigo-600/8 pointer-events-none rounded-2xl"
        />
      )}

      {/* Top row: icon + rarity badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl leading-none">{power.icon}</div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}
          >
            {cfg.label}
          </span>
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-600/80 text-white"
            >
              ✓ EQUIPPED
            </motion.span>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-white font-bold text-lg mb-1 leading-tight">
        {power.name}
      </h3>

      {/* Category */}
      <p className={`text-xs font-mono mb-2 ${cfg.text}`}>{power.category}</p>

      {/* Description */}
      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
        {power.description}
      </p>

      {/* Power level bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            Power Level
          </span>
          <span className={`text-xs font-mono font-bold ${cfg.text}`}>
            {power.powerLevel}/100
          </span>
        </div>
        <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${power.powerLevel}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.07 + 0.3, ease: "easeOut" }}
            className={`h-full rounded-full ${
              power.rarity === "Legendary"
                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                : power.rarity === "Epic"
                ? "bg-gradient-to-r from-violet-500 to-purple-400"
                : power.rarity === "Rare"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                : "bg-gradient-to-r from-zinc-500 to-zinc-400"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
