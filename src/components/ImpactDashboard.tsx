"use client";

import { motion } from "framer-motion";
import { scrollReveal, scrollStagger } from "@/lib/animations";
import CountUp from "./CountUp";

interface MetricItem {
  value: string;
  numeric: number;
  suffix: string;
  label: string;
}

const metrics: MetricItem[] = [
  { value: "1500+", numeric: 1500, suffix: "+", label: "社群人数" },
  { value: "13", numeric: 13, suffix: "所", label: "辐射高校" },
  { value: "5.3W+", numeric: 5.3, suffix: "W+", label: "内容播放" },
  { value: "12%", numeric: 12, suffix: "%", label: "销售转化" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  }),
};

export default function ImpactDashboard() {
  return (
    <motion.section
      id="metrics"
      className="relative mx-auto mb-24 mt-10 max-w-5xl px-6 sm:px-10"
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section label */}
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent-primary/50 uppercase">
          / 01
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-primary/20 to-transparent" />
      </div>

      {/* Metrics bar */}
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-accent-green/[0.02] blur-3xl" />

        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card/80 p-5 shadow-card backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_60px_rgba(168,134,68,0.06)] sm:p-6"
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
          >
            {/* Decorative corner accent */}
            <div
              className={`absolute -right-6 -top-6 h-12 w-12 rounded-full blur-xl transition-all duration-500 group-hover:opacity-80 ${
                i === 0
                  ? "bg-accent-green/20"
                  : i === 1
                    ? "bg-accent-primary/20"
                    : i === 2
                      ? "bg-accent-blue/20"
                      : "bg-accent-warm/20"
              }`}
            />

            <div className="relative">
              {/* Value with count-up */}
              <p className="font-mono text-2xl font-black tracking-tight text-white/90 sm:text-3xl md:text-4xl">
                {m.suffix === "%" || m.suffix === "W+" ? (
                  <>
                    <CountUp end={m.numeric} decimals={m.suffix === "W+" ? 1 : 0} />
                    {m.suffix}
                  </>
                ) : m.suffix === "+" ? (
                  <>
                    <CountUp end={m.numeric} />
                    +
                  </>
                ) : (
                  <>
                    <CountUp end={m.numeric} />
                    <span className="ml-0.5 text-lg font-light text-accent-primary/60 sm:text-2xl">
                      {m.suffix}
                    </span>
                  </>
                )}
              </p>

              {/* Label */}
              <p className="mt-1.5 text-xs text-text-secondary/60 sm:text-sm">
                {m.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
