"use client";

import { motion } from "framer-motion";
import { smoothTransition } from "@/lib/animations";

export default function CyberPhilosopherPromo() {
  return (
    <motion.a
      href="/cyber-philosopher"
      target="_blank"
      rel="noopener noreferrer"
      className="card-glow group relative mt-14 block overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card p-6 shadow-card transition-all duration-500 hover:scale-[1.01] hover:border-white/[0.12] sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={smoothTransition}
    >
      {/* Hover glow overlay */}
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Icon + Text */}
        <div className="flex items-start gap-4 sm:items-center">
          <motion.span
            className="text-3xl sm:text-4xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🔥
          </motion.span>
          <div>
            <h3 className="text-lg font-semibold text-text-primary sm:text-xl">
              最新AI商业化实战：赛博先哲
            </h3>
            <p className="mt-1 text-sm text-text-secondary/70">
              你的专属 AI 情绪疗愈与哲学陪伴站
            </p>
          </div>
        </div>

        {/* Right: CTA */}
        <span className="inline-flex items-center gap-2 rounded-full border border-accent-primary/25 bg-accent-primary/10 px-5 py-2.5 text-sm font-medium text-accent-primary transition-all duration-300 group-hover:border-accent-primary/40 group-hover:bg-accent-primary/20 group-hover:shadow-[0_0_30px_rgba(168,134,68,0.15)] whitespace-nowrap">
          体验 →
        </span>
      </div>
    </motion.a>
  );
}
