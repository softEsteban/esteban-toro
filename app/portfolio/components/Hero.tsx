"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FLOATING_ICONS = [
  { icon: "📡", x: "8%", y: "20%", delay: 0 },
  { icon: "🤖", x: "85%", y: "15%", delay: 0.4 },
  { icon: "⚙️", x: "72%", y: "60%", delay: 0.8 },
  { icon: "📊", x: "15%", y: "70%", delay: 0.2 },
  { icon: "🚀", x: "50%", y: "12%", delay: 1.0 },
  { icon: "🧠", x: "90%", y: "75%", delay: 0.6 },
  { icon: "🛠️", x: "5%", y: "50%", delay: 1.2 },
  { icon: "🔍", x: "60%", y: "80%", delay: 0.3 },
];

export default function Hero({ onEnter }: { onEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]"
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-violet-500/15 blur-[80px]" />
      </div>

      {/* Corner accent glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/8 blur-[80px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/8 blur-[80px] rounded-full" />

      {/* Floating icons */}
      {FLOATING_ICONS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.15, 0.4, 0.15],
            y: [0, -18, 0],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            delay: item.delay,
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          DIGITAL POWERS MARKETPLACE — EST. 2024
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6"
        >
          Digital Powers
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            for Builders,
          </span>
          <br />
          Brands &amp; Businesses
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Walk through the aisle. Pick the powers you need.
          <br className="hidden sm:block" />
          Leave with a stronger company.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onEnter}
            className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter The Store
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
            href="#quests"
            className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
          >
            View Completed Quests
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs font-mono"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-zinc-600" />
          </motion.div>
          SCROLL
        </motion.div>
      </motion.div>
    </section>
  );
}
