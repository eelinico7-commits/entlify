"use client";

import { motion } from "framer-motion";
import { smoothTransition } from "@/lib/animations";

export default function CyberPhilosopherPromo() {
  return (
    <motion.a
      href="/cyber-philosopher"
      target="_blank"
      rel="noopener noreferrer"
      className="card-glow group relative mt-16 block overflow-hidden rounded-lg border border-black/[0.07] bg-bg-card p-7 shadow-card transition-all duration-300 hover:border-accent-primary/20 hover:shadow-card-hover sm:p-9"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={smoothTransition}
    >
      {/* Hover glow overlay */}
      <div className="pointer-events-none absolute -inset-2 rounded-lg bg-white/30 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Icon + Text */}
        <div className="flex items-start gap-4 sm:items-center">
          <motion.span
            className="font-mono text-sm text-accent-secondary/75"
          >
            00
          </motion.span>
          <div>
            <h3 className="text-lg font-semibold text-text-primary sm:text-xl">
              赛博先哲
            </h3>
            <p className="mt-1 text-sm text-text-secondary/90">
              一个 AI 陪伴小站，用来练习产品表达、对话体验和情绪价值。
            </p>
          </div>
        </div>

        {/* Right: CTA */}
        <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.09] bg-white/70 px-5 py-2.5 text-sm font-medium text-text-primary transition-all duration-300 whitespace-nowrap group-hover:border-accent-primary/20 group-hover:bg-white">
          体验 →
        </span>
      </div>
    </motion.a>
  );
}
