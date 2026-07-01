"use client";

import { motion } from "framer-motion";

type Status = "Available" | "Beta" | "Experimental";

interface Product {
  icon: string;
  name: string;
  tagline: string;
  description: string;
  status: Status;
  href: string;
  cta: string;
}

const PRODUCTS: Product[] = [
  {
    icon: "⚡",
    name: "Daili",
    tagline: "Your Personal Operating System",
    description:
      "A personal OS that centralizes goals, habits, projects, and knowledge into one daily command center. Built for founders and builders who need clarity at speed.",
    status: "Available",
    href: "/",
    cta: "Explore Daili",
  },
  {
    icon: "🤖",
    name: "Agent Kit",
    tagline: "AI Agents for Business Workflows",
    description:
      "A modular framework for deploying AI agents inside your business. Connect to your tools, define tasks, and let agents execute autonomously.",
    status: "Beta",
    href: "/agent-app",
    cta: "Join Beta",
  },
  {
    icon: "🔭",
    name: "Future Labs",
    tagline: "Experiments from the Workshop",
    description:
      "A collection of experimental AI-powered tools, prototypes, and systems being developed. Some become products. Some become powers. All push the boundary.",
    status: "Experimental",
    href: "#",
    cta: "Coming Soon",
  },
];

const statusConfig: Record<Status, { bg: string; text: string; border: string; dot: string }> = {
  Available: {
    bg: "bg-emerald-900/40",
    text: "text-emerald-400",
    border: "border-emerald-800/50",
    dot: "bg-emerald-400",
  },
  Beta: {
    bg: "bg-blue-900/40",
    text: "text-blue-400",
    border: "border-blue-800/50",
    dot: "bg-blue-400",
  },
  Experimental: {
    bg: "bg-amber-900/30",
    text: "text-amber-400",
    border: "border-amber-800/50",
    dot: "bg-amber-400",
  },
};

export default function Workshop() {
  return (
    <section className="py-24 px-6 bg-[#07070f] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-violet-600/8 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-3">
            ◈ The Workshop
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Products in Progress
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Systems built from the same powers available to you. Some are ready.
            Some are becoming.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => {
            const cfg = statusConfig[product.status];
            const isComingSoon = product.cta === "Coming Soon";

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={!isComingSoon ? { y: -5 } : {}}
                className="group relative rounded-2xl border border-zinc-800 bg-[#0a0a10] p-6 flex flex-col overflow-hidden transition-colors duration-300 hover:border-zinc-700"
              >
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="text-4xl mb-4">{product.icon}</div>

                {/* Status badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${product.status === "Available" ? "animate-pulse" : ""}`}
                    />
                    {product.status.toUpperCase()}
                  </span>
                </div>

                {/* Name & tagline */}
                <h3 className="text-white font-bold text-xl mb-1">
                  {product.name}
                </h3>
                <p className="text-indigo-400 text-sm font-mono mb-3">
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-6">
                  {product.description}
                </p>

                {/* CTA */}
                <a
                  href={product.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${
                    isComingSoon
                      ? "text-zinc-600 cursor-not-allowed"
                      : "text-indigo-400 hover:text-indigo-300"
                  }`}
                  tabIndex={isComingSoon ? -1 : 0}
                  aria-disabled={isComingSoon}
                >
                  {product.cta}
                  {!isComingSoon && (
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  )}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
