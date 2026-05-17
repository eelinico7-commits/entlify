"use client";

import { motion } from "framer-motion";
import { smoothTransition, smoothEasing } from "@/lib/animations";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEasing },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.span
          className="mb-4 font-mono text-[11px] tracking-[0.25em] text-accent-primary/70 uppercase"
          variants={itemVariants}
        >
          Portfolio · 2026
        </motion.span>

        {/* Oversized title */}
        <motion.h1
          className="section-heading mt-2 leading-[1.05]"
          variants={itemVariants}
        >
          <span className="text-gradient">Medical Student</span>
          <br />
          <span className="text-text-secondary/60">&</span>{" "}
          <span className="text-text-primary">AI Explorer</span>
        </motion.h1>

        {/* Chinese name + identity */}
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
          variants={itemVariants}
        >
          <span className="text-lg font-medium tracking-tight text-text-primary/90">
            杨存邦
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-text-muted/40 sm:inline-block" />
          <span className="text-sm leading-relaxed text-text-secondary/70">
            医学生 · AIGC 开发者 · 商业思维
          </span>
        </motion.div>

        {/* Key roles */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          variants={itemVariants}
        >
          {["新东方校园大使", "美团AIGC俱乐部主席", "独立开发者"].map(
            (role) => (
              <span
                key={role}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] tracking-wide text-text-muted transition-colors duration-300 hover:border-accent-primary/30 hover:text-accent-primary/80"
              >
                {role}
              </span>
            )
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="fixed bottom-10 right-10 z-20 hidden flex-col items-center gap-2 sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.span className="text-[10px] tracking-[0.2em] text-text-muted/50 uppercase">
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted/40"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
