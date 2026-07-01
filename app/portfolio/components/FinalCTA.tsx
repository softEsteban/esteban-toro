"use client";

import { motion } from "framer-motion";

interface FinalCTAProps {
  onBuildLoadout: () => void;
}

export default function FinalCTA({ onBuildLoadout }: FinalCTAProps) {
  return (
    <section className="relative py-32 px-6 bg-[#07070f] overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          READY TO POWER UP?
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Choose Your Powers
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto"
        >
          Every business has limitations.
          <br />
          Most can be solved with the right systems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onBuildLoadout}
            className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Build My Loadout
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <a
            href="mailto:hola@estebantoro.com?subject=Let's talk"
            className="group px-8 py-4 border border-zinc-700 hover:border-indigo-500/50 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            Start A Conversation
            <motion.span
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-600 text-xs font-mono"
        >
          {["AI Agents", "Automation", "Systems Design", "SaaS", "Lead Gen"].map(
            (tag) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                {tag}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
