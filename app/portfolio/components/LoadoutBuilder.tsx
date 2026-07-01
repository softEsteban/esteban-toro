"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Power } from "./PowerCard";

interface LoadoutBuilderProps {
  selectedPowers: Power[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

function calculateStrength(powers: Power[]): number {
  if (powers.length === 0) return 0;
  const base =
    powers.reduce((sum, p) => sum + p.powerLevel, 0) / powers.length;
  const synergy = Math.min(powers.length * 5, 25);
  return Math.min(Math.round(base + synergy), 100);
}

function getStrengthLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "MAXIMUM POWER", color: "text-amber-400" };
  if (score >= 75) return { label: "HIGHLY CAPABLE", color: "text-violet-400" };
  if (score >= 55) return { label: "WELL EQUIPPED", color: "text-blue-400" };
  if (score >= 30) return { label: "BUILDING STRENGTH", color: "text-cyan-400" };
  return { label: "JUST STARTING", color: "text-zinc-400" };
}

export default function LoadoutBuilder({
  selectedPowers,
  onRemove,
  onClear,
}: LoadoutBuilderProps) {
  const strength = calculateStrength(selectedPowers);
  const { label, color } = getStrengthLabel(strength);
  const isEmpty = selectedPowers.length === 0;

  return (
    <section
      id="loadout"
      className="py-24 px-6 bg-[#07070f] border-y border-indigo-500/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-3">
            ◈ Configuration Panel
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Build Your Loadout
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Select powers from the store above. Watch your business strength grow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Selected powers list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-400 text-sm font-mono uppercase tracking-wider">
                Equipped Powers ({selectedPowers.length})
              </span>
              {!isEmpty && (
                <button
                  onClick={onClear}
                  className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition-colors"
                >
                  Clear All ×
                </button>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {isEmpty ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-dashed border-zinc-700/50 rounded-2xl p-12 text-center"
                >
                  <p className="text-zinc-600 font-mono text-sm">
                    No powers equipped yet.
                    <br />
                    Select cards from the store above.
                  </p>
                </motion.div>
              ) : (
                selectedPowers.map((power) => (
                  <motion.div
                    key={power.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-[#0d0d14] group"
                  >
                    <span className="text-2xl">{power.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {power.name}
                      </p>
                      <p className="text-zinc-500 text-xs font-mono">
                        {power.category}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold ${
                        power.rarity === "Legendary"
                          ? "text-amber-400"
                          : power.rarity === "Epic"
                          ? "text-violet-400"
                          : power.rarity === "Rare"
                          ? "text-blue-400"
                          : "text-zinc-400"
                      }`}
                    >
                      {power.powerLevel}
                    </span>
                    <button
                      onClick={() => onRemove(power.id)}
                      aria-label={`Remove ${power.name}`}
                      className="text-zinc-700 hover:text-zinc-300 text-lg leading-none opacity-0 group-hover:opacity-100 transition-all ml-1"
                    >
                      ×
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Strength meter panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-8 rounded-2xl border border-zinc-800 bg-[#0a0a10] p-6"
          >
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-6">
              Business Strength
            </p>

            {/* Score */}
            <div className="text-center mb-6">
              <motion.div
                key={strength}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-6xl font-bold font-mono mb-1 ${color}`}
              >
                {strength}
              </motion.div>
              <div className="text-zinc-500 text-sm font-mono">/100</div>
              <div className={`text-xs font-mono font-bold mt-2 ${color}`}>
                {label}
              </div>
            </div>

            {/* Circular progress */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#1f1f2e"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#strengthGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={314}
                  animate={{ strokeDashoffset: 314 - (314 * strength) / 100 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient
                    id="strengthGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-zinc-500 font-mono">
                  {selectedPowers.length} POWERS
                </span>
              </div>
            </div>

            {/* Power names */}
            {!isEmpty && (
              <div className="space-y-1 mb-6">
                {selectedPowers.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 text-xs text-zinc-400"
                  >
                    <span>{p.icon}</span>
                    <span className="truncate">{p.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <a
              href="mailto:hola@estebantoro.com?subject=Build My System&body=Powers selected: "
              className="block w-full text-center py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
            >
              Build My System →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
