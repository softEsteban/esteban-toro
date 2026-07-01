"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Blobs } from "./ui/Blobs";
import { Ebook3D } from "./Ebook3D";
import { useT } from "./LanguageProvider";

const ease = [0.22, 1, 0.36, 1] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { product } = useT();

  return (
    <section className="relative overflow-hidden">
      <Blobs />
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-32">
        {/* Left column */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center lg:justify-start"
          >
            <Badge>
              <Sparkles className="h-3 w-3" />
              {product.badge}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]"
          >
            {product.headlinePrefix}
            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              {product.headlineHighlight}
            </span>
            {product.headlineSuffix}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.16 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0"
          >
            {product.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.24 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <Button size="lg" onClick={() => scrollTo("get-the-guide")}>
              {product.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollTo("inside")}
            >
              {product.secondaryCta}
            </Button>
          </motion.div>
        </div>

        {/* Right column — ebook */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Ebook3D />
        </motion.div>
      </div>
    </section>
  );
}
