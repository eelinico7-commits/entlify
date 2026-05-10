"use client";

import { motion } from "framer-motion";

const identities = [
  "AIGC Developer",
  "美团AIGC俱乐部主席",
  "新东方校园大使",
  "极客 & 探索者",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Over-sized name */}
        <motion.h1
          className="section-heading mt-4"
          variants={itemVariants}
        >
          杨存邦
        </motion.h1>

        {/* Identity row — clean inline */}
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5"
          variants={itemVariants}
        >
          {identities.map((id, i) => (
            <span key={id} className="flex items-center gap-x-3">
              <span className="text-base font-light tracking-wide text-text-secondary sm:text-lg">
                {id}
              </span>
              {i < identities.length - 1 && (
                <span className="inline-block h-1 w-1 rounded-full bg-text-muted/40" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-10 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
          variants={itemVariants}
        >
          复合型人才 · 极客精神 · 商业思维
          <br />
          <span className="text-text-secondary/60">
            从校园到领航者的成长轨迹
          </span>
        </motion.p>

        {/* Refined scroll indicator — bottom-right */}
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
