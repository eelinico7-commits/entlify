"use client";

import { motion } from "framer-motion";
import { smoothTransition } from "@/lib/animations";

const metrics = [
  { value: "1500+", label: "统筹管理高粘性技术社群人数", suffix: "" },
  { value: "13", label: "成功辐射高校版图", suffix: "所" },
  { value: "5.3W+", label: "抖音校园IP累计播放量", suffix: "" },
  { value: "12%", label: "硬件销售转化率 (远超行业8%)", suffix: "" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothTransition.ease as [number, number, number, number] },
  },
};

export default function ImpactDashboard() {
  return (
    <motion.section
      className="mb-20 mt-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Terminal-style section header */}
      <motion.div
        className="mb-6 flex items-center gap-3"
        variants={itemVariants}
      >
        <span className="font-mono text-xs text-accent-primary/60">//</span>
        <span className="font-mono text-[11px] tracking-widest uppercase text-text-muted/50">
          数据看板 · 影响力指标
        </span>
        <div className="ml-2 h-px flex-1 bg-white/[0.04]" />
      </motion.div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <motion.div
            key={m.value}
            className="group rounded-2xl border border-white/[0.06] bg-bg-card p-6 shadow-card transition-all duration-500 ease-in-out hover:scale-[1.02] hover:border-white/[0.12] hover:shadow-[0_0_80px_rgba(168,134,68,0.08)]"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <p className="font-mono text-4xl font-black tracking-tight text-white/90 sm:text-5xl">
              {m.value}
              {m.suffix && (
                <span className="ml-0.5 text-2xl font-light text-accent-primary/60">
                  {m.suffix}
                </span>
              )}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary/70 sm:text-sm">
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
