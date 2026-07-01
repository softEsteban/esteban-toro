"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STATEMENTS = [
  { text: "Freedom is built through systems.", accent: false },
  { text: "Automate the repetitive.", accent: true },
  { text: "Turn knowledge into assets.", accent: false },
  { text: "Create leverage.", accent: true },
  { text: "Build once.", accent: false },
  { text: "Benefit repeatedly.", accent: true },
  { text: "The right system changes everything.", accent: false },
];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-[#050508] overflow-hidden"
    >
      {/* Parallax background text */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-black text-white/[0.015] tracking-tight whitespace-nowrap">
          SYSTEMS
        </span>
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-3">
            ◈ The Builder Philosophy
          </p>
        </motion.div>

        {/* Statements */}
        <div className="space-y-6">
          {STATEMENTS.map((statement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`relative max-w-2xl ${
                  i % 2 === 0 ? "text-left" : "text-right"
                }`}
              >
                {/* Line accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
                  className={`h-px bg-gradient-to-r from-indigo-500/50 to-transparent mb-3 origin-left ${
                    i % 2 !== 0
                      ? "bg-gradient-to-l origin-right"
                      : ""
                  }`}
                  style={{ width: "60px" }}
                />
                <p
                  className={`font-bold leading-tight ${
                    statement.accent
                      ? "text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
                      : "text-2xl sm:text-3xl lg:text-4xl text-white/80"
                  }`}
                >
                  {statement.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Byline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-zinc-600 text-sm font-mono">
            — Esteban Toro · Software Engineer · AI Builder · Systems Designer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
